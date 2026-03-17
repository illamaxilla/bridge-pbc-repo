import { useState, useEffect, useRef } from "react";
import { DOC_COLORS as C, DOC_FONTS as F } from "@/lib/document-tokens";
import DocumentGlobalStyles from "@/components/documents/DocumentGlobalStyles";
import DocumentLogo from "@/components/documents/DocumentLogo";

// ══════════════════════════════════════════════════════════════════════════════
// INTELLIGENCE DATA
// ══════════════════════════════════════════════════════════════════════════════
const MACRO = [
  {v:'$21B+', l:'Global Hemp Market 2030', s:'CAGR 17.5% · from $6.5B today'},
  {v:'$160B', l:'Medical Cannabis 2032', s:'CAGR 22–23% · from $26B in 2024'},
  {v:'Feb 2026', l:'Licensing Regime Launched', s:'Applications open now · 11 categories'},
  {v:'12–24mo', l:'First-Mover Window', s:'Before West African competition intensifies'},
  {v:'$7.6B', l:'Cannabis Testing 2030', s:'CAGR 15.2% · from $2.5B in 2024'},
];

const CHAIN = [
  {num:'03', name:'Breeding & Seed',     tag:'UPSTREAM',    color:C.teal},
  {num:'08', name:'Import',             tag:'TRADE',       color:C.teal},
  {num:'01', name:'Cultivation',        tag:'UPSTREAM',    color:C.forest},
  {num:'02', name:'Processing',         tag:'MID-CHAIN',   color:C.forest},
  {num:'05', name:'Testing Lab',        tag:'ENABLING',    color:C.limeDark},
  {num:'06', name:'Storage',            tag:'ENABLING',    color:C.limeDark},
  {num:'07', name:'Transportation',     tag:'ENABLING',    color:C.limeDark},
  {num:'10', name:'Wholesale',          tag:'MID-CHAIN',   color:C.forest},
  {num:'09', name:'Export',             tag:'TRADE',       color:C.teal},
  {num:'11', name:'Dispensing',         tag:'DOWNSTREAM',  color:C.forest},
  {num:'04', name:'R&D',                tag:'SPECIALIST',  color:C.muted},
];

