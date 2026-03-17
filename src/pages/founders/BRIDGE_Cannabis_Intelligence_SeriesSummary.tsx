import { useState, useEffect, useRef } from "react";
import { DOC_COLORS as C, DOC_FONTS as F } from "@/lib/document-tokens";
import DocumentGlobalStyles from "@/components/documents/DocumentGlobalStyles";
import DocumentLogo from "@/components/documents/DocumentLogo";

// ─── EXTRA PAGE-SPECIFIC STYLES (beyond shared DocumentGlobalStyles) ─────────
const EXTRA_CSS = `
  body{background:${C.ink};text-rendering:optimizeLegibility;}
  .dc::first-letter{color:${C.lime};}
  .np{print-color-adjust:exact;-webkit-print-color-adjust:exact;}
  .chain-scroll{gap:0;}
  .chain-scroll::-webkit-scrollbar{height:2px;}
  .chain-scroll::-webkit-scrollbar-track{background:rgba(255,255,255,0.04);}
  .chain-scroll::-webkit-scrollbar-thumb{background:${C.lime};}
  @media print{body{background:${C.paper};}}
  @media(max-width:1000px){
    .pad-section{padding:56px 40px!important;}
    .pad-cover{padding:0 40px!important;}
    .pad-bar{padding:10px 32px!important;}
    .pad-gate{padding:56px 40px 48px!important;}
    .pad-footer{padding:14px 40px!important;}
    .tc3{grid-template-columns:1fr 1fr!important;}
  }
  @media(max-width:640px){
    .pad-section{padding:32px 18px!important;}
    .pad-cover{padding:0 18px!important;}
    .pad-bar{padding:10px 18px!important;}
    .pad-gate{padding:32px 18px 24px!important;}
    .pad-footer{padding:14px 18px!important;}
    .mob-show-flex{display:flex!important;}
    .mob-grid-stack{grid-template-columns:1fr!important;}
    .mob-grid-2{grid-template-columns:1fr 1fr!important;}
    .mob-no-sticky{position:static!important;}
    .mob-no-border-left{border-left:none!important;padding-left:0!important;}
    .tc{overflow-x:auto;display:block;-webkit-overflow-scrolling:touch;}
    .tc3{grid-template-columns:1fr!important;}
    .dc::first-letter{font-size:2.8em!important;}
    .mob-btn-touch{min-height:48px!important;}
    .mob-toggle-hdr{border-color:rgba(255,255,255,0.1)!important;background:rgba(255,255,255,0.04)!important;
      color:rgba(250,248,243,0.4)!important;padding:10px 16px!important;}
    .mob-sec-toggle{padding:16px 18px;background:rgba(255,255,255,0.07);}
    .mob-carousel>.mob-card{flex:0 0 88%;}
    .gate-cta-row a{justify-content:center!important;min-height:52px!important;}
    .stats-cell{flex:0 0 50%!important;border-right:none!important;border-bottom:1px solid rgba(255,255,255,0.07)!important;padding:16px 14px!important;}
    .stats-cell:nth-child(odd){border-right:1px solid rgba(255,255,255,0.07)!important;}
    .stats-cell:last-child{flex:0 0 100%!important;border-right:none!important;}
    .key-cell{border-right:none!important;border-bottom:2px solid ${C.ink}!important;}
    .key-cell:nth-child(odd){border-right:2px solid ${C.ink}!important;}
    .key-num{font-size:28px!important;}
    .cover-inner{padding-top:28px!important;}
    .cover-logo-row{margin-bottom:16px!important;}
    .cover-spacer{height:24px!important;}
    .stat-divider{margin-top:24px!important;}
    .cover-border-top{padding-top:20px!important;}
    .entry-phase-grid{grid-template-columns:1fr!important;}
    .topbar-cta{min-height:44px!important;padding:0 16px!important;display:inline-flex!important;align-items:center!important;}
    .cover-badges{display:none!important;}
    .gate-cta-block-mob{display:block!important;}
    .gate-lic-list-mob{order:3!important;}
    .cover-quote-text{font-size:14px!important;line-height:1.65!important;}
    .exec-para-hide{display:none!important;}
    .exec-para-show .exec-para-hide{display:block!important;}
    .vc-grid{overflow-x:auto;display:flex!important;gap:2px;}
    .vc-grid>div{flex:0 0 75%;min-width:200px;}
    .cover-h1{letter-spacing:-1px!important;}
    .phase-card{padding:16px!important;}
    .entry-seq{padding:22px 18px!important;margin-top:28px!important;}
    .score-table-wrap{display:none!important;}
    .score-card-list{display:flex!important;flex-direction:column;}
    .exec-grid{display:flex!important;flex-direction:column-reverse!important;gap:22px!important;}
    .themes-grid-desk{display:none!important;}
  }
`;

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const SectionRule = ({light=false}) => (
  <div style={{borderTop:`6px solid ${light?C.paper:C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
);

const Eyebrow = ({children, light=false}) => (
  <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:light?'rgba(250,248,243,0.4)':C.muted,marginBottom:'8px'}}>{children}</div>
);

const ScoreBar = ({label, value, weight, onDark}) => (
  <div style={{marginBottom:'10px'}}>
    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',gap:'8px'}}>
      <span style={{fontFamily:F.sans,fontSize:'10px',color:onDark?'rgba(250,248,243,0.4)':C.muted,flex:1}}>{label}</span>
      {weight && <span style={{fontFamily:F.mono,fontSize:'9px',color:onDark?'rgba(250,248,243,0.25)':C.faint,flexShrink:0}}>{weight}</span>}
      <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:onDark?C.lime:C.forest,flexShrink:0}}>{value}</span>
    </div>
    <div style={{height:'3px',background:onDark?'rgba(255,255,255,0.08)':C.border,borderRadius:'2px',overflow:'hidden'}}>
      <div style={{height:'100%',width:`${value}%`,background:C.lime,borderRadius:'2px'}}/>
    </div>
  </div>
);

// ─── MOBILE CAROUSEL ─────────────────────────────────────────────────────────
const MobCarousel = ({items, renderCard, onDark=false}) => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const handleScroll = () => {
    if (!ref.current) return;
    const cardW = ref.current.offsetWidth * 0.88 + 12;
    const idx = Math.round(ref.current.scrollLeft / cardW);
    setActive(Math.max(0, Math.min(idx, items.length-1)));
  };
  const goTo = i => {
    if (!ref.current) return;
    const cardW = ref.current.offsetWidth * 0.88 + 12;
    ref.current.scrollTo({left: i*cardW, behavior:'smooth'});
    setActive(i);
  };
  return (
    <div className="mob-show" style={{display:'none',marginTop:'16px'}}>
      <div className="mob-carousel" ref={ref} onScroll={handleScroll}>
        {items.map((item,i) => (
          <div key={i} className="mob-card">{renderCard(item,i)}</div>
        ))}
      </div>
      <div style={{display:'flex',gap:'6px',justifyContent:'center',marginTop:'14px'}}>
        {items.map((_,i) => (
          <div key={i} onClick={()=>goTo(i)} style={{width:i===active?'24px':'8px',height:'8px',borderRadius:'4px',background:i===active?C.lime:(onDark?'rgba(255,255,255,0.2)':C.border),cursor:'pointer',transition:'all 0.3s ease'}}/>
        ))}
      </div>
    </div>
  );
};

// ─── MOBILE SECTION COLLAPSE ──────────────────────────────────────────────────
const MobileCollapse = ({num,title,stat,label,defaultOpen=false,onDark=false,children}) => {
  const [open,setOpen] = useState(defaultOpen);
  return (
    <>
      <button className={`mob-show mob-sec-toggle${onDark?'':' mob-sec-toggle-light'}`}
        style={{display:'none',minHeight:'52px'}} onClick={()=>setOpen(o=>!o)}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'3px',height:'32px',background:open?C.lime:'transparent',flexShrink:0,transition:'background 0.2s'}}/>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px',flexShrink:0}}>{num}</span>
          <span style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:onDark?C.paper:C.ink,lineHeight:1.2}}>{title}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'10px',flexShrink:0}}>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:onDark?C.lime:C.forest,lineHeight:1}}>{stat}</div>
            <div style={{fontFamily:F.sans,fontSize:'8px',color:onDark?'rgba(250,248,243,0.35)':C.faint,letterSpacing:'0.8px',marginTop:'2px'}}>{label}</div>
          </div>
          <span style={{fontFamily:F.mono,fontSize:'14px',color:onDark?'rgba(250,248,243,0.3)':C.muted,transition:'transform 0.25s ease',transform:open?'rotate(180deg)':'rotate(0deg)',display:'inline-block'}}>↓</span>
        </div>
      </button>
      <div className={open?'':'mob-sec-collapsed'}>{children}</div>
    </>
  );
};

// ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  {id:'s01',num:'§ I',title:'Introduction'},
  {id:'s02',num:'§ II',title:'All 11 Licences'},
  {id:'s03',num:'§ III',title:'Score Breakdown'},
  {id:'s04',num:'§ IV',title:'Strategic Themes'},
  {id:'s05',num:'§ V',title:'Value Chain'},
  {id:'s06',num:'§ VI',title:'Key Numbers'},
  {id:'s07',num:'§ VII',title:'Series Risks'},
  {id:'s08',num:'§ VIII',title:'Access'},
];

const MobileNav = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observers = NAV_SECTIONS.map((s,i) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) setActive(i);
      }, {rootMargin:'-30% 0px -60% 0px', threshold:0});
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o=>o?.disconnect());
  }, []);
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
  const cur = NAV_SECTIONS[active];
  return (
    <div className="mob-show np" style={{display:'none',position:'fixed',bottom:0,left:0,right:0,zIndex:300,background:C.ink,borderTop:`2px solid ${C.lime}`,padding:'10px 14px 12px',boxShadow:'0 -4px 32px rgba(0,0,0,0.6)'}}>
      {/* Active section pill */}
      <div style={{display:'flex',justifyContent:'center',marginBottom:'9px'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.06)',padding:'4px 12px',borderRadius:'2px'}}>
          <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>{cur.num}</span>
          <span style={{width:'1px',height:'10px',background:'rgba(250,248,243,0.15)',flexShrink:0}}/>
          <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:600,color:'rgba(250,248,243,0.5)',letterSpacing:'0.5px'}}>{cur.title}</span>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
        <button onClick={()=>active>0&&scrollTo(NAV_SECTIONS[active-1].id)}
          style={{background:'transparent',border:`1px solid rgba(255,255,255,${active>0?'0.2':'0.06'})`,color:`rgba(250,248,243,${active>0?'0.8':'0.2'})`,padding:'0 16px',fontFamily:F.sans,fontSize:'13px',fontWeight:700,cursor:active>0?'pointer':'default',flexShrink:0,minHeight:'44px',display:'flex',alignItems:'center',justifyContent:'center'}}>
          ←
        </button>
        <div style={{flex:1,display:'flex',gap:'5px',justifyContent:'center',alignItems:'center'}}>
          {NAV_SECTIONS.map((_,i) => (
            <div key={i} onClick={()=>scrollTo(NAV_SECTIONS[i].id)} style={{width:i===active?'22px':'6px',height:'6px',borderRadius:'3px',background:i===active?C.lime:'rgba(255,255,255,0.2)',cursor:'pointer',transition:'all 0.3s ease',flexShrink:0}}/>
          ))}
        </div>
        {active < NAV_SECTIONS.length-1
          ? <button onClick={()=>scrollTo(NAV_SECTIONS[active+1].id)}
              style={{background:C.forest,border:'none',color:C.lime,padding:'0 16px',fontFamily:F.sans,fontSize:'13px',fontWeight:700,cursor:'pointer',flexShrink:0,minHeight:'44px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              →
            </button>
          : <a href="#" style={{background:C.lime,color:C.ink,padding:'0 16px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,textDecoration:'none',letterSpacing:'1px',flexShrink:0,minHeight:'44px',display:'flex',alignItems:'center',justifyContent:'center'}}>ENGAGE →</a>
        }
      </div>
    </div>
  );
};

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
const TopBar = ({coverLogoRef}) => {
  const [past, setPast] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (coverLogoRef?.current) {
        setPast(coverLogoRef.current.getBoundingClientRect().bottom < 0);
      }
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total>0 ? Math.min(100,(el.scrollTop/total)*100) : 0);
    };
    window.addEventListener('scroll', fn, {passive:true});
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div className="np pad-bar" style={{position:'sticky',top:0,zIndex:200,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.07)',overflow:'hidden'}}>
      <div className="progress-bar" style={{width:`${progress}%`}}/>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'220px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <DocumentLogo height={20} variant="dark"/>
          <div style={{width:'1px',height:'16px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>Ghana Cannabis Intelligence &nbsp;·&nbsp; Complete Series &nbsp;·&nbsp; Members Brief</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest,letterSpacing:'0.5px'}}>Cannabis Series</span>
      </div>
      <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
        <div className="mob-hide" style={{background:C.lime,color:C.ink,padding:'4px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase'}}>MEMBERS BRIEF</div>
        <a href="#" className="topbar-cta" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px'}}>Engage BRIDGE →</a>
      </div>
    </div>
  );
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LICENCES = [
  {n:'01',name:'Cultivation',tag:'UPSTREAM',tier:'CORE',score:72,market:72,impact:85,feasibility:60,sustainability:64,window:'Now',entry:'$20K–200K',
   thesis:'Every other licence depends on cultivation output. First to secure processing relationships defines the supply architecture for years.',
   moat:'Processing relationship + certified supply base'},
  {n:'02',name:'Processing',tag:'MID-CHAIN',tier:'CORE',score:78,market:82,impact:80,feasibility:70,sustainability:76,window:'Now',entry:'$80K–1.2M',
   thesis:'The value multiplier. Biomass at $1/kg becomes CBD oil at $8–25/litre. GMP certification is the lasting competitive barrier.',
   moat:'GMP certification + processing network'},
  {n:'03',name:'Breeding & Seed',tag:'UPSTREAM',tier:'EMERGING',score:64,market:58,impact:72,feasibility:58,sustainability:68,window:'Q3 2026',entry:'$30K–300K',
   thesis:'Zero domestic certified seed. Ghana needs climate-adaptive tropical varieties. CSIR and KNUST are natural institutional partners.',
   moat:'First certified Ghanaian tropical hemp variety'},
  {n:'04',name:'R&D',tag:'SPECIALIST',tier:'EMERGING',score:60,market:52,impact:74,feasibility:56,sustainability:60,window:'2027+',entry:'$50K–500K',
   thesis:'Lowest market score, highest-impact per dollar. Ghana academic infrastructure — Noguchi, KNUST, UG — is regionally unmatched.',
   moat:'IP development + institutional partnerships'},
  {n:'05',name:'Testing Laboratory',tag:'ENABLING',tier:'CORE',score:75,market:80,impact:68,feasibility:72,sustainability:82,window:'Now',entry:'$120K–600K',
   thesis:'Mandatory for every other licence. Zero licensed cannabis labs in Ghana. ISO 17025 COA required for every export, every dispensing lot.',
   moat:'ISO 17025 + GNAS accreditation'},
  {n:'06',name:'Storage',tag:'ENABLING',tier:'EMERGING',score:67,market:62,impact:58,feasibility:74,sustainability:72,window:'Now',entry:'$120K–900K',
   thesis:'Zero licensed cannabis storage. Every licence pair exchanging product needs compliant inventory buffer between harvest and market.',
   moat:'NCC approval + climate-control investment'},
  {n:'07',name:'Transportation',tag:'ENABLING',tier:'EMERGING',score:63,market:60,impact:55,feasibility:72,sustainability:68,window:'Now',entry:'$50K–600K',
   thesis:'Zero commodity risk. Zero licensed carriers. Every gram that moves between facilities requires a manifest and GPS-tracked vehicle.',
   moat:'NCC Licence 07 + GPS manifest system'},
  {n:'08',name:'Import',tag:'TRADE',tier:'CORE',score:70,market:72,impact:62,feasibility:72,sustainability:74,window:'Now',entry:'$30K–500K',
   thesis:'Ghana launches with zero domestic certified seed, no processing equipment, no pharmaceutical APIs. Import owns the supply gateway.',
   moat:'Exclusive supplier agreements before sector scales'},
  {n:'09',name:'Export',tag:'TRADE',tier:'CORE',score:80,market:88,impact:76,feasibility:68,sustainability:82,window:'Now',entry:'$50K–3M',
   thesis:'Highest score in the series. EU-Ghana EPA + AGOA + UK DCTS simultaneously. Tema port. Zero West African competition.',
   moat:'Tema port + triple trade agreement coverage'},
  {n:'10',name:'Wholesale',tag:'MID-CHAIN',tier:'CORE',score:74,market:76,impact:68,feasibility:78,sustainability:72,window:'Now',entry:'$80K–1M',
   thesis:'The commercial engine capturing 15–30% of farmgate-to-market spread. Ghana has the strongest distribution ecosystem in West Africa.',
   moat:'First-mover supplier + buyer network'},
  {n:'11',name:'Dispensing',tag:'DOWNSTREAM',tier:'CORE',score:71,market:72,impact:82,feasibility:60,sustainability:68,window:'Now',entry:'$20K–300K',
   thesis:'2,000 pharmacies + 9,000+ LCS shops ready to activate. More pharmaceutical retail infrastructure than any African cannabis peer.',
   moat:'First licensed dispensary + prescriber network'},
];

// ─── COVER ────────────────────────────────────────────────────────────────────
const Cover = ({logoRef}) => (
  <div style={{background:C.ink,position:'relative',overflow:'hidden'}}>
    {/* Classified strip */}
    <div className="pad-bar" style={{background:C.lime,padding:'7px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px',flexWrap:'wrap'}}>
      <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2.5px',textTransform:'uppercase',color:C.ink}}>GHANA CANNABIS INTELLIGENCE — NCC LICENCE SERIES</span><span className="mob-show" style={{fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2.5px',textTransform:'uppercase',color:C.ink}}>GCI — NCC LICENCE SERIES</span>
      <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'8px',fontWeight:500,color:'rgba(13,26,16,0.6)',letterSpacing:'1px'}}>NCC Act 1019 · L.I. 2475 · March 2026</span>
    </div>

    {/* Watermark */}
    <div style={{position:'absolute',right:'-10px',top:'-10px',fontFamily:F.display,fontSize:'clamp(200px,38vw,560px)',fontWeight:900,color:'rgba(255,255,255,0.02)',pointerEvents:'none',userSelect:'none',letterSpacing:'-16px',lineHeight:1}}>11</div>

    {/* Headline */}
    <div className="pad-cover cover-inner" style={{paddingTop:'48px',paddingBottom:'0',maxWidth:'1100px',margin:'0 auto',position:'relative'}}>
      <div ref={logoRef} className="cover-logo-row" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'32px',flexWrap:'wrap',gap:'12px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <DocumentLogo height={28} variant="white"/>
          <div style={{width:'1px',height:'20px',background:'rgba(255,255,255,0.15)',flexShrink:0}}/>
          <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)'}}>Cannabis Intelligence Series</span>
        </div>
        <div className="cover-badges" style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          {['11-LICENCE SERIES','BRIDGE IMPACT SCORE™'].map((t,i)=>(
            <span key={i} style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.5)',border:'1px solid rgba(250,248,243,0.2)',padding:'3px 8px'}}>{t}</span>
          ))}
        </div>
      </div>

      <div className="cover-border-top" style={{borderTop:'1px solid rgba(250,248,243,0.1)',paddingTop:'36px'}}>
        <h1 className="cover-h1" style={{fontFamily:F.display,fontSize:'clamp(36px,8vw,96px)',fontWeight:900,color:C.paper,lineHeight:0.95,letterSpacing:'-3px',marginBottom:'28px'}}>
          The Complete<br/>
          <span style={{color:C.lime}}>Cannabis</span><br/>
          Intelligence<br/>
          Series
        </h1>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'20px',marginBottom:'0',maxWidth:'700px'}}>
          <p className="cover-quote-text" style={{fontFamily:F.display,fontSize:'clamp(15px,2vw,20px)',fontWeight:400,fontStyle:'italic',color:'rgba(250,248,243,0.78)',lineHeight:1.7}}>
            Ghana is the only West African country with a comprehensive, open cannabis licensing regime. The first licensed operator in each of the 11 categories captures an uncontested market from Day 1 — and that window is measured in months, not years.
          </p>
          <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.2)',marginTop:'10px'}}>BRIDGE PBC · Ghana Cannabis Intelligence Series · 2026</div>
        </div>
      </div>
    </div>

    {/* Stat strip */}
    <div className="stat-divider" style={{height:'1px',background:'rgba(250,248,243,0.08)',marginTop:'40px'}}/>
    <div className="pad-cover" style={{paddingTop:'0',paddingBottom:'0',maxWidth:'1100px',margin:'0 auto'}}>
      <div style={{display:'flex',flexWrap:'wrap'}}>
        {[
          {v:'11',   l:'Licence Categories',  s:'Full NCC value chain coverage'},
          {v:'80',   l:'Highest Score',        s:'Licence 09 · Export'},
          {v:'6/5',  l:'Core / Emerging',      s:'Immediate vs. long-horizon'},
          {v:'0',    l:'Licensed Operators',   s:'Ghana — March 2026'},
          {v:'$30B', l:'Global Market 2030',   s:'CAGR 17.5% from $6.5B'},
        ].map((s,i) => (
          <div key={i} className="stats-cell" style={{flex:'1 1 20%',minWidth:'140px',padding:'22px 20px',borderRight:i<4?`1px solid rgba(255,255,255,0.07)`:undefined,borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(22px,4vw,44px)',fontWeight:400,color:i===0?C.lime:i===1?C.lime:i===3?C.red:'#ffffff',lineHeight:0.9,marginBottom:'10px'}}>{s.v}</div>
            <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.55)',lineHeight:1.4,marginBottom:'4px'}}>{s.l}</div>
            <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.32)',lineHeight:1.4}}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="cover-spacer" style={{height:'56px'}}/>
  </div>
);

// ─── EXECUTIVE ────────────────────────────────────────────────────────────────
const Executive = () => {
  const [sdOpen, setSdOpen] = useState(false);
  const [bodyOpen, setBodyOpen] = useState(false);
  return (
    <div id="s01" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <MobileCollapse num="§ I" title="Series Introduction" stat="11" label="Licence Categories" defaultOpen={true}>
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ I</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Series Introduction</span>
        </div>
        <div className="exec-grid" style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:'56px',alignItems:'start'}}>
          <div className={bodyOpen ? "exec-body-wrap exec-para-show" : "exec-body-wrap"}>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.5vw,42px)',fontWeight:700,color:C.ink,lineHeight:1.08,marginBottom:'24px',letterSpacing:'-0.3px'}}>
              On 26 February 2026, Ghana launched the only comprehensive cannabis licensing regime in West Africa
            </h2>
            <p className="dc" style={{fontFamily:F.body,fontSize:'clamp(14px,1.5vw,16px)',fontWeight:300,lineHeight:1.9,color:C.ink,marginBottom:'18px'}}>
              Act 1019 (2020), reinstated by Act 1100 (2023), and operationalised through L.I. 2475, created 11 distinct licence categories spanning the full cannabis and industrial hemp value chain — from genetics to dispensing. No equivalent regime exists in West Africa. No licensed operator has entered any category as of March 2026.
            </p>
            {!bodyOpen && <button className="mob-show" onClick={()=>setBodyOpen(true)} style={{display:'none',background:'transparent',border:'none',borderBottom:`1px solid ${C.lime}`,width:'100%',padding:'10px 0',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,cursor:'pointer',textAlign:'left'}}>Read full context ↓</button>}
            <p className="exec-para-hide" style={{fontFamily:F.body,fontSize:'clamp(14px,1.5vw,16px)',fontWeight:300,lineHeight:1.9,color:C.ink,marginBottom:'18px'}}>
              This document presents the complete BRIDGE Cannabis Intelligence Series: comprehensive analysis of all 11 NCC licence categories, each scored across four weighted dimensions — Market Opportunity, Development Impact, Implementation Feasibility, and Financial Sustainability. Every licence assessed for entry capital, competitive moat, regulatory timeline, and structural advantage.
            </p>
            <p className="exec-para-hide" style={{fontFamily:F.body,fontSize:'clamp(14px,1.5vw,16px)',fontWeight:300,lineHeight:1.9,color:C.ink,marginBottom:'28px'}}>
              The central finding: Ghana enters the African cannabis economy with structural advantages that peer countries cannot replicate. Export scores 80 — the highest in the series — driven by EU-Ghana EPA duty-free access, AGOA, UK DCTS, and Tema port, simultaneously. Dispensing can activate 2,000 pharmacies and 9,000+ licensed chemical seller shops — more pharmaceutical retail density than any African cannabis peer.
            </p>
            <div className="exec-para-hide" style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'20px',background:'rgba(184,217,53,0.04)',padding:'18px 20px',marginTop:'8px'}}>
              <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:400,fontStyle:'italic',color:C.forest,lineHeight:1.75}}>
                The competitive dynamic in Ghana cannabis is not the displacement of incumbents — it is the occupation of entirely unoccupied positions. Zero competition. Zero incumbents. That window is open now.
              </p>
            </div>
          </div>

          {/* Score panel */}
          <div className="mob-no-sticky" style={{position:'sticky',top:'64px'}}>
            {/* Score header — tap to expand on mobile */}
            <button className="mob-toggle mob-toggle-hdr" onClick={()=>setSdOpen(o=>!o)}
              style={{width:'100%',background:C.ink,padding:'16px 20px',border:'none',cursor:'pointer',textAlign:'left',display:'block'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'4px'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>BRIDGE Impact Score™ — All 11</span>
                <span className="mob-show" style={{display:'none',fontSize:'12px',color:'rgba(184,217,53,0.5)',transition:'transform 0.2s',transform:sdOpen?'rotate(180deg)':'none'}}>↓</span>
              </div>
            </button>
            <div style={{background:C.ink,padding:'0 20px 16px'}}>
              {LICENCES.map((lic,i) => (
                <div key={i} className={i>=3?(sdOpen?'':'mob-item-hidden'):''} style={{marginBottom:'9px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'3px'}}>
                    <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:lic.tier==='CORE'?C.paper:'rgba(250,248,243,0.5)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',flex:1,marginRight:'8px'}}>
                      <span style={{color:'rgba(250,248,243,0.28)',fontFamily:F.mono,fontSize:'9px',marginRight:'5px'}}>{lic.n}</span>{lic.name}
                    </span>
                    <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:lic.tier==='CORE'?C.lime:C.amber,flexShrink:0}}>{lic.score}</span>
                  </div>
                  <div style={{height:'2px',background:'rgba(255,255,255,0.06)'}}>
                    <div style={{height:'100%',width:`${lic.score}%`,background:lic.tier==='CORE'?C.lime:C.amber}}/>
                  </div>
                </div>
              ))}
              <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'12px',marginTop:'8px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',gap:'14px'}}>
                  {[{c:C.lime,l:'Core'},{c:C.amber,l:'Emerging'}].map((t,i)=>(
                    <div key={i} style={{display:'flex',gap:'5px',alignItems:'center'}}>
                      <div style={{width:'14px',height:'2px',background:t.c}}/>
                      <span style={{fontFamily:F.sans,fontSize:'8px',color:'rgba(250,248,243,0.3)',letterSpacing:'1px'}}>{t.l}</span>
                    </div>
                  ))}
                </div>
                <span style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(250,248,243,0.18)'}}>/ 100</span>
              </div>
            </div>
            <div className={sdOpen ? '' : 'mob-item-hidden'} style={{background:C.paperDark,padding:'14px 16px',border:`1px solid ${C.border}`,borderTop:'none'}}>
              <Eyebrow>Scoring Methodology</Eyebrow>
              {[['Market Opportunity','30%'],['Development Impact','30%'],['Impl. Feasibility','25%'],['Financial Sustainability','15%']].map(([d,w],i) => (
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:i<3?`1px solid ${C.border}`:'none'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:500,color:C.ink}}>{d}</span>
                  <span style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:C.forest}}>{w}</span>
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

// ─── LICENCE MATRIX ───────────────────────────────────────────────────────────
const LicenceMatrix = () => (
  <div id="s02" className="pad-section" style={{background:C.ink,padding:'56px 64px'}}>
    <div style={{maxWidth:'1100px',margin:'0 auto'}}>
      <MobileCollapse num="§ II" title="All 11 Licences" stat="11" label="Categories Analysed" onDark>
      <SectionRule light/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ II</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)',marginLeft:'6px'}}>Complete Licence Analysis</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.5vw,42px)',fontWeight:700,color:C.paper,lineHeight:1.1,marginBottom:'10px'}}>All 11 NCC Licence Categories</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.75,color:'rgba(250,248,243,0.5)',marginBottom:'36px',maxWidth:'580px'}}>Investment thesis, entry capital, and competitive moat for every position in the value chain.</p>

      {/* Desktop: 3-col grid */}
      <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'2px',background:'rgba(250,248,243,0.04)'}}>
        {LICENCES.map((lic,i) => (
          <div key={i} style={{background:C.ink,padding:'24px',borderTop:`3px solid ${lic.tier==='CORE'?C.lime:C.amber}`}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'14px'}}>
              <div>
                <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'6px',flexWrap:'wrap'}}>
                  <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:500,color:'rgba(250,248,243,0.22)',letterSpacing:'1px'}}>{lic.n}</span>
                  <span style={{fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:lic.tier==='CORE'?C.lime:C.amber,border:`1px solid ${lic.tier==='CORE'?C.lime:C.amber}`,padding:'1px 5px',opacity:0.85}}>{lic.tag}</span>
                </div>
                <div style={{fontFamily:F.display,fontSize:'19px',fontWeight:700,color:C.paper,lineHeight:1.1}}>{lic.name}</div>
              </div>
              <div style={{textAlign:'right',flexShrink:0,marginLeft:'8px'}}>
                <div style={{fontFamily:F.mono,fontSize:'38px',fontWeight:400,color:lic.tier==='CORE'?C.lime:C.amber,lineHeight:1}}>{lic.score}</div>
                <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(250,248,243,0.2)',marginTop:'2px'}}>{lic.tier}</div>
              </div>
            </div>
            <div style={{height:'1px',background:'rgba(250,248,243,0.07)',marginBottom:'14px'}}/>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,lineHeight:1.78,color:'rgba(250,248,243,0.65)',marginBottom:'14px'}}>{lic.thesis}</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'12px'}}>
              {[{l:'Entry Capital',v:lic.entry},{l:'Window',v:lic.window}].map((r,j)=>(
                <div key={j}>
                  <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.2)',marginBottom:'3px'}}>{r.l}</div>
                  <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:600,color:r.l==='Window'&&r.v==='Now'?C.lime:'rgba(250,248,243,0.7)'}}>{r.v}</div>
                </div>
              ))}
            </div>
            <div style={{background:'rgba(250,248,243,0.04)',padding:'9px 10px',borderLeft:`2px solid rgba(250,248,243,0.12)`}}>
              <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.2)',marginBottom:'3px'}}>Moat</div>
              <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.48)',lineHeight:1.5}}>{lic.moat}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: carousel */}
      <MobCarousel onDark items={LICENCES} renderCard={(lic) => (
        <div style={{background:'rgba(250,248,243,0.10)',padding:'22px',height:'100%',borderTop:`3px solid ${lic.tier==='CORE'?C.lime:C.amber}`}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
            <div>
              <div style={{display:'flex',gap:'6px',alignItems:'center',marginBottom:'5px'}}>
                <span style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.25)'}}>{lic.n}</span>
                <span style={{fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:lic.tier==='CORE'?C.lime:C.amber,border:`1px solid ${lic.tier==='CORE'?C.lime:C.amber}`,padding:'1px 5px'}}>{lic.tag}</span>
              </div>
              <div style={{fontFamily:F.display,fontSize:'20px',fontWeight:700,color:C.paper,lineHeight:1.1}}>{lic.name}</div>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'40px',fontWeight:400,color:lic.tier==='CORE'?C.lime:C.amber,lineHeight:1,flexShrink:0,marginLeft:'8px'}}>{lic.score}</div>
          </div>
          <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,lineHeight:1.7,color:'rgba(250,248,243,0.65)',marginBottom:'14px'}}>{lic.thesis}</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'12px'}}>
            {[{l:'Entry Capital',v:lic.entry},{l:'Window',v:lic.window}].map((r,j)=>(
              <div key={j} style={{background:'rgba(250,248,243,0.08)',padding:'9px 10px'}}>
                <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.2)',marginBottom:'3px'}}>{r.l}</div>
                <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:600,color:r.l==='Window'&&r.v==='Now'?C.lime:'rgba(250,248,243,0.75)'}}>{r.v}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`2px solid rgba(184,217,53,0.35)`,paddingLeft:'10px'}}>
            <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.2)',marginBottom:'3px'}}>Moat</div>
            <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',lineHeight:1.5}}>{lic.moat}</div>
          </div>
        </div>
      )}/>
      </MobileCollapse>
    </div>
  </div>
);

// ─── SCORE TABLE ──────────────────────────────────────────────────────────────
const ScoreTable = () => {
  return (
    <div id="s03" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <MobileCollapse num="§ III" title="Score Breakdown" stat="4 Dims" label="All 11 Analysed">
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ III</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Dimension Analysis</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:'40px',alignItems:'start',marginBottom:'32px'}} className="mob-grid-stack">
          <div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.5vw,40px)',fontWeight:700,color:C.ink,lineHeight:1.1,marginBottom:'12px'}}>Four-Dimension Score Breakdown</h2>
            <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.8,color:C.muted}}>Each licence scored across Market Opportunity, Development Impact, Implementation Feasibility, and Financial Sustainability — revealing where each licence is strongest and where caution applies.</p>
          </div>
          {/* Record stat cells */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',background:C.border}}>
            {[
              {v:'80',l:'Highest Composite',s:'Export — Licence 09'},
              {v:'88',l:'Highest Market',s:'Export — trade agreement premium'},
              {v:'85',l:'Highest Impact',s:'Cultivation — rural employment'},
              {v:'78',l:'Highest Feasibility',s:'Wholesale — existing infrastructure'},
            ].map((s,i)=>(
              <div key={i} style={{background:C.paper,padding:'16px'}}>
                <div style={{fontFamily:F.mono,fontSize:'clamp(24px,3vw,34px)',fontWeight:400,color:C.ink,lineHeight:1,marginBottom:'6px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'2px'}}>{s.l}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop table */}
        <div className="score-table-wrap" style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:'600px'}}>
            <thead>
              <tr style={{borderBottom:`2px solid ${C.ink}`}}>
                {['','Score','Market ×30%','Impact ×30%','Feasibility ×25%','Sustain. ×15%','Tier','Window'].map((h,i)=>(
                  <th key={i} style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,whiteSpace:'nowrap',textAlign:i===0?'left':'right',borderRight:i<7?`1px solid ${C.border}`:'none',background:C.paperDark}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LICENCES.map((lic,i)=>(
                <tr key={i} style={{background:lic.score===80?'rgba(184,217,53,0.04)':i%2===0?C.paper:C.paperDark,borderBottom:`1px solid ${C.border}`}}>
                  <td style={{padding:'11px 12px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,borderRight:`1px solid ${C.border}`,whiteSpace:'nowrap'}}>
                    <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint,marginRight:'7px'}}>{lic.n}</span>{lic.name}
                    {lic.score===80 && <span style={{marginLeft:'8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:C.limeDark,background:'rgba(184,217,53,0.15)',padding:'1px 5px'}}>TOP</span>}
                  </td>
                  <td style={{padding:'11px 12px',fontFamily:F.mono,fontSize:'15px',fontWeight:700,color:lic.tier==='CORE'?C.forest:C.amber,textAlign:'right',borderRight:`1px solid ${C.border}`}}>{lic.score}</td>
                  {[lic.market,lic.impact,lic.feasibility,lic.sustainability].map((v,j)=>(
                    <td key={j} style={{padding:'11px 12px',textAlign:'right',borderRight:`1px solid ${C.border}`}}>
                      <span style={{fontFamily:F.mono,fontSize:'12px',fontWeight:500,color:v>=75?C.forest:v>=60?C.ink:C.muted}}>{v}</span>
                    </td>
                  ))}
                  <td style={{padding:'11px 12px',textAlign:'right',borderRight:`1px solid ${C.border}`}}>
                    <span style={{fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',color:lic.tier==='CORE'?C.paper:C.ink,background:lic.tier==='CORE'?C.forest:C.amber,padding:'3px 6px'}}>{lic.tier}</span>
                  </td>
                  <td style={{padding:'11px 12px',textAlign:'right'}}>
                    <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:600,color:lic.window==='Now'?C.positive:C.muted}}>{lic.window}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile score card list — replaces table */}
        <div className="score-card-list" style={{display:'none',flexDirection:'column',gap:'2px',background:C.border}}>
          {LICENCES.map((lic,i)=>(
            <div key={i} style={{background:lic.score===80?'rgba(184,217,53,0.04)':C.paperDark,padding:'12px 14px',borderLeft:`3px solid ${lic.tier==='CORE'?C.lime:C.amber}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px',gap:'8px'}}>
                <div style={{flex:1}}>
                  <div style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'3px',flexWrap:'wrap'}}>
                    <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>{lic.n}</span>
                    <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{lic.name}</span>
                    {lic.score===80 && <span style={{fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',color:C.limeDark,background:'rgba(184,217,53,0.15)',padding:'1px 5px'}}>TOP</span>}
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'4px',marginTop:'8px'}}>
                    {[{l:'Market',v:lic.market},{l:'Impact',v:lic.impact},{l:'Feasibility',v:lic.feasibility},{l:'Sustain.',v:lic.sustainability}].map((d,j)=>(
                      <div key={j}>
                        <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'2px'}}>{d.l}</div>
                        <div style={{height:'3px',background:C.border,marginBottom:'2px'}}>
                          <div style={{height:'100%',width:`${d.v}%`,background:d.v>=75?C.lime:d.v>=60?C.positive:C.faint}}/>
                        </div>
                        <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:600,color:d.v>=75?C.forest:d.v>=60?C.teal:C.muted}}>{d.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{textAlign:'right',flexShrink:0}}>
                  <div style={{fontFamily:F.mono,fontSize:'28px',fontWeight:400,color:lic.tier==='CORE'?C.forest:C.amber,lineHeight:1}}>{lic.score}</div>
                  <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:lic.window==='Now'?C.positive:C.muted,marginTop:'2px'}}>{lic.window}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </MobileCollapse>
      </div>
    </div>
  );
};

