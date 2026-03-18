import { useState, useEffect, useRef } from "react";
import React from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BRIDGE 2025 ANNUAL INTELLIGENCE REVIEW
   Full Members Edition · January 2026
   Full-year retrospective across all 12 sectors with updated venture scoring,
   market shifts, and priorities heading into 2026.
═══════════════════════════════════════════════════════════════════════════ */

const C = {
  ink:       '#0D1A10',
  paper:     '#FAF8F3',
  paperDark: '#F0EDE4',
  forest:    '#1B4D3E',
  lime:      '#B8D935',
  limeDark:  '#8FA825',
  muted:     '#5C6B5E',
  faint:     '#9AAA9C',
  border:    '#D8D4C8',
  red:       '#A8200D',
  amber:     '#B8730A',
  positive:  '#1A6B2F',
  white:     '#FFFFFF',
  teal:      '#2E5A4D',
};

const F = {
  display: '"Playfair Display","Georgia",serif',
  body:    '"Source Serif 4","Georgia",serif',
  sans:    '"DM Sans","Helvetica Neue",sans-serif',
  mono:    '"DM Mono","Courier New",monospace',
};

/* ── Sector Data ─────────────────────────────────────────────────────────── */
const SECTORS = [
  {
    id:1, num:'01', name:'Infrastructure & Basic Services', shortName:'Infrastructure',
    pillar:'Foundation', score2024:74, score2025:79, delta:'+5',
    capital:'$8–15M', ventures:15,
    highlight:'Kejetia Market Platform moves from concept to deployment. Digital commerce infrastructure now serves 10,000+ traders.',
    shift:'Government EUR 155M rural connectivity investment creates last-mile platform opportunity across all 12 sectors.',
    priority2026:'Scale Kejetia model to 400+ major markets. Accelerate WASH co-investment with UNICEF and government agencies.',
    ventureUpdates:[
      {name:'Kejetia Market Platform',tier:'Tier 1',score:88,movement:'+8','capital':'$2–4M',status:'Active Deployment'},
      {name:'WASH Network Expansion',tier:'Tier 1',score:82,movement:'+4','capital':'$1.5–3M',status:'Pilot Complete'},
      {name:'Rural Connectivity (Last Mile)',tier:'Tier 2',score:71,movement:'+11','capital':'$1–2.5M',status:'Partnership Scoping'},
      {name:'Municipal Waste Management',tier:'Tier 2',score:65,movement:'+3','capital':'$800K–1.5M',status:'Research'},
    ],
    risk:'Medium', riskNote:'Government partnership dependency; procurement cycle delays.',
  },
  {
    id:2, num:'02', name:'Financial Inclusion & Economic Security', shortName:'Financial Inclusion',
    pillar:'Foundation', score2024:81, score2025:85, delta:'+4',
    capital:'$10–20M', ventures:18,
    highlight:'Digital Credit Directive (2025) unlocks formal credit extension to 40% previously unserved population. $4–6B SME opportunity crystallized.',
    shift:'Mobile money transaction volumes grew 34% YoY. Warehouse receipt financing pilots show 94% repayment rates.',
    priority2026:'Deploy structured SME credit fund. Scale microinsurance products. Activate cooperative banking network.',
    ventureUpdates:[
      {name:'SME Credit Platform',tier:'Tier 1',score:91,movement:'+6','capital':'$3–6M',status:'Active Deployment'},
      {name:'Microinsurance Network',tier:'Tier 1',score:84,movement:'+7','capital':'$2–4M',status:'Pilot Launched'},
      {name:'Warehouse Receipt Finance',tier:'Tier 1',score:80,movement:'+12','capital':'$2–4M',status:'Pilot Complete'},
      {name:'Cooperative Banking Hub',tier:'Tier 2',score:73,movement:'+5','capital':'$1.5–3M',status:'Design Phase'},
    ],
    risk:'Low', riskNote:'Regulatory environment strengthening; Bank of Ghana alignment strong.',
  },
  {
    id:3, num:'03', name:'Health Systems & Wellbeing', shortName:'Health Systems',
    pillar:'Human Capital', score2024:69, score2025:74, delta:'+5',
    capital:'$8–16M', ventures:15,
    highlight:'1:6,000 physician-to-patient ratio creates structural telemedicine opportunity. National Health Insurance reforms improve payment infrastructure.',
    shift:'Post-COVID community health worker networks demonstrate scalability. Pharmaceutical supply chain vulnerabilities exposed and mapped.',
    priority2026:'Deploy telemedicine platform across 5 regions. Pharmaceutical cold chain infrastructure. Community diagnostics network.',
    ventureUpdates:[
      {name:'Telemedicine Platform',tier:'Tier 1',score:83,movement:'+9','capital':'$2–4M',status:'Pilot Launched'},
      {name:'Pharmaceutical Supply Chain',tier:'Tier 1',score:77,movement:'+5','capital':'$1.5–3M',status:'Research Complete'},
      {name:'Diagnostic Lab Network',tier:'Tier 2',score:70,movement:'+6','capital':'$1–2M',status:'Design Phase'},
      {name:'Community Health Hubs',tier:'Tier 2',score:68,movement:'+4','capital':'$800K–1.5M',status:'Scoping'},
    ],
    risk:'Medium', riskNote:'NHIA reimbursement infrastructure; regulatory approval timelines.',
  },
  {
    id:4, num:'04', name:'Technology & Innovation', shortName:'Technology',
    pillar:'Growth Engine', score2024:77, score2025:84, delta:'+7',
    capital:'$8–15M', ventures:15,
    highlight:'EUR 155M government connectivity investment + Equiano/2Africa cable upgrades double addressable digital market. 23.4M mobile money users represent Africa\'s deepest per-capita platform base.',
    shift:'Ghana tech startup ecosystem raised $127M in 2024. AgriTech, HealthTech, and FinTech verticals show strongest traction.',
    priority2026:'Application layer deployment across Agriculture, Health, Education. Government tech partnership for data infrastructure.',
    ventureUpdates:[
      {name:'AgriTech Platform',tier:'Tier 1',score:87,movement:'+10','capital':'$2–3.5M',status:'Active Deployment'},
      {name:'FinTech Credit Engine',tier:'Tier 1',score:84,movement:'+7','capital':'$2–4M',status:'Partnership Phase'},
      {name:'HealthTech Diagnostics',tier:'Tier 2',score:75,movement:'+8','capital':'$1–2M',status:'Pilot Design'},
      {name:'EdTech Skills Platform',tier:'Tier 2',score:72,movement:'+5','capital':'$800K–1.5M',status:'Research'},
    ],
    risk:'Low', riskNote:'Talent pipeline; infrastructure deployment timeline dependencies.',
  },
  {
    id:5, num:'05', name:'Education & Skills', shortName:'Education & Skills',
    pillar:'Human Capital', score2024:71, score2025:76, delta:'+5',
    capital:'$16–33M', ventures:15,
    highlight:'21% youth unemployment rate creates urgency. Government TVET modernization program opens $600M co-investment corridor. Skills-to-employment pipeline model validated.',
    shift:'Free SHS generation entering workforce; absorptive capacity crisis emerging. Employer-led training model gaining traction.',
    priority2026:'TVET modernization co-investment. Skills-to-employment pipeline with manufacturing and logistics sectors. EdTech platform deployment.',
    ventureUpdates:[
      {name:'TVET Modernization Program',tier:'Tier 1',score:85,movement:'+8','capital':'$5–10M',status:'Partnership Scoping'},
      {name:'Skills-to-Employment Pipeline',tier:'Tier 1',score:81,movement:'+11','capital':'$3–6M',status:'Pilot Launched'},
      {name:'Professional Certification Hub',tier:'Tier 2',score:73,movement:'+4','capital':'$1.5–3M',status:'Design Phase'},
      {name:'EdTech Learning Platform',tier:'Tier 2',score:70,movement:'+7','capital':'$1–2M',status:'Research'},
    ],
    risk:'Medium', riskNote:'Government procurement pace; employer engagement sustainability.',
  },
  {
    id:6, num:'06', name:'Agriculture & Value Chains', shortName:'Agriculture',
    pillar:'Economic Engine', score2024:78, score2025:86, delta:'+8',
    capital:'$12–22M', ventures:18,
    highlight:'$1.9B annual post-harvest loss remains primary intervention point. GH₵6.9B Oil Palm allocation signals largest productive sector budget in Ghana\'s history. Ejura Hub business plan complete.',
    shift:'Tomato processing pilot demonstrates 94% loss reduction. Cooperative Capital Fund structure validated with 70,000+ farm members. Cocoa processing target (50% domestic by 2030) creates $400M+ opportunity.',
    priority2026:'Ejura Agricultural Hub Phase 1 deployment. Scale solar cold storage network. Activate Cooperative Capital Fund.',
    ventureUpdates:[
      {name:'Ejura Agricultural Hub',tier:'Tier 1',score:90,movement:'+12','capital':'$3–6M',status:'Deployment Ready'},
      {name:'Solar Cold Storage Network',tier:'Tier 1',score:85,movement:'+9','capital':'$800K–1.5M',status:'Pilot Complete'},
      {name:'Cooperative Capital Fund',tier:'Tier 1',score:82,movement:'+11','capital':'$2–4M',status:'Structure Finalized'},
      {name:'Tomato Processing Facility',tier:'Tier 1',score:84,movement:'+8','capital':'$1.5–3M',status:'Site Identified'},
      {name:'Shea Processing Export',tier:'Tier 2',score:74,movement:'+6','capital':'$1–2.5M',status:'Market Research'},
    ],
    risk:'Medium', riskNote:'Climate variability; seasonal cash flow management for cooperatives.',
  },
  {
    id:7, num:'07', name:'Sports, Entertainment & Creative Industries', shortName:'Creative Industries',
    pillar:'Growth Engine', score2024:65, score2025:70, delta:'+5',
    capital:'$10–20M', ventures:14,
    highlight:'Ghana creative economy reaches $1B+ annually. Music and film exports growing 18% YoY. Diaspora cultural economy connections strengthen Year of Return momentum.',
    shift:'Streaming platform penetration enables direct artist-to-audience revenue. Sports academy model validated in Accra — replication pipeline identified.',
    priority2026:'Sports academy network expansion. Music distribution platform. Film production infrastructure co-investment.',
    ventureUpdates:[
      {name:'Sports Academy Network',tier:'Tier 1',score:78,movement:'+8','capital':'$3–6M',status:'Pilot Active'},
      {name:'Music Distribution Platform',tier:'Tier 2',score:72,movement:'+7','capital':'$1–2.5M',status:'Design Phase'},
      {name:'Film Production Hub',tier:'Tier 2',score:68,movement:'+5','capital':'$2–4M',status:'Scoping'},
      {name:'Fashion Export Program',tier:'Tier 2',score:65,movement:'+3','capital':'$800K–1.5M',status:'Research'},
    ],
    risk:'Medium', riskNote:'IP protection environment; export market access complexity.',
  },
  {
    id:8, num:'08', name:'Housing & Real Estate', shortName:'Housing',
    pillar:'Foundation', score2024:72, score2025:75, delta:'+3',
    capital:'$15–25M', ventures:12,
    highlight:'1.8M unit housing deficit growing at 100,000/year. Affordable housing finance gap represents $8B+ opportunity. Government rent-to-own policy creates new pathway.',
    shift:'Construction materials import substitution becoming viable as manufacturing sector strengthens. Modular construction pilots show 35% cost reduction.',
    priority2026:'Affordable housing finance vehicle launch. Modular construction pilot scale-up. Rental management platform.',
    ventureUpdates:[
      {name:'Affordable Housing Finance',tier:'Tier 1',score:81,movement:'+6','capital':'$5–10M',status:'Structure Design'},
      {name:'Modular Construction Co.',tier:'Tier 1',score:76,movement:'+9','capital':'$3–6M',status:'Pilot Active'},
      {name:'Rental Management Platform',tier:'Tier 2',score:68,movement:'+5','capital':'$1–2M',status:'Research'},
      {name:'Construction Materials JV',tier:'Tier 2',score:65,movement:'+3','capital':'$2–4M',status:'Scoping'},
    ],
    risk:'High', riskNote:'Interest rate environment; land title complexity; construction cost inflation.',
  },
  {
    id:9, num:'09', name:'Tourism & Hospitality', shortName:'Tourism',
    pillar:'Growth Engine', score2024:67, score2025:73, delta:'+6',
    capital:'$10–18M', ventures:15,
    highlight:'Year of Return momentum sustained. Heritage tourism market growing 22% annually. Diaspora-linked travel segment shows strongest per-visitor spend.',
    shift:'Cape Coast and Kumasi emerging as tier-two destinations with infrastructure investment. Eco-tourism corridor along Volta attracting new investors.',
    priority2026:'Heritage tourism circuit infrastructure. Hospitality training pipeline. Diaspora experience platform.',
    ventureUpdates:[
      {name:'Heritage Tourism Circuit',tier:'Tier 1',score:79,movement:'+10','capital':'$3–6M',status:'Partnership Phase'},
      {name:'Hospitality Training Institute',tier:'Tier 1',score:74,movement:'+7','capital':'$2–3.5M',status:'Pilot Design'},
      {name:'Diaspora Experience Platform',tier:'Tier 2',score:70,movement:'+8','capital':'$1–2M',status:'Concept Validated'},
      {name:'Eco-Tourism Corridor',tier:'Tier 2',score:66,movement:'+5','capital':'$1.5–3M',status:'Scoping'},
    ],
    risk:'Medium', riskNote:'Seasonal demand concentration; infrastructure gap outside Accra.',
  },
  {
    id:10, num:'10', name:'Energy & Renewable Resources', shortName:'Energy',
    pillar:'Foundation', score2024:76, score2025:82, delta:'+6',
    capital:'$10–20M', ventures:15,
    highlight:'4–6 kWh/m²/day solar potential remains severely underutilized. 42% of Ghanaians lack reliable electricity. Off-grid C&I solar market growing 40% YoY.',
    shift:'Energy Transition Plan commitments signal $2B+ renewable deployment target. Mini-grid licensing simplified. Net metering regulations finalized.',
    priority2026:'C&I solar portfolio deployment. Mini-grid network in underserved regions. Energy storage solutions for health and cold chain sectors.',
    ventureUpdates:[
      {name:'C&I Solar Portfolio',tier:'Tier 1',score:88,movement:'+9','capital':'$3–6M',status:'Active Deployment'},
      {name:'Mini-Grid Network',tier:'Tier 1',score:83,movement:'+7','capital':'$2–4M',status:'Pilot Active'},
      {name:'Agricultural Solar (Cold Chain)',tier:'Tier 1',score:81,movement:'+11','capital':'$1.5–3M',status:'Integration Phase'},
      {name:'Energy Storage Solutions',tier:'Tier 2',score:72,movement:'+6','capital':'$1–2M',status:'Research'},
    ],
    risk:'Low', riskNote:'Grid interconnection regulatory process; financing cost structures.',
  },
  {
    id:11, num:'11', name:'Manufacturing & Light Industry', shortName:'Manufacturing',
    pillar:'Economic Engine', score2024:68, score2025:75, delta:'+7',
    capital:'$8–18M', ventures:12,
    highlight:'2026 Budget creates 27,000 new garment jobs pipeline. Agro-processing represents $180M+ import substitution opportunity. "Ghana Beyond Aid" industrial policy creates protected sector status.',
    shift:'Tomato paste, textile, and building materials identified as immediate import substitution plays. AfCFTA market access beginning to materialize for Ghanaian manufacturers.',
    priority2026:'Agro-processing facility network. Textile manufacturing co-investment. Construction materials domestic production.',
    ventureUpdates:[
      {name:'Agro-Processing Facility',tier:'Tier 1',score:84,movement:'+12','capital':'$2–4M',status:'Site Secured'},
      {name:'Textile Manufacturing Hub',tier:'Tier 1',score:79,movement:'+9','capital':'$3–6M',status:'Partnership Phase'},
      {name:'Building Materials Plant',tier:'Tier 2',score:71,movement:'+7','capital':'$2–3.5M',status:'Feasibility'},
      {name:'Pharmaceutical Manufacturing',tier:'Tier 2',score:67,movement:'+5','capital':'$1.5–3M',status:'Research'},
    ],
    risk:'Medium', riskNote:'Input cost volatility; skilled labor availability; power reliability.',
  },
  {
    id:12, num:'12', name:'Transportation & Logistics', shortName:'Transport & Logistics',
    pillar:'Foundation', score2024:70, score2025:76, delta:'+6',
    capital:'$8–17M', ventures:12,
    highlight:'45% of road network in poor condition represents both risk and opportunity. Last-mile logistics gap costs the agricultural sector $600M+ annually. Port digitization reduces clearance time 40%.',
    shift:'E-commerce growth driving last-mile delivery demand. Cold chain logistics becoming critical infrastructure link for agriculture and health sectors.',
    priority2026:'Last-mile logistics network deployment. Cold chain integration with agriculture. Port operations digital platform.',
    ventureUpdates:[
      {name:'Last-Mile Logistics Network',tier:'Tier 1',score:82,movement:'+9','capital':'$2–4M',status:'Pilot Active'},
      {name:'Cold Chain Logistics Co.',tier:'Tier 1',score:79,movement:'+11','capital':'$1.5–3M',status:'Integration Phase'},
      {name:'Port Digital Platform',tier:'Tier 2',score:72,movement:'+6','capital':'$1–2.5M',status:'Partnership Scoping'},
      {name:'Fleet Management Platform',tier:'Tier 2',score:68,movement:'+4','capital':'$800K–1.5M',status:'Research'},
    ],
    risk:'Medium', riskNote:'Road infrastructure government dependency; fuel cost variability.',
  },
];