const L = [
  {
    id:1,num:'01',name:'Cultivation',shortName:'Cultivation',tag:'UPSTREAM',score:72,tier:'Core',
    barrier:'Medium',capital:'Medium–High',timeline:'12–18 months',
    breakdown:{market:72,impact:85,feasibility:60,sustainability:64},
    headline:"The agricultural foundation of Ghana's hemp value chain",
    summary:"Multiple agro-ecological zones, 6.8M hectares under cultivation, and established irrigation infrastructure position Ghana for competitive low-THC hemp production across fibre, seed, and medicinal biomass applications.",
    ghanaFit:"Volta, Ashanti, and Bono regions offer optimal soil and rainfall conditions. Northern savannah zones suit large-scale mechanised production supported by existing irrigation schemes (Tono, Bontanga, Vea, Kpong).",
    models:['Smallholder cooperatives supplying regional processors','Contract/outgrower schemes with guaranteed offtake and input support','Medium-scale commercial farms (10–100 ha)','Vertically integrated farm-to-processor ventures'],
    requirements:['THC-compliant certified seed (≤0.3% dry weight)','NCC site-specific cultivation licence (3-year validity)','Security fencing, GPS field maps, and traceability records','Compliance with NACOC Cannabis Regulations Department protocols'],
    advantage:"Multiple harvests per year possible under irrigation. Existing agricultural workforce and cooperative structures reduce setup time. Proximity to processing corridors reduces logistics cost.",
    mktSize:'~$6.5B global industrial hemp (2024)',mktProj:'~$21B by 2030',mktCagr:'17.5%',
    revenue:'$2,500–5,000/ha gross (dual-purpose)',capex:'$50K–250K equivalent (10–50 ha farm)',breakeven:'2–3 seasons under contract farming',
    risks:[
      {r:'THC exceedance triggering crop destruction',sev:'High',m:'Source EU-certified cultivars; implement pre-harvest THC monitoring protocol'},
      {r:'No processor offtake = stranded production',sev:'High',m:'Secure binding offtake contract before planting; explore vertical integration'},
      {r:'Regulatory licence delays in early years',sev:'Medium',m:'Engage NCC early; use licensed regulatory consultants'},
      {r:'Smallholder capital access constraints',sev:'Medium',m:'Structure DFI-backed value chain finance tied to offtake contracts'},
    ],
    firstMover:"Applications now open. 12–24 month window to establish cultivation contracts before competition intensifies. Early cultivators who secure processing relationships define Ghana's supply architecture.",
  },
  {
    id:2,num:'02',name:'Processing',shortName:'Processing',tag:'MID-CHAIN',score:78,tier:'Core',
    barrier:'High',capital:'High',timeline:'18–36 months',
    breakdown:{market:85,impact:78,feasibility:62,sustainability:72},
    headline:"The highest value-add node in Ghana's hemp economy",
    summary:"Processing transforms raw biomass into fibre, seed oil, CBD extracts, and pharmaceutical APIs — multiplying farm-gate value 3–10×. Ghana's existing manufacturing base in textiles, food, and cosmetics creates natural integration points.",
    ghanaFit:"Tema Free Zone and agro-industrial corridors offer port proximity, tax incentives, and export infrastructure. One District One Factory programme creates processing infrastructure synergies.",
    models:['Hemp fibre decortication supplying textile input markets','Seed oil and protein processing for food and cosmetics','GMP cannabinoid extraction for pharmaceutical APIs','Integrated farm-to-export processing verticals'],
    requirements:['GMP certification for medicinal/pharmaceutical products','HACCP certification for food-grade seed and oil processing','NCC processing licence + FDA Ghana product registration','Environmental compliance: wastewater, dust, solvent handling'],
    advantage:"Ghana Textile Printing and Volta Star Textiles provide ready fibre offtake. Food processing SMEs and cosmetics sector create domestic demand. Port access enables AfCFTA and EU-EPA export from day one.",
    mktSize:'~$7.5B global hemp processing (2023)',mktProj:'~$23.3B by 2030',mktCagr:'17.7%',
    revenue:'$2M–15M/year at mid-scale',capex:'$500K–5M depending on processing stream',breakeven:'3–5 years GMP-grade; 2–3 years primary processing',
    risks:[
      {r:'Capital intensity excluding local SME participation',sev:'High',m:'Phase investment: start with primary decortication, add GMP extraction progressively'},
      {r:'Feedstock scarcity before cultivation scales',sev:'High',m:'Secure multi-year cultivation contracts before commissioning; bridge with imports'},
      {r:'GMP certification complexity and cost',sev:'Medium',m:'Partner with existing GMP pharmaceutical manufacturer; consider toll manufacturing initially'},
    ],
    firstMover:"Processing is the chokepoint of Ghana's cannabis economy. The first-mover processor defines supply chain architecture and attracts cultivator networks and export buyer relationships.",
  },
  {
    id:3,num:'03',name:'Breeding & Seed',shortName:'Breeding',tag:'UPSTREAM',score:64,tier:'Emerging',
    barrier:'Very High',capital:'High',timeline:'5–10 years to commercial variety',
    breakdown:{market:68,impact:72,feasibility:42,sustainability:72},
    headline:"Long-cycle, high-IP opportunity anchoring West Africa's genetics supply",
    summary:"Breeding and seed production for certified low-THC hemp provides the genetic foundation for the entire value chain. Ghana's new Plant Variety Protection law creates an enabling environment for domestic variety development and royalty income.",
    ghanaFit:"University of Ghana, KNUST, CSIR, and Centre for Plant Medicine Research provide institutional research infrastructure for public-private breeding programmes across multiple agro-ecological zones.",
    models:['Public-private variety development with academic institutions','Seed multiplication from licensed European/Canadian genetics (near-term revenue)','Feminised seed production for medicinal hemp cultivation','Regional seed bank and genetics vault services for ECOWAS'],
    requirements:["Plant Variety Protection registration (Ghana's PVP law aligned with UPOV)",'NCC breeding licence + MOFA seed certification compliance','HPLC or PCR-based chemotyping infrastructure for THC verification','Multi-season, multi-location trial data required for variety release'],
    advantage:"No domestic certified hemp seed production exists in West Africa. A Ghanaian breeding programme would be the sub-regional first-mover, capturing ECOWAS seed demand as neighbouring countries develop their own frameworks.",
    mktSize:'$6.0B global hemp seed market (2022)',mktProj:'$10.9B by 2030',mktCagr:'8.8%',
    revenue:'Royalties + certified seed sales (long-term)',capex:'$1M–5M (breeding programme + lab + trials)',breakeven:'5–10 years; near-term via seed multiplication only',
    risks:[
      {r:'Extremely long development timelines (5–10 years)',sev:'High',m:'Start with seed multiplication of certified EU varieties; run parallel breeding programme'},
      {r:'Limited Ghanaian hemp genetics and chemotyping expertise',sev:'High',m:'Partner with European or Canadian breeders; recruit specialist plant scientists'},
      {r:'THC instability in tropical conditions requires extensive re-testing',sev:'Medium',m:'Multi-season Ghanaian trials mandatory before any commercial variety release'},
    ],
    firstMover:"Strategic infrastructure investment best pursued alongside cultivation or processing. Near-term seed multiplication generates revenue while long-cycle breeding programme matures.",
  },
  {
    id:4,num:'04',name:'R&D',shortName:'R&D',tag:'SPECIALIST',score:60,tier:'Emerging',
    barrier:'Very High',capital:'Very High',timeline:'3–15 years',
    breakdown:{market:62,impact:82,feasibility:38,sustainability:58},
    headline:"Positioning Ghana as West Africa's cannabinoid science hub",
    summary:"Cannabis R&D spans pharmaceutical drug development, agronomy, materials science, and nutraceutical innovation. Ghana's research institutions and African disease burden create a compelling CRO and applied-science opportunity.",
    ghanaFit:"Noguchi Memorial Institute, Centre for Plant Medicine Research, University of Ghana, KNUST, and University of Cape Coast provide credible platforms. FDA Ghana's clinical trial framework enables GCP-compliant research.",
    models:['Contract Research Organisation (CRO) for international pharmaceutical sponsors','Agronomic R&D for tropical hemp cultivar adaptation and climate resilience','Materials science R&D: hempcrete, biocomposites, bioplastics','Nutraceutical and functional food formulation for African markets'],
    requirements:['FDA Ghana clinical trial authorisation for pharmaceutical R&D','Ethics committee approval + ICH GCP compliance','NCC R&D licence','International scientific partnerships for credibility and funding access'],
    advantage:"Ghana's disease burden — sickle-cell pain, epilepsy, neuropathic pain, oncology — creates unique clinical trial rationale for cannabinoid therapies. Diverse patient populations and lower costs than Europe attract international sponsors.",
    mktSize:'55+ cannabinoid drugs in Phase 1–3 globally (2025)',mktProj:'Cannabis pharma market growing significantly; growing CRO demand',mktCagr:'Programme-dependent',
    revenue:'Research fees + IP licensing + international grants',capex:'$500K–10M depending on scope',breakeven:'3–15 years; agronomic R&D fastest',
    risks:[
      {r:'Very high capital requirements with long uncertain timelines',sev:'High',m:'Prioritise near-term applied research before pharmaceutical CRO; sequence investments carefully'},
      {r:'Regulatory complexity for clinical trials in Ghana',sev:'High',m:'Early FDA Ghana and ethics committee engagement; partner with established international CROs'},
      {r:'Talent scarcity in cannabis and pharmaceutical science',sev:'High',m:'Build diaspora networks; leverage existing Ghanaian academic institutions'},
    ],
    firstMover:"Strategic long-term institutional play. Near-term focus on agronomic and materials R&D. Best pursued as consortium investment with university, government, and DFI partners.",
  },
  {
    id:5,num:'05',name:'Testing Laboratory',shortName:'Testing Lab',tag:'ENABLING',score:75,tier:'Core',
    barrier:'Medium–High',capital:'Medium',timeline:'12–24 months',
    breakdown:{market:78,impact:72,feasibility:68,sustainability:78},
    headline:"The mandatory quality gateway for every licensed operator",
    summary:"Laboratory testing is legally required at every stage of Ghana's cannabis value chain — THC compliance, contaminant screening, export certification. A single ISO 17025-accredited lab becomes critical infrastructure for the entire sector.",
    ghanaFit:"Ghana has existing ISO 17025 labs for food and pharmaceuticals (SGS Ghana, FDA Ghana labs). A dedicated cannabis testing lab fills a gap that currently has no domestic solution anywhere in West Africa.",
    models:['Dedicated cannabis testing lab serving all NCC licensees','Multi-industry lab: cannabis + food + pharma + environmental','Mobile/on-site rapid THC screening for pre-harvest compliance','Regional ECOWAS lab hub as West African markets develop'],
    requirements:['ISO/IEC 17025:2017 accreditation (Ghana Accreditation Service)','HPLC for cannabinoid quantification — primary instrument','LC-MS/MS for pesticide panel; ICP-MS for heavy metals; PCR for microbials','LIMS integration with NCC national track-and-trace system'],
    advantage:"Only one accredited cannabis testing lab exists in all of Africa (South Africa). Ghana can become the West African testing hub, serving Nigeria, Côte d'Ivoire, Senegal as their frameworks develop.",
    mktSize:'$2.5B global cannabis testing market (2024)',mktProj:'$7.6B by 2030',mktCagr:'15.2%',
    revenue:'$80–200 per compliance panel (Ghana-adjusted; global benchmark $175–450)',capex:'$300K–800K (instruments + laboratory fit-out)',breakeven:'18–30 months at moderate volume',
    risks:[
      {r:'Small domestic market while sector is still nascent',sev:'Medium',m:'Diversify across cannabis, food, pharma, and environmental testing from day one'},
      {r:'High capital cost of analytical instrumentation',sev:'Medium',m:'Phase acquisition; lease HPLC initially; build to full compliance panel over 24 months'},
      {r:'ISO 17025 accreditation takes 12–18 months',sev:'Medium',m:'Begin accreditation immediately; operate on provisional basis for non-regulated testing while awaiting status'},
    ],
    firstMover:"Highest near-term strategic value of any enabling licence. The first ISO 17025-accredited cannabis lab in Ghana becomes mandatory infrastructure. Every other licensee is a captive customer.",
  },
  {
    id:6,num:'06',name:'Storage',shortName:'Storage',tag:'ENABLING',score:67,tier:'Emerging',
    barrier:'Medium',capital:'Medium',timeline:'12–18 months',
    breakdown:{market:65,impact:60,feasibility:72,sustainability:75},
    headline:"Climate-controlled, secure infrastructure for a regulated commodity",
    summary:"Cannabis and hemp require specialised storage conditions (15–21°C, 55–62% RH for flower; cooler and drier for seeds) with full security and track-and-trace compliance. Ghana's existing warehousing base can be upgraded to serve this need.",
    ghanaFit:"Tema and Takoradi port zones offer ideal bonded storage locations for export staging. GPHA free-zone status enables bonded storage for export-staged product. Ghana Commodity Exchange warehousing provides regulatory analogue for adapted infrastructure.",
    models:['Dedicated cannabis storage near Tema port for export staging','Integrated processing-plus-storage facility serving multiple operators','Genetics vault for seed preservation under long-term cold storage','3PL operator adding cannabis-compliant storage module to existing operations'],
    requirements:['Climate control: 15–21°C and 55–62% RH for flower; lower for seeds and genetics','24/7 CCTV, biometric access control, alarm systems and reinforced perimeter','LIMS/WMS integration with NCC national track-and-trace','GMP/GDP-compliant segregated zones by product type and status'],
    advantage:"Existing warehousing infrastructure reduces greenfield capex. GPHA free-zone bonded status enables export-staged storage. Ghana Commodity Exchange operational precedents reduce regulatory ambiguity.",
    mktSize:'Embedded in supply chain costs — not separately tracked',mktProj:'Grows proportionally with cultivation and processing scale',mktCagr:'Sector-linked',
    revenue:'Monthly storage + handling + inspection fees',capex:'$150K–500K (climate and security systems)',breakeven:'18–24 months',
    risks:[
      {r:'Revenue dependent on pace of overall sector growth',sev:'Medium',m:'Co-locate with agricultural or pharmaceutical storage; cannabis adds regulated premium service layer'},
      {r:'High tropical operating costs for climate control',sev:'Medium',m:'Invest in insulation; integrate solar energy to reduce power cost; use passive cooling where feasible'},
    ],
    firstMover:"Strong complement to processing or export licences. Lower risk due to captive sector-wide demand. Best developed as part of a multi-licence strategy alongside processing or export.",
  },
  {
    id:7,num:'07',name:'Transportation',shortName:'Transport',tag:'ENABLING',score:63,tier:'Emerging',
    barrier:'Medium–High',capital:'Medium',timeline:'9–18 months',
    breakdown:{market:62,impact:60,feasibility:65,sustainability:68},
    headline:"Secure, compliant movement connecting every node of the value chain",
    summary:"Cannabis transportation requires secure vehicles, GPS tracking, tamper-evident seals, and full chain-of-custody documentation. Ghana's road freight ecosystem and port logistics operators are well-positioned to add this regulated service layer.",
    ghanaFit:"Ghana's road freight sector, Tema-Takoradi corridors, and regional trade routes to Burkina Faso and Côte d'Ivoire provide the logistics backbone. Security companies provide personnel for high-value cargo.",
    models:['Dedicated cannabis transporter (standalone NCC licence)','Existing freight carrier adding NCC-compliant cannabis module','Pharmaceutical logistics provider extending to medicinal cannabis GDP','Export-focused transporter specialising in farm-to-port movements'],
    requirements:['Enclosed vehicles with lockable, tamper-evident cargo compartments','GPS real-time tracking integrated with NCC track-and-trace system','Driver vetting, training, background checks, and manifest documentation training','Full chain-of-custody paperwork for every shipment leg'],
    advantage:"No specialist cannabis transport currently exists in Ghana. All licensees require this service from day one. Existing logistics companies face minimal competition in adding this NCC-compliant capability.",
    mktSize:'5–15% of cannabis product value (embedded supply chain cost)',mktProj:'Grows proportionally with sector scale',mktCagr:'Sector-linked',
    revenue:'Per-shipment fees + monthly retainers for regular routes',capex:'$50K–200K (vehicle modification + GPS + documentation systems)',breakeven:'12–18 months',
    risks:[
      {r:'Law enforcement confusion and roadside interceptions in early years',sev:'High',m:'Carry full NCC documentation; pre-notify Ghana Police on major routes; engage NCC for law enforcement liaison protocol'},
      {r:'Small market until cultivation and processing scale',sev:'Medium',m:'Maintain general freight; cannabis adds a regulated premium service layer to existing operations'},
    ],
    firstMover:"Low-risk sector entry. Strong strategic value as service provider to all other licensees. Ideal for existing logistics companies seeking regulated sector diversification.",
  },
  {
    id:8,num:'08',name:'Import',shortName:'Import',tag:'TRADE',score:70,tier:'Core',
    barrier:'Medium',capital:'Medium',timeline:'6–12 months',
    breakdown:{market:72,impact:65,feasibility:72,sustainability:72},
    headline:"The connective tissue between global hemp chains and Ghana's sector",
    summary:"Import licences are critical in early years, enabling the flow of certified seed, processing equipment, lab instruments, and pharmaceutical APIs that domestic capacity cannot yet produce. The importer becomes an upstream enabler for every licence category.",
    ghanaFit:"Tema and Takoradi port infrastructure, established customs frameworks, and FDA Ghana medicines import framework create a ready operational template. EU-Ghana EPA and AGOA reduce tariffs on eligible imports.",
    models:['B2B distributor of certified seed and genetics to cultivators','Equipment importer and technical support provider for processors and labs','Pharmaceutical importer for FDA Ghana-registered CBD medicines','Bulk extract/API importer for local formulators and manufacturers'],
    requirements:['NCC import licence + GRA customs documentation','FDA Ghana pharmaceutical import registration for medicine categories','Ghana Standards Authority compliance for food and cosmetics categories','Phytosanitary certificates for all seed and genetic material imports'],
    advantage:"EU-Ghana EPA, AGOA, and AfCFTA reduce import duties on many hemp goods. Ghana's established import trading ecosystem — Tema port agents, freight forwarders, bonded warehouses — provides immediate operational infrastructure.",
    mktSize:'~$122M global hemp seed exports (UNCTAD 2022); CBD market $9.8B (2024)',mktProj:'Strong near-term demand; moderates as domestic production scales',mktCagr:'High early; normalises in 5–7 years',
    revenue:'Distribution margin 10–25% + agency fees + value-added services',capex:'$50K–300K (inventory + bonding + regulatory setup)',breakeven:'6–12 months (fastest of all 11 categories)',
    risks:[
      {r:'FX risk and import duty uncertainty on novel hemp HS codes',sev:'Medium',m:'Hedge currency exposure; work with GRA for advance tariff rulings on new product classifications'},
      {r:'Transitional demand — less critical as domestic production scales',sev:'Medium',m:'Build long-term distribution relationships; pivot to domestic wholesale as market matures'},
    ],
    firstMover:"Fastest path to early revenue in Ghana's cannabis sector. Strong advantage in exclusive agency relationships with EU and Canadian suppliers. Window narrows as domestic cultivation and processing scale.",
  },
  {
    id:9,num:'09',name:'Export',shortName:'Export',tag:'TRADE',score:80,tier:'Core',
    barrier:'Medium–High',capital:'Medium–High',timeline:'18–30 months',
    breakdown:{market:88,impact:82,feasibility:65,sustainability:78},
    headline:"Ghana's highest-value strategic play in the global hemp economy",
    summary:"Export connects Ghana's domestic production to EU, UK, US, and Asian markets. UNCTAD records $122M in hemp seed exports (2022). Pharmaceutical-grade APIs command premium prices. Ghana's trade agreements create structural advantages over landlocked African competitors.",
    ghanaFit:"Tema and Takoradi provide direct ocean freight access. EU-Ghana EPA (duty-free), AGOA, and AfCFTA create preferential market access. Cocoa and oilseed export experience provides buyer relationship templates.",
    models:['Agricultural commodity exporter: fibre, seed, hurd','Value-added exporter: hempseed oil, protein, cosmetic ingredients','GMP-certified pharmaceutical API and extract exporter','Integrated trading house consolidating from multiple operators'],
    requirements:['NCC export licence + destination-country import permits','EU Novel Food authorisation for CBD-containing foods into EU','GMP certification for pharmaceutical APIs and extracts','Organic/Fair Trade certification for premium food-grade markets','THC compliance documentation and certificate of analysis per shipment'],
    advantage:"Coastal port access vs. landlocked African competitors (Lesotho, Zimbabwe, Malawi). EU-Ghana EPA duty-free access. AGOA coverage for processed goods. Established cocoa export relationships provide buyer network analogues.",
    mktSize:'$122M hemp seed exports globally (UNCTAD 2022); CBD market $9.8B (2024)',mktProj:'Hemp $21B by 2030; CBD $23–25B by 2030',mktCagr:'17–22% across product categories',
    revenue:'Fibre: $500–1,500/t · Seed oil: $3,000–8,000/t · CBD isolate: $500–3,000/kg · GMP APIs: premium',capex:'$200K–2M (certification + marketing + working capital)',breakeven:'2–4 years pharmaceutical; faster for commodities',
    risks:[
      {r:'EU Novel Food regulation raises barrier for CBD food exports',sev:'High',m:'Focus on fibre, seed, and pharmaceutical APIs first; build EU novel food dossier in parallel'},
      {r:'GMP certification is lengthy and expensive',sev:'High',m:'Partner with existing GMP-certified processor; use toll manufacturing initially to reduce capex'},
      {r:'Destination-country regulatory changes',sev:'Medium',m:'Diversify across multiple destination markets; monitor developments with BRIDGE Intelligence'},
    ],
    firstMover:"12–24 month window to establish export relationships before West African competition intensifies. Port advantage and trade agreement coverage are durable structural benefits.",
  },
  {
    id:10,num:'10',name:'Wholesale & Distribution',shortName:'Wholesale',tag:'MID-CHAIN',score:70,tier:'Core',
    barrier:'Medium',capital:'Medium',timeline:'12–18 months',
    breakdown:{market:72,impact:68,feasibility:68,sustainability:72},
    headline:"The commercial coordination layer connecting production to markets",
    summary:"Wholesale distributors aggregate products from multiple cultivators and processors, ensure quality and compliance, and distribute to manufacturers, pharmacies, and exporters. In California and New York, distribution is legally mandatory in the supply chain.",
    ghanaFit:"Ghana's commodity trading infrastructure — GCX, cocoa purchasing buyer networks, agro-processing supply chains — provides an institutional template. Mobile money and digital B2B platforms enable modern wholesale operations.",
    models:['Hemp commodity trader: biomass, fibre, seed, grain','B2B distributor to food, cosmetics, textile, and construction manufacturers','Medical cannabis wholesale to pharmacies and hospital formularies','Export-oriented trading house consolidating supply from multiple operators'],
    requirements:['NCC distribution licence','Warehouse with appropriate environmental and security controls','Quality assurance: CoA verification and packaging compliance','LIMS/ERP integration for batch-level inventory and track-and-trace'],
    advantage:"Ghana's commodity trading ecosystem, GCX precedent, and mobile money infrastructure create a ready template. A Ghanaian wholesale operation could anchor regional West African trade flows under AfCFTA.",
    mktSize:'Cannabis distribution margin typically 15–30% of product value',mktProj:'Grows linearly with cultivation and processing scale',mktCagr:'Sector-linked',
    revenue:'Wholesale margin 10–20% + handling fees',capex:'$100K–400K (warehouse + systems + working capital)',breakeven:'12–24 months',
    risks:[
      {r:'Working capital intensity: holding inventory against slow-paying buyers',sev:'Medium',m:'Use trade finance; structure buyer credit limits; use commodity exchange price discovery'},
      {r:'Market fragmentation: small early volumes across many SKUs',sev:'Medium',m:'Specialise in one stream initially before building full product portfolio'},
    ],
    firstMover:"Strategic position as commercial coordinator of Ghana's cannabis economy. Early distributors who build cultivator and processor relationships control market access — mirroring cocoa purchasing buyer dynamics.",
  },
  {
    id:11,num:'11',name:'Pharmaceutical Dispensing',shortName:'Dispensing',tag:'DOWNSTREAM',score:73,tier:'Core',
    barrier:'Medium',capital:'Low–Medium',timeline:'12–24 months',
    breakdown:{market:72,impact:82,feasibility:65,sustainability:72},
    headline:"The patient-facing gateway for medicinal cannabis in Ghana's health system",
    summary:"Pharmaceutical dispensing sits at the last mile of Ghana's medicinal cannabis value chain — connecting patients to approved products through pharmacies, licensed chemical sellers, and digital health platforms. Germany, Israel, Australia, and South Africa provide proven models.",
    ghanaFit:"Ghana's ~2,000 pharmacies and ~9,000–10,000 licensed chemical seller shops provide unmatched distribution infrastructure. Mobile money and telemedicine penetration enable digital-first dispensing models with national reach.",
    models:['Community pharmacy dispensing cannabis medicines under prescription','Hemp wellness retail: foods, cosmetics, supplements via pharmacy and health stores','Telemedicine-integrated dispensing platform for rural and remote patients','Hospital-based formulary supply for approved medicinal indications (oncology, neurology)'],
    requirements:['Pharmacist superintendent required for prescription dispensing','FDA Ghana product registration for each dispensed medicine','Cold chain capability for temperature-sensitive preparations','Prescriber training programme and patient counselling protocols'],
    advantage:"Ghana's licensed chemical seller network (25:1 ratio over pharmacies in some regions) provides unmatched last-mile reach. Mobile money integration enables prescription payment and delivery. First-movers build patient relationship moats that are difficult to dislodge.",
    mktSize:'Global medical cannabis market ~$26B (2024)',mktProj:'$130–160B by 2032',mktCagr:'22–23%',
    revenue:'Prescription dispensing margin + OTC hemp product retail margin (15–35%)',capex:'$20K–150K depending on model (pharmacy upgrade vs. new facility)',breakeven:'12–18 months',
    risks:[
      {r:'Limited approved products in early years reduces prescription dispensing revenue',sev:'Medium',m:'Lead with hemp food, cosmetic, and supplement products while prescription market develops'},
      {r:'Social stigma reducing patient and physician uptake',sev:'High',m:'Frame all communications as evidence-based medicine; avoid recreational associations; partner with GMA'},
      {r:'Patient and prescriber education burden is substantial',sev:'Medium',m:'Partner with Ghana Medical Association and Pharmacy Council for structured training programmes'},
    ],
    firstMover:"Lowest capital entry point. Existing pharmacies extend to cannabis dispensing with modest investment. Building patient relationships now creates durable competitive moats that scale with the sector.",
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// EXTRA PAGE-SPECIFIC STYLES (beyond shared DocumentGlobalStyles)
// ══════════════════════════════════════════════════════════════════════════════
const EXTRA_CSS = `
  .chain-scroll::-webkit-scrollbar-thumb{background:${C.forest};}
  .tab-strip{display:flex;gap:6px;overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .tab-strip::-webkit-scrollbar{height:3px;}
  .tab-strip::-webkit-scrollbar-track{background:${C.border};}
  .tab-strip::-webkit-scrollbar-thumb{background:${C.forest};}
  @media(max-width:600px){
    .topbar-demo{display:none!important;}
    .topbar-tiers{display:none!important;}
    .topbar-purchase{font-size:10px!important;padding:6px 10px!important;}
    .gate-cta-row a{justify-content:center!important;}
    .stats-grid{grid-template-columns:1fr 1fr!important;}
    .stats-grid > div{border-right:none!important;border-bottom:1px solid rgba(255,255,255,0.06)!important;}
    .stats-grid > div:last-child{grid-column:1 / -1!important;}
    .stat-cell{padding:12px 14px 16px!important;}
    .lic-metrics{display:none!important;}
    .lic-header{flex-direction:column!important;align-items:flex-start!important;}
    .lic-inner{padding:18px!important;}
    .matrix-table{display:none!important;}
    .matrix-cards{display:block!important;}
    .gate-grid{grid-template-columns:1fr!important;}
    .gate-price-card{position:static!important;margin-top:24px!important;}
    .gate-deliverables{grid-template-columns:1fr!important;}
    .purchase-strip{grid-template-columns:1fr!important;}
    .mob-card-grid{grid-template-columns:1fr!important;}
    .tier-cards{grid-template-columns:1fr!important;}
    .tier-cards > div{margin-left:0!important;margin-top:-1px!important;}
    .tier-header-row{flex-wrap:wrap!important;}
    .cover-alert{flex-wrap:wrap!important;}
  }
  @keyframes pulse {
    0%,100%{opacity:1;transform:scale(1);}
    50%{opacity:0.5;transform:scale(1.3);}
  }
`;

// ══════════════════════════════════════════════════════════════════════════════
// TOPBAR
// ══════════════════════════════════════════════════════════════════════════════
const TopBar = ({coverLogoRef, tier, setTier, setPage, setLoginTarget, setShowLogin}) => {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const fn = () => {
      if (!coverLogoRef?.current) return;
      setPast(coverLogoRef.current.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener('scroll', fn, {passive:true});
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleTierClick = (t) => {
    // Demo mode: downgrade freely, upgrade via login
    if (t === 'public') { setTier('public'); return; }
    if (t === 'clients') { setTier('clients'); return; }
    if (t === 'registered' && tier === 'public') { setLoginTarget('registered'); setShowLogin(true); return; }
    if (t === 'paid' && tier !== 'paid') { setLoginTarget('paid'); setShowLogin(true); return; }
    setTier(t);
  };

  return (
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'200px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <DocumentLogo height={20} variant="dark"/>
          <div style={{width:'1px',height:'16px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,letterSpacing:'0.3px'}}>Ghana Cannabis · NCC Licence Intelligence · March 2026</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest}}>NCC Licence Intelligence</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
        <span className="mob-hide topbar-demo" style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginRight:'4px'}}>PREVIEW</span>
        <div className="topbar-tiers" style={{display:'flex',gap:'6px'}}>
        {[['public','Public'],['registered','Registered'],['paid','Members']].map(([t,label]) => (
          <button key={t} onClick={() => handleTierClick(t)} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'0.8px',textTransform:'uppercase',padding:'5px 10px',border:`1px solid ${tier===t ? (t==='clients' ? C.teal : C.lime) : C.border}`,background:tier===t ? (t==='clients' ? C.teal : C.lime) : 'transparent',color:tier===t ? (t==='clients' ? C.paper : C.ink) : C.muted,cursor:'pointer',borderRadius:'2px',transition:'all 0.15s ease',whiteSpace:'nowrap'}}>
            {label}
          </button>
        ))}
        </div>
        <div style={{width:'1px',height:'16px',background:C.border,margin:'0 4px',flexShrink:0}}/>
        <button onClick={() => setTier('clients')} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'0.8px',textTransform:'uppercase',padding:'5px 10px',border:`1px solid ${tier==='clients'?C.teal:C.border}`,background:tier==='clients'?C.teal:'transparent',color:tier==='clients'?C.paper:C.muted,cursor:'pointer',borderRadius:'2px',transition:'all 0.15s ease',whiteSpace:'nowrap'}} className="mob-hide">
          Clients
        </button>
        <button onClick={() => setPage('purchase')} className="topbar-purchase" style={{background:C.forest,color:C.lime,padding:'6px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,border:'none',cursor:'pointer',letterSpacing:'0.5px',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:'6px'}}>
          <span className="mob-hide">Purchase</span><span>→</span>
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// COVER
// ══════════════════════════════════════════════════════════════════════════════
const Cover = ({logoRef, setPage}) => (
  <div className="pad-cover" style={{background:C.ink,padding:'48px 64px 0',position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',right:'-30px',top:'-20px',fontFamily:F.display,fontSize:'clamp(120px,25vw,320px)',fontWeight:900,color:'rgba(255,255,255,0.025)',pointerEvents:'none',userSelect:'none',letterSpacing:'-8px',lineHeight:1}}>GH</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
      {/* Logo anchor — scroll trigger only, no visible logo */}
      <div ref={logoRef} style={{height:'0',overflow:'hidden'}}/>
      {/* Alert tag */}
      <div className="cover-alert" style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'18px',flexWrap:'wrap'}}>
        <div style={{background:C.lime,padding:'4px 10px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'2.5px',textTransform:'uppercase',color:C.ink}}>INTELLIGENCE ALERT</div>
        <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.28)',letterSpacing:'0.5px'}}>NCC/PAIRD/600/20/02//VOL1/05 · Issued 26 Feb 2026 · BRIDGE Analysis March 2026</div>
      </div>
      {/* Headline */}
      <h1 style={{fontFamily:F.display,fontSize:'clamp(28px,5vw,60px)',fontWeight:900,color:C.paper,lineHeight:1.05,marginBottom:'16px',maxWidth:'780px'}}>
        Zero Incumbents.<br/>
        <span style={{color:C.lime}}>11 Licence Categories.</span><br/>
        One 12–24 Month Window.
      </h1>
      {/* Subhead */}
      <p style={{fontFamily:F.body,fontSize:'17px',fontWeight:300,color:'rgba(250,248,243,0.55)',lineHeight:1.7,marginBottom:'10px',maxWidth:'620px'}}>
        Ghana’s NCC opened the national licensing regime on 26 February 2026. Eleven categories. No incumbents in any of them. This is BRIDGE’s complete analysis of every entry point.
      </p>
      {/* Urgency strip */}
      <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 14px',background:'rgba(184,217,53,0.08)',border:'1px solid rgba(184,217,53,0.2)',marginBottom:'20px',marginTop:'12px',flexWrap:'wrap'}}>
        <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.lime,flexShrink:0,animation:'pulse 2s infinite'}}/>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.lime}}>Applications Open Now</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(184,217,53,0.5)'}}>·</span>
        <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(184,217,53,0.7)'}}>Zero licensed operators in any category as of March 2026</span>
      </div>
      {/* Pull quote */}
      <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'16px',marginBottom:'28px',marginTop:'0'}}>
        <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:'rgba(250,248,243,0.65)',lineHeight:1.6}}>
          “Ghana lost five years while Lesotho, South Africa, and Zimbabwe built their cannabis industries from scratch. February 2026 closes that gap — but only for the operators who act before the sector takes shape around them.”
        </p>
        <div style={{marginTop:'10px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.25)'}}>— BRIDGE Analysis · March 2026</div>
      </div>
      {/* CTAs */}
      <div style={{display:'flex',gap:'10px',flexWrap:'wrap',marginTop:'8px',marginBottom:'32px'}}>
        <button
          onClick={() => document.getElementById('licence-explorer')?.scrollIntoView({behavior:'smooth'})}
          style={{background:C.lime,color:C.ink,padding:'13px 28px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,border:'none',cursor:'pointer',letterSpacing:'0.5px',display:'flex',alignItems:'center',gap:'8px'}}>
          Explore Intelligence Free <span style={{fontSize:'13px'}}>→</span>
        </button>
        <button
          onClick={() => setPage('purchase')}
          style={{background:'transparent',color:'rgba(250,248,243,0.65)',padding:'12px 24px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,border:'1px solid rgba(250,248,243,0.2)',cursor:'pointer',letterSpacing:'0.3px'}}>
          Purchase Briefs →
        </button>
      </div>
      {/* Stats strip */}
      <div style={{borderTop:`1px solid rgba(255,255,255,0.1)`,paddingTop:'24px',display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',marginBottom:'0'}} className="stats-grid">
        {MACRO.map((s,i) => (
          <div key={i} className="stat-cell" style={{padding:'16px 20px 20px',borderRight:i<4?`1px solid rgba(255,255,255,0.07)`:'none',borderBottom:i>=3?'none':`1px solid rgba(255,255,255,0.04)`}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(20px,2.5vw,28px)',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'6px'}}>{s.v}</div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)',marginBottom:'4px'}}>{s.l}</div>
            <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.28)',lineHeight:1.4}}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// POLICY CONTEXT — PUBLIC
// ══════════════════════════════════════════════════════════════════════════════
const PolicyContext = () => (
  <div className="pad-section" style={{background:C.paper,padding:'48px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>What Happened</div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.ink,lineHeight:1.25,marginBottom:'16px'}}>The Positions Are Open.<br/>The Architecture Is Unwritten.</h2>
          <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'14px'}}>
            On 26 February 2026, Ghana’s Minister for the Interior launched the national licensing regime — operationalising Section 43 of NCC Act 1019 (2020), as amended by Act 1100 (2023) and implemented through L.I. 2475. Five years of legal delays ended in one announcement. Applications are now open across all 11 categories. What is not yet decided is who holds them.</p>
          <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'14px'}}>
            The regime is strictly limited to THC ≤0.3% on a dry weight basis — industrial fibre, seed, and pharmaceutical applications. Eleven licence categories. Three-year renewable terms. Single point of contact: the NCC Cannabis Regulations Department.
          </p>
          <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            The first operators to secure licences will define the architecture of this sector. The window is narrow. It will not remain open indefinitely.
          </p>
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Legal Framework</div>
          {[
            {l:'Primary Legislation',v:'NCC Act 2020 (Act 1019)'},
            {l:'Amendment',v:'Act 1100 (2023) — reinstating Section 43'},
            {l:'Regulations',v:'L.I. 2475 — Cultivation & Management'},
            {l:'THC Limit',v:'≤ 0.3% dry weight (industrial/medicinal only)'},
            {l:'Licence Validity',v:'3 years, site-specific, non-transferable'},
            {l:'Regulatory Body',v:'Narcotics Control Commission (NCC)'},
            {l:'Issued By',v:'NCC Cannabis Regulations Department'},
          ].map((r,i) => (
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:i<6?`1px solid ${C.border}`:'none',gap:'12px'}}>
              <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,flexShrink:0}}>{r.l}</span>
              <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,textAlign:'right'}}>{r.v}</span>
            </div>
          ))}
          <div style={{marginTop:'20px',background:C.paperDark,padding:'14px 16px',borderLeft:`3px solid ${C.lime}`}}>
            <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>
              Ghana joins 9–10 African nations with active cannabis frameworks — but holds a structural advantage none of them share. Coastal ports at Tema and Takoradi give direct ocean freight access that landlocked competitors (Lesotho, Zimbabwe, Malawi) cannot replicate.
            </p>
          </div>
          <div style={{marginTop:'20px',background:C.ink,padding:'14px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'5px',height:'5px',borderRadius:'50%',background:C.lime}}/>
              <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.lime}}>First-Mover Window: Now Open</span>
            </div>
            <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.35)'}}>No licensed operators exist in any category as of March 2026 — all positions remain open</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// VALUE CHAIN — PUBLIC
