import { useState, useEffect, useRef } from "react";
import React from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BRIDGE SECTOR 12 — Transportation & Logistics
   Full Members Edition · March 2026 · Standalone Document
═══════════════════════════════════════════════════════════════════════════ */

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF',teal:'#2E5A4D'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};
const RISK_COLOR={LOW:C.positive,MEDIUM:C.amber,HIGH:C.red,'LOW-MED':C.amber};
const MODE_BG={'Direct Op':C.forest,'Partnership':C.amber,'Investment':C.teal,'Guidance':C.paperDark,'Network':C.ink};
const MODE_TX={'Direct Op':C.lime,'Partnership':C.white,'Investment':C.paper,'Guidance':C.muted,'Network':'rgba(250,248,243,0.6)'};

/* ═══ SECTOR DATA ════════════════════════════════════════════════════════ */
const S={
  num:'12',name:'Transportation & Logistics',tier:'Core',score:79,capital:'$8–16M',edition:'March 2026 Edition',
  tagline:'Ghana is 80% of the way to being West Africa\'s logistics hub. The missing 20% — cold chain, digital platforms, trained workforce — is BRIDGE\'s highest-leverage infrastructure investment.',
  stats:[{l:'All Freight by Road',v:'97%'},{l:'Annual Post-Harvest Loss',v:'$1.9B'},{l:'Tema Port Throughput',v:'26.5MT'},{l:'World Bank LPI Score',v:'2.4/5'}],
  scoreDims:[{d:'Market Opportunity',w:'30%',s:82},{d:'Development Impact',w:'30%',s:85},{d:'Implementation Feasibility',w:'25%',s:74},{d:'Financial Sustainability',w:'15%',s:70}],
  snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'79/100'},{l:'Priority',v:'Phase 1 deployment 2026'},{l:'Portfolio Range',v:'$8–16M'},{l:'Timeline',v:'2026–2030+'},{l:'Ventures Identified',v:'16'}],
  summary:'Ghana\'s transportation system is functional but fragile. 97% of all freight moves by road — a near-total dependence on a single mode that exposes every supply chain in Ghana\'s economy to the same single point of failure. The World Bank\'s 2022 Logistics Performance Index placed Ghana at 2.4 out of 5, below Kenya at 3.0 and the 3.2 threshold that signals genuine regional hub capability.',
  summary2:'The constraint is not roads. Ghana has the port, the geographic position, the road network, and the political stability. What it is missing is the cold chain, the digital platform layer, and the trained workforce that convert an adequate physical network into a high-performing logistics system. BRIDGE\'s portfolio builds the missing stack — starting with Cold Chain Ghana, which addresses a $1.9 billion annual post-harvest loss problem with a $900 million commercial revenue opportunity on the other side.',
  summary3:'The 2026 budget\'s Connect24 programme commits GH₵4.3 billion to transport infrastructure — BRIDGE\'s logistics ventures align directly. From the Load Matching Platform that eliminates 30–50% empty backhauls, to the Logistics Training Academy producing 500+ certified graduates annually, BRIDGE\'s 16-venture portfolio addresses every sub-dimension of Ghana\'s LPI gap with commercially self-sustaining interventions.',
  quote:'"Ghana does not need new roads to become West Africa\'s leading logistics country. It needs the cold chain, digital platforms, trained workforce, and fleet management infrastructure that converts an adequate physical network into a system reliable enough for high-value goods and time-sensitive supply chains."',

  subs:[
    {name:'Cold Chain Infrastructure',score:87,stage:'Series A Ready',capital:'$3–5M',note:'$900M revenue opportunity; solar-powered; $1.9B loss addressable'},
    {name:'Digital Logistics Platforms',score:84,stage:'Active',capital:'$2–4M',note:'Load matching, fleet management; network-effect economics'},
    {name:'Logistics Workforce Development',score:82,stage:'Seed–A',capital:'$1–2M',note:'Training bottleneck; 500+ graduates/yr; highest LPI sub-score impact'},
    {name:'Agricultural Transport & Collection',score:81,stage:'Seed–A',capital:'$1–2M',note:'Farm-to-market; integrates with BRIDGE agri-portfolio directly'},
    {name:'Cross-Border & Trade Facilitation',score:76,stage:'Seed–A',capital:'$1–2M',note:'AfCFTA corridors; 72% Tema transit traffic serves landlocked neighbours'},
    {name:'Port & Inland Logistics Services',score:68,stage:'Early',capital:'$1–2M',note:'Boankra ICD; warehousing; conditional on infrastructure milestones'},
  ],

  constraints:[
    {c:'No Cold Chain',harm:'40–50% of perishable output spoils before reaching market. Farmers sell at distress prices or lose entire harvests — $1.9B in annual losses concentrated in tomatoes, fruits, fish.'},
    {c:'Single-Mode Dependence',harm:'97% of freight on roads means every supply chain shares the same single point of failure. Flood, bridge failure, or fuel spike halts the entire economy\'s logistics.'},
    {c:'Operator Fragmentation',harm:'80% of trucking operators own fewer than 5 vehicles — below the threshold for technology, training, or maintenance investment. Individual operators cannot self-modernise.'},
    {c:'No Digital Visibility',harm:'Only 12% of vehicles carry telematics. 30–50% of journeys run empty on return routes. Operators lack the information infrastructure to fill trucks or optimise routes.'},
    {c:'Workforce Skills Gap',harm:'Only 22% of drivers hold formal training credentials; 8% of operators use any digital system. LPI logistics competence sub-score is Ghana\'s weakest dimension.'},
    {c:'Broken Pharmaceutical Cold Chain',harm:'25% vaccine spoilage rate from interrupted cold chains — a direct health system failure. Medical supply distribution relies on the same fragile general logistics infrastructure.'},
  ],

  cropLoss:[
    {crop:'Tomatoes',cur:50,tgt:12,note:'Highest priority — $570M annual loss; solar cold storage directly addressable'},
    {crop:'Fruits (Mango/Pineapple)',cur:45,tgt:12,note:'Export market exists; cold chain absence blocks premium access'},
    {crop:'Fish & Seafood',cur:35,tgt:10,note:'Coastal catch deteriorates without refrigerated transport'},
    {crop:'Vegetables',cur:42,tgt:15,note:'Peri-urban demand strong; last-mile cold delivery gap'},
    {crop:'Root Crops',cur:28,tgt:9,note:'Regional distribution gaps; storage quality inconsistent'},
    {crop:'Grain / Maize',cur:18,tgt:5,note:'Moisture and pest loss in transit; hermetic bag + cold chain combined'},
  ],

  zones:[
    {zone:'Accra–Tema Corridor',regions:'Greater Accra, Tema Port, Peri-urban zones',crops:'Port logistics, last-mile delivery, cold chain distribution',alloc:35,allocLabel:'32–38%',color:C.lime,interventions:'Last-Mile Platform; Cold Chain distribution hub; Warehousing near Tema; urban cold delivery fleet',context:'Highest transaction density; Tema handles 26.5MT and 1.35M TEU annually; 72% serves landlocked neighbours'},
    {zone:'Ashanti–Kumasi Hub',regions:'Ashanti, Bono, Bono East, Ahafo',crops:'Agricultural collection, processing logistics, regional distribution',alloc:28,allocLabel:'25–30%',color:C.amber,interventions:'Agricultural Collection Network; Fleet Management hub; Boankra ICD integration when commissioned',context:'Second-largest city; strategic midpoint between north and south; Boankra ICD 80%+ complete'},
    {zone:'Northern Corridors',regions:'Northern, Upper E/W, Savannah, N-East',crops:'Agricultural produce, livestock, shea, cross-border trade',alloc:22,allocLabel:'20–25%',color:C.teal,interventions:'Cold Chain Ghana aggregation hubs; Load Matching for empty backhauls; Cross-Border facilitation to Burkina Faso, Mali',context:'Highest post-harvest loss rates; 38% of Tema transit traffic destined for Burkina Faso via this corridor'},
    {zone:'Volta & Eastern Zones',regions:'Volta, Eastern, Oti regions',crops:'Cocoa, vegetables, fruits, coastal fish',alloc:15,allocLabel:'12–18%',color:C.muted,interventions:'Refrigerated collection; cooperative transport partnerships; cold storage nodes at district markets',context:'EUDR traceability logistics for cocoa; underserved by formal logistics operators'},
  ],

  competitors:[
    {type:'Freight Marketplace',name:'Kobo360',desc:'Pan-African digital freight platform operating in Ghana. Strong Accra-Kumasi corridor presence. Focuses on large shippers — leaves the 80% of small operators and informal sector without coverage.',pos:'BRIDGE Load Matching focuses on the fragmented small-operator segment Kobo360 underserves. Potential data-sharing integration for national routing optimisation.'},
    {type:'Cold Chain Ghana',name:'Thrive Agric / Agropal',desc:'Agri-logistics platforms with some cold chain elements. Limited solar-powered infrastructure for off-grid agricultural zones. Capital-constrained for national rollout.',pos:'BRIDGE Cold Chain Ghana deploys solar-powered storage at agricultural aggregation points — the off-grid model competitors have not yet executed at scale.'},
    {type:'Fleet Telematics',name:'Ctrack Ghana / Spireon',desc:'Telematics providers serving large fleet operators and corporates. Monthly subscription pricing suited to 50+ vehicle fleets — inaccessible to 3-truck operators who represent 80% of the market.',pos:'BRIDGE Fleet Management Services offers the same capability at $200/truck/year — specifically priced for the fragmented small-operator majority.'},
    {type:'Logistics Training',name:'GIMPA / KNUST Logistics',desc:'University-level logistics and supply chain management programmes. Long academic cycles (2–4 years), theoretical emphasis, not matched to immediate employer needs for practical operators.',pos:'BRIDGE Logistics Training Academy: 6–12 week practical programmes, employer co-designed, 500+ graduates/year directly placed in BRIDGE ventures and partner companies.'},
    {type:'Last-Mile Delivery',name:'Jumia Logistics / Courier-it',desc:'E-commerce last-mile platforms focused on urban formal-sector customers. Peri-urban and rural coverage absent. Pharmaceutical and cold delivery capabilities not offered.',pos:'BRIDGE Last-Mile Platform extends to rural zones, integrates pharmaceutical distribution, and operates cold-capable routes that urban courier platforms do not serve.'},
    {type:'Cross-Border Trade',name:'Ghana Shippers Authority',desc:'Government agency providing documentation and facilitation services. Bureaucratic timelines add 3–5 days to cross-border journeys. Private-sector platform layer absent.',pos:'BRIDGE Cross-Border Facilitation adds a private-sector platform on top of GSA infrastructure — digital documentation, tracking, and border coordination reducing transit time commercially.'},
  ],

  budgetItems:[
    {item:'Connect24 — Transport Infrastructure',ghc:'GH₵4.3B',usd:'~US$310M',pct:100,mode:'Logistics platform co-investment',urgency:'2026–2028 — Active deployment',featured:true},
    {item:'Agricultural Enclave Roads',ghc:'GH₵828M',usd:'~US$60M',pct:19,mode:'Last-mile logistics integration',urgency:'Budget year 2026',featured:false},
    {item:'Boankra Inland Container Depot',ghc:'GH₵500M+',usd:'~US$36M',pct:12,mode:'Port logistics services entry',urgency:'Commissioning imminent',featured:false},
    {item:'Ghana Railway Master Plan',ghc:'GH₵297B projected',usd:'US$21.5B',pct:95,mode:'Rail integration — Phase 3 conditional',urgency:'2030+ — conditioned',featured:false},
    {item:'AfCFTA Corridor Facilitation',ghc:'Multi-lateral',usd:'Regional',pct:72,mode:'Cross-border platform alignment',urgency:'Active — enforcement strengthening',featured:false},
  ],

  oilPalm:[
    {f:'Connect24 Window Size',t:'GH₵4.3B (~US$310M) — 2026 budget'},
    {f:'Tema Port Throughput',t:'26.5 million tonnes; 1.35M TEU (2023) — growing'},
    {f:'Transit Traffic Share',t:'72% of port transit serves Burkina Faso, Mali, Niger'},
    {f:'Empty Backhaul Rate',t:'30–50% of all truck journeys — directly addressable by Load Matching'},
    {f:'LPI Gap to Hub Threshold',t:'0.8 points (2.4 → 3.2 target) — each BRIDGE venture maps to a sub-dimension'},
    {f:'Cold Chain Revenue Potential',t:'$900M/year accessible on the other side of the $1.9B post-harvest loss'},
    {f:'First-Mover Advantage',t:'Platform network effects make early deployment position defensible'},
  ],

  ventures:[
    {tier:1,num:'①',name:'Cold Chain Ghana',desc:'Solar-powered cold storage network at agricultural aggregation points — 10 to 50 tonne capacity hubs at district market centres, combined with refrigerated transport linking farm collections to urban wholesale markets and export terminals. Solar power eliminates the grid dependency that caused previous cold storage programmes to fail. The anchor venture: the infrastructure on which BRIDGE\'s pharmaceutical cold chain, agricultural collection, and cold storage financing ventures all build.',mode:'Direct Op',capital:'$2–3M',irr:'14–18%',risk:'MEDIUM',payback:'5–7 yrs',start:'Q1 2026'},
    {tier:1,num:'②',name:'Logistics Training Academy',desc:'6–12 week practical programmes for drivers, fleet managers, warehouse supervisors, cold chain technicians, and customs brokers — co-designed with logistics employers who commit to graduate employment. 500+ certified graduates per year enter the fleet management platform, cold chain operations, and cross-border facilitation workforce. The skills bottleneck is Ghana\'s single largest barrier to LPI improvement; this is the direct intervention.',mode:'Partnership',capital:'$500K–1M',irr:'12–15%',risk:'LOW',payback:'4–5 yrs',start:'Q2 2026'},
    {tier:1,num:'③',name:'Fleet Management Services',desc:'Telematics, route optimisation, maintenance scheduling, driver performance monitoring, and fuel management — delivered as a monthly subscription service that makes modern logistics technology accessible to the 3-truck operator who cannot afford a bespoke system. 1,000+ enrolled vehicles in year one. Each enrolled operator becomes a node in the Load Matching network, making both platforms more valuable simultaneously.',mode:'Direct Op',capital:'$1–2M',irr:'15–19%',risk:'LOW',payback:'4–6 yrs',start:'Q2 2026'},
    {tier:1,num:'④',name:'Load Matching Platform',desc:'Digital marketplace connecting shippers with carriers — eliminating the 30–50% empty backhaul rate across Ghana\'s trucking network. Real-time cargo availability, route optimisation, mobile money payment integration, and carrier performance ratings that reward reliability. Prioritises the Ashanti–Brong Ahafo and Northern–Accra corridors where backhaul waste is highest. Network effects are strong: each new participant makes the platform more valuable for every existing one.',mode:'Direct Op',capital:'$500K–1M',irr:'20–25%',risk:'LOW',payback:'3–5 yrs',start:'Q2 2026'},
    {tier:1,num:'⑤',name:'Agricultural Collection Network',desc:'Scheduled collection services linking smallholder cooperative aggregation points to district markets, processing facilities, and Cold Chain Ghana hubs — replacing the informal, timing-uncertain system that forces farmers to accept distress prices or watch produce spoil. GPS-tracked vehicles, mobile app booking, guaranteed 48-hour collection windows. Integrates directly with BRIDGE\'s agriculture portfolio cooperatives as the transport arm of the value chain.',mode:'Direct Op',capital:'$1–2M',irr:'12–16%',risk:'MEDIUM',payback:'5–7 yrs',start:'Q3 2026'},
    {tier:1,num:'⑥',name:'Last-Mile Delivery Platform',desc:'Technology-enabled last-mile delivery for peri-urban and rural areas — serving e-commerce demand growth that existing courier infrastructure cannot reach. Motorcycle couriers for dense peri-urban zones; cargo bikes for rural; hub-and-spoke routing for cost efficiency. Revenue from e-commerce platforms, B2B contracts, and rural pharmaceutical distribution. The last mile is where logistics value either reaches the citizen or evaporates — BRIDGE completes the chain.',mode:'Direct Op',capital:'$1–2M',irr:'13–17%',risk:'MEDIUM',payback:'4–6 yrs',start:'Q3 2026'},
    {tier:2,num:'⑦',name:'Pharmaceutical Cold Chain',desc:'GDP-compliant temperature-controlled logistics for vaccines, blood products, and medicines — addressing the 25% vaccine spoilage rate from broken cold chains. Partners with the Ghana Health Service, NHIA, and pharmaceutical distributors. Phase 2 timing allows Cold Chain Ghana\'s solar storage infrastructure to establish the base that pharmaceutical-grade monitoring and compliance systems run on.',mode:'Partnership',capital:'$1–2M',irr:'11–14%',risk:'MEDIUM',payback:'5–7 yrs',start:'2028'},
    {tier:2,num:'⑧',name:'Vehicle Asset Financing',desc:'Structured financing for vehicle acquisition among operators whose growth is capital-constrained, not demand-constrained. Uses Fleet Management Services telematics data — vehicle utilisation, route consistency, fuel efficiency — as alternative credit scoring, replacing collateral requirements that exclude informal operators from bank finance. Phase 2 because the telematics data needed for credit scoring requires Phase 1 enrolment time to accumulate.',mode:'Partnership',capital:'$1–2M',irr:'12–15%',risk:'MEDIUM',payback:'5–7 yrs',start:'2028'},
    {tier:2,num:'⑨',name:'Warehousing Company',desc:'WMS-enabled warehousing near Tema Port and in Kumasi — filling the gap between port arrival and final delivery that currently relies on unmanaged open-air storage. Bonded warehouse licensing for import cargo; cross-docking for high-velocity SKUs. Revenue from storage fees, inventory management, and cross-docking. Conditioned on Load Matching Platform establishing the shipper network that fills warehouse capacity.',mode:'Direct Op',capital:'$1–2M',irr:'13–16%',risk:'MEDIUM',payback:'5–7 yrs',start:'2028'},
    {tier:2,num:'⑩',name:'Cross-Border Facilitation',desc:'Customs documentation, transit bond management, cargo tracking, and border crossing coordination for AfCFTA corridor trade with Burkina Faso, Mali, and Niger — currently adding 3–5 days to every cross-border journey. Ghana\'s 72% transit traffic share from landlocked neighbours makes cross-border efficiency a strategic revenue stream. Each day reduced in transit time attracts more landlocked trade through Tema.',mode:'Direct Op',capital:'$500K–1M',irr:'18–22%',risk:'LOW',payback:'3–5 yrs',start:'2028'},
    {tier:2,num:'⑪',name:'Cold Storage Financing',desc:'Equipment financing enabling private operators to build cold storage facilities — expanding the cold chain network beyond BRIDGE-owned assets. Lease-to-own structure with credit scoring based on Cold Chain Ghana\'s operational utilisation data. Phase 2 because market pricing and utilisation evidence from Phase 1 operations is needed to set commercially viable financing terms.',mode:'Partnership',capital:'$1–2M',irr:'10–14%',risk:'MEDIUM',payback:'5–7 yrs',start:'2029'},
    {tier:2,num:'⑫',name:'Operator Formalisation',desc:'Business registration, compliance support, and financial system access for informal transport operators — the formalisation pathway that connects them to Fleet Management, Vehicle Asset Financing, and the banking system. Partners with GRA, DVLA, and the Ghana Private Road Transport Union. Each formalised operator becomes a reachable node in the platform network and a potential financing customer.',mode:'Partnership',capital:'$300–500K',irr:'Capacity building',risk:'LOW',payback:'N/A',start:'2028'},
    {tier:2,num:'⑬',name:'Urban Mobility Solutions',desc:'Electric cargo bikes and hybrid solutions for commercial urban transport — reducing fuel cost and emissions for last-mile operators in Accra and Kumasi. Partners with metropolitan assemblies for route licensing. Conditioned on EV import tariff structures making electric vehicles cost-competitive — trending favourable under Ghana\'s current EV policy framework.',mode:'Partnership',capital:'$500K–1M',irr:'10–13%',risk:'MEDIUM',payback:'5–7 yrs',start:'2029'},
    {tier:3,num:'⑭',name:'Boankra Inland Port Services',desc:'Logistics services integrated with the Boankra Inland Container Depot — container handling, freight forwarding, customs clearing — designed to decongest Tema Port by handling Kumasi and Northern-region cargo inland. The depot is 80%+ complete but awaiting final commissioning. BRIDGE enters as private logistics operator when timeline is confirmed.',mode:'Partnership',capital:'$1–2M',irr:'12–16%',risk:'HIGH',payback:'6–8 yrs',start:'2030+'},
    {tier:3,num:'⑮',name:'Regional Logistics Hub',desc:'A comprehensive logistics hub serving regional West African trade flows — conditioned on Ghana\'s LPI improving to the 3.0+ threshold that makes it the rational routing choice over Abidjan or Lagos. BRIDGE\'s full Phase 1 and Phase 2 portfolio is the prerequisite for this venture. The revenue potential is large; the timeline is 2030+ because it depends on the platform, cold chain, and training stack being fully operational.',mode:'Partnership',capital:'$500K–1M',irr:'15–20%',risk:'HIGH',payback:'6–9 yrs',start:'2030+'},
    {tier:3,num:'⑯',name:'Rail Logistics Integration',desc:'Multimodal services connecting rail freight with road distribution — conditioned on the $21.5 billion Ghana Railway Master Plan\'s 4,007 km expansion advancing materially. Rail integration is the long-term modal diversification that reduces road dependence from 97% toward a healthier 70–75%. BRIDGE\'s role is operational logistics service integration, not rail infrastructure investment. Timeline: 2030+ at earliest given financing and construction complexity.',mode:'Partnership',capital:'$500K–1M',irr:'12–18%',risk:'HIGH',payback:'7–10 yrs',start:'2030+'},
  ],

  timeline:{
    phase1:{label:'Phase 1 — Foundation',years:'2026–2028',capital:'$6.5–11M',count:'6 ventures',items:['Q1 2026: Cold Chain Ghana — 3 pilot aggregation hub sites selected in Ashanti and Northern regions','Q2 2026: Logistics Training Academy — employer co-design workshops, TVET partnership signed','Q2 2026: Fleet Management Services — telematics platform onboards first 200 operators','Q2 2026: Load Matching Platform — Accra–Kumasi corridor live, 50 shippers and 300 carriers onboarded','Q3 2026: Agricultural Collection Network — 15 cooperative pick-up routes operational','Q3 2026: Last-Mile Delivery Platform — Accra peri-urban zones, first 100 couriers enrolled']},
    phase2:{label:'Phase 2 — Scale',years:'2028–2030',capital:'$5.3–10M',count:'7 ventures',items:['Pharmaceutical Cold Chain — Ghana Health Service MOU, 25-facility cold chain design finalised','Vehicle Asset Financing — telematics credit scoring activated for 500+ eligible operators','Warehousing Company — Tema bonded warehouse licensed, Kumasi cross-dock operational','Cross-Border Facilitation — Burkina Faso and Mali corridor platform live','Cold Storage Financing — lease-to-own structures based on Phase 1 utilisation data','Operator Formalisation — 1,000+ operators registered through DVLA/GRA partnership','Urban Mobility Solutions — EV cargo bikes deployed in Accra and Kumasi metro zones']},
    phase3:{label:'Phase 3 — Conditional',years:'2030+',capital:'$2–4M',count:'3 ventures',items:['Boankra Inland Port Services — private operator licence when ICD commissioning confirmed','Regional Logistics Hub — entry when LPI reaches 3.0+ and BRIDGE portfolio fully operational','Rail Logistics Integration — multimodal service launch when Railway Master Plan advances materially']},
  },

  roadmap:[
    {name:'Cold Chain Ghana',tier:1,s:0,e:55},
    {name:'Load Matching Platform',tier:1,s:0,e:60},
    {name:'Fleet Management Services',tier:1,s:5,e:65},
    {name:'Logistics Training Academy',tier:1,s:5,e:80},
    {name:'Agricultural Collection Network',tier:1,s:10,e:65},
    {name:'Last-Mile Delivery',tier:1,s:10,e:75},
    {name:'Vehicle Asset Financing',tier:2,s:40,e:80},
    {name:'Pharmaceutical Cold Chain',tier:2,s:40,e:85},
    {name:'Warehousing Company',tier:2,s:42,e:85},
    {name:'Cross-Border Facilitation',tier:2,s:45,e:100},
    {name:'Cold Storage Financing',tier:2,s:55,e:100},
    {name:'Tier 3 — 3 Ventures',tier:3,s:80,e:100},
  ],

  synergies:[
    {sector:'06 Agriculture',link:'The Agricultural Collection Network and Cold Chain Ghana are the transport arm of BRIDGE\'s entire agriculture portfolio. Every cooperative investment, every post-harvest loss reduction, every export-grade produce target depends on reliable, cold-capable collection. These sectors are operationally inseparable.'},
    {sector:'11 Manufacturing',link:'Supply chain logistics is a direct input cost for every manufacturer. Load Matching reduces transport costs for raw material inputs and finished goods distribution. Cross-Border Facilitation opens the AfCFTA export corridors that BRIDGE\'s manufacturing ventures depend on to reach the 1.4 billion-consumer regional market.'},
    {sector:'03 Health Systems',link:'Pharmaceutical Cold Chain directly addresses the 25% vaccine spoilage rate undermining Ghana\'s immunisation coverage. Last-Mile Delivery extends to medical supply distribution in rural health facilities. Cold chain infrastructure serves health outcomes as directly as it serves commercial logistics.'},
    {sector:'02 Financial Inclusion',link:'Vehicle Asset Financing uses telematics data for alternative credit scoring — a new financial inclusion channel for informal operators who have collateral-free operating history. Load Matching\'s mobile money integration drives financial account activity across the transport workforce.'},
    {sector:'04 Technology',link:'Load Matching and Fleet Management are software platforms — each a technology venture as much as a logistics venture. The telematics network they build is Ghana\'s first real-time commercial freight tracking layer, with data that benefits every sector that ships goods.'},
    {sector:'01 Infrastructure',link:'BRIDGE\'s logistics operations are the commercial use case for public road and port infrastructure. Cold Chain Ghana\'s aggregation hubs co-locate with Connect24 road investment corridors. Kejetia Market logistics digitalisation is a joint Infrastructure-Transport venture.'},
    {sector:'10 Energy',link:'Solar-powered cold storage eliminates the grid dependency that caused all previous cold storage programmes to fail. Processing and warehousing facilities require reliable power — mini-grid co-location with Cold Chain Ghana creates dual-sector energy and logistics returns.'},
    {sector:'05 Education',link:'Logistics Training Academy graduates are placed in BRIDGE logistics ventures and partner companies — the workforce pipeline across cold chain operations, fleet management, and cross-border facilitation. Each graduate is a simultaneous Education and Transportation sector outcome.'},
  ],

  thesis:'BRIDGE\'s transportation thesis is anchored in the missing-stack logic: Ghana already has 80% of what a world-class logistics hub requires. The port capacity, the road network, the geographic position at the centre of West Africa\'s landlocked trade corridor — all of it exists. What is missing is the cold chain, the platform layer, and the trained workforce that convert adequate physical infrastructure into reliable, high-performing logistics. Each BRIDGE venture fills one specific gap in the missing stack, and each gap is commercially self-sustaining once filled.',
  thesis2:'Logistics is the connective tissue for every other BRIDGE sector investment. When a farmer\'s tomatoes reach Accra cold and intact instead of spoiled, that is an agriculture outcome and a transport outcome simultaneously. When a truck operator\'s empty return journey becomes a revenue-generating load, that is a financial inclusion outcome as much as a logistics efficiency. A family whose vaccine was properly refrigerated to their district clinic received a health outcome delivered by a transport investment. The multiplier logic in transportation does not just apply within the sector — it compounds across all twelve.',

  deploy:[{l:'Ticket size',v:'$500K–$3M per venture'},{l:'Preferred stage',v:'Seed through Series A'},{l:'Model preference',v:'Platform, subscription, and asset-light'},{l:'Cold chain',v:'Solar-powered; off-grid capable required'},{l:'Co-investment',v:'Transport DFIs; AfDB; USAID'},{l:'Exit horizon',v:'5–9 years; trade sale or platform acquisition'}],

  risks:[
    {r:'Infrastructure Dependency',sev:'MEDIUM',mit:'BRIDGE logistics ventures are designed to work on existing road network — no new infrastructure required for Phase 1. Connect24 alignment de-risks Phase 2. Cold Chain Ghana\'s solar power model eliminates grid dependency.'},
    {r:'Operator Fragmentation & Adoption',sev:'MEDIUM',mit:'Fleet Management and Load Matching priced specifically for 3–5 vehicle operators at $200/truck/year. BRIDGE Operator Formalisation programme creates the registered operator base that platform onboarding requires.'},
    {r:'Fuel Price & Operating Cost Volatility',sev:'MEDIUM',mit:'Load Matching\'s route optimisation reduces fuel consumption per tonne-kilometre. Vehicle Asset Financing enables fleet renewal to more fuel-efficient vehicles. Urban Mobility Solutions introduces EV alternatives for last-mile segments.'},
    {r:'Boankra ICD Commissioning Delay',sev:'MEDIUM',mit:'Boankra venture (Tier 3) is explicitly conditioned on commissioning confirmation — BRIDGE does not deploy capital until the ICD is operational. No Phase 1 venture depends on Boankra.'},
    {r:'Digital Platform Competition',sev:'LOW-MED',mit:'BRIDGE Load Matching targets the 80% small-operator segment that pan-African platforms (Kobo360) do not serve. Network effect economics reward early deployment — first-mover position defensible.'},
    {r:'Regulatory & Licensing Risk',sev:'LOW-MED',mit:'DVLA, GRA, and Ghana Private Road Transport Union partnerships built into Operator Formalisation venture. Cross-Border Facilitation operates on top of Ghana Shippers Authority infrastructure, not in competition with it.'},
  ],

  benchmarks:[
    {country:'Ghana — Current LPI',pct:48,highlight:'red',note:'World Bank LPI 2.4/5 — below sub-Saharan peer average'},
    {country:'Kenya',pct:60,highlight:false,note:'LPI 3.0 — cold chain and digital logistics established'},
    {country:'South Africa',pct:68,highlight:false,note:'LPI 3.4 — multimodal, refrigerated, formalised sector'},
    {country:'Morocco',pct:64,highlight:false,note:'LPI 3.2 — regional hub threshold; BRIDGE 2030 peer target'},
    {country:'Ghana — BRIDGE Target 2030',pct:64,highlight:'lime',note:'LPI 3.2 — hub threshold, each venture maps to a sub-dimension'},
  ],

  marketSizes:[
    {crop:'Cold Chain Services',tam:'$900M+',note:'Annual cold chain revenue potential = direct offset of $1.9B post-harvest loss; solar-powered model viable',accessible:'$120–180M',growth:'+18%/yr',phase:1,priority:'IMMEDIATE'},
    {crop:'Fleet Management SaaS',tam:'$240M',note:'Ghana\'s 300,000+ commercial vehicles; $200/vehicle/yr subscription; 80% penetration opportunity',accessible:'$40–70M',growth:'+22%/yr',phase:1,priority:'IMMEDIATE'},
    {crop:'Load Matching Platform',tam:'$180M',note:'30–50% empty backhaul elimination across 100,000+ active routes; transaction fee model',accessible:'$30–55M',growth:'+25%/yr',phase:1,priority:'IMMEDIATE'},
    {crop:'Pharmaceutical Cold Chain',tam:'$85M',note:'Ghana Health Service cold chain budget; vaccine procurement + private pharmaceutical distribution',accessible:'$18–28M',growth:'+12%/yr',phase:2,priority:'HIGH'},
    {crop:'Warehousing & Storage',tam:'$320M',note:'Port-adjacent and inland warehousing; bonded + general storage; cross-docking demand growing',accessible:'$35–55M',growth:'+10%/yr',phase:2,priority:'HIGH'},
    {crop:'Cross-Border Facilitation',tam:'$140M',note:'AfCFTA trade facilitation services across Burkina Faso, Mali, Niger corridors; 72% of Tema transit',accessible:'$20–35M',growth:'+15%/yr',phase:2,priority:'MEDIUM'},
  ],

  coopTiers:[
    {tier:'Tier 1 — Platform-Ready Operators',count:'12,000+',zone:'Accra–Tema and Ashanti corridors',desc:'Registered operators with 5+ vehicles, mobile money accounts, GPS-capable vehicles. Immediate Fleet Management and Load Matching enrolment targets.',color:'positive'},
    {tier:'Tier 2 — Formalisation-Stage',count:'45,000+',zone:'All major corridors',desc:'Operating informally; eligible for Operator Formalisation programme. DVLA/GRA registration pathway unlocks platform access and Vehicle Asset Financing within 12–18 months.',color:'amber'},
    {tier:'Tier 3 — Informal Operators',count:'80,000+',zone:'Rural and feeder routes',desc:'Motorcycle couriers, tricycle operators, informal carriers. Last-Mile Platform and Agricultural Collection Network routes are Phase 1 entry point for this tier.',color:'faint'},
  ],

  eudrItems:[
    {date:'Q1 2026',event:'Connect24 deployment begins',type:'BRIDGE',note:'GH₵4.3B transport infrastructure programme creates co-investment corridor alignment'},
    {date:'Q2 2026',event:'AfCFTA Phase II tariff schedule',type:'CRITICAL',note:'Cross-border trade volumes increase — logistics demand accelerates for all corridor ventures'},
    {date:'2026',event:'Boankra ICD — final commissioning watch',type:'CRITICAL',note:'80%+ complete; private logistics operator licensing opens when confirmed — BRIDGE monitors monthly'},
    {date:'Q3 2026',event:'BRIDGE Tier 1 ventures live',type:'BRIDGE',note:'Cold Chain Ghana, Load Matching, Fleet Management, Training Academy all operational'},
    {date:'2030',event:'LPI 3.2 target — hub threshold',type:'FUTURE',note:'Full BRIDGE portfolio operational; Ghana qualifies as West Africa\'s preferred logistics routing'},
  ],

  coInvestors:[
    {name:'African Development Bank',type:'Concessional Loan',focus:'Transport infrastructure, cold chain, logistics facilitation across Africa',alignment:'Phase 1–2 cold chain and platform',capital:'$15–50M',stage:'Active in Ghana'},
    {name:'IFC — World Bank Group',type:'Private Sector Finance',focus:'Logistics platforms, vehicle financing, warehouse infrastructure',alignment:'Phase 2 Vehicle Asset Financing',capital:'$5–20M',stage:'Ghana logistics pipeline'},
    {name:'USAID West Africa Trade Hub',type:'Grant + TA',focus:'Cross-border trade facilitation, logistics training, AfCFTA corridors',alignment:'Cross-Border Facilitation + Training Academy',capital:'$3–10M TA',stage:'Active ECOWAS programme'},
    {name:'GIZ / German Development',type:'Technical Assistance',focus:'Vocational training, cold chain standards, digital logistics',alignment:'Logistics Training Academy co-design',capital:'Technical TA',stage:'Active Ghana programme'},
    {name:'Norfund / Nordic DFIs',type:'Impact Equity',focus:'Agri-logistics, cold chain infrastructure, SME transport',alignment:'Cold Chain Ghana Phase 1',capital:'$2–8M',stage:'West Africa exposure'},
    {name:'Agricultural Finance Corporation',type:'Development Finance',focus:'Agri-logistics, cold storage financing, GH₵-denominated',alignment:'Cold Storage Financing Phase 2',capital:'GH₵ denominated',stage:'Government-backed'},
  ],

  fullPackage:[
    {item:'16-Venture Financial Models',desc:'10-year projections for all 16 ventures — revenue build, telematics subscription curves, cold chain utilisation ramp, IRR sensitivity, working capital by venture'},
    {item:'Cold Chain Ghana Business Plan',desc:'Full investment case for anchor cold chain network — 20 priority hub sites, solar specification, refrigerated fleet model, off-take agreements with BRIDGE agriculture cooperatives'},
    {item:'Logistics Training Academy Design',desc:'Full curriculum framework, TVET partnership terms, employer co-investment model, 500-graduate year-one pipeline, and graduate employment tracking methodology'},
    {item:'Load Matching Platform Architecture',desc:'Technology platform design, agricultural corridor route mapping, mobile money integration specification, shipper/carrier onboarding plan, and network effect modelling'},
    {item:'Fleet Management SaaS Specification',desc:'Telematics supplier assessment, pricing model, 1,000-vehicle year-one enrolment roadmap, and credit scoring data protocol for Vehicle Asset Financing integration'},
    {item:'Agricultural Collection Network Routes',desc:'50-route design across BRIDGE agriculture cooperative zones, GPS tracking system specification, and full agriculture portfolio integration map'},
    {item:'Pharmaceutical Cold Chain Design',desc:'Ghana Health Service partnership terms, GDP compliance specification, NHIA contract structure, and 25-facility temperature-controlled logistics network'},
    {item:'Cross-Border Facilitation Package',desc:'AfCFTA documentation requirements, transit bond structure, bilateral freight association partnership agreements, and border crossing time-reduction modelling'},
    {item:'Vehicle Asset Financing Framework',desc:'Credit scoring methodology using telematics operational data, loan structure, default mitigation protocol, and bank partnership term sheet'},
    {item:'Boankra ICD Monitoring Tracker',desc:'Commissioning timeline tracking, private operator licensing terms, container handling revenue model — updated monthly for BRIDGE members'},
    {item:'LPI Improvement Roadmap',desc:'Sub-dimension gap mapping, intervention-to-score attribution model, and Ghana\'s 2.4 → 3.2 pathway by 2030 with quarterly milestone tracking'},
    {item:'Quarterly Transport Intelligence',desc:'LPI updates, Tema Port throughput data, cold chain market developments, AfCFTA cross-border volumes, and competitor landscape changes every quarter'},
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

  /* ── Carousel scroll container ── */
  .mob-scroller{display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;scrollbar-width:none;gap:12px;-webkit-overflow-scrolling:touch;padding-bottom:4px;}
  .mob-scroller::-webkit-scrollbar{display:none;}
  .mob-snap-card{flex:0 0 82vw;scroll-snap-align:start;min-width:0;}
  .mob-snap-wide{flex:0 0 92vw;scroll-snap-align:start;min-width:0;}
  .mob-snap-sm{flex:0 0 72vw;scroll-snap-align:start;min-width:0;}

  /* Carousel edge fade */
  .car-wrap{position:relative;}
  .car-wrap::after{content:'';position:absolute;top:14px;right:0;width:44px;height:calc(100% - 32px);background:linear-gradient(to right,transparent,${C.paper} 90%);pointer-events:none;z-index:2;}
  .car-wrap-dark::after{background:linear-gradient(to right,transparent,${C.paperDark} 90%);}
  .car-wrap-ink::after{background:linear-gradient(to right,transparent,${C.ink} 90%);}

  /* ── Progressive disclosure toggle ── */
  .mob-toggle{display:none;width:100%;padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};align-items:center;justify-content:space-between;transition:color 0.15s;}
  .mob-toggle:hover{color:${C.forest};}
  .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
  .mob-toggle-hdr{border-bottom:1px solid rgba(255,255,255,0.08)!important;color:rgba(250,248,243,0.4)!important;}

  /* Table row hover */
  .row-hover{transition:background 0.12s ease;}
  .row-hover:hover{background:rgba(184,217,53,0.04)!important;}
  .row-hover-dark:hover{background:rgba(255,255,255,0.035)!important;}

  /* Score bar animation */
  @keyframes barGrow{from{width:0}to{width:var(--w,100%)}}
  .score-bar{animation:barGrow 1s cubic-bezier(0.16,1,0.3,1) 0.4s both;}
  .score-bar-dim{animation:barGrow 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both;}

  /* Global transitions */
  a{transition:opacity 0.15s ease;}
  a:hover{opacity:0.76;}
  button{transition:background 0.15s ease,border-color 0.15s ease,color 0.15s ease;}

  /* CTA hover lift */
  .cta-primary{transition:transform 0.15s ease,box-shadow 0.15s ease!important;}
  .cta-primary:hover{transform:translateY(-1px)!important;box-shadow:0 6px 20px rgba(184,217,53,0.25)!important;}

  /* Section rule — apply className="sec-rule mob-hide" */
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

  /* ── Mobile (≤600px) — primary target ── */
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
    .stats-row>div:nth-child(2){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(4){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .mob-stat{display:flex!important;}
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
    {label:'Farmer',sub:'Farm Gate',val:'GH₵8',pct:13,bg:C.lime,tx:C.ink},
    {label:'Broker',sub:'First buyer',val:'+GH₵8',pct:14,bg:'#7A1A10',tx:'rgba(250,248,243,0.85)'},
    {label:'Transport',sub:'Logistics',val:'+GH₵10',pct:16,bg:'#5C2A00',tx:'rgba(250,248,243,0.75)'},
    {label:'Wholesale',sub:'Distributor',val:'+GH₵14',pct:23,bg:'#3A4A3C',tx:'rgba(250,248,243,0.65)'},
    {label:'Retail',sub:'Market stall',val:'+GH₵20',pct:34,bg:'#222E24',tx:'rgba(250,248,243,0.5)'},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="01" title="Logistics System Distribution — Infrastructure to Outcomes" note="How Ghana's logistics system gaps distribute across the supply chain. 97% single-mode dependence, fragmented operators, and absent cold chain each extract value before goods reach consumers. Source: BRIDGE Analysis, 2026."/>
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
        {[{l:'Ghana LPI score',v:'2.4/5',vc:C.red},{l:'BRIDGE LPI target 2030',v:'3.2/5',vc:C.positive},{l:'Cold chain opportunity',v:'$900M/yr',vc:C.forest}].map((kv,i)=>(
          <div key={i} style={{background:C.paperDark,padding:'8px 12px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint,letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
            <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══ FIG 02 — POST-HARVEST LOSS BY CROP ═══════════════════════════════ */
const Fig02CropLoss=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="02" title="Post-Harvest Loss by Commodity — Current vs. BRIDGE Cold Chain Target" note="Current post-harvest loss rates by commodity vs. BRIDGE Cold Chain Ghana intervention targets. Solar-powered cold storage at aggregation points is the primary intervention. Amber indicator shows percentage-point savings achievable. Source: BRIDGE Sector Analysis; FAO Ghana; World Bank."/>
    <div className="fig-scroll">
      <div style={{minWidth:'560px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'160px 1fr 80px',background:C.forest}}>
          {['Commodity','Loss Rate (% of harvest value lost)','+/− pp Saving'].map((h,i)=>(
            <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
          ))}
        </div>
        {S.cropLoss.map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'160px 1fr 80px',borderBottom:i<7?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
            <div style={{padding:'10px 12px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{row.crop}</div>
              <div style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic',lineHeight:1.4,marginTop:'2px'}}>{row.note}</div>
            </div>
            <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`}}>
              <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:`${Math.min(row.cur*1.5,100)}%`,maxWidth:'55%',height:'10px',background:C.red,borderRadius:'2px',flexShrink:0}}/>
                  <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.red,flexShrink:0}}>{row.cur}%</span>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>current</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:`${Math.min(row.tgt*1.5,100)}%`,maxWidth:'55%',height:'10px',background:C.lime,borderRadius:'2px',flexShrink:0}}/>
                  <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.positive,flexShrink:0}}>{row.tgt}%</span>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>target</span>
                </div>
              </div>
            </div>
            <div style={{padding:'10px 12px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.amber}}>–{(row.cur-row.tgt).toFixed(1)}</span>
              <div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,letterSpacing:'0.5px'}}>pp saved</div>
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
    <FigCaption num="03" title="Regional Capital Allocation by Agro-Ecological Zone" note="BRIDGE portfolio allocation by agro-ecological zone with primary commodity focus. Northern Savannah receives the highest weighting due to crisis concentration — the 2024 drought affected 871,000 hectares. Source: BRIDGE Regional Analysis, 2026."/>
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
    <FigCaption num="04" title="2026 Transport Budget Allocations & BRIDGE Entry Points" note="2026 national budget allocations to transport sector with BRIDGE partnership mode per line item. Connect24 is the flagship alignment. Source: Ghana Ministry of Finance, 2026 Budget Statement."/>
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
    {label:'Baseline — No Intervention',sub:'Farm gate only, no infrastructure',pct:28,color:'rgba(168,32,13,0.75)',bg:C.paper},
    {label:'+ Market Aggregation Centre',sub:'Reduces transport cost; group bargaining',pct:38,color:C.amber,bg:C.paperDark},
    {label:'+ Cold Storage Access',sub:'Sell at premium timing, not harvest lows',pct:48,color:C.limeDark,bg:C.paper},
    {label:'+ Warehouse Receipt Financing',sub:'Capital to hold and sell at price peak',pct:56,color:C.limeDark,bg:C.paperDark},
    {label:'+ Processing & Value Addition',sub:'Full BRIDGE value chain — target state',pct:68,color:C.positive,bg:C.paper},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="05" title="LPI Score by Intervention Layer" note="Ghana's LPI score progression as BRIDGE ventures activate each sub-dimension. Cold chain adds infrastructure quality; platforms add tracking capability; training adds logistics competence; cross-border adds customs efficiency. Source: BRIDGE Analysis; World Bank LPI 2022."/>
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
          {[{l:'Baseline capture',v:'28%',vc:C.red},{l:'BRIDGE target',v:'68%',vc:C.positive},{l:'Uplift delivered',v:'+40pp',vc:C.lime}].map((kv,i)=>(
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
    {n:'Cold Chain Ghana',x:330,y:100,r:12,tier:1},{n:'Load Matching',x:148,y:174,r:9,tier:1},
    {n:'Fleet Management',x:165,y:158,r:10,tier:1},{n:'Training Academy',x:170,y:185,r:8,tier:1},
    {n:'Agri Collection',x:348,y:140,r:9,tier:1},{n:'Last-Mile Platform',x:360,y:155,r:9,tier:1},
    {n:'Pharma Cold Chain',x:350,y:128,r:9,tier:2},{n:'Vehicle Financing',x:375,y:148,r:9,tier:2},
    {n:'Boankra ICD',x:572,y:115,r:12,tier:3},{n:'Regional Hub',x:556,y:140,r:11,tier:3},
  ];
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  const tierTx={1:C.ink,2:C.white,3:C.paper};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="06" title="Venture Portfolio Matrix — Risk vs. Return" note="Risk vs. return matrix for 10 of 16 transportation ventures (those with numeric IRR). Bubble size represents capital required. Tier 1 ventures cluster in the low-to-medium-risk/strong-return quadrant. Source: BRIDGE Venture Analysis, 2026."/>
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
      <FigCaption num="07" title="Transportation Portfolio — Deployment Roadmap" note="Portfolio deployment roadmap. Phase 1 (2026) is the foundation — Cold Chain Ghana, Load Matching, Fleet Management, and Training Academy establish the infrastructure every subsequent venture requires. Source: BRIDGE Operations Planning, 2026."/>
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
      <FigCaption num="08" title="Logistics Performance Index — Ghana vs. Regional & Global Peers" note="World Bank LPI scores by country. Ghana's 2.4 baseline sits below sub-Saharan peer average and significantly behind Morocco's hub threshold of 3.2. BRIDGE's 2030 target of 3.2 aligns with Morocco — the regional hub benchmark. Source: World Bank Logistics Performance Index 2022."/>
      <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{background:C.forest,padding:'8px 14px',display:'grid',gridTemplateColumns:'180px 1fr 60px'}}>
          {['Country / Scenario','Farmer Share of Consumer Price (%)','Share'].map((h,i)=>(
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
          {[{l:'Ghana baseline',v:'+0pp',vc:C.red},{l:'BRIDGE uplift',v:'+40pp',vc:C.lime},{l:'Peers median',v:'52%',vc:C.forest}].map((kv,i)=>(
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
    {label:'Government — Connect24',sub:'Ministry of Roads / MoF',pct:70,ghc:'GH₵4.3B',note:'State transport infrastructure investment BRIDGE platforms leverage',color:C.forest,tx:C.lime},
    {label:'BRIDGE Capital',sub:'Private investor equity',pct:19.2,ghc:'~GH₵1.33B',note:'30% private co-investment — BRIDGE equity stake in processing anchor',color:C.lime,tx:C.ink},
    {label:'DFI / Impact Co-Finance',sub:'AfDB, USAID, Root Capital',pct:10.8,ghc:'~GH₵750M',note:'Blended finance layer — concessional terms de-risk private equity',color:C.amber,tx:C.white},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="09" title="BRIDGE Capital Leverage Stack — Connect24 Transport Alignment" note="How BRIDGE's platform ventures align with Ghana's GH₵4.3B Connect24 transport programme. BRIDGE provides the digital layer, cold chain, and workforce — government provides the physical infrastructure. Source: Ghana 2026 Budget; BRIDGE Financial Modelling."/>
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

/* ═══ SECTION REGISTRY ═══════════════════════════════════════════════════ */
const SECS=[
  {id:'sec-exec',    label:'Executive Summary'},
  {id:'sec-subs',    label:'Sub-Sectors'},
  {id:'sec-problem', label:'Structural Problem'},
  {id:'sec-crops',   label:'Cold Chain Analysis'},
  {id:'sec-zones',   label:'Regional Strategy'},
  {id:'sec-market',  label:'Competitive Landscape'},
  {id:'sec-policy',  label:'Policy Window'},
  {id:'sec-income',  label:'Logistics Performance'},
  {id:'sec-ventures',label:'Venture Portfolio'},
  {id:'sec-roadmap', label:'Deployment Roadmap'},
  {id:'sec-synergy', label:'System Integration'},
  {id:'sec-coinvest',label:'Co-Investment'},
  {id:'sec-risk',    label:'Risk & Thesis'},
  {id:'upsell',      label:'Next Steps'},
];

/* ═══ READING PROGRESS BAR ═══════════════════════════════════════════════ */
const ReadingProgressBar=({coverRef})=>{
  const[pct,setPct]=useState(0);
  const[logoVisible,setLogoVisible]=useState(false);
  useEffect(()=>{
    const fn=()=>{
      const doc=document.documentElement;
      const scrolled=doc.scrollTop||document.body.scrollTop;
      const total=doc.scrollHeight-doc.clientHeight;
      setPct(total>0?Math.min(100,(scrolled/total)*100):0);
      if(coverRef?.current){setLogoVisible(coverRef.current.getBoundingClientRect().bottom<0);}
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
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Sector Brief · Transportation &amp; Logistics · Core Tier · March 2026</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>12 · Transport</span>
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
        <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
          {SECS.map((_,i)=>(
            <div key={i} onClick={()=>goTo(i)} style={{width:i===active?'24px':'6px',height:'6px',borderRadius:'3px',background:i===active?C.lime:i<active?'rgba(184,217,53,0.3)':'rgba(255,255,255,0.15)',cursor:'pointer',transition:'width 0.3s cubic-bezier(0.16,1,0.3,1),background 0.2s',flexShrink:0}}/>
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
  <div className="mob-expand-all" style={{display:'none',background:C.ink,borderBottom:`1px solid rgba(184,217,53,0.12)`,padding:'10px 18px',alignItems:'center',justifyContent:'space-between',gap:'10px'}}>
    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
      <div style={{width:'5px',height:'5px',borderRadius:'50%',background:allOpen?C.lime:'rgba(255,255,255,0.2)',transition:'background 0.2s'}}/>
      <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(255,255,255,0.35)',letterSpacing:'0.5px'}}>
        {allOpen?'All sections open':'All sections collapsed'}
      </span>
    </div>
    <button onClick={onToggle} style={{background:'transparent',border:`1px solid rgba(184,217,53,0.3)`,padding:'6px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.lime,cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
      {allOpen?'Collapse All ↑':'Expand All ↓'}
    </button>
  </div>
);

/* ═══ COVER ══════════════════════════════════════════════════════════════ */
const Cover=({logoRef})=>(
  <div>
    <div className="pad-cover" style={{background:C.ink,padding:'28px 64px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'32px',top:'-8px',fontFamily:F.display,fontSize:'clamp(100px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.022)',lineHeight:1,userSelect:'none',pointerEvents:'none',letterSpacing:'-6px'}}>12</div>
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
          <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:800,padding:'5px 12px',letterSpacing:'1.5px'}}>SECTOR 12 OF 12</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.07)'}}/>
        </div>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(36px,6vw,78px)',fontWeight:900,color:C.paper,lineHeight:0.95,letterSpacing:'-2.5px',marginBottom:'8px'}}>Transportation</h1>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,4vw,52px)',fontWeight:700,color:'rgba(250,248,243,0.38)',lineHeight:1,letterSpacing:'-1.5px',marginBottom:'20px'}}>&amp; Logistics</h2>
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
        <SecHdr num="00" label="Executive Summary" badge={`Score ${S.score}`} hint="97% single-mode dependence · $1.9B cold chain opportunity · GH₵4.3B budget alignment" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{maxWidth:'900px',display:'grid',gridTemplateColumns:'2fr 1fr',gap:'48px'}} className="tc">
        <div>
          <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
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
        <SecHdr num="00" label="Sub-Sector Landscape" badge="6 sub-sectors" hint="Cold chain, platforms, workforce, cross-border, port — scored by BRIDGE Impact Score™" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Sub-Sector Landscape</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 sub-sectors assessed</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Where BRIDGE Scores the Opportunity</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Each sub-sector is scored on market opportunity, implementation feasibility, development impact, and financial sustainability. Cold chain leads on impact; digital platforms lead on capital efficiency. BRIDGE Impact Score™ methodology applied consistently across all 174+ ventures in the full portfolio.</p>
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
        <SecHdr num="01" label="The Structural Problem" badge="97% Road" hint="Single-mode dependence · 6 compounding constraints · operator fragmentation breakdown" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 01 — The Structural Problem</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>97% road freight · World Bank LPI 2.4/5</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>The Logistics Paradox</h2>
        <Fig01ValueChain/>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px',marginBottom:'28px'}} className="tc">
          <div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana moves by truck. Almost exclusively by truck. A road network under maintenance pressure, fragmented operators, no cold chain at scale, and a World Bank logistics score of 2.4 out of 5. The constraint is not roads — it is the cold chain, platform layer, and trained workforce that converts adequate physical infrastructure into a high-performing logistics system.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana's approximately 300,000 commercial vehicle operators face a reinforcing set of constraints that cannot be addressed in isolation. Each constraint compounds the others — forming a logistics system that is functional enough to prevent crisis, but fragile enough to fail every supply chain simultaneously when a key corridor floods or fuel prices spike.</p>
            <div style={{background:C.forest,padding:'16px 20px',marginTop:'8px'}}>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.7}}>Women transport workers — market traders, small-scale carriers, mobile vendors — depend on affordable last-mile logistics for their livelihoods. BRIDGE's Last-Mile Delivery Platform and Load Matching ventures specifically extend service to the informal market economy that women disproportionately operate within.</p>
              <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>The Women's Dimension</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',alignContent:'start'}}>
            {[{v:'97%',l:'Freight by\nroad'},{v:'$1.9B',l:'Annual post-\nharvest loss'},{v:'2.4/5',l:'World Bank\nLPI score'},{v:'80%',l:'Operators\n<5 trucks'}].map((s,i)=>(
              <div key={i} style={{background:C.ink,padding:'14px 12px',textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'clamp(16px,2.2vw,24px)',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'5px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',whiteSpace:'pre-line',lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>The Logistics Constraint Stack</div>
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
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>The problem is not that Ghana cannot move goods. It moves 97% of its freight every day. The problem is a logistics chain that was never designed to be reliable, cold, digital, or equitable for the people who depend on it. — BRIDGE Transportation Sector Analysis, 2026</div>
        {/* Operator Network Distribution — Members Exclusive */}
        <div style={{marginTop:'28px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · Operator Network Analysis</div>
              <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Ghana's Transport Operator Network — Platform Readiness Tiers</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'24px',color:C.lime}}>137K+</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'1px',textTransform:'uppercase'}}>total operators</div></div>
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
            <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.6,margin:0}}>BRIDGE's Fleet Management and Load Matching platforms target Tier 1 in Phase 1, Tier 2 via the Operator Formalisation programme in Phase 2. The full 137,000+ network represents the addressable market for BRIDGE's digital logistics stack — not a barrier, but the most significant organic adoption base in the sector.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ CROP ANALYSIS ══════════════════════════════════════════════════════ */
const ColdChainAnalysis=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-crops" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="02" label="Cold Chain Gap Analysis" badge="$1.9B loss" hint="Post-harvest loss by commodity · $900M cold chain revenue · BRIDGE intervention targets" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 02 — Cold Chain Gap Analysis</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Post-Harvest Loss, Commodity by Commodity</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Each commodity has a different loss profile, a different cold chain requirement, and a different BRIDGE intervention priority. The $1.9 billion total is not a single problem — it is six separate cold chain opportunities, each commercially addressable.</p>
      <Fig02CropLoss/>
      {/* EUDR Intelligence Callout */}
      <div style={{border:`2px solid ${C.amber}`,overflow:'hidden',marginBottom:'20px'}}>
        <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.amber,marginBottom:'3px'}}>◆ Members Intelligence · Transport Policy Intelligence</div>
            <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>EU Deforestation Regulation — Timeline &amp; BRIDGE Entry Points</div>
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
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6,margin:0}}>The Connect24 deployment window creates a first-mover platform advantage. Digital logistics operators who establish network effects during the 2026–2028 infrastructure build-out will hold defensible positions when the physical network reaches full capacity. BRIDGE's platform ventures are designed to capture this window — not as a timing bet, but as a structural network economics opportunity.</p>
        </div>
      </div>
      {/* Market Sizing */}
      <div style={{marginBottom:'20px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{background:C.forest,padding:'8px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>◆ Members Intelligence · Market Sizing by Logistics Sub-Sector</div>
          <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>Total Addressable Market · BRIDGE Accessible Share · Growth Rate</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 70px 70px 80px',background:C.ink}}>
          {['Commodity','Global TAM','Context','Accessible','Growth','Phase'].map((h,i)=>(
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
          <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>TAM = Total Addressable Market (global). Accessible = BRIDGE-estimated Ghana market share achievable within 5 years of processing venture launch. Source: ITC Trade Map; FAO; BRIDGE Sector Analysis 2026.</span>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginTop:'4px'}} className="tc">
        {[
          {title:'The Cold Chain Business Case',body:'The $1.9 billion in annual spoilage is not a humanitarian statistic — it is the addressable market. Cold Chain Ghana\'s commercial logic is direct: each tonne of produce that arrives intact instead of spoiled is revenue the cold chain captures. Solar-powered storage at agricultural aggregation points eliminates the grid dependency that caused every previous cold storage programme to fail. The economics do not require subsidy — they require infrastructure.'},
          {title:'Pharmaceutical Cold Chain',body:'A 25% vaccine spoilage rate is not a health system failure — it is a logistics failure. The same solar-powered cold chain infrastructure that handles agricultural produce handles pharmaceutical products. Cold Chain Ghana\'s Phase 1 network creates the physical foundation that GDP-compliant pharmaceutical logistics runs on in Phase 2. One investment serves both markets simultaneously.'},
          {title:'Load Matching — Network Effects',body:'A platform that eliminates 30–50% empty backhaul rates does not require operators to change their trucks, their routes, or their business model. It requires only information. Each carrier who joins makes the platform more valuable for every shipper. Each shipper who joins fills more trucks. The network effect economics make early deployment position defensible — and make BRIDGE\'s first-mover advantage compound over time.'},
          {title:'Cashew — The Processing Gap',body:'The Transition Zone produces substantial cashew volumes that leave Ghana raw, captured by Vietnamese and Indian processors who sell finished product at 4× the raw nut price. BRIDGE\'s Cashew & Shea Processing venture addresses both commodities under one capital structure, co-locating with existing processors who provide technology while BRIDGE provides scale capital and export relationships.'},
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
        <SecHdr num="03" label="Regional Strategy" badge="4 zones" hint="Accra–Tema 35% · zone-by-zone capital allocation and intervention priorities" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 03 — Regional Strategy</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>4 zones · 4 strategies</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Four Zones, Four Strategies</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana's agro-ecological diversity requires regionally differentiated intervention — not a one-size-fits-all approach. BRIDGE's capital allocation reflects the geography of need: 37.5% to the Northern Savannah where crisis intensity and impact potential are highest.</p>
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
        <SecHdr num="04" label="Competitive Landscape" badge="50+ LogTech cos" hint="6 key players profiled · BRIDGE positioning vs Kobo360, Ctrack, GIMPA and more" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 04 — Competitive Landscape</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Is Already in the Field</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'16px',fontStyle:'italic'}}>African AgTech attracted $215 million across 131 startups in 2024. Ghana has 75+ active agricultural technology companies. BRIDGE's strategy is to identify gaps these companies cannot fill and integrate promising platforms into BRIDGE-operated ventures.</p>
        <div style={{background:C.forest,padding:'14px 20px',marginBottom:'20px'}}>
          <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.65}}>AgTech companies solve information asymmetries. Financial platforms improve credit access. Neither builds the physical infrastructure — cold rooms, processing facilities, aggregation centres — that the agricultural value chain actually requires. <strong style={{color:C.lime}}>BRIDGE operates at the infrastructure layer that technology companies cannot and development agencies will not.</strong></p>
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
        <SecHdr num="05" label="Policy Window" badge="★★★★☆" hint="Connect24 GH₵4.3B · AfCFTA corridors · Boankra ICD · first-mover platform advantage" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 05 — Policy Window</div>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.sans,fontSize:'9px',fontWeight:800,padding:'3px 10px',letterSpacing:'1px'}}>★★★★★ BUDGET ALIGNMENT</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The 2026 Budget Alignment</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana's most ambitious transport infrastructure programme in a generation — and a direct map to BRIDGE's logistics thesis. The Mahama administration's Connect24 pillar is not incremental spending — it is a structural repositioning of the state as co-investor in physical and digital logistics infrastructure.</p>
        <Fig04Budget/>
        <div style={{border:`2px solid ${C.lime}`,overflow:'hidden',marginTop:'4px'}}>
          <div style={{background:C.ink,padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px'}}>Time-Sensitive — Q2 2026 Deadline</div>
              <div style={{fontFamily:F.display,fontSize:'clamp(14px,2vw,20px)',fontWeight:700,color:C.paper}}>Connect24 & Key Policy Instruments — Full Terms</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'28px',fontWeight:500,color:C.lime,lineHeight:1}}>1:5.2×</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.3)',letterSpacing:'1px',textTransform:'uppercase'}}>leverage ratio</div></div>
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>Boankra ICD — Inland Logistics Hub</div>
          <p style={{fontFamily:F.body,fontSize:'13px',color:C.muted,lineHeight:1.65,fontStyle:'italic'}}>The Boankra Inland Container Depot is 80%+ complete — when commissioned, it decongests Tema Port by routing Kumasi and Northern-region cargo inland. BRIDGE enters as a private logistics operator when commissioning is confirmed. The depot transforms Kumasi into a full logistics hub, creating demand for BRIDGE's fleet management, warehousing, and cross-border facilitation ventures simultaneously.</p>
        </div>
        <Fig09CapitalStack/>
      </div>
    </div>
    </div>
  );
};

/* ═══ FARMER INCOME ══════════════════════════════════════════════════════ */
const LogisticsPerformance=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-income" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="06" label="Logistics Performance" badge="2.4 → 3.2 LPI" hint="LPI 2.4 → 3.2 target · international benchmarks · BRIDGE sub-dimension attribution" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 06 — Logistics Performance</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The LPI Improvement Thesis</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Each BRIDGE venture targets a specific LPI sub-dimension — the portfolio stack raises Ghana's overall score from 2.4 to 3.2 by 2030. This is not incremental improvement. It is a coordinated transformation of how Ghana's logistics infrastructure serves its people and its economy.</p>
      <Fig05Income/>
      <Fig08Benchmarks/>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'32px'}} className="tc">
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'20px'}}>
          <p style={{fontFamily:F.display,fontSize:'17px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"When a truck operator's empty return journey becomes a revenue-generating load, that is not just a better IRR on a BRIDGE venture. That is a family business that can afford a second truck, a household that can service a loan, a community whose logistics become reliable enough to attract a processing facility."</p>
          <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE PBC Transportation Sector Investment Thesis</div>
        </div>
        <div style={{background:C.ink,padding:'18px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Data Sources</div>
          {[{l:'LPI baseline data',v:'World Bank LPI 2022'},  {l:'Platform adoption benchmark',v:'Kobo360 Ghana data'},{l:'Cold chain ROI model',v:'BRIDGE financial model'},{l:'LPI target validation',v:'World Bank benchmarks'},{l:'Operators in portfolio',v:'137K+ across 4 corridors'}].map((row,i)=>(
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
        <SecHdr num="07" label="Venture Portfolio" badge="16 ventures" hint="Tier 1: $6.5–11M · 12–25% IRR · Cold Chain Ghana, Load Matching, Fleet Management" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 07 — The Portfolio</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'5px 14px',letterSpacing:'1px'}}>15 ventures · $12–22M total</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>15 Ventures Across 3 Tiers</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced by urgency, leverage, and dependency — Tier 1 builds the platform network effects and cold chain infrastructure that Tier 2 and 3 require. The sequencing is deliberate: cold chain and platforms before asset financing; training and telematics before cross-border facilitation.</p>
        <Fig06Matrix/>
        {/* Tier 1 */}
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 1</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Priority Implementation — 2026–2028</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$6.3–12.6M · 6 ventures</span>
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
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$5.2–10.4M · 5 ventures</span>
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
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 08 — Implementation</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Deployment Roadmap</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced deployment built around the 2026 budget cycle and Connect24 alignment. Phase 1 is the critical window — Cold Chain Ghana, Load Matching Platform, Fleet Management, and Training Academy all deploy simultaneously to build the platform network effects.</p>
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
            {[{m:'Cold Chain Ghana',d:'3 pilot aggregation hubs live; solar storage commissioned'},
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
        <SecHdr num="◆" label="Co-Investment" badge="6 actors" hint="AfDB, IFC, USAID, GIZ, Norfund, AFC — capital types, alignment, and BRIDGE stack role" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>◆ Members Intelligence · Co-Investment Landscape</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 key actors profiled</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Else Is Investing — and Where BRIDGE Fits</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Ghana's agricultural investment landscape is active — but fragmented. DFIs and development partners deploy significant capital through grants and concessional lending that requires private sector co-investment to activate. BRIDGE occupies the private equity anchor role that most donors cannot fill: operational management, equity stake, and long-term accountability for returns.</p>
        <div style={{background:C.paperDark,padding:'14px 20px',border:`1px solid ${C.border}`,marginBottom:'20px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>BRIDGE's Co-Investment Positioning</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}} className="tc">
            {[
              {l:'What DFIs provide',v:'Concessional capital, grants, technical assistance — but cannot operate ventures'},
              {l:'What AgTech provides',v:'Digital infrastructure — but cannot fund physical assets or manage cooperatives'},
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
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>BRIDGE's blended finance architecture is designed to complement these actors, not compete with them. The correct co-investment sequence: BRIDGE equity anchor → DFI concessional layer → government infrastructure alignment → operator equity participation. This stacking structure maximises leverage and aligns every stakeholder's incentive with BRIDGE's long-term portfolio returns.</div>
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
        <SecHdr num="10" label="System Integration" badge="8 sector links" hint="Transport links Agriculture, Manufacturing, Health, Finance, Technology and more" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'24px',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Section 10 — System Integration</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.ink}}>Transportation as Connective Tissue</h2>
          </div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'6px 14px',letterSpacing:'1px',flexShrink:0}}>8 sector links</div>
        </div>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Transportation is the sector with the deepest integration across the full 12-sector BRIDGE portfolio. Every agricultural venture depends on collection logistics. Every manufacturing investment requires supply chain access. Every health system outcome depends on last-mile pharmaceutical delivery. The integration is not incidental — it is the thesis. When BRIDGE invests in transportation, it de-risks investment in agriculture, manufacturing, health, and financial inclusion simultaneously.</p>
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
        <SecHdr num="09" label="Risk & Thesis" badge="6 risk categories" hint="6 risk categories · infrastructure, fragmentation, fuel, Boankra, competition, regulatory" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'18px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 09 — Risk Analysis</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Risk &amp; Mitigation</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Logistics investment carries real risks — BRIDGE's portfolio structure, phased deployment, and platform model are each designed to manage a specific risk category. No single risk is unmitigated; the portfolio is designed around the full constraint stack.</p>
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
    {item:'Ejura Agricultural Hub Business Plan',detail:'Complete investment case — management structure, capital stack, anchor tenant strategy.'},
    {item:'Operator & Site Due Diligence',detail:'Cold chain hub site selection, operator partner assessment, platform technical specifications, regulatory compliance per corridor.'},
    {item:'Operator Network Directory',detail:'500+ verified operators by corridor — contact data, fleet size, telematics readiness, financial profile for Vehicle Asset Financing.'},
    {item:'Connect24 Alignment Guide',detail:'Co-investment entry points, term sheet templates, MoRH engagement protocol, corridor prioritisation — ready for 2026.'},
    {item:'AfCFTA Cross-Border Facilitation Guide',detail:'Documentation requirements, transit bond structure, border crossing optimisation for Burkina Faso, Mali, Niger corridors.'},
    {item:'AgTech Competitive Intelligence',detail:'40+ companies assessed — technology readiness, funding status, BRIDGE partnership potential.'},
    {item:'Boankra ICD Entry Playbook',detail:'Private operator licensing terms, container handling revenue model, commissioning milestone tracker — updated monthly.'},
    {item:'Farmer Income Simulation Tool',detail:'Farm-to-consumer model by crop, zone, and intervention layer — built for due diligence.'},
    {item:'Regional Deployment Maps',detail:'GIS-referenced site selection, logistics corridors, agro-industrial park data across 4 zones.'},
    {item:'Transport Policy Monitor — Live',detail:'Monthly tracking of Connect24 deployment, Boankra ICD status, AfCFTA enforcement, EV tariff developments.'},
    {item:'Quarterly Intelligence Updates',detail:'New data and revised assessments across all 12 sectors every quarter.'},
  ];

  const partnershipPhases=[
    {phase:'01',title:'Mandate Alignment',dur:'2–3 hrs',desc:'BRIDGE maps your capital profile, priorities, and risk parameters against the 12-sector portfolio. Honest, direct, specific.'},
    {phase:'02',title:'Bespoke Intelligence Build',dur:'4–6 wks',desc:'Custom financial models, due diligence frameworks, and co-investment capital stack built for your mandate.'},
    {phase:'03',title:'Market Access',dur:'Ongoing',desc:'Direct MoFA introductions, cooperative networks in your target zones, AgTech partners, procurement channels.'},
    {phase:'04',title:'Deal Origination',dur:'Rolling',desc:'Into opportunities before market-ready — at founder terms, with BRIDGE operational management. You bring capital. We bring Ghana.'},
  ];

  const intentCopy={
    package:{
      label:'Full Intelligence Package',
      sub:'Operational tools built for your process',
      cta:'Request Package Scope',
      href:'mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Transportation Sector',
    },
    partnership:{
      label:'Partnership Engagement',
      sub:'BRIDGE at the table with you',
      cta:'Start the Conversation',
      href:'mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Transportation',
    },
    briefing:{
      label:'30-Min Briefing',
      sub:'No commitment — we figure out fit first',
      cta:'Schedule Now →',
      href:'mailto:intelligence@bridgepbc.com?subject=Briefing Request — Transportation Sector',
    },
  };

  return(
    <div id="upsell" style={{background:C.ink,position:'relative',overflow:'hidden'}}>

      {/* Ghost watermark */}
      <div style={{position:'absolute',right:'-20px',top:'40px',fontFamily:F.display,fontSize:'clamp(100px,20vw,280px)',fontWeight:900,color:'rgba(255,255,255,0.018)',pointerEvents:'none',userSelect:'none',letterSpacing:'-10px',lineHeight:1}}>06</div>

      {/* ── Membership bar ── */}
      <div style={{background:'rgba(184,217,53,0.06)',borderBottom:'1px solid rgba(184,217,53,0.1)',padding:'9px 64px'}} className="pad-topbar">
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.lime,flexShrink:0}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>Members Access Active</span>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.2)'}}>· Sector 12 of 12 · Full edition included</span>
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
              {key:'package',icon:'📦',label:'Full Package',sub:'Tools & models'},
              {key:'partnership',icon:'🤝',label:'Partnership',sub:'Work with BRIDGE'},
              {key:'briefing',icon:'📅',label:'Quick Briefing',sub:'30 min, no commitment'},
            ].map((opt)=>(
              <button key={opt.key} onClick={()=>setIntent(intent===opt.key?null:opt.key)}
                style={{background:intent===opt.key?'rgba(184,217,53,0.1)':'rgba(255,255,255,0.03)',border:intent===opt.key?`1px solid ${C.lime}`:'1px solid rgba(255,255,255,0.1)',padding:'14px 12px',cursor:'pointer',textAlign:'left',transition:'all 0.2s'}}>
                <div style={{fontSize:'18px',marginBottom:'6px'}}>{opt.icon}</div>
                <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:intent===opt.key?C.lime:C.paper,marginBottom:'2px'}}>{opt.label}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.3)',fontStyle:'italic'}}>{opt.sub}</div>
              </button>
            ))}
          </div>

          {/* ── Intent detail panel ── */}
          {intent==='package'&&(
            <div style={{border:'1px solid rgba(184,217,53,0.2)',background:'rgba(184,217,53,0.04)',marginBottom:'20px',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(184,217,53,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.lime,marginBottom:'2px'}}>Full Intelligence Package — Transportation & Logistics Sector</div>
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
                <a href="mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Transportation Sector"
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
                <a href="mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Transportation"
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
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.65}}>Tell us your capital profile and sector focus. We'll show you exactly which of the 16 Transportation ventures match your mandate — and be direct if the fit isn't there. Takes 30 minutes. No pitch deck.</div>
              </div>
              <a href="mailto:intelligence@bridgepbc.com?subject=Briefing Request — Transportation Sector"
                style={{background:C.lime,color:C.ink,padding:'14px 28px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',flexShrink:0,display:'flex',alignItems:'center',gap:'8px'}}>
                Schedule Now <span style={{fontSize:'16px'}}>→</span>
              </a>
            </div>
          )}

          {/* ── Urgency strip — always visible ── */}
          <div style={{border:`1px solid ${C.amber}`,background:'rgba(184,115,10,0.06)',padding:'12px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px',marginBottom:'0'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
              <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.amber,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0}}>⚡ Q2 2026</span>
              <div style={{width:'1px',height:'20px',background:'rgba(184,115,10,0.35)',flexShrink:0}}/>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>Connect24 Platform Window — First-Mover Advantage</span>
              <span className="mob-hide" style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.35)',fontStyle:'italic'}}>Early movers secure positioning late entrants cannot replicate.</span>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:C.amber,flexShrink:0}}>1:5.2×</div>
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
  <div className="pad-footer" style={{background:'#060e08',padding:'16px 64px',borderTop:'1px solid rgba(184,217,53,0.12)'}}>
    <div className="footer-inner" style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={16} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.1)'}}/>
        <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.18)'}}>Sector 12 of 12 · Transportation & Logistics · Full Edition · March 2026 · bridgepbc.com/intelligence</span>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'16px'}}>
        {['All Sectors','Members','Full Package','Contact'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.18)',textDecoration:'none'}}>{l}</a>))}
      </div>
    </div>
  </div>
);

/* ═══ ROOT ════════════════════════════════════════════════════════════════ */
const ExpandCtx=React.createContext({forceOpen:null});

export default function TransportationBrief(){
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
      <ColdChainAnalysis/>
      <RegionalStrategy/>
      <CompetitiveLandscape/>
      <PolicyWindow/>
      <LogisticsPerformance/>
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
