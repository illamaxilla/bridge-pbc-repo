import { useState, useEffect, useRef } from "react";

import { C, F } from '../theme';
/* ═══════════════════════════════════════════════════════════════════════════
   BRIDGE SECTOR INTELLIGENCE BRIEFS  ·  ALL 12 SECTORS
   Public sample edition — teaser for paid full brief
   Single data-driven component: pass sectorId prop (1–12) or use navigator
═══════════════════════════════════════════════════════════════════════════ */

const tierColor=t=>t==='Core'?C.lime:t==='Emerging'?C.amber:C.muted;
const tierText=t=>t==='Core'?C.positive:t==='Emerging'?C.amber:C.muted;

/* ── SVG LOGO ───────────────────────────────────────────────────────────── */
const Logo=({height=28,variant='white'})=>{const tf=variant==='white'?'#ffffff':'#1B4D3E';return(<svg height={height} viewBox="0 0 4113.8 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}><polygon fill="#1B4D3E" stroke="#1B4D3E" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/><path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1Z"/><path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4Z"/><path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1Z"/><path fill={tf} d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4c-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1c31.6,18.3,57,47.9,72.9,84.6c29.9,60.2,91.8,84.9,149.2,51.8c9.7-5.5,17.6-11.8,24.2-18.5Z"/><path fill={tf} d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1c20.7,15.4,38.5,34.7,52.2,57c13.3-10,27.7-18.6,43-25.4c27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6Z"/><rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/><rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/><path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7c0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8Z"/><rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/><rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/><rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/></svg>);};

const Gf=()=>(<style>{`
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .dc::first-letter{font-family:${F.display};font-size:4.5em;font-weight:900;float:left;line-height:0.8;margin:0.1em 0.12em 0 0;color:${C.forest};}
  @media print{.np{display:none!important;}}
  .mob-show{display:none;}
  .subs-table{display:block;}
  .subs-cards{display:none;}
  @media(max-width:900px){
    .tc{grid-template-columns:1fr!important;}
    .hm{display:none!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-gate{padding:40px 32px!important;}
    .pad-footer{padding:14px 32px!important;}
    .pad-topbar{padding:10px 24px!important;}
    .pad-nav{padding:10px 24px!important;}
  }
  @media(max-width:600px){
    .tc{grid-template-columns:1fr!important;}
    .pad-section{padding:24px 18px!important;}
    .pad-cover{padding:20px 18px 0!important;}
    .pad-gate{padding:24px 18px!important;}
    .pad-footer{padding:16px 18px!important;}
    .pad-topbar{padding:10px 18px!important;}
    .pad-nav{padding:8px 18px!important;}
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}
    .mob-full{width:100%!important;}
    .stats-grid{grid-template-columns:1fr 1fr!important;}
    .subs-table{display:none!important;}
    .subs-cards{display:grid!important;grid-template-columns:1fr 1fr;gap:8px;}
    .gate-value-line{display:none!important;}
    .gate-cta-row{flex-direction:column!important;}
    .gate-cta-row a{justify-content:center!important;}
    .gate-tertiary{display:none!important;}
    .footer-links{display:none!important;}
    .footer-inner{justify-content:center!important;}
    /* Progressive disclosure */
    .mob-item-hidden{display:none!important;}
    .mob-toggle{display:flex!important;align-items:center;justify-content:space-between;width:100%;padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};}
    .mob-toggle-hdr{border-bottom:1px solid rgba(255,255,255,0.08)!important;color:rgba(250,248,243,0.4)!important;}
  }
`}</style>);

/* ═══════════════════════════════════════════════════════════════════════════
   SECTOR DATA — all 12 sectors
═══════════════════════════════════════════════════════════════════════════ */
const SECTORS = [
  {
    id:1, num:'01', name:'Infrastructure', shortName:'Infrastructure',
    tier:'Core', score:87, capital:'$25–30M', edition:'March 2026 Edition',
    tagline:'Ghana\'s physical backbone is both its greatest constraint and its highest-return investment opportunity. Every sector\'s ceiling is set by the infrastructure beneath it.',
    stats:[{l:'Infrastructure Gap',v:'$12B+'},{l:'Road Network Paved',v:'18%'},{l:'Urban Population',v:'58%'},{l:'Kejetia Vendors',v:'10,000+'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:85},{d:'Development Impact',w:'30%',s:90},{d:'Implementation Feasibility',w:'25%',s:86},{d:'Financial Sustainability',w:'15%',s:82}],
    snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'87/100'},{l:'Priority',v:'Immediate deployment'},{l:'Capital',v:'$25–30M'},{l:'Timeline',v:'12–24 months'},{l:'Ventures in DB',v:'22 assessed'}],
    summary:`Ghana's infrastructure deficit is not a development problem. It is a compounding tax on every other sector's potential. A road network that is 18% paved means agricultural produce rots before it reaches market. Inadequate port infrastructure adds cost to every import and export. Unreliable power raises the cost of every manufacturing operation and data centre.`,
    summary2:`BRIDGE's infrastructure mandate is precise: not to build everything, but to identify the specific bottlenecks whose removal unlocks the highest multiplied returns across the integrated 12-sector portfolio. The Kejetia Market digitisation platform is the archetype — physical infrastructure meeting digital infrastructure at the point where economic activity is densest.`,
    summary3:`With $25–30M deployed across road connectivity, market infrastructure, water systems, and digital backbone, BRIDGE models a 3.2x development multiplier — meaning each dollar of infrastructure investment unlocks $3.20 of value across dependent sectors.`,
    quote:`"Infrastructure is not a sector. It is the precondition for every other sector's existence. BRIDGE treats it accordingly — as the foundation investment that makes the entire portfolio compoundable."`,
    subs:[
      {name:'Road & Connectivity Networks',score:91,stage:'Active investment',capital:'$8–12M',note:'Agri value chain unlock; regional market access'},
      {name:'Market Infrastructure (Kejetia-type)',score:88,stage:'Series A ready',capital:'$4–6M',note:'Digital-physical integration; 10,000+ vendor reach'},
      {name:'Port & Trade Infrastructure',score:85,stage:'Active',capital:'$6–10M',note:'Tema port efficiency; import/export cost reduction'},
      {name:'Water & Sanitation Systems',score:82,stage:'Seed–A',capital:'$3–5M',note:'Urban and peri-urban WASH; health sector co-benefit'},
      {name:'Energy Grid & Last-Mile Power',score:79,stage:'Seed–A',capital:'$2–4M',note:'Industrial reliability; connects to Sector 10 (Energy)'},
      {name:'Digital Backbone & Rural Broadband',score:76,stage:'Seed',capital:'$2–3M',note:'Foundation layer; all tech-sector ventures dependent'},
    ],
    risks:[
      {r:'Government procurement delays and political cycle dependency',sev:'High',mit:'Structured PPP frameworks; BRIDGE as implementation intermediary'},
      {r:'FX risk on USD-denominated construction costs',sev:'High',mit:'Cedi-denominated contracts where possible; local procurement first'},
      {r:'Community displacement and land acquisition challenges',sev:'Medium',mit:'Community co-design; benefit-sharing structures built into project design'},
      {r:'Long payback periods (8–15 years) vs. investor expectations',sev:'Medium',mit:'Patient capital structures; blended finance with DFI concessional tranches'},
      {r:'Maintenance funding gap post-construction',sev:'Medium',mit:'Revenue-generating models (tolling, market fees, digital services)'},
    ],
    thesis:`BRIDGE's infrastructure thesis centres on the multiplier logic: one well-chosen infrastructure investment unlocks disproportionate value across the portfolio. The Kejetia model is generalisable — West Africa has hundreds of high-density market and logistics nodes that are operating well below potential due to infrastructure fragmentation.`,
    thesis2:`Critically, BRIDGE does not pursue infrastructure as a public goods play. Every infrastructure investment in the portfolio is designed with a revenue model — market management fees, digital transaction tolls, utility offtake agreements — that creates financial sustainability alongside development impact.`,
    deploy:[
      {l:'Ticket size',v:'$2M–$8M per project'},{l:'Structure',v:'Equity + quasi-equity'},{l:'Revenue model',v:'Required — no grants'},
      {l:'DFI co-investment',v:'Actively sought'},{l:'Exit horizon',v:'10–15 years; asset sale or refinancing'},{l:'Government partnership',v:'Required for permitting'},
    ],
    gate:['Kejetia financial model — full 10-year P&L projection with scenario analysis for phased vendor onboarding and fee escalation','Market Resilience Platform specs — technical standards for replication across 16 regional markets with capital requirements per site','WASH investment database — 400+ underserved communities mapped with demand scoring and MMDA readiness assessment','Vendor onboarding playbook — training protocols, peer educator programme, and digital literacy integration plan','District Assembly toolkit — DACF application templates, MMDA partnership MOUs, and community governance framework','Policy monitoring — Model Markets mandate rollout tracking with legislative calendar and BRIDGE engagement pathway','Market Resilience Platform: Kejetia site assessment, sanitation contract model, solar micro-grid specification, and Market Queen partnership terms','Public Toilet Network: 25-site rollout plan, operator training curriculum, fee structure benchmarking, and community revenue-sharing model','Market Solar Micro-Grid: panel sizing methodology, battery specification, ECG interconnection terms, and 50-market rollout plan','Market Cold Storage: equipment specification, supplier roster, cooperative off-take agreements, and 20-site feasibility assessments','Drainage Infrastructure SPV: legal structure, MMDA partnership terms, hydrological study methodology, and climate-proofing standards','Water Kiosk Network: operator franchise model, 100-site location analysis, metering technology comparison, and community ownership pathway','MMDA Capacity Building: 10-district training curriculum, planning staff assessment framework, and P&P framework rollout plan','BRIDGE Peace & Prosperity Notes: note structure, investor terms, community governance model, and $5M first-tranche roadmap','Infrastructure Data Platform: data architecture, MMDA integration pathway, and public accountability dashboard specification','Market Resilience Company (Ghana) Ltd: legal structure, shareholding model, governance framework, and KMA partnership agreement','Quarterly infrastructure sector intelligence: construction cost indices, MMDA project pipeline, infrastructure condition monitoring, and DFI funding developments'],
  },
  {
    id:2, num:'02', name:'Financial Inclusion', shortName:'Fin. Inclusion',
    tier:'Core', score:84, capital:'$30–35M', edition:'March 2026 Edition',
    tagline:'Forty percent of Ghanaian adults remain outside formal financial systems. That is not a poverty story. It is a market opportunity of the highest order — and the infrastructure to serve it already exists.',
    stats:[{l:'Adults Unbanked',v:'40%'},{l:'SME Credit Gap',v:'$4–6B'},{l:'Licensed Fintechs',v:'57'},{l:'GHS Processed',v:'3 Trillion'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:88},{d:'Development Impact',w:'30%',s:86},{d:'Implementation Feasibility',w:'25%',s:80},{d:'Financial Sustainability',w:'15%',s:82}],
    snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'84/100'},{l:'Priority',v:'Immediate deployment'},{l:'Capital',v:'$30–35M'},{l:'Timeline',v:'12–30 months'},{l:'Ventures in DB',v:'24 assessed'}],
    summary:`Ghana's financial inclusion story is already underway — 57 licensed fintechs processing GHS 3 trillion annually, a mobile money infrastructure that rivals any in sub-Saharan Africa, and a BOG that has consistently supported digital financial services expansion. The question is not whether the market is ready. It is whether organised capital can catalyse the next phase of growth before the window closes.`,
    summary2:`The $4–6B SME credit gap is the single most consequential financial inclusion number in Ghana. Millions of businesses with demonstrated revenue, loyal customers, and viable growth trajectories cannot access the capital to scale. They are not bad credit risks. They are unscored credit risks — and that is a solvable problem.`,
    summary3:`BRIDGE's financial inclusion mandate targets the infrastructure layer: credit scoring, savings products, insurance mechanisms, and cross-border payment efficiency that converts 40% financial exclusion into 40% addressable market. The diaspora network is central to this — $6.65B in annual remittances flowing through high-cost channels represents both a revenue opportunity and a capital mobilisation platform.`,
    quote:`"Ghana's fintech infrastructure is world-class. What it lacks is the capital intelligence to route it toward the households and businesses that need it most. That is BRIDGE's job."`,
    subs:[
      {name:'SME Lending Platforms',score:88,stage:'Series A ready',capital:'$5–8M',note:'$4–6B credit gap; underserved SME base with demonstrated cash flow'},
      {name:'Cross-border & Diaspora Remittances',score:84,stage:'Series A',capital:'$3–5M',note:'$6.65B annual inflow; 15–20% cost reduction opportunity'},
      {name:'Mobile Money & Payments Infrastructure',score:83,stage:'Growth',capital:'$4–6M',note:'GHS 3T processed; interoperability and merchant expansion'},
      {name:'Insurance & Risk Products',score:80,stage:'Seed–A',capital:'$2–4M',note:'Agriculture micro-insurance; health coverage for informal sector'},
      {name:'Savings & Wealth Accumulation Products',score:76,stage:'Seed',capital:'$1–3M',note:'Diaspora-linked savings; household wealth building at scale'},
      {name:'Credit Scoring & Alternative Data',score:74,stage:'Early',capital:'$1–2M',note:'Unbanked scoring; BOG regulatory sandbox support'},
    ],
    risks:[
      {r:'BOG regulatory changes affecting mobile money and fintech licensing',sev:'Medium',mit:'Active regulatory engagement; BRIDGE government partnership framework'},
      {r:'Cedi depreciation eroding USD-measured returns',sev:'High',mit:'Local currency instruments; hedging through DFI structures'},
      {r:'Market consolidation compressing margins at scale',sev:'Medium',mit:'Portfolio diversity; invest across value chain not in single category'},
      {r:'Over-indebtedness risk in SME lending segment',sev:'Medium',mit:'Responsible lending standards; credit bureau integration'},
      {r:'Talent gap in financial technology product development',sev:'Low',mit:'Diaspora tech network; university partnerships with Ashesi, KNUST'},
    ],
    thesis:`BRIDGE's financial inclusion thesis has three layers. First, the infrastructure layer — credit scoring systems, payment rails, and identity verification that makes serving the unbanked commercially viable. Second, the product layer — SME credit, micro-insurance, and savings products designed for Ghana's income profile. Third, the diaspora layer — converting remittance flows from consumption into investment through structured financial products.`,
    thesis2:`The three layers are interdependent and sequenced. BRIDGE deploys infrastructure-layer capital first, product-layer capital second, and diaspora-layer capital continuously. The result is a compounding financial inclusion flywheel.`,
    deploy:[
      {l:'Ticket size',v:'$500K–$5M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Ownership target',v:'10–20%'},
      {l:'Revenue model',v:'Required from day one'},{l:'Exit horizon',v:'5–8 years; strategic or IPO'},{l:'Co-investment',v:'DFI and diaspora preferred'},
    ],
    gate:['Complete 17-venture detailed financial models with sensitivity analysis','Bank of Ghana regulatory compliance framework and MFI licensing roadmap','Digital Susu Integration: technology specifications and collector onboarding playbook','Women\'s Economic Empowerment Fund: gender-lens investment criteria and targets','Cross-sector financial product integration maps (12 sectors × credit touchpoints)','Quarterly sector intelligence updates with portfolio performance tracking','Competitive landscape mapping: 23 banks, 9 MFIs, 15+ fintechs, susu sector','Diaspora Investment Gateway: product design, legal structure, and pilot plan','Alternative credit scoring methodology: data sources, model architecture, validation','Financial Health Hub: curriculum design, delivery model, and partnership structure','BRIDGE MFI licensing feasibility study with capital requirements and timeline','Market Financial Services Platform: Kejetia platform architecture, MoMo integration, trader onboarding model, and 10,000-vendor activation plan','Trader Working Capital Facility: credit assessment methodology using market transaction data, group lending model, and default management framework','MSME Credit Guarantee Facility: guarantee structure, bank partnership terms, risk-sharing model, and $50M facility design','Remittance-to-Investment Products: product structure, partner remittance provider terms, and diaspora activation strategy','Fintech Equity Portfolio: investment criteria, pipeline assessment framework, and term sheet templates for Ghana-stage fintechs','BOG Digital Credit Services Directive: compliance roadmap, licensing timeline, and minimum capital planning'],
  },
  {
    id:3, num:'03', name:'Health Systems', shortName:'Health Systems',
    tier:'Core', score:79, capital:'$10–15M', edition:'March 2026 Edition',
    tagline:'Ghana trains doctors that heal the world. The 1:6,000 doctor-to-patient ratio at home is not a capacity failure — it is a systems failure. And systems failures yield to intelligent capital and design.',
    stats:[{l:'Doctor-to-Patient',v:'1:6,000'},{l:'Doctors Practising Abroad',v:'56%'},{l:'NHIS Coverage',v:'~40%'},{l:'Health GDP Share',v:'3.5%'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:75},{d:'Development Impact',w:'30%',s:92},{d:'Implementation Feasibility',w:'25%',s:72},{d:'Financial Sustainability',w:'15%',s:68}],
    snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'79/100'},{l:'Priority',v:'Immediate deployment'},{l:'Capital',v:'$10–15M'},{l:'Timeline',v:'18–36 months'},{l:'Ventures in DB',v:'16 assessed'}],
    summary:`Ghana's health system paradox is stark: the country produces medical graduates at a rate that places it among Africa's strongest, yet 56% of those graduates practise abroad. The result is a domestic system stretched to its limits — a 1:6,000 doctor-to-patient ratio, critical shortages in diagnostic equipment, and a pharmaceutical supply chain with chronic stock-out rates.`,
    summary2:`BRIDGE's health mandate is not to replace the public system. It is to build the connective infrastructure — telemedicine platforms, supply chain technology, diagnostic networks, and community health worker tools — that multiply the impact of every health worker in Ghana. One well-deployed telemedicine platform can extend the reach of a single doctor from 200 to 2,000 patients.`,
    summary3:`The NHIS presents a particularly compelling structural opportunity. With approximately 40% population coverage and persistent claims processing inefficiencies, a well-designed health insurance technology platform can simultaneously reduce fraud, improve cash flow for providers, and expand coverage — a rare triple-win architecture.`,
    quote:`"Ghana does not lack health talent. It lacks the systems infrastructure to retain that talent at home and multiply its impact. BRIDGE builds the infrastructure that makes staying — and scaling — rational."`,
    subs:[
      {name:'Telemedicine & Remote Diagnostics',score:82,stage:'Seed–A',capital:'$2–4M',note:'Rural reach; 1:6,000 ratio bridge; CHPS integration pathway'},
      {name:'Medical Supply Chain Technology',score:79,stage:'Seed–A',capital:'$2–3M',note:'Stock-out reduction; procurement efficiency; cold chain'},
      {name:'Community Health Worker Platforms',score:78,stage:'Seed',capital:'$1–2M',note:'Last-mile delivery; Ghana Health Service CHPS integration'},
      {name:'Health Insurance Technology (NHIS)',score:74,stage:'Seed–A',capital:'$1–2M',note:'Claims processing; fraud reduction; coverage expansion'},
      {name:'Diagnostic & Imaging Networks',score:74,stage:'Seed',capital:'$1–3M',note:'Accra-region rollout; referral system integration'},
      {name:'Mental Health Services Infrastructure',score:67,stage:'Early',capital:'$0.5–1M',note:'Emerging demand; significant underservice; first-mover opportunity'},
    ],
    risks:[
      {r:'Regulatory complexity in healthcare — GHS, FDA, NHIS fragmentation',sev:'High',mit:'Dedicated regulatory affairs in portfolio companies; BRIDGE policy interface'},
      {r:'Low willingness-to-pay in primary care segment',sev:'Medium',mit:'B2B models (employer, NHIS, NGO) rather than direct-to-consumer'},
      {r:'Infrastructure dependency — power, connectivity for digital health',sev:'High',mit:'Offline-first architecture; solar-powered deployment models'},
      {r:'Brain drain acceleration if diaspora incentives not matched',sev:'Medium',mit:'Retention-linked investment; salary supplementation structures'},
      {r:'Data privacy and patient consent in low-literacy contexts',sev:'Low',mit:'Community consent protocols; GHS data governance partnership'},
    ],
    thesis:`Health is BRIDGE's highest-impact sector by Development Impact dimension score (92/100) and one of the most straightforward thesis formulations: every dollar of health system infrastructure investment generates returns across the entire human capital base of Ghana. Healthier workers are more productive workers. Healthier children become more capable adults.`,
    thesis2:`BRIDGE's preferred investment architecture in health is B2B-first: platforms that serve the NHIS, Ghana Health Service, employer groups, and NGOs rather than relying on fragile direct-to-consumer revenue. This structure provides predictable cash flow, lower customer acquisition cost, and greater development impact per dollar deployed.`,
    deploy:[
      {l:'Ticket size',v:'$500K–$3M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Model preference',v:'B2B / institutional first'},
      {l:'NHIS integration',v:'Strong positive signal'},{l:'Exit horizon',v:'7–10 years; strategic or regional'},{l:'Co-investment',v:'Global health funds; DFIs'},
    ],
    gate:['Complete 19-venture financial models with NHIS reimbursement analysis and sensitivity scenarios','Telemedicine regulatory compliance guide: Medical and Dental Council licensing, liability structure','Healthcare Worker Retention Fund: compensation benchmarking, MoH co-funding negotiation playbook','CHPS Strengthening: 50-compound deployment plan with equipment lists and telemedicine integration specs','Health information exchange: data governance framework and patient privacy compliance','Quarterly health sector intelligence updates with diaspora engagement tracking','Diaspora Healthcare Registry: platform specifications, outreach strategy, and partnership framework with GMA','Community Clinic Network: site selection criteria, staffing models, and GHS partnership terms','CME Platform: curriculum framework, diaspora faculty engagement model, and accreditation pathway','HealthTech Portfolio: 40+ startup landscape assessment with investment criteria and pipeline','Specialized Care Center: feasibility study with location analysis, equipment costing, and NHIS payment model','Pharmaceutical Supply Chain Platform: procurement system specification, GHS cold chain integration, and stock-out reduction target methodology','Community Health Worker App: GHS CHPS integration plan, data architecture, offline functionality specification, and 3,000-worker rollout','NHIS Claims Technology: claims processing specification, fraud detection methodology, provider onboarding plan, and NIA partnership terms','Market Trader Health Insurance: actuarial model, NHIA partnership terms, underwriting criteria, and Kejetia pilot activation plan','Diagnostic Mobile Network: equipment specification, solar power design, clinical protocol handbook, and 10-district rollout plan','Maternal Health Platform: antenatal tracking architecture, midwife training curriculum, and outcome measurement framework','Diaspora Return Pathway: CME credit framework, GHS registration pathway, and 100-professional first-year recruitment plan'],
  },
  {
    id:4, num:'04', name:'Technology & Innovation', shortName:'Technology',
    tier:'Emerging', score:76, capital:'$10–15M', edition:'March 2026 Edition',
    tagline:'Ghana risks irrelevance in the digital economy — not from lack of talent, but from lack of organised capital and connective infrastructure. This brief maps the opportunity architecture.',
    stats:[{l:'Licensed Fintechs',v:'57'},{l:'GHS Processed Annually',v:'3 Trillion'},{l:'Adult Financial Exclusion',v:'40%'},{l:'Tech Graduates Annually',v:'12,000+'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:72},{d:'Development Impact',w:'30%',s:81},{d:'Implementation Feasibility',w:'25%',s:74},{d:'Financial Sustainability',w:'15%',s:68}],
    snapshot:[{l:'Tier',v:'Emerging'},{l:'Score',v:'76/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$10–15M'},{l:'Timeline',v:'18–36 months'},{l:'Ventures in DB',v:'18 assessed'}],
    summary:`Ghana's technology sector sits at an inflection point. Fifty-seven licensed fintechs processing GHS 3 trillion annually. A mobile money infrastructure that rivals any in sub-Saharan Africa. And a talent pipeline — from KNUST, University of Ghana, Ashesi — that consistently produces founders capable of competing globally.`,
    summary2:`The gap is not capability. It is capital architecture. Ghana's tech ecosystem lacks the organised Seed and Series A infrastructure to capture the majority of its own digital value creation. Without it, the most promising ventures either stall at validation stage or migrate to Nairobi, Lagos, and London — taking Ghana's embedded knowledge with them.`,
    summary3:`BRIDGE's mandate in this sector: deploy $10–15M in organised early-stage capital across 5–10 ventures with demonstrated product-market fit, anchor them to Ghana's financial inclusion and infrastructure priorities, and build the connective tissue between the diaspora tech network and in-country founders.`,
    quote:`"Ghana's tech opportunity is not a startup story. It is an infrastructure story wearing startup clothes."`,
    subs:[
      {name:'Fintech & Payments',score:82,stage:'Series A ready',capital:'$4–6M',note:'57 licensed players; consolidation opportunity'},
      {name:'AgriTech Platforms',score:79,stage:'Seed–A',capital:'$2–4M',note:'Post-harvest value recovery; connects to Sector 06'},
      {name:'Logistics & Supply Chain Tech',score:77,stage:'Seed–A',capital:'$2–3M',note:'Last-mile infrastructure gap; connects to Sector 12'},
      {name:'HealthTech',score:74,stage:'Seed',capital:'$1–2M',note:'Telemedicine acceleration; rural reach imperative'},
      {name:'EdTech',score:71,stage:'Seed',capital:'$1–2M',note:'Skills gap platform; connects to Sector 05'},
      {name:'GovTech / Civic Tech',score:68,stage:'Early',capital:'$1M',note:'Public sector digital transformation pipeline'},
    ],
    risks:[
      {r:'Talent flight to Lagos, Nairobi, and London',sev:'High',mit:'Anchor incentives; co-investment with diaspora network'},
      {r:'Regulatory uncertainty in fintech licensing',sev:'Medium',mit:'Government partnership strategy; BOG engagement'},
      {r:'FX risk on USD-denominated returns',sev:'Medium',mit:'Cedi-denominated structures; DFI hedging instruments'},
      {r:'Market size constraints at local scale',sev:'Low',mit:'Pan-West African expansion as second-stage thesis'},
      {r:'Infrastructure dependency on power and data',sev:'High',mit:'Sector 01 integration; resilience-first product architecture'},
    ],
    thesis:`BRIDGE's technology thesis is anchored in the belief that Ghana's competitive advantage lies not in building generic SaaS for global markets — but in building digital infrastructure for Ghana's specific institutional, agricultural, and financial architecture. Ventures that solve Ghana-specific problems have structural defensibility that no foreign entrant can replicate.`,
    thesis2:`Preferred investment profile: companies with 12+ months of revenue, demonstrated unit economics, and a clear pathway to the financial inclusion, agriculture, or infrastructure markets. Generalist consumer apps are lower priority than sector-specific B2B and B2B2C platforms.`,
    deploy:[
      {l:'Ticket size',v:'$500K–$3M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Ownership target',v:'12–25%'},
      {l:'Board / observer',v:'Required for $2M+'},{l:'Co-investment',v:'Diaspora network preferred'},{l:'Exit horizon',v:'7–10 years; strategic or regional'},
    ],
    gate:['Kejetia Digital Platform: full technical specifications, vendor onboarding playbook, and Phase 1–3 deployment plan','Tech Talent Bridge Program: diaspora mentor network directory, employer partnerships, and placement tracking','Female Founder Accelerator: curriculum design, cohort selection criteria, and diaspora mentor roster','Agtech Portfolio: company landscape, integration map with BRIDGE Agriculture cooperative network','Market Platform Replication: site selection criteria for 16-region rollout with capital requirements per site','Quarterly technology sector intelligence: funding flows, ecosystem developments, and portfolio performance','BRIDGE Growth Fund — Technology: fund structure, LP terms, investment criteria, and portfolio company pipeline','Fintech Portfolio: 40+ company landscape assessment with investment shortlist and due diligence framework','Hub Partnership Programme: MEST, Ghana Tech Lab, and Impact Hub deal-flow agreements and co-investment terms','Diaspora Angel Syndicate: legal structure, investor qualification, and deal syndication process','AI/ML Centre feasibility: institutional partnership options, research focus areas, and commercialisation model','Digital Apprenticeship Pipeline: TVET partner shortlist, employer co-investment model, and 500-graduate first-year plan','Ghana Tech Ecosystem Map: hub assessment, investor directory, accelerator programme analysis, and talent flow data','BOG/NCA regulatory briefings: fintech licensing developments, data protection compliance, and sandbox application guidance'],
  },
  {
    id:5, num:'05', name:'Education & Skills', shortName:'Education',
    tier:'Emerging', score:72, capital:'$5–10M', edition:'March 2026 Edition',
    tagline:'Ghana\'s youth bulge is either its greatest asset or its greatest risk. The difference is determined entirely by the quality of the skills infrastructure built in the next decade.',
    stats:[{l:'Youth Unemployment',v:'12.4%'},{l:'TVET Enrolment Gap',v:'600,000+'},{l:'Literacy Rate',v:'79%'},{l:'Annual STEM Graduates',v:'8,000+'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:68},{d:'Development Impact',w:'30%',s:88},{d:'Implementation Feasibility',w:'25%',s:70},{d:'Financial Sustainability',w:'15%',s:56}],
    snapshot:[{l:'Tier',v:'Emerging'},{l:'Score',v:'72/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$5–10M'},{l:'Timeline',v:'18–36 months'},{l:'Ventures in DB',v:'14 assessed'}],
    summary:`Ghana's education system produces graduates at scale — but the skills that system certifies are increasingly misaligned with the economy's actual needs. The most pressing gap is not in tertiary education but in technical and vocational training: a TVET enrolment shortfall of over 600,000 students against a manufacturing, construction, and services economy that urgently needs skilled tradespeople.`,
    summary2:`The business model challenge in education is real. Consumer willingness-to-pay is constrained by household income, and impact at scale requires institutional channels — employer partnerships, government subsidies, and international remittance flows redirected toward education finance. BRIDGE's education investments are structured accordingly: B2B first, with direct-to-consumer as a secondary channel unlocked by proven institutional traction.`,
    summary3:`The diaspora education connection is underexplored. Ghanaian diaspora households allocate significant resources to relatives' education — but largely through informal, high-cost channels. A structured diaspora education finance product could mobilise $200–400M annually toward Ghana's human capital development while generating commercially attractive returns.`,
    quote:`"The skills gap is not a failure of ambition. It is a failure of infrastructure. Ghana's young people are ready to learn. The question is whether we build the systems that meet them where they are."`,
    subs:[
      {name:'TVET & Technical Skills Platforms',score:80,stage:'Seed–A',capital:'$2–4M',note:'Youth unemployment; skills-jobs mismatch; employer-linked'},
      {name:'Early Childhood & Foundation Education',score:76,stage:'Seed',capital:'$1–2M',note:'Preschool access gap; long-term human capital compounding'},
      {name:'Teacher Training & Quality Technology',score:72,stage:'Early–Seed',capital:'$1–2M',note:'Rural school quality; GES partnership pathway'},
      {name:'Higher Education Access Platforms',score:70,stage:'Seed',capital:'$1–2M',note:'Tertiary participation rate; remote and hybrid learning'},
      {name:'Diaspora Education Finance Products',score:69,stage:'Early',capital:'$1–2M',note:'Remittance-to-education pipeline; structured savings products'},
      {name:'Corporate Training & Upskilling',score:66,stage:'Early',capital:'$0.5–1M',note:'Private sector L&D market; employer-funded demand'},
    ],
    risks:[
      {r:'Government curriculum constraints limiting EdTech market size',sev:'Medium',mit:'GES partnership track; accreditation as market entry strategy'},
      {r:'Low consumer willingness-to-pay in core target market',sev:'High',mit:'B2B and employer-subsidy models; diaspora education finance'},
      {r:'Connectivity gaps in rural and peri-urban school catchments',sev:'High',mit:'Offline-first design; radio and SMS as delivery fallback'},
      {r:'Competition from international EdTech platforms (Coursera, Khan)',sev:'Low',mit:'Ghana-specific content and accreditation as differentiation'},
      {r:'Long feedback loops — educational outcomes take years to measure',sev:'Medium',mit:'Intermediate outcome metrics (enrolment, completion, employment)'},
    ],
    thesis:`Education is BRIDGE's highest Development Impact score outside Health (88/100) but carries a lower composite score due to financial sustainability constraints. This makes it an ideal sector for blended finance structures: patient impact capital alongside commercial co-investors willing to accept lower financial returns in exchange for measurable social outcomes.`,
    thesis2:`BRIDGE's preferred investment in education is infrastructure-layer platforms that serve institutional buyers (GES, TVET institutions, employers, NGOs) rather than fragile direct-to-consumer models. The diaspora education finance product is the highest-priority innovation target for 2026.`,
    deploy:[
      {l:'Ticket size',v:'$250K–$2M per venture'},{l:'Stage',v:'Early Seed through Series A'},{l:'Model preference',v:'B2B institutional first'},
      {l:'Blended finance',v:'Welcome — impact + commercial'},{l:'Exit horizon',v:'8–12 years'},{l:'Government alignment',v:'GES accreditation required'},
    ],
    gate:['Full 18-venture financial models with Ghana Skills Development Fund co-financing analysis','TVET Partnership Programme: institutional assessment of 50+ TVET institutions with partner shortlist','Apprenticeship Recognition: NVTI/COTVET partnership terms and 1.5M beneficiary rollout plan','Equipment Modernisation Fund: trade-by-trade equipment lists with current vs. required benchmarking','Career Guidance Platform: data architecture, labor market data sources, and student engagement model','TVET Centres of Excellence: site selection analysis with leadership assessment for 5 candidate institutions','Skills Bootcamp: sector-by-sector curriculum design and employer partnership commitments','Service-Linked Scholarship: bond structure, diaspora co-funding model, and legal framework','Diaspora Mentorship Network: mentor recruitment strategy and platform specifications','EdTech Investment Fund: Ghana EdTech landscape with 20+ company assessments and investment criteria','Outcome Tracking System: methodology, employer verification process, and public reporting framework','Quarterly education sector intelligence: enrollment trends, employer demand shifts, and Skills Fund deployment'],
  },
  {
    id:6, num:'06', name:'Agriculture & Value Chains', shortName:'Agriculture',
    tier:'Core', score:83, capital:'$10–15M', edition:'March 2026 Edition',
    tagline:'Ghana loses 40% of agricultural production after harvest. That $1.9 billion annual leakage is not a natural disaster. It is a solvable logistics, storage, and market access problem.',
    stats:[{l:'Post-Harvest Loss Rate',v:'40%'},{l:'Annual Value Leakage',v:'$1.9B'},{l:'Labour Force in Agri',v:'30%+'},{l:'Arable Land Utilised',v:'~30%'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:86},{d:'Development Impact',w:'30%',s:90},{d:'Implementation Feasibility',w:'25%',s:78},{d:'Financial Sustainability',w:'15%',s:74}],
    snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'83/100'},{l:'Priority',v:'Immediate deployment'},{l:'Capital',v:'$10–15M'},{l:'Timeline',v:'12–24 months'},{l:'Ventures in DB',v:'21 assessed'}],
    summary:`Ghana's agriculture sector employs more than 30% of the national labour force and provides livelihoods for the majority of rural households. It is also the sector with the single most identifiable, quantifiable, and addressable opportunity in the BRIDGE portfolio: a 40% post-harvest loss rate generating $1.9 billion in annual value destruction.`,
    summary2:`This is not a production problem. Ghana's smallholder farmers can grow. The failure is in what happens between farm gate and market — inadequate storage, fragmented logistics, weak cold chain infrastructure, and opaque pricing systems that systematically disadvantage the producer and destroy value that neither buyer nor seller ultimately captures.`,
    summary3:`BRIDGE's agriculture mandate addresses the value chain, not just the farm. Storage infrastructure, input supply platforms, agri-finance products, and commodity trading platforms that create market transparency and reduce the cost of getting food from where it grows to where it is consumed. The multiplier effects extend to nutrition, rural income, and export competitiveness.`,
    quote:`"The $1.9 billion agricultural value leakage is Ghana's most immediately solvable economic problem. It requires no new technology — only organised capital, intelligent logistics, and fair market access."`,
    subs:[
      {name:'Post-Harvest Storage & Cold Chain',score:88,stage:'Series A ready',capital:'$4–6M',note:'40% loss rate; $1.9B leakage directly addressable'},
      {name:'Commodity Processing & Value-Add',score:85,stage:'Active',capital:'$4–8M',note:'Cassava, shea, cocoa, palm — transformation opportunity'},
      {name:'Input Supply & Last-Mile Distribution',score:84,stage:'Seed–A',capital:'$3–5M',note:'Fertiliser & seed access; smallholder productivity uplift'},
      {name:'Agri-Finance & Seasonal Credit',score:82,stage:'Seed–A',capital:'$2–4M',note:'Farmer credit access; harvest-cycle aligned lending'},
      {name:'Commodity Trading & Price Transparency',score:80,stage:'Seed–A',capital:'$2–4M',note:'Market price visibility; farmer bargaining power'},
      {name:'Precision Agriculture & Climate Adaptation',score:72,stage:'Early',capital:'$1–2M',note:'Smallholder productivity; climate-resilient varieties'},
    ],
    risks:[
      {r:'Seasonal revenue concentration and climate event exposure',sev:'High',mit:'Portfolio diversification across value chain; crop insurance integration'},
      {r:'Smallholder fragmentation making aggregation expensive',sev:'Medium',mit:'Aggregator model investment; cooperative structure support'},
      {r:'Price volatility in commodity markets (cocoa, maize, soy)',sev:'High',mit:'Forward contract structures; price stabilisation mechanisms'},
      {r:'Land tenure insecurity limiting collateral value',sev:'Medium',mit:'Revenue-based financing; moveable asset collateral frameworks'},
      {r:'Infrastructure gaps (roads, power) constraining cold chain viability',sev:'High',mit:'Co-investment with Sector 01 Infrastructure; solar-powered storage'},
    ],
    thesis:`Agriculture is BRIDGE's highest-conviction Core sector after Infrastructure. The combination of massive demonstrated need ($1.9B annual leakage), large and directly addressable market (30%+ of labour force), and proven technology solutions — many already deployed successfully in East Africa — makes this an unusually high-confidence investment thesis.`,
    thesis2:`BRIDGE's preferred entry point is the value chain middle — storage, logistics, processing — rather than on-farm production. Middle-of-chain investments have lower climate risk, stronger pricing power, and clearer revenue models than farm-level plays. The farm gate is the starting point; the export market is the endpoint; everything in between is the opportunity.`,
    deploy:[
      {l:'Ticket size',v:'$500K–$4M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Model preference',v:'B2B and aggregator'},
      {l:'Climate resilience',v:'Required — built into scoring'},{l:'Exit horizon',v:'6–10 years; strategic'},{l:'Co-investment',v:'Agri DFIs; impact funds'},
    ],
    gate:['Venture financial models with 10-year projections for all 15 ventures','Cooperative partner directory — 200+ qualified cooperatives mapped by zone with readiness scoring','Policy monitoring — Oil Palm Window application status and MoFA procurement pipeline tracking','Due diligence checklists for processing facility deployment','Competitive intelligence on 40+ AgTech companies assessed against BRIDGE investment criteria','Quarterly updates as budget programmes deploy and commodity price data refreshes','Tomato Processing Facility: 3-site feasibility assessments, cooperative supply agreements, equipment specification, and 5,000-tonne first-year target','Solar Cold Storage Network: 10-site location analysis, solar sizing methodology, cooperative revenue model, and post-harvest loss attribution','Cooperative Capital Fund: lending criteria, group assessment methodology, revolving structure, and 50-cooperative first-year pipeline','Market Aggregation Centres: 5-site analysis, cooperative partnership terms, aggregation pricing model, and BRIDGE market integration plan','AgTech Investment Portfolio: 20+ agtech assessments, smallholder platform evaluation criteria, and investment term sheets','Cashew & Shea Processing: processing technology comparison, EU/US market access requirements, and cooperative feedstock agreements','Warehouse Receipt Financing: collateral management framework, commodity eligibility criteria, and bank partnership terms','Ejura Agricultural Hub: site assessment, multi-commodity design, cooperative governance model, and phased development plan','Diaspora Crowd-Farming Platform: platform architecture, farm selection criteria, impact measurement model, and diaspora investor onboarding','Agricultural Insurance Partnership: crop and livestock actuarial model, GCNet weather data integration, and cooperative enrolment plan'],
  },
  {
    id:7, num:'07', name:'Sports, Entertainment & Creative Industries', shortName:'Sports & Creative',
    tier:'Growth', score:61, capital:'$5–8M', edition:'March 2026 Edition',
    tagline:'Afrobeats is a global phenomenon. Ghanaian film is finding its footing. And a generation of athletes is waiting for the infrastructure that can turn talent into careers. The creative economy is Ghana\'s softest power — and its most underinvested one.',
    stats:[{l:'Creative Economy GDP Share',v:'~2%'},{l:'Afrobeats Global Streams',v:'Billions/yr'},{l:'Film Output (Ghallywood)',v:'~200/yr'},{l:'Youth in Creative Sector',v:'500,000+'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:65},{d:'Development Impact',w:'30%',s:58},{d:'Implementation Feasibility',w:'25%',s:62},{d:'Financial Sustainability',w:'15%',s:52}],
    snapshot:[{l:'Tier',v:'Growth'},{l:'Score',v:'61/100'},{l:'Priority',v:'Monitor & develop'},{l:'Capital',v:'$5–8M'},{l:'Timeline',v:'24–48 months'},{l:'Ventures in DB',v:'12 assessed'}],
    summary:`Ghana's creative industries are at a crossroads. Afrobeats — in which Ghanaian artists are significant contributors — has become a global phenomenon, generating billions of streams and commanding festival headliner fees. Ghanaian film is expanding. And across football, basketball, and athletics, Ghanaian talent routinely competes at the highest international levels.`,
    summary2:`The missing piece is not talent. It is the commercial and physical infrastructure that allows creative talent to be discovered, developed, monetised, and retained within Ghana's economic orbit. Without distribution infrastructure, music revenues flow abroad. Without training facilities, athletes develop in poorly resourced environments. Without IP protection and fair contracting, creators lose the returns their work generates.`,
    summary3:`BRIDGE's Growth tier designation reflects the genuine commercial complexity in this sector: revenue models are less proven, exit paths are longer, and impact metrics are harder to quantify than in Core sectors. But the diaspora connection is uniquely powerful here — Ghanaian diaspora communities are avid consumers of and investors in the creative economy that connects them to home.`,
    quote:`"Ghana's creative industries don't need more talent. They need the infrastructure, contracts, and capital that converts talent into sustainable careers and economic value."`,
    subs:[
      {name:'Music Production & Distribution',score:68,stage:'Seed',capital:'$1–2M',note:'Afrobeats global momentum; local distribution infrastructure gap'},
      {name:'Film & Video Production Infrastructure',score:65,stage:'Seed',capital:'$1–2M',note:'Ghallywood development; streaming platform integration'},
      {name:'Sports Infrastructure & Academies',score:63,stage:'Early–Seed',capital:'$1–3M',note:'Talent development pipeline; international transfer value'},
      {name:'Creative Economy Digital Platforms',score:60,stage:'Early',capital:'$0.5–1M',note:'Artist monetisation; IP management; fan engagement'},
      {name:'Events & Live Entertainment',score:58,stage:'Early',capital:'$0.5–1M',note:'Tourism crossover; seasonal concentration risk'},
      {name:'Gaming & Interactive Media',score:56,stage:'Early',capital:'$0.5–1M',note:'Youth demographics; mobile-first; long development runway'},
    ],
    risks:[
      {r:'Revenue model immaturity — most creative businesses pre-profit',sev:'High',mit:'Patient capital structures; milestone-based tranching'},
      {r:'IP enforcement weakness in Ghana and across ECOWAS',sev:'High',mit:'IP-first due diligence; contractual protections; international registration'},
      {r:'Talent brain drain to UK, US, and Canada',sev:'Medium',mit:'Diaspora co-investment; retention incentive structures'},
      {r:'Seasonal and hit-dependent revenue concentration',sev:'Medium',mit:'Portfolio approach across multiple artists and projects'},
      {r:'FX risk — revenues often in USD/GBP, costs in Cedi',sev:'Low',mit:'Natural hedge for international revenues'},
    ],
    thesis:`BRIDGE's creative industries thesis is explicitly a patience thesis. This is not a sector for the first deployment tranche. It is a sector for the second and third tranches — after Core sector returns have demonstrated BRIDGE's model and created the financial headroom to absorb longer payback periods.`,
    thesis2:`When BRIDGE does deploy in creative industries, the preferred structure is infrastructure over content: invest in the studios, academies, distribution platforms, and IP management systems that serve many creators rather than betting on any single artist or production. Infrastructure compounds; individual creative works do not.`,
    deploy:[
      {l:'Ticket size',v:'$250K–$1.5M per venture'},{l:'Stage',v:'Early through Seed'},{l:'Deployment tranche',v:'2nd/3rd — after Core'},
      {l:'Model preference',v:'Infrastructure over content'},{l:'Exit horizon',v:'8–12 years'},{l:'Diaspora co-investment',v:'Actively encouraged'},
    ],
    gate:['Full 22-venture financial models with royalty-backed financing underwriting methodology','Creative Arts Financing Facility: royalty advance underwriting criteria and MFI partnership terms','Ghana Youth Football Academy: site assessment, GFA partnership terms, and European club MOU','Kente Authenticity System: blockchain provenance architecture and luxury market distribution strategy','Ashanti Fashion Incubator: 20-designer cohort programme design and international buyer network','Black Star Experience government initiative: BRIDGE alignment and co-investment opportunity mapping','Black Star Recording Studios: feasibility study, equipment specification, and operational model','Heritage Textiles Market Platform: artisan onboarding plan for 500+ Bonwire and Kpetoe weavers','GHAMRO Capacity Building: institutional diagnostic and 3-year reform roadmap','Film Production Hub: Pan-African co-production partnership pipeline and Black Star Experience co-funding analysis','Year of Return data analysis: diaspora creative economy spending patterns and repeat engagement strategy','Quarterly creative sector intelligence: streaming trends, transfer market, textile exports, and film production activity'],
  },
  {
    id:8, num:'08', name:'Housing & Real Estate', shortName:'Housing',
    tier:'Growth', score:70, capital:'$15–20M', edition:'March 2026 Edition',
    tagline:'Ghana faces an 1.8 million unit housing deficit. But the opportunity is not in solving the deficit — it is in building the financial, digital, and physical infrastructure that makes housing delivery commercially viable at scale.',
    stats:[{l:'Housing Deficit',v:'1.8M units'},{l:'Urban Growth Rate',v:'3.4%/yr'},{l:'Mortgage Penetration',v:'<1% GDP'},{l:'Informal Settlements',v:'~35% urban'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:74},{d:'Development Impact',w:'30%',s:76},{d:'Implementation Feasibility',w:'25%',s:64},{d:'Financial Sustainability',w:'15%',s:60}],
    snapshot:[{l:'Tier',v:'Growth'},{l:'Score',v:'70/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$15–20M'},{l:'Timeline',v:'24–48 months'},{l:'Ventures in DB',v:'15 assessed'}],
    summary:`Ghana's housing deficit — 1.8 million units and growing — is one of the most-cited statistics in Ghana's development narrative. But the framing of "deficit" is misleading. It implies a supply problem. The actual problem is a financing, land tenure, and construction technology problem that makes housing delivery unviable at the price points that the majority of Ghanaians can afford.`,
    summary2:`Mortgage penetration below 1% of GDP is not a lack of demand. It reflects a mortgage product design problem — instruments calibrated for a formal-sector workforce where most Ghanaians don't work, denominated in a currency that doesn't track housing construction costs, and priced at rates that make homeownership mathematically impossible for most households.`,
    summary3:`BRIDGE's housing mandate is infrastructure-layer: invest in the PropTech platforms, alternative construction technology, rental market formalisation tools, and innovative financing structures that make the market work — rather than attempting to directly address the deficit through large-scale development that requires patient concessional capital not in BRIDGE's first-tranche toolkit.`,
    quote:`"The housing deficit cannot be solved with the same financial instruments that created it. BRIDGE invests in the new instruments — the PropTech, the alternative finance, the construction technology — that make delivery viable at scale."`,
    subs:[
      {name:'Affordable Housing Development',score:78,stage:'Active',capital:'$5–8M',note:'Income-linked design; public-private partnership structure'},
      {name:'Mortgage & Home Finance Innovation',score:74,stage:'Seed–A',capital:'$3–5M',note:'Rate environment challenge; long-term product design'},
      {name:'Student & Worker Accommodation',score:72,stage:'Seed–A',capital:'$2–4M',note:'University city demand; structured returns; lower complexity'},
      {name:'PropTech & Market Transparency',score:70,stage:'Seed',capital:'$1–2M',note:'Listings; transaction efficiency; informal market formalisation'},
      {name:'Rental Market Platforms',score:68,stage:'Seed',capital:'$1–2M',note:'Urbanisation demand; tenant protection; landlord tools'},
      {name:'Land Registry & Title Technology',score:64,stage:'Early',capital:'$1–2M',note:'Title clarity; mortgage prerequisite; GLA partnership'},
    ],
    risks:[
      {r:'Land tenure insecurity and chieftaincy disputes',sev:'High',mit:'Title verification due diligence; Lands Commission partnerships'},
      {r:'High interest rate environment eroding affordability',sev:'High',mit:'Equity structures over debt; employer-linked housing schemes'},
      {r:'Construction cost inflation in USD-denominated materials',sev:'Medium',mit:'Local material substitution; modular construction technology'},
      {r:'Long development timelines (3–5 years) to completion',sev:'Medium',mit:'Phased investment; tranche-based capital release'},
      {r:'Political risk — housing policy changes between election cycles',sev:'Medium',mit:'Non-policy-dependent revenue models; private sector focus'},
    ],
    thesis:`Housing is a Growth tier sector in the BRIDGE framework not because of low impact potential but because of implementation complexity. Land tenure insecurity, high construction costs, and rate-environment challenges create genuine friction that requires careful navigation. BRIDGE's entry strategy is deliberate: start with student housing (lower complexity, institutional demand), establish operational learnings, then scale to affordable housing with the benefit of experience.`,
    thesis2:`The diaspora connection is structurally powerful in housing: Ghanaian diaspora have both the savings and the strong motivation to invest in property at home. A diaspora-linked housing investment product — structured as a build-to-own or build-to-rent vehicle — represents one of the highest-potential capital mobilisation opportunities in the BRIDGE portfolio.`,
    deploy:[
      {l:'Ticket size',v:'$500K–$5M per venture'},{l:'Stage',v:'Seed through active development'},{l:'Entry point',v:'Student housing first'},
      {l:'Diaspora product',v:'Priority innovation target'},{l:'Exit horizon',v:'8–15 years; asset sale'},{l:'Co-investment',v:'Mortgage DFIs; pension funds'},
    ],
    gate:['Full 18-venture financial models with scenario analysis for currency risk and construction cost inflation','Title Verification Platform: data source integration, risk-scoring methodology, and legal framework','Property Management Service: diaspora client acquisition, fee structure, and operational model for 500+ units','Housing Cooperative Structure: legal framework, savings model, and first cohort acquisition strategy','PropTech Investment Fund: Ghana PropTech landscape assessment and 10-company investment pipeline','Diaspora real estate investor programme: market entry guide, verified developer network, and management services','Construction Oversight Platform: technology architecture, inspector network, and fee structure','Rental Guarantee Products: actuarial model, insurance partner terms, and underwriting criteria','Contractor Verification System: vetting methodology, rating system, and platform integration with oversight','Rent Advance Financing: MFI partnership terms, repayment structure, and default management','Affordable Housing Development: site assessment for 3 Greater Accra locations with feasibility analysis','Quarterly housing sector intelligence: construction cost indices, rental market rates, and permit activity'],
  },
  {
    id:9, num:'09', name:'Tourism & Hospitality', shortName:'Tourism',
    tier:'Growth', score:68, capital:'$8–12M', edition:'March 2026 Edition',
    tagline:'The Year of Return brought 1 million visitors and proved Ghana\'s diaspora tourism thesis. The question now is whether the infrastructure exists to convert that proof of concept into a sustainable, year-round industry.',
    stats:[{l:'International Arrivals',v:'~1.1M/yr'},{l:'Tourism GDP Share',v:'4.9%'},{l:'Year of Return Visitors',v:'1M+ (2019)'},{l:'Hotel Room Gap',v:'Mid-market'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:70},{d:'Development Impact',w:'30%',s:65},{d:'Implementation Feasibility',w:'25%',s:68},{d:'Financial Sustainability',w:'15%',s:62}],
    snapshot:[{l:'Tier',v:'Growth'},{l:'Score',v:'68/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$8–12M'},{l:'Timeline',v:'24–36 months'},{l:'Ventures in DB',v:'13 assessed'}],
    summary:`Ghana's Year of Return initiative in 2019 was one of the most successful government-led diaspora engagement campaigns in African history — drawing over one million visitors, generating hundreds of millions in direct economic activity, and demonstrating that Ghana's diaspora and international African community represent a unique and underserved travel market.`,
    summary2:`The infrastructure that received those visitors, however, was not built to scale the experience. Mid-market hotel supply is insufficient. Heritage site access is underdeveloped. Consistent hospitality quality is unreliable outside Accra. And the Tour Ghana digital infrastructure — discovery, booking, experience curation — is significantly underdeveloped relative to competitive destinations.`,
    summary3:`BRIDGE's tourism thesis is built on a specific value proposition: Ghana as the homecoming destination for the global African diaspora, anchored by unmatched cultural authenticity, a stable political environment, and the strongest English-language infrastructure in West Africa. This is not a mass-market tourism play. It is a premium-diaspora and eco-heritage play — which allows for higher yield per visitor and less infrastructure intensity.`,
    quote:`"The Year of Return proved the demand. BRIDGE's job is to build the supply infrastructure that converts proof of concept into perennial industry."`,
    subs:[
      {name:'Eco & Heritage Tourism Infrastructure',score:76,stage:'Seed–A',capital:'$2–4M',note:'Year of Return legacy; diaspora homecoming market'},
      {name:'Hotel & Hospitality Mid-Market Supply',score:72,stage:'Active',capital:'$3–6M',note:'Mid-market gap in Kumasi, Cape Coast, Tamale'},
      {name:'Food & Culinary Tourism Experiences',score:70,stage:'Seed',capital:'$1–2M',note:'Ghanaian cuisine globally resurgent; cultural premium'},
      {name:'Adventure & Nature Tourism',score:68,stage:'Seed',capital:'$1–2M',note:'Volta region; Kakum; underdeveloped natural assets'},
      {name:'Tourism Discovery & Booking Platforms',score:64,stage:'Early',capital:'$0.5–1M',note:'Digital infrastructure gap; mobile-first booking'},
      {name:'MICE — Meetings, Incentives, Conferences',score:61,stage:'Early',capital:'$1–2M',note:'West Africa conference hub ambition; ACC infrastructure'},
    ],
    risks:[
      {r:'Seasonality — heavy wet/dry season concentration',sev:'Medium',mit:'Year-round experience design; diaspora travel less seasonal'},
      {r:'Security perception risk (regional spillover from Sahel)',sev:'Medium',mit:'Ghana stable; communications strategy; targeted market messaging'},
      {r:'Quality consistency across hospitality supply chain',sev:'High',mit:'Hospitality training investment; standard-setting partnerships'},
      {r:'Over-dependence on diaspora segment',sev:'Low',mit:'Segment diversification (eco, MICE, cultural) over time'},
      {r:'Infrastructure gaps constraining site access (roads, power)',sev:'Medium',mit:'Sector 01 coordination; off-grid lodge design standards'},
    ],
    thesis:`Tourism is a Growth tier sector where BRIDGE's specific competitive advantage is clearest: the diaspora network. No competitor in Ghana's tourism investment landscape has the same direct access to the diaspora communities who represent the highest-yield segment of Ghana's tourism market. BRIDGE can invest in tourism supply and simultaneously activate diaspora demand — a structural advantage worth deploying.`,
    thesis2:`The preferred investment architecture is asset-light: digital platforms, tour operator infrastructure, experience design, and management services rather than hotel property ownership. This reduces capital intensity and implementation complexity while capturing value from the tourist spend that increasingly flows through experience and discovery rather than accommodation.`,
    deploy:[
      {l:'Ticket size',v:'$250K–$3M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Model preference',v:'Asset-light; experience-first'},
      {l:'Diaspora activation',v:'Built into investment thesis'},{l:'Exit horizon',v:'6–10 years'},{l:'Co-investment',v:'IFC; AfDB tourism facilities'},
    ],
    gate:['Full 15-venture financial models with diaspora tourism spending projections and repeat visit rate analysis','Heritage Interpretation Excellence: site-by-site content strategy for 8 primary heritage destinations','Heritage Boutique Hotel Network: 5-site feasibility assessment with Ghanaian property partner shortlist','Community Tourism Fund: grant criteria, community enterprise assessment, and 50-community pipeline','Diaspora Extended Stay Network: 200-unit target portfolio and management operational model','Festival Tourism Circuits: calendar integration, booking infrastructure, and 10-festival circuit design','GTM Platform Enhancement: technology requirements, GTDC partnership terms, and operator onboarding plan','Diaspora Heritage Tour Operator: itinerary designs, pricing models, and diaspora community partnership network','Hospitality Excellence Certification: standards framework, audit methodology, and marketing differentiation model','Northern Region Initiative: Mole-Larabanga-Tamale tourism circuit design and infrastructure gap assessment','Year of Return economic analysis: spending patterns, conversion factors, and repeat visit retention strategy','Quarterly tourism sector intelligence: arrivals data, spending trends, regional performance, and new product opportunities'],
  },
  {
    id:10, num:'10', name:'Energy & Renewable Resources', shortName:'Energy',
    tier:'Emerging', score:74, capital:'$12–18M', edition:'March 2026 Edition',
    tagline:'Ghana has 260+ sunny days per year, a functioning utility infrastructure, and a government committed to renewable transition. The energy investment opportunity is not about potential — it is about execution speed.',
    stats:[{l:'Solar Potential',v:'4–6 kWh/m²/day'},{l:'Rural Electrification',v:'~56%'},{l:'Energy Access Gap',v:'Northern regions'},{l:'Industrial Power Cost',v:'High vs. regional'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:72},{d:'Development Impact',w:'30%',s:82},{d:'Implementation Feasibility',w:'25%',s:70},{d:'Financial Sustainability',w:'15%',s:68}],
    snapshot:[{l:'Tier',v:'Emerging'},{l:'Score',v:'74/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$12–18M'},{l:'Timeline',v:'18–36 months'},{l:'Ventures in DB',v:'16 assessed'}],
    summary:`Ghana's energy sector sits at the intersection of three converging forces: a government committed to expanding renewable capacity, a rural electrification gap that represents both a development imperative and a market opportunity, and an industrial sector that pays some of the highest power costs in the sub-region — costs that directly undermine Ghana's manufacturing competitiveness.`,
    summary2:`The solar opportunity in Ghana is straightforward in physics and complex in execution. With 4–6 kWh per square metre per day across most of the country, the resource endowment for solar power is among the strongest in West Africa. The challenges are in tariff structures, ECG off-take risk, grid stability, and the financing structures needed to make distributed generation viable at the micro-scale where impact is greatest.`,
    summary3:`BRIDGE's energy mandate targets three distinct segments: utility-scale solar for industrial offtakers who can anchor project finance; mini-grid and off-grid systems for rural communities beyond the grid's reach; and energy efficiency technology for the commercial and industrial buildings that currently waste 20–40% of their power consumption.`,
    quote:`"Ghana's energy future is distributed, solar-powered, and bankable. The gap between that future and today is not technology or resource — it is patient capital and capable implementation."`,
    subs:[
      {name:'Solar Power Generation (Commercial & Industrial)',score:82,stage:'Active',capital:'$4–8M',note:'260+ sunny days; industrial offtaker anchor structures'},
      {name:'Off-Grid & Mini-Grid Systems',score:80,stage:'Seed–A',capital:'$3–5M',note:'Northern Ghana gap; productive use focus (agri, health)'},
      {name:'Industrial Power Reliability & Backup',score:76,stage:'Seed–A',capital:'$2–4M',note:'Load-shedding cost to industry; competitive cost reduction'},
      {name:'Clean Cooking Solutions',score:72,stage:'Seed',capital:'$1–3M',note:'LPG transition; deforestation reduction; women\'s health'},
      {name:'Energy Efficiency Technology',score:70,stage:'Seed',capital:'$1–2M',note:'Commercial buildings; utility bill reduction; 20–40% savings potential'},
      {name:'Battery Storage & Microgrid Infrastructure',score:68,stage:'Early',capital:'$1–2M',note:'Resilience infrastructure; critical facilities; falling cost curve'},
    ],
    risks:[
      {r:'ECG offtake risk and government tariff structure uncertainty',sev:'High',mit:'Private sector offtaker first; ECG as secondary or avoided'},
      {r:'Local content requirements increasing project cost',sev:'Medium',mit:'Local procurement integration; local partner equity participation'},
      {r:'Grid instability limiting distributed generation viability',sev:'Medium',mit:'Behind-the-meter design; battery storage integration'},
      {r:'Subsidised fossil fuel competition suppressing renewable economics',sev:'Medium',mit:'Advocacy for subsidy reform; total cost of ownership modelling'},
      {r:'Long project development timelines (permitting, EIA, grid connection)',sev:'High',mit:'Pipeline development capability; regulatory relationship building'},
    ],
    thesis:`Energy is positioned in BRIDGE's Emerging tier because while the resource opportunity is large and the impact potential is high, execution complexity — regulatory uncertainty, ECG risk, and long development timelines — creates real implementation risk that Core tier sectors do not carry. The investment thesis is therefore sequenced: mini-grid and off-grid first (where ECG risk is avoided), commercial and industrial solar second (where private offtakers anchor the project economics), utility-scale last (where regulatory and grid risk is highest).`,
    thesis2:`The productive use angle is critical. Energy infrastructure that powers agricultural processing, cold storage, and health facilities creates development impact that pure electricity access cannot. BRIDGE's energy investments are evaluated not just on kilowatts delivered but on productive economic activity unlocked by reliable power.`,
    deploy:[
      {l:'Ticket size',v:'$1M–$6M per project'},{l:'Stage',v:'Development through construction'},{l:'Offtaker',v:'Private sector preferred'},
      {l:'Project finance',v:'DFI co-lending actively sought'},{l:'Exit horizon',v:'10–15 years; refinancing'},{l:'Local partnership',v:'Required for permitting'},
    ],
    gate:['Full 14-venture financial models with IRR projections, payback periods, and sensitivity analysis for each venture','Clean Cooking Distribution Network: last-mile distribution route design, subsidy structure, and 10,000-household first-year target plan','Community Mini-Grid Development: 20-community shortlist with load assessments, feasibility studies, and GRIDCO licensing pathway','Quality Equipment Sourcing: EC-certified supplier roster, import logistics, warranty management, and installer credit line terms','Residential Solar Financing: PAYG technology comparison, mobile money partner shortlist, and consumer credit scoring approach','C&I Solar Installation Company: target client pipeline, EPC cost models, O&M contract structures, and 50-site feasibility assessments','Solar Technician Training Academy: curriculum, TVET partnership terms, graduate employment pipeline, and 500-technician annual target model','Solar Cold Storage Network: 15-site selection criteria, agricultural catchment analysis, and cooperative revenue-sharing models','Energy Efficiency Services: ESCO contract templates, audit methodology, verification protocols, and shared-savings calculation models','Biogas Systems Company: agricultural waste feedstock mapping, digester technology comparison, and target farm/processor pipeline','Policy interface briefings: SE4ALL framework updates, mini-grid licensing developments, and PURC tariff review calendars','Quarterly energy sector intelligence: tariff movements, renewable project pipeline, outage frequency data, and technology cost updates'],
  },
  {
    id:11, num:'11', name:'Manufacturing & Light Industry', shortName:'Manufacturing',
    tier:'Growth', score:65, capital:'$10–15M', edition:'March 2026 Edition',
    tagline:'Ghana imports what it can make. The 1D1F policy direction is right. The capital structure, technology transfer, and market linkages needed to make it viable at scale are where BRIDGE operates.',
    stats:[{l:'Manufacturing GDP Share',v:'~11%'},{l:'Import Bill (Manuf.)',v:'$6B+ annually'},{l:'1D1F Factories Operational',v:'88+'},{l:'AGOA Access',v:'Active'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:66},{d:'Development Impact',w:'30%',s:70},{d:'Implementation Feasibility',w:'25%',s:62},{d:'Financial Sustainability',w:'15%',s:56}],
    snapshot:[{l:'Tier',v:'Growth'},{l:'Score',v:'65/100'},{l:'Priority',v:'Monitor & develop'},{l:'Capital',v:'$10–15M'},{l:'Timeline',v:'24–48 months'},{l:'Ventures in DB',v:'14 assessed'}],
    summary:`Ghana's manufacturing sector has long been identified as the route to sustainable economic transformation — transitioning from commodity export dependency to value-added production that retains economic value within the country. The 1D1F (One District One Factory) initiative represents the government's most ambitious push in this direction, with 88+ factories now operational.`,
    summary2:`The gap between the aspiration and the current reality is measurable: Ghana imports over $6 billion annually in manufactured goods that it has the raw materials, labour, and market to produce domestically. Food processing, garment production, metal fabrication, and pharmaceutical manufacturing are the four highest-priority sub-sectors where import substitution potential is greatest and investment readiness is most advanced.`,
    summary3:`BRIDGE's manufacturing mandate targets the infrastructure that makes individual factories viable: technology transfer partnerships, working capital facilities calibrated to manufacturing cash flow cycles, and market linkage programmes that connect Ghanaian manufacturers to regional and international buyers. AGOA access — preferential market entry to the United States — remains significantly underutilised by Ghana's garment sector.`,
    quote:`"Ghana imports what it can make. Every avoidable import is a missed job, a missed income, and a missed link in the domestic value chain. BRIDGE finances the infrastructure that makes import substitution rational for entrepreneurs — not just aspirational for policymakers."`,
    subs:[
      {name:'Food & Beverage Processing',score:74,stage:'Seed–A',capital:'$2–4M',note:'Import substitution; local raw material utilisation; NHIS procurement'},
      {name:'Garment & Textile Production',score:70,stage:'Seed–A',capital:'$2–3M',note:'AGOA access; NTCDB support; Akosombo textile base'},
      {name:'Metal Fabrication & Construction Materials',score:68,stage:'Seed',capital:'$1–3M',note:'Construction demand; reducing import dependency on steel'},
      {name:'Plastics & Packaging',score:65,stage:'Seed',capital:'$1–2M',note:'Consumer goods demand; recycled plastics opportunity'},
      {name:'Pharmaceutical Manufacturing',score:62,stage:'Early–Seed',capital:'$2–4M',note:'NHIS procurement market; import dependency reduction'},
      {name:'Furniture & Wood Products',score:60,stage:'Early',capital:'$1–2M',note:'Timber resource base; skilled artisan workforce; export potential'},
    ],
    risks:[
      {r:'Power cost and reliability undermining manufacturing competitiveness',sev:'High',mit:'Sector 10 coordination; on-site solar for industrial facilities'},
      {r:'Working capital constraints with long manufacturing cash flow cycles',sev:'High',mit:'Supply chain finance products; purchase order financing'},
      {r:'Competition from cheaper Asian manufactured imports',sev:'High',mit:'Focus on sectors with natural protections (perishables, logistics cost)'},
      {r:'Skills gap in technical manufacturing workforce',sev:'Medium',mit:'TVET partnership; on-the-job training investment in portfolio companies'},
      {r:'1D1F policy continuity risk across election cycles',sev:'Medium',mit:'Private sector-only investment structures not dependent on policy continuation'},
    ],
    thesis:`Manufacturing is a Growth tier sector where BRIDGE's conviction is building toward Emerging. The 1D1F momentum, AGOA access, and raw material base create genuine conditions for investment. The key constraint is execution infrastructure — working capital, technology transfer, and market linkage — that BRIDGE is well-positioned to provide through its integrated sector approach.`,
    thesis2:`Food processing is the highest-priority manufacturing sub-sector. It connects directly to the Agriculture value chain (Sector 06), it has demonstrable domestic demand, it can absorb the agricultural post-harvest loss that currently destroys value, and it requires less capital intensity than heavy manufacturing. BRIDGE's food processing investments are explicitly designed to be the downstream anchor for its agriculture upstream investments.`,
    deploy:[
      {l:'Ticket size',v:'$500K–$3M per venture'},{l:'Stage',v:'Seed through active production'},{l:'Sector linkage',v:'Agri upstream required'},
      {l:'AGOA pathway',v:'Garment sector priority'},{l:'Exit horizon',v:'7–12 years; strategic'},{l:'Co-investment',v:'IFC; DEG; FMO manufacturing funds'},
    ],
    gate:['Full 14-venture financial models with IRR projections, payback periods, AfCFTA export revenue forecasts, and capacity utilisation sensitivity analysis','Shea Value Addition: processing technology comparison, cooperative partnership terms, EU/US cosmetic certification roadmap, and diaspora brand partnership pipeline','Manufacturing Skills Academy: curriculum design, TVET partnership terms, employer co-investment model, and 1,000-graduate first-year target plan','Personal Care Products: market sizing, diaspora channel analysis, retail partnership shortlist, and Ghana-origin brand development framework','Building Materials Manufacturing: raw material mapping, construction sector demand analysis, and housing portfolio supply chain integration','Regional Export Platform: logistics route analysis, customs documentation systems, and buyer network development across 10 AfCFTA markets','Agro-Processing Hub: 5-site feasibility assessments, cooperative feedstock supply agreements, food safety certification pathway, and 3-year production forecast','Packaged Foods Company: SKU development plan, retail distribution strategy, AfCFTA export market analysis, and GFSI certification timeline','Quality Certification Services: certification route-mapping for 50 target SMEs, diaspora quality engineer network, and cost-sharing models','Pharmaceutical Expansion: manufacturer capability assessments, WHO pre-qualification roadmap, and essential medicines priority list','AfCFTA positioning analysis: tariff schedules by product category, rules-of-origin requirements, and priority market assessments for each manufacturing venture','Quarterly manufacturing sector intelligence: capacity utilisation data, export performance, tariff developments, and competitive landscape updates'],
  },
  {
    id:12, num:'12', name:'Transportation & Logistics', shortName:'Transportation',
    tier:'Emerging', score:71, capital:'$8–12M', edition:'March 2026 Edition',
    tagline:'E-commerce is growing at 20%+ annually. Agricultural produce is rotting in transit. And Ghana\'s logistics cost as a share of product price is among the highest in West Africa. This is an engineering problem — and engineering problems have solutions.',
    stats:[{l:'Logistics Cost Premium',v:'15–20%'},{l:'E-commerce Growth',v:'20%+ YoY'},{l:'Truck Fleet Age',v:'Avg. 18 years'},{l:'Clearance Time (Tema)',v:'7–14 days'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:72},{d:'Development Impact',w:'30%',s:74},{d:'Implementation Feasibility',w:'25%',s:70},{d:'Financial Sustainability',w:'15%',s:62}],
    snapshot:[{l:'Tier',v:'Emerging'},{l:'Score',v:'71/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$8–12M'},{l:'Timeline',v:'18–36 months'},{l:'Ventures in DB',v:'15 assessed'}],
    summary:`Ghana's logistics sector is both a bottleneck and an opportunity. As a bottleneck, it adds 15–20% to the cost of almost every physical good in Ghana — manufactured, agricultural, or imported — through inefficient port clearance, an ageing truck fleet, and limited last-mile delivery infrastructure. As an opportunity, the same bottlenecks define the investment thesis: whoever solves them creates structural competitive advantage.`,
    summary2:`The e-commerce growth story provides the most immediate commercial context. Online commerce in Ghana is growing at 20%+ annually, but conversion rates are suppressed by unreliable delivery. A last-mile logistics company that can solve the Accra delivery problem credibly is not just a logistics business — it is the infrastructure backbone for Ghana's entire digital commerce economy.`,
    summary3:`BRIDGE's logistics mandate operates across three layers: last-mile delivery for urban e-commerce, cold chain logistics for agricultural export, and port efficiency technology for trade facilitation. Each layer is commercially viable independently; together, they create a logistics infrastructure that compounds value across BRIDGE's agriculture, manufacturing, and technology investments.`,
    quote:`"Every sector in BRIDGE's portfolio has a logistics dependency. When we invest in transportation infrastructure, we are investing in the performance ceiling of the entire portfolio."`,
    subs:[
      {name:'Last-Mile Delivery & Urban Logistics',score:80,stage:'Seed–A',capital:'$3–5M',note:'E-commerce growth; Accra congestion; 20%+ annual growth'},
      {name:'Cold Chain Infrastructure',score:78,stage:'Seed–A',capital:'$2–4M',note:'Agri cross-sector link; export readiness; $1.9B loss addressable'},
      {name:'Intercity Freight Networks',score:76,stage:'Seed–A',capital:'$2–4M',note:'Northern corridor; mining & agriculture supply chains'},
      {name:'Freight & Port Logistics Technology',score:72,stage:'Seed–A',capital:'$2–4M',note:'Tema clearance time; 7–14 days vs. 2–3 day benchmark'},
      {name:'Urban Mobility Platforms',score:71,stage:'Seed',capital:'$1–3M',note:'Accra congestion; BRTS infrastructure; shared mobility'},
      {name:'Driver Training & Fleet Management',score:64,stage:'Early',capital:'$0.5–1M',note:'Road safety; fleet efficiency; insurance cost reduction'},
    ],
    risks:[
      {r:'Accra traffic congestion limiting last-mile unit economics',sev:'High',mit:'Motorbike and cargo-bike deployment; time-window optimisation'},
      {r:'Fuel cost volatility and subsidy removal impact on margins',sev:'High',mit:'EV fleet transition; fixed-price fuel contracts; efficiency tech'},
      {r:'Regulatory fragmentation across GRA, DVLA, GPA, and MoT',sev:'Medium',mit:'BRIDGE government partnership framework; regulatory mapping'},
      {r:'Competition from regional logistics players (DHL, Aramex, Jumia)',sev:'Medium',mit:'Ghana-specific last-mile and rural focus as differentiation'},
      {r:'Infrastructure gap — roads, bridges in peri-urban and rural areas',sev:'High',mit:'Sector 01 coordination; route optimisation around infrastructure gaps'},
    ],
    thesis:`Transportation is an Emerging tier sector with direct leverage on five of BRIDGE's other twelve sectors — Agriculture (cold chain), Manufacturing (freight), Technology (e-commerce infrastructure), Infrastructure (road networks), and Tourism (tourist mobility). This cross-sector leverage is the primary investment rationale: a dollar deployed in logistics infrastructure creates outsized returns across the portfolio.`,
    thesis2:`The cold chain sub-sector is BRIDGE's highest-conviction logistics investment. The direct connection to the $1.9B agricultural post-harvest loss problem means that cold chain infrastructure investment is simultaneously a logistics investment and an agriculture investment — compounding the impact and the return across two of BRIDGE's Core sectors.`,
    deploy:[
      {l:'Ticket size',v:'$500K–$3M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Cross-sector linkage',v:'Agriculture cold chain priority'},
      {l:'Tema port focus',v:'Clearance time reduction'},{l:'Exit horizon',v:'6–10 years; strategic'},{l:'Co-investment',v:'AfDB transport facility; DFIs'},
    ],
    gate:['Full 16-venture financial models with IRR projections, payback periods, and post-harvest loss reduction attribution methodology','Logistics Training Academy: curriculum design, TVET partnership terms, employer co-investment model, and 500-graduate first-year pipeline','Load Matching Platform: technology architecture, agricultural corridor route mapping, mobile money integration, and shipper/carrier onboarding plan','Pharmaceutical Cold Chain: Ghana Health Service partnership terms, GDP compliance specification, NHIA contract structure, and 25-facility cold chain design','Cross-Border Facilitation: AfCFTA documentation requirements, customs clearance process maps, transit bond structure, and bilateral freight association partnerships','LPI improvement analysis: sub-dimension gap mapping, intervention-to-index score attribution, and 2030 target pathway','Cold Chain Ghana: site selection for 20 priority aggregation hubs, solar specification, refrigerated transport fleet model, and off-take agreements with BRIDGE agricultural cooperatives','Fleet Management Services: technology platform comparison, telematics supplier assessment, pricing model, and 1,000-vehicle enrolment plan','Agricultural Collection Network: cooperative partnership agreements, 50-route design, GPS tracking system, and BRIDGE agriculture portfolio integration','Vehicle Asset Financing: credit scoring methodology using telematics data, loan structure, default mitigation, and bank partnership terms','Boankra Inland Port: commissioning timeline monitoring, private operator licensing terms, and container handling revenue model','Quarterly transport sector intelligence: LPI updates, port throughput data, cold chain market developments, and AfCFTA cross-border trade volumes'],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════════════════════════ */

const TopBar=({sector,coverLogoRef})=>{
  const[past,setPast]=useState(false);
  useEffect(()=>{
    const fn=()=>{if(!coverLogoRef?.current)return;setPast(coverLogoRef.current.getBoundingClientRect().bottom<0);};
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[coverLogoRef,sector]);
  return(
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'180px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <Logo height={20} variant="dark"/>
          <div style={{width:'1px',height:'16px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>Sector Brief · {sector.name} · {sector.tier} Tier</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{sector.num} · {sector.shortName}</span>
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <a href="/membership" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none'}}>Members →</a>
        <a href="/login" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px'}}>Apply →</a>
      </div>
    </div>
  );
};

const Cover=({sector,logoRef})=>(
  <div>
    <div className="pad-cover" style={{background:C.ink,padding:'24px 64px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'64px',top:'16px',fontFamily:F.mono,fontSize:'120px',fontWeight:500,color:'rgba(255,255,255,0.025)',lineHeight:1,userSelect:'none',pointerEvents:'none'}}>{sector.num}</div>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div ref={logoRef} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <Logo height={26} variant="white"/>
            <div style={{width:'1px',height:'20px',background:'rgba(255,255,255,0.15)'}}/>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',color:'rgba(255,255,255,0.35)',textTransform:'uppercase'}}>Sector Intelligence Brief</span>
          </div>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'2px',textTransform:'uppercase',border:`1px solid rgba(184,217,53,0.35)`,padding:'3px 10px'}}>Public</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'18px'}}>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'4px 10px',letterSpacing:'1px'}}>SECTOR {sector.num}</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.08)'}}/>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.25)'}}>{sector.edition}</span>
        </div>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(32px,5.5vw,68px)',fontWeight:900,color:C.paper,lineHeight:1,letterSpacing:'-2px',marginBottom:'16px'}}>{sector.name}</h1>
        <div style={{fontFamily:F.body,fontSize:'15px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',lineHeight:1.6,maxWidth:'560px',marginBottom:'28px'}}>{sector.tagline}</div>
        <div style={{display:'flex',gap:'0',borderTop:`1px solid rgba(255,255,255,0.08)`}}>
          <div style={{background:'rgba(255,255,255,0.04)',padding:'18px 22px',minWidth:'160px',borderRight:`1px solid rgba(255,255,255,0.06)`}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:'8px'}}>BRIDGE Impact Score™</div>
            <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'8px'}}>
              <span style={{fontFamily:F.mono,fontSize:'48px',fontWeight:500,color:C.lime,lineHeight:1}}>{sector.score}</span>
              <span style={{fontFamily:F.mono,fontSize:'14px',color:'rgba(184,217,53,0.5)'}}>/100</span>
            </div>
            <div style={{height:'4px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',marginBottom:'6px',overflow:'hidden'}}>
              <div style={{height:'100%',width:`${sector.score}%`,background:C.lime,borderRadius:'2px'}}/>
            </div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:tierColor(sector.tier),letterSpacing:'1px'}}>{sector.tier.toUpperCase()} TIER</div>
          </div>
          {sector.stats.map((d,i)=>(
            <div key={i} style={{padding:'18px 22px',borderRight:i<3?`1px solid rgba(255,255,255,0.06)`:'none',flex:1,minWidth:0}} className="hm">
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',marginBottom:'8px'}}>{d.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'clamp(16px,2vw,22px)',color:C.paper,lineHeight:1}}>{d.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{height:'3px',background:`linear-gradient(90deg,${C.lime},transparent)`,marginTop:'0'}}/>
    </div>
  </div>
);

const Executive=({sector})=>{
  const [sdOpen, setSdOpen] = useState(false);
  return (
  <div className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr',gap:'48px'}} className="tc">
      <div>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Executive Summary</div>
        <p className="dc" style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{sector.summary}</p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{sector.summary2}</p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300}}>{sector.summary3}</p>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'20px',marginTop:'24px'}}>
          <p style={{fontFamily:F.display,fontSize:'17px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.5}}>{sector.quote}</p>
          <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE Sector Assessment, 2025</div>
        </div>
      </div>
      <div>
        <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
          {/* Forest header — always visible; tap to expand dims on mobile */}
          <button
            className="mob-toggle mob-toggle-hdr"
            onClick={()=>setSdOpen(o=>!o)}
            style={{width:'100%',background:C.forest,padding:'12px 16px',border:'none',cursor:'pointer',textAlign:'left',display:'block'}}
          >
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span>Score Breakdown</span>
              <span className="mob-show" style={{display:'none',fontSize:'12px',color:'rgba(184,217,53,0.5)',transform:sdOpen?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'26px',color:C.paper,pointerEvents:'none'}}>{sector.score} <span style={{fontSize:'11px',color:'rgba(250,248,243,0.4)'}}>/100</span></div>
          </button>
          {sector.scoreDims.map((dim,i)=>(
            <div key={i} className={sdOpen ? '' : 'mob-item-hidden'} style={{padding:'10px 14px',borderBottom:i<3?`1px solid ${C.border}`:'none'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:C.ink}}>{dim.d}</span>
                <span style={{fontFamily:F.mono,fontSize:'11px',color:C.forest}}>{dim.s}</span>
              </div>
              <div style={{height:'3px',background:C.border,borderRadius:'2px',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${dim.s}%`,background:C.lime,borderRadius:'2px'}}/>
              </div>
              <div style={{marginTop:'3px',fontFamily:F.mono,fontSize:'9px',color:C.faint}}>Weight: {dim.w}</div>
            </div>
          ))}
        </div>
        <div style={{border:`1px solid ${C.border}`,borderTop:'none',padding:'14px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Sector Snapshot</div>
          {sector.snapshot.map((s,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:i<5?`1px solid ${C.border}`:'none'}}>
              <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{s.l}</span>
              <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:i===0?tierText(sector.tier):C.forest}}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

const Landscape=({sector})=>(
  <div className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'14px'}}/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'28px'}}>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Opportunity Landscape</div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,30px)',fontWeight:700,color:C.ink,lineHeight:1.2}}>Six sub-sectors. One strategic thesis.</h2>
        </div>
        <span style={{fontFamily:F.mono,fontSize:'10px',color:C.faint}}>p.08</span>
      </div>
      {/* Desktop table */}
      <div className='subs-table' style={{borderTop:`1px solid ${C.border}`}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 70px 100px 110px 1fr',gap:'0',padding:'7px 0',borderBottom:`2px solid ${C.ink}`}}>
          {['Sub-Sector','Score','Stage','Capital','Note'].map((h,i)=>(<div key={i} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,paddingRight:'12px'}}>{h}</div>))}
        </div>
        {sector.subs.map((s,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 70px 100px 110px 1fr',gap:'0',padding:'12px 0',borderBottom:`1px solid ${C.border}`,alignItems:'center'}}>
            <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink,paddingRight:'12px'}}>{s.name}</div>
            <div style={{paddingRight:'12px'}}>
              <span style={{fontFamily:F.mono,fontSize:'14px',fontWeight:500,color:s.score>=80?C.positive:s.score>=70?C.forest:C.amber}}>{s.score}</span>
              <div style={{height:'2px',background:C.border,marginTop:'3px',borderRadius:'1px',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${s.score}%`,background:s.score>=80?C.lime:s.score>=70?C.limeDark:'rgba(184,215,53,0.4)'}}/>
              </div>
            </div>
            <div style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,paddingRight:'12px'}}>{s.stage}</div>
            <div style={{fontFamily:F.mono,fontSize:'12px',color:C.forest,paddingRight:'12px'}}>{s.capital}</div>
            <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic'}}>{s.note}</div>
          </div>
        ))}
      </div>
      {/* Mobile cards */}
      <div className='subs-cards' style={{borderTop:`1px solid ${C.border}`,paddingTop:'12px'}}>
        {sector.subs.map((s,i)=>(
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'12px',background:C.paper}}>
            <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'7px',lineHeight:1.3}}>{s.name}</div>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px'}}>
              <span style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:s.score>=80?C.positive:s.score>=70?C.forest:C.amber,lineHeight:1}}>{s.score}</span>
              <div style={{flex:1,height:'3px',background:C.border,borderRadius:'2px',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${s.score}%`,background:s.score>=80?C.lime:s.score>=70?C.limeDark:'rgba(184,215,53,0.4)'}}/>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted}}>{s.stage}</span>
              <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:600,color:C.forest}}>{s.capital}</span>
            </div>
          </div>
        ))}
      </div>
      <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.faint,marginTop:'10px'}}>Full venture database and individual company assessments available to Members.</p>
    </div>
  </div>
);

const RiskThesis=({sector})=>{
  const [rmOpen, setRmOpen] = useState(false);
  return (
  <div className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
      <div>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        {/* Risk Matrix label — tap to expand on mobile */}
        <button
          className="mob-toggle"
          onClick={()=>setRmOpen(o=>!o)}
          style={{background:'transparent',border:'none',padding:0,cursor:'pointer',width:'100%',display:'block',textAlign:'left',marginBottom:'18px'}}
        >
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Risk Matrix</span>
            <span className="mob-show" style={{display:'none',fontFamily:F.mono,fontSize:'12px',color:C.muted,transform:rmOpen?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
          </div>
        </button>
        {sector.risks.map((r,i)=>(
          <div key={i} className={rmOpen ? '' : 'mob-item-hidden'} style={{paddingBottom:'12px',marginBottom:'12px',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'3px'}}>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,flex:1,paddingRight:'8px'}}>{r.r}</span>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',color:r.sev==='High'?C.red:r.sev==='Medium'?C.amber:C.positive,textTransform:'uppercase',flexShrink:0}}>{r.sev}</span>
            </div>
            <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic'}}>{r.mit}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'18px'}}>Investment Thesis</div>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{sector.thesis}</p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'22px'}}>{sector.thesis2}</p>
        <div style={{background:C.forest,padding:'18px',borderRadius:'2px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'10px'}}>Deployment Parameters</div>
          {sector.deploy.map((p,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:i<5?`1px solid rgba(255,255,255,0.08)`:'none'}}>
              <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.45)'}}>{p.l}</span>
              <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,textAlign:'right',maxWidth:'55%'}}>{p.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

const PREVIEW_COUNT = 6;

const Gate=({sector})=>{
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? sector.gate : sector.gate.slice(0, PREVIEW_COUNT);
  const hidden = sector.gate.length - PREVIEW_COUNT;
  return(
    <div className="pad-gate" style={{background:C.forest,padding:'48px 64px 40px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'-20px',bottom:'-40px',fontFamily:F.display,fontSize:'clamp(80px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.035)',pointerEvents:'none',userSelect:'none',letterSpacing:'-6px',lineHeight:1}}>{sector.num}</div>
      <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>

        {/* Label + headline */}
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>BRIDGE MEMBERS · FULL ACCESS</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,34px)',fontWeight:700,fontStyle:'italic',color:C.paper,lineHeight:1.25,marginBottom:'28px',maxWidth:'640px'}}>
          This is a summary brief. The complete {sector.name} Intelligence Package includes:
        </h2>

        {/* Compact item grid */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 40px',marginBottom:'0'}} className="tc">
          {visible.map((item,idx)=>(
            <div key={idx} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'9px 0',borderBottom:`1px solid rgba(255,255,255,0.08)`}}>
              <span style={{color:C.lime,fontFamily:F.sans,fontSize:'13px',fontWeight:700,flexShrink:0,lineHeight:1.5,marginTop:'1px'}}>→</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.68)',lineHeight:1.55}}>{item}</span>
            </div>
          ))}
        </div>

        {/* Expand / collapse toggle */}
        {!expanded && hidden > 0 && (
          <button
            onClick={()=>setExpanded(true)}
            style={{marginTop:'14px',display:'flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.06)',border:`1px solid rgba(255,255,255,0.12)`,padding:'9px 18px',cursor:'pointer',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'rgba(250,248,243,0.6)',letterSpacing:'0.5px',transition:'all 0.2s'}}
          >
            <span style={{color:C.lime}}>+{hidden}</span> more deliverables included
            <span style={{marginLeft:'4px',fontSize:'10px',opacity:0.5}}>↓</span>
          </button>
        )}
        {expanded && (
          <button
            onClick={()=>setExpanded(false)}
            style={{marginTop:'14px',display:'flex',alignItems:'center',gap:'8px',background:'transparent',border:'none',padding:'6px 0',cursor:'pointer',fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:'rgba(250,248,243,0.35)',letterSpacing:'0.5px'}}
          >
            Show less ↑
          </button>
        )}

        {/* CTA block */}
        <div style={{marginTop:'28px',borderTop:`1px solid rgba(255,255,255,0.1)`,paddingTop:'24px'}}>

          {/* Value line — hidden on mobile */}
          <p className="gate-value-line" style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',marginBottom:'20px',lineHeight:1.6}}>
            Members receive the complete package — all venture models, deployment playbooks, and quarterly intelligence updates — across all 12 sectors.
          </p>

          {/* Primary + secondary CTAs */}
          <div className="gate-cta-row" style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'stretch',marginBottom:'14px'}}>
            <a href="/login" style={{display:'flex',alignItems:'center',gap:'10px',background:C.lime,color:C.ink,padding:'14px 26px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',letterSpacing:'0.5px',flex:'1',minWidth:'200px',justifyContent:'center'}}>
              <span>Apply for Members Access</span>
              <span style={{fontSize:'14px',fontWeight:900}}>→</span>
            </a>
            <a href="#" style={{display:'flex',alignItems:'center',gap:'10px',background:'rgba(255,255,255,0.07)',border:`1px solid rgba(255,255,255,0.18)`,color:C.paper,padding:'14px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,textDecoration:'none',flex:'1',minWidth:'180px',justifyContent:'center'}}>
              <span style={{fontSize:'13px',opacity:0.7}}>↓</span>
              <span>Download Free Version</span>
            </a>
          </div>

          {/* Tertiary — hidden on mobile */}
          <div className="gate-tertiary" style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
            <a href="/resources" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.3)',textDecoration:'none',letterSpacing:'0.5px'}}>Browse all 12 sectors →</a>
            <span style={{width:'1px',height:'10px',background:'rgba(255,255,255,0.1)'}}/>
            <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.2)',letterSpacing:'1px'}}>bridgepbc.com/intelligence</span>
          </div>

        </div>

      </div>
    </div>
  );
};

const Footer=({sector})=>(
  <div className="pad-footer" style={{background:C.forest,padding:'16px 64px',borderTop:`3px solid ${C.lime}`}}>
    <div className="footer-inner" style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={18} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.15)'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>Sector {sector.num} of 12 · bridgepbc.com/intelligence</div>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'14px'}}>
        {[{l:'All Sectors',h:'/resources'},{l:'Members',h:'/membership'},{l:'Contact',h:'/contact'}].map((item,i)=>(<a key={i} href={item.h} style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.35)',textDecoration:'none'}}>{item.l}</a>))}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   SECTOR NAVIGATOR
═══════════════════════════════════════════════════════════════════════════ */
const Navigator=({active,onSelect})=>(
  <div className="np" style={{background:C.ink,padding:'10px 40px',borderBottom:`1px solid rgba(255,255,255,0.06)`,position:'sticky',top:'48px',zIndex:99,overflowX:'auto',whiteSpace:'nowrap'}}>
    <div style={{display:'flex',gap:'4px',minWidth:'max-content'}}>
      {SECTORS.map(s=>(
        <button key={s.id} onClick={()=>onSelect(s.id)} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',padding:'5px 10px',background:active===s.id?C.lime:'transparent',color:active===s.id?C.ink:'rgba(255,255,255,0.35)',border:`1px solid ${active===s.id?C.lime:'rgba(255,255,255,0.1)'}`,cursor:'pointer',borderRadius:'2px',transition:'all 0.15s ease',whiteSpace:'nowrap'}}>
          {s.num} {s.shortName}
        </button>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT EXPORT — accepts optional sectorId prop (1–12), defaults to 1
═══════════════════════════════════════════════════════════════════════════ */
export default function SectorBriefAll({sectorId=1}){
  // Read sector from URL query param if available
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const urlSector = urlParams?.get('sector') ? parseInt(urlParams.get('sector'), 10) : null;
  const initialSector = urlSector && urlSector >= 1 && urlSector <= 12 ? urlSector : sectorId;
  const[active,setActive]=useState(initialSector);
  const coverLogoRef=useRef(null);
  const sector=SECTORS.find(s=>s.id===active)||SECTORS[0];

  const handleSelect=(id)=>{
    setActive(id);
    window.scrollTo({top:0,behavior:'smooth'});
  };

  return(
    <div style={{fontFamily:F.body,background:C.paper}}>
      <Gf/>
      <TopBar sector={sector} coverLogoRef={coverLogoRef}/>
      <Navigator active={active} onSelect={handleSelect}/>
      <Cover sector={sector} logoRef={coverLogoRef}/>
      <Executive sector={sector}/>
      <Landscape sector={sector}/>
      <RiskThesis sector={sector}/>
      <Gate sector={sector}/>
      <Footer sector={sector}/>
    </div>
  );
}