const MACRO_INDICATORS = [
  {label:'GDP (2025 Est.)', value:'$76B', note:'Lower-middle income; significant growth headroom'},
  {label:'GDP Growth Rate', value:'4.7%', note:'Sustained post-IMF adjustment trajectory'},
  {label:'Population', value:'33M+', note:'21% youth unemployment — skills priority'},
  {label:'Inflation (Dec 2025)', value:'18.4%', note:'Down from 54% peak in 2022'},
  {label:'Mobile Money Users', value:'23.4M', note:'Africa\'s deepest per-capita market'},
  {label:'2026 Budget (Productive)', value:'GH₵8.9B', note:'Agriculture, energy, infrastructure, tech'},
  {label:'IMF ECF Program', value:'Active', note:'Largest in Ghana\'s history — stability anchor'},
  {label:'Housing Deficit', value:'1.8M units', note:'Growing 100,000/year — structural opportunity'},
];

const PORTFOLIO_STATS = [
  {val:'174+', lbl:'Identified Ventures', sub:'Across 12 sectors'},
  {val:'$135–259M', lbl:'Portfolio Range', sub:'Full deployment target'},
  {val:'12', lbl:'Integrated Sectors', sub:'Four strategic pillars'},
  {val:'78.4', lbl:'Avg BRIDGE Score', sub:'Up from 72.1 in 2024'},
];

const POLICY_HIGHLIGHTS = [
  {tag:'BUDGET 2026', title:'GH₵8.9B Productive Sector Allocation', sector:'Cross-Sector', impact:'High', note:'Agriculture (GH₵6.9B oil palm), infrastructure, energy, and tech all receive increased allocations. Direct co-investment corridor for BRIDGE across 8 of 12 sectors.'},
  {tag:'FINANCIAL', title:'Digital Credit Directive', sector:'Financial Inclusion', impact:'High', note:'Unlocks formal credit extension to 40% previously unserved population. Enables BRIDGE SME Credit Platform regulatory pathway.'},
  {tag:'ENERGY', title:'Energy Transition Plan', sector:'Energy', impact:'High', note:'$2B+ renewable deployment target with simplified mini-grid licensing. Net metering regulations finalized — C&I solar economics improve materially.'},
  {tag:'AGRICULTURE', title:'Sankofa Agriculture Initiative', sector:'Agriculture', impact:'High', note:'5-year moratorium on loan repayment for oil palm processors. BRIDGE positioned as co-financing partner and service delivery operator.'},
  {tag:'TECHNOLOGY', title:'EUR 155M Rural Connectivity', sector:'Technology', impact:'High', note:'2,016 new telecom sites + NGIC 4,400 site plan doubles addressable digital market. Last-mile platform opportunity for BRIDGE.'},
  {tag:'TRADE', title:'AfCFTA Market Access', sector:'Manufacturing', impact:'Medium', note:'Ghanaian manufacturers gaining access to continental market. Priority sectors: textiles, agro-processing, pharmaceuticals.'},
];

const CROSS_SECTOR_THEMES = [
  {
    title:'The Cold Chain Nexus',
    sectors:['Agriculture','Energy','Transport & Logistics','Health Systems'],
    insight:'Post-harvest loss ($1.9B), pharmaceutical distribution failure, and agricultural value capture are all manifestations of the same infrastructure gap. A solar-powered cold chain network simultaneously serves agriculture, health, and logistics — three sectors, one capital deployment.',
    capital:'$4–8M integrated deployment',
  },
  {
    title:'The Digital Commerce Stack',
    sectors:['Infrastructure','Financial Inclusion','Technology','Transport & Logistics'],
    insight:'Kejetia Market Platform digitizes commerce; Financial Inclusion sector provides credit to formalized traders; Technology sector builds the application layer; Logistics sector enables fulfillment. The four sectors create a complete digital commerce ecosystem.',
    capital:'$8–15M integrated deployment',
  },
  {
    title:'The Skills-to-Employment Pipeline',
    sectors:['Education & Skills','Manufacturing','Technology','Agriculture'],
    insight:'21% youth unemployment is not a supply problem — it\'s a mismatch problem. BRIDGE structures training programs directly linked to manufacturing, agricultural processing, and technology ventures in the portfolio. Human capital and economic capital deploy together.',
    capital:'$6–12M integrated deployment',
  },
  {
    title:'The Energy Enablement Layer',
    sectors:['Energy','Agriculture','Health Systems','Manufacturing'],
    insight:'Reliable power is the prerequisite for every productive sector venture. C&I solar and mini-grid deployments are structured as infrastructure for BRIDGE portfolio companies — not standalone ventures. Energy investment yields returns across 8+ other sectors.',
    capital:'$5–10M integrated deployment',
  },
];

const YEAR_REVIEW_MILESTONES = [
  {q:'Q1 2025', items:['Ejura Agricultural Hub site secured and business plan finalized','Digital Credit Directive regulatory approval received','SME Credit Platform pilot launched with 340 businesses','Energy Transition Plan commitments announced']},
  {q:'Q2 2025', items:['Kejetia Market Platform Phase 1 deployed (10,000+ traders onboarded)','Solar Cold Storage Network pilot complete — 94% loss reduction demonstrated','Cooperative Capital Fund structure finalized with 70,000 farm members','Telemedicine Platform pilot launched across 3 regions']},
  {q:'Q3 2025', items:['AfCFTA market access begins materializing for manufacturing ventures','Heritage Tourism Circuit partnership agreements signed','Sports Academy Network Accra pilot achieves 400+ student enrollment','Last-Mile Logistics Network pilot deploys in 4 cities']},
  {q:'Q4 2025', items:['2026 Budget analysis confirms GH₵8.9B productive sector alignment','Annual portfolio review: average BRIDGE Score up 6.3 points YoY','12th sector (Transport & Logistics) integration complete','2026 Priority Investment Roadmap approved by BRIDGE leadership']},
];

const PRIORITIES_2026 = [
  {rank:1, sector:'Agriculture & Value Chains', action:'Ejura Hub Phase 1 + Scale Cold Storage + Cooperative Fund Activation', capital:'$6–12M', timeline:'H1 2026', rationale:'GH₵6.9B government allocation + proven pilot results + structural $1.9B loss opportunity'},
  {rank:2, sector:'Energy & Renewable Resources', action:'C&I Solar Portfolio Deployment + Mini-Grid Network Phase 2', capital:'$5–10M', timeline:'H1 2026', rationale:'Enables 6 other portfolio sectors. Best risk-adjusted return in portfolio.'},
  {rank:3, sector:'Financial Inclusion', action:'SME Credit Fund Launch + Microinsurance Scale', capital:'$5–10M', timeline:'H1 2026', rationale:'Digital Credit Directive creates regulatory window. 94% repayment rate validated.'},
  {rank:4, sector:'Technology & Innovation', action:'AgriTech Platform + FinTech Credit Engine Deployment', capital:'$4–7M', timeline:'H2 2026', rationale:'Application layer for connectivity infrastructure government is building.'},
  {rank:5, sector:'Infrastructure', action:'Kejetia Scale to 400 Markets + WASH Phase 2', capital:'$3–7M', timeline:'Ongoing', rationale:'Flagship deployment model validated. EUR 155M government infrastructure investment de-risks expansion.'},
  {rank:6, sector:'Manufacturing', action:'Agro-Processing Facility + Textile Hub Partnership', capital:'$5–10M', timeline:'H2 2026', rationale:'27,000 job pipeline + AfCFTA access + import substitution economics confirmed.'},
];

/* ══════════════════════════════════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════════════════════════════════ */

