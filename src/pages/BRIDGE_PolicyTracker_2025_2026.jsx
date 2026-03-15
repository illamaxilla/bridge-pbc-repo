import React, { useState, useEffect, useRef } from "react";

import { C, F } from '../theme';
/* BRIDGE · Ghana Policy Tracker 2025-2026 */

const STATUS={
  'Enacted':   {bg:'rgba(26,107,47,0.12)',  text:C.positive, dot:C.positive},
  'Active':    {bg:'rgba(26,107,47,0.12)',  text:C.positive, dot:C.positive},
  'In Force':  {bg:'rgba(26,107,47,0.12)',  text:C.positive, dot:C.positive},
  'Pending':   {bg:'rgba(184,143,10,0.12)', text:C.amber,    dot:C.amber},
  'Consulting':{bg:'rgba(184,143,10,0.12)', text:C.amber,    dot:C.amber},
  'Announced': {bg:'rgba(184,143,10,0.12)', text:C.amber,    dot:C.amber},
  'Delayed':   {bg:'rgba(168,32,13,0.1)',   text:C.red,      dot:C.red},
  'Monitoring':{bg:'rgba(92,107,94,0.12)',  text:C.muted,    dot:C.muted},
};

const SECTORS_SHORT=['Infra','Fin.','Health','Tech','Edu','Agri','Sports','Housing','Tourism','Energy','Mfg','Transport'];

const Gf=()=>(<style>{`
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .pulse{animation:pulse 2s ease-in-out infinite;}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
  @media print{.no-print{display:none!important;}}
  @media(max-width:900px){
    .two-col{grid-template-columns:1fr!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-topbar{padding:10px 24px!important;}
    .pad-footer{padding:14px 32px!important;}
  }
  @media(max-width:600px){
    .two-col{grid-template-columns:1fr!important;}
    .pad-section{padding:20px 16px!important;}
    .pad-cover{padding:18px 16px 0!important;}
    .pad-topbar{padding:9px 16px!important;}
    .pad-footer{padding:12px 16px!important;}
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .filter-bar{flex-wrap:nowrap!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch!important;padding-bottom:8px!important;scrollbar-width:none!important;}
    .filter-bar::-webkit-scrollbar{display:none!important;}
    .stats-grid{display:grid!important;grid-template-columns:1fr 1fr!important;}
    .stats-grid > div{min-width:unset!important;border-right:none!important;border-bottom:1px solid rgba(255,255,255,0.07)!important;}
    .prov-grid{grid-template-columns:1fr!important;}
    .cal-badge{display:none!important;}
    .matrix-table{display:none!important;}
    .matrix-mobile{display:block!important;}
    .card-tags-desktop{display:none!important;}
    .card-tags-mobile{display:flex!important;}
    .pi-intel-desktop{display:none!important;}
    .pi-intel-mobile{display:flex!important;}
  }
`}</style>);

