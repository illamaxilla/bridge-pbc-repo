import { useState, useEffect, useRef } from "react";
import { DOC_COLORS as C, DOC_FONTS as F } from "@/lib/document-tokens";
import DocumentGlobalStyles from "@/components/documents/DocumentGlobalStyles";
import DocumentLogo from "@/components/documents/DocumentLogo";
import DocumentTopBar from "@/components/documents/DocumentTopBar";
import LicenceMobileNav from "@/components/documents/LicenceMobileNav";
import { SectionRule, Eyebrow, ScoreBar, PullQuote, Tag, MobCarousel, MobPhaseAccordion, MobCountryCards, MobileCollapse } from "@/components/documents/DocumentHelpers";

const NAV_SECTIONS = [
  {id:'s01',num:'§ 01',title:'Why Now'},
  {id:'s02',num:'§ 02',title:'Thesis'},
  {id:'s03',num:'§ 03',title:'Ghana Fit'},
  {id:'s04',num:'§ 04',title:'Business Models'},
  {id:'s05',num:'§ 05',title:'Economics'},
  {id:'s06',num:'§ 06',title:'Value Chain'},
  {id:'s07',num:'§ 07',title:'Competition'},
  {id:'s08',num:'§ 08',title:'Regulatory'},
  {id:'s09',num:'§ 09',title:'Risks'},
  {id:'s10',num:'§ 10',title:'BRIDGE Score'},
  {id:'s11',num:'§ 11',title:'Deployment'},
];

// ─────────────────────────────────────────────────────────────────────────────
// COVER
// ─────────────────────────────────────────────────────────────────────────────
const Cover = ({logoRef}) => (
  <div className="pad-cover" style={{background:C.ink,padding:'48px 64px 0',position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',right:'-20px',top:'-30px',fontFamily:F.display,fontSize:'clamp(180px,35vw,480px)',fontWeight:900,color:'rgba(255,255,255,0.022)',pointerEvents:'none',userSelect:'none',letterSpacing:'-12px',lineHeight:1}}>03</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
      <div ref={logoRef} style={{marginBottom:'36px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <DocumentLogo height={30} variant="white"/>
        <div className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.22)',letterSpacing:'0.8px'}}>MARCH 2026 · NCC L.I. 2475</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
        <div style={{background:C.lime,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.ink}}>LICENCE 03 · UPSTREAM</div>
        <div style={{border:`1px solid ${C.lime}`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>EMERGING TIER</div>
        <div className="mob-hide" style={{border:`1px solid rgba(255,255,255,0.15)`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>MEMBERS INTELLIGENCE</div>
      </div>
      <h1 style={{fontFamily:F.display,fontSize:'clamp(30px,5.5vw,68px)',fontWeight:900,color:C.paper,lineHeight:1.08,marginBottom:'20px',maxWidth:'800px'}}>
        Breeding & Seed<br/>
        <span style={{fontWeight:400,fontStyle:'italic',color:'rgba(250,248,243,0.55)',fontSize:'0.72em'}}>The Genetic Foundation Without Which Nothing Else Grows</span>
      </h1>
      <PullQuote onDark>
        Ghana currently imports 100% of its certified hemp seed from Europe and Canada. Every cultivation licence holder is exposed to import dependency, FX risk, and phytosanitary delay. The operator who builds the first compliant domestic seed system does not just start a business — they become the genetic foundation of an entire national industry.
      </PullQuote>
      <div style={{borderTop:`1px solid rgba(255,255,255,0.09)`,paddingTop:'28px',marginTop:'8px',display:'flex',flexWrap:'wrap'}} className="stats-row">
        {[
          {v:'64',    l:'BRIDGE Score™',          s:'Emerging · Long-horizon opportunity'},
          {v:'€450–900',l:'Certified Seed Cost/kg', s:'Current EU/Canadian import price'},
          {v:'11',    l:'Licences Need Seed',       s:'Every cultivation licence is dependent'},
          {v:'$2K–8K',l:'Seed Revenue/ha potential',s:'Certified supply commands premium pricing'},
          {v:'3–5yr', l:'Domestic Market Horizon',  s:'Before import substitution is viable'},
        ].map((s,i) => (
          <div key={i} style={{flex:'1 1 20%',minWidth:'140px',padding:'18px 20px 22px',borderRight:i<4?`1px solid rgba(255,255,255,0.07)`:'none'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(18px,2.2vw,26px)',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'6px'}}>{s.v}</div>
            <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.38)',marginBottom:'4px'}}>{s.l}</div>
            <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.24)',lineHeight:1.4}}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// TABLE OF CONTENTS
// ─────────────────────────────────────────────────────────────────────────────
const TOC = () => (
  <div className="pad-section" style={{background:C.paperDark,padding:'40px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'20px',flexWrap:'wrap',gap:'10px'}}>
        <div>
          <Eyebrow>Full Document Contents</Eyebrow>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:C.ink}}>What This Brief Covers</h2>
        </div>
        <div style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,letterSpacing:'0.5px'}}>11 Sections · Members Access</div>
      </div>
      <div className="toc-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0'}}>
        {[
          {n:'01',t:'Why Now — The February 2026 Milestone',s:'What the licensing launch means for seed demand and breeders',id:'s01'},
          {n:'02',t:'The Breeding & Seed Thesis',s:'Ghana imports 100% of its certified seed — the first domestic supplier wins',id:'s02'},
          {n:'03',t:'Ghana Agro-Ecological & Research Fit',s:'CSIR, KNUST, and four zones — the institutional breeding base',id:'s03'},
          {n:'04',t:'Business Models',s:'4 structures — from adaptive trials to regional seed hub',id:'s04'},
          {n:'05',t:'Unit Economics',s:'Seed pricing, revenue per hectare, royalty structures',id:'s05'},
          {n:'06',t:'Value Chain Position',s:"Breeding's role — the genetic upstream of the entire industry",id:'s06'},
          {n:'07',t:'Competitive Landscape',s:'Ghana vs. 7 African peers — breeding and seed infrastructure',id:'s07'},
          {n:'08',t:'Regulatory Roadmap',s:'NCC variety approval, PVP framework, certification pathway',id:'s08'},
          {n:'09',t:'Risk Register',s:'Full matrix — 8 risks, severity, mitigations',id:'s09'},
          {n:'10',t:'BRIDGE Impact Score™',s:'4-dimension analysis, composite 64/100',id:'s10'},
          {n:'11',t:'Deployment Parameters',s:'Capital, team, timeline, patient capital requirements',id:'s11'},
        ].map((r,i) => (
          <div key={i} className="toc-item" style={{display:'flex',gap:'14px',padding:'10px 0',borderBottom:`1px solid ${C.border}`,alignItems:'flex-start'}}
            onClick={()=>document.getElementById(r.id)?.scrollIntoView({behavior:'smooth',block:'start'})}>
            <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.lime,flexShrink:0,marginTop:'2px',minWidth:'22px'}}>{r.n}</span>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{r.t}</div>
              <div className="toc-sub" style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted}}>{r.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 01 — WHY NOW
// ─────────────────────────────────────────────────────────────────────────────
const WhyNow = () => (
  <div id="s01" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 01" title="Why Now" stat="Feb 2026" label="Seed Demand Clock Started" defaultOpen={true}>
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 01</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Why Now</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'700px'}}>26 February 2026: Every New Cultivation Licence Creates Demand for Seeds Ghana Cannot Yet Supply</h2>
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'48px'}} className="tc">
        <div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            On 26 February 2026, Ghana launched its national licensing regime for industrial and medicinal cannabis. For the breeding and seed sector, this event has a precise implication: every Licence 01 cultivation holder who plants hemp must source certified, THC-compliant seed. Ghana currently produces none. Every seed is imported from Europe or Canada at €450–900 per kilogram, with phytosanitary documentation delays, FX exposure, and no guarantee of tropical-environment THC stability.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The legal architecture is in place. Act 1019 (2020), Act 1100 (2023), and L.I. 2475 define 11 licence categories including Licence 03 — Breeding & Seed. This licence covers the development and production of compliant cannabis varieties and certified seed for supply to cultivation licence holders. It is the most upstream position in the entire value chain: without compliant seed, no cultivation happens; without cultivation, no processing, no export, no dispensing.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Ghana also adopted a Plant Variety Protection (PVP) law in 2020, aligned with UPOV principles, giving breeders legal rights to earn royalties from commercialised varieties. The enabling IP framework is in place. The institutional breeding capacity — CSIR Crops Research Institute, KNUST, University of Ghana — exists. What Ghana lacks is a commercially structured, NCC-licensed hemp breeding and seed operation.
          </p>
        </div>
        <div>
          <div style={{background:C.ink,padding:'24px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Breeding & Seed Framework at a Glance</div>
            {[
              {l:'NCC Licence',v:'Licence 03 · Breeding & Seed'},
              {l:'Current Domestic Supply',v:'Zero — 100% imported'},
              {l:'Import Source',v:'EU (certified) · Canada'},
              {l:'Import Price',v:'€450–900/kg certified seed'},
              {l:'IP Framework',v:'Ghana PVP Act 2020 (UPOV-aligned)'},
              {l:'Key Institutions',v:'CSIR-CRI · KNUST · UG'},
              {l:'Variety Approval',v:'NCC + Ghana Standards Authority'},
              {l:'Timeline to Domestic Supply',v:'3–5 years minimum'},
            ].map((r,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<7?`1px solid rgba(255,255,255,0.07)`:'none',gap:'10px'}}>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.38)',flexShrink:0}}>{r.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.paper,textAlign:'right'}}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px'}}>
            <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>
              Ghana joins 9–10 African nations with legal cannabis frameworks, but is the first to launch a comprehensive open licensing system covering the full value chain simultaneously — from genetics to dispensing.
            </p>
          </div>
        </div>
      </div>
      {/* Timeline visual */}
      <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'28px'}}>
        <Eyebrow>Seed Dependency Timeline · 2026–2031</Eyebrow>
        <div style={{display:'flex',gap:'0',marginTop:'14px',overflowX:'auto'}} className="chain-scroll">
          {[
            {yr:'2026',ev:'Licences Open',sub:'100% imported seed. All cultivators dependent on EU/Canada supply with phytosanitary delays.',col:C.muted},
            {yr:'2027',ev:'Adaptive Trials',sub:'First domestic seed trials at CSIR/KNUST. Variety performance data vs. imported genetics.',col:C.amber},
            {yr:'2028',ev:'Seed Multiplication',sub:'Contract multiplication of proven EU varieties under Licence 03. First domestic certified supply.',col:C.forest},
            {yr:'2029',ev:'Variety Pipeline',sub:'Ghana-adapted candidates entering multi-location trials. PVP applications filed.',col:C.forest},
            {yr:'2030+',ev:'Domestic Market',sub:'First Ghana-bred certified varieties available. ECOWAS regional export begins.',col:C.lime},
          ].map((e,i) => (
            <div key={i} style={{flexShrink:0,width:'170px',borderLeft:`3px solid ${e.col}`,paddingLeft:'12px',paddingRight:'8px'}}>
              <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:e.col,marginBottom:'4px'}}>{e.yr}</div>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,lineHeight:1.3,marginBottom:'4px'}}>{e.ev}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{e.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 02 — THE CULTIVATION THESIS
// ─────────────────────────────────────────────────────────────────────────────
const Thesis = () => (
  <div id="s02" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 02" title="The Thesis" stat="100%" label="Seed Currently Imported">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 02</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>The Breeding & Seed Thesis</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>The Entire Industry Runs on Seed — and Ghana Has None of Its Own (Yet)</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
        <div>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            Breeding and seed production (Licence 03) is the most upstream position in Ghana's hemp value chain. It is also, currently, the most structurally absent. Every cultivation licence holder planting hemp in 2026 and beyond must source certified, THC-stable seed. That seed comes from European or Canadian varieties at €450–900 per kilogram, cleared through phytosanitary controls, converted from hard currency, and delivered with no performance guarantee under Ghanaian tropical conditions.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The global hemp seed market was valued at approximately $6 billion in 2022 and is projected to reach nearly $10.9 billion by 2030 at an 8.8% CAGR. Certified planting seed is a meaningful portion of that market — increasingly in demand as new cultivation regimes open across Africa, Asia, and Latin America. Hemp varieties that will perform reliably in Ghana's climate do not yet exist in certified form. The breeders who develop them will define the genetics of West Africa's hemp sector for a generation.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Ghana's PVP Act 2020 creates the royalty framework. CSIR's Crops Research Institute and KNUST's agricultural faculty provide the institutional base. The four agro-ecological zones — forest, transition, guinea savannah, sudan savannah — are the multi-location trial network already in place. This is a long-horizon play, not a fast-cash opportunity. The BRIDGE score of 64 reflects that honestly. But the operator who builds Ghana's first compliant breeding and seed programme will underpin the entire national hemp economy.
          </p>
        </div>
        <div>
          <PullQuote>
            You cannot build a hemp industry without seeds. Ghana is about to build a hemp industry. The breeder who delivers the first certified, tropical-adapted, THC-stable Ghanaian variety will own the genetics layer of that industry — permanently.
          </PullQuote>
          <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'20px',marginTop:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Hemp Seed Market Growth — Global Trajectory (USD Billions)</div>
            <svg viewBox="0 0 340 140" style={{width:'100%',display:'block'}}>
              {[
                {yr:'2022',v:42,val:'$6.0B'},
                {yr:'2024',v:50,val:'$7.1B'},
                {yr:'2026',v:60,val:'$8.4B'},
                {yr:'2028',v:72,val:'$9.4B'},
                {yr:'2030',v:87,val:'$10.9B'},
              ].map((d,i) => (
                <g key={i}>
                  <rect x={14+i*63} y={140-d.v-20} width={44} height={d.v} fill={i===4?C.lime:i>=3?C.limeDark:C.border}/>
                  <text x={36+i*63} y={135} textAnchor="middle" style={{fontFamily:'DM Sans,sans-serif',fontSize:'8px',fill:C.muted}}>{d.yr}</text>
                  <text x={36+i*63} y={140-d.v-25} textAnchor="middle" style={{fontFamily:'DM Mono,monospace',fontSize:'8px',fontWeight:700,fill:i>=3?C.forest:C.muted}}>{d.val}</text>
                </g>
              ))}
              <text x={10} y={12} style={{fontFamily:'DM Sans,sans-serif',fontSize:'9px',fill:C.faint}}>USD Billions — Hemp Seed Market (CAGR 8.8%)</text>
            </svg>
            <div style={{marginTop:'8px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
              {[{c:C.border,l:'Historical'},{c:C.limeDark,l:'Projected'},{c:C.lime,l:'2030 target'}].map((s,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'5px'}}>
                  <div style={{width:'10px',height:'10px',background:s.c,flexShrink:0}}/>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.muted}}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 4 demand drivers */}
      <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'28px'}}>
        <Eyebrow>Four Structural Demand Drivers for Certified Hemp Seed</Eyebrow>
        {/* Desktop grid */}
        <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0',marginTop:'14px'}}>
          {[
            {n:'New Cultivation Licences',d:'Every Licence 01 holder planting hemp must source certified, NCC-compliant seed. As the sector scales from tens to thousands of hectares, seed demand grows proportionally.'},
            {n:'Tropical Performance Deficit',d:'EU and Canadian varieties underperform in Ghana\'s climate — photoperiod mismatch, heat stress, humidity. Tropical-adapted varieties command premium pricing and captive demand.'},
            {n:'THC Stability Requirement',d:'Imported varieties may exceed 0.3% THC under Ghana\'s conditions, triggering crop destruction. Certified, tropical-tested THC-stable seed eliminates the sector\'s largest agronomic risk.'},
            {n:'ECOWAS Regional Market',d:'As neighbouring West African nations follow Ghana\'s licensing model, regional demand for certified hemp seed multiplies. Ghana can become the seed supply hub for West Africa.'},
          ].map((d,i) => (
            <div key={i} style={{padding:'16px',borderRight:i<3?`1px solid ${C.border}`:'none',borderTop:'none'}}>
              <div style={{width:'28px',height:'3px',background:C.lime,marginBottom:'10px'}}/>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'8px',lineHeight:1.3}}>{d.n}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',fontWeight:300,color:C.muted,lineHeight:1.6}}>{d.d}</p>
            </div>
          ))}
        </div>
        {/* Mobile swipe carousel */}
        <MobCarousel items={[
          {n:'New Cultivation Licences',icon:'🌱',d:'Every Licence 01 holder must source certified seed. As the sector scales, seed demand grows proportionally.'},
          {n:'Tropical Performance Deficit',icon:'🌡️',d:'EU/Canadian varieties underperform in Ghana\'s climate. Tropical-adapted certified seed commands premium pricing.'},
          {n:'THC Stability Requirement',icon:'🔬',d:'Imported varieties can exceed 0.3% THC in Ghana\'s conditions. Tropical-tested seed eliminates crop destruction risk.'},
          {n:'ECOWAS Regional Market',icon:'🌍',d:'As West African nations follow Ghana\'s licensing model, regional seed demand multiplies across 15 ECOWAS countries.'},
        ]} renderCard={(d,i) => (
          <div style={{background:C.paperDark,padding:'20px',height:'100%',minHeight:'160px'}}>
            <div style={{fontSize:'28px',marginBottom:'12px'}}>{d.icon}</div>
            <div style={{width:'24px',height:'3px',background:C.lime,marginBottom:'10px'}}/>
            <div style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:C.ink,marginBottom:'10px',lineHeight:1.3}}>{d.n}</div>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:C.muted,lineHeight:1.65}}>{d.d}</p>
          </div>
        )}/>
      </div>
    </MobileCollapse>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 03 — GHANA AGRO-ECOLOGICAL FIT
