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
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: C.white,
        border: `1px solid ${C.line}`,
        borderRadius: "50px",
        padding: "8px 18px",
        marginBottom: "22px",
      }}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.accent, flexShrink: 0 }} />
      <span
        style={{
          fontFamily: "Inter,sans-serif",
          fontSize: "11px",
          fontWeight: "700",
          color: C.primary,
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2
      style={{
        fontFamily: "DM Sans,sans-serif",
        fontSize: "40px",
        fontWeight: "300",
        color: C.primary,
        lineHeight: 1.1,
        letterSpacing: "-0.8px",
        margin: "0 0 18px",
      }}
    >
      {children}
    </h2>
  );
}

function ProcessStep({ step, idx, active, onClick, last }) {
  return (
    <div style={{ display: "flex", gap: "20px", position: "relative", paddingBottom: last ? 0 : "4px" }}>
      {!last && (
        <div
          style={{
            position: "absolute",
            left: "23px",
            top: "52px",
            width: "2px",
            bottom: 0,
            background: active ? C.accent : C.line,
            transition: "background .3s",
          }}
        />
      )}
      <button
        onClick={onClick}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: `2px solid ${active ? C.accent : C.line}`,
          background: active ? C.accent : C.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          cursor: "pointer",
          transition: "all .2s",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: "800",
            color: active ? C.primary : C.muted,
            fontFamily: "Inter,sans-serif",
          }}
        >
          {step.num}
        </span>
      </button>
      <div style={{ paddingTop: "10px", flex: 1, paddingBottom: "10px" }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: active ? C.primary : C.muted,
            fontFamily: "Inter,sans-serif",
            letterSpacing: "0.4px",
            textTransform: "uppercase",
            transition: "color .2s",
          }}
        >
          {step.label}
        </div>
        {active && (
          <div
            style={{
              fontSize: "13px",
              color: C.muted,
              fontFamily: "Inter,sans-serif",
              lineHeight: 1.5,
              marginTop: "4px",
            }}
          >
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
      style={{
        padding: "18px 20px",
        borderRadius: "10px",
        border: `1px solid ${active ? C.accent : C.line}`,
        background: active ? C.accentBg : C.white,
        cursor: "pointer",
        transition: "all .2s",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: active ? "10px" : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: active ? C.accent : C.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background .2s",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: "800",
                color: active ? C.primary : C.muted,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {dim.weight}
            </span>
          </div>
          <span
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: active ? C.primary : C.mutedDark,
              fontFamily: "Inter,sans-serif",
            }}
          >
            {dim.label}
          </span>
        </div>
        <ChevronRight
          size={14}
          color={active ? C.primary : C.muted}
          style={{ transform: active ? "rotate(90deg)" : "none", transition: "transform .2s" }}
        />
      </div>
      {active && (
        <div>
          <p
            style={{
              margin: "0 0 12px",
              fontSize: "13px",
              color: C.muted,
              fontFamily: "Inter,sans-serif",
              lineHeight: 1.65,
            }}
          >
            {dim.desc}
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {dim.criteria.map((c) => (
              <span
                key={c}
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  background: C.white,
                  border: `1px solid ${C.line}`,
                  color: C.primary,
                  fontFamily: "Inter,sans-serif",
                }}
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            background: C.accentBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check size={13} color={C.primary} strokeWidth={2.5} />
        </div>
      </div>
    );
  if (val === "p")
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            background: "rgba(202,138,4,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Minus size={13} color="#CA8A04" strokeWidth={2.5} />
        </div>
      </div>
    );
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          background: "rgba(220,38,38,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
      <section style={{ padding: "56px 0 48px", background: C.white, overflow: "hidden" }}>
        {/* Text block */}
        <div style={{ padding: "0 20px", marginBottom: "32px" }}>
          <SectionLabel>Why Insight</SectionLabel>
          <h2
            style={{
              fontFamily: "DM Sans,sans-serif",
              fontSize: "32px",
              fontWeight: "300",
              color: C.primary,
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
              margin: "0 0 16px",
            }}
          >
            Ghana needs <strong style={{ fontWeight: "700" }}>intelligence built for builders.</strong>
          </h2>
          <p
            style={{
              margin: "0 0 14px",
              fontSize: "15px",
              color: C.muted,
              lineHeight: 1.75,
              fontFamily: "Inter,sans-serif",
            }}
          >
            Most development intelligence is written for conference rooms in London and Washington — macro by design,
            generic by necessity.
          </p>
          <p
            style={{
              margin: "0 0 24px",
              fontSize: "15px",
              color: C.dark,
              lineHeight: 1.75,
              fontFamily: "Inter,sans-serif",
            }}
          >
            BRIDGE produces practitioner-grade intelligence:{" "}
            <strong style={{ fontWeight: "700", color: C.primary }}>
              here is what to build, here is why, here is how.
            </strong>
          </p>
          <a
            href="/resources"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: C.accent,
              color: C.primary,
              textDecoration: "none",
              padding: "12px 22px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: "700",
              fontFamily: "Inter,sans-serif",
            }}
          >
            Explore the Research <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Horizontal snap carousel */}
        <div
          ref={scrollRef}
          onScroll={handleMobileScroll}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: "20px",
            gap: "12px",
            boxSizing: "border-box",
          }}
        >
          <style>{`.why-scroll::-webkit-scrollbar{display:none}`}</style>
          {whyItems.map((item, i) => (
            <div
              key={i}
              style={{
                minWidth: "calc(100vw - 64px)",
                maxWidth: "calc(100vw - 64px)",
                scrollSnapAlign: "start",
                flexShrink: 0,
                padding: "24px",
                background: C.bg,
                borderRadius: "14px",
                border: `1px solid ${C.line}`,
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: C.primary,
                  fontFamily: "DM Sans,sans-serif",
                  marginBottom: "10px",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </div>
              <p
                style={{ margin: 0, fontSize: "14px", color: C.muted, lineHeight: 1.7, fontFamily: "Inter,sans-serif" }}
              >
                {item.body}
              </p>
            </div>
          ))}
          {/* trailing spacer */}
          <div style={{ minWidth: "8px", flexShrink: 0 }} />
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "20px" }}>
          {whyItems.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              style={{
                width: i === mobileIdx ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === mobileIdx ? C.accent : C.line,
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: `80px ${PAD}`, background: C.white }}>
      <div style={{ maxWidth: MAX, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <SectionLabel>Why Insight</SectionLabel>
            <SectionHeading>
              Ghana needs <strong style={{ fontWeight: "700" }}>intelligence built for builders.</strong>
            </SectionHeading>
            <p
              style={{
                margin: "0 0 20px",
                fontSize: "16px",
                color: C.muted,
                lineHeight: 1.75,
                fontFamily: "Inter,sans-serif",
              }}
            >
              Most development intelligence is written for conference rooms in London and Washington. It's macro by
              design, generic by necessity, and operationally useless for anyone who wants to actually build something
              in Ghana.
            </p>
            <p
              style={{
                margin: "0 0 32px",
                fontSize: "16px",
                color: C.dark,
                lineHeight: 1.75,
                fontFamily: "Inter,sans-serif",
              }}
            >
              BRIDGE exists to change that. We produce practitioner-grade intelligence — the kind you can hand to a
              founding team, a fund manager, or a government partner and say:{" "}
              <strong style={{ fontWeight: "700", color: C.primary }}>
                here is what to build, here is why, here is how.
              </strong>
            </p>
            <a
              href="/resources"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: C.accent,
                color: C.primary,
                textDecoration: "none",
                padding: "13px 24px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: "Inter,sans-serif",
                alignSelf: "flex-start",
              }}
            >
              Explore the Research <ArrowUpRight size={14} />
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ height: `${CARDS_H}px`, overflow: "hidden" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `${GAP}px`,
                  transform: `translateY(-${offset * (CARD_H + GAP)}px)`,
                  transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {whyItems.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      height: `${CARD_H}px`,
                      flexShrink: 0,
                      padding: "22px 24px",
                      background: C.bg,
                      borderRadius: "12px",
                      border: `1px solid ${C.line}`,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: C.primary,
                        fontFamily: "DM Sans,sans-serif",
                        marginBottom: "8px",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: C.muted,
                        lineHeight: 1.65,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
              <button
                onClick={prev}
                disabled={offset === 0}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: `1px solid ${offset === 0 ? C.line : C.primary}`,
                  background: "transparent",
                  cursor: offset === 0 ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: offset === 0 ? 0.35 : 1,
                  transition: "all 0.2s",
                }}
              >
                <ChevronRight size={14} color={C.primary} style={{ transform: "rotate(180deg)" }} />
              </button>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setOffset(i)}
                    style={{
                      width: i === offset ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: i === offset ? C.accent : C.line,
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
              <button
                onClick={next}
                disabled={offset === pages - 1}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: `1px solid ${offset === pages - 1 ? C.line : C.primary}`,
                  background: "transparent",
                  cursor: offset === pages - 1 ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: offset === pages - 1 ? 0.35 : 1,
                  transition: "all 0.2s",
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
  const [hovRow, setHovRow] = useState(null);
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
    <div style={{ background: C.bg, fontFamily: "DM Sans,sans-serif" }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ background: C.primary, padding: mobile ? "60px 20px 52px" : `80px ${PAD} 80px` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: `1px solid ${C.accent}`,
              borderRadius: "50px",
              padding: "8px 18px",
              marginBottom: "20px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.accent, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "Inter,sans-serif",
                fontSize: "11px",
                fontWeight: "700",
                color: C.accent,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              BRIDGE Insights
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "2fr 1fr",
              gap: "56px",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  margin: "0 0 18px",
                  fontSize: mobile ? "36px" : "58px",
                  fontWeight: "300",
                  color: C.white,
                  lineHeight: 1.15,
                  letterSpacing: mobile ? "-0.8px" : "-1.5px",
                  fontFamily: "DM Sans,sans-serif",
                }}
              >
                Empirical analysis
                <br />
                Structured methodology
                <br />
                <strong style={{ fontWeight: "700" }}>Investable outcomes.</strong>
              </h1>
              <p
                style={{
                  margin: "0 0 28px",
                  fontSize: mobile ? "15px" : "17px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.75,
                  fontFamily: "Inter,sans-serif",
                  maxWidth: "680px",
                }}
              >
                Rigorous sector analysis, venture scoring, and policy intelligence — the research infrastructure behind
                every BRIDGE deployment decision.
              </p>
              <a
                href="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: C.accent,
                  color: C.primary,
                  textDecoration: "none",
                  padding: mobile ? "12px 22px" : "13px 24px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: "Inter,sans-serif",
                  width: mobile ? "100%" : "auto",
                  justifyContent: mobile ? "center" : "flex-start",
                  boxSizing: "border-box",
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
      <section id="process" style={{ padding: mobile ? "56px 0" : `80px ${PAD}`, background: C.bg }}>
        <div style={{ maxWidth: MAX, margin: mobile ? "0" : "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: mobile ? "32px" : "52px", padding: mobile ? "0 20px" : 0 }}>
            <SectionLabel>The Process</SectionLabel>
            <SectionHeading>
              Six stages. One <strong style={{ fontWeight: "700" }}>investment-grade</strong> output.
            </SectionHeading>
            <p
              style={{
                margin: "0 auto",
                maxWidth: "680px",
                fontSize: mobile ? "15px" : "16px",
                color: C.muted,
                lineHeight: 1.7,
                fontFamily: "Inter,sans-serif",
              }}
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
                style={{
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  paddingLeft: "20px",
                  paddingBottom: "4px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", gap: "8px", width: "max-content" }}>
                  {process.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "9px 16px",
                        borderRadius: "50px",
                        border: "none",
                        cursor: "pointer",
                        background: activeStep === idx ? C.primary : C.white,
                        boxShadow: activeStep === idx ? "none" : `0 0 0 1px ${C.line}`,
                        transition: "all 0.2s",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: activeStep === idx ? C.accent : C.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: "800",
                            color: activeStep === idx ? C.primary : C.muted,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {step.num}
                        </span>
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: activeStep === idx ? C.white : C.muted,
                          fontFamily: "Inter,sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {step.label}
                      </span>
                    </button>
                  ))}
                  <div style={{ minWidth: "12px" }} />
                </div>
              </div>

              {/* Detail card */}
              <div
                style={{
                  margin: "0 20px",
                  background: C.white,
                  borderRadius: "16px",
                  border: `1px solid ${C.line}`,
                  padding: "24px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: C.accentBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {React.createElement(process[activeStep].icon, { size: 20, color: C.primary })}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: C.muted,
                        fontFamily: "Inter,sans-serif",
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                      }}
                    >
                      Stage {process[activeStep].num}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: C.primary,
                        fontFamily: "DM Sans,sans-serif",
                      }}
                    >
                      {process[activeStep].label}
                    </div>
                  </div>
                </div>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "18px",
                    fontWeight: "700",
                    color: C.dark,
                    fontFamily: "DM Sans,sans-serif",
                    lineHeight: 1.3,
                  }}
                >
                  {process[activeStep].title}
                </h3>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "14px",
                    color: C.muted,
                    lineHeight: 1.75,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {process[activeStep].body}
                </p>
                <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: C.muted,
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      fontFamily: "Inter,sans-serif",
                      marginBottom: "10px",
                    }}
                  >
                    Outputs
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                    {process[activeStep].outputs.map((o) => (
                      <div key={o} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: C.accent,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: "13px", color: C.mutedDark, fontFamily: "Inter,sans-serif" }}>
                          {o}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    padding: "14px 16px",
                    background: C.accentBg,
                    borderRadius: "8px",
                    border: `1px solid rgba(184,217,53,0.3)`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: C.primary,
                      fontFamily: "Inter,sans-serif",
                      lineHeight: 1.6,
                    }}
                  >
                    {process[activeStep].highlight}
                  </span>
                </div>
              </div>

              {/* Mobile step dots */}
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
                {process.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    style={{
                      width: i === activeStep ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: i === activeStep ? C.accent : C.line,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* DESKTOP PROCESS: two-column */
            <div style={{ display: "grid", gridTemplateColumns: "480px 1fr", gap: "56px", alignItems: "stretch" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
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
              <div
                style={{
                  background: C.white,
                  borderRadius: "16px",
                  border: `1px solid ${C.line}`,
                  padding: "32px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "480px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: C.accentBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {React.createElement(process[activeStep].icon, { size: 20, color: C.primary })}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          color: C.muted,
                          fontFamily: "Inter,sans-serif",
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                        }}
                      >
                        Stage {process[activeStep].num}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: C.primary,
                          fontFamily: "DM Sans,sans-serif",
                        }}
                      >
                        {process[activeStep].label}
                      </div>
                    </div>
                  </div>
                  <h3
                    style={{
                      margin: "0 0 12px",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: C.dark,
                      fontFamily: "DM Sans,sans-serif",
                      lineHeight: 1.3,
                    }}
                  >
                    {process[activeStep].title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 20px",
                      fontSize: "14px",
                      color: C.muted,
                      lineHeight: 1.75,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {process[activeStep].body}
                  </p>
                  <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: "18px" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: C.muted,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        fontFamily: "Inter,sans-serif",
                        marginBottom: "10px",
                      }}
                    >
                      Outputs
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {process[activeStep].outputs.map((o) => (
                        <div key={o} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                          <div
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: C.accent,
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ fontSize: "13px", color: C.mutedDark, fontFamily: "Inter,sans-serif" }}>
                            {o}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    padding: "14px 16px",
                    background: C.accentBg,
                    borderRadius: "8px",
                    border: `1px solid rgba(184,217,53,0.3)`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: C.primary,
                      fontFamily: "Inter,sans-serif",
                      lineHeight: 1.6,
                    }}
                  >
                    {process[activeStep].highlight}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── IMPACT SCORE ──────────────────────────────────── */}
      <section style={{ padding: mobile ? "56px 20px" : `80px ${PAD}`, background: C.white }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: mobile ? "32px" : "52px" }}>
            <SectionLabel>BRIDGE Impact Score™</SectionLabel>
            <SectionHeading>
              A framework built for a <strong style={{ fontWeight: "700" }}>complex ecosystem.</strong>
            </SectionHeading>
            <p
              style={{
                margin: "0 auto",
                maxWidth: "740px",
                fontSize: mobile ? "15px" : "16px",
                color: C.muted,
                lineHeight: 1.7,
                fontFamily: "Inter,sans-serif",
              }}
            >
              Most frameworks collapse under complexity. The BRIDGE Impact Score™ was built for it — four weighted
              dimensions evaluated across 174+ ventures in 12 sectors, producing a single composite score that is
              objective, reproducible, and cross-sector comparable.
            </p>
          </div>

          {mobile ? (
            /* MOBILE IMPACT SCORE: fully stacked */
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Dimensions */}
              <div>
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  Tap a dimension to expand
                </p>
                {scoreDimensions.map((dim, i) => (
                  <ScoreDimension key={i} dim={dim} idx={i} active={activeDim === i} onClick={() => setActiveDim(i)} />
                ))}
              </div>

              {/* Score tiers — collapsible */}
              <div
                style={{ background: C.bg, borderRadius: "12px", border: `1px solid ${C.line}`, overflow: "hidden" }}
              >
                <button
                  onClick={() => togglePanel("tiers")}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{ fontSize: "13px", fontWeight: "700", color: C.primary, fontFamily: "DM Sans,sans-serif" }}
                  >
                    Score Tiers
                  </span>
                  <ChevronRight
                    size={16}
                    color={C.muted}
                    style={{
                      transform: openPanel === "tiers" ? "rotate(90deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>
                {openPanel === "tiers" && (
                  <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                    {[
                      ["88–100", "Tier I Priority", "Top priority for capital deployment"],
                      ["75–87", "Tier II Medium-term", "Strong opportunity, secondary sequencing"],
                      ["Below 75", "Tier III Long-term", "Valid opportunity, longer horizon"],
                    ].map(([range, tier, desc]) => (
                      <div
                        key={range}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "88px 1fr",
                          gap: "12px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "800",
                            color: C.primary,
                            fontFamily: "Inter,sans-serif",
                            paddingTop: "1px",
                          }}
                        >
                          {range}
                        </span>
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "700",
                              color: C.dark,
                              fontFamily: "Inter,sans-serif",
                              marginBottom: "2px",
                            }}
                          >
                            {tier}
                          </div>
                          <div style={{ fontSize: "12px", color: C.muted, fontFamily: "Inter,sans-serif" }}>{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Weight distribution — collapsible */}
              <div
                style={{ background: C.bg, borderRadius: "12px", border: `1px solid ${C.line}`, overflow: "hidden" }}
              >
                <button
                  onClick={() => togglePanel("weights")}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{ fontSize: "13px", fontWeight: "700", color: C.primary, fontFamily: "DM Sans,sans-serif" }}
                  >
                    Score Weight Distribution
                  </span>
                  <ChevronRight
                    size={16}
                    color={C.muted}
                    style={{
                      transform: openPanel === "weights" ? "rotate(90deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>
                {openPanel === "weights" && (
                  <div style={{ padding: "0 20px 20px" }}>
                    {scoreDimensions.map((dim, i) => {
                      const pct = parseInt(dim.weight);
                      return (
                        <div key={i} style={{ marginBottom: "12px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: activeDim === i ? C.primary : C.mutedDark,
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              {dim.label}
                            </span>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "800",
                                color: activeDim === i ? C.primary : C.muted,
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              {dim.weight}
                            </span>
                          </div>
                          <div style={{ height: "8px", background: C.line, borderRadius: "4px", overflow: "hidden" }}>
                            <div
                              style={{
                                width: `${pct * 3}%`,
                                height: "100%",
                                background: activeDim === i ? C.accent : C.primary,
                                borderRadius: "4px",
                                transition: "background .2s",
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
              <div style={{ background: C.primary, borderRadius: "12px", overflow: "hidden" }}>
                <button
                  onClick={() => togglePanel("portfolio")}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "rgba(255,255,255,0.4)",
                        fontFamily: "Inter,sans-serif",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        marginBottom: "2px",
                      }}
                    >
                      Portfolio Breakdown
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontFamily: "Inter,sans-serif" }}>
                      174+ ventures · 12 sectors
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    color="rgba(255,255,255,0.4)"
                    style={{
                      transform: openPanel === "portfolio" ? "rotate(90deg)" : "none",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openPanel === "portfolio" && (
                  <div style={{ padding: "0 20px 20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
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
                          style={{
                            display: "grid",
                            gridTemplateColumns: "48px 1fr",
                            gap: "14px",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: "800",
                              color: "rgba(255,255,255,0.9)",
                              fontFamily: "Inter,sans-serif",
                              lineHeight: 1,
                            }}
                          >
                            {count}
                          </div>
                          <div>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "700",
                                color: "rgba(255,255,255,0.6)",
                                fontFamily: "Inter,sans-serif",
                                display: "block",
                                marginBottom: "5px",
                              }}
                            >
                              {tier} · {label}
                            </span>
                            <div
                              style={{
                                height: "8px",
                                background: "rgba(255,255,255,0.08)",
                                borderRadius: "4px",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${bar * 100}%`,
                                  height: "100%",
                                  background: color,
                                  borderRadius: "4px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "14px" }}>
                      <div
                        style={{
                          display: "flex",
                          height: "10px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          gap: "2px",
                          marginBottom: "10px",
                        }}
                      >
                        {[
                          { pct: 30, color: C.accent },
                          { pct: 25, color: "rgba(255,255,255,0.25)" },
                          { pct: 25, color: "rgba(184,217,53,0.5)" },
                          { pct: 20, color: "rgba(255,255,255,0.12)" },
                        ].map((s, i) => (
                          <div
                            key={i}
                            style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: "3px" }}
                          />
                        ))}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 12px" }}>
                        {[
                          ["P&P Alignment", "30%", C.accent],
                          ["Strategic Fit", "25%", "rgba(255,255,255,0.5)"],
                          ["Feasibility", "25%", "rgba(184,217,53,0.6)"],
                          ["Scalability", "20%", "rgba(255,255,255,0.3)"],
                        ].map(([l, w, c]) => (
                          <div key={l} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <div
                              style={{ width: "8px", height: "8px", borderRadius: "2px", background: c, flexShrink: 0 }}
                            />
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "600",
                                color: "rgba(255,255,255,0.6)",
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "13px",
                      fontWeight: "700",
                      color: C.muted,
                      fontFamily: "Inter,sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                    }}
                  >
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
                <div
                  style={{
                    marginTop: "20px",
                    padding: "20px 24px",
                    background: C.bg,
                    borderRadius: "12px",
                    border: `1px solid ${C.line}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: C.muted,
                      letterSpacing: "1.2px",
                      textTransform: "uppercase",
                      fontFamily: "Inter,sans-serif",
                      marginBottom: "16px",
                    }}
                  >
                    Score Tiers
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {[
                      ["88–100", "Tier I Priority", "Top priority for capital deployment"],
                      ["75–87", "Tier II Medium-term", "Strong opportunity, secondary sequencing"],
                      ["Below 75", "Tier III Long-term", "Valid opportunity, longer horizon"],
                    ].map(([range, tier, desc]) => (
                      <div
                        key={range}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "88px 1fr",
                          gap: "16px",
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "800",
                            color: C.primary,
                            fontFamily: "Inter,sans-serif",
                            paddingTop: "1px",
                          }}
                        >
                          {range}
                        </span>
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "700",
                              color: C.dark,
                              fontFamily: "Inter,sans-serif",
                              marginBottom: "2px",
                            }}
                          >
                            {tier}
                          </div>
                          <div style={{ fontSize: "12px", color: C.muted, fontFamily: "Inter,sans-serif" }}>{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingTop: "33px" }}>
                <div style={{ background: C.bg, borderRadius: "16px", border: `1px solid ${C.line}`, padding: "28px" }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: C.primary,
                      fontFamily: "DM Sans,sans-serif",
                      marginBottom: "20px",
                    }}
                  >
                    Score Weight Distribution
                  </div>
                  {scoreDimensions.map((dim, i) => {
                    const pct = parseInt(dim.weight);
                    return (
                      <div key={i} style={{ marginBottom: "14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              color: activeDim === i ? C.primary : C.mutedDark,
                              fontFamily: "Inter,sans-serif",
                              transition: "color .2s",
                            }}
                          >
                            {dim.label}
                          </span>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "800",
                              color: activeDim === i ? C.primary : C.muted,
                              fontFamily: "Inter,sans-serif",
                            }}
                          >
                            {dim.weight}
                          </span>
                        </div>
                        <div style={{ height: "8px", background: C.line, borderRadius: "4px", overflow: "hidden" }}>
                          <div
                            style={{
                              width: `${pct * 3}%`,
                              height: "100%",
                              background: activeDim === i ? C.accent : C.primary,
                              borderRadius: "4px",
                              transition: "background .2s",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    flex: 1,
                    background: C.primary,
                    borderRadius: "12px",
                    padding: "24px 28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "rgba(255,255,255,0.4)",
                        fontFamily: "Inter,sans-serif",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Portfolio Breakdown
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "Inter,sans-serif",
                        marginBottom: "20px",
                      }}
                    >
                      174+ ventures scored across 12 sectors
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
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
                          style={{
                            display: "grid",
                            gridTemplateColumns: "48px 1fr",
                            gap: "16px",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: "800",
                              color: "rgba(255,255,255,0.9)",
                              fontFamily: "Inter,sans-serif",
                              lineHeight: 1,
                            }}
                          >
                            {count}
                          </div>
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                              <span
                                style={{
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  color: "rgba(255,255,255,0.6)",
                                  fontFamily: "Inter,sans-serif",
                                }}
                              >
                                {tier} · {label}
                              </span>
                            </div>
                            <div
                              style={{
                                height: "8px",
                                background: "rgba(255,255,255,0.08)",
                                borderRadius: "4px",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${bar * 100}%`,
                                  height: "100%",
                                  background: color,
                                  borderRadius: "4px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "rgba(255,255,255,0.4)",
                        fontFamily: "Inter,sans-serif",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        marginBottom: "10px",
                      }}
                    >
                      Weight Distribution
                    </div>
                    <div
                      style={{ display: "flex", height: "10px", borderRadius: "6px", overflow: "hidden", gap: "2px" }}
                    >
                      {[
                        { pct: 30, color: C.accent },
                        { pct: 25, color: "rgba(255,255,255,0.25)" },
                        { pct: 25, color: "rgba(184,217,53,0.5)" },
                        { pct: 20, color: "rgba(255,255,255,0.12)" },
                      ].map((s, i) => (
                        <div
                          key={i}
                          style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: "3px" }}
                        />
                      ))}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 14px", marginTop: "10px" }}>
                      {[
                        ["P&P Alignment", "30%", C.accent],
                        ["Strategic Fit", "25%", "rgba(255,255,255,0.5)"],
                        ["Feasibility", "25%", "rgba(184,217,53,0.6)"],
                        ["Scalability", "20%", "rgba(255,255,255,0.3)"],
                      ].map(([l, w, c]) => (
                        <div key={l} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <div
                            style={{ width: "8px", height: "8px", borderRadius: "2px", background: c, flexShrink: 0 }}
                          />
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: "600",
                              color: "rgba(255,255,255,0.6)",
                              fontFamily: "Inter,sans-serif",
                            }}
                          >
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
      <section id="compare" style={{ padding: mobile ? "56px 20px" : `80px ${PAD}`, background: C.bg }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          {/* Header */}
          {mobile ? (
            <div style={{ marginBottom: "28px" }}>
              <SectionLabel>Built on GIPC</SectionLabel>
              <h2
                style={{
                  fontFamily: "DM Sans,sans-serif",
                  fontSize: "30px",
                  fontWeight: "300",
                  color: C.primary,
                  lineHeight: 1.15,
                  letterSpacing: "-0.5px",
                  margin: "0 0 14px",
                }}
              >
                GIPC provides the foundation.
                <br />
                <strong style={{ fontWeight: "700" }}>BRIDGE builds on top.</strong>
              </h2>
              <p
                style={{
                  margin: "0 0 20px",
                  fontSize: "14px",
                  color: C.muted,
                  lineHeight: 1.75,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                GIPC produces Ghana's authoritative investment climate profiles — the official macro layer every serious
                investor starts with. BRIDGE extends it to the venture level.
              </p>
              <div style={{ background: C.primary, borderRadius: "12px", padding: "18px 20px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Our Position
                </div>
                <p
                  style={{
                    margin: "0 0 12px",
                    fontSize: "13px",
                    color: C.white,
                    lineHeight: 1.7,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  BRIDGE incorporates GIPC sector profiles as the regulatory and macroeconomic foundation for every
                  analysis.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.accent, flexShrink: 0 }}
                  />
                  <span
                    style={{ fontSize: "12px", fontWeight: "600", color: C.accent, fontFamily: "Inter,sans-serif" }}
                  >
                    GIPC macro layer + BRIDGE venture layer = complete intelligence
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
                alignItems: "flex-end",
                marginBottom: "40px",
              }}
            >
              <div>
                <SectionLabel>Built on GIPC</SectionLabel>
                <SectionHeading>
                  GIPC provides the foundation.
                  <br />
                  <strong style={{ fontWeight: "700" }}>BRIDGE builds on top.</strong>
                </SectionHeading>
                <p
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    color: C.muted,
                    lineHeight: 1.75,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  The GIPC produces Ghana's authoritative investment climate profiles — the official macro layer every
                  serious investor starts with. BRIDGE takes that foundation and extends it to the venture level:
                  scoring, structuring, and sequencing specific opportunities for deployment. We rely on GIPC data. We
                  don't replace it.
                </p>
              </div>
              <div style={{ background: C.primary, borderRadius: "14px", padding: "24px 28px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Our Position
                </div>
                <p
                  style={{
                    margin: "0 0 16px",
                    fontSize: "15px",
                    color: C.white,
                    lineHeight: 1.7,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  BRIDGE actively incorporates GIPC sector profiles as the regulatory and macroeconomic foundation for
                  every analysis. Together, they form a complete picture — from policy environment to investable
                  venture.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.accent }} />
                  <span
                    style={{ fontSize: "13px", fontWeight: "600", color: C.accent, fontFamily: "Inter,sans-serif" }}
                  >
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
              style={{
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                marginBottom: "16px",
                marginLeft: "-20px",
                marginRight: "-20px",
                paddingLeft: "20px",
              }}
            >
              <div style={{ display: "flex", gap: "6px", width: "max-content", paddingRight: "20px" }}>
                {compCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveComp(cat);
                      setShowAllRows(false);
                    }}
                    style={{
                      padding: "7px 16px",
                      borderRadius: "50px",
                      border: `1px solid ${activeComp === cat ? C.primary : C.line}`,
                      background: activeComp === cat ? C.primary : C.white,
                      color: activeComp === cat ? C.white : C.muted,
                      fontSize: "12px",
                      fontWeight: "700",
                      fontFamily: "Inter,sans-serif",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "inline-flex",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "20px",
                padding: "6px",
                borderRadius: "50px",
                border: `1px solid ${C.line}`,
                background: C.white,
              }}
            >
              {compCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveComp(cat)}
                  style={{
                    padding: "7px 18px",
                    borderRadius: "50px",
                    border: "none",
                    background: activeComp === cat ? C.primary : "transparent",
                    color: activeComp === cat ? C.white : C.muted,
                    fontSize: "12px",
                    fontWeight: "700",
                    fontFamily: "Inter,sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s",
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
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {(() => {
                const filtered = compRows.filter((r) => activeComp === "All" || r.category === activeComp);
                const visible = showAllRows ? filtered : filtered.slice(0, 3);
                return (
                  <>
                    {visible.map((row, i) => (
                      <div
                        key={i}
                        style={{
                          background: C.white,
                          borderRadius: "12px",
                          border: `1px solid ${C.line}`,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            padding: "12px 16px",
                            borderBottom: `1px solid ${C.line}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: "700",
                              color: C.dark,
                              fontFamily: "Inter,sans-serif",
                            }}
                          >
                            {row.dimension}
                          </span>
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: "700",
                              color: C.accent,
                              fontFamily: "Inter,sans-serif",
                              textTransform: "uppercase",
                              letterSpacing: "0.6px",
                              background: C.accentBg,
                              padding: "3px 8px",
                              borderRadius: "20px",
                            }}
                          >
                            {row.category}
                          </span>
                        </div>
                        <div
                          style={{
                            padding: "12px 16px",
                            borderBottom: `1px solid ${C.line}`,
                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "5px", minWidth: "80px" }}>
                            <FileText size={11} color={C.muted} />
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "700",
                                color: C.muted,
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              GIPC
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: "13px",
                              color: C.muted,
                              fontFamily: "Inter,sans-serif",
                              lineHeight: 1.5,
                            }}
                          >
                            {row.gipc}
                          </span>
                        </div>
                        <div
                          style={{
                            padding: "12px 16px",
                            background: "rgba(235,245,176,0.2)",
                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "5px", minWidth: "80px" }}>
                            <BarChart3 size={11} color={C.primary} />
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "700",
                                color: C.primary,
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              BRIDGE
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: "13px",
                              color: C.primary,
                              fontFamily: "Inter,sans-serif",
                              lineHeight: 1.5,
                              fontWeight: "500",
                            }}
                          >
                            {row.bridge}
                          </span>
                        </div>
                      </div>
                    ))}

                    {filtered.length > 3 && (
                      <button
                        onClick={() => setShowAllRows((v) => !v)}
                        style={{
                          width: "100%",
                          padding: "13px",
                          borderRadius: "12px",
                          border: `1px solid ${C.line}`,
                          background: C.white,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            color: C.primary,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {showAllRows ? "Show less" : `Show ${filtered.length - 3} more`}
                        </span>
                        <ChevronRight
                          size={14}
                          color={C.primary}
                          style={{
                            transform: showAllRows ? "rotate(-90deg)" : "rotate(90deg)",
                            transition: "transform 0.2s",
                          }}
                        />
                      </button>
                    )}
                  </>
                );
              })()}
              {/* Footer */}
              <div
                style={{
                  padding: "16px",
                  background: C.white,
                  borderRadius: "12px",
                  border: `1px solid ${C.line}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                  }}
                >
                  BRIDGE and GIPC intelligence are designed to work together — macro foundation meets venture-level
                  precision.
                </span>
                <a
                  href="/resources"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: C.primary,
                    textDecoration: "none",
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  Access the Resource Library <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          ) : (
            /* Desktop: table */
            <div
              style={{
                background: C.white,
                borderRadius: "14px",
                border: `1px solid ${C.line}`,
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", borderBottom: `2px solid ${C.line}` }}
              >
                <div
                  style={{
                    padding: "16px 24px",
                    fontSize: "11px",
                    fontWeight: "700",
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  Dimension
                </div>
                <div
                  style={{
                    padding: "16px 20px",
                    borderLeft: `1px solid ${C.line}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FileText size={13} color={C.muted} />
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: C.mutedDark,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      GIPC Provides
                    </div>
                    <div style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif" }}>
                      Official foundation layer
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    padding: "16px 20px",
                    borderLeft: `1px solid ${C.line}`,
                    background: C.accentBg,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <BarChart3 size={13} color={C.primary} />
                  <div>
                    <div
                      style={{ fontSize: "13px", fontWeight: "700", color: C.primary, fontFamily: "Inter,sans-serif" }}
                    >
                      BRIDGE Extends
                    </div>
                    <div style={{ fontSize: "10px", color: C.primary, fontFamily: "Inter,sans-serif", opacity: 0.7 }}>
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
                    onMouseEnter={() => setHovRow(i)}
                    onMouseLeave={() => setHovRow(null)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "200px 1fr 1fr",
                      borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : "none",
                      background: hovRow === i ? "#FAFCF7" : "transparent",
                      transition: "background .15s",
                    }}
                  >
                    <div
                      style={{
                        padding: "14px 24px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        borderRight: `1px solid ${C.line}`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "700",
                          color: C.accent,
                          fontFamily: "Inter,sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: "0.6px",
                          marginBottom: "2px",
                        }}
                      >
                        {row.category}
                      </span>
                      <span
                        style={{ fontSize: "13px", fontWeight: "600", color: C.dark, fontFamily: "Inter,sans-serif" }}
                      >
                        {row.dimension}
                      </span>
                    </div>
                    <div
                      style={{
                        padding: "14px 20px",
                        fontSize: "13px",
                        color: C.muted,
                        fontFamily: "Inter,sans-serif",
                        lineHeight: 1.6,
                        borderRight: `1px solid ${C.line}`,
                      }}
                    >
                      {row.gipc}
                    </div>
                    <div
                      style={{
                        padding: "14px 20px",
                        fontSize: "13px",
                        color: C.primary,
                        fontFamily: "Inter,sans-serif",
                        lineHeight: 1.6,
                        background: "rgba(235,245,176,0.15)",
                        fontWeight: hovRow === i ? "600" : "400",
                      }}
                    >
                      {row.bridge}
                    </div>
                  </div>
                ))}
              <div
                style={{
                  padding: "16px 24px",
                  background: C.bg,
                  borderTop: `1px solid ${C.line}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "12px", color: C.muted, fontFamily: "Inter,sans-serif", fontStyle: "italic" }}>
                  BRIDGE and GIPC intelligence are designed to work together — macro foundation meets venture-level
                  precision.
                </span>
                <a
                  href="/resources"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: C.primary,
                    textDecoration: "none",
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  Access the Resource Library <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ padding: mobile ? "0 20px 56px" : `0px ${PAD} 80px`, background: C.bg }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <div
            style={{
              background: C.primary,
              borderRadius: "16px",
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
                style={{
                  fontSize: mobile ? "24px" : "28px",
                  fontWeight: "700",
                  color: C.white,
                  fontFamily: "DM Sans,sans-serif",
                  marginBottom: "10px",
                }}
              >
                Explore the full research
              </div>
              <div
                style={{
                  fontSize: mobile ? "14px" : "15px",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "Inter,sans-serif",
                  lineHeight: 1.7,
                }}
              >
                The complete sector analyses — including every scored venture, implementation framework, and capital
                breakdown — are available in the BRIDGE Resource Library.
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", flexDirection: mobile ? "column" : "row", flexShrink: 0 }}>
              <a
                href="/resources"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  background: C.accent,
                  color: C.primary,
                  textDecoration: "none",
                  padding: "13px 24px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                <Eye size={14} />
                View Resources
                <ArrowUpRight size={14} />
              </a>
              <a
                href="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  background: "rgba(255,255,255,0.08)",
                  color: C.white,
                  textDecoration: "none",
                  padding: "13px 24px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Inter,sans-serif",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
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
