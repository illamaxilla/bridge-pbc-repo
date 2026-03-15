import { useState, useEffect, useRef } from "react";
import React from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BRIDGE SECTOR 10 — Energy & Renewable Resources
   Full Members Edition · March 2026 · Standalone Document
═══════════════════════════════════════════════════════════════════════════ */

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF',teal:'#2E5A4D'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};
const RISK_COLOR={LOW:C.positive,MEDIUM:C.amber,HIGH:C.red,'LOW-MED':C.amber};
const MODE_BG={'Direct Op':C.forest,'Partnership':C.amber,'Investment':C.teal,'Guidance':C.paperDark,'Network':C.ink};
const MODE_TX={'Direct Op':C.lime,'Partnership':C.white,'Investment':C.paper,'Guidance':C.muted,'Network':'rgba(250,248,243,0.6)'};

/* ═══ SECTOR DATA ════════════════════════════════════════════════════════ */
const S={
  num:'10',name:'Energy & Renewable Resources',tier:'Core',score:76,capital:'$15–27M',edition:'March 2026 Edition',
  tagline:'Solar now costs $0.048/kWh — 64% cheaper than Ghana\'s grid tariff of $0.132/kWh. The economics of the energy transition have already arrived. BRIDGE builds the installation, distribution, and financing infrastructure that converts the opportunity into outcomes.',
  stats:[{l:'Annual Outage Cost',v:'$924M'},{l:'Renewable Share (non-hydro)',v:'0.8%'},{l:'Households on Polluting Fuels',v:'60%'},{l:'Deaths — Indoor Air Pollution',v:'6,500/yr'}],
  scoreDims:[{d:'Market Opportunity',w:'30%',s:80},{d:'Development Impact',w:'30%',s:88},{d:'Implementation Feasibility',w:'25%',s:72},{d:'Financial Sustainability',w:'15%',s:70}],
  snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'76/100'},{l:'Priority',v:'Immediate deployment'},{l:'Portfolio Range',v:'$15–27M'},{l:'Timeline',v:'2026–2030'},{l:'Ventures Identified',v:'14'}],
  summary:'Ghana\'s energy sector presents a structural paradox: 89% electrification — among the highest in Sub-Saharan Africa — yet power that is expensive, unreliable, and almost entirely fossil-fuelled. The $924 million annual cost of outages represents a permanent tax on every Ghanaian manufacturer, farmer, and SME. 66% of installed capacity runs on thermal generation at costs that have risen 352% over sixteen years.',
  summary2:'BRIDGE\'s energy thesis starts with the economics that already work. Solar LCOE at $0.048/kWh has crossed below the grid tariff of $0.132/kWh — commercial and industrial clients can now save money on day one of installation. That crossover creates a self-sustaining business case for the C&I Solar Installation Company, the anchor venture that builds the technical workforce, supply chain, and track record for every subsequent energy venture.',
  summary3:'The distributed transition BRIDGE accelerates — C&I solar first, then clean cooking, then community mini-grids — addresses Ghana\'s energy crisis from the demand side, without waiting for the $2.1B legacy utility debt to resolve. Every venture is structured to be commercially viable independently while contributing to the national goal of reducing energy poverty for 6,500 lives lost annually to indoor air pollution.',
  quote:'\"Solar has crossed the cost crossover point — it is now cheaper for commercial and industrial users than the grid tariff. The economics have shifted. Every day Ghana delays the distributed transition is another $2.5 million in preventable outage losses.\"',

  subs:[
    {name:'Commercial & Industrial Solar',score:88,stage:'Series A Ready',capital:'$2–3.5M',note:'Grid tariff crossover — self-sustaining from day one'},
    {name:'Clean Cooking Distribution',score:84,stage:'Active',capital:'$1.5–2.5M',note:'6,500 deaths/yr; commercially viable last-mile model'},
    {name:'Solar Technician Training',score:82,stage:'Active',capital:'$500K–1M',note:'Workforce bottleneck — 500+ technicians/yr target'},
    {name:'Community Mini-Grids',score:79,stage:'Seed–A',capital:'$2–3M',note:'2M people in 170+ Volta Lake communities off-grid'},
    {name:'Energy Efficiency Services',score:76,stage:'Seed–A',capital:'$500K–1M',note:'ESCO model — cheapest energy is energy not used'},
    {name:'Residential Solar Financing',score:70,stage:'Early',capital:'$1–2M',note:'PAYG mobile money; builds on C&I track record'},
  ],

  constraints:[
    {c:'Thermal Dominance',harm:'66% of generation is gas/oil at rising cost. Tariff has increased 352% in 16 years — pricing manufacturing out of regional competitiveness.'},
    {c:'$2.1B Legacy Debt',harm:'Arrears to independent power producers block new utility-scale investment. Utility-scale solar pipeline stalled pending financial restructuring.'},
    {c:'Grid Unreliability',harm:'$320–924M annual outage cost across manufacturing, SMEs, agriculture, and health — 2–6% of GDP transferred from productive enterprise to backup generators.'},
    {c:'Clean Cooking Gap',harm:'60% of households cook on charcoal or firewood regardless of grid connection. 6,500 annual deaths from indoor air pollution — a solvable public health crisis.'},
    {c:'Off-Grid Communities',harm:'2 million people in 170+ Volta Lake communities without grid access. Grid extension unlikely within any planning horizon — mini-grids are the only viable path.'},
    {c:'Technical Workforce',harm:'Trained solar installers are the primary bottleneck to scale. Equipment and capital exist; certified technicians do not. Ghana installs far below its solar potential.'},
  ],

  cropLoss:[
    {crop:'Manufacturing',cur:145,tgt:18,note:'Highest absolute loss — continuous process industries cannot operate intermittently'},
    {crop:'SMEs',cur:95,tgt:12,note:'Cannot afford generator backup; absorb full outage cost without recourse'},
    {crop:'Agriculture & Cold Chain',cur:65,tgt:8,note:'Grid failure spoils produce — compounding post-harvest losses already at 20–40%'},
    {crop:'Health Facilities',cur:38,tgt:4,note:'Clinical impact: cold chain failure, diagnostic equipment downtime, staff retention'},
    {crop:'Commercial Buildings',cur:42,tgt:6,note:'Hotels, offices, retail — backup generation costs embedded in operating cost'},
    {crop:'Education Sector',cur:18,tgt:2,note:'Computer labs, evening classes, digital learning — all dependent on reliable power'},
  ],

  zones:[
    {zone:'Northern Savannah',regions:'Upper East, Upper West, Northern, N-East, Savannah',crops:'5.6–5.8 kWh/m²/day — Ghana\'s best irradiance',alloc:35,allocLabel:'~35%',color:C.lime,interventions:'Community mini-grids; off-grid solar; Solar Cold Storage Network; technician deployment base',context:'2M Volta Lake residents off-grid; best solar resource in West Africa; highest mini-grid ROI'},
    {zone:'Middle Belt',regions:'Bono, Bono East, Ahafo, Brong-Ahafo, N. Ashanti',crops:'5.2–5.5 kWh/m²/day — excellent resource',alloc:25,allocLabel:'~25%',color:C.amber,interventions:'C&I solar for agro-processors; clean cooking distribution; cooperative solar installations',context:'Agricultural processing cluster; strong cooperative base; combined agriculture-energy investment case'},
    {zone:'Southern Forest',regions:'Ashanti, Eastern, Western, Central',crops:'4.9–5.1 kWh/m²/day — above viability threshold',alloc:25,allocLabel:'~25%',color:C.teal,interventions:'Commercial & industrial solar; energy efficiency services; manufacturing outage cost elimination',context:'Manufacturing concentration; highest C&I solar demand; cocoa and timber processors need reliable power'},
    {zone:'Greater Accra & Coast',regions:'Greater Accra, Volta south, Central coast',crops:'4.7–4.9 kWh/m²/day — viable everywhere',alloc:15,allocLabel:'~15%',color:C.muted,interventions:'Commercial solar; urban clean cooking; residential financing pilot; equipment distribution hub',context:'Highest commercial density; fastest payback for C&I installations; equipment import and distribution centre'},
  ],

  competitors:[
    {type:'C&I Solar · Ghana',name:'Azimuth Solar',desc:'Ghana-based commercial solar installer. Active C&I market. Limited battery storage integration and no O&M contract infrastructure at scale.',pos:'BRIDGE C&I venture is structured with 10-year O&M contracts and battery integration — differentiated product in a market Azimuth partly serves.'},
    {type:'PAYG Solar · Pan-Africa',name:'BBOXX',desc:'Pay-as-you-go solar home systems. 350,000+ customers across Africa. East Africa focus; Ghana presence limited. Strong technology but limited commercial/industrial offering.',pos:'Residential financing partner model — BBOXX technology + BRIDGE distribution for Ghana residential market in Phase 2.'},
    {type:'Clean Cooking · Global',name:'BioLite',desc:'Cookstove technology company with distribution in Ghana. Product quality strong. Limited last-mile distribution reach into peri-urban and rural Ghana.',pos:'Technology supply partner for Clean Cooking Distribution Network — BioLite product + BRIDGE last-mile distribution model.'},
    {type:'Mini-Grids · India/Africa',name:'Husk Power Systems',desc:'Mini-grid development and operations. 100+ sites in Africa. Strong operational model. Capital-intensive development — limited Ghana-specific customisation.',pos:'Technical partnership model for community mini-grid development — Husk operational know-how + BRIDGE local cooperative relationships.'},
    {type:'Energy Finance',name:'GOGLA / SEAF',desc:'Industry association and blended finance platform for off-grid solar sector. Active in Ghana market development. Not a commercial competitor — a co-investment partner.',pos:'Co-investment relationship — SEAF capital + BRIDGE deal origination for off-grid ventures.'},
    {type:'Utility · Ghana',name:'GRIDCO / ECG',desc:'Ghana Grid Company and Electricity Company of Ghana. Infrastructure incumbent with $2.1B debt overhang. Regulatory authority but not a commercial competitor in distributed solar.',pos:'Partnership interface for grid interconnection, mini-grid licensing, and C&I solar net-metering — not a competitor.'},
  ],

  budgetItems:[
    {item:'SE4ALL Energy Access Framework',ghc:'GH₵2.1B+',usd:'~US$150M',pct:100,mode:'Co-investment + technical partnership',urgency:'Q2 2026 — procurement open',featured:true},
    {item:'PURC Tariff Reform Support',ghc:'GH₵860M',usd:'~US$62M',pct:41,mode:'Policy alignment — rate certainty',urgency:'2026–2028 review cycle',featured:false},
    {item:'Clean Cooking / LPG Infrastructure',ghc:'GH₵430M',usd:'~US$31M',pct:20,mode:'Distribution co-investment',urgency:'Budget year 2026',featured:false},
    {item:'Rural Electrification Agency',ghc:'GH₵320M',usd:'~US$23M',pct:15,mode:'Mini-grid licensing + co-investment',urgency:'Active now',featured:false},
    {item:'TVET / Technical Skills Fund',ghc:'Shared mandate',usd:'Multi-sector',pct:8,mode:'Technician academy partnership',urgency:'Ongoing',featured:false},
  ],

  oilPalm:[
    {f:'Framework',t:'SE4ALL Ghana — Sustainable Energy for All national framework'},
    {f:'Renewable Target',t:'10% non-hydro RE by 2030 — currently 0.8%'},
    {f:'Mini-Grid Licensing',t:'Streamlined under SE4ALL — Energy Commission fast-track'},
    {f:'C&I Net Metering',t:'PURC net metering regulation — active for systems under 200 kW'},
    {f:'BRIDGE Entry Point',t:'C&I solar + mini-grid development + technician training'},
    {f:'Leverage Ratio',t:'1:4.8× SE4ALL blended finance for off-grid and mini-grid development'},
    {f:'Deployment Window',t:'Q2 2026 — procurement and licensing window open now'},
  ],

  ventures:[
    {tier:1,num:'①',name:'C&I Solar Installation Company',desc:'Commercial and industrial solar installation business targeting manufacturers, hospitals, hotels, and commercial buildings — the clients for whom grid tariff crossover makes solar the rational economic choice. Turnkey EPC model with 10-year O&M contracts, battery storage integration, and performance-guaranteed output. At $0.048/kWh LCOE vs $0.132/kWh grid, payback under four years. Anchor venture for the entire energy portfolio.',mode:'Direct Op',capital:'$2–3.5M',irr:'18–24%',risk:'MEDIUM',payback:'4–6 yrs',start:'Q2 2026'},
    {tier:1,num:'②',name:'Clean Cooking Distribution Network',desc:'Last-mile LPG and improved cookstove distribution for peri-urban and rural households — structured as a commercial distribution business. Subsidised first-cylinder programme (₵50–100/household) converts trial to adoption; credit-linked monthly refill subscriptions provide predictable revenue. Partners with Ghana Cylinder Manufacturing Company. Women-led community agents earn commissions on subscriptions.',mode:'Direct Op',capital:'$1.5–2.5M',irr:'14–18%',risk:'MEDIUM',payback:'4–6 yrs',start:'Q1 2026'},
    {tier:1,num:'③',name:'Solar Technician Training Academy',desc:'Practical solar installation, maintenance, and battery systems training for 500+ technicians per year — the workforce bottleneck constraining Ghana\'s solar expansion more than capital or equipment. 6–12 week programmes with TVET certification. Partnership with GRIDCO, Energy Commission, and C&I Solar for guaranteed employment placement. Diaspora engineers provide advanced technical instruction.',mode:'Partnership',capital:'$500K–1M',irr:'12–15%',risk:'LOW',payback:'3–5 yrs',start:'Q3 2026'},
    {tier:1,num:'④',name:'Community Mini-Grid Development',desc:'Solar-plus-storage mini-grids for 2 million Ghanaians in 170+ Volta Lake communities and other off-grid populations. 20–100 kW systems per community, structured as community-owned cooperatives with BRIDGE technical management. Anchor commercial loads (health post, school, market) establish revenue base. Energy Commission mini-grid licensing streamlined under SE4ALL framework.',mode:'Partnership',capital:'$2–3M',irr:'10–14%',risk:'MEDIUM',payback:'5–8 yrs',start:'Q3 2026'},
    {tier:1,num:'⑤',name:'Solar Cold Storage Network',desc:'Solar-powered cold storage hubs at agricultural market centres — directly addressing post-harvest losses destroying 20–40% of Ghana\'s food production. 10–20 tonne capacity units at district markets, accessible to cooperatives on fee-per-use basis. Partners with BRIDGE Agriculture portfolio. Each hub serves 200–500 farming households within 25km. Solar eliminates the grid dependency that has caused repeated failure of previous cold storage pilots.',mode:'Partnership',capital:'$1–2M',irr:'11–14%',risk:'LOW',payback:'4–6 yrs',start:'Q1 2026'},
    {tier:1,num:'⑥',name:'Quality Equipment Distribution',desc:'Import, quality assurance, and distribution of IEC-certified solar panels, inverters, batteries, and cookstoves — closing the market access gap forcing installers to choose between expensive European brands and uncertified Chinese imports. Warranty-backed products, centralised technical support, and installer credit lines enable small solar businesses to take on larger projects. Doubles as sector data collection: installation volumes, failure rates, and regional demand patterns.',mode:'Direct Op',capital:'$1.5–2.5M',irr:'12–16%',risk:'LOW',payback:'3–5 yrs',start:'Q2 2026'},
    {tier:1,num:'⑦',name:'Energy Efficiency Services',desc:'Energy auditing and retrofitting for commercial buildings, schools, hospitals, and manufacturers — LED lighting, efficient motors, HVAC optimisation, and building envelope improvements. ESCO model with shared savings contracts: clients pay nothing upfront; BRIDGE receives a share of verified energy savings over 3–5 years. Each audit is also a lead generation channel for solar installation.',mode:'Direct Op',capital:'$500K–1M',irr:'14–20%',risk:'LOW',payback:'3–5 yrs',start:'Q2 2026'},
    {tier:2,num:'⑧',name:'Residential Solar Financing Platform',desc:'Consumer financing for household solar systems (1–5 kW) — PAYG models, mobile money-linked instalment plans, and bank partnership structures making solar accessible to middle-income households. Builds on C&I installation track record and technician workforce. Phase 2 timing allows risk models to be built on Phase 1 commercial data before extending into higher-default consumer segment.',mode:'Partnership',capital:'$1–2M',irr:'10–14%',risk:'MEDIUM',payback:'5–7 yrs',start:'2028'},
    {tier:2,num:'⑨',name:'Women in Clean Energy Accelerator',desc:'Business development and market access support for women-led clean energy enterprises — cookstove distribution agents, solar technician cooperatives, and biogas operators. Women are primary decision-makers for household energy and dramatically underrepresented in the formal energy workforce. Addresses both: supporting women entrepreneurs while expanding the clean energy distribution network.',mode:'Direct Op',capital:'$500K–1M',irr:'Capacity building',risk:'LOW',payback:'N/A',start:'2028'},
    {tier:2,num:'⑩',name:'Biogas Systems Company',desc:'Biogas generation from agricultural waste, municipal organic waste, and livestock operations — household digesters for rural farming communities and commercial units for agro-processors. Integrates with BRIDGE Agriculture portfolio: livestock farms, cassava processors, and rice millers generate the organic inputs biogas requires. Market readiness is lower than solar; agricultural waste co-benefit makes this compelling at scale.',mode:'Direct Op',capital:'$1–2M',irr:'10–14%',risk:'MEDIUM',payback:'5–7 yrs',start:'2028'},
    {tier:2,num:'⑪',name:'Mini-Grid Operating Company',desc:'Ongoing operations, maintenance, and revenue management for the community mini-grid portfolio built in Phase 1 — separating development from operation to allow each to scale independently. Mini-grid operations require billing, maintenance scheduling, community relations, and load growth management. A dedicated operating company creates the recurring revenue stream that makes the development pipeline commercially sustainable.',mode:'Direct Op',capital:'$500K–1M',irr:'11–15%',risk:'MEDIUM',payback:'4–6 yrs',start:'2028'},
    {tier:3,num:'⑫',name:'Battery Storage Solutions',desc:'Grid-scale and commercial battery energy storage deployment — conditioned on battery technology cost reductions (currently declining ~15%/year) reaching the threshold that makes Ghana\'s grid economics viable for standalone storage investment. Phase 1 C&I solar installations include battery components; this venture scales storage as a standalone product category.',mode:'Partnership',capital:'$500K–1M',irr:'12–16%',risk:'MEDIUM',payback:'5–7 yrs',start:'2030+'},
    {tier:3,num:'⑬',name:'EV Charging Infrastructure',desc:'EV charging network development — conditioned on meaningful EV adoption in Ghana\'s vehicle fleet, which remains nascent. The solar-EV combination (charge during peak solar production, discharge for grid services) is compelling economically; market timing is 2030+ given current import patterns and vehicle prices.',mode:'Partnership',capital:'$1–2M',irr:'10–15%',risk:'HIGH',payback:'6–9 yrs',start:'2030+'},
    {tier:3,num:'⑭',name:'Utility-Scale Solar Co-Investment',desc:'Co-investment in utility-scale IPP solar projects — conditioned on resolution of the $2.1B legacy debt and PPA structure reform that currently makes utility-scale investment unattractive. The distributed transition BRIDGE leads does not require utility resolution; but a reformed utility market would dramatically amplify distributed investment returns.',mode:'Investment',capital:'$1–2M',irr:'12–18%',risk:'HIGH',payback:'7–10 yrs',start:'2030+'},
  ],

  timeline:{
    phase1:{label:'Phase 1 — Commercial Foundation',years:'2026–2027',capital:'$8.25–14.5M',count:'7 ventures',items:['Q1 2026: Clean Cooking Distribution + Solar Cold Storage — immediate deployment, no licensing required','Q2 2026: C&I Solar Installation Company — first commercial clients signed, EPC model operating','Q2 2026: Quality Equipment Distribution — IEC-certified supplier roster and installer credit lines active','Q2 2026: Energy Efficiency Services — first ESCO audits complete, shared savings contracts signed','Q3 2026: Solar Technician Training Academy — TVET partnership formalised, first cohort enrolled','Q3 2026: Community Mini-Grid Development — Energy Commission licensing filed, 5 sites selected','Ongoing: C&I pipeline — target 20 commercial clients by end 2026']},
    phase2:{label:'Phase 2 — Distributed Scale',years:'2028–2030',capital:'$3–6M',count:'4 ventures',items:['Residential Solar Financing — PAYG platform launch, mobile money integration with 2+ banks','Women in Clean Energy Accelerator — 200+ women-led enterprises supported','Biogas Systems Company — 10 agricultural clients; cassava/livestock waste to energy','Mini-Grid Operating Company — standalone operations entity for Phase 1 portfolio']},
    phase3:{label:'Phase 3 — Systems Transition',years:'2030+',capital:'$2.5–5M',count:'3 ventures',items:['Battery Storage Solutions — standalone storage as technology cost crosses viability threshold','EV Charging Infrastructure — first charging corridors on Accra-Kumasi highway','Utility-Scale Solar Co-Investment — conditioned on PPA reform and debt resolution']},
  },

  roadmap:[
    {name:'Clean Cooking Distribution',tier:1,s:0,e:50},
    {name:'Solar Cold Storage',tier:1,s:0,e:50},
    {name:'C&I Solar Installation',tier:1,s:5,e:65},
    {name:'Equipment Distribution',tier:1,s:5,e:65},
    {name:'Energy Efficiency',tier:1,s:5,e:60},
    {name:'Technician Academy',tier:1,s:10,e:75},
    {name:'Mini-Grid Development',tier:1,s:10,e:80},
    {name:'Residential Financing',tier:2,s:50,e:85},
    {name:'Biogas Systems',tier:2,s:50,e:85},
    {name:'Mini-Grid Operations',tier:2,s:55,e:100},
    {name:'Battery Storage',tier:3,s:80,e:100},
    {name:'EV Charging',tier:3,s:82,e:100},
    {name:'Utility-Scale Co-Inv.',tier:3,s:85,e:100},
  ],

  synergies:[
    {sector:'06 Agriculture',link:'Solar Cold Storage Network directly addresses the post-harvest loss crisis. Irrigation pumping, agro-processing, and rural market electrification all depend on reliable, affordable power.'},
    {sector:'11 Manufacturing',link:'The $320–924M annual outage cost falls hardest on manufacturers. C&I solar eliminates it. Energy cost competitiveness is the single largest factor closing Ghana\'s manufacturing gap with regional peers.'},
    {sector:'03 Health Systems',link:'Health facilities on unreliable grid power cannot maintain cold chain for vaccines, run diagnostic equipment, or retain staff. Solar backup is not a luxury — it is a clinical standard.'},
    {sector:'05 Education',link:'School electrification enables evening classes, computer labs, and digital learning. Solar Technician Training Academy produces 500+ certified graduates per year — an education sector investment.'},
    {sector:'02 Financial Inclusion',link:'Pay-as-you-go solar and clean cooking financing are financial inclusion products. Mobile money-linked energy payments drive account activity and credit history for previously unbanked households.'},
    {sector:'01 Infrastructure',link:'Energy is infrastructure for every other infrastructure investment. Cold chain, water pumping, ICT systems, and urban services all require reliable, affordable power to function.'},
    {sector:'12 Transport',link:'EV charging infrastructure (Phase 3) creates the grid of charging points that makes electric vehicle adoption economically viable for Ghana\'s transport fleet.'},
    {sector:'07 Creative Industries',link:'Reliable power enables digital creative studios, broadcasting facilities, and event infrastructure — enabling the formal creative economy that currently loses output to generator costs.'},
  ],

  risks:[
    {r:'Policy & Regulatory Uncertainty',sev:'HIGH',mit:'BRIDGE begins with commercially self-sustaining C&I solar — no policy subsidy required. Mini-grid ventures file early; licensing under SE4ALL streamlined. Policy exposure is Phase 2+.'},
    {r:'Utility Debt & Tariff Reform',sev:'HIGH',mit:'Distributed solar thesis explicitly avoids utility-scale dependency. C&I and off-grid ventures are viable regardless of utility debt resolution timeline.'},
    {r:'Equipment Quality & Counterfeits',sev:'MEDIUM',mit:'Quality Equipment Distribution venture is itself the mitigation — IEC-certified supply, warranty management, and installer training are the quality assurance infrastructure.'},
    {r:'Consumer Credit Default',sev:'MEDIUM',mit:'Phase 1 C&I clients are creditworthy commercial entities. Residential PAYG (Phase 2) builds default models before consumer credit is deployed at scale.'},
    {r:'Technical Workforce Shortage',sev:'MEDIUM',mit:'Solar Technician Training Academy is Tier 1 — addresses the bottleneck before it constrains portfolio deployment. 500+ graduates per year targets the critical path.'},
    {r:'Climate & Seasonal Variability',sev:'LOW-MED',mit:'Ghana\'s solar resource is exceptional and uniform — even in the wet season, irradiance is above economic viability threshold. Battery storage and grid interconnection provide backup.'},
  ],

  thesis:'BRIDGE\'s energy investment thesis is built on a single economic reality: solar has crossed the cost crossover point in Ghana. At $0.048/kWh LCOE versus $0.132/kWh grid tariff, commercial solar installations pay back in under four years without subsidy. The C&I Solar Installation Company converts this economic reality into a scalable business — and every other energy venture builds on the workforce, supply chain, and relationships it creates.',
  thesis2:'The impact multiplier is structural. A trained solar technician installs systems that reduce energy costs for manufacturers employing hundreds. A single cold storage hub serves 500 farming households. A clean cooking distribution route reaches 10,000 households. The 6,500 annual deaths from indoor air pollution represent a human cost that a commercially structured distribution business can directly reduce. Energy is not one sector among twelve — it is the infrastructure on which every sector\'s performance depends.',
  deploy:[
    {l:'Ticket size',v:'$500K–$3.5M per venture'},
    {l:'Preferred stage',v:'Seed through Series A'},
    {l:'Model preference',v:'ESCO, EPC + O&M, distribution co.'},
    {l:'Co-investment',v:'Power Africa; GIZ; IFC; SEAF'},
    {l:'Exit horizon',v:'6–10 years; strategic or operator sale'},
  ],

  benchmarks:[
    {country:'Ghana — Current (non-hydro RE)',pct:1,highlight:'red',note:'0.8% renewable share vs 10% target by 2030'},
    {country:'Kenya',pct:32,highlight:false,note:'Regional leader — distributed solar + geothermal'},
    {country:'Rwanda',pct:48,highlight:false,note:'Off-grid first policy; dense mini-grid deployment'},
    {country:'Morocco',pct:54,highlight:false,note:'North Africa benchmark — utility + distributed blend'},
    {country:'Ghana — BRIDGE + Policy Target 2030',pct:10,highlight:'lime',note:'Minimum national target — BRIDGE contributes distributed pathway'},
  ],

  marketSizes:[
    {crop:'C&I Solar Market',tam:'$320M+',note:'Commercial/industrial Ghana market',accessible:'$45–80M',growth:'+22%/yr',phase:1,priority:'IMMEDIATE'},
    {crop:'Clean Cooking Market',tam:'$180M+',note:'7M peri-urban + rural households',accessible:'$35–60M',growth:'+15%/yr',phase:1,priority:'IMMEDIATE'},
    {crop:'Off-Grid / Mini-Grid',tam:'$2.1B+',note:'2M people, 170+ communities',accessible:'$20–40M',growth:'+18%/yr',phase:1,priority:'HIGH'},
    {crop:'Energy Efficiency',tam:'$90M+',note:'Commercial building retrofit market',accessible:'$15–25M',growth:'+12%/yr',phase:2,priority:'HIGH'},
    {crop:'Residential Solar',tam:'$540M+',note:'5M addressable urban households',accessible:'$25–45M',growth:'+20%/yr',phase:2,priority:'MEDIUM'},
  ],

  coopTiers:[
    {tier:'Tier 1 — TVET-Certified Installers',count:'200+',zone:'Accra + Kumasi core',desc:'Certified through GRIDCO/TVET programmes. Deploy C&I and residential installations. BRIDGE primary workforce.',color:'positive'},
    {tier:'Tier 2 — Technician Academy Graduates',count:'500+/yr',zone:'All 4 regions',desc:'Trained through BRIDGE Solar Technician Academy. Deployed via installer placement programme. Growing base.',color:'amber'},
    {tier:'Tier 3 — Informal Electrical Workers',count:'8,000+',zone:'Nationwide',desc:'Unregistered electricians performing informal solar installations. Target for upskilling through Academy curriculum.',color:'faint'},
  ],

  eudrItems:[
    {date:'2024',event:'SE4ALL Ghana framework activated',type:'PAST',note:'National renewable energy roadmap confirmed by government'},
    {date:'Q1 2026',event:'BRIDGE C&I + Clean Cooking deployment',type:'BRIDGE',note:'First commercial installations and distribution routes active'},
    {date:'Q2 2026',event:'Mini-grid licensing window open',type:'CRITICAL',note:'Energy Commission fast-track under SE4ALL — first-mover advantage'},
    {date:'Q3 2026',event:'Technician Academy first cohort',type:'BRIDGE',note:'500-technician pipeline established before Phase 2 scale requires it'},
    {date:'2027',event:'PURC tariff review cycle',type:'FUTURE',note:'Net metering and distributed RE integration policy update'},
    {date:'2030',event:'10% RE target deadline',type:'FUTURE',note:'National target — BRIDGE portfolio contributes distributed pathway'},
  ],

  coInvestors:[
    {name:'Power Africa / USAID',type:'Grant + Technical TA',focus:'Off-grid solar, clean cooking, mini-grids',alignment:'Phase 1 — all distributed ventures',capital:'$5–15M',stage:'Active in Ghana'},
    {name:'IFC',type:'Equity + Debt',focus:'C&I solar, renewable energy SMEs',alignment:'C&I Installation Company Phase 1',capital:'$5–25M',stage:'Active energy portfolio'},
    {name:'GIZ / German Development',type:'Technical Assistance',focus:'Energy efficiency, TVET, mini-grid systems',alignment:'Technician Academy + mini-grid licensing',capital:'Technical TA',stage:'Active Ghana programme'},
    {name:'SEAF / GOGLA',type:'Impact Finance',focus:'Off-grid solar market development',alignment:'Off-grid and mini-grid ventures',capital:'$1–5M',stage:'Deployed in Ghana'},
    {name:'Root Capital / Acumen',type:'Impact Finance',focus:'Energy access + smallholder linkage',alignment:'Clean cooking + cold storage cross-sector',capital:'$500K–3M',stage:'Active in region'},
    {name:'GIIF (Ghana Infra. Inv. Fund)',type:'Dev Finance — GH₵',focus:'National infrastructure, energy access',alignment:'All phases — local currency co-investment',capital:'GH₵ denominated',stage:'Government-backed'},
  ],

  fullPackage:[
    {item:'14-Venture Financial Models',desc:'10-year projections for all ventures — revenue build, cost structure, IRR sensitivity, working capital, and scenario analysis for each of the 14 energy ventures.'},
    {item:'C&I Solar Business Plan',desc:'Complete investment case: target client pipeline of 50 commercial sites, EPC cost models, O&M contract structures, and battery storage integration specifications.'},
    {item:'Clean Cooking Distribution Plan',desc:'Last-mile route design, subsidised first-cylinder model, 10,000-household first-year target plan, and community agent commission structure.'},
    {item:'Technician Academy Curriculum',desc:'6–12 week training programme, TVET partnership terms, graduate employment pipeline, and 500-technician annual output model.'},
    {item:'Mini-Grid Community Shortlist',desc:'20-community priority shortlist with load assessments, site feasibility studies, GRIDCO licensing pathway, and cooperative ownership structures.'},
    {item:'Solar Cold Storage Site Selection',desc:'15-site selection criteria, agricultural catchment analysis, cooperative revenue-sharing models, and cross-sector agriculture linkage plan.'},
    {item:'Equipment Distribution Plan',desc:'IEC-certified supplier roster, import logistics and duty structures, warranty management protocol, and installer credit line terms.'},
    {item:'ESCO Contract Templates',desc:'Energy efficiency audit methodology, shared-savings verification protocols, contract templates, and 30-site commercial building pipeline.'},
    {item:'Residential PAYG Comparison',desc:'PAYG technology comparison across 6 providers, mobile money partner shortlist, consumer credit scoring approach, and default mitigation framework.'},
    {item:'Biogas Feedstock Mapping',desc:'Agricultural waste feedstock mapping by region, digester technology comparison, and target farm and processor pipeline for Phase 2.'},
    {item:'Quarterly Energy Intelligence',desc:'Tariff movements, renewable project pipeline updates, outage frequency data, technology cost curves, and SE4ALL programme progress — every quarter.'},
    {item:'Policy Interface Briefings',desc:'SE4ALL framework updates, mini-grid licensing developments, PURC tariff review calendars, and net metering regulation tracking — monthly.'},
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

/* ═══ GLOBAL STYLES v4 ══════════════════════════════════════ */
const Gf=()=>(<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  [id^='sec-'],[id='upsell']{scroll-margin-top:50px;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .dc::first-letter{font-family:${F.display};font-size:4.4em;font-weight:900;float:left;line-height:0.8;margin:0.05em 0.12em 0 0;color:${C.forest};}
  @media print{.np{display:none!important;}}
  .mob-show{display:none;}
  .mob-only{display:none!important;}
  .mob-car{display:none!important;}
  .mob-sec-hdr{display:none!important;}
  .desk-only{display:block;}
  .mob-expand-all{display:none;}
  .fig-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .fig-scroll::-webkit-scrollbar{height:3px;}
  .fig-scroll::-webkit-scrollbar-track{background:transparent;}
  .fig-scroll::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px;}
  .subs-table{display:block;}
  .subs-cards{display:none;}
  .mob-scroller{display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;scrollbar-width:none;gap:12px;-webkit-overflow-scrolling:touch;padding-bottom:4px;}
  .mob-scroller::-webkit-scrollbar{display:none;}
  .mob-snap-card{flex:0 0 82vw;scroll-snap-align:start;min-width:0;}
  .mob-snap-wide{flex:0 0 92vw;scroll-snap-align:start;min-width:0;}
  .mob-snap-sm{flex:0 0 72vw;scroll-snap-align:start;min-width:0;}
  .car-wrap{position:relative;}
  .car-wrap::after{content:'';position:absolute;top:14px;right:0;width:44px;height:calc(100% - 32px);background:linear-gradient(to right,transparent,${C.paper} 90%);pointer-events:none;z-index:2;}
  .car-wrap-dark::after{background:linear-gradient(to right,transparent,${C.paperDark} 90%);}
  .car-wrap-ink::after{background:linear-gradient(to right,transparent,${C.ink} 90%);}
  .mob-toggle{display:none;width:100%;padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};align-items:center;justify-content:space-between;transition:color 0.15s;}
  .mob-toggle:hover{color:${C.forest};}
  .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
  .mob-toggle-hdr{border-bottom:1px solid rgba(255,255,255,0.08)!important;color:rgba(250,248,243,0.4)!important;}
  .row-hover{transition:background 0.12s ease;}
  .row-hover:hover{background:rgba(184,217,53,0.04)!important;}
  .row-hover-dark:hover{background:rgba(255,255,255,0.035)!important;}
  @keyframes barGrow{from{width:0}to{width:var(--w,100%)}}
  .score-bar{animation:barGrow 1s cubic-bezier(0.16,1,0.3,1) 0.4s both;}
  .score-bar-dim{animation:barGrow 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both;}
  a{transition:opacity 0.15s ease;-webkit-tap-highlight-color:transparent;}
  a:hover{opacity:0.76;}
  button{transition:background 0.15s ease,border-color 0.15s ease,color 0.15s ease;-webkit-tap-highlight-color:transparent;}
  .cta-primary{transition:transform 0.15s ease,box-shadow 0.15s ease!important;}
  .cta-primary:hover{transform:translateY(-1px)!important;box-shadow:0 6px 20px rgba(184,217,53,0.25)!important;}
  .sec-rule{border-top:5px solid ${C.ink};border-bottom:2.5px solid ${C.lime};padding-bottom:4px;margin-bottom:22px;}
  ::selection{background:${C.lime};color:${C.ink};}
  .sec-body-hidden *{pointer-events:none;}
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
    .stats-row>div{flex:0 0 50%!important;border-left:none!important;border-top:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:first-child{flex:0 0 100%!important;border-top:none!important;}
    .stats-row>div:nth-child(2){border-top:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(3){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(5){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .mob-stat{display:flex!important;}
  }
`}</style>);

/* ═══ FIGURE CAPTION v4 ═════════════════════════════════════════════════ */
const FigCaption=({num,title,note})=>(
  <div style={{marginBottom:'14px'}}>
    <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'5px'}}>
      <span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:C.lime,letterSpacing:'2px',background:C.forest,padding:'3px 9px',flexShrink:0}}>FIG {num}</span>
      <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,letterSpacing:'0.1px'}}>{title}</span>
    </div>
    {note&&<div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic',lineHeight:1.6,borderLeft:`2px solid ${C.border}`,marginLeft:'2px',paddingLeft:'10px'}}>{note}</div>}
  </div>
);

/* ═══ FIG 01 — TARIFF CROSSOVER ════════════════════════════════════════ */
const Fig01ValueChain=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="01" title="The Tariff Crossover — Ghana Grid vs. Solar LCOE" note="Ghana grid tariff vs. commercial solar LCOE. Solar has permanently crossed below the grid tariff — C&I clients now save 64% on every unit of solar-generated electricity. The 352% cumulative tariff rise makes the advantage structural, not cyclical. Source: PURC Ghana; IRENA; BRIDGE Analysis, 2026."/>
    <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
      {/* Bar comparison */}
      <div style={{background:C.paperDark,padding:'20px 20px 12px'}}>
        {[
          {label:'Ghana Grid Tariff',sub:'Current PURC rate · +352% since 2008',val:'$0.132/kWh',pct:100,color:C.red,note:'Rising'},
          {label:'C&I Solar LCOE',sub:'BRIDGE installation benchmark · 25-yr guaranteed',val:'$0.048/kWh',pct:36,color:C.lime,note:'Falling'},
        ].map((row,i)=>(
          <div key={i} style={{marginBottom:i===0?'14px':'0'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'5px'}}>
              <div>
                <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{row.label}</span>
                <span style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic',marginLeft:'8px'}}>{row.sub}</span>
              </div>
              <span style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:row.color,flexShrink:0}}>{row.val}</span>
            </div>
            <div style={{height:'28px',background:C.border,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${row.pct}%`,background:row.color,display:'flex',alignItems:'center',paddingLeft:'10px'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:i===0?C.paper:C.ink,opacity:0.8}}>{row.note}</span>
              </div>
            </div>
          </div>
        ))}
        <div style={{marginTop:'14px',display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{flex:1,height:'2px',background:C.border}}/>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'4px 14px',whiteSpace:'nowrap'}}>↓ 64% CHEAPER</div>
          <div style={{flex:1,height:'2px',background:C.border}}/>
        </div>
      </div>
      {/* KV strip */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'1px',background:C.border}}>
        {[
          {l:'Grid tariff',v:'$0.132/kWh',vc:C.red},
          {l:'Solar LCOE',v:'$0.048/kWh',vc:C.positive},
          {l:'Annual saving (1 MWh)',v:'$84/MWh',vc:C.forest},
          {l:'C&I payback',v:'< 4 years',vc:C.forest},
        ].map((kv,i)=>(
          <div key={i} style={{background:C.ink,padding:'10px 14px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',marginBottom:'4px'}}>{kv.l}</div>
            <div style={{fontFamily:F.mono,fontSize:'15px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ═══ FIG 02 — OUTAGE COST BY SECTOR ══════════════════════════════════ */
const Fig02CropLoss=()=>{
  const maxVal=Math.max(...S.cropLoss.map(r=>r.cur));
  return(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="02" title="Annual Outage Cost by Sector — Current vs. BRIDGE Target" note="Sector-by-sector outage cost (US$M/year) vs. BRIDGE clean energy target. Bar widths normalised to the highest-cost sector. C&I solar directly eliminates the manufacturing and commercial segments. Source: BRIDGE Analysis; Ghana Energy Commission; World Bank Ghana 2024."/>
    <div className="fig-scroll">
      <div style={{minWidth:'520px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'160px 1fr 80px',background:C.forest}}>
          {['Sector','Annual Outage Cost — Current (red) vs. Target (lime)','$M saved'].map((h,i)=>(
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
                  <div style={{width:`${(row.cur/maxVal)*88}%`,height:'10px',background:C.red,flexShrink:0}}/>
                  <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.red,flexShrink:0}}>${row.cur}M</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:`${(row.tgt/maxVal)*88}%`,height:'10px',background:C.lime,flexShrink:0}}/>
                  <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.positive,flexShrink:0}}>${row.tgt}M</span>
                </div>
              </div>
            </div>
            <div style={{padding:'10px 12px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.amber}}>${row.cur-row.tgt}M</span>
            </div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'Total annual outage cost',v:'$320–924M',vc:C.red},{l:'BRIDGE target reduction',v:'∼90%',vc:C.positive},{l:'As % of GDP',v:'2–6% of GDP',vc:C.forest}].map((kv,i)=>(
            <div key={i} style={{background:C.ink,padding:'10px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',marginBottom:'4px'}}>{kv.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

/* ═══ FIG 03 — REGIONAL CAPITAL ALLOCATION ═════════════════════════════ */
const Fig03ZoneAllocation=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="03" title="Regional Energy Deployment Zones — Capital Allocation" note="BRIDGE portfolio allocation by energy deployment zone. Northern Savannah receives the highest weighting for off-grid and mini-grid deployment — 2M residents without grid access and Ghana's best solar irradiance. Source: BRIDGE Regional Analysis, 2026."/>
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
    <FigCaption num="04" title="2026 Energy Budget Allocations & BRIDGE Entry Points" note="2026 national budget allocations to clean energy and access programmes with BRIDGE partnership mode per line item. Total aligned capital: GH₵2.1B+. Source: Ghana Ministry of Finance, 2026 Budget Statement; SE4ALL Ghana."/>
    <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
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
);

/* ═══ FIG 05 — FARMER INCOME SHARE BY INTERVENTION LAYER ═══════════════ */
const Fig05Income=()=>{
  const layers=[
    {label:'Grid Only — No Clean Energy',sub:'No solar, no backup, full outage exposure',pct:1,color:'rgba(168,32,13,0.75)',bg:C.paper},
    {label:'+ C&I Solar Installation',sub:'Eliminates manufacturing & commercial outage losses',pct:3,color:C.amber,bg:C.paperDark},
    {label:'+ Clean Cooking Distribution',sub:'Reaches 60% of households on polluting fuels',pct:5,color:C.limeDark,bg:C.paper},
    {label:'+ Community Mini-Grids',sub:'Extends access to 2M off-grid Ghanaians',pct:7.5,color:C.limeDark,bg:C.paperDark},
    {label:'+ Energy Efficiency Services',sub:'Full BRIDGE portfolio — maximum deployment',pct:10,color:C.positive,bg:C.paper},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="05" title="Ghana Renewable Energy Share — BRIDGE Deployment Pathway" note="Non-hydro renewable share by deployment layer. BRIDGE's distributed portfolio contributes C&I solar, mini-grids, and clean cooking — the pathway to Ghana's 10% target. Source: BRIDGE Analysis; Ghana Energy Commission; SE4ALL programme data."/>
      <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
        {layers.map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'220px 1fr 48px',borderBottom:i<4?`1px solid ${C.border}`:'none',background:row.bg,alignItems:'center'}}>
            <div style={{padding:'10px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,lineHeight:1.3}}>{row.label}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic',marginTop:'2px'}}>{row.sub}</div>
            </div>
            <div style={{padding:'10px 14px',borderLeft:`1px solid ${C.border}`}}>
              <div style={{height:'12px',background:C.border,borderRadius:'2px',overflow:'hidden',marginBottom:'4px'}}>
                <div style={{height:'100%',width:`${row.pct*10}%`,background:row.color,transition:'width 0.3s'}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>0%</span>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>5%</span>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>10%</span>
              </div>
            </div>
            <div style={{padding:'8px 10px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:row.color,display:'block'}}>{row.pct}%</span>
            </div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'Ghana baseline (2024)',v:'0.8%',vc:C.red},{l:'BRIDGE 2030 target',v:'10%',vc:C.positive},{l:'Uplift from portfolio',v:'+9.2pp',vc:C.lime}].map((kv,i)=>(
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
    {n:'C&I Solar',x:310,y:95,r:14,tier:1},{n:'Clean Cooking',x:340,y:148,r:12,tier:1},
    {n:'Technician Acad.',x:148,y:178,r:8,tier:1},{n:'Energy Efficiency',x:170,y:145,r:9,tier:1},
    {n:'Equipment Dist.',x:155,y:198,r:10,tier:1},{n:'Mini-Grid Dev.',x:360,y:170,r:11,tier:1},
    {n:'Residential Solar',x:345,y:135,r:10,tier:2},{n:'Biogas Systems',x:355,y:165,r:9,tier:2},
    {n:'Mini-Grid Ops.',x:368,y:150,r:9,tier:2},{n:'Battery Storage',x:385,y:118,r:8,tier:3},
    {n:'Utility-Scale',x:568,y:108,r:14,tier:3},
  ];
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  const tierTx={1:C.ink,2:C.white,3:C.paper};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="06" title="Venture Portfolio Matrix — Risk vs. Return" note="Risk vs. return matrix for 11 of 14 energy ventures (those with numeric IRR). Bubble size represents capital required. Tier 1 ventures cluster in the low/medium-risk, strong-return quadrant. Source: BRIDGE Venture Analysis, 2026."/>
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
      <FigCaption num="07" title="Energy Portfolio — Deployment Roadmap" note="Portfolio deployment roadmap. Phase 1 (2026) is the critical window — C&I solar, clean cooking, and mini-grid licensing applications are all time-sensitive first-mover positions. Source: BRIDGE Operations Planning, 2026."/>
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
  const maxPct=Math.max(...S.benchmarks.map(r=>r.pct));
  const pctColors={'red':C.red,'lime':C.lime,false:C.muted};
  const txColors={'red':C.red,'lime':C.positive,false:C.muted};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="08" title="International Renewable Energy Share — Ghana vs. Peer Countries" note="Non-hydro renewable energy share by country. Ghana's 0.8% baseline is far below its own 10% target and regional peers. BRIDGE's distributed portfolio targets the minimum national goal as a floor. Source: BRIDGE Research; IRENA; Ghana Energy Commission; SE4ALL Global Tracking Framework 2025."/>
      <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{background:C.forest,padding:'8px 14px',display:'grid',gridTemplateColumns:'200px 1fr 60px'}}>
          {['Country / Scenario','Non-Hydro Renewable Share — bars scaled to highest value','Share'].map((h,i)=>(
            <div key={i} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none',paddingLeft:i>0?'12px':'0'}}>{h}</div>
          ))}
        </div>
        {S.benchmarks.map((row,i)=>{
          const col=pctColors[row.highlight]||C.muted;
          const isGhana=row.highlight==='red'||row.highlight==='lime';
          return(
            <div key={i} style={{display:'grid',gridTemplateColumns:'200px 1fr 60px',borderBottom:i<S.benchmarks.length-1?`1px solid ${C.border}`:'none',background:isGhana?(row.highlight==='lime'?'rgba(26,107,47,0.06)':'rgba(168,32,13,0.04)'):i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
              <div style={{padding:'10px 14px'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:isGhana?700:600,color:isGhana?C.ink:C.muted,lineHeight:1.3}}>{row.country}</div>
                <div style={{fontFamily:F.body,fontSize:'9px',fontStyle:'italic',color:C.faint,marginTop:'2px',lineHeight:1.4}}>{row.note}</div>
              </div>
              <div style={{padding:'10px 14px',borderLeft:`1px solid ${C.border}`}}>
                <div style={{height:'18px',background:C.border,overflow:'hidden',marginBottom:'3px',position:'relative'}}>
                  <div style={{height:'100%',width:`${(row.pct/maxPct)*100}%`,background:col,opacity:isGhana?1:0.6}}/>
                  {row.pct<2&&<div style={{position:'absolute',left:'2px',top:'50%',transform:'translateY(-50%)',fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.red}}>0.8%</div>}
                </div>
              </div>
              <div style={{padding:'10px 12px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.mono,fontSize:'15px',fontWeight:700,color:col}}>{row.pct}%</span>
              </div>
            </div>
          );
        })}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'Ghana baseline (2024)',v:'0.8%',vc:C.red},{l:'BRIDGE 2030 target',v:'10%',vc:C.positive},{l:'Regional peers median',v:'~32%',vc:C.forest}].map((kv,i)=>(
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

/* ═══ FIG 09 — CAPITAL LEVERAGE STACK ══════════════════════════════════ */
const Fig09CapitalStack=()=>{
  const layers=[
    {label:'SE4ALL DFI Capital',sub:'Power Africa / IFC / AfDB',pct:65,ghc:'~US$98M',note:'Grant and concessional capital activated by BRIDGE private equity anchor',color:C.forest,tx:C.lime},
    {label:'BRIDGE Capital',sub:'Private equity anchor',pct:20,ghc:'~US$20M',note:'20% private equity — BRIDGE operational anchor unlocking DFI capital stack',color:C.lime,tx:C.ink},
    {label:'Ghana Gov / GIIF',sub:'Local currency co-investment',pct:15,ghc:'GH₵ denom.',note:'National energy access mandate capital — GH₵ denominated, reduces FX risk',color:C.amber,tx:C.white},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="09" title="BRIDGE Capital Leverage Stack — SE4ALL Blended Finance" note="How BRIDGE's private equity anchor role creates 1:4.8× capital leverage in SE4ALL blended finance structures. For every $1 of BRIDGE capital deployed, $4.80 in total project capital is activated. Source: SE4ALL Ghana Framework; BRIDGE Financial Modelling 2026."/>
      <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
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
  );
};


/* ═══ SECTION REGISTRY ═══════════════════════════════════════════ */
const SECS=[
  {id:'sec-exec',    label:'Executive Summary'},
  {id:'sec-subs',    label:'Sub-Sectors'},
  {id:'sec-problem', label:'The Energy Paradox'},
  {id:'sec-crops',   label:'Outage Economics'},
  {id:'sec-zones',   label:'Regional Strategy'},
  {id:'sec-market',  label:'Competitive Landscape'},
  {id:'sec-policy',  label:'Policy Window'},
  {id:'sec-income',  label:'Energy Access Impact'},
  {id:'sec-ventures',label:'Venture Portfolio'},
  {id:'sec-roadmap', label:'Deployment Roadmap'},
  {id:'sec-synergy', label:'System Integration'},
  {id:'sec-coinvest',label:'Co-Investment'},
  {id:'sec-risk',    label:'Risk & Thesis'},
  {id:'upsell',      label:'Next Steps'},
];

/* ═══ READING PROGRESS BAR v4 ═════════════════════════════════ */
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
        {/* v4: spring easing logo reveal */}
        <div style={{overflow:'hidden',maxWidth:logoVisible?'180px':'0',opacity:logoVisible?1:0,transition:'max-width 0.38s cubic-bezier(0.16,1,0.3,1),opacity 0.3s ease',display:'flex',alignItems:'center',flexShrink:0}}>
          <Logo height={19} variant="dark"/>
          <div style={{width:'1px',height:'15px',background:C.border,margin:'0 12px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Sector Brief · Energy &amp; Renewable Resources · Core Tier · March 2026</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>10 · Energy</span>
        {/* v4: reading % after 5% scroll */}
        {pct>5&&<span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,marginLeft:'4px',flexShrink:0}}>{pctRounded}%</span>}
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center',flexShrink:0}}>
        <a href="#" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none',letterSpacing:'0.2px'}}>All Sectors →</a>
        {/* v4: cta-primary hover lift */}
        <a href="#upsell" className="cta-primary" style={{background:C.forest,color:C.lime,padding:'7px 16px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.5px'}}>Full Package →</a>
      </div>
    </div>
  );
};

/* ═══ SECTION FOOTER NAV v4 ════════════════════════════════════ */
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
  // v4: extracted button style
  const BtnStyle=(disabled,isNext)=>({
    width:'38px',height:'38px',
    background:disabled?'rgba(255,255,255,0.03)':(isNext?C.forest:'rgba(255,255,255,0.07)'),
    border:`1px solid ${disabled?'rgba(255,255,255,0.08)':(isNext?'rgba(184,217,53,0.25)':'rgba(255,255,255,0.14)')}`,
    cursor:disabled?'default':'pointer',display:'flex',alignItems:'center',justifyContent:'center',
    flexShrink:0,opacity:disabled?0.28:1,transition:'background 0.15s,transform 0.12s',
  });
  return(
    <div className="np" style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,background:'rgba(10,20,12,0.97)',borderTop:`1px solid rgba(184,217,53,0.12)`,backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'9px 18px',gap:'10px'}}>
      <button onClick={()=>goTo(active-1)} disabled={active===0} style={BtnStyle(active===0,false)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active===0?'rgba(255,255,255,0.2)':C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',minWidth:0,overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',gap:'7px',maxWidth:'100%',overflow:'hidden'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px',flexShrink:0}}>§{String(active+1).padStart(2,'0')}</span>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.45)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{SECS[active]?.label}</span>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,0.18)',flexShrink:0}}>/ {SECS.length}</span>
        </div>
        {/* v4: past dots show progress trail */}
        <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
          {SECS.map((_,i)=>(
            <div key={i} onClick={()=>goTo(i)} style={{
              width:i===active?'24px':'6px',height:'6px',borderRadius:'3px',
              background:i===active?C.lime:i<active?'rgba(184,217,53,0.3)':'rgba(255,255,255,0.15)',
              cursor:'pointer',transition:'width 0.3s cubic-bezier(0.16,1,0.3,1),background 0.2s',flexShrink:0,
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

/* ═══ CAROUSEL v4 ═══════════════════════════════════════════════════════ */
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

/* ═══ SECTION HEADER v4 (mobile accordion trigger) ══════════════════════ */
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

/* ═══ MOBILE EXPAND/COLLAPSE ALL BAR v4 ═════════════════════════════════ */
const MobExpandBar=({allOpen,onToggle})=>(
  <div className="mob-expand-all" style={{display:'none',background:C.ink,borderBottom:`1px solid rgba(184,217,53,0.12)`,padding:'10px 18px',alignItems:'center',justifyContent:'space-between',gap:'10px'}}>
    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
      <div style={{width:'5px',height:'5px',borderRadius:'50%',background:allOpen?C.lime:'rgba(255,255,255,0.2)',transition:'background 0.2s'}}/>
      <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(255,255,255,0.35)',letterSpacing:'0.5px'}}>{allOpen?'All sections open':'All sections collapsed'}</span>
    </div>
    <button onClick={onToggle} style={{background:'transparent',border:`1px solid rgba(184,217,53,0.3)`,padding:'6px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.lime,cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
      {allOpen?'Collapse All ↑':'Expand All ↓'}
    </button>
  </div>
);

/* ═══ COVER v4 ══════════════════════════════════════════════════════════ */
const Cover=({logoRef})=>(
  <div>
    <div className="pad-cover" style={{background:C.ink,padding:'28px 64px 0',position:'relative',overflow:'hidden'}}>
      {/* v4: ghost watermark */}
      <div style={{position:'absolute',right:'32px',top:'-8px',fontFamily:F.display,fontSize:'clamp(100px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.022)',lineHeight:1,userSelect:'none',pointerEvents:'none',letterSpacing:'-6px'}}>10</div>
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
          <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:800,padding:'5px 12px',letterSpacing:'1.5px'}}>SECTOR 10 OF 12</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.07)'}}/>
        </div>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(36px,6vw,78px)',fontWeight:900,color:C.paper,lineHeight:0.95,letterSpacing:'-2.5px',marginBottom:'8px'}}>Energy &amp;</h1>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,4vw,52px)',fontWeight:700,color:'rgba(250,248,243,0.38)',lineHeight:1,letterSpacing:'-1.5px',marginBottom:'20px'}}>Renewable Resources</h2>
        <p style={{fontFamily:F.body,fontSize:'clamp(13px,1.6vw,16px)',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.7,maxWidth:'560px',marginBottom:'0'}}>{S.tagline}</p>
        <div className="cover-stats stats-row" style={{display:'flex',gap:'0',borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'28px',flexWrap:'wrap'}}>
          {/* Score box — lime-tinted bg, animated bar */}
          <div style={{background:'rgba(184,217,53,0.07)',padding:'20px 24px',minWidth:'170px',borderRight:'1px solid rgba(255,255,255,0.06)',flex:'0 0 170px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'10px'}}>BRIDGE Impact Score™</div>
            <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'10px'}}>
              <span style={{fontFamily:F.mono,fontSize:'52px',fontWeight:400,color:C.lime,lineHeight:1}}>{S.score}</span>
              <span style={{fontFamily:F.mono,fontSize:'13px',color:'rgba(184,217,53,0.4)'}}>/100</span>
            </div>
            <div style={{height:'3px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',marginBottom:'7px',overflow:'hidden'}}>
              <div className="score-bar" style={{'--w':`${S.score}%`,height:'100%',width:`${S.score}%`,background:C.lime,borderRadius:'2px'}}/>
            </div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>{S.tier} Tier</div>
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
        <SecHdr num="00" label="Executive Summary" badge={`Score ${S.score}`} hint="$924M annual outage cost · 0.8% renewable share vs 10% target · 14-venture distributed energy portfolio" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
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
                <div style={{height:'4px',background:C.border,borderRadius:'2px',overflow:'hidden',marginBottom:'4px'}}>
                  <div className="score-bar-dim" style={{'--w':`${dim.s}%`,height:'100%',width:`${dim.s}%`,background:dim.s>=85?C.lime:dim.s>=75?C.limeDark:C.amber,borderRadius:'2px'}}/>
                </div>
                <div style={{marginTop:'2px',fontFamily:F.mono,fontSize:'9px',color:C.faint,letterSpacing:'0.5px'}}>Weight: {dim.w}</div>
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
        <SecHdr num="§" label="Sub-Sector Landscape" badge="6 sub-sectors" hint="C&I solar, clean cooking, mini-grids, efficiency — scored by BRIDGE Impact Score™ methodology" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Sub-Sector Landscape</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 sub-sectors assessed</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Six Entry Points Across the Energy Transition</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Each sub-sector scored on market opportunity, implementation feasibility, development impact, and financial sustainability. The distributed energy transition has six commercially viable entry points — all available now.</p>
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
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-problem" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="01" label="The Energy Paradox" badge="89% Electrified" hint="89% electrified yet $924M lost to outages · 6 compounding constraints · 0.8% renewable share" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 01 — The Energy Paradox</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>5,507 MW installed · 0.8% non-hydro renewable · 89% electrification rate</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>The Energy Paradox</h2>
        <Fig01ValueChain/>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px',marginBottom:'28px'}} className="tc">
          <div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana's electricity story has two chapters. The first is an achievement: 89% national electrification, 5,507 MW of installed generation capacity, and a grid reaching most corners of the country. By infrastructure reach, Ghana has succeeded. The second chapter is a structural failure — and it is the one BRIDGE addresses.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>66% of that capacity runs on thermal generation at costs that have risen 352% over sixteen years. Industrial electricity costs $0.132/kWh — 2–3× what manufacturers in Ethiopia, Kenya, or Senegal pay. And when the grid fails, the economic cost runs to $320–924 million per year. Meanwhile, solar now costs $0.048/kWh. The economics of the transition have arrived. The infrastructure to deliver it has not.</p>
            <div style={{background:C.forest,padding:'16px 20px',marginTop:'8px'}}>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.7}}>SMEs represent the segment most acutely damaged by power unreliability. They cannot afford industrial backup generators that large enterprises deploy — so every outage is an unhedged loss. Clean energy access is not an environmental programme. It is a direct intervention in the economic competitiveness of Ghana's private sector.</p>
              <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>The SME Energy Crisis</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',alignContent:'start'}}>
            {[{v:'89%',l:'National\nelectrification rate'},{v:'$924M',l:'Annual\noutage cost'},{v:'0.8%',l:'Non-hydro\nrenewable share'},{v:'6,500',l:'Deaths/yr\nindoor air pollution'}].map((s,i)=>(
              <div key={i} style={{background:C.ink,padding:'14px 12px',textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'clamp(16px,2.2vw,24px)',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'5px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',whiteSpace:'pre-line',lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>The Energy System Constraint Stack</div>
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
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>Ghana built a grid that reaches 89% of the country. The failure is not access — it is affordability, reliability, and the absence of clean alternatives. Solar has solved the economics. BRIDGE solves the deployment. — BRIDGE Energy Sector Analysis, 2026</div>
        {/* Cooperative Network Distribution — Members Exclusive */}
        <div style={{marginTop:'28px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · Installer Network Analysis</div>
              <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Ghana's Solar Installation Workforce — Readiness Breakdown</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'24px',color:C.lime}}>8,000+</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'1px',textTransform:'uppercase'}}>electrical workers</div></div>
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
            <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.6,margin:0}}>BRIDGE's Solar Technician Training Academy targets Tier 2 — scaling the certified installer workforce from 200 to 2,000+ over four years. The 8,000+ informal electrical workers represent the long-term upskilling pipeline: today's informal workforce becomes the certified foundation of Ghana's distributed solar sector.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ CROP ANALYSIS ══════════════════════════════════════════════════════ */
const OutageEconomics=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-crops" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="02" label="Outage Economics" badge="$924M/yr" hint="Sector-by-sector outage cost · energy policy timeline · market sizing by clean energy category" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div className="sec-rule mob-hide"/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 02 — Outage Economics</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Sector-by-Sector Outage Economics</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Each sector bears the outage cost differently — manufacturing through spoiled product runs, SMEs through forced closure, health facilities through clinical failures. Understanding the breakdown is essential to sequencing BRIDGE's clean energy deployment and quantifying the returns available from eliminating each cost category.</p>
      <Fig02CropLoss/>
      {/* Energy Policy Intelligence Callout */}
      <div style={{border:`2px solid ${C.amber}`,overflow:'hidden',marginBottom:'20px'}}>
        <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.amber,marginBottom:'3px'}}>◆ Members Intelligence · Energy Policy Timeline</div>
            <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Ghana Energy Policy — Timeline &amp; BRIDGE Entry Points</div>
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
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6,margin:0}}>The SE4ALL mini-grid licensing window creates a first-mover advantage for community energy access. Operators who file Energy Commission applications in Q2–Q3 2026 are positioned ahead of the broader pipeline. BRIDGE's Community Mini-Grid Development venture is structured to file at the window opening — not as regulatory compliance, but as a competitive positioning decision.</p>
        </div>
      </div>
      {/* Market Sizing */}
      <div style={{marginBottom:'20px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{background:C.forest,padding:'8px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>◆ Members Intelligence · Clean Energy Market Sizing</div>
          <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>Total Addressable Market · BRIDGE Accessible Share · Growth Rate</div>
        </div>
        {/* Mobile carousel */}
        <Carousel items={S.marketSizes} cardClass="mob-snap-card" renderCard={(row,i)=>{
          const priColor={IMMEDIATE:C.red,HIGH:C.amber,MEDIUM:C.muted};
          const pc=priColor[row.priority]||C.muted;
          return(
            <div style={{background:C.paper,padding:'14px',border:`1px solid ${C.border}`,height:'100%'}}>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink,marginBottom:'4px'}}>{row.crop}</div>
              <div style={{display:'flex',gap:'6px',marginBottom:'10px',alignItems:'center'}}>
                <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:800,color:pc,border:`1px solid ${pc}`,padding:'1px 6px'}}>{row.priority}</span>
                <span style={{fontFamily:F.sans,fontSize:'8px',color:C.faint}}>Phase {row.phase}</span>
              </div>
              <div style={{fontFamily:F.mono,fontSize:'16px',fontWeight:700,color:C.forest,marginBottom:'2px'}}>{row.tam}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',marginBottom:'10px'}}>{row.note}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',borderTop:`1px solid ${C.border}`,paddingTop:'10px'}}>
                <div><div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.faint,letterSpacing:'1px',textTransform:'uppercase',marginBottom:'2px'}}>Accessible</div><div style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:C.teal}}>{row.accessible}</div></div>
                <div><div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.faint,letterSpacing:'1px',textTransform:'uppercase',marginBottom:'2px'}}>Growth</div><div style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:C.positive}}>{row.growth}</div></div>
              </div>
            </div>
          );
        }}/>
        {/* Desktop table */}
        <div className="desk-only">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 70px 70px 80px',background:C.ink}}>
          {['Market Segment','Total Addressable','Context','Accessible','Growth','Phase'].map((h,i)=>(
            <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',borderLeft:i>0?'1px solid rgba(255,255,255,0.06)':'none'}}>{h}</div>
          ))}
        </div>
        {S.marketSizes.map((row,i)=>{
          const priColor={IMMEDIATE:C.red,HIGH:C.amber,MEDIUM:C.muted};
          const pc=priColor[row.priority]||C.muted;
          return(
            <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 70px 70px 80px',borderBottom:i<S.marketSizes.length-1?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
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
        </div>
        <div style={{padding:'8px 14px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
          <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>TAM = Total Addressable Market (Ghana/regional). Accessible = BRIDGE-estimated market share achievable within 5 years. Source: Ghana Energy Commission; IRENA; Power Africa; BRIDGE Sector Analysis 2026.</span>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginTop:'4px'}} className="tc">
        {[
          {title:'The Grid Tariff Crossover',body:'Solar LCOE at $0.048/kWh has permanently crossed below Ghana\'s grid tariff of $0.132/kWh. A commercial solar installation pays back in under four years with no subsidy, no policy risk, and 25-year guaranteed pricing against a grid tariff that has risen 352% over sixteen years. This is the economic reality BRIDGE\'s C&I Solar Installation Company converts into deployment at scale.'},
          {title:'Clean Cooking — A Commercial Solution',body:'6,500 Ghanaians die annually from indoor air pollution. 60% of households cook on charcoal or firewood regardless of grid connection. BRIDGE\'s Clean Cooking Distribution Network is not an NGO programme: it is a commercially structured distribution business with subsidised first-cylinder adoption and credit-linked monthly refill subscriptions that make clean cooking affordable — not just physically available.'},
          {title:'The Technician Bottleneck',body:'Ghana\'s solar transition is constrained more by certified installers than by capital or equipment. An estimated 200+ TVET-certified solar technicians serve a market that could absorb 2,000+. Every uncertified installation is a quality and safety risk. The Solar Technician Training Academy addresses the critical path constraint directly — 500+ graduates per year, GRIDCO-endorsed, BRIDGE-placed.'},
          {title:'Mini-Grids — First-Mover Window',body:'2 million Ghanaians in 170+ Volta Lake communities have no grid access — and grid extension is not planned within any realistic horizon. The SE4ALL framework has streamlined mini-grid licensing. Operators who file Energy Commission applications in Q2–Q3 2026 hold community concessions that later entrants cannot obtain. This is the definition of a first-mover window.'},
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
        <SecHdr num="03" label="Regional Strategy" badge="4 zones" hint="Northern Savannah 35% · zone-by-zone solar resource · capital allocation and deployment priorities" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 03 — Regional Strategy</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>4 zones · 4 strategies</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Four Zones, Four Solar Strategies</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana's solar resource is uniformly excellent — but energy demand profiles, off-grid populations, and infrastructure gaps differ by region. BRIDGE's capital allocation reflects where clean energy deployment creates the greatest economic and social return.</p>
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
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>Solar Resource</div>
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
            {['Zone','Solar Resource','Alloc.','BRIDGE Interventions','Context'].map((h,i)=><div key={i} style={{padding:'8px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.08)':'none'}}>{h}</div>)}
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
        <SecHdr num="04" label="Competitive Landscape" badge="40+ energy cos" hint="6 key players profiled · BRIDGE positioning vs BBOXX, Husk, GRIDCO and more" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 04 — Competitive Landscape</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Is Already in the Field</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'16px',fontStyle:'italic'}}>Ghana's clean energy sector attracted over $180 million in investment across 40+ operators in 2024. BRIDGE's strategy is to identify gaps these companies cannot fill — physical installation at scale, last-mile distribution, and community ownership structures — and operate at those layers.</p>
        <div style={{background:C.forest,padding:'14px 20px',marginBottom:'20px'}}>
          <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.65}}>Technology companies solve equipment financing and monitoring. Development partners fund feasibility studies. Neither builds the installation business, trains the workforce, or operates the distribution routes that Ghana's clean energy transition actually requires. <strong style={{color:C.lime}}>BRIDGE operates at the deployment layer that technology companies cannot and development agencies will not.</strong></p>
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
        <div className="desk-only" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}} id="comp-grid">
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
        <SecHdr num="05" label="Policy Window" badge="★★★★★" hint="SE4ALL framework · mini-grid licensing window · 1:4.8× leverage · Q2 2026 entry · GH₵2.1B+ aligned" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 05 — Policy Window</div>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.sans,fontSize:'9px',fontWeight:800,padding:'3px 10px',letterSpacing:'1px'}}>★★★★★ BUDGET ALIGNMENT</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The 2026 Budget Alignment</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana's SE4ALL national framework, mini-grid licensing reform, and 2026 budget's clean energy line items create the clearest policy alignment window in a decade. The distributed energy transition has government backing — what it lacks is organised private sector capital and operational execution.</p>
        <Fig04Budget/>
        <div style={{border:`2px solid ${C.lime}`,overflow:'hidden',marginTop:'4px'}}>
          <div style={{background:C.ink,padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px'}}>Time-Sensitive — Q2 2026 Deadline</div>
              <div style={{fontFamily:F.display,fontSize:'clamp(14px,2vw,20px)',fontWeight:700,color:C.paper}}>SE4ALL Ghana — Key Policy Instruments</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'28px',fontWeight:500,color:C.lime,lineHeight:1}}>1:4.8×</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.3)',letterSpacing:'1px',textTransform:'uppercase'}}>leverage ratio</div></div>
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>SE4ALL — 10% Renewable by 2030</div>
          <p style={{fontFamily:F.body,fontSize:'13px',color:C.muted,lineHeight:1.65,fontStyle:'italic'}}>Ghana's SE4ALL framework commits to 10% non-hydro renewable share by 2030 — from a 0.8% baseline. The distributed transition BRIDGE deploys does not require the utility debt to be resolved. C&I solar, clean cooking, and mini-grids are all commercially viable on their own economics — the national target validates and amplifies them at no additional cost to BRIDGE's capital structure.</p>
        </div>
        <Fig09CapitalStack/>
      </div>
    </div>
    </div>
  );
};