// ─── STRATEGIC THEMES ─────────────────────────────────────────────────────────
const StrategicThemes = () => {
  const themes = [
    {
      num:'01', title:'The Enabling Layer Is the First Mover Opportunity',
      sub:'Testing · Storage · Transportation — mandatory infrastructure, zero incumbents',
      licences:['05 Testing Lab','06 Storage','07 Transport'],
      body:'Three enabling licences — Testing Laboratory, Storage, and Transportation — sit below every other licence in the value chain. They generate revenue not from commodities but from compliance. Every tonne of biomass that moves, every lot that is tested, every gram that is stored: enabling licences collect a toll at the transaction level.\n\nWith zero competitors and immediate demand from the moment the first cultivation licence is issued, the enabling layer represents the lowest-risk first-mover position in the series. Entry capital is modest — $50K–$600K across all three — and throughput scales automatically as the sector grows.',
    },
    {
      num:'02', title:'Export Is the Capital of the Value Chain',
      sub:'Score 80/100 — three simultaneous trade agreements, Tema port, $8K/kg ceiling',
      licences:['09 Export — Score 80'],
      body:'Export scores 80/100 — the highest in the series. The mechanism: EU-Ghana EPA, AGOA, and UK DCTS give Ghana duty-free, quota-free access to the three largest premium hemp markets simultaneously. Tema port provides direct ocean freight to Rotterdam, Hamburg, and Felixstowe at container costs 30–40% lower than landlocked African competitors.\n\nAt the pharmaceutical tier — CBD API certified to EU-GMP — export prices reach $1,000–$8,000/kg. This is a structural, not temporary, premium. No landlocked African competitor can replicate the port-plus-trade-agreement combination.',
    },
    {
      num:'03', title:'Cultivation and Processing Are Interdependent',
      sub:'Neither licence fully realises its value without the other',
      licences:['01 Cultivation','02 Processing'],
      body:'Processing scores 78 — second in the series — because it converts commodity biomass (GH₵ per kg) into pharmaceutical or food-grade ingredients (USD per litre). But no processor can operate without a reliable, compliant cultivation supply base. And no cultivator can plan production without a confirmed offtake relationship.\n\nThe strongest early positions will be vertically integrated or formally linked: a processor who also holds the cultivation licence, or a cultivator with a binding offtake contract with a licensed processor. In both cases, the combined position is more defensible than either licence in isolation.',
    },
    {
      num:'04', title:'R&D and Breeding Have a Long Horizon — and a Durable Moat',
      sub:'Low score today; irreplaceable position in 5–10 years',
      licences:['03 Breeding','04 R&D'],
      body:'Breeding (64) and R&D (60) are the lowest-scoring licences in the series on market and feasibility dimensions. This reflects an honest assessment of a long commercialisation horizon. But their impact scores — 72 and 74 respectively — tell a different story.\n\nThe first operator to produce a certified Ghanaian tropical hemp variety has an irreplaceable position: every cultivator in Ghana becomes a potential customer. The first to develop pharmaceutical cannabinoid IP through Ghana academic infrastructure — Noguchi, KNUST, CSIR — holds licensing revenue for decades. These are long-horizon plays, but the moats are among the deepest in the series.',
    },
  ];
  return (
    <div id="s04" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <MobileCollapse num="§ IV" title="Strategic Themes" stat="4 Themes" label="Cross-Licence Analysis">
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ IV</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Strategic Themes</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.5vw,40px)',fontWeight:700,color:C.ink,lineHeight:1.1,marginBottom:'10px'}}>Four Cross-Licence Strategic Themes</h2>
        <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.8,color:C.muted,marginBottom:'36px',maxWidth:'620px'}}>Patterns that emerge when the 11 licences are read as a system, not as individual categories.</p>

        <div className="themes-grid-desk" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',background:C.border}}>
          {themes.map((t,i) => (
            <div key={i} style={{background:C.paper,borderTop:`3px solid ${i===1?C.lime:i===0?C.teal:C.limeDark}`,padding:'28px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'14px',gap:'12px',flexWrap:'wrap'}}>
                <div style={{flex:1,minWidth:'180px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
                    <div style={{width:'6px',height:'6px',background:i===1?C.lime:i===0?C.teal:C.limeDark,flexShrink:0}}/>
                    <div style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:i===1?C.lime:C.muted,letterSpacing:'1px'}}>Theme {t.num}</div>
                  </div>
                  <h3 style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,21px)',fontWeight:700,color:C.ink,lineHeight:1.2}}>{t.title}</h3>
                  <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,marginTop:'5px',lineHeight:1.55}}>{t.sub}</div>
                </div>
                <div style={{display:'flex',gap:'5px',flexWrap:'wrap',flexShrink:0}}>
                  {t.licences.map((l,j)=>(
                    <span key={j} style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1.2px',textTransform:'uppercase',color:i===1?C.limeDark:C.muted,background:i===1?'rgba(184,217,53,0.08)':C.paperDark,padding:'3px 8px',border:`1px solid ${i===1?C.lime:C.border}`}}>{l}</span>
                  ))}
                </div>
              </div>
              {t.body.split('\n\n').map((para,j)=>(
                <p key={j} style={{fontFamily:F.body,fontSize:'clamp(13px,1.4vw,15px)',fontWeight:300,lineHeight:1.9,color:C.ink,marginTop:'14px',borderTop:j>0?`1px solid ${C.border}`:'none',paddingTop:j>0?'14px':'0'}}>{para}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: theme carousel */}
        <MobCarousel items={themes} renderCard={(t,i) => (
          <div style={{background:C.paperDark,padding:'22px',height:'100%',border:`1px solid ${C.border}`,borderTop:`3px solid ${i===1?C.lime:i===0?C.teal:C.limeDark}`}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
              <div style={{width:'5px',height:'5px',background:i===1?C.lime:i===0?C.teal:C.limeDark,flexShrink:0}}/>
              <div style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:i===1?C.lime:C.muted,letterSpacing:'1px'}}>Theme {t.num}</div>
            </div>
            <h3 style={{fontFamily:F.display,fontSize:'18px',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'6px'}}>{t.title}</h3>
            <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,marginBottom:'14px',lineHeight:1.5}}>{t.sub}</div>
            <div style={{display:'flex',gap:'5px',flexWrap:'wrap',marginBottom:'14px'}}>
              {t.licences.map((l,j)=>(
                <span key={j} style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1.2px',textTransform:'uppercase',color:i===1?C.limeDark:C.muted,background:i===1?'rgba(184,217,53,0.08)':C.paperDark,padding:'3px 8px',border:`1px solid ${i===1?C.lime:C.border}`}}>{l}</span>
              ))}
            </div>
            {t.body.split('\n\n').map((para,j)=>(
              <p key={j} style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,lineHeight:1.85,color:C.ink,marginTop:j>0?'12px':'0',borderTop:j>0?`1px solid ${C.border}`:'none',paddingTop:j>0?'12px':'0'}}>{para}</p>
            ))}
          </div>
        )}/>

        {/* Entry sequencing */}
        <div className="entry-seq" style={{background:C.ink,padding:'36px',marginTop:'40px'}}>
          <Eyebrow light><span style={{color:'rgba(250,248,243,0.4)'}}>Recommended Entry Sequencing</span></Eyebrow>
          <h3 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,24px)',fontWeight:700,color:C.paper,marginBottom:'24px'}}>Four Phases of Market Entry</h3>
          <div className="entry-phase-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',background:'rgba(250,248,243,0.04)'}}>
            {[
              {phase:'Phase 1',when:'Now · 2026',licences:'01, 05, 07, 08',label:'Foundation',desc:'Cultivation, Testing, Transport, Import. Lowest barriers, immediate demand, maximum first-mover advantage.'},
              {phase:'Phase 2',when:'Q3–Q4 2026',licences:'02, 06, 10',label:'Scale',desc:'Processing, Storage, Wholesale. Mid-chain positions that scale with cultivation output growth.'},
              {phase:'Phase 3',when:'2027–2028',licences:'09, 11',label:'Premium',desc:'Export and Dispensing. Higher certification requirements with the highest sustainable margins.'},
              {phase:'Phase 4',when:'2028+',licences:'03, 04',label:'Deepening',desc:'Breeding and R&D. Long-horizon positions building IP and reducing import dependency.'},
            ].map((p,i)=>(
              <div key={i} className="phase-card" style={{background:C.ink,padding:'22px',borderTop:`2px solid ${i===0?C.lime:'rgba(250,248,243,0.07)'}`}}>
                <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.28)',marginBottom:'8px'}}>{p.phase} · {p.when}</div>
                <div style={{fontFamily:F.mono,fontSize:'clamp(13px,1.8vw,16px)',fontWeight:500,color:i===0?C.lime:'rgba(250,248,243,0.55)',marginBottom:'4px'}}>{p.licences}</div>
                <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:i===0?C.lime:'rgba(250,248,243,0.35)',marginBottom:'10px'}}>{p.label}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',fontWeight:300,lineHeight:1.7,color:'rgba(250,248,243,0.42)'}}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
        </MobileCollapse>
      </div>
    </div>
  );
};

