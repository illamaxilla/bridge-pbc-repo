import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  primary: '#1B4D3E', accent: '#B8D935', bg: '#F3F5F2',
  text: '#111111', subtle: '#5C5C5C', muted: '#8A8A8A',
  line: '#E0E0E0', white: '#FFFFFF', cover: '#0B1510',
};
const FONTS = `


  /* Transitions */
  .sector-card { transition: box-shadow 0.2s, border-color 0.18s; }
  .sector-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); }
  .synergy-card { transition: box-shadow 0.2s, transform 0.18s; }
  .synergy-card:hover { box-shadow: 0 4px 18px rgba(0,0,0,0.06); transform: translateY(-1px); }
  .filter-btn { transition: all 0.15s; }
  .view-btn { transition: all 0.15s; }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SECTORS = [
  { num: '01', title: 'Infrastructure & Basic Services', tier: 'Core', capital: '$8–$15M', ventures: '15+', score: 87, ministry: 'Roads, Works & Housing', tagline: "Ghana's physical backbone determines the ceiling for every other sector.", stat: { n: '10,000+', l: 'Vendors — Kejetia flagship' }, body: "Infrastructure gaps do not merely inconvenience Ghanaians — they actively destroy economic value at scale. BRIDGE's infrastructure portfolio centres on market modernisation, anchored by the Kejetia Market digitisation platform serving West Africa's largest market, alongside water systems, sanitation, and last-mile digital connectivity.", keyVentures: ['Kejetia Market Digitisation Platform', 'Rural Water & Sanitation Systems', 'Last-Mile Digital Connectivity Infrastructure'] },
  { num: '02', title: 'Financial Inclusion & Economic Security', tier: 'Core', capital: '$10–$20M', ventures: '18+', score: 83, ministry: 'Finance', tagline: "An estimated $4–6 billion in credit is inaccessible to Ghana's SME sector alone.", stat: { n: '40%', l: 'Ghanaians outside formal finance' }, body: "Forty percent of Ghanaians remain outside formal financial services. The consequences are concrete: businesses that cannot access credit cannot grow; households that cannot save formally cannot build assets. BRIDGE addresses credit access, digital payments, micro-insurance, and remittance optimisation.", keyVentures: ['SME Lending Platform', 'Digital Payments Infrastructure', 'Agricultural Micro-Insurance', 'Diaspora Remittance Optimisation'] },
  { num: '03', title: 'Health Systems & Wellbeing', tier: 'Core', capital: '$8–$16M', ventures: '15+', score: 79, ministry: 'Health', tagline: 'One physician per 6,000 citizens. Over half of trained doctors practise outside Ghana.', stat: { n: '1:6,000', l: 'Doctor-to-patient ratio' }, body: "Ghana's health system fails not from lack of effort but from structural mismatch between where care is needed and where it exists. BRIDGE targets this through telemedicine, diagnostic capacity, pharmaceutical supply chain improvements, and health workforce retention.", keyVentures: ['Rural Telemedicine Network', 'Diagnostic Service Centres', 'Pharmaceutical Supply Chain Platform', 'Health Workforce Retention Initiative'] },
  { num: '04', title: 'Technology & Innovation', tier: 'Core', capital: '$8–$15M', ventures: '15+', score: 81, ministry: 'Communications & Digitisation', tagline: 'Technology is both a sector in its own right and the enabling layer for every other sector.', stat: { n: '12', l: 'Sectors enabled by tech layer' }, body: "Fintech platforms extend financial inclusion. AgriTech reduces post-harvest loss. Digital health extends clinical reach beyond brick-and-mortar. EdTech scales training beyond physical infrastructure. BRIDGE's technology portfolio invests in fintech, digital services, innovation hubs, and enabling technology across all 12 sectors.", keyVentures: ['Fintech Lending Infrastructure', 'AgriTech Market Linkage Platform', 'Innovation Hub Network (Accra/Kumasi)', 'Digital Skills Training Platform'] },
  { num: '05', title: 'Education & Skills', tier: 'Core', capital: '$16.5–$33.5M', ventures: '15+', score: 85, ministry: 'Education', tagline: 'Ghana produces graduates. Its economy struggles to employ them productively.', stat: { n: '65%', l: 'SME owners lack management training' }, body: "Over 65% of Ghanaian SME owners lack formal management training. The gap is not academic qualification but practical capability: technical trades, digital competency, management skills. BRIDGE's portfolio is weighted toward TVET transformation, digital skills academies, and workforce development.", keyVentures: ['TVET Transformation Programme', 'Digital Skills Academy Network', 'SME Management Training Programme', 'Vocational Certification Platform'] },
  { num: '06', title: 'Agriculture & Value Chains', tier: 'Core', capital: '$12–$22M', ventures: '18+', score: 86, ministry: 'Agriculture', tagline: '$1.9 billion in annual post-harvest losses. Value created, but not captured.', stat: { n: '$1.9B', l: 'Annual post-harvest losses' }, body: "Agriculture employs approximately 40% of Ghana's workforce. The problem is not what Ghana grows — it is that processing, cold chain logistics, and market infrastructure consistently fail farmers at the point of value capture. BRIDGE intervenes at the processing and value chain level.", keyVentures: ['Cold Chain Storage Network', 'Agro-Processing Facilities', 'Smallholder Cooperative Platform', 'Commodity Market Linkage System'] },
  { num: '07', title: 'Sports, Entertainment & Creative', tier: 'Tier 1', capital: '$10–$20.5M', ventures: '14', score: 74, ministry: 'Tourism, Arts & Culture', tagline: 'Ghanaian creative talent reaches global audiences. The economic returns largely do not.', stat: { n: '$5B+', l: 'Afrobeats global market value' }, body: "Ghana's music, film, fashion, and sports talent reach international audiences while value is captured by intermediaries outside Ghana. BRIDGE's creative portfolio invests in content production infrastructure, talent development, IP monetisation platforms, and creative economy hubs.", keyVentures: ['Film & Music Production Infrastructure', 'IP Monetisation Platform', 'Creative Economy Hub (Accra)', 'Sports Talent Development Academies'] },
  { num: '08', title: 'Housing & Real Estate', tier: 'Tier 1', capital: '$15–$25M', ventures: '10–12', score: 76, ministry: 'Works & Housing', tagline: 'A 1.8-million-unit housing deficit. Demand is unambiguous. Finance is the constraint.', stat: { n: '1.8M', l: 'Unit housing deficit' }, body: "Mortgage products accessible only to a narrow formal-sector workforce, construction costs that make affordable development economically marginal. BRIDGE's housing portfolio targets affordable housing development for the missing middle, construction finance innovation, and diaspora housing products.", keyVentures: ['Affordable Housing Development Fund', 'Construction Finance Platform', 'Diaspora Housing Programme', 'Land Administration Support System'] },
  { num: '09', title: 'Tourism & Hospitality', tier: 'Tier 1', capital: '$10–$18M', ventures: '12–15', score: 71, ministry: 'Tourism, Arts & Culture', tagline: "Ghana's Year of Return demonstrated latent global demand. The infrastructure to convert it remains thin.", stat: { n: '1.1M', l: 'Visitors in 2023 (pre-potential)' }, body: "Infrastructure gaps, inconsistent hospitality quality, and seasonal concentration limit what should be a major economic sector. BRIDGE's portfolio invests in eco-tourism, heritage site development, hospitality skills, and regional destination infrastructure.", keyVentures: ['Heritage Tourism Infrastructure', 'Hospitality Skills Academy', 'Eco-Tourism Development Fund', 'Regional Destination Infrastructure'] },
  { num: '10', title: 'Energy & Renewable Resources', tier: 'Tier 2', capital: '$12–$22M', ventures: '14', score: 78, ministry: 'Energy', tagline: 'Reliable energy is the precondition for virtually every productive economic activity in the portfolio.', stat: { n: '15–20%', l: 'Households without grid access' }, body: "Energy access and reliability challenges impose direct costs across every other BRIDGE sector. When families lack reliable power, children cannot study, clinics cannot refrigerate vaccines, businesses cannot operate. BRIDGE deploys solar companies, community mini-grids, clean cooking solutions, and consumer energy financing.", keyVentures: ['Solar Mini-Grid Programme', 'Clean Cooking Solution Network', 'Energy Financing Platform', 'Commercial & Industrial Solar Deployment'] },
  { num: '11', title: 'Manufacturing & Light Industry', tier: 'Tier 2', capital: '$15–$30M', ventures: '14', score: 73, ministry: 'Trade & Industry', tagline: 'Ghana exports raw materials and imports finished goods — manufacturing can change this.', stat: { n: '8%', l: 'Manufacturing share of GDP (opportunity)' }, body: "The transition from commodity export to value-added manufacturing has driven sustained economic transformation in Southeast Asia — and is available to Ghana. BRIDGE's manufacturing portfolio focuses on light industry with high local value-add: food processing, textile manufacturing, building materials, and pharmaceutical local production.", keyVentures: ['Food Processing Facilities', 'Textile & Garment Manufacturing', 'Building Materials Production', 'Pharmaceutical Local Manufacturing'] },
  { num: '12', title: 'Transportation & Logistics', tier: 'Tier 2', capital: '$10–$22M', ventures: '14', score: 75, ministry: 'Roads, Transport & Highways', tagline: 'Transportation is the connective tissue linking every other sector in the portfolio.', stat: { n: '36+', l: 'Cross-sector integration points' }, body: "Agricultural value chains cannot function without reliable cold chain logistics. Tourism depends on accessible intercity movement. Manufacturing requires efficient distribution networks. BRIDGE's logistics portfolio invests in cold chain infrastructure, last-mile delivery, freight management platforms, and fleet financing.", keyVentures: ['Cold Chain Logistics Network', 'Last-Mile Delivery Platform', 'Fleet Financing Programme', 'Freight Management Software'] },
];

const SYNERGIES = [
  { theme: 'Agricultural Multiplier Chain', color: '#2E6B42', chain: ['Agriculture', 'Cold Chain (Transport)', 'Energy', 'Financial Inclusion', 'Education'], desc: 'Investment in agricultural processing creates immediate demand for cold chain logistics — which requires reliable energy — which creates skilled technical employment — which strengthens the financial resilience of farming households.' },
  { theme: 'Manufacturing Ecosystem', color: '#2D5A8E', chain: ['Manufacturing', 'Energy', 'Transport', 'Education', 'Financial Inclusion'], desc: 'Manufacturing investment depends structurally on reliable energy, skilled labour from the education pipeline, logistics for distribution, and business financing for operators. Returns compound as each enabling sector strengthens.' },
  { theme: 'Tourism Development Circuit', color: '#7D4E2D', chain: ['Tourism', 'Creative Industries', 'Infrastructure', 'Transport', 'Financial Inclusion'], desc: "Tourism investment drives demand for Ghana's creative sector, requires reliable infrastructure and transport, and generates foreign exchange that flows into the broader financial system." },
  { theme: 'Technology as Cross-Cutting Enabler', color: '#5A2D7A', chain: ['Technology', '→', 'All 12 Sectors'], desc: 'Sector 04 does not simply stand alongside the others — it runs through all of them. Fintech enables financial inclusion. AgriTech reduces post-harvest loss. Digital health extends clinical reach. Every sector returns higher on technology investment.' },
];

const TIERS = { Core: { bg: '#1B4D3E' }, 'Tier 1': { bg: '#2E5A4D' }, 'Tier 2': { bg: '#3D6B5C' } };

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

// ─── MOBILE SECTOR CARD ────────────────────────────────────────────────────────

function MobileSectorCard({ sector, isOpen, onToggle }) {
  return (
    <div style={{ borderRadius: isOpen ? '10px 10px 0 0' : 10, border: `1px solid ${isOpen ? C.primary : C.line}`, overflow: 'hidden', marginBottom: isOpen ? 0 : 8 }}>
      <div onClick={onToggle} style={{ background: isOpen ? C.primary : C.white, padding: '14px 16px', cursor: 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 13, color: isOpen ? C.accent : C.muted }}>{sector.num}</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: isOpen ? 'rgba(255,255,255,0.45)' : C.muted }}>{sector.tier}</span>
          </div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: isOpen ? C.accent : C.primary, lineHeight: 1 }}>{sector.score}</div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: isOpen ? C.white : C.text, marginBottom: 3 }}>{sector.title}</div>
        <div style={{ fontSize: 11, color: isOpen ? 'rgba(255,255,255,0.50)' : C.muted, fontStyle: 'italic', lineHeight: 1.45 }}>{sector.tagline}</div>
      </div>

      {/* Stats strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: `1px solid ${isOpen ? 'rgba(255,255,255,0.12)' : C.line}`, background: isOpen ? '#122318' : '#FAFAFA' }}>
        {[{ l: 'Capital', v: sector.capital }, { l: 'Ventures', v: sector.ventures }, { l: sector.stat.l, v: sector.stat.n }].map((s, i) => (
          <div key={i} style={{ padding: '8px 12px', borderRight: i < 2 ? `1px solid ${isOpen ? 'rgba(255,255,255,0.08)' : C.line}` : 'none' }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: isOpen ? 'rgba(255,255,255,0.30)' : C.muted, marginBottom: 2 }}>{s.l}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: isOpen ? C.accent : C.primary }}>{s.v}</div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div style={{ background: C.white, padding: '16px 16px', border: `1px solid ${C.primary}`, borderTop: 'none', borderRadius: '0 0 10px 10px' }}>
          <p style={{ fontSize: 12, lineHeight: 1.75, color: C.subtle, margin: '0 0 14px' }}>{sector.body}</p>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.primary, marginBottom: 8 }}>Indicative Venture Categories</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {sector.keyVentures.map(v => (
              <span key={v} style={{ fontSize: 10, fontWeight: 500, color: C.primary, background: 'rgba(27,77,62,0.07)', padding: '3px 9px', borderRadius: 20 }}>{v}</span>
            ))}
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.line}`, display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: C.muted }}>Ministry:</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: C.primary }}>{sector.ministry}</span>
          </div>
        </div>
      )}
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

