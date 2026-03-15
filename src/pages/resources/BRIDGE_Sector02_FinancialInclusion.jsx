import { useState, useEffect, useRef } from "react";
import React from "react";

/* ═══════════════════════════════════════════════════════════════════════
   DESIGN SYSTEM — locked, never deviate
═══════════════════════════════════════════════════════════════════════ */
const C = {
  ink:'#0D1A10', paper:'#FAF8F3', paperDark:'#F0EDE4',
  forest:'#1B4D3E', lime:'#B8D935', limeDark:'#8FA825',
  muted:'#5C6B5E', faint:'#9AAA9C', border:'#D8D4C8',
  red:'#A8200D', amber:'#B8730A', positive:'#1A6B2F',
  white:'#FFFFFF', teal:'#2E5A4D',
};
const F = {
  display:'"Playfair Display","Georgia",serif',
  body:'"Source Serif 4","Georgia",serif',
  sans:'"DM Sans","Helvetica Neue",sans-serif',
  mono:'"DM Mono","Courier New",monospace',
};
const RISK_COLOR = { LOW:C.positive, MEDIUM:C.amber, HIGH:C.red, 'LOW-MED':C.amber };
const MODE_BG = { 'Direct Op':C.forest,'Partnership':C.amber,'Investment':C.teal,'Guidance':C.paperDark,'Network':C.ink };
const MODE_TX = { 'Direct Op':C.lime,'Partnership':C.white,'Investment':C.paper,'Guidance':C.muted,'Network':'rgba(250,248,243,0.6)' };

