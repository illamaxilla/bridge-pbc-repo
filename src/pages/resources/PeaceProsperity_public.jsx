import { useEffect, useRef, useState } from "react";

// ── DESIGN SYSTEM ─────────────────────────────────────────────────────────────
const C = {
  ink:       '#0D1A10',
  paper:     '#FAF8F3',
  paperDark: '#F0EDE4',
  forest:    '#1B4D3E',
  lime:      '#B8D935',
  limeDark:  '#8FA825',
  muted:     '#5C6B5E',
  faint:     '#9AAA9C',
  border:    '#D8D4C8',
  teal:      '#2E5A4D',
  red:       '#A8200D',
  amber:     '#B8730A',
  positive:  '#1A6B2F',
  white:     '#FFFFFF',
};

const F = {
  display: '"Playfair Display","Georgia",serif',
  body:    '"Source Serif 4","Georgia",serif',
  sans:    '"DM Sans","Helvetica Neue",sans-serif',
  mono:    '"DM Mono","Courier New",monospace',
};

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const Gf = () => (<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .dc::first-letter{font-family:${F.display};font-size:4.2em;font-weight:900;float:left;line-height:0.82;margin:0.08em 0.12em 0 0;color:${C.forest};}
  @media print{.np{display:none!important;}}
  .mob-show{display:none;}
  a{color:inherit;text-decoration:none;}
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
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:12px!important;}
    .mob-full{width:100%!important;}
    .mob-item-hidden{display:none!important;}
    .mob-toggle{display:flex!important;align-items:center;justify-content:space-between;width:100%;
      padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;
      cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;
      letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};}
    .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
    .mob-toggle-hdr{border-bottom:1px solid rgba(255,255,255,0.08)!important;color:rgba(250,248,243,0.4)!important;}
    .gate-cta-row{flex-direction:column!important;}
    .gate-cta-row a{justify-content:center!important;}
    .gate-value-line{display:none!important;}
    .footer-links{display:none!important;}
    .footer-inner{justify-content:center!important;}
    .exec-grid{grid-template-columns:1fr!important;}
    /* Sector table — hide 4-col desktop layout, show mobile rows */
    .sector-desktop{display:none!important;}
    /* Stats strip — wrap to 2×2 */
    .stats-row>div{flex:0 0 calc(50% - 1px)!important;}
  }
