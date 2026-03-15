import { useState, useEffect, useRef } from "react";
import React from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BRIDGE SECTOR 03 — Health Systems & Wellbeing
   Full Members Edition · March 2026 · Standalone Document
═══════════════════════════════════════════════════════════════════════════ */

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF',teal:'#2E5A4D'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};
const RISK_COLOR={LOW:C.positive,MEDIUM:C.amber,HIGH:C.red,'LOW-MED':C.amber};
const MODE_BG={'Direct Op':C.forest,'Partnership':C.amber,'Investment':C.teal,'Guidance':C.paperDark,'Network':C.ink};
const MODE_TX={'Direct Op':C.lime,'Partnership':C.white,'Investment':C.paper,'Guidance':C.muted,'Network':'rgba(250,248,243,0.6)'};

/* ═══ SECTOR DATA ════════════════════════════════════════════════════════ */
const S={
  num:'03',name:'Health Systems & Wellbeing',tier:'Core',score:82,capital:'$7–30M',edition:'March 2026 Edition',
  tagline:'Ghana trains its healthcare workforce — then loses 56% of doctors and 500 nurses monthly to emigration. With 15,000+ diaspora clinicians seeking meaningful re-engagement, the solution is not more training. It is activation.',
  stats:[{l:'Physician Ratio',v:'1:6,000'},{l:'Doctors Abroad',v:'56%'},{l:'Nurses Emigrating',v:'500/mo'},{l:'Diaspora Clinicians',v:'15,000+'}],
  scoreDims:[{d:'Market Opportunity',w:'30%',s:80},{d:'Development Impact',w:'30%',s:92},{d:'Implementation Feasibility',w:'25%',s:76},{d:'Financial Sustainability',w:'15%',s:72}],
  snapshot:[{l:'Tier',v:'Core'},{l:'Score',v:'82/100'},{l:'Priority',v:'Immediate deployment'},{l:'Portfolio Range',v:'$7–30M'},{l:'Timeline',v:'2026–2030'},{l:'Ventures Identified',v:'19'}],
  summary:'Ghana\'s health system faces a crisis that is structural, not incidental. The physician-to-population ratio stands at 1:6,000 — six times worse than the WHO minimum of 1:1,000. Approximately 56% of Ghanaian-trained doctors practice abroad, and an estimated 500 nurses emigrate monthly. The result is a system where patients wait months for specialist consultations, maternal mortality remains at 310 per 100,000 live births against an SDG target of 70, and mental health coverage reaches just 1 psychiatrist per 1.5 million people.',
  summary2:'The health budget allocation of 6.9% of national spending — well below the 15% Abuja Declaration target — is consumed 71% by salaries alone, leaving infrastructure, equipment, and medicines chronically underfunded. Eleven percent of Ghanaian households face catastrophic health expenditure. The deterioration is measurable and accelerating.',
  summary3:'BRIDGE\'s health thesis starts with activation, not construction. Ghana has 15,000+ diaspora healthcare professionals who retain deep homeland connections and consistently express desire to contribute beyond remittances. The technology infrastructure for telemedicine is operational. The community health system has a physical footprint. BRIDGE\'s position in market infrastructure and diaspora networks creates a direct entry point for the interventions the system needs.',
  quote:'"The crisis is not a shortage of willing healthcare workers — it is a system that fails to retain the professionals it trains and fails to deploy the 15,000+ diaspora clinicians who want to help."',

  subs:[
    {name:'Diaspora Telemedicine & Digital Health',score:88,stage:'Deployment-Ready',capital:'$1.5–4M',note:'15,000+ diaspora clinicians; specialist access gap; BRIDGE credentialing model'},
    {name:'Community Health Infrastructure',score:85,stage:'Active',capital:'$3–10M',note:'CHPS network; market health kiosks; peri-urban clinic deployment'},
    {name:'Healthcare Workforce Retention',score:84,stage:'Seed–A',capital:'$2–5M',note:'500 nurses/mo emigrating; retention fund + CME platform'},
    {name:'Health Insurance & Emergency Finance',score:82,stage:'Seed–A',capital:'$1–2.5M',note:'NHIS gap coverage; catastrophic expenditure elimination for traders'},
    {name:'HealthTech Investment Portfolio',score:76,stage:'Early',capital:'$1–3M',note:'40+ startups; diagnostics, EHR, supply chain, pharma distribution'},
    {name:'Specialized & Tertiary Care',score:68,stage:'Conditional',capital:'$5–15M',note:'Dialysis, oncology, cardiac — conditioned on network maturity'},
  ],

  constraints:[
    {c:'Physician Shortage',harm:'1:6,000 ratio — 6× below WHO minimum. Patients wait months for specialist consultations; referrals to Accra strip rural families of savings.'},
    {c:'Brain Drain',harm:'56% of trained doctors practice abroad. 500 nurses emigrate monthly. Training investment is captured by NHS, USA, and Gulf states.'},
    {c:'NHIS Fragility',harm:'68% enrolled, 42% active payers. Reimbursement delays force providers to exit the scheme — degrading coverage for the households it was designed to protect.'},
    {c:'Geographic Barriers',harm:'46.3% of births without skilled attendance. Northern region households travel hours for care that can be delivered locally through CHPS and telemedicine.'},
    {c:'Catastrophic Expenditure',harm:'11% of households face catastrophic health costs — up from 1% in 2012. Every medical emergency risks destroying a trader\'s working capital and business.'},
    {c:'Quality & Infection Control',harm:'Hospital-acquired infection rate of 8.2% is 4× WHO acceptable levels. Training and protocol gaps, not capital alone, drive this outcome.'},
  ],

  coverageGaps:[
    {metric:'NHIS Active Coverage',cur:42,tgt:80,note:'68% enrolled; only 42% active payers — gap drives provider exit from scheme'},
    {metric:'Skilled Birth Attendance',cur:54,tgt:90,note:'310 maternal deaths per 100K; SDG target requires 90%+ skilled attendance'},
    {metric:'Health Worker Retention Rate',cur:44,tgt:78,note:'56% attrition; target: retain 78% through structured diaspora + salary programs'},
    {metric:'Rural Health Facility Access',cur:35,tgt:75,note:'Households within 8km of functional facility; Northern Ghana <20%'},
    {metric:'Community Diagnostic Coverage',cur:28,tgt:70,note:'Adequate diagnostics within 10km; primary bottleneck for case detection'},
    {metric:'Mental Health Primary Integration',cur:4,tgt:45,note:'Primary care facilities with mental health capacity; 1 psychiatrist per 1.5M people'},
  ],

  diaspora:[
    {zone:'Nursing & Midwifery',regions:'UK, USA, Canada',crops:'ICU, obstetrics, community, emergency',alloc:45,allocLabel:'45%',color:C.lime,interventions:'Healthcare Worker Retention Fund; CHPS Strengthening; CME delivery; maternal health telemedicine',context:'~6,750 nurses abroad; 500 emigrating monthly — the highest-volume pipeline to close'},
    {zone:'Physicians & Specialists',regions:'UK, USA, Canada, Gulf States',crops:'Cardiology, oncology, surgery, internal med',alloc:32,allocLabel:'32%',color:C.amber,interventions:'Diaspora Telemedicine Platform; CME faculty; specialist consultations; return pathway',context:'~4,800 physicians abroad; highest per-clinician impact through telemedicine activation'},
    {zone:'Public Health & Research',regions:'USA, Europe, WHO agencies',crops:'Epidemiology, policy, global health',alloc:12,allocLabel:'12%',color:C.teal,interventions:'Health Information Exchange; Quality Improvement Advisory; policy design; research partnerships',context:'~1,800 professionals; high leverage for system design, quality standards, and advocacy'},
    {zone:'Allied Health & Pharmacy',regions:'All destinations',crops:'Pharmacy, physiotherapy, lab science',alloc:11,allocLabel:'11%',color:C.muted,interventions:'Diagnostic Laboratory Network; pharmacy retail; community health education; screening programs',context:'~1,650 professionals; supports diagnostic capacity and last-mile medicine access'},
  ],

  competitors:[
    {type:'Telemedicine',name:'mPharma',desc:'Pan-African pharmaceutical supply chain and health access platform. Operates in Ghana with retail pharmacy presence. Strong medicine distribution — limited clinical care delivery and diaspora integration.',pos:'Potential pharmacy distribution partner for BRIDGE Community Clinic Network and health kiosks.'},
    {type:'Health Technology',name:'Helium Health',desc:'Hospital management software and EHR platform serving West African facilities. Deep health records capability. Limited community health and diaspora connectivity.',pos:'EHR infrastructure partner for BRIDGE clinic network and Health Information Exchange.'},
    {type:'Telemedicine · Pan-Africa',name:'Babylon Health / Ada',desc:'AI-powered symptom checker and teleconsultation platform. Has Ghana user base. Global platform design — lacks BRIDGE\'s diaspora-specific credentialing and specialist matching.',pos:'Consumer health entry model — BRIDGE differentiates via diaspora faculty and facility integration.'},
    {type:'Insurance',name:'NHIS / Hollard Ghana',desc:'National Health Insurance Scheme and private supplemental products. NHIS covers 68% nominally; Hollard provides supplemental cover. NHIS reimbursement delays create the gap BRIDGE\'s community insurance fills.',pos:'BRIDGE Community Health Insurance is complementary to NHIS — fills co-pay and excluded service gaps.'},
    {type:'NGO / Development',name:'Partners In Health (PIH)',desc:'Global health NGO with community health and health system strengthening programs. Non-commercial, grant-dependent. Demonstrates the model; lacks sustainability and investment returns.',pos:'Technical partnership model for community clinic design — BRIDGE adds capital structure and sustainability.'},
    {type:'Diaspora Health',name:'Afya Na Haki / GDHA',desc:'Ghana Diaspora Health Alliance — diaspora health professional association. Volunteer-based, no commercial structure. Represents the community BRIDGE activates through structured platform.',pos:'Partnership and outreach channel for Diaspora Healthcare Registry and Telemedicine Platform recruitment.'},
  ],

  budgetItems:[
    {item:'NHIS Recapitalisation',ghc:'GH₵2.8B',usd:'~US$200M',pct:100,mode:'NHIS payment model for BRIDGE clinics',urgency:'Q2 2026 — NHIS reform open',featured:true},
    {item:'Community Health (CHPS)',ghc:'GH₵890M',usd:'~US$63M',pct:32,mode:'CHPS Strengthening partnership',urgency:'2026 deployment cycle',featured:false},
    {item:'Human Resource for Health',ghc:'GH₵620M',usd:'~US$44M',pct:22,mode:'Workforce retention co-funding',urgency:'MoH partnership — 2026',featured:false},
    {item:'Maternal & Child Health',ghc:'GH₵480M',usd:'~US$34M',pct:17,mode:'Community clinic maternal focus',urgency:'SDG alignment — active',featured:false},
    {item:'Health Infrastructure',ghc:'GH₵340M',usd:'~US$24M',pct:12,mode:'Clinic co-location investment',urgency:'District-level deployment',featured:false},
    {item:'Digital Health Strategy',ghc:'GH₵180M',usd:'~US$13M',pct:6,mode:'Telemedicine infrastructure',urgency:'2026–2028 rollout',featured:false},
  ],

  nhisDetails:[
    {f:'Recapitalisation Window',t:'GH₵2.8B targeted in 2026 — largest single health budget line'},
    {f:'NHIS Reimbursement Model',t:'BRIDGE clinics eligible for NHIS provider status — direct reimbursement pathway'},
    {f:'Coverage Gap BRIDGE Fills',t:'58% of nominally enrolled households not actively covered — community insurance target'},
    {f:'Telemedicine Reimbursement',t:'Medical and Dental Council licensing framework enables NHIS billing for teleconsultations'},
    {f:'BRIDGE Leverage Ratio',t:'1:6.7× — every $1 of BRIDGE capital activates $6.70 in government + NHIS + DFI health spend'},
    {f:'Partnership Entry Point',t:'NHIS provider registration + MoH MOU = approved pathway for all BRIDGE clinic operations'},
    {f:'Reform Window',t:'Q2 2026 NHIS recapitalisation creates co-funding opportunity that closes after Q3 enrollment cycle'},
  ],

  ventures:[
    {tier:1,num:'①',name:'Diaspora Telemedicine Platform',desc:'Connects Ghana\'s 15,000+ diaspora healthcare professionals with in-country providers and patients via structured virtual consultations. BRIDGE handles credentialing, liability, and scheduling; diaspora physicians provide specialist time on flexible commitments. Partners with licensed Ghana facilities for regulatory compliance. Addresses the specialist shortage directly — without requiring physical return.',mode:'Direct Op',capital:'$1–2.5M',irr:'12–18%',risk:'MEDIUM',payback:'4–6 yrs',start:'Q2 2026'},
    {tier:1,num:'②',name:'Market Health Services',desc:'Health kiosks co-located within Kejetia and BRIDGE model markets providing preventive care, screenings, vaccinations, and basic treatment for informal sector workers who cannot access facility-based care during trading hours. Direct cross-sell with BRIDGE\'s Market Financial Services Platform — health consultation bundled with health microinsurance. First health touchpoint for millions of market traders.',mode:'Direct Op',capital:'$200–500K',irr:'8–12%',risk:'LOW',payback:'4–6 yrs',start:'Q1 2026'},
    {tier:1,num:'③',name:'Diaspora Healthcare Registry',desc:'Searchable database of diaspora healthcare professionals with verified credentials, specialty, and engagement preferences. Foundation for all diaspora health programs — telemedicine matching, CME delivery, return pathway support, and research collaboration. Lowest capital item in the portfolio with the highest enabling leverage. Built in partnership with Ghana Medical Association diaspora chapter.',mode:'Direct Op',capital:'$75–150K',irr:'Platform infra',risk:'LOW',payback:'N/A',start:'Q1 2026'},
    {tier:1,num:'④',name:'Community Clinic Network',desc:'3–5 primary care clinics in underserved peri-urban and rural areas, with maternal and child health focus. Staffed by Ghana Health Service personnel supplemented by diaspora rotational placements. Each clinic anchored by a BRIDGE-operated Market Health Services kiosk for preventive care. Addresses the geographic access barrier — the 46.3% of births without skilled attendance — directly and measurably.',mode:'Partnership',capital:'$3–8M',irr:'8–14%',risk:'MEDIUM',payback:'6–8 yrs',start:'Q3 2026'},
    {tier:1,num:'⑤',name:'Healthcare Worker Retention Fund',desc:'Competitive retention packages — salary supplements, housing support, professional development, and career pathway commitments — for 200 healthcare workers committed to a 3–5 year Ghana service period. Partners with Ministry of Health for matching contributions. Directly counter-programs the NHS and US active recruitment pipeline. Every retained specialist multiplies system capacity far beyond their individual output.',mode:'Partnership',capital:'$2–4M',irr:'Social return',risk:'MEDIUM',payback:'N/A',start:'Q2 2026'},
    {tier:1,num:'⑥',name:'CME Platform',desc:'Continuing medical education platform with diaspora faculty delivering virtual training to Ghana-based healthcare workers. Addresses the quality gap — Ghana\'s hospital-acquired infection rate of 8.2% reflects not just equipment deficits but training gaps. CME credits incentivize diaspora participation on flexible schedules while upgrading in-country clinical practice standards without requiring physical presence.',mode:'Direct Op',capital:'$300–600K',irr:'Platform infra',risk:'LOW',payback:'N/A',start:'Q2 2026'},
    {tier:1,num:'⑦',name:'Community Health Insurance',desc:'Supplemental community insurance product filling the NHIS coverage gaps — co-pays, excluded services, and the 58% of households effectively uninsured despite nominal enrollment. Distributed through BRIDGE market networks and susu cooperatives where trust infrastructure already exists. Every insured household removes one catastrophic expenditure event that would otherwise drain a trader\'s working capital.',mode:'Partnership',capital:'$500K–1.5M',irr:'10–15%',risk:'LOW',payback:'4–6 yrs',start:'Q3 2026'},
    {tier:2,num:'⑧',name:'CHPS Strengthening Programme',desc:'Equipment, training, and telemedicine integration for 50+ Community-based Health Planning and Services compounds — Ghana\'s existing rural health infrastructure. CHPS compounds reach communities that no clinic or market kiosk ever will. BRIDGE provides the technology and diaspora connection; GHS provides the physical network and community health volunteers already embedded in those communities.',mode:'Partnership',capital:'$1–2M',irr:'8–12%',risk:'MEDIUM',payback:'5–7 yrs',start:'2027'},
    {tier:2,num:'⑨',name:'HealthTech Investment Portfolio',desc:'Minority equity stakes in 3–5 Ghana health technology startups extending BRIDGE\'s reach into diagnostics, electronic health records, supply chain, and pharmaceutical distribution. Ghana has 40+ telemedicine startups; the sector is active but undercapitalized. BRIDGE adds value beyond capital — diaspora networks, market distribution, and cross-sector financial product integration.',mode:'Investment',capital:'$1–3M',irr:'18–25%',risk:'MEDIUM',payback:'5–8 yrs',start:'Ongoing'},
    {tier:2,num:'⑩',name:'Medical Emergency Fund',desc:'Quick-disbursement crisis financing for market traders facing unexpected medical costs — the primary driver of household financial catastrophe for informal sector workers. Deployed through BRIDGE\'s existing market financial services rails. Every emergency fund disbursement that prevents a trader from liquidating business inventory to pay medical bills is a financial inclusion intervention as much as a health intervention.',mode:'Direct Op',capital:'$500K–1M',irr:'Interest income',risk:'LOW',payback:'3–5 yrs',start:'2027'},
    {tier:2,num:'⑪',name:'Quality Improvement Advisory',desc:'Technical support for BRIDGE-affiliated clinics and CHPS compounds to achieve quality standards and infection control targets. Ghana\'s 8.2% hospital-acquired infection rate is 4× WHO acceptable levels — addressable through protocol implementation and training rather than capital investment. Diaspora clinicians with international standards experience provide the advisory capability.',mode:'Guidance',capital:'$75–150K',irr:'Capacity building',risk:'LOW',payback:'N/A',start:'2027'},
    {tier:2,num:'⑫',name:'Big Ideas Challenge — Health',desc:'Annual competition surfacing and funding innovative health solutions from Ghana-based entrepreneurs, students, and community health workers. Low capital, high ecosystem-building value — creates a pipeline of health innovations that BRIDGE can track, support, and potentially scale through its venture portfolio and diaspora networks.',mode:'Direct Op',capital:'$100–150K',irr:'Pipeline building',risk:'LOW',payback:'N/A',start:'2027'},
    {tier:2,num:'⑬',name:'Diaspora Return Pathway',desc:'Structured support for diaspora professionals seeking physical return — licensing recognition, practice placement, housing assistance, and professional network reintegration. Removes the practical barriers that prevent motivated diaspora clinicians from making the transition. The long-term complement to telemedicine: converts remote contributors into resident workforce additions.',mode:'Guidance',capital:'$200–400K',irr:'System building',risk:'MEDIUM',payback:'N/A',start:'2028'},
    {tier:3,num:'⑭',name:'Nursing School Partnership',desc:'Nursing education capacity expansion through partnership with an existing Ghana institution — adding training places, diaspora faculty, and clinical placement infrastructure. The workforce gap cannot be closed by retention alone; production must also increase. Conditioned on Tier 1 retention and diaspora engagement programs establishing BRIDGE\'s credibility as a trusted Ministry of Health partner.',mode:'Partnership',capital:'$3–8M',irr:'Social return',risk:'HIGH',payback:'N/A',start:'2029+'},
    {tier:3,num:'⑮',name:'Specialized Care Center',desc:'Focused facility for dialysis, oncology, or cardiac care in a region with demonstrated unmet demand — the highest-capital single venture in the portfolio. Conditioned on BRIDGE Community Clinic Network achieving operational maturity, diaspora specialist engagement at scale, and a viable NHIS or blended payment model ensuring sustainability without pure fee-for-service dependence.',mode:'Direct Op',capital:'$5–15M',irr:'12–18%',risk:'HIGH',payback:'7–10 yrs',start:'2030+'},
    {tier:3,num:'⑯',name:'Diagnostic Laboratory Network',desc:'Quality diagnostic labs serving BRIDGE community clinics and CHPS compounds — addressing the diagnostic capacity gap that forces patients to travel to regional capitals for basic tests. Capital and regulatory complexity mean this is a Phase 3 venture, but it is a prerequisite for the Specialized Care Center and the quality improvement programme achieving their full potential.',mode:'Partnership',capital:'$1–3M',irr:'10–16%',risk:'HIGH',payback:'6–9 yrs',start:'2029+'},
    {tier:3,num:'⑰',name:'Health Information Exchange',desc:'Regional health data platform enabling care coordination across BRIDGE-affiliated facilities, telemedicine consultations, and CHPS compounds. Addresses the fragmentation that causes duplicate testing, medication errors, and lost records. Long-term infrastructure investment — its value compounds as the BRIDGE health network grows. Requires Ghana Health Service partnership and patient data governance framework.',mode:'Partnership',capital:'$2–5M',irr:'System infra',risk:'HIGH',payback:'N/A',start:'2030+'},
    {tier:3,num:'⑱',name:'Maternal Health Telemedicine',desc:'Dedicated teleconsultation program connecting diaspora obstetricians and midwives with community health workers at CHPS compounds for antenatal, delivery, and postnatal support. Targets the 46.3% of births without skilled attendance in underserved regions. Builds on the Diaspora Telemedicine Platform infrastructure with maternal-specific protocols, risk scoring, and emergency escalation pathways.',mode:'Partnership',capital:'$300–600K',irr:'8–12%',risk:'LOW',payback:'4–6 yrs',start:'2028'},
    {tier:3,num:'⑲',name:'Pharmacy Retail Network',desc:'Community pharmacy outlets integrated with BRIDGE health kiosks and clinic network — addressing last-mile medicine access where the nearest pharmacy may be hours away. Franchise model with diaspora pharmacist advisory support. Solves the medicine stock-out problem that makes NHIS provider status commercially unviable for rural facilities.',mode:'Partnership',capital:'$1–2.5M',irr:'10–14%',risk:'MEDIUM',payback:'5–7 yrs',start:'2029+'},
  ],

  timeline:{
    phase1:{label:'Phase 1 — Activation',years:'2026–2027',capital:'$4.2–9.2M',count:'7 ventures',items:['Q1 2026: Diaspora Healthcare Registry — GMA diaspora chapter partnership signed','Q1 2026: Market Health Services — Kejetia kiosk 1 operational; 2 sites selected','Q2 2026: Diaspora Telemedicine Platform — Medical and Dental Council licensing confirmed','Q2 2026: CME Platform — first cohort of diaspora faculty onboarded','Q2 2026: Healthcare Worker Retention Fund — MoH co-funding MOU signed','Q3 2026: Community Clinic Network — first 2 sites operational','Q3 2026: Community Health Insurance — product live through BRIDGE market networks']},
    phase2:{label:'Phase 2 — Scale',years:'2027–2029',capital:'$2.2–6.8M',count:'6 ventures',items:['CHPS Strengthening — 50+ compounds with telemedicine integration','HealthTech Portfolio — first 3 minority investments completed','Medical Emergency Fund — deployed through existing market finance rails','Quality Improvement Advisory — 20+ facilities at WHO infection control standard','Diaspora Return Pathway — licensing recognition framework with Medical Council','Big Ideas Challenge — first annual cohort, 10+ health innovations funded']},
    phase3:{label:'Phase 3 — Maturity',years:'2029+',capital:'$12–34M',count:'6 ventures',items:['Specialized Care Center — conditioned on clinic network maturity and NHIS viability','Nursing School Partnership — conditioned on MoH credentialing trust established','Diagnostic Laboratory Network — Phase 2 clinic volume unlocks viability','Health Information Exchange — full BRIDGE health network data integration','Maternal Health Telemedicine — scaled from pilot in Phase 2 CHPS program','Pharmacy Retail Network — franchise model, 20+ community locations']},
  },

  roadmap:[
    {name:'Diaspora Registry',tier:1,s:0,e:15},
    {name:'Market Health Services',tier:1,s:0,e:50},
    {name:'Telemedicine Platform',tier:1,s:5,e:65},
    {name:'CME Platform',tier:1,s:5,e:80},
    {name:'Retention Fund',tier:1,s:5,e:60},
    {name:'Community Clinic Network',tier:1,s:10,e:75},
    {name:'Community Health Insurance',tier:1,s:12,e:90},
    {name:'CHPS Strengthening',tier:2,s:40,e:80},
    {name:'HealthTech Portfolio',tier:2,s:40,e:100},
    {name:'Medical Emergency Fund',tier:2,s:42,e:90},
    {name:'Return Pathway',tier:2,s:55,e:100},
    {name:'Maternal Telemedicine',tier:2,s:60,e:100},
    {name:'Tier 3 — 6 Ventures',tier:3,s:80,e:100},
  ],

  synergies:[
    {sector:'01 Infrastructure',link:'Market Health Services kiosks are co-deployed within BRIDGE market sites — health infrastructure layered onto commercial infrastructure at near-zero marginal site cost.'},
    {sector:'02 Financial Inclusion',link:'Community Health Insurance and Medical Emergency Fund eliminate the primary cause of informal sector credit default — unexpected health costs that destroy trader working capital and creditworthiness.'},
    {sector:'05 Education',link:'Child health outcomes determine school attendance. Every vaccination and malnutrition intervention in a market health kiosk is simultaneously an education investment — healthy children learn.'},
    {sector:'06 Agriculture',link:'Smallholder farmers in the Northern Savannah face the highest disease burden and lowest health access. CHPS Strengthening directly addresses agricultural productivity loss from preventable illness.'},
    {sector:'04 Technology',link:'HealthTech portfolio investments; telemedicine infrastructure; electronic health records; diagnostic AI — Technology sector ventures with Health Systems as the primary deployment context.'},
    {sector:'08 Housing',link:'Housing quality is a primary social determinant. BRIDGE housing developments with health kiosk co-location create integrated community health infrastructure in new residential developments.'},
    {sector:'09 Tourism',link:'Medical tourism is a growing revenue category. Specialized Care Center and diagnostic network create a medical tourism product for diaspora health visits and regional referrals to Ghana.'},
    {sector:'11 Manufacturing',link:'Pharmaceutical manufacturing is an adjacent opportunity. Diagnostic equipment assembly and medical device manufacturing connect Health and Manufacturing sectors for import substitution.'},
  ],

  thesis:'BRIDGE\'s health thesis is anchored in activation logic: Ghana has already made the investment — trained the doctors, built the CHPS infrastructure, enrolled the NHIS members. The return on that investment is being captured in the UK, USA, and Gulf states. BRIDGE does not build a parallel health system. It activates the latent assets Ghana already owns.',
  thesis2:'Every diaspora clinician who delivers 4 hours of specialist consultations per week through the BRIDGE platform serves patients who currently wait months or never receive specialist care at all. Every retained healthcare worker through the Retention Fund multiplies system capacity beyond their individual output. When a market trader\'s child receives a BRIDGE kiosk vaccination, that is not just a health outcome — it is a school enrollment, a future worker, a household that does not face catastrophic expenditure when illness strikes.',

  deploy:[{l:'Ticket size',v:'$200K–$8M per venture'},{l:'Preferred model',v:'Direct Op + Partnership'},{l:'Revenue model',v:'NHIS + co-pay + insurance'},{l:'Diaspora leverage',v:'15,000+ clinicians activated'},{l:'Co-investment',v:'Global Fund; World Bank; USAID'},{l:'Exit horizon',v:'7–10 years; strategic/MoH'}],

  risks:[
    {r:'Regulatory & Licensing',sev:'MEDIUM',mit:'Medical and Dental Council engagement before platform launch; NHIS provider registration pathway confirmed; legal counsel embedded in telemedicine credentialing structure'},
    {r:'Brain Drain Acceleration',sev:'HIGH',mit:'Retention Fund directly counter-programs NHS/US recruitment; CME platform creates career advancement in-country; diaspora engagement reduces emigration as only pathway to practice excellence'},
    {r:'NHIS Reimbursement Delays',sev:'MEDIUM',mit:'Community insurance product designed to be NHIS-independent; blended revenue model (NHIS + co-pay + insurance) reduces dependence on single payer; BRIDGE capital buffer for working capital'},
    {r:'Diaspora Engagement Attrition',sev:'MEDIUM',mit:'Registry maintained with active outreach; flexible commitment structures (4hr/week minimum); CME credits and professional recognition incentives; cultural reconnection framing beyond transactional engagement'},
    {r:'Quality & Liability',sev:'MEDIUM',mit:'All telemedicine consultations routed through licensed Ghana facilities; diaspora physicians under BRIDGE-structured liability framework; Quality Improvement Advisory addresses standards proactively'},
    {r:'Political & Policy Shift',sev:'LOW-MED',mit:'MoH MOU; NHIS provider status creates embedded government relationship; health is bipartisan — cross-party commitment to Abuja Declaration reduces volatility vs other sectors'},
  ],

  fullPackage:[
    {item:'19-Venture Financial Models',desc:'Complete 10-year projections — NHIS reimbursement analysis, diaspora fee structures, insurance premium modeling, sensitivity tables for all scenarios'},
    {item:'Diaspora Healthcare Registry Platform',desc:'Technical specifications, GMA partnership framework, credentialing workflow, outreach strategy for 15,000+ professional database'},
    {item:'Telemedicine Regulatory Compliance Guide',desc:'Medical and Dental Council licensing pathway, liability structure, malpractice framework, NHIS billing protocol for teleconsultations'},
    {item:'Community Clinic Network Deployment Plan',desc:'Site selection criteria, GHS partnership terms, staffing models, diaspora rotation schedule, NHIS provider registration process'},
    {item:'Healthcare Worker Retention Fund Design',desc:'Compensation benchmarking against NHS/USA offers, MoH co-funding negotiation playbook, 3–5 year service contract templates'},
    {item:'CME Platform Curriculum Framework',desc:'Diaspora faculty engagement model, accreditation pathway with Ghana College of Physicians, infection control module specifications'},
    {item:'CHPS Strengthening Deployment Plan',desc:'50-compound rollout, equipment lists, telemedicine integration specs, GHS volunteer training curriculum'},
    {item:'HealthTech Portfolio Assessment',desc:'40+ startup landscape with investment criteria, technical readiness scoring, BRIDGE partnership potential, pipeline shortlist'},
    {item:'Health Information Exchange Framework',desc:'Data governance, patient privacy compliance (NHIA regulations), interoperability standards, network architecture'},
    {item:'Specialized Care Center Feasibility Study',desc:'Location analysis, dialysis/oncology/cardiac equipment costing, NHIS payment model, operational sustainability projections'},
    {item:'Maternal Mortality Intervention Protocol',desc:'Community-level skilled attendance pathway, CHPS delivery support guidelines, diaspora midwife teleconsultation protocol'},
    {item:'Quarterly Health Intelligence Updates',desc:'Diaspora engagement tracking, NHIS reform status, regulatory changes, venture pipeline updates across all 12 sectors'},
  ],

  benchmarks:[
    {country:'Ghana — Current',pct:17,highlight:'red',note:'0.17 physicians per 1,000 — with 56% of trained doctors abroad'},
    {country:'Rwanda',pct:84,highlight:false,note:'0.84 per 1,000 — accelerated HRH strategy post-2010 yields measurable gains'},
    {country:'Kenya',pct:22,highlight:false,note:'0.22 per 1,000 — comparable emigration challenge; National HRH strategy deployed'},
    {country:'Nigeria',pct:38,highlight:false,note:'0.38 per 1,000 — larger talent base; similar brain drain dynamics'},
    {country:'WHO Minimum Standard',pct:100,highlight:false,note:'1.0 per 1,000 — SDG Universal Health Coverage minimum threshold'},
    {country:'Ghana — BRIDGE Target 2030',pct:45,highlight:'lime',note:'0.45 per 1,000 — achievable through diaspora activation + retention program'},
  ],

  coverageLayers:[
    {label:'Baseline — No BRIDGE Intervention',sub:'Current system; geography + NHIS gaps unaddressed',pct:35,color:'rgba(168,32,13,0.75)',bg:C.paper},
    {label:'+ Market Health Services',sub:'Kejetia + market kiosks; informal sector access',pct:44,color:C.amber,bg:C.paperDark},
    {label:'+ Diaspora Telemedicine',sub:'Specialist virtual consultations; rural reach',pct:55,color:C.limeDark,bg:C.paper},
    {label:'+ Community Clinic Network',sub:'3–5 peri-urban / rural primary care clinics',pct:65,color:C.limeDark,bg:C.paperDark},
    {label:'+ CHPS Strengthening + Full System',sub:'50+ compounds equipped + full insurance coverage',pct:80,color:C.positive,bg:C.paper},
  ],

  coInvestors:[
    {name:'USAID Global Health Security',type:'Grant + TA',focus:'Health systems strengthening, workforce development, community health',alignment:'Phase 1 — direct overlap',capital:'$5–20M',stage:'Active in Ghana'},
    {name:'Global Fund',type:'Grant',focus:'Health system infrastructure, NHIS strengthening, disease programme support',alignment:'Phase 1–2 clinic + CHPS',capital:'$10–50M',stage:'Active programme'},
    {name:'World Bank',type:'Concessional Loan',focus:'NHIS reform support, health infrastructure, human resources for health',alignment:'Retention Fund + NHIS reform',capital:'$20–100M',stage:'Active in Ghana'},
    {name:'GAVI Alliance',type:'Grant',focus:'Vaccination infrastructure, cold chain, community health worker capacity',alignment:'Market Health kiosk vaccination',capital:'$3–10M',stage:'Ghana programme active'},
    {name:'Bill & Melinda Gates Foundation',type:'Grant + Investment',focus:'Maternal & child health, diagnostics, health data systems',alignment:'Phase 2 maternal + diagnostic',capital:'$5–15M',stage:'Active West Africa'},
    {name:'Mastercard Foundation',type:'Grant',focus:'Health access for young people, health finance innovation, digital health',alignment:'Community insurance + HealthTech',capital:'$2–8M',stage:'Active Ghana programme'},
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
  a{transition:opacity 0.15s ease;}
  a:hover{opacity:0.76;}
  button{transition:background 0.15s ease,border-color 0.15s ease,color 0.15s ease;}
  .cta-primary{transition:transform 0.15s ease,box-shadow 0.15s ease!important;}
  .cta-primary:hover{transform:translateY(-1px)!important;box-shadow:0 6px 20px rgba(184,217,53,0.25)!important;}
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

/* ═══ FIG 01 — HEALTH BUDGET UTILISATION ═══════════════════════════════ */
const Fig01ValueChain=()=>{
  const chain=[
    {label:'Salaries',sub:'71% of health budget',val:'71%',pct:71,bg:C.forest,tx:C.lime},
    {label:'Infrastructure',sub:'Maintenance & repair',val:'15%',pct:15,bg:'#3A4A3C',tx:'rgba(250,248,243,0.75)'},
    {label:'Medicines',sub:'Drugs & supplies',val:'8%',pct:8,bg:'#5C2A00',tx:'rgba(250,248,243,0.65)'},
    {label:'Equipment',sub:'Capital items',val:'4%',pct:4,bg:'#3D3020',tx:'rgba(250,248,243,0.6)'},
    {label:'Other',sub:'Training etc.',val:'2%',pct:2,bg:'#2A1A0A',tx:'rgba(250,248,243,0.45)'},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="01" title="Ghana Health Budget Utilisation — Where Every Cedi Goes" note="Of Ghana's 6.9% health budget allocation, 71 cents of every cedi pays salaries — leaving 29% for all infrastructure, medicines, equipment, and training for 34 million people. Source: Ghana Ministry of Health; WHO Global Health Expenditure Database 2024."/>
      <div style={{display:'flex',height:'60px',width:'100%',overflow:'hidden',border:`1px solid ${C.border}`}}>
        {chain.map((s,i)=>(
          <div key={i} style={{width:`${s.pct}%`,background:s.bg,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',borderRight:i<4?'1px solid rgba(255,255,255,0.12)':'none',overflow:'hidden',flexShrink:0,padding:'0 4px'}}>
            <span style={{fontFamily:F.mono,fontSize:'clamp(10px,1.3vw,13px)',fontWeight:700,color:s.tx,lineHeight:1,textAlign:'center',whiteSpace:'nowrap'}}>{s.val}</span>
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
        {[{l:'Budget vs Abuja target',v:'6.9% / 15%',vc:C.red},{l:'Non-salary health spend',v:'29% of budget',vc:C.amber},{l:'Catastrophic expenditure',v:'11% households',vc:C.forest}].map((kv,i)=>(
          <div key={i} style={{background:C.paperDark,padding:'8px 12px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint,letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
            <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══ FIG 02 — HEALTH SYSTEM COVERAGE GAPS ════════════════════════════ */
const Fig02CropLoss=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="02" title="Health System Coverage Gaps — Current vs. BRIDGE Target" note="Current coverage rates vs. BRIDGE intervention targets across six critical health metrics. Each gap represents a population of Ghanaians without adequate access. Source: Ghana Health Service Annual Report 2024; WHO; NHIA; BRIDGE Sector Analysis."/>
    <div className="fig-scroll">
      <div style={{minWidth:'560px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'160px 1fr 80px',background:C.forest}}>
          {['Health Metric','Coverage Rate (% of target population reached)','+/− pp Gap'].map((h,i)=>(
            <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
          ))}
        </div>
        {S.coverageGaps.map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'160px 1fr 80px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
            <div style={{padding:'10px 12px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{row.metric}</div>
              <div style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic',lineHeight:1.4,marginTop:'2px'}}>{row.note}</div>
            </div>
            <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`}}>
              <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:`${Math.min(row.cur*1.1,100)}%`,maxWidth:'75%',height:'10px',background:C.amber,borderRadius:'2px',flexShrink:0}}/>
                  <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.amber,flexShrink:0}}>{row.cur}%</span>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>current</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:`${Math.min(row.tgt*1.1,100)}%`,maxWidth:'75%',height:'10px',background:C.lime,borderRadius:'2px',flexShrink:0}}/>
                  <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.positive,flexShrink:0}}>{row.tgt}%</span>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>target</span>
                </div>
              </div>
            </div>
            <div style={{padding:'10px 12px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.red}}>–{(row.tgt-row.cur).toFixed(0)}</span>
              <div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,letterSpacing:'0.5px'}}>pp gap</div>
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
    <FigCaption num="03" title="Diaspora Healthcare Professionals — Distribution by Specialty Group" note="Proportional distribution of Ghana's 15,000+ diaspora healthcare professionals by specialty group. Nursing & Midwifery represents 45% — the highest-volume attrition cohort at 500 emigrating monthly. Source: Ghana Medical Association Diaspora Survey 2025; BRIDGE Diaspora Engagement Analysis 2026."/>
    <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
      <div style={{display:'flex',height:'44px',width:'100%'}}>
        {S.diaspora.map((z,i)=>(
          <div key={i} style={{width:`${z.alloc}%`,background:z.color,display:'flex',alignItems:'center',justifyContent:'center',borderRight:i<3?'1px solid rgba(255,255,255,0.15)':'none',flexShrink:0,overflow:'hidden'}}>
            <span style={{fontFamily:F.mono,fontSize:'clamp(10px,1.4vw,14px)',fontWeight:700,color:i===0?C.ink:C.white,whiteSpace:'nowrap'}}>{z.allocLabel}</span>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',borderTop:`1px solid ${C.border}`}}>
        {S.diaspora.map((z,i)=>(
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
    <FigCaption num="04" title="2026 Health Budget Lines & BRIDGE Partnership Entry Points" note="Key 2026 national health budget lines with BRIDGE partnership mode per item. NHIS recapitalisation at GH₵2.8B is the highest-value entry point. Source: Ghana Ministry of Finance, 2026 Budget Statement; Ministry of Health."/>
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
  const layers=S.coverageLayers;
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="05" title="Population Health Coverage by BRIDGE Intervention Layer" note="Cumulative population coverage gains by stacking BRIDGE health interventions. Baseline: 35% of the target population has adequate access. Full BRIDGE deployment reaches 80% — a 45 percentage point uplift. Source: Ghana Health Service; WHO UHC Index 2024; BRIDGE Health Sector Analysis."/>
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
          {[{l:'Baseline coverage',v:'35%',vc:C.red},{l:'BRIDGE target',v:'80%',vc:C.positive},{l:'Uplift delivered',v:'+45pp',vc:C.lime}].map((kv,i)=>(
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
    {n:'Diaspora Telemedcine',x:310,y:128,r:10,tier:1},{n:'Market Health Services',x:155,y:193,r:7,tier:1},
    {n:'Community Clinic',x:320,y:165,r:13,tier:1},{n:'Retention Fund',x:280,y:252,r:11,tier:1},
    {n:'Community Insurance',x:188,y:180,r:9,tier:1},{n:'CHPS Strengthening',x:328,y:198,r:10,tier:2},
    {n:'HealthTech Portfolio',x:548,y:62,r:9,tier:2},{n:'Medical Emergency',x:162,y:198,r:8,tier:2},
    {n:'Specialized Care Ctr',x:530,y:128,r:15,tier:3},{n:'Nursing School',x:310,y:280,r:12,tier:3},
  ];
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  const tierTx={1:C.ink,2:C.white,3:C.paper};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="06" title="Venture Portfolio Matrix — Risk vs. Return" note="Risk vs. return matrix for 10 of 19 health ventures (those with numeric IRR). Bubble size represents capital required. Tier 1 ventures cluster in the low-to-medium-risk quadrant. Source: BRIDGE Venture Analysis, 2026."/>
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
              <span style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>Bubble size = capital required · Labels 1–10 map to first 10 numeric-IRR health ventures in portfolio table below</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ FIG 07 — HEALTH PORTFOLIO DEPLOYMENT ROADMAP ════════════════════ */
const Fig07Roadmap=()=>{
  const years=['2026','2027','2028','2029','2030+'];
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  const tierTx={1:C.ink,2:C.white,3:C.paper};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="07" title="Health Systems Portfolio — Deployment Roadmap" note="Portfolio deployment roadmap across 3 phases. Phase 1 (Q1–Q4 2026) activates the diaspora registry, telemedicine platform, and market health kiosks. Phase 3 ventures are conditioned on Ministry of Health partnership and network maturity. Source: BRIDGE Operations Planning, 2026."/>
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
              <div style={{width:'40%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.lime,letterSpacing:'1px',borderRight:`1px solid ${C.border}`}}>PHASE 1 · ACTIVATION</div>
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
      <FigCaption num="08" title="Physician Density per 1,000 Population — Ghana vs. Peer Countries (% of WHO Minimum)" note="Physician density as a percentage of the WHO minimum standard of 1.0 per 1,000. Ghana's 0.17 (17% of standard) reflects both the training gap and 56% emigration. BRIDGE's 2030 target of 0.45 is achievable through diaspora activation and retention. Source: WHO Global Health Workforce Statistics; BRIDGE Analysis 2026."/>
      <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{background:C.forest,padding:'8px 14px',display:'grid',gridTemplateColumns:'180px 1fr 60px'}}>
          {['Country / Scenario','Physician Density (% of WHO Minimum Standard)','Score'].map((h,i)=>(
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
          {[{l:'Ghana vs WHO min.',v:'17%',vc:C.red},{l:'BRIDGE 2030 target',v:'45%',vc:C.lime},{l:'Peer median',v:'38%',vc:C.forest}].map((kv,i)=>(
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

/* ═══ FIG 09 — NHIS LEVERAGE STACK ════════════════════════════════════ */
const Fig09CapitalStack=()=>{
  const layers=[
    {label:'Government / NHIS Funding',sub:'Ministry of Health + NHIA recapitalisation',pct:55,ghc:'GH₵2.8B recapitalized',note:'NHIS provider status enables direct reimbursement for BRIDGE clinic consultations',color:C.forest,tx:C.lime},
    {label:'DFI & Development Grants',sub:'Global Fund, World Bank, USAID, GAVI',pct:30,ghc:'~$50–100M aligned',note:'Blended finance layer — concessional capital de-risks clinic and CHPS deployment',color:C.teal,tx:C.paper},
    {label:'BRIDGE Capital',sub:'Private investor equity + impact capital',pct:15,ghc:'$7–30M BRIDGE portfolio',note:'15% of total programme cost — 1:6.7× leverage on every BRIDGE dollar deployed',color:C.lime,tx:C.ink},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="09" title="BRIDGE Health Capital Leverage Stack — NHIS & Development Finance" note="How BRIDGE's health portfolio activates government and development capital. For every $1 of BRIDGE private capital, $6.70 in total programme resources is deployed. NHIS provider status is the critical unlock. Source: Ghana NHIA; World Bank Health Systems Strengthening Programme; BRIDGE Financial Modelling."/>
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
          {[{l:'BRIDGE capital input',v:'$1',vc:C.lime},{l:'Total capital activated',v:'$6.70',vc:C.positive},{l:'NHIS recapitalization',v:'GH₵2.8B',vc:C.forest}].map((kv,i)=>(
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


/* ═══ SECTION REGISTRY ═════════════════════════════════════════════════ */
const SECS=[
  {id:'sec-exec',    label:'Executive Summary'},
  {id:'sec-subs',    label:'Sub-Sectors'},
  {id:'sec-problem', label:'Structural Problem'},
  {id:'sec-brain',   label:'Coverage Gaps & Brain Drain'},
  {id:'sec-diaspora',label:'Diaspora Advantage'},
  {id:'sec-market',  label:'Competitive Landscape'},
  {id:'sec-financing',label:'Health Financing Window'},
  {id:'sec-crosssector',label:'Cross-Sector Integration'},
  {id:'sec-ventures',label:'Venture Portfolio'},
  {id:'sec-roadmap', label:'Deployment Roadmap'},
  {id:'sec-synergy', label:'System Integration'},
  {id:'sec-coinvest',label:'Co-Investment'},
  {id:'sec-risk',    label:'Risk & Thesis'},
  {id:'upsell',      label:'Next Steps'},
];

/* ═══ READING PROGRESS BAR v4 ══════════════════════════════════════════ */
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
      {/* 3px progress line */}
      <div style={{position:'absolute',bottom:0,left:0,height:'3px',width:`${pct}%`,background:C.lime,transition:'width 0.1s linear',pointerEvents:'none'}}/>
      <div style={{display:'flex',alignItems:'center',gap:'10px',minWidth:0,overflow:'hidden'}}>
        {/* Spring easing on logo reveal */}
        <div style={{overflow:'hidden',maxWidth:logoVisible?'180px':'0',opacity:logoVisible?1:0,transition:'max-width 0.38s cubic-bezier(0.16,1,0.3,1),opacity 0.3s ease',display:'flex',alignItems:'center',flexShrink:0}}>
          <Logo height={19} variant="dark"/>
          <div style={{width:'1px',height:'15px',background:C.border,margin:'0 12px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Sector Brief · Health Systems & Wellbeing · Core Tier · March 2026</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>03 · Health Systems</span>
        {/* Live reading % — desktop only, after 5% scroll */}
        {pct>5&&<span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,marginLeft:'4px',flexShrink:0}}>{pctRounded}%</span>}
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center',flexShrink:0}}>
        <a href="#" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none',letterSpacing:'0.2px'}}>All Sectors →</a>
        <a href="#upsell" className="cta-primary" style={{background:C.forest,color:C.lime,padding:'7px 16px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.5px'}}>Full Package →</a>
      </div>
    </div>
  );
};

/* ═══ SECTION FOOTER NAV v4 ═════════════════════════════════════════════ */
const SectionFooterNav=()=>{
  const[active,setActive]=useState(0);
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{if(e.isIntersecting){const idx=SECS.findIndex(s=>s.id===e.target.id);if(idx>=0)setActive(idx);}});
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

/* ═══ CAROUSEL (mobile-only swipe + dots) v4 ═══════════════════════════ */
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
        {items.map((item,i)=>(<div key={i} className={cardClass} style={{paddingBottom:'2px'}}>{renderCard(item,i)}</div>))}
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

/* ═══ SECTION HEADER (mobile accordion trigger) v4 ═════════════════════ */
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

/* ═══ MOBILE EXPAND/COLLAPSE ALL BAR v4 ════════════════════════════════ */
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
      {/* Ghost watermark — display font, large, very low opacity */}
      <div style={{position:'absolute',right:'32px',top:'-8px',fontFamily:F.display,fontSize:'clamp(100px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.022)',lineHeight:1,userSelect:'none',pointerEvents:'none',letterSpacing:'-6px'}}>03</div>
      {/* Dot grid texture */}
      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)',backgroundSize:'28px 28px',pointerEvents:'none'}}/>
      <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
        {/* Logo row */}
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
        {/* Sector badge */}
        <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'22px'}}>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:800,padding:'5px 12px',letterSpacing:'1.5px'}}>SECTOR 03 OF 12</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.07)'}}/>
        </div>
        {/* Headlines */}
        <h1 style={{fontFamily:F.display,fontSize:'clamp(36px,6vw,78px)',fontWeight:900,color:C.paper,lineHeight:0.95,letterSpacing:'-2.5px',marginBottom:'8px'}}>Health Systems</h1>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,4vw,52px)',fontWeight:700,color:'rgba(250,248,243,0.38)',lineHeight:1,letterSpacing:'-1.5px',marginBottom:'20px'}}>&amp; Wellbeing</h2>
        <p style={{fontFamily:F.body,fontSize:'clamp(13px,1.6vw,16px)',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.7,maxWidth:'560px',marginBottom:'0'}}>{S.tagline}</p>
        {/* Stats strip */}
        <div className="cover-stats stats-row" style={{display:'flex',gap:'0',borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'28px',flexWrap:'wrap'}}>
          {/* Score box — lime-tinted bg, always visible */}
          <div style={{background:'rgba(184,217,53,0.07)',padding:'20px 24px',minWidth:'170px',borderRight:'1px solid rgba(255,255,255,0.06)',flex:'0 0 170px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'10px'}}>BRIDGE Impact Score™</div>
            <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'10px'}}>
              <span style={{fontFamily:F.mono,fontSize:'52px',fontWeight:400,color:C.lime,lineHeight:1}}>{S.score}</span>
              <span style={{fontFamily:F.mono,fontSize:'13px',color:'rgba(184,217,53,0.4)'}}>/100</span>
            </div>
            {/* Animated score bar */}
            <div style={{height:'3px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',marginBottom:'7px',overflow:'hidden'}}>
              <div className="score-bar" style={{'--w':`${S.score}%`,height:'100%',width:`${S.score}%`,background:C.lime,borderRadius:'2px'}}/>
            </div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>Core Tier</div>
          </div>
          {/* 4 stat cells: .hm hides tablet+, .mob-stat shows mobile 2×2 */}
          {S.stats.map((d,i)=>(
            <div key={i} className="hm mob-stat" style={{padding:'20px 22px',borderRight:i<3?'1px solid rgba(255,255,255,0.06)':'none',flex:1,minWidth:0,display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.22)',marginBottom:'10px',lineHeight:1.4}}>{d.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'clamp(15px,2vw,22px)',color:C.paper,lineHeight:1,fontWeight:400}}>{d.v}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Solid lime stripe — no gradient */}
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
        <SecHdr num="00" label="Executive Summary" badge={`Score ${S.score}`} hint="1:6,000 physician ratio · 15,000+ diaspora clinicians · 82/100 BRIDGE Impact Score" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
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
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Health Systems Sector Assessment, 2026</span>
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
              <div key={i} className="row-hover" style={{display:'flex',justifyContent:'space-between',padding:'7px 10px',marginLeft:'-10px',marginRight:'-10px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?'transparent':C.paperDark}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{s.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{s.v}</span>
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
        <SecHdr num="00" label="Sub-Sector Landscape" badge="6 sub-sectors" hint="Diaspora Telemedicine 88 · Community Health 85 · Workforce Retention 84 — 6 sub-sectors scored" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
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
              <div key={i} className="row-hover" style={{display:'grid',gridTemplateColumns:'2fr 70px 110px 90px 1.5fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
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
        <SecHdr num="01" label="The Structural Problem" badge="6 Constraints" hint="Physician shortage · brain drain · NHIS fragility · geographic barriers · catastrophic expenditure" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 01 — The Structural Challenge</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>1:6,000 physician ratio · 56% trained doctors abroad</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>A Structural Crisis — and a Structural Opportunity</h2>
        <Fig01ValueChain/>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px',marginBottom:'28px'}} className="tc">
          <div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana's health system faces a crisis that is structural, not incidental. The physician-to-population ratio stands at 1:6,000 — six times worse than the WHO minimum of 1:1,000. Approximately 56% of Ghanaian-trained doctors practice abroad, and an estimated 500 nurses emigrate monthly. The result is a system where patients wait months for specialist consultations, maternal mortality remains at 310 per 100,000 live births, and mental health coverage reaches just 1 psychiatrist per 1.5 million people.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana's health budget allocation of 6.9% — well below the 15% Abuja Declaration target — is consumed 71% by salaries alone, leaving infrastructure, equipment, and medicines chronically underfunded. Eleven percent of Ghanaian households face catastrophic health expenditure; in 2012 that figure was 1%. The deterioration is measurable and accelerating.</p>
            <div style={{background:C.forest,padding:'16px 20px',marginTop:'8px'}}>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.7}}>The opportunity is equally structural. Ghana has 15,000+ diaspora healthcare professionals — physicians, nurses, and specialists — who retain deep connections to their homeland and consistently express desire to contribute beyond remittances. The technology infrastructure for telemedicine is operational. The community health system has a physical footprint reaching rural Ghana.</p>
              <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>The Diaspora Opportunity</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',alignContent:'start'}}>
            {[{v:'1:6,000',l:'Physician\nratio'},{v:'56%',l:'Doctors\nabroad'},{v:'310',l:'Maternal deaths\nper 100K'},{v:'11%',l:'Catastrophic\nhealth spend'}].map((s,i)=>(
              <div key={i} style={{background:C.ink,padding:'14px 12px',textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'clamp(16px,2.2vw,24px)',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'5px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',whiteSpace:'pre-line',lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>The Health System Constraint Stack</div>
        {/* Mobile carousel */}
        <Carousel items={S.constraints} darkBg={false} wrapClass="car-wrap" renderCard={(row,i)=>(
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
            <div key={i} className={i>=1?open?'':'mob-item-hidden':''} className="row-hover" style={{display:'grid',gridTemplateColumns:'160px 1fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
              <div style={{padding:'10px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{row.c}</div>
              <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55,borderLeft:`1px solid ${C.border}`}}>{row.harm}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:'12px',borderLeft:`4px solid ${C.lime}`,paddingLeft:'16px'}}>
          <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>The crisis is not a shortage of willing healthcare workers — it is a system that fails to retain the professionals it trains and fails to deploy the 15,000+ diaspora clinicians who want to help.</p>
          <div style={{marginTop:'8px',display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'14px',height:'1px',background:C.lime}}/>
            <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Health Systems Sector Analysis, 2026</span>
          </div>
        </div>
        {/* Diaspora Readiness — Members Exclusive */}
        <div style={{marginTop:'28px',border:`2px solid ${C.forest}`,overflow:'hidden'}}>
          <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · Diaspora Readiness Analysis</div>
              <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Ghana's 15,000+ Diaspora Healthcare Professionals — Readiness Breakdown</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'24px',color:C.lime}}>15K+</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'1px',textTransform:'uppercase'}}>diaspora clinicians</div></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',borderTop:`1px solid rgba(255,255,255,0.06)`}} className="tc">
            {S.diaspora.map((grp,i)=>(
                <div key={i} style={{padding:'14px 18px',borderRight:i<3?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
                  <div style={{width:'24px',height:'4px',background:grp.color,marginBottom:'8px'}}/>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'4px'}}>{grp.zone}</div>
                  <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:500,color:grp.color,marginBottom:'4px'}}>{grp.allocLabel}</div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'0.5px',marginBottom:'6px'}}>{grp.regions}</div>
                  <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5}}>{grp.context}</div>
                </div>
              ))}
          </div>
          <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
            <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.6,margin:0}}>BRIDGE's Diaspora Healthcare Registry activates the verified, willing cohort in Phase 1. The CME Platform and Return Pathway convert passive diaspora members into active contributors in Phase 2. The 15,000+ total represents the full addressable workforce pipeline — the most significant health system asset Ghana already owns.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ CROP ANALYSIS ══════════════════════════════════════════════════════ */
const BrainDrain=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-brain" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="02" label="Coverage Gaps & Brain Drain" badge="500/mo emigrating" hint="Coverage metrics vs targets · brain drain pipeline · maternal mortality vs SDG goal" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div className="sec-rule mob-hide"/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 02 — Coverage Gaps & Brain Drain</div>
        <div style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>500/mo emigrating · 6 metrics tracked</div>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Brain Drain — 500 Nurses Leave Every Month</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana's brain drain in healthcare is not a random flow — it is a structured pipeline. Ghanaian medical and nursing graduates are actively recruited by the NHS, the US, Canada, and Gulf states. A Ghanaian nurse earns roughly GH₵3,000–5,000 monthly ($200–350); the same qualification earns $4,000–6,000 in the UK. The system cannot retain what it trains.</p>
      <Fig02CropLoss/>
      {/* NHIS Reform Window Callout */}
      <div style={{border:`2px solid ${C.forest}`,overflow:'hidden',marginBottom:'20px'}}>
        <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.amber,marginBottom:'3px'}}>◆ Members Intelligence · NHIS Reform & Reimbursement Window</div>
            <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>NHIS Recapitalisation — Timeline &amp; BRIDGE Entry Points</div>
          </div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.sans,fontSize:'9px',fontWeight:800,padding:'3px 10px',letterSpacing:'1px',textTransform:'uppercase',flexShrink:0}}>Q2 2026 WINDOW</div>
        </div>
        <div style={{background:'rgba(13,26,16,0.85)'}}>
          {S.nhisDetails.map((ev,i)=>{
            return(
              <div key={i} style={{display:'grid',gridTemplateColumns:'140px 1fr',borderBottom:i<S.nhisDetails.length-1?'1px solid rgba(255,255,255,0.07)':'none',alignItems:'start'}}>
                <div style={{padding:'10px 14px',borderRight:'1px solid rgba(255,255,255,0.07)'}}>
                  <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime}}>{ev.f}</span>
                </div>
                <div style={{padding:'10px 14px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:C.paper,marginBottom:'0'}}>{ev.t}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6,margin:0}}>The NHIS recapitalisation window is BRIDGE's primary policy entry point. NHIS provider registration enables direct reimbursement for all clinic and telemedicine consultations — converting what would be grant-dependent operations into sustainable revenue-generating health ventures. The Q2 2026 enrollment cycle sets reimbursement rates for the following year.</p>
        </div>
      </div>
      {/* Market Sizing */}
      <div style={{marginBottom:'20px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{background:C.forest,padding:'8px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>◆ Health Sector — Venture Market Sizing</div>
          <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>Sub-sector · Market Size · BRIDGE Entry Point</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 70px 70px 80px',background:C.ink}}>
          {['Sub-Sector / Venture','Description','BRIDGE Entry Point','Cap. Range','Phase'].map((h,i)=>(
            <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',borderLeft:i>0?'1px solid rgba(255,255,255,0.06)':'none'}}>{h}</div>
          ))}
        </div>
        {S.subs.map((row,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 80px 60px',borderBottom:i<S.subs.length-1?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
              <div style={{padding:'10px 12px'}}>
                <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{row.name}</div>
                <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,marginTop:'2px'}}>{row.score}/100</div>
              </div>
              <div style={{padding:'10px 12px',fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{row.note}</div>
              <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest}}>{row.stage}</div>
              </div>
              <div style={{padding:'10px 10px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.teal,borderLeft:`1px solid ${C.border}`}}>{row.capital}</div>
              <div style={{padding:'10px 10px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
                <div style={{width:'100%',background:C.border,height:'4px',borderRadius:'2px'}}><div style={{width:row.score+'%',height:'100%',background:C.lime,borderRadius:'2px'}}/></div>
              </div>
            </div>
          ))}
        <div style={{padding:'8px 14px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
          <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>Sub-sector scores use BRIDGE Impact Score™ methodology across 4 dimensions. Capital ranges are indicative for Phase 1 deployment. Source: BRIDGE Health Systems Sector Analysis 2026; Ghana Health Service; WHO.</span>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginTop:'4px'}} className="tc">
        {[
          {title:'The Physician Density Crisis',body:'Ghana has 0.17 physicians per 1,000 people — 17% of the WHO minimum standard of 1.0. Rwanda has reached 0.84 through a sustained health worker acceleration strategy. Kenya, with similar brain drain challenges, has reached 0.22. BRIDGE\'s target of 0.45 by 2030 is achievable through diaspora activation and the Healthcare Worker Retention Fund — not by building new medical schools.'},
          {title:'Brain Drain — A Structured Pipeline',body:'The emigration of Ghanaian healthcare professionals is not random attrition — it is a structured recruitment pipeline. The NHS and US healthcare system actively target Ghanaian graduates. A Ghanaian nurse earns $200–350/month; the same qualification earns $4,000–6,000 in the UK. BRIDGE\'s retention fund changes the calculation: salary supplement + housing + career pathway = a decision to stay becomes economically rational.'},
          {title:'Maternal Mortality — The Measurable Gap',body:'Ghana\'s maternal mortality rate of 310 per 100,000 live births is 4.4× the SDG 2030 target of 70. Only 53.7% of births have skilled attendance against a 65% national target. The CHPS Strengthening Programme and Maternal Health Telemedicine venture — diaspora obstetricians supporting community health workers at the moment of delivery — directly address this gap.'},
          {title:'NHIS — The Coverage Illusion',body:'Ghana\'s National Health Insurance Scheme covers 68% of the population on paper. Active membership is approximately 42% of the enrolled total. Providers who cannot rely on timely reimbursement exit the scheme — degrading coverage precisely for the lowest-income households it was designed to protect. BRIDGE\'s community insurance product fills the co-pay and exclusion gaps that NHIS leaves unaddressed.'},
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
const DiasporaAdvantage=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-diaspora" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="03" label="The Diaspora Advantage" badge="15,000+ clinicians" hint="Nursing 45% · Physicians 32% · specialty breakdown · BRIDGE activation pathway" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 03 — The Diaspora Advantage</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>4 specialty groups profiled</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Four Specialty Groups, Four Activation Strategies</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana's 15,000+ diaspora healthcare professionals are not a uniform cohort. They differ by specialty, location, engagement readiness, and impact leverage. BRIDGE's activation strategy maps each group to the specific ventures where their skills create the most measurable change — from telemedicine to retention to education.</p>
        <Fig03ZoneAllocation/>
        {/* Mobile zone carousel */}
        <Carousel items={S.diaspora} wrapClass="car-wrap" renderCard={(z,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden',height:'100%'}}>
            <div style={{background:z.color,padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:i===0?C.ink:C.white,lineHeight:1.2}}>{z.zone}</div>
              <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:i===0?C.ink:C.white}}>{z.allocLabel}</div>
            </div>
            <div style={{padding:'14px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'3px'}}>Specialty areas</div>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.ink,fontStyle:'italic',marginBottom:'10px'}}>{z.crops}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'3px'}}>Primarily in</div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,marginBottom:'10px'}}>{z.regions}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'4px'}}>BRIDGE activation</div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.55,fontStyle:'italic',marginBottom:'8px'}}>{z.interventions}</div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontStyle:'italic',color:C.faint,borderTop:`1px solid ${C.border}`,paddingTop:'8px',lineHeight:1.5}}>{z.context}</div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>All 4 zone strategies</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div className="hm" style={{display:'grid',gridTemplateColumns:'1fr 1fr 70px 1.5fr 1fr',background:C.ink}}>
            {['Specialty Group','Specialty / Role','Share','BRIDGE Programs','Context'].map((h,i)=><div key={i} style={{padding:'8px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.08)':'none'}}>{h}</div>)}
          </div>
          {S.diaspora.map((z,i)=>(
            <div key={i} className={i>=1?open?'':'mob-item-hidden':''} style={{display:'grid',gridTemplateColumns:'1fr 1fr 70px 1.5fr 1fr',borderBottom:i<3?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}} id={`zone-row-${i}`}>
              <div style={{padding:'12px 12px'}}><div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{z.zone}</div><div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic'}}>{z.regions}</div></div>
              <div style={{padding:'12px 12px',fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{z.crops}</div>
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
        <SecHdr num="04" label="Competitive Landscape" badge="40+ HealthTech cos" hint="6 key players profiled · BRIDGE positioning vs mPharma, Helium Health, PIH and more" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 04 — Competitive Landscape</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Is Already in the Field</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'16px',fontStyle:'italic'}}>Africa's digital health sector attracted $800 million+ across 2024. Ghana has 40+ active health technology companies — telemedicine platforms, EHR systems, pharmaceutical supply chains, and diagnostic tools. BRIDGE's strategy is to identify gaps these companies cannot fill and integrate promising platforms into BRIDGE-operated ventures.</p>
        <div style={{background:C.forest,padding:'14px 20px',marginBottom:'20px'}}>
          <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.65}}>HealthTech companies solve information asymmetries and platform gaps. Development agencies build programs without sustainability. Neither builds the combined physical + diaspora + financial infrastructure that the health system actually requires. <strong style={{color:C.lime}}>BRIDGE operates at the activation layer that technology companies cannot reach and development agencies will not sustain.</strong></p>
        </div>
        {/* Mobile competitor carousel */}
        <Carousel items={S.competitors} cardClass="mob-snap-wide" wrapClass="car-wrap-dark" renderCard={(co,i)=>(
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
const HealthFinancing=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-financing" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="05" label="Health Financing Window" badge="★★★★☆" hint="NHIS recapitalisation GH₵2.8B · 1:6.7× leverage · Q2 2026 NHIS reform · MoH partnership" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 05 — Health Financing Window</div>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.sans,fontSize:'9px',fontWeight:800,padding:'3px 10px',letterSpacing:'1px'}}>★★★★★ BUDGET ALIGNMENT</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The 2026 Budget Alignment</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana's 2026 health budget creates an alignment moment for BRIDGE. The GH₵2.8B NHIS recapitalisation, GH₵890M CHPS expansion, and GH₵620M Human Resource for Health line are direct entry points — with a 1:6.7× leverage ratio for private capital.</p>
        <Fig04Budget/>
        <div style={{border:`2px solid ${C.lime}`,overflow:'hidden',marginTop:'4px'}}>
          <div style={{background:C.ink,padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px'}}>Time-Sensitive — Q2 2026 Deadline</div>
              <div style={{fontFamily:F.display,fontSize:'clamp(14px,2vw,20px)',fontWeight:700,color:C.paper}}>NHIS Reform Window — Full Terms</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'28px',fontWeight:500,color:C.lime,lineHeight:1}}>1:6.7×</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.3)',letterSpacing:'1px',textTransform:'uppercase'}}>leverage ratio</div></div>
          </div>
          <button className="mob-toggle mob-toggle-hdr" onClick={()=>setOpen(o=>!o)} style={{width:'100%',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',display:'block',padding:'0'}}>
            <div style={{display:'flex',justifyContent:'space-between',padding:'8px 14px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(13,26,16,0.7)'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.3)',textTransform:'uppercase'}}>Feature</span>
              <span style={{display:'flex',gap:'40px'}}><span className="mob-show" style={{display:'none',fontSize:'10px',color:'rgba(184,217,53,0.5)',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.3)',textTransform:'uppercase'}}>Terms</span></span>
            </div>
          </button>
          {S.nhisDetails.map((row,i)=>(
            <div key={i} className={i>=2?open?'':'mob-item-hidden':''} style={{display:'flex',justifyContent:'space-between',padding:'10px 14px',borderBottom:i<6?'1px solid rgba(255,255,255,0.06)':'none',background:'rgba(13,26,16,0.75)',flexWrap:'wrap',gap:'4px'}}>
              <span style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.4)'}}>{row.f}</span>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,textAlign:'right',maxWidth:'60%'}}>{row.t}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:'16px',padding:'14px 18px',background:C.paperDark,border:`1px solid ${C.border}`}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>NHIS Recapitalisation — Reform Window</div>
          <p style={{fontFamily:F.body,fontSize:'13px',color:C.muted,lineHeight:1.65,fontStyle:'italic'}}>The 2026 NHIS recapitalisation of GH₵2.8B is the single largest opportunity in the health portfolio. NHIS provider status enables BRIDGE clinics and telemedicine platforms to receive direct reimbursement — converting what would be grant-dependent operations into sustainable, revenue-generating health ventures from day one.</p>
        </div>
        <Fig09CapitalStack/>
      </div>
    </div>
    </div>
  );
};

/* ═══ FARMER INCOME ══════════════════════════════════════════════════════ */
const CrossSectorIntegration=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-crosssector" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="06" label="Cross-Sector Integration" badge="35% → 80%" hint="Coverage improvement by intervention layer · physician density benchmarks · health-to-productivity link" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div className="sec-rule mob-hide"/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 06 — Cross-Sector Integration</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Health as Productivity Infrastructure</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Each BRIDGE intervention layer stacks — the full deployment raises population health coverage from 35% to 80%. Every sick market trader is a lost productive day. Every catastrophic health expense is a loan default, a business closure, a family set back years.</p>
      <Fig05Income/>
      <Fig08Benchmarks/>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'32px'}} className="tc">
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',paddingTop:'2px'}}>
          <p style={{fontFamily:F.display,fontSize:'18px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"When a market trader's child receives a BRIDGE kiosk vaccination, that is not just a health outcome — it is a school enrollment, a future worker, a household that does not face catastrophic expenditure when illness strikes. Health is not separate from economic development. It is its foundation."</p>
          <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'18px',height:'1px',background:C.lime}}/>
            <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE PBC Health Systems Sector Investment Thesis</span>
          </div>
        </div>
        <div style={{background:C.ink,padding:'18px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Data Sources</div>
          {[{l:'Coverage baseline',v:'Ghana Health Service'},{l:'WHO UHC Index',v:'2024 report'},{l:'Telemedicine uplift',v:'PIH Rwanda model'},{l:'Target validation',v:'USAID Global Health'},{l:'Population in portfolio',v:'34M across 4 regions'}].map((row,i)=>(
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
    <div className="row-hover" style={{display:'grid',gridTemplateColumns:'28px 2fr 88px 80px 70px 70px 70px 70px',borderBottom:!last?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
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
        <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.lime}}>{v.num}</span>
        <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,padding:'2px 7px',background:MODE_BG[v.mode]||C.muted,color:MODE_TX[v.mode]||C.paper,letterSpacing:'0.3px'}}>{v.mode}</span>
      </div>
      <div style={{padding:'12px'}}>
        <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'8px',lineHeight:1.3}}>{v.name}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'4px'}}>
          <span style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:C.forest}}>{v.capital}</span>
          <span style={{fontFamily:F.mono,fontSize:'11px',color:C.positive}}>{v.irr}</span>
        </div>
        <div style={{height:'1px',background:C.border,marginBottom:'8px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[v.risk]||C.muted,border:`1px solid ${RISK_COLOR[v.risk]||C.muted}`,padding:'1px 6px'}}>{v.risk}</span>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,letterSpacing:'0.5px',textTransform:'uppercase'}}>Start</div>
            <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.muted}}>{v.start}</div>
          </div>
        </div>
      </div>
    </div>
  );
  return(
    <div id="sec-ventures" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="07" label="Venture Portfolio" badge="19 ventures" hint="7 Tier 1 ventures · Q1 2026 deployment · Diaspora Registry, Telemedicine, Market Kiosks, Retention Fund" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 07 — The Health Portfolio</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'5px 14px',letterSpacing:'1px'}}>19 ventures · $7–30M total</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>19 Ventures Across 3 Tiers</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced by urgency, leverage, and clinical dependency — Tier 1 builds the diaspora, insurance, and clinic infrastructure that Tier 2 and 3 require. The sequencing is deliberate: registry and credentialing before telemedicine; community insurance before clinic network; kiosks before specialized care.</p>
        <Fig06Matrix/>
        {/* Tier 1 */}
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 1</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Priority Implementation — 2026–2028</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$4.2–9.2M · 7 ventures</span>
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
          <Carousel items={t1} renderCard={(v,i)=><MCard v={v}/>} cardClass="mob-snap-sm" wrapClass="car-wrap"/>
        </div>
        {/* Tier 2 */}
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.amber,color:C.white,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 2</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Scale Phase — 2027–2029</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$2.2–6.8M · 6 ventures</span>
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
          <Carousel items={t2} renderCard={(v,i)=><MCard v={v}/>} cardClass="mob-snap-sm" wrapClass="car-wrap"/>
        </div>
        {/* Tier 3 */}
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.muted,color:C.paper,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 3</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Maturity / Conditional — 2029+</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$12–34M · 6 ventures</span>
          </div>
          <div className="subs-table">
            <div className="fig-scroll"><div style={{minWidth:'700px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
              <TH/>
              {t3.map((v,i)=><VRow key={i} v={v} i={i} last={i===t3.length-1}/>)}
            </div></div>
          </div>
          <Carousel items={t3} renderCard={(v,i)=><MCard v={v}/>} cardClass="mob-snap-sm" wrapClass="car-wrap"/>
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
        <SecHdr num="08" label="Deployment Roadmap" badge="3 phases" hint="Q1 2026: Registry + Market Kiosks · Q2: Telemedicine + Retention Fund · Phase 3 conditioned" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 08 — Implementation</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Deployment Roadmap</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced deployment built around the 2026 NHIS reform cycle and budget alignment. Phase 1 is the critical window — the NHIS recapitalisation, Medical Council licensing, and MoH partnership MOU converge in Q1–Q2 2026.</p>
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
            {[{m:'Diaspora Telemedicine Platform',d:'Medical and Dental Council licensing confirmed + GMA diaspora registry signed'},
              {m:'Community Health Insurance',d:'NHIS provider registration + insurance product actuarial model signed'},
              {m:'Healthcare Worker Retention Fund',d:'MoH co-funding MOU + 3-year service contract templates finalised'},
              {m:'Phase 2 Scale Ventures',d:'Phase 1 platform and network proven + NHIS reimbursement model validated'}
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
        <SecHdr num="◆" label="Co-Investment" badge="6 actors" hint="USAID, Global Fund, World Bank, GAVI, Gates Foundation, Mastercard — capital types and alignment" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>◆ Members Intelligence · Co-Investment Landscape</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 key actors profiled</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Else Is Investing — and Where BRIDGE Fits</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Ghana's health investment landscape is significant — but structurally fragmented. The Global Fund, World Bank, USAID, and GAVI collectively deploy hundreds of millions annually in Ghana. Yet development capital without private sector operational management produces programmes, not ventures. BRIDGE occupies the anchor role that most donors cannot fill: operational management, equity stake, diaspora mobilisation, and long-term accountability for returns.</p>
        <div style={{background:C.paperDark,padding:'14px 20px',border:`1px solid ${C.border}`,marginBottom:'20px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>BRIDGE's Co-Investment Positioning</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}} className="tc">
            {[
              {l:'What DFIs provide',v:'Concessional capital, grants, and technical assistance — but cannot operate health ventures or activate diaspora'},
              {l:'What Development Agencies provide',v:'Health programmes and technical assistance — but cannot sustain operations or deliver investor returns'},
              {l:'What BRIDGE provides',v:'Private equity anchor, diaspora mobilisation, venture operations, and long-term accountability for returns'},
            ].map((p,i)=>(
              <div key={i} style={{padding:'10px 12px',background:C.paper,border:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>{p.l}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.55,fontStyle:'italic'}}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile co-investor carousel */}
        <Carousel items={S.coInvestors} cardClass="mob-snap-wide" wrapClass="car-wrap" renderCard={(co,i)=>(
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
            <div key={i} className={i>=2?open?'':'mob-item-hidden':''} className="row-hover" style={{display:'grid',gridTemplateColumns:'160px 70px 1fr 110px 100px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'start'}}>
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
        <div style={{marginTop:'14px',borderLeft:`4px solid ${C.lime}`,paddingLeft:'16px'}}>
          <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>BRIDGE's blended finance architecture is designed to complement these actors, not compete with them. The correct co-investment sequence: BRIDGE equity anchor → DFI concessional layer → NHIS reimbursement stream → government co-financing. This stacking structure maximises leverage and aligns every stakeholder's incentive with BRIDGE's long-term portfolio returns.</p>
          <div style={{marginTop:'8px',display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'14px',height:'1px',background:C.lime}}/>
            <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Health Systems Co-Investment Analysis, 2026</span>
          </div>
        </div>
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
        <SecHdr num="10" label="System Integration" badge="8 sector links" hint="Health links Financial Inclusion, Infrastructure, Agriculture, Education, Technology and more" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'24px',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Section 10 — System Integration</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.ink}}>Health as the Cross-Sector Foundation</h2>
          </div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'6px 14px',letterSpacing:'1px',flexShrink:0}}>8 sector links</div>
        </div>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Health is the foundation every other sector depends on. Sick workers cannot operate cold storage facilities. Households facing catastrophic health expenditure cannot access financial products. Market traders who lose earnings to illness cannot repay agricultural loans. When BRIDGE activates health infrastructure alongside market, financial, and agricultural investments, each sector's returns compound through the others.</p>
        {/* Mobile synergy carousel */}
        <Carousel items={S.synergies} wrapClass="car-wrap" renderCard={(syn,i)=>(
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
        <SecHdr num="09" label="Risk & Thesis" badge="6 risk categories" hint="Regulatory, brain drain, NHIS delays, diaspora attrition, liability, policy — with BRIDGE mitigation" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 09 — Risk Analysis</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Risk &amp; Mitigation</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Health investment carries structural risks — regulatory complexity, diaspora engagement uncertainty, and NHIS dependence are all real. BRIDGE's portfolio structure, blended finance architecture, and diaspora-led model are each designed to manage a specific risk category. No single risk is unmitigated.</p>
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
            <div key={i} className={i>=1?open?'':'mob-item-hidden':''} className="row-hover" style={{display:'grid',gridTemplateColumns:'1.8fr 100px 2.5fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'start'}}>
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
    {item:'19-Venture Financial Models',detail:'Complete 10-year projections — NHIS reimbursement scenarios, diaspora fee modeling, insurance premium analysis, IRR sensitivity tables.'},
    {item:'Community Clinic Network Deployment Plan',detail:'Site selection criteria, GHS partnership terms, staffing models, diaspora rotation schedule, NHIS provider registration process.'},
    {item:'Diaspora Healthcare Registry Platform',detail:'Technical specifications, GMA partnership framework, credentialing workflow, outreach strategy for 15,000+ clinician database.'},
    {item:'Telemedicine Regulatory Compliance Guide',detail:'Medical and Dental Council licensing pathway, liability structure, malpractice framework, NHIS billing protocol for teleconsultations.'},
    {item:'NHIS Provider Registration Guide',detail:'Step-by-step NHIS provider status application, Medical and Dental Council licensing pathway, MoH MOU template.'},
    {item:'Healthcare Worker Retention Fund Design',detail:'Compensation benchmarking against NHS/USA offers, MoH co-funding negotiation playbook, 3–5 year service contract templates.'},
    {item:'HealthTech Portfolio Assessment',detail:'40+ Ghana health startups with investment criteria, technical readiness scoring, BRIDGE partnership potential and pipeline shortlist.'},
    {item:'CHPS Strengthening Deployment Plan',detail:'50-compound rollout, equipment lists, telemedicine integration specifications, GHS volunteer training curriculum.'},
    {item:'Health Coverage Simulation Tool',detail:'Population coverage model by intervention layer and region — customisable by zone, built for due diligence.'},
    {item:'Specialized Care Center Feasibility Study',detail:'Location analysis, dialysis/oncology/cardiac costing, NHIS payment model, operational sustainability projections.'},
    {item:'Maternal Mortality Intervention Protocol',detail:'Community-level skilled attendance pathway, CHPS delivery support guidelines, diaspora midwife teleconsultation protocol.'},
    {item:'Quarterly Health Intelligence Updates',detail:'Diaspora engagement tracking, NHIS reform status, regulatory changes, venture pipeline updates — every quarter.'},
  ];

  const partnershipPhases=[
    {phase:'01',title:'Mandate Alignment',dur:'2–3 hrs',desc:'BRIDGE maps your capital profile and risk parameters against the Health Systems portfolio. Honest assessment of fit — no pitch.'},
    {phase:'02',title:'Bespoke Intelligence Build',dur:'4–6 wks',desc:'Custom venture financial models, NHIS reimbursement analysis, and co-investment capital stack built around your mandate.'},
    {phase:'03',title:'Market Access',dur:'Ongoing',desc:'Direct MoH and Medical Council introductions, diaspora professional network access, NHIS navigator, co-investor introductions.'},
    {phase:'04',title:'Deal Origination',dur:'Rolling',desc:'Into opportunities before market-ready — at founder terms, with BRIDGE operational management. You bring capital. We bring Ghana.'},
  ];

  const intentCopy={
    package:{
      label:'Full Intelligence Package',
      sub:'Operational tools built for your process',
      cta:'Request Package Scope',
      href:'mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Health Systems Sector',
    },
    partnership:{
      label:'Partnership Engagement',
      sub:'BRIDGE at the table with you',
      cta:'Start the Conversation',
      href:'mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Health Systems',
    },
    briefing:{
      label:'30-Min Briefing',
      sub:'No commitment — we figure out fit first',
      cta:'Schedule Now →',
      href:'mailto:intelligence@bridgepbc.com?subject=Briefing Request — Health Systems Sector',
    },
  };

  return(
    <div id="upsell" style={{background:C.ink,position:'relative',overflow:'hidden'}}>

      {/* Ghost watermark */}
      <div style={{position:'absolute',right:'-20px',top:'40px',fontFamily:F.display,fontSize:'clamp(100px,20vw,280px)',fontWeight:900,color:'rgba(255,255,255,0.018)',pointerEvents:'none',userSelect:'none',letterSpacing:'-10px',lineHeight:1}}>03</div>

      {/* ── Membership bar ── */}
      <div style={{background:'rgba(184,217,53,0.06)',borderBottom:'1px solid rgba(184,217,53,0.1)',padding:'9px 64px'}} className="pad-topbar">
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{position:'relative',width:'8px',height:'8px',flexShrink:0}}>
                  <div style={{position:'absolute',inset:0,borderRadius:'50%',background:C.lime,opacity:0.3,animation:'barGrow 2s ease-in-out infinite'}}/>
                  <div style={{position:'absolute',inset:'1px',borderRadius:'50%',background:C.lime}}/>
                </div>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>Members Access Active</span>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.2)'}}>· Sector 03 of 12 · Full edition included</span>
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

          {/* ── Intent selector — 3 buttons (SVG stroke icons per skill spec) ── */}
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

          {/* ── Intent detail panel ── */}
          {intent==='package'&&(
            <div style={{border:'1px solid rgba(184,217,53,0.2)',background:'rgba(184,217,53,0.04)',marginBottom:'20px',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(184,217,53,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.lime,marginBottom:'2px'}}>Full Intelligence Package — Health Systems Sector</div>
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
                <a href="mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Health Systems Sector"
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
                <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.3)'}}>Starts with a conversation. If fit isn't there, we'll tell you directly.</span>
                <a href="mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Health Systems"
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
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.65}}>Tell us your capital profile and sector focus. We'll show you exactly which of the 19 Health Systems ventures match your mandate — and be direct if the fit isn't there. Takes 30 minutes. No pitch deck.</div>
              </div>
              <a href="mailto:intelligence@bridgepbc.com?subject=Briefing Request — Health Systems Sector"
                className="cta-primary" style={{background:C.lime,color:C.ink,padding:'14px 28px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',flexShrink:0,display:'flex',alignItems:'center',gap:'8px'}}>
                Schedule Now <span style={{fontSize:'16px'}}>→</span>
              </a>
            </div>
          )}

          {/* ── Urgency strip — always visible ── */}
          <div style={{border:`1px solid ${C.amber}`,borderLeft:`3px solid ${C.amber}`,background:'rgba(184,115,10,0.08)',padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px',marginBottom:'0'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
              <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.amber,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0}}>⚡ Q2 2026</span>
              <div style={{width:'1px',height:'20px',background:'rgba(184,115,10,0.35)',flexShrink:0}}/>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>NHIS Reform Window — Q2 2026 Deadline</span>
              <span className="mob-hide" style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.35)',fontStyle:'italic'}}>NHIS provider registration: Q2 2026 enrollment cycle sets rates for the following year.</span>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:C.amber,flexShrink:0}}>1:6.7×</div>
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
          Sector 03 of 12 · Health Systems &amp; Wellbeing
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

export default function HealthBrief(){
  const coverRef=useRef(null);
  const[forceOpen,setForceOpen]=useState(null); // null=local, true=all open, false=all closed
  const[barAllOpen,setBarAllOpen]=useState(false);
  const toggleAll=()=>{
    const next=!barAllOpen;
    setBarAllOpen(next);
    setForceOpen(next);
    setTimeout(()=>setForceOpen(null),50);
  };
  return(
    <ExpandCtx.Provider value={{forceOpen}}>
    {/* paddingBottom:60px keeps last section above fixed SectionFooterNav */}
    <div style={{fontFamily:F.body,background:C.paper,paddingBottom:'60px'}}>
      <Gf/>
      <ReadingProgressBar coverRef={coverRef}/>
      <SectionFooterNav/>
      <Cover logoRef={coverRef}/>
      <MobExpandBar allOpen={barAllOpen} onToggle={toggleAll}/>
      <Executive/>
      <SubSectors/>
      <StructuralProblem/>
      <BrainDrain/>
      <DiasporaAdvantage/>
      <CompetitiveLandscape/>
      <HealthFinancing/>
      <CrossSectorIntegration/>
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
