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
    .mob-full{width:100%!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}
    .mob-item-hidden{display:none!important;}
    .mob-toggle{display:flex!important;align-items:center;justify-content:space-between;width:100%;padding:10px 0;border:none;border-bottom:1px solid #D8D4C8;background:transparent;cursor:pointer;font-family:"DM Sans","Helvetica Neue",sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#5C6B5E;}
    .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
    .mob-toggle-hdr{border-bottom:1px solid rgba(255,255,255,0.08)!important;color:rgba(250,248,243,0.4)!important;}
    .gate-value-line{display:none!important;}
    .gate-cta-row{flex-direction:column!important;}
    .footer-links{display:none!important;}
    .footer-inner{justify-content:center!important;}
    .dim-tiles{grid-template-columns:1fr 1fr!important;}
    .score-table tr td:nth-child(3){display:none!important;}
    .score-table tr th:nth-child(3){display:none!important;}
    .tier-strip{grid-template-columns:1fr 1fr!important;}
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
      <defs><style>{`.qa{fill:none;stroke:${tf};stroke-width:80px;stroke-miterlimit:10;}.qb{fill:${tf};stroke:#000;stroke-width:.5px;stroke-miterlimit:10;}.qc{fill:#b8d935;stroke:#1b4d3e;stroke-miterlimit:10;}.qd{fill:#b8d935;}.qe{fill:${tf};}.qf{fill:#74914a;}`}</style></defs>
      <path className="qe" d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      <path className="qb" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      <path className="qb" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      <rect className="qd" x="1427.4" y="17.4" width="205.2" height="145"/>
      <rect className="qe" x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      <path className="qe" d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      <rect className="qe" x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      <rect className="qd" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect className="qd" x="3083.4" y="654.4" width="175.1" height="257.7"/>
      <rect className="qa" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      <polygon className="qc" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      <path className="qf" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
      <path className="qd" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
    </svg>
  );
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const DIMS = [
  {num:'I',title:'Peace & Prosperity Alignment',pts:30,weight:'30%',question:'Does this opportunity genuinely improve Ghanaian lives?',
    rationale:"The most heavily weighted dimension — deliberately. BRIDGE exists to advance the flourishing of Ghanaian citizens, not simply to deploy capital. An opportunity that scores exceptionally on every other dimension but fails to move the needle on human flourishing does not belong in the BRIDGE portfolio.",
    calibration:"Evaluators use a five-level rubric anchored to field evidence: documented employment quality data, household income change over 18 months post-launch, and community institution strength indices developed by BRIDGE's research team across all 12 sectors.",
    subs:[
      {label:'Individual Dignity',pts:10,weight:'10%',anchor4:"Documented wage premium >20% vs. sector baseline; measurable skills transfer to 80%+ of direct employees",anchor3:"Wage at or above sector median; training programme with external certification",anchor2:"Employment at sector minimum; internal training without external validation",anchor1:"Subsistence-level employment; no skills transfer beyond immediate task",detail:"Does the venture expand agency, capability, and meaningful choice for individual Ghanaians? Evaluators examine quality of employment created, skills that persist beyond the venture, and whether the real options available to people are materially expanded."},
      {label:'Family Security',pts:10,weight:'10%',anchor4:"Income predictability index >0.8; household access to 4+ essential services improved",anchor3:"Stable income with seasonal variance <25%; improvement in 2–3 essential service access points",anchor2:"Income moderately stable; marginal improvement in one service access point",anchor1:"Income highly variable; no measurable household security change",detail:"Does the venture improve the stability and resilience of Ghanaian households? Evaluators look at income predictability, access to essential services, and asset-building potential — not just monthly earnings."},
      {label:'Community Thriving',pts:10,weight:'10%',anchor4:"Employment multiplier >2.5; strengthened at least two local institutions; 10-year+ intergenerational reach demonstrated",anchor3:"Multiplier 1.5–2.5; one institution strengthened; generational reach 5–10 years",anchor2:"Multiplier 1.0–1.5; no institutional strengthening; 1–5 year reach",anchor1:"No multiplier; extractive dynamic; no community benefit beyond wages",detail:"Does the venture generate benefits that reach beyond its direct beneficiaries? Strong scores reflect meaningful employment multipliers, strengthened local institutions, and intergenerational reach."},
    ]},
  {num:'II',title:'Strategic Fit',pts:25,weight:'25%',question:'Is this the right opportunity for BRIDGE specifically?',
    rationale:"Not every excellent idea is a BRIDGE idea. This dimension evaluates whether a venture aligns with BRIDGE's specific capabilities, 12-sector architecture, and portfolio logic. Strategic fit preserves BRIDGE resources for opportunities where BRIDGE adds the most distinctive value.",
    calibration:"Evaluators reference the BRIDGE Sector Architecture Map (updated quarterly) and the Cross-Sector Integration Matrix to score alignment and synergy. Diaspora Role is scored against documented contributions — capital committed, networks activated, skills deployed — not intentions stated.",
    subs:[
      {label:'Sector Alignment',pts:10,weight:'10%',anchor4:"Core activity in a BRIDGE primary sector; addresses a documented priority within that sector's investment thesis",anchor3:"Clear sector fit; addresses a secondary priority within the sector",anchor2:"Peripheral sector fit; tangential to sector investment thesis",anchor1:"Outside BRIDGE sectors or contradicts sector investment thesis",detail:"Does the opportunity fall within BRIDGE's 12 integrated sectors and contribute meaningfully to the cross-sector portfolio architecture?"},
      {label:'Diaspora Role',pts:8,weight:'8%',anchor4:"Diaspora contribution is load-bearing: capital committed, unique expertise deployed, networks activated",anchor3:"Diaspora contribution is meaningful but not decisive; additive rather than foundational",anchor2:"Diaspora involvement is symbolic or passive; would not change outcomes if removed",anchor1:"No genuine diaspora role; relationship is nominal",detail:"Is the diaspora contribution genuine and value-additive — not merely decorative? BRIDGE invests where diaspora involvement authentically changes outcomes."},
      {label:'Portfolio Synergy',pts:7,weight:'7%',anchor4:"Creates or amplifies 3+ cross-sector integration points; strengthens existing portfolio companies",anchor3:"Creates 1–2 meaningful integration points; complementary to portfolio",anchor2:"Parallel to portfolio without significant synergy",anchor1:"Competes with or undermines existing portfolio companies",detail:"Does the venture create or amplify integration points with other BRIDGE portfolio companies?"},
    ]},
  {num:'III',title:'Feasibility & Execution',pts:25,weight:'25%',question:'Can this actually be done — and by whom?',
    rationale:"A venture that aligns perfectly with BRIDGE's mission but cannot be executed is not an opportunity — it is a plan. This dimension applies the same rigour that a top-tier investment firm applies to any deal.",
    calibration:"Financial Viability is scored against a standardised unit economics stress test (3 scenarios: base, adverse, severe). Team Capability is scored using the BRIDGE Implementer Assessment Grid, which separates domain knowledge from execution track record. Risk Assessment is scored by comparing identified risks against BRIDGE's Ghana Macro Risk Register.",
    subs:[
      {label:'Financial Viability',pts:10,weight:'10%',anchor4:"Unit economics positive at base case; adverse scenario survivable; path to self-sufficiency documented within 36 months",anchor3:"Unit economics marginal at base; adverse scenario manageable with reserves; 36–60 month path to sufficiency",anchor2:"Unit economics positive only at optimistic assumptions; no adverse stress testing completed",anchor1:"Financial model contains fundamental errors or depends on permanent subsidy",detail:"Is the financial model grounded in market reality? Is the path to sustainability — without permanent external subsidy — clearly articulated and credible?"},
      {label:'Team Capability',pts:8,weight:'8%',anchor4:"Lead implementer has 5+ years domain experience + 2+ successful Ghana-market ventures; credible team for all critical functions",anchor3:"Lead implementer has 2–5 years domain experience; one prior success; most critical functions covered",anchor2:"Domain experience present but no prior venture completion; gaps in critical functions",anchor1:"No relevant domain experience; no track record; critical functions uncovered",detail:"Is there a credible implementer with relevant domain experience and a track record of execution?"},
      {label:'Risk Assessment',pts:7,weight:'7%',anchor4:"All critical risks identified and quantified; specific mitigations with named owners; scenario planning documented",anchor3:"Most critical risks identified; mitigations exist but some are generic; partial scenario planning",anchor2:"Risks identified at surface level; mitigations are aspirational rather than specific",anchor1:"Risk assessment absent or acknowledges only minor risks; no mitigation strategies",detail:"Have key risks been honestly identified and quantified? Are mitigation strategies specific and credible?"},
    ]},
  {num:'IV',title:'Scalability & Sustainability',pts:20,weight:'20%',question:'Will this matter beyond its first stage?',
    rationale:"BRIDGE does not build success stories that disappear when initial funding runs out. This dimension assesses whether a venture can grow, sustain itself, and serve as a replicable model.",
    calibration:"Growth Potential is scored using BRIDGE's Addressable Market Framework (Ghana-specific). Viability is stress-tested against the Ghana Macro Risk Register. Replication Potential is scored based on documented pilot evidence, not projections.",
    subs:[
      {label:'Growth Potential',pts:8,weight:'8%',anchor4:"Addressable market >$100M; documented demand beyond pilot; clear path to 10x scale without proportional subsidy increase",anchor3:"Addressable market $20–100M; demand evidence present; 3–10x scale pathway identified",anchor2:"Addressable market $5–20M; demand assumed rather than documented; limited scale pathway",anchor1:"Addressable market <$5M or bounded by permanent subsidy requirement",detail:"Can the venture scale meaningfully — in reach, revenue, or impact — without proportional increases in external subsidy?"},
      {label:'Long-Term Viability',pts:7,weight:'7%',anchor4:"Resilient across all four Ghana Macro Risk Register categories; stress-tested and documented",anchor3:"Resilient to 3 of 4 risk categories; one identified vulnerability with documented mitigation",anchor2:"Resilient to 2 risk categories; significant vulnerabilities acknowledged but not mitigated",anchor1:"Depends on sustained optimal macro conditions; no resilience analysis",detail:"Is the business model resilient to market volatility, currency risk, political transition, and funding cycle disruption?"},
      {label:'Replication Potential',pts:5,weight:'5%',anchor4:"Documented replication evidence; playbook developed; 5+ viable replication sites identified in Ghana",anchor3:"Theoretical replication model with 2–4 viable sites identified",anchor2:"Replication possible but no documented model; site identification incomplete",anchor1:"Model is site-specific; no replication pathway",detail:"Can success here be adapted and deployed in other districts, sectors, or countries?"},
    ]},
];