const Gf = () => (<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .dc::first-letter{font-family:${F.display};font-size:4.2em;font-weight:900;float:left;line-height:0.82;margin:0.06em 0.1em 0 0;color:${C.forest};}
  @media print{.np{display:none!important;}}
  /* Mobile carousel */
  .mob-scroller{display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;scrollbar-width:none;gap:10px;-webkit-overflow-scrolling:touch;padding-bottom:4px;}
  .mob-scroller::-webkit-scrollbar{display:none;}
  .mob-snap-card{flex:0 0 85vw;scroll-snap-align:start;min-width:0;}
  .mob-show{display:none;}
  @media(max-width:900px){
    .tc{grid-template-columns:1fr!important;}
    .hm{display:none!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-gate{padding:40px 32px!important;}
    .pad-footer{padding:14px 32px!important;}
    .pad-topbar{padding:10px 24px!important;}
    .tc3{grid-template-columns:1fr 1fr!important;}
  }
  @media(max-width:600px){
    .tc{grid-template-columns:1fr!important;}
    .tc2{grid-template-columns:1fr!important;}
    .tc3{grid-template-columns:1fr!important;}
    .pad-section{padding:28px 18px!important;}
    .pad-cover{padding:20px 18px 0!important;}
    .pad-gate{padding:28px 18px!important;}
    .pad-footer{padding:20px 18px!important;}
    .pad-topbar{padding:9px 16px!important;}
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}
    .mob-full{width:100%!important;}
    .mob-item-hidden{display:none!important;}
    .mob-toggle{display:flex!important;align-items:center;justify-content:space-between;width:100%;padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};}
    .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
    .stats-row>div{flex:0 0 50%!important;border-left:none!important;border-top:1px solid rgba(255,255,255,0.08)!important;padding-left:0!important;padding-right:12px!important;}
    .stats-row>div:nth-child(2){border-left:1px solid rgba(255,255,255,0.08)!important;padding-left:16px!important;}
    .stats-row>div:nth-child(4){border-left:1px solid rgba(255,255,255,0.08)!important;padding-left:16px!important;}
    .footer-links{display:none!important;}
    .footer-inner{justify-content:center!important;}
    .gate-value-line{display:none!important;}
    .gate-cta-row{flex-direction:column!important;}
    .gate-cta-row a{justify-content:center!important;}
    .toc-row{pointer-events:none!important;}
    .toc-arrow{display:none!important;}
    .sector-table-row{flex-direction:column!important;gap:4px!important;}
    .milestone-grid{grid-template-columns:1fr!important;}
    .priority-row{flex-direction:column!important;gap:6px!important;}
    /* Fixed footer nav clearance */
    .page-root{padding-bottom:58px!important;}
    /* Cover subhead — tighter on mobile */
    .cover-sub{font-size:13px!important;line-height:1.6!important;}
    /* Sector selector — horizontal scroll on mobile */
    .sector-sel{overflow-x:auto;flex-wrap:nowrap!important;padding-bottom:6px;-webkit-overflow-scrolling:touch;}
    .sector-sel::-webkit-scrollbar{display:none;}
    /* Scorecard table — hide grid columns, show compact rows */
    .score-table-row{grid-template-columns:28px 1fr 50px 50px 44px!important;gap:0 8px!important;}
    .score-col-hide{display:none!important;}
  }
  @media(min-width:601px){
    .toc-row{cursor:pointer;transition:background 0.15s ease;}
    .toc-row:hover{background:rgba(255,255,255,0.06)!important;}
    .toc-row:hover .toc-label{color:rgba(250,248,243,0.95)!important;}
    .toc-row:hover .toc-arrow{opacity:1!important;}
    .toc-arrow{opacity:0;transition:opacity 0.15s ease;font-family:"DM Mono","Courier New",monospace;font-size:10px;color:#B8D935;margin-left:auto;padding-left:8px;}
  }
`}</style>);

/* ══════════════════════════════════════════════════════════════════════════
   LOGO
══════════════════════════════════════════════════════════════════════════ */

const Logo = ({ height = 28, variant = 'white' }) => {
  const tf = variant === 'white' ? '#ffffff' : '#1B4D3E';
  const bk = variant === 'white' ? 'rgba(0,0,0,0.08)' : 'rgba(27,77,62,0.15)';
  return (
    <svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}>
      <rect fill="none" stroke={tf} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6" />
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1" />
      <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z" />
      <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z" />
      <path fill={tf} stroke={bk} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z" />
      <path fill={tf} stroke={bk} strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z" />
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145" />
      <rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z" />
      <path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z" />
      <rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7" />
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7" />
    </svg>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   isMobile HOOK
══════════════════════════════════════════════════════════════════════════ */

const useIsMobile = () => {
  const [mob, setMob] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 600 : false
  );
  useEffect(() => {
    const fn = () => setMob(window.innerWidth <= 600);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mob;
};

/* ══════════════════════════════════════════════════════════════════════════
   SECTION REGISTRY — anchors for footer nav dots
══════════════════════════════════════════════════════════════════════════ */

const SECS = [
  { id: 'sec-intro',      label: "Editor's Note"           },
  { id: 'sec-macro',      label: 'Macro Context'           },
  { id: 'sec-scorecard',  label: '12-Sector Scorecard'     },
  { id: 'sec-ventures',   label: 'Venture Movement'        },
  { id: 'sec-milestones', label: '2025 Milestones'         },
  { id: 'sec-policy',     label: 'Policy Alignment'        },
  { id: 'sec-cross',      label: 'Cross-Sector'            },
  { id: 'sec-roadmap',    label: '2026 Roadmap'            },
  { id: 'sec-engagement', label: 'Engagement'              },
  { id: 'sec-membership', label: 'Membership'              },
];

/* ══════════════════════════════════════════════════════════════════════════
   READING PROGRESS BAR (replaces TopBar)
   — 2px lime progress line at bottom of bar, 0.1s linear
   — Logo slides in once cover masthead exits viewport
   — Section label shows active section on mobile
══════════════════════════════════════════════════════════════════════════ */

const ReadingProgressBar = ({ coverLogoRef }) => {
  const [pct, setPct] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [activeLabel, setActiveLabel] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => {
      // Reading progress
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
      // Logo reveal
      if (coverLogoRef?.current) {
        setLogoVisible(coverLogoRef.current.getBoundingClientRect().bottom < 0);
      }
      // Active section label
      for (let i = SECS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECS[i].id);
        if (el && el.getBoundingClientRect().top <= 80) {
          setActiveLabel(SECS[i].label);
          break;
        }
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, [coverLogoRef]);

  return (
    <div className="np pad-topbar" style={{
      position: 'sticky', top: 0, zIndex: 100, background: C.paper,
      borderBottom: `1px solid ${C.border}`,
      padding: '10px 40px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden',
    }}>
      {/* Progress line — absolute bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: '2px',
        width: `${pct}%`, background: C.lime,
        transition: 'width 0.1s linear', pointerEvents: 'none',
      }} />

      {/* Left: logo reveal + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, overflow: 'hidden' }}>
        <div style={{
          overflow: 'hidden',
          maxWidth: logoVisible ? '180px' : '0px',
          opacity: logoVisible ? 1 : 0,
          transition: 'max-width 0.35s ease, opacity 0.3s ease',
          display: 'flex', alignItems: 'center', flexShrink: 0,
        }}>
          <Logo height={18} variant="dark" />
          <div style={{ width: '1px', height: '14px', background: C.border, margin: '0 10px', flexShrink: 0 }} />
        </div>
        {/* Desktop: static label */}
        <span className="mob-hide" style={{ fontFamily: F.sans, fontSize: '11px', color: C.muted, whiteSpace: 'nowrap' }}>
          Annual Intelligence Review · 2025 · Full Members Edition
        </span>
        {/* Mobile: active section label */}
        <span className="mob-show" style={{ display: 'none', fontFamily: F.sans, fontSize: '11px', fontWeight: 700, color: C.forest, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
          {activeLabel || 'Annual Review 2025'}
        </span>
      </div>

      {/* Right: CTAs */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
        <a href="#sec-membership" className="mob-hide" style={{ fontFamily: F.sans, fontSize: '11px', fontWeight: 700, color: C.forest, textDecoration: 'none' }}>Membership →</a>
        <button onClick={() => window.print()} style={{
          background: C.forest, color: C.lime, border: 'none',
          padding: isMobile ? '6px 12px' : '7px 14px',
          fontFamily: F.sans, fontSize: '10px', fontWeight: 700, cursor: 'pointer',
          letterSpacing: '0.3px',
        }}>
          {isMobile ? 'PDF' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   SECTION FOOTER NAV
   Fixed bottom bar — section label + dot indicators + prev/next arrows
   Visible on both desktop and mobile
══════════════════════════════════════════════════════════════════════════ */

const SectionFooterNav = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = SECS.findIndex(s => s.id === e.target.id);
          if (idx >= 0) setActive(idx);
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    SECS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(SECS.length - 1, idx));
    const el = document.getElementById(SECS[clamped].id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(clamped);
  };

  return (
    <div className="np" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      background: 'rgba(13,26,16,0.97)', borderTop: `1px solid rgba(184,217,53,0.15)`,
      backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '10px 20px', gap: '12px',
    }}>
      {/* ← Prev */}
      <button onClick={() => goTo(active - 1)} disabled={active === 0}
        style={{
          width: '34px', height: '34px', flexShrink: 0,
          background: active === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.1)', cursor: active === 0 ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: active === 0 ? 0.3 : 1, transition: 'all 0.2s',
        }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke={C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Center: label + dots */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: 0, overflow: 'hidden' }}>
        <div style={{
          fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%',
        }}>
          <span style={{ color: C.lime, marginRight: '6px' }}>§ {String(active + 1).padStart(2, '0')}</span>
          {SECS[active]?.label}
        </div>
        {/* Dots */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {SECS.map((s, i) => (
            <div key={i} onClick={() => goTo(i)} title={s.label} style={{
              width: i === active ? '20px' : '6px', height: '6px', borderRadius: '3px',
              background: i === active ? C.lime : 'rgba(255,255,255,0.18)',
              cursor: 'pointer', transition: 'all 0.3s ease', flexShrink: 0,
            }} />
          ))}
        </div>
      </div>

      {/* → Next */}
      <button onClick={() => goTo(active + 1)} disabled={active === SECS.length - 1}
        style={{
          width: '34px', height: '34px', flexShrink: 0,
          background: active === SECS.length - 1 ? 'rgba(255,255,255,0.03)' : C.forest,
          border: `1px solid ${active === SECS.length - 1 ? 'rgba(255,255,255,0.1)' : 'rgba(184,217,53,0.2)'}`,
          cursor: active === SECS.length - 1 ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: active === SECS.length - 1 ? 0.3 : 1, transition: 'all 0.2s',
        }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke={C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   COVER
══════════════════════════════════════════════════════════════════════════ */

const Cover = ({ logoRef }) => (
  <div style={{
    background: C.ink,
    display: 'flex', flexDirection: 'column',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Watermark */}
    <div className="mob-hide" style={{
      position: 'absolute', right: '-2vw', bottom: '0',
      fontFamily: F.display, fontSize: 'clamp(100px,18vw,260px)', fontWeight: 900,
      color: 'rgba(255,255,255,0.035)', lineHeight: 1, userSelect: 'none',
      letterSpacing: '-10px', pointerEvents: 'none', whiteSpace: 'nowrap',
    }}>2025</div>

    {/* Left lime rule */}
    <div className="mob-hide" style={{ position: 'absolute', left: '56px', top: 0, bottom: 0, width: '3px', background: C.lime }} />

    {/* Masthead */}
    <div ref={logoRef} className="pad-cover" style={{
      padding: '20px 56px 20px 80px',
      borderBottom: `1px solid rgba(255,255,255,0.08)`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexShrink: 0, position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Logo height={26} variant="white" />
        <div className="mob-hide" style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.12)' }} />
        <span className="mob-hide" style={{ fontFamily: F.mono, fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '1.5px' }}>ANNUAL INTELLIGENCE REVIEW</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="mob-hide" style={{ fontFamily: F.sans, fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>January 2026</span>
        <span style={{
          fontFamily: F.sans, fontSize: '9px', fontWeight: 700, color: C.lime,
          letterSpacing: '2px', textTransform: 'uppercase',
          border: `1px solid rgba(184,217,53,0.4)`, padding: '4px 12px',
        }}>Full Members Edition</span>
      </div>
    </div>

    {/* Hero body — all content flows naturally, no height tricks */}
    <div style={{ padding: '56px clamp(20px,6vw,80px) 0', position: 'relative' }}>
      <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: C.lime, marginBottom: '18px' }}>
        The Architecture of Progress — A Year in Review
      </div>
      <h1 style={{
        fontFamily: F.display,
        fontSize: 'clamp(52px,8vw,108px)',
        fontWeight: 900, color: C.paper,
        lineHeight: 0.93, letterSpacing: '-3px',
        marginBottom: '28px',
      }}>
        BRIDGE<br />
        <em style={{ color: C.lime, fontStyle: 'italic', fontWeight: 700 }}>2025.</em>
      </h1>
      <p className="cover-sub" style={{
        maxWidth: '500px', fontFamily: F.body,
        fontSize: 'clamp(13px,1.3vw,15px)',
        fontStyle: 'italic', lineHeight: 1.75,
        color: 'rgba(250,248,243,0.45)',
        marginBottom: '48px',
      }}>
        Full-year retrospective across all 12 sectors. Updated BRIDGE Impact Scores™, venture-level movement tracking, macro context shifts, cross-sector integration analysis, and the 2026 Priority Investment Roadmap.
      </p>

      {/* Stats strip */}
      <div className="stats-row" style={{
        display: 'flex', flexWrap: 'wrap',
        borderTop: `1px solid rgba(255,255,255,0.08)`,
        paddingTop: '24px', paddingBottom: '40px',
      }}>
        {PORTFOLIO_STATS.map((s, i) => (
          <div key={i} style={{
            flex: '1 1 25%',
            paddingLeft: i > 0 ? '20px' : '0',
            paddingRight: '20px',
            borderLeft: i > 0 ? `1px solid rgba(255,255,255,0.08)` : 'none',
          }}>
            <div style={{ fontFamily: F.mono, fontSize: 'clamp(15px,2vw,22px)', fontWeight: 500, color: C.lime, lineHeight: 1, marginBottom: '5px' }}>{s.val}</div>
            <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', lineHeight: 1.3 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   EDITOR'S NOTE
══════════════════════════════════════════════════════════════════════════ */

const EditorsNote = () => (
  <div id="sec-intro" className="pad-section" style={{ background: C.paper, padding: '48px 64px' }}>
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ borderTop: `6px solid ${C.ink}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '24px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px', alignItems: 'start' }} className="tc">
        <div>
          <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.muted, marginBottom: '16px' }}>Editor's Note</div>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, color: C.ink, lineHeight: 1.2, marginBottom: '20px' }}>
            Seeing Ghana Clearly
          </h2>
          <p className="dc" style={{ fontFamily: F.body, fontSize: '15px', lineHeight: 1.9, color: C.ink, fontWeight: 300, marginBottom: '16px' }}>
            Ghana stands at a remarkable inflection point. After decades of steady economic growth disrupted by fiscal imbalances and external shocks, the country is navigating a decisive period of reform, recovery, and repositioning. The 2025 IMF Extended Credit Facility — the largest in Ghana's history — has imposed a fiscal discipline that, while painful in the short term, is creating the macroeconomic stability that private capital requires.
          </p>
          <p style={{ fontFamily: F.body, fontSize: '15px', lineHeight: 1.9, color: C.ink, fontWeight: 300, marginBottom: '16px' }}>
            Inflation, which peaked at 54% in late 2022, declined to 18.4% by December 2025. The cedi has stabilized. And the 2026 national budget, with GH₵6.9 billion earmarked for oil palm development alone, signals a government turning decisively toward productive sector investment. This is the alignment moment BRIDGE was built for.
          </p>
          <p style={{ fontFamily: F.body, fontSize: '15px', lineHeight: 1.9, color: C.ink, fontWeight: 300, marginBottom: '24px' }}>
            This Annual Review covers the full year: what we deployed, what we learned, where the data shifted, and how 2026 priorities have been recalibrated. For the first time, all 12 sectors are reviewed simultaneously — allowing us to see the cross-sector integration patterns that no single-sector analysis can reveal. The numbers are compelling. The direction is clear.
          </p>
          {/* Pull quote */}
          <div style={{ borderLeft: `4px solid ${C.lime}`, paddingLeft: '20px', margin: '28px 0' }}>
            <p style={{ fontFamily: F.display, fontSize: '17px', fontWeight: 600, fontStyle: 'italic', color: C.forest, lineHeight: 1.6 }}>
              The question is no longer whether Ghana's development opportunity is real. The question is who will organize the capital, expertise, and relationships to make it tangible.
            </p>
          </div>
        </div>

        {/* Right: document guide */}
        <div>
          <div style={{ background: C.ink, padding: '20px', marginBottom: '16px' }}>
            <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.lime, marginBottom: '12px' }}>This Document</div>
            {[
              { sec: '01', label: 'Macro Context & 2025 Review', href: '#sec-macro' },
              { sec: '02', label: '12-Sector Scorecard',          href: '#sec-scorecard' },
              { sec: '03', label: 'Venture Movement Analysis',    href: '#sec-ventures' },
              { sec: '04', label: 'Policy & Budget Alignment',    href: '#sec-policy' },
              { sec: '05', label: 'Cross-Sector Integration',     href: '#sec-cross' },
              { sec: '06', label: '2026 Priority Roadmap',        href: '#sec-roadmap' },
              { sec: '07', label: 'Engagement & Membership',      href: '#sec-engagement' },
            ].map((item, i) => (
              <a key={i} href={item.href} className="toc-row"
                style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '7px 8px', marginLeft: '-8px', marginRight: '-8px',
                  borderBottom: i < 6 ? `1px solid rgba(255,255,255,0.06)` : 'none', textDecoration: 'none' }}>
                <span style={{ fontFamily: F.mono, fontSize: '10px', color: C.lime, flexShrink: 0, minWidth: '20px' }}>{item.sec}</span>
                <span className="toc-label" style={{ fontFamily: F.sans, fontSize: '11px', color: 'rgba(250,248,243,0.6)', transition: 'color 0.15s ease' }}>{item.label}</span>
                <span className="toc-arrow">→</span>
              </a>
            ))}
          </div>
          <div style={{ background: C.paperDark, padding: '16px', border: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.muted, marginBottom: '8px' }}>Members Edition Includes</div>
            {['All 174+ venture scores & movement','Cross-sector integration analysis','2026 Priority Investment Roadmap','Full policy alignment documentation','Deployment parameter tables per sector'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '4px 0' }}>
                <span style={{ color: C.lime, fontSize: '10px', flexShrink: 0, marginTop: '2px' }}>→</span>
                <span style={{ fontFamily: F.body, fontSize: '11px', color: C.muted }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   MACRO CONTEXT
══════════════════════════════════════════════════════════════════════════ */

const MacroContext = () => {
  const [open, setOpen] = useState(false);
  return (
    <div id="sec-macro" className="pad-section" style={{ background: C.paperDark, padding: '48px 64px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ borderTop: `6px solid ${C.ink}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '24px' }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
          <span style={{ fontFamily: F.mono, fontSize: '11px', fontStyle: 'italic', color: C.limeDark }}>01</span>
          <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 800, color: C.faint, letterSpacing: '3px', textTransform: 'uppercase' }}>Macro Context</span>
        </div>
        <h2 style={{ fontFamily: F.display, fontSize: 'clamp(20px,3vw,36px)', fontWeight: 700, color: C.ink, lineHeight: 1.2, marginBottom: '12px' }}>
          Ghana at the Alignment Moment
        </h2>
        <p style={{ fontFamily: F.body, fontSize: '15px', color: C.muted, lineHeight: 1.7, marginBottom: '32px', maxWidth: '600px' }}>
          The macroeconomic foundation private capital requires is now present. Key development indicators and what they mean for BRIDGE deployment.
        </p>

        {/* Indicators grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', marginBottom: '32px', background: C.border, border: `1px solid ${C.border}` }} className="tc3">
          {MACRO_INDICATORS.map((m, i) => (
            <div key={i} style={{ padding: '18px 16px', background: C.paper, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px', background: C.lime }} />
              <div style={{ fontFamily: F.mono, fontSize: '20px', fontWeight: 500, color: C.forest, lineHeight: 1.1, marginBottom: '5px' }}>{m.value}</div>
              <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, color: C.ink, marginBottom: '3px' }}>{m.label}</div>
              <div style={{ fontFamily: F.body, fontSize: '11px', color: C.faint, lineHeight: 1.45 }}>{m.note}</div>
            </div>
          ))}
        </div>

        {/* 2025 narrative */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="tc">
          <div>
            <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.muted, marginBottom: '12px' }}>What Changed in 2025</div>
            <p style={{ fontFamily: F.body, fontSize: '14px', lineHeight: 1.85, color: C.ink, fontWeight: 300, marginBottom: '12px' }}>
              The IMF Extended Credit Facility program delivered its intended macroeconomic stabilization. Inflation declined from 23.2% at the start of 2025 to 18.4% by year-end — the first sustained sub-20% reading since 2021. The cedi, while still recovering, showed markedly reduced volatility.
            </p>
            <p style={{ fontFamily: F.body, fontSize: '14px', lineHeight: 1.85, color: C.ink, fontWeight: 300, marginBottom: '12px' }}>
              The 2026 national budget represents the clearest signal of productive sector reorientation yet. GH₵8.9 billion allocated to agriculture, infrastructure, energy, manufacturing, and technology — sectors that represent 83% of the BRIDGE portfolio by capital range. Government and private capital are now moving in the same direction.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.muted, marginBottom: '12px' }}>The Investment Case</div>
            <p style={{ fontFamily: F.body, fontSize: '14px', lineHeight: 1.85, color: C.ink, fontWeight: 300, marginBottom: '12px' }}>
              Ghana's productive sectors — agriculture, manufacturing, technology, and services — never fully caught up with consumption growth. The country remained a raw-material exporter, processing very little domestically, importing what it could produce, leaving structural value gaps across every sector BRIDGE has mapped.
            </p>
            <p style={{ fontFamily: F.body, fontSize: '14px', lineHeight: 1.85, color: C.ink, fontWeight: 300, marginBottom: '12px' }}>
              These are not intractable poverty indicators. They represent incomplete systems in a country with demonstrated democratic governance, significant natural resources, a young and growing labor force, and Africa's most sophisticated mobile money market. The opportunity is structural, not aspirational.
            </p>
            <div style={{ borderLeft: `4px solid ${C.lime}`, paddingLeft: '16px', marginTop: '16px' }}>
              <p style={{ fontFamily: F.display, fontSize: '14px', fontWeight: 600, fontStyle: 'italic', color: C.forest, lineHeight: 1.55 }}>
                Co-investing alongside government capital is alignment strategy. When private capital flows into the same sectors as public capital, the probability of systemic improvement compounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   12-SECTOR SCORECARD