// ─── VALUE CHAIN ──────────────────────────────────────────────────────────────
const ValueChain = () => (
  <div id="s05" className="pad-section" style={{background:C.forest,padding:'56px 64px'}}>
    <div style={{maxWidth:'1100px',margin:'0 auto'}}>
      <MobileCollapse num="§ V" title="Value Chain" stat="4 Layers" label="Structural Connections" onDark>
      <SectionRule light/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ V</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)',marginLeft:'6px'}}>Value Chain Architecture</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'start',marginBottom:'36px'}} className="mob-grid-stack">
        <div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.5vw,40px)',fontWeight:700,color:'#ffffff',lineHeight:1.1,marginBottom:'14px'}}>How the 11 Licences Connect</h2>
          <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:'rgba(250,248,243,0.82)',marginBottom:'20px'}}>Every pair of licences exchanging product requires enabling infrastructure. Remove any one enabling licence and the chain fragments at every point it crosses.</p>
        </div>
        <div className="mob-no-border-left" style={{borderLeft:`3px solid rgba(250,248,243,0.2)`,paddingLeft:'28px'}}>
          {[
            {title:'Without Testing (05)',body:'No processor can release product. No exporter can ship. No dispensary can dispense. The entire sector operates on unverified compliance — at every transaction, in every direction.'},
            {title:'Without Storage (06)',body:'Cultivators sell at distressed post-harvest prices. Export staging is impossible. Every licence becomes time-constrained against degradation.'},
            {title:'Without Transport (07)',body:'Product cannot legally move between any two licensed facilities. The chain is legally inert regardless of what every other licence does.'},
          ].map((r,i)=>(
            <div key={i} style={{marginBottom:'16px',padding:'12px 14px',background:'rgba(168,32,13,0.12)',borderLeft:`3px solid ${C.red}`}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:'#E05C4B',marginBottom:'6px'}}>{r.title}</div>
              <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,lineHeight:1.75,color:'rgba(250,248,243,0.82)'}}>{r.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="vc-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'2px'}}>
        {[
          {label:'UPSTREAM',items:[{n:'01',name:'Cultivation',s:72,tier:'CORE'},{n:'03',name:'Breeding',s:64,tier:'EMERGING'},{n:'04',name:'R&D',s:60,tier:'EMERGING'}]},
          {label:'ENABLING',items:[{n:'05',name:'Testing Lab',s:75,tier:'CORE'},{n:'06',name:'Storage',s:67,tier:'EMERGING'},{n:'07',name:'Transport',s:63,tier:'EMERGING'}]},
          {label:'MID-CHAIN',items:[{n:'02',name:'Processing',s:78,tier:'CORE'},{n:'08',name:'Import',s:70,tier:'CORE'},{n:'10',name:'Wholesale',s:74,tier:'CORE'}]},
          {label:'TRADE & DOWNSTREAM',items:[{n:'09',name:'Export',s:80,tier:'CORE'},{n:'11',name:'Dispensing',s:71,tier:'CORE'}]},
        ].map((col,i)=>(
          <div key={i} style={{background:'rgba(250,248,243,0.10)',padding:'18px'}}>
            <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'12px',paddingBottom:'9px',borderBottom:'1px solid rgba(250,248,243,0.18)'}}>{col.label}</div>
            {col.items.map((item,j)=>(
              <div key={j} style={{padding:'10px 0',borderBottom:j<col.items.length-1?'1px solid rgba(250,248,243,0.12)':'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'5px'}}>
                  <div>
                    <div style={{fontFamily:F.mono,fontSize:'8px',fontWeight:500,color:'rgba(250,248,243,0.38)',marginBottom:'2px'}}>Lic {item.n}</div>
                    <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:'#ffffff'}}>{item.name}</div>
                  </div>
                  <div style={{fontFamily:F.mono,fontSize:'22px',fontWeight:400,color:item.tier==='CORE'?C.lime:C.amber,lineHeight:1}}>{item.s}</div>
                </div>
                <div style={{height:'2px',background:'rgba(255,255,255,0.08)'}}>
                  <div style={{height:'100%',width:`${item.s}%`,background:item.tier==='CORE'?C.lime:C.amber}}/>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      </MobileCollapse>
    </div>
  </div>
);

// ─── KEY NUMBERS ──────────────────────────────────────────────────────────────
const KeyNumbers = () => (
  <div id="s06" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'1100px',margin:'0 auto'}}>
      <MobileCollapse num="§ VI" title="Key Numbers" stat="8 Stats" label="The Opportunity Data">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ VI</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Series Intelligence</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.5vw,40px)',fontWeight:700,color:C.ink,lineHeight:1.1,marginBottom:'40px'}}>The Numbers That Define the Opportunity</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:`2px solid ${C.ink}`,borderLeft:`2px solid ${C.ink}`}} className="mob-grid-2">
        {[
          {v:'0',      l:'Licensed operators today',s:'In any of the 11 categories — March 2026'},
          {v:'$30B',   l:'Global hemp market 2030', s:'From ~$6.5B in 2024 · CAGR 17.5%'},
          {v:'0%',     l:'EU duty on Ghana hemp',   s:'EU-Ghana EPA — duty-free, quota-free'},
          {v:'85%',    l:'National trade via Tema',  s:'Port infrastructure — structural advantage'},
          {v:'11,000', l:'Pharmacy + LCS outlets',  s:'Ghana pharmaceutical retail points'},
          {v:'$8K/kg', l:'Pharma CBD API ceiling',  s:'EU-GMP certified — Export Licence 09'},
          {v:'800K+',  l:'Cocoa farmer network',    s:'Ready cooperative distribution template'},
          {v:'$122M',  l:'Global hemp seed trade',  s:'UNCTAD 2022 — seed exports alone'},
        ].map((s,i)=>(
          <div key={i} className="key-cell" style={{padding:'24px 20px',borderRight:`2px solid ${C.ink}`,borderBottom:`2px solid ${C.ink}`}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(24px,3.5vw,42px)',fontWeight:400,color:i===0?C.red:i===1?C.forest:C.ink,lineHeight:0.9,marginBottom:'10px'}}>{s.v}</div>
            <div style={{height:'2px',width:'20px',background:C.lime,marginBottom:'10px'}}/>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.muted,letterSpacing:'1.5px',textTransform:'uppercase',lineHeight:1.4,marginBottom:'4px'}}>{s.l}</div>
            <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{s.s}</div>
          </div>
        ))}
      </div>
      </MobileCollapse>
    </div>
  </div>
);