const Logo=({height=28,variant='white'})=>{const tf=variant==='white'?'#ffffff':'#1B4D3E';return(<svg height={height} viewBox="0 0 4113.8 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}><polygon fill="#1B4D3E" stroke="#1B4D3E" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/><path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1Z"/><path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4Z"/><path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1Z"/><path fill={tf} d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4c-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1c31.6,18.3,57,47.9,72.9,84.6c29.9,60.2,91.8,84.9,149.2,51.8c9.7-5.5,17.6-11.8,24.2-18.5Z"/><path fill={tf} d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1c20.7,15.4,38.5,34.7,52.2,57c13.3-10,27.7-18.6,43-25.4c27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6Z"/><rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/><rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/><path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7c0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8Z"/><rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/><rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/><rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/></svg>);};

const POLICIES=[
  {
    id:'budget2026',
    category:'FISCAL POLICY',
    title:'2026 National Budget',
    subtitle:'Government of Ghana · Ministry of Finance',
    status:'Enacted',
    enacted:'November 2025',
    effective:'January 2026',
    lastUpdated:'January 2026',
    sectors:[0,1,2,3,4,5,7,9,10,11],
    summary:'The 2026 Budget was passed under the Mahama administration with a focus on economic stabilisation, infrastructure delivery, and social protection. Total expenditure of GH₵ 271.7 billion represents a significant expansion from 2025, anchored by the 24-Hour Economy programme and renewed commitment to the Big Push infrastructure agenda.',
    keyFigures:[
      {label:'Total Budget',value:'GH₵ 271.7B'},
      {label:'Revenue Target',value:'GH₵ 190.9B'},
      {label:'Fiscal Deficit Target',value:'3.5% of GDP'},
      {label:'Infrastructure Allocation',value:'GH₵ 18.4B'},
    ],
    provisions:[
      {title:'24-Hour Economy Programme',detail:'GH₵ 2.1B allocated to extend business operating hours through power, security, and transport infrastructure. Direct BRIDGE opportunity across Infrastructure (01) and Energy (10) sectors.',impact:'HIGH',sectors:[0,9,10]},
      {title:'National Apprenticeship Programme',detail:'GH₵ 170M for skills-to-employment pipeline. BRIDGE Education venture positioned as industry-facing complement to government-funded training.',impact:'HIGH',sectors:[4,10]},
      {title:'National Coders Programme',detail:'GH₵ 100M for digital skills training. Direct co-investment pathway for BRIDGE Technology sector venture.',impact:'HIGH',sectors:[3,4]},
      {title:'Basic Education Infrastructure',detail:'GH₵ 2.0B for 200 JHS, 200 primary, 200 KG facilities. Construction and digital equipment opportunities.',impact:'MEDIUM',sectors:[4,0]},
      {title:'Ministry of Health Allocation',detail:'GH₵ 28.4B total health allocation. NHIS funding level directly impacts telemedicine and health platform viability.',impact:'HIGH',sectors:[2]},
      {title:'Agriculture Sector Allocation',detail:'GH₵ 4.8B including PERD programme and Oil Palm Window. Cooperative capital and processing facility co-financing opportunities.',impact:'HIGH',sectors:[5]},
      {title:'Ghana Infrastructure Investment Fund',detail:'GH₵ 6.2B for roads, bridges, and market infrastructure. BRIDGE Infrastructure SPV co-financing pathway.',impact:'HIGH',sectors:[0,11]},
      {title:'School Feeding Programme',detail:'GH₵ 1.98B creating reliable institutional demand anchor for BRIDGE agricultural processing ventures.',impact:'MEDIUM',sectors:[5,4]},
    ],
    watch:'Oil Palm Window application window, National Apprenticeship Programme operator RFP, GIIF co-financing terms for market infrastructure. Monitor supplementary budget for mid-year infrastructure adjustments.',
  },
  {
    id:'sankofa',
    category:'DIASPORA POLICY',
    title:'Sankofa Initiative',
    subtitle:'Office of the President · Diaspora Affairs Bureau',
    status:'Active',
    enacted:'2024',
    effective:'2024 — Ongoing',
    lastUpdated:'Q4 2025',
    sectors:[0,1,3,4,5,6,7,8,9,10,11],
    summary:'The Sankofa Initiative is President Mahama\'s flagship diaspora engagement programme, positioning Ghana as the preferred destination for diaspora capital, talent, and cultural connection. It builds on the momentum of the Year of Return (2019) and Decade of Return (2020–2030), creating institutional infrastructure for diaspora investment.',
    keyFigures:[
      {label:'Target Diaspora Population',value:'3M+'},
      {label:'Annual Remittance Flow',value:'$6.65B'},
      {label:'Year of Return Impact',value:'$1.9B (2019)'},
      {label:'Decade of Return Target',value:'$10B+ mobilised'},
    ],
    provisions:[
      {title:'Diaspora Investment Gateway',detail:'Centralised platform for diaspora investment in vetted Ghana opportunities. Direct alignment with BRIDGE Diaspora Investment Gateway venture in Financial Inclusion sector.',impact:'HIGH',sectors:[1,3]},
      {title:'Right of Abode Programme',detail:'Simplified residency pathway for diaspora returnees. Supports BRIDGE Diaspora Return Pathway in Health sector and Tech Talent Bridge Programme.',impact:'MEDIUM',sectors:[2,3]},
      {title:'Diaspora Property Programme',detail:'Structured framework for diaspora real estate investment including land title verification and escrow services. Directly enables BRIDGE Housing sector ventures.',impact:'HIGH',sectors:[7]},
      {title:'Year of Return Legacy Fund',detail:'Cultural and tourism infrastructure fund building on 2019 momentum. Heritage tourism investment vehicle aligned with BRIDGE Tourism sector.',impact:'MEDIUM',sectors:[8,6]},
      {title:'Diaspora Bond Programme',detail:'Sovereign diaspora bond targeting $500M from Ghanaian diaspora. Competitive instrument for BRIDGE Peace & Prosperity Notes fundraising strategy.',impact:'MEDIUM',sectors:[0,1]},
      {title:'Skills Transfer Programme',detail:'Mechanism for diaspora professionals to contribute technical skills to Ghana development priorities. Enables BRIDGE Tech Talent Bridge, CME Platform, and Diaspora Mentorship Network.',impact:'HIGH',sectors:[2,3,4]},
    ],
    watch:'Diaspora Bond prospectus launch date. Right of Abode regulatory framework publication. Diaspora Investment Gateway platform build procurement.',
  },
  {
    id:'dep',
    category:'DIGITAL POLICY',
    title:'Digital Economy Policy (DEP)',
    subtitle:'Ministry of Communications & Digitalisation',
    status:'Active',
    enacted:'2023',
    effective:'2023 — Ongoing',
    lastUpdated:'Q3 2025',
    sectors:[1,3,4,11],
    summary:'Ghana\'s Digital Economy Policy provides the regulatory and investment framework for digitising the economy across five pillars: digital infrastructure, digital government, digital business, digital skills, and digital innovation. It sets the foundation for BRIDGE\'s technology and financial inclusion sector investments.',
    keyFigures:[
      {label:'Internet Penetration',value:'70%+'},
      {label:'Mobile Money Accounts',value:'74.1M registered'},
      {label:'GHS Processed (MoMo)',value:'GH₵ 3 Trillion'},
      {label:'GSMA Regulatory Index',value:'#1 globally (95.06%)'},
    ],
    provisions:[
      {title:'National Digital Infrastructure Plan',detail:'Universal broadband target by 2030. Last-mile connectivity investment directly enables rural fintech, telemedicine, and AgriTech reach.',impact:'HIGH',sectors:[3,1,5]},
      {title:'Digital Skills Agenda',detail:'National Coders Programme and digital literacy targets. Co-investment pathway for BRIDGE Digital Apprenticeship Pipeline and EdTech ventures.',impact:'HIGH',sectors:[4,3]},
      {title:'Digital Financial Services Framework',detail:'Interoperability mandates for mobile money platforms. Expands addressable market for BRIDGE financial inclusion ventures.',impact:'HIGH',sectors:[1]},
      {title:'GovTech Investment Programme',detail:'Government procurement modernisation and e-services rollout. Market opportunity for BRIDGE technology venture partners.',impact:'MEDIUM',sectors:[3]},
      {title:'Cybersecurity Act Implementation',detail:'Data governance requirements affecting fintech, healthtech, and EdTech platforms. Compliance cost consideration for BRIDGE portfolio companies.',impact:'MEDIUM',sectors:[1,2,3]},
      {title:'National ID System Integration',detail:'Ghana Card integration with financial services mandated. Prerequisite completed for BRIDGE Alternative Credit Scoring Platform.',impact:'HIGH',sectors:[1,3]},
    ],
    watch:'National Broadband Policy review. Digital Financial Services interoperability full rollout. Cybersecurity Act licensing requirements for fintech platforms.',
  },
  {
    id:'dcd',
    category:'FINANCIAL REGULATION',
    title:'Digital Credit Services Directive',
    subtitle:'Bank of Ghana',
    status:'In Force',
    enacted:'September 2025',
    effective:'November 2025 (licensing) · June 2026 (compliance)',
    lastUpdated:'November 2025',
    sectors:[1,3],
    summary:'The BOG Digital Credit Services Directive (September 2025) creates a formal licensing regime for digital credit providers — previously operating in an unregulated gap. It establishes minimum capital requirements, consumer protection standards, and operational guidelines that directly shape the BRIDGE Financial Inclusion venture portfolio.',
    keyFigures:[
      {label:'Minimum Capital Requirement',value:'GH₵ 2M (~$162K)'},
      {label:'Per-Customer Loan Cap',value:'GH₵ 10,000'},
      {label:'Licensing Open Date',value:'November 3, 2025'},
      {label:'Compliance Deadline',value:'June 2026'},
    ],
    provisions:[
      {title:'Digital Credit Licensing Regime',detail:'All digital credit providers must be licensed. Opens formal market for BRIDGE Trader Working Capital Facility and Alternative Credit Scoring Platform. Application window now open.',impact:'HIGH',sectors:[1]},
      {title:'Consumer Protection Standards',detail:'Prohibits harassment, contact list access, and predatory practices. Sets minimum disclosure requirements. Protects BRIDGE\'s market reputation by eliminating unethical competitors.',impact:'MEDIUM',sectors:[1]},
      {title:'GH₵ 10,000 Customer Loan Cap',detail:'Per-customer ceiling at current stage. Appropriate for trader working capital products; may constrain MSME lending at growth stage. Monitor for revision.',impact:'MEDIUM',sectors:[1]},
      {title:'Credit Bureau Reporting Mandate',detail:'All licensed digital credit providers must report to credit bureaus. Builds credit history for previously unscored traders — foundational for BRIDGE Alternative Credit Scoring Platform.',impact:'HIGH',sectors:[1,3]},
      {title:'Interest Rate Disclosure',detail:'Mandatory APR disclosure in plain language. Levels competitive landscape; BRIDGE transparent pricing model is competitive advantage.',impact:'LOW',sectors:[1]},
      {title:'Operational Systems Requirements',detail:'Licensed providers must maintain documented credit assessment methodology, collections policy, and data management framework. Compliance cost for early-stage ventures.',impact:'MEDIUM',sectors:[1]},
    ],
    watch:'June 2026 compliance deadline for existing providers. BOG interpretation guidance on group lending models (impacts susu digitisation). Loan cap review timeline.',
  },
  {
    id:'onedistrictone',
    category:'INDUSTRY POLICY',
    title:'One District One Factory (1D1F)',
    subtitle:'Ministry of Trade & Industry',
    status:'Active',
    enacted:'2017 · Expanded 2021 · Reviewed 2025',
    effective:'Ongoing',
    lastUpdated:'Q2 2025',
    sectors:[5,10],
    summary:'1D1F aims to establish at least one factory per district to industrialise Ghana\'s economy and reduce import dependency. 88+ factories are now operational. The 2025 review refocused the programme on agro-processing, light manufacturing, and export-oriented production — directly aligned with BRIDGE Manufacturing and Agriculture sector investments.',
    keyFigures:[
      {label:'Factories Operational',value:'88+'},
      {label:'Total Districts',value:'260'},
      {label:'Manufacturing GDP Share',value:'~11%'},
      {label:'Annual Import Bill (Mfg)',value:'$6B+'},
    ],
    provisions:[
      {title:'Agro-Processing Priority Classification',detail:'1D1F 2025 review prioritises food processing, shea processing, and cashew value-addition. Direct alignment with BRIDGE Agro-Processing Hub and Tomato Processing Facility ventures.',impact:'HIGH',sectors:[5,10]},
      {title:'1D1F Working Capital Fund',detail:'Dedicated working capital facility for 1D1F companies. Co-financing pathway for BRIDGE Supply Chain Finance Platform.',impact:'HIGH',sectors:[10,1]},
      {title:'Export Development Programme',detail:'Market linkage support for 1D1F factories targeting AfCFTA markets. BRIDGE Regional Export Platform can access programme infrastructure.',impact:'MEDIUM',sectors:[10]},
      {title:'Skills Link Programme',detail:'1D1F factories required to partner with TVET institutions. BRIDGE Manufacturing Skills Academy positioned as preferred partner.',impact:'MEDIUM',sectors:[10,4]},
      {title:'Land and Utility Support',detail:'Government provides serviced land and utility connections for qualifying factories. Reduces site development cost for BRIDGE Agro-Processing Hub.',impact:'MEDIUM',sectors:[10,0]},
      {title:'Performance Benchmarking',detail:'2025 review introduced performance monitoring for operational factories. BRIDGE Quality Certification Services positioned to support compliance.',impact:'LOW',sectors:[10]},
    ],
    watch:'1D1F Working Capital Fund disbursement schedule. Agro-processing factory RFP for new districts. BRIDGE opportunity to co-develop factory in priority agro-processing district.',
  },
  {
    id:'nhis',
    category:'HEALTH REGULATION',
    title:'NHIS Reform Programme',
    subtitle:'National Health Insurance Authority',
    status:'Active',
    enacted:'2023 · Annual Review',
    effective:'Ongoing',
    lastUpdated:'Q3 2025',
    sectors:[2,1],
    summary:'The NHIS Reform Programme addresses chronic underfunding, claims processing inefficiency, and provider cash flow crises that undermine Ghana\'s national health insurance system. Reform creates commercial opportunities for technology platforms improving NHIS operational efficiency.',
    keyFigures:[
      {label:'Active NHIS Membership',value:'~40% population'},
      {label:'Annual Claims Volume',value:'GH₵ 4.2B+'},
      {label:'Avg. Provider Payment Delay',value:'60–90 days'},
      {label:'Informal Sector Coverage',value:'<15%'},
    ],
    provisions:[
      {title:'Digital Claims Processing',detail:'NHIA procurement for technology platforms automating claims submission, verification, and payment. BRIDGE NHIS Claims Technology venture directly addresses this RFP opportunity.',impact:'HIGH',sectors:[2]},
      {title:'Provider Financing Facility',detail:'MoH-backed facility allowing providers to access advances against verified NHIS claims. BRIDGE Medical Emergency Fund and market trader health products complement.',impact:'MEDIUM',sectors:[2,1]},
      {title:'Informal Sector Enrolment Drive',detail:'Target to increase coverage to 60% by 2027, with focus on informal sector. BRIDGE Market Trader Health Insurance directly enables this target.',impact:'HIGH',sectors:[2,1]},
      {title:'Pharmaceutical Price Controls',detail:'NHIA negotiations with pharmaceutical suppliers to reduce medicine cost. Affects BRIDGE Pharmaceutical Supply Chain Platform pricing assumptions.',impact:'MEDIUM',sectors:[2,10]},
      {title:'Community Health Worker Integration',detail:'NHIS-funded CHW programme expansion. BRIDGE Community Health Worker App positioned as delivery tool for NHIA-funded services.',impact:'HIGH',sectors:[2]},
    ],
    watch:'NHIA digital claims processing RFP publication. Provider financing facility terms. Informal sector enrolment campaign launch — BRIDGE Kejetia pilot window.',
  },
  {
    id:'agrimod',
    category:'AGRICULTURE POLICY',
    title:'Agriculture Modernisation Agenda',
    subtitle:'Ministry of Food & Agriculture',
    status:'Active',
    enacted:'2025',
    effective:'2026–2030',
    lastUpdated:'January 2026',
    sectors:[5,0,9,11],
    summary:'Ghana\'s 2025 Agriculture Modernisation Agenda sets targets for post-harvest loss reduction, irrigation expansion, input subsidy reform, and value chain development. It replaces the Planting for Food and Jobs programme with a more commercially oriented framework — explicitly welcoming private sector co-investment.',
    keyFigures:[
      {label:'Post-Harvest Loss Target',value:'Reduce from 40% to 20%'},
      {label:'Irrigation Expansion',value:'200,000 ha by 2030'},
      {label:'Processing Value Capture',value:'Target 30% locally'},
      {label:'Budget Allocation',value:'GH₵ 4.8B (2026)'},
    ],
    provisions:[
      {title:'Oil Palm Development Window',detail:'Dedicated financing window for oil palm processing ventures. BRIDGE Agriculture sector positioned to access window for Tomato and Fruit Processing Facilities.',impact:'HIGH',sectors:[5]},
      {title:'Cold Chain Infrastructure Programme',detail:'Government investment in cold storage at district markets. Co-financing opportunity for BRIDGE Solar Cold Storage Network.',impact:'HIGH',sectors:[5,11]},
      {title:'Cooperative Strengthening Programme',detail:'Legal and financial capacity building for farmer cooperatives. Directly enables BRIDGE Cooperative Capital Fund deployment.',impact:'HIGH',sectors:[5,1]},
      {title:'Irrigation Development Authority',detail:'Expanded mandate and budget for small-scale irrigation. Enables BRIDGE Agri-Energy Integration (solar irrigation) ventures.',impact:'MEDIUM',sectors:[5,9]},
      {title:'Export Market Development Fund',detail:'Support for agricultural exporters accessing ECOWAS and international markets. Enables BRIDGE Export Development Programme.',impact:'MEDIUM',sectors:[5]},
      {title:'Warehouse Receipt System Reform',detail:'Legal framework enabling agricultural commodities as loan collateral. Prerequisite for BRIDGE Warehouse Receipt Financing venture.',impact:'HIGH',sectors:[5,1]},
    ],
    watch:'Oil Palm Window application open date. Warehouse Receipt System legal framework gazette. Cold chain programme district shortlist. MoFA cooperative registry reform.',
  },
  {
    id:'afcfta',
    category:'TRADE POLICY',
    title:'AfCFTA Implementation — Ghana',
    subtitle:'Ministry of Trade & Industry · AfCFTA Secretariat (Accra)',
    status:'Active',
    enacted:'2021 (trading commenced)',
    effective:'Phased 2021–2030',
    lastUpdated:'Q4 2025',
    sectors:[5,9,10,11],
    summary:'Ghana hosts the AfCFTA Secretariat and is a leading implementer of the agreement. The protocol creates a 1.3 billion person free trade area with preferential tariff schedules. For BRIDGE, AfCFTA represents the growth market for manufacturing, agro-processing, and logistics ventures beyond domestic scale.',
    keyFigures:[
      {label:'AfCFTA Market Size',value:'1.3B people'},
      {label:'AfCFTA GDP',value:'$3.4 Trillion'},
      {label:'Ghana Tariff Liberalisation',value:'90% of lines'},
      {label:'Intra-Africa Trade Target',value:'52% by 2025'},
    ],
    provisions:[
      {title:'Rules of Origin Framework',detail:'Specific rules by product category determining AfCFTA preferential treatment eligibility. BRIDGE Manufacturing ventures must design production to meet rules of origin for target markets.',impact:'HIGH',sectors:[10]},
      {title:'Trade Facilitation Protocol',detail:'Simplified customs documentation and border procedures. BRIDGE Cross-Border Facilitation venture in Transportation sector directly implements protocol benefits.',impact:'HIGH',sectors:[11]},
      {title:'Investment Protocol',detail:'AfCFTA Investment Protocol enables cross-border investment protection. BRIDGE pan-West Africa expansion facilitated by protocol from Year 3.',impact:'MEDIUM',sectors:[10,11]},
      {title:'Agro-Processing Value Chain Partnerships',detail:'AfCFTA facilitates regional agricultural value chains. BRIDGE Cashew, Shea, and Fruit Processing ventures gain access to regional buyer networks.',impact:'HIGH',sectors:[5,10]},
      {title:'Services Protocol',detail:'Financial services, digital services, and professional services liberalisation. Enables BRIDGE fintech and tech ventures to scale regionally.',impact:'MEDIUM',sectors:[1,3]},
      {title:'Government Procurement Protocol',detail:'Cross-border government procurement access. BRIDGE GovTech and infrastructure ventures gain access to ECOWAS government procurement.',impact:'LOW',sectors:[0,3]},
    ],
    watch:'Tariff schedule implementation by product category — monitor for Ghana-specific adjustments. Services Protocol ratification timeline. Boankra Inland Port commissioning (critical AfCFTA logistics node).',
  },
];

const CATEGORIES=[...new Set(POLICIES.map(p=>p.category))];

const StatusBadge=({status})=>{
  const s=STATUS[status]||STATUS['Monitoring'];
  return(
    <span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:s.bg,padding:'3px 9px',borderRadius:'2px'}}>
      <span className="pulse" style={{width:'5px',height:'5px',borderRadius:'50%',background:s.dot,display:'inline-block',flexShrink:0}}/>
      <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:s.text}}>{status}</span>
    </span>
  );
};