const THRESHOLDS = [
  {range:'80–100',rating:'Exceptional',   action:'Priority pursuit — accelerated evaluation',                   color:'#1A6B2F',bar:100},
  {range:'65–79', rating:'Strong',        action:'Active development — full due diligence initiated',            color:'#2E7D32',bar:73},
  {range:'50–64', rating:'Promising',     action:'Conditional support — milestones defined before commitment',   color:'#B8730A',bar:55},
  {range:'35–49', rating:'Potential',     action:'Advisory support only — revisit when conditions are met',      color:'#E65100',bar:37},
  {range:'Below 35',rating:'Does Not Qualify',action:'Declined — written rationale and pathway provided',       color:'#A8200D',bar:15},
];
const STAGES = [
  {n:'01',title:'Initial Screening',          time:'1–2 Weeks', desc:'Eligibility review: sector alignment, submitter credibility, information completeness. Every application — regardless of score — receives a written response within 10 business days. Applications that clear screening receive an evaluator assignment and a confirmed assessment timeline.',notes:'Minimum submission requirements: executive summary, financial projections (3 years), team bios, market sizing rationale, and sector alignment statement.'},
  {n:'02',title:'Impact Score™ Assessment',   time:'2–4 Weeks', desc:'Full four-dimension scoring by a panel of three BRIDGE evaluators. Each sub-component receives an independent score from each evaluator; divergence above 15% triggers a reconciliation session. Final scores are calibrated against BRIDGE\'s full venture database.',notes:'Every sub-component receives a written rationale of 50–200 words. Evaluator identities are disclosed to the Investment Committee but not to the venture submitter.'},
  {n:'03',title:'Deep Due Diligence',         time:'4–8 Weeks', desc:'Reserved exclusively for ventures scoring 65 or above. Financial model review against three stress scenarios, independent market sizing validation, legal entity and title review, tax compliance verification, and stakeholder mapping across government, community, and sector actors.',notes:'Due diligence findings are summarised in the BRIDGE Due Diligence Memorandum — a standardised document shared with the Investment Committee and, upon request, with the venture submitter after committee review.'},
  {n:'04',title:'Investment Committee Review',time:'1–2 Weeks', desc:'A panel of five Investment Committee members reviews the Due Diligence Memorandum and evaluator scoring records. The IC applies a portfolio lens — evaluating not only the venture in isolation but its fit within BRIDGE\'s current capital allocation across 12 sectors.',notes:'IC decisions are documented in the Investment Committee Minute, which includes the final decision, dissenting views (if any), and any conditions attached to a positive decision.'},
  {n:'05',title:'Structuring & Partnership',  time:'2–4 Weeks', desc:'All investment terms, governance structures, milestone frameworks, and reporting obligations are agreed and documented before any capital is committed. BRIDGE does not release capital against verbal commitments.',notes:'Post-investment, ventures enter the BRIDGE Portfolio Monitoring Programme — quarterly reviews against agreed milestones, with escalation protocols for underperformance.'},
];
const KEJETIA = [{label:'P&P Alignment',score:26,max:30},{label:'Strategic Fit',score:23,max:25},{label:'Feasibility',score:22,max:25},{label:'Scalability',score:16,max:20}];
const KEJETIA_SUBS = [
  {dim:'Peace & Prosperity',sub:'Individual Dignity',score:9,notes:'Strong wage premium (32% above sector median); external certification programme for 340 vendors'},
  {dim:'Peace & Prosperity',sub:'Family Security',score:9,notes:'Income predictability index 0.84; mobile banking access introduced for 8,200 household members'},
  {dim:'Peace & Prosperity',sub:'Community Thriving',score:8,notes:'Multiplier 2.1; strengthened Kumasi Market Traders Association; 15-year digital infrastructure legacy'},
  {dim:'Strategic Fit',sub:'Sector Alignment',score:10,notes:'Core Infrastructure sector priority; directly addresses BRIDGE digitisation mandate'},
  {dim:'Strategic Fit',sub:'Diaspora Role',score:7,notes:'GH-UK diaspora consortium committed $2.1M; UK retail tech expertise deployed in vendor onboarding'},
  {dim:'Strategic Fit',sub:'Portfolio Synergy',score:6,notes:'Links to Financial Inclusion (mobile payments) and Transportation (logistics coordination) sectors'},
  {dim:'Feasibility',sub:'Financial Viability',score:9,notes:'Positive unit economics at base; adverse scenario survivable with 6-month reserve; self-sufficient at 36 months'},
  {dim:'Feasibility',sub:'Team Capability',score:8,notes:'Lead implementer: 8 years Ghana retail market; 2 prior completed ventures; full team in place'},
  {dim:'Feasibility',sub:'Risk Assessment',score:5,notes:'Cybersecurity risk underweighted at submission; BRIDGE-identified mitigation accepted; rescored +2'},
  {dim:'Scalability',sub:'Growth Potential',score:8,notes:'Addressable market $340M (all Ghana urban markets); demand validated across 3 pilot sites'},
  {dim:'Scalability',sub:'Long-Term Viability',score:5,notes:'Currency risk acknowledged; hedging strategy partial; FX reserve protocol agreed as condition'},
  {dim:'Scalability',sub:'Replication Potential',score:3,notes:'Pilot playbook in development; 4 sites identified; documentation not yet complete at time of scoring'},
];
const SCORE_DIST = [
  {range:'80–100',count:12,pct:7,label:'Exceptional'},
  {range:'65–79', count:38,pct:22,label:'Strong'},
  {range:'50–64', count:54,pct:31,label:'Promising'},
  {range:'35–49', count:41,pct:24,label:'Potential'},
  {range:'Below 35',count:29,pct:16,label:'Did Not Qualify'},
];
const CALIBRATION_CASES = [
  {score:87,sector:'Infrastructure',venture:'Kejetia Market Digitisation',note:'Flagship — highest P&P score in portfolio; cybersecurity risk originally underweighted'},
  {score:78,sector:'Financial Inclusion',venture:'SME Lending Cooperative — Ashanti Region',note:'Strong on all dimensions; Diaspora Role scored 5/8 (advisory only, no capital committed)'},
  {score:71,sector:'Agriculture',venture:'Cocoa Value Chain Integration — Brong-Ahafo',note:'Team Capability initially 6; rescored 8 after additional track record documentation supplied'},
  {score:64,sector:'Education',venture:'TVET Accreditation Platform',note:'Conditional — replication evidence insufficient; revisit scheduled Q3 2026'},
  {score:58,sector:'Housing',venture:'Affordable Housing Finance Facility',note:'Promising; financial viability stress test failed adverse scenario; restructuring in progress'},
  {score:43,sector:'Energy',venture:'Rural Solar Cooperative',note:'Potential; strong P&P but team lacks execution track record; advisory support active'},
];
const ENGAGEMENT_PACKAGES = [
  {name:'Venture Score',price:'Enquire',desc:'Single venture assessed across all four dimensions by three BRIDGE evaluators. Includes full written rationale, score report, and 60-minute debrief session.',timeline:'3–4 weeks',for:'Founders preparing for investment rounds or government procurement',hi:false},
  {name:'Portfolio Audit',price:'Enquire',desc:'Up to 8 ventures scored and ranked within a defined portfolio. Includes comparative matrix, portfolio integration analysis, and executive presentation.',timeline:'6–8 weeks',for:'Development finance institutions, government agencies, family offices',hi:true},
  {name:'Programme Design',price:'Custom',desc:'BRIDGE designs a bespoke evaluation framework for an institution\'s specific mandate — embedding BRIDGE methodology while adapting criteria to institutional priorities.',timeline:'8–12 weeks',for:'Multilaterals, government ministries, sovereign wealth funds',hi:false},
];

// Official BRIDGE 5-tier membership structure (from BRIDGE Architecture Framework)
const MEMBER_TIERS = [
  {n:'1',tier:'General Community',price:'Free',features:['Public content & events','Big Ideas Challenge','BRIDGE newsletter']},
  {n:'2',tier:'Network Members',price:'$100/yr',features:['Full platform access','Member directory','Opportunity database','Idea submission with feedback']},
  {n:'3',tier:'Professional Contributors',price:'$500–$2,000/yr',features:['Mentorship & advisory matching','Deal flow access (observer)','Contributor retreats','BRIDGE leadership engagement']},
  {n:'4',tier:'Investors',price:'From $10K',features:['LP rights in BRIDGE Fund(s)','Quarterly investor reporting','Co-investment rights','Advisory Council eligibility']},
  {n:'5',tier:'Strategic Partners',price:'By Invitation',features:['Board or Advisory Council seat','Strategic direction input','Co-branding opportunities','Named programs & flagship access']},
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
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:'#5C6B5E'}}>General Series &middot; BRIDGE Impact Score&#8482; &middot; <span style={{color:'#1B4D3E',fontWeight:700}}>Member Edition</span></span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'#1B4D3E'}}>Impact Score&#8482; — Member</span>
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <span style={{background:'rgba(184,217,53,0.15)',border:'1px solid rgba(184,217,53,0.3)',color:'#1B4D3E',padding:'4px 10px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase'}}>Member Access</span>
        <a href="#" style={{background:'#1B4D3E',color:'#B8D935',padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px'}}>Portal &rarr;</a>
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
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',color:'rgba(255,255,255,0.35)',textTransform:'uppercase'}}>Methodology Publication &middot; Member Edition</span>
          </div>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'#B8D935',letterSpacing:'2px',textTransform:'uppercase',border:'1px solid rgba(184,217,53,0.5)',padding:'3px 10px',background:'rgba(184,217,53,0.08)'}}>Member Edition</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'22px'}}>
          <div style={{background:'#B8D935',color:'#0D1A10',fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'4px 10px',letterSpacing:'1px'}}>DOC 01 / 23</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.08)'}}/>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.25)'}}>General Series &middot; March 2026 &middot; Full Methodology</span>
        </div>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(34px,5.5vw,72px)',fontWeight:900,color:'#FAF8F3',lineHeight:1,letterSpacing:'-2px',marginBottom:'8px'}}>BRIDGE</h1>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(34px,5.5vw,72px)',fontWeight:900,color:'#B8D935',lineHeight:1,letterSpacing:'-2px',marginBottom:'24px'}}>Impact Score&#8482;</h1>
        <div style={{fontFamily:F.body,fontSize:'16px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',lineHeight:1.7,maxWidth:'560px',marginBottom:'36px'}}>
          The complete proprietary evaluation methodology &mdash; including evaluator rubrics, calibration anchors, score distribution data, annotated case studies, and full engagement framework.
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
            This Member Edition documents the complete methodology &mdash; including the scoring rubrics, calibration anchors, evaluator protocols, and the full database of 174 scored ventures that inform how evaluators calibrate their assessments. It is the working instrument, not the summary description.
          </p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300}}>
            Members also receive access to the External Impact Score&#8482; commissioning framework &mdash; the mechanism by which BRIDGE applies this methodology on behalf of institutional clients, government agencies, and development finance partners.
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
            {[{l:'Document Series',v:'General'},{l:'Edition',v:'March 2026'},{l:'Sectors Covered',v:'All 12'},{l:'Qualifying Score',v:'65 / 100'},{l:'Ventures Scored',v:'174+'},{l:'This Version',v:'Member'}].map((s,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:i<5?'1px solid #D8D4C8':'none'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:'#5C6B5E'}}>{s.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:i===5?'#B8D935':'#1B4D3E',background:i===5?'rgba(184,217,53,0.12)':undefined,padding:i===5?'1px 6px':undefined}}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── DIMENSIONS WITH RUBRICS ───────────────────────────────────────────────────