// ══════════════════════════════════════════════════════════════════════════════
const ValueChain = ({tier, setTier, setPage, setShowLogin, setLoginTarget}) => (
  <div className="pad-section" style={{background:C.paperDark,padding:'48px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap',gap:'10px',marginBottom:'28px'}}>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Ghana Cannabis · Full Value Chain</div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,30px)',fontWeight:700,color:C.ink,lineHeight:1.2}}>11 Licences. One Value Chain. Every Node Open.</h2>
        </div>
      </div>
      <div style={{display:'flex',gap:'24px',marginBottom:'16px',flexWrap:'wrap',paddingBottom:'16px',borderBottom:`1px solid ${C.border}`}}>
        {[{v:'11',l:'Licence categories'},{v:'0',l:'Licensed operators'},{v:'3',l:'Trade agreements'},{v:'2',l:'Export ports'}].map((s,i) => (
          <div key={i} style={{display:'flex',gap:'6px',alignItems:'center'}}>
            <span style={{fontFamily:F.mono,fontSize:'15px',fontWeight:700,color:C.forest}}>{s.v}</span>
            <span style={{fontFamily:F.sans,fontSize:'9px',color:C.muted,letterSpacing:'0.5px'}}>{s.l}</span>
          </div>
        ))}
      </div>
      <div className="chain-scroll">
        {CHAIN.map((c,i) => (
          <div key={i} style={{flexShrink:0,width:'140px',background:C.paper,border:`1px solid ${C.border}`,padding:'14px 12px',transition:'border-color 0.15s ease,transform 0.15s ease'}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.lime;e.currentTarget.style.transform='translateY(-2px)';}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform='';}}>
            <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:c.color,marginBottom:'6px'}}>{c.num}</div>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,lineHeight:1.3,marginBottom:'8px'}}>{c.name}</div>
            <div style={{background:c.color,color:c.color===C.limeDark?C.ink:C.paper,padding:'2px 6px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',display:'inline-block'}}>{c.tag}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:'20px',display:'flex',gap:'16px',flexWrap:'wrap'}}>
        {[
          {color:C.forest,label:'Production & Distribution'},
          {color:C.teal,label:'Trade'},
          {color:C.limeDark,label:'Enabling Services'},
          {color:C.muted,label:'Specialist'},
        ].map((s,i) => (
          <div key={i} style={{display:'flex',alignItems:'center',gap:'6px'}}>
            <div style={{width:'10px',height:'10px',background:s.color,flexShrink:0}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted}}>{s.label}</span>
          </div>
        ))}
      </div>
      <div style={{marginTop:'24px',borderTop:`1px solid ${C.border}`,paddingTop:'20px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
        {tier === 'public' ? (
          <>
            <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,lineHeight:1.6,maxWidth:'480px'}}>
              Register free to unlock Ghana-specific context, business models, and entry requirements for all 11 licences.
            </p>
            <button onClick={() => { setLoginTarget('registered'); setShowLogin(true); }} style={{background:C.forest,color:C.lime,padding:'11px 22px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,border:'none',cursor:'pointer',letterSpacing:'0.3px',whiteSpace:'nowrap'}}>
              Create Free Account →
            </button>
          </>
        ) : tier === 'registered' ? (
          <>
            <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,lineHeight:1.6,maxWidth:'480px'}}>
              Upgrade to Members for Impact Scores, financial projections, risk analysis, and the full Opportunity Matrix.
            </p>
            <button onClick={() => { setLoginTarget('paid'); setShowLogin(true); }} style={{background:C.forest,color:C.lime,padding:'11px 22px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,border:'none',cursor:'pointer',letterSpacing:'0.3px',whiteSpace:'nowrap'}}>
              Upgrade to Members →
            </button>
          </>
        ) : (
          <>
            <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,lineHeight:1.6,maxWidth:'480px'}}>
              Explore all 11 licence categories below, then purchase briefs for full deployment intelligence.
            </p>
            <button onClick={() => setPage('purchase')} style={{background:C.forest,color:C.lime,padding:'11px 22px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,border:'none',cursor:'pointer',letterSpacing:'0.3px',whiteSpace:'nowrap'}}>
              Purchase Briefs →
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// TIER TEASER — DYNAMIC
// ══════════════════════════════════════════════════════════════════════════════
const TierTeaser = ({tier, setTier, setShowLogin, setLoginTarget}) => {
  const TIERS = [
    {
      id:'public',
      label:'OPEN ACCESS',
      name:'Public Intelligence',
      items:[
        'NCC regulatory context and legal framework (Act 1019/1100/L.I. 2475)',
        'Full value chain overview (11 categories)',
        'Top-line global market statistics',
        'BRIDGE Intelligence framing',
      ],
    },
    {
      id:'registered',
      label:'REGISTERED ACCOUNT',
      name:'Registered Intelligence',
      badge:'Free',
      items:[
        'Full licence-by-licence overview for all 11 categories',
        'Ghana-specific market context and infrastructure fit',
        'Business model options and entry requirements',
        'Competitive advantage analysis per category',
      ],
      note:'Free. No credit card. Email registration only.',
    },
    {
      id:'paid',
      label:'BRIDGE MEMBERS',
      name:'Members Intelligence',
      badge:'Full Access',
      items:[
        'BRIDGE Impact Score™ per licence',
        'Full market size and financial projections',
        'Risk matrix with mitigation strategies',
        'Deployment parameters and capital ranges',
        'First-mover window analysis',
        'Ranked Opportunity Matrix (all 11)',
        'Quarterly intelligence updates',
      ],
    },
  ];

  const tierOrder = ['public','registered','paid'];
  const tierForTierTeaser = tier === 'clients' ? 'paid' : tier;
  const activeIdx = tierOrder.indexOf(tierForTierTeaser);

  const getCardStyle = (id) => {
    const idx = tierOrder.indexOf(id);
    const isActive = tier === id;
    const isUnlocked = idx < activeIdx;
    if (isActive) return {bg: C.lime, border:'1px solid ' + C.lime};
    if (isUnlocked) return {bg:'rgba(184,217,53,0.07)', border:'1px solid rgba(184,217,53,0.25)'};
    return {bg:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)'};
  };

  const getLabelColor = (id) => {
    const isActive = tier === id;
    const idx = tierOrder.indexOf(id);
    const isUnlocked = idx < activeIdx;
    if (isActive) return C.ink;
    if (isUnlocked) return 'rgba(184,217,53,0.6)';
    return 'rgba(250,248,243,0.3)';
  };

  const getTextColor = (id) => {
    return tier === id ? C.ink : C.paper;
  };

  const getBodyColor = (id) => {
    return tier === id ? 'rgba(13,26,16,0.65)' : 'rgba(250,248,243,0.5)';
  };

  const getBulletColor = (id) => {
    const idx = tierOrder.indexOf(id);
    if (tier === id) return C.ink;
    if (idx < activeIdx) return 'rgba(184,217,53,0.6)';
    return C.lime;
  };

  const getCTA = (id) => {
    const idx = tierOrder.indexOf(id);
    const isActive = tier === id;
    const isUnlocked = idx < activeIdx;

    if (isActive) return {
      label: '✔ You are here',
      fn: null,
      style: {background:'rgba(13,26,16,0.18)', color:C.ink, border:'1px solid rgba(13,26,16,0.2)'},
    };
    if (isUnlocked) return {
      label: '✔ Unlocked',
      fn: null,
      style: {background:'rgba(13,26,16,0.12)', color:C.ink, border:'1px solid rgba(13,26,16,0.15)'},
    };
    if (id === 'registered') return {
      label: 'Create Free Account →',
      fn: () => { setLoginTarget('registered'); setShowLogin(true); },
      style: {background:'rgba(255,255,255,0.1)', color:C.paper, border:'1px solid rgba(255,255,255,0.2)'},
    };
    return {
      label: 'Apply for Members Access →',
      fn: () => { setLoginTarget('paid'); setShowLogin(true); },
      style: {background:C.lime, color:C.ink, border:'none'},
    };
  };

  return (
    <div className="pad-section" style={{background:C.ink,padding:'48px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{borderTop:'6px solid rgba(255,255,255,0.12)',borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)',marginBottom:'6px'}}>How BRIDGE Intelligence Works</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,30px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'32px'}}>Start free. Unlock what you need. Act.</h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0'}} className="tier-cards">
          {TIERS.map((t) => {
            const cardStyle = getCardStyle(t.id);
            const cta = getCTA(t.id);
            const isActive = tier === t.id;
            return (
              <div key={t.id} style={{background:cardStyle.bg,padding:'24px 22px',border:cardStyle.border,marginLeft:t.id!=='public'?'-1px':'0',transition:'all 0.25s ease',position:'relative'}}>
                {/* Active indicator bar */}
                {isActive && <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:C.ink}}/>}
                <div className="tier-header-row" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:getLabelColor(t.id)}}>{t.label}</div>
                  {isActive && (
                    <div style={{background:'rgba(13,26,16,0.2)',color:C.ink,padding:'2px 8px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'1.5px',whiteSpace:'nowrap'}}>ACTIVE</div>
                  )}
                </div>
                <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:getTextColor(t.id),marginBottom:'18px',lineHeight:1.3}}>{t.name}</div>
                <div style={{marginBottom:'20px'}}>
                  {t.items.map((item,j) => (
                    <div key={j} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'6px 0',borderBottom:`1px solid ${isActive ? 'rgba(13,26,16,0.1)' : 'rgba(255,255,255,0.07)'}`}}>
                      <span style={{color:getBulletColor(t.id),fontFamily:F.sans,fontSize:'11px',fontWeight:700,flexShrink:0,marginTop:'2px'}}>→</span>
                      <span style={{fontFamily:F.body,fontSize:'12px',color:getBodyColor(t.id),lineHeight:1.5}}>{item}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={cta.fn || undefined}
                  disabled={!cta.fn}
                  style={{...cta.style,width:'100%',padding:'10px 16px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,cursor:cta.fn?'pointer':'default',textAlign:'center',letterSpacing:'0.3px',transition:'all 0.2s ease'}}>
                  {cta.label}
                </button>
                {t.note && cta.fn !== null && (
                  <div style={{marginTop:'8px',fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:t.id==='paid'?'rgba(250,248,243,0.3)':t.id==='registered'&&cta.fn?'rgba(250,248,243,0.3)':getBodyColor(t.id),textAlign:'center',lineHeight:1.4}}>{t.note}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// LOCK PANEL
// ══════════════════════════════════════════════════════════════════════════════
const LockPanel = ({label, cta, ctaColor, onUnlock, children}) => (
  <div style={{position:'relative',margin:'16px 0',overflow:'hidden'}}>
    {children && (
      <div style={{filter:'blur(4px)',pointerEvents:'none',userSelect:'none',opacity:0.55}}>
        {children}
      </div>
    )}
    <div style={{position:children?'absolute':'relative',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:children?'rgba(240,237,228,0.72)':'transparent',padding:'24px',backdropFilter:children?'blur(1px)':'none',minHeight:children?'unset':'80px'}}>
      <div style={{fontFamily:F.mono,fontSize:'10px',color:C.muted,marginBottom:'10px',letterSpacing:'1.5px',textTransform:'uppercase',display:'flex',alignItems:'center',gap:'6px'}}>
        <span style={{fontSize:'14px',color:C.faint}}>⊟</span>{label}
      </div>
      <button onClick={onUnlock} style={{background:ctaColor,color:ctaColor===C.lime?C.ink:C.paper,padding:'11px 26px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,border:'none',cursor:'pointer',letterSpacing:'0.5px',display:'flex',alignItems:'center',gap:'8px'}}>
        {cta} <span style={{fontSize:'13px',fontWeight:900}}>→</span>
      </button>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// SCORE BAR
// ══════════════════════════════════════════════════════════════════════════════
const ScoreBar = ({label, value, onDark}) => (
  <div style={{marginBottom:'10px'}}>
    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
      <span style={{fontFamily:F.sans,fontSize:'10px',color:onDark?'rgba(250,248,243,0.45)':C.muted}}>{label}</span>
      <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:onDark?C.lime:C.forest}}>{value}<span style={{opacity:0.4,fontSize:'8px'}}>/100</span></span>
    </div>
    <div style={{height:'3px',background:onDark?'rgba(255,255,255,0.08)':C.border,borderRadius:'2px',overflow:'hidden'}}>
      <div style={{height:'100%',width:`${value}%`,background:C.lime,borderRadius:'2px'}}/>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// LICENSE EXPLORER
// ══════════════════════════════════════════════════════════════════════════════
const LicenseExplorer = ({tier, setTier, setPage, setShowLogin, setLoginTarget}) => {
  const [active, setActive] = useState(0);
  const lic = L[active];
  const canRegistered = tier === 'registered' || tier === 'paid' || tier === 'clients';
  const canPaid = tier === 'paid' || tier === 'clients';
  const sevColor = (s) => s==='High'?C.red:s==='Medium'?C.amber:C.positive;
  return (
    <div id="licence-explorer" className="pad-section" style={{background:C.paperDark,padding:'48px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>NCC Licence Analysis · All 11 Categories</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,30px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'24px'}}>11 Licences. No incumbents. Select a category.</h2>
        {/* Tab strip */}
        <div className="tab-strip" style={{marginBottom:'24px',paddingBottom:'8px'}}>
          {L.map((l,i) => (
            <button key={i} onClick={() => setActive(i)} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'0.8px',textTransform:'uppercase',padding:'6px 12px',border:`1px solid ${active===i?C.forest:C.border}`,background:active===i?C.forest:'transparent',color:active===i?C.paper:C.muted,cursor:'pointer',borderRadius:'2px',transition:'all 0.15s ease',whiteSpace:'nowrap',flexShrink:0,borderBottom:`2px solid ${active===i?C.lime:'transparent'}`}}>
              {l.num} {l.shortName||l.name}
            </button>
          ))}
        </div>
        {/* Active licence content */}
        <div className="lic-inner" style={{background:C.paper,border:`1px solid ${C.border}`,padding:'28px'}}>
          {/* Header row */}
          <div className="lic-header" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'16px',marginBottom:'20px'}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
                <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.forest}}>{lic.num}</span>
                <div style={{background:C.forest,color:C.paper,padding:'2px 8px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px'}}>{lic.tag}</div>
                <div style={{border:`1px solid ${lic.tier==='Core'?C.lime:C.amber}`,color:lic.tier==='Core'?C.limeDark:C.amber,padding:'2px 8px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px'}}>{lic.tier} Tier</div>
              </div>
              <h3 style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,24px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'4px'}}>{lic.name}</h3>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{lic.headline}</p>
            </div>
            <div className="lic-metrics" style={{display:'flex',gap:'16px',flexShrink:0}}>
              {[{l:'Barrier',v:lic.barrier},{l:'Capital',v:lic.capital},{l:'Timeline',v:lic.timeline}].map((m,i) => (
                <div key={i} style={{textAlign:'center'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'3px'}}>{m.l}</div>
                  <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.ink}}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{borderTop:`1px solid ${C.border}`,marginBottom:'18px'}}/>
          {/* Summary — PUBLIC */}
          <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'20px'}}>{lic.summary}</p>

          {/* REGISTERED CONTENT */}
          {canRegistered ? (
            <div>
              <div style={{background:C.paperDark,border:`1px solid ${C.border}`,padding:'20px',marginBottom:'16px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.teal,marginBottom:'12px'}}>GHANA CONTEXT</div>
                <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.7,color:C.ink,marginBottom:'12px'}}>{lic.ghanaFit}</p>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.teal,marginBottom:'8px',marginTop:'16px',paddingTop:'16px',borderTop:`1px solid ${C.border}`}}>COMPETITIVE ADVANTAGE</div>
                <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.7,color:C.ink}}>{lic.advantage}</p>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}} className="tc">
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Business Models</div>
                  {lic.models.map((m,i) => (
                    <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'7px 0',borderBottom:`1px solid ${C.border}`}}>
                      <span style={{color:C.lime,fontFamily:F.sans,fontSize:'12px',fontWeight:700,flexShrink:0,lineHeight:1.6}}>→</span>
                      <span style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.55}}>{m}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Key Requirements</div>
                  {lic.requirements.map((r,i) => (
                    <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'7px 0',borderBottom:`1px solid ${C.border}`}}>
                      <span style={{color:C.forest,fontFamily:F.sans,fontSize:'12px',fontWeight:700,flexShrink:0,lineHeight:1.6}}>✓</span>
                      <span style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.55}}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <LockPanel label="Registered Content — Ghana context, business models, requirements" cta="Create Free Account" ctaColor={C.forest} onUnlock={() => { setLoginTarget('registered'); setShowLogin(true); }}>
              <div style={{background:C.paperDark,border:`1px solid ${C.border}`,padding:'20px',marginBottom:'16px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.teal,marginBottom:'12px'}}>GHANA CONTEXT</div>
                <div style={{background:C.border,height:'14px',borderRadius:'2px',width:'95%',marginBottom:'8px'}}/>
                <div style={{background:C.border,height:'14px',borderRadius:'2px',width:'80%',marginBottom:'8px'}}/>
                <div style={{background:C.border,height:'14px',borderRadius:'2px',width:'88%'}}/>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}} className="tc">
                {[0,1,2,3].map(i => (
                  <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'7px 0',borderBottom:`1px solid ${C.border}`}}>
                    <span style={{color:C.border,fontFamily:F.sans,fontSize:'12px',fontWeight:700,flexShrink:0}}>→</span>
                    <div style={{background:C.border,height:'12px',borderRadius:'2px',width:`${60+i*8}%`}}/>
                  </div>
                ))}
              </div>
            </LockPanel>
          )}

          {/* PAID CONTENT */}
          {canPaid ? (
            <div style={{marginTop:'20px'}}>
              <div style={{borderTop:`1px solid ${C.border}`,marginBottom:'20px',paddingTop:'20px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'16px'}}>
                  <div style={{background:C.lime,color:C.ink,padding:'3px 8px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px'}}>BRIDGE MEMBERS</div>
                  <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted}}>Full Intelligence Unlocked</span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}} className="tc">
                  <div style={{background:C.ink,padding:'20px'}}>
                    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>BRIDGE IMPACT SCORE™</div>
                    <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'16px'}}>
                      <div style={{fontFamily:F.mono,fontSize:'48px',fontWeight:500,color:C.lime,lineHeight:1}}>{lic.score}</div>
                      <div style={{fontFamily:F.mono,fontSize:'13px',color:'rgba(184,217,53,0.4)',lineHeight:1}}>/100</div>
                    </div>
                    <ScoreBar label="Market Opportunity (30%)" value={lic.breakdown.market} onDark/>
                    <ScoreBar label="Development Impact (30%)" value={lic.breakdown.impact} onDark/>
                    <ScoreBar label="Implementation Feasibility (25%)" value={lic.breakdown.feasibility} onDark/>
                    <ScoreBar label="Financial Sustainability (15%)" value={lic.breakdown.sustainability} onDark/>
                  </div>
                  <div>
                    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Market & Financials</div>
                    {[
                      {l:'Global Market (2024)',v:lic.mktSize},
                      {l:'Projection',v:lic.mktProj},
                      {l:'CAGR',v:lic.mktCagr},
                      {l:'Revenue Potential',v:lic.revenue},
                      {l:'Est. Capex Entry',v:lic.capex},
                      {l:'Breakeven Horizon',v:lic.breakeven},
                    ].map((r,i) => (
                      <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:`1px solid ${C.border}`,gap:'12px',flexWrap:'wrap'}}>
                        <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted,flexShrink:0}}>{r.l}</span>
                        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.ink,textAlign:'right',maxWidth:'60%'}}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{marginTop:'20px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Risk Matrix</div>
                  {lic.risks.map((r,i) => (
                    <div key={i} style={{padding:'10px 0',borderBottom:i<lic.risks.length-1?`1px solid ${C.border}`:'none'}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'3px'}}>
                        <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,flex:1,paddingRight:'10px'}}>{r.r}</span>
                        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',color:sevColor(r.sev),textTransform:'uppercase',flexShrink:0}}>{r.sev}</span>
                      </div>
                      <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{r.m}</p>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:'20px',background:C.forest,padding:'16px 20px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'8px'}}>First-Mover Window · Ghana Analysis</div>
                  <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.75)',lineHeight:1.6}}>{lic.firstMover}</p>
                </div>
              </div>
            </div>
          ) : (
            <LockPanel label="Members Content — Impact Score, financials, risk matrix, first-mover analysis" cta="Apply for Access" ctaColor={C.lime} onUnlock={() => { setLoginTarget('paid'); setShowLogin(true); }}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginTop:'20px'}}>
                <div style={{background:C.ink,padding:'20px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>BRIDGE IMPACT SCORE™</div>
                  <div style={{fontFamily:F.mono,fontSize:'48px',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'16px'}}>??</div>
                  {[85,72,60,64].map((w,i) => (
                    <div key={i} style={{marginBottom:'10px'}}>
                      <div style={{height:'3px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',overflow:'hidden'}}>
                        <div style={{height:'100%',width:`${w}%`,background:C.lime,borderRadius:'2px'}}/>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  {[0,1,2,3,4,5].map(i => (
                    <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:`1px solid ${C.border}`}}>
                      <div style={{background:C.border,height:'11px',borderRadius:'2px',width:'45%'}}/>
                      <div style={{background:C.border,height:'11px',borderRadius:'2px',width:'35%'}}/>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{marginTop:'16px'}}>
                {[0,1,2].map(i => (
                  <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                      <div style={{background:C.border,height:'12px',borderRadius:'2px',width:'60%'}}/>
                      <div style={{background:C.amber,height:'12px',borderRadius:'2px',width:'12%',opacity:0.5}}/>
                    </div>
                    <div style={{background:C.border,height:'10px',borderRadius:'2px',width:'80%',marginTop:'4px'}}/>
                  </div>
                ))}
              </div>
            </LockPanel>
          )}
        </div>
      {/* Bottom CTA based on tier */}
      <div style={{marginTop:'24px',background:tier==='paid'||tier==='clients'?C.forest:C.ink,padding:'20px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'14px',borderTop:`2px solid ${C.lime}`}}>
        {tier === 'paid' || tier === 'clients' ? (
          <>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px'}}>Full Intelligence Unlocked</div>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.55)',lineHeight:1.5}}>You have Members access. Purchase individual briefs for download, or view the Opportunity Matrix below.</p>
            </div>
            <button onClick={() => setPage('purchase')} style={{background:C.lime,color:C.ink,border:'none',padding:'11px 22px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,cursor:'pointer',whiteSpace:'nowrap',letterSpacing:'0.3px'}}>Purchase Briefs →</button>
          </>
        ) : tier === 'registered' ? (
          <>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.5)',marginBottom:'4px'}}>Registered Access Active</div>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.5}}>Upgrade to Members for Impact Scores, financial models, and risk analysis on every licence.</p>
            </div>
            <button onClick={() => { setLoginTarget('paid'); setShowLogin(true); }} style={{background:C.lime,color:C.ink,border:'none',padding:'11px 22px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,cursor:'pointer',whiteSpace:'nowrap',letterSpacing:'0.3px'}}>Upgrade to Members →</button>
          </>
        ) : (
          <>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.5)',marginBottom:'4px'}}>Public Access</div>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.5}}>Register free to unlock Ghana context, business models, and entry requirements for all 11 licences.</p>
            </div>
            <button onClick={() => { setLoginTarget('registered'); setShowLogin(true); }} style={{background:C.forest,color:C.lime,border:'none',padding:'11px 22px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,cursor:'pointer',whiteSpace:'nowrap',letterSpacing:'0.3px'}}>Create Free Account →</button>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// OPPORTUNITY MATRIX — PAID
// ══════════════════════════════════════════════════════════════════════════════
const OpportunityMatrix = ({tier, setTier, setPage, setShowLogin, setLoginTarget}) => {
  const canPaid = tier === 'paid' || tier === 'clients';
  const sorted = [...L].sort((a,b) => b.score - a.score);
  return (
    <div className="pad-section" style={{background:C.paper,padding:'48px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap',gap:'12px',marginBottom:'24px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>BRIDGE Intelligence · Members Only</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,30px)',fontWeight:700,color:C.ink,lineHeight:1.2}}>Opportunity Matrix — 11 Categories, Ranked and Scored</h2>
          </div>
          {!canPaid && (
            <div style={{background:C.lime,color:C.ink,padding:'3px 10px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'2px',height:'fit-content',whiteSpace:'nowrap'}}>MEMBERS ONLY</div>
          )}
        </div>
        {canPaid ? (
          <div>
            {/* Desktop table */}
            <div className="matrix-table">
            <div style={{display:'grid',gridTemplateColumns:'30px 180px 60px 70px 70px 70px 70px',gap:'0',padding:'8px 12px',background:C.ink,marginBottom:'1px'}}>
              {['#','Licence','Score','Market','Impact','Feasibility','Sustain.'].map((h,i) => (
                <div key={i} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)'}}>{h}</div>
              ))}
            </div>
            {sorted.map((lic,rank) => (
              <div key={lic.id} style={{display:'grid',gridTemplateColumns:'30px 180px 60px 70px 70px 70px 70px',gap:'0',padding:'11px 12px',background:rank%2===0?C.paper:C.paperDark,borderBottom:`1px solid ${C.border}`,alignItems:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.faint}}>#{rank+1}</div>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{lic.name}</div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',color:C.muted,marginTop:'1px'}}>{lic.tier} · {lic.tag}</div>
                </div>
                <div style={{fontFamily:F.mono,fontSize:'16px',fontWeight:700,color:lic.tier==='Core'?C.forest:C.amber}}>{lic.score}</div>
                <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:500,color:C.forest}}>{lic.breakdown.market}</div>
                <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:500,color:C.forest}}>{lic.breakdown.impact}</div>
                <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:500,color:C.forest}}>{lic.breakdown.feasibility}</div>
                <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:500,color:C.forest}}>{lic.breakdown.sustainability}</div>
              </div>
            ))}
            <div style={{padding:'14px 12px',borderTop:`2px solid ${C.lime}`,marginTop:'1px',display:'flex',gap:'20px',flexWrap:'wrap'}}>
              <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted}}>BRIDGE Impact Score™ = weighted composite across 4 dimensions.</span>
              <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted}}>Weights: Market 30% · Impact 30% · Feasibility 25% · Sustainability 15%.</span>
            </div>
            </div>{/* end matrix-table */}
            {/* Mobile cards */}
            <div className="matrix-cards" style={{display:'none'}}>
              {sorted.map((lic,rank) => (
                <div key={lic.id} style={{padding:'14px 16px',borderBottom:`1px solid ${C.border}`,background:rank%2===0?C.paper:C.paperDark,display:'flex',alignItems:'center',gap:'12px'}}>
                  <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.faint,flexShrink:0,width:'24px'}}>#{rank+1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{lic.name}</div>
                    <div style={{fontFamily:F.sans,fontSize:'9px',color:C.muted}}>{lic.tier} · {lic.tag}</div>
                  </div>
                  <div style={{flexShrink:0,textAlign:'right'}}>
                    <div style={{fontFamily:F.mono,fontSize:'22px',fontWeight:700,color:lic.tier==='Core'?C.forest:C.amber,lineHeight:1}}>{lic.score}</div>
                    <div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,marginTop:'2px'}}>SCORE</div>
                  </div>
                </div>
              ))}
              <div style={{padding:'12px 16px',borderTop:`2px solid ${C.lime}`}}>
                <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>BRIDGE Impact Score™ · Weighted across 4 dimensions</span>
              </div>
            </div>
            {/* Post-reveal CTA */}
            <div style={{marginTop:'20px',background:C.forest,padding:'18px 22px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'14px'}}>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px'}}>Export leads at 80. Testing is the highest-sustainability category. Zero incumbents in any position.</div>
                <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',lineHeight:1.5}}>Purchase individual briefs for the full deployment picture — regulatory roadmap, capex model, risk matrix, and first-mover timing per category.</p>
              </div>
              <button onClick={() => setPage('purchase')} style={{background:C.lime,color:C.ink,border:'none',padding:'11px 22px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,cursor:'pointer',whiteSpace:'nowrap',letterSpacing:'0.3px'}}>Purchase Briefs →</button>
            </div>
          </div>
        ) : (
          <div>
            {/* Blurred preview */}
            <div style={{filter:'blur(5px)',pointerEvents:'none',userSelect:'none',opacity:0.5}}>
              <div style={{background:C.ink,padding:'10px 12px',marginBottom:'1px',display:'grid',gridTemplateColumns:'30px 180px 60px 1fr',gap:'0'}}>
                {['#','Licence','Score',''].map((h,i) => (
                  <div key={i} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(250,248,243,0.35)',letterSpacing:'1px'}}>{h}</div>
                ))}
              </div>
              {sorted.slice(0,5).map((lic,rank) => (
                <div key={rank} style={{padding:'11px 12px',background:rank%2===0?C.paper:C.paperDark,borderBottom:`1px solid ${C.border}`,display:'flex',gap:'12px',alignItems:'center'}}>
                  <span style={{fontFamily:F.mono,fontSize:'11px',color:C.faint}}>#{rank+1}</span>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{lic.name}</span>
                  <span style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:C.forest,marginLeft:'auto'}}>{lic.score}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:'16px',textAlign:'center',padding:'24px',background:C.paperDark,border:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>BRIDGE MEMBERS · FULL ACCESS</div>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,marginBottom:'16px',lineHeight:1.6}}>
                The Opportunity Matrix gives you the ranked view across all 11 categories — which licence scores highest, where feasibility is lowest, and where the first-mover premium is largest. This is where strategy starts.
              </p>
              <button onClick={() => { setLoginTarget('paid'); setShowLogin(true); }} style={{background:C.lime,color:C.ink,padding:'12px 28px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,border:'none',cursor:'pointer',letterSpacing:'0.3px'}}>
                Apply for Members Access →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// GATE — MEMBERS CTA
// ══════════════════════════════════════════════════════════════════════════════
const Gate = ({setTier, setPage, setShowLogin, setLoginTarget}) => {
  const DELIVERABLES = [
    {t:'BRIDGE Impact Score™ per licence', s:'4-dimension composite: Market · Impact · Feasibility · Sustainability'},
    {t:'Entry capital ranges for all 11 categories', s:'From $20K enabling services to $3M export operations'},
    {t:'Ghana-specific breakeven and revenue analysis', s:'Calibrated to Ghanaian cost structure and market conditions'},
    {t:'Risk matrix with severity ratings', s:'Every risk rated High/Medium/Low with specific mitigation strategies'},
    {t:'First-mover window analysis', s:'When to move, which licences stack, competitive timing intelligence'},
    {t:'Deployment parameters and financing models', s:'Capex profiles, DFI-aligned structures, blended finance templates'},
    {t:'Quarterly NCC regulatory updates', s:'Policy changes, fee decisions, licence conditions as they evolve'},
    {t:'Export buyer directory', s:'EU, UK, US, and African market contacts for all exportable categories'},
    {t:'BRIDGE partner and investor network', s:'Priority introductions across operators, DFIs, and co-investors'},
    {t:'Venture readiness scorecard', s:'Honest assessment of your position and recommended entry sequence'},
    {t:'Ranked Opportunity Matrix', s:'All 11 licences scored and ranked — where to deploy first'},
    {t:'All 12 BRIDGE sector analyses', s:'Infrastructure, Finance, Health, Technology, Education, and 7 more'},
  ];
  return (
    <div className="pad-gate" style={{background:C.ink,padding:'64px 64px 56px',position:'relative',overflow:'hidden'}}>
      {/* Watermark */}
      <div style={{position:'absolute',right:'-40px',bottom:'-60px',fontFamily:F.display,fontSize:'clamp(120px,25vw,340px)',fontWeight:900,color:'rgba(255,255,255,0.025)',pointerEvents:'none',userSelect:'none',letterSpacing:'-10px',lineHeight:1}}>11</div>
      {/* Top accent rule */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:C.lime}}/>
      <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>

        {/* Social proof bar */}
        <div style={{display:'flex',gap:'24px',marginBottom:'28px',flexWrap:'wrap',paddingBottom:'24px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          {[
            {n:'11', l:'Licence categories analysed'},
            {n:'$8K/kg', l:'Highest value ceiling (Export API)'},
            {n:'0', l:'Incumbents in any category'},
            {n:'3', l:'Active trade agreements'},
          ].map((s,i) => (
            <div key={i} style={{display:'flex',gap:'10px',alignItems:'center'}}>
              <div style={{fontFamily:F.mono,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:C.lime,lineHeight:1}}>{s.n}</div>
              <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.3)',lineHeight:1.3,maxWidth:'80px'}}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* Section tag */}
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
          <div style={{background:C.lime,color:C.ink,padding:'4px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'2.5px',textTransform:'uppercase'}}>BRIDGE MEMBERS</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.08)'}}/>
          <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.2)',letterSpacing:'1px'}}>FULL INTELLIGENCE ACCESS</div>
        </div>

        {/* Headline */}
        <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,4vw,52px)',fontWeight:900,color:C.paper,lineHeight:1.1,marginBottom:'10px',maxWidth:'720px'}}>
          Every licence. Every number.<br/>
          <span style={{color:C.lime}}>Every first-mover window mapped.</span>
        </h2>
        <p style={{fontFamily:F.body,fontSize:'17px',fontWeight:300,color:'rgba(250,248,243,0.5)',lineHeight:1.7,marginBottom:'40px',maxWidth:'580px'}}>
          Ghana’s licensing regime is open. The licences are available. The infrastructure to support every operator — testing, transport, storage, dispensing — does not yet exist. The operators who move in the next 12–24 months will define the architecture of this industry. BRIDGE Members have the complete map.
        </p>

        {/* Two-column layout: deliverables + pricing card */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:'40px',alignItems:'start'}} className="tc gate-grid">
          {/* Left: deliverables */}
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(184,217,53,0.7)',marginBottom:'16px'}}>WHAT’S INCLUDED IN MEMBERS ACCESS</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 32px'}} className="tc gate-deliverables">
              {DELIVERABLES.map((item, idx) => (
                <div key={idx} style={{padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                  <div style={{display:'flex',gap:'8px',alignItems:'flex-start',marginBottom:'2px'}}>
                    <span style={{color:C.lime,fontFamily:F.sans,fontSize:'10px',fontWeight:800,flexShrink:0,lineHeight:1.7,marginTop:'0px'}}>→</span>
                    <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:'rgba(250,248,243,0.85)',lineHeight:1.5}}>{item.t}</span>
                  </div>
                  <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.35)',lineHeight:1.4,paddingLeft:'18px'}}>{item.s}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:'24px',paddingTop:'20px',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.3)',lineHeight:1.7}}>
                Members access extends across all 12 BRIDGE sectors — Infrastructure, Financial Inclusion, Health Systems, Technology, Education, Agriculture, Manufacturing, and more. The cannabis brief is the entry point. The membership is the full current.
              </p>
            </div>
          </div>

          {/* Right: pricing card */}
          <div className="gate-price-card" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',padding:'28px',position:'sticky',top:'80px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>MEMBERS ACCESS</div>
            <div style={{borderBottom:'1px solid rgba(255,255,255,0.08)',paddingBottom:'20px',marginBottom:'20px'}}>
              <div style={{fontFamily:F.mono,fontSize:'36px',fontWeight:700,color:C.lime,lineHeight:1,marginBottom:'4px'}}>$2,997<span style={{fontSize:'16px',fontWeight:400,color:'rgba(250,248,243,0.35)'}}>/yr</span></div>
              <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'4px'}}>Full Members Access</div>
              <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.4)'}}>All 12 sectors · All 11 licence categories · Quarterly updates</div>
            </div>
            {/* Value comparison */}
            <div style={{background:'rgba(184,217,53,0.06)',border:'1px solid rgba(184,217,53,0.15)',padding:'12px 14px',marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.4)'}}>11 individual briefs</span>
                <span style={{fontFamily:F.mono,fontSize:'11px',color:'rgba(250,248,243,0.3)',textDecoration:'line-through'}}>$1,877</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.4)'}}>Full Package (11 briefs only)</span>
                <span style={{fontFamily:F.mono,fontSize:'11px',color:'rgba(250,248,243,0.3)',textDecoration:'line-through'}}>$1,497</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'1px solid rgba(184,217,53,0.15)',paddingTop:'6px'}}>
                <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:'rgba(184,217,53,0.8)'}}>Members (all 12 sectors + updates)</span>
                <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.lime}}>$2,997/yr</span>
              </div>
            </div>
            {[
              '✔  All 11 Ghana cannabis briefs',
              '✔  All 12 BRIDGE sector analyses',
              '✔  Quarterly intelligence updates',
              '✔  Partner + investor network access',
            ].map((item, i) => (
              <div key={i} style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.55)',lineHeight:1.4,padding:'5px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>{item}</div>
            ))}
            <div style={{marginTop:'24px',display:'flex',flexDirection:'column',gap:'10px'}}>
              <button onClick={() => { setLoginTarget('paid'); setShowLogin(true); }} style={{background:C.lime,color:C.ink,padding:'14px 20px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,border:'none',cursor:'pointer',letterSpacing:'0.3px',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
                Apply for Members Access <span style={{fontSize:'14px',fontWeight:900}}>→</span>
              </button>
              <div style={{textAlign:'center',fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.25)',lineHeight:1.5}}>Applications reviewed within 24 hours · Cancel anytime</div>
              <button onClick={() => setPage('purchase')} style={{background:'transparent',color:'rgba(250,248,243,0.55)',padding:'12px 20px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,border:'1px solid rgba(255,255,255,0.15)',cursor:'pointer',letterSpacing:'0.3px',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}>
                Purchase Individual Briefs →
              </button>
              <div style={{display:'flex',alignItems:'center',gap:'10px',margin:'4px 0'}}>
                <div style={{flex:1,height:'1px',background:'rgba(255,255,255,0.08)'}}/>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.2)',letterSpacing:'1px'}}>OR</span>
                <div style={{flex:1,height:'1px',background:'rgba(255,255,255,0.08)'}}/>
              </div>
              <button onClick={() => { setLoginTarget('registered'); setShowLogin(true); }} style={{background:'transparent',color:'rgba(250,248,243,0.3)',padding:'10px 20px',fontFamily:F.sans,fontSize:'10px',fontWeight:600,border:'none',cursor:'pointer',textAlign:'center'}}>
                Already have an account? Sign in →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// LOGIN MODAL
// ══════════════════════════════════════════════════════════════════════════════
const LoginModal = ({show, onClose, loginTarget, setTier, setPage}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [step, setStep] = useState('login'); // 'login' | 'register' | 'upgrade'

  useEffect(() => {
    if (show) {
      setStep(loginTarget === 'paid' ? 'upgrade' : 'login');
      setEmail(''); setPass('');
    }
  }, [show, loginTarget]);

  if (!show) return null;

  const handleSubmit = () => {
    setTier(loginTarget);
    onClose();
  };

  const isUpgrade = step === 'upgrade';
  const isRegister = step === 'register';

  return (
    <div style={{position:'fixed',inset:0,zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      {/* Backdrop */}
      <div onClick={onClose} style={{position:'absolute',inset:0,background:'rgba(13,26,16,0.85)',backdropFilter:'blur(4px)'}}/>
      {/* Modal */}
      <div style={{position:'relative',background:C.paper,width:'100%',maxWidth:'420px',padding:'36px 32px',boxShadow:'0 24px 80px rgba(0,0,0,0.5)'}}>
        {/* Close */}
        <button onClick={onClose} style={{position:'absolute',top:'14px',right:'16px',background:'none',border:'none',fontFamily:F.sans,fontSize:'18px',color:C.faint,cursor:'pointer',lineHeight:1}}>×</button>

        {/* BRIDGE mark */}
        <div style={{marginBottom:'24px'}}>
          <DocumentLogo height={20} variant="dark"/>
        </div>

        {isUpgrade ? (
          <>
            <div style={{background:C.ink,padding:'20px',marginBottom:'24px',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',right:'-10px',bottom:'-20px',fontFamily:F.display,fontSize:'80px',fontWeight:900,color:'rgba(255,255,255,0.04)',pointerEvents:'none'}}>M</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'8px'}}>BRIDGE MEMBERS</div>
              <div style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'6px'}}>Full Intelligence Access</div>
              <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.45)'}}>12 sectors · 11 cannabis licences · Partner network · Quarterly updates</div>
            </div>
            <div style={{fontFamily:F.body,fontSize:'14px',fontWeight:300,lineHeight:1.75,color:C.muted,marginBottom:'24px'}}>
              Members access is by application at <strong style={{color:C.forest}}>$2,997/yr</strong> — all 12 sectors, all 11 cannabis briefs, quarterly updates, and partner network access. A BRIDGE team member will be in touch within 24 hours.
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'16px'}}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" style={{padding:'11px 14px',fontFamily:F.sans,fontSize:'13px',border:`1px solid ${C.border}`,background:'transparent',color:C.ink,outline:'none',width:'100%'}}/>
              <input placeholder="Your name" style={{padding:'11px 14px',fontFamily:F.sans,fontSize:'13px',border:`1px solid ${C.border}`,background:'transparent',color:C.ink,outline:'none',width:'100%'}}/>
              <select style={{padding:'11px 14px',fontFamily:F.sans,fontSize:'13px',border:`1px solid ${C.border}`,background:'transparent',color:C.ink,outline:'none',width:'100%'}}>
                <option value="">I am a…</option>
                <option>Entrepreneur / Founder</option>
                <option>Investor / Funder</option>
                <option>Government / Policy</option>
                <option>Corporate / Industry</option>
                <option>Researcher / Analyst</option>
              </select>
            </div>
            <button onClick={handleSubmit} style={{width:'100%',background:C.lime,color:C.ink,padding:'14px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,border:'none',cursor:'pointer',letterSpacing:'0.5px',marginBottom:'12px'}}>
              Submit Application →
            </button>
            <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,textAlign:'center',lineHeight:1.5}}>Or purchase individual licence briefs — <button onClick={() => { onClose(); setPage('purchase'); }} style={{background:'none',border:'none',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.teal,cursor:'pointer',padding:0,textDecoration:'underline'}}>view pricing</button></p>
          </>
        ) : isRegister ? (
          <>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>FREE ACCOUNT</div>
            <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'8px',lineHeight:1.2}}>Create your BRIDGE account</h3>
            <p style={{fontFamily:F.body,fontSize:'14px',fontWeight:300,color:C.muted,lineHeight:1.65,marginBottom:'24px'}}>Unlock Ghana-specific context, business models, entry requirements, and competitive advantage analysis for all 11 licence categories. Free, permanently.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'16px'}}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" style={{padding:'11px 14px',fontFamily:F.sans,fontSize:'13px',border:`1px solid ${C.border}`,background:'transparent',color:C.ink,outline:'none',width:'100%'}}/>
              <input value={pass} onChange={e => setPass(e.target.value)} placeholder="Choose a password" type="password" style={{padding:'11px 14px',fontFamily:F.sans,fontSize:'13px',border:`1px solid ${C.border}`,background:'transparent',color:C.ink,outline:'none',width:'100%'}}/>
            </div>
            <button onClick={handleSubmit} style={{width:'100%',background:C.forest,color:C.paper,padding:'14px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,border:'none',cursor:'pointer',letterSpacing:'0.5px',marginBottom:'12px'}}>
              Create Free Account →
            </button>
            <p style={{fontFamily:F.body,fontSize:'12px',color:C.faint,textAlign:'center'}}>Already have an account? <button onClick={() => setStep('login')} style={{background:'none',border:'none',fontFamily:F.body,fontSize:'12px',color:C.teal,cursor:'pointer',textDecoration:'underline',padding:0}}>Sign in</button></p>
          </>
        ) : (
          <>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>REGISTERED ACCOUNT</div>
            <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'8px',lineHeight:1.2}}>Sign in to BRIDGE Intelligence</h3>
            <p style={{fontFamily:F.body,fontSize:'14px',fontWeight:300,color:C.muted,lineHeight:1.65,marginBottom:'24px'}}>Welcome back. Your registered account unlocks Ghana-specific context, business models, and entry requirements across all 11 licence categories.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'16px'}}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" style={{padding:'11px 14px',fontFamily:F.sans,fontSize:'13px',border:`1px solid ${C.border}`,background:'transparent',color:C.ink,outline:'none',width:'100%'}}/>
              <input value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" type="password" style={{padding:'11px 14px',fontFamily:F.sans,fontSize:'13px',border:`1px solid ${C.border}`,background:'transparent',color:C.ink,outline:'none',width:'100%'}}/>
            </div>
            <button onClick={handleSubmit} style={{width:'100%',background:C.forest,color:C.paper,padding:'14px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,border:'none',cursor:'pointer',letterSpacing:'0.5px',marginBottom:'12px'}}>
              Sign In →
            </button>
            <p style={{fontFamily:F.body,fontSize:'12px',color:C.faint,textAlign:'center'}}>No account? <button onClick={() => setStep('register')} style={{background:'none',border:'none',fontFamily:F.body,fontSize:'12px',color:C.teal,cursor:'pointer',textDecoration:'underline',padding:0}}>Create one free</button></p>
          </>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PURCHASE PAGE
// ══════════════════════════════════════════════════════════════════════════════
const LICENCE_PRICES = {
  1: {single: '$149', bundle: null},
  2: {single: '$249', bundle: null},
  3: {single: '$199', bundle: null},
  4: {single: '$299', bundle: null},
  5: {single: '$179', bundle: null},
  6: {single: '$129', bundle: null},
  7: {single: '$129', bundle: null},
  8: {single: '$149', bundle: null},
  9: {single: '$249', bundle: null},
  10: {single: '$149', bundle: null},
  11: {single: '$149', bundle: null},
};

const PurchasePage = ({setPage, setShowLogin, setLoginTarget}) => {
  const [selected, setSelected] = useState(new Set());
  const [hoveredId, setHoveredId] = useState(null);

  const toggle = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const totalSelected = [...selected].reduce((acc, id) => {
    const p = parseInt(LICENCE_PRICES[id].single.replace('$',''));
    return acc + p;
  }, 0);

  const BUNDLE_PRICE = 1497;
  const MEMBERS_PRICE = 2997;

  return (
    <div style={{minHeight:'100vh',background:C.paper,fontFamily:F.body}}>
      <DocumentGlobalStyles extraCss={EXTRA_CSS}/>
      {/* Purchase TopBar */}
      <div className="pad-topbar" style={{background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <DocumentLogo height={20} variant="dark"/>
          <div style={{width:'1px',height:'16px',background:C.border}}/>
          <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>Ghana Cannabis · Purchase Intelligence</span>
        </div>
        <button onClick={() => setPage('main')} style={{background:'transparent',border:`1px solid ${C.border}`,color:C.muted,padding:'6px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',letterSpacing:'0.3px'}}>
          ← Back to Brief
        </button>
      </div>

      {/* Hero */}
      <div className="pad-cover" style={{background:C.ink,padding:'48px 64px 40px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:'-30px',top:'-20px',fontFamily:F.display,fontSize:'clamp(120px,22vw,280px)',fontWeight:900,color:'rgba(255,255,255,0.025)',pointerEvents:'none',userSelect:'none',letterSpacing:'-8px',lineHeight:1}}>GH</div>
        <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'16px'}}>
            <div style={{width:'5px',height:'5px',background:C.lime,flexShrink:0}}/>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime}}>GHANA CANNABIS · 11 LICENCE INTELLIGENCE BRIEFS</div>
          </div>
          <h1 style={{fontFamily:F.display,fontSize:'clamp(24px,4.5vw,52px)',fontWeight:900,color:C.paper,lineHeight:1.1,marginBottom:'12px',maxWidth:'680px'}}>
            Choose your entry point.<br/>
            <span style={{color:C.lime}}>Own it.</span>
          </h1>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,color:'rgba(250,248,243,0.5)',lineHeight:1.7,marginBottom:'32px',maxWidth:'540px'}}>
            Every brief delivers Ghana-specific context, financial models, risk analysis, and first-mover timing. The Intelligence Summary — a full-sector orientation — is free with any order.
          </p>
          {/* Three options top strip */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:'rgba(250,248,243,0.1)'}} className="purchase-strip">
            {[
              {label:'Individual Brief', price:'From $129', desc:'Single licence category', note:'Select below', highlight:false, badge:null, scrollTo:true},
              {label:'Full Package', price:'$'+BUNDLE_PRICE.toLocaleString(), desc:'All 11 briefs + free Summary', note:'Add All to Cart', highlight:false, badge:'ALL 11 CATEGORIES'},
              {label:'Members Annual', price:'$'+MEMBERS_PRICE.toLocaleString()+'/yr', desc:'All 12 sectors + quarterly updates', note:'Apply for Access', highlight:true, badge:'BEST VALUE'},
            ].map((opt, i) => (
              <div key={i}
                style={{background:opt.highlight?C.lime:'rgba(250,248,243,0.04)',padding:'22px 24px',cursor:'pointer',transition:'background 0.15s ease',position:'relative',borderTop:opt.highlight?`3px solid ${C.forest}`:`3px solid ${C.teal}`,overflow:'hidden'}}
                onClick={() => opt.label === 'Members Annual' ? (setLoginTarget('paid'), setShowLogin(true)) : opt.label === 'Full Package' ? (setSelected(new Set(L.map(l => l.id))), setTimeout(()=>document.getElementById('cart-bar')?.scrollIntoView({behavior:'smooth'}),100)) : opt.scrollTo ? document.getElementById('licence-grid')?.scrollIntoView({behavior:'smooth'}) : null}>
                {opt.badge && (
                  <div style={{position:'absolute',top:0,left:0,right:0,background:opt.highlight?C.forest:C.teal,textAlign:'center',color:opt.highlight?C.lime:C.paper,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase'}}>
                    {opt.badge}
                  </div>
                )}
                <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:opt.highlight?C.forest:'rgba(250,248,243,0.35)',marginBottom:'8px',marginTop:opt.badge?'22px':'0'}}>{opt.label}</div>
                <div style={{fontFamily:F.mono,fontSize:'clamp(20px,2.8vw,30px)',fontWeight:700,color:opt.highlight?C.forest:C.paper,marginBottom:'4px',lineHeight:1}}>{opt.price}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:opt.highlight?'rgba(13,26,16,0.6)':'rgba(250,248,243,0.4)',marginBottom:'14px',lineHeight:1.4}}>{opt.desc}</div>
                <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:800,color:opt.highlight?C.forest:C.lime,display:'flex',alignItems:'center',gap:'5px'}}>{opt.note} →</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual licences */}
      <div className="pad-section" style={{background:C.paperDark,padding:'48px 64px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div id="licence-grid" style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'24px'}}/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap',gap:'12px',marginBottom:'28px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Individual Licence Briefs</div>
              <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.ink,lineHeight:1.2}}>Select the categories you need. Start anywhere.</h2>
            </div>
            {selected.size > 0 && (
              <div style={{background:C.ink,color:C.paper,padding:'10px 16px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,display:'flex',gap:'12px',alignItems:'center'}}>
                <span>{selected.size} selected · ${totalSelected.toLocaleString()}</span>
                <button onClick={() => document.getElementById('cart-bar')?.scrollIntoView({behavior:'smooth'})} style={{background:C.lime,color:C.ink,border:'none',padding:'6px 14px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,cursor:'pointer',letterSpacing:'0.3px'}}>Go to Cart ↓</button>
              </div>
            )}
          </div>

          {/* Summary card — full width, auto-included */}
          <div style={{marginBottom:'1px',background:selected.size > 0 ? C.forest : C.ink,padding:'24px 28px',position:'relative',overflow:'hidden',cursor:'default',transition:'background 0.2s ease'}}>
            {/* Watermark */}
            <div style={{position:'absolute',right:'-10px',bottom:'-20px',fontFamily:F.display,fontSize:'100px',fontWeight:900,color:'rgba(255,255,255,0.04)',pointerEvents:'none',userSelect:'none',lineHeight:1}}>11</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'16px',position:'relative'}}>
              <div style={{flex:1,minWidth:'240px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px',flexWrap:'wrap'}}>
                  <div style={{background:C.lime,color:C.ink,padding:'3px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px'}}>INCLUDED FREE</div>
                  <span style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.3)',letterSpacing:'0.5px'}}>With any purchase</span>
                </div>
                <div style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,24px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'8px'}}>Cannabis Intelligence Summary</div>
                <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.55)',lineHeight:1.7,maxWidth:'560px'}}>
                  Who should enter, where the money is, and which licences stack well together. This is the strategic orientation layer — a curated read of Ghana’s full cannabis economy in one document, before you go deep on individual categories.
                </p>
                <div style={{marginTop:'14px',display:'flex',flexWrap:'wrap',gap:'6px'}}>
                  {['All 11 Licences','Market Overview','Value Chain Map','Ghana Context','Entry Snapshot'].map((tag,i) => (
                    <div key={i} style={{background:'rgba(255,255,255,0.07)',color:'rgba(250,248,243,0.45)',padding:'3px 9px',fontFamily:F.sans,fontSize:'9px',fontWeight:600,letterSpacing:'0.5px'}}>{tag}</div>
                  ))}
                </div>
              </div>
              <div style={{flexShrink:0,display:'flex',flexDirection:'column',alignItems:'flex-end',justifyContent:'space-between',gap:'12px',minWidth:'140px'}}>
                {selected.size > 0 ? (
                  <div style={{display:'flex',alignItems:'center',gap:'8px',background:'rgba(184,217,53,0.15)',border:`1px solid ${C.lime}`,padding:'10px 16px'}}>
                    <span style={{color:C.lime,fontSize:'14px',fontWeight:800}}>✔</span>
                    <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.lime}}>Included in your cart</span>
                  </div>
                ) : (
                  <div style={{textAlign:'right'}}>
                    <div style={{fontFamily:F.mono,fontSize:'28px',fontWeight:700,color:C.lime,lineHeight:1}}>FREE</div>
                    <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.35)',marginTop:'3px'}}>Purchase any brief to unlock</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:C.border}} className="tc mob-card-grid">
            {L.map((lic) => {
              const isSelected = selected.has(lic.id);
              const price = LICENCE_PRICES[lic.id].single;
              return (
                <div key={lic.id}
                  onMouseEnter={() => setHoveredId(lic.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{background:isSelected ? C.forest : hoveredId===lic.id ? C.paperDark : C.paper,padding:'22px',transition:'background 0.15s ease',cursor:'pointer',position:'relative',boxShadow:hoveredId===lic.id&&!isSelected?`inset 0 0 0 2px ${C.border}`:'none'}}
                  onClick={() => toggle(lic.id)}>
                  {/* Selected check */}
                  {isSelected && (
                    <div style={{position:'absolute',top:'14px',right:'14px',background:C.lime,color:C.ink,width:'22px',height:'22px',borderRadius:'11px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.sans,fontSize:'11px',fontWeight:800}}>✔</div>
                  )}
                  {/* Licence header */}
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px',gap:'8px'}}>
                    <div>
                      <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px'}}>
                        <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:isSelected ? C.lime : C.forest}}>{lic.num}</span>
                        <div style={{background:isSelected ? 'rgba(184,217,53,0.15)' : C.paperDark,color:isSelected ? C.lime : C.muted,padding:'2px 7px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px'}}>{lic.tag}</div>
                      </div>
                      <div style={{fontFamily:F.display,fontSize:'17px',fontWeight:700,color:isSelected ? C.paper : C.ink,lineHeight:1.25}}>{lic.name}</div>
                    </div>
                    <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:isSelected ? C.lime : C.forest,flexShrink:0}}>{price}</div>
                  </div>
                  {/* Teaser summary */}
                  <p style={{fontFamily:F.body,fontSize:'12px',fontWeight:300,color:isSelected ? 'rgba(250,248,243,0.65)' : C.muted,lineHeight:1.65,marginBottom:'14px'}}>{lic.headline}</p>
                  {/* Blurred content preview */}
                  <div style={{position:'relative',overflow:'hidden',borderTop:`1px solid ${isSelected ? 'rgba(255,255,255,0.1)' : C.border}`,paddingTop:'12px'}}>
                    <div style={{filter:'blur(3px)',pointerEvents:'none',userSelect:'none',opacity:0.5}}>
                      {[95,70,85,60].map((w,i) => (
                        <div key={i} style={{background:isSelected ? 'rgba(255,255,255,0.15)' : C.border,height:'10px',borderRadius:'2px',width:`${w}%`,marginBottom:'7px'}}/>
                      ))}
                      {/* Score preview blurred */}
                      <div style={{display:'flex',gap:'8px',marginTop:'8px'}}>
                        <div style={{background:isSelected ? 'rgba(184,217,53,0.3)' : C.lime,height:'24px',borderRadius:'2px',width:'50px',opacity:0.6}}/>
                        <div style={{flex:1,background:isSelected ? 'rgba(255,255,255,0.1)' : C.border,height:'24px',borderRadius:'2px'}}/>
                      </div>
                    </div>
                    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <div style={{background:isSelected ? C.lime : C.ink,color:isSelected ? C.ink : C.paper,padding:'6px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'0.5px'}}>
                        {isSelected ? '✔ Added to cart' : `Purchase ${price} →`}
                      </div>
                    </div>
                  </div>
                  {/* What's inside */}
                  <div style={{marginTop:'14px',display:'flex',flexWrap:'wrap',gap:'5px',alignItems:'center'}}>
                    <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:isSelected?'rgba(250,248,243,0.3)':C.faint,marginRight:'4px'}}>Includes:</span>
                    {['Impact Score™','Financials','Risk Matrix','First-Mover'].map((tag,i) => (
                      <div key={i} style={{background:isSelected ? 'rgba(255,255,255,0.08)' : C.paperDark,color:isSelected ? 'rgba(250,248,243,0.5)' : C.faint,padding:'3px 8px',fontFamily:F.sans,fontSize:'9px',fontWeight:600,letterSpacing:'0.5px'}}>{tag}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart summary bar */}
          {selected.size > 0 && (
            <div id="cart-bar" style={{marginTop:'1px',background:C.ink,padding:'20px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)',marginBottom:'4px'}}>{selected.size} LICENCE BRIEF{selected.size > 1 ? 'S' : ''} · Intelligence Summary included</div>
                <div style={{fontFamily:F.mono,fontSize:'24px',fontWeight:700,color:C.paper}}>${totalSelected.toLocaleString()} <span style={{fontSize:'13px',fontWeight:400,color:'rgba(250,248,243,0.35)'}}>vs ${BUNDLE_PRICE.toLocaleString()} for all 11</span></div>
              </div>
              <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                {selected.size < 11 && (
                  <button onClick={() => setSelected(new Set(L.map(l => l.id)))} style={{background:'transparent',color:C.lime,border:`1px solid ${C.lime}`,padding:'10px 18px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'}}>
                    Upgrade to Full Package · ${BUNDLE_PRICE.toLocaleString()} →
                  </button>
                )}
                <button onClick={() => { setLoginTarget('registered'); setShowLogin(true); }} style={{background:C.lime,color:C.ink,padding:'12px 28px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,border:'none',cursor:'pointer',whiteSpace:'nowrap'}}>
                  Proceed to Checkout · ${totalSelected.toLocaleString()} →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Members upsell — rebuilt */}
      <div id="purchase-page-anchor" className="pad-section" style={{background:C.ink,padding:'48px 64px',borderTop:`3px solid ${C.lime}`}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div style={{display:'flex',gap:'20px',alignItems:'center',marginBottom:'28px',flexWrap:'wrap'}}>
            <div style={{background:C.lime,color:C.ink,padding:'4px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase'}}>BRIDGE MEMBERS</div>
            <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.08)'}}/>
            <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.2)',letterSpacing:'1px'}}>THE COMPLETE PICTURE</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'40px',alignItems:'start'}} className="tc">
            <div>
              <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.5vw,42px)',fontWeight:900,color:C.paper,lineHeight:1.05,marginBottom:'14px'}}>
                All 11 briefs. All 12 sectors.<br/>
                <span style={{color:C.lime}}>One membership.</span>
              </h2>
              <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,color:'rgba(250,248,243,0.5)',lineHeight:1.75,marginBottom:'24px',maxWidth:'440px'}}>
                The Full Package is $1,497 for 11 cannabis briefs. Members is $2,997 for all 12 BRIDGE sectors, quarterly updates, and partner network access. The incremental cost is $1,500. The incremental coverage is every other sector BRIDGE publishes.
              </p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'0'}} className="tc">
                {[
                  {l:'Individual briefs', v:'$129–$299 each', sub:'11 briefs = ~$1,877 total'},
                  {l:'Full Package', v:'$1,497', sub:'All 11 cannabis briefs only'},
                  {l:'Members Annual', v:'$2,997/yr', sub:'All 12 sectors + updates', hl:true},
                  {l:'Per sector (Members)', v:'$249', sub:'12 full sector analyses'},
                ].map((r,i) => (
                  <div key={i} style={{background:r.hl?'rgba(184,217,53,0.08)':'rgba(255,255,255,0.03)',padding:'14px 16px',border:`1px solid ${r.hl?'rgba(184,217,53,0.2)':'rgba(255,255,255,0.06)'}`,marginTop:'-1px'}}>
                    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:r.hl?'rgba(184,217,53,0.7)':'rgba(250,248,243,0.3)',marginBottom:'4px'}}>{r.l}</div>
                    <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:r.hl?C.lime:C.paper,marginBottom:'2px'}}>{r.v}</div>
                    <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.25)'}}>{r.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',padding:'24px',position:'sticky',top:'80px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>MEMBERS ACCESS</div>
              <div style={{fontFamily:F.mono,fontSize:'34px',fontWeight:700,color:C.lime,lineHeight:1,marginBottom:'4px'}}>$2,997<span style={{fontSize:'14px',fontWeight:400,color:'rgba(250,248,243,0.3)'}}>/yr</span></div>
              <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.35)',marginBottom:'16px',lineHeight:1.5}}>All 12 sectors · All 11 cannabis briefs · Quarterly updates</div>
              {['All 11 Ghana Cannabis briefs','All 12 BRIDGE sector analyses','NCC regulatory tracker','Quarterly intelligence updates','BRIDGE partner + investor network','Analyst Q&A access'].map((item,i) => (
                <div key={i} style={{display:'flex',gap:'7px',alignItems:'center',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                  <span style={{color:C.lime,fontSize:'9px',flexShrink:0}}>✔</span>
                  <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.55)',lineHeight:1.4}}>{item}</span>
                </div>
              ))}
              <div style={{marginTop:'18px',display:'flex',flexDirection:'column',gap:'8px'}}>
                <button onClick={() => { setLoginTarget('paid'); setShowLogin(true); }} style={{background:C.lime,color:C.ink,padding:'13px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,border:'none',cursor:'pointer',letterSpacing:'0.3px',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
                  Apply for Members Access →
                </button>
                <div style={{textAlign:'center',fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.25)',lineHeight:1.5}}>Applications reviewed within 24 hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// FOOTER
// ══════════════════════════════════════════════════════════════════════════════
const Footer = () => (
  <div className="pad-footer" style={{background:C.forest,padding:'16px 64px',borderTop:`3px solid ${C.lime}`}}>
    <div className="footer-inner" style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <DocumentLogo height={18} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.15)'}}/>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.35)',marginBottom:'2px'}}>Ghana Cannabis Intelligence · NCC L.I. 2475 · March 2026</div>
          <div style={{fontFamily:F.body,fontSize:'9px',fontStyle:'italic',color:'rgba(250,248,243,0.2)'}}>Blending Resources and Innovation to Drive Ghana’s Empowerment · bridgepbc.com</div>
        </div>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'14px'}}>
        {[['All Sectors','https://bridgepbc.com/intelligence'],['Members','https://bridgepbc.com/members'],['About BRIDGE','https://bridgepbc.com/about'],['Contact','https://bridgepbc.com/contact']].map(([l,href],i) => (
          <a key={i} href={href} style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.35)',textDecoration:'none',transition:'color 0.15s ease'}}>{l}</a>
        ))}
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// CLIENTS VIEW — Full lead-generation intelligence page
// ══════════════════════════════════════════════════════════════════════════════

