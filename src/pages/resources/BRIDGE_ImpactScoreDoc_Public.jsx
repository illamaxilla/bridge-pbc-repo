import { useState, useRef, useEffect } from "react";

const C = {
  ink:'#0D1A10', paper:'#FAF8F3', paperDark:'#F0EDE4',
  forest:'#1B4D3E', lime:'#B8D935',
  muted:'#5C6B5E', faint:'#9AAA9C', border:'#D8D4C8',
  teal:'#2E5A4D', red:'#A8200D', amber:'#B8730A', positive:'#1A6B2F',
};
const F = {
  display:'"Playfair Display","Georgia",serif',
  body:'"Source Serif 4","Georgia",serif',
  sans:'"DM Sans","Helvetica Neue",sans-serif',
  mono:'"DM Mono","Courier New",monospace',
};

const Gf = () => (<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:#FAF8F3;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  ::selection{background:rgba(184,217,53,0.22);color:#0D1A10;}
  ::-webkit-scrollbar{display:none;}*{-ms-overflow-style:none;scrollbar-width:none;}
  .dc::first-letter{font-family:"Playfair Display","Georgia",serif;font-size:4.5em;font-weight:900;float:left;line-height:0.8;margin:0.1em 0.12em 0 0;color:#1B4D3E;}
  @media print{.np{display:none!important;}}
  .mob-show{display:none;}
  @media(max-width:900px){
    .tc{grid-template-columns:1fr!important;}
    .hm{display:none!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-gate{padding:40px 32px!important;}
    .pad-footer{padding:14px 32px!important;}
    .pad-topbar{padding:10px 24px!important;}
  }
  @media(max-width:600px){
    .tc{grid-template-columns:1fr!important;}
    .pad-section{padding:24px 18px!important;}
    .pad-cover{padding:20px 18px 0!important;}
    .pad-gate{padding:24px 18px!important;}
    .pad-footer{padding:16px 18px!important;}
    .pad-topbar{padding:10px 18px!important;}
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}
    .mob-full{width:100%!important;}
    .mob-item-hidden{display:none!important;}
    .mob-toggle{display:flex!important;align-items:center;justify-content:space-between;width:100%;padding:10px 0;border:none;border-bottom:1px solid #D8D4C8;background:transparent;cursor:pointer;font-family:"DM Sans","Helvetica Neue",sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#5C6B5E;}
    .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
    .mob-toggle-hdr{border-bottom:1px solid rgba(255,255,255,0.08)!important;color:rgba(250,248,243,0.4)!important;}
    .gate-value-line{display:none!important;}
    .gate-cta-row{flex-direction:column!important;}
    .footer-links{display:none!important;}
    .footer-inner{justify-content:center!important;}
    .dim-tiles{grid-template-columns:1fr 1fr!important;}
  }

  /* ── Mobile app styles ── */
  .fade-in{animation:fadeIn 0.22s ease;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
  .slide-up{animation:slideUp 0.26s cubic-bezier(0.16,1,0.3,1);}
  @keyframes slideUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
  .tap-scale{transition:transform 0.12s,opacity 0.12s;}
  .tap-scale:active{transform:scale(0.97);opacity:0.85;}
  .scroll-x{overflow-x:auto;-webkit-overflow-scrolling:touch;}
`}</style>);

const Logo = ({height=28, variant='white'}) => {
  const tf = variant==='white' ? '#ffffff' : '#1B4D3E';
  return (
    <svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      <defs><style>{`.pa{fill:none;stroke:${tf};stroke-width:80px;stroke-miterlimit:10;}.pb{fill:${tf};stroke:#000;stroke-width:.5px;stroke-miterlimit:10;}.pc{fill:#b8d935;stroke:#1b4d3e;stroke-miterlimit:10;}.pd{fill:#b8d935;}.pe{fill:${tf};}.pf{fill:#74914a;}`}</style></defs>
      <path className="pe" d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      <path className="pb" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      <path className="pb" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      <rect className="pd" x="1427.4" y="17.4" width="205.2" height="145"/>
      <rect className="pe" x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      <path className="pe" d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      <rect className="pe" x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      <rect className="pd" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect className="pd" x="3083.4" y="654.4" width="175.1" height="257.7"/>
      <rect className="pa" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      <polygon className="pc" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      <path className="pf" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
      <path className="pd" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
    </svg>
  );
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const DIMS = [
  {num:'I',title:'Peace & Prosperity Alignment',pts:30,weight:'30%',question:'Does this opportunity genuinely improve Ghanaian lives?',rationale:"The most heavily weighted dimension — deliberately. BRIDGE exists to advance the flourishing of Ghanaian citizens, not simply to deploy capital. An opportunity that scores exceptionally on every other dimension but fails to move the needle on human flourishing does not belong in the BRIDGE portfolio.",subs:[{label:'Individual Dignity',pts:10,detail:"Does the venture expand agency, capability, and meaningful choice for individual Ghanaians? Evaluators examine quality of employment created, skills that persist beyond the venture, and whether the real options available to people are materially expanded."},{label:'Family Security',pts:10,detail:"Does the venture improve the stability and resilience of Ghanaian households? Evaluators look at income predictability, access to essential services, and asset-building potential — not just monthly earnings."},{label:'Community Thriving',pts:10,detail:"Does the venture generate benefits that reach beyond its direct beneficiaries? Strong scores reflect meaningful employment multipliers, strengthened local institutions, and intergenerational reach."}]},
  {num:'II',title:'Strategic Fit',pts:25,weight:'25%',question:'Is this the right opportunity for BRIDGE specifically?',rationale:"Not every excellent idea is a BRIDGE idea. This dimension evaluates whether a venture aligns with BRIDGE's specific capabilities, 12-sector architecture, and portfolio logic.",subs:[{label:'Sector Alignment',pts:10,detail:"Does the opportunity fall within BRIDGE's 12 integrated sectors and contribute meaningfully to the cross-sector portfolio architecture?"},{label:'Diaspora Role',pts:8,detail:"Is the diaspora contribution genuine and value-additive — not merely decorative? BRIDGE invests where diaspora involvement authentically changes outcomes."},{label:'Portfolio Synergy',pts:7,detail:"Does the venture create or amplify integration points with other BRIDGE portfolio companies?"}]},
  {num:'III',title:'Feasibility & Execution',pts:25,weight:'25%',question:'Can this actually be done — and by whom?',rationale:"A venture that aligns perfectly with BRIDGE's mission but cannot be executed is not an opportunity — it is a plan.",subs:[{label:'Financial Viability',pts:10,detail:"Is the financial model grounded in market reality? Is the path to sustainability clearly articulated and credible?"},{label:'Team Capability',pts:8,detail:"Is there a credible implementer with relevant domain experience and a track record of execution?"},{label:'Risk Assessment',pts:7,detail:"Have key risks been honestly identified and quantified? Are mitigation strategies specific and credible?"}]},
  {num:'IV',title:'Scalability & Sustainability',pts:20,weight:'20%',question:'Will this matter beyond its first stage?',rationale:"BRIDGE does not build success stories that disappear when initial funding runs out.",subs:[{label:'Growth Potential',pts:8,detail:"Can the venture scale meaningfully without proportional increases in external subsidy?"},{label:'Long-Term Viability',pts:7,detail:"Is the business model resilient to market volatility, currency risk, and funding cycle disruption?"},{label:'Replication Potential',pts:5,detail:"Can success here be adapted and deployed in other districts, sectors, or countries?"}]},
];
const THRESHOLDS = [
  {range:'80–100',rating:'Exceptional',   action:'Priority pursuit — accelerated evaluation',                   color:'#1A6B2F',bar:100},
  {range:'65–79', rating:'Strong',        action:'Active development — full due diligence initiated',            color:'#2E7D32',bar:73},
  {range:'50–64', rating:'Promising',     action:'Conditional support — milestones defined before commitment',   color:'#B8730A',bar:55},
  {range:'35–49', rating:'Potential',     action:'Advisory support only — revisit when conditions are met',      color:'#E65100',bar:37},
  {range:'Below 35',rating:'Does Not Qualify',action:'Declined — written rationale and pathway provided',       color:'#A8200D',bar:15},
];
const STAGES = [
  {n:'01',title:'Initial Screening',          time:'1–2 Weeks', desc:'Sector alignment, submitter credibility, and sufficiency of information. Every application receives a written response.'},
  {n:'02',title:'Impact Score™ Assessment',   time:'2–4 Weeks', desc:'Full four-dimension scoring drawing on 60,000+ words of proprietary sector research. Every sub-component documented.'},
  {n:'03',title:'Deep Due Diligence',         time:'4–8 Weeks', desc:'Reserved for ventures scoring 65+. Financial model review, team assessment, market validation, legal analysis.'},
  {n:'04',title:'Investment Committee Review',time:'1–2 Weeks', desc:'Final approval evaluating due diligence findings against portfolio priorities and capital availability.'},
  {n:'05',title:'Structuring & Partnership',  time:'2–4 Weeks', desc:'Investment terms negotiated, governance documented, milestone frameworks agreed before capital is committed.'},
];
const KEJETIA = [{label:'P&P Alignment',score:26,max:30},{label:'Strategic Fit',score:23,max:25},{label:'Feasibility',score:22,max:25},{label:'Scalability',score:16,max:20}];
const MEMBER_ITEMS = [
  'Complete scoring worksheets — all 4 dimensions with full sub-component rationale',
  'Venture comparison matrix — 174+ scored opportunities ranked across sectors',
  'Evaluator calibration guide and inter-rater reliability protocols',
  'Score appeal and revision framework with documented precedents',
  'Portfolio integration analysis — cross-sector synergy mapping',
  'Quarterly pipeline report — new ventures currently under evaluation',
  "Commissioner's guide for external Impact Score™ engagements",
  'Historical score distribution across all 12 sectors (2022–2025)',
  'Weighting rationale paper — why 30/25/25/20 and not equal weights',
  '12 annotated scorecards from BRIDGE flagship ventures',
];
const TIERS = [
  {tier:'General Community',price:'Free',features:['Public content & events','Big Ideas Challenge access','BRIDGE newsletter & updates'],cta:'Join the Community',hi:false},
  {tier:'Network Members',  price:'$100/yr',features:['Full platform access','Member directory & opportunity database','Idea submission with guaranteed feedback','Community voting rights'],cta:'Become a Member',hi:false},
  {tier:'Professional Contributors',price:'$500–$2,000/yr',features:['Everything in Network Members','Mentorship & advisory matching','Deal flow access (observer)','Contributor retreats & convenings','Direct BRIDGE leadership engagement'],cta:'Apply as Contributor',hi:true},
  {tier:'Investors',price:'From $10K',features:['Everything in Professional','LP rights in BRIDGE Fund(s)','Quarterly investor reporting','Co-investment opportunities','Annual investor meeting & Ghana tour','Advisory Council eligibility'],cta:'Explore Investment',hi:false},
  {tier:'Strategic Partners',price:'By Invitation',features:['Board or Advisory Council seat','Strategic direction input','Co-branding opportunities','Named programs & initiatives','Direct partnership on flagship projects'],cta:'Enquire at bridge-pbc.com',hi:false},
];

// ── SHARED ────────────────────────────────────────────────────────────────────
const Rule = () => <div style={{borderTop:'6px solid #0D1A10',borderBottom:'2px solid #B8D935',paddingBottom:'3px',marginBottom:'20px'}}/>;
const SL = ({children}) => <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'#5C6B5E',marginBottom:'14px'}}>{children}</div>;

// ── TOPBAR ────────────────────────────────────────────────────────────────────
const TopBar = ({logoRef}) => {
  const [past,setPast] = useState(false);
  useEffect(()=>{
    const fn = ()=>{ if(!logoRef?.current) return; setPast(logoRef.current.getBoundingClientRect().bottom < 0); };
    window.addEventListener('scroll',fn,{passive:true});
    return ()=>window.removeEventListener('scroll',fn);
  },[logoRef]);
  return (
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:'#FAF8F3',borderBottom:'1px solid #D8D4C8',padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'220px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <Logo height={20} variant="dark"/>
          <div style={{width:'1px',height:'16px',background:'#D8D4C8',margin:'0 10px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:'#5C6B5E'}}>General Series &middot; BRIDGE Impact Score&#8482; &middot; <span style={{color:'#1B4D3E',fontWeight:700}}>Public Edition</span></span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'#1B4D3E'}}>Impact Score&#8482;</span>
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <a href="#" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'#1B4D3E',textDecoration:'none'}}>Members &rarr;</a>
        <a href="#" style={{background:'#1B4D3E',color:'#B8D935',padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px'}}>Apply &rarr;</a>
      </div>
    </div>
  );
};

// ── COVER ─────────────────────────────────────────────────────────────────────
const Cover = ({logoRef}) => (
  <div>
    <div className="pad-cover" style={{background:'#0D1A10',padding:'24px 64px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'64px',top:'16px',fontFamily:F.mono,fontSize:'200px',fontWeight:500,color:'rgba(255,255,255,0.02)',lineHeight:1,userSelect:'none',pointerEvents:'none'}}>100</div>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div ref={logoRef} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <Logo height={26} variant="white"/>
            <div style={{width:'1px',height:'20px',background:'rgba(255,255,255,0.15)'}}/>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',color:'rgba(255,255,255,0.35)',textTransform:'uppercase'}}>Methodology Publication</span>
          </div>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'#B8D935',letterSpacing:'2px',textTransform:'uppercase',border:'1px solid rgba(184,217,53,0.35)',padding:'3px 10px'}}>Public Edition</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'22px'}}>
          <div style={{background:'#B8D935',color:'#0D1A10',fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'4px 10px',letterSpacing:'1px'}}>DOC 01 / 23</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.08)'}}/>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.25)'}}>General Series &middot; March 2026</span>
        </div>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(34px,5.5vw,72px)',fontWeight:900,color:'#FAF8F3',lineHeight:1,letterSpacing:'-2px',marginBottom:'8px'}}>BRIDGE</h1>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(34px,5.5vw,72px)',fontWeight:900,color:'#B8D935',lineHeight:1,letterSpacing:'-2px',marginBottom:'24px'}}>Impact Score&#8482;</h1>
        <div style={{fontFamily:F.body,fontSize:'16px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',lineHeight:1.7,maxWidth:'560px',marginBottom:'36px'}}>
          The proprietary evaluation methodology BRIDGE applies to every venture it considers &mdash; rigorous, reproducible, and grounded in a single purpose: the flourishing of Ghanaian citizens, households, and communities.
        </div>
        <div style={{display:'flex',gap:'0',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          <div style={{background:'rgba(255,255,255,0.04)',padding:'18px 24px',minWidth:'170px',borderRight:'1px solid rgba(255,255,255,0.06)'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:'8px'}}>Point Scale</div>
            <span style={{fontFamily:F.mono,fontSize:'52px',fontWeight:500,color:'#B8D935',lineHeight:1}}>100</span>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:'#B8D935',letterSpacing:'1px',marginTop:'6px'}}>FULL SPECTRUM</div>
          </div>
          {[{l:'Dimensions',v:'4'},{l:'Sub-Components',v:'12'},{l:'Ventures Evaluated',v:'174+'},{l:'Qualifying Threshold',v:'65'}].map((d,i)=>(
            <div key={i} className="hm" style={{padding:'18px 22px',borderRight:i<3?'1px solid rgba(255,255,255,0.06)':'none',flex:1,minWidth:0}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',marginBottom:'10px'}}>{d.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'clamp(18px,2.2vw,26px)',color:'#FAF8F3',lineHeight:1}}>{d.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{height:'3px',background:'#B8D935',opacity:0.4}}/>
    </div>
  </div>
);

// ── EXECUTIVE SUMMARY ─────────────────────────────────────────────────────────
const Executive = () => {
  const [sdOpen,setSdOpen] = useState(false);
  return (
    <div className="pad-section" style={{background:'#FAF8F3',padding:'48px 64px',borderBottom:'1px solid #D8D4C8'}}>
      <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr',gap:'48px'}} className="tc">
        <div>
          <Rule/><SL>Executive Summary</SL>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'16px'}}>
            The BRIDGE Impact Score&#8482; is a 100-point proprietary evaluation framework applied to every venture BRIDGE considers. It measures four dimensions weighted to reflect BRIDGE&rsquo;s hierarchy of what matters most: Peace &amp; Prosperity Alignment (30 pts), Strategic Fit (25 pts), Feasibility &amp; Execution (25 pts), and Scalability &amp; Sustainability (20 pts).
          </p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'16px'}}>
            Ventures scoring 65 or above proceed to deep due diligence. The framework has been applied to 174+ ventures across all 12 sectors, producing a cross-sector comparable, reproducible assessment of whether any opportunity deserves BRIDGE&rsquo;s resources &mdash; and Ghana&rsquo;s investment.
          </p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300}}>
            The Score is not a gate designed to exclude. It is a standard designed to protect &mdash; ensuring every venture that receives BRIDGE&rsquo;s resources has earned that commitment through evidence, not relationship.
          </p>
          <div style={{borderLeft:'4px solid #B8D935',paddingLeft:'20px',marginTop:'28px'}}>
            <p style={{fontFamily:F.display,fontSize:'17px',fontStyle:'italic',fontWeight:600,color:'#1B4D3E',lineHeight:1.55}}>Every investment decision is simultaneously a decision not to invest somewhere else. The communities depending on these resources deserve better than intuition.</p>
            <div style={{marginTop:'10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:'#5C6B5E',letterSpacing:'1px',textTransform:'uppercase'}}>&mdash; BRIDGE Methodology Paper, 2026</div>
          </div>
        </div>
        <div>
          <div style={{border:'1px solid #D8D4C8',overflow:'hidden'}}>
            <button className="mob-toggle mob-toggle-hdr" onClick={()=>setSdOpen(o=>!o)} style={{width:'100%',background:'#1B4D3E',padding:'14px 16px',border:'none',cursor:'pointer',textAlign:'left',display:'block'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#B8D935',marginBottom:'6px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span>Dimension Weights</span>
                <span className="mob-show" style={{display:'none',fontSize:'12px',color:'rgba(184,217,53,0.5)'}}>&#9660;</span>
              </div>
              <div style={{fontFamily:F.mono,fontSize:'28px',color:'#FAF8F3'}}>100 <span style={{fontSize:'12px',color:'rgba(250,248,243,0.4)'}}>pts total</span></div>
            </button>
            {DIMS.map((dim,i)=>(
              <div key={i} className={sdOpen?'':'mob-item-hidden'} style={{padding:'11px 14px',borderBottom:i<3?'1px solid #D8D4C8':'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:'#0D1A10'}}>{dim.title}</span>
                  <span style={{fontFamily:F.mono,fontSize:'11px',color:'#1B4D3E',flexShrink:0,marginLeft:'8px'}}>{dim.pts}</span>
                </div>
                <div style={{height:'3px',background:'#D8D4C8',overflow:'hidden'}}><div style={{height:'100%',width:dim.pts+'%',background:'#B8D935'}}/></div>
                <div style={{marginTop:'3px',fontFamily:F.mono,fontSize:'9px',color:'#9AAA9C'}}>Weight: {dim.weight}</div>
              </div>
            ))}
          </div>
          <div style={{border:'1px solid #D8D4C8',borderTop:'none',padding:'14px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#5C6B5E',marginBottom:'10px'}}>At a Glance</div>
            {[{l:'Document Series',v:'General'},{l:'Edition',v:'March 2026'},{l:'Sectors Covered',v:'All 12'},{l:'Qualifying Score',v:'65 / 100'},{l:'Ventures Scored',v:'174+'},{l:'This Version',v:'Public'}].map((s,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:i<5?'1px solid #D8D4C8':'none'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:'#5C6B5E'}}>{s.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'#1B4D3E'}}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── THE PROBLEM ───────────────────────────────────────────────────────────────
const TheProblem = () => (
  <div className="pad-section" style={{background:'#F0EDE4',padding:'48px 64px',borderBottom:'1px solid #D8D4C8'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <Rule/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
        <div>
          <SL>I &middot; The Problem This Solves</SL>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:700,color:'#0D1A10',lineHeight:1.2,marginBottom:'20px'}}>Ghana does not lack good ideas. It lacks a rigorous way to distinguish them.</h2>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'16px'}}>Every venture that enters the BRIDGE pipeline is evaluated through the same framework, measured against the same criteria, and scored on the same 100-point scale. The result is not a gut feeling or a relationship favour.</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300}}>That rigour matters because resources are finite and opportunity costs are real. Capital deployed in one direction cannot be deployed in another &mdash; and the communities that depend on sound investment deserve better than intuition.</p>
        </div>
        <div>
          <SL>What the Score Is Not</SL>
          {[
            {label:'Not a gatekeeping tool',body:"Every declined venture receives a written rationale and a pathway — what would need to change for the score to improve."},
            {label:'Not a prediction',body:"The Score measures what is evidenced at the time of evaluation. It is not a guarantee of success or a forecast of returns."},
            {label:'Not relationship-dependent',body:"A venture submitted by a BRIDGE board member receives the same evaluation as one from an unknown entrepreneur in Tamale."},
            {label:'Not sector-biased',body:"The same four dimensions apply whether the venture operates in housing, agriculture, or sports. No sector is structurally advantaged."},
          ].map((item,i)=>(
            <div key={i} style={{paddingBottom:'16px',marginBottom:'16px',borderBottom:i<3?'1px solid #D8D4C8':'none'}}>
              <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
                <span style={{color:'#B8D935',fontFamily:F.sans,fontSize:'13px',fontWeight:700,flexShrink:0,lineHeight:1.6,marginTop:'1px'}}>&rarr;</span>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:'#0D1A10',marginBottom:'4px'}}>{item.label}</div>
                  <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.7,color:'#5C6B5E',margin:0,fontWeight:300}}>{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ── FOUR DIMENSIONS ───────────────────────────────────────────────────────────
const FourDimensions = () => {
  const [open,setOpen] = useState(0);
  const [scaleOpen,setScaleOpen] = useState(false);
  return (
    <div className="pad-section" style={{background:'#FAF8F3',padding:'48px 64px',borderBottom:'1px solid #D8D4C8'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <Rule/><SL>II &middot; The Four Dimensions</SL>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'flex-start'}} className="tc">
          <div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:700,color:'#0D1A10',lineHeight:1.2,marginBottom:'14px'}}>What the score measures &mdash; and why.</h2>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'28px'}}>Each dimension captures a distinct and essential question. The weights are deliberate, reflecting BRIDGE&rsquo;s hierarchy of what matters most.</p>
            <div className="dim-tiles" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',marginBottom:'24px'}}>
              {DIMS.map((d,i)=>{const bgs=['#1B4D3E','#2E5A4D','#2E6B50','#3A8060'];return(
                <div key={i} onClick={()=>setOpen(open===i?null:i)} style={{background:open===i?'#0D1A10':bgs[i],padding:'14px 12px',cursor:'pointer',borderBottom:open===i?'3px solid #B8D935':'3px solid transparent',transition:'background 0.2s'}}>
                  <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',marginBottom:'6px'}}>DIM {d.num}</div>
                  <div style={{fontFamily:F.mono,fontSize:'28px',color:'#B8D935',lineHeight:1,marginBottom:'2px'}}>{d.pts}</div>
                  <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:600,textTransform:'uppercase',color:'rgba(255,255,255,0.35)'}}>pts</div>
                </div>
              );})}
            </div>
            {DIMS.map((dim,i)=>(
              <div key={i} style={{marginBottom:'4px'}}>
                <div onClick={()=>setOpen(open===i?null:i)} style={{background:open===i?'#1B4D3E':'#FAF8F3',border:'1px solid '+(open===i?'#1B4D3E':'#D8D4C8'),padding:'14px 18px',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center',transition:'all 0.2s'}}>
                  <div>
                    <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:open===i?'#FAF8F3':'#0D1A10',marginBottom:'2px'}}>{dim.title}</div>
                    <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:open===i?'rgba(250,248,243,0.5)':'#5C6B5E'}}>{dim.question}</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0,marginLeft:'12px'}}>
                    <div style={{background:open===i?'rgba(184,217,53,0.18)':'rgba(27,77,62,0.07)',padding:'4px 10px',fontFamily:F.mono,fontSize:'12px',fontWeight:500,color:open===i?'#B8D935':'#1B4D3E'}}>{dim.pts}pts</div>
                    <span style={{fontSize:'13px',color:open===i?'#B8D935':'#5C6B5E',display:'inline-block',transform:open===i?'rotate(180deg)':'none',transition:'transform 0.2s'}}>&#9660;</span>
                  </div>
                </div>
                {open===i&&(
                  <div style={{background:'#F0EDE4',border:'1px solid #1B4D3E',borderTop:'none',padding:'16px 18px'}}>
                    <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:'#0D1A10',fontStyle:'italic',borderBottom:'1px solid #D8D4C8',paddingBottom:'14px',marginBottom:'14px',fontWeight:300}}>{dim.rationale}</p>
                    {dim.subs.map((s,si)=>(
                      <div key={si} style={{paddingBottom:si<dim.subs.length-1?'12px':0,marginBottom:si<dim.subs.length-1?'12px':0,borderBottom:si<dim.subs.length-1?'1px solid #D8D4C8':'none'}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'5px'}}>
                          <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:'#1B4D3E'}}>{s.label}</div>
                          <div style={{display:'flex',alignItems:'center',gap:'5px',flexShrink:0}}>
                            <div style={{height:'3px',width:s.pts*3.2,background:'#B8D935'}}/>
                            <span style={{fontFamily:F.mono,fontSize:'10px',color:'#5C6B5E'}}>{s.pts}pts</span>
                          </div>
                        </div>
                        <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.75,color:'#5C6B5E',margin:0,fontWeight:300}}>{s.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <Rule/>
            <button className="mob-toggle" onClick={()=>setScaleOpen(o=>!o)} style={{background:'transparent',border:'none',padding:0,cursor:'pointer',width:'100%',display:'block',textAlign:'left',marginBottom:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <SL>III &middot; The Scoring Scale</SL>
                <span className="mob-show" style={{display:'none',fontFamily:F.mono,fontSize:'12px',color:'#5C6B5E'}}>&#9660;</span>
              </div>
            </button>
            <h3 style={{fontFamily:F.display,fontSize:'clamp(18px,2.2vw,26px)',fontWeight:700,color:'#0D1A10',lineHeight:1.25,marginBottom:'12px'}}>What each score commits BRIDGE to.</h3>
            <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:'#5C6B5E',fontWeight:300,marginBottom:'20px'}}>A score above 65 triggers deep due diligence. Every score &mdash; including a decline &mdash; carries a written BRIDGE commitment.</p>
            <div style={{border:'1px solid #D8D4C8',overflow:'hidden'}}>
              {THRESHOLDS.map((t,i)=>(
                <div key={i} className={scaleOpen?'':(i>1?'mob-item-hidden':'')} style={{background:i%2===0?'#FAF8F3':'#F0EDE4',borderBottom:i<4?'1px solid #D8D4C8':'none',padding:'14px 16px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'6px'}}>
                    <div style={{fontFamily:F.mono,fontSize:'17px',color:t.color}}>{t.range}</div>
                    <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'#0D1A10'}}>{t.rating}</div>
                  </div>
                  <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'#5C6B5E',lineHeight:1.55,marginBottom:'8px'}}>{t.action}</div>
                  <div style={{height:'3px',background:'#D8D4C8'}}><div style={{height:'100%',width:t.bar+'%',background:t.color,opacity:0.75}}/></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── EVAL PROCESS ──────────────────────────────────────────────────────────────
const EvalProcess = () => {
  const [rmOpen,setRmOpen] = useState(false);
  return (
    <div className="pad-section" style={{background:'#F0EDE4',padding:'48px 64px',borderBottom:'1px solid #D8D4C8'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <Rule/><SL>IV &middot; The Evaluation Process</SL>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'flex-start'}} className="tc">
          <div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:700,color:'#0D1A10',lineHeight:1.2,marginBottom:'14px'}}>Five stages. One uncompromising standard.</h2>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'32px'}}>Thorough without placing unnecessary burden on applicants, and transparent at every decision point.</p>
            {STAGES.map((s,i)=>(
              <div key={i} style={{display:'flex',gap:'20px'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:'44px'}}>
                  <div style={{width:'44px',height:'44px',background:'#1B4D3E',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <span style={{fontFamily:F.mono,fontSize:'13px',color:'#B8D935'}}>{s.n}</span>
                  </div>
                  {i<STAGES.length-1&&<div style={{width:'1px',flex:1,background:'#D8D4C8',minHeight:'20px',margin:'4px 0'}}/>}
                </div>
                <div style={{paddingBottom:i<STAGES.length-1?'24px':0,paddingTop:'8px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'6px',flexWrap:'wrap'}}>
                    <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:'#0D1A10'}}>{s.title}</div>
                    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'#B8D935',background:'rgba(184,217,53,0.12)',padding:'2px 8px'}}>{s.time}</div>
                  </div>
                  <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:'#5C6B5E',margin:0,fontWeight:300}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Rule/>
            <button className="mob-toggle" onClick={()=>setRmOpen(o=>!o)} style={{background:'transparent',border:'none',padding:0,cursor:'pointer',width:'100%',display:'block',textAlign:'left',marginBottom:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <SL>V &middot; Why It Is Genuinely Objective</SL>
                <span className="mob-show" style={{display:'none',fontFamily:F.mono,fontSize:'12px',color:'#5C6B5E'}}>&#9660;</span>
              </div>
            </button>
            <h3 style={{fontFamily:F.display,fontSize:'clamp(18px,2.2vw,26px)',fontWeight:700,color:'#0D1A10',lineHeight:1.25,marginBottom:'12px'}}>Three design features &mdash; not just assurances.</h3>
            <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:'#5C6B5E',fontWeight:300,marginBottom:'20px'}}>Objectivity is easy to claim. BRIDGE designs it structurally into the process.</p>
            {[{title:'Standardised criteria, applied uniformly across all sectors',body:'The same four dimensions apply to every venture regardless of sector, submitter, or investment size.'},{title:'Structural separation of scoring from relationship management',body:'The team that builds relationships with venture founders is not the team that evaluates them.'},{title:'Documented, auditable rationale at every sub-component level',body:'Every score is accompanied by written justification. Scores can be reviewed, challenged, and where evidence warrants, revised.'}].map((w,i)=>(
              <div key={i} className={rmOpen?'':(i>0?'mob-item-hidden':'')} style={{display:'flex',gap:'14px',paddingBottom:'20px',marginBottom:'20px',borderBottom:i<2?'1px solid #D8D4C8':'none'}}>
                <div style={{width:'3px',background:'#B8D935',flexShrink:0,alignSelf:'stretch'}}/>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:'#0D1A10',marginBottom:'6px'}}>{w.title}</div>
                  <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.8,color:'#5C6B5E',margin:0,fontWeight:300}}>{w.body}</p>
                </div>
              </div>
            ))}
            <div style={{background:'#1B4D3E',padding:'18px',marginTop:'8px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#B8D935',marginBottom:'10px'}}>Evaluation Parameters</div>
              {[{l:'Evaluation Window',v:'6–17 weeks (by stage)'},{l:'Scoring Team Size',v:'3 evaluators minimum'},{l:'Appeal Window',v:'30 days post-score'},{l:'Score Validity',v:'12 months'},{l:'External Service',v:'Available on commission'}].map((p,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:i<4?'1px solid rgba(255,255,255,0.08)':'none'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.45)'}}>{p.l}</span>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'#FAF8F3',textAlign:'right'}}>{p.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── CASE STUDY ────────────────────────────────────────────────────────────────
const CaseStudy = () => (
  <div className="pad-section" style={{background:'#FAF8F3',padding:'48px 64px',borderBottom:'1px solid #D8D4C8'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <Rule/><SL>VI &middot; Case Study &mdash; Kejetia Market Digitisation</SL>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'flex-start'}} className="tc">
        <div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:700,color:'#0D1A10',lineHeight:1.2,marginBottom:'16px'}}>87 out of 100.</h2>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'16px'}}>BRIDGE&rsquo;s flagship venture &mdash; West Africa&rsquo;s largest market, serving 10,000+ vendors in Kumasi &mdash; scored 87/100. It is the benchmark against which all subsequent ventures are calibrated.</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'24px'}}>Exceptional Peace &amp; Prosperity alignment, strong strategic fit, credible execution team with Kumasi market expertise, and demonstrated national replication potential across Ghana&rsquo;s 16 regions.</p>
          <div style={{borderLeft:'4px solid #B8D935',paddingLeft:'20px'}}>
            <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:'#1B4D3E',lineHeight:1.55}}>Kejetia set the standard. Every venture scored since has been measured against what 87 looks like in practice.</p>
            <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:'#5C6B5E',letterSpacing:'1px',textTransform:'uppercase'}}>&mdash; BRIDGE Investment Committee, 2023</div>
          </div>
        </div>
        <div>
          <div style={{background:'#0D1A10',padding:'20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'18px'}}>
              <div style={{width:'18px',height:'1px',background:'#B8D935'}}/>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#B8D935'}}>Kejetia Scorecard</span>
            </div>
            <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'20px'}}>
              <span style={{fontFamily:F.mono,fontSize:'64px',color:'#B8D935',lineHeight:1}}>87</span>
              <span style={{fontFamily:F.mono,fontSize:'18px',color:'rgba(184,217,53,0.4)'}}>/100</span>
            </div>
            <div style={{height:'4px',background:'rgba(255,255,255,0.08)',marginBottom:'24px'}}><div style={{height:'100%',width:'87%',background:'#B8D935'}}/></div>
            {KEJETIA.map((k,i)=>(
              <div key={k.label} style={{paddingBottom:'14px',marginBottom:'14px',borderBottom:i<3?'1px solid rgba(255,255,255,0.08)':'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.55)'}}>{k.label}</span>
                  <span style={{fontFamily:F.mono,fontSize:'11px',color:'#B8D935'}}>{k.score}<span style={{color:'rgba(184,217,53,0.4)'}}>/{k.max}</span></span>
                </div>
                <div style={{height:'3px',background:'rgba(255,255,255,0.08)'}}><div style={{height:'100%',width:((k.score/k.max)*100)+'%',background:'#B8D935'}}/></div>
              </div>
            ))}
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#B8D935',marginTop:'4px'}}>Exceptional &middot; Priority Pursuit</div>
          </div>
          <div style={{border:'1px solid #D8D4C8',borderTop:'none',padding:'14px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#5C6B5E',marginBottom:'10px'}}>What 87 Unlocked</div>
            {['Accelerated evaluation — 3 weeks total','Full due diligence with Ghana Infrastructure Fund','Pilot authority: 3 market zones, Phase I','Replication study commissioned for Tamale & Accra'].map((item,i)=>(
              <div key={i} style={{display:'flex',gap:'8px',padding:'6px 0',borderBottom:i<3?'1px solid #D8D4C8':'none'}}>
                <span style={{color:'#B8D935',fontFamily:F.sans,fontSize:'11px',fontWeight:700,flexShrink:0}}>&rarr;</span>
                <span style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.6,color:'#5C6B5E'}}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── CONVERSION GATE ───────────────────────────────────────────────────────────
const Gate = () => {
  const [expanded,setExpanded] = useState(false);
  const PREVIEW = 5;
  const visible = expanded ? MEMBER_ITEMS : MEMBER_ITEMS.slice(0,PREVIEW);
  const hidden = MEMBER_ITEMS.length - PREVIEW;
  return (
    <div>
      {/* Ink teaser strip */}
      <div style={{background:'#0D1A10',padding:'40px 64px'}} className="pad-section">
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'center'}} className="tc">
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'#B8D935',marginBottom:'14px'}}>What Members See That You Don&rsquo;t</div>
              <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,34px)',fontWeight:700,fontStyle:'italic',color:'#FAF8F3',lineHeight:1.25,marginBottom:'16px'}}>This publication is the summary. The full methodology is considerably deeper.</h2>
              <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.55)',lineHeight:1.75,fontWeight:300,marginBottom:'0'}}>BRIDGE Members access the complete scoring infrastructure: every worksheet, every precedent, every venture scored since 2022. The public version you are reading covers the framework. Members work with the instrument.</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px'}}>
              {[{v:'174+',l:'Ventures Scored'},{v:'12',l:'Sectors Covered'},{v:'60K+',l:'Words of Research'},{v:'100%',l:'Written Rationale'}].map((s,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,0.04)',padding:'20px 16px'}}>
                  <div style={{fontFamily:F.mono,fontSize:'32px',color:'#B8D935',lineHeight:1,marginBottom:'6px'}}>{s.v}</div>
                  <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px'}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Forest gate */}
      <div className="pad-gate" style={{background:'#1B4D3E',padding:'48px 64px 48px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:'-20px',bottom:'-40px',fontFamily:F.display,fontSize:'clamp(80px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.03)',pointerEvents:'none',userSelect:'none',letterSpacing:'-6px',lineHeight:1}}>01</div>
        <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'#B8D935',marginBottom:'14px'}}>BRIDGE MEMBERS &middot; FULL INTELLIGENCE ACCESS</div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,34px)',fontWeight:700,fontStyle:'italic',color:'#FAF8F3',lineHeight:1.25,marginBottom:'10px',maxWidth:'640px'}}>The complete Impact Score&#8482; Intelligence Package includes:</h2>
          <p className="gate-value-line" style={{fontFamily:F.body,fontSize:'14px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',marginBottom:'28px',lineHeight:1.65}}>Everything required to evaluate, benchmark, and commission Impact Score&#8482; assessments across all 12 sectors.</p>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 40px'}} className="tc">
            {visible.map((item,idx)=>(
              <div key={idx} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
                <span style={{color:'#B8D935',fontFamily:F.sans,fontSize:'13px',fontWeight:700,flexShrink:0,lineHeight:1.5,marginTop:'1px'}}>&rarr;</span>
                <span style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.68)',lineHeight:1.55}}>{item}</span>
              </div>
            ))}
          </div>
          {!expanded&&hidden>0&&(
            <button onClick={()=>setExpanded(true)} style={{marginTop:'14px',display:'flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'9px 18px',cursor:'pointer',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'rgba(250,248,243,0.6)'}}>
              <span style={{color:'#B8D935'}}>+{hidden}</span> more deliverables included <span style={{opacity:0.5}}>&#9660;</span>
            </button>
          )}

          {/* Membership tiers — 5 official BRIDGE tiers */}
          <div style={{marginTop:'36px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px'}} className="tc" id="tier-grid">
            <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
              {TIERS.slice(0,3).map((t,i)=>(
                <div key={i} style={{background:t.hi?'#B8D935':'rgba(255,255,255,0.06)',border:t.hi?'none':'1px solid rgba(255,255,255,0.1)',padding:'18px 20px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'10px'}}>
                    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:t.hi?'#0D1A10':'rgba(250,248,243,0.4)'}}>Tier {i+1} &middot; {t.tier}</div>
                    <div style={{fontFamily:F.mono,fontSize:'14px',color:t.hi?'#0D1A10':'#FAF8F3',flexShrink:0,marginLeft:'12px'}}>{t.price}</div>
                  </div>
                  {t.features.map((f,fi)=>(
                    <div key={fi} style={{display:'flex',gap:'7px',marginBottom:'5px'}}>
                      <span style={{color:t.hi?'#1B4D3E':'rgba(184,217,53,0.7)',fontFamily:F.sans,fontSize:'10px',fontWeight:700,flexShrink:0,lineHeight:1.6}}>&#10003;</span>
                      <span style={{fontFamily:F.body,fontSize:'11px',color:t.hi?'#1B4D3E':'rgba(250,248,243,0.6)',lineHeight:1.5}}>{f}</span>
                    </div>
                  ))}
                  <a href="#" style={{display:'block',marginTop:'14px',background:t.hi?'#1B4D3E':'rgba(255,255,255,0.08)',color:t.hi?'#B8D935':'rgba(250,248,243,0.7)',padding:'8px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,textDecoration:'none',textAlign:'center'}}>{t.cta} &rarr;</a>
                </div>
              ))}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
              {TIERS.slice(3).map((t,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'18px 20px',flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'10px'}}>
                    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>Tier {i+4} &middot; {t.tier}</div>
                    <div style={{fontFamily:F.mono,fontSize:'14px',color:'#B8D935',flexShrink:0,marginLeft:'12px'}}>{t.price}</div>
                  </div>
                  {t.features.map((f,fi)=>(
                    <div key={fi} style={{display:'flex',gap:'7px',marginBottom:'5px'}}>
                      <span style={{color:'rgba(184,217,53,0.7)',fontFamily:F.sans,fontSize:'10px',fontWeight:700,flexShrink:0,lineHeight:1.6}}>&#10003;</span>
                      <span style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.6)',lineHeight:1.5}}>{f}</span>
                    </div>
                  ))}
                  <a href="#" style={{display:'block',marginTop:'14px',background:'rgba(255,255,255,0.08)',color:'rgba(250,248,243,0.7)',padding:'8px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,textDecoration:'none',textAlign:'center'}}>{t.cta} &rarr;</a>
                </div>
              ))}
              <div style={{background:'rgba(184,217,53,0.08)',border:'1px solid rgba(184,217,53,0.2)',padding:'14px 16px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#B8D935',marginBottom:'6px'}}>Members Progress Between Tiers</div>
                <p style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.5)',lineHeight:1.6,margin:0}}>As circumstances and interest evolve, members move freely between tiers. Your entry point is not your ceiling.</p>
              </div>
            </div>
          </div>

          <div style={{marginTop:'24px',borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'14px'}}>
            <p className="gate-value-line" style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.35)',lineHeight:1.65,maxWidth:'500px'}}>External Impact Score&#8482; commissions available to founders, government agencies, and development finance institutions. Enquire at bridge-pbc.com.</p>
            <a href="#" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'rgba(250,248,243,0.55)',textDecoration:'none',flexShrink:0,border:'1px solid rgba(255,255,255,0.15)',padding:'8px 14px'}}>&#9660;&nbsp; Download Free Summary</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── FOOTER ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <div className="pad-footer" style={{background:'#1B4D3E',padding:'16px 64px',borderTop:'3px solid #B8D935'}}>
    <div className="footer-inner" style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={18} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.15)'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>General Series &middot; Doc 01 / 23 &middot; Public Edition &middot; bridge-pbc.com</div>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'14px'}}>
        {['All Documents','Members','Apply','Contact'].map((l,i)=>(
          <a key={i} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.35)',textDecoration:'none'}}>{l}</a>
        ))}
      </div>
    </div>
  </div>
);

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function ImpactScorePublic() {
  const [isMobile, setIsMobile] = useState(false);
  const logoRef = useRef(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  if (isMobile) return <MobileImpactScorePublic/>;
  return (
    <div style={{fontFamily:F.body,background:'#FAF8F3'}}>
      <Gf/>
      <TopBar logoRef={logoRef}/>
      <Cover logoRef={logoRef}/>
      <Executive/>
      <TheProblem/>
      <FourDimensions/>
      <EvalProcess/>
      <CaseStudy/>
      <Gate/>
      <Footer/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MOBILE LAYOUT — renders at ≤600px via root breakpoint switch
// ══════════════════════════════════════════════════════════════════════════════

const MOB_NAV = [
  {id:'cover',   icon:'◈', label:'Overview'},
  {id:'method',  icon:'◎', label:'Method'},
  {id:'process', icon:'◫', label:'Process'},
  {id:'case',    icon:'◉', label:'Case Study'},
  {id:'join',    icon:'◆', label:'Join'},
];

const MobBottomNav = ({active, onSelect}) => (
  <div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,
    background:'#0D1A10',borderTop:'1px solid rgba(255,255,255,0.08)',
    display:'flex',paddingBottom:'env(safe-area-inset-bottom)'}}>
    {MOB_NAV.map(item => {
      const on = active===item.id;
      return (
        <button key={item.id} onClick={()=>onSelect(item.id)} style={{flex:1,display:'flex',flexDirection:'column',
          alignItems:'center',justifyContent:'center',padding:'10px 4px 8px',background:'transparent',border:'none',cursor:'pointer',gap:'3px',transition:'all 0.15s'}}>
          <div style={{width:'30px',height:'30px',borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center',
            background:on?'rgba(184,217,53,0.15)':'transparent',transition:'all 0.15s'}}>
            <span style={{fontSize:'13px',color:on?'#B8D935':'rgba(255,255,255,0.25)',lineHeight:1}}>{item.icon}</span>
          </div>
          <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:on?700:500,
            color:on?'#B8D935':'rgba(255,255,255,0.25)',letterSpacing:'0.3px'}}>{item.label}</span>
          {on && <div style={{width:'16px',height:'2px',background:'#B8D935',borderRadius:'1px'}}/>}
        </button>
      );
    })}
  </div>
);

