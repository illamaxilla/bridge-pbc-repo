import { useEffect, useRef, useState } from "react";
import { DOC_COLORS as C, DOC_FONTS as F } from "@/lib/document-tokens";
import DocumentGlobalStyles from "@/components/documents/DocumentGlobalStyles";
import DocumentLogo from "@/components/documents/DocumentLogo";

// ── EXTRA PAGE-SPECIFIC STYLES ────────────────────────────────────────────────
const EXTRA_CSS = `
  .dc::first-letter{font-size:4.2em;margin:0.08em 0.12em 0 0;}
  a{color:inherit;text-decoration:none;}
  @media(max-width:600px){
    .mob-stack{gap:12px!important;}
    .gate-cta-row a{justify-content:center!important;}
    .gate-value-line{display:none!important;}
    .exec-grid{grid-template-columns:1fr!important;}
    .sector-desktop{display:none!important;}
    .stats-row>div{flex:0 0 calc(50% - 1px)!important;}
  }
`;

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
          <DocumentLogo height={20} variant="dark"/>
          <div style={{width:'1px',height:'16px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,letterSpacing:'0.3px'}}>General Series · Doc 02/23 · Peace &amp; Prosperity Framework</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest}}>Peace &amp; Prosperity</span>
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,background:C.forest,border:`1px solid ${C.teal}`,padding:'4px 9px'}}>MEMBERS</span>
        <a href="#" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>My Account →</a>
        <a href="#" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'0.3px'}}>All Docs →</a>
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

const DOMAINS = [
  {
    num: '01',
    title: 'Individual Dignity',
    marker: 'When a person has meaningful work, genuine agency, and the skills to shape their own future.',
    body: 'BRIDGE investments contribute to individual dignity by creating employment that is not merely a paycheck but a path — work that develops capability, provides stability, and opens doors to further opportunity. By supporting ventures that train Ghanaian workers in skills that persist beyond any single employer. And by expanding the real options available to individuals, particularly young Ghanaians, so that ambition has somewhere meaningful to go.',
    measure: 'Not a headcount of jobs created. Whether people who engage with BRIDGE ventures are more capable, more secure, and more able to direct their own lives than they were before.',
  },
  {
    num: '02',
    title: 'Family Security',
    marker: 'When a household can meet its needs, withstand shocks, and build assets — not just get through today.',
    body: "Ghana's households face a persistent combination of income volatility, limited financial tools, and inadequate access to affordable healthcare, education, and essential services. BRIDGE investments target this fragility directly — through financial inclusion, health systems, energy access, and agricultural value chain improvements that reduce income seasonality and build household resilience.",
    measure: 'Not aggregate income data. Whether families are less vulnerable than they were — whether the safety net beneath daily life is structurally stronger.',
  },
  {
    num: '03',
    title: 'Community Thriving',
    marker: 'When the social, economic, and institutional fabric of a community is strengthening across generations.',
    body: "This domain captures what economists call multiplier effects — but it is about more than money cycling through a local economy. It is about whether a community's institutions are stronger, its young people more hopeful, its social connections more resilient, and its collective capacity to solve shared problems more robust than before.",
    measure: 'Not a single metric. A constellation: local business formation rates, youth retention, institutional strength, community trust indicators, and how broadly the benefits of development are shared across households and generations.',
  },
];

const SECTOR_MAP = [
  { sector: '01', name: 'Infrastructure & Basic Services', ministry: 'Roads, Works & Housing', connection: 'Physical foundations enabling all economic activity; vendor dignity through market infrastructure' },
  { sector: '02', name: 'Financial Inclusion & Security', ministry: 'Finance', connection: 'Family security through credit, savings, insurance; household resilience' },
  { sector: '03', name: 'Health Systems & Wellbeing', ministry: 'Health', connection: 'Family security through quality care; individual capability through health workforce retention' },
  { sector: '04', name: 'Technology & Innovation', ministry: 'Communications & Digitisation', connection: 'Individual dignity through digital skills and opportunity; productivity across all sectors' },
  { sector: '05', name: 'Education & Skills', ministry: 'Education', connection: 'Individual dignity and capability; intergenerational community thriving through skilled workforce' },
  { sector: '06', name: 'Agriculture & Value Chains', ministry: 'Agriculture', connection: 'Family income security; rural community economic resilience' },
  { sector: '07', name: 'Sports, Entertainment & Creative', ministry: 'Tourism, Arts & Culture', connection: 'Individual dignity through creative economy; cultural community cohesion' },
  { sector: '08', name: 'Housing & Real Estate', ministry: 'Works & Housing', connection: 'Family security through stable, affordable shelter; community stability foundations' },
  { sector: '09', name: 'Tourism & Hospitality', ministry: 'Tourism, Arts & Culture', connection: 'Community economic thriving; dignity through heritage preservation and skilled employment' },
  { sector: '10', name: 'Energy & Renewable Resources', ministry: 'Energy', connection: 'Family security and community productivity through reliable, affordable power' },
  { sector: '11', name: 'Manufacturing & Light Industry', ministry: 'Trade & Industry', connection: 'Individual dignity through quality formal employment; community economic diversification' },
  { sector: '12', name: 'Transportation & Logistics', ministry: 'Roads, Transport & Highways', connection: 'Enabling infrastructure connecting sectors, households, and communities across Ghana' },
];

const POLICY_ALIGN = [
  {
    framework: 'Ghana 2026 National Budget',
    ref: 'Budget Statement 2026',
    alignment: "The 2026 Budget prioritises infrastructure, agriculture modernisation, education, and financial inclusion — the same four areas where BRIDGE has the deepest portfolio commitments. Private capital structured through BRIDGE vehicles is designed to complement, not compete with, these public allocations: each GHS the government invests in a priority sector creates the enabling conditions that make BRIDGE ventures viable.",
    tags: ['Infrastructure', 'Agriculture', 'Education', 'Financial Inclusion'],
  },
  {
    framework: 'Sankofa Initiative',
    ref: 'GoG Policy Framework',
    alignment: "The Sankofa Initiative explicitly calls for diaspora to be structured development partners — not passive remittance senders. BRIDGE's capital architecture was designed to operationalise this vision: tiered membership structures allow diaspora members to participate as Tier 2 Network Members, Tier 3 Professional Contributors, or Tier 4 Investors, each with governance rights proportional to their commitment.",
    tags: ['Diaspora Partnership', 'Capital Structures', 'Network Governance'],
  },
  {
    framework: '24-Hour Economy Framework',
    ref: '24HE Policy Document',
    alignment: "The 24-Hour Economy Framework requires a specific productivity infrastructure: reliable energy for extended operations, logistics systems connecting production to markets, manufacturing capacity for domestic goods, and a skilled workforce across multiple shifts. BRIDGE's Energy, Transportation & Logistics, Manufacturing, and Education sectors map precisely to the conditions this framework requires to function.",
    tags: ['Energy', 'Logistics', 'Manufacturing', 'Skills'],
  },
  {
    framework: 'UN Sustainable Development Goals',
    ref: 'UN SDG Framework 2030',
    alignment: "Peace & Prosperity maps directly to six SDGs: SDG 1 (No Poverty) through income security and household resilience; SDG 3 (Good Health) through health systems investment and workforce retention; SDG 4 (Quality Education) through skills development and TVET; SDG 8 (Decent Work) through quality employment creation; SDG 10 (Reduced Inequalities) through financial inclusion; and SDG 11 (Sustainable Cities) through housing and infrastructure.",
    tags: ['SDG 1', 'SDG 3', 'SDG 4', 'SDG 8', 'SDG 10', 'SDG 11'],
  },
];

