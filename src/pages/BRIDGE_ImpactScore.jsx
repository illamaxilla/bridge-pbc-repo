import { useState, useEffect } from "react";

const C = {
  primary: '#1B4D3E', accent: '#B8D935', bg: '#F3F5F2',
  text: '#111111', subtle: '#5C5C5C', muted: '#8A8A8A',
  line: '#E0E0E0', white: '#FFFFFF', cover: '#0B1510',
};
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  ::selection { background: rgba(184,217,53,0.22); color: #111; }

  /* Transitions */
  .accord-header { transition: background 0.18s; }
  .accord-header:hover { opacity: 0.95; }
  .dim-tile { transition: background 0.18s, border-bottom-color 0.18s; }
  .dim-tile:hover { filter: brightness(1.06); }
  .white-card { transition: box-shadow 0.2s, transform 0.18s; }
  .white-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); transform: translateY(-1px); }
  .cta-link { transition: opacity 0.15s, letter-spacing 0.18s; }
  .cta-link:hover { opacity: 0.85; letter-spacing: 0.06em !important; }
  .nav-crumb { transition: color 0.15s; }
  .nav-crumb:hover { color: rgba(255,255,255,0.75) !important; }

  /* Scrollbar */
  ::-webkit-scrollbar { display: none; }
  * { -ms-overflow-style: none; scrollbar-width: none; }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const DIMS = [
  {
    num: 'I', title: 'Peace & Prosperity Alignment', pts: 30,
    question: 'Does this opportunity genuinely improve Ghanaian lives?',
    rationale: 'The most heavily weighted dimension — deliberately. BRIDGE exists to advance the flourishing of Ghanaian citizens, not simply to deploy capital. An opportunity that scores exceptionally on every other dimension but fails to move the needle on human flourishing does not belong in the BRIDGE portfolio.',
    subs: [
      { label: 'Individual Dignity', pts: 10, detail: 'Does the venture expand agency, capability, and meaningful choice for individual Ghanaians? Evaluators examine quality of employment created, skills that persist beyond the venture, and whether the real options available to people are materially expanded.' },
      { label: 'Family Security', pts: 10, detail: 'Does the venture improve the stability and resilience of Ghanaian households? Evaluators look at income predictability, access to essential services, and asset-building potential — not just monthly earnings.' },
      { label: 'Community Thriving', pts: 10, detail: 'Does the venture generate benefits that reach beyond its direct beneficiaries? Strong scores reflect meaningful employment multipliers, strengthened local institutions, and intergenerational reach.' },
    ],
  },
  {
    num: 'II', title: 'Strategic Fit', pts: 25,
    question: 'Is this the right opportunity for BRIDGE specifically?',
    rationale: 'Not every excellent idea is a BRIDGE idea. This dimension evaluates whether a venture aligns with BRIDGE\'s specific capabilities, 12-sector architecture, and portfolio logic. Strategic fit preserves BRIDGE resources for opportunities where BRIDGE adds the most distinctive value.',
    subs: [
      { label: 'Sector Alignment', pts: 10, detail: 'Does the opportunity fall within BRIDGE\'s 12 integrated sectors and contribute meaningfully to the cross-sector portfolio architecture?' },
      { label: 'Diaspora Role', pts: 8, detail: 'Is the diaspora contribution genuine and value-additive — not merely decorative? BRIDGE invests where diaspora involvement authentically changes outcomes.' },
      { label: 'Portfolio Synergy', pts: 7, detail: 'Does the venture create or amplify integration points with other BRIDGE portfolio companies?' },
    ],
  },
  {
    num: 'III', title: 'Feasibility & Execution', pts: 25,
    question: 'Can this actually be done — and by whom?',
    rationale: 'A venture that aligns perfectly with BRIDGE\'s mission but cannot be executed is not an opportunity — it is a plan. This dimension applies the same rigour that a top-tier investment firm applies to any deal.',
    subs: [
      { label: 'Financial Viability', pts: 10, detail: 'Is the financial model grounded in market reality? Is the path to sustainability — without permanent external subsidy — clearly articulated and credible?' },
      { label: 'Team Capability', pts: 8, detail: 'Is there a credible implementer with relevant domain experience and a track record of execution?' },
      { label: 'Risk Assessment', pts: 7, detail: 'Have key risks been honestly identified and quantified? Are mitigation strategies specific and credible?' },
    ],
  },
  {
    num: 'IV', title: 'Scalability & Sustainability', pts: 20,
    question: 'Will this matter beyond its first stage?',
    rationale: 'BRIDGE does not build success stories that disappear when initial funding runs out. This dimension assesses whether a venture can grow, sustain itself, and serve as a replicable model.',
    subs: [
      { label: 'Growth Potential', pts: 8, detail: 'Can the venture scale meaningfully — in reach, revenue, or impact — without proportional increases in external subsidy?' },
      { label: 'Long-Term Viability', pts: 7, detail: 'Is the business model resilient to market volatility, currency risk, political transition, and funding cycle disruption?' },
      { label: 'Replication Potential', pts: 5, detail: 'Can success here be adapted and deployed in other districts, sectors, or countries?' },
    ],
  },
];