const MobChip = ({children,accent}) => (
  <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',
    color:accent?'#0D1A10':'#B8D935',background:accent?'#B8D935':'rgba(184,217,53,0.12)',padding:'3px 9px',display:'inline-block'}}>{children}</span>
);
const MobLabel = ({children}) => (
  <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'#5C6B5E',marginBottom:'10px'}}>{children}</div>
);
const MobRule = () => (
  <div style={{borderTop:'4px solid #0D1A10',borderBottom:'2px solid #B8D935',paddingBottom:'3px',marginBottom:'16px'}}/>
);

// ── Screen: Overview ──────────────────────────────────────────────────────────
const MobOverview = () => {
  const [execOpen,setExecOpen] = useState(false);
  return (
    <div className="fade-in" style={{background:'#0D1A10',minHeight:'100vh',paddingBottom:'70px'}}>
      <div style={{padding:'20px 20px 0'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
          <div style={{background:'#B8D935',color:'#0D1A10',fontFamily:'"DM Mono","Courier New",monospace',fontSize:'10px',fontWeight:700,padding:'3px 8px',letterSpacing:'1px'}}>DOC 01/23</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.06)'}}/>
          <MobChip>Public Edition</MobChip>
        </div>
        <h1 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'56px',fontWeight:900,color:'#FAF8F3',lineHeight:0.95,letterSpacing:'-2px',marginBottom:'4px'}}>BRIDGE</h1>
        <h1 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'56px',fontWeight:900,color:'#B8D935',lineHeight:0.95,letterSpacing:'-2px',marginBottom:'22px'}}>Impact Score&#8482;</h1>
        <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'14px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.65,marginBottom:'24px'}}>
          The proprietary evaluation methodology applied to every venture BRIDGE considers &mdash; rigorous, reproducible, grounded in the flourishing of Ghanaian citizens.
        </p>
        {/* Score feature */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)',padding:'16px',marginBottom:'2px'}}>
          <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'6px'}}>Point Scale</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'10px'}}>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'64px',fontWeight:500,color:'#B8D935',lineHeight:1}}>100</span>
            <div>
              <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,color:'#B8D935',letterSpacing:'1px',textTransform:'uppercase',marginBottom:'2px'}}>Full Spectrum</div>
              <div style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',color:'rgba(255,255,255,0.3)'}}>4 dimensions · 12 sub-components</div>
            </div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'24px'}}>
          {[{v:'174+',l:'Ventures Evaluated'},{v:'12',l:'Sectors Covered'},{v:'65',l:'Qualifying Score'},{v:'100%',l:'Written Rationale'}].map((s,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.04)',padding:'13px'}}>
              <div style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'22px',color:'#FAF8F3',lineHeight:1,marginBottom:'3px'}}>{s.v}</div>
              <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',color:'rgba(255,255,255,0.28)'}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{borderLeft:'3px solid rgba(184,217,53,0.35)',paddingLeft:'14px',marginBottom:'24px'}}>
          <p style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'14px',fontStyle:'italic',fontWeight:600,color:'rgba(250,248,243,0.5)',lineHeight:1.55}}>
            Every investment decision is simultaneously a decision not to invest somewhere else. The communities depending on these resources deserve better than intuition.
          </p>
        </div>
        {/* Executive summary collapse */}
        <div style={{background:'#FAF8F3',borderTop:'3px solid rgba(184,217,53,0.6)'}}>
          <div onClick={()=>setExecOpen(o=>!o)} style={{padding:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
            <MobLabel>Executive Summary</MobLabel>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:'#5C6B5E',transform:execOpen?'rotate(180deg)':'none',transition:'transform 0.2s',flexShrink:0,marginLeft:'8px'}}>&#9660;</span>
          </div>
          {execOpen && (
            <div className="slide-up" style={{padding:'0 14px 14px'}}>
              <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'13px',lineHeight:1.8,color:'#0D1A10',fontWeight:300,marginBottom:'10px'}}>
                The BRIDGE Impact Score&#8482; is a 100-point framework measuring Peace &amp; Prosperity Alignment (30 pts), Strategic Fit (25 pts), Feasibility &amp; Execution (25 pts), and Scalability &amp; Sustainability (20 pts).
              </p>
              <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'13px',lineHeight:1.8,color:'#5C6B5E',fontWeight:300,marginBottom:'10px'}}>
                Ventures scoring 65+ proceed to deep due diligence. Applied to 174+ ventures across all 12 sectors.
              </p>
              <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'13px',lineHeight:1.8,color:'#5C6B5E',fontWeight:300}}>
                The Score is not a gate to exclude. It is a standard to protect &mdash; ensuring every venture earns BRIDGE&rsquo;s resources through evidence, not relationship.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Screen: Method ────────────────────────────────────────────────────────────
