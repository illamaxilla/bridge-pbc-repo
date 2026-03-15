import { useEffect, useState } from "react";
import { C, F } from '../theme';
import { useNavigate } from "react-router-dom";

const FONTS = `


  /* Transitions */
  .peace-dim { transition: box-shadow 0.2s, transform 0.18s; }
  .peace-dim:hover { box-shadow: 0 4px 18px rgba(0,0,0,0.06); transform: translateY(-1px); }
  .policy-card { transition: box-shadow 0.2s, transform 0.18s; }
  .policy-card:hover { box-shadow: 0 4px 18px rgba(0,0,0,0.06); transform: translateY(-1px); }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PEACE_DIMS = [
  { label: 'Physical Security', body: 'Freedom from violence, crime, and armed conflict. The ability to move, conduct business, and raise children in environments where the basic continuity of daily life is not in question. Physical insecurity is not merely a human rights concern — it is a direct, measurable constraint on economic activity, community investment, and the planning horizon that development requires.' },
  { label: 'Economic Security', body: 'Stable income sufficient to meet basic needs, combined with protection against catastrophic financial shocks. Not just income today — but reasonable confidence that a health emergency, a failed harvest, or a family crisis will not erase everything a household has built. Economic insecurity produces chronic stress with measurable effects on health, decision quality, and long-term planning capacity.' },
  { label: 'Social Cohesion', body: "Trust within and between communities — the dense networks of obligation, reciprocity, and shared identity that make markets function and institutions hold. Ghana's communities possess extraordinary reserves of social capital. BRIDGE investments are designed to strengthen those foundations, not erode them in the name of efficiency." },
  { label: 'Political Stability', body: 'Functioning institutions that provide predictable rule of law, protect property rights, and enable peaceful transitions of authority. Political instability destroys the investment horizons that serious development requires. BRIDGE operates with explicit awareness of how ventures are affected by — and can constructively contribute to — stable governance environments.' },
  { label: 'Psychological Security', body: 'Hope for better futures. Confidence that effort will be rewarded. Dignity in social interactions and daily life. Psychological security is the most fundamental dimension of all — without it, even material resources fail to translate into sustained human flourishing.' },
];

const DOMAINS = [
  {
    num: '01', title: 'Individual Dignity',
    marker: 'When a person has meaningful work, genuine agency, and the skills to shape their own future.',
    body: 'BRIDGE investments contribute to individual dignity by creating employment that is not merely a paycheck but a path — work that develops capability, provides stability, and opens doors to further opportunity. By supporting ventures that train Ghanaian workers in skills that persist beyond any single employer. And by expanding the real options available to individuals, particularly young Ghanaians, so that ambition has somewhere meaningful to go.',
    measure: 'Not a headcount of jobs created. Whether people who engage with BRIDGE ventures are more capable, more secure, and more able to direct their own lives than they were before.',
  },
  {
    num: '02', title: 'Family Security',
    marker: 'When a household can meet its needs, withstand shocks, and build assets — not just get through today.',
    body: "Ghana's households face a persistent combination of income volatility, limited financial tools, and inadequate access to affordable healthcare, education, and essential services. BRIDGE investments target this fragility directly — through financial inclusion, health systems, energy access, and agricultural value chain improvements that reduce income seasonality and build household resilience.",
    measure: 'Not aggregate income data. Whether families are less vulnerable than they were — whether the safety net beneath daily life is structurally stronger.',
  },
  {
    num: '03', title: 'Community Thriving',
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
  { framework: 'Ghana 2026 National Budget', alignment: 'BRIDGE portfolio directly maps to key allocations across infrastructure, agriculture, education, and financial inclusion — enabling private capital to multiply public investment.', ref: 'Budget Statement 2026' },
  { framework: 'Sankofa Initiative', alignment: "BRIDGE's diaspora-first capital architecture was designed to operationalise the Sankofa Initiative's vision of diaspora as structured development partners — not remittance senders.", ref: 'GoG Policy Framework' },
  { framework: '24-Hour Economy Framework', alignment: "BRIDGE's manufacturing, logistics, energy, and creative sectors directly support the productivity infrastructure and skills base the 24-hour economy requires to function.", ref: '24HE Policy Document' },
  { framework: 'UN Sustainable Development Goals', alignment: 'Peace & Prosperity maps directly to SDGs 1 (No Poverty), 3 (Good Health), 4 (Quality Education), 8 (Decent Work), 10 (Reduced Inequalities), and 11 (Sustainable Cities).', ref: 'UN SDG Framework 2030' },
];

// ─── SHARED ────────────────────────────────────────────────────────────────────

function SectionMark({ n, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
      <div style={{ width: 36, height: 1, background: C.accent }} />
      <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 13, color: C.accent }}>{n}</span>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted }}>{label}</span>
    </div>
  );
}

// ─── MOBILE LAYOUT ────────────────────────────────────────────────────────────

function MobileSec({ n, label, headline, isOpen, onToggle, children }) {
  return (
    <div style={{ marginTop: 36 }}>
      <div onClick={onToggle} style={{ cursor: 'pointer', paddingBottom: 16, borderBottom: `1px solid ${isOpen ? 'transparent' : C.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, paddingRight: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 22, height: 1, background: C.accent }} />
            <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 12, color: C.accent }}>{n}</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted }}>{label}</span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, margin: 0, lineHeight: 1.22, color: C.text }}>{headline}</h2>
        </div>
        <div style={{ width: 26, height: 26, borderRadius: '50%', border: `1px solid ${isOpen ? C.primary : C.line}`, background: isOpen ? C.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 22, transition: 'all 0.18s' }}>
          <span style={{ fontSize: 11, color: isOpen ? C.accent : C.muted, display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', lineHeight: 1 }}>▾</span>
        </div>
      </div>
      {isOpen && <div style={{ paddingBottom: 36, borderBottom: `1px solid ${C.line}` }}>{children}</div>}
    </div>
  );
}