══════════════════════════════════════════════════════════════════════════ */

const SectorScorecard = () => {
  const [open, setOpen] = useState(false);
  const SHOW = 5;
  return (
    <div id="sec-scorecard" className="pad-section" style={{ background: C.paper, padding: '48px 64px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ borderTop: `6px solid ${C.ink}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '24px' }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
          <span style={{ fontFamily: F.mono, fontSize: '11px', fontStyle: 'italic', color: C.limeDark }}>02</span>
          <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 800, color: C.faint, letterSpacing: '3px', textTransform: 'uppercase' }}>Annual Scorecard</span>
        </div>
        <h2 style={{ fontFamily: F.display, fontSize: 'clamp(20px,3vw,36px)', fontWeight: 700, color: C.ink, lineHeight: 1.2, marginBottom: '12px' }}>
          12-Sector BRIDGE Impact Score™ Review
        </h2>
        <p style={{ fontFamily: F.body, fontSize: '15px', color: C.muted, lineHeight: 1.7, marginBottom: '32px', maxWidth: '600px' }}>
          Year-on-year score movement across all 12 sectors. Average portfolio score improved from 72.1 (2024) to 78.4 (2025) — a +6.3 point composite gain.
        </p>

        {/* Table header */}
        <div className="score-table-row" style={{
          display: 'grid', gridTemplateColumns: '28px 36px 1fr 80px 80px 60px 100px',
          gap: '0 12px', padding: '8px 12px',
          background: C.forest, marginBottom: '2px'
        }}>
          {[
            { label: '',       hide: false },
            { label: '#',      hide: false },
            { label: 'Sector', hide: false },
            { label: '2024',   hide: false },
            { label: '2025',   hide: false },
            { label: 'Δ',      hide: false },
            { label: 'Pillar', hide: true  },
          ].map((h, i) => (
            <div key={i} className={h.hide ? 'score-col-hide' : ''} style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(250,248,243,0.45)' }}>{h.label}</div>
          ))}
        </div>

        {/* Toggle button (mobile) */}
        <button className="mob-toggle" onClick={() => setOpen(o => !o)}>
          <span>All 12 Sectors</span>
          <span className="mob-show" style={{ display: 'none' }}>{open ? '↑' : '↓'}</span>
        </button>

        {SECTORS.map((s, i) => {
          const hidden = i >= SHOW && !open;
          return (
            <div key={s.id} className={`${hidden ? 'mob-item-hidden' : ''} score-table-row`}
              style={{
                display: 'grid', gridTemplateColumns: '28px 36px 1fr 80px 80px 60px 100px',
                gap: '0 12px', padding: '10px 12px', alignItems: 'center',
                borderBottom: `1px solid ${C.border}`,
                background: i % 2 === 0 ? C.paper : C.paperDark,
              }}>
              {/* Score bar mini */}
              <div style={{ height: '32px', width: '4px', background: C.border, position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${s.score2025}%`, background: C.lime }} />
              </div>
              <div style={{ fontFamily: F.mono, fontSize: '11px', fontWeight: 700, color: C.faint }}>{s.num}</div>
              <div>
                <div style={{ fontFamily: F.sans, fontSize: '12px', fontWeight: 700, color: C.ink }}>{s.shortName}</div>
                <div style={{ fontFamily: F.sans, fontSize: '10px', color: C.faint, marginTop: '2px' }}>{s.ventures}+ ventures · {s.capital}</div>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: '14px', fontWeight: 500, color: C.muted }}>{s.score2024}</div>
              <div style={{ fontFamily: F.mono, fontSize: '16px', fontWeight: 700, color: C.forest }}>{s.score2025}</div>
              <div style={{ fontFamily: F.mono, fontSize: '13px', fontWeight: 700, color: C.positive }}>{s.delta}</div>
              <div className="score-col-hide" style={{
                fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '0.5px',
                color: s.pillar === 'Foundation' ? C.forest : s.pillar === 'Human Capital' ? C.teal : s.pillar === 'Economic Engine' ? C.amber : C.muted,
                textTransform: 'uppercase'
              }}>{s.pillar}</div>
            </div>
          );
        })}

        {/* Show more (desktop) */}
        {!open && (
          <button onClick={() => setOpen(true)} className="mob-hide" style={{
            marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px',
            background: 'transparent', border: `1px solid ${C.border}`, padding: '8px 16px',
            cursor: 'pointer', fontFamily: F.sans, fontSize: '11px', fontWeight: 700, color: C.muted
          }}>
            View remaining {SECTORS.length - SHOW} sectors ↓
          </button>
        )}

        {/* Portfolio summary bar */}
        <div style={{ marginTop: '28px', background: C.border, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px' }} className="tc3">
          {[
            { label: 'Avg Score 2024', val: '72.1', color: C.faint },
            { label: 'Avg Score 2025', val: '78.4', color: C.lime },
            { label: 'YoY Movement',  val: '+6.3', color: C.positive },
            { label: 'Core Tier',     val: '8/12',  color: C.lime },
          ].map((item, i) => (
            <div key={i} style={{ background: C.ink, padding: '18px 20px' }}>
              <div style={{ fontFamily: F.mono, fontSize: '22px', fontWeight: 500, color: item.color, lineHeight: 1 }}>{item.val}</div>
              <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   VENTURE MOVEMENT ANALYSIS
══════════════════════════════════════════════════════════════════════════ */

const VentureMovement = () => {
  const [activeSector, setActiveSector] = useState(0);
  const s = SECTORS[activeSector];
  return (
    <div id="sec-ventures" className="pad-section" style={{ background: C.paperDark, padding: '48px 64px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ borderTop: `6px solid ${C.ink}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '24px' }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
          <span style={{ fontFamily: F.mono, fontSize: '11px', fontStyle: 'italic', color: C.limeDark }}>03</span>
          <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 800, color: C.faint, letterSpacing: '3px', textTransform: 'uppercase' }}>Venture Analysis</span>
        </div>
        <h2 style={{ fontFamily: F.display, fontSize: 'clamp(20px,3vw,36px)', fontWeight: 700, color: C.ink, lineHeight: 1.2, marginBottom: '12px' }}>
          Venture Movement & Updated Scoring
        </h2>
        <p style={{ fontFamily: F.body, fontSize: '15px', color: C.muted, lineHeight: 1.7, marginBottom: '24px', maxWidth: '600px' }}>
          Year-on-year score movement for key ventures across all 12 sectors. Select a sector to view venture-level detail.
        </p>

        {/* Sector selector */}
        <div className="sector-sel" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '24px' }}>
          {SECTORS.map((sec, i) => (
            <button key={i} onClick={() => setActiveSector(i)} style={{
              fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1px',
              textTransform: 'uppercase', padding: '5px 10px',
              background: activeSector === i ? C.lime : 'transparent',
              color: activeSector === i ? C.ink : C.muted,
              border: `1px solid ${activeSector === i ? C.lime : C.border}`,
              cursor: 'pointer', transition: 'all 0.15s ease'
            }}>
              {sec.num}
            </button>
          ))}
        </div>

        {/* Active sector detail */}
        <div style={{ background: C.paper, border: `1px solid ${C.border}` }}>
          {/* Sector header */}
          <div style={{ background: C.forest, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: '10px', color: C.lime, marginBottom: '4px' }}>{s.num} · {s.pillar.toUpperCase()}</div>
              <div style={{ fontFamily: F.sans, fontSize: '14px', fontWeight: 700, color: C.paper }}>{s.name}</div>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: F.mono, fontSize: '22px', fontWeight: 500, color: C.lime }}>{s.score2025}</div>
                <div style={{ fontFamily: F.sans, fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>2025 SCORE</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: F.mono, fontSize: '22px', fontWeight: 500, color: C.positive }}>{s.delta}</div>
                <div style={{ fontFamily: F.sans, fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>YOY MOVE</div>
              </div>
            </div>
          </div>

          {/* Highlight + shift */}
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="tc">
            <div>
              <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.muted, marginBottom: '8px' }}>2025 Highlight</div>
              <p style={{ fontFamily: F.body, fontSize: '12px', lineHeight: 1.7, color: C.ink, fontWeight: 300 }}>{s.highlight}</p>
            </div>
            <div>
              <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.muted, marginBottom: '8px' }}>Market Shift</div>
              <p style={{ fontFamily: F.body, fontSize: '12px', lineHeight: 1.7, color: C.ink, fontWeight: 300 }}>{s.shift}</p>
            </div>
          </div>

          {/* Venture table */}
          <div style={{ padding: '0 20px 16px' }}>
            <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.muted, padding: '12px 0 8px', borderBottom: `1px solid ${C.border}` }}>
              Venture Pipeline
            </div>
            {s.ventureUpdates.map((v, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 0', borderBottom: i < s.ventureUpdates.length - 1 ? `1px solid ${C.border}` : 'none',
                flexWrap: 'wrap', gap: '6px'
              }}>
                <div style={{ flex: '1', minWidth: '160px' }}>
                  <div style={{ fontFamily: F.sans, fontSize: '12px', fontWeight: 700, color: C.ink }}>{v.name}</div>
                  <div style={{ fontFamily: F.sans, fontSize: '10px', color: C.faint, marginTop: '2px' }}>{v.tier} · {v.capital}</div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: F.mono, fontSize: '16px', fontWeight: 700, color: C.forest }}>{v.score}</div>
                    <div style={{ fontFamily: F.sans, fontSize: '9px', color: C.faint }}>Score</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: F.mono, fontSize: '14px', fontWeight: 700, color: C.positive }}>{v.movement}</div>
                    <div style={{ fontFamily: F.sans, fontSize: '9px', color: C.faint }}>Move</div>
                  </div>
                  <div style={{
                    fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '0.5px',
                    padding: '4px 8px',
                    background: v.status === 'Active Deployment' || v.status === 'Deployment Ready' ? `${C.positive}18` :
                      v.status === 'Pilot Complete' || v.status === 'Pilot Launched' || v.status === 'Pilot Active' ? `${C.teal}18` :
                        `${C.muted}12`,
                    color: v.status === 'Active Deployment' || v.status === 'Deployment Ready' ? C.positive :
                      v.status === 'Pilot Complete' || v.status === 'Pilot Launched' || v.status === 'Pilot Active' ? C.teal :
                        C.muted,
                  }}>{v.status}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 2026 Priority */}
          <div style={{ background: C.paperDark, padding: '14px 20px', borderTop: `1px solid ${C.border}` }}>
            <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.muted }}>2026 Priority: </span>
            <span style={{ fontFamily: F.body, fontSize: '12px', color: C.ink, fontStyle: 'italic' }}>{s.priority2026}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   YEAR IN MILESTONES
══════════════════════════════════════════════════════════════════════════ */