// ─── SERIES RISKS ─────────────────────────────────────────────────────────────
const SeriesRisks = () => {
  const [openRisks, setOpenRisks] = useState({});
  const toggle = i => setOpenRisks(prev=>({...prev,[i]:!prev[i]}));
  const risks = [
    {sev:'HIGH',r:'THC exceedance events across the cultivation base',m:'The 0.3% threshold is technically demanding in tropical conditions. Non-compliant biomass creates chain-wide disruption: rejected by processors, COA failures, export seizures. Strict EU-certified variety requirement, pre-harvest multi-field sampling, and supplier THC compliance history as a procurement condition are the primary mitigations.'},
    {sev:'MEDIUM',r:'NCC framework still maturing — secondary guidance pending',m:'L.I. 2475 is operational but secondary guidance — track-and-trace specifications, export permit procedures, dispensing prescribing authority — continues to develop. Direct NCC engagement from application stage and flexible compliance architecture are essential.'},
    {sev:'MEDIUM',r:'Slow cultivation sector growth suppresses enabling licence revenue',m:'Testing labs, transport operators, and storage facilities generate revenue from licence activity volume. Slow sector ramp suppresses throughput. The mitigation: multi-sector revenue strategy — all enabling licences serve pharmaceutical, food, and agri-commodity sectors alongside cannabis.'},
    {sev:'MEDIUM',r:'Currency volatility (GH₵ / USD)',m:'Import operations, pharmaceutical pricing, and export revenue all carry FX exposure. Forward FX contracts, USD/EUR invoicing where possible, and 15–20% FX buffer in pricing models are the standard mitigations.'},
    {sev:'MEDIUM',r:'Cultural and stigma risk on dispensing products',m:'Hemp-cannabis association creates hesitation and potential backlash for dispensing operators in some communities. Health and wellness framing, no recreational iconography, and proactive engagement with traditional and religious leadership are the mitigations.'},
    {sev:'LOW',r:'First-mover window shorter than projected',m:'Multiple well-capitalised simultaneous entrants could compress the uncontested market thesis. South African and Lesotho precedents suggest 18–24 months before competitive pressure increases. Ghana structural advantages — EPA, port, pharmacy network — are durable regardless of when competition arrives.'},
  ];
  return (
    <div id="s07" className="pad-section" style={{background:C.ink,padding:'56px 64px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <MobileCollapse num="§ VII" title="Series Risks" stat="6 Risks" label="Cross-Licence Register" onDark>
        <SectionRule light/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ VII</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)',marginLeft:'6px'}}>Series-Level Risk Register</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'32px',marginBottom:'32px',alignItems:'end'}} className="mob-grid-stack">
          <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.5vw,40px)',fontWeight:700,color:C.paper,lineHeight:1.1}}>Cross-Licence Risks</h2>
          <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.8,color:'rgba(250,248,243,0.5)'}}>Six structural risks that affect the entire series — beyond the licence-specific risks detailed in each individual brief.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',background:'rgba(250,248,243,0.04)'}} className="mob-grid-stack">
          {risks.map((r,i) => {
            const sevColor = r.sev==='HIGH'?C.red:r.sev==='MEDIUM'?C.amber:C.positive;
            const isOpen = openRisks[i];
            return (
              <div key={i} className={isOpen?'mob-risk-open':''} style={{background:C.ink,borderTop:`2px solid ${sevColor}`,cursor:'pointer'}} onClick={()=>toggle(i)}>
                <div style={{padding:'18px 16px 0'}}>
                  <div style={{display:'flex',gap:'10px',alignItems:'flex-start',marginBottom:'10px',flexWrap:'wrap'}}>
                    <span style={{fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:sevColor,border:`1px solid ${sevColor}`,padding:'2px 7px',flexShrink:0,marginTop:'2px'}}>{r.sev}</span>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flex:1,gap:'8px'}}>
                      <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper,lineHeight:1.35,flex:1}}>{r.r}</div>
                      <span className="mob-show" style={{display:'none',fontFamily:F.mono,fontSize:'12px',color:'rgba(250,248,243,0.3)',transition:'transform 0.2s',transform:isOpen?'rotate(180deg)':'none',flexShrink:0,marginTop:'2px'}}>↓</span>
                    </div>
                  </div>
                </div>
                <div className="mob-risk-body" style={{padding:'0 16px 18px'}}>
                  <div style={{borderLeft:`2px solid ${sevColor}`,opacity:0.7,paddingLeft:'12px',marginTop:'4px'}}>
                    <p style={{fontFamily:F.body,fontSize:'12px',fontWeight:300,lineHeight:1.8,color:'rgba(250,248,243,0.55)'}}>{r.m}</p>
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

