import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BRIDGE SECTOR INTELLIGENCE BRIEFS  ·  FULL MEMBERS EDITION
   Complete venture pipeline: Tier 1 / 2 / 3 + deployment timeline
   + cross-sector synergy map. All 12 sectors in one file.
═══════════════════════════════════════════════════════════════════════════ */

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF',teal:'#2E5A4D'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};

const MODE_COLORS={
  'Direct Op':{bg:C.forest,text:C.lime},
  'Partnership':{bg:C.amber,text:C.white},
  'Investment':{bg:C.teal,text:C.paper},
  'Guidance':{bg:C.paperDark,text:C.muted},
  'Network':{bg:C.ink,text:'rgba(250,248,243,0.6)'},
};
const RISK_COLOR={LOW:C.positive,MEDIUM:C.amber,HIGH:C.red};
const tierColor=t=>t==='Core'?C.limeDark:t==='Emerging'?C.amber:C.muted;
const tierText=t=>t==='Core'?C.positive:t==='Emerging'?C.amber:C.muted;

const Logo=({height=28,variant='white'})=>{const tf=variant==='white'?'#ffffff':'#1B4D3E';return(<svg height={height} viewBox="0 0 4113.8 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}><polygon fill="#1B4D3E" stroke="#1B4D3E" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/><path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1Z"/><path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4Z"/><path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1Z"/><path fill={tf} d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4c-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1c31.6,18.3,57,47.9,72.9,84.6c29.9,60.2,91.8,84.9,149.2,51.8c9.7-5.5,17.6-11.8,24.2-18.5Z"/><path fill={tf} d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1c20.7,15.4,38.5,34.7,52.2,57c13.3-10,27.7-18.6,43-25.4c27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6Z"/><rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/><rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/><path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7c0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8Z"/><rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/><rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/><rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/></svg>);};

const Gf=()=>(<style>{`
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .dc::first-letter{font-family:${F.display};font-size:4.5em;font-weight:900;float:left;line-height:0.8;margin:0.1em 0.12em 0 0;color:${C.forest};}
  @media print{.np{display:none!important;}}

  /* ── TABLET ── */
  @media(max-width:900px){
    .tc{grid-template-columns:1fr!important;}
    .hm{display:none!important;}
    .g3{grid-template-columns:1fr 1fr!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-topbar{padding:10px 24px!important;}
    .pad-footer{padding:14px 32px!important;}
    .pad-nav{padding:10px 24px!important;}
  }

  /* ── MOBILE ── */
  @media(max-width:600px){
    .g3{grid-template-columns:1fr!important;}
    .pad-section{padding:28px 18px!important;}
    .pad-cover{padding:20px 18px 0!important;}
    .pad-topbar{padding:10px 18px!important;}
    .pad-footer{padding:14px 18px!important;}
    .pad-nav{padding:8px 18px!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;}
    .mob-hide{display:none!important;}
    .mob-full{width:100%!important;}
    .mob-center{text-align:center!important;align-items:center!important;}
    .mob-small-text{font-size:10px!important;}
    .risk-grid{grid-template-columns:1fr!important;}
    .stats-grid{grid-template-columns:1fr 1fr!important;}
  }
`}</style>);

/* ═══════════════════════════════════════════════════════════════════════════
   VENTURE DATA — all 12 sectors
   Each venture: {name, desc, mode, capital, irr, risk, payback, phase}
═══════════════════════════════════════════════════════════════════════════ */
const SECTORS=[
  {
    id:1,num:'01',name:'Infrastructure',shortName:'Infrastructure',
    tier:'Core',score:87,capital:'$25–30M',edition:'March 2026 Edition',
    tagline:'Ghana\'s physical backbone is both its greatest constraint and its highest-return investment opportunity. Every sector\'s ceiling is set by the infrastructure beneath it.',
    stats:[{l:'Infrastructure Gap',v:'$12B+'},{l:'Road Network Paved',v:'18%'},{l:'Urban Population',v:'58%'},{l:'Kejetia Vendors',v:'10,000+'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:85},{d:'Development Impact',w:'30%',s:90},{d:'Implementation Feasibility',w:'25%',s:86},{d:'Financial Sustainability',w:'15%',s:82}],
    snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'87/100'},{l:'Priority',v:'Immediate deployment'},{l:'Capital',v:'$25–30M'},{l:'Timeline',v:'12–24 months'},{l:'Ventures Assessed',v:'18'}],
    summary:'Ghana\'s infrastructure deficit is not a development problem. It is a compounding tax on every other sector\'s potential. A road network that is 18% paved means agricultural produce rots before it reaches market.',
    summary2:'BRIDGE\'s infrastructure mandate is precise: not to build everything, but to identify the specific bottlenecks whose removal unlocks the highest multiplied returns across the integrated 12-sector portfolio.',
    summary3:'With $25–30M deployed across road connectivity, market infrastructure, water systems, and digital backbone, BRIDGE models a 3.2x development multiplier.',
    quote:'"Infrastructure is not a sector. It is the precondition for every other sector\'s existence. BRIDGE treats it accordingly — as the foundation investment that makes the entire portfolio compoundable."',
    subs:[{name:'Road & Connectivity Networks',score:91,stage:'Active',capital:'$8–12M',note:'Agri value chain unlock; regional market access'},{name:'Market Infrastructure (Kejetia-type)',score:88,stage:'Series A ready',capital:'$4–6M',note:'Digital-physical integration; 10,000+ vendor reach'},{name:'Port & Trade Infrastructure',score:85,stage:'Active',capital:'$6–10M',note:'Tema port efficiency; import/export cost reduction'},{name:'Water & Sanitation Systems',score:82,stage:'Seed–A',capital:'$3–5M',note:'Urban and peri-urban WASH; health sector co-benefit'},{name:'Energy Grid & Last-Mile Power',score:79,stage:'Seed–A',capital:'$2–4M',note:'Industrial reliability; connects to Sector 10'},{name:'Digital Backbone & Rural Broadband',score:76,stage:'Seed',capital:'$2–3M',note:'Foundation layer; all tech-sector ventures dependent'}],
    ventures:[
      {tier:1,name:'Market Resilience Platform',desc:'Integrated services platform (sanitation, solar power, drainage, security, digital tools) for major markets. Kejetia as flagship site.',mode:'Direct Op',capital:'$2–5M',irr:'18–25%',risk:'MEDIUM',payback:'4–5 yrs'},
      {tier:1,name:'Market Solar Micro-Grid',desc:'Solar + battery providing reliable power independent of national grid for market operators and traders.',mode:'Direct Op',capital:'$500K–2M',irr:'20–30%',risk:'MEDIUM',payback:'3–4 yrs'},
      {tier:1,name:'Public Toilet Networks',desc:'Modern pay-per-use toilet facilities in markets and transport hubs. Bundled management services.',mode:'Direct Op',capital:'$150–400K',irr:'25–35%',risk:'LOW',payback:'2–3 yrs'},
      {tier:1,name:'Market Cold Storage',desc:'Solar-powered cold rooms reducing post-harvest losses for perishable traders at market sites.',mode:'Direct Op',capital:'$200–500K',irr:'18–25%',risk:'LOW',payback:'3–4 yrs'},
      {tier:1,name:'Market Fire Safety Systems',desc:'Detection, suppression, and emergency response systems for markets. Bundled into market services.',mode:'Partnership',capital:'$200–600K',irr:'Bundled',risk:'LOW',payback:'N/A'},
      {tier:2,name:'Drainage & Flood Infrastructure',desc:'Engineered drainage systems protecting high-density market and commercial areas from seasonal flooding.',mode:'Partnership',capital:'$500K–2M',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:2,name:'Road Connectivity Programme',desc:'Last-mile road improvement connecting agricultural communities to market centers in target regions.',mode:'Partnership',capital:'$2–5M',irr:'12–18%',risk:'MEDIUM',payback:'8–12 yrs'},
      {tier:2,name:'Water Kiosk Network',desc:'Metered, pay-per-litre water kiosks in peri-urban areas. Franchise model with community operators.',mode:'Direct Op',capital:'$300–800K',irr:'15–20%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:2,name:'Infrastructure Data Platform',desc:'Open data platform tracking infrastructure conditions and service quality across Ghana.',mode:'Guidance',capital:'$100–200K',irr:'N/A',risk:'LOW',payback:'N/A'},
      {tier:2,name:'MMDA Capacity Building',desc:'Training for district planning staff on infrastructure design and public-private partnership frameworks.',mode:'Guidance',capital:'$50–150K',irr:'N/A',risk:'LOW',payback:'N/A'},
      {tier:3,name:'Port Efficiency Technology',desc:'Digital platform for Tema port clearance process — targeting 7–14 day clearance reduction to 2–3 days.',mode:'Investment',capital:'$1–3M',irr:'15–22%',risk:'HIGH',payback:'5–7 yrs'},
      {tier:3,name:'National Road Data Intelligence',desc:'IoT-enabled road condition monitoring network feeding into maintenance prioritisation systems.',mode:'Partnership',capital:'$1–2M',irr:'Social Return',risk:'MEDIUM',payback:'N/A'},
    ],
    timeline:{
      phase1:'Market Resilience Platform pilot (Kejetia); Solar Micro-Grid deployment; Public Toilet Network first 10 sites; Peace & Prosperity Notes tranche 1 ($1–2M)',
      phase2:'Cold Storage network expansion; Drainage infrastructure pilots; Water Kiosk franchise rollout; Road connectivity programme launch in 3 regions',
      phase3:'Port efficiency technology; National road data intelligence; Infrastructure replication in secondary cities (Kumasi, Takoradi, Tamale)',
    },
    synergies:[{sector:'06 Agriculture',link:'Cold chain and road access unlock post-harvest value recovery'},{sector:'12 Transport',link:'Market infrastructure anchors last-mile logistics economics'},{sector:'04 Technology',link:'Digital backbone enables market platform and fintech reach'},{sector:'10 Energy',link:'Solar micro-grids co-deployed with energy sector portfolio'}],
    thesis:'BRIDGE\'s infrastructure thesis centres on the multiplier logic: one well-chosen infrastructure investment unlocks disproportionate value across the portfolio.',
    thesis2:'Every infrastructure investment in the portfolio is designed with a revenue model — market management fees, digital transaction tolls, utility offtake agreements.',
    deploy:[{l:'Ticket size',v:'$2M–$8M per project'},{l:'Structure',v:'Equity + quasi-equity'},{l:'Revenue model',v:'Required — no grants'},{l:'DFI co-investment',v:'Actively sought'},{l:'Exit horizon',v:'10–15 years; asset sale'},{l:'Government partnership',v:'Required for permitting'}],
    risks:[{r:'Government procurement delays',sev:'High',mit:'Structured PPP frameworks; BRIDGE as implementation intermediary'},{r:'FX risk on USD-denominated construction costs',sev:'High',mit:'Cedi-denominated contracts; local procurement first'},{r:'Community displacement and land acquisition',sev:'Medium',mit:'Community co-design; benefit-sharing structures'},{r:'Long payback periods vs. investor expectations',sev:'Medium',mit:'Patient capital; blended finance with DFI concessional tranches'},{r:'Maintenance funding gap post-construction',sev:'Medium',mit:'Revenue-generating models built into every project'}],
  },
  {
    id:2,num:'02',name:'Financial Inclusion',shortName:'Fin. Inclusion',
    tier:'Core',score:84,capital:'$30–35M',edition:'March 2026 Edition',
    tagline:'Forty percent of Ghanaian adults remain outside formal financial systems. That is not a poverty story. It is a market opportunity of the highest order.',
    stats:[{l:'Adults Unbanked',v:'40%'},{l:'SME Credit Gap',v:'$4–6B'},{l:'Licensed Fintechs',v:'57'},{l:'GHS Processed',v:'3 Trillion'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:88},{d:'Development Impact',w:'30%',s:86},{d:'Implementation Feasibility',w:'25%',s:80},{d:'Financial Sustainability',w:'15%',s:82}],
    snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'84/100'},{l:'Priority',v:'Immediate deployment'},{l:'Capital',v:'$30–35M'},{l:'Timeline',v:'12–30 months'},{l:'Ventures Assessed',v:'18'}],
    summary:'Ghana\'s financial inclusion story is already underway — 57 licensed fintechs processing GHS 3 trillion annually. The question is whether organised capital can catalyse the next phase before the window closes.',
    summary2:'The $4–6B SME credit gap is the single most consequential financial inclusion number in Ghana. Millions of viable businesses cannot access capital. They are not bad credit risks — they are unscored.',
    summary3:'BRIDGE targets the infrastructure layer: credit scoring, savings products, insurance mechanisms, and cross-border payment efficiency that converts 40% exclusion into 40% addressable market.',
    quote:'"Ghana\'s fintech infrastructure is world-class. What it lacks is capital intelligence to route it toward the households and businesses that need it most."',
    subs:[{name:'SME Lending Platforms',score:88,stage:'Series A ready',capital:'$5–8M',note:'$4–6B credit gap; underserved SME base'},{name:'Cross-border & Diaspora Remittances',score:84,stage:'Series A',capital:'$3–5M',note:'$6.65B annual inflow; 15–20% cost reduction'},{name:'Mobile Money & Payments',score:83,stage:'Growth',capital:'$4–6M',note:'GHS 3T processed; interoperability expansion'},{name:'Insurance & Risk Products',score:80,stage:'Seed–A',capital:'$2–4M',note:'Agri micro-insurance; health for informal sector'},{name:'Savings & Wealth Products',score:76,stage:'Seed',capital:'$1–3M',note:'Diaspora-linked savings; household wealth building'},{name:'Credit Scoring & Alternative Data',score:74,stage:'Early',capital:'$1–2M',note:'Unbanked scoring; BOG regulatory sandbox'}],
    ventures:[
      {tier:1,name:'Market Financial Services Platform',desc:'Integrated savings, credit, insurance, and payments platform for market traders. Kejetia as anchor site with 10,000+ vendors.',mode:'Direct Op',capital:'$1–3M',irr:'15–22%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:1,name:'Trader Working Capital Facility',desc:'Group and individual working capital loans to market traders. Collateral-light; cash flow-based underwriting.',mode:'Direct Op',capital:'$500K–2M',irr:'18–25%',risk:'MEDIUM',payback:'3–5 yrs'},
      {tier:1,name:'Digital Susu Integration',desc:'Technology platform for susu digitisation — converting rotating savings groups to formal digital infrastructure.',mode:'Partnership',capital:'$200–500K',irr:'12–18%',risk:'LOW',payback:'3–4 yrs'},
      {tier:1,name:'Market Microinsurance Bundle',desc:'Stock, fire, health, and business interruption insurance bundled for market traders. Commission-based model.',mode:'Partnership',capital:'$150–400K',irr:'Commission',risk:'LOW',payback:'N/A'},
      {tier:1,name:'Financial Health Hub',desc:'Financial literacy, business formalisation, and credit readiness centre operating within market environment.',mode:'Guidance',capital:'$100–250K',irr:'Break-even',risk:'LOW',payback:'N/A'},
      {tier:2,name:'MSME Credit Guarantee Facility',desc:'Partial guarantees for bank and MFI lending to underserved SMEs. De-risks lenders; expands credit access.',mode:'Partnership',capital:'$2–5M',irr:'8–12%',risk:'MEDIUM',payback:'6–8 yrs'},
      {tier:2,name:'Diaspora Investment Gateway',desc:'Digital platform matching diaspora capital with vetted Ghana investment opportunities.',mode:'Direct Op',capital:'$300–800K',irr:'Break-even',risk:'MEDIUM',payback:'N/A'},
      {tier:2,name:'Remittance-to-Investment Products',desc:'Structured products converting remittance flows from consumption into productive investment.',mode:'Partnership',capital:'$200–500K',irr:'10–15%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:2,name:'Women\'s Economic Empowerment Fund',desc:'Dedicated lending programme for women-owned businesses with embedded mentorship.',mode:'Direct Op',capital:'$500K–1.5M',irr:'12–18%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:2,name:'Alternative Credit Scoring Platform',desc:'Mobile money and transaction data-driven credit scoring for unbanked population.',mode:'Partnership',capital:'$300–700K',irr:'15–20%',risk:'MEDIUM',payback:'4–5 yrs'},
      {tier:3,name:'BRIDGE Microfinance Institution',desc:'Licensed Tier 2/3 MFI providing credit, savings, and insurance to market and rural communities.',mode:'Direct Op',capital:'$5–15M',irr:'12–18%',risk:'HIGH',payback:'8–12 yrs'},
      {tier:3,name:'Fintech Equity Investment Portfolio',desc:'Strategic equity investments in 3–5 growth-stage Ghana fintechs with strong unit economics.',mode:'Investment',capital:'$1–5M',irr:'20–35%',risk:'HIGH',payback:'7–10 yrs'},
      {tier:3,name:'Community Investment Matching Fund',desc:'Diaspora-backed co-investment fund for community-identified development projects.',mode:'Partnership',capital:'$1–3M',irr:'Social Return',risk:'MEDIUM',payback:'N/A'},
      {tier:3,name:'Asset Finance for Market Equipment',desc:'Lease and hire-purchase financing for market traders purchasing equipment and stalls.',mode:'Partnership',capital:'$500K–2M',irr:'14–20%',risk:'MEDIUM',payback:'4–6 yrs'},
    ],
    timeline:{
      phase1:'Market Financial Services Platform (Kejetia); Trader Working Capital Facility launch; Digital Susu Integration pilot; Microinsurance bundle partnership signed',
      phase2:'MSME Credit Guarantee Facility; Diaspora Investment Gateway; Alternative Credit Scoring Platform; Women\'s Economic Empowerment Fund expansion',
      phase3:'BRIDGE MFI licensing; Fintech Equity Portfolio (3–5 investments); Community Investment Matching Fund; National platform replication',
    },
    synergies:[{sector:'01 Infrastructure',link:'Financial services embedded in market infrastructure platforms'},{sector:'06 Agriculture',link:'Agri-finance products serving farmer cooperatives'},{sector:'04 Technology',link:'Fintech portfolio companies enable credit scoring tech'},{sector:'09 Tourism',link:'Hospitality SME credit products; artisan finance'}],
    thesis:'BRIDGE\'s financial inclusion thesis has three layers: infrastructure (scoring systems, payment rails), product (SME credit, micro-insurance, savings), and diaspora ($6.65B redirected from consumption to investment).',
    thesis2:'The three layers are interdependent and sequenced. Infrastructure-layer capital deploys first, product-layer second, diaspora-layer continuously.',
    deploy:[{l:'Ticket size',v:'$500K–$5M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Ownership target',v:'10–20%'},{l:'Revenue model',v:'Required from day one'},{l:'Exit horizon',v:'5–8 years; strategic or IPO'},{l:'Co-investment',v:'DFI and diaspora preferred'}],
    risks:[{r:'BOG regulatory changes affecting mobile money licensing',sev:'Medium',mit:'Active regulatory engagement; BRIDGE government partnership'},{r:'Cedi depreciation eroding USD-measured returns',sev:'High',mit:'Local currency instruments; hedging through DFI structures'},{r:'Market consolidation compressing margins',sev:'Medium',mit:'Portfolio diversity; invest across value chain'},{r:'Over-indebtedness risk in SME lending',sev:'Medium',mit:'Responsible lending standards; credit bureau integration'},{r:'Talent gap in fintech product development',sev:'Low',mit:'Diaspora tech network; university partnerships'}],
  },
  {
    id:3,num:'03',name:'Health Systems',shortName:'Health Systems',
    tier:'Core',score:79,capital:'$10–15M',edition:'March 2026 Edition',
    tagline:'Ghana trains doctors that heal the world. The 1:6,000 doctor-to-patient ratio is not a capacity failure — it is a systems failure. And systems failures yield to intelligent capital.',
    stats:[{l:'Doctor-to-Patient',v:'1:6,000'},{l:'Doctors Practising Abroad',v:'56%'},{l:'NHIS Coverage',v:'~40%'},{l:'Health GDP Share',v:'3.5%'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:75},{d:'Development Impact',w:'30%',s:92},{d:'Implementation Feasibility',w:'25%',s:72},{d:'Financial Sustainability',w:'15%',s:68}],
    snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'79/100'},{l:'Priority',v:'Immediate deployment'},{l:'Capital',v:'$10–15M'},{l:'Timeline',v:'18–36 months'},{l:'Ventures Assessed',v:'19'}],
    summary:'Ghana\'s health system paradox is stark: 56% of its medical graduates practise abroad, leaving a domestic system stretched to its limits — a 1:6,000 doctor-to-patient ratio and chronic supply chain shortfalls.',
    summary2:'BRIDGE\'s mandate is not to replace the public system. It is to build connective infrastructure — telemedicine, supply chain tech, diagnostic networks — that multiply the impact of every health worker in Ghana.',
    summary3:'The NHIS presents a compelling structural opportunity. A well-designed health insurance technology platform can simultaneously reduce fraud, improve cash flow for providers, and expand coverage.',
    quote:'"Ghana does not lack health talent. It lacks the systems infrastructure to retain that talent and multiply its impact. BRIDGE builds the infrastructure that makes staying rational."',
    subs:[{name:'Telemedicine & Remote Diagnostics',score:82,stage:'Seed–A',capital:'$2–4M',note:'Rural reach; 1:6,000 ratio bridge; CHPS integration'},{name:'Medical Supply Chain Technology',score:79,stage:'Seed–A',capital:'$2–3M',note:'Stock-out reduction; procurement efficiency; cold chain'},{name:'Community Health Worker Platforms',score:78,stage:'Seed',capital:'$1–2M',note:'Last-mile delivery; Ghana Health Service CHPS integration'},{name:'Health Insurance Technology (NHIS)',score:74,stage:'Seed–A',capital:'$1–2M',note:'Claims processing; fraud reduction; coverage expansion'},{name:'Diagnostic & Imaging Networks',score:74,stage:'Seed',capital:'$1–3M',note:'Accra-region rollout; referral system integration'},{name:'Mental Health Services Infrastructure',score:67,stage:'Early',capital:'$0.5–1M',note:'Emerging demand; significant underservice'}],
    ventures:[
      {tier:1,name:'Telemedicine Platform',desc:'Mobile-first telemedicine platform linking rural patients to Accra-based specialists. Extends one doctor\'s reach from 200 to 2,000 patients.',mode:'Investment',capital:'$1.5–3M',irr:'15–22%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:1,name:'Pharmaceutical Supply Chain Platform',desc:'Digital procurement and inventory management for pharmaceutical supply chain — targeting stock-out reduction in CHPS compounds.',mode:'Investment',capital:'$1–2M',irr:'18–25%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:1,name:'Community Health Worker App',desc:'Data collection and task management application for CHPS community health workers. GHS partnership pathway.',mode:'Partnership',capital:'$500K–1M',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:1,name:'Market Trader Health Insurance',desc:'Affordable health coverage for informal sector market traders. Bundled into market financial services platform.',mode:'Partnership',capital:'$200–500K',irr:'Commission',risk:'LOW',payback:'N/A'},
      {tier:1,name:'NHIS Claims Technology',desc:'Claims processing and fraud detection technology for NHIS providers — improving cash flow and reducing leakage.',mode:'Investment',capital:'$500K–1.5M',irr:'15–20%',risk:'MEDIUM',payback:'4–5 yrs'},
      {tier:1,name:'Diagnostic Mobile Network',desc:'Solar-powered mobile diagnostic units providing X-ray, ultrasound, and blood panels at community level.',mode:'Partnership',capital:'$1–2M',irr:'12–18%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:1,name:'Maternal Health Platform',desc:'Antenatal and postnatal care coordination platform. Reducing maternal mortality through consistent follow-up.',mode:'Investment',capital:'$500K–1M',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:2,name:'CHPS Strengthening Programme',desc:'Equipment, training, and telemedicine linkage for 50 CHPS compounds in underserved districts.',mode:'Partnership',capital:'$1–2M',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:2,name:'Continuing Medical Education Platform',desc:'Virtual CME programme with diaspora faculty for Ghana-based healthcare providers.',mode:'Direct Op',capital:'$300–600K',irr:'Break-even',risk:'LOW',payback:'N/A'},
      {tier:2,name:'HealthTech Investment Portfolio',desc:'Strategic equity investments in 3–5 Ghana-based health technology ventures with demonstrated traction.',mode:'Investment',capital:'$1–3M',irr:'15–25%',risk:'HIGH',payback:'7–10 yrs'},
      {tier:2,name:'Diaspora Return Pathway',desc:'Structured programme facilitating diaspora healthcare professional return and rotation to Ghana.',mode:'Guidance',capital:'$200–400K',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:2,name:'Medical Emergency Fund',desc:'Emergency financing for market traders facing medical crises — preventing catastrophic health expenditure.',mode:'Partnership',capital:'$500K–1M',irr:'Social Return',risk:'MEDIUM',payback:'N/A'},
      {tier:3,name:'Nursing School Partnership',desc:'Co-investment with existing nursing school to expand capacity and modernise curriculum.',mode:'Partnership',capital:'$1–3M',irr:'Social Return',risk:'MEDIUM',payback:'N/A'},
      {tier:3,name:'Diagnostic Laboratory Network',desc:'Regional diagnostic laboratory network with standardised quality protocols and referral integration.',mode:'Investment',capital:'$3–8M',irr:'12–18%',risk:'HIGH',payback:'8–12 yrs'},
    ],
    timeline:{
      phase1:'Telemedicine platform (investment); Pharmaceutical supply chain pilot; Community health worker app (GHS partnership); Trader health insurance bundle',
      phase2:'CHPS Strengthening Programme (50 compounds); CME platform with diaspora faculty; HealthTech Portfolio (3 investments); NHIS claims tech',
      phase3:'Nursing school partnership; Diagnostic laboratory network; Mental health infrastructure; National telemedicine scale-out',
    },
    synergies:[{sector:'02 Fin. Inclusion',link:'Health insurance bundled into market financial services platform'},{sector:'12 Transport',link:'Cold chain logistics for pharmaceutical supply chain'},{sector:'11 Manufacturing',link:'Pharmaceutical manufacturing reducing supply chain import dependency'},{sector:'05 Education',link:'Medical training pipelines and health worker skills development'}],
    thesis:'Health is BRIDGE\'s highest-impact sector by Development Impact dimension (92/100). Every dollar of health system infrastructure investment generates returns across Ghana\'s entire human capital base.',
    thesis2:'BRIDGE\'s preferred investment architecture in health is B2B-first: platforms serving the NHIS, Ghana Health Service, employer groups, and NGOs rather than fragile direct-to-consumer models.',
    deploy:[{l:'Ticket size',v:'$500K–$3M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Model preference',v:'B2B / institutional first'},{l:'NHIS integration',v:'Strong positive signal'},{l:'Exit horizon',v:'7–10 years; strategic or regional'},{l:'Co-investment',v:'Global health funds; DFIs'}],
    risks:[{r:'Regulatory complexity — GHS, FDA, NHIS fragmentation',sev:'High',mit:'Dedicated regulatory affairs; BRIDGE policy interface'},{r:'Low willingness-to-pay in primary care',sev:'Medium',mit:'B2B models (employer, NHIS, NGO) not direct-to-consumer'},{r:'Infrastructure dependency — power and connectivity',sev:'High',mit:'Offline-first architecture; solar-powered deployment'},{r:'Brain drain acceleration without matching incentives',sev:'Medium',mit:'Retention-linked investment; salary supplementation'},{r:'Data privacy in low-literacy contexts',sev:'Low',mit:'Community consent protocols; GHS data governance'}],
  },
  {
    id:4,num:'04',name:'Technology & Innovation',shortName:'Technology',
    tier:'Emerging',score:76,capital:'$10–15M',edition:'March 2026 Edition',
    tagline:'Ghana risks irrelevance in the digital economy — not from lack of talent, but from lack of organised capital. This brief maps the opportunity architecture.',
    stats:[{l:'Licensed Fintechs',v:'57'},{l:'GHS Processed Annually',v:'3 Trillion'},{l:'Adult Financial Exclusion',v:'40%'},{l:'Tech Graduates Annually',v:'12,000+'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:72},{d:'Development Impact',w:'30%',s:81},{d:'Implementation Feasibility',w:'25%',s:74},{d:'Financial Sustainability',w:'15%',s:68}],
    snapshot:[{l:'Tier',v:'Emerging'},{l:'Score',v:'76/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$10–15M'},{l:'Timeline',v:'18–36 months'},{l:'Ventures Assessed',v:'18'}],
    summary:'Ghana\'s technology sector sits at an inflection point. Fifty-seven licensed fintechs, a world-class mobile money infrastructure, and a talent pipeline from KNUST, University of Ghana, and Ashesi that produces founders capable of competing globally.',
    summary2:'The gap is not capability — it is capital architecture. Ghana\'s tech ecosystem lacks the organised Seed and Series A infrastructure to capture its own digital value creation.',
    summary3:'BRIDGE\'s mandate: deploy $10–15M in organised early-stage capital across 5–10 ventures with demonstrated product-market fit, anchored to financial inclusion and infrastructure priorities.',
    quote:'"Ghana\'s tech opportunity is not a startup story. It is an infrastructure story wearing startup clothes."',
    subs:[{name:'Fintech & Payments',score:82,stage:'Series A ready',capital:'$4–6M',note:'57 licensed players; consolidation opportunity'},{name:'AgriTech Platforms',score:79,stage:'Seed–A',capital:'$2–4M',note:'Post-harvest value recovery; connects to Sector 06'},{name:'Logistics & Supply Chain Tech',score:77,stage:'Seed–A',capital:'$2–3M',note:'Last-mile infrastructure gap; connects to Sector 12'},{name:'HealthTech',score:74,stage:'Seed',capital:'$1–2M',note:'Telemedicine acceleration; rural reach imperative'},{name:'EdTech',score:71,stage:'Seed',capital:'$1–2M',note:'Skills gap platform; connects to Sector 05'},{name:'GovTech / Civic Tech',score:68,stage:'Early',capital:'$1M',note:'Public sector digital transformation pipeline'}],
    ventures:[
      {tier:1,name:'Kejetia Digital Platform',desc:'Comprehensive digital services platform for West Africa\'s largest market — payments, inventory, trade finance, supplier discovery for 10,000+ vendors.',mode:'Direct Op',capital:'$3–5M',irr:'18–25%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:1,name:'BRIDGE Growth Fund — Tech',desc:'Dedicated early-stage fund making 8–10 investments of $500K–$1.5M in Ghana-based technology companies with demonstrated revenue.',mode:'Investment',capital:'$5–10M',irr:'20–30%',risk:'HIGH',payback:'7–10 yrs'},
      {tier:1,name:'Tech Talent Bridge Programme',desc:'Structured diaspora engagement connecting 100+ Ghanaian tech professionals abroad with in-country founders and ventures.',mode:'Network',capital:'$300–600K',irr:'Break-even',risk:'LOW',payback:'N/A'},
      {tier:1,name:'Fintech Investment Portfolio',desc:'Growth capital for 3–5 revenue-stage fintechs expanding beyond mobile payments into credit, insurance, and savings.',mode:'Investment',capital:'$2–4M',irr:'15–25%',risk:'HIGH',payback:'5–8 yrs'},
      {tier:1,name:'Digital Apprenticeship Pipeline',desc:'Training-to-employment programme placing digital skills graduates in BRIDGE portfolio companies.',mode:'Partnership',capital:'$200–400K',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:1,name:'Female Founder Accelerator',desc:'Investment readiness and seed capital programme targeting female-founded tech ventures (currently receive <5% of investment).',mode:'Investment',capital:'$500K–1M',irr:'15–25%',risk:'MEDIUM',payback:'5–8 yrs'},
      {tier:2,name:'Market Platform Replication',desc:'Expansion of Kejetia digital platform model to Makola (Accra), Asafo (Kumasi), and 3 regional markets.',mode:'Direct Op',capital:'$2–4M each',irr:'15–22%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:2,name:'AgTech Investment Portfolio',desc:'3–5 investments in agricultural technology platforms improving market access, input supply, and financial services for smallholders.',mode:'Investment',capital:'$1.5–3M',irr:'15–25%',risk:'HIGH',payback:'6–9 yrs'},
      {tier:2,name:'HealthTech Investment Portfolio',desc:'Healthcare technology investments — telemedicine, supply chain, diagnostics — complementing Sector 03 health systems strategy.',mode:'Investment',capital:'$1–2.5M',irr:'15–25%',risk:'HIGH',payback:'6–9 yrs'},
      {tier:2,name:'Innovation Advisory Services',desc:'BRIDGE-affiliated advisory providing strategic, technical, and capital raising support to growth-stage startups.',mode:'Guidance',capital:'$100–250K',irr:'Fee-based',risk:'LOW',payback:'2–3 yrs'},
      {tier:3,name:'AI/ML Centre of Excellence',desc:'Applied AI research centre co-developed with University of Ghana and diaspora academic partners.',mode:'Partnership',capital:'$2–5M',irr:'Social Return',risk:'HIGH',payback:'N/A'},
      {tier:3,name:'Data Centre Co-Investment',desc:'Tier III data centre co-investment addressing Ghana\'s critical digital infrastructure gap.',mode:'Investment',capital:'$3–8M',irr:'12–18%',risk:'HIGH',payback:'8–12 yrs'},
      {tier:3,name:'EdTech Platform Investment',desc:'Learning management and skills certification platform targeting TVET and corporate training market.',mode:'Investment',capital:'$1–3M',irr:'15–22%',risk:'MEDIUM',payback:'6–8 yrs'},
      {tier:3,name:'Diaspora Angel Syndicate',desc:'Formal syndicate structure for Ghanaian diaspora angels co-investing in portfolio companies.',mode:'Network',capital:'$500K–1M',irr:'Pass-through',risk:'MEDIUM',payback:'N/A'},
    ],
    timeline:{
      phase1:'Kejetia Digital Platform (flagship); BRIDGE Growth Fund first close; Tech Talent Bridge launch; Female Founder Accelerator cohort 1',
      phase2:'Market Platform Replication (Makola, Asafo); AgTech Portfolio (3 investments); HealthTech Portfolio; Hub Partnership Programme',
      phase3:'AI/ML Centre of Excellence; Data Centre co-investment; EdTech platform; Diaspora Angel Syndicate formalisation',
    },
    synergies:[{sector:'01 Infrastructure',link:'Digital platform built on market infrastructure backbone'},{sector:'06 Agriculture',link:'AgTech portfolio overlaps directly with agriculture value chain'},{sector:'02 Fin. Inclusion',link:'Fintech portfolio is financial inclusion infrastructure'},{sector:'05 Education',link:'EdTech investments and talent pipeline development'}],
    thesis:'BRIDGE\'s technology thesis: ventures solving Ghana-specific institutional, agricultural, and financial architecture problems have structural defensibility no foreign entrant can replicate.',
    thesis2:'Preferred investment profile: 12+ months of revenue, demonstrated unit economics, clear pathway to financial inclusion, agriculture, or infrastructure markets.',
    deploy:[{l:'Ticket size',v:'$500K–$3M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Ownership target',v:'12–25%'},{l:'Board / observer',v:'Required for $2M+'},{l:'Co-investment',v:'Diaspora network preferred'},{l:'Exit horizon',v:'7–10 years; strategic or regional'}],
    risks:[{r:'Talent flight to Lagos, Nairobi, and London',sev:'High',mit:'Anchor incentives; co-investment with diaspora network'},{r:'Regulatory uncertainty in fintech licensing',sev:'Medium',mit:'Government partnership strategy; BOG engagement'},{r:'FX risk on USD-denominated returns',sev:'Medium',mit:'Cedi-denominated structures; DFI hedging'},{r:'Market size constraints at local scale',sev:'Low',mit:'Pan-West African expansion as second-stage thesis'},{r:'Infrastructure dependency on power and data',sev:'High',mit:'Sector 01 integration; resilience-first architecture'}],
  },
  {
    id:5,num:'05',name:'Education & Skills',shortName:'Education',
    tier:'Emerging',score:72,capital:'$5–10M',edition:'March 2026 Edition',
    tagline:'Ghana\'s youth bulge is either its greatest asset or its greatest risk. The difference is determined entirely by the skills infrastructure built in the next decade.',
    stats:[{l:'Youth Unemployment',v:'12.4%'},{l:'TVET Enrolment Gap',v:'600,000+'},{l:'Literacy Rate',v:'79%'},{l:'Annual STEM Graduates',v:'8,000+'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:68},{d:'Development Impact',w:'30%',s:88},{d:'Implementation Feasibility',w:'25%',s:70},{d:'Financial Sustainability',w:'15%',s:56}],
    snapshot:[{l:'Tier',v:'Emerging'},{l:'Score',v:'72/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$5–10M'},{l:'Timeline',v:'18–36 months'},{l:'Ventures Assessed',v:'14'}],
    summary:'Ghana\'s education system produces graduates at scale — but the skills it certifies are increasingly misaligned with the economy\'s actual needs. The most pressing gap is in technical and vocational training.',
    summary2:'The business model challenge is real. Consumer willingness-to-pay is constrained by household income. BRIDGE\'s education investments are B2B first: employer partnerships, government subsidies, diaspora education finance.',
    summary3:'The diaspora education connection is underexplored. Ghanaian diaspora households allocate significant resources to relatives\' education — largely through informal, high-cost channels.',
    quote:'"The skills gap is not a failure of ambition. It is a failure of infrastructure. Ghana\'s young people are ready to learn — the question is whether we build systems that meet them where they are."',
    subs:[{name:'TVET & Technical Skills Platforms',score:80,stage:'Seed–A',capital:'$2–4M',note:'Youth unemployment; skills-jobs mismatch; employer-linked'},{name:'Early Childhood Education',score:76,stage:'Seed',capital:'$1–2M',note:'Preschool access gap; long-term human capital compounding'},{name:'Teacher Training Technology',score:72,stage:'Early–Seed',capital:'$1–2M',note:'Rural school quality; GES partnership pathway'},{name:'Higher Education Access',score:70,stage:'Seed',capital:'$1–2M',note:'Tertiary participation rate; remote and hybrid learning'},{name:'Diaspora Education Finance',score:69,stage:'Early',capital:'$1–2M',note:'Remittance-to-education; structured savings products'},{name:'Corporate Training & Upskilling',score:66,stage:'Early',capital:'$0.5–1M',note:'Private sector L&D market; employer-funded demand'}],
    ventures:[
      {tier:1,name:'TVET Skills Platform',desc:'Technology-enabled technical and vocational training platform with employer certification. Targeting construction, manufacturing, and services skills.',mode:'Investment',capital:'$2–4M',irr:'12–18%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:1,name:'Employer Skills Marketplace',desc:'Platform connecting employers needing specific skills with training providers and job-ready graduates.',mode:'Investment',capital:'$500K–1.5M',irr:'15–22%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:1,name:'National Apprenticeship Partnership',desc:'Industry-linked apprenticeship programme complementing GH₵170M government National Apprenticeship Programme.',mode:'Partnership',capital:'$300–600K',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:1,name:'National Coders Programme Partner',desc:'Industry-facing complement to government GH₵100M National Coders Programme — placement and upskilling.',mode:'Partnership',capital:'$200–400K',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:2,name:'Early Childhood Education Network',desc:'Franchise model community preschool network serving peri-urban areas with below-market fees.',mode:'Direct Op',capital:'$1–2M',irr:'10–14%',risk:'MEDIUM',payback:'6–8 yrs'},
      {tier:2,name:'Teacher Professional Development Platform',desc:'Mobile-first continuous professional development for rural teachers. Offline-capable; SMS and radio fallback.',mode:'Investment',capital:'$500K–1.5M',irr:'12–18%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:2,name:'Diaspora Education Finance Product',desc:'Structured savings and lending product allowing diaspora to finance relatives\' education at significantly lower cost.',mode:'Direct Op',capital:'$1–2M',irr:'Break-even',risk:'MEDIUM',payback:'N/A'},
      {tier:2,name:'Higher Education Access Platform',desc:'Blended learning platform expanding tertiary participation rate for working adults and rural learners.',mode:'Investment',capital:'$500K–1.5M',irr:'12–18%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:3,name:'Skills Certification Authority',desc:'National skills certification body co-developed with GES — creating labour market credential value.',mode:'Partnership',capital:'$500K–1M',irr:'Social Return',risk:'HIGH',payback:'N/A'},
      {tier:3,name:'Female Empowerment Through Education',desc:'Scholarship, mentorship, and career placement programme for girls in STEM disciplines.',mode:'Guidance',capital:'$200–400K',irr:'Social Return',risk:'LOW',payback:'N/A'},
    ],
    timeline:{
      phase1:'TVET Skills Platform investment; Employer Skills Marketplace; National Apprenticeship Programme partnership; National Coders partnership',
      phase2:'Early Childhood Education Network; Teacher Professional Development Platform; Diaspora Education Finance product launch',
      phase3:'Skills Certification Authority; Female Empowerment Programme; Higher Education Access Platform national expansion',
    },
    synergies:[{sector:'11 Manufacturing',link:'TVET skills pipeline feeding manufacturing workforce needs'},{sector:'04 Technology',link:'Digital skills development for tech ecosystem'},{sector:'06 Agriculture',link:'Agricultural extension skills and cooperative management training'},{sector:'03 Health',link:'Community health worker training and upskilling'}],
    thesis:'Education is BRIDGE\'s highest Development Impact score outside Health (88/100) but carries lower composite score due to financial sustainability constraints — making it ideal for blended finance.',
    thesis2:'Preferred investment: infrastructure-layer platforms serving institutional buyers (GES, TVET institutions, employers, NGOs) rather than fragile direct-to-consumer models.',
    deploy:[{l:'Ticket size',v:'$250K–$2M per venture'},{l:'Stage',v:'Early Seed through Series A'},{l:'Model preference',v:'B2B institutional first'},{l:'Blended finance',v:'Welcome — impact + commercial'},{l:'Exit horizon',v:'8–12 years'},{l:'Government alignment',v:'GES accreditation required'}],
    risks:[{r:'Government curriculum constraints limiting EdTech market',sev:'Medium',mit:'GES partnership track; accreditation as market entry'},{r:'Low consumer willingness-to-pay',sev:'High',mit:'B2B and employer-subsidy models; diaspora education finance'},{r:'Connectivity gaps in rural schools',sev:'High',mit:'Offline-first design; radio and SMS delivery'},{r:'Competition from international EdTech platforms',sev:'Low',mit:'Ghana-specific content and accreditation as differentiation'},{r:'Long feedback loops on educational outcomes',sev:'Medium',mit:'Intermediate metrics: enrolment, completion, employment rate'}],
  },
  {
    id:6,num:'06',name:'Agriculture & Value Chains',shortName:'Agriculture',
    tier:'Core',score:83,capital:'$10–15M',edition:'March 2026 Edition',
    tagline:'Ghana loses 40% of agricultural production after harvest. That $1.9 billion annual leakage is a solvable logistics, storage, and market access problem.',
    stats:[{l:'Post-Harvest Loss Rate',v:'40%'},{l:'Annual Value Leakage',v:'$1.9B'},{l:'Labour Force in Agri',v:'30%+'},{l:'Arable Land Utilised',v:'~30%'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:86},{d:'Development Impact',w:'30%',s:90},{d:'Implementation Feasibility',w:'25%',s:78},{d:'Financial Sustainability',w:'15%',s:74}],
    snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'83/100'},{l:'Priority',v:'Immediate deployment'},{l:'Capital',v:'$10–15M'},{l:'Timeline',v:'12–24 months'},{l:'Ventures Assessed',v:'15'}],
    summary:'Ghana loses $1.9 billion annually to post-harvest losses — not a production problem, but a value chain failure in storage, logistics, cold chain, and market access.',
    summary2:'BRIDGE\'s agriculture mandate addresses the value chain, not just the farm. Storage infrastructure, input supply platforms, agri-finance, and commodity trading platforms that reduce the cost of getting food from farm to market.',
    summary3:'The multiplier effects extend to nutrition, rural income, and export competitiveness. Every dollar of value chain investment recovers multiple dollars of currently destroyed agricultural output.',
    quote:'"The $1.9 billion agricultural value leakage is Ghana\'s most immediately solvable economic problem. It requires no new technology — only organised capital, intelligent logistics, and fair market access."',
    subs:[{name:'Post-Harvest Storage & Cold Chain',score:88,stage:'Series A ready',capital:'$4–6M',note:'40% loss rate; $1.9B leakage directly addressable'},{name:'Commodity Processing & Value-Add',score:85,stage:'Active',capital:'$4–8M',note:'Cassava, shea, cocoa, palm transformation'},{name:'Input Supply & Last-Mile Distribution',score:84,stage:'Seed–A',capital:'$3–5M',note:'Fertiliser & seed access; smallholder productivity'},{name:'Agri-Finance & Seasonal Credit',score:82,stage:'Seed–A',capital:'$2–4M',note:'Farmer credit; harvest-cycle aligned lending'},{name:'Commodity Trading & Price Transparency',score:80,stage:'Seed–A',capital:'$2–4M',note:'Market price visibility; farmer bargaining power'},{name:'Precision Agriculture & Climate Adaptation',score:72,stage:'Early',capital:'$1–2M',note:'Smallholder productivity; climate-resilient varieties'}],
    ventures:[
      {tier:1,name:'Tomato Processing Facility',desc:'Commercial tomato paste processing facility absorbing surplus production and reducing import dependency.',mode:'Direct Op',capital:'$2–4M',irr:'15–20%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:1,name:'Solar Cold Storage Network',desc:'Solar-powered cold storage facilities at key aggregation points. Direct attack on 40% post-harvest loss.',mode:'Partnership',capital:'$1.5–3M',irr:'12–15%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:1,name:'Cooperative Capital Fund',desc:'Revolving credit facility for smallholder cooperatives — covering inputs, equipment, and working capital.',mode:'Investment',capital:'$1–2M',irr:'10–14%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:1,name:'AgTech Investment Portfolio',desc:'3–5 investments in agricultural technology platforms addressing input supply, market access, and price transparency.',mode:'Investment',capital:'$1–2M',irr:'20–25%',risk:'HIGH',payback:'5–8 yrs'},
      {tier:1,name:'Market Aggregation Centres',desc:'Physical aggregation hubs where smallholders consolidate produce for bulk sale — eliminating intermediary margin loss.',mode:'Partnership',capital:'$500K–1M',irr:'8–12%',risk:'LOW',payback:'4–6 yrs'},
      {tier:1,name:'Agricultural Insurance Partnership',desc:'Crop and livestock insurance products for smallholders — climate event protection; input loss coverage.',mode:'Partnership',capital:'$300–600K',irr:'Commission',risk:'LOW',payback:'N/A'},
      {tier:2,name:'Fruit Processing Facility',desc:'Mango, pineapple, and citrus processing for domestic consumption and export — absorbing seasonal surpluses.',mode:'Direct Op',capital:'$2–4M',irr:'14–18%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:2,name:'Cashew & Shea Processing',desc:'Value-added processing of cashew nuts and shea butter for export — capturing in-country transformation premium.',mode:'Partnership',capital:'$1.5–3M',irr:'15–20%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:2,name:'Warehouse Receipt Financing',desc:'Collateral management system using stored commodities as loan security for farmers and cooperatives.',mode:'Partnership',capital:'$1–2M',irr:'12–16%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:2,name:'Diaspora Crowd-Farming Platform',desc:'Platform enabling diaspora to invest in traceable agricultural projects with financial return and impact narrative.',mode:'Direct Op',capital:'$400–800K',irr:'Break-even',risk:'MEDIUM',payback:'N/A'},
      {tier:3,name:'Cocoa Processing Facility',desc:'Premium cocoa processing targeting European craft chocolate market — capturing value beyond raw bean export.',mode:'Partnership',capital:'$3–6M',irr:'15–22%',risk:'HIGH',payback:'6–9 yrs'},
      {tier:3,name:'Integrated Agriculture Hub',desc:'Multi-commodity processing, storage, and logistics hub. Ejura as anchor site in Northern Ghana.',mode:'Direct Op',capital:'$2–4M',irr:'12–18%',risk:'HIGH',payback:'6–10 yrs'},
    ],
    timeline:{
      phase1:'Tomato Processing Facility; Solar Cold Storage Network (5 sites); Cooperative Capital Fund; Market Aggregation Centres; Agricultural Insurance',
      phase2:'Fruit Processing Facility; Cashew & Shea Processing; Warehouse Receipt Financing; AgTech Portfolio (3 investments)',
      phase3:'Cocoa Processing Facility; Integrated Agriculture Hub (Ejura); Export Development Programme; Model replication in Upper East/West',
    },
    synergies:[{sector:'12 Transport',link:'Cold chain logistics is shared infrastructure with transport sector'},{sector:'02 Fin. Inclusion',link:'Agri-finance products; cooperative banking services'},{sector:'11 Manufacturing',link:'Agricultural processing is light industry — overlapping ventures'},{sector:'01 Infrastructure',link:'Road and storage infrastructure unlock agri value chain'}],
    thesis:'BRIDGE\'s agriculture thesis is anchored in the multiplier logic: middle-of-chain investments in storage, logistics, and processing have lower climate risk, stronger pricing power, and clearer revenue models than farm-level plays.',
    thesis2:'Food processing is both an agriculture and a manufacturing investment — compounding impact across two Core sectors and unlocking export premium beyond raw commodity markets.',
    deploy:[{l:'Ticket size',v:'$500K–$4M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Model preference',v:'B2B and aggregator'},{l:'Climate resilience',v:'Required — built into scoring'},{l:'Exit horizon',v:'6–10 years; strategic'},{l:'Co-investment',v:'Agri DFIs; impact funds'}],
    risks:[{r:'Seasonal revenue concentration and climate events',sev:'High',mit:'Portfolio diversification; crop insurance integration'},{r:'Smallholder fragmentation making aggregation expensive',sev:'Medium',mit:'Aggregator model; cooperative structure support'},{r:'Price volatility in commodity markets',sev:'High',mit:'Forward contract structures; price stabilisation'},{r:'Land tenure insecurity limiting collateral',sev:'Medium',mit:'Revenue-based financing; moveable asset collateral'},{r:'Infrastructure gaps constraining cold chain',sev:'High',mit:'Sector 01 co-investment; solar-powered storage'}],
  },
  {
    id:7,num:'07',name:'Sports, Entertainment & Creative',shortName:'Sports & Creative',
    tier:'Growth',score:61,capital:'$5–8M',edition:'March 2026 Edition',
    tagline:'Afrobeats is a global phenomenon. Ghanaian film is finding its footing. A generation of athletes is waiting for infrastructure that can turn talent into careers.',
    stats:[{l:'Creative Economy GDP',v:'$4.8B'},{l:'Fashion Industry Value',v:'$2.42B'},{l:'Afrobeats Monthly Plays',v:'38M (GH)'},{l:'Youth in Creative Sector',v:'500,000+'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:65},{d:'Development Impact',w:'30%',s:58},{d:'Implementation Feasibility',w:'25%',s:62},{d:'Financial Sustainability',w:'15%',s:52}],
    snapshot:[{l:'Tier',v:'Growth'},{l:'Score',v:'61/100'},{l:'Priority',v:'Monitor & develop'},{l:'Capital',v:'$5–8M'},{l:'Timeline',v:'24–48 months'},{l:'Ventures Assessed',v:'22'}],
    summary:'Ghana\'s creative economy contributes $4.8B to GDP. Afrobeats streams are growing 60% year-on-year. The missing piece is commercial infrastructure — studios, distribution, IP management, and training.',
    summary2:'Without distribution infrastructure, music revenues flow abroad. Without training facilities, athletes develop in poorly resourced environments. Without IP protection, creators lose the returns their work generates.',
    summary3:'BRIDGE\'s Growth tier designation reflects genuine commercial complexity. Revenue models are less proven, exit paths are longer. But the diaspora connection is uniquely powerful here.',
    quote:'"Ghana\'s creative industries don\'t need more talent. They need the infrastructure, contracts, and capital that converts talent into sustainable careers and economic value."',
    subs:[{name:'Music Production & Distribution',score:68,stage:'Seed',capital:'$1–2M',note:'Afrobeats global momentum; local distribution gap'},{name:'Film & Video Production',score:65,stage:'Seed',capital:'$1–2M',note:'Ghallywood; streaming platform integration'},{name:'Sports Infrastructure & Academies',score:63,stage:'Early–Seed',capital:'$1–3M',note:'Talent pipeline; international transfer value'},{name:'Creative Economy Digital Platforms',score:60,stage:'Early',capital:'$0.5–1M',note:'Artist monetisation; IP management'},{name:'Events & Live Entertainment',score:58,stage:'Early',capital:'$0.5–1M',note:'Tourism crossover; seasonal concentration risk'},{name:'Gaming & Interactive Media',score:56,stage:'Early',capital:'$0.5–1M',note:'Youth demographics; mobile-first; long runway'}],
    ventures:[
      {tier:1,name:'Black Star Recording Studios',desc:'Professional recording, mixing, and mastering facility serving Ghanaian and West African artists. Anchor for Afrobeats production ecosystem.',mode:'Direct Op',capital:'$1–2M',irr:'18–25%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:1,name:'Creative Arts Financing Facility',desc:'Specialised lending product for creative sector businesses — financing production, tours, and equipment.',mode:'Investment',capital:'$500K–1.5M',irr:'15–22%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:1,name:'Ghana Youth Football Academy',desc:'Elite youth football academy with professional pathways and international scouting integration.',mode:'Partnership',capital:'$1–2M',irr:'12–20%',risk:'MEDIUM',payback:'5–8 yrs'},
      {tier:1,name:'Heritage Textiles Market Platform',desc:'Digital marketplace connecting kente, batik, and adinkra producers with international buyers and diaspora consumers.',mode:'Direct Op',capital:'$500K–1M',irr:'15–22%',risk:'LOW',payback:'3–5 yrs'},
      {tier:1,name:'GHAMRO Capacity Building',desc:'Technical and management capacity for Ghana Music Rights Organisation — improving artist royalty collection and distribution.',mode:'Guidance',capital:'$100–250K',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:1,name:'Film Production Training Institute',desc:'Professional film and video production training — building Ghallywood technical workforce.',mode:'Partnership',capital:'$500K–1M',irr:'12–18%',risk:'LOW',payback:'4–6 yrs'},
      {tier:1,name:'Diaspora Creative Mentorship Network',desc:'Structured programme connecting diaspora creative professionals with in-country talent.',mode:'Network',capital:'$150–300K',irr:'Break-even',risk:'LOW',payback:'N/A'},
      {tier:2,name:'Ashanti Fashion Incubator',desc:'Design, production, and market access support for Kumasi-based fashion designers — AGOA pathway.',mode:'Partnership',capital:'$500K–1M',irr:'12–18%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:2,name:'Film Production Hub',desc:'Full-service film production facility with sound stages, post-production, and equipment rental.',mode:'Investment',capital:'$1–2M',irr:'14–20%',risk:'HIGH',payback:'6–9 yrs'},
      {tier:2,name:'Music Business Academy',desc:'Business education for musicians — contracts, IP, publishing, touring economics.',mode:'Guidance',capital:'$100–200K',irr:'Break-even',risk:'LOW',payback:'N/A'},
      {tier:3,name:'Gaming & Esports Initiative',desc:'Mobile gaming development studio targeting African market — youth-focused, mobile-first.',mode:'Investment',capital:'$500K–1M',irr:'Variable',risk:'HIGH',payback:'8–12 yrs'},
      {tier:3,name:'Cultural Heritage Tourism Integration',desc:'Experience products connecting creative industries with tourism — cultural performance, artisan workshops.',mode:'Partnership',capital:'$500K–1M',irr:'10–15%',risk:'MEDIUM',payback:'5–7 yrs'},
    ],
    timeline:{
      phase1:'Black Star Recording Studios (flagship); Heritage Textiles Platform; Ghana Youth Football Academy; GHAMRO Capacity Building',
      phase2:'Creative Arts Financing Facility; Film Production Training; Ashanti Fashion Incubator; Music Business Academy',
      phase3:'Film Production Hub; Gaming & Esports Initiative; Cultural Heritage Tourism Integration; Regional creative economy expansion',
    },
    synergies:[{sector:'09 Tourism',link:'Cultural experiences and creative performances as tourism product'},{sector:'05 Education',link:'Creative skills training overlaps with TVET mandate'},{sector:'08 Housing',link:'Creative economy hubs require workspace and accommodation infrastructure'},{sector:'02 Fin. Inclusion',link:'Creative economy financing products for informal sector artists'}],
    thesis:'BRIDGE\'s creative industries thesis is a patience thesis. This is not a first-tranche sector. It is a second and third-tranche sector — after Core sector returns have created financial headroom for longer payback periods.',
    thesis2:'Preferred structure is infrastructure over content: studios, academies, distribution platforms, IP management systems that serve many creators rather than betting on individual artists.',
    deploy:[{l:'Ticket size',v:'$250K–$1.5M per venture'},{l:'Stage',v:'Early through Seed'},{l:'Deployment tranche',v:'2nd/3rd — after Core'},{l:'Model preference',v:'Infrastructure over content'},{l:'Exit horizon',v:'8–12 years'},{l:'Diaspora co-investment',v:'Actively encouraged'}],
    risks:[{r:'Revenue model immaturity — most businesses pre-profit',sev:'High',mit:'Patient capital structures; milestone-based tranching'},{r:'IP enforcement weakness across ECOWAS',sev:'High',mit:'IP-first due diligence; contractual protections'},{r:'Talent brain drain to UK, US, and Canada',sev:'Medium',mit:'Diaspora co-investment; retention incentive structures'},{r:'Hit-dependent revenue concentration',sev:'Medium',mit:'Portfolio approach across multiple artists and projects'},{r:'Long development timelines for creative assets',sev:'Medium',mit:'Infrastructure-first avoids content creation risk'}],
  },
  {
    id:8,num:'08',name:'Housing & Real Estate',shortName:'Housing',
    tier:'Growth',score:70,capital:'$15–20M',edition:'March 2026 Edition',
    tagline:'Ghana faces an 1.8 million unit housing deficit. The opportunity is in building the financial, digital, and physical infrastructure that makes housing delivery commercially viable at scale.',
    stats:[{l:'Housing Deficit',v:'1.8M units'},{l:'Urban Growth Rate',v:'3.4%/yr'},{l:'Mortgage Penetration',v:'<1% GDP'},{l:'Informal Settlements',v:'~35% urban'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:74},{d:'Development Impact',w:'30%',s:76},{d:'Implementation Feasibility',w:'25%',s:64},{d:'Financial Sustainability',w:'15%',s:60}],
    snapshot:[{l:'Tier',v:'Growth'},{l:'Score',v:'70/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$15–20M'},{l:'Timeline',v:'24–48 months'},{l:'Ventures Assessed',v:'15'}],
    summary:'Ghana\'s housing deficit is a financing, land tenure, and construction technology problem — not purely a supply problem. Mortgage penetration below 1% of GDP reflects product design failure, not lack of demand.',
    summary2:'BRIDGE\'s housing mandate is infrastructure-layer: PropTech platforms, alternative construction technology, rental market formalisation, and innovative financing structures that make the market work.',
    summary3:'The diaspora housing connection is structurally powerful: Ghanaian diaspora have both the savings and the motivation to invest in property at home. A diaspora-linked housing investment product represents one of BRIDGE\'s highest-potential capital mobilisation opportunities.',
    quote:'"The housing deficit cannot be solved with the same instruments that created it. BRIDGE invests in the new instruments — PropTech, alternative finance, construction technology — that make delivery viable."',
    subs:[{name:'Affordable Housing Development',score:78,stage:'Active',capital:'$5–8M',note:'Income-linked design; public-private partnership'},{name:'Mortgage & Home Finance Innovation',score:74,stage:'Seed–A',capital:'$3–5M',note:'Rate environment challenge; long-term product design'},{name:'Student & Worker Accommodation',score:72,stage:'Seed–A',capital:'$2–4M',note:'University city demand; structured returns'},{name:'PropTech & Market Transparency',score:70,stage:'Seed',capital:'$1–2M',note:'Listings; transaction efficiency; formalisation'},{name:'Rental Market Platforms',score:68,stage:'Seed',capital:'$1–2M',note:'Urbanisation demand; tenant protection; landlord tools'},{name:'Land Registry & Title Technology',score:64,stage:'Early',capital:'$1–2M',note:'Title clarity; mortgage prerequisite; GLA partnership'}],
    ventures:[
      {tier:1,name:'Student Accommodation Development',desc:'Purpose-built student accommodation in Accra, Kumasi, and Cape Coast. Structured institutional returns with stable occupancy.',mode:'Direct Op',capital:'$3–6M',irr:'14–18%',risk:'MEDIUM',payback:'7–10 yrs'},
      {tier:1,name:'Diaspora Build-to-Own Platform',desc:'Structured vehicle for diaspora to finance their own Ghanaian home — eliminating incomplete project epidemic.',mode:'Direct Op',capital:'$2–4M',irr:'12–16%',risk:'MEDIUM',payback:'8–12 yrs'},
      {tier:1,name:'Affordable Housing PPP',desc:'Public-private partnership developing income-linked affordable housing on government-identified land.',mode:'Partnership',capital:'$5–8M',irr:'12–16%',risk:'HIGH',payback:'10–15 yrs'},
      {tier:1,name:'Property Listing Platform',desc:'Verified property listing and transaction platform addressing opacity and fraud in Ghana\'s real estate market.',mode:'Investment',capital:'$500K–1M',irr:'18–25%',risk:'LOW',payback:'3–5 yrs'},
      {tier:2,name:'Rental Management Platform',desc:'End-to-end rental management for landlords and tenants — payment, maintenance, dispute resolution.',mode:'Investment',capital:'$500K–1.5M',irr:'15–22%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:2,name:'Alternative Construction Technology',desc:'Low-cost, high-quality compressed earth block and prefab panel systems reducing construction cost 20–30%.',mode:'Partnership',capital:'$1–3M',irr:'14–20%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:2,name:'Employer Housing Scheme',desc:'Employer-linked housing finance enabling workforce accommodation without high-rate mortgage dependency.',mode:'Partnership',capital:'$1–3M',irr:'12–16%',risk:'LOW',payback:'6–8 yrs'},
      {tier:2,name:'Land Title Technology',desc:'Digital land registry and title verification platform — addressing tenure insecurity that blocks mortgage finance.',mode:'Investment',capital:'$500K–1.5M',irr:'14–20%',risk:'HIGH',payback:'5–8 yrs'},
      {tier:3,name:'Mass Market Housing Development',desc:'Large-scale affordable housing development targeting 2,000+ unit projects. Requires patient concessional capital.',mode:'Partnership',capital:'$5–15M',irr:'10–14%',risk:'HIGH',payback:'12–18 yrs'},
      {tier:3,name:'Housing Microfinance',desc:'Incremental housing improvement loans for informal sector households — step-by-step quality upgrades.',mode:'Investment',capital:'$1–3M',irr:'15–20%',risk:'MEDIUM',payback:'6–8 yrs'},
    ],
    timeline:{
      phase1:'Student Accommodation (Accra, Kumasi); Property Listing Platform; Diaspora Build-to-Own Platform; Affordable Housing PPP scoping',
      phase2:'Rental Management Platform; Alternative Construction Technology; Employer Housing Scheme; Land Title Technology',
      phase3:'Mass Market Housing Development; Housing Microfinance; Regional expansion to Takoradi and Tamale',
    },
    synergies:[{sector:'02 Fin. Inclusion',link:'Housing finance products; mortgage innovation; rental payments'},{sector:'01 Infrastructure',link:'Construction requires road, water, and power infrastructure'},{sector:'11 Manufacturing',link:'Local construction materials manufacturing reduces build cost'},{sector:'09 Tourism',link:'Heritage hospitality accommodation overlaps with housing infrastructure'}],
    thesis:'Housing is Growth tier not because of low impact potential but because of implementation complexity. BRIDGE\'s entry strategy is deliberate: student housing first, affordable housing second.',
    thesis2:'The diaspora housing product is the highest-priority innovation target for 2026. Structured build-to-own vehicle converting diaspora remittances from incomplete projects to completed assets.',
    deploy:[{l:'Ticket size',v:'$500K–$5M per venture'},{l:'Stage',v:'Seed through active development'},{l:'Entry point',v:'Student housing first'},{l:'Diaspora product',v:'Priority innovation target'},{l:'Exit horizon',v:'8–15 years; asset sale'},{l:'Co-investment',v:'Mortgage DFIs; pension funds'}],
    risks:[{r:'Land tenure insecurity and chieftaincy disputes',sev:'High',mit:'Title verification due diligence; Lands Commission partnerships'},{r:'High interest rate environment eroding affordability',sev:'High',mit:'Equity structures over debt; employer-linked schemes'},{r:'Construction cost inflation in USD materials',sev:'Medium',mit:'Local material substitution; modular construction'},{r:'Long development timelines (3–5 years)',sev:'Medium',mit:'Phased investment; tranche-based capital release'},{r:'Policy risk — housing policy changes between elections',sev:'Medium',mit:'Private sector-only structures not dependent on policy'}],
  },
  {
    id:9,num:'09',name:'Tourism & Hospitality',shortName:'Tourism',
    tier:'Growth',score:68,capital:'$8–12M',edition:'March 2026 Edition',
    tagline:'The Year of Return brought 1 million visitors and proved Ghana\'s diaspora tourism thesis. The question is whether the infrastructure exists to convert that proof into a perennial industry.',
    stats:[{l:'International Arrivals',v:'~1.1M/yr'},{l:'Tourism GDP Share',v:'4.9%'},{l:'Year of Return',v:'$1.9B impact'},{l:'Hotel Room Gap',v:'Mid-market'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:70},{d:'Development Impact',w:'30%',s:65},{d:'Implementation Feasibility',w:'25%',s:68},{d:'Financial Sustainability',w:'15%',s:62}],
    snapshot:[{l:'Tier',v:'Growth'},{l:'Score',v:'68/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$8–12M'},{l:'Timeline',v:'24–36 months'},{l:'Ventures Assessed',v:'13'}],
    summary:'Ghana\'s Year of Return (2019) demonstrated the diaspora tourism thesis definitively — 1 million visitors, $1.9B in economic activity, and proof that the global African diaspora represents an underserved and high-yield travel segment.',
    summary2:'The infrastructure that received those visitors was not built to scale the experience. Mid-market hotel supply is insufficient. Heritage site access is underdeveloped. Tour Ghana digital infrastructure significantly lags competitive destinations.',
    summary3:'BRIDGE\'s tourism thesis: Ghana as the homecoming destination for the global African diaspora — premium, culturally authentic, English-language, politically stable. A niche with structural pricing power.',
    quote:'"The Year of Return proved the demand. BRIDGE\'s job is to build the supply infrastructure that converts proof of concept into perennial industry."',
    subs:[{name:'Eco & Heritage Tourism Infrastructure',score:76,stage:'Seed–A',capital:'$2–4M',note:'Year of Return legacy; diaspora homecoming market'},{name:'Hotel & Hospitality Mid-Market Supply',score:72,stage:'Active',capital:'$3–6M',note:'Mid-market gap in Kumasi, Cape Coast, Tamale'},{name:'Food & Culinary Tourism',score:70,stage:'Seed',capital:'$1–2M',note:'Ghanaian cuisine resurgent; cultural premium'},{name:'Adventure & Nature Tourism',score:68,stage:'Seed',capital:'$1–2M',note:'Volta region; Kakum; underdeveloped natural assets'},{name:'Tourism Discovery & Booking',score:64,stage:'Early',capital:'$0.5–1M',note:'Digital infrastructure gap; mobile-first booking'},{name:'MICE — Meetings & Conferences',score:61,stage:'Early',capital:'$1–2M',note:'West Africa conference hub; ACC infrastructure'}],
    ventures:[
      {tier:1,name:'Heritage Tourism Experience Platform',desc:'Curated heritage experience packages for diaspora visitors — slave route, traditional festivals, cultural immersion.',mode:'Direct Op',capital:'$500K–1.5M',irr:'18–25%',risk:'LOW',payback:'3–5 yrs'},
      {tier:1,name:'Mid-Market Hotel Development',desc:'Purpose-built mid-market hotel (80–120 rooms) in Cape Coast or Kumasi targeting diaspora and business travellers.',mode:'Investment',capital:'$3–6M',irr:'14–20%',risk:'MEDIUM',payback:'7–10 yrs'},
      {tier:1,name:'Tour Operator Platform',desc:'Digital platform aggregating vetted Ghanaian tour operators — discovery, booking, reviews, diaspora-specific curation.',mode:'Investment',capital:'$300–800K',irr:'20–28%',risk:'LOW',payback:'3–4 yrs'},
      {tier:1,name:'Culinary Tourism Experience',desc:'Ghana food tours, cooking classes, and culinary experiences. Premium segment with high diaspora demand.',mode:'Direct Op',capital:'$200–500K',irr:'22–30%',risk:'LOW',payback:'2–3 yrs'},
      {tier:2,name:'Heritage Site Infrastructure Fund',desc:'Co-investment fund improving access infrastructure, visitor facilities, and digital interpretation at 10 heritage sites.',mode:'Partnership',capital:'$1–3M',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:2,name:'Hospitality Training Academy',desc:'Professional hospitality training addressing service quality gap — the primary driver of visitor disappointment.',mode:'Partnership',capital:'$500K–1M',irr:'Break-even',risk:'LOW',payback:'N/A'},
      {tier:2,name:'Eco-Lodge Development',desc:'Eco-lodge network in Volta Region, Brong-Ahafo, and North — capitalising on underdeveloped natural assets.',mode:'Investment',capital:'$1–3M',irr:'14–20%',risk:'MEDIUM',payback:'6–8 yrs'},
      {tier:2,name:'MICE Conference Infrastructure',desc:'Meeting and conference facilities upgrade in Accra — supporting West Africa conference hub ambition.',mode:'Partnership',capital:'$500K–2M',irr:'14–18%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:3,name:'Diaspora Homecoming Annual Festival',desc:'Annual structured diaspora homecoming event providing reliable demand anchor for tourism industry.',mode:'Direct Op',capital:'$500K–1M',irr:'Break-even',risk:'MEDIUM',payback:'N/A'},
      {tier:3,name:'Adventure Tourism Infrastructure',desc:'Canopy walks, river activities, and hiking infrastructure in underdeveloped natural areas.',mode:'Investment',capital:'$500K–1.5M',irr:'15–22%',risk:'MEDIUM',payback:'5–7 yrs'},
    ],
    timeline:{
      phase1:'Heritage Tourism Platform; Tour Operator Platform; Culinary Tourism Experience; Mid-Market Hotel (scoping and design)',
      phase2:'Heritage Site Infrastructure Fund; Hospitality Training Academy; Eco-Lodge development (Volta Region); MICE infrastructure',
      phase3:'Diaspora Homecoming Festival; Adventure Tourism Infrastructure; Secondary city hotel development; Regional (ECOWAS) expansion',
    },
    synergies:[{sector:'07 Sports & Creative',link:'Cultural performances and creative experiences as tourism product'},{sector:'01 Infrastructure',link:'Heritage site road access and utilities unlock visitor viability'},{sector:'08 Housing',link:'Eco-lodge and boutique hotel overlaps with hospitality real estate'},{sector:'09 Transport',link:'Tourist mobility infrastructure; airport-to-site connectivity'}],
    thesis:'Tourism is a Growth tier sector where BRIDGE\'s specific competitive advantage is clearest: the diaspora network. No competitor in Ghana\'s tourism landscape has the same direct access to the diaspora communities who represent the highest-yield segment.',
    thesis2:'Preferred investment architecture is asset-light: digital platforms, tour operator infrastructure, experience design, and management services rather than hotel property ownership.',
    deploy:[{l:'Ticket size',v:'$250K–$3M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Model preference',v:'Asset-light; experience-first'},{l:'Diaspora activation',v:'Built into investment thesis'},{l:'Exit horizon',v:'6–10 years'},{l:'Co-investment',v:'IFC; AfDB tourism facilities'}],
    risks:[{r:'Seasonality — wet/dry concentration',sev:'Medium',mit:'Year-round experience design; diaspora travel less seasonal'},{r:'Security perception risk (regional Sahel spillover)',sev:'Medium',mit:'Ghana stable; communications and targeted messaging'},{r:'Quality consistency across hospitality supply chain',sev:'High',mit:'Hospitality training investment; standard-setting'},{r:'Over-dependence on diaspora segment',sev:'Low',mit:'Segment diversification (eco, MICE, cultural)'},{r:'Infrastructure gaps at heritage sites',sev:'Medium',mit:'Sector 01 coordination; off-grid design standards'}],
  },
  {
    id:10,num:'10',name:'Energy & Renewable Resources',shortName:'Energy',
    tier:'Emerging',score:74,capital:'$12–18M',edition:'March 2026 Edition',
    tagline:'Ghana has 260+ sunny days per year, a functioning utility, and a government committed to renewable transition. The energy opportunity is not about potential — it is about execution speed.',
    stats:[{l:'Solar Potential',v:'4–6 kWh/m²/day'},{l:'Rural Electrification',v:'~56%'},{l:'Renewable Share',v:'2.4%'},{l:'Industrial Power Cost',v:'High vs. regional'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:72},{d:'Development Impact',w:'30%',s:82},{d:'Implementation Feasibility',w:'25%',s:70},{d:'Financial Sustainability',w:'15%',s:68}],
    snapshot:[{l:'Tier',v:'Emerging'},{l:'Score',v:'74/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$12–18M'},{l:'Timeline',v:'18–36 months'},{l:'Ventures Assessed',v:'16'}],
    summary:'Ghana\'s energy sector sits at the intersection of government commitment to renewable expansion, a rural electrification gap, and an industrial sector paying some of the highest power costs in the sub-region.',
    summary2:'The solar opportunity is straightforward in physics and complex in execution. The resource endowment is strong. The challenges are tariff structures, ECG off-take risk, grid stability, and financing for distributed generation.',
    summary3:'BRIDGE\'s energy mandate targets three distinct segments: utility-scale solar for industrial offtakers; mini-grid and off-grid systems for rural communities; and energy efficiency for commercial buildings.',
    quote:'"Ghana\'s energy future is distributed, solar-powered, and bankable. The gap between that future and today is not technology or resource — it is patient capital and capable implementation."',
    subs:[{name:'Solar Power (Commercial & Industrial)',score:82,stage:'Active',capital:'$4–8M',note:'260+ sunny days; industrial offtaker structures'},{name:'Off-Grid & Mini-Grid Systems',score:80,stage:'Seed–A',capital:'$3–5M',note:'Northern Ghana gap; productive use focus'},{name:'Industrial Power Reliability',score:76,stage:'Seed–A',capital:'$2–4M',note:'Load-shedding cost to industry; cost reduction'},{name:'Clean Cooking Solutions',score:72,stage:'Seed',capital:'$1–3M',note:'LPG transition; deforestation reduction'},{name:'Energy Efficiency Technology',score:70,stage:'Seed',capital:'$1–2M',note:'Commercial buildings; 20–40% savings potential'},{name:'Battery Storage & Microgrid',score:68,stage:'Early',capital:'$1–2M',note:'Resilience infrastructure; falling cost curve'}],
    ventures:[
      {tier:1,name:'Commercial & Industrial Solar',desc:'Behind-the-meter solar PV installations for industrial and commercial facilities. Private offtaker agreements avoiding ECG risk.',mode:'Direct Op',capital:'$3–8M',irr:'18–25%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:1,name:'Market Solar Infrastructure',desc:'Solar power for BRIDGE market infrastructure sites — micro-grids serving 10,000+ traders at zero grid dependency.',mode:'Direct Op',capital:'$500K–2M',irr:'20–30%',risk:'LOW',payback:'3–4 yrs'},
      {tier:1,name:'Northern Ghana Mini-Grid Programme',desc:'Mini-grid systems for off-grid communities in Upper East, Upper West, and Northern regions. Productive use focus.',mode:'Partnership',capital:'$2–5M',irr:'12–18%',risk:'MEDIUM',payback:'7–10 yrs'},
      {tier:1,name:'Clean Cooking LPG Transition',desc:'LPG distribution infrastructure and subsidised cylinder programme reducing biomass dependence and deforestation.',mode:'Partnership',capital:'$500K–2M',irr:'12–16%',risk:'LOW',payback:'4–6 yrs'},
      {tier:2,name:'Energy Efficiency Platform',desc:'Energy audit, equipment upgrade financing, and monitoring platform for commercial buildings. 20–40% cost reduction.',mode:'Investment',capital:'$500K–1.5M',irr:'18–25%',risk:'LOW',payback:'3–5 yrs'},
      {tier:2,name:'Battery Storage Pilot',desc:'Grid-scale and community battery storage addressing intermittency. Falling cost curve creating investment window.',mode:'Investment',capital:'$1–3M',irr:'14–20%',risk:'MEDIUM',payback:'6–8 yrs'},
      {tier:2,name:'Solar for Healthcare Facilities',desc:'Reliable solar power for CHPS compounds and district hospitals — directly enabling Sector 03 health investments.',mode:'Partnership',capital:'$500K–1.5M',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:2,name:'Agri-Energy Integration',desc:'Solar-powered irrigation, processing, and cold chain energy for agricultural value chain partners.',mode:'Partnership',capital:'$1–3M',irr:'12–18%',risk:'MEDIUM',payback:'5–8 yrs'},
      {tier:3,name:'Utility-Scale Solar Development',desc:'Grid-connected utility-scale solar project. Government Power Purchase Agreement required. High regulatory risk.',mode:'Investment',capital:'$5–15M',irr:'14–18%',risk:'HIGH',payback:'10–15 yrs'},
      {tier:3,name:'Wind & Hydro Feasibility',desc:'Feasibility studies for small hydro and coastal wind opportunities. Long development runway.',mode:'Guidance',capital:'$200–500K',irr:'N/A',risk:'HIGH',payback:'N/A'},
    ],
    timeline:{
      phase1:'Commercial & Industrial Solar (5 anchor clients); Market Solar Infrastructure (Kejetia pilot); Clean Cooking LPG Transition; Northern Ghana mini-grid scoping',
      phase2:'Mini-Grid Programme (10 communities); Energy Efficiency Platform; Battery Storage Pilot; Solar for Healthcare integration',
      phase3:'Utility-Scale Solar Development; Agri-Energy Integration at scale; Wind & Hydro feasibility; National energy access data platform',
    },
    synergies:[{sector:'01 Infrastructure',link:'Market micro-grids co-deployed with infrastructure platforms'},{sector:'06 Agriculture',link:'Solar-powered cold chain and irrigation for agricultural value chain'},{sector:'03 Health',link:'Reliable power for CHPS compounds and health facilities'},{sector:'11 Manufacturing',link:'Industrial power cost reduction directly improves manufacturing competitiveness'}],
    thesis:'Energy is Emerging tier because execution complexity — regulatory uncertainty, ECG risk, long development timelines — creates genuine friction. The sequencing is: mini-grid first (avoids ECG risk), commercial solar second, utility-scale last.',
    thesis2:'The productive use angle is critical. Energy infrastructure that powers agricultural processing, cold storage, and health facilities creates impact that pure electricity access cannot.',
    deploy:[{l:'Ticket size',v:'$1M–$6M per project'},{l:'Stage',v:'Development through construction'},{l:'Offtaker',v:'Private sector preferred'},{l:'Project finance',v:'DFI co-lending actively sought'},{l:'Exit horizon',v:'10–15 years; refinancing'},{l:'Local partnership',v:'Required for permitting'}],
    risks:[{r:'ECG offtake risk and tariff structure uncertainty',sev:'High',mit:'Private sector offtaker first; ECG as secondary'},{r:'Local content requirements increasing project cost',sev:'Medium',mit:'Local procurement integration; partner equity'},{r:'Grid instability limiting distributed generation',sev:'Medium',mit:'Behind-the-meter design; battery storage integration'},{r:'Subsidised fossil fuel competition',sev:'Medium',mit:'Advocacy for subsidy reform; total cost of ownership modelling'},{r:'Long development timelines for permitting and EIA',sev:'High',mit:'Pipeline development capability; regulatory relationships'}],
  },
  {
    id:11,num:'11',name:'Manufacturing & Light Industry',shortName:'Manufacturing',
    tier:'Growth',score:65,capital:'$10–15M',edition:'March 2026 Edition',
    tagline:'Ghana imports what it can make. The 1D1F policy direction is right. The capital structure, technology transfer, and market linkages to make it viable at scale are where BRIDGE operates.',
    stats:[{l:'Manufacturing GDP Share',v:'~11%'},{l:'Import Bill (Manuf.)',v:'$6B+ annually'},{l:'1D1F Factories',v:'88+ operational'},{l:'AGOA Access',v:'Active'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:66},{d:'Development Impact',w:'30%',s:70},{d:'Implementation Feasibility',w:'25%',s:62},{d:'Financial Sustainability',w:'15%',s:56}],
    snapshot:[{l:'Tier',v:'Growth'},{l:'Score',v:'65/100'},{l:'Priority',v:'Monitor & develop'},{l:'Capital',v:'$10–15M'},{l:'Timeline',v:'24–48 months'},{l:'Ventures Assessed',v:'14'}],
    summary:'Ghana imports over $6 billion annually in manufactured goods it has the raw materials, labour, and market to produce domestically. The 1D1F initiative has 88+ factories operational. The gap is execution infrastructure.',
    summary2:'Working capital for manufacturing cash flow cycles, technology transfer partnerships, and market linkage programmes connecting Ghanaian manufacturers to regional and international buyers.',
    summary3:'AGOA preferential access to the United States remains significantly underutilised by Ghana\'s garment sector — a structural advantage that BRIDGE\'s manufacturing investments are designed to activate.',
    quote:'"Ghana imports what it can make. Every avoidable import is a missed job, a missed income, and a missed link in the domestic value chain."',
    subs:[{name:'Food & Beverage Processing',score:74,stage:'Seed–A',capital:'$2–4M',note:'Import substitution; local raw material utilisation'},{name:'Garment & Textile Production',score:70,stage:'Seed–A',capital:'$2–3M',note:'AGOA access; NTCDB support; Akosombo base'},{name:'Metal Fabrication & Construction',score:68,stage:'Seed',capital:'$1–3M',note:'Construction demand; reducing steel import dependency'},{name:'Plastics & Packaging',score:65,stage:'Seed',capital:'$1–2M',note:'Consumer goods demand; recycled plastics opportunity'},{name:'Pharmaceutical Manufacturing',score:62,stage:'Early–Seed',capital:'$2–4M',note:'NHIS procurement market; import dependency reduction'},{name:'Furniture & Wood Products',score:60,stage:'Early',capital:'$1–2M',note:'Timber resource base; skilled artisan workforce'}],
    ventures:[
      {tier:1,name:'Agro-Processing Hub',desc:'Multi-crop processing facility — tomato paste, cassava flour, groundnut oil. Anchors agricultural value chain.',mode:'Direct Op',capital:'$2–3.5M',irr:'18–25%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:1,name:'Shea Value Addition',desc:'Refined shea butter and shea-based personal care product manufacturing for export to EU and US markets.',mode:'Partnership',capital:'$1.5–2.5M',irr:'20–28%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:1,name:'Packaged Foods Company',desc:'Branded packaged foods business using Ghanaian raw materials — targeting domestic and diaspora retail market.',mode:'Direct Op',capital:'$1.5–2M',irr:'18–25%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:1,name:'Manufacturing Skills Academy',desc:'Technical training centre providing skilled operators for 1D1F factories and manufacturing SMEs.',mode:'Partnership',capital:'$1–1.5M',irr:'Break-even',risk:'LOW',payback:'N/A'},
      {tier:1,name:'Building Materials Manufacturing',desc:'Compressed earth block, roofing tile, and construction materials production — reducing import dependency.',mode:'Partnership',capital:'$2–3M',irr:'15–22%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:1,name:'Quality Certification Services',desc:'ISO and export quality certification support for Ghanaian manufacturers — prerequisite for international market access.',mode:'Guidance',capital:'$500K–1M',irr:'Fee-based',risk:'LOW',payback:'2–3 yrs'},
      {tier:2,name:'Garment & Textile Plant',desc:'AGOA-compliant garment production facility. Akosombo Textiles base as anchor. Export to US market.',mode:'Investment',capital:'$2–3M',irr:'15–22%',risk:'HIGH',payback:'6–9 yrs'},
      {tier:2,name:'Pharmaceutical Expansion',desc:'Co-investment in existing pharmaceutical manufacturer expanding local production of essential medicines for NHIS.',mode:'Investment',capital:'$1.5–2.5M',irr:'15–20%',risk:'MEDIUM',payback:'6–8 yrs'},
      {tier:2,name:'Personal Care Products',desc:'Ghana-origin personal care — shea, coconut, and natural ingredient-based products. Diaspora and export market.',mode:'Investment',capital:'$1–2M',irr:'20–28%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:2,name:'Supply Chain Finance Platform',desc:'Purchase order and invoice financing for manufacturing SMEs with confirmed orders but limited working capital.',mode:'Partnership',capital:'$1–2M',irr:'15–22%',risk:'MEDIUM',payback:'4–5 yrs'},
      {tier:3,name:'Industrial Park Development',desc:'Managed industrial park providing affordable, serviced factory units for SME manufacturers.',mode:'Partnership',capital:'$2–4M',irr:'12–18%',risk:'HIGH',payback:'8–12 yrs'},
      {tier:3,name:'Regional Export Platform',desc:'Market access and logistics platform connecting Ghanaian manufacturers to ECOWAS and AfCFTA markets.',mode:'Guidance',capital:'$500K–1M',irr:'N/A',risk:'MEDIUM',payback:'N/A'},
    ],
    timeline:{
      phase1:'Agro-Processing Hub; Shea Value Addition; Manufacturing Skills Academy; Quality Certification Services; Building Materials pilot',
      phase2:'Packaged Foods Company; Garment & Textile Plant; Pharmaceutical Expansion; Supply Chain Finance Platform',
      phase3:'Industrial Park Development; Personal Care Products; Regional Export Platform; AGOA export acceleration',
    },
    synergies:[{sector:'06 Agriculture',link:'Agro-processing is downstream anchor for agricultural value chain'},{sector:'10 Energy',link:'Industrial power cost reduction directly enables manufacturing viability'},{sector:'05 Education',link:'Manufacturing Skills Academy overlaps with TVET investment'},{sector:'12 Transport',link:'Freight and logistics infrastructure required for manufactured goods'}],
    thesis:'Manufacturing is a Growth tier sector where BRIDGE\'s conviction is building toward Emerging. Food processing is the highest-priority sub-sector — connecting directly to the Agriculture value chain and requiring less capital intensity than heavy manufacturing.',
    thesis2:'BRIDGE\'s food processing investments are explicitly designed to be the downstream anchor for upstream agriculture investments — compounding impact and return across two sectors simultaneously.',
    deploy:[{l:'Ticket size',v:'$500K–$3M per venture'},{l:'Stage',v:'Seed through active production'},{l:'Sector linkage',v:'Agri upstream required'},{l:'AGOA pathway',v:'Garment sector priority'},{l:'Exit horizon',v:'7–12 years; strategic'},{l:'Co-investment',v:'IFC; DEG; FMO manufacturing funds'}],
    risks:[{r:'Power cost and reliability undermining competitiveness',sev:'High',mit:'Sector 10 coordination; on-site solar for industrial'},{r:'Working capital constraints with long cycles',sev:'High',mit:'Supply chain finance; purchase order financing'},{r:'Competition from cheaper Asian manufactured imports',sev:'High',mit:'Focus on sectors with natural protections (perishables, logistics cost)'},{r:'Skills gap in technical manufacturing workforce',sev:'Medium',mit:'TVET partnership; on-the-job training in portfolio companies'},{r:'1D1F policy continuity risk across elections',sev:'Medium',mit:'Private sector-only structures independent of policy'}],
  },
  {
    id:12,num:'12',name:'Transportation & Logistics',shortName:'Transportation',
    tier:'Emerging',score:71,capital:'$8–12M',edition:'March 2026 Edition',
    tagline:'E-commerce is growing at 20%+. Agricultural produce is rotting in transit. Ghana\'s logistics cost premium is among the highest in West Africa. This is an engineering problem — and engineering problems have solutions.',
    stats:[{l:'Logistics Cost Premium',v:'15–20%'},{l:'E-commerce Growth',v:'20%+ YoY'},{l:'Truck Fleet Avg. Age',v:'18 years'},{l:'Tema Clearance',v:'7–14 days'}],
    scoreDims:[{d:'Market Opportunity',w:'30%',s:72},{d:'Development Impact',w:'30%',s:74},{d:'Implementation Feasibility',w:'25%',s:70},{d:'Financial Sustainability',w:'15%',s:62}],
    snapshot:[{l:'Tier',v:'Emerging'},{l:'Score',v:'71/100'},{l:'Priority',v:'Active pipeline'},{l:'Capital',v:'$8–12M'},{l:'Timeline',v:'18–36 months'},{l:'Ventures Assessed',v:'15'}],
    summary:'Ghana\'s logistics sector adds 15–20% to the cost of almost every physical good — through inefficient port clearance, an ageing truck fleet, and limited last-mile infrastructure. Whoever solves these creates structural competitive advantage.',
    summary2:'E-commerce growing at 20%+ annually is suppressed by unreliable delivery. A last-mile logistics company solving the Accra delivery problem is not just a logistics business — it is the backbone for Ghana\'s entire digital commerce economy.',
    summary3:'BRIDGE\'s logistics mandate operates across three layers: last-mile delivery for urban e-commerce, cold chain for agricultural export, and port efficiency for trade facilitation. Each layer is commercially viable independently; together, they compound across the portfolio.',
    quote:'"Every sector in BRIDGE\'s portfolio has a logistics dependency. When we invest in transportation infrastructure, we are investing in the performance ceiling of the entire portfolio."',
    subs:[{name:'Last-Mile Delivery & Urban Logistics',score:80,stage:'Seed–A',capital:'$3–5M',note:'E-commerce growth; Accra congestion; 20%+ annual'},{name:'Cold Chain Infrastructure',score:78,stage:'Seed–A',capital:'$2–4M',note:'Agri cross-sector; export readiness; $1.9B addressable'},{name:'Intercity Freight Networks',score:76,stage:'Seed–A',capital:'$2–4M',note:'Northern corridor; mining & agriculture supply chains'},{name:'Freight & Port Logistics Tech',score:72,stage:'Seed–A',capital:'$2–4M',note:'Tema clearance 7–14 days vs. 2–3 day benchmark'},{name:'Urban Mobility Platforms',score:71,stage:'Seed',capital:'$1–3M',note:'Accra congestion; BRTS; shared mobility'},{name:'Driver Training & Fleet Management',score:64,stage:'Early',capital:'$0.5–1M',note:'Road safety; fleet efficiency; insurance reduction'}],
    ventures:[
      {tier:1,name:'Last-Mile Delivery Platform',desc:'Motorbike and cargo-bike last-mile delivery platform for Accra and Kumasi. E-commerce and food delivery anchor clients.',mode:'Investment',capital:'$2–4M',irr:'20–28%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:1,name:'Agricultural Cold Chain Network',desc:'Refrigerated truck fleet and cold storage hub network connecting farming regions to urban markets and export points.',mode:'Direct Op',capital:'$2–5M',irr:'15–22%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:1,name:'Port Clearance Technology',desc:'Digital platform reducing Tema port clearance from 7–14 days to 2–3 days through document automation and process integration.',mode:'Investment',capital:'$1–2.5M',irr:'22–30%',risk:'MEDIUM',payback:'3–5 yrs'},
      {tier:1,name:'Fleet Management Platform',desc:'GPS tracking, maintenance scheduling, and driver behaviour platform for commercial truck operators.',mode:'Investment',capital:'$500K–1.5M',irr:'18–25%',risk:'LOW',payback:'3–4 yrs'},
      {tier:1,name:'Driver Training Programme',desc:'Professional driver training and certification programme reducing road accidents and improving fleet efficiency.',mode:'Partnership',capital:'$200–500K',irr:'Social Return',risk:'LOW',payback:'N/A'},
      {tier:2,name:'Intercity Freight Network',desc:'Dedicated freight corridor from Accra-Tema to Kumasi and Northern Ghana. Hub-and-spoke distribution model.',mode:'Investment',capital:'$2–5M',irr:'15–22%',risk:'MEDIUM',payback:'6–8 yrs'},
      {tier:2,name:'Ride-Sharing & Urban Mobility',desc:'Shared mobility platform addressing Accra congestion — connecting with BRTS infrastructure investment.',mode:'Investment',capital:'$1–3M',irr:'18–25%',risk:'MEDIUM',payback:'4–6 yrs'},
      {tier:2,name:'Logistics Finance Platform',desc:'Asset financing and working capital for logistics operators — truck leasing, fuel advances, insurance.',mode:'Partnership',capital:'$500K–2M',irr:'15–22%',risk:'MEDIUM',payback:'4–5 yrs'},
      {tier:2,name:'E-Commerce Infrastructure Hub',desc:'Warehousing, fulfilment, and returns management infrastructure serving Ghana\'s growing e-commerce sector.',mode:'Direct Op',capital:'$1–3M',irr:'16–22%',risk:'MEDIUM',payback:'5–7 yrs'},
      {tier:3,name:'Drone Delivery Network',desc:'Unmanned aerial vehicle delivery for medical supplies and high-value cargo in off-road communities.',mode:'Investment',capital:'$1–3M',irr:'Variable',risk:'HIGH',payback:'8–12 yrs'},
      {tier:3,name:'Rail & Heavy Freight',desc:'Participation in Ghana rail corridor development — heavy freight from Tema to Kumasi and beyond.',mode:'Partnership',capital:'$2–5M',irr:'10–15%',risk:'HIGH',payback:'15–20 yrs'},
    ],
    timeline:{
      phase1:'Last-Mile Delivery Platform (Accra, Kumasi); Cold Chain Network Phase 1 (5 hubs); Port Clearance Technology; Fleet Management Platform',
      phase2:'Intercity Freight Network; E-Commerce Infrastructure Hub; Logistics Finance Platform; Ride-Sharing platform',
      phase3:'Drone Delivery Network (medical supplies); Rail & Heavy Freight; Northern corridor expansion; Pan-ECOWAS freight integration',
    },
    synergies:[{sector:'06 Agriculture',link:'Cold chain is the primary post-harvest loss reduction mechanism'},{sector:'04 Technology',link:'E-commerce infrastructure backbone; logistics tech platforms'},{sector:'11 Manufacturing',link:'Freight networks required for manufacturing input and output'},{sector:'01 Infrastructure',link:'Port efficiency and road connectivity are infrastructure investments'}],
    thesis:'Transportation is Emerging tier with direct leverage on five of BRIDGE\'s twelve sectors. A dollar deployed in logistics infrastructure creates outsized returns across the portfolio.',
    thesis2:'Cold chain sub-sector is BRIDGE\'s highest-conviction logistics investment — directly addressing $1.9B agricultural post-harvest loss and compounding returns across two Core sectors simultaneously.',
    deploy:[{l:'Ticket size',v:'$500K–$3M per venture'},{l:'Stage',v:'Seed through Series A'},{l:'Cross-sector linkage',v:'Agriculture cold chain priority'},{l:'Tema port focus',v:'Clearance time reduction'},{l:'Exit horizon',v:'6–10 years; strategic'},{l:'Co-investment',v:'AfDB transport facility; DFIs'}],
    risks:[{r:'Accra congestion limiting last-mile unit economics',sev:'High',mit:'Motorbike and cargo-bike deployment; time-window optimisation'},{r:'Fuel cost volatility and subsidy removal',sev:'High',mit:'EV fleet transition; fixed-price fuel contracts'},{r:'Regulatory fragmentation across GRA, DVLA, GPA, MoT',sev:'Medium',mit:'BRIDGE government partnership framework; regulatory mapping'},{r:'Competition from regional players (DHL, Aramex, Jumia)',sev:'Medium',mit:'Ghana-specific last-mile and rural focus as differentiation'},{r:'Infrastructure gaps in peri-urban and rural roads',sev:'High',mit:'Sector 01 coordination; route optimisation'}],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED LAYOUT COMPONENTS
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
        <div style={{overflow:'hidden',maxWidth:past?'200px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <Logo height={20} variant="dark"/>
          <div style={{width:'1px',height:'16px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>Sector Brief · {sector.name} · {sector.tier} Tier · Full Edition</span>
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.positive,letterSpacing:'1px'}}>✓ Members Access</span>
        <a href="#notify" style={{background:C.forest,color:C.lime,padding:'8px 16px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',whiteSpace:'nowrap'}}>Notify Me — Full Version</a>
      </div>
    </div>
  );
};

const Navigator=({active,onSelect})=>(
  <div className="np pad-nav" style={{background:C.ink,padding:'10px 40px',borderBottom:`1px solid rgba(255,255,255,0.06)`,position:'sticky',top:'48px',zIndex:99,overflowX:'auto',whiteSpace:'nowrap'}}>
    <div style={{display:'flex',gap:'4px',minWidth:'max-content'}}>
      {SECTORS.map(s=>(
        <button key={s.id} onClick={()=>onSelect(s.id)} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',padding:'5px 10px',background:active===s.id?C.lime:'transparent',color:active===s.id?C.ink:'rgba(255,255,255,0.35)',border:`1px solid ${active===s.id?C.lime:'rgba(255,255,255,0.1)'}`,cursor:'pointer',borderRadius:'2px',transition:'all 0.15s ease',whiteSpace:'nowrap'}}>
          {s.num} {s.shortName}
        </button>
      ))}
    </div>
  </div>
);

const Cover=({sector,logoRef})=>(
  <div>
    <div className="pad-cover" style={{background:C.ink,padding:'24px 64px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'64px',top:'16px',fontFamily:F.mono,fontSize:'120px',fontWeight:500,color:'rgba(255,255,255,0.025)',lineHeight:1,userSelect:'none',pointerEvents:'none'}}>{sector.num}</div>
      <div ref={logoRef} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <Logo height={26} variant="white"/>
          <div style={{width:'1px',height:'20px',background:'rgba(255,255,255,0.15)'}}/>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',color:'rgba(255,255,255,0.35)',textTransform:'uppercase'}}>Sector Intelligence Brief · Full Edition</span>
        </div>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'2px',textTransform:'uppercase',border:`1px solid rgba(184,217,53,0.35)`,padding:'3px 10px'}}>Members</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'18px'}}>
        <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'4px 10px',letterSpacing:'1px'}}>SECTOR {sector.num}</div>
        <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.08)'}}/>
        <span style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.25)'}}>{sector.edition}</span>
      </div>
      <h1 style={{fontFamily:F.display,fontSize:'clamp(32px,5.5vw,68px)',fontWeight:900,color:C.paper,lineHeight:1,letterSpacing:'-2px',marginBottom:'16px'}}>{sector.name}</h1>
      <div style={{fontFamily:F.body,fontSize:'15px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',lineHeight:1.6,maxWidth:'600px',marginBottom:'28px'}}>{sector.tagline}</div>
      <div style={{display:'flex',gap:'0',borderTop:`1px solid rgba(255,255,255,0.08)`}}>
        <div style={{background:'rgba(255,255,255,0.04)',padding:'18px 22px',minWidth:'170px',borderRight:`1px solid rgba(255,255,255,0.06)`}}>
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
      <div style={{height:'3px',background:`linear-gradient(90deg,${C.lime},transparent)`,marginTop:'0'}}/>
    </div>
  </div>
);

const Executive=({sector})=>(
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
          <div style={{background:C.forest,padding:'12px 16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px'}}>Score Breakdown</div>
            <div style={{fontFamily:F.mono,fontSize:'26px',color:C.paper}}>{sector.score} <span style={{fontSize:'11px',color:'rgba(250,248,243,0.4)'}}>/100</span></div>
          </div>
          {sector.scoreDims.map((dim,i)=>(
            <div key={i} style={{padding:'10px 14px',borderBottom:i<3?`1px solid ${C.border}`:'none'}}>
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

/* ═══════════════════════════════════════════════════════════════════════════
   FULL-VERSION EXCLUSIVE SECTIONS
═══════════════════════════════════════════════════════════════════════════ */

const ModeBadge=({m})=>{
  const mc=MODE_COLORS[m]||{bg:C.muted,text:C.white};
  return(<span style={{background:mc.bg,color:mc.text,fontFamily:F.mono,fontSize:'9px',fontWeight:700,padding:'2px 8px',letterSpacing:'1px',borderRadius:'2px',whiteSpace:'nowrap'}}>{m}</span>);
};

const VenturePipeline=({sector})=>{
  const[openTier,setOpenTier]=useState(1);
  const tiers=[1,2,3];
  const tierLabel={1:'Tier 1 — Priority Implementation (Years 1–3)',2:'Tier 2 — Medium-Term Development (Years 3–5)',3:'Tier 3 — Long-Term / Conditional (Year 5+)'};
  const tierSub={1:'Highest strategic fit; proven models; deploy immediately.',2:'Strong fit; requires Tier 1 foundation or more development.',3:'Significant capital or complexity; evaluate after Tier 1/2 success.'};
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  return(
    <div className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Full Venture Pipeline</div>
          <span style={{fontFamily:F.mono,fontSize:'10px',color:C.faint}}>{sector.ventures.length} ventures assessed</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,26px)',fontWeight:700,color:C.ink,marginBottom:'28px'}}>Complete pipeline database — all tiers</h2>
        {tiers.map(t=>{
          const vs=sector.ventures.filter(v=>v.tier===t);
          if(!vs.length) return null;
          const isOpen=openTier===t;
          const t1cap=vs.reduce((a,v)=>{
            const lo=parseFloat(v.capital.replace(/[^0-9.]/g,''))||0;
            return a+lo;
          },0);
          return(
            <div key={t} style={{marginBottom:'8px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
              <button onClick={()=>setOpenTier(isOpen?0:t)} style={{width:'100%',background:isOpen?C.forest:C.paper,padding:'14px 20px',border:'none',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center',transition:'background 0.2s'}}>
                <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <div style={{width:'10px',height:'10px',borderRadius:'50%',background:isOpen?C.lime:tierColor[t],flexShrink:0}}/>
                  <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:isOpen?C.paper:C.ink}}>{tierLabel[t]}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <span style={{fontFamily:F.mono,fontSize:'10px',color:isOpen?'rgba(250,248,243,0.5)':C.faint}}>{vs.length} ventures</span>
                  <span style={{fontFamily:F.mono,fontSize:'14px',color:isOpen?C.lime:C.muted}}>{isOpen?'▲':'▼'}</span>
                </div>
              </button>
              {isOpen&&(
                <div style={{background:C.paper}}>
                  <div style={{padding:'10px 20px',background:C.paperDark,fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{tierSub[t]}</div>
                  <div style={{overflowX:'auto'}}>
                    <table style={{width:'100%',borderCollapse:'collapse',minWidth:'700px'}}>
                      <thead>
                        <tr style={{borderBottom:`2px solid ${C.ink}`}}>
                          {['Venture','Description','Mode','Capital','Return / IRR','Risk','Payback'].map((h,i)=>(
                            <td key={i} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,padding:'8px 12px'}}>{h}</td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {vs.map((v,i)=>(
                          <tr key={i} style={{borderBottom:`1px solid ${C.border}`,background:i%2===0?C.paper:C.paperDark}}>
                            <td style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,padding:'10px 12px',minWidth:'160px'}}>{v.name}</td>
                            <td style={{fontFamily:F.body,fontSize:'11px',color:C.muted,padding:'10px 12px',minWidth:'200px',lineHeight:1.5,fontStyle:'italic'}}>{v.desc}</td>
                            <td style={{padding:'10px 12px',minWidth:'90px'}}><ModeBadge m={v.mode}/></td>
                            <td style={{fontFamily:F.mono,fontSize:'11px',color:C.forest,padding:'10px 12px',whiteSpace:'nowrap'}}>{v.capital}</td>
                            <td style={{fontFamily:F.mono,fontSize:'11px',color:v.irr==='Break-even'||v.irr==='Social Return'||v.irr==='N/A'||v.irr==='Commission'||v.irr==='Bundled'?C.faint:C.positive,padding:'10px 12px',whiteSpace:'nowrap'}}>{v.irr}</td>
                            <td style={{padding:'10px 12px'}}><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[v.risk]||C.muted,letterSpacing:'1px'}}>{v.risk}</span></td>
                            <td style={{fontFamily:F.mono,fontSize:'11px',color:C.muted,padding:'10px 12px',whiteSpace:'nowrap'}}>{v.payback}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div style={{marginTop:'10px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint}}>Mode key: Direct Op = BRIDGE operates directly · Partnership = co-delivery · Investment = equity stake · Guidance = advisory/technical · Network = ecosystem activation</div>
      </div>
    </div>
  );
};

const DeploymentTimeline=({sector})=>(
  <div className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Deployment Timeline</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,26px)',fontWeight:700,color:C.ink,marginBottom:'28px'}}>Phased capital deployment — {sector.capital} total</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0',border:`1px solid ${C.border}`,overflow:'hidden'}} className="g3">
        {[{label:'Phase 1',sub:'Years 1–3',note:'Priority implementation',color:C.lime,bg:C.forest,txt:sector.timeline.phase1},
          {label:'Phase 2',sub:'Years 3–5',note:'Medium-term development',color:C.amber,bg:C.paperDark,txt:sector.timeline.phase2},
          {label:'Phase 3',sub:'Year 5+',note:'Long-term / conditional',color:C.muted,bg:C.paper,txt:sector.timeline.phase3}].map((p,i)=>(
          <div key={i} style={{borderRight:i<2?`1px solid ${C.border}`:'none'}}>
            <div style={{background:p.bg,padding:'14px 18px',borderBottom:`3px solid ${p.color}`}}>
              <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:i===0?C.lime:i===1?C.amber:C.faint,letterSpacing:'1px',marginBottom:'2px'}}>{p.label}</div>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:i===0?C.paper:C.ink}}>{p.sub}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:i===0?'rgba(250,248,243,0.5)':C.faint}}>{p.note}</div>
            </div>
            <div style={{padding:'16px 18px'}}>
              <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.7}}>{p.txt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CrossSectorSynergy=({sector})=>(
  <div className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'24px'}}>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Cross-Sector Synergy Map</div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,26px)',fontWeight:700,color:C.ink}}>How Sector {sector.num} connects to the portfolio</h2>
        </div>
        <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'6px 14px',letterSpacing:'1px',flexShrink:0}}>{sector.synergies.length} links</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}} className="g3">
        {sector.synergies.map((syn,i)=>(
          <div key={i} style={{background:C.paper,border:`1px solid ${C.border}`,padding:'16px 20px',display:'flex',gap:'14px',alignItems:'flex-start'}}>
            <div style={{width:'36px',height:'36px',background:C.forest,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,borderRadius:'2px'}}>
              <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime}}>{syn.sector.substring(0,2)}</span>
            </div>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'4px'}}>{syn.sector}</div>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.5}}>{syn.link}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:'16px',background:C.forest,padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.6)'}}>The BRIDGE portfolio is designed as an integrated system. Every sector investment strengthens the others.</span>
        <a href="#" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.lime,textDecoration:'none',whiteSpace:'nowrap',marginLeft:'16px'}}>Full Synergy Map →</a>
      </div>
    </div>
  </div>
);

const RiskThesis=({sector})=>(
  <div className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
      <div>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'18px'}}>Risk Matrix</div>
        {sector.risks.map((r,i)=>(
          <div key={i} style={{paddingBottom:'12px',marginBottom:'12px',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
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

const MemberConfirm=({sector})=>(
  <div className="pad-section" style={{background:C.forest,padding:'32px 64px',borderTop:`3px solid ${C.lime}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
      <div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'6px'}}>Full Edition — Members Access Confirmed</div>
        <p style={{fontFamily:F.sans,fontSize:'13px',color:'rgba(250,248,243,0.55)'}}>You have complete access to all 12 Sector Intelligence Briefs. Use the navigator above to switch between sectors.</p>
      </div>
      <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
        <a href="#" style={{border:`1px solid rgba(255,255,255,0.2)`,color:C.paper,padding:'10px 18px',fontFamily:F.sans,fontSize:'11px',fontWeight:600,textDecoration:'none',borderRadius:'2px'}}>All 12 Sectors</a>
        <a href="#notify" style={{background:C.lime,color:C.ink,padding:'10px 20px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none'}}>Notify Me When Available</a>
      </div>
    </div>
  </div>
);

const NotifySection=()=>(
  <div id="notify" className="pad-section" style={{background:C.ink,padding:'48px 64px',borderTop:`1px solid rgba(255,255,255,0.06)`}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'center'}} className="tc">
      <div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Coming Soon</div>
        <h3 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,fontStyle:'italic',color:C.paper,lineHeight:1.2,marginBottom:'14px'}}>The full sector brief is in development.</h3>
        <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.45)',lineHeight:1.8,fontStyle:'italic'}}>Each sector's complete intelligence package — all venture models, deployment timelines, risk matrices, and operational playbooks — will be available to BRIDGE Members. Leave your email to be notified when it launches.</p>
      </div>
      <div style={{background:'rgba(255,255,255,0.04)',border:`1px solid rgba(255,255,255,0.08)`,padding:'28px'}}>
        <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:'rgba(250,248,243,0.4)',marginBottom:'16px'}}>Get notified when available</div>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          <input placeholder="your@email.com" style={{flex:1,minWidth:'180px',background:'rgba(255,255,255,0.06)',border:`1px solid rgba(255,255,255,0.12)`,padding:'10px 14px',fontFamily:F.sans,fontSize:'13px',color:C.paper,outline:'none'}}/>
          <button style={{background:C.lime,color:C.ink,border:'none',padding:'10px 20px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,cursor:'pointer',whiteSpace:'nowrap'}}>Notify Me</button>
        </div>
        <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.2)',marginTop:'10px'}}>BRIDGE Members receive early access and priority briefings.</div>
      </div>
    </div>
  </div>
);

const Footer=({sector})=>(
  <div className="pad-footer" style={{background:'#060e08',padding:'14px 64px',borderTop:`1px solid rgba(184,217,53,0.15)`}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={16} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.1)'}}/>
        <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.2)'}}>Sector {sector.num} of 12 · Full Edition · bridgepbc.com/intelligence</span>
      </div>
      <div style={{display:'flex',gap:'14px'}}>
        {['All Sectors','Dashboard','Contact','bridgepbc.com'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.2)',textDecoration:'none'}}>{l}</a>))}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════════════════════════════ */
export default function SectorBriefFull({sectorId=1}){
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const urlSector = urlParams?.get('sector') ? parseInt(urlParams.get('sector'), 10) : null;
  const initialSector = urlSector && urlSector >= 1 && urlSector <= 12 ? urlSector : sectorId;
  const[active,setActive]=useState(initialSector);
  const coverLogoRef=useRef(null);
  const sector=SECTORS.find(s=>s.id===active)||SECTORS[0];
  const handleSelect=(id)=>{setActive(id);window.scrollTo({top:0,behavior:'smooth'});};
  return(
    <div style={{fontFamily:F.body,background:C.paper}}>
      <Gf/>
      <TopBar sector={sector} coverLogoRef={coverLogoRef}/>
      <Navigator active={active} onSelect={handleSelect}/>
      <Cover sector={sector} logoRef={coverLogoRef}/>
      <Executive sector={sector}/>
      <VenturePipeline sector={sector}/>
      <DeploymentTimeline sector={sector}/>
      <CrossSectorSynergy sector={sector}/>
      <RiskThesis sector={sector}/>
      <MemberConfirm sector={sector}/>
      <NotifySection/>
      <Footer sector={sector}/>
    </div>
  );
}
