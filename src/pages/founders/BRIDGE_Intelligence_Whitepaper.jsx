import{useState,useEffect}from"react";

const C={
  ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',
  forest:'#1B4D3E',lime:'#B8D935',
  muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',teal:'#2E5A4D',
  amber:'#B8730A',positive:'#1A6B2F',red:'#A8200D',white:'#FFFFFF',
};
const F={
  display:'"Playfair Display","Georgia",serif',
  body:'"Source Serif 4","Georgia",serif',
  sans:'"DM Sans","Helvetica Neue",sans-serif',
  mono:'"DM Mono","Courier New",monospace',
};

const Gf=()=>(<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  @media print{.np{display:none!important;}}

  #read-bar{position:fixed;top:0;left:0;height:2px;background:${C.lime};z-index:200;transition:width .1s linear;}

  .toc{position:fixed;left:0;top:0;bottom:0;width:220px;background:${C.ink};padding:72px 0 32px;overflow-y:auto;z-index:90;}
  .toc-logo{padding:0 24px 24px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:12px;}
  .toc-section{padding:14px 24px 5px;font-family:${F.sans};font-size:8px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:rgba(250,248,243,.18);}
  .toc-item{display:block;padding:6px 24px;font-family:${F.sans};font-size:10px;font-weight:600;color:rgba(250,248,243,.35);text-decoration:none;letter-spacing:.3px;transition:all .15s;border-left:2px solid transparent;cursor:pointer;}
  .toc-item:hover{color:rgba(250,248,243,.7);border-left-color:rgba(184,217,53,.3);}
  .toc-item.active{color:${C.lime};border-left-color:${C.lime};}

  .main{margin-left:220px;}
  @media(max-width:960px){.toc{display:none;}.main{margin-left:0;}}

  p{font-family:${F.body};font-size:16px;line-height:1.88;color:${C.ink};font-weight:300;margin-bottom:18px;}
  p+p{text-indent:1.5em;}
  strong{font-weight:600;}
  em{font-style:italic;}

  .rule-strong{border-top:6px solid ${C.ink};border-bottom:2px solid ${C.lime};padding-bottom:3px;margin-bottom:20px;}
  .rule-light{border-top:1px solid ${C.border};margin:32px 0;}

  .dc::first-letter{font-family:${F.display};font-size:4.2em;font-weight:900;float:left;line-height:.82;margin:.06em .1em 0 0;color:${C.forest};}

  .pq{border-left:3px solid ${C.lime};padding:2px 0 2px 24px;margin:32px 0;font-family:${F.display};font-size:19px;font-style:italic;color:${C.forest};line-height:1.55;}

  .stat-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:${C.border};border:1px solid ${C.border};margin:32px 0;}
  .stat-cell{background:${C.paper};padding:20px 16px;text-align:center;}
  .stat-n{font-family:${F.mono};font-size:30px;font-weight:500;color:${C.forest};display:block;line-height:1;}
  .stat-l{font-family:${F.sans};font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};margin-top:5px;display:block;}
  @media(max-width:600px){.stat-strip{grid-template-columns:1fr 1fr;}}

  .stat-strip-dark{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.06);margin:32px 0;}
  .stat-cell-dark{background:rgba(255,255,255,.03);padding:20px 16px;text-align:center;}
  @media(max-width:600px){.stat-strip-dark{grid-template-columns:1fr 1fr;}}

  .cite{font-family:${F.sans};font-size:10px;color:${C.faint};font-style:normal;vertical-align:super;line-height:0;}
  .ref-block{background:${C.paperDark};border-left:3px solid ${C.border};padding:16px 20px;margin:24px 0;font-family:${F.sans};font-size:11px;color:${C.muted};line-height:1.7;}
  .ref-block strong{color:${C.ink};font-size:10px;letter-spacing:.5px;text-transform:uppercase;}

  .evidence-card{border-left:4px solid ${C.lime};padding:16px 20px;background:rgba(27,77,62,.04);margin:20px 0;}
  .evidence-tag{font-family:${F.sans};font-size:8px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${C.teal};margin-bottom:6px;}
  .evidence-text{font-family:${F.body};font-size:14px;color:${C.ink};line-height:1.7;}
  .evidence-source{font-family:${F.sans};font-size:10px;color:${C.faint};margin-top:6px;font-style:italic;}

  .gap-diagram{border:1px solid ${C.border};padding:28px;margin:28px 0;background:${C.paperDark};}
  .gap-row{display:grid;grid-template-columns:1fr 40px 1fr;gap:0;align-items:center;margin-bottom:16px;}
  .gap-left{background:${C.ink};color:${C.paper};padding:14px 16px;font-family:${F.sans};font-size:12px;font-weight:700;line-height:1.4;}
  .gap-arrow{background:${C.lime};display:flex;align-items:center;justify-content:center;color:${C.ink};font-size:16px;font-weight:900;height:100%;}
  .gap-right{border:1.5px solid ${C.lime};padding:14px 16px;font-family:${F.sans};font-size:12px;font-weight:700;color:${C.forest};line-height:1.4;}
  @media(max-width:600px){.gap-row{grid-template-columns:1fr;}.gap-arrow{height:32px;}}

  .section-cover{background:${C.ink};padding:56px 64px;position:relative;overflow:hidden;}
  .section-cover-num{position:absolute;right:-10px;bottom:-20px;font-family:${F.display};font-size:clamp(100px,18vw,200px);font-weight:900;color:rgba(255,255,255,.035);line-height:1;pointer-events:none;user-select:none;}
  .section-eyebrow{font-family:${F.sans};font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:rgba(184,217,53,.6);margin-bottom:12px;}
  .section-h{font-family:${F.display};font-size:clamp(22px,4vw,40px);font-weight:900;color:${C.white};line-height:1.15;margin-bottom:12px;}
  .section-sub{font-family:${F.body};font-size:16px;color:rgba(250,248,243,.55);max-width:640px;line-height:1.72;font-weight:300;}

  .body-pad{padding:52px 64px;max-width:860px;}
  .eyebrow{font-family:${F.sans};font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:${C.muted};margin-bottom:8px;}
  .h2{font-family:${F.display};font-size:clamp(20px,3vw,30px);font-weight:700;color:${C.ink};line-height:1.25;margin-bottom:16px;}
  .h3{font-family:${F.sans};font-size:15px;font-weight:700;color:${C.forest};margin-bottom:10px;margin-top:28px;}

  .footnotes{padding:36px 64px;background:${C.paperDark};border-top:1px solid ${C.border};}
  .fn-title{font-family:${F.sans};font-size:9px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:${C.muted};margin-bottom:16px;}
  .fn-item{font-family:${F.sans};font-size:10px;color:${C.muted};line-height:1.65;margin-bottom:8px;padding-left:20px;position:relative;}
  .fn-item::before{content:attr(data-n);position:absolute;left:0;font-weight:700;color:${C.teal};}

  .doc-footer{background:${C.ink};padding:22px 64px;border-top:3px solid ${C.lime};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;}

  @media(max-width:900px){
    .body-pad{padding:40px 32px;}
    .section-cover{padding:40px 32px;}
    .footnotes{padding:28px 32px;}
    .doc-footer{padding:18px 32px;}
  }
  @media(max-width:600px){
    .body-pad{padding:28px 20px;}
    .section-cover{padding:28px 20px;}
    .gap-row{grid-template-columns:1fr;}
    .gap-arrow{height:28px;}
    .footnotes{padding:24px 18px;}
    .doc-footer{padding:16px 18px;}
  }
