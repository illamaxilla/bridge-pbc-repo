import React, { useState, useEffect, useRef } from 'react';
import { colors, CONTENT_MAX_WIDTH } from '../theme';
import { Layout } from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePageMeta } from "@/hooks/usePageMeta";

// ============================================================================
// BRIDGE PBC — FAQ Page
// Help Centre: Hero search · Topic grid · Accordion FAQ · Contact CTA
// ============================================================================

// ─── Scoped Styles ────────────────────────────────────────────────────────────
const FAQStyles = () => (
  <style>{`


    /* ── Interactions ── */
    .faq-search-input::placeholder { color: ${colors.faint}; }
    .faq-search-input:focus { outline: none; box-shadow: 0 0 0 3px rgba(184,217,53,0.3); }
    .faq-search-input { transition: all 0.2s ease; }

    .cat-card { transition: all 0.22s ease; cursor: pointer; }
    .cat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(27,77,62,0.13); }
    .cat-card.active { border-color: ${colors.primary} !important; background: ${colors.primary} !important; }
    .cat-card.active .cat-icon-wrap { background: rgba(184,217,53,0.18) !important; }
    .cat-card.active .cat-title { color: ${colors.white} !important; }
    .cat-card.active .cat-desc  { color: rgba(255,255,255,0.65) !important; }
    .cat-card.active .cat-count { color: ${colors.accent} !important; }

    .sidebar-item { cursor: pointer; transition: all 0.18s ease; }
    .sidebar-item:hover { background: rgba(27,77,62,0.05); }
    .sidebar-item.active { background: ${colors.accentLight}; }
    .sidebar-item.active .sidebar-label { color: ${colors.primary} !important; font-weight: 700 !important; }
    .sidebar-item.active .sidebar-dot { background: ${colors.accent} !important; width: 8px !important; }

    .faq-row { cursor: pointer; transition: background 0.18s ease; }
    .faq-row:hover { background: rgba(27,77,62,0.03); }
    .faq-row.open { background: rgba(27,77,62,0.025); }
    .faq-answer { transition: max-height 0.4s ease, opacity 0.3s ease; overflow: hidden; }

    .cta-btn { transition: all 0.2s ease; cursor: pointer; }
    .cta-btn:hover { transform: translateY(-2px); }

    /* Stat strip 2×2 on mobile */
    @media (max-width: 600px) {
      .stat-item { flex: 0 0 50% !important; padding: 14px 0 !important; }
      .stat-item:nth-child(n) { border-top: 1px solid rgba(255,255,255,0.08) !important; }
      .stat-item:nth-child(1) { border-top: none !important; }
      .stat-item:nth-child(2) { border-top: none !important; border-left: 1px solid rgba(255,255,255,0.08) !important; }
      .stat-item:nth-child(4) { border-left: 1px solid rgba(255,255,255,0.08) !important; }
    }

    /* ── Tablet ≤900px ── */
    @media (max-width: 900px) {
      .hero-section    { padding: 60px 32px 52px !important; }
      .hero-search     { max-width: 100% !important; }
      .stat-strip-wrap { padding: 16px 32px !important; }
      .action-pad      { padding: 32px 32px 0 !important; }
      .action-row      { flex-direction: column !important; gap: 10px !important; }
      .topic-pad       { padding: 36px 32px 40px !important; }
      .topic-grid      { grid-template-columns: repeat(2, 1fr) !important; }
      .faq-body-pad    { padding: 0 32px 72px !important; }
      .faq-layout      { flex-direction: column !important; }
      .faq-sidebar     { display: none !important; }
      .faq-heading-also{ display: none !important; }
      .mem-section     { padding: 64px 32px !important; }
      .mem-grid        { grid-template-columns: 1fr !important; gap: 36px !important; min-height: unset !important; }
      .mem-card-sticky { position: static !important; }
      .mem-tiers       { grid-template-columns: 1fr !important; }
      .cta-section     { padding: 64px 32px !important; }
    }

    /* ── Mobile ≤600px ── */
    @media (max-width: 600px) {
      .hero-section    { padding: 44px 18px 36px !important; }
      .hero-heading    { font-size: 32px !important; white-space: normal !important; letter-spacing: -0.8px !important; }
      .hero-sub        { font-size: 14px !important; margin-bottom: 24px !important; max-width: 100% !important; }
      .hero-search     { flex-direction: column !important; align-items: stretch !important; border-radius: 14px !important; padding: 12px 14px !important; gap: 10px !important; }
      .hero-search-row { display: flex !important; align-items: center !important; gap: 8px !important; }
      .hero-search-btn { width: 100% !important; padding: 13px !important; border-radius: 10px !important; font-size: 14px !important; }
      .hero-hints      { margin-top: 10px !important; font-size: 11px !important; }
      .stat-strip-wrap { padding: 0 !important; }
      .stat-strip      { flex-wrap: wrap !important; padding: 0 18px !important; }
      .stat-divider    { display: none !important; }
      .action-pad      { padding: 24px 18px 0 !important; }
      .action-card     { padding: 18px 20px !important; }
      .topic-pad       { padding: 28px 18px 32px !important; }
      .topic-grid      { gap: 8px !important; }
      .topic-label-row { margin-bottom: 16px !important; }
      .cat-card        { padding: 14px 12px !important; }
      .cat-desc        { display: none !important; }
      .cat-icon-wrap   { width: 34px !important; height: 34px !important; margin-bottom: 8px !important; }
      .faq-body-pad    { padding: 0 18px 52px !important; }
      .faq-section-hd  { padding: 32px 0 24px !important; }
      .faq-section-h2  { font-size: 22px !important; }
      .faq-layout      { padding-top: 0 !important; }
      .faq-accordion   { border-radius: 12px !important; }
      .faq-row-q       { padding: 16px 16px !important; gap: 10px !important; }
      .faq-row-a       { padding: 0 16px 18px 16px !important; }
      .faq-num         { display: none !important; }
      .faq-q-text      { font-size: 14px !important; }
      .faq-toggle-btn  { width: 28px !important; height: 28px !important; flex-shrink: 0; }
      .mob-cat-strip   { margin-top: 16px !important; margin-bottom: 0 !important; }
      .mem-section     { padding: 52px 18px !important; }
      .mem-headline    { font-size: 30px !important; margin-bottom: 14px !important; }
      .mem-sub         { font-size: 14px !important; margin-bottom: 32px !important; }
      .mem-reveal      { padding: 24px 18px !important; border-radius: 12px !important; }
      .mem-ask         { padding: 20px 16px !important; border-radius: 12px !important; }
      .mem-hints       { gap: 6px !important; }
      .mem-hint-chip   { font-size: 11px !important; padding: 5px 10px !important; }
      .mem-paid-header { padding: 22px 18px 16px !important; }
      .mem-paid-features { padding: 14px 16px !important; }
      .mem-paid-footer { padding: 16px 18px !important; }
      .mem-paid-ctas   { flex-direction: column !important; gap: 8px !important; }
      .mem-paid-ctas button { width: 100% !important; justify-content: center !important; }
      .cta-section     { padding: 52px 18px !important; }
      .cta-h2          { font-size: 26px !important; }
      .cta-sub         { font-size: 14px !important; margin-bottom: 32px !important; }
      .cta-buttons     { flex-direction: column !important; align-items: stretch !important; gap: 10px !important; }
      .cta-buttons button { width: 100% !important; padding: 16px !important; text-align: center !important; }
    }
  `}</style>
);

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQ_DATA = {
  about: {
    label: 'About BRIDGE',
    icon: (c, s = 20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    description: 'Our mission, model, and what makes BRIDGE different',
    items: [
      {
        q: 'What is BRIDGE PBC?',
        a: 'BRIDGE PBC (Public Benefit Corporation) is a Ghana-first problem-solving company that delivers intelligence, resources, and strategies bridging the gap between opportunity and outcome. We operate across 12 integrated sectors — from infrastructure and financial inclusion to agriculture, housing, and creative industries — with every decision measured by its impact on Ghanaian citizens, households, and communities.',
      },
      {
        q: 'What does the BRIDGE acronym stand for?',
        a: 'BRIDGE stands for "Blending Resources and Innovation to Drive Ghana\'s Empowerment." The name reflects our core conviction that sustainable development requires aligning capital, intelligence, and execution — not just any single element in isolation.',
      },
      {
        q: 'Is BRIDGE a diaspora organisation?',
        a: 'No. BRIDGE is a Ghana-first company. Diaspora resources are one powerful tool among many we deploy, but our unit of analysis is always the Ghanaian citizen, household, and community. We welcome diaspora capital and expertise, but we are accountable to outcomes on the ground in Ghana — not to any external community.',
      },
      {
        q: 'What is BRIDGE\'s vision?',
        a: 'A Ghana where every citizen has the tools to thrive, the security to plan, and the agency to bridge the gap between where they are and where they aspire to be. Our mission is to deliver the intelligence, resources, and strategies that make that future achievable today.',
      },
      {
        q: 'How is BRIDGE structured as a Public Benefit Corporation?',
        a: 'As a PBC, BRIDGE is legally obligated to pursue a specific public benefit — in our case, the economic and social flourishing of Ghanaian communities — alongside any financial returns. This means our governance, reporting, and investment decisions are held accountable to measurable impact, not just profit. It allows us to attract both commercial investors and mission-aligned capital.',
      },
    ],
  },
  working: {
    label: 'Working with BRIDGE',
    icon: (c, s = 20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    description: 'How to engage us, our process, and what to expect',
    items: [
      {
        q: 'Who does BRIDGE work with?',
        a: 'BRIDGE works with a range of stakeholders: entrepreneurs and SMEs building ventures in Ghana, investors seeking curated deal flow with rigorous impact analysis, government institutions designing and implementing sector policy, and civil society organisations seeking evidence-based strategy support. Our approach is tailored to each engagement type.',
      },
      {
        q: 'What does an engagement with BRIDGE look like?',
        a: 'Every engagement begins with a Discovery Session where we align on your objectives, constraints, and success criteria. From there we propose a structured work plan — which could include sector intelligence delivery, venture assessment, capital facilitation, or strategy advisory. We operate iteratively, sharing findings and frameworks throughout rather than delivering a single end-of-project report.',
      },
      {
        q: 'Does BRIDGE take equity in ventures?',
        a: 'Depending on the engagement, BRIDGE may take advisory equity, a facilitation fee, or a performance-linked stake. We do not operate as a traditional investor — our role is primarily to assess, structure, and connect. Where BRIDGE does take equity, it is always disclosed, negotiated openly, and aligned with the venture\'s long-term interests.',
      },
      {
        q: 'Can a solo founder or early-stage team engage BRIDGE?',
        a: 'Yes. Some of our most rewarding work is with early-stage founders who need clarity on strategy, market positioning, and capital options. We offer a lightweight entry engagement specifically designed for founders — covering BRIDGE Impact Score assessment, competitive landscape mapping, and a structured three-session advisory block.',
      },
      {
        q: 'How long does a typical engagement last?',
        a: 'Engagements range from three to eighteen months depending on scope. A sector intelligence mandate might conclude in six to eight weeks. A capital facilitation and venture structuring engagement typically runs six to twelve months. We design every scope with clear milestones so you always know where we are in the process.',
      },
    ],
  },
  sectors: {
    label: 'Sectors & Coverage',
    icon: (c, s = 20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    description: 'Our 12-sector framework and how sectors are evaluated',
    items: [
      {
        q: 'Which sectors does BRIDGE cover?',
        a: 'BRIDGE operates across 12 integrated sectors: (1) Infrastructure & Basic Services, (2) Financial Inclusion, (3) Health Systems, (4) Technology & Innovation, (5) Education & Skills, (6) Agriculture & Value Chains, (7) Sports, Entertainment & Creative Industries, (8) Housing & Real Estate, (9) Tourism & Hospitality, (10) Energy & Renewable Resources, (11) Manufacturing & Light Industry, and (12) Transportation & Logistics.',
      },
      {
        q: 'Why 12 sectors? How were they chosen?',
        a: 'The 12 sectors were selected through a systematic analysis of Ghana\'s development priorities, capital gaps, and citizen-level impact pathways. Together they account for the primary economic participation channels for most Ghanaian households. They are also interconnected — infrastructure investment, for example, unlocks opportunity across every other sector. The portfolio is designed to be both comprehensive and coherent.',
      },
      {
        q: 'Does BRIDGE have deeper coverage in some sectors than others?',
        a: 'Yes. Our highest-coverage sectors currently are Agriculture & Value Chains, Financial Inclusion, Infrastructure, and Housing — reflecting both the scale of opportunity and the volume of ventures we have assessed. Technology & Innovation and Energy are rapidly growing coverage areas. All 12 sectors have dedicated intelligence frameworks; depth varies by active pipeline.',
      },
      {
        q: 'Do the sectors ever change or expand?',
        a: 'The 12-sector architecture is stable — it represents the complete economic landscape relevant to Ghanaian households. Within each sector, however, sub-sector focus areas evolve with the market. For example, within Agriculture, our active focus areas have shifted from general crop production toward value-added processing, cold chain logistics, and digital market linkages.',
      },
    ],
  },
  impact: {
    label: 'Impact Measurement',
    icon: (c, s = 20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    description: 'The BRIDGE Impact Score™ and how we measure outcomes',
    items: [
      {
        q: 'What is the BRIDGE Impact Score™?',
        a: 'The BRIDGE Impact Score™ is our proprietary venture assessment methodology. It produces a composite score (0–100) across four weighted dimensions: Market Opportunity (30%), Development Impact (30%), Implementation Feasibility (25%), and Financial Sustainability (15%). The score is objective, reproducible, and cross-sector comparable — meaning a score of 72 in Agriculture is directly comparable to a 72 in Technology.',
      },
      {
        q: 'How is the Impact Score calculated?',
        a: 'Each dimension is scored through a structured assessment combining quantitative indicators (market size, addressable household reach, projected IRR, implementation timeline) and qualitative factors (policy environment, team capability, competitive moat). Sub-scores are weighted and aggregated. The full methodology is documented in our Integrated Assessment Framework, available to members.',
      },
      {
        q: 'Has the Impact Score been validated externally?',
        a: 'The framework has been applied to 174+ ventures across all 12 sectors, generating the dataset from which we refine our weightings. We benchmark our scoring against realised venture outcomes where longitudinal data is available. External methodological review is part of our 2026 governance roadmap.',
      },
      {
        q: 'What does a high Impact Score mean for a venture?',
        a: 'A high score — typically 70 and above — signals that a venture sits at the intersection of large addressable opportunity, meaningful citizen-level impact, realistic execution path, and viable financial returns. It does not guarantee success, but it identifies the ventures most likely to generate the compound impact BRIDGE exists to catalyse. Tier classification: Core (70+), Emerging (50–69), Exploratory (<50).',
      },
    ],
  },
  investment: {
    label: 'Investment & Capital',
    icon: (c, s = 20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    description: 'Capital mobilisation, deal flow, and investment structures',
    items: [
      {
        q: 'How does BRIDGE facilitate capital for ventures?',
        a: 'BRIDGE acts as an intelligent intermediary between vetted ventures and aligned capital sources. We do not manage a fund. Instead, we structure and present investment opportunities to our network of investors — family offices, institutional funds, development finance institutions, and qualified diaspora investors — based on deep sector knowledge and vetted venture assessments.',
      },
      {
        q: 'What is the total capital opportunity BRIDGE is addressing?',
        a: 'Across all 12 sectors, BRIDGE has identified a $150–245 billion capital mobilisation opportunity in Ghana. The largest single opportunity is Housing & Real Estate ($25–40B), followed by Agriculture & Value Chains ($20–35B), Financial Inclusion ($15–28B), and Infrastructure ($14–26B). These figures represent the medium-term addressable market, not a single fund target.',
      },
      {
        q: 'What types of investors does BRIDGE work with?',
        a: 'We work with institutional investors, private equity and venture capital funds with frontier market mandates, development finance institutions (DFIs), high-net-worth individuals, and diaspora investor networks. The minimum meaningful engagement threshold varies by sector and structure. We do not work with speculative retail investors.',
      },
      {
        q: 'Does BRIDGE work with Ghanaian institutional investors?',
        a: 'Yes — this is a deliberate priority. We work with Ghanaian pension funds, banks, insurance companies, and domestic family offices. We believe local capital is foundational to sustainable development, and that matching Ghanaian institutional capital to high-quality domestic ventures is one of the highest-leverage activities we can undertake.',
      },
    ],
  },
  partnership: {
    label: 'Partnerships',
    icon: (c, s = 20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 14.5 3 21"/><path d="M14.5 9.5 21 3"/>
        <path d="M2 11.5a10 10 0 0 0 15.5 8.5"/><path d="M22 12.5a10 10 0 0 0-15.5-8.5"/>
      </svg>
    ),
    description: 'Government, NGO, and institutional collaboration',
    items: [
      {
        q: 'Does BRIDGE work with the Ghanaian government?',
        a: 'Yes. BRIDGE provides strategic intelligence and implementation support to government ministries, agencies, and metropolitan authorities. We have a specific Government Partnership framework covering five engagement pathways: policy intelligence, public-private capital structuring, diaspora investment facilitation, programme implementation support, and economic zone development. We align all government work to the Ghana 2026 national budget priorities.',
      },
      {
        q: 'Can international NGOs or development organisations partner with BRIDGE?',
        a: 'Absolutely. We partner with international development organisations, multilateral agencies, and foundations on a project basis — typically where our sector intelligence or venture assessment capabilities complement their programme design or investment screening. We are not a grant-seeking organisation; partnerships with international institutions are built on complementary capabilities.',
      },
      {
        q: 'How does BRIDGE engage the Ghanaian diaspora?',
        a: 'The diaspora is one of several capital and expertise channels we activate — not our primary audience. We engage diaspora networks through structured investment briefings, sector-specific opportunity packages, and targeted matchmaking to vetted ventures. Our Diaspora Investment Intelligence service provides diaspora investors with the same rigorous analysis we produce for institutional clients.',
      },
      {
        q: 'Is BRIDGE open to university or research partnerships?',
        a: 'Yes. We actively seek research partnerships with Ghanaian and international universities, particularly in areas of economic data, agricultural science, public health, and technology policy. Academic collaboration strengthens the evidence base for our sector analyses and expands the data inputs for the BRIDGE Impact Score™. Contact us with a specific collaboration proposal.',
      },
    ],
  },
  intelligence: {
    label: 'Research & Intelligence',
    icon: (c, s = 20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    description: 'Our publications, data sources, and intelligence access',
    items: [
      {
        q: 'What intelligence products does BRIDGE produce?',
        a: 'BRIDGE produces Sector Intelligence Briefs (12 sectors, updated quarterly), the BRIDGE Budget Alignment Report (annual, keyed to Ghana\'s national budget), the BRIDGE Capital Opportunity Index (aggregated across all 12 sectors), individual Venture Assessment Reports (on request), and the BRIDGE Insights publication (periodic, broader economic commentary). Members access the full library; selected briefs are available publicly.',
      },
      {
        q: 'How current is BRIDGE\'s sector data?',
        a: 'Our sector intelligence is updated on a rolling basis. Core economic data is refreshed quarterly; policy and regulatory data is updated as changes occur. For active sectors in our pipeline (Agriculture, Financial Inclusion, Housing, Infrastructure), we maintain near-real-time tracking. Our data integrates Ghana Statistical Service releases, World Bank and AfDB datasets, Central Bank of Ghana reports, and proprietary venture pipeline data.',
      },
      {
        q: 'Can I access BRIDGE intelligence without a full engagement?',
        a: 'Yes. BRIDGE Members receive full access to the intelligence library. Individual reports can be purchased as standalone publications. We also provide a complimentary Sector Snapshot — a 4-page overview of a single sector of your choosing — for any first-time enquiry. Contact us to request your snapshot.',
      },
      {
        q: 'Does BRIDGE have a flagship project I can learn more about?',
        a: 'Yes. The Kejetia Market Digitisation Platform is our flagship applied project — a technology-driven economic intelligence and vendor services platform for West Africa\'s largest market (10,000+ vendors, Kumasi, Ghana). It is a live demonstration of the BRIDGE methodology: identifying a high-impact opportunity, designing a viable solution, and executing with measurable citizen-level outcomes.',
      },
    ],
  },
  started: {
    label: 'Getting Started',
    icon: (c, s = 20) => (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    description: 'First steps, access, and how to reach our team',
    items: [
      {
        q: 'How do I start working with BRIDGE?',
        a: 'The simplest entry point is our Contact page. Submit a brief description of your objective — are you a founder seeking assessment? An investor seeking deal flow? A government agency seeking policy intelligence? Based on your message, our team will schedule a Discovery Call within five business days and propose the most appropriate engagement pathway.',
      },
      {
        q: 'Is there a cost to the initial Discovery Call?',
        a: 'No. The Discovery Call is complimentary. Our goal in that conversation is mutual — we want to understand your situation clearly, and you should understand how BRIDGE works and whether we are the right partner for you. If there is a fit, we will propose a formal engagement scope. There is no obligation.',
      },
      {
        q: 'Where is BRIDGE based, and do you work outside Accra?',
        a: 'BRIDGE is headquartered in Accra, Ghana. We work nationally — many of our most significant sector opportunities (particularly in Agriculture, Tourism, and Manufacturing) are in secondary cities and peri-urban areas. We have active project relationships in Kumasi, Tamale, and the Eastern and Western Regions. We also work with stakeholders internationally who are focused on Ghana.',
      },
      {
        q: 'How do I stay informed about BRIDGE\'s work and publications?',
        a: 'The best channels are: (1) Subscribe to BRIDGE Insights via our footer newsletter form — we publish economic intelligence and sector updates periodically. (2) Follow us on LinkedIn for timely commentary. (3) Apply for BRIDGE Membership to access the full intelligence library and curated investment briefings. You can also bookmark the Insights section of this website.',
      },
    ],
  },
};

const CATEGORY_KEYS = Object.keys(FAQ_DATA);

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ searchQuery, setSearchQuery }) {
  const inputRef = useRef(null);
  return (
    <section className="hero-section" style={{
      background: colors.primary,
      padding: '80px 56px 72px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(184,217,53,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(184,217,53,0.035) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <div className="hero-inner" style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto', position: 'relative' }}>
        {/* Eyebrow pill */}
        <div style={{ marginBottom: '28px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(184,217,53,0.1)', border: '1px solid rgba(184,217,53,0.2)',
            borderRadius: '50px', padding: '6px 18px',
            fontSize: '11px', fontWeight: '700', color: colors.accent,
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent, display: 'inline-block' }} />
            Help Centre
          </span>
        </div>

        {/* Heading */}
        <h1 className="hero-heading" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(28px, 5.5vw, 72px)',
          fontWeight: '800',
          color: colors.white,
          lineHeight: 1.05,
          letterSpacing: '-1.5px',
          marginBottom: '20px',
          whiteSpace: 'nowrap',
        }}>
          How can we <span style={{ color: colors.accent }}>help you?</span>
        </h1>

        <p className="hero-sub" style={{
          fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85,
          maxWidth: '460px', marginBottom: '44px',
          fontFamily: "'Inter', sans-serif", fontWeight: '300', letterSpacing: '0.1px',
        }}>
          Find answers about BRIDGE, our sectors, methodology,
          and how to engage. Our team responds within one business day.
        </p>

        {/* Search bar — pill shaped */}
        <div className="hero-search" style={{
          display: 'flex', alignItems: 'center',
          background: colors.white, borderRadius: '50px',
          padding: '6px 6px 6px 20px',
          maxWidth: '580px',
          boxShadow: '0 20px 56px rgba(0,0,0,0.3)',
        }}>
          <div className="hero-search-row" style={{ display: 'flex', alignItems: 'center', flex: 1, width: '100%' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={colors.faint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={inputRef}
              className="faq-search-input"
              type="text"
              placeholder="Search frequently asked questions…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: '15px', color: colors.ink,
                background: 'transparent', padding: '10px 12px',
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{
                background: colors.line, border: 'none', cursor: 'pointer',
                width: '28px', height: '28px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.muted, fontSize: '16px', flexShrink: 0,
              }}>×</button>
            )}
          </div>
          <button className="cta-btn hero-search-btn" style={{
            background: colors.accent, border: 'none', borderRadius: '50px',
            padding: '12px 28px', fontSize: '13px', fontWeight: '700',
            color: colors.primary, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>Search →</button>
        </div>

        {/* Search hints */}
        <p className="hero-hints" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginTop: '16px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
          <span>Try:</span>{' '}
          {['Impact Score', 'Discovery Call', 'Kejetia Market'].map((hint, i) => (
            <React.Fragment key={hint}>
              <span onClick={() => setSearchQuery(hint)} style={{ color: 'rgba(255,255,255,0.48)', cursor: 'pointer', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.18)' }}>{hint}</span>
              {i < 2 && <span style={{ margin: '0 6px', opacity: 0.3 }}>·</span>}
            </React.Fragment>
          ))}
        </p>
      </div>

    </section>
  );
}

// ─── Stat Strip ───────────────────────────────────────────────────────────────
function StatStrip() {
  const stats = [
    { value: '174+', label: 'Ventures Assessed' },
    { value: '12', label: 'Integrated Sectors' },
    { value: '$245B', label: 'Capital Opportunity' },
    { value: '10k+', label: 'Kejetia Vendors' },
  ];
  return (
    <div className="stat-strip-wrap" style={{ background: colors.ink, padding: '18px 56px' }}>
      <div className="stat-strip" style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-item" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {i > 0 && <div className="stat-divider" style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.1)' }} />}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '21px', fontWeight: '800', color: colors.accent, lineHeight: 1, letterSpacing: '-0.5px' }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.38)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '3px' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Action Row ───────────────────────────────────────────────────────────────
function ActionRow() {
  const [hov, setHov] = useState(null);
  return (
    <div className="action-pad" style={{ background: colors.background, padding: '44px 56px 0' }}>
      <div className="action-row" style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto', display: 'flex', gap: '14px' }}>
        {/* Submit a question */}
        <button
          onMouseEnter={() => setHov(0)} onMouseLeave={() => setHov(null)}
          className="cta-btn action-card"
          style={{
            flex: 1, background: hov === 0 ? colors.ink : colors.white,
            border: `1.5px solid ${hov === 0 ? colors.ink : colors.line}`,
            borderRadius: '14px', padding: '24px 28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            cursor: 'pointer', transition: 'all 0.22s ease',
            boxShadow: hov === 0 ? '0 8px 28px rgba(13,26,16,0.18)' : '0 2px 8px rgba(0,0,0,0.05)',
          }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.primary, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", color: colors.primary }}>Submit a question</span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: hov === 0 ? colors.white : colors.ink, lineHeight: 1.3 }}>Can't find your answer?<br/>Write to us directly.</div>
          </div>
          <div style={{ width: '44px', height: '44px', background: hov === 0 ? colors.accent : colors.accentLight, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.22s ease' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </button>

        {/* Talk to team */}
        <button
          onMouseEnter={() => setHov(1)} onMouseLeave={() => setHov(null)}
          className="cta-btn action-card"
          style={{
            flex: 1, background: hov === 1 ? colors.teal : colors.primary,
            border: '1.5px solid transparent',
            borderRadius: '14px', padding: '24px 28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            cursor: 'pointer', transition: 'all 0.22s ease',
            boxShadow: '0 4px 20px rgba(27,77,62,0.3)',
          }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", color: colors.accent }}>Book a call</span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: colors.white, lineHeight: 1.3 }}>Talk to our team.<br/>No obligation.</div>
          </div>
          <div style={{ width: '44px', height: '44px', background: 'rgba(184,217,53,0.15)', border: '1px solid rgba(184,217,53,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Topic Grid ───────────────────────────────────────────────────────────────
function TopicGrid({ activeCategory, setActiveCategory }) {
  return (
    <div className="topic-pad" style={{ background: colors.background, padding: '56px 56px 52px' }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>
        {/* Section label */}
        <div className="topic-label-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <span style={{
            backgroundColor: colors.white, border: `1px solid ${colors.line}`,
            borderRadius: '50px', padding: '10px 20px',
            fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
            letterSpacing: '2px', fontFamily: "'Inter', sans-serif", color: colors.primary,
            display: 'inline-flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent, display: 'inline-block' }} />
            Browse by topic
          </span>
          <span style={{ fontSize: '12px', color: colors.faint, fontFamily: "'Inter', sans-serif" }}>{CATEGORY_KEYS.length} topics</span>
        </div>

        <div className="topic-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {CATEGORY_KEYS.map(key => {
            const cat = FAQ_DATA[key];
            const isActive = activeCategory === key;
            const count = cat.items.length;
            return (
              <div
                key={key}
                className={`cat-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(key)}
                style={{
                  background: isActive ? colors.primary : colors.white,
                  border: `1.5px solid ${isActive ? colors.primary : colors.line}`,
                  borderLeft: isActive ? `4px solid ${colors.accent}` : `1.5px solid ${colors.line}`,
                  borderRadius: '12px',
                  padding: '20px 18px',
                  cursor: 'pointer',
                }}
              >
                <div className="cat-icon-wrap" style={{
                  width: '40px', height: '40px',
                  background: isActive ? 'rgba(184,217,53,0.15)' : colors.accentLight,
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '12px',
                }}>
                  {cat.icon(isActive ? colors.accent : colors.primary, 18)}
                </div>
                <div className="cat-title" style={{ fontSize: '13px', fontWeight: '700', color: isActive ? colors.white : colors.ink, marginBottom: '4px', lineHeight: 1.3 }}>{cat.label}</div>
                <div className="cat-desc" style={{ fontSize: '11px', color: isActive ? 'rgba(255,255,255,0.55)' : colors.muted, lineHeight: 1.55, marginBottom: '14px' }}>{cat.description}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="cat-count" style={{
                    fontSize: '10px', fontWeight: '700',
                    color: isActive ? colors.accent : colors.primary,
                    letterSpacing: '1px', textTransform: 'uppercase',
                  }}>{count} Q&A</span>
                  <span style={{ fontSize: '14px', color: isActive ? 'rgba(255,255,255,0.4)' : colors.line }}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── FAQ Accordion Row ────────────────────────────────────────────────────────
function FAQRow({ item, index, isOpen, onToggle }) {
  return (
    <div
      className={`faq-row ${isOpen ? 'open' : ''}`}
      style={{
        borderBottom: `1px solid ${colors.line}`,
        borderLeft: isOpen ? `4px solid ${colors.accent}` : '4px solid transparent',
        transition: 'all 0.22s ease',
        background: isOpen ? 'rgba(27,77,62,0.02)' : 'transparent',
      }}
    >
      {/* Question */}
      <button
        onClick={onToggle}
        className="faq-row-q"
        style={{
          width: '100%', background: 'none', border: 'none',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          padding: '24px 28px',
          cursor: 'pointer', textAlign: 'left',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
          <span className="faq-num" style={{
            minWidth: '26px', height: '26px', borderRadius: '50%',
            background: isOpen ? colors.primary : colors.accentLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', fontWeight: '800',
            color: isOpen ? colors.white : colors.primary,
            marginTop: '1px', flexShrink: 0,
            transition: 'all 0.2s ease',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="faq-q-text" style={{
            fontSize: '15.5px', fontWeight: isOpen ? '700' : '600',
            color: isOpen ? colors.primary : colors.ink,
            lineHeight: 1.45, transition: 'all 0.2s ease',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {item.q}
          </span>
        </div>
        <div className="faq-toggle-btn" style={{
          width: '30px', height: '30px', borderRadius: '50%',
          background: isOpen ? colors.accent : colors.background,
          border: `1.5px solid ${isOpen ? colors.accent : colors.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.25s ease',
          transform: isOpen ? 'rotate(45deg)' : 'none',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? colors.primary : colors.muted} strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      </button>

      {/* Answer */}
      <div className="faq-answer" style={{ maxHeight: isOpen ? '600px' : '0', opacity: isOpen ? 1 : 0 }}>
        <div className="faq-row-a" style={{ padding: '0 28px 28px 70px' }}>
          <div style={{ borderTop: `1px solid ${colors.line}`, paddingTop: '18px' }}>
            <p style={{
              fontSize: '14.5px', color: '#445A50',
              lineHeight: 1.9, margin: 0,
              fontFamily: "'Inter', sans-serif", fontWeight: '400',
              letterSpacing: '0.1px',
            }}>
              {item.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main FAQ Body ─────────────────────────────────────────────────────────────
function FAQBody({ activeCategory, setActiveCategory, searchQuery }) {
  const [openIndex, setOpenIndex] = useState(null);
  const isMobile = useIsMobile();

  // Build filtered results when searching
  const searchResults = searchQuery.trim().length > 1
    ? CATEGORY_KEYS.flatMap(key =>
        FAQ_DATA[key].items
          .filter(item =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(item => ({ ...item, category: FAQ_DATA[key].label }))
      )
    : null;

  const currentItems = searchResults || FAQ_DATA[activeCategory].items;

  return (
    <div className="faq-body-pad" style={{ background: colors.background, padding: '0 56px 96px' }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto' }}>

        {/* Section heading */}
        <div className="faq-section-hd" style={{ padding: '52px 0 36px', borderBottom: `1px solid ${colors.line}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ marginBottom: '14px' }}>
                <span style={{
                  backgroundColor: colors.white, border: `1px solid ${colors.line}`,
                  borderRadius: '50px', padding: '10px 20px',
                  fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
                  letterSpacing: '2px', fontFamily: "'Inter', sans-serif", color: colors.primary,
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent, display: 'inline-block', flexShrink: 0 }} />
                  {searchResults ? 'Search Results' : 'Frequently Asked'}
                </span>
              </div>
              <h2 className="faq-section-h2" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '30px', fontWeight: '800', color: colors.ink, letterSpacing: '-0.5px',
              }}>
                {searchResults
                  ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
                  : FAQ_DATA[activeCategory].label
                }
              </h2>
              {!searchResults && (
                <p style={{ fontSize: '14px', color: colors.muted, marginTop: '6px', fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>{FAQ_DATA[activeCategory].description}</p>
              )}
            </div>
            {!searchResults && (
              <div className="faq-heading-also" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: colors.faint, marginRight: '4px' }}>Also:</span>
                {CATEGORY_KEYS.filter(k => k !== activeCategory).slice(0, 2).map(k => (
                  <button key={k} onClick={() => { setActiveCategory(k); setOpenIndex(0); }} style={{
                    background: colors.white, border: `1px solid ${colors.line}`, borderRadius: '50px',
                    padding: '6px 14px', fontSize: '12px', fontWeight: '600', color: colors.muted,
                    cursor: 'pointer', transition: 'all 0.18s ease',
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = colors.primary; e.target.style.color = colors.primary; }}
                  onMouseLeave={e => { e.target.style.borderColor = colors.line; e.target.style.color = colors.muted; }}>
                    {FAQ_DATA[k].label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile category strip with scroll dots */}
        {!searchResults && isMobile && (
          <div className="mob-cat-strip" style={{ marginTop: '20px', marginBottom: '8px' }}>
            {/* Scrollable pill row */}
            <div style={{
              overflowX: 'auto', WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none', msOverflowStyle: 'none',
              paddingBottom: '2px',
            }}>
              <style>{`.mob-cat-scroll::-webkit-scrollbar { display: none; }`}</style>
              <div className="mob-cat-scroll" style={{ display: 'flex', gap: '8px', width: 'max-content', padding: '2px 0 6px' }}>
                {CATEGORY_KEYS.map(key => {
                  const isActive = key === activeCategory;
                  return (
                    <button
                      key={key}
                      onClick={() => { setActiveCategory(key); setOpenIndex(null); }}
                      style={{
                        padding: '9px 18px', borderRadius: '50px',
                        background: isActive ? colors.primary : colors.white,
                        border: `1px solid ${isActive ? colors.primary : colors.line}`,
                        fontSize: '12px', fontWeight: isActive ? '700' : '500',
                        fontFamily: "'Inter', sans-serif",
                        color: isActive ? colors.white : colors.muted,
                        cursor: 'pointer', whiteSpace: 'nowrap',
                        transition: 'all 0.18s ease',
                        WebkitTapHighlightColor: 'transparent',
                        minHeight: '38px',
                      }}>
                      {FAQ_DATA[key].label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* FAQ layout: sidebar + accordion */}
        <div className="faq-layout" style={{ display: 'flex', gap: '32px', paddingTop: '28px', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          {!searchResults && !isMobile && (
            <div className="faq-sidebar" style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '100px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: colors.muted, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px', paddingLeft: '14px' }}>Categories</div>
              {CATEGORY_KEYS.map(key => {
                const isActive = key === activeCategory;
                return (
                  <div
                    key={key}
                    className={`sidebar-item ${isActive ? 'active' : ''}`}
                    onClick={() => { setActiveCategory(key); setOpenIndex(null); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 14px', borderRadius: '8px', marginBottom: '2px',
                    }}
                  >
                    <div className="sidebar-dot" style={{
                      width: isActive ? '8px' : '5px', height: isActive ? '8px' : '5px',
                      borderRadius: '50%', background: isActive ? colors.accent : colors.line,
                      transition: 'all 0.18s ease', flexShrink: 0,
                    }} />
                    <span className="sidebar-label" style={{
                      fontSize: '13px', fontWeight: isActive ? '700' : '400',
                      color: isActive ? colors.primary : colors.muted,
                      transition: 'all 0.18s ease',
                    }}>
                      {FAQ_DATA[key].label}
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: colors.faint, flexShrink: 0 }}>
                      {FAQ_DATA[key].items.length}
                    </span>
                  </div>
                );
              })}

              {/* Divider */}
              <div style={{ height: '1px', background: colors.line, margin: '16px 14px' }} />

              {/* Contact card in sidebar */}
              <div style={{ margin: '0 6px', background: colors.primary, borderRadius: '10px', padding: '18px 14px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: colors.white, marginBottom: '5px' }}>Still need help?</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: '12px' }}>Our team responds within one business day.</div>
                <button className="cta-btn" style={{
                  width: '100%', background: colors.accent, border: 'none',
                  borderRadius: '50px', padding: '9px 12px', fontSize: '12px',
                  fontWeight: '700', color: colors.primary, cursor: 'pointer',
                }}>Contact Us →</button>
              </div>
            </div>
          )}

          {/* Accordion panel */}
          <div className="faq-accordion" style={{ flex: 1, background: colors.white, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: `1px solid ${colors.line}` }}>
            {currentItems.length === 0 ? (
              <div style={{ padding: '48px 32px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: colors.ink, marginBottom: '8px' }}>No results found</div>
                <div style={{ fontSize: '14px', color: colors.muted }}>Try a different search term, or browse the topics above.</div>
              </div>
            ) : (
              currentItems.map((item, i) => {
                const itemKey = `${activeCategory}-${i}`;
                return (
                  <React.Fragment key={i}>
                    {searchResults && (
                      <div style={{ padding: '10px 24px 0', fontSize: '11px', fontWeight: '600', color: colors.accent, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        {item.category}
                      </div>
                    )}
                    <FAQRow
                      item={item}
                      index={i}
                      isOpen={openIndex === i}
                      onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                    />
                  </React.Fragment>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Membership Teaser ────────────────────────────────────────────────────────
function MembershipTeaser({ onApplyPaid, onApplyFree }) {
  const [askOpen, setAskOpen]     = useState(false);
  const [question, setQuestion]   = useState('');
  const [answer, setAnswer]       = useState('');
  const [loading, setLoading]     = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const isMobile = useIsMobile();
  const inputRef = useRef(null);

  useEffect(() => {
    if (askOpen && inputRef.current) inputRef.current.focus();
  }, [askOpen]);

  const paidFeatures = [
    { label: 'BRIDGE Intelligence Dashboard', stat: '174+ ventures scored' },
    { label: 'All 12 Sector Deep-Dive Reports', stat: '50+ documents' },
    { label: 'Restricted Document Library', stat: 'White papers & strategies' },
    { label: 'Investment Opportunity Pipeline', stat: 'Active deal flow' },
    { label: 'BRIDGE Community — Forums', stat: 'Invite-only' },
    { label: 'Monthly Analyst Briefings', stat: 'Live Q&A included' },
    { label: 'Priority Partnership Introductions', stat: 'Direct access' },
    { label: 'Early Access to New Research', stat: 'First to know' },
  ];

  const path = [
    { num: '01', tag: 'Explore', body: 'Browse the public site. Read sector overviews, methodology, and insights.' },
    { num: '02', tag: 'Join Free', body: 'Apply for Free Membership. Access resources, events, reports, and the member directory.' },
    { num: '03', tag: '30 Days', body: 'Engage genuinely. Read. Attend. This period ensures Paid Membership is an informed decision.' },
    { num: '04', tag: 'Unlock', body: 'Apply for Paid Membership. Dashboard, community, investment pipeline — everything.' },
  ];

  const BRIDGE_CONTEXT = `You are BRIDGE PBC's membership assistant. Answer questions clearly and concisely about BRIDGE membership.

BRIDGE PBC is a Ghana-first problem-solving company delivering intelligence, resources, and strategies across 12 sectors.

MEMBERSHIP TIERS:

1. PUBLIC (Free, no account needed)
   - Full public website & 12 sector overviews
   - Mission, methodology & insights pages
   - Contact & partnership inquiries
   - Public articles & research

2. FREE MEMBER (Free, application required)
   - Everything in Public
   - Newsletter & sector updates
   - Free resource library access
   - Event & webinar invitations
   - Basic sector intelligence reports
   - Member directory (view only)

3. PAID MEMBER ($10/month or $100/year, requires 30 days as Free Member first)
   - BRIDGE Intelligence Dashboard (174+ ventures scored with proprietary BRIDGE Impact Score™)
   - BRIDGE Applications
   - All 12 sector deep-dive reports
   - Full restricted document library (white papers, government strategies, budget analyses, full BRIDGE Integrated Assessment Framework)
   - BRIDGE Community — invite-only forums for investors, founders, policymakers, diaspora professionals
   - Investment opportunity pipeline with full Impact Scores and investment theses
   - Monthly analyst briefings with live Q&A
   - Priority partnership introductions
   - Early access to new research
   - Direct access to the BRIDGE team

THE PATH: Explore → Apply Free → 30 days of engagement → Apply for Paid

WHY 30 DAYS? BRIDGE is a community of committed stakeholders, not a subscription. The waiting period ensures the community remains high-trust and every Paid Member genuinely understands the work.

PRICING: $10/month or $100/year (saves 17%). Payment is processed only after application is reviewed and approved.

APPLICATIONS: Individual memberships only. Organizations seeking institutional relationships should use the Contact page for partnership frameworks.

Keep answers short (2-4 sentences), direct, and warm. Do not use markdown. Do not invent details not listed above.`;

  // Local FAQ matching — answers membership questions from the BRIDGE_CONTEXT knowledge base
  const FAQ_ANSWERS = [
    { keywords: ['paid', 'membership', 'what is paid', 'paid member', 'what do i get'], answer: 'Paid Membership includes the full BRIDGE Intelligence Dashboard with 174+ scored ventures, all 12 sector briefs, the Impact Score methodology, priority community access, and direct access to the BRIDGE team.' },
    { keywords: ['cost', 'price', 'how much', 'pricing', 'fee'], answer: 'Paid Membership is $10/month or $100/year (saves 17%). Payment is processed only after your application is reviewed and approved.' },
    { keywords: ['30 day', 'thirty day', 'wait', 'waiting', 'why wait'], answer: 'BRIDGE is a community of committed stakeholders, not a subscription. The 30-day waiting period ensures the community remains high-trust and every Paid Member genuinely understands the work.' },
    { keywords: ['free', 'free member', 'what is free'], answer: 'Free Membership gives you access to the community forum, monthly intelligence snapshots, and 2 sector brief previews. It\'s the starting point before applying for Paid access.' },
    { keywords: ['organization', 'institutional', 'company', 'team'], answer: 'Individual memberships only. Organizations seeking institutional relationships should use the Contact page for partnership frameworks.' },
    { keywords: ['apply', 'join', 'sign up', 'how to'], answer: 'The path is: Explore the site, apply for Free Membership, engage for 30 days, then apply for Paid access. Start by clicking Request Access on the login page.' },
    { keywords: ['sector', 'sectors', 'which sectors', '12 sectors'], answer: 'BRIDGE covers 12 integrated sectors: Energy, Technology, Agriculture, Education, Financial Inclusion, Health, Housing, Infrastructure, Manufacturing, Sports & Creative, Tourism, and Transportation & Logistics.' },
    { keywords: ['venture', 'ventures', '174', 'portfolio'], answer: 'BRIDGE has identified and scored 174+ ventures across all 12 sectors using the BRIDGE Impact Score methodology. Paid Members get full access to the venture database and scoring details.' },
    { keywords: ['intelligence', 'dashboard', 'platform'], answer: 'The BRIDGE Intelligence Dashboard provides real-time sector data, market overview, analytics, a personal watchlist, and reports — all focused on Ghana\'s investment landscape.' },
    { keywords: ['ghana', 'country', 'where', 'africa'], answer: 'BRIDGE PBC is a Ghana-focused Public Benefit Corporation providing institutional-grade investment intelligence. We are headquartered in Accra with a Ghana-first research focus.' },
  ];

  const askQuestion = () => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setAnswer('');
    const q = question.toLowerCase().trim();
    const match = FAQ_ANSWERS.find(faq => faq.keywords.some(kw => q.includes(kw)));
    // Simulate brief loading for UX
    setTimeout(() => {
      setAnswer(match ? match.answer : 'Great question! For detailed or specific inquiries, please reach out to us directly via the Contact page. Our team is happy to help.');
      setLoading(false);
    }, 400);
  };

  const hints = [
    'What is in Paid Membership?',
    'Why the 30-day wait?',
    'How much does it cost?',
    'Can my organization join?',
  ];

  return (
    <section className="mem-section" style={{ background: colors.ink, padding: '96px 56px', position: 'relative', overflow: 'clip' }}>

      {/* Subtle grid texture */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.025, pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="memgrid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56,0 L0,0 L0,56" fill="none" stroke={colors.accent} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#memgrid)"/>
      </svg>

      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Two-column layout ── */}
        <div className="mem-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '72px', alignItems: 'start', minHeight: '700px' }}>

          {/* ── LEFT: copy + path + ask widget ── */}
          <div>
            {/* Eyebrow */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{
                backgroundColor: 'rgba(184,217,53,0.1)', border: '1px solid rgba(184,217,53,0.2)',
                borderRadius: '50px', padding: '10px 20px',
                fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
                letterSpacing: '2px', fontFamily: "'Inter', sans-serif", color: colors.accent,
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent, display: 'inline-block', flexShrink: 0 }} />
              BRIDGE Membership
            </span>
            </div>

            {/* Headline */}
            <h2 className="mem-headline" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: '300',
              color: colors.white, letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '20px',
            }}>
              There is more{' '}
              <span style={{ fontWeight: '600', color: colors.accent }}>inside.</span>
            </h2>
            <p className="mem-sub" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, maxWidth: '440px', fontFamily: "'Inter', sans-serif", fontWeight: '300', marginBottom: '48px' }}>
              The public site is the beginning. BRIDGE membership is structured deliberately —
              each tier reflects a genuine relationship with Ghana's opportunity landscape.
              The path is short. The first step is free.
            </p>

            {/* ── 4-step path ── */}
            <div style={{ marginBottom: '52px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '20px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.35)' }}>The path to full access</span>
              </div>
              <div className="mem-path" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {path.map((step, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveStep(activeStep === i ? null : i)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '16px',
                      padding: '16px 18px', borderRadius: '10px', cursor: 'pointer',
                      background: activeStep === i ? 'rgba(184,217,53,0.06)' : 'transparent',
                      borderLeft: `2px solid ${activeStep === i ? colors.accent : 'rgba(255,255,255,0.06)'}`,
                      transition: 'all 0.2s ease', marginBottom: '4px',
                    }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                      background: i === 3 ? colors.accent : activeStep === i ? 'rgba(184,217,53,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${i === 3 ? 'transparent' : activeStep === i ? colors.accent : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}>
                      <span style={{ fontSize: '9px', fontWeight: '800', fontFamily: "'DM Sans', sans-serif", color: i === 3 ? colors.primary : activeStep === i ? colors.accent : 'rgba(255,255,255,0.35)', letterSpacing: '0.5px' }}>{step.num}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: activeStep === i ? colors.accent : 'rgba(255,255,255,0.5)', fontFamily: "'DM Sans', sans-serif", marginBottom: activeStep === i ? '6px' : '0', transition: 'all 0.2s ease' }}>{step.tag}</div>
                      {activeStep === i && (
                        <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontFamily: "'Inter', sans-serif", fontWeight: '300' }}>{step.body}</div>
                      )}
                    </div>
                    {i < 3 && activeStep !== i && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: '10px' }}>
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Ask about membership widget ── */}
            <div className="mem-ask" style={{
              background: 'rgba(255,255,255,0.04)', borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)', padding: '28px 28px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", color: colors.accent }}>Ask about membership</span>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif", fontWeight: '300', lineHeight: 1.6, marginBottom: '20px' }}>
                Have a specific question? Our membership assistant will answer it directly.
              </p>

              {/* Hint chips */}
              {!askOpen && !isMobile && (
                <div className="mem-hints" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  {hints.map((h, i) => (
                    <button key={i} className="mem-hint-chip" onClick={() => { setQuestion(h); setAskOpen(true); }} style={{
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '50px', padding: '6px 14px', fontSize: '12px',
                      color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                      transition: 'all 0.18s ease',
                    }}>{h}</button>
                  ))}
                </div>
              )}

              {/* Input row */}
              {!askOpen ? (
                <button
                  onClick={() => setAskOpen(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50px', padding: '12px 20px', cursor: 'text',
                    fontFamily: "'Inter', sans-serif", fontSize: '13px',
                    color: 'rgba(255,255,255,0.25)',
                  }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  Type your question…
                </button>
              ) : (
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <input
                      ref={inputRef}
                      value={question}
                      onChange={e => setQuestion(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && askQuestion()}
                      placeholder="e.g. What is inside the Intelligence Dashboard?"
                      style={{
                        flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '50px', padding: '11px 20px', fontSize: '13px',
                        color: colors.white, fontFamily: "'Inter', sans-serif", outline: 'none',
                      }}
                    />
                    <button
                      onClick={askQuestion}
                      disabled={loading || !question.trim()}
                      style={{
                        background: loading ? 'rgba(184,217,53,0.4)' : colors.accent,
                        border: 'none', borderRadius: '50px', padding: '11px 22px',
                        fontSize: '12px', fontWeight: '700', color: colors.primary,
                        cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif",
                        transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                      }}>
                      {loading ? '…' : 'Ask →'}
                    </button>
                  </div>

                  {/* Answer */}
                  {loading && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent, animation: 'pulse 1s infinite' }} />
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif" }}>Retrieving answer…</span>
                    </div>
                  )}
                  {answer && (
                    <div style={{
                      background: 'rgba(184,217,53,0.05)', border: '1px solid rgba(184,217,53,0.15)',
                      borderLeft: `3px solid ${colors.accent}`,
                      borderRadius: '12px', padding: '16px 20px',
                    }}>
                      <div style={{ fontSize: '9px', fontWeight: '700', color: colors.accent, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>BRIDGE Membership</div>
                      <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontFamily: "'Inter', sans-serif", fontWeight: '300', margin: 0 }}>{answer}</p>
                      <button onClick={() => { setQuestion(''); setAnswer(''); }} style={{
                        marginTop: '12px', background: 'none', border: 'none', fontSize: '11px',
                        color: 'rgba(255,255,255,0.25)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                        padding: 0,
                      }}>Ask another question →</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Paid tier card ── */}
          <div className="mem-card-sticky" style={{ position: 'sticky', top: '40px', alignSelf: 'start' }}>
            {/* Header */}
            <div className="mem-paid-header" style={{
              background: colors.primary, borderRadius: '20px 20px 0 0',
              padding: '28px 28px 24px', borderBottom: `3px solid ${colors.accent}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span style={{
                  fontSize: '9px', fontWeight: '800', color: colors.primary,
                  background: colors.accent, padding: '4px 12px', borderRadius: '50px',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                }}>Paid Member</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif" }}>Full Access</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: '300', fontFamily: "'Inter', sans-serif", color: colors.white, marginBottom: '4px', letterSpacing: '-0.2px' }}>Full Intelligence</div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, fontFamily: "'Inter', sans-serif", fontWeight: '300', marginBottom: '18px' }}>
                For investors, founders, policymakers, and change-makers serious about Ghana's opportunity landscape.
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '36px', fontWeight: '800', color: colors.accent, letterSpacing: '-1px' }}>$10</span>
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>per month</div>
                  <div style={{ fontSize: '11px', color: colors.accent, fontWeight: '600' }}>$100/year — save 17%</div>
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="mem-paid-features" style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderTop: 'none', padding: '20px 24px',
            }}>
              {paidFeatures.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0', borderBottom: i < paidFeatures.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                    background: 'rgba(184,217,53,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', sans-serif", fontWeight: '400', lineHeight: 1.4 }}>{f.label}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(184,217,53,0.6)', fontFamily: "'DM Sans', sans-serif", fontWeight: '600', marginTop: '1px' }}>{f.stat}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lock notice */}
            <div style={{
              background: 'rgba(184,217,53,0.06)', border: '1px solid rgba(184,217,53,0.15)',
              borderTop: 'none', padding: '14px 24px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
                <strong style={{ color: colors.accent }}>Requires 30 days</strong> as a Free Member before applying
              </span>
            </div>

            {/* CTAs */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '0 0 20px 20px', border: '1px solid rgba(255,255,255,0.07)', borderTop: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={onApplyPaid} style={{
                width: '100%', padding: '13px', background: colors.accent,
                color: colors.primary, border: 'none', borderRadius: '50px',
                fontSize: '13px', fontWeight: '800', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}>
                Apply for Paid Membership
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button onClick={onApplyFree} style={{
                width: '100%', padding: '11px', background: 'transparent',
                color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Start with Free Membership
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


// ─── Still Need Help CTA ──────────────────────────────────────────────────────
function NeedHelpCTA({ onContact }) {
  const [hov, setHov] = useState(null);
  return (
    <section className="cta-section" style={{ background: colors.primary, padding: '80px 56px', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(184,217,53,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(184,217,53,0.025) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        {/* Eyebrow */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{
            backgroundColor: 'rgba(184,217,53,0.1)', border: '1px solid rgba(184,217,53,0.2)',
            borderRadius: '50px', padding: '10px 20px',
            fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
            letterSpacing: '2px', fontFamily: "'Inter', sans-serif", color: colors.accent,
            display: 'inline-flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accent, display: 'inline-block', flexShrink: 0 }} />
            Get in touch
          </span>
        </div>

        <h2 className="cta-h2" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: '300',
          color: colors.white, marginBottom: '16px', letterSpacing: '-0.3px', lineHeight: 1.15,
        }}>
          Still have a question?{' '}
          <span style={{ fontWeight: '600', color: colors.accent }}>Our team is here.</span>
        </h2>

        <p className="cta-sub" style={{
          fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85,
          maxWidth: '440px', margin: '0 auto 48px',
          fontFamily: "'Inter', sans-serif", fontWeight: '300',
        }}>
          Reach out directly. We respond to every enquiry within one business day — no automated replies.
        </p>

        <div className="cta-buttons" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onMouseEnter={() => setHov(0)} onMouseLeave={() => setHov(null)}
            className="cta-btn"
            onClick={onContact}
            style={{
              background: hov === 0 ? '#a5c42e' : colors.accent,
              color: colors.primary, border: 'none', borderRadius: '50px',
              padding: '15px 36px', fontSize: '14px', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(184,217,53,0.3)',
            }}>
            Contact Our Team →
          </button>
          <button
            onMouseEnter={() => setHov(1)} onMouseLeave={() => setHov(null)}
            className="cta-btn"
            onClick={onContact}
            style={{
              background: hov === 1 ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: colors.white, border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '50px',
              padding: '15px 36px', fontSize: '14px', fontWeight: '500', cursor: 'pointer',
            }}>
            Book a Discovery Call
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function FAQPage() {
  usePageMeta({ title: "FAQ", description: "Frequently asked questions about BRIDGE PBC membership, services, and Ghana investment." });
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('about');
  const [searchQuery, setSearchQuery] = useState('');

  // When search clears, go back to about
  useEffect(() => {
    if (!searchQuery) setActiveCategory('about');
  }, [searchQuery]);

  const goContact = () => navigate('/contact');
  const goMembership = () => navigate('/membership');
  const goLogin = () => navigate('/login');

  return (
    <Layout>
      <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh' }}>
        <FAQStyles />
        <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {!searchQuery && <ActionRow />}
        {!searchQuery && <TopicGrid activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
        <FAQBody activeCategory={activeCategory} setActiveCategory={setActiveCategory} searchQuery={searchQuery} />
        <MembershipTeaser onApplyPaid={goMembership} onApplyFree={goLogin} />
        <NeedHelpCTA onContact={goContact} />
      </div>
    </Layout>
  );
}