// ── COVER ─────────────────────────────────────────────────────────────────────
const Cover = ({logoRef}) => (
  <div style={{background:C.ink}}>
    <div className="pad-cover" style={{padding:'24px 64px 0'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
      {/* Eyebrow */}
      <div ref={logoRef} style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'56px'}}>
        <DocumentLogo height={22} variant="white"/>
        <div style={{width:'1px',height:'18px',background:'rgba(255,255,255,0.15)',flexShrink:0}}/>
        <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)'}}>General Series</span>
        <div className="mob-hide" style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.1)',flexShrink:0}}/>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',letterSpacing:'0.5px',color:'rgba(250,248,243,0.22)'}}>Document No. 02 of 23 · March 2026</span>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:C.lime,background:'rgba(184,217,53,0.15)',border:'1px solid rgba(184,217,53,0.4)',padding:'3px 9px'}}>MEMBERS</span>
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
          The framework defines Peace across five dimensions and Prosperity as material sufficiency plus human capability. It organises outcomes into three measurable domains and maps each of BRIDGE's 12 sectors to specific Peace &amp; Prosperity pathways. Every BRIDGE investment is evaluated and reported against this framework.
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
          <span>View all five dimensions</span>
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
const PROSPERITY_CAPS = [
  { label: 'Education & Learning', body: 'Not credentials — actual capability enhancement. Knowledge and skills that compound over a lifetime and transfer to the next generation.' },
  { label: 'Health & Vitality', body: 'Physical and mental health enabling full participation in economic, social, and family life — not just absence of acute illness.' },
  { label: 'Meaningful Employment', body: 'Work that develops capability, provides dignity, and opens doors — not just income. The difference between a paycheck and a path.' },
  { label: 'Political Voice', body: 'Participation in decisions affecting one\'s life. Not subjection to choices made by others, but genuine collective self-governance.' },
  { label: 'Social Recognition', body: 'Freedom from systematic disrespect and marginalization in daily interactions — dignity as a baseline, not an aspiration.' },
  { label: 'Agency & Choice', body: 'The ability to make meaningful decisions about work, family, residence, and life direction rather than being constrained by circumstance.' },
];

const SectionProsperity = () => (
  <div className="pad-section" style={{background:C.paperDark,padding:'48px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <Rule/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'20px'}}>III — What BRIDGE Means by Prosperity</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.2vw,40px)',fontWeight:700,lineHeight:1.15,color:C.ink,marginBottom:'28px'}}>Material sufficiency is necessary. It is not sufficient.</h2>

      <div className="tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',marginBottom:'44px'}}>
        <div>
          <p style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>
            GDP can grow while most citizens' lives stagnate or worsen. Aggregate income can increase while distribution becomes more unequal. Economic statistics can improve while human experience does not.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
            Drawing on Amartya Sen's capability approach, BRIDGE holds that prosperity requires not just material conditions but the real freedoms to achieve states of being and doing that people have reason to value.
          </p>
        </div>
        <div>
          <p style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>
            A venture that creates employment but traps workers in precarious, low-skill roles does not score well on Prosperity. The question is never just "does this provide something?" — it is "does this genuinely expand what Ghanaians are able to do and be?"
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
            Prosperity also has an intergenerational dimension. True prosperity enables passing advantages to children — education building on parents' achievements, assets accumulated rather than consumed, social capital maintained rather than depleted.
          </p>
        </div>
      </div>

      {/* Material sufficiency strip */}
      <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Material Sufficiency — Necessary Foundation</div>
      <div className="stats-row" style={{display:'flex',flexWrap:'wrap',gap:'2px',marginBottom:'32px'}}>
        {[
          {n:'01', l:'Income & Housing', d:'Sufficient income with margin for dignity; stable, safe shelter that is a home, not just a roof.'},
          {n:'02', l:'Nutrition & Health', d:'Adequate food enabling development; clean water and sanitation preventing disease before it starts.'},
          {n:'03', l:'Energy & Connectivity', d:'Reliable electricity and internet enabling productivity, education, and participation in modern economic life.'},
          {n:'04', l:'Transportation Access', d:'Ability to reach jobs, markets, services, and relationships beyond immediate geography.'},
        ].map((item, i) => (
          <div key={i} style={{flex:'1 1 calc(25% - 2px)',minWidth:'160px',background:C.paper,padding:'18px 16px',borderTop:`3px solid ${C.lime}`}}>
            <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:500,color:C.lime,marginBottom:'6px'}}>{item.n}</div>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,letterSpacing:'0.3px',marginBottom:'8px',lineHeight:1.3}}>{item.l}</div>
            <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,margin:0,lineHeight:1.65,fontWeight:300}}>{item.d}</p>
          </div>
        ))}
      </div>

      {/* Capability dimensions */}
      <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Capability Development — The Differentiator</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px'}} className="tc">
        {PROSPERITY_CAPS.map((cap, i) => (
          <div key={i} style={{background:C.paper,borderLeft:`3px solid ${C.lime}`,padding:'16px 18px'}}>
            <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.forest,marginBottom:'6px'}}>{cap.label}</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.72,color:C.ink,fontWeight:300,margin:0}}>{cap.body}</p>
          </div>
        ))}
      </div>

      <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'24px',marginTop:'32px'}}>
        <p style={{fontFamily:F.display,fontSize:'17px',fontWeight:600,fontStyle:'italic',lineHeight:1.58,color:C.forest,margin:0}}>
          Prosperity, fully realized, means not just having resources but being able to use them to pursue lives people value. It is the difference between surviving and thriving — between accommodation to poverty and genuine transformation toward flourishing.
        </p>
      </div>
    </div>
  </div>
);

// ── SECTION IV — THREE DOMAINS ────────────────────────────────────────────────
const SectionDomains = () => (
  <div className="pad-section" style={{background:C.paper,padding:'48px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <Rule/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'20px'}}>IV — The Three Domains of Flourishing</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.2vw,40px)',fontWeight:700,lineHeight:1.15,color:C.ink,marginBottom:'16px'}}>How BRIDGE measures outcomes.</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.80,color:C.muted,marginBottom:'44px',fontWeight:300}}>
        These three domains translate Peace &amp; Prosperity from philosophy into measurable investment criteria, scoring parameters, and impact reporting standards. Every BRIDGE investment is assessed against all three.
      </p>

      {DOMAINS.map((d, i) => (
        <div key={i} style={{marginBottom:'40px',paddingBottom:'40px',borderBottom:i < DOMAINS.length-1 ? `1px solid ${C.border}` : 'none'}}>
          <div style={{display:'flex',alignItems:'baseline',gap:'16px',marginBottom:'14px'}}>
            <span style={{fontFamily:F.mono,fontSize:'48px',fontWeight:500,color:C.lime,lineHeight:1}}>{d.num}</span>
            <h3 style={{fontFamily:F.display,fontSize:'clamp(18px,2.4vw,28px)',fontWeight:700,color:C.ink,margin:0}}>{d.title}</h3>
          </div>
          <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'16px',marginBottom:'16px'}}>
            <p style={{fontFamily:F.body,fontSize:'14px',fontStyle:'italic',fontWeight:600,color:C.forest,margin:0,lineHeight:1.6}}>{d.marker}</p>
          </div>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>{d.body}</p>
          <div style={{background:C.paperDark,border:`1px solid ${C.border}`,padding:'14px 18px',display:'flex',gap:'14px',alignItems:'flex-start'}}>
            <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.forest,whiteSpace:'nowrap',paddingTop:'2px'}}>Measured By</span>
            <p style={{fontFamily:F.body,fontSize:'13px',color:C.muted,margin:0,lineHeight:1.65,fontWeight:300,fontStyle:'italic'}}>{d.measure}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── SECTION V — THREE-TIER MEASUREMENT FRAMEWORK ─────────────────────────────