/* ═══════════════════════════════════════════════════════════════════════
   SECTOR DATA — Financial Inclusion (02)
═══════════════════════════════════════════════════════════════════════ */
const S = {
  num:'02', name:'Financial Inclusion', tier:'Core', score:84,
  capital:'$14–28M', edition:'March 2026 Edition',
  tagline:"Ghana's financial system excludes 14.7 million adults — not by circumstance but by infrastructure failure. Fixing the missing connective tissue between capital and creditworthy borrowers is BRIDGE's largest single-sector deployment case.",
  stats:[
    { l:'Annual SME Credit Gap',       v:'$4.6B'   },
    { l:'Adults Unserved/Underserved', v:'14.7M'   },
    { l:'Mobile Money Active Users',   v:'20M+'    },
    { l:'2026 Budget Alignment',       v:'GH₵5.4B+'},
  ],
  scoreDims:[
    { d:'Market Opportunity',         w:'30%', s:92 },
    { d:'Development Impact',         w:'30%', s:88 },
    { d:'Implementation Feasibility', w:'25%', s:76 },
    { d:'Financial Sustainability',   w:'15%', s:79 },
  ],
  snapshot:[
    { l:'Tier',              v:'Core'                },
    { l:'Score',             v:'84/100'              },
    { l:'Priority',          v:'Immediate deployment'},
    { l:'Portfolio Range',   v:'$14–28M'             },
    { l:'Timeline',          v:'2026–2030'           },
    { l:'Ventures Identified',v:'14'                 },
  ],
  summary:"Ghana's formal financial system reaches fewer than half its adults in any meaningful way. 2.4 million MSME operators, 1.4 million smallholder farmers, and two million urban informals hold genuine economic capacity that cannot access the credit, savings, or insurance infrastructure needed to grow. The result is not poverty by circumstance but by financial system design — a $4.6 billion annual credit gap that compounds with every harvest cycle and business quarter.",
  summary2:"BRIDGE enters as an infrastructure builder, not a lender. Our thesis is that the gap is not a capital shortage but a missing connective tissue problem — credit scoring infrastructure, last-mile agent networks, digital identity integration, and bundled product design that converts mobile money users into creditworthy borrowers. Every BRIDGE intervention in this sector creates a platform asset: a single SME finance node can onboard 1,200+ MSMEs into the formal credit system within 18 months.",
  summary3:"The 2026 national budget deploys GH₵5.4 billion through the Development Bank Ghana, GIRSAL, and the BoG Fintech Sandbox — three co-investment instruments with open application windows. BRIDGE's first-mover positioning enables co-deployment alongside government capital at 1:4.8× leverage, with concessional first-loss guarantee positions available on SME and agri-finance tranches through Q2 2026.",
  quote:'"Ghana\'s financial exclusion gap is not a poverty problem. It is an infrastructure problem — and infrastructure problems have engineering solutions."',

  subs:[
    { name:'SME & Business Finance',    score:91, stage:'Series A Ready', capital:'$5–8M',  note:'$4.6B credit demand from 2.4M MSME operators; DBG co-lending window open Q2 2026'      },
    { name:'Mobile Money & Payments',   score:88, stage:'Active',         capital:'$3–6M',  note:'20M+ active users; 75% rural agent banking gap; BRIDGE last-mile infrastructure play'  },
    { name:'Agricultural Finance',      score:86, stage:'Active',         capital:'$4–7M',  note:'Only 8% of smallholders access formal credit; GIRSAL guarantee cover 50–70%'          },
    { name:'Digital Savings & Insurance',score:81,stage:'Seed–A',         capital:'$2–4M',  note:'Insurance penetration 1.1% of GDP; micro-insurance via mobile money wallet'           },
    { name:'Housing Microfinance',      score:79, stage:'Seed–A',         capital:'$2–4M',  note:'1.8M unit housing gap creates collateral-lite lending opportunity via NHIS data'       },
    { name:'Remittances & Cross-border',score:71, stage:'Early',          capital:'$1–2M',  note:'$4.7B annual diaspora flows; Eastern/Volta corridor informal trade finance gap'        },
  ],

  constraints:[
    { c:'Collateral Requirements',       harm:'Traditional asset collateral excludes 78% of MSMEs who hold no formal property title, blocking them from any bank credit regardless of repayment capacity.' },
    { c:'Thin Credit File Problem',      harm:'60%+ of potential borrowers have zero formal credit history, making risk pricing impossible for conventional lenders and creating a self-reinforcing exclusion cycle.' },
    { c:'Last-Mile Distribution Gap',    harm:'Agent banking density drops to 3 per 10,000 adults in Northern and Savannah zones versus 47 in Greater Accra — the physical infrastructure of finance does not reach where the need is highest.' },
    { c:'Digital Identity Fragmentation',harm:'Ghana Card penetration at 62% nationally; KYC compliance costs remain prohibitive for loan tickets below GH₵2,000, making micro-credit economically unviable for most providers.' },
    { c:'Regulatory Fragmentation',      harm:'563 licensed MFIs, rural banks, and savings societies operate under four separate regulatory frameworks with inconsistent consumer protection, creating compliance arbitrage that disadvantages responsible lenders.' },
    { c:'FX Exposure Risk',              harm:'USD-denominated credit facilities in a GHS-income economy create structural vulnerability — cedi depreciation can double real debt burdens overnight, suppressing credit demand from the most creditworthy borrowers.' },
  ],

  smeGap:[
    { cat:'Micro Enterprises (1–5 employees)',    cur:87, tgt:35, note:'2.1M operators · avg ticket GH₵8,000 · BRIDGE alt-scoring target'     },
    { cat:'Small Enterprises (6–29 employees)',   cur:63, tgt:22, note:'280,000 firms · avg ticket GH₵85,000 · DBG co-lending eligible'       },
    { cat:'Medium Enterprises (30–99 employees)', cur:41, tgt:15, note:'42,000 firms · growth capital window · IFC participation likely'       },
    { cat:'Smallholder Agri-MSMEs',               cur:92, tgt:28, note:'1.4M farmers · GIRSAL guarantee eligible · COCOBOD payroll anchor'    },
  ],

  zones:[
    { zone:'Greater Accra & Ashanti', regions:'Greater Accra, Ashanti, Bono', crops:'MSMEs, Fintech, Digital savings',    alloc:40, allocLabel:'38–42%',
      color:C.lime,   interventions:'Digital credit scoring, MSME marketplace, mobile savings products', context:'Highest smartphone penetration; fintech-ready ecosystem; DBG primary deployment zone' },
    { zone:'Western & Central',      regions:'Western, Central, Bono East',  crops:'Agri-finance, Worker remittances',  alloc:25, allocLabel:'23–27%',
      color:C.amber,  interventions:'COCOBOD payroll finance, agri-credit bundles, mining sector MSME', context:'High-income informal sector; cocoa and mining payroll anchor for credit products' },
    { zone:'Eastern, Volta & Oti',   regions:'Eastern, Volta, Oti',          crops:'Cross-border trade, Diaspora',      alloc:20, allocLabel:'18–22%',
      color:C.teal,   interventions:'Cross-border trade finance, diaspora remittance products, corridor SME credit', context:'Togo/Benin corridor; strong diaspora flows; informal trade finance gap' },
    { zone:'Northern Zones',         regions:'Northern, Savannah, Upper E/W, NE',crops:'Agent banking, Mobile money', alloc:15, allocLabel:'13–17%',
      color:C.muted,  interventions:'Last-mile agent network, USSD savings products, government subsidy-eligible credit', context:'Lowest inclusion rate; highest BRIDGE impact per dollar; GIRSAL priority zone' },
  ],

  competitors:[
    { type:'Telco-Led MFS',    name:'MTN MoMo',                    desc:'15M+ active users, dominant payments rail; limited credit or savings products beyond the wallet.',                               pos:'BRIDGE builds on top of MoMo rails — not competing, extending into credit and insurance layers MoMo does not serve.' },
    { type:'Digital Lender',   name:'Fido Finance',                desc:'AI credit scoring, 500K+ disbursements; thin portfolio depth, no savings, no insurance, no agri-products.',                      pos:'BRIDGE white-labels a more comprehensive scoring engine to rural banks at infrastructure level — broader product coverage, lower unit cost.' },
    { type:'Cross-border',     name:'Zeepay',                      desc:'Diaspora remittance platform, strong UK/US/EU corridors; limited Ghana-side financial product depth.',                            pos:'BRIDGE targets the Eastern corridor and informal trade finance gap that Zeepay does not serve.' },
    { type:'Payment Aggregator',name:'ExpressPay',                 desc:'Strong merchant acquiring and utility payment infrastructure; no credit, no savings, no insurance products.',                    pos:'BRIDGE uses ExpressPay as a distribution rail for savings and micro-insurance add-on products.' },
    { type:'MFI',              name:'Opportunity International',   desc:'100,000+ rural borrowers, strong field operations; limited technology, no digital channel, slow growth rate.',                   pos:'BRIDGE is a potential technology partner and white-label provider to OI, not a competitor in their market.' },
    { type:'National DFI',     name:'Development Bank Ghana',      desc:'Wholesale SME lender; no retail or last-mile reach; depends entirely on on-lending partners to deploy capital.',                 pos:'BRIDGE is DBG\'s ideal last-mile co-lending partner — technology infrastructure DBG lacks; BRIDGE accesses GH₵1.2B wholesale window.' },
  ],

  budgetItems:[
    { item:'Development Bank Ghana — SME Window',    ghc:'GH₵1.2B',  usd:'~US$87M',  pct:100, mode:'Co-lending + equity',       urgency:'Q2 2026 — OPEN NOW',   featured:true  },
    { item:'GIRSAL Credit Guarantee Scheme',         ghc:'GH₵2.4B',  usd:'~US$174M', pct:200, mode:'First-loss guarantee cover', urgency:'2026–2028',            featured:false },
    { item:'BoG Fintech Regulatory Sandbox',         ghc:'GH₵300M',  usd:'~US$22M',  pct:25,  mode:'License + sandbox TA',      urgency:'Budget year 2026',     featured:false },
    { item:'NHIS Digital Finance Integration',       ghc:'GH₵1.5B',  usd:'~US$109M', pct:125, mode:'Public-private partnership', urgency:'2026–2027',            featured:false },
  ],

  dbgTerms:[
    { f:'Total Window Size',           t:'US$87M (GH₵1.2B) — DBG Phase 1 SME window'    },
    { f:'BRIDGE Eligibility',          t:'SME finance + agri-finance verticals'           },
    { f:'Blended Finance Ratio',       t:'1:4.8× for every dollar of BRIDGE capital'     },
    { f:'Co-lending Structure',        t:'DBG wholesale + BRIDGE retail/last-mile layer' },
    { f:'GIRSAL Guarantee Coverage',   t:'50–70% first-loss on eligible agri-finance'    },
    { f:'Application Deadline',        t:'Q2 2026 — BRIDGE preparing term sheet now'    },
  ],

  benchmarks:[
    { country:'Ghana — Without Intervention', pct:19, highlight:'red',  note:'Formal credit access (adult population)'  },
    { country:'Senegal (Post-reform 2022)',    pct:31, highlight:false,  note:'BCEAO framework; mobile credit uplift'    },
    { country:'Kenya (M-Pesa Ecosystem)',      pct:48, highlight:false,  note:'Mobile credit penetration benchmark'      },
    { country:'Rwanda (Umurenge 2030)',        pct:56, highlight:false,  note:'Government-led inclusion programme'       },
    { country:'Ghana — BRIDGE Target 2030',   pct:58, highlight:'lime', note:'Full platform + agent network deployment' },
  ],

  marketSizes:[
    { crop:'SME Lending',          tam:'$4.6B', note:'2.4M MSME operators', accessible:'$180–280M', growth:'+14%/yr', phase:1, priority:'IMMEDIATE' },
    { crop:'Agri-Finance',         tam:'$1.2B', note:'1.4M smallholders',   accessible:'$60–90M',   growth:'+11%/yr', phase:1, priority:'IMMEDIATE' },
    { crop:'Digital Insurance',    tam:'$800M', note:'22M working-age adults',accessible:'$40–70M', growth:'+22%/yr', phase:2, priority:'HIGH'      },
    { crop:'Housing Microfinance', tam:'$2.1B', note:'1.8M housing deficit', accessible:'$30–50M',  growth:'+8%/yr',  phase:2, priority:'MEDIUM'    },
  ],

  institutionTiers:[
    { tier:'Tier 1 — Digital-Ready',        count:'340+',  zone:'Urban zones, coast',   desc:'Digitised loan books; API-ready; BRIDGE can white-label scoring engine directly.', color:'positive' },
    { tier:'Tier 2 — Development Stage',    count:'890+',  zone:'Peri-urban, mid-belt', desc:'Active member deposits; needs digital infrastructure to unlock credit potential.',  color:'amber'    },
    { tier:'Tier 3 — Informal SUSU Groups', count:'3.2M+', zone:'All zones',            desc:'Cash-based savings collectives; mobile money bridge converts groups into borrowers.',color:'faint'   },
  ],

  regulatoryTimeline:[
    { date:'Jul 2022',  event:'Development Bank Ghana launched',   type:'PAST',     note:'GH₵1.2B SME wholesale window opens; first on-lending partners signed'              },
    { date:'Dec 2024',  event:'BoG Fintech Sandbox v2.0',          type:'PAST',     note:'Expanded licence categories; digital credit and insurance now sandbox-eligible'    },
    { date:'Q2 2026',   event:'DBG SME Co-lending Deadline',       type:'CRITICAL', note:'First-mover co-lending partnerships; BRIDGE application in preparation'           },
    { date:'Q3 2026',   event:'GIRSAL Phase 2 Guarantee Tranche',  type:'BRIDGE',   note:'50–70% first-loss cover on BRIDGE agri-finance portfolio; direct entry point'     },
    { date:'2027+',     event:'Open Banking Framework (BoG)',       type:'FUTURE',   note:'Data portability drives credit scoring revolution; early BRIDGE positioning critical'},
  ],

  coInvestors:[
    { name:'IFC',                      type:'Equity + TA',    focus:'SME finance, digital banking',  alignment:'Phase 1 co-equity',    capital:'$10–50M',   stage:'Seeking'    },
    { name:'GIZ',                      type:'Technical TA',   focus:'Financial literacy, MFI cap.',  alignment:'Phase 1 TA',           capital:'Technical', stage:'Active'     },
    { name:'USAID / Feed the Future',  type:'Grant + blended',focus:'Agri-finance, digital identity',alignment:'Phase 1 seed capital', capital:'$2–8M',     stage:'Active'     },
    { name:'Acumen Fund',              type:'Impact PE',      focus:'Last-mile MFI strengthening',   alignment:'Phase 2 equity',       capital:'$1–4M',     stage:'Deployed'   },
    { name:'Helios Investment',        type:'Growth Equity',  focus:'FSI + fintech growth stage',    alignment:'Phase 2–3',            capital:'$5–25M',    stage:'Seeking'    },
    { name:'Development Bank Ghana',   type:'Dev Finance',    focus:'Wholesale SME lines',           alignment:'Phase 1 co-lending',   capital:'GH₵ denom', stage:'Gov-backed' },
  ],

  ventures:[
    { tier:1,num:'①',name:'Digital Credit Scoring Infrastructure',
      desc:'Build a Ghana-specific alternative credit scoring engine using mobile money transaction history, utility payments, and informal trading data. Deployed as a white-label API to DBG\'s on-lending partner network — 340+ rural banks and MFIs gain immediate credit decisioning capability.',
      mode:'Direct Op',   capital:'$3–5M',  irr:'18–24%',  risk:'MEDIUM',payback:'4–6 yrs',start:'Q2 2026'},
    { tier:1,num:'②',name:'Last-Mile Agent Banking Network',
      desc:'Deploy 2,000+ agent banking outlets across Northern, Savannah, and Upper zones — POS-equipped, biometric KYC-enabled, and linked to mobile savings and credit products. Target zones currently have agent density of 3 per 10,000 adults; BRIDGE brings this to 22+.',
      mode:'Partnership', capital:'$2–4M',  irr:'14–18%',  risk:'MEDIUM',payback:'5–7 yrs',start:'Q3 2026'},
    { tier:1,num:'③',name:'Agri-Finance Bundled Platform',
      desc:'Combine GIRSAL-guaranteed credit, weather-indexed crop insurance, and USSD digital savings into a single bundled product for 1.4M smallholder farmers. COCOBOD cocoa payroll serves as income anchor; BRIDGE structures the insurance and credit layers on top.',
      mode:'Direct Op',   capital:'$3–5M',  irr:'16–21%',  risk:'MEDIUM',payback:'5–7 yrs',start:'Q1 2026'},
    { tier:1,num:'④',name:'MSME Digital Lending Marketplace',
      desc:'DBG-backed co-lending marketplace connecting 280,000 small enterprises to participating banks. BRIDGE provides the technology infrastructure, alternative risk scoring, and SME onboarding layer — DBG provides the wholesale capital window at GH₵1.2B.',
      mode:'Investment',  capital:'$2–3M',  irr:'12–16%',  risk:'LOW',   payback:'4–5 yrs',start:'Q2 2026'},
    { tier:2,num:'⑤',name:'Microinsurance Digital Distribution',
      desc:'Partner with licensed insurers to create USSD-accessible micro-health and agri-insurance products, distributed via mobile money wallet integration. Target: 3M adults by 2028 across all zones with tickets starting at GH₵5/month.',
      mode:'Partnership', capital:'$1.5–3M',irr:'11–15%',  risk:'MEDIUM',payback:'5–7 yrs',start:'2028'},
    { tier:2,num:'⑥',name:'Cross-border Trade Finance Corridor',
      desc:'Eastern/Volta corridor informal trade finance platform: digitise FX conversion, receivables financing, and guarantee products for cross-border SMEs trading with Togo, Benin, and Côte d\'Ivoire. $380M+ annual informal trade flow.',
      mode:'Partnership', capital:'$2–4M',  irr:'13–17%',  risk:'MEDIUM',payback:'5–8 yrs',start:'2028'},
    { tier:3,num:'⑦',name:'Housing Microfinance Fund',
      desc:'Structured finance vehicle combining NHIS health data, mobile money payment history, and incremental land title reform to create a collateral-lite housing loan product for urban informals. 1.8M unit housing deficit creates the demand; BRIDGE structures the risk. IRR 14–19% on a 7-year patient-capital model.',
      mode:'Investment',  capital:'$3–6M',  irr:'14–19%',  risk:'HIGH',  payback:'7–9 yrs',start:'2030+'},
  ],

  roadmap:[
    { name:'Digital Credit Scoring Platform', tier:1, s:0,  e:45  },
    { name:'Agri-Finance Bundled Platform',   tier:1, s:0,  e:50  },
    { name:'Agent Banking Network',           tier:1, s:5,  e:52  },
    { name:'MSME Lending Marketplace',        tier:1, s:10, e:55  },
    { name:'Microinsurance Distribution',     tier:2, s:45, e:80  },
    { name:'Cross-border Trade Finance',      tier:2, s:42, e:80  },
    { name:'Housing Microfinance Fund',       tier:3, s:75, e:100 },
  ],

  timeline:{
    phase1:{ label:'Phase 1 — Foundation', years:'2026–2028', capital:'$8.5–17M', count:'4 ventures',
      items:['Q1 2026: Agri-finance platform MVP launch; GIRSAL guarantee activation','Q2 2026: DBG credit scoring API deployment; MSME marketplace term sheet','Q3 2026: Agent banking 500 outlets operational in Northern zone','Q4 2026: 10,000+ active borrowers on BRIDGE scoring infrastructure','2027: MSME marketplace 1,000+ active enterprise borrowers'] },
    phase2:{ label:'Phase 2 — Scale',      years:'2028–2030', capital:'$3.5–7M',  count:'2 ventures',
      items:['Microinsurance platform: 1M policy holders by mid-2029','Cross-border corridor: Eastern/Volta trade finance operational','Credit scoring: 100,000+ borrowers on BRIDGE infrastructure'] },
    phase3:{ label:'Phase 3 — Maturity',   years:'2030+',     capital:'$4–8M',    count:'1 venture',
      items:['Housing microfinance fund operational: 10,000+ home improvement loans','Full portfolio exit readiness: DFI and institutional buyer engagement','Open banking integration: BRIDGE data assets become sector infrastructure'] },
  },

  synergies:[
    { sector:'06 Agriculture',          link:'Agri-finance platform bridges farmer income volatility into formal credit; COCOBOD payroll as anchor for 1.4M smallholders.' },
    { sector:'01 Infrastructure',       link:'Construction SME finance; Kejetia market vendor credit; infrastructure contractor working capital.' },
    { sector:'03 Health Systems',       link:'NHIS premium finance; digital health savings products; medical micro-insurance distribution rails.' },
    { sector:'10 Energy',               link:'PAYGO solar lending infrastructure; clean energy MSME finance; off-grid rural payment rails.' },
    { sector:'05 Education',            link:'School fees microfinance products; student digital savings; teacher salary advance facilities.' },
    { sector:'04 Technology',           link:'Credit scoring data infrastructure; open banking API ecosystem; digital identity integration.' },
    { sector:'11 Manufacturing',        link:'Working capital finance for agro-processing, light manufacturing, and packaging SMEs.' },
    { sector:'09 Tourism',              link:'Hospitality SME lending; informal tourism vendor finance; lodge operator working capital.' },
  ],

  risks:[
    { r:'Credit Default Risk',            sev:'HIGH',    mit:'BRIDGE mitigates via GIRSAL first-loss guarantee (50–70%) and alternative scoring models; portfolio diversified across 4 zones and 7 ventures with no single exposure >20%.' },
    { r:'Regulatory Change Risk',         sev:'MEDIUM',  mit:'BoG Fintech Sandbox participation gives early-mover regulatory insight and compliance co-design; legal team monitors MFI framework reform continuously.' },
    { r:'Technology & Fraud Risk',        sev:'MEDIUM',  mit:'End-to-end encryption, biometric KYC, and real-time anomaly detection required on all platform partners; ISO 27001 certification threshold for co-lending partners.' },
    { r:'Cedi Depreciation Risk',         sev:'MEDIUM',  mit:'GHS-denominated products only across the retail portfolio; USD exposure limited to technical assistance components and DFI equity tranches.' },
    { r:'Partner Institution Failure',    sev:'MEDIUM',  mit:'Multi-partner model with no single MFI holding >20% of BRIDGE portfolio exposure; BRIDGE retains technology IP independently of any partner.' },
    { r:'Digital Literacy & Adoption',    sev:'LOW-MED', mit:'USSD-first product design requires no smartphone; community agent model and group lending structures drive adoption in low-literacy zones.' },
  ],

  thesis:"Ghana's financial inclusion gap is the largest single market opportunity in BRIDGE's 12-sector portfolio — not because capital is scarce, but because the infrastructure connecting capital to creditworthy borrowers has never been built at scale. The $4.6 billion SME credit gap, 14.7 million underserved adults, and a government co-investment window closing in Q2 2026 create a time-bounded entry case that will not repeat.",
  thesis2:"BRIDGE's deployment model is infrastructure-first: build the credit scoring engine, the agent network, and the bundled product architecture before deploying risk capital. Every platform asset created in Phase 1 becomes a multiplier for Phases 2 and 3 — one credit scoring node can underwrite 10,000+ borrowers, generating 18–24% IRR on the scoring infrastructure alone while reducing systemic risk across the portfolio.",
  deploy:[
    { l:'Ticket size',        v:'$500K–$5M per venture'           },
    { l:'Preferred stage',    v:'Seed through Series A'           },
    { l:'Model preference',   v:'Platform and infrastructure models'},
    { l:'Co-investment',      v:'DBG; GIRSAL; IFC; USAID'         },
    { l:'Exit horizon',       v:'5–9 years; DFI sale or IPO'      },
  ],

  fullPackage:[
    { item:'MSME Credit Market Model',          desc:'Sector-by-sector credit demand sizing, TAM, accessible market, and 10-year growth projections by zone and enterprise segment.' },
    { item:'Digital Credit Scoring Playbook',   desc:'Alternative data sources, model architecture, and Ghana-specific calibration framework for mobile money and informal income profiles.' },
    { item:'DBG Co-lending Application Package',desc:'Complete term sheet templates, credit criteria mapping, and application filing guide for the Q2 2026 SME window.' },
    { item:'GIRSAL Guarantee Application Guide',desc:'Eligibility criteria, documentation requirements, and processing timeline for agri-finance and SME first-loss coverage.' },
    { item:'Agent Banking Network Design',      desc:'Site selection scoring methodology, rollout sequencing by zone, and unit economics per agent outlet model.' },
    { item:'Partner Institution Directory',     desc:'340+ MFIs and rural banks assessed by digital readiness, governance rating, and BRIDGE co-lending eligibility.' },
    { item:'Venture Financial Models',          desc:'10-year P&L, IRR sensitivity analysis, and working capital models for all 7 ventures across three tiers.' },
    { item:'Regulatory Compliance Framework',   desc:'BoG, SEC, NIC, and GhIPSS requirements mapped per product category — credit, savings, insurance, and payments.' },
    { item:'Technology Infrastructure Specs',   desc:'Credit scoring API architecture, mobile money integration patterns, and KYC onboarding technology blueprint.' },
    { item:'Competitive Intelligence Report',   desc:'40+ FSI players, fintech startups, and DFI programs assessed — market positioning, funding status, and BRIDGE adjacencies.' },
    { item:'Policy Monitoring — Live',          desc:'Real-time tracking of DBG, GIRSAL, BoG Sandbox, and NHIS digital finance policy deployments and regulatory changes.' },
    { item:'Quarterly Intelligence Updates',    desc:'Revised data, new assessments, and market signals across all 12 BRIDGE sectors every quarter.' },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════
   SECTION REGISTRY
═══════════════════════════════════════════════════════════════════════ */
const SECS = [
  { id:'sec-exec',    label:'Executive Summary'    },
  { id:'sec-subs',    label:'Sub-Sectors'          },
  { id:'sec-problem', label:'Structural Problem'   },
  { id:'sec-sme',     label:'SME Finance Analysis' },
  { id:'sec-zones',   label:'Regional Strategy'    },
  { id:'sec-market',  label:'Competitive Landscape'},
  { id:'sec-policy',  label:'Policy Window'        },
  { id:'sec-digital', label:'Digital Landscape'    },
  { id:'sec-ventures',label:'Venture Portfolio'    },
  { id:'sec-roadmap', label:'Deployment Roadmap'   },
  { id:'sec-synergy', label:'System Integration'   },
  { id:'sec-coinvest',label:'Co-Investment'        },
  { id:'sec-risk',    label:'Risk & Thesis'        },
  { id:'upsell',      label:'Next Steps'           },
];

/* ═══════════════════════════════════════════════════════════════════════
   LOGO
═══════════════════════════════════════════════════════════════════════ */
const Logo = ({ height=28, variant='white' }) => {
  const tf = variant==='white' ? '#ffffff' : '#1B4D3E';
  const bk = variant==='white' ? 'rgba(0,0,0,0.08)' : 'rgba(27,77,62,0.15)';
  return (
    <svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      <rect fill="none" stroke={tf} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
      <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
      <path fill={tf} stroke={bk} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      <path fill={tf} stroke={bk} strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
      <rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      <path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      <path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      <rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════════════════ */
const Gf = () => (<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  [id^='sec-'],[id='upsell']{scroll-margin-top:50px;}
  body{background:#FAF8F3;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .dc::first-letter{font-family:"Playfair Display","Georgia",serif;font-size:4.4em;font-weight:900;float:left;line-height:0.8;margin:0.05em 0.12em 0 0;color:#1B4D3E;}
  @media print{.np{display:none!important;}}

  /* ── Desktop visibility defaults ── */
  .mob-show{display:none;}
  .mob-only{display:none!important;}
  .mob-car{display:none!important;}
  .mob-sec-hdr{display:none!important;}
  .desk-only{display:block;}
  .mob-expand-all{display:none;}
  .fig-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .subs-table{display:block;}
  .subs-cards{display:none;}

  /* ── Carousel scroll container ── */
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

  /* ── Progressive disclosure toggle ── */
  .mob-toggle{display:none;width:100%;padding:10px 0;border:none;border-bottom:1px solid #D8D4C8;background:transparent;cursor:pointer;font-family:"DM Sans","Helvetica Neue",sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#5C6B5E;align-items:center;justify-content:space-between;transition:color 0.15s;}
  .mob-toggle:hover{color:#1B4D3E;}
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

  /* v4: Primary CTA lift */
  .cta-primary{transition:transform 0.15s ease,box-shadow 0.15s ease!important;}
  .cta-primary:hover{transform:translateY(-1px)!important;box-shadow:0 6px 20px rgba(184,217,53,0.25)!important;}

  /* v4: Section rule */
  .sec-rule{border-top:5px solid #0D1A10;border-bottom:2.5px solid #B8D935;padding-bottom:4px;margin-bottom:22px;}

  /* ── Tablet ≤900px ── */
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

  /* ── Mobile ≤600px ── */
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

/* ═══════════════════════════════════════════════════════════════════════
   NAVIGATION INFRASTRUCTURE
═══════════════════════════════════════════════════════════════════════ */
const ReadingProgressBar = ({ coverRef }) => {
  const [pct, setPct] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  useEffect(() => {
    const fn = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setPct(total > 0 ? Math.min(100,(scrolled/total)*100) : 0);
      if (coverRef?.current) setLogoVisible(coverRef.current.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener('scroll', fn, {passive:true});
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, [coverRef]);
  const pctRounded = Math.round(pct);
  return (
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(13,26,16,0.05)',overflow:'hidden'}}>
      <div style={{position:'absolute',bottom:0,left:0,height:'3px',width:`${pct}%`,background:C.lime,transition:'width 0.1s linear',pointerEvents:'none'}}/>
      <div style={{display:'flex',alignItems:'center',gap:'10px',minWidth:0,overflow:'hidden'}}>
        <div style={{overflow:'hidden',maxWidth:logoVisible?'180px':'0',opacity:logoVisible?1:0,transition:'max-width 0.38s cubic-bezier(0.16,1,0.3,1),opacity 0.3s ease',display:'flex',alignItems:'center',flexShrink:0}}>
          <Logo height={19} variant="dark"/>
          <div style={{width:'1px',height:'15px',background:C.border,margin:'0 12px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
          Sector Brief · Financial Inclusion · Core Tier · March 2026
        </span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>
          02 · Financial Inclusion
        </span>
        {pct>5&&<span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,marginLeft:'4px',flexShrink:0}}>{pctRounded}%</span>}
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center',flexShrink:0}}>
        <a href="#" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none',letterSpacing:'0.2px'}}>All Sectors →</a>
        <a href="#upsell" className="cta-primary" style={{background:C.forest,color:C.lime,padding:'7px 16px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.5px'}}>Full Package →</a>
      </div>
    </div>
  );
};

const SectionFooterNav = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const idx = SECS.findIndex(s=>s.id===e.target.id); if(idx>=0) setActive(idx); }});
    }, {rootMargin:'-40% 0px -55% 0px'});
    SECS.forEach(s => { const el=document.getElementById(s.id); if(el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  const goTo = (idx) => {
    const clamped = Math.max(0,Math.min(SECS.length-1,idx));
    const el = document.getElementById(SECS[clamped].id);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    setActive(clamped);
  };
  const BtnStyle = (disabled, isNext) => ({
    width:'38px',height:'38px',
    background:disabled?'rgba(255,255,255,0.03)':(isNext?C.forest:'rgba(255,255,255,0.07)'),
    border:`1px solid ${disabled?'rgba(255,255,255,0.08)':(isNext?'rgba(184,217,53,0.25)':'rgba(255,255,255,0.14)')}`,
    cursor:disabled?'default':'pointer',
    display:'flex',alignItems:'center',justifyContent:'center',
    flexShrink:0,opacity:disabled?0.28:1,
    transition:'background 0.15s,transform 0.12s',
  });
  return (
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

const ExpandCtx = React.createContext({forceOpen:null});

const MobExpandBar = ({allOpen,onToggle}) => (
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

const SecHdr = ({num,label,badge,badgeColor=C.forest,badgeTx=C.lime,open,onToggle,dark=false,hint=''}) => (
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

const Carousel = ({items,renderCard,cardClass='mob-snap-card',darkBg=false,wrapClass='car-wrap'}) => {
  const [active,setActive] = useState(0);
  const ref = useRef(null);
  const onScroll = () => {
    const el=ref.current; if(!el) return;
    const idx = Math.min(Math.round(el.scrollLeft/(el.scrollWidth/items.length)),items.length-1);
    setActive(idx);
  };
  const goto = (i) => {
    const el=ref.current; if(!el) return;
    el.scrollTo({left:(el.scrollWidth/items.length)*i,behavior:'smooth'});
    setActive(i);
  };
  return (
    <div className={`mob-car ${wrapClass}`} style={{marginTop:'16px',marginBottom:'4px'}}>
      <div ref={ref} onScroll={onScroll} className="mob-scroller">
        {items.map((item,i)=>(<div key={i} className={cardClass} style={{paddingBottom:'2px'}}>{renderCard(item,i)}</div>))}
        <div style={{flex:'0 0 16px',minWidth:'16px'}}/>
      </div>
      <div style={{display:'flex',gap:'5px',justifyContent:'center',marginTop:'12px',alignItems:'center'}}>
        {items.map((_,i)=>(<div key={i} onClick={()=>goto(i)} style={{width:i===active?'22px':'7px',height:'7px',borderRadius:'4px',background:i===active?C.lime:(darkBg?'rgba(255,255,255,0.18)':C.border),cursor:'pointer',transition:'width 0.3s cubic-bezier(0.16,1,0.3,1),background 0.2s',flexShrink:0}}/>))}
      </div>
    </div>
  );
};

const FigCaption = ({num,title,note}) => (
  <div style={{marginBottom:'14px'}}>
    <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'5px'}}>
      <span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:C.lime,letterSpacing:'2px',background:C.forest,padding:'3px 9px',flexShrink:0}}>FIG {num}</span>
      <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,letterSpacing:'0.1px'}}>{title}</span>
    </div>
    {note&&<div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic',lineHeight:1.6,borderLeft:`2px solid ${C.border}`,marginLeft:'2px',paddingLeft:'10px'}}>{note}</div>}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════
   FIGURE COMPONENTS
═══════════════════════════════════════════════════════════════════════ */

const Fig01 = () => {
  const barColors = [C.lime, C.forest, C.teal, C.amber, C.muted, C.positive];
  return (
  <div style={{marginBottom:'28px'}}>
    <FigCaption num="01" title="Sub-Sector BRIDGE Impact Scores" note="Composite score across Market Opportunity (30%), Development Impact (30%), Implementation Feasibility (25%), Financial Sustainability (15%)"/>
    <div className="fig-scroll">
      <div style={{minWidth:'520px'}}>
        {S.subs.map((sub,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'200px 1fr 80px',gap:'0',marginBottom:'6px',alignItems:'center'}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:C.ink,paddingRight:'12px',lineHeight:1.3}}>{sub.name}</div>
            <div style={{background:C.paperDark,height:'20px',position:'relative'}}>
              <div style={{position:'absolute',top:0,left:0,height:'100%',width:`${sub.score}%`,background:barColors[i%barColors.length],opacity:0.9}}/>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.forest,textAlign:'right',paddingLeft:'10px'}}>{sub.score}</div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'200px 1fr 80px',gap:'0',marginTop:'4px'}}>
          <div/>
          <div style={{display:'flex',justifyContent:'space-between',padding:'0 2px'}}>
            {[0,20,40,60,80,100].map(n=><span key={n} style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>{n}</span>)}
          </div>
          <div/>
        </div>
      </div>
    </div>
  </div>
  );
};

const Fig02 = () => (
  <div style={{marginBottom:'28px'}}>
    <FigCaption num="02" title="SME Credit Access Gap — Current vs BRIDGE Target" note="% of enterprise segment currently unserved by formal credit; BRIDGE target by 2030"/>
    <div className="fig-scroll">
      <div style={{minWidth:'500px'}}>
        {S.smeGap.map((row,i)=>(
          <div key={i} style={{marginBottom:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'3px'}}>
              <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:C.ink}}>{row.cat}</span>
              <span style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,fontStyle:'italic'}}>{row.note}</span>
            </div>
            <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
              <div style={{flex:1,background:C.paperDark,height:'14px',position:'relative'}}>
                <div style={{position:'absolute',top:0,left:0,height:'100%',width:`${row.cur}%`,background:C.red,opacity:0.75}}/>
              </div>
              <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.red,width:'36px',textAlign:'right'}}>{row.cur}%</span>
            </div>
            <div style={{display:'flex',gap:'4px',alignItems:'center',marginTop:'2px'}}>
              <div style={{flex:1,background:C.paperDark,height:'14px',position:'relative'}}>
                <div style={{position:'absolute',top:0,left:0,height:'100%',width:`${row.tgt}%`,background:C.positive,opacity:0.85}}/>
              </div>
              <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.positive,width:'36px',textAlign:'right'}}>{row.tgt}%</span>
            </div>
          </div>
        ))}
        <div style={{display:'flex',gap:'20px',marginTop:'10px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'6px'}}><div style={{width:'12px',height:'8px',background:C.red,opacity:0.75}}/><span style={{fontFamily:F.sans,fontSize:'9px',color:C.muted}}>Current unserved</span></div>
          <div style={{display:'flex',alignItems:'center',gap:'6px'}}><div style={{width:'12px',height:'8px',background:C.positive,opacity:0.85}}/><span style={{fontFamily:F.sans,fontSize:'9px',color:C.muted}}>BRIDGE target 2030</span></div>
        </div>
      </div>
    </div>
  </div>
);

const Fig03 = () => (
  <div style={{marginBottom:'28px'}}>
    <FigCaption num="03" title="Capital Allocation by Financial Zone" note="BRIDGE portfolio deployment split across four financial inclusion geography zones"/>
    <div style={{display:'flex',height:'48px',width:'100%',marginBottom:'12px'}}>
      {S.zones.map((z,i)=>(
        <div key={i} style={{width:`${z.alloc}%`,background:z.color,display:'flex',alignItems:'center',justifyContent:'center',borderRight:i<S.zones.length-1?'2px solid rgba(255,255,255,0.2)':'none',flexShrink:0,overflow:'hidden'}}>
          <span style={{fontFamily:F.mono,fontSize:'clamp(9px,1.3vw,13px)',fontWeight:700,color:z.color===C.lime?C.ink:C.white,whiteSpace:'nowrap'}}>{z.allocLabel}</span>
        </div>
      ))}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px'}} className="g2">
      {S.zones.map((z,i)=>(
        <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'8px'}}>
          <div style={{width:'10px',height:'10px',background:z.color,flexShrink:0,marginTop:'2px'}}/>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.ink}}>{z.zone}</div>
            <div style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>{z.regions}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Fig04 = () => (
  <div style={{marginBottom:'28px'}}>
    <FigCaption num="04" title="Ghana Mobile Money — Transaction Volume Growth" note="GH₵ billion annual transaction value; registered vs active user trajectory"/>
    <div className="fig-scroll">
      <div style={{minWidth:'480px',padding:'4px 0'}}>
        {[
          {year:'2019',val:197,users:13.8},{year:'2020',val:268,users:15.2},{year:'2021',val:480,users:17.1},
          {year:'2022',val:782,users:18.4},{year:'2023',val:1070,users:19.6},{year:'2024',val:1340,users:20.8},
          {year:'2025e',val:1620,users:22.1,proj:true},{year:'2030e',val:3800,users:28.5,proj:true},
        ].map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'52px 1fr 90px',gap:'0',marginBottom:'5px',alignItems:'center'}}>
            <span style={{fontFamily:F.mono,fontSize:'9px',color:row.proj?C.faint:C.muted,letterSpacing:'0.5px'}}>{row.year}</span>
            <div style={{background:C.paperDark,height:'16px',position:'relative'}}>
              <div style={{position:'absolute',top:0,left:0,height:'100%',width:`${(row.val/3800)*100}%`,background:row.proj?'rgba(184,217,53,0.35)':C.forest,borderRight:row.proj?`1px dashed ${C.lime}`:'none'}}/>
            </div>
            <div style={{display:'flex',gap:'6px',paddingLeft:'8px',alignItems:'center'}}>
              <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:row.proj?C.lime:C.forest}}>GH₵{row.val}B</span>
              <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>{row.users}M</span>
            </div>
          </div>
        ))}
        <div style={{display:'flex',gap:'16px',marginTop:'6px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'6px'}}><div style={{width:'12px',height:'8px',background:C.forest}}/><span style={{fontFamily:F.sans,fontSize:'9px',color:C.muted}}>Actual</span></div>
          <div style={{display:'flex',alignItems:'center',gap:'6px'}}><div style={{width:'12px',height:'8px',background:'rgba(184,217,53,0.35)',border:`1px dashed ${C.lime}`}}/><span style={{fontFamily:F.sans,fontSize:'9px',color:C.muted}}>Projected</span></div>
        </div>
      </div>
    </div>
  </div>
);

const Fig05 = () => (
  <div style={{marginBottom:'28px'}}>
    <FigCaption num="05" title="Value Capture Layers — Smallholder Agri-Finance Model" note="% of total produce value captured at each layer; BRIDGE intervention points shown"/>
    <div className="fig-scroll">
      <div style={{minWidth:'480px'}}>
        {[
          {layer:'Farm Gate Sale (informal)',      pct:22, current:true,  note:'Farmer receives cash, no formal record'    },
          {layer:'+ COCOBOD Payroll Anchor',       pct:38, bridge:true,   note:'BRIDGE Layer 1: income verification'      },
          {layer:'+ Alt-Credit Score (BRIDGE)',    pct:52, bridge:true,   note:'BRIDGE Layer 2: creditworthiness unlock'  },
          {layer:'+ GIRSAL Guarantee Coverage',    pct:64, bridge:true,   note:'BRIDGE Layer 3: risk mitigation'          },
          {layer:'+ Bundled Agri-Insurance',       pct:73, bridge:true,   note:'BRIDGE Layer 4: downside protection'      },
          {layer:'Full Value Chain Access (2030)', pct:88, target:true,   note:'Farmer income uplift: +3.0× baseline'    },
        ].map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'220px 1fr 50px',gap:'0',marginBottom:'7px',alignItems:'center'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:row.bridge?700:400,color:row.target?C.forest:row.bridge?C.teal:C.muted,paddingRight:'10px',lineHeight:1.35}}>{row.layer}</div>
            <div style={{background:C.paperDark,height:'16px',position:'relative'}}>
              <div style={{position:'absolute',top:0,left:0,height:'100%',width:`${row.pct}%`,background:row.target?C.lime:row.bridge?C.teal:row.current?C.red:'rgba(92,107,94,0.4)'}}/>
            </div>
            <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:row.target?C.positive:row.bridge?C.teal:C.muted,textAlign:'right',paddingLeft:'8px'}}>{row.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Fig06 = () => (
  <div style={{marginBottom:'28px'}}>
    <FigCaption num="06" title="Venture Risk vs Return Matrix" note="Bubble size = capital deployment ($M); position = risk/return profile; color = venture tier"/>
    <div className="fig-scroll">
      <svg viewBox="0 0 660 320" style={{minWidth:'480px',width:'100%',fontFamily:F.sans}}>
        <rect x="0" y="0" width="660" height="320" fill={C.paperDark}/>
        <rect x="60" y="20" width="580" height="260" fill={C.paper}/>
        {/* Zone backgrounds */}
        <rect x="60" y="20" width="290" height="130" fill="rgba(168,32,13,0.04)"/>
        <rect x="350" y="20" width="290" height="130" fill="rgba(184,217,53,0.06)"/>
        <rect x="60" y="150" width="290" height="130" fill="rgba(184,115,10,0.05)"/>
        <rect x="350" y="150" width="290" height="130" fill="rgba(26,107,47,0.06)"/>
        <text x="120" y="44" fill={C.faint} fontSize="9" fontWeight="700">HIGH RISK / LOW RETURN</text>
        <text x="390" y="44" fill={C.faint} fontSize="9" fontWeight="700">HIGH RISK / HIGH RETURN</text>
        <text x="120" y="270" fill={C.faint} fontSize="9" fontWeight="700">LOW RISK / LOW RETURN</text>
        <text x="390" y="270" fill={C.positive} fontSize="9" fontWeight="700">SWEET SPOT ★</text>
        {/* Axes */}
        <line x1="60" y1="150" x2="640" y2="150" stroke={C.border} strokeWidth="1"/>
        <line x1="350" y1="20" x2="350" y2="280" stroke={C.border} strokeWidth="1"/>
        <text x="350" y="298" fill={C.muted} fontSize="8" textAnchor="middle">← Lower Risk · Higher Risk →</text>
        <text x="20" y="150" fill={C.muted} fontSize="8" textAnchor="middle" transform="rotate(-90,20,150)">← Lower Return · Higher Return →</text>
        {/* Ventures plotted */}
        {[
          {x:440,y:80, r:16,color:C.lime,  label:'① Credit Scoring', tier:1},
          {x:370,y:105,r:13,color:C.lime,  label:'④ MSME Market',  tier:1},
          {x:460,y:100,r:14,color:C.lime,  label:'③ Agri-Finance', tier:1},
          {x:400,y:125,r:12,color:C.lime,  label:'② Agent Banking',tier:1},
          {x:430,y:200,r:11,color:C.amber, label:'⑤ Microinsurance',tier:2},
          {x:460,y:185,r:12,color:C.amber, label:'⑥ Cross-border', tier:2},
          {x:500,y:80, r:16,color:C.muted, label:'⑦ Housing MF',  tier:3},
        ].map((v,i)=>(
          <g key={i}>
            <circle cx={v.x} cy={v.y} r={v.r} fill={v.color} opacity="0.85"/>
            <text x={v.x+v.r+4} y={v.y+4} fill={C.ink} fontSize="8" fontWeight="600">{v.label}</text>
          </g>
        ))}
      </svg>
    </div>
  </div>
);

const Fig07 = () => {
  const milestones = [{label:'2026',pct:0},{label:'2027',pct:25},{label:'2028',pct:50},{label:'2029',pct:75},{label:'2030+',pct:100}];
  const tierColor   = {1:C.lime,  2:C.amber,  3:C.muted};
  const tierTx      = {1:C.ink,   2:C.white,  3:C.paper};
  return (
    <div style={{marginBottom:'28px'}}>
      <FigCaption num="07" title="Venture Deployment Roadmap — Gantt Overview" note="Phase timeline 2026–2030+; lime = Tier 1 · amber = Tier 2 · grey = Tier 3"/>
      <div className="fig-scroll">
        <div style={{minWidth:'560px'}}>
          {/* Year axis labels */}
          <div style={{position:'relative',height:'18px',marginLeft:'188px',marginBottom:'6px'}}>
            {milestones.map((m,i)=>(
              <span key={i} style={{position:'absolute',left:`${m.pct}%`,transform:'translateX(-50%)',fontFamily:F.mono,fontSize:'9px',color:C.faint,letterSpacing:'0.5px'}}>{m.label}</span>
            ))}
          </div>
          {/* Venture rows */}
          {S.roadmap.map((v,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',marginBottom:'5px'}}>
              {/* Label */}
              <div style={{width:'180px',flexShrink:0,fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:C.ink,paddingRight:'8px',borderRight:`1px solid ${C.border}`,lineHeight:1.3,textAlign:'right'}}>{v.name}</div>
              {/* Bar track */}
              <div style={{flex:1,height:'22px',position:'relative',background:C.paperDark,marginLeft:'8px'}}>
                {/* Milestone tick lines */}
                {milestones.slice(1,-1).map((m,mi)=>(
                  <div key={mi} style={{position:'absolute',top:0,left:`${m.pct}%`,height:'100%',width:'1px',background:'rgba(216,212,200,0.5)',zIndex:1}}/>
                ))}
                {/* Filled bar */}
                <div style={{
                  position:'absolute',top:'3px',bottom:'3px',
                  left:`${v.s}%`,
                  width:`${v.e-v.s}%`,
                  background:tierColor[v.tier],
                  opacity:0.88,
                  zIndex:2,
                  display:'flex',alignItems:'center',paddingLeft:'5px',overflow:'hidden',
                }}>
                  {(v.e-v.s)>12&&<span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:tierTx[v.tier],whiteSpace:'nowrap',opacity:0.9}}>{v.e-v.s}pp</span>}
                </div>
              </div>
            </div>
          ))}
          {/* Legend */}
          <div style={{display:'flex',gap:'18px',marginTop:'10px',marginLeft:'188px'}}>
            {[{l:'Tier 1',c:C.lime},{l:'Tier 2',c:C.amber},{l:'Tier 3',c:C.muted}].map((t,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'6px'}}>
                <div style={{width:'16px',height:'6px',background:t.c,opacity:0.88}}/>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.muted,fontWeight:600}}>{t.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Fig08 = () => (
  <div style={{marginBottom:'28px'}}>
    <FigCaption num="08" title="Formal Credit Access — International Benchmarks" note="% of adult population with access to formal credit; BRIDGE intervention target vs regional peers"/>
    <div className="fig-scroll">
      <div style={{minWidth:'420px'}}>
        {S.benchmarks.map((b,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'220px 1fr 50px',gap:'0',marginBottom:'8px',alignItems:'center'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:b.highlight?700:400,color:b.highlight==='red'?C.red:b.highlight==='lime'?C.forest:C.ink,paddingRight:'10px'}}>{b.country}</div>
            <div style={{background:C.paperDark,height:'18px',position:'relative'}}>
              <div style={{position:'absolute',top:0,left:0,height:'100%',width:`${b.pct}%`,background:b.highlight==='red'?C.red:b.highlight==='lime'?C.lime:C.teal,opacity:b.highlight?1:0.7}}/>
            </div>
            <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:b.highlight==='red'?C.red:b.highlight==='lime'?C.positive:C.muted,textAlign:'right',paddingLeft:'8px'}}>{b.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Fig09 = () => (
  <div style={{marginBottom:'28px'}}>
    <FigCaption num="09" title="Capital Stack — BRIDGE vs Government Instruments" note="Leverage ratio 1:4.8× — for every $1M BRIDGE deploys, $4.8M in government capital is activated"/>
    <div style={{display:'flex',height:'52px',width:'100%'}}>
      {[
        {label:'BRIDGE\n$14–28M',pct:18,bg:C.lime,tx:C.ink},
        {label:'DBG Co-lending\n$87M',pct:28,bg:C.forest,tx:C.lime},
        {label:'GIRSAL Guarantee\n$174M',pct:35,bg:C.teal,tx:C.paper},
        {label:'NHIS + BoG\n$131M',pct:19,bg:C.muted,tx:C.paper},
      ].map((seg,i)=>(
        <div key={i} style={{width:`${seg.pct}%`,background:seg.bg,display:'flex',alignItems:'center',justifyContent:'center',borderRight:i<3?'2px solid rgba(255,255,255,0.15)':'none',flexShrink:0,overflow:'hidden',padding:'0 4px'}}>
          <span style={{fontFamily:F.mono,fontSize:'clamp(8px,1.1vw,10px)',fontWeight:700,color:seg.tx,textAlign:'center',whiteSpace:'pre-line',lineHeight:1.2}}>{seg.label}</span>
        </div>
      ))}
    </div>
    <div style={{marginTop:'8px',fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic'}}>
      Total capital activation: $410–424M · BRIDGE first-loss position: 4%
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════
   COVER
═══════════════════════════════════════════════════════════════════════ */
const Cover = ({logoRef}) => (
  <div>
    <div className="pad-cover" style={{background:C.ink,padding:'28px 64px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'32px',top:'-8px',fontFamily:F.display,fontSize:'clamp(100px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.022)',lineHeight:1,userSelect:'none',pointerEvents:'none',letterSpacing:'-6px'}}>{S.num}</div>
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
          <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:800,padding:'5px 12px',letterSpacing:'1.5px',flexShrink:0}}>SECTOR {S.num} OF 12</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.07)'}}/>
        </div>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(36px,6vw,78px)',fontWeight:900,color:C.paper,lineHeight:0.95,letterSpacing:'-2.5px',marginBottom:'8px'}}>Financial Inclusion</h1>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,4vw,52px)',fontWeight:700,color:'rgba(250,248,243,0.38)',lineHeight:1,letterSpacing:'-1.5px',marginBottom:'20px'}}>Sector 02 · Core Tier</h2>
        <p style={{fontFamily:F.body,fontSize:'clamp(13px,1.6vw,16px)',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.7,maxWidth:'560px',marginBottom:'0'}}>{S.tagline}</p>
        <div className="stats-row" style={{display:'flex',gap:'0',borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'28px',flexWrap:'wrap'}}>
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

/* ═══════════════════════════════════════════════════════════════════════
   SECTIONS
═══════════════════════════════════════════════════════════════════════ */

const Executive = () => {
  // Always open on mobile — no lazy window.innerWidth check here
  const [secOpen,setSecOpen] = useState(true);
  // Score breakdown progressive disclosure — collapsed on mobile by default
  const [sdOpen,setSdOpen] = useState(false);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  return (
    <div id="sec-exec" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="01" label="Executive Summary" badge="Core · 84/100"
          hint={`$4.6B SME credit gap · 14.7M adults unserved · Q2 2026 DBG window open`}
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div className="tc" style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'48px'}}>
            {/* Left: body text + pull quote */}
            <div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Executive Summary</div>
              <p className="dc" style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.summary}</p>
              <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.summary2}</p>
              <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'24px'}}>{S.summary3}</p>
              {/* v4 pull quote — with rule before attribution */}
              <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',paddingTop:'2px'}}>
                <p style={{fontFamily:F.display,fontSize:'18px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>{S.quote}</p>
                <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:'18px',height:'1px',background:C.lime}}/>
                  <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Sector Assessment, 2026</span>
                </div>
              </div>
            </div>
            {/* Right: score card + snapshot */}
            <div>
              <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
                <button className="mob-toggle mob-toggle-hdr" onClick={()=>setSdOpen(o=>!o)}
                  style={{width:'100%',background:C.forest,padding:'12px 16px',border:'none',cursor:'pointer',textAlign:'left',display:'block'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span>Score Breakdown</span>
                    <span className="mob-show" style={{display:'none',fontSize:'12px',color:'rgba(184,217,53,0.5)',transform:sdOpen?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
                  </div>
                  <div style={{fontFamily:F.mono,fontSize:'26px',color:C.paper,pointerEvents:'none'}}>
                    {S.score} <span style={{fontSize:'11px',color:'rgba(250,248,243,0.4)'}}>/ 100</span>
                  </div>
                </button>
                {/* v4: animated bars + color-coded by score */}
                {S.scoreDims.map((dim,i)=>(
                  <div key={i} className={sdOpen?'':'mob-item-hidden'} style={{padding:'11px 14px',borderBottom:i<3?`1px solid ${C.border}`:'none'}}>
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
              {/* Sector Snapshot — v4: alternating rows + row-hover */}
              <div style={{border:`1px solid ${C.border}`,borderTop:'none',padding:'14px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Sector Snapshot</div>
                {S.snapshot.map((row,i)=>(
                  <div key={i} className="row-hover" style={{display:'flex',justifyContent:'space-between',padding:'7px 10px',marginLeft:'-10px',marginRight:'-10px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?'transparent':C.paperDark}}>
                    <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{row.l}</span>
                    <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:i===0?C.positive:i===1?C.lime:C.forest}}>{row.v}</span>
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

const SubSectors = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  return (
    <div id="sec-subs" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="02" label="Sub-Sectors" badge="6 segments"
          hint="6 sub-sectors scored — SME Finance leads at 91; all rated by BRIDGE Impact Score™ methodology"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 02 — Sub-Sector Analysis</div>
            <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>14 ventures across 6 sub-sectors</div>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Six Paths Into Ghana's Financial Inclusion Gap</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Each sub-sector addresses a distinct failure layer in Ghana's financial infrastructure — from credit scoring gaps to last-mile agent distribution to cross-border trade finance. BRIDGE scores each by deployment readiness and capital efficiency.</p>
          <Fig01/>
          <Carousel wrapClass="car-wrap-dark" items={S.subs} renderCard={(sub,i)=>(
            <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{sub.name}</span>
                <span style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:C.forest}}>{sub.score}</span>
              </div>
              <div style={{display:'flex',gap:'6px',marginBottom:'8px',flexWrap:'wrap'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,background:C.forest,color:C.lime,padding:'2px 8px'}}>{sub.stage}</span>
                <span style={{fontFamily:F.mono,fontSize:'10px',color:C.teal,fontWeight:700}}>{sub.capital}</span>
              </div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5,fontStyle:'italic'}}>{sub.note}</div>
            </div>
          )}/>
          <div className="subs-table">
            <div className="fig-scroll">
            <div style={{minWidth:'600px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
              <div style={{display:'grid',gridTemplateColumns:'2fr 60px 110px 90px 1fr',background:C.forest}}>
                {['Sub-Sector','Score','Stage','Capital','Key Note'].map((h,i)=>(
                  <div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
                ))}
              </div>
              {S.subs.map((sub,i)=>(
                <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 60px 110px 90px 1fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
                  <div style={{padding:'10px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{sub.name}</div>
                  <div style={{padding:'10px 14px',fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:C.forest,borderLeft:`1px solid ${C.border}`}}>{sub.score}</div>
                  <div style={{padding:'8px 14px',borderLeft:`1px solid ${C.border}`}}><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,background:C.forest,color:C.lime,padding:'2px 7px'}}>{sub.stage}</span></div>
                  <div style={{padding:'10px 14px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.teal,borderLeft:`1px solid ${C.border}`}}>{sub.capital}</div>
                  <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.4,borderLeft:`1px solid ${C.border}`}}>{sub.note}</div>
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

const StructuralProblem = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  return (
    <div id="sec-problem" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="03" label="Structural Problem" badge="6 constraints"
          hint="Value chain analysis · 6 compounding constraints · 14.7M adults locked out by infrastructure failure"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 03 — Structural Problem</div>
            <div style={{background:C.red,color:C.white,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>$4.6B credit gap</div>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The Six Constraints That Lock 14.7 Million Adults Out</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'24px',fontStyle:'italic'}}>Ghana's financial exclusion is not a single problem — it is six compounding infrastructure failures that reinforce each other. Solving one in isolation provides limited relief. BRIDGE's value is in addressing the full stack simultaneously.</p>
          <Carousel wrapClass="car-wrap" items={S.constraints} renderCard={(c,i)=>(
            <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'16px'}}>
              <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.lime,background:C.forest,padding:'2px 8px',display:'inline-block',marginBottom:'8px'}}>C{String(i+1).padStart(2,'0')}</div>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'6px'}}>{c.c}</div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.55,fontStyle:'italic'}}>{c.harm}</div>
            </div>
          )}/>
          <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <div style={{display:'grid',gridTemplateColumns:'180px 1fr',background:C.forest}}>
              {['Constraint','Mechanism of Harm'].map((h,i)=>(
                <div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
              ))}
            </div>
            {S.constraints.map((c,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'180px 1fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'start'}}>
                <div style={{padding:'12px 14px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{c.c}</div>
                <div style={{padding:'12px 14px',fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55,borderLeft:`1px solid ${C.border}`}}>{c.harm}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'20px',marginTop:'28px'}}>
            <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>
              "The collateral requirement and the thin-file problem compound each other into a wall. BRIDGE's alternative scoring engine is designed to demolish both simultaneously."
            </p>
            <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE Sector Assessment, 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SmeAnalysis = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  return (
    <div id="sec-sme" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="04" label="SME Finance Analysis" badge="$4.6B opportunity"
          hint="Enterprise credit gap by segment · BRIDGE target reduction · premium intelligence on market sizing"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 04 — SME Finance Analysis</div>
            <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>2.4M MSMEs · 4 segments</div>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Is Excluded, and By How Much</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'24px',fontStyle:'italic'}}>The SME credit gap is not evenly distributed — micro enterprises face near-total exclusion while medium enterprises have partial access. BRIDGE's scoring infrastructure addresses each segment differently, with GIRSAL guarantee cover creating a decisive entry point for the agri-MSME layer.</p>
          <Fig02/>
          <Carousel wrapClass="car-wrap-dark" items={S.smeGap} renderCard={(row,i)=>(
            <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'16px'}}>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'8px'}}>{row.cat}</div>
              <div style={{display:'flex',gap:'12px',marginBottom:'8px'}}>
                <div><div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:C.red}}>{row.cur}%</div><div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>Currently unserved</div></div>
                <div><div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:C.positive}}>{row.tgt}%</div><div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>BRIDGE target</div></div>
              </div>
              <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic'}}>{row.note}</div>
            </div>
          )}/>
          {/* Members Intelligence: Market Sizing */}
          <div style={{border:`1px solid ${C.border}`,overflow:'hidden',marginTop:'28px'}}>
            <div style={{background:C.ink,padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · Market Sizing</div>
                <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Accessible Market by Segment and Phase</div>
              </div>
              <div style={{fontFamily:F.mono,fontSize:'28px',color:C.lime}}>$4.6B</div>
            </div>
            <div className="fig-scroll" style={{margin:'0'}}>
              <div style={{minWidth:'580px'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 80px 120px 100px 80px 100px',background:C.forest}}>
                {['Segment','TAM','Accessible Mkt','YoY Growth','Phase','Priority'].map((h,i)=>(
                  <div key={i} style={{padding:'7px 10px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
                ))}
              </div>
              {S.marketSizes.map((row,i)=>(
                <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 80px 120px 100px 80px 100px',borderBottom:i<3?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
                  <div style={{padding:'9px 12px'}}><div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{row.crop}</div><div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic'}}>{row.note}</div></div>
                  <div style={{padding:'9px 10px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,borderLeft:`1px solid ${C.border}`}}>{row.tam}</div>
                  <div style={{padding:'9px 10px',fontFamily:F.mono,fontSize:'11px',color:C.teal,borderLeft:`1px solid ${C.border}`}}>{row.accessible}</div>
                  <div style={{padding:'9px 10px',fontFamily:F.mono,fontSize:'11px',color:C.positive,borderLeft:`1px solid ${C.border}`}}>{row.growth}</div>
                  <div style={{padding:'9px 10px',fontFamily:F.mono,fontSize:'11px',color:C.muted,borderLeft:`1px solid ${C.border}`}}>Phase {row.phase}</div>
                  <div style={{padding:'9px 10px',borderLeft:`1px solid ${C.border}`}}><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:row.priority==='IMMEDIATE'?C.lime:row.priority==='HIGH'?C.amber:C.muted,background:row.priority==='IMMEDIATE'?C.forest:'transparent',padding:row.priority==='IMMEDIATE'?'2px 7px':'0'}}>{row.priority}</span></div>
                </div>
              ))}
              </div>
            </div>
            <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6,margin:0}}>Accessible market calculated as 5–8% penetration of TAM within 5 years, based on BRIDGE scoring infrastructure capacity and agent network rollout. Full market models with 10-year projections available to Members.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegionalStrategy = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  return (
    <div id="sec-zones" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="05" label="Regional Strategy" badge="4 zones"
          hint="Greater Accra 40% · zone-by-zone capital allocation and financial inclusion intervention priorities"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 05 — Regional Strategy</div>
            <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>4 financial zones</div>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Mapping Exclusion Geographically</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'24px',fontStyle:'italic'}}>Financial exclusion is not uniform across Ghana. The Northern zones face the most acute access gap but also carry government subsidy eligibility. Greater Accra presents the fastest deployment path. Each zone requires a distinct product and distribution strategy.</p>
          <Fig03/>
          <Carousel wrapClass="car-wrap" items={S.zones} renderCard={(z,i)=>(
            <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'16px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
                <div style={{width:'10px',height:'10px',background:z.color,flexShrink:0}}/>
                <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{z.zone}</span>
                <span style={{fontFamily:F.mono,fontSize:'16px',fontWeight:700,color:C.forest,marginLeft:'auto'}}>{z.allocLabel}</span>
              </div>
              <div style={{fontFamily:F.sans,fontSize:'10px',color:C.faint,marginBottom:'6px'}}>{z.regions}</div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5,fontStyle:'italic',marginBottom:'6px'}}>{z.interventions}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic'}}>{z.context}</div>
            </div>
          )}/>
          <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <div style={{display:'grid',gridTemplateColumns:'160px 140px 1fr 1fr',background:C.forest}}>
              {['Zone','Allocation','Interventions','Context'].map((h,i)=>(
                <div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
              ))}
            </div>
            {S.zones.map((z,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'160px 140px 1fr 1fr',borderBottom:i<3?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'start'}}>
                <div style={{padding:'12px 14px',display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:'8px',height:'8px',background:z.color,flexShrink:0}}/>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{z.zone}</span>
                </div>
                <div style={{padding:'12px 14px',fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.forest,borderLeft:`1px solid ${C.border}`}}>{z.allocLabel}</div>
                <div style={{padding:'12px 14px',fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.45,borderLeft:`1px solid ${C.border}`}}>{z.interventions}</div>
                <div style={{padding:'12px 14px',fontFamily:F.body,fontSize:'11px',color:C.faint,fontStyle:'italic',lineHeight:1.45,borderLeft:`1px solid ${C.border}`}}>{z.context}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CompetitiveLandscape = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  return (
    <div id="sec-market" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="06" label="Competitive Landscape" badge="6 players mapped"
          hint="MTN MoMo · Fido · Zeepay · DBG · OI Ghana — BRIDGE positioning vs each player"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 06 — Competitive Landscape</div>
            <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 key players profiled</div>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Navigating, Not Competing With, the Existing Ecosystem</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'24px',fontStyle:'italic'}}>BRIDGE's positioning in Ghana's financial inclusion market is infrastructure-layer, not product-layer. Most existing players operate at the product level — payments, loans, or remittances in isolation. BRIDGE builds the connective tissue that allows existing players to extend into credit, savings, and insurance.</p>
          <Carousel wrapClass="car-wrap-dark" items={S.competitors} renderCard={(c,i)=>(
            <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                <div><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,background:C.paperDark,color:C.muted,padding:'2px 7px'}}>{c.type}</span></div>
              </div>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink,marginBottom:'8px'}}>{c.name}</div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5,fontStyle:'italic',marginBottom:'8px'}}>{c.desc}</div>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest}}>{c.pos}</div>
            </div>
          )} cardClass="mob-snap-wide"/>
          <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <div style={{display:'grid',gridTemplateColumns:'100px 140px 1fr 1fr',background:C.forest}}>
              {['Type','Player','Description','BRIDGE Position'].map((h,i)=>(
                <div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
              ))}
            </div>
            {S.competitors.map((c,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'100px 140px 1fr 1fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'start'}}>
                <div style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.muted,textTransform:'uppercase',letterSpacing:'0.5px'}}>{c.type}</div>
                <div style={{padding:'10px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,borderLeft:`1px solid ${C.border}`}}>{c.name}</div>
                <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.45,borderLeft:`1px solid ${C.border}`}}>{c.desc}</div>
                <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'11px',color:C.forest,lineHeight:1.45,borderLeft:`1px solid ${C.border}`}}>{c.pos}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PolicyWindow = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  return (
    <div id="sec-policy" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="07" label="Policy Window" badge="GH₵5.4B+ aligned"
          hint="DBG co-lending Q2 2026 · GIRSAL 1:4.8× leverage · BoG Sandbox open · deadline closing fast"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 07 — Policy Window</div>
            <div style={{background:C.amber,color:C.white,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>⚡ Q2 2026 DEADLINE</div>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Three Co-Investment Windows. One Deadline.</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'24px',fontStyle:'italic'}}>The 2026 national budget aligns GH₵5.4 billion across three instruments — Development Bank Ghana, GIRSAL, and the BoG Fintech Sandbox — that are structured specifically for private co-investment. First-mover partners access concessional terms and first-loss guarantee positions that will not be available once the tranche is committed.</p>
          <Carousel wrapClass="car-wrap" items={S.budgetItems} renderCard={(row,i)=>(
            <div style={{border:`2px solid ${row.featured?C.lime:C.border}`,background:row.featured?C.forest:C.paper,padding:'16px'}}>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:row.featured?C.lime:C.ink,marginBottom:'8px'}}>{row.item}</div>
              <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:row.featured?C.paper:C.forest,marginBottom:'4px'}}>{row.usd}</div>
              <div style={{fontFamily:F.mono,fontSize:'11px',color:row.featured?'rgba(250,248,243,0.5)':C.faint,marginBottom:'8px'}}>{row.ghc}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:row.featured?C.lime:C.amber,letterSpacing:'1px',textTransform:'uppercase'}}>{row.urgency}</div>
            </div>
          )}/>
          <div className="desk-only" style={{marginBottom:'28px'}}>
            <div className="fig-scroll">
            <div style={{minWidth:'680px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <div style={{display:'grid',gridTemplateColumns:'2fr 90px 100px 60px 160px 180px',background:C.forest}}>
              {['Budget Line','GH₵','USD','Index','Mode','Urgency'].map((h,i)=>(
                <div key={i} style={{padding:'8px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
              ))}
            </div>
            {S.budgetItems.map((row,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 90px 100px 60px 160px 180px',borderBottom:i<3?`1px solid ${C.border}`:'none',background:row.featured?C.forest:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
                <div style={{padding:'10px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:row.featured?700:600,color:row.featured?C.lime:C.ink}}>{row.item}</div>
                <div style={{padding:'10px 12px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:row.featured?C.paper:C.forest,borderLeft:`1px solid ${row.featured?'rgba(255,255,255,0.1)':C.border}`}}>{row.ghc}</div>
                <div style={{padding:'10px 12px',fontFamily:F.mono,fontSize:'11px',color:row.featured?'rgba(250,248,243,0.6)':C.muted,borderLeft:`1px solid ${row.featured?'rgba(255,255,255,0.1)':C.border}`}}>{row.usd}</div>
                <div style={{padding:'10px 12px',fontFamily:F.mono,fontSize:'11px',color:row.featured?C.lime:C.teal,borderLeft:`1px solid ${row.featured?'rgba(255,255,255,0.1)':C.border}`}}>{row.pct}%</div>
                <div style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:row.featured?'rgba(250,248,243,0.7)':C.muted,borderLeft:`1px solid ${row.featured?'rgba(255,255,255,0.1)':C.border}`}}>{row.mode}</div>
                <div style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:row.featured?C.lime:C.amber,borderLeft:`1px solid ${row.featured?'rgba(255,255,255,0.1)':C.border}`}}>{row.urgency}</div>
              </div>
            ))}
            </div>
            </div>
          </div>
          {/* DBG Facility Terms */}
          <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · DBG Facility Terms</div>
                <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Development Bank Ghana — SME Co-lending Terms Summary</div>
              </div>
              <div style={{fontFamily:F.mono,fontSize:'24px',color:C.lime}}>1:4.8×</div>
            </div>
            {S.dbgTerms.map((row,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 16px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,flexWrap:'wrap',gap:'8px'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{row.f}</span>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,textAlign:'right',maxWidth:'60%'}}>{row.t}</span>
              </div>
            ))}
            <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6,margin:0}}>The DBG co-lending structure is BRIDGE's highest-priority entry point. The Q2 2026 application deadline for first-round partnerships is firm. BRIDGE is preparing a complete term sheet package — available to Members now.</p>
            </div>
          </div>
          {/* Regulatory Timeline */}
          <div style={{marginTop:'28px',border:`2px solid ${C.amber}`,background:'rgba(184,115,10,0.04)',overflow:'hidden'}}>
            <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.amber,marginBottom:'3px'}}>◆ Members Intelligence · Regulatory Timeline</div>
                <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Key Policy Milestones — Financial Inclusion 2022–2027</div>
              </div>
              <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.amber,background:'rgba(184,115,10,0.15)',padding:'4px 10px',border:`1px solid ${C.amber}`}}>⚡ BRIDGE ENTRY: Q3 2026</span>
            </div>
            {S.regulatoryTimeline.map((item,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'80px 100px 1fr',alignItems:'start',padding:'10px 16px',borderBottom:i<4?`1px solid rgba(184,115,10,0.15)`:'none',background:item.type==='CRITICAL'?'rgba(168,32,13,0.06)':item.type==='BRIDGE'?'rgba(184,217,53,0.05)':'transparent'}}>
                <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:item.type==='CRITICAL'?C.red:item.type==='BRIDGE'?C.lime:item.type==='FUTURE'?C.faint:C.muted}}>{item.date}</span>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:item.type==='BRIDGE'?C.lime:item.type==='CRITICAL'?C.red:C.faint,paddingTop:'1px'}}>{item.type}</span>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:item.type==='BRIDGE'?C.forest:C.ink,marginBottom:'2px'}}>{item.event}</div>
                  <div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic'}}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DigitalLandscape = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  return (
    <div id="sec-digital" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="08" label="Digital Finance Landscape" badge="20M+ users"
          hint="Mobile money GH₵1.34T · institutional tier analysis · international benchmarks · +39pp target uplift"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 08 — Digital Finance Landscape</div>
            <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>20M+ active mobile money users</div>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Mobile Money Is the Rails. Credit Is the Train.</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'24px',fontStyle:'italic'}}>Ghana has built one of Africa's strongest mobile money ecosystems — GH₵1.34 trillion in annual transaction value, 20M+ active users. But mobile money accounts for less than 3% of active credit products. The infrastructure exists; the products layered on top of it do not. BRIDGE's mandate is to build them.</p>
          <Fig04/>
          <Fig05/>
          {/* Institution Tiers */}
          <div style={{border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:'28px'}}>
            <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · Institution Network</div>
                <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Ghana's Financial Institution Landscape — Readiness Tiers</div>
              </div>
              <div style={{fontFamily:F.mono,fontSize:'24px',color:C.lime}}>1,230+</div>
            </div>
            <div className="fig-scroll">
            <div style={{minWidth:'520px'}}>
            {S.institutionTiers.map((t,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'200px 90px 140px 1fr',alignItems:'start',padding:'12px 16px',borderBottom:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,lineHeight:1.35}}>{t.tier}</div>
                <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:t.color==='positive'?C.positive:t.color==='amber'?C.amber:C.faint}}>{t.count}</div>
                <div style={{fontFamily:F.sans,fontSize:'10px',color:C.faint,fontStyle:'italic',lineHeight:1.4}}>{t.zone}</div>
                <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.55}}>{t.desc}</div>
              </div>
            ))}
            </div>
            </div>
            <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6,margin:0}}>Full institution directory — 340+ Tier 1 institutions with governance ratings, digital readiness scores, and BRIDGE co-lending eligibility — available in the Members Intelligence package.</p>
            </div>
          </div>
          <Fig08/>
          <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'20px',marginTop:'24px'}}>
            <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>
              "Kenya achieved a 48% formal credit access rate in 12 years through mobile credit infrastructure. Ghana has a superior mobile money base — the 39-point uplift is achievable in 8 years if the scoring and distribution infrastructure is built now."
            </p>
            <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE Sector Assessment, 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VenturePipeline = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
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
      <div style={{padding:'8px 10px',borderLeft:`1px solid ${C.border}`}}><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,padding:'2px 6px',background:MODE_BG[v.mode]||C.muted,color:MODE_TX[v.mode]||C.paper}}>{v.mode}</span></div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'11px',color:C.forest,fontWeight:700,borderLeft:`1px solid ${C.border}`}}>{v.capital}</div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'11px',color:C.positive,borderLeft:`1px solid ${C.border}`}}>{v.irr}</div>
      <div style={{padding:'8px 10px',borderLeft:`1px solid ${C.border}`}}><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[v.risk]||C.muted}}>{v.risk}</span></div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'11px',color:C.muted,borderLeft:`1px solid ${C.border}`}}>{v.payback}</div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'10px',color:C.faint,borderLeft:`1px solid ${C.border}`}}>{v.start}</div>
    </div>
  );
  const MCard=({v})=>(
    <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'14px',display:'flex',flexDirection:'column',gap:'6px'}}>
      {/* Header row: name + mode badge */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'8px'}}>
        <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,lineHeight:1.3,flex:1}}>{v.name}</div>
        <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,padding:'2px 6px',background:MODE_BG[v.mode]||C.muted,color:MODE_TX[v.mode]||C.paper,flexShrink:0,lineHeight:1.6}}>{v.mode}</span>
      </div>
      {/* Short description — first sentence only */}
      <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',lineHeight:1.5}}>
        {v.desc.split('.')[0]}.
      </div>
      {/* Financials row */}
      <div style={{display:'flex',gap:'12px',paddingTop:'4px',borderTop:`1px solid ${C.border}`}}>
        <div><div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest}}>{v.capital}</div><div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,letterSpacing:'0.5px',textTransform:'uppercase'}}>Capital</div></div>
        <div><div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.positive}}>{v.irr}</div><div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,letterSpacing:'0.5px',textTransform:'uppercase'}}>IRR</div></div>
        <div style={{marginLeft:'auto',textAlign:'right'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[v.risk]||C.muted}}>{v.risk}</div>
          <div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,textTransform:'uppercase',letterSpacing:'0.5px'}}>{v.start}</div>
        </div>
      </div>
    </div>
  );
  const TH=()=>(
    <div style={{display:'grid',gridTemplateColumns:'28px 2fr 88px 80px 70px 70px 70px 70px',background:C.forest}}>
      {['#','Venture','Mode','Capital','IRR','Risk','Payback','Start'].map((h,i)=>(
        <div key={i} style={{padding:'7px 10px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
      ))}
    </div>
  );
  const TierBlock=({tName,tItems,tYear,tCapital,color})=>(
    <div style={{marginBottom:'20px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
        <div style={{background:color,color:color===C.lime?C.ink:C.white,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>{tName}</div>
        <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>{tYear} · {tCapital}</span>
      </div>
      <Carousel wrapClass="car-wrap" items={tItems} renderCard={(v)=><MCard v={v}/>} cardClass="mob-snap-sm"/>
      <div className="desk-only">
        <div className="fig-scroll">
          <div style={{minWidth:'700px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <TH/>
            {tItems.map((v,i)=><VRow key={i} v={v} i={i} last={i===tItems.length-1}/>)}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div id="sec-ventures" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="09" label="Venture Portfolio" badge="7 ventures · 3 tiers"
          hint="Tier 1: $8.5–17M · 12–24% IRR · Credit Scoring, Agri-Finance, Agent Banking, MSME Marketplace"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 09 — Venture Portfolio</div>
            <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>7 ventures · $14–28M deployment</div>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Seven Infrastructure Plays, Three Deployment Tiers</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'24px',fontStyle:'italic'}}>BRIDGE's financial inclusion portfolio is sequenced: infrastructure-first (Tier 1), product-scale (Tier 2), structural transformation (Tier 3). Tier 1 ventures build the credit scoring and distribution rails that every subsequent venture runs on top of.</p>
          <Fig06/>
          <TierBlock tName="TIER 1" tItems={t1} tYear="2026–2028" tCapital="$8.5–17M priority deployment" color={C.lime}/>
          <TierBlock tName="TIER 2" tItems={t2} tYear="2028–2030" tCapital="$3.5–7M scale deployment" color={C.amber}/>
          <TierBlock tName="TIER 3" tItems={t3} tYear="2030+" tCapital="$4–8M patient capital" color={C.muted}/>
        </div>
      </div>
    </div>
  );
};

const DeploymentRoadmap = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  const Ph=({p})=>(
    <div style={{border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:'12px'}}>
      <div style={{background:C.forest,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'6px'}}>
        <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.lime}}>{p.label}</div>
        <div style={{display:'flex',gap:'12px',flexWrap:'wrap',alignItems:'center'}}>
          <span style={{fontFamily:F.mono,fontSize:'12px',color:C.paper}}>{p.years}</span>
          <span style={{fontFamily:F.mono,fontSize:'12px',color:C.lime}}>{p.capital}</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.5)'}}>{p.count}</span>
        </div>
      </div>
      <div style={{padding:'0'}}>
        {p.items.map((item,i)=>(
          <div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'8px 16px',borderBottom:i<p.items.length-1?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
            <span style={{color:C.lime,fontFamily:F.mono,fontSize:'11px',flexShrink:0}}>→</span>
            <span style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.5}}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div id="sec-roadmap" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="10" label="Deployment Roadmap" badge="3 phases"
          hint="Q1 2026 start · infrastructure first · phase-by-phase milestones and critical dependencies"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 10 — Deployment Roadmap</div>
            <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>$16–32M across 3 phases</div>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Infrastructure First. Scale After. Transform Last.</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'24px',fontStyle:'italic'}}>The sequencing is deliberate: Phase 1 builds the credit rails that Phase 2 and 3 depend on. Deploying product scale before the scoring and distribution infrastructure exists is the failure mode that has defined fintech in West Africa for a decade. BRIDGE does not repeat it.</p>
          <Fig07/>
          <Ph p={S.timeline.phase1}/>
          <Ph p={S.timeline.phase2}/>
          <Ph p={S.timeline.phase3}/>
        </div>
      </div>
    </div>
  );
};

