import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeaderMinimal";
import SiteFooter from "@/components/SiteFooter";
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

const C = {
  primary: "#1B4D3E",
  teal: "#2E5A4D",
  accent: "#B8D935",
  accentBg: "#EBF5B0",
  bg: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
  muted: "#6B7280",
  mutedDark: "#4B5563",
};
const MAX = "1200px";
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
    title: "The analysis stays alive",
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
  const VISIBLE = 3;
  const total = whyItems.length;
  const pages = total - VISIBLE + 1; // 2 steps for 4 items

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(pages - 1, o + 1));

  const CARD_H = 138;
  const GAP = 12;
  const CARDS_H = VISIBLE * CARD_H + (VISIBLE - 1) * GAP;

  return (
    <section style={{ padding: mobile ? "64px 20px" : `80px ${PAD}`, background: C.white }}>
      <div style={{ maxWidth: MAX, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
            gap: "56px",
            alignItems: "center",
          }}
        >
          {/* LEFT */}
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

          {/* RIGHT — cards + nav */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Card window */}
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

            {/* Nav — arrows + dots, centered under cards */}
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

// ─── Shared: BridgeLogo + SiteHeader ──────────────────────

const BridgeLogo = ({ height = 40 }) => (
  <div style={{ display: "flex", alignItems: "center", height: `${height}px` }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3434.33 932.3" height={height} style={{ display: "block" }}>
      <path fill="#b8d935" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path fill="#0fea68" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path
        fill="#1b4d3e"
        d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
      />
      <path
        fill="#1b4d3e"
        stroke="#000"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z"
      />
      <path
        fill="#1b4d3e"
        stroke="#000"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill="#b8d935" x="1427.38" y="17.35" width="205.2" height="145" />
      <rect fill="#1b4d3e" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill="#1b4d3e"
        d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
      />
      <rect fill="#1b4d3e" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
      <rect fill="#b8d935" x="3083.41" y="339.47" width="175.12" height="257.67" />
      <rect fill="#b8d935" x="3083.41" y="654.42" width="175.12" height="257.67" />
      <circle fill="none" stroke="#231f20" strokeWidth="5" strokeMiterlimit="10" cx="3385.56" cy="866.94" r="46.27" />
      <path
        fill="#191919"
        d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13h0ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13h0Z"
      />
      <rect
        fill="none"
        stroke="#1b4d3e"
        strokeWidth="80"
        strokeMiterlimit="10"
        x="40"
        y="40"
        width="843.91"
        height="852.3"
        rx="36.55"
        ry="36.55"
      />
      <polygon
        fill="#b8d935"
        stroke="#1b4d3e"
        strokeMiterlimit="10"
        points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"
      />
      <path
        fill="#1b4d3e"
        d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"
      />
      <path
        fill="#b8d935"
        d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"
      />
    </svg>
  </div>
);

function useIsMobile(bp = 768) {
  const [m, setM] = React.useState(false);
  useEffect(() => {
    const c = () => setM(window.innerWidth <= bp);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);
  return m;
}

// ── Header is now shared (SiteHeader from @/components/SiteHeader)

// ─── Footer (exact production — BRIDGE_Footer_Exact_Build_Handoff.md) ──────

const socialIcons = [
  <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>,
  <svg key="tw" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>,
  <svg key="fb" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>,
];

const footerSectorIcons = [
  {
    key: "infra",
    label: "Infrastructure & Basic Services",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
      </svg>
    ),
  },
  {
    key: "fin",
    label: "Financial Inclusion",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    ),
  },
  {
    key: "health",
    label: "Health Systems",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
      </svg>
    ),
  },
  {
    key: "tech",
    label: "Technology & Innovation",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
      </svg>
    ),
  },
  {
    key: "edu",
    label: "Education & Skills",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    ),
  },
  {
    key: "agri",
    label: "Agriculture & Value Chains",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
      </svg>
    ),
  },
  {
    key: "creative",
    label: "Sports & Creative",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    key: "housing",
    label: "Housing & Real Estate",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    key: "tourism",
    label: "Tourism & Hospitality",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
        <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
        <path d="M10 20h4" />
        <circle cx="16" cy="20" r="2" />
        <circle cx="8" cy="20" r="2" />
      </svg>
    ),
  },
  {
    key: "energy",
    label: "Energy & Renewables",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
        <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
        <path d="m11 7-3 5h4l-3 5" />
        <line x1="22" x2="22" y1="11" y2="13" />
      </svg>
    ),
  },
  {
    key: "mfg",
    label: "Manufacturing",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M17 18h1M12 18h1M7 18h1" />
      </svg>
    ),
  },
  {
    key: "transport",
    label: "Transportation",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    ),
  },
];