`}</style>);

const Logo=({height=24,variant='white'})=>{
  const tf=variant==='white'?'#ffffff':'#1B4D3E';
  const bk=variant==='white'?'rgba(0,0,0,0.08)':'rgba(27,77,62,0.15)';
  return(<svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
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
  </svg>);
};

const SECTIONS=[
  {id:'cover',label:'Cover'},
  {id:'abstract',label:'Abstract',group:'Overview'},
  {id:'intro',label:'Introduction'},
  {id:'gap1',label:'The Capital Gap',group:'The Evidence Base'},
  {id:'gap2',label:'The Intelligence Gap'},
  {id:'gap3',label:'The Ecological Dimension'},
  {id:'gap4',label:'The Brain Drain Paradox'},
  {id:'theory',label:'Theoretical Framework',group:'Framework'},
  {id:'intervention',label:'The Intervention Logic'},
  {id:'app',label:'The Application',group:'The Solution'},
  {id:'mechanism',label:'How It Works'},
  {id:'impact',label:'Measurable Public Benefit'},
  {id:'conclusion',label:'Conclusion',group:'Closing'},
  {id:'references',label:'References'},
];

const TOC=({active})=>(
  <nav className="toc np">
    <div className="toc-logo"><Logo height={16} variant="white"/></div>
    {SECTIONS.map((s,i)=>(
      <span key={i}>
        {s.group&&<div className="toc-section">{s.group}</div>}
        <a className={`toc-item${active===s.id?' active':''}`} onClick={()=>document.getElementById(s.id)?.scrollIntoView({behavior:'smooth',block:'start'})}>
          {s.label}
        </a>
      </span>
    ))}
  </nav>
);

const Rule=()=><div className="rule-strong"/>;
const Eyebrow=({c})=><div className="eyebrow">{c}</div>;
const H2=({c})=><h2 className="h2">{c}</h2>;
const H3=({c})=><h3 className="h3">{c}</h3>;
const PQ=({c})=><blockquote className="pq">{c}</blockquote>;
const Cite=({n})=><sup className="cite">[{n}]</sup>;

const EvidenceCard=({tag,text,source})=>(
  <div className="evidence-card">
    <div className="evidence-tag">{tag}</div>
    <div className="evidence-text">{text}</div>
    <div className="evidence-source">{source}</div>
  </div>
);

export default function BRIDGEPublicBenefitWhitepaper(){
  const [active,setActive]=useState('cover');
  const [pct,setPct]=useState(0);

  useEffect(()=>{
    const fn=()=>{
      const el=document.documentElement;
      setPct(Math.min(100,Math.round((el.scrollTop/(el.scrollHeight-el.clientHeight))*100)||0));
      for(let i=SECTIONS.length-1;i>=0;i--){
        const s=document.getElementById(SECTIONS[i].id);
        if(s&&s.getBoundingClientRect().top<=120){setActive(SECTIONS[i].id);break;}
      }
    };
    window.addEventListener('scroll',fn,{passive:true});
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  return(
    <div style={{fontFamily:F.body,background:C.paper,minHeight:'100vh'}}>
      <Gf/>
      <div id="read-bar" style={{width:`${pct}%`}}/>
      <TOC active={active}/>
      <div className="main">

        {/* ── COVER ─────────────────────────────────────────────────────── */}
        <div id="cover" style={{background:C.ink,padding:'80px 64px 64px',minHeight:'94vh',display:'flex',flexDirection:'column',justifyContent:'space-between',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',right:0,bottom:-20,fontFamily:F.display,fontSize:'clamp(140px,26vw,360px)',fontWeight:900,color:'rgba(255,255,255,.022)',lineHeight:1,pointerEvents:'none',userSelect:'none',letterSpacing:'-12px'}}>B</div>
          <div><Logo height={26} variant="white"/><div style={{borderTop:'1px solid rgba(255,255,255,.1)',marginTop:'28px',marginBottom:'48px'}}/></div>
          <div style={{maxWidth:'780px',position:'relative',zIndex:1}}>
            <div style={{display:'inline-block',background:'rgba(184,217,53,.1)',border:'1px solid rgba(184,217,53,.2)',padding:'5px 14px',marginBottom:'24px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.lime}}>Public Benefit Whitepaper · BRIDGE PBC · March 2026</div>
            <h1 style={{fontFamily:F.display,fontSize:'clamp(34px,5.5vw,68px)',fontWeight:900,color:C.white,lineHeight:1.05,marginBottom:'22px',letterSpacing:'-1px'}}>
              Closing the Intelligence Gap:<br/><em style={{color:C.lime,fontStyle:'italic'}}>A Scientific &amp; Ecological Case for<br/>Democratic Access to Development Intelligence</em>
            </h1>
            <p style={{fontFamily:F.body,fontSize:'17px',color:'rgba(250,248,243,.58)',lineHeight:1.78,maxWidth:'600px',fontWeight:300,marginBottom:0}}>An evidence-based examination of the structural gaps between Ghanaian entrepreneurs and the information, intelligence, and capital they need to build ventures that create dignified livelihoods — and the public benefit rationale for the BRIDGE Impact Score™ Assessor as a democratising intervention.</p>
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,.08)',marginTop:'48px',paddingTop:'28px',display:'flex',gap:'48px',flexWrap:'wrap'}}>
            {[['90%+','SMEs of Ghana\'s businesses'],['$5B+','Annual SME financing gap'],['500/mo','Nurses leaving Ghana'],['$1.9B','Annual post-harvest losses'],['40%','SMEs cite finance as #1 barrier']].map(([n,l])=>(
              <div key={l}>
                <div style={{fontFamily:F.mono,fontSize:'22px',fontWeight:500,color:C.lime,lineHeight:1}}>{n}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,.28)',marginTop:'4px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ABSTRACT ──────────────────────────────────────────────────── */}
        <div id="abstract" style={{background:C.paperDark}}>
          <div className="body-pad">
            <Eyebrow c="Abstract"/>
            <Rule/>
            <p className="dc" style={{fontStyle:'italic',color:C.teal,fontWeight:400}}>Ghana's economic challenges are not primarily challenges of potential — they are challenges of connection. The country's entrepreneurs possess ideas. Its land holds resources. Its diaspora holds capital and expertise. Its communities hold knowledge of their own needs. What has been systematically absent is a structured mechanism for connecting these assets to each other with the rigour, transparency, and contextual intelligence needed to produce outcomes rather than activity. This whitepaper presents the empirical case for that gap — drawing on peer-reviewed research, institutional data, and field evidence — and argues that the BRIDGE Impact Score™ Assessor constitutes a scientifically grounded, ecologically coherent, and demonstrably necessary public benefit intervention.</p>
            <p>The paper is organised as follows. Part I establishes the evidence base for four compounding gaps that together define Ghana's development intelligence crisis: the capital access gap, the information asymmetry gap, the ecological systems gap, and the brain drain paradox. Part II presents the theoretical framework — drawing on information economics, systems ecology, and development finance theory — that grounds the BRIDGE intervention in scientific literature. Part III describes the application itself and the specific mechanism through which it addresses each documented gap. Part IV quantifies the measurable public benefit the application is designed to deliver. The paper closes with a formal statement of BRIDGE PBC's public benefit commitments in relation to this product.</p>
            <div className="ref-block">
              <strong>Keywords</strong><br/>
              Information asymmetry · SME finance gap · Development intelligence · Ghana entrepreneurship · Impact assessment methodology · Ecological systems thinking · Public benefit technology · Brain circulation · Peace &amp; Prosperity framework
            </div>
          </div>
        </div>

        {/* ── INTRODUCTION ──────────────────────────────────────────────── */}
        <div id="intro" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow c="Introduction"/>
            <Rule/>
            <H2 c="The problem is not potential. It is connection."/>
            <p>In 2024, Ghana's National Bureau of Statistics recorded 1.87 million registered business establishments — a tripling from 638,000 a decade prior.<Cite n="1"/> Africa, including Ghana, boasts the world's highest rates of entrepreneurship: more than one in five working-age Africans is starting a new business, and more than three-quarters of youth plan to do so within five years.<Cite n="2"/> The entrepreneurial impulse in Ghana is not in deficit. What is in deficit is the structural infrastructure that converts that impulse into durable, impact-generating enterprise.</p>
            <p>The barriers are well-documented and compounding. <Cite n="3"/> Access to finance remains the most frequently cited constraint, with 40% of small and medium firms naming it as their primary obstacle according to the 2023 World Bank Enterprise Survey.<Cite n="4"/> But behind the financing barrier sits a deeper, less-discussed obstacle: information asymmetry — the structural condition in which entrepreneurs lack the intelligence to present their ventures credibly, investors lack the intelligence to evaluate them accurately, and communities lack the intelligence to advocate for what they actually need.</p>
            <p>This whitepaper argues that the intelligence gap is the load-bearing constraint. Solve the intelligence gap, and the financing gap becomes structurally addressable. Leave the intelligence gap in place, and every additional dollar of capital deployed into the ecosystem will continue to under-perform relative to its potential — because without structured assessment, capital flows to the familiar rather than the optimal.</p>
            <PQ c="The problem is not that Ghana lacks good ideas. The problem is that good ideas cannot prove themselves good in the absence of the infrastructure that makes their goodness legible."/>
            <p>The BRIDGE Impact Score™ Assessor was built specifically to address this condition. It is a public benefit technology — freely accessible, rigorously grounded, contextually specific to Ghana — that democratises access to the kind of structured assessment that has historically been available only to ventures with the right networks, the right geography, or the resources to pay for it. This paper presents the scientific and ecological justification for that intervention.</p>
          </div>
        </div>

        {/* ── GAP 1: CAPITAL ────────────────────────────────────────────── */}
        <div id="gap1">
          <div className="section-cover">
            <div className="section-cover-num">01</div>
            <div className="section-eyebrow">Evidence Base · Part I</div>
            <h2 className="section-h">The capital gap is real, documented, and growing.</h2>
            <p className="section-sub">SMEs represent over 90% of Ghana's businesses, contribute approximately 60–70% of GDP, and account for 80%+ of the workforce. They are the economic backbone of the country. They are also systematically underfinanced.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <H3 c="The scale of the problem"/>
            <p>The financing gap for SMEs in Ghana is estimated at over $5 billion annually, according to Stanbic Bank Ghana's analysis of International Finance Corporation data.<Cite n="5"/> The IFC places the global MSME financing gap at $5.2 trillion per year, with those in the informal sector — which describes the majority of Ghanaian SMEs — most severely affected.<Cite n="6"/> Only about half of Ghana's SMEs have ever accessed formal credit, and even then the terms — short tenors, rigid collateral demands, complex documentation — have been insufficient to support meaningful expansion.<Cite n="7"/></p>
            <p>The cost of credit compounds the access problem. As of December 2024, the interbank rate stood at 27.04%.<Cite n="8"/> The Bank of Ghana's policy rate was held at 21.5% as of September 2025, with the Ghana reference rate at 23.69% as of July 2025.<Cite n="9"/> For a small business generating thin margins in an economy still recovering from its 2022–23 inflation crisis, those rates are not financing — they are a trap. The study by Akpan et al. (2024) found that high interest rates and lack of collateral led to business failure for 70% of SMEs surveyed.<Cite n="10"/></p>

            <EvidenceCard tag="Peer-reviewed finding" text="Nearly 67% of Ghanaian SMEs cited limited access to credit as a primary reason for their inability to scale operations and remain viable. Existing financial institutions were found to frequently neglect the unique needs of SMEs, exacerbating their vulnerability to economic shocks." source="Quartey et al. (2021), University of Cape Coast — Journal of International Research"/>

            <H3 c="Why capital is withheld"/>
            <p>The theoretical explanation for the capital gap is rooted in information economics. Akerlof's (1970) 'market for lemons' model describes how markets fail when one party to a transaction has significantly more information than the other — the seller knows more about the quality of the asset than the buyer, so buyers discount all assets to reflect their uncertainty, and sellers of genuinely good assets exit the market.<Cite n="11"/> In the Ghanaian SME lending context, the pattern is precise: commercial banks, unable to assess the creditworthiness of ventures that lack formal financial records, credit history, or auditable performance data, apply a blanket risk premium that makes credit either unavailable or unusable.</p>
            <p>The solution that information economics points to is not more capital — it is better information. Reduce the information asymmetry between entrepreneur and lender, and the credit market functions closer to its theoretical optimum. The BRIDGE Impact Score™ Assessor is, at its core, an information asymmetry reduction tool. It translates the quality of a venture into a structured, comparable, credible signal — the kind of signal that allows capital to flow toward merit rather than familiarity.</p>

            <div className="stat-strip">
              {[['90%+','SMEs — Ghana\'s business sector'],['$5B+','Annual SME financing gap'],['40%','Name finance as #1 barrier'],['70%','Failed SMEs cite credit denial']].map(([n,l])=>(
                <div className="stat-cell" key={l}><span className="stat-n">{n}</span><span className="stat-l">{l}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* ── GAP 2: INTELLIGENCE ───────────────────────────────────────── */}
        <div id="gap2" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow c="Evidence Base · Part II"/>
            <Rule/>
            <H2 c="The intelligence gap compounds every other gap."/>
            <p>Information asymmetry in development contexts is not a secondary problem — it is the mechanism through which structural disadvantage reproduces itself. Research published in <em>Humanities and Social Sciences Communications</em> (2025) found that information accessibility contributes a 1.6% increase in the probability of entrepreneurship for underprivileged populations — a meaningful lift that demonstrates the causal relationship between information access and economic participation.<Cite n="12"/> The study found that underprivileged groups with weak social networks — precisely the profile of most Ghanaian rural and peri-urban entrepreneurs — are the most likely to benefit from improved information access.</p>
            <H3 c="The network access problem"/>
            <p>Research on African venture capital by the Making Finance Work for Africa partnership has documented what practitioners have long observed: since VC investments are largely a matter of social capital over evidence-based decision-making, the continent is prone to a winner-take-all environment where founder credentials, rather than venture quality, determine funding outcomes.<Cite n="13"/> This structural bias compounds geographically — in 2024, Africa's "Big Four" markets (Nigeria, Kenya, South Africa, Egypt) captured 64% of all venture capital, leaving markets like Ghana — which represented under 5% of deal volume — marginalised even within the continent.<Cite n="14"/></p>
            <p>A textile wholesaler operating near Accra's Makola Market — described in MIT Sloan's January 2026 field study of Ghana's SME economy — had operated his business for more than ten years, generated steady cash flows, and built a strong performance record. He had never received a bank loan.<Cite n="15"/> The barrier was not the quality of his business. It was the absence of a credible mechanism through which that quality could be made legible to capital providers.</p>

            <EvidenceCard tag="Field evidence — MIT Sloan · January 2026" text="Ghana represents one of the most promising but structurally complex opportunities for SME finance in West Africa. Growth markets are node-scarce, not idea-scarce. The problem is not that good ventures do not exist — it is that the infrastructure to find them, assess them, and connect them to capital does not adequately exist." source="MIT Kuo Sharper Center for Prosperity and Entrepreneurship, January 2026"/>

            <H3 c="The assessment cost barrier"/>
            <p>Structured venture assessment — the kind that development finance consultancies provide — typically costs between $3,000 and $10,000 per engagement. For a Ghanaian entrepreneur whose venture requires $50,000–$250,000 in capital, a $5,000 assessment cost represents 2–10% of total funding required spent before a single cedi of investment is secured. The Brookings Institution's review of SME support programmes documents that when ventures in developing economies receive structured, staged assessment — where support is calibrated to demonstrated quality — the results significantly outperform generic training or capital injection programmes.<Cite n="16"/> The mechanism is exactly what the BRIDGE Assessor implements: filter by merit, calibrate support to demonstrated quality, and ensure that the highest-potential ventures receive the most intensive engagement.</p>
            <p>When access to assessment is gatekept by cost, the filter operates on wealth rather than quality. Ventures from entrepreneurs with capital, networks, or institutional affiliation can afford to be assessed. Ventures from entrepreneurs without those advantages cannot. The result is a systematic bias in the venture ecosystem that favours privilege over potential — a bias that compounds at every subsequent stage of the capital deployment chain.</p>
          </div>
        </div>

        {/* ── GAP 3: ECOLOGICAL ─────────────────────────────────────────── */}
        <div id="gap3">
          <div className="section-cover">
            <div className="section-cover-num">02</div>
            <div className="section-eyebrow">Evidence Base · Part III</div>
            <h2 className="section-h">The ecological perspective: why system-level failures demand system-level interventions.</h2>
            <p className="section-sub">The challenges facing Ghanaian entrepreneurs are not isolated failures of individual actors. They are the emergent properties of a complex, interdependent economic ecosystem that is failing at multiple nodes simultaneously.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <H3 c="Ghana's food systems — the archetypal system failure"/>
            <p>Ghana's agricultural sector illustrates the ecological dimension with painful clarity. The country has invested heavily in production — the Planting for Food and Jobs programme reduced input costs by 40% in 2024, contributing to a 14% year-on-year increase in maize output to 3.2 million metric tonnes.<Cite n="17"/> Yet 13.3 million Ghanaians were food insecure by the end of 2024 — a 7.3% rise — and food insecurity increased 55.6% since 2023.<Cite n="18"/> An estimated 100,000 metric tonnes of maize and rice from the 2024 harvest remained unsold across major farming areas.<Cite n="19"/></p>
            <p>This is not a production failure. It is an information and coordination failure. Farmers planted the same crops — maize and rice — without reliable market intelligence. Post-harvest infrastructure did not exist to absorb surplus. Processors and buyers were not connected to producers through functioning market systems. The gap between farmgate and wholesale prices is documented at 169%.<Cite n="20"/> The World Food Programme and NAFCO estimate Ghana loses $1.9 billion worth of food annually to post-harvest inefficiencies — not because the food cannot be grown, but because the system that should connect growth to consumption is broken at multiple points simultaneously.<Cite n="21"/></p>

            <EvidenceCard tag="Systems ecology finding" text="The tragedy of the Ghanaian farmer is not a failure of the land, but a failure of the link between the field and the fork. Without strong data and coordination systems, Ghana's agricultural sector will continue to swing between excess and scarcity. The real task is to build a system that links production to markets efficiently." source="IMANI Africa, October 2025"/>

            <H3 c="Systems ecology and the intervention logic"/>
            <p>Systems ecology — the study of how organisms interact with their environments as integrated, interdependent networks — provides the most accurate theoretical model for understanding why point solutions to Ghana's development challenges consistently underperform. When a system fails at multiple nodes simultaneously, intervening at any single node produces sub-optimal outcomes. Capital without intelligence is misallocated. Infrastructure without market linkages produces the grain glut paradox. Training without capital access produces skilled, unemployed graduates. Each intervention, in isolation, generates activity but not systemic change.</p>
            <p>The ecological insight that BRIDGE applies is this: in complex systems, the highest-leverage intervention points are those that improve information flow between nodes. When information flows freely and accurately between producers and consumers, between entrepreneurs and investors, between communities and support systems, the system self-organises toward more efficient states. This is not a metaphor — it is the empirical finding of decades of development economics research on what distinguishes successful from unsuccessful economic development programmes.</p>
            <p>The BRIDGE Impact Score™ Assessor is designed as an information flow intervention. It does not replace capital, infrastructure, or training. It creates the structured intelligence layer that makes all other interventions more productive by ensuring they reach the ventures most likely to generate systemic returns — rather than the ventures most visible to existing gatekeepers.</p>

            <div className="gap-diagram">
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>The compounding gap — system failure map</div>
              {[
                ['No structured assessment','Ventures cannot prove quality','Capital flows to familiar, not optimal'],
                ['No market intelligence','Farmers grow without demand data','Surplus in good years, scarcity in bad'],
                ['No investment readiness','SMEs cannot access formal credit','70% failure rate, 67% cite credit denial'],
                ['No diaspora matching','Skills and capital remain abroad','Brain drain compounds underdevelopment'],
              ].map(([a,b,c],i)=>(
                <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 28px 1fr 28px 1fr',gap:0,alignItems:'stretch',marginBottom:'8px'}}>
                  <div style={{background:C.ink,color:C.paper,padding:'11px 14px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,lineHeight:1.35}}>{a}</div>
                  <div style={{background:C.teal,display:'flex',alignItems:'center',justifyContent:'center',color:C.lime,fontSize:'12px',fontWeight:900}}>→</div>
                  <div style={{background:C.paperDark,border:`1px solid ${C.border}`,padding:'11px 14px',fontFamily:F.sans,fontSize:'11px',color:C.muted,lineHeight:1.35}}>{b}</div>
                  <div style={{background:C.teal,display:'flex',alignItems:'center',justifyContent:'center',color:C.lime,fontSize:'12px',fontWeight:900}}>→</div>
                  <div style={{border:`1.5px solid ${C.lime}`,padding:'11px 14px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,lineHeight:1.35}}>{c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── GAP 4: BRAIN DRAIN ────────────────────────────────────────── */}
        <div id="gap4" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow c="Evidence Base · Part IV"/>
            <Rule/>
            <H2 c="The brain drain paradox: Ghana trains talent for the world."/>
            <p>Ghana's brain drain is one of the most thoroughly documented aspects of its development challenge — and one of the most tractable, because the solution does not require people to return. It requires creating conditions worth returning to.</p>
            <H3 c="The scale of loss"/>
            <p>An estimated 500 nurses leave Ghana for Western countries every month.<Cite n="22"/> The UK now employs more Ghanaian nurses than Ghana does.<Cite n="23"/> More than 3,000 Ghanaian health professionals left for the United Kingdom from 2018 to 2021 alone.<Cite n="24"/> Ghana spends $9 million annually on medical education — investments that are systematically harvested by high-income countries with no reimbursement mechanism.<Cite n="25"/> The healthcare impact is direct and measurable: physician-to-population ratios that fall to 1:6,000 in some regions, increased workloads for remaining staff, and declining quality of care particularly in rural and Northern areas.</p>
            <p>The phenomenon extends beyond healthcare. The brain drain of educators, engineers, IT specialists, and entrepreneurs removes the people most likely to generate and deploy the kind of innovation that addresses Ghana's systemic challenges. The Ghana Statistical Service (2024) documents an intensification of emigration among young professionals driven by economic difficulty — a pattern that deepened under the 2022–23 economic crisis and has not reversed.<Cite n="26"/></p>

            <EvidenceCard tag="Research finding — Wilson Center" text="The UK now employs more Ghanaian nurses than Ghana does. On average, 500 nurses leave Ghana for the West every month. Ghana spends $9 million annually on medical education and has witnessed the reversal of the flow of aid — meaning recipient countries view their aid as compensation while continuing to extract trained human capital." source="Wilson Center · Africa's Healthworker Brain Drain, 2024"/>

            <H3 c="Brain drain as a solvable information problem"/>
            <p>IPA research tracking high-achieving Ghanaian graduates found that the primary motivation for emigration was economic differential — not preference for life abroad.<Cite n="27"/> Annual remittances from Ghanaians abroad amount to approximately $5,000 per migrant, equivalent to about seven times Ghana's per capita GDP at the time of the study — suggesting a substantial willingness to contribute to Ghana financially, even among those who have left. The challenge is that this willingness is expressed through passive financial transfer rather than active investment and knowledge return, because the structured pathways for the latter do not exist at scale.</p>
            <p>The BRIDGE Diaspora Skills Matcher — one of six applications in the suite — directly addresses this gap. By providing a structured pathway from professional profile to specific contribution opportunity, it converts latent diaspora willingness into active, structured participation. The mechanism is information architecture: the tool does not create the desire to contribute, it creates the pathway through which that desire becomes productive. This is precisely the kind of system-level information intervention that ecological systems theory predicts will produce outsized returns relative to its input cost.</p>
          </div>
        </div>

        {/* ── THEORETICAL FRAMEWORK ─────────────────────────────────────── */}
        <div id="theory">
          <div className="section-cover">
            <div className="section-cover-num">03</div>
            <div className="section-eyebrow">Theoretical Framework</div>
            <h2 className="section-h">Three scientific traditions that converge on the same intervention.</h2>
            <p className="section-sub">Information economics, development systems theory, and ecological thinking all point to the same conclusion: structured intelligence democratisation is the highest-leverage public benefit intervention in Ghana's current context.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <H3 c="1. Information economics (Akerlof, Stiglitz, Spence)"/>
            <p>The Nobel Prize-winning work on information asymmetry established that markets fail not from lack of resources but from lack of accurate, accessible information. Akerlof's (1970) 'market for lemons' demonstrated that information asymmetry causes market failure even when good products exist and willing buyers and sellers are present.<Cite n="11"/> Spence's (1973) signalling theory showed that the solution to adverse selection is the creation of credible signals — verifiable information that allows quality to be distinguished from mediocrity at low cost to the evaluator.<Cite n="28"/> The BRIDGE Impact Score™ is precisely such a signal: a structured, standardised, methodology-grounded quality indicator that allows investors, partners, and development institutions to distinguish venture quality without conducting bespoke due diligence for every submission.</p>
            <p>Stiglitz and Weiss (1981) extended this framework to credit markets, demonstrating that information asymmetry between lenders and borrowers causes systematic credit rationing — lending less than the market would efficiently supply — even when borrowers are creditworthy.<Cite n="29"/> This is the precise mechanism producing Ghana's $5B+ SME financing gap. The intervention logic is clear: structured quality signals reduce information asymmetry, reduce lender uncertainty, and expand the credit supply to ventures that merit it.</p>
            <H3 c="2. Development systems theory (Brookings, World Bank, IFC)"/>
            <p>Contemporary development economics has moved decisively away from single-intervention models toward staged, tiered approaches that match support intensity to demonstrated merit. The World Bank's Financial Inclusion and Entrepreneurship Scaling (FInES) project in Malawi — the most rigorously evaluated example of this approach — demonstrated that filtering entrepreneurs through objective assessment before escalating support intensity significantly outperforms generic programmes on employment creation, business survival, and capital productivity.<Cite n="16"/> The key mechanism is assessment quality: the filter works because the assessment accurately distinguishes between ventures of different potential, allowing resources to be concentrated where they generate the highest returns.</p>
            <p>The Brookings Institution's analysis of Africa's entrepreneurship support ecosystem concluded that approximately $1 billion is spent annually on entrepreneurship training in developing countries with returns that fail to yield meaningful economic and social impacts — not because training is without value, but because generic training without quality filtering systematically reaches a mix of ventures whose average potential is far below what targeted, merit-assessed programmes achieve.<Cite n="2"/> BRIDGE's application addresses this misallocation directly: by providing a quality signal at zero cost to the venture, it enables every subsequent support resource — capital, mentorship, partnerships — to be concentrated on the ventures most likely to produce development outcomes.</p>
            <H3 c="3. Ecological systems thinking (complexity, resilience, emergence)"/>
            <p>Systems ecology studies how complex, adaptive systems develop resilience through diversity, redundancy, and information flow. Healthy ecosystems maintain stability not through centralised control but through distributed, responsive information networks that allow components to adapt to changing conditions. Economic ecosystems that lack information flow — where entrepreneurs cannot signal quality, investors cannot assess risk, and communities cannot articulate needs — behave like ecologically stressed environments: brittle, inequitable, prone to boom-bust cycles, and resistant to recovery from shocks.</p>
            <p>The 2025 grain glut in Ghana — where a production increase produced a food security crisis because the information infrastructure to connect surplus to demand did not exist — is a textbook ecological systems failure: a system with no negative feedback loops, no distributed intelligence, and no adaptive capacity.<Cite n="19"/> The BRIDGE Impact Score™ Assessor is, in ecological terms, a distributed intelligence node — a mechanism that generates structured information at the point where decisions are made, allowing the broader system to allocate resources more efficiently and respond more adaptively to changing conditions.</p>
            <PQ c="In complex systems, the highest-leverage interventions are those that improve information flow. When information moves freely and accurately between nodes, systems self-organise toward more efficient, equitable, and resilient states. This is not ideology. It is systems science."/>
          </div>
        </div>

        {/* ── INTERVENTION LOGIC ────────────────────────────────────────── */}
        <div id="intervention" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow c="The Intervention"/>
            <Rule/>
            <H2 c="How BRIDGE addresses each documented gap — specifically."/>
            <p>The four gaps documented in Part I are not incidentally related to the BRIDGE Applications Suite. The suite was designed with direct reference to each gap, with specific applications and mechanisms targeted at each documented failure mode.</p>

            <div className="gap-diagram">
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>Gap-to-intervention mapping</div>
              {[
                ['Capital Gap','→','Impact Score Assessor produces a credible quality signal that reduces information asymmetry between entrepreneurs and capital providers, enabling merit-based allocation'],
                ['Intelligence Gap','→','Free, structured assessment democratises access to evaluation infrastructure previously gatekept by cost and network access'],
                ['Ecological/Systems Gap','→','Sector intelligence and P&P Community Survey create distributed market information that improves system-wide coordination across value chains'],
                ['Brain Drain Paradox','→','Diaspora Skills Matcher creates structured pathways that convert latent diaspora willingness into active, productive contribution'],
              ].map(([g,a,s],i)=>(
                <div key={i} style={{display:'grid',gridTemplateColumns:'180px 28px 1fr',gap:0,alignItems:'stretch',marginBottom:'8px'}}>
                  <div style={{background:C.forest,color:C.lime,padding:'12px 14px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,lineHeight:1.35}}>{g}</div>
                  <div style={{background:C.lime,display:'flex',alignItems:'center',justifyContent:'center',color:C.ink,fontSize:'12px',fontWeight:900}}>→</div>
                  <div style={{background:C.paperDark,border:`1px solid ${C.border}`,padding:'12px 14px',fontFamily:F.body,fontSize:'13px',color:C.ink,lineHeight:1.55}}>{s}</div>
                </div>
              ))}
            </div>

            <H3 c="The free entry principle — a public benefit commitment"/>
            <p>The decision to make the BRIDGE Impact Score™ Assessor free at the entry tier is not a commercial strategy. It is a public benefit commitment grounded in the evidence that cost gatekeeping is itself a mechanism of inequality. When assessment is priced, it filters on wealth rather than quality. The best-resourced ventures get assessed; the highest-potential ventures that lack resources do not. By making the assessment free, BRIDGE removes wealth as a condition of access — ensuring that the quality signal is available to any entrepreneur with an idea, regardless of their financial position, geographic location, or institutional connections.</p>
            <p>This is precisely what it means to operate as a Public Benefit Corporation. The PBC structure creates a legally enforceable obligation to serve the public good — not merely to avoid harm, but to actively generate benefit. The free assessment tier is the clearest expression of that obligation in the Applications Suite: an unconditional public good, available to any Ghanaian entrepreneur, funded by the paid tiers that serve those who can afford to pay for deeper intelligence.</p>
          </div>
        </div>

        {/* ── THE APPLICATION ───────────────────────────────────────────── */}
        <div id="app">
          <div className="section-cover">
            <div className="section-cover-num">04</div>
            <div className="section-eyebrow">The Solution</div>
            <h2 className="section-h">The BRIDGE Impact Score™ Assessor:<br/>Architecture, methodology, and scientific grounding.</h2>
            <p className="section-sub">The application is not a scoring tool with a public benefit story appended. It is a public benefit intervention built on a scoring methodology. The distinction matters enormously.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <H3 c="The Peace & Prosperity framework"/>
            <p>The BRIDGE Impact Score™ methodology was developed over two years in direct reference to Ghana's Peace &amp; Prosperity framework — a four-dimensional assessment rooted in the lived priorities of Ghanaian communities as documented through primary research. The framework evaluates: <strong>Peace &amp; Prosperity Alignment</strong> (30 points) — whether the venture improves individual dignity, family security, and community thriving; <strong>Local Asset Integration</strong> (25 points) — whether it builds on local capacity, strengthens existing institutions, and has community endorsement; <strong>Community Participation</strong> (20 points) — whether beneficiaries are involved in governance, not just service receipt; and <strong>Feasibility &amp; Sustainability</strong> (25 points) — whether the model is financially viable and locally sustained without indefinite external support.</p>
            <p>This is not a generic impact assessment tool adapted to Ghana. It is a Ghana-first framework that was built from Ghanaian community evidence upward — meaning that the criteria reflect what Ghanaian citizens have documented as their priorities, not what external development frameworks project those priorities to be. The Peace &amp; Prosperity framework is the methodological foundation that distinguishes BRIDGE's assessment from commercially-oriented scoring tools and from generic development assessment rubrics.</p>

            <H3 c="AI-powered personalisation at scale"/>
            <p>The integration of Claude — Anthropic's AI — into the narrative generation layer solves a specific public benefit challenge: how to provide expert-quality, contextually specific feedback to every user at zero marginal cost. The alternative to AI-generated narrative — human analyst review — would either require significant per-assessment cost (reproducing the access barrier the tool is designed to remove) or would be so generic as to be unhelpful. The AI layer allows the application to generate a three-sentence analyst narrative that references the user's specific venture, sector, and region — the kind of feedback that previously required either network access to a knowledgeable mentor or the resources to pay for a consultant.</p>
            <p>This is a meaningful public benefit innovation. Research consistently shows that actionable, specific feedback is significantly more effective at improving venture quality than generic ratings or scores. The mechanism through which the BRIDGE Assessor improves Ghana's venture ecosystem is not simply the score itself — it is the combination of score, narrative, and actionable recommendation that allows entrepreneurs to understand specifically what needs to change and take concrete next steps toward addressing it.</p>
          </div>
        </div>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
        <div id="mechanism" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow c="Mechanism of Action"/>
            <Rule/>
            <H2 c="From submission to system change: the causal pathway."/>
            <p>Public benefit claims require causal specificity. It is insufficient to assert that an assessment tool produces positive outcomes — the mechanism through which it does so must be demonstrable and falsifiable. BRIDGE documents four distinct causal pathways through which the Impact Score Assessor produces public benefit.</p>
            <H3 c="Pathway 1 — Direct entrepreneur improvement"/>
            <p>An entrepreneur who submits a venture and receives a score below the Strong threshold (65+) along with specific gap analysis receives directly actionable information about what needs to change. Research by Brookings demonstrates that structured, staged assessment with quality-calibrated feedback significantly improves venture development outcomes relative to generic support.<Cite n="16"/> The application creates this pathway at zero cost for any entrepreneur with internet access.</p>
            <H3 c="Pathway 2 — Capital flow improvement"/>
            <p>High-scoring ventures (65+) trigger proactive BRIDGE outreach and network introductions. This creates a structured pipeline from the application to BRIDGE's investment process — ensuring that the highest-quality ventures discovered through the application enter the capital allocation system, rather than remaining unknown to it. This is the 'node-scarce' problem that MIT Sloan's Ghana analysis identified<Cite n="15"/> — good ventures exist, but the discovery infrastructure does not. The application is that infrastructure.</p>
            <H3 c="Pathway 3 — Market intelligence generation"/>
            <p>Aggregate submission data — anonymised and structured — reveals patterns in Ghana's venture ecosystem that no other data source provides: which sectors are generating the most entrepreneurial activity, which regions are underserved by capital, which venture models are consistently scoring below threshold and for what reasons. This dataset, accumulated across thousands of submissions, becomes a public benefit asset in its own right — informing government policy, development finance institution strategy, and academic research in ways that benefit the entire ecosystem.</p>
            <H3 c="Pathway 4 — Systemic quality uplift"/>
            <p>When entrepreneurs across Ghana receive structured feedback on what a strong venture looks like from a community impact perspective — not just a financial returns perspective — the quality baseline of the entrepreneurial ecosystem rises. The Peace &amp; Prosperity framework, deployed at scale through a free public tool, becomes a shared standard of venture quality that shapes how Ghana's entrepreneurs think about impact, community participation, and sustainability. This is the systemic change pathway: not changing individual ventures, but changing the norms against which all ventures are evaluated.</p>
          </div>
        </div>

        {/* ── MEASURABLE PUBLIC BENEFIT ─────────────────────────────────── */}
        <div id="impact">
          <div className="section-cover">
            <div className="section-cover-num">05</div>
            <div className="section-eyebrow">Public Benefit Statement</div>
            <h2 className="section-h">Measurable outcomes. Accountable commitments.</h2>
            <p className="section-sub">BRIDGE PBC commits to measuring and publicly reporting the following public benefit outcomes from the Impact Score Assessor on an annual basis.</p>
          </div>
          <div className="body-pad" style={{background:C.ink}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}} className="tc">
              {[
                {n:'Free assessments delivered','metric':'Cumulative count — target 5,000 in Year 1','why':'Measures democratic access — the number of entrepreneurs who received structured feedback they could not otherwise afford'},
                {n:'Geographic distribution','metric':'% of submissions from outside Greater Accra','why':'Measures equity of access — whether the tool reaches entrepreneurs in regions historically underserved by development infrastructure'},
                {n:'Score improvement on resubmission','metric':'Average score change for ventures that resubmit after receiving gap analysis','why':'Measures direct learning impact — whether the feedback is genuinely actionable and improving venture quality'},
                {n:'High-score pipeline rate','metric':'% of 65+ scoring ventures that enter BRIDGE network or receive capital introduction','why':'Measures conversion from intelligence to impact — whether quality discovery actually produces capital flow improvement'},
                {n:'Sector intelligence quality','metric':'Coverage of all 12 sectors in aggregate submission data, updated quarterly','why':'Measures ecosystem intelligence contribution — whether the dataset is sufficiently comprehensive to inform policy and investment decisions'},
                {n:'Gender and inclusion tracking','metric':'% of submissions from women-led ventures and rural entrepreneurs','why':'Research shows women-led Ghanaian SMEs face a 20% lower probability of accessing formal financing<Cite n={7}/> — the tool should actively close, not maintain, this gap'},
              ].map((c,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',padding:'20px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.lime,marginBottom:'8px',lineHeight:1.3}}>{c.n}</div>
                  <div style={{fontFamily:F.mono,fontSize:'11px',color:'rgba(250,248,243,.5)',marginBottom:'10px',lineHeight:1.5}}>{c.metric}</div>
                  <div style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,.6)',lineHeight:1.6,fontStyle:'italic'}}>{c.why}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:'32px',background:'rgba(184,217,53,.08)',border:'1px solid rgba(184,217,53,.2)',padding:'22px 26px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'10px'}}>Public Benefit Corporation Commitment</div>
              <p style={{fontFamily:F.body,fontSize:'15px',color:'rgba(250,248,243,.75)',lineHeight:1.75,marginBottom:0}}>BRIDGE PBC commits to publishing an annual Public Benefit Report documenting performance against all six metrics above. The report will be publicly available at bridgepbc.com and submitted to relevant Ghanaian government agencies and development partners. Where metrics fall below targets, the report will include a documented corrective action plan. This commitment is made as a condition of BRIDGE's PBC status and is not contingent on commercial performance.</p>
            </div>
          </div>
        </div>

        {/* ── CONCLUSION ────────────────────────────────────────────────── */}
        <div id="conclusion" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow c="Conclusion"/>
            <Rule/>
            <H2 c="The gap is real. The tool is ready. The public benefit is demonstrable."/>
            <p>This whitepaper has presented evidence across four compounding dimensions of Ghana's development intelligence crisis: the capital gap documented by the World Bank, the IFC, and peer-reviewed economic research; the information asymmetry gap grounded in Nobel Prize-winning economic theory and field research from MIT Sloan and the Brookings Institution; the ecological systems gap illustrated by Ghana's food security paradox and the systems science of complex adaptive networks; and the brain drain paradox documented across healthcare research, migration economics, and development finance literature.</p>
            <p>The convergence of these four bodies of evidence points to a single, specific conclusion: the highest-leverage public benefit intervention available in Ghana's current development context is a structured, democratised, contextually specific intelligence tool that makes venture quality legible to capital providers, makes development opportunities legible to investors and diaspora, and makes community needs legible to policymakers and support systems.</p>
            <p>The BRIDGE Impact Score™ Assessor is that tool. It is grounded in a methodology developed over two years of primary research in Ghana's communities. It is free at the entry point — unconditionally, as a public benefit commitment, not as a commercial strategy. It generates a quality signal that reduces information asymmetry between entrepreneurs and capital in exactly the way that information economics identifies as the primary mechanism for closing credit rationing gaps. And it is designed, architecturally, to improve the information environment of the entire Ghanaian venture ecosystem — not by replacing existing institutions, but by providing the intelligence infrastructure that allows those institutions to function closer to their potential.</p>
            <PQ c="This is what it means to build for public benefit: not to design a product and append a social mission, but to identify the structural conditions preventing human flourishing — and build exactly the tool that addresses those conditions at the scale and accessibility level required to make a difference."/>
            <p>The gap is documented. The science is clear. The tool is built. The public benefit is not aspirational — it is the specific, measurable, accountable outcome of a design process that began with Ghana's communities and ends with their flourishing.</p>
          </div>
        </div>

        {/* ── REFERENCES ────────────────────────────────────────────────── */}
        <div id="references" className="footnotes">
          <div className="fn-title">References &amp; Sources</div>
          {[
            'CediRates. (2025, December). Leveraging advisory services to bridge the SMEs funding gap in Ghana. CediRates.com. Retrieved March 2026.',
            'Brookings Institution. (2024). Entrepreneurship and structural transformation. Foresight Africa 2024. Brookings.edu.',
            'Quartey, P., Turkson, E., Abor, J.Y., & Iddrisu, A.M. (2017). Financing the growth of SMEs in Africa: What are the contraints to SME financing within ECOWAS? Review of Development Finance.',
            'World Bank. (2023). Enterprise Survey Ghana. Washington DC: World Bank Group.',
            'Stanbic Bank Ghana. (2024, September). Bridging the finance gap for SMEs as a pathway to sustainable growth. Stanbicbank.com.gh.',
            'SME Finance Forum. (2024). Ghana country profile. Smefinanceforum.org.',
            'British International Investment. (2024). BII Ghana SME Finance Report. London: BII.',
            'The Business & Financial Times. (2025, July). Bridging the financing gap: Why SMEs need an alternative. Thebftonline.com.',
            'CediRates. (2025). Ghana SME financing environment analysis. CediRates.com.',
            'Akpan, E.A., et al. (2024). Influence of financial constraints on the performance of SMEs in Ghana. Journal of African Business.',
            'Akerlof, G.A. (1970). The market for lemons: Quality uncertainty and the market mechanism. The Quarterly Journal of Economics, 84(3), 488–500.',
            'Saeedikiya, M., et al. (2025). Empowering the underprivileged: how does information accessibility affect their entrepreneurship? Humanities and Social Sciences Communications. Nature.com.',
            'Making Finance Work for Africa. (2024). Elite networks and venture capital flows in Africa. MFW4A.org.',
            'Clyde & Co. (2025, June). Africa\'s investment puzzle: What\'s holding back PE and VC? Clydeco.com.',
            'MIT Kuo Sharper Center. (2026, January). Inside Ghana\'s SME economy: Opportunity, constraint, and scale. MITSloan.edu.',
            'Brookings Institution. (2022, March). Funneling support to promising enterprises in developing countries. Brookings.edu.',
            'Mordor Intelligence. (2026). Ghana agriculture market size & share analysis. Mordorintelligence.com.',
            'IMANI Africa. (2025, October). Ghana\'s rising food insecurity — a wake-up call. IMANIAfrica.org.',
            'IMANI Africa. (2025, October). Food glut in Ghana: When production outpaces market planning. IMANIAfrica.org.',
            'Food Security Portal / IFPRI. (2024). Leveraging the potential of Ghana\'s food system. SSA.foodsecurityportal.org.',
            'Graphic Online. (2025, December). Addressing post-harvest losses: stakeholders call for deliberate investment. Graphic.com.gh.',
            'Wilson Center. (2024). Africa\'s healthworker brain drain. Wilsoncenter.org.',
            'Ibid.',
            'Ibrahim, M.M. et al. (2024). Determinants and mitigating factors of brain drain among Ghanaian nurses. Journal of Nursing Management, 2024, 8862991.',
            'PMC. (2017). Stemming the impact of health professional brain drain from Africa. PMC5345423.',
            'Ghana Statistical Service. (2024). Ghana demographic and migration report. Accra: GSS.',
            'Innovations for Poverty Action. (2024). The economic consequences of brain drain from Ghana, Tonga, Micronesia, Papua New Guinea, and New Zealand. poverty-action.org.',
            'Spence, A.M. (1973). Job market signalling. The Quarterly Journal of Economics, 87(3), 355–374.',
            'Stiglitz, J.E. & Weiss, A. (1981). Credit rationing in markets with imperfect information. The American Economic Review, 71(3), 393–410.',
          ].map((r,i)=>(
            <div key={i} className="fn-item" data-n={`${i+1}.`}>{r}</div>
          ))}
        </div>

        {/* ── FOOTER ────────────────────────────────────────────────────── */}
        <div className="doc-footer np">
          <Logo height={16} variant="white"/>
          <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,.3)'}}>Public Benefit Whitepaper · BRIDGE PBC · Confidential · March 2026</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,.3)'}}>bridgepbc.com</span>
        </div>

      </div>
    </div>
  );
}
