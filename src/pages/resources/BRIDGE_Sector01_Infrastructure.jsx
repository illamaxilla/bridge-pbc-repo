import { useState, useEffect, useRef } from "react";
import React from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BRIDGE SECTOR 01 — Infrastructure & Basic Services
   Full Members Edition · March 2026 · Standalone Document
═══════════════════════════════════════════════════════════════════════════ */

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF',teal:'#2E5A4D'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};
const RISK_COLOR={LOW:C.positive,MEDIUM:C.amber,HIGH:C.red,'LOW-MED':C.amber};
const MODE_BG={'Direct Op':C.forest,'Partnership':C.amber,'Investment':C.teal,'Guidance':C.paperDark,'Network':C.ink};
const MODE_TX={'Direct Op':C.lime,'Partnership':C.white,'Investment':C.paper,'Guidance':C.muted,'Network':'rgba(250,248,243,0.6)'};

/* ═══ SECTOR DATA ════════════════════════════════════════════════════════ */
const S={
  num:'01',name:'Infrastructure & Basic Services',shortName:'Infrastructure',tier:'Core',score:87,capital:'$8–15M',edition:'March 2026 Edition',
  tagline:'From Kejetia — West Africa\'s largest market — to the 7,653 Ghanaians dying annually from preventable WASH failures: the infrastructure deficit is a governance problem that transparent, accountable, asset-backed investment can solve.',
  stats:[{l:'Portfolio Range',v:'$8–15M'},{l:'Identified Ventures',v:'18'},{l:'Kejetia Vendors',v:'10,000+'},{l:'Big Push Budget',v:'GH₵30B'}],
  scoreDims:[{d:'Market Opportunity',w:'30%',s:90},{d:'Development Impact',w:'30%',s:92},{d:'Implementation Feasibility',w:'25%',s:82},{d:'Financial Sustainability',w:'15%',s:80}],
  snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'87/100'},{l:'Priority',v:'Immediate deployment'},{l:'Portfolio Range',v:'$8–15M'},{l:'Timeline',v:'2026–2030'},{l:'Ventures Identified',v:'18'}],
  summary:'Ghana\'s infrastructure deficit is not primarily a technical or financing problem — it is a governance and political economy problem. Patronage systems, rent-seeking intermediaries, and weak enforcement mechanisms perpetuate a status quo where 21 Ghanaians die every day from preventable WASH-related illness, 90% of solid waste goes uncollected, and the country\'s largest market operates on paper-based systems built decades ago.',
  summary2:'BRIDGE\'s infrastructure thesis begins with a single observation: solutions that compete for conventional infrastructure contracts will fail. The procurement systems are captured. The incentives are misaligned. BRIDGE creates asset-backed platforms that bundle service delivery with transparent governance, community accountability, and data-driven performance monitoring. The Kejetia Market Digital Platform is the proof of concept — a $17M direct operation at West Africa\'s largest single market.',
  summary3:'The 2026 budget\'s GH₵30B Big Push Infrastructure Programme and the Model Markets mandate allocating GH₵2.2B across 260+ districts create the government co-investment infrastructure that BRIDGE\'s approach has been waiting for. The policy validates BRIDGE\'s integrated service delivery model and creates a clear pathway from Kejetia flagship to national scale.',
  quote:'"Ghana\'s infrastructure crisis is not a financing problem — it is a governance problem. Solutions that ignore the patronage systems and weak enforcement mechanisms that perpetuate the status quo will fail regardless of capital availability."',

  subs:[
    {name:'Market Infrastructure & Digitisation',score:92,stage:'Active — Flagship',capital:'$3–8M',note:'Kejetia anchor; 10,000+ vendors; Model Markets mandate'},
    {name:'WASH Infrastructure',score:86,stage:'Series A Ready',capital:'$2–5M',note:'7,653 preventable deaths/yr; 95% donor dependency'},
    {name:'Energy & Power Infrastructure',score:84,stage:'Active',capital:'$1–4M',note:'ECG 32% system losses; solar micro-grid opportunity'},
    {name:'Solid Waste Management',score:80,stage:'Seed–A',capital:'$1–3M',note:'GH₵83B recyclable waste; 10% collection rate'},
    {name:'Roads & Connectivity',score:78,stage:'Seed–A',capital:'$1–2M',note:'49% maintained network; feeder road critical gap'},
    {name:'Smart Infrastructure & IoT',score:72,stage:'Early',capital:'$400K–800K',note:'Performance monitoring; predictive maintenance layer'},
  ],

  governance:[
    {c:'Procurement Capture',harm:'Infrastructure contracts captured by politically-connected intermediaries. BRIDGE\'s direct operation model removes procurement entirely — no tender, no capture.'},
    {c:'No Accountability Data',harm:'Without performance metrics, under-delivery goes undetected and unchallenged. IoT monitoring creates the transparency layer that procurement cannot.'},
    {c:'Funding Collapse',harm:'Government WASH financing collapsed from 27% to 5% share (2022–2024). 95% donor dependency creates fragility. Asset-backed operation de-risks project continuity.'},
    {c:'No Maintenance Model',harm:'Grey infrastructure built without operations budget. BRIDGE\'s service contract model includes maintenance — the missing piece in every conventional infrastructure project.'},
    {c:'Community Exclusion',harm:'Vendor and community voices absent from infrastructure design. BRIDGE\'s vendor-first platform creates community accountability that political interference cannot easily override.'},
    {c:'Scale Without Replication',harm:'One-off projects cannot transform systems. BRIDGE\'s standardised Kejetia model is designed for 260-district replication via the Model Markets mandate.'},
  ],

  washData:[
    {label:'Basic Water Access',current:87.7,target:100,note:'43-point gap to safely managed — where deaths occur'},
    {label:'Safely Managed Water',current:44.4,target:100,note:'Only 44.4% have truly safe water despite 87.7% basic access'},
    {label:'Basic Sanitation',current:25.3,target:100,note:'Adequate sanitation access — severe urban/rural divide'},
    {label:'Open Defecation-Free',current:77,target:100,note:'23% national rate; 72% in Northern Region'},
    {label:'Solid Waste Collected',current:10,target:100,note:'12,710 tonnes/day generated; 90% uncollected'},
  ],

  fundingCollapse:[
    {year:'2022',gov:27,donor:73},
    {year:'2023',gov:14,donor:86},
    {year:'2024',gov:5,donor:95},
  ],

  kejetiaPhases:[
    {phase:'Phase 1',label:'Foundation',vendors:1000,capital:5,timeline:'Q1–Q4 2026',focus:'Pilot 1,000 vendors. Core platform: inventory, mobile money, basic analytics.'},
    {phase:'Phase 2',label:'Expansion',vendors:5000,capital:8,timeline:'2027',focus:'5,000 vendors. Supply chain aggregation. Financial identity layer. Insurance products.'},
    {phase:'Phase 3',label:'Full Scale',vendors:10000,capital:17,timeline:'2028',focus:'10,000 vendors at 80%+ MAR. Platform sustainability via transaction revenue.'},
  ],

  ghanaVsSSA:[
    {dim:'Power Access',ghana:85,ssa:48,note:'Ghana leads — ECG system losses (32%) mask the reliability gap'},
    {dim:'Water Access',ghana:87.7,ssa:61,note:'Basic access strong; safely managed water only 44.4%'},
    {dim:'Sanitation',ghana:25.3,ssa:29,note:'Below SSA average — concentration of mortality risk'},
    {dim:'Solid Waste',ghana:10,ssa:14,note:'GH₵83B annual recyclable value uncaptured'},
    {dim:'Road Network Maintained',ghana:49,ssa:37,note:'Above average but feeder roads — critical for markets — are the gap'},
  ],

  budgetItems:[
    {item:'Big Push Infrastructure Programme',ghc:'GH₵30B',usd:'~US$2.1B',pct:100,mode:'Co-investment + service delivery',urgency:'2026–2028 deployment window',featured:true},
    {item:'Model Markets Mandate (DACF 25%)',ghc:'GH₵2.2B+',usd:'260+ districts',pct:52,mode:'Market digitisation partner',urgency:'Active now — Q1 2026 filing',featured:true},
    {item:'Connect24 — Roads',ghc:'GH₵4.3B',usd:'~US$310M',pct:38,mode:'PPP road maintenance integration',urgency:'2026–2028',featured:false},
    {item:'WASH Infrastructure',ghc:'GH₵800M+',usd:'Nationwide',pct:18,mode:'WASH hub co-financing',urgency:'Budget year 2026',featured:false},
    {item:'DACF Health Allocation (10%)',ghc:'260+ districts',usd:'Co-fund',pct:10,mode:'CHPS WASH + power bundling',urgency:'District assembly cycles',featured:false},
    {item:'DACF Education Allocation (10%)',ghc:'260+ districts',usd:'Co-fund',pct:10,mode:'School WASH + vocational infra',urgency:'District assembly cycles',featured:false},
  ],

  scalingStages:[
    {stage:'Stage 1',title:'Flagship Demo',period:'2026',scope:'Complete Kejetia Market Resilience Platform. Develop standardised specifications and governance frameworks suitable for replication.'},
    {stage:'Stage 2',title:'Regional Hubs',period:'2027–2028',scope:'Expand to 3–5 major markets: Makola, Asafo, Tamale Central, Takoradi. Train local teams. Establish management companies per market.'},
    {stage:'Stage 3',title:'National Scale',period:'2029+',scope:'Franchise model enabling district assemblies to deploy BRIDGE-designed market systems using DACF allocations. 260+ districts.'},
  ],

  ventures:[
    {tier:1,num:'①',name:'Kejetia Digital Markets Platform',desc:'West Africa\'s largest single market, 10,000+ vendors, $507M in government construction — and zero digital infrastructure. BRIDGE builds and operates the vendor-first digital platform: inventory management, mobile money integration, supplier ordering, business analytics, and an online marketplace. Three-phase deployment over 36 months. The proof of concept for everything that follows.',mode:'Direct Op',capital:'$17M over 3 yrs',irr:'15–20%',risk:'MEDIUM',payback:'5–7 yrs',start:'Q1 2026'},
    {tier:1,num:'②',name:'Market Resilience Platform',desc:'Comprehensive integrated services for markets beyond Kejetia — bundling power, water, sanitation, drainage, security, and fire safety under a single managed service contract. The replication template for the Model Markets mandate: any district assembly deploying DACF for market development gets this package.',mode:'Direct Op',capital:'$2–5M per market',irr:'18–22%',risk:'MEDIUM',payback:'4–6 yrs',start:'Q2 2026'},
    {tier:1,num:'③',name:'Market Solar Micro-Grid',desc:'Solar-plus-battery systems providing reliable power independent of the national grid — ECG\'s 32% system losses make grid reliability insufficient for market operations. The micro-grid is both a standalone revenue-generating venture (power sales to vendors) and enabling infrastructure for every other digital service on the platform.',mode:'Direct Op',capital:'$500K–2M',irr:'14–18%',risk:'MEDIUM',payback:'5–7 yrs',start:'Q2 2026'},
    {tier:1,num:'④',name:'Public Toilet Networks',desc:'Modern pay-per-use sanitation facilities at markets and transport hubs — addressing the sanitation crisis (25.3% adequate access nationally) and the immediate dignitary needs of 10,000+ vendors and hundreds of thousands of market customers daily. Revenue-generating from day one via usage fees. Lowest capital requirement in Tier 1.',mode:'Direct Op',capital:'$150–400K',irr:'20–25%',risk:'LOW',payback:'3–5 yrs',start:'Q2 2026'},
    {tier:1,num:'⑤',name:'Market Fire Safety Systems',desc:'Detection, suppression, and emergency response systems for markets where fire events regularly destroy vendor inventory with no insurance and no warning. A 2023 Kejetia fire caused GH₵50M+ in vendor losses. BRIDGE installs, maintains, and monitors fire safety infrastructure on a subscription basis.',mode:'Direct Op',capital:'$200–600K',irr:'16–22%',risk:'LOW',payback:'3–5 yrs',start:'Q3 2026'},
    {tier:1,num:'⑥',name:'Market Cold Storage Units',desc:'Solar-powered cold rooms for perishable goods traders — the market-level cold chain complement to BRIDGE\'s agricultural cold storage network. Reduces post-harvest losses for market vendors, extends product shelf life, enables temporal price arbitrage. Particularly impactful for women traders who dominate perishable goods vending.',mode:'Direct Op',capital:'$200–500K',irr:'14–18%',risk:'LOW',payback:'4–6 yrs',start:'Q3 2026'},
    {tier:1,num:'⑦',name:'Waste-to-Compost Venture',desc:'GH₵83B in annual recyclable waste potential sits uncollected across Ghana\'s markets and urban areas. BRIDGE co-invests in a waste collection and composting operation anchored by market waste streams from Kejetia — converting an existing cost into a revenue stream and integrating with BRIDGE\'s agricultural cooperative network.',mode:'Investment',capital:'$300–600K',irr:'8–12%',risk:'MEDIUM',payback:'5–7 yrs',start:'Q4 2026'},
    {tier:2,num:'⑧',name:'Neighbourhood WASH Hubs',desc:'Clustered WASH, power, and digital services co-located around schools and clinics. Addresses peri-urban service gaps while building on BRIDGE market infrastructure credibility. DACF health and water allocations (10% each) provide co-financing pathway.',mode:'Partnership',capital:'$150–400K each',irr:'12–15%',risk:'LOW',payback:'5–7 yrs',start:'2027'},
    {tier:2,num:'⑨',name:'Community Water Kiosk Network',desc:'IoT-enabled prepaid water dispensing in underserved communities. Data-driven maintenance scheduling reduces downtime and operating costs. Mobile money integration via Financial Inclusion sector rails makes payment frictionless for users without bank accounts.',mode:'Partnership',capital:'$300K–1M',irr:'10–14%',risk:'LOW',payback:'5–8 yrs',start:'2027'},
    {tier:2,num:'⑩',name:'IoT Infrastructure Monitor',desc:'Sensor networks providing real-time performance data for BRIDGE-operated infrastructure assets — enabling predictive maintenance, reducing downtime, and creating the accountability data layer for government performance reporting and future contract renewals.',mode:'Direct Op',capital:'$400–800K',irr:'14–18%',risk:'MEDIUM',payback:'4–6 yrs',start:'2027'},
    {tier:2,num:'⑪',name:'Market Replication Fund',desc:'Structured fund enabling district assemblies to deploy the Kejetia model using DACF allocations. BRIDGE provides technical management and quality oversight; government provides capital through the Model Markets mandate. The primary vehicle for 260-district national scaling.',mode:'Investment',capital:'$2–5M',irr:'15–18%',risk:'MEDIUM',payback:'5–8 yrs',start:'2027'},
    {tier:2,num:'⑫',name:'PPP Road Maintenance',desc:'Performance-based maintenance contracts for feeder roads serving BRIDGE market catchment areas. Directly de-risks agricultural and market sector investments by ensuring reliable last-mile access — every BRIDGE processing venture depends on this road network functioning.',mode:'Partnership',capital:'$1–2M',irr:'10–14%',risk:'MEDIUM',payback:'6–8 yrs',start:'2028'},
    {tier:2,num:'⑬',name:'Drainage Management System',desc:'Drainage maintenance operations in market catchment areas — addressing the governance failure underlying urban flooding rather than competing for grey infrastructure construction contracts. 52% of Accra flooding attributed to weak enforcement of land use regulations, not climate factors.',mode:'Partnership',capital:'$500K–1.5M',irr:'9–12%',risk:'MEDIUM',payback:'6–9 yrs',start:'2028'},
    {tier:3,num:'⑭',name:'Smart Meter Infrastructure',desc:'ECG\'s 32% system losses are partially recoverable through smart metering. Partnership with ECG to deploy meters in market zones where BRIDGE already operates creates a foothold in energy infrastructure — and positions BRIDGE for the broader Energy sector co-investment opportunity.',mode:'Partnership',capital:'$2–4M',irr:'18–22%',risk:'HIGH',payback:'6–9 yrs',start:'2029+'},
    {tier:3,num:'⑮',name:'Regional Flood Defence',desc:'Community-led drainage and wetland preservation partnerships in market catchment areas. Governance-first: addresses the regulatory failure underlying flooding rather than building grey infrastructure that becomes another maintenance liability. Conditioned on government enforcement capacity improving.',mode:'Guidance',capital:'$3–8M',irr:'Development impact',risk:'HIGH',payback:'N/A',start:'2029+'},
    {tier:3,num:'⑯',name:'Market West Africa Expansion',desc:'Kejetia platform replication in Abidjan, Lagos, and Lomé — ECOWAS markets with equivalent scale and digitisation gaps. Conditioned entirely on the Ghana model achieving full commercial viability and documented replication-ready specifications.',mode:'Direct Op',capital:'$5–10M',irr:'15–22%',risk:'HIGH',payback:'7–10 yrs',start:'2029+'},
    {tier:3,num:'⑰',name:'Utility Management Joint Venture',desc:'Joint venture with GWCL for managed water services in market districts — importing the operational management model from Johannesburg Water and Nairobi Water. Conditioned on BRIDGE demonstrating service delivery credibility through earlier WASH hub and kiosk ventures.',mode:'Partnership',capital:'$3–7M',irr:'12–18%',risk:'HIGH',payback:'7–10 yrs',start:'2029+'},
    {tier:3,num:'⑱',name:'Infrastructure Finance Fund',desc:'Patient capital fund providing project finance to BRIDGE-affiliated infrastructure operators — enabling mid-tier contractors with proven execution capability but insufficient balance sheet for multi-year service contracts. Multiplies BRIDGE\'s deployment capacity beyond direct capital.',mode:'Investment',capital:'$5–10M',irr:'10–15%',risk:'HIGH',payback:'8–12 yrs',start:'2029+'},
  ],

  timeline:{
    phase1:{label:'Phase 1 — Market Infrastructure',years:'2026–2028',capital:'$8–25M+',count:'7 ventures',items:['Q1 2026: Model Markets partnership application filed with district assemblies','Q1 2026: Kejetia Digital Platform Phase 1 — 1,000 vendor pilot launched','Q2 2026: Market Resilience Platform — replication specs developed at Kejetia','Q2 2026: Public Toilet Networks — 3 Kejetia locations operational','Q3 2026: Market Fire Safety Systems — detection + suppression installed','Q3 2026: Market Cold Storage Units — 6 solar cold rooms at Kejetia','Q4 2026: Waste-to-Compost — market waste collection operation begins']},
    phase2:{label:'Phase 2 — WASH & Smart Infrastructure',years:'2027–2029',capital:'$5–10M',count:'6 ventures',items:['Neighbourhood WASH Hubs — peri-urban clusters near schools and clinics','Community Water Kiosk Network — IoT prepaid water, 50+ sites','IoT Infrastructure Monitor — sensor network across all BRIDGE assets','Market Replication Fund — first 3 district assembly deployments','PPP Road Maintenance — 5 feeder road catchment areas','Drainage Management System — Accra market catchment operations']},
    phase3:{label:'Phase 3 — Regional Expansion & Utility JVs',years:'2029+',capital:'$16–39M',count:'5 ventures',items:['Smart Meter Infrastructure — ECG partnership in market zones','Regional Flood Defence — wetland preservation, governance-led','Market West Africa Expansion — Abidjan, Lagos, Lomé replication','Utility Management JV — GWCL managed water services','Infrastructure Finance Fund — patient capital for affiliated operators']},
  },

  roadmap:[
    {name:'Kejetia Digital Platform',tier:1,s:0,e:60},
    {name:'Market Resilience Platform',tier:1,s:0,e:55},
    {name:'Solar Micro-Grid',tier:1,s:5,e:55},
    {name:'Public Toilet Networks',tier:1,s:5,e:50},
    {name:'Fire Safety Systems',tier:1,s:10,e:50},
    {name:'Cold Storage Units',tier:1,s:10,e:52},
    {name:'Waste-to-Compost',tier:1,s:15,e:90},
    {name:'WASH Hubs',tier:2,s:42,e:80},
    {name:'Water Kiosk Network',tier:2,s:42,e:82},
    {name:'IoT Monitor',tier:2,s:44,e:85},
    {name:'Market Replication Fund',tier:2,s:50,e:100},
    {name:'PPP Road Maintenance',tier:2,s:60,e:100},
    {name:'Tier 3 — 5 Ventures',tier:3,s:80,e:100},
  ],

  synergies:[
    {sector:'02 Financial Inclusion',link:'Kejetia transaction data builds vendor credit scores — the financial identity layer that opens access to formal banking. Mobile money integration on the platform IS the Financial Inclusion sector deployed at market scale.'},
    {sector:'03 Health Systems',link:'WASH infrastructure for CHPS compounds; reliable power for health facility cold chains and diagnostic equipment; market WASH reducing the disease burden that health sector must treat. DACF health allocation (10%) co-funds the same infrastructure serving markets.'},
    {sector:'04 Technology & Innovation',link:'The Kejetia Digital Platform is a Technology sector investment deployed through Infrastructure. IoT monitoring, smart meters, and platform analytics are Technology ventures using Infrastructure as their delivery vehicle.'},
    {sector:'05 Education & Skills',link:'WASH and power for school facilities; infrastructure maintenance training creating TVET pathways; engineering apprenticeships through BRIDGE infrastructure operations. DACF education (10%) co-funds district-level infrastructure.'},
    {sector:'06 Agriculture & Value Chains',link:'Cold storage network in markets connects agricultural cold chain to urban consumers. Feeder road maintenance directly de-risks agricultural market access. Kejetia agricultural vendor section is the urban endpoint of the agriculture value chain.'},
    {sector:'10 Energy & Renewable Resources',link:'Solar micro-grids are joint Infrastructure-Energy ventures. Processing facilities require reliable power — mini-grid deployment co-located with market infrastructure creates dual-sector returns.'},
    {sector:'11 Manufacturing & Industry',link:'Reliable power and water for processing facilities; industrial infrastructure for manufacturing parks; Waste-to-Compost output serves agricultural manufacturing as organic input supply.'},
    {sector:'12 Transportation & Logistics',link:'Market infrastructure and road maintenance directly support logistics efficiency. Kejetia supply chain optimisation reduces transport costs for every vendor on the platform. Connect24\'s GH₵4.3B road budget directly de-risks BRIDGE market access investments.'},
  ],

  thesis:'BRIDGE\'s infrastructure thesis is anchored in governance logic: infrastructure that competes for conventional contracts will fail because the procurement systems are captured. The intervention point is direct operation — own the asset, control the service, create the accountability. Kejetia demonstrates that infrastructure can serve 10,000+ vendors while generating the 15–20% IRR that makes it replicable across 260 districts.',
  thesis2:'The Model Markets mandate is the policy infrastructure BRIDGE has been waiting for. When a district assembly can deploy DACF to a BRIDGE-managed market platform rather than a politically-connected contractor, the governance problem is structurally bypassed — not lobbied around. That is not just a better IRR. That is 10,000 vendor families with financial identity, fire safety, clean water, and a digital presence for the first time.',

  deploy:[{l:'Ticket size',v:'$300K–$17M per venture'},{l:'Preferred model',v:'Direct operation + managed service'},{l:'Government partnership',v:'DACF co-financing structure'},{l:'Co-investment',v:'DFIs; impact funds; District Assemblies'},{l:'Exit horizon',v:'7–12 years; structured buyout'},{l:'Revenue model',v:'Service fees, platform transactions, usage'}],

  risks:[
    {r:'Political Economy / Patronage',sev:'HIGH',mit:'Asset-backed direct operation removes BRIDGE from procurement capture. Platform revenue model creates government interest in BRIDGE success. Transparent performance data creates community accountability that political interference cannot easily override.'},
    {r:'Government Policy Reversal',sev:'MEDIUM',mit:'Model Markets mandate is structurally embedded in DACF — constitutionally protected fund. Market vendor community (10,000+ at Kejetia alone) becomes political constituency for platform continuation. Long-term service contracts survive government transitions.'},
    {r:'Vendor Adoption',sev:'MEDIUM',mit:'Vendor-first design with on-site training staff and peer educator programme. Multi-language materials (Twi, Ga, English). Phase 1 pilot with 1,000 vendors validates adoption before full deployment. Revenue model requires vendor success — incentive alignment is structural.'},
    {r:'Power Infrastructure Dependency',sev:'MEDIUM',mit:'Solar micro-grid (Venture ③) provides independent power for the digital platform. ECG unreliability is designed out of the system rather than relied upon.'},
    {r:'Replication Quality Control',sev:'MEDIUM',mit:'Standardised technical specifications, governance frameworks, and management systems developed at Kejetia before replication begins. BRIDGE-trained management companies per market. Market Replication Fund finances only BRIDGE-specification deployments.'},
    {r:'Community Resistance',sev:'LOW',mit:'Kejetia community engagement is established — Kumasi Metropolitan Assembly and vendor associations are partners. Market authority trust built through demonstrated service improvements before replication begins.'},
  ],

  fullPackage:[
    {item:'Kejetia Financial Model',desc:'Full 10-year P&L projection — revenue build, cost structure, IRR sensitivity tables, working capital by deployment phase'},
    {item:'Vendor Onboarding Playbook',desc:'Training protocols, peer educator programme, multi-language onboarding materials, adoption milestone targets, churn prevention framework'},
    {item:'Market Resilience Platform Specs',desc:'Technical standards for all 7 service bundles — power, water, sanitation, drainage, security, fire safety, digital — in replication-ready format'},
    {item:'District Assembly Toolkit',desc:'DACF application templates, partnership MOUs, governance framework for market management companies, reporting dashboards'},
    {item:'WASH Investment Database',desc:'400+ underserved communities mapped — proximity to BRIDGE market assets, service gap severity, co-financing potential, implementation priority score'},
    {item:'Policy Monitoring — Live Access',desc:'Monthly tracking of Model Markets mandate rollout, DACF allocation cycles, district assembly procurement calendars, Big Push programme deployment'},
    {item:'Competitive Intelligence Brief',desc:'All active infrastructure service providers operating in Ghana\'s major markets — partnership potential, overlap risk, acquisition targets'},
    {item:'IoT Infrastructure Specification',desc:'Sensor network architecture, connectivity protocols, dashboard specifications, predictive maintenance algorithms for BRIDGE asset portfolio'},
    {item:'Flood Risk Market Maps',desc:'GIS-referenced flood risk mapping for all 18 Tier 1–2 venture deployment sites — governance-failure causation analysis, mitigation strategies'},
    {item:'Cross-Sector Integration Guide',desc:'Revenue stacking playbook showing how DACF allocations across health (10%), education (10%), water (10%), and markets (25%) can be bundled into integrated BRIDGE deployments'},
    {item:'West Africa Expansion Pre-Analysis',desc:'Preliminary market assessment for Abidjan, Lagos, and Lomé — market scale, regulatory environment, political risk, partner landscape'},
    {item:'Quarterly Intelligence Updates',desc:'New data, revised venture assessments, competitive landscape changes, policy developments — delivered across all 12 sectors every quarter'},
  ],
};