const DimensionDetail = () => {
  const [open,setOpen] = useState(0);
  const [subOpen,setSubOpen] = useState({});
  const toggleSub = (di,si) => setSubOpen(p=>({...p,[di+'-'+si]:!p[di+'-'+si]}));
  return (
    <div className="pad-section" style={{background:'#F0EDE4',padding:'48px 64px',borderBottom:'1px solid #D8D4C8'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <Rule/><SL>I &middot; The Four Dimensions &mdash; Complete Rubrics</SL>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:700,color:'#0D1A10',lineHeight:1.2,marginBottom:'14px'}}>What evaluators look for — precisely.</h2>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'32px'}}>Each sub-component below includes calibration anchors: the specific evidence patterns that correspond to scores of 4 (maximum), 3 (strong), 2 (adequate), and 1 (insufficient). These anchors are what evaluators use &mdash; not general descriptions.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',marginBottom:'28px'}} className="dim-tiles">
          {DIMS.map((d,i)=>{const bgs=['#1B4D3E','#2E5A4D','#2E6B50','#3A8060'];return(
            <div key={i} onClick={()=>setOpen(open===i?null:i)} style={{background:open===i?'#0D1A10':bgs[i],padding:'14px 12px',cursor:'pointer',borderBottom:open===i?'3px solid #B8D935':'3px solid transparent',transition:'background 0.2s'}}>
              <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',marginBottom:'6px'}}>DIM {d.num}</div>
              <div style={{fontFamily:F.mono,fontSize:'28px',color:'#B8D935',lineHeight:1,marginBottom:'2px'}}>{d.pts}</div>
              <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:600,textTransform:'uppercase',color:'rgba(255,255,255,0.35)'}}>pts</div>
            </div>
          );})}
        </div>
        {DIMS.map((dim,i)=>(
          <div key={i} style={{marginBottom:'6px'}}>
            <div onClick={()=>setOpen(open===i?null:i)} style={{background:open===i?'#1B4D3E':'#FAF8F3',border:'1px solid '+(open===i?'#1B4D3E':'#D8D4C8'),padding:'16px 20px',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'flex-start',transition:'all 0.2s'}}>
              <div style={{flex:1,paddingRight:'16px'}}>
                <div style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:open===i?'#FAF8F3':'#0D1A10',marginBottom:'3px'}}>{dim.title}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:open===i?'rgba(250,248,243,0.5)':'#5C6B5E',marginBottom:open===i?0:'4px'}}>{dim.question}</div>
                {open!==i&&<div style={{fontFamily:F.body,fontSize:'11px',color:'#9AAA9C',fontStyle:'italic',marginTop:'2px'}}>{dim.calibration.slice(0,90)}&#8230;</div>}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0}}>
                <div style={{background:open===i?'rgba(184,217,53,0.18)':'rgba(27,77,62,0.07)',padding:'4px 10px',fontFamily:F.mono,fontSize:'12px',color:open===i?'#B8D935':'#1B4D3E'}}>{dim.pts}pts</div>
                <span style={{fontSize:'13px',color:open===i?'#B8D935':'#5C6B5E',display:'inline-block',transform:open===i?'rotate(180deg)':'none',transition:'transform 0.2s'}}>&#9660;</span>
              </div>
            </div>
            {open===i&&(
              <div style={{background:'#FAF8F3',border:'1px solid #1B4D3E',borderTop:'none',padding:'20px 20px'}}>
                <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:'#5C6B5E',borderBottom:'1px solid #D8D4C8',paddingBottom:'16px',marginBottom:'16px',fontWeight:300,fontStyle:'italic'}}>{dim.rationale}</p>
                <div style={{background:'rgba(27,77,62,0.05)',border:'1px solid #D8D4C8',padding:'14px',marginBottom:'20px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#5C6B5E',marginBottom:'8px'}}>Calibration Note</div>
                  <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.75,color:'#0D1A10',margin:0,fontWeight:300}}>{dim.calibration}</p>
                </div>
                {dim.subs.map((s,si)=>{
                  const key = i+'-'+si;
                  const isOpen = subOpen[key];
                  return (
                    <div key={si} style={{marginBottom:'8px'}}>
                      <div onClick={()=>toggleSub(i,si)} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 14px',background:'#F0EDE4',border:'1px solid #D8D4C8',cursor:'pointer'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                          <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:'#1B4D3E'}}>{s.label}</div>
                          <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'#5C6B5E'}}>{s.detail.slice(0,60)}&#8230;</div>
                        </div>
                        <div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0,marginLeft:'10px'}}>
                          <div style={{height:'3px',width:s.pts*3.5,background:'#B8D935'}}/>
                          <span style={{fontFamily:F.mono,fontSize:'10px',color:'#5C6B5E',flexShrink:0}}>{s.pts}pts</span>
                          <span style={{fontSize:'11px',color:'#9AAA9C',transform:isOpen?'rotate(180deg)':'none',transition:'transform 0.2s',display:'inline-block'}}>&#9660;</span>
                        </div>
                      </div>
                      {isOpen&&(
                        <div style={{background:'#FAF8F3',border:'1px solid #D8D4C8',borderTop:'none',padding:'16px 14px'}}>
                          <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.8,color:'#0D1A10',marginBottom:'16px',fontWeight:300}}>{s.detail}</p>
                          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}} className="tc">
                            {[{level:'Score 4 — Maximum',anchor:s.anchor4,color:'#1A6B2F'},{level:'Score 3 — Strong',anchor:s.anchor3,color:'#2E7D32'},{level:'Score 2 — Adequate',anchor:s.anchor2,color:'#B8730A'},{level:'Score 1 — Insufficient',anchor:s.anchor1,color:'#A8200D'}].map((a,ai)=>(
                              <div key={ai} style={{border:'1px solid #D8D4C8',padding:'12px 14px',borderTop:'3px solid '+a.color}}>
                                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:a.color,marginBottom:'8px'}}>{a.level}</div>
                                <p style={{fontFamily:F.body,fontSize:'11px',lineHeight:1.7,color:'#5C6B5E',margin:0,fontWeight:300}}>{a.anchor}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── SCORING SCALE + PROCESS ───────────────────────────────────────────────────
const ScaleProcess = () => {
  const [stageOpen,setStageOpen] = useState(null);
  return (
    <div className="pad-section" style={{background:'#FAF8F3',padding:'48px 64px',borderBottom:'1px solid #D8D4C8'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <Rule/><SL>II &middot; Scoring Scale &amp; Evaluation Process</SL>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'flex-start'}} className="tc">
          <div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,32px)',fontWeight:700,color:'#0D1A10',lineHeight:1.2,marginBottom:'14px'}}>What each score commits BRIDGE to.</h2>
            <p style={{fontFamily:F.body,fontSize:'14px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'24px'}}>Every score band carries a defined BRIDGE action commitment. These commitments are published internally and reported quarterly to the BRIDGE Board.</p>
            <div style={{border:'1px solid #D8D4C8',overflow:'hidden',marginBottom:'24px'}}>
              {THRESHOLDS.map((t,i)=>(
                <div key={i} style={{background:i%2===0?'#FAF8F3':'#F0EDE4',borderBottom:i<4?'1px solid #D8D4C8':'none',padding:'14px 16px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'6px'}}>
                    <div style={{fontFamily:F.mono,fontSize:'17px',color:t.color}}>{t.range}</div>
                    <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'#0D1A10'}}>{t.rating}</div>
                  </div>
                  <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'#5C6B5E',lineHeight:1.55,marginBottom:'8px'}}>{t.action}</div>
                  <div style={{height:'3px',background:'#D8D4C8'}}><div style={{height:'100%',width:t.bar+'%',background:t.color,opacity:0.75}}/></div>
                </div>
              ))}
            </div>

            {/* Score distribution */}
            <div style={{border:'1px solid #D8D4C8',padding:'16px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#5C6B5E',marginBottom:'14px'}}>Historical Score Distribution &mdash; All Sectors</div>
              {SCORE_DIST.map((s,i)=>(
                <div key={i} style={{marginBottom:'10px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                    <span style={{fontFamily:F.sans,fontSize:'11px',color:'#0D1A10',fontWeight:600}}>{s.range}</span>
                    <span style={{fontFamily:F.mono,fontSize:'11px',color:'#5C6B5E'}}>{s.count} ventures ({s.pct}%)</span>
                  </div>
                  <div style={{height:'6px',background:'#D8D4C8'}}>
                    <div style={{height:'100%',width:s.pct+'%',background:THRESHOLDS[i].color,opacity:0.8}}/>
                  </div>
                </div>
              ))}
              <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'#9AAA9C',marginTop:'12px'}}>Based on 174 ventures evaluated 2022–2025. Distribution is stable within ±3% year-over-year.</div>
            </div>
          </div>
          <div>
            <Rule/>
            <SL>Evaluation Process &mdash; Stage Detail</SL>
            <h3 style={{fontFamily:F.display,fontSize:'clamp(18px,2.2vw,26px)',fontWeight:700,color:'#0D1A10',lineHeight:1.25,marginBottom:'12px'}}>Five stages. Documented at every step.</h3>
            <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:'#5C6B5E',fontWeight:300,marginBottom:'20px'}}>Click each stage for process notes and documentation requirements.</p>
            {STAGES.map((s,i)=>(
              <div key={i} style={{marginBottom:'4px'}}>
                <div onClick={()=>setStageOpen(stageOpen===i?null:i)} style={{display:'flex',gap:'14px',alignItems:'flex-start',padding:'12px 14px',background:stageOpen===i?'#1B4D3E':'#F0EDE4',border:'1px solid '+(stageOpen===i?'#1B4D3E':'#D8D4C8'),cursor:'pointer',transition:'all 0.2s'}}>
                  <div style={{width:'36px',height:'36px',background:stageOpen===i?'rgba(184,217,53,0.2)':'#1B4D3E',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <span style={{fontFamily:F.mono,fontSize:'12px',color:'#B8D935'}}>{s.n}</span>
                  </div>
                  <div style={{flex:1,paddingTop:'2px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'3px'}}>
                      <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:stageOpen===i?'#FAF8F3':'#0D1A10'}}>{s.title}</div>
                      <div style={{display:'flex',alignItems:'center',gap:'6px',flexShrink:0,marginLeft:'8px'}}>
                        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'#B8D935',background:'rgba(184,217,53,0.12)',padding:'2px 7px'}}>{s.time}</div>
                        <span style={{fontSize:'11px',color:stageOpen===i?'#B8D935':'#9AAA9C',transform:stageOpen===i?'rotate(180deg)':'none',transition:'transform 0.2s',display:'inline-block'}}>&#9660;</span>
                      </div>
                    </div>
                    <div style={{fontFamily:F.body,fontSize:'11px',color:stageOpen===i?'rgba(250,248,243,0.55)':'#5C6B5E',lineHeight:1.55}}>{s.desc.slice(0,80)}&#8230;</div>
                  </div>
                </div>
                {stageOpen===i&&(
                  <div style={{background:'#FAF8F3',border:'1px solid #1B4D3E',borderTop:'none',padding:'14px 16px'}}>
                    <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.8,color:'#0D1A10',marginBottom:'12px',fontWeight:300}}>{s.desc}</p>
                    <div style={{background:'rgba(184,217,53,0.08)',border:'1px solid rgba(184,217,53,0.25)',padding:'10px 12px'}}>
                      <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#1B4D3E',marginBottom:'6px'}}>Process Notes</div>
                      <p style={{fontFamily:F.body,fontSize:'11px',lineHeight:1.7,color:'#5C6B5E',margin:0,fontWeight:300}}>{s.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── KEJETIA DEEP DIVE ─────────────────────────────────────────────────────────
const KejetiaDive = () => {
  const [tabOpen,setTabOpen] = useState(false);
  return (
    <div className="pad-section" style={{background:'#F0EDE4',padding:'48px 64px',borderBottom:'1px solid #D8D4C8'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <Rule/><SL>III &middot; Annotated Case Study &mdash; Full Scorecard</SL>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'flex-start'}} className="tc">
          <div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:700,color:'#0D1A10',lineHeight:1.2,marginBottom:'16px'}}>Kejetia Market Digitisation &mdash; 87/100.</h2>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'14px'}}>BRIDGE&rsquo;s highest-scoring Infrastructure venture and the benchmark for all subsequent evaluations. The complete sub-component breakdown is reproduced below with evaluator notes &mdash; the exact format distributed to the Investment Committee.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'24px'}}>Notable calibration points: Risk Assessment was initially scored 3/7 (cybersecurity risk underweighted); BRIDGE evaluators identified the gap; the venture submitter accepted the mitigation protocol and the score was revised to 5/7 before final committee review. This revision is documented in the scorecard.</p>
            <div style={{borderLeft:'4px solid #B8D935',paddingLeft:'20px'}}>
              <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:'#1B4D3E',lineHeight:1.55}}>Kejetia demonstrates what the instrument is for: not to exclude good ventures, but to make them better before capital is committed.</p>
              <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:'#5C6B5E',letterSpacing:'1px',textTransform:'uppercase'}}>&mdash; BRIDGE Lead Evaluator, 2023</div>
            </div>
          </div>
          <div>
            <div style={{background:'#0D1A10',padding:'18px',marginBottom:'2px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#B8D935',marginBottom:'4px'}}>Final Score</div>
                  <div style={{display:'flex',alignItems:'baseline',gap:'4px'}}>
                    <span style={{fontFamily:F.mono,fontSize:'48px',color:'#B8D935',lineHeight:1}}>87</span>
                    <span style={{fontFamily:F.mono,fontSize:'14px',color:'rgba(184,217,53,0.4)'}}>/100</span>
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)',marginBottom:'6px'}}>Tier</div>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'#B8D935'}}>Exceptional</div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.3)',marginTop:'4px'}}>Priority Pursuit</div>
                </div>
              </div>
              {KEJETIA.map((k,i)=>(
                <div key={k.label} style={{paddingBottom:'10px',marginBottom:'10px',borderBottom:i<3?'1px solid rgba(255,255,255,0.08)':'none'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                    <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.55)'}}>{k.label}</span>
                    <span style={{fontFamily:F.mono,fontSize:'11px',color:'#B8D935'}}>{k.score}<span style={{color:'rgba(184,217,53,0.4)'}}>/{k.max}</span></span>
                  </div>
                  <div style={{height:'3px',background:'rgba(255,255,255,0.08)'}}><div style={{height:'100%',width:((k.score/k.max)*100)+'%',background:'#B8D935'}}/></div>
                </div>
              ))}
            </div>
            {/* Full sub-component table toggle */}
            <button className="mob-toggle-dark" onClick={()=>setTabOpen(o=>!o)} style={{width:'100%',background:'rgba(13,26,16,0.06)',border:'1px solid #D8D4C8',borderTop:'none',padding:'10px 16px',cursor:'pointer',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#1B4D3E',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span>{tabOpen?'Hide':'View'} Full Sub-Component Breakdown (12 items)</span>
              <span style={{transform:tabOpen?'rotate(180deg)':'none',transition:'transform 0.2s',display:'inline-block'}}>&#9660;</span>
            </button>
            {tabOpen&&(
              <div style={{border:'1px solid #D8D4C8',borderTop:'none',overflow:'hidden'}}>
                <table className="score-table" style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{background:'#1B4D3E'}}>
                      <th style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.45)',padding:'8px 12px',textAlign:'left'}}>Sub-Component</th>
                      <th style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.45)',padding:'8px 12px',textAlign:'center'}}>Score</th>
                      <th style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.45)',padding:'8px 12px',textAlign:'left'}}>Evaluator Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {KEJETIA_SUBS.map((row,i)=>(
                      <tr key={i} style={{background:i%2===0?'#FAF8F3':'#F0EDE4',borderBottom:'1px solid #D8D4C8'}}>
                        <td style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:'#0D1A10',padding:'9px 12px',verticalAlign:'top'}}>
                          <div style={{fontFamily:F.sans,fontSize:'9px',color:'#9AAA9C',marginBottom:'2px'}}>{row.dim}</div>
                          {row.sub}
                        </td>
                        <td style={{textAlign:'center',padding:'9px 12px',verticalAlign:'middle'}}>
                          <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:'#1B4D3E'}}>{row.score}</span>
                        </td>
                        <td style={{fontFamily:F.body,fontSize:'11px',color:'#5C6B5E',padding:'9px 12px',lineHeight:1.6,verticalAlign:'top'}}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── CALIBRATION LIBRARY ───────────────────────────────────────────────────────