const ImpactBadge=({impact})=>{
  const colors={HIGH:{bg:'rgba(26,107,47,0.1)',text:C.positive},MEDIUM:{bg:'rgba(184,143,10,0.1)',text:C.amber},LOW:{bg:'rgba(92,107,94,0.1)',text:C.muted}};
  const c=colors[impact]||colors.LOW;
  return(<span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:c.text,background:c.bg,padding:'2px 6px'}}>{impact}</span>);
};

const SectorTag=({idx})=>(
  <span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:C.forest,background:'rgba(27,77,62,0.08)',padding:'2px 6px',borderRadius:'2px',whiteSpace:'nowrap'}}>
    {String(idx+1).padStart(2,'0')} {SECTORS_SHORT[idx]}
  </span>
);

const TopBar=({coverLogoRef})=>{
  const[past,setPast]=useState(false);
  useEffect(()=>{
    const fn=()=>{if(!coverLogoRef?.current)return;setPast(coverLogoRef.current.getBoundingClientRect().bottom<0);};
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[coverLogoRef]);
  return(
    <div className="no-print pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.05)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'160px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <Logo height={18} variant="dark"/>
          <div style={{width:'1px',height:'14px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.forest,background:'rgba(27,77,62,0.08)',padding:'3px 8px'}}>Policy Tracker</span>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,background:C.paperDark,padding:'3px 8px'}}>Living Document</span>
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>March 2026</span>
        <a href="/login" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px'}}>Apply</a>
      </div>
    </div>
  );
};

const Cover=({logoRef})=>(
  <div className="pad-cover" style={{background:C.ink,padding:'32px 64px 0',position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',right:0,bottom:0,fontFamily:F.display,fontSize:'clamp(60px,14vw,180px)',fontWeight:900,color:'rgba(255,255,255,0.02)',lineHeight:1,userSelect:'none',pointerEvents:'none',letterSpacing:'-4px'}}>POLICY</div>
    <div ref={logoRef} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
        <Logo height={22} variant="white"/>
        <div className="mob-hide" style={{width:'1px',height:'16px',background:'rgba(255,255,255,0.15)'}}/>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',color:'rgba(255,255,255,0.3)',textTransform:'uppercase'}}>Intelligence Series</span>
      </div>
      <div style={{display:'flex',gap:'6px'}}>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,background:'rgba(184,217,53,0.1)',border:'1px solid rgba(184,217,53,0.2)',padding:'3px 8px'}}>Policy Tracker</span>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',padding:'3px 8px'}}>Living</span>
      </div>
    </div>
    <div style={{maxWidth:'680px',marginBottom:'28px'}}>
      <div className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.25)',letterSpacing:'2px',marginBottom:'10px'}}>PT-01 &middot; 2025-2026</div>
      <h1 style={{fontFamily:F.display,fontSize:'clamp(26px,5vw,56px)',fontWeight:900,color:C.paper,lineHeight:1.05,letterSpacing:'-1.5px',marginBottom:'10px'}}>Ghana Policy Tracker<br/><span style={{color:C.lime}}>2025-2026</span></h1>
      <p className="mob-hide" style={{fontFamily:F.body,fontSize:'14px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',lineHeight:1.7}}>Living document covering the 2026 Budget, Sankofa Initiative, DEP, Digital Credit Directive, and sector-specific regulations.</p>
    </div>
    <div className="stats-grid" style={{display:'flex',gap:'0',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
      {[{l:'Policies',v:String(POLICIES.length)},{l:'Sectors',v:'All 12'},{l:'Updated',v:'Mar 2026'},{l:'Review',v:'Jun 2026'}].map((s,i)=>(
        <div key={i} style={{padding:'12px 20px',borderRight:'1px solid rgba(255,255,255,0.07)',minWidth:'110px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'4px'}}>{s.l}</div>
          <div style={{fontFamily:F.mono,fontSize:'18px',color:C.paper,lineHeight:1}}>{s.v}</div>
        </div>
      ))}
    </div>
    <div style={{height:'3px',background:`linear-gradient(90deg,${C.lime},transparent)`,marginTop:'0'}}/>
  </div>
);

const PolicyCard=({policy,isOpen,onToggle})=>{
  const[provsOpen,setProvsOpen]=useState(false);
  useEffect(()=>{if(!isOpen)setProvsOpen(false);},[isOpen]);
  const visibleProvs=provsOpen?policy.provisions:policy.provisions.slice(0,1);
  return(
  <div style={{border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:'8px'}}>

    {/* Collapsed header */}
    <button onClick={onToggle} style={{width:'100%',background:isOpen?C.forest:C.paper,border:'none',padding:'15px 18px',cursor:'pointer',display:'flex',gap:'10px',alignItems:'flex-start',textAlign:'left',transition:'background 0.2s'}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:'flex',gap:'7px',alignItems:'center',flexWrap:'wrap',marginBottom:'5px'}}>
          <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:isOpen?'rgba(184,217,53,0.55)':C.faint}}>{policy.category}</span>
          <StatusBadge status={policy.status}/>
        </div>
        <span style={{fontFamily:F.sans,fontSize:'15px',fontWeight:700,color:isOpen?C.paper:C.ink,lineHeight:1.2,display:'block',marginBottom:'3px'}}>{policy.title}</span>
        <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:isOpen?'rgba(250,248,243,0.4)':C.muted,display:'block',marginBottom:'0'}}>{policy.subtitle}</span>
        {/* Tags row shown below title on mobile */}
        <div className="card-tags-mobile" style={{display:'none',gap:'4px',flexWrap:'wrap',marginTop:'8px'}}>
          {policy.sectors.slice(0,3).map(s=>(<SectorTag key={s} idx={s}/>))}
          {policy.sectors.length>3&&<span style={{fontFamily:F.mono,fontSize:'8px',color:isOpen?'rgba(184,217,53,0.5)':C.faint,alignSelf:'center'}}>+{policy.sectors.length-3}</span>}
        </div>
      </div>
      {/* Right side: tags (desktop) + chevron */}
      <div className="card-tags-desktop" style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'8px',flexShrink:0,minWidth:'110px'}}>
        <div style={{display:'flex',gap:'4px',flexWrap:'wrap',justifyContent:'flex-end'}}>
          {policy.sectors.slice(0,4).map(s=>(<SectorTag key={s} idx={s}/>))}
          {policy.sectors.length>4&&<span style={{fontFamily:F.mono,fontSize:'8px',color:isOpen?'rgba(184,217,53,0.5)':C.faint}}>+{policy.sectors.length-4} more</span>}
        </div>
        <span style={{fontFamily:F.mono,fontSize:'15px',color:isOpen?C.lime:C.muted}}>{isOpen?'▲':'▼'}</span>
      </div>
      {/* Chevron only on mobile */}
      <span style={{display:'none'}} className="mob-show">
        <span style={{fontFamily:F.mono,fontSize:'13px',color:isOpen?C.lime:C.muted,flexShrink:0}}>{isOpen?'▲':'▼'}</span>
      </span>
    </button>

    {/* Expanded body */}
    {isOpen&&(
      <div style={{background:C.paper}}>

        {/* Meta strip */}
        <div style={{background:C.paperDark,padding:'9px 18px',display:'flex',gap:'16px',flexWrap:'wrap',borderBottom:`1px solid ${C.border}`}}>
          {[{l:'Enacted',v:policy.enacted},{l:'Effective',v:policy.effective},{l:'Updated',v:policy.lastUpdated}].map((m,i)=>(
            <div key={i} style={{display:'flex',gap:'6px',alignItems:'center'}}>
              <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint}}>{m.l}</span>
              <span style={{fontFamily:F.mono,fontSize:'10px',color:C.ink}}>{m.v}</span>
            </div>
          ))}
        </div>

        {/* Summary + Key Figures */}
        <div className="two-col" style={{padding:'18px',display:'grid',gridTemplateColumns:'2fr 1fr',gap:'24px',borderBottom:`1px solid ${C.border}`}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Overview</div>
            <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:C.ink,fontWeight:300}}>{policy.summary}</p>
          </div>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Key Figures</div>
            {policy.keyFigures.map((f,i)=>(
              <div key={i} style={{padding:'7px 0',borderBottom:i<policy.keyFigures.length-1?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint,marginBottom:'2px'}}>{f.label}</div>
                <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:500,color:C.forest}}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Provisions — 1 shown by default, expand to all */}
        <div style={{padding:'18px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted}}>Key Provisions &mdash; BRIDGE Relevance</div>
            {!provsOpen&&policy.provisions.length>1&&(
              <button onClick={e=>{e.stopPropagation();setProvsOpen(true);}} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.forest,background:'none',border:`1px solid ${C.border}`,padding:'3px 10px',cursor:'pointer',flexShrink:0,whiteSpace:'nowrap'}}>
                +{policy.provisions.length-1} more
              </button>
            )}
            {provsOpen&&(
              <button onClick={e=>{e.stopPropagation();setProvsOpen(false);}} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.muted,background:'none',border:`1px solid ${C.border}`,padding:'3px 10px',cursor:'pointer',flexShrink:0}}>
                Show less
              </button>
            )}
          </div>
          <div className="prov-grid two-col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
            {visibleProvs.map((p,i)=>(
              <div key={i} style={{border:`1px solid ${C.border}`,padding:'12px 14px',background:C.paperDark}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'6px',gap:'8px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,flex:1}}>{p.title}</span>
                  <ImpactBadge impact={p.impact}/>
                </div>
                <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6,fontStyle:'italic',marginBottom:'8px'}}>{p.detail}</p>
                <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
                  {p.sectors.map(s=><SectorTag key={s} idx={s}/>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Watch */}
        <div style={{padding:'12px 18px',background:'rgba(27,77,62,0.04)',display:'flex',gap:'12px',alignItems:'flex-start'}}>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,background:C.forest,padding:'3px 8px',flexShrink:0,marginTop:'1px'}}>Watch</span>
          <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,lineHeight:1.7}}>{policy.watch}</p>
        </div>
      </div>
    )}
  </div>
  );
};