const MOB_DIMS = [
  {num:'I',  label:'P&P Alignment',pts:30,color:'#1B4D3E',question:'Does this genuinely improve Ghanaian lives?',
    subs:[{label:'Individual Dignity',pts:10,detail:'Does the venture expand agency and meaningful choice for individual Ghanaians? Evaluators examine employment quality, skills transfer, and whether real options for people are materially expanded.'},{label:'Family Security',pts:10,detail:'Does the venture improve the stability of Ghanaian households? Evaluators examine income predictability, access to essential services, and asset-building potential.'},{label:'Community Thriving',pts:10,detail:'Does the venture generate benefits beyond direct beneficiaries? Strong scores reflect employment multipliers, strengthened local institutions, and intergenerational reach.'}]},
  {num:'II', label:'Strategic Fit',pts:25,color:'#2E5A4D',question:'Is this right for BRIDGE specifically?',
    subs:[{label:'Sector Alignment',pts:10,detail:"Does the opportunity fall within BRIDGE's 12 integrated sectors and contribute to the cross-sector portfolio architecture?"},{label:'Diaspora Role',pts:8,detail:'Is the diaspora contribution genuine and value-additive? BRIDGE invests where diaspora involvement authentically changes outcomes.'},{label:'Portfolio Synergy',pts:7,detail:'Does the venture create or amplify integration points with other BRIDGE portfolio companies?'}]},
  {num:'III',label:'Feasibility',  pts:25,color:'#2E6B50',question:'Can this be done — and by whom?',
    subs:[{label:'Financial Viability',pts:10,detail:'Is the financial model grounded in market reality? Is the path to sustainability clearly articulated and credible?'},{label:'Team Capability',pts:8,detail:'Is there a credible implementer with relevant domain experience and a track record of execution?'},{label:'Risk Assessment',pts:7,detail:'Have key risks been honestly identified and quantified? Are mitigation strategies specific and credible?'}]},
  {num:'IV', label:'Scalability',  pts:20,color:'#3A8060',question:'Will this matter beyond its first stage?',
    subs:[{label:'Growth Potential',pts:8,detail:'Can the venture scale meaningfully without proportional increases in external subsidy?'},{label:'Long-Term Viability',pts:7,detail:'Is the business model resilient to market volatility, currency risk, and funding cycle disruption?'},{label:'Replication Potential',pts:5,detail:'Can success here be adapted and deployed in other districts, sectors, or countries?'}]},
];