const CalibrationLibrary = () => (
  <div className="pad-section" style={{background:'#FAF8F3',padding:'48px 64px',borderBottom:'1px solid #D8D4C8'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <Rule/><SL>IV &middot; Calibration Library &mdash; Selected Precedents</SL>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'flex-start'}} className="tc">
        <div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:700,color:'#0D1A10',lineHeight:1.2,marginBottom:'14px'}}>How evaluators calibrate their scores.</h2>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'16px'}}>Evaluator calibration depends on precedent. Before scoring any new venture, evaluators review the five calibration cases closest to the sector and sub-component being evaluated. This prevents score drift and ensures cross-sector comparability over time.</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'#0D1A10',fontWeight:300,marginBottom:'24px'}}>The full calibration library contains 174 scored ventures across all 12 sectors. The six cases below are drawn from the public summary layer; members access the full annotated case record through the BRIDGE Intelligence Portal.</p>
          <div style={{background:'rgba(184,217,53,0.08)',border:'1px solid rgba(184,217,53,0.25)',padding:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#1B4D3E',marginBottom:'8px'}}>Full Library Access</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.75,color:'#5C6B5E',margin:'0 0 10px',fontWeight:300}}>Members access all 174 annotated scorecards through the BRIDGE Intelligence Portal, filterable by sector, score range, dimension, and evaluation year.</p>
            <a href="#" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'#1B4D3E',textDecoration:'none'}}>Access Full Library &rarr;</a>
          </div>
        </div>
        <div>
          {CALIBRATION_CASES.map((c,i)=>(
            <div key={i} style={{paddingBottom:'16px',marginBottom:'16px',borderBottom:i<5?'1px solid #D8D4C8':'none'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'6px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#9AAA9C',marginBottom:'2px'}}>{c.sector}</div>
                  <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:'#0D1A10'}}>{c.venture}</div>
                </div>
                <div style={{fontFamily:F.mono,fontSize:'20px',color:THRESHOLDS[c.score>=80?0:c.score>=65?1:c.score>=50?2:c.score>=35?3:4].color,flexShrink:0,marginLeft:'12px'}}>{c.score}</div>
              </div>
              <p style={{fontFamily:F.body,fontSize:'11px',lineHeight:1.7,color:'#5C6B5E',margin:0,fontWeight:300,fontStyle:'italic'}}>{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ── ENGAGEMENT CTA (PAID UPSELL) ──────────────────────────────────────────────
const EngagementCTA = () => (
  <div>
    {/* Ink bridge strip */}
    <div style={{background:'#0D1A10',padding:'40px 64px'}} className="pad-section">
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'center'}} className="tc">
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'#B8D935',marginBottom:'14px'}}>External Engagement</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,34px)',fontWeight:700,fontStyle:'italic',color:'#FAF8F3',lineHeight:1.25,marginBottom:'16px'}}>The BRIDGE Impact Score&#8482; is available as a standalone professional service.</h2>
            <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.55)',lineHeight:1.75,fontWeight:300}}>Founders preparing for capital raises, government agencies evaluating development programmes, and institutional investors conducting portfolio reviews commission the Score as an independent assessment. The same methodology. The same evaluators. The same rigour.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px'}}>
            {[{v:'3',l:'Evaluators Per Assessment'},{v:'100%',l:'Written Rationale'},{v:'12 mos',l:'Score Validity Period'},{v:'30 days',l:'Appeal Window'}].map((s,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.04)',padding:'18px 14px'}}>
                <div style={{fontFamily:F.mono,fontSize:'26px',color:'#B8D935',lineHeight:1,marginBottom:'6px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Engagement packages */}
    <div className="pad-gate" style={{background:'#1B4D3E',padding:'48px 64px 48px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'-20px',bottom:'-40px',fontFamily:F.display,fontSize:'clamp(80px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.03)',pointerEvents:'none',userSelect:'none',letterSpacing:'-6px',lineHeight:1}}>01</div>
      <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'#B8D935',marginBottom:'14px'}}>ENGAGEMENT PACKAGES &middot; 2026</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,34px)',fontWeight:700,fontStyle:'italic',color:'#FAF8F3',lineHeight:1.25,marginBottom:'10px',maxWidth:'640px'}}>Commission the Score. Get the instrument, not just the report.</h2>
        <p className="gate-value-line" style={{fontFamily:F.body,fontSize:'14px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',marginBottom:'32px',lineHeight:1.65}}>All engagements include full evaluator access, written rationale at every sub-component, and a post-delivery debrief session with the lead evaluator.</p>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'2px',marginBottom:'32px'}} className="tc">
          {ENGAGEMENT_PACKAGES.map((pkg,i)=>(
            <div key={i} style={{background:pkg.hi?'#B8D935':'rgba(255,255,255,0.06)',border:pkg.hi?'none':'1px solid rgba(255,255,255,0.1)',padding:'24px 20px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:pkg.hi?'#0D1A10':'rgba(250,248,243,0.4)',marginBottom:'8px'}}>{pkg.name}</div>
              <div style={{fontFamily:F.mono,fontSize:'22px',color:pkg.hi?'#0D1A10':'#FAF8F3',lineHeight:1,marginBottom:'6px'}}>{pkg.price}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:pkg.hi?'rgba(13,26,16,0.5)':'rgba(250,248,243,0.3)',marginBottom:'16px'}}>{pkg.timeline}</div>
              <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:pkg.hi?'#1B4D3E':'rgba(250,248,243,0.6)',marginBottom:'14px',fontWeight:300}}>{pkg.desc}</p>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:pkg.hi?'rgba(27,77,62,0.6)':'rgba(184,217,53,0.5)',marginBottom:'16px'}}>Best for: {pkg.for}</div>
              <a href="#" style={{display:'block',background:pkg.hi?'#1B4D3E':'rgba(255,255,255,0.1)',color:pkg.hi?'#B8D935':'#FAF8F3',padding:'10px 16px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none',textAlign:'center'}}>Commission &rarr;</a>
            </div>
          ))}
        </div>

        {/* Official BRIDGE 5-tier membership */}
        <div style={{marginTop:'8px',marginBottom:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',marginBottom:'10px',paddingTop:'8px',borderTop:'1px solid rgba(255,255,255,0.08)'}}>BRIDGE Network Membership &mdash; 5 Tiers</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'2px'}} className="tc tier-strip">
            {MEMBER_TIERS.map((t,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',padding:'14px 12px'}}>
                <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'4px'}}>Tier {t.n}</div>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'#FAF8F3',marginBottom:'4px'}}>{t.tier}</div>
                <div style={{fontFamily:F.mono,fontSize:'12px',color:'#B8D935',marginBottom:'10px'}}>{t.price}</div>
                {t.features.map((f,fi)=>(
                  <div key={fi} style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.45)',lineHeight:1.5,marginBottom:'3px'}}>&#10003; {f}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Deeper engagement: advisory */}
        <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.12)',padding:'24px 28px',display:'grid',gridTemplateColumns:'1fr auto',gap:'24px',alignItems:'center'}} className="tc">
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#B8D935',marginBottom:'8px'}}>Full Engagement &mdash; BRIDGE Portfolio Advisory</div>
            <h3 style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:'#FAF8F3',lineHeight:1.3,marginBottom:'8px',fontStyle:'italic'}}>Embed the BRIDGE methodology inside your institution.</h3>
            <p className="gate-value-line" style={{fontFamily:F.body,fontSize:'13px',color:'rgba(250,248,243,0.5)',lineHeight:1.7,margin:0,fontWeight:300}}>BRIDGE works directly with development finance institutions, government ministries, and sovereign wealth funds to build internal evaluation capacity anchored to the BRIDGE methodology. Includes team training, framework adaptation, and ongoing calibration support.</p>
          </div>
          <div style={{textAlign:'center',minWidth:'140px'}}>
            <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.3)',marginBottom:'10px'}}>Invitation-based for Tier 5</div>
            <a href="#" style={{display:'block',background:'#B8D935',color:'#0D1A10',padding:'10px 16px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none',textAlign:'center',marginBottom:'8px'}}>Request Proposal &rarr;</a>
            <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.25)',textAlign:'center'}}>bridge-pbc.com/partners</div>
          </div>
        </div>

        <div style={{marginTop:'24px',borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'14px'}}>
          <p className="gate-value-line" style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.35)',lineHeight:1.65,maxWidth:'520px'}}>All external engagements are subject to BRIDGE conflict-of-interest review. BRIDGE will not commission assessments for ventures it has a direct financial interest in, or for competitors to existing BRIDGE portfolio companies.</p>
          <a href="#" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'rgba(250,248,243,0.4)',textDecoration:'none',flexShrink:0}}>Download Engagement Brief &#9660;</a>
        </div>
      </div>
    </div>
  </div>
);

