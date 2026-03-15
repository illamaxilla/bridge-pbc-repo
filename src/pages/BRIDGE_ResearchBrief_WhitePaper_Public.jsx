import { useState, useEffect, useRef } from "react";

import { C, F } from '../theme';
/* ─────────────────────────────────────────────────────────────────────────
   BRIDGE RESEARCH BRIEF  ·  WHITE PAPER TEASER
   "The Architecture of Opportunity: A Framework for Ghana's Development"
   Personality: Academic-editorial hybrid — chapter tabs, abstract page,
   footnotes as design elements, author credentials, journal-like layout
───────────────────────────────────────────────────────────────────────── */

const Logo=({height=28,variant='white'})=>{const tf=variant==='white'?'#ffffff':'#1B4D3E';return(<svg height={height} viewBox="0 0 4113.8 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}><polygon fill="#1B4D3E" stroke="#1B4D3E" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/><path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1Z"/><path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4Z"/><path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1Z"/><path fill={tf} d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4c-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1c31.6,18.3,57,47.9,72.9,84.6c29.9,60.2,91.8,84.9,149.2,51.8c9.7-5.5,17.6-11.8,24.2-18.5Z"/><path fill={tf} d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1c20.7,15.4,38.5,34.7,52.2,57c13.3-10,27.7-18.6,43-25.4c27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6Z"/><rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/><rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/><path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7c0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8Z"/><rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/><rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/><rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/></svg>);};

const Gf=()=>(<style>{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{background:${C.paper};-webkit-font-smoothing:antialiased;}.dc::first-letter{font-family:${F.display};font-size:4.5em;font-weight:900;float:left;line-height:0.8;margin:0.1em 0.12em 0 0;color:${C.forest};}sup{font-family:${F.mono};font-size:9px;color:${C.lime};vertical-align:super;margin-left:1px;}.hm{display:none!important;}@media print{.np{display:none!important;}}@media(max-width:900px){.tc{grid-template-columns:1fr!important;}}@media(max-width:600px){.tc{grid-template-columns:1fr!important;}.mob-hide{display:none!important;}.mob-show{display:block!important;}.pad-topbar{padding:9px 16px!important;}.pad-footer{padding:20px 16px!important;}.pad-cover-top{padding:10px 16px!important;}.pad-section{padding:32px 16px!important;}.cover-left{padding:28px 20px!important;}.cover-right{padding:20px 16px!important;}.gate-cta{flex-direction:column!important;}.gate-cta a{text-align:center!important;width:100%!important;box-sizing:border-box!important;}.rb-body{gap:32px!important;}.method-grid{gap:12px!important;}}`}</style>);

const TopBar=({coverLogoRef})=>{
  const[past,setPast]=useState(false);
  useEffect(()=>{const fn=()=>{if(!coverLogoRef?.current)return;setPast(coverLogoRef.current.getBoundingClientRect().bottom<0);};window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn);},[coverLogoRef]);
  return(
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 56px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'180px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <Logo height={18} variant="dark"/>
          <div style={{width:'1px',height:'14px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.forest,background:'rgba(27,77,62,0.08)',padding:'3px 8px'}}>Research Brief</span>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,background:C.paperDark,padding:'3px 8px'}}>White Paper · Public Excerpt</span>
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>bridgepbc.com/research</span>
        <a href="#" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px'}}>Members</a>
      </div>
    </div>
  );
};

/* ── COVER: Journal / academic masthead ─────────────────────────────────── */
const Cover=({logoRef})=>(
  <div style={{background:C.paper,minHeight:'100vh',display:'flex',flexDirection:'column',borderBottom:`1px solid ${C.border}`}}>
    {/* Journal header band */}
    <div ref={logoRef} className="pad-cover-top" style={{background:C.forest,padding:'12px 80px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={20} variant="white"/>
        <div className="mob-hide" style={{width:'1px',height:'16px',background:'rgba(255,255,255,0.2)'}}/>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.5)'}}>BRIDGE Research Series</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.3)'}}>BRIDGE-WP-01-2025</span>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,border:`1px solid rgba(184,217,53,0.35)`,padding:'2px 8px',letterSpacing:'1px'}}>PUBLIC EXCERPT</span>
      </div>
    </div>
    <div style={{height:'3px',background:C.lime}}/>

    {/* Main cover layout */}
    <div style={{flex:1,display:'grid',gridTemplateColumns:'1fr 340px',gap:'0'}} className="tc">
      {/* Left: title area */}
      <div className="cover-left" style={{padding:'64px 64px 64px 80px',borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div>
          {/* Working paper number */}
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'40px'}}>
            <div style={{height:'1px',width:'32px',background:C.lime}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted}}>Working Paper · No. 01</span>
          </div>
          <h1 style={{fontFamily:F.display,fontSize:'clamp(32px,5vw,60px)',fontWeight:900,color:C.ink,lineHeight:1.05,letterSpacing:'-2px',marginBottom:'24px'}}>The Architecture<br/><em style={{fontStyle:'italic',color:C.forest}}>of Opportunity</em></h1>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:400,fontStyle:'italic',color:C.muted,lineHeight:1.4,marginBottom:'32px'}}>A Framework for Ghana's Integrated Development — Diagnosis, Architecture, and a Path to Peace &amp; Prosperity</h2>

          {/* Authors */}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'20px',marginBottom:'32px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'12px'}}>Research &amp; Analysis</div>
            <div style={{display:'flex',gap:'32px',flexWrap:'wrap'}}>
              {[{name:'BRIDGE Analytics Team',role:'Primary Research',aff:'BRIDGE PBC, Accra'},{name:'Joseph A.',role:'Strategic Review',aff:'BRIDGE PBC'}].map((a,i)=>(
                <div key={i}>
                  <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink}}>{a.name}</div>
                  <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted}}>{a.role}</div>
                  <div style={{fontFamily:F.mono,fontSize:'10px',color:C.faint}}>{a.aff}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Abstract */}
          <div style={{background:C.paperDark,padding:'20px 24px',borderLeft:`4px solid ${C.lime}`}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Abstract</div>
            <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:C.ink,fontWeight:300}}>This paper presents BRIDGE PBC's foundational framework for Ghana's integrated development. Drawing on assessment of 174+ ventures across 12 economic sectors, and analysis of structural constraints affecting 33 million Ghanaians, it proposes a model that connects diaspora capital, institutional reform, and on-the-ground delivery into a single coherent architecture. The central argument: Ghana's development gap is not a resource shortage. It is a coordination and intelligence failure — and it is solvable.</p>
            <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,marginTop:'8px'}}>Keywords: development finance, Ghana, diaspora capital, BRIDGE Impact Score™, institutional capacity</p>
          </div>
        </div>

        {/* Citation */}
        <div style={{marginTop:'32px',borderTop:`1px solid ${C.border}`,paddingTop:'16px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'6px'}}>Suggested Citation</div>
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>BRIDGE Analytics Team (2025). <em>The Architecture of Opportunity: A Framework for Ghana's Integrated Development</em>. BRIDGE PBC Working Paper No. 01. Accra: BRIDGE PBC.</p>
        </div>
      </div>

      {/* Right sidebar: metadata + table of contents */}
      <div className="cover-right" style={{borderTop:'none',padding:'40px 32px',background:C.paperDark,display:'flex',flexDirection:'column',gap:'0'}}>
        <div style={{marginBottom:'28px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',borderBottom:`1px solid ${C.border}`,paddingBottom:'6px'}}>Document Info</div>
          {[{l:'Series',v:'Working Paper'},{l:'Number',v:'BRIDGE-WP-01-2025'},{l:'Published',v:'2025'},{l:'Pages',v:'Full: 96pp · Excerpt: 22pp'},{l:'Language',v:'English'},{l:'Access',v:'Excerpt: Open · Full: Members'}].map((d,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{d.l}</span>
              <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,textAlign:'right',maxWidth:'60%'}}>{d.v}</span>
            </div>
          ))}
        </div>
        {/* Table of contents */}
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',borderBottom:`1px solid ${C.border}`,paddingBottom:'6px'}}>Contents</div>
          {[{n:'Abstract',pg:'02',pub:true},{n:'1. Introduction & Motivation',pg:'04',pub:true},{n:'2. The Coordination Failure Thesis',pg:'08',pub:true},{n:'3. BRIDGE Impact Score™ Methodology',pg:'16',pub:true},{n:'4. Sector-by-Sector Analysis',pg:'24',pub:false},{n:'5. Capital Architecture & Deployment',pg:'48',pub:false},{n:'6. Diaspora Integration Model',pg:'62',pub:false},{n:'7. Government Partnership Framework',pg:'72',pub:false},{n:'8. Conclusions & Recommendations',pg:'84',pub:false},{n:'References & Appendices',pg:'90',pub:false}].map((c,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:'flex',alignItems:'center',gap:'6px',flex:1}}>
                {!c.pub&&<div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.faint,flexShrink:0}}/>}
                {c.pub&&<div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.lime,flexShrink:0}}/>}
                <span style={{fontFamily:c.pub?F.sans:F.body,fontSize:'11px',color:c.pub?C.ink:C.faint,fontStyle:c.pub?'normal':'italic',fontWeight:c.pub?600:400}}>{c.n}</span>
              </div>
              <span style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,paddingLeft:'8px'}}>{c.pg}</span>
            </div>
          ))}
          <div style={{marginTop:'12px',display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.lime}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted}}>Available in public excerpt</span>
          </div>
        </div>
      </div>
    </div>
    <div style={{height:'3px',background:C.lime}}/>
  </div>
);

/* ── CHAPTER 1 EXCERPT ────────────────────────────────────────────────── */
const Chapter1=()=>(
  <div className="pad-section" style={{background:C.paper,padding:'64px 80px',borderBottom:`1px solid ${C.border}`}}>
    <div className="tc rb-body" style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr',gap:'56px'}}>
      <div>
        {/* Section marker */}
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
          <div style={{height:'1px',width:'24px',background:C.border}}/>
          <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>§1</span>
          <div style={{width:'6px',height:'6px',background:C.lime,borderRadius:'50%'}}/>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted}}>Introduction &amp; Motivation</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,3.5vw,40px)',fontWeight:900,color:C.ink,lineHeight:1.1,letterSpacing:'-1px',marginBottom:'32px'}}>The problem has never been potential. It has always been coordination.</h2>
        <p className="dc" style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.9,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Ghana presents a paradox. A country with robust democratic institutions,<sup>1</sup> a rapidly expanding middle class, and a diaspora of three million people generating upwards of $6.65 billion in annual remittances — yet where 40% of adults remain outside formal financial systems and 56% of trained doctors practice abroad.<sup>2</sup></p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Conventional development frameworks attribute this to resource scarcity: insufficient capital, inadequate infrastructure, weak governance. This paper argues the diagnosis is wrong. The constraints are primarily informational and coordinative — a systematic failure to route existing resources, talent, and energy to their highest-impact applications.</p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The BRIDGE framework proposes a different model. Rather than identifying new sources of capital, it proposes an intelligence infrastructure that makes existing capital — diaspora savings, DFI commitments, government budgets, private equity — work in coordinated alignment with Ghana's genuine opportunity architecture.<sup>3</sup></p>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'24px',margin:'32px 0'}}>
          <p style={{fontFamily:F.display,fontSize:'20px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.5}}>"The gap between Ghana's potential and its outcomes is not a funding gap. It is an intelligence gap. And intelligence gaps, unlike funding gaps, can be closed without waiting for external actors."</p>
          <div style={{marginTop:'10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE Working Paper No. 01, p.6</div>
        </div>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>This paper proceeds in seven sections. Sections 2–3 develop the theoretical framework and methodology. Sections 4–7 apply that framework across Ghana's twelve priority sectors, generating sector-specific investment theses, risk analyses, and policy recommendations. Section 8 synthesises the findings into a concrete implementation roadmap.</p>

        {/* Footnotes as design elements */}
        <div style={{borderTop:`1px solid ${C.border}`,marginTop:'40px',paddingTop:'16px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'10px'}}>Notes</div>
          {['Ghana has conducted seven consecutive peaceful democratic transitions since 1992, placing it in the top quartile of Sub-Saharan African countries on governance indicators (Afrobarometer, 2024).','World Bank Financial Inclusion Database, 2024; Ghana Health Service Staff Survey, 2023. The doctor-to-patient ratio stands at approximately 1:6,000 against a recommended 1:1,000.','This aligns with recent literature on "development intelligence" frameworks. See Hausmann et al. (2022) on the primacy of diagnostic precision over capital mobilisation in middle-income country transitions.'].map((fn,i)=>(
            <div key={i} style={{display:'flex',gap:'10px',marginBottom:'8px',alignItems:'flex-start'}}>
              <span style={{fontFamily:F.mono,fontSize:'10px',color:C.lime,flexShrink:0,paddingTop:'2px'}}>{i+1}.</span>
              <span style={{fontFamily:F.body,fontSize:'11px',color:C.faint,lineHeight:1.6}}>{fn}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right margin notes */}
      <div className="hm">
        <div style={{position:'sticky',top:'80px',display:'flex',flexDirection:'column',gap:'24px'}}>
          <div style={{border:`1px solid ${C.border}`,padding:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Key Figures Cited</div>
            {[{v:'3M',l:'Ghanaians in diaspora'},{'v':'$6.65B+',l:'Annual remittance inflows'},{v:'40%',l:'Adults unbanked'},{v:'56%',l:'Doctors practising abroad'},{v:'1:6,000',l:'Doctor-to-patient ratio'},{v:'174+',l:'Ventures assessed in BRIDGE database'}].map((d,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:i<5?`1px solid ${C.border}`:'none'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{d.l}</span>
                <span style={{fontFamily:F.mono,fontSize:'12px',color:C.forest,fontWeight:500}}>{d.v}</span>
              </div>
            ))}
          </div>
          <div style={{background:C.paperDark,padding:'16px',borderLeft:`3px solid ${C.lime}`}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Related Sections</div>
            {['§2 — Coordination Failure Thesis','§3 — BRIDGE Impact Score™','§4 — Sector Analysis'].map((s,i)=>(<div key={i} style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,paddingBottom:'4px'}}>{s}</div>))}
            <div style={{fontFamily:F.sans,fontSize:'10px',color:C.faint,marginTop:'8px'}}>Available in full edition</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ── METHODOLOGY PREVIEW ────────────────────────────────────────────────── */
const MethodPreview=()=>(
  <div className="pad-section" style={{background:C.paperDark,padding:'64px 80px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
        <div style={{height:'1px',width:'24px',background:C.border}}/>
        <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>§3</span>
        <div style={{width:'6px',height:'6px',background:C.lime,borderRadius:'50%'}}/>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted}}>BRIDGE Impact Score™ Methodology</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,34px)',fontWeight:900,color:C.ink,lineHeight:1.15,letterSpacing:'-1px',marginBottom:'32px'}}>A composite score. Four dimensions. One objective, reproducible answer.</h2>
      <div className="tc method-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',marginBottom:'40px'}}>
        {[{n:'Market Opportunity',w:'30%',d:'Total addressable market size, competitive density, price point accessibility, and distribution infrastructure maturity.',ex:'Example: Financial inclusion scores high on market opportunity — 40% adult exclusion represents a large, accessible, underserved market.'},
          {n:'Development Impact',w:'30%',d:'Primary and secondary effects on Ghanaian household welfare, employment generation, supply chain integration, and community resilience.',ex:'Example: Agriculture scores highest on development impact — directly affects 30%+ of the labour force and household food security.'},
          {n:'Implementation Feasibility',w:'25%',d:'Regulatory environment clarity, infrastructure dependency, management talent availability, and timeline to first positive impact.',ex:'Example: Technology scores medium on feasibility — talent is available but infrastructure dependency on power and data creates execution risk.'},
          {n:'Financial Sustainability',w:'15%',d:'Path to positive cash flow, risk-adjusted return profile, exit liquidity, and alignment with commercial capital benchmarks.',ex:'Example: Infrastructure scores lower on financial sustainability — longer payback periods require patient, development-oriented capital.'}].map((d,i)=>(
          <div key={i} style={{background:C.paper,padding:'20px',borderTop:`3px solid ${i===0||i===1?C.lime:i===2?C.limeDark:'rgba(184,215,53,0.4)'}`}}>
            <div style={{fontFamily:F.mono,fontSize:'10px',color:C.lime,marginBottom:'6px'}}>×{d.w}</div>
            <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:800,color:C.ink,marginBottom:'10px',lineHeight:1.3}}>{d.n}</div>
            <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6,marginBottom:'12px'}}>{d.d}</div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{d.ex}</div>
          </div>
        ))}
      </div>
      <div style={{background:C.paper,padding:'20px 24px',borderLeft:`4px solid ${C.lime}`,display:'flex',gap:'24px',flexWrap:'wrap',alignItems:'center'}}>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'4px'}}>Scoring Output</div>
          <p style={{fontFamily:F.body,fontSize:'13px',color:C.ink,lineHeight:1.7,fontWeight:300}}>Each venture receives a composite score from 0–100. Scores ≥75 indicate Core priority (immediate deployment mandate). Scores 60–74 indicate Emerging tier (active pipeline). Scores below 60 indicate Growth designation (monitor and develop). The methodology is fully reproducible — each sub-score is documented with primary source citations. Members access the complete scoring framework and individual company workbooks.</p>
        </div>
        <div style={{flexShrink:0,textAlign:'center'}}>
          <div style={{fontFamily:F.mono,fontSize:'48px',color:C.forest,lineHeight:1}}>174+</div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:C.muted,marginTop:'4px'}}>Ventures scored</div>
        </div>
      </div>
    </div>
  </div>
);

/* ── GATE ─────────────────────────────────────────────────────────────── */
const Gate=()=>(
  <div className="pad-section" style={{background:C.ink,padding:'56px 80px',position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.display,fontSize:'clamp(70px,14vw,160px)',fontWeight:900,color:'rgba(255,255,255,0.02)',pointerEvents:'none',userSelect:'none',letterSpacing:'-6px'}}>MEMBERS</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
      <div>
        <div style={{borderTop:`6px solid ${C.paper}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Full White Paper</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,32px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'20px'}}>Sections §4–§8 are available to Members. 74 additional pages of sector analysis, capital architecture, and policy frameworks.</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',lineHeight:1.85,color:'rgba(250,248,243,0.55)',fontWeight:300,marginBottom:'24px'}}>This public excerpt covers the introduction, motivation, and methodology. The full 96-page working paper includes complete sector-by-sector analysis, venture pipeline data, and BRIDGE's full implementation roadmap for Ghana's development.</p>
        <div className="gate-cta" style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
          <a href="#" style={{background:C.lime,color:C.ink,padding:'12px 24px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',borderRadius:'2px'}}>Apply for Members Access</a>
          <a href="#" style={{border:`1px solid rgba(255,255,255,0.15)`,color:C.paper,padding:'12px 20px',fontFamily:F.sans,fontSize:'12px',fontWeight:600,textDecoration:'none',borderRadius:'2px'}}>All Research →</a>
        </div>
      </div>
      <div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:'16px'}}>Full paper includes</div>
        {['§4 — 12-sector deep-dives with venture-level scoring','§5 — Capital architecture: four deployment models','§6 — Diaspora integration: from remittance to investment','§7 — Government partnership strategy and 2026 Budget alignment','§8 — Conclusions: the 36-month implementation roadmap','Appendix A — Full venture database (174+ entries)','Appendix B — Methodology workbooks and score sheets','Appendix C — References and primary data sources'].map((i,idx)=>(
          <div key={idx} style={{display:'flex',gap:'10px',alignItems:'flex-start',marginBottom:'8px'}}>
            <div style={{width:'14px',height:'14px',borderRadius:'2px',background:C.lime,flexShrink:0,marginTop:'1px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span style={{color:C.ink,fontSize:'9px',fontWeight:900}}>✓</span>
            </div>
            <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.6)',lineHeight:1.5}}>{i}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Footer=()=>{
  const bt='3px solid '+C.lime;
  return(
  <div className="pad-footer" style={{background:C.forest,padding:'20px 80px',borderTop:bt}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
        <Logo height={18} variant="white"/>
        <div style={{width:'1px',height:'16px',background:'rgba(255,255,255,0.15)'}}/>
        <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.4)'}}>Research Brief &middot; BRIDGE-WP-01-2025 &middot; bridgepbc.com/research</div>
      </div>
      <div className="mob-hide" style={{display:'flex',gap:'16px'}}>
        {['Research','Members','Contact','bridgepbc.com'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.4)',textDecoration:'none'}}>{l}</a>))}
      </div>
    </div>
  </div>
  );
};

export default function ResearchBrief(){
  const r=useRef(null);
  return(<div style={{fontFamily:F.body,background:C.paper}}><Gf/><TopBar coverLogoRef={r}/><Cover logoRef={r}/><Chapter1/><MethodPreview/><Gate/><Footer/></div>);
}
