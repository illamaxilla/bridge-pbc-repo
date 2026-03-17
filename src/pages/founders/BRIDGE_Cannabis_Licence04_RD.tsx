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
    <div style={{position:'absolute',right:'-20px',top:'-30px',fontFamily:F.display,fontSize:'clamp(180px,35vw,480px)',fontWeight:900,color:'rgba(255,255,255,0.022)',pointerEvents:'none',userSelect:'none',letterSpacing:'-12px',lineHeight:1}}>04</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
      <div ref={logoRef} style={{marginBottom:'36px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <DocumentLogo height={30} variant="white"/>
        <div className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.22)',letterSpacing:'0.8px'}}>MARCH 2026 · NCC L.I. 2475</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
        <div style={{background:C.lime,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.ink}}>LICENCE 04 · SPECIALIST</div>
        <div style={{border:`1px solid ${C.lime}`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>EMERGING TIER</div>
        <div className="mob-hide" style={{border:`1px solid rgba(255,255,255,0.15)`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>MEMBERS INTELLIGENCE</div>
      </div>
      <h1 style={{fontFamily:F.display,fontSize:'clamp(30px,5.5vw,68px)',fontWeight:900,color:C.paper,lineHeight:1.08,marginBottom:'20px',maxWidth:'800px'}}>
        R&D<br/>
        <span style={{fontWeight:400,fontStyle:'italic',color:'rgba(250,248,243,0.55)',fontSize:'0.72em'}}>The Knowledge Infrastructure That Defines Ghana's Long-Term Competitive Position</span>
      </h1>
      <PullQuote onDark>
        Ghana has Noguchi Memorial Institute, the Centre for Plant Medicine Research, CSIR, KNUST, and the University of Ghana — research institutions that have conducted internationally published science on medicinal plants for decades. Cannabis R&D under Licence 04 does not start from zero. It starts from the most developed plant-medicine research base in West Africa.
      </PullQuote>
      <div style={{borderTop:`1px solid rgba(255,255,255,0.09)`,paddingTop:'28px',marginTop:'8px',display:'flex',flexWrap:'wrap'}} className="stats-row">
        {[
          {v:'60',      l:'BRIDGE Score™',        s:'Specialist · Knowledge-intensive · Long horizon'},
          {v:'$1.2B',   l:'Global Cannabis R&D',  s:'2024 industry + academic investment combined'},
          {v:'0',       l:'Licensed R&D Facilities',s:'First-mover field is completely empty in Ghana'},
          {v:'$50K–500K',l:'Grant/Contract Range', s:'DFI + pharma + academic funding pathways'},
          {v:'10yr',    l:'Strategic Value Horizon',s:'R&D positions Ghana IP ownership long-term'},
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
          {n:'01',t:'Why Now — The February 2026 Milestone',s:'What the licensing launch means for R&D actors and funders',id:'s01'},
          {n:'02',t:'The R&D Thesis',s:'Ghana has the institutions — it needs a licensed R&D framework',id:'s02'},
          {n:'03',t:'Ghana Research Institution Fit',s:'Noguchi, CSIR, KNUST, UG, Centre for Plant Medicine Research',id:'s03'},
          {n:'04',t:'Business Models',s:'4 structures — from university lab to CRO to proprietary IP',id:'s04'},
          {n:'05',t:'Unit Economics',s:'Grant, contract, and IP revenue — R&D financial profiles',id:'s05'},
          {n:'06',t:'Value Chain Position',s:"R&D's role — enabling every other licence with knowledge",id:'s06'},
          {n:'07',t:'Competitive Landscape',s:'Ghana vs. 7 African peers — research infrastructure comparison',id:'s07'},
          {n:'08',t:'Regulatory Roadmap',s:'NCC Licence 04, Ghana FDA clinical trials, ethics clearance',id:'s08'},
          {n:'09',t:'Risk Register',s:'Full matrix — 8 risks, severity, mitigations',id:'s09'},
          {n:'10',t:'BRIDGE Impact Score™',s:'4-dimension analysis, composite 60/100',id:'s10'},
          {n:'11',t:'Deployment Parameters',s:'Capital, team, timeline, long-horizon positioning',id:'s11'},
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
      <MobileCollapse num="§ 01" title="Why Now" stat="Feb 2026" label="R&D Window Open" defaultOpen={true}>
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 01</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Why Now</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'700px'}}>26 February 2026: Ghana Opens the Full Cannabis R&D Licensing Regime — Including Licence 04</h2>
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'48px'}} className="tc">
        <div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            On 26 February 2026, Ghana launched its national licensing regime for industrial and medicinal cannabis — all 11 licence categories simultaneously, including Licence 04: R&D. For Ghana's research institutions — Noguchi Memorial Institute, the Centre for Plant Medicine Research, CSIR, KNUST, the University of Ghana, and the University of Cape Coast — this is the moment that transforms decades of cannabis and medicinal-plant research into a commercially licensable activity.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The legal architecture is built for R&D. Act 1019 (2020), Act 1100 (2023), and L.I. 2475 create a 11-licence framework covering the full value chain. Licence 04 specifically enables research and development activities on cannabis and industrial hemp — variety trials, pharmaceutical preclinical research, clinical investigation, materials science, food science, and agronomic R&D — within a regulated, NCC-supervised framework.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Ghana already has published, internationally recognised science on medicinal plants and cannabis. The SATREPS-funded research programme at University of Ghana produced internationally co-authored studies on Ghanaian anti-viral and anti-parasitic botanicals. Studies on Ghana's preparedness for industrial hemp have explicitly concluded the country has the institutional readiness for cannabis R&D. Licence 04 is the bridge from academic capacity to licensed commercial science.
          </p>
        </div>
        <div>
          <div style={{background:C.ink,padding:'24px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>R&D Licence Framework at a Glance</div>
            {[
              {l:'NCC Licence',v:'Licence 04 · R&D'},
              {l:'Scope',v:'Pharma · Agronomy · Materials · Food Science'},
              {l:'Clinical Trials Authority',v:'Ghana FDA — separate authorisation'},
              {l:'Ethics Clearance',v:'University IRB or national ethics committee'},
              {l:'IP Framework',v:'ARIPO · PCT · Ghana PVP (for varieties)'},
              {l:'Key Institutions',v:'Noguchi · CSIR · KNUST · UG · CPMR'},
              {l:'Grant Funding',v:'SATREPS · Wellcome · Gates · EU Horizon'},
              {l:'Applications',v:'Open · March 2026'},
            ].map((r,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<7?`1px solid rgba(255,255,255,0.07)`:'none',gap:'10px'}}>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.38)',flexShrink:0}}>{r.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.paper,textAlign:'right'}}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px'}}>
            <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>
              Ghana's published medicinal-plant research record, combined with NCC Licence 04, creates a credible basis for attracting international pharmaceutical companies, DFIs, and research consortia to fund Ghana-based cannabis R&D — positioning the country as the West African centre for cannabis science.
            </p>
          </div>
        </div>
      </div>
      {/* Timeline visual */}
      <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'28px'}}>
        <Eyebrow>R&D Activation Timeline · 2026–2032</Eyebrow>
        <div style={{display:'flex',gap:'0',marginTop:'14px',overflowX:'auto'}} className="chain-scroll">
          {[
            {yr:'2020',ev:'Act 1019 enacted',sub:'Section 43 introduces cannabis licensing framework',col:C.muted},
            {yr:'2021',ev:'Section 43 repealed',sub:'Inadvertent repeal in subsequent legislation creates legal gap',col:C.amber},
            {yr:'2023',ev:'Act 1100 passed',sub:'Section 43 reinstated; licensing framework restored',col:C.forest},
            {yr:'2024',ev:'L.I. 2475 gazetted',sub:'Operational regulations — 11 categories, NCC authority confirmed',col:C.forest},
            {yr:'Feb 2026',ev:'Launch event',sub:'Minister officially opens applications for all 11 licence categories',col:C.lime},
            {yr:'Now',ev:'Applications open',sub:'12–24 month first-mover window before competition intensifies',col:C.lime},
          ].map((e,i) => (
            <div key={i} style={{flexShrink:0,width:'160px',borderLeft:`3px solid ${e.col}`,paddingLeft:'12px',paddingRight:'8px'}}>
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
      <MobileCollapse num="§ 02" title="The Thesis" stat="50+" label="Active Cannabinoid Drug Trials">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 02</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>The R&D Thesis</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Every Downstream Opportunity Runs Through This Licence</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
        <div>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            R&D (Licence 04) is the knowledge layer of Ghana's cannabis value chain. It is the licence that generates the evidence base, develops the IP, tests the formulations, validates the agronomy, and proves the materials applications that every other licence holder needs. It is also the licence most aligned with what Ghana's publicly funded research institutions have been doing for decades — and the least developed in commercial terms.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The global cannabinoid clinical pipeline is substantial: more than 50 companies are advancing over 55 pipeline drugs across Phase 1–3 trials, covering neurological, psychiatric, pain, inflammatory, and oncologic indications. The cannabis pharmaceuticals market was approximately $1.1 billion in the early 2020s and is projected to grow significantly through 2030 as drugs are approved. Big pharma — including Pfizer's entry into cannabinoid therapeutics — signals the mainstreaming of cannabis-derived medicines.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Ghana's strategic position for R&D is unique in Africa. The country has a clinical trials infrastructure (FDA Ghana authorisation, university ethics committees), a plant-medicine research tradition (SATREPS-funded anti-viral/anti-parasitic studies), and the four agro-ecological zones needed for multi-location agronomic trials. What it lacks is a commercially structured, NCC-licensed R&D operation to activate this capacity.
          </p>
        </div>
        <div>
          <PullQuote>
            Ghana published internationally co-authored medicinal plant research long before cannabis was licensed. The science exists. The institutions exist. Licence 04 is the switch that turns decades of academic capacity into a licensed commercial activity — and positions Ghana as West Africa's centre for cannabis knowledge.
          </PullQuote>
          <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'20px',marginTop:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Global Cannabinoid Clinical Pipeline — Growth Trajectory</div>
            {/* SVG Bar Chart */}
            <svg viewBox="0 0 340 140" style={{width:'100%',display:'block'}}>
              {[
                {yr:'2020',v:30,val:'~25 drugs'},
                {yr:'2022',v:45,val:'~35 drugs'},
                {yr:'2024',v:65,val:'55+ drugs'},
                {yr:'2026',v:80,val:'75+ est.'},
                {yr:'2028',v:95,val:'100+ est.'},
                {yr:'2030',v:112,val:'150+ est.'},
              ].map((d,i) => (
                <g key={i}>
                  <rect x={10+i*54} y={140-d.v-20} width={38} height={d.v} fill={i===5?C.lime:i>=4?C.limeDark:C.border}/>
                  <text x={29+i*54} y={135} textAnchor="middle" style={{fontFamily:'DM Sans,sans-serif',fontSize:'8px',fill:C.muted}}>{d.yr}</text>
                  <text x={29+i*54} y={140-d.v-25} textAnchor="middle" style={{fontFamily:'DM Mono,monospace',fontSize:'8px',fontWeight:700,fill:i>=4?C.forest:C.muted}}>{d.val}</text>
                </g>
              ))}
              <text x={10} y={12} style={{fontFamily:'DM Sans,sans-serif',fontSize:'9px',fill:C.faint}}>Active cannabinoid drug candidates in pipeline (indicative)</text>
            </svg>
            <div style={{marginTop:'8px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
              {[{c:C.border,l:'Historical pipeline'},{c:C.limeDark,l:'Projected'},{c:C.lime,l:'2030 estimate'}].map((s,i) => (
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
        <Eyebrow>Four Structural Drivers for Cannabis R&D Investment</Eyebrow>
        {/* Desktop grid */}
        <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0',marginTop:'14px'}}>
          {[
            {n:'Pharma Pipeline Expansion',d:'50+ companies advancing 55+ cannabinoid drugs through clinical trials. Big pharma entry (Pfizer, AstraZeneca adjacency) signals mainstream integration of cannabis-derived therapeutics.'},
            {n:'African Disease Burden',d:'Sickle-cell pain, epilepsy, neuropathic pain, psychiatric conditions — all have cannabinoid intervention rationales. Ghana patient populations represent high-value trial sites.'},
            {n:'Materials & Green Chemistry',d:'Nanocellulose from hemp hurds, hempcrete systems, biocomposites — R&D programmes generating patents in sustainable materials with global industrial customers.'},
            {n:'Agronomic Intelligence Demand',d:'Every cultivation and processing licence holder needs research data on tropical variety performance, yield optimisation, and THC stability. R&D is the knowledge supplier to the entire sector.'},
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
          {n:'Pharma Pipeline',icon:'💊',d:'50+ companies advancing 55+ cannabinoid drugs. Big pharma entry signals mainstream cannabis therapeutics. Ghana can host trials for African disease burdens.'},
          {n:'African Disease Burden',icon:'🏥',d:'Sickle-cell, epilepsy, neuropathic pain — cannabinoid intervention rationales specific to Ghana. High-value trial site for international sponsors.'},
          {n:'Materials Science',icon:'🔬',d:'Nanocellulose, hempcrete, biocomposites — R&D programmes generating patentable IP with global industrial customers.'},
          {n:'Agronomic Data',icon:'🌿',d:'Every cultivation licence holder needs tropical performance data. R&D generates the intelligence the entire sector depends on.'},
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
// SECTION 03 — GHANA RESEARCH INSTITUTION FIT
// ─────────────────────────────────────────────────────────────────────────────
const GhanaFit = () => (
  <div id="s03" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 03" title="Ghana Fit" stat="5 Institutions" label="Research Infrastructure">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 03</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Ghana Research Institution Fit</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'700px'}}>Five World-Class Institutions — the Research Infrastructure Already Exists</h2>
      <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'32px',maxWidth:'700px'}}>
        A cannabis R&D licence in Ghana is not starting from scratch. The country has internationally published scientists, equipped laboratories, ethics committees, clinical trials infrastructure, and a formal herbal-medicine research tradition. Licence 04 activates this existing capacity within a regulated cannabis framework.
      </p>
      {/* Desktop institution grid */}
      <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}}>
        {[
          {
            inst:'Noguchi Memorial Institute for Medical Research',tier:'FLAGSHIP',color:C.lime,
            type:'Biomedical research — virology, parasitology, pharmacology',
            location:'University of Ghana campus, Legon',
            rdValue:'Ghana primary biomedical research institute with international co-publication record. Cannabis R&D anchor for pharma-grade cannabinoid research, toxicology studies, and clinical trial site management.',
            advantage:'Published SATREPS research on Ghanaian medicinal plants. GLP-capable labs. Established relationships with WHO, NIH, international pharma. Clinical trial site infrastructure.',
            note:'Most credible anchor for attracting international pharmaceutical R&D contracts',
          },
          {
            inst:'Centre for Plant Medicine Research (CPMR)',tier:'SPECIALIST',color:C.lime,
            type:'Herbal medicine — phytochemistry, pharmacognosy, formulation',
            location:'Mampong-Akuapem, Eastern Region',
            rdValue:'Dedicated herbal medicine R&D facility. Deep phytochemical analysis capability directly applicable to cannabinoid profiling, extract standardisation, and traditional-medicine integration studies.',
            advantage:'Decades of experience standardising African plant medicines. Clinical-grade herbal product development. Ghana FDA liaison for herbal product registration.',
            note:'Natural partner for cannabinoid formulation development and herbal combination studies',
          },
          {
            inst:'KNUST — Faculty of Pharmacy & Pharmaceutical Sciences',tier:'HIGH FIT',color:C.limeDark,
            type:'Pharmaceutical sciences, biochemistry, clinical pharmacy',
            location:'Kumasi',
            rdValue:'KNUST has active pharmaceutical R&D programmes with GC/HPLC analytical capability, a faculty of 500+ pharmacy graduates annually, and existing research on Ghanaian medicinal plant applications.',
            advantage:'Largest pharmacy faculty in Ghana. Industry partnership infrastructure. Central Ghana location close to key agro-ecological trial zones.',
            note:'Strongest partner for cannabinoid formulation, analytical method development, and bioavailability studies',
          },
          {
            inst:'University of Ghana — Dept. of Pharmacology & Therapeutics',tier:'HIGH FIT',color:C.limeDark,
            type:'Pharmacology, clinical medicine, therapeutics',
            location:'Legon, Accra',
            rdValue:'UG Medical School clinical research infrastructure. Korle Bu Teaching Hospital affiliation creates direct access to patient populations for clinical trial feasibility and observational studies.',
            advantage:'Clinical trials ethics committee access. Direct hospital linkage for patient recruitment. International co-publication record across infectious disease and pain research.',
            note:'Key partner for clinical R&D programmes targeting sickle-cell, epilepsy, and pain indications',
          },
        ].map((r,i) => (
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
              <div style={{fontFamily:F.display,fontSize:'14px',fontWeight:700,color:C.ink,lineHeight:1.2,paddingRight:'12px'}}>{r.inst}</div>
              <div style={{background:r.color,color:r.color===C.limeDark?C.ink:C.ink,padding:'2px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,whiteSpace:'nowrap'}}>{r.tier}</div>
            </div>
            <div style={{marginBottom:'10px'}}>
              {[{l:'Type',v:r.type},{l:'Location',v:r.location},{l:'R&D Value',v:r.rdValue}].map((f,j) => (
                <div key={j} style={{display:'flex',gap:'8px',marginBottom:'5px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'64px',flexShrink:0,marginTop:'2px'}}>{f.l.toUpperCase()}</span>
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
        {inst:'Noguchi Memorial Institute',tier:'FLAGSHIP',color:C.lime,type:'Biomedical — virology, pharmacology',location:'UG Campus, Legon',rdValue:'GLP labs, SATREPS record, WHO/NIH relationships. Primary anchor for pharma-grade cannabinoid R&D.',advantage:'Published medicinal plant science. Clinical trial site infrastructure.',note:'Best anchor for international pharma contracts'},
        {inst:'Centre for Plant Medicine Research',tier:'SPECIALIST',color:C.lime,type:'Herbal medicine — phytochemistry, formulation',location:'Mampong-Akuapem',rdValue:'Decades standardising African plant medicines. Directly applicable to cannabinoid profiling and extract standardisation.',advantage:'Ghana FDA liaison for herbal product registration. Formulation development expertise.',note:'Natural partner for cannabinoid formulation'},
        {inst:'KNUST Pharmacy Faculty',tier:'HIGH FIT',color:C.limeDark,type:'Pharmaceutical sciences, biochemistry',location:'Kumasi',rdValue:'500+ pharmacy graduates/yr. GC/HPLC analytical capability. Existing medicinal plant R&D programmes.',advantage:'Largest pharmacy faculty in Ghana. Industry partnership infrastructure.',note:'Formulation, analytical methods, bioavailability'},
        {inst:'University of Ghana — Pharmacology',tier:'HIGH FIT',color:C.limeDark,type:'Pharmacology, clinical medicine',location:'Legon, Accra',rdValue:'Clinical trials ethics committee. Korle Bu Teaching Hospital access for patient recruitment in sickle-cell and epilepsy studies.',advantage:'International co-publication record. Clinical research infrastructure.',note:'Clinical R&D for Ghanaian disease burden'},
      ]} renderCard={(r,i) => (
        <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px',height:'100%'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
            <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.ink,lineHeight:1.2}}>{r.inst}</div>
            <div style={{background:r.color,color:C.ink,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,marginLeft:'8px'}}>{r.tier}</div>
          </div>
          {[{l:'Type',v:r.type},{l:'Location',v:r.location},{l:'R&D Value',v:r.rdValue}].map((f,j) => (
            <div key={j} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'58px',flexShrink:0,paddingTop:'2px'}}>{f.l.toUpperCase()}</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.45}}>{f.v}</span>
            </div>
          ))}
          <div style={{borderTop:`2px solid ${r.color}`,paddingTop:'10px',marginTop:'12px'}}>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.6,color:C.ink,marginBottom:'6px'}}>{r.advantage}</p>
            <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{r.note}</p>
          </div>
        </div>
      )}/>
      {/* R&D infrastructure requirements strip */}
      <div style={{background:C.paperDark,padding:'24px',borderTop:`3px solid ${C.ink}`}}>
        <Eyebrow>Core R&D Infrastructure Requirements vs. Ghana's Provision</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',marginTop:'14px'}} className="tc">
          {[
            {param:'GLP/GMP Labs',req:'Analytical, preclinical',ghana:'Noguchi, CPMR, KNUST — all equipped',fit:'★★★★☆'},
            {param:'Clinical Trials Infra',req:'Ethics committee, site management',ghana:'UG Medical School + Korle Bu',fit:'★★★★☆'},
            {param:'Regulatory Pathway',req:'Ghana FDA authorisation',ghana:'Existing clinical trials guidelines',fit:'★★★★☆'},
            {param:'IP Framework',req:'Patents, PVP, trade secrets',ghana:'ARIPO membership + Ghana PVP Act',fit:'★★★☆☆'},
            {param:'Intl. Research Network',req:'Co-publication, funding access',ghana:'SATREPS, Wellcome, Gates precedents',fit:'★★★★☆'},
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
      n:'01',name:'University Partnership Lab',tag:'ACADEMIC ANCHOR',color:C.teal,
      tagline:'Public institution. Public funding. Cannabis science as a licensed academic activity.',
      scale:'1–5 researchers · 1–3 lab spaces · multi-location agronomy plots',
      capital:'$50K–200K (institutional grant; KNUST, UG, UCC academic anchor)',
      timeline:'12–24 months to first published data; 3–5 years to IP pipeline',
      revenue:'Grant income $50K–500K/yr; IP licensing value builds over time',
      fit:'★★★★★ Lowest commercial risk — institutional legitimacy + grant access',
      description:'The university partnership lab model embeds a Licence 04 R&D operation within an existing public research institution — KNUST, University of Ghana, University of Cape Coast, or Noguchi. The institution provides lab infrastructure, ethics clearance, institutional reputation, and grant-access credibility. The private partner provides commercial orientation, IP management, and industry linkage. This is the lowest-risk entry to cannabis R&D in Ghana — the institutional anchor substitutes for significant capital investment and provides ready access to international funding networks.',
      requirements:['NCC R&D Licence (Licence 04) — either institutional or private-party holding','Formal university research collaboration agreement specifying IP ownership and commercialisation rights','Ghana FDA notification or authorisation for any clinical or preclinical compound work','Institutional ethics committee approval for any human-subjects research','ARIPO or PCT patent strategy agreed before first publication'],
      advantages:['Institutional credibility unlocks international grant funding — SATREPS, Wellcome, Gates, EU Horizon','Existing lab infrastructure reduces capital requirement significantly','University branding opens doors to pharmaceutical company research contracts','Ethics infrastructure and compliance systems are pre-built','Talent pipeline from student and postdoc population'],
      risks:['IP ownership disputes common when commercial value emerges from academic work — define upfront','University timelines are slow — commercial milestones may not align with academic cycles','Technology transfer office capacity in Ghanaian universities is limited'],
      ideal:'International pharmaceutical companies seeking African research partnerships, DFIs and philanthropic funders, Ghana diaspora scientists returning with international research networks',
    },
    {
      n:'02',name:'Contract Research Organisation',tag:'COMMERCIAL R&D',color:C.forest,
      tagline:'Sponsor-funded research. Ghana-based CRO. International pharmaceutical clients.',
      scale:'5–20 scientific staff · GLP-capable labs · clinical trial site management',
      capital:'$150K–600K (pharma/cosmetic company contracts; GLP lab setup)',
      timeline:'18–36 months to first CRO contract revenue',
      revenue:'CRO fees $200K–2M/yr at scale; data licensing; regulatory consulting',
      fit:'★★★★☆ Highest near-term commercial revenue potential in Licence 04',
      description:'The contract research organisation model builds a Licence 04 operation specifically designed to serve international pharmaceutical companies, biotech firms, and cosmetic companies that need Ghana-based cannabis research services — analytical testing, preclinical toxicology, formulation development, clinical trial site management, and regulatory consulting for Ghana FDA authorisation. Global CROs like Maridose, ProRelix Research, and Santé Cannabis have demonstrated the model: cannabis-specialised CROs command premium fees over generalist CROs because of regulatory complexity and scientific specificity. Ghana can replicate this model for the African and global market.',
      requirements:['NCC R&D Licence (Licence 04)','GLP-capable laboratory or formal partnership with Noguchi/KNUST GLP labs','Ghana FDA clinical trials site registration for human-subjects work','Quality management system: SOPs, documentation, audit trail','At least one PhD-level scientist with cannabinoid pharmacology or clinical trials management experience'],
      advantages:['CRO model generates revenue from Day 1 of first contract — fastest path to R&D cash flow','Ghana disease burden (sickle-cell, epilepsy) makes it a compelling clinical trial site for Africa-specific cannabinoid indications','International pharma increasingly values diverse patient populations and lower trial costs in Africa','First cannabis CRO in West Africa has no competition — captures entire regional demand'],
      risks:['Requires credible GLP/GCP certification to attract international sponsors — cannot shortcut this','Building sponsor relationships takes 12–24 months before first contract','Staff retention is a risk — skilled researchers have global mobility'],
      ideal:'International pharmaceutical and biotech companies, cosmetic companies seeking African clinical data, DFI-backed innovation platforms, and Ghanaian scientists with international R&D networks',
    },
    {
      n:'03',name:'CSIR Adaptive Trials Unit',tag:'POLICY-LINKED',color:C.ink,
      tagline:'MoFA-aligned research. Government credibility. Agronomy and food science focus.',
      scale:'CSIR institutional partnership · multi-location trial network',
      capital:'$80K–350K (MoFA-aligned; policy-linked funding; CSIR co-funding)',
      timeline:'2–4 years to produce policy-relevant variety and agronomy data',
      revenue:'Government contracts + DFI grants + CSIR institutional funding',
      fit:'★★★☆☆ Policy influence and agronomy data — indirect but foundational value',
      description:'The CSIR Adaptive Trials Unit model partners with Ghana Council for Scientific and Industrial Research — specifically CSIR-CRI (Crops Research Institute) and CSIR-SARI (Savannah Agricultural Research Institute) — to establish an NCC Licence 04 research programme focused on hemp agronomy, variety performance, soil science, and food science. This model is aligned with agricultural policy priorities: the One District One Factory initiative, the food import substitution programme, and the Ministry of Food and Agriculture diversification strategy. Revenue comes from government contracts, international agricultural research funding (CGIAR, AGRA, USAID), and DFI grants rather than pharmaceutical channels.',
      requirements:['NCC R&D Licence (Licence 04)','CSIR formal research partnership or secondment arrangement','MoFA alignment — hemp R&D included in agricultural research plan','Multi-location trial site registration with NCC across minimum 3 agro-ecological zones','Phytochemistry lab or access to CSIR-CRI analytical facilities'],
      advantages:['Government alignment creates policy protection and budget access — less commercially fragile than private CRO','Agronomy data is immediately applicable to Licence 01 cultivators — commercial value through knowledge products','CGIAR and AGRA funding mechanisms accessible via CSIR institutional relationships','Directly enables Licence 01 and 03 holders with tropical performance data'],
      risks:['Government R&D timelines are slow and politically influenced','Revenue dependency on grant cycles creates cash flow uncertainty','Commercial IP capture from government research is structurally difficult — define upfront'],
      ideal:'Development finance institutions, agricultural research foundations, CGIAR-affiliated programmes, bilateral science partnerships (USAID, EU), and Ghana government agencies seeking evidence-based cannabis policy',
    },
    {
      n:'04',name:'Proprietary IP Developer',tag:'HIGH-VALUE LONG-HORIZON',color:C.limeDark,
      tagline:'Own the patent. License the technology. Build Ghana cannabis IP portfolio.',
      scale:'Focused R&D team · specific indication or material target · patent-first orientation',
      capital:'$300K–1.2M (long-horizon; full development cycle and patent filing)',
      timeline:'5–10 years to first patent grant; 8–15 years to first royalty revenue',
      revenue:'Patent licensing $500K–5M+ per successful molecule or process',
      fit:'★★★☆☆ Highest long-term value — requires patient, specialist capital',
      description:'The proprietary IP developer model is the most ambitious Licence 04 pathway: building a focused R&D operation with the explicit objective of generating patentable cannabis-related intellectual property — novel cannabinoid formulations, delivery systems, materials processes, or agronomic methods — that can be licensed globally. This model is appropriate for well-capitalised investors who understand pharmaceutical or materials IP timelines. Success examples include GW Pharmaceuticals (now Jazz Pharmaceuticals) which built a $7B company from two cannabis-derived drugs. Ghana unique position — tropical agro-ecology, African disease burden data, traditional-medicine intersection — creates distinctive IP opportunities that EU and North American researchers cannot easily replicate.',
      requirements:['NCC R&D Licence (Licence 04)','PhD-level principal investigator in relevant discipline (pharmacology, materials science, agronomy)','IP strategy and patent counsel engaged before first experimental results','Ghana FDA IND-equivalent application for any clinical development','ARIPO and PCT patent filing budget ($15K–50K per patent family)'],
      advantages:['Successful patent portfolio generates long-duration royalty income with low marginal cost','Ghana-specific tropical performance data creates non-replicable IP advantage','African disease burden data (sickle-cell, epilepsy) has orphan drug pathway advantages in EU/US FDA','One successful drug or process patent can return 100× the R&D investment through licensing'],
      risks:['8–15 year development timeline before first patent revenue — requires exceptional investor patience','Patent attrition rate in drug development is very high — most programmes fail before commercialisation','Ghana IP enforcement infrastructure still maturing — international filings essential'],
      ideal:'Pharmaceutical investment funds, university technology transfer vehicles, diaspora entrepreneurs with pharma or biotech track records, and impact investors targeting Ghana knowledge economy development',
    },
  ];
  const m = models[active];
  return (
    <div id="s04" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <MobileCollapse num="§ 04" title="Business Models" stat="4 Models" label="$50K to $1.2M Entry">
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 04</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Business Models</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Four Routes into Ghana's R&D Sector — from University Lab to Proprietary IP</h2>
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
        <div className="mob-show" style={{display:'none',marginBottom:'20px',overflowX:'auto',gap:'0',display:'flex'}}>
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
      <MobileCollapse num="§ 05" title="Unit Economics" stat="$50K–500K" label="Grant/Contract Range">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 05</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Unit Economics</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'680px'}}>What Cannabis R&D Revenue Looks Like — Grant, Contract, and IP Streams</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'36px',maxWidth:'700px'}}>
        R&D economics are fundamentally different from cultivation or processing: revenue comes from sponsored research contracts, grants, and — eventually — IP licensing rather than commodity sales. The financial profile is bimodal: early-stage capital-intensive with uncertain returns, mature-stage capital-light with potentially very high royalty income.
      </p>
      <div style={{background:C.paperDark,padding:'28px',marginBottom:'32px'}}>
        <Eyebrow>Revenue Scenarios · 4 R&D Model Types (Annual USD at Maturity)</Eyebrow>
        <div style={{marginTop:'18px'}}>
          {[
            {label:'University Partnership Lab (grant-funded)',v:1800,max:5500,note:'SATREPS, Wellcome, EU Horizon grants — $100K–500K/yr at maturity'},
            {label:'CSIR Adaptive Trials Unit (government contracts)',v:2200,max:5500,note:'MoFA, CGIAR, AGRA contracts — $150K–400K/yr; steady but slow-growing'},
            {label:'Contract Research Organisation',v:3500,max:5500,note:'International pharma/cosmetic CRO fees — $200K–2M/yr at scale'},
            {label:'Proprietary IP Licensing (mature stage)',v:5000,max:5500,note:'Patent royalties on successful molecule or process — $500K–5M+/yr'},
          ].map((s,i) => (
            <div key={i} style={{marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',flexWrap:'wrap',gap:'6px'}}>
                <div>
                  <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{s.label}</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,marginLeft:'10px'}}>{s.note}</span>
                </div>
                <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.forest}}>${(s.v/10).toFixed(0)}K+</span>
              </div>
              <div style={{height:'16px',background:C.border,position:'relative'}}>
                <div style={{position:'absolute',left:0,top:0,height:'100%',width:`${(s.v/s.max)*100}%`,background:i===3?C.lime:i===2?C.limeDark:C.forest}}/>
              </div>
            </div>
          ))}
          <div style={{marginTop:'10px',display:'flex',gap:'6px',alignItems:'center'}}>
            <div style={{width:'10px',height:'10px',background:C.lime}}/>
            <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>Revenue at established programme maturity. IP licensing revenue is highly variable — zero before patent grant, potentially very large after successful commercialisation.</span>
          </div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Key Funding Sources &amp; Contract Benchmarks</div>
          {[
            {item:'SATREPS science partnership grants',range:'$200K–1M/project',pct:'3–5yr cycle',note:'Japan-Ghana bilateral; precedent set for medicinal plant work at UG'},
            {item:'Wellcome Trust Africa grants',range:'$100K–500K/yr',pct:'Competitive',note:'Health research focus — pain, neurological, infectious disease'},
            {item:'EU Horizon Africa partnerships',range:'$500K–2M/project',pct:'Consortium',note:'Sustainable materials, climate-smart ag, pharma innovation'},
            {item:'Pharma company CRO contract',range:'$200K–2M/study',pct:'Per-study',note:'Phase 1–2 clinical studies, preclinical toxicology, formulation dev'},
            {item:'CGIAR/AGRA agronomy contracts',range:'$50K–300K/yr',pct:'Rolling',note:'Climate-smart agriculture, variety adaptation, soil science'},
            {item:'Patent licensing (per licensee)',range:'3–8% of net sales',pct:'Royalty',note:'After patent grant; royalty on every unit sold by licensee'},
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>R&D Operating Cost Profile</div>
          <div style={{background:C.ink,padding:'20px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Annual Operating Cost (Small-Medium R&D Unit)</div>
            {[
              {scale:'Scientific staff (2–5 researchers)', capex:'$60K–200K/yr', note:'PhD + MSc level; Ghana salary scale significantly below EU/US'},
              {scale:'Lab consumables + reagents', capex:'$20K–80K/yr', note:'Cannabis analytical standards, solvents, assay kits'},
              {scale:'Equipment amortisation', capex:'$15K–50K/yr', note:'HPLC, GC-MS, analytical balance, freeze-drying'},
              {scale:'IP filing and legal', capex:'$15K–50K/yr', note:'Patent applications, ARIPO, PCT; legal review'},
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
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>A CRO model with 2–3 active international contracts at $200K–500K each achieves operating breakeven within <strong>2–3 years</strong>. A university partnership lab with $300K+ in active grants reaches breakeven within 12–18 months of first grant award.</p>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>Proprietary IP programmes do not reach breakeven until patent grant and first licensee — typically <strong>8–15 years</strong>. These require separate patient capital vehicles.</p>
            <div style={{borderLeft:`2px solid ${C.amber}`,paddingLeft:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.amber,lineHeight:1.6}}>⚠ R&D economics require grant and contract income to fund operations during the period before IP generates revenue. Never start Licence 04 without committed grant or contract revenue in year one.</p>
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
    {num:'03',name:'Breeding & Seed',pos:'UPSTREAM',color:C.teal,rel:'FEEDS DATA'},
    {num:'08',name:'Import',pos:'TRADE',color:C.teal,rel:'ENABLES'},
    {num:'01',name:'Cultivation',pos:'UPSTREAM',color:C.forest,rel:'TRIAL SITES'},
    {num:'04',name:'R&D',pos:'SPECIALIST',color:C.lime,rel:null,active:true},
    {num:'05',name:'Testing Lab',pos:'ENABLING',color:C.limeDark,rel:'SERVES'},
    {num:'06',name:'Storage',pos:'ENABLING',color:C.limeDark,rel:'STORES'},
    {num:'07',name:'Transport',pos:'ENABLING',color:C.limeDark,rel:'MOVES'},
    {num:'02',name:'Processing',pos:'MID-CHAIN',color:C.forest,rel:'PROCESS DATA'},
    {num:'10',name:'Wholesale',pos:'MID-CHAIN',color:C.forest,rel:'DISTRIBUTES'},
    {num:'09',name:'Export',pos:'TRADE',color:C.teal,rel:'EXPORTS'},
    {num:'11',name:'Dispensing',pos:'DOWNSTREAM',color:C.forest,rel:'PRODUCT DATA'},
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
      <MobileCollapse num="§ 06" title="Value Chain" stat="All 11" label="Licences Benefit from R&D">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 06</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Value Chain Position</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Knowledge Node — Every Other Licence Performs Better With R&D Support</h2>
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What R&D Draws From Other Licences</div>
          {[
            {lic:'Licence 01 — Cultivation',role:'Field trial sites and biomass samples. Cultivation plots are the laboratory for agronomy R&D and the feedstock source for processing experiments.'},
            {lic:'Licence 02 — Processing',role:'Provides extracted and processed material for pharmaceutical and food-science R&D. GMP-grade extract is required for clinical research.'},
            {lic:'Licence 03 — Breeding & Seed',role:'Germplasm, variety data, and candidate lines feed breeding R&D. Natural joint-venture territory — R&D generates the science that Licence 03 commercialises.'},
            {lic:'Licence 05 — Testing Lab',role:'Analytical testing for R&D batches — THC, cannabinoid profiles, contaminants. R&D and testing labs are natural partners, often co-located.'},
          ].map((r,i) => (
            <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'3px'}}>{r.lic}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6}}>{r.role}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What R&D Supplies to Every Licence</div>
          {[
            {lic:'Licence 01 — Cultivation',role:'Tropical agronomy data: variety performance, THC stability, yield optimisation, pest and disease management. R&D reduces crop destruction risk.'},
            {lic:'Licence 02 — Processing',role:'Process efficiency data, extraction optimisation, quality parameters. R&D tells processors what inputs produce the best outputs.'},
            {lic:'Licence 03 — Breeding & Seed',role:'Chemotyping data, genetic characterisation, DUS testing. R&D is the scientific foundation for every new variety claim.'},
            {lic:'Licence 11 — Dispensing',role:'Clinical evidence for product efficacy and safety claims. Dispensaries can only make therapeutic claims supported by research data.'},
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
      <MobileCollapse num="§ 07" title="Competition" stat="0" label="Licensed Cannabis R&D Facilities">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 07</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Competitive Landscape</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Ghana vs. Seven African Peers — Cannabis R&D Infrastructure</h2>
      {/* Desktop table */}
      <div className="mob-hide" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'680px'}}>
          <thead>
            <tr style={{background:C.ink}}>
              {['Country','Status','R&D Infrastructure','Clinical Trials Infra','IP Framework','Intl. Funding Access','BRIDGE View'].map((h,i) => (
                <th key={i} style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',textAlign:'left',borderRight:i<6?`1px solid rgba(255,255,255,0.05)`:'none'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★ Noguchi, CSIR, KNUST, UG',port:'★★★★☆ Existing clinical trial infra',labour:'★★★★☆ ARIPO + Ghana PVP Act',fw:'★★★★☆ SATREPS, Wellcome, Gates',view:'Deepest plant-medicine R&D base in West Africa — zero cannabis R&D incumbents',hl:true},
              {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ Stellenbosch, UCT, ARC',port:'★★★★☆ Well-established',labour:'★★★★☆ Mature IP ecosystem',fw:'★★★★★ Most international funding',view:'Most advanced African cannabis R&D; PHARMANOVA and university partnerships active'},
              {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★☆☆ Mohammed V, INRA',port:'★★★☆☆ EU clinical linkages',labour:'★★★☆☆ OMPIC IP office',fw:'★★★★☆ EU Horizon access',view:'EU proximity enables pharma partnerships; traditional cannabis knowledge base'},
              {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★☆☆☆ Very limited',port:'★★☆☆☆ Basic clinical sites',labour:'★☆☆☆☆',fw:'★★☆☆☆',view:'Medical focus only; no significant R&D programme; landlocked'},
              {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★★☆☆ UoN, KEMRI',port:'★★★☆☆ Growing',labour:'★★★☆☆',fw:'★★★☆☆ ARIPO member',view:'East Africa competitor; strong clinical trials infrastructure from HIV research'},
              {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ UZ, NUST',port:'★★☆☆☆ Limited',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Medicinal focus; R&D largely academic; no cannabis R&D ecosystem yet'},
              {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★★☆☆☆ Bunda College',port:'★☆☆☆☆',labour:'★☆☆☆☆',fw:'★★☆☆☆',view:'Very limited R&D capacity; no significant cannabis research programme'},
              {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★★☆☆☆',port:'★☆☆☆☆',labour:'★☆☆☆☆',fw:'★★☆☆☆',view:'No cannabis R&D infrastructure; framework still developing'},
            ].map((r,i) => (
              <tr key={i} style={{background:r.hl?`rgba(184,217,53,0.07)`:i%2===0?C.paper:C.paperDark}}>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'12px',fontWeight:r.hl?700:400,color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.country}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{r.status}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.aFit}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:r.hl?C.forest:C.ink,fontWeight:r.hl?700:400,borderBottom:`1px solid ${C.border}`}}>{r.port}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.labour}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.fw}</td>
                <td style={{padding:'10px 12px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:r.hl?C.forest:C.muted,borderBottom:`1px solid ${C.border}`}}>{r.view}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile country cards */}
      <MobCountryCards countries={[
        {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★ Noguchi, CSIR, KNUST',port:'★★★★☆ Clinical trial infra',labour:'★★★★☆ ARIPO + PVP Act',fw:'★★★★☆ SATREPS, Wellcome',sm:'Zero cannabis R&D incumbents',view:'Best R&D positioning in West Africa — deepest plant-medicine research base + zero incumbents.',hl:true},
        {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ Stellenbosch, UCT',port:'★★★★☆',labour:'★★★★☆',fw:'★★★★★',sm:'Most advanced African cannabis R&D',view:'Most developed cannabis R&D ecosystem in Africa; already attracting pharma partnerships'},
        {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★☆☆ INRA, Mohammed V',port:'★★★☆☆',labour:'★★★☆☆',fw:'★★★★☆ EU access',sm:'EU proximity advantage',view:'EU partnership access makes Morocco competitive for pharma R&D; traditional cannabis knowledge'},
        {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★★☆☆ UoN, KEMRI',port:'★★★☆☆',labour:'★★★☆☆',fw:'★★★☆☆',sm:'Strong HIV/clinical trials base',view:'KEMRI clinical trials infrastructure from HIV work is transferable; East Africa competitor'},
        {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★☆☆☆ Very limited',port:'★★☆☆☆',labour:'★☆☆☆☆',fw:'★★☆☆☆',sm:'Medical focus only',view:'No significant R&D programme; medical export focus only'},
        {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ UZ, NUST',port:'★★☆☆☆',labour:'★★☆☆☆',fw:'★★☆☆☆',sm:'Academic only',view:'Nascent cannabis R&D; no commercial programme'},
        {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★★☆☆☆',port:'★☆☆☆☆',labour:'★☆☆☆☆',fw:'★★☆☆☆',sm:'Minimal',view:'Very limited R&D capacity; no cannabis research ecosystem'},
        {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★★☆☆☆',port:'★☆☆☆☆',labour:'★☆☆☆☆',fw:'★★☆☆☆',sm:'Does not exist',view:'No cannabis R&D infrastructure; framework still developing'},
      ]}/>
      <PullQuote>
        Noguchi Memorial Institute has been publishing internationally co-authored medicinal plant research for decades. KNUST has the GC/HPLC labs. The University of Ghana has the clinical trials ethics committee. What Ghana has been missing is not the institutions — it is the NCC licence that connects them to cannabis. Now it has that too.
      </PullQuote>
      <div style={{background:C.paperDark,padding:'20px',marginTop:'8px'}}>
        <Eyebrow>Ghana's R&D Structural Advantages</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',marginTop:'14px'}} className="tc3">
          {[
            {title:'Published Research Track Record',body:'Ghana has internationally co-authored, peer-reviewed publications on medicinal plant pharmacology, ethnobotany, and anti-parasitic compounds. This track record is the credibility base for attracting international R&D sponsors.'},
            {title:'Zero Cannabis R&D Incumbents',body:'There are no licensed cannabis R&D facilities in Ghana. The entire market — domestic knowledge demand from 11 licence categories, plus international CRO contracts — is open to the first entrant.'},
            {title:'African Disease Burden Advantage',body:'Sickle-cell disease, epilepsy, neuropathic pain, and psychiatric conditions in Ghana create Africa-specific clinical trial rationales that EU and North American researchers cannot easily replicate in their home markets.'},
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
      <MobileCollapse num="§ 08" title="Regulatory Roadmap" stat="5 Phases" label="to First Research Output">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 08</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Regulatory Roadmap</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Compliance Journey from Licence Application to First Research Output</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px'}} className="tc mob-hide">
        <div>
          {[
            {phase:'Phase 1',label:'NCC Licence Application (Months 1–4)',steps:['Submit NCC R&D Licence (Licence 04) application — include research scope, institution partners, lab site details','Engage NCC Cannabis Regulations Department for pre-application consultation on research scope permitted','Identify institutional partner (Noguchi, CSIR, KNUST, UG) and formalise collaboration or secondment agreement','Register research facilities with NCC — secure storage for cannabis materials, access controls, inventory system','Confirm Ghana FDA notification requirements for intended research activities (pre-clinical vs clinical scope)'],color:C.teal},
            {phase:'Phase 2',label:'Ethics Clearance & Ghana FDA Authorisation (Months 3–8)',steps:['Apply for ethical clearance from institutional IRB (KNUST, UG, or Korle Bu IRB for clinical work)','Submit clinical trial authorisation application to Ghana FDA if any human-subjects research planned','Complete Ghana FDA review cycle — application, additional information requests, inspector site visit','Obtain GLP compliance if conducting preclinical studies for pharmaceutical submission','Register research project with relevant international databases (ClinicalTrials.gov if clinical work)'],color:C.forest},
            {phase:'Phase 3',label:'Cannabis Material Access & Lab Setup (Months 4–10)',steps:['Obtain NCC authorisation to receive and handle cannabis research materials','Source research-grade materials from NCC-licensed cultivators (Licence 01) or processors (Licence 02)','Calibrate and validate analytical equipment: HPLC, GC-MS for cannabinoid profiling and THC verification','Establish cannabis inventory management system per NCC requirements — receipt, use, disposal records','Set up biosafety and controlled-substance handling procedures for all lab staff'],color:C.limeDark},
            {phase:'Phase 4',label:'Research Programme Execution (Months 6–24+)',steps:['Execute research protocol as approved by NCC and ethics committee — no protocol deviations without amendment','Submit periodic research progress reports to NCC per licence conditions','File patent applications before public disclosure of novel findings — ARIPO and PCT filings where appropriate','Engage Ghana FDA for IND-equivalent consultation if pharmaceutical development programme advances','Secure follow-on grant or contract funding to sustain research operations through full programme cycle'],color:C.amber},
            {phase:'Phase 5',label:'Dissemination & Commercialisation (Months 18+)',steps:['Publish research findings in peer-reviewed journals — building Ghana cannabis science credibility','License IP to commercial partners (Licence 01, 02, 03, 11 holders) via NCC-compliant technology transfer','File for plant variety protection or product registration where applicable','Engage international pharmaceutical company partners for co-development or licensing negotiation','File NCC annual R&D report: projects completed, publications, patents filed, commercial outcomes'],color:C.lime},
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
              {item:'NCC licence renewal',detail:'Every 3 years; research scope, sites, and institutional partners re-registered'},
              {item:'Annual research reports',detail:'Projects undertaken, publications, IP filed, cannabis materials used and disposed'},
              {item:'Cannabis materials inventory',detail:'Monthly NCC-reportable inventory of all cannabis materials received, used, stored, destroyed'},
              {item:'Ethics committee renewal',detail:'Annual or per-study renewal of IRB approval for human-subjects work'},
              {item:'Ghana FDA progress reports',detail:'Quarterly for active clinical trials; annual for general pharmaceutical R&D'},
              {item:'Adverse event reporting',detail:'Serious adverse events in clinical work — immediate Ghana FDA and NCC notification'},
              {item:'IP disclosure management',detail:'Internal publication review before any public disclosure — patent filing must precede publication'},
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
              {body:'Ghana Food and Drugs Authority (FDA)',role:'Clinical trials authorisation — mandatory for any human-subjects research; IND-equivalent pre-submission consultation'},
              {body:'Institutional Review Board (IRB)',role:'Ethics clearance for all human-subjects research; protocol registration; continuing review'},
              {body:'Ghana Intellectual Property Office',role:'Patent filing, trademark, design registration; technology transfer support'},
              {body:'ARIPO (African Regional IP Org)',role:'Regional patent filing via HARARE Protocol — covers 22 African member states including Ghana'},
              {body:'Ghana Revenue Authority (GRA)',role:'R&D tax incentives; import duty relief on research equipment; royalty income tax treatment'},
            ].map((r,i) => (
              <div key={i} style={{padding:'7px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.body}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>{r.role}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.amber}`,paddingLeft:'14px',background:C.paper,padding:'14px 14px 14px 16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>Publication Before Patent — Critical Risk</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.65,color:C.ink}}>Publishing research findings before filing a patent permanently destroys novelty and eliminates patentability in most jurisdictions. <strong>Establish a mandatory internal IP review process: all manuscripts must be reviewed by your IP counsel before submission. File the patent application first, then submit the paper. This sequence is non-negotiable.</strong></p>
          </div>
        </div>
      </div>
      <MobPhaseAccordion phases={[
        {phase:'Phase 1',label:'NCC Licence Application (Months 1–4)',color:C.teal,steps:['Submit NCC R&D Licence 04 application with research scope and institution partner details','Engage NCC for pre-application consultation on permitted research scope','Formalise institutional collaboration (Noguchi, CSIR, KNUST, or UG)','Register research facilities with NCC; install access controls and inventory system','Confirm Ghana FDA notification requirements for intended research activities']},
        {phase:'Phase 2',label:'Ethics Clearance & Ghana FDA (Months 3–8)',color:C.forest,steps:['Apply for IRB ethical clearance — KNUST, UG, or Korle Bu IRB','Submit Ghana FDA clinical trial authorisation if human-subjects research planned','Complete Ghana FDA review; GLP compliance if preclinical pharmaceutical work','Register project on ClinicalTrials.gov if clinical work is included','Establish SOPs for controlled-substance handling and staff training']},
        {phase:'Phase 3',label:'Materials Access & Lab Setup (Months 4–10)',color:C.limeDark,steps:['Obtain NCC authorisation to receive and handle cannabis research materials','Source research-grade materials from NCC-licensed Licence 01 or 02 holders','Calibrate and validate HPLC/GC-MS analytical equipment for cannabinoid profiling','Establish NCC-compliant cannabis inventory management system','Set up biosafety and IP disclosure review procedures for all staff']},
        {phase:'Phase 4',label:'Research Execution (Months 6–24+)',color:C.amber,steps:['Execute approved research protocol — no deviations without amendment','File periodic NCC progress reports per licence conditions','File patents before any public disclosure of novel findings','Engage Ghana FDA for IND-equivalent consultation if pharma programme advances','Secure follow-on grant funding before current funding cycle expires']},
        {phase:'Phase 5',label:'Dissemination & Commercialisation (Months 18+)',color:C.lime,steps:['Publish findings in peer-reviewed journals after patent filing','License IP to commercial partners via NCC-compliant technology transfer','File for PVP or product registration where applicable','Engage international pharma partners for co-development or licensing','File NCC annual R&D report: publications, patents, commercial outcomes']},
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
            r:'Long timelines and high scientific attrition — most R&D programmes fail',
            sev:'HIGH',likelihood:'High (inherent to R&D)',cat:'Scientific / Financial',
            m:'Diversify research portfolio across multiple programmes and indications — do not concentrate all capital in a single drug development pathway. Pursue parallel agronomy and materials R&D alongside pharmaceutical work. Structure funding as milestone-based tranches so capital is only committed as programme feasibility is demonstrated. Pharmaceutical R&D attrition rate exceeds 90% from discovery to approval.',
          },
          {
            r:'Funding dependency — grant cycles create cash flow gaps',
            sev:'HIGH',likelihood:'High (structural R&D challenge)',cat:'Financial',
            m:'Build a diversified revenue base: grants + CRO contracts + government research agreements. Never run a single-source funded programme without a 12-month runway. Apply for multiple grant streams simultaneously rather than sequentially. Develop a CRO service offering that generates contract revenue to bridge gaps between grant cycles.',
          },
          {
            r:'IP loss through premature publication',
            sev:'MEDIUM-HIGH',likelihood:'Medium (without strict process)',cat:'Legal / IP',
            m:'Establish a mandatory pre-publication IP review protocol from Day 1. All manuscripts reviewed by IP counsel before journal submission. File patent application first, then submit paper. Include IP clause in all institutional partnership agreements. Train all researchers on publication timing discipline — this is the most common IP destruction mechanism in academic-commercial R&D.',
          },
          {
            r:'Regulatory pathway uncertainty — NCC and Ghana FDA guidelines still maturing',
            sev:'MEDIUM',likelihood:'Medium',cat:'Regulatory',
            m:'Engage NCC Cannabis Regulations Department and Ghana FDA early and continuously — pre-application consultations reduce risk of application refusal. Build regulatory expertise in-house or retain specialist regulatory consultants. Monitor NCC guideline updates actively. For pharmaceutical work, align with international regulatory expectations (ICH guidelines) from the outset — Ghana FDA increasingly aligns with international standards.',
          },
          {
            r:'Key researcher departure — talent retention in academic-commercial partnerships',
            sev:'MEDIUM',likelihood:'Medium-High',cat:'Operational',
            m:'Structure institutional partnerships around programmes and infrastructure, not individual researchers. Ensure IP ownership is vested in the entity, not the individual scientist. Offer competitive salaries relative to Ghanaian academic market. Build in postdoc and student pipelines that provide continuity. Document all research protocols comprehensively so programmes survive personnel changes.',
          },
          {
            r:'Clinical trial recruitment challenges for Ghanaian patient populations',
            sev:'MEDIUM',likelihood:'Medium (disease-dependent)',cat:'Operational',
            m:'Partner with Korle Bu Teaching Hospital, Komfo Anokye Teaching Hospital, and regional hospitals for patient access. Engage patient advocacy organisations for sickle-cell, epilepsy, and pain indications early. Community health worker networks are powerful recruitment channels in Ghana. Build recruitment timeline assumptions conservatively — 2× the estimated time is a reasonable buffer.',
          },
          {
            r:'International collaborator prioritises other markets — Ghana deprioritised',
            sev:'LOW-MEDIUM',likelihood:'Low-Medium',cat:'Commercial',
            m:'Build relationship depth through published science and demonstrated regulatory engagement before seeking major partnership deals. Lead with what makes Ghana distinctive: tropical agro-ecology, African disease burden data, zero competitor positioning. Have alternative international partners identified before negotiations with any single counterparty. Ensure collaboration agreements have performance obligations on both sides.',
          },
          {
            r:'Cannabis R&D social stigma affecting institutional reputation',
            sev:'LOW-MEDIUM',likelihood:'Low-Medium',cat:'Reputational',
            m:'Lead all communications with scientific and medical framing — hemp R&D, cannabinoid therapeutics, industrial hemp agronomy. Emphasise the NCC licence and regulatory compliance prominently. Engage Ghana medical community associations early. Position as continuation of the country established herbal medicine and medicinal plant research tradition, not as a new or controversial activity.',
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
    {dim:'Market Opportunity',score:52,weight:'30%',rationale:'The R&D market opportunity is real but indirect: it generates IP, data, and services that others commercialise. Direct CRO contract revenue is achievable, but the scale of the pharmaceutical R&D market accessible from Ghana is currently modest. Score reflects realistic near-term revenue achievability, not the long-term IP value potential.'},
    {dim:'Development Impact',score:74,weight:'30%',rationale:'R&D creates the highest-quality employment in the cannabis value chain — PhD scientists, clinical researchers, regulatory specialists. It generates the knowledge infrastructure that makes Ghana competitive long-term, builds national scientific capacity, and positions the country as a regional knowledge hub rather than a commodity producer.'},
    {dim:'Implementation Feasibility',score:56,weight:'25%',rationale:'Ghana has strong institutional research foundations, but cannabis R&D is scientifically complex, regulatory pathway is still maturing, and building a credible programme requires sustained effort across multiple years. The scientific attrition risk in pharmaceutical programmes is the primary feasibility concern. Agronomy and materials R&D are more feasible near-term than pharma.'},
    {dim:'Financial Sustainability',score:60,weight:'15%',rationale:'Grant-funded research and CRO contracts are sustainable when managed well, but are structurally dependent on external funding cycles. Proprietary IP-based revenue, when it arrives, is highly sustainable and capital-light. The blended model — grants plus contracts plus IP — is the most resilient financial structure.'},
  ];
  return (
  <div id="s10" className="pad-section" style={{background:C.ink,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 10" title="BRIDGE Score™" stat="60/100" label="Emerging Tier · Specialist" onDark={true}>
      <div style={{borderTop:`6px solid ${C.paper}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 10</span>
        <Eyebrow light>BRIDGE Impact Score™</Eyebrow>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>R&D Scores 60/100 — High Strategic Value, Long Timeline, Specialist Capital Required</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'40px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Composite Score</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(72px,12vw,120px)',fontWeight:500,color:C.lime,lineHeight:1}}>60</div>
            <div style={{fontFamily:F.mono,fontSize:'clamp(22px,4vw,36px)',fontWeight:300,color:'rgba(184,217,53,0.3)',lineHeight:1,marginBottom:'6px'}}>/100</div>
          </div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.28)',letterSpacing:'0.5px',marginBottom:'28px'}}>Emerging Tier · Specialist · NCC Licence 04</div>
          <ScoreBar label="Market Opportunity  ×30%" value={52} onDark/>
          <ScoreBar label="Development Impact  ×30%" value={74} onDark/>
          <ScoreBar label="Impl. Feasibility  ×25%" value={56} onDark/>
          <ScoreBar label="Financial Sustainability  ×15%" value={60} onDark/>
          <div style={{marginTop:'20px',borderTop:`1px solid rgba(255,255,255,0.08)`,paddingTop:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'10px'}}>Quick Parameters</div>
            {[{l:'Entry Barrier',v:'Very High'},{l:'Capital Intensity',v:'Medium (grants) to High (pharma)'},{l:'Timeline to Revenue',v:'2–5 years (grants/CRO)'},{l:'Licence Tier',v:'Emerging · Specialist'}].map((p,i) => (
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
    {cat:'NCC R&D Licence',range:'$2K–8K',note:'Application + 3-year licence; confirm fee schedule with NCC Cannabis Dept.'},
    {cat:'Lab equipment (HPLC, GC-MS, fume hood)',range:'$30K–150K',note:'Core analytical instruments for cannabinoid profiling and quality control'},
    {cat:'Lab consumables (year 1)',range:'$15K–60K',note:'Standards, solvents, reagents, disposables, calibration standards'},
    {cat:'Ghana FDA clinical trial authorisation',range:'$5K–20K',note:'Application fees + local counsel; required before any human-subjects work'},
    {cat:'IRB / ethics committee fees',range:'$1K–5K/study',note:'Institutional review board application and annual renewal fees'},
    {cat:'ARIPO / PCT patent filing',range:'$5K–20K/family',note:'Per patent family; include provisional, PCT, and national phase costs'},
    {cat:'Scientific staff (year 1)',range:'$40K–150K',note:'1–3 PhD/MSc researchers; Ghana salary scale significantly below EU/US'},
    {cat:'IP legal counsel (retainer)',range:'$10K–30K/yr',note:'Patent prosecution, licensing agreements, IP strategy'},
    {cat:'Working capital (18 months to first grant)',range:'$30K–100K',note:'Bridge funding before first grant award; salary + consumables'},
  ];
  const SHOW_FIRST = 4;
  return (
  <div id="s11" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 11" title="Deployment" stat="$50K+" label="R&D Lab Entry Capital">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 11</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Deployment Parameters</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>What It Takes to Enter Ghana's R&D Sector</h2>
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
              {role:'Principal Investigator (PhD)',spec:'Cannabis pharmacology, agronomy, or materials science; institutional credibility essential'},
              {role:'Research Scientist (MSc+)',spec:'Lab operations, cannabinoid analytics, data management'},
              {role:'NCC / Regulatory Affairs Officer',spec:'NCC licence compliance, Ghana FDA liaison, ethics committee management'},
              {role:'IP / Technology Transfer Officer',spec:'Patent prosecution management, licensing agreements, commercial partner engagement'},
              {role:'Grants / Finance Manager',spec:'Grant application writing, budget management, funder reporting'},
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
              Ghana has zero licensed cannabis R&D facilities as of March 2026. The first NCC Licence 04 holder will be the only licensed cannabis research entity in the country — and can immediately engage all 11 other licence categories as knowledge clients. International pharmaceutical companies seeking African clinical trial sites have no alternative Ghana-based cannabis CRO to approach.
            </p>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.7)',lineHeight:1.75,marginBottom:'16px'}}>
              R&D is a 10-year strategic investment, not a 12-month play. The operator who starts now — establishing institutional partnerships, securing first grant funding, and publishing first results — will have a 5-year scientific and reputational head start over any competitor who enters later. In knowledge-intensive sectors, this compounding advantage is extremely durable.
            </p>
            {[
              {l:'Optimal Licence 04 application',v:'Now — 2026'},
              {l:'First research publications',v:'2027–2028'},
              {l:'First CRO contract revenue',v:'2027–2028'},
              {l:'First patent filings',v:'2028–2030'},
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
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.45)',letterSpacing:'0.3px'}}>Licence 04 of 11 · Ghana Cannabis Intelligence</div>
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
export default function RDBrief() {
  const coverLogoRef = useRef(null);
  return (
    <div style={{fontFamily:F.body,background:C.paper}}>
      <DocumentGlobalStyles/>
      <LicenceMobileNav sections={NAV_SECTIONS}/>
      <DocumentTopBar coverLogoRef={coverLogoRef} breadcrumb="Ghana Cannabis Intelligence · Licence 04 · R&D · Members Brief" mobileBreadcrumb="04 · R&D"/>
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