// ─── IS MOBILE HOOK ───────────────────────────────────────────────────────────
function useMobile() {
  const [mob, setMob] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  useEffect(() => {
    const fn = () => setMob(window.innerWidth < 640);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mob;
}

// ─── CLIENTS CSS (appended to main Gf via separate component) ─────────────────
const ClientGf = () => (
  <style>{`
    .hscroll{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
    .hscroll::-webkit-scrollbar{display:none;}
    .cpx{padding-left:72px;padding-right:72px;}
    .cpy48{padding-top:48px;padding-bottom:48px;}
    .cmxauto{max-width:1200px;margin:0 auto;}
    .touch{min-height:44px;display:flex;align-items:center;}
    .hov-card{transition:transform 0.14s;}
    .hov-card:hover{transform:translateY(-2px);}
    .chev{transition:transform 0.25s ease;}
    .chev.open{transform:rotate(180deg);}
    .blurred{filter:blur(5px);user-select:none;pointer-events:none;}
    @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
    .slide-up{animation:slideUp 0.22s ease forwards;}
    @media(min-width:641px){
      .cmob-only{display:none!important;}
      .cdesk-only{display:block;}
      .cdesk-flex{display:flex!important;}
    }
    @media(max-width:960px){
      .cpx{padding-left:32px;padding-right:32px;}
      .cg2{grid-template-columns:1fr!important;}
      .cg3{grid-template-columns:1fr 1fr!important;}
    }
    @media(max-width:640px){
      .cpx{padding-left:18px;padding-right:18px;}
      .cdesk-only{display:none!important;}
      .cmob-only{display:block;}
      .cg2,.cg3,.cg4{grid-template-columns:1fr!important;}
      .cmob-stack{flex-direction:column!important;gap:12px!important;}
      .cmob-full{width:100%!important;}
      .hero-h1{font-size:clamp(28px,9vw,44px)!important;line-height:1.0!important;}
      .csection-h2{font-size:clamp(20px,6vw,28px)!important;}
      .seg-tab{padding:14px 16px!important;font-size:10px!important;}
      .score-row-inner{grid-template-columns:24px 1fr 44px 54px!important;}
      .score-bar-cell{display:none!important;}
      .brief-card-inner{padding:16px!important;}
      .cart-inline{display:none!important;}
      .cart-sticky{display:flex!important;}
      .price-compare{grid-template-columns:1fr!important;}
      .deliverables-grid{grid-template-columns:1fr!important;}
      .cpy48{padding-top:32px!important;padding-bottom:32px!important;}
    }
  `}</style>
);

// ─── CLIENTS DATA ─────────────────────────────────────────────────────────────
const C_TIERS = {
  public:     {label:'Public',     dot:'#9AAA9C',  cta:'Register Free'},
  registered: {label:'Registered', dot:'#B8730A',  cta:'Upgrade to Member'},
  member:     {label:'Member',     dot:'#B8D935',  cta:'Access Full Series'},
};
const C_SEGMENTS = [
  {
    id:'entrepreneur', label:'Entrepreneurs', icon:'◈',
    headline:'Own the Infrastructure.\nCapture the First-Mover Premium.',
    sub:'Zero competitors. Capital-light entry. Recurring compliance revenue from every transaction in the chain.',
    pitch:'Ghana cannabis sector opens with zero licensed operators in any category. The enabling infrastructure — testing, transport, storage, dispensing — can be entered with $20K–$120K. Every licence holder in the chain becomes your captive client. You charge a compliance fee on every kilogram that moves through you. No commodity risk. Infrastructure ownership.',
    stats:[{v:'$20K',l:'Minimum entry'},{v:'0',l:'Competitors today'},{v:'11',l:'Licences need you'},{v:'12–24mo',l:'First-mover window'}],
  },
  {
    id:'business', label:'Business Entities', icon:'◉',
    headline:'West Africa — Only Open\nCannabis Market. Enter Now.',
    sub:'Processing, wholesale, and export positions with structural moats that take years to replicate.',
    pitch:'Processing (02) transforms commodity biomass at $1/kg into CBD oil commanding $8–25/litre. Wholesale (10) captures 15–30% of every farmgate-to-market transaction. Export (09) accesses EU, US, and UK simultaneously under three trade agreements — with Tema port advantages no landlocked African competitor can match. B2B models. Long-term offtake contracts. Zero retail exposure.',
    stats:[{v:'$30B',l:'Market 2030'},{v:'0%',l:'EU duty'},{v:'15–30%',l:'Wholesale spread'},{v:'3',l:'Trade agreements'}],
  },
  {
    id:'government', label:'Government', icon:'◇',
    headline:'Eleven Licences.\nEleven Development Vectors.',
    sub:'Trade diversification, rural employment, hard currency earnings, and sector-building at national scale.',
    pitch:'Each of the 11 NCC licence categories maps to a policy objective: Cultivation to smallholder income diversification and the 6.8 million hectare agricultural base. Testing to national quality infrastructure. Export to hard currency via Tema port. Dispensing to the 11,000-point pharmaceutical retail network Ghana already operates. The AfCFTA Secretariat is in Accra. What moves first defines the architecture.',
    stats:[{v:'800K+',l:'Cooperative network'},{v:'11,000',l:'Pharmacy + LCS'},{v:'AfCFTA',l:'Accra host'},{v:'EPA+AGOA',l:'Trade framework'}],
  },
  {
    id:'investor', label:'Investors', icon:'◆',
    headline:'Zero Incumbents.\nStructural First-Mover Positions.',
    sub:'BRIDGE Impact Score™ across all 11 NCC licence categories. Risk-adjusted. DFI-aligned.',
    pitch:'Export scores 80/100 — driven by three trade agreements and Tema port freight access to Rotterdam, Hamburg, and Felixstowe. Processing (78) creates pharmaceutical-grade API margins on agricultural commodity input. Testing Laboratory (75) generates mandatory transaction revenue from every licence holder — recurring, structurally uncorrelated to commodity prices. Zero incumbents in any category as of March 2026.',
    stats:[{v:'80',l:'Highest BRIDGE Score'},{v:'6',l:'Core Tier'},{v:'0',l:'Incumbents'},{v:'$8K/kg',l:'API ceiling'}],
  },
];
const C_LICENCES = [
  {n:'01',name:'Cultivation',tag:'UPSTREAM',tier:'CORE',score:72,entry:'$20K–200K',window:'Now',segs:['entrepreneur','business','government','investor'],teaser:'Agricultural foundation. 6.8M hectares. Bimodal rainfall. Every downstream licence depends on this output.',pe:'Cooperative or contract farming. Multiple harvest seasons. Cocoa cooperative template directly applicable.',pb:'Outgrower programme. Anchor supply contracts with Licence 02 processors. Scale across 4 agro-ecological zones.',pg:'Rural employment. Smallholder income diversification. 6.8M hectares of agricultural potential.',pi:'Score 72. Impact 85 — highest in series. Entry $20K–200K. Cocoa cooperative template transfers directly.',models:['Smallholder Cooperative','Contract Farming','Dual-Purpose Fibre+Seed','Irrigated Northern Zone'],moat:'Processing relationship + certified variety supply'},
  {n:'02',name:'Processing',tag:'MID-CHAIN',tier:'CORE',score:78,entry:'$80K–1.2M',window:'Now',segs:['business','investor'],teaser:'Value multiplier. Biomass at $1/kg becomes CBD oil at $8–25/litre. GMP is the lasting moat.',pe:'',pb:'GMP-aligned extraction, decortication, hempseed pressing. Highest B2B margin mid-chain position.',pg:'Industrial agro-processing. Value-addition to raw output. Export-ready product manufacturing.',pi:'Score 78 — second highest. GMP certification creates the lasting barrier. Entry $80K–1.2M.',models:['Biomass Processor','CBD Extraction','Hempseed Oil & Protein','Fibre Decortication'],moat:'GMP certification + processing network'},
  {n:'03',name:'Breeding & Seed',tag:'UPSTREAM',tier:'EMERGING',score:64,entry:'$30K–300K',window:'Q3 2026',segs:['entrepreneur','government','investor'],teaser:'Zero domestic certified seed producers. Ghana needs climate-adaptive tropical varieties.',pe:'Institutional partnership — CSIR/KNUST. Low capital. Long-horizon IP.',pb:'',pg:'Domestic seed sovereignty. CSIR/KNUST capacity. Regional seed hub under AfCFTA.',pi:'Score 64. First certified Ghanaian tropical variety is irreplaceable IP.',models:['Adaptive Trials (CSIR)','Seed Multiplier','Tropical Variety Developer','Regional Seed Hub'],moat:'First certified Ghanaian tropical hemp variety'},
  {n:'04',name:'R&D',tag:'SPECIALIST',tier:'EMERGING',score:60,entry:'$50K–500K',window:'2027+',segs:['government','investor'],teaser:'Highest development impact per dollar. Noguchi, KNUST, UG, CSIR — regionally unmatched.',pe:'',pb:'',pg:'Clinical research infrastructure. SATREPS collaboration model. IP licensing pathway.',pi:'Score 60. Impact 74. Grant + contract + royalty economics. Long-horizon institutional play.',models:['University Lab','CRO Platform','CSIR Adaptive Trials','Proprietary IP Developer'],moat:'IP development + institutional partnerships'},
  {n:'05',name:'Testing Laboratory',tag:'ENABLING',tier:'CORE',score:75,entry:'$120K–600K',window:'Now',segs:['entrepreneur','investor'],teaser:'Mandatory for every other licence. Zero licensed cannabis labs in Ghana. COA required for every transaction.',pe:'ISO 17025. Mandatory demand from 10 licence categories. Multi-sector: cocoa, pharma, food.',pb:'',pg:'National hemp quality infrastructure. Export compliance gateway.',pi:'Score 75. Sustainability 82 — highest in series. $7.19B testing market 2030. Zero commodity risk.',models:['THC-Only Entry Lab','Full-Spectrum Lab','Mobile Unit','Certified Reference Lab'],moat:'ISO 17025 + GNAS accreditation'},
  {n:'06',name:'Storage',tag:'ENABLING',tier:'EMERGING',score:67,entry:'$120K–900K',window:'Now',segs:['entrepreneur','business','investor'],teaser:'Zero licensed cannabis storage. Every licence pair needs compliant inventory buffer between transactions.',pe:'Tema EPZ pivot. Cold-chain operators can retrofit. Climate control creates the moat.',pb:'3PL combined. Bonded export staging. GDP pharmaceutical vault.',pg:'Post-harvest loss reduction. Near-farm storage nodes.',pi:'Score 67. Feasibility 74. Tema EPZ incentives. Enables every licence to hold inventory.',models:['Bulk Biomass Warehouse','Climate-Controlled Vault','Bonded Export Staging','GDP/GMP Pharma Vault'],moat:'NCC approval + climate-control investment'},
  {n:'07',name:'Transportation',tag:'ENABLING',tier:'EMERGING',score:63,entry:'$50K–600K',window:'Now',segs:['entrepreneur','investor'],teaser:'Zero commodity risk. Zero licensed carriers. Every gram moved needs a manifest and GPS-tracked vehicle.',pe:'Lowest-capital enabling licence. 2-vehicle minimum. Existing logistics operators can retrofit.',pb:'',pg:'Tema–Ouagadougou corridor. Chain-of-custody infrastructure.',pi:'Score 63. Zero commodity ownership. Mandatory transaction revenue. 16 US states prove the model.',models:['Secure Cannabis Carrier','Integrated 3PL','Pharmaceutical GDP','Export Port Specialist'],moat:'NCC Licence 07 + GPS manifest system'},
  {n:'08',name:'Import',tag:'TRADE',tier:'CORE',score:70,entry:'$30K–500K',window:'Now',segs:['entrepreneur','business','investor'],teaser:'Zero certified seed, no equipment, no pharmaceutical APIs. Import owns the supply gateway.',pe:'Exclusive supplier agency. Fastest to first revenue. Seed agent viable with 5–10 clients.',pb:'Multi-category hub. Equipment distributor. Pharmaceutical API importer.',pg:'Supply chain sovereignty. ICUMS infrastructure. PPRSD/FDA Ghana integration.',pi:'Score 70. Fastest time to revenue. Exclusive agreements = supply ownership.',models:['Certified Seed Agent','Equipment Distributor','Pharmaceutical API Importer','Multi-Category Hub'],moat:'Exclusive supplier agreements before sector scales'},
  {n:'09',name:'Export',tag:'TRADE',tier:'CORE',score:80,entry:'$50K–3M',window:'Now',segs:['business','investor'],teaser:'Highest score in series. EU-Ghana EPA + AGOA + UK DCTS simultaneously. Tema port.',pe:'',pb:'Hemp commodity → organic foods → CBD → pharma API. 4 tiers, each 3–5× previous margin.',pg:'Hard currency earnings. Trade agreement activation. GEPA infrastructure.',pi:'Score 80. Market 88. $1,000–$8,000/kg pharma CBD ceiling. 3 trade agreements.',models:['Hemp Commodity Exporter','Organic Hemp Foods','CBD Ingredient Exporter','Pharmaceutical API'],moat:'Tema port + triple trade agreement coverage'},
  {n:'10',name:'Wholesale',tag:'MID-CHAIN',tier:'CORE',score:74,entry:'$80K–1M',window:'Now',segs:['business','investor'],teaser:'Commercial engine. 15–30% of every farmgate-to-market spread. West Africa strongest distribution.',pe:'',pb:'Industrial B2B. Pharmaceutical GDP distributor. Export aggregation. AfCFTA regional hub.',pg:'Market liquidity. Smallholder market access. AfCFTA Secretariat in Accra.',pi:'Score 74. Feasibility 78 — highest in category. FMCG/pharma infrastructure directly applicable.',models:['Industrial B2B Distributor','Pharmaceutical GDP','Export Aggregation','Omni-Channel Hub'],moat:'First-mover supplier + buyer relationship network'},
  {n:'11',name:'Dispensing',tag:'DOWNSTREAM',tier:'CORE',score:71,entry:'$20K–300K',window:'Now',segs:['entrepreneur','business','government'],teaser:'2,000 pharmacies + 9,000+ LCS shops. More pharmaceutical retail than any African cannabis peer.',pe:'Hemp wellness retail. Lowest capital entry. OTC cosmetics/foods — no prescription required.',pb:'Licensed cannabis pharmacy. Telemedicine programme. Integrated wellness centre.',pg:'Patient access infrastructure. National Health Insurance pathway. LCS integration.',pi:'Score 71. Impact 82 — highest downstream. 30–60% retail margins. Germany/Israel model.',models:['Licensed Cannabis Pharmacy','Hemp Wellness Retail','Telemedicine Programme','Integrated Wellness Centre'],moat:'First licensed dispensary + prescriber network'},
];
const C_PRICES = {'01':149,'02':249,'03':199,'04':299,'05':179,'06':129,'07':129,'08':149,'09':249,'10':149,'11':149};
const C_BUNDLE = 1497;
const C_MEMBERSHIP = 2997;

// ─── CLIENTS SHARED PRIMITIVES ────────────────────────────────────────────────
const CSectionMark = ({n,label,light=false}) => (
  <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'28px',flexWrap:'wrap'}}>
    <div style={{flex:1,minWidth:'16px',height:'1px',background:light?'rgba(250,248,243,0.1)':C.border}}/>
    <span style={{fontFamily:F.display,fontSize:'10px',fontStyle:'italic',color:light?'rgba(250,248,243,0.3)':C.faint,flexShrink:0}}>{n}</span>
    <div style={{width:'5px',height:'5px',background:C.lime,flexShrink:0}}/>
    <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:light?'rgba(250,248,243,0.35)':C.muted,flexShrink:0}}>{label}</span>
    <div style={{width:'20px',height:'1px',background:light?'rgba(250,248,243,0.1)':C.border,flexShrink:0}}/>
  </div>
);