const CrossSectorSynergy = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  return (
    <div id="sec-synergy" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="11" label="System Integration" badge="8 sector links"
          hint="Financial Inclusion links Agriculture, Health, Energy, Infrastructure and 4 more sectors"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 11 — Cross-Sector Synergies</div>
            <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>8 active sector links</div>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Financial Inclusion Is the Connective Tissue of the Full Portfolio</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'24px',fontStyle:'italic'}}>More than any other sector in BRIDGE's portfolio, Financial Inclusion creates infrastructure that every other sector depends on. Agricultural finance, health premium finance, energy PAYGO lending, and construction working capital all run on the same credit scoring and payment rails BRIDGE is building here.</p>
          <Carousel wrapClass="car-wrap" items={S.synergies} renderCard={(s,i)=>(
            <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'16px'}}>
              <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.lime,background:C.forest,padding:'2px 8px',display:'inline-block',marginBottom:'8px'}}>{s.sector}</div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5,fontStyle:'italic'}}>{s.link}</div>
            </div>
          )} cardClass="mob-snap-wide"/>
          <div className="desk-only" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0',border:`1px solid ${C.border}`,overflow:'hidden'}}>
            {S.synergies.map((s,i)=>(
              <div key={i} style={{padding:'14px 18px',borderBottom:i<6?`1px solid ${C.border}`:'none',borderRight:i%2===0?`1px solid ${C.border}`:'none',background:i%4<2?C.paper:C.paperDark}}>
                <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.lime,background:C.forest,padding:'2px 8px',display:'inline-block',marginBottom:'6px'}}>{s.sector}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.5,fontStyle:'italic'}}>{s.link}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CoInvestment = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  return (
    <div id="sec-coinvest" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="12" label="Co-Investment" badge="6 DFIs mapped"
          hint="IFC · GIZ · USAID · Acumen · Helios · DBG — capital types, alignment, and BRIDGE stack role"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 12 — Co-Investment Landscape</div>
            <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 co-investors profiled</div>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Else Is Deploying Into This Gap</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'24px',fontStyle:'italic'}}>Ghana's financial inclusion sector is one of the most DFI-active in the BRIDGE portfolio. IFC, USAID, GIZ, and Acumen all have active mandates — but none with the operational infrastructure mandate that BRIDGE brings. The co-investment case is about stack design, not capital competition.</p>
          <div style={{border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:'24px'}}>
            <div style={{background:C.ink,padding:'10px 16px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'2px'}}>◆ Members Intelligence · Co-Investor Directory</div>
              <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.paper}}>Active and Potential Co-investors — Financial Inclusion Sector</div>
            </div>
            <Carousel wrapClass="car-wrap" items={S.coInvestors} renderCard={(ci,i)=>(
              <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'16px'}}>
                <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink,marginBottom:'4px'}}>{ci.name}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,background:C.forest,color:C.lime,padding:'2px 7px',display:'inline-block',marginBottom:'8px'}}>{ci.type}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,marginBottom:'6px'}}>{ci.focus}</div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'10px'}}>
                  <span style={{fontFamily:F.mono,fontWeight:700,color:C.forest}}>{ci.capital}</span>
                  <span style={{fontFamily:F.sans,color:ci.stage==='Active'?C.positive:ci.stage==='Deployed'?C.teal:C.amber,fontWeight:700}}>{ci.stage}</span>
                </div>
              </div>
            )} cardClass="mob-snap-wide"/>
            <div className="desk-only">
              <div style={{display:'grid',gridTemplateColumns:'140px 110px 1fr 1fr 90px 90px',background:C.forest}}>
                {['Investor','Type','Focus Area','Phase Alignment','Capital','Status'].map((h,i)=>(
                  <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
                ))}
              </div>
              {S.coInvestors.map((ci,i)=>(
                <div key={i} style={{display:'grid',gridTemplateColumns:'140px 110px 1fr 1fr 90px 90px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
                  <div style={{padding:'9px 12px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{ci.name}</div>
                  <div style={{padding:'8px 12px',borderLeft:`1px solid ${C.border}`}}><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,background:C.forest,color:C.lime,padding:'2px 6px'}}>{ci.type}</span></div>
                  <div style={{padding:'9px 12px',fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',borderLeft:`1px solid ${C.border}`}}>{ci.focus}</div>
                  <div style={{padding:'9px 12px',fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',borderLeft:`1px solid ${C.border}`}}>{ci.alignment}</div>
                  <div style={{padding:'9px 12px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,borderLeft:`1px solid ${C.border}`}}>{ci.capital}</div>
                  <div style={{padding:'9px 12px',borderLeft:`1px solid ${C.border}`}}><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:ci.stage==='Active'?C.positive:ci.stage==='Deployed'?C.teal:C.amber}}>{ci.stage}</span></div>
                </div>
              ))}
            </div>
            <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6,margin:0}}>Full co-investor profiles — contact details, program mandates, application processes, and BRIDGE stack fit analysis — available to Members. Co-investor introductions facilitated for Members in active deployment.</p>
            </div>
          </div>
          <Fig09/>
        </div>
      </div>
    </div>
  );
};

const RiskThesis = () => {
  const [secOpen,setSecOpen] = useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const {forceOpen} = React.useContext(ExpandCtx);
  useEffect(()=>{ if(forceOpen!==null) setSecOpen(forceOpen); },[forceOpen]);
  return (
    <div id="sec-risk" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="13" label="Risk & Thesis" badge="6 risk categories"
          hint="Credit default · regulatory · technology · FX · partner · adoption — full mitigation framework"
          open={secOpen} onToggle={()=>setSecOpen(o=>!o)}/>
        <div className={secOpen?'':'sec-body-hidden'}>
          <div className="sec-rule mob-hide"/>
          <div className="tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Risk Matrix</div>
              <Carousel wrapClass="car-wrap-dark" items={S.risks} renderCard={(r,i)=>(
                <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'14px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                    <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{r.r}</span>
                    <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[r.sev]||C.muted,textTransform:'uppercase'}}>{r.sev}</span>
                  </div>
                  <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5}}>{r.mit}</div>
                </div>
              )}/>
              <div className="desk-only">
                {S.risks.map((r,i)=>(
                  <div key={i} style={{paddingBottom:'12px',marginBottom:'12px',borderBottom:i<5?`1px solid ${C.border}`:'none'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'3px'}}>
                      <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,flex:1,paddingRight:'8px'}}>{r.r}</span>
                      <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',color:RISK_COLOR[r.sev]||C.muted,textTransform:'uppercase',flexShrink:0}}>{r.sev}</span>
                    </div>
                    <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic'}}>{r.mit}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="sec-rule mob-hide"/>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'18px'}}>Investment Thesis</div>
              <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.thesis}</p>
              <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'22px'}}>{S.thesis2}</p>
              <div style={{background:C.forest,padding:'18px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'10px'}}>Deployment Parameters</div>
                {S.deploy.map((p,i)=>(
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:i<4?`1px solid rgba(255,255,255,0.08)`:'none'}}>
                    <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.45)'}}>{p.l}</span>
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

/* ═══════════════════════════════════════════════════════════════════════
   UPSELL
═══════════════════════════════════════════════════════════════════════ */
const Upsell = () => {
  const [intent,setIntent] = useState(null);
  const [pkgOpen,setPkgOpen] = useState(false);
  const icons = {
    package:(<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>),
    partnership:(<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
    briefing:(<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>),
  };
  const opts=[
    {key:'package',    icon:icons.package,    label:'Full Package',    sub:'Operational tools & models'   },
    {key:'partnership',icon:icons.partnership,label:'Partnership',     sub:'Work directly with BRIDGE'    },
    {key:'briefing',   icon:icons.briefing,   label:'30-Min Briefing', sub:'No commitment, find fit first'},
  ];
  return (
    <div id="upsell" style={{background:C.ink,position:'relative',overflow:'hidden'}}>
      <div className="pad-upsell" style={{padding:'44px 64px',position:'relative'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,4vw,48px)',fontWeight:900,fontStyle:'italic',color:C.paper,lineHeight:1.1,letterSpacing:'-1px',marginBottom:'12px'}}>
            You have the intelligence.<br/><span style={{color:C.lime}}>Now let's deploy it.</span>
          </h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.45)',lineHeight:1.75,maxWidth:'580px',marginBottom:'28px',fontStyle:'italic'}}>
            Your brief is the strategic layer. The next step is operational.
          </p>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'12px'}}>What are you looking for?</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',marginBottom:'24px'}} className="tc">
            {opts.map((opt)=>{
              const active=intent===opt.key;
              return (
                <button key={opt.key} onClick={()=>setIntent(active?null:opt.key)} style={{background:active?'rgba(184,217,53,0.1)':'rgba(255,255,255,0.03)',border:active?`1.5px solid ${C.lime}`:'1px solid rgba(255,255,255,0.1)',padding:'16px 16px',minHeight:'64px',cursor:'pointer',textAlign:'left',transition:'background 0.18s,border-color 0.18s',display:'flex',alignItems:'center',gap:'14px'}}>
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
          {intent==='package'&&(
            <div style={{border:'1px solid rgba(184,217,53,0.2)',background:'rgba(184,217,53,0.04)',marginBottom:'20px',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(184,217,53,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.lime,marginBottom:'2px'}}>Full Intelligence Package — Financial Inclusion Sector</div>
                  <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.4)'}}>12 standalone deliverables · custom-priced</div>
                </div>
                <button onClick={()=>setPkgOpen(o=>!o)} style={{background:'transparent',border:'1px solid rgba(184,217,53,0.3)',padding:'6px 12px',cursor:'pointer',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1px',whiteSpace:'nowrap'}}>
                  {pkgOpen?'Hide list ↑':'View all 12 →'}
                </button>
              </div>
              {pkgOpen&&(
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0'}} className="upsell-grid">
                  {S.fullPackage.map((pkg,idx)=>(
                    <div key={idx} style={{padding:'11px 16px',borderBottom:idx<S.fullPackage.length-2?'1px solid rgba(255,255,255,0.05)':'none',borderRight:idx%2===0?'1px solid rgba(255,255,255,0.05)':'none',display:'flex',gap:'10px',alignItems:'flex-start'}}>
                      <span style={{color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,flexShrink:0,lineHeight:1.5}}>→</span>
                      <div>
                        <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.lime,marginBottom:'2px'}}>{pkg.item}</div>
                        <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.35)',lineHeight:1.55,fontStyle:'italic'}}>{pkg.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{padding:'14px 20px',background:'rgba(0,0,0,0.15)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
                <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.3)'}}>Custom-priced. No standard tiers.</span>
                <a href="mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Financial Inclusion Sector" className="cta-primary" style={{background:C.lime,color:C.ink,padding:'10px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',flexShrink:0}}>Request Scope →</a>
              </div>
            </div>
          )}
          {intent==='partnership'&&(
            <div style={{border:'1px solid rgba(184,217,53,0.2)',background:'rgba(184,217,53,0.04)',marginBottom:'20px',padding:'20px'}}>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.lime,marginBottom:'8px'}}>Partnership — Work Directly with BRIDGE</div>
              <p style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.55)',lineHeight:1.7,marginBottom:'16px',fontStyle:'italic'}}>BRIDGE partners with institutions deploying capital, building product, or holding policy mandates in the financial inclusion sector. Partnership structures range from co-investment and technology licensing to joint venture and operational roles.</p>
              <a href="mailto:partnerships@bridgepbc.com?subject=Partnership Inquiry — Financial Inclusion Sector" style={{background:C.lime,color:C.ink,padding:'10px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',display:'inline-block'}}>Start a Conversation →</a>
            </div>
          )}
          {intent==='briefing'&&(
            <div style={{border:'1px solid rgba(184,217,53,0.2)',background:'rgba(184,217,53,0.04)',marginBottom:'20px',padding:'20px'}}>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.lime,marginBottom:'8px'}}>30-Minute Briefing — No Commitment Required</div>
              <p style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.55)',lineHeight:1.7,marginBottom:'16px',fontStyle:'italic'}}>A structured 30-minute call with the BRIDGE Financial Inclusion team. We walk through the current deployment map, active co-investment windows, and where your interests fit — before any commitment is made on either side.</p>
              <a href="mailto:briefing@bridgepbc.com?subject=30-Min Briefing Request — Financial Inclusion Sector" style={{background:C.lime,color:C.ink,padding:'10px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',display:'inline-block'}}>Book 30 Minutes →</a>
            </div>
          )}
          <div style={{border:`1px solid ${C.amber}`,borderLeft:`3px solid ${C.amber}`,background:'rgba(184,115,10,0.08)',padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px',marginTop:intent?'0':'8px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
              <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.amber,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0}}>⚡ Q2 2026</span>
              <div style={{width:'1px',height:'20px',background:'rgba(184,115,10,0.35)',flexShrink:0}}/>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>DBG SME Co-lending Window — Application Deadline</span>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:C.amber,flexShrink:0}}>1:4.8×</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════════ */
const Footer = () => (
  <div className="pad-footer" style={{background:'#050d07',padding:'18px 64px',borderTop:'1px solid rgba(184,217,53,0.1)'}}>
    <div className="footer-inner" style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
        <Logo height={17} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.08)'}}/>
        <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.16)',letterSpacing:'0.5px',lineHeight:1.5}}>
          Sector 02 of 12 · Financial Inclusion
          <br className="mob-only"/>
          <span className="mob-hide"> · Full Members Edition · March 2026 · bridgepbc.com/intelligence</span>
        </span>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'18px'}}>
        {['All Sectors','Members','Full Package','Contact'].map((l,i)=>(
          <a key={i} href="#" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.2)',textDecoration:'none',letterSpacing:'0.5px'}}>{l}</a>
        ))}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════════════════════════ */
export default function BRIDGE_Sector02_FinancialInclusion() {
  const coverRef = useRef(null);
  const [forceOpen,setForceOpen] = useState(null);
  const [barAllOpen,setBarAllOpen] = useState(false);
  const toggleAll = () => {
    const next = !barAllOpen;
    setBarAllOpen(next);
    setForceOpen(next);
    setTimeout(()=>setForceOpen(null),50);
  };
  return (
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
        <SmeAnalysis/>
        <RegionalStrategy/>
        <CompetitiveLandscape/>
        <PolicyWindow/>
        <DigitalLandscape/>
        <VenturePipeline/>
        <DeploymentRoadmap/>
        <CrossSectorSynergy/>
        <CoInvestment/>
        <RiskThesis/>
        <Upsell/>
        <Footer/>
      </div>
    </ExpandCtx.Provider>
  );
}