// ─────────────────────────────────────────────────────────────────────────────
const GhanaFit = () => (
  <div id="s03" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 03" title="Ghana Fit" stat="4 Zones" label="Breeding Trial Network">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 03</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Ghana Agro-Ecological &amp; Research Fit</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'700px'}}>Ghana Has the Zones, the Institutions, and the IP Framework — But Not the Varieties</h2>
      <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'32px',maxWidth:'700px'}}>
        A hemp breeding programme needs three things: diverse agro-ecological trial zones, institutional research capacity, and an IP framework that rewards successful breeders. Ghana has all three. What it lacks is a commercially structured operation to activate them under the new NCC licensing regime.
      </p>
      {/* Desktop zone grid */}
      <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}}>
        {[
          {
            zone:'Volta Region — CSIR Anchor',tier:'PRIMARY TRIAL ZONE',color:C.lime,
            institution:'CSIR Crops Research Institute (CRI) — Kade and Fumesua stations',
            climate:'1,200–1,800mm bimodal · semi-deciduous forest zone',
            trialValue:'Highest-potential hemp agro-ecology per published academic mapping. Already identified for hemp agronomy in Ghana-specific studies.',
            advantage:'Existing CSIR field stations with infrastructure, trained staff, and multi-crop trial experience across Ghana. CRI has active MPhil plant breeding programme.',
            note:'Distance to Tema port: ~200km — viable for seed logistics',
          },
          {
            zone:'Ashanti — KNUST University Hub',tier:'HIGH FIT',color:C.lime,
            institution:'KNUST Faculty of Agriculture, Kumasi — crop science and biotechnology',
            climate:'1,200–1,500mm bimodal · moist semi-deciduous',
            trialValue:'Central Ghana location enables genotype × environment testing across Ashanti and Bono zones. KNUST has molecular labs for marker-assisted selection.',
            advantage:'KNUST graduates ~200 agricultural scientists per year — the deepest breeding talent pipeline in Ghana. Faculty research partnership model is well-established.',
            note:'University-private sector agreements increasingly standard in Ghana',
          },
          {
            zone:'Northern Savannah — Adaptive Trials',tier:'MEDIUM-HIGH FIT',color:C.limeDark,
            institution:'CSIR-SARI (Savannah Agricultural Research Institute), Nyankpala',
            climate:'800–1,100mm unimodal · guinea and sudan savannah',
            trialValue:'Testing drought tolerance, heat stress adaptation, and performance under irrigation. Key for fibre-hemp varieties targeting large-scale northern cultivation.',
            advantage:'CSIR-SARI has decade-long experience in heat- and drought-tolerant crop development. Existing multi-location trial network across Northern, Upper East, Upper West.',
            note:'Existing irrigation schemes: Tono, Bontanga — reduce trial water risk',
          },
          {
            zone:'Coastal & Forest Zone — Baseline',tier:'EMERGING',color:C.amber,
            institution:'University of Ghana, Department of Plant and Soil Sciences, Legon',
            climate:'1,500–2,000mm · high humidity · evergreen',
            trialValue:'Characterising baseline hemp performance in high-humidity tropical environment. Identifies disease and fungal pressure that inland varieties must resist.',
            advantage:'UG Legon is the oldest and best-resourced university in Ghana. National Herbarium and Botanic Garden provide germplasm characterisation support.',
            note:'Higher disease pressure makes this zone a stress-testing location, not primary production',
          },
        ].map((r,i) => (
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
              <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.ink,lineHeight:1.2,paddingRight:'12px'}}>{r.zone}</div>
              <div style={{background:r.color,color:r.color===C.amber?C.paper:C.ink,padding:'2px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0}}>{r.tier}</div>
            </div>
            <div style={{marginBottom:'10px'}}>
              {[{l:'Institution',v:r.institution},{l:'Climate',v:r.climate},{l:'Trial value',v:r.trialValue}].map((f,j) => (
                <div key={j} style={{display:'flex',gap:'8px',marginBottom:'5px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'68px',flexShrink:0,marginTop:'2px'}}>{f.l.toUpperCase()}</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5}}>{f.v}</span>
                </div>
              ))}
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px',marginTop:'8px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontWeight:300,color:C.ink,lineHeight:1.6,marginBottom:'6px'}}>{r.advantage}</p>
              <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{r.note}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile carousel */}
      <MobCarousel items={[
        {zone:'Volta — CSIR Anchor',tier:'PRIMARY',color:C.lime,institution:'CSIR-CRI Kade/Fumesua',climate:'1,200–1,800mm bimodal',trialValue:'Highest-potential hemp agro-ecology in Ghana per published studies',advantage:'CSIR field stations with infrastructure, staff, and active MPhil breeding programme.',note:'~200km to Tema port'},
        {zone:'Ashanti — KNUST Hub',tier:'HIGH FIT',color:C.lime,institution:'KNUST Faculty of Agriculture',climate:'1,200–1,500mm bimodal',trialValue:'Central location for G×E testing. Molecular labs for marker-assisted selection.',advantage:'KNUST graduates 200+ agricultural scientists/yr — deepest breeding talent pipeline in Ghana.',note:'University-private partnership model well-established'},
        {zone:'Northern Savannah',tier:'MEDIUM-HIGH',color:C.limeDark,institution:'CSIR-SARI Nyankpala',climate:'800–1,100mm unimodal',trialValue:'Drought and heat tolerance testing. Northern fibre-hemp adaptation.',advantage:'Decade of heat/drought-tolerant crop development. Tono and Bontanga irrigation.',note:'Multi-location trial network in place'},
        {zone:'Coastal & Forest Zone',tier:'EMERGING',color:C.amber,institution:'University of Ghana, Legon',climate:'1,500–2,000mm high humidity',trialValue:'High-humidity stress testing for disease and fungal resistance traits.',advantage:'UG Legon is Ghana\'s most resourced university. National Herbarium for germplasm support.',note:'Stress-testing zone, not primary production'},
      ]} renderCard={(r,i) => (
        <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px',height:'100%'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
            <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.ink,lineHeight:1.2}}>{r.zone}</div>
            <div style={{background:r.color,color:r.color===C.amber?C.paper:C.ink,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,marginLeft:'8px'}}>{r.tier}</div>
          </div>
          {[{l:'Institution',v:r.institution},{l:'Climate',v:r.climate},{l:'Trial Value',v:r.trialValue}].map((f,j) => (
            <div key={j} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'64px',flexShrink:0,paddingTop:'2px'}}>{f.l.toUpperCase()}</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.45}}>{f.v}</span>
            </div>
          ))}
          <div style={{borderTop:`2px solid ${r.color}`,paddingTop:'10px',marginTop:'12px'}}>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.6,color:C.ink,marginBottom:'6px'}}>{r.advantage}</p>
            <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{r.note}</p>
          </div>
        </div>
      )}/>
      {/* Breeding requirements strip */}
      <div style={{background:C.paperDark,padding:'24px',borderTop:`3px solid ${C.ink}`}}>
        <Eyebrow>Core Breeding Infrastructure Requirements vs. Ghana's Current Provision</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',marginTop:'14px'}} className="tc">
          {[
            {param:'Greenhouse / Growth Chambers',req:'Controlled crossing environment',ghana:'Available at CSIR-CRI and KNUST',fit:'★★★★☆'},
            {param:'Molecular Lab (PCR/HPLC)',req:'Marker-assisted selection, chemotyping',ghana:'KNUST, UG, CSIR — all have labs',fit:'★★★☆☆'},
            {param:'Multi-Location Trial Sites',req:'4+ agro-ecological zones',ghana:'4 zones: forest, transition, guinea, sudan',fit:'★★★★★'},
            {param:'Seed Storage (cold room)',req:'Controlled temp + humidity',ghana:'Available in research institutes',fit:'★★★★☆'},
            {param:'PVP / IP Framework',req:'Royalty and variety protection',ghana:'Ghana PVP Act 2020 (UPOV-aligned)',fit:'★★★☆☆'},
          ].map((p,i) => (
            <div key={i} style={{padding:'12px 14px',borderRight:i<4?`1px solid ${C.border}`:'none'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>{p.param}</div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>Required: {p.req}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,marginBottom:'4px'}}>Ghana: {p.ghana}</div>
              <div style={{color:C.lime,fontSize:'11px',letterSpacing:'1px'}}>{p.fit}</div>
            </div>
          ))}
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
);
// ─────────────────────────────────────────────────────────────────────────────
// SECTION 04 — BUSINESS MODELS
// ─────────────────────────────────────────────────────────────────────────────
const BusinessModels = () => {
  const [secOpen, setSecOpen] = useState(false);
  const [active, setActive] = useState(0);
  const models = [
    {
      n:'01',name:'Adaptive Trials Programme',tag:'LOWEST RISK ENTRY',color:C.teal,
      tagline:'Test existing varieties in Ghana\'s climate. Generate data before committing capital.',
      scale:'1–5 ha trial plots across 2–4 agro-ecological zones',
      capital:'$30K–100K (CSIR/KNUST partnership, grant-funded entry)',
      timeline:'2–3 years to generate publishable performance data',
      revenue:'Primarily grant and DFI funded; data has licensing value',
      fit:'★★★★★ Lowest-barrier, best first step for all breeding entrants',
      description:"The adaptive trials programme imports certified EU and Canadian hemp varieties under NCC Licence 03 and runs systematic field evaluations across Ghana's agro-ecological zones — measuring agronomic performance, THC stability, fibre yield, seed yield, and disease tolerance in Ghanaian conditions. The primary output is data: which varieties perform, which go hot, and which have the agronomic profile Ghana's cultivators need. This data has direct commercial value — it informs every subsequent NCC licence application for cultivation and positions the trials operator as the expert supplier in Ghana's seed market.",
      requirements:['NCC Breeding & Seed Licence (Licence 03)','Research partnership with CSIR-CRI, KNUST or University of Ghana','Import permits for certified EU/Canadian seed varieties','Trial protocols aligned with NCC and Ghana Standards Authority variety approval requirements','THC compliance monitoring at each trial site'],
      advantages:['Lowest capital requirement of any Licence 03 pathway','Grant and DFI funding available for climate-smart and agro-industrial research','Data generated positions the operator as the technical authority in Ghana\'s seed market','Partnership with public institutions reduces cost, adds credibility, and accelerates NCC relationships'],
      risks:['No direct revenue stream from trials — requires patient capital or grant funding','Trial data has commercial value only if IP is protected from day one','Climate variability between seasons can extend the timeline before definitive variety conclusions'],
      ideal:'Research-oriented investors, DFI-backed academic-commercial partnerships, and early-stage operators who want to build the knowledge base before committing to seed multiplication capital',
    },
    {
      n:'02',name:'Certified Seed Multiplier',tag:'NEAR-TERM COMMERCIAL',color:C.forest,
      tagline:'Multiply proven EU varieties under licence. Produce Ghana\'s first domestic certified seed.',
      scale:'5–50 ha seed multiplication plots across multiple zones',
      capital:'$80K–300K (contract multiplication for EU variety licence holders)',
      timeline:'2–3 years to first certified domestic seed sales',
      revenue:'$2K–8K per hectare equivalent from certified seed sales',
      fit:'★★★★☆ Fastest path to commercial seed revenue within Licence 03',
      description:"The certified seed multiplier model enters into variety licensing agreements with EU or Canadian seed companies and multiplies their certified hemp varieties in Ghana under NCC Licence 03. The output is domestic certified seed — the same genetics as the imported variety but produced locally, cheaper than import, with confirmed performance data from Ghana's conditions. This model does not require breeding expertise: it requires agronomy, seed production discipline, and clean seed-processing infrastructure. It is the fastest commercial path within Licence 03 and directly reduces Ghana's import dependency.",
      requirements:['NCC Breeding & Seed Licence (Licence 03)','Variety licensing agreement with EU or Canadian variety rights holder','Isolation distances maintained per NCC and variety protection requirements','Seed processing: cleaning, grading, drying, cold storage','Ghana Standards Authority seed certification inspection and documentation'],
      advantages:['Uses proven genetics — no varietal development risk','First domestic certified seed source eliminates import FX and phytosanitary delay for cultivators','Royalties paid to variety rights holder are manageable at 5–15% of sales revenue','Scales with cultivation sector growth — demand grows as more Licence 01 holders apply'],
      risks:['Dependent on variety licensor pricing and contract terms — no ownership of IP','Cultivation sector must reach minimum scale before seed multiplication volumes are economic','Isolation distance requirements restrict where multiplication plots can be located'],
      ideal:'Agro-commercial operators with field management experience, impact investors targeting import substitution, and companies already holding Licence 01 who want vertical integration upstream',
    },
    {
      n:'03',name:'Tropical Variety Developer',tag:'LONG-HORIZON IP VALUE',color:C.ink,
      tagline:'Breed Ghana-specific varieties. Own the genetics. Earn royalties for decades.',
      scale:'Multi-season breeding programme — 5–8 years to first commercial variety',
      capital:'$200K–800K (long-horizon; full breeding cycle and multi-location trials)',
      timeline:'5–8 years to first commercial variety release',
      revenue:'Royalty income from certified seed sales; $0.50–3.00/kg ongoing',
      fit:'★★★☆☆ Highest long-term value — requires patient, mission-aligned capital',
      description:"The tropical variety development programme creates Ghana-specific hemp varieties through systematic crossing, selection, and multi-location trials — targeting traits absent in available EU/Canadian varieties: tropical photoperiod adaptation, humidity and disease tolerance, THC stability under West African heat stress, and dual-purpose performance for Ghana's mixed fibre/seed production systems. Successful varieties are protected under Ghana's PVP Act 2020, and royalties are earned across every kilogram of certified seed sold from those varieties for up to 25 years. This is the highest-value model in Licence 03 — but it requires the deepest commitment of capital, time, and scientific expertise.",
      requirements:['NCC Breeding & Seed Licence (Licence 03)','Plant breeder or molecular geneticist with hemp or cannabis experience (or CSIR/KNUST academic partnership)','Multi-site breeding trial network across at least 3 agro-ecological zones','HPLC/GC chemotyping capability for THC and cannabinoid profiling','PVP application through Ghana Plant Variety Protection Office upon variety completion'],
      advantages:['Durable IP: successful varieties earn royalties for 20–25 years under Ghana\'s PVP framework','Tropical-adapted varieties become the preferred genetics for all cultivation licence holders — captive market','ECOWAS and AfCFTA regional export potential: same varieties applicable across West Africa','Defensible competitive moat — variety IP cannot be easily replicated by competitors'],
      risks:['5–8 year development cycle before commercial variety — significant patience of capital required','Breeding success is not guaranteed: genotype × environment interactions can invalidate candidate lines','Ghana\'s PVP enforcement infrastructure is still maturing — royalty collection requires commercial diligence'],
      ideal:'Long-term impact investors, agricultural development foundations, academic-commercial joint ventures, and operators with existing DFI relationships who can structure patient capital funding',
    },
    {
      n:'04',name:'Regional Seed Hub',tag:'HIGHEST SCALE',color:C.limeDark,
      tagline:'Ghana as the certified seed supplier for West Africa\'s emerging hemp sector.',
      scale:'500+ ha seed production across multiple zones; regional export',
      capital:'$500K–2M (full infrastructure, storage, seed lab, quality systems)',
      timeline:'5–10 years to regional market scale',
      revenue:'Regional seed sales $3M–10M+ annually at sector maturity',
      fit:'★★★☆☆ Maximum scale — the 10-year strategic prize',
      description:"The regional seed hub model positions Ghana as the certified hemp seed supply centre for ECOWAS and AfCFTA — producing and certifying domestic and licensed varieties for Ghanaian cultivators while exporting to Nigeria, Senegal, Ivory Coast, and other West African markets as they adopt hemp licensing. At scale, this operation holds multiple variety licences, operates a certified seed laboratory, maintains a controlled environment facility for pre-breeding, and serves as the technical reference point for hemp genetics in West Africa. This is where the adaptive trials programme and the variety development programme converge into a commercial platform.",
      requirements:['NCC Breeding & Seed Licence (Licence 03) with multiple sub-categories active','Certified seed laboratory: germination testing, purity analysis, moisture content','Cold storage: 500+ tonne capacity for seasonal seed banking','Variety portfolio: mix of licensed EU/Canadian varieties and proprietary Ghana-developed varieties','ECOWAS phytosanitary export certification for regional trade'],
      advantages:['First-mover position in regional hemp seed market is a structural moat — difficult to displace once certified','ECOWAS region: 350M+ people across 15 nations — hemp adoption curve will create massive seed demand','Combines seed royalties, multiplication revenues, lab services, and technical consulting into diversified income','Makes Ghana\'s hemp sector resilient: domestic seed supply reduces vulnerability of the entire value chain'],
      risks:['Requires the cultivation sector to develop first — a seed hub without cultivators is just a warehouse','Regional export requires phytosanitary certification processes for each ECOWAS country','Very high capital requirement — most appropriate as a 5–10 year strategic build, not Year 1 investment'],
      ideal:'Multinational agribusinesses, government-backed strategic investment vehicles, DFIs seeking to anchor Ghana\'s agricultural diversification, and consortia combining research institutions with commercial operators',
    },
  ];
  const m = models[active];
  return (
    <div id="s04" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <MobileCollapse num="§ 04" title="Business Models" stat="4 Models" label="$30K to $2M Entry">
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 04</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Business Models</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Four Routes into Ghana's Breeding & Seed Sector — from Trials to Regional Hub</h2>
        {/* Model tabs */}
        {/* Desktop tab row */}
        <div className="mob-hide" style={{display:'flex',gap:'4px',marginBottom:'24px',overflowX:'auto'}}>
          {models.map((mod,i) => (
            <button key={i} onClick={() => setActive(i)} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'0.8px',textTransform:'uppercase',padding:'8px 14px',border:`1px solid ${active===i?mod.color:C.border}`,background:active===i?mod.color:'transparent',color:active===i?(mod.color===C.limeDark?C.ink:C.paper):C.muted,cursor:'pointer',transition:'all 0.15s ease',whiteSpace:'nowrap',flexShrink:0}}>
              {mod.n} · {mod.name}
            </button>
          ))}
        </div>
        {/* Mobile tab row – larger touch targets */}
        <div className="mob-show" style={{display:'flex',marginBottom:'20px',overflowX:'auto',gap:'0'}}>
          {models.map((mod,i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',
              padding:'12px 14px',border:'none',borderBottom:`3px solid ${active===i?mod.color:'transparent'}`,
              background:'transparent',color:active===i?mod.color:C.faint,
              cursor:'pointer',transition:'all 0.15s ease',whiteSpace:'nowrap',flexShrink:0,
            }}>
              {mod.n}
            </button>
          ))}
        </div>
        {/* Active model */}
        <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'28px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'14px',marginBottom:'16px'}}>
            <div>
              <div style={{display:'flex',gap:'8px',marginBottom:'8px',flexWrap:'wrap'}}>
                <div style={{background:m.color,color:m.color===C.limeDark||m.color===C.lime?C.ink:C.paper,padding:'3px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase'}}>{m.tag}</div>
              </div>
              <h3 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,26px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'4px'}}>{m.name}</h3>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{m.tagline}</p>
            </div>
            <div style={{display:'flex',gap:'20px',flexShrink:0,flexWrap:'wrap'}}>
              {[{l:'Scale',v:m.scale},{l:'Capital',v:m.capital},{l:'Timeline',v:m.timeline}].map((s,i) => (
                <div key={i}>
                  <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'3px'}}>{s.l}</div>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'18px',marginBottom:'18px'}}>
            <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'12px'}}>{m.description}</p>
            <div style={{background:C.paperDark,borderLeft:`3px solid ${C.lime}`,padding:'10px 14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'8px'}}>
                <span style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.forest}}><strong>Revenue potential:</strong> {m.revenue}</span>
                <span style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted}}>{m.fit}</span>
              </div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'20px'}} className="tc3">
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Requirements</div>
              {m.requirements.map((r,i) => (
                <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'6px 0',borderBottom:`1px solid ${C.border}`}}>
                  <span style={{color:C.forest,fontFamily:F.sans,fontSize:'11px',fontWeight:700,flexShrink:0,lineHeight:1.5}}>✓</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{r}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Advantages</div>
              {m.advantages.map((a,i) => (
                <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'6px 0',borderBottom:`1px solid ${C.border}`}}>
                  <span style={{color:C.lime,fontFamily:F.sans,fontSize:'11px',fontWeight:700,flexShrink:0,lineHeight:1.5}}>→</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{a}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Key Risks</div>
              {m.risks.map((r,i) => (
                <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'6px 0',borderBottom:`1px solid ${C.border}`}}>
                  <span style={{color:C.amber,fontFamily:F.sans,fontSize:'11px',fontWeight:700,flexShrink:0,lineHeight:1.5}}>⚠</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{r}</span>
                </div>
              ))}
              <div style={{marginTop:'14px',paddingTop:'12px',borderTop:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Best suited for</div>
                <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.forest,lineHeight:1.6}}>{m.ideal}</p>
              </div>
            </div>
          </div>
        </div>
        </MobileCollapse>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 05 — UNIT ECONOMICS
