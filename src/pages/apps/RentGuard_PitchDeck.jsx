import { useState, useEffect } from "react";

// ── BRIDGE RentGuard Ghana ─────────────────────────────────────────────────
// Digital Rent Enforcement & Intelligence Platform
// A BRIDGE PBC Application — Housing Sector (Sector 08)
// Interactive Pitch & Product Brief · April 2026
// ────────────────────────────────────────────────────────────────────────────

const C = {
  ink:'#0D1A10', paper:'#FAF8F3', paperDark:'#F0EDE4', forest:'#1B4D3E',
  lime:'#B8D935', limeDark:'#8FA825', muted:'#5C6B5E', faint:'#9AAA9C',
  border:'#D8D4C8', teal:'#2E5A4D', red:'#A8200D', amber:'#B8730A',
  positive:'#1A6B2F', white:'#FFFFFF',
};

const F = {
  display:'"Playfair Display","Georgia",serif',
  body:'"Source Serif 4","Georgia",serif',
  sans:'"DM Sans","Helvetica Neue",sans-serif',
  mono:'"DM Mono","Courier New",monospace',
};

// ── Mobile detection ──────────────────────────────────────────────────────
const MOBILE_BP = 768;
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth <= MOBILE_BP);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return m;
}

const Gf = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{background:${C.paper};font-family:${F.body};color:${C.ink};}
    .pad-section{padding:52px 80px;}
    .pad-cover{padding:28px 80px 0;}
    .pad-topbar{padding:10px 80px;}
    .pad-footer{padding:20px 80px;}
    .inner{max-width:1200px;margin:0 auto;}
    .mob-hide{display:block;}.mob-show{display:none;}
    .rule-strong{border-top:6px solid ${C.ink};border-bottom:2px solid ${C.lime};padding-bottom:3px;margin-bottom:22px;}
    .rule-light{border-top:3px solid rgba(255,255,255,.12);border-bottom:2px solid ${C.lime};padding-bottom:3px;margin-bottom:22px;}
    @media(max-width:900px){
      .pad-section{padding:40px 32px;}.pad-cover{padding:24px 32px 0;}
      .pad-topbar{padding:10px 32px;}.pad-footer{padding:18px 32px;}
      .mob-stack{flex-direction:column!important;}.mob-full{width:100%!important;}
      .mob-grid-2{grid-template-columns:1fr 1fr!important;}
      .mob-grid-1{grid-template-columns:1fr!important;}
    }
    @media(max-width:600px){
      .pad-section{padding:28px 18px;}.pad-cover{padding:20px 18px 0;}
      .pad-topbar{padding:10px 20px;}.pad-footer{padding:16px 18px;}
      .mob-hide{display:none;}.mob-show{display:block;}
      .mob-grid-2{grid-template-columns:1fr 1fr!important;}
      .mob-grid-1{grid-template-columns:1fr!important;}
      .mob-gap-sm{gap:8px!important;}
      .mob-pad-sm{padding:18px!important;}
      .mob-text-sm{font-size:11px!important;}
    }
  `}</style>
);

// ── SVG Logo ──────────────────────────────────────────────────────────────
const Logo = ({height=26,variant='white'}) => {
  const textFill = variant==='white'?'#ffffff':C.forest;
  const h = height;
  const markH = h * 0.85;
  return (
    <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
      {/* BRIDGE mark */}
      <svg height={markH} viewBox="0 0 939.8 894.1" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
        <path fill={C.forest} d="M438.6,0h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0C196.3,894.1,0,698.1,0,456.3v-18.5C0,196,196.3,0,438.5,0h.1Z"/>
        <rect fill={C.forest} x="494" y="320.4" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
        <rect fill={C.lime} x="764.7" y="320.4" width="175.1" height="257.7"/>
        <rect fill={C.lime} x="764.7" y="635.4" width="175.1" height="257.7"/>
      </svg>
      {/* Text */}
      <div style={{display:'flex',flexDirection:'column',gap:0}}>
        <span style={{fontFamily:F.sans,fontSize:Math.max(11,h*0.5),fontWeight:700,color:textFill,letterSpacing:'2px',lineHeight:1}}>BRIDGE</span>
        <span style={{fontFamily:F.sans,fontSize:Math.max(6,h*0.26),fontWeight:400,color:textFill,letterSpacing:'1.5px',lineHeight:1.3,opacity:0.5}}>PUBLIC BENEFIT CORP.</span>
      </div>
    </div>
  );
};

const Chk = ({s=15,color=C.lime}) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none" style={{flexShrink:0,marginTop:1}}>
    <circle cx="8" cy="8" r="8" fill={color} opacity=".18"/>
    <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Arr = ({s=15}) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none" style={{flexShrink:0,marginTop:2}}>
    <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke={C.forest} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── TopBar ────────────────────────────────────────────────────────────────
const TopBar = () => {
  const m = useIsMobile();
  return (
    <div style={{background:C.paper,borderBottom:`1px solid ${C.border}`,position:'sticky',top:0,zIndex:100,padding:m?'8px 20px':'10px 80px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:m?8:14}}>
          <Logo variant="dark" height={m?20:24}/>
          {!m && <div style={{width:1,height:18,background:C.border}}/>}
          {!m && <span style={{fontFamily:F.sans,fontSize:10,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase'}}>RentGuard · Ghana</span>}
          {m && <span style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:1.5,textTransform:'uppercase'}}>RentGuard</span>}
        </div>
        <div style={{background:C.forest,color:C.lime,fontFamily:F.sans,fontSize:m?8:9,fontWeight:700,padding:m?'2px 6px':'3px 8px',letterSpacing:1.5,textTransform:'uppercase'}}>
          Production Ready
        </div>
      </div>
    </div>
  );
};

// ── Cover ─────────────────────────────────────────────────────────────────
const Cover = () => {
  const m = useIsMobile();
  const stats = [
    {val:'19M',label:'Ghanaians Who Rent'},
    {val:'60%',label:'No Tenancy Agreement'},
    {val:'6 mo.',label:'Legal Advance Cap'},
    {val:'Sep 2026',label:'Full Enforcement'},
    {val:'Act 220',label:'Legal Foundation'},
  ];
  return (
    <div style={{background:C.ink,padding:m?'20px 20px 0':'28px 80px 0'}}>
      <div className="inner">
        {/* Eyebrow */}
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:m?20:32,paddingTop:12}}>
          <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:3,textTransform:'uppercase'}}>
            A BRIDGE PBC Application
          </div>
          {!m && <div style={{flex:1,height:1,background:'rgba(184,217,53,0.3)'}}/>}
          {!m && <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2}}>Ghana · April 2026</div>}
        </div>

        <div style={{fontFamily:F.display,fontSize:m?36:72,fontWeight:900,color:C.paper,lineHeight:1.0,marginBottom:8}}>
          RentGuard
        </div>
        <div style={{fontFamily:F.display,fontSize:m?16:24,fontWeight:400,fontStyle:'italic',color:C.lime,marginBottom:m?16:24,lineHeight:1.4}}>
          Ghana's Digital Rent Enforcement & Intelligence Platform
        </div>
        <div style={{fontFamily:F.body,fontSize:m?14:15,color:'rgba(250,248,243,0.72)',lineHeight:1.85,maxWidth:740,marginBottom:m?24:40}}>
          A government-facing enforcement platform built on Act 220 and PNDCL 138 — enabling the Rent Taskforce, MMDAs, and the Ghana Revenue Authority to enforce rent laws at scale, while reducing friction for compliant landlords and protecting the rights of 19 million Ghanaian tenants.
        </div>

        {/* Stats */}
        {m ? (
          <div style={{borderTop:'1px solid rgba(255,255,255,0.12)',paddingTop:20,paddingBottom:24,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px 12px'}}>
            {stats.map((s,i) => (
              <div key={i}>
                <div style={{fontFamily:F.mono,fontSize:22,fontWeight:500,color:C.lime,lineHeight:1}}>{s.val}</div>
                <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:'rgba(255,255,255,0.38)',letterSpacing:1,textTransform:'uppercase',marginTop:4,lineHeight:1.4}}>{s.label}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{borderTop:'1px solid rgba(255,255,255,0.12)',paddingTop:28,paddingBottom:36,display:'flex',gap:48,flexWrap:'wrap'}}>
            {stats.map((s,i) => (
              <div key={i} style={{minWidth:90}}>
                <div style={{fontFamily:F.mono,fontSize:36,fontWeight:500,color:C.lime,lineHeight:1}}>{s.val}</div>
                <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:'rgba(255,255,255,0.38)',letterSpacing:1.5,textTransform:'uppercase',marginTop:6,lineHeight:1.5}}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Prepared For */}
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:m?12:16,paddingBottom:m?16:20}}>
          <div style={{fontFamily:F.sans,fontSize:9,color:'rgba(255,255,255,0.25)',letterSpacing:1.5,textTransform:'uppercase',marginBottom:6}}>Prepared for</div>
          <div style={{fontFamily:F.sans,fontSize:m?12:13,fontWeight:600,color:'rgba(255,255,255,0.45)'}}>Hon. Frederick Opoku, Acting Rent Commissioner</div>
          <div style={{fontFamily:F.sans,fontSize:m?10:11,color:'rgba(255,255,255,0.3)',marginTop:2}}>Rent Control Department · Ministry of Works, Housing and Water Resources</div>
          {!m && <div style={{fontFamily:F.mono,fontSize:9,color:'rgba(255,255,255,0.15)',marginTop:8}}>Confidential · April 2026</div>}
        </div>
      </div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// PLATFORM STATS STRIP 
// ══════════════════════════════════════════════════════════════════════════
const PlatformStats = () => {
  const m = useIsMobile();
  return (
  <div style={{background:C.ink,borderBottom:`4px solid ${C.lime}`,padding:m?'0 20px':'0 80px'}}>
    <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:m?'repeat(3, 1fr)':'repeat(6, 1fr)',gap:0}}>
      {[
        {val:'5',label:'User Roles',sub:'Each with dedicated interface'},
        {val:'45',label:'Workflows',sub:'Across all five roles'},
        {val:'16',label:'Ghana Regions',sub:'Full national coverage'},
        {val:'*714*1#',label:'USSD Access',sub:'Any phone. No data required.'},
        {val:'SHA-256',label:'Evidence Standard',sub:'Court-admissible records'},
        {val:'v4.0',label:'Current Build',sub:'Production-ready'},
      ].map((s,i,arr) => (
        <div key={i} style={{padding:m?'16px 10px':'28px 20px',paddingLeft:i===0?0:(m?10:20),borderRight:i<arr.length-1?'1px solid rgba(255,255,255,0.06)':'none'}}>
          <div style={{fontFamily:F.mono,fontSize:'clamp(18px,2.2vw,28px)',fontWeight:700,color:C.lime,lineHeight:1,marginBottom:8}}>{s.val}</div>
          <div style={{fontFamily:F.sans,fontSize:10,fontWeight:700,color:'rgba(250,248,243,0.85)',marginBottom:4,textTransform:'uppercase',letterSpacing:1.5}}>{s.label}</div>
          <div style={{fontFamily:F.body,fontSize:11,color:'rgba(250,248,243,0.35)',lineHeight:1.5}}>{s.sub}</div>
        </div>
      ))}
    </div>
  </div>
  );
};



// ══════════════════════════════════════════════════════════════════════════
// THE REFORM MOMENT — New section from pitch deck
// ══════════════════════════════════════════════════════════════════════════
const ReformMoment = () => {
  const m = useIsMobile();
  return (
  <div style={{background:C.forest,padding:m?'40px 20px':'52px 80px'}}>
    <div className="inner">
      <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:'rgba(184,217,53,0.7)',letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>
        The Reform Moment
      </div>
      <div className="rule-light"/>

      <div style={{display:'flex',gap:48,flexWrap:'wrap'}} className="mob-stack">
        <div style={{flex:'1 1 380px'}}>
          <div style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,30px)',fontWeight:700,color:C.paper,lineHeight:1.3,marginBottom:20}}>
            For the first time, the political will and the technology exist simultaneously.
          </div>
          {/* Paired quotes — the problem (Mar 19) + the commitment (Apr 11) */}
          <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:18,margin:'24px 0'}}>
            <div style={{fontFamily:F.display,fontSize:17,fontStyle:'italic',fontWeight:600,color:'rgba(250,248,243,0.85)',lineHeight:1.6}}>
              "Rent control over the years is losing the fight… Whether there is enough housing or not, the law is the law, and it must be obeyed."
            </div>
            <div style={{fontFamily:F.sans,fontSize:10,color:C.lime,marginTop:10,letterSpacing:'.3px'}}>
              ASAASE RADIO — 19 MAR 2026
            </div>
          </div>
          <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:18,margin:'24px 0'}}>
            <div style={{fontFamily:F.display,fontSize:17,fontStyle:'italic',fontWeight:600,color:'rgba(250,248,243,0.85)',lineHeight:1.6}}>
              "We are selling it digitally. Very soon, you'll see a digitised rent control where our activities will be fully digitised."
            </div>
            <div style={{fontFamily:F.sans,fontSize:10,color:C.lime,marginTop:10,letterSpacing:'.3px'}}>
              GHANAWEB TV — 11 APR 2026
            </div>
          </div>
          <div style={{fontFamily:F.sans,fontSize:9,color:'rgba(184,217,53,0.5)',letterSpacing:'2px',textTransform:'uppercase',marginTop:8,marginBottom:20}}>
            Frederick Opoku  ·  Acting Rent Commissioner
          </div>
          <div style={{fontFamily:F.body,fontSize:14,color:'rgba(250,248,243,0.6)',lineHeight:1.8}}>
            Opoku served as Secretary General of the National Tenants Union for over a decade before his appointment. He is an activist turned regulator who publicly admitted on Adom FM that the Department is in a "deplorable state" and called it a "toothless bulldog" before seeing the resource constraints firsthand. He now leads a reform agenda that directly mirrors the capabilities RentGuard was built to deliver.
          </div>
        </div>

        <div style={{flex:m?'1 1 100%':'0 0 280px'}}>
          <div style={{background:'rgba(0,0,0,0.25)',padding:m?18:24}}>
            <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:2,textTransform:'uppercase',marginBottom:16}}>Reform Timeline — 2026</div>
            {[
              {date:'Feb 4',title:'Taskforce Deployed',desc:'Yellow-uniformed officers in MMDA partnership'},
              {date:'Feb 9',title:'4-Pillar Reform Agenda',desc:'Enforcement, data, education, partnerships'},
              {date:'Feb 26',title:'Rent Card Mandate',desc:'Phased rollout — all tenancies covered'},
              {date:'Mar 1',title:'Rent Card Launch',desc:'Criminal offence to operate without one'},
              {date:'Mar 17',title:'Presidential Call',desc:'Mahama calls on tenants to report illegal advance rent'},
              {date:'Mar 19',title:'"Losing the Fight"',desc:'Commissioner calls for tools and partnerships'},
              {date:'Apr 11',title:'"Selling It Digitally"',desc:'Commissioner commits to digitised rent control'},
            ].map((t,i,arr) => (
              <div key={i} style={{display:'flex',gap:12,marginBottom:14,alignItems:'flex-start'}}>
                <div style={{fontFamily:F.mono,fontSize:14,fontWeight:500,color:i===arr.length-1?C.lime:'rgba(255,255,255,0.5)',minWidth:44}}>{t.date}</div>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:11,fontWeight:700,color:C.paper}}>{t.title}</div>
                  <div style={{fontFamily:F.body,fontSize:10,color:'rgba(255,255,255,0.45)',lineHeight:1.5,marginTop:2}}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* September enforcement deadline */}
          <div style={{background:'rgba(184,217,53,0.08)',padding:20,marginTop:2,borderLeft:`3px solid ${C.lime}`}}>
            <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:2,marginBottom:8}}>THE WINDOW</div>
            <div style={{fontFamily:F.mono,fontSize:36,fontWeight:500,color:C.lime,lineHeight:1}}>Sep 2026</div>
            <div style={{fontFamily:F.body,fontSize:11,color:'rgba(255,255,255,0.5)',lineHeight:1.5,marginTop:8}}>
              Full enforcement begins. Five months to put the digital infrastructure that activates the mandate in front of the Department's officers.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// PRODUCT POSITION — From pasted
// ══════════════════════════════════════════════════════════════════════════
const ProductPosition = () => {
  const m = useIsMobile();
  return (
  <div style={{background:C.paper,padding:m?'40px 20px':'52px 80px'}}>
    <div className="inner">
      <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>Strategic Position</div>
      <div className="rule-strong"/>

      <div style={{display:'flex',gap:48,flexWrap:'wrap'}} className="mob-stack">
        <div style={{flex:'1 1 380px'}}>
          <div style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.ink,lineHeight:1.3,marginBottom:20}}>
            Not a second portal. The enforcement layer that makes the first one work.
          </div>
          <div style={{fontFamily:F.body,fontSize:15,color:C.ink,lineHeight:1.85,marginBottom:16}}>
            Ghana's Rent Control Department has already built the digital foundation: <strong>rentcontrol.mwh.gov.gh</strong> is live in 15 offices across 11 regions. It handles property registration, complaint filing, and digital tenancy agreements. The infrastructure exists.
          </div>
          <div style={{fontFamily:F.body,fontSize:15,color:C.ink,lineHeight:1.85,marginBottom:16}}>
            What it currently cannot do is <em>enforce</em> at scale — in the field, in real time, with analytics that target effort where it matters most. The phased Rent Card mandate, the national Rent Taskforce deployment, and the Department's September enforcement window create the moment. RentGuard is that enforcement and intelligence layer.
          </div>
          <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:18,margin:'24px 0',fontFamily:F.display,fontSize:17,fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.6}}>
            "The goal is to close the loop: existing digital infrastructure handles service delivery — this platform makes those laws enforceable at scale."
          </div>
        </div>

        <div style={{flex:m?'1 1 100%':'0 0 260px'}}>
          <div style={{background:C.ink,padding:m?18:24}}>
            <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:2,textTransform:'uppercase',marginBottom:16}}>What RentGuard Is</div>
            {[
              'Enforcement & analytics layer on top of rentcontrol.mwh.gov.gh',
              'Field tool for the national Rent Taskforce',
              'Compliance engine for rent cards + tenancy registration',
              'Risk-scoring system for targeted inspections',
              'GRA data bridge for rental income taxation',
            ].map((item,i) => (
              <div key={i} style={{display:'flex',gap:10,marginBottom:12}}>
                <span style={{color:C.lime,fontFamily:F.mono,fontSize:13,flexShrink:0,marginTop:2}}>✓</span>
                <span style={{fontFamily:F.sans,fontSize:12,color:'rgba(250,248,243,0.82)',lineHeight:1.5}}>{item}</span>
              </div>
            ))}
            <div style={{borderTop:'1px solid rgba(255,255,255,0.12)',marginTop:16,paddingTop:16}}>
              <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>What It Is Not</div>
              {['A replacement for rentcontrol.mwh.gov.gh','A competing registration portal','A landlord-listings marketplace'].map((x,i) => (
                <div key={i} style={{fontFamily:F.sans,fontSize:11,color:'rgba(250,248,243,0.45)',marginBottom:6,paddingLeft:10,borderLeft:'1px solid rgba(255,255,255,0.12)'}}>✗ {x}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// THE ENFORCEMENT GAP — From pasted, enhanced with pitch deck data
// ══════════════════════════════════════════════════════════════════════════
const EnforcementGap = () => {
  const m = useIsMobile();
  const problems = [
    {stat:'19M',label:'Ghanaians who rent',detail:'Over 40% of the urban population. 2–3 years advance demanded despite a 6-month legal cap. GHS 24,000–36,000 upfront for a modest apartment.',severity:'high'},
    {stat:'60%',label:'No tenancy agreement',detail:'The vast majority of rental arrangements remain undocumented. Operating entirely outside the law. No written terms, no recourse.',severity:'high'},
    {stat:'3',label:'Vehicles nationwide',detail:'The Rent Control Department has 3 vehicles for inspection and enforcement across the entire country — one of them broken down. 15 offices in 11 regions — severely under-resourced.',severity:'high'},
    {stat:'0',label:'Digital enforcement tools',detail:'No case management system, no registration database, no field app for the Taskforce. Paper-based Rent Cards with no tracking capability.',severity:'high'},
    {stat:'6–12+',label:'Months per case',detail:'Backlogged rent tribunals. Cases take months to years. Justice delayed is justice denied. Drives the demand for high advance payments.',severity:'medium'},
    {stat:'1.8M',label:'Housing unit deficit',detail:'Widening by 100K+ annually. Gives landlords enormous power. Tenants accept any terms because alternatives don\'t exist.',severity:'medium'},
  ];

  const sev = {high:C.red,medium:C.amber,low:C.positive};

  return (
    <div style={{background:C.paperDark}} className="pad-section">
      <div className="inner">
        <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>
          The Enforcement Gap
        </div>
        <div className="rule-strong"/>
        <div style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:C.ink,marginBottom:32}}>
          The law exists. Enforcement infrastructure does not.
        </div>

        <div style={{...(m?{display:'flex',gap:12,overflowX:'auto',scrollSnapType:'x mandatory',WebkitOverflowScrolling:'touch',margin:'0 -20px',padding:'0 20px 8px'}:{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:0,border:`1px solid ${C.border}`})}}>
          {problems.map((p,i) => (
            <div key={i} style={{padding:24,borderBottom:`1px solid ${C.border}`,borderBottomWidth:3,borderBottomColor:sev[p.severity]}}>
              <div style={{fontFamily:F.mono,fontSize:32,fontWeight:500,color:sev[p.severity],marginBottom:6,lineHeight:1}}>{p.stat}</div>
              <div style={{fontFamily:F.sans,fontSize:12,fontWeight:700,color:C.ink,marginBottom:8,lineHeight:1.4}}>{p.label}</div>
              <div style={{fontFamily:F.body,fontSize:12,color:C.muted,lineHeight:1.65}}>{p.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// 4-PILLAR REFORM ALIGNMENT — From pitch deck
// ══════════════════════════════════════════════════════════════════════════
const ReformAlignment = () => {
  const m = useIsMobile();
  const [openPillar, setOpenPillar] = useState(0);
  return (
  <div style={{background:C.paper,padding:m?'40px 20px':'52px 80px'}}>
    <div className="inner">
      <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>
        Reform Alignment
      </div>
      <div className="rule-strong"/>
      <div style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,24px)',fontWeight:700,color:C.ink,lineHeight:1.3,marginBottom:8}}>
        Every pillar of the reform agenda has a corresponding module in RentGuard.
      </div>
      <div style={{fontFamily:F.body,fontSize:14,color:C.muted,marginBottom:32,lineHeight:1.7}}>
        Acting Rent Commissioner Frederick Opoku announced a 4-pillar reform agenda on February 9, 2026. Below is a 1:1 mapping of each pillar to RentGuard capabilities.
      </div>

      <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(auto-fit, minmax(420px, 1fr))',gap:m?0:12}}>
        {[
          {n:'1',pillar:'Enforcement & Compliance',
            reform:'Strengthen enforcement of rent laws through taskforce deployment and systematic monitoring.',
            features:['End-to-end case management with full audit trail','Officer mobile app with GPS & evidence camera','Court-admissible document generation (Act 220 citations)','Real-time case routing from field to supervisor','Taskforce deployment management by MMDA region','Automated escalation rules and SLA tracking']},
          {n:'2',pillar:'Registration & Data Systems',
            reform:'Build reliable registration databases for landlords, tenants, and rental properties nationwide.',
            features:['Digital Rent Card issuance and lifecycle tracking','Mandatory tenant/landlord registration portal','National rental property database with GIS mapping','Compliance analytics dashboard with trend analysis','GRA rental income tax data integration (8%/15%)','CSV/PDF export for all data — actually downloads']},
          {n:'3',pillar:'Public Education & Sensitisation',
            reform:'Increase awareness of tenancy rights and responsibilities among all citizens.',
            features:['Tenant rights education portal with legal explainers','USSD channel *714*1# — reaches every phone in Ghana','Complaint filing with real-time status notifications','Landlord compliance ratings visible to tenants','Onboarding walkthrough for first-time users','Multi-language support: English, Twi, Ga, Ewe']},
          {n:'4',pillar:'Institutional Partnerships',
            reform:'Collaborate with regulatory bodies, civil society, and development partners.',
            features:['MMDA taskforce coordination and deployment tools','REAC agent verification and licensing module','NRAS integration for rental assistance program','Data sharing pipeline with Ghana Revenue Authority','API-ready architecture for development partner systems','Quarterly impact reporting for all stakeholders']},
        ].map((p,i) => (
          <div key={i} onClick={() => m && setOpenPillar(openPillar===i?-1:i)} style={{borderTop:`4px solid ${C.forest}`,padding:m?16:20,background:i%2===0?C.paper:C.paperDark,cursor:m?'pointer':'default'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:m?(openPillar===i?10:0):10}}>
              <div style={{width:32,height:32,background:C.forest,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontFamily:F.mono,fontSize:16,fontWeight:500,color:C.lime}}>{p.n}</span>
              </div>
              <div style={{fontFamily:F.sans,fontSize:15,fontWeight:700,color:C.ink}}>{p.pillar}</div>
            </div>
            <div style={{fontFamily:F.body,fontSize:12,color:C.muted,lineHeight:1.5,marginBottom:12,fontStyle:'italic'}}>{p.reform}</div>
            {(!m || openPillar===i) && <>
            <div style={{width:32,height:2,background:C.lime,marginBottom:12}}/>
            <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.forest,letterSpacing:1.5,textTransform:'uppercase',marginBottom:10}}>RentGuard Delivers</div>
            {p.features.map((f,j) => (
              <div key={j} style={{display:'flex',gap:8,marginBottom:6,alignItems:'flex-start'}}>
                <Chk s={14}/>
                <span style={{fontFamily:F.sans,fontSize:12,color:C.ink,lineHeight:1.4}}>{f}</span>
              </div>
            ))}
            </>}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// PRODUCT MODULES — From pasted (interactive tabs)
// ══════════════════════════════════════════════════════════════════════════
const ProductModules = () => {
  const m = useIsMobile();
  const [active,setActive] = useState(0);

  const modules = [
    {id:'M1',title:'Field Enforcement App',sub:'For Rent Taskforce Officers',color:C.forest,icon:'📱',
      overview:'An offline-capable Android application that gives Taskforce officers everything they need in the field: instant rent card verification, tenancy record lookup, violation capture with photo/GPS evidence, and direct case submission to the central system.',
      capabilities:['Scan or enter rent card ID — instant registry verification','GPS-anchor a building — see all registered units and tenancies','Capture violation: photo, document scan, GPS stamp, category','Offline sync — works without connectivity, uploads when online','Identify officers on MMDA-level deployment map'],
      legalHook:'Supports prosecution under PNDCL 138 offence provisions — all captured evidence is timestamped and tamper-logged.',
      metric:'Field inspections per officer per day: 4x increase vs. manual',
      outcome:'Court-admissible evidence packages → successful prosecution'},
    {id:'M2',title:'Digital Rent Card Engine',sub:'For Landlords + Rent Control',color:C.teal,icon:'🪪',
      overview:'Every tenancy gets a machine-readable Rent Card — QR code, unique ID, printable PDF — linked to the central registry. Payment recording is built in, with automatic enforcement of the 6-month advance cap.',
      capabilities:['Issue digital rent cards with unique ID + QR code','Record each payment: amount, date, method, period covered','Auto-flag: advance payment sum exceeds 6-month cap','Immutable audit trail — every edit is logged for evidence','Printable PDF rent card for tenants without smartphones'],
      legalHook:'Grounds the Department\'s phased rent card mandate in Act 220 s.20 and PNDCL 138 s.5.',
      metric:'Rent card issuance: from near-zero to 100% compliant tenancies within 24 months',
      outcome:'Warning letter → formal notice → court referral for advance rent violators'},
    {id:'M3',title:'Compliance Intelligence Dashboard',sub:'For Rent Control + Ministry',color:C.amber,icon:'📊',
      overview:'A national-level analytics dashboard giving the Rent Commissioner and Ministry leadership a real-time view of compliance rates, violation hotspots, advance rent violations, complaint patterns, and Taskforce effectiveness.',
      capabilities:['National compliance map — registration rates by MMDA','Advance rent violation detector — statistical anomaly alerts','Complaint hotspot clustering — building-level case aggregation','Taskforce deployment optimizer — risk-ranked inspection routing','GRA data bridge — rental income cross-check with declared tax'],
      legalHook:'Enables risk-based prosecution prioritization under Act 220 s.16(5).',
      metric:'Policy insight latency: from quarterly manual reports to live dashboards',
      outcome:'Finite enforcement resources directed at highest-impact targets'},
    {id:'M4',title:'Tenant Verification Layer',sub:'For Tenants + Citizens',color:C.limeDark,icon:'✅',
      overview:'A lightweight multi-channel interface — USSD, WhatsApp, web — that lets any tenant verify a rent card, confirm their landlord is registered, check legal advance rent limits, and initiate a structured complaint.',
      capabilities:['USSD *714*1# — verify rent card without smartphone','WhatsApp bot — check landlord registration status','Advance rent calculator — what is legal for your tenancy?','Structured complaint form — auto-routed to case system','Know-your-rights SMS guide — English, Twi, Ga, Ewe'],
      legalHook:'Activates PNDCL 138 tenant rights — empowers tenants to demand documentation.',
      metric:'Complaint conversion rate: from informal grievance to actionable case',
      outcome:'Every complaint tracked from filing to resolution — no case falls through'},
  ];

  const mod = modules[active];

  return (
    <div style={{background:C.paperDark,padding:m?'40px 20px':'52px 80px'}}>
      <div className="inner">
        <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>
          Product Architecture
        </div>
        <div className="rule-strong"/>
        <div style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:C.ink,marginBottom:8}}>
          Four integrated modules. One enforcement layer.
        </div>
        <div style={{fontFamily:F.body,fontSize:14,color:C.muted,marginBottom:32,lineHeight:1.7}}>
          Each module serves a different user — but all modules share the same registry backbone and feed the same compliance intelligence system.
        </div>

        <div style={{display:'flex',gap:4,marginBottom:m?20:28,...(m?{overflowX:'auto',WebkitOverflowScrolling:'touch',margin:'0 -20px',padding:'0 20px 4px'}:{flexWrap:'wrap'})}}>
          {modules.map((m,i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{fontFamily:F.sans,fontSize:m?10:11,fontWeight:700,padding:m?'6px 12px':'8px 16px',cursor:'pointer',border:'none',letterSpacing:0.5,whiteSpace:'nowrap',flexShrink:0,
                background:active===i?mod.color:C.paper,color:active===i?C.white:C.muted,transition:'all 0.2s'}}>
              {m.icon} {m.id}
            </button>
          ))}
        </div>

        <div style={{border:`2px solid ${mod.color}`,transition:'border-color 0.3s'}}>
          <div style={{background:mod.color,padding:'16px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.white}}>{mod.title}</div>
              <div style={{fontFamily:F.sans,fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.65)',letterSpacing:2,textTransform:'uppercase',marginTop:2}}>{mod.sub}</div>
            </div>
            <div style={{fontFamily:F.sans,fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.45)',letterSpacing:2}}>{mod.id}</div>
          </div>

          <div style={{padding:m?16:24,display:'flex',flexDirection:m?'column':'row',gap:m?20:32,flexWrap:'wrap'}}>
            <div style={{flex:m?'1 1 auto':'1 1 280px'}}>
              <div style={{fontFamily:F.body,fontSize:14,color:C.ink,lineHeight:1.8,marginBottom:20}}>{mod.overview}</div>
              <div style={{background:'rgba(27,77,62,0.06)',borderLeft:`3px solid ${mod.color}`,padding:'12px 16px'}}>
                <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:6}}>Legal Foundation</div>
                <div style={{fontFamily:F.body,fontSize:12,color:C.muted,lineHeight:1.65}}>{mod.legalHook}</div>
              </div>
              {mod.outcome && (
                <div style={{background:C.paperDark,borderLeft:`3px solid ${C.lime}`,padding:'10px 16px',marginTop:10}}>
                  <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.forest,letterSpacing:1.5,textTransform:'uppercase',marginBottom:4}}>Legal Outcome</div>
                  <div style={{fontFamily:F.body,fontSize:12,color:C.forest,fontStyle:'italic',lineHeight:1.5}}>{mod.outcome}</div>
                </div>
              )}
            </div>
            <div style={{flex:m?'1 1 auto':'0 0 240px'}}>
              <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>Capabilities</div>
              {mod.capabilities.map((cap,i) => (
                <div key={i} style={{display:'flex',gap:10,marginBottom:10,alignItems:'flex-start'}}>
                  <div style={{width:6,height:6,background:mod.color,flexShrink:0,marginTop:5}}/>
                  <span style={{fontFamily:F.sans,fontSize:12,color:C.ink,lineHeight:1.5}}>{cap}</span>
                </div>
              ))}
              <div style={{borderTop:`1px solid ${C.border}`,marginTop:16,paddingTop:14}}>
                <span style={{fontFamily:F.mono,fontSize:11,color:mod.color,lineHeight:1.5}}>{mod.metric}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



// ══════════════════════════════════════════════════════════════════════════
// PLATFORM WALKTHROUGH — Text-based with page lists + KPI targets 
// ══════════════════════════════════════════════════════════════════════════
const PlatformWalkthrough = () => {
  const m = useIsMobile();
  const [activeRole,setActiveRole] = useState(0);
  const [activePage,setActivePage] = useState(0);

  const roles = [
    {title:'National Admin',org:'Ministry of Works and Housing',color:'#0FA86A',
      tagline:'The Commissioner sees everything — all 16 regions, all officers, all cases — in real time.',
      summary:'RentGuard transforms enforcement from a manual paper process into a live national intelligence system. The Admin interface is a command centre: compliance rates by MMDA, officer deployment, Taskforce effectiveness, and a direct pipeline to GRA.',
      pages:[
        {name:'Dashboard',desc:'National compliance score, active violations by severity, officer shift status, 6-month trend, region risk map. Refreshes every 2 minutes.'},
        {name:'Regional Intelligence',desc:'Drill into any MMDA. Registration rates, rent card coverage, violation density, Taskforce deployment. Compare regions side by side.'},
        {name:'All Cases',desc:'Full national case list — sortable by severity, status, district, or age. Bulk assign, escalate, or close. CSV export for Ministry reporting.'},
        {name:'GRA Export',desc:'Monthly SFTP pipeline of TIN-matched landlord income records to GRA. Every transfer logged and confirmed in the audit trail.'},
        {name:'Enforcement Flow',desc:'Interactive 7-step walkthrough of the complete case lifecycle — complaint through inspection, notice, GRA referral, and resolution.'},
        {name:'Audit Log',desc:'15-field immutable log: actor, timestamp, entity, action, previous state, new state, IP, device. SHA-256 hashed. Court-ready.'},
      ],
      kpis:[{label:'Tenancy Registration',from:'38%',to:'70%',time:'12 months'},{label:'Rent Card Adoption',from:'29%',to:'60%',time:'12 months'},{label:'GRA Records/Month',from:'0',to:'847+',time:'Month 1'},{label:'Avg Advance',from:'9.2 mo',to:'≤ 6 mo',time:'From enforcement'}]},
    {title:'Case Manager',org:'Rent Control Department',color:'#4B9EFF',
      tagline:'Every complaint lands in one queue. Every case tracked against a deadline. Every notice legally grounded.',
      summary:'Routes complaints from USSD, WhatsApp, web, and field inspections into a single SLA-tracked workflow. Notices auto-generated with legal citations.',
      pages:[
        {name:'Case Queue',desc:'Sortable, filterable list. Search by ID, landlord, property, district. Bulk assign, escalate, export to CSV.'},
        {name:'Case Detail',desc:'5-stage pipeline, officer notes, drag-and-drop evidence, SHA-256 receipt verification, one-click notice generation.'},
        {name:'SLA Tracker',desc:'Visual deadline per severity: Critical 24h, High 48h, Medium 5 days. Overdue flagged red. Push alert at 80%.'},
        {name:'Assign Officers',desc:'Route by district, workload, proximity. Officers receive SMS immediately on assignment.'},
        {name:'Notice Generator',desc:'Auto-populates with case details, Act 220 / PNDCL 138 citations, deadlines, consequences. Three notice types.'},
        {name:'Performance',desc:'Monthly inspections, cases per officer, resolution rates, SLA compliance — individually and by district.'},
      ],
      kpis:[{label:'Critical Resolution',from:'No baseline',to:'< 24 hours',time:'From launch'},{label:'Same-Day Assignment',from:'No baseline',to:'> 90%',time:'From launch'},{label:'Notice-to-Compliance',from:'No baseline',to:'Tracked',time:'Q1'},{label:'Officer Utilisation',from:'No baseline',to:'Per district',time:'Monthly'}]},
    {title:'Taskforce Officer',org:'Field Operations · Android-First',color:'#E8900A',
      tagline:'The entire enforcement interface fits in a phone — optimised for low-connectivity field conditions across Ghana.',
      summary:'Risk-ranked daily route, offline-capable inspection checklist, QR scanner, GPS evidence capture — all on a low-end Android phone. Syncs atomically when signal returns.',
      pages:[
        {name:"Today’s Shift",desc:'Risk-ranked property route. Progress bar. Activity timeline. Next-priority property with full violation history.'},
        {name:'Inspect Property',desc:'PNDCL 138 s.4 checklist: rent card posted, written agreement, MMDA registration, advance ≤ 6 months, habitability.'},
        {name:'QR Scanner',desc:'Scan rent card QR. Green = valid. Red = violation with advance months, card status, landlord identity.'},
        {name:'Map View',desc:'GPS map of district properties, colour-coded by risk score. Navigate to next stop with priority route.'},
        {name:'Sync Status',desc:'Offline queue, last sync, pending uploads, connection health. Atomic sync only — partial uploads rejected.'},
        {name:'Shift Handover',desc:'Properties inspected, violations filed, pending items, notes. Auto-routed to Case Manager.'},
      ],
      kpis:[{label:'Route Completion',from:'No baseline',to:'> 80%/shift',time:'From launch'},{label:'GPS Evidence Rate',from:'0%',to:'100% of violations',time:'From launch'},{label:'Offline Sync',from:'N/A',to:'Zero data loss',time:'Guaranteed'},{label:'Cards Scanned/Shift',from:'No baseline',to:'Tracked',time:'Monthly'}]},
    {title:'Landlord',org:'Registered Property Owner',color:'#C8E830',
      tagline:'Compliance turned into a clear score, an action plan, and a step-by-step registration wizard.',
      summary:'A live score (0–100), an itemised action plan, step-by-step registration, and automatic GRA income summary. The path from non-compliant to rent card issued is visible.',
      pages:[
        {name:'Compliance Overview',desc:'Real-time score (0–100) with itemised action plan. Score improves as registration, rent cards, and cases resolve.'},
        {name:'Register Property',desc:'3-step wizard: property details → unit config → document upload. Syncs to rentcontrol.mwh.gov.gh. SMS confirmation.'},
        {name:'Rent Cards',desc:'Issue digital cards per unit. Advance compliance check runs before issuance — flags if proposed advance exceeds 6-month cap.'},
        {name:'Tax Summary',desc:'GRA income breakdown: registered units, total rent income, advance collected. Downloadable PDF.'},
        {name:'Tenancy Renewal',desc:'3-step renewal. Advance check on new amount. New rent card auto-generated on completion.'},
        {name:'Documents',desc:'Drag-and-drop: title deeds, building permits, tenancy agreements, utility clearances. Status tracking per doc.'},
      ],
      kpis:[{label:'Compliance Score',from:'34 (avg)',to:'> 80',time:'6 months'},{label:'Rent Cards',from:'0%',to:'100% of units',time:'Per property'},{label:'Advance Compliance',from:'9.2 months',to:'≤ 6 months',time:'On renewal'},{label:'GRA Link',from:'Unlinked',to:'TIN-matched',time:'On onboarding'}]},
    {title:'Tenant',org:'Every Renter in Ghana',color:'#E5483A',
      tagline:'Every tenant has legal rights. RentGuard makes those rights visible, verifiable, and actionable.',
      summary:'Accessible by smartphone, feature phone (*714*1#), or WhatsApp. Rights in plain language, complaint tracking, legal aid directory, emergency eviction alerts. No app download.',
      pages:[
        {name:'My Tenancy',desc:'Property, rent, advance collected, rent card status. Auto-alert if advance exceeds 6-month cap.'},
        {name:'Complaint Tracker',desc:'5-stage: Submitted → Assigned → Inspection → Notice → Resolved. Officer updates visible. Estimated time.'},
        {name:'Verify Card',desc:'Card number or QR scan. Real-time: advance months, compliance status, landlord registration, card validity.'},
        {name:'USSD *714*1#',desc:'4-option menu: verification, complaint filing, landlord check, rights lookup. Any phone. No data.'},
        {name:'Eviction & Legal',desc:'12 legal grounds for illegal eviction. 5 verified legal aid organisations with free tenant services.'},
        {name:'My Rights',desc:'6 rights under Ghanaian law, all cited: max advance, written agreement, rent card, habitability, receipts, eviction protection.'},
      ],
      kpis:[{label:'Complaints Tracked',from:'0',to:'All',time:'Day 1'},{label:'USSD Submissions',from:'0',to:'200+/month',time:'6 months'},{label:'Advance Violations',from:'Invisible',to:'Auto-detected',time:'On check'},{label:'Legal Aid',from:'0',to:'Tracked monthly',time:'Q2'}]},
  ];

  const role = roles[activeRole];

  return (
    <div style={{background:C.paper,padding:m?'40px 20px':'52px 80px'}}>
      <div className="inner">
        <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>Platform Walkthrough · Five Roles</div>
        <div className="rule-strong"/>
        <div style={{fontFamily:F.display,fontSize:'clamp(18px,2.2vw,28px)',fontWeight:700,color:C.ink,marginBottom:8,lineHeight:1.25}}>
          Every person in the enforcement chain has a dedicated interface.
        </div>
        <div style={{fontFamily:F.body,fontSize:14,color:C.muted,lineHeight:1.75,marginBottom:36,maxWidth:640}}>
          No generic dashboard stretched to fit multiple roles. Each of the five user types gets a purpose-built experience mapped to their enforcement or protection responsibilities under Ghanaian law.
        </div>

        <div style={{display:'grid',gridTemplateColumns:m?'1fr':'5fr 4fr',gap:m?24:40,alignItems:'start'}}>
          <div>
            {/* Role selector tabs */}
            <div style={{display:'flex',gap:2,marginBottom:m?20:32,...(m?{overflowX:'auto',WebkitOverflowScrolling:'touch',margin:'0 -20px',padding:'0 20px 4px'}:{flexWrap:'wrap'})}}>
              {roles.map((r,i) => (
                <button key={i} onClick={() => {setActiveRole(i);setActivePage(0);}}
                  style={{padding:m?'8px 14px':'10px 18px',background:activeRole===i?C.ink:C.paperDark,border:`1px solid ${activeRole===i?C.ink:C.border}`,borderBottom:activeRole===i?`3px solid ${r.color}`:'3px solid transparent',fontFamily:F.sans,fontSize:m?10:11,fontWeight:700,color:activeRole===i?C.paper:C.muted,cursor:'pointer',transition:'all 0.2s',whiteSpace:'nowrap',flexShrink:0}}>
                  {r.title}
                </button>
              ))}
            </div>

            <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:18}}>
              <div style={{width:10,height:10,borderRadius:'50%',background:role.color,flexShrink:0}}/>
              <div style={{fontFamily:F.sans,fontSize:15,fontWeight:700,color:C.ink}}>{role.title}</div>
              <div style={{fontFamily:F.mono,fontSize:10,color:C.muted}}>· {role.org}</div>
            </div>
            <p style={{fontFamily:F.body,fontStyle:'italic',fontSize:14,color:C.ink,borderLeft:`3px solid ${role.color}`,paddingLeft:14,marginBottom:20,lineHeight:1.7}}>
              {role.tagline}
            </p>
            <p style={{fontFamily:F.body,fontSize:13,color:C.muted,lineHeight:1.8,marginBottom:24}}>{role.summary}</p>
            <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>
              {role.pages.length} Dedicated Workflows
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:1}}>
              {role.pages.map((p,i) => (
                <div key={i} onClick={() => setActivePage(i)}
                  style={{padding:'11px 14px',background:activePage===i?C.ink:(i%2===0?C.paper:C.paperDark),borderLeft:`3px solid ${activePage===i?role.color:'transparent'}`,cursor:'pointer',transition:'all 0.15s'}}>
                  <div style={{fontFamily:F.sans,fontSize:12,fontWeight:700,color:activePage===i?C.paper:C.ink,marginBottom:activePage===i?4:0}}>{p.name}</div>
                  {activePage===i && (
                    <div style={{fontFamily:F.body,fontSize:12,color:'rgba(250,248,243,0.65)',lineHeight:1.65}}>{p.desc}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:14}}>Performance Targets</div>
            <div style={{display:'flex',flexDirection:'column',gap:2}}>
              {role.kpis.map((kpi,i) => (
                <div key={i} style={{padding:16,background:C.paperDark,borderTop:i===0?`3px solid ${role.color}`:`1px solid ${C.border}`}}>
                  <div style={{fontFamily:F.sans,fontSize:10,fontWeight:700,color:C.muted,letterSpacing:1,textTransform:'uppercase',marginBottom:10}}>{kpi.label}</div>
                  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:6}}>
                    <div>
                      <div style={{fontFamily:F.mono,fontSize:9,color:C.muted}}>Baseline</div>
                      <div style={{fontFamily:F.mono,fontSize:m?15:18,fontWeight:700,color:C.muted,lineHeight:1}}>{kpi.from}</div>
                    </div>
                    <div style={{fontFamily:F.mono,fontSize:16,color:C.lime}}>→</div>
                    <div>
                      <div style={{fontFamily:F.mono,fontSize:9,color:C.positive}}>Target</div>
                      <div style={{fontFamily:F.mono,fontSize:m?15:18,fontWeight:700,color:C.positive,lineHeight:1}}>{kpi.to}</div>
                    </div>
                  </div>
                  <div style={{fontFamily:F.mono,fontSize:10,color:C.amber}}>{kpi.time}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:20,padding:'14px 16px',background:C.ink,borderLeft:`3px solid ${role.color}`}}>
              <div style={{fontFamily:F.mono,fontSize:28,fontWeight:700,color:role.color,lineHeight:1}}>{role.pages.length}</div>
              <div style={{fontFamily:F.sans,fontSize:11,fontWeight:700,color:'rgba(250,248,243,0.7)',marginTop:4}}>Dedicated workflows for this role</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// ENFORCEMENT LOGIC — From pasted (accordion)
// ══════════════════════════════════════════════════════════════════════════
const SystemLogic = () => {
  const m = useIsMobile();
  const rules = [
    {id:'L1',title:'Advance Rent Compliance Check',
      steps:['Get tenancy type: monthly (cap = 1 month) or longer (cap = 6 months)','Convert all rent to monthly equivalent (yearly ÷ 12, weekly × 4.33)','Sum all payments tagged as advance or recorded on/before tenancy start date','Calculate: advance_months = total_advance ÷ monthly_rent','If advance_months > cap → FLAG VIOLATION → create case record → attach severity','Recommended action: warning letter (first offence) or legal referral (repeat)'],
      output:'Case record with violation type, severity, recommended action, legal cite'},
    {id:'L2',title:'Rent Card Completeness Scan',
      steps:['For each property in a district: check against MMDA building database','For registered properties: query rent card issuance ratio (cards ÷ total tenancies)','Flag properties with ratio < 80% or zero rent cards issued','Cross-check: is tenancy agreement registered within 14-day statutory window?','Cluster flagged properties by geographic proximity for Taskforce routing','Output: daily inspection route for each officer by MMDA zone'],
      output:'Officer route card with flagged addresses, compliance gap type, GPS coordinates'},
    {id:'L3',title:'Landlord Risk Scoring',
      steps:['Aggregate per landlord: #properties, #tenancies, #complaints, #violations','Apply weighted score: unregistered tenancies (30%) + over-advance (30%) + complaint frequency (25%) + no rent cards (15%)','Rank all landlords within each MMDA by risk score','Identify top 10% of risk-scored landlords as priority inspection targets','Flag multi-property landlords (≥3 units) for GRA cross-referral','Update scores daily as new cases and complaints are submitted'],
      output:'Risk-ranked landlord list per MMDA, GRA referral queue, inspection priority schedule'},
  ];

  const [open,setOpen] = useState(0);

  return (
    <div style={{background:C.paperDark,padding:m?'40px 20px':'52px 80px'}}>
      <div className="inner">
        <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>
          Enforcement Logic
        </div>
        <div className="rule-strong"/>
        <div style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:C.ink,marginBottom:8}}>
          How the system makes decisions
        </div>
        <div style={{fontFamily:F.body,fontSize:14,color:C.muted,marginBottom:32,lineHeight:1.7}}>
          Three core enforcement logic chains translate legal obligations into automated action. Each is transparent, auditable, and grounded in Act 220 and PNDCL 138.
        </div>

        {rules.map((rule,i) => (
          <div key={i} style={{border:`1px solid ${C.border}`,marginBottom:8}}>
            <div onClick={() => setOpen(open===i?-1:i)}
              style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 20px',cursor:'pointer',background:open===i?C.forest:C.paper}}>
              <div style={{display:'flex',gap:14,alignItems:'center'}}>
                <span style={{fontFamily:F.mono,fontSize:11,color:open===i?C.lime:C.faint,fontWeight:500}}>{rule.id}</span>
                <span style={{fontFamily:F.sans,fontSize:13,fontWeight:700,color:open===i?C.white:C.ink}}>{rule.title}</span>
              </div>
              <span style={{color:open===i?C.lime:C.muted,fontFamily:F.mono,fontSize:16}}>{open===i?'−':'+'}</span>
            </div>
            {open===i && (
              <div style={{padding:20,background:C.paper,borderTop:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.sans,fontSize:10,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>Logic Steps</div>
                {rule.steps.map((step,j) => (
                  <div key={j} style={{display:'flex',gap:14,marginBottom:10,alignItems:'flex-start'}}>
                    <div style={{fontFamily:F.mono,fontSize:10,color:C.lime,fontWeight:700,background:C.ink,padding:'2px 6px',flexShrink:0,marginTop:1}}>{j+1}</div>
                    <span style={{fontFamily:F.body,fontSize:13,color:C.ink,lineHeight:1.65}}>{step}</span>
                  </div>
                ))}
                <div style={{borderTop:`2px solid ${C.lime}`,marginTop:16,paddingTop:14}}>
                  <span style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginRight:10}}>Output</span>
                  <span style={{fontFamily:F.body,fontSize:12,color:C.forest,fontStyle:'italic'}}>{rule.output}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// DATA MODEL 
// ══════════════════════════════════════════════════════════════════════════
const DataModel = () => {
  const m = useIsMobile();
  return (
  <div style={{background:C.paper,padding:m?'40px 20px':'52px 80px'}}>
    <div className="inner">
      <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>Data Architecture</div>
      <div className="rule-strong"/>
      <div style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:C.ink,marginBottom:32}}>
        Core data model &amp; derived enforcement indicators
      </div>
      <div style={{display:'flex',flexDirection:m?'column':'row',gap:m?20:32,flexWrap:'wrap'}}>
        <div style={{flex:m?'1 1 auto':'1 1 340px'}}>
          <div style={{fontFamily:F.sans,fontSize:10,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:14}}>Core Entities</div>
          {[
            {name:'Person',fields:['person_id','role','national_id','TIN','contact','verified']},
            {name:'Property',fields:['property_id','address','MMDA_code','landlord_id','dwelling_type','GPS_coords']},
            {name:'Tenancy',fields:['tenancy_id','property_id','tenant_id','rent_amount','frequency','status']},
            {name:'RentCard',fields:['rentcard_id','tenancy_id','card_number','QR_code','issue_date','status']},
            {name:'Payment',fields:['payment_id','rentcard_id','amount','date','method','period','recorded_by']},
            {name:'Case',fields:['case_id','type','source','officer_id','status','evidence_refs[]','outcome']},
          ].map((e,i) => (
            <div key={i} style={{marginBottom:14,background:C.paperDark,padding:'12px 14px',borderLeft:`3px solid ${C.lime}`}}>
              <div style={{fontFamily:F.mono,fontSize:13,fontWeight:700,color:C.forest,marginBottom:6}}>{e.name}</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                {e.fields.map((field,j) => (
                  <span key={j} style={{fontFamily:F.mono,fontSize:9,color:C.muted,background:C.paper,padding:'2px 6px',border:`1px solid ${C.border}`}}>{field}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{flex:m?'1 1 auto':'0 0 260px'}}>
          <div style={{fontFamily:F.sans,fontSize:10,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:14}}>Derived Indicators</div>
          {[
            {field:'advance_months',def:'Total advance ÷ monthly rent → vs. legal cap (1 or 6 months)'},
            {field:'compliance_score',def:'f(registration, rent_card, complaints, payments)'},
            {field:'landlord_risk_score',def:'Weighted: unregistered(30%) + over_advance(30%) + complaints(25%) + no_cards(15%)'},
          ].map((d,i) => (
            <div key={i} style={{marginBottom:14,background:C.ink,padding:16}}>
              <div style={{fontFamily:F.mono,fontSize:12,fontWeight:700,color:C.lime,marginBottom:6}}>{d.field}</div>
              <div style={{fontFamily:F.body,fontSize:12,color:'rgba(250,248,243,0.75)',lineHeight:1.65}}>{d.def}</div>
            </div>
          ))}

        </div>
      </div>
    </div>
  </div>
  );
};



// ══════════════════════════════════════════════════════════════════════════
// STAKEHOLDER MAP — From pasted
// ══════════════════════════════════════════════════════════════════════════
const Stakeholders = () => {
  const m = useIsMobile();
  const actors = [
    {name:'Rent Control Dept.',role:'Primary Owner + Policy Anchor',color:C.forest,
      value:'Real-time enforcement analytics, case management, rent card registry, national compliance visibility',
      ask:'API access to rentcontrol.mwh.gov.gh data layer + political mandate to enforce'},
    {name:'Rent Taskforce',role:'Primary Field User',color:C.teal,
      value:'Field verification app, GPS-anchored building lookup, violation capture workflow, daily route cards',
      ask:'Device provisioning for officers + training + MMDA coordination protocols'},
    {name:'MMDAs',role:'Local Enforcement Partners',color:C.amber,
      value:'District compliance dashboards, building inspection scheduling, rental stock visibility',
      ask:'Focal person per district + access to assembly property registers'},
    {name:'Ghana Revenue Authority',role:'Tax Intelligence Recipient',color:C.ink,
      value:'Aggregated rental income data cross-referenced with TIN, multi-property landlord flagging',
      ask:'Data sharing MOU + TIN matching protocol'},
    {name:'Landlords',role:'Compliance Target + Beneficiary',color:C.limeDark,
      value:'Compliance certificate for financing/insurance, protected legal standing, streamlined registration',
      ask:'Adoption of digital rent card system — incentive: lose Rent Control backing if non-compliant'},
    {name:'Tenants',role:'Rights Holders + Data Source',color:C.muted,
      value:'USSD verification, rights information, structured complaint pathway, legal documentation',
      ask:'Awareness of their right to demand documentation under PNDCL 138 s.4'},
  ];

  return (
    <div style={{background:C.paper,padding:m?'40px 20px':'52px 80px'}}>
      <div className="inner">
        <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>
          Stakeholder Map
        </div>
        <div className="rule-strong"/>
        <div style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:C.ink,marginBottom:32}}>
          Six actors. One coordinated enforcement ecosystem.
        </div>
        <div style={m?{display:'flex',gap:12,overflowX:'auto',scrollSnapType:'x mandatory',WebkitOverflowScrolling:'touch',margin:'0 -20px',padding:'0 20px 8px'}:{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:12}}>
          {actors.map((a,i) => (
            <div key={i} style={{borderTop:`4px solid ${a.color}`,padding:m?16:20,background:C.paperDark,...(m?{minWidth:'80%',maxWidth:'80%',flexShrink:0,scrollSnapAlign:'start'}:{})}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                <div style={{fontFamily:F.sans,fontSize:14,fontWeight:700,color:C.ink}}>{a.name}</div>
                <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:a.color,letterSpacing:1.5,textTransform:'uppercase',textAlign:'right',maxWidth:120,lineHeight:1.4}}>{a.role}</div>
              </div>
              <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:1.5,textTransform:'uppercase',marginBottom:5}}>What they get</div>
              <div style={{fontFamily:F.body,fontSize:12,color:C.ink,lineHeight:1.6,marginBottom:12}}>{a.value}</div>
              <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:1.5,textTransform:'uppercase',marginBottom:5}}>What we need</div>
              <div style={{fontFamily:F.body,fontSize:12,color:C.muted,lineHeight:1.6,fontStyle:'italic'}}>{a.ask}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// ROADMAP — From pasted
// ══════════════════════════════════════════════════════════════════════════
const Roadmap = () => {
  const m = useIsMobile();
  const phases = [
    {num:'0',label:'Pilot & Co-Design',duration:'8 weeks',color:C.muted,
      items:['Stakeholder interviews: Rent Control leadership, IT team, Taskforce coordinators','Map existing data models + APIs of rentcontrol.mwh.gov.gh','Define integration contracts with the existing platform\'s technical team','Co-design field officer user journeys with actual Taskforce members','DPC registration in progress; data-sharing protocols outlined for formal phase']},
    {num:'1',label:'Field Enforcement MVP',duration:'12 weeks',color:C.amber,
      items:['Android app for field officers: rent card verification, basic case reporting','Core registry sync with rentcontrol.mwh.gov.gh (read layer)','Basic compliance dashboard: inspection coverage + violations by district','Pilot: 3 MMDAs in Accra with deployed Taskforce officers','Evidence capture workflow: photo + GPS + case categorisation']},
    {num:'2',label:'Full Rent Card & Lifecycle',duration:'16 weeks',color:C.forest,
      items:['Digital rent card issuance with QR + printable PDF','Payment recording with automatic advance rent cap enforcement','USSD tenant verification (*714*1# or similar short code)','Registration completeness scanning across all MMDA districts','Expanded landlord interface via official portal integration']},
    {num:'3',label:'Tax & Policy Intelligence',duration:'Ongoing',color:C.lime,
      items:['GRA data bridge: aggregated rental income APIs for tax cross-reference','Advanced landlord risk scoring + predictive analytics','Joint dashboards: Rent Control + GRA + Ministry of Works','Research-ready anonymized dataset exports for housing policy','Expansion to all 16 regions — completion of national coverage']},
  ];

  return (
    <div style={{background:C.paperDark,padding:m?'40px 20px':'52px 80px'}}>
      <div className="inner">
        <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>
          Implementation Roadmap
        </div>
        <div className="rule-strong"/>
        <div style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:C.ink,marginBottom:32}}>
          Four phases. Discovery-first. Government-aligned.
        </div>
        {phases.map((ph,i) => (
          <div key={i} style={{display:'flex',gap:0,borderBottom:`1px solid ${C.border}`}}>
            <div style={{width:m?48:72,background:ph.color,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,padding:m?'14px 0':'20px 0'}}>
              <span style={{fontFamily:F.mono,fontSize:m?20:28,fontWeight:500,color:ph.color===C.lime?C.ink:C.white,opacity:0.85}}>{ph.num}</span>
            </div>
            <div style={{padding:'20px 24px',flex:1}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12,flexWrap:'wrap',gap:8}}>
                <div>
                  <div style={{fontFamily:F.display,fontSize:17,fontWeight:700,color:C.ink}}>{ph.label}</div>
                  <div style={{fontFamily:F.mono,fontSize:10,color:C.muted,marginTop:2}}>{ph.duration}</div>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(auto-fit, minmax(200px, 1fr))',gap:'6px 20px'}}>
                {ph.items.map((item,j) => (
                  <div key={j} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                    <div style={{width:5,height:5,background:ph.color,flexShrink:0,marginTop:6}}/>
                    <span style={{fontFamily:F.body,fontSize:12,color:C.muted,lineHeight:1.55}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// PARTNERSHIP MODEL — From pitch deck
// ══════════════════════════════════════════════════════════════════════════
const Partnership = () => {
  const m = useIsMobile();
  return (
  <div style={{background:C.paper}} className="pad-section">
    <div className="inner">
      <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>
        Partnership Model
      </div>
      <div className="rule-strong"/>
      <div style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.ink,lineHeight:1.3,marginBottom:8}}>
        This is a partnership, not a procurement.
      </div>
      <div style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:C.forest,lineHeight:1.3,marginBottom:32}}>
        Zero cost to the Department during pilot.
      </div>

      <div style={{display:'flex',flexDirection:m?'column':'row',gap:16}}>
        <div style={{flex:'1 1 auto',background:C.forest,padding:m?20:28}}>
          <div style={{fontFamily:F.sans,fontSize:11,fontWeight:700,color:C.lime,letterSpacing:2,textTransform:'uppercase',marginBottom:20}}>What BRIDGE Offers</div>
          {[
            'Complete platform development, deployment, and maintenance at zero cost during the pilot phase',
            'Full officer training and field deployment support across all roles',
            'Data ownership: all platform data belongs to the Department, with full export at any time',
            'Data Protection Act (Act 843) compliance — DPC registration in progress',
            'Phased expansion roadmap aligned to your September enforcement timeline',
            'Technical support and platform updates throughout the partnership',
          ].map((item,i) => (
            <div key={i} style={{display:'flex',gap:10,marginBottom:12,alignItems:'flex-start'}}>
              <Chk s={16}/>
              <span style={{fontFamily:F.sans,fontSize:13,color:'rgba(255,255,255,0.9)',lineHeight:1.5}}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{flex:'1 1 auto',border:`2px solid ${C.forest}`,padding:m?20:28}}>
          <div style={{fontFamily:F.sans,fontSize:11,fontWeight:700,color:C.forest,letterSpacing:2,textTransform:'uppercase',marginBottom:20}}>What We Ask</div>
          {[
            'An 8-week informal pilot — no MOU, no procurement required to begin',
            '2–3 taskforce officers for one week of field testing in June',
            'Permission to mention coordination with your office in stakeholder meetings',
            'Honest feedback from your team during pilot deployment',
            'If the pilot proves itself, formal partnership talks ahead of September rollout',
            'Joint communication on reform milestones — shared credit for shared impact',
          ].map((item,i) => (
            <div key={i} style={{display:'flex',gap:10,marginBottom:12,alignItems:'flex-start'}}>
              <Arr s={16}/>
              <span style={{fontFamily:F.sans,fontSize:13,color:C.ink,lineHeight:1.5}}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div style={{background:C.ink,padding:m?'14px 16px':'18px 24px',marginTop:16,display:'flex',gap:0,alignItems:'center',flexWrap:'wrap'}}>
        <div style={{fontFamily:F.sans,fontSize:10,fontWeight:700,color:C.lime,letterSpacing:1.5,marginRight:24}}>NEXT STEPS</div>
        {['Handshake','DPC registration','Identify officers','Field pilot','Formal partnership'].map((step,i) => (
          <div key={i} style={{flex:'1 1 120px',display:'flex',alignItems:'center',gap:8,padding:'6px 14px',borderLeft:`1px solid rgba(255,255,255,.08)`}}>
            <div style={{fontFamily:F.mono,fontSize:16,color:C.lime,fontWeight:500}}>{i+1}</div>
            <span style={{fontFamily:F.sans,fontSize:10,color:'rgba(255,255,255,.75)'}}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// GOVERNMENT PITCH FRAME — From pasted
// ══════════════════════════════════════════════════════════════════════════
const PitchFrame = () => {
  const m = useIsMobile();
  return (
  <div style={{background:C.forest,padding:m?'40px 20px':'52px 80px'}}>
    <div className="inner">
      <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:'rgba(184,217,53,0.7)',letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>
        Government Pitch Frame
      </div>
      <div className="rule-light"/>
      <div style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,30px)',fontWeight:700,color:C.paper,lineHeight:1.3,marginBottom:32}}>
        Four things every government counterpart needs to hear
      </div>
      <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(2, 1fr)',gap:2}}>
        {[
          {n:'01',heading:'Close the enforcement loop',body:'Rent Control\'s digitization focused on service delivery. The enforcement side — field operations, violation detection, case intelligence — has no equivalent tool. RentGuard fills that gap.'},
          {n:'02',heading:'Deliver a national rental intelligence system',body:'The Commissioner can see compliance rates, violation hotspots, and Taskforce effectiveness in real time. The Ministry can demonstrate measurable impact.'},
          {n:'03',heading:'Support tax mobilization',body:'Ghana\'s rental income tax gap is significant. The Taskforce is mandated to work with GRA. RentGuard makes that coordination systematic — linking rental units to TIN numbers at scale.'},
          {n:'04',heading:'Build on, not replace, existing investments',body:'RentGuard integrates via API with rentcontrol.mwh.gov.gh. The existing platform handles citizen-facing service delivery. We extend it with the field, enforcement, and analytics layers.'},
        ].map((p,i) => (
          <div key={i} style={{background:'rgba(0,0,0,0.25)',padding:22}}>
            <div style={{fontFamily:F.mono,fontSize:28,fontWeight:500,color:C.lime,marginBottom:8,lineHeight:1}}>{p.n}</div>
            <div style={{fontFamily:F.sans,fontSize:13,fontWeight:700,color:C.paper,marginBottom:10}}>{p.heading}</div>
            <div style={{fontFamily:F.body,fontSize:13,color:'rgba(250,248,243,0.72)',lineHeight:1.75}}>{p.body}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// RISK REGISTER — From pasted
// ══════════════════════════════════════════════════════════════════════════
const Risks = () => {
  const m = useIsMobile();
  const risks = [
    {cat:'Institutional',sev:'medium',title:'Existing-platform vendor overlap perception',mit:'Position as complementary enforcement layer, not a competing portal. Propose interoperability with the existing platform\'s technical team — co-build or API integration.'},
    {cat:'Adoption',sev:'high',title:'Landlord non-compliance going underground',mit:'Enforcement without supply-side housing investment may push informal landlords off-market. Recommend parallel advocacy.'},
    {cat:'Technical',sev:'medium',title:'Data quality in historical records',mit:'Build robust deduplication and validation on import. Phase 0 data audit is a prerequisite.'},
    {cat:'Digital Divide',sev:'high',title:'Low-literacy, no-smartphone tenants excluded',mit:'USSD + WhatsApp + agent/kiosk modes are non-negotiable. In-person support at MMDAs required.'},
    {cat:'Governance',sev:'low',title:'Formal partnership timing',mit:'Lead with informal pilot. Formal MOU follows pilot validation, with government legal counsel guiding the structure and alignment to statutory mandates.'},
  ];

  const sevColor = {high:C.red,medium:C.amber,low:C.positive};

  return (
    <div style={{background:C.paperDark,padding:m?'40px 20px':'52px 80px'}}>
      <div className="inner">
        <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10}}>
          Risk Register
        </div>
        <div className="rule-strong"/>
        <div style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:C.ink,marginBottom:32}}>
          Key risks and how we address them
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:2}}>
          {/* Desktop table header */}
          <div style={{display:'grid',gridTemplateColumns:'100px 80px 1fr 1fr',gap:0,background:C.ink}} className="mob-hide">
            {['Category','Severity','Risk','Mitigation'].map((h,i) => (
              <div key={i} style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:'rgba(255,255,255,0.5)',letterSpacing:1.5,textTransform:'uppercase',padding:'10px 14px'}}>{h}</div>
            ))}
          </div>
          {risks.map((r,i) => (
            <div key={i}>
              {/* Desktop row */}
              <div style={{display:'grid',gridTemplateColumns:'100px 80px 1fr 1fr',gap:0,background:i%2===0?C.paper:C.paperDark,borderBottom:`1px solid ${C.border}`}} className="mob-hide">
                <div style={{padding:'12px 14px',fontFamily:F.sans,fontSize:11,fontWeight:700,color:C.muted}}>{r.cat}</div>
                <div style={{padding:'12px 14px'}}><span style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:sevColor[r.sev],letterSpacing:1.5,textTransform:'uppercase'}}>{r.sev}</span></div>
                <div style={{padding:'12px 14px',fontFamily:F.body,fontSize:12,color:C.ink,lineHeight:1.55}}>{r.title}</div>
                <div style={{padding:'12px 14px',fontFamily:F.body,fontSize:12,color:C.muted,lineHeight:1.55}}>{r.mit}</div>
              </div>
              {/* Mobile card */}
              <div style={{background:i%2===0?C.paper:C.paperDark,padding:16,borderBottom:`1px solid ${C.border}`,borderLeft:`3px solid ${sevColor[r.sev]}`}} className="mob-show">
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontFamily:F.sans,fontSize:11,fontWeight:700,color:C.ink}}>{r.cat}</span>
                  <span style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:sevColor[r.sev],letterSpacing:1,textTransform:'uppercase'}}>{r.sev}</span>
                </div>
                <div style={{fontFamily:F.body,fontSize:12,color:C.ink,lineHeight:1.55,marginBottom:8}}>{r.title}</div>
                <div style={{fontFamily:F.body,fontSize:11,color:C.muted,lineHeight:1.55,fontStyle:'italic'}}>{r.mit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// ABOUT BRIDGE PBC — 12-sector grid from pitch deck
// ══════════════════════════════════════════════════════════════════════════
const AboutBridge = () => {
  const m = useIsMobile();
  return (
  <div style={{background:C.ink,padding:m?'40px 20px':'52px 80px'}}>
    <div className="inner">
      <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10,opacity:.7}}>
        About BRIDGE PBC
      </div>
      <div className="rule-light"/>
      <div style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.paper,lineHeight:1.3,marginBottom:12}}>
        RentGuard is one product in a 12-sector Ghana-first portfolio.
      </div>
      <div style={{fontFamily:F.body,fontSize:14,color:'rgba(250,248,243,0.5)',lineHeight:1.7,marginBottom:32,maxWidth:600}}>
        BRIDGE PBC — Blending Resources and Innovation to Drive Ghana's Empowerment — is a Public Benefit Corporation building measurable Ghanaian flourishing outcomes across every sector of the economy.
      </div>

      <div style={{display:'grid',gridTemplateColumns:m?'repeat(2, 1fr)':'repeat(6, 1fr)',gap:6,marginBottom:32}}>
        {[
          {n:'01',s:'Infrastructure'},{n:'02',s:'Financial Inclusion'},{n:'03',s:'Health Systems'},
          {n:'04',s:'Technology'},{n:'05',s:'Education & Skills'},{n:'06',s:'Agriculture'},
          {n:'07',s:'Creative Industries'},{n:'08',s:'Housing & Real Estate'},{n:'09',s:'Tourism'},
          {n:'10',s:'Energy & Renewables'},{n:'11',s:'Manufacturing'},{n:'12',s:'Transportation'},
        ].map((sec,i) => (
          <div key={i} style={{padding:'14px 12px',background:i===7?'rgba(184,217,53,.15)':'rgba(255,255,255,.03)',
            borderLeft:i===7?`4px solid ${C.lime}`:'4px solid transparent',display:'flex',alignItems:'center',gap:10}}>
            <div style={{fontFamily:F.mono,fontSize:14,color:i===7?C.lime:C.faint,fontWeight:500}}>{sec.n}</div>
            <div>
              <div style={{fontFamily:F.sans,fontSize:10,color:i===7?C.white:'rgba(255,255,255,.5)',fontWeight:i===7?700:400}}>{sec.s}</div>
              {i===7 && <div style={{fontFamily:F.sans,fontSize:7,color:C.lime,marginTop:2}}>← RentGuard lives here</div>}
            </div>
          </div>
        ))}
      </div>

      <div style={{display:'flex',gap:40,flexWrap:'wrap'}}>
        {[['$100M+','Blended finance target'],['174+','Mapped ventures'],['12','Integrated sectors'],['Ghana-First','Always']].map(([v,l],i) => (
          <div key={i}>
            <div style={{fontFamily:F.mono,fontSize:24,fontWeight:500,color:C.lime}}>{v}</div>
            <div style={{fontFamily:F.sans,fontSize:9,color:'rgba(255,255,255,.3)',marginTop:3}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};


// Footer removed — replaced by RequestAccess CTA


// ══════════════════════════════════════════════════════════════════════════
// FOUR LAYERS — System Architecture Visual
// ══════════════════════════════════════════════════════════════════════════
const FourLayers = () => {
  const m = useIsMobile();
  return (
  <div style={{background:C.ink,padding:m?'40px 20px':'52px 80px'}}>
    <div className="inner">
      <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10,opacity:.7}}>
        System Architecture
      </div>
      <div className="rule-light"/>
      <div style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.paper,lineHeight:1.3,marginBottom:8}}>
        Four layers. One coherent enforcement platform.
      </div>
      <div style={{fontFamily:F.body,fontSize:14,color:'rgba(250,248,243,0.5)',lineHeight:1.7,marginBottom:36,maxWidth:560}}>
        Each layer handles a distinct function but shares the same data backbone. Nothing is siloed. Every action in the field feeds intelligence at the top.
      </div>

      {[
        {n:'01',layer:'Field Operations Layer',color:C.lime,
          desc:'What officers touch. The mobile-first interface for the national Rent Taskforce — GPS-tagged inspections, QR rent card scanning, offline evidence capture, daily route optimization. Works on low-end Android phones in areas with poor connectivity.',
          connects:'Feeds violation data, inspection records, and GPS evidence into →'},
        {n:'02',layer:'Case Management Layer',color:'#4ECDC4',
          desc:'Where complaints become cases. Structured intake from field, web, and USSD channels. Automated assignment by region. Full audit trail from filing through hearing to resolution. SLA tracking and escalation rules. Court-admissible document generation.',
          connects:'Aggregates case patterns and compliance data into →'},
        {n:'03',layer:'Intelligence & Analytics Layer',color:'#FFD93D',
          desc:'Where data becomes policy. National compliance dashboards. Landlord risk scoring with weighted indicators. Violation hotspot mapping. Advance rent anomaly detection. GRA rental income cross-referencing. The view the Commissioner and the Ministry need.',
          connects:'Informs deployment priorities and policy decisions for →'},
        {n:'04',layer:'Citizen Access Layer',color:'#FF8A65',
          desc:'Where rights are activated. USSD *714*1# for feature phones. WhatsApp bot for smartphones. Web portal for detailed interaction. Multi-language support. Complaint filing, case tracking, rights education, landlord verification — all channels feed into the same case system.',
          connects:'Generates demand-side data that strengthens all layers above'},
      ].map((l,i) => (
        <div key={i} style={{display:'flex',gap:0,marginBottom:2}}>
          {/* Number */}
          <div style={{width:m?48:72,background:l.color,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <span style={{fontFamily:F.mono,fontSize:m?16:24,fontWeight:500,color:C.ink}}>{l.n}</span>
          </div>
          {/* Content */}
          <div style={{flex:1,padding:m?'14px 16px':'20px 24px',background:'rgba(255,255,255,0.03)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            <div style={{fontFamily:F.sans,fontSize:15,fontWeight:700,color:C.paper,marginBottom:8}}>{l.layer}</div>
            <div style={{fontFamily:F.body,fontSize:m?12:13,color:'rgba(250,248,243,0.6)',lineHeight:1.7,marginBottom:10,...(m?{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}:{})}}>{l.desc}</div>
            <div style={{fontFamily:F.mono,fontSize:10,color:l.color,opacity:.7}}>{l.connects}</div>
          </div>
        </div>
      ))}

      {/* Integration strip */}
      <div style={{background:'rgba(255,255,255,0.03)',padding:'16px 24px',marginTop:12,borderLeft:`3px solid ${C.lime}`}}>
        <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:2,textTransform:'uppercase',marginBottom:10}}>Integration Points</div>
        <div style={{display:'flex',flexDirection:m?'column':'row',gap:m?8:24,flexWrap:'wrap'}}>
          {[
            'rentcontrol.mwh.gov.gh — bi-directional sync',
            'Ghana National ID System — identity verification',
            'TIN Registry (GRA) — landlord tax cross-reference',
            'MMDA Building Registers — property baseline',
            'MoMo / Payment APIs — payment recording',
          ].map((x,i) => (
            <span key={i} style={{fontFamily:F.sans,fontSize:11,color:'rgba(255,255,255,0.6)',paddingLeft:10,borderLeft:`2px solid ${C.lime}`}}>{x}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// SECURITY & LEGAL COMPLIANCE
// ══════════════════════════════════════════════════════════════════════════
const Security = () => {
  const m = useIsMobile();
  return (
  <div style={{background:C.forest,padding:m?'40px 20px':'52px 80px'}}>
    <div className="inner">
      <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:2.5,textTransform:'uppercase',marginBottom:10,opacity:.7}}>
        Security & Legal Compliance
      </div>
      <div className="rule-light"/>
      <div style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.paper,lineHeight:1.3,marginBottom:8}}>
        Built for government-grade trust.
      </div>
      <div style={{fontFamily:F.body,fontSize:14,color:'rgba(250,248,243,0.5)',lineHeight:1.7,marginBottom:36,maxWidth:560}}>
        Evidence must hold up in the Rent and Housing Committee. Audit logs must survive legal challenge. Tenant data must be protected. Every security decision was made with the courtroom in mind.
      </div>

      <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(3, 1fr)',gap:2}}>
        {[
          {title:'Immutable Audit Log',body:'Every action — every login, case update, evidence upload, and notice generation — is written to an append-only audit trail. Nothing can be deleted. The record of enforcement is permanent.',
            tag:'Tamper-Proof'},
          {title:'Court-Admissible Evidence Chain',body:'Photos, GPS coordinates, timestamps, and officer IDs form an unbroken chain of custody from field capture to courtroom presentation. Metadata cannot be modified after submission.',
            tag:'Evidence-Grade'},
          {title:'Role-Based Access Control',body:'Tenants cannot see officer routes. Landlords cannot see other landlords. National admins see everything. Row-level security enforced at the database level, not just the UI.',
            tag:'Zero Trust'},
          {title:'Act 220 & PNDCL 138 Compliance',body:'Every form, calculation, and notice is legally grounded. Advance caps, registration deadlines, eviction grounds, and court processes are all modelled from the actual statutes.',
            tag:'Statute-Native'},
          {title:'Offline-Safe Evidence Collection',body:'Evidence collected while offline is stored locally with GPS coordinates and device timestamp. Sync is atomic — partial syncs are rejected. The audit chain is never broken.',
            tag:'Field-Grade'},
          {title:'Data Protection Act Compliant',body:'Designed for Ghana\'s Data Protection Commission registration. PII is handled per the Data Protection Act 2012 (Act 843). Tenant data is never exposed to landlords. Evidence is access-controlled.',
            tag:'DPC Ghana'},
        ].map((item,i) => (
          <div key={i} style={{background:'rgba(255,255,255,0.03)',padding:22,borderLeft:`3px solid ${C.lime}`}}>
            <div style={{fontFamily:F.mono,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:1.5,textTransform:'uppercase',marginBottom:10}}>{item.tag}</div>
            <div style={{fontFamily:F.sans,fontSize:14,fontWeight:700,color:C.paper,marginBottom:8}}>{item.title}</div>
            <div style={{fontFamily:F.body,fontSize:12,color:'rgba(250,248,243,0.6)',lineHeight:1.65}}>{item.body}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// REQUEST ACCESS CTA
// ══════════════════════════════════════════════════════════════════════════
const RequestAccess = () => {
  const m = useIsMobile();
  return (
  <div style={{background:C.forest,padding:m?'48px 20px':'52px 80px'}}>
    <div style={{maxWidth:1200,margin:'0 auto',textAlign:'center'}}>
      <div style={{fontFamily:F.display,fontSize:'clamp(28px,4vw,42px)',fontWeight:700,color:C.white,marginTop:0,lineHeight:1.15}}>
        Ready for deployment.<br/><span style={{color:C.lime}}>Ready for partnership.</span>
      </div>
      <div style={{fontFamily:F.body,fontSize:15,color:'rgba(255,255,255,.55)',marginTop:12,lineHeight:1.7,maxWidth:520,margin:'12px auto 0'}}>
        RentGuard is the enforcement infrastructure the Rent Control Department's reform agenda requires. The platform is built. The team is ready. We're inviting government partners to experience the full demo.
      </div>

      {/* CTA Buttons */}
      <div style={{display:'flex',flexDirection:m?'column':'row',justifyContent:'center',gap:m?12:16,marginTop:m?24:32}}>
        <div style={{background:C.lime,padding:'14px 32px',cursor:'pointer'}}>
          <div style={{fontFamily:F.sans,fontSize:13,fontWeight:700,color:C.ink,letterSpacing:1}}>Request Demo Access</div>
        </div>
        <div style={{border:`2px solid rgba(255,255,255,0.2)`,padding:'14px 32px',cursor:'pointer'}}>
          <div style={{fontFamily:F.sans,fontSize:13,fontWeight:700,color:C.white,letterSpacing:1}}>Download Brief (PDF)</div>
        </div>
      </div>

      {/* Contact strip */}
      <div style={{display:'flex',flexDirection:m?'column':'row',justifyContent:'center',gap:m?20:48,marginTop:m?28:36,alignItems:m?'center':'flex-start'}}>
        {[['LIVE DEMO','bridgepbc.com/rentguard'],['WHATSAPP','+1 415 425 7401'],['EMAIL','RentGuard@bridgepbc.com']].map(([label,val],i) => (
          <div key={i} style={{textAlign:'center'}}>
            <div style={{fontFamily:F.sans,fontSize:10,color:C.lime,letterSpacing:2,fontWeight:700,marginBottom:6}}>{label}</div>
            <div style={{fontFamily:F.sans,fontSize:14,color:C.white}}>{val}</div>
          </div>
        ))}
      </div>

      {/* Legal references */}
      <div style={{display:'flex',justifyContent:'center',gap:20,marginTop:32,flexWrap:'wrap'}}>
        {['Act 220 (Rent Act 1963)','PNDCL 138','Data Protection Act (Act 843)','Real Estate Agency Act 2020'].map((law,i) => (
          <span key={i} style={{fontFamily:F.mono,fontSize:9,color:'rgba(255,255,255,.25)'}}>{law}</span>
        ))}
      </div>

      <div style={{fontFamily:F.sans,fontSize:9,color:'rgba(255,255,255,.15)',marginTop:32}}>
        BRIDGE PBC · Blending Resources and Innovation to Drive Ghana's Empowerment · Confidential · April 2026
      </div>
    </div>
  </div>
  );
};



// ══════════════════════════════════════════════════════════════════════════
// MOBILE PITCH — Dedicated mobile experience (≤768px)
// Purpose-built for phone, not a shrunken desktop.
// ══════════════════════════════════════════════════════════════════════════
const MobilePitch = () => {
  const [openPillar, setOpenPillar] = useState(-1);
  const [activeModule, setActiveModule] = useState(0);
  const [activeRole, setActiveRole] = useState(0);
  const [openLogic, setOpenLogic] = useState(0);

  const pad = {padding:'0 20px'};
  const sec = (bg,py=40) => ({background:bg,padding:`${py}px 20px`});

  // ─── Module data (compact) ───
  const modules = [
    {id:'M1',title:'Field Enforcement App',who:'Taskforce Officers',color:C.forest,
      desc:'Offline-capable Android app: rent card scanning, GPS evidence capture, violation reporting, daily route optimization.',
      legal:'PNDCL 138 — court-admissible evidence'},
    {id:'M2',title:'Digital Rent Card Engine',who:'Landlords + Rent Control',color:C.teal,
      desc:'Machine-readable rent cards with QR, payment recording, automatic 6-month advance cap enforcement.',
      legal:'Act 220 s.20 — phased rent card mandate'},
    {id:'M3',title:'Intelligence Dashboard',who:'Commissioner + Ministry',color:C.amber,
      desc:'National compliance rates, violation hotspots, Taskforce effectiveness, GRA rental income cross-check.',
      legal:'Act 220 s.16(5) — risk-based prosecution'},
    {id:'M4',title:'Tenant Verification Layer',who:'All Citizens',color:C.limeDark,
      desc:'USSD *714*1#, WhatsApp, web — verify rent cards, check landlords, file complaints, know your rights.',
      legal:'PNDCL 138 s.4 — tenant rights'},
  ];

  // ─── Role data (compact) ───
  const roles = [
    {title:'National Admin',color:'#0FA86A',pages:6,
      kpi:'38% → 70% registration in 12 months'},
    {title:'Case Manager',color:'#4B9EFF',pages:6,
      kpi:'Critical cases resolved < 24 hours'},
    {title:'Taskforce Officer',color:'#E8900A',pages:6,
      kpi:'100% GPS evidence on all violations'},
    {title:'Landlord',color:'#C8E830',pages:6,
      kpi:'Compliance score from 34 → 80+ in 6 months'},
    {title:'Tenant',color:'#E5483A',pages:6,
      kpi:'200+ USSD complaints/month by month 6'},
  ];

  // ─── Pillar data ───
  const pillars = [
    {n:'1',title:'Enforcement & Compliance',features:['End-to-end case management','Officer mobile app with GPS','Court-admissible documents','Real-time case routing','MMDA deployment tools','SLA tracking']},
    {n:'2',title:'Registration & Data',features:['Digital Rent Card issuance','Tenant/landlord registration','National property database','Compliance dashboards','GRA tax integration','CSV/PDF export']},
    {n:'3',title:'Public Education',features:['Tenant rights portal','USSD *714*1#','Complaint tracking','Landlord ratings','Multi-language support','Onboarding guides']},
    {n:'4',title:'Partnerships',features:['MMDA coordination','REAC agent verification','NRAS integration','GRA data pipeline','API-ready architecture','Impact reporting']},
  ];

  return (
    <div style={{background:C.paper,fontFamily:F.body,color:C.ink}}>
      <Gf/>

      {/* ── Sticky TopBar ── */}
      <div style={{background:C.paper,borderBottom:`1px solid ${C.border}`,position:'sticky',top:0,zIndex:100,padding:'8px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <Logo variant="dark" height={18}/>
          <div style={{width:1,height:14,background:C.border}}/>
          <span style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:1,textTransform:'uppercase'}}>RentGuard</span>
        </div>
        <div style={{background:C.forest,color:C.lime,fontFamily:F.sans,fontSize:7,fontWeight:700,padding:'2px 6px',letterSpacing:1,textTransform:'uppercase'}}>Ready</div>
      </div>

      {/* ── Cover ── */}
      <div style={{background:C.ink,padding:'28px 20px 0'}}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:C.lime,letterSpacing:2.5,textTransform:'uppercase',marginBottom:20}}>A BRIDGE PBC Application</div>
        <div style={{fontFamily:F.display,fontSize:40,fontWeight:900,color:C.paper,lineHeight:1.0,marginBottom:8}}>RentGuard</div>
        <div style={{fontFamily:F.display,fontSize:17,fontWeight:400,fontStyle:'italic',color:C.lime,marginBottom:20,lineHeight:1.4}}>Ghana's Digital Rent Enforcement & Intelligence Platform</div>
        <div style={{fontFamily:F.body,fontSize:14,color:'rgba(250,248,243,0.65)',lineHeight:1.8,marginBottom:24}}>
          Built on Act 220 and PNDCL 138 — enabling the Rent Taskforce, MMDAs, and GRA to enforce rent laws at scale while protecting the rights of 19 million Ghanaian tenants.
        </div>
        {/* Stats 3×2 */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px 16px',borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:24,paddingBottom:28}}>
          {[{v:'19M',l:'Ghanaians Who Rent'},{v:'60%',l:'No Tenancy Agreement'},{v:'6 mo.',l:'Legal Advance Cap'},{v:'Sep 2026',l:'Full Enforcement'},{v:'Act 220',l:'Legal Foundation'},{v:'16',l:'Ghana Regions'}].map((s,i) => (
            <div key={i}>
              <div style={{fontFamily:F.mono,fontSize:20,fontWeight:700,color:C.lime,lineHeight:1}}>{s.v}</div>
              <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:'rgba(255,255,255,0.35)',letterSpacing:1,textTransform:'uppercase',marginTop:4,lineHeight:1.3}}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* Prepared For */}
        <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:14,paddingBottom:18}}>
          <div style={{fontFamily:F.sans,fontSize:8,color:'rgba(255,255,255,0.2)',letterSpacing:1.5,textTransform:'uppercase',marginBottom:4}}>Prepared for</div>
          <div style={{fontFamily:F.sans,fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.4)'}}>Hon. Frederick Opoku, Acting Rent Commissioner</div>
          <div style={{fontFamily:F.sans,fontSize:10,color:'rgba(255,255,255,0.25)',marginTop:2}}>Rent Control Department · Ministry of Works, Housing and Water Resources</div>
        </div>
      </div>

      {/* ── Platform Stats ── */}
      <div style={{background:C.ink,borderBottom:`4px solid ${C.lime}`,padding:'0 20px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:0}}>
          {[{v:'5',l:'User Roles'},{v:'45',l:'Workflows'},{v:'*714*1#',l:'USSD Access'}].map((s,i) => (
            <div key={i} style={{padding:'16px 8px',borderRight:i<2?'1px solid rgba(255,255,255,0.06)':'none'}}>
              <div style={{fontFamily:F.mono,fontSize:18,fontWeight:700,color:C.lime,lineHeight:1}}>{s.v}</div>
              <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:'rgba(250,248,243,0.6)',letterSpacing:1,textTransform:'uppercase',marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Reform Moment ── */}
      <div style={sec(C.forest)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:'rgba(184,217,53,0.6)',letterSpacing:2,textTransform:'uppercase',marginBottom:16}}>The Reform Moment</div>
        {/* Quote 1 — the problem (Mar 19) */}
        <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:16,marginBottom:18}}>
          <div style={{fontFamily:F.display,fontSize:15,fontStyle:'italic',fontWeight:600,color:'rgba(250,248,243,0.85)',lineHeight:1.6}}>
            "Rent control over the years is losing the fight… the law is the law, and it must be obeyed."
          </div>
          <div style={{fontFamily:F.sans,fontSize:9,color:C.lime,marginTop:8,letterSpacing:'.3px'}}>ASAASE RADIO — 19 MAR 2026</div>
        </div>
        {/* Quote 2 — the commitment (Apr 11) */}
        <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:16,marginBottom:8}}>
          <div style={{fontFamily:F.display,fontSize:15,fontStyle:'italic',fontWeight:600,color:'rgba(250,248,243,0.85)',lineHeight:1.6}}>
            "We are selling it digitally. Very soon, you'll see a digitised rent control where our activities will be fully digitised."
          </div>
          <div style={{fontFamily:F.sans,fontSize:9,color:C.lime,marginTop:8,letterSpacing:'.3px'}}>GHANAWEB TV — 11 APR 2026</div>
        </div>
        <div style={{fontFamily:F.sans,fontSize:8,color:'rgba(184,217,53,0.5)',letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:24}}>
          Frederick Opoku  ·  Acting Rent Commissioner
        </div>
        {/* September window callout */}
        <div style={{background:'rgba(184,217,53,0.08)',padding:16,borderLeft:`3px solid ${C.lime}`}}>
          <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:2,marginBottom:6}}>THE WINDOW</div>
          <div style={{fontFamily:F.mono,fontSize:32,fontWeight:500,color:C.lime,lineHeight:1}}>Sep 2026</div>
          <div style={{fontFamily:F.body,fontSize:12,color:'rgba(255,255,255,0.5)',lineHeight:1.5,marginTop:6}}>Full enforcement begins. Five months to put the digital infrastructure in front of the Department's officers.</div>
        </div>
      </div>

      {/* ── Enforcement Gap ── */}
      <div style={sec(C.paperDark)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>The Enforcement Gap</div>
        <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.ink,marginBottom:20}}>The law exists. Enforcement infrastructure does not.</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {[{s:'19M',l:'Ghanaians who rent',c:C.red},{s:'60%',l:'No tenancy agreement',c:C.red},{s:'0',l:'Digital enforcement tools',c:C.red},{s:'3',l:'Vehicles nationwide',c:C.red},{s:'6-12+',l:'Months per case',c:C.amber},{s:'1.8M',l:'Housing unit deficit',c:C.amber}].map((p,i) => (
            <div key={i} style={{padding:14,background:C.paper,borderBottom:`3px solid ${p.c}`}}>
              <div style={{fontFamily:F.mono,fontSize:24,fontWeight:500,color:p.c,lineHeight:1}}>{p.s}</div>
              <div style={{fontFamily:F.sans,fontSize:10,fontWeight:700,color:C.ink,marginTop:6,lineHeight:1.3}}>{p.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Reform Alignment (accordion) ── */}
      <div style={sec(C.paper)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>Reform Alignment</div>
        <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.ink,marginBottom:20}}>Every pillar maps to a RentGuard module.</div>
        {pillars.map((p,i) => (
          <div key={i} style={{marginBottom:2}}>
            <div onClick={() => setOpenPillar(openPillar===i?-1:i)} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',background:openPillar===i?C.forest:C.paperDark,cursor:'pointer'}}>
              <div style={{width:28,height:28,background:openPillar===i?C.lime:C.forest,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontFamily:F.mono,fontSize:14,fontWeight:500,color:openPillar===i?C.ink:C.lime}}>{p.n}</span>
              </div>
              <span style={{fontFamily:F.sans,fontSize:13,fontWeight:700,color:openPillar===i?C.white:C.ink,flex:1}}>{p.title}</span>
              <span style={{fontFamily:F.mono,color:openPillar===i?C.lime:C.muted,fontSize:14}}>{openPillar===i?'−':'+'}</span>
            </div>
            {openPillar===i && (
              <div style={{padding:'12px 16px',background:C.paperDark}}>
                {p.features.map((feat,j) => (
                  <div key={j} style={{display:'flex',gap:8,marginBottom:6,alignItems:'flex-start'}}>
                    <Chk s={12}/><span style={{fontFamily:F.sans,fontSize:12,color:C.ink,lineHeight:1.4}}>{feat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Product Modules (swipeable cards) ── */}
      <div style={sec(C.paperDark)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>Product Architecture</div>
        <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.ink,marginBottom:20}}>Four integrated modules.</div>
        <div style={{display:'flex',gap:10,overflowX:'auto',scrollSnapType:'x mandatory',WebkitOverflowScrolling:'touch',margin:'0 -20px',padding:'0 20px 12px'}}>
          {modules.map((mod,i) => (
            <div key={i} style={{minWidth:'85%',flexShrink:0,scrollSnapAlign:'start',border:`2px solid ${mod.color}`,background:C.paper}}>
              <div style={{background:mod.color,padding:'12px 16px'}}>
                <div style={{fontFamily:F.sans,fontSize:14,fontWeight:700,color:C.white}}>{mod.title}</div>
                <div style={{fontFamily:F.sans,fontSize:9,fontWeight:600,color:'rgba(255,255,255,0.6)',letterSpacing:1,textTransform:'uppercase',marginTop:2}}>{mod.who}</div>
              </div>
              <div style={{padding:16}}>
                <div style={{fontFamily:F.body,fontSize:13,color:C.ink,lineHeight:1.7,marginBottom:12}}>{mod.desc}</div>
                <div style={{background:'rgba(27,77,62,0.06)',borderLeft:`3px solid ${mod.color}`,padding:'8px 12px'}}>
                  <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:C.muted,letterSpacing:1.5,textTransform:'uppercase',marginBottom:3}}>Legal Foundation</div>
                  <div style={{fontFamily:F.body,fontSize:11,color:C.muted,lineHeight:1.5}}>{mod.legal}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Platform Walkthrough (role selector + KPIs) ── */}
      <div style={sec(C.paper)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>Platform Walkthrough</div>
        <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.ink,marginBottom:20}}>Five dedicated interfaces.</div>
        <div style={{display:'flex',gap:6,overflowX:'auto',WebkitOverflowScrolling:'touch',margin:'0 -20px',padding:'0 20px 12px'}}>
          {roles.map((r,i) => (
            <div key={i} onClick={() => setActiveRole(i)} style={{minWidth:activeRole===i?'75%':'auto',flexShrink:0,padding:'12px 16px',background:activeRole===i?C.ink:C.paperDark,borderBottom:activeRole===i?`3px solid ${r.color}`:'3px solid transparent',cursor:'pointer',transition:'all 0.2s'}}>
              <div style={{fontFamily:F.sans,fontSize:12,fontWeight:700,color:activeRole===i?C.paper:C.muted}}>{r.title}</div>
              {activeRole===i && (
                <div style={{marginTop:10}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                    <div style={{fontFamily:F.mono,fontSize:24,fontWeight:700,color:r.color,lineHeight:1}}>{r.pages}</div>
                    <div style={{fontFamily:F.sans,fontSize:10,color:'rgba(250,248,243,0.5)'}}>dedicated workflows</div>
                  </div>
                  <div style={{fontFamily:F.mono,fontSize:11,color:C.lime,lineHeight:1.5}}>{r.kpi}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── System Architecture (simplified) ── */}
      <div style={sec(C.ink)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:'rgba(184,217,53,0.6)',letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>System Architecture</div>
        <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.paper,marginBottom:20}}>Four layers. One platform.</div>
        {[{n:'01',l:'Field Operations',color:C.lime,d:'Mobile app, GPS inspections, QR scanning, offline evidence capture.'},{n:'02',l:'Case Management',color:'#4ECDC4',d:'Complaint intake, SLA tracking, notice generation, audit trail.'},{n:'03',l:'Intelligence',color:'#FFD93D',d:'National dashboards, risk scoring, hotspot mapping, GRA data bridge.'},{n:'04',l:'Citizen Access',color:'#FF8A65',d:'USSD *714*1#, WhatsApp, web — complaint filing, rights lookup.'}].map((layer,i) => (
          <div key={i} style={{display:'flex',gap:0,marginBottom:2}}>
            <div style={{width:44,background:layer.color,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <span style={{fontFamily:F.mono,fontSize:16,fontWeight:500,color:C.ink}}>{layer.n}</span>
            </div>
            <div style={{flex:1,padding:'12px 14px',background:'rgba(255,255,255,0.03)'}}>
              <div style={{fontFamily:F.sans,fontSize:13,fontWeight:700,color:C.paper,marginBottom:4}}>{layer.l}</div>
              <div style={{fontFamily:F.body,fontSize:11,color:'rgba(250,248,243,0.5)',lineHeight:1.6}}>{layer.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Enforcement Logic (accordion) ── */}
      <div style={sec(C.paperDark)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>Enforcement Logic</div>
        <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.ink,marginBottom:20}}>How the system decides.</div>
        {[{id:'L1',title:'Advance Rent Check',out:'Violation case with severity + legal cite'},{id:'L2',title:'Rent Card Scan',out:'Officer route card with flagged addresses'},{id:'L3',title:'Landlord Risk Score',out:'Risk-ranked list per MMDA + GRA referral queue'}].map((rule,i) => (
          <div key={i} style={{border:`1px solid ${C.border}`,marginBottom:4}}>
            <div onClick={() => setOpenLogic(openLogic===i?-1:i)} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',cursor:'pointer',background:openLogic===i?C.forest:C.paper}}>
              <div style={{display:'flex',gap:10,alignItems:'center'}}>
                <span style={{fontFamily:F.mono,fontSize:10,color:openLogic===i?C.lime:C.faint,fontWeight:500}}>{rule.id}</span>
                <span style={{fontFamily:F.sans,fontSize:12,fontWeight:700,color:openLogic===i?C.white:C.ink}}>{rule.title}</span>
              </div>
              <span style={{color:openLogic===i?C.lime:C.muted,fontFamily:F.mono,fontSize:14}}>{openLogic===i?'−':'+'}</span>
            </div>
            {openLogic===i && (
              <div style={{padding:'12px 16px',background:C.paper,borderTop:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.muted,letterSpacing:1.5,textTransform:'uppercase',marginBottom:4}}>Output</div>
                <div style={{fontFamily:F.body,fontSize:12,color:C.forest,fontStyle:'italic',lineHeight:1.5}}>{rule.out}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Security (top 3) ── */}
      <div style={sec(C.forest)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:'rgba(184,217,53,0.6)',letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>Security & Compliance</div>
        <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.paper,marginBottom:20}}>Government-grade trust.</div>
        {[{tag:'Tamper-Proof',title:'Immutable Audit Log',body:'Every action written to an append-only trail. Nothing can be deleted.'},{tag:'Evidence-Grade',title:'Court-Admissible Evidence Chain',body:'Photos, GPS, timestamps form an unbroken chain from field to courtroom.'},{tag:'Zero Trust',title:'Role-Based Access Control',body:'Row-level database security. Tenants, landlords, officers — each sees only what they should.'},{tag:'DPC Ghana',title:'Data Protection Act Compliant',body:'Designed for DPC registration. PII handled per Act 843. Tenant data never exposed.'}].map((item,i) => (
          <div key={i} style={{background:'rgba(255,255,255,0.04)',padding:16,borderLeft:`3px solid ${C.lime}`,marginBottom:4}}>
            <div style={{fontFamily:F.mono,fontSize:8,fontWeight:700,color:C.lime,letterSpacing:1.5,textTransform:'uppercase',marginBottom:6}}>{item.tag}</div>
            <div style={{fontFamily:F.sans,fontSize:13,fontWeight:700,color:C.paper,marginBottom:4}}>{item.title}</div>
            <div style={{fontFamily:F.body,fontSize:12,color:'rgba(250,248,243,0.55)',lineHeight:1.6}}>{item.body}</div>
          </div>
        ))}
      </div>

      {/* ── Roadmap ── */}
      <div style={sec(C.paperDark)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>Roadmap</div>
        <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.ink,marginBottom:20}}>Four phases to national coverage.</div>
        {[{n:'0',l:'Discovery',t:'8 weeks',c:C.muted},{n:'1',l:'Field MVP',t:'12 weeks',c:C.amber},{n:'2',l:'Full Lifecycle',t:'16 weeks',c:C.forest},{n:'3',l:'Intelligence',t:'Ongoing',c:C.lime}].map((ph,i) => (
          <div key={i} style={{display:'flex',gap:0,marginBottom:2}}>
            <div style={{width:48,background:ph.c,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,padding:'16px 0'}}>
              <span style={{fontFamily:F.mono,fontSize:20,fontWeight:500,color:ph.c===C.lime?C.ink:C.white}}>{ph.n}</span>
            </div>
            <div style={{flex:1,padding:'12px 16px',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:14,fontWeight:700,color:C.ink}}>{ph.l}</div>
              <div style={{fontFamily:F.mono,fontSize:10,color:C.muted,marginTop:2}}>{ph.t}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Partnership ── */}
      <div style={sec(C.paper)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:C.muted,letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>Partnership Model</div>
        <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.ink,marginBottom:6}}>Zero cost to the Department during pilot.</div>
        <div style={{fontFamily:F.body,fontSize:13,color:C.muted,marginBottom:20,lineHeight:1.7}}>This is a partnership, not a procurement.</div>
        {/* Offer */}
        <div style={{background:C.forest,padding:18,marginBottom:4}}>
          <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.lime,letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>What BRIDGE Offers</div>
          {['Full platform at zero cost during the pilot phase','Officer training and field deployment support','Data ownership: all platform data belongs to the Department','Data Protection Act (Act 843) — DPC registration in progress','Roadmap aligned to your September enforcement timeline'].map((item,j) => (
            <div key={j} style={{display:'flex',gap:8,marginBottom:8,alignItems:'flex-start'}}>
              <Chk s={14}/><span style={{fontFamily:F.sans,fontSize:12,color:'rgba(255,255,255,0.85)',lineHeight:1.4}}>{item}</span>
            </div>
          ))}
        </div>
        {/* Ask */}
        <div style={{border:`2px solid ${C.forest}`,padding:18}}>
          <div style={{fontFamily:F.sans,fontSize:9,fontWeight:700,color:C.forest,letterSpacing:2,textTransform:'uppercase',marginBottom:12}}>What We Ask</div>
          {['An 8-week informal pilot — no MOU, no procurement','2–3 officers for one week of field testing in June','Permission to mention coordination with your office','Honest feedback during pilot deployment','Formal partnership talks ahead of September rollout'].map((item,j) => (
            <div key={j} style={{display:'flex',gap:8,marginBottom:8,alignItems:'flex-start'}}>
              <Arr s={14}/><span style={{fontFamily:F.sans,fontSize:12,color:C.ink,lineHeight:1.4}}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Government Pitch Frame ── */}
      <div style={sec(C.forest)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:'rgba(184,217,53,0.6)',letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>Key Messages</div>
        <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.paper,marginBottom:20}}>Four things to communicate.</div>
        {[{n:'01',h:'Close the enforcement loop',b:'The enforcement side has no equivalent tool. RentGuard fills that gap.'},{n:'02',h:'National rental intelligence',b:'Compliance rates, violation hotspots, and Taskforce effectiveness in real time.'},{n:'03',h:'Support tax mobilization',b:'Links rental units to TIN numbers at scale — systematic GRA coordination.'},{n:'04',h:'Build on existing investments',b:'Integrates with rentcontrol.mwh.gov.gh. No turf concerns.'}].map((p,i) => (
          <div key={i} style={{background:'rgba(0,0,0,0.2)',padding:16,marginBottom:4}}>
            <div style={{fontFamily:F.mono,fontSize:22,fontWeight:500,color:C.lime,marginBottom:6,lineHeight:1}}>{p.n}</div>
            <div style={{fontFamily:F.sans,fontSize:13,fontWeight:700,color:C.paper,marginBottom:6}}>{p.h}</div>
            <div style={{fontFamily:F.body,fontSize:12,color:'rgba(250,248,243,0.6)',lineHeight:1.65}}>{p.b}</div>
          </div>
        ))}
      </div>

      {/* ── About BRIDGE ── */}
      <div style={sec(C.ink)}>
        <div style={{fontFamily:F.sans,fontSize:8,fontWeight:700,color:'rgba(184,217,53,0.6)',letterSpacing:2,textTransform:'uppercase',marginBottom:8}}>About BRIDGE PBC</div>
        <div style={{fontFamily:F.display,fontSize:20,fontWeight:700,color:C.paper,marginBottom:20}}>One product in a 12-sector portfolio.</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:4,marginBottom:24}}>
          {[{n:'01',s:'Infrastructure'},{n:'02',s:'Financial'},{n:'03',s:'Health'},{n:'04',s:'Technology'},{n:'05',s:'Education'},{n:'06',s:'Agriculture'},{n:'07',s:'Creative'},{n:'08',s:'Housing'},{n:'09',s:'Tourism'},{n:'10',s:'Energy'},{n:'11',s:'Manufacturing'},{n:'12',s:'Transportation'}].map((sec,i) => (
            <div key={i} style={{padding:'10px 8px',background:i===7?'rgba(184,217,53,.15)':'rgba(255,255,255,.03)',borderLeft:i===7?`3px solid ${C.lime}`:'3px solid transparent'}}>
              <div style={{fontFamily:F.mono,fontSize:11,color:i===7?C.lime:C.faint,fontWeight:500}}>{sec.n}</div>
              <div style={{fontFamily:F.sans,fontSize:9,color:i===7?C.white:'rgba(255,255,255,.4)',fontWeight:i===7?700:400}}>{sec.s}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
          {[['$100M+','Blended finance'],['174+','Mapped ventures'],['12','Sectors']].map(([v,l],i) => (
            <div key={i}>
              <div style={{fontFamily:F.mono,fontSize:20,fontWeight:500,color:C.lime}}>{v}</div>
              <div style={{fontFamily:F.sans,fontSize:8,color:'rgba(255,255,255,.3)',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{background:C.forest,padding:'48px 20px',textAlign:'center'}}>
        <div style={{fontFamily:F.display,fontSize:28,fontWeight:700,color:C.white,lineHeight:1.2,marginBottom:8}}>
          Ready for deployment.<br/><span style={{color:C.lime}}>Ready for partnership.</span>
        </div>
        <div style={{fontFamily:F.body,fontSize:14,color:'rgba(255,255,255,.5)',lineHeight:1.7,marginBottom:28}}>
          The platform is built. The team is ready.
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:32}}>
          <div style={{background:C.lime,padding:'14px 24px'}}>
            <div style={{fontFamily:F.sans,fontSize:14,fontWeight:700,color:C.ink}}>Request Demo Access</div>
          </div>
          <div style={{border:'2px solid rgba(255,255,255,0.2)',padding:'14px 24px'}}>
            <div style={{fontFamily:F.sans,fontSize:14,fontWeight:700,color:C.white}}>Download Brief (PDF)</div>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:16,alignItems:'center'}}>
          {[['EMAIL','RentGuard@bridgepbc.com'],['WHATSAPP','+1 415 425 7401'],['DEMO','bridgepbc.com/rentguard']].map(([label,val],i) => (
            <div key={i} style={{textAlign:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:9,color:C.lime,letterSpacing:2,fontWeight:700,marginBottom:4}}>{label}</div>
              <div style={{fontFamily:F.sans,fontSize:13,color:C.white}}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{fontFamily:F.sans,fontSize:8,color:'rgba(255,255,255,.12)',marginTop:32}}>BRIDGE PBC · Confidential · April 2026</div>
      </div>
    </div>
  );
};


// ══════════════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════════════
export default function App() {
  const m = useIsMobile();
  if (m) return <MobilePitch/>;
  return (
    <div>
      <Gf/>
      <TopBar/>
      <Cover/>
      <PlatformStats/>
      <ReformMoment/>
      <ProductPosition/>
      <EnforcementGap/>
      <ReformAlignment/>
      <ProductModules/>
      <PlatformWalkthrough/>
      <FourLayers/>
      <SystemLogic/>
      <DataModel/>
      <Security/>
      <Stakeholders/>
      <Roadmap/>
      <Partnership/>
      <PitchFrame/>
      <Risks/>
      <AboutBridge/>
      <RequestAccess/>
    </div>
  );
}