const MobMethod = () => {
  const [activeCard,setActiveCard] = useState(0);
  const [activeSub,setActiveSub] = useState(null);
  const [scaleOpen,setScaleOpen] = useState(false);
  const scrollRef = useRef(null);

  const scrollToCard = (i) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[i];
    if (card) card.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
    setActiveCard(i); setActiveSub(null);
  };

  return (
    <div className="fade-in" style={{background:'#F0EDE4',minHeight:'100vh',paddingBottom:'70px'}}>
      <div style={{background:'#0D1A10',padding:'20px 20px 16px'}}>
        <MobChip>II · The Four Dimensions</MobChip>
        <h2 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'26px',fontWeight:700,color:'#FAF8F3',lineHeight:1.15,marginTop:'10px',marginBottom:'6px'}}>What the score measures &mdash; and why.</h2>
        <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.6}}>Swipe to explore each dimension. Tap sub-components to expand.</p>
      </div>
      {/* Carousel */}
      <div className="scroll-x" ref={scrollRef}
        style={{display:'flex',gap:'2px',padding:'14px 20px 8px',scrollSnapType:'x mandatory'}}
        onScroll={e=>{const el=e.target;const idx=Math.round(el.scrollLeft/(el.scrollWidth/MOB_DIMS.length));if(idx!==activeCard){setActiveCard(idx);setActiveSub(null);}}}>
        {MOB_DIMS.map((dim,i)=>(
          <div key={i} onClick={()=>scrollToCard(i)}
            style={{flex:'0 0 calc(82vw)',scrollSnapAlign:'center',background:activeCard===i?'#0D1A10':dim.color,
              padding:'16px',cursor:'pointer',transition:'background 0.2s',
              borderBottom:activeCard===i?'3px solid #B8D935':'3px solid transparent'}}>
            <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.38)',marginBottom:'5px'}}>Dim {dim.num}</div>
            <div style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'38px',color:'#B8D935',lineHeight:1,marginBottom:'3px'}}>{dim.pts}</div>
            <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',marginBottom:'10px'}}>pts</div>
            <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'13px',fontWeight:700,color:'#FAF8F3',marginBottom:'3px'}}>{dim.label}</div>
            <div style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.42)',lineHeight:1.45}}>{dim.question}</div>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div style={{display:'flex',gap:'6px',justifyContent:'center',padding:'4px 0 10px'}}>
        {MOB_DIMS.map((_,i)=>(
          <div key={i} onClick={()=>scrollToCard(i)} style={{
            width:i===activeCard?'24px':'8px',height:'8px',borderRadius:'4px',
            background:i===activeCard?'#B8D935':'rgba(255,255,255,0.2)',cursor:'pointer',transition:'all 0.3s ease'}}/>
        ))}
      </div>
      {/* Active dim sub-components */}
      {MOB_DIMS[activeCard] && (
        <div className="slide-up" key={activeCard} style={{padding:'0 20px 14px'}}>
          <div style={{background:'#FAF8F3',borderTop:'3px solid '+MOB_DIMS[activeCard].color}}>
            <div style={{padding:'12px 14px 0'}}><MobLabel>{MOB_DIMS[activeCard].label} — Sub-Components</MobLabel></div>
            {MOB_DIMS[activeCard].subs.map((sub,si)=>(
              <div key={si}>
                <div onClick={()=>setActiveSub(activeSub===si?null:si)}
                  style={{display:'flex',justifyContent:'space-between',alignItems:'center',
                    padding:'11px 14px',borderBottom:'1px solid #D8D4C8',cursor:'pointer',
                    background:activeSub===si?'rgba(27,77,62,0.05)':'transparent',transition:'background 0.15s'}}>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'12px',fontWeight:700,color:'#0D1A10',marginBottom:'3px'}}>{sub.label}</div>
                    <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                      <div style={{height:'3px',width:sub.pts*3.5,background:'#B8D935',borderRadius:'1px'}}/>
                      <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'10px',color:'#5C6B5E'}}>{sub.pts}pts</span>
                    </div>
                  </div>
                  <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:'#5C6B5E',transform:activeSub===si?'rotate(180deg)':'none',transition:'transform 0.2s',flexShrink:0,marginLeft:'10px'}}>&#9660;</span>
                </div>
                {activeSub===si && (
                  <div className="slide-up" style={{padding:'12px 14px',background:'rgba(27,77,62,0.04)',borderBottom:'1px solid #D8D4C8'}}>
                    <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',lineHeight:1.75,color:'#5C6B5E',margin:0,fontWeight:300}}>{sub.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Scoring scale */}
      <div style={{padding:'0 20px 14px'}}>
        <div style={{background:'#FAF8F3',border:'1px solid #D8D4C8'}}>
          <div onClick={()=>setScaleOpen(o=>!o)}
            style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px',borderBottom:scaleOpen?'1px solid #D8D4C8':'none',cursor:'pointer'}}>
            <div>
              <MobLabel>III · The Scoring Scale</MobLabel>
              <div style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'15px',fontWeight:700,color:'#0D1A10',marginTop:'-6px'}}>What each score commits BRIDGE to.</div>
            </div>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:'#5C6B5E',transform:scaleOpen?'rotate(180deg)':'none',transition:'transform 0.2s',flexShrink:0,marginLeft:'10px'}}>&#9660;</span>
          </div>
          {scaleOpen && THRESHOLDS.map((t,i)=>(
            <div key={i} className="slide-up" style={{padding:'12px 14px',borderBottom:i<4?'1px solid #D8D4C8':'none',background:i%2===0?'#FAF8F3':'#F0EDE4'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'4px'}}>
                <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'15px',color:t.color}}>{t.range}</span>
                <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',fontWeight:700,color:'#0D1A10'}}>{t.rating}</span>
              </div>
              <div style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',fontStyle:'italic',color:'#5C6B5E',lineHeight:1.5,marginBottom:'7px'}}>{t.action}</div>
              <div style={{height:'3px',background:'#D8D4C8'}}><div style={{height:'100%',width:t.bar+'%',background:t.color,opacity:0.75}}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Screen: Process ───────────────────────────────────────────────────────────
const MOB_STAGES = [
  {n:'01',title:'Initial Screening',   time:'1–2 wks',desc:'Sector alignment, submitter credibility, and information completeness. Every application receives a written response.'},
  {n:'02',title:'Impact Score™',       time:'2–4 wks',desc:'Full four-dimension scoring drawing on 60,000+ words of proprietary sector research. Every sub-component documented.'},
  {n:'03',title:'Deep Due Diligence',  time:'4–8 wks',desc:'Reserved for ventures scoring 65+. Financial model review, team assessment, market validation, legal analysis.'},
  {n:'04',title:'IC Review',           time:'1–2 wks',desc:'Investment Committee evaluates findings against portfolio priorities and capital availability.'},
  {n:'05',title:'Structuring',         time:'2–4 wks',desc:'Terms negotiated, governance documented, milestones agreed before any capital is committed.'},
];

const MobProcess = () => {
  const [openStage,setOpenStage] = useState(null);
  const [objOpen,setObjOpen] = useState(false);
  return (
    <div className="fade-in" style={{background:'#FAF8F3',minHeight:'100vh',paddingBottom:'70px'}}>
      <div style={{background:'#0D1A10',padding:'20px 20px 16px'}}>
        <MobChip>IV · The Evaluation Process</MobChip>
        <h2 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'26px',fontWeight:700,color:'#FAF8F3',lineHeight:1.15,marginTop:'10px',marginBottom:'6px'}}>Five stages. One uncompromising standard.</h2>
        <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.6}}>Transparent at every decision point. Tap each stage for detail.</p>
      </div>
      <div style={{padding:'20px 20px 0'}}>
        {MOB_STAGES.map((s,i)=>(
          <div key={i} style={{display:'flex',gap:'14px'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'40px',flexShrink:0}}>
              <div onClick={()=>setOpenStage(openStage===i?null:i)}
                style={{width:'40px',height:'40px',background:openStage===i?'#B8D935':'#1B4D3E',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,cursor:'pointer',transition:'background 0.15s'}}>
                <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:openStage===i?'#0D1A10':'#B8D935'}}>{s.n}</span>
              </div>
              {i<MOB_STAGES.length-1&&<div style={{width:'2px',flex:1,background:'#D8D4C8',minHeight:'20px'}}/>}
            </div>
            <div style={{flex:1}}>
              <div onClick={()=>setOpenStage(openStage===i?null:i)}
                style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',paddingTop:'8px',paddingBottom:'10px',cursor:'pointer'}}>
                <div style={{flex:1,paddingRight:'8px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'7px',marginBottom:'3px',flexWrap:'wrap'}}>
                    <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'12px',fontWeight:700,color:'#0D1A10'}}>{s.title}</span>
                    <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'#B8D935',background:'rgba(184,217,53,0.12)',padding:'2px 6px'}}>{s.time}</span>
                  </div>
                  <div style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',color:'#5C6B5E',lineHeight:1.55}}>{s.desc.slice(0,70)}&#8230;</div>
                </div>
                <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'11px',color:'#5C6B5E',transform:openStage===i?'rotate(180deg)':'none',transition:'transform 0.2s',flexShrink:0,paddingTop:'6px'}}>&#9660;</span>
              </div>
              {openStage===i&&(
                <div className="slide-up" style={{marginBottom:'12px',borderLeft:'3px solid #B8D935',paddingLeft:'12px'}}>
                  <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',lineHeight:1.8,color:'#0D1A10',margin:0,fontWeight:300}}>{s.desc}</p>
                </div>
              )}
              {i<MOB_STAGES.length-1&&<div style={{borderTop:'1px solid #E8E4D8'}}/>}
            </div>
          </div>
        ))}
      </div>
      {/* Objectivity */}
      <div style={{padding:'20px 20px 14px'}}>
        <MobRule/>
        <div style={{background:'#F0EDE4',border:'1px solid #D8D4C8'}}>
          <div onClick={()=>setObjOpen(o=>!o)}
            style={{padding:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
            <div>
              <MobLabel>V · Why It Is Genuinely Objective</MobLabel>
              <div style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'14px',fontWeight:700,color:'#0D1A10',marginTop:'-6px'}}>Three design features &mdash; not just assurances.</div>
            </div>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:'#5C6B5E',transform:objOpen?'rotate(180deg)':'none',transition:'transform 0.2s',flexShrink:0,marginLeft:'10px'}}>&#9660;</span>
          </div>
          {objOpen&&(
            <div className="slide-up">
              {[{title:'Standardised criteria across all sectors',body:'The same four dimensions apply to every venture regardless of sector, submitter, or investment size.'},{title:'Scoring separated from relationship management',body:'The team that builds relationships with venture founders is not the team that evaluates them.'},{title:'Documented, auditable rationale at every level',body:'Every score is accompanied by written justification. Scores can be reviewed, challenged, and revised.'}].map((w,i)=>(
                <div key={i} style={{display:'flex',gap:'10px',padding:'12px 14px',borderTop:'1px solid #D8D4C8'}}>
                  <div style={{width:'3px',background:'#B8D935',flexShrink:0,alignSelf:'stretch'}}/>
                  <div>
                    <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'11px',fontWeight:700,color:'#0D1A10',marginBottom:'4px'}}>{w.title}</div>
                    <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',lineHeight:1.7,color:'#5C6B5E',margin:0,fontWeight:300}}>{w.body}</p>
                  </div>
                </div>
              ))}
              <div style={{background:'#1B4D3E',padding:'14px'}}>
                <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#B8D935',marginBottom:'8px'}}>Evaluation Parameters</div>
                {[['Evaluation Window','6–17 weeks'],['Scoring Team','3 evaluators min.'],['Appeal Window','30 days post-score'],['Score Validity','12 months']].map((p,i)=>(
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:i<3?'1px solid rgba(255,255,255,0.07)':'none'}}>
                    <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'11px',color:'rgba(250,248,243,0.4)'}}>{p[0]}</span>
                    <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'11px',fontWeight:700,color:'#FAF8F3'}}>{p[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Screen: Case Study ────────────────────────────────────────────────────────
const MOB_KEJETIA = [{label:'P&P Alignment',score:26,max:30},{label:'Strategic Fit',score:23,max:25},{label:'Feasibility',score:22,max:25},{label:'Scalability',score:16,max:20}];

const MobCase = () => {
  const [unlockOpen,setUnlockOpen] = useState(false);
  return (
    <div className="fade-in" style={{background:'#0D1A10',minHeight:'100vh',paddingBottom:'70px'}}>
      <div style={{padding:'20px 20px 0'}}>
        <MobChip>VI · Case Study</MobChip>
        <h2 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'28px',fontWeight:700,color:'#FAF8F3',lineHeight:1.15,marginTop:'10px',marginBottom:'6px'}}>Kejetia Market Digitisation.</h2>
        <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.6,marginBottom:'18px'}}>West Africa&rsquo;s largest market &mdash; 10,000+ vendors &mdash; BRIDGE&rsquo;s benchmark venture.</p>
      </div>
      <div style={{padding:'0 20px 16px'}}>
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',padding:'18px'}}>
          <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#B8D935',marginBottom:'8px'}}>BRIDGE Impact Score&#8482;</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'8px',marginBottom:'12px'}}>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'72px',color:'#B8D935',lineHeight:1}}>87</span>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'20px',color:'rgba(184,217,53,0.4)'}}>/100</span>
            <div style={{marginLeft:'4px'}}>
              <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,color:'#B8D935',textTransform:'uppercase',letterSpacing:'1px'}}>Exceptional</div>
              <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',color:'rgba(250,248,243,0.3)'}}>Priority Pursuit</div>
            </div>
          </div>
          <div style={{height:'4px',background:'rgba(255,255,255,0.08)',marginBottom:'20px'}}><div style={{height:'100%',width:'87%',background:'#B8D935'}}/></div>
          {MOB_KEJETIA.map((k,i)=>(
            <div key={k.label} style={{marginBottom:i<3?'10px':'0'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'3px'}}>
                <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',color:'rgba(250,248,243,0.5)'}}>{k.label}</span>
                <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'10px',color:'#B8D935'}}>{k.score}<span style={{color:'rgba(184,217,53,0.35)'}}>/{k.max}</span></span>
              </div>
              <div style={{height:'3px',background:'rgba(255,255,255,0.08)'}}><div style={{height:'100%',width:((k.score/k.max)*100)+'%',background:'#B8D935'}}/></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:'0 20px 16px'}}>
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',padding:'14px',marginBottom:'2px'}}>
          <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'13px',lineHeight:1.8,color:'rgba(250,248,243,0.65)',margin:'0 0 12px',fontWeight:300}}>
            Exceptional Peace &amp; Prosperity alignment, strong strategic fit with Infrastructure, credible execution team with Kumasi market expertise, and national replication potential.
          </p>
          <div style={{borderLeft:'3px solid rgba(184,217,53,0.35)',paddingLeft:'12px'}}>
            <p style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',lineHeight:1.55,margin:0}}>Kejetia set the standard. Every venture scored since has been measured against what 87 looks like in practice.</p>
          </div>
        </div>
        <div onClick={()=>setUnlockOpen(o=>!o)}
          style={{background:'rgba(184,217,53,0.08)',border:'1px solid rgba(184,217,53,0.18)',borderTop:'none',padding:'12px 14px',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0'}}>
          <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#B8D935'}}>What 87 Unlocked</span>
          <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:'#B8D935',transform:unlockOpen?'rotate(180deg)':'none',transition:'transform 0.2s'}}>&#9660;</span>
        </div>
        {unlockOpen&&(
          <div className="slide-up" style={{background:'rgba(184,217,53,0.05)',border:'1px solid rgba(184,217,53,0.15)',borderTop:'none',padding:'12px 14px',marginBottom:'0'}}>
            {['Accelerated evaluation — 3 weeks total','Full due diligence with Ghana Infrastructure Fund','Pilot authority: 3 market zones, Phase I','Replication study for Tamale & Accra'].map((item,i)=>(
              <div key={i} style={{display:'flex',gap:'8px',padding:'6px 0',borderBottom:i<3?'1px solid rgba(184,217,53,0.1)':'none'}}>
                <span style={{color:'#B8D935',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'11px',fontWeight:700,flexShrink:0}}>&rarr;</span>
                <span style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',lineHeight:1.6,color:'rgba(250,248,243,0.6)'}}>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Screen: Join ──────────────────────────────────────────────────────────────
const MOB_TIERS = [
  {n:'1',tier:'General Community',price:'Free',hi:false,features:['Public content & events','Big Ideas Challenge','BRIDGE newsletter']},
  {n:'2',tier:'Network Members',price:'$100/yr',hi:false,features:['Full platform access','Member directory & opportunity database','Idea submission with feedback']},
  {n:'3',tier:'Professional Contributors',price:'$500–$2,000/yr',hi:true,features:['Mentorship & advisory matching','Deal flow access (observer)','Contributor retreats','BRIDGE leadership engagement']},
  {n:'4',tier:'Investors',price:'From $10K',hi:false,features:['LP rights in BRIDGE Fund(s)','Quarterly investor reporting','Co-investment opportunities','Advisory Council eligibility']},
  {n:'5',tier:'Strategic Partners',price:'By Invitation',hi:false,features:['Board or Advisory Council seat','Strategic direction input','Co-branding opportunities','Named programs & flagship access']},
];
const MOB_MEMBER_ITEMS = [
  'Complete scoring worksheets — all 4 dimensions','Venture comparison matrix — 174+ opportunities',
  'Evaluator calibration guide & protocols','Score appeal and revision framework',
  'Portfolio integration analysis','Quarterly pipeline report',
  "Commissioner's guide for external engagements",'Historical score distribution (2022–2025)',
  'Weighting rationale paper','12 annotated scorecards from flagship ventures',
];

const MobJoin = () => {
  const [activeTier,setActiveTier] = useState(2);
  const [pkgOpen,setPkgOpen] = useState(false);
  return (
    <div className="fade-in" style={{background:'#1B4D3E',minHeight:'100vh',paddingBottom:'70px'}}>
      <div style={{padding:'20px 20px 16px'}}>
        <MobChip accent>Members · Full Access</MobChip>
        <h2 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'26px',fontWeight:700,fontStyle:'italic',color:'#FAF8F3',lineHeight:1.2,marginTop:'10px',marginBottom:'8px'}}>
          This is the public summary. The full methodology is considerably deeper.
        </h2>
        <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'13px',color:'rgba(250,248,243,0.5)',lineHeight:1.7,fontWeight:300}}>
          BRIDGE Members access the complete scoring infrastructure: every worksheet, every precedent, every venture scored since 2022.
        </p>
      </div>
      {/* Package items */}
      <div style={{padding:'0 20px 14px'}}>
        <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)'}}>
          <div onClick={()=>setPkgOpen(o=>!o)}
            style={{padding:'13px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
            <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#B8D935'}}>Full Package Includes</span>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:'#B8D935',transform:pkgOpen?'rotate(180deg)':'none',transition:'transform 0.2s'}}>&#9660;</span>
          </div>
          {pkgOpen&&(
            <div className="slide-up">
              {MOB_MEMBER_ITEMS.map((item,idx)=>(
                <div key={idx} style={{display:'flex',gap:'8px',padding:'8px 14px',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
                  <span style={{color:'#B8D935',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'11px',fontWeight:700,flexShrink:0,lineHeight:1.5}}>&rarr;</span>
                  <span style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',color:'rgba(250,248,243,0.62)',lineHeight:1.5}}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Tier selector */}
      <div style={{padding:'0 20px 14px'}}>
        <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'8px'}}>Choose Your Path</div>
        <div style={{display:'flex',gap:'2px',marginBottom:'2px',overflowX:'auto'}}>
          {MOB_TIERS.map((t,i)=>(
            <button key={i} onClick={()=>setActiveTier(i)}
              style={{flex:'0 0 auto',padding:'7px 11px',
                background:activeTier===i?(t.hi?'#B8D935':'rgba(255,255,255,0.14)'):'rgba(255,255,255,0.04)',
                border:activeTier===i?(t.hi?'none':'1px solid rgba(255,255,255,0.25)'):'1px solid rgba(255,255,255,0.06)',
                cursor:'pointer',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,
                color:activeTier===i?(t.hi?'#0D1A10':'#FAF8F3'):'rgba(250,248,243,0.3)',
                transition:'all 0.15s',whiteSpace:'nowrap'}}>
              {t.n}. {t.tier.split(' ')[0]}
            </button>
          ))}
        </div>
        {MOB_TIERS[activeTier]&&(
          <div className="slide-up" key={activeTier}
            style={{background:MOB_TIERS[activeTier].hi?'#B8D935':'rgba(255,255,255,0.06)',
              border:MOB_TIERS[activeTier].hi?'none':'1px solid rgba(255,255,255,0.1)',padding:'18px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
              <div>
                <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',letterSpacing:'1.5px',textTransform:'uppercase',color:MOB_TIERS[activeTier].hi?'rgba(13,26,16,0.45)':'rgba(250,248,243,0.3)',marginBottom:'3px'}}>Tier {MOB_TIERS[activeTier].n}</div>
                <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'14px',fontWeight:700,color:MOB_TIERS[activeTier].hi?'#0D1A10':'#FAF8F3'}}>{MOB_TIERS[activeTier].tier}</div>
              </div>
              <div style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'14px',color:MOB_TIERS[activeTier].hi?'#1B4D3E':'#B8D935'}}>{MOB_TIERS[activeTier].price}</div>
            </div>
            {MOB_TIERS[activeTier].features.map((f,fi)=>(
              <div key={fi} style={{display:'flex',gap:'7px',marginBottom:'6px'}}>
                <span style={{color:MOB_TIERS[activeTier].hi?'#1B4D3E':'rgba(184,217,53,0.7)',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'11px',fontWeight:700,flexShrink:0}}>&#10003;</span>
                <span style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',color:MOB_TIERS[activeTier].hi?'rgba(27,77,62,0.8)':'rgba(250,248,243,0.7)',lineHeight:1.5}}>{f}</span>
              </div>
            ))}
            <a href="#" className="tap-scale" style={{display:'flex',alignItems:'center',justifyContent:'center',
              marginTop:'14px',background:MOB_TIERS[activeTier].hi?'#1B4D3E':'rgba(255,255,255,0.1)',
              color:MOB_TIERS[activeTier].hi?'#B8D935':'#FAF8F3',
              padding:'11px 16px',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'11px',fontWeight:800,textDecoration:'none'}}>
              {activeTier===0?'Join Free':activeTier>=3?'Enquire Now':'Apply Now'} &rarr;
            </a>
          </div>
        )}
        <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.25)',lineHeight:1.6,marginTop:'10px',textAlign:'center'}}>
          Members move freely between tiers as circumstances evolve.
        </p>
      </div>
      {/* Primary CTAs */}
      <div style={{padding:'0 20px 16px'}}>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:'14px'}}>
          <a href="#" className="tap-scale" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
            background:'#B8D935',color:'#0D1A10',padding:'15px 20px',
            fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'13px',fontWeight:800,textDecoration:'none',marginBottom:'8px'}}>
            Apply for Members Access &rarr;
          </a>
          <a href="#" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
            background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.15)',color:'#FAF8F3',
            padding:'12px 20px',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'11px',fontWeight:700,textDecoration:'none'}}>
            &#9660;&nbsp; Download Free Summary
          </a>
          <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.25)',lineHeight:1.6,marginTop:'10px',textAlign:'center'}}>
            External commissions available. Enquire at bridge-pbc.com.
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Mobile root ───────────────────────────────────────────────────────────────
const MobileImpactScorePublic = () => {
  const [screen,setScreen] = useState('cover');
  const renderScreen = () => {
    switch(screen) {
      case 'cover':   return <MobOverview/>;
      case 'method':  return <MobMethod/>;
      case 'process': return <MobProcess/>;
      case 'case':    return <MobCase/>;
      case 'join':    return <MobJoin/>;
      default:        return <MobOverview/>;
    }
  };
  return (
    <div style={{background:'#0D1A10',minHeight:'100vh'}}>
      <div style={{position:'sticky',top:0,zIndex:100,background:'rgba(13,26,16,0.96)',
        backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',
        borderBottom:'1px solid rgba(255,255,255,0.06)',
        padding:'9px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Logo height={18} variant="white"/>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)'}}>Impact Score&#8482;</span>
          <a href="#" onClick={e=>{e.preventDefault();setScreen('join');}}
            style={{background:'#1B4D3E',color:'#B8D935',padding:'5px 12px',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,textDecoration:'none'}}>
            Join &rarr;
          </a>
        </div>
      </div>
      <div key={screen}>{renderScreen()}</div>
      <MobBottomNav active={screen} onSelect={setScreen}/>
    </div>
  );
};