function MobilePortfolio() {
  const [filter, setFilter] = useState('All');
  const [openSector, setOpenSector] = useState(null);
  const [openSecs, setOpenSecs] = useState({ 0: true });
  const toggleSec = i => setOpenSecs(p => ({ ...p, [i]: !p[i] }));
  const FILTERS = ['All', 'Core', 'Tier 1', 'Tier 2'];
  const displayed = filter === 'All' ? SECTORS : SECTORS.filter(s => s.tier === filter);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, minHeight: '100vh', color: C.text }}>
      <style>{FONTS}</style>

      {/* Cover */}
      <div style={{ background: C.cover, padding: '44px 20px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 28, height: 2, background: C.accent }} />
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent }}>General Series · March 2026</span>
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, fontWeight: 400, lineHeight: 1.06, margin: '0 0 4px', color: C.white }}>Venture Portfolio</h1>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, fontWeight: 400, lineHeight: 1.06, margin: '0 0 20px', color: C.accent, fontStyle: 'italic' }}>Overview</h1>
        <p style={{ fontSize: 14, lineHeight: 1.72, color: 'rgba(255,255,255,0.52)', margin: '0 0 28px' }}>
          One of the most comprehensive assessments of investable development opportunity across Ghana's 12 priority sectors — 60,000 words of original research distilled into a curated portfolio of 174+ ventures.
        </p>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
          {['174+ Ventures', '$135–$259M Capital', '12 Sectors', '36+ Integration Points'].map(t => (
            <span key={t} style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.40)', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: 20 }}>{t}</span>
          ))}
        </div>
        {/* Tier summary */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 28 }}>
          {[{ tier: 'Core', count: 6, desc: 'Foundational sectors' }, { tier: 'Tier 1', count: 3, desc: 'High alignment' }, { tier: 'Tier 2', count: 3, desc: 'Growth potential' }].map((t, i) => (
            <div key={t.tier} style={{ flex: 1, background: Object.values(TIERS)[i].bg, borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 13, color: C.white }}>{t.tier}</span>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: C.accent }}>{t.count}</span>
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{t.desc}</div>
            </div>
          ))}
        </div>
        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24 }}>
          {[['$135–$259M', 'Portfolio Capital'], ['174–182', 'Ventures Evaluated'], ['12', 'Sectors Covered'], ['36+', 'Integration Points']].map(([n, l]) => (
            <div key={l} style={{ paddingRight: 16, paddingBottom: 16 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: C.accent, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginTop: 5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Exec summary */}
      <div style={{ background: C.white, borderTop: `3px solid ${C.accent}`, padding: '24px 20px', marginBottom: 8 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent, marginBottom: 12 }}>Executive Summary</div>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: C.subtle, margin: '0 0 12px' }}>
          BRIDGE has conducted original research across Ghana's 12 priority development sectors — 60,000+ words of analysis producing 174–182 individually evaluated venture opportunities. Every venture has been scored using the BRIDGE Impact Score™.
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.75, color: C.subtle, margin: 0 }}>
          The portfolio is structured in three tiers and the 36+ cross-sector integration points mean that investment across multiple sectors compounds in value beyond the sum of individual interventions.
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '8px 20px 0' }}>

        <MobileSec n="I" label="The Sector Portfolio" headline="Twelve sectors. One integrated vision." isOpen={openSecs[0]} onToggle={() => toggleSec(0)}>
          <p style={{ fontSize: 13, lineHeight: 1.72, color: C.subtle, marginBottom: 18, marginTop: 16 }}>Tap any sector to see the opportunity thesis, ventures, capital range, and Impact Score™.</p>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto', paddingBottom: 4, WebkitOverflowScrolling: 'touch' }}>
            {FILTERS.map(f => {
              const count = f === 'All' ? SECTORS.length : SECTORS.filter(s => s.tier === f).length;
              return (
                <button key={f} onClick={() => { setFilter(f); setOpenSector(null); }} style={{
                  padding: '8px 14px', borderRadius: 20, border: `1px solid ${filter === f ? C.primary : C.line}`,
                  background: filter === f ? C.primary : C.white, color: filter === f ? C.white : C.muted,
                  fontSize: 12, fontWeight: filter === f ? 600 : 400, cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap', flexShrink: 0,
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  {f}
                  <span style={{ fontSize: 10, fontWeight: 700, color: filter === f ? C.accent : '#CCC' }}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Sector cards */}
          <div>
            {displayed.map(sector => (
              <MobileSectorCard
                key={sector.num}
                sector={sector}
                isOpen={openSector === sector.num}
                onToggle={() => setOpenSector(openSector === sector.num ? null : sector.num)}
              />
            ))}
          </div>
        </MobileSec>

        <MobileSec n="II" label="Cross-Sector Integration" headline="What happens between sectors matters as much as within them." isOpen={openSecs[1]} onToggle={() => toggleSec(1)}>
          <p style={{ fontSize: 13, lineHeight: 1.72, color: C.subtle, marginBottom: 18, marginTop: 16 }}>The 36+ cross-sector integration points create compounding value — places where an investment in one sector multiplies the returns of an investment in another.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SYNERGIES.map((syn, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.line}`, padding: '16px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>{syn.theme}</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
                  {syn.chain.map((c, ci) => (
                    <span key={ci} style={{ fontSize: 10, fontWeight: c === '→' ? 400 : 600, color: c === '→' ? C.muted : C.white, background: c === '→' ? 'transparent' : C.primary, padding: c === '→' ? '0 2px' : '3px 10px', borderRadius: 20 }}>{c}</span>
                  ))}
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.72, color: C.subtle, margin: 0 }}>{syn.desc}</p>
              </div>
            ))}
          </div>
        </MobileSec>

        {/* Dark callout — always visible */}
        <div style={{ background: C.primary, borderRadius: 12, padding: '28px 20px', marginTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 20, height: 1, background: C.accent }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accent }}>What This Portfolio Represents</span>
          </div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, fontStyle: 'italic', color: C.white, lineHeight: 1.55, margin: '0 0 12px' }}>
            The 174+ ventures documented here are not projections or aspirations. They are mapped, scoped, and scored opportunities.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', lineHeight: 1.70, margin: '0 0 24px' }}>
            They represent a credible blueprint for deploying $135 to $259 million in productive capital across Ghana's most important development sectors — generating financial returns alongside measurable advances in human dignity, family security, and community thriving.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, borderRadius: 8, overflow: 'hidden' }}>
            {[{ n: '$135–$259M', l: 'Productive capital blueprint' }, { n: '174–182', l: 'Evaluated and scored ventures' }, { n: '36+', l: 'Compounding integration points' }, { n: '60K+', l: 'Words of research' }].map(s => (
              <div key={s.l} style={{ background: 'rgba(255,255,255,0.06)', padding: '14px 14px' }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: C.accent, lineHeight: 1, marginBottom: 4 }}>{s.n}</div>
                <div style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Access note */}
        <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 10, padding: '20px 20px', marginTop: 8, marginBottom: 48 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.primary, marginBottom: 8 }}>Authenticated Access</div>
          <p style={{ fontSize: 13, lineHeight: 1.72, color: C.subtle, margin: '0 0 14px' }}>Full sector analyses, individual venture profiles, and due diligence materials available to qualified institutional, government, and investment partners.</p>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>bridge-pbc.com/access</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>partnerships@bridge-pbc.com</div>
        </div>
      </div>

    </div>
  );
}

// ─── DESKTOP SECTOR CARD ──────────────────────────────────────────────────────

function SectorCard({ sector, isOpen, onToggle }) {
  return (
    <div className="sector-card" style={{ borderRadius: isOpen ? '12px 12px 0 0' : 12, border: `1px solid ${isOpen ? C.primary : C.line}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>
      <div onClick={onToggle} style={{ background: isOpen ? C.primary : C.white, padding: '20px 24px', cursor: 'pointer', transition: 'background 0.2s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 14, color: isOpen ? C.accent : C.muted }}>{sector.num}</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: isOpen ? 'rgba(255,255,255,0.50)' : C.primary, background: isOpen ? 'rgba(255,255,255,0.1)' : 'rgba(27,77,62,0.07)', padding: '3px 9px', borderRadius: 20 }}>{sector.tier}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: isOpen ? C.accent : C.primary, lineHeight: 1 }}>{sector.score}</div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: isOpen ? 'rgba(255,255,255,0.38)' : C.muted, marginTop: 2 }}>Impact Score™</div>
          </div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: isOpen ? C.white : C.text, marginBottom: 5 }}>{sector.title}</div>
        <div style={{ fontSize: 12, color: isOpen ? 'rgba(255,255,255,0.52)' : C.muted, fontStyle: 'italic', lineHeight: 1.5 }}>{sector.tagline}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: `1px solid ${isOpen ? 'rgba(255,255,255,0.12)' : C.line}`, background: isOpen ? '#122318' : '#FAFAFA' }}>
        {[{ l: 'Capital Range', v: sector.capital }, { l: 'Ventures', v: sector.ventures }, { l: sector.stat.l, v: sector.stat.n }].map((s, i) => (
          <div key={i} style={{ padding: '10px 18px', borderRight: i < 2 ? `1px solid ${isOpen ? 'rgba(255,255,255,0.08)' : C.line}` : 'none' }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: isOpen ? 'rgba(255,255,255,0.35)' : C.muted, marginBottom: 3 }}>{s.l}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: isOpen ? C.accent : C.primary }}>{s.v}</div>
          </div>
        ))}
      </div>
      {isOpen && (
        <div style={{ background: C.white, borderTop: `1px solid ${C.line}`, padding: '22px 24px' }}>
          <p style={{ fontSize: 13, lineHeight: 1.80, color: C.subtle, margin: '0 0 18px' }}>{sector.body}</p>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.primary, marginBottom: 10 }}>Indicative Venture Categories</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {sector.keyVentures.map(v => (
                <span key={v} style={{ fontSize: 11, fontWeight: 500, color: C.primary, background: 'rgba(27,77,62,0.07)', padding: '4px 11px', borderRadius: 20 }}>{v}</span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, paddingTop: 14, borderTop: `1px solid ${C.line}` }}>
            <span style={{ fontSize: 11, color: C.muted }}>Lead Ministry:</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.primary }}>{sector.ministry}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DESKTOP LAYOUT ───────────────────────────────────────────────────────────