`}</style>);

// ── LOGO ──────────────────────────────────────────────────────────────────────
const Logo = ({height=28, variant='white'}) => {
  const tf = variant === 'white' ? '#ffffff' : C.forest;
  const stroke = variant === 'white' ? '#ffffff' : C.forest;
  return (
    <svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      {/* D letterform */}
      <path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      {/* B letterform top */}
      <path fill={tf} stroke={variant==='white'?'#000':'#000'} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      {/* B letterform bottom */}
      <path fill={tf} stroke={variant==='white'?'#000':'#000'} strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      {/* B lime top bar */}
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
      {/* B white stem */}
      <rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      {/* E letterform */}
      <path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      <rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
      {/* Bridge icon mark */}
      <rect fill="none" stroke={stroke} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
      <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
    </svg>
  );
};

// ── RULE ──────────────────────────────────────────────────────────────────────
const Rule = () => (
  <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
);

// ── TOPBAR ────────────────────────────────────────────────────────────────────
const TopBar = ({coverLogoRef}) => {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const fn = () => {
      if (!coverLogoRef?.current) return;
      setPast(coverLogoRef.current.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener('scroll', fn, {passive:true});
    return () => window.removeEventListener('scroll', fn);
  }, [coverLogoRef]);

  return (
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'200px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <Logo height={20} variant="dark"/>
          <div style={{width:'1px',height:'16px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,letterSpacing:'0.3px'}}>General Series · Doc 02/23 · Peace &amp; Prosperity Framework</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest}}>Peace &amp; Prosperity</span>
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,background:C.paperDark,border:`1px solid ${C.border}`,padding:'4px 9px'}}>PUBLIC</span>
        <a href="#" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>Members →</a>
        <a href="#" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'0.3px'}}>Apply →</a>
      </div>
    </div>
  );
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const PEACE_DIMS = [
  {
    label: 'Physical Security',
    body: 'Freedom from violence, crime, and armed conflict. The ability to move, conduct business, and raise children in environments where the basic continuity of daily life is not in question. Physical insecurity is not merely a human rights concern — it is a direct, measurable constraint on economic activity, community investment, and the planning horizon that development requires.',
  },
  {
    label: 'Economic Security',
    body: 'Stable income sufficient to meet basic needs, combined with protection against catastrophic financial shocks. Not just income today — but reasonable confidence that a health emergency, a failed harvest, or a family crisis will not erase everything a household has built. Economic insecurity produces chronic stress with measurable effects on health, decision quality, and long-term planning capacity.',
  },
  {
    label: 'Social Cohesion',
    body: "Trust within and between communities — the dense networks of obligation, reciprocity, and shared identity that make markets function and institutions hold. Ghana's communities possess extraordinary reserves of social capital. BRIDGE investments are designed to strengthen those foundations, not erode them in the name of efficiency.",
  },
  {
    label: 'Political Stability',
    body: 'Functioning institutions that provide predictable rule of law, protect property rights, and enable peaceful transitions of authority. Political instability destroys the investment horizons that serious development requires. BRIDGE operates with explicit awareness of how ventures are affected by — and can constructively contribute to — stable governance environments.',
  },
  {
    label: 'Psychological Security',
    body: 'Hope for better futures. Confidence that effort will be rewarded. Dignity in social interactions and daily life. Psychological security is the most fundamental dimension of all — without it, even material resources fail to translate into sustained human flourishing.',
  },
];


// ── COVER ─────────────────────────────────────────────────────────────────────
const Cover = ({logoRef}) => (
  <div style={{background:C.ink}}>
    <div className="pad-cover" style={{padding:'24px 64px 0'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
      {/* Eyebrow */}
      <div ref={logoRef} style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'56px'}}>
        <Logo height={22} variant="white"/>
        <div style={{width:'1px',height:'18px',background:'rgba(255,255,255,0.15)',flexShrink:0}}/>
        <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)'}}>General Series</span>
        <div className="mob-hide" style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.1)',flexShrink:0}}/>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',letterSpacing:'0.5px',color:'rgba(250,248,243,0.22)'}}>Document No. 02 of 23 · March 2026</span>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:C.lime,background:'rgba(184,217,53,0.1)',border:'1px solid rgba(184,217,53,0.25)',padding:'3px 9px'}}>PUBLIC</span>
      </div>

      {/* Main grid */}
      <div className="tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'flex-start',paddingBottom:'64px'}}>
        <div>
          <h1 style={{fontFamily:F.display,fontSize:'clamp(40px,6vw,80px)',fontWeight:900,lineHeight:1.0,color:C.paper,letterSpacing:'-0.02em',marginBottom:'6px'}}>Peace &amp;</h1>
          <h1 style={{fontFamily:F.display,fontSize:'clamp(40px,6vw,80px)',fontWeight:900,lineHeight:1.0,color:C.lime,letterSpacing:'-0.02em',marginBottom:'36px'}}>Prosperity</h1>
          <p style={{fontFamily:F.body,fontSize:'17px',lineHeight:1.85,color:'rgba(250,248,243,0.58)',fontWeight:300,marginBottom:'32px',maxWidth:'460px'}}>
            The philosophical and empirical foundation behind everything BRIDGE does — what dignity, security, and thriving mean in measurable terms, and why these are the only outcomes that matter for Ghana's development.
          </p>
          {/* Policy strip */}
          <div style={{display:'flex',gap:'12px',background:'rgba(184,217,53,0.07)',border:'1px solid rgba(184,217,53,0.16)',padding:'14px 18px'}}>
            <div style={{width:'3px',background:C.lime,flexShrink:0}}/>
            <p style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.55)',lineHeight:1.7,margin:0}}>
              <strong style={{color:C.lime,fontWeight:700}}>Policy alignment:</strong> Ghana 2026 Budget · Sankofa Initiative · 24-Hour Economy · SDGs 1, 3, 4, 8, 10, 11
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
          {[
            {title:'Peace', items:['Physical Security','Economic Security','Social Cohesion','Political Stability','Psychological Security']},
            {title:'Prosperity', items:['Material Sufficiency','Human Capability','Freedom of Choice','Intergenerational Advancement']},
          ].map(p => (
            <div key={p.title} style={{background:'rgba(255,255,255,0.04)',borderTop:`1px solid rgba(255,255,255,0.06)`,padding:'22px 24px'}}>
              <div style={{fontFamily:F.display,fontSize:'17px',fontWeight:700,fontStyle:'italic',color:C.lime,marginBottom:'14px'}}>{p.title}</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                {p.items.map(item => (
                  <span key={item} style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,letterSpacing:'0.5px',color:'rgba(250,248,243,0.5)',background:'rgba(255,255,255,0.06)',padding:'4px 10px'}}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  </div>
);

// ── EXECUTIVE SUMMARY ─────────────────────────────────────────────────────────
const Executive = () => (
  <div className="pad-section" style={{background:C.paper,padding:'48px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <Rule/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'20px'}}>Executive Summary</div>
      <div className="exec-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px'}}>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
          Peace &amp; Prosperity is BRIDGE PBC's foundational framework for measuring what development is actually for. It holds that GDP growth, income averages, and FDI inflows are means to an end, not ends in themselves. The end is whether Ghanaian citizens can live lives they genuinely value.
        </p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
          This public summary covers the foundational argument: why standard economic metrics are insufficient, what BRIDGE means by Peace across five dimensions, and how the two pillars — Peace and Prosperity — connect to every investment decision. The complete framework, including the scoring methodology and 12-sector pathway map, is available to members.
        </p>
      </div>
    </div>
  </div>
);

// ── SECTION I — STARTING POINT ────────────────────────────────────────────────
const SectionStartingPoint = () => (
  <div className="pad-section" style={{background:C.paperDark,padding:'48px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <Rule/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'20px'}}>I — A Different Starting Point</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.2vw,40px)',fontWeight:700,lineHeight:1.15,color:C.ink,marginBottom:'28px'}}>Most development organisations measure success in the language of economics.</h2>
      <p className="dc" style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>
        GDP growth rates. Employment figures. Foreign direct investment inflows. Per capita income trends. These numbers matter — BRIDGE uses them as inputs. But they are incomplete measures of what people actually need from their lives, and optimising for them alone produces policies that can grow an economy while leaving most of its people behind.
      </p>
      <p style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'40px'}}>
        A country can achieve consistent GDP growth while gains flow overwhelmingly to a narrow class. Employment rates can rise while the work counted is informal, precarious, and insufficient for families to plan more than a week ahead.
      </p>
      {/* Pull quote */}
      <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'28px',marginBottom:'40px',maxWidth:'580px'}}>
        <p style={{fontFamily:F.display,fontSize:'20px',fontWeight:600,fontStyle:'italic',lineHeight:1.58,color:C.forest,margin:0}}>
          Economic indicators are means, not ends. The end is whether Ghanaian citizens can live lives they value — with dignity, with security, and within communities that are genuinely thriving.
        </p>
      </div>
      <p style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
        This draws on the Capability Approach developed by Amartya Sen and Martha Nussbaum: that development should be measured by what people are able to do and be — not merely by what they own or earn.
      </p>
    </div>
  </div>
);

// ── SECTION II — PEACE ────────────────────────────────────────────────────────
const SectionPeace = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="pad-section" style={{background:C.paper,padding:'48px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <Rule/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'20px'}}>II — What BRIDGE Means by Peace</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.2vw,40px)',fontWeight:700,lineHeight:1.15,color:C.ink,marginBottom:'16px'}}>Not the absence of war. A comprehensive condition.</h2>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.80,color:C.muted,marginBottom:'36px',fontWeight:300}}>
          Peace comprises five dimensions. All five operate simultaneously — and all five shape the environment in which BRIDGE ventures either succeed or fail.
        </p>

        {/* Mobile toggle — CSS .mob-toggle controls visibility */}
        <button className="mob-toggle" onClick={() => setOpen(o => !o)}>
          <span>View all five Peace dimensions</span>
          <span style={{transform:open?'rotate(180deg)':'none',transition:'transform 0.2s',display:'inline-block'}}>↓</span>
        </button>

        {/* Cards */}
        {PEACE_DIMS.map((d, i) => (
          <div key={i} className={i > 1 ? open ? '' : 'mob-item-hidden' : ''} style={{display:'flex',gap:'0',borderBottom:`1px solid ${C.border}`,padding:'20px 0'}}>
            <div style={{width:'3px',background:C.lime,flexShrink:0,marginRight:'20px',marginTop:'3px'}}/>
            <div style={{flex:1}}>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,letterSpacing:'0.3px',color:C.forest,marginBottom:'8px'}}>{d.label}</div>
              <p style={{fontFamily:F.body,fontSize:'14px',lineHeight:1.80,color:C.ink,fontWeight:300,margin:0}}>{d.body}</p>
            </div>
          </div>
        ))}

        {/* Closing statement */}
        <div style={{background:C.forest,padding:'28px 32px',marginTop:'24px'}}>
          <p style={{fontFamily:F.display,fontSize:'17px',fontWeight:600,fontStyle:'italic',color:C.paper,lineHeight:1.65,margin:0}}>
            Peace, fully understood, creates the stable foundation from which everything else becomes possible: long-term planning, investment in children's futures, community solidarity, and the kind of hope that drives people to build rather than merely endure.
          </p>
        </div>
      </div>
    </div>
  );
};

// ── SECTION III — PROSPERITY ──────────────────────────────────────────────────
const SectionProsperity = () => (
  <div className="pad-section" style={{background:C.paperDark,padding:'48px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <Rule/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'20px'}}>III — What BRIDGE Means by Prosperity</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.2vw,40px)',fontWeight:700,lineHeight:1.15,color:C.ink,marginBottom:'28px'}}>Material sufficiency is necessary. It is not sufficient.</h2>

      <div className="tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',marginBottom:'36px'}}>
        <p style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
          True prosperity includes the capability to pursue aspirations — not merely to survive. It includes the real freedom to choose how to live and work. Access to quality healthcare and education. The voice to participate in decisions that affect one's community.
        </p>
        <p style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
          A venture that creates employment but traps workers in precarious, low-skill roles does not score well on Prosperity. The question is never just "does this provide something?" — it is "does this genuinely expand what Ghanaians are able to do and be?"
        </p>
      </div>

      {/* Four prosperity dimensions */}
      <div className="stats-row" style={{display:'flex',flexWrap:'wrap',gap:'2px'}}>
        {[
          {n:'01', l:'Material Sufficiency', d:'Income, shelter, nutrition, water, energy, and transport. The necessary floor — without it, capability development cannot begin.'},
          {n:'02', l:'Human Capability', d:'Education, health, and skills that compound over time. Not what people have, but what they are able to do and be.'},
          {n:'03', l:'Freedom of Choice', d:'Real agency over work, family, and life direction. The ability to make meaningful decisions unconstrained by circumstance.'},
          {n:'04', l:'Intergenerational Advancement', d:'Each generation building on the last. Assets accumulated, not consumed. Advantages passed forward, not lost.'},
        ].map((item, i) => (
          <div key={i} style={{flex:'1 1 calc(25% - 2px)',minWidth:'160px',background:C.paper,padding:'18px 16px',borderTop:`3px solid ${C.lime}`}}>
            <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:500,color:C.lime,marginBottom:'6px'}}>{item.n}</div>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,letterSpacing:'0.3px',marginBottom:'8px',lineHeight:1.3}}>{item.l}</div>
            <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,margin:0,lineHeight:1.65,fontWeight:300}}>{item.d}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── GATE ──────────────────────────────────────────────────────────────────────
const GATE_ITEMS = [
  'What BRIDGE means by Prosperity — the full four-dimension framework with investment criteria',
  'The Three Domains of Flourishing — measurable scoring parameters for Individual Dignity, Family Security, and Community Thriving',
  'The Three-Tier Measurement Framework — Tier 1 P&P Outcomes, Tier 2 Development Indicators, and Tier 3 Operational Metrics with full indicator sets',
  'The 12-Sector Pathway Map — traceable connections from each sector to specific P&P outcomes',
  'Ghana Policy Framework Alignment — detailed mapping to 2026 Budget, Sankofa Initiative, 24-Hour Economy, and SDGs',
  'Investment thesis — how the P&P framework shapes BRIDGE capital deployment decisions',
  'Impact reporting standards — the full set of indicators and measurement protocols used across the portfolio',
  'Quarterly P&P updates — how outcomes evolve across sectors and what BRIDGE is learning',
];

const Gate = () => {
  const [expanded, setExpanded] = useState(false);
  const PREVIEW = 4;
  const visible = expanded ? GATE_ITEMS : GATE_ITEMS.slice(0, PREVIEW);
  const hidden = GATE_ITEMS.length - PREVIEW;
  return (
    <div className="pad-gate" style={{background:C.forest,padding:'48px 64px 40px',position:'relative',overflow:'hidden'}}>
      {/* Watermark */}
      <div style={{position:'absolute',right:'-20px',bottom:'-40px',fontFamily:F.display,fontSize:'clamp(80px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.03)',pointerEvents:'none',userSelect:'none',letterSpacing:'-6px',lineHeight:1}}>P&P</div>
      <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>BRIDGE MEMBERS · FULL ACCESS</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,34px)',fontWeight:700,fontStyle:'italic',color:C.paper,lineHeight:1.25,marginBottom:'28px',maxWidth:'640px'}}>
          This is the public summary. The complete Peace &amp; Prosperity Framework document includes:
        </h2>

        {/* Items grid */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 40px'}} className="tc">
          {visible.map((item, i) => (
            <div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'9px 0',borderBottom:`1px solid rgba(255,255,255,0.08)`}}>
              <span style={{color:C.lime,fontFamily:F.sans,fontSize:'13px',fontWeight:700,flexShrink:0,lineHeight:1.5,marginTop:'1px'}}>→</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.68)',lineHeight:1.55}}>{item}</span>
            </div>
          ))}
        </div>

        {/* Expand toggle */}
        {!expanded && hidden > 0 && (
          <button onClick={() => setExpanded(true)} style={{marginTop:'14px',display:'flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.06)',border:`1px solid rgba(255,255,255,0.12)`,padding:'9px 18px',cursor:'pointer',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:'rgba(250,248,243,0.6)'}}>
            <span style={{color:C.lime}}>+{hidden}</span> more items included <span style={{opacity:0.5}}>↓</span>
          </button>
        )}

        {/* CTA */}
        <div style={{marginTop:'28px',borderTop:`1px solid rgba(255,255,255,0.1)`,paddingTop:'24px'}}>
          <p className="gate-value-line" style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',marginBottom:'20px',lineHeight:1.6}}>
            Members receive the complete framework document — all scoring criteria, sector pathway maps, policy alignment analysis, and quarterly intelligence updates — across all 23 publications in the General Series.
          </p>
          <div className="gate-cta-row" style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'stretch',marginBottom:'14px'}}>
            <a href="#" style={{display:'flex',alignItems:'center',gap:'10px',background:C.lime,color:C.ink,padding:'14px 26px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',flex:'1',minWidth:'200px',justifyContent:'center'}}>
              Apply for Members Access <span style={{fontSize:'14px',fontWeight:900}}>→</span>
            </a>
            <a href="#" style={{display:'flex',alignItems:'center',gap:'10px',background:'rgba(255,255,255,0.07)',border:`1px solid rgba(255,255,255,0.18)`,color:C.paper,padding:'14px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,textDecoration:'none',flex:'1',minWidth:'180px',justifyContent:'center'}}>
              <span style={{opacity:0.7}}>↓</span> Download This Summary
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── GHANA FIRST CALLOUT ───────────────────────────────────────────────────────
const GhanaFirst = () => (
  <div className="pad-gate" style={{background:C.ink,padding:'48px 64px 40px',position:'relative',overflow:'hidden'}}>
    {/* BG watermark */}
    <div style={{position:'absolute',right:'-20px',bottom:'-40px',fontFamily:F.display,fontSize:'clamp(80px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.025)',pointerEvents:'none',userSelect:'none',letterSpacing:'-6px',lineHeight:1}}>GH</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
      <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>A Note on Whose Flourishing</div>
      <p style={{fontFamily:F.display,fontSize:'clamp(18px,2.6vw,26px)',fontWeight:700,fontStyle:'italic',color:C.paper,lineHeight:1.50,marginBottom:'24px',maxWidth:'620px'}}>
        BRIDGE is a Ghana-first institution. Every venture we evaluate, every resource we mobilise, and every partnership we structure is measured against one standard: does this advance the flourishing of Ghanaian citizens?
      </p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',borderTop:`1px solid rgba(255,255,255,0.08)`,paddingTop:'24px'}} className="tc">
        <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.50)',lineHeight:1.78,margin:0,fontWeight:300}}>
          Diaspora capital, expertise, and international networks are powerful instruments — deployed in service of that mission, not as the mission itself. The diaspora is a bridge, not the destination.
        </p>
        <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.50)',lineHeight:1.78,margin:0,fontWeight:300}}>
          Success is measured by whether Ghanaian people are living with more dignity, more security, and within more thriving communities than they were before BRIDGE arrived. Everything else is instrumental to that single end.
        </p>
      </div>
    </div>
  </div>
);

// ── FOOTER ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <div className="pad-footer" style={{background:C.forest,padding:'16px 64px',borderTop:`3px solid ${C.lime}`}}>
    <div className="footer-inner" style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={18} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.15)'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>General Series · Doc 02/23 · bridgepbc.com</div>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'14px'}}>
        {['All Documents','Methodology','Members','Contact'].map((l,i) => (
          <a key={i} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.35)'}}>{l}</a>
        ))}
      </div>
    </div>
  </div>
);

// ── MOBILE READER ────────────────────────────────────────────────────────────
// A dedicated chapter-by-chapter reader for phones.
// Desktop renders the full scroll layout unchanged.

const MOB_CHAPTERS_PUB = [
  {
    id: 'cover',
    title: 'Peace & Prosperity',
    label: 'Overview',
    bg: C.ink,
    render: () => (
      <div style={{minHeight:'100%',display:'flex',flexDirection:'column',padding:'28px 20px 32px'}}>
        {/* Eyebrow */}
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'32px'}}>
          <Logo height={16} variant="white"/>
          <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.2)',flexShrink:0}}/>
          <span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',color:C.lime,background:'rgba(184,217,53,0.12)',border:'1px solid rgba(184,217,53,0.3)',padding:'2px 7px'}}>PUBLIC</span>
        </div>
        {/* Headline */}
        <div style={{flex:1}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',marginBottom:'8px'}}>General Series · Doc 02/23 · March 2026</div>
          <h1 style={{fontFamily:F.display,fontSize:'52px',fontWeight:900,lineHeight:1.0,color:C.paper,letterSpacing:'-0.02em',marginBottom:'4px'}}>Peace &</h1>
          <h1 style={{fontFamily:F.display,fontSize:'52px',fontWeight:900,lineHeight:1.0,color:C.lime,letterSpacing:'-0.02em',marginBottom:'24px'}}>Prosperity</h1>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.80,color:'rgba(250,248,243,0.60)',fontWeight:300,marginBottom:'28px'}}>
            The philosophical foundation behind everything BRIDGE does — what dignity, security, and thriving mean in measurable terms, and why these are the only outcomes that matter for Ghana's development.
          </p>
          {/* Pillar pills */}
          <div style={{marginBottom:'24px'}}>
            {[
              {label:'Peace', items:['Physical Security','Economic Security','Social Cohesion','Political Stability','Psychological Security']},
              {label:'Prosperity', items:['Material Sufficiency','Human Capability','Freedom of Choice','Intergenerational Advancement']},
            ].map(p => (
              <div key={p.label} style={{marginBottom:'12px'}}>
                <div style={{fontFamily:F.display,fontSize:'13px',fontWeight:700,fontStyle:'italic',color:C.lime,marginBottom:'6px'}}>{p.label}</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
                  {p.items.map(item => (
                    <span key={item} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(250,248,243,0.50)',background:'rgba(255,255,255,0.07)',padding:'3px 8px'}}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Policy tag */}
          <div style={{display:'flex',gap:'10px',background:'rgba(184,217,53,0.07)',border:'1px solid rgba(184,217,53,0.15)',padding:'12px 14px'}}>
            <div style={{width:'2px',background:C.lime,flexShrink:0}}/>
            <p style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.50)',lineHeight:1.65,margin:0}}>
              <strong style={{color:C.lime,fontWeight:700}}>Aligned with:</strong> Ghana 2026 Budget · Sankofa Initiative · 24-Hour Economy · SDGs 1, 3, 4, 8, 10, 11
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'exec',
    title: 'Executive Summary',
    label: 'Summary',
    bg: C.paper,
    render: () => (
      <div style={{padding:'28px 20px 32px'}}>
        <div style={{width:'32px',height:'3px',background:C.lime,marginBottom:'8px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'20px'}}>Executive Summary</div>
        <p style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'20px'}}>
          Peace &amp; Prosperity is BRIDGE PBC's foundational framework for measuring what development is actually for. It holds that GDP growth, income averages, and FDI inflows are means to an end, not ends in themselves.
        </p>
        <p style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'24px'}}>
          The end is whether Ghanaian citizens can live lives they genuinely value.
        </p>
        <div style={{background:C.paperDark,borderLeft:`3px solid ${C.lime}`,padding:'16px 18px'}}>
          <p style={{fontFamily:F.body,fontSize:'14px',lineHeight:1.80,color:C.muted,fontWeight:300,margin:0}}>
            This public summary covers the foundational argument — why standard metrics fail, what Peace means across five dimensions, and how both pillars connect to every investment decision. The complete framework is available to members.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'start',
    title: 'A Different Starting Point',
    label: 'Starting Point',
    bg: C.paperDark,
    render: () => (
      <div style={{padding:'28px 20px 32px'}}>
        <div style={{width:'32px',height:'3px',background:C.lime,marginBottom:'8px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>I — A Different Starting Point</div>
        <h2 style={{fontFamily:F.display,fontSize:'26px',fontWeight:700,lineHeight:1.18,color:C.ink,marginBottom:'20px'}}>Most development organisations measure success in the language of economics.</h2>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'16px'}}>
          GDP growth. Employment figures. FDI inflows. These numbers matter — BRIDGE uses them as inputs. But they are incomplete measures of what people actually need, and optimising for them alone can grow an economy while leaving most of its people behind.
        </p>
        <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'18px',margin:'24px 0'}}>
          <p style={{fontFamily:F.display,fontSize:'18px',fontWeight:600,fontStyle:'italic',lineHeight:1.55,color:C.forest,margin:0}}>
            Economic indicators are means, not ends. The end is whether Ghanaian citizens can live lives they value — with dignity, with security, and within communities that are genuinely thriving.
          </p>
        </div>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
          This draws on the Capability Approach by Amartya Sen and Martha Nussbaum: development should be measured by what people are able to do and be — not merely by what they own or earn.
        </p>
      </div>
    ),
  },
  {
    id: 'peace',
    title: 'What BRIDGE Means by Peace',
    label: 'Peace',
    bg: C.paper,
    render: () => {
      const [active, setActive] = useState(0);
      return (
        <div style={{padding:'28px 20px 32px'}}>
          <div style={{width:'32px',height:'3px',background:C.lime,marginBottom:'8px'}}/>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>II — What BRIDGE Means by Peace</div>
          <h2 style={{fontFamily:F.display,fontSize:'26px',fontWeight:700,lineHeight:1.18,color:C.ink,marginBottom:'8px'}}>Not the absence of war. A comprehensive condition.</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',lineHeight:1.75,color:C.muted,marginBottom:'20px',fontWeight:300}}>Peace comprises five dimensions. Tap each to explore.</p>
          {/* Dimension selector */}
          <div style={{display:'flex',gap:'4px',marginBottom:'16px',overflowX:'auto',paddingBottom:'2px'}}>
            {PEACE_DIMS.map((d, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'0.5px',
                padding:'6px 10px',border:`1px solid ${active===i ? C.forest : C.border}`,
                background:active===i ? C.forest : 'transparent',
                color:active===i ? C.lime : C.muted,
                cursor:'pointer',whiteSpace:'nowrap',flexShrink:0,transition:'all 0.15s',
              }}>{d.label}</button>
            ))}
          </div>
          {/* Active dimension card */}
          <div style={{background:C.paperDark,borderLeft:`3px solid ${C.lime}`,padding:'18px 16px',minHeight:'120px',transition:'opacity 0.2s'}}>
            <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.forest,marginBottom:'10px'}}>{PEACE_DIMS[active].label}</div>
            <p style={{fontFamily:F.body,fontSize:'14px',lineHeight:1.80,color:C.ink,fontWeight:300,margin:0}}>{PEACE_DIMS[active].body}</p>
          </div>
          {/* Dot indicators */}
          <div style={{display:'flex',gap:'6px',justifyContent:'center',marginTop:'16px'}}>
            {PEACE_DIMS.map((_,i) => (
              <div key={i} onClick={() => setActive(i)} style={{width:i===active?'24px':'8px',height:'8px',borderRadius:'4px',background:i===active?C.lime:C.border,cursor:'pointer',transition:'all 0.3s ease'}}/>
            ))}
          </div>
          {/* Closing */}
          <div style={{background:C.forest,padding:'18px 16px',marginTop:'20px'}}>
            <p style={{fontFamily:F.display,fontSize:'15px',fontWeight:600,fontStyle:'italic',color:C.paper,lineHeight:1.60,margin:0}}>
              Peace creates the stable foundation from which everything else becomes possible: long-term planning, investment in children's futures, and the kind of hope that drives people to build rather than merely endure.
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'prosperity',
    title: 'What BRIDGE Means by Prosperity',
    label: 'Prosperity',
    bg: C.paperDark,
    render: () => (
      <div style={{padding:'28px 20px 32px'}}>
        <div style={{width:'32px',height:'3px',background:C.lime,marginBottom:'8px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>III — What BRIDGE Means by Prosperity</div>
        <h2 style={{fontFamily:F.display,fontSize:'26px',fontWeight:700,lineHeight:1.18,color:C.ink,marginBottom:'16px'}}>Material sufficiency is necessary. It is not sufficient.</h2>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'24px'}}>
          True prosperity includes the capability to pursue aspirations — not merely to survive. Not just what people have, but what they are able to do and be.
        </p>
        <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
          {[
            {n:'01',l:'Material Sufficiency',d:'Income, shelter, nutrition, water, energy, and transport. The necessary floor.'},
            {n:'02',l:'Human Capability',d:'Education, health, and skills that compound over time.'},
            {n:'03',l:'Freedom of Choice',d:'Real agency over work, family, and life direction.'},
            {n:'04',l:'Intergenerational Advancement',d:'Each generation building on the last. Advantages passed forward.'},
          ].map((item,i) => (
            <div key={i} style={{background:C.paper,padding:'14px 16px',display:'flex',gap:'14px',alignItems:'flex-start'}}>
              <span style={{fontFamily:F.mono,fontSize:'16px',fontWeight:500,color:C.lime,flexShrink:0,lineHeight:1}}>{item.n}</span>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.forest,marginBottom:'4px'}}>{item.l}</div>
                <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,margin:0,lineHeight:1.65,fontWeight:300}}>{item.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'18px',marginTop:'20px'}}>
          <p style={{fontFamily:F.display,fontSize:'16px',fontWeight:600,fontStyle:'italic',lineHeight:1.55,color:C.forest,margin:0}}>
            Prosperity means not just having resources, but being able to use them to pursue lives people value. The difference between surviving and thriving.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'gate',
    title: 'Members Access',
    label: 'Members',
    bg: C.forest,
    render: () => {
      const [expanded, setExpanded] = useState(false);
      const PREVIEW = 4;
      const visible = expanded ? GATE_ITEMS : GATE_ITEMS.slice(0, PREVIEW);
      const hidden = GATE_ITEMS.length - PREVIEW;
      return (
        <div style={{padding:'28px 20px 32px',minHeight:'100%',display:'flex',flexDirection:'column'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>BRIDGE MEMBERS · FULL ACCESS</div>
          <h2 style={{fontFamily:F.display,fontSize:'24px',fontWeight:700,fontStyle:'italic',color:C.paper,lineHeight:1.25,marginBottom:'20px'}}>
            The complete Peace &amp; Prosperity Framework includes:
          </h2>
          <div style={{flex:1,marginBottom:'20px'}}>
            {visible.map((item, i) => (
              <div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
                <span style={{color:C.lime,fontFamily:F.sans,fontSize:'12px',fontWeight:700,flexShrink:0,lineHeight:1.6}}>→</span>
                <span style={{fontFamily:F.body,fontSize:'13px',color:'rgba(250,248,243,0.72)',lineHeight:1.55}}>{item}</span>
              </div>
            ))}
            {!expanded && hidden > 0 && (
              <button onClick={() => setExpanded(true)} style={{marginTop:'12px',display:'flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'8px 14px',cursor:'pointer',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:'rgba(250,248,243,0.6)'}}>
                <span style={{color:C.lime}}>+{hidden}</span> more included <span style={{opacity:0.5}}>↓</span>
              </button>
            )}
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:'20px',display:'flex',flexDirection:'column',gap:'8px'}}>
            <a href="#" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',background:C.lime,color:C.ink,padding:'14px 20px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none'}}>
              Apply for Members Access →
            </a>
            <a href="#" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.18)',color:C.paper,padding:'13px 20px',fontFamily:F.sans,fontSize:'13px',fontWeight:700,textDecoration:'none'}}>
              ↓ Download This Summary
            </a>
          </div>
        </div>
      );
    },
  },
  {
    id: 'ghana',
    title: 'Ghana First',
    label: 'Ghana First',
    bg: C.ink,
    render: () => (
      <div style={{padding:'28px 20px 32px',minHeight:'100%',display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>A Note on Whose Flourishing</div>
        <p style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,fontStyle:'italic',color:C.paper,lineHeight:1.45,marginBottom:'24px'}}>
          BRIDGE is a Ghana-first institution. Every venture we evaluate, every resource we mobilise, every partnership we structure — measured against one standard: does this advance the flourishing of Ghanaian citizens?
        </p>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'20px',display:'flex',flexDirection:'column',gap:'14px'}}>
          <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.52)',lineHeight:1.78,margin:0,fontWeight:300}}>
            Diaspora capital, expertise, and international networks are powerful instruments — deployed in service of that mission, not as the mission itself. The diaspora is a bridge, not the destination.
          </p>
          <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.52)',lineHeight:1.78,margin:0,fontWeight:300}}>
            Success is whether Ghanaian people are living with more dignity, more security, and within more thriving communities than they were before BRIDGE arrived. Everything else is instrumental to that single end.
          </p>
        </div>
        {/* Logo sign-off */}
        <div style={{marginTop:'32px',paddingTop:'20px',borderTop:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Logo height={16} variant="white"/>
          <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.25)'}}>bridgepbc.com</span>
        </div>
      </div>
    ),
  },
];

// ── MOBILE READER SHELL ───────────────────────────────────────────────────────
const MobileReader = ({chapters}) => {
  const [current, setCurrent] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [dir, setDir] = useState(1); // 1=forward, -1=back (for animation hint)
  const ch = chapters[current];
  const total = chapters.length;

  const go = (idx) => {
    if (idx < 0 || idx >= total) return;
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
    setNavOpen(false);
  };

  return (
    <div style={{position:'fixed',inset:0,background:ch.bg,display:'flex',flexDirection:'column',transition:'background 0.3s ease',fontFamily:F.body,overflow:'hidden'}}>
      {/* ── Top bar ── */}
      <div style={{flexShrink:0,background:'rgba(0,0,0,0.18)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',zIndex:10}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <Logo height={14} variant="white"/>
        </div>
        {/* Chapter title + jump */}
        <button onClick={() => setNavOpen(o => !o)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',padding:'4px 0'}}>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:'rgba(250,248,243,0.7)',letterSpacing:'0.3px',maxWidth:'160px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ch.title}</span>
          <span style={{fontSize:'10px',color:'rgba(250,248,243,0.4)',transform:navOpen?'rotate(180deg)':'none',transition:'transform 0.2s',display:'inline-block'}}>▾</span>
        </button>
        {/* Progress */}
        <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:500,color:'rgba(250,248,243,0.4)',letterSpacing:'0.5px'}}>{current+1}/{total}</div>
      </div>

      {/* ── Progress bar ── */}
      <div style={{flexShrink:0,height:'2px',background:'rgba(255,255,255,0.08)'}}>
        <div style={{height:'100%',width:`${((current+1)/total)*100}%`,background:C.lime,transition:'width 0.35s ease'}}/>
      </div>

      {/* ── Chapter nav overlay ── */}
      {navOpen && (
        <div style={{position:'absolute',top:'44px',left:0,right:0,zIndex:20,background:C.ink,borderBottom:`2px solid ${C.lime}`,padding:'8px 0',maxHeight:'55vh',overflowY:'auto'}}>
          {chapters.map((c, i) => (
            <button key={c.id} onClick={() => go(i)} style={{width:'100%',display:'flex',alignItems:'center',gap:'12px',padding:'12px 16px',background:'none',border:'none',cursor:'pointer',borderBottom:'1px solid rgba(255,255,255,0.06)',textAlign:'left'}}>
              <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:i===current?C.lime:C.faint,width:'20px',flexShrink:0}}>{String(i+1).padStart(2,'0')}</span>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:i===current?700:400,color:i===current?C.paper:'rgba(250,248,243,0.5)'}}>{c.label}</span>
              {i===current && <span style={{marginLeft:'auto',width:'6px',height:'6px',borderRadius:'50%',background:C.lime,flexShrink:0}}/>}
            </button>
          ))}
        </div>
      )}

      {/* ── Content area ── */}
      <div key={ch.id} style={{flex:1,overflowY:'auto',WebkitOverflowScrolling:'touch',paddingBottom:'env(safe-area-inset-bottom,16px)'}}>
        <ch.render/>
      </div>

      {/* ── Bottom navigation ── */}
      <div style={{flexShrink:0,background:'rgba(0,0,0,0.22)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',padding:'10px 16px',paddingBottom:`calc(10px + env(safe-area-inset-bottom,0px))`,display:'flex',alignItems:'center',justifyContent:'space-between',zIndex:10,borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        {/* Prev */}
        <button onClick={() => go(current-1)} disabled={current===0} style={{background:current===0?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.10)',border:'1px solid rgba(255,255,255,0.1)',color:current===0?'rgba(250,248,243,0.2)':'rgba(250,248,243,0.8)',padding:'9px 16px',cursor:current===0?'default':'pointer',fontFamily:F.sans,fontSize:'11px',fontWeight:700,display:'flex',alignItems:'center',gap:'6px',transition:'all 0.15s'}}>
          ← Prev
        </button>

        {/* Chapter dots */}
        <div style={{display:'flex',gap:'5px',alignItems:'center'}}>
          {chapters.map((_,i) => (
            <div key={i} onClick={() => go(i)} style={{width:i===current?'20px':'6px',height:'6px',borderRadius:'3px',background:i===current?C.lime:'rgba(255,255,255,0.2)',cursor:'pointer',transition:'all 0.3s ease'}}/>
          ))}
        </div>

        {/* Next */}
        <button onClick={() => go(current+1)} disabled={current===total-1} style={{background:current===total-1?'rgba(255,255,255,0.04)':C.lime,border:'none',color:current===total-1?'rgba(250,248,243,0.2)':C.ink,padding:'9px 16px',cursor:current===total-1?'default':'pointer',fontFamily:F.sans,fontSize:'11px',fontWeight:800,display:'flex',alignItems:'center',gap:'6px',transition:'all 0.15s'}}>
          Next →
        </button>
      </div>
    </div>
  );
};

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function PeaceProsperityDoc() {
  const [isMobile, setIsMobile] = useState(false);
  const coverLogoRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) return (
    <>
      <Gf/>
      <MobileReader chapters={MOB_CHAPTERS_PUB}/>
    </>
  );

  return (
    <div style={{fontFamily:F.body,background:C.paper}}>
      <Gf/>
      <TopBar coverLogoRef={coverLogoRef}/>
      <Cover logoRef={coverLogoRef}/>
      <Executive/>
      <SectionStartingPoint/>
      <SectionPeace/>
      <Gate/>
      <GhanaFirst/>
      <Footer/>
    </div>
  );
}