const CTierIndicator = ({tier}) => {
  const t = C_TIERS[tier] || C_TIERS.public;
  return (
    <div style={{display:'inline-flex',alignItems:'center',gap:'5px'}}>
      <div style={{width:'5px',height:'5px',borderRadius:'50%',background:t.dot}}/>
      <span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:t.dot}}>{t.label}</span>
    </div>
  );
};

const CCollapse = ({header, children, defaultOpen=false, borderColor, onLight=true}) => {
  const bc = borderColor || C.border;
  const [open, setOpen] = useState(defaultOpen);
  const bg = onLight ? C.paperDark : 'rgba(250,248,243,0.04)';
  const chevCol = onLight ? C.muted : 'rgba(250,248,243,0.4)';
  return (
    <div style={{border:`1px solid ${bc}`,marginBottom:'2px'}}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 16px',background:open?bg:'transparent',border:'none',cursor:'pointer',gap:'12px',minHeight:'52px'}}>
        <div style={{textAlign:'left',flex:1}}>{header}</div>
        <div className={`chev ${open?'open':''}`} style={{fontSize:'12px',color:chevCol,flexShrink:0}}>▼</div>
      </button>
      {open && <div style={{borderTop:`1px solid ${bc}`}}>{children}</div>}
    </div>
  );
};