const YearMilestones = () => {
  const [open, setOpen] = useState(false);
  return (
    <div id="sec-milestones" className="pad-section" style={{ background: C.ink, padding: '48px 64px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ borderTop: `6px solid ${C.lime}`, borderBottom: `2px solid rgba(184,217,53,0.3)`, paddingBottom: '3px', marginBottom: '24px' }} />
        <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.lime, marginBottom: '16px' }}>2025 · Year in Review</div>
        <h2 style={{ fontFamily: F.display, fontSize: 'clamp(20px,3vw,34px)', fontWeight: 700, fontStyle: 'italic', color: C.paper, lineHeight: 1.25, marginBottom: '32px', maxWidth: '580px' }}>
          Key Milestones Across the Portfolio
        </h2>

        <button className="mob-toggle mob-toggle-dark" onClick={() => setOpen(o => !o)}>
          <span>All Quarters</span>
          <span className="mob-show" style={{ display: 'none' }}>{open ? '↑' : '↓'}</span>
        </button>

        <div className="milestone-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
          {YEAR_REVIEW_MILESTONES.map((q, qi) => (
            <div key={qi} className={qi >= 2 && !open ? 'mob-item-hidden' : ''}
              style={{ background: 'rgba(255,255,255,0.04)', padding: '20px', border: `1px solid rgba(255,255,255,0.06)` }}>
              <div style={{ fontFamily: F.mono, fontSize: '11px', color: C.lime, marginBottom: '12px', fontWeight: 700 }}>{q.q}</div>
              {q.items.map((item, ii) => (
                <div key={ii} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ color: C.lime, fontSize: '10px', flexShrink: 0, marginTop: '3px' }}>—</span>
                  <span style={{ fontFamily: F.body, fontSize: '12px', color: 'rgba(250,248,243,0.65)', lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   POLICY & BUDGET ALIGNMENT
══════════════════════════════════════════════════════════════════════════ */

const PolicyAlignment = () => {
  const [open, setOpen] = useState(false);
  const SHOW = 3;
  return (
    <div id="sec-policy" className="pad-section" style={{ background: C.paper, padding: '48px 64px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ borderTop: `6px solid ${C.ink}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '24px' }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
          <span style={{ fontFamily: F.mono, fontSize: '11px', fontStyle: 'italic', color: C.limeDark }}>04</span>
          <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 800, color: C.faint, letterSpacing: '3px', textTransform: 'uppercase' }}>Policy & Budget</span>
        </div>
        <h2 style={{ fontFamily: F.display, fontSize: 'clamp(20px,3vw,36px)', fontWeight: 700, color: C.ink, lineHeight: 1.2, marginBottom: '12px' }}>
          2025–2026 Policy & Budget Alignment
        </h2>
        <p style={{ fontFamily: F.body, fontSize: '15px', color: C.muted, lineHeight: 1.7, marginBottom: '28px', maxWidth: '600px' }}>
          When government capital and private capital flow into the same sectors, risk-adjusted returns improve and deployment timelines compress. These are the key policy developments that reshape BRIDGE sector priorities.
        </p>

        <button className="mob-toggle" onClick={() => setOpen(o => !o)}>
          <span>Policy Highlights</span>
          <span className="mob-show" style={{ display: 'none' }}>{open ? '↑' : '↓'}</span>
        </button>

        {POLICY_HIGHLIGHTS.map((p, i) => (
          <div key={i} className={i >= SHOW && !open ? 'mob-item-hidden' : ''}
            style={{
              padding: '16px', marginBottom: '2px',
              borderLeft: `4px solid ${p.impact === 'High' ? C.positive : C.amber}`,
              background: i % 2 === 0 ? C.paper : C.paperDark,
              display: 'grid', gridTemplateColumns: '1fr 90px', gap: '16px', alignItems: 'start'
            }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', color: C.lime, textTransform: 'uppercase' }}>{p.tag}</span>
                <span style={{ fontFamily: F.sans, fontSize: '11px', color: C.faint }}>·</span>
                <span style={{ fontFamily: F.sans, fontSize: '10px', color: C.teal }}>{p.sector}</span>
              </div>
              <div style={{ fontFamily: F.sans, fontSize: '13px', fontWeight: 700, color: C.ink, marginBottom: '6px' }}>{p.title}</div>
              <p style={{ fontFamily: F.body, fontSize: '12px', lineHeight: 1.65, color: C.muted, fontWeight: 300 }}>{p.note}</p>
            </div>
            <div style={{
              fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px',
              padding: '5px 10px', textAlign: 'center', alignSelf: 'flex-start',
              background: p.impact === 'High' ? `${C.positive}18` : `${C.amber}18`,
              color: p.impact === 'High' ? C.positive : C.amber,
              textTransform: 'uppercase'
            }}>
              {p.impact} Impact
            </div>
          </div>
        ))}

        {!open && (
          <button onClick={() => setOpen(true)} style={{
            marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px',
            background: 'transparent', border: `1px solid ${C.border}`, padding: '8px 16px',
            cursor: 'pointer', fontFamily: F.sans, fontSize: '11px', fontWeight: 700, color: C.muted
          }}>
            View remaining {POLICY_HIGHLIGHTS.length - SHOW} policy items ↓
          </button>
        )}

        {/* Budget strip */}
        <div className="tc budget-strip" style={{ marginTop: '28px', background: C.border, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px' }}>
          {[
            { val: 'GH₵8.9B', lbl: 'Total productive sector allocation' },
            { val: 'GH₵6.9B', lbl: 'Oil Palm — single budget line item' },
            { val: '8 of 12', lbl: 'BRIDGE sectors with direct budget alignment' },
          ].map((item, i) => (
            <div key={i} style={{ background: C.forest, padding: '20px' }}>
              <div style={{ fontFamily: F.mono, fontSize: '22px', fontWeight: 500, color: C.lime, marginBottom: '4px' }}>{item.val}</div>
              <div style={{ fontFamily: F.sans, fontSize: '11px', color: 'rgba(250,248,243,0.5)' }}>{item.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   CROSS-SECTOR INTEGRATION
══════════════════════════════════════════════════════════════════════════ */

const CrossSectorIntegration = () => (
  <div id="sec-cross" className="pad-section" style={{ background: C.paperDark, padding: '48px 64px' }}>
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ borderTop: `6px solid ${C.ink}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '24px' }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
        <span style={{ fontFamily: F.mono, fontSize: '11px', fontStyle: 'italic', color: C.limeDark }}>05</span>
        <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 800, color: C.faint, letterSpacing: '3px', textTransform: 'uppercase' }}>Integration Analysis</span>
      </div>
      <h2 style={{ fontFamily: F.display, fontSize: 'clamp(20px,3vw,36px)', fontWeight: 700, color: C.ink, lineHeight: 1.2, marginBottom: '12px' }}>
        Cross-Sector Integration Opportunities
      </h2>
      <p style={{ fontFamily: F.body, fontSize: '15px', color: C.muted, lineHeight: 1.7, marginBottom: '12px', maxWidth: '640px' }}>
        BRIDGE's integrated framework is what distinguishes a development intelligence organization from a traditional investment fund. These are the four highest-value cross-sector integration patterns identified in the 2025 analysis.
      </p>
      <div style={{ borderLeft: `4px solid ${C.lime}`, paddingLeft: '20px', margin: '24px 0' }}>
        <p style={{ fontFamily: F.display, fontSize: '17px', fontWeight: 600, fontStyle: 'italic', color: C.forest, lineHeight: 1.6 }}>
          Most development initiatives fail not because the analysis is wrong, but because the intervention is too narrow. Ghana's development challenges are interconnected, and so must be their solutions.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }} className="tc">
        {CROSS_SECTOR_THEMES.map((theme, i) => (
          <div key={i} style={{ background: C.paper, padding: '20px', border: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
              {theme.sectors.map((sec, si) => (
                <span key={si} style={{
                  fontFamily: F.sans, fontSize: '9px', fontWeight: 700,
                  letterSpacing: '0.5px', padding: '3px 8px',
                  background: `${C.forest}14`, color: C.forest, border: `1px solid ${C.forest}30`
                }}>{sec}</span>
              ))}
            </div>
            <div style={{ fontFamily: F.sans, fontSize: '13px', fontWeight: 700, color: C.ink, marginBottom: '8px' }}>{theme.title}</div>
            <p style={{ fontFamily: F.body, fontSize: '12px', lineHeight: 1.7, color: C.muted, fontWeight: 300, marginBottom: '12px' }}>{theme.insight}</p>
            <div style={{ fontFamily: F.mono, fontSize: '11px', color: C.positive, fontWeight: 700 }}>{theme.capital}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   2026 PRIORITY ROADMAP
══════════════════════════════════════════════════════════════════════════ */

const PriorityRoadmap = () => {
  const [open, setOpen] = useState(false);
  return (
    <div id="sec-roadmap" className="pad-section" style={{ background: C.paper, padding: '48px 64px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ borderTop: `6px solid ${C.ink}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '24px' }} />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
          <span style={{ fontFamily: F.mono, fontSize: '11px', fontStyle: 'italic', color: C.limeDark }}>06</span>
          <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 800, color: C.faint, letterSpacing: '3px', textTransform: 'uppercase' }}>2026 Roadmap</span>
        </div>
        <h2 style={{ fontFamily: F.display, fontSize: 'clamp(20px,3vw,36px)', fontWeight: 700, color: C.ink, lineHeight: 1.2, marginBottom: '12px' }}>
          2026 Priority Investment Roadmap
        </h2>
        <p style={{ fontFamily: F.body, fontSize: '15px', color: C.muted, lineHeight: 1.7, marginBottom: '28px', maxWidth: '600px' }}>
          Priority deployments for 2026 ranked by urgency, feasibility, and portfolio integration value. Rationale for each priority is derived from the 2025 annual review findings.
        </p>

        <button className="mob-toggle" onClick={() => setOpen(o => !o)}>
          <span>Priority Rankings</span>
          <span className="mob-show" style={{ display: 'none' }}>{open ? '↑' : '↓'}</span>
        </button>

        {PRIORITIES_2026.map((p, i) => (
          <div key={i} className={i >= 3 && !open ? 'mob-item-hidden' : ''}
            style={{
              display: 'flex', gap: '16px', alignItems: 'flex-start',
              padding: '16px', marginBottom: '2px',
              background: i % 2 === 0 ? C.paper : C.paperDark,
              borderBottom: `1px solid ${C.border}`
            }}>
            {/* Rank */}
            <div style={{
              width: '32px', height: '32px', flexShrink: 0,
              background: i === 0 ? C.lime : i === 1 ? C.forest : C.border,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: F.mono, fontSize: '13px', fontWeight: 700,
              color: i === 0 ? C.ink : i === 1 ? C.paper : C.muted
            }}>
              {p.rank}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <div>
                  <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, color: C.lime, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>{p.sector}</div>
                  <div style={{ fontFamily: F.sans, fontSize: '13px', fontWeight: 700, color: C.ink }}>{p.action}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: F.mono, fontSize: '12px', fontWeight: 700, color: C.forest }}>{p.capital}</div>
                    <div style={{ fontFamily: F.sans, fontSize: '9px', color: C.faint }}>Capital Range</div>
                  </div>
                  <div style={{
                    fontFamily: F.sans, fontSize: '9px', fontWeight: 700, padding: '4px 8px', alignSelf: 'flex-start',
                    background: p.timeline === 'H1 2026' ? `${C.positive}18` : `${C.amber}18`,
                    color: p.timeline === 'H1 2026' ? C.positive : C.amber
                  }}>{p.timeline}</div>
                </div>
              </div>
              <p style={{ fontFamily: F.body, fontSize: '11px', lineHeight: 1.6, color: C.muted, fontStyle: 'italic' }}>{p.rationale}</p>
            </div>
          </div>
        ))}

        {!open && (
          <button onClick={() => setOpen(true)} style={{
            marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px',
            background: 'transparent', border: `1px solid ${C.border}`, padding: '8px 16px',
            cursor: 'pointer', fontFamily: F.sans, fontSize: '11px', fontWeight: 700, color: C.muted
          }}>
            View remaining {PRIORITIES_2026.length - 3} priorities ↓
          </button>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   ENGAGEMENT SECTION
══════════════════════════════════════════════════════════════════════════ */

const Engagement = () => (
  <div id="sec-engagement" className="pad-section" style={{ background: C.paperDark, padding: '48px 64px' }}>
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ borderTop: `6px solid ${C.ink}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: '3px', marginBottom: '24px' }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
        <span style={{ fontFamily: F.mono, fontSize: '11px', fontStyle: 'italic', color: C.limeDark }}>07</span>
        <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 800, color: C.faint, letterSpacing: '3px', textTransform: 'uppercase' }}>Engagement</span>
      </div>
      <h2 style={{ fontFamily: F.display, fontSize: 'clamp(20px,3vw,36px)', fontWeight: 700, color: C.ink, lineHeight: 1.2, marginBottom: '24px' }}>
        How to Engage with BRIDGE
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px' }} className="tc3">
        {[
          { mode: 'Capital Partners', who: 'Institutional investors, family offices, impact funds, HNW individuals', delivers: 'Co-investment in vetted BRIDGE ventures with structured financial returns and full impact reporting against the Peace & Prosperity framework.' },
          { mode: 'Government Partners', who: 'Ministries, agencies, development authorities', delivers: 'Implementation capacity, private capital mobilization, and policy alignment analysis to accelerate productive sector investment.' },
          { mode: 'Advisory Clients', who: 'Corporations entering Ghana, NGOs optimizing programs', delivers: 'Sector intelligence, stakeholder mapping, market entry strategy, and program design from BRIDGE\'s analytical team.' },
          { mode: 'Network Members', who: 'Researchers, diaspora professionals, business leaders', delivers: 'Full sector intelligence briefs, policy updates, venture pipeline access, and expert convening across BRIDGE\'s network.' },
          { mode: 'Diaspora Network', who: 'Ghanaian professionals globally', delivers: 'Skills deployment pathways, mentorship opportunities, and professional re-engagement channels within the BRIDGE ecosystem.' },
          { mode: 'Development Partners', who: 'DFIs, foundations, bilateral donors', delivers: 'Blended finance structures, first-loss capital arrangements, and co-design of catalytic investment programs.' },
        ].map((item, i) => (
          <div key={i} style={{ background: C.paper, padding: '18px', border: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: F.sans, fontSize: '11px', fontWeight: 700, color: C.forest, marginBottom: '6px' }}>{item.mode}</div>
            <div style={{ fontFamily: F.body, fontSize: '10px', fontStyle: 'italic', color: C.faint, marginBottom: '8px' }}>{item.who}</div>
            <p style={{ fontFamily: F.body, fontSize: '11px', lineHeight: 1.6, color: C.muted, fontWeight: 300 }}>{item.delivers}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   MEMBERSHIP CONVERSION FUNNEL
   Structure: Hook → Value proof → Tier comparison → Social proof →
              Objection handling → Primary CTA → Micro-commitment fallback
══════════════════════════════════════════════════════════════════════════ */

const ENGAGEMENT_MODES = [
  {
    id: 'capital',
    label: 'Capital Partner',
    tag: 'Highest Impact',
    threshold: '$10K–$1M+',
    thresholdNote: 'investment commitment',
    desc: 'You have the intelligence. Now deploy alongside it. Co-invest in vetted BRIDGE ventures with LP rights, quarterly reporting, and direct deal access.',
    items: [
      'LP rights in BRIDGE Fund(s)',
      'Venture co-investment pipeline — first access',
      'Quarterly investor reporting & portfolio updates',
      'Annual investor meeting and Ghana in-country tour',
      'Advisory Council eligibility',
      'Legacy recognition in BRIDGE initiatives',
    ],
    cta: 'Discuss Capital Partnership →',
    primary: true,
  },
  {
    id: 'contributor',
    label: 'Professional Contributor',
    tag: null,
    threshold: '$500–$2,000',
    thresholdNote: 'per year or 10+ hrs/quarter',
    desc: 'Contribute your expertise directly. Matched with advisory and mentorship opportunities, deal flow observer access, and recognition as a BRIDGE Professional Contributor.',
    items: [
      'Listed as BRIDGE Professional Contributor',
      'Advisory & mentorship opportunity matching',
      'Deal flow access (observer basis)',
      'Contributor retreats and convenings',
      'Direct BRIDGE leadership engagement',
      'OR: 10+ hours quarterly contribution in lieu of fee',
    ],
    cta: 'Express Interest',
    primary: false,
  },
  {
    id: 'advisory',
    label: 'Advisory Client',
    tag: null,
    threshold: 'Engagement-based',
    thresholdNote: 'scoped per mandate',
    desc: 'Commission BRIDGE\'s analytical team for bespoke work — market entry strategy, sector deep-dives, stakeholder mapping, program design, or government liaison support.',
    items: [
      'Dedicated BRIDGE analyst assigned',
      'Bespoke sector or cross-sector deep-dives',
      'Stakeholder mapping & introductions',
      'Market entry or program design advisory',
      'Policy alignment analysis on request',
      'Ongoing retainer or project-by-project',
    ],
    cta: 'Discuss a Mandate',
    primary: false,
  },
];

const ENGAGEMENT_OBJECTIONS = [
  {
    q: 'I already use the intelligence — what does deeper engagement add?',
    a: 'The intelligence tells you where the opportunity is. Deeper engagement puts you inside it. Capital partners co-invest alongside BRIDGE\'s vetted pipeline. Professional contributors shape the analytical work itself. Advisory clients get the team\'s judgment on their specific mandate — not just the published framework.',
  },
  {
    q: 'What does a capital partnership actually look like in practice?',
    a: 'BRIDGE structures co-investment through its fund vehicles, matching capital to specific ventures already assessed and sequenced in the pipeline. You receive LP rights, quarterly reporting, and direct co-investment opportunities at your chosen threshold — $10K, $50K, $250K, or $1M+. The Annual Investor Meeting includes an in-country Ghana tour.',
  },
  {
    q: 'Can I contribute expertise instead of capital?',
    a: 'Yes. Professional Contribution is structured as either a fee ($500–$2,000/year) or a time commitment of 10+ hours per quarter. BRIDGE matches contributors with advisory, mentorship, and deal-adjacent opportunities that fit their sector expertise and professional background.',
  },
  {
    q: 'How is advisory work scoped?',
    a: 'Each advisory mandate is scoped individually — some are project-based (market entry, program design), others are ongoing retainers for organizations who need continuous Ghana intelligence and stakeholder access. Write to us with your context and we will propose a structure.',
  },
];

const MembersGate = () => {
  const [openObj, setOpenObj] = useState(null);
  const [activeMode, setActiveMode] = useState('capital');

  return (
    <div id="sec-membership" style={{ background: C.ink, position: 'relative', overflow: 'hidden' }}>

      {/* ── HOOK — you have the map, now move ── */}
      <div className="pad-section" style={{ padding: '64px 64px 48px', position: 'relative' }}>
        <div style={{
          position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)',
          fontFamily: F.display, fontSize: 'clamp(100px,20vw,260px)', fontWeight: 900,
          color: 'rgba(255,255,255,0.025)', pointerEvents: 'none', userSelect: 'none',
          letterSpacing: '-8px', lineHeight: 1, whiteSpace: 'nowrap',
        }}>ENGAGE</div>

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ width: '28px', height: '2px', background: C.lime }} />
            <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: C.lime }}>
              Next Level · BRIDGE Engagement
            </span>
          </div>
          <h2 style={{
            fontFamily: F.display, fontSize: 'clamp(28px,5vw,58px)', fontWeight: 900,
            color: C.paper, lineHeight: 0.97, letterSpacing: '-2px', marginBottom: '28px',
          }}>
            You have the map.<br />
            <em style={{ color: C.lime, fontStyle: 'italic' }}>Now move.</em>
          </h2>
          <p style={{
            fontFamily: F.body, fontSize: '17px', lineHeight: 1.75,
            color: 'rgba(250,248,243,0.6)', maxWidth: '600px', marginBottom: '0',
            fontWeight: 300, fontStyle: 'italic',
          }}>
            As a Network Member you have the full intelligence picture — 174 ventures assessed, 12 sectors scored, 2026 priorities sequenced. The next step is not more reading. It is deploying capital, contributing expertise, or commissioning BRIDGE directly on your mandate.
          </p>
        </div>
      </div>

      {/* ── WHAT SETS MEMBERS APART — value already delivered ── */}
      <div className="pad-section" style={{ padding: '0 64px 48px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)' }} className="tc3">
            {[
              { val: '174+', label: 'Ventures you have scored' },
              { val: '12', label: 'Sectors fully mapped' },
              { val: '$135–259M', label: 'Portfolio range identified' },
              { val: '2026', label: 'Roadmap in your hands' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ fontFamily: F.mono, fontSize: '26px', fontWeight: 500, color: C.lime, lineHeight: 1, marginBottom: '6px' }}>{s.val}</div>
                <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ENGAGEMENT MODE CARDS ── */}
      <div className="pad-section" style={{ background: 'rgba(255,255,255,0.03)', padding: '48px 64px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '28px' }}>
            Engagement Pathways
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px' }} className="tc">
            {ENGAGEMENT_MODES.map((mode) => {
              const isActive = activeMode === mode.id;
              return (
                <div key={mode.id} onClick={() => setActiveMode(mode.id)} style={{
                  background: mode.primary ? C.forest : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${mode.primary ? C.lime : isActive && !mode.primary ? 'rgba(184,217,53,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  padding: '24px', cursor: 'pointer', position: 'relative',
                  transition: 'border-color 0.2s ease',
                }}>
                  {mode.tag && (
                    <div style={{
                      position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)',
                      background: C.lime, color: C.ink,
                      fontFamily: F.sans, fontSize: '8px', fontWeight: 800,
                      letterSpacing: '1.5px', textTransform: 'uppercase',
                      padding: '3px 10px', whiteSpace: 'nowrap',
                    }}>{mode.tag}</div>
                  )}
                  <div style={{ marginTop: mode.tag ? '12px' : '0' }}>
                    <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.lime, marginBottom: '10px' }}>
                      {mode.label}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                      <span style={{ fontFamily: F.mono, fontSize: '18px', fontWeight: 500, color: C.paper, lineHeight: 1 }}>{mode.threshold}</span>
                    </div>
                    <div style={{ fontFamily: F.sans, fontSize: '9px', color: 'rgba(250,248,243,0.3)', marginBottom: '12px' }}>{mode.thresholdNote}</div>
                    <p style={{ fontFamily: F.body, fontSize: '11px', fontStyle: 'italic', color: 'rgba(250,248,243,0.45)', lineHeight: 1.55, marginBottom: '18px' }}>
                      {mode.desc}
                    </p>
                    <div style={{ marginBottom: '20px' }}>
                      {mode.items.map((item, ii) => (
                        <div key={ii} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '5px 0', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
                          <span style={{ color: C.lime, fontSize: '10px', flexShrink: 0, marginTop: '3px', fontWeight: 700 }}>✓</span>
                          <span style={{ fontFamily: F.sans, fontSize: '11px', color: 'rgba(250,248,243,0.6)', lineHeight: 1.45 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <a href="#" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '8px', textDecoration: 'none',
                      padding: mode.primary ? '13px 20px' : '11px 20px',
                      background: mode.primary ? C.lime : 'transparent',
                      border: `1px solid ${mode.primary ? C.lime : 'rgba(255,255,255,0.2)'}`,
                      color: mode.primary ? C.ink : 'rgba(250,248,243,0.7)',
                      fontFamily: F.sans, fontSize: '11px', fontWeight: 800,
                      letterSpacing: '0.3px', transition: 'all 0.15s ease',
                    }}>
                      {mode.cta}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── STRATEGIC PARTNER note ── */}
      <div className="pad-section" style={{ padding: '32px 64px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ border: `1px solid rgba(184,217,53,0.15)`, padding: '20px 24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ width: '3px', background: C.lime, flexShrink: 0, alignSelf: 'stretch' }} />
            <div>
              <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.lime, marginBottom: '6px' }}>Tier 5 · Strategic Partners</div>
              <p style={{ fontFamily: F.body, fontSize: '13px', lineHeight: 1.7, color: 'rgba(250,248,243,0.5)', fontWeight: 300, margin: 0 }}>
                Strategic Partnerships ($1M+ investment or exceptional strategic value) include Board or Advisory Council seats, co-branding, named programs, and direct partnership on BRIDGE flagship projects. These relationships are by invitation — if you believe you qualify, <a href="#" style={{ color: 'rgba(184,217,53,0.6)', textDecoration: 'underline' }}>write to us directly</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── QUESTIONS ── */}
      <div className="pad-section" style={{ background: 'rgba(255,255,255,0.02)', padding: '48px 64px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '20px' }}>
            Questions
          </div>
          {ENGAGEMENT_OBJECTIONS.map((obj, i) => {
            const isOpen = openObj === i;
            return (
              <div key={i} style={{ borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
                <button onClick={() => setOpenObj(isOpen ? null : i)} style={{
                  display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 0', background: 'transparent', border: 'none', cursor: 'pointer',
                  textAlign: 'left', gap: '16px',
                }}>
                  <span style={{ fontFamily: F.sans, fontSize: '13px', fontWeight: 700, color: isOpen ? C.lime : 'rgba(250,248,243,0.75)', transition: 'color 0.15s ease', lineHeight: 1.4 }}>
                    {obj.q}
                  </span>
                  <span style={{
                    fontFamily: F.mono, fontSize: '14px', color: C.lime, flexShrink: 0,
                    transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease',
                  }}>+</span>
                </button>
                {isOpen && (
                  <p style={{ fontFamily: F.body, fontSize: '13px', lineHeight: 1.8, color: 'rgba(250,248,243,0.5)', paddingBottom: '16px', fontWeight: 300 }}>
                    {obj.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── PRIMARY CTA ── */}
      <div className="pad-section" style={{ padding: '64px 64px 72px', background: C.forest, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: C.lime }} />
        <div style={{
          position: 'absolute', right: '-20px', bottom: '-50px',
          fontFamily: F.display, fontSize: 'clamp(100px,20vw,260px)', fontWeight: 900,
          color: 'rgba(255,255,255,0.04)', pointerEvents: 'none', userSelect: 'none',
          letterSpacing: '-8px', lineHeight: 1,
        }}>2026</div>

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(184,217,53,0.1)', border: `1px solid rgba(184,217,53,0.25)`,
            padding: '6px 16px', marginBottom: '28px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.lime }} />
            <span style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.lime }}>
              2026 Engagement Now Open
            </span>
          </div>

          <h2 style={{
            fontFamily: F.display, fontSize: 'clamp(24px,4.5vw,52px)', fontWeight: 900,
            color: C.paper, lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: '20px',
          }}>
            The intelligence was the first step.<br />
            <em style={{ color: C.lime, fontStyle: 'italic' }}>Engagement is where it compounds.</em>
          </h2>

          <p style={{
            fontFamily: F.body, fontSize: '16px', lineHeight: 1.75,
            color: 'rgba(250,248,243,0.55)', maxWidth: '540px', margin: '0 auto 36px',
            fontStyle: 'italic',
          }}>
            Capital partners co-invest in the ventures you have already scored. Contributors shape the work itself. Advisory clients get the team — not just the document.
          </p>

          <div className="gate-cta-row" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: C.lime, color: C.ink, padding: '16px 36px',
              fontFamily: F.sans, fontSize: '13px', fontWeight: 800,
              textDecoration: 'none', letterSpacing: '0.3px',
            }}>
              Discuss Capital Partnership <span style={{ fontSize: '16px', fontWeight: 900 }}>→</span>
            </a>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'transparent', border: `1px solid rgba(255,255,255,0.2)`,
              color: 'rgba(250,248,243,0.7)', padding: '16px 28px',
              fontFamily: F.sans, fontSize: '13px', fontWeight: 700,
              textDecoration: 'none',
            }}>
              Discuss a Mandate
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {['Respond within 48 hours', 'No commitment required to start', 'All engagement levels welcome'].map((signal, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: C.lime, fontSize: '10px', fontWeight: 700 }}>✓</span>
                <span style={{ fontFamily: F.sans, fontSize: '10px', color: 'rgba(250,248,243,0.3)', fontWeight: 500 }}>{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   MOBILE LAYOUT — dedicated experience ≤600px
   Architecture: Cover → Accordion sections with always-visible previews
   Data sections use snap-scroll carousels instead of tables
   Sticky bottom CTA drives membership conversion
══════════════════════════════════════════════════════════════════════════ */

/* ── Reusable mobile accordion card ────────────────────────────────────── */
const MobSection = ({ num, label, preview, dark=false, children, defaultOpen=false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const bg = dark ? C.ink : C.paper;
  const border = dark ? 'rgba(255,255,255,0.08)' : C.border;
  const labelColor = dark ? C.paper : C.ink;
  const previewColor = dark ? 'rgba(250,248,243,0.4)' : C.faint;
  return (
    <div style={{ background: bg, borderBottom: `1px solid ${border}` }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'transparent', border: 'none',
        padding: '16px 18px', display: 'flex', alignItems: 'center',
        gap: '12px', cursor: 'pointer', textAlign: 'left',
      }}>
        {/* Section number pill */}
        <div style={{
          width: '28px', height: '28px', flexShrink: 0,
          background: open ? C.lime : (dark ? 'rgba(255,255,255,0.08)' : C.paperDark),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: F.mono, fontSize: '9px', fontWeight: 700,
          color: open ? C.ink : (dark ? 'rgba(255,255,255,0.4)' : C.faint),
          transition: 'all 0.2s ease',
        }}>{num}</div>
        {/* Label + preview */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: F.sans, fontSize: '13px', fontWeight: 700, color: labelColor, lineHeight: 1.2 }}>{label}</div>
          {!open && preview && (
            <div style={{ fontFamily: F.body, fontSize: '11px', fontStyle: 'italic', color: previewColor, marginTop: '2px', lineHeight: 1.3 }}>{preview}</div>
          )}
        </div>
        {/* Chevron */}
        <div style={{
          width: '20px', height: '20px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: open ? C.lime : (dark ? 'rgba(255,255,255,0.3)' : C.faint),
          fontSize: '14px', transition: 'transform 0.25s ease',
          transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
        }}>↓</div>
      </button>
      {open && (
        <div style={{ padding: '0 18px 20px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

/* ── Mobile snap carousel ───────────────────────────────────────────────── */
const MobCarousel = ({ items, renderCard, dark=false }) => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const onScroll = () => {
    const el = ref.current; if (!el) return;
    const w = el.offsetWidth;
    setActive(Math.min(Math.round(el.scrollLeft / w), items.length - 1));
  };
  const goto = (i) => {
    const el = ref.current; if (!el) return;
    el.scrollTo({ left: el.offsetWidth * i, behavior: 'smooth' });
    setActive(i);
  };
  return (
    <div>
      <div ref={ref} onScroll={onScroll} style={{
        display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
      }}>
        {items.map((item, i) => (
          <div key={i} style={{ flex: '0 0 100%', scrollSnapAlign: 'start', minWidth: 0 }}>
            {renderCard(item, i)}
          </div>
        ))}
      </div>
      {/* Dots */}
      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', paddingTop: '12px' }}>
        {items.map((_, i) => (
          <div key={i} onClick={() => goto(i)} style={{
            width: i === active ? '20px' : '6px', height: '6px',
            borderRadius: '3px', cursor: 'pointer',
            background: i === active ? C.lime : (dark ? 'rgba(255,255,255,0.2)' : C.border),
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  );
};

/* ── Mobile pull quote ──────────────────────────────────────────────────── */
const MobQuote = ({ text, dark=false }) => (
  <div style={{ borderLeft: `3px solid ${C.lime}`, paddingLeft: '14px', margin: '16px 0' }}>
    <p style={{ fontFamily: F.display, fontSize: '14px', fontStyle: 'italic', fontWeight: 600,
      color: dark ? 'rgba(250,248,243,0.7)' : C.forest, lineHeight: 1.55 }}>{text}</p>
  </div>
);

/* ── Mobile stat row ────────────────────────────────────────────────────── */
const MobStats = ({ items, dark=false }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: dark ? 'rgba(255,255,255,0.05)' : C.border, margin: '16px 0' }}>
    {items.map((s, i) => (
      <div key={i} style={{ padding: '14px 12px', background: dark ? 'rgba(255,255,255,0.03)' : C.paper, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '2px', background: C.lime }} />
        <div style={{ fontFamily: F.mono, fontSize: '18px', fontWeight: 500, color: dark ? C.lime : C.forest, lineHeight: 1, marginBottom: '4px' }}>{s.val}</div>
        <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, color: dark ? 'rgba(255,255,255,0.35)' : C.muted, letterSpacing: '0.3px' }}>{s.label}</div>
      </div>
    ))}
  </div>
);

/* ── The full mobile layout ─────────────────────────────────────────────── */
const MobileLayout = () => {
  const [mobSector, setMobSector] = useState(0);
  const s = SECTORS[mobSector];

  return (
    <div style={{ fontFamily: F.body, background: C.paper, paddingBottom: '80px' }}>

      {/* ── Mobile Cover ── */}
      <div style={{ background: C.ink, padding: '28px 18px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-10px', bottom: '-10px',
          fontFamily: F.display, fontSize: '140px', fontWeight: 900,
          color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none', letterSpacing: '-6px' }}>2025</div>
        <div style={{ position: 'relative' }}>
          <Logo height={22} variant="white" />
          <div style={{ marginTop: '28px' }}>
            <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.lime, marginBottom: '12px' }}>
              The Architecture of Progress
            </div>
            <h1 style={{ fontFamily: F.display, fontSize: '52px', fontWeight: 900, color: C.paper, lineHeight: 0.92, letterSpacing: '-2px', marginBottom: '16px' }}>
              BRIDGE<br /><em style={{ color: C.lime, fontStyle: 'italic' }}>2025.</em>
            </h1>
            <p style={{ fontFamily: F.body, fontSize: '13px', fontStyle: 'italic', lineHeight: 1.6, color: 'rgba(250,248,243,0.45)', marginBottom: '24px', maxWidth: '280px' }}>
              Full-year retrospective · 12 sectors · Updated BRIDGE Impact Scores™ · 2026 Roadmap
            </p>
          </div>
          {/* Cover stats 2×2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.06)', borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: '1px' }}>
            {PORTFOLIO_STATS.map((s, i) => (
              <div key={i} style={{ padding: '14px 12px', background: C.ink }}>
                <div style={{ fontFamily: F.mono, fontSize: '18px', fontWeight: 500, color: C.lime, lineHeight: 1, marginBottom: '3px' }}>{s.val}</div>
                <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>{s.lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
            <a href="#mob-membership" style={{ flex: 1, background: C.lime, color: C.ink, padding: '12px', fontFamily: F.sans, fontSize: '11px', fontWeight: 800, textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              Deepen Your Engagement →
            </a>
          </div>
        </div>
      </div>

      {/* Members edition badge */}
      <div style={{ background: C.forest, padding: '8px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.lime }}>Full Members Edition · January 2026</span>
        <span style={{ fontFamily: F.mono, fontSize: '9px', color: 'rgba(250,248,243,0.3)' }}>bridgepbc.com</span>
      </div>

      {/* ── SECTION 1: Editor's Note ── */}
      <MobSection num="01" label="Editor's Note" preview="Seeing Ghana clearly — the alignment moment BRIDGE was built for" defaultOpen={true}>
        <MobQuote text="The question is no longer whether Ghana's development opportunity is real. The question is who will organize the capital, expertise, and relationships to make it tangible." />
        <p style={{ fontFamily: F.body, fontSize: '13px', lineHeight: 1.8, color: C.ink, fontWeight: 300, marginBottom: '12px' }}>
          Ghana stands at a remarkable inflection point. The 2025 IMF Extended Credit Facility has imposed fiscal discipline that is creating the macroeconomic stability private capital requires.
        </p>
        <p style={{ fontFamily: F.body, fontSize: '13px', lineHeight: 1.8, color: C.ink, fontWeight: 300, marginBottom: '12px' }}>
          Inflation declined to 18.4% by December 2025. The cedi has stabilized. The 2026 national budget allocates GH₵6.9B for oil palm development alone — a government turning decisively toward productive sector investment.
        </p>
        {/* TOC */}
        <div style={{ background: C.ink, padding: '14px', marginTop: '16px' }}>
          <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.lime, marginBottom: '10px' }}>This Document</div>
          {[
            '01 · Macro Context & 2025 Review',
            '02 · 12-Sector Scorecard',
            '03 · Venture Movement Analysis',
            '04 · Policy & Budget Alignment',
            '05 · Cross-Sector Integration',
            '06 · 2026 Priority Roadmap',
            '07 · Engagement & Membership',
          ].map((item, i) => (
            <div key={i} style={{ fontFamily: F.sans, fontSize: '11px', color: 'rgba(250,248,243,0.55)', padding: '5px 0', borderBottom: i < 6 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <span style={{ fontFamily: F.mono, color: C.lime, marginRight: '8px' }}>→</span>{item.slice(5)}
            </div>
          ))}
        </div>
      </MobSection>

      {/* ── SECTION 2: Macro Context ── */}
      <MobSection num="02" label="Macro Context" preview="$76B GDP · 4.7% growth · GH₵8.9B productive sector budget">
        <MobStats items={[
          { val: '$76B', label: 'GDP 2025 Est.' },
          { val: '4.7%', label: 'GDP Growth Rate' },
          { val: '18.4%', label: 'Inflation Dec 2025' },
          { val: 'Active', label: 'IMF ECF Program' },
          { val: '23.4M', label: 'Mobile Money Users' },
          { val: 'GH₵8.9B', label: '2026 Productive Budget' },
        ]} />
        <p style={{ fontFamily: F.body, fontSize: '13px', lineHeight: 1.8, color: C.ink, fontWeight: 300, marginBottom: '10px' }}>
          The IMF ECF program delivered its intended macroeconomic stabilization. Inflation declined from 23.2% to 18.4% — the first sustained sub-20% reading since 2021.
        </p>
        <p style={{ fontFamily: F.body, fontSize: '13px', lineHeight: 1.8, color: C.ink, fontWeight: 300 }}>
          GH₵8.9B allocated across agriculture, infrastructure, energy, manufacturing, and technology — sectors representing 83% of the BRIDGE portfolio by capital range.
        </p>
        <MobQuote text="Co-investing alongside government capital is alignment strategy. When private capital flows into the same sectors as public capital, the probability of systemic improvement compounds." />
      </MobSection>

      {/* ── SECTION 3: 12-Sector Scorecard ── */}
      <MobSection num="03" label="12-Sector Scorecard" preview="Portfolio avg: 72.1 → 78.4 · +6.3 pts YoY · 8 of 12 Core Tier">
        {/* Portfolio summary */}
        <MobStats dark={false} items={[
          { val: '78.4', label: 'Avg Score 2025' },
          { val: '+6.3', label: 'YoY Movement' },
          { val: '8/12', label: 'Core Tier Sectors' },
          { val: '174+', label: 'Ventures Assessed' },
        ]} />
        {/* Sector swipe carousel */}
        <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.muted, marginBottom: '10px' }}>Swipe to explore all 12 sectors</div>
        <MobCarousel
          items={SECTORS}
          renderCard={(sec) => (
            <div style={{ border: `1px solid ${C.border}`, background: C.paper, marginRight: '2px' }}>
              <div style={{ background: C.forest, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: '9px', color: C.lime, marginBottom: '3px' }}>{sec.num} · {sec.pillar}</div>
                  <div style={{ fontFamily: F.sans, fontSize: '13px', fontWeight: 700, color: C.paper }}>{sec.shortName}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: F.mono, fontSize: '26px', fontWeight: 500, color: C.lime, lineHeight: 1 }}>{sec.score2025}</div>
                  <div style={{ fontFamily: F.mono, fontSize: '10px', color: C.positive }}>{sec.delta} YoY</div>
                </div>
              </div>
              {/* Score bar */}
              <div style={{ height: '3px', background: C.border }}>
                <div style={{ height: '100%', width: `${sec.score2025}%`, background: C.lime }} />
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: '11px', color: C.muted }}>2024</div>
                    <div style={{ fontFamily: F.mono, fontSize: '16px', fontWeight: 500, color: C.muted }}>{sec.score2024}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: '11px', color: C.faint }}>Capital</div>
                    <div style={{ fontFamily: F.mono, fontSize: '13px', fontWeight: 700, color: C.forest }}>{sec.capital}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: F.mono, fontSize: '11px', color: C.faint }}>Ventures</div>
                    <div style={{ fontFamily: F.mono, fontSize: '13px', fontWeight: 700, color: C.forest }}>{sec.ventures}+</div>
                  </div>
                </div>
                <p style={{ fontFamily: F.body, fontSize: '11px', lineHeight: 1.6, color: C.muted, fontStyle: 'italic' }}>{sec.highlight}</p>
              </div>
            </div>
          )}
        />
      </MobSection>

      {/* ── SECTION 4: Venture Movement ── */}
      <MobSection num="04" label="Venture Movement" preview="Select any sector to see updated scores and 2026 priorities" dark={false}>
        {/* Sector picker — horizontal scroll */}
        <div style={{ overflowX: 'auto', display: 'flex', gap: '4px', paddingBottom: '8px', marginBottom: '12px', scrollbarWidth: 'none' }}>
          {SECTORS.map((sec, i) => (
            <button key={i} onClick={() => setMobSector(i)} style={{
              flexShrink: 0, padding: '5px 10px', fontFamily: F.sans, fontSize: '9px', fontWeight: 700,
              background: mobSector === i ? C.lime : 'transparent',
              color: mobSector === i ? C.ink : C.muted,
              border: `1px solid ${mobSector === i ? C.lime : C.border}`,
              cursor: 'pointer',
            }}>{sec.num}</button>
          ))}
        </div>
        {/* Active sector detail */}
        <div style={{ border: `1px solid ${C.border}` }}>
          <div style={{ background: C.forest, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: '9px', color: C.lime, marginBottom: '2px' }}>{s.num} · {s.pillar}</div>
              <div style={{ fontFamily: F.sans, fontSize: '12px', fontWeight: 700, color: C.paper }}>{s.name}</div>
            </div>
            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: F.mono, fontSize: '20px', color: C.lime }}>{s.score2025}</div>
                <div style={{ fontFamily: F.sans, fontSize: '8px', color: 'rgba(255,255,255,0.4)' }}>2025 SCORE</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: F.mono, fontSize: '20px', color: C.positive }}>{s.delta}</div>
                <div style={{ fontFamily: F.sans, fontSize: '8px', color: 'rgba(255,255,255,0.4)' }}>YOY</div>
              </div>
            </div>
          </div>
          <div style={{ padding: '12px 14px' }}>
            <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.muted, marginBottom: '6px' }}>2025 Highlight</div>
            <p style={{ fontFamily: F.body, fontSize: '12px', lineHeight: 1.65, color: C.ink, fontWeight: 300, marginBottom: '12px' }}>{s.highlight}</p>
            <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.muted, marginBottom: '6px', paddingTop: '10px', borderTop: `1px solid ${C.border}` }}>Venture Pipeline</div>
            {s.ventureUpdates.map((v, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < s.ventureUpdates.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <div>
                  <div style={{ fontFamily: F.sans, fontSize: '11px', fontWeight: 700, color: C.ink }}>{v.name}</div>
                  <div style={{ fontFamily: F.sans, fontSize: '9px', color: C.faint }}>{v.tier} · {v.capital}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ fontFamily: F.mono, fontSize: '14px', fontWeight: 700, color: C.forest }}>{v.score}</div>
                  <div style={{ fontFamily: F.mono, fontSize: '11px', color: C.positive }}>{v.movement}</div>
                </div>
              </div>
            ))}
            <div style={{ background: C.paperDark, padding: '10px 12px', marginTop: '10px', borderTop: `1px solid ${C.border}` }}>
              <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '1px' }}>2026 Priority: </span>
              <span style={{ fontFamily: F.body, fontSize: '11px', color: C.ink, fontStyle: 'italic' }}>{s.priority2026}</span>
            </div>
          </div>
        </div>
      </MobSection>

      {/* ── SECTION 5: 2025 Milestones ── */}
      <MobSection num="05" label="2025 Milestones" preview="16 portfolio milestones across Q1–Q4 2025" dark={true}>
        {YEAR_REVIEW_MILESTONES.map((q, qi) => (
          <div key={qi} style={{ marginBottom: qi < 3 ? '16px' : 0 }}>
            <div style={{ fontFamily: F.mono, fontSize: '10px', fontWeight: 700, color: C.lime, marginBottom: '8px' }}>{q.q}</div>
            {q.items.map((item, ii) => (
              <div key={ii} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span style={{ color: C.lime, fontSize: '9px', flexShrink: 0, marginTop: '3px' }}>—</span>
                <span style={{ fontFamily: F.body, fontSize: '12px', color: 'rgba(250,248,243,0.65)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </MobSection>

      {/* ── SECTION 6: Policy Alignment ── */}
      <MobSection num="06" label="Policy & Budget Alignment" preview="GH₵8.9B productive budget · 8 of 12 sectors directly aligned">
        {/* Budget strip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: C.border, marginBottom: '14px' }}>
          {[
            { val: 'GH₵8.9B', label: 'Productive sector allocation' },
            { val: 'GH₵6.9B', label: 'Oil Palm — single line item' },
            { val: '8 of 12', label: 'Sectors with budget alignment' },
            { val: 'Active', label: 'IMF ECF Program' },
          ].map((item, i) => (
            <div key={i} style={{ background: C.forest, padding: '12px' }}>
              <div style={{ fontFamily: F.mono, fontSize: '16px', fontWeight: 500, color: C.lime, marginBottom: '3px' }}>{item.val}</div>
              <div style={{ fontFamily: F.sans, fontSize: '9px', color: 'rgba(250,248,243,0.45)' }}>{item.label}</div>
            </div>
          ))}
        </div>
        {/* Policy cards carousel */}
        <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.muted, marginBottom: '8px' }}>Key Policy Developments</div>
        <MobCarousel
          items={POLICY_HIGHLIGHTS}
          renderCard={(p) => (
            <div style={{ borderLeft: `3px solid ${p.impact === 'High' ? C.positive : C.amber}`, paddingLeft: '12px', paddingRight: '4px', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                <span style={{ fontFamily: F.sans, fontSize: '8px', fontWeight: 700, letterSpacing: '1px', color: C.lime, textTransform: 'uppercase' }}>{p.tag}</span>
                <span style={{ fontFamily: F.sans, fontSize: '8px', color: C.teal }}>{p.sector}</span>
              </div>
              <div style={{ fontFamily: F.sans, fontSize: '12px', fontWeight: 700, color: C.ink, marginBottom: '5px' }}>{p.title}</div>
              <p style={{ fontFamily: F.body, fontSize: '11px', lineHeight: 1.6, color: C.muted, fontWeight: 300 }}>{p.note}</p>
            </div>
          )}
        />
      </MobSection>

      {/* ── SECTION 7: Cross-Sector Integration ── */}
      <MobSection num="07" label="Cross-Sector Integration" preview="4 high-value integration themes — Cold Chain, Digital Commerce, Skills, Energy">
        <MobCarousel
          items={CROSS_SECTOR_THEMES}
          renderCard={(theme) => (
            <div style={{ border: `1px solid ${C.border}`, background: C.paper, marginRight: '2px' }}>
              <div style={{ padding: '12px 14px', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '8px' }}>
                  {theme.sectors.map((sec, si) => (
                    <span key={si} style={{ fontFamily: F.sans, fontSize: '8px', fontWeight: 700, padding: '2px 6px', background: `${C.forest}14`, color: C.forest, border: `1px solid ${C.forest}25` }}>{sec}</span>
                  ))}
                </div>
                <div style={{ fontFamily: F.sans, fontSize: '13px', fontWeight: 700, color: C.ink }}>{theme.title}</div>
              </div>
              <div style={{ padding: '12px 14px' }}>
                <p style={{ fontFamily: F.body, fontSize: '12px', lineHeight: 1.65, color: C.muted, fontWeight: 300, marginBottom: '10px' }}>{theme.insight}</p>
                <div style={{ fontFamily: F.mono, fontSize: '11px', fontWeight: 700, color: C.positive }}>{theme.capital}</div>
              </div>
            </div>
          )}
        />
      </MobSection>

      {/* ── SECTION 8: 2026 Roadmap ── */}
      <MobSection num="08" label="2026 Priority Roadmap" preview="6 ranked deployments · Top priority: Agriculture H1 2026">
        {PRIORITIES_2026.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '12px 0', borderBottom: i < 5 ? `1px solid ${C.border}` : 'none' }}>
            <div style={{
              width: '24px', height: '24px', flexShrink: 0,
              background: i === 0 ? C.lime : i === 1 ? C.forest : C.paperDark,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: F.mono, fontSize: '11px', fontWeight: 700,
              color: i === 0 ? C.ink : i === 1 ? C.paper : C.muted,
            }}>{p.rank}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, color: C.lime, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{p.sector}</div>
              <div style={{ fontFamily: F.sans, fontSize: '12px', fontWeight: 700, color: C.ink, marginBottom: '3px' }}>{p.action}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.mono, fontSize: '11px', fontWeight: 700, color: C.forest }}>{p.capital}</span>
                <span style={{
                  fontFamily: F.sans, fontSize: '8px', fontWeight: 700, padding: '2px 6px',
                  background: p.timeline === 'H1 2026' ? `${C.positive}18` : `${C.amber}18`,
                  color: p.timeline === 'H1 2026' ? C.positive : C.amber,
                }}>{p.timeline}</span>
              </div>
            </div>
          </div>
        ))}
      </MobSection>

      {/* ── SECTION 9: Engagement ── */}
      <MobSection num="09" label="How to Engage" preview="6 partnership modes — from Capital Partners to Development Partners">
        {[
          { mode: 'Capital Partners', who: 'Institutional investors, family offices, impact funds', delivers: 'Co-investment in vetted BRIDGE ventures with structured returns and full impact reporting.' },
          { mode: 'Government Partners', who: 'Ministries, agencies, development authorities', delivers: 'Implementation capacity, private capital mobilization, and policy alignment analysis.' },
          { mode: 'Network Members', who: 'Researchers, diaspora professionals, business leaders', delivers: 'Full intelligence briefs, policy updates, venture pipeline access, and expert convening.' },
          { mode: 'Advisory Clients', who: 'Corporations entering Ghana, NGOs optimizing programs', delivers: 'Sector intelligence, stakeholder mapping, and market entry strategy.' },
          { mode: 'Diaspora Network', who: 'Ghanaian professionals globally', delivers: 'Skills deployment pathways, mentorship opportunities, and re-engagement channels.' },
          { mode: 'Development Partners', who: 'DFIs, foundations, bilateral donors', delivers: 'Blended finance structures, first-loss capital, and catalytic investment co-design.' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '10px 0', borderBottom: i < 5 ? `1px solid ${C.border}` : 'none' }}>
            <div style={{ fontFamily: F.sans, fontSize: '12px', fontWeight: 700, color: C.forest, marginBottom: '2px' }}>{item.mode}</div>
            <div style={{ fontFamily: F.body, fontSize: '10px', fontStyle: 'italic', color: C.faint, marginBottom: '4px' }}>{item.who}</div>
            <p style={{ fontFamily: F.body, fontSize: '11px', lineHeight: 1.55, color: C.muted, fontWeight: 300, margin: 0 }}>{item.delivers}</p>
          </div>
        ))}
      </MobSection>

      {/* ── SECTION 10: Membership CTA ── */}
      <div id="mob-membership" style={{ background: C.ink }}>
        {/* Hook */}
        <div style={{ padding: '24px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <div style={{ width: '20px', height: '2px', background: C.lime }} />
            <span style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: C.lime }}>Next Level · BRIDGE Engagement</span>
          </div>
          <h2 style={{ fontFamily: F.display, fontSize: '32px', fontWeight: 900, color: C.paper, lineHeight: 0.97, letterSpacing: '-1.5px', marginBottom: '14px' }}>
            You have the map.<br /><em style={{ color: C.lime, fontStyle: 'italic' }}>Now move.</em>
          </h2>
          <p style={{ fontFamily: F.body, fontSize: '13px', lineHeight: 1.7, color: 'rgba(250,248,243,0.55)', fontStyle: 'italic' }}>
            As a Network Member you have the full picture. The next step is deploying capital, contributing expertise, or commissioning BRIDGE directly on your mandate.
          </p>
        </div>
        {/* Stats — what you already have */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.06)', padding: '1px' }}>
          {[{v:'174+',l:'Ventures you have scored'},{v:'12',l:'Sectors fully mapped'},{v:'$135–259M',l:'Portfolio range identified'},{v:'2026',l:'Roadmap in your hands'}].map((s,i)=>(
            <div key={i} style={{ padding: '14px 12px', background: C.ink }}>
              <div style={{ fontFamily: F.mono, fontSize: '18px', fontWeight: 500, color: C.lime, lineHeight: 1, marginBottom: '3px' }}>{s.v}</div>
              <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* Engagement mode cards */}
        {ENGAGEMENT_MODES.map((mode) => {
          const ip = mode.primary;
          return (
            <div key={mode.id} style={{
              padding: '20px 18px',
              background: ip ? C.forest : 'transparent',
              borderBottom: `1px solid ${ip ? 'rgba(184,217,53,0.2)' : 'rgba(255,255,255,0.06)'}`,
            }}>
              {mode.tag && <div style={{ fontFamily: F.sans, fontSize: '8px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.lime, marginBottom: '8px' }}>★ {mode.tag}</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.lime, marginBottom: '4px' }}>{mode.label}</div>
                  <p style={{ fontFamily: F.body, fontSize: '11px', fontStyle: 'italic', color: 'rgba(250,248,243,0.45)', lineHeight: 1.4, maxWidth: '200px' }}>{mode.desc}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: F.mono, fontSize: '14px', fontWeight: 500, color: C.paper, lineHeight: 1.3 }}>{mode.threshold}</div>
                  <div style={{ fontFamily: F.sans, fontSize: '9px', color: 'rgba(250,248,243,0.3)' }}>{mode.thresholdNote}</div>
                </div>
              </div>
              <div style={{ marginBottom: '14px' }}>
                {mode.items.slice(0, ip ? 5 : 3).map((item, ii) => (
                  <div key={ii} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', padding: '3px 0' }}>
                    <span style={{ color: C.lime, fontSize: '9px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <span style={{ fontFamily: F.sans, fontSize: '10px', color: 'rgba(250,248,243,0.55)', lineHeight: 1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="#" style={{
                display: 'block', textAlign: 'center', padding: '11px',
                background: ip ? C.lime : 'rgba(255,255,255,0.07)',
                border: `1px solid ${ip ? C.lime : 'rgba(255,255,255,0.15)'}`,
                color: ip ? C.ink : 'rgba(250,248,243,0.65)',
                fontFamily: F.sans, fontSize: '11px', fontWeight: 800,
                textDecoration: 'none',
              }}>{mode.cta}</a>
            </div>
          );
        })}
        {/* Strategic Partner note */}
        <div style={{ padding: '16px 18px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ borderLeft: `3px solid rgba(184,217,53,0.3)`, paddingLeft: '12px' }}>
            <div style={{ fontFamily: F.sans, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.lime, marginBottom: '5px' }}>Tier 5 · Strategic Partners</div>
            <p style={{ fontFamily: F.body, fontSize: '11px', lineHeight: 1.6, color: 'rgba(250,248,243,0.4)', fontWeight: 300, margin: 0 }}>
              $1M+ or exceptional strategic value. Board seats, co-branding, named programs, flagship project partnership. By invitation — <a href="#" style={{ color: 'rgba(184,217,53,0.5)', textDecoration: 'underline' }}>write to us directly</a>.
            </p>
          </div>
        </div>
        {/* Final CTA */}
        <div style={{ padding: '24px 18px', background: C.forest, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: C.lime }} />
          <h3 style={{ fontFamily: F.display, fontSize: '22px', fontWeight: 900, color: C.paper, lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: '10px', marginTop: '8px' }}>
            The intelligence was the first step.<br /><em style={{ color: C.lime, fontStyle: 'italic' }}>Engagement is where it compounds.</em>
          </h3>
          <p style={{ fontFamily: F.body, fontSize: '12px', lineHeight: 1.7, color: 'rgba(250,248,243,0.5)', fontStyle: 'italic', marginBottom: '16px' }}>
            Capital partners co-invest in ventures you have already scored. Contributors shape the work itself. Advisory clients get the team — not just the document.
          </p>
          <a href="#" style={{ display: 'block', textAlign: 'center', background: C.lime, color: C.ink, padding: '13px', fontFamily: F.sans, fontSize: '11px', fontWeight: 800, textDecoration: 'none', marginBottom: '10px' }}>
            Discuss Capital Partnership →
          </a>
          <a href="#" style={{ display: 'block', textAlign: 'center', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(250,248,243,0.65)', padding: '11px', fontFamily: F.sans, fontSize: '11px', fontWeight: 700, textDecoration: 'none', marginBottom: '14px' }}>
            Discuss a Mandate
          </a>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {['Respond within 48hrs', 'No commitment to start', 'All levels welcome'].map((s,i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: C.lime, fontSize: '9px', fontWeight: 700 }}>✓</span>
                <span style={{ fontFamily: F.sans, fontSize: '10px', color: 'rgba(250,248,243,0.3)' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile Footer ── */}
      <div style={{ background: C.forest, padding: '16px 18px', borderTop: `1px solid rgba(184,217,53,0.2)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Logo height={16} variant="white" />
          <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ fontFamily: F.mono, fontSize: '9px', color: 'rgba(250,248,243,0.3)' }}>Annual Review 2025 · Members Edition</span>
        </div>
        <div style={{ fontFamily: F.sans, fontSize: '9px', color: 'rgba(250,248,243,0.25)', textAlign: 'center' }}>bridgepbc.com/intelligence</div>
      </div>

    </div>
  );
};

const Footer = () => (
  <div className="pad-footer" style={{ background: C.forest, padding: '16px 64px', borderTop: `1px solid rgba(184,217,53,0.25)` }}>
    <div className="footer-inner" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Logo height={18} variant="white" />
        <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.15)' }} />
        <div style={{ fontFamily: F.sans, fontSize: '10px', color: 'rgba(250,248,243,0.35)' }}>
          Annual Intelligence Review 2025 · Full Members Edition · bridgepbc.com/intelligence
        </div>
      </div>
      <div className="footer-links" style={{ display: 'flex', gap: '14px' }}>
        {['All Sectors', 'Members', 'Contact', 'bridgepbc.org'].map((l, i) => (
          <a key={i} href="#" style={{ fontFamily: F.sans, fontSize: '10px', fontWeight: 600, color: 'rgba(250,248,243,0.35)', textDecoration: 'none' }}>{l}</a>
        ))}
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════════════════════════ */

export default function AnnualReview2025() {
  const coverLogoRef = useRef(null);
  const isMobile = useIsMobile();
  return (
    <div className="page-root" style={{ fontFamily: F.body, background: C.paper }}>
      <Gf />
      <ReadingProgressBar coverLogoRef={coverLogoRef} />
      {isMobile ? (
        <MobileLayout />
      ) : (
        <>
          <Cover logoRef={coverLogoRef} />
          <SectionFooterNav />
          <EditorsNote />
          <MacroContext />
          <SectorScorecard />
          <VentureMovement />
          <YearMilestones />
          <PolicyAlignment />
          <CrossSectorIntegration />
          <PriorityRoadmap />
          <Engagement />
          <MembersGate />
          <Footer />
        </>
      )}
    </div>
  );
}
