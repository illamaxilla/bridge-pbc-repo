
import React, { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// RENTGUARD GHANA
// Ghana Rent Enforcement & Intelligence Platform
// Roles: National Admin · Case Manager · Taskforce Officer · Landlord · Tenant
// ─────────────────────────────────────────────────────────────────────────────

// ── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  // Surfaces
  bg:        '#0B1210',
  surface:   '#111916',
  surfaceL:  '#162019',
  card:      '#1A2820',
  cardHov:   '#1F3025',
  border:    '#243628',
  borderL:   '#2E4435',

  // Brand
  green:     '#0FA86A',
  greenD:    '#0C8A55',
  greenFade: 'rgba(15,168,106,0.12)',
  lime:      '#C8E830',
  limeD:     '#A0BA25',
  limeFade:  'rgba(200,232,48,0.10)',

  // Text
  t1:        '#E8F0EB',
  t2:        '#8FA898',
  t3:        '#536358',

  // Status
  red:       '#E5483A',
  redFade:   'rgba(229,72,58,0.12)',
  amber:     '#E8900A',
  amberFade: 'rgba(232,144,10,0.12)',
  blue:      '#3B82F6',
  blueFade:  'rgba(59,130,246,0.10)',
};

const F = {
  head: '"Syne","Space Grotesk",sans-serif',
  body: '"DM Sans","Helvetica Neue",sans-serif',
  mono: '"JetBrains Mono","Fira Mono",monospace',
};

// ── GLOBAL CSS ────────────────────────────────────────────────────────────────
const GlobalCSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 14px; }
    body { background: ${T.bg}; color: ${T.t1}; font-family: ${F.body}; -webkit-font-smoothing: antialiased; overflow: hidden; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 2px; }
    ::-webkit-scrollbar-thumb:hover { background: ${T.borderL}; }
    button { cursor: pointer; font-family: ${F.body}; }
    input, textarea, select { font-family: ${F.body}; }
    a { color: inherit; text-decoration: none; }

    .rg-app { display: flex; height: 100vh; overflow: hidden; }
    .rg-sidebar { width: 220px; flex-shrink: 0; background: ${T.surface}; border-right: 1px solid ${T.border}; display: flex; flex-direction: column; overflow: hidden; }
    .rg-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .rg-topbar { height: 52px; flex-shrink: 0; background: ${T.surface}; border-bottom: 1px solid ${T.border}; display: flex; align-items: center; padding: 0 24px; gap: 12px; }
    .rg-content { flex: 1; overflow-y: auto; padding: 24px; }

    .rg-nav-item { display: flex; align-items: center; gap: 10px; padding: 8px 16px; margin: 1px 8px; border-radius: 6px; cursor: pointer; transition: all 0.15s; color: ${T.t2}; font-size: 13px; font-weight: 500; border: none; background: transparent; width: calc(100% - 16px); text-align: left; }
    .rg-nav-item:hover { background: ${T.card}; color: ${T.t1}; }
    .rg-nav-item.active { background: ${T.greenFade}; color: ${T.green}; }
    .rg-nav-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

    .rg-card { background: ${T.card}; border: 1px solid ${T.border}; border-radius: 10px; }
    .rg-card-sm { background: ${T.card}; border: 1px solid ${T.border}; border-radius: 8px; padding: 16px; }

    .rg-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; border: none; cursor: pointer; transition: all 0.15s; letter-spacing: 0.3px; }
    .rg-btn-primary { background: ${T.green}; color: #fff; }
    .rg-btn-primary:hover { background: ${T.greenD}; }
    .rg-btn-ghost { background: transparent; color: ${T.t2}; border: 1px solid ${T.border}; }
    .rg-btn-ghost:hover { background: ${T.card}; color: ${T.t1}; border-color: ${T.borderL}; }
    .rg-btn-danger { background: ${T.redFade}; color: ${T.red}; border: 1px solid rgba(229,72,58,0.2); }
    .rg-btn-danger:hover { background: rgba(229,72,58,0.2); }
    .rg-btn-lime { background: ${T.lime}; color: ${T.bg}; }
    .rg-btn-lime:hover { background: ${T.limeD}; }

    .rg-badge { display: inline-flex; align-items: center; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
    .rg-badge-green { color: ${T.green}; }
    .rg-badge-red { color: ${T.red}; }
    .rg-badge-amber { color: ${T.amber}; }
    .rg-badge-blue { color: ${T.blue}; }
    .rg-badge-muted { color: ${T.t3}; }

    .rg-input { background: ${T.surfaceL}; border: 1px solid ${T.border}; border-radius: 6px; padding: 9px 12px; font-size: 13px; color: ${T.t1}; outline: none; transition: border-color 0.15s; width: 100%; }
    .rg-input:focus { border-color: ${T.green}; }
    .rg-input::placeholder { color: ${T.t3}; }
    .rg-textarea { background: ${T.surfaceL}; border: 1px solid ${T.border}; border-radius: 6px; padding: 10px 12px; font-size: 13px; color: ${T.t1}; outline: none; transition: border-color 0.15s; width: 100%; resize: vertical; }
    .rg-textarea:focus { border-color: ${T.green}; }
    .rg-select { background: ${T.surfaceL}; border: 1px solid ${T.border}; border-radius: 6px; padding: 9px 12px; font-size: 13px; color: ${T.t1}; outline: none; width: 100%; }

    .rg-table { width: 100%; border-collapse: collapse; }
    .rg-table-clickable tbody tr { cursor: pointer; }
    .rg-table-clickable tbody tr:hover { background: rgba(255,255,255,0.03); }
    .rg-table th { padding: 10px 14px; text-align: left; font-size: 10px; font-weight: 700; color: ${T.t3}; letter-spacing: 1px; text-transform: uppercase; border-bottom: 1px solid ${T.border}; }
    .rg-table td { padding: 12px 14px; font-size: 13px; border-bottom: 1px solid rgba(36,54,40,0.5); vertical-align: middle; }
    .rg-table tr:last-child td { border-bottom: none; }
    .rg-table tbody tr { transition: background 0.1s; }
    .rg-table tbody tr:hover { background: rgba(255,255,255,0.02); }
    .rg-table-clickable tbody tr { cursor: pointer; }

    .rg-stat { }
    .rg-stat-val { font-family: ${F.mono}; font-size: 28px; font-weight: 500; line-height: 1; }
    .rg-stat-label { font-size: 11px; color: ${T.t2}; margin-top: 4px; font-weight: 500; }
    .rg-stat-change { font-family: ${F.mono}; font-size: 10px; margin-top: 4px; }

    .rg-progress { height: 4px; background: ${T.border}; border-radius: 2px; overflow: hidden; }
    .rg-progress-fill { height: 100%; border-radius: 2px; transition: width 0.6s ease; }

    .rg-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .rg-modal { background: ${T.surface}; border: 1px solid ${T.border}; border-radius: 12px; width: 100%; max-width: 520px; max-height: 80vh; overflow-y: auto; }
    .rg-modal-header { padding: 20px 24px 16px; border-bottom: 1px solid ${T.border}; display: flex; justify-content: space-between; align-items: center; }
    .rg-modal-body { padding: 20px 24px 24px; }

    .rg-tabs { display: flex; gap: 0; border-bottom: 1px solid ${T.border}; }
    .rg-tab { padding: 10px 18px; font-size: 12px; font-weight: 600; color: ${T.t2}; border: none; background: transparent; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.15s; letter-spacing: 0.3px; }
    .rg-tab.active { color: ${T.green}; border-bottom-color: ${T.green}; }
    .rg-tab:hover:not(.active) { color: ${T.t1}; }

    .rg-section-title { font-family: ${F.head}; font-size: 11px; font-weight: 700; color: ${T.t3}; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; }

    .rg-field { margin-bottom: 16px; }
    .rg-field label { display: block; font-size: 11px; font-weight: 600; color: ${T.t2}; letter-spacing: 0.5px; margin-bottom: 6px; text-transform: uppercase; }

    .rg-checklist-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(36,54,40,0.4); }
    .rg-checklist-row:last-child { border-bottom: none; }
    .rg-toggle { width: 36px; height: 20px; border-radius: 10px; cursor: pointer; transition: background 0.2s; position: relative; flex-shrink: 0; margin-top: 2px; border: none; }
    .rg-toggle-on { background: ${T.green}; }
    .rg-toggle-off { background: ${T.red}; }
    .rg-toggle-neutral { background: ${T.border}; }
    .rg-toggle-thumb { position: absolute; top: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: left 0.2s; }

    .rg-phone-frame { width: 340px; height: 680px; background: ${T.surface}; border: 2px solid ${T.border}; border-radius: 36px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04); }
    .rg-phone-notch { height: 28px; background: ${T.bg}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border-bottom: 1px solid ${T.border}; }
    .rg-phone-screen { flex: 1; overflow-y: auto; }
    .rg-phone-nav { height: 60px; background: ${T.bg}; border-top: 1px solid ${T.border}; display: flex; flex-shrink: 0; }
    .rg-phone-nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; cursor: pointer; background: transparent; border: none; }

    .risk-bar { display: flex; align-items: center; gap: 8px; }
    .risk-bar-track { flex: 1; height: 5px; background: ${T.border}; border-radius: 3px; overflow: hidden; }
    .risk-bar-fill { height: 100%; border-radius: 3px; transition: width 0.6s; }

    .pulse { animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
    .fade-in { animation: fadeIn 0.2s ease; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
    .slide-up { animation: slideUp 0.3s ease; }
    @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

    .rg-compliance-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; }
    .rg-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .rg-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
    .rg-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    .rg-flex { display: flex; }
    .rg-flex-col { display: flex; flex-direction: column; }
    .rg-gap-1 { gap: 6px; }
    .rg-gap-2 { gap: 12px; }
    .rg-gap-3 { gap: 18px; }
    .rg-mb-1 { margin-bottom: 8px; }
    .rg-mb-2 { margin-bottom: 16px; }
    .rg-mb-3 { margin-bottom: 24px; }
    .rg-page-title { font-family: ${F.head}; font-size: 22px; font-weight: 700; color: ${T.t1}; }
    .rg-page-sub { font-size: 13px; color: ${T.t2}; margin-top: 3px; }

    .map-cell { width: 100%; aspect-ratio: 16/9; background: ${T.card}; border-radius: 8px; border: 1px solid ${T.border}; overflow: hidden; position: relative; }
    .map-grid { display: grid; grid-template-columns: repeat(8,1fr); grid-template-rows: repeat(4,1fr); gap: 2px; padding: 12px; height: 100%; }
    .map-cell-inner { border-radius: 3px; transition: opacity 0.3s; cursor: pointer; }

    .sparkline { display: flex; align-items: flex-end; gap: 2px; height: 32px; }
    .sparkline-bar { flex: 1; border-radius: 2px 2px 0 0; transition: height 0.3s; min-width: 4px; }
  
    /* ── Select element ── */
    .rg-select { width:100%; padding:8px 12px; background:${T.card}; border:1px solid ${T.border}; border-radius:6px; color:${T.t1}; font-family:'Inter',sans-serif; font-size:12px; outline:none; appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23536358' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; cursor:pointer; }
    .rg-select:focus { border-color:${T.green}; }
    .rg-select option { background:${T.surface}; color:${T.t1}; }

    /* ── Animations ── */
    @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
    @keyframes scanLine { 0% { top:20%; } 50% { top:80%; } 100% { top:20%; } }
    .fade-in { animation: fadeIn 0.2s ease both; }
    .slide-up { animation: slideUp 0.25s ease both; }
    .pulse { animation: pulse 2s ease-in-out infinite; }

    /* ── Risk bar ── */
    .risk-bar { display:flex; align-items:center; gap:8px; }
    .risk-bar-track { flex:1; height:5px; background:${T.border}; border-radius:3px; overflow:hidden; }
    .risk-bar-fill { height:100%; border-radius:3px; transition:width 0.4s ease; }

    /* ── Table-clickable hover ── */
    .rg-table-clickable tbody tr:hover { background:${T.cardHov}; cursor:pointer; }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width:5px; height:5px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:${T.border}; border-radius:3px; }
    ::-webkit-scrollbar-thumb:hover { background:${T.t3}; }

  `}</style>
);

// ── MOCK DATA ─────────────────────────────────────────────────────────────────

const ROLES = [
  { id: 'admin',    label: 'National Admin',      badge: 'National Admin',   color: T.lime    },
  { id: 'manager',  label: 'Case Manager',         badge: 'Case Manager',     color: T.blue    },
  { id: 'officer',  label: 'Taskforce Officer',    badge: 'Field Officer',    color: T.green   },
  { id: 'landlord', label: 'Landlord Portal',      badge: 'Landlord',         color: T.amber   },
  { id: 'tenant',   label: 'Tenant Portal',        badge: 'Tenant',           color: T.t2      },
];

const REGIONS = [
  { name: 'Greater Accra', reg: 78, cards: 52, violations: 312, risk: 'high',   score: 52 },
  { name: 'Ashanti',       reg: 61, cards: 38, violations: 187, risk: 'high',   score: 38 },
  { name: 'Western',       reg: 84, cards: 67, violations:  94, risk: 'medium', score: 67 },
  { name: 'Central',       reg: 91, cards: 74, violations:  61, risk: 'low',    score: 74 },
  { name: 'Eastern',       reg: 87, cards: 71, violations:  78, risk: 'medium', score: 71 },
  { name: 'Volta',         reg: 93, cards: 82, violations:  32, risk: 'low',    score: 82 },
  { name: 'Northern',      reg: 44, cards: 21, violations: 143, risk: 'high',   score: 21 },
  { name: 'Upper East',    reg: 68, cards: 49, violations:  55, risk: 'medium', score: 49 },
  { name: 'Upper West',    reg: 59, cards: 33, violations:  71, risk: 'high',   score: 33 },
  { name: 'Bono',          reg: 76, cards: 58, violations:  44, risk: 'medium', score: 58 },
];

const PROPERTIES = [
  { id:'P-001', address:'14 Osu Ako-Adjei Ave, Accra', mmda:'Ayawaso East', landlord:'Kwame Asante Boateng', lid:'L-2291', units:6, registered:true,  cards:4, tenancies:6, advance:9.5,  risk:87, violations:3, complaints:3, lastInsp:'—' },
  { id:'P-002', address:'7 Labone Close, East Legon',  mmda:'La Nkwantanang', landlord:'Abena Osei-Mensah',   lid:'L-1104', units:3, registered:true,  cards:3, tenancies:3, advance:6.0,  risk:42, violations:1, complaints:1, lastInsp:'2026-01-14' },
  { id:'P-003', address:'22 Dzorwulu Crescent, Accra', mmda:'Ayawaso West',   landlord:'Emmanuel Nkrumah-Appiah', lid:'L-3378', units:12,registered:false, cards:0, tenancies:12,advance:18.0, risk:96, violations:4, complaints:7, lastInsp:'—' },
  { id:'P-004', address:'4 Ring Road West, Accra',     mmda:'Okaikwei North', landlord:'Yaa Darko-Mensah',    lid:'L-0882', units:4, registered:true,  cards:4, tenancies:4, advance:3.0,  risk:12, violations:0, complaints:0, lastInsp:'2026-02-28' },
  { id:'P-005', address:'19 Spintex Road, Tema',        mmda:'Tema West',        landlord:'Kofi Acheampong',        lid:'L-4451', units:8,  registered:true,  cards:5, tenancies:8,  advance:11.2, risk:73, violations:2, complaints:2, lastInsp:'2026-01-03' },
  { id:'P-006', address:'44 Accra New Town',             mmda:'Ayawaso Central',  landlord:'Kofi Adjei-Mensah',      lid:'L-5512', units:5,  registered:true,  cards:5, tenancies:5,  advance:14.0, risk:88, violations:3, complaints:3, lastInsp:'—' },
  { id:'P-007', address:'12 Tesano Ave, Accra',          mmda:'Okaikwei North',   landlord:'Akosua Darteh',          lid:'L-6621', units:3,  registered:true,  cards:2, tenancies:3,  advance:5.0,  risk:38, violations:1, complaints:1, lastInsp:'2026-02-10' },
  { id:'P-008', address:'2 Ringway Estate, Cantonments', mmda:'Cantonments',      landlord:'Charles Appiah-Kubi',    lid:'L-7734', units:6,  registered:false, cards:0, tenancies:6,  advance:8.0,  risk:79, violations:2, complaints:2, lastInsp:'—' },
];

const CASES = [
  { id:'RC-2026-ACC-00291', type:'illegal_advance',      src:'taskforce_field', sev:'critical', property:'14 Osu Ako-Adjei Ave', landlord:'Kwame Asante Boateng',    status:'under_investigation', opened:'2026-03-10', assigned:'Ofc. Mensah',   advance:9.5,  district:'Ayawaso East' },
  { id:'RC-2026-ACC-00290', type:'no_rent_card',         src:'portal',          sev:'high',     property:'22 Dzorwulu Crescent',  landlord:'Emmanuel Nkrumah-Appiah', status:'received',            opened:'2026-03-09', assigned:null,             advance:18,   district:'Ayawaso West' },
  { id:'RC-2026-ACC-00289', type:'unlawful_eviction',    src:'ussd',            sev:'high',     property:'3 Cantonments Rd',      landlord:'Patricia Asante',         status:'notice_issued',       opened:'2026-03-08', assigned:'Ofc. Amankwa',  advance:0,    district:'Cantonments' },
  { id:'RC-2026-ACC-00288', type:'no_agreement',         src:'portal',          sev:'medium',   property:'18 Spintex Rd',         landlord:'Samuel Tetteh',           status:'received',            opened:'2026-03-08', assigned:null,             advance:0,    district:'Tema West' },
  { id:'RC-2026-ACC-00287', type:'rent_overcharge',      src:'call_centre',     sev:'medium',   property:'7 Burma Camp Rd',       landlord:'Grace Owusu',             status:'resolved',            opened:'2026-03-07', assigned:'Ofc. Quaye',    advance:0,    district:'Cantonments' },
  { id:'RC-2026-ACC-00286', type:'illegal_advance',      src:'whatsapp',        sev:'high',     property:'31 North Kaneshie',     landlord:'Benjamin Frimpong',       status:'under_investigation', opened:'2026-03-06', assigned:'Ofc. Mensah',   advance:11.2, district:'Ablekuma Central' },
  { id:'RC-2026-ACC-00285', type:'unregistered_tenancy', src:'system_flag',     sev:'low',      property:'9 Asylum Down',         landlord:'Ama Kyei-Mensah',         status:'received',            opened:'2026-03-05', assigned:null,             advance:0,    district:'Accra Central' },
  { id:'RC-2026-ACC-00284', type:'illegal_advance',      src:'portal',          sev:'critical', property:'44 Accra New Town',     landlord:'Kofi Adjei-Mensah',       status:'notice_issued',       opened:'2026-03-04', assigned:'Ofc. Osei',     advance:14.0, district:'Ayawaso Central' },
  { id:'RC-2026-ACC-00283', type:'maintenance_failure',  src:'call_centre',     sev:'medium',   property:'12 Tesano Ave',         landlord:'Akosua Darteh',           status:'under_investigation', opened:'2026-03-03', assigned:'Ofc. Boateng',  advance:0,    district:'Okaikwei North' },
  { id:'RC-2026-ACC-00282', type:'harassment',           src:'ussd',            sev:'high',     property:'5 Pig Farm Rd',         landlord:'James Owusu-Acheampong',  status:'received',            opened:'2026-03-02', assigned:null,             advance:0,    district:'Ablekuma North' },
  { id:'RC-2026-ACC-00281', type:'false_particulars',    src:'portal',          sev:'medium',   property:'77 Adabraka High St',   landlord:'Yaa Asantewaa Boafo',     status:'resolved',            opened:'2026-03-01', assigned:'Ofc. Amankwa',  advance:0,    district:'Accra Central' },
  { id:'RC-2026-ACC-00280', type:'illegal_advance',      src:'taskforce_field', sev:'high',     property:'2 Ringway Estate',      landlord:'Charles Appiah-Kubi',     status:'referred_to_court',   opened:'2026-02-28', assigned:'Ofc. Quaye',    advance:8.0,  district:'Cantonment' },
  { id:'RC-2026-ACC-00279', type:'no_rent_card',         src:'system_flag',     sev:'low',      property:'19 Abeka Junction',     landlord:'Comfort Asante',          status:'closed',              opened:'2026-02-25', assigned:'Ofc. Mensah',   advance:0,    district:'Ablekuma Central' },
  { id:'RC-2026-ACC-00278', type:'unlawful_eviction',    src:'whatsapp',        sev:'critical', property:'8 East Legon Hills',    landlord:'Kwadwo Mensah-Bonsu',     status:'referred_to_court',   opened:'2026-02-20', assigned:'Ofc. Osei',     advance:0,    district:'La Nkwantanang' },
];

const LANDLORD_DATA = {
  name: 'Kwame Asante Boateng',
  id: 'L-2291', tin: 'GH-TIN-8821-4490',
  score: 34,
  properties: 3, registered: 2, tenancies: 6, agreements: 4, cards: 4, compliant: 1,
  props: [
    { address:'14 Osu Ako-Adjei Ave', units:6, cards:4, advance:9.5, registered:true,  score:28 },
    { address:'3A Labone Link',        units:2, cards:2, advance:5.0, registered:true,  score:72 },
    { address:'8 Kpehe Rd, Achimota',  units:4, cards:0, advance:7.2, registered:false, score:18 },
  ]
};

const RENT_CARDS = {
  'RG-2025-ACC-00123': { valid:true, address:'14 Osu Ako-Adjei Ave, Accra', landlord:'K. Boateng (L-2291)', rent:1800, issued:'2025-11-01', status:'active', advMonths:9.5, compliant:false, warning:'Advance at 9.5 months — exceeds 6-month cap under Act 220 s.16(5)' },
  'RG-2026-ACC-00441': { valid:true, address:'4 Ring Road West, Accra',     landlord:'Y. Darko-Mensah (L-0882)', rent:1200, issued:'2026-01-10', status:'active', advMonths:3.0, compliant:true, warning:null },
  'RG-2025-ACC-00088': { valid:true, address:'3A Labone Link, East Legon',  landlord:'K. Boateng (L-2291)', rent:2200, issued:'2025-09-15', status:'active', advMonths:5.5, compliant:true, warning:null },
};

const CHECKLIST = [
  { id:'agreement',  label:'Written tenancy agreement exists',            law:'PNDCL 138 s.4',       required:true  },
  { id:'registered', label:'Agreement registered with Rent Control',      law:'PNDCL 138 s.4 (14d)', required:true  },
  { id:'card',       label:'Rent Card issued to tenant',                   law:'Act 220 s.20',        required:true  },
  { id:'card_acc',   label:'Rent Card details accurate and up-to-date',   law:'PNDCL 138 s.5',       required:true  },
  { id:'advance',    label:'Advance rent within 6-month legal cap',       law:'Act 220 s.16(5)',     required:true  },
  { id:'list',       label:'Tenant and rent list filed with Committee',   law:'PNDCL 138 s.5(2)',    required:false },
  { id:'habitab',    label:'Property in habitable condition',             law:'Act 220 s.17',        required:false },
  { id:'landlord',   label:'Landlord or agent present for inspection',    law:'Procedure',           required:false },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const riskColor = (r) => r >= 70 ? T.red : r >= 40 ? T.amber : T.green;
const riskLabel = (r) => r >= 70 ? 'high' : r >= 40 ? 'medium' : 'low';
const riskBadge = (r) => r >= 70 ? 'rg-badge-red' : r >= 40 ? 'rg-badge-amber' : 'rg-badge-green';
const statusBadge = (s) => ({
  received: 'rg-badge-blue', under_investigation: 'rg-badge-amber',
  notice_issued: 'rg-badge-amber', referred_to_court: 'rg-badge-red',
  resolved: 'rg-badge-green', closed: 'rg-badge-muted',
})[s] || 'rg-badge-muted';
const statusLabel = (s) => s.replace(/_/g, ' ');
const caseTypeLabel = (t) => ({
  illegal_advance:'Illegal Advance Rent',   no_rent_card:'No Rent Card Issued',
  unlawful_eviction:'Unlawful Eviction',    no_agreement:'No Tenancy Agreement',
  rent_overcharge:'Rent Overcharge',        unregistered_tenancy:'Unregistered Tenancy',
  maintenance_failure:'Maintenance Failure',false_particulars:'False Rent Particulars',
  harassment:'Landlord Harassment',         other:'Other Violation',
})[t] || t.replace(/_/g,' ');

const Sparkline = ({ data, color }) => {
  const max = Math.max(...data);
  return (
    <div className="sparkline">
      {data.map((v, i) => (
        <div key={i} className="sparkline-bar" style={{ height: `${(v/max)*100}%`, background: color, opacity: i === data.length-1 ? 1 : 0.4 + (i/data.length)*0.4 }} />
      ))}
    </div>
  );
};

const ProgressBar = ({ value, color, height = 4 }) => (
  <div className="rg-progress" style={{ height }}>
    <div className="rg-progress-fill" style={{ width: `${value}%`, background: color }} />
  </div>
);

const StatCard = ({ val, label, change, color, spark }) => (
  <div className="rg-card-sm fade-in">
    <div className="rg-flex" style={{ justifyContent:'space-between', alignItems:'flex-start' }}>
      <div>
        <div className="rg-stat-val" style={{ color }}>{val}</div>
        <div className="rg-stat-label">{label}</div>
        {change !== undefined && (
          <div className="rg-stat-change" style={{ color: change >= 0 ? T.green : T.red }}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vs last month
          </div>
        )}
      </div>
      {spark && <Sparkline data={spark} color={color} />}
    </div>
  </div>
);

// ── LOGO ──────────────────────────────────────────────────────────────────────
const Logo = () => (
  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
    <div style={{ width:28, height:28, background:T.green, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <span style={{ fontFamily:F.head, fontWeight:800, fontSize:16, color:T.bg }}>R</span>
    </div>
    <div>
      <div style={{ fontFamily:F.head, fontWeight:700, fontSize:14, color:T.t1, lineHeight:1 }}>RentGuard</div>
      <div style={{ fontFamily:F.mono, fontSize:8, color:T.t3, letterSpacing:1.5, lineHeight:1.4 }}>GHANA</div>
    </div>
  </div>
);

// ── ROLE SWITCHER ─────────────────────────────────────────────────────────────
const RoleSwitcher = ({ role, setRole }) => { // aria handled inline
  const [open, setOpen] = useState(false);
  const cur = ROLES.find(r => r.id === role);
  return (
    <div style={{ position:'relative' }}>
      <button onClick={() => setOpen(!open)} style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 12px', background:T.card, border:`1px solid ${T.border}`, borderRadius:6, cursor:'pointer', color:T.t1 }}>
        <div style={{ width:7, height:7, borderRadius:'50%', background:cur.color, flexShrink:0 }} />
        <span style={{ fontFamily:F.mono, fontSize:11, fontWeight:500 }}>{cur.badge}</span>
        <span style={{ color:T.t3, fontSize:10 }}>▾</span>
      </button>
      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 6px)', right:0, background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, overflow:'hidden', zIndex:200, minWidth:180, boxShadow:'0 8px 32px rgba(0,0,0,0.5)' }}>
          {ROLES.map(r => (
            <button key={r.id} onClick={() => { setRole(r.id); setOpen(false); }}
              style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', width:'100%', background: r.id===role ? T.card : 'transparent', border:'none', cursor:'pointer', color: r.id===role ? T.t1 : T.t2, textAlign:'left', transition:'all 0.1s' }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:r.color, flexShrink:0 }} />
              <span style={{ fontFamily:F.mono, fontSize:11 }}>{r.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// NATIONAL ADMIN DASHBOARD
// ═════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// EXTENDED MOCK DATA
// ═══════════════════════════════════════════════════════════════════════════


const PAYMENTS_DATA = [
  { id:'PAY-001', date:'2026-03-01', amount:10800, method:'momo_mtn',      period:'Mar–Aug 2026', advance:6.0,  ref:'MTN-2291AA',  compliant:true,  recorded:'Ofc. Mensah' },
  { id:'PAY-002', date:'2026-02-01', amount:5400,  method:'bank_transfer', period:'Feb–Apr 2026', advance:3.0,  ref:'GCB-441882',  compliant:true,  recorded:'Self' },
  { id:'PAY-003', date:'2025-11-01', amount:19800, method:'cash',          period:'Nov 25–Jul 26', advance:11.0, ref:'—',           compliant:false, recorded:'Self' },
  { id:'PAY-004', date:'2026-01-10', amount:3600,  method:'momo_mtn',      period:'Jan–Mar 2026', advance:3.0,  ref:'MTN-0882BB',  compliant:true,  recorded:'Self' },
];

const TENANTS_DATA = [
  { id:'T-001', name:'Abena Sarpong',  phone:'0277-441-001', property:'14 Osu Ako-Adjei Ave', unit:'Unit 2A', rentCard:'RG-2025-ACC-00123', advance:9.5, rent:1800, status:'active', complaint:true  },
  { id:'T-002', name:'Yaw Frimpong',   phone:'0277-441-002', property:'14 Osu Ako-Adjei Ave', unit:'Unit 3B', rentCard:'RG-2025-ACC-00124', advance:9.5, rent:1800, status:'active', complaint:false },
  { id:'T-003', name:'Efua Mensah',    phone:'0277-441-003', property:'4 Ring Road West',     unit:'Unit 1',  rentCard:'RG-2026-ACC-00441', advance:3.0, status:'active', complaint:false },
  { id:'T-004', name:'Kojo Asante',    phone:'0277-441-004', property:'22 Dzorwulu Cres.',    unit:'Unit 5',  rentCard:'—',                 advance:18, status:'active', complaint:true  },
];

const AUDIT_LOG = [
  { id:'AL-001', ts:'2026-03-16 09:31', actor:'Ofc. Mensah',   action:'COMPLETE_INSPECTION', entity:'P-001', detail:'3 violations flagged. Cases auto-generated.' },
  { id:'AL-002', ts:'2026-03-16 09:18', actor:'System',        action:'RISK_SCORE_UPDATED',   entity:'L-3378', detail:'Risk score: 92 → 96. New complaint filed.' },
  { id:'AL-003', ts:'2026-03-16 08:55', actor:'Mgr. Acheampong', action:'CASE_ASSIGNED',     entity:'RC-2026-ACC-00291', detail:'Assigned to Ofc. Mensah.' },
  { id:'AL-004', ts:'2026-03-16 08:44', actor:'Tenant Portal', action:'COMPLAINT_FILED',     entity:'RC-2026-ACC-00291', detail:'USSD source. Phone: 0277-441-004.' },
  { id:'AL-005', ts:'2026-03-15 17:22', actor:'System',        action:'GRA_EXPORT_QUEUED',   entity:'2026-02', detail:'847 landlord records. Period: Feb 2026.' },
  { id:'AL-006', ts:'2026-03-15 16:10', actor:'Mgr. Acheampong', action:'CASE_STATUS_UPDATED', entity:'RC-2026-ACC-00289', detail:'Status: received → notice_issued.' },
  { id:'AL-007', ts:'2026-03-15 14:05', actor:'Ofc. Amankwa',  action:'COMPLETE_INSPECTION', entity:'P-003', detail:'4 violations. Legal referral recommended.' },
  { id:'AL-008', ts:'2026-03-15 11:30', actor:'Landlord Portal',  action:'RENT_CARD_ISSUED',    entity:'RG-2026-ACC-00553', detail:'Tenancy T-009. Card issued by landlord.' },
  { id:'AL-009', ts:'2026-03-15 09:00', actor:'System',           action:'RISK_SCORE_BATCH',    entity:'All landlords',       detail:'Daily risk scoring complete. 312 properties rescored.' },
  { id:'AL-010', ts:'2026-03-14 17:45', actor:'Ofc. Amankwa',    action:'CASE_EVIDENCE_UPLOAD', entity:'RC-2026-ACC-00290',   detail:'3 photos uploaded. GPS: 5.583°N, 0.204°W.' },
  { id:'AL-011', ts:'2026-03-14 14:20', actor:'Mgr. Acheampong', action:'NOTICE_GENERATED',     entity:'RC-2026-NOTICE-00291',detail:'Formal warning notice generated and served via SMS.' },
  { id:'AL-012', ts:'2026-03-13 10:05', actor:'Tenant Portal',   action:'COMPLAINT_FILED',      entity:'RC-2026-ACC-00288',   detail:'Web portal complaint. No tenancy agreement at 18 Spintex Rd.' },
  { id:'AL-013', ts:'2026-03-12 08:30', actor:'System',          action:'SLA_BREACH_ALERT',     entity:'RC-2026-ACC-00282',   detail:'Case RC-2026-ACC-00282 exceeded 48hr SLA. Escalation triggered.' },
  { id:'AL-014', ts:'2026-03-11 16:55', actor:'Mgr. Acheampong', action:'CASE_REFERRED_COURT',  entity:'RC-2026-ACC-00280',   detail:'Case referred to Rent and Housing Committee. Court date pending.' },
  { id:'AL-015', ts:'2026-03-10 09:00', actor:'System',          action:'GRA_SYNC_COMPLETE',    entity:'GRA Export Feb 2026', detail:'847 landlord records transmitted. SFTP confirmed receipt.' },
];

const OFFICERS = [
  { id:'OFF-001', name:'Kofi Mensah',        district:'Ayawaso East',      insp:14, cases:8,  active:true,  phone:'0244-231-001', badge:'RC-TF-001' },
  { id:'OFF-002', name:'Ama Amankwa',        district:'Ayawaso West',      insp:11, cases:5,  active:true,  phone:'0244-231-002', badge:'RC-TF-002' },
  { id:'OFF-003', name:'Samuel Quaye',       district:'Okaikwei North',    insp:9,  cases:4,  active:false, phone:'0244-231-003', badge:'RC-TF-003' },
  { id:'OFF-004', name:'Grace Osei',         district:'La Nkwantanang',   insp:16, cases:9,  active:true,  phone:'0244-231-004', badge:'RC-TF-004' },
  { id:'OFF-005', name:'Prince Ampofo',      district:'Tema West',         insp:7,  cases:3,  active:true,  phone:'0244-231-005', badge:'RC-TF-005' },
  { id:'OFF-006', name:'Janet Amoah',        district:'Accra Central',     insp:12, cases:6,  active:true,  phone:'0244-231-006', badge:'RC-TF-006' },
  { id:'OFF-007', name:'Emmanuel Tetteh',    district:'Ablekuma Central',  insp:10, cases:5,  active:true,  phone:'0244-231-007', badge:'RC-TF-007' },
  { id:'OFF-008', name:'Patricia Asare',     district:'Cantonments',       insp:8,  cases:4,  active:true,  phone:'0244-231-008', badge:'RC-TF-008' },
  { id:'OFF-009', name:'Francis Boateng',    district:'Tema East',         insp:13, cases:7,  active:false, phone:'0244-231-009', badge:'RC-TF-009' },
  { id:'OFF-010', name:'Adwoa Nyarko',       district:'Ashanti North',     insp:15, cases:8,  active:true,  phone:'0244-231-010', badge:'RC-TF-010' },
  { id:'OFF-011', name:'Kwame Frimpong',     district:'Kumasi Central',    insp:11, cases:6,  active:true,  phone:'0244-231-011', badge:'RC-TF-011' },
  { id:'OFF-012', name:'Abena Acheampong',   district:'Sunyani East',      insp:6,  cases:3,  active:true,  phone:'0244-231-012', badge:'RC-TF-012' },
];


const TREND_DATA = {
  cards:       [8, 11, 15, 19, 23, 28, 33, 40, 46, 52, 58, 65],
  violations:  [310, 295, 320, 340, 315, 305, 298, 312, 308, 294, 288, 272],
  complaints:  [28, 31, 26, 34, 29, 38, 32, 41, 36, 44, 38, 47],
  resolved:    [12, 18, 22, 19, 28, 31, 26, 35, 30, 38, 34, 42],
  months: ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
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
  'RC-2026-ACC-00286': [
    { by:'Ofc. Mensah',   ts:'2026-03-06 14:30', text:'Tenant Akosua Boateng reports 11.2 months collected upfront. Total GH₵ 20,160. Says landlord refused to issue rent card. Tenancy not registered.' },
    { by:'Mgr. Acheampong',ts:'2026-03-07 09:15', text:'Reviewed evidence. Advance confirmed at 11.2 months. Notice being drafted. GRA flag raised — landlord has 3+ properties.' },
  ],
  'RC-2026-ACC-00284': [
    { by:'Ofc. Osei',     ts:'2026-03-04 10:10', text:'Visited 44 Accra New Town. Landlord collected 14 months in a single transaction. Bank transfer confirmed from tenant receipt GCB-882211. 5 units all unregistered.' },
    { by:'Mgr. Acheampong',ts:'2026-03-05 11:00', text:'Case escalated to supervisor. Advance of 14 months is the highest on record in Ayawaso Central. Formal notice served via SMS. Court referral initiated.' },
  ],
};

const INSPECTION_HISTORY = [
  { id:'INS-081', date:'2026-03-16', property:'14 Osu Ako-Adjei Ave', officer:'Ofc. Mensah',  violations:3, status:'completed', cases:['RC-2026-ACC-00291'] },
  { id:'INS-080', date:'2026-03-15', property:'22 Dzorwulu Cres.',    officer:'Ofc. Amankwa', violations:4, status:'completed', cases:['RC-2026-ACC-00290'] },
  { id:'INS-079', date:'2026-03-14', property:'4 Ring Road West',     officer:'Ofc. Quaye',   violations:0, status:'completed', cases:[] },
  { id:'INS-078', date:'2026-03-13', property:'19 Spintex Road',      officer:'Ofc. Mensah',  violations:2, status:'completed', cases:['RC-2026-ACC-00286'] },
  { id:'INS-077', date:'2026-03-12', property:'7 Labone Close',       officer:'Ofc. Boateng', violations:1, status:'completed', cases:['RC-2026-ACC-00288'] },
];


// ═══════════════════════════════════════════════════════════════════════════
// SHARED MICRO-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const TrendChart = ({ data, months, lines }) => {
  const h = 100, w = 400;
  const allVals = lines.flatMap(l => data[l.key] || []);
  const max = Math.max(...allVals) * 1.1;
  const min = Math.min(...allVals) * 0.9;
  const pts = (arr) => arr.map((v, i) => {
    const x = (i / (arr.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <div style={{ position:'relative' }}>
      <svg viewBox={`0 0 ${w} ${h+20}`} style={{ width:'100%', overflow:'visible' }}>
        {lines.map((l, li) => {
          const arr = data[l.key] || [];
          const points = pts(arr);
          return (
            <g key={li}>
              {l.fill && (
                <polygon
                  points={`0,${h} ${points} ${w},${h}`}
                  fill={l.color} opacity="0.07"
                />
              )}
              <polyline points={points} fill="none" stroke={l.color} strokeWidth={l.dashed?1.5:2}
                strokeDasharray={l.dashed?'4,4':'none'} strokeLinejoin="round" />
              {arr.map((v, i) => i === arr.length-1 && (
                <circle key={i} cx={(i/(arr.length-1))*w} cy={h-((v-min)/(max-min))*h}
                  r="3.5" fill={l.color} />
              ))}
            </g>
          );
        })}
        {months && months.map((m, i) => (
          <text key={i} x={(i/(months.length-1))*w} y={h+16}
            textAnchor="middle" style={{ fontFamily:'JetBrains Mono, monospace', fontSize:9, fill:'#536358' }}>{m}</text>
        ))}
      </svg>
      <div style={{ display:'flex', gap:16, marginTop:8, flexWrap:'wrap' }}>
        {lines.map((l,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:20, height:2, background:l.color, borderRadius:1 }} />
            <span style={{ fontSize:10, color:'#8FA898' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, sub, action }) => (
  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20 }}>
    <div>
      <div style={{ fontFamily:'"Syne",sans-serif', fontSize:22, fontWeight:700, color:'#E8F0EB' }}>{title}</div>
      {sub && <div style={{ fontSize:13, color:'#8FA898', marginTop:3 }}>{sub}</div>}
    </div>
    {action}
  </div>
);

const InfoRow = ({ label, value, mono, color }) => (
  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(36,54,40,0.4)' }}>
    <span style={{ fontSize:12, color:'#536358' }}>{label}</span>
    <span style={{ fontFamily:mono?'"JetBrains Mono",monospace':undefined, fontSize:12, fontWeight:600, color:color||'#E8F0EB' }}>{value}</span>
  </div>
);

const EmptyState = ({ icon, text }) => (
  <div style={{ padding:'40px 20px', textAlign:'center' }}>
    <div style={{ fontFamily:F.mono, fontSize:10, fontWeight:700, color:'#536358', letterSpacing:2, textTransform:'uppercase', marginBottom:10, opacity:0.5 }}>{icon}</div>
    <div style={{ fontSize:13, color:'#536358' }}>{text}</div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — REGIONS PAGE
// ═══════════════════════════════════════════════════════════════════════════
const AdminRegions = () => {
  const toast = useToast();
  const [selected, setSelected] = useState(null);
  const [drilldown, setDrilldown] = useState(null);

  if (drilldown !== null) {
    return <DistrictDrilldown region={REGIONS[drilldown]} onBack={() => setDrilldown(null)} />;
  }

  const region = selected !== null ? REGIONS[selected] : null;

  return (
    <div className="fade-in">
      <SectionHeader title="Regional Intelligence" sub="Compliance rates, violations and risk levels by region" />
      <div style={{ display:'flex', gap:16 }}>
        {/* Region grid */}
        <div style={{ flex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {REGIONS.map((r, i) => (
              <div key={i} onClick={() => setSelected(selected===i?null:i)}
                style={{ background: selected===i ? (r.risk==='high'?'rgba(229,72,58,0.1)':r.risk==='medium'?'rgba(232,144,10,0.1)':'rgba(15,168,106,0.1)') : '#1A2820',
                  border:`2px solid ${selected===i?(r.risk==='high'?'rgba(229,72,58,0.4)':r.risk==='medium'?'rgba(232,144,10,0.4)':'rgba(15,168,106,0.4)'):'#243628'}`,
                  borderRadius:10, padding:16, cursor:'pointer', transition:'all 0.15s' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                  <div style={{ fontFamily:'"Syne",sans-serif', fontSize:14, fontWeight:700, color:'#E8F0EB' }}>{r.name}</div>
                  <span className={`rg-badge ${r.risk==='high'?'rg-badge-red':r.risk==='medium'?'rg-badge-amber':'rg-badge-green'}`}>{r.risk}</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:10 }}>
                  <div>
                    <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:18, fontWeight:500, color: r.reg>75?'#0FA86A':r.reg>55?'#E8900A':'#E5483A' }}>{r.reg}%</div>
                    <div style={{ fontSize:9, color:'#536358', fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>Registered</div>
                  </div>
                  <div>
                    <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:18, fontWeight:500, color: r.cards>65?'#0FA86A':r.cards>45?'#E8900A':'#E5483A' }}>{r.cards}%</div>
                    <div style={{ fontSize:9, color:'#536358', fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>Rent Cards</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:11, color:'#8FA898' }}>{r.violations} violations</span>
                  <div style={{ display:'flex', gap:2 }}>
                    {[...Array(10)].map((_,j) => (
                      <div key={j} style={{ width:6, height:16, borderRadius:2, background: j < Math.round(r.score/10) ? (r.risk==='high'?'#E5483A':r.risk==='medium'?'#E8900A':'#0FA86A') : '#243628' }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div style={{ width:280, flexShrink:0 }}>
          {region ? (
            <div className="rg-card slide-up" style={{ padding:20 }}>
              <div style={{ fontFamily:'"Syne",sans-serif', fontSize:16, fontWeight:700, marginBottom:4 }}>{region.name} Region</div>
              <span className={`rg-badge ${region.risk==='high'?'rg-badge-red':region.risk==='medium'?'rg-badge-amber':'rg-badge-green'}`} style={{ marginBottom:16, display:'inline-flex' }}>{region.risk} priority</span>
              <InfoRow label="Registration Rate" value={`${region.reg}%`} mono color={region.reg>75?'#0FA86A':region.reg>55?'#E8900A':'#E5483A'} />
              <InfoRow label="Rent Cards Issued" value={`${region.cards}%`} mono color={region.cards>65?'#0FA86A':region.cards>45?'#E8900A':'#E5483A'} />
              <InfoRow label="Active Violations" value={region.violations} mono color={region.violations>200?'#E5483A':region.violations>80?'#E8900A':'#0FA86A'} />
              <InfoRow label="Compliance Score" value={`${region.score}/100`} mono />
              <div style={{ marginTop:16 }}>
                <div style={{ fontSize:10, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Score Breakdown</div>
                {[['Registration',region.reg,'#3B82F6'],['Rent Cards',region.cards,'#0FA86A'],['Low Violations',Math.max(0,100-region.violations/3|0),'#E8900A']].map(([l,v,c],i) => (
                  <div key={i} style={{ marginBottom:8 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                      <span style={{ fontSize:11, color:'#8FA898' }}>{l}</span>
                      <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:c }}>{v}%</span>
                    </div>
                    <div style={{ height:4, background:'#243628', borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${v}%`, background:c, borderRadius:2 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:16 }}>
                <button className="rg-btn rg-btn-primary" style={{ justifyContent:'center', fontSize:11 }} onClick={() => setDrilldown(selected)}>View MMDA Breakdown →</button>
                <button className="rg-btn rg-btn-ghost" style={{ justifyContent:'center', fontSize:11 }} onClick={()=>toast&&toast("Region report queued for download","info")}>Export Region Report</button>
              </div>
            </div>
          ) : (
            <div className="rg-card" style={{ padding:20, height:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8 }}>
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#536358', letterSpacing:2, opacity:0.3 }}>NO SELECTION</div>
              <div style={{ fontSize:12, color:'#536358', textAlign:'center' }}>Click a region to see detailed breakdown</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — OFFICERS PAGE
// ═══════════════════════════════════════════════════════════════════════════
const AdminOfficers = () => {
  const toast = useToast();
  const [selected, setSelected] = useState(null);
  const officer = OFFICERS.find(o => o.id === selected);

  return (
    <div className="fade-in">
      <SectionHeader title="Taskforce Officers"
        sub={`${OFFICERS.filter(o=>o.active).length} active today · ${OFFICERS.length} total deployed`}
        action={<button className="rg-btn rg-btn-primary" onClick={()=>toast&&toast("Invite flow opening — use Settings > User Management","info")}>+ Add Officer</button>} />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:16 }}>
        {OFFICERS.map((o, i) => (
          <div key={i} onClick={() => setSelected(selected===o.id?null:o.id)}
            style={{ background: selected===o.id ? '#1F3025' : '#1A2820', border:`2px solid ${selected===o.id?'#0FA86A':'#243628'}`, borderRadius:10, padding:16, cursor:'pointer', transition:'all 0.15s' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background: o.active?'rgba(15,168,106,0.15)':'rgba(83,99,88,0.2)', border:`2px solid ${o.active?'#0FA86A':'#536358'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:o.active?'#0FA86A':'#536358' }}>
                {o.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                {o.active && <div style={{ width:6, height:6, borderRadius:'50%', background:'#0FA86A' }} className="pulse" />}
                <span style={{ fontSize:10, fontWeight:700, color:o.active?'#0FA86A':'#536358', letterSpacing:1, textTransform:'uppercase' }}>{o.active?'On Duty':'Off Duty'}</span>
              </div>
            </div>
            <div style={{ fontFamily:'"Syne",sans-serif', fontSize:14, fontWeight:700, color:'#E8F0EB', marginBottom:2 }}>{o.name}</div>
            <div style={{ fontSize:12, color:'#8FA898', marginBottom:12 }}>{o.district}</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              <div style={{ background:'#111916', borderRadius:6, padding:'8px 10px' }}>
                <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:16, fontWeight:500, color:'#0FA86A' }}>{o.insp}</div>
                <div style={{ fontSize:9, color:'#536358', fontWeight:600, letterSpacing:1, textTransform:'uppercase', marginTop:2 }}>Inspections</div>
              </div>
              <div style={{ background:'#111916', borderRadius:6, padding:'8px 10px' }}>
                <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:16, fontWeight:500, color:'#E8900A' }}>{o.cases}</div>
                <div style={{ fontSize:9, color:'#536358', fontWeight:600, letterSpacing:1, textTransform:'uppercase', marginTop:2 }}>Cases Filed</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {officer && (
        <div className="rg-card slide-up" style={{ padding:24 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
            <div>
              <div style={{ fontFamily:'"Syne",sans-serif', fontSize:18, fontWeight:700 }}>{officer.name}</div>
              <div style={{ fontSize:13, color:'#8FA898', marginTop:2 }}>{officer.id} · {officer.district} District</div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={()=>toast&&toast(`Message sent to ${officer.name}`,"info")}>Message Officer</button>
              <button className="rg-btn rg-btn-primary" style={{ fontSize:11 }} onClick={()=>toast&&toast(`Open Case Queue to assign cases to ${officer.name}`,"info")}>Assign Case</button>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:14, marginBottom:20 }}>
            {[['Inspections This Month', officer.insp, '#0FA86A'],['Cases Filed',officer.cases,'#E8900A'],['Shift',officer.shift,'#8FA898'],['Last Sync',officer.sync,'#8FA898']].map(([l,v,c],i) => (
              <div key={i} style={{ background:'#111916', borderRadius:8, padding:'12px 14px' }}>
                <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:16, fontWeight:i<2?500:400, color:c, marginBottom:4 }}>{v}</div>
                <div style={{ fontSize:10, color:'#536358', fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily:'"Syne",sans-serif', fontSize:12, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Recent Inspections</div>
          {INSPECTION_HISTORY.filter(h=>h.officer.includes(officer.name.split(' ')[1])||h.officer.includes(officer.name.split(' ')[0])).slice(0,3).map((h,i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:i<2?'1px solid rgba(36,54,40,0.4)':'none' }}>
              <div>
                <div style={{ fontSize:12, fontWeight:600, color:'#E8F0EB' }}>{h.property}</div>
                <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#536358', marginTop:2 }}>{h.id} · {h.date}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:12, color: h.violations>0?'#E5483A':'#0FA86A', fontWeight:600 }}>{h.violations} violation{h.violations!==1?'s':''}</div>
                {h.cases.length>0 && <div style={{ fontSize:10, color:'#8FA898', marginTop:2 }}>{h.cases.length} case{h.cases.length!==1?'s':''} filed</div>}
              </div>
            </div>
          ))}
          {INSPECTION_HISTORY.filter(h=>h.officer.includes(officer.name.split(' ')[1])||h.officer.includes(officer.name.split(' ')[0])).length===0 && (
            <EmptyState icon="LIST" text="No inspections on record for this officer" />
          )}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — CASES (full view with trend + audit)
// ═══════════════════════════════════════════════════════════════════════════
const AdminCases = ({ onSelectCase }) => {
  const toast = useToast();
  return (
  <div className="fade-in">
    <SectionHeader title="Enforcement Cases" sub="All cases across all regions · Live feed" />
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
      <div className="rg-card" style={{ padding:20 }}>
        <div style={{ fontFamily:'"Syne",sans-serif', fontSize:14, fontWeight:700, marginBottom:16 }}>Case Trends — 12 Months</div>
        <TrendChart data={TREND_DATA} months={TREND_DATA.months} lines={[
          { key:'complaints', label:'Complaints Filed', color:'#E5483A', fill:true },
          { key:'resolved',   label:'Resolved',         color:'#0FA86A', fill:true },
        ]} />
      </div>
      <div className="rg-card" style={{ padding:20 }}>
        <div style={{ fontFamily:'"Syne",sans-serif', fontSize:14, fontWeight:700, marginBottom:16 }}>Rent Card Adoption</div>
        <TrendChart data={TREND_DATA} months={TREND_DATA.months} lines={[
          { key:'cards',   label:'Cards Issued (%)', color:'#0FA86A', fill:true },
          { key:'violations', label:'Violations (÷10)', color:'#E5483A', dashed:true },
        ]} />
      </div>
    </div>
    <div className="rg-card" style={{ padding:0 }}>
      <div style={{ padding:'14px 20px', borderBottom:'1px solid #243628', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:'"Syne",sans-serif', fontSize:14, fontWeight:700 }}>All Cases</span>
        <div style={{ display:'flex', gap:8 }}>
          <span className="rg-badge rg-badge-red">{CASES.filter(c=>c.status==='received').length} new</span>
          <button className="rg-btn rg-btn-ghost" style={{ fontSize:11, padding:'4px 10px' }} onClick={()=>toast&&toast("CSV export generated — check Downloads","success")}>Export CSV</button>
        </div>
      </div>
      <table className="rg-table rg-table-clickable">
        <thead><tr><th>Case ID</th><th>Type</th><th>Property</th><th>Severity</th><th>Source</th><th>Status</th><th>Opened</th></tr></thead>
        <tbody>
          {CASES.map((c,i) => (
            <tr key={i} onClick={() => onSelectCase && onSelectCase(c)}>
              <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:'#0FA86A' }}>{c.id.replace('RC-2026-ACC-','')}</span></td>
              <td><span style={{ fontSize:12 }}>{caseTypeLabel(c.type)}</span></td>
              <td><div style={{ fontSize:12, color:'#E8F0EB' }}>{c.property}</div><div style={{ fontSize:11, color:'#536358' }}>{c.landlord}</div></td>
              <td><span className={`rg-badge ${c.sev==='critical'||c.sev==='high'?'rg-badge-red':c.sev==='medium'?'rg-badge-amber':'rg-badge-muted'}`}>{c.sev}</span></td>
              <td><span className="rg-badge rg-badge-muted">{c.src.replace(/_/g,' ')}</span></td>
              <td><span className={`rg-badge ${statusBadge(c.status)}`}>{statusLabel(c.status)}</span></td>
              <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:'#536358' }}>{c.opened}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — AUDIT LOG  
// ═══════════════════════════════════════════════════════════════════════════
const AdminAudit = () => (
  <div className="fade-in">
    <SectionHeader title="Audit Log" sub="All system actions · Immutable trail · Tamper-logged" />
    <div className="rg-card" style={{ padding:0 }}>
      <table className="rg-table">
        <thead><tr><th>Timestamp</th><th>Actor</th><th>Action</th><th>Entity</th><th>Detail</th></tr></thead>
        <tbody>
          {AUDIT_LOG.map((entry, i) => (
            <tr key={i}>
              <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:'#536358' }}>{entry.ts}</span></td>
              <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color: entry.actor==='System'?'#8FA898':'#0FA86A' }}>{entry.actor}</span></td>
              <td>
                <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, fontWeight:700, letterSpacing:0.5,
                  color: entry.action.includes('VIOLATION')||entry.action.includes('COMPLAINT')?'#E5483A':
                         entry.action.includes('ISSUED')||entry.action.includes('RESOLVED')?'#0FA86A':'#E8900A' }}>
                  {entry.action}
                </span>
              </td>
              <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:'#8FA898' }}>{entry.entity}</span></td>
              <td><span style={{ fontSize:12, color:'#8FA898' }}>{entry.detail}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// CASE MANAGER — CASE DETAIL (deep view with timeline + notes)
// ═══════════════════════════════════════════════════════════════════════════
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
      if (caseState) caseState.advanceCaseStatus(caseData.id, newStatus);
      toast && toast('Status: ' + newStatus.replace(/_/g,' '), 'success');
    }
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes(prev => [...prev, { ts: new Date().toISOString().slice(0,16).replace('T',' '), by:'Mgr. Acheampong', note:newNote }]);
    setNewNote('');
  };



  return (
    <div className="fade-in">
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={onBack} className="rg-btn rg-btn-ghost" style={{ fontSize:11, padding:'5px 12px' }}>← Cases</button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:12, color:'#0FA86A', marginBottom:2 }}>{caseData.id}</div>
          <div style={{ fontFamily:'"Syne",sans-serif', fontSize:20, fontWeight:700 }}>{caseTypeLabel(caseData.type)}</div>
        </div>
        <span className={`rg-badge ${caseData.sev==='critical'||caseData.sev==='high'?'rg-badge-red':caseData.sev==='medium'?'rg-badge-amber':'rg-badge-muted'}`} style={{ fontSize:11, padding:'5px 10px' }}>{caseData.sev}</span>
      </div>

      {/* Status timeline */}
      <div className="rg-card" style={{ padding:20, marginBottom:16 }}>
        <div style={{ fontFamily:'"Syne",sans-serif', fontSize:12, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:16 }}>Case Status</div>
        <div style={{ display:'flex', alignItems:'center', gap:0 }}>
          {statusFlow.map((s, i) => {
            const done = i <= curIdx;
            const current = i === curIdx;
            return (
              <div key={s} style={{ display:'flex', alignItems:'center', flex: i < statusFlow.length-1 ? 1 : 'none' }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background: done?'#0FA86A':'#243628', border:`2px solid ${done?'#0FA86A':'#243628'}`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow: current?`0 0 0 3px rgba(15,168,106,0.25)`:undefined, transition:'all 0.3s' }}>
                    {done && <span style={{ fontSize:12, color:'#fff' }}>✓</span>}
                  </div>
                  <span style={{ fontSize:9, fontWeight:700, color:done?'#0FA86A':'#536358', letterSpacing:0.5, textTransform:'uppercase', textAlign:'center', maxWidth:72, lineHeight:1.3 }}>{s.replace(/_/g,' ')}</span>
                </div>
                {i < statusFlow.length-1 && <div style={{ flex:1, height:2, background: i < curIdx ? '#0FA86A' : '#243628', margin:'0 4px', marginBottom:22, transition:'background 0.3s' }} />}
              </div>
            );
          })}
        </div>
        <div style={{ display:'flex', gap:8, marginTop:16 }}>
          {curIdx < statusFlow.length-1 && (
            <button className="rg-btn rg-btn-primary" onClick={advanceStatus}>
              Advance → {statusFlow[curIdx+1].replace(/_/g,' ')}
            </button>
          )}
          <button className="rg-btn rg-btn-ghost" style={{ fontSize:12 }} onClick={()=>toast&&toast("Open Assign Officers page to route this case","info")}>Assign Officer</button>
          <button className="rg-btn rg-btn-danger" style={{ fontSize:12 }} onClick={()=>toast&&toast("Case referred to Rent and Housing Committee","warning")}>Refer to Court</button>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
        {/* Case details */}
        <div className="rg-card" style={{ padding:20 }}>
          <div style={{ fontFamily:'"Syne",sans-serif', fontSize:12, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:14 }}>Case Details</div>
          <InfoRow label="Case Type" value={caseTypeLabel(caseData.type)} />
          <InfoRow label="Property" value={caseData.property} />
          <InfoRow label="Landlord" value={caseData.landlord} />
          <InfoRow label="District" value={caseData.district} />
          <InfoRow label="Source" value={caseData.src.replace(/_/g,' ')} mono />
          <InfoRow label="Opened" value={caseData.opened} mono />
          <InfoRow label="Assigned" value={caseData.assigned || 'Unassigned'} color={caseData.assigned?'#E8F0EB':'#E5483A'} />
          {caseData.advance > 6 && (
            <div style={{ marginTop:14, padding:'12px 14px', background:'rgba(229,72,58,0.1)', border:'1px solid rgba(229,72,58,0.2)', borderRadius:8 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#E5483A', marginBottom:4 }}>Advance Rent Calculation</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8 }}>
                <div style={{ background:'#111916', borderRadius:6, padding:'8px 10px' }}>
                  <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:16, color:'#E5483A' }}>{caseData.advance}</div>
                  <div style={{ fontSize:9, color:'#536358', fontWeight:700, letterSpacing:1, textTransform:'uppercase', marginTop:2 }}>Months Collected</div>
                </div>
                <div style={{ background:'#111916', borderRadius:6, padding:'8px 10px' }}>
                  <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:16, color:'#E8900A' }}>6</div>
                  <div style={{ fontSize:9, color:'#536358', fontWeight:700, letterSpacing:1, textTransform:'uppercase', marginTop:2 }}>Legal Cap (months)</div>
                </div>
              </div>
              <div style={{ marginTop:10, fontSize:12, color:'#8FA898', lineHeight:1.6 }}>
                Excess: ~GH₵ {((caseData.advance-6)*1800).toLocaleString()} · Act 220 s.16(5) breach · {caseData.sev === 'critical' ? 'Auto-referral recommended' : 'Formal notice recommended'}
              </div>
            </div>
          )}
        </div>

        {/* Timeline / Notes */}
        <div className="rg-card" style={{ padding:20 }}>
          <div style={{ fontFamily:'"Syne",sans-serif', fontSize:12, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:14 }}>Case Timeline</div>
          <div style={{ maxHeight:280, overflowY:'auto', paddingRight:4 }}>
            {notes.length > 0 ? notes.map((n, i) => (
              <div key={i} style={{ display:'flex', gap:12, marginBottom:14 }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background: n.by==='System'?'#536358':n.by.includes('Ofc')?'#0FA86A':'#3B82F6', marginTop:3 }} />
                  {i < notes.length-1 && <div style={{ width:1, flex:1, background:'#243628', marginTop:4 }} />}
                </div>
                <div style={{ flex:1, paddingBottom:i<notes.length-1?12:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:n.by==='System'?'#536358':n.by.includes('Ofc')?'#0FA86A':'#3B82F6', fontWeight:600 }}>{n.by}</span>
                    <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#536358' }}>{n.ts}</span>
                  </div>
                  <div style={{ fontSize:12, color:'#8FA898', lineHeight:1.6 }}>{n.note}</div>
                </div>
              </div>
            )) : <EmptyState icon="NOTE" text="No notes yet" />}
          </div>
          <CaseNoteInput caseId={caseData.id} onAdd={(note) => { setNotes(prev => [...prev, note]); toast('Note added', 'success'); }} />
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// CASE MANAGER — ASSIGN OFFICERS  
// ═══════════════════════════════════════════════════════════════════════════
const AssignOfficers = () => {
  const [assignments, setAssignments] = useState({});
  const unassigned = CASES.filter(c => !c.assigned && c.status === 'received');

  return (
    <div className="fade-in">
      <SectionHeader title="Assign Officers" sub={`${unassigned.length} unassigned cases · ${OFFICERS.filter(o=>o.active).length} officers on duty`} />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div>
          <div style={{ fontSize:10, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Unassigned Cases</div>
          {unassigned.length === 0 && <EmptyState icon="OK" text="All cases assigned" />}
          {unassigned.map((c, i) => (
            <div key={i} className="rg-card" style={{ padding:14, marginBottom:8, borderLeft:`3px solid ${c.sev==='critical'||c.sev==='high'?'#E5483A':'#E8900A'}` }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                <div>
                  <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#0FA86A', marginBottom:2 }}>{c.id.replace('RC-2026-ACC-','')}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#E8F0EB' }}>{caseTypeLabel(c.type)}</div>
                  <div style={{ fontSize:12, color:'#8FA898' }}>{c.district}</div>
                </div>
                <span className={`rg-badge ${c.sev==='critical'||c.sev==='high'?'rg-badge-red':'rg-badge-amber'}`}>{c.sev}</span>
              </div>
              <div>
                <select value={assignments[c.id]||''} onChange={e => setAssignments(p=>({...p,[c.id]:e.target.value}))} className="rg-select" style={{ fontSize:12 }}>
                  <option value="">Select officer…</option>
                  {OFFICERS.filter(o=>o.active).map(o => (
                    <option key={o.id} value={o.id}>{o.name} — {o.district} ({o.cases} cases)</option>
                  ))}
                </select>
                {assignments[c.id] && (
                  <button className="rg-btn rg-btn-primary" style={{ marginTop:8, width:'100%', justifyContent:'center', fontSize:11 }}>
                    Assign to {OFFICERS.find(o=>o.id===assignments[c.id])?.name}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:10, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Officers on Duty</div>
          {OFFICERS.filter(o=>o.active).map((o, i) => (
            <div key={i} className="rg-card" style={{ padding:14, marginBottom:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:'rgba(15,168,106,0.15)', border:'2px solid #0FA86A', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#0FA86A' }}>{o.name.split(' ').map(n=>n[0]).join('')}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#E8F0EB' }}>{o.name}</div>
                    <div style={{ fontSize:11, color:'#8FA898' }}>{o.district}</div>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:13, color:'#E8900A' }}>{o.cases} cases</div>
                  <div style={{ fontSize:10, color:'#536358' }}>current load</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// OFFICER — SYNC STATUS PAGE
// ═══════════════════════════════════════════════════════════════════════════
const OfficerSync = () => {
  const toast = useToast();
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [syncFailed, setSyncFailed] = useState(false);
  const queue = [
    { id:'OFFLINE-001', type:'COMPLETE_INSPECTION', priority:'high',   status:'pending', created:'09:31', size:'2 photos + checklist' },
    { id:'OFFLINE-002', type:'CREATE_CASE',          priority:'high',   status:'pending', created:'09:31', size:'GPS + 1 photo' },
    { id:'OFFLINE-003', type:'RECORD_PAYMENT',        priority:'normal', status:'synced',  created:'08:14', size:'Payment record' },
    { id:'OFFLINE-004', type:'COMPLETE_INSPECTION',   priority:'normal', status:'synced',  created:'07:55', size:'Checklist only' },
  ];
  const doSync = () => {
    setSyncing(true); setSyncFailed(false);
    setTimeout(() => {
      setSyncing(false);
      if (Math.random() < 0.15) { setSyncFailed(true); }
      else { setSynced(true); }
    }, 2000);
  };

  return (
    <div className="fade-in" style={{ padding:16 }}>
      {/* Connection status */}
      <div style={{ background:'rgba(15,168,106,0.1)', border:'1px solid rgba(15,168,106,0.25)', borderRadius:10, padding:16, marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <div style={{ width:10, height:10, borderRadius:'50%', background:'#0FA86A' }} className="pulse" />
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:'#0FA86A' }}>Online · 4G Connected</div>
            <div style={{ fontSize:11, color:'#8FA898', marginTop:1 }}>rentguard.gh · Last sync: 2 min ago</div>
          </div>
        </div>
        <button className="rg-btn rg-btn-primary" onClick={doSync} style={{ fontSize:11 }}>
          {syncing ? 'Syncing…' : syncFailed ? 'Retry Sync' : synced ? '✓ Synced' : 'Sync Now'}
        </button>
      </div>

      <div style={{ fontSize:10, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Offline Queue</div>
      {queue.map((item, i) => (
        <div key={i} style={{ background: item.status==='synced'?'#111916':'#1A2820', border:`1px solid ${item.status==='synced'?'#243628':item.priority==='high'?'rgba(232,144,10,0.3)':'#243628'}`, borderRadius:8, padding:'12px 14px', marginBottom:8, display:'flex', gap:12, alignItems:'center' }}>
          <div style={{ width:8, height:8, borderRadius:'50%', flexShrink:0, background: item.status==='synced'?'#0FA86A':item.priority==='high'?'#E8900A':'#536358' }} />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12, fontWeight:700, color: item.status==='synced'?'#8FA898':'#E8F0EB' }}>{item.type.replace(/_/g,' ')}</div>
            <div style={{ fontSize:10, color:'#536358', marginTop:2 }}>{item.id} · {item.created} · {item.size}</div>
          </div>
          <span className={`rg-badge ${item.status==='synced'?'rg-badge-green':item.priority==='high'?'rg-badge-amber':'rg-badge-muted'}`}>{item.status}</span>
        </div>
      ))}

      <div style={{ fontSize:10, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10, marginTop:20 }}>My Stats This Month</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        {[['14','Inspections'],['8','Cases Filed'],['3','Violations Critical'],['22','Properties Visited']].map(([v,l],i) => (
          <div key={i} style={{ background:'#1A2820', border:'1px solid #243628', borderRadius:8, padding:'14px', textAlign:'center' }}>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:24, fontWeight:500, color:'#0FA86A' }}>{v}</div>
            <div style={{ fontSize:11, color:'#536358', marginTop:4 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// LANDLORD — TENANTS PAGE
// ═══════════════════════════════════════════════════════════════════════════
const LandlordTenants = () => {
  const toast = useToast();
  const [selected, setSelected] = useState(null);

  return (
    <div className="fade-in">
      <SectionHeader title="My Tenants" sub="Active tenancies · Rent cards · Advance compliance" action={<button className="rg-btn rg-btn-primary" onClick={()=>toast&&toast("Go to Register Property to add a new tenancy","info")}>+ Add Tenancy</button>} />
      <div className="rg-card" style={{ padding:0 }}>
        <table className="rg-table rg-table-clickable">
          <thead><tr><th>Tenant</th><th>Property · Unit</th><th>Rent Card</th><th>Advance</th><th>Status</th><th>Complaint</th></tr></thead>
          <tbody>
            {TENANTS_DATA.map((t,i) => (
              <tr key={i} onClick={() => setSelected(selected===t.id?null:t.id)}>
                <td>
                  <div style={{ fontSize:13, fontWeight:700, color:'#E8F0EB' }}>{t.name}</div>
                  <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#536358' }}>{t.phone}</div>
                </td>
                <td><div style={{ fontSize:12 }}>{t.property}</div><div style={{ fontSize:11, color:'#536358' }}>{t.unit}</div></td>
                <td>
                  {t.rentCard !== '—'
                    ? <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:'#0FA86A' }}>{t.rentCard}</span>
                    : <span className="rg-badge rg-badge-red">Not Issued</span>
                  }
                </td>
                <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:12, fontWeight:700, color: t.advance>6?'#E5483A':'#0FA86A' }}>{t.advance} mo</span></td>
                <td><span className="rg-badge rg-badge-green">{t.status}</span></td>
                <td>{t.complaint ? <span className="rg-badge rg-badge-red">Open</span> : <span style={{ fontSize:12, color:'#536358' }}>—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {TENANTS_DATA.filter(t=>t.id===selected).map(t => (
        <div key={t.id} className="rg-card slide-up" style={{ padding:24, marginTop:14 }}>
          <div style={{ fontFamily:'"Syne",sans-serif', fontSize:16, fontWeight:700, marginBottom:16 }}>Tenancy Detail — {t.name}</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
            <div>
              <InfoRow label="Phone" value={t.phone} mono />
              <InfoRow label="Property" value={t.property} />
              <InfoRow label="Unit" value={t.unit} />
              <InfoRow label="Rent Card" value={t.rentCard} mono color={t.rentCard!=='—'?'#0FA86A':'#E5483A'} />
              <InfoRow label="Advance Paid" value={`${t.advance} months`} mono color={t.advance>6?'#E5483A':'#0FA86A'} />
              {t.advance > 6 && <div style={{ marginTop:12, padding:'10px 12px', background:'rgba(229,72,58,0.1)', border:'1px solid rgba(229,72,58,0.2)', borderRadius:6, fontSize:12, color:'#E5483A', lineHeight:1.6 }}>Advance exceeds 6-month legal cap. Exposure: ~GH₵ {((t.advance-6)*1800).toLocaleString()} over the limit.</div>}
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Actions</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {t.rentCard === '—' && <button className="rg-btn rg-btn-primary" style={{ justifyContent:'center' }} onClick={()=>toast&&toast("Go to Rent Cards to issue a new card for this tenant","info")}>Issue Rent Card</button>}
                <button className="rg-btn rg-btn-ghost" style={{ justifyContent:'center' }} onClick={()=>toast&&toast("Go to Payments to record a new payment","info")}>Record Payment</button>
                <button className="rg-btn rg-btn-ghost" style={{ justifyContent:'center' }} onClick={()=>toast&&toast("Go to Documents to upload the agreement","info")}>Upload Agreement</button>
                {t.complaint && <div style={{ padding:'10px 12px', background:'rgba(229,72,58,0.1)', border:'1px solid rgba(229,72,58,0.2)', borderRadius:6, fontSize:12, color:'#E5483A' }}>Open complaint from this tenant. Check Cases tab.</div>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// LANDLORD — PAYMENTS PAGE  
// ═══════════════════════════════════════════════════════════════════════════
const LandlordPayments = () => {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('momo_mtn');
  const [recorded, setRecorded] = useState(false);

  return (
    <div className="fade-in">
      <SectionHeader title="Payment Records" sub="All rent payments · Advance tracking · Act 220 compliance" action={<button className="rg-btn rg-btn-primary" onClick={() => setShowForm(!showForm)}>+ Record Payment</button>} />

      {showForm && (
        <div className="rg-card slide-up" style={{ padding:20, marginBottom:16 }}>
          <div style={{ fontFamily:'"Syne",sans-serif', fontSize:14, fontWeight:700, marginBottom:16 }}>Record New Payment</div>
          {recorded ? (
            <div style={{ padding:'14px', background:'rgba(15,168,106,0.1)', border:'1px solid rgba(15,168,106,0.25)', borderRadius:8, textAlign:'center' }}>
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, fontWeight:700, color:'#0FA86A', letterSpacing:2, marginBottom:6 }}>RECORDED</div>
              <div style={{ fontFamily:'"Syne",sans-serif', fontSize:14, fontWeight:700, color:'#0FA86A' }}>Payment Recorded</div>
              <div style={{ fontSize:12, color:'#8FA898', marginTop:4 }}>Advance compliance check completed. Entry hash generated.</div>
              <button className="rg-btn rg-btn-ghost" style={{ marginTop:12 }} onClick={() => { setRecorded(false); setShowForm(false); setAmount(''); }}>Done</button>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <div className="rg-field">
                <label>Amount (GH₵)</label>
                <input type="number" className="rg-input" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="e.g. 1800" />
              </div>
              <div className="rg-field">
                <label>Payment Method</label>
                <select className="rg-select" value={method} onChange={e=>setMethod(e.target.value)}>
                  <option value="momo_mtn">MTN Mobile Money</option>
                  <option value="momo_telecel">Telecel Cash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div className="rg-field">
                <label>Rent Card</label>
                <select className="rg-select">
                  {Object.keys(RENT_CARDS).map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div className="rg-field">
                <label>Is Advance Payment?</label>
                <select className="rg-select">
                  <option value="yes">Yes — advance</option>
                  <option value="no">No — current period</option>
                </select>
              </div>
              <div style={{ gridColumn:'1/-1' }}>
                <button className="rg-btn rg-btn-primary" onClick={() => amount && setRecorded(true)} style={{ marginRight:8 }}>Record Payment</button>
                <button className="rg-btn rg-btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rg-card" style={{ padding:0 }}>
        <table className="rg-table">
          <thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Period</th><th>Advance</th><th>Compliant</th><th>Reference</th></tr></thead>
          <tbody>
            {PAYMENTS_DATA.map((p,i) => (
              <tr key={i}>
                <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:'#8FA898' }}>{p.date}</span></td>
                <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:12, fontWeight:700, color:'#E8F0EB' }}>GH₵ {p.amount.toLocaleString()}</span></td>
                <td><span className="rg-badge rg-badge-muted">{p.method.replace(/_/g,' ')}</span></td>
                <td><span style={{ fontSize:12, color:'#8FA898' }}>{p.period}</span></td>
                <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:12, color: p.advance>6?'#E5483A':'#8FA898' }}>{p.advance} mo</span></td>
                <td>{p.compliant ? <span className="rg-badge rg-badge-green">✓ Legal</span> : <span className="rg-badge rg-badge-red">✗ Violation</span>}</td>
                <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:'#536358' }}>{p.ref}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// TENANT — MY TENANCY DASHBOARD (replaces just 'verify')
// ═══════════════════════════════════════════════════════════════════════════
const TenantDashboard = () => {
  const toast = useToast();
  const myCard = RENT_CARDS['RG-2025-ACC-00123'];
  return (
    <div className="fade-in">
      <SectionHeader title="My Tenancy" sub="Abena Sarpong · 14 Osu Ako-Adjei Ave, Unit 2A" />

      {/* Alert banner */}
      <div style={{ padding:'14px 18px', background:'rgba(229,72,58,0.1)', border:'1px solid rgba(229,72,58,0.25)', borderLeft:'4px solid #E5483A', borderRadius:8, marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:'#E5483A', marginBottom:3 }}>Advance Rent Violation Detected</div>
          <div style={{ fontSize:12, color:'#8FA898', lineHeight:1.6 }}>Your landlord collected 9.5 months advance — the legal cap is 6 months. Excess: ~GH₵ 6,300. You may be entitled to a refund.</div>
        </div>
        <button className="rg-btn rg-btn-danger" style={{ marginLeft:16, flexShrink:0, fontSize:11 }} onClick={()=>toast&&toast("Go to File Complaint tab to report this","info")}>File Complaint</button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16 }}>
        {/* Rent card status */}
        <div className="rg-card" style={{ padding:20 }}>
          <div style={{ fontSize:10, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>Your Rent Card</div>
          <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:14 }}>
            
            <div>
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:13, fontWeight:700, color:'#0FA86A' }}>RG-2025-ACC-00123</div>
              <div style={{ fontSize:11, color:'#8FA898', marginTop:1 }}>Active · Issued 2025-11-01</div>
            </div>
          </div>
          <InfoRow label="Property" value="14 Osu Ako-Adjei Ave" />
          <InfoRow label="Monthly Rent" value="GH₵ 1,800" mono />
          <InfoRow label="Advance Paid" value="9.5 months" mono color="#E5483A" />
          <InfoRow label="Legal Limit" value="6 months" mono color="#0FA86A" />
          <div style={{ marginTop:14 }}>
            <button className="rg-btn rg-btn-ghost" style={{ fontSize:11, width:'100%', justifyContent:'center' }} onClick={()=>toast&&toast("Rent card PDF downloaded","success")}>Download Rent Card PDF</button>
          </div>
        </div>

        {/* Rights snapshot */}
        <div className="rg-card" style={{ padding:20 }}>
          <div style={{ fontSize:10, fontWeight:700, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>Your Rights Status</div>
          {[
            { right:'Written Tenancy Agreement', ok:true,  law:'PNDCL 138 s.4' },
            { right:'Registered Tenancy',        ok:false, law:'PNDCL 138 s.4' },
            { right:'Official Rent Card',        ok:true,  law:'Act 220 s.20' },
            { right:'Advance Within Legal Limit',ok:false, law:'Act 220 s.16(5)' },
            { right:'Habitable Premises',        ok:true,  law:'Act 220 s.17' },
          ].map((r,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'7px 0', borderBottom:i<4?'1px solid rgba(36,54,40,0.4)':'none' }}>
              <span style={{ fontSize:14, color:r.ok?'#0FA86A':'#E5483A', flexShrink:0 }}>{r.ok?'✓':'✗'}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, color:r.ok?'#E8F0EB':'#E5483A', fontWeight:r.ok?400:600 }}>{r.right}</div>
                <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#536358' }}>{r.law}</div>
              </div>
              {!r.ok && <button className="rg-btn rg-btn-danger" style={{ fontSize:10, padding:'3px 8px' }} onClick={()=>toast&&toast("Go to File Complaint to take action on this violation","error")}>Act</button>}
            </div>
          ))}
        </div>
      </div>

      {/* My cases */}
      <div className="rg-card" style={{ padding:0 }}>
        <div style={{ padding:'14px 20px', borderBottom:'1px solid #243628', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontFamily:'"Syne",sans-serif', fontSize:14, fontWeight:700 }}>My Complaints</span>
          <span className="rg-badge rg-badge-amber">1 open</span>
        </div>
        <table className="rg-table">
          <thead><tr><th>Case ID</th><th>Type</th><th>Opened</th><th>Status</th><th>Update</th></tr></thead>
          <tbody>
            <tr>
              <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:'#0FA86A' }}>RC-2026-ACC-00291</span></td>
              <td><span style={{ fontSize:12 }}>Illegal Advance Rent</span></td>
              <td><span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:'#536358' }}>2026-03-10</span></td>
              <td><span className="rg-badge rg-badge-amber">under investigation</span></td>
              <td><span style={{ fontSize:12, color:'#8FA898' }}>Ofc. Mensah contacted landlord. Notice pending.</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// v3 DEPTH ADDITIONS — for skeptical government stakeholders
// ═══════════════════════════════════════════════════════════════════════════

// ── GRA EXPORT PAGE ────────────────────────────────────────────────────────
const GRAExport = () => {
  const toast = useToast();
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [preview, setPreview] = useState(false);

  const GRA_ROWS = [
    { tin:'GH-TIN-8821-4490', card:'GHA-001-2291-XXXX', props:3, tenancies:6,  income:194400, period_payments:16200, advance_violations:3, unreg_tenancies:1, district:'Ayawaso East',   region:'Greater Accra' },
    { tin:'GH-TIN-3378-9920', card:'GHA-003-3378-XXXX', props:1, tenancies:12, income:388800, period_payments:0,     advance_violations:4, unreg_tenancies:12,district:'Ayawaso West',  region:'Greater Accra' },
    { tin:'GH-TIN-4451-3312', card:'GHA-004-4451-XXXX', props:2, tenancies:8,  income:259200, period_payments:8640,  advance_violations:2, unreg_tenancies:3, district:'Tema West',      region:'Greater Accra' },
    { tin:'GH-TIN-1104-5521', card:'GHA-001-1104-XXXX', props:1, tenancies:3,  income:79200,  period_payments:6600,  advance_violations:0, unreg_tenancies:0, district:'La Nkwantanang', region:'Greater Accra' },
    { tin:'GH-TIN-0882-7734', card:'GHA-001-0882-XXXX', props:1, tenancies:4,  income:57600,  period_payments:4800,  advance_violations:0, unreg_tenancies:0, district:'Okaikwei North', region:'Greater Accra' },
  ];

  const doGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1800);
  };

  const csvPreview = `landlord_tin,landlord_ghana_card,total_properties,total_active_tenancies,estimated_annual_rental_income,payments_recorded_this_period,advance_violations,unregistered_tenancies,district,region
GH-TIN-8821-4490,GHA-001-2291-XXXX,3,6,194400,16200,3,1,Ayawaso East,Greater Accra
GH-TIN-3378-9920,GHA-003-3378-XXXX,1,12,388800,0,4,12,Ayawaso West,Greater Accra
GH-TIN-4451-3312,GHA-004-4451-XXXX,2,8,259200,8640,2,3,Tema West,Greater Accra
GH-TIN-1104-5521,GHA-001-1104-XXXX,1,3,79200,6600,0,0,La Nkwantanang,Greater Accra
GH-TIN-0882-7734,GHA-001-0882-XXXX,1,4,57600,4800,0,0,Okaikwei North,Greater Accra`;

  return (
    <div className="fade-in">
      <SectionHeader title="GRA Tax Export"
        sub="Rental income data · Periodic export to Ghana Revenue Authority · February 2026" />

      {/* Context box */}
      <div style={{ padding:'16px 20px', background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.2)', borderLeft:`4px solid ${T.blue}`, borderRadius:8, marginBottom:20 }}>
        <div style={{ fontFamily:F.head, fontSize:13, fontWeight:700, color:T.blue, marginBottom:6 }}>How This Works</div>
        <div style={{ fontSize:13, color:T.t2, lineHeight:1.75 }}>
          The Rent Taskforce is mandated to work with GRA to ensure rental income is properly declared and taxed. RentGuard generates a secure, encrypted CSV export linking landlord TINs to their registered properties, active tenancies, and estimated annual rental income — cross-referencing compliance flags so GRA can prioritise audit targets.
          <br /><br />
          <strong style={{ color:T.t1 }}>Data sharing is governed by MOU</strong> between Rent Control and GRA. All exports are logged in the audit trail. Only national admin and GRA auditor roles can trigger exports.
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
        {[
          ['847', 'Landlords with TIN on file', T.green ],
          ['GH₵ 4.2B', 'Est. annual rental income tracked', T.lime ],
          ['312', 'Landlords with advance violations', T.red ],
          ['22', 'Multi-property landlords flagged', T.amber ],
        ].map(([v,l,c],i) => (
          <div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:'16px' }}>
            <div style={{ fontFamily:F.mono, fontSize:22, fontWeight:500, color:c, marginBottom:6 }}>{v}</div>
            <div style={{ fontSize:11, color:T.t2, lineHeight:1.4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Export generator */}
      <div className="rg-card" style={{ padding:24, marginBottom:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
          <div>
            <div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, marginBottom:4 }}>Generate Export</div>
            <div style={{ fontSize:13, color:T.t2 }}>gra-rental-export-2026-02.csv · 847 records · Encrypted</div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            {generated
              ? <button className="rg-btn rg-btn-lime" style={{ fontSize:12 }} onClick={()=>toast&&toast("GRA CSV downloaded successfully","success")}>↓ Download CSV</button>
              : <button className="rg-btn rg-btn-primary" onClick={doGenerate} style={{ fontSize:12 }}>
                  {generating ? (
                    <span style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ width:12, height:12, border:`2px solid rgba(255,255,255,0.3)`, borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin 0.8s linear infinite' }} />
                      Generating…
                    </span>
                  ) : 'Generate Export'}
                </button>
            }
          </div>
        </div>

        {generated && (
          <div className="fade-in">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:16 }}>
              {[['847','Landlords exported'],['GH₵ 979.2M','Total est. income'],['313','Violations flagged']].map(([v,l],i) => (
                <div key={i} style={{ background:T.bg, borderRadius:6, padding:'12px 14px' }}>
                  <div style={{ fontFamily:F.mono, fontSize:16, fontWeight:600, color:T.green }}>{v}</div>
                  <div style={{ fontSize:11, color:T.t3, marginTop:3 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:8, marginBottom:16 }}>
              <button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={() => setPreview(!preview)}>
                {preview ? 'Hide Preview' : 'Preview CSV Structure'}
              </button>
              <button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={()=>toast&&toast("SFTP transfer initiated to GRA — confirmation in 24hrs","success")}>Notify GRA via SFTP</button>
            </div>
            {preview && (
              <div className="fade-in" style={{ background:T.bg, border:`1px solid ${T.border}`, borderRadius:6, padding:'14px 16px', overflowX:'auto' }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>CSV Preview (first 5 rows)</div>
                <pre style={{ fontFamily:F.mono, fontSize:10, color:T.t2, lineHeight:1.8, whiteSpace:'pre', overflow:'auto' }}>{csvPreview}</pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Landlord rows */}
      <div className="rg-card" style={{ padding:0 }}>
        <div style={{ padding:'14px 20px', borderBottom:`1px solid ${T.border}` }}>
          <span style={{ fontFamily:F.head, fontSize:14, fontWeight:700 }}>Export Preview — Sample Rows</span>
        </div>
        <table className="rg-table">
          <thead><tr><th>Landlord TIN</th><th>Properties</th><th>Tenancies</th><th>Est. Annual Income (GH₵)</th><th>Period Payments</th><th>Violations</th><th>Unreg. Tenancies</th><th>District</th></tr></thead>
          <tbody>
            {GRA_ROWS.map((r,i) => (
              <tr key={i}>
                <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{r.tin}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:12 }}>{r.props}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:12 }}>{r.tenancies}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color:T.lime }}>{r.income.toLocaleString()}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:12, color: r.period_payments===0?T.red:T.t1 }}>{r.period_payments===0?'—':r.period_payments.toLocaleString()}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:12, color: r.advance_violations>0?T.red:T.green }}>{r.advance_violations}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:12, color: r.unreg_tenancies>0?T.amber:T.green }}>{r.unreg_tenancies}</span></td>
                <td><span style={{ fontSize:12, color:T.t2 }}>{r.district}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── PROPERTY DEEP-DIVE ──────────────────────────────────────────────────────
const PropertyDrilldown = ({ onBack }) => {
  const [prop, setProp] = useState(PROPERTIES[0]);
  const [tab, setTab] = useState('overview');

  const tenancyRows = [
    { id:'T-001', tenant:'Abena Sarpong', unit:'2A', rent:1800, card:'RG-2025-ACC-00123', advance:9.5, since:'2025-11-01', status:'active', compliant:false },
    { id:'T-002', tenant:'Yaw Frimpong',  unit:'3B', rent:1800, card:'RG-2025-ACC-00124', advance:9.5, since:'2025-11-01', status:'active', compliant:false },
    { id:'T-003', tenant:'Kofi Agyei',    unit:'1A', rent:1800, card:'—',                  advance:0,   since:'2025-08-01', status:'active', compliant:false },
    { id:'T-004', tenant:'Ama Boateng',   unit:'1B', rent:2200, card:'—',                  advance:0,   since:'2025-09-15', status:'active', compliant:false },
  ];

  const riskFactors = [
    { label:'Unregistered properties', weight:25, score:0,   raw:'0 of 3 unregistered', note:'All properties registered' },
    { label:'Tenancies without rent cards', weight:20, score:20, raw:'4 of 6 tenancies lack cards', note:'Missing cards on 4 units' },
    { label:'Open cases (last 90 days)', weight:30, score:27, raw:'3 open cases on file', note:'3 complaints active — high weight' },
    { label:'Advance rent violations', weight:25, score:25, raw:'9.5 months collected at P-001', note:'Critical — all weight applied' },
  ];
  const totalRisk = riskFactors.reduce((s,f) => s+f.score, 0);

  return (
    <div className="fade-in">
      {onBack && (
        <button onClick={onBack} className="rg-btn rg-btn-ghost" style={{ fontSize:11, padding:'5px 12px', marginBottom:16 }}>← Properties</button>
      )}

      {/* Property selector */}
      <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
        {PROPERTIES.map((p,i) => (
          <button key={i} onClick={() => setProp(p)} className={`rg-btn ${prop.id===p.id?'rg-btn-primary':'rg-btn-ghost'}`} style={{ fontSize:11 }}>
            {p.id}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="rg-card" style={{ padding:20, marginBottom:14 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontFamily:F.head, fontSize:18, fontWeight:700, marginBottom:4 }}>{prop.address}</div>
            <div style={{ fontSize:13, color:T.t2 }}>{prop.mmda} Municipal District · {prop.landlord} · {prop.lid}</div>
            <div style={{ display:'flex', gap:8, marginTop:10 }}>
              {prop.registered ? <span className="rg-badge rg-badge-green">Registered</span> : <span className="rg-badge rg-badge-red">Unregistered</span>}
              <span className={`rg-badge ${riskBadge(prop.risk)}`}>Risk {prop.risk}/100</span>
              {prop.violations > 0 && <span className="rg-badge rg-badge-red">{prop.violations} violations</span>}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, textAlign:'center' }}>
            {[['Units',prop.units,'#E8F0EB'],['Cards',`${prop.cards}/${prop.tenancies}`, prop.cards===prop.tenancies?T.green:T.amber],['Complaints',prop.complaints,prop.complaints>0?T.red:T.green]].map(([l,v,c],i) => (
              <div key={i} style={{ background:T.bg, borderRadius:6, padding:'10px 14px' }}>
                <div style={{ fontFamily:F.mono, fontSize:20, fontWeight:500, color:c }}>{v}</div>
                <div style={{ fontSize:9, color:T.t3, fontWeight:700, letterSpacing:1, textTransform:'uppercase', marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rg-tabs rg-mb-2">
        {[['overview','Overview'],['tenancies','Tenancies'],['risk','Risk Scoring'],['history','Inspection History'],['notices','Notices']].map(([id,lbl]) => (
          <button key={id} className={`rg-tab${tab===id?' active':''}`} onClick={() => setTab(id)}>{lbl}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <div className="rg-card" style={{ padding:20 }}>
            <div style={{ fontFamily:F.head, fontSize:13, fontWeight:700, marginBottom:14, color:T.t3, letterSpacing:1, textTransform:'uppercase' }}>Property Details</div>
            <InfoRow label="Property ID" value={prop.id} mono />
            <InfoRow label="Street Address" value={prop.address} />
            <InfoRow label="MMDA" value={prop.mmda} />
            <InfoRow label="Landlord" value={prop.landlord} />
            <InfoRow label="Landlord ID" value={prop.lid} mono />
            <InfoRow label="Total Units" value={prop.units} mono />
            <InfoRow label="Rent Control Registered" value={prop.registered ? '✓ Yes' : '✗ No'} color={prop.registered?T.green:T.red} />
            <InfoRow label="Digital Property Address" value={prop.registered ? `GHA-ACC-${prop.id}-2024` : '—'} mono color={prop.registered?T.green:T.t3} />
            <InfoRow label="Last Inspection" value={prop.lastInsp} mono />
          </div>
          <div className="rg-card" style={{ padding:20 }}>
            <div style={{ fontFamily:F.head, fontSize:13, fontWeight:700, marginBottom:14, color:T.t3, letterSpacing:1, textTransform:'uppercase' }}>Compliance Summary</div>
            {[
              { l:'Rent Cards Issued', v:`${prop.cards}/${prop.tenancies}`, ok: prop.cards===prop.tenancies },
              { l:'Avg Advance (months)', v:`${prop.advance} months`, ok: prop.advance<=6 },
              { l:'Active Violations', v: prop.violations, ok: prop.violations===0 },
              { l:'Open Complaints', v: prop.complaints, ok: prop.complaints===0 },
              { l:'PNDCL 138 s.4 — Registration', v: prop.registered?'Compliant':'Non-compliant', ok: prop.registered },
              { l:'Act 220 s.16(5) — Advance Cap', v: prop.advance<=6?'Compliant':'Non-compliant', ok: prop.advance<=6 },
              { l:'PNDCL 138 s.5 — Rent Cards', v: prop.cards===prop.tenancies?'Compliant':'Partial', ok: prop.cards===prop.tenancies },
            ].map((row,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:`1px solid rgba(36,54,40,0.4)` }}>
                <span style={{ fontSize:12, color:T.t3 }}>{row.l}</span>
                <span style={{ fontFamily:F.mono, fontSize:12, fontWeight:600, color:row.ok?T.green:T.red }}>{String(row.v)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'tenancies' && (
        <div className="rg-card" style={{ padding:0 }}>
          <table className="rg-table">
            <thead><tr><th>Tenant</th><th>Unit</th><th>Monthly Rent</th><th>Rent Card</th><th>Advance</th><th>Since</th><th>Compliant</th></tr></thead>
            <tbody>
              {tenancyRows.map((t,i) => (
                <tr key={i}>
                  <td style={{ fontSize:13, fontWeight:600, color:T.t1 }}>{t.tenant}</td>
                  <td><span style={{ fontFamily:F.mono, fontSize:12 }}>{t.unit}</span></td>
                  <td><span style={{ fontFamily:F.mono, fontSize:12 }}>GH₵ {t.rent.toLocaleString()}</span></td>
                  <td>{t.card!=='—' ? <span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{t.card}</span> : <span className="rg-badge rg-badge-red">Missing</span>}</td>
                  <td><span style={{ fontFamily:F.mono, fontSize:12, color:t.advance>6?T.red:t.advance===0?T.amber:T.green }}>{t.advance>0?`${t.advance} mo`:'Not recorded'}</span></td>
                  <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{t.since}</span></td>
                  <td>{t.compliant ? <span className="rg-badge rg-badge-green">✓</span> : <span className="rg-badge rg-badge-red">✗</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'risk' && (
        <div>
          <div className="rg-card" style={{ padding:20, marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <div>
                <div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, marginBottom:4 }}>Risk Score Formula</div>
                <div style={{ fontSize:13, color:T.t2 }}>Weighted composite · 0–100 · Higher = greater enforcement priority</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontFamily:F.mono, fontSize:42, fontWeight:700, color:riskColor(totalRisk), lineHeight:1 }}>{totalRisk}</div>
                <div style={{ fontSize:11, color:T.t3 }}>/100</div>
              </div>
            </div>

            {riskFactors.map((f,i) => (
              <div key={i} style={{ marginBottom:18, paddingBottom:18, borderBottom: i<riskFactors.length-1 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                  <div style={{ flex:1, paddingRight:16 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:T.t1, marginBottom:2 }}>{f.label}</div>
                    <div style={{ fontSize:11, color:T.t3, marginBottom:4 }}>{f.note}</div>
                    <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                      <span style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>Observed: </span>
                      <span style={{ fontFamily:F.mono, fontSize:11, color:T.amber }}>{f.raw}</span>
                    </div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <div style={{ fontFamily:F.mono, fontSize:20, fontWeight:700, color:f.score>0?T.red:T.green }}>{f.score}</div>
                    <div style={{ fontSize:10, color:T.t3 }}>of {f.weight} pts</div>
                  </div>
                </div>
                <div style={{ height:8, background:T.border, borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${(f.score/f.weight)*100}%`, background:f.score===0?T.green:f.score>=f.weight*0.8?T.red:T.amber, borderRadius:4, transition:'width 0.8s ease' }} />
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
                  <span style={{ fontSize:9, color:T.t3 }}>0</span>
                  <span style={{ fontSize:9, color:T.t3, fontWeight:700 }}>weight: {f.weight}%</span>
                  <span style={{ fontSize:9, color:T.t3 }}>{f.weight}</span>
                </div>
              </div>
            ))}

            <div style={{ padding:'14px 16px', background: totalRisk>=70?T.redFade:totalRisk>=40?T.amberFade:T.greenFade, border:`1px solid ${totalRisk>=70?'rgba(229,72,58,0.25)':totalRisk>=40?'rgba(232,144,10,0.25)':'rgba(15,168,106,0.25)'}`, borderRadius:8, marginTop:4 }}>
              <div style={{ fontFamily:F.mono, fontSize:13, fontWeight:700, color:riskColor(totalRisk), marginBottom:4 }}>
                Score: {totalRisk}/100 → {totalRisk>=70?'HIGH — Priority Inspection Target':totalRisk>=40?'MEDIUM — Schedule Inspection':'LOW — Routine Monitoring'}
              </div>
              <div style={{ fontSize:12, color:T.t2, lineHeight:1.65 }}>
                {totalRisk>=70
                  ? 'This property is ranked in the top 10% of risk-scored properties in Ayawaso East. Taskforce officers are assigned here first. GRA cross-referral applied.'
                  : 'Monitor quarterly. No immediate enforcement action required.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="rg-card" style={{ padding:0 }}>
          <div style={{ padding:'14px 20px', borderBottom:`1px solid ${T.border}` }}>
            <span style={{ fontFamily:F.head, fontSize:14, fontWeight:700 }}>Inspection History</span>
          </div>
          <table className="rg-table">
            <thead><tr><th>Inspection ID</th><th>Date</th><th>Officer</th><th>Violations</th><th>Cases Generated</th><th>Status</th></tr></thead>
            <tbody>
              {INSPECTION_HISTORY.filter((_,i)=>i<3).map((h,i) => (
                <tr key={i}>
                  <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{h.id}</span></td>
                  <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{h.date}</span></td>
                  <td style={{ fontSize:12 }}>{h.officer}</td>
                  <td><span style={{ fontFamily:F.mono, fontSize:12, color:h.violations>0?T.red:T.green, fontWeight:700 }}>{h.violations}</span></td>
                  <td>
                    {h.cases.length>0
                      ? h.cases.map(c => <span key={c} style={{ fontFamily:F.mono, fontSize:10, color:T.green, marginRight:6 }}>{c.replace('RC-2026-ACC-','')}</span>)
                      : <span style={{ fontSize:11, color:T.t3 }}>—</span>
                    }
                  </td>
                  <td><span className="rg-badge rg-badge-green">{h.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'notices' && <NoticeGenerator prop={prop} />}
    </div>
  );
};

// ── NOTICE GENERATOR ────────────────────────────────────────────────────────
const NoticeGenerator = ({ prop }) => {
  const toast = useToast();
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [noticeType, setNoticeType] = useState('formal_warning');

  const doGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1200);
  };

  const notice = `OFFICIAL NOTICE — GHANA RENT CONTROL DEPARTMENT
Ministry of Works and Housing

Date: 16 March 2026
Reference: RC-2026-NOTICE-00291
Case: RC-2026-ACC-00291

TO: ${prop.landlord}
    Landlord ID: ${prop.lid}
    Property: ${prop.address}

SUBJECT: FORMAL WARNING — VIOLATION OF RENT ACT, 1963 (ACT 220) AND RENT CONTROL LAW, 1986 (PNDCL 138)

Following an inspection conducted on 16 March 2026, the following violations have been recorded at the above-referenced property:

1. EXCESSIVE ADVANCE RENT — ACT 220 s.16(5)
   Advance rent of 9.5 months has been collected from tenants in Units 2A and 3B. The legal maximum under Section 16(5) of the Rent Act, 1963 is SIX (6) MONTHS for tenancies longer than one month. The excess collected (~GH₵ 6,300 per unit) is unlawful.

2. FAILURE TO ISSUE RENT CARDS — PNDCL 138 s.5
   Rent Cards have not been issued for Units 1A and 1B. Issuance of Rent Cards is a statutory obligation under Section 5 of the Rent Control Law, 1986.

YOU ARE HEREBY ORDERED TO:
(a) Refund the excess advance rent to affected tenants within 14 days of this notice;
(b) Issue Rent Cards for all uncarried units immediately;
(c) Register all tenancy agreements with this Department within 14 days.

FAILURE TO COMPLY will result in prosecution under the offence provisions of Act 220 and PNDCL 138, and referral to the Ghana Revenue Authority for tax audit.

This notice is issued under authority of the Rent Control Act.

[DIGITALLY SIGNED]
Acting Rent Commissioner
Ghana Rent Control Department
Accra, Ghana
Notice ID: RC-2026-NOTICE-00291 | Generated via RentGuard · rentguard.gh`;

  return (
    <div>
      <div className="rg-card" style={{ padding:20, marginBottom:14 }}>
        <div style={{ fontFamily:F.head, fontSize:15, fontWeight:700, marginBottom:4 }}>Legal Notice Generator</div>
        <div style={{ fontSize:13, color:T.t2, marginBottom:16 }}>Generate a formal notice to serve to the landlord. Auto-populates violation details from inspection records.</div>

        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
          {[
            ['formal_warning','Formal Warning (First Offence)'],
            ['final_notice','Final Notice Before Prosecution'],
            ['court_referral','Court Referral Letter'],
          ].map(([v,l]) => (
            <div onClick={() => setNoticeType(v)} style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 14px', borderRadius:6, cursor:'pointer', background:noticeType===v?T.greenFade:T.bg, border:`1.5px solid ${noticeType===v?T.green:T.border}` }}>
              <div style={{ width:12, height:12, borderRadius:'50%', border:`2px solid ${noticeType===v?T.green:T.border}`, background:noticeType===v?T.green:'transparent', flexShrink:0 }} />
              <span style={{ fontSize:13, color:noticeType===v?T.t1:T.t2, fontWeight:noticeType===v?600:400 }}>{l}</span>
            </div>
          ))}
        </div>

        <button className="rg-btn rg-btn-primary" onClick={doGenerate}>
          {generating ? 'Generating…' : generated ? '↓ Download PDF' : 'Generate Notice'}
        </button>
      </div>

      {generated && (
        <div className="rg-card fade-in" style={{ padding:0 }}>
          <div style={{ padding:'12px 20px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:F.head, fontSize:13, fontWeight:700 }}>Notice Preview — RC-2026-NOTICE-00291</span>
            <div style={{ display:'flex', gap:8 }}>
              <span className="rg-badge rg-badge-amber">Formal Warning</span>
              <button className="rg-btn rg-btn-ghost" style={{ fontSize:11, padding:'3px 10px' }} onClick={()=>toast&&toast("Notice PDF downloaded","success")}>↓ PDF</button>
              <button className="rg-btn rg-btn-ghost" style={{ fontSize:11, padding:'3px 10px' }} onClick={()=>toast&&toast("Notice sent to landlord by SMS","success")}>Send by SMS</button>
            </div>
          </div>
          <div style={{ padding:'20px 24px' }}>
            <pre style={{ fontFamily:F.mono, fontSize:11, color:T.t2, lineHeight:1.9, whiteSpace:'pre-wrap', borderLeft:`3px solid ${T.border}`, paddingLeft:16 }}>{notice}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

// ── ENFORCEMENT FLOW (end-to-end walkthrough) ──────────────────────────────
const EnforcementFlow = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      num:'01', title:'Complaint Received',
      who:'Tenant · USSD / Web / WhatsApp',
      icon:'[FIELD]',
      detail:'Tenant Abena Sarpong dials *714*1# → Option 2. She reports that her landlord at 14 Osu Ako-Adjei Ave collected 9.5 months advance. The USSD handler creates a structured case record and routes it into the RentGuard case queue.',
      data:{ 'Source':'USSD *714*1#', 'Phone':'0277-441-001', 'Violation':'Illegal Advance Rent', 'Property':'14 Osu Ako-Adjei Ave', 'Advance claimed':'9.5 months', 'Created':'RC-2026-ACC-00291' },
      law:'Act 220 s.16(5) — max 6 months advance',
      color:T.blue,
    },
    {
      num:'02', title:'Auto-Risk Scoring',
      who:'System · Runs within 60 seconds',
      icon:'[AUTO]',
      detail:'The risk scoring engine fetches the landlord\'s profile. It cross-references 3 open cases, 4 tenancies without rent cards, and the 9.5-month advance data. Risk score updates from 72 to 87. The property is elevated to "Priority Inspection Target" in the officer route planner for Ayawaso East.',
      data:{ 'Risk before':'72', 'Risk after':'87', 'Trigger':'Open cases + advance violation', 'Action':'Route priority elevated', 'GRA flag':'Applied (3 properties)', 'Officer notified':'Ofc. Kofi Mensah' },
      law:'Weighted scoring: advance(25%) + cases(30%) + no-cards(20%) + unreg(25%)',
      color:T.amber,
    },
    {
      num:'03', title:'Officer Assignment',
      who:'Case Manager · Manual assignment',
      icon:'[ASSIGN]',
      detail:'Case Manager reviews the queue. The case is CRITICAL severity — landlord has 3 open cases in 90 days. Manager assigns to Ofc. Kofi Mensah, the officer patrolling Ayawaso East today. Assignment is logged in the audit trail with timestamp and manager ID.',
      data:{ 'Assigned by':'Mgr. Acheampong', 'Assigned to':'Ofc. Kofi Mensah', 'SLA deadline':'2026-03-18 (48hrs)', 'Priority':'Critical', 'Status change':'received → under_investigation', 'SMS sent':'Yes — landlord + tenant' },
      law:'PNDCL 138 s.4 — 14-day registration; investigation duty',
      color:T.green,
    },
    {
      num:'04', title:'Field Inspection',
      who:'Ofc. Mensah · In the field, offline-capable',
      icon:'[INSPECT]',
      detail:'Officer Mensah arrives at 14 Osu Ako-Adjei Ave. Using the RentGuard mobile app, he runs the 8-point inspection checklist. He photographs the tenancy agreements (no Rent Control stamp), captures GPS coordinates, and records that 2 units have no rent cards. The app works offline and queues all data for sync.',
      data:{ 'Checklist items failed':'5 of 8 (required)', 'Photos captured':'3 (GPS-stamped)', 'GPS':'5.558°N, 0.187°W', 'Offline sync':'Queued — synced on 4G restore', 'Cases auto-generated':'2 additional (no card, no agreement)', 'Time on site':'42 minutes' },
      law:'PNDCL 138 s.5 — rent cards; Act 220 s.20 — inspection powers',
      color:T.green,
    },
    {
      num:'05', title:'Formal Notice Issued',
      who:'Case Manager · System-generated',
      icon:'[NOTICE]',
      detail:'Case Manager reviews inspection report. Violation confirmed. A formal notice (RC-2026-NOTICE-00291) is generated with all violation details auto-populated from the case record. Notice is served digitally to the landlord\'s registered phone and email, with a 14-day compliance deadline.',
      data:{ 'Notice ID':'RC-2026-NOTICE-00291', 'Type':'Formal Warning', 'Violations cited':'3 (advance, no card, no agreement)', 'Compliance deadline':'30 March 2026', 'Delivery':'SMS + Email + Portal notification', 'Status':'notice_issued' },
      law:'Act 220 offence provisions; PNDCL 138 sanction powers',
      color:T.amber,
    },
    {
      num:'06', title:'GRA Cross-Referral',
      who:'System · Automated on violation confirmation',
      icon:'[GRA]',
      detail:'Because the landlord has 3 registered properties and 6 active tenancies, they cross the multi-property threshold for GRA flagging. An entry is added to the next scheduled GRA export. GRA auditors will cross-check the landlord\'s declared rental income against the estimated GH₵ 194,400 annual income tracked by RentGuard.',
      data:{ 'GRA flag':'Applied', 'Estimated annual income':'GH₵ 194,400', 'Properties flagged':'3', 'Export period':'February 2026', 'TIN on file':'GH-TIN-8821-4490', 'Audit risk':'High — declared income likely differs' },
      law:'Income Tax Act — rental income obligations; GRA-Rent Control MOU',
      color:T.red,
    },
    {
      num:'07', title:'Resolution or Prosecution',
      who:'Case Manager / Rent Control Committee',
      icon:'[COURT]',
      detail:'If landlord complies within 14 days (issues cards, refunds excess advance), the case is resolved and compliance score improves. If not, the case is referred to the Rent and Housing Committee for prosecution under Act 220 offence provisions. All actions logged. Tenant is notified by SMS at every stage.',
      data:{ 'Outcome (if compliant)':'Resolved · Score +18 points', 'Outcome (if not)':'Referred to Rent and Housing Committee', 'Tenant notification':'SMS at every status change', 'Appeal window':'30 days from committee order', 'Enforcement record':'Permanent · visible to GRA', 'Case closed':'RC-2026-ACC-00291' },
      law:'Act 220 offence provisions; Rent and Housing Committee jurisdiction',
      color:T.green,
    },
  ];

  const cur = steps[step];

  return (
    <div className="fade-in">
      <SectionHeader title="End-to-End Enforcement Flow"
        sub="A single complaint — from USSD dial to resolution or prosecution" />

      {/* Step pills */}
      <div style={{ display:'flex', alignItems:'center', marginBottom:24, overflowX:'auto', paddingBottom:4 }}>
        {steps.map((s,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', flexShrink:0 }}>
            <button onClick={() => setStep(i)} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:20, cursor:'pointer', transition:'all 0.15s', background: step===i?s.color:'transparent', border:`2px solid ${step===i?s.color:T.border}`, color: step===i?'#fff':T.t3, fontSize:11, fontWeight:700 }}>
              <span style={{ fontFamily:F.mono }}>{s.num}</span>
              <span style={{ display:step===i?'inline':'none' }}>{s.title}</span>
              <span style={{ fontFamily:F.mono, fontSize:10 }}>{s.num}</span>
            </button>
            {i < steps.length-1 && <div style={{ width:20, height:2, background: i<step?T.green:T.border, flexShrink:0 }} />}
          </div>
        ))}
      </div>

      {/* Active step detail */}
      <div key={step} className="rg-card slide-up" style={{ padding:0, borderTop:`3px solid ${cur.color}` }}>
        <div style={{ padding:'20px 24px', borderBottom:`1px solid ${T.border}` }}>
          <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
            <div style={{ fontFamily:F.mono, fontSize:10, fontWeight:700, color:cur.color, letterSpacing:2, background:'rgba(255,255,255,0.04)', border:`1px solid ${cur.color}`, borderRadius:4, padding:'6px 10px', flexShrink:0, alignSelf:'flex-start', marginTop:3 }}>{cur.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:6 }}>
                <span style={{ fontFamily:F.mono, fontSize:11, color:cur.color }}>{cur.num}</span>
                <div style={{ width:1, height:14, background:T.border }} />
                <span style={{ fontFamily:F.head, fontSize:18, fontWeight:700 }}>{cur.title}</span>
              </div>
              <div style={{ fontSize:12, color:T.t3, marginBottom:10 }}>{cur.who}</div>
              <div style={{ fontSize:13, color:T.t2, lineHeight:1.8 }}>{cur.detail}</div>
            </div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>
          <div style={{ padding:'20px 24px', borderRight:`1px solid ${T.border}` }}>
            <div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>Data at this step</div>
            {Object.entries(cur.data).map(([k,v],i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:`1px solid rgba(36,54,40,0.35)` }}>
                <span style={{ fontSize:12, color:T.t3 }}>{k}</span>
                <span style={{ fontFamily:F.mono, fontSize:11, fontWeight:600, color:T.t1, textAlign:'right', maxWidth:'55%' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ padding:'20px 24px' }}>
            <div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>Legal Authority</div>
            <div style={{ padding:'12px 14px', background:T.bg, borderRadius:6, border:`1px solid ${T.border}`, fontSize:12, color:T.t2, lineHeight:1.7, marginBottom:16 }}>{cur.law}</div>
            <div style={{ display:'flex', gap:8 }}>
              {step > 0 && <button onClick={() => setStep(step-1)} className="rg-btn rg-btn-ghost" style={{ fontSize:11 }}>← Previous</button>}
              {step < steps.length-1 && <button onClick={() => setStep(step+1)} className="rg-btn rg-btn-primary" style={{ fontSize:11 }}>Next Step →</button>}
              {step === steps.length-1 && <span style={{ fontSize:12, color:T.green, padding:'8px 0' }}>✓ Full workflow demonstrated</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── SYSTEM INTEGRATION PAGE ─────────────────────────────────────────────────
const SystemIntegration = () => {
  const [pingStatus, setPingStatus] = useState({ rc:null, nia:null, gra:null, momo:null });
  const [pinging, setPinging] = useState(false);

  const doPing = () => {
    setPinging(true);
    setPingStatus({ rc:null, nia:null, gra:null, momo:null });
    setTimeout(() => setPingStatus(p => ({...p, rc:'ok'})), 600);
    setTimeout(() => setPingStatus(p => ({...p, momo:'ok'})), 900);
    setTimeout(() => setPingStatus(p => ({...p, nia:'ok'})), 1400);
    setTimeout(() => setPingStatus(p => ({...p, gra:'ok'})), 1800);
    setTimeout(() => setPinging(false), 2000);
  };

  const systems = [
    { id:'rc', name:'rentcontrol.mwh.gov.gh', owner:'Ministry of Works & Housing · SuperTech Ltd.', role:'Primary data layer — bi-directional sync of tenancy registrations, complaints, digital tenancy agreements', color:T.green, syncTime:'2 min ago', records:'1,482 properties · 4,218 tenancies', note:'RentGuard is an enforcement extension — not a replacement' },
    { id:'nia', name:'NIA Ghana Card Verification', owner:'National Identification Authority', role:'Identity verification for landlords and tenants — binds person records to Ghana Card numbers', color:T.blue, syncTime:'On-demand', records:'Per-request API', note:'Reduces fraud in landlord/tenant onboarding' },
    { id:'gra', name:'GRA Tax Data Bridge', owner:'Ghana Revenue Authority', role:'Periodic export of rental income data — cross-references landlord TINs with tracked rental income', color:T.amber, syncTime:'Monthly export', records:'847 landlords in scope', note:'SFTP encrypted export · MOU governed' },
    { id:'momo', name:'MTN MoMo + Telecel Cash', owner:'MTN Ghana · Telecel Ghana', role:'Payment recording webhooks — MoMo transaction IDs are attached to rent card payment records', color:'#FFCB05', syncTime:'Real-time webhook', records:'156 payments this month', note:'Provides tamper-resistant payment trail' },
  ];

  return (
    <div className="fade-in">
      <SectionHeader title="System Integrations"
        sub="RentGuard sits on top of existing infrastructure — it never replaces it"
        action={<button className="rg-btn rg-btn-primary" onClick={doPing}>{pinging?'Checking…':'Ping All Systems'}</button>} />

      {/* Architecture diagram */}
      <div className="rg-card" style={{ padding:24, marginBottom:20 }}>
        <div style={{ fontFamily:F.head, fontSize:13, fontWeight:700, color:T.t3, letterSpacing:1, textTransform:'uppercase', marginBottom:16 }}>Architecture Position</div>
        <div style={{ display:'flex', alignItems:'center', gap:0, overflowX:'auto', paddingBottom:8 }}>
          {[
            { label:'Taskforce Officers', sub:'Field App (Android)', color:T.green },
            { label:'Case Managers', sub:'Web Dashboard', color:T.blue },
            { label:'Tenants', sub:'USSD + Web', color:T.t2 },
            { label:'Landlords', sub:'Compliance Portal', color:T.amber },
          ].map((actor,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', flexShrink:0 }}>
              <div style={{ background:T.card, border:`2px solid ${actor.color}`, borderRadius:8, padding:'10px 14px', textAlign:'center', minWidth:110 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.t1 }}>{actor.label}</div>
                <div style={{ fontSize:10, color:T.t3 }}>{actor.sub}</div>
              </div>
              {i < 3 && <div style={{ fontFamily:F.mono, fontSize:14, color:T.border, margin:'0 6px' }}>+</div>}
            </div>
          ))}
          <div style={{ fontFamily:F.mono, fontSize:18, color:T.t3, margin:'0 12px' }}>↓</div>
          <div style={{ background:T.greenFade, border:`2px solid ${T.green}`, borderRadius:8, padding:'14px 20px', textAlign:'center', minWidth:160 }}>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:800, color:T.green, marginBottom:2 }}>RentGuard</div>
            <div style={{ fontSize:10, color:T.t2 }}>Enforcement + Intelligence Layer</div>
          </div>
          <div style={{ fontFamily:F.mono, fontSize:18, color:T.t3, margin:'0 12px' }}>↕</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {[['rentcontrol.mwh.gov.gh',T.green],['GRA Tax System',T.amber],['NIA Ghana Card',T.blue],['MoMo/Telecel','#FFCB05']].map(([l,c],i) => (
              <div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:6, padding:'6px 12px', display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:c }} className={pingStatus[['rc','gra','nia','momo'][i]]==='ok'?'pulse':undefined} />
                <span style={{ fontFamily:F.mono, fontSize:10, color:pingStatus[['rc','gra','nia','momo'][i]]==='ok'?c:T.t3 }}>{l}</span>
                {pingStatus[['rc','gra','nia','momo'][i]]==='ok' && <span style={{ fontSize:10, color:T.green, marginLeft:4 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration cards */}
      {systems.map((sys,i) => (
        <div key={i} className="rg-card" style={{ padding:20, marginBottom:12, borderLeft:`4px solid ${sys.color}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
            <div style={{ flex:1, paddingRight:16 }}>
              <div style={{ fontFamily:F.mono, fontSize:14, fontWeight:700, color:sys.color, marginBottom:3 }}>{sys.name}</div>
              <div style={{ fontSize:12, color:T.t3, marginBottom:8 }}>{sys.owner}</div>
              <div style={{ fontSize:13, color:T.t2, lineHeight:1.7 }}>{sys.role}</div>
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, justifyContent:'flex-end', marginBottom:6 }}>
                <div style={{ width:7, height:7, borderRadius:'50%', background: pingStatus[sys.id]==='ok'?T.green:T.border }} className={pingStatus[sys.id]==='ok'?'pulse':undefined} />
                <span style={{ fontFamily:F.mono, fontSize:10, color:pingStatus[sys.id]==='ok'?T.green:T.t3 }}>{pingStatus[sys.id]==='ok'?'ONLINE':'—'}</span>
              </div>
              <div style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{sys.syncTime}</div>
              <div style={{ fontFamily:F.mono, fontSize:10, color:T.t3, marginTop:2 }}>{sys.records}</div>
            </div>
          </div>
          <div style={{ padding:'8px 12px', background:T.bg, borderRadius:5, fontSize:11, color:T.t3, borderLeft:`2px solid ${T.border}` }}>
            Note: {sys.note}
          </div>
        </div>
      ))}
    </div>
  );
};
const AdminDashboard = ({ onSelectCase }) => {
  const [regionTab, setRegionTab] = useState('table');
  const complianceMapColors = [T.red, T.red, T.amber, T.green, T.green, T.green, T.red, T.amber, T.amber, T.amber];

  const [showNetworkBanner, setShowNetworkBanner] = useState(false);
  return (
    <div className="fade-in">
      {showNetworkBanner && (
        <div style={{ padding:'10px 16px', background:'rgba(232,144,10,0.1)', border:`1px solid rgba(232,144,10,0.2)`, borderRadius:6, marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, color:T.amber }}>
          <span>Sync delay — last confirmed sync 8 min ago. Some data may be stale.</span>
          <button onClick={()=>setShowNetworkBanner(false)} style={{ background:'transparent', border:'none', color:T.amber, cursor:'pointer', fontSize:14 }}>×</button>
        </div>
      )}
      <div className="rg-flex" style={{ justifyContent:'space-between', alignItems:'flex-end', marginBottom:24 }}>
        <div>
          <div className="rg-page-title">National Enforcement Dashboard</div>
          <div className="rg-page-sub">Ghana Rent Control Department · Live · 16 March 2026</div>
        </div>
        <div className="rg-flex rg-gap-1">
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 12px', background:T.greenFade, border:`1px solid rgba(15,168,106,0.2)`, borderRadius:6 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:T.green }} className="pulse" />
            <span style={{ fontFamily:F.mono, fontSize:11, color:T.green, fontWeight:500 }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="rg-grid-4 rg-mb-3">
        <StatCard val="38%" label="Tenancies Registered" change={12} color={T.amber} spark={[22,25,28,30,32,34,36,38]} />
        <StatCard val="29%" label="Rent Cards Issued" change={8} color={T.red} spark={[10,12,15,17,20,22,25,29]} />
        <StatCard val="312" label="Active Violations (Accra)" change={-5} color={T.red} spark={[280,330,350,320,310,340,295,312]} />
        <StatCard val="68" label="National Compliance Score" color={T.amber} spark={[58,60,62,63,65,65,67,68]} />
      </div>
      <div className="rg-grid-4 rg-mb-3">
        <StatCard val="1,482" label="Properties Registered" change={4} color={T.green} spark={[1200,1250,1300,1340,1380,1420,1450,1482]} />
        <StatCard val="127" label="Open Cases" color={T.amber} spark={[90,110,120,115,130,118,124,127]} />
        <StatCard val="18" label="Officers Active Today" color={T.blue} spark={[12,14,16,15,18,17,16,18]} />
        <StatCard val="847" label="Advance Violations (MTD)" change={-3} color={T.red} spark={[700,750,820,860,840,810,830,847]} />
      </div>

      {/* Compliance Map + Advance Dist */}
      <div className="rg-flex rg-gap-2 rg-mb-2" style={{ alignItems:'stretch' }}>
        {/* Map */}
        <div className="rg-card" style={{ flex:2, padding:20 }}>
          <div className="rg-flex rg-mb-2" style={{ justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, color:T.t1 }}>Compliance Map</div>
            <div className="rg-tabs" style={{ borderBottom:'none' }}>
              {['table','map'].map(t => (
                <button key={t} className={`rg-tab${regionTab===t?' active':''}`} onClick={() => setRegionTab(t)} style={{ padding:'4px 12px', fontSize:11 }}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
              ))}
            </div>
          </div>
          {regionTab === 'table' ? (
            <table className="rg-table">
              <thead><tr><th>Region</th><th>Registration</th><th>Rent Cards</th><th>Violations</th><th>Risk</th></tr></thead>
              <tbody>
                {REGIONS.map((r, i) => (
                  <tr key={i}>
                    <td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:600, color:T.t1 }}>{r.name}</span></td>
                    <td>
                      <div className="rg-flex" style={{ alignItems:'center', gap:8 }}>
                        <div style={{ flex:1, height:4, background:T.border, borderRadius:2, overflow:'hidden', minWidth:60 }}>
                          <div style={{ height:'100%', width:`${r.reg}%`, background: r.reg>75?T.green:r.reg>55?T.amber:T.red, borderRadius:2 }} />
                        </div>
                        <span style={{ fontFamily:F.mono, fontSize:11, color:T.t2, minWidth:32 }}>{r.reg}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="rg-flex" style={{ alignItems:'center', gap:8 }}>
                        <div style={{ flex:1, height:4, background:T.border, borderRadius:2, overflow:'hidden', minWidth:60 }}>
                          <div style={{ height:'100%', width:`${r.cards}%`, background: r.cards>65?T.green:r.cards>45?T.amber:T.red, borderRadius:2 }} />
                        </div>
                        <span style={{ fontFamily:F.mono, fontSize:11, color:T.t2, minWidth:32 }}>{r.cards}%</span>
                      </div>
                    </td>
                    <td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color: r.violations>200?T.red:r.violations>80?T.amber:T.green }}>{r.violations}</span></td>
                    <td><span className={`rg-badge ${riskBadge(r.score)}`}>{r.risk}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:6 }}>
              {REGIONS.map((r, i) => (
                <div key={i} style={{ borderRadius:6, padding:'10px 8px', background: r.risk==='high'?T.redFade:r.risk==='medium'?T.amberFade:T.greenFade, border:`1px solid ${r.risk==='high'?'rgba(229,72,58,0.2)':r.risk==='medium'?'rgba(232,144,10,0.2)':'rgba(15,168,106,0.2)'}`, textAlign:'center', cursor:'pointer' }}>
                  <div style={{ fontFamily:F.mono, fontSize:18, fontWeight:500, color: r.risk==='high'?T.red:r.risk==='medium'?T.amber:T.green }}>{r.cards}%</div>
                  <div style={{ fontSize:9, fontWeight:600, color:T.t2, marginTop:3, lineHeight:1.3 }}>{r.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Advance distribution */}
        <div className="rg-card" style={{ flex:1, padding:20 }}>
          <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, color:T.t1, marginBottom:16 }}>Advance Rent Distribution</div>
          {[
            { l:'≤1 month (legal)', pct:8,  color:T.green },
            { l:'2–6 months (legal)', pct:31, color:T.limeD },
            { l:'7–12 months (illegal)', pct:38, color:T.amber },
            { l:'13–24 months (illegal)', pct:23, color:T.red },
          ].map((row,i) => (
            <div key={i} style={{ marginBottom:12 }}>
              <div className="rg-flex" style={{ justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:12, color:T.t2 }}>{row.l}</span>
                <span style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:row.color }}>{row.pct}%</span>
              </div>
              <ProgressBar value={row.pct * 2.5} color={row.color} />
            </div>
          ))}
          <div style={{ marginTop:14, padding:'10px 12px', background:T.redFade, borderRadius:6, border:`1px solid rgba(229,72,58,0.15)` }}>
            <div style={{ fontSize:11, fontWeight:600, color:T.red }}>61% of tracked tenancies</div>
            <div style={{ fontSize:11, color:T.t2, marginTop:2, lineHeight:1.5 }}>show advance payments exceeding the 6-month legal cap under Act 220 s.16(5)</div>
          </div>
        </div>
      </div>

      {/* Compliance trend + law vs reality */}
      <ComplianceTrend onSelectCase={onSelectCase} />
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// CASE MANAGER VIEW
// ═════════════════════════════════════════════════════════════════════════════
const CaseManager = ({ onSelectCase }) => {
  const toast = useToast();
  const [tab, setTab] = useState('queue');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = CASES.filter(c => filter === 'all' || c.status === filter || (filter === 'unassigned' && !c.assigned));

  return (
    <div className="fade-in">
      <div className="rg-flex" style={{ justifyContent:'space-between', alignItems:'flex-end', marginBottom:20 }}>
        <div>
          <div className="rg-page-title">Case Management</div>
          <div className="rg-page-sub">Triage · Assign · Resolve · Track</div>
        </div>
        <div className="rg-flex rg-gap-1">
          <span className="rg-badge rg-badge-red">{CASES.filter(c=>c.status==='received').length} NEW</span>
          <span className="rg-badge rg-badge-amber">{CASES.filter(c=>c.status==='under_investigation').length} INVESTIGATING</span>
          <span className="rg-badge rg-badge-blue">{CASES.filter(c=>c.status==='notice_issued').length} NOTICE ISSUED</span>
        </div>
      </div>

      <div className="rg-tabs rg-mb-2">
        {[['queue','Case Queue'],['properties','Properties'],['risk','Risk Register']].map(([id,lbl]) => (
          <button key={id} className={`rg-tab${tab===id?' active':''}`} onClick={() => setTab(id)}>{lbl}</button>
        ))}
      </div>

      {tab === 'queue' && (
        <>
          {/* Filters */}
          <div className="rg-flex rg-gap-1 rg-mb-2">
            {['all','received','under_investigation','notice_issued','resolved','unassigned'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`rg-btn ${filter===f?'rg-btn-primary':'rg-btn-ghost'}`} style={{ fontSize:11, padding:'5px 12px' }}>
                {f === 'all' ? 'All' : f === 'unassigned' ? 'Unassigned' : statusLabel(f).replace(/^\w/,c=>c.toUpperCase())}
              </button>
            ))}
          </div>
          <div className="rg-card" style={{ padding:0 }}>
            <table className="rg-table rg-table-clickable">
              <thead><tr><th>Case ID</th><th>Type</th><th>Property · Landlord</th><th>District</th><th>Sev.</th><th>Status</th><th>Opened</th><th>Officer</th><th></th></tr></thead>
              <tbody>
                {filtered.map((c,i) => (
                  <tr key={i} onClick={() => onSelectCase ? onSelectCase(c) : setSelected(c)}>
                    <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{c.id.split('-').slice(-1)[0]}</span></td>
                    <td><span style={{ fontSize:12 }}>{caseTypeLabel(c.type)}</span></td>
                    <td>
                      <div style={{ fontSize:12, color:T.t1 }}>{c.property}</div>
                      <div style={{ fontSize:11, color:T.t3 }}>{c.landlord}</div>
                    </td>
                    <td><span style={{ fontSize:11, color:T.t2 }}>{c.district}</span></td>
                    <td><span className={`rg-badge ${c.sev==='critical'||c.sev==='high'?'rg-badge-red':c.sev==='medium'?'rg-badge-amber':'rg-badge-muted'}`}>{c.sev}</span></td>
                    <td><span className={`rg-badge ${statusBadge(c.status)}`}>{statusLabel(c.status)}</span></td>
                    <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{c.opened}</span></td>
                    <td><span style={{ fontSize:12, color:c.assigned?T.t2:T.red }}>{c.assigned || 'Unassigned'}</span></td>
                    <td><span style={{ color:T.t3, fontSize:12 }}>›</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'properties' && (
        <div className="rg-card" style={{ padding:0 }}>
          <table className="rg-table rg-table-clickable">
            <thead><tr><th>Property</th><th>MMDA</th><th>Units</th><th>Cards Issued</th><th>Avg Advance</th><th>Risk</th><th>Violations</th><th>Last Insp.</th></tr></thead>
            <tbody>
              {PROPERTIES.map((p,i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontSize:12, fontWeight:600, color:T.t1 }}>{p.address}</div>
                    <div style={{ fontSize:11, color:T.t3 }}>{p.landlord}</div>
                  </td>
                  <td><span style={{ fontSize:12, color:T.t2 }}>{p.mmda}</span></td>
                  <td><span style={{ fontFamily:F.mono, fontSize:12 }}>{p.units}</span></td>
                  <td>
                    <div className="rg-flex" style={{ alignItems:'center', gap:6 }}>
                      <div style={{ width:40, height:4, background:T.border, borderRadius:2, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${(p.cards/p.tenancies)*100}%`, background: p.cards===p.tenancies?T.green:T.amber, borderRadius:2 }} />
                      </div>
                      <span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{p.cards}/{p.tenancies}</span>
                    </div>
                  </td>
                  <td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color: p.advance>6?T.red:T.green }}>{p.advance} mo</span></td>
                  <td>
                    <div className="risk-bar">
                      <div className="risk-bar-track"><div className="risk-bar-fill" style={{ width:`${p.risk}%`, background:riskColor(p.risk) }} /></div>
                      <span style={{ fontFamily:F.mono, fontSize:11, color:riskColor(p.risk), minWidth:24 }}>{p.risk}</span>
                    </div>
                  </td>
                  <td><span style={{ fontFamily:F.mono, fontSize:12, color: p.violations>0?T.red:T.green }}>{p.violations}</span></td>
                  <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{p.lastInsp}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'risk' && (
        <div className="rg-card" style={{ padding:0 }}>
          <div style={{ padding:'14px 20px', borderBottom:`1px solid ${T.border}` }}>
            <span style={{ fontSize:12, color:T.t2 }}>Landlords ranked by risk score · Multi-property owners flagged for GRA cross-reference</span>
          </div>
          <table className="rg-table">
            <thead><tr><th>Landlord</th><th>ID</th><th>Properties</th><th>Open Cases</th><th>Violations</th><th>Risk Score</th><th>GRA Flag</th><th>Action</th></tr></thead>
            <tbody>
              {[...PROPERTIES].sort((a,b) => b.risk - a.risk).map((p,i) => (
                <tr key={i}>
                  <td style={{ fontFamily:F.mono, fontSize:12, fontWeight:600 }}>{p.landlord}</td>
                  <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{p.lid}</span></td>
                  <td><span style={{ fontFamily:F.mono, fontSize:12 }}>{p.units}</span></td>
                  <td><span style={{ fontFamily:F.mono, fontSize:12, color:p.complaints>0?T.red:T.green }}>{p.complaints}</span></td>
                  <td><span style={{ fontFamily:F.mono, fontSize:12, color:p.violations>0?T.amber:T.green }}>{p.violations}</span></td>
                  <td>
                    <div className="risk-bar" style={{ minWidth:120 }}>
                      <div className="risk-bar-track" style={{ flex:1 }}><div className="risk-bar-fill" style={{ width:`${p.risk}%`, background:riskColor(p.risk) }} /></div>
                      <span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color:riskColor(p.risk), minWidth:28 }}>{p.risk}</span>
                    </div>
                  </td>
                  <td>{p.units >= 3 ? <span className="rg-badge rg-badge-amber">Flagged</span> : <span style={{ color:T.t3, fontSize:12 }}>—</span>}</td>
                  <td>
                    <button className={`rg-btn ${p.risk >= 70 ? 'rg-btn-danger' : 'rg-btn-ghost'}`} style={{ padding:'4px 10px', fontSize:11 }} onClick={()=>toast&&toast(p.risk>=70?`Inspection assigned for ${p.address}`:`Inspection scheduled for ${p.address}`,'info')}>
                      {p.risk >= 70 ? 'Inspect Now' : 'Schedule'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Case detail modal */}
      {selected && (
        <div className="rg-modal-overlay" onClick={() => setSelected(null)}>
          <div className="rg-modal slide-up" onClick={e => e.stopPropagation()}>
            <div className="rg-modal-header">
              <div>
                <div style={{ fontFamily:F.mono, fontSize:12, color:T.green, marginBottom:4 }}>{selected.id}</div>
                <div style={{ fontFamily:F.head, fontSize:16, fontWeight:700 }}>{caseTypeLabel(selected.type)}</div>
              </div>
              <div className="rg-flex rg-gap-1">
                <span className={`rg-badge ${selected.sev==='critical'||selected.sev==='high'?'rg-badge-red':selected.sev==='medium'?'rg-badge-amber':'rg-badge-muted'}`}>{selected.sev}</span>
                <button onClick={() => setSelected(null)} style={{ background:'transparent', border:'none', color:T.t3, fontSize:18, lineHeight:1, padding:'0 4px' }}>×</button>
              </div>
            </div>
            <div className="rg-modal-body">
              {[
                ['Property', selected.property], ['Landlord', selected.landlord],
                ['District', selected.district], ['Source', selected.src.replace(/_/g,' ')],
                ['Opened', selected.opened], ['Status', statusLabel(selected.status)],
                ['Assigned Officer', selected.assigned || 'Unassigned'],
              ].map(([l,v],i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid rgba(36,54,40,0.4)` }}>
                  <span style={{ fontSize:12, color:T.t3 }}>{l}</span>
                  <span style={{ fontFamily:F.mono, fontSize:12, fontWeight:600, color:T.t1 }}>{v}</span>
                </div>
              ))}
              {selected.advance > 6 && (
                <div style={{ marginTop:14, padding:'12px 14px', background:T.redFade, border:`1px solid rgba(229,72,58,0.2)`, borderRadius:6 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.red, marginBottom:4 }}>Advance Rent Violation</div>
                  <div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>
                    {selected.advance} months collected. Legal cap: 6 months. Excess: {((selected.advance - 6) * 1800).toLocaleString()} GHS est. — Act 220 s.16(5) breach.
                  </div>
                </div>
              )}
              <div className="rg-flex rg-gap-1" style={{ marginTop:18 }}>
                <button className="rg-btn rg-btn-primary" style={{ flex:1 }} onClick={()=>toast&&toast("Assignment dialog — use Assign Officers page","info")}>Assign Officer</button>
                <button className="rg-btn rg-btn-ghost" style={{ flex:1 }} onClick={()=>toast&&toast("Status advanced — notification sent","success")}>Advance Status</button>
                <button className="rg-btn rg-btn-danger" onClick={()=>toast&&toast("Case referred to Rent and Housing Committee","warning")}>Refer Court</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// TASKFORCE OFFICER — MOBILE PHONE FRAME
// ═════════════════════════════════════════════════════════════════════════════
const OfficerMobile = () => {
  const toast = useToast();
  const [screen, setScreen] = useState('home');
  const [scanInput, setScanInput] = useState('');
  const [selected, setSelected] = useState(null);
  const [selectedCaseDetail, setSelectedCaseDetail] = useState(null);
  const [checks, setChecks] = useState({});
  const [violType, setViolType] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [filingFor, setFilingFor] = useState(null);

  const failedReq = CHECKLIST.filter(c => c.required && checks[c.id] === false);

  const doSubmit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  };

  const PhoneStatusBar = () => (
    <div style={{ height:28, background:T.bg, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px', flexShrink:0 }}>
      <span style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>09:42</span>
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <div style={{ width:7, height:7, borderRadius:'50%', background:T.green }} className="pulse" />
        <span style={{ fontFamily:F.mono, fontSize:9, color:T.green }}>SYNC</span>
        <span style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>4G</span>
      </div>
    </div>
  );

  const PhoneHeader = ({ title, back }) => (
    <div style={{ padding:'10px 16px 12px', background:T.surface, borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
      {back && <button onClick={back} style={{ background:'transparent', border:'none', color:T.t3, fontSize:12, marginBottom:6, padding:0, display:'block' }}>← Back</button>}
      <div style={{ fontFamily:F.head, fontSize:15, fontWeight:700, color:T.t1 }}>{title}</div>
      <div style={{ fontSize:11, color:T.green, marginTop:2 }}>Ofc. Kofi Mensah · Ayawaso East</div>
    </div>
  );

  // HOME
  const HomeScreen = () => (
    <>
      <PhoneStatusBar />
      <PhoneHeader title="Today's Shift" />
      <div style={{ flex:1, overflowY:'auto' }}>
        <ShiftSummary />
      </div>
    </>
  );

  // SCAN
  const ScanScreen = () => (
    <>
      <PhoneStatusBar />
      <PhoneHeader title="Inspect Property" back={() => setScreen('home')} />
      <div style={{ flex:1, overflowY:'auto', padding:14 }}>
        <div style={{ fontSize:12, fontWeight:600, color:T.t1, marginBottom:8 }}>Enter Property ID or Landlord ID</div>
        <div style={{ display:'flex', gap:8, marginBottom:16 }}>
          <input value={scanInput} onChange={e => setScanInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter'){const m=PROPERTIES.find(p=>p.id.toLowerCase()===scanInput.toLowerCase()||p.lid.toLowerCase()===scanInput.toLowerCase());setSelected(m||null);setScreen('property');}}} placeholder="e.g. P-001 or L-2291" className="rg-input" style={{ flex:1, fontSize:12 }} />
          <button className="rg-btn rg-btn-primary" style={{ fontSize:12, flexShrink:0 }} onClick={() => { const m=PROPERTIES.find(p=>p.id.toLowerCase()===scanInput.toLowerCase()||p.lid.toLowerCase()===scanInput.toLowerCase()); setSelected(m||null); setScreen('property'); }}>Go</button>
        </div>
        <div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Quick Select</div>
        {PROPERTIES.map((p,i) => (
          <div key={i} onClick={() => { setSelected(p); setScreen('property'); }} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:`1px solid ${T.border}`, cursor:'pointer' }}>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:T.t1 }}>{p.address}</div>
              <div style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{p.id}</div>
            </div>
            <span className={`rg-badge ${riskBadge(p.risk)}`}>{riskLabel(p.risk)}</span>
          </div>
        ))}
      </div>
    </>
  );

  // PROPERTY DETAIL
  const PropertyScreen = () => {
    if (!selected) return (
      <>
        <PhoneStatusBar />
        <PhoneHeader title="Not Found" back={() => setScreen('scan')} />
        <div style={{ padding:16 }}>
          <div style={{ color:T.red, fontSize:13, fontWeight:700, marginBottom:8 }}>Property not in registry</div>
          <div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>This ID is not found. May indicate an unregistered tenancy — flag for follow-up.</div>
        </div>
      </>
    );
    return (
      <>
        <PhoneStatusBar />
        <PhoneHeader title="Property Detail" back={() => { setScreen('home'); setSelected(null); setChecks({}); }} />
        <div style={{ flex:1, overflowY:'auto', padding:12 }}>
          {/* Risk banner */}
          <div style={{ background:riskColor(selected.risk), borderRadius:6, padding:'8px 12px', marginBottom:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:11, fontWeight:800, color:'#fff', textTransform:'uppercase' }}>{riskLabel(selected.risk)} Risk Property</span>
            <span style={{ fontFamily:F.mono, fontSize:16, fontWeight:700, color:'#fff' }}>{selected.risk}</span>
          </div>
          {/* Info */}
          <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:12, marginBottom:10 }}>
            <div style={{ fontSize:12, fontWeight:700, color:T.t1, marginBottom:8 }}>{selected.address}</div>
            {[['Property ID',selected.id],['MMDA',selected.mmda],['Landlord',selected.landlord],['Registered',selected.registered?'✓ Yes':'✗ NO'],['Rent Cards',`${selected.cards}/${selected.tenancies}`],['Avg Advance (months)',selected.advance+' mo'],['Complaints',selected.complaints]].map(([l,v],i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:`1px solid rgba(36,54,40,0.3)` }}>
                <span style={{ fontSize:10, color:T.t3 }}>{l}</span>
                <span style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color: v==='✗ NO'?T.red:v==='✓ Yes'?T.green: (l==='Avg Advance (months)'&&selected.advance>6)?T.red:T.t1 }}>{v}</span>
              </div>
            ))}
          </div>
          {/* Violations */}
          {selected.violations > 0 && (
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:10, fontWeight:700, color:T.red, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Detected Issues</div>
              {selected.advance > 6 && <div style={{ padding:'7px 10px', background:T.redFade, border:`1px solid rgba(229,72,58,0.2)`, borderLeft:`3px solid ${T.red}`, borderRadius:4, marginBottom:6, fontSize:11, color:T.t1, lineHeight:1.4 }}>Advance rent {selected.advance} months — exceeds 6-month cap (Act 220 s.16)</div>}
              {selected.cards < selected.tenancies && <div style={{ padding:'7px 10px', background:T.redFade, border:`1px solid rgba(229,72,58,0.2)`, borderLeft:`3px solid ${T.red}`, borderRadius:4, marginBottom:6, fontSize:11, color:T.t1, lineHeight:1.4 }}>{selected.tenancies-selected.cards} units have no rent card issued (PNDCL 138 s.5)</div>}
              {!selected.registered && <div style={{ padding:'7px 10px', background:T.redFade, border:`1px solid rgba(229,72,58,0.2)`, borderLeft:`3px solid ${T.red}`, borderRadius:4, marginBottom:6, fontSize:11, color:T.t1, lineHeight:1.4 }}>Property NOT registered with Rent Control (PNDCL 138 s.4)</div>}
            </div>
          )}
          {selected.violations === 0 && (
            <div style={{ padding:'12px', background:T.greenFade, border:`1px solid rgba(15,168,106,0.2)`, borderRadius:8, marginBottom:10, display:'flex', gap:8, alignItems:'center' }}>
              <span style={{ fontSize:18, color:T.green }}>✓</span>
              <div><div style={{ fontSize:12, fontWeight:700, color:T.green }}>Fully Compliant</div><div style={{ fontSize:11, color:T.t2 }}>Last inspection: {selected.lastInsp}</div></div>
            </div>
          )}
          {/* Actions */}
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <button className="rg-btn rg-btn-primary" style={{ justifyContent:'center' }} onClick={() => { setFilingFor(selected); setScreen('checklist'); }}>Run Inspection Checklist</button>
            {selected.violations > 0 && <button className="rg-btn rg-btn-danger" style={{ justifyContent:'center' }} onClick={() => { setFilingFor(selected); setScreen('violation'); }}>File Violation Case</button>}
            <button className="rg-btn rg-btn-ghost" style={{ justifyContent:'center' }} onClick={()=>toast&&toast("Inspection logged — no violations recorded","success")}>Mark Inspected — No Action</button>
          </div>
        </div>
      </>
    );
  };

  // CHECKLIST
  const ChecklistScreen = () => (
    <>
      <PhoneStatusBar />
      <PhoneHeader title="Inspection Checklist" back={() => setScreen('property')} />
      <div style={{ flex:1, overflowY:'auto', padding:'12px 14px' }}>
        <div style={{ fontSize:11, color:T.t2, marginBottom:12, lineHeight:1.5 }}>Toggle each item. Uncompliant required items will auto-generate a case.</div>
        {CHECKLIST.map(item => {
          const val = checks[item.id];
          const isOff = val === false;
          return (
            <div key={item.id} className="rg-checklist-row">
              <button onClick={() => setChecks(p => ({ ...p, [item.id]: val === true ? false : val === false ? undefined : true }))}
                className={`rg-toggle ${val===true?'rg-toggle-on':val===false?'rg-toggle-off':'rg-toggle-neutral'}`}>
                <div className="rg-toggle-thumb" style={{ left: val===true?'18px':val===false?'2px':'10px' }} />
              </button>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:600, color:isOff?T.red:val===true?T.green:T.t1, lineHeight:1.3 }}>{item.label}</div>
                <div style={{ fontSize:10, color:T.t3, marginTop:2 }}>{item.law}{item.required?' · Required':''}</div>
              </div>
            </div>
          );
        })}
        {failedReq.length > 0 && (
          <div style={{ marginTop:12, padding:'10px 12px', background:T.redFade, border:`1px solid rgba(229,72,58,0.2)`, borderRadius:6 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.red, marginBottom:4 }}>{failedReq.length} violation{failedReq.length!==1?'s':''} flagged</div>
            <div style={{ fontSize:10, color:T.t2 }}>Cases will be auto-generated and synced to Rent Control.</div>
          </div>
        )}
        <button className="rg-btn rg-btn-primary" style={{ width:'100%', justifyContent:'center', marginTop:14 }} onClick={doSubmit}>
          {submitting ? 'Saving…' : 'Submit Inspection'}
        </button>
        {submitted && <div style={{ marginTop:10, fontSize:12, color:T.green, textAlign:'center', fontWeight:600 }}>✓ Saved and queued for sync</div>}
      </div>
    </>
  );

  // VIOLATION FILING
  const ViolationScreen = () => (
    <>
      <PhoneStatusBar />
      <PhoneHeader title="File Violation" back={() => setScreen('property')} />
      <div style={{ flex:1, overflowY:'auto', padding:14 }}>
        {submitted ? (
          <div style={{ textAlign:'center', padding:'24px 0' }} className="fade-in">
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, fontWeight:700, color:'#0FA86A', letterSpacing:2, marginBottom:12 }}>SUBMITTED</div>
            <div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, color:T.green, marginBottom:6 }}>Case Filed</div>
            <div style={{ fontFamily:F.mono, fontSize:12, color:T.lime, marginBottom:14 }}>Case ID: RC-2026-ACC-00293</div>
            <div style={{ fontSize:12, color:T.t2, lineHeight:1.65, marginBottom:18 }}>Routed to Rent Control Case Manager. GRA flag applied. Expected response: 48hrs.</div>
            <button className="rg-btn rg-btn-primary" style={{ justifyContent:'center' }} onClick={() => { setSubmitted(false); setViolType(''); setNotes(''); setScreen('home'); }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Violation Type</div>
            {['Excessive Advance Rent (Act 220 s.16)','No Rent Card Issued (PNDCL 138 s.5)','Unregistered Tenancy (PNDCL 138 s.4)','No Tenancy Agreement','Unlawful Eviction'].map((v,i) => (
              <div key={i} onClick={() => setViolType(v)} style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 12px', marginBottom:6, borderRadius:6, cursor:'pointer', background: violType===v?T.redFade:T.card, border:`1px solid ${violType===v?'rgba(229,72,58,0.3)':T.border}` }}>
                <div style={{ width:13, height:13, borderRadius:'50%', border:`2px solid ${violType===v?T.red:T.border}`, background:violType===v?T.red:'transparent', flexShrink:0 }} />
                <span style={{ fontSize:12, color: violType===v?T.t1:T.t2 }}>{v}</span>
              </div>
            ))}
            <div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:6, marginTop:12 }}>Evidence Notes</div>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} className="rg-textarea" rows={3} placeholder="Describe observations…" />
            <div style={{ display:'flex', gap:8, marginTop:10, marginBottom:14 }}>
              <div style={{ flex:1, padding:'9px 10px', background:T.greenFade, border:`1px solid rgba(15,168,106,0.2)`, borderRadius:6, display:'flex', gap:7, alignItems:'center' }}>
                <span style={{ color:T.green, fontSize:13 }}>◎</span>
                <span style={{ fontFamily:F.mono, fontSize:10, color:T.green }}>GPS: 5.558, -0.187</span>
              </div>
              <button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={()=>toast&&toast("Camera opened — photo captured and attached","success")}>+ Photo</button>
            </div>
            <button disabled={!violType} className={`rg-btn ${violType?'rg-btn-danger':'rg-btn-ghost'}`} style={{ width:'100%', justifyContent:'center' }} onClick={doSubmit}>
              {submitting ? 'Submitting…' : 'Submit to Rent Control →'}
            </button>
          </>
        )}
      </div>
    </>
  );

  // CASES
  const CasesScreen = () => selectedCaseDetail ? (
    <MobileCaseDetail caseData={selectedCaseDetail} onBack={() => setSelectedCaseDetail(null)} />
  ) : (
    <>
      <PhoneStatusBar />
      <PhoneHeader title="My Cases" />
      <div style={{ flex:1, overflowY:'auto', padding:'12px 14px' }}>
        <div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>
          {CASES.length} cases · {CASES.filter(c=>c.status==='under_investigation').length} under investigation
        </div>
        {CASES.slice(0,6).map((c,i) => (
          <div key={i} onClick={() => setSelectedCaseDetail(c)}
            style={{ padding:'12px 0', borderBottom:`1px solid ${T.border}`, cursor:'pointer' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
              <div style={{ fontSize:12, fontWeight:700, color:T.t1, flex:1, paddingRight:8 }}>{caseTypeLabel(c.type)}</div>
              <span className={`rg-badge ${statusBadge(c.status)}`}>{statusLabel(c.status)}</span>
            </div>
            <div style={{ fontSize:11, color:T.t2, marginBottom:2 }}>{c.property}</div>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{c.id.replace('RC-2026-ACC-','RC-')}</span>
              <span style={{ fontFamily:F.mono, fontSize:10, color: c.sev==='critical'||c.sev==='high'?T.red:c.sev==='medium'?T.amber:T.t3 }}>{c.sev}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const screens = { home:<HomeScreen/>, scan:<ScanScreen/>, map:<OfficerMap/>, property:<PropertyScreen/>, checklist:<ChecklistScreen/>, violation:<ViolationScreen/>, cases:<CasesScreen/> };

  return (
    <div className="fade-in" style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', background:'#0a110b', position:'relative' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 60%, rgba(15,168,106,0.06) 0%, transparent 70%)' }} />
      <div style={{ position:'absolute', bottom:16, right:24 }}>
        <div style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>Android · GPS · Offline-capable</div>
      </div>
      <div className="rg-phone-frame">
        <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column' }}>
          {screens[screen]}
        </div>
        <div className="rg-phone-nav">
          {[['home','◼','Today'],['scan','⬡','Inspect'],['map','◈','Map'],['cases','▤','Cases']].map(([id,ic,lbl]) => (
            <button key={id} className="rg-phone-nav-btn" onClick={() => { setScreen(id); setSelected(null); setSubmitted(false); }}>
              <span style={{ fontSize:16, color: screen===id||((screen==='property'||screen==='checklist'||screen==='violation')&&id==='scan')?T.green:T.t3 }}>{ic}</span>
              <span style={{ fontFamily:F.mono, fontSize:9, color: screen===id?T.green:T.t3, letterSpacing:1 }}>{lbl}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// LANDLORD COMPLIANCE PORTAL
// ═════════════════════════════════════════════════════════════════════════════
const LandlordPortal = () => {
  const toast = useToast();
  const d = LANDLORD_DATA;
  const [tab, setTab] = useState('overview');
  const [showIssuance, setShowIssuance] = useState(false);

  return (
    <div className="fade-in">
      <div className="rg-flex" style={{ justifyContent:'space-between', alignItems:'flex-end', marginBottom:20 }}>
        <div>
          <div className="rg-page-title">Landlord Compliance Portal</div>
          <div className="rg-page-sub">{d.name} · {d.id} · TIN: {d.tin}</div>
        </div>
        <div className="rg-flex rg-gap-1">
          {d.score >= 80 ? <span className="rg-badge rg-badge-green">Good Standing</span> :
           d.score >= 60 ? <span className="rg-badge rg-badge-amber">Partial Compliance</span> :
           <span className="rg-badge rg-badge-red">Non-Compliant · Risk of Sanctions</span>}
        </div>
      </div>

      {/* Score card */}
      <div className="rg-card" style={{ padding:24, marginBottom:16, borderColor: d.score>=80?T.green:d.score>=60?T.amber:T.red, borderWidth:2 }}>
        <div className="rg-flex rg-gap-3" style={{ alignItems:'center' }}>
          {/* Score ring */}
          <div style={{ position:'relative', width:100, height:100, flexShrink:0 }}>
            <svg width="100" height="100" style={{ transform:'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="42" fill="none" stroke={T.border} strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke={d.score>=80?T.green:d.score>=60?T.amber:T.red} strokeWidth="8"
                strokeDasharray={`${2*Math.PI*42}`} strokeDashoffset={`${2*Math.PI*42*(1-d.score/100)}`} strokeLinecap="round" style={{ transition:'stroke-dashoffset 1s ease' }} />
            </svg>
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:F.mono, fontSize:24, fontWeight:700, color:d.score>=80?T.green:d.score>=60?T.amber:T.red, lineHeight:1 }}>{d.score}</span>
              <span style={{ fontSize:10, color:T.t3 }}>/100</span>
            </div>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, marginBottom:10 }}>Compliance Score</div>
            <ProgressBar value={d.score} color={d.score>=80?T.green:d.score>=60?T.amber:T.red} height={6} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginTop:14 }}>
              {[['Properties',`${d.registered}/${d.properties}`,'Registered'],['Rent Cards',`${d.cards}/${d.tenancies}`,'Issued'],['Agreements',`${d.agreements}/${d.tenancies}`,'With Written Agreement']].map(([l,v,sub],i) => (
                <div key={i} style={{ background:T.bg, borderRadius:6, padding:'10px 12px' }}>
                  <div style={{ fontFamily:F.mono, fontSize:16, fontWeight:600, color:T.t1 }}>{v}</div>
                  <div style={{ fontSize:10, color:T.t3, marginTop:2 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rg-tabs rg-mb-2">
        {[['overview','Overview'],['properties','My Properties'],['cards','Rent Cards'],['cases','Open Cases']].map(([id,lbl]) => (
          <button key={id} className={`rg-tab${tab===id?' active':''}`} onClick={() => setTab(id)}>{lbl}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          <div className="rg-card" style={{ padding:20, marginBottom:14 }}>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Compliance Checklist</div>
            {[
              { l:'Properties Registered with Rent Control', done:d.registered, total:d.properties, law:'PNDCL 138 s.4' },
              { l:'Tenancies with Written Agreements',        done:d.agreements, total:d.tenancies,  law:'PNDCL 138 s.4' },
              { l:'Rent Cards Issued to Tenants',            done:d.cards,      total:d.tenancies,  law:'Act 220 s.20' },
              { l:'Advance Payments Within Legal Limit',     done:d.compliant,  total:d.tenancies,  law:'Act 220 s.16(5)' },
            ].map((item, i) => {
              const allDone = item.done === item.total && item.total > 0;
              const pct = item.total ? (item.done/item.total)*100 : 0;
              return (
                <div key={i} style={{ marginBottom:14 }}>
                  <div className="rg-flex" style={{ justifyContent:'space-between', alignItems:'center', marginBottom:5 }}>
                    <div className="rg-flex rg-gap-1" style={{ alignItems:'center' }}>
                      <span style={{ color:allDone?T.green:item.done>0?T.amber:T.red, fontSize:14 }}>{allDone?'✓':item.done>0?'◐':'✗'}</span>
                      <div>
                        <div style={{ fontSize:12, fontWeight:600, color:T.t1 }}>{item.l}</div>
                        <div style={{ fontSize:10, color:T.t3 }}>{item.law}</div>
                      </div>
                    </div>
                    <div className="rg-flex rg-gap-1" style={{ alignItems:'center' }}>
                      <span style={{ fontFamily:F.mono, fontSize:12, color:T.t2 }}>{item.done}/{item.total}</span>
                      {!allDone && <button className="rg-btn rg-btn-ghost" style={{ padding:'3px 10px', fontSize:11 }} onClick={()=>toast&&toast("Navigate to the relevant section to complete this item","info")}>Fix →</button>}
                    </div>
                  </div>
                  <ProgressBar value={pct} color={allDone?T.green:item.done>0?T.amber:T.red} />
                </div>
              );
            })}
          </div>

          {/* Advance rent calculator */}
          <AdvanceCalc />

          {/* Action plan */}
          <LandlordActionPlan score={d.score} />

          {d.score >= 80 && (
            <div style={{ padding:18, background:T.greenFade, border:`1px solid rgba(15,168,106,0.2)`, borderRadius:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontWeight:700, color:T.green, marginBottom:4 }}>Compliance Certificate Available</div>
                <div style={{ fontSize:12, color:T.t2 }}>Download your QR-coded certificate for inspections and financing applications</div>
              </div>
              <button className="rg-btn rg-btn-primary" style={{ flexShrink:0 }} onClick={()=>toast&&toast("Compliance certificate downloaded","success")} onClick={()=>toast&&toast("PDF downloaded","success")}>↓ Download PDF</button>
            </div>
          )}
        </>
      )}

      {tab === 'properties' && (
        <div className="rg-card" style={{ padding:0 }}>
          <table className="rg-table">
            <thead><tr><th>Address</th><th>Units</th><th>Rent Cards</th><th>Avg Advance</th><th>Registered</th><th>Score</th></tr></thead>
            <tbody>
              {d.props.map((p,i) => (
                <tr key={i}>
                  <td style={{ fontSize:12, fontWeight:600, color:T.t1 }}>{p.address}</td>
                  <td style={{ fontFamily:F.mono, fontSize:12 }}>{p.units}</td>
                  <td style={{ fontFamily:F.mono, fontSize:12, color:p.cards===p.units?T.green:T.amber }}>{p.cards}/{p.units}</td>
                  <td style={{ fontFamily:F.mono, fontSize:12, color:p.advance>6?T.red:T.green }}>{p.advance} mo</td>
                  <td>{p.registered ? <span className="rg-badge rg-badge-green">Yes</span> : <span className="rg-badge rg-badge-red">No</span>}</td>
                  <td>
                    <div className="risk-bar">
                      <div className="risk-bar-track"><div className="risk-bar-fill" style={{ width:`${p.score}%`, background:riskColor(100-p.score) }} /></div>
                      <span style={{ fontFamily:F.mono, fontSize:11, color:riskColor(100-p.score), minWidth:24 }}>{p.score}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'cards' && (
        <div>
          {showIssuance ? (
            <RentCardIssuanceForm onClose={() => setShowIssuance(false)} />
          ) : (
            <>
              {Object.entries(RENT_CARDS).map(([num, card]) => (
                <div key={num} className="rg-card" style={{ padding:18, marginBottom:10 }}>
                  <div className="rg-flex" style={{ justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                    <div>
                      <div style={{ fontFamily:F.mono, fontSize:13, fontWeight:700, color:T.green }}>{num}</div>
                      <div style={{ fontSize:12, color:T.t2, marginTop:2 }}>{card.address}</div>
                    </div>
                    <div className="rg-flex rg-gap-1">
                      <span className="rg-badge rg-badge-green">Active</span>
                      {!card.compliant && <span className="rg-badge rg-badge-red">Violation</span>}
                    </div>
                  </div>
                  {[['Monthly Rent',`GH₵ ${card.rent.toLocaleString()}`],['Issued',card.issued],['Advance',`${card.advMonths} months`]].map(([l,v],i) => (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderTop:i>0?`1px solid ${T.border}`:'none' }}>
                      <span style={{ fontSize:11, color:T.t3 }}>{l}</span>
                      <span style={{ fontFamily:F.mono, fontSize:11, color:T.t1 }}>{v}</span>
                    </div>
                  ))}
                  {card.warning && (
                    <div style={{ marginTop:10, padding:'8px 10px', background:T.redFade, border:`1px solid rgba(229,72,58,0.2)`, borderRadius:5, fontSize:11, color:T.red, lineHeight:1.5 }}>{card.warning}</div>
                  )}
                </div>
              ))}
              <button className="rg-btn rg-btn-primary" style={{ marginTop:6 }} onClick={() => setShowIssuance(true)}>
                + Issue New Rent Card
              </button>
            </>
          )}
        </div>
      )}

      {tab === 'cases' && (
        <div>
          {CASES.filter(c => c.landlord.includes('Boateng')).length === 0
            ? <div style={{ padding:20, color:T.t3, fontSize:13 }}>No open cases. ✓</div>
            : CASES.filter(c => c.landlord.includes('Boateng')).map((c,i) => (
              <div key={i} className="rg-card" style={{ padding:16, marginBottom:10, borderLeft:`3px solid ${riskColor(c.sev==='critical'?90:c.sev==='high'?70:c.sev==='medium'?50:20)}` }}>
                <div className="rg-flex" style={{ justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{c.id}</span>
                  <span className={`rg-badge ${statusBadge(c.status)}`}>{statusLabel(c.status)}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:3 }}>{caseTypeLabel(c.type)}</div>
                <div style={{ fontSize:12, color:T.t2 }}>{c.property}</div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

// Advance Rent Calculator (used in landlord + tenant)
const AdvanceCalc = () => {
  const [rent, setRent] = useState('');
  const [advance, setAdvance] = useState('');
  const [freq, setFreq] = useState('monthly');

  const calc = () => {
    const r = parseFloat(rent), a = parseFloat(advance);
    if (!r || !a) return null;
    const monthly = freq==='monthly'?r:freq==='annual'?r/12:freq==='quarterly'?r/3:r/6;
    const months = a / monthly;
    const cap = freq==='monthly'?1:6;
    const legal = months <= cap;
    const excess = legal ? 0 : (months-cap)*monthly;
    return { months: months.toFixed(1), cap, legal, excess: excess.toFixed(2) };
  };
  const res = calc();

  return (
    <div className="rg-card" style={{ padding:20, marginBottom:14 }}>
      <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:14 }}>Advance Rent Calculator</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
        <div className="rg-field">
          <label>Monthly Rent (GH₵)</label>
          <input type="number" className="rg-input" value={rent} onChange={e=>setRent(e.target.value)} placeholder="e.g. 1800" />
        </div>
        <div className="rg-field">
          <label>Total Advance Paid (GH₵)</label>
          <input type="number" className="rg-input" value={advance} onChange={e=>setAdvance(e.target.value)} placeholder="e.g. 21600" />
        </div>
      </div>
      <div className="rg-field">
        <label>Tenancy Type</label>
        <div style={{ display:'flex', gap:8 }}>
          {[['monthly','Monthly (cap: 1 mo)'],['longer','Longer (cap: 6 mo)']].map(([v,l]) => (
            <div key={v} onClick={() => setFreq(v)} style={{ flex:1, padding:'9px 12px', borderRadius:6, cursor:'pointer', border:`2px solid ${freq===v?T.green:T.border}`, background:freq===v?T.greenFade:T.card, textAlign:'center' }}>
              <div style={{ fontSize:12, fontWeight:700, color:freq===v?T.green:T.t2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      {res && (
        <div style={{ padding:'14px 16px', borderRadius:8, background:res.legal?T.greenFade:T.redFade, border:`2px solid ${res.legal?'rgba(15,168,106,0.25)':'rgba(229,72,58,0.25)'}`, marginTop:4 }} className="fade-in">
          <div style={{ fontFamily:F.mono, fontSize:26, fontWeight:700, color:res.legal?T.green:T.red, marginBottom:4 }}>{res.months} months</div>
          <div style={{ fontSize:13, fontWeight:700, color:res.legal?T.green:T.red, marginBottom:6 }}>
            {res.legal ? `✓ LEGAL — within the ${res.cap}-month cap` : `✗ ILLEGAL — exceeds ${res.cap}-month cap (Act 220 s.16)`}
          </div>
          {!res.legal && (
            <div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>
              Excess collected: <strong style={{ color:T.red }}>GH₵ {parseFloat(res.excess).toLocaleString()}</strong>. Tenant may file a complaint with Rent Control for refund of excess advance.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// TENANT PORTAL
// ═════════════════════════════════════════════════════════════════════════════
const TenantPortal = () => {
  const [tab, setTab] = useState('verify');
  const [cardInput, setCardInput] = useState('');
  const [searched, setSearched] = useState('');
  const [cType, setCType] = useState('');
  const [cDesc, setCDesc] = useState('');
  const [filing, setFiling] = useState(false);
  const [filed, setFiled] = useState(false);

  const card = searched ? RENT_CARDS[searched.toUpperCase()] : null;
  const notFound = searched && !card;

  const doFile = () => { setFiling(true); setTimeout(()=>{ setFiling(false); setFiled(true); }, 1400); };

  return (
    <div className="fade-in">
      <div className="rg-flex" style={{ justifyContent:'space-between', alignItems:'flex-end', marginBottom:20 }}>
        <div>
          <div className="rg-page-title">Tenant Protection Portal</div>
          <div className="rg-page-sub">Know your rights · Verify your rent card · File a complaint</div>
        </div>
      </div>

      <div className="rg-tabs rg-mb-2">
        {[['verify','Verify Rent Card'],['rights','Know Your Rights'],['complaint','File Complaint'],['calc','Advance Calculator']].map(([id,lbl]) => (
          <button key={id} className={`rg-tab${tab===id?' active':''}`} onClick={() => setTab(id)}>{lbl}</button>
        ))}
      </div>

      {tab === 'verify' && (
        <div style={{ maxWidth:620 }}>
          <div className="rg-card-sm rg-mb-2">
            <div style={{ fontFamily:F.head, fontSize:15, fontWeight:700, marginBottom:10 }}>Verify Your Rent Card</div>
            <div style={{ fontSize:13, color:T.t2, marginBottom:12, lineHeight:1.65 }}>Enter the rent card number on your card. Try: <code style={{ fontFamily:F.mono, fontSize:12, background:T.bg, padding:'2px 7px', borderRadius:3, color:T.lime }}>RG-2025-ACC-00123</code></div>
            <div style={{ display:'flex', gap:8 }}>
              <input value={cardInput} onChange={e=>setCardInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&setSearched(cardInput)} placeholder="e.g. RG-2025-ACC-00123" className="rg-input" style={{ flex:1 }} />
              <button className="rg-btn rg-btn-primary" onClick={() => setSearched(cardInput)}>Verify</button>
            </div>
            <div style={{ marginTop:10, fontSize:11, color:T.t3 }}>No smartphone? Dial <span style={{ fontFamily:F.mono, color:T.green }}>*714*1#</span> → Option 1 on any mobile phone</div>
          </div>

          {card && (
            <div className="fade-in" style={{ marginBottom:14 }}>
              <div style={{ padding:'12px 16px', background:T.greenFade, border:`1px solid rgba(15,168,106,0.25)`, borderRadius:8, display:'flex', gap:12, alignItems:'center', marginBottom:10 }}>
                <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, fontWeight:700, color:'#0FA86A', letterSpacing:1 }}>VERIFIED</span>
                <div>
                  <div style={{ fontWeight:700, color:T.green, fontSize:13 }}>VALID RENT CARD</div>
                  <div style={{ fontSize:12, color:T.t2 }}>Officially registered in Rent Control national database</div>
                </div>
              </div>
              {card.warning && (
                <div style={{ padding:'12px 16px', background:T.redFade, border:`1px solid rgba(229,72,58,0.25)`, borderLeft:`4px solid ${T.red}`, borderRadius:6, marginBottom:10 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.red, marginBottom:4 }}>Violation Detected</div>
                  <div style={{ fontSize:12, color:T.t2, lineHeight:1.6, marginBottom:10 }}>{card.warning}</div>
                  <button className="rg-btn rg-btn-danger" style={{ fontSize:11 }} onClick={() => setTab('complaint')}>File Complaint →</button>
                </div>
              )}
              <div className="rg-card-sm">
                {[['Card Number',searched.toUpperCase()],['Property',card.address],['Landlord',card.landlord],['Monthly Rent',`GH₵ ${card.rent.toLocaleString()}`],['Issued',card.issued],['Advance Status',card.compliant?'✓ Within legal limit':'✗ Exceeds legal limit']].map(([l,v],i) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:i<5?`1px solid ${T.border}`:'none' }}>
                    <span style={{ fontSize:12, color:T.t3 }}>{l}</span>
                    <span style={{ fontFamily:F.mono, fontSize:12, fontWeight:600, color:l==='Advance Status'?(card.compliant?T.green:T.red):T.t1 }}>{v}</span>
                  </div>
                ))}
              </div>
              <CardPaymentHistory cardNum={searched.toUpperCase()} />
            </div>
          )}

          {notFound && (
            <div style={{ padding:'16px 18px', background:T.redFade, border:`1px solid rgba(229,72,58,0.25)`, borderLeft:`4px solid ${T.red}`, borderRadius:6 }} className="fade-in">
              <div style={{ fontSize:13, fontWeight:700, color:T.red, marginBottom:6 }}>Rent Card Not Found</div>
              <div style={{ fontSize:13, color:T.t2, lineHeight:1.65, marginBottom:12 }}>This card number is not in the Rent Control registry. Your landlord may not have issued a valid card — this is a violation of PNDCL 138 s.5.</div>
              <button className="rg-btn rg-btn-danger" onClick={() => setTab('complaint')}>File Complaint →</button>
            </div>
          )}
        </div>
      )}

      {tab === 'rights' && (
        <div style={{ maxWidth:680 }}>
          <div style={{ marginBottom:14 }}>
            <div style={{ padding:'12px 16px', background:T.card, border:`1px solid ${T.border}`, borderRadius:8, marginBottom:10, borderLeft:`4px solid ${T.green}` }}>
              <div style={{ fontSize:11, fontWeight:700, color:T.green, letterSpacing:1.2, textTransform:'uppercase', marginBottom:6 }}>April 1, 2026 Mandate</div>
              <div style={{ fontSize:13, color:T.t1, lineHeight:1.7 }}>As of April 1, 2026, all landlords are legally required to issue Rent Cards and register tenancy agreements. These rights have always existed — they are now being actively enforced.</div>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              { icon:'01', title:'Written Tenancy Agreement', text:'Your landlord must provide a written agreement before or at the start of your tenancy.', law:'PNDCL 138 s.4' },
              { icon:'02', title:'Official Rent Card', text:'Every tenant must receive a Rent Card with verified tenancy details. Demand it.', law:'Act 220 s.20 · PNDCL 138 s.5' },
              { icon:'03', title:'6-Month Advance Limit', text:'Your landlord cannot demand more than 6 months advance. Monthly tenancies: 1 month max.', law:'Act 220 s.16(5)' },
              { icon:'04', title:'Habitable Premises', text:'Landlords must maintain the property in a fit and habitable condition.', law:'Act 220 s.17' },
              { icon:'05', title:'Protection from Eviction', text:'You cannot be evicted without valid grounds and due process through Rent Control.', law:'Act 220 s.18' },
              { icon:'06', title:'Registered Tenancy', text:'Your agreement must be registered with Rent Control within 14 days of signing.', law:'PNDCL 138 s.4' },
            ].map((r,i) => (
              <div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:'14px 16px' }}>
                <div style={{ fontFamily:F.mono, fontSize:10, fontWeight:700, color:T.green, letterSpacing:1.5, marginBottom:8 }}>RIGHT {r.icon}</div>
                <div style={{ fontSize:13, fontWeight:700, color:T.t1, marginBottom:5 }}>{r.title}</div>
                <div style={{ fontSize:12, color:T.t2, lineHeight:1.6, marginBottom:8 }}>{r.text}</div>
                <span style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{r.law}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'complaint' && (
        <div style={{ maxWidth:540 }}>
          {filed ? (
            <div style={{ textAlign:'center', padding:'32px 20px' }} className="fade-in">
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, fontWeight:700, color:'#0FA86A', letterSpacing:2, marginBottom:14 }}>FILED</div>
              <div style={{ fontFamily:F.head, fontSize:20, fontWeight:700, color:T.green, marginBottom:8 }}>Complaint Filed</div>
              <div style={{ fontFamily:F.mono, fontSize:14, color:T.lime, marginBottom:14 }}>Reference: RC-2026-ACC-00293</div>
              <div style={{ fontSize:13, color:T.t2, lineHeight:1.7, marginBottom:20, maxWidth:380, margin:'0 auto 20px' }}>
                Your complaint has been routed to the Rent Control Department. A case officer will contact you within 48 hours. You will receive SMS updates.
              </div>
              <div className="rg-card-sm" style={{ textAlign:'left', marginBottom:18 }}>
                <div style={{ fontFamily:F.head, fontSize:12, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>What Happens Next</div>
                {['Case assigned to Rent Control officer (48hrs)','Landlord receives official notice','Mediation scheduled or prosecution referred','You receive outcome notification by SMS'].map((s,i) => (
                  <div key={i} style={{ display:'flex', gap:10, marginBottom:7 }}>
                    <span style={{ fontFamily:F.mono, fontSize:11, color:T.green, flexShrink:0 }}>{i+1}.</span>
                    <span style={{ fontSize:12, color:T.t2, lineHeight:1.4 }}>{s}</span>
                  </div>
                ))}
              </div>
              <button className="rg-btn rg-btn-primary" onClick={() => { setFiled(false); setCType(''); setCDesc(''); }}>Done</button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom:16 }}>
                <div style={{ fontFamily:F.head, fontSize:15, fontWeight:700, marginBottom:4 }}>File a Complaint</div>
                <div style={{ fontSize:13, color:T.t2 }}>Reports go directly to the Rent Control Department case queue.</div>
              </div>
              <div className="rg-field">
                <label>Violation Type</label>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {['Excessive advance rent (Act 220 s.16)','No rent card issued','No tenancy agreement','Unlawful eviction / threat','Rent increase without approval','Other violation'].map((t,i) => (
                    <div key={i} onClick={() => setCType(t)} style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 14px', borderRadius:6, cursor:'pointer', background:cType===t?T.greenFade:T.card, border:`1.5px solid ${cType===t?T.green:T.border}` }}>
                      <div style={{ width:13, height:13, borderRadius:'50%', border:`2px solid ${cType===t?T.green:T.border}`, background:cType===t?T.green:'transparent', flexShrink:0 }} />
                      <span style={{ fontSize:12, color:cType===t?T.t1:T.t2 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rg-field">
                <label>Describe the Situation</label>
                <textarea value={cDesc} onChange={e=>setCDesc(e.target.value)} className="rg-textarea" rows={4} placeholder="What happened? When? How much was collected?" />
              </div>
              <button disabled={!cType} className={`rg-btn ${cType?'rg-btn-primary':'rg-btn-ghost'}`} style={{ width:'100%', justifyContent:'center' }} onClick={doFile}>
                {filing ? 'Submitting…' : 'Submit to Rent Control →'}
              </button>
              <div style={{ marginTop:12, padding:'12px 14px', background:T.card, borderRadius:6, border:`1px solid ${T.border}` }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.t3, marginBottom:4 }}>Alternative channels</div>
                <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                  <span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>*714*1# → Option 2</span>
                  <span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>WhatsApp: 0302-664-000</span>
                  <span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>Hotline: 0302-664-000</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'calc' && (
        <div style={{ maxWidth:540 }}>
          <AdvanceCalc />
        </div>
      )}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// STEP 1 — SYSTEM INFRASTRUCTURE
// Toast · GlobalSearch · Settings · FormValidation · Pagination · Print
// ═══════════════════════════════════════════════════════════════════════════

// ── TOAST SYSTEM ────────────────────────────────────────────────────────────
// Simple toast system - no context needed
let _toastFn = null;
const setGlobalToast = (fn) => { _toastFn = fn; };
const useToast = () => _toastFn || (() => {});

const ToastDisplay = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;
  const colors = {
    success: { border: 'rgba(15,168,106,0.4)',  dot: '#0FA86A' },
    error:   { border: 'rgba(229,72,58,0.4)',   dot: '#E5483A' },
    warning: { border: 'rgba(232,144,10,0.4)',  dot: '#E8900A' },
    info:    { border: 'rgba(59,130,246,0.4)',  dot: '#3B82F6' },
  };
  return (
    <div style={{ position:'fixed', bottom:24, right:24, zIndex:9999, display:'flex', flexDirection:'column', gap:8, maxWidth:360 }}>
      {toasts.map(t => {
        const c = colors[t.type] || colors.info;
        return (
          <div key={t.id} className="slide-up"
            style={{ background:'#1A2820', border:`1px solid ${c.border}`, borderLeft:`3px solid ${c.dot}`, borderRadius:8, padding:'12px 40px 12px 14px', position:'relative', boxShadow:'0 8px 32px rgba(0,0,0,0.4)' }}>
            <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:c.dot, flexShrink:0, marginTop:4 }} />
              <span style={{ fontSize:12, color:'#E8F0EB', lineHeight:1.5 }}>{t.msg}</span>
            </div>
            <button onClick={() => onDismiss(t.id)}
              style={{ position:'absolute', top:8, right:10, background:'transparent', border:'none', color:'#536358', fontSize:14, cursor:'pointer', lineHeight:1, padding:2 }}>×</button>
          </div>
        );
      })}
    </div>
  );
};

const ToastProvider = ({ children }) => children;

// ── FORM VALIDATION HOOK ────────────────────────────────────────────────────
const useForm = (initialValues, rules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const set = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
    if (touched[field]) validate({ ...values, [field]: value });
  };

  const touch = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate(values);
  };

  const validate = (vals = values) => {
    const errs = {};
    Object.entries(rules).forEach(([field, ruleFns]) => {
      for (const rule of ruleFns) {
        const err = rule(vals[field], vals);
        if (err) { errs[field] = err; break; }
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const isValid = Object.keys(errors).length === 0 && Object.keys(touched).length > 0;

  return { values, errors, touched, set, touch, validate, isValid };
};

// Validation rules
const required = (msg = 'This field is required') => (v) => (!v || !String(v).trim()) ? msg : null;
const minLen   = (n, msg) => (v) => (v && v.length < n) ? (msg || `Min ${n} characters`) : null;
const isPhone  = (v) => v && !/^0[2-5]\d{8}$/.test(v.replace(/\s/g,'')) ? 'Enter a valid Ghana phone (e.g. 024XXXXXXX)' : null;
const isTIN    = (v) => v && !/^GH-TIN-\d{4}-\d{4}$/.test(v) ? 'Format: GH-TIN-XXXX-XXXX' : null;
const isGhCard = (v) => v && !/^GHA-\d{9}-\d$/.test(v) ? 'Format: GHA-XXXXXXXXX-X' : null;

// Field component with inline error
const Field = ({ label, error, touched, children, required: req, hint }) => (
  <div className="rg-field">
    <label style={{ display:'flex', gap:4, alignItems:'center' }}>
      {label}
      {req && <span style={{ color:T.red, fontSize:10 }}>*</span>}
    </label>
    {children}
    {hint && !error && <div style={{ fontSize:10, color:T.t3, marginTop:4 }}>{hint}</div>}
    {touched && error && (
      <div style={{ fontSize:11, color:T.red, marginTop:4, display:'flex', alignItems:'center', gap:5 }}>
        <span style={{ fontFamily:F.mono, fontSize:10 }}>!</span> {error}
      </div>
    )}
  </div>
);

// ── PAGINATION COMPONENT ────────────────────────────────────────────────────
const usePagination = (items, perPage = 10) => {
  const [page, setPage] = useState(1);
  const total = Math.ceil(items.length / perPage);
  const paginated = items.slice((page - 1) * perPage, page * perPage);
  const reset = () => setPage(1);
  return { page, setPage, total, paginated, reset, total_items: items.length, perPage };
};

const Pagination = ({ page, total, setPage, totalItems, perPage }) => {
  if (total <= 1) return null;
  const pages = Array.from({ length: Math.min(total, 7) }, (_, i) => {
    if (total <= 7) return i + 1;
    if (page <= 4) return i + 1 <= 5 ? i + 1 : i === 5 ? '…' : total;
    if (page >= total - 3) return i === 0 ? 1 : i === 1 ? '…' : total - 5 + i;
    return i === 0 ? 1 : i === 1 ? '…' : i === 5 ? '…' : i === 6 ? total : page - 2 + i;
  });

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderTop:`1px solid ${T.border}` }}>
      <span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>
        {((page-1)*perPage)+1}–{Math.min(page*perPage, totalItems)} of {totalItems}
      </span>
      <div style={{ display:'flex', gap:4 }}>
        <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
          style={{ padding:'4px 10px', background:'transparent', border:`1px solid ${T.border}`, borderRadius:4, cursor:page===1?'default':'pointer', color:page===1?T.t3:T.t1, fontFamily:F.mono, fontSize:11, opacity:page===1?0.4:1 }}>←</button>
        {pages.map((p, i) => (
          <button key={i} onClick={() => typeof p === 'number' && setPage(p)} disabled={p==='…'}
            style={{ padding:'4px 10px', background:p===page?T.green:'transparent', border:`1px solid ${p===page?T.green:T.border}`, borderRadius:4, cursor:p==='…'?'default':'pointer', color:p===page?'#fff':T.t2, fontFamily:F.mono, fontSize:11 }}>
            {p}
          </button>
        ))}
        <button onClick={() => setPage(p => Math.min(total, p+1))} disabled={page===total}
          style={{ padding:'4px 10px', background:'transparent', border:`1px solid ${T.border}`, borderRadius:4, cursor:page===total?'default':'pointer', color:page===total?T.t3:T.t1, fontFamily:F.mono, fontSize:11, opacity:page===total?0.4:1 }}>→</button>
      </div>
    </div>
  );
};

// ── SORTABLE TABLE HOOK ─────────────────────────────────────────────────────
const useSort = (items, defaultKey, defaultDir = 'asc') => {
  const [sortKey, setSortKey] = useState(defaultKey);
  const [sortDir, setSortDir] = useState(defaultDir);

  const toggle = (key) => {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = [...items].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (av == null) return 1; if (bv == null) return -1;
    const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const SortHeader = ({ col, label, style }) => (
    <th onClick={() => toggle(col)} style={{ ...style, cursor:'pointer', userSelect:'none', whiteSpace:'nowrap' }}>
      <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
        {label}
        <span style={{ fontFamily:F.mono, fontSize:9, color:sortKey===col?T.green:T.t3, opacity:0.7 }}>
          {sortKey===col ? (sortDir==='asc' ? '↑' : '↓') : '↕'}
        </span>
      </span>
    </th>
  );

  return { sorted, sortKey, sortDir, toggle, SortHeader };
};

// ── SEARCH HOOK ─────────────────────────────────────────────────────────────
const useSearch = (items, fields) => {
  const [query, setQuery] = useState('');
  const filtered = query.trim()
    ? items.filter(item => fields.some(f => String(item[f] || '').toLowerCase().includes(query.toLowerCase())))
    : items;
  return { query, setQuery, filtered };
};

const SearchInput = ({ query, setQuery, placeholder = 'Search…', style }) => (
  <div style={{ position:'relative', ...style }}>
    <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontFamily:F.mono, fontSize:12, color:T.t3 }}>⌕</span>
    <input value={query} onChange={e => setQuery(e.target.value)} placeholder={placeholder}
      className="rg-input" style={{ paddingLeft:28, width:'100%' }} />
    {query && (
      <button onClick={() => setQuery('')}
        style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', background:'transparent', border:'none', color:T.t3, cursor:'pointer', fontSize:14, lineHeight:1 }}>×</button>
    )}
  </div>
);

// ── DATE RANGE FILTER ───────────────────────────────────────────────────────
const DateRangeFilter = ({ from, to, setFrom, setTo }) => (
  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
    <input type="date" value={from} onChange={e => setFrom(e.target.value)}
      className="rg-input" style={{ width:136, fontSize:11 }} />
    <span style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>→</span>
    <input type="date" value={to} onChange={e => setTo(e.target.value)}
      className="rg-input" style={{ width:136, fontSize:11 }} />
    {(from || to) && (
      <button onClick={() => { setFrom(''); setTo(''); }}
        style={{ background:'transparent', border:'none', color:T.t3, cursor:'pointer', fontSize:12 }}>Clear</button>
    )}
  </div>
);

// ── GLOBAL SEARCH MODAL ─────────────────────────────────────────────────────
const GlobalSearch = ({ onClose, onNavigate }) => {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const allItems = [
    ...CASES.map(c => ({ type:'Case', id:c.id, title:caseTypeLabel(c.type), sub:`${c.property} · ${c.district}`, role:'manager', page:'casedetail', data:c, tag:c.status })),
    ...PROPERTIES.map(p => ({ type:'Property', id:p.id, title:p.address, sub:`${p.mmda} · Risk ${p.risk} · ${p.landlord}`, role:'admin', page:'properties', tag:p.violations>0?'violations':'compliant' })),
    ...OFFICERS.map(o => ({ type:'Officer', id:o.id, title:o.name, sub:`${o.district} · ${o.insp} inspections`, role:'admin', page:'officers', tag:o.active?'on duty':'off duty' })),
    { type:'Page', id:'gra', title:'GRA Tax Export', sub:'Generate and send rental income data to Ghana Revenue Authority', role:'admin', page:'gra', tag:'admin' },
    { type:'Page', id:'flow', title:'Enforcement Flow', sub:'End-to-end enforcement workflow walkthrough', role:'admin', page:'flow', tag:'admin' },
    { type:'Page', id:'regions', title:'Regional Intelligence', sub:'Compliance rates by region and MMDA', role:'admin', page:'regions', tag:'admin' },
    { type:'Page', id:'activity', title:'Live Activity Feed', sub:'Real-time enforcement events', role:'admin', page:'activity', tag:'live' },
    { type:'Page', id:'register', title:'Register Property', sub:'Add a new property to the Rent Control registry', role:'landlord', page:'register', tag:'landlord' },
    { type:'Page', id:'ussd', title:'USSD Simulator', sub:'*714*1# tenant verification service demo', role:'tenant', page:'ussd', tag:'tenant' },
  ];

  const results = q.trim() ? allItems.filter(i =>
    i.title.toLowerCase().includes(q.toLowerCase()) ||
    i.sub.toLowerCase().includes(q.toLowerCase()) ||
    i.id.toLowerCase().includes(q.toLowerCase())
  ) : allItems.slice(0, 8);

  const typeColor = { Case:T.amber, Property:T.blue, Officer:T.green, Page:T.t3 };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)', zIndex:2000, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:80 }}
      onClick={onClose}>
      <div style={{ width:'100%', maxWidth:580, background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, overflow:'hidden', boxShadow:'0 24px 80px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}>
        {/* Search input */}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 18px', borderBottom:`1px solid ${T.border}` }}>
          <span style={{ fontFamily:F.mono, fontSize:16, color:T.t3 }}>⌕</span>
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search cases, properties, officers, pages…"
            style={{ flex:1, background:'transparent', border:'none', outline:'none', fontFamily:F.body, fontSize:14, color:T.t1 }} />
          <span style={{ fontFamily:F.mono, fontSize:10, color:T.t3, background:T.card, padding:'2px 6px', borderRadius:3 }}>ESC</span>
        </div>

        {/* Results */}
        <div style={{ maxHeight:420, overflowY:'auto' }}>
          {results.length === 0 ? (
            <div style={{ padding:'32px 18px', textAlign:'center', color:T.t3, fontFamily:F.mono, fontSize:12 }}>No results for "{q}"</div>
          ) : (
            <>
              {!q && <div style={{ padding:'8px 18px 4px', fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase' }}>Quick Navigation</div>}
              {results.map((item, i) => (
                <div key={i} onClick={() => { onNavigate(item.role, item.page, item.data); onClose(); }}
                  style={{ display:'flex', gap:12, alignItems:'center', padding:'12px 18px', cursor:'pointer', borderBottom:`1px solid rgba(36,54,40,0.3)`, transition:'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = T.card}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width:32, height:32, borderRadius:6, background:`${typeColor[item.type]}15`, border:`1px solid ${typeColor[item.type]}30`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ fontFamily:F.mono, fontSize:9, fontWeight:700, color:typeColor[item.type] }}>{item.type.slice(0,2).toUpperCase()}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:2 }}>{item.title}</div>
                    <div style={{ fontSize:11, color:T.t3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.sub}</div>
                  </div>
                  <span style={{ fontFamily:F.mono, fontSize:9, color:typeColor[item.type], textTransform:'uppercase', letterSpacing:1, flexShrink:0 }}>{item.tag}</span>
                </div>
              ))}
            </>
          )}
        </div>

        <div style={{ padding:'8px 18px', borderTop:`1px solid ${T.border}`, display:'flex', gap:16 }}>
          {[['↑↓','Navigate'],['↵','Open'],['Esc','Close']].map(([k,l]) => (
            <div key={k} style={{ display:'flex', gap:5, alignItems:'center' }}>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.t3, background:T.card, padding:'2px 5px', borderRadius:2 }}>{k}</span>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── SETTINGS PAGE ───────────────────────────────────────────────────────────
const SettingsPage = () => {
  const [tab, setTab] = useState('system');
  const toast = useToast();
  const [settings, setSettings] = useState({
    syncInterval: '30',
    autoAssign: false,
    slaHours: '48',
    graExportDay: '1',
    taskforceAlert: true,
    emailAlerts: true,
    smsAlerts: true,
    riskThresholdHigh: '70',
    riskThresholdMedium: '40',
    advanceCapMonthly: '1',
    advanceCapLonger: '6',
    ussdCode: '*714*1#',
    portalUrl: 'rentcontrol.mwh.gov.gh',
  });
  const upd = (k, v) => setSettings(p => ({ ...p, [k]: v }));
  const save = () => toast('Settings saved successfully', 'success');

  return (
    <div className="fade-in">
      <SectionHeader title="System Settings" sub="Platform configuration · Enforcement thresholds · Integration parameters" />
      <div className="rg-tabs rg-mb-2">
        {[['system','System'],['enforcement','Enforcement'],['notifications','Notifications'],['integrations','Integrations'],['users','User Management']].map(([id,lbl]) => (
          <button key={id} className={`rg-tab${tab===id?' active':''}`} onClick={() => setTab(id)}>{lbl}</button>
        ))}
      </div>

      {tab === 'system' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="rg-card" style={{ padding:20 }}>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Portal Sync</div>
            {[
              { key:'portalUrl', label:'Rent Control Portal URL', hint:'Base URL for rentcontrol.mwh.gov.gh API' },
              { key:'syncInterval', label:'Sync Interval (minutes)', hint:'How often to pull from official portal' },
            ].map(f => (
              <div className="rg-field" key={f.key}>
                <label>{f.label}</label>
                <input className="rg-input" value={settings[f.key]} onChange={e => upd(f.key, e.target.value)} />
                <div style={{ fontSize:10, color:T.t3, marginTop:4 }}>{f.hint}</div>
              </div>
            ))}
          </div>
          <div className="rg-card" style={{ padding:20 }}>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Case Management</div>
            <div className="rg-field">
              <label>SLA Deadline (hours)</label>
              <input type="number" className="rg-input" value={settings.slaHours} onChange={e => upd('slaHours', e.target.value)} />
              <div style={{ fontSize:10, color:T.t3, marginTop:4 }}>Hours before a case is flagged as overdue</div>
            </div>
            <div className="rg-field">
              <label>Auto-assign cases</label>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div onClick={() => upd('autoAssign', !settings.autoAssign)}
                  style={{ width:40, height:22, borderRadius:11, background:settings.autoAssign?T.green:T.border, cursor:'pointer', position:'relative', transition:'background 0.2s' }}>
                  <div style={{ position:'absolute', top:3, left:settings.autoAssign?20:3, width:16, height:16, borderRadius:'50%', background:'#fff', transition:'left 0.2s' }} />
                </div>
                <span style={{ fontSize:12, color:T.t2 }}>{settings.autoAssign ? 'Enabled — cases auto-routed by district' : 'Disabled — manual assignment only'}</span>
              </div>
            </div>
            <div className="rg-field">
              <label>GRA Export Day of Month</label>
              <input type="number" min="1" max="28" className="rg-input" value={settings.graExportDay} onChange={e => upd('graExportDay', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {tab === 'enforcement' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="rg-card" style={{ padding:20 }}>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Risk Score Thresholds</div>
            <div style={{ padding:'12px 14px', background:'rgba(59,130,246,0.07)', border:'1px solid rgba(59,130,246,0.15)', borderRadius:6, marginBottom:14, fontSize:12, color:T.t2, lineHeight:1.7 }}>
              These thresholds control when properties are flagged as HIGH or MEDIUM priority for Taskforce inspection routing.
            </div>
            {[
              { key:'riskThresholdHigh', label:'High Risk Threshold', color:T.red, sub:'Score ≥ this value = HIGH' },
              { key:'riskThresholdMedium', label:'Medium Risk Threshold', color:T.amber, sub:'Score ≥ this value = MEDIUM' },
            ].map(f => (
              <div className="rg-field" key={f.key}>
                <label style={{ color:f.color }}>{f.label}</label>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <input type="range" min="0" max="100" value={settings[f.key]} onChange={e => upd(f.key, e.target.value)}
                    style={{ flex:1, accentColor:f.color }} />
                  <span style={{ fontFamily:F.mono, fontSize:14, fontWeight:700, color:f.color, minWidth:32 }}>{settings[f.key]}</span>
                </div>
                <div style={{ fontSize:10, color:T.t3, marginTop:2 }}>{f.sub}</div>
              </div>
            ))}
          </div>
          <div className="rg-card" style={{ padding:20 }}>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Legal Advance Caps</div>
            <div style={{ padding:'12px 14px', background:T.redFade, border:'1px solid rgba(229,72,58,0.15)', borderRadius:6, marginBottom:14, fontSize:12, color:T.t2, lineHeight:1.7 }}>
              These values are set by Act 220 s.16(5). Only modify if the law changes. Current caps: 1 month (monthly tenancy), 6 months (longer tenancy).
            </div>
            {[
              { key:'advanceCapMonthly', label:'Monthly Tenancy Cap (months)', law:'Act 220 s.16(5)' },
              { key:'advanceCapLonger', label:'Longer Tenancy Cap (months)', law:'Act 220 s.16(5)' },
            ].map(f => (
              <div className="rg-field" key={f.key}>
                <label>{f.label} <span style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>§ {f.law}</span></label>
                <input type="number" className="rg-input" value={settings[f.key]} onChange={e => upd(f.key, e.target.value)} />
              </div>
            ))}
            <div className="rg-field">
              <label>USSD Service Code</label>
              <input className="rg-input" value={settings.ussdCode} onChange={e => upd('ussdCode', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {tab === 'notifications' && (
        <div className="rg-card" style={{ padding:20, maxWidth:560 }}>
          <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Notification Channels</div>
          {[
            { key:'taskforceAlert', label:'Push alerts to Taskforce officers', sub:'New assignments, route updates, sync requests', channel:'Push' },
            { key:'smsAlerts', label:'SMS notifications to landlords and tenants', sub:'Case updates, compliance reminders, deadlines', channel:'SMS' },
            { key:'emailAlerts', label:'Email notifications for case managers', sub:'Daily digest, escalations, GRA export readiness', channel:'Email' },
          ].map(f => (
            <div key={f.key} style={{ display:'flex', gap:14, alignItems:'flex-start', padding:'14px 0', borderBottom:`1px solid ${T.border}` }}>
              <div onClick={() => upd(f.key, !settings[f.key])}
                style={{ width:40, height:22, borderRadius:11, background:settings[f.key]?T.green:T.border, cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0, marginTop:2 }}>
                <div style={{ position:'absolute', top:3, left:settings[f.key]?20:3, width:16, height:16, borderRadius:'50%', background:'#fff', transition:'left 0.2s' }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:3 }}>{f.label}</div>
                <div style={{ fontSize:12, color:T.t2, marginBottom:4 }}>{f.sub}</div>
                <span style={{ fontFamily:F.mono, fontSize:9, color:settings[f.key]?T.green:T.t3, letterSpacing:1, textTransform:'uppercase' }}>{f.channel} · {settings[f.key]?'Active':'Inactive'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'integrations' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {[
            { name:'Rent Control Portal', url:'rentcontrol.mwh.gov.gh', status:'connected', last:'2 min ago', env:'Production' },
            { name:'NIA Ghana Card API', url:'api.nia.gov.gh/verify', status:'connected', last:'On-demand', env:'Production' },
            { name:'GRA Tax System', url:'api.gra.gov.gh', status:'pending', last:'—', env:'Staging' },
            { name:'MTN MoMo Webhook', url:'api.mtn.com.gh/momo', status:'connected', last:'Real-time', env:'Production' },
            { name:'Africa\'s Talking USSD', url:'api.africastalking.com', status:'connected', last:'*714*1#', env:'Production' },
            { name:'Meta WhatsApp API', url:'graph.facebook.com', status:'pending', last:'—', env:'Staging' },
          ].map((sys, i) => (
            <div key={i} className="rg-card" style={{ padding:18, borderLeft:`3px solid ${sys.status==='connected'?T.green:T.amber}` }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700 }}>{sys.name}</div>
                <span className={`rg-badge ${sys.status==='connected'?'rg-badge-green':'rg-badge-amber'}`}>{sys.status}</span>
              </div>
              <div style={{ fontFamily:F.mono, fontSize:11, color:T.green, marginBottom:6 }}>{sys.url}</div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:T.t3 }}>
                <span>Last active: {sys.last}</span>
                <span>{sys.env}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'users' && <UserManagement />}

      <div style={{ marginTop:20, display:'flex', gap:8 }}>
        <button className="rg-btn rg-btn-primary" onClick={save}>Save Changes</button>
        <button className="rg-btn rg-btn-ghost" onClick={()=>toast&&toast("Settings reset to defaults","warning")}>Reset to Defaults</button>
      </div>
    </div>
  );
};

// ── USER MANAGEMENT TABLE ───────────────────────────────────────────────────
const USERS_DATA = [
  { id:'U-001', name:'Kwame Acheampong', role:'case_manager',      email:'k.acheampong@rentguard.gh', district:'National',        active:true,  last:'Today 09:31' },
  { id:'U-002', name:'Kofi Mensah',      role:'taskforce_officer', email:'k.mensah@rentguard.gh',     district:'Ayawaso East',    active:true,  last:'Today 09:42' },
  { id:'U-003', name:'Ama Amankwa',      role:'taskforce_officer', email:'a.amankwa@rentguard.gh',    district:'Ayawaso West',    active:true,  last:'Today 09:18' },
  { id:'U-004', name:'Grace Osei',       role:'taskforce_officer', email:'g.osei@rentguard.gh',       district:'La Nkwantanang', active:true,  last:'Today 08:55' },
  { id:'U-005', name:'Samuel Quaye',     role:'taskforce_officer', email:'s.quaye@rentguard.gh',      district:'Okaikwei North', active:false, last:'2 days ago' },
  { id:'U-006', name:'Prince Ampofo',    role:'regional_officer',  email:'p.ampofo@rentguard.gh',     district:'Ashanti Region', active:true,  last:'Today 07:30' },
  { id:'U-007', name:'Janet Amoah',      role:'mmda_focal',        email:'j.amoah@rentguard.gh',      district:'Tema West',       active:true,  last:'Yesterday' },
  { id:'U-008', name:'Richard Boateng',  role:'gra_auditor',       email:'r.boateng@gra.gov.gh',      district:'National',        active:true,  last:'3 days ago' },
];

const roleLabels = {
  national_admin:'National Admin', case_manager:'Case Manager', taskforce_officer:'Taskforce Officer',
  regional_officer:'Regional Officer', mmda_focal:'MMDA Focal', gra_auditor:'GRA Auditor', landlord:'Landlord', tenant:'Tenant'
};

const UserManagement = () => {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name:'', email:'', role:'taskforce_officer', district:'' });
  const toast = useToast();
  const { query, setQuery, filtered } = useSearch(USERS_DATA, ['name','email','district','role']);
  const { sorted, SortHeader } = useSort(filtered, 'name');
  const { paginated, page, setPage, total, total_items, perPage } = usePagination(sorted, 5);

  const sendInvite = () => {
    toast(`Invitation sent to ${inviteForm.email}`, 'success');
    setShowInvite(false);
    setInviteForm({ name:'', email:'', role:'taskforce_officer', district:'' });
  };

  return (
    <div className="fade-in">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <SearchInput query={query} setQuery={setQuery} placeholder="Search users by name, email, district…" style={{ width:320 }} />
        <button className="rg-btn rg-btn-primary" onClick={() => setShowInvite(true)}>+ Invite User</button>
      </div>

      {showInvite && (
        <div className="rg-card slide-up" style={{ padding:20, marginBottom:16 }}>
          <div style={{ fontFamily:F.head, fontSize:15, fontWeight:700, marginBottom:14 }}>Invite New User</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <div className="rg-field"><label>Full Name</label><input className="rg-input" value={inviteForm.name} onChange={e=>setInviteForm(p=>({...p,name:e.target.value}))} /></div>
            <div className="rg-field"><label>Email Address</label><input type="email" className="rg-input" value={inviteForm.email} onChange={e=>setInviteForm(p=>({...p,email:e.target.value}))} /></div>
            <div className="rg-field">
              <label>Role</label>
              <select className="rg-select" value={inviteForm.role} onChange={e=>setInviteForm(p=>({...p,role:e.target.value}))}>
                {Object.entries(roleLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div className="rg-field"><label>District / Region</label><input className="rg-input" value={inviteForm.district} onChange={e=>setInviteForm(p=>({...p,district:e.target.value}))} placeholder="e.g. Ayawaso East" /></div>
          </div>
          <div style={{ display:'flex', gap:8, marginTop:8 }}>
            <button className="rg-btn rg-btn-primary" onClick={sendInvite} disabled={!inviteForm.email||!inviteForm.name}>Send Invitation</button>
            <button className="rg-btn rg-btn-ghost" onClick={() => setShowInvite(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="rg-card" style={{ padding:0 }}>
        <table className="rg-table">
          <thead>
            <tr>
              <SortHeader col="name" label="Name" />
              <SortHeader col="role" label="Role" />
              <th>Email</th>
              <SortHeader col="district" label="District" />
              <SortHeader col="active" label="Status" />
              <SortHeader col="last" label="Last Active" />
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((u,i) => (
              <tr key={i}>
                <td>
                  <div style={{ display:'flex', gap:9, alignItems:'center' }}>
                    <div style={{ width:28, height:28, borderRadius:'50%', background:u.active?T.greenFade:T.border, border:`1.5px solid ${u.active?T.green:T.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:u.active?T.green:T.t3, flexShrink:0 }}>
                      {u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                    </div>
                    <span style={{ fontSize:12, fontWeight:600, color:T.t1 }}>{u.name}</span>
                  </div>
                </td>
                <td><span style={{ fontFamily:F.mono, fontSize:10, color:T.t2 }}>{roleLabels[u.role]||u.role}</span></td>
                <td><span style={{ fontSize:12, color:T.t2 }}>{u.email}</span></td>
                <td><span style={{ fontSize:12, color:T.t2 }}>{u.district}</span></td>
                <td><span className={`rg-badge ${u.active?'rg-badge-green':'rg-badge-muted'}`}>{u.active?'Active':'Inactive'}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{u.last}</span></td>
                <td>
                  <div style={{ display:'flex', gap:6 }}>
                    <button className="rg-btn rg-btn-ghost" style={{ fontSize:10, padding:'3px 8px' }} onClick={()=>toast(`Email sent to ${u.name}`,'info')}>Message</button>
                    <button className="rg-btn rg-btn-ghost" style={{ fontSize:10, padding:'3px 8px' }} onClick={()=>toast(`${u.name} ${u.active?'deactivated':'activated'}`,'warning')}>{u.active?'Deactivate':'Activate'}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={total} setPage={setPage} totalItems={total_items} perPage={perPage} />
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// STEP 2 — ADMIN & CASE MANAGER DEPTH
// Bulk actions · SLA tracking · Officer performance · Case search · Policy log
// ═══════════════════════════════════════════════════════════════════════════

// ── SLA TRACKER COMPONENT ──────────────────────────────────────────────────
const SLATracker = ({ cases }) => {
  const now = new Date('2026-03-16');
  const withSLA = cases.map(c => {
    const opened = new Date(c.opened);
    const hoursOpen = Math.floor((now - opened) / 36e5);
    const slaHours = c.sev === 'critical' ? 24 : c.sev === 'high' ? 48 : c.sev === 'medium' ? 72 : 120;
    const hoursLeft = slaHours - hoursOpen;
    const status = hoursLeft < 0 ? 'overdue' : hoursLeft < 12 ? 'critical' : hoursLeft < 24 ? 'warning' : 'ok';
    return { ...c, hoursOpen, slaHours, hoursLeft, slaStatus: status };
  });

  const overdue  = withSLA.filter(c => c.slaStatus === 'overdue');
  const critical = withSLA.filter(c => c.slaStatus === 'critical');
  const warning  = withSLA.filter(c => c.slaStatus === 'warning');

  return (
    <div className="fade-in">
      <SectionHeader title="SLA Tracker" sub="Case response deadlines · Based on severity thresholds" />

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>
        {[
          [overdue.length,  'Overdue',       T.red,    'Exceeded SLA'],
          [critical.length, 'Critical',      T.red,    '< 12hrs left'],
          [warning.length,  'Warning',       T.amber,  '12–24hrs left'],
          [withSLA.filter(c=>c.slaStatus==='ok').length, 'On Track', T.green, 'Within SLA'],
        ].map(([v,l,c,sub],i) => (
          <div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:16 }}>
            <div style={{ fontFamily:F.mono, fontSize:26, fontWeight:500, color:c, marginBottom:4 }}>{v}</div>
            <div style={{ fontSize:12, fontWeight:600, color:T.t1, marginBottom:2 }}>{l}</div>
            <div style={{ fontSize:11, color:T.t3 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div className="rg-card" style={{ padding:0 }}>
        <table className="rg-table">
          <thead><tr><th>Case</th><th>Type</th><th>Severity</th><th>Opened</th><th>SLA</th><th>Hours Open</th><th>Status</th><th>Assigned</th></tr></thead>
          <tbody>
            {withSLA.map((c,i) => (
              <tr key={i}>
                <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{c.id.replace('RC-2026-ACC-','RC-')}</span></td>
                <td style={{ fontSize:12 }}>{caseTypeLabel(c.type)}</td>
                <td><span className={`rg-badge ${c.sev==='critical'||c.sev==='high'?'rg-badge-red':c.sev==='medium'?'rg-badge-amber':'rg-badge-muted'}`}>{c.sev}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{c.opened}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{c.slaHours}h</span></td>
                <td>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:60, height:4, background:T.border, borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${Math.min(100,(c.hoursOpen/c.slaHours)*100)}%`, background:c.slaStatus==='ok'?T.green:c.slaStatus==='warning'?T.amber:T.red, borderRadius:2 }} />
                    </div>
                    <span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{c.hoursOpen}h</span>
                  </div>
                </td>
                <td>
                  <span style={{ fontFamily:F.mono, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8,
                    color:c.slaStatus==='overdue'?T.red:c.slaStatus==='critical'?T.red:c.slaStatus==='warning'?T.amber:T.green }}>
                    {c.slaStatus==='overdue' ? `${Math.abs(c.hoursLeft)}h overdue` : c.slaStatus==='ok' ? `${c.hoursLeft}h left` : `${c.hoursLeft}h left`}
                  </span>
                </td>
                <td><span style={{ fontSize:12, color:c.assigned?T.t2:T.red }}>{c.assigned||'Unassigned'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── BULK CASE MANAGEMENT ────────────────────────────────────────────────────
const BulkCaseManager = ({ onSelectCase }) => {
  const [selected, setSelected] = useState(new Set());
  const [bulkAction, setBulkAction] = useState('');
  const [bulkOfficer, setBulkOfficer] = useState('');
  const toast = useToast();
  const { query, setQuery, filtered } = useSearch(CASES, ['id','type','property','landlord','district']);
  const { sorted, SortHeader } = useSort(filtered, 'opened', 'desc');
  const { paginated, page, setPage, total, total_items, perPage } = usePagination(sorted, 6);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const dateFiltered = paginated.filter(c => {
    if (dateFrom && c.opened < dateFrom) return false;
    if (dateTo && c.opened > dateTo) return false;
    return true;
  });

  const toggleAll = () => {
    if (selected.size === dateFiltered.length) setSelected(new Set());
    else setSelected(new Set(dateFiltered.map(c => c.id)));
  };
  const toggle = (id) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  const executeBulk = () => {
    if (!bulkAction) return;
    const n = selected.size;
    if (bulkAction === 'assign' && bulkOfficer) {
      toast(`${n} case${n!==1?'s':''} assigned to ${OFFICERS.find(o=>o.id===bulkOfficer)?.name}`, 'success');
    } else if (bulkAction === 'close') {
      toast(`${n} case${n!==1?'s':''} closed`, 'success');
    } else if (bulkAction === 'escalate') {
      toast(`${n} case${n!==1?'s':''} escalated to supervisor`, 'warning');
    }
    setSelected(new Set()); setBulkAction(''); setBulkOfficer('');
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Case Queue" sub="Search · Filter · Bulk actions · Sort" />

      {/* Filters row */}
      <div style={{ display:'flex', gap:10, marginBottom:14, flexWrap:'wrap', alignItems:'center' }}>
        <SearchInput query={query} setQuery={setQuery} placeholder="Case ID, type, property, landlord…" style={{ flex:'1 1 240px' }} />
        <DateRangeFilter from={dateFrom} to={dateTo} setFrom={setDateFrom} setTo={setDateTo} />
      </div>

      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <div className="slide-up" style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 16px', background:T.greenFade, border:`1px solid rgba(15,168,106,0.2)`, borderRadius:8, marginBottom:12, flexWrap:'wrap' }}>
          <span style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:T.green }}>{selected.size} selected</span>
          <div style={{ width:1, height:16, background:T.border }} />
          <select className="rg-select" value={bulkAction} onChange={e=>setBulkAction(e.target.value)} style={{ width:180, fontSize:11 }}>
            <option value="">Bulk action…</option>
            <option value="assign">Assign to Officer</option>
            <option value="escalate">Escalate to Supervisor</option>
            <option value="close">Close Cases</option>
          </select>
          {bulkAction === 'assign' && (
            <select className="rg-select" value={bulkOfficer} onChange={e=>setBulkOfficer(e.target.value)} style={{ width:200, fontSize:11 }}>
              <option value="">Select officer…</option>
              {OFFICERS.filter(o=>o.active).map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          )}
          <button className="rg-btn rg-btn-primary" onClick={executeBulk} disabled={!bulkAction} style={{ fontSize:11 }}>Apply</button>
          <button className="rg-btn rg-btn-ghost" onClick={()=>setSelected(new Set())} style={{ fontSize:11 }}>Clear</button>
        </div>
      )}

      <div className="rg-card" style={{ padding:0 }}>
        <table className="rg-table rg-table-clickable">
          <thead>
            <tr>
              <th style={{ width:36 }}>
                <input type="checkbox" checked={selected.size===dateFiltered.length && dateFiltered.length>0}
                  onChange={toggleAll} style={{ cursor:'pointer', accentColor:T.green }} />
              </th>
              <SortHeader col="id" label="Case ID" />
              <SortHeader col="type" label="Type" />
              <th>Property · Landlord</th>
              <SortHeader col="district" label="District" />
              <SortHeader col="sev" label="Sev." />
              <SortHeader col="status" label="Status" />
              <SortHeader col="opened" label="Opened" />
              <th>Officer</th>
            </tr>
          </thead>
          <tbody>
            {dateFiltered.map((c,i) => (
              <tr key={i} onClick={(e) => { if(e.target.type!=='checkbox') onSelectCase(c); }}>
                <td onClick={e=>e.stopPropagation()}>
                  <input type="checkbox" checked={selected.has(c.id)} onChange={()=>toggle(c.id)}
                    style={{ cursor:'pointer', accentColor:T.green }} />
                </td>
                <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{c.id.replace('RC-2026-ACC-','RC-')}</span></td>
                <td style={{ fontSize:12 }}>{caseTypeLabel(c.type)}</td>
                <td><div style={{ fontSize:12, color:T.t1 }}>{c.property}</div><div style={{ fontSize:11, color:T.t3 }}>{c.landlord}</div></td>
                <td style={{ fontSize:11, color:T.t2 }}>{c.district}</td>
                <td><span className={`rg-badge ${c.sev==='critical'||c.sev==='high'?'rg-badge-red':c.sev==='medium'?'rg-badge-amber':'rg-badge-muted'}`}>{c.sev}</span></td>
                <td><span className={`rg-badge ${statusBadge(c.status)}`}>{statusLabel(c.status)}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{c.opened}</span></td>
                <td><span style={{ fontSize:12, color:c.assigned?T.t2:T.red }}>{c.assigned||'Unassigned'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} total={total} setPage={setPage} totalItems={total_items} perPage={perPage} />
      </div>
    </div>
  );
};

// ── OFFICER PERFORMANCE METRICS ─────────────────────────────────────────────
const OfficerPerformance = () => {
  const { query, setQuery, filtered } = useSearch(OFFICERS, ['name','district']);
  const { sorted, SortHeader } = useSort(filtered, 'insp', 'desc');
  const toast = useToast();

  const metrics = sorted.map(o => ({
    ...o,
    compRate: Math.round((o.insp / 20) * 100),
    avgPerDay: (o.insp / 16).toFixed(1),
    caseRate: Math.round((o.cases / o.insp) * 100),
  }));

  return (
    <div className="fade-in">
      <SectionHeader title="Officer Performance" sub="Month-to-date · Inspection completion · Case generation rate" />
      <SearchInput query={query} setQuery={setQuery} placeholder="Search officers…" style={{ width:280, marginBottom:16 }} />
      <div className="rg-card" style={{ padding:0 }}>
        <table className="rg-table">
          <thead>
            <tr>
              <SortHeader col="name" label="Officer" />
              <SortHeader col="district" label="District" />
              <SortHeader col="insp" label="Inspections (MTD)" />
              <th>Avg / Day</th>
              <th>Completion Rate</th>
              <SortHeader col="cases" label="Cases Filed" />
              <th>Case Rate</th>
              <SortHeader col="active" label="Status" />
              <th></th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((o,i) => (
              <tr key={i}>
                <td>
                  <div style={{ display:'flex', gap:9, alignItems:'center' }}>
                    <div style={{ width:28, height:28, borderRadius:'50%', background:o.active?T.greenFade:T.border, border:`1.5px solid ${o.active?T.green:T.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:o.active?T.green:T.t3, flexShrink:0 }}>
                      {o.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <span style={{ fontSize:13, fontWeight:600, color:T.t1 }}>{o.name}</span>
                  </div>
                </td>
                <td style={{ fontSize:12, color:T.t2 }}>{o.district}</td>
                <td><span style={{ fontFamily:F.mono, fontSize:14, fontWeight:600, color:o.insp>12?T.green:o.insp>8?T.amber:T.red }}>{o.insp}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:12, color:T.t2 }}>{o.avgPerDay}</span></td>
                <td>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:60, height:5, background:T.border, borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${o.compRate}%`, background:o.compRate>70?T.green:o.compRate>50?T.amber:T.red, borderRadius:2 }} />
                    </div>
                    <span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{o.compRate}%</span>
                  </div>
                </td>
                <td><span style={{ fontFamily:F.mono, fontSize:14, fontWeight:600, color:o.cases>5?T.green:T.amber }}>{o.cases}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:12, color:T.t2 }}>{o.caseRate}%</span></td>
                <td><span className={`rg-badge ${o.active?'rg-badge-green':'rg-badge-muted'}`}>{o.active?'On duty':'Off duty'}</span></td>
                <td>
                  <button className="rg-btn rg-btn-ghost" style={{ fontSize:10, padding:'3px 8px' }}
                    onClick={()=>toast(`Message sent to ${o.name}`,'info')}>Message</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── POLICY CHANGE LOG ────────────────────────────────────────────────────────
const POLICY_LOG = [
  { date:'2026-04-01', change:'Rent Card mandate takes effect', law:'PNDCL 138 s.5 enforcement', impact:'All landlords must issue cards — April 1 deadline', severity:'critical', source:'Acting Rent Commissioner' },
  { date:'2026-03-01', change:'National Rent Taskforce deployed', law:'PNDCL 138 s.4 + Act 220', impact:'Officers active in all 16 regions. Yellow uniform identification.', severity:'high', source:'Ministry of Works and Housing' },
  { date:'2026-02-15', change:'GRA data-sharing MOU signed', law:'Income Tax Act — rental income', impact:'Monthly rental income exports to GRA enabled for TIN-registered landlords.', severity:'medium', source:'GRA + Rent Control MOU' },
  { date:'2026-01-01', change:'Digital tenancy agreements mandatory', law:'PNDCL 138 s.4', impact:'Written and registered agreements required for all new tenancies.', severity:'high', source:'Chief Rent Manager circular' },
  { date:'2025-09-12', change:'Rent Control digital platform launched', law:'Institutional', impact:'rentcontrol.mwh.gov.gh live in 15 offices. Phase 2 planned for remaining regions.', severity:'medium', source:'Ministry of Works and Housing' },
  { date:'1986-01-01', change:'PNDCL 138 enacted', law:'PNDCL 138 — Rent Control Law', impact:'Established Rent and Housing Committees. Mandated rent cards and tenancy registration.', severity:'info', source:'PNDC Government' },
  { date:'1963-01-01', change:'Rent Act enacted', law:'Act 220 — Rent Act 1963', impact:'Established 6-month advance rent cap. Created legal framework for rental regulation.', severity:'info', source:'Republic of Ghana' },
];

const PolicyLog = () => {
  const { query, setQuery, filtered } = useSearch(POLICY_LOG, ['change','law','source','impact']);
  const sevColor = { critical:T.red, high:T.amber, medium:T.blue, info:T.t3 };

  return (
    <div className="fade-in">
      <SectionHeader title="Policy & Legal Log" sub="Chronological record of legislative changes, enforcement directives and institutional actions" />
      <SearchInput query={query} setQuery={setQuery} placeholder="Search policy changes…" style={{ width:320, marginBottom:16 }} />
      <div style={{ position:'relative', paddingLeft:20 }}>
        <div style={{ position:'absolute', left:9, top:0, bottom:0, width:2, background:T.border }} />
        {filtered.map((p,i) => (
          <div key={i} style={{ display:'flex', gap:16, marginBottom:20, position:'relative' }}>
            <div style={{ width:16, height:16, borderRadius:'50%', background:sevColor[p.severity], flexShrink:0, marginTop:3, position:'relative', zIndex:1, boxShadow:`0 0 0 3px ${T.surface}` }} />
            <div style={{ flex:1 }}>
              <div className="rg-card" style={{ padding:18 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8, gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:3 }}>{p.change}</div>
                    <div style={{ fontFamily:F.mono, fontSize:10, color:sevColor[p.severity], letterSpacing:1, textTransform:'uppercase' }}>{p.law}</div>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <div style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{p.date}</div>
                    <div style={{ fontSize:10, color:T.t3, marginTop:2 }}>{p.source}</div>
                  </div>
                </div>
                <div style={{ fontSize:13, color:T.t2, lineHeight:1.7 }}>{p.impact}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── PRINT REPORT ─────────────────────────────────────────────────────────────
const PrintReport = () => {
  const toast = useToast();
  const [generating, setGenerating] = useState(false);
  const [reportType, setReportType] = useState('compliance');

  const doPrint = () => {
    setGenerating(true);
    toast('Report generated — opening print dialog', 'success');
    setTimeout(() => { setGenerating(false); window.print?.(); }, 800);
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Print Reports" sub="Generate formatted reports for ministry, GRA, and court use" />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, maxWidth:700 }}>
        {[
          { id:'compliance',   title:'National Compliance Report',       sub:'Registration rates, rent card adoption, violation summary by region',    pages:'4–6' },
          { id:'violations',   title:'Violation Enforcement Summary',     sub:'All active cases, SLA status, officer assignments, outcomes',           pages:'3–5' },
          { id:'landlord',     title:'Landlord Risk Register',            sub:'All landlords ranked by risk score with GRA flags',                     pages:'2–3' },
          { id:'gra_brief',    title:'GRA Rental Income Brief',           sub:'Summarised rental income data by district for tax authority use',        pages:'2–4' },
          { id:'case_docket',  title:'Individual Case Docket',            sub:'Full case file with timeline, evidence references, and legal citations', pages:'1–2' },
          { id:'inspection',   title:'Inspection Activity Report',        sub:'All inspections this period with findings and case generation rates',    pages:'3–4' },
        ].map(r => (
          <div key={r.id} onClick={() => setReportType(r.id)}
            style={{ background: reportType===r.id?T.greenFade:T.card, border:`2px solid ${reportType===r.id?T.green:T.border}`, borderRadius:8, padding:16, cursor:'pointer', transition:'all 0.15s' }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.t1, marginBottom:4 }}>{r.title}</div>
            <div style={{ fontSize:12, color:T.t2, lineHeight:1.5, marginBottom:8 }}>{r.sub}</div>
            <div style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{r.pages} pages · PDF</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:20, display:'flex', gap:8 }}>
        <button className="rg-btn rg-btn-primary" onClick={doPrint}>
          {generating ? 'Generating…' : '↓ Generate Report'}
        </button>
        <button className="rg-btn rg-btn-ghost" onClick={()=>toast('Scheduled for 8AM daily delivery','info')}>Schedule Daily</button>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// STEP 3 — OFFICER + LANDLORD DEPTH
// QR Scanner · Photo Gallery · Shift Report · Tax Summary · Renewal · Upload
// ═══════════════════════════════════════════════════════════════════════════

// ── QR SCANNER SIMULATION ───────────────────────────────────────────────────
const QRScanner = ({ onResult }) => {
  const [scanning, setScanning] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanPhase, setScanPhase] = useState(0); // 0=idle 1=finding 2=locking 3=done

  const simulateScan = (cardNum) => {
    setScanning(true); setScanPhase(1);
    setTimeout(() => setScanPhase(2), 600);
    setTimeout(() => setScanPhase(3), 1200);
    setTimeout(() => {
      const card = RENT_CARDS[cardNum?.toUpperCase()] || null;
      setScanResult({ cardNum: cardNum?.toUpperCase(), found: !!card, card });
      setScanning(false); setScanPhase(0);
      onResult && onResult(cardNum, card);
    }, 1600);
  };

  const viewfinderColors = ['#243628','#2E4435','#0FA86A'];
  const phase = scanPhase;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      {/* Viewfinder */}
      <div style={{ position:'relative', height:200, background:'#050c06', borderRadius:8, overflow:'hidden', border:`1px solid ${T.border}` }}>
        {/* Scan line */}
        {scanning && (
          <div style={{ position:'absolute', left:0, right:0, height:2, background:T.green, opacity:0.8, boxShadow:`0 0 8px ${T.green}`,
            animation:'scanLine 1.2s ease-in-out infinite', top:'50%' }} />
        )}
        {/* Corner markers */}
        {[{top:12,left:12},{top:12,right:12},{bottom:12,left:12},{bottom:12,right:12}].map((pos,i) => (
          <div key={i} style={{ position:'absolute', width:20, height:20, ...pos,
            borderTop: (pos.top!==undefined) ? `2px solid ${scanning?T.green:T.t3}` : 'none',
            borderBottom: (pos.bottom!==undefined) ? `2px solid ${scanning?T.green:T.t3}` : 'none',
            borderLeft: (pos.left!==undefined) ? `2px solid ${scanning?T.green:T.t3}` : 'none',
            borderRight: (pos.right!==undefined) ? `2px solid ${scanning?T.green:T.t3}` : 'none',
            transition: 'border-color 0.3s' }} />
        ))}
        {/* Center state */}
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8 }}>
          {!scanning && !scanResult && (
            <>
              <div style={{ width:48, height:48, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:3, opacity:0.15 }}>
                {[...Array(9)].map((_,i)=><div key={i} style={{ background:[0,2,6,8,4].includes(i)?T.green:'transparent', borderRadius:1 }} />)}
              </div>
              <span style={{ fontFamily:F.mono, fontSize:10, color:T.t3, letterSpacing:1 }}>Aim at QR code</span>
            </>
          )}
          {scanning && (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <span style={{ fontFamily:F.mono, fontSize:10, color:T.green, letterSpacing:1 }}>
                {phase===1?'SEARCHING…':phase===2?'LOCKING…':'READING…'}
              </span>
              <div style={{ display:'flex', gap:4 }}>
                {[0,1,2].map(d => (
                  <div key={d} style={{ width:6, height:6, borderRadius:'50%', background:T.green, opacity:phase>d?1:0.2, transition:'opacity 0.3s' }} />
                ))}
              </div>
            </div>
          )}
          {scanResult && (
            <div style={{ padding:'8px 16px', background:scanResult.found?'rgba(15,168,106,0.2)':'rgba(229,72,58,0.2)', borderRadius:6, border:`1px solid ${scanResult.found?T.green:T.red}` }}>
              <span style={{ fontFamily:F.mono, fontSize:11, color:scanResult.found?T.green:T.red }}>
                {scanResult.found ? `VALID · ${scanResult.cardNum}` : 'NOT FOUND · ' + scanResult.cardNum}
              </span>
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes scanLine{0%{top:20%}50%{top:80%}100%{top:20%}}`}</style>

      {/* Quick scan buttons */}
      <div>
        <div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Demo Scans</div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {Object.keys(RENT_CARDS).concat(['RG-INVALID-00999']).map((num,i) => (
            <button key={i} onClick={() => simulateScan(num)} disabled={scanning}
              className="rg-btn rg-btn-ghost" style={{ fontSize:10, padding:'5px 10px' }}>
              Scan {num.split('-').slice(-1)}
            </button>
          ))}
        </div>
      </div>

      {/* Manual entry */}
      <div style={{ display:'flex', gap:8 }}>
        <input value={manualInput} onChange={e=>setManualInput(e.target.value)} className="rg-input"
          placeholder="Or type card number manually…" style={{ flex:1 }}
          onKeyDown={e => e.key==='Enter' && simulateScan(manualInput)} />
        <button className="rg-btn rg-btn-primary" onClick={() => simulateScan(manualInput)} disabled={!manualInput||scanning}>Verify</button>
      </div>
    </div>
  );
};

// ── INSPECTION PHOTO GALLERY ─────────────────────────────────────────────────
const PhotoGallery = () => {
  const toast = useToast();
  const [selected, setSelected] = useState(null);

  const photos = [
    { id:'P001', case:'RC-2026-ACC-00291', address:'14 Osu Ako-Adjei Ave', desc:'Unit 2A — no rent card posted on door', time:'09:33', officer:'Ofc. Mensah', gps:'5.558°N, 0.187°W', tag:'violation' },
    { id:'P002', case:'RC-2026-ACC-00291', address:'14 Osu Ako-Adjei Ave', desc:'Payment receipt showing 9.5 months advance collected', time:'09:35', officer:'Ofc. Mensah', gps:'5.558°N, 0.187°W', tag:'evidence' },
    { id:'P003', case:'RC-2026-ACC-00291', address:'14 Osu Ako-Adjei Ave', desc:'Tenancy agreement — no Rent Control registration stamp', time:'09:38', officer:'Ofc. Mensah', gps:'5.558°N, 0.187°W', tag:'document' },
    { id:'P004', case:'RC-2026-ACC-00290', address:'22 Dzorwulu Crescent', desc:'Building exterior — 12 units, no rent cards visible on any door', time:'14:11', officer:'Ofc. Amankwa', gps:'5.583°N, 0.204°W', tag:'violation' },
    { id:'P005', case:'RC-2026-ACC-00290', address:'22 Dzorwulu Crescent', desc:'Notice board — no official Rent Control registration notice posted', time:'14:15', officer:'Ofc. Amankwa', gps:'5.583°N, 0.204°W', tag:'violation' },
    { id:'P006', case:'INS-079',          address:'4 Ring Road West',     desc:'Property exterior — compliant. Rent cards on all 4 units.', time:'09:07', officer:'Ofc. Quaye', gps:'5.572°N, 0.220°W', tag:'compliant' },
  ];

  const tagColor = { violation:T.red, evidence:T.amber, document:T.blue, compliant:T.green };

  return (
    <div className="fade-in">
      <SectionHeader title="Evidence Photo Gallery" sub="GPS-stamped · Tamper-logged · Case-linked" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
        {photos.map((p,i) => (
          <div key={i} onClick={() => setSelected(p)} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, overflow:'hidden', cursor:'pointer', transition:'all 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=tagColor[p.tag]}
            onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
            {/* Photo placeholder */}
            <div style={{ height:120, background:`linear-gradient(135deg, ${T.surfaceL} 0%, ${T.card} 100%)`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
              <div style={{ width:40, height:40, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:2, opacity:0.2 }}>
                {[...Array(9)].map((_,j)=><div key={j} style={{ background:T.t2, borderRadius:1 }} />)}
              </div>
              <div style={{ position:'absolute', bottom:6, right:6, fontFamily:F.mono, fontSize:8, color:'rgba(255,255,255,0.4)', background:'rgba(0,0,0,0.5)', padding:'2px 5px', borderRadius:2 }}>{p.time}</div>
              <div style={{ position:'absolute', top:6, left:6 }}>
                <span style={{ fontFamily:F.mono, fontSize:8, fontWeight:700, color:tagColor[p.tag], background:`${tagColor[p.tag]}20`, padding:'2px 6px', borderRadius:2, textTransform:'uppercase', letterSpacing:1 }}>{p.tag}</span>
              </div>
            </div>
            <div style={{ padding:'10px 12px' }}>
              <div style={{ fontFamily:F.mono, fontSize:10, color:T.green, marginBottom:4 }}>{p.case}</div>
              <div style={{ fontSize:12, color:T.t2, lineHeight:1.5 }}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(6px)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}
          onClick={() => setSelected(null)}>
          <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:24, maxWidth:480, width:'100%' }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <div style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{selected.case} · Photo {selected.id}</div>
              <button onClick={() => setSelected(null)} style={{ background:'transparent', border:'none', color:T.t3, fontSize:18, cursor:'pointer' }}>×</button>
            </div>
            <div style={{ height:200, background:T.card, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14, border:`1px solid ${T.border}` }}>
              <span style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>Photo evidence · {selected.id}</span>
            </div>
            <InfoRow label="Description" value={selected.desc} />
            <InfoRow label="Case" value={selected.case} mono />
            <InfoRow label="Property" value={selected.address} />
            <InfoRow label="Officer" value={selected.officer} />
            <InfoRow label="GPS" value={selected.gps} mono />
            <InfoRow label="Captured" value={selected.time} mono />
            <InfoRow label="Classification" value={selected.tag.toUpperCase()} mono color={tagColor[selected.tag]} />
            <div style={{ marginTop:14, display:'flex', gap:8 }}>
              <button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={()=>toast&&toast("Photo downloaded","success")}>↓ Download</button>
              <button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={()=>toast&&toast("Photo attached to case","success")}>Attach to Case</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── SHIFT HANDOVER REPORT ────────────────────────────────────────────────────
const ShiftHandover = () => {
  const toast = useToast();
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const summary = {
    inspections: 3, violations: 5, casesGenerated: 2, casesUpdated: 1,
    photosCaptured: 6, offlineSyncs: 1, routeCompletion: 37.5,
    pendingProperties: ['22 Dzorwulu Crescent (P-003)','19 Spintex Road (P-005)','7 Burma Camp Rd'],
    nextOfficer: 'Ofc. Patricia Asare',
  };

  const submit = () => {
    toast('Shift handover report submitted', 'success');
    setSubmitted(true);
  };

  return (
    <div className="fade-in" style={{ maxWidth:600 }}>
      <SectionHeader title="Shift Handover" sub="End-of-shift summary · Hand off to next officer" />

      <div className="rg-card" style={{ padding:20, marginBottom:16 }}>
        <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:14 }}>Shift Summary — Ofc. Kofi Mensah</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:16 }}>
          {[
            [summary.inspections,'Inspections',T.green],
            [summary.violations,'Violations Found',T.red],
            [summary.casesGenerated,'Cases Generated',T.amber],
            [summary.photosCaptured,'Photos Captured',T.blue],
            [summary.offlineSyncs,'Offline Syncs',T.t2],
            [summary.routeCompletion+'%','Route Complete',T.amber],
          ].map(([v,l,c],i) => (
            <div key={i} style={{ background:T.bg, borderRadius:6, padding:'10px 12px' }}>
              <div style={{ fontFamily:F.mono, fontSize:18, fontWeight:600, color:c }}>{v}</div>
              <div style={{ fontSize:10, color:T.t3, marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Pending Properties (not yet inspected)</div>
          {summary.pendingProperties.map((p,i) => (
            <div key={i} style={{ display:'flex', gap:8, alignItems:'center', padding:'5px 0', borderBottom:`1px solid rgba(36,54,40,0.3)` }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:T.amber, flexShrink:0 }} />
              <span style={{ fontSize:12, color:T.t2 }}>{p}</span>
            </div>
          ))}
        </div>

        <div className="rg-field">
          <label>Handover Notes to {summary.nextOfficer}</label>
          <textarea className="rg-textarea" rows={4} value={notes} onChange={e=>setNotes(e.target.value)}
            placeholder="Any urgent items, landlord contacts made, access issues, or context for next officer…" />
        </div>

        {submitted ? (
          <div style={{ padding:'12px', background:T.greenFade, border:`1px solid rgba(15,168,106,0.2)`, borderRadius:6, fontFamily:F.mono, fontSize:11, color:T.green }}>
            Handover submitted · {summary.nextOfficer} notified by SMS · Shift log archived
          </div>
        ) : (
          <button className="rg-btn rg-btn-primary" onClick={submit}>Submit Handover Report</button>
        )}
      </div>
    </div>
  );
};

// ── LANDLORD TAX SUMMARY ─────────────────────────────────────────────────────
const LandlordTaxSummary = () => {
  const toast = useToast();
  const year = 2025;
  const income = {
    total: 194400, declared: 120000, undeclared: 74400,
    taxRate: 0.08, taxDue: 15552, taxPaid: 9600,
    properties: 3, tenancies: 6,
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Tax & Income Summary"
        sub={`Tax Year ${year} · GRA Reference: GH-TIN-8821-4490`}
        action={<button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={()=>toast('Tax summary downloaded','success')}>↓ Download Statement</button>} />

      <div style={{ padding:'12px 16px', background:'rgba(59,130,246,0.07)', border:'1px solid rgba(59,130,246,0.15)', borderLeft:`3px solid ${T.blue}`, borderRadius:6, marginBottom:20, fontSize:12, color:T.t2, lineHeight:1.7 }}>
        This summary is derived from your registered rent cards and payment records in RentGuard. Your TIN ({income.taxRate*100}% rental income tax rate under the Income Tax Act) is shared with GRA as part of the Rent Taskforce data-sharing mandate.
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:20 }}>
        {[
          ['GH₵ '+(income.total/1000).toFixed(0)+'K','Estimated Annual Income','All 6 registered tenancies',T.lime],
          ['GH₵ '+(income.declared/1000).toFixed(0)+'K','Declared to GRA','Based on tax filings on record',T.green],
          ['GH₵ '+(income.undeclared/1000).toFixed(0)+'K','Potential Undeclared Gap','Reconcile with GRA',T.red],
          ['GH₵ '+(income.taxDue).toLocaleString(),'Estimated Tax Due','At '+income.taxRate*100+'% rental income rate',T.amber],
          ['GH₵ '+(income.taxPaid).toLocaleString(),'Tax Paid (on record)','From GRA receipts filed',T.green],
          ['GH₵ '+(income.taxDue-income.taxPaid).toLocaleString(),'Outstanding Balance','Difference — reconcile with GRA',T.red],
        ].map(([v,l,sub,c],i) => (
          <div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:16 }}>
            <div style={{ fontFamily:F.mono, fontSize:20, fontWeight:600, color:c, marginBottom:4 }}>{v}</div>
            <div style={{ fontSize:12, fontWeight:600, color:T.t1, marginBottom:2 }}>{l}</div>
            <div style={{ fontSize:11, color:T.t3 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div className="rg-card" style={{ padding:20 }}>
        <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:14 }}>Income by Property</div>
        <table className="rg-table">
          <thead><tr><th>Property</th><th>Units</th><th>Monthly Income</th><th>Annual Estimate</th><th>Tax Due</th><th>Registered</th></tr></thead>
          <tbody>
            {LANDLORD_DATA.props.map((p,i) => {
              const monthly = p.units * 1800;
              const annual = monthly * 12;
              return (
                <tr key={i}>
                  <td style={{ fontSize:12, fontWeight:600 }}>{p.address}</td>
                  <td style={{ fontFamily:F.mono, fontSize:12 }}>{p.units}</td>
                  <td style={{ fontFamily:F.mono, fontSize:12 }}>GH₵ {monthly.toLocaleString()}</td>
                  <td style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color:T.lime }}>GH₵ {annual.toLocaleString()}</td>
                  <td style={{ fontFamily:F.mono, fontSize:12, color:T.amber }}>GH₵ {Math.round(annual*0.08).toLocaleString()}</td>
                  <td><span className={`rg-badge ${p.registered?'rg-badge-green':'rg-badge-red'}`}>{p.registered?'Yes':'No'}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding:'12px 14px', background:T.amberFade, border:`1px solid rgba(232,144,10,0.2)`, borderRadius:6, marginTop:14, fontSize:12, color:T.t2, lineHeight:1.7 }}>
          Contact GRA to reconcile any differences between this estimate and your filed returns. Failure to declare rental income is an offence under the Income Tax Act. RentGuard transmits this data monthly.
        </div>
      </div>
    </div>
  );
};

// ── TENANCY RENEWAL FLOW ────────────────────────────────────────────────────
const TenancyRenewal = () => {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ tenant:'', newRent:'', newDuration:'12', newAdvance:'' });
  const upd = (k,v) => setForm(p=>({...p,[k]:v}));

  const tenancies = TENANTS_DATA.map(t => ({
    ...t,
    expiry: '2026-10-31',
    daysLeft: 229,
  }));

  const [selected, setSelected] = useState(null);

  if (!selected) return (
    <div className="fade-in">
      <SectionHeader title="Tenancy Renewal" sub="Manage upcoming expirations and issue renewal agreements" />
      <div className="rg-card" style={{ padding:0, marginBottom:16 }}>
        <div style={{ padding:'12px 18px', borderBottom:`1px solid ${T.border}` }}>
          <span style={{ fontFamily:F.head, fontSize:13, fontWeight:700 }}>Upcoming Expirations</span>
        </div>
        <table className="rg-table">
          <thead><tr><th>Tenant</th><th>Property</th><th>Expires</th><th>Days Left</th><th>Current Rent</th><th>Action</th></tr></thead>
          <tbody>
            {tenancies.map((t,i) => (
              <tr key={i}>
                <td style={{ fontSize:13, fontWeight:600 }}>{t.name}</td>
                <td style={{ fontSize:12, color:T.t2 }}>{t.property} · {t.unit}</td>
                <td style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{t.expiry}</td>
                <td>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:50, height:4, background:T.border, borderRadius:2, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${Math.min(100,t.daysLeft/365*100)}%`, background:t.daysLeft<60?T.amber:T.green, borderRadius:2 }} />
                    </div>
                    <span style={{ fontFamily:F.mono, fontSize:11, color:t.daysLeft<60?T.amber:T.green }}>{t.daysLeft}d</span>
                  </div>
                </td>
                <td style={{ fontFamily:F.mono, fontSize:12 }}>GH₵ {t.rent?.toLocaleString()|| '1,800'}</td>
                <td><button className="rg-btn rg-btn-primary" style={{ fontSize:11 }} onClick={()=>setSelected(t)}>Renew →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const capMonths = 6;
  const newAdvanceMonths = form.newRent && form.newAdvance ? (parseFloat(form.newAdvance)/parseFloat(form.newRent)).toFixed(1) : null;
  const overCap = newAdvanceMonths && parseFloat(newAdvanceMonths) > capMonths;

  const steps = ['New Terms','Advance Check','Issue Agreement'];

  return (
    <div className="fade-in" style={{ maxWidth:520 }}>
      <button onClick={()=>setSelected(null)} className="rg-btn rg-btn-ghost" style={{ fontSize:11, marginBottom:16 }}>← Back to Tenancies</button>
      <div style={{ fontFamily:F.head, fontSize:18, fontWeight:700, marginBottom:4 }}>Renew Tenancy — {selected.name}</div>
      <div style={{ fontSize:12, color:T.t2, marginBottom:20 }}>{selected.property} · {selected.unit}</div>

      <div style={{ display:'flex', gap:0, marginBottom:24 }}>
        {steps.map((s,i) => (
          <div key={i} style={{ flex:1 }}>
            <div style={{ height:3, background:i<=step?T.green:T.border, marginRight:i<2?8:0, transition:'background 0.3s' }} />
            <div style={{ fontFamily:F.mono, fontSize:9, color:i<=step?T.green:T.t3, marginTop:5, letterSpacing:1 }}>{String(i+1).padStart(2,'0')} {s.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <div className="rg-card" style={{ padding:20 }}>
        {step === 0 && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <div className="rg-field">
                <label>New Monthly Rent (GH₵)</label>
                <input type="number" className="rg-input" value={form.newRent} onChange={e=>upd('newRent',e.target.value)} placeholder="e.g. 2000" />
              </div>
              <div className="rg-field">
                <label>Duration (months)</label>
                <select className="rg-select" value={form.newDuration} onChange={e=>upd('newDuration',e.target.value)}>
                  {[6,12,18,24].map(d=><option key={d} value={d}>{d} months</option>)}
                </select>
              </div>
            </div>
            <button className="rg-btn rg-btn-primary" disabled={!form.newRent} onClick={()=>setStep(1)}>Continue →</button>
          </>
        )}
        {step === 1 && (
          <>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:14 }}>Advance Rent Check · New Terms</div>
            <div className="rg-field">
              <label>Advance to Collect (GH₵)</label>
              <input type="number" className="rg-input" value={form.newAdvance} onChange={e=>upd('newAdvance',e.target.value)} placeholder="Max: GH₵ " />
              <div style={{ fontSize:10, color:T.t3, marginTop:4 }}>Legal max: {capMonths} × GH₵ {form.newRent} = GH₵ {(capMonths*parseFloat(form.newRent||0)).toLocaleString()}</div>
            </div>
            {newAdvanceMonths && (
              <div style={{ padding:'12px 14px', background:overCap?T.redFade:T.greenFade, border:`2px solid ${overCap?'rgba(229,72,58,0.25)':'rgba(15,168,106,0.2)'}`, borderRadius:6, marginBottom:14 }}>
                <div style={{ fontFamily:F.mono, fontSize:18, fontWeight:700, color:overCap?T.red:T.green }}>{newAdvanceMonths} months</div>
                <div style={{ fontSize:12, color:overCap?T.red:T.green, marginTop:3 }}>{overCap?'ILLEGAL — exceeds cap':'LEGAL — within cap'}</div>
              </div>
            )}
            <div style={{ display:'flex', gap:8 }}>
              <button className="rg-btn rg-btn-ghost" onClick={()=>setStep(0)}>← Back</button>
              <button className="rg-btn rg-btn-primary" disabled={overCap||!form.newAdvance} onClick={()=>setStep(2)}>Continue →</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:14 }}>Renewal Summary</div>
            {[['Tenant',selected.name],['Property',selected.property+' · '+selected.unit],['New Monthly Rent','GH₵ '+(parseFloat(form.newRent||0)).toLocaleString()],['Duration',form.newDuration+' months'],['Advance Collected','GH₵ '+(parseFloat(form.newAdvance||0)).toLocaleString()+' ('+newAdvanceMonths+' months)'],['New Expiry','2027-'+(3+parseInt(form.newDuration/12))?.toString().padStart(2,'0')+'-31']].map(([l,v],i)=>(<InfoRow key={i} label={l} value={v} />))}
            <div style={{ marginTop:14, display:'flex', gap:8 }}>
              <button className="rg-btn rg-btn-primary" onClick={()=>{toast(`Renewal agreement issued for ${selected.name}`,'success');setSelected(null);setStep(0);}}>Issue Renewal Agreement</button>
              <button className="rg-btn rg-btn-ghost" onClick={()=>setStep(1)}>← Back</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── DOCUMENT UPLOAD ──────────────────────────────────────────────────────────
const DocumentUpload = () => {
  const toast = useToast();
  const [uploads, setUploads] = useState([
    { id:'DOC-001', name:'Tenancy Agreement — Abena Sarpong.pdf', size:'245 KB', type:'agreement', status:'verified', uploaded:'2025-11-01', tenancy:'T-001' },
    { id:'DOC-002', name:'Tenancy Agreement — Yaw Frimpong.pdf',  size:'238 KB', type:'agreement', status:'pending',  uploaded:'2025-11-01', tenancy:'T-002' },
    { id:'DOC-003', name:'Property Registration Certificate.pdf',  size:'1.2 MB', type:'registration', status:'verified', uploaded:'2024-08-15', tenancy:'—' },
  ]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const simulateUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploads(prev => [...prev, {
        id:'DOC-00'+(prev.length+1), name:'New Document '+Date.now()+'.pdf',
        size:'312 KB', type:'agreement', status:'processing', uploaded:new Date().toLocaleDateString('en-GH'), tenancy:'T-00'+(prev.length+1)
      }]);
      setUploading(false);
      toast('Document uploaded — pending verification', 'success');
    }, 1400);
  };

  return (
    <div className="fade-in">
      <SectionHeader title="Document Management" sub="Tenancy agreements · Registration certificates · Evidence" />
      {/* Drop zone */}
      <div
        onDragEnter={()=>setDragging(true)} onDragLeave={()=>setDragging(false)} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();setDragging(false);simulateUpload();}}
        onClick={simulateUpload}
        style={{ border:`2px dashed ${dragging?T.green:T.border}`, borderRadius:10, padding:'28px 20px', textAlign:'center', marginBottom:20, cursor:'pointer', transition:'all 0.2s', background:dragging?T.greenFade:'transparent' }}>
        <div style={{ fontFamily:F.mono, fontSize:11, color:dragging?T.green:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:6 }}>
          {uploading ? 'Uploading…' : dragging ? 'Drop to upload' : '↑ Drop files or click to upload'}
        </div>
        <div style={{ fontSize:12, color:T.t3 }}>PDF, JPG, PNG · Max 10MB per file</div>
      </div>

      <div className="rg-card" style={{ padding:0 }}>
        <table className="rg-table">
          <thead><tr><th>Document</th><th>Type</th><th>Size</th><th>Tenancy</th><th>Uploaded</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {uploads.map((d,i) => (
              <tr key={i}>
                <td style={{ fontSize:12, fontWeight:600, color:T.t1, maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.name}</td>
                <td><span style={{ fontFamily:F.mono, fontSize:10, color:T.t2 }}>{d.type}</span></td>
                <td style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{d.size}</td>
                <td style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{d.tenancy}</td>
                <td style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{d.uploaded}</td>
                <td><span className={`rg-badge ${d.status==='verified'?'rg-badge-green':d.status==='pending'?'rg-badge-amber':'rg-badge-muted'}`}>{d.status}</span></td>
                <td><div style={{ display:'flex', gap:5 }}><button className="rg-btn rg-btn-ghost" style={{ fontSize:10, padding:'3px 7px' }} onClick={()=>toast('Downloading…','info')}>↓</button><button className="rg-btn rg-btn-ghost" style={{ fontSize:10, padding:'3px 7px', color:T.red }} onClick={()=>setUploads(prev=>prev.filter((_,j)=>j!==i))}>×</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// STEP 4 — TENANT DEPTH + RECEIPT + LEGAL AID + EVICTION ALERT
// ═══════════════════════════════════════════════════════════════════════════

// ── COMPLAINT TRACKER ───────────────────────────────────────────────────────
const ComplaintTracker = () => {
  const myComplaints = [
    {
      id:'RC-2026-ACC-00291', type:'Illegal Advance Rent', filed:'2026-03-10', status:'under_investigation',
      updates:[
        { date:'2026-03-10 14:22', msg:'Your complaint was received and logged. Case ID assigned.', type:'system' },
        { date:'2026-03-10 15:04', msg:'Severity confirmed as CRITICAL. Case assigned to Ofc. Kofi Mensah for field inspection.', type:'action' },
        { date:'2026-03-11 09:15', msg:'Officer visited property. Landlord contacted. Dispute noted. Formal notice being prepared.', type:'update' },
        { date:'2026-03-12 11:30', msg:'Landlord\'s "deposit" argument reviewed — not valid under Act 220. Formal notice being issued.', type:'update' },
      ]
    }
  ];

  const statusSteps = ['received','under_investigation','notice_issued','referred_to_court','resolved'];
  const statusColors = { system:T.t3, action:T.green, update:T.amber };

  return (
    <div className="fade-in" style={{ maxWidth:640 }}>
      <SectionHeader title="My Complaints" sub="Track the status of your filed complaints in real time" />
      {myComplaints.map((c,ci) => {
        const curStep = statusSteps.indexOf(c.status);
        return (
          <div key={ci} className="rg-card" style={{ padding:0, marginBottom:16, overflow:'hidden' }}>
            {/* Header */}
            <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.border}`, background:T.surfaceL }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div>
                  <div style={{ fontFamily:F.mono, fontSize:11, color:T.green, marginBottom:4 }}>{c.id}</div>
                  <div style={{ fontFamily:F.head, fontSize:16, fontWeight:700 }}>{caseTypeLabel(c.type)}</div>
                  <div style={{ fontSize:12, color:T.t2, marginTop:2 }}>Filed {c.filed}</div>
                </div>
                <span className="rg-badge rg-badge-amber">{statusLabel(c.status)}</span>
              </div>
            </div>

            {/* Progress steps */}
            <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.border}` }}>
              <div style={{ display:'flex', alignItems:'center', overflowX:'auto' }}>
                {statusSteps.map((s,i) => {
                  const done = i <= curStep;
                  const current = i === curStep;
                  return (
                    <div key={s} style={{ display:'flex', alignItems:'center', flexShrink:0 }}>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                        <div style={{ width:24, height:24, borderRadius:'50%', background:done?T.green:T.border, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:current?`0 0 0 3px rgba(15,168,106,0.25)`:undefined, transition:'all 0.3s' }}>
                          {done && <span style={{ fontSize:10, color:'#fff' }}>✓</span>}
                        </div>
                        <span style={{ fontSize:8, fontWeight:700, color:done?T.green:T.t3, letterSpacing:0.5, textTransform:'uppercase', textAlign:'center', maxWidth:64, lineHeight:1.3 }}>{s.replace(/_/g,' ')}</span>
                      </div>
                      {i<statusSteps.length-1 && <div style={{ width:32, height:2, background:i<curStep?T.green:T.border, margin:'0 4px 18px', transition:'background 0.3s' }} />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ padding:'16px 20px' }}>
              <div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>Activity Timeline</div>
              {c.updates.map((u,i) => (
                <div key={i} style={{ display:'flex', gap:12, marginBottom:12 }}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:statusColors[u.type], marginTop:3 }} />
                    {i<c.updates.length-1&&<div style={{ width:1, flex:1, background:T.border, marginTop:4 }} />}
                  </div>
                  <div style={{ flex:1, paddingBottom:i<c.updates.length-1?8:0 }}>
                    <div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, marginBottom:4 }}>{u.date}</div>
                    <div style={{ fontSize:12, color:T.t2, lineHeight:1.65 }}>{u.msg}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── PAYMENT RECEIPT ──────────────────────────────────────────────────────────
const PaymentReceipt = () => {
  const toast = useToast();
  const receipts = [
    { id:'REC-2026-001', date:'2026-03-01', amount:1800, method:'MTN MoMo', ref:'MTN-2291AA-001', period:'March 2026', landlord:'K. Boateng', property:'14 Osu Ako-Adjei Ave · Unit 2A', card:'RG-2025-ACC-00123', hashift:'a3f7b2c9...', status:'verified' },
    { id:'REC-2026-002', date:'2026-02-01', amount:1800, method:'MTN MoMo', ref:'MTN-2291AA-002', period:'February 2026', landlord:'K. Boateng', property:'14 Osu Ako-Adjei Ave · Unit 2A', card:'RG-2025-ACC-00123', hashift:'c91d44e7...', status:'verified' },
    { id:'REC-2025-ADV', date:'2025-11-01', amount:16200, method:'Bank Transfer', ref:'GCB-771234', period:'Nov 2025 – Jul 2026 (advance)', landlord:'K. Boateng', property:'14 Osu Ako-Adjei Ave · Unit 2A', card:'RG-2025-ACC-00123', hashift:'f44ab1d3...', status:'flagged' },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div className="fade-in">
      <SectionHeader title="My Payment Receipts" sub="Verified · Tamper-logged · Court-admissible" />

      {selected ? (
        <div className="slide-up" style={{ maxWidth:460 }}>
          <button onClick={()=>setSelected(null)} className="rg-btn rg-btn-ghost" style={{ fontSize:11, marginBottom:16 }}>← All Receipts</button>

          {/* Receipt card */}
          <div style={{ background:T.card, border:`2px solid ${selected.status==='flagged'?T.red:T.green}`, borderRadius:10, padding:0, overflow:'hidden' }}>
            <div style={{ background:T.surfaceL, padding:'14px 20px', borderBottom:`1px solid ${T.border}` }}>
              <div style={{ fontFamily:F.mono, fontSize:9, color:T.green, letterSpacing:2, textTransform:'uppercase', marginBottom:4 }}>Ghana Rent Control · Official Receipt</div>
              <div style={{ fontFamily:F.head, fontSize:20, fontWeight:700 }}>{selected.id}</div>
              {selected.status === 'flagged' && (
                <div style={{ marginTop:6, fontFamily:F.mono, fontSize:9, color:T.red, letterSpacing:1, textTransform:'uppercase' }}>
                  Advance payment exceeds 6-month legal cap
                </div>
              )}
            </div>
            <div style={{ padding:'16px 20px' }}>
              {[
                ['Date', selected.date],
                ['Amount', 'GH₵ '+selected.amount.toLocaleString()],
                ['Period', selected.period],
                ['Method', selected.method],
                ['Reference', selected.ref],
                ['Property', selected.property],
                ['Landlord', selected.landlord],
                ['Rent Card', selected.card],
              ].map(([l,v],i) => <InfoRow key={i} label={l} value={v} mono={['Reference','Rent Card','Amount'].includes(l)} />)}
              <div style={{ marginTop:14, padding:'10px 12px', background:T.bg, borderRadius:5, border:`1px solid ${T.border}` }}>
                <div style={{ fontFamily:F.mono, fontSize:8, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:4 }}>Entry Hash (SHA-256)</div>
                <div style={{ fontFamily:F.mono, fontSize:11, color:T.t2, wordBreak:'break-all' }}>{selected.hash}</div>
              </div>
            </div>
            <div style={{ padding:'12px 20px', borderTop:`1px solid ${T.border}`, display:'flex', gap:8 }}>
              <button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={()=>toast('Receipt downloaded','success')} onClick={()=>toast&&toast("PDF downloaded","success")}>↓ Download PDF</button>
              <button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={()=>toast('Sent to your email','info')}>Send to Email</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rg-card" style={{ padding:0 }}>
          <table className="rg-table rg-table-clickable">
            <thead><tr><th>Receipt ID</th><th>Date</th><th>Amount</th><th>Period</th><th>Method</th><th>Status</th></tr></thead>
            <tbody>
              {receipts.map((r,i) => (
                <tr key={i} onClick={()=>setSelected(r)}>
                  <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{r.id}</span></td>
                  <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{r.date}</span></td>
                  <td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700 }}>GH₵ {r.amount.toLocaleString()}</span></td>
                  <td style={{ fontSize:12, color:r.status==='flagged'?T.red:T.t2 }}>{r.period}</td>
                  <td style={{ fontSize:12, color:T.t2 }}>{r.method}</td>
                  <td><span className={`rg-badge ${r.status==='verified'?'rg-badge-green':'rg-badge-red'}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ── EVICTION ALERT + LEGAL AID ──────────────────────────────────────────────
const EvictionAndLegalAid = () => {
  const toast = useToast();
  const [alertFiled, setAlertFiled] = useState(false);
  const [alertType, setAlertType]   = useState('');

  const legalAid = [
    { org:'Rent Control Department', service:'Free mediation and dispute resolution', contact:'0302-664-000', hours:'Mon–Fri 8AM–5PM', type:'government' },
    { org:'Legal Aid Commission', service:'Free legal representation for low-income tenants', contact:'0302-664-000', hours:'Mon–Fri 8AM–5PM', type:'government' },
    { org:'Ghana Bar Association', service:'Referral to pro-bono property lawyers', contact:'0302-664-000', hours:'Mon–Fri 9AM–4PM', type:'private' },
    { org:'National Tenants Union of Ghana', service:'Tenant rights advocacy and advice', contact:'0244-315-500', hours:'Mon–Sat 8AM–6PM', type:'ngo' },
    { org:'CHRAJ Ghana', service:'Human rights complaints including unlawful eviction', contact:'0302-664-000', hours:'Mon–Fri 8AM–5PM', type:'government' },
  ];

  const orgColor = { government:T.green, private:T.blue, ngo:T.amber };

  return (
    <div className="fade-in">
      <SectionHeader title="Eviction Protection & Legal Aid" sub="Your rights · Emergency alert · Free legal resources" />

      {/* Emergency alert banner */}
      <div style={{ padding:'16px 20px', background:T.redFade, border:`1px solid rgba(229,72,58,0.3)`, borderLeft:`4px solid ${T.red}`, borderRadius:8, marginBottom:20 }}>
        <div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, color:T.red, marginBottom:6 }}>Are you facing unlawful eviction?</div>
        <div style={{ fontSize:13, color:T.t2, lineHeight:1.7, marginBottom:14 }}>
          Your landlord CANNOT evict you without: (1) a valid legal ground, (2) written notice, and (3) a Rent and Housing Committee order. Lock-outs, removing your belongings, cutting utilities, or threatening you are all illegal under Act 220 s.18.
        </div>
        {alertFiled ? (
          <div style={{ padding:'12px 14px', background:'rgba(15,168,106,0.1)', border:`1px solid rgba(15,168,106,0.25)`, borderRadius:6 }}>
            <div style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:T.green, marginBottom:4 }}>EMERGENCY ALERT SENT</div>
            <div style={{ fontSize:12, color:T.t2 }}>Rent Control emergency line notified. An officer will contact you within 2 hours. Reference: EVA-2026-00044</div>
          </div>
        ) : (
          <>
            <div style={{ display:'flex', gap:8, marginBottom:10, flexWrap:'wrap' }}>
              {['Lock-out / door blocked','Belongings removed','Utilities cut','Physical threats','Court order served'].map(t => (
                <div key={t} onClick={()=>setAlertType(t)} style={{ padding:'7px 12px', borderRadius:20, cursor:'pointer', fontSize:12, transition:'all 0.15s',
                  background:alertType===t?T.redFade:'transparent', border:`1px solid ${alertType===t?T.red:T.border}`, color:alertType===t?T.red:T.t2 }}>{t}</div>
              ))}
            </div>
            <button className="rg-btn rg-btn-danger" disabled={!alertType} onClick={()=>{setAlertFiled(true);toast('Emergency alert sent to Rent Control','error');}}>
              File Emergency Eviction Alert →
            </button>
            <div style={{ fontSize:11, color:T.t3, marginTop:8 }}>Hotline: 0302-664-000 · or dial *714*1# → Emergency line</div>
          </>
        )}
      </div>

      {/* Unlawful eviction — what's legal */}
      <div className="rg-card" style={{ padding:20, marginBottom:16 }}>
        <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:14 }}>Valid Grounds for Eviction Under Act 220</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[
            { ground:'Non-payment of rent', detail:'Typically 1+ month arrears. Must be documented. Formal notice required.', valid:true },
            { ground:'Breach of agreement', detail:'Tenant violated specific written terms of the tenancy agreement.', valid:true },
            { ground:'Landlord personal use', detail:'Landlord genuinely needs the property for personal occupation. Months of notice required.', valid:true },
            { ground:'Redevelopment', detail:'Property must be vacated for approved construction. Compensation may apply.', valid:true },
            { ground:'Because tenant complained', detail:'Retaliation eviction for filing a complaint is ILLEGAL under Act 220.', valid:false },
            { ground:'Without any notice', detail:'All evictions require written notice and committee process. Lock-outs are criminal.', valid:false },
          ].map((item,i) => (
            <div key={i} style={{ padding:'12px 14px', background:item.valid?'rgba(15,168,106,0.05)':'rgba(229,72,58,0.06)', border:`1px solid ${item.valid?'rgba(15,168,106,0.15)':'rgba(229,72,58,0.15)'}`, borderRadius:6 }}>
              <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:5 }}>
                <span style={{ fontSize:12, color:item.valid?T.green:T.red }}>{item.valid?'✓':'✗'}</span>
                <span style={{ fontSize:12, fontWeight:700, color:item.valid?T.green:T.red }}>{item.valid?'VALID':'ILLEGAL'}</span>
              </div>
              <div style={{ fontSize:12, fontWeight:600, color:T.t1, marginBottom:3 }}>{item.ground}</div>
              <div style={{ fontSize:11, color:T.t2, lineHeight:1.5 }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal aid directory */}
      <div>
        <div style={{ fontFamily:F.head, fontSize:15, fontWeight:700, marginBottom:14 }}>Free Legal Aid in Ghana</div>
        {legalAid.map((org,i) => (
          <div key={i} className="rg-card" style={{ padding:16, marginBottom:10, borderLeft:`3px solid ${orgColor[org.type]}` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div style={{ flex:1, paddingRight:12 }}>
                <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:3 }}>{org.org}</div>
                <div style={{ fontSize:12, color:T.t2, marginBottom:6 }}>{org.service}</div>
                <div style={{ display:'flex', gap:16 }}>
                  <span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{org.contact}</span>
                  <span style={{ fontSize:11, color:T.t3 }}>{org.hours}</span>
                </div>
              </div>
              <button className="rg-btn rg-btn-ghost" style={{ fontSize:11, flexShrink:0 }}
                onClick={()=>toast(`Calling ${org.org}…`,'info')}>Call Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── NOTIFICATION CENTRE (tenant) ─────────────────────────────────────────────
const NotificationCentre = () => {
  const [notifs, setNotifs] = useState([
    { id:1, title:'Case Update — RC-2026-ACC-00291', body:'Officer Mensah visited your property. Notice being prepared.', time:'2 hours ago', read:false, type:'case' },
    { id:2, title:'Advance Violation Confirmed', body:'Your complaint about excess advance rent has been confirmed as a violation. Refund process initiated.', time:'Yesterday', read:false, type:'alert' },
    { id:3, title:'Rent Card Verified', body:'Your Rent Card RG-2025-ACC-00123 was verified by Rent Control. Record is clean.', time:'3 days ago', read:true, type:'info' },
    { id:4, title:'Know Your Rights Reminder', body:'April 1 is the Rent Card mandate deadline. Demand your card if your landlord hasn\'t issued one.', time:'1 week ago', read:true, type:'info' },
  ]);

  const unread = notifs.filter(n=>!n.read).length;
  const typeColor = { case:T.amber, alert:T.red, info:T.blue };

  return (
    <div className="fade-in" style={{ maxWidth:520 }}>
      <SectionHeader title="Notifications" sub={`${unread} unread`} action={<button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={()=>setNotifs(p=>p.map(n=>({...n,read:true})))}>Mark all read</button>} />
      {notifs.map((n,i) => (
        <div key={n.id} onClick={()=>setNotifs(p=>p.map(x=>x.id===n.id?{...x,read:true}:x))}
          style={{ display:'flex', gap:12, padding:'14px 0', borderBottom:i<notifs.length-1?`1px solid ${T.border}`:'none', cursor:'pointer', opacity:n.read?0.6:1, transition:'opacity 0.2s' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, flexShrink:0 }}>
            <div style={{ width:9, height:9, borderRadius:'50%', background:n.read?T.border:typeColor[n.type] }} />
            {i<notifs.length-1 && <div style={{ width:1, flex:1, background:T.border }} />}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
              <div style={{ fontSize:13, fontWeight:n.read?400:700, color:T.t1 }}>{n.title}</div>
              <span style={{ fontFamily:F.mono, fontSize:10, color:T.t3, flexShrink:0, marginLeft:10 }}>{n.time}</span>
            </div>
            <div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>{n.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};



const OfficerMap = () => {
  const [hovered, setHovered] = useState(null);

  // Simplified visual grid map of Ayawaso East district
  const cells = [
    { id:'P-003', label:'22 Dzorwulu', risk:96, x:2, y:1, violations:4 },
    { id:'P-001', label:'14 Osu Ako-Adjei', risk:87, x:4, y:2, violations:3 },
    { id:'P-005', label:'19 Spintex Rd', risk:73, x:6, y:1, violations:2 },
    { id:'P-002', label:'7 Labone Close', risk:42, x:3, y:3, violations:1 },
    { id:'P-004', label:'4 Ring Rd West', risk:12, x:5, y:4, violations:0 },
  ];

  const col = (risk) => risk >= 70 ? '#E5483A' : risk >= 40 ? '#E8900A' : '#0FA86A';

  return (
    <div style={{ padding:14, height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Ayawaso East · Route Map · {cells.length} properties</div>

      {/* Visual map grid */}
      <div style={{ flex:1, background:'#0B1210', borderRadius:8, border:'1px solid #243628', position:'relative', overflow:'hidden', minHeight:280 }}>
        {/* Grid lines */}
        {[...Array(6)].map((_,i) => (
          <div key={i} style={{ position:'absolute', top:0, bottom:0, left:`${(i+1)*14.28}%`, borderLeft:'1px solid rgba(36,54,40,0.3)' }} />
        ))}
        {[...Array(5)].map((_,i) => (
          <div key={i} style={{ position:'absolute', left:0, right:0, top:`${(i+1)*20}%`, borderTop:'1px solid rgba(36,54,40,0.3)' }} />
        ))}

        {/* District label */}
        <div style={{ position:'absolute', top:8, left:10, fontFamily:'"JetBrains Mono",monospace', fontSize:8, color:'rgba(255,255,255,0.12)', letterSpacing:2, textTransform:'uppercase' }}>AYAWASO EAST MMDA</div>

        {/* Property markers */}
        {cells.map((cell, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(cell)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position:'absolute',
              left:`${cell.x * 13 + 5}%`,
              top:`${cell.y * 18 + 5}%`,
              display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              cursor:'pointer', zIndex:2,
            }}>
            {/* Pulse ring for high risk */}
            {cell.risk >= 70 && (
              <div style={{ position:'absolute', width:28, height:28, borderRadius:'50%', border:`2px solid ${col(cell.risk)}`, opacity:0.3, animation:'pulse 2s infinite' }} />
            )}
            <div style={{
              width:20, height:20, borderRadius:'50%',
              background:col(cell.risk),
              border:`2px solid ${hovered?.id===cell.id?'#fff':col(cell.risk)}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'"JetBrains Mono",monospace', fontSize:9, fontWeight:700, color:'#fff',
              boxShadow:`0 0 12px ${col(cell.risk)}44`,
              transition:'all 0.15s',
            }}>{cell.risk}</div>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:7, color:'rgba(255,255,255,0.5)', letterSpacing:0.5, textAlign:'center', maxWidth:60, lineHeight:1.3 }}>{cell.label}</div>
          </div>
        ))}

        {/* Officer position */}
        <div style={{ position:'absolute', left:'32%', top:'55%', display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
          <div style={{ width:14, height:14, borderRadius:'50%', background:'#C8E830', border:'2px solid #fff', boxShadow:'0 0 10px #C8E83066' }} className="pulse" />
          <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:7, color:'#C8E830', letterSpacing:1 }}>YOU</div>
        </div>

        {/* Tooltip */}
        {hovered && (
          <div style={{ position:'absolute', bottom:10, left:'50%', transform:'translateX(-50%)', background:'#111916', border:`1px solid ${col(hovered.risk)}`, borderRadius:6, padding:'8px 12px', zIndex:10, whiteSpace:'nowrap' }}>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:col(hovered.risk), fontWeight:700 }}>{hovered.id} · RISK {hovered.risk}</div>
            <div style={{ fontSize:11, color:'#8FA898', marginTop:2 }}>{hovered.label}</div>
            <div style={{ fontSize:10, color:hovered.violations>0?'#E5483A':'#0FA86A', marginTop:2 }}>{hovered.violations} violation{hovered.violations!==1?'s':''} on file</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display:'flex', gap:16, marginTop:10, justifyContent:'center' }}>
        {[['#E5483A','High risk (70–100)'],['#E8900A','Medium (40–69)'],['#0FA86A','Low (0–39)'],['#C8E830','Your position']].map(([c,l],i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:5 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:c, flexShrink:0 }} />
            <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#536358' }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Priority list */}
      <div style={{ marginTop:10 }}>
        <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Priority Route</div>
        {[...cells].sort((a,b) => b.risk - a.risk).map((c,i) => (
          <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:'1px solid rgba(36,54,40,0.3)' }}>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#536358' }}>{String(i+1).padStart(2,'0')}</div>
              <span style={{ fontSize:11, color:'#E8F0EB' }}>{c.label}</span>
            </div>
            <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, fontWeight:700, color:col(c.risk) }}>{c.risk}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── USSD SIMULATOR ─────────────────────────────────────────────────────────
const USSDSimulator = () => {
  const [step, setStep] = useState('idle');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [cardNum, setCardNum] = useState('');

  const SCREEN = {
    idle: { text: 'Dial *714*1# to start', prompt: null },
    main: {
      text: 'CON Ghana Rent Control\n\n1. Verify Rent Card\n2. File Complaint\n3. Check Landlord\n4. My Rights',
      prompt: 'Enter option:'
    },
    verify_prompt: {
      text: 'CON Enter your Rent Card number\n(e.g. RG-2025-ACC-00123)',
      prompt: 'Card number:'
    },
    verify_result_ok: {
      text: `END RENT CARD VERIFIED\n\nCard: RG-2025-ACC-00123\nAddress: 14 Osu Ako-Adjei Ave\nRent: GHS 1,800/month\nStatus: ACTIVE\n\nAdvance limit: 6 months\nAdvance compliant: NO — VIOLATION\n\nReport: Dial *714*1# > Option 2`,
      prompt: null
    },
    verify_result_fail: {
      text: 'END CARD NOT FOUND\n\nThis number is not in the\nRent Control registry.\n\nYour landlord may not have\ncomplied with PNDCL 138 s.5.\n\nReport: Dial *714*1# > Option 2\nHotline: 0302-664-000',
      prompt: null
    },
    complaint_type: {
      text: 'CON Select violation type:\n\n1. Excess advance payment\n2. No rent card given\n3. No tenancy agreement\n4. Unlawful eviction\n5. Other',
      prompt: 'Enter option:'
    },
    complaint_address: {
      text: 'CON Enter property address\nor digital property address:',
      prompt: 'Address:'
    },
    complaint_desc: {
      text: 'CON Describe the problem\n(max 100 characters):',
      prompt: 'Description:'
    },
    complaint_done: {
      text: 'END COMPLAINT FILED\n\nCase ID: RC-2026-ACC-00293\n\nA Rent Control officer will\ncontact you within 48 hours.\n\nUpdates sent by SMS.\nHotline: 0302-664-000',
      prompt: null
    },
    rights: {
      text: 'END YOUR RIGHTS:\n\n• Max 6 months advance rent\n  (Act 220 s.16)\n• Right to written agreement\n  (PNDCL 138 s.4)\n• Right to Rent Card\n  (Act 220 s.20; PNDCL 138 s.5)\n• Protected from eviction\n  without due process\n\nHotline: 0302-664-000',
      prompt: null
    },
  };

  const transitions = {
    idle: (val) => { if (val === '*714*1#') return 'main'; return null; },
    main: (val) => ({ '1':'verify_prompt','2':'complaint_type','3':'verify_prompt','4':'rights' })[val] || null,
    verify_prompt: (val) => {
      setCardNum(val.toUpperCase());
      return RENT_CARDS[val.toUpperCase()] ? 'verify_result_ok' : 'verify_result_fail';
    },
    complaint_type: (val) => ['1','2','3','4','5'].includes(val) ? 'complaint_address' : null,
    complaint_address: () => 'complaint_desc',
    complaint_desc: () => 'complaint_done',
  };

  const submit = () => {
    if (!input.trim()) return;
    const next = transitions[step]?.(input.trim());
    if (!next) return;
    setHistory(h => [...h, { screen: step, input: input.trim() }]);
    setStep(next);
    setInput('');
  };

  const reset = () => { setStep('idle'); setInput(''); setHistory([]); setCardNum(''); };
  const cur = SCREEN[step];
  const isEnd = cur?.text?.startsWith('END');
  const isIdle = step === 'idle';

  return (
    <div style={{ padding:14, display:'flex', flexDirection:'column', height:'100%' }}>
      <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>
        USSD Simulator · *714*1# · Africa's Talking Gateway
      </div>

      {/* Phone display */}
      <div style={{ flex:1, background:'#0B1210', borderRadius:8, border:'1px solid #243628', padding:'16px 14px', display:'flex', flexDirection:'column' }}>
        {/* Session trail */}
        {history.map((h,i) => (
          <div key={i} style={{ marginBottom:8, opacity:0.4 }}>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#536358', lineHeight:1.6, whiteSpace:'pre-wrap' }}>{SCREEN[h.screen]?.text?.split('\n').slice(0,2).join('\n')}</div>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#0FA86A', marginTop:3 }}>→ {h.input}</div>
          </div>
        ))}

        {/* Current screen */}
        <div style={{ flex:1 }}>
          {isIdle ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:12 }}>
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:22, color:'#243628' }}>*714*1#</div>
              <div style={{ fontSize:12, color:'#536358', textAlign:'center', lineHeight:1.6 }}>Type the USSD code below to start a session</div>
            </div>
          ) : (
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:isEnd?'#0FA86A':'#E8F0EB', lineHeight:1.9, whiteSpace:'pre-wrap' }}>{cur.text}</div>
          )}
        </div>

        {/* Input row */}
        <div style={{ borderTop:'1px solid #243628', paddingTop:10, marginTop:10 }}>
          {isEnd || !cur?.prompt ? (
            <button onClick={reset} style={{ width:'100%', background:'transparent', border:'1px solid #243628', borderRadius:4, padding:'8px', fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#536358', cursor:'pointer', letterSpacing:1 }}>
              END SESSION · Dial again
            </button>
          ) : (
            <div style={{ display:'flex', gap:6 }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && submit()}
                placeholder={cur.prompt}
                className="rg-input" style={{ flex:1, background:'#111916', fontFamily:'"JetBrains Mono",monospace', fontSize:11 }} />
              <button onClick={submit} style={{ background:'#0FA86A', color:'#fff', border:'none', borderRadius:4, padding:'0 14px', fontFamily:'"JetBrains Mono",monospace', fontSize:11, fontWeight:700, cursor:'pointer' }}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick-dial shortcuts */}
      <div style={{ marginTop:10 }}>
        <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:6 }}>Quick demo paths</div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {[
            ['Verify Valid Card', () => { reset(); setTimeout(()=>{ setStep('verify_prompt'); setHistory([{screen:'main',input:'1'},{screen:'main',input:'1'}]); },0); }],
            ['File Complaint', () => { reset(); setTimeout(()=>{ setStep('complaint_type'); setHistory([{screen:'main',input:'2'}]); },0); }],
            ['View Rights', () => { reset(); setTimeout(()=>{ setStep('rights'); setHistory([{screen:'main',input:'4'}]); },0); }],
          ].map(([l,fn],i) => (
            <button key={i} onClick={fn} style={{ padding:'5px 10px', background:'transparent', border:'1px solid #243628', borderRadius:4, fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#536358', cursor:'pointer', letterSpacing:1 }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── ADMIN ACTIVITY FEED ─────────────────────────────────────────────────────
const ActivityFeed = () => {
  const [items, setItems] = useState([
    { ts:'09:42:11', type:'case_filed',   text:'New case RC-2026-ACC-00291 filed via Taskforce field inspection at 14 Osu Ako-Adjei Ave.', color:'#E5483A' },
    { ts:'09:38:44', type:'risk_update',  text:'Landlord L-3378 risk score updated: 92 → 96. Trigger: new complaint + advance violation.', color:'#E8900A' },
    { ts:'09:31:05', type:'inspection',   text:'Inspection INS-081 completed by Ofc. Mensah. 3 violations flagged. Cases auto-generated.', color:'#E8900A' },
    { ts:'09:18:22', type:'card_issued',  text:'Rent Card RG-2026-ACC-00553 issued for tenancy T-009 at 3A Labone Link, East Legon.', color:'#0FA86A' },
    { ts:'09:12:01', type:'sync',         text:'Portal sync complete. rentcontrol.mwh.gov.gh — 14 new tenancy registrations pulled.', color:'#3B82F6' },
    { ts:'08:55:30', type:'case_update',  text:'Case RC-2026-ACC-00289 advanced: received → notice_issued by Mgr. Acheampong.', color:'#E8900A' },
    { ts:'08:44:17', type:'complaint',    text:'USSD complaint received from 0277-441-004. Excess advance at 22 Dzorwulu Crescent.', color:'#E5483A' },
    { ts:'08:30:00', type:'shift_start',  text:'18 officers clocked in for morning shift. Ayawaso East (3), Ayawaso West (4), Okaikwei (3)...', color:'#0FA86A' },
  ]);

  const [ticking, setTicking] = useState(false);

  const addLiveEvent = () => {
    setTicking(true);
    const events = [
      { type:'card_issued', text:'Rent Card RG-2026-ACC-00561 issued for 7 Labone Close Unit 2.', color:'#0FA86A' },
      { type:'complaint', text:'Web portal complaint filed. Advance rent violation at 31 North Kaneshie — 14 months alleged.', color:'#E5483A' },
      { type:'inspection', text:'Inspection INS-082 started by Ofc. Amankwa at 19 Spintex Road, Tema West.', color:'#E8900A' },
      { type:'sync', text:'GRA export queued for February 2026. 847 landlord records. SFTP transfer initiated.', color:'#3B82F6' },
    ];
    const ev = events[Math.floor(Math.random() * events.length)];
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
    setItems(prev => [{ ts, ...ev }, ...prev.slice(0, 9)]);
    setTicking(false);
  };

  return (
    <div className="fade-in">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div>
          <div style={{ fontFamily:'"Syne",sans-serif', fontSize:16, fontWeight:700, color:'#E8F0EB' }}>Live Activity Feed</div>
          <div style={{ fontSize:12, color:'#8FA898', marginTop:2 }}>Real-time enforcement events across all regions</div>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 10px', background:'rgba(15,168,106,0.1)', border:'1px solid rgba(15,168,106,0.2)', borderRadius:5 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#0FA86A' }} className="pulse" />
            <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#0FA86A' }}>LIVE</span>
          </div>
          <button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={addLiveEvent}>
            + Simulate Event
          </button>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:12, marginBottom:20 }}>
        {[
          ['18', 'Officers on shift', '#0FA86A'],
          ['3',  'Inspections today', '#0FA86A'],
          ['7',  'Events last hour',  '#E8900A'],
          ['2',  'Critical cases',    '#E5483A'],
        ].map(([v,l,c],i) => (
          <div key={i} style={{ background:'#1A2820', border:'1px solid #243628', borderRadius:8, padding:'14px' }}>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:22, fontWeight:500, color:c }}>{v}</div>
            <div style={{ fontSize:11, color:'#536358', marginTop:4 }}>{l}</div>
          </div>
        ))}
      </div>

      <div className="rg-card" style={{ padding:0 }}>
        <div style={{ padding:'12px 18px', borderBottom:'1px solid #243628', display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontFamily:'"Syne",sans-serif', fontSize:13, fontWeight:700 }}>Event Stream</span>
          <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#536358' }}>auto-updating</span>
        </div>
        {items.map((item, i) => (
          <div key={i} className={i===0?'fade-in':''} style={{ display:'flex', gap:14, padding:'12px 18px', borderBottom:i<items.length-1?'1px solid rgba(36,54,40,0.4)':'none', alignItems:'flex-start' }}>
            <div style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:item.color, marginTop:3 }} />
              {i < items.length-1 && <div style={{ width:1, height:20, background:'#243628' }} />}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#536358', marginBottom:4, letterSpacing:1 }}>{item.ts} · {item.type.replace(/_/g,' ').toUpperCase()}</div>
              <div style={{ fontSize:12, color:'#8FA898', lineHeight:1.6 }}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── LANDLORD REGISTRATION FLOW ──────────────────────────────────────────────
const LandlordRegistration = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ address:'', type:'', units:'', tin:'', digital:'' });
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const steps = [
    { title:'Property Details', fields:[
      { key:'address', label:'Street Address', placeholder:'e.g. 14 Osu Ako-Adjei Ave, Accra' },
      { key:'type',    label:'Property Type',  placeholder:'e.g. Compound house, Apartment block' },
      { key:'units',   label:'Number of Units', placeholder:'e.g. 6', type:'number' },
    ]},
    { title:'Landlord Identity', fields:[
      { key:'tin',    label:'TIN Number', placeholder:'e.g. GH-TIN-8821-4490' },
      { key:'card',   label:'Ghana Card Number', placeholder:'GHA-XXXXXXXXX-X' },
      { key:'phone',  label:'Phone Number', placeholder:'024XXXXXXX' },
    ]},
    { title:'Rent Control Link', fields:[
      { key:'digital', label:'Digital Property Address (if known)', placeholder:'e.g. GHA-ACC-XXXX-2024' },
      { key:'reg_id',  label:'Existing Rent Control Reg. ID (if any)', placeholder:'Leave blank if new' },
    ]},
  ];

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1600);
  };

  if (done) return (
    <div style={{ padding:'32px 20px', textAlign:'center', maxWidth:480, margin:'0 auto' }} className="fade-in">
      <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, fontWeight:700, color:'#0FA86A', letterSpacing:2, marginBottom:12 }}>REGISTERED</div>
      <div style={{ fontFamily:'"Syne",sans-serif', fontSize:20, fontWeight:700, color:'#E8F0EB', marginBottom:8 }}>Property Registered</div>
      <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:12, color:'#C8E830', marginBottom:20 }}>Reg ID: RC-PROP-2026-01483</div>
      <div style={{ background:'#1A2820', border:'1px solid #243628', borderRadius:8, padding:20, textAlign:'left', marginBottom:20 }}>
        {[['Digital Property Address','GHA-ACC-01483-2026'],['Status','Registered with Rent Control'],['Next step','Issue Rent Cards for each tenancy'],['Registration date','16 March 2026'],['Synced to','rentcontrol.mwh.gov.gh']].map(([l,v],i) => (
          <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:i<4?'1px solid rgba(36,54,40,0.4)':'none' }}>
            <span style={{ fontSize:12, color:'#536358' }}>{l}</span>
            <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:11, color:'#0FA86A' }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
        <button className="rg-btn rg-btn-primary" onClick={()=>toast&&toast("Go to Rent Cards tab to issue cards for your registered properties","info")}>Issue Rent Cards Now</button>
        <button className="rg-btn rg-btn-ghost" onClick={() => { setDone(false); setStep(0); setForm({}); }}>Register Another</button>
      </div>
    </div>
  );

  const cur = steps[step];

  return (
    <div style={{ maxWidth:520 }} className="fade-in">
      {/* Progress */}
      <div style={{ display:'flex', gap:0, marginBottom:24 }}>
        {steps.map((s,i) => (
          <div key={i} style={{ flex:1, display:'flex', alignItems:'center' }}>
            <div style={{ flex:1 }}>
              <div style={{ height:3, background: i<=step?'#0FA86A':'#243628', transition:'background 0.3s' }} />
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:i<=step?'#0FA86A':'#536358', marginTop:5, letterSpacing:1 }}>
                {String(i+1).padStart(2,'0')} {s.title.toUpperCase()}
              </div>
            </div>
            {i < steps.length-1 && <div style={{ width:12 }} />}
          </div>
        ))}
      </div>

      <div className="rg-card" style={{ padding:24 }}>
        <div style={{ fontFamily:'"Syne",sans-serif', fontSize:18, fontWeight:700, marginBottom:4 }}>{cur.title}</div>
        <div style={{ fontSize:13, color:'#8FA898', marginBottom:20 }}>
          {step===0 && 'Register this property with the Rent Control Department. It will be synced to rentcontrol.mwh.gov.gh.'}
          {step===1 && 'Your identity will be verified against the NIA Ghana Card database and GRA TIN registry.'}
          {step===2 && 'Link to any existing Rent Control records. Leave blank if this is a new registration.'}
        </div>

        {cur.fields.map(f => (
          <div key={f.key} className="rg-field">
            <label>{f.label}</label>
            <input type={f.type||'text'} className="rg-input" placeholder={f.placeholder}
              value={form[f.key]||''} onChange={e => setForm(p=>({...p,[f.key]:e.target.value}))} />
          </div>
        ))}

        {step === 2 && (
          <div style={{ padding:'12px 14px', background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:6, marginBottom:16, fontSize:12, color:'#8FA898', lineHeight:1.7 }}>
            After submission, this property will be registered in both RentGuard and synced to <span style={{ fontFamily:'"JetBrains Mono",monospace', color:'#0FA86A' }}>rentcontrol.mwh.gov.gh</span>. You will receive a unique digital property address and registration ID by SMS.
          </div>
        )}

        <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:8 }}>
          {step > 0 && <button className="rg-btn rg-btn-ghost" onClick={() => setStep(s=>s-1)}>← Back</button>}
          {step < steps.length-1
            ? <button className="rg-btn rg-btn-primary" onClick={() => setStep(s=>s+1)}>Continue →</button>
            : <button className="rg-btn rg-btn-primary" onClick={submit}>{submitting?'Registering…':'Submit Registration'}</button>
          }
        </div>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// v3 DEEP PASS — skeptic-proof additions
// ═══════════════════════════════════════════════════════════════════════════

// ── COMPLIANCE TREND (admin dashboard bottom panel replacement) ─────────────
const ComplianceTrend = ({ onSelectCase }) => {
  const months = ['Oct','Nov','Dec','Jan','Feb','Mar'];
  const policyItems = [
    { law:'Act 220 s.16(5)', rule:'Max 6 months advance rent', reality:'Avg 9.2 months collected', gap:true  },
    { law:'PNDCL 138 s.5',   rule:'Rent card for every tenancy', reality:'29% issued nationally',  gap:true  },
    { law:'PNDCL 138 s.4',   rule:'Register tenancy within 14 days', reality:'38% registered',    gap:true  },
    { law:'Act 220 s.20',    rule:'Landlord to furnish tenant list', reality:'11% compliance',     gap:true  },
    { law:'Act 220 s.17',    rule:'Property in habitable condition', reality:'72% passing inspection', gap:false },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* Law vs Reality */}
      <div className="rg-card" style={{ padding:20 }}>
        <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:4 }}>Law vs. Reality</div>
        <div style={{ fontSize:12, color:T.t2, marginBottom:16 }}>Where enforcement gaps are largest — April 2026</div>
        <table className="rg-table">
          <thead><tr><th>Legal Basis</th><th>What the Law Requires</th><th>Current Reality</th><th>Gap</th></tr></thead>
          <tbody>
            {policyItems.map((p,i) => (
              <tr key={i}>
                <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{p.law}</span></td>
                <td><span style={{ fontSize:12, color:T.t1 }}>{p.rule}</span></td>
                <td><span style={{ fontSize:12, fontWeight:600, color:p.gap?T.red:T.green }}>{p.reality}</span></td>
                <td><span className={`rg-badge ${p.gap?'rg-badge-red':'rg-badge-green'}`}>{p.gap?'ENFORCEMENT NEEDED':'COMPLIANT'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 6-month trend + recent cases side by side */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div className="rg-card" style={{ padding:20 }}>
          <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:4 }}>6-Month Compliance Trend</div>
          <div style={{ fontSize:12, color:T.t2, marginBottom:16 }}>Rent card adoption vs. violations detected</div>
          <TrendChart data={TREND_DATA} months={months} lines={[
            { key:'cards',      label:'Cards Issued (%)', color:T.green, fill:true },
            { key:'violations', label:'Violations (÷10)', color:T.red,   dashed:true },
          ]} />
          <div style={{ marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[['↑ 23pt','Card adoption rise (6 mo)', T.green],['↓ 12%','Violation rate improvement', T.green]].map(([v,l,c],i) => (
              <div key={i} style={{ background:T.bg, borderRadius:6, padding:'10px 12px' }}>
                <div style={{ fontFamily:F.mono, fontSize:16, fontWeight:700, color:c }}>{v}</div>
                <div style={{ fontSize:10, color:T.t3, marginTop:3, lineHeight:1.4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rg-card" style={{ padding:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700 }}>Recent Cases</div>
            <span className="rg-badge rg-badge-red">{CASES.filter(c=>c.status==='received').length} unassigned</span>
          </div>
          {CASES.slice(0,5).map((c,i) => (
            <div key={i} onClick={() => onSelectCase && onSelectCase(c)}
              style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'9px 0', borderBottom:i<4?`1px solid ${T.border}`:'none', cursor:onSelectCase?'pointer':'default' }}>
              <div style={{ flex:1, paddingRight:10 }}>
                <div style={{ fontSize:12, fontWeight:600, color:T.t1, marginBottom:2 }}>{caseTypeLabel(c.type)}</div>
                <div style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{c.id.replace('RC-2026-ACC-','RC-')} · {c.district}</div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontSize:10, fontWeight:700, color:c.status==='received'?T.red:c.status==='under_investigation'?T.amber:T.green, textTransform:'uppercase', letterSpacing:0.8 }}>{statusLabel(c.status)}</div>
                <div style={{ fontSize:10, color:T.t3, marginTop:2 }}>{c.opened}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── LANDLORD ACTION PLAN (replaces thin overview bottom) ────────────────────
const LandlordActionPlan = ({ score }) => {
  const [done, setDone] = useState({});

  const actions = [
    { id:'a1', priority:'critical', points:25, time:'Today',    title:'Refund excess advance rent to Units 2A and 3B', detail:'You collected 9.5 months — the legal cap is 6. Excess: ~GH₵ 6,300 per unit. Refund or negotiate a credit against future rent. Risk: case RC-2026-ACC-00291 will escalate to prosecution.', law:'Act 220 s.16(5)' },
    { id:'a2', priority:'critical', points:20, time:'This week', title:'Issue Rent Cards for Units 1A and 1B', detail:'2 of your 6 units have no rent card. This is a PNDCL 138 s.5 offence. Go to RentGuard → Rent Cards → Issue New Card. Takes 5 minutes per unit.', law:'PNDCL 138 s.5' },
    { id:'a3', priority:'high',     points:18, time:'14 days',  title:'Register 8 Kpehe Rd tenancies with Rent Control', detail:'Your Achimota property is unregistered. All 4 tenancies there violate PNDCL 138 s.4. Register via rentcontrol.mwh.gov.gh or use RentGuard → Register Property.', law:'PNDCL 138 s.4' },
    { id:'a4', priority:'medium',   points:12, time:'30 days',  title:'Submit tenant and rent list to Rent Committee', detail:'PNDCL 138 s.5(2) requires landlords to file a list of tenants and rents with the nearest Rent and Housing Committee. This is a compliance requirement regardless of other violations.', law:'PNDCL 138 s.5(2)' },
    { id:'a5', priority:'low',      points:5,  time:'90 days',  title:'Obtain formal rent assessment for 14 Osu Ako-Adjei Ave', detail:'Rent Control recommends landlords get a formal rent assessment to confirm their rent levels are within approved ranges. This also protects you if a tenant challenges the rent amount.', law:'Act 220 s.18' },
  ];

  const completedPoints = actions.filter(a => done[a.id]).reduce((s,a) => s+a.points, 0);
  const projectedScore = Math.min(100, score + completedPoints);
  const pColor = { critical:T.red, high:T.amber, medium:T.blue, low:T.t3 };

  return (
    <div className="rg-card" style={{ padding:20 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
        <div>
          <div style={{ fontFamily:F.head, fontSize:15, fontWeight:700 }}>Your Action Plan</div>
          <div style={{ fontSize:12, color:T.t2, marginTop:2 }}>Complete these steps to raise your compliance score and avoid sanctions</div>
        </div>
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <div style={{ fontSize:11, color:T.t3, marginBottom:2 }}>Projected score</div>
          <div style={{ fontFamily:F.mono, fontSize:24, fontWeight:700, color:projectedScore>=80?T.green:projectedScore>=60?T.amber:T.red }}>{projectedScore}</div>
          <div style={{ fontSize:10, color:T.t3 }}>if all completed</div>
        </div>
      </div>

      {actions.map((a,i) => (
        <div key={a.id} style={{ display:'flex', gap:14, padding:'14px 0', borderBottom:i<actions.length-1?`1px solid ${T.border}`:'none', opacity:done[a.id]?0.45:1, transition:'opacity 0.2s' }}>
          {/* Checkbox */}
          <div onClick={() => setDone(p=>({...p,[a.id]:!p[a.id]}))}
            style={{ width:20, height:20, borderRadius:4, border:`2px solid ${done[a.id]?T.green:T.border}`, background:done[a.id]?T.green:'transparent', flexShrink:0, marginTop:2, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>
            {done[a.id] && <div style={{ width:10, height:6, borderLeft:`2px solid #fff`, borderBottom:`2px solid #fff`, transform:'rotate(-45deg)', marginTop:-2 }} />}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:5, flexWrap:'wrap' }}>
              <span style={{ fontFamily:F.mono, fontSize:9, fontWeight:700, color:pColor[a.priority], letterSpacing:1.2, textTransform:'uppercase' }}>{a.priority}</span>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>+{a.points} pts</span>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>Due: {a.time}</span>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.green }}>§ {a.law}</span>
            </div>
            <div style={{ fontSize:13, fontWeight:700, color:T.t1, marginBottom:5 }}>{a.title}</div>
            <div style={{ fontSize:12, color:T.t2, lineHeight:1.7 }}>{a.detail}</div>
          </div>
        </div>
      ))}

      {Object.keys(done).filter(k=>done[k]).length > 0 && (
        <div style={{ marginTop:14, padding:'12px 14px', background:T.greenFade, border:`1px solid rgba(15,168,106,0.2)`, borderRadius:6, fontSize:12, color:T.green }}>
          {Object.keys(done).filter(k=>done[k]).length} action{Object.keys(done).filter(k=>done[k]).length!==1?'s':''} marked complete · +{completedPoints} projected points → Score: {projectedScore}/100
        </div>
      )}
    </div>
  );
};

// ── PAYMENT HISTORY (shown after rent card verification) ────────────────────
const CardPaymentHistory = ({ cardNum }) => {
  const card = RENT_CARDS[cardNum];
  if (!card) return null;

  const payments = [
    { date:'2026-03-01', amount:1800, method:'MTN MoMo',      period:'Mar 2026', ref:'MTN-2291AA-001', advance:false, hashift:'a3f7b2...' },
    { date:'2026-02-01', amount:1800, method:'MTN MoMo',      period:'Feb 2026', ref:'MTN-2291AA-002', advance:false, hashift:'c91d44...' },
    { date:'2025-11-01', amount:16200,method:'Bank Transfer',  period:'Nov 25 – Jul 26 (advance)', ref:'GCB-771234', advance:true, hashift:'f44ab1...' },
  ];

  return (
    <div style={{ marginTop:14 }} className="fade-in">
      <div style={{ fontFamily:F.head, fontSize:13, fontWeight:700, marginBottom:12 }}>Payment History · {cardNum}</div>
      <div className="rg-card" style={{ padding:0 }}>
        <table className="rg-table">
          <thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Period</th><th>Type</th><th>Entry Hash</th></tr></thead>
          <tbody>
            {payments.map((p,i) => (
              <tr key={i}>
                <td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{p.date}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color:T.t1 }}>GH₵ {p.amount.toLocaleString()}</span></td>
                <td><span style={{ fontSize:12, color:T.t2 }}>{p.method}</span></td>
                <td><span style={{ fontSize:12, color:p.advance?T.red:T.t2 }}>{p.period}</span></td>
                <td><span className={`rg-badge ${p.advance?'rg-badge-red':'rg-badge-muted'}`}>{p.advance?'ADVANCE':'REGULAR'}</span></td>
                <td><span style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{p.hash}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop:10, padding:'10px 12px', background:'rgba(59,130,246,0.06)', border:'1px solid rgba(59,130,246,0.15)', borderRadius:5, fontSize:11, color:T.t2, lineHeight:1.6 }}>
        Each payment entry is SHA-256 hashed at recording time. The hash cannot be altered — any tampering changes the hash and triggers a mismatch alert in the audit log.
      </div>
    </div>
  );
};

// ── OFFICER SHIFT SUMMARY (replaces static today stats) ────────────────────
const ShiftSummary = () => {
  const [expanded, setExpanded] = useState(false);

  const timeline = [
    { time:'08:30', action:'Shift started', detail:'Logged in. 8 properties in today\'s route.', color:T.green },
    { time:'09:05', action:'Inspection: 4 Ring Road West', detail:'P-004 · Yaa Darko-Mensah · 0 violations · Compliant', color:T.green },
    { time:'09:31', action:'Inspection: 14 Osu Ako-Adjei Ave', detail:'P-001 · 3 violations flagged · 2 cases auto-generated', color:T.red },
    { time:'09:44', action:'Evidence uploaded', detail:'3 photos + GPS coordinates synced to RC-2026-ACC-00291', color:T.amber },
    { time:'10:12', action:'Inspection: 7 Labone Close', detail:'P-002 · 1 violation (advance at cap limit) · Notice recommended', color:T.amber },
    { time:'10:55', action:'Offline sync completed', detail:'4 actions queued during connectivity gap — all synced', color:T.blue },
  ];

  return (
    <div style={{ padding:14 }}>
      <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>
        Monday 16 Mar · Shift: 08:30 — 16:00 · Ayawaso East
      </div>

      {/* Progress bar */}
      <div style={{ background:'#1A2820', border:'1px solid #243628', borderRadius:8, padding:14, marginBottom:14 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
          <span style={{ fontSize:12, fontWeight:700, color:'#E8F0EB' }}>Route Progress</span>
          <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:12, color:'#0FA86A' }}>3 / 8</span>
        </div>
        <div style={{ height:6, background:'#243628', borderRadius:3, overflow:'hidden' }}>
          <div style={{ height:'100%', width:'37.5%', background:'#0FA86A', borderRadius:3 }} />
        </div>
        <div style={{ display:'flex', gap:16, marginTop:12 }}>
          {[['3','Inspected','#0FA86A'],['2','Cases Filed','#E5483A'],['5','Remaining','#536358'],['0','Pending Sync','#3B82F6']].map(([v,l,c],i) => (
            <div key={i}>
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:18, fontWeight:500, color:c }}>{v}</div>
              <div style={{ fontSize:9, color:'#536358', fontWeight:700, letterSpacing:1, textTransform:'uppercase', marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's timeline */}
      <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#536358', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Today's Activity</div>
      {(expanded ? timeline : timeline.slice(0,3)).map((t,i) => (
        <div key={i} style={{ display:'flex', gap:10, marginBottom:10 }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:t.color, marginTop:3 }} />
            {i < (expanded?timeline:timeline.slice(0,3)).length-1 && <div style={{ width:1, flex:1, background:'#243628', marginTop:3 }} />}
          </div>
          <div style={{ flex:1, paddingBottom:6 }}>
            <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:3 }}>
              <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#536358' }}>{t.time}</span>
              <span style={{ fontSize:11, fontWeight:700, color:'#E8F0EB' }}>{t.action}</span>
            </div>
            <div style={{ fontSize:11, color:'#8FA898', lineHeight:1.5 }}>{t.detail}</div>
          </div>
        </div>
      ))}
      <button onClick={() => setExpanded(!expanded)}
        style={{ background:'transparent', border:'none', fontSize:11, color:'#536358', cursor:'pointer', fontFamily:'"JetBrains Mono",monospace', letterSpacing:1, padding:'4px 0' }}>
        {expanded ? '↑ Show less' : `↓ Show ${timeline.length - 3} more events`}
      </button>

      {/* Priority next */}
      <div style={{ marginTop:14, background:'rgba(229,72,58,0.08)', border:'1px solid rgba(229,72,58,0.2)', borderLeft:`3px solid #E5483A`, borderRadius:6, padding:'12px 14px' }}>
        <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#E5483A', letterSpacing:1.5, textTransform:'uppercase', marginBottom:6 }}>Next Priority Stop</div>
        <div style={{ fontSize:12, fontWeight:700, color:'#E8F0EB', marginBottom:3 }}>22 Dzorwulu Crescent, Accra</div>
        <div style={{ fontSize:11, color:'#8FA898' }}>P-003 · Risk 96 · 12 units · 0 rent cards · Unregistered · 4 violations on file</div>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// FINAL DEPTH PASS
// ═══════════════════════════════════════════════════════════════════════════

// ── RENT CARD ISSUANCE FORM ─────────────────────────────────────────────────
const RentCardIssuanceForm = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ tenancy:'', tenant:'', unit:'', rent:'', freq:'monthly', advance:'', method:'momo_mtn' });
  const [issuing, setIssuing] = useState(false);
  const [cardNum, setCardNum] = useState('');

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const doIssue = () => {
    setIssuing(true);
    setTimeout(() => {
      setCardNum('RG-2026-ACC-00' + Math.floor(500 + Math.random() * 400));
      setIssuing(false);
      setStep(2);
    }, 1600);
  };

  const capMonths = form.freq === 'monthly' ? 1 : 6;
  const advanceMonths = form.rent && form.advance ? (parseFloat(form.advance) / parseFloat(form.rent)).toFixed(1) : null;
  const overCap = advanceMonths && parseFloat(advanceMonths) > capMonths;

  return (
    <div style={{ maxWidth: 500 }} className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: F.head, fontSize: 18, fontWeight: 700 }}>Issue Rent Card</div>
          <div style={{ fontSize: 12, color: T.t2, marginTop: 2 }}>PNDCL 138 s.5 · Required for every active tenancy</div>
        </div>
        {onClose && <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: T.t3, fontSize: 18, cursor: 'pointer' }}>×</button>}
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
        {['Tenancy Details', 'Advance Check', 'Card Issued'].map((s, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ height: 3, background: i <= step ? T.green : T.border, transition: 'background 0.3s', marginRight: i < 2 ? 8 : 0 }} />
            <div style={{ fontFamily: F.mono, fontSize: 9, color: i <= step ? T.green : T.t3, marginTop: 5, letterSpacing: 1 }}>{String(i + 1).padStart(2, '0')} {s.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="rg-card" style={{ padding: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="rg-field" style={{ gridColumn: '1/-1' }}>
              <label>Property Address</label>
              <select className="rg-select" value={form.tenancy} onChange={e => upd('tenancy', e.target.value)}>
                <option value="">Select property…</option>
                {PROPERTIES.filter(p => p.registered).map(p => <option key={p.id} value={p.id}>{p.address}</option>)}
              </select>
            </div>
            <div className="rg-field">
              <label>Tenant Full Name</label>
              <input className="rg-input" placeholder="e.g. Abena Sarpong" value={form.tenant} onChange={e => upd('tenant', e.target.value)} />
            </div>
            <div className="rg-field">
              <label>Unit / Room</label>
              <input className="rg-input" placeholder="e.g. Unit 2A" value={form.unit} onChange={e => upd('unit', e.target.value)} />
            </div>
            <div className="rg-field">
              <label>Monthly Rent (GH₵)</label>
              <input type="number" className="rg-input" placeholder="e.g. 1800" value={form.rent} onChange={e => upd('rent', e.target.value)} />
            </div>
            <div className="rg-field">
              <label>Rent Frequency</label>
              <select className="rg-select" value={form.freq} onChange={e => upd('freq', e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annual">Annual</option>
              </select>
            </div>
          </div>
          <button className="rg-btn rg-btn-primary" disabled={!form.tenancy || !form.tenant || !form.rent} style={{ marginTop: 8 }} onClick={() => setStep(1)}>Continue →</button>
        </div>
      )}

      {step === 1 && (
        <div className="rg-card" style={{ padding: 20 }}>
          <div style={{ fontFamily: F.head, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Advance Rent Check</div>
          <div style={{ fontSize: 12, color: T.t2, marginBottom: 16 }}>Record any advance payment. Legal cap: <strong style={{ color: T.t1 }}>{capMonths} month{capMonths > 1 ? 's' : ''}</strong> for this tenancy type.</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div className="rg-field">
              <label>Advance Collected (GH₵)</label>
              <input type="number" className="rg-input" placeholder="0 if none" value={form.advance} onChange={e => upd('advance', e.target.value)} />
            </div>
            <div className="rg-field">
              <label>Payment Method</label>
              <select className="rg-select" value={form.method} onChange={e => upd('method', e.target.value)}>
                <option value="momo_mtn">MTN MoMo</option>
                <option value="momo_telecel">Telecel Cash</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
            </div>
          </div>

          {advanceMonths && (
            <div style={{ padding: '14px 16px', borderRadius: 8, background: overCap ? T.redFade : T.greenFade, border: `2px solid ${overCap ? 'rgba(229,72,58,0.3)' : 'rgba(15,168,106,0.25)'}`, marginBottom: 16 }} className="fade-in">
              <div style={{ fontFamily: F.mono, fontSize: 22, fontWeight: 700, color: overCap ? T.red : T.green, marginBottom: 4 }}>{advanceMonths} months</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: overCap ? T.red : T.green }}>
                {overCap ? `✗ ILLEGAL — exceeds ${capMonths}-month cap · Act 220 s.16(5)` : `✓ LEGAL — within the ${capMonths}-month cap`}
              </div>
              {overCap && (
                <div style={{ fontSize: 12, color: T.t2, marginTop: 6, lineHeight: 1.6 }}>
                  Excess: GH₵ {((parseFloat(advanceMonths) - capMonths) * parseFloat(form.rent)).toLocaleString()}. Issuing this card will automatically flag a violation and generate a case.
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="rg-btn rg-btn-ghost" onClick={() => setStep(0)}>← Back</button>
            <button className="rg-btn rg-btn-primary" onClick={doIssue}>
              {issuing ? 'Generating card…' : overCap ? 'Issue Card + Flag Violation' : 'Issue Rent Card'}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="fade-in">
          <div style={{ padding: '20px 0 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 700, color: T.green, letterSpacing: 2, marginBottom: 10 }}>ISSUED</div>
            <div style={{ fontFamily: F.head, fontSize: 20, fontWeight: 700, color: T.t1, marginBottom: 6 }}>Rent Card Generated</div>
          </div>

          {/* Card preview */}
          <div style={{ background: T.bg || '#0D1A10', border: `2px solid ${T.green}`, borderRadius: 10, padding: 22, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(15,168,106,0.06)' }} />
            <div style={{ position: 'absolute', bottom: -30, left: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(15,168,106,0.04)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: T.green, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Ghana Rent Control · Official Rent Card</div>
                <div style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: T.green, letterSpacing: 1 }}>{cardNum}</div>
              </div>
              <div style={{ background: T.green, borderRadius: 4, padding: '4px 10px' }}>
                <div style={{ fontFamily: F.mono, fontSize: 9, fontWeight: 700, color: T.bg, letterSpacing: 1 }}>ACTIVE</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['Tenant', form.tenant || 'Abena Sarpong'],
                ['Unit', form.unit || 'Unit 2A'],
                ['Monthly Rent', `GH₵ ${parseFloat(form.rent || 1800).toLocaleString()}`],
                ['Issued', new Date().toLocaleDateString('en-GH')],
                ['Landlord', 'K. Boateng (L-2291)'],
                ['Cap', `${capMonths} month${capMonths > 1 ? 's' : ''} advance`],
              ].map(([l, v], i) => (
                <div key={i}>
                  <div style={{ fontFamily: F.mono, fontSize: 8, color: 'rgba(15,168,106,0.5)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>{l}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 11, color: T.t1 }}>{v}</div>
                </div>
              ))}
            </div>
            {/* QR placeholder */}
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, background: 'rgba(15,168,106,0.1)', border: `1px solid rgba(15,168,106,0.2)`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 28, height: 28, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                  {[...Array(9)].map((_, i) => <div key={i} style={{ background: [0,2,6,8,4].includes(i) ? T.green : 'transparent', borderRadius: 1 }} />)}
                </div>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: 'rgba(15,168,106,0.4)', lineHeight: 1.6 }}>Scan to verify at<br />rentguard.gh/verify/{cardNum}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="rg-btn rg-btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={()=>toast&&toast("PDF downloaded","success")}>↓ Download PDF</button>
            <button className="rg-btn rg-btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={()=>toast&&toast("Rent card sent to tenant via SMS","success")}>Send to Tenant by SMS</button>
          </div>
          {overCap && (
            <div style={{ marginTop: 12, padding: '10px 14px', background: T.redFade, border: `1px solid rgba(229,72,58,0.2)`, borderRadius: 6, fontSize: 12, color: T.red }}>
              Violation case auto-generated: RC-2026-ACC-00294. Routed to Case Manager queue.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── DISTRICT DRILLDOWN (admin regions) ──────────────────────────────────────
const DistrictDrilldown = ({ region, onBack }) => {
  const districts = [
    { name: 'Ayawaso East',      reg: 71, cards: 48, violations: 87,  inspections: 14, risk: 'high'   },
    { name: 'Ayawaso West',      reg: 68, cards: 41, violations: 94,  inspections: 11, risk: 'high'   },
    { name: 'Ayawaso Central',   reg: 82, cards: 61, violations: 52,  inspections: 9,  risk: 'medium' },
    { name: 'Okaikwei North',    reg: 88, cards: 72, violations: 33,  inspections: 16, risk: 'medium' },
    { name: 'Okaikwei South',    reg: 91, cards: 79, violations: 21,  inspections: 12, risk: 'low'    },
    { name: 'La Nkwantanang',    reg: 94, cards: 83, violations: 15,  inspections: 8,  risk: 'low'    },
    { name: 'Accra Metro',       reg: 61, cards: 32, violations: 112, inspections: 18, risk: 'high'   },
  ];

  return (
    <div className="fade-in">
      <button onClick={onBack} className="rg-btn rg-btn-ghost" style={{ fontSize: 11, marginBottom: 18 }}>← Regions</button>
      <SectionHeader
        title={`${region.name} Region`}
        sub={`${districts.length} MMDAs · ${region.violations} total violations · Compliance score: ${region.score}/100`}
        action={<button className="rg-btn rg-btn-primary" style={{ fontSize: 11 }} onClick={()=>toast&&toast("Officer deployment request submitted to supervisor","success")}>Deploy Officers</button>}
      />

      {/* Region summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          [region.reg + '%', 'Registration Rate', region.reg > 75 ? T.green : region.reg > 55 ? T.amber : T.red],
          [region.cards + '%', 'Rent Cards Issued', region.cards > 65 ? T.green : region.cards > 45 ? T.amber : T.red],
          [region.violations, 'Active Violations', region.violations > 200 ? T.red : region.violations > 80 ? T.amber : T.green],
          [region.score + '/100', 'Compliance Score', region.score > 70 ? T.green : region.score > 50 ? T.amber : T.red],
        ].map(([v, l, c], i) => (
          <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: '16px' }}>
            <div style={{ fontFamily: F.mono, fontSize: 22, fontWeight: 500, color: c, marginBottom: 6 }}>{v}</div>
            <div style={{ fontSize: 11, color: T.t2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Districts table */}
      <div className="rg-card" style={{ padding: 0 }}>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontFamily: F.head, fontSize: 14, fontWeight: 700 }}>MMDA Breakdown</span>
        </div>
        <table className="rg-table">
          <thead><tr><th>District / MMDA</th><th>Registration</th><th>Rent Cards</th><th>Violations</th><th>Inspections (MTD)</th><th>Risk</th><th>Action</th></tr></thead>
          <tbody>
            {districts.map((d, i) => (
              <tr key={i}>
                <td style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: T.t1 }}>{d.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 50, height: 4, background: T.border, borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${d.reg}%`, background: d.reg > 75 ? T.green : d.reg > 55 ? T.amber : T.red, borderRadius: 2 }} />
                    </div>
                    <span style={{ fontFamily: F.mono, fontSize: 11 }}>{d.reg}%</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 50, height: 4, background: T.border, borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${d.cards}%`, background: d.cards > 65 ? T.green : d.cards > 45 ? T.amber : T.red, borderRadius: 2 }} />
                    </div>
                    <span style={{ fontFamily: F.mono, fontSize: 11 }}>{d.cards}%</span>
                  </div>
                </td>
                <td><span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 700, color: d.violations > 80 ? T.red : d.violations > 30 ? T.amber : T.green }}>{d.violations}</span></td>
                <td><span style={{ fontFamily: F.mono, fontSize: 12, color: T.t2 }}>{d.inspections}</span></td>
                <td><span className={`rg-badge ${d.risk === 'high' ? 'rg-badge-red' : d.risk === 'medium' ? 'rg-badge-amber' : 'rg-badge-green'}`}>{d.risk}</span></td>
                <td>
                  <button className={`rg-btn ${d.risk === 'high' ? 'rg-btn-danger' : 'rg-btn-ghost'}`} style={{ fontSize: 11, padding: '4px 10px' }}>
                    {d.risk === 'high' ? 'Priority' : 'Schedule'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── OFFICER MOBILE CASE DETAIL ───────────────────────────────────────────────
const MobileCaseDetail = ({ caseData, onBack }) => {
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);

  const doUpdate = () => {
    setUpdating(true);
    setTimeout(() => { setUpdating(false); setUpdated(true); }, 1200);
  };

  return (
    <>
      <div style={{ background: T.surface, padding: '10px 16px 12px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: T.t3, fontSize: 11, marginBottom: 6, padding: 0, display: 'block', cursor: 'pointer' }}>← My Cases</button>
        <div style={{ fontFamily: F.head, fontSize: 14, fontWeight: 700, color: T.t1 }}>{caseTypeLabel(caseData.type)}</div>
        <div style={{ fontFamily: F.mono, fontSize: 10, color: T.green, marginTop: 2 }}>{caseData.id.replace('RC-2026-ACC-', 'RC-')}</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: 14, marginBottom: 12 }}>
          {[
            ['Property', caseData.property],
            ['Landlord', caseData.landlord],
            ['District', caseData.district],
            ['Severity', caseData.sev],
            ['Opened', caseData.opened],
            ['Status', statusLabel(caseData.status)],
          ].map(([l, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 5 ? `1px solid rgba(36,54,40,0.4)` : 'none' }}>
              <span style={{ fontSize: 10, color: T.t3 }}>{l}</span>
              <span style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 600, color: l === 'Severity' ? riskColor(caseData.sev === 'critical' ? 90 : caseData.sev === 'high' ? 70 : 45) : T.t1 }}>{v}</span>
            </div>
          ))}
        </div>

        {caseData.advance > 6 && (
          <div style={{ background: T.redFade, border: `1px solid rgba(229,72,58,0.25)`, borderLeft: `3px solid ${T.red}`, borderRadius: 6, padding: '10px 12px', marginBottom: 12 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: T.red, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Advance Violation · Act 220 s.16</div>
            <div style={{ fontSize: 12, color: T.t2 }}>{caseData.advance} months collected. Cap: 6 months. Excess: ~GH₵ {((caseData.advance - 6) * 1800).toLocaleString()}</div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {!updated ? (
            <button onClick={doUpdate} className="rg-btn rg-btn-primary" style={{ justifyContent: 'center' }}>
              {updating ? 'Updating…' : 'Add Field Note + Update Status'}
            </button>
          ) : (
            <div style={{ padding: '10px 12px', background: T.greenFade, border: `1px solid rgba(15,168,106,0.2)`, borderRadius: 6, fontSize: 12, color: T.green, textAlign: 'center' }}>
              Field note added. Queued for sync.
            </div>
          )}
          <button className="rg-btn rg-btn-ghost" style={{ justifyContent: 'center' }} onClick={()=>toast&&toast("Calling shift supervisor…","info")}>Call Supervisor</button>
        </div>
      </div>
    </>
  );
};


const NAV = {
  admin:    [
    { id:'dashboard',    label:'Dashboard',          dot:'#0FA86A' },
    { id:'activity',     label:'Live Activity',      dot:'#C8E830' },
    { id:'regions',      label:'Regions',            dot:'#3B82F6' },
    { id:'cases',        label:'All Cases',          dot:'#E8900A' },
    { id:'sla',          label:'SLA Tracker',        dot:'#E5483A' },
    { id:'flow',         label:'Enforcement Flow',   dot:'#C8E830' },
    { id:'properties',   label:'Properties',         dot:'#E8900A' },
    { id:'officers',     label:'Officers',           dot:'#0FA86A' },
    { id:'performance',  label:'Performance',        dot:'#0FA86A' },
    { id:'photos',       label:'Photo Gallery',      dot:'#3B82F6' },
    { id:'gra',          label:'GRA Export',         dot:'#E8900A' },
    { id:'integrations', label:'Integrations',       dot:'#3B82F6' },
    { id:'policy',       label:'Policy Log',         dot:'#536358' },
    { id:'reports',      label:'Reports',            dot:'#536358' },
    { id:'audit',        label:'Audit Log',          dot:'#536358' },
    { id:'settings',     label:'Settings',           dot:'#536358' },
    { id:'account',      label:'My Account',         dot:'#536358' },
  ],
  manager:  [
    { id:'queue',        label:'Case Queue',         dot:'#E5483A' },
    { id:'casedetail',   label:'Case Detail',        dot:'#E5483A', hidden:true },
    { id:'sla',          label:'SLA Tracker',        dot:'#E5483A' },
    { id:'properties',   label:'Properties',         dot:'#E8900A' },
    { id:'propdrill',    label:'Property Drilldown', dot:'#E8900A' },
    { id:'risk',         label:'Risk Register',      dot:'#E5483A' },
    { id:'assign',       label:'Assign Officers',    dot:'#3B82F6' },
    { id:'performance',  label:'Performance',        dot:'#0FA86A' },
    { id:'account',      label:'My Account',         dot:'#536358' },
  ],
  officer:  [
    { id:'home',         label:'Today',              dot:'#0FA86A' },
    { id:'scan',         label:'Inspect Property',   dot:'#E8900A' },
    { id:'qr',           label:'QR Scanner',         dot:'#C8E830' },
    { id:'map',          label:'Map View',           dot:'#3B82F6' },
    { id:'cases',        label:'My Cases',           dot:'#3B82F6' },
    { id:'handover',     label:'Shift Handover',     dot:'#536358' },
    { id:'sync',         label:'Sync Status',        dot:'#536358' },
    { id:'account',      label:'My Account',         dot:'#536358' },
  ],
  landlord: [
    { id:'overview',     label:'Overview',           dot:'#0FA86A' },
    { id:'register',     label:'Register Property',  dot:'#C8E830' },
    { id:'properties',   label:'Properties',         dot:'#E8900A' },
    { id:'tenants',      label:'Tenants',            dot:'#3B82F6' },
    { id:'cards',        label:'Rent Cards',         dot:'#3B82F6' },
    { id:'payments',     label:'Payments',           dot:'#0FA86A' },
    { id:'renewal',      label:'Tenancy Renewal',    dot:'#C8E830' },
    { id:'documents',    label:'Documents',          dot:'#3B82F6' },
    { id:'tax',          label:'Tax Summary',        dot:'#E8900A' },
    { id:'cases',        label:'Open Cases',         dot:'#E5483A' },
    { id:'account',      label:'My Account',         dot:'#536358' },
  ],
  tenant:   [
    { id:'mytenancy',     label:'My Tenancy',         dot:'#0FA86A' },
    { id:'tracker',       label:'Complaint Tracker',  dot:'#E8900A' },
    { id:'receipts',      label:'Payment Receipts',   dot:'#0FA86A' },
    { id:'verify',        label:'Verify Card',        dot:'#0FA86A' },
    { id:'ussd',          label:'USSD Simulator',     dot:'#C8E830' },
    { id:'eviction',      label:'Eviction & Legal',   dot:'#E5483A' },
    { id:'rights',        label:'My Rights',          dot:'#3B82F6' },
    { id:'notifications', label:'Notifications',      dot:'#3B82F6' },
    { id:'complaint',     label:'File Complaint',     dot:'#E5483A' },
    { id:'calc',          label:'Advance Calc',       dot:'#E8900A' },
  ],
};

export default function RentGuard() {
  const [appState, setAppState] = useState({
    currentUser: null,
    role: 'admin',
    navPage: 'dashboard',
    selectedCase: null,
    showSearch: false,
    showOnboarding: false,
  });
  const { currentUser, role, navPage, selectedCase, showSearch, showOnboarding } = appState;

  const [toasts, setToasts] = useState([]);

  // Wire global toast function - must be in useEffect, never in render body
  const showToast = (msg, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev.slice(-3), { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };
  useEffect(() => { setGlobalToast(showToast); }, []);

  const dismissToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleLogin = (account) => {
    setAppState({
      currentUser: account,
      role: account.id,
      navPage: NAV[account.id]?.[0]?.id || 'dashboard',
      selectedCase: null,
      showSearch: false,
      showOnboarding: true,
    });
  };

  const handleLogout = () => {
    setAppState({ currentUser: null, role: 'admin', navPage: 'dashboard', selectedCase: null, showSearch: false });
  };

  // Show login if not authenticated
  useEffect(() => {
    const h = (e) => { if ((e.metaKey||e.ctrlKey) && e.key==='k') { e.preventDefault(); setAppState(s => ({ ...s, showSearch: !s.showSearch })); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  if (!currentUser) {
    return (
      <div>
        <MobileCSS />
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        <LoginScreen onLogin={handleLogin} />
      </div>
    );
  }


  const handleRole = (r) => setAppState(s => ({ ...s, role:r, navPage:NAV[r][0].id, selectedCase:null }));
  const handleNav  = (id) => setAppState(s => ({ ...s, navPage:id, selectedCase:null }));
  const handleSelectCase = (c) => setAppState(s => ({ ...s, selectedCase:c, navPage:'casedetail' }));
  const handleGlobalNav  = (r, page, data) => setAppState(s => ({ ...s, role:r, navPage:page, selectedCase:data||s.selectedCase }));

  const navItems  = (NAV[role]||[]).filter(n=>!n.hidden);
  const roleColor = ROLES.find(r=>r.id===role)?.color||'#0FA86A';

  const AdminContent = () => {
    if (navPage==='dashboard')    return <AdminDashboard onSelectCase={handleSelectCase} />;
    if (navPage==='activity')     return <ActivityFeed />;
    if (navPage==='regions')      return <AdminRegions />;
    if (navPage==='cases')            if (navPage==='account')      return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    return <BulkCaseManager onSelectCase={handleSelectCase} />;
    if (navPage==='sla')          return <SLATracker cases={CASES} />;
    if (navPage==='flow')         return <EnforcementFlow />;
    if (navPage==='properties')   return <PropertyDrilldown />;
    if (navPage==='officers')     return <AdminOfficers />;
    if (navPage==='performance')  return <OfficerPerformance />;
    if (navPage==='photos')       return <PhotoGallery />;
    if (navPage==='gra')          return <GRAExport />;
    if (navPage==='integrations') return <SystemIntegration />;
    if (navPage==='policy')       return <PolicyLog />;
    if (navPage==='reports')      return <PrintReport />;
    if (navPage==='audit')        return <AdminAudit />;
    if (navPage==='settings')     return <SettingsPage />;
    if (navPage==='account')      return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    return <AdminDashboard onSelectCase={handleSelectCase} />;
  };
  const ManagerContent = () => {
    if (navPage==='casedetail'&&selectedCase) return <CaseDetail caseData={selectedCase} onBack={()=>handleNav('queue')} />;
    if (navPage==='sla')         return <SLATracker cases={CASES} />;
    if (navPage==='properties')  return <PropertyDrilldown onBack={()=>handleNav('queue')} />;
    if (navPage==='propdrill')   return <PropertyDrilldown onBack={()=>handleNav('properties')} />;
    if (navPage==='account')      return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    if (navPage==='risk')        return <BulkCaseManager onSelectCase={handleSelectCase} />;
    if (navPage==='assign')      return <AssignOfficers />;
    if (navPage==='performance') return <OfficerPerformance />;
    if (navPage==='account')      return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    return <BulkCaseManager onSelectCase={handleSelectCase} />;
  };
  const OfficerContent = () => {
    if (navPage==='qr')      return (<div className="fade-in"><SectionHeader title="QR Scanner" sub="Scan a rent card QR code to verify instantly" /><div style={{maxWidth:440}}><QRScanner /></div></div>);
    if (navPage==='map')     return (<div className="fade-in"><SectionHeader title="Map View" sub="Risk-ranked properties · Ayawaso East MMDA" /><div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,overflow:'hidden',height:580}}><OfficerMap /></div></div>);
    if (navPage==='sync')    return <OfficerSync />;
    if (navPage==='handover')return <ShiftHandover />;
        if (navPage==='account')      return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    return <OfficerMobile />;
  };
  const LandlordContent = () => {
    if (navPage==='register')  return <LandlordRegistration />;
    if (navPage==='tenants')   return <LandlordTenants />;
    if (navPage==='payments')  return <LandlordPayments />;
    if (navPage==='renewal')   return <TenancyRenewal />;
    if (navPage==='documents') return <DocumentUpload />;
    if (navPage==='tax')       return <LandlordTaxSummary />;
        if (navPage==='account')      return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    return <LandlordPortal />;
  };
  const TenantContent = () => {
    if (navPage==='mytenancy')     return <TenantDashboard />;
    if (navPage==='tracker')       return <ComplaintTracker />;
    if (navPage==='receipts')      return <PaymentReceipt />;
    if (navPage==='eviction')      return <EvictionAndLegalAid />;
    if (navPage==='notifications') return <NotificationCentre />;
    if (navPage==='ussd')          return (<div className="fade-in"><SectionHeader title="USSD Simulator" sub="*714*1# — works on any phone" /><div style={{maxWidth:400}}><div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,overflow:'hidden',height:520}}><USSDSimulator /></div></div></div>);
    if (navPage==='account')      return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    return <TenantPortal />;
  };

  const mainContent = () => {
    if (role==='admin')    return <AdminContent />;
    if (role==='manager')  return <ManagerContent />;
    if (role==='officer')  return <OfficerContent />;
    if (role==='landlord') return <LandlordContent />;
    if (role==='tenant')   return <TenantContent />;
  };

  return (
    <div>
      <MobileCSS />
      <ToastDisplay toasts={toasts} onDismiss={dismissToast} />
      <div className="rg-app">
        <GlobalCSS />
        <style>{`
          @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
          @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
          @media print{.rg-sidebar,.rg-topbar,.np{display:none!important;}.rg-content{padding:0!important;overflow:visible!important;}.rg-main{display:block!important;}body{background:#fff!important;color:#000!important;}.rg-card{border:1px solid #ccc!important;background:#fff!important;}}
        `}</style>

        {showSearch && <GlobalSearchEnhanced onClose={()=>setAppState(s => ({ ...s, showSearch: false }))} onNavigate={handleGlobalNav} />}
        {showOnboarding && <OnboardingModal role={role} onDismiss={()=>setAppState(s=>({...s,showOnboarding:false}))} />}

        <div className="rg-sidebar">
          <div style={{padding:'16px 16px 12px',borderBottom:`1px solid ${T.border}`}}><Logo /></div>
          <div style={{padding:'8px 0',flex:1,overflowY:'auto'}}>
            <div style={{padding:'6px 16px 8px'}}><div style={{fontSize:9,fontWeight:700,color:T.t3,letterSpacing:1.5,textTransform:'uppercase'}}>Navigation</div></div>
            {navItems.map(item => {
              const active = navPage===item.id||(navPage==='casedetail'&&item.id==='queue');
              const badge = item.id==='queue'||item.id==='cases' ? CASES.filter(c=>c.status==='received').length
                          : item.id==='sla' ? CASES.filter(c=>c.sev==='critical'||c.sev==='high').length
                          : item.id==='assign' ? CASES.filter(c=>!c.assigned&&c.status==='received').length
                          : item.id==='notifications' ? 2 : null;
              return (
                <button key={item.id} className={`rg-nav-item${active?' active':''}`} onClick={()=>handleNav(item.id)} style={{justifyContent:'space-between'}} aria-label={`Navigate to ${item.label}`} aria-current={active?'page':undefined}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div className="rg-nav-dot" style={{background:active?roleColor:item.dot,opacity:active?1:0.4}} />
                    {item.label}
                  </div>
                  {badge>0 && <span style={{fontFamily:F.mono,fontSize:9,fontWeight:700,color:T.red,background:'rgba(229,72,58,0.15)',borderRadius:10,padding:'1px 6px'}}>{badge}</span>}
                </button>
              );
            })}
          </div>
          <div style={{borderTop:`1px solid ${T.border}`,padding:12}}>
            <button onClick={()=>setAppState(s => ({ ...s, showSearch: true }))} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'7px 10px',background:T.card,border:`1px solid ${T.border}`,borderRadius:6,cursor:'pointer',marginBottom:8}}>
              <span style={{fontFamily:F.mono,fontSize:10,color:T.t3}}>Search…</span>
              <span style={{fontFamily:F.mono,fontSize:9,color:T.t3,background:T.bg,padding:'1px 5px',borderRadius:2}}>Cmd+K</span>
            </button>
            <div style={{padding:'8px 10px',background:T.card,borderRadius:6,border:`1px solid ${T.border}`}}>
              <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:4}}>
                <div style={{width:5,height:5,borderRadius:'50%',background:T.green}} className="pulse" />
                <div style={{fontSize:9,fontWeight:700,color:T.green,letterSpacing:1,textTransform:'uppercase'}}>Connected</div>
              </div>
              <div style={{fontFamily:F.mono,fontSize:10,color:T.t2,marginBottom:2}}>rentcontrol.mwh.gov.gh</div>
              <div style={{fontFamily:F.mono,fontSize:9,color:T.t3,marginBottom:4}}>15 offices · Sync: 2 min ago</div>
              <div style={{display:'flex',justifyContent:'space-between',borderTop:`1px solid ${T.border}`,paddingTop:4}}>
                <span style={{fontFamily:F.mono,fontSize:9,color:T.t3}}>Open cases</span>
                <span style={{fontFamily:F.mono,fontSize:9,fontWeight:700,color:T.amber}}>{CASES.filter(c=>c.status!=='resolved'&&c.status!=='closed').length}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:3}}>
                <span style={{fontFamily:F.mono,fontSize:9,color:T.t3}}>Officers on shift</span>
                <span style={{fontFamily:F.mono,fontSize:9,fontWeight:700,color:T.green}}>18</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rg-main">
          <div className="rg-topbar">
            <div style={{flex:1,display:'flex',alignItems:'center',gap:0}}>
              <span style={{fontFamily:F.mono,fontSize:11,color:T.t3}}>RentGuard</span>
              <span style={{fontFamily:F.mono,fontSize:11,color:T.border,margin:'0 8px'}}>/</span>
              <span style={{fontFamily:F.mono,fontSize:11,color:T.t2}}>{ROLES.find(r=>r.id===role)?.label}</span>
              <span style={{fontFamily:F.mono,fontSize:11,color:T.border,margin:'0 8px'}}>/</span>
              <span style={{fontFamily:F.mono,fontSize:11,color:T.t1,fontWeight:600}}>
                {navPage==='casedetail'&&selectedCase ? selectedCase.id.replace('RC-2026-ACC-','RC-') : (NAV[role]||[]).find(n=>n.id===navPage)?.label||navPage}
              </span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <button onClick={()=>setAppState(s => ({ ...s, showSearch: true }))} style={{display:'flex',alignItems:'center',gap:6,padding:'4px 10px',background:T.card,border:`1px solid ${T.border}`,borderRadius:5,cursor:'pointer',color:T.t3}}>
                <span style={{fontFamily:F.mono,fontSize:11}}>⌕</span>
                <span style={{fontFamily:F.mono,fontSize:9,color:T.border}}>Cmd+K</span>
              </button>
              <div style={{display:'flex',alignItems:'center',gap:5}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:T.green}} className="pulse" />
                <span style={{fontFamily:F.mono,fontSize:9,color:T.t3}}>LIVE</span>
              </div>
              <div style={{width:1,height:18,background:T.border}} />
              <span style={{fontFamily:F.mono,fontSize:9,color:T.t3}}>Act 220 · PNDCL 138</span>
              <div style={{width:1,height:18,background:T.border}} />
              <RoleSwitcher role={role} setRole={handleRole} />
              <div style={{width:1,height:18,background:T.border}} />
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:26,height:26,borderRadius:'50%',background:`${DEMO_ACCOUNTS.find(a=>a.id===role)?.color||T.green}20`,border:`1.5px solid ${DEMO_ACCOUNTS.find(a=>a.id===role)?.color||T.green}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.mono,fontSize:9,fontWeight:700,color:DEMO_ACCOUNTS.find(a=>a.id===role)?.color||T.green}}>
                  {currentUser.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                </div>
                <button onClick={handleLogout} aria-label="Sign out"
                  style={{background:'transparent',border:`1px solid ${T.border}`,borderRadius:4,padding:'3px 8px',fontFamily:F.mono,fontSize:9,color:T.t3,cursor:'pointer',letterSpacing:1}}>
                  SIGN OUT
                </button>
              </div>
            </div>
          </div>
          <div className="rg-content" style={{padding:role==='officer'&&['home','scan'].includes(navPage)?0:24}}>
            {mainContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCTION PASS — Auth · Mobile · GlobalState · A11y · Error States
// ═══════════════════════════════════════════════════════════════════════════

// Case state - simplified without context
const useCaseState = () => null;

// ── LOGIN SCREEN ────────────────────────────────────────────────────────────
const DEMO_ACCOUNTS = [
  { id:'admin',    name:'Commissioner Ama Antwi',   role:'National Admin',      email:'a.antwi@rentcontrol.gov.gh',    pass:'demo2026', color:'#0FA86A' },
  { id:'manager',  name:'Mgr. Kwame Acheampong',    role:'Case Manager',         email:'k.acheampong@rentguard.gh',      pass:'demo2026', color:'#3B82F6' },
  { id:'officer',  name:'Ofc. Kofi Mensah',         role:'Taskforce Officer',    email:'k.mensah@rentguard.gh',          pass:'demo2026', color:'#E8900A' },
  { id:'landlord', name:'Kwame Asante Boateng',     role:'Registered Landlord',  email:'k.boateng@gmail.com',            pass:'demo2026', color:'#C8E830' },
  { id:'tenant',   name:'Abena Sarpong',            role:'Tenant',               email:'abena.sarpong@gmail.com',        pass:'demo2026', color:'#E5483A' },
];

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail]       = useState('');
  const [pass, setPass]         = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  const attempt = (e) => {
    e && e.preventDefault();
    setError(''); setLoading(true);
    setTimeout(() => {
      const match = DEMO_ACCOUNTS.find(a => a.email === email && a.pass === pass);
      if (match) {
        onLogin(match);
      } else {
        setError('Invalid email or password. Use a demo account below.');
        setLoading(false);
      }
    }, 900);
  };

  const quickLogin = (account) => {
    setEmail(account.email); setPass(account.pass);
    setError(''); setLoading(true);
    setTimeout(() => onLogin(account), 700);
  };

  // Explicit colors — do not inherit from rg-field CSS
  const L = {
    label:   { display:'block', fontSize:11, fontWeight:700, color:'#C8D8C4', letterSpacing:0.8, marginBottom:6, textTransform:'uppercase' },
    input:   { width:'100%', padding:'10px 14px', background:'#0B1210', border:'1.5px solid #3A5245', borderRadius:6, color:'#E8F0EB', fontFamily:'Inter,sans-serif', fontSize:13, outline:'none', boxSizing:'border-box' },
    inputFocus: { border:'1.5px solid #0FA86A' },
  };

  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus]   = useState(false);

  return (
    <div style={{ minHeight:'100vh', background:'#0B1210', display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:'Inter,sans-serif' }}>
      <div style={{ width:'100%', maxWidth:400 }}>

        {/* Logo + header */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:14 }}>
            <div style={{ width:40, height:40, borderRadius:10, background:'linear-gradient(135deg,#0FA86A,#0a7a4f)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 24px rgba(15,168,106,0.3)' }}>
              <div style={{ width:20, height:20, border:'2.5px solid #fff', borderRadius:4 }} />
            </div>
            <span style={{ fontFamily:'"Syne",sans-serif', fontSize:26, fontWeight:700, color:'#E8F0EB' }}>RentGuard</span>
          </div>
          <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#4A6A56', letterSpacing:2.5, textTransform:'uppercase', marginBottom:6 }}>Ghana Rent Enforcement Platform</div>
          <div style={{ fontSize:12, color:'#4A6A56' }}>Rent Control Department · Ministry of Works and Housing</div>
        </div>

        {/* Card */}
        <div style={{ background:'#111916', border:'1px solid #2A4030', borderRadius:14, padding:32, boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ fontFamily:'"Syne",sans-serif', fontSize:20, fontWeight:700, color:'#E8F0EB', marginBottom:24 }}>Sign In</div>

          <form onSubmit={attempt}>
            {/* Email */}
            <div style={{ marginBottom:16 }}>
              <label htmlFor="email" style={L.label}>Email Address</label>
              <input
                id="email" type="email"
                value={email} onChange={e => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}
                placeholder="your.name@rentcontrol.gov.gh"
                aria-label="Email address" autoComplete="email"
                style={{ ...L.input, ...(emailFocus ? L.inputFocus : {}) }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom:20 }}>
              <label htmlFor="password" style={L.label}>Password</label>
              <div style={{ position:'relative' }}>
                <input
                  id="password" type={showPass ? 'text' : 'password'}
                  value={pass} onChange={e => setPass(e.target.value)}
                  onFocus={() => setPassFocus(true)} onBlur={() => setPassFocus(false)}
                  placeholder="Enter your password"
                  aria-label="Password" autoComplete="current-password"
                  style={{ ...L.input, ...(passFocus ? L.inputFocus : {}), paddingRight:52 }}
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'transparent', border:'none', color:'#4A6A56', cursor:'pointer', fontFamily:'"JetBrains Mono",monospace', fontSize:10, fontWeight:700, letterSpacing:1 }}>
                  {showPass ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            {error && (
              <div role="alert" style={{ padding:'10px 14px', background:'rgba(229,72,58,0.12)', border:'1px solid rgba(229,72,58,0.3)', borderRadius:6, fontSize:12, color:'#E5483A', marginBottom:16, lineHeight:1.5 }}>
                {error}
              </div>
            )}

            <button type="submit"
              disabled={loading || !email || !pass}
              aria-label="Sign in to RentGuard"
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'12px 20px', background: loading||!email||!pass ? '#1A3028' : '#0FA86A', color: loading||!email||!pass ? '#4A6A56' : '#fff', border:'none', borderRadius:8, fontFamily:'Inter,sans-serif', fontSize:13, fontWeight:700, cursor:loading||!email||!pass?'not-allowed':'pointer', transition:'background 0.2s', letterSpacing:0.3 }}>
              {loading ? (
                <>
                  <span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,0.25)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin 0.8s linear infinite' }} />
                  Signing in…
                </>
              ) : 'Sign In →'}
            </button>
          </form>

          {/* Demo accounts toggle */}
          <div style={{ marginTop:18, textAlign:'center' }}>
            <button type="button" onClick={() => setDemoOpen(s => !s)}
              style={{ background:'transparent', border:'none', fontFamily:'"JetBrains Mono",monospace', fontSize:10, color:'#4A6A56', cursor:'pointer', letterSpacing:1, textDecoration:'underline', textDecorationStyle:'dotted', textUnderlineOffset:3 }}>
              {demoOpen ? '↑ Hide demo accounts' : '↓ View demo accounts'}
            </button>
          </div>

          {demoOpen && (
            <div style={{ marginTop:14 }} className="slide-up">
              <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#4A6A56', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Demo Accounts · password: demo2026</div>
              {DEMO_ACCOUNTS.map((account, i) => (
                <button key={i} type="button" onClick={() => quickLogin(account)}
                  aria-label={`Sign in as ${account.name}`}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'10px 12px', background:'#0D1610', border:'1px solid #2A4030', borderRadius:8, cursor:'pointer', marginBottom:6, textAlign:'left', transition:'border-color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = account.color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#2A4030'}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:`${account.color}18`, border:`2px solid ${account.color}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"JetBrains Mono",monospace', fontSize:10, fontWeight:700, color:account.color, flexShrink:0 }}>
                    {account.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:'#E8F0EB', marginBottom:2 }}>{account.name}</div>
                    <div style={{ fontSize:11, color:'#6A8A76', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{account.role} · {account.email}</div>
                  </div>
                  <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:account.color, flexShrink:0, opacity:0.8 }}>→</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign:'center', marginTop:20 }}>
          <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, color:'#2A4030', letterSpacing:1, lineHeight:1.9 }}>
            Act 220 (Rent Act 1963) · PNDCL 138 (Rent Control Law 1986)<br />
            Enforcement Intelligence Layer · v4.0 · March 2026
          </div>
        </div>

      </div>
    </div>
  );
};

// ── NETWORK ERROR STATE ─────────────────────────────────────────────────────
const NetworkError = ({ onRetry }) => (
  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 24px', textAlign:'center', gap:16 }}>
    <div style={{ width:48, height:48, borderRadius:'50%', background:T.redFade, border:`1px solid rgba(229,72,58,0.2)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <span style={{ fontFamily:F.mono, fontSize:18, color:T.red }}>!</span>
    </div>
    <div>
      <div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, marginBottom:6 }}>Connection Lost</div>
      <div style={{ fontSize:13, color:T.t2, lineHeight:1.65, maxWidth:320 }}>
        Unable to reach rentcontrol.mwh.gov.gh. Your work is saved locally and will sync when connection is restored.
      </div>
    </div>
    <div style={{ display:'flex', gap:8 }}>
      <button className="rg-btn rg-btn-primary" onClick={onRetry}>Retry Connection</button>
      <button className="rg-btn rg-btn-ghost" onClick={onRetry}>Work Offline</button>
    </div>
    <div style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>Last sync: 2 minutes ago · 3 actions queued</div>
  </div>
);

// ── MOBILE RESPONSIVE WRAPPER ───────────────────────────────────────────────
// Adds responsive behavior to the shell CSS
const MobileCSS = () => (
  <style>{`
    @media (max-width: 768px) {
      .rg-app { flex-direction: column; }
      .rg-sidebar {
        width: 100% !important;
        height: auto !important;
        flex-direction: row !important;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0 !important;
        border-right: none !important;
        border-bottom: 1px solid ${T.border};
        flex-shrink: 0;
      }
      .rg-sidebar > div:first-child { display: none; }
      .rg-sidebar > div:nth-child(2) {
        display: flex !important;
        flex-direction: row !important;
        padding: 0 8px !important;
        gap: 0 !important;
        overflow-x: auto;
        white-space: nowrap;
      }
      .rg-sidebar > div:last-child { display: none !important; }
      .rg-nav-item {
        flex-direction: column !important;
        padding: 8px 12px !important;
        font-size: 9px !important;
        min-width: 64px;
        border-radius: 0 !important;
        border-bottom: 2px solid transparent;
        justify-content: center !important;
        align-items: center !important;
        gap: 4px !important;
      }
      .rg-nav-item.active { border-bottom-color: #0FA86A; background: transparent !important; }
      .rg-nav-dot { display: none !important; }
      .rg-topbar { padding: 8px 16px !important; }
      .rg-content { padding: 16px !important; }
      .rg-main { min-width: 0; }
    }
    @media (max-width: 480px) {
      .rg-content { padding: 12px !important; }
      .rg-card { padding: 14px !important; }
      .rg-table { font-size: 11px !important; }
      .rg-table th, .rg-table td { padding: 8px 10px !important; }
    }
    /* Focus styles for accessibility */
    button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
      outline: 2px solid ${T.green};
      outline-offset: 2px;
    }
    /* Smooth scrollbar across app */
    .rg-sidebar, .rg-content { scrollbar-width: thin; scrollbar-color: ${T.border} transparent; }
  `}</style>
);


// ═══════════════════════════════════════════════════════════════════════════
// FINAL ADDITIONS — Onboarding · Skeletons · Enhanced Empty States
// ═══════════════════════════════════════════════════════════════════════════

// ── LOADING SKELETON ────────────────────────────────────────────────────────
const Skeleton = ({ width = '100%', height = 16, style = {} }) => (
  <div style={{
    width, height, borderRadius: 4,
    background: `linear-gradient(90deg, ${T.card} 25%, ${T.cardHov} 50%, ${T.card} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    ...style,
  }} />
);

const SkeletonCard = () => (
  <div className="rg-card" style={{ padding: 20 }}>
    <Skeleton width="40%" height={12} style={{ marginBottom: 12 }} />
    <Skeleton height={32} style={{ marginBottom: 8 }} />
    <Skeleton width="70%" height={12} style={{ marginBottom: 16 }} />
    <div style={{ display: 'flex', gap: 8 }}>
      <Skeleton width="30%" height={10} />
      <Skeleton width="20%" height={10} />
    </div>
  </div>
);

const SkeletonTable = ({ rows = 5 }) => (
  <div className="rg-card" style={{ padding: 0 }}>
    <div style={{ padding: '14px 20px', borderBottom: `1px solid ${T.border}` }}>
      <Skeleton width="25%" height={14} />
    </div>
    {[...Array(rows)].map((_, i) => (
      <div key={i} style={{ display: 'flex', gap: 16, padding: '14px 20px', borderBottom: i < rows - 1 ? `1px solid ${T.border}` : 'none', alignItems: 'center' }}>
        <Skeleton width="8%" height={10} />
        <Skeleton width="22%" height={10} />
        <Skeleton width="18%" height={10} />
        <Skeleton width="12%" height={10} />
        <Skeleton width="10%" height={10} />
        <Skeleton width="8%" height={22} style={{ borderRadius: 12 }} />
      </div>
    ))}
  </div>
);

// ── ONBOARDING WALKTHROUGH ──────────────────────────────────────────────────
const ONBOARDING_STEPS = {
  admin: [
    { title: 'Welcome, Commissioner', body: 'RentGuard gives you real-time enforcement intelligence across all 16 regions. Start with the Dashboard for a national overview — compliance rates, active violations, and officer activity updated every 2 minutes.', action: 'Go to Dashboard' },
    { title: 'Regional Intelligence', body: 'Click any region on the Regions page to drill into MMDA-level data. Identify which districts need Priority deployment and dispatch officers directly.', action: 'Explore Regions' },
    { title: 'Enforcement Flow', body: 'The Enforcement Flow page walks through a complete case lifecycle — from USSD complaint through field inspection, formal notice, GRA referral, and resolution. Use it to train new officers.', action: 'View Flow' },
    { title: 'GRA Export', body: 'Every month, rental income data is automatically prepared for the Ghana Revenue Authority. Review and initiate the SFTP export from the GRA Export page.', action: 'Open GRA Export' },
    { title: 'Settings & Users', body: 'Configure enforcement thresholds, SLA deadlines, notification channels, and invite new users from Settings. Risk thresholds and advance caps can be adjusted if the law changes.', action: 'Go to Settings' },
  ],
  manager: [
    { title: 'Welcome, Case Manager', body: 'Your queue shows all cases routed to your district. New complaints arrive from USSD, WhatsApp, the web portal, and Taskforce field inspections — all in one place.', action: 'Open Case Queue' },
    { title: 'SLA Tracking', body: 'Critical cases must be actioned within 24 hours. High severity: 48 hours. The SLA Tracker shows exactly where each case stands — overdue cases are flagged in red.', action: 'View SLA Tracker' },
    { title: 'Assigning Officers', body: 'Unassigned cases appear in orange. Use the Assign Officers page to route cases by district. Officers receive an SMS notification immediately on assignment.', action: 'Assign Officers' },
    { title: 'Notice Generator', body: 'Inside any Case Detail, the Notice tab generates a formal legal notice auto-populated with case details, legal citations, and a compliance deadline. Review before sending.', action: 'Open a Case' },
  ],
  officer: [
    { title: 'Welcome, Officer', body: "Your shift route is loaded and ready. Properties are ranked by risk score — highest risk first. You'll receive SMS alerts for urgent reassignments during your shift.", action: 'View Today' },
    { title: 'Inspection Checklist', body: 'Tap a property to begin an inspection. The checklist covers all PNDCL 138 and Act 220 requirements. Failed items auto-generate violation cases. All evidence is GPS-stamped.', action: 'Start Inspection' },
    { title: 'QR Card Verification', body: 'Scan a rent card QR code instantly using your phone camera. Valid cards show green — violations show in red with the option to file a complaint on the spot.', action: 'Open QR Scanner' },
    { title: 'Offline Mode', body: "If you lose signal during a field visit, don't stop. All actions are queued locally and sync automatically when you reconnect. Check Sync Status for your offline queue.", action: 'Check Sync' },
  ],
  landlord: [
    { title: 'Welcome to Your Portal', body: "Your compliance score is 34/100 — Non-Compliant. This is calculated from your registration status, rent card coverage, advance amounts, and open cases. Here's your action plan to improve it.", action: 'View Action Plan' },
    { title: 'Issue Rent Cards', body: 'Every tenant must receive a Rent Card under PNDCL 138 s.5. Cards are issued digitally and synced to the national Rent Control registry. Tenants can verify them by dialling *714*1#.', action: 'Go to Rent Cards' },
    { title: 'Advance Rent Limit', body: 'You cannot collect more than 6 months advance rent under Act 220 s.16(5). The Advance Calculator on the Overview page shows your legal limit for each tenancy.', action: 'Use Calculator' },
    { title: 'Register Your Properties', body: "Any property not registered with Rent Control is an automatic violation. Use Register Property to add unregistered properties — it syncs directly to rentcontrol.mwh.gov.gh.", action: 'Register Property' },
  ],
  tenant: [
    { title: 'Know Your Rights', body: 'You have 6 protected rights under Ghanaian rent law. Your landlord cannot collect more than 6 months advance, must provide a rent card, and cannot evict you without due process.', action: 'View My Rights' },
    { title: 'Verify Your Rent Card', body: 'Your rent card should be registered in the national Rent Control database. Verify it here by entering the card number — or dial *714*1# → Option 1 on any phone.', action: 'Verify My Card' },
    { title: 'File a Complaint', body: "If your landlord has taken excess advance, not issued a rent card, or threatened you with eviction — file a complaint here. It goes directly to the Rent Control Department. You'll get SMS updates.", action: 'File Complaint' },
    { title: 'No Smartphone? No Problem', body: 'Everything on this platform is also available by dialling *714*1# on any mobile phone — no internet or smartphone required. Share this with neighbours who need it.', action: 'Try USSD' },
    { id:'account',      label:'My Account',         dot:'#536358' },
  ],
};

const OnboardingModal = ({ role, onDismiss }) => {
  const [step, setStep] = useState(0);
  const steps = ONBOARDING_STEPS[role] || [];
  if (!steps.length) return null;

  const cur = steps[step];
  const isLast = step === steps.length - 1;
  const roleColors = { admin: T.green, manager: T.blue, officer: T.amber, landlord: '#C8E830', tenant: T.red };
  const accent = roleColors[role] || T.green;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="slide-up" style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, maxWidth: 460, width: '100%', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}>
        {/* Progress bar */}
        <div style={{ height: 3, background: T.border }}>
          <div style={{ height: '100%', width: `${((step + 1) / steps.length) * 100}%`, background: accent, transition: 'width 0.4s ease' }} />
        </div>

        <div style={{ padding: 28 }}>
          {/* Step indicator */}
          <div style={{ fontFamily: F.mono, fontSize: 9, color: accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            Step {step + 1} of {steps.length}
          </div>

          <div style={{ fontFamily: F.head, fontSize: 20, fontWeight: 700, color: T.t1, marginBottom: 12 }}>{cur.title}</div>
          <div style={{ fontSize: 13, color: T.t2, lineHeight: 1.75, marginBottom: 24 }}>{cur.body}</div>

          {/* Step dots */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {steps.map((_, i) => (
              <div key={i} onClick={() => setStep(i)}
                style={{ width: i === step ? 20 : 7, height: 7, borderRadius: 4, background: i <= step ? accent : T.border, cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={onDismiss} style={{ background: 'transparent', border: 'none', fontFamily: F.mono, fontSize: 10, color: T.t3, cursor: 'pointer', letterSpacing: 1 }}>
              Skip tour
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              {step > 0 && (
                <button className="rg-btn rg-btn-ghost" onClick={() => setStep(s => s - 1)} style={{ fontSize: 12 }}>← Back</button>
              )}
              <button className="rg-btn rg-btn-primary" onClick={() => isLast ? onDismiss() : setStep(s => s + 1)}
                style={{ fontSize: 12, background: accent }}>
                {isLast ? 'Get Started →' : cur.action + ' →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// PASS 5 — CSV Export · Keyboard Nav · Account Settings · Confirm Dialog
//         · Case Note Attachments · Map Improvements
// ═══════════════════════════════════════════════════════════════════════════

// ── REAL CSV EXPORT UTILITY ─────────────────────────────────────────────────
const downloadCSV = (filename, headers, rows) => {
  const escape = (v) => {
    const s = String(v ?? '');
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [headers, ...rows].map(r => r.map(escape).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const exportCasesCSV = () => downloadCSV(
  'rentguard_cases_' + new Date().toISOString().slice(0,10) + '.csv',
  ['Case ID','Type','Severity','Property','Landlord','District','Status','Opened','Assigned Officer','Advance (months)'],
  CASES.map(c => [c.id, caseTypeLabel(c.type), c.sev, c.property, c.landlord, c.district,
                  statusLabel(c.status), c.opened, c.assigned || 'Unassigned', c.advance || 0])
);

const exportOfficersCSV = () => downloadCSV(
  'rentguard_officers_' + new Date().toISOString().slice(0,10) + '.csv',
  ['Officer ID','Name','District','Inspections (MTD)','Cases Filed','Active','Phone','Badge'],
  OFFICERS.map(o => [o.id, o.name, o.district, o.insp, o.cases, o.active ? 'Yes' : 'No', o.phone, o.badge])
);

const exportGRACSV = (rows) => downloadCSV(
  'rentguard_gra_export_' + new Date().toISOString().slice(0,10) + '.csv',
  ['TIN','Ghana Card Ref','Properties','Tenancies','Est. Annual Income (GH₵)','Advance Violations','Unreg. Tenancies','District','Region'],
  (rows || GRA_ROWS || []).map(r => [r.tin, r.card, r.props, r.tenancies, r.income, r.advance_violations, r.unreg_tenancies, r.district, r.region])
);

const exportRegionsCSV = () => downloadCSV(
  'rentguard_regions_' + new Date().toISOString().slice(0,10) + '.csv',
  ['Region','Registration Rate (%)','Rent Card Rate (%)','Active Violations','Risk Level','Compliance Score'],
  REGIONS.map(r => [r.name, r.reg, r.cards, r.violations, r.risk, r.score])
);

// ── CONFIRM DIALOG ──────────────────────────────────────────────────────────
const ConfirmDialog = ({ title, body, confirmLabel = 'Confirm', danger = false, onConfirm, onCancel }) => (
  <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(4px)', zIndex:4000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
    <div className="slide-up" style={{ background:T.surface, border:`1px solid ${danger ? 'rgba(229,72,58,0.4)' : T.border}`, borderRadius:10, maxWidth:400, width:'100%', padding:24, boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>
      <div style={{ fontFamily:F.head, fontSize:17, fontWeight:700, marginBottom:10, color:danger?T.red:T.t1 }}>{title}</div>
      <div style={{ fontSize:13, color:T.t2, lineHeight:1.7, marginBottom:22 }}>{body}</div>
      <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
        <button className="rg-btn rg-btn-ghost" onClick={onCancel} style={{ fontSize:12 }}>Cancel</button>
        <button className={`rg-btn ${danger ? 'rg-btn-danger' : 'rg-btn-primary'}`} onClick={onConfirm} style={{ fontSize:12 }}>
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

// ── ACCOUNT SETTINGS PAGE ───────────────────────────────────────────────────
const AccountSettings = ({ currentUser, onLogout }) => {
  const toast = useToast();
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    district: '',
    currentPass: '',
    newPass: '',
    confirmPass: '',
  });
  const [tab, setTab]             = useState('profile');
  const [saving, setSaving]       = useState(false);
  const [confirm, setConfirm]     = useState(null);

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const saveProfile = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); toast('Profile updated successfully', 'success'); }, 900);
  };

  const changePassword = () => {
    if (form.newPass !== form.confirmPass) { toast('Passwords do not match', 'error'); return; }
    if (form.newPass.length < 8) { toast('Password must be at least 8 characters', 'error'); return; }
    setSaving(true);
    setTimeout(() => { setSaving(false); toast('Password changed successfully', 'success'); setForm(p => ({ ...p, currentPass:'', newPass:'', confirmPass:'' })); }, 900);
  };

  const notifSettings = [
    { key:'emailAlerts',   label:'Email alerts',          sub:'Case updates, SLA warnings, digest' },
    { key:'smsAlerts',     label:'SMS notifications',     sub:'Assignment alerts, urgent cases' },
    { key:'pushAlerts',    label:'Push notifications',    sub:'Real-time browser alerts' },
    { key:'weeklyDigest',  label:'Weekly digest email',   sub:'Performance summary every Monday' },
  ];
  const [notifs, setNotifs] = useState({ emailAlerts:true, smsAlerts:true, pushAlerts:false, weeklyDigest:true });

  const roleColor = { admin:T.green, manager:T.blue, officer:T.amber, landlord:'#C8E830', tenant:T.red };
  const accent = roleColor[currentUser?.id] || T.green;

  return (
    <div className="fade-in" style={{ maxWidth:620 }}>
      {confirm && <ConfirmDialog {...confirm} onCancel={() => setConfirm(null)} />}

      {/* Profile header */}
      <div style={{ display:'flex', gap:16, alignItems:'center', marginBottom:24 }}>
        <div style={{ width:56, height:56, borderRadius:'50%', background:`${accent}18`, border:`2.5px solid ${accent}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F.mono, fontSize:18, fontWeight:700, color:accent, flexShrink:0 }}>
          {(currentUser?.name || 'U').split(' ').map(n=>n[0]).join('').slice(0,2)}
        </div>
        <div>
          <div style={{ fontFamily:F.head, fontSize:18, fontWeight:700 }}>{currentUser?.name}</div>
          <div style={{ fontSize:12, color:T.t3, marginTop:2 }}>{currentUser?.role} · {currentUser?.email}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="rg-tabs rg-mb-2">
        {[['profile','Profile'],['password','Password'],['notifications','Notifications'],['security','Security']].map(([id,lbl]) => (
          <button key={id} className={`rg-tab${tab===id?' active':''}`} onClick={() => setTab(id)}>{lbl}</button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="rg-card" style={{ padding:22 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <div className="rg-field">
              <label>Full Name</label>
              <input className="rg-input" value={form.name} onChange={e=>upd('name',e.target.value)} />
            </div>
            <div className="rg-field">
              <label>Email Address</label>
              <input type="email" className="rg-input" value={form.email} onChange={e=>upd('email',e.target.value)} />
            </div>
            <div className="rg-field">
              <label>Phone Number</label>
              <input className="rg-input" value={form.phone} onChange={e=>upd('phone',e.target.value)} placeholder="024XXXXXXX" />
            </div>
            <div className="rg-field">
              <label>District / Region</label>
              <input className="rg-input" value={form.district} onChange={e=>upd('district',e.target.value)} placeholder="e.g. Ayawaso East" />
            </div>
          </div>
          <div style={{ marginTop:8, display:'flex', gap:8 }}>
            <button className="rg-btn rg-btn-primary" onClick={saveProfile}>{saving ? 'Saving…' : 'Save Profile'}</button>
          </div>
        </div>
      )}

      {tab === 'password' && (
        <div className="rg-card" style={{ padding:22, maxWidth:380 }}>
          <div style={{ fontSize:12, color:T.t2, marginBottom:16, lineHeight:1.6 }}>
            Choose a strong password. Minimum 8 characters. Your session will remain active after changing.
          </div>
          {[['currentPass','Current Password'],['newPass','New Password'],['confirmPass','Confirm New Password']].map(([key,label]) => (
            <div key={key} className="rg-field">
              <label>{label}</label>
              <input type="password" className="rg-input" value={form[key]} onChange={e=>upd(key,e.target.value)} />
            </div>
          ))}
          {form.newPass && form.confirmPass && form.newPass !== form.confirmPass && (
            <div style={{ fontSize:11, color:T.red, marginBottom:10 }}>! Passwords do not match</div>
          )}
          <button className="rg-btn rg-btn-primary"
            disabled={!form.currentPass || !form.newPass || form.newPass !== form.confirmPass}
            onClick={changePassword}>{saving ? 'Changing…' : 'Change Password'}</button>
        </div>
      )}

      {tab === 'notifications' && (
        <div className="rg-card" style={{ padding:22 }}>
          {notifSettings.map(n => (
            <div key={n.key} style={{ display:'flex', gap:14, alignItems:'flex-start', padding:'14px 0', borderBottom:`1px solid ${T.border}` }}>
              <div onClick={() => setNotifs(p=>({...p,[n.key]:!p[n.key]}))}
                style={{ width:40, height:22, borderRadius:11, background:notifs[n.key]?T.green:T.border, cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0, marginTop:2 }}>
                <div style={{ position:'absolute', top:3, left:notifs[n.key]?20:3, width:16, height:16, borderRadius:'50%', background:'#fff', transition:'left 0.2s' }} />
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:2 }}>{n.label}</div>
                <div style={{ fontSize:12, color:T.t3 }}>{n.sub}</div>
              </div>
            </div>
          ))}
          <button className="rg-btn rg-btn-primary" style={{ marginTop:14 }}
            onClick={()=>toast('Notification preferences saved','success')}>Save Preferences</button>
        </div>
      )}

      {tab === 'security' && (
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div className="rg-card" style={{ padding:20 }}>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:10 }}>Active Sessions</div>
            {[
              { device:'Chrome — MacBook Pro', location:'Accra, Ghana', last:'Now (current)', current:true },
              { device:'Safari — iPhone 14', location:'Accra, Ghana', last:'2 hours ago', current:false },
            ].map((s,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:i===0?`1px solid ${T.border}`:'none' }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:T.t1 }}>{s.device}</div>
                  <div style={{ fontSize:11, color:T.t3, marginTop:2 }}>{s.location} · {s.last}</div>
                </div>
                {s.current
                  ? <span className="rg-badge rg-badge-green">Current</span>
                  : <button className="rg-btn rg-btn-ghost" style={{ fontSize:11, padding:'3px 8px', color:T.red }}
                      onClick={()=>toast('Session revoked','warning')}>Revoke</button>}
              </div>
            ))}
          </div>

          <div className="rg-card" style={{ padding:20, borderColor:'rgba(229,72,58,0.3)' }}>
            <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, color:T.red, marginBottom:6 }}>Danger Zone</div>
            <div style={{ fontSize:12, color:T.t2, marginBottom:14, lineHeight:1.6 }}>
              Signing out will end your current session. All offline queued actions will be discarded if not yet synced.
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button className="rg-btn rg-btn-danger" onClick={() =>
                setConfirm({
                  title:'Sign Out',
                  body:'Any unsynced offline actions will be lost. Are you sure you want to sign out?',
                  confirmLabel:'Sign Out',
                  danger:true,
                  onConfirm: onLogout,
                })
              }>Sign Out of All Devices</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── ENHANCED GLOBALSEARCH WITH KEYBOARD NAV ─────────────────────────────────
const GlobalSearchEnhanced = ({ onClose, onNavigate }) => {
  const [q, setQ]             = useState('');
  const [selectedIdx, setIdx] = useState(0);
  const inputRef              = useRef(null);
  const listRef               = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i+1, results.length-1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx(i => Math.max(i-1, 0)); }
      if (e.key === 'Enter')     { if (results[selectedIdx]) { onNavigate(results[selectedIdx].role, results[selectedIdx].page, results[selectedIdx].data); onClose(); } }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedIdx, onClose, onNavigate]);

  const allItems = [
    ...CASES.map(c => ({ type:'Case', id:c.id, title:caseTypeLabel(c.type), sub:`${c.property} · ${c.district} · ${statusLabel(c.status)}`, role:'manager', page:'casedetail', data:c, tag:c.sev })),
    ...PROPERTIES.map(p => ({ type:'Property', id:p.id, title:p.address, sub:`${p.mmda} · Risk ${p.risk} · ${p.landlord}`, role:'admin', page:'properties', tag:p.violations>0?'violations':'compliant' })),
    ...OFFICERS.map(o => ({ type:'Officer', id:o.id, title:o.name, sub:`${o.district} · ${o.insp} inspections · Badge ${o.badge}`, role:'admin', page:'officers', tag:o.active?'on duty':'off duty' })),
    { type:'Page', id:'gra',         title:'GRA Export',          sub:'Generate rental income data for Ghana Revenue Authority', role:'admin', page:'gra', tag:'admin' },
    { type:'Page', id:'flow',        title:'Enforcement Flow',    sub:'End-to-end enforcement workflow walkthrough', role:'admin', page:'flow', tag:'admin' },
    { type:'Page', id:'sla',         title:'SLA Tracker',         sub:'Case response deadlines by severity', role:'admin', page:'sla', tag:'admin' },
    { type:'Page', id:'performance', title:'Officer Performance', sub:'Monthly inspection and case generation metrics', role:'admin', page:'performance', tag:'admin' },
    { type:'Page', id:'policy',      title:'Policy Log',          sub:'Legal changes from 1963 to 2026', role:'admin', page:'policy', tag:'admin' },
    { type:'Page', id:'activity',    title:'Live Activity Feed',  sub:'Real-time enforcement events across all regions', role:'admin', page:'activity', tag:'live' },
    { type:'Page', id:'register',    title:'Register Property',   sub:'Add a property to the Rent Control registry', role:'landlord', page:'register', tag:'landlord' },
    { type:'Page', id:'ussd',        title:'USSD Simulator',      sub:'*714*1# tenant verification service', role:'tenant', page:'ussd', tag:'tenant' },
    { type:'Page', id:'eviction',    title:'Eviction & Legal Aid',sub:'Emergency alert + free legal resources', role:'tenant', page:'eviction', tag:'tenant' },
  ];

  const results = q.trim()
    ? allItems.filter(i => i.title.toLowerCase().includes(q.toLowerCase()) || i.sub.toLowerCase().includes(q.toLowerCase()) || i.id.toLowerCase().includes(q.toLowerCase()))
    : allItems.slice(0, 9);

  const typeColor = { Case:T.amber, Property:T.blue, Officer:T.green, Page:T.t3 };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', backdropFilter:'blur(6px)', zIndex:2000, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:72 }}
      onClick={onClose}>
      <div style={{ width:'100%', maxWidth:600, background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, overflow:'hidden', boxShadow:'0 24px 80px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}>

        {/* Input */}
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 18px', borderBottom:`1px solid ${T.border}` }}>
          <span style={{ fontFamily:F.mono, fontSize:16, color:T.t3 }}>⌕</span>
          <input ref={inputRef} value={q} onChange={e => { setQ(e.target.value); setIdx(0); }}
            placeholder="Search cases, properties, officers, pages…"
            style={{ flex:1, background:'transparent', border:'none', outline:'none', fontFamily:F.body, fontSize:14, color:T.t1 }} />
          {q && <button onClick={() => setQ('')} style={{ background:'transparent', border:'none', color:T.t3, cursor:'pointer', fontSize:16 }}>×</button>}
          <span style={{ fontFamily:F.mono, fontSize:10, color:T.t3, background:T.card, padding:'2px 6px', borderRadius:3 }}>ESC</span>
        </div>

        {/* Results */}
        <div ref={listRef} style={{ maxHeight:440, overflowY:'auto' }}>
          {results.length === 0 ? (
            <div style={{ padding:'32px 18px', textAlign:'center', color:T.t3, fontFamily:F.mono, fontSize:12 }}>No results for "{q}"</div>
          ) : (
            <>
              {!q && <div style={{ padding:'8px 18px 4px', fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase' }}>Quick Navigation</div>}
              {results.map((item, i) => (
                <div key={i}
                  onClick={() => { onNavigate(item.role, item.page, item.data); onClose(); }}
                  style={{ display:'flex', gap:12, alignItems:'center', padding:'12px 18px', cursor:'pointer', borderBottom:`1px solid rgba(36,54,40,0.3)`, background: i === selectedIdx ? T.card : 'transparent', transition:'background 0.1s' }}
                  onMouseEnter={() => setIdx(i)}>
                  <div style={{ width:34, height:34, borderRadius:7, background:`${typeColor[item.type]}15`, border:`1px solid ${typeColor[item.type]}30`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ fontFamily:F.mono, fontSize:9, fontWeight:700, color:typeColor[item.type] }}>{item.type.slice(0,2).toUpperCase()}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:2 }}>{item.title}</div>
                    <div style={{ fontSize:11, color:T.t3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.sub}</div>
                  </div>
                  <span style={{ fontFamily:F.mono, fontSize:9, color:typeColor[item.type], textTransform:'uppercase', letterSpacing:1, flexShrink:0 }}>{item.tag}</span>
                </div>
              ))}
            </>
          )}
        </div>

        <div style={{ padding:'8px 18px', borderTop:`1px solid ${T.border}`, display:'flex', gap:16 }}>
          {[['↑↓','Navigate'],['↵','Open'],['ESC','Close']].map(([k,l]) => (
            <div key={k} style={{ display:'flex', gap:5, alignItems:'center' }}>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.t3, background:T.card, padding:'2px 5px', borderRadius:2 }}>{k}</span>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── CASE NOTE WITH ATTACHMENT UI ─────────────────────────────────────────────
const CaseNoteInput = ({ caseId, onAdd }) => {
  const toast = useToast();
  const [text, setText]             = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isDragging, setDragging]   = useState(false);

  const addAttachment = (name) => {
    setAttachments(prev => [...prev, { name, size: Math.floor(Math.random() * 900 + 100) + ' KB', uploaded: new Date().toLocaleTimeString() }]);
    toast(`Attached: ${name}`, 'success');
  };

  const submit = () => {
    if (!text.trim() && !attachments.length) return;
    onAdd({ text, attachments, ts: new Date().toISOString().slice(0,16).replace('T',' '), by: 'Mgr. Acheampong' });
    setText(''); setAttachments([]);
  };

  return (
    <div style={{ marginTop:12 }}>
      <textarea value={text} onChange={e => setText(e.target.value)}
        className="rg-textarea" rows={3} placeholder="Add case note… or drop evidence files below" />

      {/* Drop zone */}
      <div
        onDragEnter={() => setDragging(true)} onDragLeave={() => setDragging(false)}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); setDragging(false); Array.from(e.dataTransfer.files).forEach(f => addAttachment(f.name)); }}
        onClick={() => addAttachment('Evidence_Photo_' + Date.now() + '.jpg')}
        style={{ border:`2px dashed ${isDragging ? T.green : T.border}`, borderRadius:6, padding:'10px 14px', marginTop:8, cursor:'pointer', textAlign:'center', transition:'all 0.2s', background:isDragging ? T.greenFade : 'transparent' }}>
        <span style={{ fontFamily:F.mono, fontSize:10, color:isDragging ? T.green : T.t3, letterSpacing:1 }}>
          {isDragging ? 'Drop to attach' : '↑ Drop evidence files or click to attach'}
        </span>
      </div>

      {attachments.length > 0 && (
        <div style={{ marginTop:8, display:'flex', flexWrap:'wrap', gap:6 }}>
          {attachments.map((a,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 10px', background:T.card, border:`1px solid ${T.border}`, borderRadius:5, fontSize:11 }}>
              <span style={{ color:T.t2 }}>{a.name}</span>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>{a.size}</span>
              <button onClick={() => setAttachments(p => p.filter((_,j) => j !== i))}
                style={{ background:'transparent', border:'none', color:T.t3, cursor:'pointer', fontSize:12, lineHeight:1, padding:'0 2px' }}>×</button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display:'flex', justifyContent:'flex-end', marginTop:8 }}>
        <button className="rg-btn rg-btn-primary" style={{ fontSize:11 }}
          disabled={!text.trim() && !attachments.length}
          onClick={submit}>Add Note {attachments.length > 0 ? `+ ${attachments.length} file${attachments.length>1?'s':''}` : ''}</button>
      </div>
    </div>
  );
};