const CMobCarousel = ({items, renderCard}) => {
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => { const i = Math.round(el.scrollLeft / el.offsetWidth); setIdx(i); };
    el.addEventListener('scroll', onScroll, {passive:true});
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  const scrollTo = (i) => { if (ref.current) ref.current.scrollTo({left: i * ref.current.offsetWidth, behavior:'smooth'}); };
  return (
    <div>
      <div ref={ref} className="hscroll" style={{display:'flex',scrollSnapType:'x mandatory'}}>
        {items.map((item,i) => (
          <div key={i} style={{flexShrink:0,width:'100%',scrollSnapAlign:'start'}}>{renderCard(item, i)}</div>
        ))}
      </div>
      {items.length > 1 && (
        <div style={{display:'flex',justifyContent:'center',gap:'6px',padding:'12px 0'}}>
          {items.map((_,i) => (
            <button key={i} onClick={()=>scrollTo(i)}
              style={{width:i===idx?'24px':'8px',height:'8px',borderRadius:'4px',background:i===idx?C.lime:C.border,border:'none',cursor:'pointer',transition:'all 0.3s ease',padding:0}}/>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── CLIENTS HERO ─────────────────────────────────────────────────────────────
const CClientsHero = ({seg, clientTier, setClientTier}) => {
  const s = C_SEGMENTS.find(x=>x.id===seg);
  const mob = useMobile();
  return (
    <div style={{background:C.ink}}>
      <div className="cpx" style={{background:C.lime,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 72px',flexWrap:'wrap',gap:'6px'}}>
        <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:C.ink}}>GHANA CANNABIS INTELLIGENCE — NCC LICENCE ANALYSIS</span>
        <span style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(13,26,16,0.55)'}} className="cdesk-only">NCC Act 1019 · L.I. 2475 · 11 Licences · March 2026</span>
      </div>
      {!mob ? (
        <div className="cpx cmxauto" style={{paddingTop:'52px',paddingBottom:'44px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'32px',flexWrap:'wrap'}}>
            <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.2)',marginRight:'4px'}}>Access</span>
            {Object.entries(C_TIERS).map(([k,tv])=>(
              <button key={k} onClick={()=>setClientTier(k)}
                style={{display:'inline-flex',alignItems:'center',gap:'5px',padding:'5px 12px',border:`1px solid ${clientTier===k?tv.dot:'rgba(250,248,243,0.1)'}`,background:clientTier===k?`${tv.dot}20`:'transparent',cursor:'pointer',transition:'all 0.15s',minHeight:'32px'}}>
                <div style={{width:'4px',height:'4px',borderRadius:'50%',background:tv.dot,opacity:clientTier===k?1:0.4}}/>
                <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:clientTier===k?tv.dot:'rgba(250,248,243,0.3)'}}>{tv.label}</span>
              </button>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:'56px',alignItems:'center'}} className="cg2">
            <div>
              <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>{s.label} — Opportunity Profile</div>
              <h1 style={{fontFamily:F.display,fontSize:'clamp(28px,5vw,58px)',fontWeight:900,color:C.paper,lineHeight:1.0,marginBottom:'14px',letterSpacing:'-1px',whiteSpace:'pre-line'}}>{s.headline}</h1>
              <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:'rgba(250,248,243,0.6)',marginBottom:'20px'}}>{s.sub}</p>
              <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'16px',marginBottom:'28px'}}>
                <p style={{fontFamily:F.body,fontSize:'14px',fontWeight:300,lineHeight:1.85,color:'rgba(250,248,243,0.75)'}}>{s.pitch}</p>
              </div>
              <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                <button style={{background:C.lime,color:C.ink,border:'none',padding:'13px 28px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',cursor:'pointer',minHeight:'44px'}}>
                  {C_TIERS[clientTier].cta} →
                </button>
                <button onClick={()=>document.getElementById('c-brief-selector')?.scrollIntoView({behavior:'smooth'})}
                  style={{background:'transparent',color:'rgba(250,248,243,0.5)',border:'1px solid rgba(250,248,243,0.18)',padding:'12px 22px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',minHeight:'44px'}}>
                  Browse Briefs ↓
                </button>
              </div>
            </div>
            <div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'2px'}}>
                {s.stats.map((st,i)=>(
                  <div key={i} style={{background:'rgba(250,248,243,0.04)',padding:'20px 18px',borderTop:`2px solid ${i===0?C.lime:'rgba(250,248,243,0.06)'}`}}>
                    <div style={{fontFamily:F.mono,fontSize:'clamp(20px,3vw,34px)',fontWeight:400,color:i===0?C.lime:C.paper,lineHeight:0.9,marginBottom:'8px'}}>{st.v}</div>
                    <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>{st.l}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'rgba(250,248,243,0.04)',padding:'12px 16px',borderLeft:`2px solid ${C_TIERS[clientTier].dot}`,display:'flex',justifyContent:'space-between',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
                <CTierIndicator tier={clientTier}/>
                <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.38)',lineHeight:1.5,flex:1,minWidth:'120px'}}>
                  {clientTier==='public'?'Register free for entry capital + audience analysis.':clientTier==='registered'?'Upgrade for full unit economics + roadmaps.':'Full intelligence access — all 11 licences.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <CMobCarousel items={C_SEGMENTS} renderCard={(seg_item) => (
            <div className="cpx" style={{paddingTop:'32px',paddingBottom:'24px'}}>
              <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'10px'}}>{seg_item.label}</div>
              <h1 style={{fontFamily:F.display,fontSize:'clamp(26px,8vw,38px)',fontWeight:900,color:C.paper,lineHeight:1.0,marginBottom:'12px',letterSpacing:'-0.5px',whiteSpace:'pre-line'}}>{seg_item.headline}</h1>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'14px'}}>
                {seg_item.stats.map((st,j)=>(
                  <div key={j} style={{background:'rgba(250,248,243,0.05)',padding:'12px 14px',borderTop:`2px solid ${j===0?C.lime:'rgba(250,248,243,0.08)'}`}}>
                    <div style={{fontFamily:F.mono,fontSize:'clamp(18px,6vw,26px)',fontWeight:400,color:j===0?C.lime:C.paper,lineHeight:1,marginBottom:'4px'}}>{st.v}</div>
                    <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>{st.l}</div>
                  </div>
                ))}
              </div>
              <div style={{borderLeft:`2px solid ${C.lime}`,paddingLeft:'12px',marginBottom:'18px'}}>
                <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,lineHeight:1.75,color:'rgba(250,248,243,0.72)'}}>{seg_item.sub}</p>
              </div>
              <button style={{width:'100%',background:C.lime,color:C.ink,border:'none',padding:'14px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',cursor:'pointer',minHeight:'48px'}}>
                {C_TIERS[clientTier].cta} →
              </button>
            </div>
          )}/>
          <div className="cpx" style={{paddingBottom:'20px'}}>
            <div style={{display:'flex',gap:'6px',justifyContent:'center',flexWrap:'wrap'}}>
              {Object.entries(C_TIERS).map(([k,tv])=>(
                <button key={k} onClick={()=>setClientTier(k)}
                  style={{display:'flex',alignItems:'center',gap:'5px',padding:'7px 14px',border:`1px solid ${clientTier===k?tv.dot:'rgba(250,248,243,0.1)'}`,background:clientTier===k?`${tv.dot}20`:'transparent',cursor:'pointer',minHeight:'40px'}}>
                  <div style={{width:'5px',height:'5px',borderRadius:'50%',background:tv.dot,opacity:clientTier===k?1:0.4}}/>
                  <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:clientTier===k?tv.dot:'rgba(250,248,243,0.3)'}}>{tv.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── CLIENTS SEGMENT BAR ──────────────────────────────────────────────────────
const CSegBar = ({seg, setSeg}) => (
  <div style={{background:C.forest,borderBottom:'1px solid rgba(250,248,243,0.1)',position:'sticky',top:'48px',zIndex:200}}>
    <div className="hscroll cpx cmxauto" style={{padding:'0 72px'}}>
      <div style={{display:'flex',alignItems:'stretch',minWidth:'max-content'}}>
        {C_SEGMENTS.map(s=>(
          <button key={s.id} onClick={()=>setSeg(s.id)}
            style={{display:'flex',alignItems:'center',gap:'7px',padding:'14px 20px',borderBottom:`3px solid ${seg===s.id?C.lime:'transparent'}`,background:'none',borderTop:'none',borderLeft:'none',borderRight:'none',cursor:'pointer',transition:'all 0.15s',minHeight:'48px',whiteSpace:'nowrap'}}
            className="seg-tab">
            <span style={{fontSize:'11px',color:seg===s.id?C.lime:'rgba(250,248,243,0.4)',transition:'color 0.15s'}}>{s.icon}</span>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:seg===s.id?C.lime:'rgba(250,248,243,0.5)',transition:'color 0.15s'}}>{s.label}</span>
          </button>
        ))}
        <div style={{flex:1}}/>
        <div style={{display:'flex',alignItems:'center',padding:'0 8px'}} className="cdesk-only">
          <span style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(250,248,243,0.2)',letterSpacing:'1px'}}>11 LICENCES · NCC L.I. 2475</span>
        </div>
      </div>
    </div>
  </div>
);