const THRESHOLDS = [
  { range: '80–100', rating: 'Exceptional', action: 'Priority pursuit — accelerated evaluation', color: '#2E7D32', bar: 100 },
  { range: '65–79', rating: 'Strong', action: 'Active development — full due diligence initiated', color: '#558B2F', bar: 73 },
  { range: '50–64', rating: 'Promising', action: 'Conditional support — milestones defined before commitment', color: '#F9A825', bar: 55 },
  { range: '35–49', rating: 'Potential', action: 'Advisory support only — revisit when conditions are met', color: '#E65100', bar: 37 },
  { range: 'Below 35', rating: 'Does Not Qualify', action: 'Declined — written rationale and pathway provided', color: '#B71C1C', bar: 15 },
];

const STAGES = [
  { n: '01', title: 'Initial Screening', time: '1–2 Weeks', desc: 'Basic eligibility: sector alignment, submitter credibility, and sufficiency of information. Every application receives a clear written response.' },
  { n: '02', title: 'Impact Score™ Assessment', time: '2–4 Weeks', desc: 'Full four-dimension scoring drawing on 60,000+ words of proprietary sector research. Every sub-component documented with specific written rationale.' },
  { n: '03', title: 'Deep Due Diligence', time: '4–8 Weeks', desc: 'Reserved for ventures scoring 65 or above. Financial model review, team assessment, market validation, legal analysis, and stakeholder mapping.' },
  { n: '04', title: 'Investment Committee Review', time: '1–2 Weeks', desc: 'Final approval evaluating due diligence findings against portfolio priorities, capital availability, and strategic timing.' },
  { n: '05', title: 'Structuring & Partnership', time: '2–4 Weeks', desc: 'Investment terms negotiated, governance documented, milestone frameworks agreed before any capital is committed.' },
];

const KEJETIA = [
  { label: 'P&P Alignment', score: 26, max: 30 },
  { label: 'Strategic Fit', score: 23, max: 25 },
  { label: 'Feasibility', score: 22, max: 25 },
  { label: 'Scalability', score: 16, max: 20 },
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

function PullQuote({ children }) {
  return (
    <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 28, margin: '44px 0', maxWidth: 580 }}>
      <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 21, fontStyle: 'italic', lineHeight: 1.58, color: C.primary, margin: 0 }}>{children}</p>
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