const SectorGrid = () => {
  const [hovered, setHovered] = React.useState(null);
  return (
    <div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: "600",
          color: hovered !== null ? "#B8D935" : "rgba(255,255,255,0.4)",
          fontFamily: "'DM Sans', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          marginBottom: "12px",
          transition: "color 0.25s ease",
          lineHeight: "1",
          minHeight: "12px",
        }}
      >
        {hovered !== null ? footerSectorIcons[hovered].label : "Explore 12 Sectors"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {footerSectorIcons.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href="#"
              title={sector.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: isH ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isH ? "rgba(184,217,53,0.35)" : "rgba(255,255,255,0.07)"}`,
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                transform: isH ? "translateY(-2px)" : "none",
                boxShadow: isH ? "0 6px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(184,217,53,0.15)" : "none",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  opacity: isH ? 1 : 0.5,
                  transition: "opacity 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {sector.icon(isH ? "#B8D935" : "rgba(255,255,255,0.85)")}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default function InsightsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeDim, setActiveDim] = useState(0);
  const [activeComp, setActiveComp] = useState("All");
  const [hovRow, setHovRow] = useState(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  return (
    <div style={{ background: C.bg, fontFamily: "DM Sans,sans-serif" }}>
      <SiteHeader />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ background: C.primary, padding: mobile ? "80px 20px 64px" : `80px ${PAD} 80px` }}>
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
              marginBottom: "22px",
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
                  margin: "0 0 20px",
                  fontSize: mobile ? "38px" : "58px",
                  fontWeight: "300",
                  color: C.white,
                  lineHeight: 1.15,
                  letterSpacing: "-1.5px",
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
                  margin: "0 0 32px",
                  fontSize: "17px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.75,
                  fontFamily: "Inter,sans-serif",
                  maxWidth: "680px",
                }}
              >
                Rigorous sector analysis, venture scoring, and policy intelligence — the research infrastructure behind
                every BRIDGE deployment decision.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a
                  href="/intelligence/dashboard"
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
                  }}
                >
                  Access Dashboard <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY INSIGHT ───────────────────────────────────── */}
      <WhyInsightSection mobile={mobile} />

      {/* ── THE PROCESS ───────────────────────────────────── */}
      <section id="process" style={{ padding: mobile ? "64px 20px" : `80px ${PAD}`, background: C.bg }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionLabel>The Process</SectionLabel>
            <SectionHeading>
              Six stages. One <strong style={{ fontWeight: "700" }}>investment-grade</strong> output.
            </SectionHeading>
            <p
              style={{
                margin: "0 auto",
                maxWidth: "680px",
                fontSize: "16px",
                color: C.muted,
                lineHeight: 1.7,
                fontFamily: "Inter,sans-serif",
              }}
            >
              From citizen-level gap identification to a fully scored, portfolio-integrated venture — every BRIDGE
              analysis follows the same rigorous six-stage methodology.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "480px 1fr",
              gap: "56px",
              alignItems: "stretch",
            }}
          >
            {/* Left: steps list */}
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
            {/* Right: fixed-height detail panel */}
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
              {/* Highlight callout — every step */}
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
        </div>
      </section>

      {/* ── IMPACT SCORE ──────────────────────────────────── */}
      <section style={{ padding: mobile ? "64px 20px" : `80px ${PAD}`, background: C.white }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <SectionLabel>BRIDGE Impact Score™</SectionLabel>
            <SectionHeading>
              A framework built for a <strong style={{ fontWeight: "700" }}>complex ecosystem.</strong>
            </SectionHeading>
            <p
              style={{
                margin: "0 auto",
                maxWidth: "740px",
                fontSize: "16px",
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
              gap: "56px",
              alignItems: "stretch",
            }}
          >
            {/* Left: dimensions + tiers */}
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
                  <ScoreDimension key={i} dim={dim} idx={i} active={activeDim === i} onClick={() => setActiveDim(i)} />
                ))}
              </div>

              {/* Score tiers */}
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

            {/* Right: weight visual + stat card */}
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
                {/* Portfolio breakdown */}
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
                        style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: "16px", alignItems: "center" }}
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
                              style={{ width: `${bar * 100}%`, height: "100%", background: color, borderRadius: "4px" }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weight distribution */}
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
                  <div style={{ display: "flex", height: "10px", borderRadius: "6px", overflow: "hidden", gap: "2px" }}>
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
        </div>
      </section>

      {/* ── BUILT ON GIPC ─────────────────────────────────── */}
      <section id="compare" style={{ padding: mobile ? "64px 20px" : `80px ${PAD}`, background: C.bg }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
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
                serious investor starts with. BRIDGE takes that foundation and extends it to the venture level: scoring,
                structuring, and sequencing specific opportunities for deployment. We rely on GIPC data. We don't
                replace it.
              </p>
            </div>
            {/* Partnership callout */}
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
                every analysis. Together, they form a complete picture — from policy environment to investable venture.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.accent }} />
                <span style={{ fontSize: "13px", fontWeight: "600", color: C.accent, fontFamily: "Inter,sans-serif" }}>
                  GIPC macro layer + BRIDGE venture layer = complete intelligence
                </span>
              </div>
            </div>
          </div>

          {/* Category filter pills */}
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

          {/* Table */}
          <div
            style={{
              background: C.white,
              borderRadius: "14px",
              border: `1px solid ${C.line}`,
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", borderBottom: `2px solid ${C.line}` }}>
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
                    style={{ fontSize: "13px", fontWeight: "700", color: C.mutedDark, fontFamily: "Inter,sans-serif" }}
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

            {/* Rows */}
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

            {/* Footer */}
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
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ padding: mobile ? "64px 20px" : `0px ${PAD} 80px`, background: C.bg }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <div
            style={{
              background: C.primary,
              borderRadius: "16px",
              padding: mobile ? "36px 28px" : "40px 56px",
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              alignItems: mobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: "32px",
            }}
          >
            <div style={{ maxWidth: "560px" }}>
              <div
                style={{
                  fontSize: "28px",
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
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "Inter,sans-serif",
                  lineHeight: 1.7,
                }}
              >
                The complete sector analyses — including every scored venture, implementation framework, and capital
                breakdown — are available in the BRIDGE Resource Library.
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", flexShrink: 0 }}>
              <a
                href="/resources"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
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
                href="/resources"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
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

      <SiteFooter />
    </div>
  );
}