// ── FOOTER ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <div className="pad-footer" style={{background:'#1B4D3E',padding:'16px 64px',borderTop:'3px solid #B8D935'}}>
    <div className="footer-inner" style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={18} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.15)'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>General Series &middot; Doc 01 / 23 &middot; Member Edition &middot; bridge-pbc.com</div>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'14px'}}>
        {['Intelligence Portal','All Documents','Engage BRIDGE','Contact'].map((l,i)=>(
          <a key={i} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.35)',textDecoration:'none'}}>{l}</a>
        ))}
      </div>
    </div>
  </div>
);

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function ImpactScorePaid() {
  const [isMobile, setIsMobile] = useState(false);
  const logoRef = useRef(null);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  if (isMobile) return <MobileImpactScorePaid/>;
  return (
    <div style={{fontFamily:F.body,background:'#FAF8F3'}}>
      <Gf/>
      <TopBar logoRef={logoRef}/>
      <Cover logoRef={logoRef}/>
      <Executive/>
      <DimensionDetail/>
      <ScaleProcess/>
      <KejetiaDive/>
      <CalibrationLibrary/>
      <EngagementCTA/>
      <Footer/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MOBILE LAYOUT — renders at ≤600px via root breakpoint switch
// ══════════════════════════════════════════════════════════════════════════════

const PAID_MOB_NAV = [
  {id:'cover',   icon:'◈', label:'Overview'},
  {id:'rubrics', icon:'◎', label:'Rubrics'},
  {id:'process', icon:'◫', label:'Process'},
  {id:'case',    icon:'◉', label:'Kejetia'},
  {id:'engage',  icon:'◆', label:'Engage'},
];

const PaidMobBottomNav = ({active, onSelect}) => (
  <div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,
    background:'#0D1A10',borderTop:'1px solid rgba(255,255,255,0.08)',
    display:'flex',paddingBottom:'env(safe-area-inset-bottom)'}}>
    {PAID_MOB_NAV.map(item => {
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

const PMobChip = ({children,accent}) => (
  <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',
    color:accent?'#0D1A10':'#B8D935',background:accent?'#B8D935':'rgba(184,217,53,0.12)',padding:'3px 9px',display:'inline-block'}}>{children}</span>
);
const PMobLabel = ({children,light}) => (
  <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',
    color:light?'rgba(250,248,243,0.35)':'#5C6B5E',marginBottom:'10px'}}>{children}</div>
);
const PMobRule = () => (
  <div style={{borderTop:'4px solid #0D1A10',borderBottom:'2px solid #B8D935',paddingBottom:'3px',marginBottom:'16px'}}/>
);
const AnchorCard = ({level,text,color}) => (
  <div style={{border:'1px solid #D8D4C8',borderTop:'3px solid '+color,padding:'10px 11px'}}>
    <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color,marginBottom:'5px'}}>{level}</div>
    <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',lineHeight:1.65,color:'#5C6B5E',margin:0,fontWeight:300}}>{text}</p>
  </div>
);