// ─── CLIENTS SCORE DASHBOARD ──────────────────────────────────────────────────
const CScoreDashboard = ({seg, clientTier, onUpgrade}) => {
  const mob = useMobile();
  const [showAll, setShowAll] = useState(false);
  const visible = C_LICENCES.filter(l=>l.segs.includes(seg));
  const sorted = [...visible].sort((a,b)=>b.score-a.score);
  const displayed = mob && !showAll ? sorted.slice(0,4) : sorted;
  return (
    <div style={{background:C.paperDark,padding:'48px 0'}} className="cpy48">
      <div className="cpx cmxauto">
        <CSectionMark n="§ I" label="Opportunity Ranking"/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'32px',alignItems:'end',marginBottom:'24px'}} className="cg2">
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,lineHeight:1.1}}>
            {C_SEGMENTS.find(s=>s.id===seg).label}<br/>
            <span style={{fontWeight:400,fontStyle:'italic',color:C.muted}}>BRIDGE Impact Score™ Ranking</span>
          </h2>
          <div style={{display:'flex',gap:'12px',justifyContent:'flex-end',flexWrap:'wrap',alignItems:'center'}}>
            {[{c:C.lime,l:'Core'},{c:C.amber,l:'Emerging'}].map((t,i)=>(
              <div key={i} style={{display:'flex',gap:'5px',alignItems:'center'}}>
                <div style={{width:'14px',height:'2px',background:t.c}}/>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>{t.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
          {displayed.map((lic,i)=>(
            <div key={lic.n} style={{display:'grid',gridTemplateColumns:'28px 1fr auto 56px 72px',gap:'10px',alignItems:'center',padding:'12px 14px',background:i%2===0?C.paper:C.paperDark,borderLeft:`3px solid ${lic.tier==='CORE'?C.lime:C.amber}`}} className="score-row-inner">
              <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:600,color:C.faint}}>#{i+1}</span>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{lic.name}</div>
                <div style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,letterSpacing:'1px',textTransform:'uppercase',marginTop:'1px'}}>{lic.tag}</div>
              </div>
              <div className="score-bar-cell" style={{height:'3px',background:C.border,width:'100px',position:'relative'}}>
                <div style={{position:'absolute',left:0,top:0,height:'100%',width:`${lic.score}%`,background:lic.tier==='CORE'?C.lime:C.amber}}/>
              </div>
              <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:500,color:lic.tier==='CORE'?C.forest:C.amber,textAlign:'right'}}>{lic.score}</div>
              <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:600,color:lic.window==='Now'?C.positive:C.muted,textAlign:'right'}}>{lic.window}</div>
            </div>
          ))}
        </div>
        {mob && sorted.length > 4 && (
          <button onClick={()=>setShowAll(o=>!o)}
            style={{width:'100%',marginTop:'2px',background:C.paperDark,border:`1px solid ${C.border}`,borderTop:`2px solid ${C.lime}`,padding:'13px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.muted,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',minHeight:'48px'}}>
            {showAll?'Show Less ↑':`Show All ${sorted.length} Licences ↓`}
          </button>
        )}
        {clientTier!=='member' && (
          <div style={{marginTop:'2px',background:C.ink,padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'12px',flexWrap:'wrap',borderTop:`2px solid ${C.lime}`}}>
            <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.5}}>
              {clientTier==='public'?'Register free to unlock 4-dimension score breakdown.':'Upgrade to Member for complete dimension analysis.'}
            </p>
            <button onClick={onUpgrade} style={{background:C.lime,color:C.ink,border:'none',padding:'10px 22px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',whiteSpace:'nowrap',minHeight:'44px'}}>
              {clientTier==='public'?'Register Free →':'Upgrade →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── CLIENTS LOCK OVERLAY ─────────────────────────────────────────────────────
const CLockOverlay = ({clientTier, onUpgrade}) => {
  if (clientTier==='member') return null;
  return (
    <div style={{position:'absolute',bottom:0,left:0,right:0,zIndex:10}}>
      <div style={{height:'48px',background:`linear-gradient(to bottom,transparent,${C.paper})`}}/>
      <div style={{background:C.paper,padding:'14px 18px 18px',borderTop:`1px solid ${C.border}`}}>
        <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,marginBottom:'10px',lineHeight:1.5,textAlign:'center'}}>
          {clientTier==='public'?'Register free to unlock entry capital, opportunity analysis, and business models.':'Upgrade to Member for unit economics, regulatory roadmap, and risk matrix.'}
        </p>
        <button onClick={onUpgrade} style={{width:'100%',background:clientTier==='public'?C.forest:C.lime,color:clientTier==='public'?C.paper:C.ink,border:'none',padding:'11px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',minHeight:'44px'}}>
          {clientTier==='public'?'Register Free →':'Upgrade to Member →'}
        </button>
      </div>
    </div>
  );
};

// ─── CLIENTS LICENCE CARD ─────────────────────────────────────────────────────
const CLicCard = ({lic, seg, clientTier, onUpgrade}) => {
  const [open, setOpen] = useState(false);
  const pitch = seg==='entrepreneur'?lic.pe:seg==='business'?lic.pb:seg==='government'?lic.pg:lic.pi;
  const mob = useMobile();
  const isCore = lic.tier==='CORE';
  if (mob) {
    return (
      <div style={{background:C.paper,borderLeft:`3px solid ${isCore?C.lime:C.amber}`,borderBottom:`1px solid ${C.border}`}}>
        <button onClick={()=>setOpen(o=>!o)} style={{width:'100%',display:'grid',gridTemplateColumns:'1fr auto 48px 36px',gap:'10px',alignItems:'center',padding:'14px 16px',background:'none',border:'none',cursor:'pointer',minHeight:'56px',textAlign:'left'}}>
          <div>
            <div style={{display:'flex',gap:'6px',alignItems:'center',marginBottom:'3px'}}>
              <span style={{fontFamily:F.mono,fontSize:'8px',color:C.faint}}>{lic.n}</span>
              <span style={{fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:isCore?C.limeDark:C.amber,border:`1px solid ${isCore?C.lime:C.amber}`,padding:'1px 4px'}}>{lic.tag}</span>
            </div>
            <div style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:C.ink}}>{lic.name}</div>
          </div>
          <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:600,color:lic.window==='Now'?C.positive:C.muted,whiteSpace:'nowrap'}}>{lic.window}</div>
          <div style={{fontFamily:F.mono,fontSize:'22px',fontWeight:400,color:isCore?C.forest:C.amber,lineHeight:1,textAlign:'right'}}>{lic.score}</div>
          <div className={`chev ${open?'open':''}`} style={{fontSize:'11px',color:C.faint,textAlign:'center'}}>▼</div>
        </button>
        {open && (
          <div style={{padding:'0 16px 16px',borderTop:`1px solid ${C.border}`}}>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,lineHeight:1.7,color:C.muted,marginTop:'12px',marginBottom:'12px'}}>{lic.teaser}</p>
            <div style={{background:C.paperDark,padding:'10px 12px',marginBottom:'12px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'2px'}}>Entry Capital</div>
                <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:clientTier!=='public'?C.forest:C.faint,filter:clientTier==='public'?'blur(4px)':'none',userSelect:clientTier==='public'?'none':'auto'}}>{lic.entry}</div>
              </div>
              <CTierIndicator tier={clientTier}/>
            </div>
            {clientTier!=='public' && pitch && (
              <div style={{borderLeft:`2px solid ${C.lime}`,paddingLeft:'10px',marginBottom:'12px'}}>
                <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'4px'}}>Opportunity — {C_SEGMENTS.find(s=>s.id===seg)?.label}</div>
                <p style={{fontFamily:F.body,fontSize:'12px',fontWeight:300,lineHeight:1.7,color:C.ink}}>{pitch}</p>
              </div>
            )}
            {clientTier!=='public' && (
              <div style={{marginBottom:'10px'}}>
                <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'3px'}}>Competitive Moat</div>
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{lic.moat}</div>
              </div>
            )}
            {clientTier!=='public' && (
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3px'}}>
                {lic.models.map((m,i)=>(
                  <div key={i} style={{background:clientTier==='member'?C.paperDark:i<2?C.paperDark:'transparent',border:clientTier==='member'?`1px solid ${C.border}`:i<2?`1px solid ${C.border}`:`1px dashed ${C.border}`,padding:'7px 8px',fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:clientTier==='member'?C.ink:i<2?C.ink:'transparent',filter:clientTier==='registered'&&i>=2?'blur(3px)':'none'}}>{m}</div>
                ))}
              </div>
            )}
            {clientTier==='public' && (
              <button onClick={onUpgrade} style={{width:'100%',background:C.forest,color:C.paper,border:'none',padding:'12px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',marginTop:'8px',minHeight:'44px'}}>Register Free →</button>
            )}
            {clientTier==='registered' && (
              <button onClick={onUpgrade} style={{width:'100%',background:C.lime,color:C.ink,border:'none',padding:'12px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',marginTop:'8px',minHeight:'44px'}}>Upgrade to Member →</button>
            )}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="hov-card" style={{background:C.paper,position:'relative',overflow:'hidden',borderTop:`3px solid ${isCore?C.lime:C.amber}`,display:'flex',flexDirection:'column'}}>
      <div style={{padding:'20px 20px 14px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
          <div>
            <div style={{display:'flex',gap:'7px',alignItems:'center',marginBottom:'5px'}}>
              <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:600,color:C.faint}}>{lic.n}</span>
              <span style={{fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:isCore?C.limeDark:C.amber,border:`1px solid ${isCore?C.lime:C.amber}`,padding:'1px 5px'}}>{lic.tag}</span>
            </div>
            <div style={{fontFamily:F.display,fontSize:'17px',fontWeight:700,color:C.ink,lineHeight:1.1}}>{lic.name}</div>
          </div>
          <div style={{textAlign:'right',flexShrink:0,marginLeft:'8px'}}>
            <div style={{fontFamily:F.mono,fontSize:'32px',fontWeight:400,color:isCore?C.forest:C.amber,lineHeight:1}}>{lic.score}</div>
            <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,color:C.faint,letterSpacing:'1px',textTransform:'uppercase',marginTop:'1px'}}>BRIDGE™</div>
          </div>
        </div>
        <p style={{fontFamily:F.body,fontSize:'12px',fontWeight:300,lineHeight:1.7,color:C.muted}}>{lic.teaser}</p>
      </div>
      <div style={{padding:'0 20px 14px'}}>
        <div style={{background:C.paperDark,padding:'9px 12px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'2px'}}>Entry Capital</div>
            <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:clientTier!=='public'?C.forest:C.faint,filter:clientTier==='public'?'blur(4px)':'none',userSelect:clientTier==='public'?'none':'auto'}}>{lic.entry}</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
            <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:600,color:lic.window==='Now'?C.positive:C.muted}}>{lic.window}</span>
            <CTierIndicator tier={clientTier}/>
          </div>
        </div>
      </div>
      {clientTier!=='public' && pitch && (
        <div style={{padding:'0 20px 14px'}}>
          <div style={{borderLeft:`2px solid ${C.lime}`,paddingLeft:'12px'}}>
            <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>Opportunity — {C_SEGMENTS.find(s=>s.id===seg)?.label}</div>
            <p style={{fontFamily:F.body,fontSize:'12px',fontWeight:300,lineHeight:1.7,color:C.ink}}>{pitch}</p>
          </div>
        </div>
      )}
      {clientTier!=='public' && (
        <div style={{padding:'0 20px 14px'}}>
          <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'3px'}}>Moat</div>
          <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted}}>{lic.moat}</div>
        </div>
      )}
      {clientTier!=='public' && (
        <div style={{padding:'0 20px'}}>
          <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'7px'}}>4 Business Models</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3px'}}>
            {lic.models.map((m,i)=>(
              <div key={i} style={{background:clientTier==='member'?C.paperDark:i<2?C.paperDark:'transparent',border:clientTier==='member'?`1px solid ${C.border}`:i<2?`1px solid ${C.border}`:`1px dashed ${C.border}`,padding:'6px 8px',fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:clientTier==='member'?C.ink:i<2?C.ink:'transparent',filter:clientTier==='registered'&&i>=2?'blur(3px)':'none'}}>{m}</div>
            ))}
          </div>
        </div>
      )}
      {clientTier==='member' && pitch && (
        <div style={{margin:'12px 20px 0',background:C.ink,padding:'11px 13px'}}>
          <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px'}}>Member Intelligence</div>
          <p style={{fontFamily:F.body,fontSize:'11px',fontWeight:300,lineHeight:1.7,color:'rgba(250,248,243,0.65)'}}>{pitch}</p>
        </div>
      )}
      <div style={{flex:1,minHeight:'16px'}}/>
      <CLockOverlay clientTier={clientTier} onUpgrade={onUpgrade}/>
      {clientTier!=='member' && <div style={{height:clientTier==='public'?'110px':'76px'}}/>}
    </div>
  );
};

// ─── CLIENTS LICENCE GRID ─────────────────────────────────────────────────────
const CLicGrid = ({seg, clientTier, onUpgrade}) => {
  const mob = useMobile();
  const lics = C_LICENCES.filter(l=>l.segs.includes(seg));
  return (
    <div style={{background:C.paper,padding:'48px 0'}} className="cpy48">
      <div className="cpx cmxauto">
        <CSectionMark n="§ II" label="Licence Intelligence"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'20px',flexWrap:'wrap',gap:'10px'}}>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,lineHeight:1.1}}>
            {lics.length} {lics.length===1?'Category':'Categories'} — {C_SEGMENTS.find(s=>s.id===seg).label}
          </h2>
          {clientTier!=='member' && !mob && (
            <button onClick={onUpgrade} style={{background:C.ink,color:C.lime,border:`1px solid ${C.lime}`,padding:'8px 18px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',minHeight:'40px'}}>
              {clientTier==='public'?'Register for More':'Upgrade →'}
            </button>
          )}
        </div>
        {mob ? (
          <div style={{border:`1px solid ${C.border}`}}>
            {lics.map(lic=><CLicCard key={lic.n} lic={lic} seg={seg} clientTier={clientTier} onUpgrade={onUpgrade}/>)}
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'2px',background:C.border}} className="cg3">
            {lics.map(lic=><CLicCard key={lic.n} lic={lic} seg={seg} clientTier={clientTier} onUpgrade={onUpgrade}/>)}
          </div>
        )}
        <div style={{marginTop:'2px',background:C.ink,padding:'16px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
          <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.5}}>Switch audience tabs to see how each segment maps to the value chain.</p>
          <button onClick={()=>document.getElementById('c-brief-selector')?.scrollIntoView({behavior:'smooth'})}
            style={{background:C.lime,color:C.ink,border:'none',padding:'10px 20px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',whiteSpace:'nowrap',minHeight:'44px'}}>
            Purchase Briefs ↓
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── CLIENTS CONVERSION BAND ──────────────────────────────────────────────────
const CConversionBand = ({clientTier, setClientTier}) => {
  if (clientTier==='member') return null;
  const isPublic = clientTier==='public';
  return (
    <div style={{background:C.forest,padding:'20px 0',borderTop:`3px solid ${C.lime}`}}>
      <div className="cpx cmxauto" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'20px',flexWrap:'wrap'}}>
        <div style={{display:'flex',gap:'14px',alignItems:'center',flexWrap:'wrap',flex:1}}>
          <div style={{background:C.lime,color:C.ink,padding:'4px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',flexShrink:0}}>{isPublic?'FREE':'UPGRADE'}</div>
          <p style={{fontFamily:F.body,fontSize:'14px',fontWeight:300,color:'rgba(250,248,243,0.72)',lineHeight:1.5,maxWidth:'520px'}}>
            {isPublic?'Register in 60 seconds. Unlock entry capital, audience analysis, and business model summaries for all 11 licences.':'Full access to 11 licence briefs — business models, unit economics, 5-phase roadmap, risk matrix per brief.'}
          </p>
        </div>
        <button onClick={()=>setClientTier(isPublic?'registered':'member')}
          style={{background:C.lime,color:C.ink,border:'none',padding:'12px 24px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',whiteSpace:'nowrap',minHeight:'44px'}}>
          {isPublic?'Register Free →':'Apply for Access →'}
        </button>
      </div>
    </div>
  );
};