// ─────────────────────────────────────────────────────────────────────────────
const UnitEconomics = () => (
  <div id="s05" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 05" title="Unit Economics" stat="€450–900" label="Import Seed Price/kg">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 05</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Unit Economics</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'680px'}}>What Certified Seed and Variety Royalties Are Worth in Ghana</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'36px',maxWidth:'700px'}}>
        Hemp seed economics operate on two levels: the price of certified planting seed per kilogram, and the royalty revenue a variety developer earns per kilogram sold. Both are significantly more valuable than raw agricultural commodity economics — because certified genetics are a regulated input, not a freely available commodity.
      </p>
      {/* Revenue scenarios chart */}
      <div style={{background:C.paperDark,padding:'28px',marginBottom:'32px'}}>
        <Eyebrow>Seed Revenue Scenarios · 4 Model Types (USD)</Eyebrow>
        <div style={{marginTop:'18px'}}>
          {[
            {label:'Adaptive Trials (grant-funded)',v:800,max:8000,note:'Primary output is data and positioning; seed sales secondary'},
            {label:'Certified Seed Multiplication',v:2500,max:8000,note:'Per-ha equivalent revenue from certified seed sales to cultivators'},
            {label:'Feminised / Specialised Seed',v:5500,max:8000,note:'CBD-optimised or tropical-adapted feminised varieties at premium'},
            {label:'Variety Royalty Stream (mature)',v:7500,max:8000,note:'Cumulative royalty on widespread certified variety — long-horizon'},
          ].map((s,i) => (
            <div key={i} style={{marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',flexWrap:'wrap',gap:'6px'}}>
                <div>
                  <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{s.label}</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,marginLeft:'10px'}}>{s.note}</span>
                </div>
                <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.forest}}>${s.v.toLocaleString()}</span>
              </div>
              <div style={{height:'16px',background:C.border,position:'relative'}}>
                <div style={{position:'absolute',left:0,top:0,height:'100%',width:`${(s.v/s.max)*100}%`,background:i===3?C.lime:i===2?C.limeDark:C.forest}}/>
              </div>
            </div>
          ))}
          <div style={{marginTop:'10px',display:'flex',gap:'6px',alignItems:'center'}}>
            <div style={{width:'10px',height:'10px',background:C.lime}}/>
            <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>Values are indicative revenue/ha equivalent. Seed multiplication at 5–20 ha per operator. Royalty streams compound over time as variety adoption grows.</span>
          </div>
        </div>
      </div>
      {/* Cost structure + pricing benchmarks */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Seed Pricing Benchmarks (Global Reference)</div>
          {[
            {item:'EU certified industrial hemp seed',range:'€450–900/kg',pct:'Import baseline',note:'THC-stable certified varieties — current Ghana import price'},
            {item:'US non-feminised CBD hemp seed',range:'$200–800/lb',pct:'~$450–1,800/kg',note:'North American bulk certified seed pricing'},
            {item:'Feminised CBD / CBG hemp seed',range:'$0.30–5.00/seed',pct:'High-value',note:'Specialised seed — premium pricing for guaranteed female plants'},
            {item:'Domestic certified seed (Ghana target)',range:'€250–500/kg',pct:'Import savings 30–50%',note:'Projected domestic price once multiplication is established'},
            {item:'Variety royalty rate',range:'5–15% of seed sale price',pct:'Recurring',note:'Paid to variety IP holder per kg of certified seed sold'},
            {item:'Breeder seed premium',range:'2–5× certified price',pct:'Very limited supply',note:'Foundation/breeder seed commands highest per-kg value'},
          ].map((r,i) => (
            <div key={i} className="mob-cost-row" style={{display:'grid',gridTemplateColumns:'1.4fr 0.7fr 0.5fr',gap:'8px',padding:'8px 0',borderBottom:`1px solid ${C.border}`,alignItems:'baseline'}}>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{r.item}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,marginTop:'1px'}}>{r.note}</div>
              </div>
              <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.range}</span>
              <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted,textAlign:'right'}}>{r.pct}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Programme Cost & Breakeven</div>
          <div style={{background:C.ink,padding:'20px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Operating Cost Profile (Seed Multiplication)</div>
            {[
              {scale:'Land and field operations', capex:'$40–120/ha/season', note:'Lower than cultivation — seed plots are smaller and intensive'},
              {scale:'Isolation compliance', capex:'$10–30/ha', note:'Buffer zones, rouging, documentation — critical for certification'},
              {scale:'Seed cleaning and processing', capex:'$0.05–0.20/kg seed', note:'Mechanical cleaning, grading, moisture testing'},
              {scale:'Certification fees (GSA)', capex:'$500–2,000/lot', note:'Ghana Standards Authority field inspection and lab fees'},
            ].map((r,i) => (
              <div key={i} style={{padding:'10px 0',borderBottom:i<3?`1px solid rgba(255,255,255,0.07)`:'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'2px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper}}>{r.scale}</span>
                  <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.lime}}>{r.capex}</span>
                </div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.38)'}}>{r.note}</div>
              </div>
            ))}
          </div>
          <div style={{border:`1px solid ${C.border}`,padding:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Breakeven Analysis</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>A certified seed multiplication operation of 10–20 ha achieving €400/kg seed price and 100–200 kg/ha yield generates <strong>$400K–1.6M in seed revenue</strong> per season — against operating costs of $50K–150K. Margins are strong once variety licensing and certification are in place.</p>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>Variety royalty streams are purely incremental: once the variety is released and licensed, each kilogram of certified seed sold generates royalty income with no additional capital deployed.</p>
            <div style={{borderLeft:`2px solid ${C.amber}`,paddingLeft:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.amber,lineHeight:1.6}}>⚠ Seed multiplication economics only work at scale with confirmed cultivator demand. Seed that is not sold is a sunk cost. Secure multiplication contracts before planting.</p>
            </div>
          </div>
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 06 — VALUE CHAIN POSITION
// ─────────────────────────────────────────────────────────────────────────────
const ValueChainPosition = () => {
  const [chainActive, setChainActive] = useState(0);
  const chainRef = useRef(null);
  const chainItems = [
    {num:'03',name:'Breeding & Seed',pos:'UPSTREAM',color:C.lime,rel:null,active:true},
    {num:'08',name:'Import',pos:'TRADE',color:C.teal,rel:'BRIDGES GAP'},
    {num:'01',name:'Cultivation',pos:'UPSTREAM',color:C.forest,rel:'RECEIVES SEED'},
    {num:'05',name:'Testing Lab',pos:'ENABLING',color:C.limeDark,rel:'CERTIFIES'},
    {num:'06',name:'Storage',pos:'ENABLING',color:C.limeDark,rel:'STORES'},
    {num:'07',name:'Transport',pos:'ENABLING',color:C.limeDark,rel:'MOVES'},
    {num:'02',name:'Processing',pos:'MID-CHAIN',color:C.forest,rel:'PROCESSES'},
    {num:'10',name:'Wholesale',pos:'MID-CHAIN',color:C.forest,rel:'DISTRIBUTES'},
    {num:'09',name:'Export',pos:'TRADE',color:C.teal,rel:'EXPORTS'},
    {num:'11',name:'Dispensing',pos:'DOWNSTREAM',color:C.forest,rel:'DISPENSES'},
  ];
  const handleChainScroll = () => {
    if (!chainRef.current) return;
    const cardW = 96 + 8; // card width + gap
    const idx = Math.round(chainRef.current.scrollLeft / cardW);
    setChainActive(Math.max(0, Math.min(idx, chainItems.length - 1)));
  };
  const goToChain = (i) => {
    if (!chainRef.current) return;
    chainRef.current.scrollTo({left: i * (96 + 8), behavior:'smooth'});
    setChainActive(i);
  };
  return (
  <div id="s06" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 06" title="Value Chain" stat="11 of 11" label="Licences Need Seed">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 06</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Value Chain Position</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Root Node — Without Compliant Seed, Nothing in This Chain Starts</h2>
      {/* Chain visual */}
      <div className="chain-scroll" ref={chainRef} onScroll={handleChainScroll} style={{display:'flex',gap:'8px',marginBottom:'0',paddingTop:'24px'}}>
        {chainItems.map((c,i) => (
          <div key={i} style={{flexShrink:0,width:'96px',background:c.active?C.ink:C.paper,border:`${c.active?'2px':'1px'} solid ${c.active?C.lime:C.border}`,padding:'12px 10px',position:'relative'}}>
            {c.rel && !c.active && (
              <div style={{position:'absolute',top:'-16px',left:0,right:0,textAlign:'center',fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1px',color:C.faint,textTransform:'uppercase'}}>{c.rel} →</div>
            )}
            <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:c.active?C.lime:c.color,marginBottom:'5px'}}>{c.num}</div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:c.active?C.paper:C.ink,lineHeight:1.3,marginBottom:'6px'}}>{c.name}</div>
            <div style={{background:c.active?C.lime:c.color,color:c.active||c.color===C.limeDark?C.ink:C.paper,padding:'2px 5px',fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1px',display:'inline-block',textTransform:'uppercase'}}>{c.pos}</div>
          </div>
        ))}
      </div>
      {/* Chain scroll dots — mobile only */}
      <div className="mob-show" style={{display:'none',justifyContent:'center',gap:'5px',marginTop:'14px',marginBottom:'20px'}}>
        {chainItems.map((_,i) => (
          <div key={i} onClick={()=>goToChain(i)} style={{
            width:i===chainActive?'20px':'5px', height:'5px', borderRadius:'3px',
            background:i===chainActive?C.lime:`rgba(${i===chainActive?'184,217,53':'92,107,94'},0.25)`,
            cursor:'pointer', transition:'all 0.3s ease', flexShrink:0,
          }}/>
        ))}
      </div>
      <div style={{height:'8px',marginBottom:'20px'}} className="mob-hide"/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Breeding & Seed Receives</div>
          {[
            {lic:'Licence 08 — Import',role:'Bridges the seed gap until domestic supply is established. Imports certified EU/Canadian varieties on behalf of licence holders — the only current source.'},
            {lic:'Licence 04 — R&D',role:'Research data from field trials informs variety selection and breeding targets. Natural collaboration partner for adaptive trials programmes.'},
            {lic:'Licence 05 — Testing Lab',role:'Provides THC chemotyping and analytical testing for candidate varieties. Essential for variety certification and PVP application.'},
            {lic:'Govt. / DFI Funding',role:'Grant and concessional capital from MoFA, CSIR, DFIs supports adaptive trials and early-stage breeding where commercial returns are distant.'},
          ].map((r,i) => (
            <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'3px'}}>{r.lic}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6}}>{r.role}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Breeding & Seed Supplies</div>
          {[
            {lic:'Licence 01 — Cultivation',role:'The primary customer. Every cultivation licence holder needs certified, THC-stable seed. Domestic certified supply eliminates FX risk, phytosanitary delays, and tropical performance uncertainty.'},
            {lic:'Licence 02 — Processing',role:'Processors who integrate backwards into cultivation need seed supply. Processors also benefit from variety data that predicts fibre/seed yields for feedstock planning.'},
            {lic:'ECOWAS Regional Markets',role:'As neighbouring West African countries adopt hemp licensing, Ghana-bred tropical-adapted varieties become the logical seed supply for the entire region.'},
            {lic:'Licence 04 — R&D',role:'Breeding programmes generate germplasm, trial data, and variety candidates that feed R&D operations. Natural joint-venture territory between Licence 03 and 04 holders.'},
          ].map((r,i) => (
            <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.teal,marginBottom:'3px'}}>{r.lic}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6}}>{r.role}</p>
            </div>
          ))}
        </div>
      </div>
      </MobileCollapse>
    </div>
  </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 07 — COMPETITIVE LANDSCAPE