// ── Screen: Overview (Paid) ───────────────────────────────────────────────────
const PMobOverview = () => {
  const [execOpen,setExecOpen] = useState(false);
  return (
    <div className="fade-in" style={{background:'#0D1A10',minHeight:'100vh',paddingBottom:'70px'}}>
      <div style={{padding:'20px 20px 0'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
          <div style={{background:'#B8D935',color:'#0D1A10',fontFamily:'"DM Mono","Courier New",monospace',fontSize:'10px',fontWeight:700,padding:'3px 8px',letterSpacing:'1px'}}>DOC 01/23</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.06)'}}/>
          <PMobChip accent>Member Edition</PMobChip>
        </div>
        <h1 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'56px',fontWeight:900,color:'#FAF8F3',lineHeight:0.95,letterSpacing:'-2px',marginBottom:'4px'}}>BRIDGE</h1>
        <h1 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'56px',fontWeight:900,color:'#B8D935',lineHeight:0.95,letterSpacing:'-2px',marginBottom:'22px'}}>Impact Score&#8482;</h1>
        <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'14px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.65,marginBottom:'20px'}}>
          The complete evaluation methodology &mdash; scoring rubrics, calibration anchors, evaluator protocols, and the full annotated case database.
        </p>
        <div style={{background:'rgba(184,217,53,0.07)',border:'1px solid rgba(184,217,53,0.18)',padding:'14px',marginBottom:'20px'}}>
          <PMobLabel light>Member Edition Includes</PMobLabel>
          {['Complete sub-component rubrics with calibration anchors','Score 4/3/2/1 evidence requirements per sub-component','Annotated Kejetia scorecard — all 12 sub-components','Historical score distribution — 174 ventures','Evaluation stage detail with process notes','External engagement packages'].map((f,i)=>(
            <div key={i} style={{display:'flex',gap:'7px',marginBottom:'5px'}}>
              <span style={{color:'#B8D935',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',fontWeight:700,flexShrink:0,lineHeight:1.5}}>&#10003;</span>
              <span style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',color:'rgba(250,248,243,0.6)',lineHeight:1.5}}>{f}</span>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'20px'}}>
          {[{v:'174+',l:'Ventures Scored'},{v:'12',l:'Sectors'},{v:'60K+',l:'Words of Research'},{v:'100%',l:'Written Rationale'}].map((s,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.04)',padding:'12px'}}>
              <div style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'22px',color:'#B8D935',lineHeight:1,marginBottom:'3px'}}>{s.v}</div>
              <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',color:'rgba(255,255,255,0.28)'}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{background:'#FAF8F3',borderTop:'3px solid rgba(184,217,53,0.6)'}}>
          <div onClick={()=>setExecOpen(o=>!o)} style={{padding:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
            <PMobLabel>Executive Summary</PMobLabel>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:'#5C6B5E',transform:execOpen?'rotate(180deg)':'none',transition:'transform 0.2s',flexShrink:0,marginLeft:'8px'}}>&#9660;</span>
          </div>
          {execOpen&&(
            <div className="slide-up" style={{padding:'0 14px 14px'}}>
              <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'13px',lineHeight:1.8,color:'#0D1A10',fontWeight:300,marginBottom:'10px'}}>
                This Member Edition documents the complete BRIDGE Impact Score&#8482; methodology &mdash; including the scoring rubrics, calibration anchors, and evaluator protocols that govern how every venture is assessed.
              </p>
              <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'13px',lineHeight:1.8,color:'#5C6B5E',fontWeight:300}}>
                Members also receive access to the External Impact Score&#8482; commissioning framework &mdash; the mechanism by which BRIDGE applies this methodology on behalf of institutional clients and development finance partners.
              </p>
            </div>
          )}
        </div>
      </div>
      <div style={{height:'70px'}}/>
    </div>
  );
};