function DesktopPortfolio() {
  const [filter, setFilter] = useState('All');
  const [openSector, setOpenSector] = useState(null);
  const [view, setView] = useState('cards');
  const FILTERS = ['All', 'Core', 'Tier 1', 'Tier 2'];
  const displayed = filter === 'All' ? SECTORS : SECTORS.filter(s => s.tier === filter);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, minHeight: '100vh', color: C.text }}>
      <style>{FONTS}</style>

      {/* Cover */}
      <div style={{ background: C.cover, padding: '80px 64px 72px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}>
            <div style={{ width: 36, height: 2, background: C.accent }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent }}>General Series</span>
            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}>Document No. 03 of 23 · March 2026</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 80, alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 64, fontWeight: 400, lineHeight: 1.04, margin: '0 0 16px', color: C.white, letterSpacing: '-0.02em' }}>Venture Portfolio<br /><em style={{ color: C.accent, fontStyle: 'italic' }}>Overview</em></h1>
              <p style={{ fontSize: 17, lineHeight: 1.80, color: 'rgba(255,255,255,0.58)', margin: '0 0 28px', maxWidth: 560 }}>One of the most comprehensive assessments of investable development opportunity across Ghana's 12 priority sectors — 60,000 words of original research distilled into a curated portfolio of 174+ ventures, each evaluated through the BRIDGE Impact Score™.</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['174+ Ventures', '$135–$259M Capital', '12 Sectors', '36+ Integration Points', '60K+ Words Research'].map(t => (
                  <span key={t} style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.06)', padding: '5px 12px', borderRadius: 20 }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ minWidth: 200 }}>
              {[{ tier: 'Core', count: 6, desc: 'Foundational sectors' }, { tier: 'Tier 1', count: 3, desc: 'High BRIDGE alignment' }, { tier: 'Tier 2', count: 3, desc: 'Strong growth potential' }].map((t, i) => (
                <div key={t.tier} style={{ paddingBottom: i < 2 ? 18 : 0, marginBottom: i < 2 ? 18 : 0, borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: C.white }}>{t.tier}</span>
                    <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: C.accent, lineHeight: 1 }}>{t.count}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.30)', marginTop: 2 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 56, paddingTop: 40 }}>
            {[['$135–$259M', 'Indicative Portfolio Capital'], ['174–182', 'Ventures Evaluated'], ['12', 'Sectors Covered'], ['36+', 'Cross-Sector Integration Points'], ['60,000+', 'Words of Research']].map(([n, l], i) => (
              <div key={l} style={{ paddingRight: 24, borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingLeft: i > 0 ? 24 : 0 }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: C.accent, lineHeight: 1, marginBottom: 6 }}>{n}</div>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.line}`, position: 'sticky', top: 0, zIndex: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            {FILTERS.map(f => {
              const count = f === 'All' ? SECTORS.length : SECTORS.filter(s => s.tier === f).length;
              return (
                <button key={f} onClick={() => { setFilter(f); setOpenSector(null); }} style={{ padding: '17px 18px', background: 'none', border: 'none', borderBottom: filter === f ? `2px solid ${C.accent}` : '2px solid transparent', cursor: 'pointer', fontSize: 13, fontWeight: filter === f ? 600 : 400, color: filter === f ? C.primary : C.muted, fontFamily: "'Inter', sans-serif", transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {f === 'All' ? 'All Sectors' : `${f} Sectors`}
                  <span style={{ fontSize: 10, fontWeight: 700, color: filter === f ? C.accent : '#CCC', background: filter === f ? 'rgba(184,217,53,0.15)' : 'transparent', padding: filter === f ? '2px 6px' : '0', borderRadius: 10 }}>{count}</span>
                </button>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            {[['cards', 'Cards'], ['table', 'Table']].map(([v, l]) => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '6px 14px', borderRadius: 6, border: `1px solid ${view === v ? C.primary : C.line}`, background: view === v ? C.primary : 'transparent', color: view === v ? C.white : C.muted, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 64px 96px' }}>
        {/* Exec summary */}
        <div style={{ background: C.white, border: `1px solid ${C.line}`, borderTop: `3px solid ${C.accent}`, borderRadius: '0 0 12px 12px', padding: '28px 36px', marginBottom: 60 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent, marginBottom: 16 }}>Executive Summary</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <p style={{ fontSize: 14, lineHeight: 1.78, color: C.subtle, margin: 0 }}>BRIDGE has conducted original research across Ghana's 12 priority development sectors — 60,000+ words of analysis producing 174–182 individually evaluated venture opportunities. Indicative capital requirement across the full portfolio is $135–$259 million. Every venture has been scored using the BRIDGE Impact Score™.</p>
            <p style={{ fontSize: 14, lineHeight: 1.78, color: C.subtle, margin: 0 }}>The portfolio is structured in three tiers: 6 Core sectors forming Ghana's foundational development infrastructure; 3 Tier 1 sectors with high BRIDGE alignment; and 3 Tier 2 sectors with strong growth potential. The 36+ cross-sector integration points mean that investment across multiple sectors compounds in value beyond the sum of individual interventions.</p>
          </div>
        </div>

        <SectionMark n="I" label="The Sector Portfolio" />
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 10px', lineHeight: 1.15 }}>Twelve sectors. One integrated vision.</h2>
        <p style={{ fontSize: 15, lineHeight: 1.80, color: C.subtle, marginBottom: 36 }}>Select any sector to see the opportunity thesis, indicative venture categories, capital range, BRIDGE Impact Score™, and lead ministry counterpart.</p>

        {view === 'cards' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 10 }}>
            {displayed.map(sector => (
              <SectorCard key={sector.num} sector={sector} isOpen={openSector === sector.num} onToggle={() => setOpenSector(openSector === sector.num ? null : sector.num)} />
            ))}
          </div>
        ) : (
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.line}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 140px 100px 80px 80px', background: C.primary, padding: '12px 20px', gap: 16 }}>
              {['#', 'Sector', 'Ministry', 'Capital', 'Ventures', 'Score'].map(h => (
                <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{h}</div>
              ))}
            </div>
            {displayed.map((s, i) => (
              <div key={s.num} style={{ display: 'grid', gridTemplateColumns: '48px 1fr 140px 100px 80px 80px', background: i % 2 === 0 ? C.white : '#FAFAFA', borderBottom: i < displayed.length - 1 ? `1px solid ${C.line}` : 'none', padding: '14px 20px', gap: 16, alignItems: 'center' }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 13, color: C.accent }}>{s.num}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{s.tier}</div>
                </div>
                <div style={{ fontSize: 11, color: C.subtle, lineHeight: 1.4 }}>{s.ministry}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>{s.capital}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.primary }}>{s.ventures}</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: C.accent }}>{s.score}</div>
              </div>
            ))}
          </div>
        )}

        {/* II — Cross-sector */}
        <div style={{ marginTop: 80 }}>
          <SectionMark n="II" label="Cross-Sector Integration" />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, margin: '0 0 14px', lineHeight: 1.15 }}>What happens between sectors matters as much as within them.</h2>
          <p style={{ fontSize: 15, lineHeight: 1.80, color: C.subtle, marginBottom: 36 }}>The 36+ cross-sector integration points create compounding value — this is why BRIDGE operates across 12 sectors simultaneously rather than concentrating in one.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SYNERGIES.map((syn, i) => (
              <div key={i} className="synergy-card" style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.line}`, padding: '24px 28px' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 12 }}>{syn.theme}</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 14 }}>
                  {syn.chain.map((c, ci) => (
                    <span key={ci} style={{ fontSize: 11, fontWeight: c === '→' ? 400 : 500, color: c === '→' ? C.muted : C.white, background: c === '→' ? 'transparent' : C.primary, padding: c === '→' ? '0 2px' : '4px 12px', borderRadius: 20 }}>{c}</span>
                  ))}
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.78, color: C.subtle, margin: 0 }}>{syn.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dark callout */}
        <div style={{ background: C.primary, borderRadius: 14, padding: '48px 52px', marginTop: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: C.accent }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.accent }}>What This Portfolio Represents</span>
          </div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontStyle: 'italic', color: C.white, lineHeight: 1.60, margin: '0 0 18px', maxWidth: 620 }}>The 174+ ventures documented here are not projections or aspirations. They are mapped, scoped, and scored opportunities — the result of the most rigorous independent sector analysis conducted in Ghana's development context.</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 36px', maxWidth: 580 }}>What they represent, collectively, is a credible blueprint for deploying $135 to $259 million in productive capital across Ghana's most important development sectors. The analysis is complete. The ventures are identified. The cross-sector integration architecture is documented. What remains is the work — and the will — to bring them to life.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, borderRadius: 8, overflow: 'hidden' }}>
            {[{ n: '$135–$259M', l: 'Productive capital blueprint' }, { n: '174–182', l: 'Evaluated and scored ventures' }, { n: '36+', l: 'Compounding integration points' }].map(s => (
              <div key={s.l} style={{ background: 'rgba(255,255,255,0.06)', padding: '20px 22px' }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: C.accent, lineHeight: 1, marginBottom: 6 }}>{s.n}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.38)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Access note */}
        <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 12, padding: '28px 36px', marginTop: 16, display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.primary, marginBottom: 8 }}>Authenticated Access</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: C.subtle, margin: 0 }}>Full sector analyses, individual venture profiles, due diligence materials, and government partnership documentation are available to qualified institutional, government, and investment partners through authenticated access.</p>
          </div>
          <div style={{ textAlign: 'center', minWidth: 160 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 4 }}>bridge-pbc.com/access</div>
            <div style={{ fontSize: 11, color: C.muted }}>partnerships@bridge-pbc.com</div>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────

export default function PortfolioOverview() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile ? <MobilePortfolio /> : <DesktopPortfolio />;
}