// ─────────────────────────────────────────────────────────────────────────────
const CompetitiveLandscape = () => (
  <div id="s07" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 07" title="Competition" stat="0" label="Domestic Seed Producers">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 07</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Competitive Landscape</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Ghana vs. Seven African Peers — Breeding Infrastructure &amp; Certified Seed Capacity</h2>
      {/* Desktop table */}
      <div className="mob-hide" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'680px'}}>
          <thead>
            <tr style={{background:C.ink}}>
              {['Country','Status','Domestic Seed Capacity','Research Institutions','PVP Framework','Port Access','BRIDGE View'].map((h,i) => (
                <th key={i} style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',textAlign:'left',borderRight:i<6?`1px solid rgba(255,255,255,0.05)`:'none'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {country:'🇬🇭 Ghana',status:'Active 2026',seed:'★☆☆☆☆ — Zero domestic',research:'★★★★★ CSIR-CRI, KNUST, UG',pvp:'★★★☆☆ PVP Act 2020',port:'★★★★★',view:'Zero incumbents — first mover defines the sector',hl:true},
              {country:'🇿🇦 South Africa',status:'Active 2023',seed:'★★★☆☆ — Emerging',research:'★★★★☆ ARC, Stellenbosch',pvp:'★★★★☆ Established',port:'★★★☆☆',view:'Most advanced African seed programme; already developing varieties'},
              {country:'🇱🇸 Lesotho',status:'Active 2017',seed:'★★☆☆☆ — Imported focus',research:'★★☆☆☆ Limited',pvp:'★★☆☆☆',port:'★☆☆☆☆',view:'Medicinal focus; imports EU genetics; landlocked'},
              {country:'🇲🇼 Malawi',status:'Active 2020',seed:'★☆☆☆☆ — Minimal',research:'★★☆☆☆ Bunda College',pvp:'★★☆☆☆',port:'★☆☆☆☆',view:'Early stage; weak IP framework; landlocked'},
              {country:'🇿🇼 Zimbabwe',status:'Active 2022',seed:'★★☆☆☆ — Limited trials',research:'★★★☆☆ UZ, ART',pvp:'★★☆☆☆',port:'★☆☆☆☆',view:'Medicinal focus; breeding nascent; landlocked'},
              {country:'🇰🇪 Kenya',status:'Emerging 2023',seed:'★★☆☆☆ — Building',research:'★★★☆☆ KARI, UoN',pvp:'★★★☆☆',port:'★★★☆☆',view:'East Africa competitor; reasonable research base'},
              {country:'🇿🇲 Zambia',status:'Emerging',seed:'★☆☆☆☆ — Pre-commercial',research:'★★☆☆☆',pvp:'★★☆☆☆',port:'★★☆☆☆',view:'Very early; seed programme does not exist'},
              {country:'🇲🇦 Morocco',status:'Recent 2021',seed:'★★☆☆☆ — Traditional landrace',research:'★★★☆☆ INRA',pvp:'★★★☆☆',port:'★★★★☆',view:'Traditional cannabis genetics; industrial hemp breeding late start'},
            ].map((r,i) => (
              <tr key={i} style={{background:r.hl?`rgba(184,217,53,0.07)`:i%2===0?C.paper:C.paperDark}}>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'12px',fontWeight:r.hl?700:400,color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.country}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{r.status}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:r.hl?C.forest:C.ink,fontWeight:r.hl?700:400,borderBottom:`1px solid ${C.border}`}}>{r.seed}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.research}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.pvp}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:r.hl?C.forest:C.ink,fontWeight:r.hl?700:400,borderBottom:`1px solid ${C.border}`}}>{r.port}</td>
                <td style={{padding:'10px 12px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:r.hl?C.forest:C.muted,borderBottom:`1px solid ${C.border}`}}>{r.view}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile country cards */}
      <MobCountryCards countries={[
        {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★☆☆☆☆ — Zero domestic seed',port:'★★★★★',labour:'★★★★★ CSIR, KNUST, UG',fw:'★★★☆☆ PVP Act 2020',sm:'Zero domestic incumbents',view:'Ghana has no domestic hemp seed production — and the best research institution network in West Africa. First mover builds on a blank canvas.',hl:true},
        {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★☆☆ — Emerging capacity',port:'★★★☆☆',labour:'★★★★☆ ARC, Stellenbosch',fw:'★★★★☆ Established PVP',sm:'Most advanced African hemp breeding programme',view:'SA has the most developed African seed programme; already building variety pipeline for southern conditions'},
        {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★☆☆☆ — Import-dependent',port:'★☆☆☆☆',labour:'★★☆☆☆',fw:'★★☆☆☆',sm:'Medicinal focus; imports EU genetics',view:'Landlocked; imports all genetics; not a seed development hub'},
        {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★☆☆☆☆ — Minimal',port:'★☆☆☆☆',labour:'★★☆☆☆ Bunda College',fw:'★★☆☆☆',sm:'Very early stage; weak IP',view:'Landlocked with weak framework; seed programme barely exists'},
        {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★☆☆☆ — Building',port:'★★★☆☆',labour:'★★★☆☆ KARI, UoN',fw:'★★★☆☆',sm:'East Africa competitor with port access',view:'Kenya has the research base and port — an emerging East Africa rival for tropical variety development'},
        {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ — Limited trials',port:'★☆☆☆☆',labour:'★★★☆☆ UZ, ART',fw:'★★☆☆☆',sm:'Medicinal focus; nascent',view:'Landlocked; medicinal focus; breeding programme is nascent'},
        {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★☆☆☆☆ — Pre-commercial',port:'★★☆☆☆',labour:'★★☆☆☆',fw:'★★☆☆☆',sm:'Does not exist yet',view:'Large land base; seed programme does not exist'},
        {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★☆☆☆ — Traditional landrace',port:'★★★★☆',labour:'★★★☆☆ INRA',fw:'★★★☆☆',sm:'Traditional cannabis genetics',view:'EU port proximity strong; but traditional cannabis genetics — industrial hemp breeding late start'},
      ]}/>
      <PullQuote>
        Ghana's research institution network — CSIR-CRI, KNUST, University of Ghana — is the deepest in West Africa. South Africa has a head start in breeding, but is developing temperate varieties. Ghana's unique advantage is the tropical agro-ecology it must serve, and the zero-incumbent domestic market it can capture first.
      </PullQuote>
      <div style={{background:C.paperDark,padding:'20px',marginTop:'8px'}}>
        <Eyebrow>Ghana's Structural Breeding Advantages</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',marginTop:'14px'}} className="tc3">
          {[
            {title:'Zero Domestic Competition',body:'Ghana has no licensed hemp breeders or certified seed producers as of March 2026. The entire domestic market is open. Every cultivator licence holder is a potential customer from Day 1 with no alternative domestic supplier.'},
            {title:'Institutional Research Depth',body:'CSIR-CRI runs the deepest multi-crop adaptive breeding network in Ghana. KNUST has molecular biology labs and a dedicated MPhil plant breeding programme. The infrastructure for a credible breeding programme already exists — it needs commercial activation.'},
            {title:'Tropical Climate Advantage',body:'Ghana\'s four distinct agro-ecological zones — from forest to sudan savannah — provide the exact trial diversity needed to develop broadly adapted tropical hemp varieties. EU and Canadian varieties bred for temperate conditions cannot replicate this.'},
          ].map((a,i) => (
            <div key={i} style={{padding:'16px',borderRight:i<2?`1px solid ${C.border}`:'none'}}>
              <div style={{width:'24px',height:'3px',background:C.lime,marginBottom:'10px'}}/>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'8px'}}>{a.title}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',fontWeight:300,color:C.muted,lineHeight:1.65}}>{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 08 — REGULATORY ROADMAP
// ─────────────────────────────────────────────────────────────────────────────
const RegulatoryRoadmap = () => (
  <div id="s08" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 08" title="Regulatory Roadmap" stat="5 Phases" label="to First Certified Sale">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 08</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Regulatory Roadmap</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>From Licence Application to Certified Seed Sale — the Compliance Journey</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px'}} className="tc mob-hide">
        <div>
          {[
            {phase:'Phase 1',label:'Licence Application & Institutional Setup (Months 1–4)',steps:['Submit NCC Breeding & Seed Licence (Licence 03) application — include trial site GPS coordinates, institutional partner details, and seed handling protocols','Establish formal research partnership agreement with CSIR-CRI, KNUST or University of Ghana','Identify seed variety portfolio for import: EU-certified varieties with tropical performance data preferred','Apply to Ghana Plant Variety Protection Office for awareness/pre-filing consultation on IP strategy','Set up seed storage: cold room or controlled humidity facility meeting NCC security conditions'],color:C.teal},
            {phase:'Phase 2',label:'Import & First Trials (Months 3–8)',steps:['Import certified seed under NCC Licence 03 import permit — phytosanitary certificate and ISTA testing report required','Establish trial plots across minimum 2 agro-ecological zones (Volta + Ashanti recommended for first trials)','Implement THC monitoring protocol from vegetative stage — NCC requires regular sampling','Register trial design with CSIR/KNUST co-investigators for rigorous multi-location data collection','Document all variety performance data: THC stability, agronomic traits, yield components, disease incidence'],color:C.forest},
            {phase:'Phase 3',label:'Variety Evaluation & NCC Approval (Months 8–24)',steps:['Multi-season, multi-location trial data required for NCC variety approval — minimum 2 seasons recommended','Submit variety performance dossier to NCC Cannabis Regulations Department with THC stability data across all trial sites','Engage Ghana Standards Authority for seed certification scheme guidelines — DUS (Distinct, Uniform, Stable) criteria','Apply for Plant Variety Protection at Ghana PVP Office once DUS criteria met — novel, distinct, uniform, stable','NCC variety approval grants licensed status for seed sales to Licence 01 cultivation holders'],color:C.limeDark},
            {phase:'Phase 4',label:'Certified Seed Production (Months 18–30)',steps:['Establish NCC-approved multiplication plots — isolation distances per variety certification requirements','Comply with Ghana Standards Authority seed certification: field inspection, purity standards, lab testing','Seed lot certification: germination rate ≥85%, genetic purity, moisture content, freedom from regulated pests','Implement seed cleaning, grading, and cold-storage operations meeting food/seed safety standards','Register as certified seed supplier with Ghana Seed Inspection Division under Ghana Standards Authority'],color:C.amber},
            {phase:'Phase 5',label:'Commercial Seed Sales & Royalty Activation (Months 24+)',steps:['Supply certified seed to NCC Licence 01 cultivation holders with phytosanitary documentation','Collect royalty payments on licensed variety seed sales — per-kg royalty per PVP licensing terms','File quarterly NCC reports: seed lots produced, distributed, THC testing records','Pursue regional ECOWAS phytosanitary export certification for Nigerian, Senegalese, Ivorian markets','Initiate next breeding cycle with field performance data from cultivator network'],color:C.lime},
          ].map((p,i) => (
            <div key={i} style={{borderLeft:`3px solid ${p.color}`,paddingLeft:'16px',marginBottom:'24px'}}>
              <div style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:p.color,letterSpacing:'1px',marginBottom:'2px'}}>{p.phase}</div>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'8px'}}>{p.label}</div>
              {p.steps.map((s,j) => (
                <div key={j} style={{display:'flex',gap:'8px',marginBottom:'4px'}}>
                  <span style={{color:p.color,fontFamily:F.mono,fontSize:'10px',flexShrink:0,marginTop:'2px'}}>→</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.55}}>{s}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <div style={{background:C.ink,padding:'22px',marginBottom:'20px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Ongoing Compliance Obligations</div>
            {[
              {item:'NCC licence renewal',detail:'Every 3 years — breeding sites, activities, and partners must be re-registered'},
              {item:'Annual seed production reports',detail:'Varieties produced, lots certified, sales by cultivator, THC test records'},
              {item:'Trial record keeping',detail:'All field trial data retained — NCC may audit variety performance claims'},
              {item:'PVP royalty accounting',detail:'Annual royalty statements to variety IP holders; NCC may require disclosure'},
              {item:'GSA seed certification renewal',detail:'Each seed lot certified annually; field inspections and lab testing required'},
              {item:'NCC import records',detail:'All imported seed documented — origin, phytosanitary cert, ISTA test report'},
              {item:'Adverse event reporting',detail:'THC exceedance in any certified batch triggers immediate NCC notification'},
            ].map((r,i) => (
              <div key={i} style={{padding:'8px 0',borderBottom:i<6?`1px solid rgba(255,255,255,0.07)`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,marginBottom:'2px'}}>{r.item}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.4)'}}>{r.detail}</div>
              </div>
            ))}
          </div>
          <div style={{border:`1px solid ${C.border}`,padding:'18px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Other Regulatory Touchpoints</div>
            {[
              {body:'Ghana Plant Variety Protection Office',role:'PVP application, DUS examination, granting of plant breeders rights — royalty enforcement foundation'},
              {body:'Ghana Standards Authority (GSA)',role:'Seed certification: DUS testing, field inspections, lab standards, certified seed label authorisation'},
              {body:'CSIR / MoFA Research Division',role:'Collaboration on variety trials, access to germplasm collections, extension services for cultivators'},
              {body:'Ghana Revenue Authority (GRA)',role:'Tax obligations on royalty income; import duties on trial seed and lab equipment'},
              {body:'ECOWAS Seed Harmonisation',role:'Regional seed trade: ECOWAS harmonised variety list and seed certification standards for export'},
            ].map((r,i) => (
              <div key={i} style={{padding:'7px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.body}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>{r.role}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.amber}`,paddingLeft:'14px',background:C.paper,padding:'14px 14px 14px 16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>PVP Framework — Still Maturing</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.65,color:C.ink}}>Ghana's PVP Act 2020 is the right framework but the implementing infrastructure — examination office, DUS testing protocols for hemp, royalty enforcement — is still being built. <strong>Protect variety IP through commercial licensing agreements with cultivators from Day 1, not only through PVP registration. Contract-based royalty structures are immediately enforceable while PVP administration matures.</strong></p>
          </div>
        </div>
      </div>
      <MobPhaseAccordion phases={[
        {phase:'Phase 1',label:'Licence Application & Setup (Months 1–4)',color:C.teal,steps:['Submit NCC Breeding & Seed Licence 03 application','Establish CSIR/KNUST/UG research partnership','Import certified EU/Canadian trial seed','Apply for PVP pre-filing consultation','Set up seed storage meeting NCC security conditions']},
        {phase:'Phase 2',label:'Import & First Trials (Months 3–8)',color:C.forest,steps:['Import certified seed under NCC Licence 03 import permit','Establish trial plots across 2+ agro-ecological zones','Implement THC monitoring protocol from vegetative stage','Register trial design with institutional co-investigators','Document all variety performance data systematically']},
        {phase:'Phase 3',label:'Variety Evaluation & NCC Approval (Months 8–24)',color:C.limeDark,steps:['Multi-season, multi-location trial data for NCC approval','Submit variety dossier with THC stability data to NCC','Engage Ghana Standards Authority for DUS criteria','Apply for Plant Variety Protection once DUS met','NCC variety approval grants licensed seed sale status']},
        {phase:'Phase 4',label:'Certified Seed Production (Months 18–30)',color:C.amber,steps:['Establish NCC-approved multiplication plots with isolation distances','Comply with GSA seed certification: field inspection, purity, lab testing','Seed lot certification: germination, purity, moisture standards','Implement seed cleaning, grading, cold-storage operations','Register as certified seed supplier with Ghana Seed Inspection Division']},
        {phase:'Phase 5',label:'Commercial Sales & Royalties (Months 24+)',color:C.lime,steps:['Supply certified seed to Licence 01 holders with documentation','Collect royalties on licensed variety seed sales','File quarterly NCC reports: lots produced, distributed, tested','Pursue ECOWAS export phytosanitary certification','Initiate next breeding cycle using cultivator field data']},
      ]}/>
    </MobileCollapse>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 09 — RISK REGISTER
// ─────────────────────────────────────────────────────────────────────────────
const RiskRegister = () => {
  const [openRisks, setOpenRisks] = useState({});
  const toggleRisk = (i) => setOpenRisks(prev => ({...prev, [i]: !prev[i]}));
  const risks = [
          {
            r:'Long development timeline — 5–8 years before commercial variety',
            sev:'HIGH',likelihood:'Certain (inherent to breeding)',cat:'Financial / Timeline',
            m:'Structure financing for the full 5–8 year horizon before committing. Identify grant and DFI funding to cover early-stage trial costs. Build milestone-based funding tranches — adaptive trials → seed multiplication → variety release — so capital is deployed progressively. Pursue a certified seed multiplication pathway in parallel with long-term breeding to generate early revenue.',
          },
          {
            r:'Breeding programme fails to produce superior varieties',
            sev:'HIGH',likelihood:'Medium (inherent scientific risk)',cat:'Technical',
            m:'Partner with experienced hemp breeders from EU or North American programmes — do not rely on in-house expertise alone for the first cycle. Focus first on adaptive selection from existing diverse germplasm rather than full hybridisation programmes. Target clear, measurable breeding objectives: THC stability, tropical photoperiod response, fibre yield. Accept that not all candidate lines will succeed.',
          },
          {
            r:'Ghana PVP enforcement too weak to protect royalty income',
            sev:'MEDIUM',likelihood:'Medium-High (framework is still maturing)',cat:'Legal / Financial',
            m:'Do not rely solely on PVP registration for royalty protection. Use commercial licensing agreements with cultivation licence holders that embed per-kg royalty obligations contractually from Day 1. Work with NCC to establish variety registration requirements for cultivation licence holders — creating an administrative mechanism for variety tracking independent of PVP enforcement.',
          },
          {
            r:'Cultivation sector grows too slowly — seed demand insufficient for viability',
            sev:'MEDIUM',likelihood:'Medium',cat:'Commercial',
            m:'Ghana\'s cultivation licence pipeline is real but early. Stress-test business model against low adoption scenarios. Prioritise the certified seed multiplication model (near-term revenue) over pure variety development (long-horizon) until cultivation sector volumes are visible. Explore ECOWAS regional market demand as an early revenue supplement to domestic Ghanaian sales.',
          },
          {
            r:'Competition from imported EU/Canadian varieties undermines domestic seed pricing',
            sev:'MEDIUM',likelihood:'Medium',cat:'Commercial',
            m:'Domestic certified seed advantage is not price alone — it is tropical performance, availability without FX/phytosanitary complexity, and technical support. Compete on performance data (THC stability in Ghanaian conditions, yield per ha) not price. Position Ghana-adapted varieties as superior to imports on the criteria that matter most to Ghanaian cultivators.',
          },
          {
            r:'Key institutional partner — CSIR, KNUST — lacks hemp-specific regulatory clearance',
            sev:'MEDIUM',likelihood:'Low-Medium',cat:'Operational / Regulatory',
            m:'Engage NCC early about the legal status of research activities within public institutions. Ensure CSIR or KNUST research partnership is structured under the NCC Breeding & Seed Licence — not as a separate unlicensed activity. Formalise research collaboration agreements that make regulatory responsibility explicit.',
          },
          {
            r:'Seed lot fails THC certification — entire lot destroyed or rejected',
            sev:'LOW-MEDIUM',likelihood:'Low (if variety selection is rigorous)',cat:'Operational',
            m:'Use only varieties with confirmed THC stability data across multiple environments. Implement pre-certification THC monitoring during seed multiplication plots. Maintain small backup multiplication plots as insurance against primary lot failure. Budget for one rejected lot in Year 1 financial model — even well-selected varieties can show THC elevation under stress.',
          },
          {
            r:'Capital access — patient multi-year funding difficult to secure commercially',
            sev:'LOW-MEDIUM',likelihood:'Medium',cat:'Financial',
            m:'Frame breeding investment as infrastructure, not short-term commercial deployment. Target DFI, climate-smart agriculture, and rural development funding streams where 5–10 year return horizons are acceptable. Structure the adaptive trials phase as a grant-funded programme that generates data justifying commercial capital in Phase 2 (seed multiplication). Blended public-private funding structures are the model.',
          },
  ];
  return (
  <div id="s09" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 09" title="Risk Register" stat="8 Risks" label="2 High · 4 Medium">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 09</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Risk Register</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Eight Material Risks — Severity, Likelihood, and Mitigation</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0'}} className="tc">
        {risks.map((r,i) => {
          const sevColor = r.sev==='HIGH'?C.red:r.sev==='MEDIUM'?C.amber:C.positive;
          const isOpen = openRisks[i];
          return (
            <div key={i} style={{borderBottom:`1px solid ${C.border}`,borderRight:i%2===0?`1px solid ${C.border}`:'none'}}>
              {/* Header — always visible, tap to expand on mobile */}
              <div onClick={()=>toggleRisk(i)} style={{padding:'14px 18px 12px',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'8px'}}>
                <div style={{flex:1}}>
                  <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'3px'}}>{r.cat}</div>
                  <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,lineHeight:1.3}}>{r.r}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'6px',flexShrink:0}}>
                  <div style={{background:sevColor,color:C.paper,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase'}}>{r.sev}</div>
                  <span className="mob-show" style={{display:'none',fontFamily:F.mono,fontSize:'11px',color:C.faint,transition:'transform 0.2s',transform:isOpen?'rotate(180deg)':'none'}}>↓</span>
                </div>
              </div>
              {/* Body — always visible desktop; tap-reveal on mobile */}
              <div className={`mob-risk-body${isOpen?' mob-risk-open':''}`} style={{padding:'0 18px 16px'}}>
                <div style={{display:'flex',gap:'6px',marginBottom:'8px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>Likelihood:</span>
                  <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.muted}}>{r.likelihood}</span>
                </div>
                <div style={{borderLeft:`2px solid ${sevColor}`,paddingLeft:'10px'}}>
                  <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>{r.m}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </MobileCollapse>
    </div>
  </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10 — BRIDGE IMPACT SCORE
// ─────────────────────────────────────────────────────────────────────────────
const BridgeScore = () => {
  const [openDim, setOpenDim] = useState(null);
  const dims = [
    {dim:'Market Opportunity',score:58,weight:'30%',rationale:"The certified seed market is real and growing — every cultivation licence holder is a buyer. But the market is supply-constrained by the cultivation sector's own early stage, and the global hemp seed market's 8.8% CAGR is slower than the processing and export segments. Score reflects the genuine opportunity bounded by sector maturity timing."},
    {dim:'Development Impact',score:72,weight:'30%',rationale:'Breeding and seed directly enables cultivation — which is the most employment-intensive sector. Every domestic certified variety developed reduces Ghana\'s FX and import dependency, builds national scientific capacity, and positions Ghana as a regional agricultural knowledge hub. Impact is multiplicative and long-horizon.'},
    {dim:'Implementation Feasibility',score:58,weight:'25%',rationale:'Feasibility is constrained by the 5–8 year development timeline, requirement for specialised scientific expertise, and the still-maturing PVP enforcement infrastructure. Seed multiplication (near-term model) is more feasible than variety development. Ghana\'s institutional research base (CSIR, KNUST) is a significant feasibility advantage over most African comparators.'},
    {dim:'Financial Sustainability',score:68,weight:'15%',rationale:'Mature royalty income from widely adopted varieties is highly sustainable — low marginal cost, long revenue tail. But reaching that stage requires patient capital and a 5–8 year horizon. Seed multiplication businesses are more immediately sustainable. The financial profile is bimodal: early-stage capital-intensive, mature-stage capital-light.'},
  ];
  return (
  <div id="s10" className="pad-section" style={{background:C.ink,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 10" title="BRIDGE Score™" stat="64/100" label="Emerging Tier · Upstream" onDark={true}>
      <div style={{borderTop:`6px solid ${C.paper}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 10</span>
        <Eyebrow light>BRIDGE Impact Score™</Eyebrow>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Breeding & Seed Scores 64/100 — High Strategic Value, Long Horizon, Patient Capital Required</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'40px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Composite Score</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(72px,12vw,120px)',fontWeight:500,color:C.lime,lineHeight:1}}>64</div>
            <div style={{fontFamily:F.mono,fontSize:'clamp(22px,4vw,36px)',fontWeight:300,color:'rgba(184,217,53,0.3)',lineHeight:1,marginBottom:'6px'}}>/100</div>
          </div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.28)',letterSpacing:'0.5px',marginBottom:'28px'}}>Emerging Tier · Upstream · NCC Licence 03</div>
          <ScoreBar label="Market Opportunity  ×30%" value={58} onDark/>
          <ScoreBar label="Development Impact  ×30%" value={72} onDark/>
          <ScoreBar label="Impl. Feasibility  ×25%" value={58} onDark/>
          <ScoreBar label="Financial Sustainability  ×15%" value={68} onDark/>
          <div style={{marginTop:'20px',borderTop:`1px solid rgba(255,255,255,0.08)`,paddingTop:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'10px'}}>Quick Parameters</div>
            {[{l:'Entry Barrier',v:'Very High'},{l:'Capital Intensity',v:'Medium (trials) to High (hub)'},{l:'Timeline to Revenue',v:'2–3 years (seed mult.) · 5–8 (varieties)'},{l:'Licence Tier',v:'Emerging · Upstream'}].map((p,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:i<3?`1px solid rgba(255,255,255,0.06)`:'none'}}>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>{p.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.paper}}>{p.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          {/* Desktop: full detail rows */}
          <div className="mob-hide">
            {dims.map((d,i) => (
              <div key={i} style={{padding:'16px',borderBottom:i<3?`1px solid rgba(255,255,255,0.08)`:'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'6px'}}>
                  <div>
                    <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>{d.dim}</span>
                    <span style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.28)',marginLeft:'8px'}}>Weight {d.weight}</span>
                  </div>
                  <span style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:C.lime}}>{d.score}</span>
                </div>
                <div style={{height:'3px',background:'rgba(255,255,255,0.08)',marginBottom:'10px'}}>
                  <div style={{height:'100%',width:`${d.score}%`,background:C.lime}}/>
                </div>
                <p style={{fontFamily:F.body,fontSize:'12px',fontWeight:300,color:'rgba(250,248,243,0.5)',lineHeight:1.65}}>{d.rationale}</p>
              </div>
            ))}
          </div>
          {/* Mobile: accordion — tap to reveal rationale */}
          <div className="mob-show" style={{display:'none'}}>
            {dims.map((d,i) => {
              const isOpen = openDim === i;
              return (
                <div key={i} className={isOpen ? 'mob-dim-open' : ''} style={{borderBottom:`1px solid rgba(255,255,255,0.08)`}}>
                  <button className="mob-dim-hdr" onClick={()=>setOpenDim(isOpen?null:i)}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
                        <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,textAlign:'left'}}>{d.dim}</span>
                        <div style={{display:'flex',alignItems:'center',gap:'10px',flexShrink:0,marginLeft:'12px'}}>
                          <span style={{fontFamily:F.mono,fontSize:'16px',fontWeight:700,color:C.lime}}>{d.score}</span>
                          <span style={{fontFamily:F.mono,fontSize:'12px',color:'rgba(250,248,243,0.3)',transition:'transform 0.2s',transform:isOpen?'rotate(180deg)':'none',display:'inline-block'}}>↓</span>
                        </div>
                      </div>
                      <div style={{height:'3px',background:'rgba(255,255,255,0.08)'}}>
                        <div style={{height:'100%',width:`${d.score}%`,background:C.lime}}/>
                      </div>
                    </div>
                  </button>
                  <div className="mob-dim-body" style={{paddingBottom:'14px',paddingTop:'6px'}}>
                    <p style={{fontFamily:F.body,fontSize:'12px',fontWeight:300,color:'rgba(250,248,243,0.5)',lineHeight:1.65}}>{d.rationale}</p>
                    <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'8px',color:'rgba(250,248,243,0.25)',letterSpacing:'1px'}}>WEIGHT {d.weight}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11 — DEPLOYMENT PARAMETERS
// ─────────────────────────────────────────────────────────────────────────────
const Deployment = () => {
  const [capExpanded, setCapExpanded] = useState(false);
  const capRows = [
    {cat:'NCC Breeding & Seed Licence',range:'$3K–10K',note:'Application + 3-year licence; confirm fee schedule with NCC Cannabis Dept.'},
    {cat:'Trial seed import & phytosanitary',range:'$10K–40K',note:'EU/Canadian certified seed for trials; import permits; ISTA testing reports'},
    {cat:'Trial site establishment',range:'$20K–80K',note:'Plot preparation across 2–4 agro-ecological zones; irrigation if needed'},
    {cat:'CSIR/KNUST research partnership',range:'$15K–60K/yr',note:'Collaboration fees, lab access, staff time — or in-kind institutional contribution'},
    {cat:'Molecular lab access (chemotyping)',range:'$10K–40K/yr',note:'HPLC/GC THC testing for varieties; can be outsourced to Licence 05 lab'},
    {cat:'Seed processing equipment',range:'$15K–80K',note:'Seed cleaner, grader, moisture meter, cold storage — basic multiplication setup'},
    {cat:'Ghana Standards Authority certification',range:'$2K–8K/lot',note:'Field inspection fees + lab testing per certified seed lot'},
    {cat:'PVP application filing',range:'$2K–8K',note:'Ghana PVP Office filing; legal support for IP documentation'},
    {cat:'Working capital (18 months)',range:'$30K–100K',note:'Salaries, consumables, field operations before first seed revenue'},
  ];
  const SHOW_FIRST = 4;
  return (
  <div id="s11" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 11" title="Deployment" stat="$30K+" label="Adaptive Trials Entry">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 11</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Deployment Parameters</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>What It Takes to Enter Ghana's Breeding & Seed Sector</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'28px',marginBottom:'32px'}} className="tc">
        {/* Capital deployment */}
        <div style={{background:C.forest,padding:'24px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Capital Deployment Guide</div>
          {capRows.map((r,i) => (
            <div key={i} className={i >= SHOW_FIRST ? (capExpanded ? '' : 'mob-cap-hidden') : ''}
              style={{padding:'8px 0',borderBottom:i<8?`1px solid rgba(255,255,255,0.07)`:'none'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'2px',gap:'8px'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper}}>{r.cat}</span>
                <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.lime,flexShrink:0}}>{r.range}</span>
              </div>
              <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.35)'}}>{r.note}</div>
            </div>
          ))}
          <button className="mob-show mob-toggle mob-toggle-hdr" onClick={()=>setCapExpanded(e=>!e)}
            style={{marginTop:'10px',paddingTop:'10px',borderTop:'1px solid rgba(255,255,255,0.1)',background:'transparent',border:'none',width:'100%',textAlign:'left',cursor:'pointer',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',display:'none',justifyContent:'space-between',alignItems:'center'}}>
            <span>{capExpanded ? 'Show less ↑' : `Show all ${capRows.length} cost items ↓`}</span>
          </button>
        </div>
        <div>
          {/* Team */}
          <div style={{border:`1px solid ${C.border}`,padding:'20px',marginBottom:'20px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Minimum Viable Team</div>
            {[
              {role:'Plant Breeder / Agronomist',spec:'Hemp or industrial crop breeding experience essential; CSIR/KNUST partnership can substitute in early stage'},
              {role:'NCC Compliance Officer',spec:'Regulatory documentation, variety trial records, NCC reporting and site inspection liaison'},
              {role:'Seed Production Technician',spec:'Seed cleaning, grading, moisture management, lot certification documentation'},
              {role:'Laboratory Analyst',spec:'THC and cannabinoid chemotyping; can be outsourced to Licence 05 lab initially'},
              {role:'Commercial Manager',spec:'Cultivator relationship management, seed sales, royalty collection, ECOWAS market development'},
            ].map((r,i) => (
              <div key={i} style={{padding:'8px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'2px'}}>{r.role}</div>
                <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted}}>{r.spec}</div>
              </div>
            ))}
          </div>
          {/* First mover */}
          <div style={{background:C.ink,padding:'20px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>First-Mover Window Analysis</div>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.7)',lineHeight:1.75,marginBottom:'12px'}}>
              Ghana currently has zero licensed hemp breeders and zero domestic certified seed production. The cultivation sector is opening in 2026 and every licence holder must import seed. The window to establish the first domestic certified seed supply — and the first Ghana-adapted variety pipeline — is open now, and will narrow as South African, Kenyan, and eventually European seed companies identify Ghana as an emerging market.
            </p>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.7)',lineHeight:1.75,marginBottom:'16px'}}>
              Breeding is a long-horizon play. But seed multiplication — supplying certified EU-variety seed domestically under Licence 03 — can generate revenue within 2–3 years while the long-term variety development programme runs in parallel. The operator who starts both tracks now arrives at domestic variety dominance before any competitor has completed a single breeding cycle.
            </p>
            {[
              {l:'Optimal adaptive trials start',v:'Now — 2026 planting season'},
              {l:'First certified seed sales (multiplication)',v:'2028–2029'},
              {l:'First Ghana-adapted variety release',v:'2030–2032'},
              {l:'Regional ECOWAS market entry',v:'2029 onwards'},
            ].map((p,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:i<3?`1px solid rgba(255,255,255,0.07)`:'none'}}>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>{p.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.paper}}>{p.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GATE — PARTNERSHIP & CONSULTATION UPSELL
// ─────────────────────────────────────────────────────────────────────────────
const Gate = () => {
  const [activeTrack, setActiveTrack] = useState(null);

  const tracks = [
    {
      id:'discovery',
      label:'01 · ENTRY POINT',
      name:'Discovery Session',
      tagline:'90 minutes. One analyst. A clear path forward.',
      price:'By inquiry',
      priceNote:'Single engagement · No retainer required',
      color:C.teal,
      forWhom:'Investors and operators who have identified cultivation as an opportunity and want a structured, expert-guided evaluation of their specific situation before committing capital.',
      delivers:[
        'Structured 90-min strategy call with your BRIDGE sector analyst',
        'Pre-call briefing review — we study your background in advance',
        'Site and region assessment across the four cultivation zones',
        'Business model recommendation — cooperative, outgrower, commercial, or integrated',
        'Your 30-day action checklist to begin the NCC application process',
        'Post-call written summary with prioritised next steps',
      ],
      cta:'Request a Discovery Session',
    },
    {
      id:'deployment',
      label:'02 · CORE ENGAGEMENT',
      name:'Deployment Advisory',
      tagline:'We scope your venture, build your plan, connect you to the people.',
      price:'Custom pricing',
      priceNote:'Scoped per engagement · 60–90 day programme',
      color:C.lime,
      forWhom:'Serious operators ready to move from intelligence to execution. You have capital, intent and a general vision — BRIDGE provides the Ghana-specific architecture to deploy it with precision.',
      delivers:[
        'Full venture scoping: scale, region, model, capital structure, team',
        'NCC application support — documentation, compliance checklist, submission',
        'Processor partner matching — introductions to Licence 02 holders',
        'Seed supplier connections — verified EU/Canadian certified-variety vendors',
        'Financing navigation — DFI, agrifinance and blended-capital pathways',
        'Custom 5-year financial model built for your specific parameters',
        'Legal coordination — Ghana-based counsel with NCC licence experience',
        'On-call analyst access throughout the engagement',
      ],
      cta:'Enquire About Deployment Advisory',
    },
    {
      id:'partnership',
      label:'03 · STRATEGIC PARTNERSHIP',
      name:'Strategic Partnership',
      tagline:'Retained. Responsive. Invested in your outcome.',
      price:'Retained engagement',
      priceNote:'Custom structure · Quarterly or annual · Co-investment available',
      color:C.limeDark,
      forWhom:'Institutions, funds, family offices and multinational agribusinesses deploying material capital into Ghana\'s cannabis economy — and any operator for whom speed-to-market and relationship capital is the primary competitive advantage.',
      delivers:[
        'Retained monthly analyst access — BRIDGE on your team',
        'Cross-licence strategy: cultivation + processing + export integrated',
        'Government and regulatory interface — NCC, MoFA, EPA liaison',
        'Ecosystem positioning: cooperatives, community engagement, land access',
        'Quarterly intelligence briefings tailored to your portfolio',
        'Investor reporting support — impact metrics, BRIDGE Score™ updates',
        'Co-investment consideration for qualifying ventures',
        'Priority access to BRIDGE deal flow and partner network',
      ],
      cta:'Schedule a Partnership Conversation',
    },
  ];

  const active = tracks.find(t => t.id === activeTrack);

  return (
    <div style={{background:C.ink,position:'relative',overflow:'hidden'}}>

      {/* Watermark */}
      <div style={{position:'absolute',right:'-30px',top:'-20px',fontFamily:F.display,fontSize:'clamp(160px,30vw,400px)',fontWeight:900,color:'rgba(255,255,255,0.018)',pointerEvents:'none',userSelect:'none',letterSpacing:'-12px',lineHeight:1}}>BRIDGE</div>

      {/* Top proof strip */}
      <div style={{borderBottom:`1px solid rgba(255,255,255,0.07)`,padding:'18px 64px'}} className="pad-gate">
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime}}>BRIDGE PBC · STRATEGIC ENGAGEMENT</div>
          <div style={{display:'flex',gap:'28px',flexWrap:'wrap'}}>
            {[
              {v:'174+',l:'Ventures Assessed'},
              {v:'12',l:'Sectors Covered'},
              {v:'11',l:'Cannabis Licences'},
              {v:'Ghana-First',l:'Operating Principle'},
            ].map((s,i) => (
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.lime,lineHeight:1}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(250,248,243,0.25)',marginTop:'3px'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Headline + Tracks — single unified zone */}
      <div className="pad-gate" style={{padding:'44px 64px 48px',position:'relative'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>

          {/* Compact headline row */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'20px',marginBottom:'32px'}}>
            <div style={{maxWidth:'580px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>MOVE FROM INTELLIGENCE TO EXECUTION</div>
              <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,36px)',fontWeight:900,color:C.paper,lineHeight:1.12,marginBottom:'12px'}}>
                You now know more about Ghana's cultivation sector than{' '}
                <span style={{color:C.lime,fontStyle:'italic'}}>99% of your potential competitors.</span>
              </h2>
              <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.5)',lineHeight:1.75,maxWidth:'520px'}}>
                The brief is your foundation. The operators who win in Ghana's hemp economy will be the ones who moved first — with the right structure and the right people.
              </p>
            </div>
            <div style={{flexShrink:0,display:'flex',flexDirection:'column',gap:'6px',alignItems:'flex-end'}} className="mob-hide">
              <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.25)',letterSpacing:'0.5px'}}>First-mover window</div>
              <div style={{fontFamily:F.display,fontSize:'28px',fontWeight:900,color:C.lime,lineHeight:1}}>12–24</div>
              <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.25)',letterSpacing:'0.5px'}}>months remaining</div>
            </div>
          </div>

          {/* Engagement tracks */}
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.25)',marginBottom:'14px'}}>Three Ways to Engage</div>

          {/* Track selector tabs */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',marginBottom:'0'}} className="tc">
            {tracks.map((t,i) => {
              const isActive = activeTrack === t.id;
              const ctaBg = t.color===C.lime||t.color===C.limeDark ? t.color : 'transparent';
              const ctaText = t.color===C.lime||t.color===C.limeDark ? C.ink : t.color;
              const ctaBorder = t.color===C.lime||t.color===C.limeDark ? 'none' : `1px solid ${t.color}`;
              return (
                <div key={i} style={{display:'flex',flexDirection:'column'}}>
                  {/* Tab header — always visible, tap to open */}
                  <div
                    onClick={() => setActiveTrack(isActive ? null : t.id)}
                    style={{
                      padding:'16px 18px',
                      border:`1px solid ${isActive ? t.color : 'rgba(255,255,255,0.09)'}`,
                      borderBottom: isActive ? 'none' : `1px solid ${isActive ? t.color : 'rgba(255,255,255,0.09)'}`,
                      background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                      cursor:'pointer',
                      transition:'all 0.2s ease',
                    }}
                  >
                    <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:t.color,marginBottom:'6px'}}>{t.label}</div>
                    <div style={{fontFamily:F.display,fontSize:'clamp(13px,1.4vw,17px)',fontWeight:700,color:C.paper,lineHeight:1.25,marginBottom:'5px'}}>{t.name}</div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'8px'}}>
                      <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:t.color}}>{t.price}</div>
                      <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.22)',transition:'transform 0.2s',transform:isActive?'rotate(180deg)':'none',display:'inline-block'}}>↓</div>
                    </div>
                  </div>

                  {/* Expanded panel — open state */}
                  {isActive && (
                    <div style={{border:`1px solid ${t.color}`,borderTop:'none',background:'rgba(255,255,255,0.03)',padding:'18px'}}>
                      <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.6,marginBottom:'14px'}}>{t.tagline}</p>
                      <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.28)',marginBottom:'8px'}}>What You Receive</div>
                      {t.delivers.map((d,j) => (
                        <div key={j} style={{display:'flex',gap:'8px',padding:'5px 0',borderBottom:j<t.delivers.length-1?`1px solid rgba(255,255,255,0.05)`:'none'}}>
                          <span style={{color:t.color,fontFamily:F.sans,fontSize:'10px',flexShrink:0,lineHeight:1.5,marginTop:'1px'}}>→</span>
                          <span style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.55)',lineHeight:1.55}}>{d}</span>
                        </div>
                      ))}
                      <div style={{marginTop:'16px',display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap'}}>
                        <a href="#" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:ctaBg,border:ctaBorder,color:ctaText,padding:'11px 18px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,textDecoration:'none',letterSpacing:'0.3px',flexShrink:0}}>
                          {t.cta} <span style={{fontSize:'13px',fontWeight:900}}>→</span>
                        </a>
                        <div style={{fontFamily:F.sans,fontSize:'8px',fontStyle:'italic',color:'rgba(250,248,243,0.2)',lineHeight:1.5}}>{t.priceNote}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Closing reassurance — always visible, minimal */}
          <div style={{marginTop:'24px',paddingTop:'20px',borderTop:`1px solid rgba(255,255,255,0.06)`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
            <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.22)',lineHeight:1.6,maxWidth:'480px'}}>
              BRIDGE accepts a limited number of new engagements per quarter. Inquiries reviewed within 48 hours. No unsolicited follow-up — one response, no pressure.
            </p>
            {!activeTrack && (
              <a href="#" style={{display:'inline-flex',alignItems:'center',gap:'10px',background:C.lime,color:C.ink,padding:'12px 22px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none',letterSpacing:'0.2px',flexShrink:0}}>
                Request a Discovery Session <span style={{fontSize:'14px',fontWeight:900}}>→</span>
              </a>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
const Footer = () => (
  <div className="pad-footer" style={{background:C.forest,padding:'16px 64px',borderTop:`3px solid ${C.lime}`}}>
    <div className="footer-inner" style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
        <DocumentLogo height={22} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.15)'}}/>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.45)',letterSpacing:'0.3px'}}>Licence 03 of 11 · Ghana Cannabis Intelligence</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.2)',marginTop:'2px'}}>Members Brief · March 2026 · BRIDGE PBC</div>
        </div>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'20px',alignItems:'center'}}>
        {['All 11 Licences','Members','Engage BRIDGE','bridgepbc.com'].map((l,i) => (
          <a key={i} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:i===2?C.lime:'rgba(250,248,243,0.3)',textDecoration:'none',letterSpacing:'0.2px'}}>{l}</a>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function BreedingSeedBrief() {
  const coverLogoRef = useRef(null);
  return (
    <div style={{fontFamily:F.body,background:C.paper}}>
      <DocumentGlobalStyles/>
      <LicenceMobileNav sections={NAV_SECTIONS}/>
      <DocumentTopBar coverLogoRef={coverLogoRef} breadcrumb="Ghana Cannabis Intelligence · Licence 03 · Breeding & Seed · Members Brief" mobileBreadcrumb="03 · Breeding & Seed"/>
      <Cover logoRef={coverLogoRef}/>
      <TOC/>
      <WhyNow/>
      <Thesis/>
      <GhanaFit/>
      <BusinessModels/>
      <UnitEconomics/>
      <ValueChainPosition/>
      <CompetitiveLandscape/>
      <RegulatoryRoadmap/>
      <RiskRegister/>
      <BridgeScore/>
      <Deployment/>
      <Gate/>
      <div className="mob-show mob-nav-clearance" style={{display:'none',height:'72px'}}/>
      <Footer/>
    </div>
  );
}