function MobileImpactScore() {
  const [open, setOpen] = useState(null);
  const [openSecs, setOpenSecs] = useState({ 0: true });
  const toggleSec = i => setOpenSecs(p => ({ ...p, [i]: !p[i] }));

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, minHeight: '100vh', color: C.text }}>
      <style>{FONTS}</style>

      {/* Nav */}
      <div style={{ background: C.cover, padding: '0 20px', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: C.white }}>BRIDGE PBC</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.accent }}>Doc 01/23</span>
      </div>

      {/* Cover */}
      <div style={{ background: C.cover, padding: '44px 20px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 28, height: 2, background: C.accent }} />
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent }}>General Series · March 2026</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, fontWeight: 400, lineHeight: 1.06, margin: '0 0 4px', color: C.white }}>BRIDGE</h1>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, fontWeight: 400, lineHeight: 1.06, margin: '0 0 20px', color: C.accent }}>Impact Score™</h1>
          </div>
          <div style={{ textAlign: 'right', paddingTop: 8 }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 56, color: C.accent, lineHeight: 1 }}>100</div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', marginTop: 2 }}>Point Scale</div>
          </div>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.72, color: 'rgba(255,255,255,0.52)', margin: '0 0 32px' }}>
          The proprietary evaluation methodology BRIDGE applies to every venture — rigorous, reproducible, and grounded in one purpose: the flourishing of Ghanaian citizens, households, and communities.
        </p>
        {/* Stat grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 28 }}>
          {[['4','Dimensions'],['12','Sub-Components'],['174+','Ventures Evaluated'],['65','Qualifying Threshold']].map(([n,l]) => (
            <div key={l} style={{ paddingRight: 16, paddingBottom: 16 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: C.accent, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Summary */}
      <div style={{ background: C.white, borderTop: `3px solid ${C.accent}`, padding: '24px 20px', marginBottom: 8 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent, marginBottom: 12 }}>Executive Summary</div>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: C.subtle, margin: '0 0 12px' }}>
          The BRIDGE Impact Score™ is a 100-point proprietary evaluation framework applied to every venture BRIDGE considers. It measures four dimensions: Peace & Prosperity Alignment (30 pts), Strategic Fit (25 pts), Feasibility & Execution (25 pts), and Scalability & Sustainability (20 pts).
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: C.subtle, margin: 0 }}>
          Ventures scoring 65 or above proceed to deep due diligence. The framework has been applied to 174+ ventures across all 12 sectors.
        </p>
      </div>

      {/* Body sections */}
      <div style={{ padding: '20px 20px 0' }}>

        <MobileSec n="I" label="The Problem This Solves" headline="Ghana does not lack good ideas. It lacks a rigorous way to distinguish them." isOpen={openSecs[0]} onToggle={() => toggleSec(0)}>
          <p style={{ fontSize: 14, lineHeight: 1.82, color: C.subtle, marginBottom: 14, marginTop: 16 }}>
            Every venture that enters the BRIDGE pipeline is evaluated through the same framework, measured against the same criteria, and scored on the same 100-point scale. The result is not a gut feeling or a relationship favour — it is an objective, reproducible assessment of whether an opportunity deserves BRIDGE's resources.
          </p>
          <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 18, marginTop: 24 }}>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, fontStyle: 'italic', lineHeight: 1.55, color: C.primary, margin: 0 }}>
              Every investment decision is simultaneously a decision not to invest somewhere else. The communities depending on these resources deserve better than intuition.
            </p>
          </div>
        </MobileSec>

        <MobileSec n="II" label="The Four Dimensions" headline="What the score measures — and why." isOpen={openSecs[1]} onToggle={() => toggleSec(1)}>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: C.subtle, marginBottom: 20, marginTop: 16 }}>The weights are not equal — they are deliberate, reflecting BRIDGE's hierarchy of what matters most.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
            {DIMS.map((d, i) => {
              const bg = ['#1B4D3E','#235E4C','#2B7060','#348070'][i];
              return (
                <div key={i} style={{ background: bg, padding: '14px 16px' }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Dimension {d.num}</div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: C.accent, lineHeight: 1 }}>{d.pts}</div>
                  <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>of 100 pts</div>
                </div>
              );
            })}
          </div>
          {DIMS.map((dim, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div onClick={() => setOpen(open === i ? null : i)} style={{ background: open === i ? C.primary : C.white, border: `1px solid ${open === i ? C.primary : C.line}`, borderRadius: open === i ? '10px 10px 0 0' : 10, padding: '16px 18px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, paddingRight: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: open === i ? C.white : C.text, marginBottom: 2 }}>{dim.title}</div>
                  <div style={{ fontSize: 11, color: open === i ? 'rgba(255,255,255,0.48)' : C.muted, fontStyle: 'italic' }}>{dim.question}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <div style={{ background: open === i ? 'rgba(184,217,53,0.18)' : 'rgba(27,77,62,0.07)', borderRadius: 20, padding: '4px 10px', fontSize: 12, fontWeight: 700, color: open === i ? C.accent : C.primary }}>{dim.pts}pts</div>
                  <span style={{ fontSize: 14, color: open === i ? C.accent : C.muted, display: 'inline-block', transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                </div>
              </div>
              {open === i && (
                <div style={{ background: C.white, border: `1px solid ${C.primary}`, borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px' }}>
                  <p style={{ fontSize: 13, lineHeight: 1.78, color: C.subtle, borderBottom: `1px solid ${C.line}`, paddingBottom: 14, marginBottom: 16, fontStyle: 'italic' }}>{dim.rationale}</p>
                  {dim.subs.map((s, si) => (
                    <div key={si} style={{ paddingBottom: si < dim.subs.length - 1 ? 14 : 0, marginBottom: si < dim.subs.length - 1 ? 14 : 0, borderBottom: si < dim.subs.length - 1 ? `1px solid ${C.line}` : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.primary }}>{s.label}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <div style={{ height: 3, width: s.pts * 2.5, background: C.accent, borderRadius: 2 }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: C.muted }}>{s.pts}pts</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 12, lineHeight: 1.72, color: C.subtle, margin: 0 }}>{s.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </MobileSec>

        <MobileSec n="III" label="The Scoring Scale" headline="What each score commits BRIDGE to." isOpen={openSecs[2]} onToggle={() => toggleSec(2)}>
          <p style={{ fontSize: 13, lineHeight: 1.72, color: C.subtle, marginBottom: 20, marginTop: 16 }}>A score above 65 triggers deep due diligence. Every score — including a decline — carries a written commitment.</p>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: `1px solid ${C.line}` }}>
            {THRESHOLDS.map((t, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: i < THRESHOLDS.length - 1 ? `1px solid ${C.line}` : 'none', padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: t.color }}>{t.range}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{t.rating}</div>
                </div>
                <div style={{ fontSize: 11, color: C.subtle, lineHeight: 1.55, marginBottom: 8 }}>{t.action}</div>
                <div style={{ height: 3, background: C.line, borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${t.bar}%`, background: t.color, borderRadius: 2, opacity: 0.7 }} />
                </div>
              </div>
            ))}
          </div>
        </MobileSec>

        <MobileSec n="IV" label="The Evaluation Process" headline="Five stages. One uncompromising standard." isOpen={openSecs[3]} onToggle={() => toggleSec(3)}>
          <p style={{ fontSize: 13, lineHeight: 1.72, color: C.subtle, marginBottom: 24, marginTop: 16 }}>Thorough without placing unnecessary burden on applicants, and transparent at every decision point.</p>
          {STAGES.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: i < STAGES.length - 1 ? 20 : 0, marginBottom: i < STAGES.length - 1 ? 20 : 0, borderBottom: i < STAGES.length - 1 ? `1px solid ${C.line}` : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 12, color: C.accent }}>{s.n}</span>
                </div>
                {i < STAGES.length - 1 && <div style={{ width: 1, flex: 1, background: C.line, minHeight: 16, margin: '6px 0' }} />}
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.title}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.accent, background: 'rgba(184,217,53,0.12)', padding: '2px 8px', borderRadius: 20 }}>{s.time}</div>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.75, color: C.subtle, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </MobileSec>

        <MobileSec n="V" label="Why It Is Genuinely Objective" headline="Three design features — not just assurances." isOpen={openSecs[4]} onToggle={() => toggleSec(4)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            {[
              { title: 'Standardised criteria, applied uniformly across all sectors', body: 'The same four dimensions apply to every venture regardless of sector, submitter, or investment size. Cross-sector comparability — rare in development finance — enables sound portfolio-level decisions.' },
              { title: 'Structural separation of scoring from relationship management', body: 'The team that builds relationships with venture founders is not the team that evaluates them. This separation prevents the most common form of evaluation bias in development finance.' },
              { title: 'Documented, auditable rationale at every sub-component level', body: 'Every score is accompanied by written justification for every sub-component. Scores can be reviewed, challenged, and where evidence warrants, revised.' },
            ].map((w, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.line}`, padding: '18px 18px', display: 'flex', gap: 14 }}>
                <div style={{ width: 3, background: C.accent, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>{w.title}</div>
                  <p style={{ fontSize: 12, lineHeight: 1.72, color: C.subtle, margin: 0 }}>{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </MobileSec>

        {/* Kejetia */}
        <div style={{ background: C.primary, borderRadius: 12, padding: '28px 20px', marginTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 20, height: 1, background: C.accent }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accent }}>Case Study — Kejetia Market</span>
          </div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, fontStyle: 'italic', color: C.white, lineHeight: 1.55, margin: '0 0 10px' }}>
            BRIDGE's flagship venture — West Africa's largest market, 10,000+ vendors — scored <span style={{ color: C.accent }}>87/100</span>.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', margin: '0 0 24px', lineHeight: 1.65 }}>
            Exceptional Peace & Prosperity alignment (vendor dignity, market income security), strong strategic fit, credible execution team, and national replication potential.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, borderRadius: 8, overflow: 'hidden' }}>
            {KEJETIA.map(k => (
              <div key={k.label} style={{ background: 'rgba(255,255,255,0.06)', padding: '14px 14px' }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: C.accent, lineHeight: 1, marginBottom: 2 }}>
                  {k.score}<span style={{ fontSize: 11, color: 'rgba(255,255,255,0.30)' }}>/{k.max}</span>
                </div>
                <div style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.40)', letterSpacing: '0.03em', marginBottom: 8 }}>{k.label}</div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${(k.score / k.max) * 100}%`, background: C.accent, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score as service */}
        <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderTop: `3px solid ${C.primary}`, borderRadius: '0 0 10px 10px', padding: '24px 20px', marginTop: 2, marginBottom: 56 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.primary, marginBottom: 10 }}>The Score as a Professional Service</div>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, fontWeight: 400, margin: '0 0 10px' }}>BRIDGE offers the Impact Score™ externally.</h3>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: C.subtle, margin: '0 0 16px' }}>
            Entrepreneurs, government agencies, and institutional investors can commission the Score as a standalone professional service.
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {['Founders', 'Government Agencies', 'Investors', 'DFIs'].map(l => (
              <span key={l} style={{ padding: '4px 10px', background: 'rgba(27,77,62,0.08)', borderRadius: 20, fontSize: 11, fontWeight: 600, color: C.primary }}>{l}</span>
            ))}
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>bridge-pbc.com</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: C.cover, padding: '32px 20px 28px' }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: C.white, marginBottom: 6 }}>BRIDGE PBC</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', lineHeight: 1.65, marginBottom: 16 }}>Delivering the intelligence, resources, and strategies that bridge the gap between opportunity and outcome.</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.accent }}>bridge-pbc.com</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)' }}>Doc 01/23 · March 2026</div>
        </div>
      </div>
    </div>
  );
}