const TIERS = [
  {
    tier: 'Tier 1',
    label: 'Peace & Prosperity Outcomes',
    role: 'Ultimate Purpose',
    bg: C.forest,
    accent: C.lime,
    textMain: C.paper,
    textSub: 'rgba(250,248,243,0.65)',
    groups: [
      { g: 'Family Security', items: ['Income reliability and emergency reserves', 'Housing tenure stability and quality conditions', 'Health access without financial catastrophe', 'Children attending and progressing in school'] },
      { g: 'Individual Agency', items: ['Meaningful work with fair treatment and growth', 'Ability to start and grow a business', 'Skills and capabilities growing over time', 'Life satisfaction and hope for the future'] },
      { g: 'Community Thriving', items: ['Trust, cooperation, and collective action capacity', 'Local business formation and employment depth', 'Infrastructure and services improving community life', 'Each generation advancing beyond the last'] },
    ],
    note: 'Measured through household surveys, community assessments, and longitudinal tracking. Harder to measure than simpler metrics — and infinitely more important.',
  },
  {
    tier: 'Tier 2',
    label: 'Development Indicators',
    role: 'Evidence of Progress',
    bg: C.ink,
    accent: C.lime,
    textMain: C.paper,
    textSub: 'rgba(250,248,243,0.55)',
    groups: [
      { g: 'Economic Development', items: ['Jobs created and sustained across sectors', 'Income levels and earning trajectory', 'Businesses formed, growing, and surviving', 'Financial inclusion and credit access expanded'] },
      { g: 'Social Development', items: ['Healthcare access and quality improved', 'Education attainment and completion rates', 'Skills developed and matched to market demand', 'Youth opportunity and gender equity advanced'] },
      { g: 'Community Development', items: ['Infrastructure improved and maintained', 'Brain drain reduced; return migration increased', 'Diaspora engagement deepened and productively structured', 'Local institutions strengthened and trusted'] },
    ],
    note: 'These indicators provide evidence that activities are creating changes that should — if our theory of change is correct — lead to Tier 1 outcomes. If Tier 2 improves but Tier 1 does not, the theory of change is wrong and must be revised.',
  },
  {
    tier: 'Tier 3',
    label: 'Operational Metrics',
    role: 'Business Performance',
    bg: C.paperDark,
    accent: C.forest,
    textMain: C.ink,
    textSub: C.muted,
    groups: [
      { g: 'Financial Performance', items: ['Capital raised and deployed on schedule', 'Portfolio company performance vs projections', 'Revenue, cost control, and path to sustainability', 'Returns to investors across vehicles'] },
      { g: 'Operational Execution', items: ['Projects launched and milestones achieved', 'Network members actively engaged', 'Partnerships developed and maintained', 'Systems functioning and improving'] },
      { g: 'Organisational Health', items: ['Team capability, retention, and morale', 'Governance effectiveness and compliance', 'Stakeholder satisfaction across all groups', 'Learning, adaptation, and knowledge management'] },
    ],
    note: 'Operational metrics matter because without organisational effectiveness, nothing else is possible. But they are strictly means — never ends. Excellent Tier 3 performance that fails to move Tier 1 is failure dressed as success.',
  },
];

const SectionMeasurement = () => {
  const [openTier, setOpenTier] = useState(0);
  return (
    <div className="pad-section" style={{background:C.paperDark,padding:'48px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <Rule/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'20px'}}>V — The Three-Tier Measurement Framework</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.2vw,40px)',fontWeight:700,lineHeight:1.15,color:C.ink,marginBottom:'16px'}}>Metrics serve purpose. If metrics improve but purpose is not served, the metrics are misleading.</h2>
        <div className="tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',marginBottom:'44px'}}>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
            Most development organisations lack mechanisms to detect the gap between activity and impact. They track what is easy to measure — outputs — rather than what matters most — outcomes. They assume causation that should be verified.
          </p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
            BRIDGE measures success through an integrated three-tier framework. Feedback flows in both directions: Tier 1 outcome data informs whether Tier 2 strategies are working; Tier 2 indicator data informs whether Tier 3 operations are generating expected results.
          </p>
        </div>

        {/* Mobile tab strip — hidden on desktop, CSS mob-show shows at ≤600px */}
        <div className="mob-show" style={{marginBottom:'12px',display:'flex',gap:'2px'}}>
          {TIERS.map((t, i) => (
            <button key={i} onClick={() => setOpenTier(i)}
              style={{flex:1,background:openTier===i ? C.ink : C.border,border:'none',padding:'10px 12px',cursor:'pointer',textAlign:'left',display:'flex',flexDirection:'column',gap:'2px'}}>
              <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:openTier===i ? C.lime : C.muted,letterSpacing:'1px'}}>{t.tier}</span>
              <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:openTier===i ? C.paper : C.ink,lineHeight:1.2}}>{t.label}</span>
            </button>
          ))}
        </div>

        {TIERS.map((t, i) => (
          <div key={i} className={i !== openTier ? 'mob-item-hidden' : ''} style={{marginBottom:'2px'}}>
            {/* Desktop tier label — hidden on mobile (tab strip handles it) */}
            <div className="mob-hide" style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 0',borderTop:i > 0 ? `1px solid ${C.border}` : 'none',marginTop:i > 0 ? '20px' : '0'}}>
              <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,letterSpacing:'2px',color:C.lime}}>{t.tier}</span>
              <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{t.label}</span>
              <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint,letterSpacing:'1px'}}>· {t.role}</span>
            </div>
            <div style={{background:t.bg,padding:'28px 32px',marginBottom:'2px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'20px'}}>
                <div>
                  <div style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:t.accent,marginBottom:'4px'}}>{t.tier} · {t.role}</div>
                  <div style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:t.textMain}}>{t.label}</div>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'24px'}} className="tc">
                {t.groups.map((grp, j) => (
                  <div key={j}>
                    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:t.accent,marginBottom:'10px',borderBottom:`1px solid ${i===2 ? C.border : 'rgba(255,255,255,0.1)'}`,paddingBottom:'8px'}}>{grp.g}</div>
                    {grp.items.map((item, k) => (
                      <div key={k} style={{display:'flex',gap:'8px',alignItems:'flex-start',marginBottom:'6px'}}>
                        <span style={{color:t.accent,flexShrink:0,fontSize:'9px',lineHeight:'1.8',fontWeight:700}}>→</span>
                        <span style={{fontFamily:F.body,fontSize:'11px',color:t.textSub,lineHeight:1.6,fontWeight:300}}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{marginTop:'20px',borderTop:`1px solid ${i===2 ? C.border : 'rgba(255,255,255,0.1)'}`,paddingTop:'16px'}}>
                <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:t.textSub,margin:0,lineHeight:1.65,fontWeight:300}}>{t.note}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Integration note */}
        <div style={{background:C.paper,border:`1px solid ${C.border}`,borderLeft:`4px solid ${C.lime}`,padding:'20px 24px',marginTop:'24px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.forest,marginBottom:'10px'}}>The Integration Logic</div>
          <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.78,color:C.ink,fontWeight:300,margin:0}}>
            We track Tier 3 because organisational effectiveness enables everything else. We track Tier 2 because these indicators provide evidence that activities create real change. We track Tier 1 because this is the ultimate purpose. <strong style={{fontWeight:600,color:C.forest}}>If Tier 2 improves but Tier 1 doesn't, our theory of change is wrong and we must adapt.</strong> This is not rhetoric — it is rigorous methodology ensuring development finance serves its ultimate purpose: enabling people to live lives they value.
          </p>
        </div>
      </div>
    </div>
  );
};