// ─── CLIENTS BRIEF SELECTOR ───────────────────────────────────────────────────
const CBriefSelector = ({seg}) => {
  const mob = useMobile();
  const [sel, setSel] = useState(new Set());
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const toggle = n => { const next = new Set(sel); next.has(n)?next.delete(n):next.add(n); setSel(next); };
  const total = [...sel].reduce((a,n)=>a+C_PRICES[n],0);
  const all = sel.size===C_LICENCES.length;
  const recLics = C_LICENCES.filter(l=>l.segs.includes(seg));
  const otherLics = C_LICENCES.filter(l=>!l.segs.includes(seg));
  return (
    <div style={{background:C.ink}} id="c-brief-selector">
      <div className="cpx cmxauto" style={{paddingTop:'56px',paddingBottom:'40px'}}>
        <CSectionMark n="§ III" label="Purchase Intelligence" light/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 400px',gap:'52px',alignItems:'start'}} className="cg2">
          <div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,4.5vw,52px)',fontWeight:900,color:C.paper,lineHeight:1.0,letterSpacing:'-0.5px',marginBottom:'12px'}}>
              The intelligence you need<br/><span style={{color:C.lime}}>to act before the window closes.</span>
            </h2>
            <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:'rgba(250,248,243,0.5)',marginBottom:'24px',maxWidth:'500px'}}>
              Ghana licensing opened February 2026. Zero incumbents. Every brief gives you the full picture — business models, unit economics, regulatory roadmap, risk matrix, and first-mover intelligence.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'rgba(250,248,243,0.06)',marginBottom:'0'}} className="cg2">
              {[{n:'4',l:'Business Models'},{n:'5',l:'Regulatory Phases'},{n:'8',l:'Risk Register'},{n:'∞',l:'First-Mover Intel'}].map((s,i)=>(
                <div key={i} style={{padding:'14px 16px',background:'rgba(250,248,243,0.03)'}}>
                  <div style={{fontFamily:F.mono,fontSize:'22px',fontWeight:400,color:C.lime,lineHeight:0.9,marginBottom:'5px'}}>{s.n}</div>
                  <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.5)'}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'2px'}} className="price-compare">
            {[
              {label:'Individual Brief',price:'$129–$299',desc:'One licence category. Immediate download.',cta:'Select below ↓',lime:false,action:'scroll'},
              {label:'All 11 Briefs',price:`$${C_BUNDLE.toLocaleString()}`,desc:'Full cannabis series. Intelligence Summary included free.',cta:'Add All to Cart →',lime:false,action:'all'},
              {label:'Members Access',price:`$${C_MEMBERSHIP.toLocaleString()}/yr`,desc:'All 11 briefs + all 12 BRIDGE sectors. Quarterly updates.',cta:'Apply for Access →',lime:true,action:'member'},
            ].map((opt,i)=>(
              <div key={i} style={{background:opt.lime?C.lime:'rgba(250,248,243,0.05)',padding:'18px 20px',borderLeft:`3px solid ${opt.lime?C.forest:i===1?C.limeDark:C.teal}`,cursor:'pointer'}}
                onClick={()=>opt.action==='scroll'?document.getElementById('c-brief-grid')?.scrollIntoView({behavior:'smooth'}):opt.action==='all'?setSel(new Set(C_LICENCES.map(l=>l.n))):null}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'4px',gap:'8px',flexWrap:'wrap'}}>
                  <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:opt.lime?C.ink:'rgba(250,248,243,0.4)'}}>{opt.label}</div>
                  <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:600,color:opt.lime?C.forest:C.lime,lineHeight:1}}>{opt.price}</div>
                </div>
                <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:opt.lime?'rgba(13,26,16,0.55)':'rgba(250,248,243,0.3)',marginBottom:'10px',lineHeight:1.4}}>{opt.desc}</div>
                <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'0.5px',color:opt.lime?C.forest:C.lime}}>{opt.cta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cpx cmxauto" id="c-brief-grid" style={{paddingBottom:'0'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px',flexWrap:'wrap',gap:'10px'}}>
          <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
            <div style={{width:'3px',height:'3px',background:C.lime,borderRadius:'50%'}}/>
            <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>Recommended — {C_SEGMENTS.find(s=>s.id===seg).label}</span>
          </div>
          <button onClick={()=>setSel(new Set(C_LICENCES.map(l=>l.n)))}
            style={{background:'transparent',color:'rgba(250,248,243,0.4)',border:'1px solid rgba(250,248,243,0.12)',padding:'7px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',minHeight:'40px'}}>
            Select All 11 — ${C_BUNDLE.toLocaleString()}
          </button>
        </div>
        {!mob ? (
          <>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:'rgba(250,248,243,0.06)'}} className="cg3">
              {recLics.map(lic=>{
                const isSel = sel.has(lic.n);
                return (
                  <div key={lic.n} className="hov-card" onClick={()=>toggle(lic.n)}
                    style={{background:isSel?C.forest:C.ink,padding:'20px',cursor:'pointer',transition:'background 0.12s',position:'relative',borderTop:`2px solid ${isSel?C.lime:lic.tier==='CORE'?'rgba(184,217,53,0.3)':C.amber}`}}>
                    {isSel && <div style={{position:'absolute',top:'10px',right:'10px',background:C.lime,color:C.ink,width:'18px',height:'18px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',fontWeight:800}}>✔</div>}
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px',gap:'8px'}}>
                      <div>
                        <div style={{display:'flex',gap:'6px',alignItems:'center',marginBottom:'4px'}}>
                          <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.25)'}}>{lic.n}</span>
                          <span style={{fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:isSel?C.lime:lic.tier==='CORE'?'rgba(184,217,53,0.5)':C.amber,border:`1px solid ${isSel?C.lime:lic.tier==='CORE'?'rgba(184,217,53,0.3)':C.amber}`,padding:'1px 4px'}}>{lic.tag}</span>
                        </div>
                        <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.paper,lineHeight:1.1}}>{lic.name}</div>
                      </div>
                      <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:600,color:C.lime,flexShrink:0}}>${C_PRICES[lic.n]}</div>
                    </div>
                    <p style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.45)',lineHeight:1.6,marginBottom:'10px'}}>{lic.teaser}</p>
                    <div style={{position:'relative',overflow:'hidden',borderTop:'1px solid rgba(250,248,243,0.07)',paddingTop:'9px'}}>
                      <div className="blurred" style={{opacity:0.35}}>
                        {[86,62,75,50].map((w,j)=>(
                          <div key={j} style={{background:'rgba(250,248,243,0.12)',height:'7px',borderRadius:'1px',width:`${w}%`,marginBottom:'5px'}}/>
                        ))}
                      </div>
                      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:isSel?1:0,transition:'opacity 0.15s'}}>
                        <div style={{background:C.lime,color:C.ink,padding:'6px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase'}}>{isSel?'✔ Added':'Add to Cart →'}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {otherLics.length > 0 && (
              <div style={{marginTop:'1px'}}>
                <div style={{display:'flex',gap:'8px',alignItems:'center',padding:'12px 0'}}>
                  <div style={{flex:1,height:'1px',background:'rgba(250,248,243,0.06)'}}/>
                  <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.2)',flexShrink:0}}>Additional Categories</span>
                  <div style={{width:'24px',height:'1px',background:'rgba(250,248,243,0.06)'}}/>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:'rgba(250,248,243,0.04)'}} className="cg3">
                  {otherLics.map(lic=>{
                    const isSel = sel.has(lic.n);
                    return (
                      <div key={lic.n} onClick={()=>toggle(lic.n)}
                        style={{background:isSel?C.forest:'rgba(250,248,243,0.02)',padding:'14px 18px',cursor:'pointer',transition:'background 0.12s',borderTop:`1px solid ${isSel?C.lime:'rgba(250,248,243,0.07)'}`}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}>
                          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                            <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.2)'}}>{lic.n}</span>
                            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:isSel?C.paper:'rgba(250,248,243,0.5)'}}>{lic.name}</span>
                          </div>
                          <div style={{display:'flex',gap:'8px',alignItems:'center',flexShrink:0}}>
                            <span style={{fontFamily:F.mono,fontSize:'12px',fontWeight:600,color:isSel?C.lime:'rgba(250,248,243,0.3)'}}>${C_PRICES[lic.n]}</span>
                            <div style={{width:'16px',height:'16px',border:`1px solid ${isSel?C.lime:'rgba(250,248,243,0.15)'}`,background:isSel?C.lime:'transparent',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',fontWeight:800,color:C.ink,flexShrink:0,transition:'all 0.12s'}}>{isSel?'✔':''}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{border:'1px solid rgba(250,248,243,0.08)',borderBottom:'none'}}>
            {[...recLics,...otherLics].map((lic,idx)=>{
              const isSel = sel.has(lic.n);
              const isRec = lic.segs.includes(seg);
              const isFirst = idx===recLics.length && otherLics.length > 0;
              return (
                <div key={lic.n}>
                  {isFirst && (
                    <div style={{display:'flex',gap:'8px',alignItems:'center',padding:'10px 16px',background:'rgba(250,248,243,0.02)',borderBottom:'1px solid rgba(250,248,243,0.06)'}}>
                      <div style={{flex:1,height:'1px',background:'rgba(250,248,243,0.06)'}}/>
                      <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.2)',flexShrink:0}}>Additional Licences</span>
                      <div style={{width:'24px',height:'1px',background:'rgba(250,248,243,0.06)'}}/>
                    </div>
                  )}
                  <button onClick={()=>toggle(lic.n)}
                    style={{width:'100%',display:'grid',gridTemplateColumns:'1fr auto auto 48px',gap:'10px',alignItems:'center',padding:'14px 16px',background:isSel?`${C.forest}CC`:'transparent',border:'none',borderBottom:'1px solid rgba(250,248,243,0.06)',cursor:'pointer',borderLeft:`3px solid ${isSel?C.lime:lic.tier==='CORE'?'rgba(184,217,53,0.25)':C.amber}`,minHeight:'56px',textAlign:'left',transition:'background 0.12s'}}>
                    <div>
                      <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:isSel?C.paper:isRec?C.paper:'rgba(250,248,243,0.55)'}}>{lic.name}</div>
                      <div style={{fontFamily:F.sans,fontSize:'8px',letterSpacing:'1px',textTransform:'uppercase',color:'rgba(250,248,243,0.2)',marginTop:'1px'}}>{lic.tag}</div>
                    </div>
                    <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:600,color:isSel?C.lime:'rgba(250,248,243,0.4)'}}>${C_PRICES[lic.n]}</div>
                    <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:400,color:isSel?C.lime:lic.tier==='CORE'?'rgba(184,217,53,0.55)':C.amber,lineHeight:1}}>{lic.score}</div>
                    <div style={{width:'32px',height:'32px',border:`1px solid ${isSel?C.lime:'rgba(250,248,243,0.15)'}`,background:isSel?C.lime:'transparent',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:800,color:C.ink,flexShrink:0,transition:'all 0.12s'}}>{isSel?'✔':''}</div>
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <div style={{marginTop:'1px',background:sel.size>0?C.forest:'rgba(250,248,243,0.03)',padding:'16px 22px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'14px',flexWrap:'wrap',transition:'background 0.2s',borderTop:`2px solid ${sel.size>0?C.lime:'rgba(250,248,243,0.05)'}`}} className="cart-inline">
          {sel.size===0 ? (
            <span style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.25)'}}>Select briefs above to build your cart</span>
          ) : (
            <div>
              <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)',marginBottom:'3px'}}>{sel.size} brief{sel.size>1?'s':''}</div>
              <div style={{display:'flex',alignItems:'baseline',gap:'10px'}}>
                <span style={{fontFamily:F.mono,fontSize:'22px',fontWeight:600,color:C.paper}}>${all?C_BUNDLE.toLocaleString():total.toLocaleString()}</span>
                {!all && <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.35)'}}>vs ${C_BUNDLE.toLocaleString()} for all 11</span>}
              </div>
            </div>
          )}
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {sel.size>0 && !all && (
              <button onClick={()=>setSel(new Set(C_LICENCES.map(l=>l.n)))}
                style={{background:'transparent',color:C.lime,border:`1px solid ${C.lime}`,padding:'9px 16px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',whiteSpace:'nowrap',minHeight:'40px'}}>
                All 11 — ${C_BUNDLE.toLocaleString()} →
              </button>
            )}
            {sel.size>0 && (
              <button style={{background:C.lime,color:C.ink,border:'none',padding:'10px 24px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',whiteSpace:'nowrap',minHeight:'40px'}}>
                Checkout ${all?C_BUNDLE.toLocaleString():total.toLocaleString()} →
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Email capture */}
      <div className="cpx cmxauto" style={{padding:'48px 72px 0'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'center',borderTop:'1px solid rgba(250,248,243,0.08)',paddingTop:'40px'}} className="cg2">
          <div>
            <div style={{background:C.lime,color:C.ink,display:'inline-block',padding:'3px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',marginBottom:'12px'}}>Free Sector Alert</div>
            <h3 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,26px)',fontWeight:700,color:C.paper,lineHeight:1.15,marginBottom:'8px'}}>Get the Ghana Cannabis Alert</h3>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,lineHeight:1.8,color:'rgba(250,248,243,0.45)'}}>One email. No schedule. NCC updates, first-mover windows, and key market developments — sent only when it matters.</p>
          </div>
          {!done ? (
            <div>
              <div style={{display:'flex',gap:'4px',marginBottom:'10px',flexWrap:'wrap'}} className="cmob-stack">
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address"
                  style={{flex:1,minWidth:'200px',padding:'13px 14px',fontFamily:F.sans,fontSize:'13px',border:'1px solid rgba(250,248,243,0.15)',background:'rgba(250,248,243,0.05)',color:C.paper,outline:'none'}}/>
                <button onClick={()=>email&&setDone(true)}
                  style={{background:C.lime,color:C.ink,border:'none',padding:'13px 20px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'0.5px',cursor:'pointer',whiteSpace:'nowrap',minHeight:'48px'}}>
                  Subscribe →
                </button>
              </div>
            </div>
          ) : (
            <div style={{display:'flex',gap:'14px',alignItems:'center',padding:'18px 20px',border:`1px solid ${C.lime}`}}>
              <div style={{width:'28px',height:'28px',background:C.lime,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'13px',fontWeight:800,color:C.ink}}>✔</div>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.lime,marginBottom:'3px'}}>You are on the list.</div>
                <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.5}}>BRIDGE will send Ghana Cannabis Intelligence updates as the sector opens.</div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Membership CTA */}
      <div className="cpx cmxauto" style={{padding:'40px 72px 56px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:'48px',alignItems:'start',borderTop:'1px solid rgba(250,248,243,0.08)',paddingTop:'40px'}} className="cg2">
          <div>
            <div style={{background:C.forest,color:C.lime,display:'inline-block',padding:'3px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',marginBottom:'14px'}}>BRIDGE MEMBERS</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,4vw,44px)',fontWeight:900,color:C.paper,lineHeight:1.0,marginBottom:'12px',letterSpacing:'-0.5px'}}>All 11 briefs.<br/>All 12 sectors.<br/><span style={{color:C.lime}}>One membership.</span></h2>
            <p style={{fontFamily:F.body,fontSize:'14px',fontWeight:300,lineHeight:1.85,color:'rgba(250,248,243,0.5)',marginBottom:'20px',maxWidth:'460px'}}>Every cannabis licence brief, every BRIDGE sector analysis, quarterly updates, and access to the BRIDGE partner and investor network.</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4px 24px'}} className="deliverables-grid">
              {['All 11 Ghana Cannabis briefs','All 12 BRIDGE sector analyses','Quarterly intelligence updates','BRIDGE Impact Score™ per licence','Unit economics + deployment params','NCC regulatory tracker','Partner + investor network','Analyst Q&A access','Ghana vs. 7 African peers','Export buyer directory','First-mover timing intelligence','5-phase regulatory roadmaps'].map((item,i)=>(
                <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'5px 0',borderBottom:'1px solid rgba(250,248,243,0.04)'}}>
                  <span style={{color:C.lime,fontSize:'8px',flexShrink:0,marginTop:'3px'}}>→</span>
                  <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:500,color:'rgba(250,248,243,0.5)',lineHeight:1.4}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'rgba(250,248,243,0.04)',border:'1px solid rgba(250,248,243,0.1)',padding:'24px'}}>
            <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Members Access</div>
            <div style={{borderBottom:'1px solid rgba(250,248,243,0.08)',paddingBottom:'14px',marginBottom:'14px'}}>
              <div style={{fontFamily:F.mono,fontSize:'34px',fontWeight:400,color:C.lime,lineHeight:1,marginBottom:'4px'}}>${C_MEMBERSHIP.toLocaleString()}<span style={{fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.3)'}}>/yr</span></div>
              <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.38)',lineHeight:1.5}}>All 12 sectors · All 11 cannabis briefs · Updates</div>
            </div>
            {[{l:'Individual briefs',v:'$129–$299 ea'},{l:'All 11 cannabis',v:`$${C_BUNDLE.toLocaleString()}`},{l:'Members annual',v:`$${C_MEMBERSHIP.toLocaleString()}/yr`,hl:true},{l:'Covers',v:'All 12 sectors'}].map((r,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:'1px solid rgba(250,248,243,0.04)'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.28)'}}>{r.l}</span>
                <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:600,color:r.hl?C.lime:'rgba(250,248,243,0.45)'}}>{r.v}</span>
              </div>
            ))}
            <div style={{marginTop:'16px',display:'flex',flexDirection:'column',gap:'6px'}}>
              <button style={{background:C.lime,color:C.ink,border:'none',padding:'13px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,letterSpacing:'0.5px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',minHeight:'48px'}}>Apply for Members Access →</button>
              <button style={{background:'transparent',color:'rgba(250,248,243,0.18)',border:'none',padding:'6px',fontFamily:F.sans,fontSize:'9px',cursor:'pointer',minHeight:'36px'}}>Already a member? Sign in →</button>
            </div>
            <div style={{marginTop:'14px',padding:'10px 12px',background:'rgba(184,217,53,0.04)',border:'1px solid rgba(184,217,53,0.1)'}}>
              <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>Free with any purchase</div>
              <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.35)',lineHeight:1.4}}>Cannabis Intelligence Summary — strategic overview of all 11 licences, included free.</div>
            </div>
          </div>
        </div>
      </div>
      {mob && sel.size > 0 && (
        <div className="cart-sticky slide-up" style={{position:'fixed',bottom:0,left:0,right:0,zIndex:400,background:C.forest,borderTop:`3px solid ${C.lime}`,padding:'12px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'12px',boxShadow:'0 -8px 32px rgba(0,0,0,0.4)'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.5)',marginBottom:'2px'}}>{sel.size} brief{sel.size>1?'s':''} selected</div>
            <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:600,color:C.paper,lineHeight:1}}>${all?C_BUNDLE.toLocaleString():total.toLocaleString()}</div>
          </div>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {!all && (
              <button onClick={()=>setSel(new Set(C_LICENCES.map(l=>l.n)))}
                style={{background:'transparent',color:C.lime,border:`1px solid ${C.lime}`,padding:'10px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'0.5px',cursor:'pointer',whiteSpace:'nowrap',minHeight:'44px'}}>All 11</button>
            )}
            <button style={{background:C.lime,color:C.ink,border:'none',padding:'10px 24px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',cursor:'pointer',whiteSpace:'nowrap',minHeight:'44px'}}>Checkout →</button>
          </div>
        </div>
      )}
      {mob && sel.size > 0 && <div style={{height:'80px'}}/>}
    </div>
  );
};

// ─── CLIENTS VIEW ROOT ────────────────────────────────────────────────────────
const ClientsView = ({setTier}) => {
  const [seg, setSeg] = useState('entrepreneur');
  const [clientTier, setClientTier] = useState('public');
  const up = () => setClientTier(t=>t==='public'?'registered':t==='registered'?'member':'member');
  return (
    <div style={{fontFamily:F.body,background:C.ink,minHeight:'100vh'}}>
      <ClientGf/>
      <CClientsHero seg={seg} clientTier={clientTier} setClientTier={setClientTier}/>
      <CSegBar seg={seg} setSeg={setSeg}/>
      <CScoreDashboard seg={seg} clientTier={clientTier} onUpgrade={up}/>
      <CLicGrid seg={seg} clientTier={clientTier} onUpgrade={up}/>
      <CConversionBand clientTier={clientTier} setClientTier={setClientTier}/>
      <CBriefSelector seg={seg}/>
    </div>
  );
};


export default function BridgeCannabisIntelligence() {
  const [tier, setTier] = useState('public');
  const [page, setPage] = useState('main');
  const [showLogin, setShowLogin] = useState(false);
  const [loginTarget, setLoginTarget] = useState('registered');
  const coverLogoRef = useRef(null);

  const handleTierSet = (t) => { setTier(t); setShowLogin(false); };

  if (page === 'purchase') {
    return (
      <PurchasePage
        setPage={setPage}
        setShowLogin={setShowLogin}
        setLoginTarget={setLoginTarget}
      />
    );
  }

  if (tier === 'clients') {
    return (
      <div style={{fontFamily:F.body,background:C.ink,overflowX:'hidden'}}>
        <DocumentGlobalStyles extraCss={EXTRA_CSS}/>
        <TopBar
          coverLogoRef={coverLogoRef}
          tier={tier}
          setTier={setTier}
          setPage={setPage}
          setLoginTarget={setLoginTarget}
          setShowLogin={setShowLogin}
        />
        <ClientsView setTier={setTier}/>
        <Footer/>
      </div>
    );
  }

  return (
    <div style={{fontFamily:F.body,background:C.paper,overflowX:'hidden'}}>
      <DocumentGlobalStyles extraCss={EXTRA_CSS}/>
      <TopBar
        coverLogoRef={coverLogoRef}
        tier={tier}
        setTier={setTier}
        setPage={setPage}
        setLoginTarget={setLoginTarget}
        setShowLogin={setShowLogin}
      />
      <Cover logoRef={coverLogoRef} setPage={setPage}/>
      <PolicyContext/>
      <ValueChain tier={tier} setTier={setTier} setPage={setPage} setShowLogin={setShowLogin} setLoginTarget={setLoginTarget}/>
      <TierTeaser tier={tier} setTier={setTier} setShowLogin={setShowLogin} setLoginTarget={setLoginTarget}/>
      <LicenseExplorer
        tier={tier}
        setTier={setTier}
        setPage={setPage}
        setShowLogin={setShowLogin}
        setLoginTarget={setLoginTarget}
      />
      <OpportunityMatrix
        tier={tier}
        setTier={setTier}
        setPage={setPage}
        setShowLogin={setShowLogin}
        setLoginTarget={setLoginTarget}
      />
      <Gate
        setTier={setTier}
        setPage={setPage}
        setShowLogin={setShowLogin}
        setLoginTarget={setLoginTarget}
      />
      <Footer/>
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        loginTarget={loginTarget}
        setTier={handleTierSet}
        setPage={setPage}
      />
    </div>
  );
}