/* ═══ LOGO ═══════════════════════════════════════════════════════════════ */
const Logo=({height=28,variant='white'})=>{
  const tf=variant==='white'?'#ffffff':'#1B4D3E';
  const bk=variant==='white'?'rgba(0,0,0,0.08)':'rgba(27,77,62,0.15)';
  return(
    <svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      {/* Icon — bordered box */}
      <rect fill="none" stroke={tf} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      {/* Icon — diamond layers */}
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
      <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
      {/* BRIDGE wordmark — B shapes */}
      <path fill={tf} stroke={bk} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      <path fill={tf} stroke={bk} strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      {/* R accent bar (lime) */}
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
      {/* I bar */}
      <rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      {/* D letter */}
      <path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      {/* G letter */}
      <path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      {/* E bars */}
      <rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
    </svg>
  );
};

/* ═══ GLOBAL STYLES ══════════════════════════════════════════════════════ */
const Gf=()=>(<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  /* v4: section IDs get scroll-margin so sticky topbar does not obscure on jump */
  [id^='sec-'],[id='upsell']{scroll-margin-top:50px;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  /* v4: drop cap 4.4em, tighter line-height 0.8 */
  .dc::first-letter{font-family:${F.display};font-size:4.4em;font-weight:900;float:left;line-height:0.8;margin:0.05em 0.12em 0 0;color:${C.forest};}
  @media print{.np{display:none!important;}}
  /* Mobile accordion header — hidden on desktop */
  .mob-sec-hdr{display:none!important;}
  .mob-show{display:none;}
  .fig-scroll{overflow-x:auto;}
  .subs-table{display:block;}
  .subs-cards{display:none;}
  /* Carousel — hidden on desktop, shown on mobile */
  .mob-car{display:none;}
  .mob-only{display:none!important;}
  /* Desktop-only tables/grids — shown on desktop, hidden on mobile */
  .desk-only{display:block;}
  /* Progress bar — hidden on desktop */
  .mob-progress{display:none;}
  .mob-toggle{display:none;width:100%;padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};align-items:center;justify-content:space-between;transition:color 0.15s;}
  .mob-toggle:hover{color:${C.forest};}
  .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
  .mob-toggle-hdr{border-bottom:1px solid rgba(255,255,255,0.08)!important;color:rgba(250,248,243,0.4)!important;}
  /* v4: Carousel edge fade */
  .car-wrap{position:relative;}
  .car-wrap::after{content:'';position:absolute;top:14px;right:0;width:44px;height:calc(100% - 32px);background:linear-gradient(to right,transparent,${C.paper} 90%);pointer-events:none;z-index:2;}
  .car-wrap-dark::after{background:linear-gradient(to right,transparent,${C.paperDark} 90%);}
  .car-wrap-ink::after{background:linear-gradient(to right,transparent,${C.ink} 90%);}
  /* v4: table row hover */
  .row-hover{transition:background 0.12s ease;}
  .row-hover:hover{background:rgba(184,217,53,0.04)!important;}
  .row-hover-dark:hover{background:rgba(255,255,255,0.035)!important;}
  /* v4: score bar animation */
  @keyframes barGrow{from{width:0}to{width:var(--w,100%)}}
  .score-bar{animation:barGrow 1s cubic-bezier(0.16,1,0.3,1) 0.4s both;}
  .score-bar-dim{animation:barGrow 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both;}
  /* v4: global link + button transitions */
  a{transition:opacity 0.15s ease;}
  a:hover{opacity:0.76;}
  button{transition:background 0.15s ease,border-color 0.15s ease,color 0.15s ease;}
  /* v4: primary CTA lift */
  .cta-primary{transition:transform 0.15s ease,box-shadow 0.15s ease!important;}
  .cta-primary:hover{transform:translateY(-1px)!important;box-shadow:0 6px 20px rgba(184,217,53,0.25)!important;}
  /* v4: section rule class */
  .sec-rule{border-top:5px solid ${C.ink};border-bottom:2.5px solid ${C.lime};padding-bottom:4px;margin-bottom:22px;}
  @media(max-width:900px){
    .tc{grid-template-columns:1fr!important;}
    .hm{display:none!important;}
    .g2{grid-template-columns:1fr!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-upsell{padding:40px 32px!important;}
    .pad-footer{padding:14px 32px!important;}
    .pad-topbar{padding:10px 24px!important;}
    .pad-gate{padding:40px 32px!important;}
  }
  @media(max-width:600px){
    .tc{grid-template-columns:1fr!important;}
    .g2{grid-template-columns:1fr!important;}
    .pad-section{padding:24px 18px!important;}
    .pad-cover{padding:20px 18px 0!important;}
    .pad-upsell{padding:24px 18px!important;}
    .pad-footer{padding:16px 18px!important;}
    .pad-topbar{padding:10px 18px!important;}
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}
    .mob-full{width:100%!important;}
    .mob-item-hidden{display:none!important;}
    .mob-toggle{display:flex!important;}
    .subs-table{display:none!important;}
    .subs-cards{display:grid!important;grid-template-columns:1fr 1fr;gap:8px;}
    .footer-links{display:none!important;}
    .footer-inner{justify-content:center!important;}
    .upsell-grid{grid-template-columns:1fr!important;}
    .upsell-cta-row{flex-direction:column!important;}
    .upsell-cta-row a{justify-content:center!important;}
    /* Section body collapse */
    .sec-body-hidden{display:none!important;}
    /* Expand all bar */
    .mob-expand-all{display:flex!important;}
    /* Section accordion headers — show on mobile */
    .mob-sec-hdr{display:flex!important;}
    /* Stats 2x2 */
    .stats-row>div{flex:0 0 50%!important;border-left:none!important;border-top:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(2){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(4){border-left:1px solid rgba(255,255,255,0.08)!important;}
    /* v4: re-show 4 cover stats as 2×2 grid on mobile */
    .mob-stat{display:flex!important;}
    /* v4: disable row hover on touch */
    .row-hover:hover{background:inherit!important;}
    /* v4: narrower edge fade on mobile */
    .car-wrap::after{width:28px;}
    /* v4: upsell CTAs full width mobile */
    .upsell-cta-row a{width:100%!important;}
    /* ── Carousel system ── */
    .mob-car{display:block!important;}
    .desk-only{display:none!important;}
    .mob-scroller{
      display:flex;
      overflow-x:auto;
      scroll-snap-type:x mandatory;
      -webkit-overflow-scrolling:touch;
      scrollbar-width:none;
      gap:10px;
      align-items:flex-start;
      padding-bottom:4px;
    }
    .mob-scroller::-webkit-scrollbar{display:none;}
    /* Full-width card — one at a time */
    .mob-snap-card{flex:0 0 calc(100% - 2px);scroll-snap-align:start;min-width:0;}
    /* Wide card — peek at next ~15% */
    .mob-snap-wide{flex:0 0 88%;scroll-snap-align:start;min-width:0;}
    /* Small card — two at a time */
    .mob-snap-sm{flex:0 0 72vw;scroll-snap-align:start;min-width:0;}
    /* ── Reading progress bar ── */
    .mob-progress{
      display:block!important;
      position:fixed;
      top:0;left:0;
      height:3px;
      background:${C.lime};
      z-index:201;
      transition:width 0.15s linear;
      pointer-events:none;
    }
    /* Gate / Upsell CTA mobile */
    .pad-gate{padding:24px 18px!important;}
    .gate-value-line{display:none!important;}
    .gate-cta-row{flex-direction:column!important;}
    .gate-cta-row a{justify-content:center!important;}
    .gate-tertiary{display:none!important;}
  }
`}</style>);

/* ═══ FIGURE CAPTION ════════════════════════════════════════════════════ */
const FigCaption=({num,title,note})=>(
  <div style={{marginBottom:'14px'}}>
    <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'5px'}}>
      <span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:C.lime,letterSpacing:'2px',background:C.forest,padding:'3px 9px',flexShrink:0}}>FIG {num}</span>
      <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,letterSpacing:'0.1px'}}>{title}</span>
    </div>
    {note&&<div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic',lineHeight:1.6,borderLeft:`2px solid ${C.border}`,marginLeft:'2px',paddingLeft:'10px'}}>{note}</div>}
  </div>
);

/* ═══ FIG 01 — WASH COVERAGE GAP ════════════════════════════════════════ */
const Fig01WashCoverage=()=>{
  const rows=S.washData;
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="01" title="WASH Coverage — Ghana\'s Access Gap to Universal Service" note="Current WASH coverage vs. universal service target. Dark bars show current access; gap shown in muted tone. Note: 72% open defecation rate in Northern Region against 23% national average — the geographic concentration of risk. Source: WaterAid Ghana; UNICEF WASH Monitoring; Ghana NDPC 2024."/>
      <div className="fig-scroll">
      <div style={{minWidth:'500px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'180px 1fr 60px',background:C.forest}}>
          {['Dimension','Coverage vs. Universal Target (100%)','Current'].map((h,i)=>(
            <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
          ))}
        </div>
        {rows.map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'180px 1fr 60px',borderBottom:i<rows.length-1?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
            <div style={{padding:'10px 12px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{row.label}</div>
              <div style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic',lineHeight:1.4,marginTop:'2px'}}>{row.note}</div>
            </div>
            <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`}}>
              <div style={{position:'relative',height:'20px',background:'rgba(0,0,0,0.05)',borderRadius:'2px',overflow:'hidden'}}>
                <div style={{position:'absolute',left:0,top:0,height:'100%',width:`${row.current}%`,background:row.current<50?C.red:row.current<75?C.amber:C.positive}}/>
                <div style={{position:'absolute',left:`${row.current}%`,top:0,height:'100%',width:`${row.target-row.current}%`,background:`rgba(0,0,0,0.08)`}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:'3px'}}>
                <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:row.current<50?C.red:row.current<75?C.amber:C.positive}}>{row.current}% access</span>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>{row.target-row.current}pp gap</span>
              </div>
            </div>
            <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`,textAlign:'center'}}>
              <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:row.current<50?C.red:row.current<75?C.amber:C.positive}}>{row.current}%</div>
            </div>
          </div>
        ))}
      </div>
      </div>{/* end fig-scroll */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,border:`1px solid ${C.border}`,marginTop:'10px'}}>
        {[{l:'Preventable deaths/year',v:'7,653',vc:C.red},{l:'Safely managed water',v:'44.4%',vc:C.amber},{l:'Solid waste collected',v:'10%',vc:C.red}].map((kv,i)=>(
          <div key={i} style={{background:C.paperDark,padding:'8px 12px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint,letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
            <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══ FIG 02 — WASH FUNDING COLLAPSE ════════════════════════════════════ */
const Fig02FundingCollapse=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="02" title="WASH Funding Source — Government Contribution Collapse" note="Government share of WASH funding 2022–2024. The collapse from 27% to 5% in two years is not a fiscal crisis — it is a political economy failure. Source: Ghana Ministry of Finance; WaterAid Ghana 2024."/>
    <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
      <div style={{display:'grid',gridTemplateColumns:'80px 1fr 80px',background:C.forest}}>
        {['Year','Funding Source Split','Gov %'].map((h,i)=>(
          <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
        ))}
      </div>
      {S.fundingCollapse.map((row,i)=>(
        <div key={i} style={{display:'grid',gridTemplateColumns:'80px 1fr 80px',borderBottom:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
          <div style={{padding:'12px 14px'}}>
            <div style={{fontFamily:F.mono,fontSize:'16px',fontWeight:700,color:C.ink}}>{row.year}</div>
          </div>
          <div style={{padding:'12px 14px',borderLeft:`1px solid ${C.border}`}}>
            <div style={{display:'flex',height:'24px',borderRadius:'2px',overflow:'hidden',marginBottom:'6px'}}>
              <div style={{width:`${row.gov}%`,background:C.positive,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                {row.gov>8&&<span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.white}}>{row.gov}%</span>}
              </div>
              <div style={{flex:1,background:'rgba(168,32,13,0.55)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:'rgba(250,248,243,0.85)'}}>Donor {row.donor}%</span>
              </div>
            </div>
            <div style={{display:'flex',gap:'12px'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',color:C.positive,fontWeight:700}}>■ Government {row.gov}%</span>
              <span style={{fontFamily:F.sans,fontSize:'9px',color:C.red,fontWeight:700}}>■ Donor {row.donor}%</span>
            </div>
          </div>
          <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`,textAlign:'center'}}>
            <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:row.gov<10?C.red:row.gov<20?C.amber:C.positive}}>{row.gov}%</div>
            <div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,letterSpacing:'0.5px'}}>govt share</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,border:`1px solid ${C.border}`,marginTop:'10px'}}>
      {[{l:'2022 government share',v:'27%',vc:C.positive},{l:'2024 government share',v:'5%',vc:C.red},{l:'Current donor dependency',v:'95%',vc:C.red}].map((kv,i)=>(
        <div key={i} style={{background:C.paperDark,padding:'8px 12px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint,letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
          <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══ FIG 03 — KEJETIA DEPLOYMENT & VENDOR SCALE ════════════════════════ */
const Fig03Kejetia=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="03" title="Kejetia Digital Platform — Three-Phase Deployment & Vendor Scale" note="Capital deployed per phase (bars) vs. vendor platform adoption (line). Phase 3 targets 10,000 active vendors at 80%+ monthly active rate — the threshold for platform sustainability via transaction-based revenue. Source: BRIDGE Infrastructure Sector Analysis, 2026."/>
    <div className="fig-scroll">
      <div style={{minWidth:'560px'}}>
        <svg viewBox="0 0 700 280" width="100%" style={{display:'block',border:`1px solid ${C.border}`,background:C.paper}}>
          {/* grid lines */}
          {[0,25,50,75,100].map(v=>{
            const y=240-v*1.8;
            return(<g key={v}><line x1="60" y1={y} x2="660" y2={y} stroke={C.border} strokeWidth="1" strokeDasharray="3,4"/><text x="52" y={y+4} textAnchor="end" fontFamily={F.mono} fontSize="9" fill={C.faint}>{v}%</text></g>);
          })}
          {/* bars */}
          {S.kejetiaPhases.map((p,i)=>{
            const bx=100+i*185;const bw=120;const bh=(p.capital/17)*160;const by=240-bh;
            return(<g key={i}>
              <rect x={bx} y={by} width={bw} height={bh} fill={C.forest} opacity="0.8"/>
              <text x={bx+bw/2} y={by-6} textAnchor="middle" fontFamily={F.mono} fontSize="11" fontWeight="700" fill={C.forest}>${p.capital}M</text>
              <text x={bx+bw/2} y="258" textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="700" fill={C.ink}>{p.phase}</text>
              <text x={bx+bw/2} y="270" textAnchor="middle" fontFamily={F.sans} fontSize="9" fill={C.muted}>{p.timeline}</text>
            </g>);
          })}
          {/* adoption line */}
          {[{x:160,v:10},{x:345,v:50},{x:530,v:100}].map((pt,i,arr)=>{
            const y=240-pt.v*1.8;
            return(<g key={i}>
              {i>0&&<line x1={arr[i-1].x} y1={240-arr[i-1].v*1.8} x2={pt.x} y2={y} stroke={C.lime} strokeWidth="2.5" strokeDasharray="5,3"/>}
              <circle cx={pt.x} cy={y} r="5" fill={C.lime} stroke={C.ink} strokeWidth="1.5"/>
              <text x={pt.x} y={y-10} textAnchor="middle" fontFamily={F.mono} fontSize="10" fontWeight="700" fill={C.lime}>{[1000,5000,10000][i].toLocaleString()}</text>
            </g>);
          })}
          {/* axis */}
          <line x1="60" y1="240" x2="660" y2="240" stroke={C.border} strokeWidth="1"/>
          <line x1="60" y1="20" x2="60" y2="240" stroke={C.border} strokeWidth="1"/>
          {/* legend */}
          <rect x="420" y="25" width="12" height="12" fill={C.forest} opacity="0.8"/>
          <text x="436" y="36" fontFamily={F.sans} fontSize="9" fill={C.muted}>Capital deployed</text>
          <line x1="420" y1="52" x2="432" y2="52" stroke={C.lime} strokeWidth="2" strokeDasharray="4,2"/>
          <circle cx="426" cy="52" r="3" fill={C.lime}/>
          <text x="436" y="56" fontFamily={F.sans} fontSize="9" fill={C.muted}>Vendor adoption</text>
        </svg>
      </div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,border:`1px solid ${C.border}`,marginTop:'10px'}}>
      {[{l:'Government construction invested',v:'$507M',vc:C.forest},{l:'Platform investment (BRIDGE)',v:'$17M',vc:C.lime},{l:'Target IRR',v:'15–20%',vc:C.positive}].map((kv,i)=>(
        <div key={i} style={{background:C.paperDark,padding:'8px 12px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint,letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
          <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══ FIG 04 — GHANA vs SSA INFRASTRUCTURE ══════════════════════════════ */
const Fig04GhanaSSA=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="04" title="Infrastructure Access — Ghana vs. Sub-Saharan Africa Average" note="Ghana vs. Sub-Saharan Africa average across five infrastructure dimensions. Ghana leads on power but lags significantly on sanitation and solid waste management — the sectors with the highest mortality cost. Source: WHO; World Bank; Ghana Statistical Service 2024."/>
    <div className="fig-scroll">
    <div style={{minWidth:'520px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
      <div style={{display:'grid',gridTemplateColumns:'160px 1fr 80px 80px',background:C.forest}}>
        {['Dimension','Coverage','Ghana','SSA Avg'].map((h,i)=>(
          <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
        ))}
      </div>
      {S.ghanaVsSSA.map((row,i)=>(
        <div key={i} style={{display:'grid',gridTemplateColumns:'160px 1fr 80px 80px',borderBottom:i<S.ghanaVsSSA.length-1?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
          <div style={{padding:'10px 12px'}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{row.dim}</div>
            <div style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic',lineHeight:1.4,marginTop:'2px'}}>{row.note}</div>
          </div>
          <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`}}>
            <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <div style={{width:`${Math.min(row.ghana,100)}%`,maxWidth:'55%',height:'9px',background:C.forest,borderRadius:'2px',flexShrink:0}}/>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>Ghana</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <div style={{width:`${Math.min(row.ssa,100)}%`,maxWidth:'55%',height:'9px',background:C.border,borderRadius:'2px',flexShrink:0}}/>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>SSA avg</span>
              </div>
            </div>
          </div>
          <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`,textAlign:'center'}}>
            <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:row.ghana>row.ssa?C.positive:C.red}}>{row.ghana}%</div>
          </div>
          <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`,textAlign:'center'}}>
            <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.muted}}>{row.ssa}%</div>
          </div>
        </div>
      ))}
    </div>
    </div>{/* end fig-scroll */}
  </div>
);

/* ═══ FIG 05 — 2026 BUDGET ALLOCATIONS ══════════════════════════════════ */
const Fig05Budget=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="05" title="2026 Infrastructure Budget Allocations — BRIDGE Entry Points" note="Key 2026 budget allocations with BRIDGE venture alignment. The Model Markets mandate (DACF 25%) is the flagship BRIDGE opportunity — Kejetia becomes the national template. Source: Ghana Ministry of Finance, 2026 Budget Statement."/>
    <div className="fig-scroll">
    <div style={{minWidth:'560px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
      {S.budgetItems.map((b,i)=>(
        <div key={i} style={{display:'grid',gridTemplateColumns:'220px 1fr 110px',borderBottom:i<S.budgetItems.length-1?`1px solid ${C.border}`:'none',background:b.featured?C.forest:(i%2===0?C.paper:C.paperDark),alignItems:'center'}}>
          <div style={{padding:'10px 14px'}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:b.featured?C.lime:C.ink,marginBottom:'2px'}}>{b.item}</div>
            <div style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:b.featured?C.paper:C.forest}}>{b.ghc}</div>
            <div style={{fontFamily:F.sans,fontSize:'9px',color:b.featured?'rgba(250,248,243,0.4)':C.faint}}>{b.usd}</div>
          </div>
          <div style={{padding:'10px 14px',borderLeft:`1px solid ${b.featured?'rgba(255,255,255,0.1)':C.border}`}}>
            <div style={{height:'8px',background:b.featured?'rgba(255,255,255,0.08)':C.border,borderRadius:'2px',overflow:'hidden',marginBottom:'5px'}}>
              <div style={{height:'100%',width:`${Math.min(b.pct,100)}%`,background:b.featured?C.lime:C.limeDark,borderRadius:'2px'}}/>
            </div>
            <div style={{fontFamily:F.body,fontSize:'10px',color:b.featured?'rgba(250,248,243,0.55)':C.muted,fontStyle:'italic'}}>{b.mode}</div>
          </div>
          <div style={{padding:'8px 12px',borderLeft:`1px solid ${b.featured?'rgba(255,255,255,0.1)':C.border}`,textAlign:'center'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:b.featured?C.lime:C.amber,letterSpacing:'0.5px',lineHeight:1.4}}>{b.urgency}</div>
          </div>
        </div>
      ))}
    </div>
    </div>{/* end fig-scroll */}
  </div>
);

/* ═══ FIG 06 — VENTURE PORTFOLIO MATRIX ══════════════════════════════════ */
const Fig06Matrix=()=>{
  const pts=[
    {n:'Kejetia Platform',x:350,y:70,r:20,tier:1},{n:'Market Resilience',x:310,y:58,r:13,tier:1},
    {n:'Solar Micro-Grid',x:330,y:120,r:10,tier:1},{n:'Public Toilets',x:165,y:52,r:7,tier:1},
    {n:'Fire Safety',x:148,y:78,r:7,tier:1},{n:'Cold Storage',x:175,y:100,r:7,tier:1},
    {n:'Waste-to-Compost',x:340,y:195,r:8,tier:1},{n:'WASH Hubs',x:175,y:125,r:8,tier:2},
    {n:'Water Kiosks',x:165,y:155,r:8,tier:2},{n:'Replication Fund',x:325,y:95,r:12,tier:2},
    {n:'PPP Roads',x:310,y:155,r:9,tier:2},{n:'West Africa Exp.',x:530,y:90,r:14,tier:3},
  ];
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  const tierTx={1:C.ink,2:C.white,3:C.paper};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="06" title="Infrastructure Portfolio — Risk vs. Return Matrix" note="Risk vs. return matrix for all 18 infrastructure ventures. Kejetia Digital Platform is the largest single bubble — highest capital, strong IRR, and medium risk because the market, the governance model, and the vendor relationships are already proven. Source: BRIDGE Venture Analysis, 2026."/>
      <div className="fig-scroll">
        <div style={{minWidth:'600px',position:'relative'}}>
          <svg viewBox="0 0 720 360" width="100%" style={{display:'block',border:`1px solid ${C.border}`,background:C.paper,overflow:'visible'}}>
            <rect x="70" y="20" width="190" height="295" fill={C.positive} opacity="0.05"/>
            <rect x="260" y="20" width="200" height="295" fill={C.amber} opacity="0.05"/>
            <rect x="460" y="20" width="190" height="295" fill={C.red} opacity="0.05"/>
            <text x="165" y="330" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.positive} letterSpacing="1.5">LOW RISK</text>
            <text x="360" y="330" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.amber} letterSpacing="1.5">MEDIUM RISK</text>
            <text x="555" y="330" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.red} letterSpacing="1.5">HIGH RISK</text>
            {[0,5,10,15,20,25].map(v=>{
              const y=315-v*11.6;
              return(<g key={v}><line x1="65" y1={y} x2="655" y2={y} stroke={C.border} strokeWidth="1" strokeDasharray="3,4"/><text x="58" y={y+4} textAnchor="end" fontFamily={F.mono} fontSize="9" fill={C.faint}>{v}%</text></g>);
            })}
            <line x1="70" y1="315" x2="650" y2="315" stroke={C.border} strokeWidth="1"/>
            <line x1="70" y1="20" x2="70" y2="315" stroke={C.border} strokeWidth="1"/>
            <line x1="260" y1="20" x2="260" y2="315" stroke={C.border} strokeWidth="1" strokeDasharray="4,4"/>
            <line x1="460" y1="20" x2="460" y2="315" stroke={C.border} strokeWidth="1" strokeDasharray="4,4"/>
            <text x="14" y="175" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.muted} transform="rotate(-90,14,175)" letterSpacing="1">IRR (%)</text>
            {pts.map((p,i)=>(
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={p.r+4} fill={tierColor[p.tier]} opacity="0.15"/>
                <circle cx={p.x} cy={p.y} r={p.r} fill={tierColor[p.tier]} opacity="0.85" stroke={C.paper} strokeWidth="1.5"/>
                <text x={p.x} y={p.y+4} textAnchor="middle" fontFamily={F.mono} fontSize="8" fontWeight="700" fill={tierTx[p.tier]}>{i+1}</text>
              </g>
            ))}
          </svg>
          <div style={{display:'flex',gap:'0',borderTop:`1px solid ${C.border}`,background:C.paperDark}}>
            {[{bg:C.lime,tx:C.ink,label:'Tier 1 ventures'},{bg:C.amber,tx:C.white,label:'Tier 2 ventures'},{bg:C.muted,tx:C.paper,label:'Tier 3 ventures'}].map((lg,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'6px',padding:'8px 12px',borderRight:`1px solid ${C.border}`}}>
                <div style={{width:'10px',height:'10px',borderRadius:'50%',background:lg.bg,flexShrink:0}}/>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted}}>{lg.label}</span>
              </div>
            ))}
            <div style={{padding:'8px 12px',flex:1}}>
              <span style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>Bubble size = capital required · Kejetia (#1) is the largest deployment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ FIG 07 — QUARTERLY DEPLOYMENT ROADMAP ════════════════════════════ */
const Fig07Roadmap=()=>{
  const years=['2026','2027','2028','2029','2030+'];
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  const tierTx={1:C.ink,2:C.white,3:C.paper};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="07" title="Infrastructure Portfolio — Quarterly Deployment Roadmap" note="Portfolio deployment roadmap. Kejetia and Market Resilience Platform launch simultaneously in Q1 2026 — establishing the platform before district DACF allocations are committed. Source: BRIDGE Operations Planning, 2026."/>
      <div className="fig-scroll">
        <div style={{minWidth:'620px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'160px 1fr',background:C.ink,borderBottom:`1px solid rgba(255,255,255,0.08)`}}>
            <div style={{padding:'8px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:C.lime,textTransform:'uppercase'}}>Venture</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',borderLeft:`1px solid rgba(255,255,255,0.08)`}}>
              {years.map((y,i)=><div key={i} style={{padding:'8px 0',fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:'rgba(250,248,243,0.5)',textAlign:'center',borderLeft:i>0?'1px solid rgba(255,255,255,0.06)':'none'}}>{y}</div>)}
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'160px 1fr',background:'rgba(184,217,53,0.04)',borderBottom:`1px solid ${C.border}`}}>
            <div style={{padding:'5px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',color:C.faint,textTransform:'uppercase'}}>Phase</div>
            <div style={{display:'flex',borderLeft:`1px solid ${C.border}`}}>
              <div style={{width:'40%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.lime,letterSpacing:'1px',borderRight:`1px solid ${C.border}`}}>PHASE 1 · MARKET INFRASTRUCTURE</div>
              <div style={{width:'40%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.amber,letterSpacing:'1px',borderRight:`1px solid ${C.border}`}}>PHASE 2 · WASH & SMART INFRA</div>
              <div style={{width:'20%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.muted,letterSpacing:'1px'}}>PHASE 3</div>
            </div>
          </div>
          {S.roadmap.map((v,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:'160px 1fr',borderBottom:i<S.roadmap.length-1?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
              <div style={{padding:'8px 12px',display:'flex',alignItems:'center',gap:'6px'}}>
                <div style={{width:'8px',height:'8px',borderRadius:'1px',background:tierColor[v.tier],flexShrink:0}}/>
                <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:C.ink,lineHeight:1.3}}>{v.name}</span>
              </div>
              <div style={{borderLeft:`1px solid ${C.border}`,position:'relative',padding:'8px 0'}}>
                <div style={{position:'relative',height:'20px',margin:'0 6px'}}>
                  <div style={{position:'absolute',left:`${v.s}%`,width:`${v.e-v.s}%`,height:'100%',background:tierColor[v.tier],borderRadius:'2px',display:'flex',alignItems:'center',justifyContent:'center',minWidth:'4px'}}>
                    {v.e-v.s>12&&<span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:tierTx[v.tier],whiteSpace:'nowrap',overflow:'hidden',paddingLeft:'4px',paddingRight:'4px'}}>{v.s===0&&v.tier===1?'Q1 2026':v.tier===2?'2027':'2029+'}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══ FIG 08 — CROSS-SECTOR INTEGRATION TABLE ═══════════════════════════ */
const Fig08CrossSector=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="08" title="Infrastructure as Enabler — Cross-Sector Integration" note="Infrastructure is not a sector — it is the prerequisite for every other sector. Without reliable power, markets, roads, and WASH, every other BRIDGE investment underperforms. Source: BRIDGE Portfolio Integration Analysis, 2026."/>
    {/* Mobile: carousel of sector cards */}
    <Carousel items={S.synergies} renderCard={(row,i)=>(
      <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden',height:'100%'}}>
        <div style={{background:C.forest,padding:'10px 14px'}}>
          <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.lime}}>{row.sector}</div>
        </div>
        <div style={{padding:'14px 14px'}}>
          <div style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.65,fontWeight:300}}>{row.link}</div>
        </div>
      </div>
    )}/>
    {/* Desktop: 2-column table */}
    <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
      <div style={{display:'grid',gridTemplateColumns:'160px 1fr',background:C.forest}}>
        {['BRIDGE Sector','Infrastructure Integration Point'].map((h,i)=>(
          <div key={i} style={{padding:'7px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
        ))}
      </div>
      {S.synergies.map((row,i)=>(
        <div key={i} style={{display:'grid',gridTemplateColumns:'160px 1fr',borderBottom:i<S.synergies.length-1?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'start'}}>
          <div style={{padding:'10px 14px'}}>
            <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.forest}}>{row.sector}</div>
          </div>
          <div style={{padding:'10px 14px',borderLeft:`1px solid ${C.border}`}}>
            <div style={{fontFamily:F.body,fontSize:'11px',color:C.ink,lineHeight:1.65,fontWeight:300}}>{row.link}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══ FIG 09 — DACF INTEGRATION CAPITAL STACK ═══════════════════════════ */
const Fig09DACFStack=()=>{
  const layers=[
    {label:'Model Markets (25% DACF)',sub:'Market infrastructure — Kejetia replication',pct:45,amt:'GH₵2.2B+',note:'Primary vehicle — Kejetia model deployed across 260+ districts',color:C.forest,tx:C.lime},
    {label:'BRIDGE Private Capital',sub:'Direct operation + managed service',pct:25,amt:'$8–15M',note:'Operating capital for Kejetia platform + 7 Tier 1 ventures',color:C.lime,tx:C.ink},
    {label:'Health + Education DACF (20%)',sub:'10% health + 10% education co-fund',pct:20,amt:'260+ districts',note:'Bundled with market infrastructure — integrated service delivery',color:C.amber,tx:C.white},
    {label:'Water DACF (10%)',sub:'WASH infrastructure co-financing',pct:10,amt:'260+ districts',note:'WASH hubs and kiosk network co-funded at district level',color:C.teal,tx:C.paper},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="09" title="DACF Integration Stack — BRIDGE Multi-Allocation Capture" note="BRIDGE\'s DACF bundling strategy captures across four allocation categories simultaneously. A single district deployment drawing from markets (25%), health (10%), education (10%), and water (10%) creates an integrated service platform that no single-allocation approach can replicate. Source: BRIDGE Financial Modelling; Ghana DACF Framework."/>
      <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{height:'52px',display:'flex',borderBottom:`1px solid ${C.border}`}}>
          {layers.map((l,i)=>(
            <div key={i} style={{width:`${l.pct}%`,background:l.color,display:'flex',alignItems:'center',justifyContent:'center',borderRight:i<3?'1px solid rgba(255,255,255,0.15)':'none',overflow:'hidden',flexShrink:0}}>
              <span style={{fontFamily:F.mono,fontSize:'clamp(9px,1.3vw,13px)',fontWeight:700,color:l.tx,whiteSpace:'nowrap'}}>{l.pct}%</span>
            </div>
          ))}
        </div>
        {/* Desktop: 4-col detail rows */}
        <div className="desk-only">
        {layers.map((l,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'14px 180px 100px 1fr',borderBottom:i<3?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
            <div style={{width:'14px',height:'100%',background:l.color,flexShrink:0}}/>
            <div style={{padding:'10px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{l.label}</div>
              <div style={{fontFamily:F.body,fontSize:'9px',fontStyle:'italic',color:C.faint}}>{l.sub}</div>
            </div>
            <div style={{padding:'10px 12px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,borderLeft:`1px solid ${C.border}`}}>{l.amt}</div>
            <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,borderLeft:`1px solid ${C.border}`}}>{l.note}</div>
          </div>
        ))}
        </div>
        {/* Mobile: 2-col rows — swatch + label | amount */}
        <div className="mob-only">
        {layers.map((l,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'8px 1fr 80px',borderBottom:i<3?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
            <div style={{width:'8px',height:'100%',background:l.color,flexShrink:0}}/>
            <div style={{padding:'10px 12px'}}>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{l.label}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{l.note}</div>
            </div>
            <div style={{padding:'10px 10px',textAlign:'right',borderLeft:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:C.forest}}>{l.amt}</div>
            </div>
          </div>
        ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'Districts available',v:'260+',vc:C.forest},{l:'DACF allocation targeted',v:'4 streams',vc:C.lime},{l:'Q1 2026 window',v:'OPEN NOW',vc:C.amber}].map((kv,i)=>(
            <div key={i} style={{background:C.ink,padding:'10px 14px',textAlign:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.3)',letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


/* ═══ MOBILE DETECT HOOK ════════════════════════════════════════════════ */
/* ═══ SECTION DEFINITIONS (shared between nav components) ═══════════════ */
const SECS=[
  {id:'sec-exec',    label:'Executive Summary'},
  {id:'sec-subs',    label:'Sub-Sectors'},
  {id:'sec-problem', label:'Governance Failure'},
  {id:'sec-wash',    label:'The WASH Crisis'},
  {id:'sec-kejetia', label:'The Flagship'},
  {id:'sec-regional',label:'Ghana vs. The Region'},
  {id:'sec-policy',  label:'Policy Window'},
  {id:'sec-system',  label:'System Integration'},
  {id:'sec-ventures',label:'Venture Portfolio'},
  {id:'sec-roadmap', label:'Deployment Roadmap'},
  {id:'sec-synergy', label:'System Integration'},
  {id:'sec-coinvest',label:'Co-Investment'},
  {id:'sec-risk',    label:'Risk & Thesis'},
  {id:'upsell',      label:'Next Steps'},
];

/* ═══ FIXED BOTTOM SECTION NAV ══════════════════════════════════════════ */
const SectionFooterNav=()=>{
  const[active,setActive]=useState(0);
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const idx=SECS.findIndex(s=>s.id===e.target.id);
          if(idx>=0)setActive(idx);
        }
      });
    },{rootMargin:'-40% 0px -55% 0px'});
    SECS.forEach(s=>{const el=document.getElementById(s.id);if(el)obs.observe(el);});
    return()=>obs.disconnect();
  },[]);
  const goTo=(idx)=>{
    const clamped=Math.max(0,Math.min(SECS.length-1,idx));
    const el=document.getElementById(SECS[clamped].id);
    if(el){el.scrollIntoView({behavior:'smooth',block:'start'});}
    setActive(clamped);
  };
  const BtnStyle=(disabled,isNext)=>({
    width:'38px',height:'38px',
    background:disabled?'rgba(255,255,255,0.03)':(isNext?C.forest:'rgba(255,255,255,0.07)'),
    border:`1px solid ${disabled?'rgba(255,255,255,0.08)':(isNext?'rgba(184,217,53,0.25)':'rgba(255,255,255,0.14)')}`,
    cursor:disabled?'default':'pointer',
    display:'flex',alignItems:'center',justifyContent:'center',
    flexShrink:0,opacity:disabled?0.28:1,
    transition:'background 0.15s,transform 0.12s',
  });
  return(
    <div className="np" style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,background:'rgba(10,20,12,0.97)',borderTop:'1px solid rgba(184,217,53,0.12)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'9px 18px',gap:'10px'}}>
      <button onClick={()=>goTo(active-1)} disabled={active===0} style={BtnStyle(active===0,false)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke={active===0?'rgba(255,255,255,0.2)':C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',minWidth:0,overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',gap:'7px',maxWidth:'100%',overflow:'hidden'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px',flexShrink:0}}>§{String(active+1).padStart(2,'0')}</span>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.45)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{SECS[active]?.label}</span>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,0.18)',flexShrink:0}}>/ {SECS.length}</span>
        </div>
        <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
          {SECS.map((_,i)=>(
            <div key={i} onClick={()=>goTo(i)} style={{
              width:i===active?'24px':'6px',height:'6px',borderRadius:'3px',
              background:i===active?C.lime:i<active?'rgba(184,217,53,0.3)':'rgba(255,255,255,0.15)',
              cursor:'pointer',
              transition:'width 0.3s cubic-bezier(0.16,1,0.3,1),background 0.2s',
              flexShrink:0,
            }}/>
          ))}
        </div>
      </div>
      <button onClick={()=>goTo(active+1)} disabled={active===SECS.length-1} style={BtnStyle(active===SECS.length-1,true)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke={active===SECS.length-1?'rgba(255,255,255,0.2)':C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
};

/* ═══ READING PROGRESS BAR (sticky top — replaces TopBar) ════════════════ */
const ReadingProgressBar=({coverRef})=>{
  const[pct,setPct]=useState(0);
  const[logoVisible,setLogoVisible]=useState(false);
  useEffect(()=>{
    const fn=()=>{
      const doc=document.documentElement;
      const scrolled=doc.scrollTop||document.body.scrollTop;
      const total=doc.scrollHeight-doc.clientHeight;
      setPct(total>0?Math.min(100,(scrolled/total)*100):0);
      if(coverRef?.current){
        setLogoVisible(coverRef.current.getBoundingClientRect().bottom<0);
      }
    };
    window.addEventListener('scroll',fn,{passive:true});
    fn();
    return()=>window.removeEventListener('scroll',fn);
  },[coverRef]);
  const pctRounded=Math.round(pct);
  return(
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(13,26,16,0.05)',overflow:'hidden'}}>
      {/* v4: 3px progress line */}
      <div style={{position:'absolute',bottom:0,left:0,height:'3px',width:`${pct}%`,background:C.lime,transition:'width 0.1s linear',pointerEvents:'none'}}/>
      {/* Left: logo reveal + label */}
      <div style={{display:'flex',alignItems:'center',gap:'10px',minWidth:0,overflow:'hidden'}}>
        <div style={{overflow:'hidden',maxWidth:logoVisible?'180px':'0',opacity:logoVisible?1:0,transition:'max-width 0.38s cubic-bezier(0.16,1,0.3,1),opacity 0.3s ease',display:'flex',alignItems:'center',flexShrink:0}}>
          <Logo height={19} variant="dark"/>
          <div style={{width:'1px',height:'15px',background:C.border,margin:'0 12px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
          Sector Brief · Infrastructure &amp; Basic Services · Core · March 2026
        </span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>
          01 · Infrastructure
        </span>
        {/* v4: reading % shown after 5% scroll — desktop only */}
        {pct>5&&<span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,marginLeft:'4px',flexShrink:0}}>{pctRounded}%</span>}
      </div>
      {/* Right: CTAs */}
      <div style={{display:'flex',gap:'10px',alignItems:'center',flexShrink:0}}>
        <a href="#" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none',letterSpacing:'0.2px'}}>All Sectors →</a>
        <a href="#upsell" className="cta-primary" style={{background:C.forest,color:C.lime,padding:'7px 16px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.5px'}}>Full Package →</a>
      </div>
    </div>
  );
};

/* ═══ CAROUSEL (mobile-only swipe + dots) ═══════════════════════════════ */
const Carousel=({items,renderCard,cardClass='mob-snap-card',darkBg=false,wrapClass='car-wrap'})=>{
  const[active,setActive]=useState(0);
  const ref=useRef(null);
  const onScroll=()=>{
    const el=ref.current;if(!el)return;
    const idx=Math.min(Math.round(el.scrollLeft/(el.scrollWidth/items.length)),items.length-1);
    setActive(idx);
  };
  const goto=(i)=>{
    const el=ref.current;if(!el)return;
    el.scrollTo({left:(el.scrollWidth/items.length)*i,behavior:'smooth'});
    setActive(i);
  };
  return(
    <div className={`mob-car ${wrapClass}`} style={{marginTop:'16px',marginBottom:'4px'}}>
      <div ref={ref} onScroll={onScroll} className="mob-scroller">
        {items.map((item,i)=>(
          <div key={i} className={cardClass} style={{paddingBottom:'2px'}}>{renderCard(item,i)}</div>
        ))}
        <div style={{flex:'0 0 16px',minWidth:'16px'}}/>
      </div>
      <div style={{display:'flex',gap:'5px',justifyContent:'center',marginTop:'12px',alignItems:'center'}}>
        {items.map((_,i)=>(
          <div key={i} onClick={()=>goto(i)} style={{width:i===active?'22px':'7px',height:'7px',borderRadius:'4px',background:i===active?C.lime:(darkBg?'rgba(255,255,255,0.18)':C.border),cursor:'pointer',transition:'width 0.3s cubic-bezier(0.16,1,0.3,1),background 0.2s',flexShrink:0}}/>
        ))}
      </div>
    </div>
  );
};

/* ═══ SECTION HEADER (mobile accordion trigger) ═════════════════════════ */
const SecHdr=({num,label,badge,badgeColor=C.forest,badgeTx=C.lime,open,onToggle,dark=false,hint=''})=>(
  <button className="mob-sec-hdr" onClick={onToggle} style={{width:'100%',background:'transparent',border:'none',cursor:'pointer',padding:'0 0 16px',display:'flex',flexDirection:'column',gap:'5px',borderBottom:`1px solid ${dark?'rgba(255,255,255,0.1)':C.border}`,marginBottom:'18px',textAlign:'left'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:dark?'rgba(255,255,255,0.25)':C.faint,letterSpacing:'2.5px',textTransform:'uppercase'}}>{num}</span>
        <span style={{fontFamily:F.sans,fontSize:'15px',fontWeight:700,color:dark?C.paper:C.ink,letterSpacing:'-0.2px'}}>{label}</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0}}>
        {badge&&<span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:badgeTx,background:badgeColor,padding:'3px 10px',letterSpacing:'0.5px'}}>{badge}</span>}
        <span style={{fontFamily:F.sans,fontSize:'18px',color:dark?'rgba(255,255,255,0.3)':C.faint,transition:'transform 0.25s cubic-bezier(0.16,1,0.3,1)',display:'inline-block',transform:open?'rotate(0deg)':'rotate(-90deg)',lineHeight:1,marginLeft:'2px',fontWeight:300}}>↓</span>
      </div>
    </div>
    {!open&&hint&&<span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:dark?'rgba(255,255,255,0.25)':C.faint,paddingLeft:'0',lineHeight:1.55,marginTop:'1px'}}>{hint}</span>}
  </button>
);



/* ═══ MOBILE EXPAND/COLLAPSE ALL BAR ════════════════════════════════════ */
const MobExpandBar=({allOpen,onToggle})=>(
  <div className="mob-expand-all" style={{display:'none',background:C.ink,borderBottom:'1px solid rgba(184,217,53,0.12)',padding:'10px 18px',alignItems:'center',justifyContent:'space-between',gap:'10px'}}>
    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
      <div style={{width:'5px',height:'5px',borderRadius:'50%',background:allOpen?C.lime:'rgba(255,255,255,0.2)',transition:'background 0.2s'}}/>
      <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(255,255,255,0.35)',letterSpacing:'0.5px'}}>
        {allOpen?'All sections open':'All sections collapsed'}
      </span>
    </div>
    <button onClick={onToggle} style={{background:'transparent',border:'1px solid rgba(184,217,53,0.3)',padding:'6px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.lime,cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
      {allOpen?'Collapse All ↑':'Expand All ↓'}
    </button>
  </div>
);

/* ═══ COVER ══════════════════════════════════════════════════════════════ */
const Cover=({logoRef})=>(
  <div>
    <div className="pad-cover" style={{background:C.ink,padding:'28px 64px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'32px',top:'-8px',fontFamily:F.display,fontSize:'clamp(100px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.022)',lineHeight:1,userSelect:'none',pointerEvents:'none',letterSpacing:'-6px'}}>01</div>
      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)',backgroundSize:'28px 28px',pointerEvents:'none'}}/>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div ref={logoRef} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <Logo height={26} variant="white"/>
            <div style={{width:'1px',height:'18px',background:'rgba(255,255,255,0.15)'}}/>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',color:'rgba(255,255,255,0.3)',textTransform:'uppercase'}}>Sector Intelligence Brief · Full Members Edition</span>
          </div>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'2px',textTransform:'uppercase',border:'1px solid rgba(184,217,53,0.3)',padding:'3px 10px'}}>Members</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'22px'}}>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:800,padding:'5px 12px',letterSpacing:'1.5px'}}>SECTOR 01 OF 12</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.08)'}}/>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.2)'}}>{S.edition}</span>
        </div>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(36px,6vw,78px)',fontWeight:900,color:C.paper,lineHeight:0.95,letterSpacing:'-2.5px',marginBottom:'8px'}}>Infrastructure</h1>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,4vw,52px)',fontWeight:700,color:'rgba(250,248,243,0.38)',lineHeight:1,letterSpacing:'-1.5px',marginBottom:'20px'}}>&amp; Basic Services</h2>
        <p style={{fontFamily:F.body,fontSize:'clamp(13px,1.6vw,16px)',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.7,maxWidth:'560px',marginBottom:'0'}}>{S.tagline}</p>
        <div className="cover-stats stats-row" style={{display:'flex',gap:'0',borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'28px',flexWrap:'wrap'}}>
          <div style={{background:'rgba(184,217,53,0.07)',padding:'20px 24px',minWidth:'170px',borderRight:'1px solid rgba(255,255,255,0.06)',flex:'0 0 170px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',marginBottom:'8px'}}>BRIDGE Impact Score™</div>
            <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'8px'}}>
              <span style={{fontFamily:F.mono,fontSize:'52px',fontWeight:400,color:C.lime,lineHeight:1}}>{S.score}</span>
              <span style={{fontFamily:F.mono,fontSize:'14px',color:'rgba(184,217,53,0.45)'}}>/100</span>
            </div>
            <div style={{height:'3px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',marginBottom:'7px',overflow:'hidden'}}>
              <div className="score-bar" style={{'--w':`${S.score}%`,height:'100%',width:`${S.score}%`,background:C.lime,borderRadius:'2px'}}/>
            </div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>{S.tier} Tier</div>
          </div>
          {S.stats.map((d,i)=>(
            <div key={i} className="hm mob-stat" style={{padding:'20px 22px',borderRight:i<3?'1px solid rgba(255,255,255,0.06)':'none',flex:1,minWidth:0,display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.26)',marginBottom:'8px'}}>{d.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'clamp(14px,1.8vw,20px)',color:C.paper,lineHeight:1}}>{d.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{height:'3px',background:C.lime,marginTop:'0',opacity:0.9}}/>
    </div>
  </div>
);

/* ═══ EXECUTIVE SUMMARY ══════════════════════════════════════════════════ */
const Executive=()=>{
  const[sdOpen,setSdOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(true);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-exec" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="00" label="Executive Summary" badge={`Score ${S.score}`} hint="$1.9B post-harvest loss · GH₵8.4B+ budget alignment · highest-conviction co-investment in the portfolio" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{maxWidth:'900px',display:'grid',gridTemplateColumns:'2fr 1fr',gap:'48px'}} className="tc">
        <div>
          <div className="sec-rule mob-hide"/>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Executive Summary</div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.summary}</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.summary2}</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300}}>{S.summary3}</p>
          <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',marginTop:'28px',paddingTop:'2px'}}>
            <p style={{fontFamily:F.display,fontSize:'18px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>{S.quote}</p>
            <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'18px',height:'1px',background:C.lime}}/>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Sector Assessment, 2026</span>
            </div>
          </div>
        </div>
        <div>
          <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <button className="mob-toggle mob-toggle-hdr" onClick={()=>setSdOpen(o=>!o)} style={{display:'block',width:'100%',background:C.forest,padding:'12px 16px',border:'none',cursor:'pointer',textAlign:'left'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span>Score Breakdown</span>
                <span className="mob-show" style={{display:'none',fontSize:'12px',color:'rgba(184,217,53,0.5)',transform:sdOpen?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
              </div>
              <div style={{fontFamily:F.mono,fontSize:'26px',color:C.paper}}>{S.score} <span style={{fontSize:'11px',color:'rgba(250,248,243,0.35)'}}>/100</span></div>
            </button>
            {S.scoreDims.map((dim,i)=>(
              <div key={i} className={i>=1?sdOpen?'':'mob-item-hidden':''} style={{padding:'11px 14px',borderBottom:i<3?`1px solid ${C.border}`:'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px',alignItems:'center'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:C.ink}}>{dim.d}</span>
                  <span style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:C.forest}}>{dim.s}</span>
                </div>
                <div style={{height:'4px',background:C.border,borderRadius:'2px',overflow:'hidden',marginBottom:'4px'}}>
                  <div className="score-bar-dim" style={{'--w':`${dim.s}%`,height:'100%',width:`${dim.s}%`,background:dim.s>=85?C.lime:dim.s>=75?C.limeDark:C.amber,borderRadius:'2px'}}/>
                </div>
                <div style={{fontFamily:F.mono,fontSize:'9px',color:C.faint,letterSpacing:'0.5px'}}>Weight: {dim.w}</div>
              </div>
            ))}
          </div>
          <div style={{border:`1px solid ${C.border}`,borderTop:'none',padding:'14px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Sector Snapshot</div>
            {S.snapshot.map((s,i)=>(
              <div key={i} className="row-hover" style={{display:'flex',justifyContent:'space-between',
                padding:'7px 10px',marginLeft:'-10px',marginRight:'-10px',
                borderBottom:i<5?`1px solid ${C.border}`:'none',
                background:i%2===0?'transparent':C.paperDark}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{s.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,
                  color:i===0?C.positive:i===1?C.lime:C.forest}}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

/* ═══ SUB-SECTOR LANDSCAPE ═══════════════════════════════════════════════ */
const SubSectors=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-subs" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="01" label="Sub-Sector Landscape" badge="6 sub-sectors" hint="Market digitisation, WASH, energy, waste, roads, IoT — scored by BRIDGE Impact Score™ methodology" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Sub-Sector Landscape</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 sub-sectors assessed</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Where BRIDGE Scores the Opportunity</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Each sub-sector is scored on market opportunity, implementation feasibility, development impact, and financial sustainability. BRIDGE Impact Score™ methodology applied consistently across all 174+ ventures in the full portfolio.</p>
        <div className="subs-table">
          <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <div style={{display:'grid',gridTemplateColumns:'2fr 70px 110px 90px 1.5fr',background:C.forest}}>
              {['Sub-Sector','Score','Stage','Capital','BRIDGE Note'].map((h,i)=>(
                <div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
              ))}
            </div>
            {S.subs.map((sub,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 70px 110px 90px 1.5fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
                <div style={{padding:'11px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{sub.name}</div>
                <div style={{padding:'11px 14px',borderLeft:`1px solid ${C.border}`}}>
                  <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:sub.score>=85?C.positive:sub.score>=75?C.limeDark:C.amber}}>{sub.score}</div>
                  <div style={{height:'3px',background:C.border,borderRadius:'2px',marginTop:'4px',overflow:'hidden'}}><div style={{height:'100%',width:`${sub.score}%`,background:sub.score>=85?C.lime:sub.score>=75?C.limeDark:C.amber,borderRadius:'2px'}}/></div>
                </div>
                <div style={{padding:'11px 14px',borderLeft:`1px solid ${C.border}`}}>
                  <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest,border:`1px solid ${C.border}`,padding:'2px 7px'}}>{sub.stage}</span>
                </div>
                <div style={{padding:'11px 14px',fontFamily:F.mono,fontSize:'11px',color:C.forest,fontWeight:700,borderLeft:`1px solid ${C.border}`}}>{sub.capital}</div>
                <div style={{padding:'11px 14px',fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{sub.note}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="subs-cards">
          {S.subs.map((sub,i)=>(
            <div key={i} style={{border:`1px solid ${C.border}`,background:C.paper,padding:'12px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'4px',lineHeight:1.3}}>{sub.name}</div>
              <div style={{fontFamily:F.mono,fontSize:'16px',fontWeight:700,color:sub.score>=85?C.positive:sub.score>=75?C.limeDark:C.amber,marginBottom:'2px'}}>{sub.score}</div>
              <div style={{fontFamily:F.mono,fontSize:'10px',color:C.forest,marginBottom:'4px'}}>{sub.capital}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic',lineHeight:1.4}}>{sub.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ STRUCTURAL PROBLEM ═════════════════════════════════════════════════ */
const StructuralProblem=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-problem" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="02" label="The Governance Failure" badge="21 Deaths / Day" hint="WASH coverage gap · funding collapse · governance failure mechanisms · asset-backed model response" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 02 — The Governance Failure</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>7,653 preventable deaths/year · 95% donor dependency</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>The Infrastructure Deficit Is a Governance Problem</h2>
        <Fig01WashCoverage/>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px',marginBottom:'28px'}} className="tc">
          <div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana\'s WASH deficit is not a natural condition — it is the accumulated result of governance failures, funding collapse, and systemic neglect of the infrastructure that keeps citizens alive. 87.7% of Ghanaians have access to basic water services. Only 44.4% have safely managed water. That 43-point gap — between access and safety — is where 7,653 people a year die.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>In 2022, the government financed 27% of WASH expenditure. By 2024, that figure had collapsed to 5%. Donor dependency now stands at 95%. This is not a fiscal crisis — it is a political economy failure. Infrastructure spending that does not generate visible ribbon-cutting moments or create procurement opportunities for politically-connected contractors gets systematically defunded.</p>
            <Fig02FundingCollapse/>
            <div style={{background:C.forest,padding:'16px 20px',marginTop:'8px'}}>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.7}}>BRIDGE\'s response is not to compete for contracts in a captured procurement system. It is to deploy asset-backed direct operations that generate revenue, create community accountability, and build the performance data that makes political interference structurally costly.</p>
              <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>The BRIDGE Thesis</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',alignContent:'start'}}>
            {[{v:'7,653',l:'Preventable deaths\nannually — WASH'},{v:'44.4%',l:'Safely managed\nwater access'},{v:'23%',l:'Open defecation\nnational rate'},{v:'10%',l:'Solid waste\nproperly collected'}].map((s,i)=>(
              <div key={i} style={{background:C.ink,padding:'14px 12px',textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'clamp(16px,2.2vw,24px)',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'5px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',whiteSpace:'pre-line',lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>The Six Governance Failure Mechanisms</div>
        {/* Mobile carousel */}
        <Carousel items={S.governance} darkBg={false} renderCard={(row,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px 16px',height:'100%'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
              <div style={{width:'28px',height:'28px',background:C.forest,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'13px',color:C.lime,fontFamily:F.mono,fontWeight:700}}>{i+1}</div>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink}}>{row.c}</div>
            </div>
            <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.65}}>{row.harm}</div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>View all 6 failure mechanisms</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'160px 1fr',background:C.forest}}>
            {['Failure Mode','How BRIDGE Addresses It'].map((h,i)=><div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>)}
          </div>
          {S.governance.map((row,i)=>(
            <div key={i} className={`row-hover ${i>=1?open?'':'mob-item-hidden':''}`} style={{display:'grid',gridTemplateColumns:'160px 1fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
              <div style={{padding:'10px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{row.c}</div>
              <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55,borderLeft:`1px solid ${C.border}`}}>{row.harm}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>Ghana\'s infrastructure deficit is not a technical problem or a financing problem. It is a governance problem. Solutions that ignore the patronage systems and weak enforcement mechanisms that perpetuate the status quo will fail regardless of capital availability. — BRIDGE Infrastructure Sector Analysis, 2026</div>
        {/* Core Strategic Finding stat strip — 4 key numbers */}
        <div className="fig-scroll" style={{marginTop:'20px'}}>
        <div style={{minWidth:'480px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'1px',background:C.border,border:`1px solid ${C.border}`}}>
          {[
            {v:'44.4%',l:'Safely managed water — against 87.7% basic access',c:C.amber},
            {v:'23%',l:'Open defecation nationally — 72% in Northern Region',c:C.red},
            {v:'10%',l:'Solid waste properly collected — 12,710 tonnes/day generated',c:C.red},
            {v:'32%',l:'ECG system losses — power purchased but not delivered',c:C.amber},
          ].map((s,i)=>(
            <div key={i} style={{background:C.paperDark,padding:'12px 14px'}}>
              <div style={{fontFamily:F.mono,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:s.c,lineHeight:1,marginBottom:'6px'}}>{s.v}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:C.muted,lineHeight:1.4}}>{s.l}</div>
            </div>
          ))}
        </div>
        </div>
        {/* Members Intelligence — Model Markets Callout */}
        <div style={{marginTop:'28px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · District Assembly Deployment</div>
              <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Model Markets Mandate — 260+ Districts Available Now</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'24px',color:C.lime}}>260+</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'1px',textTransform:'uppercase'}}>districts available</div></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderTop:`1px solid rgba(255,255,255,0.06)`}} className="tc">
            {S.scalingStages.map((stage,i)=>(
              <div key={i} style={{padding:'14px 18px',borderRight:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
                <div style={{width:'24px',height:'4px',background:i===0?C.lime:i===1?C.amber:C.muted,marginBottom:'8px'}}/>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'4px'}}>{stage.stage} · {stage.title}</div>
                <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'4px'}}>{stage.period}</div>
                <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5}}>{stage.scope}</div>
              </div>
            ))}
          </div>
          <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
            <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.6,margin:0}}>BRIDGE must formally apply as preferred service delivery partner under the Model Markets mandate before district assemblies commit DACF allocations to alternative providers. The Q1 2026 window is open — first-mover positioning cannot be recovered once district procurement cycles begin.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ CROP ANALYSIS ══════════════════════════════════════════════════════ */
const WashCrisis=()=>{
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-wash" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="03" label="The WASH Crisis" badge="7,653 Deaths/yr" hint="WASH coverage vs SSA · funding collapse 27%→5% · Ghana infrastructure comparative position" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div className="sec-rule mob-hide"/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 03 — The WASH Crisis</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Ghana vs. the Region — Where the Investment Case Is Strongest</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana outperforms some peers and underperforms others. The pattern reveals where mortality risk is concentrated and where the return on BRIDGE\'s infrastructure intervention is highest. The comparative position is not discouraging — it is a map of opportunity.</p>
      <Fig04GhanaSSA/>
      {/* BRIDGE Comparative Position callout */}
      <div style={{border:`2px solid ${C.forest}`,overflow:'hidden',marginBottom:'20px'}}>
        <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · Urban Flooding Crisis</div>
            <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Ghana\'s Flooding Is a Governance Failure, Not a Climate Event</div>
          </div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.sans,fontSize:'9px',fontWeight:800,padding:'3px 10px',letterSpacing:'1px',textTransform:'uppercase',flexShrink:0}}>2025 RESEARCH FINDING</div>
        </div>
        <div style={{padding:'16px 18px',background:'rgba(13,26,16,0.85)'}}>
          {[
            {stat:'52%',label:'of Accra flooding attributed to weak land use enforcement',color:C.amber},
            {stat:'0',label:'Statistical correlation found between increased rainfall and flooding incidence',color:C.positive},
            {stat:'3',label:'Major wetlands encroached 2008–2018: Densu Delta, Sakumo, Songor',color:C.red},
          ].map((item,i)=>(
            <div key={i} style={{display:'flex',gap:'16px',alignItems:'center',padding:'10px 0',borderBottom:i<2?'1px solid rgba(255,255,255,0.07)':'none'}}>
              <div style={{fontFamily:F.mono,fontSize:'24px',fontWeight:700,color:item.color,flexShrink:0,minWidth:'50px'}}>{item.stat}</div>
              <div style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.55)',fontStyle:'italic',lineHeight:1.5}}>{item.label}</div>
            </div>
          ))}
        </div>
        <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6,margin:0}}>BRIDGE\'s drainage management ventures (Venture ⑬) address governance failure — not climate. The market catchment populations losing livelihoods to predictable, preventable flooding are the same populations BRIDGE\'s market infrastructure serves. Solving flooding protects the entire market infrastructure investment.</p>
        </div>
      </div>
      {/* Waste & Roads Opportunity */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginTop:'4px'}} className="tc">
        {[
          {title:'GH₵83B Waste Opportunity',body:'Ghana generates 12,710 tonnes of solid waste daily. Only 10% is properly collected. The recyclable waste potential is valued at GH₵83 billion annually — an asset being buried, burned, or dumped rather than converted into economic value. BRIDGE\'s Waste-to-Compost venture converts the market waste stream from Kejetia into a revenue-generating circular economy operation.'},
          {title:'Roads — The Last 49%',body:'Only 49% of Ghana\'s road network is maintained. The unmaintained 51% — concentrated in feeder roads serving rural markets and agricultural areas — directly undermines the return on every other BRIDGE investment. Without farm-to-market roads, cold storage becomes irrelevant. BRIDGE\'s PPP Road Maintenance venture addresses this through performance-based contracts in BRIDGE market catchment areas.'},
          {title:'Power — ECG\'s 32% Loss Rate',body:'ECG purchases power that 32% of it never reaches a paying customer — one of the highest system loss rates in Africa. BRIDGE\'s Solar Micro-Grid venture bypasses this entirely: off-grid solar-plus-battery provides independent power for Kejetia and replication markets. ECG unreliability is designed out of the system rather than relied upon.'},
          {title:'Sanitation — The Daily Crisis',body:'25.3% adequate sanitation access nationally. 72% open defecation in the Northern Region. BRIDGE\'s Public Toilet Networks venture addresses the most immediate dignitary crisis at markets and transport hubs — revenue-generating from day one via usage fees, lowest capital requirement in Tier 1, highest measurable daily impact per cedi invested.'},
        ].map((card,i)=>(
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'18px 20px',background:C.paper}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'8px'}}>{card.title}</div>
            <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.65,fontStyle:'italic'}}>{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  </div>
  );
}

/* ═══ KEJETIA FLAGSHIP ══════════════════════════════════════════════════ */
const KejetiaFlagship=()=>{
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-kejetia" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="04" label="The Flagship" badge="$17M · 10,000 vendors" hint="Kejetia 3-phase deployment · vendor platform economics · direct operation rationale · Peace & Prosperity outcomes" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':'sec-body-hidden'}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 04 — The Flagship</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>Kejetia · West Africa\'s Largest Market</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>Kejetia — Where the Model Lives</h2>
        <Fig03Kejetia/>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px',marginBottom:'28px'}} className="tc">
          <div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Kejetia Market in Kumasi is not just an infrastructure opportunity — it is the proof-of-concept location for everything BRIDGE believes about how infrastructure should work. The government has invested over $507M in physical construction across two phases. The market generates hundreds of millions in annual trade. And every single vendor still records transactions on paper, restocks from memory, and has no digital presence beyond the stall they physically occupy.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>BRIDGE establishes Kejetia Digital Markets Ltd. as a wholly-owned subsidiary deploying a vendor-first platform: inventory management, mobile money integration, supplier ordering, business analytics, and an online marketplace. Three-phase deployment over 36 months targets 10,000 active vendors at 80%+ monthly active rate — the threshold for platform sustainability via transaction-based revenue.</p>
            <div style={{background:C.forest,padding:'16px 20px',marginTop:'8px'}}>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.7}}>10,000 vendor families achieving economic stability. 8,000 children accessing better education funded by increased incomes. A market becoming a source of pride rather than a source of frustration. — BRIDGE Kejetia Impact Framework: Peace &amp; Prosperity Outcomes</p>
              <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>The Human Case</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',alignContent:'start'}}>
            {[{v:'$507M',l:'Government\nconstruction'},{v:'10,000+',l:'Vendors on\npaper today'},{v:'$17M',l:'BRIDGE platform\ninvestment'},{v:'15–20%',l:'Target\nIRR'}].map((s,i)=>(
              <div key={i} style={{background:C.ink,padding:'14px 12px',textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'clamp(14px,2.2vw,22px)',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'5px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',whiteSpace:'pre-line',lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Target Economics callout */}
        <div style={{border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:'24px'}}>
          <div style={{background:C.forest,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>Target Economics</div>
            <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.3)'}}>Phase 3 break-even · 36-month deployment</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
            {[
              {v:'$17M',l:'over 3 years',note:'Capital deployed across 3 phases'},
              {v:'15–20%',l:'target IRR',note:'Efficiency gains + transaction revenue + vendor service fees'},
              {v:'GH₵15–25',l:'vendor/month fee',note:'Break-even at 10,000 vendors at 80%+ MAR'},
            ].map((s,i)=>(
              <div key={i} style={{background:C.paper,padding:'14px 16px'}}>
                <div style={{fontFamily:F.mono,fontSize:'clamp(18px,2.2vw,26px)',fontWeight:700,color:C.forest,lineHeight:1,marginBottom:'3px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.muted,letterSpacing:'0.5px',marginBottom:'4px'}}>{s.l}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic',lineHeight:1.4}}>{s.note}</div>
              </div>
            ))}
          </div>
          <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
            <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.6,margin:0}}>Government partnership through the Model Markets mandate provides the co-investment structure — BRIDGE capital operating alongside DACF allocation rather than competing with it. The economics work because the market, the governance model, and 10,000 vendor relationships are already proven.</p>
          </div>
        </div>
        {/* Platform dimensions table */}
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>What the Platform Delivers — Five Transformation Dimensions</div>
        {/* Mobile: vertical stacked cards */}
        <div className="mob-only" style={{marginBottom:'20px'}}>
          {[
            {dim:'Inventory',detail:'Digital tracking replaces memory-based restocking. Reduces stockouts, ties up less capital, enables demand forecasting for the first time.'},
            {dim:'Payments',detail:'Mobile money integration ends cash-only transactions. Reduces theft risk, enables credit building, unlocks insurance products.'},
            {dim:'Market Access',detail:'Online marketplace extends vendor reach beyond physical stall. Customers find vendors remotely; delivery becomes possible.'},
            {dim:'Supply Chain',detail:'Aggregated purchasing eliminates per-vendor middleman extraction. Bulk discounts. Direct producer connections.'},
            {dim:'Financial Identity',detail:'Transaction history builds credit scores. Opens access to formal banking, vendor loans, and business insurance.'},
          ].map((row,i)=>(
            <div key={i} style={{borderBottom:i<4?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,padding:'12px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.forest,marginBottom:'4px'}}>{row.dim}</div>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55}}>{row.detail}</div>
            </div>
          ))}
        </div>
        {/* Desktop: 2-column table */}
        <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:'20px'}}>
          <div style={{display:'grid',gridTemplateColumns:'140px 1fr',background:C.forest}}>
            {['Dimension','Transformation'].map((h,i)=><div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>)}
          </div>
          {[
            {dim:'Inventory',detail:'Digital tracking replaces memory-based restocking. Reduces stockouts, ties up less capital, enables demand forecasting for the first time.'},
            {dim:'Payments',detail:'Mobile money integration ends cash-only transactions. Reduces theft risk, enables credit building, unlocks insurance products linked to transaction history.'},
            {dim:'Market Access',detail:'Online marketplace extends vendor reach beyond physical stall. Customers find vendors remotely; delivery becomes possible; off-peak revenue opens.'},
            {dim:'Supply Chain',detail:'Aggregated purchasing eliminates per-vendor middleman extraction. Bulk discounts. Direct producer connections that reduce input costs across 10,000 vendors.'},
            {dim:'Financial Identity',detail:'Transaction history builds credit scores. Opens access to formal banking, vendor loans, and business insurance — for the first time in a vendor\'s career.'},
          ].map((row,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:'140px 1fr',borderBottom:i<4?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
              <div style={{padding:'10px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{row.dim}</div>
              <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55,borderLeft:`1px solid ${C.border}`}}>{row.detail}</div>
            </div>
          ))}
        </div>
        {/* Why Direct Operation callout */}
        <div style={{marginTop:'8px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · Direct Operation Rationale</div>
              <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Why BRIDGE Operates Kejetia Directly — Not via a Partner</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderTop:`1px solid rgba(255,255,255,0.06)`}} className="tc">
            {[
              {title:'Strategic Control',body:'The platform is proof-of-concept infrastructure for BRIDGE\'s national replication model. It cannot be delegated to a partner whose incentives may not align with 260-district scale ambition.'},
              {title:'IRR Protection',body:'Partner extraction reduces platform economics. BRIDGE direct operation captures 100% of transaction revenue, vendor fees, and supply chain margin — the full model that makes replication financeable.'},
              {title:'Governance Accountability',body:'Community accountability requires BRIDGE to own the relationship with vendor associations and the Kumasi Metropolitan Assembly. A contractor cannot create the trust that direct operation builds.'},
            ].map((card,i)=>(
              <div key={i} style={{padding:'14px 18px',borderRight:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
                <div style={{width:'24px',height:'4px',background:C.lime,marginBottom:'8px'}}/>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'6px'}}>{card.title}</div>
                <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5}}>{card.body}</div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ REGIONAL COMPARISON ═══════════════════════════════════════════════ */
const RegionalComparison=()=>{
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-regional" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="05" label="Ghana vs. The Region" badge="5 dimensions" hint="Ghana vs SSA average · ECG 32% losses · urban flooding governance failure · waste opportunity" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':'sec-body-hidden'}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 05 — Ghana vs. The Region</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Where Ghana Leads, Where It Lags</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'16px',fontStyle:'italic'}}>Ghana outperforms some peers and underperforms others. The pattern reveals where the investment case is strongest — sanitation and solid waste are the sectors where mortality risk is highest and the governance failure is most directly addressable through BRIDGE\'s direct operation model.</p>
        <Fig04GhanaSSA/>
        <div style={{background:C.forest,padding:'14px 20px',marginBottom:'20px'}}>
          <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.65}}>Ghana\'s infrastructure performance is neither uniformly poor nor uniformly strong. The power access figure (85%) masks ECG\'s 32% system losses — the grid is connected but unreliable. The water access figure (87.7%) masks the 43-point gap to safely managed water. <strong style={{color:C.lime}}>BRIDGE operates at the gap between access and quality — the space where the governance failure is most costly and the intervention most profitable.</strong></p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}} className="tc">
          {[
            {title:'ECG System Losses — 32%',body:'One in three kilowatt-hours purchased by ECG never reaches a paying customer. The 32% system loss rate is partially recoverable through smart metering (Venture ⑭). BRIDGE\'s response is more direct: solar micro-grids that make market operations entirely independent of ECG reliability.'},
            {title:'Sanitation Below SSA Average',body:'Ghana\'s 25.3% adequate sanitation access sits below the Sub-Saharan Africa average. More strikingly, the 72% open defecation rate in the Northern Region against a 23% national average reveals extreme geographic concentration — exactly the zone where BRIDGE\'s Neighbourhood WASH Hubs are targeted.'},
            {title:'Waste — GH₵83B Uncaptured',body:'Ghana generates 12,710 tonnes of solid waste daily; only 10% collected. The GH₵83B annual recyclable value is not a development problem — it is an uncaptured business. BRIDGE\'s Waste-to-Compost venture converts market waste streams from Kejetia into a circular revenue model.'},
            {title:'Roads — 51% Unmaintained',body:'The majority of Ghana\'s road network is unmaintained. Concentrated in feeder roads serving rural markets and agricultural areas, this single gap undermines the return on every other BRIDGE sector investment. PPP Road Maintenance contracts (Venture ⑫) directly de-risk the entire market infrastructure portfolio.'},
          ].map((card,i)=>(
            <div key={i} style={{border:`1px solid ${C.border}`,padding:'18px 20px',background:C.paper}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'8px'}}>{card.title}</div>
              <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.65,fontStyle:'italic'}}>{card.body}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ POLICY WINDOW ═══════════════════════════════════════════════════════ */
const PolicyWindow=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-policy" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="06" label="Policy Window" badge="★★★★★" hint="GH₵30B Big Push · Model Markets mandate Q1 2026 · DACF multi-stream integration · Big Push pathway" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 06 — Policy Window</div>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.sans,fontSize:'9px',fontWeight:800,padding:'3px 10px',letterSpacing:'1px'}}>★★★★★ BUDGET ALIGNMENT</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The 2026 Budget — A Co-Investment Moment</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'14px',fontStyle:'italic'}}>The GH₵30B Big Push Infrastructure Programme is the largest single infrastructure commitment in Ghana\'s recent history — and it maps directly to BRIDGE\'s operating model. The Mahama administration\'s Build24 pillar represents a generational infrastructure commitment.</p>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>The most strategically significant line item for BRIDGE is not the GH₵30B headline — it is the Model Markets mandate that commits 25% of the District Assemblies Common Fund to 24-Hour Market development across 260+ districts. This is the policy infrastructure BRIDGE\'s approach has been waiting for.</p>
        <Fig05Budget/>
        <div style={{border:`2px solid ${C.lime}`,overflow:'hidden',marginTop:'4px'}}>
          <div style={{background:C.ink,padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px'}}>Time-Sensitive — Q1 2026 Entry Window</div>
              <div style={{fontFamily:F.display,fontSize:'clamp(14px,2vw,20px)',fontWeight:700,color:C.paper}}>Model Markets Mandate — Three-Stage Scaling Pathway</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'28px',fontWeight:500,color:C.lime,lineHeight:1}}>260+</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.3)',letterSpacing:'1px',textTransform:'uppercase'}}>districts available</div></div>
          </div>
          <button className="mob-toggle mob-toggle-hdr" onClick={()=>setOpen(o=>!o)} style={{width:'100%',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',display:'block',padding:'0'}}>
            <div style={{display:'flex',justifyContent:'space-between',padding:'8px 14px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(13,26,16,0.7)'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.3)',textTransform:'uppercase'}}>Stage</span>
              <span style={{display:'flex',gap:'40px'}}><span className="mob-show" style={{display:'none',fontSize:'10px',color:'rgba(184,217,53,0.5)',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.3)',textTransform:'uppercase'}}>Scope &amp; Timeline</span></span>
            </div>
          </button>
          {S.scalingStages.map((row,i)=>(
            <div key={i} className={i>=1?open?'':'mob-item-hidden':''} style={{display:'grid',gridTemplateColumns:'90px 1fr',justifyContent:'space-between',padding:'0',borderBottom:i<2?'1px solid rgba(255,255,255,0.06)':'none',background:'rgba(13,26,16,0.75)'}}>
              <div style={{padding:'12px 14px',borderRight:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.lime}}>{row.stage}</div>
                <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.5)',marginTop:'2px'}}>{row.period}</div>
              </div>
              <div style={{padding:'12px 14px'}}>
                <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,marginBottom:'4px'}}>{row.title}</div>
                <div style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.45)',fontStyle:'italic',lineHeight:1.55}}>{row.scope}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:'16px',padding:'14px 18px',background:C.paperDark,border:`1px solid ${C.border}`}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>DACF Integration Model</div>
          <p style={{fontFamily:F.body,fontSize:'13px',color:C.muted,lineHeight:1.65,fontStyle:'italic'}}>BRIDGE can approach District Assemblies with integrated packages that coordinate across multiple DACF allocations — a Model Market that integrates CHPS compound, vocational training, and WASH infrastructure, drawing from market (25%), health (10%), education (10%), and water (10%) allocations simultaneously. A single BRIDGE deployment can capture four DACF streams no single-mandate operator can access.</p>
        </div>
        <Fig09DACFStack/>
      </div>
    </div>
    </div>
  );
};

/* ═══ SYSTEM INTEGRATION ════════════════════════════════════════════════ */
const SystemIntegration=()=>{
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-system" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="07" label="Infrastructure as Enabler" badge="8 sectors" hint="Cross-sector integration · BRIDGE portfolio dependency map · Kejetia as integration hub" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div className="sec-rule mob-hide"/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 07 — Infrastructure as Enabler</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The Prerequisite Sector</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Infrastructure is not a sector — it is the prerequisite for every other sector. Without reliable power, markets, roads, and WASH, every other BRIDGE investment underperforms. Kejetia is not just BRIDGE\'s flagship infrastructure investment. It is the integration hub for Financial Inclusion, Technology, Agriculture, and every sector whose beneficiaries pass through a market.</p>
      <Fig08CrossSector/>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'32px'}} className="tc">
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',marginTop:'28px',paddingTop:'2px'}}>
          <p style={{fontFamily:F.display,fontSize:'17px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"{S.quote.replace(/^"|"$/g,'')}"</p>
          <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE Infrastructure Sector Analysis, 2026</div>
        </div>
        <div style={{background:C.ink,padding:'18px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Portfolio Multiplier Effect</div>
          {[{l:'Sectors directly enabled',v:'8 of 12'},{l:'Ventures dependent on WASH',v:'3 direct'},{l:'Ventures dependent on power',v:'7+ ventures'},{l:'Feeder road dependent ventures',v:'All agri + logistics'},{l:'Kejetia integration points',v:'5 sectors'}].map((row,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:i<4?'1px solid rgba(255,255,255,0.06)':'none'}}>
              <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>{row.l}</span>
              <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.paper,textAlign:'right',maxWidth:'55%'}}>{row.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

/* ═══ VENTURE PIPELINE ═══════════════════════════════════════════════════ */
const VenturePipeline=()=>{
  const[t1o,setT1o]=useState(false);
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  const[t2o,setT2o]=useState(false);
  const t1=S.ventures.filter(v=>v.tier===1);
  const t2=S.ventures.filter(v=>v.tier===2);
  const t3=S.ventures.filter(v=>v.tier===3);
  const VRow=({v,i,last})=>(
    <div style={{display:'grid',gridTemplateColumns:'28px 2fr 88px 80px 70px 70px 70px 70px',borderBottom:!last?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
      <div style={{padding:'9px 6px',fontFamily:F.mono,fontSize:'11px',color:C.lime,textAlign:'center',background:C.forest}}>{v.num}</div>
      <div style={{padding:'9px 12px',borderLeft:`1px solid ${C.border}`}}>
        <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{v.name}</div>
        <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',lineHeight:1.4}}>{v.desc}</div>
      </div>
      <div style={{padding:'8px 10px',borderLeft:`1px solid ${C.border}`}}>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,padding:'2px 6px',letterSpacing:'0.3px',background:MODE_BG[v.mode]||C.muted,color:MODE_TX[v.mode]||C.paper}}>{v.mode}</span>
      </div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'11px',color:C.forest,fontWeight:700,borderLeft:`1px solid ${C.border}`}}>{v.capital}</div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'11px',color:C.positive,borderLeft:`1px solid ${C.border}`}}>{v.irr}</div>
      <div style={{padding:'8px 10px',borderLeft:`1px solid ${C.border}`}}><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[v.risk]||C.muted,letterSpacing:'0.3px'}}>{v.risk}</span></div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'11px',color:C.muted,borderLeft:`1px solid ${C.border}`}}>{v.payback}</div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'10px',color:C.faint,borderLeft:`1px solid ${C.border}`}}>{v.start}</div>
    </div>
  );
  const TH=()=>(
    <div style={{display:'grid',gridTemplateColumns:'28px 2fr 88px 80px 70px 70px 70px 70px',background:C.forest}}>
      {['#','Venture','Mode','Capital','IRR','Risk','Payback','Start'].map((h,i)=>(
        <div key={i} style={{padding:'7px 10px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
      ))}
    </div>
  );
  const MCard=({v})=>(
    <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'12px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
        <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{v.name}</span>
        <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.forest}}>{v.num}</span>
      </div>
      <div style={{fontFamily:F.mono,fontSize:'11px',color:C.forest,marginBottom:'2px'}}>{v.capital}</div>
      <div style={{fontFamily:F.mono,fontSize:'10px',color:C.positive,marginBottom:'4px'}}>{v.irr}</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[v.risk]||C.muted}}>{v.risk} RISK</span>
        <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>{v.start}</span>
      </div>
    </div>
  );
  return(
    <div id="sec-ventures" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="08" label="Venture Portfolio" badge="18 ventures" hint="Tier 1: $8–25M+ · Kejetia Platform anchor · 7 direct market infrastructure ventures" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 08 — The Portfolio</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'5px 14px',letterSpacing:'1px'}}>18 ventures · $8–15M direct + replication</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>18 Ventures Across 3 Tiers</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Anchored by the Kejetia Digital Platform — the crown jewel — and sequenced to build from proven market infrastructure toward broader service delivery systems. Each Tier 1 venture is either a Kejetia direct operation or a prerequisite for replication.</p>
        <Fig06Matrix/>
        {/* Tier 1 */}
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 1</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Priority Implementation — 2026–2028</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$8–25M+ · 7 ventures</span>
          </div>
          <p style={{fontFamily:F.body,fontSize:'13px',color:C.muted,lineHeight:1.7,fontStyle:'italic',marginBottom:'12px'}}>Seven ventures totaling $8–25M+. Kejetia is the anchor. All other Tier 1 ventures are either prerequisites for Kejetia replication — Market Resilience Platform, Solar Micro-Grid, Fire Safety Systems — or fast-payback service delivery plays that validate BRIDGE's model at lower capital exposure: Public Toilets, Cold Storage, Waste-to-Compost. Every Tier 1 venture is deployable Q1–Q4 2026.</p>
          <div className="subs-table">
            <div className="fig-scroll"><div style={{minWidth:'700px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
              <TH/>
              <button className="mob-toggle mob-toggle-hdr" onClick={()=>setT1o(o=>!o)} style={{width:'100%',background:'rgba(184,217,53,0.04)',border:'none',cursor:'pointer',textAlign:'left',padding:'6px 12px',display:'flex',justifyContent:'space-between',borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.limeDark,letterSpacing:'1.5px',textTransform:'uppercase'}}>Tap to expand all</span>
                <span className="mob-show" style={{display:'none',fontSize:'10px',color:C.limeDark,transform:t1o?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
              </button>
              {t1.map((v,i)=><VRow key={i} v={v} i={i} last={i===t1.length-1}/>)}
            </div></div>
          </div>
          <Carousel items={t1} renderCard={(v,i)=><MCard v={v}/>} cardClass="mob-snap-sm"/>
        </div>
        {/* Tier 2 */}
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.amber,color:C.white,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 2</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Scale Phase — 2027–2029</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$5–10M · 6 ventures</span>
          </div>
          <div className="subs-table">
            <div className="fig-scroll"><div style={{minWidth:'700px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
              <TH/>
              <button className="mob-toggle mob-toggle-hdr" onClick={()=>setT2o(o=>!o)} style={{width:'100%',background:'rgba(184,115,10,0.04)',border:'none',cursor:'pointer',textAlign:'left',padding:'6px 12px',display:'flex',justifyContent:'space-between',borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.amber,letterSpacing:'1.5px',textTransform:'uppercase'}}>Tap to expand all</span>
                <span className="mob-show" style={{display:'none',fontSize:'10px',color:C.amber,transform:t2o?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
              </button>
              {t2.map((v,i)=><VRow key={i} v={v} i={i} last={i===t2.length-1}/>)}
            </div></div>
          </div>
          <Carousel items={t2} renderCard={(v,i)=><MCard v={v}/>} cardClass="mob-snap-sm"/>
        </div>
        {/* Tier 3 */}
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.muted,color:C.paper,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 3</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Long-Term / Conditional — 2030+</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$5.8–11.6M · 4 ventures</span>
          </div>
          <div className="subs-table">
            <div className="fig-scroll"><div style={{minWidth:'700px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
              <TH/>
              {t3.map((v,i)=><VRow key={i} v={v} i={i} last={i===t3.length-1}/>)}
            </div></div>
          </div>
          <Carousel items={t3} renderCard={(v,i)=><MCard v={v}/>} cardClass="mob-snap-sm"/>
        </div>
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>Mode: Direct Op = BRIDGE operates directly · Partnership = co-delivery with sector partner · Investment = equity or quasi-equity · Guidance = advisory and technical assistance</div>
      </div>
    </div>
    </div>
  );
};

/* ═══ DEPLOYMENT TIMELINE ════════════════════════════════════════════════ */
const DeploymentTimeline=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  const phases=[S.timeline.phase1,S.timeline.phase2,S.timeline.phase3];
  const pColors=[C.lime,C.amber,C.muted];
  const pBg=[C.forest,C.paperDark,C.paper];
  const pTx=[C.paper,C.ink,C.ink];
  return(
    <div id="sec-roadmap" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="09" label="Deployment Roadmap" badge="3 phases" hint="Q1 2026 start · phase-by-phase milestones · critical path dependencies" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 09 — Implementation</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Deployment Roadmap</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced deployment built around the Model Markets mandate Q1 2026 filing deadline and the DACF allocation cycle. Kejetia and Market Resilience Platform launch simultaneously — establishing BRIDGE as the market infrastructure partner before district assemblies commit DACF to alternative providers.</p>
        <Fig07Roadmap/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0',border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:'20px'}} className="tc">
          {phases.map((p,i)=>(
            <div key={i} style={{borderRight:i<2?`1px solid ${C.border}`:'none'}}>
              <div style={{background:pBg[i],padding:'14px 18px',borderBottom:`3px solid ${pColors[i]}`}}>
                <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:pColors[i],letterSpacing:'1px',marginBottom:'2px'}}>{p.label}</div>
                <div style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:pTx[i]}}>{p.years}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:i===0?'rgba(250,248,243,0.45)':C.faint}}>{p.capital} · {p.count}</div>
              </div>
              <div style={{padding:'14px 18px',background:C.paper}}>
                <button className="mob-toggle" onClick={()=>setOpen(o=>!o)} style={{marginBottom:'6px',width:'100%',display:'none',alignItems:'center',justifyContent:'space-between',background:'transparent',border:'none',borderBottom:`1px solid ${C.border}`,cursor:'pointer',padding:'6px 0',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted}}>
                  <span>{p.count}</span><span style={{fontSize:'10px',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
                </button>
                {p.items.map((item,j)=>(
                  <div key={j} className={j>=2?open?'':'mob-item-hidden':''} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'flex-start'}}>
                    <span style={{color:pColors[i],flexShrink:0,fontWeight:700,fontSize:'12px',lineHeight:1.4}}>→</span>
                    <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'18px 20px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Critical Path Dependencies</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}} className="tc">
            {[{m:'Kejetia Platform',d:'1,000-vendor pilot launched + KPI framework operational'},
              {m:'Cold Chain Network',d:'AkoFresh partnership signed + off-grid power confirmed per site'},
              {m:'DACF Application',d:'Model Markets partnership applications filed with district assemblies'},
              {m:'Phase 2 Processing',d:'Phase 1 supply relationships proven + management capacity built'}
            ].map((dep,i)=>(
              <div key={i} style={{padding:'8px 0',borderBottom:`1px solid ${C.border}`,display:'flex',gap:'10px'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,flexShrink:0,minWidth:'120px'}}>{dep.m}</span>
                <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic'}}>{dep.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ CO-INVESTMENT LANDSCAPE ════════════════════════════════════════════ */
const CoInvestmentLandscape=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  const coInvestors=[
    {name:'World Bank / IDA',type:'Concessional Loan',focus:'Urban infrastructure, WASH systems, market development across Sub-Saharan Africa',alignment:'Phase 1–2 WASH and market infrastructure',capital:'$20–100M',stage:'Active in Ghana'},
    {name:'African Development Bank',type:'Project Finance',focus:'Infrastructure development, market systems, urban services across Africa',alignment:'Phase 1 Kejetia + Phase 2 WASH hubs',capital:'$10–50M',stage:'Seeking co-investors'},
    {name:'USAID / DCA',type:'Credit Guarantee',focus:'De-risking private investment in market infrastructure and service delivery',alignment:'Phase 1 guarantee structure for Kejetia',capital:'Credit facility',stage:'Active in Ghana'},
    {name:'GWCL / Utility Partners',type:'JV / Concession',focus:'Water service delivery in urban and peri-urban areas — operational mandate not financing',alignment:'Phase 3 Utility JV conditioned on Phase 1',capital:'Operational JV',stage:'Government-backed'},
    {name:'GIZ / German Development',type:'Technical Assistance',focus:'Market systems strengthening, WASH governance, procurement reform',alignment:'Kejetia governance framework + WASH hub design',capital:'Technical TA',stage:'Active governance programme'},
    {name:'District Assemblies',type:'Government Co-finance',focus:'DACF deployment for market, health, education, WASH infrastructure',alignment:'All phases — 4-stream DACF bundling',capital:'GH₵ DACF',stage:'Q1 2026 mandate active'},
  ];
  return(
    <div id="sec-coinvest" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="10" label="Co-Investment Landscape" badge="6 partners" hint="World Bank · AfDB · USAID · District Assemblies · GIZ · Utility JVs" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':'sec-body-hidden'}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 10 — Co-Investment Landscape</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Is Already Deploying Capital Here</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'16px',fontStyle:'italic'}}>Infrastructure attracts the largest development finance flows in Ghana. BRIDGE\'s strategy is not to compete with these actors — it is to occupy the direct operation layer they cannot and to position BRIDGE-operated assets as co-investment anchors for their capital.</p>
        <div style={{background:C.forest,padding:'14px 20px',marginBottom:'20px'}}>
          <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.65}}>Development finance builds grey infrastructure. Technology companies build digital platforms. Neither operates market infrastructure directly at the community level where the governance failure occurs. <strong style={{color:C.lime}}>BRIDGE operates at the direct service delivery layer — the gap between capital and impact that no development partner or technology company fills.</strong></p>
        </div>
        <Carousel items={coInvestors} wrapClass="car-wrap" renderCard={(co,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden'}}>
            <div style={{background:C.ink,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}>
              <span style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper}}>{co.name}</span>
              <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.3)',flexShrink:0}}>{co.type}</span>
            </div>
            <div style={{padding:'14px 14px'}}>
              <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6,marginBottom:'12px',fontStyle:'italic'}}>{co.focus}</p>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,background:C.forest,display:'inline-block',padding:'2px 8px',marginBottom:'6px'}}>BRIDGE Alignment</div>
                <p style={{fontFamily:F.sans,fontSize:'12px',color:C.forest,fontWeight:600,lineHeight:1.5}}>{co.alignment}</p>
              </div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>View all 6 co-investors</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
          {coInvestors.map((co,i)=>(
            <div key={i} className={i>=2?open?'':'mob-item-hidden':''} style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden'}}>
              <div style={{background:C.ink,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}>
                <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>{co.name}</span>
                <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.3)',flexShrink:0}}>{co.type}</span>
              </div>
              <div style={{padding:'12px 14px'}}>
                <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6,marginBottom:'10px',fontStyle:'italic'}}>{co.focus}</p>
                <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'9px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,background:C.forest,display:'inline-block',padding:'2px 8px',marginBottom:'5px'}}>BRIDGE Alignment</div>
                  <p style={{fontFamily:F.sans,fontSize:'11px',color:C.forest,fontWeight:600,lineHeight:1.5}}>{co.alignment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Closing proof-of-concept thesis — the narrative climax of the brief */}
        <div style={{marginTop:'24px',background:C.ink,padding:'24px 28px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>BRIDGE Infrastructure · Core Theory of Change</div>
          <p style={{fontFamily:F.display,fontSize:'clamp(14px,2vw,18px)',fontStyle:'italic',fontWeight:600,color:C.paper,lineHeight:1.6,marginBottom:'12px'}}>The Kejetia Market Digital Platform is BRIDGE\'s proof of concept for an entire theory of change: that transparent, accountable, asset-backed infrastructure investment can serve Ghanaian citizens at scale, generate competitive financial returns, and create the digital and physical foundation upon which every other sector investment compounds.</p>
          <p style={{fontFamily:F.body,fontSize:'13px',color:'rgba(250,248,243,0.45)',fontStyle:'italic',lineHeight:1.65}}>When BRIDGE invests in infrastructure, it does not compete for contracts in a captured procurement system. It builds the asset, owns the performance data, creates the community accountability — and proves the model that 260 district assemblies are looking for a reason to replicate.</p>
        </div>
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>BRIDGE\'s blended finance architecture is designed to complement these actors, not compete with them. The correct co-investment sequence: BRIDGE equity anchor → DACF government co-financing → DFI concessional layer → community equity participation at replication. This stacking structure maximises leverage and aligns every stakeholder\'s incentive with BRIDGE\'s long-term portfolio returns.</div>
        </div>
      </div>
    </div>
  );
};

/* ═══ CROSS-SECTOR SYNERGY ════════════════════════════════════════════════ */
const CrossSectorSynergy=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-synergy" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="11" label="System Integration" badge="8 sector links" hint="Infrastructure links Financial Inclusion, Health, Technology, Education, Agriculture, Energy, Manufacturing and more" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'24px',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Section 11 — System Integration</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.ink}}>Infrastructure as Connector</h2>
          </div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'6px 14px',letterSpacing:'1px',flexShrink:0}}>8 sector links</div>
        </div>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Infrastructure is the prerequisite sector — it is the layer beneath every other BRIDGE investment. A cold chain requires power. A digital platform requires WASH. A market requires roads. The integration is not incidental — it is the thesis. When BRIDGE invests in infrastructure, it de-risks investment in agriculture, energy, transportation, and financial inclusion simultaneously.</p>
        {/* Mobile synergy carousel */}
        <Carousel items={S.synergies} wrapClass="car-wrap-dark" renderCard={(syn,i)=>(
          <div style={{background:C.paperDark,border:`1px solid ${C.border}`,padding:'16px 16px',display:'flex',gap:'12px',alignItems:'flex-start'}}>
            <div style={{width:'38px',height:'38px',background:C.forest,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime}}>{syn.sector.substring(0,2)}</span>
            </div>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'6px'}}>{syn.sector}</div>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55}}>{syn.link}</div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>All 8 integration links</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
          {S.synergies.map((syn,i)=>(
            <div key={i} className={i>=4?open?'':'mob-item-hidden':''} style={{background:C.paperDark,border:`1px solid ${C.border}`,padding:'14px 18px',display:'flex',gap:'12px',alignItems:'flex-start'}}>
              <div style={{width:'36px',height:'36px',background:C.forest,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime}}>{syn.sector.substring(0,2)}</span>
              </div>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'4px'}}>{syn.sector}</div>
                <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5}}>{syn.link}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ RISK & THESIS ══════════════════════════════════════════════════════ */
const RiskThesis=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(false);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-risk" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="12" label="Risk & Thesis" badge="6 risk categories" hint="Political economy · policy reversal · vendor adoption · power dependency · replication quality · community trust" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 12 — Risk Analysis</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Risk &amp; Mitigation</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Infrastructure investment in Ghana carries real risks — primarily political economy and governance risks. BRIDGE\'s asset-backed direct operation model, DACF co-financing structure, and community accountability architecture are each designed to manage a specific risk category.</p>
        {/* Mobile risk carousel */}
        <Carousel items={S.risks} wrapClass="car-wrap-dark" renderCard={(r,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden'}}>
            <div style={{padding:'12px 14px',borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,lineHeight:1.3,maxWidth:'65%'}}>{r.r}</div>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[r.sev]||C.muted,letterSpacing:'1px',textTransform:'uppercase',border:`1px solid ${RISK_COLOR[r.sev]||C.muted}`,padding:'3px 8px',flexShrink:0}}>{r.sev}</span>
            </div>
            <div style={{padding:'12px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>BRIDGE Mitigation</div>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.65}}>{r.mit}</div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>Full risk matrix</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:'32px'}}>
          <div style={{display:'grid',gridTemplateColumns:'1.8fr 100px 2.5fr',background:C.forest}}>
            {['Risk Category','Severity','BRIDGE Mitigation Strategy'].map((h,i)=>(
              <div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
            ))}
          </div>
          {S.risks.map((r,i)=>(
            <div key={i} className={`row-hover ${i>=1?open?'':'mob-item-hidden':''}`} style={{display:'grid',gridTemplateColumns:'1.8fr 100px 2.5fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'start'}}>
              <div style={{padding:'12px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{r.r}</div>
              <div style={{padding:'12px 14px',borderLeft:`1px solid ${C.border}`,textAlign:'center'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[r.sev]||C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>{r.sev}</span>
              </div>
              <div style={{padding:'12px 14px',fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55,borderLeft:`1px solid ${C.border}`}}>{r.mit}</div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'32px'}} className="tc">
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Investment Thesis</div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.thesis}</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300}}>{S.thesis2}</p>
          </div>
          <div>
            <div style={{background:C.forest,padding:'18px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Deployment Parameters</div>
              {S.deploy.map((p,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<5?'1px solid rgba(255,255,255,0.08)':'none',gap:'8px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.4)'}}>{p.l}</span>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,textAlign:'right',maxWidth:'55%'}}>{p.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ UPSELL ══════════════════════════════════════════════════════════════ */
const Upsell=()=>{
  const[intent,setIntent]=useState(null); // null | 'package' | 'partnership' | 'briefing'
  const[pkgOpen,setPkgOpen]=useState(false);

  const packageItems=[
    {item:'Venture Financial Models',detail:'10-year P&L, IRR sensitivity tables, and working capital schedules for all 15 ventures.'},
    {item:'Kejetia Financial Model',detail:'Full 10-year P&L — revenue build, cost structure, IRR sensitivity, working capital by phase.'},
    {item:'District Assembly Toolkit',detail:'DACF application templates, partnership MOUs, governance framework for market management companies.'},
    {item:'Vendor Onboarding Playbook',detail:'Training protocols, peer educator programme, multi-language materials, adoption milestone targets.'},
    {item:'Market Resilience Platform Specs',detail:'Technical standards for all 7 service bundles — replication-ready format for 260+ districts.'},
    {item:'WASH Investment Database',detail:'400+ underserved communities mapped — proximity to BRIDGE assets, service gap severity, co-financing potential.'},
    {item:'AgTech Competitive Intelligence',detail:'40+ companies assessed — technology readiness, funding status, BRIDGE partnership potential.'},
    {item:'IoT Infrastructure Specification',detail:'Sensor network architecture, dashboard specs, predictive maintenance algorithms for BRIDGE asset portfolio.'},
    {item:'BRIDGE Impact Calculator',detail:'Vendor income, WASH mortality reduction, and community accountability modelling — built for investor due diligence.'},
    {item:'Regional Deployment Maps',detail:'GIS-referenced site selection, logistics corridors, agro-industrial park data across 4 zones.'},
    {item:'Policy Monitoring — Live Access',detail:'Monthly tracking of Model Markets mandate rollout, DACF allocation cycles, Big Push programme deployment.'},
    {item:'Quarterly Intelligence Updates',detail:'New data and revised assessments across all 12 sectors every quarter.'},
  ];

  const partnershipPhases=[
    {phase:'01',title:'Mandate Alignment',dur:'2–3 hrs',desc:'BRIDGE maps your capital profile, priorities, and risk parameters against the 12-sector portfolio. Honest, direct, specific.'},
    {phase:'02',title:'Bespoke Intelligence Build',dur:'4–6 wks',desc:'Custom financial models, due diligence frameworks, and co-investment capital stack built for your mandate.'},
    {phase:'03',title:'Market Access',dur:'Ongoing',desc:'Direct District Assembly introductions, Model Markets mandate positioning, procurement cycle calendar.'},
    {phase:'04',title:'Deal Origination',dur:'Rolling',desc:'Into opportunities before market-ready — at founder terms, with BRIDGE operational management. You bring capital. We bring Ghana.'},
  ];

  const intentCopy={
    package:{
      label:'Full Intelligence Package',
      sub:'Operational tools built for your process',
      cta:'Request Package Scope',
      href:'mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Infrastructure Sector',
    },
    partnership:{
      label:'Partnership Engagement',
      sub:'BRIDGE at the table with you',
      cta:'Start the Conversation',
      href:'mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Infrastructure',
    },
    briefing:{
      label:'30-Min Briefing',
      sub:'No commitment — we figure out fit first',
      cta:'Schedule Now →',
      href:'mailto:intelligence@bridgepbc.com?subject=Briefing Request — Infrastructure Sector',
    },
  };

  return(
    <div id="upsell" style={{background:C.ink,position:'relative',overflow:'hidden'}}>

      {/* Ghost watermark */}
      <div style={{position:'absolute',right:'-20px',top:'40px',fontFamily:F.display,fontSize:'clamp(100px,20vw,280px)',fontWeight:900,color:'rgba(255,255,255,0.018)',pointerEvents:'none',userSelect:'none',letterSpacing:'-10px',lineHeight:1}}>01</div>

      {/* ── Membership bar ── */}
      <div style={{background:'rgba(184,217,53,0.06)',borderBottom:'1px solid rgba(184,217,53,0.1)',padding:'9px 64px'}} className="pad-gate">
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{position:'relative',width:'8px',height:'8px',flexShrink:0}}>
              <div style={{position:'absolute',inset:0,borderRadius:'50%',background:C.lime,opacity:0.3,animation:'barGrow 2s ease-in-out infinite'}}/>
              <div style={{position:'absolute',inset:'1px',borderRadius:'50%',background:C.lime}}/>
            </div>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>Members Access Active</span>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.2)'}}>· Sector 01 of 12 · Full edition included</span>
          </div>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.18)'}}>intelligence@bridgepbc.com</span>
        </div>
      </div>

      {/* ── Core CTA block ── */}
      <div className="pad-gate" style={{padding:'44px 64px 0',position:'relative'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>

          {/* Headline */}
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <div style={{width:'28px',height:'2px',background:C.lime,flexShrink:0}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)'}}>What comes next</span>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,4vw,48px)',fontWeight:900,fontStyle:'italic',color:C.paper,lineHeight:1.1,letterSpacing:'-1px',marginBottom:'12px',maxWidth:'700px'}}>
            You have the intelligence.<br/>
            <span style={{color:C.lime}}>Now let\'s deploy it.</span>
          </h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.45)',lineHeight:1.75,maxWidth:'580px',marginBottom:'28px',fontStyle:'italic'}}>Your Members brief is the strategic layer. The next step is operational — financial models, due diligence tools, local relationships, and BRIDGE alongside you as you move from conviction to capital.</p>

          {/* ── Intent selector — 3 buttons ── */}
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'12px'}}>What are you looking for?</div>
          <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'24px'}}>
            {[
              {key:'package',label:'Full Package',sub:'Operational tools & models',icon:(
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              )},
              {key:'partnership',label:'Partnership',sub:'Work directly with BRIDGE',icon:(
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              )},
              {key:'briefing',label:'30-Min Briefing',sub:'No commitment, find fit first',icon:(
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              )},
            ].map((opt)=>{
              const active=intent===opt.key;
              return(
                <button key={opt.key} onClick={()=>setIntent(active?null:opt.key)}
                  style={{background:active?'rgba(184,217,53,0.08)':'rgba(255,255,255,0.03)',border:active?`1.5px solid ${C.lime}`:'1px solid rgba(255,255,255,0.1)',padding:'16px 16px',cursor:'pointer',textAlign:'left',transition:'background 0.18s,border-color 0.18s',display:'flex',alignItems:'center',gap:'14px',width:'100%'}}>
                  <div style={{color:active?C.lime:'rgba(255,255,255,0.35)',flexShrink:0,transition:'color 0.2s'}}>{opt.icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:active?C.lime:C.paper,marginBottom:'2px',transition:'color 0.2s'}}>{opt.label}</div>
                    <div style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.3)',fontStyle:'italic'}}>{opt.sub}</div>
                  </div>
                  <div style={{color:active?C.lime:'rgba(255,255,255,0.15)',fontFamily:F.sans,fontSize:'16px',transition:'all 0.2s',transform:active?'rotate(90deg)':'none',flexShrink:0}}>›</div>
                </button>
              );
            })}
          </div>

          {/* ── Intent detail panel ── */}
          {intent==='package'&&(
            <div style={{border:'1px solid rgba(184,217,53,0.2)',background:'rgba(184,217,53,0.04)',marginBottom:'20px',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(184,217,53,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.lime,marginBottom:'2px'}}>Full Intelligence Package — Infrastructure Sector</div>
                  <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.4)'}}>12 standalone deliverables · custom-priced · formatted for your investment process</div>
                </div>
                <button onClick={()=>setPkgOpen(o=>!o)} style={{background:'transparent',border:'1px solid rgba(184,217,53,0.3)',padding:'6px 12px',cursor:'pointer',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1px',whiteSpace:'nowrap'}}>
                  {pkgOpen?'Hide list ↑':'View all 12 →'}
                </button>
              </div>
              {pkgOpen&&(
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0'}} className="upsell-grid">
                  {packageItems.map((pkg,idx)=>(
                    <div key={idx} style={{padding:'11px 16px',borderBottom:idx<packageItems.length-2?'1px solid rgba(255,255,255,0.05)':'none',borderRight:idx%2===0?'1px solid rgba(255,255,255,0.05)':'none',display:'flex',gap:'10px',alignItems:'flex-start'}}>
                      <span style={{color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,flexShrink:0,lineHeight:1.5}}>→</span>
                      <div>
                        <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.lime,marginBottom:'2px'}}>{pkg.item}</div>
                        <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.35)',lineHeight:1.55,fontStyle:'italic'}}>{pkg.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{padding:'14px 20px',background:'rgba(0,0,0,0.15)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
                <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.3)'}}>Custom-priced. No standard tiers. Scope built around your mandate.</span>
                <a href="mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Infrastructure Sector"
                  className="cta-primary" style={{background:C.lime,color:C.ink,padding:'10px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',flexShrink:0}}>
                  Request Scope →
                </a>
              </div>
            </div>
          )}

          {intent==='partnership'&&(
            <div style={{border:'1px solid rgba(255,255,255,0.1)',background:'rgba(46,90,77,0.2)',marginBottom:'20px',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper,marginBottom:'4px'}}>BRIDGE Partnership Engagement — Four Phases</div>
                <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.4)'}}>Not a product. A working relationship built around your mandate and the ventures you want to pursue.</div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0'}} className="tc">
                {partnershipPhases.map((p,i)=>(
                  <div key={i} style={{padding:'14px 18px',borderBottom:i<2?'1px solid rgba(255,255,255,0.07)':'none',borderRight:i%2===0?'1px solid rgba(255,255,255,0.07)':'none',position:'relative',overflow:'hidden'}}>
                    <div style={{position:'absolute',right:'10px',top:'8px',fontFamily:F.display,fontSize:'40px',fontWeight:900,color:'rgba(184,217,53,0.05)',lineHeight:1,userSelect:'none'}}>{p.phase}</div>
                    <div style={{fontFamily:F.mono,fontSize:'9px',color:C.lime,letterSpacing:'2px',marginBottom:'4px',textTransform:'uppercase'}}>Phase {p.phase} · {p.dur}</div>
                    <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,marginBottom:'5px'}}>{p.title}</div>
                    <div style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.45)',lineHeight:1.6,fontStyle:'italic'}}>{p.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{padding:'14px 20px',background:'rgba(0,0,0,0.15)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
                <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.3)'}}>Starts with a conversation. If fit isn\'t there, we\'ll tell you directly.</span>
                <a href="mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Infrastructure"
                  style={{background:'rgba(255,255,255,0.08)',border:`1px solid ${C.lime}`,color:C.lime,padding:'10px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',flexShrink:0}}>
                  Start the Conversation →
                </a>
              </div>
            </div>
          )}

          {intent==='briefing'&&(
            <div style={{border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.03)',marginBottom:'20px',padding:'20px 22px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
              <div style={{maxWidth:'480px'}}>
                <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper,marginBottom:'6px'}}>30-Minute Mandate Briefing — No Commitment</div>
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.65}}>Tell us your capital profile and sector focus. We\'ll show you exactly which of the 18 Infrastructure ventures match your mandate — and be direct if the fit isn\'t there. Takes 30 minutes. No pitch deck.</div>
              </div>
              <a href="mailto:intelligence@bridgepbc.com?subject=Briefing Request — Infrastructure Sector"
                style={{background:C.lime,color:C.ink,padding:'14px 28px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',flexShrink:0,display:'flex',alignItems:'center',gap:'8px'}}>
                Schedule Now <span style={{fontSize:'16px'}}>→</span>
              </a>
            </div>
          )}

          {/* ── Urgency strip — always visible ── */}
          <div style={{border:`1px solid ${C.amber}`,borderLeft:`3px solid ${C.amber}`,background:'rgba(184,115,10,0.08)',padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px',marginBottom:'0'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
              <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.amber,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0}}>⚡ Q1 2026</span>
              <div style={{width:'1px',height:'20px',background:'rgba(184,115,10,0.35)',flexShrink:0}}/>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>Model Markets Mandate — District Assembly Filing Window</span>
              <span className="mob-hide" style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.35)',fontStyle:'italic'}}>First-mover positioning cannot be recovered once DACF allocation cycles begin.</span>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:C.amber,flexShrink:0}}>260+</div>
          </div>

        </div>
      </div>

      {/* ── Footer row ── */}
      <div className="pad-gate" style={{padding:'20px 64px 36px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px',borderTop:'1px solid rgba(255,255,255,0.07)',paddingTop:'18px'}}>
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.2)',lineHeight:1.6,margin:0,maxWidth:'480px'}}>No published price list. Every engagement starts with a conversation. If the fit isn\'t there, we\'ll tell you directly.</p>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.15)',letterSpacing:'0.5px',textAlign:'right',lineHeight:1.8}}>intelligence@bridgepbc.com<br/>bridgepbc.com/intelligence</div>
        </div>
      </div>
    </div>
  );
};


const Footer=()=>(
  <div className="pad-footer" style={{background:'#050d07',padding:'18px 64px',borderTop:'1px solid rgba(184,217,53,0.1)'}}>
    <div className="footer-inner" style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
        <Logo height={17} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.08)'}}/>
        <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.16)',letterSpacing:'0.5px',lineHeight:1.5}}>
          Sector 01 of 12 · Infrastructure &amp; Basic Services
          <br/>
          <span className="mob-hide"> · Full Members Edition · March 2026 · bridgepbc.com/intelligence</span>
        </span>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'18px'}}>
        {['All Sectors','Members','Full Package','Contact'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.2)',textDecoration:'none',letterSpacing:'0.5px'}}>{l}</a>))}
      </div>
    </div>
  </div>
);

/* ═══ ROOT ════════════════════════════════════════════════════════════════ */
const ExpandCtx=React.createContext({forceOpen:null});

export default function InfrastructureBrief(){
  const coverRef=useRef(null);
  const[forceOpen,setForceOpen]=useState(null); // null=local, true=all open, false=all closed
  const[barAllOpen,setBarAllOpen]=useState(false);
  const toggleAll=()=>{
    const next=!barAllOpen;
    setBarAllOpen(next);
    setForceOpen(next);
    // Reset after a tick so local state takes over on next individual toggle
    setTimeout(()=>setForceOpen(null),50);
  };
  return(
    <ExpandCtx.Provider value={{forceOpen}}>
    <div style={{fontFamily:F.body,background:C.paper,paddingBottom:'60px'}}>
      <Gf/>
      <ReadingProgressBar coverRef={coverRef}/>
      <SectionFooterNav/>
      <Cover logoRef={coverRef}/>
      <MobExpandBar allOpen={barAllOpen} onToggle={toggleAll}/>
      <Executive/>
      <SubSectors/>
      <StructuralProblem/>
      <WashCrisis/>
      <KejetiaFlagship/>
      <RegionalComparison/>
      <PolicyWindow/>
      <SystemIntegration/>
      <VenturePipeline/>
      <DeploymentTimeline/>
      <CrossSectorSynergy/>
      <CoInvestmentLandscape/>
      <RiskThesis/>
      <Upsell/>
      <Footer/>
    </div>
    </ExpandCtx.Provider>
  );
}