// ── SECTION VI — SECTOR MAP ────────────────────────────────────────────────────
const SectionSectorMap = () => {
  const [open, setOpen] = useState(false);
  const preview = 6;
  return (
    <div className="pad-section" style={{background:C.paper,padding:'48px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <Rule/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'20px'}}>VI — The Framework Across 12 Sectors</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.2vw,40px)',fontWeight:700,lineHeight:1.15,color:C.ink,marginBottom:'16px'}}>Every sector connects to Peace &amp; Prosperity through traceable pathways.</h2>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.80,color:C.muted,marginBottom:'32px',fontWeight:300}}>
          This mapping is not rhetorical decoration — it is the architecture through which BRIDGE makes investment decisions and reports outcomes.
        </p>

        {/* Table */}
        <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
          {/* Desktop header */}
          <div className="sector-desktop" style={{display:'grid',gridTemplateColumns:'48px 1fr 1fr 140px',background:C.ink,padding:'10px 20px',gap:'16px'}}>
            {['#','Sector','P&P Connection','Ministry'].map(h => (
              <div key={h} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)'}}>{h}</div>
            ))}
          </div>
          {/* Mobile header */}
          <div className="mob-show" style={{background:C.ink,padding:'10px 16px',display:'grid',gridTemplateColumns:'32px 1fr'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.35)'}}>#</div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.35)'}}>Sector &amp; P&amp;P Connection</div>
          </div>

          {SECTOR_MAP.map((s, i) => (
            <div key={i} className={i >= preview ? (open ? '' : 'mob-item-hidden') : ''}>
              {/* Desktop row */}
              <div className="sector-desktop" style={{display:'grid',gridTemplateColumns:'48px 1fr 1fr 140px',background:i % 2 === 0 ? C.paper : C.paperDark,borderBottom:i < SECTOR_MAP.length-1 ? `1px solid ${C.border}` : 'none',padding:'13px 20px',gap:'16px',alignItems:'flex-start'}}>
                <div style={{fontFamily:F.mono,fontStyle:'normal',fontSize:'12px',fontWeight:500,color:C.lime,paddingTop:'2px'}}>{s.sector}</div>
                <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{s.name}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.55,fontWeight:300}}>{s.connection}</div>
                <div style={{fontFamily:F.sans,fontSize:'11px',color:C.faint,lineHeight:1.5}}>{s.ministry}</div>
              </div>
              {/* Mobile row — mob-show makes this display:block */}
              <div className="mob-show" style={{background:i % 2 === 0 ? C.paper : C.paperDark,borderBottom:i < SECTOR_MAP.length-1 ? `1px solid ${C.border}` : 'none',padding:'12px 16px'}}>
                <div style={{display:'grid',gridTemplateColumns:'32px 1fr',gap:'10px',alignItems:'flex-start'}}>
                  <div style={{fontFamily:F.mono,fontSize:'12px',fontWeight:500,color:C.lime,paddingTop:'2px'}}>{s.sector}</div>
                  <div>
                    <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'3px'}}>{s.name}</div>
                    <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5,fontWeight:300}}>{s.connection}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile expand */}
        {!open && (
          <button className="mob-toggle" onClick={() => setOpen(true)}>
            <span>View remaining {SECTOR_MAP.length - preview} sectors</span>
            <span>↓</span>
          </button>
        )}
      </div>
    </div>
  );
};

// ── SECTION VII — POLICY ALIGNMENT ────────────────────────────────────────────
const SectionPolicy = () => (
  <div className="pad-section" style={{background:C.paperDark,padding:'48px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <Rule/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'20px'}}>VII — Ghana Policy Framework Alignment</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.2vw,40px)',fontWeight:700,lineHeight:1.15,color:C.ink,marginBottom:'16px'}}>Grounded in Ghana's own development priorities.</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.80,color:C.muted,marginBottom:'36px',fontWeight:300}}>
        BRIDGE did not import a foreign development framework. Peace &amp; Prosperity was built to align with the policy architectures Ghana has already established. This alignment is not rhetorical — it is structural. BRIDGE's investment theses, sector selection, and capital structures were designed to complement what Ghana's government is already doing.
      </p>
      <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
        {POLICY_ALIGN.map((p, i) => (
          <div key={i} style={{background:C.paperDark,borderLeft:`3px solid ${C.lime}`,padding:'22px 26px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px',gap:'16px'}} className="mob-stack">
              <div style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:C.forest}}>{p.framework}</div>
              <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:500,color:C.faint,background:C.paper,border:`1px solid ${C.border}`,padding:'3px 10px',whiteSpace:'nowrap',flexShrink:0}}>{p.ref}</span>
            </div>
            <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.80,color:C.ink,fontWeight:300,marginBottom:'12px',margin:'0 0 12px'}}>{p.alignment}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'4px'}}>
              {p.tags.map((tag, j) => (
                <span key={j} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.forest,background:C.paper,border:`1px solid ${C.border}`,padding:'3px 8px'}}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── SECTION VIII — SCORING IN PRACTICE (MEMBERS ONLY) ────────────────────────
const SCORE_DIMS = [
  {
    num: '01', label: 'Market Opportunity', weight: '30%',
    why: 'Because development impact without market viability is charity, not investment. A venture must reach enough people, in sufficient depth, to justify the capital and execution risk.',
    desc: 'Scale of addressable need, market size, and depth of demand among Ghanaian households and communities. Assessed against sector-specific benchmarks derived from national household survey data and BRIDGE field research. Covers both immediate demand and latent demand that a well-designed product or service could activate.',
    indicators: ['Household addressable market (GHS)', 'Demand density by region and tier', 'Willingness-to-pay evidence from primary research', 'Competitive white space and displacement risk'],
  },
  {
    num: '02', label: 'Development Impact', weight: '30%',
    why: 'BRIDGE\'s mission primacy is reflected in the weight. Financial returns without P&P alignment are not success — they are off-mission activity. This dimension is the most difficult to score and the most important to get right.',
    desc: 'Direct contribution to Peace & Prosperity outcomes across the three domains: Individual Dignity, Family Security, and Community Thriving. Assessed through a structured pathway analysis connecting venture activities to specific Tier 1 outcomes. Ventures are penalised for P&P-negative externalities such as labour exploitation, environmental harm, or community displacement.',
    indicators: ['P&P domain alignment score (all three domains)', 'Direct beneficiary household count (5-year horizon)', 'Capability expansion potential (not just income)', 'Multiplier effect estimate through supply chain and employment'],
  },
  {
    num: '03', label: 'Implementation Feasibility', weight: '25%',
    why: 'A perfect venture on paper that cannot be executed in Ghana\'s actual environment has no value. This dimension prevents the portfolio from filling with ideas that work in Boston but not in Bolgatanga.',
    desc: 'Likelihood of successful execution given Ghana\'s regulatory environment, infrastructure constraints, available talent, and supply chain realities. Scored against comparable ventures that have actually been deployed. Particular attention is paid to single-point-of-failure risks — regulatory bottlenecks, key person dependencies, infrastructure gaps — that could halt otherwise viable ventures.',
    indicators: ['Regulatory pathway clarity and timeline', 'Talent availability by skill level and region', 'Infrastructure dependency risk (power, connectivity, logistics)', 'Supply chain localisability and import substitution potential'],
  },
  {
    num: '04', label: 'Financial Sustainability', weight: '15%',
    why: 'Lowest-weighted but not unimportant. A venture that requires permanent subsidy cannot scale, cannot attract follow-on capital, and cannot survive BRIDGE\'s eventual exit. Sustainability is the condition for durability.',
    desc: 'Capacity to generate returns sufficient to sustain operations, service capital, and attract follow-on investment — without dependency on permanent subsidy. Assessed on a 7-year horizon across multiple scenarios. Ventures with blended finance potential (development finance institution co-investment, concessional debt, grant components) are credited for structures that improve economics without compromising mission.',
    indicators: ['Unit economics viability at target scale', 'Path to operational breakeven (months from deployment)', 'Blended finance suitability and DFI appetite', 'Follow-on capital probability from commercial sources'],
  },
];

const SectionScoring = () => {
  const [openDim, setOpenDim] = useState(0);
  return (
    <div className="pad-section" style={{background:C.paper,padding:'48px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <Rule/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'20px'}}>VIII — Scoring in Practice</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.2vw,40px)',fontWeight:700,lineHeight:1.15,color:C.ink,marginBottom:'16px'}}>How the framework becomes a number.</h2>
        <div className="tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',marginBottom:'40px'}}>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
            The BRIDGE Impact Score™ is a 0–100 composite built from four weighted dimensions. Each dimension maps directly to Peace &amp; Prosperity outcomes. The weights are not arbitrary — they encode BRIDGE's theory of change: that development impact and market viability are co-equal prerequisites, that feasibility is necessary but secondary, and that financial sustainability enables durability without driving decisions.
          </p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,margin:0}}>
            The score is a tool for structured conversation, not a verdict. It surfaces the dimensions where a venture is strong and where questions remain — creating a shared basis for due diligence between BRIDGE, entrepreneurs, and capital partners. A high score does not guarantee deployment; a lower score does not disqualify a venture. It tells us where to focus attention.
          </p>
        </div>

        {/* Illustrative score block */}
        <div style={{background:C.ink,padding:'28px 32px',marginBottom:'32px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'20px',flexWrap:'wrap',gap:'12px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',marginBottom:'4px'}}>BRIDGE Impact Score™ — Illustrative Example</div>
              <div style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.45)',fontStyle:'italic'}}>Community solar + productive use financing, Brong-Ahafo Region</div>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'44px',fontWeight:500,color:C.lime,lineHeight:1}}>74<span style={{fontSize:'18px',color:'rgba(184,217,53,0.4)'}}>/100</span></div>
          </div>
          <div style={{height:'6px',background:'rgba(255,255,255,0.08)',overflow:'hidden',marginBottom:'20px'}}>
            <div style={{height:'100%',width:'74%',background:C.lime}}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}} className="tc">
            {[
              {l:'Market Opportunity',w:'30%',v:78,note:'Large unserved rural household base; productive use demand validated'},
              {l:'Development Impact',w:'30%',v:82,note:'Strong P&P alignment across all three domains; high multiplier estimate'},
              {l:'Implementation Feasibility',w:'25%',v:65,note:'Grid interconnection timeline uncertain; local contractor capacity thin'},
              {l:'Financial Sustainability',w:'15%',v:60,note:'Unit economics positive at scale; DFI concessional debt required in Year 1–2'},
            ].map((d,i) => (
              <div key={i} style={{background:'rgba(255,255,255,0.04)',padding:'14px 16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px'}}>
                  <div>
                    <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper}}>{d.l}</span>
                    <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.35)',marginLeft:'8px'}}>{d.w}</span>
                  </div>
                  <span style={{fontFamily:F.mono,fontSize:'16px',fontWeight:700,color:d.v >= 75 ? C.lime : d.v >= 60 ? C.amber : C.red}}>{d.v}</span>
                </div>
                <div style={{height:'3px',background:'rgba(255,255,255,0.06)',marginBottom:'8px'}}>
                  <div style={{height:'100%',width:`${d.v}%`,background:d.v >= 75 ? C.lime : d.v >= 60 ? C.amber : C.red}}/>
                </div>
                <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.4)',margin:0,lineHeight:1.55}}>{d.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Four dimensions — expandable on mobile, all visible desktop */}
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>The Four Dimensions — Rationale &amp; Criteria</div>
        {SCORE_DIMS.map((d, i) => (
          <div key={i} style={{borderBottom:`1px solid ${C.border}`}}>
            <button className="mob-toggle" onClick={() => setOpenDim(openDim === i ? null : i)}>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:500,color:C.lime}}>{d.num}</span>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{d.label}</span>
                <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.forest,background:C.paper,border:`1px solid ${C.border}`,padding:'2px 7px'}}>{d.weight}</span>
              </div>
              <span style={{transform:openDim===i?'rotate(180deg)':'none',transition:'transform 0.2s',display:'inline-block',color:C.muted}}>↓</span>
            </button>
            <div className={openDim === i ? '' : 'mob-item-hidden'} style={{padding:'20px 0 24px'}}>
              {/* Why this weight */}
              <div style={{background:C.ink,padding:'14px 18px',marginBottom:'16px',borderLeft:`3px solid ${C.lime}`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',marginBottom:'6px'}}>Why this weight</div>
                <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.7)',margin:0,lineHeight:1.65,fontWeight:300}}>{d.why}</p>
              </div>
              <div className="tc" style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:'24px',alignItems:'flex-start'}}>
                <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.80,color:C.ink,fontWeight:300,margin:0}}>{d.desc}</p>
                <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'14px 16px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Key Indicators</div>
                  {d.indicators.map((ind, j) => (
                    <div key={j} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'5px 0',borderBottom:j < d.indicators.length-1 ? `1px solid ${C.border}` : 'none'}}>
                      <span style={{color:C.lime,fontWeight:700,flexShrink:0,fontSize:'10px',lineHeight:'1.6'}}>→</span>
                      <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,lineHeight:1.5}}>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'24px',marginTop:'32px'}}>
          <p style={{fontFamily:F.display,fontSize:'17px',fontWeight:600,fontStyle:'italic',lineHeight:1.58,color:C.forest,margin:0}}>
            The score is not a ranking device. It is a shared language — a structured way for BRIDGE, entrepreneurs, and capital partners to look at the same venture and understand where the strengths are, where the risks sit, and where due diligence effort should be concentrated.
          </p>
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
        <DocumentLogo height={18} variant="white"/>
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