function MobilePeaceProsperity() {
  const [openSecs, setOpenSecs] = useState({ 0: true });
  const toggleSec = i => setOpenSecs(p => ({ ...p, [i]: !p[i] }));
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, minHeight: '100vh', color: C.text }}>
      <style>{FONTS}</style>

      {/* Cover */}
      <div style={{ background: C.cover, padding: '44px 20px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 28, height: 2, background: C.accent }} />
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent }}>General Series · March 2026</span>
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, fontWeight: 400, lineHeight: 1.06, margin: '0 0 4px', color: C.white }}>Peace &</h1>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, fontWeight: 400, lineHeight: 1.06, margin: '0 0 20px', color: C.accent }}>Prosperity</h1>
        <p style={{ fontSize: 14, lineHeight: 1.72, color: 'rgba(255,255,255,0.52)', margin: '0 0 28px' }}>
          The philosophical and empirical foundation behind everything BRIDGE does — what dignity, security, and thriving mean in measurable terms, and why these are the only outcomes that matter for Ghana's development.
        </p>

        {/* Two pillars stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 24 }}>
          {[
            { title: 'Peace', items: ['Physical Security', 'Economic Security', 'Social Cohesion', 'Political Stability', 'Psychological Security'] },
            { title: 'Prosperity', items: ['Material Sufficiency', 'Human Capability', 'Freedom of Choice', 'Intergenerational Advancement'] },
          ].map(p => (
            <div key={p.title} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '16px 18px' }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: C.accent, marginBottom: 10 }}>{p.title}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.items.map(item => (
                  <span key={item} style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.07)', padding: '3px 9px', borderRadius: 20 }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Policy note */}
        <div style={{ display: 'flex', gap: 12, background: 'rgba(184,217,53,0.07)', border: '1px solid rgba(184,217,53,0.18)', borderRadius: 8, padding: '14px 16px' }}>
          <div style={{ width: 3, background: C.accent, borderRadius: 2, flexShrink: 0 }} />
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.65 }}>
            <strong style={{ color: C.accent, fontWeight: 600 }}>Policy alignment:</strong> Maps to Ghana's 2026 Budget, Sankofa Initiative, 24-Hour Economy framework, and SDGs 1, 3, 4, 8, 10, and 11.
          </p>
        </div>
      </div>

      {/* Exec Summary */}
      <div style={{ background: C.white, borderTop: `3px solid ${C.accent}`, padding: '24px 20px', marginBottom: 8 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent, marginBottom: 12 }}>Executive Summary</div>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: C.subtle, margin: '0 0 12px' }}>
          Peace & Prosperity is BRIDGE PBC's foundational framework for measuring what development is actually for. It holds that GDP growth, income averages, and FDI inflows are means to an end, not ends in themselves. The end is whether Ghanaian citizens can live lives they genuinely value.
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: C.subtle, margin: 0 }}>
          The framework defines Peace across five dimensions and Prosperity as material sufficiency plus human capability. It organises outcomes into three measurable domains and maps each of BRIDGE's 12 sectors to specific Peace & Prosperity pathways.
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 20px 0' }}>

        <MobileSec n="I" label="A Different Starting Point" headline="Most development organisations measure success in the language of economics." isOpen={openSecs[0]} onToggle={() => toggleSec(0)}>
          <p style={{ fontSize: 14, lineHeight: 1.82, color: C.subtle, marginBottom: 14, marginTop: 16 }}>
            GDP growth rates. Employment figures. Foreign direct investment inflows. Per capita income trends. These numbers matter — BRIDGE uses them as inputs. But they are incomplete measures of what people actually need from their lives, and optimising for them alone produces policies that can grow an economy while leaving most of its people behind.
          </p>
          <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 18, margin: '24px 0' }}>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, fontStyle: 'italic', lineHeight: 1.55, color: C.primary, margin: 0 }}>
              Economic indicators are means, not ends. The end is whether Ghanaian citizens can live lives they value — with dignity, with security, and within communities that are genuinely thriving.
            </p>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.82, color: C.subtle, margin: 0 }}>
            This draws on the Capability Approach developed by Amartya Sen and Martha Nussbaum: that development should be measured by what people are able to do and be — not merely by what they own or earn.
          </p>
        </MobileSec>

        <MobileSec n="II" label="What BRIDGE Means by Peace" headline="Not the absence of war. A comprehensive condition." isOpen={openSecs[1]} onToggle={() => toggleSec(1)}>
          <p style={{ fontSize: 13, lineHeight: 1.72, color: C.subtle, marginBottom: 18, marginTop: 16 }}>Peace comprises five dimensions. All five operate simultaneously — and all five shape the environment in which BRIDGE ventures either succeed or fail.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {PEACE_DIMS.map((d, i) => (
              <div key={i} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 10, padding: '16px 16px', display: 'flex', gap: 14 }}>
                <div style={{ width: 3, background: C.accent, borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.primary, marginBottom: 6 }}>{d.label}</div>
                  <p style={{ fontSize: 12, lineHeight: 1.72, color: C.subtle, margin: 0 }}>{d.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: C.primary, borderRadius: 10, padding: '22px 20px', marginTop: 8 }}>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, fontStyle: 'italic', color: C.white, lineHeight: 1.60, margin: 0 }}>
              Peace, fully understood, creates the stable foundation from which everything else becomes possible: long-term planning, investment in children's futures, community solidarity, and the kind of hope that drives people to build rather than merely endure.
            </p>
          </div>
        </MobileSec>

        <MobileSec n="III" label="What BRIDGE Means by Prosperity" headline="Material sufficiency is necessary. It is not sufficient." isOpen={openSecs[2]} onToggle={() => toggleSec(2)}>
          <p style={{ fontSize: 14, lineHeight: 1.82, color: C.subtle, marginBottom: 14, marginTop: 16 }}>
            True prosperity includes the capability to pursue aspirations — not merely to survive. It includes the real freedom to choose how to live and work. Access to quality healthcare and education. The voice to participate in decisions that affect one's community. The dignity of being recognised as a full participant in social and economic life.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.82, color: C.subtle, margin: 0 }}>
            The distinction matters for investment decisions. A venture that creates employment but traps workers in precarious, low-skill roles does not score well on Prosperity. The question is never just "does this provide something?" — it is "does this genuinely expand what Ghanaians are able to do and be?"
          </p>
        </MobileSec>

        <MobileSec n="IV" label="The Three Domains of Flourishing" headline="How BRIDGE measures outcomes." isOpen={openSecs[3]} onToggle={() => toggleSec(3)}>
          <p style={{ fontSize: 13, lineHeight: 1.72, color: C.subtle, marginBottom: 24, marginTop: 16 }}>These three domains translate Peace & Prosperity from philosophy into measurable investment criteria, scoring parameters, and impact reporting standards.</p>
          {DOMAINS.map((d, i) => (
            <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: i < DOMAINS.length - 1 ? `1px solid ${C.line}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 36, color: C.accent, lineHeight: 1 }}>{d.num}</span>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, fontWeight: 400, margin: 0, color: C.text }}>{d.title}</h3>
              </div>
              <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 14, marginBottom: 12 }}>
                <p style={{ fontSize: 13, fontStyle: 'italic', color: C.primary, fontWeight: 500, margin: 0, lineHeight: 1.6 }}>{d.marker}</p>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.82, color: C.subtle, marginBottom: 12 }}>{d.body}</p>
              <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8, padding: '12px 14px' }}>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.primary }}>Measured By</span>
                <p style={{ fontSize: 12, color: C.subtle, margin: '6px 0 0', lineHeight: 1.65 }}>{d.measure}</p>
              </div>
            </div>
          ))}
        </MobileSec>

        <MobileSec n="V" label="The Framework Across 12 Sectors" headline="Every sector connects to Peace & Prosperity." isOpen={openSecs[4]} onToggle={() => toggleSec(4)}>
          <p style={{ fontSize: 13, lineHeight: 1.72, color: C.subtle, marginBottom: 18, marginTop: 16 }}>This mapping is the architecture through which BRIDGE makes investment decisions and reports outcomes.</p>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: `1px solid ${C.line}` }}>
            <div style={{ background: C.primary, padding: '10px 16px', display: 'grid', gridTemplateColumns: '36px 1fr', gap: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>#</div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Sector & Connection</div>
            </div>
            {SECTOR_MAP.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', background: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: i < SECTOR_MAP.length - 1 ? `1px solid ${C.line}` : 'none', padding: '12px 16px', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 13, color: C.accent, paddingTop: 2 }}>{s.sector}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 3 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: C.subtle, lineHeight: 1.5 }}>{s.connection}</div>
                </div>
              </div>
            ))}
          </div>
        </MobileSec>

        <MobileSec n="VI" label="Ghana Policy Framework Alignment" headline="Grounded in Ghana's own development priorities." isOpen={openSecs[5]} onToggle={() => toggleSec(5)}>
          <p style={{ fontSize: 13, lineHeight: 1.72, color: C.subtle, marginBottom: 18, marginTop: 16 }}>BRIDGE did not import a foreign development framework. Peace & Prosperity was built to align with the policy architectures Ghana has already established.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {POLICY_ALIGN.map((p, i) => (
              <div key={i} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 10, padding: '16px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.primary }}>{p.framework}</div>
                  <span style={{ fontSize: 9, fontWeight: 600, color: C.muted, background: C.bg, padding: '3px 8px', borderRadius: 20, whiteSpace: 'nowrap', flexShrink: 0 }}>{p.ref}</span>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.72, color: C.subtle, margin: 0 }}>{p.alignment}</p>
              </div>
            ))}
          </div>
        </MobileSec>

        {/* Ghana-first callout — always visible, no collapse */}
        <div style={{ background: C.primary, borderRadius: 12, padding: '28px 20px', marginTop: 40, marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 20, height: 1, background: C.accent }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accent }}>A Note on Whose Flourishing</span>
          </div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, fontStyle: 'italic', color: C.white, lineHeight: 1.58, margin: '0 0 12px' }}>
            BRIDGE is a Ghana-first institution. Every venture we evaluate, every resource we mobilise, and every partnership we structure is measured against one standard: does this advance the flourishing of Ghanaian citizens?
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.50)', lineHeight: 1.72, margin: '0 0 12px' }}>
            Diaspora capital, expertise, and international networks are powerful instruments — deployed in service of that mission, not as the mission itself. The diaspora is a bridge, not the destination.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.50)', lineHeight: 1.72, margin: 0 }}>
            Success is measured by whether Ghanaian people are living with more dignity, more security, and within more thriving communities than they were before BRIDGE arrived. Everything else is instrumental to that single end.
          </p>
        </div>
      </div>

    </div>
  );
}

// ─── DESKTOP LAYOUT ───────────────────────────────────────────────────────────

function DesktopPeaceProsperity() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, minHeight: '100vh', color: C.text }}>
      <style>{FONTS}</style>

      {/* Cover */}
      <div style={{ background: C.cover, padding: '80px 64px 72px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}>
            <div style={{ width: 36, height: 2, background: C.accent }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent }}>General Series</span>
            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}>Document No. 02 of 23 · March 2026</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 64, fontWeight: 400, lineHeight: 1.04, margin: '0 0 8px', color: C.white, letterSpacing: '-0.02em' }}>Peace &</h1>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 64, fontWeight: 400, lineHeight: 1.04, margin: '0 0 32px', color: C.accent, letterSpacing: '-0.02em' }}>Prosperity</h1>
              <p style={{ fontSize: 17, lineHeight: 1.80, color: 'rgba(255,255,255,0.58)', margin: 0 }}>The philosophical and empirical foundation behind everything BRIDGE does — what dignity, security, and thriving mean in measurable terms, and why these are the only outcomes that matter for Ghana's development.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { title: 'Peace', items: ['Physical Security', 'Economic Security', 'Social Cohesion', 'Political Stability', 'Psychological Security'] },
                { title: 'Prosperity', items: ['Material Sufficiency', 'Human Capability', 'Freedom of Choice', 'Intergenerational Advancement'] },
              ].map(p => (
                <div key={p.title} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '22px 24px' }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: C.accent, marginBottom: 14 }}>{p.title}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.items.map(item => (
                      <span key={item} style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.07)', padding: '4px 10px', borderRadius: 20 }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, background: 'rgba(184,217,53,0.07)', border: '1px solid rgba(184,217,53,0.18)', borderRadius: 8, padding: '16px 20px', marginTop: 40 }}>
            <div style={{ width: 3, background: C.accent, borderRadius: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.60)', margin: 0, lineHeight: 1.7 }}>
              <strong style={{ color: C.accent, fontWeight: 600 }}>Policy alignment:</strong> Peace & Prosperity maps directly to Ghana's 2026 National Budget priorities, the Sankofa Initiative, the 24-Hour Economy framework, and SDGs 1, 3, 4, 8, 10, and 11.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 64px 96px' }}>
        {/* Exec summary */}
        <div style={{ background: C.white, border: `1px solid ${C.line}`, borderTop: `3px solid ${C.accent}`, borderRadius: '0 0 12px 12px', padding: '28px 36px', marginBottom: 60 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent, marginBottom: 16 }}>Executive Summary</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.78, color: C.subtle, margin: 0 }}>Peace & Prosperity is BRIDGE PBC's foundational framework for measuring what development is actually for. It holds that standard economic metrics are means to an end, not ends in themselves. The end is whether Ghanaian citizens can live lives they genuinely value.</p>
            <p style={{ fontSize: 14, lineHeight: 1.78, color: C.subtle, margin: 0 }}>The framework defines Peace across five dimensions and Prosperity as material sufficiency plus human capability. It organises outcomes into three measurable domains and maps each of BRIDGE's 12 sectors to specific Peace & Prosperity pathways. Every BRIDGE investment is evaluated against and reported on through this framework.</p>
          </div>
        </div>

        <SectionMark n="I" label="A Different Starting Point" />
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 28px', lineHeight: 1.15 }}>Most development organisations measure success in the language of economics.</h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: C.subtle, marginBottom: 18 }}>GDP growth rates. Employment figures. Foreign direct investment inflows. Per capita income trends. These numbers matter. They track real things happening in real economies, and BRIDGE uses them as inputs. But they are incomplete measures of what people actually need from their lives — and optimising for them alone produces policies that can grow an economy while leaving most of its people behind.</p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: C.subtle }}>A country can achieve consistent GDP growth while gains flow overwhelmingly to a narrow class. Employment rates can rise while the work counted is informal, precarious, and insufficient for families to plan more than a week ahead.</p>
        <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 28, margin: '44px 0', maxWidth: 580 }}>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 21, fontStyle: 'italic', lineHeight: 1.58, color: C.primary, margin: 0 }}>Economic indicators are means, not ends. The end is whether Ghanaian citizens can live lives they value — with dignity, with security, and within communities that are genuinely thriving.</p>
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: C.subtle }}>This insight draws on the Capability Approach developed by Amartya Sen and Martha Nussbaum: that development should be measured by what people are able to do and be — not merely by what they own or earn.</p>

        {/* II — Peace */}
        <div style={{ marginTop: 72 }}>
          <SectionMark n="II" label="What BRIDGE Means by Peace" />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 16px', lineHeight: 1.15 }}>Not the absence of war. A comprehensive condition.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.80, color: C.subtle, marginBottom: 36 }}>Peace comprises five dimensions. All five operate simultaneously — and all five shape the environment in which BRIDGE ventures either succeed or fail.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {PEACE_DIMS.map((d, i) => (
              <div key={i} className="peace-dim" style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 10, padding: '22px 26px', display: 'flex', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 4 }}>
                  <div style={{ width: 4, height: '100%', background: C.accent, borderRadius: 2 }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.primary, marginBottom: 8 }}>{d.label}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.78, color: C.subtle, margin: 0 }}>{d.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: C.primary, borderRadius: 10, padding: '28px 32px', marginTop: 16 }}>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, fontStyle: 'italic', color: C.white, lineHeight: 1.65, margin: 0 }}>Peace, fully understood, creates the stable foundation from which everything else becomes possible: long-term planning, investment in children's futures, community solidarity, and the kind of hope that drives people to build rather than merely endure.</p>
          </div>
        </div>

        {/* III — Prosperity */}
        <div style={{ marginTop: 72 }}>
          <SectionMark n="III" label="What BRIDGE Means by Prosperity" />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 24px', lineHeight: 1.15 }}>Material sufficiency is necessary. It is not sufficient.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: C.subtle, marginBottom: 18 }}>True prosperity includes the capability to pursue aspirations — not merely to survive. It includes the real freedom to choose how to live and work. Access to quality healthcare and education. The voice to participate in decisions that affect one's community. The dignity of being recognised as a full participant in social and economic life.</p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: C.subtle }}>A venture that creates employment but traps workers in precarious, low-skill roles does not score well on Prosperity. The question is never just "does this provide something?" — it is "does this genuinely expand what Ghanaians are able to do and be?"</p>
        </div>

        {/* IV — Three Domains */}
        <div style={{ marginTop: 72 }}>
          <SectionMark n="IV" label="The Three Domains of Flourishing" />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 16px', lineHeight: 1.15 }}>How BRIDGE measures outcomes.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.80, color: C.subtle, marginBottom: 44 }}>These three domains translate Peace & Prosperity from philosophy into measurable investment criteria, scoring parameters, and impact reporting standards. Every BRIDGE investment is assessed against all three.</p>
          {DOMAINS.map((d, i) => (
            <div key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: i < DOMAINS.length - 1 ? `1px solid ${C.line}` : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 14 }}>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 44, color: C.accent, lineHeight: 1 }}>{d.num}</span>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, margin: 0, color: C.text }}>{d.title}</h3>
              </div>
              <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 16, marginBottom: 16 }}>
                <p style={{ fontSize: 14, fontStyle: 'italic', color: C.primary, fontWeight: 500, margin: 0, lineHeight: 1.6 }}>{d.marker}</p>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: C.subtle, marginBottom: 18 }}>{d.body}</p>
              <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8, padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.primary, whiteSpace: 'nowrap', paddingTop: 2 }}>Measured By</span>
                <p style={{ fontSize: 13, color: C.subtle, margin: 0, lineHeight: 1.65 }}>{d.measure}</p>
              </div>
            </div>
          ))}
        </div>

        {/* V — Sector Map */}
        <div style={{ marginTop: 72 }}>
          <SectionMark n="V" label="The Framework Across 12 Sectors" />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 16px', lineHeight: 1.15 }}>Every sector connects to Peace & Prosperity through traceable pathways.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.80, color: C.subtle, marginBottom: 32 }}>This mapping is not rhetorical decoration — it is the architecture through which BRIDGE makes investment decisions and reports outcomes.</p>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.line}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 140px', background: C.primary, padding: '12px 20px', gap: 16 }}>
              {['#', 'Sector & P&P Connection', 'Lead Ministry'].map(h => (
                <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{h}</div>
              ))}
            </div>
            {SECTOR_MAP.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr 140px', background: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: i < SECTOR_MAP.length - 1 ? `1px solid ${C.line}` : 'none', padding: '14px 20px', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 13, color: C.accent, paddingTop: 2 }}>{s.sector}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: C.subtle, lineHeight: 1.55 }}>{s.connection}</div>
                </div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{s.ministry}</div>
              </div>
            ))}
          </div>
        </div>

        {/* VI — Policy */}
        <div style={{ marginTop: 72 }}>
          <SectionMark n="VI" label="Ghana Policy Framework Alignment" />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 16px', lineHeight: 1.15 }}>Peace & Prosperity is grounded in Ghana's own development priorities.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.80, color: C.subtle, marginBottom: 32 }}>BRIDGE did not import a foreign development framework. Peace & Prosperity was built to align with the policy architectures Ghana has already established and committed to.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {POLICY_ALIGN.map((p, i) => (
              <div key={i} className="policy-card" style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 10, padding: '22px 26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.primary }}>{p.framework}</div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, background: C.bg, padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap', marginLeft: 16 }}>{p.ref}</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: C.subtle, margin: 0 }}>{p.alignment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ghana-first */}
        <div style={{ background: C.primary, borderRadius: 14, padding: '44px 52px', marginTop: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: C.accent }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent }}>A Note on Whose Flourishing</span>
          </div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontStyle: 'italic', color: C.white, lineHeight: 1.6, margin: '0 0 18px', maxWidth: 600 }}>BRIDGE is a Ghana-first institution. Every venture we evaluate, every resource we mobilise, and every partnership we structure is measured against one standard: does this advance the flourishing of Ghanaian citizens?</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.78, margin: '0 0 20px', maxWidth: 580 }}>Diaspora capital, expertise, and international networks are powerful instruments — deployed in service of that mission, not as the mission itself. The diaspora is a bridge, not the destination.</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.78, margin: 0, maxWidth: 580 }}>Success is measured by whether Ghanaian people are living with more dignity, more security, and within more thriving communities than they were before BRIDGE arrived. Everything else — every capital structure, every governance arrangement, every reporting metric — is instrumental to that single end.</p>
        </div>
      </div>

    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────

export default function PeaceProsperityDoc() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile ? <MobilePeaceProsperity /> : <DesktopPeaceProsperity />;
}
