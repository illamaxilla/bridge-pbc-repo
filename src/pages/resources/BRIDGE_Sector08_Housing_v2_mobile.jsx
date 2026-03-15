import { useState, useEffect, useRef } from "react";
import React from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BRIDGE SECTOR 08 — Housing & Real Estate
   Full Members Edition · March 2026 · Standalone Document
═══════════════════════════════════════════════════════════════════════════ */

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF',teal:'#2E5A4D'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};
const RISK_COLOR={LOW:C.positive,MEDIUM:C.amber,HIGH:C.red,'LOW-MED':C.amber};
const MODE_BG={'Direct Op':C.forest,'Partnership':C.amber,'Investment':C.teal,'Guidance':C.paperDark,'Network':C.ink};
const MODE_TX={'Direct Op':C.lime,'Partnership':C.white,'Investment':C.paper,'Guidance':C.muted,'Network':'rgba(250,248,243,0.6)'};

/* ═══ SECTOR DATA ════════════════════════════════════════════════════════ */
const S={
  num:'08',name:'Housing & Real Estate',tier:'Core',score:79,capital:'$26–45M',edition:'March 2026 Edition',
  tagline:"Building the system layer that makes housing accessible, financeable, and safe — verification platforms, oversight infrastructure, and guarantee products that fix the market before committing capital to build in it.",
  stats:[{l:'Unit Housing Deficit',v:'1.8M'},{l:'Formally Built / Year',v:'4,500'},{l:'Mortgage-to-GDP',v:'0.8%'},{l:'Avg Advance Required',v:'24 months'}],
  scoreDims:[{d:'Market Opportunity',w:'30%',s:84},{d:'Development Impact',w:'30%',s:88},{d:'Implementation Feasibility',w:'25%',s:72},{d:'Financial Sustainability',w:'15%',s:68}],
  snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'79/100'},{l:'Priority',v:'Immediate deployment'},{l:'Portfolio Range',v:'$26–45M'},{l:'Timeline',v:'2026–2030+'},{l:'Ventures Identified',v:'19'}],
  summary:"Ghana's formal housing sector delivers 4,500 units per year against an annual need of 70,000–133,000. The deficit grows by 100,000 units every twelve months. The 1.8 million unit housing deficit is not a static number — it compounds with every year that formal supply remains structurally incapable of scaling to meet need.",
  summary2:"This is not primarily a financing problem or a land problem or a construction capacity problem. It is all three simultaneously. Ghana's mortgage-to-GDP ratio stands at 0.8% — the lowest of any peer economy in West Africa. Cedi-denominated mortgage rates run 25–37%. Approximately 2% of land nationally carries formal title registration. Landlords require an average of 24 months' advance rent in cash.",
  summary3:"BRIDGE's housing portfolio focuses on the enabling layer — verification systems, oversight platforms, guarantee products, and cooperative structures — that make housing transactions trustworthy and financeable for the majority of Ghanaians. This approach is capital-efficient by design: it fixes the system that makes housing unworkable, rather than building units that remain unaffordable.",
  quote:"\"Ghana's housing system is not broken. It was never built for the 95% of the population it cannot serve. BRIDGE's housing portfolio builds the infrastructure layer that makes housing accessible, financeable, and safe.\"",
  subs:[
    {name:'Verification & Title Infrastructure',score:86,stage:'Series A Ready',capital:'$1.5–3.5M',note:'Title verification, contractor registry, materials authentication'},
    {name:'Rental Market Products',score:83,stage:'Active',capital:'$3–6M',note:'Guarantees, advance financing, tenant services platform'},
    {name:'Construction Oversight',score:81,stage:'Seed–A',capital:'$2.3–4M',note:'Platform, skills certification, project management services'},
    {name:'Property Management',score:78,stage:'Seed–A',capital:'$1.2–2M',note:'Diaspora and institutional landlord services at scale'},
    {name:'Housing Finance Products',score:74,stage:'Early',capital:'$3.5–7M',note:'Cooperatives, savings products, rent advance lending'},
    {name:'PropTech & Development',score:66,stage:'Phase 3',capital:'$10–19M',note:'PropTech fund, affordable development, build-to-rent'},
  ],
  constraints:[
    {c:'No Title Security',harm:"78% of land is under customary tenure with no formal registration. Over 60,000 land cases pending in courts. Buyers routinely pay for land that has been sold multiple times simultaneously."},
    {c:'Unaffordable Finance',harm:"Cedi mortgage rates run 25–37% annually with 30–40% down payments required. The 80%+ of Ghana's workforce in informal employment is entirely excluded from formal mortgage qualification."},
    {c:'Advance Rent Barrier',harm:"Landlords require 12–24 months cash in advance. For a household earning GH₵3,000/month renting at GH₵800, a 24-month advance represents 6.4 years of housing costs paid upfront."},
    {c:'No Construction Oversight',harm:"90% of housing is built without professional supervision, approved plans, or certified contractors — producing structures that deteriorate rapidly and cannot be financed or insured."},
    {c:'No Contractor Quality Signal',harm:"Undifferentiated contractor market with no credential system. Unqualified operators win contracts through price-undercutting and vanish with deposits, leaving incomplete structures."},
    {c:'No Rental Infrastructure',harm:"No digital agreements, no payment tracking, no rental history building. The 19 million Ghanaians in rental housing have no pathway to creditworthiness for future housing access."},
  ],
  landTenure:[
    {type:'Customary Tenure',pct:78,color:'rgba(168,32,13,0.75)',note:'Traditional authority or family control; no formal title; not bankable collateral'},
    {type:'Vested / State',pct:12,color:'rgba(46,90,77,0.8)',note:'Government controlled; partial formal registration in some areas'},
    {type:'Other / Mixed',pct:8,color:'rgba(92,107,94,0.7)',note:'Disputed, strata, or mixed tenure with unclear legal status'},
    {type:'Formally Titled',pct:2,color:C.positive,note:'Registered title; bankable collateral; concentrated in Greater Accra + Kumasi'},
  ],
  regionTitle:[
    {region:'Greater Accra',pct:8,note:'Highest in Ghana — still only 8%'},
    {region:'Ashanti',pct:4,note:'Secondary market; low formal registration'},
    {region:'Western',pct:2,note:'Mining zone; tenure dispute-heavy'},
    {region:'Brong-Ahafo',pct:1,note:'Agricultural land; mainly customary'},
    {region:'Northern',pct:0.4,note:'Below 0.5%; almost entirely customary'},
    {region:'Upper East/West',pct:0.2,note:'Lowest registration nationally'},
  ],
  rentalData:[
    {metric:'Rental yield — Accra',value:'8–10%',status:'positive',note:'Attractive to investors once management and trust infrastructure exists'},
    {metric:'Advance rent required',value:'24 months',status:'red',note:'Cash upfront = 6.4 years of rent cost for median income household'},
    {metric:'Mortgage interest rate',value:'25–37%',status:'red',note:'Cedi-denominated — unaffordable for 95%+ of households at any repayment ratio'},
    {metric:'Informal housing share',value:'90%',status:'amber',note:'Built without oversight, approved plans, or certified contractors'},
    {metric:'Urban renters',value:'40% of urban',status:'amber',note:'Approximately 19 million Ghanaians currently in rental accommodation'},
    {metric:'Formal title coverage',value:'2% national',status:'red',note:'Less than 0.5% in Northern regions; 8% in Greater Accra'},
  ],
  construction:[
    {label:'Formally Supervised',oversight:95,onTime:65,onBudget:60},
    {label:'Informal Self-Build',oversight:12,onTime:28,onBudget:31},
  ],
  ventures:[
    {tier:1,num:'①',name:'Construction Oversight Platform',desc:"Digital platform connecting households and developers with certified structural engineers, project managers, and quality inspectors on a fee-for-service basis. Site visit scheduling, milestone sign-off, photographic documentation, and quality certification that lenders and insurers can rely on. Transforms Ghana's 90% informal construction market by making professional oversight affordable — not by mandating it, but by making it the obvious choice.",mode:'Direct Op',capital:'$1.5–2.5M',score:41,risk:'LOW',start:'Q1 2026'},
    {tier:1,num:'②',name:'Title Verification Platform',desc:"Due diligence and transaction history verification for Ghanaian land and property — aggregating registry data, court records, vendor history, and community tenure documentation into a structured risk report for buyers, financiers, and lawyers. Does not replace formal title registration; creates a practical information layer on top of the existing customary tenure system.",mode:'Direct Op',capital:'$500K–1M',score:40,risk:'LOW',start:'Q2 2026'},
    {tier:1,num:'③',name:'Rental Guarantee Products',desc:"Insurance-backed rental guarantee products that replace the 12–24 month advance requirement — giving landlords the security they currently extract through upfront cash, while giving tenants access to housing they cannot currently afford. Partners with licensed insurance companies; BRIDGE provides tenant verification, employment analysis, and claims management infrastructure.",mode:'Partnership',capital:'$1–2M',score:39,risk:'LOW',start:'Q2 2026'},
    {tier:1,num:'④',name:'Property Management Service',desc:"Professional property management for diaspora and institutional landlords: tenant screening, rent collection, maintenance coordination, financial reporting, and legal compliance. Accra rental yields of 8–10% are attractive to diaspora investors — but management friction makes direct ownership impractical. BRIDGE Property Management converts that yield into a hands-off investment product.",mode:'Direct Op',capital:'$800K–1.5M',score:39,risk:'LOW',start:'Q2 2026'},
    {tier:1,num:'⑤',name:'Contractor Verification System',desc:"Digital registry of vetted construction contractors — credentials verified, references checked, project history documented, insurance confirmed. Households search by trade, location, and project size; contractors build reputations through completed project ratings. Eliminates the information asymmetry that allows unqualified operators to vanish with deposits.",mode:'Direct Op',capital:'$300–500K',score:39,risk:'LOW',start:'Q1 2026'},
    {tier:1,num:'⑥',name:'Construction Skills Certification',desc:"Competency-based certification for masons, carpenters, plumbers, electricians, and site supervisors — in partnership with NVTI and Ghana's construction industry associations. Certified tradespeople earn credentials that command premium rates on the Contractor Verification System. Directly integrated with BRIDGE Education sector bootcamps: construction trades are the primary Skills Bootcamp cohort.",mode:'Partnership',capital:'$500K–1M',score:38,risk:'LOW',start:'Q3 2026'},
    {tier:2,num:'⑦',name:'Housing Cooperative Structure',desc:"Cooperative savings and collective purchasing structures for groups of 20–50 households — enabling group land acquisition, bulk construction procurement, and shared professional services at costs individual households cannot access. The primary route to homeownership for informal sector workers who cannot qualify for individual mortgages.",mode:'Partnership',capital:'$3–5M',score:37,risk:'MEDIUM',start:'2028'},
    {tier:2,num:'⑧',name:'Rent Advance Financing',desc:"Short-term loans covering the upfront advance payment landlords require, repaid by tenants over the tenancy period in monthly instalments. Converts a one-time cash barrier into an affordable monthly payment. Partners with licensed MFIs and banks; BRIDGE provides underwriting criteria, tenant verification, and rental market data.",mode:'Partnership',capital:'$2–4M',score:36,risk:'MEDIUM',start:'2028'},
    {tier:2,num:'⑨',name:'Tenant Services Platform',desc:"Digital platform for tenant–landlord relationship management: digital rental agreements, payment tracking, maintenance requests, dispute documentation, and rental history building. Tenants who build verifiable rental payment histories become more creditworthy — a data asset that supports future mortgage access.",mode:'Direct Op',capital:'$400–700K',score:35,risk:'LOW',start:'2028'},
    {tier:2,num:'⑩',name:'PropTech Investment Fund',desc:"Minority equity stakes in 3–5 Ghanaian PropTech companies extending BRIDGE's reach into digital conveyancing, construction management software, affordable housing design, and rental market analytics. PropTech companies serving BRIDGE platforms receive immediate distribution — making each investment more valuable than the equity stake alone.",mode:'Investment',capital:'$2–3M',score:35,risk:'MEDIUM',start:'2028'},
    {tier:2,num:'⑪',name:'Artisan Cooperative Platform',desc:"Cooperative structure for certified construction tradespeople — enabling group insurance, collective procurement of materials, shared equipment ownership, and coordinated bidding on larger contracts. Certified artisans in cooperatives earn more, work more consistently, and access formal financial services.",mode:'Direct Op',capital:'$400–700K',score:33,risk:'LOW',start:'2029'},
    {tier:2,num:'⑫',name:'Housing Savings Products',desc:"Structured savings products linked to housing goals — building the savings history and down payment accumulation that mortgage qualification requires. Partners with licensed banks. Savers who reach target thresholds are referred to cooperative purchase programmes or mortgage pre-approval pathways.",mode:'Partnership',capital:'$500K–1M',score:33,risk:'LOW',start:'2029'},
    {tier:3,num:'⑬',name:'Materials Authentication',desc:"Verification system for construction materials — cement, steel, roofing — against the significant counterfeit and substandard materials market. Completes the quality assurance stack alongside contractor verification and construction oversight. Pursue once oversight and verification platforms have established market presence.",mode:'Partnership',capital:'$200–400K',score:32,risk:'MEDIUM',start:'2030+'},
    {tier:3,num:'⑭',name:'Affordable Housing Development',desc:"Direct development of affordable housing units in partnership with government and institutional investors. High capital and long timelines make this a Phase 3 venture — but it is the logical destination for the system BRIDGE builds in Phases 1 and 2. Cooperative structures, verified contractors, oversight infrastructure, and guarantees converge to make development financially viable.",mode:'Partnership',capital:'$5–8M',score:32,risk:'HIGH',start:'2030+'},
    {tier:3,num:'⑮',name:'Build-to-Rent Project',desc:"Institutionally financed rental housing development targeting the middle-income gap market. Conditioned on Rental Guarantee products and Property Management Service having established institutional investor confidence. The 8–10% Accra rental yield becomes compelling once management risk is solved.",mode:'Partnership',capital:'$3–5M',score:31,risk:'HIGH',start:'2030+'},
    {tier:3,num:'⑯',name:'Project Management Service',desc:"Full project management for diaspora clients managing construction in Ghana remotely — site monitoring, contractor management, budget tracking, and progress reporting. Pursue as a premium service tier once the Construction Oversight Platform has established infrastructure and contractor relationships.",mode:'Direct Op',capital:'$800K–1.5M',score:31,risk:'MEDIUM',start:'2030+'},
    {tier:3,num:'⑰',name:'Completion Guarantee Products',desc:"Insurance-backed guarantees for construction project completion — covering contractor default mid-project. High actuarial complexity and limited historical data make this a late-stage product. Conditioned on the Contractor Verification System having accumulated sufficient contractor performance history.",mode:'Partnership',capital:'$1–2M',score:29,risk:'HIGH',start:'2030+'},
    {tier:3,num:'⑱',name:'Regional Market Expansion',desc:"Expansion of all BRIDGE housing platforms — Oversight, Verification, Guarantee, Management — to Kumasi, Takoradi, Cape Coast, and secondary cities. Accra-first market proves the model and builds operational infrastructure. Regional expansion follows demonstrated traction.",mode:'Direct Op',capital:'$2–3M',score:29,risk:'MEDIUM',start:'2030+'},
    {tier:3,num:'⑲',name:'Diaspora Real Estate Programme',desc:"Market entry guide, verified developer network, and management services for diaspora real estate investors. Builds on the Property Management Service and Title Verification Platform established in Phase 1. The diaspora investor base is the first institutional audience for the rental asset class BRIDGE creates.",mode:'Direct Op',capital:'$300–600K',score:28,risk:'LOW',start:'2030+'},
  ],
  timeline:{
    phase1:{label:'Phase 1 — System Layer',years:'2026–2028',capital:'$4.6–8M',count:'6 ventures',items:['Q1 2026: Construction Oversight Platform — inspector network activated; first 20 certified sites onboarded','Q1 2026: Contractor Verification System — 200 contractors credential-checked and listed','Q2 2026: Title Verification Platform — pilot in Greater Accra; 3 data sources integrated','Q2 2026: Rental Guarantee Products — insurance partner signed; first 500 guarantees issued','Q2 2026: Property Management Service — 100 diaspora landlord units under management','Q3 2026: Construction Skills Certification — NVTI partnership signed; first cohort of 120 tradespeople enrolled']},
    phase2:{label:'Phase 2 — Market Products',years:'2028–2030',capital:'$9.3–15.2M',count:'6 ventures',items:['Housing Cooperative Structure — first 10 cooperatives formed; group land acquisition underway','Rent Advance Financing — MFI partnerships live; first 2,000 tenants financed across Greater Accra','Tenant Services Platform — digital agreements and rental history data accumulating at scale','PropTech Investment Fund — 3 initial investments in Ghanaian PropTech companies completed','Artisan Cooperative Platform — 500+ certified tradespeople in cooperative structures','Housing Savings Products — bank partnerships signed; 5,000 savers enrolled']},
    phase3:{label:'Phase 3 — Development',years:'2030+',capital:'$12.3–21M',count:'7 ventures',items:['Materials Authentication — quality assurance stack complete across major supply lines','Affordable Housing Development — first 200 units; government and institutional co-finance secured','Build-to-Rent Project — first institutional rental asset class in Accra operational','Project Management Service — diaspora premium service tier fully operational','Completion Guarantee Products — actuarial model validated; underwriting products live','Regional Market Expansion — Kumasi and Takoradi markets activated','Diaspora Real Estate Programme — full market entry guide and verified developer network']},
  },
  roadmap:[
    {name:'Construction Oversight',tier:1,s:0,e:50},
    {name:'Contractor Verification',tier:1,s:0,e:65},
    {name:'Title Verification',tier:1,s:5,e:55},
    {name:'Rental Guarantee',tier:1,s:5,e:75},
    {name:'Property Management',tier:1,s:8,e:75},
    {name:'Skills Certification',tier:1,s:15,e:90},
    {name:'Housing Cooperatives',tier:2,s:40,e:82},
    {name:'Rent Advance Financing',tier:2,s:40,e:85},
    {name:'Tenant Services Platform',tier:2,s:42,e:100},
    {name:'PropTech Fund',tier:2,s:60,e:100},
    {name:'Tier 3 — 7 Ventures',tier:3,s:80,e:100},
  ],
  synergies:[
    {sector:'02 Financial Inclusion',link:"Rental guarantee and housing savings products are new asset classes for Ghana's financial sector. Verified rental payment histories become credit scores. The Construction Oversight Platform creates a new category of insurable construction activity for insurance partners."},
    {sector:'05 Education & Skills',link:"Construction trades are the primary BRIDGE Skills Bootcamp cohort. Every certified tradesperson who joins the Contractor Verification System is a graduate of the Education sector's certification pipeline."},
    {sector:'03 Health Systems',link:"Overcrowded housing is one of Ghana's primary disease transmission vectors. Market Health Services kiosks co-deployed in BRIDGE housing cooperative developments extend health access to the same households gaining housing stability."},
    {sector:'01 Infrastructure',link:"BRIDGE market construction and WASH hub programmes use the same verified contractor pool and construction oversight infrastructure as the housing portfolio. The systems are shared and cost is distributed across both sectors."},
    {sector:'06 Agriculture',link:"Rural and peri-urban housing stability determines whether agricultural workers remain close to farmland or migrate to cities. Housing cooperative structures in agricultural communities anchor the workforce that value chain development requires."},
    {sector:'04 Technology',link:"Title verification, rental history data, and contractor registries are technology platforms. The PropTech Investment Fund is a joint Housing-Technology venture, with BRIDGE housing platforms as the primary distribution channels."},
    {sector:'12 Transportation',link:"Housing cooperative and affordable development sites depend on transport access. Connect24 road investments de-risk development in peri-urban areas where land is available at accessible prices."},
    {sector:'09 Tourism',link:"Property management infrastructure serves both residential landlords and short-term rental operators. The diaspora real estate programme serves both permanent housing and hospitality-use properties."},
  ],
  thesis:"BRIDGE's housing thesis is anchored in sequencing: the Phase 1 system-layer investments — oversight, verification, guarantee, and management — require $4.6–8M and produce the trust infrastructure that makes all subsequent housing finance and development viable. No development venture in the portfolio fires before the system layer works. This is not caution. It is capital efficiency.",
  thesis2:"The rental market is the immediate entry point. Accra's 8–10% yields are genuinely attractive to diaspora investors — but management friction and the 24-month advance barrier lock out the tenants who would fill those properties. BRIDGE's rental guarantee and property management products solve both sides simultaneously, creating a functional rental asset class where none currently exists. When a Ghanaian household secures housing without paying two years' rent upfront, that is not just a better IRR on a BRIDGE venture. That is a family whose savings stay in their hands.",
  deploy:[{l:'Ticket size',v:'$300K–$3M per venture'},{l:'Phase preference',v:'System-layer infrastructure first'},{l:'Model preference',v:'Direct Op + insurance partnerships'},{l:'Co-investment',v:'Insurance companies; MFIs; PropTech'},{l:'Diaspora angle',v:'Property mgmt + title verification'},{l:'Exit horizon',v:'4–6 yrs (services); 7–12 yrs (development)'}],
  risks:[
    {r:'Land Tenure Opacity',sev:'HIGH',mit:"Title Verification Platform works within the existing customary system — does not require system change to deliver value. Creates a practical information layer on top of existing reality rather than waiting for reform."},
    {r:'Financial Sector Constraints',sev:'HIGH',mit:"Rental guarantee products are insurance-backed, not bank-dependent. Cooperative structures bypass individual mortgage requirements. Phase 1 system layer does not require mortgage market reform to deploy."},
    {r:'Contractor Quality Pool',sev:'MEDIUM',mit:"Contractor Verification System and Construction Skills Certification are the direct Phase 1 interventions. Investment builds quality supply before the oversight platform reaches the scale where quality is critical."},
    {r:'Regulatory Exposure',sev:'MEDIUM',mit:"Phase 1 operates at the platform and insurance layer — no direct building regulatory approvals required. Insurance partnerships manage guarantee product compliance with existing frameworks."},
    {r:'Geographic Concentration',sev:'MEDIUM',mit:"Accra-first strategy validates the model and builds data before regional expansion. Phase 3 expansion is conditioned on demonstrated Phase 1 traction and financial sustainability."},
    {r:'Development Execution Risk',sev:'LOW-MED',mit:"Development is Phase 3 — conditioned on all Phase 1 and 2 system infrastructure being operational. BRIDGE does not commit development capital before the market is proven to function."},
  ],
  fullPackage:[
    {item:'19-Venture Financial Models',desc:'10-year projections for all 19 ventures — revenue build, cost structure, scenario analysis for currency risk and construction cost inflation'},
    {item:'Construction Oversight Platform',desc:'Technology architecture, inspector network deployment plan, fee structure, and certification integration with NVTI and insurance partners'},
    {item:'Title Verification Platform',desc:'Data source integration map, risk-scoring methodology, legal framework, and diaspora buyer acquisition strategy'},
    {item:'Rental Guarantee Products',desc:'Full actuarial model, insurance partner terms, underwriting criteria, tenant scoring methodology, and claims management infrastructure'},
    {item:'Property Management Service',desc:'Diaspora client acquisition funnel, fee structure, operational model for 500+ units, and technology stack'},
    {item:'Contractor Verification System',desc:'Vetting methodology, rating system, platform integration with oversight, and 200-contractor launch pipeline'},
    {item:'Housing Cooperative Structure',desc:'Legal framework, savings model, land acquisition strategy, and first cohort plan for 10 founding cooperatives'},
    {item:'Rent Advance Financing',desc:'MFI partnership terms, repayment structure, default management framework, and integration with rental guarantee'},
    {item:'PropTech Fund',desc:'Ghana PropTech landscape assessment, 10-company investment pipeline, and preferred fund structure'},
    {item:'Affordable Housing Development',desc:'Site assessment for 3 Greater Accra locations with full feasibility analysis and government partnership framework'},
    {item:'Diaspora Real Estate Programme',desc:'Market entry guide, verified developer network, management services package, and investment returns modelling'},
    {item:'Quarterly Housing Intelligence',desc:'Construction cost indices, rental market rates by neighbourhood, permit activity, and venture status updates'},
  ],
  benchmarks:[
    {country:'Ghana',pct:0.8,highlight:'red',note:'0.8% mortgage-to-GDP — lowest of any peer in West Africa'},
    {country:'Nigeria',pct:1.5,highlight:false,note:'Comparable informal economy; NHF reforms ongoing'},
    {country:"Côte d'Ivoire",pct:3.2,highlight:false,note:'Francophone peer; growing mortgage penetration'},
    {country:'Kenya',pct:5.1,highlight:false,note:"East Africa's most developed mortgage market"},
    {country:'Morocco',pct:18.4,highlight:false,note:'Government-backed social housing at scale'},
    {country:'South Africa',pct:32.0,highlight:'lime',note:"Regional benchmark — 40× Ghana's mortgage penetration"},
  ],
  capitalPhases:[
    {phase:'Phase 1',label:'System Layer',years:'2026–2028',min:4.6,max:8.0,color:C.lime,tx:C.ink,count:6},
    {phase:'Phase 2',label:'Market Products',years:'2028–2030',min:9.3,max:15.2,color:C.amber,tx:C.white,count:6},
    {phase:'Phase 3',label:'Development',years:'2030+',min:12.3,max:21.0,color:C.muted,tx:C.paper,count:7},
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
  [id^='sec-'],[id='upsell']{scroll-margin-top:50px;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .dc::first-letter{font-family:${F.display};font-size:4.4em;font-weight:900;float:left;line-height:0.8;margin:0.05em 0.12em 0 0;color:${C.forest};}
  @media print{.np{display:none!important;}}
  /* ── Desktop visibility defaults ── */
  .mob-show{display:none;}
  .mob-only{display:none!important;}
  .mob-car{display:none!important;}
  .mob-sec-hdr{display:none!important;}
  .desk-only{display:block;}
  .mob-expand-all{display:none;}
  /* ── Scrolling ── */
  .fig-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .subs-table{display:block;}
  .subs-cards{display:none;}
  /* ── Carousel ── */
  .mob-scroller{display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;scrollbar-width:none;gap:12px;-webkit-overflow-scrolling:touch;padding-bottom:4px;}
  .mob-scroller::-webkit-scrollbar{display:none;}
  .mob-snap-card{flex:0 0 82vw;scroll-snap-align:start;min-width:0;}
  .mob-snap-wide{flex:0 0 92vw;scroll-snap-align:start;min-width:0;}
  .mob-snap-sm{flex:0 0 72vw;scroll-snap-align:start;min-width:0;}
  /* v4: Carousel edge fade */
  .car-wrap{position:relative;}
  .car-wrap::after{content:'';position:absolute;top:14px;right:0;width:44px;height:calc(100% - 32px);background:linear-gradient(to right,transparent,${C.paper} 90%);pointer-events:none;z-index:2;}
  .car-wrap-dark::after{background:linear-gradient(to right,transparent,${C.paperDark} 90%);}
  .car-wrap-ink::after{background:linear-gradient(to right,transparent,${C.ink} 90%);}
  /* ── Progressive disclosure toggle ── */
  .mob-toggle{display:none;width:100%;padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};align-items:center;justify-content:space-between;transition:color 0.15s;}
  .mob-toggle:hover{color:${C.forest};}
  .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
  .mob-toggle-hdr{border-bottom:1px solid rgba(255,255,255,0.08)!important;color:rgba(250,248,243,0.4)!important;}
  /* v4: Table row hover */
  .row-hover{transition:background 0.12s ease;}
  .row-hover:hover{background:rgba(184,217,53,0.04)!important;}
  .row-hover-dark:hover{background:rgba(255,255,255,0.035)!important;}
  /* v4: Score bar animation */
  @keyframes barGrow{from{width:0}to{width:var(--w,100%)}}
  .score-bar{animation:barGrow 1s cubic-bezier(0.16,1,0.3,1) 0.4s both;}
  .score-bar-dim{animation:barGrow 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both;}
  /* v4: Global link + button transitions */
  a{transition:opacity 0.15s ease;}
  a:hover{opacity:0.76;}
  button{transition:background 0.15s ease,border-color 0.15s ease,color 0.15s ease;}
  /* v4: CTA hover lift */
  .cta-primary{transition:transform 0.15s ease,box-shadow 0.15s ease!important;}
  .cta-primary:hover{transform:translateY(-1px)!important;box-shadow:0 6px 20px rgba(184,217,53,0.25)!important;}
  /* v4: Section rule class */
  .sec-rule{border-top:5px solid ${C.ink};border-bottom:2.5px solid ${C.lime};padding-bottom:4px;margin-bottom:22px;}
  /* ── Tablet (≤900px) ── */
  @media(max-width:900px){
    .tc{grid-template-columns:1fr!important;}
    .hm{display:none!important;}
    .g2{grid-template-columns:1fr!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-upsell{padding:40px 32px!important;}
    .pad-footer{padding:14px 32px!important;}
    .pad-topbar{padding:10px 24px!important;}
  }
  /* ── Mobile (≤600px) ── */
  @media(max-width:600px){
    .tc{grid-template-columns:1fr!important;}
    .g2{grid-template-columns:1fr!important;}
    .pad-section{padding:22px 16px!important;}
    .pad-cover{padding:18px 16px 0!important;}
    .pad-upsell{padding:22px 16px!important;}
    .pad-footer{padding:14px 16px!important;}
    .pad-topbar{padding:9px 16px!important;}
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .mob-only{display:block!important;}
    .mob-car{display:block!important;}
    .mob-sec-hdr{display:flex!important;}
    .desk-only{display:none!important;}
    .mob-expand-all{display:flex!important;}
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
    .upsell-cta-row a{justify-content:center!important;width:100%!important;}
    .sec-body-hidden{display:none!important;}
    .row-hover:hover{background:inherit!important;}
    .car-wrap::after{width:28px;}
    .mob-stat{display:flex!important;}
    .stats-row>div{flex:0 0 50%!important;border-left:none!important;border-top:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(2){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(4){border-left:1px solid rgba(255,255,255,0.08)!important;}
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

/* ═══ FIG 01 — HOUSING SUPPLY GAP ══════════════════════════════════════ */
const Fig01SupplyGap=()=>{
  const rows=[
    {label:'Formal Supply',sub:"Gov't + private developers",val:'~4,500',pct:4.4,color:C.positive,tx:C.paper},
    {label:'Informal / Incremental',sub:'Self-build, unlicensed contractors',val:'~60,000',pct:58.6,color:C.amber,tx:C.white},
    {label:'Annual Shortfall',sub:'Units needed but undelivered',val:'37,000+',pct:36.9,color:C.red,tx:C.paper},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="01" title="Housing Supply Gap — Annual Need vs. Formal Delivery" note="Annual formal supply of ~4,500 units covers just 4.4% of the 70,000–133,000 new units needed each year. Even counting informal and incremental construction, the annual shortfall reaches 37,000+ units. The cumulative 1.8 million unit deficit compounds by ~100,000 units per year. Source: BRIDGE Analysis; Ghana Statistical Service; World Bank Housing Finance 2025."/>
      <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{display:'flex',height:'52px',width:'100%',borderBottom:`1px solid ${C.border}`}}>
          {rows.map((r,i)=>(
            <div key={i} style={{width:`${r.pct}%`,background:r.color,display:'flex',alignItems:'center',justifyContent:'center',borderRight:i<2?'1px solid rgba(255,255,255,0.15)':'none',flexShrink:0,overflow:'hidden',padding:'0 6px'}}>
              <span style={{fontFamily:F.mono,fontSize:'clamp(9px,1.2vw,13px)',fontWeight:700,color:r.tx,whiteSpace:'nowrap'}}>{r.val}</span>
            </div>
          ))}
        </div>
        <div style={{display:'flex',width:'100%'}}>
          {rows.map((r,i)=>(
            <div key={i} style={{width:`${r.pct}%`,padding:'6px 10px',flexShrink:0,borderRight:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.ink,lineHeight:1.3}}>{r.label}</div>
              <div style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>{r.sub}</div>
              <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:r.color,marginTop:'2px'}}>{r.pct}%</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,border:`1px solid ${C.border}`,marginTop:'10px'}}>
        {[{l:'Cumulative deficit',v:'1.8M units',vc:C.red},{l:'Formal supply coverage',v:'4.4% of need',vc:C.forest},{l:'Annual deficit growth',v:'+100,000/yr',vc:C.amber}].map((kv,i)=>(
          <div key={i} style={{background:C.paperDark,padding:'10px 14px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint,letterSpacing:'0.5px',marginBottom:'4px'}}>{kv.l}</div>
            <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══ FIG 02 — MORTGAGE MARKET PEER COMPARISON ════════════════════════════ */
const Fig02MortgagePeers=()=>{
  const pctColors={'red':C.red,'lime':C.lime,false:C.muted};
  const txColors={'red':C.red,'lime':C.positive,false:C.muted};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="02" title="Mortgage Market: Ghana vs. Peer Economies (Mortgage Credit as % of GDP)" note="Ghana's mortgage-to-GDP ratio of 0.8% is the lowest in the peer group — 40x below South Africa and 6x below Kenya. Source: World Bank Financial Development Database; IMF Article IV Consultations 2024–2025."/>
      <div className="fig-scroll">
        <div style={{minWidth:'360px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{background:C.forest,padding:'8px 14px',display:'grid',gridTemplateColumns:'160px 1fr 70px'}}>
            {['Country','Mortgage Credit as % of GDP','%'].map((h,i)=>(
              <div key={i} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none',paddingLeft:i>0?'12px':'0'}}>{h}</div>
            ))}
          </div>
          {S.benchmarks.map((row,i)=>{
            const col=pctColors[row.highlight]||C.muted;
            const isGhana=row.highlight==='red'||row.highlight==='lime';
            const barW=Math.min((row.pct/32)*100,100);
            return(
              <div key={i} style={{display:'grid',gridTemplateColumns:'160px 1fr 70px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:isGhana?(row.highlight==='lime'?'rgba(26,107,47,0.06)':'rgba(168,32,13,0.04)'):i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
                <div style={{padding:'10px 14px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:isGhana?700:600,color:isGhana?C.ink:C.muted}}>{row.country}</div>
                  <div style={{fontFamily:F.body,fontSize:'9px',fontStyle:'italic',color:C.faint,marginTop:'2px',lineHeight:1.4}}>{row.note}</div>
                </div>
                <div style={{padding:'10px 14px',borderLeft:`1px solid ${C.border}`}}>
                  <div style={{height:'12px',background:C.border,borderRadius:'2px',overflow:'hidden',marginBottom:'3px'}}>
                    <div style={{height:'100%',width:`${barW}%`,background:col,borderRadius:'2px',opacity:isGhana?1:0.65}}/>
                  </div>
                </div>
                <div style={{padding:'10px 12px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
                  <span style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:col}}>{row.pct}%</span>
                </div>
              </div>
            );
          })}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
            {[{l:'Ghana mortgage/GDP',v:'0.8%',vc:C.red},{l:'SA benchmark',v:'32%',vc:C.lime},{l:'Peer median',v:'4.3%',vc:C.forest}].map((kv,i)=>(
              <div key={i} style={{background:C.forest,padding:'10px 14px',textAlign:'center'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.35)',letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
                <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ FIG 03 — LAND TENURE DISTRIBUTION ════════════════════════════════════ */
const Fig03LandTenure=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="03" title="Land Tenure Distribution and Title Registration by Region" note="Customary land (78%) dominates Ghana's tenure landscape — creating the opacity that drives dispute frequency and financing difficulty. Title registration rates range from 8% in Greater Accra to below 0.5% in the Northern regions. The Title Verification Platform works within this reality rather than requiring it to change first. Source: Lands Commission Ghana; BRIDGE Analysis 2026."/>
    <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
      <div style={{display:'flex',height:'44px',width:'100%'}}>
        {S.landTenure.map((t,i)=>(
          <div key={i} style={{width:`${t.pct}%`,background:t.color,display:'flex',alignItems:'center',justifyContent:'center',borderRight:i<3?'1px solid rgba(255,255,255,0.15)':'none',flexShrink:0,overflow:'hidden'}}>
            <span style={{fontFamily:F.mono,fontSize:'clamp(10px,1.3vw,13px)',fontWeight:700,color:i===3?C.paper:'rgba(250,248,243,0.9)',whiteSpace:'nowrap'}}>{t.pct}%</span>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',borderTop:`1px solid ${C.border}`}}>
        {S.landTenure.map((t,i)=>(
          <div key={i} style={{padding:'10px 12px',borderRight:i<3?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
            <div style={{width:'14px',height:'4px',background:t.color,marginBottom:'5px'}}/>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{t.type}</div>
            <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',lineHeight:1.4}}>{t.note}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{marginTop:'10px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
      <div style={{background:C.ink,padding:'7px 14px',display:'grid',gridTemplateColumns:'1fr 80px'}}>
        {['Region','Formal Title %'].map((h,i)=><div key={i} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none',paddingLeft:i>0?'12px':'0'}}>{h}</div>)}
      </div>
      {S.regionTitle.map((r,i)=>(
        <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 80px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
          <div style={{padding:'8px 14px'}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:C.ink}}>{r.region}</div>
            <div style={{fontFamily:F.body,fontSize:'9px',fontStyle:'italic',color:C.faint}}>{r.note}</div>
          </div>
          <div style={{padding:'8px 14px',borderLeft:`1px solid ${C.border}`,textAlign:'right'}}>
            <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:r.pct>=5?C.positive:r.pct>=1?C.amber:C.red}}>{r.pct}%</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══ FIG 04 — CONSTRUCTION QUALITY COMPARISON ════════════════════════════ */
const Fig04ConstructionQuality=()=>{
  const metrics=[
    {label:'Professional oversight rate',formal:95,informal:12,unit:'%'},
    {label:'Completed on schedule',formal:65,informal:28,unit:'%'},
    {label:'Completed on budget',formal:60,informal:31,unit:'%'},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="04" title="Construction Quality: Formal Oversight vs. Informal Self-Build" note="Formally supervised projects achieve 95%+ professional oversight vs. 12% for informal self-builds. Only 28% of informal projects complete on time and 31% on budget — vs. 65% and 60% for professionally managed builds. The gap is not skill; it is system. Source: Ghana Institution of Engineering; BRRI; BRIDGE Sector Analysis 2026."/>
      <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',background:C.forest}}>
          {['Metric','Formally Supervised','Informal Self-Build'].map((h,i)=>(
            <div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
          ))}
        </div>
        {metrics.map((m,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
            <div style={{padding:'12px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>{m.label}</div>
            <div style={{padding:'12px 14px',borderLeft:`1px solid ${C.border}`}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{flex:1,height:'10px',background:C.border,borderRadius:'2px',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${m.formal}%`,background:C.positive,borderRadius:'2px'}}/>
                </div>
                <span style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:C.positive,flexShrink:0}}>{m.formal}{m.unit}</span>
              </div>
            </div>
            <div style={{padding:'12px 14px',borderLeft:`1px solid ${C.border}`}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{flex:1,height:'10px',background:C.border,borderRadius:'2px',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${m.informal}%`,background:C.red,borderRadius:'2px'}}/>
                </div>
                <span style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:C.red,flexShrink:0}}>{m.informal}{m.unit}</span>
              </div>
            </div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'Informal housing share',v:'90%',vc:C.red},{l:'Formal oversight',v:'95%',vc:C.positive},{l:'Improvement potential',v:'7.9×',vc:C.lime}].map((kv,i)=>(
            <div key={i} style={{background:C.forest,padding:'10px 14px',textAlign:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.35)',letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══ FIG 05 — VENTURE PORTFOLIO MATRIX ════════════════════════════════════ */
const Fig05VentureMatrix=()=>{
  const pts=[
    {n:'Construction Oversight',x:185,y:48,r:10,tier:1},{n:'Title Verification',x:130,y:61,r:8,tier:1},
    {n:'Rental Guarantee',x:160,y:75,r:9,tier:1},{n:'Property Management',x:195,y:75,r:8,tier:1},
    {n:'Contractor Verification',x:100,y:75,r:7,tier:1},{n:'Skills Certification',x:140,y:91,r:7,tier:1},
    {n:'Housing Cooperatives',x:380,y:111,r:13,tier:2},{n:'Rent Advance',x:350,y:128,r:11,tier:2},
    {n:'Tenant Platform',x:170,y:138,r:7,tier:2},{n:'PropTech Fund',x:345,y:138,r:10,tier:2},
    {n:'Artisan Coop',x:185,y:155,r:7,tier:2},{n:'Housing Savings',x:155,y:155,r:7,tier:2},
    {n:'Affordable Dev.',x:550,y:168,r:14,tier:3},{n:'Build-to-Rent',x:410,y:178,r:13,tier:3},
    {n:'Tier 3 Others',x:490,y:195,r:9,tier:3},
  ];
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  const tierTx={1:C.ink,2:C.white,3:C.paper};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="05" title="Venture Portfolio Matrix — Priority Score vs. Capital Required" note="19 housing ventures plotted by priority score (y-axis) and approximate capital requirement (x-axis). Bubble size represents relative capital. Tier 1 ventures cluster in the high-score/low-capital quadrant — demonstrating the efficiency of the system-layer approach. Source: BRIDGE Venture Analysis, 2026."/>
      <div className="fig-scroll">
        <div style={{minWidth:'600px',position:'relative'}}>
          <svg viewBox="0 0 720 300" width="100%" style={{display:'block',border:`1px solid ${C.border}`,background:C.paper}}>
            <rect x="70" y="20" width="190" height="250" fill={C.positive} opacity="0.04"/>
            <rect x="260" y="20" width="200" height="250" fill={C.amber} opacity="0.04"/>
            <rect x="460" y="20" width="190" height="250" fill={C.red} opacity="0.04"/>
            <text x="165" y="282" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.positive} letterSpacing="1">LOW CAPITAL (&lt;$1M)</text>
            <text x="360" y="282" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.amber} letterSpacing="1">MID CAPITAL ($1–5M)</text>
            <text x="555" y="282" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.red} letterSpacing="1">HIGH CAPITAL ($5M+)</text>
            {[28,30,32,34,36,38,40,42].map(v=>{
              const y=265-((v-28)/14)*230;
              return(<g key={v}><line x1="65" y1={y} x2="655" y2={y} stroke={C.border} strokeWidth="1" strokeDasharray="3,4"/><text x="58" y={y+4} textAnchor="end" fontFamily={F.mono} fontSize="9" fill={C.faint}>{v}</text></g>);
            })}
            <line x1="70" y1="265" x2="650" y2="265" stroke={C.border} strokeWidth="1"/>
            <line x1="70" y1="20" x2="70" y2="265" stroke={C.border} strokeWidth="1"/>
            <line x1="260" y1="20" x2="260" y2="265" stroke={C.border} strokeWidth="1" strokeDasharray="4,4"/>
            <line x1="460" y1="20" x2="460" y2="265" stroke={C.border} strokeWidth="1" strokeDasharray="4,4"/>
            <text x="14" y="155" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.muted} transform="rotate(-90,14,155)" letterSpacing="1">PRIORITY SCORE</text>
            {pts.map((p,i)=>(
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={p.r+4} fill={tierColor[p.tier]} opacity="0.12"/>
                <circle cx={p.x} cy={p.y} r={p.r} fill={tierColor[p.tier]} opacity="0.85" stroke={C.paper} strokeWidth="1.5"/>
                <text x={p.x} y={p.y+4} textAnchor="middle" fontFamily={F.mono} fontSize="8" fontWeight="700" fill={tierTx[p.tier]}>{i+1}</text>
              </g>
            ))}
          </svg>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',gap:'0',borderTop:`1px solid ${C.border}`,background:C.paperDark}}>
            {[{bg:C.lime,tx:C.ink,label:'Tier 1 — System Layer'},{bg:C.amber,tx:C.white,label:'Tier 2 — Market Products'},{bg:C.muted,tx:C.paper,label:'Tier 3 — Development'}].map((lg,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'6px',padding:'8px 12px',borderRight:`1px solid ${C.border}`}}>
                <div style={{width:'10px',height:'10px',borderRadius:'50%',background:lg.bg,flexShrink:0}}/>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted}}>{lg.label}</span>
              </div>
            ))}
            <div style={{padding:'8px 12px',gridColumn:'span 2'}}>
              <span style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>Bubble size = capital required · Labels 1–15 map to ventures in priority score order</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ FIG 06 — RENTAL MARKET DYNAMICS ══════════════════════════════════════ */
const Fig06RentalDynamics=()=>{
  const statusColor={positive:C.positive,red:C.red,amber:C.amber};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="06" title="Rental Market Dynamics — Yield, Barriers, and Infrastructure Gaps" note="Accra rental yields of 8–10% are genuinely attractive to investors — but the 24-month advance requirement locks out the tenants who would fill those properties. Source: Knight Frank Ghana; Broll Property Group; BRIDGE Analysis 2026."/>
      <div className="fig-scroll">
        <div style={{minWidth:'480px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'200px 130px 1fr',background:C.forest}}>
            {['Metric','Value','Note'].map((h,i)=>(
              <div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
            ))}
          </div>
          {S.rentalData.map((row,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:'200px 130px 1fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
              <div style={{padding:'10px 14px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{row.metric}</div>
              <div style={{padding:'10px 14px',borderLeft:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:statusColor[row.status]||C.ink}}>{row.value}</span>
              </div>
              <div style={{padding:'10px 14px',borderLeft:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic'}}>{row.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══ FIG 07 — DEPLOYMENT ROADMAP ══════════════════════════════════════════ */
const Fig07Roadmap=()=>{
  const years=['2026','2027','2028','2029','2030+'];
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  const tierTx={1:C.ink,2:C.white,3:C.paper};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="07" title="Housing Portfolio — Deployment Roadmap" note="Phase 1 (2026–2028) deploys the 6 system-layer ventures that make all subsequent housing transactions trustworthy. Phase 2 (2028–2030) activates market products. Phase 3 (2030+) is when development ventures fire — conditioned on Phase 1 and 2 infrastructure being operational. Source: BRIDGE Operations Planning, 2026."/>
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
              <div style={{width:'40%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.lime,letterSpacing:'1px',borderRight:`1px solid ${C.border}`}}>PHASE 1 · SYSTEM LAYER</div>
              <div style={{width:'40%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.amber,letterSpacing:'1px',borderRight:`1px solid ${C.border}`}}>PHASE 2 · MARKET PRODUCTS</div>
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
                    {v.e-v.s>12&&<span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:tierTx[v.tier],whiteSpace:'nowrap',overflow:'hidden',paddingLeft:'4px',paddingRight:'4px'}}>{v.s===0&&v.tier===1?'Q1 2026':v.tier===2?'2028':''}</span>}
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

/* ═══ FIG 08 — SYSTEM LAYER ARCHITECTURE ════════════════════════════════════ */
const Fig08SystemLayer=()=>{
  const phases=[
    {phase:'Phase 1',label:'System Layer',years:'2026–2028',capital:'$4.6–8M',color:C.lime,tx:C.ink,items:['Construction Oversight Platform','Title Verification Platform','Rental Guarantee Products','Property Management Service','Contractor Verification System','Construction Skills Certification']},
    {phase:'Phase 2',label:'Market Products',years:'2028–2030',capital:'$9.3–15.2M',color:C.amber,tx:C.white,items:['Housing Cooperative Structure','Rent Advance Financing','Tenant Services Platform','PropTech Investment Fund','Artisan Cooperative Platform','Housing Savings Products']},
    {phase:'Phase 3',label:'Development',years:'2030+',capital:'$12.3–21M',color:C.muted,tx:C.paper,items:['Materials Authentication','Affordable Housing Development','Build-to-Rent Project','Project Management Service','Completion Guarantees','Regional Expansion','Diaspora Programme']},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="08" title="BRIDGE Housing Strategy — System Layer Architecture" note="Phase 1 builds the infrastructure that makes housing transactions trustworthy. Phase 2 activates market products that depend on Phase 1 trust data. Phase 3 development ventures fire only after the market works — making development financially viable and institutionally credible. Source: BRIDGE Portfolio Strategy, 2026."/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 28px 1fr 28px 1fr',gap:'0',border:`1px solid ${C.border}`,overflow:'hidden'}} className="tc">
        {phases.map((ph,pi)=>[
          <div key={`p${pi}`} style={{background:pi===1?C.paperDark:C.paper}}>
            <div style={{background:ph.color,padding:'12px 16px'}}>
              <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:ph.tx,letterSpacing:'1.5px',marginBottom:'3px'}}>{ph.phase.toUpperCase()} · {ph.years}</div>
              <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:ph.tx}}>{ph.label}</div>
              <div style={{fontFamily:F.mono,fontSize:'11px',color:ph.tx,opacity:0.7,marginTop:'2px'}}>{ph.capital}</div>
            </div>
            {ph.items.map((item,ii)=>(
              <div key={ii} style={{padding:'7px 14px',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'flex-start',gap:'8px'}}>
                <div style={{width:'6px',height:'6px',borderRadius:'50%',background:ph.color,flexShrink:0,marginTop:'4px'}}/>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:C.ink,lineHeight:1.4}}>{item}</span>
              </div>
            ))}
          </div>,
          pi<2&&<div key={`arr${pi}`} style={{display:'flex',alignItems:'center',justifyContent:'center',background:C.paperDark,borderLeft:`1px solid ${C.border}`,borderRight:`1px solid ${C.border}`}}>
            <span style={{fontFamily:F.sans,fontSize:'16px',color:C.lime,fontWeight:700}}>→</span>
          </div>
        ])}
      </div>
    </div>
  );
};

/* ═══ FIG 09 — CAPITAL DEPLOYMENT BY PHASE ══════════════════════════════════ */
const Fig09CapitalPhases=()=>{
  const total_min=4.6+9.3+12.3;
  const total_max=8+15.2+21;
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="09" title="BRIDGE Housing Portfolio — Capital Deployment by Phase" note="Phase 1 system-layer investments are the smallest capital commitment — $4.6–8M — and produce the trust infrastructure that makes all subsequent phases viable. Total portfolio capital: $26–44M across 3 phases and 19 ventures, deployed 2026–2030+. Source: BRIDGE Financial Planning, 2026."/>
      <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{height:'52px',display:'flex',borderBottom:`1px solid ${C.border}`}}>
          {S.capitalPhases.map((ph,i)=>{
            const barW=((ph.max)/44)*100;
            return(
              <div key={i} style={{width:`${barW}%`,background:ph.color,display:'flex',alignItems:'center',justifyContent:'center',borderRight:i<2?'1px solid rgba(255,255,255,0.15)':'none',flexShrink:0,overflow:'hidden'}}>
                <span style={{fontFamily:F.mono,fontSize:'clamp(10px,1.3vw,13px)',fontWeight:700,color:ph.tx,whiteSpace:'nowrap'}}>{ph.phase}</span>
              </div>
            );
          })}
        </div>
        {S.capitalPhases.map((ph,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'14px 120px 90px 1fr 70px',borderBottom:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
            <div style={{width:'14px',height:'100%',background:ph.color,flexShrink:0,minHeight:'44px'}}/>
            <div style={{padding:'10px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{ph.phase}</div>
              <div style={{fontFamily:F.body,fontSize:'9px',fontStyle:'italic',color:C.faint}}>{ph.label} · {ph.years}</div>
            </div>
            <div style={{padding:'10px 12px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,borderLeft:`1px solid ${C.border}`}}>{ph.count} ventures</div>
            <div style={{padding:'10px 14px',borderLeft:`1px solid ${C.border}`}}>
              <div style={{height:'8px',background:C.border,borderRadius:'2px',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${(ph.max/21)*100}%`,background:ph.color,borderRadius:'2px'}}/>
              </div>
            </div>
            <div style={{padding:'10px 12px',textAlign:'right',borderLeft:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.ink}}>${ph.min}–{ph.max}M</span>
            </div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'Total portfolio (min)',v:`$${total_min.toFixed(1)}M`,vc:C.lime},{l:'Total portfolio (max)',v:`$${total_max.toFixed(1)}M`,vc:C.positive},{l:'Phase 1 share of total',v:'18–22%',vc:C.forest}].map((kv,i)=>(
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
const useMobile=()=>{
  const[mob,setMob]=useState(typeof window!=='undefined'&&window.innerWidth<=600);
  useEffect(()=>{
    const fn=()=>setMob(window.innerWidth<=600);
    window.addEventListener('resize',fn,{passive:true});
    return()=>window.removeEventListener('resize',fn);
  },[]);
  return mob;
};

/* ═══ READING PROGRESS BAR (replaces MobProgressBar + TopBar) ══════════ */
// Progress line: 2px lime, absolute bottom of bar, all screen sizes
// Logo slides in when coverRef (cover logo div) exits viewport
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
    window.addEventListener('scroll',fn,{passive:true});
    fn();
    return()=>window.removeEventListener('scroll',fn);
  },[coverRef]);
  const pctRounded=Math.round(pct);
  return(
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(13,26,16,0.05)',overflow:'hidden'}}>
      {/* v4: 3px progress line */}
      <div style={{position:'absolute',bottom:0,left:0,height:'3px',width:`${pct}%`,background:C.lime,transition:'width 0.1s linear',pointerEvents:'none'}}/>
      <div style={{display:'flex',alignItems:'center',gap:'10px',minWidth:0,overflow:'hidden'}}>
        {/* v4: spring easing on logo reveal */}
        <div style={{overflow:'hidden',maxWidth:logoVisible?'180px':'0',opacity:logoVisible?1:0,transition:'max-width 0.38s cubic-bezier(0.16,1,0.3,1),opacity 0.3s ease',display:'flex',alignItems:'center',flexShrink:0}}>
          <Logo height={19} variant="dark"/>
          <div style={{width:'1px',height:'15px',background:C.border,margin:'0 12px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Sector Brief · Housing & Real Estate · Core Tier · March 2026</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>08 · Housing</span>
        {/* v4: reading % shown after 5% scroll — desktop only */}
        {pct>5&&<span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,marginLeft:'4px',flexShrink:0}}>{pctRounded}%</span>}
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center',flexShrink:0}}>
        <a href="#" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none',letterSpacing:'0.2px'}}>All Sectors →</a>
        <a href="#upsell" className="cta-primary" style={{background:C.forest,color:C.lime,padding:'7px 16px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.5px'}}>Full Package →</a>
      </div>
    </div>
  );
};

/* ═══ SECTION FOOTER NAV ═════════════════════════════════════════════════ */
// Fixed bottom — section dots + prev/next arrows, all screen sizes
const SECS=[
  {id:'sec-exec',    label:'Executive Summary'},
  {id:'sec-subs',    label:'Sub-Sectors'},
  {id:'sec-supply',  label:'Supply Gap'},
  {id:'sec-finance', label:'Finance & Barriers'},
  {id:'sec-land',    label:'Land Tenure'},
  {id:'sec-construction',label:'Construction Quality'},
  {id:'sec-market',  label:'Market Opportunity'},
  {id:'sec-overview',label:'Portfolio Overview'},
  {id:'sec-ventures',label:'Venture Pipeline'},
  {id:'sec-roadmap', label:'Deployment Roadmap'},
  {id:'sec-synergy', label:'Cross-Sector Links'},
  {id:'sec-coinvest',label:'Investment Thesis'},
  {id:'sec-risk',    label:'Risk & Mitigation'},
  {id:'upsell',      label:'Next Steps'},
];
const SectionFooterNav=()=>{
  const[active,setActive]=useState(0);
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){const idx=SECS.findIndex(s=>s.id===e.target.id);if(idx>=0)setActive(idx);}
      });
    },{rootMargin:'-40% 0px -55% 0px'});
    SECS.forEach(s=>{const el=document.getElementById(s.id);if(el)obs.observe(el);});
    return()=>obs.disconnect();
  },[]);
  const goTo=(idx)=>{
    const clamped=Math.max(0,Math.min(SECS.length-1,idx));
    const el=document.getElementById(SECS[clamped].id);
    if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
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
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active===0?'rgba(255,255,255,0.2)':C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
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
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active===SECS.length-1?'rgba(255,255,255,0.2)':C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
};

/* ═══ CAROUSEL (mobile-only swipe + dots) ═══════════════════════════════ */
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
          <div key={i} onClick={()=>goto(i)} style={{
            width:i===active?'22px':'7px',height:'7px',borderRadius:'4px',
            background:i===active?C.lime:(darkBg?'rgba(255,255,255,0.18)':C.border),
            cursor:'pointer',
            transition:'width 0.3s cubic-bezier(0.16,1,0.3,1),background 0.2s',
            flexShrink:0,
          }}/>
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
        <span style={{fontFamily:F.sans,fontSize:'18px',fontWeight:300,color:dark?'rgba(255,255,255,0.3)':C.faint,transition:'transform 0.25s cubic-bezier(0.16,1,0.3,1)',display:'inline-block',transform:open?'rotate(0deg)':'rotate(-90deg)',lineHeight:1,marginLeft:'2px'}}>↓</span>
      </div>
    </div>
    {!open&&hint&&<span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:dark?'rgba(255,255,255,0.25)':C.faint,paddingLeft:'0',lineHeight:1.55,marginTop:'1px'}}>{hint}</span>}
  </button>
);



/* ═══ MOBILE EXPAND/COLLAPSE ALL BAR ════════════════════════════════════ */
const MobExpandBar=({allOpen,onToggle})=>(
  <div className="mob-expand-all" style={{display:'none',background:C.ink,borderBottom:'1px solid rgba(184,217,53,0.12)',padding:'10px 18px',alignItems:'center',justifyContent:'space-between',gap:'10px'}}>
    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
      <div style={{position:'relative',width:'8px',height:'8px',flexShrink:0}}>
        <div style={{position:'absolute',inset:0,borderRadius:'50%',background:C.lime,opacity:allOpen?0.3:0,animation:allOpen?'barGrow 2s ease-in-out infinite':'none'}}/>
        <div style={{position:'absolute',inset:'1px',borderRadius:'50%',background:allOpen?C.lime:'rgba(255,255,255,0.2)',transition:'background 0.2s'}}/>
      </div>
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
      {/* v4: ghost watermark */}
      <div style={{position:'absolute',right:'32px',top:'-8px',fontFamily:F.display,fontSize:'clamp(100px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.022)',lineHeight:1,userSelect:'none',pointerEvents:'none',letterSpacing:'-6px'}}>08</div>
      {/* v4: dot grid texture */}
      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)',backgroundSize:'28px 28px',pointerEvents:'none'}}/>
      <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
        <div ref={logoRef} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <Logo height={26} variant="white"/>
            <div style={{width:'1px',height:'20px',background:'rgba(255,255,255,0.12)'}}/>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,letterSpacing:'2.5px',color:'rgba(255,255,255,0.25)',textTransform:'uppercase'}}>Sector Intelligence Brief · Full Members Edition</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.18)',letterSpacing:'1px'}}>{S.edition}</span>
            <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'2px',textTransform:'uppercase',border:'1px solid rgba(184,217,53,0.35)',padding:'4px 11px'}}>Members</span>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'22px'}}>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:800,padding:'5px 12px',letterSpacing:'1.5px'}}>SECTOR 08 OF 12</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.07)'}}/>
        </div>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(36px,6vw,78px)',fontWeight:900,color:C.paper,lineHeight:0.95,letterSpacing:'-2.5px',marginBottom:'8px'}}>Housing</h1>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,4vw,52px)',fontWeight:700,color:'rgba(250,248,243,0.38)',lineHeight:1,letterSpacing:'-1.5px',marginBottom:'20px'}}>&amp; Real Estate</h2>
        <p style={{fontFamily:F.body,fontSize:'clamp(13px,1.6vw,16px)',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.7,maxWidth:'560px',marginBottom:'0'}}>{S.tagline}</p>
        <div className="cover-stats stats-row" style={{display:'flex',gap:'0',borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'28px',flexWrap:'wrap'}}>
          <div style={{background:'rgba(184,217,53,0.07)',padding:'20px 24px',minWidth:'170px',borderRight:'1px solid rgba(255,255,255,0.06)',flex:'0 0 170px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'10px'}}>BRIDGE Impact Score™</div>
            <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'10px'}}>
              <span style={{fontFamily:F.mono,fontSize:'52px',fontWeight:400,color:C.lime,lineHeight:1}}>{S.score}</span>
              <span style={{fontFamily:F.mono,fontSize:'13px',color:'rgba(184,217,53,0.4)'}}>/100</span>
            </div>
            <div style={{height:'3px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',marginBottom:'7px',overflow:'hidden'}}>
              <div className="score-bar" style={{'--w':`${S.score}%`,height:'100%',width:`${S.score}%`,background:C.lime,borderRadius:'2px'}}/>
            </div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>Core Tier</div>
          </div>
          {S.stats.map((d,i)=>(
            <div key={i} className="hm mob-stat" style={{padding:'20px 22px',borderRight:i<3?'1px solid rgba(255,255,255,0.06)':'none',flex:1,minWidth:0,display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.22)',marginBottom:'10px',lineHeight:1.4}}>{d.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'clamp(15px,2vw,22px)',color:C.paper,lineHeight:1,fontWeight:400}}>{d.v}</div>
            </div>
          ))}
        </div>
      </div>
      {/* v4: solid lime stripe, opacity 0.9 */}
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
        <SecHdr num="01" label="Executive Summary" badge={`Score ${S.score}`} hint="1.8M unit deficit · 0.8% mortgage-to-GDP · system-layer approach delivers 19 ventures across 3 phases" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{maxWidth:'900px',display:'grid',gridTemplateColumns:'2fr 1fr',gap:'48px'}} className="tc">
        <div>
          <div className="sec-rule mob-hide"/>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Executive Summary</div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.summary}</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.summary2}</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300}}>{S.summary3}</p>
          <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'20px',marginTop:'24px'}}>
            <p style={{fontFamily:F.display,fontSize:'17px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.5}}>{S.quote}</p>
            <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE Sector Assessment, 2026</div>
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
              <div key={i} className={i>=1?sdOpen?'':'mob-item-hidden':''} style={{padding:'10px 14px',borderBottom:i<3?`1px solid ${C.border}`:'none'}}>
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
            {S.snapshot.map((s,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:i<5?`1px solid ${C.border}`:'none'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{s.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:i===0?C.positive:C.forest}}>{s.v}</span>
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
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-subs" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="02" label="Sub-Sector Landscape" badge="6 sub-sectors" hint="Verification, rental products, construction oversight, property management — scored by BRIDGE Impact Score™ methodology" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Sub-Sector Landscape</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 sub-sectors assessed</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Where BRIDGE Scores the Housing Opportunity</h2>
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

/* ═══ SUPPLY GAP ════════════════════════════════════════════════════════ */
const SupplyGap=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-supply" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="03" label="The Supply Gap" badge="1.8M Deficit" hint="4,500 formal units per year against a need of 70,000–133,000 · 6 structural barriers · deficit grows 100,000 units annually" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 03 — The Supply Gap</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>1.8M unit deficit · growing 100,000 units / year</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>1.8 Million Families Without Adequate Housing</h2>
        <Fig01SupplyGap/>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px',marginBottom:'28px'}} className="tc">
          <div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana builds 4,500 formal housing units per year against an annual need of 70,000–133,000. The deficit grows by approximately 100,000 units per year as formal supply remains structurally incapable of scaling to meet need. The 1.8 million unit housing deficit is not a static number — it compounds with every year that formal supply remains structurally incapable of scaling.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>This is not primarily a financing problem or a land problem or a construction capacity problem. It is all three simultaneously — and they reinforce each other. Ghana's mortgage-to-GDP ratio stands at 0.8%, the lowest of any peer economy in West Africa. Approximately 2% of land nationally carries formal title registration. And 90% of housing that does get built is constructed informally — without professional oversight, approved plans, or certified contractors.</p>
            <div style={{background:C.forest,padding:'16px 20px',marginTop:'8px'}}>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.7}}>BRIDGE's housing portfolio focuses on the enabling layer — verification systems, oversight platforms, guarantee products, and cooperative structures — that make housing transactions trustworthy and financeable for the majority of Ghanaians. This approach is deliberately more capital-efficient than development: it fixes the system that makes housing unworkable.</p>
              <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>The System-Layer Approach</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',alignContent:'start'}}>
            {[{v:'1.8M',l:'Unit housing\ndeficit'},{v:'4,500',l:'Formally built\nper year'},{v:'0.8%',l:'Mortgage\nto GDP'},{v:'24mo',l:'Average advance\nrequired'}].map((s,i)=>(
              <div key={i} style={{background:C.ink,padding:'14px 12px',textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'clamp(14px,2vw,22px)',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'5px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',whiteSpace:'pre-line',lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>The Structural Barrier Stack</div>
        <Carousel items={S.constraints} darkBg={false} renderCard={(row,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px 16px',height:'100%'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
              <div style={{width:'28px',height:'28px',background:C.forest,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'13px',color:C.lime,fontFamily:F.mono,fontWeight:700}}>{i+1}</div>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink}}>{row.c}</div>
            </div>
            <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.65}}>{row.harm}</div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>View all 6 barriers</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'160px 1fr',background:C.forest}}>
            {['Barrier','Mechanism of Harm'].map((h,i)=><div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>)}
          </div>
          {S.constraints.map((row,i)=>(
            <div key={i} className={i>=1?open?'':'mob-item-hidden':''} style={{display:'grid',gridTemplateColumns:'160px 1fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
              <div style={{padding:'10px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{row.c}</div>
              <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55,borderLeft:`1px solid ${C.border}`}}>{row.harm}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>Ghana's housing system is not broken. It was never built for the 95% of the population it cannot serve. — BRIDGE Housing Sector Analysis, 2026</div>
        <div style={{marginTop:'28px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · Land Registration by Region</div>
              <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Title Registration Coverage — Greater Accra to Northern Regions</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'24px',color:C.lime}}>2%</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'1px',textTransform:'uppercase'}}>national average</div></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderTop:`1px solid rgba(255,255,255,0.06)`}} className="tc">
            {[{region:'Greater Accra',pct:'8%',note:'Highest nationally; Title Verification Platform pilot market',col:C.amber},{region:'Ashanti',pct:'4%',note:'Secondary market; low formal registration despite urban density',col:C.amber},{region:'Northern Regions',pct:'<0.5%',note:'Almost entirely customary; Title Verification works regardless',col:C.red}].map((r,i)=>(
              <div key={i} style={{padding:'14px 18px',borderRight:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
                <div style={{width:'24px',height:'4px',background:r.col,marginBottom:'8px'}}/>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'4px'}}>{r.region}</div>
                <div style={{fontFamily:F.mono,fontSize:'22px',fontWeight:500,color:r.col,marginBottom:'4px'}}>{r.pct}</div>
                <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5}}>{r.note}</div>
              </div>
            ))}
          </div>
          <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
            <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.6,margin:0}}>BRIDGE's Title Verification Platform does not require formal title registration to operate. It aggregates the available documentation — registry data, court records, vendor history, community tenure records — and produces a structured risk report within the existing customary system. This is the entire point: the platform works now, not after Ghana reforms its land tenure system.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ FINANCE BARRIERS ══════════════════════════════════════════════════ */
const FinanceBarriers=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-finance" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="04" label="Finance & Rental Barriers" badge="0.8% mortgage-to-GDP" hint="Mortgage peer comparison · 24-month advance mechanics · rental yield vs access barriers" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div className="sec-rule mob-hide"/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 04 — Finance & Rental Barriers</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Mortgages at 31% — and a 24-Month Advance Requirement</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana's formal mortgage market serves fewer than 30,000 Ghanaians. The informal rental market demands cash advances that exceed most households' annual income. These are not edge cases — they are the norm for a market that was never designed to serve 95% of the population it exists to house.</p>
      <Fig02MortgagePeers/>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px'}} className="tc">
        <div>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana's mortgage market is the thinnest in the region by almost any measure. Mortgage credit as a percentage of GDP stands at 0.8% — compared to 5.1% in Kenya, 1.5% in Nigeria, and 32% in South Africa. The primary cause is not lack of demand. It is the combination of cedi-denominated interest rates running 25–37% annually, loan-to-value ratios that require 30–40% down payments, and income verification requirements that exclude the 80%+ of Ghana's workforce in informal employment.</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>In the rental market — where approximately 40% of urban households and 19 million Ghanaians live — the dysfunction is different but equally severe. Landlords, burned by tenant default and the near-impossibility of legal eviction, require 12–24 months' advance rent in cash before handing over keys. For a household earning GH₵3,000 per month and renting at GH₵800, a 24-month advance represents 6.4 years of housing costs paid upfront. The rental guarantee product BRIDGE deploys makes this practice unnecessary.</p>
          <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'20px',marginTop:'20px'}}>
            <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.5}}>Accra rental yields of 8–10% are genuinely attractive to diaspora investors. But the 24-month advance requirement locks out the tenants who would fill those properties. BRIDGE's guarantee product solves both sides simultaneously.</p>
            <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE Housing Analysis, 2026</div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'8px',alignContent:'start'}}>
          {[{v:'25–37%',l:'Cedi mortgage\ninterest range',sub:'Unaffordable for 95%+ of households'},{v:'60,000+',l:'Land disputes\nin courts',sub:'Average 10–20 years to resolve'},{v:'8–10%',l:'Accra rental\nyield',sub:'Attractive once trust infrastructure exists'},{v:'19M',l:'Ghanaians\nin rental housing',sub:'All face the advance requirement'}].map((s,i)=>(
            <div key={i} style={{background:C.ink,padding:'14px 16px'}}>
              <div style={{fontFamily:F.mono,fontSize:'clamp(16px,2vw,24px)',fontWeight:500,color:i===2?C.lime:C.red,lineHeight:1,marginBottom:'3px'}}>{s.v}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',whiteSpace:'pre-line',lineHeight:1.4,marginBottom:'3px'}}>{s.l}</div>
              <div style={{fontFamily:F.body,fontSize:'9px',color:'rgba(255,255,255,0.2)',fontStyle:'italic',lineHeight:1.4}}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  </div>
  );
};

/* ═══ LAND TENURE ════════════════════════════════════════════════════════ */
const LandTenure=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-land" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="05" label="Land Tenure" badge="78% Customary" hint="Tenure type distribution · title registration by region · how BRIDGE operates within the customary system" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 05 — Land Tenure</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>78% of Ghana's Land Is Customary — And Legally Opaque</h2>
        <Fig03LandTenure/>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px'}} className="tc">
          <div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana's land tenure system is one of the most complex on the continent. Approximately 78% of land is held under customary tenure — controlled by traditional authorities, families, or clans — with no formal registration, no standardised documentation, and no clear legal title that a bank can recognise as collateral or a buyer can rely on as proof of ownership. The result: over 60,000 land cases in the courts at any given time, disputes that take a decade or more to resolve, and a market where buyers routinely pay for land that has been sold multiple times simultaneously.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300}}>BRIDGE's Title Verification Platform does not attempt to solve Ghana's land tenure system — a generational policy challenge. It builds a practical layer on top of the existing system: verification of what documentation exists, who has been party to prior transactions, and what risk flags a buyer or financier should know before proceeding. This converts an opaque, high-risk transaction environment into one where informed decisions are possible.</p>
          </div>
          <div>
            <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
              <div style={{background:C.forest,padding:'10px 14px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',color:C.lime,marginBottom:'3px',textTransform:'uppercase'}}>◆ Members Intelligence</div>
                <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>60,000+ Land Disputes in Court</div>
              </div>
              {[{l:'Average resolution time',v:'10–20 years'},{l:'Cases in Greater Accra',v:'35%+ of total'},{l:'Annual new disputes',v:'~5,000'},{l:'BRIDGE platform risk flag rate',v:'Est. 28% of parcels'}].map((r,i)=>(
                <div key={i} style={{padding:'9px 14px',borderBottom:i<3?`1px solid ${C.border}`:'none',display:'flex',justifyContent:'space-between',background:i%2===0?C.paper:C.paperDark}}>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic'}}>{r.l}</span>
                  <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.v}</span>
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

/* ═══ CONSTRUCTION QUALITY ══════════════════════════════════════════════ */
const ConstructionQuality=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-construction" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="06" label="Construction Quality" badge="90% Informal" hint="Formal vs. informal oversight comparison · contractor verification system · skills certification pipeline" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 06 — Construction Quality</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>90% Informal, 12% Professionally Supervised</h2>
        <Fig04ConstructionQuality/>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px'}} className="tc">
          <div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>When Ghanaians build — and most build incrementally, adding rooms and floors over years as resources allow — they build without professional supervision, without approved engineering plans, and typically without certified contractors. This is not a choice; it is a rational response to a professional services market that prices itself out of reach for 90% of the population. The outcome is a housing stock that structural engineers regularly describe as Ghana's largest unacknowledged safety risk.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300}}>BRIDGE's Construction Oversight Platform and Contractor Verification System address this at the transaction level — making it easy for households to access professional oversight and verify contractor credentials. Construction Skills Certification completes the stack by building the supply of qualified tradespeople that the oversight and verification systems require. The gap is not skill; it is system.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'8px',alignContent:'start'}}>
            {[{v:'90%',l:'Housing built\ninformally',col:C.red},{v:'12%',l:'Informal builds with\nprofessional oversight',col:C.red},{v:'95%',l:'Formally supervised\noversight rate',col:C.positive},{v:'7.9×',l:'Quality improvement\npotential',col:C.lime}].map((s,i)=>(
              <div key={i} style={{background:C.ink,padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',whiteSpace:'pre-line',lineHeight:1.4}}>{s.l}</div>
                <div style={{fontFamily:F.mono,fontSize:'22px',fontWeight:500,color:s.col}}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ MARKET OPPORTUNITY ════════════════════════════════════════════════ */
const MarketOpportunity=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-market" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="07" label="Market Opportunity" badge="8–10% Yield" hint="Rental yield analysis · diaspora investor case · rental dynamics table · BRIDGE double-sided solution" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 07 — Market Opportunity</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>8–10% Rental Yield — Locked Behind Two Barriers</h2>
        <Fig06RentalDynamics/>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px',marginTop:'20px'}} className="tc">
          <div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Accra's 8–10% residential rental yields are genuinely attractive to investors — comparable to established commercial real estate markets and well above most fixed-income alternatives. The challenge is not the underlying yield; it is the trust and management infrastructure that makes that yield accessible. Two barriers lock out both sides of the market simultaneously.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>On the landlord side: no mechanism exists to verify that a new tenant will pay reliably over a multi-year tenancy. The 24-month advance is the crude solution to this verification problem. BRIDGE's Rental Guarantee replaces the advance with an insurance-backed product — giving landlords the security they need without requiring upfront cash from tenants.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300}}>On the diaspora investor side: 8–10% yields are compelling from London or Toronto. But managing a property remotely — tenant selection, rent collection, maintenance, legal compliance — is practically impossible without in-country infrastructure. BRIDGE Property Management converts the yield into a hands-off investment product, unlocking diaspora capital that currently sits on the sidelines.</p>
          </div>
          <div>
            <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
              <div style={{background:C.ink,padding:'10px 14px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',color:C.lime,marginBottom:'3px',textTransform:'uppercase'}}>◆ Members Intelligence</div>
                <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>Diaspora Real Estate Opportunity</div>
              </div>
              {[{l:'Diaspora remittances to Ghana',v:'$4.7B (2024)'},{l:'Real estate share of remittances',v:'Est. 18–22%'},{l:'BRIDGE target AUM (Yr 3)',v:'500+ units managed'},{l:'Mgmt fee revenue (500 units)',v:'~$600K–900K/yr'},{l:'Diaspora buyer challenge',v:'In-country execution'}].map((r,i)=>(
                <div key={i} style={{padding:'9px 14px',borderBottom:i<4?`1px solid ${C.border}`:'none',display:'flex',justifyContent:'space-between',background:i%2===0?C.paper:C.paperDark}}>
                  <span style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic'}}>{r.l}</span>
                  <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.forest,textAlign:'right',maxWidth:'50%'}}>{r.v}</span>
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

/* ═══ PORTFOLIO OVERVIEW ════════════════════════════════════════════════ */
const PortfolioOverview=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-overview" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="08" label="Portfolio Overview" badge="19 Ventures" hint="System-layer first approach · venture matrix by score and capital · phase capital summary" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 08 — Portfolio Overview</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>19 Ventures: System-Layer First, Development Second</h2>
        <Fig05VentureMatrix/>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Verification, oversight, and guarantee products before development. BRIDGE fixes the system that makes housing unworkable before committing capital to build units at a market that cannot absorb them. The 6 Phase 1 ventures score 38–41 on the BRIDGE Priority Score and require $4.6–8M — producing the trust infrastructure that makes all 13 subsequent ventures viable.</p>
        <Fig09CapitalPhases/>
        <div style={{marginTop:'20px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{background:C.forest,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',color:C.lime,marginBottom:'3px',textTransform:'uppercase'}}>◆ Members Intelligence · Phase 1 Capital Analysis</div>
              <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.paper}}>Why System-Layer Investment is the Highest-IRR Entry Point</div>
            </div>
            <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'12px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px',flexShrink:0}}>$4.6–8M · 6 VENTURES</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',borderTop:`1px solid rgba(255,255,255,0.06)`}} className="tc">
            {[{title:'Platform businesses, not project finance',body:'Construction Oversight, Title Verification, and Contractor Verification are recurring-revenue platforms — fees per transaction, per site visit, per report. Capital is deployed once; revenue scales with volume.'},{title:'Insurance products, not credit products',body:'Rental Guarantee Products partner with licensed insurers — BRIDGE provides the data infrastructure, insurers provide the balance sheet. Capital efficient by design: BRIDGE earns management fees, not insurance risk.'}].map((r,i)=>(
              <div key={i} style={{padding:'16px 18px',borderRight:i<1?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'6px'}}>{r.title}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.6}}>{r.body}</div>
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
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  const[t2o,setT2o]=useState(false);
  const t1=S.ventures.filter(v=>v.tier===1);
  const t2=S.ventures.filter(v=>v.tier===2);
  const t3=S.ventures.filter(v=>v.tier===3);
  const VRow=({v,i,last})=>(
    <div style={{display:'grid',gridTemplateColumns:'28px 2fr 88px 80px 60px 70px 70px',borderBottom:!last?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
      <div style={{padding:'9px 6px',fontFamily:F.mono,fontSize:'11px',color:C.lime,textAlign:'center',background:C.forest}}>{v.num}</div>
      <div style={{padding:'9px 12px',borderLeft:`1px solid ${C.border}`}}>
        <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{v.name}</div>
        <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',lineHeight:1.4}}>{v.desc}</div>
      </div>
      <div style={{padding:'8px 10px',borderLeft:`1px solid ${C.border}`}}>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,padding:'2px 6px',letterSpacing:'0.3px',background:MODE_BG[v.mode]||C.muted,color:MODE_TX[v.mode]||C.paper}}>{v.mode}</span>
      </div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'11px',color:C.forest,fontWeight:700,borderLeft:`1px solid ${C.border}`}}>{v.capital}</div>
      <div style={{padding:'8px 10px',borderLeft:`1px solid ${C.border}`}}><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[v.risk]||C.muted,letterSpacing:'0.3px'}}>{v.risk}</span></div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:C.forest,borderLeft:`1px solid ${C.border}`}}>{v.score}</div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'10px',color:C.faint,borderLeft:`1px solid ${C.border}`}}>{v.start}</div>
    </div>
  );
  const TH=()=>(
    <div style={{display:'grid',gridTemplateColumns:'28px 2fr 88px 80px 60px 70px 70px',background:C.forest}}>
      {['#','Venture','Mode','Capital','Score','Risk','Start'].map((h,i)=>(
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
      <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'4px'}}>Score: {v.score}</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[v.risk]||C.muted}}>{v.risk} RISK</span>
        <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>{v.start}</span>
      </div>
    </div>
  );
  return(
    <div id="sec-ventures" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="09" label="Venture Portfolio" badge="19 ventures" hint="Tier 1: $4.6–8M · Construction Oversight, Title Verification, Rental Guarantee, Property Management" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 09 — The Portfolio</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'5px 14px',letterSpacing:'1px'}}>19 ventures · $26–44M total</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>15 Ventures Across 3 Tiers</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced by urgency, leverage, and dependency — Tier 1 builds the physical and financial infrastructure that Tier 2 and 3 require. The sequencing is deliberate: cold storage and aggregation before processing; cooperative capital before export development.</p>
        <Fig05VentureMatrix/>
        {/* Tier 1 */}
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 1</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Priority Implementation — 2026–2028</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$6.3–12.6M · 6 ventures</span>
          </div>
          <div className="desk-only">
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
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Market Products — 2028–2030</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$9.3–15.2M · 6 ventures</span>
          </div>
          <div className="desk-only">
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
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Development — 2030+</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$12.3–21M · 7 ventures</span>
          </div>
          <div className="desk-only">
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
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  const phases=[S.timeline.phase1,S.timeline.phase2,S.timeline.phase3];
  const pColors=[C.lime,C.amber,C.muted];
  const pBg=[C.forest,C.paperDark,C.paper];
  const pTx=[C.paper,C.ink,C.ink];
  return(
    <div id="sec-roadmap" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="10" label="Deployment Roadmap" badge="3 phases" hint="Q1 2026 start · phase-by-phase milestones · critical path dependencies" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 10 — Implementation</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Deployment Roadmap</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced deployment across three phases — system infrastructure first, market products second, development third. Phase 1 is the critical window: Construction Oversight, Contractor Verification, Title Verification, Rental Guarantee, and Property Management all launch in Q1–Q2 2026.</p>
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
            {[{m:'Rental Guarantee Products',d:'Insurance partner MOU signed + tenant scoring methodology finalised before Q2 launch'},
              {m:'Title Verification Platform',d:'3 data source integrations (Lands Commission, court records, community registries) confirmed'},
              {m:'Housing Cooperatives',d:'Phase 1 Contractor Verification + Oversight Platform operational — cooperatives need verified supply'},
              {m:'Phase 3 Development',d:'All Phase 1 and Phase 2 market products operational; institutional investor confidence demonstrated'}
            ].map((dep,i)=>(
              <div key={i} style={{padding:'8px 0',borderBottom:`1px solid ${C.border}`,display:'flex',gap:'10px'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,flexShrink:0,minWidth:'140px'}}>{dep.m}</span>
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
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-coinvest" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="◆" label="Investment Thesis" badge="3 phases" hint="System-layer IRR logic · rental asset class creation · deployment parameters · partner profile" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>◆ Members Intelligence · Investment Thesis</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>$26–44M · 19 ventures</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Else Is Investing — and Where BRIDGE Fits</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Ghana's housing investment landscape is fragmented between DFIs focused on mortgage market reform (multi-year horizons), developers chasing the top 5% of the market, and PropTech startups without on-the-ground operations. BRIDGE occupies the operational system-layer role no other actor is positioned to fill.</p>
        <div style={{background:C.paperDark,padding:'14px 20px',border:`1px solid ${C.border}`,marginBottom:'20px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>BRIDGE's Positioning in the Housing Investment Landscape</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}} className="tc">
            {[
              {l:'What DFIs provide',v:"Mortgage market reform capital, affordable housing grants — but cannot operate verification platforms or rental guarantee products"},
              {l:'What PropTech provides',v:"Digital infrastructure and data products — but cannot manage properties, certify contractors, or underwrite rental guarantees"},
              {l:'What BRIDGE provides',v:"Platform operations, insurance partnerships, cooperative legal structures, property management — the operational layer that makes all other actors viable"},
            ].map((p,i)=>(
              <div key={i} style={{padding:'10px 12px',background:C.paper,border:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>{p.l}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.55,fontStyle:'italic'}}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px',marginBottom:'24px'}} className="tc">
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Why Phase 1 Is the Highest-Return Entry Point</div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.thesis}</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300}}>{S.thesis2}</p>
            <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'20px',marginTop:'20px'}}>
              <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.5}}>When a Ghanaian household secures housing without paying two years' rent upfront, that is not just a better IRR on a BRIDGE venture. That is a family whose savings stay in their hands.</p>
              <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE Housing Assessment, 2026</div>
            </div>
          </div>
          <div>
            <div style={{background:C.forest,padding:'14px 16px',marginBottom:'1px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'10px'}}>Deployment Parameters</div>
              {S.deploy.map((p,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<5?'1px solid rgba(255,255,255,0.08)':'none',gap:'8px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.4)'}}>{p.l}</span>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,textAlign:'right',maxWidth:'55%'}}>{p.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>BRIDGE's housing architecture is designed to layer: Phase 1 system infrastructure enables Phase 2 market products; Phase 2 data and institutional confidence enables Phase 3 development. This sequencing protects capital by ensuring development is never the first bet.</div>
      </div>
    </div>
    </div>
  );
};

/* ═══ CROSS-SECTOR SYNERGY ════════════════════════════════════════════════ */
const CrossSectorSynergy=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-synergy" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="11" label="Cross-Sector Links" badge="8 sector links" hint="Financial inclusion, infrastructure, education, technology, energy — housing stability unlocks all 12 sectors" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'24px',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Section 11 — System Integration</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.ink}}>Housing as Foundation</h2>
          </div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'6px 14px',letterSpacing:'1px',flexShrink:0}}>8 sector links</div>
        </div>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>A household without stable housing cannot save, plan, invest, or build. Housing stability is the precondition for every other outcome BRIDGE works toward — financial inclusion, health, education, agricultural productivity. When BRIDGE builds the housing infrastructure layer, it simultaneously de-risks interventions across the full 12-sector portfolio.</p>
        {/* Mobile synergy carousel */}
        <Carousel items={S.synergies} renderCard={(syn,i)=>(
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
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-risk" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="12" label="Risk & Thesis" badge="6 risk categories" hint="Land tenure, finance constraints, contractor quality, regulatory, concentration, execution — 6 mitigated risks" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 12 — Risk Analysis</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Risk &amp; Mitigation</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Housing investment in Ghana carries real risks — BRIDGE's system-layer sequencing, insurance partnerships, and phased capital deployment are each designed to manage a specific risk category. Phase 1 does not require mortgage market reform; it builds the trust infrastructure that makes reform worth having.</p>
        {/* Mobile risk carousel */}
        <Carousel items={S.risks} renderCard={(r,i)=>(
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
            <div key={i} className={i>=1?open?'':'mob-item-hidden':''} style={{display:'grid',gridTemplateColumns:'1.8fr 100px 2.5fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'start'}}>
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
  const[intent,setIntent]=useState(null);
  const[pkgOpen,setPkgOpen]=useState(false);

  const packageItems=[
    {item:'19-Venture Financial Models',detail:'10-year projections for all 19 ventures — revenue build, cost structure, scenario analysis for currency risk and construction cost inflation.'},
    {item:'Construction Oversight Platform',detail:'Technology architecture, inspector network deployment plan, fee structure, and certification integration with NVTI and insurance partners.'},
    {item:'Title Verification Platform',detail:'Data source integration map, risk-scoring methodology, legal framework, and diaspora buyer acquisition strategy.'},
    {item:'Rental Guarantee Products',detail:'Full actuarial model, insurance partner terms, underwriting criteria, tenant scoring methodology, and claims management infrastructure.'},
    {item:'Property Management Service',detail:'Diaspora client acquisition funnel, fee structure, operational model for 500+ units, and technology stack.'},
    {item:'Contractor Verification System',detail:'Vetting methodology, rating system, platform integration with oversight, and 200-contractor launch pipeline.'},
    {item:'Housing Cooperative Structure',detail:'Legal framework, savings model, land acquisition strategy, and first cohort plan for 10 founding cooperatives.'},
    {item:'Rent Advance Financing',detail:'MFI partnership terms, repayment structure, default management framework, and integration with rental guarantee.'},
    {item:'PropTech Investment Fund',detail:'Ghana PropTech landscape assessment, 10-company investment pipeline, and preferred fund structure.'},
    {item:'Affordable Housing Development',detail:'Site assessment for 3 Greater Accra locations with full feasibility analysis and government partnership framework.'},
    {item:'Diaspora Real Estate Programme',detail:'Market entry guide, verified developer network, management services package, and investment returns modelling.'},
    {item:'Quarterly Housing Intelligence',detail:'Construction cost indices, rental market rates by neighbourhood, permit activity, and venture status updates every quarter.'},
  ];

  const partnershipPhases=[
    {phase:'01',title:'Mandate Alignment',dur:'2–3 hrs',desc:'BRIDGE maps your capital profile, priorities, and risk parameters against the 12-sector portfolio. Honest, direct, specific.'},
    {phase:'02',title:'Bespoke Intelligence Build',dur:'4–6 wks',desc:'Custom financial models, due diligence frameworks, and co-investment capital stack built for your mandate.'},
    {phase:'03',title:'Market Access',dur:'Ongoing',desc:'Direct introductions to insurance partners, MFI networks, cooperative structures, and PropTech companies in your target zones.'},
    {phase:'04',title:'Deal Origination',dur:'Rolling',desc:'Into opportunities before market-ready — at founder terms, with BRIDGE operational management. You bring capital. We bring Ghana.'},
  ];

  return(
    <div id="upsell" style={{background:C.ink,position:'relative',overflow:'hidden'}}>

      {/* Ghost watermark */}
      <div style={{position:'absolute',right:'-20px',top:'40px',fontFamily:F.display,fontSize:'clamp(100px,20vw,280px)',fontWeight:900,color:'rgba(255,255,255,0.018)',pointerEvents:'none',userSelect:'none',letterSpacing:'-10px',lineHeight:1}}>08</div>

      {/* ── Membership bar ── */}
      <div style={{background:'rgba(184,217,53,0.06)',borderBottom:'1px solid rgba(184,217,53,0.1)',padding:'9px 64px'}} className="pad-topbar">
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{position:'relative',width:'8px',height:'8px',flexShrink:0}}>
              <div style={{position:'absolute',inset:0,borderRadius:'50%',background:C.lime,opacity:0.3,animation:'barGrow 2s ease-in-out infinite'}}/>
              <div style={{position:'absolute',inset:'1px',borderRadius:'50%',background:C.lime}}/>
            </div>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>Members Access Active</span>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.2)'}}>· Sector 08 of 12 · Full edition included</span>
          </div>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.18)'}}>intelligence@bridgepbc.com</span>
        </div>
      </div>

      {/* ── Core CTA block ── */}
      <div className="pad-upsell" style={{padding:'44px 64px 0',position:'relative'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>

          {/* Headline */}
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <div style={{width:'28px',height:'2px',background:C.lime,flexShrink:0}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)'}}>What comes next</span>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,4vw,48px)',fontWeight:900,fontStyle:'italic',color:C.paper,lineHeight:1.1,letterSpacing:'-1px',marginBottom:'12px',maxWidth:'700px'}}>
            You have the intelligence.<br/>
            <span style={{color:C.lime}}>Now let's deploy it.</span>
          </h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.45)',lineHeight:1.75,maxWidth:'580px',marginBottom:'28px',fontStyle:'italic'}}>Your Members brief is the strategic layer. The next step is operational — financial models, due diligence tools, local relationships, and BRIDGE alongside you as you move from conviction to capital.</p>

          {/* ── Intent selector — 3 buttons ── */}
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'12px'}}>What are you looking for?</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',marginBottom:'24px'}} className="tc">
            {[
              {key:'package',
               icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
               label:'Full Package',sub:'Operational tools & models'},
              {key:'partnership',
               icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
               label:'Partnership',sub:'Work directly with BRIDGE'},
              {key:'briefing',
               icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
               label:'30-Min Briefing',sub:'No commitment, find fit first'},
            ].map((opt)=>{
              const active=intent===opt.key;
              return(
                <button key={opt.key} onClick={()=>setIntent(active?null:opt.key)}
                  style={{background:active?'rgba(184,217,53,0.1)':'rgba(255,255,255,0.03)',border:active?`1.5px solid ${C.lime}`:'1px solid rgba(255,255,255,0.1)',padding:'16px 16px',cursor:'pointer',textAlign:'left',transition:'background 0.18s,border-color 0.18s',display:'flex',alignItems:'center',gap:'14px'}}>
                  <div style={{color:active?C.lime:'rgba(255,255,255,0.35)',flexShrink:0,transition:'color 0.2s'}}>{opt.icon}</div>
                  <div style={{minWidth:0}}>
                    <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:active?C.lime:C.paper,marginBottom:'2px',transition:'color 0.2s'}}>{opt.label}</div>
                    <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.3)',fontStyle:'italic'}}>{opt.sub}</div>
                  </div>
                  <div style={{marginLeft:'auto',flexShrink:0,color:active?C.lime:'rgba(255,255,255,0.15)',fontFamily:F.sans,fontSize:'14px',transition:'all 0.2s',transform:active?'rotate(90deg)':'none'}}>›</div>
                </button>
              );
            })}
          </div>

          {/* ── Package detail panel ── */}
          {intent==='package'&&(
            <div style={{border:'1px solid rgba(184,217,53,0.2)',background:'rgba(184,217,53,0.04)',marginBottom:'20px',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(184,217,53,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.lime,marginBottom:'2px'}}>Full Intelligence Package — Housing & Real Estate Sector</div>
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
                <a href="mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Housing Sector"
                  className="cta-primary" style={{background:C.lime,color:C.ink,padding:'10px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',flexShrink:0}}>
                  Request Scope →
                </a>
              </div>
            </div>
          )}

          {/* ── Partnership detail panel ── */}
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
                <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.3)'}}>Starts with a conversation. If fit isn't there, we'll tell you directly.</span>
                <a href="mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Housing"
                  style={{background:'rgba(255,255,255,0.08)',border:`1px solid ${C.lime}`,color:C.lime,padding:'10px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',flexShrink:0}}>
                  Start the Conversation →
                </a>
              </div>
            </div>
          )}

          {/* ── Briefing detail panel ── */}
          {intent==='briefing'&&(
            <div style={{border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.03)',marginBottom:'20px',padding:'20px 22px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
              <div style={{maxWidth:'480px'}}>
                <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper,marginBottom:'6px'}}>30-Minute Mandate Briefing — No Commitment</div>
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.65}}>Tell us your capital profile and sector focus. We'll show you exactly which of the 19 Housing ventures match your mandate — and be direct if the fit isn't there. Takes 30 minutes. No pitch deck.</div>
              </div>
              <a href="mailto:intelligence@bridgepbc.com?subject=Briefing Request — Housing Sector"
                style={{background:C.lime,color:C.ink,padding:'14px 28px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',flexShrink:0,display:'flex',alignItems:'center',gap:'8px'}}>
                Schedule Now <span style={{fontSize:'16px'}}>→</span>
              </a>
            </div>
          )}

          {/* ── Urgency strip — always visible ── */}
          <div style={{border:`1px solid ${C.amber}`,borderLeft:`3px solid ${C.amber}`,background:'rgba(184,115,10,0.08)',padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px',marginBottom:'0'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
              <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.amber,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0}}>⚡ Q1–Q2 2026</span>
              <div style={{width:'1px',height:'20px',background:'rgba(184,115,10,0.35)',flexShrink:0}}/>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>Phase 1 System Layer — Deployment Window Open</span>
              <span className="mob-hide" style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.35)',fontStyle:'italic'}}>Construction Oversight + Contractor Verification: Q1 2026. Rental Guarantee + Property Management: Q2 2026.</span>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:C.amber,flexShrink:0}}>6 ventures</div>
          </div>

        </div>
      </div>

      {/* ── Footer row ── */}
      <div className="pad-upsell" style={{padding:'20px 64px 36px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px',borderTop:'1px solid rgba(255,255,255,0.07)',paddingTop:'18px'}}>
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.2)',lineHeight:1.6,margin:0,maxWidth:'480px'}}>No published price list. Every engagement starts with a conversation. If the fit isn't there, we'll tell you directly.</p>
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
          Sector 08 of 12 · Housing &amp; Real Estate<br/>
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

export default function HousingBrief(){
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
      <SupplyGap/>
      <FinanceBarriers/>
      <LandTenure/>
      <ConstructionQuality/>
      <MarketOpportunity/>
      <PortfolioOverview/>
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