const MOB_CHAPTERS_PAID = [
  {
    id: 'cover',
    title: 'Peace & Prosperity',
    label: 'Overview',
    bg: C.ink,
    Render: () => (
      <div style={{minHeight:'100%',display:'flex',flexDirection:'column',padding:'28px 20px 32px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'32px'}}>
          <DocumentLogo height={16} variant="white"/>
          <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.2)',flexShrink:0}}/>
          <span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',color:C.lime,background:'rgba(184,217,53,0.15)',border:'1px solid rgba(184,217,53,0.4)',padding:'2px 7px'}}>MEMBERS</span>
        </div>
        <div style={{flex:1}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',marginBottom:'8px'}}>General Series · Doc 02/23 · March 2026</div>
          <h1 style={{fontFamily:F.display,fontSize:'52px',fontWeight:900,lineHeight:1.0,color:C.paper,letterSpacing:'-0.02em',marginBottom:'4px'}}>Peace &</h1>
          <h1 style={{fontFamily:F.display,fontSize:'52px',fontWeight:900,lineHeight:1.0,color:C.lime,letterSpacing:'-0.02em',marginBottom:'24px'}}>Prosperity</h1>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.80,color:'rgba(250,248,243,0.60)',fontWeight:300,marginBottom:'28px'}}>
            The complete framework — covering what BRIDGE measures, how outcomes are scored, and why every capital decision traces back to one standard: does this advance the flourishing of Ghanaian citizens?
          </p>
          {[
            {label:'Peace', items:['Physical Security','Economic Security','Social Cohesion','Political Stability','Psychological Security']},
            {label:'Prosperity', items:['Material Sufficiency','Human Capability','Freedom of Choice','Intergenerational Advancement']},
          ].map(p => (
            <div key={p.label} style={{marginBottom:'12px'}}>
              <div style={{fontFamily:F.display,fontSize:'13px',fontWeight:700,fontStyle:'italic',color:C.lime,marginBottom:'6px'}}>{p.label}</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
                {p.items.map(item => <span key={item} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(250,248,243,0.50)',background:'rgba(255,255,255,0.07)',padding:'3px 8px'}}>{item}</span>)}
              </div>
            </div>
          ))}
          <div style={{marginTop:'20px',display:'flex',gap:'10px',flexWrap:'wrap'}}>
            {['8 Sections','12 Sectors','3 Domains','4 Score Dimensions'].map(t => (
              <span key={t} style={{fontFamily:F.mono,fontSize:'9px',fontWeight:500,color:C.lime,background:'rgba(184,217,53,0.08)',border:'1px solid rgba(184,217,53,0.15)',padding:'4px 9px'}}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'start',
    title: 'A Different Starting Point',
    label: 'Starting Point',
    bg: C.paperDark,
    Render: () => (
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
          This draws on Amartya Sen's Capability Approach: development should be measured by what people are able to do and be — not merely by what they own or earn.
        </p>
      </div>
    ),
  },
  {
    id: 'peace',
    title: 'What BRIDGE Means by Peace',
    label: 'Peace',
    bg: C.paper,
    Render: () => {
      const [active, setActive] = useState(0);
      return (
        <div style={{padding:'28px 20px 32px'}}>
          <div style={{width:'32px',height:'3px',background:C.lime,marginBottom:'8px'}}/>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>II — What BRIDGE Means by Peace</div>
          <h2 style={{fontFamily:F.display,fontSize:'26px',fontWeight:700,lineHeight:1.18,color:C.ink,marginBottom:'8px'}}>Not the absence of war. A comprehensive condition.</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,marginBottom:'16px',fontWeight:300,lineHeight:1.7}}>Five dimensions. All operate simultaneously. Tap each to explore.</p>
          <div style={{display:'flex',gap:'4px',marginBottom:'14px',overflowX:'auto',paddingBottom:'2px'}}>
            {PEACE_DIMS.map((d,i) => (
              <button key={i} onClick={() => setActive(i)} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,padding:'6px 10px',border:`1px solid ${active===i?C.forest:C.border}`,background:active===i?C.forest:'transparent',color:active===i?C.lime:C.muted,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0,transition:'all 0.15s'}}>{d.label}</button>
            ))}
          </div>
          <div style={{background:C.paperDark,borderLeft:`3px solid ${C.lime}`,padding:'18px 16px',minHeight:'130px'}}>
            <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.forest,marginBottom:'10px'}}>{PEACE_DIMS[active].label}</div>
            <p style={{fontFamily:F.body,fontSize:'14px',lineHeight:1.80,color:C.ink,fontWeight:300,margin:0}}>{PEACE_DIMS[active].body}</p>
          </div>
          <div style={{display:'flex',gap:'6px',justifyContent:'center',marginTop:'14px'}}>
            {PEACE_DIMS.map((_,i) => (
              <div key={i} onClick={() => setActive(i)} style={{width:i===active?'20px':'6px',height:'6px',borderRadius:'3px',background:i===active?C.lime:C.border,cursor:'pointer',transition:'all 0.3s'}}/>
            ))}
          </div>
          <div style={{background:C.forest,padding:'18px 16px',marginTop:'18px'}}>
            <p style={{fontFamily:F.display,fontSize:'15px',fontWeight:600,fontStyle:'italic',color:C.paper,lineHeight:1.60,margin:0}}>
              Peace creates the stable foundation from which everything else becomes possible: long-term planning, community solidarity, and the kind of hope that drives people to build rather than merely endure.
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
    Render: () => {
      const [tab, setTab] = useState(0);
      const matSuff = [{n:'01',l:'Income & Housing'},{n:'02',l:'Nutrition & Health'},{n:'03',l:'Energy & Connectivity'},{n:'04',l:'Transportation Access'}];
      return (
        <div style={{padding:'28px 20px 32px'}}>
          <div style={{width:'32px',height:'3px',background:C.lime,marginBottom:'8px'}}/>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>III — What BRIDGE Means by Prosperity</div>
          <h2 style={{fontFamily:F.display,fontSize:'26px',fontWeight:700,lineHeight:1.18,color:C.ink,marginBottom:'16px'}}>Material sufficiency is necessary. It is not sufficient.</h2>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'20px'}}>
            Drawing on Sen's capability approach, prosperity requires not just material conditions but the real freedoms to achieve states of being and doing that people have reason to value.
          </p>
          {/* Tab switch */}
          <div style={{display:'flex',gap:'2px',marginBottom:'14px'}}>
            {['Material Sufficiency','Capability Development'].map((t,i) => (
              <button key={i} onClick={() => setTab(i)} style={{flex:1,fontFamily:F.sans,fontSize:'10px',fontWeight:700,padding:'8px 6px',border:`1px solid ${tab===i?C.forest:C.border}`,background:tab===i?C.forest:C.paper,color:tab===i?C.lime:C.muted,cursor:'pointer',transition:'all 0.15s',letterSpacing:'0.3px'}}>{t}</button>
            ))}
          </div>
          {tab===0 ? (
            <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
              {[{n:'01',l:'Income & Housing',d:'Sufficient income with margin for dignity; stable shelter.'},
                {n:'02',l:'Nutrition & Health',d:'Adequate food; clean water preventing disease.'},
                {n:'03',l:'Energy & Connectivity',d:'Reliable power and internet for productivity.'},
                {n:'04',l:'Transportation Access',d:'Ability to reach jobs, markets, and services.'},
              ].map((item,i) => (
                <div key={i} style={{background:C.paper,padding:'12px 14px',display:'flex',gap:'12px',alignItems:'flex-start',borderTop:`2px solid ${C.lime}`}}>
                  <span style={{fontFamily:F.mono,fontSize:'14px',fontWeight:500,color:C.lime,flexShrink:0}}>{item.n}</span>
                  <div>
                    <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'3px'}}>{item.l}</div>
                    <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,margin:0,lineHeight:1.6,fontWeight:300}}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
              {PROSPERITY_CAPS.map((cap,i) => (
                <div key={i} style={{background:C.paper,borderLeft:`3px solid ${C.lime}`,padding:'12px 14px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'4px'}}>{cap.label}</div>
                  <p style={{fontFamily:F.body,fontSize:'12px',color:C.ink,margin:0,lineHeight:1.65,fontWeight:300}}>{cap.body}</p>
                </div>
              ))}
            </div>
          )}
          <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'16px',marginTop:'20px'}}>
            <p style={{fontFamily:F.display,fontSize:'15px',fontWeight:600,fontStyle:'italic',color:C.forest,margin:0,lineHeight:1.55}}>
              Prosperity means not just having resources but being able to use them to pursue lives people value. The difference between surviving and thriving.
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'domains',
    title: 'Three Domains of Flourishing',
    label: 'Domains',
    bg: C.paper,
    Render: () => {
      const [active, setActive] = useState(0);
      return (
        <div style={{padding:'28px 20px 32px'}}>
          <div style={{width:'32px',height:'3px',background:C.lime,marginBottom:'8px'}}/>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>IV — Three Domains of Flourishing</div>
          <h2 style={{fontFamily:F.display,fontSize:'26px',fontWeight:700,lineHeight:1.18,color:C.ink,marginBottom:'8px'}}>How BRIDGE measures outcomes.</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,marginBottom:'20px',fontWeight:300,lineHeight:1.7}}>Three domains translate philosophy into measurable investment criteria.</p>
          {/* Domain selector */}
          <div style={{display:'flex',gap:'2px',marginBottom:'16px'}}>
            {DOMAINS.map((d,i) => (
              <button key={i} onClick={() => setActive(i)} style={{flex:1,fontFamily:F.mono,fontSize:'18px',fontWeight:500,padding:'10px 6px',border:`1px solid ${active===i?C.forest:C.border}`,background:active===i?C.ink:'transparent',color:active===i?C.lime:C.faint,cursor:'pointer',transition:'all 0.15s'}}>{d.num}</button>
            ))}
          </div>
          <div style={{marginBottom:'0'}}>
            <div style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'10px'}}>{DOMAINS[active].title}</div>
            <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',marginBottom:'14px'}}>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',fontWeight:600,color:C.forest,margin:0,lineHeight:1.6}}>{DOMAINS[active].marker}</p>
            </div>
            <p style={{fontFamily:F.body,fontSize:'14px',lineHeight:1.82,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{DOMAINS[active].body}</p>
            <div style={{background:C.paperDark,border:`1px solid ${C.border}`,padding:'12px 14px',display:'flex',gap:'10px',alignItems:'flex-start'}}>
              <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.forest,flexShrink:0,paddingTop:'2px'}}>Measured By</span>
              <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,margin:0,lineHeight:1.65,fontWeight:300,fontStyle:'italic'}}>{DOMAINS[active].measure}</p>
            </div>
          </div>
          <div style={{display:'flex',gap:'6px',justifyContent:'center',marginTop:'18px'}}>
            {DOMAINS.map((_,i) => (
              <div key={i} onClick={() => setActive(i)} style={{width:i===active?'20px':'6px',height:'6px',borderRadius:'3px',background:i===active?C.lime:C.border,cursor:'pointer',transition:'all 0.3s'}}/>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    id: 'measurement',
    title: 'Three-Tier Measurement',
    label: 'Measurement',
    bg: C.paperDark,
    Render: () => {
      const [active, setActive] = useState(0);
      return (
        <div style={{padding:'28px 20px 32px'}}>
          <div style={{width:'32px',height:'3px',background:C.lime,marginBottom:'8px'}}/>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>V — Three-Tier Measurement</div>
          <h2 style={{fontFamily:F.display,fontSize:'24px',fontWeight:700,lineHeight:1.18,color:C.ink,marginBottom:'8px'}}>Metrics serve purpose. If metrics improve but purpose is not served, the metrics are misleading.</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,marginBottom:'18px',fontWeight:300,lineHeight:1.7}}>Three tiers, bidirectional feedback. Tap each tier to explore.</p>
          {/* Tier tabs */}
          <div style={{display:'flex',gap:'2px',marginBottom:'2px'}}>
            {TIERS.map((t,i) => (
              <button key={i} onClick={() => setActive(i)} style={{flex:1,background:active===i?t.bg:C.paper,border:`1px solid ${active===i?'transparent':C.border}`,padding:'10px 4px',cursor:'pointer',transition:'all 0.2s',textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,letterSpacing:'1px',color:active===i?t.accent:C.faint,marginBottom:'2px'}}>{t.tier}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:active===i?t.textMain:C.muted,lineHeight:1.2}}>{t.role}</div>
              </button>
            ))}
          </div>
          <div style={{background:TIERS[active].bg,padding:'20px 16px',transition:'background 0.25s'}}>
            <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:TIERS[active].textMain,marginBottom:'16px'}}>{TIERS[active].label}</div>
            {TIERS[active].groups.map((grp,j) => (
              <div key={j} style={{marginBottom:'14px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:TIERS[active].accent,marginBottom:'6px',borderBottom:`1px solid ${active===2?C.border:'rgba(255,255,255,0.1)'}`,paddingBottom:'4px'}}>{grp.g}</div>
                {grp.items.map((item,k) => (
                  <div key={k} style={{display:'flex',gap:'6px',marginBottom:'4px'}}>
                    <span style={{color:TIERS[active].accent,flexShrink:0,fontSize:'9px',lineHeight:'1.8',fontWeight:700}}>→</span>
                    <span style={{fontFamily:F.body,fontSize:'12px',color:TIERS[active].textSub,lineHeight:1.55,fontWeight:300}}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
            <div style={{marginTop:'12px',borderTop:`1px solid ${active===2?C.border:'rgba(255,255,255,0.1)'}`,paddingTop:'12px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:TIERS[active].textSub,margin:0,lineHeight:1.6,fontWeight:300}}>{TIERS[active].note}</p>
            </div>
          </div>
          <div style={{background:C.paper,borderLeft:`4px solid ${C.lime}`,padding:'14px 16px',marginTop:'12px'}}>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.72,color:C.ink,fontWeight:300,margin:0}}>
              <strong style={{fontWeight:600,color:C.forest}}>If Tier 2 improves but Tier 1 doesn't, our theory of change is wrong and we must adapt.</strong> This is rigorous methodology, not rhetoric.
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'sectors',
    title: 'Framework Across 12 Sectors',
    label: '12 Sectors',
    bg: C.paper,
    Render: () => {
      const [open, setOpen] = useState(false);
      const preview = 6;
      return (
        <div style={{padding:'28px 20px 32px'}}>
          <div style={{width:'32px',height:'3px',background:C.lime,marginBottom:'8px'}}/>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>VI — Framework Across 12 Sectors</div>
          <h2 style={{fontFamily:F.display,fontSize:'26px',fontWeight:700,lineHeight:1.18,color:C.ink,marginBottom:'12px'}}>Every sector connects through traceable pathways.</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,marginBottom:'16px',fontWeight:300,lineHeight:1.7}}>The architecture through which BRIDGE makes investment decisions and reports outcomes.</p>
          <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <div style={{background:C.ink,padding:'8px 14px',display:'grid',gridTemplateColumns:'28px 1fr'}}>
              <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.35)'}}>#</div>
              <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.35)'}}>Sector &amp; P&amp;P Connection</div>
            </div>
            {SECTOR_MAP.map((s, i) => (
              <div key={i} style={{display: i >= preview && !open ? 'none' : 'grid',gridTemplateColumns:'28px 1fr',background:i%2===0?C.paper:C.paperDark,borderBottom:i<SECTOR_MAP.length-1?`1px solid ${C.border}`:'none',padding:'10px 14px',gap:'8px',alignItems:'flex-start'}}>
                <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:500,color:C.lime}}>{s.sector}</div>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{s.name}</div>
                  <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,lineHeight:1.5,fontWeight:300}}>{s.connection}</div>
                </div>
              </div>
            ))}
          </div>
          {!open && (
            <button onClick={() => setOpen(true)} style={{marginTop:'0',width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',background:C.paperDark,border:`1px solid ${C.border}`,borderTop:'none',padding:'10px 14px',cursor:'pointer',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted}}>
              View remaining {SECTOR_MAP.length - preview} sectors ↓
            </button>
          )}
        </div>
      );
    },
  },
  {
    id: 'policy',
    title: 'Ghana Policy Alignment',
    label: 'Policy',
    bg: C.paperDark,
    Render: () => {
      const [active, setActive] = useState(0);
      return (
        <div style={{padding:'28px 20px 32px'}}>
          <div style={{width:'32px',height:'3px',background:C.lime,marginBottom:'8px'}}/>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>VII — Ghana Policy Alignment</div>
          <h2 style={{fontFamily:F.display,fontSize:'26px',fontWeight:700,lineHeight:1.18,color:C.ink,marginBottom:'12px'}}>Grounded in Ghana's own development priorities.</h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,marginBottom:'16px',fontWeight:300,lineHeight:1.7}}>BRIDGE did not import a foreign framework. Tap each to see the alignment.</p>
          <div style={{display:'flex',flexDirection:'column',gap:'2px',marginBottom:'16px'}}>
            {POLICY_ALIGN.map((p,i) => (
              <button key={i} onClick={() => setActive(i)} style={{background:active===i?C.forest:C.paper,border:`1px solid ${active===i?'transparent':C.border}`,padding:'10px 14px',cursor:'pointer',textAlign:'left',display:'flex',justifyContent:'space-between',alignItems:'center',transition:'all 0.15s'}}>
                <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:active===i?C.lime:C.forest}}>{p.framework}</span>
                <span style={{fontFamily:F.mono,fontSize:'9px',color:active===i?'rgba(250,248,243,0.4)':C.faint,letterSpacing:'0.5px',flexShrink:0,marginLeft:'8px'}}>{p.ref}</span>
              </button>
            ))}
          </div>
          <div style={{background:C.paper,borderLeft:`3px solid ${C.lime}`,padding:'16px 16px',transition:'opacity 0.2s'}}>
            <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.80,color:C.ink,fontWeight:300,margin:'0 0 10px'}}>{POLICY_ALIGN[active].alignment}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'4px'}}>
              {POLICY_ALIGN[active].tags.map((tag,j) => (
                <span key={j} style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.forest,background:C.paperDark,border:`1px solid ${C.border}`,padding:'2px 7px'}}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: 'scoring',
    title: 'Scoring in Practice',
    label: 'Scoring',
    bg: C.paper,
    Render: () => {
      const [active, setActive] = useState(0);
      return (
        <div style={{padding:'28px 20px 32px'}}>
          <div style={{width:'32px',height:'3px',background:C.lime,marginBottom:'8px'}}/>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>VIII — Scoring in Practice</div>
          <h2 style={{fontFamily:F.display,fontSize:'26px',fontWeight:700,lineHeight:1.18,color:C.ink,marginBottom:'12px'}}>How the framework becomes a number.</h2>
          {/* Illustrative score */}
          <div style={{background:C.ink,padding:'16px 16px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',marginBottom:'4px'}}>BRIDGE Impact Score™ — Illustrative</div>
            <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.40)',fontStyle:'italic',marginBottom:'10px'}}>Community solar + productive use, Brong-Ahafo</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px'}}>
              <div style={{fontFamily:F.mono,fontSize:'40px',fontWeight:500,color:C.lime,lineHeight:1}}>74<span style={{fontSize:'14px',color:'rgba(184,217,53,0.4)'}}>/100</span></div>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap',justifyContent:'flex-end'}}>
                {[{l:'Market',v:78},{l:'Impact',v:82},{l:'Feasibility',v:65},{l:'Sustainability',v:60}].map((d,i) => (
                  <div key={i} style={{textAlign:'center'}}>
                    <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:d.v>=75?C.lime:d.v>=60?C.amber:C.red}}>{d.v}</div>
                    <div style={{fontFamily:F.sans,fontSize:'7px',color:'rgba(250,248,243,0.3)',letterSpacing:'0.3px'}}>{d.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{height:'4px',background:'rgba(255,255,255,0.08)'}}>
              <div style={{height:'100%',width:'74%',background:C.lime}}/>
            </div>
          </div>
          {/* Dimension selector */}
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>The Four Dimensions</div>
          <div style={{display:'flex',gap:'2px',marginBottom:'12px'}}>
            {SCORE_DIMS.map((d,i) => (
              <button key={i} onClick={() => setActive(i)} style={{flex:1,background:active===i?C.ink:'transparent',border:`1px solid ${active===i?'transparent':C.border}`,padding:'8px 4px',cursor:'pointer',transition:'all 0.15s',textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:active===i?C.lime:C.faint,marginBottom:'2px'}}>{d.weight}</div>
                <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:active===i?C.paper:C.muted,lineHeight:1.2}}>{d.label.split(' ')[0]}</div>
              </button>
            ))}
          </div>
          <div style={{background:C.paperDark,padding:'16px'}}>
            <div style={{background:C.ink,borderLeft:`3px solid ${C.lime}`,padding:'10px 12px',marginBottom:'12px'}}>
              <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',marginBottom:'4px'}}>Why this weight</div>
              <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.7)',margin:0,lineHeight:1.60,fontWeight:300}}>{SCORE_DIMS[active].why}</p>
            </div>
            <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.78,color:C.ink,fontWeight:300,marginBottom:'10px'}}>{SCORE_DIMS[active].desc}</p>
            <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Key Indicators</div>
            {SCORE_DIMS[active].indicators.map((ind,j) => (
              <div key={j} style={{display:'flex',gap:'6px',marginBottom:'4px'}}>
                <span style={{color:C.lime,fontWeight:700,fontSize:'9px',lineHeight:'1.8',flexShrink:0}}>→</span>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,lineHeight:1.5}}>{ind}</span>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',marginTop:'16px'}}>
            <p style={{fontFamily:F.display,fontSize:'14px',fontWeight:600,fontStyle:'italic',color:C.forest,margin:0,lineHeight:1.55}}>
              The score is a shared language — structured conversation, not a verdict. It tells us where to focus attention.
            </p>
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
    Render: () => (
      <div style={{padding:'28px 20px 32px',minHeight:'100%',display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>A Note on Whose Flourishing</div>
        <p style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,fontStyle:'italic',color:C.paper,lineHeight:1.45,marginBottom:'24px'}}>
          BRIDGE is a Ghana-first institution. Every venture, every resource, every partnership — measured against one standard: does this advance the flourishing of Ghanaian citizens?
        </p>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'20px',display:'flex',flexDirection:'column',gap:'14px',marginBottom:'28px'}}>
          <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.52)',lineHeight:1.78,margin:0,fontWeight:300}}>
            Diaspora capital, expertise, and networks are powerful instruments — deployed in service of that mission, not as the mission itself. The diaspora is a bridge, not the destination.
          </p>
          <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.52)',lineHeight:1.78,margin:0,fontWeight:300}}>
            Success is whether Ghanaian people are living with more dignity, more security, and within more thriving communities than they were before BRIDGE arrived. Everything else is instrumental to that single end.
          </p>
        </div>
        <div style={{paddingTop:'20px',borderTop:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <DocumentLogo height={16} variant="white"/>
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
  const ch = chapters[current];
  const total = chapters.length;

  const go = (idx) => {
    if (idx < 0 || idx >= total) return;
    setCurrent(idx);
    setNavOpen(false);
  };

  return (
    <div style={{position:'fixed',inset:0,background:ch.bg,display:'flex',flexDirection:'column',transition:'background 0.3s ease',fontFamily:F.body,overflow:'hidden'}}>
      {/* Top bar */}
      <div style={{flexShrink:0,background:'rgba(0,0,0,0.2)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',zIndex:10}}>
        <DocumentLogo height={14} variant="white"/>
        <button onClick={() => setNavOpen(o => !o)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px',padding:'4px 0'}}>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:'rgba(250,248,243,0.7)',maxWidth:'160px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ch.title}</span>
          <span style={{fontSize:'10px',color:'rgba(250,248,243,0.4)',transform:navOpen?'rotate(180deg)':'none',transition:'transform 0.2s',display:'inline-block'}}>▾</span>
        </button>
        <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.4)',letterSpacing:'0.5px'}}>{current+1}/{total}</div>
      </div>

      {/* Progress bar */}
      <div style={{flexShrink:0,height:'2px',background:'rgba(255,255,255,0.08)'}}>
        <div style={{height:'100%',width:`${((current+1)/total)*100}%`,background:C.lime,transition:'width 0.35s ease'}}/>
      </div>

      {/* Chapter nav overlay */}
      {navOpen && (
        <div style={{position:'absolute',top:'44px',left:0,right:0,zIndex:20,background:C.ink,borderBottom:`2px solid ${C.lime}`,padding:'8px 0',maxHeight:'60vh',overflowY:'auto'}}>
          {chapters.map((c, i) => (
            <button key={c.id} onClick={() => go(i)} style={{width:'100%',display:'flex',alignItems:'center',gap:'12px',padding:'11px 16px',background:'none',border:'none',cursor:'pointer',borderBottom:'1px solid rgba(255,255,255,0.05)',textAlign:'left'}}>
              <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:i===current?C.lime:C.faint,width:'20px',flexShrink:0}}>{String(i+1).padStart(2,'0')}</span>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:i===current?700:400,color:i===current?C.paper:'rgba(250,248,243,0.45)',flex:1}}>{c.label}</span>
              {i===current && <span style={{width:'5px',height:'5px',borderRadius:'50%',background:C.lime,flexShrink:0}}/>}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div key={ch.id} style={{flex:1,overflowY:'auto',WebkitOverflowScrolling:'touch',paddingBottom:'env(safe-area-inset-bottom,16px)'}}>
        <ch.Render/>
      </div>

      {/* Bottom nav */}
      <div style={{flexShrink:0,background:'rgba(0,0,0,0.22)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',padding:'10px 16px',paddingBottom:`calc(10px + env(safe-area-inset-bottom,0px))`,display:'flex',alignItems:'center',justifyContent:'space-between',zIndex:10,borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <button onClick={() => go(current-1)} disabled={current===0} style={{background:current===0?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.10)',border:'1px solid rgba(255,255,255,0.1)',color:current===0?'rgba(250,248,243,0.2)':'rgba(250,248,243,0.8)',padding:'9px 16px',cursor:current===0?'default':'pointer',fontFamily:F.sans,fontSize:'11px',fontWeight:700,transition:'all 0.15s'}}>
          ← Prev
        </button>
        <div style={{display:'flex',gap:'5px',alignItems:'center'}}>
          {chapters.map((_,i) => (
            <div key={i} onClick={() => go(i)} style={{width:i===current?'20px':'6px',height:'6px',borderRadius:'3px',background:i===current?C.lime:'rgba(255,255,255,0.2)',cursor:'pointer',transition:'all 0.3s ease'}}/>
          ))}
        </div>
        <button onClick={() => go(current+1)} disabled={current===total-1} style={{background:current===total-1?'rgba(255,255,255,0.04)':C.lime,border:'none',color:current===total-1?'rgba(250,248,243,0.2)':C.ink,padding:'9px 16px',cursor:current===total-1?'default':'pointer',fontFamily:F.sans,fontSize:'11px',fontWeight:800,transition:'all 0.15s'}}>
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
      <DocumentGlobalStyles extraCss={EXTRA_CSS}/>
      <MobileReader chapters={MOB_CHAPTERS_PAID}/>
    </>
  );

  return (
    <div style={{fontFamily:F.body,background:C.paper}}>
      <DocumentGlobalStyles extraCss={EXTRA_CSS}/>
      <TopBar coverLogoRef={coverLogoRef}/>
      <Cover logoRef={coverLogoRef}/>
      <Executive/>
      <SectionStartingPoint/>
      <SectionPeace/>
      <SectionProsperity/>
      <SectionDomains/>
      <SectionMeasurement/>
      <SectionSectorMap/>
      <SectionPolicy/>
      <SectionScoring/>
      <GhanaFirst/>
      <Footer/>
    </div>
  );
}
