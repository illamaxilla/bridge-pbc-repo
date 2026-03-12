import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import {
  ArrowUpRight,
  ChevronRight,
  BarChart3,
  ShieldCheck,
  Search,
  Layers,
  TrendingUp,
  Target,
  Microscope,
  GitBranch,
  Award,
  BookOpen,
  Users,
  Globe,
  CheckCircle,
  AlertTriangle,
  Zap,
  Lock,
  Eye,
  FileText,
  Database,
  XCircle,
  Check,
  X,
  Minus,
} from "lucide-react";

import { colors, layout } from "@/lib/theme";
const C = {
  ...colors,
  teal: colors.ctaGreen,
  accentBg: "#EBF5B0",
  bg: colors.background,
  muted: "#6B7280",
  mutedDark: "#4B5563",
};
const MAX = layout.maxWidth;
const PAD = "80px";

// ─── Data ─────────────────────────────────────────────────

const process = [
  {
    num: "01",
    icon: Search,
    label: "Landscape Scan",
    title: "We begin with the citizen, not the capital",
    body: "Every sector analysis starts with a single question: what does a Ghanaian household, business owner, or community member stand to gain? We map unmet demand, underserved markets, and ready conditions — grounded in government data, field research, and primary sources.",
    outputs: ["Root cause mapping", "Pain point quantification", "Stakeholder ecosystem audit"],
    highlight: "Starting with the citizen ensures every venture has a real beneficiary — not just a financial thesis.",
  },
  {
    num: "02",
    icon: Layers,
    label: "Opportunity Structuring",
    title: "Gaps become opportunity architectures",
    body: "Raw potential is translated into structured opportunity sets — categorised by sector, sub-sector, and intervention type. Each opportunity is defined by its market size, addressability, and readiness for capital deployment, making it directly actionable.",
    outputs: ["Opportunity taxonomy", "Market sizing", "Intervention typology"],
    highlight:
      "Structuring opportunities this way makes them directly comparable across sectors — enabling portfolio-level thinking from day one.",
  },
  {
    num: "03",
    icon: Microscope,
    label: "Venture Design",
    title: "Abstract opportunities become concrete ventures",
    body: "Each opportunity is engineered into a venture concept — complete with a business model, revenue architecture, target customer, operating model, and go-to-market pathway. Analysis becomes something a founding team can pick up and run with.",
    outputs: ["Business model canvas", "Revenue architecture", "Operating model outline"],
    highlight:
      "Every venture is designed to be handed directly to a founding team, investor, or government partner — ready to act on.",
  },
  {
    num: "04",
    icon: BarChart3,
    label: "BRIDGE Impact Score™",
    title: "Every venture is scored across four dimensions",
    body: "Our proprietary scoring methodology has been applied across 174+ ventures in 12 sectors. Four weighted dimensions. Objective, reproducible, and cross-sector comparable — producing a single composite score that enables direct ranking across the full portfolio.",
    outputs: ["Scored venture profiles", "Cross-sector rankings", "Priority tiers (I / II / III)"],
    highlight:
      "Core differentiator — the BRIDGE Impact Score™ is the only venture-level scoring system built specifically for the Ghanaian market.",
  },
  {
    num: "05",
    icon: GitBranch,
    label: "Portfolio Synthesis",
    title: "Individual ventures become an integrated portfolio",
    body: "Ventures don't exist in isolation. We map cross-sector dependencies, sequencing logic, and compounding effects — identifying which ventures unlock others, and how capital deployment should be staged to generate the greatest integrated impact.",
    outputs: ["Cross-sector dependency map", "Deployment sequencing", "Capital staging logic"],
    highlight:
      "The portfolio view reveals which investments create the most leverage — unlocking multiple sectors with a single deployment.",
  },
  {
    num: "06",
    icon: TrendingUp,
    label: "Ongoing Intelligence",
    title: "The analysis is continuous and progressive.",
    body: "Ghana's landscape moves fast. Policy shifts, budget reallocations, and market entries all change the calculus. BRIDGE analysts maintain live sector models — scores are updated, ventures are revised, and subscribers see every change as it happens.",
    outputs: ["Quarterly score updates", "Policy impact assessments", "Venture status tracking"],
    highlight: "Live intelligence means the BRIDGE portfolio reflects Ghana's real conditions — not last year's data.",
  },
];

const scoreDimensions = [
  {
    label: "Peace & Prosperity Alignment",
    weight: "30%",
    desc: "Does this venture directly improve the dignity, security, or wellbeing of Ghanaian citizens, households, or communities?",
    criteria: ["Direct citizen benefit", "Community multiplier", "Social stability contribution"],
    color: C.primary,
  },
  {
    label: "Strategic Fit",
    weight: "25%",
    desc: "How well does the venture align with BRIDGE's sector priorities, government policy, and the 12-sector portfolio architecture?",
    criteria: ["Sector priority alignment", "Policy congruence", "Portfolio complementarity"],
    color: C.teal,
  },
  {
    label: "Feasibility & Execution",
    weight: "25%",
    desc: "Can this actually be built? We assess regulatory environment, talent availability, infrastructure readiness, and operational complexity.",
    criteria: ["Regulatory pathway", "Talent & infrastructure", "Execution complexity"],
    color: C.primary,
  },
  {
    label: "Scalability & Sustainability",
    weight: "20%",
    desc: "Is this a one-time project or a platform? We assess market depth, replication potential, and long-run financial sustainability.",
    criteria: ["Market depth", "Replication logic", "Financial sustainability"],
    color: C.teal,
  },
];

const whyItems = [
  {
    icon: Globe,
    title: "Ghana's opportunity runs deeper than conventional analysis shows",
    body: "Most market analysis of Ghana is written for passive observers using generic frameworks. BRIDGE goes further — surfacing the venture-level intelligence that practitioners actually need to build, invest, and deploy with confidence.",
  },
  {
    icon: Target,
    title: "Precision turns capital into compounding impact",
    body: "Capital is available. What multiplies its effect is direction — structured, vetted, implementation-ready opportunities that connect resources to the right moment. BRIDGE provides the precision layer between intent and impact.",
  },
  {
    icon: Award,
    title: "Practitioners need practitioner-grade intelligence",
    body: "A founder building an agri-fintech platform needs different information than a sovereign wealth fund evaluating Ghana's macroeconomic trajectory. BRIDGE is built for the former — specific, actionable, implementable.",
  },
  {
    icon: ShieldCheck,
    title: "Rigour is the product",
    body: "We apply PRECEDE-PROCEED public health methodology, Fortune 500-grade root cause analysis, and competitive landscape mapping to development problems. The methodology is the differentiator — not the network, the brand, or the relationships.",
  },
];