// ── Screen: Rubrics (Paid) ────────────────────────────────────────────────────
const PMobRubrics = () => {
  const [activeCard,setActiveCard] = useState(0);
  const [activeSub,setActiveSub] = useState(null);
  const [showAnchors,setShowAnchors] = useState(false);
  const [scaleOpen,setScaleOpen] = useState(false);
  const scrollRef = useRef(null);

  const scrollToCard = (i) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[i];
    if (card) card.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
    setActiveCard(i); setActiveSub(null); setShowAnchors(false);
  };

  return (
    <div className="fade-in" style={{background:'#F0EDE4',minHeight:'100vh',paddingBottom:'70px'}}>
      <div style={{background:'#0D1A10',padding:'20px 20px 16px'}}>
        <PMobChip>I · Complete Rubrics</PMobChip>
        <h2 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'26px',fontWeight:700,color:'#FAF8F3',lineHeight:1.15,marginTop:'10px',marginBottom:'6px'}}>What evaluators look for &mdash; precisely.</h2>
        <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.6}}>Swipe through dimensions. Tap a sub-component to see full scoring anchors.</p>
      </div>
      {/* Carousel */}
      <div className="scroll-x" ref={scrollRef}
        style={{display:'flex',gap:'2px',padding:'14px 20px 8px',scrollSnapType:'x mandatory'}}
        onScroll={e=>{const el=e.target;const idx=Math.round(el.scrollLeft/(el.scrollWidth/DIMS.length));if(idx!==activeCard){setActiveCard(idx);setActiveSub(null);setShowAnchors(false);}}}>
        {DIMS.map((dim,i)=>(
          <div key={i} onClick={()=>scrollToCard(i)}
            style={{flex:'0 0 calc(80vw)',scrollSnapAlign:'center',
              background:activeCard===i?'#0D1A10':['#1B4D3E','#2E5A4D','#2E6B50','#3A8060'][i],
              padding:'16px',cursor:'pointer',transition:'background 0.2s',
              borderBottom:activeCard===i?'3px solid #B8D935':'3px solid transparent'}}>
            <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.38)',marginBottom:'5px'}}>Dim {dim.num}</div>
            <div style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'36px',color:'#B8D935',lineHeight:1,marginBottom:'3px'}}>{dim.pts}</div>
            <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',marginBottom:'10px'}}>pts</div>
            <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'13px',fontWeight:700,color:'#FAF8F3',marginBottom:'3px'}}>{dim.title}</div>
            <div style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.4}}>{dim.question}</div>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div style={{display:'flex',gap:'6px',justifyContent:'center',padding:'4px 0 10px'}}>
        {DIMS.map((_,i)=>(
          <div key={i} onClick={()=>scrollToCard(i)} style={{
            width:i===activeCard?'24px':'8px',height:'8px',borderRadius:'4px',
            background:i===activeCard?'#B8D935':'rgba(255,255,255,0.2)',cursor:'pointer',transition:'all 0.3s ease'}}/>
        ))}
      </div>
      {/* Calibration note */}
      {DIMS[activeCard]&&(
        <div className="slide-up" key={'cn-'+activeCard} style={{padding:'0 20px 10px'}}>
          <div style={{background:'rgba(27,77,62,0.07)',border:'1px solid rgba(27,77,62,0.18)',
            borderLeft:'3px solid '+['#1B4D3E','#2E5A4D','#2E6B50','#3A8060'][activeCard],padding:'11px 12px'}}>
            <PMobLabel>Calibration Note</PMobLabel>
            <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',lineHeight:1.7,color:'#5C6B5E',margin:0,fontWeight:300}}>{DIMS[activeCard].calibration}</p>
          </div>
        </div>
      )}
      {/* Sub-components */}
      {DIMS[activeCard]&&(
        <div className="slide-up" key={'subs-'+activeCard} style={{padding:'0 20px 14px'}}>
          <div style={{background:'#FAF8F3',borderTop:'3px solid '+['#1B4D3E','#2E5A4D','#2E6B50','#3A8060'][activeCard]}}>
            <div style={{padding:'12px 14px 0'}}><PMobLabel>Sub-Components</PMobLabel></div>
            {DIMS[activeCard].subs.map((sub,si)=>(
              <div key={si}>
                <div onClick={()=>{setActiveSub(activeSub===si?null:si);setShowAnchors(false);}}
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
                {activeSub===si&&(
                  <div className="slide-up" style={{borderBottom:'1px solid #D8D4C8'}}>
                    <div style={{padding:'12px 14px',background:'rgba(27,77,62,0.03)'}}>
                      <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',lineHeight:1.75,color:'#5C6B5E',margin:'0 0 12px',fontWeight:300}}>{sub.detail}</p>
                      <button onClick={()=>setShowAnchors(o=>!o)}
                        style={{background:'transparent',border:'1px solid #D8D4C8',padding:'7px 12px',cursor:'pointer',
                          fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,
                          letterSpacing:'1.5px',textTransform:'uppercase',color:'#1B4D3E',
                          display:'flex',alignItems:'center',gap:'6px'}}>
                        <span>{showAnchors?'Hide':'View'} Scoring Anchors</span>
                        <span style={{transform:showAnchors?'rotate(180deg)':'none',transition:'transform 0.2s',display:'inline-block'}}>&#9660;</span>
                      </button>
                    </div>
                    {showAnchors&&(
                      <div className="slide-up" style={{padding:'0 14px 14px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px'}}>
                        <AnchorCard level="Score 4 — Maximum"    text={sub.anchor4} color="#1A6B2F"/>
                        <AnchorCard level="Score 3 — Strong"     text={sub.anchor3} color="#2E7D32"/>
                        <AnchorCard level="Score 2 — Adequate"   text={sub.anchor2} color="#B8730A"/>
                        <AnchorCard level="Score 1 — Insufficient" text={sub.anchor1} color="#A8200D"/>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Score distribution */}
          <div style={{background:'#F0EDE4',border:'1px solid #D8D4C8',borderTop:'none',padding:'13px'}}>
            <PMobLabel>Score Distribution — All 174 Ventures</PMobLabel>
            {SCORE_DIST.map((s,i)=>(
              <div key={i} style={{marginBottom:'8px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'3px'}}>
                  <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',color:'#0D1A10',fontWeight:600}}>{s.range}</span>
                  <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'10px',color:'#5C6B5E'}}>{s.count} ({s.pct}%)</span>
                </div>
                <div style={{height:'5px',background:'#D8D4C8'}}>
                  <div style={{height:'100%',width:s.pct+'%',background:THRESHOLDS[i].color,opacity:0.8}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Scoring scale */}
      <div style={{padding:'0 20px 14px'}}>
        <div style={{background:'#FAF8F3',border:'1px solid #D8D4C8'}}>
          <div onClick={()=>setScaleOpen(o=>!o)}
            style={{padding:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',borderBottom:scaleOpen?'1px solid #D8D4C8':'none'}}>
            <div>
              <PMobLabel>III · The Scoring Scale</PMobLabel>
              <div style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'14px',fontWeight:700,color:'#0D1A10',marginTop:'-6px'}}>What each score commits BRIDGE to.</div>
            </div>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:'#5C6B5E',transform:scaleOpen?'rotate(180deg)':'none',transition:'transform 0.2s',flexShrink:0,marginLeft:'10px'}}>&#9660;</span>
          </div>
          {scaleOpen&&THRESHOLDS.map((t,i)=>(
            <div key={i} style={{padding:'11px 14px',borderBottom:i<4?'1px solid #D8D4C8':'none',background:i%2===0?'#FAF8F3':'#F0EDE4'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'3px'}}>
                <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'14px',color:t.color}}>{t.range}</span>
                <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',fontWeight:700,color:'#0D1A10'}}>{t.rating}</span>
              </div>
              <div style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',fontStyle:'italic',color:'#5C6B5E',lineHeight:1.5,marginBottom:'6px'}}>{t.action}</div>
              <div style={{height:'3px',background:'#D8D4C8'}}><div style={{height:'100%',width:t.bar+'%',background:t.color,opacity:0.75}}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Screen: Process (Paid) ────────────────────────────────────────────────────
const PMobProcess = () => {
  const [openStage,setOpenStage] = useState(null);
  const [scaleOpen,setScaleOpen] = useState(false);
  return (
    <div className="fade-in" style={{background:'#FAF8F3',minHeight:'100vh',paddingBottom:'70px'}}>
      <div style={{background:'#0D1A10',padding:'20px 20px 16px'}}>
        <PMobChip>II · Evaluation Process</PMobChip>
        <h2 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'26px',fontWeight:700,color:'#FAF8F3',lineHeight:1.15,marginTop:'10px',marginBottom:'6px'}}>Five stages. Documented at every step.</h2>
        <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.6}}>Tap each stage for process notes and documentation requirements.</p>
      </div>
      <div style={{padding:'20px 20px 0'}}>
        {STAGES.map((s,i)=>(
          <div key={i} style={{display:'flex',gap:'14px'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'40px',flexShrink:0}}>
              <div onClick={()=>setOpenStage(openStage===i?null:i)}
                style={{width:'40px',height:'40px',background:openStage===i?'#B8D935':'#1B4D3E',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,cursor:'pointer',transition:'background 0.15s'}}>
                <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:openStage===i?'#0D1A10':'#B8D935'}}>{s.n}</span>
              </div>
              {i<STAGES.length-1&&<div style={{width:'2px',flex:1,background:'#D8D4C8',minHeight:'20px'}}/>}
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
                <div className="slide-up" style={{marginBottom:'12px'}}>
                  <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',lineHeight:1.8,color:'#0D1A10',marginBottom:'10px',fontWeight:300}}>{s.desc}</p>
                  <div style={{background:'rgba(184,217,53,0.08)',border:'1px solid rgba(184,217,53,0.2)',padding:'10px 12px'}}>
                    <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#1B4D3E',marginBottom:'5px'}}>Process Notes</div>
                    <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',lineHeight:1.7,color:'#5C6B5E',margin:0,fontWeight:300}}>{s.notes}</p>
                  </div>
                </div>
              )}
              {i<STAGES.length-1&&<div style={{borderTop:'1px solid #E8E4D8'}}/>}
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:'20px 20px 14px'}}>
        <PMobRule/>
        <div style={{background:'#F0EDE4',border:'1px solid #D8D4C8'}}>
          <div onClick={()=>setScaleOpen(o=>!o)}
            style={{padding:'14px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',borderBottom:scaleOpen?'1px solid #D8D4C8':'none'}}>
            <div>
              <PMobLabel>Scoring Scale</PMobLabel>
              <div style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'14px',fontWeight:700,color:'#0D1A10',marginTop:'-6px'}}>What each score commits BRIDGE to.</div>
            </div>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:'#5C6B5E',transform:scaleOpen?'rotate(180deg)':'none',transition:'transform 0.2s',flexShrink:0,marginLeft:'10px'}}>&#9660;</span>
          </div>
          {scaleOpen&&THRESHOLDS.map((t,i)=>(
            <div key={i} style={{padding:'11px 14px',borderBottom:i<4?'1px solid #D8D4C8':'none',background:i%2===0?'#F0EDE4':'#FAF8F3'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'3px'}}>
                <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'14px',color:t.color}}>{t.range}</span>
                <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',fontWeight:700,color:'#0D1A10'}}>{t.rating}</span>
              </div>
              <div style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',fontStyle:'italic',color:'#5C6B5E',lineHeight:1.5,marginBottom:'6px'}}>{t.action}</div>
              <div style={{height:'3px',background:'#D8D4C8'}}><div style={{height:'100%',width:t.bar+'%',background:t.color,opacity:0.75}}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Screen: Kejetia (Paid) ────────────────────────────────────────────────────
const PMobCase = () => {
  const [showTable,setShowTable] = useState(false);
  const [showCalib,setShowCalib] = useState(false);
  return (
    <div className="fade-in" style={{background:'#0D1A10',minHeight:'100vh',paddingBottom:'70px'}}>
      <div style={{padding:'20px 20px 0'}}>
        <PMobChip>III · Annotated Case Study</PMobChip>
        <h2 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'26px',fontWeight:700,color:'#FAF8F3',lineHeight:1.15,marginTop:'10px',marginBottom:'6px'}}>Kejetia Market Digitisation.</h2>
        <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.6,marginBottom:'16px'}}>The benchmark against which all subsequent evaluations are calibrated.</p>
      </div>
      <div style={{padding:'0 20px 14px'}}>
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',padding:'16px'}}>
          <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#B8D935',marginBottom:'8px'}}>Final Score</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'8px',marginBottom:'10px'}}>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'64px',color:'#B8D935',lineHeight:1}}>87</span>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'18px',color:'rgba(184,217,53,0.4)'}}>/100</span>
            <div style={{marginLeft:'4px'}}>
              <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,color:'#B8D935',textTransform:'uppercase',letterSpacing:'1px'}}>Exceptional</div>
              <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',color:'rgba(250,248,243,0.3)'}}>Priority Pursuit</div>
            </div>
          </div>
          <div style={{height:'4px',background:'rgba(255,255,255,0.08)',marginBottom:'16px'}}><div style={{height:'100%',width:'87%',background:'#B8D935'}}/></div>
          {KEJETIA_SUBS.slice(0,4).map((k,i)=>(
            <div key={i} style={{marginBottom:i<3?'9px':'0'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'3px'}}>
                <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',color:'rgba(250,248,243,0.5)'}}>{['P&P Alignment','Strategic Fit','Feasibility','Scalability'][i]}</span>
                <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'10px',color:'#B8D935'}}>{[26,23,22,16][i]}<span style={{color:'rgba(184,217,53,0.35)'}}>/{[30,25,25,20][i]}</span></span>
              </div>
              <div style={{height:'3px',background:'rgba(255,255,255,0.08)'}}><div style={{height:'100%',width:([26/30,23/25,22/25,16/20][i]*100)+'%',background:'#B8D935'}}/></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:'0 20px 14px'}}>
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',padding:'13px',marginBottom:'2px'}}>
          <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'13px',lineHeight:1.8,color:'rgba(250,248,243,0.65)',margin:'0 0 10px',fontWeight:300}}>
            Exceptional P&amp;P alignment. Risk Assessment was initially scored 3/7 (cybersecurity underweighted). BRIDGE evaluators identified the gap; the venture accepted the mitigation protocol. Score revised to 5/7 before IC review.
          </p>
          <div style={{borderLeft:'3px solid rgba(184,217,53,0.35)',paddingLeft:'12px'}}>
            <p style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',lineHeight:1.55,margin:0}}>Kejetia demonstrates what the instrument is for: not to exclude good ventures, but to make them better before capital is committed.</p>
          </div>
        </div>
        {/* Full scorecard */}
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div onClick={()=>setShowTable(o=>!o)}
            style={{padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
            <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#B8D935'}}>Full Scorecard — 12 Sub-Components</span>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:'#B8D935',transform:showTable?'rotate(180deg)':'none',transition:'transform 0.2s'}}>&#9660;</span>
          </div>
          {showTable&&KEJETIA_SUBS.map((row,i)=>(
            <div key={i} className="slide-up" style={{padding:'10px 14px',borderTop:'1px solid rgba(255,255,255,0.07)',background:i%2===0?'transparent':'rgba(255,255,255,0.02)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'3px'}}>
                <div style={{flex:1,paddingRight:'8px'}}>
                  <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',color:'rgba(250,248,243,0.3)',marginBottom:'1px'}}>{row.dim}</div>
                  <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'11px',fontWeight:700,color:'#FAF8F3'}}>{row.sub}</div>
                </div>
                <div style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'18px',color:'#B8D935',flexShrink:0}}>{row.score}</div>
              </div>
              <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'10px',lineHeight:1.6,color:'rgba(250,248,243,0.4)',margin:0}}>{row.notes}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Calibration library */}
      <div style={{padding:'0 20px 14px'}}>
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div onClick={()=>setShowCalib(o=>!o)}
            style={{padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
            <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#B8D935'}}>IV · Calibration Library — 6 Precedents</span>
            <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:'#B8D935',transform:showCalib?'rotate(180deg)':'none',transition:'transform 0.2s'}}>&#9660;</span>
          </div>
          {showCalib&&CALIBRATION_CASES.map((c,i)=>(
            <div key={i} className="slide-up" style={{padding:'11px 14px',borderTop:'1px solid rgba(255,255,255,0.07)',background:i%2===0?'transparent':'rgba(255,255,255,0.02)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'3px'}}>
                <div style={{flex:1,paddingRight:'8px'}}>
                  <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',color:'rgba(250,248,243,0.3)',marginBottom:'1px'}}>{c.sector}</div>
                  <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'11px',fontWeight:700,color:'#FAF8F3'}}>{c.venture}</div>
                </div>
                <div style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'20px',flexShrink:0,
                  color:c.score>=80?'#1A6B2F':c.score>=65?'#2E7D32':c.score>=50?'#B8730A':c.score>=35?'#E65100':'#A8200D'}}>{c.score}</div>
              </div>
              <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'10px',lineHeight:1.6,color:'rgba(250,248,243,0.4)',margin:0,fontStyle:'italic'}}>{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Screen: Engage (Paid) ─────────────────────────────────────────────────────
const PMobEngage = () => {
  const [activeTier,setActiveTier] = useState(2);
  const [openPkg,setOpenPkg] = useState(null);
  const PKGS = [
    {name:'Venture Score',time:'3–4 weeks',price:'Enquire',hi:false,desc:'Single venture assessed across all four dimensions. Full written rationale, score report, 60-minute debrief.',for:'Founders preparing for investment rounds or government procurement'},
    {name:'Portfolio Audit',time:'6–8 weeks',price:'Enquire',hi:true,desc:'Up to 8 ventures scored and ranked. Comparative matrix, portfolio integration analysis, executive presentation.',for:'DFIs, government agencies, family offices'},
    {name:'Programme Design',time:'8–12 weeks',price:'Custom',hi:false,desc:"BRIDGE designs a bespoke evaluation framework for your institution's mandate — embedding BRIDGE methodology while adapting to your priorities.",for:'Multilaterals, government ministries, sovereign wealth funds'},
  ];
  const MEMBER_TIERS_PAID = [
    {n:'1',tier:'General Community',price:'Free',features:['Public content & events','Big Ideas Challenge','BRIDGE newsletter']},
    {n:'2',tier:'Network Members',price:'$100/yr',features:['Full platform access','Member directory','Opportunity database','Idea submission with feedback']},
    {n:'3',tier:'Professional Contributors',price:'$500–$2,000/yr',features:['Mentorship & advisory matching','Deal flow access (observer)','Contributor retreats','BRIDGE leadership engagement']},
    {n:'4',tier:'Investors',price:'From $10K',features:['LP rights in BRIDGE Fund(s)','Quarterly investor reporting','Co-investment opportunities','Advisory Council eligibility']},
    {n:'5',tier:'Strategic Partners',price:'By Invitation',features:['Board or Advisory Council seat','Strategic direction input','Co-branding opportunities','Named programs & flagship access']},
  ];
  return (
    <div className="fade-in" style={{background:'#1B4D3E',minHeight:'100vh',paddingBottom:'70px'}}>
      <div style={{padding:'20px 20px 16px'}}>
        <PMobChip accent>External Engagements</PMobChip>
        <h2 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'24px',fontWeight:700,fontStyle:'italic',color:'#FAF8F3',lineHeight:1.2,marginTop:'10px',marginBottom:'8px'}}>Commission the Score. Get the instrument, not just the report.</h2>
        <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'13px',color:'rgba(250,248,243,0.5)',lineHeight:1.7,fontWeight:300}}>All engagements include full evaluator access, written rationale at every sub-component, and a post-delivery debrief with the lead evaluator.</p>
      </div>
      {/* Packages */}
      <div style={{padding:'0 20px 14px'}}>
        {PKGS.map((pkg,i)=>(
          <div key={i} style={{marginBottom:'2px'}}>
            <div onClick={()=>setOpenPkg(openPkg===i?null:i)}
              style={{background:pkg.hi?'#B8D935':'rgba(255,255,255,0.06)',border:pkg.hi?'none':'1px solid rgba(255,255,255,0.1)',
                padding:'13px 14px',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',
                  color:pkg.hi?'rgba(13,26,16,0.5)':'rgba(250,248,243,0.35)',marginBottom:'3px'}}>{pkg.name}</div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'15px',color:pkg.hi?'#0D1A10':'#B8D935'}}>{pkg.price}</span>
                  <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',color:pkg.hi?'rgba(13,26,16,0.4)':'rgba(184,217,53,0.5)',
                    background:pkg.hi?'rgba(27,77,62,0.12)':'rgba(184,217,53,0.1)',padding:'2px 6px'}}>{pkg.time}</span>
                </div>
              </div>
              <span style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'12px',color:pkg.hi?'#0D1A10':'#B8D935',transform:openPkg===i?'rotate(180deg)':'none',transition:'transform 0.2s',flexShrink:0,marginLeft:'10px'}}>&#9660;</span>
            </div>
            {openPkg===i&&(
              <div className="slide-up" style={{background:pkg.hi?'rgba(184,217,53,0.08)':'rgba(255,255,255,0.04)',
                border:pkg.hi?'1px solid rgba(184,217,53,0.2)':'1px solid rgba(255,255,255,0.08)',borderTop:'none',padding:'13px 14px'}}>
                <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',lineHeight:1.75,color:pkg.hi?'#1B4D3E':'rgba(250,248,243,0.65)',marginBottom:'8px',fontWeight:300}}>{pkg.desc}</p>
                <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:pkg.hi?'rgba(27,77,62,0.5)':'rgba(184,217,53,0.45)',marginBottom:'12px'}}>Best for: {pkg.for}</div>
                <a href="#" className="tap-scale" style={{display:'flex',alignItems:'center',justifyContent:'center',
                  background:pkg.hi?'#1B4D3E':'rgba(255,255,255,0.1)',color:pkg.hi?'#B8D935':'#FAF8F3',
                  padding:'10px',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',fontWeight:800,textDecoration:'none'}}>
                  Commission &rarr;
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Advisory */}
      <div style={{padding:'0 20px 14px'}}>
        <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.12)',padding:'16px'}}>
          <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#B8D935',marginBottom:'6px'}}>Portfolio Advisory &mdash; Tier 5</div>
          <h3 style={{fontFamily:'"Playfair Display","Georgia",serif',fontSize:'16px',fontWeight:700,color:'#FAF8F3',lineHeight:1.3,marginBottom:'8px',fontStyle:'italic'}}>Embed the BRIDGE methodology inside your institution.</h3>
          <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'12px',color:'rgba(250,248,243,0.5)',lineHeight:1.7,marginBottom:'12px',fontWeight:300}}>For DFIs, government ministries, and sovereign wealth funds. Includes team training, framework adaptation, and ongoing calibration support.</p>
          <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',color:'rgba(250,248,243,0.3)',marginBottom:'12px'}}>Invitation-based &mdash; Tier 5 Strategic Partners</div>
          <a href="#" className="tap-scale" style={{display:'flex',alignItems:'center',justifyContent:'center',
            background:'#B8D935',color:'#0D1A10',padding:'11px',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'11px',fontWeight:800,textDecoration:'none',marginBottom:'6px'}}>
            Request Proposal &rarr;
          </a>
          <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',color:'rgba(250,248,243,0.2)',textAlign:'center'}}>bridge-pbc.com/partners</div>
        </div>
      </div>
      {/* Tier selector */}
      <div style={{padding:'0 20px 16px'}}>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'14px'}}>
          <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.28)',marginBottom:'8px'}}>Network Membership</div>
          <div style={{display:'flex',gap:'2px',marginBottom:'2px',overflowX:'auto'}}>
            {MEMBER_TIERS_PAID.map((t,i)=>(
              <button key={i} onClick={()=>setActiveTier(i)}
                style={{flex:'0 0 auto',padding:'6px 10px',
                  background:activeTier===i?'rgba(255,255,255,0.14)':'rgba(255,255,255,0.04)',
                  border:activeTier===i?'1px solid rgba(255,255,255,0.25)':'1px solid rgba(255,255,255,0.06)',
                  cursor:'pointer',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,
                  color:activeTier===i?'#FAF8F3':'rgba(250,248,243,0.3)',
                  transition:'all 0.15s',whiteSpace:'nowrap'}}>
                {t.n}. {t.tier.split(' ')[0]}
              </button>
            ))}
          </div>
          {MEMBER_TIERS_PAID[activeTier]&&(
            <div className="slide-up" key={activeTier}
              style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',padding:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
                <div>
                  <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.28)',marginBottom:'3px'}}>Tier {MEMBER_TIERS_PAID[activeTier].n}</div>
                  <div style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'13px',fontWeight:700,color:'#FAF8F3'}}>{MEMBER_TIERS_PAID[activeTier].tier}</div>
                </div>
                <div style={{fontFamily:'"DM Mono","Courier New",monospace',fontSize:'13px',color:'#B8D935'}}>{MEMBER_TIERS_PAID[activeTier].price}</div>
              </div>
              {MEMBER_TIERS_PAID[activeTier].features.map((f,fi)=>(
                <div key={fi} style={{display:'flex',gap:'7px',marginBottom:'5px'}}>
                  <span style={{color:'rgba(184,217,53,0.7)',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',fontWeight:700,flexShrink:0}}>&#10003;</span>
                  <span style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'11px',color:'rgba(250,248,243,0.65)',lineHeight:1.5}}>{f}</span>
                </div>
              ))}
            </div>
          )}
          <p style={{fontFamily:'"Source Serif 4","Georgia",serif',fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.22)',lineHeight:1.6,marginTop:'10px',textAlign:'center'}}>
            All external engagements subject to BRIDGE conflict-of-interest review.
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Mobile root (Paid) ────────────────────────────────────────────────────────
const MobileImpactScorePaid = () => {
  const [screen,setScreen] = useState('cover');
  const renderScreen = () => {
    switch(screen) {
      case 'cover':   return <PMobOverview/>;
      case 'rubrics': return <PMobRubrics/>;
      case 'process': return <PMobProcess/>;
      case 'case':    return <PMobCase/>;
      case 'engage':  return <PMobEngage/>;
      default:        return <PMobOverview/>;
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
          <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)'}}>
            Impact Score&#8482; &middot; Member
          </span>
          <a href="#" onClick={e=>{e.preventDefault();setScreen('engage');}}
            style={{background:'#1B4D3E',color:'#B8D935',padding:'5px 12px',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:700,textDecoration:'none'}}>
            Engage &rarr;
          </a>
        </div>
      </div>
      <div key={screen}>{renderScreen()}</div>
      <PaidMobBottomNav active={screen} onSelect={setScreen}/>
    </div>
  );
};