/* ═══ FARMER INCOME ══════════════════════════════════════════════════════ */
const EnergyAccess=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-income" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="06" label="Energy Access Impact" badge="0.8% → 10%" hint="Layer-by-layer clean energy deployment model · international benchmarks · pathway to 10% RE target" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div className="sec-rule mob-hide"/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 06 — Energy Access Impact</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The Distributed Energy Transition</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Each BRIDGE deployment layer stacks — C&I solar establishes the installation base, clean cooking reaches households, mini-grids extend access to the off-grid 11%. This is not incremental. It is a distributed pathway to Ghana's 10% renewable energy target that utility-scale procurement alone cannot achieve.</p>
      <Fig05Income/>
      <Fig08Benchmarks/>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'32px'}} className="tc">
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'20px'}}>
          <p style={{fontFamily:F.display,fontSize:'17px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"When a Ghanaian manufacturer cuts their energy cost by 64% and eliminates outage losses, that is not just a better IRR on a BRIDGE venture. That is a competitive factory, a retained workforce, a community whose economy does not stall every time the grid fails."</p>
          <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE PBC Energy Sector Investment Thesis</div>
        </div>
        <div style={{background:C.ink,padding:'18px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Data Sources</div>
          {[{l:'Grid tariff baseline',v:'PURC / Energy Commission'},{l:'Solar LCOE benchmark',v:'IRENA Africa RE 2025'},{l:'Outage cost estimate',v:'World Bank Ghana 2024'},{l:'RE target framework',v:'SE4ALL Ghana programme'},{l:'Off-grid population',v:'2M in 170+ communities'}].map((row,i)=>(
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
    <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden'}}>
      <div style={{background:C.forest,padding:'8px 12px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>{v.name}</span>
        <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.lime}}>{v.num}</span>
      </div>
      <div style={{padding:'10px 12px'}}>
        <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',lineHeight:1.4,marginBottom:'10px'}}>{v.desc.slice(0,120)}…</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
          <span style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:C.forest}}>{v.capital}</span>
          <span style={{fontFamily:F.mono,fontSize:'11px',color:C.positive}}>{v.irr}</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,padding:'2px 6px',background:MODE_BG[v.mode]||C.muted,color:MODE_TX[v.mode]||C.paper}}>{v.mode}</span>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[v.risk]||C.muted}}>{v.risk}</span>
            <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>{v.start}</span>
          </div>
        </div>
      </div>
    </div>
  );
  return(
    <div id="sec-ventures" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="07" label="Venture Portfolio" badge="14 ventures" hint="Tier 1: $8.25–14.5M · 11–24% IRR · C&I Solar, Clean Cooking, Technician Academy, Mini-Grids" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 07 — The Portfolio</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'5px 14px',letterSpacing:'1px'}}>14 ventures · $15–27M total</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>14 Ventures · 3 Tiers · $15–27M</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced by commercial viability and dependency — C&I solar first because the economics work without subsidy, clean cooking and cold storage second because they need no licence, mini-grids third because licensing lead time is required. Each tier builds the workforce and client relationships the next tier depends on.</p>
        <Fig06Matrix/>
        {/* Tier 1 */}
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 1</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Priority Implementation — 2026–2028</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$8.25–14.5M · 7 ventures</span>
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
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Scale Phase — 2028–2030</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$3–6M · 4 ventures</span>
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
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Long-Term / Conditional — 2030+</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$2.5–5M · 3 ventures</span>
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
        <SecHdr num="08" label="Deployment Roadmap" badge="3 phases" hint="Q1 2026 start · phase-by-phase milestones · critical path dependencies" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 08 — Implementation</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Deployment Roadmap</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced deployment built around commercial viability — C&I solar first because it needs no subsidy, clean cooking second because it needs no licence, mini-grids third because they need licensing lead time. Phase 1 is the critical window.</p>
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
            {[{m:'C&I Solar Launch',d:'EPC model operational + first 5 commercial clients under contract'},
              {m:'Clean Cooking Routes',d:'Ghana Cylinder Company partnership signed + community agents recruited'},
              {m:'Technician Academy',d:'TVET certification secured + GRIDCO partnership formalised'},
              {m:'Mini-Grid Licensing',d:'Energy Commission applications filed — Q2 2026 window open'}
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
        <SecHdr num="10" label="Co-Investment" badge="6 actors" hint="USAID, AfDB, GIZ, Injaro, Root Capital, AFC Ghana — capital types, alignment, and BRIDGE stack role" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 10 — Co-Investment Landscape</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 key actors profiled</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Else Is Investing — and Where BRIDGE Fits</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Ghana's energy transition attracts significant DFI and development partner capital — but most of it is grants and technical assistance that cannot convert to commercial deployment without a private sector anchor. BRIDGE occupies the equity operator role that closes the gap between donor intent and on-the-ground installation.</p>
        <div style={{background:C.paperDark,padding:'14px 20px',border:`1px solid ${C.border}`,marginBottom:'20px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>BRIDGE's Co-Investment Positioning</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}} className="tc">
            {[
              {l:'What DFIs provide',v:'Concessional capital, grants, technical assistance — but cannot operate ventures'},
              {l:'What off-grid cos provide',v:'Technology platforms and PAYG models — but lack EPC capability, community operations, and portfolio scale'},
              {l:'What BRIDGE provides',v:'Private equity anchor, venture operations, exit discipline, and portfolio management'},
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
        <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
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
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>BRIDGE's blended finance architecture is designed to complement these actors, not compete with them. The correct co-investment sequence: BRIDGE equity anchor → Power Africa/IFC concessional layer → SE4ALL government co-financing → community cooperative participation. This stacking structure maximises leverage and aligns every stakeholder's incentive with Ghana's distributed energy transition.</div>
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
        <SecHdr num="09" label="System Integration" badge="8 sector links" hint="Energy links Agriculture, Manufacturing, Health, Education, Finance and 3 more sectors" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'24px',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Section 09 — System Integration</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.ink}}>Energy as Infrastructure</h2>
          </div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'6px 14px',letterSpacing:'1px',flexShrink:0}}>8 sector links</div>
        </div>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Energy is the foundational layer on which every other BRIDGE sector depends. A cold storage network requires solar power. A manufacturing investment requires reliable electricity. A health facility functions only with guaranteed power. When BRIDGE builds distributed energy infrastructure, it de-risks investment in agriculture, manufacturing, health, and education simultaneously.</p>
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
        <SecHdr num="11" label="Risk & Thesis" badge="6 risk categories" hint="Policy, utility debt, equipment quality, consumer credit, workforce, climate — 6 categories with mitigations" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 11 — Risk Analysis</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Risk &amp; Mitigation</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Energy investment carries real risks — BRIDGE's portfolio structure, commercial-first sequencing, and blended finance architecture are each designed to manage a specific risk category. The distributed thesis explicitly avoids the utility debt and PPA risks that constrain utility-scale investors.</p>
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
    {item:'Venture Financial Models',detail:'10-year P&L, IRR sensitivity tables, and working capital schedules for all 15 ventures.'},
    {item:'C&I Solar Site Pipeline',detail:'50-site feasibility assessments — target client profiles, EPC cost models, O&M contract structures, battery integration specs.'},
    {item:'Due Diligence Checklists',detail:'C&I solar site assessment, equipment supplier evaluation, community ownership structures, regulatory compliance per zone.'},
    {item:'Installer & Partner Directory',detail:'200+ verified solar installers, equipment suppliers, and community partners — contact data, certification status, regional coverage, financial readiness.'},
    {item:'Mini-Grid Application Guide',detail:'Filing templates, Energy Commission engagement protocol, community ownership structures — ready for Q2 2026 licensing window.'},
    {item:'Energy Commission Licensing Guide',detail:'Full mini-grid licensing requirements, technical specifications, application templates, and SE4ALL fast-track pathway.'},
    {item:'AgTech Competitive Intelligence',detail:'40+ companies assessed — technology readiness, funding status, BRIDGE partnership potential.'},
    {item:'ESCO Contract Templates',detail:'Shared-savings verification protocols, audit methodology, client contract templates, and 30-site commercial pipeline.'},
    {item:'Energy Cost Simulation Tool',detail:'Outage cost elimination model by sector, zone, and BRIDGE intervention — built for C&I solar due diligence.'},
    {item:'Regional Deployment Maps',detail:'GIS-referenced site selection, logistics corridors, agro-industrial park data across 4 zones.'},
    {item:'Policy Monitoring — Live Access',detail:'Monthly tracking of SE4ALL programme, mini-grid licensing, PURC tariff reviews, and net metering regulation.'},
    {item:'Quarterly Intelligence Updates',detail:'New data and revised assessments across all 12 sectors every quarter.'},
  ];

  const partnershipPhases=[
    {phase:'01',title:'Mandate Alignment',dur:'2–3 hrs',desc:'BRIDGE maps your capital profile, priorities, and risk parameters against the 12-sector portfolio. Honest, direct, specific.'},
    {phase:'02',title:'Bespoke Intelligence Build',dur:'4–6 wks',desc:'Custom financial models, due diligence frameworks, and co-investment capital stack built for your mandate.'},
    {phase:'03',title:'Market Access',dur:'Ongoing',desc:'Direct Energy Commission and GRIDCO introductions, installer networks in your target zones, equipment suppliers, SE4ALL co-investment channels.'},
    {phase:'04',title:'Deal Origination',dur:'Rolling',desc:'Into opportunities before market-ready — at founder terms, with BRIDGE operational management. You bring capital. We bring Ghana.'},
  ];

  const intentCopy={
    package:{
      label:'Full Intelligence Package',
      sub:'Operational tools built for your process',
      cta:'Request Package Scope',
      href:'mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Energy Sector',
    },
    partnership:{
      label:'Partnership Engagement',
      sub:'BRIDGE at the table with you',
      cta:'Start the Conversation',
      href:'mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Energy',
    },
    briefing:{
      label:'30-Min Briefing',
      sub:'No commitment — we figure out fit first',
      cta:'Schedule Now →',
      href:'mailto:intelligence@bridgepbc.com?subject=Briefing Request — Energy Sector',
    },
  };

  return(
    <div id="upsell" style={{background:C.ink,position:'relative',overflow:'hidden'}}>

      {/* Ghost watermark */}
      <div style={{position:'absolute',right:'-20px',top:'40px',fontFamily:F.display,fontSize:'clamp(100px,20vw,280px)',fontWeight:900,color:'rgba(255,255,255,0.018)',pointerEvents:'none',userSelect:'none',letterSpacing:'-10px',lineHeight:1}}>10</div>

      {/* ── Membership bar ── */}
      <div style={{background:'rgba(184,217,53,0.06)',borderBottom:'1px solid rgba(184,217,53,0.1)',padding:'9px 64px'}} className="pad-topbar">
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{position:'relative',width:'8px',height:'8px',flexShrink:0}}><div style={{position:'absolute',inset:0,borderRadius:'50%',background:C.lime,opacity:0.3,animation:'barGrow 2s ease-in-out infinite'}}/><div style={{position:'absolute',inset:'1px',borderRadius:'50%',background:C.lime}}/></div>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>Members Access Active</span>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.2)'}}>· Sector 10 of 12 · Full edition included</span>
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
              {key:'package',label:'Full Package',sub:'Operational tools & models',icon:(
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              )},
              {key:'partnership',label:'Partnership',sub:'Work directly with BRIDGE',icon:(
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              )},
              {key:'briefing',label:'30-Min Briefing',sub:'No commitment, find fit first',icon:(
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              )},
            ].map((opt)=>{
              const active=intent===opt.key;
              return(
                <button key={opt.key} onClick={()=>setIntent(intent===opt.key?null:opt.key)}
                  style={{background:active?'rgba(184,217,53,0.1)':'rgba(255,255,255,0.03)',border:active?`1.5px solid ${C.lime}`:'1px solid rgba(255,255,255,0.1)',padding:'14px 16px',cursor:'pointer',textAlign:'left',transition:'all 0.2s',display:'flex',alignItems:'center',gap:'14px'}}>
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
                  <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.lime,marginBottom:'2px'}}>Full Intelligence Package — Energy Sector</div>
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
                <a href="mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Energy Sector"
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
                <a href="mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Energy"
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
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.65}}>Tell us your capital profile and energy focus. We'll map which of the 14 Energy ventures match your mandate — C&I solar, clean cooking, mini-grids, efficiency — and be direct if the fit isn't there. Takes 30 minutes. No pitch deck.</div>
              </div>
              <a href="mailto:intelligence@bridgepbc.com?subject=Briefing Request — Energy Sector"
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
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>SE4ALL Mini-Grid Licensing — Application Window Open</span>
              <span className="mob-hide" style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.35)',fontStyle:'italic'}}>Early movers secure positioning late entrants cannot replicate.</span>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:C.amber,flexShrink:0}}>1:4.8×</div>
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
          Sector 10 of 12 · Energy &amp; Renewable Resources<br/>
          <span className="mob-hide"> Full Members Edition · March 2026 · bridgepbc.com/intelligence</span>
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

export default function EnergyBrief(){
  const coverRef=useRef(null);
  const[forceOpen,setForceOpen]=useState(null);
  const[barAllOpen,setBarAllOpen]=useState(false);
  const toggleAll=()=>{
    const next=!barAllOpen;
    setBarAllOpen(next);
    setForceOpen(next);
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
      <OutageEconomics/>
      <RegionalStrategy/>
      <CompetitiveLandscape/>
      <PolicyWindow/>
      <EnergyAccess/>
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