// GIPC complementary data — categorized
const compCategories = ["All", "Coverage", "Investment Intelligence", "Venture Detail", "Deployment", "Ongoing"];
const compRows = [
  {
    category: "Coverage",
    dimension: "Sector Coverage",
    gipc: "All 12 sectors — official government profiles",
    bridge: "All 12 sectors — venture-level opportunity maps",
  },
  {
    category: "Coverage",
    dimension: "Regulatory Environment",
    gipc: "Authoritative source on laws, licensing, compliance",
    bridge: "Incorporates GIPC regulatory data as the compliance foundation",
  },
  {
    category: "Coverage",
    dimension: "FDI Incentives & Policy",
    gipc: "Official incentive frameworks, tax holidays, zones",
    bridge: "References GIPC incentive data to assess venture viability",
  },
  {
    category: "Investment Intelligence",
    dimension: "Investment Scoring",
    gipc: "Macro-level sector attractiveness signals",
    bridge: "Venture-level BRIDGE Impact Score™ (0–100, four dimensions)",
  },
  {
    category: "Investment Intelligence",
    dimension: "Priority Tier Ranking",
    gipc: "Country-level investment climate rating",
    bridge: "Tier I / II / III framework per venture, cross-sector comparable",
  },
  {
    category: "Investment Intelligence",
    dimension: "Risk Assessment",
    gipc: "Macroeconomic and political risk signals",
    bridge: "Execution, market, and capital risk per venture",
  },
  {
    category: "Venture Detail",
    dimension: "Venture-level Analysis",
    gipc: "Sector aggregates and macro indicators",
    bridge: "Business model, revenue architecture, go-to-market per venture",
  },
  {
    category: "Venture Detail",
    dimension: "Business Model Detail",
    gipc: "Not in scope — macro focus",
    bridge: "Full OpEx, CapEx, revenue model, and customer architecture",
  },
  {
    category: "Venture Detail",
    dimension: "Capital Range Estimates",
    gipc: "FDI volume and flow data",
    bridge: "Tier-level capital sizing per venture opportunity",
  },
  {
    category: "Deployment",
    dimension: "Implementation Roadmap",
    gipc: "Policy and regulatory pathway guidance",
    bridge: "Stage-by-stage deployment plan for each venture",
  },
  {
    category: "Deployment",
    dimension: "Cross-sector Integration",
    gipc: "Individual sector profiles",
    bridge: "12-sector dependency mapping and sequencing logic",
  },
  {
    category: "Deployment",
    dimension: "Practitioner Ready",
    gipc: "Decision-maker and policy-level audience",
    bridge: "Designed for founding teams, fund managers, and operators",
  },
  {
    category: "Ongoing",
    dimension: "Update Frequency",
    gipc: "Annual publication cycle",
    bridge: "Quarterly score updates with live policy tracking",
  },
  {
    category: "Ongoing",
    dimension: "Live Policy Tracking",
    gipc: "Official policy announcements and updates",
    bridge: "Integrates GIPC policy updates into live venture scoring",
  },
];

// ─── Sub-components ────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white border border-[#DEDEDE] rounded-[50px] px-[18px] py-2 mb-[22px]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#B8D935] shrink-0" />
      <span className="font-['Inter',sans-serif] text-[11px] font-bold text-[#1B4D3E] uppercase tracking-[2px]">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="font-['DM_Sans',sans-serif] text-[40px] font-light text-[#1B4D3E] leading-[1.1] tracking-[-0.8px] mt-0 mb-[18px] mx-0">
      {children}
    </h2>
  );
}