// ─── DESKTOP LAYOUT ───────────────────────────────────────────────────────────

function DesktopImpactScore() {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, minHeight: '100vh', color: C.text }}>
      <style>{FONTS}</style>

      {/* Nav */}
      <div style={{ background: C.cover, borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 64px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: C.white, marginRight: 10, letterSpacing: '-0.01em' }}>BRIDGE PBC</span>
            <span className="nav-crumb" style={{ color: 'rgba(255,255,255,0.2)', marginRight: 10, fontSize: 12 }}>›</span>
            <span className="nav-crumb" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginRight: 10 }}>Document Library</span>
            <span style={{ color: 'rgba(255,255,255,0.2)', marginRight: 10, fontSize: 12 }}>›</span>
            <span style={{ fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: '0.01em' }}>BRIDGE Impact Score™ Methodology</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>bridge-pbc.com</span>
        </div>
      </div>

      {/* Cover */}
      <div style={{ background: C.cover, padding: '80px 64px 72px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}>
            <div style={{ width: 36, height: 2, background: C.accent }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent }}>General Series</span>
            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}>Document No. 01 of 23 · March 2026</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 64, alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 68, fontWeight: 400, lineHeight: 1.02, margin: '0 0 6px', color: C.white, letterSpacing: '-0.02em' }}>BRIDGE</h1>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 68, fontWeight: 400, lineHeight: 1.02, margin: '0 0 32px', color: C.accent, letterSpacing: '-0.02em' }}>Impact Score™</h1>
              <p style={{ fontSize: 17, lineHeight: 1.80, color: 'rgba(255,255,255,0.58)', margin: '0 0 32px', maxWidth: 500 }}>
                The proprietary evaluation methodology BRIDGE applies to every venture it considers — rigorous, reproducible, and grounded in a single purpose: the flourishing of Ghanaian citizens, households, and communities.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['174+ Ventures Scored', '12 Sectors', '100-Point Scale', 'Cross-Sector Comparable'].map(t => (
                  <span key={t} style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.06)', padding: '5px 12px', borderRadius: 20 }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'center', paddingBottom: 8 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 88, color: C.accent, lineHeight: 1 }}>100</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', marginTop: 4 }}>Point Scale</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 56, paddingTop: 40 }}>
            {[['4','Dimensions'],['12','Sub-Components'],['174+','Ventures Evaluated'],['65','Qualifying Threshold']].map(([n,l],i) => (
              <div key={l} style={{ paddingRight: 32, borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingLeft: i > 0 ? 32 : 0 }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, color: C.accent, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 64px 96px' }}>
        {/* Exec summary */}
        <div style={{ background: C.white, border: `1px solid ${C.line}`, borderTop: `3px solid ${C.accent}`, borderRadius: '0 0 12px 12px', padding: '28px 36px', marginBottom: 60 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent, marginBottom: 16 }}>Executive Summary</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.78, color: C.subtle, margin: 0 }}>The BRIDGE Impact Score™ is a 100-point proprietary evaluation framework applied to every venture BRIDGE considers. It measures four dimensions: Peace & Prosperity Alignment (30 pts), Strategic Fit (25 pts), Feasibility & Execution (25 pts), and Scalability & Sustainability (20 pts).</p>
            <p style={{ fontSize: 14, lineHeight: 1.78, color: C.subtle, margin: 0 }}>Ventures scoring 65 or above proceed to deep due diligence. The framework has been applied to 174+ ventures across all 12 sectors, producing a cross-sector comparable, reproducible assessment of whether any opportunity deserves BRIDGE's resources — and Ghana's investment.</p>
          </div>
        </div>

        <SectionMark n="I" label="The Problem This Solves" />
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 28px', lineHeight: 1.15 }}>Ghana does not lack good ideas.<br />It lacks a rigorous way to distinguish them.</h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: C.subtle, marginBottom: 18 }}>The BRIDGE Impact Score™ exists to close that gap precisely. Every venture, initiative, or investment opportunity that enters the BRIDGE pipeline is evaluated through the same framework, measured against the same criteria, and scored on the same 100-point scale. The result is not a gut feeling, not a relationship favour, and not a reflection of who presented most persuasively.</p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: C.subtle }}>That rigour matters because resources are finite and opportunity costs are real. Capital deployed in one direction cannot be deployed in another — and the communities that depend on sound investment deserve better than intuition.</p>
        <PullQuote>Every investment decision is simultaneously a decision not to invest somewhere else. The communities depending on these resources deserve better than intuition.</PullQuote>

        {/* II — Dimensions */}
        <div style={{ marginTop: 72 }}>
          <SectionMark n="II" label="The Four Dimensions" />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 14px', lineHeight: 1.15 }}>What the score measures — and why.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.80, color: C.subtle, marginBottom: 40 }}>Each dimension captures a distinct and essential question. The weights are deliberate, reflecting BRIDGE's hierarchy of what matters most.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, borderRadius: 10, overflow: 'hidden', marginBottom: 36 }}>
            {DIMS.map((d, i) => {
              const bg = ['#1B4D3E','#235E4C','#2B7060','#348070'][i];
              return (
                <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{ background: open === i ? '#0F2D24' : bg, padding: '18px 20px', cursor: 'pointer', transition: 'background 0.2s', borderBottom: open === i ? `3px solid ${C.accent}` : '3px solid transparent' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>Dimension {d.num}</div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: C.accent, lineHeight: 1, marginBottom: 4 }}>{d.pts}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>of 100 pts</div>
                </div>
              );
            })}
          </div>
          {DIMS.map((dim, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div onClick={() => setOpen(open === i ? null : i)} style={{ background: open === i ? C.primary : C.white, border: `1px solid ${open === i ? C.primary : C.line}`, borderRadius: open === i ? '12px 12px 0 0' : 12, padding: '20px 26px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 13, color: open === i ? C.accent : C.muted, minWidth: 20 }}>{dim.num}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: open === i ? C.white : C.text }}>{dim.title}</div>
                    <div style={{ fontSize: 12, color: open === i ? 'rgba(255,255,255,0.50)' : C.muted, marginTop: 3, fontStyle: 'italic' }}>{dim.question}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ background: open === i ? 'rgba(184,217,53,0.18)' : 'rgba(27,77,62,0.07)', borderRadius: 20, padding: '5px 14px', fontSize: 13, fontWeight: 700, color: open === i ? C.accent : C.primary }}>{dim.pts} pts</div>
                  <span style={{ fontSize: 16, color: open === i ? C.accent : C.muted, transition: 'transform 0.2s', display: 'inline-block', transform: open === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                </div>
              </div>
              {open === i && (
                <div style={{ background: C.white, border: `1px solid ${C.primary}`, borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '0 26px 26px' }}>
                  <p style={{ fontSize: 14, lineHeight: 1.80, color: C.subtle, borderBottom: `1px solid ${C.line}`, padding: '20px 0', margin: '0 0 20px', fontStyle: 'italic' }}>{dim.rationale}</p>
                  {dim.subs.map((s, si) => (
                    <div key={si} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 20, paddingBottom: si < dim.subs.length - 1 ? 18 : 0, marginBottom: si < dim.subs.length - 1 ? 18 : 0, borderBottom: si < dim.subs.length - 1 ? `1px solid ${C.line}` : 'none' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.primary, marginBottom: 8 }}>{s.label}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ height: 3, width: s.pts * 3, background: C.accent, borderRadius: 2 }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: C.muted }}>{s.pts} pts</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 13, lineHeight: 1.78, color: C.subtle, margin: 0 }}>{s.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* III — Scale */}
        <div style={{ marginTop: 72 }}>
          <SectionMark n="III" label="The Scoring Scale" />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 14px', lineHeight: 1.15 }}>What each score commits BRIDGE to.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.80, color: C.subtle, marginBottom: 36 }}>A score above 65 triggers deep due diligence. Every score, including a decline, carries a written BRIDGE commitment.</p>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.line}` }}>
            {THRESHOLDS.map((t, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: i < THRESHOLDS.length - 1 ? `1px solid ${C.line}` : 'none', padding: '20px 28px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 140px 1fr', gap: 20, alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: t.color }}>{t.range}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{t.rating}</div>
                  <div style={{ fontSize: 13, color: C.subtle, lineHeight: 1.6 }}>{t.action}</div>
                </div>
                <div style={{ height: 3, background: C.line, borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${t.bar}%`, background: t.color, borderRadius: 2, opacity: 0.7 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IV — Process */}
        <div style={{ marginTop: 72 }}>
          <SectionMark n="IV" label="The Evaluation Process" />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 14px', lineHeight: 1.15 }}>Five stages. One uncompromising standard.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.80, color: C.subtle, marginBottom: 44 }}>Thorough without placing unnecessary burden on applicants, and transparent at every decision point.</p>
          {STAGES.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 56 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 14, color: C.accent }}>{s.n}</span>
                </div>
                {i < STAGES.length - 1 && <div style={{ width: 1, flex: 1, background: C.line, minHeight: 24, margin: '8px 0' }} />}
              </div>
              <div style={{ paddingBottom: i < STAGES.length - 1 ? 32 : 0, paddingTop: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{s.title}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.accent, background: 'rgba(184,217,53,0.12)', padding: '3px 10px', borderRadius: 20 }}>{s.time}</div>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.80, color: C.subtle, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* V — Objectivity */}
        <div style={{ marginTop: 72 }}>
          <SectionMark n="V" label="Why It Is Genuinely Objective" />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 14px', lineHeight: 1.15 }}>Three design features — not just assurances.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.80, color: C.subtle, marginBottom: 32 }}>Objectivity is easy to claim. BRIDGE designs it structurally into the process.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { title: 'Standardised criteria, applied uniformly across all sectors', body: 'The same four dimensions and sub-components apply to every venture regardless of sector, submitter, or investment size. Cross-sector comparability — rare in development finance — enables sound portfolio-level decisions.' },
              { title: 'Structural separation of scoring from relationship management', body: 'The team that builds and manages relationships with venture founders is not the team that evaluates those ventures. This prevents the most common form of evaluation bias in development finance.' },
              { title: 'Documented, auditable rationale at every sub-component level', body: 'Every score is accompanied by written justification for every sub-component — not summary conclusions. Scores can be reviewed, challenged, and where evidence warrants, revised.' },
            ].map((w, i) => (
              <div key={i} className="white-card" style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.line}`, padding: '24px 28px', display: 'flex', gap: 18 }}>
                <div style={{ width: 3, background: C.accent, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 8 }}>{w.title}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.80, color: C.subtle, margin: 0 }}>{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kejetia */}
        <div style={{ background: C.primary, borderRadius: 14, padding: '44px 52px', marginTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: C.accent }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent }}>Case Study — Kejetia Market Digitisation</span>
          </div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 21, fontStyle: 'italic', color: C.white, lineHeight: 1.6, margin: '0 0 12px', maxWidth: 580 }}>
            BRIDGE's flagship venture — West Africa's largest market, 10,000+ vendors in Kumasi — scored <span style={{ color: C.accent }}>87/100</span> on the BRIDGE Impact Score™.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: '0 0 32px', lineHeight: 1.7 }}>Exceptional Peace & Prosperity alignment (vendor dignity, market income security, community economic thriving), strong strategic fit with the Infrastructure sector mandate, credible execution team with Kumasi market expertise, and demonstrated national replication potential across Ghana's 16 regions.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, borderRadius: 8, overflow: 'hidden' }}>
            {KEJETIA.map(k => (
              <div key={k.label} style={{ background: 'rgba(255,255,255,0.06)', padding: '16px 18px' }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: C.accent, lineHeight: 1, marginBottom: 4 }}>
                  {k.score}<span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>/{k.max}</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.40)' }}>{k.label}</div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 2, marginTop: 10 }}>
                  <div style={{ height: '100%', width: `${(k.score / k.max) * 100}%`, background: C.accent, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score as service */}
        <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderTop: `3px solid ${C.primary}`, borderRadius: '0 0 12px 12px', padding: '36px 44px', marginTop: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 36, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.primary, marginBottom: 10 }}>The Score as a Professional Service</div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, margin: '0 0 10px' }}>BRIDGE offers the Impact Score™ externally.</h3>
              <p style={{ fontSize: 13, lineHeight: 1.78, color: C.subtle, margin: '0 0 16px' }}>Entrepreneurs, government agencies, and institutional investors can commission the Score as a standalone professional service.</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Founders & Entrepreneurs', 'Government Agencies', 'Institutional Investors', 'Development Finance Institutions'].map(l => (
                  <span key={l} style={{ padding: '5px 12px', background: 'rgba(27,77,62,0.08)', borderRadius: 20, fontSize: 11, fontWeight: 600, color: C.primary }}>{l}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 140 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 13, color: C.muted, marginBottom: 4 }}>Enquire at</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>bridge-pbc.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: C.cover, borderTop: `3px solid rgba(184,217,53,0.18)`, padding: '48px 64px 36px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: C.white, marginBottom: 6, letterSpacing: '-0.01em' }}>BRIDGE PBC</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, maxWidth: 440 }}>Delivering the intelligence, resources, and strategies that bridge the gap between opportunity and outcome.</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.accent, marginBottom: 4, letterSpacing: '0.04em' }}>bridge-pbc.com</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>General Series — Document 01/23 · March 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────

export default function ImpactScoreDoc() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile ? <MobileImpactScore /> : <DesktopImpactScore />;
}
