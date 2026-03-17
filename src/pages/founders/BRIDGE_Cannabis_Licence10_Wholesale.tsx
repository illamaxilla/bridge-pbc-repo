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
    <div style={{position:'absolute',right:'-20px',top:'-30px',fontFamily:F.display,fontSize:'clamp(180px,35vw,480px)',fontWeight:900,color:'rgba(255,255,255,0.022)',pointerEvents:'none',userSelect:'none',letterSpacing:'-12px',lineHeight:1}}>10</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
      <div ref={logoRef} style={{marginBottom:'36px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <DocumentLogo height={30} variant="white"/>
        <div className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.22)',letterSpacing:'0.8px'}}>MARCH 2026 · NCC L.I. 2475</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
        <div style={{background:C.lime,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.ink}}>LICENCE 10 · MID-CHAIN</div>
        <div style={{border:`1px solid ${C.lime}`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>CORE TIER</div>
        <div className="mob-hide" style={{border:`1px solid rgba(255,255,255,0.15)`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>MEMBERS INTELLIGENCE</div>
      </div>
      <h1 style={{fontFamily:F.display,fontSize:'clamp(30px,5.5vw,68px)',fontWeight:900,color:C.paper,lineHeight:1.08,marginBottom:'20px',maxWidth:'800px'}}>
        Wholesale &amp; Distribution<br/>
        <span style={{fontWeight:400,fontStyle:'italic',color:'rgba(250,248,243,0.55)',fontSize:'0.72em'}}>The Commercial Centre — Connecting Production to Every Downstream Market</span>
      </h1>
      <PullQuote onDark>
        Cultivation produces hemp. Processing transforms it. Export takes it global. Dispensing puts it in patients' hands. Between every one of these pairs sits the wholesale distributor — aggregating supply, matching it to demand, managing compliance, and moving volume. In every regulated cannabis market, wholesale and distribution is the commercial engine that makes the sector function at scale.
      </PullQuote>
      <div style={{borderTop:`1px solid rgba(255,255,255,0.09)`,paddingTop:'28px',marginTop:'8px',display:'flex',flexWrap:'wrap'}} className="stats-row">
        {[
          {v:'74',      l:'BRIDGE Score™',              s:'Core Tier · Mid-Chain'},
          {v:'15–30%',  l:'Value Capture Range',         s:'Farmgate-to-retail spread in regulated markets'},
          {v:'All 11',  l:'Licences Interact With Wholesale', s:'Every licence in the chain needs a distribution layer'},
          {v:'$30.1B',  l:'US Legal Cannabis Sales 2024',s:'Wholesale representing majority of B2B value chain'},
          {v:'AfCFTA',  l:'Regional Trade Opportunity',  s:'Ghana as West African hemp distribution hub'},
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
          {n:'01',t:'Why Now — The February 2026 Milestone',s:'Distribution creates market liquidity — without it, sector fragments',id:'s01'},
          {n:'02',t:'The Wholesale Thesis',s:'The commercial engine — aggregation, sales coverage, compliance management',id:'s02'},
          {n:'03',t:'Ghana Distribution Infrastructure Fit',s:'Commodity trading, FMCG networks, AfCFTA regional position',id:'s03'},
          {n:'04',t:'Business Models',s:'4 distribution models — commodity to branded pharmaceutical',id:'s04'},
          {n:'05',t:'Unit Economics',s:'Margin structure, working capital, 4 distribution configurations',id:'s05'},
          {n:'06',t:'Value Chain Position',s:"Wholesale's role — between every production-to-market pair",id:'s06'},
          {n:'07',t:'Competitive Landscape',s:'Ghana vs. 7 African peers — distribution and trading infrastructure',id:'s07'},
          {n:'08',t:'Regulatory Roadmap',s:'NCC wholesale licence, NCC track-and-trace, compliance obligations',id:'s08'},
          {n:'09',t:'Risk Register',s:'Full matrix — 8 risks, severity, mitigations',id:'s09'},
          {n:'10',t:'BRIDGE Impact Score™',s:'4-dimension analysis, composite 74/100',id:'s10'},
          {n:'11',t:'Deployment Parameters',s:'Capital, team, timeline, AfCFTA positioning',id:'s11'},
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
      <MobileCollapse num="§ 01" title="Why Now" stat="Feb 2026" label="Distribution Layer Needed Now" defaultOpen={true}>
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 01</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Why Now</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'700px'}}>26 February 2026: Ghana Creates 11 Licence Categories — and the Wholesale Layer That Connects Them All</h2>
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'48px'}} className="tc">
        <div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            On 26 February 2026, Ghana launched its full cannabis value chain — cultivation, processing, testing, storage, transport, import, export, and dispensing. Each of these licence categories produces or consumes product. The wholesale and distribution licence (Licence 10) is the commercial layer that connects them: buying from producers, aggregating supply, managing inventory, and selling to downstream buyers. Without it, the sector operates as isolated fragments.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            In California — the world's largest regulated cannabis market — distributors are legally mandatory in the supply chain. Cultivators and processors cannot sell directly to retailers; everything flows through a licensed distributor. In New York's regulated market, wholesalers play the same role. This reflects how regulated cannabis markets mature: the compliance, quality, and logistics overhead of B2B cannabis commerce is most efficiently concentrated in a professional distribution layer rather than distributed across every producer.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Ghana has one of the most capable commodity distribution ecosystems in West Africa. Cocoa exporters, FMCG distributors, pharmaceutical chains, and agri-commodity trading houses already operate national distribution networks. The cannabis wholesale licence adds a regulated cannabis compliance layer on top of existing, proven distribution capability. The distributor who moves early captures a position at the commercial centre of every transaction in the chain.
          </p>
        </div>
        <div>
          <div style={{background:C.ink,padding:'24px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Wholesale Framework at a Glance</div>
            {[
              {l:'NCC Licence',v:'Licence 10 · Wholesale & Distribution'},
              {l:'Core function',v:'B2B aggregation, inventory, and distribution'},
              {l:'Compliance role',v:'COA verification + track-and-trace integration'},
              {l:'Serves',v:'Processors, exporters, dispensaries, manufacturers'},
              {l:'Receives from',v:'Cultivators, processors, importers'},
              {l:'Track-and-trace',v:'NCC inventory integration — all movements logged'},
              {l:'Credit risk',v:'Working capital intensive — manage buyer payment terms'},
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
Ghana's commodity trading infrastructure — built around cocoa, cashew, shea, and horticultural export — is the most sophisticated in West Africa. The cannabis wholesale distributor who leverages this existing infrastructure captures the commercial centre of every hemp transaction in Ghana and positions for the regional AfCFTA distribution opportunity.
            </p>
          </div>
        </div>
      </div>
      {/* Timeline visual */}
      <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'28px'}}>
        <Eyebrow>Distribution Sector Development Timeline · 2026–2030</Eyebrow>
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
      <MobileCollapse num="§ 02" title="The Thesis" stat="15–30%" label="Distributor Value Capture">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 02</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>The Wholesale Thesis</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Every Downstream Opportunity Runs Through This Licence</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
        <div>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            Wholesale and distribution (Licence 10) is the commercial centre of the cannabis value chain. It does not grow, process, test, or export. It sits in between — aggregating product from multiple producers, managing inventory and compliance, and selling to downstream buyers across multiple channels and geographies. Industry benchmarks from regulated US cannabis markets show distributors capturing 15–30% of the value spread between farmgate and retail. At scale, this becomes the most profitable per-unit position in the chain.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The wholesale distributor solves the fragmentation problem inherent in a multi-producer, multi-channel cannabis market. A dispensary cannot manage relationships with 20 individual cultivators and processors. An export buyer cannot source from 50 smallholders. A food manufacturer cannot QA-verify 15 hemp oil suppliers. The distributor consolidates supply, standardises quality, handles compliance documentation, and manages the commercial relationships at scale — making the market function.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Ghana's existing commodity distribution infrastructure is directly applicable. FMCG distributors, agri-commodity trading houses, and pharmaceutical distribution chains already operate the network infrastructure, WMS systems, and sales force that a cannabis wholesale distributor needs. The NCC licence adds the compliance layer. The first distributor to build relationships across both supply (cultivation, processing) and demand (exporters, dispensaries, manufacturers) sides of the Ghana cannabis market owns the commercial centre of the sector.
          </p>
        </div>
        <div>
          <PullQuote>
            The distributor does not take crop failure risk. Does not build processing infrastructure. Does not need GMP certification. The distributor charges a margin on every unit that moves from producer to buyer — and in a sector with 11 licence categories generating transactions in every direction, every day, that margin compounds into a formidable revenue position.
          </PullQuote>
          <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'20px',marginTop:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Distribution Value Capture — Farmgate-to-Market Spread</div>
            {/* SVG Bar Chart */}
            <svg viewBox="0 0 340 140" style={{width:'100%',display:'block'}}>
              {[
                {yr:'Farmgate',v:30,val:'100%'},
                {yr:'Processing',v:52,val:'+40%'},
                {yr:'Distribution',v:75,val:'+25%'},
                {yr:'Export FOB',v:90,val:'+15%'},
                {yr:'Wholesale',v:100,val:'+10%'},
                {yr:'Retail',v:115,val:'+30%'},
              ].map((d,i) => (
                <g key={i}>
                  <rect x={10+i*54} y={140-d.v-20} width={38} height={d.v} fill={i===5?C.lime:i>=4?C.limeDark:C.border}/>
                  <text x={29+i*54} y={135} textAnchor="middle" style={{fontFamily:'DM Sans,sans-serif',fontSize:'8px',fill:C.muted}}>{d.yr}</text>
                  <text x={29+i*54} y={140-d.v-25} textAnchor="middle" style={{fontFamily:'DM Mono,monospace',fontSize:'8px',fontWeight:700,fill:i>=4?C.forest:C.muted}}>{d.val}</text>
                </g>
              ))}
              <text x={10} y={12} style={{fontFamily:'DM Sans,sans-serif',fontSize:'9px',fill:C.faint}}>Value added at each chain stage (indicative % above farmgate)</text>
            </svg>
            <div style={{marginTop:'8px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
              {[{c:C.border,l:'Production stages'},{c:C.limeDark,l:'Distribution stage'},{c:C.lime,l:'Retail end'}].map((s,i) => (
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
        <Eyebrow>Four Distribution Revenue Streams in Ghana Cannabis</Eyebrow>
        {/* Desktop grid */}
        <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0',marginTop:'14px'}}>
          {[
            {n:'Industrial B2B Distribution',d:'Hemp fibre to textile mills, hempseed oil to cosmetics manufacturers, hemp protein to food companies, hurd to construction materials firms. Large-volume B2B contracts generate steady margin at scale.'},
            {n:'Pharmaceutical Channel',d:'GDP-compliant distribution of medicinal cannabis products to dispensaries and hospitals. Highest per-unit margin in the distribution portfolio — requires GDP certification but rewards it with long-term supply contracts.'},
            {n:'Export Aggregation',d:'Consolidating multiple Licence 01 and 02 outputs into export-grade shipment lots for Licence 09 holders. The wholesale distributor becomes the aggregation point that makes export economically viable for smallholders.'},
            {n:'Regional AfCFTA Distribution',d:'As ECOWAS neighbours develop hemp frameworks, the Ghana-based wholesale distributor becomes the regional hub — supplying West African buyers under AfCFTA preferential trade terms. The AfCFTA Secretariat is in Accra.'},
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
          {n:'Industrial B2B',icon:'🏭',d:'Hemp fibre to textile mills, hempseed oil to cosmetics, hemp protein to food companies. Large-volume B2B contracts at steady margin.'},
          {n:'Pharmaceutical Channel',icon:'💊',d:'GDP-compliant distribution to dispensaries and hospitals. Highest per-unit margin. Requires GDP but rewards with long-term contracts.'},
          {n:'Export Aggregation',icon:'🚢',d:'Consolidating multiple producers into export lots for Licence 09 holders. Enables smallholder export participation.'},
          {n:'AfCFTA Regional Hub',icon:'🌍',d:'West African hemp distribution as ECOWAS neighbours develop frameworks. AfCFTA Secretariat is in Accra.'},
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
      <MobileCollapse num="§ 03" title="Ghana Fit" stat="★★★★★" label="Commodity Distribution Ecosystem">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 03</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Ghana Distribution Infrastructure Fit</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'700px'}}>West Africa's Most Advanced Commodity Distribution Network — Ready to Add Cannabis</h2>
      <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'32px',maxWidth:'700px'}}>
        Ghana's distribution infrastructure for cocoa, cashew, shea, pharmaceutical products, and FMCG goods is the strongest in West Africa. The WMS systems, road-freight networks, cold-chain operators, and sales force management tools that cannabis wholesale requires already exist — they need a cannabis compliance overlay, not a new distribution infrastructure.
      </p>
      <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}}>
        {[
          {
            sector:'Cocoa & Agri-Commodity Trading',tier:'DIRECTLY APPLICABLE',color:C.lime,
            infra:'Aggregation from smallholders, bulk storage, quality grading, export documentation',
            players:'Cocobod, commodity trading houses, licensed buying companies across all regions',
            fit:'Cannabis wholesale parallels cocoa buying: aggregate from farms, grade and QA-check, store, sell to processors and exporters. The organisational model, farmer network relationships, and documentation systems are directly transferable.',
            note:'Over 800,000 cocoa farmers in Ghana — existing aggregation network infrastructure is the template',
          },
          {
            sector:'FMCG Pharmaceutical Distribution',tier:'HIGH FIT',color:C.lime,
            infra:'National distribution to pharmacies, hospitals, and retail; temperature-controlled logistics; regulatory compliance',
            players:'Ernest Chemists, Tobinco Pharmaceuticals, Kama Industries, established pharma distributors',
            fit:'Pharmaceutical distributors already operate GDP-adjacent systems, cold-chain logistics, and sales forces that call on every hospital and pharmacy nationally. Adding medicinal cannabis to their distribution portfolio is an incremental regulatory upgrade, not a new capability.',
            note:'GDP-compliant pharmaceutical distribution for medicinal cannabis is the highest-margin channel in Licence 10',
          },
          {
            sector:'Industrial Agri-Processing Supply Chains',tier:'MEDIUM-HIGH FIT',color:C.limeDark,
            infra:'Bulk raw material supply to food processors, textile manufacturers, cosmetics companies',
            players:'Tema industrial zone manufacturers, food processing clusters, cosmetics sector',
            fit:'Industrial hemp — fibre, hempseed oil, protein — supplies the same industrial buyers as palm oil, shea butter, and textile inputs. B2B distribution to these buyers uses existing commodity trading and industrial supply infrastructure.',
            note:'Tema industrial zone hosts food, cosmetics, and textile manufacturers who are natural hemp ingredient buyers',
          },
          {
            sector:'Export Trading Houses',tier:'MEDIUM FIT',color:C.limeDark,
            infra:'Commodity aggregation for export, Tema port logistics, international buyer relationships',
            players:'GEPA-registered exporters, commodity export trading houses, agri-export firms',
            fit:'Hemp export aggregation — combining output from multiple Licence 01 and 02 holders into export lots — parallels how export trading houses work for cashew, shea, and other agri-commodities. Existing port-logistics relationships and buyer networks reduce market entry time.',
            note:'Export trading house pivot is the most natural entry point for commodity export distribution',
          },
        ].map((r,i) => (
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
              <div style={{fontFamily:F.display,fontSize:'14px',fontWeight:700,color:C.ink,lineHeight:1.2,paddingRight:'12px'}}>{r.sector}</div>
              <div style={{background:r.color,color:C.ink,padding:'2px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,whiteSpace:'nowrap'}}>{r.tier}</div>
            </div>
            {[{l:'Infrastructure',v:r.infra},{l:'Key players',v:r.players},{l:'Fit rationale',v:r.fit}].map((f,j) => (
              <div key={j} style={{display:'flex',gap:'8px',marginBottom:'5px'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'72px',flexShrink:0,marginTop:'2px'}}>{f.l.toUpperCase()}</span>
                <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5}}>{f.v}</span>
              </div>
            ))}
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'8px',marginTop:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>{r.note}</p>
            </div>
          </div>
        ))}
      </div>
      <MobCarousel items={[
        {sector:'Cocoa & Agri Commodity',tier:'DIRECTLY APPLICABLE',color:C.lime,infra:'Smallholder aggregation, bulk storage, quality grading, export docs',players:'Cocobod, commodity trading houses',fit:'Cannabis wholesale parallels cocoa buying. Organisational model and farmer networks directly transferable.',note:'800K+ cocoa farmer aggregation network is the template'},
        {sector:'FMCG Pharma Distribution',tier:'HIGH FIT',color:C.lime,infra:'National pharma distribution to pharmacies and hospitals',players:'Ernest Chemists, Tobinco, established distributors',fit:'Pharma distributors already have GDP-adjacent systems and national sales force. Adding medicinal cannabis is incremental.',note:'Highest-margin channel in Licence 10'},
        {sector:'Industrial Supply Chains',tier:'MEDIUM-HIGH',color:C.limeDark,infra:'Bulk supply to food processors, textile manufacturers',players:'Tema industrial zone manufacturers',fit:'Hemp fibre, oil, protein supplies same industrial buyers as palm oil and shea. Existing B2B relationships.',note:'Tema industrial zone hosts natural hemp ingredient buyers'},
        {sector:'Export Trading Houses',tier:'MEDIUM FIT',color:C.limeDark,infra:'Commodity aggregation for export, Tema logistics',players:'GEPA exporters, agri-commodity export firms',fit:'Hemp export aggregation parallels cashew and shea export trading. Port logistics and buyer network transfer.',note:'Most natural entry for commodity export distribution'},
      ]} renderCard={(r,i) => (
        <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px',height:'100%'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
            <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.ink,lineHeight:1.2}}>{r.sector}</div>
            <div style={{background:r.color,color:C.ink,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,marginLeft:'8px'}}>{r.tier}</div>
          </div>
          {[{l:'Infrastructure',v:r.infra},{l:'Players',v:r.players},{l:'Fit',v:r.fit}].map((f,j) => (
            <div key={j} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'62px',flexShrink:0,paddingTop:'2px'}}>{f.l.toUpperCase()}</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.45}}>{f.v}</span>
            </div>
          ))}
          <div style={{borderTop:`2px solid ${r.color}`,paddingTop:'8px',marginTop:'10px'}}>
            <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>{r.note}</p>
          </div>
        </div>
      )}/>
      <div style={{background:C.paperDark,padding:'24px',borderTop:`3px solid ${C.ink}`}}>
        <Eyebrow>Distribution Infrastructure Requirements vs. Ghana Provision</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',marginTop:'14px'}} className="tc">
          {[
            {param:'WMS / Inventory System',req:'NCC track-and-trace integration',ghana:'Commercial WMS widely available; cannabis NCC integration layer required',fit:'★★★★☆'},
            {param:'Cold Chain (pharma)',req:'GDP-adjacent temperature monitoring',ghana:'Pharma distributors operate cold chain nationally',fit:'★★★★☆'},
            {param:'National Sales Force',req:'B2B account management across sectors',ghana:'FMCG and pharma distributors have national coverage',fit:'★★★★★'},
            {param:'Warehouse Network',req:'NCC-approved secure storage',ghana:'Commodity warehouses widely available; NCC compliance overlay needed',fit:'★★★☆☆'},
            {param:'AfCFTA Trade Network',req:'ECOWAS cross-border distribution',ghana:'Ghana AfCFTA Secretariat host; existing ECOWAS trading relationships',fit:'★★★★☆'},
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
      n:'01',name:'Industrial Hemp B2B Distributor',tag:'ENTRY MODEL',color:C.teal,
      tagline:'Hemp fibre, seed, oil, protein. B2B supply to manufacturers and exporters.',
      scale:'Regional supply network · 5–20 B2B clients · industrial sector focus',
      capital:'$80K–300K (NCC licence, warehouse, WMS, working capital for first orders)',
      timeline:'12–18 months to first revenue',
      revenue:'10–20% gross margin on B2B distribution volumes; recurring supply contracts',
      fit:'★★★★☆ Lowest barrier — leverages existing commodity distribution capability',
      description:'The industrial hemp B2B distributor aggregates hemp biomass, cleaned fibre, hempseed oil, and protein powder from Licence 01 cultivators and Licence 02 processors, and distributes them to industrial buyers: food manufacturers, cosmetics companies, textile mills, and construction materials firms. This model requires no pharmaceutical GDP certification and no Novel Food regulatory pathway — it supplies industrial and food-grade raw materials to companies that already use similar inputs (palm oil, shea butter, flax fibre). The distributor adds value through quality aggregation, consistent supply, COA management, and credit terms that individual small producers cannot offer directly.',
      requirements:['NCC Wholesale & Distribution Licence (Licence 10)','NCC-approved warehouse or use of licensed Licence 06 storage partner','WMS with NCC track-and-trace integration','HACCP or ISO 22000 for food-grade hemp ingredient distribution (hempseed oil, protein)','Credit management system — B2B payment terms typically 30–60 days'],
      advantages:['Leverages existing commodity trading and distribution capability — low additional investment','Industrial hemp buyers (food, cosmetics, textile) are already active in Ghana — no market creation needed','Recurring supply contracts with B2B clients generate predictable monthly revenue','No pharmaceutical GDP or Novel Food regulatory pathway required'],
      risks:['Margin compression as sector matures and direct producer-buyer relationships develop','Working capital intensive — inventory financed between supplier payment and buyer receipt','Quality consistency is critical — one failed lot can lose a B2B client'],
      ideal:'Commodity trading companies adding hemp to portfolio; FMCG distributors; agri-commodity export houses; investors building supply chain position across multiple licence categories',
    },
    {
      n:'02',name:'Pharmaceutical Cannabis Distributor',tag:'GDP CHANNEL',color:C.forest,
      tagline:'GDP-compliant. Medicinal cannabis to dispensaries and hospitals. Highest per-unit margin.',
      scale:'GDP-certified operation · 20–100 pharmacy and dispensary accounts nationally',
      capital:'$200K–600K (GDP certification, cold chain vehicles, pharmaceutical WMS)',
      timeline:'24–36 months (GDP certification adds significant time)',
      revenue:'25–40% gross margin on medicinal cannabis product distribution; pharmaceutical rate premium',
      fit:'★★★★☆ Highest per-unit margin — GDP investment pays off at dispensary sector scale',
      description:'The pharmaceutical cannabis distributor operates a GDP-compliant supply chain for medicinal cannabis products — standardised extracts, CBD oils, pharmaceuticals — from Licence 02 processors to Licence 11 dispensaries, hospitals, and licensed pharmacies. This is the highest per-unit margin distribution model: medicinal cannabis commands 3–5× the price of commodity hemp, and pharmaceutical distribution margins (25–40%) reflect the compliance overhead and service expectations of pharmaceutical buyers. Ghana already has an established pharmaceutical distribution sector with GDP-adjacent systems; adding medicinal cannabis extends this capability rather than building from scratch.',
      requirements:['NCC Wholesale & Distribution Licence (Licence 10)','Ghana FDA GDP certification for pharmaceutical distribution','Temperature-controlled vehicles and cold-storage warehouse','GDP-compliant pharmaceutical WMS: batch traceability, expiry management, recall capability','Superintendent pharmacist as responsible distribution officer'],
      advantages:['Highest per-unit distribution margin in the Licence 10 category','Natural extension for existing pharmaceutical distributors — GDP already operational','Dispensaries (Licence 11) cannot stock medicinal cannabis without GDP-compliant supply chain','First pharmaceutical cannabis distributor has first-mover advantage in all dispensary account relationships'],
      risks:['GDP certification timeline is 18–24 months — cannot generate pharmaceutical revenue until certified','Dependent on Licence 02 processors producing pharmaceutical-grade products — early sector volumes may be limited','Superintendent pharmacist requirement — hard to recruit and retain in Ghana'],
      ideal:'Pharmaceutical distribution companies adding cannabis to portfolio; DFI-backed healthcare supply chain investments; operators already holding Ghana FDA GDP certification for other pharmaceutical products',
    },
    {
      n:'03',name:'Export Aggregation Trader',tag:'SMALLHOLDER INCLUSION',color:C.ink,
      tagline:'Aggregate from multiple producers. Consolidate into export lots. Enable smallholder export.',
      scale:'National aggregation network · 20–100 Licence 01/02 supplier relationships · Tema port logistics',
      capital:'$100K–400K (aggregation warehouse, quality management, export documentation system)',
      timeline:'12–24 months to first export aggregation revenue',
      revenue:'8–15% trading margin on aggregated export lots; documentation and logistics premium',
      fit:'★★★★☆ Strategic — enables smallholder export participation; builds toward AfCFTA hub position',
      description:'The export aggregation trader consolidates hemp production from multiple Licence 01 cultivators and Licence 02 processors into export-grade shipments that Licence 09 export holders can ship to EU, UK, and US buyers. Individual smallholder cultivators produce quantities too small to fill a container or meet EU buyer minimum order requirements; the export aggregator solves this problem — quality-checking, blending to specification, packaging to buyer requirements, and managing export documentation for the consolidated lot. This model creates direct economic value for smallholders by enabling their market access, and positions the distributor as the aggregation hub for Ghana entire hemp export supply chain.',
      requirements:['NCC Wholesale & Distribution Licence (Licence 10)','Quality management capability: COA verification, blending-to-spec, sampling protocols','NCC-approved aggregation warehouse at strategic location (Tema or Kumasi recommended)','Export documentation management: PPRSD phytosanitary coordination, COA compilation, certificate of origin','Relationship network across multiple Licence 01 and 02 holders nationally'],
      advantages:['Structurally essential — individual smallholders cannot export directly — aggregator is the enabling infrastructure','First export aggregator captures the supply relationships with early cultivation licence holders before competitors arrive','Trading margin on consolidated lots plus documentation premium creates layered revenue','Positions as natural ECOWAS regional aggregation hub as neighbouring countries develop hemp sectors'],
      risks:['Quality consistency across multiple supplier lots — blending requires skill and QA infrastructure','Payment terms risk — must pay suppliers promptly while managing export payment cycle (LC or 30-day terms)','Export documentation coordination with PPRSD and NCC adds operational overhead vs. single-producer export'],
      ideal:'Agri-commodity export trading houses; smallholder-inclusive impact investors; operators building a position across both Licence 09 (export) and Licence 10 (wholesale) simultaneously',
    },
    {
      n:'04',name:'Omni-Channel Cannabis Distributor',tag:'MAXIMUM SCALE',color:C.limeDark,
      tagline:'Industrial + pharmaceutical + export aggregation. The full distribution stack.',
      scale:'National warehouse network · multi-channel sales force · all downstream licence holders',
      capital:'$300K–1M (multi-channel distribution infrastructure; GDP certification; multi-category WMS)',
      timeline:'24–36 months to full multi-channel operation',
      revenue:'Blended 15–30% gross margin across all channels; $2M–8M annual revenue at sector maturity',
      fit:'★★★☆☆ Most complex — but creates the most defensible mid-chain position',
      description:'The omni-channel cannabis distributor builds supply relationships across all Licence 01/02 producers and customer relationships across all downstream licence holders — industrial buyers, pharmaceutical dispensaries, and export aggregation clients simultaneously. This is the most operationally complex configuration but creates the strongest mid-chain position: every producer has one distributor to call, and every buyer has one distributor to order from. At scale, this model mirrors how FMCG distributors operate in Ghana today — managing hundreds of SKUs, thousands of client accounts, and nationwide logistics from a central distribution platform.',
      requirements:['NCC Wholesale & Distribution Licence (Licence 10) with broad scope','Ghana FDA GDP certification for pharmaceutical channel','Multi-category WMS: industrial, pharmaceutical, and export inventory management in one system','National warehouse and cold chain infrastructure (or partnership with Licence 06 storage operators)','Sales force covering industrial, pharmaceutical, and export buyer segments nationally'],
      advantages:['Most defensible position — replacing a full-service distributor is extremely disruptive to both producers and buyers','Revenue diversity: when one channel is slow, others compensate','Client stickiness: producers and buyers embedded in the distribution relationship prefer continuity','Optimal AfCFTA regional hub position — single entity managing all outbound West African distribution'],
      risks:['Highest capital requirement — $300K–1M before full operation','Most complex compliance stack — industrial, pharmaceutical, and export regulations simultaneously','Management bandwidth: multi-channel operations require experienced distribution management team'],
      ideal:'Established FMCG or pharmaceutical distributors diversifying into cannabis; DFI-backed supply chain investment platforms; operators targeting the cannabis sector commercial centre with patient capital',
    },
  ];
  const m = models[active];
  return (
    <div id="s04" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <MobileCollapse num="§ 04" title="Business Models" stat="4 Models" label="$80K to $1M Entry">
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 04</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Business Models</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Four Distribution Configurations — from Industrial B2B to Omni-Channel</h2>
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
      <MobileCollapse num="§ 05" title="Unit Economics" stat="15–40%" label="Distribution Gross Margin">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 05</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Unit Economics</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'680px'}}>What Wholesale Distribution Revenue Looks Like Across Four Product Channels</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'36px',maxWidth:'700px'}}>
        Distribution margins vary significantly by product category — from 8–12% on commodity hemp to 25–40% on pharmaceutical products. The blended model (multiple channels) provides the best margin stability, but each channel can stand alone. Working capital management — the gap between supplier payment and buyer receipt — is the key operational discipline.
      </p>
      <div style={{background:C.paperDark,padding:'28px',marginBottom:'32px'}}>
        <Eyebrow>Gross Margin by Distribution Channel</Eyebrow>
        <div style={{marginTop:'18px'}}>
          {[
            {label:'Commodity hemp (fibre, raw biomass)',v:20,max:100,note:'8–12% gross margin; volume-dependent; commodity pricing pressure'},
            {label:'Hemp food ingredients (oil, protein, seed)',v:40,max:100,note:'15–20% gross margin; higher value per kg; quality premium'},
            {label:'CBD cosmetic ingredients (B2B)',v:65,max:100,note:'20–30% gross margin; technical specification adds value'},
            {label:'Pharmaceutical medicinal cannabis (GDP)',v:95,max:100,note:'25–40% gross margin; pharmaceutical pricing; GDP compliance premium'},
          ].map((s,i) => (
            <div key={i} style={{marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',flexWrap:'wrap',gap:'6px'}}>
                <div>
                  <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{s.label}</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,marginLeft:'10px'}}>{s.note}</span>
                </div>
                <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.forest}}>{s.v/4}%+</span>
              </div>
              <div style={{height:'16px',background:C.border,position:'relative'}}>
                <div style={{position:'absolute',left:0,top:0,height:'100%',width:`${s.v}%`,background:i===3?C.lime:i>=2?C.limeDark:C.forest}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Revenue Scenarios by Distribution Scale</div>
          {[
            {item:'Industrial B2B (Year 1: 5 clients)',range:'$80K–200K/yr',pct:'Entry phase',note:'5 manufacturing clients × $16K–40K average annual order value'},
            {item:'Industrial B2B (Year 3: 20 clients)',range:'$500K–1.2M/yr',pct:'Growth',note:'20 clients; mix of food, cosmetics, textile buyers'},
            {item:'Pharmaceutical channel (10 dispensaries)',range:'$300K–800K/yr',pct:'GDP certified',note:'10 dispensaries × $30K–80K annual medicinal product supply'},
            {item:'Export aggregation (50 tonne/year)',range:'$25K–75K/yr',pct:'Per year',note:'8–12% trading margin on consolidated export lots'},
            {item:'Omni-channel (Year 4+)',range:'$2M–8M/yr',pct:'Scale',note:'All channels combined; national distribution platform'},
            {item:'AfCFTA regional (Year 5+)',range:'$1M–5M/yr',pct:'Regional',note:'West African hemp distribution as ECOWAS neighbours develop'},
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Working Capital Structure</div>
          <div style={{background:C.ink,padding:'20px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Working Capital Cycle — Cannabis Distributor</div>
            {[
              {scale:'Pay supplier (Licence 01/02)', capex:'Day 0–30', note:'Producer payment: prompt payment strengthens supplier relationships'},
              {scale:'Inventory holding period', capex:'7–30 days', note:'Time between receipt from supplier and delivery to buyer'},
              {scale:'Invoice buyer', capex:'Day 30–60', note:'B2B buyers: 30–60 day payment terms standard in Ghana'},
              {scale:'Net working capital gap', capex:'30–90 days', note:'Finance this gap via revolving credit or invoice factoring'},
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
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>An industrial B2B distributor with 5–8 active clients and $200K–400K annual revenue at 15% gross margin generates $30K–60K gross profit annually. Operating costs (staff, WMS, warehouse, vehicle) of $60K–100K/yr require volume growth to <strong>$400K–700K revenue before operating breakeven.</strong> Typically 18–24 months.</p>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>Pharmaceutical channel economics are much stronger: 25–40% margins on smaller volumes break even faster once GDP certification is achieved.</p>
            <div style={{borderLeft:`2px solid ${C.amber}`,paddingLeft:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.amber,lineHeight:1.6}}>⚠ Working capital is the primary financial risk — undercapitalised distributors default on supplier payments. Establish a revolving credit facility before first purchase order.</p>
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
    {num:'01',name:'Cultivation',pos:'UPSTREAM',color:C.teal,rel:'SUPPLIES'},
    {num:'02',name:'Processing',pos:'MID-CHAIN',color:C.forest,rel:'SUPPLIES'},
    {num:'08',name:'Import',pos:'TRADE',color:C.teal,rel:'SUPPLIES'},
    {num:'10',name:'Wholesale',pos:'MID-CHAIN',color:C.lime,rel:null,active:true},
    {num:'05',name:'Testing Lab',pos:'ENABLING',color:C.limeDark,rel:'CERTIFIES'},
    {num:'06',name:'Storage',pos:'ENABLING',color:C.limeDark,rel:'HOLDS'},
    {num:'07',name:'Transport',pos:'ENABLING',color:C.limeDark,rel:'DELIVERS'},
    {num:'09',name:'Export',pos:'TRADE',color:C.teal,rel:'AGGREGATES FOR'},
    {num:'11',name:'Dispensing',pos:'DOWNSTREAM',color:C.forest,rel:'DISTRIBUTES TO'},
    {num:'04',name:'R&D',pos:'SPECIALIST',color:C.teal,rel:'SUPPLIES DATA'},
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
      <MobileCollapse num="§ 06" title="Value Chain" stat="Central Node" label="Between All Producers & Buyers">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 06</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Value Chain Position</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Commercial Centre — Every Producer Needs to Sell, Every Buyer Needs to Source</h2>
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Wholesale Receives (Supply Side)</div>
          {[
            {lic:'Licence 01 — Cultivation',role:'Primary supplier of hemp biomass — flower, fibre, seed. Wholesale distributor is the aggregation point for multiple cultivation licence holders.'},
            {lic:'Licence 02 — Processing',role:'Processed hemp products — cleaned fibre, seed oil, protein, extracts. Wholesale takes processed goods to industrial and pharmaceutical buyers.'},
            {lic:'Licence 08 — Import',role:'Imported products that need domestic distribution — certified seed to Licence 01 holders, equipment to Licence 02 processors.'},
            {lic:'Licence 05 — Testing Lab',role:'COA validation: wholesale distributor verifies all incoming product has current, valid COA before accepting into inventory.'},
          ].map((r,i) => (
            <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'3px'}}>{r.lic}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6}}>{r.role}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Wholesale Supplies (Demand Side)</div>
          {[
            {lic:'Licence 11 — Dispensing',role:'Medicinal cannabis products to dispensaries and pharmacies. Wholesale is the mandatory supply chain layer between processors and dispensing outlets.'},
            {lic:'Licence 09 — Export',role:'Export aggregation: consolidating multiple supplier lots into export-grade shipments that Licence 09 holders can ship to EU/UK/US buyers.'},
            {lic:'Industrial Manufacturers',role:'Hemp fibre to textile mills, hempseed oil to cosmetics companies, hemp protein to food manufacturers. B2B industrial supply is the primary volume channel.'},
            {lic:'ECOWAS Regional Buyers',role:'As West African neighbours develop hemp frameworks, Ghana wholesale distributors supply regional buyers under AfCFTA preferential trade terms.'},
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
      <MobileCollapse num="§ 07" title="Competition" stat="★★★★★" label="Ghana Distribution Ecosystem">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 07</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Competitive Landscape</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Ghana vs. Seven African Peers — Cannabis Distribution and Trading Infrastructure</h2>
      {/* Desktop table */}
      <div className="mob-hide" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'680px'}}>
          <thead>
            <tr style={{background:C.ink}}>
              {['Country','Status','Distribution Infrastructure','Trading Ecosystem','Port Access','Framework','BRIDGE View'].map((h,i) => (
                <th key={i} style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',textAlign:'left',borderRight:i<6?`1px solid rgba(255,255,255,0.05)`:'none'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★ — FMCG + pharma + agri',port:'★★★★★ — Tema, ECOWAS hub',labour:'★★★★★ — Tema port + AfCFTA host',fw:'★★★☆☆ — NCC L.I. 2475',view:'Most advanced commodity and pharma distribution ecosystem in West Africa + AfCFTA hub',hl:true},
              {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ — Advanced distribution',port:'★★★★☆ — Durban, Cape Town',labour:'★★★★☆',fw:'★★★★★',view:'Most developed cannabis distribution ecosystem in Africa; active wholesale operators'},
              {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★★☆ — EU logistics links',port:'★★★★★ — EU proximity',labour:'★★★★☆',fw:'★★★☆☆',view:'Strong pharma and food distribution; EU-linked logistics advantageous for CBD ingredient trade'},
              {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★☆☆☆ — Very limited',port:'★☆☆☆☆ — Landlocked via SA',labour:'★★★☆☆',fw:'★★★★★',view:'Limited domestic distribution capacity; dependent on SA for export logistics'},
              {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★★☆☆ — FMCG sector active',port:'★★★☆☆ — Mombasa',labour:'★★★☆☆',fw:'★★☆☆☆',view:'Active FMCG distribution sector; Mombasa port; East Africa distribution hub potential'},
              {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ — Limited',port:'★☆☆☆☆ — Landlocked',labour:'★★☆☆☆',fw:'★★★☆☆',view:'Limited distribution infrastructure; landlocked; domestic market focused'},
              {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★★☆☆☆ — Basic',port:'★☆☆☆☆ — Landlocked',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Very limited distribution capability; landlocked; FMCG sector underdeveloped'},
              {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★☆☆☆☆ — Pre-framework',port:'★★☆☆☆',labour:'★☆☆☆☆',fw:'★★☆☆☆',view:'No cannabis distribution framework; general trade infrastructure limited'},
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
        {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★ — FMCG + pharma',port:'★★★★★ — Tema, AfCFTA host',labour:'★★★★★',fw:'★★★☆☆',view:'Most advanced commodity + pharma distribution in West Africa + AfCFTA Secretariat in Accra.',hl:true},
        {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ — Advanced',port:'★★★★☆ — Durban',labour:'★★★★☆',fw:'★★★★★',view:'Most developed cannabis distribution ecosystem in Africa; active wholesale operators'},
        {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★★☆ — EU logistics',port:'★★★★★ — EU proximity',labour:'★★★★☆',fw:'★★★☆☆',view:'Strong pharma distribution; EU-linked logistics for CBD trade'},
        {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★☆☆☆ — Very limited',port:'★☆☆☆☆ — Via SA',labour:'★★★☆☆',fw:'★★★★★',view:'Limited domestic distribution; landlocked; SA-dependent'},
        {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★★☆☆ — FMCG active',port:'★★★☆☆ — Mombasa',labour:'★★★☆☆',fw:'★★☆☆☆',view:'Active FMCG sector; East Africa hub potential'},
        {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ — Limited',port:'★☆☆☆☆ — Landlocked',labour:'★★☆☆☆',fw:'★★★☆☆',view:'Limited infrastructure; landlocked; domestic focused'},
        {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★★☆☆☆ — Basic',port:'★☆☆☆☆ — Landlocked',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Very limited; landlocked; FMCG sector underdeveloped'},
        {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★☆☆☆☆ — Pre-framework',port:'★★☆☆☆',labour:'★☆☆☆☆',fw:'★★☆☆☆',view:'No cannabis framework; general infrastructure limited'},
      ]}/>
      <PullQuote>
        Ghana is the only West African country with both a comprehensive cannabis wholesale licence framework and the AfCFTA Secretariat headquartered in Accra. The cannabis wholesale distributor who builds the dominant position in Ghana's domestic distribution market also sits at the commercial centre of West Africa's cannabis trade future.
      </PullQuote>
      <div style={{background:C.paperDark,padding:'20px',marginTop:'8px'}}>
        <Eyebrow>Ghana Wholesale Distribution Advantages</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',marginTop:'14px'}} className="tc3">
          {[
            {title:'Existing Distribution Infrastructure',body:'Ghana has the most advanced FMCG, pharmaceutical, and commodity distribution networks in West Africa. Cannabis wholesale adds a compliance layer to existing systems — not a new infrastructure build. Entry cost is significantly lower than in markets where distribution must be built from scratch.'},
            {title:'AfCFTA Secretariat in Accra',body:'Ghana hosts the secretariat of the African Continental Free Trade Area — the continent largest trade framework. As ECOWAS neighbours develop cannabis frameworks, a Ghana-based wholesale distributor is structurally positioned as the regional distribution hub with first-mover policy access.'},
            {title:'Cocoa Aggregation Template',body:'Ghana has 800,000+ licensed cocoa farmers aggregated through a national cooperative and buying company network. This exact organisational model — aggregate from smallholders, QA-check, bulk sell downstream — is directly applicable to cannabis wholesale. No other African cannabis market has this aggregation infrastructure.'},
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
      <MobileCollapse num="§ 08" title="Regulatory Roadmap" stat="5 Phases" label="to First Distribution Contract">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 08</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Regulatory Roadmap</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>From NCC Application to First Wholesale Distribution Contract</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px'}} className="tc mob-hide">
        <div>
          {[
            {phase:'Phase 1',label:'NCC Licence Application & Infrastructure (Months 1–4)',steps:['Submit NCC Wholesale & Distribution Licence (Licence 10) application with proposed product scope and buyer categories','Secure warehouse premises: NCC-approved storage with climate control, security systems, and inventory management capability','Deploy WMS (Warehouse Management System) with NCC track-and-trace integration — all inbound/outbound movements logged','Establish trade finance facility with Ghanaian commercial bank: revolving credit line for inventory financing','Identify and shortlist supplier relationships: Licence 01 and Licence 02 holders who need a distribution partner'],color:C.teal},
            {phase:'Phase 2',label:'Supplier & Customer Relationship Development (Months 2–6)',steps:['Sign supply agreements with 3–5 Licence 01 cultivation holders: volume commitments, quality specifications, pricing formula, payment terms','Sign supply agreements with 1–2 Licence 02 processors: product specification, COA requirements, delivery schedule','Identify and qualify industrial buyers: food manufacturers, cosmetics companies, textile mills — confirm hemp product demand and procurement process','For pharmaceutical channel: initiate Ghana FDA GDP certification process (if targeting Licence 11 dispensaries) — 18–24 month process','Register as B2B supplier with target industrial buyers; obtain approved vendor status from procurement teams'],color:C.forest},
            {phase:'Phase 3',label:'NCC Approval & Compliance Systems (Months 3–8)',steps:['NCC warehouse inspection: storage conditions, security systems, WMS documentation reviewed','Implement NCC track-and-trace integration: all product movements logged in real time per NCC requirements','Establish COA management workflow: receive, verify, and file batch COAs from all suppliers before accepting product into inventory','Set up compliance reporting: monthly NCC inventory reports, movement records, licence holder counterparty verification','Train all warehouse staff on cannabis compliance: product handling, chain-of-custody, restricted access protocols'],color:C.limeDark},
            {phase:'Phase 4',label:'Commercial Operations Launch (Months 8–15)',steps:['Execute first purchase orders from Licence 01/02 suppliers — take delivery with full COA and NCC manifest documentation','Execute first sales orders to industrial or export buyers — deliver with COA package and NCC movement records','Implement payment cycle management: 30-day supplier terms, 45-day buyer terms, revolving credit bridge','Apply for HACCP or ISO 22000 food-grade certification if distributing food-grade hemp ingredients to food manufacturers','File first monthly NCC wholesale report: inventory by product category, counterparty licence numbers, movement volumes'],color:C.amber},
            {phase:'Phase 5',label:'Scale & Regional Distribution (Months 15+)',steps:['Expand supplier network: sign distribution agreements with additional Licence 01/02 holders nationally','Expand buyer network: add ECOWAS regional buyers as West African hemp frameworks develop under AfCFTA','Add pharmaceutical channel once GDP certification is achieved — highest margin expansion','Apply for NCC scope expansion if adding new product categories beyond initial licence scope','Annual NCC licence review and renewal; update WMS and compliance systems as NCC requirements evolve'],color:C.lime},
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
              {item:'NCC wholesale licence renewal',detail:'Every 3 years; product scope and warehouse details re-registered'},
              {item:'Monthly NCC inventory reports',detail:'All inbound (from licences), in-stock inventory by product, outbound (to licences) — batch and licence level'},
              {item:'COA file maintenance',detail:'All batch COAs from suppliers retained minimum 5 years; available on NCC audit request'},
              {item:'Counterparty licence verification',detail:'Before each transaction: verify buyer and seller NCC licence status — do not transact with unlicensed parties'},
              {item:'Staff background checks',detail:'All staff with product access: background checks maintained current; authorised persons list filed with NCC'},
              {item:'WMS audit trail',detail:'All inventory movements logged with timestamp, user, batch, quantity, counterparty — immutable record'},
              {item:'Adverse event reporting',detail:'Product recall (COA failure), theft, licence violation by counterparty — immediate NCC notification'},
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
              {body:'Ghana Food and Drugs Authority (FDA)',role:'GDP certification for pharmaceutical distribution; HACCP/ISO 22000 for food-grade hemp ingredient distribution'},
              {body:'Ghana Standards Authority (GSA)',role:'HACCP certification for food-grade distribution; quality standards for hemp food ingredients'},
              {body:'Ghana Revenue Authority (GRA)',role:'VAT registration for B2B distribution; withholding tax obligations on supplier and buyer payments'},
              {body:'Environmental Protection Agency (EPA)',role:'Waste management for damaged or expired cannabis product destruction — EPA permit required for destruction events'},
              {body:'AfCFTA Secretariat (Accra)',role:'Rules of origin documentation for intra-African trade; AfCFTA preferential tariff claims for ECOWAS distribution'},
            ].map((r,i) => (
              <div key={i} style={{padding:'7px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.body}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>{r.role}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.amber}`,paddingLeft:'14px',background:C.paper,padding:'14px 14px 14px 16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>Working Capital Default — the Most Common Distribution Failure Mode</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.65,color:C.ink}}>Undercapitalised distributors fail when they cannot pay suppliers on time after extending credit to slow-paying buyers. <strong>Never begin purchasing from suppliers without a revolving credit facility in place. Match buyer payment terms to your credit facility — if your credit allows 60 days, offer buyers maximum 45 days to maintain buffer. Do not sign supply agreements until your bank facility is confirmed. Undercapitlisation is the primary cause of distribution company failure in every consumer goods sector in Ghana.</strong></p>
          </div>
        </div>
      </div>
      <MobPhaseAccordion phases={[
        {phase:'Phase 1',label:'NCC Licence & Infrastructure (Months 1–4)',color:C.teal,steps:['Submit NCC Licence 10 application with product scope and buyer categories','Secure NCC-approved warehouse with climate control, security, WMS','Deploy WMS with NCC track-and-trace integration','Establish revolving credit facility with Ghanaian bank','Identify supplier relationships: Licence 01 and 02 holders needing distribution']},
        {phase:'Phase 2',label:'Supplier & Customer Development (Months 2–6)',color:C.forest,steps:['Sign supply agreements with 3–5 Licence 01 cultivation holders','Sign supply agreements with 1–2 Licence 02 processors','Qualify industrial buyers: food, cosmetics, textile manufacturers','Begin Ghana FDA GDP certification if targeting pharmaceutical channel','Register as approved vendor with target industrial buyers']},
        {phase:'Phase 3',label:'NCC Approval & Compliance (Months 3–8)',color:C.limeDark,steps:['NCC warehouse inspection: storage, security, WMS reviewed','Implement NCC track-and-trace real-time integration','COA management workflow: verify all supplier batches before acceptance','Monthly NCC reporting system configured and tested','Staff training: cannabis compliance, chain-of-custody, restricted access']},
        {phase:'Phase 4',label:'Commercial Launch (Months 8–15)',color:C.amber,steps:['First purchase orders from Licence 01/02 suppliers with NCC manifest','First sales orders to industrial or export buyers with COA package','Payment cycle management: 30-day supplier, 45-day buyer, credit bridge','HACCP/ISO 22000 application if distributing food-grade ingredients','First monthly NCC wholesale inventory report filed']},
        {phase:'Phase 5',label:'Scale & Regional (Months 15+)',color:C.lime,steps:['Expand supplier network nationally','Add ECOWAS regional buyers under AfCFTA','Pharmaceutical channel launch after GDP certification','NCC scope expansion for new product categories','Annual NCC licence renewal']},
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
            r:'Working capital default — unable to pay suppliers after extending credit to slow-paying buyers',
            sev:'HIGH',likelihood:'High (without proper facility)',cat:'Financial',
            m:'This is the most common distribution company failure mode. Never commence purchasing without a confirmed revolving credit facility. Match buyer payment terms to bank facility tenure — if credit allows 60 days, offer buyers maximum 45 days to maintain buffer. Do not over-extend credit to new buyers — require 50% prepayment or LC for first 2–3 orders. Establish credit limits per buyer and enforce them. Cash flow management is the distribution business; get it wrong once and it cascades.',
          },
          {
            r:'Handling non-compliant product — distributor accepts batches with invalid or failing COAs',
            sev:'HIGH',likelihood:'Medium (without rigorous QA)',cat:'Compliance / Legal',
            m:'NCC compliance responsibility does not stop at the producer — the wholesale distributor is jointly responsible for distributing compliant, tested product. Implement a strict goods-receipt procedure: every inbound batch must have a current ISO 17025 COA before acceptance. Reject batches without valid COAs regardless of supplier pressure. Designate a compliance officer whose role includes incoming product verification. Do not rely solely on supplier-provided documentation — spot-check with independent testing.',
          },
          {
            r:'Slow sector growth — insufficient licence holders to generate distribution volume',
            sev:'MEDIUM-HIGH',likelihood:'Medium (Year 1–2)',cat:'Commercial',
            m:'Build multi-sector distribution from Day 1. Industrial hemp buyers (food manufacturers, cosmetics companies) may be addressable before the cannabis sector fully scales. Cocoa, shea, and palm oil distribution clients can share distribution infrastructure during the cannabis sector ramp-up period. Structure the business to be viable at low initial cannabis volumes while building toward full-sector coverage.',
          },
          {
            r:'Buyer default or payment delay — B2B clients fail to pay on agreed terms',
            sev:'MEDIUM-HIGH',likelihood:'Medium',cat:'Financial',
            m:'Trade credit insurance for new B2B clients is strongly recommended. Require irrevocable LC or 50% prepayment for any client placing first order. Implement credit scoring and credit limits per buyer. Do not extend credit beyond 60 days in Ghana market context. Engage debt recovery services early — do not allow overdue accounts to age past 90 days before action.',
          },
          {
            r:'Counterparty licence suspension or revocation — NCC action on supplier or buyer',
            sev:'MEDIUM',likelihood:'Low-Medium',cat:'Compliance',
            m:'Verify NCC licence status of all counterparties before each transaction — not just at contract signing. Build licence verification into your WMS workflow as an automated pre-order check. If a supplier or buyer licence is suspended, immediately suspend all transactions and notify NCC. Maintain product segregation for goods from any licence holder under NCC review.',
          },
          {
            r:'NCC track-and-trace system — technology requirements create compliance backlog',
            sev:'MEDIUM',likelihood:'Medium (framework still building)',cat:'Regulatory / Technology',
            m:'Deploy WMS with flexible NCC integration architecture from Day 1. Do not wait for the final NCC system specification before purchasing WMS — deploy a system that can connect to multiple reporting formats. Build manual reporting capability as a backup. Engage NCC early and maintain an open compliance relationship — report any system difficulties promptly rather than accumulating unreported inventory.',
          },
          {
            r:'GDP certification for pharmaceutical channel takes longer than expected',
            sev:'LOW-MEDIUM',likelihood:'Medium',cat:'Regulatory',
            m:'Do not commit dispensary supply contracts before GDP certification is confirmed. Generate revenue from industrial distribution channel while GDP process is underway. Engage a GDP consultant from Year 1 if pharmaceutical channel is part of the strategy — do not treat it as a Year 2–3 planning exercise. Build GDP infrastructure (cold chain, temperature monitoring, SOP documentation) in parallel with NCC licence setup.',
          },
          {
            r:'AfCFTA trade rules on cannabis — ECOWAS cross-border distribution constraints',
            sev:'LOW-MEDIUM',likelihood:'Low (Years 1–3)',cat:'Legal',
            m:'ECOWAS countries have divergent cannabis regulatory frameworks. Do not plan AfCFTA cross-border distribution until destination-country cannabis laws have been verified country by country. Monitor ECOWAS cannabis law developments closely. Engage AfCFTA Secretariat policy contacts about cannabis product classification under the AfCFTA tariff schedule. This is a 3–5 year opportunity — prepare the capability now, execute when the regulatory pathway is clear.',
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
    {dim:'Market Opportunity',score:76,weight:'30%',rationale:'Every transaction in the cannabis value chain generates a distribution event. Industrial hemp B2B markets (food, cosmetics, textile) are accessible from Day 1. Pharmaceutical channel adds high-margin revenue. AfCFTA regional distribution opportunity is a 3–5 year prize that compounds the Ghana market. Score reflects genuine multi-channel demand from a rapidly developing sector.'},
    {dim:'Development Impact',score:68,weight:'30%',rationale:'Wholesale creates market liquidity — without distribution infrastructure, smallholder cultivators cannot access industrial buyers, and dispensaries cannot access medicinal cannabis. Impact is enabling: it makes the sector function at scale and supports smallholder inclusion in the value chain. Direct employment in distribution is moderate; multiplier effect on every other licence is high.'},
    {dim:'Implementation Feasibility',score:78,weight:'25%',rationale:'Ghana has the strongest commodity and pharmaceutical distribution infrastructure in West Africa. WMS systems, cold chain logistics, B2B sales forces, and trade finance facilities all exist and are in active use. Cannabis compliance overlay is the only significant additional requirement. Highest feasibility score in the enabling licence category.'},
    {dim:'Financial Sustainability',score:72,weight:'15%',rationale:'Distribution generates recurring transaction revenue from both supply and demand sides. Margin is moderate but predictable. Working capital management is the key sustainability discipline. Pharmaceutical channel improves margin profile significantly. AfCFTA regional distribution creates a long-duration revenue growth pathway.'},
  ];
  return (
  <div id="s10" className="pad-section" style={{background:C.ink,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 10" title="BRIDGE Score™" stat="74/100" label="Core Tier · Mid-Chain" onDark={true}>
      <div style={{borderTop:`6px solid ${C.paper}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 10</span>
        <Eyebrow light>BRIDGE Impact Score™</Eyebrow>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Wholesale Scores 74/100 — Commercial Engine, Working Capital Discipline, AfCFTA Strategic Value</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'40px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Composite Score</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(72px,12vw,120px)',fontWeight:500,color:C.lime,lineHeight:1}}>74</div>
            <div style={{fontFamily:F.mono,fontSize:'clamp(22px,4vw,36px)',fontWeight:300,color:'rgba(184,217,53,0.3)',lineHeight:1,marginBottom:'6px'}}>/100</div>
          </div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.28)',letterSpacing:'0.5px',marginBottom:'28px'}}>Core Tier · Mid-Chain · NCC Licence 10</div>
          <ScoreBar label="Market Opportunity  ×30%" value={76} onDark/>
          <ScoreBar label="Development Impact  ×30%" value={68} onDark/>
          <ScoreBar label="Impl. Feasibility  ×25%" value={78} onDark/>
          <ScoreBar label="Financial Sustainability  ×15%" value={72} onDark/>
          <div style={{marginTop:'20px',borderTop:`1px solid rgba(255,255,255,0.08)`,paddingTop:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'10px'}}>Quick Parameters</div>
            {[{l:'Entry Barrier',v:'Medium (leverage existing infra)'},{l:'Capital Intensity',v:'Medium (working capital dominant)'},{l:'Timeline to Revenue',v:'12–18 months'},{l:'Licence Tier',v:'Core · Mid-Chain'}].map((p,i) => (
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
    {cat:'NCC Wholesale & Distribution Licence',range:'$2K–8K',note:'Application + 3-year licence; confirm fee with NCC Cannabis Dept.'},
    {cat:'Warehouse lease + NCC compliance fit-out',range:'$15K–60K',note:'NCC-approved storage: climate control, security, clean floors'},
    {cat:'WMS software + NCC track-and-trace integration',range:'$5K–20K',note:'Inventory management + NCC reporting module'},
    {cat:'Revolving credit facility (bank)',range:'$50K–200K limit',note:'Critical — trade finance for inventory purchase-to-sale cycle'},
    {cat:'Delivery vehicles (lease or purchase)',range:'$20K–80K',note:'Enclosed, secure — own or long-term lease for delivery operations'},
    {cat:'Cold chain equipment (pharmaceutical channel)',range:'$10K–40K',note:'If targeting pharmaceutical channel — GDP compliance requires this'},
    {cat:'HACCP/ISO 22000 food-grade certification',range:'$5K–15K',note:'For distributing hemp food ingredients — annual certification'},
    {cat:'Staff (4–8 persons)',range:'$30K–90K/yr',note:'Warehouse ops, compliance officer, sales, finance — Ghana salary scale'},
    {cat:'Working capital buffer (6 months operational)',range:'$30K–100K',note:'Operating costs before distribution volume reaches breakeven'},
  ];
  const SHOW_FIRST = 4;
  return (
  <div id="s11" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 11" title="Deployment" stat="$80K+" label="Industrial B2B Entry Capital">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 11</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Deployment Parameters</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>What It Takes to Launch Ghana's First Cannabis Wholesale Distribution Operation</h2>
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
              {role:'Distribution Manager',spec:'FMCG or pharmaceutical distribution experience; NCC compliance primary responsibility; supplier and buyer account management'},
              {role:'Compliance & WMS Officer',spec:'NCC track-and-trace system management; COA verification; batch record keeping; monthly NCC reporting'},
              {role:'Warehouse Supervisor',spec:'Inventory management; goods receipt and dispatch; temperature monitoring; security protocols'},
              {role:'Sales Executive (B2B)',spec:'Industrial buyer account management; new client acquisition; food/cosmetics/textile sector knowledge'},
              {role:'Finance / Credit Manager',spec:'Working capital management; revolving credit facility; buyer credit limit enforcement; supplier payment scheduling'},
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
              Ghana's cannabis sector launches in 2026 with multiple licence categories producing and consuming product simultaneously. The first licensed wholesale distributor builds the commercial relationships — with Licence 01 cultivators who need buyers, with Licence 02 processors who need sales coverage, with industrial manufacturers who need hemp ingredient suppliers — before any competitor can establish them.
            </p>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.7)',lineHeight:1.75,marginBottom:'16px'}}>
              Distribution relationships are sticky. Once a cultivator is signed to a distribution agreement, a food manufacturer is an approved vendor, and a dispensary has an active supply contract, the cost of switching to a new distributor is high. The early-mover distributor compounds this advantage month by month as the sector grows.
            </p>
            {[
              {l:'NCC application start',v:'Now — Q2 2026'},
              {l:'First distribution contract signed',v:'Q4 2026 – Q1 2027'},
              {l:'First B2B delivery executed',v:'Q4 2026 – Q2 2027'},
              {l:'AfCFTA regional distribution',v:'2029–2031'},
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
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.45)',letterSpacing:'0.3px'}}>Licence 10 of 11 · Ghana Cannabis Intelligence</div>
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
export default function WholesaleBrief() {
  const coverLogoRef = useRef(null);
  return (
    <div style={{fontFamily:F.body,background:C.paper}}>
      <DocumentGlobalStyles/>
      <LicenceMobileNav sections={NAV_SECTIONS}/>
      <DocumentTopBar coverLogoRef={coverLogoRef} breadcrumb="Ghana Cannabis Intelligence · Licence 10 · Wholesale · Members Brief" mobileBreadcrumb="10 · Wholesale"/>
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