// ─── GATE ─────────────────────────────────────────────────────────────────────
const Gate = () => {
  const [expanded, setExpanded] = useState(false);
  const briefItems = [
    {item:'4 Business Models',sub:'Deep configuration — advantages, risks, capital, team, timeline per model'},
    {item:'Unit Economics',sub:'Per-unit revenue, margin structure, breakeven analysis with Ghana cost data'},
    {item:'5-Phase Regulatory Roadmap',sub:'Compliance journey from NCC application to first revenue'},
    {item:'8-Risk Register',sub:'Severity matrix with specific, actionable mitigations per risk'},
    {item:'Competitive Landscape',sub:'Ghana vs. 7 African peers — head-to-head analysis for each licence'},
    {item:'Deployment Parameters',sub:'Full capital table, team structure, and first-mover timing window'},
  ];
  const PREVIEW = 4;
  const visible = expanded ? briefItems : briefItems.slice(0,PREVIEW);
  return (
    <div id="s08" className="pad-gate" style={{background:C.paper,borderTop:`8px solid ${C.ink}`,padding:'72px 64px 56px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ VIII</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Members Access</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:'56px',alignItems:'start'}} className="mob-grid-stack">
          <div>
            <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.lime,background:C.forest,display:'inline-block',padding:'4px 12px',marginBottom:'18px'}}>BRIDGE MEMBERS — FULL ACCESS</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(28px,4.5vw,58px)',fontWeight:900,color:C.ink,lineHeight:1.0,marginBottom:'18px',letterSpacing:'-1px'}}>
              Every licence brief.<br/>
              <span style={{color:C.forest}}>In full detail.</span><br/>
              For operators who move.
            </h2>
            <p style={{fontFamily:F.body,fontSize:'clamp(14px,1.5vw,16px)',fontWeight:300,lineHeight:1.85,color:C.muted,marginBottom:'28px',maxWidth:'500px'}}>
              Each of the 11 NCC licence categories has a standalone intelligence brief — 1,900+ lines of analysis covering every business model, regulatory roadmap, risk register, competitive landscape, and deployment parameter. This is the summary. The full briefs are available to Members.
            </p>

            {/* Mobile-only: CTA strip before licence list */}
            <div className="mob-show" style={{display:'none',marginBottom:'24px'}}>
              <a href="#" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',background:C.lime,color:C.ink,padding:'16px 24px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',width:'100%',letterSpacing:'0.3px',minHeight:'52px'}}>
                Apply for Members Access →
              </a>
              <a href="#" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',background:'transparent',border:`1px solid ${C.border}`,color:C.muted,padding:'13px 24px',fontFamily:F.sans,fontSize:'12px',fontWeight:600,textDecoration:'none',width:'100%',marginTop:'6px',minHeight:'48px'}}>
                ↓ Download This Summary Free
              </a>
            </div>

            {/* Licence directory */}
            <div style={{border:`1px solid ${C.border}`,borderRight:'none',borderBottom:'none'}}>
              {LICENCES.map((lic,i)=>(
                <div key={i} style={{display:'flex',gap:'10px',alignItems:'center',padding:'11px 14px',borderRight:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,borderLeft:`3px solid ${lic.tier==='CORE'?C.lime:C.amber}`,background:lic.score===80?'rgba(184,217,53,0.04)':'transparent'}}>
                  <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:500,color:C.faint,flexShrink:0,minWidth:'20px'}}>{lic.n}</span>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:lic.score===80?C.forest:C.ink,flex:1}}>{lic.name}</span>
                  <span style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,flexShrink:0}} className="mob-hide">{lic.entry}</span>
                  <span style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:lic.tier==='CORE'?C.forest:C.amber,flexShrink:0,minWidth:'26px',textAlign:'right'}}>{lic.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What each brief contains */}
          <div>
            <div style={{background:C.ink,padding:'28px',marginBottom:'2px'}}>
              <Eyebrow light><span style={{color:'rgba(250,248,243,0.4)'}}>Each Full Brief Contains</span></Eyebrow>
              {visible.map((r,i)=>(
                <div key={i} style={{display:'flex',gap:'14px',alignItems:'flex-start',padding:'13px 0',borderBottom:i<visible.length-1?'1px solid rgba(250,248,243,0.07)':'none'}}>
                  <div style={{width:'6px',height:'6px',background:C.lime,flexShrink:0,marginTop:'5px',borderRadius:'1px'}}/>
                  <div>
                    <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,marginBottom:'3px'}}>{r.item}</div>
                    <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.5}}>{r.sub}</div>
                  </div>
                </div>
              ))}
              {!expanded && (
                <button onClick={()=>setExpanded(true)} style={{marginTop:'12px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'8px 14px',cursor:'pointer',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'rgba(250,248,243,0.55)',display:'flex',alignItems:'center',gap:'8px',width:'100%',justifyContent:'center'}}>
                  <span style={{color:C.lime}}>+{briefItems.length-PREVIEW}</span> more deliverables included <span style={{opacity:0.5}}>↓</span>
                </button>
              )}
            </div>
            <div style={{background:C.forest,padding:'18px',marginBottom:'2px'}}>
              <p style={{fontFamily:F.display,fontSize:'14px',fontWeight:400,fontStyle:'italic',color:'rgba(250,248,243,0.8)',lineHeight:1.7}}>
                "BRIDGE Cannabis Intelligence is produced for operators who want to move — not for operators who want to watch."
              </p>
            </div>
            {/* CTAs — desktop only (mobile CTAs above) */}
            <div className="gate-cta-row mob-hide" style={{display:'flex',gap:'8px',flexWrap:'wrap',marginTop:'2px'}}>
              <a href="#" style={{display:'flex',alignItems:'center',gap:'10px',background:C.lime,color:C.ink,padding:'16px 28px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',flex:'1',minWidth:'200px',justifyContent:'center',letterSpacing:'0.3px'}}>
                Apply for Members Access <span style={{fontSize:'16px',fontWeight:900}}>→</span>
              </a>
              <a href="#" style={{display:'flex',alignItems:'center',gap:'10px',background:'transparent',border:`2px solid ${C.ink}`,color:C.ink,padding:'14px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,textDecoration:'none',flex:'1',minWidth:'160px',justifyContent:'center',opacity:0.6}}>
                <span>↓</span> Download Summary
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <div className="pad-footer np" style={{background:C.forest,borderTop:`3px solid ${C.lime}`,padding:'18px 64px'}}>
    <div className="footer-inner" style={{maxWidth:'1100px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px',flexWrap:'wrap'}}>
        <DocumentLogo height={22} variant="white"/>
        <div className="mob-hide" style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.15)'}}/>
        <div className="mob-hide">
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.45)',letterSpacing:'0.3px'}}>Ghana Cannabis Intelligence · Complete Series · Members Brief</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.25)',marginTop:'2px'}}>NCC Act 1019 · Act 1100 · L.I. 2475 · 11 Licence Categories · March 2026</div>
        </div>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'20px',alignItems:'center'}}>
        {['All 11 Licences','Members','Engage BRIDGE','bridgepbc.com'].map((l,i)=>(
          <a key={i} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:i===2?C.lime:'rgba(250,248,243,0.45)',textDecoration:'none',letterSpacing:'0.2px'}}>{l}</a>
        ))}
      </div>
    </div>
  </div>
);

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function CannabisSeriesSummary() {
  const coverLogoRef = useRef(null);
  return (
    <div style={{fontFamily:F.body,background:C.ink}}>
      <DocumentGlobalStyles extraCss={EXTRA_CSS}/>
      <MobileNav/>
      <TopBar coverLogoRef={coverLogoRef}/>
      <Cover logoRef={coverLogoRef}/>
      <Executive/>
      <LicenceMatrix/>
      <ScoreTable/>
      <StrategicThemes/>
      <ValueChain/>
      <KeyNumbers/>
      <SeriesRisks/>
      <Gate/>
      <div className="mob-show mob-nav-clearance" style={{display:'none',height:'72px'}}/>
      <Footer/>
    </div>
  );
}