const PolicyIntelligence=({filtered,open,setOpen})=>{
  const [mobIdx,setMobIdx]=useState(0);
  const mobPolicy=filtered[mobIdx]||filtered[0];
  const [mobProv,setMobProv]=useState(false);
  useEffect(()=>{setMobIdx(0);setMobProv(false);},[filtered]);
  useEffect(()=>{setMobProv(false);},[mobIdx]);

  return(
  <div className="pad-section" style={{background:C.paper,padding:'28px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'16px'}}/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'18px'}}>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'4px'}}>Policy Intelligence</div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(16px,2.5vw,24px)',fontWeight:700,color:C.ink}}>{filtered.length} {filtered.length===1?'policy':'policies'} tracked</h2>
        </div>
        <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:C.faint}}>Tap to expand</span>
      </div>

      {/* DESKTOP: accordion cards */}
      <div className="pi-intel-desktop">
        {filtered.map(p=>(
          <PolicyCard key={p.id} policy={p} isOpen={open===p.id} onToggle={()=>setOpen(open===p.id?null:p.id)}/>
        ))}
      </div>

      {/* MOBILE: horizontal pill nav + single expanded card */}
      <div className="pi-intel-mobile" style={{display:'none',flexDirection:'column',gap:'0'}}>
        {/* Pill nav */}
        <div style={{display:'flex',gap:'6px',overflowX:'auto',paddingBottom:'10px',marginBottom:'14px',scrollbarWidth:'none'}}>
          {filtered.map((p,i)=>(
            <button key={p.id} onClick={()=>setMobIdx(i)} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',padding:'6px 12px',background:mobIdx===i?C.forest:'transparent',color:mobIdx===i?C.lime:C.muted,border:`1px solid ${mobIdx===i?C.forest:C.border}`,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0,transition:'all 0.15s'}}>
              {p.title.length>20?p.title.slice(0,18)+'...':p.title}
            </button>
          ))}
        </div>

        {/* Single policy panel */}
        {mobPolicy&&(
          <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
            {/* Panel header */}
            <div style={{background:C.forest,padding:'14px 16px'}}>
              <div style={{display:'flex',gap:'7px',alignItems:'center',flexWrap:'wrap',marginBottom:'6px'}}>
                <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(184,217,53,0.55)'}}>{mobPolicy.category}</span>
                <StatusBadge status={mobPolicy.status}/>
              </div>
              <div style={{fontFamily:F.sans,fontSize:'15px',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'3px'}}>{mobPolicy.title}</div>
              <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',marginBottom:'8px'}}>{mobPolicy.subtitle}</div>
              <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
                {mobPolicy.sectors.slice(0,4).map(s=>(<SectorTag key={s} idx={s}/>))}
                {mobPolicy.sectors.length>4&&<span style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(184,217,53,0.5)',alignSelf:'center'}}>+{mobPolicy.sectors.length-4}</span>}
              </div>
            </div>

            {/* Meta */}
            <div style={{background:C.paperDark,padding:'8px 16px',display:'flex',gap:'14px',flexWrap:'wrap',borderBottom:`1px solid ${C.border}`}}>
              {[{l:'Enacted',v:mobPolicy.enacted},{l:'Updated',v:mobPolicy.lastUpdated}].map((m,i)=>(
                <div key={i} style={{display:'flex',gap:'5px',alignItems:'center'}}>
                  <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint}}>{m.l}</span>
                  <span style={{fontFamily:F.mono,fontSize:'10px',color:C.ink}}>{m.v}</span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{padding:'14px 16px',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Overview</div>
              <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.75,color:C.ink,fontWeight:300}}>{mobPolicy.summary}</p>
            </div>

            {/* Key Figures — compact 2-col grid */}
            <div style={{padding:'12px 16px',borderBottom:`1px solid ${C.border}`,display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',background:C.paperDark}}>
              {mobPolicy.keyFigures.map((f,i)=>(
                <div key={i} style={{padding:'6px 0'}}>
                  <div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,marginBottom:'2px'}}>{f.label}</div>
                  <div style={{fontFamily:F.mono,fontSize:'12px',fontWeight:500,color:C.forest}}>{f.value}</div>
                </div>
              ))}
            </div>

            {/* First provision + expand toggle */}
            <div style={{padding:'12px 16px',borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted}}>Provisions</div>
                {!mobProv&&mobPolicy.provisions.length>1&&(
                  <button onClick={()=>setMobProv(true)} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.forest,background:'none',border:`1px solid ${C.border}`,padding:'3px 9px',cursor:'pointer'}}>
                    +{mobPolicy.provisions.length-1} more
                  </button>
                )}
                {mobProv&&(
                  <button onClick={()=>setMobProv(false)} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.muted,background:'none',border:`1px solid ${C.border}`,padding:'3px 9px',cursor:'pointer'}}>
                    Less
                  </button>
                )}
              </div>
              {(mobProv?mobPolicy.provisions:mobPolicy.provisions.slice(0,1)).map((p,i)=>(
                <div key={i} style={{border:`1px solid ${C.border}`,padding:'10px 12px',background:C.paperDark,marginBottom:i<(mobProv?mobPolicy.provisions:mobPolicy.provisions.slice(0,1)).length-1?'6px':'0'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'4px',gap:'8px'}}>
                    <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,flex:1}}>{p.title}</span>
                    <ImpactBadge impact={p.impact}/>
                  </div>
                  <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6,fontStyle:'italic',marginBottom:'6px'}}>{p.detail}</p>
                  <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
                    {p.sectors.map(s=><SectorTag key={s} idx={s}/>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Watch */}
            <div style={{padding:'10px 16px',background:'rgba(27,77,62,0.04)',display:'flex',gap:'10px',alignItems:'flex-start'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,background:C.forest,padding:'3px 8px',flexShrink:0}}>Watch</span>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.7}}>{mobPolicy.watch}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