function ProcessStep({ step, idx, active, onClick, last }) {
  return (
    <div className={`flex gap-5 relative ${last ? "pb-0" : "pb-1"}`}>
      {!last && (
        <div
          className="absolute left-[23px] top-[52px] w-0.5 bottom-0 transition-colors duration-300"
          style={{ background: active ? C.accent : C.line }}
        />
      )}
      <button
        onClick={onClick}
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-200 z-[1]"
        style={{
          border: `2px solid ${active ? C.accent : C.line}`,
          background: active ? C.accent : C.white,
        }}
      >
        <span
          className="text-xs font-extrabold font-['Inter',sans-serif]"
          style={{ color: active ? C.primary : C.muted }}
        >
          {step.num}
        </span>
      </button>
      <div className="pt-2.5 flex-1 pb-2.5">
        <div
          className="text-sm font-bold font-['Inter',sans-serif] tracking-[0.4px] uppercase transition-colors duration-200"
          style={{ color: active ? C.primary : C.muted }}
        >
          {step.label}
        </div>
        {active && (
          <div className="text-[13px] text-[#6B7280] font-['Inter',sans-serif] leading-[1.5] mt-1">
            {step.title}
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreDimension({ dim, idx, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className="px-5 py-[18px] rounded-[10px] cursor-pointer transition-all duration-200 mb-2"
      style={{
        border: `1px solid ${active ? C.accent : C.line}`,
        background: active ? C.accentBg : C.white,
      }}
    >
      <div
        className={`flex items-center justify-between ${active ? "mb-2.5" : "mb-0"}`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
            style={{ background: active ? C.accent : C.bg }}
          >
            <span
              className="text-[11px] font-extrabold font-['Inter',sans-serif]"
              style={{ color: active ? C.primary : C.muted }}
            >
              {dim.weight}
            </span>
          </div>
          <span
            className="text-[13px] font-bold font-['Inter',sans-serif]"
            style={{ color: active ? C.primary : C.mutedDark }}
          >
            {dim.label}
          </span>
        </div>
        <ChevronRight
          size={14}
          color={active ? C.primary : C.muted}
          className={`transition-transform duration-200 ${active ? "rotate-90" : "rotate-0"}`}
        />
      </div>
      {active && (
        <div>
          <p className="mx-0 mt-0 mb-3 text-[13px] text-[#6B7280] font-['Inter',sans-serif] leading-[1.65]">
            {dim.desc}
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {dim.criteria.map((c) => (
              <span
                key={c}
                className="text-[11px] font-semibold px-2.5 py-[3px] rounded-[20px] bg-white border border-[#DEDEDE] text-[#1B4D3E] font-['Inter',sans-serif]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CompCell({ val }) {
  if (val === "y")
    return (
      <div className="flex justify-center">
        <div className="w-[26px] h-[26px] rounded-full bg-[#EBF5B0] flex items-center justify-center">
          <Check size={13} color={C.primary} strokeWidth={2.5} />
        </div>
      </div>
    );
  if (val === "p")
    return (
      <div className="flex justify-center">
        <div className="w-[26px] h-[26px] rounded-full bg-[rgba(202,138,4,0.1)] flex items-center justify-center">
          <Minus size={13} color="#CA8A04" strokeWidth={2.5} />
        </div>
      </div>
    );
  return (
    <div className="flex justify-center">
      <div className="w-[26px] h-[26px] rounded-full bg-[rgba(220,38,38,0.07)] flex items-center justify-center">
        <X size={13} color="#DC2626" strokeWidth={2.5} />
      </div>
    </div>
  );
}

function WhyInsightSection({ mobile }) {
  const [offset, setOffset] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);
  const scrollRef = React.useRef(null);

  // Desktop config
  const VISIBLE = 3;
  const total = whyItems.length;
  const pages = total - VISIBLE + 1;
  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(pages - 1, o + 1));
  const CARD_H = 138,
    GAP = 12;
  const CARDS_H = VISIBLE * CARD_H + (VISIBLE - 1) * GAP;

  // Mobile: track active card via scroll
  const handleMobileScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    setMobileIdx(Math.round(scrollLeft / offsetWidth));
  };
  const scrollToCard = (i) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: "smooth" });
  };

  if (mobile) {
    return (
      <section className="pt-14 pb-12 bg-white overflow-hidden">
        {/* Text block */}
        <div className="px-5 mb-8">
          <SectionLabel>Why Insight</SectionLabel>
          <h2 className="font-['DM_Sans',sans-serif] text-[32px] font-light text-[#1B4D3E] leading-[1.15] tracking-[-0.5px] mt-0 mb-4 mx-0">
            Ghana needs <strong className="font-bold">intelligence built for builders.</strong>
          </h2>
          <p className="mt-0 mb-3.5 mx-0 text-[15px] text-[#6B7280] leading-[1.75] font-['Inter',sans-serif]">
            Most development intelligence is written for conference rooms in London and Washington — macro by design,
            generic by necessity.
          </p>
          <p className="mt-0 mb-6 mx-0 text-[15px] text-[#191919] leading-[1.75] font-['Inter',sans-serif]">
            BRIDGE produces practitioner-grade intelligence:{" "}
            <strong className="font-bold text-[#1B4D3E]">
              here is what to build, here is why, here is how.
            </strong>
          </p>
          <a
            href="/resources"
            className="inline-flex items-center gap-2 bg-[#B8D935] text-[#1B4D3E] no-underline px-[22px] py-3 rounded-[50px] text-sm font-bold font-['Inter',sans-serif]"
          >
            Explore the Research <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Horizontal snap carousel */}
        <div
          ref={scrollRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none pl-5 gap-3 box-border"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`.why-scroll::-webkit-scrollbar{display:none}`}</style>
          {whyItems.map((item, i) => (
            <div
              key={i}
              className="min-w-[calc(100vw-64px)] max-w-[calc(100vw-64px)] snap-start shrink-0 p-6 bg-[#F3F5F2] rounded-[14px] border border-[#DEDEDE]"
            >
              <div className="text-[15px] font-bold text-[#1B4D3E] font-['DM_Sans',sans-serif] mb-2.5 leading-[1.3]">
                {item.title}
              </div>
              <p className="m-0 text-sm text-[#6B7280] leading-[1.7] font-['Inter',sans-serif]">
                {item.body}
              </p>
            </div>
          ))}
          {/* trailing spacer */}
          <div className="min-w-2 shrink-0" />
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-5">
          {whyItems.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className="h-2 rounded border-none cursor-pointer p-0 transition-all duration-300 ease-in-out"
              style={{
                width: i === mobileIdx ? "24px" : "8px",
                background: i === mobileIdx ? C.accent : C.line,
              }}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white" style={{ padding: `80px ${PAD}` }}>
      <div className="mx-auto" style={{ maxWidth: MAX }}>
        <div className="grid grid-cols-2 gap-14 items-center">
          <div className="flex flex-col items-start">
            <SectionLabel>Why Insight</SectionLabel>
            <SectionHeading>
              Ghana needs <strong className="font-bold">intelligence built for builders.</strong>
            </SectionHeading>
            <p className="mt-0 mb-5 mx-0 text-base text-[#6B7280] leading-[1.75] font-['Inter',sans-serif]">
              Most development intelligence is written for conference rooms in London and Washington. It's macro by
              design, generic by necessity, and operationally useless for anyone who wants to actually build something
              in Ghana.
            </p>
            <p className="mt-0 mb-8 mx-0 text-base text-[#191919] leading-[1.75] font-['Inter',sans-serif]">
              BRIDGE exists to change that. We produce practitioner-grade intelligence — the kind you can hand to a
              founding team, a fund manager, or a government partner and say:{" "}
              <strong className="font-bold text-[#1B4D3E]">
                here is what to build, here is why, here is how.
              </strong>
            </p>
            <a
              href="/resources"
              className="inline-flex items-center gap-2 bg-[#B8D935] text-[#1B4D3E] no-underline py-[13px] px-6 rounded-[50px] text-sm font-bold font-['Inter',sans-serif] self-start"
            >
              Explore the Research <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden" style={{ height: `${CARDS_H}px` }}>
              <div
                className="flex flex-col transition-transform duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  gap: `${GAP}px`,
                  transform: `translateY(-${offset * (CARD_H + GAP)}px)`,
                }}
              >
                {whyItems.map((item, i) => (
                  <div
                    key={i}
                    className="shrink-0 px-6 py-[22px] bg-[#F3F5F2] rounded-xl border border-[#DEDEDE] flex flex-col justify-center"
                    style={{ height: `${CARD_H}px` }}
                  >
                    <div className="text-sm font-bold text-[#1B4D3E] font-['DM_Sans',sans-serif] mb-2 leading-[1.3]">
                      {item.title}
                    </div>
                    <p className="m-0 text-[13px] text-[#6B7280] leading-[1.65] font-['Inter',sans-serif]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={prev}
                disabled={offset === 0}
                className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center transition-all duration-200"
                style={{
                  border: `1px solid ${offset === 0 ? C.line : C.primary}`,
                  cursor: offset === 0 ? "default" : "pointer",
                  opacity: offset === 0 ? 0.35 : 1,
                }}
              >
                <ChevronRight size={14} color={C.primary} className="rotate-180" />
              </button>
              <div className="flex gap-2 items-center">
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setOffset(i)}
                    className="h-2 rounded border-none cursor-pointer transition-all duration-300 ease-in-out p-0"
                    style={{
                      width: i === offset ? "24px" : "8px",
                      background: i === offset ? C.accent : C.line,
                    }}
                  />
                ))}
              </div>
              <button
                onClick={next}
                disabled={offset === pages - 1}
                className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center transition-all duration-200"
                style={{
                  border: `1px solid ${offset === pages - 1 ? C.line : C.primary}`,
                  cursor: offset === pages - 1 ? "default" : "pointer",
                  opacity: offset === pages - 1 ? 0.35 : 1,
                }}
              >
                <ChevronRight size={14} color={C.primary} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Export ───────────────────────────────────────────

// ============================================================================


export default function InsightsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeDim, setActiveDim] = useState(0);
  const [activeComp, setActiveComp] = useState("All");
  const [mobile, setMobile] = useState(false);
  const [openPanel, setOpenPanel] = useState(null);
  const [showAllRows, setShowAllRows] = useState(false);
  const togglePanel = (key) => setOpenPanel((p) => (p === key ? null : key));

  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  return (
    <Layout>
    <div className="bg-[#F3F5F2] font-['DM_Sans',sans-serif]">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="bg-[#1B4D3E]"
        style={{ padding: mobile ? "60px 20px 52px" : `80px ${PAD} 80px` }}
      >
        <div className="mx-auto" style={{ maxWidth: MAX }}>
          <div className="inline-flex items-center gap-2 bg-transparent border border-[#B8D935] rounded-[50px] px-[18px] py-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8D935] shrink-0" />
            <span className="font-['Inter',sans-serif] text-[11px] font-bold text-[#B8D935] uppercase tracking-[2px]">
              BRIDGE Insights
            </span>
          </div>
          <div
            className="grid items-center"
            style={{
              gridTemplateColumns: mobile ? "1fr" : "2fr 1fr",
              gap: "56px",
            }}
          >
            <div>
              <h1
                className="font-['DM_Sans',sans-serif] font-light text-white mt-0 mb-[18px] mx-0"
                style={{
                  fontSize: mobile ? "36px" : "58px",
                  lineHeight: 1.15,
                  letterSpacing: mobile ? "-0.8px" : "-1.5px",
                }}
              >
                Empirical analysis
                <br />
                Structured methodology
                <br />
                <strong className="font-bold">Investable outcomes.</strong>
              </h1>
              <p
                className="mt-0 mb-7 mx-0 text-[rgba(255,255,255,0.6)] leading-[1.75] font-['Inter',sans-serif] max-w-[680px]"
                style={{ fontSize: mobile ? "15px" : "17px" }}
              >
                Rigorous sector analysis, venture scoring, and policy intelligence — the research infrastructure behind
                every BRIDGE deployment decision.
              </p>
              <a
                href="/login"
                className="inline-flex items-center gap-2 bg-[#B8D935] text-[#1B4D3E] no-underline rounded-[50px] text-sm font-bold font-['Inter',sans-serif] box-border"
                style={{
                  padding: mobile ? "12px 22px" : "13px 24px",
                  width: mobile ? "100%" : "auto",
                  justifyContent: mobile ? "center" : "flex-start",
                }}
              >
                Access Dashboard <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY INSIGHT ───────────────────────────────────── */}
      <WhyInsightSection mobile={mobile} />

      {/* ── THE PROCESS ───────────────────────────────────── */}
      <section
        id="process"
        className="bg-[#F3F5F2]"
        style={{ padding: mobile ? "56px 0" : `80px ${PAD}` }}
      >
        <div style={{ maxWidth: MAX, margin: mobile ? "0" : "0 auto" }}>
          <div
            className="text-center"
            style={{ marginBottom: mobile ? "32px" : "52px", padding: mobile ? "0 20px" : 0 }}
          >
            <SectionLabel>The Process</SectionLabel>
            <SectionHeading>
              Six stages. One <strong className="font-bold">investment-grade</strong> output.
            </SectionHeading>
            <p
              className="mx-auto max-w-[680px] text-[#6B7280] leading-[1.7] font-['Inter',sans-serif] mt-0 mb-0"
              style={{ fontSize: mobile ? "15px" : "16px" }}
            >
              From citizen-level gap identification to a fully scored, portfolio-integrated venture — every BRIDGE
              analysis follows the same rigorous six-stage methodology.
            </p>
          </div>

          {mobile ? (
            /* MOBILE PROCESS: scrollable pill row + detail card */
            <div>
              {/* Step selector — horizontal scroll */}
              <div
                className="overflow-x-auto pl-5 pb-1 mb-5"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex gap-2 w-max">
                  {process.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className="flex items-center gap-2 px-4 py-[9px] rounded-[50px] border-none cursor-pointer transition-all duration-200 shrink-0"
                      style={{
                        background: activeStep === idx ? C.primary : C.white,
                        boxShadow: activeStep === idx ? "none" : `0 0 0 1px ${C.line}`,
                      }}
                    >
                      <span
                        className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0"
                        style={{ background: activeStep === idx ? C.accent : C.bg }}
                      >
                        <span
                          className="text-[10px] font-extrabold font-['Inter',sans-serif]"
                          style={{ color: activeStep === idx ? C.primary : C.muted }}
                        >
                          {step.num}
                        </span>
                      </span>
                      <span
                        className="text-xs font-bold font-['Inter',sans-serif] whitespace-nowrap"
                        style={{ color: activeStep === idx ? C.white : C.muted }}
                      >
                        {step.label}
                      </span>
                    </button>
                  ))}
                  <div className="min-w-3" />
                </div>
              </div>

              {/* Detail card */}
              <div className="mx-5 bg-white rounded-2xl border border-[#DEDEDE] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#EBF5B0] flex items-center justify-center shrink-0">
                    {React.createElement(process[activeStep].icon, { size: 20, color: C.primary })}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#6B7280] font-['Inter',sans-serif] tracking-[0.8px] uppercase">
                      Stage {process[activeStep].num}
                    </div>
                    <div className="text-sm font-bold text-[#1B4D3E] font-['DM_Sans',sans-serif]">
                      {process[activeStep].label}
                    </div>
                  </div>
                </div>
                <h3 className="mt-0 mb-2.5 mx-0 text-lg font-bold text-[#191919] font-['DM_Sans',sans-serif] leading-[1.3]">
                  {process[activeStep].title}
                </h3>
                <p className="mt-0 mb-[18px] mx-0 text-sm text-[#6B7280] leading-[1.75] font-['Inter',sans-serif]">
                  {process[activeStep].body}
                </p>
                <div className="border-t border-[#DEDEDE] pt-4 mb-4">
                  <div className="text-[11px] font-bold text-[#6B7280] tracking-[0.8px] uppercase font-['Inter',sans-serif] mb-2.5">
                    Outputs
                  </div>
                  <div className="flex flex-col gap-[7px]">
                    {process[activeStep].outputs.map((o) => (
                      <div key={o} className="flex items-center gap-[9px]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B8D935] shrink-0" />
                        <span className="text-[13px] text-[#4B5563] font-['Inter',sans-serif]">
                          {o}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-[14px_16px] bg-[#EBF5B0] rounded-lg border border-[rgba(184,217,53,0.3)]">
                  <span className="text-xs font-bold text-[#1B4D3E] font-['Inter',sans-serif] leading-[1.6]">
                    {process[activeStep].highlight}
                  </span>
                </div>
              </div>

              {/* Mobile step dots */}
              <div className="flex justify-center gap-2 mt-5">
                {process.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="h-2 rounded border-none cursor-pointer p-0 transition-all duration-300 ease-in-out"
                    style={{
                      width: i === activeStep ? "24px" : "8px",
                      background: i === activeStep ? C.accent : C.line,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* DESKTOP PROCESS: two-column */
            <div className="grid items-stretch" style={{ gridTemplateColumns: "480px 1fr", gap: "56px" }}>
              <div className="flex flex-col gap-0 justify-between h-full">
                {process.map((step, idx) => (
                  <ProcessStep
                    key={idx}
                    step={step}
                    idx={idx}
                    active={activeStep === idx}
                    onClick={() => setActiveStep(idx)}
                    last={idx === process.length - 1}
                  />
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-[#DEDEDE] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between min-h-[480px]">
                <div>
                  <div className="flex items-center gap-3 mb-[18px]">
                    <div className="w-11 h-11 rounded-xl bg-[#EBF5B0] flex items-center justify-center shrink-0">
                      {React.createElement(process[activeStep].icon, { size: 20, color: C.primary })}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-[#6B7280] font-['Inter',sans-serif] tracking-[0.8px] uppercase">
                        Stage {process[activeStep].num}
                      </div>
                      <div className="text-sm font-bold text-[#1B4D3E] font-['DM_Sans',sans-serif]">
                        {process[activeStep].label}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-0 mb-3 mx-0 text-xl font-bold text-[#191919] font-['DM_Sans',sans-serif] leading-[1.3]">
                    {process[activeStep].title}
                  </h3>
                  <p className="mt-0 mb-5 mx-0 text-sm text-[#6B7280] leading-[1.75] font-['Inter',sans-serif]">
                    {process[activeStep].body}
                  </p>
                  <div className="border-t border-[#DEDEDE] pt-[18px]">
                    <div className="text-[11px] font-bold text-[#6B7280] tracking-[0.8px] uppercase font-['Inter',sans-serif] mb-2.5">
                      Outputs
                    </div>
                    <div className="flex flex-col gap-[7px]">
                      {process[activeStep].outputs.map((o) => (
                        <div key={o} className="flex items-center gap-[9px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B8D935] shrink-0" />
                          <span className="text-[13px] text-[#4B5563] font-['Inter',sans-serif]">
                            {o}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5 p-[14px_16px] bg-[#EBF5B0] rounded-lg border border-[rgba(184,217,53,0.3)]">
                  <span className="text-xs font-bold text-[#1B4D3E] font-['Inter',sans-serif] leading-[1.6]">
                    {process[activeStep].highlight}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── IMPACT SCORE ──────────────────────────────────── */}
      <section
        className="bg-white"
        style={{ padding: mobile ? "56px 20px" : `80px ${PAD}` }}
      >
        <div className="mx-auto" style={{ maxWidth: MAX }}>
          <div className="text-center" style={{ marginBottom: mobile ? "32px" : "52px" }}>
            <SectionLabel>BRIDGE Impact Score™</SectionLabel>
            <SectionHeading>
              A framework built for a <strong className="font-bold">complex ecosystem.</strong>
            </SectionHeading>
            <p
              className="mx-auto max-w-[740px] text-[#6B7280] leading-[1.7] font-['Inter',sans-serif] mt-0 mb-0"
              style={{ fontSize: mobile ? "15px" : "16px" }}
            >
              Most frameworks collapse under complexity. The BRIDGE Impact Score™ was built for it — four weighted
              dimensions evaluated across 174+ ventures in 12 sectors, producing a single composite score that is
              objective, reproducible, and cross-sector comparable.
            </p>
          </div>

          {mobile ? (
            /* MOBILE IMPACT SCORE: fully stacked */
            <div className="flex flex-col gap-4">
              {/* Dimensions */}
              <div>
                <p className="mt-0 mb-2.5 mx-0 text-xs font-bold text-[#6B7280] font-['Inter',sans-serif] uppercase tracking-[0.8px]">
                  Tap a dimension to expand
                </p>
                {scoreDimensions.map((dim, i) => (
                  <ScoreDimension key={i} dim={dim} idx={i} active={activeDim === i} onClick={() => setActiveDim(i)} />
                ))}
              </div>

              {/* Score tiers — collapsible */}
              <div className="bg-[#F3F5F2] rounded-xl border border-[#DEDEDE] overflow-hidden">
                <button
                  onClick={() => togglePanel("tiers")}
                  className="w-full px-5 py-4 flex items-center justify-between bg-transparent border-none cursor-pointer"
                >
                  <span className="text-[13px] font-bold text-[#1B4D3E] font-['DM_Sans',sans-serif]">
                    Score Tiers
                  </span>
                  <ChevronRight
                    size={16}
                    color={C.muted}
                    className={`transition-transform duration-200 ${openPanel === "tiers" ? "rotate-90" : "rotate-0"}`}
                  />
                </button>
                {openPanel === "tiers" && (
                  <div className="px-5 pb-5 pt-0 flex flex-col gap-3.5">
                    {[
                      ["88–100", "Tier I Priority", "Top priority for capital deployment"],
                      ["75–87", "Tier II Medium-term", "Strong opportunity, secondary sequencing"],
                      ["Below 75", "Tier III Long-term", "Valid opportunity, longer horizon"],
                    ].map(([range, tier, desc]) => (
                      <div
                        key={range}
                        className="grid items-start"
                        style={{ gridTemplateColumns: "88px 1fr", gap: "12px" }}
                      >
                        <span className="text-[13px] font-extrabold text-[#1B4D3E] font-['Inter',sans-serif] pt-px">
                          {range}
                        </span>
                        <div>
                          <div className="text-[13px] font-bold text-[#191919] font-['Inter',sans-serif] mb-0.5">
                            {tier}
                          </div>
                          <div className="text-xs text-[#6B7280] font-['Inter',sans-serif]">{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Weight distribution — collapsible */}
              <div className="bg-[#F3F5F2] rounded-xl border border-[#DEDEDE] overflow-hidden">
                <button
                  onClick={() => togglePanel("weights")}
                  className="w-full px-5 py-4 flex items-center justify-between bg-transparent border-none cursor-pointer"
                >
                  <span className="text-[13px] font-bold text-[#1B4D3E] font-['DM_Sans',sans-serif]">
                    Score Weight Distribution
                  </span>
                  <ChevronRight
                    size={16}
                    color={C.muted}
                    className={`transition-transform duration-200 ${openPanel === "weights" ? "rotate-90" : "rotate-0"}`}
                  />
                </button>
                {openPanel === "weights" && (
                  <div className="px-5 pb-5 pt-0">
                    {scoreDimensions.map((dim, i) => {
                      const pct = parseInt(dim.weight);
                      return (
                        <div key={i} className="mb-3">
                          <div className="flex justify-between mb-[5px]">
                            <span
                              className="text-xs font-semibold font-['Inter',sans-serif]"
                              style={{ color: activeDim === i ? C.primary : C.mutedDark }}
                            >
                              {dim.label}
                            </span>
                            <span
                              className="text-xs font-extrabold font-['Inter',sans-serif]"
                              style={{ color: activeDim === i ? C.primary : C.muted }}
                            >
                              {dim.weight}
                            </span>
                          </div>
                          <div className="h-2 bg-[#DEDEDE] rounded overflow-hidden">
                            <div
                              className="h-full rounded transition-colors duration-200"
                              style={{
                                width: `${pct * 3}%`,
                                background: activeDim === i ? C.accent : C.primary,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Portfolio breakdown — collapsible */}
              <div className="bg-[#1B4D3E] rounded-xl overflow-hidden">
                <button
                  onClick={() => togglePanel("portfolio")}
                  className="w-full px-5 py-4 flex items-center justify-between bg-transparent border-none cursor-pointer"
                >
                  <div>
                    <div className="text-[10px] font-bold text-[rgba(255,255,255,0.4)] font-['Inter',sans-serif] tracking-[1.5px] uppercase mb-0.5">
                      Portfolio Breakdown
                    </div>
                    <div className="text-xs text-[rgba(255,255,255,0.5)] font-['Inter',sans-serif]">
                      174+ ventures · 12 sectors
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    color="rgba(255,255,255,0.4)"
                    className={`transition-transform duration-200 shrink-0 ${openPanel === "portfolio" ? "rotate-90" : "rotate-0"}`}
                  />
                </button>
                {openPanel === "portfolio" && (
                  <div className="px-5 pb-5 pt-0">
                    <div className="flex flex-col gap-3.5 mb-5">
                      {[
                        { count: "23", tier: "Tier I", label: "Priority", bar: 23 / 174, color: C.accent },
                        {
                          count: "81",
                          tier: "Tier II",
                          label: "Medium-term",
                          bar: 81 / 174,
                          color: "rgba(184,217,53,0.5)",
                        },
                        {
                          count: "70",
                          tier: "Tier III",
                          label: "Long-range",
                          bar: 70 / 174,
                          color: "rgba(255,255,255,0.2)",
                        },
                      ].map(({ count, tier, label, bar, color }) => (
                        <div
                          key={tier}
                          className="grid items-center"
                          style={{ gridTemplateColumns: "48px 1fr", gap: "14px" }}
                        >
                          <div className="text-lg font-extrabold text-[rgba(255,255,255,0.9)] font-['Inter',sans-serif] leading-none">
                            {count}
                          </div>
                          <div>
                            <span className="text-[11px] font-bold text-[rgba(255,255,255,0.6)] font-['Inter',sans-serif] block mb-[5px]">
                              {tier} · {label}
                            </span>
                            <div className="h-2 bg-[rgba(255,255,255,0.08)] rounded overflow-hidden">
                              <div
                                className="h-full rounded"
                                style={{ width: `${bar * 100}%`, background: color }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[rgba(255,255,255,0.1)] pt-3.5">
                      <div className="flex h-2.5 rounded-[6px] overflow-hidden gap-0.5 mb-2.5">
                        {[
                          { pct: 30, color: C.accent },
                          { pct: 25, color: "rgba(255,255,255,0.25)" },
                          { pct: 25, color: "rgba(184,217,53,0.5)" },
                          { pct: 20, color: "rgba(255,255,255,0.12)" },
                        ].map((s, i) => (
                          <div
                            key={i}
                            className="h-full rounded-[3px]"
                            style={{ width: `${s.pct}%`, background: s.color }}
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-2">
                        {[
                          ["P&P Alignment", "30%", C.accent],
                          ["Strategic Fit", "25%", "rgba(255,255,255,0.5)"],
                          ["Feasibility", "25%", "rgba(184,217,53,0.6)"],
                          ["Scalability", "20%", "rgba(255,255,255,0.3)"],
                        ].map(([l, w, c]) => (
                          <div key={l} className="flex items-center gap-[5px]">
                            <div
                              className="w-2 h-2 rounded-sm shrink-0"
                              style={{ background: c as string }}
                            />
                            <span className="text-[10px] font-semibold text-[rgba(255,255,255,0.6)] font-['Inter',sans-serif]">
                              {l} · {w}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* DESKTOP IMPACT SCORE: two-column */
            <div className="grid grid-cols-2 gap-14 items-stretch">
              <div className="flex flex-col justify-between">
                <div>
                  <p className="mt-0 mb-2.5 mx-0 text-[13px] font-bold text-[#6B7280] font-['Inter',sans-serif] uppercase tracking-[0.8px]">
                    Click a dimension to expand
                  </p>
                  {scoreDimensions.map((dim, i) => (
                    <ScoreDimension
                      key={i}
                      dim={dim}
                      idx={i}
                      active={activeDim === i}
                      onClick={() => setActiveDim(i)}
                    />
                  ))}
                </div>
                <div className="mt-5 p-[20px_24px] bg-[#F3F5F2] rounded-xl border border-[#DEDEDE]">
                  <div className="text-[11px] font-bold text-[#6B7280] tracking-[1.2px] uppercase font-['Inter',sans-serif] mb-4">
                    Score Tiers
                  </div>
                  <div className="flex flex-col gap-3.5">
                    {[
                      ["88–100", "Tier I Priority", "Top priority for capital deployment"],
                      ["75–87", "Tier II Medium-term", "Strong opportunity, secondary sequencing"],
                      ["Below 75", "Tier III Long-term", "Valid opportunity, longer horizon"],
                    ].map(([range, tier, desc]) => (
                      <div
                        key={range}
                        className="grid items-start"
                        style={{ gridTemplateColumns: "88px 1fr", gap: "16px" }}
                      >
                        <span className="text-[13px] font-extrabold text-[#1B4D3E] font-['Inter',sans-serif] pt-px">
                          {range}
                        </span>
                        <div>
                          <div className="text-[13px] font-bold text-[#191919] font-['Inter',sans-serif] mb-0.5">
                            {tier}
                          </div>
                          <div className="text-xs text-[#6B7280] font-['Inter',sans-serif]">{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 pt-[33px]">
                <div className="bg-[#F3F5F2] rounded-2xl border border-[#DEDEDE] p-7">
                  <div className="text-[13px] font-bold text-[#1B4D3E] font-['DM_Sans',sans-serif] mb-5">
                    Score Weight Distribution
                  </div>
                  {scoreDimensions.map((dim, i) => {
                    const pct = parseInt(dim.weight);
                    return (
                      <div key={i} className="mb-3.5">
                        <div className="flex justify-between mb-[5px]">
                          <span
                            className="text-xs font-semibold font-['Inter',sans-serif] transition-colors duration-200"
                            style={{ color: activeDim === i ? C.primary : C.mutedDark }}
                          >
                            {dim.label}
                          </span>
                          <span
                            className="text-xs font-extrabold font-['Inter',sans-serif]"
                            style={{ color: activeDim === i ? C.primary : C.muted }}
                          >
                            {dim.weight}
                          </span>
                        </div>
                        <div className="h-2 bg-[#DEDEDE] rounded overflow-hidden">
                          <div
                            className="h-full rounded transition-colors duration-200"
                            style={{
                              width: `${pct * 3}%`,
                              background: activeDim === i ? C.accent : C.primary,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex-1 bg-[#1B4D3E] rounded-xl p-[24px_28px] flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[rgba(255,255,255,0.4)] font-['Inter',sans-serif] tracking-[1.5px] uppercase mb-1">
                      Portfolio Breakdown
                    </div>
                    <div className="text-xs text-[rgba(255,255,255,0.35)] font-['Inter',sans-serif] mb-5">
                      174+ ventures scored across 12 sectors
                    </div>
                    <div className="flex flex-col gap-3.5">
                      {[
                        { count: "23", tier: "Tier I", label: "Priority", bar: 23 / 174, color: C.accent },
                        {
                          count: "81",
                          tier: "Tier II",
                          label: "Medium-term",
                          bar: 81 / 174,
                          color: "rgba(184,217,53,0.5)",
                        },
                        {
                          count: "70",
                          tier: "Tier III",
                          label: "Long-range",
                          bar: 70 / 174,
                          color: "rgba(255,255,255,0.2)",
                        },
                      ].map(({ count, tier, label, bar, color }) => (
                        <div
                          key={tier}
                          className="grid items-center"
                          style={{ gridTemplateColumns: "48px 1fr", gap: "16px" }}
                        >
                          <div className="text-lg font-extrabold text-[rgba(255,255,255,0.9)] font-['Inter',sans-serif] leading-none">
                            {count}
                          </div>
                          <div>
                            <div className="flex justify-between mb-[5px]">
                              <span className="text-[11px] font-bold text-[rgba(255,255,255,0.6)] font-['Inter',sans-serif]">
                                {tier} · {label}
                              </span>
                            </div>
                            <div className="h-2 bg-[rgba(255,255,255,0.08)] rounded overflow-hidden">
                              <div
                                className="h-full rounded"
                                style={{ width: `${bar * 100}%`, background: color }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-[rgba(255,255,255,0.1)] pt-4">
                    <div className="text-[10px] font-bold text-[rgba(255,255,255,0.4)] font-['Inter',sans-serif] tracking-[1.5px] uppercase mb-2.5">
                      Weight Distribution
                    </div>
                    <div className="flex h-2.5 rounded-[6px] overflow-hidden gap-0.5">
                      {[
                        { pct: 30, color: C.accent },
                        { pct: 25, color: "rgba(255,255,255,0.25)" },
                        { pct: 25, color: "rgba(184,217,53,0.5)" },
                        { pct: 20, color: "rgba(255,255,255,0.12)" },
                      ].map((s, i) => (
                        <div
                          key={i}
                          className="h-full rounded-[3px]"
                          style={{ width: `${s.pct}%`, background: s.color }}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-x-3.5 gap-y-2 mt-2.5">
                      {[
                        ["P&P Alignment", "30%", C.accent],
                        ["Strategic Fit", "25%", "rgba(255,255,255,0.5)"],
                        ["Feasibility", "25%", "rgba(184,217,53,0.6)"],
                        ["Scalability", "20%", "rgba(255,255,255,0.3)"],
                      ].map(([l, w, c]) => (
                        <div key={l} className="flex items-center gap-[5px]">
                          <div
                            className="w-2 h-2 rounded-sm shrink-0"
                            style={{ background: c as string }}
                          />
                          <span className="text-[10px] font-semibold text-[rgba(255,255,255,0.6)] font-['Inter',sans-serif]">
                            {l} · {w}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── BUILT ON GIPC ─────────────────────────────────── */}
      <section
        id="compare"
        className="bg-[#F3F5F2]"
        style={{ padding: mobile ? "56px 20px" : `80px ${PAD}` }}
      >
        <div className="mx-auto" style={{ maxWidth: MAX }}>
          {/* Header */}
          {mobile ? (
            <div className="mb-7">
              <SectionLabel>Built on GIPC</SectionLabel>
              <h2 className="font-['DM_Sans',sans-serif] text-[30px] font-light text-[#1B4D3E] leading-[1.15] tracking-[-0.5px] mt-0 mb-3.5 mx-0">
                GIPC provides the foundation.
                <br />
                <strong className="font-bold">BRIDGE builds on top.</strong>
              </h2>
              <p className="mt-0 mb-5 mx-0 text-sm text-[#6B7280] leading-[1.75] font-['Inter',sans-serif]">
                GIPC produces Ghana's authoritative investment climate profiles — the official macro layer every serious
                investor starts with. BRIDGE extends it to the venture level.
              </p>
              <div className="bg-[#1B4D3E] rounded-xl p-[18px_20px]">
                <div className="text-[11px] font-bold text-[rgba(255,255,255,0.45)] font-['Inter',sans-serif] tracking-[1.2px] uppercase mb-2">
                  Our Position
                </div>
                <p className="mt-0 mb-3 mx-0 text-[13px] text-white leading-[1.7] font-['Inter',sans-serif]">
                  BRIDGE incorporates GIPC sector profiles as the regulatory and macroeconomic foundation for every
                  analysis.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B8D935] shrink-0" />
                  <span className="text-xs font-semibold text-[#B8D935] font-['Inter',sans-serif]">
                    GIPC macro layer + BRIDGE venture layer = complete intelligence
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-10 items-end mb-10">
              <div>
                <SectionLabel>Built on GIPC</SectionLabel>
                <SectionHeading>
                  GIPC provides the foundation.
                  <br />
                  <strong className="font-bold">BRIDGE builds on top.</strong>
                </SectionHeading>
                <p className="m-0 text-base text-[#6B7280] leading-[1.75] font-['Inter',sans-serif]">
                  The GIPC produces Ghana's authoritative investment climate profiles — the official macro layer every
                  serious investor starts with. BRIDGE takes that foundation and extends it to the venture level:
                  scoring, structuring, and sequencing specific opportunities for deployment. We rely on GIPC data. We
                  don't replace it.
                </p>
              </div>
              <div className="bg-[#1B4D3E] rounded-[14px] p-[24px_28px]">
                <div className="text-[11px] font-bold text-[rgba(255,255,255,0.45)] font-['Inter',sans-serif] tracking-[1.2px] uppercase mb-2.5">
                  Our Position
                </div>
                <p className="mt-0 mb-4 mx-0 text-[15px] text-white leading-[1.7] font-['Inter',sans-serif]">
                  BRIDGE actively incorporates GIPC sector profiles as the regulatory and macroeconomic foundation for
                  every analysis. Together, they form a complete picture — from policy environment to investable
                  venture.
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#B8D935]" />
                  <span className="text-[13px] font-semibold text-[#B8D935] font-['Inter',sans-serif]">
                    GIPC macro layer + BRIDGE venture layer = complete intelligence
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Category filter */}
          {mobile ? (
            /* Mobile: horizontally scrollable pills, no outer container */
            <div
              className="overflow-x-auto mb-4 -mx-5 pl-5"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-1.5 w-max pr-5">
                {compCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveComp(cat);
                      setShowAllRows(false);
                    }}
                    className="px-4 py-[7px] rounded-[50px] text-xs font-bold font-['Inter',sans-serif] cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0"
                    style={{
                      border: `1px solid ${activeComp === cat ? C.primary : C.line}`,
                      background: activeComp === cat ? C.primary : C.white,
                      color: activeComp === cat ? C.white : C.muted,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="inline-flex gap-1.5 flex-wrap mb-5 p-1.5 rounded-[50px] border border-[#DEDEDE] bg-white">
              {compCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveComp(cat)}
                  className="px-[18px] py-[7px] rounded-[50px] border-none text-xs font-bold font-['Inter',sans-serif] cursor-pointer transition-all duration-200"
                  style={{
                    background: activeComp === cat ? C.primary : "transparent",
                    color: activeComp === cat ? C.white : C.muted,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Table / Card list */}
          {mobile ? (
            /* Mobile: each row becomes a card, 3 shown by default */
            <div className="flex flex-col gap-2.5">
              {(() => {
                const filtered = compRows.filter((r) => activeComp === "All" || r.category === activeComp);
                const visible = showAllRows ? filtered : filtered.slice(0, 3);
                return (
                  <>
                    {visible.map((row, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl border border-[#DEDEDE] overflow-hidden"
                      >
                        <div className="p-[12px_16px] border-b border-[#DEDEDE] flex items-center justify-between">
                          <span className="text-[13px] font-bold text-[#191919] font-['Inter',sans-serif]">
                            {row.dimension}
                          </span>
                          <span className="text-[10px] font-bold text-[#B8D935] font-['Inter',sans-serif] uppercase tracking-[0.6px] bg-[#EBF5B0] px-2 py-[3px] rounded-[20px]">
                            {row.category}
                          </span>
                        </div>
                        <div className="p-[12px_16px] border-b border-[#DEDEDE] flex gap-2.5">
                          <div className="flex items-center gap-[5px] min-w-[80px]">
                            <FileText size={11} color={C.muted} />
                            <span className="text-[11px] font-bold text-[#6B7280] font-['Inter',sans-serif]">
                              GIPC
                            </span>
                          </div>
                          <span className="text-[13px] text-[#6B7280] font-['Inter',sans-serif] leading-[1.5]">
                            {row.gipc}
                          </span>
                        </div>
                        <div className="p-[12px_16px] bg-[rgba(235,245,176,0.2)] flex gap-2.5">
                          <div className="flex items-center gap-[5px] min-w-[80px]">
                            <BarChart3 size={11} color={C.primary} />
                            <span className="text-[11px] font-bold text-[#1B4D3E] font-['Inter',sans-serif]">
                              BRIDGE
                            </span>
                          </div>
                          <span className="text-[13px] text-[#1B4D3E] font-['Inter',sans-serif] leading-[1.5] font-medium">
                            {row.bridge}
                          </span>
                        </div>
                      </div>
                    ))}

                    {filtered.length > 3 && (
                      <button
                        onClick={() => setShowAllRows((v) => !v)}
                        className="w-full p-[13px] rounded-xl border border-[#DEDEDE] bg-white cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span className="text-[13px] font-bold text-[#1B4D3E] font-['Inter',sans-serif]">
                          {showAllRows ? "Show less" : `Show ${filtered.length - 3} more`}
                        </span>
                        <ChevronRight
                          size={14}
                          color={C.primary}
                          className={`transition-transform duration-200 ${showAllRows ? "-rotate-90" : "rotate-90"}`}
                        />
                      </button>
                    )}
                  </>
                );
              })()}
              {/* Footer */}
              <div className="p-4 bg-white rounded-xl border border-[#DEDEDE] flex flex-col gap-2.5">
                <span className="text-xs text-[#6B7280] font-['Inter',sans-serif] italic leading-[1.6]">
                  BRIDGE and GIPC intelligence are designed to work together — macro foundation meets venture-level
                  precision.
                </span>
                <a
                  href="/resources"
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1B4D3E] no-underline font-['Inter',sans-serif]"
                >
                  Access the Resource Library <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          ) : (
            /* Desktop: table */
            <div className="bg-white rounded-[14px] border border-[#DEDEDE] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div
                className="grid border-b-2 border-[#DEDEDE]"
                style={{ gridTemplateColumns: "200px 1fr 1fr" }}
              >
                <div className="p-[16px_24px] text-[11px] font-bold text-[#6B7280] font-['Inter',sans-serif] uppercase tracking-[0.8px]">
                  Dimension
                </div>
                <div className="p-[16px_20px] border-l border-[#DEDEDE] flex items-center gap-2">
                  <FileText size={13} color={C.muted} />
                  <div>
                    <div className="text-[13px] font-bold text-[#4B5563] font-['Inter',sans-serif]">
                      GIPC Provides
                    </div>
                    <div className="text-[10px] text-[#6B7280] font-['Inter',sans-serif]">
                      Official foundation layer
                    </div>
                  </div>
                </div>
                <div className="p-[16px_20px] border-l border-[#DEDEDE] bg-[#EBF5B0] flex items-center gap-2">
                  <BarChart3 size={13} color={C.primary} />
                  <div>
                    <div className="text-[13px] font-bold text-[#1B4D3E] font-['Inter',sans-serif]">
                      BRIDGE Extends
                    </div>
                    <div className="text-[10px] text-[#1B4D3E] font-['Inter',sans-serif] opacity-70">
                      Venture intelligence layer
                    </div>
                  </div>
                </div>
              </div>
              {compRows
                .filter((r) => activeComp === "All" || r.category === activeComp)
                .map((row, i, arr) => (
                  <div
                    key={i}
                    className="grid transition-colors duration-150 hover:bg-[#FAFCF7]"
                    style={{
                      gridTemplateColumns: "200px 1fr 1fr",
                      borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : "none",
                    }}
                  >
                    <div className="p-[14px_24px] flex flex-col justify-center border-r border-[#DEDEDE]">
                      <span className="text-[10px] font-bold text-[#B8D935] font-['Inter',sans-serif] uppercase tracking-[0.6px] mb-0.5">
                        {row.category}
                      </span>
                      <span className="text-[13px] font-semibold text-[#191919] font-['Inter',sans-serif]">
                        {row.dimension}
                      </span>
                    </div>
                    <div className="p-[14px_20px] text-[13px] text-[#6B7280] font-['Inter',sans-serif] leading-[1.6] border-r border-[#DEDEDE]">
                      {row.gipc}
                    </div>
                    <div className="p-[14px_20px] text-[13px] text-[#1B4D3E] font-['Inter',sans-serif] leading-[1.6] bg-[rgba(235,245,176,0.15)] hover:font-semibold">
                      {row.bridge}
                    </div>
                  </div>
                ))}
              <div className="p-[16px_24px] bg-[#F3F5F2] border-t border-[#DEDEDE] flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-[#6B7280] font-['Inter',sans-serif] italic">
                  BRIDGE and GIPC intelligence are designed to work together — macro foundation meets venture-level
                  precision.
                </span>
                <a
                  href="/resources"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D3E] no-underline font-['Inter',sans-serif]"
                >
                  Access the Resource Library <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section
        className="bg-[#F3F5F2]"
        style={{ padding: mobile ? "0 20px 56px" : `0px ${PAD} 80px` }}
      >
        <div className="mx-auto" style={{ maxWidth: MAX }}>
          <div
            className="bg-[#1B4D3E] rounded-2xl"
            style={{
              padding: mobile ? "32px 24px" : "40px 56px",
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              alignItems: mobile ? "stretch" : "center",
              justifyContent: "space-between",
              gap: mobile ? "24px" : "32px",
            }}
          >
            <div>
              <div
                className="font-bold text-white font-['DM_Sans',sans-serif] mb-2.5"
                style={{ fontSize: mobile ? "24px" : "28px" }}
              >
                Explore the full research
              </div>
              <div
                className="text-[rgba(255,255,255,0.55)] font-['Inter',sans-serif] leading-[1.7]"
                style={{ fontSize: mobile ? "14px" : "15px" }}
              >
                The complete sector analyses — including every scored venture, implementation framework, and capital
                breakdown — are available in the BRIDGE Resource Library.
              </div>
            </div>
            <div
              className="shrink-0"
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: mobile ? "column" : "row",
              }}
            >
              <a
                href="/resources"
                className="inline-flex items-center justify-center gap-[7px] bg-[#B8D935] text-[#1B4D3E] no-underline py-[13px] px-6 rounded-[50px] text-sm font-bold font-['Inter',sans-serif]"
              >
                <Eye size={14} />
                View Resources
                <ArrowUpRight size={14} />
              </a>
              <a
                href="/login"
                className="inline-flex items-center justify-center gap-[7px] bg-[rgba(255,255,255,0.08)] text-white no-underline py-[13px] px-6 rounded-[50px] text-sm font-semibold font-['Inter',sans-serif] border border-[rgba(255,255,255,0.14)]"
              >
                <Lock size={14} />
                Get Full Access
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
    </Layout>
  );
}
