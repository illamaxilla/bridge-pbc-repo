import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Blocks, Wallet, Cross, Cpu, GraduationCap, Sprout, Camera, Home, Luggage, BatteryCharging, Factory, Truck, ArrowUpRight, Filter, ChevronDown, Lock, GitMerge, Target, DollarSign, Clock, BarChart2, Shield, MapPin } from 'lucide-react';
import { DOC_COLORS as C, DOC_FONTS as F } from "@/lib/document-tokens";
import DocumentGlobalStyles from "@/components/documents/DocumentGlobalStyles";
import DocumentLogo from "@/components/documents/DocumentLogo";

const useIsMobile = () => {
  const [mob,setMob] = useState(()=>typeof window!=='undefined'&&window.innerWidth<600);
  useEffect(()=>{
    const fn=()=>setMob(window.innerWidth<600);
    window.addEventListener('resize',fn);
    return()=>window.removeEventListener('resize',fn);
  },[]);
  return mob;
};

const EXTRA_CSS = `
  button,a{-webkit-tap-highlight-color:transparent;}
  button:focus,a:focus{outline:none;}
  .opp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:20px;}
  .db-search::placeholder{color:${C.faint};font-family:${F.sans};font-size:13px;}
  .db-search:focus{outline:none;border-color:${C.forest}!important;}
  .fpill{transition:all 0.12s ease;outline:none;-webkit-tap-highlight-color:transparent;}
  .fpill:hover{border-color:${C.forest}!important;color:${C.forest}!important;}
  .filter-panel{max-height:0;overflow:hidden;transition:max-height 0.35s ease;}
  .filter-panel.open{max-height:800px;}
  .chip-strip{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
  .chip-strip:empty{display:none;}
  .score-bar-fill{transition:width 0.5s ease;}
  .dim-row{display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid ${C.border};}
  .dim-row:last-child{border-bottom:none;}
  .mode-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;
    font-family:${F.sans};font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;}
  .risk-row{display:grid;grid-template-columns:1fr 60px 60px 1.4fr;gap:8px;padding:8px 0;border-bottom:1px solid ${C.border};align-items:start;}
  .risk-row:last-child{border-bottom:none;}
  .pipeline-track{display:flex;align-items:center;gap:0;}
  .pipeline-step{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;}
  .pipeline-line{flex:1;height:2px;background:${C.border};}
  .modal-overlay{position:fixed;inset:0;z-index:200;background:rgba(13,26,16,0.72);
    display:flex;align-items:center;justify-content:center;padding:24px;}
  .modal-box{background:${C.paper};width:100%;max-width:780px;max-height:92vh;
    overflow-y:auto;border-top:3px solid ${C.lime};box-shadow:0 24px 80px rgba(0,0,0,0.35);}
  .modal-tab{outline:none;background:none;border:none;border-bottom:3px solid transparent;cursor:pointer;
    padding:13px 18px;white-space:nowrap;transition:color 0.15s ease,background 0.15s ease;
    font-family:${F.sans};font-size:11px;font-weight:700;letter-spacing:0.3px;color:rgba(255,255,255,0.5);}
  .modal-tab:hover{color:rgba(255,255,255,0.85);background:rgba(0,0,0,0.1);}
  .modal-tab.active{color:${C.lime};border-bottom-color:${C.lime};background:rgba(0,0,0,0.15);}
  @media(hover:hover){
    .opp-card:hover{border-color:${C.forest}!important;box-shadow:0 4px 20px rgba(27,77,62,0.12)!important;}
  }
  .opp-card{transition:border-color 0.15s ease,box-shadow 0.15s ease;-webkit-tap-highlight-color:transparent;}
  @media(max-width:900px){
    .opp-grid{grid-template-columns:1fr!important;}
  }
  @media(max-width:600px){
    .opp-grid{grid-template-columns:1fr!important;}
    .modal-overlay{align-items:flex-end!important;padding:0!important;background:rgba(13,26,16,0.8)!important;}
    .modal-box{max-height:96vh;border-radius:0!important;width:100%!important;max-width:100%!important;}
    .modal-tab{padding:11px 12px!important;font-size:10px!important;}
    .filter-sheet{position:fixed;bottom:0;left:0;right:0;z-index:310;
      background:${C.paper};border-top:3px solid ${C.forest};
      max-height:90vh;overflow-y:auto;
      transform:translateY(100%);transition:transform 0.32s cubic-bezier(0.32,0.72,0,1);
      padding-bottom:calc(16px + env(safe-area-inset-bottom,0px));}
    .filter-sheet.open{transform:translateY(0);}
    .sheet-overlay{position:fixed;inset:0;z-index:300;background:rgba(13,26,16,0.5);
      opacity:0;pointer-events:none;transition:opacity 0.25s ease;}
    .sheet-overlay.open{opacity:1;pointer-events:all;}
    .mob-cta-bar{position:fixed;bottom:0;left:0;right:0;z-index:250;
      background:${C.paper};border-top:1px solid ${C.border};
      padding:12px 18px calc(12px + env(safe-area-inset-bottom,0px));
      display:flex;gap:8px;}
    .mob-page-pad{padding-bottom:80px!important;}
    .risk-row{grid-template-columns:1fr 50px 50px!important;}
    .risk-mit{display:none!important;}
    .pipeline-track{flex-direction:column!important;align-items:flex-start!important;gap:8px!important;}
    .pipeline-step{flex-direction:row!important;align-items:center!important;gap:8px!important;}
    .pipeline-line{display:none!important;}
  }
  .dash-overlay{position:fixed;inset:0;z-index:400;background:${C.ink};overflow-y:auto;
    animation:dashIn 0.3s ease;}
  @keyframes dashIn{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
  .dash-module{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);padding:16px;}
  .dash-module-label{font-family:${F.sans};font-size:8px;font-weight:700;letter-spacing:2px;
    text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:8px;}
  .dash-bar{height:4px;background:rgba(255,255,255,0.06);margin-top:6px;overflow:hidden;}
  .dash-bar-fill{height:100%;background:${C.lime};opacity:0.6;}
  @media(max-width:600px){
    .dash-grid-3{grid-template-columns:1fr 1fr!important;}
    .dash-grid-2{grid-template-columns:1fr!important;}
    .dash-modules{grid-template-columns:1fr!important;}
  }
`;

const SECTOR_ICONS = {
  1:Blocks,2:Wallet,3:Cross,4:Cpu,5:GraduationCap,6:Sprout,
  7:Camera,8:Home,9:Luggage,10:BatteryCharging,11:Factory,12:Truck,
};
const SECTORS_META = [
  {id:1,num:'01',name:'Infrastructure',shortName:'Infrastructure'},
  {id:2,num:'02',name:'Financial Inclusion',shortName:'Financial'},
  {id:3,num:'03',name:'Health Systems',shortName:'Health'},
  {id:4,num:'04',name:'Technology & Innovation',shortName:'Technology'},
  {id:5,num:'05',name:'Education & Skills',shortName:'Education'},
  {id:6,num:'06',name:'Agriculture & Value Chains',shortName:'Agriculture'},
  {id:7,num:'07',name:'Sports & Creative',shortName:'Creative'},
  {id:8,num:'08',name:'Housing & Real Estate',shortName:'Housing'},
  {id:9,num:'09',name:'Tourism & Hospitality',shortName:'Tourism'},
  {id:10,num:'10',name:'Energy & Renewables',shortName:'Energy'},
  {id:11,num:'11',name:'Manufacturing',shortName:'Manufacturing'},
  {id:12,num:'12',name:'Transportation & Logistics',shortName:'Logistics'},
];

const OPPORTUNITIES = [
  // ── SECTOR 1 · INFRASTRUCTURE ──
  { id:'I-01', sector:1, title:'Kejetia Market Digital Platform',
    desc:"Digitize West Africa's largest market — 10,000+ traders, payments, inventory, and market intelligence.",
    fullDesc:"The Kejetia Market in Kumasi serves over 10,000 traders and tens of thousands of daily customers, generating an estimated GHS 500M+ in annual transaction volume. Despite this scale, virtually all operations remain paper-based: no digital payments, no inventory management, no credit history for traders. BRIDGE's platform integrates payments (MTN MoMo, Vodafone Cash, bank rails), inventory management, trader credit scoring, and market intelligence — creating the data infrastructure that enables formal financial inclusion at scale.",
    score:87, dims:[26,22,22,17], subDims:{pp:[9,9,8],sf:[9,8,5],fe:[8,8,6],fs:[6,6,5]},
    tier:'Core', capMin:2, capMax:5, stage:'Active', region:'Kumasi', tags:['Platform','FinTech','Markets'],
    mode:'INCUBATE', modeRationale:'BRIDGE builds and operates directly — centrally strategic, requires BRIDGE-managed infrastructure and quality control.',
    pipeline:3, irr:'18–24%', structure:'Equity + Revenue Share', minTicket:'$250,000', horizon:'3–5 years',
    thesis:"Kejetia's scale creates a winner-take-most dynamic — the platform that achieves critical trader adoption controls the market's data and payment rails. BRIDGE's direct operator model, combined with GMA endorsement, positions this as the definitive infrastructure play.",
    thesis2:"Revenue streams include: transaction fees (0.5–1.2%), SaaS licensing to GMA, premium analytics for FMCG brands, and embedded lending margins. At 30% trader adoption, the platform generates $1.2M+ annually.",
    risks:[{cat:'Trader Adoption',prob:'Medium',impact:'High',mit:'Phased onboarding with incentive program. Peer champion network. GMA mandate support.'},{cat:'Regulatory / BoG',prob:'Low',impact:'High',mit:'Early regulatory engagement. Operate under existing e-money frameworks.'},{cat:'Connectivity Infrastructure',prob:'Medium',impact:'Medium',mit:'Offline-capable app. MTN partnership. Backup USSD layer.'},{cat:'Competitive Entry',prob:'Medium',impact:'Medium',mit:'Government endorsement moat. First-mover data advantage. Exclusive GMA MOU.'}],
    crossSectors:[2,4,6,12], crossNotes:'Feeds trader credit data to Financial Inclusion (S2). Technology stack shared with AgriTech (S4). Connects to cold chain logistics (S6, S12).',
  },
  { id:'I-02', sector:1, title:'Urban Water Kiosk Network',
    desc:'Last-mile water distribution kiosks with smart meters and mobile payment integration across underserved urban peripheries.',
    fullDesc:'Over 4 million urban Ghanaians lack reliable piped water access, relying on expensive informal vendors charging 5–10x GWCL tariff rates. BRIDGE deploys solar-powered smart kiosks in peri-urban communities — each connects to municipal distribution grid, incorporates IoT metering, mobile payment, and remote monitoring. The model captures 40–60% margin vs. informal vendors while reducing household water costs by 35–50%.',
    score:81, dims:[24,20,21,16], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Seed', region:'Accra', tags:['Utilities','Infrastructure','Impact'],
    mode:'INVEST', modeRationale:'Proven model with replicable unit economics. BRIDGE co-invests alongside GWCL partnership. Local operators manage kiosks.',
    pipeline:2, irr:'12–16%', structure:'Debt + Equity', minTicket:'$150,000', horizon:'4–6 years',
    thesis:"Water access is a high-frequency, recurring-revenue service with captive demand. Each kiosk generates GHS 3,000–8,000/month net. At 50 kiosks, the network is self-sustaining with replication capital from operations.",
    thesis2:"GWCL partnership provides subsidized grid access and regulatory cover. Community operator model reduces BRIDGE operational overhead and creates local employment.",
    risks:[{cat:'GWCL Grid Reliability',prob:'High',impact:'Medium',mit:'Solar + storage backup on each kiosk.'},{cat:'Community Acceptance',prob:'Low',impact:'High',mit:'Community consultation pre-deployment. Revenue sharing with community associations.'},{cat:'Vandalism / Security',prob:'Medium',impact:'Medium',mit:'Robust kiosk design. Community stewardship agreements.'},{cat:'Tariff Changes',prob:'Low',impact:'Medium',mit:'Long-term GWCL MOU with tariff protection clauses.'}],
    crossSectors:[3,6,11], crossNotes:'Supports health outcomes (S3). Agri-processing needs reliable water (S6). Manufacturing sites require water infrastructure (S11).',
  },
  { id:'I-03', sector:1, title:'District Road Maintenance Co-op',
    desc:'Community-owned road maintenance enterprises with shared machinery and long-term government maintenance contracts.',
    fullDesc:"Ghana's 30,000+ km of feeder roads are chronically undermaintained, cutting smallholder farmers off from markets for months annually. The Ghana Highway Authority contracts road maintenance but lacks delivery capacity in rural districts. BRIDGE structures community-owned maintenance co-operatives — equipped with shared graders and compactors — to hold long-term GHA contracts. The model creates permanent rural employment while solving the maintenance gap that costs the agricultural sector an estimated GHS 1.2B annually in spoilage and market exclusion.",
    score:74, dims:[22,18,20,14], subDims:{pp:[8,8,6],sf:[7,6,5],fe:[8,7,5],fs:[5,4,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'Northern Regions', tags:['Infrastructure','Employment','Rural'],
    mode:'CONNECT', modeRationale:'BRIDGE structures partnerships between GHA, district assemblies, and local co-ops. Capital facilitation role, not direct operator.',
    pipeline:1, irr:'8–12%', structure:'Revenue Share', minTicket:'$50,000', horizon:'5–7 years',
    thesis:"Government maintenance budgets are allocated but unspent due to lack of delivery capacity. BRIDGE unlocks existing public capital by providing the organizational infrastructure GHA cannot build itself.",
    thesis2:"Co-operative model aligns community incentives with road quality. Employment creation is a direct by-product of the economic activity BRIDGE unlocks.",
    risks:[{cat:'Contract Payment Delays',prob:'High',impact:'High',mit:'Payment escrow structure. District assembly guarantee. AfDB backstop discussions.'},{cat:'Equipment Maintenance',prob:'Medium',impact:'High',mit:'Manufacturer service agreements. Operator training programme.'},{cat:'Political Interference',prob:'Medium',impact:'Medium',mit:'GHA national level contract. Cross-district structure minimises local political risk.'}],
    crossSectors:[1,6,12], crossNotes:'Unlocks agricultural market access (S6). Feeds into transport infrastructure network (S12).',
  },
  { id:'I-04', sector:1, title:'Sanitation Service Enterprise',
    desc:'Fecal sludge management and community sanitation with biogas recovery, creating circular waste-to-energy value chains.',
    fullDesc:'Only 14% of Ghanaians have access to improved sanitation. In urban areas, 70%+ rely on shared or unimproved facilities. Fecal sludge management is fragmented, informal, and creates serious public health risks. BRIDGE structures a sanitation enterprise combining emptying services, treatment infrastructure, and biogas recovery — turning a public health liability into a revenue-generating asset. Treatment facilities produce biogas for cooking fuel and treated effluent for agricultural use.',
    score:78, dims:[23,20,20,15], subDims:{pp:[9,8,6],sf:[8,7,5],fe:[7,7,6],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:4, stage:'Seed', region:'Greater Accra', tags:['Sanitation','CleanEnergy','Impact'],
    mode:'INVEST', modeRationale:'Impact-first venture requiring patient capital. BRIDGE invests alongside development finance to de-risk initial infrastructure.',
    pipeline:2, irr:'10–14%', structure:'Blended Finance', minTicket:'$200,000', horizon:'5–8 years',
    thesis:"Sanitation is a public good with demonstrable willingness-to-pay in urban Ghana. The biogas recovery model adds a commercial revenue stream that subsidises the public health service component.",
    thesis2:"Government WASH targets and DFI mandates create a ready co-investment landscape. AfDB, USAID Feed the Future, and World Bank all have active Ghana WASH programmes seeking private sector co-investors.",
    risks:[{cat:'Sludge Volume Variability',prob:'Medium',impact:'Medium',mit:'Multi-district coverage smooths volume risk.'},{cat:'Biogas Market Development',prob:'Medium',impact:'Medium',mit:'Pre-agreed offtake with institutional kitchens and schools.'},{cat:'Community Engagement',prob:'Low',impact:'High',mit:'Community health education integrated into service design.'}],
    crossSectors:[3,6,10], crossNotes:'Health outcomes direct (S3). Treated effluent for agriculture (S6). Biogas energy recovery (S10).',
  },
  { id:'I-05', sector:1, title:'Telecom Tower Colocation Platform',
    desc:'Independent tower management aggregating passive infrastructure for MNOs — reducing duplication and lowering rural coverage costs.',
    fullDesc:'Ghana has 5,000+ telecom towers, the majority owned by individual MNOs operating in siloed, duplicated infrastructure. Tower sharing can reduce coverage costs by 30–40%, directly enabling rural expansion economics that single-operator models cannot support. BRIDGE structures an independent towerco acquiring or building shared towers in underserved regions under long-term tenancy agreements with 2–4 MNOs per site.',
    score:72, dims:[21,18,19,14], subDims:{pp:[7,7,7],sf:[8,6,4],fe:[7,7,5],fs:[5,5,4]},
    tier:'Emerging', capMin:5, capMax:15, stage:'Concept', region:'National', tags:['Telecom','Infrastructure','Rural'],
    mode:'INVEST', modeRationale:'Capital-intensive, long-duration asset. BRIDGE co-invests with infrastructure fund. Operational management by specialized towerco partner.',
    pipeline:1, irr:'12–16%', structure:'Infrastructure Fund Structure', minTicket:'$1,000,000', horizon:'7–10 years',
    thesis:"Towerco is a proven global model. Ghana's NCA regulatory environment is supportive. Rural broadband mandate creates MNO incentive to share cost burden.",
    thesis2:"Long-term tenancy agreements (10+ years) provide stable cash flows. Infrastructure asset appreciation creates secondary exit opportunity.",
    risks:[{cat:'MNO Commitment',prob:'Medium',impact:'High',mit:'Multi-MNO pre-commitments required before capital deployment.'},{cat:'Regulatory',prob:'Low',impact:'High',mit:'NCA pre-engagement. Legal framework established under Ghana Telecom Act.'},{cat:'Capital Intensity',prob:'Medium',impact:'Medium',mit:'Phased rural cluster approach. Infrastructure fund co-investor.'}],
    crossSectors:[4,12], crossNotes:'Enables rural digital connectivity (S4). Logistics tracking infrastructure (S12).',
  },

  // ── SECTOR 2 · FINANCIAL INCLUSION ──
  { id:'F-01', sector:2, title:'Market Trader Digital Wallet',
    desc:"Integrated financial services platform for informal market traders — savings, credit, insurance, and payments in a single mobile app.",
    fullDesc:"Ghana's 2.5M+ informal market traders represent a $4–6B annual credit opportunity that formal banks consistently fail to serve. The root cause is data: banks require collateral and financial history that traders cannot provide. BRIDGE's wallet solves this by generating the data. Twelve months of transaction history, savings patterns, and supplier relationships creates a credit score enabling lending. The platform is embedded in the Kejetia and Makola market ecosystems, giving it natural distribution through trusted physical infrastructure.",
    score:92, dims:[28,23,23,18], subDims:{pp:[10,9,9],sf:[9,8,6],fe:[9,8,6],fs:[6,7,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Active', region:'National', tags:['FinTech','Markets','Scale'],
    mode:'INVEST', modeRationale:'Best-in-class local FinTech operator leads. BRIDGE co-invests, provides market access via portfolio, deploys credit guarantee facility.',
    pipeline:4, irr:'22–30%', structure:'Series A Equity', minTicket:'$500,000', horizon:'3–4 years',
    thesis:"The market trader wallet is Ghana's highest-conviction FinTech opportunity. Captive user base, recurring transaction revenue, embedded credit with proprietary scoring, and insurance cross-sell create 4+ revenue streams from a single customer relationship.",
    thesis2:"Unit economics: average trader generates GHS 180/month in fees + GHS 420/month in credit interest = GHS 600/month LTV. At 100,000 active traders, the platform generates $12M+ annually.",
    risks:[{cat:'BoG Regulatory Change',prob:'Medium',impact:'High',mit:'Active regulatory engagement. Bank partnership structure.'},{cat:'Credit Default Rate',prob:'Medium',impact:'High',mit:'Proprietary scoring. First-loss guarantee from BRIDGE facility.'},{cat:'MoMo Platform Competition',prob:'High',impact:'Medium',mit:'Market-embedded distribution moat. Specialised credit product MoMo cannot offer.'},{cat:'Cyber / Fraud Risk',prob:'Medium',impact:'High',mit:'ISO 27001 certification. Biometric KYC. Real-time fraud monitoring.'}],
    crossSectors:[1,4,6,8,11], crossNotes:'Powers the Kejetia Platform (S1). Credit scoring shared with AgriFinance (S6). Insurance products connect to Health (S3).',
  },
  { id:'F-02', sector:2, title:'MSME Credit Guarantee Facility',
    desc:'First-loss guarantee structure enabling formal bank lending to qualifying MSMEs — $4–6B addressable credit opportunity.',
    fullDesc:"Ghana's MSME sector employs 70%+ of the private sector workforce but receives less than 10% of bank credit. The primary barrier is risk perception, not demand. BRIDGE structures a first-loss guarantee fund that absorbs the initial 15–20% of loan losses on qualifying MSME portfolios — reducing bank risk to levels that unlock commercial lending. The facility is designed with GCB, Ecobank, and Fidelity Bank as delivery partners.",
    score:84, dims:[25,21,21,17], subDims:{pp:[9,8,8],sf:[8,8,5],fe:[8,7,6],fs:[6,6,5]},
    tier:'Core', capMin:2, capMax:5, stage:'Seed', region:'National', tags:['Credit','MSME','Guarantee'],
    mode:'INVEST', modeRationale:'BRIDGE deploys guarantee capital as patient subordinated layer. Commercial banks originate and service. BRIDGE earns guarantee fee and builds MSME data asset.',
    pipeline:2, irr:'8–12%', structure:'Blended Finance — First Loss', minTicket:'$500,000', horizon:'5–7 years',
    thesis:"First-loss guarantee structures are the most capital-efficient tool for unlocking commercial lending to underserved segments. $1 of BRIDGE guarantee capital can unlock $5–7 of bank credit.",
    thesis2:"The data asset created — credit histories for 10,000+ MSMEs — has independent commercial value as a credit bureau input and insurance underwriting dataset.",
    risks:[{cat:'Bank Partner Commitment',prob:'Medium',impact:'High',mit:'Pre-signed term sheets with 3 banks. Phased deployment tied to performance.'},{cat:'Credit Environment',prob:'Medium',impact:'High',mit:'Conservative LTV ratios. Sector diversification requirements.'},{cat:'Guarantee Call Rate',prob:'Medium',impact:'Medium',mit:'Rigorous MSME pre-screening. BRIDGE credit team oversight.'}],
    crossSectors:[2,4,6,11], crossNotes:'Funds agri-processing SMEs (S6). Tech startup credit (S4). Manufacturing SMEs (S11).',
  },
  { id:'F-03', sector:2, title:'Diaspora Investment Gateway',
    desc:'Structured investment products allowing diaspora to invest directly in vetted Ghana ventures — remittance-to-investment conversion.',
    fullDesc:"Ghana receives $4.6B annually in diaspora remittances — the largest single foreign capital inflow. Less than 2% is directed to investment; the remainder goes to consumption. The barrier is product: there is no trusted, accessible, structured mechanism for diaspora to invest in Ghana's economy. BRIDGE builds the gateway — aggregating vetted investment opportunities, creating compliant cross-border investment structures, and providing the due diligence and reporting infrastructure that diaspora investors need.",
    score:79, dims:[23,20,20,16], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['Diaspora','Investment','Platform'],
    mode:'CONNECT', modeRationale:'BRIDGE aggregates opportunities and provides trust infrastructure. Diaspora capital flows through BRIDGE-managed vehicles. Capital facilitation and curation role.',
    pipeline:2, irr:'15–20%', structure:'SPV Structure per Opportunity', minTicket:'$10,000', horizon:'3–6 years',
    thesis:"The diaspora investment problem is not capital willingness — it is trust infrastructure, product design, and access. BRIDGE solves all three. The $4.6B remittance flow is the addressable market.",
    thesis2:"Platform revenue: management fee (1.5–2%), carry (15–20%), reporting fee. At $50M AUM, the platform generates $1M+ in fee revenue independently of portfolio returns.",
    risks:[{cat:'Regulatory (SEC / BoG)',prob:'Medium',impact:'High',mit:'Early SEC engagement. Foreign exchange regulations compliance. Legal structure review.'},{cat:'Trust / Reputation',prob:'Low',impact:'High',mit:'Transparent reporting. Third-party audits. BRIDGE brand equity.'},{cat:'FX Risk',prob:'High',impact:'Medium',mit:'Cedi-denominated investments with USD-equivalent return structures where possible.'}],
    crossSectors:[1,6,8,9], crossNotes:'Channels diaspora capital into all 12 sectors. Real estate product overlap (S8). Tourism investment pipeline (S9).',
  },
  { id:'F-04', sector:2, title:'Digital Susu Integration Platform',
    desc:"Formalizing Ghana's \$2B+ informal rotating savings system with digital ledgers, credit scoring, and insurance wrapping.",
    fullDesc:"Susu — Ghana's indigenous rotating savings and credit system — mobilizes an estimated $2B+ annually through 200,000+ collectors nationwide. The system works, but collapses are common: collector defaults, cash theft, illness. BRIDGE formalizes the susu model with digital ledgers, mobile notifications, collector accountability records, and group savings insurance. The platform also extracts credit data, enabling members with 12+ months of participation history to access formal credit products.",
    score:88, dims:[27,22,22,17], subDims:{pp:[10,9,8],sf:[9,8,5],fe:[8,8,6],fs:[6,6,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['FinTech','Savings','Informal'],
    mode:'INCUBATE', modeRationale:'BRIDGE builds the platform and collector network. Asset-light model — collectors remain independent, BRIDGE provides the rails.',
    pipeline:2, irr:'16–20%', structure:'Revenue Share + Licensing', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"Susu represents Ghana's most widespread, culturally trusted savings institution. Formalizing it strengthens it. The collector network becomes a BRIDGE distribution channel for credit and insurance at near-zero CAC.",
    thesis2:"Revenue model: GHS 5–10/month SaaS fee per active group (50,000 groups = GHS 2.5–5M/month), insurance premium sharing (15–20%), and credit origination fees.",
    risks:[{cat:'Collector Resistance',prob:'Medium',impact:'High',mit:'Collector co-ownership model. Commission structure preserved.'},{cat:'Data Privacy / BoG',prob:'Low',impact:'Medium',mit:'Platform role, not deposit-taker. BoG sandbox engagement.'},{cat:'Cultural Sensitivity',prob:'Low',impact:'Medium',mit:'Community-led design process. Women-focused from inception.'}],
    crossSectors:[2,3,5,7], crossNotes:'Feeds credit scoring for Market Trader Wallet (F-01). Insurance products link to Health (S3).',
  },
  { id:'F-05', sector:2, title:'Market Microinsurance Bundle',
    desc:'Bundled micro-insurance products for market traders — fire, theft, health, and income protection at GHS 5–20/month.',
    fullDesc:"Ghana's informal sector has virtually no insurance penetration. A single fire, illness, or theft can wipe out a trader's working capital and push them into debt. BRIDGE structures a bundled microinsurance product — fire, theft, health hospitalization, and income protection — distributed through the Market Trader Wallet (F-01) and susu collector network. Premium pricing is calibrated to trader income: GHS 5–20/month based on coverage level and trader tier.",
    score:83, dims:[25,20,21,17], subDims:{pp:[9,8,8],sf:[8,7,5],fe:[8,7,6],fs:[6,6,5]},
    tier:'Core', capMin:0.5, capMax:1.5, stage:'Seed', region:'National', tags:['Insurance','Markets','FinTech'],
    mode:'CONNECT', modeRationale:'BRIDGE connects insurance underwriters with the Market Trader distribution channel. Revenue share arrangement. BRIDGE does not carry insurance risk.',
    pipeline:3, irr:'20–28%', structure:'Commission + Revenue Share', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"Distribution is the bottleneck in African microinsurance — not product design. BRIDGE's 50,000+ trader distribution channel solves the distribution problem at near-zero marginal cost.",
    thesis2:"At 10% penetration of 250,000 traders at GHS 10/month average premium, the channel generates GHS 25M/month in premium flow. BRIDGE earns 20–25% distribution margin.",
    risks:[{cat:'Claims Ratio',prob:'Medium',impact:'Medium',mit:'Conservative underwriting. Reinsurance layer. Pilot in single market first.'},{cat:'Premium Affordability',prob:'Medium',impact:'High',mit:'Subsidy from GHS employer matching programme. Flexible payment triggers.'}],
    crossSectors:[2,3,6], crossNotes:'Distributed via Market Trader Wallet (S2). Health component links to health systems (S3). Agricultural income protection for farmers (S6).',
  },
  { id:'F-06', sector:2, title:'Alternative Credit Scoring Platform',
    desc:'Psychometric, transactional, and behavioral data-based credit scores for the unbanked — enabling financial access without collateral.',
    fullDesc:"Traditional credit scoring excludes 80%+ of Ghana's economically active population. BRIDGE builds an alternative credit infrastructure that combines psychometric assessment, mobile phone behavioral data, transactional patterns from partner wallets, and demographic signals to generate a BRIDGE Credit Score (BCS) for previously unscoreable individuals. The BCS is licensed to banks, MFIs, and BNPL platforms as a credit enablement tool.",
    score:77, dims:[23,19,20,15], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['FinTech','Credit','Data'],
    mode:'INCUBATE', modeRationale:'Proprietary data asset requires BRIDGE to build and own. Licensing model to financial institutions. B2B revenue from Day 1.',
    pipeline:1, irr:'18–25%', structure:'B2B SaaS Licensing', minTicket:'$150,000', horizon:'3–5 years',
    thesis:"Credit scoring infrastructure is a winner-take-most market. First mover with the most comprehensive alternative data set controls the infrastructure layer for financial inclusion.",
    thesis2:"B2B licensing model means revenue is institutional, not retail. Banks, MFIs, and fintechs each pay $0.50–2.00 per score query. At 500,000 queries/month, revenue exceeds $250K monthly.",
    risks:[{cat:'Data Privacy / GDPR',prob:'Medium',impact:'High',mit:'Data Protection Act compliance. Explicit consent frameworks. Privacy by design.'},{cat:'Accuracy / Bias',prob:'Medium',impact:'High',mit:'Ongoing model validation. Third-party audit. Regulatory engagement.'},{cat:'Competition',prob:'Medium',impact:'Medium',mit:'Proprietary data moat from Market Wallet and Susu networks.'}],
    crossSectors:[2,4,6], crossNotes:'Integrates data from Market Wallet (F-01) and Susu Platform (F-04). Tech stack shared with AgriTech scoring (S4).',
  },
  { id:'F-07', sector:2, title:"Women's Economic Empowerment Fund",
    desc:'Dedicated capital fund for women-led enterprises with integrated business training, mentorship, and market linkage.',
    fullDesc:"Women represent 52% of Ghana's informal sector workforce but receive less than 15% of MSME credit. BRIDGE structures a dedicated vehicle — the Women's Enterprise Fund — combining concessional capital (from impact-first DFI sources), business development services, and BRIDGE market linkages. Portfolio companies receive patient capital (3–5 years, below-market rate), management training, and direct referrals into BRIDGE's market networks.",
    score:76, dims:[23,19,19,15], subDims:{pp:[9,8,6],sf:[8,6,5],fe:[7,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:1, capMax:5, stage:'Concept', region:'National', tags:['Gender','Impact','SME'],
    mode:'INVEST', modeRationale:'Impact-first vehicle. BRIDGE manages the fund, sources concessional capital from gender-lens DFIs. Below-market returns accepted for outsized impact.',
    pipeline:1, irr:'8–12%', structure:'Blended Finance — Concessional', minTicket:'$200,000', horizon:'5–7 years',
    thesis:"Gender-lens investing in Ghana's informal sector is systematically underfunded relative to demonstrated demand and impact evidence. BRIDGE fills the gap with a specialized vehicle that blends impact capital with market access.",
    thesis2:"Partnerships with USAID WomenConnect, UN Women, and the Mastercard Foundation provide both concessional capital and technical assistance, significantly reducing fund operating costs.",
    risks:[{cat:'Portfolio Quality',prob:'Medium',impact:'High',mit:'Rigorous selection criteria. Business development support integrated.'},{cat:'Impact Measurement',prob:'Low',impact:'Medium',mit:'Gender-disaggregated data from Day 1. IRIS+ alignment.'},{cat:'Concessional Capital Pipeline',prob:'Medium',impact:'High',mit:'DFI relationships pre-established. Gender-lens capital in high supply globally.'}],
    crossSectors:[1,6,11], crossNotes:'Women market traders (S1/S2). Women smallholder farmers (S6). Women-led manufacturing (S11).',
  },

  // ── SECTOR 3 · HEALTH SYSTEMS ──
  { id:'H-01', sector:3, title:'Community Health Worker Tech Platform',
    desc:"Mobile digital health platform for Ghana's 100,000+ CHW network — patient records, supply chain alerts, telemedicine escalation.",
    fullDesc:"Ghana's Community Health Worker network is the backbone of primary care delivery to rural and peri-urban communities. But CHWs operate with paper registers, no supply chain visibility, and no escalation pathway for complex cases. BRIDGE's platform digitizes the CHW workflow: patient registration and history, symptom triage protocols, medicine stock alerts, and two-way telemedicine escalation to district-level clinicians. The GHS and partners (GIZ, USAID) have expressed strong interest in a market-ready solution.",
    score:85, dims:[25,21,22,17], subDims:{pp:[9,8,8],sf:[9,7,5],fe:[9,7,6],fs:[6,6,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Seed', region:'National', tags:['HealthTech','Digital','CHW'],
    mode:'INVEST', modeRationale:'GHS procurement model provides revenue certainty. BRIDGE co-invests with technology partner. Government SLA creates stable revenue base.',
    pipeline:2, irr:'15–20%', structure:'Equity + Government SLA', minTicket:'$250,000', horizon:'3–5 years',
    thesis:"Government procurement is the revenue engine: GHS pays per-CHW per-year for the platform ($8–15/CHW/year). At 20,000 CHWs enrolled, the contract is $160–300K annually — growing to $800K+ at full 100,000 CHW rollout.",
    thesis2:"International donor co-funding (USAID, GIZ, UNICEF) de-risks the initial deployment. BRIDGE technology platform can be replicated to other African CHW networks, creating an exportable IP asset.",
    risks:[{cat:'GHS Procurement Delays',prob:'High',impact:'High',mit:'Parallel donor-funded pilot. Multi-payer revenue design.'},{cat:'Rural Connectivity',prob:'High',impact:'Medium',mit:'Offline-first app architecture. Sync when connected.'},{cat:'CHW Digital Literacy',prob:'Medium',impact:'Medium',mit:'Voice-first UI. In-service training component.'}],
    crossSectors:[2,4,6,12], crossNotes:'Insurance data integration (S2). AI triage technology (S4). Nutrition data from agriculture (S6). Last-mile medicine delivery (S12).',
  },
  { id:'H-02', sector:3, title:'Last-Mile Cold Chain Network',
    desc:'Solar-powered cold chain infrastructure ensuring vaccine and medicine integrity across remote health facilities.',
    fullDesc:"Up to 25% of vaccines and temperature-sensitive medicines lose efficacy before reaching patients in Ghana's remote facilities. The cause is consistent: broken cold chain between district health center and last-mile delivery points. BRIDGE deploys a network of solar-powered vaccine fridges, cold boxes, and temperature monitoring systems at community health facilities — integrated with district health supply chain software to enable real-time inventory and temperature tracking.",
    score:82, dims:[24,21,21,16], subDims:{pp:[9,8,7],sf:[9,7,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'Northern Regions', tags:['Cold Chain','Infrastructure','Health'],
    mode:'INVEST', modeRationale:'Hardware infrastructure with government procurement guarantee. BRIDGE invests alongside Gavi, UNICEF, and GHS framework agreements.',
    pipeline:2, irr:'10–14%', structure:'Blended Finance + Government Procurement', minTicket:'$300,000', horizon:'5–7 years',
    thesis:"Cold chain infrastructure is a proven, bankable infrastructure investment globally. In Ghana, the gap is not technical knowledge — it is deployment capital and last-mile logistics coordination.",
    thesis2:"Gavi and UNICEF framework agreements create a ready procurement channel. Co-investment with development partners significantly de-risks the initial capital deployment.",
    risks:[{cat:'Solar Reliability',prob:'Medium',impact:'High',mit:'Proven equipment partners. Backup power protocols. Remote monitoring.'},{cat:'GHS Maintenance Capacity',prob:'High',impact:'Medium',mit:'Maintenance-as-a-service model. Local technician training programme.'},{cat:'Supply Chain Coordination',prob:'Medium',impact:'Medium',mit:'Integration with GHS DHIMS2 system.'}],
    crossSectors:[3,6,12], crossNotes:'Medicines cold chain (S3). Agricultural cold chain infrastructure shares technology (S6). Cold chain logistics fleet (S12).',
  },
  { id:'H-03', sector:3, title:'Private Specialist Clinic Network',
    desc:'Franchise model specialist clinics (maternal, dental, eye) for urban middle-income households below private hospital rates.',
    fullDesc:"Ghana's rapidly expanding middle class is outgrowing the public health system but cannot afford specialist care at private hospitals charging $100–500+ per consultation. BRIDGE structures a franchise network of specialist clinics — targeting maternal health, dental care, and ophthalmology — operating at 40–60% below private hospital rates through efficient, standardized clinical protocols and shared administrative infrastructure.",
    score:79, dims:[23,20,20,16], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:4, stage:'Concept', region:'Accra / Kumasi', tags:['Clinic','Private','Franchise'],
    mode:'INVEST', modeRationale:'Capital-efficient franchise model. BRIDGE invests in franchisor entity and anchor clinic, then rolls out via franchise licensing.',
    pipeline:1, irr:'15–20%', structure:'Equity + Franchise Fees', minTicket:'$300,000', horizon:'4–6 years',
    thesis:"The middle-income healthcare gap is Ghana's most underserved market. Willingness to pay is established; the problem is supply. Standardized protocols enable high-quality care at much lower unit cost than traditional private hospital models.",
    thesis2:"Franchise model de-risks rollout — franchisees carry clinic-level capital requirements. BRIDGE retains IP, training, procurement advantages, and franchise fee revenue.",
    risks:[{cat:'Clinical Quality Control',prob:'Medium',impact:'High',mit:'Rigorous franchise certification. Clinical director oversight model.'},{cat:'NHIA NHIS Integration',prob:'Low',impact:'Medium',mit:'NHIS accreditation as a strategic priority from Day 1.'},{cat:'Site Acquisition',prob:'Medium',impact:'Medium',mit:'BRIDGE real estate network. Joint venture with property partners.'}],
    crossSectors:[2,5,8], crossNotes:'NHIS and microinsurance linkage (S2). Health education and training (S5). Clinic co-location with housing developments (S8).',
  },
  { id:'H-04', sector:3, title:'Health Data Analytics Platform',
    desc:'Aggregated anonymized health data platform for hospitals, insurers, and researchers — enabling evidence-based decisions.',
    fullDesc:"Ghana's health system generates enormous data volumes through DHIMS2, facility records, and mobile health platforms — but this data is siloed, underanalysed, and inaccessible to insurers, researchers, and policymakers who could use it. BRIDGE builds the aggregation and analytics layer: de-identified, consented data from partner health facilities, structured for epidemiological analysis, insurance underwriting, and research output.",
    score:71, dims:[21,18,19,13], subDims:{pp:[7,7,7],sf:[8,6,4],fe:[7,7,5],fs:[4,5,4]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Data','HealthTech','B2B'],
    mode:'INCUBATE', modeRationale:'Data asset requires BRIDGE ownership and governance. B2B licensing model to health institutions and insurers.',
    pipeline:1, irr:'18–24%', structure:'B2B SaaS + Data Licensing', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"Health data is the oil of the 21st-century health system. The platform that controls Ghana's anonymized health dataset controls the underwriting and research infrastructure for the entire sector.",
    thesis2:"Revenue from insurance underwriting data (per-query pricing), research access fees, and public health authority contracts. Multi-year exclusive data sharing agreements with anchor partners.",
    risks:[{cat:'Data Privacy',prob:'Medium',impact:'High',mit:'GDPR-equivalent framework. Ethics board. Patient consent infrastructure.'},{cat:'GHS Data Sharing Agreement',prob:'Medium',impact:'High',mit:'Early GHS engagement. Non-commercial public health data framing.'},{cat:'Competition',prob:'Low',impact:'Medium',mit:'First-mover with GHS data agreement creates structural barrier.'}],
    crossSectors:[2,4], crossNotes:'Insurance underwriting data (S2). Technology platform (S4).',
  },
  { id:'H-05', sector:3, title:'Local Pharmaceutical Distribution',
    desc:'Aggregated pharmaceutical distribution covering last-mile delivery to rural facilities — breaking the urban-only distribution model.',
    fullDesc:"Ghana's pharmaceutical supply chain is severely urban-biased. Over 60% of registered pharmaceutical outlets are in Accra and Kumasi. Rural health facilities face stockouts 30–40% of the time. BRIDGE structures an aggregated last-mile distribution network: a central Accra hub with temperature-controlled storage, district-level distribution points, and motorcycle rider delivery to rural facilities — delivering within 48 hours of order.",
    score:76, dims:[23,19,19,15], subDims:{pp:[8,8,7],sf:[8,6,5],fe:[7,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Seed', region:'National', tags:['Pharma','Distribution','Rural'],
    mode:'CONNECT', modeRationale:'BRIDGE connects pharmaceutical manufacturers, GHS facilities, and logistics operators. Distribution coordination and working capital facility role.',
    pipeline:2, irr:'12–16%', structure:'Margin Share + Working Capital', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"Pharmaceutical distribution is a high-margin, recurring-demand business with government as the anchor customer. Last-mile delivery premium (15–25%) more than covers additional logistics cost.",
    thesis2:"GHS drug procurement budget is GHS 400M+ annually. Even capturing 3–5% of that through the distribution channel represents $5–8M in annual revenue.",
    risks:[{cat:'Cold Chain Maintenance',prob:'Medium',impact:'High',mit:'Temperature monitoring throughout chain. Cold box backup.'},{cat:'Working Capital',prob:'Medium',impact:'High',mit:'Pharmaceutical manufacturer credit terms. GHS prepayment structure.'},{cat:'Regulatory',prob:'Low',impact:'Medium',mit:'Food and Drugs Authority registration. Standard distribution licensing.'}],
    crossSectors:[3,6,12], crossNotes:'Agricultural chemical distribution shares logistics (S6). Last-mile delivery network shared (S12).',
  },

  // ── SECTOR 4 · TECHNOLOGY & INNOVATION ──
  { id:'T-01', sector:4, title:'Ghana Tech Talent Placement',
    desc:'Placement and upskilling platform connecting qualified Ghanaian developers with global remote employers.',
    fullDesc:"Ghana produces 10,000+ computer science and IT graduates annually, but domestic employment absorbs fewer than 20% at competitive wages. Simultaneously, global technology companies face severe developer shortages and increasingly hire remote. BRIDGE structures a talent placement and upskilling platform: curated developer cohorts (Python, JavaScript, cloud, mobile), skills gap training, and direct placement with international clients at $24,000–48,000/year — transforming Ghana's talent surplus into a $100M+ annual export industry.",
    score:86, dims:[26,21,22,17], subDims:{pp:[9,9,8],sf:[9,7,5],fe:[9,7,6],fs:[6,6,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Active', region:'Accra', tags:['Talent','Remote Work','Platform'],
    mode:'INVEST', modeRationale:'Revenue-generating from placement fees. BRIDGE co-invests with operator. Asset-light model with high velocity.',
    pipeline:4, irr:'20–28%', structure:'Revenue Share + Equity', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"The talent placement model is capital-light with high velocity. First-year placements generate $2,500–5,000 per hire in fees. At 200 placements/year, revenue is $500K–1M. Year 3 target: 1,000 placements = $2.5–5M revenue.",
    thesis2:"Network effects compound: every successful placement strengthens the employer relationship and creates alumni mentors for the next cohort. Diaspora mentor network (500+) provides free international career navigation support.",
    risks:[{cat:'Employer Retention',prob:'Medium',impact:'High',mit:'Account management. Talent quality guarantee (30-day replacement).'},{cat:'Developer Pipeline Quality',prob:'Medium',impact:'High',mit:'Rigorous skills assessment. Pre-placement coding standards.'},{cat:'Remote Work Regulation',prob:'Low',impact:'Medium',mit:'Ghana Tax Authority clarity on remote income. Legal framework established.'}],
    crossSectors:[4,5,7], crossNotes:'TVET and skills training feeder (S5). Creative industry talent overlap (S7).',
  },
  { id:'T-02', sector:4, title:'AgriTech Data Intelligence',
    desc:'Satellite, IoT, and mobile data platform providing smallholder farmers with weather, market price, and agronomic decision support.',
    fullDesc:"Ghana's 5.6M smallholder farmers make critical agronomic decisions — what to plant, when to irrigate, when to harvest, where to sell — based on intuition and tradition rather than data. BRIDGE's AgriTech platform aggregates satellite imagery (crop stress, rainfall), IoT soil sensors, and market price data from 50+ markets to deliver actionable daily recommendations via USSD, SMS, and WhatsApp — accessible without smartphones.",
    score:80, dims:[24,20,20,16], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Seed', region:'National', tags:['AgriTech','Data','Smallholder'],
    mode:'INVEST', modeRationale:'Technology platform investment. BRIDGE co-invests alongside USAID and GIZ technical assistance programmes.',
    pipeline:2, irr:'14–18%', structure:'Equity + Government SLA', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"Data-driven smallholder decision support is proven to improve yields 20–35% in comparable East African markets. In Ghana, the platform gap is clear and the cooperative distribution channel provides built-in adoption infrastructure.",
    thesis2:"Revenue model: GHS 5–15/month per farmer subscription, agro-dealer advertising, and input company market intelligence licensing. At 200,000 active farmers: $1.5–3M ARR.",
    risks:[{cat:'Farmer Adoption',prob:'Medium',impact:'High',mit:'USSD-first design. Cooperative champion programme. Free trial period.'},{cat:'Data Accuracy',prob:'Medium',impact:'High',mit:'Satellite validation. Ground truth from cooperative sensors.'},{cat:'Revenue Model',prob:'Medium',impact:'Medium',mit:'Multi-payer model (farmer + agro-dealer + government). Not dependent on single revenue stream.'}],
    crossSectors:[1,4,6,10], crossNotes:'Integrates with Kejetia market price data (S1). Cold chain infrastructure data (S6). Solar sensor power (S10).',
  },
  { id:'T-03', sector:4, title:'Government Digital Services Stack',
    desc:'GovTech platform enabling digital service delivery — permits, licensing, procurement — reducing friction and corruption.',
    fullDesc:"Ghana's public service delivery system generates enormous economic friction: business registration takes 12–18 days, permit processing 4–8 weeks, procurement processes are opaque. BRIDGE builds a digital services layer enabling online submission, real-time tracking, digital payments, and audit trails for 15 high-frequency government services — reducing processing time by 70–80% and creating the transparency infrastructure that reduces corruption opportunity.",
    score:77, dims:[23,19,20,15], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:2, capMax:8, stage:'Concept', region:'National', tags:['GovTech','Platform','B2G'],
    mode:'CONNECT', modeRationale:'BRIDGE structures government procurement and provides integration layer. Private sector technology delivery under government contract.',
    pipeline:1, irr:'12–16%', structure:'B2G SaaS + Implementation', minTicket:'$500,000', horizon:'4–6 years',
    thesis:"Government digitization is a long-cycle but high-certainty revenue opportunity. Once embedded in government workflow, churn is near-zero. Ghana's Digital Ghana Agenda creates formal policy mandate.",
    thesis2:"Per-transaction fee model (GHS 5–20 per digital service rendered) creates recurring revenue tied to government service volume. At 500,000 transactions/month: $500K–1M monthly revenue.",
    risks:[{cat:'Government Procurement Cycles',prob:'High',impact:'High',mit:'Pilot-first approach with District Assembly. Build track record for national scale.'},{cat:'Political Change',prob:'Medium',impact:'High',mit:'Non-partisan framing. Cross-party endorsement of digital efficiency narrative.'},{cat:'Implementation Complexity',prob:'Medium',impact:'Medium',mit:'Modular deployment. Proven government digital services team.'}],
    crossSectors:[1,2,4], crossNotes:'Business registration digitization (S2). Market licensing (S1). Technology infrastructure (S4).',
  },
  { id:'T-04', sector:4, title:'SME ERP / Business OS',
    desc:'Affordable cloud ERP for Ghanaian SMEs — inventory, payroll, accounting, tax — localized for Ghana regulatory environment.',
    fullDesc:"Ghana has 2.4M+ registered SMEs. The majority use Excel spreadsheets, paper ledgers, or nothing at all to manage their businesses. The result: no bankable financial statements, no tax compliance, no inventory optimization. BRIDGE invests in a Ghana-localized cloud ERP that speaks to SME realities: GHS accounting, GRA tax filing integration, MoMo payroll, and WhatsApp customer management — at GHS 50–150/month.",
    score:83, dims:[25,21,21,16], subDims:{pp:[9,8,8],sf:[8,8,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['SaaS','SME','Platform'],
    mode:'INVEST', modeRationale:'B2B SaaS investment with strong unit economics. BRIDGE co-invests and deploys through BRIDGE MSME network.',
    pipeline:3, irr:'18–25%', structure:'Series A Equity', minTicket:'$100,000', horizon:'3–4 years',
    thesis:"Business operating system adoption is sticky and expands over time. A customer acquired at GHS 50/month for accounting grows to GHS 200+/month as they add payroll, inventory, and credit products. LTV compounds.",
    thesis2:"GRA digital tax compliance mandate (2026) creates regulatory demand pull — SMEs must file digitally or face penalties. BRIDGE ERP provides the path of least resistance to compliance.",
    risks:[{cat:'Adoption',prob:'Medium',impact:'High',mit:'Onboarding support team. WhatsApp-first UX. GRA compliance incentive.'},{cat:'Competition',prob:'Medium',impact:'Medium',mit:'Ghana-specific localization as moat. Price point below QuickBooks and SAP.'},{cat:'SME Churn',prob:'Medium',impact:'Medium',mit:'Workflow integration creates switching costs after 3 months.'}],
    crossSectors:[2,4,6], crossNotes:'Credit scoring integrates with MSME Guarantee Facility (S2). AgriSME accounting (S6). Manufacturing SME compliance (S11).',
  },
  { id:'T-05', sector:4, title:'Cybersecurity-as-a-Service',
    desc:"Managed security services for SMEs and mid-market companies — Ghana's financial sector growth creates urgent demand.",
    fullDesc:"Ghana's rapidly expanding digital financial sector — 35M+ MoMo accounts, growing digital banking — creates an expanding attack surface for cybercriminals. Yet most Ghanaian businesses have no cybersecurity function. BRIDGE structures a managed security services offering: 24/7 monitoring, incident response, compliance advisory, and employee training — delivered at GHS 500–3,000/month, making professional security accessible below the typical $10,000+ international pricing.",
    score:74, dims:[22,18,20,14], subDims:{pp:[7,8,7],sf:[8,6,4],fe:[8,7,5],fs:[5,4,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'Accra', tags:['Security','B2B','SaaS'],
    mode:'CONNECT', modeRationale:'BRIDGE connects international cybersecurity firms with Ghana SME market. Distribution and partnership role. Revenue share on contracts.',
    pipeline:1, irr:'16–22%', structure:'Revenue Share + Distribution Fee', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"Bank of Ghana and SEC cybersecurity regulations mandate security standards for financial sector firms. Regulatory compliance requirement creates forced adoption — BRIDGE provides the most accessible and affordable path.",
    thesis2:"Annual cybersecurity market in Ghana estimated at $80–120M and growing 25%+ annually. Early market leadership creates brand trust that compounds over time.",
    risks:[{cat:'Technical Talent',prob:'High',impact:'High',mit:'International partner provides technical backbone. Ghana team focuses on client management.'},{cat:'Awareness',prob:'Medium',impact:'Medium',mit:'Education-first sales strategy. Regulatory compliance framing.'},{cat:'Price Sensitivity',prob:'Medium',impact:'Medium',mit:'SME-tier pricing. Government subsidy programme advocacy.'}],
    crossSectors:[2,4], crossNotes:'Financial sector security (S2). Technology infrastructure (S4).',
  },

  // ── SECTOR 5 · EDUCATION & SKILLS ──
  { id:'E-01', sector:5, title:'TVET Skills Certification Platform',
    desc:'National skills certification platform aligned with NVTI standards — bridging informal training and employer-recognized credentials.',
    fullDesc:"Ghana's NVTI (National Vocational Training Institute) certifies formal TVET graduates, but the 600,000+ informally trained artisans — welders, carpenters, plumbers, masons, tailors — have no pathway to recognized credentials. BRIDGE builds the recognition of prior learning (RPL) platform: skills assessment, competency verification, and NVTI-aligned certification. Certified artisans command 20–40% wage premiums and qualify for formal employment.",
    score:85, dims:[25,21,22,17], subDims:{pp:[9,9,7],sf:[9,7,5],fe:[9,7,6],fs:[6,6,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['Skills','Certification','TVET'],
    mode:'CONNECT', modeRationale:'BRIDGE structures partnership between NVTI, employer associations, and assessment centers. Revenue from certification fees. No direct service delivery.',
    pipeline:2, irr:'15–20%', structure:'Fee-per-Certification + SaaS', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"NVTI partnership provides the regulatory moat. Revenue: GHS 50–100 per certification (targeting 100,000 certifications/year = GHS 5–10M), employer SaaS for job-matching ($200/month), and international accreditation fees.",
    thesis2:"Employer demand side is strong — construction, oil and gas, and manufacturing sectors all face skilled artisan shortages. Certification platform bridges supply and demand.",
    risks:[{cat:'NVTI Engagement',prob:'Medium',impact:'High',mit:'NVTI co-ownership model. MoE and COTVET endorsement sought.'},{cat:'Artisan Uptake',prob:'Medium',impact:'Medium',mit:'Employer demand creates pull. Wage premium evidence drives motivation.'},{cat:'Assessment Quality',prob:'Low',impact:'High',mit:'Standardized assessment protocols. Third-party auditor.'}],
    crossSectors:[1,4,11], crossNotes:'Construction artisan certification (S1). Manufacturing skills (S11). Digital skills component (S4).',
  },
  { id:'E-02', sector:5, title:'Digital Skills Academy Network',
    desc:'Blended learning academies training 5,000+ youth annually in coding, data, and digital marketing — job-placement guaranteed.',
    fullDesc:"Ghana's youth unemployment rate is 15–18% for 15–35 year-olds, with university graduates facing the longest job search periods. Simultaneously, Ghana's growing tech ecosystem, BPO sector, and digital marketing industry face talent shortages at the entry level. BRIDGE structures a network of blended learning Digital Skills Academies — 3-month intensive programmes in software development, data analysis, and digital marketing — with employer partnerships guaranteeing placement interviews for graduates.",
    score:82, dims:[24,21,21,16], subDims:{pp:[9,8,7],sf:[9,7,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'Accra / Kumasi', tags:['Digital Skills','Youth','Training'],
    mode:'INVEST', modeRationale:'Academy network investment. BRIDGE invests in infrastructure and curriculum, earns through employer placement fees and student income-share agreements.',
    pipeline:2, irr:'14–18%', structure:'Income Share + Placement Fees', minTicket:'$300,000', horizon:'3–5 years',
    thesis:"Job-placement-guaranteed model aligns incentives between student, academy, and employer. Income share agreements generate recurring revenue from successful graduates. Employer placement fees provide Day 1 institutional revenue.",
    thesis2:"Diaspora professional mentorship network provides free curriculum advisory and employment referral channels at zero cost. Government Aspire24 youth employment mandate creates grant co-funding opportunity.",
    risks:[{cat:'Employment Market',prob:'Medium',impact:'High',mit:'Employer partnership agreements pre-signed. Multi-sector placement reduces dependence.'},{cat:'Student Dropout',prob:'Medium',impact:'Medium',mit:'Income-share incentive alignment. Cohort peer support model.'},{cat:'Curriculum Relevance',prob:'Low',impact:'High',mit:'Employer advisory board. Quarterly curriculum review.'}],
    crossSectors:[4,7,11], crossNotes:'Ghana Tech Talent Placement (S4). Creative industry workers (S7). Manufacturing process automation (S11).',
  },
  { id:'E-03', sector:5, title:'SME Management Training Platform',
    desc:'Mobile-first business management curriculum for SME owners — practical, affordable, certified.',
    fullDesc:"Ghana has 2.4M+ registered SMEs, but 65%+ of SME owners have never received formal business training. The impact: poor cash flow management, no marketing strategy, no employee development. BRIDGE builds a mobile-first curriculum — available via WhatsApp, USSD, and a lightweight app — covering financial management, marketing, HR basics, and regulatory compliance. Completion earns a BRIDGE-certified SME credential recognized by BRIDGE-affiliated banks and MFIs.",
    score:79, dims:[23,20,20,16], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:0.5, capMax:1.5, stage:'Concept', region:'National', tags:['SME','Training','Mobile'],
    mode:'INCUBATE', modeRationale:'BRIDGE builds and operates the curriculum platform. Bank partnerships create distribution and credential recognition.',
    pipeline:1, irr:'16–20%', structure:'SaaS + Bank Partnership Fee', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"Bank-integrated credential creates a powerful adoption driver: BRIDGE certification is a prerequisite for preferential credit rates from BRIDGE banking partners. Training generates demand from the credit product.",
    thesis2:"GHS 15–25/month subscription at 50,000 SME subscribers = GHS 750K–1.25M/month. Bank referral fee (GHS 200 per referral) adds significant upside. B2G potential through NBSSI SME development mandate.",
    risks:[{cat:'SME Engagement',prob:'Medium',impact:'High',mit:'Bank partnership creates enrollment incentive. WhatsApp-first removes tech barrier.'},{cat:'Content Quality',prob:'Low',impact:'High',mit:'BRIDGE internal expertise + diaspora advisory board.'},{cat:'Bank Integration',prob:'Medium',impact:'Medium',mit:'Term sheets with 3 banks pre-signed. Pilot with 1,000 SMEs first.'}],
    crossSectors:[2,4,6], crossNotes:'SME credit qualification (S2). Digital tools integration (S4). AgriSME management (S6).',
  },
  { id:'E-04', sector:5, title:'School Infrastructure Investment',
    desc:'Public-private partnership model for school construction and renovation — government land, BRIDGE capital and management.',
    fullDesc:"Ghana has a 90,000+ classroom deficit, with 40%+ of existing classrooms rated as poor or very poor condition by the GES. The government has land, mandate, and policy intent — but insufficient capital and implementation capacity. BRIDGE structures a PPP: government provides land and 15-year operation license, BRIDGE provides construction capital and facility management, revenue comes from government capitation grants plus premium services.",
    score:74, dims:[22,18,20,14], subDims:{pp:[8,7,7],sf:[8,6,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:3, capMax:10, stage:'Concept', region:'Northern Regions', tags:['Infrastructure','PPP','Education'],
    mode:'INVEST', modeRationale:'Long-dated infrastructure investment with government revenue guarantee. BRIDGE invests patient capital. Development finance co-investment required.',
    pipeline:1, irr:'8–12%', structure:'PPP — Availability Payment', minTicket:'$500,000', horizon:'10–15 years',
    thesis:"Availability payment PPP model (government pays for the facility being available, regardless of enrollment) provides stable, long-term cash flows backed by government covenant.",
    thesis2:"Education infrastructure is a high-impact, low-volatility investment that attracts impact-first capital at below-market rates. Development finance co-investment significantly improves BRIDGE returns.",
    risks:[{cat:'Government Payment Risk',prob:'Medium',impact:'High',mit:'Multilateral guarantee backstop. Offshore revenue account structure.'},{cat:'Construction Risk',prob:'Medium',impact:'Medium',mit:'Fixed-price EPC contract. Performance bond.'},{cat:'Policy Change',prob:'Low',impact:'Medium',mit:'Long-term PPP contract with termination payment provisions.'}],
    crossSectors:[1,11], crossNotes:'School construction creates manufacturing supply chain demand (S11). Infrastructure PPP model parallel to road maintenance (S1).',
  },
  { id:'E-05', sector:5, title:'Workforce Development Marketplace',
    desc:'Platform connecting employers, training providers, and job seekers — real-time labor market intelligence.',
    fullDesc:"Ghana's labor market suffers from chronic information asymmetry: employers cannot find skilled workers; job seekers cannot find employers; training providers cannot find students. BRIDGE builds the marketplace layer — a digital platform aggregating job postings, training programme offerings, and candidate profiles — with AI-matching that connects demand and supply. The platform generates labor market intelligence that informs TVET curriculum, employer training investment, and government employment policy.",
    score:77, dims:[23,19,20,15], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['Platform','Jobs','Marketplace'],
    mode:'CONNECT', modeRationale:'BRIDGE connects training providers, employers, and job seekers. Platform revenue from employer subscriptions and job posting fees.',
    pipeline:2, irr:'18–24%', structure:'B2B SaaS + Transaction Fees', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"Labor market platforms achieve winner-take-most dynamics as liquidity builds. The first platform to aggregate significant employer and candidate volume becomes the default infrastructure.",
    thesis2:"Employer subscription revenue ($200–500/month for premium posting and access) plus government labour market intelligence licensing creates dual revenue streams.",
    risks:[{cat:'Liquidity Chicken-and-Egg',prob:'Medium',impact:'High',mit:'Employer side first — employer subscriptions before candidate recruitment.'},{cat:'Competition',prob:'Medium',impact:'Medium',mit:'Ghana-specific design. Vernacular language support. BRIDGE brand trust.'},{cat:'Data Quality',prob:'Medium',impact:'Medium',mit:'Verification programme for employer and candidate profiles.'}],
    crossSectors:[4,5,11], crossNotes:'Digital skills graduates are primary candidates (S5). Manufacturing employers are key clients (S11). Tech sector demand (S4).',
  },

  // ── SECTOR 6 · AGRICULTURE & VALUE CHAINS ──
  { id:'A-01', sector:6, title:'Cold Chain Storage Network',
    desc:'Solar-powered cold storage network at district markets — addressing $1.9B annual post-harvest losses.',
    fullDesc:"Ghana loses an estimated $1.9B in agricultural value annually to post-harvest spoilage — not to production failures, but to the absence of cold storage infrastructure. BRIDGE deploys a network of solar-powered cold storage units at strategic aggregation points: district markets, collection centers, and processing facility loading bays. AkoFresh partnership provides proven off-grid solar cold storage technology; BRIDGE provides deployment capital and national rollout coordination.",
    score:91, dims:[28,23,23,17], subDims:{pp:[10,9,9],sf:[9,9,5],fe:[9,8,6],fs:[6,6,5]},
    tier:'Core', capMin:3, capMax:8, stage:'Seed', region:'National', tags:['Cold Chain','Post-Harvest','Solar'],
    mode:'INVEST', modeRationale:'Hardware infrastructure with proven unit economics. BRIDGE invests alongside AkoFresh technology partnership and DFI co-funding.',
    pipeline:2, irr:'14–18%', structure:'Equity + Asset Finance', minTicket:'$300,000', horizon:'5–7 years',
    thesis:"Cold storage is the single highest-return infrastructure investment in Ghana's agricultural value chain. Every cedi invested reduces GHS 5–8 in annual spoilage losses. The return on social capital is transformative.",
    thesis2:"Revenue: storage fees (GHS 50–200/tonne/month), processing facility anchor tenancy, and BRIDGE aggregation services. Each district unit pays back in 4–5 years at 70% utilization.",
    risks:[{cat:'Solar Reliability',prob:'Medium',impact:'High',mit:'Proven AkoFresh technology. Remote monitoring. Backup power.'},{cat:'Farmer Adoption',prob:'Medium',impact:'High',mit:'Price transparency sharing. Cooperative pre-commitment agreements.'},{cat:'Maintenance',prob:'Medium',impact:'Medium',mit:'Local technician training. Manufacturer service level agreement.'}],
    crossSectors:[3,10,12], crossNotes:'Medicine cold chain technology overlap (S3). Solar energy infrastructure (S10). Cold chain transport fleet (S12).',
  },
  { id:'A-02', sector:6, title:'Smallholder Aggregation Platform',
    desc:'Digital platform connecting 600,000+ smallholder farmers to buyers, inputs, and finance.',
    fullDesc:"Ghana's 5.6M smallholder farmers operate as isolated individuals in a market designed for scale. Buyers cannot aggregate efficiently; input suppliers cannot reach farmers economically; banks cannot assess creditworthiness. BRIDGE's aggregation platform digitalizes the cooperative network: GPS-tagged farm plots, production commitments, input financing, and direct buyer connections — transforming fragmented smallholder production into a bankable, aggregatable supply base.",
    score:88, dims:[27,22,22,17], subDims:{pp:[10,9,8],sf:[9,8,5],fe:[9,8,5],fs:[6,6,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Active', region:'National', tags:['Platform','Smallholder','AgriTech'],
    mode:'INCUBATE', modeRationale:'BRIDGE operates the aggregation layer. Revenue from buyer facilitation fees, input supply margins, and embedded finance.',
    pipeline:4, irr:'18–24%', structure:'Platform Revenue Share', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"The aggregation platform is the enabling infrastructure for every other agricultural venture in BRIDGE's portfolio. Cold storage, processing, and finance ventures all depend on aggregated, predictable supply.",
    thesis2:"Revenue: 3–5% facilitation fee on buyer transactions ($2–4M annually at $60M aggregate trade volume), input supply margin (8–12%), credit origination fee (2%).",
    risks:[{cat:'Farmer Data Privacy',prob:'Low',impact:'Medium',mit:'Explicit consent framework. BRIDGE data governance policy.'},{cat:'Cooperative Governance',prob:'Medium',impact:'High',mit:'Cooperative governance training. BRIDGE field officer network.'},{cat:'Buyer Offtake Reliability',prob:'Medium',impact:'High',mit:'Multi-buyer design. Minimum purchase commitments in contracts.'}],
    crossSectors:[2,4,6,12], crossNotes:'Credit scoring for agri-finance (S2). AgriTech data platform (S4). Logistics coordination (S12).',
  },
  { id:'A-03', sector:6, title:'Cooperative Strengthening Program',
    desc:'Formalization and capacity building for agricultural cooperatives — governance, financial management, collective bargaining support.',
    fullDesc:"Ghana has 70,000+ registered farmer cooperatives, but fewer than 15% have functional governance structures, audited accounts, or documented membership registers. Without these basics, cooperatives cannot access credit, sign formal contracts, or exercise collective bargaining power. BRIDGE deploys a cooperative strengthening programme — governance training, financial management, membership digitalization, and legal formalization — targeting the 8,000+ Tier 1 cooperatives with highest readiness.",
    score:81, dims:[24,20,21,16], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[9,7,5],fs:[5,6,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['Cooperative','Capacity','Impact'],
    mode:'ADVISE', modeRationale:'Technical assistance and capacity building role. BRIDGE provides programme and coordination. Revenue from government and DFI programme fees.',
    pipeline:2, irr:'12–16%', structure:'Programme Fee + Outcome Payment', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"Cooperative strengthening creates the enabling conditions for all other agricultural investments. A formally governed, finance-ready cooperative is BRIDGE's most valuable agricultural asset.",
    thesis2:"Government DACF cooperatives budget (GHS 200M+/year) provides programme funding. DFI TA grants (USAID, GIZ) co-fund delivery at no cost to BRIDGE.",
    risks:[{cat:'Cooperative Engagement',prob:'Medium',impact:'Medium',mit:'Peer champion network. Results-based payment incentivizes completion.'},{cat:'Government Programme Changes',prob:'Low',impact:'Medium',mit:'Multi-payer design. DFI funding independent of government.'},{cat:'Long Lead Times',prob:'Medium',impact:'Low',mit:'Expected 12–18 months to formal status. Pipeline built accordingly.'}],
    crossSectors:[2,4,6], crossNotes:'Cooperative credit readiness for Agri-Finance (S2). Digital cooperative management tools (S4).',
  },
  { id:'A-04', sector:6, title:'Value-Added Processing Facilities',
    desc:'District-level processing infrastructure converting raw output into higher-value products.',
    fullDesc:"Ghana exports 85%+ of cocoa, shea, and cashew as raw commodities — capturing 20–30% of final consumer price. Processing these commodities domestically would capture 60–70% of value while creating permanent employment. BRIDGE structures district-level processing facilities — tomato paste, shea butter, cashew kernels, cassava flour — co-located with cold storage and aggregation infrastructure, operated under management contracts with experienced processors.",
    score:85, dims:[25,22,21,17], subDims:{pp:[9,9,7],sf:[9,8,5],fe:[8,7,6],fs:[6,6,5]},
    tier:'Core', capMin:2, capMax:7, stage:'Seed', region:'Northern Regions', tags:['Processing','Value-Add','Employment'],
    mode:'INVEST', modeRationale:'Capital-intensive processing infrastructure. BRIDGE invests alongside government oil palm window co-financing. DFI blended finance available.',
    pipeline:2, irr:'15–20%', structure:'Equity + Asset Finance', minTicket:'$400,000', horizon:'5–7 years',
    thesis:"Processing ventures benefit from double price leverage: raw material cost reduction (direct farmer sourcing) and finished product premium (processed vs. raw commodity). Margins compound at both ends of the value chain.",
    thesis2:"Oil Palm Finance Window (GHS 6.9B, 1:5.2x leverage) is the flagship co-financing mechanism. BRIDGE's 30% co-investment requirement activates government capital at no cost to government processing capacity.",
    risks:[{cat:'Raw Material Supply',prob:'Medium',impact:'High',mit:'Cooperative supply agreements. Aggregation platform feedstock.'},{cat:'Market Access',prob:'Medium',impact:'High',mit:'Pre-committed buyer offtake agreements before facility construction.'},{cat:'Operational Management',prob:'Medium',impact:'High',mit:'Experienced processor management contracts. BRIDGE operational oversight.'}],
    crossSectors:[6,11,12], crossNotes:'Manufacturing sector overlap (S11). Cold chain and logistics (S12). AgriFinance for farmers (S2).',
  },
  { id:'A-05', sector:6, title:'Ejura Agricultural Hub',
    desc:'Integrated 500-acre agricultural hub in the Ashanti breadbasket — production, processing, training, and market access.',
    fullDesc:"Ejura in the Ashanti Region sits at the intersection of Ghana's agricultural heartland — maize, cassava, tomato, and yam production zones converge within 50km. BRIDGE's Integrated Agricultural Hub at Ejura combines: a 500-acre demonstration farm, a maize processing facility (2,000MT/year capacity), cold storage (50MT), an agricultural training center (500 farmers/year), and a market linkage hub. The hub is the flagship for BRIDGE's national agricultural replication model under Grow24's 2M hectare irrigation commitment.",
    score:89, dims:[27,23,22,17], subDims:{pp:[10,9,8],sf:[9,9,5],fe:[9,8,5],fs:[6,6,5]},
    tier:'Core', capMin:5, capMax:12, stage:'Active', region:'Ashanti', tags:['Hub','Integration','Flagship'],
    mode:'INCUBATE', modeRationale:'BRIDGE builds, owns, and operates the hub directly. Flagship demonstration site for the full BRIDGE agricultural model. Generates replication evidence.',
    pipeline:4, irr:'15–20%', structure:'Direct Equity', minTicket:'$500,000', horizon:'5–8 years',
    thesis:"The integrated hub model proves the full BRIDGE agricultural thesis in one location — cold storage, processing, training, and market access operating as a system. Proven Ejura model is the template for national replication.",
    thesis2:"Revenue streams: processing margin (maize, tomato), storage fees, training centre government contract, market linkage facilitation fee. Hub reaches self-sustaining cash flow at Year 3.",
    risks:[{cat:'Land Tenure',prob:'Medium',impact:'High',mit:'Government Agro-Industrial Park designation. Stool land agreement with legal protection.'},{cat:'Operational Complexity',prob:'High',impact:'Medium',mit:'Phased build-out. Each component reaches operational stability before next phase.'},{cat:'Climate',prob:'Medium',impact:'High',mit:'Irrigation infrastructure. Drought-tolerant variety integration.'}],
    crossSectors:[1,6,10,12], crossNotes:'Market infrastructure (S1). Energy for processing (S10). Logistics for distribution (S12).',
  },
  { id:'A-06', sector:6, title:'Agricultural Finance Products',
    desc:'Crop finance, equipment leasing, and warehouse receipt lending for Ghanaian smallholders — collateral-light structures.',
    fullDesc:"Ghana's formal banking system provides less than 3% of agricultural credit as a share of total bank lending. The barriers are well-documented: seasonal income, no collateral, no credit history. BRIDGE structures three complementary agri-finance products: seasonal crop finance (collateralized by crop standing or in-warehouse), equipment leasing (tractors, irrigation pumps, post-harvest equipment), and warehouse receipt finance (using GCX-registered stock as collateral).",
    score:83, dims:[25,21,20,17], subDims:{pp:[9,8,8],sf:[8,8,5],fe:[8,7,5],fs:[6,6,5]},
    tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'National', tags:['Finance','Credit','Agriculture'],
    mode:'INVEST', modeRationale:'Structured lending products. BRIDGE provides first-loss layer and structuring expertise. Commercial banks originate through BRIDGE framework.',
    pipeline:2, irr:'12–16%', structure:'Blended Finance — First Loss', minTicket:'$500,000', horizon:'4–6 years',
    thesis:"Agricultural credit at scale requires the right structure, not just the right intent. BRIDGE's first-loss model and crop insurance integration de-risk commercial bank lending to the point of viability.",
    thesis2:"Warehouse receipt financing through GCX activation enables temporal arbitrage — farmers store at harvest, borrow against stored value, sell at price peak. The system eliminates forced selling at harvest-time lows.",
    risks:[{cat:'Climate / Crop Loss',prob:'High',impact:'High',mit:'Parametric crop insurance mandatory. Geographic diversification of portfolio.'},{cat:'Market Price Volatility',prob:'Medium',impact:'High',mit:'Warehouse receipt model enables price timing. Forward contracts with processors.'},{cat:'Default Rate',prob:'Medium',impact:'High',mit:'First-loss structure absorbs initial losses. Conservative LTV ratios.'}],
    crossSectors:[2,6], crossNotes:'Agricultural credit connects to financial inclusion (S2). Integrated with cooperative network (S6).',
  },

  // ── SECTOR 7 · SPORTS & CREATIVE INDUSTRIES ──
  { id:'CR-01', sector:7, title:'Content Production Studio',
    desc:"Professional film, music, and digital content production infrastructure for Ghana's growing creative economy.",
    fullDesc:"Ghana's creative economy generates an estimated $2B+ annually through music, film, fashion, and digital content — but consistently punches below its weight due to production infrastructure gaps. BRIDGE invests in a professional content production studio: broadcast-grade film and music recording facilities, post-production suites, distribution partnerships, and a talent development programme. The studio serves domestic content demand and positions Ghana as a regional production hub.",
    score:79, dims:[23,20,20,16], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:2, capMax:5, stage:'Seed', region:'Accra', tags:['Media','Production','Creative'],
    mode:'INVEST', modeRationale:'Infrastructure investment with multiple revenue streams. BRIDGE invests and manages the studio asset. Talent development creates sustainable throughput.',
    pipeline:2, irr:'14–18%', structure:'Equity + Revenue Share', minTicket:'$300,000', horizon:'4–6 years',
    thesis:"Content production infrastructure is capital-constrained in Ghana despite strong content demand. The studio that provides professional-grade infrastructure at accessible rates becomes the default production home for Ghana's creative sector.",
    thesis2:"Revenue: studio hire ($500–3,000/day), production services, music distribution partnership (10–15% of streaming revenue), content licensing to African streaming platforms (Netflix, Showmax, Canal+).",
    risks:[{cat:'Utilization Rate',prob:'Medium',impact:'High',mit:'Anchor client agreements. Corporate content production as stable revenue base.'},{cat:'Talent Pipeline',prob:'Low',impact:'Medium',mit:'BRIDGE talent development programme. Diaspora filmmaker partnership.'},{cat:'Technology Obsolescence',prob:'Low',impact:'Medium',mit:'Modular equipment strategy. Operating lease for rapid-depreciation items.'}],
    crossSectors:[4,5,9], crossNotes:'Digital content distribution technology (S4). Skills training for production roles (S5). Tourism content production (S9).',
  },
  { id:'CR-02', sector:7, title:'Talent Management Platform',
    desc:'Digital platform for Ghanaian artists, athletes, and creatives — contracts, royalties, booking, and international market access.',
    fullDesc:"Ghana's creative talent — musicians, footballers, visual artists, fashion designers — consistently undermonetizes internationally due to lack of professional management infrastructure. BRIDGE builds a talent management platform that provides contract management, royalty tracking and collection, booking coordination, and international market access — serving both individual talent and their management companies.",
    score:77, dims:[23,19,20,15], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:0.5, capMax:1.5, stage:'Concept', region:'Accra', tags:['Platform','Talent','IP'],
    mode:'CONNECT', modeRationale:'Platform connecting talent, management, and international buyers. BRIDGE earns from platform fees and international deal facilitation.',
    pipeline:1, irr:'20–28%', structure:'SaaS + Deal Commission', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"IP monetization requires infrastructure. Ghana produces world-class creative talent that consistently underearns due to absent management systems. The platform that solves this problem captures a percentage of a multi-billion dollar value creation opportunity.",
    thesis2:"Commission model: 3–5% on booking fees, 1–2% on royalty collections, SaaS subscription for management companies (GHS 200–500/month). International partner revenue share on deal facilitation.",
    risks:[{cat:'Talent Adoption',prob:'Medium',impact:'High',mit:'Partnership with GAF (Ghana Athletes Federation) and GHAMRO.'},{cat:'IP Enforcement',prob:'High',impact:'Medium',mit:'Legal partnership for enforcement. International collecting society affiliations.'},{cat:'Competition',prob:'Medium',impact:'Medium',mit:'Ghana-first design and language. Local regulatory knowledge.'}],
    crossSectors:[4,7,9], crossNotes:'Digital IP infrastructure (S4). Tourism content opportunities (S9).',
  },
  { id:'CR-03', sector:7, title:'Sports Academy Network',
    desc:'Multi-sport academies with professional coaching, nutrition, and education — talent development for local and international leagues.',
    fullDesc:"Ghana has produced world-class footballers, boxers, and athletes for decades — but the domestic infrastructure for talent development is underfunded. BRIDGE invests in a network of multi-sport academies combining: professional coaching, nutrition and sports science, education integration (so athletes don't sacrifice schooling), and international scouting relationships. Academies generate revenue from academy fees, international placement commissions, and facility hire.",
    score:74, dims:[22,18,20,14], subDims:{pp:[8,7,7],sf:[8,6,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:2, capMax:6, stage:'Concept', region:'Accra / Kumasi', tags:['Sports','Youth','Academy'],
    mode:'INVEST', modeRationale:'Infrastructure investment with placement fee revenue. BRIDGE invests in academy infrastructure. Management partnership with established football academies.',
    pipeline:1, irr:'12–16%', structure:'Equity + Placement Commission', minTicket:'$300,000', horizon:'5–8 years',
    thesis:"One successful international placement (football: €500K–5M transfer fee; athletics: $50–200K sponsorship) generates returns that fund multiple academy cohorts. The asymmetric upside is the investment thesis.",
    thesis2:"Operating revenue from academy fees (GHS 2,000–5,000/year per athlete) covers operating costs at 100 enrolled athletes. International placement commissions (10–20% of contract value) are pure profit.",
    risks:[{cat:'Talent Identification',prob:'Medium',impact:'High',mit:'Expert coaching team. Data-driven scouting tools.'},{cat:'International Market Access',prob:'Medium',impact:'High',mit:'Diaspora professional network in European leagues.'},{cat:'Welfare and Education',prob:'Low',impact:'High',mit:'Education-integrated programme. Child welfare policy compliance.'}],
    crossSectors:[4,5,7], crossNotes:'Digital performance tracking (S4). Education integration (S5).',
  },
  { id:'CR-04', sector:7, title:'IP Monetization & Licensing',
    desc:'Structured IP registration, protection, and licensing platform for Ghanaian musicians, filmmakers, and artists.',
    fullDesc:"Ghana's creative sector loses an estimated $100M+ annually to IP theft, unauthorized distribution, and royalty non-collection. BRIDGE builds the infrastructure to reverse this: IP registration (patent, trademark, copyright), enforcement partnership with Copyrights Commission, collecting society integration (GHAMRO, SAMRO), and international royalty collection services for Ghanaian artists earning revenue abroad.",
    score:71, dims:[21,18,19,13], subDims:{pp:[7,7,7],sf:[8,6,3],fe:[8,6,5],fs:[4,5,4]},
    tier:'Emerging', capMin:0.5, capMax:1.5, stage:'Concept', region:'National', tags:['IP','Legal','Creative'],
    mode:'CONNECT', modeRationale:'BRIDGE connects rights holders, collecting societies, and enforcement bodies. Service fee revenue. No capital at risk.',
    pipeline:1, irr:'18–25%', structure:'Service Fee + Royalty Commission', minTicket:'$50,000', horizon:'2–4 years',
    thesis:"IP monetization is a service business with recurring revenue and zero asset capital requirement. The royalty collection business compounds as more artists are enrolled — each artist's ongoing revenue generates an ongoing BRIDGE commission.",
    thesis2:"Revenue: IP registration fee (GHS 200–500), annual management fee (GHS 100–200/year), international royalty collection commission (15–20%). At 10,000 enrolled artists: GHS 2–4M annual fee revenue.",
    risks:[{cat:'Enforcement Capacity',prob:'High',impact:'Medium',mit:'Legal partner firm on retainer. Copyrights Commission co-operation agreement.'},{cat:'Artist Awareness',prob:'Medium',impact:'Medium',mit:'Creative sector education programme. Industry association partnership.'},{cat:'International Collection',prob:'Medium',impact:'High',mit:'PRS, ASCAP, SACEM affiliation agreements.'}],
    crossSectors:[4,7], crossNotes:'Digital IP tracking technology (S4).',
  },

  // ── SECTOR 8 · HOUSING & REAL ESTATE ──
  { id:'HO-01', sector:8, title:'Affordable Housing Development',
    desc:'Mixed-income housing development targeting the 2M unit shortfall — government-guaranteed off-take for social units.',
    fullDesc:"Ghana faces a 2M+ housing unit deficit, concentrated at the affordable and social housing end. The government's SSNIT and Saglemi Housing programmes have demonstrated both the demand and the structural failures of state delivery. BRIDGE structures a mixed-income development model: 30% social units (government-guaranteed off-take at subsidy price), 50% affordable market units, 20% premium units — using premium cross-subsidy to fund the social and affordable components. The first project target is 500 units in Greater Accra.",
    score:83, dims:[25,21,21,16], subDims:{pp:[9,8,8],sf:[8,8,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:5, capMax:15, stage:'Seed', region:'Greater Accra', tags:['Housing','Development','PPP'],
    mode:'INVEST', modeRationale:'Development finance investment. BRIDGE manages development process. Government off-take guarantee de-risks social unit component.',
    pipeline:2, irr:'18–24%', structure:'Development Finance + Presales', minTicket:'$1,000,000', horizon:'4–6 years',
    thesis:"Mixed-income cross-subsidy creates commercial viability for social housing at scale. Government off-take guarantee removes sales risk on the social unit component. Premium unit presales fund construction.",
    thesis2:"Project IRR driven by premium unit margins (30–40% on cost). Social unit cash flows are low-margin but government-guaranteed. Affordable market units provide volume. Portfolio IRR blends to 18–24%.",
    risks:[{cat:'Land Acquisition',prob:'Medium',impact:'High',mit:'Government land partnership. GIHOC site options. Legal title verification.'},{cat:'Construction Cost Escalation',prob:'High',impact:'High',mit:'Fixed-price EPC contract. Local materials sourcing.'},{cat:'Sales Velocity',prob:'Medium',impact:'High',mit:'Diaspora buyer programme (F-03). Corporate housing demand. Government off-take.'}],
    crossSectors:[2,11,1], crossNotes:'Diaspora Investment Gateway for buyer financing (S2). Local manufacturing of building materials (S11). Infrastructure for development sites (S1).',
  },
  { id:'HO-02', sector:8, title:'Diaspora Housing Product',
    desc:'Structured diaspora housing investment — escrow construction finance, professional management, and guaranteed rental returns.',
    fullDesc:"Ghana's 3M+ diaspora community has strong demand for Ghana real estate investment but consistent barriers: construction fraud, no professional management, difficult rent collection, and FX risk. BRIDGE creates a structured diaspora housing product: escrow-based construction finance (funds released against verified milestones), professional property management, and a rental return guarantee structure. The product converts a historically risky diaspora investment into a bankable, transparent asset.",
    score:80, dims:[24,20,20,16], subDims:{pp:[8,8,8],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:5, stage:'Seed', region:'Accra / Kumasi', tags:['Diaspora','Real Estate','Finance'],
    mode:'CONNECT', modeRationale:'BRIDGE structures the product and manages the escrow and management infrastructure. Revenue from management fees and escrow administration.',
    pipeline:2, irr:'14–18%', structure:'Management Fee + Commission', minTicket:'$50,000', horizon:'3–5 years',
    thesis:"Diaspora housing demand is enormous and frustrated. The problem is not money — it is trust infrastructure. BRIDGE's escrow structure, professional management, and transparent reporting creates a trusted product in an otherwise high-risk market.",
    thesis2:"Management fee revenue (8–10% of rental income), escrow administration fee (1–2% of property value), and buyer referral commission from developers. At $20M AUM: $250–400K annual management fee revenue.",
    risks:[{cat:'Developer Quality Control',prob:'Medium',impact:'High',mit:'Developer vetting process. Escrow release tied to independent inspection.'},{cat:'Rental Market Fluctuation',prob:'Medium',impact:'Medium',mit:'Conservative yield guarantees. Portfolio diversification across locations.'},{cat:'FX Risk',prob:'High',impact:'Medium',mit:'USD-denominated management contracts where possible.'}],
    crossSectors:[2,8], crossNotes:'Diaspora Investment Gateway channel (S2). Property management platform integration (HO-04).',
  },
  { id:'HO-03', sector:8, title:'Construction Materials Supply Chain',
    desc:'Local production and distribution of affordable building materials — reducing construction costs 20–30%.',
    fullDesc:"Ghana imports 60%+ of premium construction materials — cement, steel, finishing materials — despite having the raw material inputs domestically. BRIDGE structures a local construction materials enterprise: compressed earth blocks (CEB) from local soil, locally-manufactured roofing sheets, and a distribution network for locally-produced materials. CEB construction reduces wall cost by 30–40% vs. imported cement blocks while providing superior thermal performance.",
    score:76, dims:[22,19,20,15], subDims:{pp:[8,7,7],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:2, capMax:8, stage:'Concept', region:'National', tags:['Materials','Manufacturing','Construction'],
    mode:'INVEST', modeRationale:'Manufacturing investment in construction materials. BRIDGE invests alongside Ghana Standards Authority certification. Institutional buyer off-take creates demand certainty.',
    pipeline:1, irr:'14–18%', structure:'Manufacturing Equity', minTicket:'$300,000', horizon:'4–6 years',
    thesis:"Local materials production at competitive quality captures 20–30% of the construction cost reduction potential in Ghana's housing development pipeline. BRIDGE housing projects create captive demand for the manufacturing enterprise.",
    thesis2:"BRIDGE housing developments provide immediate off-take. Government social housing programme (SSNIT) is second tier institutional buyer. SME builder network provides distributed demand.",
    risks:[{cat:'Ghana Standards Certification',prob:'Medium',impact:'High',mit:'Pre-certification investment before scale. GSA technical partnership.'},{cat:'Quality Consistency',prob:'Medium',impact:'High',mit:'Quality management system. Laboratory testing at production.'},{cat:'Market Acceptance',prob:'Medium',impact:'Medium',mit:'BRIDGE housing project demonstration effect. Architect partnership programme.'}],
    crossSectors:[1,8,11], crossNotes:'Housing developments as anchor customers (S8). Manufacturing sector overlap (S11). Infrastructure project supply (S1).',
  },
  { id:'HO-04', sector:8, title:'Property Management Platform',
    desc:'Digital property management for Ghanaian landlords — tenant vetting, rent collection, maintenance, and legal compliance.',
    fullDesc:"Ghana has 500,000+ rental properties, the vast majority managed informally by individual landlords with no professional support. The result: poor tenant selection, rent collection difficulties, maintenance neglect, and legal exposure. BRIDGE builds the PropTech platform: digital tenant applications with identity and income verification, automated rent reminders and collection via MoMo, maintenance request management, and lease compliance tracking.",
    score:74, dims:[22,18,19,15], subDims:{pp:[7,8,7],sf:[8,6,4],fe:[8,7,4],fs:[5,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'Accra', tags:['PropTech','Platform','Rental'],
    mode:'INVEST', modeRationale:'B2C SaaS with strong retention economics. BRIDGE invests in platform operator. BRIDGE housing portfolio creates captive initial user base.',
    pipeline:1, irr:'20–28%', structure:'SaaS Equity', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"Property management is a recurring-revenue service with high retention (landlords don't switch providers once their tenant data is in the system). The BRIDGE housing portfolio provides a captive initial user base to build from.",
    thesis2:"SaaS revenue: GHS 50–150/property/month. At 5,000 properties: GHS 250–750K/month. Transaction fee on rent collection via MoMo (0.5–1.5%). Legal service referral commission.",
    risks:[{cat:'Landlord Tech Adoption',prob:'Medium',impact:'High',mit:'WhatsApp-first interface. Onboarding support. Diaspora landlord target segment (high tech literacy).'},{cat:'MoMo Payment Integration',prob:'Low',impact:'Medium',mit:'Established MTN and Vodafone API partnerships.'},{cat:'Competition',prob:'Medium',impact:'Medium',mit:'Ghana-specific legal and language customization as moat.'}],
    crossSectors:[2,8], crossNotes:'BRIDGE housing portfolio captive users (S8). Digital payments integration (S2).',
  },

  // ── SECTOR 9 · TOURISM & HOSPITALITY ──
  { id:'TO-01', sector:9, title:'Heritage Tourism Development',
    desc:"Ghana's slave route, colonial forts, and cultural heritage developed into world-class visitor experiences.",
    fullDesc:"Ghana's heritage tourism infrastructure — the Cape Coast and Elmina castles, the slave route sites in the Volta and Central Regions — generates less than 10% of the tourism revenue it could with world-class visitor experience design. Following the Year of Return's 200,000 diaspora visitors in 2019, latent diaspora tourism demand is established. BRIDGE invests in heritage site visitor experience infrastructure: interpretation centres, guided experience programmes, accommodation close to sites, and digital pre-visit content platforms.",
    score:82, dims:[24,21,21,16], subDims:{pp:[9,8,7],sf:[9,7,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'Central Region', tags:['Heritage','Tourism','Diaspora'],
    mode:'INVEST', modeRationale:'Tourism infrastructure investment. BRIDGE co-invests with Ghana Tourism Authority. Diaspora tourism demand provides reliable revenue base.',
    pipeline:2, irr:'12–16%', structure:'Equity + Concession Revenue', minTicket:'$300,000', horizon:'5–8 years',
    thesis:"Diaspora tourism is Ghana's highest-value, lowest-acquisition-cost tourism segment. The Year of Return established proven demand. BRIDGE provides the infrastructure to convert demand into revenue.",
    thesis2:"Per-visitor spend at heritage sites in comparable markets (Kenya, South Africa) is $80–200/day. Ghana captures $20–40. Upgrading visitor infrastructure is the single most direct lever on tourism revenue.",
    risks:[{cat:'Ghana Tourism Authority Concession',prob:'Low',impact:'High',mit:'GTA partnership framework in advanced discussion.'},{cat:'Visitor Volume',prob:'Medium',impact:'High',mit:'Year of Return evidence. Diaspora marketing channel.'},{cat:'Infrastructure Quality',prob:'Medium',impact:'Medium',mit:'International visitor experience design firm partnership.'}],
    crossSectors:[7,9,4], crossNotes:'Creative content production for tourism marketing (S7). Digital experience platform (S4).',
  },
  { id:'TO-02', sector:9, title:'Eco-Tourism Lodges Network',
    desc:'Sustainable eco-lodges in national parks and nature reserves for international ecotourism.',
    fullDesc:"Ghana's national parks and wildlife reserves — Kakum, Mole, Bui — attract a fraction of the ecotourism visitors captured by comparable East African and Southern African parks due to inadequate lodge infrastructure. BRIDGE invests in a network of 4 eco-lodges: solar-powered, locally designed, community employment-maximizing, and positioned at the high-value international ecotourism market ($200–500/night). Community revenue sharing creates conservation incentives.",
    score:77, dims:[23,19,20,15], subDims:{pp:[8,7,8],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Eco-Tourism','Sustainability','Lodges'],
    mode:'INVEST', modeRationale:'Lodge infrastructure investment. BRIDGE invests in construction and operates. Revenue from accommodation, guiding, and conservation levy.',
    pipeline:1, irr:'14–18%', structure:'Equity + Management Contract', minTicket:'$300,000', horizon:'6–8 years',
    thesis:"High-value international ecotourism is the fastest-growing tourism segment globally. Ghana's wildlife is world-class; the missing piece is accommodation infrastructure that international visitors expect.",
    thesis2:"$200–500/night lodge revenue with 50% occupancy at 20 rooms = $730K–1.8M/year per lodge. Community employment and conservation levy creates social license and regulatory support.",
    risks:[{cat:'Visitor Volume',prob:'Medium',impact:'High',mit:'International tour operator partnerships pre-deployment.'},{cat:'Wildlife / Environmental',prob:'Low',impact:'High',mit:'Environmental impact assessment. Conservation management plan.'},{cat:'Construction in Remote Areas',prob:'Medium',impact:'Medium',mit:'Local construction partner. Supply chain planning.'}],
    crossSectors:[9,10,6], crossNotes:'Solar energy for lodge infrastructure (S10). Local food supply from agriculture (S6).',
  },
  { id:'TO-03', sector:9, title:'Hospitality Training Academy',
    desc:'Vocational training academy for hotel and restaurant staff — partnered with international hospitality brands.',
    fullDesc:"Ghana's expanding hospitality sector — driven by Year of Return diaspora tourism, corporate travel, and regional conferences — faces a chronic shortage of trained hospitality professionals. International hotel brands operating in Accra cite staff quality as their primary operational challenge. BRIDGE structures a dedicated hospitality training academy in partnership with Marriott, Accor, or Hilton — with guaranteed placement pathways and a curriculum co-designed with industry.",
    score:79, dims:[23,20,20,16], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Seed', region:'Accra', tags:['Training','Hospitality','Skills'],
    mode:'CONNECT', modeRationale:'BRIDGE connects international hospitality partners with Ghana training infrastructure. Revenue from placement fees and curriculum licensing.',
    pipeline:2, irr:'16–20%', structure:'Partnership Fee + Placement', minTicket:'$150,000', horizon:'2–4 years',
    thesis:"International hospitality brand partnership provides both curriculum quality assurance and guaranteed employment pipeline — removing the risk that training supply exceeds employer demand.",
    thesis2:"Placement fee ($1,000–2,000 per successful hire) plus annual curriculum licensing ($50,000–100,000 from hotel brand) creates dual revenue streams. Government TVET co-funding available.",
    risks:[{cat:'Hotel Brand Commitment',prob:'Medium',impact:'High',mit:'Pilot programme with Accra-based hotel before national scale.'},{cat:'Student Retention',prob:'Medium',impact:'Medium',mit:'Income-share structure. Placement guarantee creates strong completion incentive.'},{cat:'Quality Standards',prob:'Low',impact:'High',mit:'International brand curriculum and assessment standards.'}],
    crossSectors:[5,9,1], crossNotes:'TVET system integration (S5). Tourism sector workforce (S9).',
  },
  { id:'TO-04', sector:9, title:'Digital Destination Platform',
    desc:'Comprehensive travel platform for Ghana — bookings, itineraries, guides, and community-based tourism experiences.',
    fullDesc:"Ghana's tourism digital infrastructure is minimal. No single authoritative platform aggregates accommodation booking, activity scheduling, transport, and authentic community experience access for domestic and international visitors. BRIDGE builds the definitive Ghana travel platform: GTA-endorsed, community experience verified, integrated with diaspora reunion and heritage tourism packages, and functioning as the digital front door for Ghana's tourism economy.",
    score:73, dims:[22,18,19,14], subDims:{pp:[7,8,7],sf:[8,6,4],fe:[7,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Platform','Digital','Tourism'],
    mode:'INVEST', modeRationale:'Platform investment with transaction fee model. BRIDGE co-invests with GTA institutional support.',
    pipeline:1, irr:'20–28%', structure:'Equity + Transaction Fee', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"Travel platforms achieve high-value network effects. GTA endorsement and BRIDGE brand credibility provide a unique trust foundation in a market with widespread scam concerns among diaspora visitors.",
    thesis2:"Booking commission (8–12%) on accommodation and activities, diaspora tour package curation (15–20% margin), and advertising revenue from tourism-adjacent businesses.",
    risks:[{cat:'Liquidity',prob:'Medium',impact:'High',mit:'GTA and BRIDGE content partnership provides inventory before user acquisition.'},{cat:'Trust',prob:'Medium',impact:'High',mit:'BRIDGE brand guarantee. Verified supplier programme.'},{cat:'Competition',prob:'Medium',impact:'Medium',mit:'Ghana-specific design and content depth as differentiation vs. global platforms.'}],
    crossSectors:[4,7,9], crossNotes:'Digital platform infrastructure (S4). Creative content production (S7).',
  },

  // ── SECTOR 10 · ENERGY & RENEWABLES ──
  { id:'EN-01', sector:10, title:'Solar Mini-Grid Network',
    desc:'Community-scale solar mini-grids powering off-grid communities — productive use anchor tenants drive viability.',
    fullDesc:"600+ Ghanaian communities with populations of 500–2,000 are not connected to the national grid and will not be connected through ECG's conventional grid extension timeline. Solar mini-grids with productive use anchor tenants (maize mills, cold storage, welding shops) are proven to achieve the commercial viability that residential-only mini-grids cannot. BRIDGE structures a mini-grid network with community equity participation and productive use integration from Day 1.",
    score:88, dims:[27,22,22,17], subDims:{pp:[10,9,8],sf:[9,8,5],fe:[9,8,5],fs:[6,6,5]},
    tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'Northern Regions', tags:['Solar','Energy Access','Mini-Grid'],
    mode:'INVEST', modeRationale:'Infrastructure investment with long-term tariff revenue. BRIDGE co-invests with PURC-regulated tariff certainty. Productive use creates commercial uplift.',
    pipeline:2, irr:'14–18%', structure:'Blended Finance + Tariff Revenue', minTicket:'$300,000', horizon:'7–10 years',
    thesis:"Productive use anchor tenants are the missing ingredient in Ghana mini-grid economics. A cold storage unit at a mini-grid increases average revenue per site by 40–60%, transforming marginal economics into clear commercial viability.",
    thesis2:"PURC-regulated tariff provides revenue certainty. Community equity model creates the social license that prevents vandalism and increases payment compliance.",
    risks:[{cat:'ECG Grid Extension',prob:'Medium',impact:'High',mit:'25-year concession area agreement before deployment.'},{cat:'Payment Compliance',prob:'Medium',impact:'High',mit:'Community ownership model. Prepaid meter architecture.'},{cat:'Productive Use Anchor',prob:'Medium',impact:'Medium',mit:'Cooperative cold storage agreement before deployment.'}],
    crossSectors:[6,10,1], crossNotes:'Cold storage anchor tenant (S6). Manufacturing productive use (S11). Community infrastructure (S1).',
  },
  { id:'EN-02', sector:10, title:'Rooftop Solar Financing',
    desc:'Pay-as-you-go solar financing for homes and SMEs — reducing electricity costs 40–60%.',
    fullDesc:"Despite abundant sunshine, less than 1% of Ghanaian rooftops have solar installations. The barrier is capital: quality systems cost GHS 5,000–20,000 upfront. BRIDGE structures a PAYG solar financing product: systems installed at zero upfront cost, customers pay a monthly fee (less than their current ECG bill), and own the system after 36–48 months. The loan is collateralized by the solar asset and performance guaranteed by the installer.",
    score:85, dims:[25,22,22,16], subDims:{pp:[9,8,8],sf:[9,8,5],fe:[9,8,5],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:5, stage:'Active', region:'National', tags:['Solar','FinTech','PAYG'],
    mode:'INVEST', modeRationale:'Asset-backed lending with strong unit economics. BRIDGE provides lending facility. Solar installation partners provide technology and installation.',
    pipeline:3, irr:'16–20%', structure:'Asset-Backed Loan Facility', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"PAYG solar is one of the most proven financial models in African off-grid energy. Ghana's relatively high ECG tariff (GHS 1.20–2.00/kWh) makes the economics compelling — solar PAYG delivers power at GHS 0.50–0.80/kWh equivalent.",
    thesis2:"Loan book economics: 12–15% interest rate, 85% repayment rate at scale, 3-year average tenor. At GHS 50M loan book: GHS 6–7.5M annual interest income before defaults.",
    risks:[{cat:'Payment Default',prob:'Medium',impact:'High',mit:'Remote disconnect technology. Graduated credit limits. Installer performance bonds.'},{cat:'ECG Tariff Reduction',prob:'Low',impact:'High',mit:'Diversify into SME segment with higher baseline energy costs.'},{cat:'FX on Equipment',prob:'Medium',impact:'Medium',mit:'Ghana-based assembly where possible. Currency hedging on equipment procurement.'}],
    crossSectors:[2,10,6], crossNotes:'PAYG payment via mobile money (S2). Agricultural solar applications (S6).',
  },
  { id:'EN-03', sector:10, title:'Clean Cooking Transition',
    desc:'LPG distribution and clean cookstove financing — 60% of households still use biomass.',
    fullDesc:"Over 60% of Ghanaian households cook on wood or charcoal, creating severe indoor air pollution (responsible for 14,000+ annual deaths) and contributing to deforestation. LPG is available in urban areas but inaccessible to peri-urban and rural households due to distribution gaps. BRIDGE structures a last-mile LPG distribution network and clean cookstove financing programme — delivering LPG cylinders to rural customers and financing the transition cost.",
    score:81, dims:[24,20,21,16], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[9,7,5],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:4, stage:'Seed', region:'National', tags:['CleanCooking','Health','Rural'],
    mode:'CONNECT', modeRationale:'BRIDGE connects NPA-licensed distributors with rural last-mile logistics. Revenue from distribution margin and cookstove financing interest.',
    pipeline:2, irr:'12–16%', structure:'Distribution Margin + Finance', minTicket:'$150,000', horizon:'3–5 years',
    thesis:"Clean cooking has direct health and economic ROI: GHS 50/month LPG spend saves GHS 80/month in wood/charcoal cost and eliminates GHS 200+/month in healthcare costs associated with indoor air pollution.",
    thesis2:"NPA LPG cylinder refill programme provides government co-financing. Carbon credit revenue from clean cooking transition adds $3–8/household/year additional income.",
    risks:[{cat:'LPG Price Volatility',prob:'High',impact:'High',mit:'Fixed-term supply agreements with NPA-licensed importers.'},{cat:'Cylinder Refill Infrastructure',prob:'Medium',impact:'High',mit:'Mobile refill unit partnership. District-level storage depot model.'},{cat:'Behaviour Change',prob:'Medium',impact:'Medium',mit:'Health education integration. Community champion network.'}],
    crossSectors:[3,6,10], crossNotes:'Health impact (S3). Rural energy access (S10). Food preparation for agricultural value chain (S6).',
  },
  { id:'EN-04', sector:10, title:'Energy Efficiency Services',
    desc:'Energy auditing and retrofitting for commercial and industrial clients — financing through utility bill savings.',
    fullDesc:"Ghana's commercial and industrial sector overpays for electricity by an estimated 25–35% due to inefficient equipment, poor power factor correction, and absent energy management. BRIDGE structures an energy efficiency service: free energy audit, equipment upgrade (LED lighting, VSD pumps, power factor correction), financed through the verified energy cost savings. The guaranteed savings model eliminates adoption barriers.",
    score:74, dims:[22,18,19,15], subDims:{pp:[7,7,8],sf:[8,6,4],fe:[7,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'Accra', tags:['Efficiency','B2B','Finance'],
    mode:'CONNECT', modeRationale:'BRIDGE connects energy efficiency technology firms with commercial clients. Revenue from project facilitation and finance margin.',
    pipeline:1, irr:'16–20%', structure:'Project Finance + Service Fee', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"Guaranteed savings financing is a zero-risk adoption proposition for commercial clients. The project pays for itself from verified savings. BRIDGE earns from the finance margin on the capital facilitation.",
    thesis2:"Commercial client base: hotels, hospitals, manufacturing, banks — all high energy consumers with CFO-level decision making. ROI period is typically 2–3 years, creating low capital cost of adoption.",
    risks:[{cat:'Savings Verification',prob:'Medium',impact:'High',mit:'Independent measurement and verification (M&V) protocol.'},{cat:'Client Creditworthiness',prob:'Low',impact:'High',mit:'Focus on formal sector clients with audited accounts.'},{cat:'Technology Partner Quality',prob:'Medium',impact:'Medium',mit:'Equipment quality standards. Performance warranty requirements.'}],
    crossSectors:[10,11], crossNotes:'Manufacturing energy efficiency (S11). Hotel sector (S9).',
  },
  { id:'EN-05', sector:10, title:'Grid-Scale Storage Partnership',
    desc:"Battery storage co-investment with ECG to stabilize national grid — addressing Ghana's voltage fluctuation problem.",
    fullDesc:"Ghana's national grid is characterized by persistent voltage fluctuations, outages, and demand-supply mismatches that cost the economy an estimated GHS 5B+ annually. Battery energy storage systems (BESS) co-located with major substations can smooth demand peaks, reduce outages, and improve power quality. BRIDGE structures a co-investment with ECG: BRIDGE provides private capital for BESS procurement and installation; ECG provides the grid connection and capacity payment agreement.",
    score:70, dims:[21,17,19,13], subDims:{pp:[7,7,7],sf:[8,6,3],fe:[8,6,5],fs:[4,4,5]},
    tier:'Emerging', capMin:5, capMax:20, stage:'Concept', region:'National', tags:['Storage','Grid','Utility'],
    mode:'INVEST', modeRationale:'Infrastructure co-investment with government utility. Long-duration capacity payment agreement provides revenue certainty.',
    pipeline:1, irr:'10–14%', structure:'Infrastructure Finance — Capacity Payment', minTicket:'$1,000,000', horizon:'10–15 years',
    thesis:"Capacity payment agreements with ECG, backed by PURC regulation, provide the revenue certainty that justifies long-duration infrastructure investment. IFC and AfDB are active BESS co-investors in comparable African markets.",
    thesis2:"Ghana's power sector reform trajectory and EU clean energy finance commitments create a favorable policy environment for the 2027+ timeframe.",
    risks:[{cat:'ECG Creditworthiness',prob:'High',impact:'High',mit:'Multilateral guarantee structure. World Bank credit enhancement.'},{cat:'Technology Risk',prob:'Low',impact:'Medium',mit:'Proven BESS technology from major manufacturers.'},{cat:'Policy Change',prob:'Medium',impact:'High',mit:'PURC regulatory protection. Long-term concession agreement.'}],
    crossSectors:[1,10], crossNotes:'Grid reliability for all infrastructure ventures (S1).',
  },

  // ── SECTOR 11 · MANUFACTURING & LIGHT INDUSTRY ──
  { id:'M-01', sector:11, title:'Pharmaceutical Manufacturing',
    desc:'WHO-certified generic pharmaceutical manufacturing — import substitution, government procurement, export potential.',
    fullDesc:"Ghana imports 70%+ of its pharmaceuticals at significant cost to the national health budget. The African pharmaceutical manufacturing sector is emerging rapidly, but Ghana lacks the WHO-GMP certified manufacturing capacity to supply even its own public health system. BRIDGE invests in a WHO-certified generic pharmaceutical manufacturing facility — targeting the GHS procurement tender pipeline ($150M+/year), East African export markets, and the AfCFTA pharmaceutical trade corridor.",
    score:83, dims:[25,21,21,16], subDims:{pp:[9,8,8],sf:[8,8,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:5, capMax:15, stage:'Seed', region:'Accra', tags:['Pharma','Manufacturing','Export'],
    mode:'INVEST', modeRationale:'Capital-intensive manufacturing investment. BRIDGE co-invests alongside DFI pharmaceutical fund. GHS procurement provides anchor revenue.',
    pipeline:2, irr:'14–18%', structure:'Equity + Debt Finance', minTicket:'$1,000,000', horizon:'6–8 years',
    thesis:"WHO-GMP certification is the moat — it takes 3–5 years to achieve and is a prerequisite for GHS procurement, export, and donor procurement. Once achieved, the certified facility commands premium access to procurement pipelines.",
    thesis2:"AfCFTA pharmaceutical protocol creates a 54-country potential export market for WHO-certified African manufacturers. Ghana's English-speaking status and established trade relationships provide comparative advantage.",
    risks:[{cat:'WHO-GMP Certification Timeline',prob:'Medium',impact:'High',mit:'Expert QA team. Phased certification (oral solids first). MoH fast-track pathway.'},{cat:'GHS Procurement Cycles',prob:'High',impact:'Medium',mit:'Multi-payer model (GHS + private sector + export). Not dependent on single buyer.'},{cat:'FX on Inputs',prob:'Medium',impact:'High',mit:'Dollar-denominated offtake contracts. Currency hedge on active ingredients.'}],
    crossSectors:[3,11,12], crossNotes:'Health sector supply chain (S3). Manufacturing sector expertise (S11). Export logistics (S12).',
  },
  { id:'M-02', sector:11, title:'Agro-Processing Equipment Leasing',
    desc:'Equipment leasing company for agro-processors — reducing capital barriers with shared maintenance infrastructure.',
    fullDesc:"Ghana's agricultural processing sector is starved of equipment: tractors, grain mills, oil presses, drying equipment, and cold storage. The capital cost of owning this equipment individually is prohibitive for small and medium processors. BRIDGE structures an equipment leasing company — acquiring a fleet of processing equipment, leasing to processors on affordable monthly terms, and providing maintenance services that individual owners cannot sustain.",
    score:80, dims:[24,20,20,16], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:5, stage:'Seed', region:'National', tags:['Equipment','Leasing','Agro'],
    mode:'INVEST', modeRationale:'Asset-backed leasing business. BRIDGE owns the equipment asset. Revenue from lease payments. High utilization drives returns.',
    pipeline:2, irr:'14–18%', structure:'Asset Finance + Leasing Revenue', minTicket:'$200,000', horizon:'4–6 years',
    thesis:"Equipment leasing requires capital discipline and credit assessment — both BRIDGE capabilities. The assets retain residual value. Revenue compounds as the fleet grows and utilization builds.",
    thesis2:"Ghana Agricultural Development Bank (ADB Ghana) has expressed interest in co-financing the equipment acquisition. Agricultural processing demand growth of 12%+/year provides expanding addressable market.",
    risks:[{cat:'Equipment Utilization',prob:'Medium',impact:'High',mit:'Cooperative aggregation network as pipeline. Utilization-based pricing.'},{cat:'Maintenance Costs',prob:'Medium',impact:'Medium',mit:'Preventive maintenance programme. Manufacturer warranty. In-house technician team.'},{cat:'Default',prob:'Medium',impact:'High',mit:'Equipment repossession rights. Credit scoring from cooperative relationships.'}],
    crossSectors:[6,11], crossNotes:'Agricultural processing demand (S6). Manufacturing sector complementarity (S11).',
  },
  { id:'M-03', sector:11, title:'Garment & Textile Production',
    desc:'Contract manufacturing for regional and international fashion brands — AGOA preferential trade access.',
    fullDesc:"Ghana has an AGOA (African Growth and Opportunity Act) preferential trade agreement with the US providing duty-free access for textile and garment exports. Despite this, Ghana's garment manufacturing sector is negligible. BRIDGE structures a contract manufacturing facility targeting regional African fashion brands and international buyers seeking nearshoring alternatives — providing competitive pricing, ethical supply chain credentials, and AGOA export advantages.",
    score:77, dims:[23,19,20,15], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:2, capMax:8, stage:'Concept', region:'Accra / Tema', tags:['Textiles','Export','Manufacturing'],
    mode:'INVEST', modeRationale:'Manufacturing investment with long-term brand contract offtake. BRIDGE co-invests with experienced garment manufacturer.',
    pipeline:1, irr:'14–18%', structure:'JV Equity + Contract Manufacturing', minTicket:'$500,000', horizon:'5–7 years',
    thesis:"AGOA provides a structural competitive advantage: duty-free export to the US market that Chinese and Vietnamese manufacturers cannot replicate from their current locations.",
    thesis2:"Ethical supply chain demand from international brands (H&M, Zara nearshoring) creates premium pricing opportunity. African fashion market growth (+12%/year) provides regional demand.",
    risks:[{cat:'AGOA Renewal',prob:'Low',impact:'High',mit:'AGOA has broad political support. Policy risk management through diversified markets.'},{cat:'Labour Productivity',prob:'Medium',impact:'High',mit:'Training investment. Performance-based incentive structure.'},{cat:'FX',prob:'Medium',impact:'Medium',mit:'USD contract pricing. Local cost base limits FX exposure.'}],
    crossSectors:[5,11], crossNotes:'Skills training for garment workers (S5).',
  },
  { id:'M-04', sector:11, title:'Plastic Recycling Enterprise',
    desc:"Post-consumer plastic aggregation, processing, and resale — addressing Ghana's plastic pollution crisis.",
    fullDesc:"Ghana generates 1.1M tonnes of plastic waste annually; only 5% is formally recycled. The remainder enters waterways, drains, and is burned openly. BRIDGE structures a plastic recycling enterprise: community-level collection through informal waste picker networks (formalized with income and safety protections), aggregation and sorting centers, and processing to produce recycled plastic resin for resale to manufacturers.",
    score:75, dims:[22,19,19,15], subDims:{pp:[8,7,7],sf:[8,6,5],fe:[7,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Recycling','Environment','Employment'],
    mode:'INVEST', modeRationale:'Environmental impact enterprise. BRIDGE invests alongside Extended Producer Responsibility fund and carbon market revenue.',
    pipeline:1, irr:'10–14%', structure:'Blended Finance + Recycled Material Sales', minTicket:'$200,000', horizon:'4–6 years',
    thesis:"Extended Producer Responsibility (EPR) regulation mandates plastic producers fund recycling infrastructure — creating a steady non-market revenue stream. Recycled resin demand from manufacturers provides commercial revenue.",
    thesis2:"Carbon credits from plastic pollution prevention add $3–6/tonne additional revenue. EPR fund provides government-backed income floor. Plastic resin price is currently higher than virgin plastic in Ghana due to import costs.",
    risks:[{cat:'Collection Logistics',prob:'Medium',impact:'High',mit:'Formalised waste picker networks. District assembly partnership.'},{cat:'EPR Regulation Implementation',prob:'High',impact:'High',mit:'Multi-stakeholder advocacy. Manufacturer pre-commitment to EPR contributions.'},{cat:'Market Acceptance of Recycled Resin',prob:'Medium',impact:'Medium',mit:'Quality certification. Major manufacturer pilot contracts.'}],
    crossSectors:[1,11,6], crossNotes:'Plastic packaging for agro-processing (S6). Infrastructure for collection infrastructure (S1).',
  },
  { id:'M-05', sector:11, title:'Furniture & Woodwork Production',
    desc:'Mid-scale furniture manufacturing for the growing Ghanaian middle class and regional export.',
    fullDesc:"Ghana imports GHS 400M+ in furniture annually, primarily from China and Europe, despite having significant timber processing capacity and a rapidly growing middle class with strong home furnishing demand. BRIDGE invests in a mid-scale furniture manufacturing operation: design-led, targeting the GHS 5,000–25,000 furniture price point that is currently either imported or unavailable domestically.",
    score:72, dims:[21,18,19,14], subDims:{pp:[7,7,7],sf:[8,6,4],fe:[8,6,5],fs:[4,5,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'Kumasi', tags:['Furniture','SME','Manufacturing'],
    mode:'INVEST', modeRationale:'Manufacturing investment in import substitution. BRIDGE co-invests with experienced furniture manufacturer. BRIDGE housing projects provide captive demand.',
    pipeline:1, irr:'14–18%', structure:'Manufacturing Equity', minTicket:'$200,000', horizon:'4–6 years',
    thesis:"BRIDGE housing development projects provide a captive demand channel for furniture supply — creating Day 1 institutional revenue that de-risks the market development risk of building consumer demand.",
    thesis2:"Kumasi's timber processing tradition and skilled carpentry workforce creates a natural production location. AfCFTA provides access to 54-country export market for West African regional expansion.",
    risks:[{cat:'Design Quality',prob:'Medium',impact:'High',mit:'Design director hire from international furniture background.'},{cat:'Wood Supply Chain',prob:'Medium',impact:'High',mit:'Sustainable forestry certification. Multi-supplier strategy.'},{cat:'Competition',prob:'Medium',impact:'Medium',mit:'BRIDGE housing captive demand provides base. Quality differentiation from Chinese imports.'}],
    crossSectors:[8,11,6], crossNotes:'BRIDGE housing development captive demand (S8). Timber from forestry supply chains (S6).',
  },

  // ── SECTOR 12 · TRANSPORTATION & LOGISTICS ──
  { id:'L-01', sector:12, title:'Last-Mile Delivery Network',
    desc:'Tech-enabled last-mile delivery platform aggregating independent rider agents — e-commerce, pharma, and food delivery.',
    fullDesc:"Ghana's e-commerce and delivery sector is growing at 25%+ annually, but last-mile delivery infrastructure is fragmented, unreliable, and expensive. BRIDGE structures a last-mile delivery platform aggregating independent rider agents: GPS tracking, customer notification, proof-of-delivery, and rider wallet integration. The pharma delivery vertical (GHS 25–40/delivery vs GHS 8–12 for parcels) drives margin while the parcel volume drives fleet efficiency.",
    score:87, dims:[26,22,22,17], subDims:{pp:[9,9,8],sf:[9,8,5],fe:[9,8,5],fs:[6,6,5]},
    tier:'Core', capMin:1, capMax:4, stage:'Active', region:'Accra / Kumasi', tags:['Logistics','Platform','Last-Mile'],
    mode:'INCUBATE', modeRationale:"BRIDGE builds and operates the platform. Rider wallet integrates with BRIDGE's financial inclusion ecosystem. The pharma vertical is the margin driver.",
    pipeline:4, irr:'20–28%', structure:'Platform Revenue Share', minTicket:'$150,000', horizon:'3–5 years',
    thesis:"Platform revenue model: delivery commission (12–18%), subscription tier for businesses ($150–500/month), premium SLA contracts with pharma and hospital networks ($2,000–8,000/month). At 500 active riders and 1,200 daily deliveries, platform generates $180K/month.",
    thesis2:"The pharma vertical is the margin driver. BRIDGE's health portfolio (S3) provides captive pharma demand. Rider wallets integrate with the Market Trader Digital Wallet (S2) creating a unified BRIDGE financial services ecosystem.",
    risks:[{cat:'Rider Supply/Retention',prob:'Medium',impact:'High',mit:'Competitive earnings model. Rider income tools. Performance bonuses.'},{cat:'Accident / Liability',prob:'Medium',impact:'High',mit:'Mandatory insurance. Safety training. Accident fund.'},{cat:'Gig Economy Regulation',prob:'Low',impact:'Medium',mit:'Rider association model. Compliance-first approach.'}],
    crossSectors:[2,3,6,10], crossNotes:'Delivers cold chain produce (S6). Pharma distribution network (S3). Rider wallets connect to Financial Inclusion (S2). EV rider transition opportunity (S10).',
  },
  { id:'L-02', sector:12, title:'Cold Chain Logistics Fleet',
    desc:'Refrigerated transport fleet connecting cold storage nodes to markets and processors.',
    fullDesc:"Cold storage infrastructure solves the static storage problem — but agricultural and pharmaceutical cold chains also require refrigerated transport to connect storage nodes to markets, processing facilities, and health facilities. BRIDGE structures a cold chain logistics fleet: refrigerated trucks and motorcycles serving the BRIDGE cold storage network and pharmaceutical distribution route. Revenue from BRIDGE portfolio offtake provides initial anchor revenue.",
    score:84, dims:[25,21,21,17], subDims:{pp:[9,8,8],sf:[8,8,5],fe:[8,7,6],fs:[6,6,5]},
    tier:'Core', capMin:2, capMax:7, stage:'Seed', region:'National', tags:['Cold Chain','Transport','Fleet'],
    mode:'INVEST', modeRationale:'Asset-backed vehicle fleet. BRIDGE portfolio provides anchor offtake. Revenue expands to third-party commercial cold chain logistics.',
    pipeline:2, irr:'14–18%', structure:'Asset Finance + Revenue Share', minTicket:'$300,000', horizon:'4–6 years',
    thesis:"BRIDGE's agricultural and health portfolios create captive cold chain logistics demand — eliminating the early-stage revenue risk that kills standalone logistics businesses.",
    thesis2:"Third-party cold chain logistics margin (25–35% above ambient transport) provides commercial uplift as fleet capacity exceeds BRIDGE internal demand.",
    risks:[{cat:'Vehicle Maintenance',prob:'Medium',impact:'High',mit:'Fleet management system. Preventive maintenance schedule. Backup vehicle pool.'},{cat:'Fuel Cost Volatility',prob:'High',impact:'Medium',mit:'EV fleet transition roadmap. Fuel hedging on forward contracts.'},{cat:'Route Optimization',prob:'Low',impact:'Medium',mit:'Route optimization software. BRIDGE network density drives efficiency.'}],
    crossSectors:[3,6,12], crossNotes:'Agricultural cold chain (S6). Pharmaceutical cold chain (S3). Integrated with last-mile network (L-01).',
  },
  { id:'L-03', sector:12, title:'Port Freight Aggregation',
    desc:'SME freight aggregation at Tema Port — allowing small importers and exporters to access container shipping competitively.',
    fullDesc:"Ghana's import-export SME sector is structurally disadvantaged at Tema Port: unable to fill containers individually, they rely on expensive freight forwarders who charge 20–35% above LCL (less-than-container-load) market rates. BRIDGE structures an SME freight aggregation platform: pooling cargo across multiple SME importers/exporters to achieve FCL (full container load) pricing with major shipping lines.",
    score:79, dims:[23,20,20,16], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Concept', region:'Tema', tags:['Freight','Trade','Platform'],
    mode:'CONNECT', modeRationale:'BRIDGE aggregates SME cargo and negotiates FCL rates. Revenue from margin on freight services. No asset ownership risk.',
    pipeline:1, irr:'18–24%', structure:'Freight Margin + Platform Fee', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"Aggregation creates pricing power. BRIDGE consolidates 50–100 SME shipments per vessel, achieving FCL rates that represent 15–25% savings for each individual SME while generating 5–8% margin for BRIDGE.",
    thesis2:"AfCFTA trade expansion and government export promotion mandate (GEPA) create tailwinds. E-commerce export growth (Jumia, Tonaton) provides growing volume pipeline.",
    risks:[{cat:'Shipping Line Relationships',prob:'Medium',impact:'High',mit:'Volume commitment negotiations. Multi-line approach.'},{cat:'Cargo Volume',prob:'Medium',impact:'High',mit:'SME e-commerce exporters as primary pipeline. BRIDGE network.'},{cat:'Customs and Compliance',prob:'Medium',impact:'Medium',mit:'Customs broker partnership. GEPA compliance framework.'}],
    crossSectors:[6,11,12], crossNotes:'Agricultural export (S6). Manufacturing export (S11). Pharma export (M-01).',
  },
  { id:'L-04', sector:12, title:'EV Fleet Transition',
    desc:'Electric vehicle fleet for last-mile and urban delivery — lower operating costs and first-mover positioning.',
    fullDesc:"Ghana's urban delivery sector operates on petrol motorcycles with fuel costs representing 30–40% of rider income. Electric motorcycle conversion reduces fuel cost by 70–80%, dramatically improving rider earnings. BRIDGE structures an EV fleet transition programme: BRIDGE provides EV motorcycles at subsidized lease rates (funded by operational savings), charging infrastructure at strategic urban points, and battery swap stations for commercial riders.",
    score:71, dims:[21,18,19,13], subDims:{pp:[7,7,7],sf:[8,6,3],fe:[8,7,4],fs:[4,4,5]},
    tier:'Emerging', capMin:2, capMax:8, stage:'Concept', region:'Accra', tags:['EV','Transport','CleanTech'],
    mode:'INVEST', modeRationale:'Asset-backed EV fleet with BRIDGE delivery network as anchor. Green finance available at concessional rates.',
    pipeline:1, irr:'12–16%', structure:'Asset Finance + Lease Revenue', minTicket:'$300,000', horizon:'5–7 years',
    thesis:"EV operating cost savings (GHS 800–1,200/month vs petrol) create willingness-to-pay for BRIDGE lease at GHS 400–600/month while improving rider net income. The economics are compelling independently of environmental benefits.",
    thesis2:"Green finance availability (FMO, IFC, Climate Investor One) provides concessional capital rates that improve returns. Carbon credit revenue from transport emissions reduction adds supplementary income.",
    risks:[{cat:'EV Technology Reliability',prob:'Medium',impact:'High',mit:'Proven manufacturers. Warranty agreements. Battery swap backup.'},{cat:'Charging Infrastructure',prob:'Medium',impact:'High',mit:'BRIDGE-managed charging points co-located with delivery hubs.'},{cat:'Ghana Grid Reliability',prob:'Medium',impact:'Medium',mit:'Solar charging integration at hub points.'}],
    crossSectors:[10,12], crossNotes:'Solar energy for charging (S10). Integration with last-mile network (L-01).',
  },
  { id:'L-05', sector:12, title:'Trade Finance Platform',
    desc:'Digital trade finance for SME importers and exporters — letters of credit, invoice financing, and FX hedging.',
    fullDesc:"Ghana's SME import-export sector faces severe trade finance gaps: letters of credit are expensive and slow (2–4 weeks), invoice financing is inaccessible, and FX hedging is available only to large corporates. BRIDGE builds a digital trade finance platform: technology-mediated LC issuance (48-hour processing), invoice financing against verified export documentation, and FX forward contracts at rates previously reserved for institutional clients.",
    score:76, dims:[23,19,19,15], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[7,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:1, capMax:5, stage:'Seed', region:'National', tags:['TradeFinance','FinTech','Export'],
    mode:'INVEST', modeRationale:'FinTech investment in trade finance infrastructure. Bank partnership for LC issuance. BRIDGE provides technology and credit assessment.',
    pipeline:2, irr:'16–20%', structure:'Revenue Share + Lending Margin', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"Trade finance is a $1.5T global gap market. In Ghana, the addressable gap is $800M+. Digital technology allows credit assessment and LC processing at a fraction of traditional bank cost — enabling service to SMEs that banks currently cannot serve profitably.",
    thesis2:"Revenue: LC fee (1.5–2.5% of transaction value), invoice financing interest (18–24% annualized), FX spread (0.5–1%). At $10M monthly trade volume: $150–250K monthly revenue.",
    risks:[{cat:'Credit Risk',prob:'Medium',impact:'High',mit:'Trade document verification. Buyer credit check. Conservative LTV.'},{cat:'Bank Partner Commitment',prob:'Medium',impact:'High',mit:'3 bank partner LOIs secured. Phased deployment.'},{cat:'FX Market Volatility',prob:'High',impact:'Medium',mit:'Conservative hedging limits. Client FX risk education.'}],
    crossSectors:[2,6,12], crossNotes:'Financial inclusion infrastructure (S2). Agricultural export finance (S6). Port freight aggregation (L-03).',
  },
  // ── SECTOR 1 · INFRASTRUCTURE (additional) ──
  { id:'I-06', sector:1, title:'Rural Electrification Grid Extensions',
    desc:'Final-mile grid extensions to communities within 5km of existing lines — partnership with ECG and Rural Electrification Fund.',
    fullDesc:"The Rural Electrification Fund has allocated GHS 800M+ for grid extension, but project execution capacity is the bottleneck. Communities within 5km of existing distribution lines can be connected at GHS 3,000–8,000 per household through standard LV extension — but REDF lacks the contractor coordination capacity to deploy at pace. BRIDGE structures project management vehicles that deploy REDF and ECG capital efficiently, earning a programme management fee on every connection delivered.",
    score:76, dims:[23,19,20,14], subDims:{pp:[9,8,6],sf:[8,7,4],fe:[8,7,5],fs:[5,4,5]},
    tier:'Emerging', capMin:1, capMax:5, stage:'Concept', region:'Northern Regions', tags:['Electricity','Grid','Rural'],
    mode:'CONNECT', modeRationale:'BRIDGE connects REDF, ECG, and local contractors. Programme management fee. No infrastructure capital at risk.',
    pipeline:1, irr:'10–14%', structure:'Programme Management Fee', minTicket:'$75,000', horizon:'3–5 years',
    thesis:"Government capital is allocated and waiting. BRIDGE provides the project execution capacity that converts allocated budgets into live connections. Fee income earned against government payments — creditworthy counterparty with zero commercial risk.",
    thesis2:"Rural electrification unlocks productive use across BRIDGE portfolio — cold storage (S6), agri-processing (S6), and manufacturing (S11) ventures all benefit directly from the grid extension BRIDGE facilitates.",
    risks:[{cat:'REDF Disbursement Delays',prob:'High',impact:'High',mit:'Multi-year programme structure. Milestone-based payment design.'},{cat:'Contractor Quality',prob:'Medium',impact:'High',mit:'Pre-qualified contractor list. QA inspections at completion.'},{cat:'Community Land Rights',prob:'Medium',impact:'Medium',mit:'District Assembly co-facilitation. Community consent protocols.'}],
    crossSectors:[10,6,11], crossNotes:'Enables solar hybrid installations (S10). Agricultural electrification (S6). Manufacturing power access (S11).',
  },
  { id:'I-07', sector:1, title:'Public Market Infrastructure Upgrade',
    desc:"Structured renovation of Ghana's 250+ district markets — stalls, drainage, cold storage, digital payment infrastructure.",
    fullDesc:"Ghana's 250+ government-owned district markets are critical economic infrastructure for 4M+ informal traders but are chronically underfunded. Poor drainage, inadequate stalls, zero cold storage, no digital payments — each gap reduces trader productivity and health outcomes. BRIDGE structures a PPP upgrade programme: BRIDGE capital upgrades market physical and digital infrastructure; revenue recovery through stall leasing fees, digital services, and market logistics. Integrated with Market Trader Wallet (F-01) as the distribution channel.",
    score:80, dims:[24,20,21,15], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[9,7,4],fs:[5,5,5]},
    tier:'Core', capMin:2, capMax:8, stage:'Concept', region:'National', tags:['Markets','Infrastructure','PPP'],
    mode:'CONNECT', modeRationale:'BRIDGE connects MLGDRD, district assemblies, and private capital. PPP concession structure. Revenue from market services and stall fees.',
    pipeline:1, irr:'12–16%', structure:'PPP Concession', minTicket:'$300,000', horizon:'5–10 years',
    thesis:"Market upgrade generates measurable productivity gains — documented 15–25% increase in trader turnover in comparable programmes. The upgrade is also the physical distribution infrastructure for BRIDGE's Market Trader Wallet, making two strategic investments converge.",
    thesis2:"Self-sustaining after Year 3 through stall fees and digital services. District assembly partnership provides political backing and site security. MLGDRD national programme endorsement reduces local political risk.",
    risks:[{cat:'District Assembly Commitment',prob:'Medium',impact:'High',mit:'MLGDRD national programme endorsement.'},{cat:'Fee Recovery',prob:'Medium',impact:'High',mit:'Phased fee introduction. Community market committee governance.'},{cat:'Construction Disruption',prob:'Medium',impact:'Medium',mit:'Phased upgrade while market remains operational.'}],
    crossSectors:[1,2,6], crossNotes:'Market Trader Wallet distribution (S2). Agricultural market access (S6). Cold storage integration (S6).',
  },
  { id:'I-08', sector:1, title:'Urban Drainage & Flood Mitigation',
    desc:'Climate-resilient urban drainage infrastructure for Accra and Kumasi — PPP model with MMDA framework agreements.',
    fullDesc:"Accra floods annually, causing deaths, property destruction, and economic losses estimated at GHS 2B+ per event. The root cause is a combination of inadequate drainage infrastructure and blocked waterways. BRIDGE structures urban drainage improvement projects under MMDA framework agreements: private capital designs, builds, and maintains drainage infrastructure; revenue recovery through MMDA service payments and flood insurance premium reduction savings pooled across the city.",
    score:73, dims:[22,18,19,14], subDims:{pp:[8,8,6],sf:[8,6,4],fe:[7,7,5],fs:[5,4,5]},
    tier:'Emerging', capMin:3, capMax:10, stage:'Concept', region:'Greater Accra', tags:['Climate','Urban','Infrastructure'],
    mode:'INVEST', modeRationale:'Patient infrastructure capital with long-duration government payment agreement. IDA and AfDB climate adaptation co-financing available.',
    pipeline:1, irr:'8–12%', structure:'Availability Payment PPP', minTicket:'$500,000', horizon:'10–15 years',
    thesis:"Climate adaptation infrastructure is the fastest-growing category of development finance globally. Ghana's climate vulnerability and government commitment create a ready policy environment. Multilateral co-financing significantly improves BRIDGE returns.",
    thesis2:"World Bank IDA and AfDB Urban Climate Resilience programmes have active Ghana pipelines. BRIDGE positions as the private sector co-investor and implementation partner they need.",
    risks:[{cat:'MMDA Payment Risk',prob:'Medium',impact:'High',mit:'Multilateral guarantee backstop. Central government MMDA payment support structure.'},{cat:'Engineering Complexity',prob:'Medium',impact:'High',mit:'International drainage engineering partner. Detailed site assessment before commitment.'},{cat:'Climate Variability',prob:'Medium',impact:'Medium',mit:'Climate-resistant design standards. 50-year infrastructure specification.'}],
    crossSectors:[1,3,6], crossNotes:'Health outcomes from flood prevention (S3). Agricultural land protection (S6).',
  },
  { id:'I-09', sector:1, title:'Industrial Zone Development',
    desc:'Light industrial park development for export-oriented manufacturers — serviced plots, shared utilities, logistics connectivity.',
    fullDesc:"Ghana's manufacturing sector is held back by the cost and difficulty of setting up industrial facilities: land title uncertainty, unreliable power, inadequate water supply, poor road connections. BRIDGE structures a light industrial zone — 50–100 serviced plots for light manufacturers and agro-processors — with reliable solar-hybrid power, water treatment, broadband, and logistics connectivity. Modelled on Tema Free Zones but targeting domestic and regional market manufacturers, not just export.",
    score:77, dims:[23,19,20,15], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:5, capMax:15, stage:'Concept', region:'Accra / Tema', tags:['Industrial','Manufacturing','Zone'],
    mode:'INVEST', modeRationale:'Long-duration real estate and infrastructure investment. BRIDGE invests in zone infrastructure. Revenue from plot leasing and utility services.',
    pipeline:1, irr:'12–16%', structure:'Infrastructure Equity + Lease Revenue', minTicket:'$1,000,000', horizon:'8–12 years',
    thesis:"Serviced industrial land in Ghana commands GHS 80–150/sqm/year lease premium over unserviced land. At 80% occupancy across 100 plots, the zone generates GHS 20–35M annual lease income. Reliable power adds further premium.",
    thesis2:"Ghana Investment Promotion Centre (GIPC) and government industrial policy create a ready co-investment framework. AfCFTA positioning makes Ghana an attractive manufacturing hub for regional market access.",
    risks:[{cat:'Occupancy Rate',prob:'Medium',impact:'High',mit:'Pre-commitment from 20+ anchor tenants before development.'},{cat:'Land Acquisition',prob:'Medium',impact:'High',mit:'GIPC-designated industrial land. Government co-facilitation.'},{cat:'Utility Reliability',prob:'Low',impact:'High',mit:'Solar-hybrid power. Dedicated water treatment. Redundant connectivity.'}],
    crossSectors:[11,12,10], crossNotes:'Manufacturing sector tenants (S11). Logistics hub integration (S12). Renewable energy infrastructure (S10).',
  },
  { id:'I-10', sector:1, title:'Nationwide Fibre Backbone Expansion',
    desc:'Dark fibre backbone connecting underserved regions — wholesale capacity for ISPs, government, and enterprise clients.',
    fullDesc:"Ghana's fibre backbone is concentrated in Accra-Kumasi-Takoradi corridor, leaving Northern, Volta, and Brong-Ahafo regions with expensive, unreliable broadband. BRIDGE structures a dark fibre expansion — 2,000km of new backbone connecting regional capitals and district centers — leased wholesale to ISPs, telecoms, and government. The infrastructure investment is capital-intensive but generates 20+ year stable cash flows from wholesale capacity agreements.",
    score:71, dims:[21,18,19,13], subDims:{pp:[7,7,7],sf:[8,6,3],fe:[8,6,5],fs:[4,5,4]},
    tier:'Emerging', capMin:10, capMax:30, stage:'Concept', region:'National', tags:['Telecoms','Fibre','Connectivity'],
    mode:'INVEST', modeRationale:'Long-duration infrastructure fund investment. BRIDGE co-invests with infrastructure fund. Wholesale capacity agreements provide revenue certainty.',
    pipeline:1, irr:'10–14%', structure:'Infrastructure Fund + IRU Agreements', minTicket:'$1,000,000', horizon:'15–20 years',
    thesis:"Digital infrastructure is the enabling layer for every other sector. Northern Ghana fibre expansion enables agricultural data platforms (S4), remote healthcare (S3), and e-government (S4) at the regional scale BRIDGE needs for full portfolio impact.",
    thesis2:"Universal Service Fund contributions (GHS 150M+ annually) provide government co-funding rationale. NCA broadband mandate creates regulatory tailwinds. Wholesale IRU agreements with MTN, Vodafone, and government provide anchor revenue.",
    risks:[{cat:'Capital Intensity',prob:'Low',impact:'High',mit:'Infrastructure fund co-investor. IRU pre-commitments before deployment.'},{cat:'Technology Obsolescence',prob:'Low',impact:'Medium',mit:'Fibre has 30+ year asset life. Technology-agnostic infrastructure.'},{cat:'ROW Permitting',prob:'Medium',impact:'High',mit:'NCA fast-track permitting for national broadband projects.'}],
    crossSectors:[4,3,10], crossNotes:'Digital services infrastructure (S4). Telemedicine connectivity (S3). Smart grid communications (S10).',
  },

  // ── SECTOR 2 · FINANCIAL INCLUSION (additional) ──
  { id:'F-08', sector:2, title:'Pension & Retirement Products',
    desc:'Accessible pension products for informal sector workers — mobile-first, flexible contributions, regulated by NPRA.',
    fullDesc:"Only 12% of Ghana's workforce participates in formal pension arrangements. The 88% in the informal sector have no retirement savings mechanism — not from lack of willingness, but from lack of accessible, trusted product. BRIDGE structures a mobile-first pension product for informal workers: GHS 5–50/week contribution via MoMo, managed under NPRA-regulated trust, invested in government securities and BRIDGE-curated impact investments. The product converts weekly savings into long-term retirement security.",
    score:82, dims:[25,20,21,16], subDims:{pp:[9,8,8],sf:[8,7,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Concept', region:'National', tags:['Pension','Retirement','Informal'],
    mode:'CONNECT', modeRationale:'BRIDGE structures the product and distribution. NPRA-licensed trust partner manages the fund. MoMo rails provide collection. Revenue from AUM management fee.',
    pipeline:1, irr:'16–20%', structure:'AUM Management Fee', minTicket:'$200,000', horizon:'5–10 years',
    thesis:"Pension AUM compounds: a product with 100,000 members contributing GHS 20/week accumulates GHS 100M+ in 5 years. Management fee (1–1.5% of AUM) generates GHS 1–1.5M annually and grows with the AUM. The product is patient capital in the best sense.",
    thesis2:"NPRA regulatory support for informal sector pension products is strong policy priority. ILO and international social protection funds provide technical assistance and seed capital at low cost.",
    risks:[{cat:'Trust and Withdrawal Fears',prob:'High',impact:'High',mit:'Regulatory oversight transparency. Partial liquidity access for emergencies.'},{cat:'Contribution Consistency',prob:'Medium',impact:'Medium',mit:'Flexible contribution model. No penalty for missed weeks.'},{cat:'Investment Returns',prob:'Medium',impact:'Medium',mit:'Conservative investment mandate. Government securities as primary asset.'}],
    crossSectors:[2,5,6], crossNotes:'Pension savings for market traders (S2). Agricultural worker retirement (S6). Education funding (S5).',
  },
  { id:'F-09', sector:2, title:'AgriFinance Input Credit Facility',
    desc:'Seasonal input credit for smallholder farmers — seeds, fertilizer, agrochemicals — repaid at harvest.',
    fullDesc:"Ghana's smallholder farmers lose 20–35% of potential yield annually because they cannot afford quality inputs at planting time. The solution is simple — credit calibrated to the agricultural season — but formal banks do not offer it. BRIDGE structures a seasonal input credit facility: GHS 500–3,000 per farmer at planting, repaid from harvest proceeds through cooperative deductions. Input suppliers provide discounted bulk pricing; cooperatives provide deduction-at-source repayment enforcement.",
    score:85, dims:[25,22,21,17], subDims:{pp:[9,9,7],sf:[9,8,5],fe:[8,7,6],fs:[6,6,5]},
    tier:'Core', capMin:2, capMax:5, stage:'Seed', region:'National', tags:['AgriFinance','Input','Credit'],
    mode:'INVEST', modeRationale:'Lending facility with cooperative deduction enforcement. BRIDGE provides first-loss layer. Commercial bank or MFI originates. Agri-insurance wraps the portfolio.',
    pipeline:2, irr:'14–18%', structure:'First-Loss Credit Facility', minTicket:'$300,000', horizon:'3–5 years',
    thesis:"Input credit at the cooperative level has 90%+ repayment rates in comparable Ghana programmes (USAID FTF data). Deduction-at-source from cooperative sales eliminates the collection infrastructure challenge that defeats individual farmer lending.",
    thesis2:"Parametric crop insurance (against drought or flood) wraps the portfolio — when a climate event triggers a payout, it covers the credit facility losses. The blended structure de-risks at every layer.",
    risks:[{cat:'Climate / Crop Failure',prob:'High',impact:'High',mit:'Parametric crop insurance mandatory for all borrowers.'},{cat:'Input Price Inflation',prob:'Medium',impact:'Medium',mit:'Forward purchasing from input suppliers. Bulk discount agreements.'},{cat:'Cooperative Default',prob:'Low',impact:'High',mit:'Cooperative governance requirements before credit eligibility.'}],
    crossSectors:[2,6], crossNotes:'Cooperative network (S6). Market Trader Wallet credit methodology (F-01).  Agricultural value chain (S6).',
  },
  { id:'F-10', sector:2, title:'Remittance Investment Products',
    desc:'Structured investment products converting diaspora remittances into long-term Ghana development capital.',
    fullDesc:"Ghana receives $4.6B in annual diaspora remittances, almost entirely flowing to consumption. The barrier to investment conversion is product design: there is no accessible, $500–5,000 minimum investment product that converts a regular remittance habit into a structured savings or investment instrument. BRIDGE designs a remittance-linked savings bond — monthly remittance triggers automatic purchase of a Ghana development bond earning 12–15% per annum in cedi terms, managed via a diaspora mobile app.",
    score:81, dims:[24,20,21,16], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Remittance','Diaspora','Investment'],
    mode:'CONNECT', modeRationale:'BRIDGE connects diaspora investors, mobile money rails, and government securities market. Product design and distribution role. Revenue from product management fee.',
    pipeline:1, irr:'18–22%', structure:'Management Fee + Distribution', minTicket:'$50,000', horizon:'3–5 years',
    thesis:"The $4.6B remittance flow is the most reliable capital pipeline into Ghana. Capturing even 3–5% ($140–230M) into structured investment products would represent transformative capital mobilization — larger than many IDA programmes.",
    thesis2:"Partnership with Western Union, WorldRemit, and Remitly creates distribution at point of send — diaspora can redirect a portion of any remittance to investment without changing their existing money transfer habit.",
    risks:[{cat:'Diaspora Trust',prob:'Medium',impact:'High',mit:'SEC-registered product. Third-party custodian. Annual audit publication.'},{cat:'FX Returns',prob:'High',impact:'High',mit:'USD-referenced return structures where possible. FX risk disclosure.'},{cat:'Product Adoption',prob:'Medium',impact:'High',mit:'Pilot with 1,000 active remitters. Partnership marketing through diaspora associations.'}],
    crossSectors:[2,8,9], crossNotes:'Investment flows into housing (S8). Tourism investment (S9). Development bonds fund infrastructure (S1).',
  },
  { id:'F-11', sector:2, title:'BNPL for SME Equipment',
    desc:'Buy-now-pay-later for business equipment purchases — connecting SMEs to suppliers with embedded finance.',
    fullDesc:"Ghana's SMEs routinely defer critical equipment purchases because upfront capital is unavailable. A GHS 5,000 POS terminal, GHS 15,000 refrigerator, or GHS 40,000 generator that would pay back in 18 months sits out of reach when the whole amount is required on day one. BRIDGE structures a B2B BNPL facility embedded at point of sale with equipment suppliers — SME purchases the equipment, BRIDGE underwrites 6–24 month repayment via MoMo, supplier receives payment immediately.",
    score:79, dims:[23,19,21,16], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[9,7,5],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Concept', region:'National', tags:['BNPL','SME','FinTech'],
    mode:'INVEST', modeRationale:'Lending product with supplier-embedded distribution. BRIDGE provides the capital facility and credit assessment. Supplier provides customer pipeline at zero CAC.',
    pipeline:1, irr:'20–26%', structure:'Lending Margin', minTicket:'$200,000', horizon:'2–4 years',
    thesis:"Supplier-embedded BNPL has near-zero customer acquisition cost — the supplier sells the equipment and BRIDGE provides finance at the moment of purchase decision. CAC is essentially zero; the conversion rate is the purchase rate.",
    thesis2:"GRA digital receipt mandate (2026) creates massive demand for POS equipment among previously informal SMEs — creating a surge of first-time equipment purchasers who need finance at the moment of compliance.",
    risks:[{cat:'Default Rate',prob:'Medium',impact:'High',mit:'BRIDGE Credit Score integration. Progressive credit limits.'},{cat:'Supplier Network',prob:'Medium',impact:'Medium',mit:'Priority supplier partnerships: equipment distributors, generators, refrigeration.'},{cat:'BoG Regulation',prob:'Low',impact:'Medium',mit:'Structure as purchase finance, not consumer credit. Legal review.'}],
    crossSectors:[2,4,11], crossNotes:'SME ERP integration (S4). Manufacturing equipment (S11). Market infrastructure (S1).',
  },
  { id:'F-12', sector:2, title:'Parish-Level Savings Mobilization',
    desc:'Faith community savings infrastructure — church and mosque-based savings groups with formal financial linkage.',
    fullDesc:"Ghana's 15,000+ churches and 3,000+ mosques each represent dense networks of regular financial contributors with existing trust infrastructure. Faith communities collect GHS 500M+ weekly in tithes and offerings — demonstrating that savings behaviour and payment discipline exist. BRIDGE structures a faith community savings product: congregation-level group savings accounts, mobile collection via MoMo, formal linkage to banks, and graduated credit access for congregation members.",
    score:75, dims:[22,19,20,14], subDims:{pp:[8,8,6],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Savings','Community','FinTech'],
    mode:'CONNECT', modeRationale:'BRIDGE connects faith communities, MoMo platforms, and banks. Distribution through denomination networks. Revenue from savings float and credit origination.',
    pipeline:1, irr:'14–18%', structure:'Revenue Share + Origination Fee', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"Faith communities are the most trusted savings mobilization channel in Ghana. Trust is pre-established; BRIDGE provides the formal financial rails. Denomination-level partnerships provide mass distribution at zero marketing cost.",
    thesis2:"10,000 congregations at GHS 500/week average savings = GHS 5M/week in new formal savings mobilization. Float income and graduated credit products generate the commercial return.",
    risks:[{cat:'Denomination Leadership Buy-in',prob:'Medium',impact:'High',mit:'Pilot with 3 denominations. Revenue-sharing model creates incentive.'},{cat:'Financial Literacy',prob:'Medium',impact:'Medium',mit:'Financial literacy as part of the faith community partnership programme.'},{cat:'BoG Deposit-Taking Regulations',prob:'Medium',impact:'High',mit:'Structure as bank agency model, not direct deposit-taking.'}],
    crossSectors:[2,5], crossNotes:'Financial literacy education linkage (S5). Susu Platform parallel model (F-04).',
  },
  // ── SECTOR 3 · HEALTH SYSTEMS (additional) ──
  { id:'H-06', sector:3, title:'Telemedicine Platform',
    desc:'Asynchronous and live telemedicine connecting patients in rural Ghana to specialists in Accra and Kumasi.',
    fullDesc:"Ghana has fewer than 4,000 doctors for 33M people — a ratio of 1:8,250 vs WHO recommended 1:1,000. The geographic concentration is severe: 60%+ of doctors work in Greater Accra and Ashanti regions. Telemedicine is the scalable lever. BRIDGE invests in a platform supporting both synchronous video consultations and asynchronous case review — enabling rural health workers to escalate complex cases to specialist physicians without patient transfer.",
    score:83, dims:[25,21,21,16], subDims:{pp:[9,8,8],sf:[9,7,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Seed', region:'National', tags:['Telemedicine','HealthTech','Rural'],
    mode:'INVEST', modeRationale:'Platform investment with NHIS and government SLA revenue. BRIDGE co-invests with operator. Diaspora physician network provides clinical supply.',
    pipeline:2, irr:'16–20%', structure:'Equity + Government SLA', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"15,000+ Ghanaian physicians work abroad. A curated diaspora physician panel provides the specialist supply side at zero recruitment cost — diaspora doctors are willing to provide 2–4 hours/week of teleconsultations as a mission-aligned contribution.",
    thesis2:"NHIS reimbursement for telemedicine consultations is under active policy development. First platform with NHIS certification captures the institutional revenue stream that makes unit economics work at scale.",
    risks:[{cat:'Rural Connectivity',prob:'High',impact:'High',mit:'Asynchronous-first design. Store-and-forward for low bandwidth.'},{cat:'Clinical Liability',prob:'Medium',impact:'High',mit:'Clear scope-of-practice protocols. Malpractice insurance. GHS endorsement.'},{cat:'NHIS Reimbursement Delay',prob:'Medium',impact:'High',mit:'Private pay bridge revenue. Corporate health scheme partnerships.'}],
    crossSectors:[3,4,12], crossNotes:'CHW Platform integration (H-01). Technology stack (S4). Medicine delivery logistics (S12).',
  },
  { id:'H-07', sector:3, title:'Mental Health Service Network',
    desc:'Accessible community mental health services — counselling, peer support, and digital tools for Ghana\'s underserved mental health gap.',
    fullDesc:"Ghana has fewer than 40 psychiatrists for 33M people. Mental health conditions affect an estimated 2.5M Ghanaians but receive less than 1% of the health budget. BRIDGE structures a community mental health network: trained lay counsellors supervised by psychiatrists via telemedicine, digital self-help tools, employer mental health programmes, and integration with NHIS for depression and anxiety treatment coverage.",
    score:78, dims:[23,20,20,15], subDims:{pp:[9,8,6],sf:[8,7,5],fe:[8,6,5],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Mental Health','Community','HealthTech'],
    mode:'INVEST', modeRationale:'Social impact investment. BRIDGE invests with impact-first capital. Corporate employer contracts provide commercial revenue base.',
    pipeline:1, irr:'12–16%', structure:'Blended Finance + Corporate Contracts', minTicket:'$150,000', horizon:'4–6 years',
    thesis:"Corporate mental health programmes are a rapidly growing employer benefit in Ghana's formal sector — banks, telcos, and multinationals pay GHS 200–500/employee/year for access. Corporate contracts provide the commercial anchor; community services provide the impact.",
    thesis2:"Global Fund and WHO mental health co-financing available under the Mental Health Gap Action Programme (mhGAP). Donor revenue supplements corporate revenue in early years.",
    risks:[{cat:'Stigma',prob:'High',impact:'Medium',mit:'Community engagement and destigmatisation as core programme component.'},{cat:'Counsellor Quality',prob:'Medium',impact:'High',mit:'Rigorous training programme. Psychiatric supervision protocol.'},{cat:'Revenue Mix',prob:'Medium',impact:'Medium',mit:'Multi-payer design: corporate, NHIS, donor, individual pay.'}],
    crossSectors:[3,5,7], crossNotes:'Workplace wellness (S5). Sports psychology for academy athletes (S7).',
  },
  { id:'H-08', sector:3, title:'Diagnostic Lab Network',
    desc:'Standardized community diagnostic laboratories with point-of-care testing and digital result delivery.',
    fullDesc:"Diagnostic capacity in Ghana's community and district health system is severely limited — the majority of community health centres have no laboratory capability beyond basic malaria RDTs. BRIDGE invests in a standardized diagnostic laboratory network: 50-site rollout of community labs with point-of-care testing for malaria, TB, HIV, typhoid, and common blood parameters. Results delivered digitally to the requesting health worker within 2 hours.",
    score:80, dims:[24,20,21,15], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[9,7,5],fs:[5,5,5]},
    tier:'Core', capMin:2, capMax:6, stage:'Concept', region:'Northern Regions', tags:['Diagnostics','Lab','HealthTech'],
    mode:'INVEST', modeRationale:'Diagnostic infrastructure investment with government and NHIS revenue. BRIDGE co-invests alongside Novartis Access and Clinton Health Access Initiative.',
    pipeline:1, irr:'12–16%', structure:'Blended Finance + NHIS Revenue', minTicket:'$300,000', horizon:'5–7 years',
    thesis:"NHIS reimburses for diagnostic tests — each lab generates GHS 3,000–8,000/month in NHIS reimbursements at full utilization. At 50 sites, the network generates GHS 150–400K/month in institutional revenue.",
    thesis2:"GHS partnership for facility co-location reduces site setup costs by 40%. CHAI and Novartis Access provide subsidized reagent pricing that makes community lab economics viable.",
    risks:[{cat:'NHIS Claims Processing',prob:'High',impact:'High',mit:'Claims float management. Bank credit line for receivables.'},{cat:'Lab Technician Supply',prob:'Medium',impact:'High',mit:'Training partnership with UG School of Allied Health.'},{cat:'Reagent Supply Chain',prob:'Medium',impact:'High',mit:'CHAI partnership for centralized procurement.'}],
    crossSectors:[3,12], crossNotes:'Sample transport logistics (S12). CHW Platform integration (H-01).',
  },
  { id:'H-09', sector:3, title:'Maternal & Newborn Care Programme',
    desc:'Integrated maternal health programme targeting Ghana\'s 319/100,000 maternal mortality rate — facility upgrades, community outreach, digital tracking.',
    fullDesc:"Ghana's maternal mortality rate of 319 per 100,000 live births is 8x the global average and stubbornly resistant to improvement despite policy intent. The causes are known: late presentation at facility, inadequate facility capacity, poor postnatal follow-up. BRIDGE structures an integrated programme: facility-level upgrade of obstetric care capacity, community midwife deployment, and a digital pregnancy tracking tool for antenatal visit reminders and complication alerts.",
    score:86, dims:[26,22,22,16], subDims:{pp:[10,9,7],sf:[9,8,5],fe:[9,7,6],fs:[5,6,5]},
    tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'Northern Regions', tags:['Maternal','Newborn','Impact'],
    mode:'INVEST', modeRationale:'High-impact health investment. BRIDGE invests alongside UNICEF, WHO, and UNFPA programmes. Government CHPS expansion provides co-financing.',
    pipeline:2, irr:'10–14%', structure:'Blended Finance + GHS Contract', minTicket:'$250,000', horizon:'5–7 years',
    thesis:"Maternal health is the highest-conviction impact investment in Ghana's health sector. Donor co-financing is abundant; the problem is private capital willing to structure the delivery vehicle. BRIDGE provides the structuring and execution capacity that converts donor intent into outcomes.",
    thesis2:"UNFPA, UNICEF, and WHO combined maternal health spending in Ghana exceeds $30M annually. BRIDGE positions as the private sector delivery partner that can co-invest and execute at district scale.",
    risks:[{cat:'Community Uptake',prob:'Medium',impact:'High',mit:'Community health volunteer engagement. Traditional birth attendant integration.'},{cat:'Facility Staffing',prob:'High',impact:'High',mit:'GHS staff posting advocacy. Diaspora midwife return programme.'},{cat:'Sustainability',prob:'Medium',impact:'Medium',mit:'GHS integration into national CHPS programme after proof of concept.'}],
    crossSectors:[2,3,5], crossNotes:'Health insurance for maternal care (S2). Community health worker platform (H-01). Health education (S5).',
  },
  { id:'H-10', sector:3, title:'Hospital Management Services',
    desc:'Professional management and operational improvement for district and regional hospitals — efficiency, quality, revenue optimization.',
    fullDesc:"Ghana's 23 regional hospitals and 110+ district hospitals are chronically underperforming their capacity. The problem is not primarily resource — it is management: poor procurement, inadequate maintenance, weak revenue collection from NHIS, and absent performance systems. BRIDGE deploys professional hospital management teams on 3–5 year management contracts — improving NHIS collections by 30–50%, reducing procurement costs 15–25%, and measurably improving clinical quality indicators.",
    score:77, dims:[23,19,20,15], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Hospital','Management','B2G'],
    mode:'ADVISE', modeRationale:'BRIDGE provides management team under GHS contract. Revenue from management fee plus performance incentive tied to financial improvement.',
    pipeline:1, irr:'16–20%', structure:'Management Contract + Performance Fee', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"Hospital management contracts are a proven model in East Africa (AAR, Pathfinder) generating 15–20% management fee revenue on hospital operating budgets. Ghana's hospital operating budgets are GHS 5–25M per facility — management fees represent significant revenue.",
    thesis2:"Performance incentive structure aligns BRIDGE revenue with hospital improvement: BRIDGE earns additional fee only when NHIS collections and quality scores improve. Self-financing model from improved performance.",
    risks:[{cat:'GHS Resistance',prob:'Medium',impact:'High',mit:'Pilot with one regional hospital. Track record before national scale.'},{cat:'Staff Industrial Action',prob:'Medium',impact:'High',mit:'Labour relations as core management competency.'},{cat:'Performance Measurement',prob:'Low',impact:'Medium',mit:'Clear KPI framework. Independent quarterly assessment.'}],
    crossSectors:[3,4], crossNotes:'Health data analytics integration (H-04). Digital health systems (S4).',
  },

  // ── SECTOR 4 · TECHNOLOGY & INNOVATION (additional) ──
  { id:'T-06', sector:4, title:'AI for Agriculture Decision Platform',
    desc:'Machine learning crop advisory, price forecasting, and risk models for Ghana\'s agri-value chain participants.',
    fullDesc:"Ghana's agricultural sector generates enormous data — weather, satellite imagery, market prices, mobile money transactions, credit performance — but almost none of it is being used to make better decisions. BRIDGE invests in an AI platform that ingests these data streams and produces actionable intelligence: crop disease early warnings, optimal harvest timing, price forecasts for the next 8 weeks, and climate risk scores for insurance underwriting. The platform serves farmers, cooperatives, agro-dealers, and insurers.",
    score:81, dims:[24,21,20,16], subDims:{pp:[9,8,7],sf:[8,8,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Concept', region:'National', tags:['AI','AgriTech','Data'],
    mode:'INCUBATE', modeRationale:'BRIDGE incubates the AI platform using proprietary data from portfolio companies. Data moat is the competitive advantage.',
    pipeline:1, irr:'18–24%', structure:'SaaS + Data Licensing', minTicket:'$150,000', horizon:'3–5 years',
    thesis:"BRIDGE's agricultural portfolio generates the proprietary data set that trains the models. The data moat compounds as more portfolio companies contribute data — the AI becomes more accurate as the network grows.",
    thesis2:"B2B licensing to insurance companies, agro-dealers, and government agencies provides institutional revenue independent of farmer subscription. Insurance underwriting data alone is worth $200–400K annually to crop insurers.",
    risks:[{cat:'Data Quality',prob:'Medium',impact:'High',mit:'Ground truth validation programme. Cooperative data partnerships.'},{cat:'Model Accuracy',prob:'Medium',impact:'High',mit:'Transparent confidence intervals. Human agronomist review of high-stakes recommendations.'},{cat:'Farmer Trust in AI',prob:'Medium',impact:'Medium',mit:'Agronomist-branded delivery. Results track record before AI attribution.'}],
    crossSectors:[4,6,2], crossNotes:'AgriTech Data Platform synergy (T-02). Smallholder Aggregation (A-02). Crop insurance underwriting (F-09).',
  },
  { id:'T-07', sector:4, title:'EdTech Learning Platform',
    desc:'Adaptive digital learning for Ghana\'s primary and secondary students — curriculum-aligned, offline-capable, teacher-assisted.',
    fullDesc:"Ghana's education system has strong curriculum standards but severe delivery gaps: teacher absenteeism at 20–30% in rural schools, limited learning materials, and no adaptive feedback loop for struggling students. BRIDGE invests in a curriculum-aligned digital learning platform: tablet and smartphone-based, offline-capable, with adaptive question sets that identify and address learning gaps. The platform integrates with teacher workflows — not replacing teachers but amplifying their effectiveness.",
    score:80, dims:[24,20,21,15], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[8,7,6],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:4, stage:'Seed', region:'National', tags:['EdTech','Learning','Platform'],
    mode:'INVEST', modeRationale:'Platform investment with GES and school subscription revenue. BRIDGE co-invests with operator. Government curriculum endorsement creates institutional distribution.',
    pipeline:2, irr:'16–20%', structure:'Equity + SaaS', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"GES endorsement is the distribution shortcut — one Ministry approval unlocks access to 15,000+ basic schools. GES has an active EdTech endorsement programme under the T-TEL initiative.",
    thesis2:"School subscription (GHS 5–15/student/year), GES SaaS fee, and corporate CSR education programme revenue create three independent revenue streams. Diaspora education giving channel adds philanthropic co-financing.",
    risks:[{cat:'Device Access',prob:'High',impact:'Medium',mit:'GIDA tablet programme co-integration. Community device library model.'},{cat:'GES Endorsement Process',prob:'Medium',impact:'High',mit:'Pilot in 500 schools first. Track record before national GES submission.'},{cat:'Teacher Adoption',prob:'Medium',impact:'Medium',mit:'Teacher training built into deployment. Peer champion model.'}],
    crossSectors:[4,5], crossNotes:'Education sector workforce pipeline (S5). Digital skills for secondary graduates (S5).',
  },
  { id:'T-08', sector:4, title:'Smart City Infrastructure Platform',
    desc:'IoT-based urban management for Accra — waste, traffic, utilities, and safety monitoring on a unified city intelligence platform.',
    fullDesc:"Accra's urban management challenges — traffic congestion, waste collection failure, water distribution inefficiency, public safety — all have digital solutions but no integrated platform. BRIDGE structures a smart city infrastructure investment: IoT sensors across key urban systems, a unified data platform for Accra Metropolitan Assembly, and module-by-module implementation starting with waste and traffic where ROI is most immediate.",
    score:72, dims:[22,18,19,13], subDims:{pp:[7,7,8],sf:[8,6,4],fe:[7,7,4],fs:[4,5,4]},
    tier:'Emerging', capMin:3, capMax:10, stage:'Concept', region:'Greater Accra', tags:['Smart City','IoT','Urban'],
    mode:'CONNECT', modeRationale:'BRIDGE connects AMA, technology providers, and urban infrastructure investors. Systems integration and procurement facilitation role.',
    pipeline:1, irr:'10–14%', structure:'B2G SaaS + Implementation Fee', minTicket:'$500,000', horizon:'5–8 years',
    thesis:"Smart city infrastructure generates immediate ROI for government: 15–20% improvement in waste collection efficiency alone saves AMA GHS 30–50M annually. The ROI case pays for the technology investment.",
    thesis2:"World Bank Urban Resilience Programme and EU Smart Cities for Africa initiative both have active Ghana pipelines. BRIDGE positions as the private sector delivery partner.",
    risks:[{cat:'Government Procurement',prob:'High',impact:'High',mit:'Pilot single-district implementation. Performance evidence before scale.'},{cat:'Data Privacy',prob:'Medium',impact:'Medium',mit:'Ghana Data Protection Authority engagement. Privacy-by-design.'},{cat:'Interoperability',prob:'Medium',impact:'Medium',mit:'Open API standards. Modular architecture.'}],
    crossSectors:[1,4,12], crossNotes:'Urban infrastructure (S1). Logistics route optimization (S12).',
  },
  { id:'T-09', sector:4, title:'Legal Tech Platform',
    desc:'Digital legal services for SMEs and individuals — contract templates, regulatory compliance, dispute resolution.',
    fullDesc:"Ghana's formal legal system is inaccessible to 90%+ of individuals and SMEs due to cost and complexity. Business contracts go unsigned, regulatory compliance is guesswork, and disputes fester unresolved. BRIDGE invests in a legal technology platform: Ghana-localized contract templates (employment, lease, supply, loan), regulatory compliance checklists by business type, and online dispute resolution for commercial disputes under GHS 50,000.",
    score:75, dims:[22,19,20,14], subDims:{pp:[8,8,6],sf:[8,6,5],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['LegalTech','SME','Platform'],
    mode:'INVEST', modeRationale:'B2C and B2B SaaS. BRIDGE co-invests with operator. Ghana Bar Association partnership creates institutional credibility.',
    pipeline:1, irr:'20–26%', structure:'SaaS Equity', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"Legal services are a $200M+ market in Ghana, almost entirely inaccessible to the informal and SME sector. Digital delivery reduces cost 80–90% — making legal services accessible at price points the mass market can afford.",
    thesis2:"GRA digital compliance mandate creates forced demand for compliance tools. Employer compliance requirements create B2B channel. BRIDGE SME portfolio provides 5,000+ Day 1 beta users.",
    risks:[{cat:'Ghana Bar Association',prob:'Medium',impact:'High',mit:'GBA partnership model — platform augments lawyers, not replaces them.'},{cat:'Legal Accuracy',prob:'Medium',impact:'High',mit:'Lawyer-reviewed templates. AI-assisted with human sign-off.'},{cat:'Adoption',prob:'Medium',impact:'Medium',mit:'GRA compliance requirement creates push adoption.'}],
    crossSectors:[2,4,6], crossNotes:'SME contract management (S2). Agricultural cooperative legal formalization (S6).',
  },
  { id:'T-10', sector:4, title:'Startup Accelerator & Fund',
    desc:'Ghana-focused technology startup accelerator with seed capital, mentorship, and BRIDGE ecosystem integration.',
    fullDesc:"Ghana's tech startup ecosystem raised only $9.7M in 2024 — down 64% from 2022 peak — leaving early-stage startups without the capital and support infrastructure to survive from prototype to product-market fit. BRIDGE structures a dedicated accelerator and seed fund: GHS 100,000–500,000 seed investments in 10–15 startups per cohort, 12-week intensive programme, and integration into the BRIDGE portfolio ecosystem as customers, distribution partners, and acquisition targets.",
    score:79, dims:[23,20,20,16], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:5, stage:'Active', region:'Accra', tags:['Startup','Accelerator','VC'],
    mode:'INVEST', modeRationale:'Seed fund investment model. BRIDGE provides capital and ecosystem access. Portfolio company integration is the differentiated value proposition.',
    pipeline:3, irr:'25–40%', structure:'Seed Equity + SAFE Notes', minTicket:'$200,000', horizon:'3–7 years',
    thesis:"BRIDGE's 12-sector portfolio creates a captive customer base for startup portfolio companies — dramatically reducing the time to first revenue and validating business models faster than any standalone accelerator.",
    thesis2:"Ghana's startup ecosystem has structural advantages — English-speaking, stable democracy, growing middle class, mobile money penetration — that make it an attractive early-stage investment market for patient capital.",
    risks:[{cat:'Startup Failure Rate',prob:'High',impact:'Medium',mit:'Portfolio diversification. 15+ companies per cohort. Follow-on only to top performers.'},{cat:'Exit Liquidity',prob:'High',impact:'High',mit:'BRIDGE acquisition as primary exit path. AfriLabs ecosystem connections for secondary exits.'},{cat:'Talent Retention',prob:'Medium',impact:'High',mit:'Competitive equity compensation. BRIDGE portfolio network as career development.'}],
    crossSectors:[4,2,5], crossNotes:'FinTech startups (S2). EdTech startups (S5). AgriTech startups (S6).',
  },

  // ── SECTOR 5 · EDUCATION & SKILLS (additional) ──
  { id:'E-06', sector:5, title:'Early Childhood Development Centres',
    desc:'Quality early childhood centres for urban working families — stimulation, nutrition, and school readiness from age 2.',
    fullDesc:"Ghana's early childhood development (ECD) sector is fragmented: public creches are under-resourced, private nurseries are unaffordable for most families, and the 2–5 year age group has the lowest formal participation rate in Sub-Saharan Africa. BRIDGE structures a network of quality-standardized ECD centres in urban and peri-urban communities: full-day care, nutritious meals, structured stimulation curriculum, and parent engagement. The franchise model enables rapid replication across community health centre co-locations.",
    score:82, dims:[25,20,21,16], subDims:{pp:[10,8,7],sf:[8,7,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:4, stage:'Concept', region:'Accra / Kumasi', tags:['ECD','Childcare','Education'],
    mode:'INVEST', modeRationale:'Social enterprise franchise investment. BRIDGE invests in franchisor entity. Government LEAP and GES ECD mandates provide co-funding.',
    pipeline:1, irr:'14–18%', structure:'Franchise Equity + Centre Fees', minTicket:'$200,000', horizon:'4–6 years',
    thesis:"Working mothers are the primary paying customer — GHS 200–400/month for quality childcare is within the budget of any formal sector employee. The unmet demand is massive: Accra alone has 800,000+ children aged 2–5 with inadequate ECD provision.",
    thesis2:"Government ECD expansion programme (GES KG integration) provides subsidized co-location at public schools, reducing centre setup cost by 30%. Nutrition component qualifies for WFP school feeding co-financing.",
    risks:[{cat:'Staff Quality',prob:'Medium',impact:'High',mit:'BRIDGE-designed training programme. Accreditation standard for all staff.'},{cat:'Regulatory Compliance',prob:'Low',impact:'High',mit:'GES licensing from inception. Health inspection compliance protocols.'},{cat:'Payment Reliability',prob:'Medium',impact:'Medium',mit:'MoMo automatic deduction. Corporate employer partnership for employee benefit.'}],
    crossSectors:[3,5], crossNotes:'Nutrition linkage to health outcomes (S3). Pathway into primary education (S5).',
  },
  { id:'E-07', sector:5, title:'Teacher Training & Development',
    desc:'In-service professional development programme for Ghana\'s 250,000 public school teachers — practical, certified, mobile-delivered.',
    fullDesc:"Ghana has 250,000+ public school teachers, the majority without professional development since their initial training. The Ghana Teacher Licensure Examination (GTLE) has a 60%+ failure rate on first attempt, reflecting the training gap. BRIDGE structures an in-service teacher development programme: mobile-first micro-modules (20 minutes per lesson), subject-specific content, school-based coaching, and GTLE preparation — with GES CEU certification for completion.",
    score:79, dims:[23,20,20,16], subDims:{pp:[9,8,6],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Teacher','Training','EdTech'],
    mode:'CONNECT', modeRationale:'BRIDGE connects GES, T-TEL, and private sector curriculum providers. Programme management and technology delivery role. Revenue from GES contract.',
    pipeline:1, irr:'14–18%', structure:'GES Programme Contract', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"GES needs a partner that can deliver professional development at scale and speed that the government system cannot self-provide. BRIDGE provides the programme management capacity that converts GES budget into teacher improvement.",
    thesis2:"T-TEL (Transforming Teacher Education and Learning) programme has active funding from FCDO. BRIDGE positions as the private sector delivery arm for an already-funded government initiative.",
    risks:[{cat:'GES Engagement',prob:'Medium',impact:'High',mit:'T-TEL framework partnership. Pilot with 5,000 teachers first.'},{cat:'Teacher Motivation',prob:'Medium',impact:'Medium',mit:'GES CEU certification creates career advancement incentive.'},{cat:'Content Quality',prob:'Low',impact:'High',mit:'Master trainer network. Subject specialist diaspora input.'}],
    crossSectors:[4,5], crossNotes:'EdTech Learning Platform integration (T-07). TVET Certification Platform (E-01).',
  },
  { id:'E-08', sector:5, title:'Scholarship & Bursary Aggregation',
    desc:'Centralized scholarship discovery and application platform for Ghanaian students — diaspora-funded and institutional.',
    fullDesc:"Ghana has 500,000+ university students but scholarship access is fragmented, opaque, and application-intensive. Diaspora communities fund thousands of scholarships annually through informal networks — most of which go unclaimed or reach undeserving beneficiaries through personal networks. BRIDGE builds the aggregation platform: a centralized scholarship database, verified student profiles, merit-based matching, and disbursement management. Diaspora donors route contributions through the platform with full transparency on recipient outcomes.",
    score:76, dims:[23,19,20,14], subDims:{pp:[9,8,6],sf:[8,7,4],fe:[8,6,5],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Scholarship','Diaspora','Education'],
    mode:'CONNECT', modeRationale:'BRIDGE connects diaspora donors, institutional funders, and students. Platform revenue from donor management fee and institutional partnerships.',
    pipeline:1, irr:'16–20%', structure:'Management Fee + Institutional Contracts', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"Diaspora educational giving is the most emotionally resonant investment for Ghanaians abroad. A transparent, tracked platform that shows donors exactly which student their GHS 500 helped through a semester commands premium engagement and repeat giving.",
    thesis2:"University partnership agreements provide institutional scholarship management contracts. Government scholarship fund management (GETFund) represents a significant institutional revenue opportunity.",
    risks:[{cat:'Donor Acquisition',prob:'Medium',impact:'High',mit:'Diaspora association partnerships. Social media diaspora education campaigns.'},{cat:'Student Verification',prob:'Medium',impact:'High',mit:'University-verified enrollment records. GhanaCard biometric verification.'},{cat:'Disbursement Integrity',prob:'Low',impact:'High',mit:'Direct university payment. Student receipt confirmation.'}],
    crossSectors:[2,5], crossNotes:'Diaspora Investment Gateway (F-03). Student savings products (F-08).',
  },
  { id:'E-09', sector:5, title:'Vocational Rehabilitation Programme',
    desc:'Skills training and employment placement for persons with disabilities — Ghana\'s most excluded workforce segment.',
    fullDesc:"Ghana has 3M+ persons with disabilities (PWDs), of whom fewer than 5% participate in formal employment. The barrier is not primarily disability — it is skills access and employer stigma. BRIDGE structures a vocational rehabilitation programme: disability-accessible training facilities, assistive technology provision, skills training in digital and service roles that accommodate different disability types, and employer partnership with quota commitments.",
    score:74, dims:[22,18,20,14], subDims:{pp:[9,7,6],sf:[8,6,5],fe:[8,7,5],fs:[4,4,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Disability','Inclusion','Skills'],
    mode:'INVEST', modeRationale:'Impact-first social enterprise. BRIDGE invests with DFAT, USAID, and Ghana MESW co-funding. Corporate employer quota creates commercial placement revenue.',
    pipeline:1, irr:'8–12%', structure:'Blended Finance + Placement Fee', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"Employer disability quota (Ghana Disability Act 2006 mandates 5% employment quota for public employers) creates a compliance-driven demand for trained PWD candidates. BRIDGE solves the supply side of an existing legal requirement.",
    thesis2:"Technology companies particularly value neurodiverse employees for quality assurance and data roles. BRIDGE Digital Skills track creates a strong PWD-to-tech-employer pipeline.",
    risks:[{cat:'Employer Stigma',prob:'High',impact:'Medium',mit:'Champion employer programme. Documented business case for diversity.'},{cat:'Assistive Tech Cost',prob:'Medium',impact:'Medium',mit:'USAID and DFAT assistive tech co-funding. Device rental model.'},{cat:'Programme Scale',prob:'Medium',impact:'Low',mit:'Focused niche positioning. Quality over volume in early cohorts.'}],
    crossSectors:[4,5,11], crossNotes:'Digital roles for PWDs (S4). Manufacturing accessibility (S11).',
  },
  { id:'E-10', sector:5, title:'University-Industry Linkage Programme',
    desc:'Structured internship, research partnership, and curriculum co-design between Ghana\'s universities and BRIDGE portfolio companies.',
    fullDesc:"Ghana's universities graduate 60,000+ students annually into a market that consistently rates them as under-prepared for the workplace. The gap is structural: curricula designed without industry input, no systematic internship infrastructure, and no research-to-industry transfer mechanism. BRIDGE structures a university-industry linkage programme: portfolio company internship placements, curriculum advisory boards, applied research contracts, and graduate talent pipeline agreements.",
    score:77, dims:[23,19,20,15], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['University','Industry','Research'],
    mode:'CONNECT', modeRationale:'BRIDGE connects BRIDGE portfolio companies, universities, and NABTEX. Programme management role. Revenue from industry partnership fees.',
    pipeline:1, irr:'14–18%', structure:'Industry Partnership Fee + Research Contracts', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"BRIDGE portfolio companies are the demand side — they need qualified graduates. Universities are the supply side — they need industry engagement. BRIDGE is the structural connector with the incentive and capability to make both sides work.",
    thesis2:"Applied research contracts from BRIDGE portfolio companies provide university revenue and real-world problem solving. Technology transfer from BRIDGE to university creates IP value for both parties.",
    risks:[{cat:'University Bureaucracy',prob:'High',impact:'Medium',mit:'Vice-Chancellor level buy-in. AAU and GUA endorsement at national level.'},{cat:'Industry Follow-Through',prob:'Medium',impact:'Medium',mit:'Contractual placement commitments with BRIDGE portfolio companies.'},{cat:'IP Ownership',prob:'Low',impact:'Medium',mit:'Clear research contract IP framework.'}],
    crossSectors:[4,5], crossNotes:'Digital skills graduates (T-01). Startup ecosystem research (T-10).',
  },

  // ── SECTOR 6 · AGRICULTURE (additional) ──
  { id:'A-07', sector:6, title:'Cocoa Supply Chain Upgrade',
    desc:'Direct cocoa purchasing and quality improvement programme — capturing premium above COCOBOD floor price for certified farmers.',
    fullDesc:"Ghana is the world's second-largest cocoa producer but captures only 20–30% of final chocolate value due to quality inconsistency and the COCOBOD-dominated export structure. BRIDGE structures a certified cocoa programme: farmer training in Good Agricultural Practices, soil health management, and post-harvest handling, combined with direct purchasing at COCOBOD floor + 15–25% premium for certified sustainable cocoa. International premium chocolate brands provide offtake commitments.",
    score:84, dims:[25,22,21,16], subDims:{pp:[9,9,7],sf:[9,8,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'Ashanti / Western', tags:['Cocoa','Premium','Export'],
    mode:'CONNECT', modeRationale:'BRIDGE connects farmer cooperatives, certifiers (Rainforest Alliance, Fairtrade), and premium chocolate buyers. Working capital and facilitation role.',
    pipeline:2, irr:'16–20%', structure:'Trading Margin + Premium Share', minTicket:'$300,000', horizon:'3–5 years',
    thesis:"Premium cocoa commands $400–800/tonne above COCOBOD standard price. BRIDGE captures 30–40% of that premium as facilitation margin while passing 60–70% to farmers. At 5,000 tonnes annually, BRIDGE earns $600K–1.6M in facilitation income.",
    thesis2:"Rainforest Alliance certification takes 12–18 months. BRIDGE fronts the certification cost and training investment, recovering from the premium differential over a 3-year period.",
    risks:[{cat:'COCOBOD Regulatory Constraints',prob:'High',impact:'High',mit:'Legal framework for licensed buying company. COCOBOD LBC licence.'},{cat:'Certification Timeline',prob:'Medium',impact:'Medium',mit:'Phased certification. Conventional income while certification progresses.'},{cat:'International Buyer Commitment',prob:'Medium',impact:'High',mit:'Offtake agreements before farmer commitment. Buyer pre-qualification.'}],
    crossSectors:[6,11,12], crossNotes:'Processing facilities for cocoa (A-04). Export logistics (S12). Chocolate manufacturing potential (S11).',
  },
  { id:'A-08', sector:6, title:'Irrigation Infrastructure Development',
    desc:'Small-scale irrigation schemes for smallholder clusters — extending growing seasons and reducing climate vulnerability.',
    fullDesc:"Only 2% of Ghana's cultivated land is irrigated, leaving agriculture entirely dependent on rainfall and vulnerable to the increasingly erratic rainfall patterns driven by climate change. Small-scale irrigation — boreholes, pumps, and drip systems serving 20–100 farmer clusters — can double cropping seasons and increase yields 40–80%. BRIDGE structures irrigation schemes co-financed by the Irrigation Development Authority and farmer cooperatives.",
    score:83, dims:[25,21,21,16], subDims:{pp:[9,8,8],sf:[9,7,5],fe:[9,7,5],fs:[5,6,5]},
    tier:'Core', capMin:2, capMax:8, stage:'Seed', region:'Northern Regions', tags:['Irrigation','Climate','Smallholder'],
    mode:'INVEST', modeRationale:'Infrastructure investment with government IDA co-financing. BRIDGE provides private capital alongside IDA, USAID Grow24, and AfDB agriculture water funds.',
    pipeline:2, irr:'12–16%', structure:'Blended Finance + Water Fees', minTicket:'$250,000', horizon:'5–8 years',
    thesis:"Irrigation is the single highest-leverage agricultural infrastructure investment. Two crops per year instead of one doubles farm income from the same land. The 30,000 ha Grow24 irrigated hectare commitment creates co-financing at a scale that makes BRIDGE private investment viable.",
    thesis2:"Water user fees from irrigating farmers create recurring revenue. At GHS 200–400/ha/season, 1,000 ha generates GHS 200–400K annually — covering O&M and returning capital over 8–10 years.",
    risks:[{cat:'Water Source Reliability',prob:'Medium',impact:'High',mit:'Hydrological assessment before commitment. Multi-source design.'},{cat:'Farmer Willingness to Pay',prob:'Medium',impact:'High',mit:'Demonstrated yield improvement drives fee acceptance. Cooperative enforcement.'},{cat:'IDA Disbursement',prob:'Medium',impact:'High',mit:'Phased co-financing tied to IDA milestone payments.'}],
    crossSectors:[6,10,1], crossNotes:'Solar pumping (S10). Feeder roads to irrigated plots (S1). Agri-finance for irrigated crop cycles (S2).',
  },
  { id:'A-09', sector:6, title:'Poultry Value Chain Integration',
    desc:'Integrated poultry production and processing — import substitution for Ghana\'s $450M annual poultry import bill.',
    fullDesc:"Ghana imports $450M in frozen poultry annually, primarily from Brazil and the EU. Domestic production is fragmented and costly due to expensive imported feed (maize and soy) and poor biosecurity. BRIDGE structures a vertically integrated poultry venture: contract farming with trained smallholder producers, central feed mill using domestic maize from BRIDGE agriculture network, processing facility for fresh and frozen product, and cold chain distribution to supermarkets and institutional buyers.",
    score:80, dims:[24,20,21,15], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[8,7,6],fs:[5,5,5]},
    tier:'Core', capMin:3, capMax:8, stage:'Concept', region:'National', tags:['Poultry','Import Substitution','Processing'],
    mode:'INVEST', modeRationale:'Vertically integrated agribusiness investment. BRIDGE provides development capital. Government poultry import substitution policy creates institutional support.',
    pipeline:1, irr:'14–18%', structure:'Agribusiness Equity', minTicket:'$500,000', horizon:'5–7 years',
    thesis:"Ghana's $450M annual poultry import creates a massive import substitution opportunity. Domestic maize supply from BRIDGE agriculture portfolio creates a cost advantage unavailable to importers. Cold chain integration closes the distribution gap.",
    thesis2:"Government trade policy advocacy for appropriate poultry import tariffs aligns commercial and policy interest. Contract farming model distributes production risk across 500+ smallholder producers.",
    risks:[{cat:'Biosecurity',prob:'Medium',impact:'High',mit:'Veterinary programme. Biosecurity training. Insurance against disease outbreak.'},{cat:'Feed Cost',prob:'Medium',impact:'High',mit:'Domestic maize supply from A-02 aggregation platform reduces feed cost.'},{cat:'Import Competition',prob:'High',impact:'High',mit:'Policy advocacy for import tariff parity. Quality differentiation.'}],
    crossSectors:[6,11,12], crossNotes:'Domestic maize from A-02 (S6). Processing facility (A-04). Cold chain distribution (S12).',
  },
  { id:'A-10', sector:6, title:'Shea Value Chain Development',
    desc:'Women-led shea collection, processing, and export — capturing premium for certified organic Ghanaian shea butter.',
    fullDesc:"Ghana produces 200,000+ tonnes of shea annually from wild trees in the Northern regions. 90% is exported as raw nuts at $300–400/tonne; processed shea butter commands $2,000–4,000/tonne. Women are the exclusive collectors and processors, but receive the lowest share of value. BRIDGE structures a shea value chain programme: women's cooperative strengthening, solar-powered processing equipment, organic certification, and direct export to cosmetics companies (L'Oreal, Unilever, Body Shop) seeking certified sustainable shea.",
    score:85, dims:[26,21,22,16], subDims:{pp:[10,9,7],sf:[8,8,5],fe:[9,7,6],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:4, stage:'Seed', region:'Northern Regions', tags:['Shea','Women','Export'],
    mode:'CONNECT', modeRationale:'BRIDGE connects women\'s cooperatives, processors, certifiers, and international buyers. Working capital facilitation and market linkage. Revenue from export facilitation margin.',
    pipeline:2, irr:'16–20%', structure:'Trading Margin + Certification Premium', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"Processing shea domestically captures 5–10x the value of raw nut export. International cosmetics companies are under ESG pressure to source certified, traceable, women-empowering shea — BRIDGE provides exactly what they need.",
    thesis2:"USAID West Africa Trade and Investment Hub has active shea value chain co-financing. EIF (Enhanced Integrated Framework) trade facilitation grants available for shea certification.",
    risks:[{cat:'Seasonal Supply',prob:'Medium',impact:'Medium',mit:'Storage infrastructure. Multi-cooperative sourcing smooths seasonality.'},{cat:'Certification Cost',prob:'Medium',impact:'Medium',mit:'Donor co-financing for certification. Recovered from premium over 2 years.'},{cat:'Buyer Commitment',prob:'Low',impact:'High',mit:'Pre-signed offtake letters of intent before cooperative commitment.'}],
    crossSectors:[6,2,11], crossNotes:'Women\'s Economic Empowerment Fund (F-07). Processing equipment (M-02). Chemical refinement potential (S11).',
  },
  { id:'A-11', sector:6, title:'Aquaculture Development Programme',
    desc:'Tilapia and catfish aquaculture in the Volta Basin — domestic protein supply and export to regional markets.',
    fullDesc:"Ghana's per capita fish consumption is 25kg/year but domestic capture fisheries are collapsing from overfishing. Tilapia aquaculture in the Volta Basin is well-proven — the Volta Lake is one of the world's largest man-made lakes with ideal tilapia conditions — but production is fragmented and the technical gap is significant. BRIDGE invests in a commercial aquaculture operation: cage culture in the Volta, feed mill integration, processing and cold chain, and market linkage to supermarkets and regional export.",
    score:78, dims:[23,20,20,15], subDims:{pp:[9,8,6],sf:[8,7,5],fe:[8,7,5],fs:[5,5,5]},
    tier:'Core', capMin:2, capMax:6, stage:'Concept', region:'Volta Region', tags:['Aquaculture','Protein','Export'],
    mode:'INVEST', modeRationale:'Agribusiness investment in high-demand protein production. BRIDGE co-invests with FAO technical assistance and EIB aquaculture programme.',
    pipeline:1, irr:'14–18%', structure:'Agribusiness Equity + Processing', minTicket:'$300,000', horizon:'4–6 years',
    thesis:"Ghana's tilapia price is $4–6/kg at retail — 40–60% above cost of production for a well-managed cage operation. Domestic demand is constrained by supply, not price. Regional West African markets add additional demand.",
    thesis2:"FAO and EIB have active aquaculture development programmes in Ghana seeking private sector co-investment partners. BRIDGE provides the capital and operational management capacity.",
    risks:[{cat:'Feed Cost',prob:'High',impact:'High',mit:'On-site feed mill using domestic soya and fish meal. Cost control from vertical integration.'},{cat:'Disease / Mortality',prob:'Medium',impact:'High',mit:'Veterinary management programme. Insurance against mass mortality.'},{cat:'Regulatory',prob:'Low',impact:'Medium',mit:'EPA cage culture licensing. FDA food safety compliance.'}],
    crossSectors:[3,6,12], crossNotes:'Protein for health and nutrition (S3). Cold chain logistics (S12). Feed from agriculture (S6).',
  },

  // ── SECTOR 7 · SPORTS & CREATIVE (additional) ──
  { id:'CR-05', sector:7, title:'Fashion & Textile Design Hub',
    desc:'West Africa\'s first integrated fashion design, production, and export hub — connecting Ghana\'s designers to global markets.',
    fullDesc:"Ghana's fashion industry — rooted in kente, batik, and Afrocentric design — has produced internationally recognized designers (Christie Brown, Pistis, Mimi Plange) but lacks the production infrastructure and market access to scale. BRIDGE structures an integrated fashion hub: design studio space, pattern-making and sampling rooms, small-batch production equipment, and export facilitation to European and US premium fashion markets. Hub residents share infrastructure costs while retaining creative ownership.",
    score:76, dims:[23,19,20,14], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'Accra', tags:['Fashion','Design','Export'],
    mode:'INVEST', modeRationale:'Infrastructure investment in creative hub. BRIDGE invests in hub facility. Revenue from studio rental, production services, and export facilitation commission.',
    pipeline:1, irr:'14–18%', structure:'Equity + Hub Revenue', minTicket:'$200,000', horizon:'4–6 years',
    thesis:"Ghana's fashion exports are growing at 30%+ annually from a low base. The constraint is not design talent — it is production infrastructure and export logistics. The hub removes both constraints simultaneously.",
    thesis2:"AGOA preferential trade access creates structural advantage for Ghana fashion exports. Hub co-location with BRIDGE Logistics (S12) provides export facilitation at preferential rates.",
    risks:[{cat:'Designer Adoption',prob:'Medium',impact:'High',mit:'Top designer anchor tenants before launch. Success story marketing.'},{cat:'Export Market Development',prob:'Medium',impact:'High',mit:'Fashion Week presence. International buyer hosting programme.'},{cat:'Hub Utilization',prob:'Medium',impact:'Medium',mit:'Corporate events and fashion education as revenue bridge.'}],
    crossSectors:[5,7,11], crossNotes:'Garment manufacturing (M-03). Skills training for designers (S5). Export logistics (S12).',
  },
  { id:'CR-06', sector:7, title:'Gaming & Esports Infrastructure',
    desc:'Ghana\'s first professional esports facility and game development studio — connecting Ghanaian gaming talent to global industry.',
    fullDesc:"Mobile gaming is exploding across West Africa — Ghana has 15M+ mobile gamers and a rapidly growing community of game developers. Yet professional infrastructure is absent: no esports venues, no game development studios, no publisher relationships for Ghanaian developers. BRIDGE invests in a professional gaming and esports facility: competitive gaming arena, game development workspace, publisher partnership programme, and a Ghana Esports League that creates the competitive infrastructure for talent development.",
    score:72, dims:[21,18,19,14], subDims:{pp:[7,7,7],sf:[8,6,4],fe:[7,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:1, capMax:3, stage:'Concept', region:'Accra', tags:['Gaming','Esports','Youth'],
    mode:'INVEST', modeRationale:'Youth-focused entertainment infrastructure. BRIDGE invests with diaspora gaming professional advisory support.',
    pipeline:1, irr:'16–20%', structure:'Venue Revenue + League Fees', minTicket:'$150,000', horizon:'3–5 years',
    thesis:"Gaming is the fastest-growing entertainment sector globally. Ghana's young, mobile-first population creates natural demand. The infrastructure gap means first-mover advantage is available for the next 2–3 years.",
    thesis2:"Corporate sponsorship (MTN, Vodafone, energy drinks) is the primary revenue model for esports globally. Ghana's corporate market is ready for esports sponsorship as youth marketing vehicle.",
    risks:[{cat:'Revenue Model Maturity',prob:'Medium',impact:'High',mit:'Venue hire and corporate events as bridge revenue. League sponsorship as primary target.'},{cat:'Talent Pipeline',prob:'Low',impact:'Medium',mit:'Existing gaming community is large. Competitive infrastructure creates self-reinforcing growth.'},{cat:'Infrastructure Cost',prob:'Medium',impact:'Medium',mit:'Phased investment. Mobile-first design reduces facility dependence.'}],
    crossSectors:[4,7], crossNotes:'Tech talent ecosystem (S4). Digital content production (CR-01).',
  },
  { id:'CR-07', sector:7, title:'Live Events & Venue Management',
    desc:'Professional live events infrastructure — Accra concert venue, festival management, and touring artist services.',
    fullDesc:"Ghana's live music and entertainment sector is growing rapidly, driven by Afrobeats global expansion, diaspora reunion tourism, and a domestic middle class with increasing entertainment spending. Yet professional venue infrastructure is limited — Accra has no dedicated 5,000+ capacity indoor concert venue. BRIDGE invests in a multipurpose entertainment venue and events management company: 6,000-seat indoor arena, professional production capabilities, and a roster of annual flagship events.",
    score:74, dims:[22,18,20,14], subDims:{pp:[8,7,7],sf:[8,7,4],fe:[8,7,5],fs:[4,4,5]},
    tier:'Emerging', capMin:3, capMax:10, stage:'Concept', region:'Accra', tags:['Events','Venue','Entertainment'],
    mode:'INVEST', modeRationale:'Real estate and entertainment infrastructure investment. Long-dated asset with multiple revenue streams.',
    pipeline:1, irr:'12–16%', structure:'Development Equity + Revenue', minTicket:'$500,000', horizon:'6–10 years',
    thesis:"A world-class venue attracts world-class events. Afrobeats artists currently bypass Ghana (their home market) for Lagos and Nairobi venues. One flagship venue reverses that dynamic and positions Accra as the entertainment capital of West Africa.",
    thesis2:"Beyond concerts: conferences, weddings, corporate events, and sports provide 300+ event days per year. Food and beverage, parking, and hospitality revenue layers create multi-revenue stream asset.",
    risks:[{cat:'Capital Intensity',prob:'Low',impact:'High',mit:'Real estate syndication. Diaspora venue bond.'},{cat:'Event Pipeline',prob:'Medium',impact:'High',mit:'Anchor events pre-booked. International promoter partnerships.'},{cat:'Political / Security',prob:'Low',impact:'High',mit:'Ghana\'s political stability is a competitive advantage vs regional alternatives.'}],
    crossSectors:[7,9], crossNotes:'Tourism attraction for diaspora events (S9). Content production (CR-01).',
  },
  { id:'CR-08', sector:7, title:'Film Financing & Distribution',
    desc:'Ghana film finance fund and distribution platform — funding Ghanaian filmmakers and getting their work to global audiences.',
    fullDesc:"Ghallywood produces 200+ films annually but almost none reach international distribution due to financing gaps (most films shot for GHS 50,000–200,000 vs. $1–3M for comparable Nollywood productions) and distribution infrastructure. BRIDGE structures a Ghana film finance fund: GHS 500,000–2,000,000 per production, linked to a distribution partnership with Netflix Africa, Showmax, and Canal+ that guarantees international audience access for funded films.",
    score:73, dims:[22,18,19,14], subDims:{pp:[7,8,7],sf:[8,6,4],fe:[7,7,5],fs:[4,4,5]},
    tier:'Emerging', capMin:2, capMax:6, stage:'Concept', region:'Accra', tags:['Film','Finance','Distribution'],
    mode:'INVEST', modeRationale:'Film finance fund investment. BRIDGE provides development and production capital. Streaming platform distribution guarantees ensure audience access.',
    pipeline:1, irr:'16–22%', structure:'Film Fund Equity', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"Netflix, Amazon, and Showmax are actively commissioning African content with multi-year, multi-title volume commitments. BRIDGE bridges the funding gap that prevents Ghanaian filmmakers from meeting the production quality these platforms require.",
    thesis2:"Streaming platform advances cover 50–70% of production budget on greenlit projects — dramatically reducing BRIDGE's net capital at risk while guaranteeing distribution.",
    risks:[{cat:'Film Performance',prob:'High',impact:'Medium',mit:'Portfolio approach — 10+ films per year. Streaming advance de-risks individual productions.'},{cat:'Streaming Platform Commitment',prob:'Medium',impact:'High',mit:'Pre-negotiated volume agreements before fund launch.'},{cat:'Talent and Crew',prob:'Low',impact:'Medium',mit:'BRIDGE Production Studio (CR-01) provides crew infrastructure.'}],
    crossSectors:[4,7,9], crossNotes:'Production Studio (CR-01). Tourism content (S9). Digital distribution (S4).',
  },
  { id:'CR-09', sector:7, title:'Cultural Heritage Preservation',
    desc:'Digital documentation and commercialization of Ghana\'s intangible cultural heritage — language, craft, music, and oral tradition.',
    fullDesc:"Ghana's intangible cultural heritage — kente weaving traditions, Akan oral histories, adinkra symbolism, traditional music, and craft knowledge — is at risk from generational discontinuity. Simultaneously, this heritage has enormous commercial value in diaspora markets, global cultural tourism, and digital media. BRIDGE structures a cultural preservation and commercialization programme: digital documentation, IP registration, digital media production, and licensed commercialization through diaspora merchandise, tourism, and media channels.",
    score:71, dims:[21,18,18,14], subDims:{pp:[8,7,6],sf:[7,7,4],fe:[7,7,4],fs:[5,5,4]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Heritage','Culture','IP'],
    mode:'CONNECT', modeRationale:'BRIDGE connects traditional custodians, IP lawyers, and commercial channels. Revenue from licensing and commercialization management fee.',
    pipeline:1, irr:'14–18%', structure:'Licensing Revenue + Management Fee', minTicket:'$75,000', horizon:'3–5 years',
    thesis:"Ghana's cultural heritage is an under-monetized asset with growing global demand — diaspora communities, international cultural tourism, and global media all want authentic Ghanaian cultural content. BRIDGE creates the commercial infrastructure without displacing custodians.",
    thesis2:"UNESCO Intangible Cultural Heritage fund provides co-financing for documentation. GTA tourism content demand provides institutional revenue for cultural media production.",
    risks:[{cat:'Custodian Consent',prob:'Medium',impact:'High',mit:'Community-led consent process. Revenue-sharing model from inception.'},{cat:'IP Protection',prob:'Medium',impact:'Medium',mit:'GI registration. International copyright frameworks.'},{cat:'Commercial Demand Validation',prob:'Low',impact:'Medium',mit:'Diaspora merchandise market proven by Abrantie Apparel and similar brands.'}],
    crossSectors:[7,9], crossNotes:'Heritage tourism (TO-01). Talent Platform (CR-02).',
  },

  // ── SECTOR 8 · HOUSING & REAL ESTATE (additional) ──
  { id:'HO-05', sector:8, title:'Student Housing Development',
    desc:'Purpose-built student accommodation for Ghana\'s 200,000+ university students — filling the chronic residential gap.',
    fullDesc:"Ghana's public universities house fewer than 20% of enrolled students on campus. The remaining 80% live in informal, overpriced, unsafe off-campus accommodation. Purpose-built student housing (PBSA) is a proven investment asset class globally — steady occupancy, institutional tenancy, and government partnership potential. BRIDGE structures a PBSA development: 500-bed facilities at University of Ghana, KNUST, and Cape Coast campuses under university land lease agreements.",
    score:79, dims:[23,20,20,16], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,6,5]},
    tier:'Core', capMin:3, capMax:8, stage:'Concept', region:'Accra / Kumasi', tags:['Student Housing','University','PBSA'],
    mode:'INVEST', modeRationale:'Real estate development investment under university lease. Stable institutional occupancy. Revenue from student bed fees.',
    pipeline:1, irr:'14–18%', structure:'Development Equity + Bed Fees', minTicket:'$500,000', horizon:'5–8 years',
    thesis:"PBSA in Ghana commands GHS 800–1,500/month per bed at quality standard. At 500 beds and 90% occupancy, a facility generates GHS 4.3–8.1M/year. Land lease from university eliminates land cost. Strong BRIDGE diaspora investor demand for stable GHS income asset.",
    thesis2:"University partnership creates guaranteed occupancy pipeline — GES student loans cover accommodation fees. Diaspora parents and students are the premium accommodation segment.",
    risks:[{cat:'University Lease',prob:'Low',impact:'High',mit:'Long-term ground lease with university. Clear commercial terms.'},{cat:'Occupancy Rate',prob:'Low',impact:'High',mit:'University enrollment guarantees demand pipeline. Waiting lists at comparable facilities.'},{cat:'Competition',prob:'Medium',impact:'Medium',mit:'Quality differentiation. University co-branding creates preference.'}],
    crossSectors:[5,8], crossNotes:'University linkage programme (E-10). Scholarship platform tenants (E-08).',
  },
  { id:'HO-06', sector:8, title:'Commercial Real Estate Development',
    desc:'Grade A office and mixed-use commercial development for Accra\'s growing corporate and SME market.',
    fullDesc:"Accra has a severe shortage of Grade A office space — vacancy rates for quality commercial space are below 5% while rents continue rising. Ghana's expanding financial services, professional services, and multinational presence create consistent demand for well-maintained, well-serviced office space. BRIDGE structures a Grade A commercial development: 10,000–20,000 sqm mixed-use (office, retail, co-working) in strategic Accra locations.",
    score:75, dims:[22,19,20,14], subDims:{pp:[7,8,7],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:5, capMax:15, stage:'Concept', region:'Greater Accra', tags:['Commercial','Office','Real Estate'],
    mode:'INVEST', modeRationale:'Real estate development investment. BRIDGE manages development. Revenue from long-term commercial leases.',
    pipeline:1, irr:'14–18%', structure:'Development Equity + Lease Revenue', minTicket:'$1,000,000', horizon:'6–10 years',
    thesis:"Accra Grade A office rents of $25–35/sqm/month provide some of the best commercial real estate returns in Sub-Saharan Africa. Supply constraints are structural — construction capacity and financing remain limited.",
    thesis2:"Co-working component (30% of building) provides higher per-sqm yield and services the SME and startup market that BRIDGE serves. BRIDGE portfolio companies become anchor tenants.",
    risks:[{cat:'Construction Finance',prob:'Medium',impact:'High',mit:'Presale commitment from 30% of space before construction start.'},{cat:'Economic Cycle',prob:'Medium',impact:'Medium',mit:'Long-term lease pre-commitments. Diversified tenant mix.'},{cat:'FX',prob:'Medium',impact:'Medium',mit:'USD-denominated lease agreements for multinational tenants.'}],
    crossSectors:[4,8,11], crossNotes:'Tech startup co-working (S4). BRIDGE portfolio company anchor tenants.',
  },
  { id:'HO-07', sector:8, title:'Affordable Rental Housing Fund',
    desc:'Dedicated fund for affordable rental housing targeting Ghana\'s urban working class — formal tenure, fair rents.',
    fullDesc:"Ghana's urban housing market is dominated by informal rental arrangements with no tenant protections, arbitrary rent increases, and frequent eviction. Advance rent requirements (2 years in advance is standard) lock out lower-income workers. BRIDGE structures an affordable rental housing fund: acquiring and managing rental housing for the GHS 600–1,500/month income bracket, with maximum 3-month advance requirement and formal tenancy agreements.",
    score:78, dims:[23,20,20,15], subDims:{pp:[9,8,6],sf:[8,7,5],fe:[8,7,5],fs:[5,5,5]},
    tier:'Core', capMin:3, capMax:10, stage:'Concept', region:'Greater Accra', tags:['Rental','Affordable','Housing'],
    mode:'INVEST', modeRationale:'Fund investment in rental property portfolio. BRIDGE manages the fund and property management. Impact-first capital from DFIs co-invests.',
    pipeline:1, irr:'10–14%', structure:'Fund Structure + Rental Income', minTicket:'$500,000', horizon:'7–10 years',
    thesis:"Formal rental housing at fair market rates with professional management fills a massive gap. Tenant willingness-to-pay is established — the problem is supply of quality, formally tenured rental stock.",
    thesis2:"DFI affordable housing funds (IFC, AfDB Housing Finance) actively co-invest in formal rental housing in West Africa. Concessional co-investment capital improves BRIDGE returns to commercial levels.",
    risks:[{cat:'Property Management',prob:'Low',impact:'High',mit:'BRIDGE Property Management Platform (HO-04) as management infrastructure.'},{cat:'Tenant Default',prob:'Medium',impact:'Medium',mit:'Employer payroll deduction where possible. Rental insurance product.'},{cat:'Property Appreciation',prob:'Low',impact:'Medium',mit:'Accra land values have appreciated 15%+ annually for 10 years. Asset protection is strong.'}],
    crossSectors:[2,8], crossNotes:'Microinsurance rental coverage (F-05). Property Management Platform (HO-04).',
  },
  { id:'HO-08', sector:8, title:'Green Building Standards Programme',
    desc:'Ghana Green Building certification and incentive programme — reducing energy and water consumption in new construction.',
    fullDesc:"Ghana's construction boom is proceeding without any systematic green building standards — new buildings are energy-intensive, water-wasteful, and poorly adapted to Ghana's climate. BRIDGE structures a green building programme in partnership with the Ghana Green Building Council: certification framework, technical assistance for developers, and incentive negotiation with MESTI and PURC for green-certified buildings (reduced electricity tariffs, expedited permits).",
    score:70, dims:[21,17,18,14], subDims:{pp:[7,7,7],sf:[8,6,3],fe:[7,6,5],fs:[5,5,4]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Green Building','Sustainability','Standards'],
    mode:'ADVISE', modeRationale:'Technical advisory and standards development. BRIDGE earns from developer advisory fees and certification programme management.',
    pipeline:1, irr:'14–18%', structure:'Advisory Fee + Certification Revenue', minTicket:'$50,000', horizon:'2–4 years',
    thesis:"Green building premium is 8–12% in comparable African markets (South Africa, Kenya). Developer willingness to pay for certification grows with regulatory pressure and institutional tenant demand for sustainability credentials.",
    thesis2:"IFC EDGE certification programme provides international credibility. Green Climate Fund co-financing for green building programmes is available at national level.",
    risks:[{cat:'Developer Adoption',prob:'Medium',impact:'High',mit:'Regulatory incentive advocacy. Large developer pilot programme.'},{cat:'Technical Capacity',prob:'Medium',impact:'Medium',mit:'International green building professional partnership.'},{cat:'Regulatory Incentives',prob:'Medium',impact:'High',mit:'MESTI and PURC engagement from inception.'}],
    crossSectors:[8,10,11], crossNotes:'Energy-efficient construction (S10). Local green materials (HO-03).',
  },
  { id:'HO-09', sector:8, title:'Real Estate Investment Trust (REIT)',
    desc:'Ghana\'s first formally structured REIT pooling diaspora and domestic capital into commercial and residential real estate.',
    fullDesc:"SEC Ghana has published REIT regulations but no formal REIT has been established. The vehicle is ideal for Ghana's real estate investment needs: it pools small investments, provides liquidity through exchange listing, and enables diaspora investment in Ghana real estate without the management burden of direct property ownership. BRIDGE structures Ghana's first formally constituted REIT: SEC-registered, GSE-listed, with a diversified portfolio of commercial and residential properties.",
    score:77, dims:[23,19,20,15], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:5, capMax:20, stage:'Concept', region:'National', tags:['REIT','Capital Markets','Diaspora'],
    mode:'INVEST', modeRationale:'BRIDGE structures and manages the REIT. SEC registration and GSE listing provides liquidity. Diaspora investment demand provides capital.',
    pipeline:1, irr:'12–16%', structure:'REIT Management Fee + Carry', minTicket:'$100,000', horizon:'5–10 years',
    thesis:"The REIT structure democratizes Ghana real estate investment — a diaspora investor can buy GHS 500 of Ghana real estate exposure on the GSE rather than managing a physical property from abroad. The product design directly solves the diaspora investment problem.",
    thesis2:"SEC Ghana's REIT regulations are ready. GSE listing provides exit liquidity that direct property investment cannot offer. IFC has expressed interest in anchor investment in Ghana's first REIT.",
    risks:[{cat:'SEC Registration',prob:'Low',impact:'High',mit:'BRIDGE legal team leads SEC engagement. Regulations already published.'},{cat:'GSE Liquidity',prob:'Medium',impact:'Medium',mit:'Anchor institutional investors create initial liquidity.'},{cat:'Portfolio Quality',prob:'Low',impact:'High',mit:'BRIDGE real estate portfolio as seed assets.'}],
    crossSectors:[2,8], crossNotes:'Diaspora investment channel (F-03). BRIDGE housing portfolio as seed assets.',
  },

  // ── SECTOR 9 · TOURISM & HOSPITALITY (additional) ──
  { id:'TO-05', sector:9, title:'MICE Tourism Infrastructure',
    desc:'Meetings, incentives, conferences, and exhibitions infrastructure — positioning Accra as West Africa\'s conference capital.',
    fullDesc:"West Africa has no dedicated world-class MICE venue. Ghana's political stability, English-speaking environment, and international connectivity make it the natural choice for regional conferences, but the infrastructure doesn't yet support it. BRIDGE invests in a MICE facility: 2,000-person conference centre, breakout rooms, exhibition halls, and integrated hospitality. The African Union, ECOWAS, and multinational African operations all need regional conference venues annually.",
    score:76, dims:[23,19,20,14], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:5, capMax:15, stage:'Concept', region:'Greater Accra', tags:['MICE','Conference','Tourism'],
    mode:'INVEST', modeRationale:'Real estate and hospitality infrastructure investment. Long-term asset with institutional anchor demand.',
    pipeline:1, irr:'12–16%', structure:'Development Equity + Event Revenue', minTicket:'$1,000,000', horizon:'7–10 years',
    thesis:"A single major international conference (1,000+ delegates) generates $2–5M in direct visitor spend. Ghana hosts zero currently due to facility gap. The first world-class MICE venue captures the entire regional market.",
    thesis2:"AU and ECOWAS conference rotations, corporate incentive programmes, and government-hosted summits provide institutional demand. Hotel partnership revenue adds supplementary income.",
    risks:[{cat:'Capital Intensity',prob:'Low',impact:'High',mit:'Government co-investment as strategic national interest. IFC hospitality fund.'},{cat:'Event Pipeline Development',prob:'Medium',impact:'High',mit:'GIPC and GTA event attraction programme. Pre-booked anchor events.'},{cat:'Competition',prob:'Low',impact:'Medium',mit:'No comparable facility exists in West Africa. First-mover for 5+ years.'}],
    crossSectors:[9,7], crossNotes:'Creative events programming (S7). Heritage tourism integration (TO-01).',
  },
  { id:'TO-06', sector:9, title:'Medical Tourism Development',
    desc:'Positioning Ghana as a medical tourism destination for the diaspora and West African patients — quality care at accessible cost.',
    fullDesc:"Ghana's diaspora community regularly travels to Ghana, and increasingly needs healthcare during their visits. Simultaneously, West African patients from Nigeria, Francophone Africa, and the diaspora travel to India and Thailand for medical care that could be provided in Ghana at comparable quality and lower cost. BRIDGE structures a medical tourism programme: accreditation support for 3–5 Accra hospitals to JCI standards, diaspora health package development, and medical tourism marketing.",
    score:74, dims:[22,18,20,14], subDims:{pp:[8,7,7],sf:[8,7,4],fe:[8,7,5],fs:[4,4,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'Greater Accra', tags:['Medical Tourism','Health','Diaspora'],
    mode:'CONNECT', modeRationale:'BRIDGE connects hospitals, tourism agencies, and diaspora networks. Facilitation and marketing role. Revenue from referral commissions.',
    pipeline:1, irr:'16–20%', structure:'Referral Commission + Advisory Fee', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"The diaspora health market is immediately addressable. 500,000 diaspora visitors annually, all needing health check-ups, dental, vision, and specialist care during their Ghana visits. BRIDGE packages the service; diaspora physicians endorse the quality.",
    thesis2:"JCI accreditation takes 18–24 months but creates international credibility that opens regional referral market. Nigerian patients represent a $500M+ outbound medical travel market seeking regional alternatives to India.",
    risks:[{cat:'Hospital Quality',prob:'Medium',impact:'High',mit:'Quality improvement programme. JCI accreditation timeline management.'},{cat:'Insurance Integration',prob:'Medium',impact:'Medium',mit:'Partnership with international health insurers. BRIDGE member health product.'},{cat:'Marketing',prob:'Medium',impact:'Medium',mit:'Diaspora physician network as primary referral channel.'}],
    crossSectors:[3,9], crossNotes:'Private Specialist Clinic Network (H-03). Heritage Tourism diaspora visitors (TO-01).',
  },
  { id:'TO-07', sector:9, title:'Agri-Tourism & Farm Experiences',
    desc:'Farm-based tourism connecting diaspora and international visitors with Ghana\'s agricultural heritage and rural communities.',
    fullDesc:"Agricultural tourism is one of the fastest-growing tourism segments globally — visitors paying $100–300/day for authentic farm experiences, food production participation, and rural community engagement. Ghana's agricultural heartland — shea groves in the North, cocoa farms in Ashanti, rice paddies in the Upper East — offers compelling farm experience opportunities. BRIDGE structures a network of certified agri-tourism experiences integrated with BRIDGE's cooperative network.",
    score:72, dims:[22,18,19,13], subDims:{pp:[8,7,7],sf:[8,6,4],fe:[7,6,5],fs:[4,5,4]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Agri-Tourism','Rural','Diaspora'],
    mode:'CONNECT', modeRationale:'BRIDGE connects agricultural cooperatives, tourism agencies, and visitors. Revenue from experience facilitation margin.',
    pipeline:1, irr:'18–22%', structure:'Experience Facilitation Margin', minTicket:'$50,000', horizon:'2–4 years',
    thesis:"Year of Return diaspora visitors want authentic Ghana experiences, not hotel tourism. A curated 3-day agri-tourism package ($500–800/person) distributed through BRIDGE's diaspora investment network is a natural product-channel fit.",
    thesis2:"Income diversification for farming cooperatives from tourism reduces their dependence on single commodity prices. BRIDGE agriculture and tourism portfolios reinforce each other.",
    risks:[{cat:'Quality Consistency',prob:'Medium',impact:'High',mit:'Certification programme for participating farms. BRIDGE quality manager.'},{cat:'Visitor Volume',prob:'Medium',impact:'Medium',mit:'Corporate team building market provides non-seasonal volume.'},{cat:'Infrastructure',prob:'Medium',impact:'Medium',mit:'Basic accommodation standards for farm stays. Co-investment with cooperative.'}],
    crossSectors:[6,9], crossNotes:'Agricultural cooperative network (A-03). Digital Destination Platform (TO-04).',
  },
  { id:'TO-08', sector:9, title:'Budget Hotel & Guesthouse Network',
    desc:'Standardized budget hospitality network for domestic and regional travellers — consistent quality, digital booking, fair pricing.',
    fullDesc:"Ghana's domestic travel market — business travellers, government officials, NGO workers, and regional visitors — is underserved by both the expensive international hotels and the inconsistent quality of local guesthouses. BRIDGE structures a branded budget hotel network: standardized rooms (GHS 150–300/night), digital booking, reliable WiFi and breakfast, and professional management — filling the gap between $10 local guesthouses and $150+ international hotels.",
    score:76, dims:[23,19,20,14], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:1, capMax:5, stage:'Concept', region:'National', tags:['Budget Hotel','Hospitality','Network'],
    mode:'INVEST', modeRationale:'Hospitality franchise investment. BRIDGE invests in franchise brand and management system. Property operators hold facility assets.',
    pipeline:1, irr:'16–20%', structure:'Franchise Fee + Management Contract', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"Franchise model scales without BRIDGE holding property assets. Property operators provide facilities; BRIDGE provides brand, standards, booking, and management systems. Fee income compounds as network grows.",
    thesis2:"Booking.com, Airbnb, and regional OTAs provide distribution. BRIDGE brand creates trust premium over unbranded guesthouses. Government and NGO corporate accounts provide anchor bookings.",
    risks:[{cat:'Franchise Quality Control',prob:'Medium',impact:'High',mit:'Quarterly inspections. Mystery guest programme. Certification requirements.'},{cat:'Property Operator Recruitment',prob:'Medium',impact:'Medium',mit:'Existing guesthouse operators as conversion target.'},{cat:'Competition',prob:'Medium',impact:'Medium',mit:'Quality and consistency as differentiation in fragmented market.'}],
    crossSectors:[5,9], crossNotes:'Hospitality Training Academy graduates (TO-03). Medical Tourism accommodation (TO-06).',
  },
  { id:'TO-09', sector:9, title:'Diaspora Roots Tourism Programme',
    desc:'Structured 8–14 day heritage and investment tours for diaspora visitors — combining ancestry, culture, and investment exposure.',
    fullDesc:"The Year of Return demonstrated that Ghana's diaspora has profound emotional demand for structured return experiences — but the available products are either superficial tourist packages or unstructured self-organized trips. BRIDGE designs a premium diaspora experience programme: ancestry research and cultural immersion, visits to BRIDGE portfolio ventures, investment briefings, and community engagement — converting tourism into investment intent and building the diaspora-Ghana relationship that BRIDGE's model depends on.",
    score:81, dims:[24,20,21,16], subDims:{pp:[9,8,8],sf:[8,7,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['Diaspora','Heritage','Investment'],
    mode:'INCUBATE', modeRationale:'BRIDGE directly designs and operates the programme as a strategic diaspora engagement tool. Revenue from programme fees plus downstream investment conversion.',
    pipeline:2, irr:'20–26%', structure:'Programme Fee + Investment Conversion', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"A diaspora investor who has stood in Elmina Castle, visited an Ejura agricultural hub, and met with BRIDGE's Ghana team is 5x more likely to invest than one who only read a brochure. The programme is a conversion funnel, not just a tourism product.",
    thesis2:"Programme fee ($3,000–5,000/person for 8 days) covers direct costs and generates margin. Downstream investment from converted visitors (target: 20% conversion rate at $10,000+ minimum) is the primary financial thesis.",
    risks:[{cat:'Programme Quality',prob:'Low',impact:'High',mit:'BRIDGE directly manages. Continuous improvement from participant feedback.'},{cat:'Investment Conversion',prob:'Medium',impact:'Medium',mit:'Conservative in financial model. Investment conversion is upside, not base case.'},{cat:'Seasonal Volume',prob:'Medium',impact:'Medium',mit:'Corporate team building and educational groups provide non-seasonal volume.'}],
    crossSectors:[2,6,9], crossNotes:'Diaspora Investment Gateway (F-03). Ejura Hub visits (A-05). Heritage site experiences (TO-01).',
  },

  // ── SECTOR 10 · ENERGY (additional) ──
  { id:'EN-06', sector:10, title:'Carbon Credit Programme',
    desc:'Ghana carbon market development — aggregating smallholder land use, cookstove, and renewable energy carbon credits for international buyers.',
    fullDesc:"Ghana has signed Article 6 agreements with Switzerland and is developing a national carbon market framework. Voluntary carbon credit opportunities are abundant: clean cookstove transition, reforestation, smallholder sustainable land management, and renewable energy — all generate measurable, verifiable carbon reductions. BRIDGE structures a carbon aggregation programme: methodology development, MRV (measurement, reporting, verification) infrastructure, and international credit sale through Verra and Gold Standard registries.",
    score:78, dims:[23,20,20,15], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Concept', region:'National', tags:['Carbon','Climate','Revenue'],
    mode:'CONNECT', modeRationale:'BRIDGE connects project developers, MRV providers, and international carbon buyers. Aggregation and facilitation role. Revenue from credit sale margin.',
    pipeline:1, irr:'20–26%', structure:'Credit Sale Margin', minTicket:'$150,000', horizon:'3–6 years',
    thesis:"Carbon credits from clean cookstoves ($5–8/tonne), reforestation ($10–15/tonne), and renewable energy ($3–5/tonne) create supplementary income for BRIDGE portfolio projects — turning environmental impact into financial return.",
    thesis2:"BRIDGE portfolio already creates carbon reductions across 12 sectors. The carbon programme monetizes what BRIDGE is already doing rather than requiring new activities. Incremental revenue at near-zero incremental cost.",
    risks:[{cat:'Carbon Market Volatility',prob:'High',impact:'Medium',mit:'Long-term buyer agreements. Diversified project portfolio.'},{cat:'MRV Cost',prob:'Medium',impact:'Medium',mit:'Shared MRV infrastructure across BRIDGE portfolio projects.'},{cat:'Ghana Article 6 Framework',prob:'Medium',impact:'Medium',mit:'Parallel voluntary market pathway independent of Article 6 negotiations.'}],
    crossSectors:[6,10,1], crossNotes:'Clean Cooking (EN-03). Reforestation (S6). Solar mini-grids (EN-01).',
  },
  { id:'EN-07', sector:10, title:'Solar Irrigation Pumping Systems',
    desc:'Solar-powered agricultural irrigation pumps replacing diesel — reducing input costs and enabling year-round farming.',
    fullDesc:"Ghana's smallholder farmers spend GHS 800–2,000/season on diesel for irrigation pumps. Solar pumping systems eliminate this recurrent cost after a 2–3 year payback period. BRIDGE structures a solar irrigation programme: PAYG financing for solar pump systems, cooperative group purchasing for bulk pricing, and maintenance service agreements. The systems integrate with BRIDGE's irrigation development programme (A-08) as the pumping infrastructure.",
    score:84, dims:[25,21,22,16], subDims:{pp:[9,8,8],sf:[8,8,5],fe:[9,7,6],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:4, stage:'Seed', region:'Northern Regions', tags:['Solar','Irrigation','Agriculture'],
    mode:'INVEST', modeRationale:'Asset-backed solar equipment finance. BRIDGE provides lending facility. PAYG repayment from agricultural income.',
    pipeline:2, irr:'16–20%', structure:'Asset-Backed PAYG', minTicket:'$150,000', horizon:'3–5 years',
    thesis:"Solar irrigation is the intersection of BRIDGE's energy and agricultural portfolios — it directly improves agricultural productivity while deploying clean energy infrastructure. The dual-sector impact multiplies the investment case.",
    thesis2:"USAID Power Africa and GOGLA Off-Grid Solar Fund both have active solar irrigation programmes in Ghana seeking private sector co-investors with agricultural distribution networks.",
    risks:[{cat:'System Reliability',prob:'Medium',impact:'High',mit:'Proven pump manufacturers. Warranty requirements. Maintenance programme.'},{cat:'Farmer Default',prob:'Medium',impact:'Medium',mit:'Cooperative deduction-at-source repayment. Crop insurance integration.'},{cat:'Technical Literacy',prob:'Medium',impact:'Low',mit:'Farmer training programme. Local technician certification.'}],
    crossSectors:[6,10], crossNotes:'Irrigation Infrastructure (A-08). Smallholder Aggregation (A-02). Mini-grid integration (EN-01).',
  },
  { id:'EN-08', sector:10, title:'Waste-to-Energy Plant',
    desc:'Municipal solid waste processing plant generating electricity and compost — circular economy solution for Accra\'s waste crisis.',
    fullDesc:"Accra generates 3,000+ tonnes of solid waste daily; only 60% is collected. The remainder ends up in illegal dumps, drains, and eventually the ocean. BRIDGE structures a waste-to-energy plant: waste sorting, organic digestion for biogas generation, and residual combustion for electricity. The plant provides gate fees from AMA waste tipping, electricity sales to ECG, and compost sales to agriculture.",
    score:73, dims:[22,18,19,14], subDims:{pp:[8,7,7],sf:[8,6,4],fe:[7,7,5],fs:[4,5,4]},
    tier:'Emerging', capMin:5, capMax:15, stage:'Concept', region:'Greater Accra', tags:['Waste','Energy','Circular'],
    mode:'INVEST', modeRationale:'Infrastructure investment with multiple revenue streams. BRIDGE co-invests with Green Climate Fund and European Climate Finance.',
    pipeline:1, irr:'10–14%', structure:'Blended Finance + Multi-Revenue', minTicket:'$1,000,000', horizon:'10–15 years',
    thesis:"Gate fee + electricity + compost creates a three-revenue-stream model that makes WtE viable at Ghana's waste economics. Green Climate Fund co-financing reduces private capital requirement by 30–40%.",
    thesis2:"AMA has existing budget for waste management contracts. ECG offtake agreement provides power revenue certainty. Agricultural compost demand from BRIDGE's cooperative network creates ready buyer.",
    risks:[{cat:'Waste Sorting',prob:'Medium',impact:'High',mit:'Community waste sorting programme. Mechanical sorting backup.'},{cat:'AMA Contract Reliability',prob:'High',impact:'High',mit:'Central government performance guarantee. Multilateral contract backing.'},{cat:'Technology Performance',prob:'Medium',impact:'High',mit:'Proven WtE technology from established European operator.'}],
    crossSectors:[1,6,10], crossNotes:'Agricultural compost offtake (S6). Urban infrastructure (S1). Electricity grid (EN-05).',
  },
  { id:'EN-09', sector:10, title:'Energy Access Finance Facility',
    desc:'Dedicated lending facility for energy access enterprises — mini-grids, PAYG solar, and clean cooking distribution.',
    fullDesc:"Ghana's energy access sector faces a capital gap: impact investors and DFIs provide equity but energy access enterprises need debt — working capital for inventory, asset finance for equipment, and growth capital for expansion. BRIDGE structures a dedicated energy access lending facility: GHS and USD debt products at 3–7 year tenors calibrated to energy access enterprise cash flows, with technical assistance embedded in the lending relationship.",
    score:80, dims:[24,20,21,15], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[8,7,6],fs:[5,5,5]},
    tier:'Core', capMin:3, capMax:8, stage:'Concept', region:'National', tags:['Energy Finance','Lending','Impact'],
    mode:'INVEST', modeRationale:'Lending facility investment. BRIDGE provides first-loss layer. Development finance partners provide senior debt. BRIDGE earns management fee and interest margin.',
    pipeline:1, irr:'12–16%', structure:'First-Loss Lending Facility', minTicket:'$500,000', horizon:'5–7 years',
    thesis:"Energy access enterprises have strong unit economics but no access to appropriate debt. BRIDGE's first-loss structure de-risks the senior lender position enough to attract OPIC, FMO, and PROPARCO participation.",
    thesis2:"Lending to BRIDGE's own energy portfolio companies provides captive initial loan book. Third-party energy access enterprises expand the portfolio and demonstrate market positioning.",
    risks:[{cat:'Borrower Default',prob:'Medium',impact:'Medium',mit:'First-loss structure absorbs initial losses. Conservative LTV.'},{cat:'Energy Sector Policy',prob:'Low',impact:'Medium',mit:'Diversified borrower base. Multi-product energy access coverage.'},{cat:'Currency Risk',prob:'Medium',impact:'Medium',mit:'Local currency lending where possible. FX-linked products for USD cost enterprises.'}],
    crossSectors:[2,10], crossNotes:'PAYG Solar Financing (EN-02). Mini-Grid Network (EN-01). Financial Inclusion infrastructure (S2).',
  },
  { id:'EN-10', sector:10, title:'Industrial Solar & Storage',
    desc:'Large-scale solar and battery storage installations for industrial and commercial clients — power reliability at competitive tariff.',
    fullDesc:"Ghana's industrial and commercial sector loses an estimated GHS 3B+ annually to power outages and voltage fluctuations. Large-scale rooftop and ground-mounted solar with battery storage can eliminate 80%+ of this disruption for industrial clients while delivering power at GHS 0.80–1.20/kWh vs. ECG's GHS 1.40–2.00/kWh industrial tariff. BRIDGE structures C&I solar installations: BRIDGE owns and operates the systems, industrial clients buy power under 10-year PPAs.",
    score:82, dims:[24,21,21,16], subDims:{pp:[8,8,8],sf:[9,8,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:2, capMax:8, stage:'Seed', region:'Greater Accra', tags:['Solar','Industrial','C&I'],
    mode:'INVEST', modeRationale:'Asset ownership with long-term PPA revenue. BRIDGE owns and operates systems. Industrial clients are creditworthy off-takers.',
    pipeline:2, irr:'14–18%', structure:'Asset Ownership + PPA Revenue', minTicket:'$300,000', horizon:'7–10 years',
    thesis:"10-year PPAs with large industrial clients are as close to guaranteed revenue as private investment gets in Ghana. Systems pay back in 5–7 years; BRIDGE earns pure margin for years 7–10 and asset value at refinancing.",
    thesis2:"BRIDGE manufacturing (S11) and food processing (S6) portfolio companies are anchor clients — providing the first 5MW of contracted demand before market development.",
    risks:[{cat:'Client Creditworthiness',prob:'Low',impact:'High',mit:'Corporate credit assessment. Parent company guarantees for multinationals.'},{cat:'ECG Tariff Changes',prob:'Low',impact:'Medium',mit:'PPAs contractually lock client into BRIDGE power for 10 years.'},{cat:'Technical Performance',prob:'Low',impact:'High',mit:'Performance warranty from EPC contractor. O&M service agreement.'}],
    crossSectors:[6,11,10], crossNotes:'Manufacturing sector clients (S11). Agricultural processing power (S6). Grid connection (EN-05).',
  },

  // ── SECTOR 11 · MANUFACTURING (additional) ──
  { id:'M-06', sector:11, title:'Food Processing Industrial Complex',
    desc:'Integrated food processing complex combining tomato paste, fruit juice, and cereal production for domestic and export markets.',
    fullDesc:"Ghana imports GHS 600M+ in processed food annually — tomato paste, fruit juices, and packaged cereals — that could be produced domestically from Ghana's agricultural base. BRIDGE structures a multi-line food processing complex: tomato paste (targeting Ghana's 120,000 tonne annual import), mango and pineapple juice, and maize-based cereals. The complex is co-located with agricultural aggregation infrastructure, reducing raw material cost 25–30% vs. independent processors.",
    score:82, dims:[25,21,21,15], subDims:{pp:[9,8,8],sf:[8,8,5],fe:[8,7,6],fs:[5,5,5]},
    tier:'Core', capMin:4, capMax:12, stage:'Concept', region:'Ashanti', tags:['Food Processing','Manufacturing','Import Substitution'],
    mode:'INVEST', modeRationale:'Agro-industrial investment. BRIDGE co-invests with government 1D1F (One District One Factory) programme. Local raw material supply chain reduces cost risk.',
    pipeline:1, irr:'14–18%', structure:'Industrial Equity + Government Co-Finance', minTicket:'$500,000', horizon:'5–8 years',
    thesis:"Import substitution at food processing scale creates triple impact: employment (500+ direct jobs), foreign exchange savings ($50M+/year), and farmer income (raw material demand for 5,000+ smallholders).",
    thesis2:"1D1F programme provides government land, utility connections, and partial equipment financing. BRIDGE's agricultural supply chain provides raw materials at competitive cost. Supermarket chain offtake agreements de-risk sales.",
    risks:[{cat:'Raw Material Quality',prob:'Medium',impact:'High',mit:'BRIDGE cooperative supply contracts. Quality standard enforcement.'},{cat:'Competing Imports',prob:'High',impact:'Medium',mit:'Quality premium over imported products. Government import substitution policy support.'},{cat:'Market Development',prob:'Medium',impact:'Medium',mit:'Supermarket chain pre-commitments. Institutional buyer contracts.'}],
    crossSectors:[6,11,12], crossNotes:'Agricultural aggregation supply (A-02). Ejura Hub integration (A-05). Export logistics (S12).',
  },
  { id:'M-07', sector:11, title:'Steel & Metal Fabrication',
    desc:'Domestic steel fabrication and metalwork for construction, agriculture, and manufacturing sectors — import substitution.',
    fullDesc:"Ghana imports 95%+ of its steel and metal fabrication needs. The construction boom, agricultural equipment demand, and manufacturing sector growth all require steel and fabricated metal products. BRIDGE invests in a steel fabrication facility: structural steel for construction, agricultural equipment (ploughs, threshers, irrigation frames), and custom fabrication for industrial clients. The facility serves BRIDGE's housing development (S8) and agricultural infrastructure (S6) as anchor clients.",
    score:76, dims:[23,19,20,14], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:3, capMax:8, stage:'Concept', region:'Accra / Tema', tags:['Steel','Fabrication','Manufacturing'],
    mode:'INVEST', modeRationale:'Manufacturing investment with BRIDGE portfolio as anchor clients. BRIDGE co-invests with experienced steel fabricator.',
    pipeline:1, irr:'14–18%', structure:'Manufacturing Equity', minTicket:'$500,000', horizon:'5–7 years',
    thesis:"BRIDGE construction and agricultural equipment pipeline provides Day 1 captive demand. Growing construction sector creates expanding external market. Import substitution logic applies — domestic fabrication at 15–25% lower cost than imported equivalents.",
    thesis2:"Agricultural equipment fabrication (ploughs, threshers) is a largely domestic market where local design advantage is significant. BRIDGE can develop Ghana-specific equipment designs optimised for local conditions.",
    risks:[{cat:'Steel Import Cost',prob:'High',impact:'High',mit:'Long-term steel import contracts. VIMCO and Wahome supply agreements.'},{cat:'Technical Skills',prob:'Medium',impact:'High',mit:'Partnership with experienced fabricator. Apprenticeship training programme.'},{cat:'Energy Cost',prob:'Medium',impact:'High',mit:'Industrial solar installation (EN-10) reduces energy cost.'}],
    crossSectors:[1,6,8], crossNotes:'Construction materials (HO-03). Agricultural equipment (A-08). Housing developments (HO-01).',
  },
  { id:'M-08', sector:11, title:'Cosmetics & Personal Care Manufacturing',
    desc:'Natural ingredient cosmetics manufacturing using Ghana\'s shea, coconut, and botanical resources for domestic and export markets.',
    fullDesc:"Ghana's shea butter, coconut oil, and botanical ingredients are exported raw and reimported as finished cosmetics at 10–20x the raw material price. BRIDGE invests in a natural cosmetics manufacturing facility: Ghana-origin formulations using BRIDGE-sourced shea (A-10), coconut, moringa, and neem — produced to EU and US cosmetic standards and sold domestically under premium brands and internationally through diaspora and natural beauty channels.",
    score:78, dims:[23,19,21,15], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,7,6],fs:[5,5,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'Accra', tags:['Cosmetics','Natural','Export'],
    mode:'INVEST', modeRationale:'Consumer goods manufacturing investment. BRIDGE provides development capital. Diaspora beauty market provides international distribution channel.',
    pipeline:1, irr:'18–24%', structure:'Consumer Brand Equity', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"African natural cosmetics is one of the fastest-growing segments in global beauty. Brands with authentic Ghana origin story and premium shea/botanical ingredients command $15–40/unit retail pricing in the diaspora and international market.",
    thesis2:"Ghana origin authenticity is a permanent competitive advantage that Chinese and European manufacturers cannot replicate. BRIDGE supply chain integration (shea from A-10) creates direct raw material cost advantage.",
    risks:[{cat:'Brand Development',prob:'Medium',impact:'High',mit:'Diaspora beauty influencer partnership. Authentic origin story marketing.'},{cat:'International Regulatory',prob:'Medium',impact:'Medium',mit:'EU Cosmetics Regulation compliance. FDA registration for US market.'},{cat:'Retail Distribution',prob:'Medium',impact:'High',mit:'Diaspora retail and e-commerce channels first. Mass retail after brand establishment.'}],
    crossSectors:[6,11], crossNotes:'Shea Value Chain (A-10). Natural ingredient supply chain (S6).',
  },
  { id:'M-09', sector:11, title:'Construction Prefab & Modular Systems',
    desc:'Prefabricated building components reducing construction time 40% and cost 20% for Ghana\'s mass housing demand.',
    fullDesc:"Ghana's 2M+ housing deficit cannot be closed with traditional construction methods — the pace is too slow and cost too high. Prefabricated building component manufacturing — wall panels, roof trusses, floor slabs, bathroom pods — can reduce construction time by 40% and cost by 15–20%. BRIDGE invests in a prefab manufacturing facility calibrated to Ghana's affordable housing specifications, with BRIDGE housing developments as the primary offtake channel.",
    score:79, dims:[23,20,21,15], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,8,5],fs:[5,5,5]},
    tier:'Core', capMin:2, capMax:6, stage:'Concept', region:'Greater Accra', tags:['Construction','Prefab','Manufacturing'],
    mode:'INVEST', modeRationale:'Manufacturing investment with BRIDGE housing portfolio as anchor offtake. BRIDGE co-invests alongside cement and steel suppliers.',
    pipeline:1, irr:'14–18%', structure:'Manufacturing Equity', minTicket:'$400,000', horizon:'4–6 years',
    thesis:"BRIDGE housing developments pipeline (500+ units in development) provides 12–18 months of guaranteed offtake at factory opening. Third-party housing developers expand the market thereafter.",
    thesis2:"Prefab construction time reduction (40%) translates directly to finance cost reduction on housing projects — making the investment in prefab manufacturing pay back through lower overall housing project cost.",
    risks:[{cat:'Demand Development',prob:'Low',impact:'High',mit:'BRIDGE housing pipeline provides captive demand. Developer adoption accelerates with cost evidence.'},{cat:'Design Standardization',prob:'Medium',impact:'Medium',mit:'BRIDGE housing standard design specifications drive production design.'},{cat:'Quality Perception',prob:'Medium',impact:'Medium',mit:'Show home demonstration. International prefab standards certification.'}],
    crossSectors:[8,11,1], crossNotes:'BRIDGE Housing Development (HO-01). Infrastructure construction (S1). Green Building Standards (HO-08).',
  },
  { id:'M-10', sector:11, title:'Packaging Manufacturing',
    desc:'Locally produced packaging for Ghana\'s food processing, pharmaceutical, and consumer goods sectors — import substitution.',
    fullDesc:"Ghana's food, pharmaceutical, and consumer goods manufacturers import 70%+ of their packaging — glass bottles, plastic containers, cartons, and flexible packaging — at significant cost and lead time disadvantage. BRIDGE invests in a packaging manufacturing facility: plastic bottles and containers, flexible packaging (pouches, sachets), and cardboard cartons — serving BRIDGE's food processing (M-06), pharmaceutical (M-01), and cosmetics (M-08) portfolio companies as anchor clients.",
    score:74, dims:[22,18,20,14], subDims:{pp:[7,8,7],sf:[8,6,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:2, capMax:6, stage:'Concept', region:'Tema', tags:['Packaging','Manufacturing','B2B'],
    mode:'INVEST', modeRationale:'B2B manufacturing investment with BRIDGE portfolio as anchor customers. Revenue from packaging supply contracts.',
    pipeline:1, irr:'14–18%', structure:'Manufacturing Equity', minTicket:'$400,000', horizon:'4–6 years',
    thesis:"BRIDGE portfolio companies (M-01, M-06, M-08) require significant annual packaging volumes. Vertical integration of packaging supply within BRIDGE's portfolio creates cost savings for all portfolio companies while generating standalone returns.",
    thesis2:"Domestic packaging reduces lead times from 8–12 weeks (import) to 1–2 weeks, enabling just-in-time production for BRIDGE portfolio companies and third-party FMCG manufacturers.",
    risks:[{cat:'Petrochemical Feedstock',prob:'High',impact:'High',mit:'Long-term resin supply contracts. Recycled content for cost reduction.'},{cat:'Customer Concentration',prob:'Medium',impact:'High',mit:'Diversify to third-party FMCG manufacturers as scale builds.'},{cat:'Recycled Content Compliance',prob:'Medium',impact:'Medium',mit:'EPR compliance planning. Recycled resin sourcing from M-04.'}],
    crossSectors:[11,6,3], crossNotes:'Pharmaceutical packaging (M-01). Food processing packaging (M-06). Plastic recycling feedstock (M-04).',
  },

  // ── SECTOR 12 · LOGISTICS (additional) ──
  { id:'L-06', sector:12, title:'Inland Container Depot',
    desc:'Dry port facility serving Northern Ghana — reducing transport costs for landlocked importers and exporters.',
    fullDesc:"Northern Ghana is 500km+ from Tema Port, making import and export prohibitively expensive for Northern businesses. An Inland Container Depot (ICD) in Kumasi or Tamale would allow importers to clear customs inland, receive containers directly, and reduce transport costs by 30–40%. BRIDGE structures an ICD investment: bonded warehouse, customs examination facility, and container handling equipment — under GRA customs partnership.",
    score:77, dims:[23,19,20,15], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:3, capMax:8, stage:'Concept', region:'Ashanti / Northern', tags:['Logistics','Customs','ICD'],
    mode:'INVEST', modeRationale:'Logistics infrastructure investment. BRIDGE co-invests with GRA and port operator. Revenue from handling fees and bonded warehouse.',
    pipeline:1, irr:'12–16%', structure:'Infrastructure Equity + Handling Fees', minTicket:'$500,000', horizon:'5–8 years',
    thesis:"Northern Ghana's import volume alone justifies an ICD. BRIDGE's agricultural export pipeline (S6) adds the outbound volume that makes the bidirectional economics compelling for shipping lines.",
    thesis2:"GRA partnership provides customs facilitation and regulatory support. AfDB transport infrastructure programme has Northern Ghana coverage that can co-finance facility development.",
    risks:[{cat:'GRA Approval',prob:'Medium',impact:'High',mit:'GRA MOU before investment. Compliance-first approach.'},{cat:'Volume Buildout',prob:'Medium',impact:'High',mit:'BRIDGE portfolio company import volumes provide anchor throughput.'},{cat:'Competition from Tema',prob:'Low',impact:'Medium',mit:'Distance and cost advantage are structural for Northern businesses.'}],
    crossSectors:[6,11,12], crossNotes:'Agricultural export (S6). Manufacturing import logistics (S11). Port Freight Aggregation (L-03).',
  },
  { id:'L-07', sector:12, title:'Digital Freight Matching Platform',
    desc:'Tech platform matching cargo owners with available truck capacity — reducing Ghana\'s 60% empty return run problem.',
    fullDesc:"Ghana's trucking sector operates at approximately 40% average utilization — trucks regularly return empty from deliveries because there is no system for matching available capacity with cargo. BRIDGE builds a freight matching platform: real-time truck location, available capacity listing, cargo booking, and payment integration. The platform reduces empty runs, lowers effective freight rates for cargo owners, and increases trucker income.",
    score:80, dims:[24,20,21,15], subDims:{pp:[8,8,8],sf:[8,8,4],fe:[9,7,5],fs:[5,5,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Freight','Platform','Logistics'],
    mode:'INCUBATE', modeRationale:'BRIDGE builds the platform and seeds with BRIDGE portfolio company freight volume. Asset-light model — BRIDGE does not own trucks.',
    pipeline:1, irr:'22–28%', structure:'Platform Transaction Fee', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"Freight matching platforms achieve winner-take-most dynamics as liquidity builds. BRIDGE portfolio freight volume provides the seed demand that attracts the trucker supply side. Transaction fees compound with volume.",
    thesis2:"Ghana Shippers Authority endorsement would provide institutional credibility and access to the formal shipper directory. GIPC investment promotion support reduces barrier to trucker onboarding.",
    risks:[{cat:'Trucker Adoption',prob:'Medium',impact:'High',mit:'Direct income increase demonstration. Simple WhatsApp interface.'},{cat:'Payment Trust',prob:'Medium',impact:'High',mit:'Escrow payment model. Trucker rating system.'},{cat:'Competition',prob:'Medium',impact:'Medium',mit:'First-mover advantage. BRIDGE portfolio volume creates network advantage.'}],
    crossSectors:[6,12,11], crossNotes:'Agricultural transport (S6). Manufacturing logistics (S11). Cold chain fleet integration (L-02).',
  },
  { id:'L-08', sector:12, title:'Bonded Warehousing Network',
    desc:'Customs-bonded warehouse network for importers — deferred duty payment and professional inventory management.',
    fullDesc:"Ghana's importers face immediate customs duty payment on arrival, creating working capital pressure that drives cash flow constraints across the import economy. Bonded warehouses allow deferred duty payment — goods enter bond, duty paid when goods leave for sale — providing 30–90 days of working capital relief. BRIDGE structures a bonded warehouse network: 5 GRA-licensed facilities in Accra, Tema, Kumasi, and Takoradi with professional inventory management and integrated trade finance.",
    score:75, dims:[22,19,20,14], subDims:{pp:[7,8,7],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:2, capMax:6, stage:'Concept', region:'National', tags:['Warehousing','Bonded','Trade'],
    mode:'INVEST', modeRationale:'Real estate and logistics investment. BRIDGE owns facilities. Revenue from warehousing fees and integrated trade finance margin.',
    pipeline:1, irr:'14–18%', structure:'Warehouse Revenue + Finance Margin', minTicket:'$300,000', horizon:'4–6 years',
    thesis:"Bonded warehousing + trade finance is a superior combined product — BRIDGE provides the storage and the working capital, earning revenue on both. The combination creates stickier client relationships than either standalone.",
    thesis2:"BRIDGE Trade Finance Platform (L-05) is the natural finance arm for bonded warehouse clients — the two products are designed as an integrated offering.",
    risks:[{cat:'GRA Licensing',prob:'Low',impact:'High',mit:'Standard GRA bonded facility licensing process. Legal support.'},{cat:'Theft / Security',prob:'Medium',impact:'High',mit:'Professional security. CCTV. Insurance coverage.'},{cat:'Utilization',prob:'Medium',impact:'Medium',mit:'BRIDGE import network provides anchor utilization.'}],
    crossSectors:[2,6,12], crossNotes:'Trade Finance Platform (L-05). Agricultural import storage (S6). Pharmaceutical bonded storage (H-05).',
  },
  { id:'L-09', sector:12, title:'Urban Mobility Solutions',
    desc:'Tech-enabled ride-hailing and bus rapid transit integration for Accra\'s transport crisis.',
    fullDesc:"Accra spends an estimated 40 million person-hours per week in traffic — a productivity loss equivalent to GHS 2B+ annually. The combination of inefficient trotro routing, absent mass transit, and no real-time traffic intelligence creates the gridlock. BRIDGE invests in urban mobility solutions: an Accra-specific ride-hailing platform optimized for trotro-to-vehicle multimodal trips, real-time traffic data integration, and partnership with the government BRT (Bus Rapid Transit) development programme.",
    score:73, dims:[22,18,19,14], subDims:{pp:[8,7,7],sf:[8,6,4],fe:[7,7,5],fs:[4,5,4]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'Greater Accra', tags:['Urban Mobility','Transport','Platform'],
    mode:'CONNECT', modeRationale:'BRIDGE connects transport operators, DVLA, and government BRT programme. Platform facilitation role. Revenue from transaction fees.',
    pipeline:1, irr:'18–24%', structure:'Platform Transaction Fee', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"Accra's transport problem is data and coordination — not infrastructure. Real-time fleet management, passenger demand prediction, and route optimization can materially improve throughput on existing road infrastructure.",
    thesis2:"Government BRT programme investment creates public infrastructure that BRIDGE's platform can ride — digital ticketing and passenger information integration adds value without competing with government investment.",
    risks:[{cat:'Uber/Bolt Competition',prob:'High',impact:'Medium',mit:'Trotro integration creates unique product that global platforms don\'t offer.'},{cat:'Driver Adoption',prob:'Medium',impact:'High',mit:'Driver income increase demonstration. Simple interface.'},{cat:'Traffic Data',prob:'Medium',impact:'Medium',mit:'Partnership with Google Maps and HERE for base data layer.'}],
    crossSectors:[4,12], crossNotes:'Smart City Platform (T-08). EV Fleet Transition (L-04).',
  },
  { id:'L-10', sector:12, title:'Logistics Training Academy',
    desc:'Vocational training for logistics, warehousing, and supply chain professionals — Ghana\'s fastest-growing employment sector.',
    fullDesc:"Ghana's rapidly expanding logistics sector faces severe human capital constraints: forklift operators, warehouse managers, customs brokers, supply chain planners. BRIDGE structures a logistics training academy in partnership with CILT (Chartered Institute of Logistics and Transport) Ghana: certificate and diploma programmes in warehousing, freight forwarding, customs, and supply chain management — with guaranteed placement in BRIDGE's logistics portfolio companies.",
    score:78, dims:[23,20,20,15], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[8,7,5],fs:[5,5,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Concept', region:'Tema / Accra', tags:['Logistics','Training','Skills'],
    mode:'CONNECT', modeRationale:'BRIDGE connects CILT, logistics employers, and training infrastructure. Revenue from programme fees and employer placement contracts.',
    pipeline:1, irr:'16–20%', structure:'Training Fees + Placement Revenue', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"BRIDGE logistics portfolio companies (L-01 through L-09) need trained logistics professionals. The Academy solves BRIDGE's own talent gap while generating standalone fee revenue.",
    thesis2:"CILT certification is internationally recognized — Ghana logistics professionals with CILT credentials can work regionally and internationally, commanding wage premiums that drive programme demand.",
    risks:[{cat:'Employer Commitment',prob:'Low',impact:'High',mit:'BRIDGE portfolio companies as guaranteed placement partners.'},{cat:'CILT Partnership',prob:'Low',impact:'High',mit:'CILT Ghana chapter already established. MOU in development.'},{cat:'Facility',prob:'Low',impact:'Medium',mit:'Co-location with ICD (L-06) or existing BRIDGE facility.'}],
    crossSectors:[5,12], crossNotes:'TVET system integration (S5). Workforce Development Marketplace (E-05).',
  },

  // ── SECTOR 1 · INFRASTRUCTURE (final additions) ──
  { id:'I-11', sector:1, title:'Digital Address System Rollout',
    desc:'Implementation and commercial activation of GhanaPostGPS — enabling e-commerce, emergency services, and financial inclusion.',
    fullDesc:"GhanaPostGPS has assigned digital addresses to every location in Ghana but adoption remains below 5%. The system's potential is transformative — e-commerce delivery, emergency services location, financial KYC, and utility billing all depend on addressability. BRIDGE partners with Ghana Post to commercialize the GhanaPostGPS system: API integration for e-commerce and fintech platforms, public awareness campaign, and digital address verification services for financial institutions.",
    score:74, dims:[22,19,19,14], subDims:{pp:[8,7,7],sf:[8,7,4],fe:[7,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Digital Infrastructure','Address','GovTech'],
    mode:'CONNECT', modeRationale:'BRIDGE connects Ghana Post, fintech platforms, and e-commerce operators. API commercialization and adoption role.',
    pipeline:1, irr:'18–22%', structure:'API Revenue Share', minTicket:'$50,000', horizon:'2–4 years',
    thesis:"Digital addressing is enabling infrastructure for every BRIDGE portfolio platform — last-mile delivery, wallet KYC, health worker location, agriculture field mapping. BRIDGE activating GhanaPostGPS benefits the entire portfolio.",
    thesis2:"API revenue model: GHS 0.10–0.50 per address verification query. At 5M queries/month across BRIDGE portfolio integrations alone: GHS 500K–2.5M/month.",
    risks:[{cat:'Ghana Post Engagement',prob:'Medium',impact:'High',mit:'Government mandate for GhanaPostGPS creates incentive for commercialization partnership.'},{cat:'Adoption',prob:'High',impact:'Medium',mit:'BRIDGE portfolio mandates use. Financial institution KYC requirement.'}],
    crossSectors:[1,2,12], crossNotes:'KYC for financial inclusion (S2). Delivery address for logistics (S12).',
  },
  { id:'I-12', sector:1, title:'Disaster Risk Reduction Infrastructure',
    desc:'Early warning systems and climate adaptation infrastructure for flood-prone and drought-vulnerable communities.',
    fullDesc:"Ghana loses GHS 2B+ annually to climate-related disasters — floods in the South, drought in the North. Early warning systems and flood-resistant infrastructure can reduce these losses by 60–70%. BRIDGE structures a disaster risk programme: weather station networks, river gauge sensors, SMS early warning systems for at-risk communities, and flood-resistant infrastructure designs for district health facilities and schools.",
    score:72, dims:[22,18,18,14], subDims:{pp:[8,7,7],sf:[8,6,4],fe:[7,7,4],fs:[4,5,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Climate','Disaster','Infrastructure'],
    mode:'INVEST', modeRationale:'Blended finance with Green Climate Fund and UNDP disaster risk reduction programmes.',
    pipeline:1, irr:'8–12%', structure:'Blended Finance + Government Contract', minTicket:'$200,000', horizon:'5–8 years',
    thesis:"Green Climate Fund and UNDP disaster risk reduction programmes provide 50–60% co-financing. BRIDGE provides private capital and implementation capacity that government programmes lack.",
    thesis2:"Parametric insurance pilots linked to early warning systems create a commercial revenue stream from insurance premium sharing.",
    risks:[{cat:'Government Partnership',prob:'Medium',impact:'High',mit:'NDPC engagement from inception. Multi-agency coordination.'},{cat:'Data Reliability',prob:'Medium',impact:'Medium',mit:'Redundant sensor networks. Regional meteorological partnership.'}],
    crossSectors:[1,3,6], crossNotes:'Agricultural climate protection (S6). Health facility resilience (S3).',
  },
  { id:'I-13', sector:1, title:'Community Recreation Infrastructure',
    desc:'Multipurpose community centres, sports pitches, and recreational facilities for peri-urban communities.',
    fullDesc:"Ghana's rapidly growing peri-urban communities have almost no recreational and community infrastructure. BRIDGE structures a community facilities programme: standardized multipurpose centres combining sports pitch, community hall, WiFi hub, and health post — built under district assembly PPP with community management. The facilities serve as physical infrastructure for multiple BRIDGE programmes (health, education, digital skills).",
    score:71, dims:[21,18,18,14], subDims:{pp:[8,7,6],sf:[8,6,4],fe:[7,7,4],fs:[4,5,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Community','Recreation','Infrastructure'],
    mode:'CONNECT', modeRationale:'BRIDGE connects district assemblies, private capital, and community management. PPP concession model.',
    pipeline:1, irr:'8–12%', structure:'PPP Availability Payment', minTicket:'$100,000', horizon:'7–10 years',
    thesis:"Community infrastructure is a long-duration asset with stable government availability payment revenue. Social impact is direct and measurable. DACF infrastructure budget creates co-financing mechanism.",
    thesis2:"Multipurpose design enables BRIDGE sports academy (CR-03), digital skills hub (T-01), and community health post (H-01) to co-locate — maximizing return per square metre.",
    risks:[{cat:'DACF Availability',prob:'Medium',impact:'High',mit:'Multi-source design. Donor funding for initial sites.'},{cat:'Community Governance',prob:'Medium',impact:'Medium',mit:'Community management committee training.'}],
    crossSectors:[3,5,7], crossNotes:'Sports academies (CR-03). Community health (H-01). Digital skills training (S5).',
  },

  // ── SECTOR 2 · FINANCIAL INCLUSION (final additions) ──
  { id:'F-13', sector:2, title:'Healthcare Finance Products',
    desc:'Medical expense finance — NHIS co-payment credit, medical travel loans, and hospital bill payment plans.',
    fullDesc:"Out-of-pocket health expenditure pushes 10%+ of Ghanaian households into poverty annually. NHIS covers primary care but co-payments, specialist fees, and medicines create gaps. BRIDGE structures healthcare finance products: NHIS co-payment credit (GHS 50–500), medical travel advance (for tertiary referrals), and hospital bill payment plans negotiated with partner hospitals. Distributed through CHW network and hospital social work units.",
    score:81, dims:[24,20,21,16], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[9,7,5],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Concept', region:'National', tags:['HealthFinance','Credit','NHIS'],
    mode:'INVEST', modeRationale:'Lending product with hospital distribution partnership. BRIDGE provides lending facility. Hospitals provide distribution and payment enforcement.',
    pipeline:1, irr:'18–22%', structure:'Lending Margin', minTicket:'$200,000', horizon:'2–4 years',
    thesis:"Healthcare finance is high-frequency, emotionally high-stakes, and has near-100% repayment intent. Hospital partnership provides built-in enforcement — patients cannot discharge without payment arrangement.",
    thesis2:"NHIS data on enrolled members provides creditworthiness signals. Hospital MOU provides point-of-service distribution at zero marketing cost.",
    risks:[{cat:'Collection',prob:'Low',impact:'High',mit:'Hospital deduction. Employment verification for formal sector.'},{cat:'Medical Cost Inflation',prob:'Medium',impact:'Medium',mit:'Conservative credit limits. Insurance integration.'}],
    crossSectors:[2,3], crossNotes:'Market Microinsurance health component (F-05). Telemedicine (H-06).',
  },
  { id:'F-14', sector:2, title:'Green Finance Products',
    desc:'Climate-linked financial products — green mortgages, solar asset finance, and climate savings bonds.',
    fullDesc:"Ghana's financial sector has almost no climate-linked products. Green mortgages (preferential rates for certified green buildings), solar asset finance (lower rate for solar investments), and climate savings bonds (retail savings linked to green investments) all represent market opportunities that BRIDGE can pioneer. BRIDGE structures Ghana's first green finance product suite in partnership with ESG-mandated DFI capital.",
    score:76, dims:[23,19,20,14], subDims:{pp:[8,7,8],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Green Finance','Climate','ESG'],
    mode:'INVEST', modeRationale:'Financial product development with DFI green capital. BRIDGE structures products; DFI provides concessional capital.',
    pipeline:1, irr:'14–18%', structure:'Product Spread + Management Fee', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"ESG capital from European DFIs is searching for bankable green finance products in West Africa. BRIDGE provides the product design and distribution infrastructure that converts DFI interest into deployed capital.",
    thesis2:"Green premium on mortgages and solar finance (0.5–1.5% rate reduction) is funded by concessional DFI capital. BRIDGE earns the spread between DFI rate and market rate.",
    risks:[{cat:'Green Certification',prob:'Medium',impact:'Medium',mit:'GES and GhanaPostGPS standard green criteria.'},{cat:'DFI Disbursement',prob:'Medium',impact:'High',mit:'Pre-agreed disbursement schedule. Multiple DFI relationships.'}],
    crossSectors:[2,8,10], crossNotes:'Green Building (HO-08). Solar Finance (EN-02). Housing development (HO-01).',
  },
  { id:'F-15', sector:2, title:'Cross-Border Payment Infrastructure',
    desc:'Affordable cross-border payment rails for ECOWAS trade — reducing Ghana\'s 8–12% cross-border transfer costs.',
    fullDesc:"Ghana's cross-border trade with Togo, Burkina Faso, Ivory Coast, and Nigeria relies on informal hawala networks and expensive bank wires. Cross-border MoMo transfers cost 8–12% vs. 1–3% for comparable global services. BRIDGE structures a cross-border payment partnership: leveraging Ghana Interbank Payment and Settlement Systems (GHIPSS) and ECOWAS payment protocol to enable affordable cross-border transfers for traders and SMEs.",
    score:79, dims:[24,20,20,15], subDims:{pp:[8,8,8],sf:[8,7,5],fe:[8,7,5],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Concept', region:'National', tags:['Payments','Cross-Border','ECOWAS'],
    mode:'CONNECT', modeRationale:'BRIDGE connects GHIPSS, MNOs, and regional payment networks. Revenue from transfer fee margin.',
    pipeline:1, irr:'20–26%', structure:'Transfer Fee Margin', minTicket:'$150,000', horizon:'2–4 years',
    thesis:"ECOWAS trade volumes between Ghana and neighbours are $8B+ annually. Reducing transfer costs from 8–12% to 2–3% frees $500M+ of working capital annually for traders. BRIDGE earns 0.5–1% of redirected volume.",
    thesis2:"GHIPSS mandate to enable ECOWAS payment interoperability creates regulatory tailwind. AfDB West Africa regional integration programme provides co-financing.",
    risks:[{cat:'Regulatory Complexity',prob:'High',impact:'High',mit:'Multi-country regulatory engagement. GHIPSS lead partnership.'},{cat:'FX Management',prob:'Medium',impact:'High',mit:'FX treasury management. Central bank relationships.'}],
    crossSectors:[2,6,12], crossNotes:'Agricultural export payment (S6). Freight payment (L-03).',
  },
  { id:'F-16', sector:2, title:'Impact Investment Measurement Platform',
    desc:'Standardized impact measurement and reporting infrastructure for Ghana\'s impact investment ecosystem.',
    fullDesc:"Ghana's growing impact investment sector lacks standardized measurement — every fund and enterprise reports impact differently, making comparison and aggregation impossible. BRIDGE builds the measurement infrastructure: IRIS+ aligned metrics for all 12 BRIDGE sectors, third-party verification partnerships, and a public-facing impact dashboard that reports BRIDGE portfolio outcomes in real time. The platform is offered as a service to other Ghana impact investors.",
    score:73, dims:[22,18,19,14], subDims:{pp:[8,7,7],sf:[8,7,4],fe:[7,7,5],fs:[4,5,4]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Impact','Measurement','Platform'],
    mode:'INCUBATE', modeRationale:'BRIDGE builds and operates the platform for own portfolio first, then licenses to other impact investors.',
    pipeline:1, irr:'16–20%', structure:'SaaS Licensing', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"Impact measurement is a DFI requirement for all co-investments. BRIDGE providing measurement infrastructure reduces DFI transaction costs and accelerates capital deployment to BRIDGE portfolio.",
    thesis2:"Ghana impact investment market is growing; standardized measurement creates the credibility infrastructure that attracts additional DFI participation to the entire market.",
    risks:[{cat:'Adoption',prob:'Medium',impact:'Medium',mit:'BRIDGE portfolio mandate creates initial users.'},{cat:'Data Quality',prob:'Medium',impact:'High',mit:'Third-party verification. IRIS+ standard alignment.'}],
    crossSectors:[2,4], crossNotes:'BRIDGE portfolio monitoring. Technology infrastructure (S4).',
  },

  // ── SECTOR 3 · HEALTH (final additions) ──
  { id:'H-11', sector:3, title:'Nutrition & Food Security Programme',
    desc:'Integrated nutrition intervention combining agriculture, health, and education to address Ghana\'s stunting crisis.',
    fullDesc:"Ghana's child stunting rate is 19% — 600,000 children with permanently impaired cognitive development due to early malnutrition. The causes are nutritional, agricultural, and behavioural. BRIDGE structures an integrated programme: diversified food production for nutritional density (not just caloric yield), nutrition education through CHW network, and school feeding programme integration with BRIDGE agricultural supply chain.",
    score:84, dims:[25,21,22,16], subDims:{pp:[10,8,7],sf:[8,8,5],fe:[9,7,6],fs:[5,6,5]},
    tier:'Core', capMin:1, capMax:4, stage:'Concept', region:'Northern Regions', tags:['Nutrition','Food Security','Impact'],
    mode:'INVEST', modeRationale:'Impact investment with WFP, UNICEF, and Ghana School Feeding Programme co-financing.',
    pipeline:1, irr:'10–14%', structure:'Blended Finance + Government Contract', minTicket:'$200,000', horizon:'4–6 years',
    thesis:"School feeding programme integration provides GHS contract revenue while delivering nutrition impact. BRIDGE agricultural supply chain provides food at competitive cost. WFP co-financing de-risks the programme.",
    thesis2:"Ghana School Feeding Programme budget is GHS 400M+/year. BRIDGE positions as supply chain and programme management partner for district-level delivery.",
    risks:[{cat:'Government Contract Reliability',prob:'Medium',impact:'High',mit:'Multi-year contract. Payment escrow where possible.'},{cat:'Food Supply Chain',prob:'Medium',impact:'Medium',mit:'BRIDGE agricultural cooperatives as primary supply source.'}],
    crossSectors:[3,6,5], crossNotes:'Agricultural supply (S6). School feeding (S5). CHW nutrition monitoring (H-01).',
  },
  { id:'H-12', sector:3, title:'HIV/AIDS Care & Support Services',
    desc:'Integrated HIV prevention, testing, treatment adherence, and livelihood support for people living with HIV.',
    fullDesc:"Ghana has 340,000+ people living with HIV; treatment coverage is 70% but adherence is 60%, leaving 130,000+ people not achieving viral suppression. BRIDGE structures an integrated HIV programme: community-based testing and linkage to care, treatment adherence support through CHW network, and livelihood programme for PLHIV who face employment discrimination. Global Fund Round 7 provides co-financing.",
    score:80, dims:[24,20,21,15], subDims:{pp:[10,8,6],sf:[8,7,5],fe:[8,7,6],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Concept', region:'National', tags:['HIV','Health','Impact'],
    mode:'INVEST', modeRationale:'Impact investment with Global Fund and PEPFAR co-financing. BRIDGE provides implementation capacity.',
    pipeline:1, irr:'8–12%', structure:'Blended Finance + Global Fund Grant', minTicket:'$150,000', horizon:'4–6 years',
    thesis:"Global Fund Round 7 Ghana allocation provides GHS-equivalent grant co-financing. BRIDGE provides the private sector implementation structure that government HIV programme cannot self-deliver at community level.",
    thesis2:"Livelihood component creates commercial revenue stream from PLHIV-operated enterprises integrated into BRIDGE supply chains.",
    risks:[{cat:'Stigma',prob:'High',impact:'Medium',mit:'Confidential community-based testing. Destigmatisation programme.'},{cat:'Global Fund Disbursement',prob:'Medium',impact:'High',mit:'PEPFAR bridge funding. Multi-donor design.'}],
    crossSectors:[2,3,5], crossNotes:'Microinsurance coverage (F-05). CHW Platform (H-01). Vocational skills (E-09).',
  },
  { id:'H-13', sector:3, title:'Environmental Health Services',
    desc:'Integrated vector control, water quality testing, and environmental health surveillance for urban and peri-urban Ghana.',
    fullDesc:"Malaria costs Ghana GHS 3B+ annually in treatment and productivity loss; contaminated water kills 13,000 Ghanaians per year. Environmental health interventions — vector control, water quality testing, and environmental surveillance — are proven preventative tools but systematically underfunded. BRIDGE structures environmental health services: mosquito control programmes for urban communities, water testing kits and laboratories for rural areas, and environmental health data systems for district health offices.",
    score:75, dims:[22,19,20,14], subDims:{pp:[8,7,7],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:1, capMax:3, stage:'Concept', region:'National', tags:['Environmental Health','Vector Control','Water'],
    mode:'CONNECT', modeRationale:'BRIDGE connects GHS, district health offices, and service providers. Programme management and technology role.',
    pipeline:1, irr:'10–14%', structure:'Government Contract + Programme Fee', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"Environmental health has some of the highest ROI of any health investment — every GHS 1 invested in malaria prevention saves GHS 8–12 in treatment costs. GHS contracts available for vector control service delivery.",
    thesis2:"WHO and USAID PMI (Presidents Malaria Initiative) provide co-financing for vector control programmes in Ghana.",
    risks:[{cat:'Government Procurement',prob:'Medium',impact:'High',mit:'PMI and WHO direct implementation agreements as backup.'},{cat:'Technical Capacity',prob:'Medium',impact:'Medium',mit:'International vector control partner.'}],
    crossSectors:[1,3,6], crossNotes:'Water Infrastructure (I-02). Agricultural pest management (S6).',
  },

  // ── SECTOR 4 · TECHNOLOGY (final additions) ──
  { id:'T-11', sector:4, title:'Blockchain Supply Chain Traceability',
    desc:'Distributed ledger traceability for cocoa, shea, and pharmaceutical supply chains — enabling premium certification and consumer trust.',
    fullDesc:"International buyers of Ghanaian cocoa, shea, and pharmaceuticals increasingly require documented supply chain traceability — from farm to buyer, verified and immutable. Blockchain provides the infrastructure: each supply chain transaction recorded on a distributed ledger, QR-code accessible by international buyers. BRIDGE builds traceability infrastructure for the cocoa, shea, and pharmaceutical supply chains in its portfolio.",
    score:74, dims:[22,19,19,14], subDims:{pp:[7,7,8],sf:[8,7,4],fe:[7,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Blockchain','Traceability','Supply Chain'],
    mode:'INCUBATE', modeRationale:'BRIDGE builds traceability infrastructure for own portfolio first. Licensing to external supply chains.',
    pipeline:1, irr:'18–24%', structure:'SaaS + Certification Premium Share', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"Cocoa traceability premium is $50–100/tonne. Shea premium is $200–500/tonne. Pharmaceutical traceability is a regulatory requirement. BRIDGE earns certification premium share on every traced tonne.",
    thesis2:"EU Deforestation Regulation (2024) mandates supply chain traceability for cocoa and other commodities. Compliance deadline creates forced adoption.",
    risks:[{cat:'Farmer Adoption',prob:'Medium',impact:'High',mit:'Simple smartphone QR code interface. Cooperative-level aggregation.'},{cat:'Buyer Integration',prob:'Low',impact:'Medium',mit:'International buyer demand drives adoption.'}],
    crossSectors:[4,6,3], crossNotes:'Cocoa supply chain (A-07). Shea (A-10). Pharmaceutical supply chain (H-05).',
  },
  { id:'T-12', sector:4, title:'Digital Government Identity Integration',
    desc:'GhanaCard integration into financial, health, and social services — enabling truly digital public service delivery.',
    fullDesc:"Ghana's GhanaCard (National ID) has 16M+ registered cards but integration into service delivery is fragmented — different systems in health, finance, education, and social protection all require separate registration. BRIDGE structures a digital identity integration programme: GhanaCard API integration into BRIDGE portfolio platforms (wallet, health, education) and advocacy with NITA for cross-sector interoperability standards.",
    score:76, dims:[23,19,20,14], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Digital ID','GovTech','Integration'],
    mode:'CONNECT', modeRationale:'BRIDGE connects NITA, NIA, and private sector platforms. API integration and standards advocacy role.',
    pipeline:1, irr:'16–20%', structure:'API Revenue + Integration Fees', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"GhanaCard integration eliminates duplicate KYC across BRIDGE portfolio — reducing customer onboarding cost 60–70% for every BRIDGE platform. Portfolio-wide efficiency gain justifies investment independently of standalone revenue.",
    thesis2:"NITA digital identity API commercialization programme creates revenue-sharing model for private sector integrators.",
    risks:[{cat:'NITA Engagement',prob:'Medium',impact:'High',mit:'Formal MOU with NITA. National Digital Transformation policy alignment.'},{cat:'Data Privacy',prob:'Medium',impact:'High',mit:'Ghana Data Protection Act compliance. Minimal data collection principle.'}],
    crossSectors:[1,2,3], crossNotes:'Financial KYC (S2). Health patient ID (S3). Social protection targeting.',
  },

  // ── SECTOR 5 · EDUCATION (final additions) ──
  { id:'E-11', sector:5, title:'Technical University Partnerships',
    desc:'Applied science and engineering research partnerships between Ghanaian technical universities and BRIDGE portfolio companies.',
    fullDesc:"Ghana's technical universities — KNUST, TTU, UMAT — have strong engineering and applied science departments that are underutilized by industry. BRIDGE structures applied research contracts: KNUST electrical engineering for renewable energy systems, UMAT mining engineering for manufacturing materials, TTU mechanical engineering for agro-processing equipment design. Each contract generates research output with practical application in BRIDGE portfolio companies.",
    score:75, dims:[22,19,20,14], subDims:{pp:[8,7,7],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['University','Research','Applied Science'],
    mode:'CONNECT', modeRationale:'BRIDGE connects technical universities and portfolio companies. Research contract facilitation. Revenue from contract management fee.',
    pipeline:1, irr:'14–18%', structure:'Research Contract + IP Share', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"Applied research contracts solve real portfolio company problems while building university research capacity. IP outcomes have commercial value in BRIDGE portfolio companies.",
    thesis2:"GIZ and FCDO fund industry-university linkage programmes — BRIDGE captures co-financing while creating proprietary applied research outputs.",
    risks:[{cat:'University Bureaucracy',prob:'High',impact:'Medium',mit:'Vice-Chancellor level buy-in. Clear IP agreement templates.'},{cat:'Research Quality',prob:'Medium',impact:'Medium',mit:'Joint supervision with international academic partners.'}],
    crossSectors:[4,10,11], crossNotes:'Technology innovation (S4). Renewable energy research (S10). Manufacturing materials (S11).',
  },
  { id:'E-12', sector:5, title:'Financial Literacy National Programme',
    desc:'Mass financial literacy programme delivered through schools, community radio, and BRIDGE platform channels.',
    fullDesc:"Ghana's financial literacy rate is below 30% — directly limiting adoption of BRIDGE's financial inclusion products. BRIDGE structures a national financial literacy programme: curriculum integration in secondary schools, community radio content in local languages, and digital micro-modules through BRIDGE platform channels. The programme is foundational infrastructure for every other financial inclusion venture in BRIDGE's portfolio.",
    score:77, dims:[23,19,20,15], subDims:{pp:[9,8,6],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Financial Literacy','Education','Community'],
    mode:'CONNECT', modeRationale:'BRIDGE connects GES, financial institutions, and community radio. Programme management role. Revenue from bank partnership sponsorship.',
    pipeline:1, irr:'14–18%', structure:'Bank Sponsorship + Government Contract', minTicket:'$50,000', horizon:'2–4 years',
    thesis:"Bank sponsorship of financial literacy creates direct brand value for participating banks while funding the programme. Every financially literate adult created is a potential BRIDGE product user.",
    thesis2:"BoG financial literacy mandate creates institutional demand for delivery partners. GES curriculum integration at secondary level creates national scale at low cost.",
    risks:[{cat:'Content Quality',prob:'Low',impact:'High',mit:'BoG and financial industry review process.'},{cat:'Reach in Rural Areas',prob:'Medium',impact:'Medium',mit:'Community radio is the dominant media in rural Ghana.'}],
    crossSectors:[2,5], crossNotes:'Financial inclusion products (S2). SME Management Training (E-03).',
  },

  // ── SECTOR 6 · AGRICULTURE (final additions) ──
  { id:'A-12', sector:6, title:'Cassava Industrial Processing',
    desc:'Industrial cassava processing for starch, ethanol, and animal feed — Ghana\'s largest root crop transformed into high-value outputs.',
    fullDesc:"Ghana produces 15M+ tonnes of cassava annually — more than any other crop. Yet 90% is consumed fresh or as basic food, capturing none of the industrial value. Cassava starch ($400/tonne), high-quality cassava flour ($300/tonne), cassava ethanol ($600/tonne), and cassava animal feed ($250/tonne) all represent significant value-add opportunities. BRIDGE structures a cassava industrial processing complex with co-investment from COCOBOD diversification fund.",
    score:81, dims:[24,21,21,15], subDims:{pp:[9,8,7],sf:[8,8,5],fe:[9,7,5],fs:[5,5,5]},
    tier:'Core', capMin:3, capMax:8, stage:'Concept', region:'Volta / Eastern', tags:['Cassava','Processing','Industrial'],
    mode:'INVEST', modeRationale:'Agro-industrial investment. BRIDGE invests alongside government cassava development programme.',
    pipeline:1, irr:'14–18%', structure:'Agribusiness Equity + Processing Revenue', minTicket:'$400,000', horizon:'5–7 years',
    thesis:"Cassava is Ghana's most abundant agricultural raw material. Industrial processing multiplies its value 3–8x. Domestic demand for starch (food, pharmaceutical, textile) and ethanol (fuel blending mandate) creates immediate off-take.",
    thesis2:"Government E10 ethanol blending mandate creates guaranteed ethanol demand from petroleum companies. COCOBOD diversification fund has cassava processing co-financing available.",
    risks:[{cat:'Raw Material Supply Consistency',prob:'Medium',impact:'High',mit:'Contract farming with 2,000+ smallholders. Aggregation platform feedstock.'},{cat:'Processing Technology',prob:'Low',impact:'Medium',mit:'Proven cassava processing technology from Brazil and Thailand.'}],
    crossSectors:[6,10,11], crossNotes:'Smallholder Aggregation (A-02). Energy for processing (S10). Manufacturing starch inputs (S11).',
  },
  { id:'A-13', sector:6, title:'Land Governance & Tenure Programme',
    desc:'Land title regularization and digital registry for smallholder farmers — securing tenure as prerequisite for investment.',
    fullDesc:"70%+ of Ghana's farmland has no formal documentation. Farmers cannot use land as collateral, cannot secure long-term investment, and are vulnerable to dispossession. BRIDGE structures a land governance programme: community-based land documentation, GPS boundary mapping, Customary Land Secretariat digitization, and registration under the Land Administration Project framework. Registered land is the prerequisite for agricultural investment at scale.",
    score:78, dims:[23,20,20,15], subDims:{pp:[9,8,6],sf:[8,7,5],fe:[8,7,5],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Concept', region:'National', tags:['Land', 'Tenure','Governance'],
    mode:'ADVISE', modeRationale:'Technical advisory and programme management. BRIDGE structures land documentation programmes. Revenue from government and DFI programme fees.',
    pipeline:1, irr:'12–16%', structure:'Programme Fee + Outcome Payment', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"Land title is the prerequisite for every other agricultural investment. BRIDGE creates this enabling condition across its cooperative network — unlocking agricultural credit, investment, and insurance for 100,000+ farmers.",
    thesis2:"MCA Ghana Compact and World Bank Land Administration Project provide programme co-financing. BRIDGE earns management fee for implementation.",
    risks:[{cat:'Chieftancy Complexity',prob:'High',impact:'High',mit:'Customary Land Secretariat engagement. Chief endorsement process.'},{cat:'Documentation Technology',prob:'Low',impact:'Medium',mit:'GPS mapping apps. Land registry API integration.'}],
    crossSectors:[6,2,8], crossNotes:'Agricultural credit collateral (A-06). Land as housing development input (HO-01).',
  },
  { id:'A-14', sector:6, title:'Organic Certification & Premium Market Access',
    desc:'Organic certification programme for Ghanaian smallholders — accessing $2,000–4,000/tonne premium commodity markets.',
    fullDesc:"Ghana's smallholder farmers often practice de facto organic agriculture — no synthetic inputs due to cost and access barriers. Yet they capture none of the organic premium ($500–3,000/tonne above conventional price) because they lack certification. BRIDGE structures a group certification programme: participatory guarantee systems, soil testing, training, and EU/USDA organic certification for cooperative clusters. Premium revenues improve farmer income 30–50%.",
    score:80, dims:[24,20,21,15], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[9,7,5],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Seed', region:'Northern Regions', tags:['Organic','Certification','Premium'],
    mode:'CONNECT', modeRationale:'BRIDGE connects farmers, certifiers, and premium international buyers. Facilitation and coordination role.',
    pipeline:2, irr:'18–22%', structure:'Premium Share + Facilitation Fee', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"De facto organic farmers need only documentation to access premium markets. Certification cost (GHS 200–500/farmer) is recovered in first premium sale. BRIDGE fronts certification cost and earns from premium facilitation.",
    thesis2:"EU organic imports are growing 15%+/year. Demand for certified West African organic products exceeds supply. BRIDGE positions as the trusted sourcing partner.",
    risks:[{cat:'Certification Maintenance',prob:'Medium',impact:'High',mit:'Annual audit support. BRIDGE field officers monitor standards.'},{cat:'Buyer Commitment',prob:'Medium',impact:'High',mit:'Pre-signed offtake LOIs before certification investment.'}],
    crossSectors:[6,12], crossNotes:'Export logistics for organic commodities (S12). Cooperative network (A-03).',
  },

  // ── SECTOR 7 · CREATIVE (final additions) ──
  { id:'CR-10', sector:7, title:'Afrobeats Music Export Programme',
    desc:'Structured support for Ghanaian music artists to access international markets — publishing, touring, and streaming optimization.',
    fullDesc:"Ghana's music scene — Afrobeats, highlife, hiplife — has produced internationally successful artists but the majority of Ghanaian musicians cannot access international revenue streams (streaming royalties, international touring, sync licensing) due to absent music business infrastructure. BRIDGE structures an Afrobeats export programme: music publishing administration, international booking agency relationships, streaming profile optimization, and sync licensing for international film and advertising.",
    score:73, dims:[22,18,19,14], subDims:{pp:[8,7,7],sf:[8,7,4],fe:[7,7,4],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'Accra', tags:['Music','Afrobeats','Export'],
    mode:'CONNECT', modeRationale:'BRIDGE connects artists, international music industry players, and revenue streams. Revenue from publishing admin fee and booking commission.',
    pipeline:1, irr:'20–26%', structure:'Publishing Fee + Commission', minTicket:'$50,000', horizon:'2–4 years',
    thesis:"Afrobeats is the fastest-growing genre globally. Ghana-origin artists (Stonebwoy, Black Sherif, Amaarae) have proven international demand. The missing piece is systematic music business infrastructure.",
    thesis2:"Streaming revenue for a moderately successful artist with proper distribution and playlist placement: $50,000–200,000/year vs. $2,000–10,000 without. Infrastructure creates 10–20x income improvement.",
    risks:[{cat:'Artist Commitment',prob:'Medium',impact:'Medium',mit:'Short-term pilot deals. Revenue share model aligns incentives.'},{cat:'International Relationships',prob:'Medium',impact:'High',mit:'Diaspora music industry professionals as connectors.'}],
    crossSectors:[7,4], crossNotes:'IP Monetization (CR-04). Talent Management Platform (CR-02).',
  },

  // ── SECTOR 8 · HOUSING (final additions) ──
  { id:'HO-10', sector:8, title:'Rural Housing Improvement Programme',
    desc:'Community-based rural housing upgrade using local materials and labour — improving living conditions for 500,000+ rural families.',
    fullDesc:"40% of rural Ghanaian households live in structurally inadequate housing. Commercial housing solutions don't reach this segment — the economics don't work. BRIDGE structures a rural housing improvement programme: technical design for improved traditional housing, local materials (compressed earth blocks, improved thatch), community construction training, and targeted financing from SSNIT and rural credit cooperatives. Not luxury; liveable, dignified, durable.",
    score:76, dims:[23,19,20,14], subDims:{pp:[9,8,6],sf:[8,6,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'Northern Regions', tags:['Rural Housing','Community','Impact'],
    mode:'CONNECT', modeRationale:'BRIDGE connects NDPC, district assemblies, and rural credit cooperatives. Programme management role. Revenue from programme delivery fee.',
    pipeline:1, irr:'8–12%', structure:'Programme Management Fee', minTicket:'$100,000', horizon:'4–6 years',
    thesis:"Rural housing improvement generates measurable health outcomes (malaria reduction, respiratory disease reduction) that DFIs and health funders will co-finance. USAID WASH+H programme is an active co-financing mechanism.",
    thesis2:"Local materials production creates employment; community construction training creates transferable skills; improved housing reduces illness and improves school attendance.",
    risks:[{cat:'Community Uptake',prob:'Low',impact:'Medium',mit:'Community-led design. Local champion identification.'},{cat:'Material Quality',prob:'Medium',impact:'High',mit:'GSA compressed earth block standard. Quality testing programme.'}],
    crossSectors:[8,3,1], crossNotes:'Local materials (HO-03). Health outcomes (H-09). Community infrastructure (I-13).',
  },

  // ── SECTOR 9 · TOURISM (final additions) ──
  { id:'TO-10', sector:9, title:'Culinary Tourism & Food Culture',
    desc:'Ghana food tourism programme — farm-to-table experiences, cooking classes, and restaurant development for diaspora and international visitors.',
    fullDesc:"Ghanaian cuisine — jollof rice, kelewele, waakye, fufu, kontomire — is increasingly recognized internationally but has no structured tourism product. Food tourism is one of the highest-growth tourism segments globally. BRIDGE structures a culinary tourism programme: curated farm-to-table experiences, cooking classes with master chefs, restaurant incubation for authentic Ghanaian cuisine, and integration into diaspora tour packages.",
    score:75, dims:[22,19,20,14], subDims:{pp:[8,8,6],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Food Tourism','Culinary','Culture'],
    mode:'CONNECT', modeRationale:'BRIDGE connects chefs, tourism operators, and agricultural supply chain. Revenue from experience facilitation and restaurant development advisory.',
    pipeline:1, irr:'18–22%', structure:'Experience Margin + Advisory Fee', minTicket:'$50,000', horizon:'2–4 years',
    thesis:"Food experience tourism is high-margin, culturally differentiated, and directly connected to BRIDGE's agricultural portfolio — farm visits, ingredient sourcing, and chef experiences create a complete value chain product.",
    thesis2:"Corporate team building, diaspora reunion packages, and international tourist experiences create three distinct market segments with different price points ($50–300/experience).",
    risks:[{cat:'Chef Network Development',prob:'Medium',impact:'Medium',mit:'Ghana chef association partnership. Culinary school graduate recruitment.'},{cat:'Quality Consistency',prob:'Medium',impact:'High',mit:'Certification programme. Mystery guest quality checks.'}],
    crossSectors:[6,9], crossNotes:'Agricultural supply chain (S6). Diaspora Roots Tourism (TO-09).',
  },

  // ── SECTOR 10 · ENERGY (final addition) ──
  { id:'EN-11', sector:10, title:'Renewable Energy Training Academy',
    desc:'Technical training for solar installers, mini-grid operators, and energy efficiency technicians — building Ghana\'s clean energy workforce.',
    fullDesc:"Ghana's renewable energy sector is growing at 25%+ annually but faces a severe workforce gap: qualified solar installers, mini-grid operators, battery technicians, and energy efficiency auditors. BRIDGE structures a renewable energy training academy: 3–6 month certificate programmes, hands-on installation training, and NABCEP (North American Board of Certified Energy Practitioners) aligned curriculum. Graduates placed directly into BRIDGE energy portfolio companies.",
    score:79, dims:[23,20,21,15], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[9,7,5],fs:[5,5,5]},
    tier:'Core', capMin:0.5, capMax:2, stage:'Concept', region:'Accra', tags:['Training','Solar','Renewable Energy'],
    mode:'CONNECT', modeRationale:'BRIDGE connects ECREE (Energy Commission), international training bodies, and energy sector employers. Revenue from training fees and employer placement.',
    pipeline:1, irr:'16–20%', structure:'Training Fees + Placement Revenue', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"BRIDGE energy portfolio companies (EN-01 through EN-10) need trained technicians. The Academy solves BRIDGE's own workforce gap while generating standalone fee revenue.",
    thesis2:"ECREE and IRENA both fund renewable energy capacity building in Ghana. Training revenue supplemented by grant co-financing from international energy institutions.",
    risks:[{cat:'Equipment Cost',prob:'Medium',impact:'Medium',mit:'Training equipment leased from BRIDGE energy partners.'},{cat:'Employer Demand',prob:'Low',impact:'High',mit:'BRIDGE energy portfolio companies are guaranteed employers.'}],
    crossSectors:[5,10], crossNotes:'TVET system (S5). All BRIDGE energy ventures (S10).',
  },

  // ── SECTOR 11 · MANUFACTURING (final addition) ──
  { id:'M-11', sector:11, title:'Medical Device & Equipment Maintenance',
    desc:'Local repair and maintenance services for hospital medical equipment — addressing Ghana\'s 40% equipment non-functionality rate.',
    fullDesc:"40% of medical equipment in Ghana's hospitals is non-functional at any given time. The primary cause is not breakdown — it is the absence of local technical capacity for repair and maintenance. Expensive equipment sits idle because there is no one to fix it. BRIDGE structures a biomedical equipment maintenance enterprise: trained biomedical engineers, spare parts inventory, and service level agreements with district and regional hospitals.",
    score:78, dims:[23,19,21,15], subDims:{pp:[8,8,7],sf:[8,7,5],fe:[9,7,5],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Concept', region:'National', tags:['Medical Equipment','Manufacturing','Health'],
    mode:'INVEST', modeRationale:'Service enterprise investment with GHS SLA revenue. BRIDGE co-invests with WHO, which has active biomedical engineering capacity building programme.',
    pipeline:1, irr:'16–20%', structure:'Service Contract Revenue', minTicket:'$150,000', horizon:'3–5 years',
    thesis:"GHS spends GHS 200M+/year on medical equipment procurement. Keeping existing equipment functional through maintenance is 10x more cost-effective than replacement. GHS service level agreements provide stable revenue.",
    thesis2:"WHO and USAID both have biomedical equipment maintenance capacity building programmes in Ghana — co-financing is available for the training component.",
    risks:[{cat:'Technical Talent',prob:'Medium',impact:'High',mit:'Biomedical engineering partnership with KNUST. WHO training programme.'},{cat:'Spare Parts',prob:'Medium',impact:'High',mit:'Equipment manufacturer authorized service partnerships.'},{cat:'GHS Contract',prob:'Medium',impact:'High',mit:'Pilot with 5 hospitals before national scale.'}],
    crossSectors:[3,11], crossNotes:'Health Systems support (S3). Manufacturing sector complementarity (S11).',
  },

  // ── SECTOR 12 · LOGISTICS (final addition) ──
  { id:'L-11', sector:12, title:'Post Harvest Aggregation Centres',
    desc:'Network of rural collection points with weighing, grading, storage, and transport coordination for smallholder produce.',
    fullDesc:"The gap between smallholder farm gate and formal market is where most post-harvest value is lost — poor weighing equipment, no grading standards, unreliable transport, and information asymmetry on prices. BRIDGE structures rural aggregation centres: solar-powered weighing and grading stations, short-term storage, price information boards, and direct transport booking to BRIDGE cold storage and processing facilities. Each centre serves 500–1,000 smallholder farmers within 20km.",
    score:83, dims:[25,21,21,16], subDims:{pp:[9,9,7],sf:[8,8,5],fe:[9,7,5],fs:[5,6,5]},
    tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'Northern Regions', tags:['Aggregation','Post-Harvest','Logistics'],
    mode:'INVEST', modeRationale:'Infrastructure investment integrated with BRIDGE agricultural portfolio. Revenue from aggregation service fees and transport coordination.',
    pipeline:2, irr:'14–18%', structure:'Service Fee + Transport Margin', minTicket:'$200,000', horizon:'4–6 years',
    thesis:"Aggregation centres are the connector between BRIDGE's farm-level programmes (A-02, A-03) and processing/cold storage facilities (A-01, A-04). Without aggregation, the upstream and downstream investments don't connect.",
    thesis2:"Revenue from weighing and grading fees (GHS 2–5/tonne), storage fees (GHS 20–50/tonne/week), and transport coordination margin (5–8%). At 10,000 tonnes/month across 20 centres: GHS 200–500K monthly.",
    risks:[{cat:'Farmer Participation',prob:'Low',impact:'High',mit:'Price premium for aggregation channel creates adoption incentive.'},{cat:'Infrastructure Security',prob:'Medium',impact:'Medium',mit:'Community watchman programme. Insurance coverage.'},{cat:'Transport Reliability',prob:'Medium',impact:'High',mit:'Digital Freight Matching Platform (L-07) integration.'}],
    crossSectors:[6,12], crossNotes:'Smallholder Aggregation (A-02). Cold Chain Storage (A-01). Freight Matching (L-07).',
  },

  // ── ADDITIONAL VENTURES TO REACH 174 ──
  // Infrastructure: I-14, I-15 (target 15)
  { id:'I-14', sector:1, title:'Bridge & Culvert Maintenance Programme',
    desc:'Systematic repair and maintenance of rural bridges and culverts — reconnecting communities cut off by infrastructure failure.',
    fullDesc:"Over 400 rural bridges and culverts in Ghana are either failed or critically degraded, cutting off communities during rainy season and costing the agricultural sector an estimated GHS 600M annually in market exclusion. BRIDGE structures a bridge maintenance programme: rapid assessment, prioritized repair, and community-based maintenance agreements using local materials and labour. Works within existing DA road maintenance budget.",
    score:73, dims:[22,18,19,14], subDims:{pp:[8,7,7],sf:[8,6,4],fe:[7,7,5],fs:[4,5,4]},
    tier:'Emerging', capMin:0.5, capMax:3, stage:'Concept', region:'Northern Regions', tags:['Infrastructure','Roads','Rural'],
    mode:'CONNECT', modeRationale:'BRIDGE connects GHA, DAs, and local contractors. Programme management fee.',
    pipeline:1, irr:'8–12%', structure:'Programme Management Fee', minTicket:'$75,000', horizon:'3–5 years',
    thesis:"Every bridge repaired opens a catchment of 500–2,000 farmers to markets. ROI on bridge repair measured in agricultural value unlocked is 10:1 or better.",
    thesis2:"COCOBOD and GFA provide commodity transport infrastructure co-financing. AfDB rural connectivity programme is an active co-funder.",
    risks:[{cat:'DA Budget Reliability',prob:'High',impact:'High',mit:'Multi-source funding. COCOBOD transport levy co-financing.'},{cat:'Construction Quality',prob:'Medium',impact:'Medium',mit:'Standardized design. DFR inspection.'}],
    crossSectors:[1,6,12], crossNotes:'Agricultural market access (S6). Logistics connectivity (S12).',
  },
  { id:'I-15', sector:1, title:'Public Lighting Network',
    desc:'Solar street lighting for underserved peri-urban communities — safety, economic activity, and ESCO revenue model.',
    fullDesc:"Peri-urban Accra, Kumasi, and regional capitals have minimal street lighting, creating safety risks and suppressing evening economic activity. BRIDGE structures a solar street lighting programme under an ESCO (Energy Service Company) model: BRIDGE installs and maintains lights, revenue from DA service payments based on operational uptime. 10,000 lights in Year 1 creates significant coverage at GHS 50–100/light/month service fee.",
    score:72, dims:[21,18,19,13], subDims:{pp:[7,7,7],sf:[8,6,4],fe:[7,7,4],fs:[4,5,4]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Solar Lighting','Urban','ESCO'],
    mode:'INVEST', modeRationale:'Asset ownership with DA service payment revenue. BRIDGE owns and operates lights.',
    pipeline:1, irr:'12–16%', structure:'ESCO Service Contract', minTicket:'$100,000', horizon:'5–7 years',
    thesis:"DA lighting budgets are allocated but not deployed efficiently. BRIDGE ESCO model converts DA opex budget into capex investment with guaranteed uptime.",
    thesis2:"Climate finance (carbon credits for diesel generator displacement) adds supplementary revenue. Street lighting catalyzes evening commerce — a measurable economic multiplier.",
    risks:[{cat:'DA Payment',prob:'High',impact:'High',mit:'GRA direct payment mechanism. MLGDRD co-guarantee.'},{cat:'Vandalism',prob:'Medium',impact:'Medium',mit:'Anti-theft hardware. Community stewardship.'}],
    crossSectors:[1,10], crossNotes:'Solar energy infrastructure (S10). Urban safety and economic activity.',
  },
  // Financial Inclusion: F-17 (target 17 — already at 16)
  { id:'F-17', sector:2, title:'Corporate Treasury Management Services',
    desc:'Treasury and cash management services for SMEs and mid-market companies — professional FX, investment, and cash flow management.',
    fullDesc:"Ghana's mid-market companies (GHS 5–50M revenue) lack access to professional treasury management. FX exposure is unhedged, idle cash earns nothing, and payment processes are manual. BRIDGE structures treasury management services: FX advisory and hedging, short-term investment placement, and digital cash flow management tools. Revenue from advisory fees and product spread.",
    score:74, dims:[22,18,20,14], subDims:{pp:[7,7,8],sf:[8,7,4],fe:[8,7,5],fs:[4,4,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Treasury','Corporate Finance','B2B'],
    mode:'CONNECT', modeRationale:'BRIDGE connects mid-market companies with bank treasury products. Advisory and facilitation role.',
    pipeline:1, irr:'20–26%', structure:'Advisory Fee + Product Spread', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"Mid-market treasury management is a high-value, low-capital-intensity service. One client with GHS 10M in FX exposure generates GHS 50–150K in advisory fees annually.",
    thesis2:"BRIDGE portfolio companies are the initial client base. External mid-market expansion builds on proven portfolio relationships.",
    risks:[{cat:'Regulatory',prob:'Low',impact:'Medium',mit:'BoG authorization as investment advisor.'},{cat:'Competition from Banks',prob:'Medium',impact:'Medium',mit:'Personalized service banks don\'t provide to SME tier.'}],
    crossSectors:[2,11], crossNotes:'Manufacturing FX exposure (S11). MSME Credit (F-02).',
  },
  // Health: H-14, H-15 (target 15)
  { id:'H-14', sector:3, title:'Blood Bank & Transfusion Services',
    desc:'Community blood donation infrastructure and regional blood bank network — addressing Ghana\'s chronic blood shortage.',
    fullDesc:"Ghana has 50% of its blood transfusion needs unmet. Hospitals routinely cancel surgeries and lose patients due to blood unavailability. Community blood donation is low (0.9 units per 1,000 population vs. WHO recommendation of 10). BRIDGE structures a community blood donation programme: mobile donation units, community campaigns, and a regional blood banking network with temperature-controlled storage and hospital delivery.",
    score:80, dims:[24,20,21,15], subDims:{pp:[9,8,7],sf:[8,7,5],fe:[9,7,5],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Blood Bank','Health','Infrastructure'],
    mode:'INVEST', modeRationale:'Health infrastructure investment with GHS and hospital service contracts.',
    pipeline:1, irr:'10–14%', structure:'Blended Finance + Hospital Contracts', minTicket:'$200,000', horizon:'4–6 years',
    thesis:"Hospitals pay GHS 50–150/unit for blood. A regional blood bank processing 5,000 units/month generates GHS 250–750K/month in hospital revenue. WHO and USAID provide technical and financial co-support.",
    thesis2:"Every unit of blood made available prevents a death. Impact is direct, measurable, and emotionally compelling for diaspora co-investors.",
    risks:[{cat:'Donation Volume',prob:'Medium',impact:'High',mit:'Faith community campaigns. Corporate donation programme.'},{cat:'Cold Chain',prob:'Medium',impact:'High',mit:'Reliable solar-backup refrigeration. Remote temperature monitoring.'}],
    crossSectors:[3,12], crossNotes:'Hospital cold chain logistics (S12). Community health networks (H-01).',
  },
  { id:'H-15', sector:3, title:'Elderly Care & Assisted Living',
    desc:'Quality elderly care services for Ghana\'s rapidly aging population — both residential and community-based models.',
    fullDesc:"Ghana's population over 60 is growing at 4% annually — the fastest demographic segment. Traditional family care structures are breaking down as urbanization and migration reduce household support. BRIDGE invests in elderly care infrastructure: residential assisted living for 60+ (premium and affordable tiers), community-based care support for families, and health services integration. The diaspora market — sending parents money for care — is the primary commercial segment.",
    score:74, dims:[22,18,20,14], subDims:{pp:[8,7,7],sf:[8,7,4],fe:[7,7,5],fs:[4,5,4]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'Greater Accra', tags:['Elderly Care','Social','Health'],
    mode:'INVEST', modeRationale:'Social enterprise investment. Diaspora remittance market provides primary commercial revenue.',
    pipeline:1, irr:'12–16%', structure:'Care Fee Revenue', minTicket:'$200,000', horizon:'5–8 years',
    thesis:"The diaspora is Ghana's most willing payer for elderly care — sending money home to support parents is the strongest financial motivation of the diaspora community. BRIDGE provides a trusted, accountable care product.",
    thesis2:"Premium residential care (GHS 2,000–5,000/month) for diaspora families. Community-based care (GHS 500–1,500/month) for local families. Both segments are underserved.",
    risks:[{cat:'Family Acceptance',prob:'Medium',impact:'High',mit:'Education campaign. Community endorsement. Trial programmes.'},{cat:'Workforce',prob:'Medium',impact:'High',mit:'Care worker training programme. Competitive wages to reduce turnover.'}],
    crossSectors:[2,3,5], crossNotes:'Healthcare Finance (F-13). Health systems (S3). Skills training for care workers (S5).',
  },
  // Technology: T-13, T-14 (target 14)
  { id:'T-13', sector:4, title:'Open Data Infrastructure',
    desc:'Ghana national open data platform — government datasets made accessible for research, business, and civic use.',
    fullDesc:"Ghana's government generates enormous data — land registry, population data, economic data, infrastructure maps — but almost none is publicly accessible in machine-readable form. BRIDGE structures an open data programme: NITA partnership to publish structured government datasets, API infrastructure for business and research access, and a community of data users that builds economic value from public data.",
    score:71, dims:[21,18,18,14], subDims:{pp:[7,7,7],sf:[8,6,4],fe:[7,7,4],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Open Data','GovTech','Platform'],
    mode:'CONNECT', modeRationale:'BRIDGE connects NITA, government agencies, and data users. Platform development and maintenance role.',
    pipeline:1, irr:'14–18%', structure:'Government Contract + API Revenue', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"Open data infrastructure creates value for every BRIDGE technology portfolio company — market data, demographic data, infrastructure data all improve AI models and platform targeting.",
    thesis2:"World Bank Open Data Programme and EU Digital for Development initiative co-finance open data infrastructure globally. Ghana positioning builds on existing NITA digital agenda.",
    risks:[{cat:'Government Data Release',prob:'High',impact:'High',mit:'Pilot with non-sensitive datasets. NITA champion at Ministerial level.'},{cat:'Data Quality',prob:'Medium',impact:'Medium',mit:'Standardization programme. API validation.'}],
    crossSectors:[1,4], crossNotes:'Smart city data (T-08). AI platform inputs (T-06).',
  },
  { id:'T-14', sector:4, title:'Autonomous Vehicle & Drone Logistics',
    desc:'Drone delivery for medicine and agricultural supplies to remote communities — reducing last-mile logistics cost 60%.',
    fullDesc:"For communities without road access, drones can deliver medicines, blood, and agricultural inputs at GHS 20–50 vs GHS 200–500 by motorcycle or chartered vehicle. BRIDGE invests in a medical and agricultural drone delivery service: fixed-wing drones for 50–100km range, hub-and-spoke network from district hospitals and aggregation centres, and Ghana CAA regulatory approval. Proven models from Zipline (Rwanda) and Swoop Aero (Malawi) demonstrate feasibility.",
    score:75, dims:[22,19,20,14], subDims:{pp:[8,7,7],sf:[8,7,4],fe:[8,7,5],fs:[4,5,4]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'Northern Regions', tags:['Drone','Last-Mile','Innovation'],
    mode:'INVEST', modeRationale:'Technology venture investment. BRIDGE co-invests with international drone operator. GHS and GHA provide regulatory and procurement support.',
    pipeline:1, irr:'14–18%', structure:'Delivery Contract + GHS SLA', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"Blood and medicine delivery to remote facilities saves lives. GHS is the anchor client. BRIDGE's health portfolio creates immediate client demand. Proven Rwanda model is direct replication evidence.",
    thesis2:"CAA has established drone regulatory framework. USAID Health has active co-financing for drone delivery in Ghana. First-mover has national scale potential.",
    risks:[{cat:'CAA Approval',prob:'Low',impact:'High',mit:'CAA drone framework already published. Application process established.'},{cat:'Weather',prob:'Medium',impact:'Medium',mit:'Fixed-wing design operates in rain. Ground backup for extreme weather.'}],
    crossSectors:[3,12,4], crossNotes:'Medicine delivery (H-05). Last-mile logistics (L-01).',
  },
  // Education: E-13, E-14 (target 14)
  { id:'E-13', sector:5, title:'Special Education Resources Programme',
    desc:'Assistive technology and trained teachers for children with disabilities in mainstream Ghana schools.',
    fullDesc:"Ghana's 500,000+ school-age children with disabilities have a 70% out-of-school rate. The Ghana Education Act mandates inclusive education but implementation is absent: no assistive technology, no trained teachers, no accessible facilities. BRIDGE structures a special education resources programme: assistive technology procurement and distribution, teacher training in inclusive education methods, and resource room establishment in 200 schools.",
    score:73, dims:[22,18,19,14], subDims:{pp:[9,7,6],sf:[8,6,4],fe:[7,7,5],fs:[4,4,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Inclusive Education','Disability','Schools'],
    mode:'INVEST', modeRationale:'Impact investment with USAID, DFID, and Ghana MOESG co-financing.',
    pipeline:1, irr:'8–12%', structure:'Blended Finance + Government Contract', minTicket:'$75,000', horizon:'3–5 years',
    thesis:"Legal mandate exists; delivery capacity does not. BRIDGE provides implementation for a constitutionally required service, backed by international education co-financing.",
    thesis2:"GES inclusive education budget is allocated but unspent due to implementation gaps. BRIDGE converts allocated budget into actual service delivery.",
    risks:[{cat:'Teacher Willingness',prob:'Medium',impact:'High',mit:'Training stipend. GES CEU credit for completion.'},{cat:'Device Durability',prob:'Medium',impact:'Medium',mit:'Rugged device specification for school environment.'}],
    crossSectors:[4,5], crossNotes:'Assistive technology (S4). Skills development for PWDs (E-09).',
  },
  { id:'E-14', sector:5, title:'Adult Literacy & Numeracy Programme',
    desc:'Functional literacy and numeracy for adults — enabling financial services participation, health literacy, and economic empowerment.',
    fullDesc:"5M+ Ghanaian adults are functionally illiterate, unable to participate fully in the formal economy or use digital financial services. BRIDGE structures an adult literacy programme: evening community classes in local languages, mobile SMS-based practice tools, and NVTI literacy certification linked to vocational training eligibility. GES non-formal education budget provides co-financing.",
    score:75, dims:[22,18,20,15], subDims:{pp:[9,7,6],sf:[8,7,4],fe:[8,7,5],fs:[5,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Adult Literacy','Numeracy','Empowerment'],
    mode:'CONNECT', modeRationale:'BRIDGE connects GES non-formal education, community organizations, and literacy materials providers.',
    pipeline:1, irr:'10–14%', structure:'GES Programme Contract', minTicket:'$50,000', horizon:'2–4 years',
    thesis:"Literacy is the enabling condition for every BRIDGE financial inclusion product. Literate adults adopt mobile wallets, read contracts, and access information that improves their economic decisions.",
    thesis2:"UNESCO Education for All co-financing. GES non-formal education programme budget co-funds delivery.",
    risks:[{cat:'Adult Time Availability',prob:'High',impact:'Medium',mit:'Flexible scheduling. Evening classes. Mobile practice.'},{cat:'Motivation',prob:'Medium',impact:'Medium',mit:'Functional literacy focus — immediate economic application.'}],
    crossSectors:[2,5,3], crossNotes:'Financial literacy (E-12). Health literacy for maternal programme (H-09).',
  },
  // Agriculture: A-15 (target 15)
  { id:'A-15', sector:6, title:'Veterinary Services Network',
    desc:'Community animal health services — livestock vaccination, disease surveillance, and veterinary extension for smallholder farmers.',
    fullDesc:"Ghana's livestock sector loses GHS 400M+ annually to preventable disease. The country has fewer than 1,500 registered veterinarians for 14M+ livestock and poultry. Community animal health workers (CAHWs) can deliver 80% of required services at 20% of veterinary cost. BRIDGE structures a CAHW network: training, equipment, drug supply chain, and digital reporting — integrated with BRIDGE's agricultural cooperative network.",
    score:78, dims:[23,20,21,14], subDims:{pp:[9,8,6],sf:[8,7,5],fe:[9,7,5],fs:[4,5,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Concept', region:'Northern Regions', tags:['Livestock','Veterinary','Rural'],
    mode:'INVEST', modeRationale:'Social enterprise with FAO and USAID animal health programme co-financing.',
    pipeline:1, irr:'10–14%', structure:'Service Fee + Government Contract', minTicket:'$100,000', horizon:'3–5 years',
    thesis:"Livestock is the primary asset and insurance mechanism for Northern Ghana households. Preventing one disease outbreak per 100 animals generates GHS 5,000+ in prevented losses per farmer per year.",
    thesis2:"FAO and USAID agricultural co-financing is active in Ghana livestock sector. BRIDGE provides private sector delivery structure that government extension cannot replicate at pace.",
    risks:[{cat:'Drug Supply Chain',prob:'Medium',impact:'High',mit:'Veterinary pharmaceutical partner. Buffer stock.'},{cat:'CAHW Training Quality',prob:'Medium',impact:'High',mit:'MoFA and FAO training standards compliance.'}],
    crossSectors:[6,3], crossNotes:'Poultry value chain (A-09). Health systems parallel (S3).',
  },
  // Creative: CR-11 (target 11)
  { id:'CR-11', sector:7, title:'Design & Creative Economy Hub',
    desc:'Physical co-working and production hub for Ghana\'s designers, architects, and visual artists — shared equipment and international market access.',
    fullDesc:"Accra's creative professionals lack affordable, well-equipped workspaces. Architects, industrial designers, graphic designers, and visual artists work from home or in expensive serviced offices not designed for creative work. BRIDGE structures a creative economy hub: studio workspaces, high-spec computers and printers, photography studio, meeting rooms, and exhibition space. Monthly membership model (GHS 300–800/month) with international market access support.",
    score:72, dims:[21,18,19,14], subDims:{pp:[7,7,7],sf:[8,7,4],fe:[7,7,4],fs:[4,5,5]},
    tier:'Emerging', capMin:1, capMax:3, stage:'Concept', region:'Accra', tags:['Design','Creative Hub','Co-working'],
    mode:'INVEST', modeRationale:'Real estate and creative services investment. BRIDGE invests in hub infrastructure.',
    pipeline:1, irr:'14–18%', structure:'Membership Revenue + Event Fees', minTicket:'$150,000', horizon:'3–5 years',
    thesis:"Creative co-working hubs succeed globally by community effect — the density of creative talent in one place creates collaboration, referrals, and client relationships that individual studios cannot generate.",
    thesis2:"Corporate creative services market (FMCG, telecoms, banking need design) creates institutional revenue that subsidises affordable membership rates for emerging creatives.",
    risks:[{cat:'Utilization Rate',prob:'Medium',impact:'High',mit:'Corporate anchor tenant before launch. Event programming for additional revenue.'},{cat:'Equipment Maintenance',prob:'Medium',impact:'Medium',mit:'Equipment lease model reduces capital risk.'}],
    crossSectors:[7,4], crossNotes:'Fashion Hub (CR-05). Tech Startup Ecosystem (T-10).',
  },
  // Housing: HO-11 (target 11)
  { id:'HO-11', sector:8, title:'Urban Renewal & Slum Upgrading',
    desc:'Participatory slum upgrading in Accra\'s Old Fadama and Nima — infrastructure, tenure, and community development.',
    fullDesc:"Accra's informal settlements house 40%+ of the city's population in unsafe, unsanitary conditions. Old Fadama alone has 80,000+ residents in a flood-prone, infrastructure-deficient settlement. BRIDGE structures a participatory upgrading programme: drainage and water infrastructure, in-situ tenure regularization, community facility development, and livelihood integration. World Bank Urban Resilience Programme provides co-financing.",
    score:74, dims:[22,19,19,14], subDims:{pp:[9,7,6],sf:[8,6,4],fe:[7,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:2, capMax:6, stage:'Concept', region:'Greater Accra', tags:['Slum Upgrading','Urban','Housing'],
    mode:'INVEST', modeRationale:'Impact investment with World Bank and UN-Habitat co-financing.',
    pipeline:1, irr:'8–12%', structure:'Blended Finance + Government Contract', minTicket:'$300,000', horizon:'7–10 years',
    thesis:"World Bank Urban Resilience and UN-Habitat slum upgrading programmes both seek private sector delivery partners. BRIDGE provides implementation capacity for already-funded programmes.",
    thesis2:"Post-upgrade property values increase 50–100%, creating collateral for community members and creating economic development ripple effects.",
    risks:[{cat:'Community Resistance',prob:'Medium',impact:'High',mit:'Participatory design. Community committee governance.'},{cat:'Government Coordination',prob:'High',impact:'High',mit:'AMA and Lands Commission co-facilitation from inception.'}],
    crossSectors:[1,3,8], crossNotes:'Water infrastructure (I-02). Health outcomes (S3).',
  },
  // Tourism: TO-11 (target 11)
  { id:'TO-11', sector:9, title:'Religious Tourism Development',
    desc:'Infrastructure and programming for Ghana\'s growing religious tourism — pilgrimages, healing sites, and faith-based travel.',
    fullDesc:"Ghana has significant religious tourism potential: healing prayer camps attracting 50,000+ visitors annually, Christian pilgrimage sites, and Islamic heritage in the North. BRIDGE structures a religious tourism infrastructure programme: site development, visitor accommodation, transport connections, and digital discovery platforms for faith-based travellers. Diaspora churches and mosque communities are primary market segments.",
    score:71, dims:[21,17,18,15], subDims:{pp:[7,7,7],sf:[8,6,4],fe:[7,6,4],fs:[5,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Religious Tourism','Faith','Community'],
    mode:'CONNECT', modeRationale:'BRIDGE connects faith communities, GTA, and tourism infrastructure operators.',
    pipeline:1, irr:'14–18%', structure:'Facilitation Fee + Development Advisory', minTicket:'$50,000', horizon:'2–4 years',
    thesis:"Faith-based travel is the largest segment of global tourism by volume. Ghana's diaspora faith communities represent an immediate, high-motivation visitor segment that BRIDGE's network can directly reach.",
    thesis2:"Religious community endorsement creates trusted distribution channel — congregations plan group tours through church and mosque networks.",
    risks:[{cat:'Sectarian Sensitivity',prob:'Medium',impact:'Medium',mit:'Ecumenical approach. Multi-faith product design.'},{cat:'Infrastructure Investment',prob:'Medium',impact:'Medium',mit:'Faith community co-investment. Site management partnerships.'}],
    crossSectors:[7,9], crossNotes:'Heritage Tourism (TO-01). Diaspora Tourism (TO-09).',
  },
  // Energy: EN-12 (target 12)
  { id:'EN-12', sector:10, title:'Floating Solar & Water Energy',
    desc:'Floating solar panels on Ghana\'s reservoirs and water bodies — dual-use energy generation and water conservation.',
    fullDesc:"Ghana's Akosombo Dam and Kpong reservoir cover 8,500 km² of water surface — if 1% were covered with floating solar panels, it would generate 4,000+ MW of clean electricity while reducing reservoir evaporation. BRIDGE structures a pilot floating solar programme: 5MW initial installation on Weija Reservoir near Accra, under VRA offtake agreement. The technology is proven globally; Ghana is the first potential adopter in West Africa.",
    score:70, dims:[21,17,19,13], subDims:{pp:[7,7,7],sf:[8,6,3],fe:[8,7,4],fs:[4,4,5]},
    tier:'Emerging', capMin:3, capMax:10, stage:'Concept', region:'Greater Accra', tags:['Solar','Innovation','Water'],
    mode:'INVEST', modeRationale:'Infrastructure innovation investment. BRIDGE co-invests with VRA and international green finance.',
    pipeline:1, irr:'10–14%', structure:'VRA PPA + Green Finance', minTicket:'$500,000', horizon:'8–12 years',
    thesis:"First-mover advantage on floating solar in West Africa creates replication IP and market leadership for Ghana. VRA PPA provides revenue certainty.",
    thesis2:"Green Climate Fund and EU Green Deal Africa funding actively seeks innovative clean energy projects. Floating solar is a priority category.",
    risks:[{cat:'Technology Novelty',prob:'Medium',impact:'Medium',mit:'Proven technology globally. Local adaptation engineering.'},{cat:'VRA Commitment',prob:'Medium',impact:'High',mit:'VRA PPA pre-negotiation before investment.'}],
    crossSectors:[1,10], crossNotes:'Water infrastructure (I-02). Grid stability (EN-05).',
  },
  // Manufacturing: M-12 (target 12)
  { id:'M-12', sector:11, title:'Artisan Enterprise Development',
    desc:'Scaling informal artisan enterprises — woodcarvers, kente weavers, blacksmiths — with design, quality, and export market access.',
    fullDesc:"Ghana has 500,000+ artisan entrepreneurs producing handcrafted products with significant international market potential. Yet most earn subsistence income because they lack design skills, quality standardization, and market access. BRIDGE structures an artisan enterprise programme: product design improvement (with diaspora design professionals), quality certification, cooperative formation for export scale, and direct market connections to international fair trade and retail buyers.",
    score:75, dims:[22,19,20,14], subDims:{pp:[8,8,6],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Artisan','Craft','Export'],
    mode:'CONNECT', modeRationale:'BRIDGE connects artisan cooperatives, design professionals, and international buyers.',
    pipeline:1, irr:'14–18%', structure:'Export Commission + Design Fee', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"International fair trade premium for certified Ghanaian handcraft is 40–80% above local market price. Design improvement adds another 30–50%. Combined premium doubles or triples artisan income.",
    thesis2:"GEPA export promotion programme provides co-marketing and trade fair participation support. Diaspora retail market is an immediately addressable channel.",
    risks:[{cat:'Quality Consistency',prob:'High',impact:'High',mit:'Cooperative production standards. BRIDGE quality inspector.'},{cat:'Export Logistics',prob:'Medium',impact:'Medium',mit:'BRIDGE logistics portfolio (S12) integration.'}],
    crossSectors:[7,11,5], crossNotes:'Creative economy (S7). Artisan skills training (S5). Export logistics (S12).',
  },
  // Logistics: L-12, L-13 (target 13)
  { id:'L-12', sector:12, title:'Pharmacy & Medical Logistics Specialist',
    desc:'Temperature-controlled pharmaceutical distribution and tracking for Ghana\'s private and public health sectors.',
    fullDesc:"Ghana's pharmaceutical supply chain has two distinct tiers: the GHS public sector supply chain (managed by GHSC) and the private sector supply chain serving 3,000+ private pharmacies. Both face cold chain, tracking, and counterfeit challenges. BRIDGE structures a specialist pharmaceutical logistics operator: GDP (Good Distribution Practice) compliant storage and transport, serialization tracking, and rapid replenishment services for private pharmacy chains and hospital pharmacies.",
    score:80, dims:[24,20,21,15], subDims:{pp:[8,8,8],sf:[8,7,5],fe:[9,7,5],fs:[5,5,5]},
    tier:'Core', capMin:2, capMax:5, stage:'Concept', region:'National', tags:['Pharma Logistics','Cold Chain','Healthcare'],
    mode:'INVEST', modeRationale:'Specialist logistics investment with private pharmacy chain contracts.',
    pipeline:1, irr:'16–20%', structure:'Logistics Contract Revenue', minTicket:'$300,000', horizon:'3–5 years',
    thesis:"Pharmaceutical logistics commands 25–35% margin premium over general freight due to compliance requirements. GDP certification is the barrier to entry that protects margins once achieved.",
    thesis2:"BRIDGE pharmaceutical manufacturing (M-01) is the anchor distribution client. Private pharmacy chains (Accra Pharmacy, Kama) are secondary clients.",
    risks:[{cat:'GDP Compliance',prob:'Low',impact:'High',mit:'GDP certification as Day 1 requirement. International logistics partner training.'},{cat:'Temperature Failures',prob:'Medium',impact:'High',mit:'IoT temperature monitoring throughout chain.'}],
    crossSectors:[3,12], crossNotes:'Medicine distribution (H-05). Pharmaceutical manufacturing (M-01). Last-mile network (L-01).',
  },
  { id:'L-13', sector:12, title:'Reverse Logistics & Returns Management',
    desc:'E-commerce and retail reverse logistics — product returns, recycling, and refurbishment network for Ghana\'s growing online market.',
    fullDesc:"Ghana's e-commerce sector is growing 30%+ annually but has no reverse logistics infrastructure. Product returns are unmanaged, customer satisfaction suffers, and valuable materials enter the waste stream unnecessarily. BRIDGE structures a reverse logistics operation: returns collection, product assessment (resell vs. refurbish vs. recycle), processing, and channel re-entry. Revenue from returns processing fees, refurbished product margin, and recycled materials sale.",
    score:73, dims:[22,18,19,14], subDims:{pp:[7,7,7],sf:[8,7,4],fe:[7,7,4],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'Greater Accra', tags:['Reverse Logistics','E-commerce','Circular'],
    mode:'INVEST', modeRationale:'Logistics service enterprise. BRIDGE invests with e-commerce platform partnerships.',
    pipeline:1, irr:'18–22%', structure:'Processing Fee + Product Margin', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"E-commerce platforms will pay for returns management — Jumia, Tonaton, and Amazon marketplace sellers all need returns infrastructure. First-mover builds the relationship before competition develops.",
    thesis2:"Refurbished electronics margin (30–50%) and recycled material sales create multi-stream revenue beyond processing fees.",
    risks:[{cat:'Volume Buildout',prob:'Medium',impact:'High',mit:'Jumia and Tonaton anchor partnership before launch.'},{cat:'Product Assessment Quality',prob:'Medium',impact:'Medium',mit:'Standardized assessment protocol. Trained technicians.'}],
    crossSectors:[11,12], crossNotes:'Plastic recycling (M-04). Last-mile delivery network (L-01).',
  },

  // ── FINAL 14 TO REACH 174 ──
  { id:'I-16', sector:1, title:'Affordable Internet Access Programme',
    desc:'Subsidized community WiFi hotspots in public spaces — schools, markets, health centres, and transport hubs.',
    fullDesc:"Ghana's mobile data cost is among the highest in Africa relative to income — GHS 5–15 per GB keeps millions offline. Community WiFi hotspots at public gathering points create affordable shared access. BRIDGE structures a community WiFi programme: 500 hotspots in schools, markets, and health centres, funded through advertising revenue, corporate sponsorship, and NCA universal access fund co-financing.",
    score:73, dims:[22,18,19,14], subDims:{pp:[8,7,7],sf:[8,6,4],fe:[7,7,5],fs:[4,5,4]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Internet','Connectivity','Community'],
    mode:'INVEST', modeRationale:'ESCO model with NCA USF co-financing and advertising revenue.',
    pipeline:1, irr:'12–16%', structure:'Advertising + NCA USF + Sponsorship', minTicket:'$75,000', horizon:'3–5 years',
    thesis:"Internet access multiplies the value of every other BRIDGE digital portfolio company. Community WiFi is enabling infrastructure for BRIDGE's entire digital ecosystem.",
    thesis2:"NCA Universal Service Fund co-finances community connectivity. Corporate sponsorship from MTN, Vodafone, and device manufacturers adds non-government revenue.",
    risks:[{cat:'Revenue Model',prob:'Medium',impact:'High',mit:'Multi-revenue design. NCA co-financing as floor.'},{cat:'Hardware Maintenance',prob:'Medium',impact:'Medium',mit:'Remote monitoring. Rapid maintenance SLA.'}],
    crossSectors:[4,1,3], crossNotes:'Digital services access (S4). Telemedicine connectivity (H-06).',
  },
  { id:'F-18', sector:2, title:'Consumer Credit Bureau',
    desc:'Ghana\'s first comprehensive consumer credit bureau — integrating formal and alternative data for universal credit scoring.',
    fullDesc:"Ghana has XDS and Dun & Bradstreet bureaus covering formal sector borrowers — but 80% of the population has no bureau record. BRIDGE structures a comprehensive consumer credit bureau: integrating MoMo transaction data, cooperative savings records, utility payments, and rental history into a universal credit score accessible to all lenders. BoG licensing as a credit reference bureau underpins the data infrastructure.",
    score:83, dims:[25,21,21,16], subDims:{pp:[9,8,8],sf:[8,8,5],fe:[8,7,6],fs:[5,6,5]},
    tier:'Core', capMin:2, capMax:5, stage:'Concept', region:'National', tags:['Credit Bureau','FinTech','Infrastructure'],
    mode:'INCUBATE', modeRationale:'BRIDGE builds the infrastructure layer. BoG licensing. Revenue from credit query fees to lenders.',
    pipeline:1, irr:'20–26%', structure:'Credit Query Licensing', minTicket:'$300,000', horizon:'3–5 years',
    thesis:"A universal credit bureau is the single most impactful financial inclusion infrastructure investment. Every lender in Ghana needs it. Once licensed, the bureau is a natural monopoly with recurring query revenue.",
    thesis2:"BoG has expressed support for comprehensive credit bureau development. MTN and Vodafone MoMo data sharing creates the alternative data foundation.",
    risks:[{cat:'BoG Licensing',prob:'Medium',impact:'High',mit:'Legal counsel specializing in banking regulation. BoG dialogue from Day 1.'},{cat:'Data Partnership',prob:'Medium',impact:'High',mit:'MTN MoMo data sharing MOU. Revenue share model.'}],
    crossSectors:[2,4], crossNotes:'Alternative Credit Scoring (F-06). Financial inclusion platforms (S2).',
  },
  { id:'H-16', sector:3, title:'Health Insurance Innovation',
    desc:'Community-based health insurance for informal sector workers — beyond NHIS gaps for catastrophic health costs.',
    fullDesc:"NHIS covers primary care but excludes high-cost specialist care, dental, vision, and rehabilitation. Informal sector workers hit catastrophic costs at these exclusions. BRIDGE structures a community-based health insurance product: GHS 30–80/month premium, covering specialist referrals, dental, and vision — distributed through Market Trader Wallet and susu collector networks. Risk pooled across BRIDGE's cooperative network.",
    score:79, dims:[23,20,21,15], subDims:{pp:[9,8,6],sf:[8,7,5],fe:[8,7,6],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:3, stage:'Concept', region:'National', tags:['Health Insurance','Informal','Community'],
    mode:'INVEST', modeRationale:'Insurance product investment with NHIA partnership. BRIDGE structures product; licensed insurer underwrites.',
    pipeline:1, irr:'16–20%', structure:'Premium Revenue Share', minTicket:'$200,000', horizon:'3–5 years',
    thesis:"NHIS gaps are the market — specifically the specialist, dental, and vision exclusions that create catastrophic household costs. BRIDGE product fills exactly this gap at affordable price points.",
    thesis2:"Distribution through BRIDGE's 250,000+ market trader network creates mass adoption potential at near-zero CAC.",
    risks:[{cat:'Claims Ratio',prob:'Medium',impact:'High',mit:'Conservative benefit design. Reinsurance layer.'},{cat:'NIA Accreditation',prob:'Low',impact:'High',mit:'Licensed insurer partnership. Regulatory compliance.'}],
    crossSectors:[2,3], crossNotes:'Market Trader Wallet distribution (F-01). NHIS complementary design (H-01).',
  },
  { id:'T-15', sector:4, title:'Digital Skills for Government',
    desc:'Digital capability building for Ghana\'s public servants — transforming government service delivery through technology literacy.',
    fullDesc:"Ghana's digital government agenda is constrained by civil servant digital literacy. BRIDGE structures a government digital skills programme: tailored training for different grade levels, practical tools for daily work (data analysis, digital communications, e-services), and a certification pathway recognized for civil service promotion. NITA and OHCS co-sponsor.",
    score:74, dims:[22,19,19,14], subDims:{pp:[8,7,7],sf:[8,7,4],fe:[7,7,5],fs:[4,5,4]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['GovTech','Digital Skills','Training'],
    mode:'CONNECT', modeRationale:'BRIDGE connects NITA, OHCS, and training delivery partners.',
    pipeline:1, irr:'14–18%', structure:'Government Training Contract', minTicket:'$75,000', horizon:'2–4 years',
    thesis:"Every civil servant trained in digital tools creates efficiency gains across the public sector. NITA Digital Ghana Agenda creates institutional mandate and budget.",
    thesis2:"OHCS in-service training budget provides programme funding. FCDO GovTech programme co-finances.",
    risks:[{cat:'Civil Service Motivation',prob:'Medium',impact:'Medium',mit:'CEU certification for career advancement.'},{cat:'Content Relevance',prob:'Low',impact:'Medium',mit:'Co-design with NITA and civil service users.'}],
    crossSectors:[4,5], crossNotes:'GovTech Platform (T-03). Teacher Training parallel model (E-07).',
  },
  { id:'A-16', sector:6, title:'Rice Value Chain Development',
    desc:'Domestic rice production, processing, and import substitution — targeting Ghana\'s $500M annual rice import bill.',
    fullDesc:"Ghana imports $500M in rice annually despite having ideal growing conditions in the Volta and Northern regions. Low yields (1.5–2.5 MT/ha vs potential 5–7 MT/ha with improved variety and irrigation) and absent processing infrastructure prevent domestic rice from competing with imported product. BRIDGE structures a rice value chain investment: improved variety seed systems, irrigation support, community rice mills, and branded domestic rice marketing.",
    score:82, dims:[25,21,21,15], subDims:{pp:[9,9,7],sf:[8,8,5],fe:[9,7,5],fs:[5,5,5]},
    tier:'Core', capMin:2, capMax:7, stage:'Concept', region:'Volta / Northern', tags:['Rice','Import Substitution','Value Chain'],
    mode:'INVEST', modeRationale:'Agribusiness investment with government GIDA rice development programme co-financing.',
    pipeline:1, irr:'14–18%', structure:'Agribusiness Equity + Processing Revenue', minTicket:'$300,000', horizon:'4–6 years',
    thesis:"Import substitution at rice scale is a national priority. Government GIDA rice development programme provides co-financing and technical support. BRIDGE provides private capital and market linkage.",
    thesis2:"Branded domestic rice at 10% below import price captures significant market share rapidly — quality perception has improved dramatically as processing quality improves.",
    risks:[{cat:'Yield Improvement',prob:'Medium',impact:'High',mit:'Improved variety programme. Agronomic extension.'},{cat:'Processing Quality',prob:'Medium',impact:'High',mit:'Modern rice mill investment. Quality standards programme.'}],
    crossSectors:[6,10,12], crossNotes:'Irrigation (A-08). Cold chain logistics (L-02). Energy for milling (S10).',
  },
  { id:'CR-12', sector:7, title:'Animation & Digital Media Studio',
    desc:'Professional animation and digital content studio targeting Africa\'s growing kids\' entertainment and advertising markets.',
    fullDesc:"African animation is an emerging global market — Nigerian and South African studios are gaining international traction. Ghana has animation talent but no professional studio infrastructure. BRIDGE invests in a digital animation and media studio: 2D and 3D animation capacity, character development for African kids' content, advertising production for FMCG brands, and co-production agreements with international streaming platforms.",
    score:72, dims:[21,18,19,14], subDims:{pp:[7,7,7],sf:[8,7,4],fe:[7,7,4],fs:[4,5,5]},
    tier:'Emerging', capMin:1, capMax:3, stage:'Concept', region:'Accra', tags:['Animation','Digital Media','Creative'],
    mode:'INVEST', modeRationale:'Creative enterprise investment with streaming platform co-production interest.',
    pipeline:1, irr:'16–22%', structure:'Production Revenue + IP Licensing', minTicket:'$150,000', horizon:'3–5 years',
    thesis:"Kids' content is the most reliable streaming commission category. African characters and stories are actively sought by Netflix Kids, Apple TV+, and Amazon. Ghana cultural IP creates authentic differentiation.",
    thesis2:"Advertising production is the commercial anchor — FMCG brands pay GHS 50,000–300,000 per animation spot. Streaming commissions are upside on the commercial base.",
    risks:[{cat:'Talent Pipeline',prob:'Medium',impact:'High',mit:'KNUST FIDA graduates. Diaspora animator return programme.'},{cat:'Streaming Commissioning',prob:'Medium',impact:'Medium',mit:'Commercial advertising as base revenue before streaming.'}],
    crossSectors:[4,7], crossNotes:'Digital content infrastructure (S4). Film Finance (CR-08).',
  },
  { id:'HO-12', sector:8, title:'Estate Security & Facility Management',
    desc:'Professional estate security and facility management for Ghana\'s growing residential and commercial developments.',
    fullDesc:"Ghana's residential and commercial property market is growing rapidly but professional estate management services are absent. Security is provided by informal guards with no training or accountability; maintenance is reactive and expensive; common area management is absent. BRIDGE structures a professional estate management company: trained security services, preventive maintenance, common area management, and digital estate management software for residential and commercial clients.",
    score:74, dims:[22,18,20,14], subDims:{pp:[7,7,8],sf:[8,7,4],fe:[8,7,5],fs:[4,4,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'Greater Accra', tags:['Property Management','Security','Services'],
    mode:'INVEST', modeRationale:'Service enterprise investment. BRIDGE housing developments as anchor clients.',
    pipeline:1, irr:'18–22%', structure:'Management Contract Revenue', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"BRIDGE housing developments are the captive first clients. Professional estate management is a premium that upscale residential and commercial tenants will pay — GHS 50–200/unit/month.",
    thesis2:"Technology layer (IoT sensors, mobile reporting app) creates data advantage over informal competitors and enables transparent client reporting.",
    risks:[{cat:'Staff Training',prob:'Medium',impact:'High',mit:'Comprehensive training programme. International security certification.'},{cat:'Client Acquisition',prob:'Low',impact:'Medium',mit:'BRIDGE housing portfolio is guaranteed anchor base.'}],
    crossSectors:[4,8], crossNotes:'Housing developments (HO-01). Property Management Platform (HO-04).',
  },
  { id:'TO-12', sector:9, title:'Cruise & Maritime Tourism',
    desc:'Ghana cruise port development and maritime tourism infrastructure — capturing West Africa\'s growing cruise market.',
    fullDesc:"West Africa has virtually no cruise tourism infrastructure. Ghana's deep-water port at Takoradi and the historic coastal towns (Cape Coast, Elmina) make it a natural cruise destination. BRIDGE structures a maritime tourism development: cruise terminal upgrade at Takoradi, shore excursion programme development, and marketing to major cruise lines (MSC, Costa, Royal Caribbean) targeting their emerging Africa routes.",
    score:70, dims:[21,17,18,14], subDims:{pp:[7,7,6],sf:[8,6,3],fe:[7,7,5],fs:[4,4,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'Western / Central', tags:['Cruise','Maritime','Tourism'],
    mode:'CONNECT', modeRationale:'BRIDGE connects Ghana Ports Authority, cruise lines, and shore excursion operators.',
    pipeline:1, irr:'12–16%', structure:'Shore Excursion Commission + Terminal Revenue', minTicket:'$150,000', horizon:'4–6 years',
    thesis:"One cruise ship visit (3,000 passengers at $150 average onshore spend) generates $450K in single visit economic activity. Ghana currently captures zero of this market.",
    thesis2:"Cruise lines are actively developing West Africa itineraries. Ghana's political stability and English-speaking environment make it the preferred stop vs alternatives.",
    risks:[{cat:'Cruise Line Commitment',prob:'Medium',impact:'High',mit:'Port upgrade as commitment signal. Trial itinerary before full rollout.'},{cat:'Port Infrastructure',prob:'Medium',impact:'High',mit:'Ghana Ports Authority co-investment. GPA has active infrastructure development plans.'}],
    crossSectors:[9,12], crossNotes:'Heritage Tourism (TO-01). Port logistics (L-03).',
  },
  { id:'EN-13', sector:10, title:'Hydrogen & Future Fuels Readiness',
    desc:'Early positioning in green hydrogen and sustainable aviation fuel — building Ghana\'s future clean energy export capacity.',
    fullDesc:"Ghana has the renewable energy resources (solar, wind, hydro) to produce green hydrogen competitively. The EU's green hydrogen import strategy creates a $50B+ export market by 2030. BRIDGE structures an early positioning programme: feasibility study, pilot electrolysis unit, regulatory framework development with Energy Commission, and partnership with European off-takers. Investment is exploratory but positions Ghana for first-mover advantage.",
    score:68, dims:[20,17,18,13], subDims:{pp:[7,6,7],sf:[8,6,3],fe:[7,7,4],fs:[4,4,5]},
    tier:'Emerging', capMin:0.5, capMax:3, stage:'Concept', region:'National', tags:['Hydrogen','Clean Energy','Export'],
    mode:'ADVISE', modeRationale:'BRIDGE provides advisory and early positioning. Revenue from feasibility and regulatory advisory fees.',
    pipeline:1, irr:'12–16%', structure:'Advisory Fee + Future Equity', minTicket:'$100,000', horizon:'5–10 years',
    thesis:"Early positioning in a $50B market costs relatively little. Feasibility study and regulatory framework set the terms for private investment at scale when the market matures.",
    thesis2:"EU Green Deal and German H2Global fund are actively funding hydrogen feasibility in Africa. BRIDGE earns advisory fees while positioning for equity upside.",
    risks:[{cat:'Technology Maturity',prob:'Medium',impact:'Medium',mit:'Exploratory positioning only. No capital at risk until feasibility confirmed.'},{cat:'Market Timing',prob:'High',impact:'Medium',mit:'Long-term positioning. Advisory revenue independent of market timing.'}],
    crossSectors:[10,12], crossNotes:'Renewable Energy (S10). Export infrastructure (S12).',
  },
  { id:'M-13', sector:11, title:'Industrial Water Treatment',
    desc:'Wastewater treatment systems for industrial clients — compliance with EPA standards and water recycling.',
    fullDesc:"Ghana's EPA industrial effluent standards are increasingly enforced. Most industrial operations — food processing, textile, pharmaceutical — currently discharge inadequately treated wastewater. BRIDGE structures an industrial water treatment enterprise: design, installation, and operation of effluent treatment systems on an ESCO basis — industrial clients pay for treated water outcomes, not capital equipment.",
    score:74, dims:[22,18,20,14], subDims:{pp:[7,7,8],sf:[8,7,4],fe:[8,7,5],fs:[4,4,5]},
    tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Water Treatment','Industrial','Environmental'],
    mode:'INVEST', modeRationale:'ESCO model investment. BRIDGE owns treatment systems. Revenue from treated water service fees.',
    pipeline:1, irr:'14–18%', structure:'ESCO Service Contract', minTicket:'$200,000', horizon:'5–7 years',
    thesis:"EPA enforcement creates forced adoption. BRIDGE ESCO model removes capital barrier — industrial clients pay for compliance outcomes, not equipment. Zero upfront cost drives adoption.",
    thesis2:"Water recycling reduces industrial water cost 30–50%, creating additional value proposition beyond compliance. Water scarcity premium grows over time.",
    risks:[{cat:'EPA Enforcement Pace',prob:'Medium',impact:'High',mit:'Private sector voluntary sustainability commitments as second market.'},{cat:'Technology',prob:'Low',impact:'Medium',mit:'Proven treatment technology globally deployed.'}],
    crossSectors:[1,11], crossNotes:'Industrial Zone water services (I-09). Manufacturing sector compliance (S11).',
  },
  { id:'L-14', sector:12, title:'Agricultural Export Logistics Hub',
    desc:'Dedicated export logistics hub for perishable agricultural products — cold chain, customs fast-track, and export documentation.',
    fullDesc:"Ghana's agricultural exporters face a frustrating bottleneck: perishable produce (pineapple, mango, yam, chilli) loses quality during slow export documentation and customs procedures. A dedicated agricultural export hub with pre-clearance, fast-track inspection, and cold chain to airport/port solves the bottleneck. BRIDGE structures the hub under GEPA's agricultural export promotion mandate.",
    score:81, dims:[24,21,21,15], subDims:{pp:[9,8,7],sf:[8,8,5],fe:[9,7,5],fs:[5,5,5]},
    tier:'Core', capMin:2, capMax:5, stage:'Concept', region:'Greater Accra', tags:['Export', 'Agricultural','Logistics'],
    mode:'CONNECT', modeRationale:'BRIDGE connects GEPA, GRA customs, PPRSD, and cold chain operators. Hub management and facilitation role.',
    pipeline:1, irr:'16–20%', structure:'Hub Service Fee + Cold Chain Revenue', minTicket:'$300,000', horizon:'3–5 years',
    thesis:"Pre-clearance reduces perishable export time from 5–7 days to 24–36 hours. Quality preservation generates $200–500 more per tonne on high-value produce. Hub fee is small fraction of quality premium created.",
    thesis2:"GEPA agricultural export target is $2B by 2026. The export hub is enabling infrastructure for achieving that target. Government co-investment rationale is strong.",
    risks:[{cat:'GRA Pre-clearance Agreement',prob:'Medium',impact:'High',mit:'GEPA advocacy. Pilot programme with 5 exporters.'},{cat:'Cold Chain Reliability',prob:'Medium',impact:'High',mit:'Backup power. Remote monitoring.'}],
    crossSectors:[6,12], crossNotes:'Organic certification exports (A-14). Shea export (A-10). Port Freight Aggregation (L-03).',
  },
  { id:'F-19', sector:2, title:'Diaspora Bond Programme',
    desc:'Ghana government diaspora bond — channeling diaspora savings into development finance at competitive returns.',
    fullDesc:"Ghana's diaspora bond programme has been discussed for over a decade but never successfully structured. The failure has been product design and distribution — not diaspora willingness. BRIDGE structures and co-distributes a revised diaspora bond: 3–5 year tenor, 8–10% USD return, SEC-registered, available in $500 increments via BRIDGE's diaspora platform. BRIDGE earns distribution commission; government raises development capital.",
    score:82, dims:[25,20,22,15], subDims:{pp:[9,8,8],sf:[8,7,5],fe:[9,7,6],fs:[5,5,5]},
    tier:'Core', capMin:1, capMax:5, stage:'Concept', region:'National', tags:['Diaspora Bond','Government','Development Finance'],
    mode:'CONNECT', modeRationale:'BRIDGE distributes government bond to diaspora through BRIDGE platform. Revenue from distribution commission.',
    pipeline:1, irr:'18–22%', structure:'Distribution Commission', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"$4.6B in annual remittances. If 5% convert to bond purchases, Ghana raises $230M+ in development capital annually. BRIDGE earns 1.5–2% distribution commission — $3.5–4.6M annually at this volume.",
    thesis2:"SEC registration provides regulatory credibility. BRIDGE brand and diaspora trust infrastructure solve the distribution problem that prior government attempts lacked.",
    risks:[{cat:'Government Commitment',prob:'Medium',impact:'High',mit:'SEC registration process led jointly with MoF.'},{cat:'Diaspora Trust',prob:'Medium',impact:'High',mit:'SEC registration. Third-party custodian. Annual audit.'}],
    crossSectors:[2,1], crossNotes:'Diaspora Investment Gateway (F-03). Remittance Products (F-10).',
  },
  { id:'T-16', sector:4, title:'AgriTech Satellite Monitoring',
    desc:'Satellite-based crop monitoring service for large farms, government agencies, and development partners — yield prediction and climate monitoring.',
    fullDesc:"Ghana's agricultural statistics are largely based on farmer surveys rather than objective measurement. Satellite imagery can provide objective, timely data on crop area, crop health, and yield forecasts. BRIDGE invests in a satellite monitoring service: crop area mapping, NDVI crop health monitoring, flood and drought mapping, and predictive yield models — sold to large farms, insurance companies, government statistics, and development partners.",
    score:77, dims:[23,20,20,14], subDims:{pp:[8,8,7],sf:[8,7,4],fe:[8,7,5],fs:[4,5,5]},
    tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Satellite','Remote Sensing','AgriTech'],
    mode:'INCUBATE', modeRationale:'BRIDGE builds the analytics layer on publicly available satellite data. B2B subscription model.',
    pipeline:1, irr:'20–26%', structure:'B2B SaaS Subscription', minTicket:'$100,000', horizon:'2–4 years',
    thesis:"Government statistical agencies, crop insurers, and development partners all need objective agricultural data. Each is a recurring institutional subscriber at $10,000–50,000/year.",
    thesis2:"Sentinel-2 satellite data is free. The value is in the analytics layer. BRIDGE's agricultural portfolio generates ground truth data that improves model accuracy.",
    risks:[{cat:'Model Accuracy',prob:'Medium',impact:'High',mit:'Ground truth validation programme. Academic partnership.'},{cat:'Competition',prob:'Medium',impact:'Medium',mit:'Ghana-specific model customization as differentiation.'}],
    crossSectors:[4,6,2], crossNotes:'AgriTech Platform (T-02). Crop Insurance underwriting (F-09).',
  },

  { id:'L-15', sector:12, title:'Supply Chain Finance Platform',
    desc:'Reverse factoring and supplier finance for BRIDGE portfolio companies — unlocking working capital across the supply chain.',
    fullDesc:"BRIDGE's 174-venture portfolio creates a dense network of buyer-supplier relationships. Suppliers to large BRIDGE portfolio companies (food processors, manufacturers, logistics operators) wait 30–90 days for payment — starving them of working capital. BRIDGE structures a supply chain finance platform: approved payables finance where BRIDGE portfolio buyers confirm invoices, and suppliers draw immediate payment at competitive rates. The platform strengthens every supply chain relationship in the BRIDGE ecosystem.",
    score:80, dims:[24,20,21,15], subDims:{pp:[8,8,8],sf:[8,7,5],fe:[9,7,5],fs:[5,5,5]},
    tier:'Core', capMin:2, capMax:5, stage:'Concept', region:'National', tags:['Supply Chain Finance','Working Capital','FinTech'],
    mode:'INVEST', modeRationale:'Lending platform investment. BRIDGE provides liquidity facility. Revenue from financing margin on approved payables.',
    pipeline:1, irr:'18–22%', structure:'Financing Margin', minTicket:'$300,000', horizon:'3–5 years',
    thesis:"BRIDGE portfolio buyer relationships are the credit underwriting — approved invoices from BRIDGE companies carry near-zero default risk. The platform monetizes the trust infrastructure BRIDGE has built across 174 ventures.",
    thesis2:"At $10M monthly approved payables volume, 2% financing margin generates $200K/month revenue. The platform scales directly with BRIDGE portfolio growth — more ventures mean more supply chain relationships to finance.",
    risks:[{cat:'Platform Adoption',prob:'Low',impact:'High',mit:'BRIDGE portfolio mandate creates captive initial volume.'},{cat:'Working Capital',prob:'Medium',impact:'High',mit:'IFC Supply Chain Finance facility as senior liquidity layer.'},{cat:'Invoice Fraud',prob:'Low',impact:'High',mit:'Buyer confirmation required before any financing drawn.'}],
    crossSectors:[2,6,11], crossNotes:'Financial inclusion infrastructure (S2). Agricultural supply chain (S6). Manufacturing payables (S11).',
  },
];


const TIER_COLOR={Core:C.positive,Emerging:C.amber,Exploratory:C.muted};
const STAGE_COLOR={Active:C.positive,Seed:C.forest,Concept:C.muted};
const MODE_COLOR={INVEST:C.forest,INCUBATE:C.teal,CONNECT:C.positive,ADVISE:C.amber,ADVOCATE:C.muted};
const PIPELINE_LABELS=['Screening','Scoring','Due Diligence','Committee','Structuring'];
const CAPITAL_RANGES=[
  {label:'Under $1M',min:0,max:1},
  {label:'$1M – $5M',min:1,max:5},
  {label:'$5M – $15M',min:5,max:15},
  {label:'Over $15M',min:15,max:999},
];
const DIM_LABELS=[
  {label:'Peace & Prosperity',max:30,color:C.lime},
  {label:'Strategic Fit',max:25,color:C.limeDark},
  {label:'Feasibility',max:25,color:C.forest},
  {label:'Financial Sustain.',max:20,color:C.teal},
];
const scoreColor=(s)=>s>=85?C.lime:s>=75?C.limeDark:C.amber;

const ScoreBar=({score})=>{
  const col=scoreColor(score);
  return(<div style={{height:'3px',background:C.border,overflow:'hidden'}}><div className="score-bar-fill" style={{height:'100%',width:`${score}%`,background:col}}/></div>);
};

const InlineDims=({dims,compact=true})=>(
  <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
    {DIM_LABELS.map((d,i)=>(
      <div key={d.label} style={{display:'flex',alignItems:'center',gap:'8px'}}>
        <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.faint,width:'78px',flexShrink:0,letterSpacing:'0.3px',textTransform:'uppercase'}}>{d.label}</span>
        <div style={{flex:1,height:'3px',background:C.border}}><div style={{height:'100%',width:`${(dims[i]/d.max)*100}%`,background:d.color}}/></div>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.muted,width:'18px',textAlign:'right'}}>{dims[i]}</span>
      </div>
    ))}
  </div>
);

const OpportunityCard=({opp,onClick,isMobile})=>{
  const SIcon=SECTOR_ICONS[opp.sector];
  const sm=SECTORS_META.find(s=>s.id===opp.sector);
  const col=scoreColor(opp.score);
  return(
    <div className="opp-card" onClick={()=>onClick(opp)}
      style={{background:C.paper,border:`1px solid ${C.border}`,cursor:'pointer',display:'flex',flexDirection:'column'}}>
      <ScoreBar score={opp.score}/>
      <div style={{padding:isMobile?'14px 14px 0':'18px 18px 0'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'26px',height:'26px',background:C.paperDark,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              {SIcon&&<SIcon size={13} color={C.forest}/>}
            </div>
            <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint,letterSpacing:'1px'}}>{sm.num} · {sm.shortName}</span>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:F.mono,fontSize:isMobile?'20px':'24px',fontWeight:700,color:col,lineHeight:1}}>{opp.score}</div>
            <div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint}}>/ 100</div>
          </div>
        </div>
        <div style={{fontFamily:F.display,fontSize:isMobile?'15px':'16px',fontWeight:700,color:C.ink,lineHeight:1.3,marginBottom:'8px'}}>{opp.title}</div>
        <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.7,marginBottom:'12px'}}>{opp.desc}</div>
        <InlineDims dims={opp.dims}/>
      </div>
      {/* Mode + pipeline */}
      <div style={{margin:'12px 18px 0',padding:'9px 0',borderTop:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span className="mode-badge" style={{background:`${MODE_COLOR[opp.mode]}15`,color:MODE_COLOR[opp.mode],border:`1px solid ${MODE_COLOR[opp.mode]}30`}}>{opp.mode}</span>
        <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
          {PIPELINE_LABELS.map((l,i)=>(<div key={l} style={{width:'6px',height:'6px',borderRadius:'50%',background:i+1<=opp.pipeline?col:C.border}}/>))}
          <span style={{fontFamily:F.sans,fontSize:'9px',color:C.muted,marginLeft:'4px'}}>{PIPELINE_LABELS[opp.pipeline-1]}</span>
        </div>
      </div>
      {/* Footer */}
      <div style={{padding:'9px 18px 13px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:TIER_COLOR[opp.tier],textTransform:'uppercase',letterSpacing:'1px'}}>{opp.tier}</span>
          <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>|</span>
          <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.forest}}>${opp.capMin}–{opp.capMax}M</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
          <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.teal}}>{opp.irr}</span>
          <span style={{fontFamily:F.sans,fontSize:'8px',color:C.faint}}>IRR</span>
        </div>
      </div>
    </div>
  );
};

const PipelineViz=({stage,isMobile})=>{
  if(isMobile){
    return(
      <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
        {PIPELINE_LABELS.map((label,i)=>(
          <div key={label} style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',flexShrink:0,
              background:i+1<stage?C.forest:i+1===stage?C.lime:'transparent',
              border:i+1<=stage?'none':`2px solid ${C.border}`,
              display:'flex',alignItems:'center',justifyContent:'center'}}>
              {i+1<stage&&<span style={{color:C.paper,fontSize:'10px',fontWeight:700}}>✓</span>}
              {i+1===stage&&<span style={{color:C.ink,fontSize:'10px',fontWeight:700}}>{i+1}</span>}
              {i+1>stage&&<span style={{color:C.faint,fontSize:'10px',fontWeight:700}}>{i+1}</span>}
            </div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:i+1===stage?700:400,
              color:i+1===stage?C.forest:i+1<stage?C.muted:C.faint}}>{label}</span>
            {i+1===stage&&<span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,
              background:C.lime,color:C.ink,padding:'2px 8px',marginLeft:'4px'}}>CURRENT</span>}
          </div>
        ))}
      </div>
    );
  }
  return(
    <div className="pipeline-track" style={{display:'flex',alignItems:'center',gap:0}}>
      {PIPELINE_LABELS.map((label,i)=>(
        <React.Fragment key={label}>
          <div className="pipeline-step" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px',flex:1}}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',flexShrink:0,
              background:i+1<stage?C.forest:i+1===stage?C.lime:'transparent',
              border:i+1<=stage?'none':`2px solid ${C.border}`,
              display:'flex',alignItems:'center',justifyContent:'center'}}>
              {i+1<stage&&<span style={{color:C.paper,fontSize:'10px',fontWeight:700}}>✓</span>}
              {i+1===stage&&<span style={{color:C.ink,fontSize:'10px',fontWeight:700}}>{i+1}</span>}
              {i+1>stage&&<span style={{color:C.faint,fontSize:'10px',fontWeight:700}}>{i+1}</span>}
            </div>
            <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:i+1===stage?700:400,
              color:i+1===stage?C.forest:i+1<stage?C.muted:C.faint,textAlign:'center'}}>{label}</span>
          </div>
          {i<PIPELINE_LABELS.length-1&&(
            <div className="pipeline-line" style={{flex:1,height:'2px',background:i+1<stage?C.forest:C.border,marginBottom:'20px'}}/>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ─── FILTER PILL ─────────────────────────────────────────────────────────────
const FilterPill=({label,active,onClick,large=false})=>(
  <button onClick={onClick} className="fpill" style={{
    fontFamily:F.sans,fontSize:large?'12px':'10px',fontWeight:700,letterSpacing:'0.3px',
    padding:large?'10px 16px':'6px 12px',cursor:'pointer',outline:'none',
    border:active?`1.5px solid ${C.forest}`:`1px solid ${C.border}`,
    background:active?C.forest:'transparent',color:active?C.paper:C.muted,
  }}>{label}</button>
);

// ─── MOBILE FILTER SHEET ─────────────────────────────────────────────────────
const MobileFilterSheet=({open,onClose,activeSector,setActiveSector,activeTier,setActiveTier,
  activeStage,setActiveStage,activeMode,setActiveMode,activeCapital,setActiveCapital,onClear,activeFilterCount,resultCount})=>{
  useEffect(()=>{
    if(open)document.body.style.overflow='hidden';
    else document.body.style.overflow='';
    return()=>{document.body.style.overflow='';};
  },[open]);
  return(
    <>
      <div className={`sheet-overlay${open?' open':''}`} onClick={onClose}/>
      <div className={`filter-sheet${open?' open':''}`}>
        <div style={{display:'flex',justifyContent:'center',padding:'10px 0 4px'}}>
          <div style={{width:'36px',height:'4px',background:C.border,borderRadius:'2px'}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 20px 16px',borderBottom:`1px solid ${C.border}`}}>
          <span style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:C.ink}}>
            Filter Ventures
            {activeFilterCount>0&&<span style={{marginLeft:'8px',background:C.forest,color:C.paper,borderRadius:'10px',padding:'2px 8px',fontSize:'11px'}}>{activeFilterCount}</span>}
          </span>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:C.muted,display:'flex',padding:'4px'}}><X size={18}/></button>
        </div>
        <div style={{padding:'20px'}}>
          <div style={{marginBottom:'22px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Sector</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {SECTORS_META.map(s=>(<FilterPill key={s.id} label={`${s.num} ${s.shortName}`} active={activeSector===s.id} onClick={()=>setActiveSector(activeSector===s.id?null:s.id)} large/>))}
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'22px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Tier</div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {['Core','Emerging'].map(t=>(<FilterPill key={t} label={t} active={activeTier===t} onClick={()=>setActiveTier(activeTier===t?null:t)} large/>))}
              </div>
            </div>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Stage</div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {['Active','Seed','Concept'].map(s=>(<FilterPill key={s} label={s} active={activeStage===s} onClick={()=>setActiveStage(activeStage===s?null:s)} large/>))}
              </div>
            </div>
          </div>
          <div style={{marginBottom:'22px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Engagement Mode</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {['INVEST','INCUBATE','CONNECT','ADVISE'].map(m=>(<FilterPill key={m} label={m} active={activeMode===m} onClick={()=>setActiveMode(activeMode===m?null:m)} large/>))}
            </div>
          </div>
          <div style={{marginBottom:'22px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Capital Range</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {CAPITAL_RANGES.map(r=>(<FilterPill key={r.label} label={r.label} active={activeCapital===r.label} onClick={()=>setActiveCapital(activeCapital===r.label?null:r.label)} large/>))}
            </div>
          </div>
        </div>
        <div style={{padding:'0 20px 20px',display:'flex',gap:'10px'}}>
          <button onClick={onClose} style={{flex:1,background:C.forest,color:C.paper,border:'none',padding:'15px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,cursor:'pointer',letterSpacing:'0.5px'}}>
            Show {resultCount} Ventures
          </button>
          {activeFilterCount>0&&(
            <button onClick={onClear} style={{background:'none',border:`1px solid ${C.border}`,padding:'15px 20px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.muted,cursor:'pointer'}}>Clear</button>
          )}
        </div>
      </div>
    </>
  );
};

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────
const DetailModal=({opp,onClose,isMobile})=>{
  const SIcon=SECTOR_ICONS[opp.sector];
  const sm=SECTORS_META.find(s=>s.id===opp.sector);
  const col=scoreColor(opp.score);
  const [activeTab,setActiveTab]=useState('overview');

  useEffect(()=>{
    document.body.style.overflow='hidden';
    const fn=(e)=>{if(e.key==='Escape')onClose();};
    window.addEventListener('keydown',fn);
    return()=>{document.body.style.overflow='';window.removeEventListener('keydown',fn);};
  },[onClose]);

  const tabs=[
    {id:'overview',label:'Overview'},
    {id:'score',label:'Score'},
    {id:'thesis',label:'Thesis'},
    {id:'risks',label:'Risks'},
    {id:'deploy',label:'Deploy'},
    {id:'cross',label:'Cross-Sector'},
  ];

  return(
    <div className="modal-overlay" onClick={(e)=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal-box">
        {/* Drag handle mobile */}
        {isMobile&&(
          <div style={{display:'flex',justifyContent:'center',padding:'10px 0 0',background:C.ink}}>
            <div style={{width:'36px',height:'4px',background:'rgba(255,255,255,0.2)',borderRadius:'2px'}}/>
          </div>
        )}
        {/* Header */}
        <div style={{background:C.ink,padding:isMobile?'14px 20px 0':'24px 28px 0',position:'relative'}}>
          {!isMobile&&(
            <button onClick={onClose} style={{position:'absolute',top:'14px',right:'16px',background:'rgba(255,255,255,0.08)',border:'none',color:'rgba(255,255,255,0.6)',cursor:'pointer',width:'28px',height:'28px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',fontFamily:F.sans}}>×</button>
          )}
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
            <div style={{width:'26px',height:'26px',background:'rgba(184,217,53,0.1)',border:'1px solid rgba(184,217,53,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              {SIcon&&<SIcon size={13} color={C.lime}/>}
            </div>
            <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(184,217,53,0.5)',letterSpacing:'1.5px',textTransform:'uppercase'}}>{sm.num} · {sm.name}</span>
            <span style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.2)',marginLeft:'4px'}}>#{opp.id}</span>
          </div>
          <div style={{fontFamily:F.display,fontSize:isMobile?'18px':'22px',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'14px'}}>{opp.title}</div>
          {/* Quick stats */}
          <div style={{display:'flex',gap:isMobile?'16px':'24px',flexWrap:'wrap',paddingBottom:'16px',overflowX:'auto'}}>
            {[
              [opp.score+'/100','Score'],
              [opp.irr,'IRR'],
              [`$${opp.capMin}–${opp.capMax}M`,'Capital'],
              [opp.mode,'Mode'],
              [PIPELINE_LABELS[opp.pipeline-1],'Stage'],
            ].map(([v,l])=>(
              <div key={l} style={{flexShrink:0}}>
                <div style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:col,lineHeight:1}}>{v}</div>
                <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',marginTop:'3px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Tab nav — forest segment */}
        <div style={{background:C.forest,borderBottom:'2px solid rgba(0,0,0,0.2)',overflowX:'auto',display:'flex',WebkitOverflowScrolling:'touch'}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)}
              className={`modal-tab${activeTab===t.id?' active':''}`}>{t.label}</button>
          ))}
        </div>
        {/* Content — extra bottom padding on mobile for sticky CTAs */}
        <div style={{padding:isMobile?'20px 20px 100px':'24px 28px'}}>

          {/* OVERVIEW */}
          {activeTab==='overview'&&(
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Opportunity Context</div>
              <div style={{fontFamily:F.body,fontSize:isMobile?'13px':'14px',lineHeight:1.9,color:C.ink,fontWeight:300,marginBottom:'20px'}}>{opp.fullDesc}</div>
              <div style={{background:C.forest,padding:'16px',marginBottom:'16px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Venture Parameters</div>
                {[['Tier',opp.tier],['Pipeline',PIPELINE_LABELS[opp.pipeline-1]],['Capital',`$${opp.capMin}M – $${opp.capMax}M`],['Min. Ticket',opp.minTicket],['Mode',opp.mode],['Horizon',opp.horizon],['Target IRR',opp.irr],['Structure',opp.structure],['Stage',opp.stage],['Region',opp.region]].map(([l,v])=>(
                  <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                    <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.4)'}}>{l}</span>
                    <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,textAlign:'right',maxWidth:'55%'}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:C.paperDark,padding:'14px',borderLeft:`3px solid ${MODE_COLOR[opp.mode]}`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:MODE_COLOR[opp.mode],marginBottom:'6px'}}>Why {opp.mode}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,fontStyle:'italic',fontWeight:300}}>{opp.modeRationale}</div>
              </div>
            </div>
          )}

          {/* SCORE */}
          {activeTab==='score'&&(
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'20px'}}>
                <div style={{fontFamily:F.mono,fontSize:isMobile?'48px':'64px',fontWeight:500,color:col,lineHeight:1}}>{opp.score}</div>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'4px'}}>BRIDGE Impact Score™</div>
                  <div style={{height:'5px',width:isMobile?'120px':'160px',background:C.border}}><div style={{height:'100%',width:`${opp.score}%`,background:col}}/></div>
                  <div style={{fontFamily:F.sans,fontSize:'10px',color:C.faint,marginTop:'4px'}}>{opp.score>=80?'Exceptional — Priority pursuit':opp.score>=65?'Strong — Active development':'Promising — Further development'}</div>
                </div>
              </div>
              {DIM_LABELS.map((d,i)=>{
                const subLabels=[['Individual Dignity','Family Security','Community Thriving'],['Sector Alignment','Diaspora Role','Portfolio Synergy'],['Financial Viability','Local Capacity','Risk Profile'],['Revenue Model','Return Potential','Sustainability']][i];
                const subVals=[opp.subDims.pp,opp.subDims.sf,opp.subDims.fe,opp.subDims.fs][i]||[0,0,0];
                return(
                  <div key={d.label} style={{marginBottom:'16px',background:C.paperDark,padding:'14px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                      <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{d.label}</span>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <div style={{width:'60px',height:'3px',background:C.border}}><div style={{height:'100%',width:`${(opp.dims[i]/d.max)*100}%`,background:d.color}}/></div>
                        <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:d.color}}>{opp.dims[i]}<span style={{fontSize:'9px',color:C.faint}}>/{d.max}</span></span>
                      </div>
                    </div>
                    {subLabels.map((sl,j)=>(
                      <div key={sl} className="dim-row">
                        <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted,flex:1}}>{sl}</span>
                        <div style={{width:'50px',height:'2px',background:C.border}}><div style={{height:'100%',width:`${(subVals[j]/10)*100}%`,background:d.color}}/></div>
                        <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,width:'18px',textAlign:'right'}}>{subVals[j]}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* THESIS */}
          {activeTab==='thesis'&&(
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Investment Thesis</div>
              <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'16px',marginBottom:'20px'}}>
                <div style={{fontFamily:F.display,fontSize:isMobile?'14px':'16px',fontWeight:600,fontStyle:'italic',color:C.forest,lineHeight:1.7}}>{opp.thesis}</div>
              </div>
              <div style={{fontFamily:F.body,fontSize:isMobile?'13px':'14px',lineHeight:1.9,color:C.ink,fontWeight:300,marginBottom:'24px'}}>{opp.thesis2}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Evaluation Pipeline</div>
              <PipelineViz stage={opp.pipeline} isMobile={isMobile}/>
            </div>
          )}

          {/* RISKS */}
          {activeTab==='risks'&&(
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Risk Assessment Matrix</div>
              {isMobile?(
                <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                  {opp.risks.map((r,i)=>{
                    const probCol=r.prob==='High'?C.red:r.prob==='Medium'?C.amber:C.positive;
                    const impCol=r.impact==='High'?C.red:r.impact==='Medium'?C.amber:C.positive;
                    return(
                      <div key={i} style={{background:C.paperDark,padding:'14px'}}>
                        <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink,marginBottom:'8px'}}>{r.cat}</div>
                        <div style={{display:'flex',gap:'16px',marginBottom:'8px'}}>
                          <div><div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'2px'}}>PROB.</div><span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:probCol,textTransform:'uppercase'}}>{r.prob}</span></div>
                          <div><div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'2px'}}>IMPACT</div><span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:impCol,textTransform:'uppercase'}}>{r.impact}</span></div>
                        </div>
                        <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6,fontStyle:'italic'}}>{r.mit}</div>
                      </div>
                    );
                  })}
                </div>
              ):(
                <>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 60px 60px 1.4fr',gap:'8px',marginBottom:'8px'}}>
                    {['Risk Category','Prob.','Impact','Mitigation'].map(h=>(<span key={h} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint}}>{h}</span>))}
                  </div>
                  {opp.risks.map((r,i)=>{
                    const probCol=r.prob==='High'?C.red:r.prob==='Medium'?C.amber:C.positive;
                    const impCol=r.impact==='High'?C.red:r.impact==='Medium'?C.amber:C.positive;
                    return(
                      <div key={i} className="risk-row">
                        <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{r.cat}</span>
                        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:probCol,textTransform:'uppercase'}}>{r.prob}</span>
                        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:impCol,textTransform:'uppercase'}}>{r.impact}</span>
                        <span className="risk-mit" style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5,fontStyle:'italic'}}>{r.mit}</span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}

          {/* DEPLOY */}
          {activeTab==='deploy'&&(
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Deployment Parameters</div>
              <div style={{background:C.forest,padding:'18px',marginBottom:'20px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Financial Structure</div>
                {[['Investment Structure',opp.structure],['Minimum Ticket',opp.minTicket],['Target IRR',opp.irr],['Investment Horizon',opp.horizon],['Capital Range',`$${opp.capMin}M – $${opp.capMax}M`],['Engagement Mode',opp.mode]].map(([l,v])=>(
                  <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                    <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.4)'}}>{l}</span>
                    <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,textAlign:'right',maxWidth:'55%'}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Evaluation Stage</div>
              <PipelineViz stage={opp.pipeline} isMobile={isMobile}/>
            </div>
          )}

          {/* CROSS-SECTOR */}
          {activeTab==='cross'&&(
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Cross-Sector Integration</div>
              <div style={{fontFamily:F.body,fontSize:isMobile?'13px':'14px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'20px'}}>{opp.crossNotes}</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'10px'}}>
                {opp.crossSectors.map(sid=>{
                  const s=SECTORS_META.find(x=>x.id===sid);
                  const SI=SECTOR_ICONS[sid];
                  return(
                    <div key={sid} style={{display:'flex',alignItems:'center',gap:'8px',background:C.paperDark,border:`1px solid ${C.border}`,padding:'10px 14px'}}>
                      <div style={{width:'22px',height:'22px',background:C.paper,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{SI&&<SI size={12} color={C.forest}/>}</div>
                      <div>
                        <div style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>{s.num}</div>
                        <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{s.shortName}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Desktop CTAs */}
          {!isMobile&&(
            <div className="gate-cta-row" style={{display:'flex',gap:'10px',marginTop:'24px',paddingTop:'20px',borderTop:`1px solid ${C.border}`}}>
              <a href="#" style={{flex:1,background:C.lime,color:C.ink,padding:'13px 20px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>Request Full Brief <ArrowUpRight size={13}/></a>
              <a href="#" style={{flex:1,background:C.forest,color:C.paper,padding:'13px 20px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>Schedule BRIDGE Call</a>
            </div>
          )}
        </div>
        {/* Mobile sticky CTAs */}
        {isMobile&&(
          <div className="mob-cta-bar">
            <a href="#" style={{flex:1,background:C.lime,color:C.ink,padding:'14px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>Request Brief <ArrowUpRight size={13}/></a>
            <a href="#" style={{flex:1,background:C.forest,color:C.paper,padding:'14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>Book Call</a>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── DASHBOARD PREVIEW ────────────────────────────────────────────────────────
const DashboardPreview = ({onClose, isMobile}) => {
  useEffect(()=>{
    document.body.style.overflow='hidden';
    const fn=(e)=>{if(e.key==='Escape')onClose();};
    window.addEventListener('keydown',fn);
    return()=>{document.body.style.overflow='';window.removeEventListener('keydown',fn);};
  },[onClose]);

  const portfolioStats=[
    {v:'$17.4M',l:'Total Deployable Capital'},
    {v:'83',l:'Avg BRIDGE Score'},
    {v:'18%',l:'Blended IRR Target'},
    {v:'11',l:'Active Ventures'},
  ];

  const modules=[
    {
      title:'Portfolio Overview',
      desc:'Live capital allocation by sector, tier, and engagement mode. IRR weighted by deployment size.',
      preview:[
        {label:'Sector 06 · Agriculture',pct:34,val:'$5.9M'},
        {label:'Sector 02 · Financial',pct:22,val:'$3.8M'},
        {label:'Sector 12 · Transport',pct:18,val:'$3.1M'},
        {label:'Sector 03 · Health',pct:14,val:'$2.4M'},
        {label:'Remaining sectors',pct:12,val:'$2.1M'},
      ],
      tag:'Capital Allocation',
    },
    {
      title:'Pipeline Tracker',
      desc:'All ventures by pipeline stage. Move from Screening through Due Diligence to Committee in real time.',
      preview:[
        {label:'Screening',pct:20,val:'4 ventures'},
        {label:'Scoring',pct:45,val:'3 ventures'},
        {label:'Due Diligence',pct:73,val:'2 ventures'},
        {label:'Committee',pct:90,val:'1 venture'},
        {label:'Structuring',pct:100,val:'1 venture'},
      ],
      tag:'Deal Flow',
    },
    {
      title:'Score Distribution',
      desc:'BRIDGE Impact Score™ across all 11 active ventures. Heatmap by dimension — Peace & Prosperity, Strategic Fit, Feasibility, Financial Sustainability.',
      preview:[
        {label:'Peace & Prosperity avg',pct:88,val:'26/30'},
        {label:'Strategic Fit avg',pct:84,val:'21/25'},
        {label:'Feasibility avg',pct:76,val:'19/25'},
        {label:'Financial Sustain. avg',pct:70,val:'14/20'},
      ],
      tag:'Score Intelligence',
    },
    {
      title:'IRR & Return Modelling',
      desc:'Scenario modelling across deployment timelines. Base, optimistic, and stress-test IRR by venture and portfolio aggregate.',
      preview:[
        {label:'Base case IRR',pct:72,val:'18%'},
        {label:'Optimistic case',pct:88,val:'22%'},
        {label:'Stress test',pct:48,val:'12%'},
        {label:'Capital at risk',pct:15,val:'$2.6M'},
      ],
      tag:'Financial Modelling',
    },
    {
      title:'Co-Investment Map',
      desc:'Live view of DFI and co-investor commitments by venture. Blended finance stack per deal — who\u2019s in, at what terms, at what stage.',
      preview:[
        {label:'USAID committed',pct:80,val:'$4.2M'},
        {label:'AfDB in diligence',pct:55,val:'$8.0M'},
        {label:'Injaro deployed',pct:100,val:'$1.5M'},
        {label:'Root Capital active',pct:65,val:'$900K'},
      ],
      tag:'Co-Investment',
    },
    {
      title:'Policy Alignment Monitor',
      desc:'Real-time tracking of key government programmes — Oil Palm Window drawdown, Grow24 progress, Farmer Service Center rollout.',
      preview:[
        {label:'Oil Palm Window',pct:12,val:'Q2 2026'},
        {label:'Grow24 irrigation',pct:8,val:'On track'},
        {label:'Farmer Svc Centers',pct:22,val:'Active'},
        {label:'Connect24 roads',pct:35,val:'2027'},
      ],
      tag:'Policy Tracker',
    },
  ];

  return(
    <div className="dash-overlay">
      {/* Header */}
      <div style={{position:'sticky',top:0,zIndex:10,background:C.ink,borderBottom:'1px solid rgba(255,255,255,0.08)',padding:isMobile?'12px 18px':'14px 48px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <DocumentLogo height={isMobile?16:18} variant="white"/>
          <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.12)'}}/>
          <div>
            <div style={{fontFamily:F.sans,fontSize:isMobile?'11px':'12px',fontWeight:700,color:C.paper}}>Portfolio Dashboard</div>
            {!isMobile&&<div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'1px',textTransform:'uppercase',marginTop:'1px'}}>Coming Soon · All Members</div>}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.amber,letterSpacing:'1.5px',textTransform:'uppercase',border:'1px solid rgba(184,115,10,0.4)',padding:'4px 10px'}}>Preview</span>
          <button onClick={onClose} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.5)',cursor:'pointer',width:'32px',height:'32px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.sans,fontSize:'16px'}}>×</button>
        </div>
      </div>

      <div style={{padding:isMobile?'24px 18px':'40px 48px',maxWidth:'1100px',margin:'0 auto'}}>

        {/* Hero pitch */}
        <div style={{marginBottom:isMobile?'32px':'48px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(184,217,53,0.5)',marginBottom:'12px'}}>
            BRIDGE Intelligence · Portfolio Dashboard
          </div>
          <h1 style={{fontFamily:F.display,fontSize:isMobile?'clamp(26px,7vw,36px)':'clamp(28px,4vw,52px)',fontWeight:900,color:C.paper,lineHeight:1.05,letterSpacing:'-1px',marginBottom:'16px'}}>
            Every venture.<br/>
            <span style={{color:C.lime}}>One command centre.</span>
          </h1>
          <p style={{fontFamily:F.body,fontSize:isMobile?'14px':'16px',color:'rgba(250,248,243,0.45)',lineHeight:1.8,fontWeight:300,maxWidth:'620px',marginBottom:'28px'}}>
            The Opportunity Database shows you what exists. The Portfolio Dashboard shows you what's moving — live pipeline stages, capital deployment, IRR modelling, co-investor commitments, and policy alignment — in a single real-time view built for active investors.
          </p>
          {/* Stat strip */}
          <div className="dash-grid-3" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',marginBottom:'32px'}}>
            {portfolioStats.map((s,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',padding:isMobile?'14px 12px':'18px 20px'}}>
                <div style={{fontFamily:F.mono,fontSize:isMobile?'22px':'28px',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'6px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)'}}>{s.l}</div>
              </div>
            ))}
          </div>
          {/* Divider */}
          <div style={{borderTop:'1px solid rgba(255,255,255,0.07)',paddingTop:'32px'}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.2)',marginBottom:'20px'}}>What's Inside — 6 Dashboard Modules</div>
          </div>
        </div>

        {/* Module previews */}
        <div className="dash-modules" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:isMobile?'12px':'16px',marginBottom:'40px'}}>
          {modules.map((mod,mi)=>(
            <div key={mi} style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.07)',overflow:'hidden'}}>
              {/* Module header */}
              <div style={{background:'rgba(255,255,255,0.03)',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'12px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:isMobile?'12px':'13px',fontWeight:700,color:C.paper,marginBottom:'4px'}}>{mod.title}</div>
                  <div style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.35)',lineHeight:1.55,fontStyle:'italic'}}>{mod.desc}</div>
                </div>
                <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.lime,background:'rgba(184,217,53,0.1)',border:'1px solid rgba(184,217,53,0.2)',padding:'3px 8px',flexShrink:0,whiteSpace:'nowrap'}}>{mod.tag}</span>
              </div>
              {/* Wireframe data preview */}
              <div style={{padding:'14px 18px'}}>
                <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.15)',marginBottom:'10px'}}>Live data preview</div>
                {mod.preview.map((row,ri)=>(
                  <div key={ri} style={{marginBottom:'8px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'3px'}}>
                      <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.35)'}}>{row.label}</span>
                      <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:'rgba(255,255,255,0.5)'}}>{row.val}</span>
                    </div>
                    <div className="dash-bar">
                      <div className="dash-bar-fill" style={{width:`${row.pct}%`}}/>
                    </div>
                  </div>
                ))}
              </div>
              {/* Locked indicator */}
              <div style={{padding:'10px 18px',background:'rgba(0,0,0,0.2)',borderTop:'1px solid rgba(255,255,255,0.05)',display:'flex',alignItems:'center',gap:'6px'}}>
                <Lock size={10} color="rgba(255,255,255,0.2)"/>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.2)',letterSpacing:'0.5px'}}>Live data · All Members · Q3 2026</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div style={{border:`1px solid rgba(184,217,53,0.2)`,background:'rgba(184,217,53,0.03)',padding:isMobile?'24px 20px':'32px 40px',marginBottom:'24px'}}>
          <div className="dash-grid-2" style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'32px',alignItems:'center'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'10px'}}>Notify Me When It Launches</div>
              <div style={{fontFamily:F.display,fontSize:isMobile?'18px':'22px',fontWeight:700,color:C.paper,lineHeight:1.25,marginBottom:'10px'}}>Be first in. Founding members get early access and input on dashboard features.</div>
              <div style={{fontFamily:F.body,fontSize:'13px',color:'rgba(250,248,243,0.4)',lineHeight:1.7,fontStyle:'italic',maxWidth:'480px'}}>Target launch Q3 2026. Included in all BRIDGE memberships. No additional cost.</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',flexShrink:0}}>
              <a href="mailto:intelligence@bridgepbc.com?subject=Portfolio Dashboard — Early Access Request" style={{background:C.lime,color:C.ink,padding:isMobile?'13px 20px':'15px 28px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',whiteSpace:'nowrap'}}>
                Request Early Access <ArrowUpRight size={13}/>
              </a>
              <button onClick={onClose} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.12)',color:'rgba(255,255,255,0.4)',padding:'11px 20px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,cursor:'pointer',letterSpacing:'0.5px'}}>
                Back to Database
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div style={{display:'flex',justifyContent:'center',paddingBottom:'40px'}}>
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(255,255,255,0.2)',textAlign:'center',maxWidth:'500px',lineHeight:1.7}}>
            The Portfolio Dashboard is included in all BRIDGE memberships. No additional cost. No separate subscription.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function BRIDGEMembersDatabase() {
  const isMobile=useIsMobile();
  const [search,setSearch]=useState('');
  const [activeSector,setActiveSector]=useState(null);
  const [activeTier,setActiveTier]=useState(null);
  const [activeStage,setActiveStage]=useState(null);
  const [activeMode,setActiveMode]=useState(null);
  const [activeCapital,setActiveCapital]=useState(null);
  const [sortBy,setSortBy]=useState('score');
  const [selectedOpp,setSelectedOpp]=useState(null);
  const [filtersOpen,setFiltersOpen]=useState(false);
  const [mobSearch,setMobSearch]=useState(false);
  const [showDashboard,setShowDashboard]=useState(false);
  const DESK_INITIAL=6; const DESK_STEP=2;
  const MOB_INITIAL=2;  const MOB_STEP=1;
  const [deskVisible,setDeskVisible]=useState(DESK_INITIAL);
  const [mobVisible,setMobVisible]=useState(MOB_INITIAL);

  const filtered=useMemo(()=>{
    let r=[...OPPORTUNITIES];
    if(search.trim()){const q=search.toLowerCase();r=r.filter(o=>o.title.toLowerCase().includes(q)||o.fullDesc.toLowerCase().includes(q)||o.tags.some(t=>t.toLowerCase().includes(q))||SECTORS_META.find(s=>s.id===o.sector)?.name.toLowerCase().includes(q));}
    if(activeSector)r=r.filter(o=>o.sector===activeSector);
    if(activeTier)r=r.filter(o=>o.tier===activeTier);
    if(activeStage)r=r.filter(o=>o.stage===activeStage);
    if(activeMode)r=r.filter(o=>o.mode===activeMode);
    if(activeCapital){const cr=CAPITAL_RANGES.find(x=>x.label===activeCapital);if(cr)r=r.filter(o=>o.capMin>=cr.min&&o.capMin<cr.max);}
    if(sortBy==='score')r.sort((a,b)=>b.score-a.score);
    else if(sortBy==='irr')r.sort((a,b)=>parseFloat(b.irr)-parseFloat(a.irr));
    else if(sortBy==='cap-asc')r.sort((a,b)=>a.capMin-b.capMin);
    else if(sortBy==='cap-desc')r.sort((a,b)=>b.capMin-a.capMin);
    return r;
  },[search,activeSector,activeTier,activeStage,activeMode,activeCapital,sortBy]);

  const clearAll=()=>{setSearch('');setActiveSector(null);setActiveTier(null);setActiveStage(null);setActiveMode(null);setActiveCapital(null);setDeskVisible(DESK_INITIAL);setMobVisible(MOB_INITIAL);};
  const activeFilterCount=[activeSector,activeTier,activeStage,activeMode,activeCapital].filter(Boolean).length;
  useEffect(()=>{setDeskVisible(DESK_INITIAL);setMobVisible(MOB_INITIAL);},[search,activeSector,activeTier,activeStage,activeMode,activeCapital,sortBy]);
  const avgScore=filtered.length?Math.round(filtered.reduce((s,o)=>s+o.score,0)/filtered.length):0;
  const avgIRR=filtered.length?Math.round(filtered.reduce((s,o)=>s+parseFloat(o.irr),0)/filtered.length):0;

  const FilterPillDesk=({label,active,onClick})=>(
    <button onClick={onClick} className="fpill" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,padding:'6px 12px',cursor:'pointer',outline:'none',border:active?`1.5px solid ${C.forest}`:`1px solid ${C.border}`,background:active?C.forest:'transparent',color:active?C.paper:C.muted}}>{label}</button>
  );

  return(
    <div style={{background:C.paper,minHeight:'100vh'}}>
      <DocumentGlobalStyles extraCss={EXTRA_CSS}/>

      {/* TOPBAR */}
      <div className="np" style={{position:'sticky',top:0,zIndex:100,background:C.ink,
        borderBottom:'1px solid rgba(255,255,255,0.08)',
        padding:isMobile?'10px 18px':'10px 40px',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <DocumentLogo height={isMobile?18:20} variant="white"/>
          {!isMobile&&<>
            <div style={{width:'1px',height:'16px',background:'rgba(255,255,255,0.15)'}}/>
            <Lock size={11} color={C.lime}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.4)'}}>Members · Full Access</span>
          </>}
          {isMobile&&<div style={{display:'flex',alignItems:'center',gap:'5px'}}><Lock size={11} color={C.lime}/><span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(255,255,255,0.4)'}}>Members</span></div>}
        </div>
        {isMobile?(
          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
            <button onClick={()=>setMobSearch(s=>!s)} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'7px 10px',cursor:'pointer',display:'flex',alignItems:'center',color:'rgba(255,255,255,0.6)'}}><Search size={16}/></button>
            <button onClick={()=>setFiltersOpen(true)} style={{background:activeFilterCount>0?C.lime:'rgba(255,255,255,0.06)',border:`1px solid ${activeFilterCount>0?C.lime:'rgba(255,255,255,0.12)'}`,padding:'7px 12px',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:activeFilterCount>0?C.ink:'rgba(255,255,255,0.6)'}}>
              <Filter size={14}/>{activeFilterCount>0&&activeFilterCount}
            </button>
            <a href="#" style={{background:C.lime,color:C.ink,padding:'7px 12px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none'}}>Account</a>
          </div>
        ):(
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <a onClick={e=>{e.preventDefault();setShowDashboard(true);}} href="#" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'rgba(255,255,255,0.4)',textDecoration:'none',cursor:'pointer'}}>Dashboard</a>
            <a href="#" style={{background:C.lime,color:C.ink,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none'}}>My Account →</a>
          </div>
        )}
      </div>

      {/* MOBILE SEARCH */}
      {isMobile&&(
        <div style={{maxHeight:mobSearch?'60px':'0',overflow:'hidden',transition:'max-height 0.25s ease',background:C.teal,borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
          <div style={{padding:'10px 18px',display:'flex',gap:'8px',alignItems:'center'}}>
            <div style={{position:'relative',flex:1}}>
              <Search size={13} color='rgba(255,255,255,0.4)' style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
              <input className="db-search" value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search ventures, thesis, sectors…"
                autoFocus={mobSearch}
                style={{width:'100%',padding:'10px 10px 10px 32px',fontFamily:F.sans,fontSize:'14px',color:C.ink,background:C.paper,border:'none'}}/>
            </div>
            {search&&<button onClick={()=>setSearch('')} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.6)',display:'flex',padding:'4px'}}><X size={16}/></button>}
          </div>
        </div>
      )}

      {/* COVER */}
      <div style={{background:C.ink,padding:isMobile?'28px 18px 24px':'56px 64px 48px'}}>
        <div style={{maxWidth:'960px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px'}}>
            <Lock size={12} color={C.lime}/>
            <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(184,217,53,0.6)'}}>BRIDGE Members · Full Access</span>
          </div>
          <h1 style={{fontFamily:F.display,fontSize:isMobile?'clamp(24px,8vw,34px)':'clamp(28px,5vw,52px)',fontWeight:900,color:C.paper,lineHeight:1.1,marginBottom:'12px'}}>
            {isMobile?'Complete Venture Intelligence.':'Complete Venture Intelligence.\nEvery Dimension. Every Risk.'}
          </h1>
          {!isMobile&&(
            <div style={{fontFamily:F.body,fontSize:'15px',color:'rgba(250,248,243,0.5)',lineHeight:1.75,maxWidth:'580px',marginBottom:'32px',fontWeight:300}}>
              Full BRIDGE Impact Score™ breakdowns, investment theses, risk matrices, deployment parameters, cross-sector integration maps, and pipeline status — for every venture in the BRIDGE portfolio.
            </div>
          )}
          {/* Stats strip */}
          <div style={{display:'flex',gap:'0',flexWrap:'wrap',borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:isMobile?'20px':'28px',marginTop:isMobile?'16px':'0'}}>
            {[
              [OPPORTUNITIES.length,'Detailed Analyses'],
              ['12','Sectors'],
              [Math.round(OPPORTUNITIES.reduce((s,o)=>s+o.score,0)/OPPORTUNITIES.length),'Avg Score'],
              [Math.round(OPPORTUNITIES.reduce((s,o)=>s+parseFloat(o.irr),0)/OPPORTUNITIES.length)+'%','Avg IRR Target'],
            ].map(([v,l],i)=>(
              <div key={l} style={{
                flex:isMobile?'1 1 50%':'none',
                paddingRight:isMobile?'0':'32px',marginRight:isMobile?'0':'32px',
                borderRight:(!isMobile&&i<3)?'1px solid rgba(255,255,255,0.08)':'none',
                borderBottom:isMobile?(i<2?'1px solid rgba(255,255,255,0.06)':'none'):'none',
                padding:isMobile?'12px 0':'0 32px 12px 0',
                paddingLeft:isMobile&&i%2!==0?'16px':'0',
                borderLeft:isMobile&&i%2!==0?'1px solid rgba(255,255,255,0.06)':'none',
              }}>
                <div style={{fontFamily:F.mono,fontSize:isMobile?'26px':'32px',fontWeight:500,color:C.lime,lineHeight:1}}>{v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',marginTop:'5px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP FILTER BAR */}
      {!isMobile&&(
        <div style={{background:C.paperDark,borderBottom:`1px solid ${C.border}`,padding:'14px 64px',position:'sticky',top:'43px',zIndex:98,boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          <div style={{maxWidth:'960px',margin:'0 auto'}}>
            <div style={{display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap'}}>
              <div style={{position:'relative',flex:'1 1 220px',minWidth:'180px',maxWidth:'340px'}}>
                <Search size={13} color={C.faint} style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
                <input className="db-search" value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Search ventures, sectors, thesis, risks…"
                  style={{width:'100%',padding:'9px 32px 9px 32px',fontFamily:F.sans,fontSize:'12px',color:C.ink,background:C.paper,border:`1px solid ${C.border}`}}/>
                {search&&<button onClick={()=>setSearch('')} style={{position:'absolute',right:'8px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:C.faint,display:'flex',padding:0}}><X size={12}/></button>}
              </div>
              <button onClick={()=>setFiltersOpen(o=>!o)} style={{display:'flex',alignItems:'center',gap:'6px',padding:'9px 14px',background:filtersOpen?C.forest:'transparent',border:`1px solid ${filtersOpen?C.forest:C.border}`,cursor:'pointer',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:filtersOpen?C.paper:C.muted,flexShrink:0}}>
                <Filter size={12}/> Filters
                {activeFilterCount>0&&<span style={{background:C.lime,color:C.ink,borderRadius:'10px',padding:'1px 7px',fontSize:'9px',fontWeight:800}}>{activeFilterCount}</span>}
                <ChevronDown size={12} style={{transform:filtersOpen?'rotate(180deg)':'none',transition:'transform 0.2s'}}/>
              </button>
              <div style={{display:'flex',alignItems:'center',gap:'6px',marginLeft:'auto',flexShrink:0}}>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:C.faint}}>Sort:</span>
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,background:'transparent',border:`1px solid ${C.border}`,padding:'7px 10px',cursor:'pointer',outline:'none'}}>
                  <option value="score">By Score ↓</option>
                  <option value="irr">By IRR ↓</option>
                  <option value="cap-asc">Capital ↑</option>
                  <option value="cap-desc">Capital ↓</option>
                </select>
              </div>
            </div>
            {/* Active chips */}
            {!filtersOpen&&activeFilterCount>0&&(
              <div className="chip-strip">
                {activeSector&&(()=>{const s=SECTORS_META.find(x=>x.id===activeSector);return(<span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:C.forest,color:C.paper,padding:'4px 10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700}}>{s.num} {s.shortName}<button onClick={()=>setActiveSector(null)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.6)',display:'flex',padding:0}}><X size={10}/></button></span>);})()}
                {activeTier&&<span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:C.forest,color:C.paper,padding:'4px 10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700}}>{activeTier}<button onClick={()=>setActiveTier(null)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.6)',display:'flex',padding:0}}><X size={10}/></button></span>}
                {activeStage&&<span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:C.forest,color:C.paper,padding:'4px 10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700}}>{activeStage}<button onClick={()=>setActiveStage(null)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.6)',display:'flex',padding:0}}><X size={10}/></button></span>}
                {activeMode&&<span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:C.forest,color:C.paper,padding:'4px 10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700}}>{activeMode}<button onClick={()=>setActiveMode(null)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.6)',display:'flex',padding:0}}><X size={10}/></button></span>}
                {activeCapital&&<span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:C.forest,color:C.paper,padding:'4px 10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700}}>{activeCapital}<button onClick={()=>setActiveCapital(null)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.6)',display:'flex',padding:0}}><X size={10}/></button></span>}
              </div>
            )}
            {/* Filter panel */}
            <div className={`filter-panel${filtersOpen?' open':''}`}>
              <div style={{paddingTop:'16px',display:'flex',flexDirection:'column',gap:'14px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'8px'}}>Sector</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                    {SECTORS_META.map(s=><FilterPillDesk key={s.id} label={`${s.num} ${s.shortName}`} active={activeSector===s.id} onClick={()=>setActiveSector(activeSector===s.id?null:s.id)}/>)}
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'20px'}}>
                  {[
                    ['Tier',['Core','Emerging'],activeTier,setActiveTier],
                    ['Stage',['Active','Seed','Concept'],activeStage,setActiveStage],
                    ['Mode',['INVEST','INCUBATE','CONNECT','ADVISE'],activeMode,setActiveMode],
                    ['Capital',CAPITAL_RANGES.map(r=>r.label),activeCapital,setActiveCapital],
                  ].map(([label,opts,active,setter])=>(
                    <div key={label}>
                      <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'8px'}}>{label}</div>
                      <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
                        {opts.map(o=><FilterPillDesk key={o} label={o} active={active===o} onClick={()=>setter(active===o?null:o)}/>)}
                      </div>
                    </div>
                  ))}
                </div>
                {activeFilterCount>0&&<button onClick={clearAll} style={{alignSelf:'flex-start',background:'none',border:'none',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.red,cursor:'pointer',display:'flex',alignItems:'center',gap:'4px',padding:0}}><X size={10}/> Clear all filters</button>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE SORT BAR */}
      {isMobile&&(
        <div style={{background:C.paperDark,borderBottom:`1px solid ${C.border}`,padding:'10px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'10px'}}>
          <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
            <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{filtered.length}</span>
            <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>ventures</span>
            {filtered.length>0&&<span style={{fontFamily:F.mono,fontSize:'10px',color:C.teal,marginLeft:'6px'}}>{avgIRR}% avg IRR</span>}
            {activeFilterCount>0&&<button onClick={clearAll} style={{background:'none',border:'none',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.red,cursor:'pointer',marginLeft:'4px',padding:0}}>Clear</button>}
          </div>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.forest,background:'transparent',border:`1px solid ${C.border}`,padding:'6px 10px',cursor:'pointer',outline:'none'}}>
            <option value="score">Best Score</option>
            <option value="irr">Highest IRR</option>
            <option value="cap-asc">Capital ↑</option>
            <option value="cap-desc">Capital ↓</option>
          </select>
        </div>
      )}

      {/* RESULTS */}
      <div style={{padding:isMobile?'16px 18px 0':'36px 64px 56px'}} className={isMobile?'mob-page-pad':''}>
        <div style={{maxWidth:'960px',margin:'0 auto'}}>
          {!isMobile&&(
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px',flexWrap:'wrap',gap:'10px'}}>
              <div style={{display:'flex',alignItems:'baseline',gap:'8px'}}>
                <span style={{fontFamily:F.mono,fontSize:'28px',fontWeight:700,color:C.ink,lineHeight:1}}>{filtered.length}</span>
                <span style={{fontFamily:F.sans,fontSize:'12px',color:C.muted}}>{search||activeFilterCount>0?'ventures match':'ventures in database'}</span>
                {(search||activeFilterCount>0)&&<button onClick={clearAll} style={{background:'none',border:'none',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.red,cursor:'pointer',textDecoration:'underline',padding:0}}>Clear</button>}
              </div>
              {filtered.length>0&&(
                <div style={{display:'flex',gap:'20px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'10px',color:C.faint}}>Avg score: <span style={{fontFamily:F.mono,fontWeight:700,color:C.forest}}>{avgScore}</span></div>
                  <div style={{fontFamily:F.sans,fontSize:'10px',color:C.faint}}>Avg IRR: <span style={{fontFamily:F.mono,fontWeight:700,color:C.teal}}>{avgIRR}%</span></div>
                </div>
              )}
            </div>
          )}
          {filtered.length>0?(
            <>
              <div className="opp-grid">
                {filtered.slice(0, isMobile ? mobVisible : deskVisible).map((opp)=>(
                  <OpportunityCard key={opp.id} opp={opp} onClick={setSelectedOpp} isMobile={isMobile}/>
                ))}
              </div>
              {/* Load more */}
              {(()=>{
                const visible = isMobile ? mobVisible : deskVisible;
                const step    = isMobile ? MOB_STEP   : DESK_STEP;
                const remaining = filtered.length - visible;
                if(remaining <= 0) return null;
                const next = Math.min(step, remaining);
                return (
                  <button
                    onClick={()=>isMobile
                      ? setMobVisible(v=>Math.min(v+MOB_STEP, filtered.length))
                      : setDeskVisible(v=>Math.min(v+DESK_STEP, filtered.length))
                    }
                    style={{display:'flex',alignItems:'center',justifyContent:'space-between',
                      width:'100%',padding:'14px 20px',marginTop:'12px',
                      border:`1px solid ${C.border}`,background:C.paperDark,
                      cursor:'pointer',fontFamily:F.sans,fontSize:'12px',fontWeight:700,
                      letterSpacing:'0.5px',color:C.forest,gap:'8px'}}
                  >
                    <span>Show {next} more venture{next!==1?'s':''}</span>
                    <span style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:400,color:C.faint}}>
                        {visible} of {filtered.length}
                      </span>
                      <span style={{fontFamily:F.mono,fontSize:'14px',color:C.lime}}>↓</span>
                    </span>
                  </button>
                );
              })()}
            </>
          ):(
            <div style={{padding:'64px 0',textAlign:'center',borderTop:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.mono,fontSize:'48px',fontWeight:500,color:C.border,lineHeight:1,marginBottom:'12px'}}>0</div>
              <div style={{fontFamily:F.display,fontSize:'18px',color:C.muted,marginBottom:'8px',fontStyle:'italic'}}>No ventures match those filters.</div>
              <button onClick={clearAll} style={{background:C.forest,border:'none',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,cursor:'pointer',padding:'10px 20px',marginTop:'8px'}}>Reset filters</button>
            </div>
          )}
        </div>
      </div>

      {/* INVESTOR FUNNEL (desktop only) */}
      {!isMobile&&(
        <div style={{background:C.ink,overflow:'hidden'}}>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.07)',padding:'56px 64px'}}>
            <div style={{maxWidth:'960px',margin:'0 auto'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(184,217,53,0.5)',marginBottom:'16px'}}>Member Access · What You Have</div>
                  <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                    {['Full BRIDGE Impact Score™ breakdowns','Investment theses for every venture','Complete risk matrices','Deployment parameters & IRR targets','Cross-sector integration maps','Pipeline stage & evaluation status'].map(item=>(
                      <div key={item} style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <span style={{color:C.lime,fontSize:'12px',flexShrink:0}}>✓</span>
                        <span style={{fontFamily:F.sans,fontSize:'13px',color:'rgba(250,248,243,0.6)'}}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(184,217,53,0.6)',marginBottom:'16px'}}>Co-Investment Access · Also Included</div>
                  <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                    {[['Direct BRIDGE team access','Co-invest alongside BRIDGE on active deals'],['Full venture financial models','Projections, unit economics, cap table structure'],['Priority deal flow alerts','First notification when new opportunities open'],['Co-investment access','Minimum ticket $10K in qualifying ventures'],['Quarterly portfolio reviews','Live calls with BRIDGE investment team'],['Government introduction pathway','BRIDGE-facilitated access to MoF, GIPC, GMA']].map(([title,sub])=>(
                      <div key={title} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                        <span style={{color:C.lime,fontSize:'11px',flexShrink:0,marginTop:'2px'}}>✓</span>
                        <div>
                          <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper}}>{title}</div>
                          <div style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(255,255,255,0.3)',marginTop:'1px'}}>{sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{borderBottom:'1px solid rgba(255,255,255,0.07)',padding:'56px 64px'}}>
            <div style={{maxWidth:'960px',margin:'0 auto'}}>
              <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'64px',alignItems:'start'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(184,217,53,0.5)',marginBottom:'16px'}}>Ready to Co-Invest?</div>
                  <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,3.5vw,40px)',fontWeight:900,color:C.paper,lineHeight:1.15,marginBottom:'20px'}}>Your membership opens the door.<br/>Co-investment puts you in the deal.</h2>
                  <div style={{fontFamily:F.body,fontSize:'15px',color:'rgba(250,248,243,0.55)',lineHeight:1.85,fontWeight:300,marginBottom:'28px'}}>Your BRIDGE membership gives you full intelligence on every venture. When you’re ready to deploy capital, BRIDGE co-investment deals are available to all members — starting at $10K.</div>
                  <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'18px',marginBottom:'32px'}}>
                    <div style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:'rgba(184,217,53,0.8)',lineHeight:1.6}}>"Your BRIDGE membership already includes co-investment access. The only question is which venture fits your mandate."</div>
                  </div>
                  <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                    <a href="#" style={{background:C.lime,color:C.ink,padding:'16px 32px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',display:'flex',alignItems:'center',gap:'8px'}}>Express Co-Investment Interest <ArrowUpRight size={14}/></a>
                    <a href="#" style={{border:'1px solid rgba(255,255,255,0.15)',color:'rgba(250,248,243,0.7)',padding:'16px 24px',fontFamily:F.sans,fontSize:'13px',fontWeight:700,textDecoration:'none'}}>Schedule a Call First</a>
                  </div>
                </div>
                <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',padding:'28px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'20px'}}>What Co-Investment Access Includes</div>
                  {[['Full Intelligence Database','included'],['12 Sector Analysis Packages','~$4,800 value'],['Financial models per venture','~$12,000 value'],['Co-investment access','from $10K'],['Quarterly investor calls','4 × 90 min'],['BRIDGE deal flow alerts','priority access'],['Government introductions','GIZ, GIPC, MoF'],['Dedicated relationship','1:1 contact']].map(([l,v])=>(
                    <div key={l} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                      <span style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.55)'}}>{l}</span>
                      <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.lime,whiteSpace:'nowrap',marginLeft:'12px'}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{padding:'48px 64px'}}>
            <div style={{maxWidth:'960px',margin:'0 auto'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'28px'}}>Common Questions</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'32px'}}>
                {[["I'm not ready to invest yet. Is this still useful?","Yes. Many members join 6–12 months before their first deployment to build the relationship and be positioned when the right opportunity emerges."],["What if I want to invest but not as a co-investor?","BRIDGE structures opportunities in multiple ways — equity, debt instruments, revenue share, and blended vehicles. The membership unlocks access; the terms are yours to shape."],["How selective is BRIDGE about co-investment partners?","Deliberately. BRIDGE maintains small investor syndicates per deal — typically 3–7 co-investors. We look for patient capital with local commitment."],["I'm based outside Ghana. Is this relevant?","Most members are diaspora-based or international. BRIDGE exists precisely to bridge that gap — you bring capital; BRIDGE provides on-the-ground infrastructure."]].map(([q,a])=>(
                  <div key={q} style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'20px'}}>
                    <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.paper,marginBottom:'10px',lineHeight:1.4}}>{q}</div>
                    <div style={{fontFamily:F.body,fontSize:'13px',color:'rgba(250,248,243,0.45)',lineHeight:1.8,fontWeight:300}}>{a}</div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'48px',paddingTop:'32px',borderTop:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'20px'}}>
                <div>
                  <div style={{fontFamily:F.display,fontSize:'clamp(16px,2.5vw,22px)',fontWeight:700,color:C.paper,marginBottom:'4px'}}>Co-investment slots open now. Limited per venture.</div>
                  <div style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(255,255,255,0.3)'}}>BRIDGE matches members to ventures by mandate fit. We respond within 5 business days.</div>
                </div>
                <a href="#" style={{background:C.lime,color:C.ink,padding:'15px 32px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',display:'flex',alignItems:'center',gap:'8px',whiteSpace:'nowrap'}}>Apply Now <ArrowUpRight size={14}/></a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE UPGRADE STRIP */}
      {isMobile&&(
        <div style={{background:C.forest,padding:'24px 18px 28px',marginTop:'8px',borderTop:`3px solid ${C.lime}`}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(184,217,53,0.6)',marginBottom:'10px'}}>Ready to Co-Invest?</div>
          <div style={{fontFamily:F.display,fontSize:'20px',fontWeight:700,color:C.paper,lineHeight:1.25,marginBottom:'10px'}}>Your membership includes co-investment access.</div>
          <div style={{fontFamily:F.body,fontSize:'13px',color:'rgba(250,248,243,0.5)',lineHeight:1.75,fontWeight:300,marginBottom:'18px'}}>All BRIDGE members can co-invest alongside us in active deals. Starting at $10K. Express your interest and we’ll match you to the right venture.</div>
          <a href="#" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',background:C.lime,color:C.ink,padding:'16px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',width:'100%'}}>
            Express Co-Investment Interest <ArrowUpRight size={14}/>
          </a>
        </div>
      )}

      {/* FOOTER */}
      <div style={{background:C.ink,padding:isMobile?'16px 18px':'16px 64px',borderTop:`3px solid ${C.forest}`}}>
        <div className="footer-inner" style={{maxWidth:'960px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <DocumentLogo height={18} variant="white"/>
          <div className="footer-links" style={{display:'flex',gap:'16px'}}>
            {['Dashboard','All Sectors','Contact'].map((l,i)=>(
              <a key={i} onClick={l==='Dashboard'?e=>{e.preventDefault();setShowDashboard(true);}:undefined} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.3)',textDecoration:'none',cursor:'pointer'}}>{l}</a>
            ))}
          </div>
          <span className="footer-links" style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.2)',letterSpacing:'1px'}}>BRIDGE Members · 2026</span>
        </div>
      </div>

      {/* MOBILE FILTER SHEET */}
      {isMobile&&(
        <MobileFilterSheet open={filtersOpen} onClose={()=>setFiltersOpen(false)}
          activeSector={activeSector} setActiveSector={setActiveSector}
          activeTier={activeTier} setActiveTier={setActiveTier}
          activeStage={activeStage} setActiveStage={setActiveStage}
          activeMode={activeMode} setActiveMode={setActiveMode}
          activeCapital={activeCapital} setActiveCapital={setActiveCapital}
          onClear={clearAll} activeFilterCount={activeFilterCount}
          resultCount={filtered.length}/>
      )}

      {selectedOpp&&<DetailModal opp={selectedOpp} onClose={()=>setSelectedOpp(null)} isMobile={isMobile}/>}
      {showDashboard&&<DashboardPreview onClose={()=>setShowDashboard(false)} isMobile={isMobile}/>}
    </div>
  );
}