const RegulatoryCalendar=()=>{
  const events=[
    {date:'Nov 2025',event:'Digital Credit Services Directive: licensing applications open',policy:'DCD',status:'Enacted'},
    {date:'Jan 2026',event:'2026 National Budget: implementation begins',policy:'Budget 2026',status:'Active'},
    {date:'Q1 2026',event:'1D1F Working Capital Fund: disbursement window',policy:'1D1F',status:'Pending'},
    {date:'Q1 2026',event:'MoFA Oil Palm Window: application period',policy:'Agri Modernisation',status:'Pending'},
    {date:'Q2 2026',event:'NHIA Digital Claims RFP: procurement launch',policy:'NHIS Reform',status:'Pending'},
    {date:'Q2 2026',event:'Sankofa Diaspora Bond: prospectus expected',policy:'Sankofa',status:'Pending'},
    {date:'Jun 2026',event:'Digital Credit Directive: compliance deadline for all providers',policy:'DCD',status:'Announced'},
    {date:'Q3 2026',event:'AfCFTA Phase 2 tariff schedule: review and adjustment',policy:'AfCFTA',status:'Monitoring'},
    {date:'Q3 2026',event:'Warehouse Receipt System: legal framework gazette expected',policy:'Agri Modernisation',status:'Pending'},
    {date:'Q4 2026',event:'BRIDGE Policy Tracker: next full review and update',policy:'Internal',status:'Monitoring'},
  ];
  return(
    <div className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Regulatory Calendar</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,26px)',fontWeight:700,color:C.ink,marginBottom:'24px'}}>Key dates, deadlines &amp; windows &mdash; 2025-2026</h2>
        <div>
          {events.map((e,i)=>{
            const s=STATUS[e.status]||STATUS['Monitoring'];
            return(
              <div key={i} style={{display:'grid',gridTemplateColumns:'80px 1fr auto',gap:'16px',alignItems:'start',padding:'11px 0',borderBottom:i<events.length-1?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:500,color:C.forest,paddingTop:'1px'}}>{e.date}</div>
                <div>
                  <p style={{fontFamily:F.sans,fontSize:'13px',color:C.ink,lineHeight:1.4,marginBottom:'3px'}}>{e.event}</p>
                  <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>{e.policy}</span>
                </div>
                <div className="cal-badge"><StatusBadge status={e.status}/></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SectorMatrix=()=>(
  <div className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Sector Impact Matrix</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,26px)',fontWeight:700,color:C.ink,marginBottom:'24px'}}>Which policies affect which sectors</h2>
      <div className="matrix-table" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'700px'}}>
          <thead>
            <tr>
              <td style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.muted,padding:'6px 8px',letterSpacing:'1px',textTransform:'uppercase',width:'140px'}}>Policy</td>
              {SECTORS_SHORT.map((s,i)=>(
                <td key={i} style={{fontFamily:F.mono,fontSize:'8px',color:C.muted,padding:'6px 4px',textAlign:'center',writingMode:'vertical-rl',whiteSpace:'nowrap',height:'80px',verticalAlign:'bottom'}}>{String(i+1).padStart(2,'0')} {s}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {POLICIES.map((p,pi)=>(
              <tr key={pi} style={{borderBottom:`1px solid ${C.border}`,background:pi%2===0?C.paper:C.paperDark}}>
                <td style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:C.ink,padding:'8px',lineHeight:1.3}}>{p.title}</td>
                {SECTORS_SHORT.map((_,si)=>(
                  <td key={si} style={{textAlign:'center',padding:'8px 4px'}}>
                    {p.sectors.includes(si)&&(
                      <div style={{width:'10px',height:'10px',borderRadius:'2px',background:C.forest,margin:'0 auto'}}/>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="matrix-mobile" style={{display:'none'}}>
        {POLICIES.map((p,pi)=>(
          <div key={pi} style={{padding:'11px 0',borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'7px',lineHeight:1.3}}>{p.title}</div>
            <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
              {p.sectors.map(si=>(
                <span key={si} style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:C.forest,background:'rgba(27,77,62,0.08)',padding:'3px 7px',borderRadius:'2px'}}>
                  {String(si+1).padStart(2,'0')} {SECTORS_SHORT[si]}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint}}>Each tag indicates the policy directly affects BRIDGE sector strategy or venture pipeline.</div>
    </div>
  </div>
);

const Footer=()=>{
  const bt='1px solid rgba(184,217,53,0.15)';
  return(
  <div className="pad-footer no-print" style={{background:'#060e08',padding:'14px 64px',borderTop:bt}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={16} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.1)'}}/>
        <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.2)'}}>Policy Tracker &middot; PT-01 &middot; bridgepbc.com</span>
      </div>
      <div className="mob-hide" style={{display:'flex',gap:'14px'}}>
        {[{l:'All Documents',h:'/resources'},{l:'Sector Briefs',h:'/resources'},{l:'Members',h:'/membership'},{l:'bridgepbc.com',h:'#'}].map((item,i)=>(<a key={i} href={item.h} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.2)',textDecoration:'none'}}>{item.l}</a>))}
      </div>
    </div>
  </div>
  );
};

export default function PolicyTracker(){
  const[open,setOpen]=useState('budget2026');
  const[filter,setFilter]=useState('ALL');
  const coverLogoRef=useRef(null);
  const filtered=filter==='ALL'?POLICIES:POLICIES.filter(p=>p.category===filter);

  return(
    <div style={{fontFamily:F.body,background:C.paper}}>
      <Gf/>
      <TopBar coverLogoRef={coverLogoRef}/>
      <Cover logoRef={coverLogoRef}/>

      {/* Filter bar — horizontal scroll on mobile */}
      <div className="no-print" style={{background:C.paperDark,borderBottom:`1px solid ${C.border}`,padding:'10px 64px'}}>
        <div className="filter-bar" style={{display:'flex',gap:'6px',flexWrap:'wrap',alignItems:'center',overflowX:'auto'}}>
          {['ALL',...CATEGORIES].map(cat=>(
            <button key={cat} onClick={()=>{setFilter(cat);setOpen(null);}} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',padding:'5px 12px',background:filter===cat?C.forest:'transparent',color:filter===cat?C.paper:C.muted,border:`1px solid ${filter===cat?C.forest:C.border}`,cursor:'pointer',transition:'all 0.15s',whiteSpace:'nowrap',flexShrink:0}}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <PolicyIntelligence filtered={filtered} open={open} setOpen={setOpen}/>
      <RegulatoryCalendar/>
      <SectorMatrix/>
      <Footer/>
    </div>
  );
}
