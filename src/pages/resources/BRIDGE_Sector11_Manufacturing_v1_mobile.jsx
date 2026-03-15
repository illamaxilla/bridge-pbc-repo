import { useState, useEffect, useRef } from "react";
import React from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BRIDGE SECTOR 11 — Manufacturing & Light Industry
   Full Members Edition · March 2026 · Standalone Document
═══════════════════════════════════════════════════════════════════════════ */

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF',teal:'#2E5A4D'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};
const RISK_COLOR={LOW:C.positive,MEDIUM:C.amber,HIGH:C.red,'LOW-MED':C.amber};
const MODE_BG={'Direct Op':C.forest,'Partnership':C.amber,'Investment':C.teal,'Guidance':C.paperDark,'Network':C.ink};
const MODE_TX={'Direct Op':C.lime,'Partnership':C.white,'Investment':C.paper,'Guidance':C.muted,'Network':'rgba(250,248,243,0.6)'};

/* ═══ SECTOR DATA ════════════════════════════════════════════════════════ */
const S={
  num:'11',name:'Manufacturing & Light Industry',tier:'Core',score:79,capital:'$11–18.5M',edition:'March 2026 Edition',
  tagline:'Ghana exports shea at 1× value and imports cosmetics processed from it at 28×. Factories run at 30–40% capacity while AfCFTA opens a 1.4 billion consumer market. The constraint is not demand or raw materials — it is power cost, skills, working capital, and quality certification. BRIDGE addresses all four.',
  stats:[{l:'Manufacturing Share of GDP',v:'7.8%'},{l:'Average Capacity Utilisation',v:'30–40%'},{l:'AfCFTA Consumer Market',v:'1.4B'},{l:'Shea Value Multiplier',v:'1× → 28×'}],
  scoreDims:[{d:'Market Opportunity',w:'30%',s:84},{d:'Development Impact',w:'30%',s:85},{d:'Implementation Feasibility',w:'25%',s:76},{d:'Financial Sustainability',w:'15%',s:72}],
  snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'79/100'},{l:'Priority',v:'Immediate deployment'},{l:'Portfolio Range',v:'$11–18.5M'},{l:'Timeline',v:'2026–2030'},{l:'Ventures Identified',v:'14'}],
  summary:'Ghana\'s manufacturing sector presents a structural paradox: factories run at 30–40% capacity utilisation while the AfCFTA continental market — 1.4 billion consumers, $3.4 trillion GDP — sits at the door. The industrial base exists. Over 600,000 formal manufacturing workers, 500+ free zone enterprises, and 126 operational 1D1F factories demonstrate a manufacturing foundation that is real and functional. What is absent is the enabling layer that converts existing capacity into competitive exports.',
  summary2:'BRIDGE\'s manufacturing thesis does not start with factories. It starts with the value chain gap. Ghana exports shea nuts at $600 per tonne and imports cosmetics processed from them at $16,000+ per tonne. It exports raw cocoa at 2× value and imports chocolate at 30×. The raw material is Ghanaian. The jobs, the processing margin, the brand value — they are not. The BRIDGE portfolio is designed around a single question: how do we capture more of that value chain in Ghana, for Ghanaian workers and communities?',
  summary3:'The 2026 national budget and the 24-Hour Economy Policy create a deployment environment of rare alignment. The 1D1F programme has demonstrated both Ghana\'s manufacturing ambition and the gap between announcement and productive operation. BRIDGE\'s enabling-layer portfolio — agro-processing infrastructure, skills academies, quality certification, and C&I solar — directly closes that gap, turning announced capacity into operating revenue and announced jobs into real employment.',
  quote:'"Ghana exports shea nuts at 1× value and imports shea butter cosmetics at 28×. The raw material is Ghanaian. The jobs, the processing, the brand value — they are not. BRIDGE\'s manufacturing portfolio is built around a single question: how do we capture more of that value chain in Ghana?"',

  subs:[
    {name:'Agro-Processing & Value Addition',score:88,stage:'Series A Ready',capital:'$4–6M',note:'Shea, cocoa, cassava, plantain — 10–28× value capture opportunity'},
    {name:'Food & Beverage Manufacturing',score:85,stage:'Active',capital:'$3–5M',note:'Import substitution + AfCFTA export; 42% capacity → 85% achievable'},
    {name:'Personal Care & Cosmetics',score:84,stage:'Seed–A',capital:'$2–4M',note:'Ghana-origin shea/coconut brands; diaspora channels; premium clean beauty'},
    {name:'Quality Certification Services',score:82,stage:'Seed–A',capital:'$1–2M',note:'Highest capital efficiency venture; unlocks export markets for 50+ SMEs'},
    {name:'Manufacturing Skills Academy',score:80,stage:'Seed–A',capital:'$1–1.5M',note:'Critical skills gap; 80%+ informal workforce; 1D1F programme constraint'},
    {name:'Pharmaceuticals & Healthcare Mfg',score:72,stage:'Early',capital:'$1.5–2.5M',note:'30% domestic market share; WHO pre-qualification opens Sub-Saharan Africa'},
  ],

  constraints:[
    {c:'Power Cost Premium',harm:'Industrial electricity at $0.132/kWh — 2–3× regional competitors. This single factor accounts for more of the capacity utilisation gap than any other variable and directly suppresses export competitiveness.'},
    {c:'Working Capital Scarcity',harm:'Banks classify manufacturing SMEs as high-risk; short-tenor, high-rate finance is the norm. Production runs are constrained by cash cycle, not demand. Under-utilised equipment is the visible result.'},
    {c:'Quality Certification Barrier',harm:'ISO 9001, HACCP, GFSI, and AfCFTA rules-of-origin documentation remain largely inaccessible to SME manufacturers. Without certification, export markets are closed — regardless of product quality.'},
    {c:'Skills Bottleneck',harm:'80%+ of manufacturing workforce is informal — uncertified, untrained in modern quality systems. The technical gap limits throughput, product consistency, and the ability to win formal supply chain contracts.'},
    {c:'Raw Material Inconsistency',harm:'Fragmented smallholder supply creates volume and quality unpredictability. Processors cannot run efficient production cycles when input quality fluctuates and delivery schedules are informal.'},
    {c:'1D1F Execution Gap',harm:'250+ factories announced; 126 operational; 88 in actual production. The announcement-to-operation gap is the clearest evidence that building factories without the enabling layer produces idle assets, not jobs.'},
  ],

  cropLoss:[
    {crop:'Food & Beverage',cur:42,tgt:85,note:'Largest sub-sector; highest achievable utilisation with working capital + power'},
    {crop:'Pharmaceuticals',cur:55,tgt:90,note:'Best current performer; WHO pre-qualification opens Sub-Saharan Africa export'},
    {crop:'Building Materials',cur:38,tgt:75,note:'1.8M unit housing deficit drives demand; raw material advantage untapped'},
    {crop:'Personal Care',cur:30,tgt:80,note:'28× shea value multiplier; diaspora channels ready; certification is the gate'},
    {crop:'Textiles & Garments',cur:28,tgt:75,note:'Lowest performer; conditional on C&I solar reducing power cost exposure'},
    {crop:'Packaging',cur:35,tgt:70,note:'BRIDGE portfolio off-take anchors local demand for Phase 2 investment'},
  ],

  zones:[
    {zone:'Greater Accra Industrial',regions:'Greater Accra, Tema Free Zone',crops:'Pharmaceuticals, personal care, food processing, packaging',alloc:35,allocLabel:'35%',color:C.lime,interventions:'Quality certification hub; pharmaceutical expansion; personal care manufacturing; packaging production',context:'Largest industrial cluster; port access; free zone infrastructure; highest formal sector concentration'},
    {zone:'Ashanti & Middle Belt',regions:'Ashanti, Eastern, Bono',crops:'Agro-processing, textiles, building materials, beverages',alloc:30,allocLabel:'30%',color:C.amber,interventions:'Agro-processing hubs; Kente textile manufacturing; building materials; beverage manufacturing',context:'Kumasi industrial base; agricultural feedstock proximity; BRIDGE Agriculture portfolio overlap'},
    {zone:'Northern Processing Corridor',regions:'Northern, Upper East/West, Savannah',crops:'Shea processing, groundnut, soya, agri-inputs',alloc:22,allocLabel:'22%',color:C.teal,interventions:'Shea Value Addition; agro-processing SMEs; women\'s cooperative manufacturing; cold press extraction',context:'Raw material advantage — 40% of global shea supply; BRIDGE Agriculture portfolio direct feedstock'},
    {zone:'Coastal & Volta Export Zone',regions:'Central, Western, Volta',crops:'Cocoa processing, seafood, salt, coconut products',alloc:13,allocLabel:'13%',color:C.muted,interventions:'Cocoa processing; coconut products; export platform; AfCFTA regional export logistics',context:'Port and export infrastructure; ECOWAS market proximity; AfCFTA secretariat institutional advantage'},
  ],

  competitors:[
    {type:'Agro-Processing',name:'Olam Ghana',desc:'Large-scale commodity trading and some processing operations in cocoa and cashew. Operates at scale BRIDGE does not target — mid-market SME processing is underserved. Primarily extraction-focused rather than value-addition.',pos:'BRIDGE targets the SME agro-processing tier that Olam does not serve — cooperative feedstock supply + quality certification + AfCFTA access.'},
    {type:'Personal Care',name:'Unilever Ghana',desc:'Market leader in personal care and household products. Significant import content. Uses some local raw materials but processes in-country at limited scale. Leaves the premium Ghana-origin natural beauty market unaddressed.',pos:'BRIDGE targets the premium Ghana-origin personal care tier — shea, coconut, black soap — that multinationals systematically undervalue.'},
    {type:'Food Manufacturing',name:'Accra Brewery / ABInBev',desc:'Ghana\'s largest beverages manufacturer. Focuses on beer and mainstream RTD products. Does not address the premium natural beverage category (hibiscus, ginger, baobab) where Ghana-origin provenance commands international margins.',pos:'Non-competing — BRIDGE targets natural premium RTD export category, not mainstream beverages.'},
    {type:'Pharmaceutical',name:'Danadams / Kinapharma',desc:'Ghana\'s established domestic pharmaceutical manufacturers. Combined production covers ~30% of national medicine supply. Capital-constrained on expansion and WHO pre-qualification — the gap BRIDGE\'s partnership model addresses.',pos:'Partnership target, not competitor. BRIDGE provides expansion capital and quality system support to existing licensed manufacturers.'},
    {type:'Industrial Support',name:'GIPC / Ghana Enterprises Agency',desc:'Government-backed enterprise development agencies. Active in 1D1F programme coordination. Focused on policy and registration — do not provide operational manufacturing support, skills, or quality certification.',pos:'Institutional partners — BRIDGE operational support fills the gap between government announcement and productive manufacturing operation.'},
    {type:'Impact Finance',name:'Injaro / GroFin',desc:'Africa-focused SME-tier impact investors. Active in Ghana manufacturing finance. Provide capital but not the co-investment model, diaspora expertise, or cross-sector integration that defines BRIDGE\'s portfolio architecture.',pos:'Potential co-investors in Phase 2 ventures — BRIDGE builds the pipeline and de-risks early stage; Injaro/GroFin scale proven ventures.'},
  ],

  budgetItems:[
    {item:'1D1F Programme — 24-Hour Economy',ghc:'GH₵Multi-B',usd:'Factory activation capital',pct:100,mode:'Skills + quality + energy enabling layer',urgency:'2026 — 126 factories ready to activate',featured:true},
    {item:'AfCFTA Secretariat Support Budget',ghc:'GH₵850M+',usd:'~US$62M',pct:62,mode:'Export platform + rules-of-origin services',urgency:'2026–2028',featured:false},
    {item:'24-Hour Economy C&I Energy',ghc:'GH₵1.2B',usd:'~US$87M',pct:85,mode:'Solar co-investment for manufacturing clients',urgency:'Budget year 2026',featured:false},
    {item:'TVET & Skills Development Fund',ghc:'GH₵620M',usd:'~US$45M',pct:55,mode:'Manufacturing Skills Academy partnership',urgency:'Active — curriculum co-design open',featured:false},
    {item:'Export Promotion Authority',ghc:'GH₵280M',usd:'~US$20M',pct:28,mode:'Certification + AfCFTA market access',urgency:'2026 applications open',featured:false},
    {item:'Free Zone Enterprise Support',ghc:'GH₵380M',usd:'~US$28M',pct:35,mode:'BRIDGE portfolio company free zone status',urgency:'2026–2028 phased',featured:false},
  ],

  oilPalm:[
    {f:'1D1F Operational Factories',t:'126 factories — activation capital gap is the primary constraint'},
    {f:'24-Hour Economy Alignment',t:'Direct policy mandate for manufacturing sector revival'},
    {f:'AfCFTA Secretariat Advantage',t:'Ghana as host — institutional relationships that no other country holds'},
    {f:'TVET Co-Design Window',t:'Government actively seeking employer curriculum partners — 2026 open'},
    {f:'C&I Solar Leverage',t:'30–60% of industrial power hours coverable by solar — direct cost reduction'},
    {f:'Free Zone Incentives',t:'0% corporate tax for 10 years + import duty exemptions for BRIDGE portfolio companies'},
    {f:'Export Certification Support',t:'Government cost-sharing for ISO, HACCP, GFSI certification — 2026 programme'},
  ],

  ventures:[
    {tier:1,num:'①',name:'Agro-Processing Hub',desc:'Shared agro-processing facility serving multiple smallholder cooperatives and SME food manufacturers — cassava flour, plantain chips, dried fruits, and spice processing at industrial scale with food safety certification. Fee-per-use model maximises utilisation across cooperatives. Integration with BRIDGE Agriculture portfolio ensures feedstock reliability. AfCFTA export certification built in from inception.',mode:'Direct Op',capital:'$2–3.5M',irr:'15–20%',risk:'MEDIUM',payback:'5–7 yrs',start:'Q2 2026'},
    {tier:1,num:'②',name:'Shea Value Addition',desc:'Processing infrastructure for refined and cosmetic-grade shea butter — cold-press extraction, EU/US quality certification, and commercial partnership with diaspora cosmetics brands for premium retail market access. Partners with Northern Ghana women\'s shea cooperatives for feedstock supply. Targets 12–28× value capture versus current 1× raw export. Each tonne of premium-processed shea replacing raw export represents $9,400–14,400 in additional GDP captured in Ghana.',mode:'Direct Op',capital:'$1.5–2.5M',irr:'18–24%',risk:'LOW',payback:'4–6 yrs',start:'Q2 2026'},
    {tier:1,num:'③',name:'Packaged Foods Company',desc:'Consumer packaged foods targeting Ghana\'s expanding urban middle class and AfCFTA regional export markets — branded products in tomato paste, groundnut paste, coconut products, and ready-to-cook categories where import penetration is highest. GFSI-certified production standards. Sources primary inputs from BRIDGE agricultural cooperative network — creating demand certainty for cooperative members while building the export revenue that justifies agricultural investment.',mode:'Direct Op',capital:'$1.5–2M',irr:'14–18%',risk:'LOW',payback:'4–6 yrs',start:'Q3 2026'},
    {tier:1,num:'④',name:'Manufacturing Skills Academy',desc:'Practical technical training for food processing operators, quality control technicians, maintenance engineers, and production supervisors — the skills shortage that prevents existing factories from operating efficiently. Short-cycle 8–16 week programmes co-designed with manufacturing employers and TVET-certified. Diaspora engineers deliver technical modules. Every graduate enters the employment pipeline for BRIDGE portfolio companies or the wider manufacturing sector.',mode:'Partnership',capital:'$1–1.5M',irr:'12–16%',risk:'LOW',payback:'4–5 yrs',start:'Q3 2026'},
    {tier:1,num:'⑤',name:'Quality Certification Services',desc:'Accessible quality certification support for SME manufacturers pursuing ISO 9001, HACCP, GFSI, and AfCFTA rules-of-origin documentation — removing the certification barrier that excludes the majority of Ghanaian manufacturers from export markets. Consultancy, pre-audit preparation, and ongoing compliance management. Diaspora quality engineers partner with international certification bodies. Highest capital efficiency venture in the manufacturing portfolio at $500K–1M.',mode:'Direct Op',capital:'$500K–1M',irr:'20–28%',risk:'LOW',payback:'3–4 yrs',start:'Q2 2026'},
    {tier:1,num:'⑥',name:'Personal Care Products',desc:'Branded personal care manufacturing using Ghana\'s raw material advantage — shea butter, coconut oil, black soap, and natural botanical ingredients with strong international demand in the clean beauty market. Targets diaspora retail channels, African natural hair care communities, and premium African beauty platforms where Ghana-origin provenance commands premium pricing. Integration with Shea Value Addition for refined input supply.',mode:'Direct Op',capital:'$1–2M',irr:'16–22%',risk:'LOW',payback:'4–6 yrs',start:'Q3 2026'},
    {tier:1,num:'⑦',name:'Building Materials Manufacturing',desc:'Local production of construction materials — compressed earth blocks, fibre cement sheets, precast concrete components, and roofing products — using Ghanaian raw materials to serve the 1.8M-unit housing deficit. Directly integrated with BRIDGE\'s Housing portfolio: every building materials venture is a supply chain investment for housing development. Lower import dependence, lower construction costs, faster delivery.',mode:'Direct Op',capital:'$2–3M',irr:'14–18%',risk:'MEDIUM',payback:'5–7 yrs',start:'Q4 2026'},
    {tier:1,num:'⑧',name:'Pharmaceutical Expansion',desc:'Capacity expansion support for Ghana\'s domestic pharmaceutical manufacturers — currently producing ~30% of national medicine supply — to increase local essential medicine production and reduce import dependence. Partnerships with licensed manufacturers (Danadams, Ernest Chemists, Kinapharma) for capital investment, quality system upgrades, and WHO pre-qualification support that opens export markets across Sub-Saharan Africa.',mode:'Partnership',capital:'$1.5–2.5M',irr:'12–16%',risk:'MEDIUM',payback:'5–7 yrs',start:'Q4 2026'},
    {tier:2,num:'⑨',name:'Textile & Garment Manufacturing',desc:'Revival of formal textile and garment production — down from 25,000 jobs in the 1970s to under 3,000 today — targeting the Afrocentric fashion market where demand for authentic African-produced garments is growing globally. Integration with BRIDGE\'s Creative Industries Kente Authenticity System for heritage textile products. Conditioned on power cost reduction via C&I solar being in place — textile manufacturing is too energy-intensive at current grid tariffs.',mode:'Partnership',capital:'$2–3M',irr:'13–18%',risk:'MEDIUM',payback:'5–7 yrs',start:'2028'},
    {tier:2,num:'⑩',name:'Beverage Manufacturing',desc:'Premium Ghana-origin beverages — hibiscus, ginger, baobab, and tropical fruit drinks — for domestic urban consumption and AfCFTA export. Higher margin than commodity beverages, lower capital intensity than brewing. Sources directly from BRIDGE agricultural cooperative network. Second-phase because the premium beverage category requires brand building investment that follows manufacturing quality establishment.',mode:'Direct Op',capital:'$1–2M',irr:'14–18%',risk:'MEDIUM',payback:'5–6 yrs',start:'2028'},
    {tier:2,num:'⑪',name:'Regional Export Platform',desc:'AfCFTA market access platform for BRIDGE portfolio manufacturers — consolidating export logistics, customs documentation, rules-of-origin certification, and regional buyer relationships that individual SME manufacturers cannot access cost-effectively alone. A shared export infrastructure that converts multiple small manufacturers into a coordinated export cluster. Built after Phase 1 manufacturers have product quality and certification established.',mode:'Direct Op',capital:'$500K–1M',irr:'15–20%',risk:'LOW',payback:'3–5 yrs',start:'2028'},
    {tier:2,num:'⑫',name:'Packaging Manufacturing',desc:'Local packaging production — flexible pouches, glass bottles, labels, and corrugated cartons — for BRIDGE portfolio food and personal care manufacturers currently importing packaging inputs. A supply chain investment that reduces costs across the portfolio while building Ghana\'s packaging sector. Second-phase because demand from Phase 1 manufacturing portfolio establishes the off-take base that makes dedicated packaging investment commercially viable.',mode:'Partnership',capital:'$1–2M',irr:'12–16%',risk:'MEDIUM',payback:'5–6 yrs',start:'2029'},
    {tier:3,num:'⑬',name:'Industrial Park Development',desc:'Serviced industrial land with shared utilities, common services, and management infrastructure — conditioned on government co-investment in land tenure, utility connections, and road access. BRIDGE\'s role is catalytic co-investment in management and services, not land development. Pursue after Phase 1/2 companies demonstrate cluster demand for a managed industrial environment.',mode:'Partnership',capital:'$2–4M',irr:'10–14%',risk:'HIGH',payback:'7–10 yrs',start:'2030+'},
    {tier:3,num:'⑭',name:'Electronics Assembly',desc:'Consumer electronics and mobile device assembly — conditioned on sustained demand growth, import tariff structures that make local assembly competitive, and the technical skills infrastructure that Phase 1 training programmes build. A 2030+ opportunity as component supply chains and assembly economics evolve for the African market.',mode:'Partnership',capital:'$1–2M',irr:'12–18%',risk:'HIGH',payback:'6–9 yrs',start:'2030+'},
  ],

  timeline:{
    phase1:{label:'Phase 1 — Foundation',years:'2026–2028',capital:'$11–18.5M',count:'8 ventures',items:['Q2 2026: Agro-Processing Hub — site selection, cooperative feedstock agreements signed','Q2 2026: Shea Value Addition — cold-press extraction infrastructure, cooperative partnerships finalised','Q2 2026: Quality Certification Services — first 15 SME clients onboarded','Q3 2026: Packaged Foods Company — GFSI certification process begun, first SKUs in production','Q3 2026: Manufacturing Skills Academy — first cohort enrolled, TVET partnership signed','Q3 2026: Personal Care Products — brand development, first retail channel agreements','Q4 2026: Building Materials Manufacturing — first production line operational','Q4 2026: Pharmaceutical Expansion — Danadams/Kinapharma partnership agreements signed']},
    phase2:{label:'Phase 2 — Scale',years:'2028–2030',capital:'$4.5–8M',count:'4 ventures',items:['Textile & Garment Manufacturing — power cost condition met via C&I solar','Beverage Manufacturing — brand established off Phase 1 quality credentials','Regional Export Platform — AfCFTA market access infrastructure operational','Packaging Manufacturing — Phase 1 portfolio off-take base established']},
    phase3:{label:'Phase 3 — Maturity',years:'2030+',capital:'$3–6M',count:'2 ventures',items:['Industrial Park Development — government co-investment terms confirmed','Electronics Assembly — supply chain economics and skills base established']},
  },

  roadmap:[
    {name:'Agro-Processing Hub',tier:1,s:0,e:55},
    {name:'Shea Value Addition',tier:1,s:0,e:55},
    {name:'Quality Certification',tier:1,s:3,e:100},
    {name:'Packaged Foods',tier:1,s:5,e:60},
    {name:'Skills Academy',tier:1,s:5,e:100},
    {name:'Personal Care',tier:1,s:8,e:65},
    {name:'Building Materials',tier:1,s:10,e:65},
    {name:'Pharmaceutical Expansion',tier:1,s:10,e:70},
    {name:'Textiles & Garments',tier:2,s:42,e:82},
    {name:'Beverage Manufacturing',tier:2,s:42,e:80},
    {name:'Regional Export Platform',tier:2,s:44,e:100},
    {name:'Packaging Mfg',tier:2,s:62,e:100},
    {name:'Tier 3 — 2 Ventures',tier:3,s:80,e:100},
  ],

  synergies:[
    {sector:'06 Agriculture',link:'Every agro-processing venture is simultaneously an agricultural sector investment. Stable off-take from processing facilities is the demand certainty that justifies increased smallholder production. Shea Value Addition, Agro-Processing Hub, and Packaged Foods Company all source directly from BRIDGE agricultural cooperatives.'},
    {sector:'10 Energy',link:'C&I Solar Installation directly reduces the power cost disadvantage constraining manufacturing competitiveness. Manufacturing Skills Academy and Solar Technician Training Academy share training infrastructure and diaspora technical expertise. Cross-sector coordination is built into the implementation design.'},
    {sector:'04 Technology',link:'AgTech portfolio investments; satellite crop monitoring; mobile price platforms; EUDR traceability systems are Technology sector ventures with Agriculture deployment as the primary use case.'},
    {sector:'05 Education',link:'Processing facility workforce trained through BRIDGE TVET partnerships. Aspire24 apprenticeship graduates placed in BRIDGE processing facilities. Agricultural extension capacity built through education investments.'},
    {sector:'01 Infrastructure',link:'Quality Certification Services directly enables manufacturers to win formal infrastructure supply contracts. Building Materials Manufacturing is a construction sector supply chain investment. District market infrastructure supports the Regional Export Platform.'},
    {sector:'02 Financial Inclusion',link:'Manufacturing SMEs are primary targets for BRIDGE SME lending and working capital products. Quality certification opens formal finance access that informal manufacturers currently lack. Trade finance products serve the export ventures directly.'},
    {sector:'07 Creative Industries',link:'Textile and Garment Manufacturing and Personal Care Products are simultaneously creative economy investments — building Ghanaian manufacturing brands that cultural tourism and diaspora retail channels can sell globally under Ghana-origin provenance.'},
    {sector:'08 Housing',link:'Building Materials Manufacturing serves Ghana\'s 1.8M-unit housing deficit. Lower input costs mean more affordable housing units at lower construction costs. BRIDGE\'s construction quality standards and building materials production are designed as an integrated system.'},
    {sector:'12 Transport',link:'Regional Export Platform requires logistics corridor access. Building materials distribution depends on last-mile transport infrastructure. AfCFTA export shipping routes directly determine the competitiveness of manufactured goods pricing.'},
    {sector:'09 Tourism',link:'Personal Care Products, Shea Value Addition, and Packaged Foods are premium Ghana-origin brand investments that the tourism sector sells. Culinary tourism, craft markets, and heritage retail all depend on quality-certified locally manufactured products.'},
  ],

  thesis:'BRIDGE\'s manufacturing thesis is anchored in the value chain gap: Ghana sends raw materials abroad at commodity prices and imports finished goods at 10–28× the value. This is not a demand problem — it is a processing, certification, skills, and power cost problem. The BRIDGE portfolio addresses all four enabling constraints systematically, starting with the highest capital-efficiency ventures (Quality Certification Services, Shea Value Addition) and building toward the highest capital-intensity ones (Industrial Park, Electronics Assembly) only after the enabling layer is proven.',
  thesis2:'Manufacturing is the value capture layer for every other sector BRIDGE invests in. Cocoa without chocolate factories. Shea without cosmetics plants. Cassava without flour mills. When a Ghanaian worker processes shea butter into premium cosmetics instead of bagging raw nuts, that is not just a better IRR on a BRIDGE venture. That is a job that pays a living wage, a community that retains its economic output, and a country that exports branded goods instead of commodities.',

  deploy:[{l:'Ticket size',v:'$500K–$3.5M per venture'},{l:'Preferred stage',v:'Seed through Series A'},{l:'Model preference',v:'Processing + B2B supply chain'},{l:'AfCFTA certification',v:'Required — built into all ventures'},{l:'Co-investment',v:'DFIs; IFC; AfDB; impact funds'},{l:'Exit horizon',v:'5–9 years; strategic sale or MBO'}],

  risks:[
    {r:'Power Cost — Competitiveness',sev:'HIGH',mit:'C&I Solar co-investment built into manufacturing portfolio design; 30–60% of operating hours covered by solar at $0.06–0.08/kWh vs grid $0.132; cross-sector coordination with BRIDGE Energy portfolio'},
    {r:'Working Capital Scarcity',sev:'MEDIUM',mit:'BRIDGE Financial Inclusion portfolio provides SME lending products; trade finance structures built into export ventures; BRIDGE direct investment reduces external finance dependency'},
    {r:'Skills Bottleneck',sev:'MEDIUM',mit:'Manufacturing Skills Academy (Venture ④) directly addresses; diaspora engineer programme provides technical depth; TVET government partnership accelerates certification'},
    {r:'Raw Material Quality & Consistency',sev:'MEDIUM',mit:'BRIDGE Agriculture portfolio provides integrated feedstock supply; off-take agreements with cooperatives; quality grading systems built into agro-processing hub design'},
    {r:'Export Market Certification Barriers',sev:'MEDIUM',mit:'Quality Certification Services (Venture ⑤) designed specifically to remove this barrier; diaspora networks provide market access; AfCFTA rules-of-origin support built into Regional Export Platform'},
    {r:'Policy & 1D1F Execution Risk',sev:'LOW-MED',mit:'BRIDGE targets enabling layer, not factory construction — less exposed to government execution gaps; partnership with GIPC provides regulatory navigation; AfCFTA secretariat location creates institutional anchor'},
  ],

  fullPackage:[
    {item:'Venture Financial Models',desc:'10-year projections for all 14 ventures — revenue build, cost structure, IRR sensitivity, AfCFTA export revenue forecasts, capacity utilisation sensitivity analysis'},
    {item:'Agro-Processing Hub Feasibility',desc:'5-site assessments, cooperative feedstock supply agreements, food safety certification pathway, and 3-year production forecast'},
    {item:'Shea Value Addition Business Plan',desc:'Processing technology comparison, cooperative partnership terms, EU/US cosmetic certification roadmap, and diaspora brand partnership pipeline'},
    {item:'Packaged Foods Company Plan',desc:'SKU development plan, retail distribution strategy, AfCFTA export market analysis, and GFSI certification timeline'},
    {item:'Manufacturing Skills Academy Design',desc:'Full curriculum design, TVET partnership terms, employer co-investment model, and 1,000-graduate first-year target plan'},
    {item:'Quality Certification Route Map',desc:'Certification pathway for 50 target SMEs, diaspora quality engineer network, cost-sharing models, and AfCFTA rules-of-origin documentation guide'},
    {item:'Personal Care Products Market Report',desc:'Market sizing, diaspora channel analysis, retail partnership shortlist, and Ghana-origin brand development framework'},
    {item:'Pharmaceutical Expansion Assessment',desc:'Manufacturer capability assessments, WHO pre-qualification roadmap, essential medicines priority list, and Sub-Saharan Africa export market sizing'},
    {item:'AfCFTA Positioning Analysis',desc:'Tariff schedules by product category, rules-of-origin requirements, and priority market assessments for each manufacturing venture'},
    {item:'Regional Export Platform Design',desc:'Logistics route analysis, customs documentation systems, and buyer network development across 10 AfCFTA markets'},
    {item:'C&I Solar Integration Model',desc:'Venture-by-venture power cost reduction analysis, solar sizing per facility, cross-sector BRIDGE Energy coordination protocol'},
    {item:'Quarterly Manufacturing Intelligence',desc:'Capacity utilisation data, export performance, tariff developments, and competitive landscape updates across all 14 ventures'},
  ],

  benchmarks:[
    {country:'Ghana — Without Intervention',pct:28,highlight:'red',note:'Current manufacturing export value capture baseline'},
    {country:'Senegal',pct:38,highlight:false,note:'Post-AGOA garment and processing sector'},
    {country:'Kenya',pct:47,highlight:false,note:'Horticulture and food processing sector'},
    {country:'Morocco',pct:55,highlight:false,note:'Integrated textile and agro-processing sector'},
    {country:'Ethiopia',pct:48,highlight:false,note:'Industrial park model — garments and floriculture'},
    {country:'Ghana — BRIDGE Target',pct:58,highlight:'lime',note:'Value-added manufacturing share of exports by 2030'},
  ],

  marketSizes:[
    {crop:'Shea & Personal Care',tam:'$2.1B+',note:'Ghana produces 40% of global shea — currently exports at the bottom of a 28× value chain',accessible:'$80–140M',growth:'+14%/yr',phase:1,priority:'IMMEDIATE'},
    {crop:'Processed Foods (AfCFTA)',tam:'$18B',note:'West African processed food market — Ghana positioned as secretariat hub',accessible:'$120–200M',growth:'+11%/yr',phase:1,priority:'HIGH'},
    {crop:'Pharmaceuticals',tam:'$3.4B',note:'Sub-Saharan African essential medicines — WHO pre-qual opens export',accessible:'$45–80M',growth:'+8%/yr',phase:1,priority:'HIGH'},
    {crop:'Building Materials',tam:'$4.2B',note:'1.8M unit housing deficit + urban construction boom',accessible:'$60–90M',growth:'+9%/yr',phase:1,priority:'HIGH'},
    {crop:'Textiles & Garments',tam:'$8.1B',note:'AfCFTA + Afrocentric fashion global market',accessible:'$30–55M',growth:'+12%/yr',phase:2,priority:'MEDIUM'},
    {crop:'Natural Beverages (RTD)',tam:'$1.1B',note:'Premium natural RTD — hibiscus, ginger, baobab export + domestic',accessible:'$20–40M',growth:'+16%/yr',phase:2,priority:'MEDIUM'},
  ],

  coopTiers:[
    {tier:'Tier 1 — Certification-Ready SMEs',count:'120+',zone:'Greater Accra & Ashanti industrial zones',desc:'Operational manufacturers with documented production processes. Ready for ISO/HACCP certification entry — direct Quality Certification Services clients in Q2 2026.',color:'positive'},
    {tier:'Tier 2 — Capacity-Building Stage',count:'400+',zone:'All industrial zones',desc:'Operating manufacturers with quality and skills gaps. Manufacturing Skills Academy pipeline — BRIDGE development pathway 12–18 months to certification readiness.',color:'amber'},
    {tier:'Tier 3 — Informal Producers',count:'1,500+',zone:'Nationwide, Northern processing corridor',desc:'Informal manufacturing and artisan production. Phase 2 formalisation support — cooperative manufacturing structures, skills entry programmes.',color:'faint'},
  ],

  eudrItems:[
    {date:'Jan 2026',event:'24-Hour Economy Policy — active',type:'PAST',note:'Government manufacturing revival mandate — 1D1F activation capital sought'},
    {date:'Q1 2026',event:'BRIDGE Skills Academy — curriculum design',type:'BRIDGE',note:'TVET co-design window open — employer curriculum partnership priority'},
    {date:'Q2 2026',event:'Quality Certification — first 15 SMEs',type:'BRIDGE',note:'Earliest capital-efficiency return in portfolio — SME export certification'},
    {date:'Q3 2026',event:'AfCFTA tariff schedules — Phase 2',type:'CRITICAL',note:'Second phase tariff elimination active — processed goods advantage widens'},
    {date:'2027+',event:'AfCFTA premium — certified exporters',type:'FUTURE',note:'Certified Ghanaian manufacturers command 15–25% premium over non-compliant regional competitors'},
  ],

  coInvestors:[
    {name:'IFC — World Bank Group',type:'Equity + Loan',focus:'Manufacturing SMEs, agro-processing, industrial infrastructure across Sub-Saharan Africa',alignment:'Phase 1 agro-processing ventures',capital:'$5–25M',stage:'Active in Ghana'},
    {name:'African Development Bank',type:'Concessional Loan',focus:'Industrial development, AfCFTA trade infrastructure, value chain processing',alignment:'Phase 1–2 portfolio',capital:'$10–50M',stage:'Seeking co-investors'},
    {name:'GIZ / German Development',type:'Technical Assistance',focus:'TVET systems, quality certification, EU market standards for African manufacturers',alignment:'Skills Academy + certification',capital:'Technical TA',stage:'Active TVET programme'},
    {name:'USAID — Power Africa / Prosper',type:'Grant + TA',focus:'C&I energy, manufacturing competitiveness, SME development',alignment:'Energy + manufacturing integration',capital:'$3–10M',stage:'Active in Ghana'},
    {name:'Injaro / GroFin',type:'Private Equity',focus:'SME-tier manufacturing across West Africa — Series A stage',alignment:'Phase 2 scale ventures',capital:'$1–5M equity',stage:'Deployed in Ghana'},
    {name:'Ghana Exim Bank',type:'Export Finance',focus:'Export working capital, AfCFTA market access finance, GH₵-denominated SME loans',alignment:'All phases — local currency',capital:'GH₵ denominated',stage:'Government-backed'},
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
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  /* v4: scroll-margin so sticky topbar doesn't obscure sections on jump */
  [id^='sec-'],[id='upsell']{scroll-margin-top:50px;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .dc::first-letter{font-family:${F.display};font-size:4.5em;font-weight:900;float:left;line-height:0.8;margin:0.1em 0.12em 0 0;color:${C.forest};}
  @media print{.np{display:none!important;}}
  .mob-show{display:none;}
  .mob-only{display:none!important;}
  .mob-car{display:none!important;}
  .mob-sec-hdr{display:none!important;}
  .desk-only{display:block;}
  .mob-expand-all{display:none;}
  .fig-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .subs-table{display:block;}
  .subs-cards{display:none;}
  .mob-scroller{display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;scrollbar-width:none;gap:12px;-webkit-overflow-scrolling:touch;padding-bottom:4px;}
  .mob-scroller::-webkit-scrollbar{display:none;}
  .mob-snap-card{flex:0 0 82vw;scroll-snap-align:start;min-width:0;}
  .mob-snap-wide{flex:0 0 92vw;scroll-snap-align:start;min-width:0;}
  .mob-snap-sm{flex:0 0 72vw;scroll-snap-align:start;min-width:0;}
  /* v4: Carousel edge fade */
  .car-wrap{position:relative;}
  .car-wrap::after{content:'';position:absolute;top:14px;right:0;width:44px;height:calc(100% - 32px);background:linear-gradient(to right,transparent,#FAF8F3 90%);pointer-events:none;z-index:2;}
  .car-wrap-dark::after{background:linear-gradient(to right,transparent,#F0EDE4 90%);}
  .car-wrap-ink::after{background:linear-gradient(to right,transparent,#0D1A10 90%);}

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

  /* v4: Primary CTA hover lift */
  .cta-primary{transition:transform 0.15s ease,box-shadow 0.15s ease!important;}
  .cta-primary:hover{transform:translateY(-1px)!important;box-shadow:0 6px 20px rgba(184,217,53,0.25)!important;}

  /* v4: Desktop section rule */
  .sec-rule{border-top:5px solid #0D1A10;border-bottom:2.5px solid #B8D935;padding-bottom:4px;margin-bottom:22px;}

  .mob-toggle{display:none;width:100%;padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};align-items:center;justify-content:space-between;transition:color 0.15s;}
  .mob-toggle:hover{color:${C.forest};}
  .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
  .mob-toggle-hdr{border-bottom:1px solid rgba(255,255,255,0.08)!important;color:rgba(250,248,243,0.4)!important;}
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
  @media(max-width:600px){
    .tc{grid-template-columns:1fr!important;}
    .g2{grid-template-columns:1fr!important;}
    /* v4: tighter mobile padding */
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
    /* Gate/CTA mobile */
    .gate-value-line{display:none!important;}
    .gate-cta-row{flex-direction:column!important;}
    .gate-cta-row a{justify-content:center!important;}
    .gate-tertiary{display:none!important;}
    /* v4: disable row hover on touch */
    .row-hover:hover{background:inherit!important;}
    /* v4: narrower edge fade on mobile */
    .car-wrap::after{width:28px;}
    /* v4: show cover stats on mobile */
    .mob-stat{display:flex!important;}
    /* Section body collapse */
    .sec-body-hidden{display:none!important;}
    /* Expand all bar */
    .mob-expand-all{display:flex!important;}
    /* Stats 2x2 */
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

/* ═══ FIG 01 — VALUE CHAIN DISTRIBUTION ════════════════════════════════ */
const Fig01ValueChain=()=>{
  const chain=[
    {label:'Raw Nuts',sub:'Farm gate export',val:'1×',pct:9,bg:C.red,tx:'rgba(250,248,243,0.9)'},
    {label:'Crude Butter',sub:'First press',val:'2.8×',pct:15,bg:'#7A1A10',tx:'rgba(250,248,243,0.85)'},
    {label:'Refined Butter',sub:'Cosmetic grade',val:'4.5×',pct:18,bg:'#5C2A00',tx:'rgba(250,248,243,0.75)'},
    {label:'Personal Care',sub:'Formulated product',val:'12×',pct:24,bg:C.teal,tx:'rgba(250,248,243,0.9)'},
    {label:'Premium Retail',sub:'Branded export',val:'28×',pct:34,bg:C.forest,tx:C.lime},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="01" title="Value Chain Distribution — Raw Material to Consumer Product" note="Value distribution from raw material export to finished consumer product. Ghana currently participates at the raw export stage capturing 1× value. BRIDGE ventures target the 4–28× processing and branding tiers. Source: BRIDGE Analysis, 2026."/>
      <div style={{display:'flex',height:'60px',width:'100%',overflow:'hidden',border:`1px solid ${C.border}`}}>
        {chain.map((s,i)=>(
          <div key={i} style={{width:`${s.pct}%`,background:s.bg,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',borderRight:i<4?'1px solid rgba(255,255,255,0.12)':'none',overflow:'hidden',flexShrink:0,padding:'0 4px'}}>
            <span style={{fontFamily:F.mono,fontSize:'clamp(10px,1.3vw,13px)',fontWeight:700,color:s.tx,lineHeight:1,textAlign:'center',whiteSpace:'nowrap'}}>{s.val}</span>
            <span style={{fontFamily:F.sans,fontSize:'clamp(8px,0.9vw,10px)',color:s.tx,opacity:0.7,letterSpacing:'0.5px',marginTop:'1px'}}>{s.pct}%</span>
          </div>
        ))}
      </div>
      <div style={{display:'flex',width:'100%',marginTop:'4px'}}>
        {chain.map((s,i)=>(
          <div key={i} style={{width:`${s.pct}%`,paddingRight:'6px',flexShrink:0}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,lineHeight:1.3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.label}</div>
            <div style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic',whiteSpace:'nowrap'}}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,border:`1px solid ${C.border}`,marginTop:'10px'}}>
        {[{l:'Ghana currently captures',v:'1× value',vc:C.red},{l:'BRIDGE target (shea cosmetics)',v:'12–28× value',vc:C.positive},{l:'Value per tonne — premium retail',v:'$10–15K / tonne',vc:C.forest}].map((kv,i)=>(
          <div key={i} style={{background:C.paperDark,padding:'8px 12px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint,letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
            <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══ FIG 02 — CAPACITY UTILISATION BY SUB-SECTOR ══════════════════════ */
const Fig02CropLoss=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="02" title="Capacity Utilisation — Current vs. Achievable by Sub-Sector" note="Current capacity utilisation rates vs. BRIDGE intervention targets by manufacturing sub-sector. The gap across every sub-sector is not new investment — it is enabling conditions: power reliability, working capital, skills, and quality certification. Source: BRIDGE Sector Analysis; Ghana Statistical Service, 2026."/>
    <div className="fig-scroll">
      <div style={{minWidth:'560px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'160px 1fr 80px',background:C.forest}}>
          {['Sub-Sector','Capacity Utilisation (% of installed capacity)','Gap pp'].map((h,i)=>(
            <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
          ))}
        </div>
        {S.cropLoss.map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'160px 1fr 80px',borderBottom:i<S.cropLoss.length-1?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
            <div style={{padding:'10px 12px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{row.crop}</div>
              <div style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic',lineHeight:1.4,marginTop:'2px'}}>{row.note}</div>
            </div>
            <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`}}>
              <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:`${Math.min(row.cur,100)}%`,maxWidth:'65%',height:'10px',background:C.red,borderRadius:'2px',flexShrink:0}}/>
                  <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.red,flexShrink:0}}>{row.cur}%</span>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>current</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:`${Math.min(row.tgt,100)}%`,maxWidth:'65%',height:'10px',background:C.lime,borderRadius:'2px',flexShrink:0}}/>
                  <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.positive,flexShrink:0}}>{row.tgt}%</span>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>achievable</span>
                </div>
              </div>
            </div>
            <div style={{padding:'10px 12px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.positive}}>+{(row.tgt-row.cur).toFixed(0)}</span>
              <div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,letterSpacing:'0.5px'}}>pp gain</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ═══ FIG 03 — REGIONAL CAPITAL ALLOCATION ═════════════════════════════ */
const Fig03ZoneAllocation=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="03" title="Regional Capital Allocation by Industrial Zone" note="BRIDGE portfolio allocation by industrial zone with primary manufacturing focus. Greater Accra receives the highest weighting due to industrial cluster concentration, port access, and free zone infrastructure. Source: BRIDGE Regional Analysis, 2026."/>
    <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
      <div style={{display:'flex',height:'44px',width:'100%'}}>
        {S.zones.map((z,i)=>(
          <div key={i} style={{width:`${z.alloc}%`,background:z.color,display:'flex',alignItems:'center',justifyContent:'center',borderRight:i<3?'1px solid rgba(255,255,255,0.15)':'none',flexShrink:0,overflow:'hidden'}}>
            <span style={{fontFamily:F.mono,fontSize:'clamp(10px,1.4vw,14px)',fontWeight:700,color:i===0?C.ink:C.white,whiteSpace:'nowrap'}}>{z.allocLabel}</span>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',borderTop:`1px solid ${C.border}`}}>
        {S.zones.map((z,i)=>(
          <div key={i} style={{padding:'10px 12px',borderRight:i<3?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
            <div style={{width:'14px',height:'4px',background:z.color,marginBottom:'5px'}}/>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{z.zone}</div>
            <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',lineHeight:1.4}}>{z.crops}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ═══ FIG 04 — 2026 BUDGET ALLOCATIONS ═════════════════════════════════ */
const Fig04Budget=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="04" title="2026 Policy & Budget Alignment — BRIDGE Entry Points" note="2026 national budget and policy allocations to manufacturing sector with BRIDGE partnership mode per line item. Source: Ghana Ministry of Finance, 2026 Budget Statement; 24-Hour Economy Policy Framework."/>
    <div className="fig-scroll">
      <div style={{minWidth:'580px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        {S.budgetItems.map((b,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'220px 1fr 110px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:b.featured?C.forest:(i%2===0?C.paper:C.paperDark),alignItems:'center'}}>
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
    </div>
  </div>
);

/* ═══ FIG 05 — FARMER INCOME SHARE BY INTERVENTION LAYER ═══════════════ */
const Fig05Income=()=>{
  const layers=[
    {label:'Baseline — No Intervention',sub:'Raw material export, no processing',pct:22,color:'rgba(168,32,13,0.75)',bg:C.paper},
    {label:'+ Quality Certification',sub:'Opens formal supply chains and export markets',pct:32,color:C.amber,bg:C.paperDark},
    {label:'+ Skills Development',sub:'Technical operators; consistent quality output',pct:40,color:C.limeDark,bg:C.paper},
    {label:'+ C&I Solar (Power)',sub:'Competitive cost structure vs. regional peers',pct:50,color:C.limeDark,bg:C.paperDark},
    {label:'+ Processing & AfCFTA Export',sub:'Full BRIDGE value chain — target state',pct:65,color:C.positive,bg:C.paper},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="05" title="Manufacturing Value Capture by Enabling Layer" note="Manufacturing export value capture by BRIDGE enabling layer. Full value chain targets 65% processed goods share of exports vs. 22% baseline. Each layer is a distinct BRIDGE portfolio intervention. Source: BRIDGE Analysis; Ghana Export Promotion Authority."/>
      <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
        {layers.map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'220px 1fr 48px',borderBottom:i<4?`1px solid ${C.border}`:'none',background:row.bg,alignItems:'center'}}>
            <div style={{padding:'10px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,lineHeight:1.3}}>{row.label}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic',marginTop:'2px'}}>{row.sub}</div>
            </div>
            <div style={{padding:'10px 14px',borderLeft:`1px solid ${C.border}`}}>
              <div style={{height:'12px',background:C.border,borderRadius:'2px',overflow:'hidden',marginBottom:'4px'}}>
                <div style={{height:'100%',width:`${row.pct}%`,background:row.color,borderRadius:'2px',transition:'width 0.3s'}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>0%</span>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>50%</span>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>100%</span>
              </div>
            </div>
            <div style={{padding:'8px 10px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:row.color,display:'block'}}>{row.pct}%</span>
            </div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'Baseline export value capture',v:'22%',vc:C.red},{l:'BRIDGE target',v:'65%',vc:C.positive},{l:'Value uplift delivered',v:'+43pp',vc:C.lime}].map((kv,i)=>(
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

/* ═══ FIG 06 — VENTURE PORTFOLIO MATRIX ════════════════════════════════ */
const Fig06Matrix=()=>{
  const pts=[
    {n:'Agro-Proc. Hub',x:330,y:113,r:12,tier:1},{n:'Shea Value Add.',x:280,y:85,r:10,tier:1},
    {n:'Packaged Foods',x:260,y:130,r:10,tier:1},{n:'Skills Academy',x:190,y:148,r:9,tier:1},
    {n:'Qual. Certif.',x:150,y:100,r:7,tier:1},{n:'Personal Care',x:245,y:100,r:9,tier:1},
    {n:'Building Matls',x:340,y:155,r:11,tier:1},{n:'Pharma Expansion',x:355,y:130,r:10,tier:1},
    {n:'Textiles/Garments',x:390,y:145,r:11,tier:2},{n:'Beverage Mfg',x:375,y:170,r:9,tier:2},
  ];
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  const tierTx={1:C.ink,2:C.white,3:C.paper};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="06" title="Venture Portfolio Matrix — Risk vs. Return" note="Risk vs. return matrix for 10 of 14 manufacturing ventures (those with numeric IRR). Bubble size represents capital required. Tier 1 ventures cluster in the low-to-medium risk / strong-return quadrant — anchored by Shea Value Addition and Quality Certification Services. Source: BRIDGE Venture Analysis, 2026."/>
      <div className="fig-scroll">
        <div style={{minWidth:'600px',position:'relative'}}>
          <svg viewBox="0 0 720 360" width="100%" style={{display:'block',border:`1px solid ${C.border}`,background:C.paper,overflow:'visible'}}>
            {/* zone backgrounds */}
            <rect x="70" y="20" width="190" height="295" fill={C.positive} opacity="0.05"/>
            <rect x="260" y="20" width="200" height="295" fill={C.amber} opacity="0.05"/>
            <rect x="460" y="20" width="190" height="295" fill={C.red} opacity="0.05"/>
            {/* zone labels */}
            <text x="165" y="330" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.positive} letterSpacing="1.5">LOW RISK</text>
            <text x="360" y="330" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.amber} letterSpacing="1.5">MEDIUM RISK</text>
            <text x="555" y="330" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.red} letterSpacing="1.5">HIGH RISK</text>
            {/* y axis ticks */}
            {[0,5,10,15,20,25].map(v=>{
              const y=315-v*11.6;
              return(<g key={v}><line x1="65" y1={y} x2="655" y2={y} stroke={C.border} strokeWidth="1" strokeDasharray="3,4"/><text x="58" y={y+4} textAnchor="end" fontFamily={F.mono} fontSize="9" fill={C.faint}>{v}%</text></g>);
            })}
            {/* axes */}
            <line x1="70" y1="315" x2="650" y2="315" stroke={C.border} strokeWidth="1"/>
            <line x1="70" y1="20" x2="70" y2="315" stroke={C.border} strokeWidth="1"/>
            {/* zone dividers */}
            <line x1="260" y1="20" x2="260" y2="315" stroke={C.border} strokeWidth="1" strokeDasharray="4,4"/>
            <line x1="460" y1="20" x2="460" y2="315" stroke={C.border} strokeWidth="1" strokeDasharray="4,4"/>
            {/* y axis label */}
            <text x="14" y="175" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.muted} transform="rotate(-90,14,175)" letterSpacing="1">IRR (%)</text>
            {/* bubbles */}
            {pts.map((p,i)=>(
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={p.r+4} fill={tierColor[p.tier]} opacity="0.15"/>
                <circle cx={p.x} cy={p.y} r={p.r} fill={tierColor[p.tier]} opacity="0.85" stroke={C.paper} strokeWidth="1.5"/>
                <text x={p.x} y={p.y+4} textAnchor="middle" fontFamily={F.mono} fontSize="8" fontWeight="700" fill={tierTx[p.tier]}>{i+1}</text>
              </g>
            ))}
          </svg>
          {/* legend */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',gap:'0',borderTop:`1px solid ${C.border}`,background:C.paperDark}}>
            {[{bg:C.lime,tx:C.ink,label:'Tier 1 ventures'},{bg:C.amber,tx:C.white,label:'Tier 2 ventures'},{bg:C.muted,tx:C.paper,label:'Tier 3 ventures'}].map((lg,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'6px',padding:'8px 12px',borderRight:`1px solid ${C.border}`}}>
                <div style={{width:'10px',height:'10px',borderRadius:'50%',background:lg.bg,flexShrink:0}}/>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted}}>{lg.label}</span>
              </div>
            ))}
            <div style={{padding:'8px 12px',borderRight:`1px solid ${C.border}`,gridColumn:'span 2'}}>
              <span style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>Bubble size = capital required · Labels 1–10 map to first 10 numeric-IRR ventures in portfolio table below</span>
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
      <FigCaption num="07" title="Manufacturing Portfolio — Deployment Roadmap" note="Portfolio deployment roadmap. Phase 1 (2026) is the critical window — Quality Certification Services, Agro-Processing Hub, and Manufacturing Skills Academy are all time-sensitive Q2–Q3 2026 entries. Source: BRIDGE Operations Planning, 2026."/>
      <div className="fig-scroll">
        <div style={{minWidth:'620px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          {/* time header */}
          <div style={{display:'grid',gridTemplateColumns:'160px 1fr',background:C.ink,borderBottom:`1px solid rgba(255,255,255,0.08)`}}>
            <div style={{padding:'8px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:C.lime,textTransform:'uppercase'}}>Venture</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',borderLeft:`1px solid rgba(255,255,255,0.08)`}}>
              {years.map((y,i)=><div key={i} style={{padding:'8px 0',fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:'rgba(250,248,243,0.5)',textAlign:'center',borderLeft:i>0?'1px solid rgba(255,255,255,0.06)':'none'}}>{y}</div>)}
            </div>
          </div>
          {/* phase markers */}
          <div style={{display:'grid',gridTemplateColumns:'160px 1fr',background:'rgba(184,217,53,0.04)',borderBottom:`1px solid ${C.border}`}}>
            <div style={{padding:'5px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',color:C.faint,textTransform:'uppercase'}}>Phase</div>
            <div style={{display:'flex',borderLeft:`1px solid ${C.border}`}}>
              <div style={{width:'40%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.lime,letterSpacing:'1px',borderRight:`1px solid ${C.border}`}}>PHASE 1 · FOUNDATION</div>
              <div style={{width:'40%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.amber,letterSpacing:'1px',borderRight:`1px solid ${C.border}`}}>PHASE 2 · SCALE</div>
              <div style={{width:'20%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.muted,letterSpacing:'1px'}}>PHASE 3</div>
            </div>
          </div>
          {/* rows */}
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

/* ═══ FIG 08 — INTERNATIONAL FARMER VALUE CAPTURE BENCHMARKS ════════════ */
const Fig08Benchmarks=()=>{
  const maxW=480;
  const pctColors={'red':C.red,'lime':C.lime,false:C.muted};
  const txColors={'red':C.red,'lime':C.positive,false:C.muted};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="08" title="Manufacturing Export Value Capture — Ghana vs. Peer Countries" note="Processed goods share of manufacturing export value by country. Ghana's 28% baseline reflects a commodity-dominated export structure. BRIDGE's full value chain model targets 58% processed exports — parity with Morocco's integrated manufacturing sector. Source: BRIDGE Research; World Bank Manufacturing Value Chain Study 2024."/>
      <div className="fig-scroll">
      <div style={{minWidth:'480px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{background:C.forest,padding:'8px 14px',display:'grid',gridTemplateColumns:'180px 1fr 60px'}}>
          {['Country / Scenario','Processed Goods Share of Exports (%)','Share'].map((h,i)=>(
            <div key={i} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none',paddingLeft:i>0?'12px':'0'}}>{h}</div>
          ))}
        </div>
        {S.benchmarks.map((row,i)=>{
          const col=pctColors[row.highlight]||C.muted;
          const txCol=txColors[row.highlight]||C.muted;
          const isGhana=row.highlight==='red'||row.highlight==='lime';
          return(
            <div key={i} style={{display:'grid',gridTemplateColumns:'180px 1fr 60px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:isGhana?(row.highlight==='lime'?'rgba(26,107,47,0.06)':'rgba(168,32,13,0.04)'):i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
              <div style={{padding:'10px 14px'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:isGhana?700:600,color:isGhana?C.ink:C.muted,lineHeight:1.3}}>{row.country}</div>
                <div style={{fontFamily:F.body,fontSize:'9px',fontStyle:'italic',color:C.faint,marginTop:'2px',lineHeight:1.4}}>{row.note}</div>
              </div>
              <div style={{padding:'10px 14px',borderLeft:`1px solid ${C.border}`}}>
                <div style={{height:'14px',background:C.border,borderRadius:'2px',overflow:'hidden',marginBottom:'3px'}}>
                  <div style={{height:'100%',width:`${row.pct}%`,background:col,borderRadius:'2px',opacity:isGhana?1:0.65}}/>
                </div>
                <div style={{fontFamily:F.body,fontSize:'9px',fontStyle:'italic',color:C.faint}}>{row.note}</div>
              </div>
              <div style={{padding:'10px 12px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.mono,fontSize:'15px',fontWeight:700,color:col}}>{row.pct}%</span>
              </div>
            </div>
          );
        })}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'Ghana baseline',v:'28%',vc:C.red},{l:'BRIDGE target',v:'58%',vc:C.lime},{l:'Peers median',v:'48%',vc:C.forest}].map((kv,i)=>(
            <div key={i} style={{background:C.forest,padding:'10px 14px',textAlign:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.35)',letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
            </div>
          ))}
        </div>
      </div>
      </div>{/* fig-scroll */}
    </div>
  );
};

/* ═══ FIG 09 — CAPITAL LEVERAGE STACK ══════════════════════════════════ */
const Fig09CapitalStack=()=>{
  const layers=[
    {label:'Government — 24-Hour Economy / 1D1F',sub:'Ministry of Trade & Industry / GIPC',pct:55,ghc:'Policy + Infrastructure',note:'Industrial land, utility connections, tax incentives — government enabling layer',color:C.forest,tx:C.lime},
    {label:'BRIDGE Capital',sub:'Private investor equity',pct:25,ghc:'$11–18.5M portfolio',note:'Direct processing + enabling layer investment — BRIDGE equity stake',color:C.lime,tx:C.ink},
    {label:'DFI / Impact Co-Finance',sub:'IFC, AfDB, USAID, GIZ',pct:20,ghc:'$5–25M co-investment',note:'Blended finance layer — concessional terms de-risk private equity',color:C.amber,tx:C.white},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="09" title="BRIDGE Capital Stack — Manufacturing Portfolio Leverage" note="How BRIDGE's manufacturing portfolio capital is layered with government policy incentives and DFI co-investment. Free zone tax benefits (0% corporate tax, 10 years), TVET government co-funding, and DFI technical assistance create a leveraged capital structure. Source: BRIDGE Financial Modelling; GIPC Free Zone Incentive Framework 2026."/>
      <div className="fig-scroll">
        <div style={{minWidth:'500px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        {/* stacked bar */}
        <div style={{height:'52px',display:'flex',borderBottom:`1px solid ${C.border}`}}>
          {layers.map((l,i)=>(
            <div key={i} style={{width:`${l.pct}%`,background:l.color,display:'flex',alignItems:'center',justifyContent:'center',borderRight:i<2?'1px solid rgba(255,255,255,0.15)':'none',overflow:'hidden',flexShrink:0}}>
              <span style={{fontFamily:F.mono,fontSize:'clamp(10px,1.4vw,14px)',fontWeight:700,color:l.tx,whiteSpace:'nowrap'}}>{l.pct}%</span>
            </div>
          ))}
        </div>
        {/* layer detail rows */}
        {layers.map((l,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'14px 180px 100px 1fr',borderBottom:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
            <div style={{width:'14px',height:'100%',background:l.color,flexShrink:0}}/>
            <div style={{padding:'10px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{l.label}</div>
              <div style={{fontFamily:F.body,fontSize:'9px',fontStyle:'italic',color:C.faint}}>{l.sub}</div>
            </div>
            <div style={{padding:'10px 12px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,borderLeft:`1px solid ${C.border}`}}>{l.ghc}</div>
            <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,borderLeft:`1px solid ${C.border}`}}>{l.note}</div>
          </div>
        ))}
        {/* leverage callout */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'BRIDGE capital input',v:'1×',vc:C.lime},{l:'Total capital activated',v:'5.2×',vc:C.positive},{l:'Window total',v:'US$500M',vc:C.forest}].map((kv,i)=>(
            <div key={i} style={{background:C.ink,padding:'10px 14px',textAlign:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.3)',letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};


/* ═══ SECTION REGISTRY ═══════════════════════════════════════════════════
   IDs match the id="" on each section's outermost div.
   Update labels per sector — keep IDs stable.
═══════════════════════════════════════════════════════════════════════════ */
const SECS=[
  {id:'sec-exec',    label:'Executive Summary'},
  {id:'sec-subs',    label:'Sub-Sectors'},
  {id:'sec-problem', label:'Structural Problem'},
  {id:'sec-crops',   label:'Sub-Sector Analysis'},
  {id:'sec-zones',   label:'Regional Strategy'},
  {id:'sec-market',  label:'Competitive Landscape'},
  {id:'sec-policy',  label:'Policy Window'},
  {id:'sec-income',  label:'Value Capture'},
  {id:'sec-ventures',label:'Venture Portfolio'},
  {id:'sec-roadmap', label:'Deployment Roadmap'},
  {id:'sec-coinvest',label:'Co-Investment'},
  {id:'sec-synergy', label:'System Integration'},
  {id:'sec-risk',    label:'Risk & Thesis'},
  {id:'upsell',      label:'Next Steps'},
];

/* ═══ SECTION FOOTER NAV ════════════════════════════════════════════════
   Fixed bottom bar — always rendered. Dot indicators + prev/next arrows.
═══════════════════════════════════════════════════════════════════════════ */
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
    if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
    setActive(clamped);
  };
  return(
    <div className="np" style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,background:'rgba(10,20,12,0.97)',borderTop:'1px solid rgba(184,217,53,0.15)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'9px 18px',gap:'10px'}}>
      <button onClick={()=>goTo(active-1)} disabled={active===0}
        style={{width:'38px',height:'38px',background:active===0?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',cursor:active===0?'default':'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,opacity:active===0?0.3:1,transition:'all 0.2s'}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'7px',minWidth:0,overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',gap:'7px',maxWidth:'100%',overflow:'hidden'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px',flexShrink:0}}>§{String(active+1).padStart(2,'0')}</span>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.45)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{SECS[active]?.label}</span>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,0.18)',flexShrink:0}}>/ {SECS.length}</span>
        </div>
        <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
          {SECS.map((_,i)=>(
            <div key={i} onClick={()=>goTo(i)} style={{width:i===active?'24px':'6px',height:'6px',borderRadius:'3px',background:i===active?C.lime:i<active?'rgba(184,217,53,0.3)':'rgba(255,255,255,0.15)',cursor:'pointer',transition:'width 0.3s cubic-bezier(0.16,1,0.3,1),background 0.2s',flexShrink:0}}/>
          ))}
        </div>
      </div>
      <button onClick={()=>goTo(active+1)} disabled={active===SECS.length-1}
        style={{width:'38px',height:'38px',background:active===SECS.length-1?'rgba(255,255,255,0.04)':C.forest,border:`1px solid ${active===SECS.length-1?'rgba(255,255,255,0.1)':'rgba(184,217,53,0.2)'}`,cursor:active===SECS.length-1?'default':'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,opacity:active===SECS.length-1?0.3:1,transition:'all 0.2s'}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
};

/* ═══ READING PROGRESS BAR ═══════════════════════════════════════════════
   Replaces MobProgressBar + TopBar. Single unified component.
   Progress line: 2px lime, absolute bottom. Logo reveal on scroll.
═══════════════════════════════════════════════════════════════════════════ */

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
      <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(255,255,255,0.35)',letterSpacing:'0.5px'}}>{allOpen?'All sections open':'All sections collapsed'}</span>
    </div>
    <button onClick={onToggle} style={{background:'transparent',border:'1px solid rgba(184,217,53,0.3)',padding:'6px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.lime,cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
      {allOpen?'Collapse All ↑':'Expand All ↓'}
    </button>
  </div>
);

/* ═══ READING PROGRESS BAR continues... ══════════════════════════════════ */
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
      <div style={{position:'absolute',bottom:0,left:0,height:'3px',width:`${pct}%`,background:C.lime,transition:'width 0.1s linear',pointerEvents:'none'}}/>
      <div style={{display:'flex',alignItems:'center',gap:'10px',minWidth:0,overflow:'hidden'}}>
        <div style={{overflow:'hidden',maxWidth:logoVisible?'180px':'0',opacity:logoVisible?1:0,transition:'max-width 0.38s cubic-bezier(0.16,1,0.3,1),opacity 0.3s ease',display:'flex',alignItems:'center',flexShrink:0}}>
          <Logo height={19} variant="dark"/>
          <div style={{width:'1px',height:'15px',background:C.border,margin:'0 12px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Sector Brief · Manufacturing & Light Industry · Core Tier · March 2026</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>11 · Manufacturing</span>
        {pct>5&&<span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,marginLeft:'4px',flexShrink:0}}>{pctRounded}%</span>}
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center',flexShrink:0}}>
        <a href="#" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none',letterSpacing:'0.2px'}}>All Sectors →</a>
        <a href="#upsell" className="cta-primary" style={{background:C.forest,color:C.lime,padding:'7px 16px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.5px'}}>Full Package →</a>
      </div>
    </div>
  );
};

/* ═══ COVER ══════════════════════════════════════════════════════════════ */
const Cover=({logoRef})=>(
  <div>
    <div className="pad-cover" style={{background:C.ink,padding:'28px 64px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'32px',top:'-8px',fontFamily:F.display,fontSize:'clamp(100px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.022)',lineHeight:1,userSelect:'none',pointerEvents:'none',letterSpacing:'-6px'}}>11</div>
      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)',backgroundSize:'28px 28px',pointerEvents:'none'}}/>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div ref={logoRef} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <Logo height={26} variant="white"/>
            <div style={{width:'1px',height:'20px',background:'rgba(255,255,255,0.12)'}}/>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',color:'rgba(255,255,255,0.3)',textTransform:'uppercase'}}>Sector Intelligence Brief · Full Members Edition</span>
          </div>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'2px',textTransform:'uppercase',border:'1px solid rgba(184,217,53,0.3)',padding:'3px 10px'}}>Members</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'18px'}}>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:800,padding:'5px 12px',letterSpacing:'1.5px'}}>SECTOR 11 OF 12</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.08)'}}/>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.2)'}}>{S.edition}</span>
        </div>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(36px,6vw,78px)',fontWeight:900,color:C.paper,lineHeight:0.95,letterSpacing:'-2.5px',marginBottom:'6px'}}>Manufacturing</h1>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,4vw,52px)',fontWeight:700,color:'rgba(250,248,243,0.38)',lineHeight:1,letterSpacing:'-1.5px',marginBottom:'16px'}}>&amp; Light Industry</h2>
        <p style={{fontFamily:F.body,fontSize:'clamp(13px,1.6vw,16px)',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.7,maxWidth:'560px',marginBottom:'0'}}>{S.tagline}</p>
        <div className="cover-stats stats-row" style={{display:'flex',gap:'0',borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'28px',flexWrap:'wrap'}}>
          <div style={{background:'rgba(184,217,53,0.07)',padding:'20px 24px',minWidth:'170px',borderRight:'1px solid rgba(255,255,255,0.06)',flex:'0 0 165px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',marginBottom:'8px'}}>BRIDGE Impact Score™</div>
            <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'8px'}}>
              <span style={{fontFamily:F.mono,fontSize:'52px',fontWeight:400,color:C.lime,lineHeight:1}}>{S.score}</span>
              <span style={{fontFamily:F.mono,fontSize:'14px',color:'rgba(184,217,53,0.45)'}}>/100</span>
            </div>
            <div style={{height:'3px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',marginBottom:'7px',overflow:'hidden'}}>
              <div className="score-bar" style={{'--w':`${S.score}%`,height:'100%',width:`${S.score}%`,background:C.lime,borderRadius:'2px'}}/>
            </div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>CORE TIER</div>
          </div>
          {S.stats.map((d,i)=>(
            <div key={i} className="hm mob-stat" style={{padding:'20px 22px',borderRight:i<3?'1px solid rgba(255,255,255,0.06)':'none',flex:1,minWidth:0,display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.26)',marginBottom:'8px'}}>{d.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'clamp(14px,1.8vw,20px)',color:C.paper,lineHeight:1}}>{d.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{height:'3px',background:`linear-gradient(90deg,${C.lime} 60%,transparent)`,marginTop:'0'}}/>
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
        <SecHdr num="00" label="Executive Summary" badge={`Score ${S.score}`} hint="30–40% capacity utilisation · 14 ventures · 28× shea value multiplier · AfCFTA continental market open now" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{maxWidth:'900px',display:'grid',gridTemplateColumns:'2fr 1fr',gap:'48px'}} className="tc">
        <div>
          <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
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
              <div key={i} className={i>=1?sdOpen?'':'mob-item-hidden':''} style={{padding:'10px 14px',borderBottom:i<3?`1px solid ${C.border}`:'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:C.ink}}>{dim.d}</span>
                  <span style={{fontFamily:F.mono,fontSize:'11px',color:C.forest}}>{dim.s}</span>
                </div>
                <div style={{height:'4px',background:C.border,borderRadius:'2px',overflow:'hidden',marginBottom:'4px'}}>
                  <div className="score-bar-dim" style={{'--w':`${dim.s}%`,height:'100%',width:`${dim.s}%`,background:dim.s>=85?C.lime:dim.s>=75?C.limeDark:C.amber,borderRadius:'2px'}}/>
                </div>
                <div style={{marginTop:'3px',fontFamily:F.mono,fontSize:'9px',color:C.faint}}>Weight: {dim.w}</div>
              </div>
            ))}
          </div>
          <div style={{border:`1px solid ${C.border}`,borderTop:'none',padding:'14px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Sector Snapshot</div>
            {S.snapshot.map((s,i)=>(
              <div key={i} className="row-hover" style={{display:'flex',justifyContent:'space-between',padding:'7px 10px',marginLeft:'-10px',marginRight:'-10px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?'transparent':C.paperDark}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{s.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:i===0?C.positive:i===1?C.lime:C.forest}}>{s.v}</span>
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
        <SecHdr num="00" label="Sub-Sector Landscape" badge="6 sub-sectors" hint="Agro-processing, food & beverage, personal care, certification, skills — BRIDGE Impact Score™" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Sub-Sector Landscape</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 sub-sectors assessed</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Where BRIDGE Scores the Opportunity</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Each sub-sector is scored on market opportunity, implementation feasibility, development impact, and financial sustainability. BRIDGE Impact Score™ methodology applied consistently across all 174+ ventures in the full portfolio.</p>
        <div className="subs-table">
          <div className="fig-scroll">
          <div style={{minWidth:'540px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
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
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-problem" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="01" label="The Structural Problem" badge="30–40% Utilisation" hint="Value chain gap · 6 enabling constraints · 28× shea value multiplier case study" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 01 — The Structural Problem</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>600K formal workers · 80%+ informal workforce</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>Half-Empty Factories, Open Continental Market</h2>
        <Fig01ValueChain/>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px',marginBottom:'28px'}} className="tc">
          <div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana has manufacturing. Over 600,000 formal manufacturing workers, 126 operational 1D1F factories, 500+ free zone enterprises, and a policy mandate — the 24-Hour Economy — that places industrial revival at the centre of the national agenda. The industrial base exists. What is absent is the enabling layer that converts installed capacity into competitive output: affordable power, accessible working capital, certified skills, and quality systems that open export markets.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana's manufacturers face a reinforcing set of enabling constraints that cannot be addressed in isolation. Each one compounds the others, forming a system that keeps factories underutilised, keeps workers in informal employment, and keeps Ghana exporting commodities while importing finished goods at 10–28× the raw material value.</p>
            <div style={{background:C.forest,padding:'16px 20px',marginTop:'8px'}}>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.7}}>Northern Ghana women's shea cooperatives produce 40% of global shea supply and receive 1× its value. European cosmetics companies process that shea into products sold at 28×. BRIDGE's Shea Value Addition venture is designed specifically to close this gap — capturing processing value in Ghana, by Ghanaian workers, for Ghanaian communities.</p>
              <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>The Shea Value Chain — A Case Study</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',alignContent:'start'}}>
            {[{v:'600K',l:'Formal mfg\nworkers'},{v:'30–40%',l:'Capacity\nutilisation'},{v:'1.4B',l:'AfCFTA\nconsumers'},{v:'1D1F',l:'126 factories\noperational'}].map((s,i)=>(
              <div key={i} style={{background:C.ink,padding:'14px 12px',textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'clamp(16px,2.2vw,24px)',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'5px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',whiteSpace:'pre-line',lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>The Manufacturing Constraint Stack</div>
        {/* Mobile carousel */}
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
          <span>View all 6 constraints</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'160px 1fr',background:C.forest}}>
            {['Constraint','Mechanism of Harm'].map((h,i)=><div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>)}
          </div>
          {S.constraints.map((row,i)=>(
            <div key={i} className={i>=1?open?'':'mob-item-hidden':''} style={{display:'grid',gridTemplateColumns:'160px 1fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
              <div style={{padding:'10px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{row.c}</div>
              <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55,borderLeft:`1px solid ${C.border}`}}>{row.harm}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>The problem is not that Ghana cannot manufacture. Ghana has factories, workers, and raw materials. The problem is a policy and infrastructure gap that was never designed to support competitive industrial production. — BRIDGE Manufacturing Sector Analysis, 2026</div>
        {/* Cooperative Network Distribution — Members Exclusive */}
        <div style={{marginTop:'28px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · Manufacturing SME Network</div>
              <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Ghana's Manufacturing SME Landscape — Certification Readiness</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'24px',color:C.lime}}>2K+</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'1px',textTransform:'uppercase'}}>target SMEs</div></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderTop:`1px solid rgba(255,255,255,0.06)`}} className="tc">
            {S.coopTiers.map((tier,i)=>{
              const col={positive:C.positive,amber:C.amber,faint:C.faint}[tier.color]||C.muted;
              return(
                <div key={i} style={{padding:'14px 18px',borderRight:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
                  <div style={{width:'24px',height:'4px',background:col,marginBottom:'8px'}}/>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'4px'}}>{tier.tier}</div>
                  <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:500,color:col,marginBottom:'4px'}}>{tier.count}</div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'0.5px',marginBottom:'6px'}}>{tier.zone}</div>
                  <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5}}>{tier.desc}</div>
                </div>
              );
            })}
          </div>
          <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
            <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.6,margin:0}}>BRIDGE's Quality Certification Services targets Tier 1 SMEs in Phase 1 (Q2 2026 launch), Tier 2 through the Manufacturing Skills Academy in Phase 2. The 2,000+ total represents the full addressable market for BRIDGE's manufacturing enabling-layer portfolio — each certified manufacturer is a new export revenue stream for Ghana.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ CROP ANALYSIS ══════════════════════════════════════════════════════ */
const CropAnalysis=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-crops" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="02" label="Sub-Sector Analysis" badge="6 sub-sectors" hint="Capacity utilisation current vs achievable · AfCFTA export opportunity · market sizing" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 02 — Sub-Sector Analysis</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Capacity Utilisation — The Enabling Gap, Sub-Sector by Sub-Sector</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Each manufacturing sub-sector has a different capacity utilisation profile, a different enabling constraint, and a different BRIDGE intervention priority. Understanding the utilisation gap by sub-sector is essential to sequencing capital deployment — and quantifying the returns available from closing each one.</p>
      <Fig02CropLoss/>
      {/* EUDR Intelligence Callout */}
      <div style={{border:`2px solid ${C.amber}`,overflow:'hidden',marginBottom:'20px'}}>
        <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.amber,marginBottom:'3px'}}>◆ Members Intelligence · AfCFTA Compliance & Certification Window</div>
            <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>AfCFTA Trade Framework — Timeline &amp; BRIDGE Entry Points</div>
          </div>
          <div style={{background:C.amber,color:C.white,fontFamily:F.sans,fontSize:'9px',fontWeight:800,padding:'3px 10px',letterSpacing:'1px',textTransform:'uppercase',flexShrink:0}}>TIME-SENSITIVE 2026</div>
        </div>
        <div style={{background:'rgba(13,26,16,0.85)'}}>
          {S.eudrItems.map((ev,i)=>{
            const typeCol={PAST:'rgba(255,255,255,0.2)',CRITICAL:C.amber,BRIDGE:C.lime,FUTURE:C.muted};
            const tc=typeCol[ev.type]||C.faint;
            return(
              <div key={i} style={{display:'grid',gridTemplateColumns:'90px 1fr',borderBottom:i<4?'1px solid rgba(255,255,255,0.07)':'none',alignItems:'start'}}>
                <div style={{padding:'10px 14px',borderRight:'1px solid rgba(255,255,255,0.07)',display:'flex',flexDirection:'column',gap:'3px'}}>
                  <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:tc}}>{ev.date}</span>
                  <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',color:tc,opacity:0.7,textTransform:'uppercase'}}>{ev.type}</span>
                </div>
                <div style={{padding:'10px 14px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:ev.type==='BRIDGE'?C.lime:C.paper,marginBottom:'2px'}}>{ev.event}</div>
                  <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.5)',fontStyle:'italic',lineHeight:1.5}}>{ev.note}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6,margin:0}}>The AfCFTA Phase 2 tariff elimination schedule creates a narrow first-mover advantage for certified Ghanaian manufacturers. Companies that achieve ISO/HACCP/GFSI certification before Q3 2026 will be positioned to compete from day one. This is the certification premium BRIDGE's Quality Certification Services venture is designed to capture — not as a compliance cost, but as a revenue-opening investment.</p>
        </div>
      </div>
      {/* Market Sizing */}
      <div style={{marginBottom:'20px'}}>
        <div className="fig-scroll">
        <div style={{border:`1px solid ${C.border}`,overflow:'hidden',minWidth:'560px'}}>
        <div style={{background:C.forest,padding:'8px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>◆ Processing Opportunity — Market Sizing by Sub-Sector</div>
          <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>Total Addressable Market · BRIDGE Accessible Share · Growth Rate</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 70px 70px 80px',background:C.ink}}>
          {['Sub-Sector','Global TAM','Context','Accessible','Growth','Phase'].map((h,i)=>(
            <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',borderLeft:i>0?'1px solid rgba(255,255,255,0.06)':'none'}}>{h}</div>
          ))}
        </div>
        {S.marketSizes.map((row,i)=>{
          const priColor={IMMEDIATE:C.red,HIGH:C.amber,MEDIUM:C.muted};
          const pc=priColor[row.priority]||C.muted;
          return(
            <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 70px 70px 80px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
              <div style={{padding:'10px 12px'}}>
                <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{row.crop}</div>
                <div style={{display:'flex',alignItems:'center',gap:'5px',marginTop:'3px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:800,color:pc,border:`1px solid ${pc}`,padding:'1px 6px',letterSpacing:'0.5px'}}>{row.priority}</span>
                  <span style={{fontFamily:F.sans,fontSize:'8px',color:C.faint}}>Phase {row.phase}</span>
                </div>
              </div>
              <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.forest}}>{row.tam}</div>
              </div>
              <div style={{padding:'10px 12px',fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{row.note}</div>
              <div style={{padding:'10px 10px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.teal,borderLeft:`1px solid ${C.border}`}}>{row.accessible}</div>
              <div style={{padding:'10px 10px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.positive,borderLeft:`1px solid ${C.border}`}}>{row.growth}</div>
              <div style={{padding:'10px 10px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:row.phase===1?C.lime:row.phase===2?C.amber:C.faint,border:`1px solid ${row.phase===1?C.lime:row.phase===2?C.amber:C.border}`,padding:'2px 7px'}}>P{row.phase}</span>
              </div>
            </div>
          );
        })}
        <div style={{padding:'8px 14px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
          <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>TAM = Total Addressable Market (global). Accessible = BRIDGE-estimated Ghana market share achievable within 5 years of manufacturing venture launch. Source: ITC Trade Map; World Bank; AfCFTA Secretariat; BRIDGE Sector Analysis 2026.</span>
        </div>
      </div>{/* border */}
      </div>{/* fig-scroll */}
      </div>{/* marginBottom */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginTop:'4px'}} className="tc">
        {[
          {title:'The Shea Paradox',body:'Ghana produces 40% of global shea supply. European and Asian cosmetics companies purchase raw nuts at $600–800 per tonne, ship to refineries in the Netherlands, Germany, and Japan, and sell processed cosmetics at $10,000–16,000+ per tonne equivalent. Ghana participates in the first $600. BRIDGE\'s Shea Value Addition venture targets the processing tiers that capture $9,400–14,400 per tonne in additional value — in Ghana, for Ghanaian workers.'},
          {title:'1D1F — Announcement vs. Delivery',body:'250+ factories announced. 126 operational. 88 in actual production. 55,000 jobs created against a 350,000 target. The 1D1F programme demonstrates both Ghana\'s manufacturing ambition and the gap between announcement and productive operation. BRIDGE\'s enabling-layer portfolio — skills, quality, working capital, energy — is designed to close this gap for existing 1D1F factories without building a single new one.'},
          {title:'The AfCFTA Positioning Advantage',body:'Ghana is the AfCFTA secretariat host. It has the institutional relationships, the port infrastructure, and the manufacturing base to be West Africa\'s production hub for the 1.4 billion consumer continental market. The sectors where Ghana has raw material advantage — shea, cocoa, cassava, palm, groundnut — are precisely the BRIDGE agro-processing portfolio. The window is now.'},
          {title:'Power Cost — The Primary Barrier',body:'Ghana\'s industrial electricity costs $0.132/kWh. Ethiopia charges $0.052/kWh. Kenya charges $0.078/kWh. For food processing, textiles, and pharmaceuticals, this differential creates cost structures that cannot compete on export pricing even when every other factor is equal. BRIDGE\'s C&I solar integration directly addresses this for every manufacturing portfolio company.'},
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

/* ═══ REGIONAL STRATEGY ══════════════════════════════════════════════════ */
const RegionalStrategy=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-zones" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="03" label="Regional Strategy" badge="4 zones" hint="Greater Accra 35% · Ashanti 30% · zone-by-zone capital allocation and intervention priorities" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 03 — Regional Strategy</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>4 zones · 4 strategies</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Four Zones, Four Strategies</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana's industrial geography requires regionally differentiated intervention. BRIDGE's capital allocation reflects the geography of opportunity: 35% to Greater Accra where industrial cluster concentration, port access, and free zone infrastructure are highest.</p>
        <Fig03ZoneAllocation/>
        {/* Mobile zone carousel */}
        <Carousel items={S.zones} renderCard={(z,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden',height:'100%'}}>
            <div style={{background:z.color,padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:i===0?C.ink:C.white}}>{z.zone}</div>
              <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:i===0?C.ink:C.white}}>{z.allocLabel}</div>
            </div>
            <div style={{padding:'12px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>Regions</div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:C.ink,marginBottom:'10px'}}>{z.regions}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>Key Crops</div>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.ink,fontStyle:'italic',marginBottom:'10px'}}>{z.crops}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>BRIDGE Interventions</div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.55,fontStyle:'italic',marginBottom:'8px'}}>{z.interventions}</div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontStyle:'italic',color:C.faint,borderTop:`1px solid ${C.border}`,paddingTop:'8px'}}>{z.context}</div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>All 4 zone strategies</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div className="hm" style={{display:'grid',gridTemplateColumns:'1fr 1fr 70px 1.5fr 1fr',background:C.ink}}>
            {['Zone','Key Crops','Alloc.','BRIDGE Interventions','Context'].map((h,i)=><div key={i} style={{padding:'8px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.08)':'none'}}>{h}</div>)}
          </div>
          {S.zones.map((z,i)=>(
            <div key={i} className={i>=1?open?'':'mob-item-hidden':''} style={{display:'grid',gridTemplateColumns:'1fr 1fr 70px 1.5fr 1fr',borderBottom:i<3?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}} id={`zone-row-${i}`}>
              <div style={{padding:'12px 12px'}}><div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{z.zone}</div><div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic'}}>{z.regions}</div></div>
              <div style={{padding:'12px 12px',fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{z.crops}</div>
              <div style={{padding:'12px 12px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}><span style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:C.forest}}>{z.allocLabel}</span></div>
              <div style={{padding:'12px 12px',fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{z.interventions}</div>
              <div style={{padding:'12px 12px',fontFamily:F.body,fontSize:'11px',color:C.faint,fontStyle:'italic',lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{z.context}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ COMPETITIVE LANDSCAPE ══════════════════════════════════════════════ */
const CompetitiveLandscape=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-market" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="04" label="Competitive Landscape" badge="6 key players" hint="Olam, Unilever, Danadams, ABInBev, GIPC — BRIDGE positioning in each tier" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 04 — Competitive Landscape</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Is Already in the Field</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'16px',fontStyle:'italic'}}>African AgTech attracted $215 million across 131 startups in 2024. Ghana has 75+ active agricultural technology companies. BRIDGE's strategy is to identify gaps these companies cannot fill and integrate promising platforms into BRIDGE-operated ventures.</p>
        <div style={{background:C.forest,padding:'14px 20px',marginBottom:'20px'}}>
          <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.65}}>Multinationals extract raw material value. Government agencies announce factories that don't reach production. Development programmes provide technical assistance without capital. Neither builds the integrated enabling layer — skills, certification, power cost reduction, working capital — that Ghana's manufacturers actually need. <strong style={{color:C.lime}}>BRIDGE operates at the enabling layer that technology companies cannot and development agencies will not.</strong></p>
        </div>
        {/* Mobile competitor carousel */}
        <Carousel items={S.competitors} cardClass="mob-snap-wide" renderCard={(co,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden'}}>
            <div style={{background:C.ink,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}>
              <span style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper}}>{co.name}</span>
              <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.3)',flexShrink:0}}>{co.type}</span>
            </div>
            <div style={{padding:'14px 14px'}}>
              <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6,marginBottom:'12px',fontStyle:'italic'}}>{co.desc}</p>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,background:C.forest,display:'inline-block',padding:'2px 8px',marginBottom:'6px'}}>BRIDGE Position</div>
                <p style={{fontFamily:F.sans,fontSize:'12px',color:C.forest,fontWeight:600,lineHeight:1.5}}>{co.pos}</p>
              </div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>View all 6 players</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}} id="comp-grid">
          {S.competitors.map((co,i)=>(
            <div key={i} className={i>=2?open?'':'mob-item-hidden':''} style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden'}}>
              <div style={{background:C.ink,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}>
                <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>{co.name}</span>
                <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.3)',flexShrink:0}}>{co.type}</span>
              </div>
              <div style={{padding:'12px 14px'}}>
                <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6,marginBottom:'10px',fontStyle:'italic'}}>{co.desc}</p>
                <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'9px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,background:C.forest,display:'inline-block',padding:'2px 8px',marginBottom:'5px'}}>BRIDGE Position</div>
                  <p style={{fontFamily:F.sans,fontSize:'11px',color:C.forest,fontWeight:600,lineHeight:1.5}}>{co.pos}</p>
                </div>
              </div>
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
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-policy" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="05" label="Policy Window" badge="★★★★★" hint="24-Hour Economy · 1D1F activation · AfCFTA secretariat advantage · TVET co-design open Q2 2026" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 05 — Policy Window</div>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.sans,fontSize:'9px',fontWeight:800,padding:'3px 10px',letterSpacing:'1px'}}>★★★★★ BUDGET ALIGNMENT</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The 2026 Policy Alignment</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana's 24-Hour Economy Policy and 1D1F programme represent a manufacturing revival mandate without precedent in the current administration. The policy alignment is not incremental — it is a structural repositioning of the state as enabler of industrial production, with BRIDGE positioned to provide the operational layer that converts policy into productive capacity.</p>
        <Fig04Budget/>
        <div style={{border:`2px solid ${C.lime}`,overflow:'hidden',marginTop:'4px'}}>
          <div style={{background:C.ink,padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px'}}>Time-Sensitive — Q2 2026 Deadline</div>
              <div style={{fontFamily:F.display,fontSize:'clamp(14px,2vw,20px)',fontWeight:700,color:C.paper}}>24-Hour Economy & 1D1F — Key Incentives</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'28px',fontWeight:500,color:C.lime,lineHeight:1}}>1:3.5×</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.3)',letterSpacing:'1px',textTransform:'uppercase'}}>capital leverage</div></div>
          </div>
          <button className="mob-toggle mob-toggle-hdr" onClick={()=>setOpen(o=>!o)} style={{width:'100%',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',display:'block',padding:'0'}}>
            <div style={{display:'flex',justifyContent:'space-between',padding:'8px 14px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(13,26,16,0.7)'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.3)',textTransform:'uppercase'}}>Feature</span>
              <span style={{display:'flex',gap:'40px'}}><span className="mob-show" style={{display:'none',fontSize:'10px',color:'rgba(184,217,53,0.5)',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.3)',textTransform:'uppercase'}}>Terms</span></span>
            </div>
          </button>
          {S.oilPalm.map((row,i)=>(
            <div key={i} className={i>=2?open?'':'mob-item-hidden':''} style={{display:'flex',justifyContent:'space-between',padding:'10px 14px',borderBottom:i<6?'1px solid rgba(255,255,255,0.06)':'none',background:'rgba(13,26,16,0.75)',flexWrap:'wrap',gap:'4px'}}>
              <span style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.4)'}}>{row.f}</span>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,textAlign:'right',maxWidth:'60%'}}>{row.t}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:'16px',padding:'14px 18px',background:C.paperDark,border:`1px solid ${C.border}`}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>AfCFTA Free Zone — Manufacturing Advantage</div>
          <p style={{fontFamily:F.body,fontSize:'13px',color:C.muted,lineHeight:1.65,fontStyle:'italic'}}>Ghana's 500+ free zone enterprises benefit from 0% corporate tax for 10 years, import duty exemptions on equipment and raw materials, and unrestricted profit repatriation. BRIDGE portfolio manufacturing companies are positioned to access free zone status — converting the government incentive stack into competitive cost structures that make AfCFTA export pricing viable from day one of production.</p>
        </div>
        <Fig09CapitalStack/>
      </div>
    </div>
    </div>
  );
};

/* ═══ FARMER INCOME ══════════════════════════════════════════════════════ */
const FarmerIncome=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-income" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="06" label="Value Capture" badge="22% → 65%" hint="Layer-by-layer value capture model · peer country benchmarks · +43 percentage point uplift" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 06 — Value Capture</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The Manufacturing Value Capture Thesis</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Each BRIDGE enabling layer stacks — the full portfolio raises Ghana's manufactured export value capture from 22% to 65% of available value. This is not incremental improvement. It is a structural transformation of where Ghana sits in global value chains.</p>
      <Fig05Income/>
      <Fig08Benchmarks/>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'32px'}} className="tc">
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',paddingTop:'2px'}}>
          <p style={{fontFamily:F.display,fontSize:'18px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"When a Ghanaian worker processes shea butter into premium cosmetics instead of bagging raw nuts for export, that is not just a better IRR on a BRIDGE venture. That is a job that pays a living wage, a community that retains its economic output, and a country that exports branded goods instead of commodities."</p>
          <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'18px',height:'1px',background:C.lime}}/>
            <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE PBC Manufacturing Sector Investment Thesis</span>
          </div>
        </div>
        <div style={{background:C.ink,padding:'18px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Data Sources</div>
          {[{l:'Baseline data',v:'Ghana Statistical Service'},{l:'AfCFTA opportunity',v:'AfCFTA Secretariat 2025'},{l:'Peer benchmarks',v:'World Bank MVC Study 2024'},{l:'Target validation',v:'IFC Manufacturing Report'},{l:'SMEs in portfolio',v:'2K+ certified target'}].map((row,i)=>(
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
}

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
        <SecHdr num="07" label="Venture Portfolio" badge="14 ventures" hint="Tier 1: $11–18.5M · 12–28% IRR · Agro-Processing Hub, Shea Value Addition, Quality Certification" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 07 — The Portfolio</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'5px 14px',letterSpacing:'1px'}}>14 ventures · $11–18.5M total</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>14 Ventures Across 3 Tiers</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced by urgency, leverage, and dependency — Tier 1 builds the enabling infrastructure that Tier 2 and 3 require. The sequencing is deliberate: skills and certification before export; agro-processing before beverages and textiles; working capital before industrial park.</p>
        <Fig06Matrix/>
        {/* Tier 1 */}
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 1</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Priority Implementation — 2026–2028</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$11–18.5M · 8 ventures</span>
          </div>
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
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Scale Phase — 2028–2030</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$4.5–8M · 4 ventures</span>
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
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$3–6M · 2 ventures</span>
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
        <SecHdr num="08" label="Deployment Roadmap" badge="3 phases" hint="Q1 2026 start · phase-by-phase milestones · critical path dependencies" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 08 — Implementation</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Deployment Roadmap</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced deployment built around the 2026 policy cycle and the TVET co-design window. Phase 1 is the critical window — multiple time-sensitive entry points converge in Q2–Q3 2026.</p>
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
            {[{m:'Agro-Processing Hub',d:'Site selection + cooperative feedstock agreements + food safety certification'},
              {m:'Cold Chain Network',d:'AkoFresh partnership signed + off-grid power confirmed per site'},
              {m:'Cooperative Fund',d:'GCX warehouse receipt activation + legal structure complete'},
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
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-coinvest" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="◆" label="Co-Investment" badge="6 actors" hint="IFC, AfDB, GIZ, USAID, Injaro, Ghana Exim — capital types, alignment, and BRIDGE stack role" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>◆ Members Intelligence · Co-Investment Landscape</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 key actors profiled</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Else Is Investing — and Where BRIDGE Fits</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Ghana's manufacturing investment landscape is active — but fragmented. DFIs and development partners deploy significant capital through technical assistance and concessional lending that requires private sector co-investment to activate. BRIDGE occupies the private equity anchor role that most donors cannot fill: operational management, equity stake, and long-term accountability for processing venture returns.</p>
        <div style={{background:C.paperDark,padding:'14px 20px',border:`1px solid ${C.border}`,marginBottom:'20px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>BRIDGE's Co-Investment Positioning</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}} className="tc">
            {[
              {l:'What DFIs provide',v:'Concessional capital, grants, technical assistance — but cannot operate manufacturing ventures or manage quality certification'},
              {l:'What industrial partners provide',v:'Equipment, technology, and supply chains — but cannot provide patient equity capital or AfCFTA market access'},
              {l:'What BRIDGE provides',v:'Private equity anchor, enabling-layer operations, exit discipline, and cross-sector portfolio management'},
            ].map((p,i)=>(
              <div key={i} style={{padding:'10px 12px',background:C.paper,border:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>{p.l}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.55,fontStyle:'italic'}}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile co-investor carousel */}
        <Carousel items={S.coInvestors} cardClass="mob-snap-wide" renderCard={(co,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden'}}>
            <div style={{background:C.forest,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,lineHeight:1.3}}>{co.name}</span>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,border:'1px solid rgba(184,217,53,0.3)',padding:'2px 7px',flexShrink:0}}>{co.type}</span>
            </div>
            <div style={{padding:'12px 14px'}}>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55,marginBottom:'8px'}}>{co.focus}</div>
              <div style={{display:'flex',justifyContent:'space-between',gap:'8px',marginBottom:'6px',borderTop:`1px solid ${C.border}`,paddingTop:'8px'}}> 
                <div><div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'2px'}}>Capital</div><div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest}}>{co.capital}</div></div>
                <div style={{textAlign:'right'}}><div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'2px'}}>Status</div><div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.positive}}>{co.stage}</div></div>
              </div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest,background:'rgba(27,77,62,0.06)',padding:'6px 8px'}}>{co.alignment}</div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>All 6 co-investment actors</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only">
        <div className="fig-scroll">
        <div style={{minWidth:'560px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'160px 70px 1fr 110px 100px',background:C.forest}}>
            {['Organisation','Type','Focus & Alignment','Capital Range','Status'].map((h,i)=>(
              <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
            ))}
          </div>
          {S.coInvestors.map((co,i)=>(
            <div key={i} className={i>=2?open?'':'mob-item-hidden':''} style={{display:'grid',gridTemplateColumns:'160px 70px 1fr 110px 100px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'start'}}>
              <div style={{padding:'11px 12px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,lineHeight:1.3}}>{co.name}</div>
              <div style={{padding:'11px 10px',borderLeft:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.forest,border:`1px solid ${C.border}`,padding:'2px 5px',display:'inline-block',lineHeight:1.4}}>{co.type}</span>
              </div>
              <div style={{padding:'11px 12px',borderLeft:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5,marginBottom:'4px'}}>{co.focus}</div>
                <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest}}>{co.alignment}</div>
              </div>
              <div style={{padding:'11px 12px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,borderLeft:`1px solid ${C.border}`}}>{co.capital}</div>
              <div style={{padding:'11px 12px',fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.positive,lineHeight:1.4,borderLeft:`1px solid ${C.border}`}}>{co.stage}</div>
            </div>
          ))}
        </div>
        </div>
        </div>
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>BRIDGE's blended finance architecture is designed to complement these actors, not compete with them. The correct co-investment sequence: BRIDGE equity anchor → DFI concessional layer → government free zone incentives → manufacturing SME equity participation. This stacking structure maximises leverage and aligns every stakeholder's incentive with BRIDGE's long-term manufacturing portfolio returns.</div>
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
        <SecHdr num="10" label="System Integration" badge="6 sector links" hint="Manufacturing links Agriculture, Energy, Housing, Finance, Creative Industries and more" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'24px',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Section 10 — System Integration</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.ink}}>Manufacturing as Value Capture Layer</h2>
          </div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'6px 14px',letterSpacing:'1px',flexShrink:0}}>8 sector links</div>
        </div>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Manufacturing is the value capture layer for every other sector in the BRIDGE portfolio. Agricultural raw materials need processing facilities. Energy investment de-risks manufacturing competitiveness. Housing construction needs building materials manufacturers. The integration is not incidental — it is the thesis. When BRIDGE invests in manufacturing, it amplifies returns across agriculture, energy, housing, and financial inclusion simultaneously.</p>
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
          <span>All 6 integration links</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
          {S.synergies.map((syn,i)=>(
            <div key={i} className={i>=4?open?'':'mob-item-hidden':''} style={{background:C.paperDark,border:`1px solid ${C.border}`,padding:'14px 18px',display:'flex',gap:'12px',alignItems:'flex-start'}}>
              <div style={{width:'38px',height:'38px',background:C.forest,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
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
        <SecHdr num="09" label="Risk & Thesis" badge="6 risk categories" hint="Power cost, working capital, skills, raw materials, certification, policy — each with BRIDGE mitigation" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="mob-hide" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 09 — Risk Analysis</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Risk &amp; Mitigation</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Manufacturing investment carries real risks — BRIDGE's enabling-layer architecture, cross-sector solar integration, and phased deployment model are each designed to manage a specific risk category. No single risk is unmitigated; the portfolio is designed around the full constraint stack.</p>
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
  const[intent,setIntent]=useState(null); // null | 'package' | 'partnership' | 'briefing'
  const[pkgOpen,setPkgOpen]=useState(false);

  const packageItems=[
    {item:'Venture Financial Models',detail:'10-year projections for all 14 ventures — revenue build, cost structure, IRR sensitivity, AfCFTA export forecasts, capacity utilisation sensitivity.'},
    {item:'Agro-Processing Hub Feasibility',detail:'5-site assessment, cooperative feedstock agreements, food safety certification pathway, 3-year production forecast.'},
    {item:'Shea Value Addition Business Plan',detail:'Processing technology comparison, cooperative partnership terms, EU/US cosmetic certification roadmap, diaspora brand pipeline.'},
    {item:'Manufacturing SME Directory',detail:'200+ verified SME manufacturers — contact data, sub-sector specialisation, certification status, investment readiness.'},
    {item:'TVET Partnership Guide',detail:'Curriculum co-design templates, employer partnership terms, TVET board engagement protocol — Q2 2026 window.'},
    {item:'Quality Certification Route Map',detail:'ISO 9001, HACCP, GFSI, AfCFTA rules-of-origin — certification pathway for 50 target SMEs with cost models.'},
    {item:'Competitive Intelligence',detail:'40+ manufacturers assessed — capacity utilisation, funding status, quality certification level, BRIDGE positioning.'},
    {item:'Pharmaceutical Expansion Assessment',detail:'Manufacturer capability assessments, WHO pre-qualification roadmap, essential medicines list, Sub-Saharan Africa market sizing.'},
    {item:'Manufacturing Financials Tool',detail:'Capacity utilisation and IRR model by sub-sector and enabling-layer intervention — built for due diligence.'},
    {item:'Regional Deployment Maps',detail:'GIS-referenced industrial zone site selection, logistics corridors, free zone adjacency data across 4 industrial zones.'},
    {item:'Policy Monitoring — Live Access',detail:'Monthly tracking of 1D1F deployments, AfCFTA tariff schedules, TVET programme rollout, and emerging policy changes.'},
    {item:'Quarterly Intelligence Updates',detail:'New data and revised assessments across all 12 sectors every quarter.'},
  ];

  const partnershipPhases=[
    {phase:'01',title:'Mandate Alignment',dur:'2–3 hrs',desc:'BRIDGE maps your capital profile, sector priorities, and risk parameters against the 14-venture manufacturing portfolio. Honest, direct, specific about fit.'},
    {phase:'02',title:'Bespoke Intelligence Build',dur:'4–6 wks',desc:'Custom financial models, capacity utilisation scenarios, certification roadmaps, and co-investment capital stack built for your mandate.'},
    {phase:'03',title:'Market Access',dur:'Ongoing',desc:'Direct MOTI/GIPC introductions, manufacturing SME networks in your target zones, certification partners, AfCFTA export channel relationships.'},
    {phase:'04',title:'Deal Origination',dur:'Rolling',desc:'Into opportunities before market-ready — at founder terms, with BRIDGE operational management. You bring capital. We bring Ghana.'},
  ];

  const intentCopy={
    package:{
      label:'Full Intelligence Package',
      sub:'Operational tools built for your process',
      cta:'Request Package Scope',
      href:'mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Manufacturing',
    },
    partnership:{
      label:'Partnership Engagement',
      sub:'BRIDGE at the table with you',
      cta:'Start the Conversation',
      href:'mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Agriculture',
    },
    briefing:{
      label:'30-Min Briefing',
      sub:'No commitment — we figure out fit first',
      cta:'Schedule Now →',
      href:'mailto:intelligence@bridgepbc.com?subject=Briefing Request — Manufacturing Sector',
    },
  };

  return(
    <div id="upsell" style={{background:C.ink,position:'relative',overflow:'hidden'}}>

      {/* Ghost watermark */}
      <div style={{position:'absolute',right:'-20px',top:'40px',fontFamily:F.display,fontSize:'clamp(100px,20vw,280px)',fontWeight:900,color:'rgba(255,255,255,0.018)',pointerEvents:'none',userSelect:'none',letterSpacing:'-10px',lineHeight:1}}>11</div>

      {/* ── Membership bar ── */}
      <div style={{background:'rgba(184,217,53,0.06)',borderBottom:'1px solid rgba(184,217,53,0.1)',padding:'9px 64px'}} className="pad-topbar">
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.lime,flexShrink:0}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>Members Access Active</span>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.2)'}}>· Sector 11 of 12 · Full edition included</span>
          </div>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.18)'}}>intelligence@bridgepbc.com</span>
        </div>
      </div>

      {/* ── Core CTA block ── */}
      <div className="pad-upsell" style={{padding:'44px 64px 0',position:'relative'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>

          {/* Headline */}
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <div style={{width:'28px',height:'3px',background:C.lime,marginTop:'0',opacity:0.9,flexShrink:0}}/>
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
              {key:'package',label:'Full Package',sub:'Operational tools & models',icon:(
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              )},
              {key:'partnership',label:'Partnership',sub:'Work directly with BRIDGE',icon:(
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              )},
              {key:'briefing',label:'30-Min Briefing',sub:'No commitment, find fit first',icon:(
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              )},
            ].map((opt)=>{
              const active=intent===opt.key;
              return(
                <button key={opt.key} onClick={()=>setIntent(active?null:opt.key)}
                  style={{background:active?'rgba(184,217,53,0.1)':'rgba(255,255,255,0.03)',border:active?`1.5px solid ${C.lime}`:'1px solid rgba(255,255,255,0.1)',padding:'14px 16px',cursor:'pointer',textAlign:'left',transition:'background 0.18s,border-color 0.18s',display:'flex',alignItems:'center',gap:'14px'}}>
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

          {/* ── Intent detail panel ── */}
          {intent==='package'&&(
            <div style={{border:'1px solid rgba(184,217,53,0.2)',background:'rgba(184,217,53,0.04)',marginBottom:'20px',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(184,217,53,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.lime,marginBottom:'2px'}}>Full Intelligence Package — Manufacturing & Light Industry</div>
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
                <a href="mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Manufacturing"
                  style={{background:C.lime,color:C.ink,padding:'10px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',flexShrink:0}}>
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
                <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.3)'}}>Starts with a conversation. If fit isn't there, we'll tell you directly.</span>
                <a href="mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Manufacturing"
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
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.65}}>Tell us your capital profile and sector focus. We'll show you exactly which of the 14 Manufacturing ventures match your mandate — and be direct if the fit isn't there. Takes 30 minutes. No pitch deck.</div>
              </div>
              <a href="mailto:intelligence@bridgepbc.com?subject=Briefing Request — Manufacturing Sector"
                style={{background:C.lime,color:C.ink,padding:'14px 28px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',flexShrink:0,display:'flex',alignItems:'center',gap:'8px'}}>
                Schedule Now <span style={{fontSize:'16px'}}>→</span>
              </a>
            </div>
          )}

          {/* ── Urgency strip — always visible ── */}
          <div style={{border:`1px solid ${C.amber}`,borderLeft:`3px solid ${C.amber}`,background:'rgba(184,115,10,0.08)',padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px',marginBottom:'0'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
              <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.amber,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0}}>⚡ Q2 2026</span>
              <div style={{width:'1px',height:'20px',background:'rgba(184,115,10,0.35)',flexShrink:0}}/>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>TVET Co-Design Window — Q2 2026 Application</span>
              <span className="mob-hide" style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.35)',fontStyle:'italic'}}>First employers to co-design curriculum lock in graduate pipeline advantage.</span>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:C.amber,flexShrink:0}}>1:3.5×</div>
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
          Sector 11 of 12 · Manufacturing &amp; Light Industry
          <br className="mob-hide"/>
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

export default function ManufacturingBrief(){
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
      <CropAnalysis/>
      <RegionalStrategy/>
      <CompetitiveLandscape/>
      <PolicyWindow/>
      <FarmerIncome/>
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
