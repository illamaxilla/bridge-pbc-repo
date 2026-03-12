import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BridgeLogo } from "@/components/BridgeLogo";
import { cn } from "@/lib/utils";
import {
  Lightbulb,
  Building2,
  Landmark,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Target,
  BarChart3,
  Shield,
  Globe,
  Award,
  Gift,
  Info,
  Check,
  Star,
  Clock,
  FileText,
  Users,
  Layers,
  DollarSign,
  MapPin,
  Search,
  PenTool,
  Rocket,
  Eye,
  Briefcase,
  Network,
  BookOpen,
  HeartHandshake,
  PieChart,
  GraduationCap,
  Compass,
  Megaphone,
  TrendingDown,
  Lock,
  LayoutGrid,
  ScrollText,
  Stethoscope,
  Hash,
  Map,
  ListChecks,
  Activity,
} from "lucide-react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────────── */
import { colors } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
const C = {
  ...colors,
  accentDim: "rgba(184,217,53,0.15)",
  bg: colors.background,
  teal: colors.ctaGreen,
  mid: "#2A6B56",
  line: "#D4DDD8",
  textDark: "#0F2A22",
  textMid: "#4A6A5E",
  dark: "#0A1F18",
};

/* ─── SEGMENT DATA ───────────────────────────────────────────────── */
const SEGMENTS = [
  {
    id: "entrepreneurs",
    label: "Entrepreneurs",
    Icon: Lightbulb,
    tagline: "From Concept to Capital",
    desc: "We turn promising ideas into funded, operational ventures — with advisory expertise, strategic capital, and on-ground execution that delivers measurable impact.",
    badge: "Incubation + Investment",
    steps: [
      {
        num: "01",
        title: "Discover",
        sub: "Submit Your Vision",
        body: "Share your concept through our Idea Portal. Every submission receives a structured response. We look for ventures that create dignity, security, and prosperity for Ghanaian communities — across all 12 sectors.",
        output: "Submission review & initial feedback within 14 days",
        Icon: Search,
      },
      {
        num: "02",
        title: "Assess",
        sub: "BRIDGE Impact Score™",
        body: "Our proprietary 100-point framework evaluates your venture across Peace & Prosperity alignment, feasibility, innovation, team capability, and strategic fit. This isn't a checkbox — it's a diagnostic that reveals your venture's full potential.",
        output: "Complete Impact Score report with dimension scores and strategic recommendations",
        Icon: BarChart3,
      },
      {
        num: "03",
        title: "Develop",
        sub: "Advisory & Incubation",
        body: "Our team works alongside you: refining your business model, building financial projections, designing your go-to-market strategy, and constructing investor-ready materials. This is where raw ideas become investable enterprises.",
        output: "Business plan, financial model, pitch deck, and strategic roadmap",
        Icon: PenTool,
      },
      {
        num: "04",
        title: "Fund",
        sub: "Capital Structuring",
        body: "We match your venture to the right instrument — seed ($100K–$500K), growth ($500K–$2M), or direct connection to our institutional investor network for larger raises. Capital follows conviction, and conviction is built here.",
        output: "Term sheet, investor introductions, or direct BRIDGE capital commitment",
        Icon: DollarSign,
      },
      {
        num: "05",
        title: "Scale",
        sub: "On-Ground Execution",
        body: "BRIDGE staff in Ghana support live implementation — troubleshooting challenges, facilitating government and regulatory relationships, and monitoring progress through quarterly milestone reviews. We don't disappear after the cheque.",
        output: "Execution liaison, live milestone tracking, and impact dashboard access",
        Icon: Rocket,
      },
    ],
    deliverables: [
      "Business Plan",
      "Financial Model",
      "Pitch Deck",
      "Capital Access",
      "Execution Support",
      "Impact Dashboard",
      "Investor Network",
      "Regulatory Navigation",
    ],
    stats: [
      { val: "$100K – $2M", lbl: "Typical Investment Range" },
      { val: "14 Days", lbl: "to First Response" },
      { val: "60,000+", lbl: "Diaspora Network" },
    ],
    cta: "Submit Your Idea",
    pathwayHeader: {
      eyebrow: "FOUNDER PATHWAY",
      headline: ["From first idea", "to funded venture."],
      desc: "Five stages, each producing a concrete output before the next begins. You know exactly where you stand — and what comes next — at every point.",
    },
    toolkit: {
      heading: "Your full toolkit for the journey",
      qualifier: "Score 65+ on the BRIDGE Impact Score™ to qualify for capital deployment.",
      cta: "Submit Your Venture",
      cards: [
        {
          Icon: Briefcase,
          title: "Business Development",
          body: "Concept validation, business planning, financial modeling, and pitch preparation for investor-ready ventures.",
        },
        {
          Icon: DollarSign,
          title: "Growth Capital",
          body: "$100K to $10M+ across seed, growth, expansion, and debt/mezzanine structures, matched to your stage.",
        },
        {
          Icon: Network,
          title: "Market Access",
          body: "Connections across 12 sectors, government relationships, and a diaspora professional network of 60,000+.",
        },
        {
          Icon: Shield,
          title: "Strategic Support",
          body: "Board advisory, governance frameworks, execution oversight, and milestone accountability built into every investment.",
        },
      ],
    },
  },
  {
    id: "institutions",
    label: "Business Institutions",
    Icon: Building2,
    tagline: "Strategic Partnership at Scale",
    desc: "We provide verified market intelligence, co-investment opportunities, and deep operational partnership for institutions ready to create impact at Ghana's pace of growth.",
    badge: "Co-Investment + Partnership",
    steps: [
      {
        num: "01",
        title: "Connect",
        sub: "Partnership Discovery",
        body: "Identify alignment between your institutional mandate and BRIDGE's 12-sector portfolio. We systematically map where your capabilities, capital, and reach amplify our ground-level Ghana impact — and where Ghana's growth serves your strategic interests.",
        output: "Sector alignment matrix and partnership opportunity brief",
        Icon: Globe,
      },
      {
        num: "02",
        title: "Align",
        sub: "Strategic Fit Assessment",
        body: "Joint analysis of complementary strengths. Your capital, expertise, and institutional reach — combined with our local intelligence, community trust, and execution infrastructure. We find the overlap that becomes the engine.",
        output: "Strategic fit assessment with co-investment opportunity shortlist",
        Icon: Target,
      },
      {
        num: "03",
        title: "Co-Design",
        sub: "Partnership Architecture",
        body: "We co-create the structure: co-investment agreements, MOU frameworks, resource-sharing arrangements, and shared impact metrics that satisfy your governance, compliance, and mandate requirements from day one.",
        output: "Partnership framework, MOU template, and shared KPI dashboard design",
        Icon: Layers,
      },
      {
        num: "04",
        title: "Deploy",
        sub: "Joint Implementation",
        body: "Coordinated execution with clear roles and clean handoffs. BRIDGE provides local navigation, community relationships, and implementation oversight. You bring institutional scale. Together, we move faster and reach further than either could alone.",
        output: "Joint implementation plan, roles matrix, and communication protocol",
        Icon: Rocket,
      },
      {
        num: "05",
        title: "Measure",
        sub: "Impact Verification",
        body: "Shared reporting frameworks aligned to your mandate and BRIDGE's Peace & Prosperity outcomes. Quarterly performance reviews, third-party verification, and annual impact documentation that stands up to institutional scrutiny.",
        output: "Quarterly impact reports, annual verification package, public benefit documentation",
        Icon: Activity,
      },
    ],
    deliverables: [
      "Partnership Framework",
      "Co-Investment Structures",
      "Market Intelligence",
      "Local Navigation",
      "Shared KPI Dashboard",
      "Third-Party Verification",
      "Network Access",
      "Policy Alignment",
    ],
    stats: [
      { val: "174+", lbl: "Portfolio Ventures" },
      { val: "2:1", lbl: "Capital Leverage Target" },
      { val: "60,000+", lbl: "Diaspora Network" },
    ],
    cta: "Explore Partnership",
    pathwayHeader: {
      eyebrow: "PARTNERSHIP PATHWAY",
      headline: ["Strategic alignment,", "joint execution."],
      desc: "Five structured stages from mandate alignment to verified impact — with clear deliverables, shared accountability, and governance built in from day one.",
    },
    toolkit: {
      heading: "Your full toolkit for the journey",
      qualifier: "Partnership structures assessed on a case-by-case basis against mission alignment.",
      cta: "Explore Partnership",
      cards: [
        {
          Icon: Network,
          title: "Diaspora Network",
          body: "60,000+ diaspora professionals, investors, and specialists connectable to your Ghana programs and initiatives.",
        },
        {
          Icon: DollarSign,
          title: "Co-Investment Capital",
          body: "BRIDGE joins as a co-investor or facilitates third-party capital alongside your program — targeting 2:1 leverage.",
        },
        {
          Icon: BarChart3,
          title: "BRIDGE Methodology",
          body: "Access the BRIDGE Impact Score™ as a standalone evaluation service for your own Ghana opportunity pipeline.",
        },
        {
          Icon: Compass,
          title: "Local Navigation",
          body: "Market intelligence, regulatory guidance, cultural advisory, and government relationships across all 16 regions.",
        },
      ],
    },
  },
  {
    id: "government",
    label: "Government Agencies",
    Icon: Landmark,
    tagline: "Policy Aligned. Execution Ready.",
    desc: "We translate government vision into investable programs — connecting national policy priorities with private capital, diaspora expertise, and proven implementation capacity.",
    badge: "Policy + Capital Mobilization",
    steps: [
      {
        num: "01",
        title: "Engage",
        sub: "Mandate Alignment",
        body: "Map your agency's priorities against BRIDGE's 12-sector research portfolio. We've produced 60,000+ words of rigorous sector analysis calibrated to the 2026 Budget and Sankofa Initiative. Your priorities are already on our map.",
        output: "Priority alignment matrix and sector relevance brief",
        Icon: MapPin,
      },
      {
        num: "02",
        title: "Inform",
        sub: "Intelligence Briefing",
        body: "Receive a custom briefing from our full analysis library: market gaps, investment opportunities, competitive landscape, existing actor mapping, and evidence-based policy leverage points — organized by your agency's mandate.",
        output: "Custom sector intelligence package and opportunity portfolio",
        Icon: FileText,
      },
      {
        num: "03",
        title: "Design",
        sub: "Program Architecture",
        body: "Co-design investment programs, PPP structures, or regulatory frameworks that attract private capital while achieving your public mandate. We build governance protections in from the start — not as an afterthought.",
        output: "Program design document, PPP framework, and regulatory implementation roadmap",
        Icon: PenTool,
      },
      {
        num: "04",
        title: "Activate",
        sub: "Capital Mobilization",
        body: "BRIDGE activates its full network — diaspora investors, institutional partners, DFIs, and impact capital — to fund government-aligned programs. We manage investor relations, due diligence, and deal structuring so your team doesn't have to.",
        output: "Capital mobilization plan, committed investor pipeline, and deployment schedule",
        Icon: DollarSign,
      },
      {
        num: "05",
        title: "Report",
        sub: "Policy Impact Evidence",
        body: "Rigorous PRECEDE-PROCEED evaluation aligned to your KPIs. Quarterly coordination meetings. Annual policy impact reports structured for parliamentary, cabinet, or donor presentation. Evidence that stands in the public record.",
        output: "Quarterly briefs, annual impact report, and parliamentary-ready documentation",
        Icon: Award,
      },
    ],
    deliverables: [
      "Sector Intelligence Reports",
      "PPP Program Design",
      "Investor Activation",
      "Regulatory Navigation",
      "Impact Reports",
      "Parliamentary Documentation",
      "Diaspora Engagement",
      "Ongoing Advisory",
    ],
    stats: [
      { val: "$100M+", lbl: "Mobilization Target" },
      { val: "2026 Budget", lbl: "Aligned Strategy" },
      { val: "60,000+", lbl: "Diaspora Experts" },
    ],
    cta: "Schedule a Briefing",
    pathwayHeader: {
      eyebrow: "GOVERNMENT PATHWAY",
      headline: ["Policy-aligned.", "Execution-ready."],
      desc: "From policy brief to on-ground deployment — each stage navigates procurement, compliance, and public accountability without slowing down delivery.",
    },
    toolkit: {
      heading: "Your full toolkit for the journey",
      qualifier: "Engagement structures tailored to each agency's mandate and budget cycle.",
      cta: "Initiate Government Engagement",
      cards: [
        {
          Icon: DollarSign,
          title: "Private Capital",
          body: "$100M+ portfolio ambition across 12 sectors, attracted alongside public investment with a 2:1 leverage ratio target.",
        },
        {
          Icon: GraduationCap,
          title: "Diaspora Expertise",
          body: "500+ professionals targeted as advisors, mentors, and technical specialists — active contributors to your program goals.",
        },
        {
          Icon: BookOpen,
          title: "Evidence-Based Design",
          body: "PRECEDE-PROCEED framework, BRIDGE Impact Score™, and quasi-experimental methodology applied to public program design.",
        },
        {
          Icon: Megaphone,
          title: "Policy Advocacy",
          body: "BRIDGE supports regulatory reform and ecosystem development through sector advisory panels and government engagement.",
        },
      ],
    },
  },
  {
    id: "investors",
    label: "Investors",
    Icon: TrendingUp,
    tagline: "Return with Purpose",
    desc: "We offer verified deal flow, rigorous due diligence, and blended finance structures that deliver both financial returns and measurable Ghanaian impact across 12 sectors.",
    badge: "Seed to Exit · All Structures",
    steps: [
      {
        num: "01",
        title: "Qualify",
        sub: "Investor Onboarding",
        body: "Join our authenticated investor portal. Share your thesis, return requirements, impact priorities, and preferred structures. Our team matches you to curated opportunities across 12 sectors — no noise, no wasted time.",
        output: "Investor profile, portfolio match list, and authenticated deal portal access",
        Icon: Shield,
      },
      {
        num: "02",
        title: "Review",
        sub: "Curated Deal Flow",
        body: "Every deal is BRIDGE Impact Score™-certified. Full packages include sector analysis, 3-year financial projections, risk assessment matrix, competitive landscape review, and verified impact metrics — before you take a single meeting.",
        output: "Full due diligence packages with Impact Score reports and financial models",
        Icon: Search,
      },
      {
        num: "03",
        title: "Structure",
        sub: "Blended Finance Design",
        body: "Choose your instrument and risk profile: equity ($100K–$10M), debt/mezzanine ($500K–$5M), DFI co-investment, or blended structures engineered to de-risk entry into Ghana's highest-growth sectors. We build the vehicle that fits your mandate.",
        output: "Term sheet, legal documentation, blended finance structure, and co-investor introductions",
        Icon: Layers,
      },
      {
        num: "04",
        title: "Deploy",
        sub: "Active Portfolio Monitoring",
        body: "Post-close, BRIDGE provides active portfolio monitoring, quarterly financial reporting, and hands-on portfolio company support — protecting your investment while actively accelerating value creation. We stay in.",
        output: "Portfolio dashboard access, quarterly financial reports, and annual investor summit",
        Icon: Eye,
      },
      {
        num: "05",
        title: "Realize",
        sub: "Strategic Exit Planning",
        body: "Exit strategy is designed on day one: secondary market, strategic acquirer, management buyout, or Ghana Stock Exchange listing. We manage the full process to maximize realized value — and we've already mapped the buyer landscape.",
        output: "Exit strategy document, buyer network access, and full transaction management",
        Icon: TrendingUp,
      },
    ],
    deliverables: [
      "Authenticated Deal Access",
      "BRIDGE Impact Score™ Reports",
      "Full Due Diligence",
      "Blended Finance Structures",
      "Portfolio Dashboard",
      "Quarterly Returns Reports",
      "Exit Planning",
      "DFI Co-Investment",
    ],
    stats: [
      { val: "$135–259M", lbl: "Portfolio Scale" },
      { val: "8–15%", lbl: "Target IRR" },
      { val: "Seed to Exit", lbl: "Full Lifecycle" },
    ],
    cta: "Access Deal Portal",
    pathwayHeader: {
      eyebrow: "INVESTOR PATHWAY",
      headline: ["Impact-scored deals.", "Verified returns."],
      desc: "Every opportunity is pre-scored, due-diligenced, and mandate-matched before you see it. You invest with evidence — not projection.",
    },
    toolkit: {
      heading: "Your full toolkit for the journey",
      qualifier: "Target IRR: 8–15% across portfolio. Minimum: $5K (individual) · $500K (institutional).",
      cta: "Explore Investment Access",
      cards: [
        {
          Icon: TrendingUp,
          title: "Attractive Returns",
          body: "8–15% target IRR across a diversified 12-sector portfolio with a 5–7 year fund life and 2-year extension option.",
        },
        {
          Icon: Lock,
          title: "De-Risked Entry",
          body: "BRIDGE Impact Score™ evaluates every venture before your capital is deployed. You invest with transparency and rigor.",
        },
        {
          Icon: PieChart,
          title: "Portfolio Diversification",
          body: "Exposure across 12 sectors and Ghana's $100M+ addressable development portfolio — with structured exit pathways.",
        },
        {
          Icon: ScrollText,
          title: "Full Transparency",
          body: "Quarterly financial reporting, Annual Benefit Report, third-party impact verification, and Investment Committee accountability.",
        },
      ],
    },
  },
];

/* ─── LOGO ──────────────────────────────────────────────────────── */

/* ─── ICON ARROW RIGHT ───────────────────────────────────────────── */
const IconArrowRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);


/* ─── COLORS ─────────────────────────────────────────────────────── */
const colors = { primary: "#1B4D3E", accent: "#B8D935", white: "#FFFFFF", line: "#DEDEDE" };


/* ─── HERO ──────────────────────────────────────────────────────── */
function Hero({ activeIdx, setActive }) {
  const isMobile = useIsMobile();
  return (
    <section className={cn("relative", isMobile ? "px-5 pt-16 pb-0" : "px-20 pt-20 pb-0")} style={{ background: C.primary }}>
      <div className="max-w-[1200px] mx-auto relative">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 bg-[rgba(184,217,53,0.12)] border border-[rgba(184,217,53,0.25)]">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
          <span className="font-['DM_Sans',sans-serif] text-[11px] font-bold tracking-[1.5px]" style={{ color: C.accent }}>
            THE BRIDGE PROCESS
          </span>
        </div>

        <h1
          className={cn(
            "font-['Poppins',sans-serif] font-light leading-[1.1] max-w-[900px] mb-5",
            isMobile ? "text-4xl tracking-[-0.5px]" : "text-[56px] tracking-[-1px]"
          )}
          style={{ color: C.white }}
        >
          Not one process —<br />
          <span className="font-bold" style={{ color: C.accent }}>one for each of you.</span>
        </h1>

        <p
          className={cn(
            "font-['DM_Sans',sans-serif] font-normal text-[rgba(255,255,255,0.65)] max-w-[780px] leading-[1.7]",
            isMobile ? "text-[15px] mb-10" : "text-lg mb-[60px]"
          )}
        >
          Four segments. Four dedicated processes. One standard of execution.
        </p>

        {/* Segment selector */}
        <div
          className={cn(isMobile ? "mx-[-20px] px-5 pt-4 pb-0" : "mx-[-80px] px-20 pt-5 pb-0")}
          style={{ background: C.primary }}
        >
          <div className="max-w-[1200px] mx-auto">
            <div className={cn("flex rounded-t-xl overflow-hidden", isMobile ? "gap-1" : "gap-1.5")}>
              {SEGMENTS.map((seg, i) => {
                const active = activeIdx === i;
                const Icon = seg.Icon;
                return (
                  <button
                    key={seg.id}
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex-1 border-b-0 rounded-t-[10px] cursor-pointer flex flex-col items-center justify-center transition-all duration-[250ms] ease-in-out",
                      isMobile ? "py-3 px-0 gap-1" : "py-4 px-0 gap-1.5",
                      active ? "border-none" : "border border-solid border-[rgba(255,255,255,0.09)]"
                    )}
                    style={{
                      background: active ? C.white : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className={cn(
                        "rounded-lg flex items-center justify-center",
                        isMobile ? "w-7 h-7" : "w-9 h-9"
                      )}
                      style={{ background: active ? C.bg : "rgba(255,255,255,0.08)" }}
                    >
                      <Icon
                        size={isMobile ? 13 : 17}
                        color={active ? C.primary : "rgba(255,255,255,0.6)"}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      className={cn(
                        "font-['Inter',sans-serif] font-semibold tracking-[0.4px] transition-colors duration-[250ms] ease-in-out",
                        isMobile ? "text-[8px]" : "text-[10px]"
                      )}
                      style={{ color: active ? C.textMid : "rgba(255,255,255,0.35)" }}
                    >
                      {seg.label.split(" ")[0].toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS TRACK ─────────────────────────────────────────────── */
function ProcessTrack({ seg, animKey }) {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useIsMobile();
  useEffect(() => {
    setActiveStep(0);
  }, [animKey]);

  return (
    <section className={cn(isMobile ? "px-5 pb-12" : "px-20 pb-20")} style={{ background: C.white }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Segment identity bar */}
        <div
          className={cn("rounded-b-2xl", isMobile ? "p-4 mb-14" : "px-10 py-6 mb-20")}
          style={{ background: C.bg }}
        >
          <div
            className={cn(
              "flex justify-between",
              isMobile ? "flex-col items-start gap-4" : "flex-row items-center gap-6"
            )}
          >
            {/* Left: icon + label */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: C.white, border: `1px solid ${C.line}` }}
              >
                <seg.Icon size={22} color={C.primary} strokeWidth={1.5} />
              </div>
              <div>
                <div
                  className={cn(
                    "font-['Poppins',sans-serif] font-bold tracking-[-0.3px] leading-[1.2]",
                    isMobile ? "text-[17px]" : "text-xl"
                  )}
                  style={{ color: C.primary }}
                >
                  {seg.label}
                </div>
                <div className="font-['DM_Sans',sans-serif] text-[13px] font-medium" style={{ color: C.textMid }}>
                  {seg.tagline}
                </div>
              </div>
            </div>
            {/* Stat cards */}
            <div className={cn("flex shrink-0", isMobile ? "gap-1.5 w-full" : "gap-2 w-auto")}>
              {seg.stats.map((s, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-[10px] text-center",
                    isMobile ? "py-2 px-3 flex-1 min-w-0" : "py-2.5 px-5 flex-none min-w-[120px]"
                  )}
                  style={{ background: C.white, border: `1px solid ${C.line}` }}
                >
                  <div
                    className={cn(
                      "font-['Poppins',sans-serif] font-bold tracking-[-0.3px]",
                      isMobile ? "text-xs" : "text-[15px]"
                    )}
                    style={{ color: C.primary }}
                  >
                    {s.val}
                  </div>
                  <div
                    className={cn(
                      "font-['DM_Sans',sans-serif] font-medium mt-0.5",
                      isMobile ? "text-[9px]" : "text-[11px]"
                    )}
                    style={{ color: C.textMid }}
                  >
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section header */}
        <div
          className={cn(
            "grid items-end",
            isMobile ? "grid-cols-1 gap-4 mb-8" : "grid-cols-[5fr_4fr] gap-20 mb-14"
          )}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 border border-[rgba(184,217,53,0.35)]"
              style={{ background: C.accentDim }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
              <span
                className="font-['DM_Sans',sans-serif] text-[11px] font-bold tracking-[1.5px]"
                style={{ color: C.primary }}
              >
                {seg.pathwayHeader.eyebrow}
              </span>
            </div>
            <h2
              className={cn(
                "font-['Poppins',sans-serif] font-light m-0 leading-[1.1] tracking-[-0.5px]",
                isMobile ? "text-[30px]" : "text-[42px]"
              )}
              style={{ color: C.primary }}
            >
              {seg.pathwayHeader.headline[0]}
              <br />
              <span className="font-bold">{seg.pathwayHeader.headline[1]}</span>
            </h2>
          </div>
          {!isMobile && (
            <div>
              <p
                className="font-['DM_Sans',sans-serif] text-base leading-[1.8] m-0"
                style={{ color: C.textMid }}
              >
                {seg.pathwayHeader.desc}
              </p>
            </div>
          )}
        </div>

        {/* Step rail — horizontal on desktop, scrollable on mobile */}
        <div className={cn(isMobile ? "mb-6" : "mb-12")}>
          {isMobile ? (
            /* Mobile: horizontal scroll pill tabs */
            <div
              className="rounded-full p-1 flex gap-1"
              style={{ background: C.bg, border: `1px solid ${C.line}` }}
            >
              {seg.steps.map((step, i) => {
                const active = activeStep === i;
                const done = i < activeStep;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="flex-1 border-none rounded-full py-2 px-1 cursor-pointer flex items-center justify-center transition-all duration-[250ms]"
                    style={{ background: active ? C.primary : "transparent" }}
                  >
                    <span
                      className="font-['Poppins',sans-serif] text-[11px] font-bold whitespace-nowrap"
                      style={{ color: active ? C.white : done ? C.teal : C.textMid }}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Desktop: icon rail */
            <>
              <div className="flex items-center justify-center mb-3">
                {seg.steps.map((step, i) => {
                  const active = activeStep === i;
                  const done = i < activeStep;
                  const SIcon = step.Icon;
                  return (
                    <React.Fragment key={i}>
                      <button
                        onClick={() => setActiveStep(i)}
                        className="flex items-center justify-center bg-none border-none cursor-pointer flex-1"
                      >
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out"
                          style={{
                            background: active ? C.primary : done ? C.teal : "transparent",
                            border: active
                              ? `3px solid ${C.accent}`
                              : done
                                ? `3px solid ${C.teal}`
                                : `2px solid ${C.line}`,
                            boxShadow: active ? `0 0 0 6px ${C.accentDim}, 0 4px 20px rgba(27,77,62,0.2)` : "none",
                          }}
                        >
                          {done ? (
                            <CheckCircle size={22} color={C.accent} strokeWidth={2} />
                          ) : (
                            <SIcon size={20} color={active ? C.accent : C.textMid} strokeWidth={1.5} />
                          )}
                        </div>
                      </button>
                      {i < seg.steps.length - 1 && (
                        <div className="shrink-0 flex items-center gap-0.5 select-none"
                        >
                          {[0, 1, 2].map((d) => (
                            <div
                              key={d}
                              className="w-1 h-0.5 rounded-[1px] transition-[background] duration-300 ease-in-out"
                              style={{ background: done ? C.accent : C.line }}
                            />
                          ))}
                          <div
                            className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent transition-[border-color] duration-300 ease-in-out"
                            style={{ borderLeft: `5px solid ${done ? C.accent : C.line}` }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="flex justify-center">
                {seg.steps.map((step, i) => {
                  const active = activeStep === i;
                  const done = i < activeStep;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className="flex-1 text-center bg-none border-none cursor-pointer px-1 py-0"
                    >
                      <div
                        className="font-['Poppins',sans-serif] text-[13px] font-bold"
                        style={{ color: active ? C.primary : done ? C.teal : C.textMid }}
                      >
                        {step.title}
                      </div>
                      <div
                        className="font-['DM_Sans',sans-serif] text-[11px] font-medium"
                        style={{ color: active ? C.textMid : "rgba(74,106,94,0.6)" }}
                      >
                        {step.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Active step detail panel */}
        {(() => {
          const step = seg.steps[activeStep];
          const SIcon = step.Icon;
          return (
            <div
              key={`${seg.id}-${activeStep}`}
              className={cn(
                "grid items-stretch animate-[fadeSlideUp_0.4s_ease_forwards]",
                isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-6"
              )}
            >
              {/* Left: Step body */}
              <div
                className={cn(
                  "rounded-2xl flex flex-col",
                  isMobile ? "p-6 min-h-[auto]" : "p-10 min-h-[260px]"
                )}
                style={{ background: C.primary }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-[10px] bg-[rgba(184,217,53,0.15)] flex items-center justify-center shrink-0">
                    <SIcon size={18} color={C.accent} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div
                      className="font-['DM_Sans',sans-serif] text-[10px] font-bold tracking-[1.5px]"
                      style={{ color: C.accent }}
                    >
                      STEP {step.num}
                    </div>
                    <div
                      className={cn(
                        "font-['Poppins',sans-serif] font-bold",
                        isMobile ? "text-[15px]" : "text-lg"
                      )}
                      style={{ color: C.white }}
                    >
                      {step.title} — {step.sub}
                    </div>
                  </div>
                </div>
                <p
                  className={cn(
                    "font-['DM_Sans',sans-serif] text-[rgba(255,255,255,0.75)] leading-[1.75] m-0 flex-1",
                    isMobile ? "text-sm" : "text-[15px]"
                  )}
                >
                  {step.body}
                </p>
              </div>

              {/* Right: Output + nav */}
              <div className="flex flex-col gap-3">
                <div
                  className={cn(
                    "rounded-2xl flex-1 flex flex-col justify-center border border-[rgba(184,217,53,0.3)]",
                    isMobile ? "p-5" : "p-8"
                  )}
                  style={{ background: C.accentDim }}
                >
                  <div className="flex items-center gap-2 mb-3.5">
                    <Gift size={16} color={C.primary} strokeWidth={2} />
                    <span
                      className="font-['DM_Sans',sans-serif] text-[11px] font-bold tracking-[1.2px]"
                      style={{ color: C.primary }}
                    >
                      WHAT YOU RECEIVE
                    </span>
                  </div>
                  <p
                    className={cn(
                      "font-['DM_Sans',sans-serif] leading-[1.65] mb-4 font-medium",
                      isMobile ? "text-sm" : "text-[15px]"
                    )}
                    style={{ color: C.textDark }}
                  >
                    {step.output}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: C.primary }}
                    >
                      <ArrowRight size={10} color={C.accent} />
                    </div>
                    <span
                      className="font-['DM_Sans',sans-serif] text-[11px] font-semibold"
                      style={{ color: C.textMid }}
                    >
                      Delivered before the next step begins
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="flex-1 p-3 rounded-full bg-transparent font-['DM_Sans',sans-serif] text-[13px] font-semibold transition-all duration-200"
                    style={{
                      border: `1px solid ${C.line}`,
                      cursor: activeStep === 0 ? "default" : "pointer",
                      color: activeStep === 0 ? "#C8C8C8" : C.textMid,
                    }}
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(seg.steps.length - 1, activeStep + 1))}
                    disabled={activeStep === seg.steps.length - 1}
                    className="flex-1 p-3 rounded-full bg-transparent font-['DM_Sans',sans-serif] text-[13px] font-semibold transition-all duration-200"
                    style={{
                      border: `1px solid ${activeStep === seg.steps.length - 1 ? C.line : C.textMid}`,
                      cursor: activeStep === seg.steps.length - 1 ? "default" : "pointer",
                      color: activeStep === seg.steps.length - 1 ? "#C8C8C8" : C.textMid,
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}

/* ─── TOOLKIT SECTION ───────────────────────────────────────────── */
function ToolkitSection({ seg }) {
  const { toolkit } = seg;
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <section className={cn(isMobile ? "px-5 py-0" : "px-20 pt-0 pb-20")} style={{ background: C.white }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section header / mobile toggle */}
        {isMobile ? (
          <button
            onClick={() => setOpen((o) => !o)}
            className="w-full py-6 px-0 flex items-center justify-between bg-none border-none cursor-pointer"
            style={{ borderBottom: open ? "none" : `1px solid ${C.line}` }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0 transition-[background] duration-200"
                style={{ background: open ? C.accent : C.line }}
              />
              <span
                className="font-['DM_Sans',sans-serif] text-[11px] font-bold tracking-[1.5px]"
                style={{ color: open ? C.primary : C.textMid }}
              >
                WHAT BRIDGE BRINGS
              </span>
            </div>
            <span
              className="text-lg font-light leading-none inline-block transition-transform duration-200"
              style={{
                color: open ? C.primary : C.textMid,
                transform: open ? "rotate(45deg)" : "none",
              }}
            >
              +
            </span>
          </button>
        ) : (
          <div
            className="pt-14 pb-9 mb-9 flex items-end justify-between"
            style={{ borderBottom: `1px solid ${C.line}` }}
          >
            <div>
              <div
                className="font-['DM_Sans',sans-serif] text-[11px] font-bold tracking-[1.5px] mb-2.5"
                style={{ color: C.textMid }}
              >
                WHAT BRIDGE BRINGS
              </div>
              <h2
                className="font-['Poppins',sans-serif] text-[30px] font-semibold m-0 tracking-[-0.4px]"
                style={{ color: C.primary }}
              >
                {toolkit.heading}
              </h2>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full py-1.5 px-3.5 border border-[rgba(184,217,53,0.35)]"
              style={{ background: C.accentDim }}
            >
              <seg.Icon size={13} color={C.primary} strokeWidth={2} />
              <span
                className="font-['DM_Sans',sans-serif] text-[11px] font-bold tracking-[0.5px]"
                style={{ color: C.primary }}
              >
                {seg.label}
              </span>
            </div>
          </div>
        )}
        {/* Content — always visible on desktop, toggled on mobile */}
        {(!isMobile || open) && (
          <div
            className={cn(
              isMobile ? "animate-[fadeSlideUp_0.25s_ease_forwards] pb-8" : "pb-0"
            )}
          >
            {/* 4-column card grid */}
            <div
              className={cn(
                "grid rounded-[14px] overflow-hidden mb-0",
                isMobile ? "grid-cols-2" : "grid-cols-4"
              )}
              style={{ border: `1px solid ${C.line}` }}
            >
              {toolkit.cards.map((card, i) => {
                const CardIcon = card.Icon;
                const isLastRow = isMobile ? i >= 2 : false;
                const isLastCol = isMobile ? i % 2 === 1 : i === 3;
                return (
                  <div
                    key={i}
                    className={cn(
                      "transition-[background] duration-200",
                      isMobile ? "p-5" : "py-8 px-7"
                    )}
                    style={{
                      borderRight: isLastCol ? "none" : "1px solid rgba(255,255,255,0.08)",
                      borderBottom: isMobile && !isLastRow ? "1px solid rgba(255,255,255,0.08)" : "none",
                      background: C.primary,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.teal)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = C.primary)}
                  >
                    <div className="w-11 h-11 rounded-[10px] bg-[rgba(184,217,53,0.12)] border border-[rgba(184,217,53,0.2)] flex items-center justify-center mb-4">
                      <CardIcon size={18} color={C.accent} strokeWidth={1.5} />
                    </div>
                    <div
                      className="font-['DM_Sans',sans-serif] text-sm font-bold mb-2 tracking-[-0.1px]"
                      style={{ color: C.white }}
                    >
                      {card.title}
                    </div>
                    <p className="font-['DM_Sans',sans-serif] text-[13px] text-[rgba(255,255,255,0.55)] leading-[1.7] m-0">
                      {card.body}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Qualifier + CTA footer bar */}
            <div
              className={cn(
                "rounded-b-[14px] flex justify-between border-t-0",
                isMobile ? "p-4 flex-col items-start gap-3" : "py-[18px] px-7 flex-row items-center gap-0"
              )}
              style={{ background: C.bg, border: `1px solid ${C.line}`, borderTop: "none" }}
            >
              <div className="flex items-start gap-2">
                <Info size={14} color={C.primary} strokeWidth={2} className="shrink-0 mt-px" />
                <span className="font-['DM_Sans',sans-serif] text-xs" style={{ color: C.textMid }}>
                  <span className="font-bold" style={{ color: C.textDark }}>Qualifier: </span>
                  {toolkit.qualifier}
                </span>
              </div>
              <button
                className={cn(
                  "border-none rounded-full py-2.5 px-[22px] font-['DM_Sans',sans-serif] font-extrabold text-[13px] cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0",
                  isMobile ? "w-full justify-center" : "w-auto justify-start"
                )}
                style={{ background: C.accent, color: C.primary }}
              >
                {toolkit.cta} <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}{" "}
        {/* end mobile toggle */}
      </div>
    </section>
  );
}

/* ─── DELIVERABLES SECTION ──────────────────────────────────────── */
function DeliverablesSection({ seg }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <section className={cn(isMobile ? "px-5 py-0" : "p-20")} style={{ background: C.bg }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Mobile toggle header */}
        {isMobile ? (
          <button
            onClick={() => setOpen((o) => !o)}
            className="w-full py-6 px-0 flex items-center justify-between bg-none border-none cursor-pointer"
            style={{ borderBottom: open ? "none" : `1px solid ${C.line}` }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0 transition-[background] duration-200"
                style={{ background: open ? C.accent : C.line }}
              />
              <span
                className="font-['DM_Sans',sans-serif] text-[11px] font-bold tracking-[1.5px]"
                style={{ color: open ? C.primary : C.textMid }}
              >
                WHAT YOU RECEIVE
              </span>
            </div>
            <span
              className="text-lg font-light leading-none inline-block transition-transform duration-200"
              style={{
                color: open ? C.primary : C.textMid,
                transform: open ? "rotate(45deg)" : "none",
              }}
            >
              +
            </span>
          </button>
        ) : null}
        {/* Content */}
        {(!isMobile || open) && (
          <div
            className={cn(
              isMobile ? "animate-[fadeSlideUp_0.25s_ease_forwards] pb-8" : "pb-0"
            )}
          >
            <div
              className={cn(
                "grid items-center",
                isMobile ? "grid-cols-1 gap-10" : "grid-cols-2 gap-20"
              )}
            >
              {/* Left copy */}
              <div>
                {!isMobile && (
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 border border-[rgba(184,217,53,0.35)]"
                    style={{ background: C.accentDim }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
                    <span
                      className="font-['DM_Sans',sans-serif] text-[11px] font-bold tracking-[1.5px]"
                      style={{ color: C.primary }}
                    >
                      WHAT YOU RECEIVE
                    </span>
                  </div>
                )}
                <h2
                  className={cn(
                    "font-['Poppins',sans-serif] font-light mb-5 leading-[1.15] tracking-[-0.5px]",
                    isMobile ? "text-[28px]" : "text-[38px]"
                  )}
                  style={{ color: C.primary }}
                >
                  Every engagement delivers <span className="font-bold">tangible outputs</span>
                </h2>
                <p
                  className={cn(
                    "font-['DM_Sans',sans-serif] leading-[1.75]",
                    isMobile ? "text-sm m-0" : "text-base mb-8"
                  )}
                  style={{ color: C.textMid }}
                >
                  {seg.desc}
                </p>
                {!isMobile && (
                  <button
                    className="inline-flex items-center gap-2.5 border-none rounded-full py-3.5 px-7 cursor-pointer transition-all duration-200"
                    style={{ background: C.primary }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.teal)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = C.primary)}
                  >
                    <span className="font-['DM_Sans',sans-serif] text-sm font-bold" style={{ color: C.white }}>
                      {seg.cta}
                    </span>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: C.accent }}
                    >
                      <ArrowRight size={13} color={C.primary} strokeWidth={2.5} />
                    </div>
                  </button>
                )}
              </div>

              {/* Right deliverables grid */}
              <div className={cn("flex flex-col", isMobile ? "gap-3" : "gap-0")}>
                <div className={cn("grid grid-cols-2", isMobile ? "gap-2" : "gap-3")}>
                  {seg.deliverables.map((d, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-xl flex items-center gap-2.5 transition-all duration-200",
                        isMobile ? "py-3 px-3.5" : "py-4 px-[18px]"
                      )}
                      style={{ background: C.white, border: `1px solid ${C.line}` }}
                    >
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                        style={{ background: C.accentDim }}
                      >
                        <Check size={14} color={C.primary} strokeWidth={2.5} />
                      </div>
                      <span
                        className={cn(
                          "font-['DM_Sans',sans-serif] font-semibold",
                          isMobile ? "text-xs" : "text-[13px]"
                        )}
                        style={{ color: C.textDark }}
                      >
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
                {isMobile && (
                  <button
                    className="inline-flex items-center justify-center gap-2.5 border-none rounded-full py-3.5 px-7 cursor-pointer transition-all duration-200 w-full mt-1"
                    style={{ background: C.primary }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.teal)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = C.primary)}
                  >
                    <span className="font-['DM_Sans',sans-serif] text-sm font-bold" style={{ color: C.white }}>
                      {seg.cta}
                    </span>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: C.accent }}
                    >
                      <ArrowRight size={13} color={C.primary} strokeWidth={2.5} />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}{" "}
        {/* end mobile toggle */}
      </div>
    </section>
  );
}

/* ─── METHODOLOGY SECTION ───────────────────────────────────────── */
const METHODOLOGY_STEPS = [
  {
    num: "01",
    title: "Diagnose",
    Icon: Stethoscope,
    headline: "Community-grounded diagnosis before any solution is considered.",
    body: "BRIDGE's diagnostic phase integrates four established community assessment frameworks into a unified Ghana-first protocol. We operate across six socio-ecological levels — individual, household, community, organizational, government, and transnational — ensuring no dimension of Ghanaian life is treated in isolation.",
    cardDesc:
      "We start with problems, not solutions — mapping what Ghanaian citizens, households, and communities actually experience on the ground.",
    methods: [
      "Household surveys with representative sampling across income, assets, and service access",
      "Sector-specific focus group discussions",
      "Key informant interviews with local leaders, officials, and service providers",
      "Participatory mapping led by community members",
      "Market and value chain analysis",
    ],
    output: "A baseline community profile grounded in locally-articulated priorities — not diaspora assumptions.",
    frameworks: [
      {
        title: "PRECEDE-PROCEED",
        body: "Extended from health promotion to whole-of-life Peace & Prosperity outcomes — systematic diagnosis across predisposing, enabling, and reinforcing factors.",
      },
      {
        title: "MAPP",
        body: "Mobilizing for Action through Planning and Partnerships — strategic community visioning, forces of change analysis, and collaborative priority-setting.",
      },
      {
        title: "ABCD",
        body: "Asset-Based Community Development — mapping local strengths, capacities, and existing leadership before examining gaps.",
      },
      {
        title: "CDC CHANGE Tool",
        body: "Sector-specific community assessment with practical policy, systems, and environment focus across all 12 BRIDGE sectors.",
      },
    ],
  },
  {
    num: "02",
    title: "Quantify",
    Icon: Hash,
    headline: "Every pain point gets a number. No number, no intervention.",
    body: "Diagnosis without quantification is guesswork. BRIDGE applies economic measurement to every identified challenge — converting lived experience into investment cases. This discipline separates prioritized action from good intentions and ensures capital flows to the highest-impact problems.",
    cardDesc:
      "Every challenge receives economic measurement. A $4–6B credit gap. $1.9B in post-harvest losses. Numbers that justify intervention.",
    methods: [
      "Direct economic impact sizing ($4–6B credit gap, $1.9B post-harvest losses, 32% energy transmission loss)",
      "Household income effect modeling",
      "Market price monitoring and farmgate-to-retail ratio analysis",
      "Investment threshold analysis — does problem scale justify capital deployment?",
    ],
    output:
      "A quantified case for intervention with investment thresholds, impact targets, and baseline metrics established before a single dollar is committed.",
    frameworks: [
      {
        title: "Economic Quantification",
        body: "Pain points are sized for economic impact: direct costs, productivity losses, foregone income, and downstream effects on household security.",
      },
      {
        title: "Market Systems Development (M4P)",
        body: "Problems analyzed through market lens — identifying systemic failures, missing functions, and leverage points where small interventions produce large effects.",
      },
      {
        title: "Value Chain Analysis",
        body: "Full value chain traced from producer to consumer — identifying where value is lost, captured, or transferred, and what interventions capture the most.",
      },
    ],
  },
  {
    num: "03",
    title: "Map",
    Icon: Map,
    headline: "We don't duplicate. We find the genuine white space.",
    body: "The graveyard of development finance is full of organizations that built what already existed. BRIDGE conducts systematic competitive landscape analysis across all 12 sectors — mapping every actor, program, and capital source before specifying a role for itself.",
    cardDesc:
      "Who is already working here? What can be strengthened? We identify genuine gaps rather than duplicate effort across 12 sectors.",
    methods: [
      "Actor profiling across government, NGO, DFI, and private sector",
      "Gap analysis identifying underserved populations, geographies, and service types",
      "Winners and losers analysis for each proposed intervention",
      "Partnership feasibility scoring",
    ],
    output:
      "An intervention white space map that confirms BRIDGE is adding value — not competing with existing actors or replicating programs that already exist.",
    frameworks: [
      {
        title: "Competitive Landscape Mapping",
        body: "Every operating actor is profiled: funding source, geographic coverage, intervention model, strengths, gaps, and receptivity to partnership.",
      },
      {
        title: "Political Economy Analysis",
        body: "For each landscape, we identify who benefits from current arrangements, who would be disrupted by change, and where resistance will emerge — before designing any intervention.",
      },
      {
        title: "Stakeholder Mapping",
        body: "Coalition-building analysis: which actors align with BRIDGE's mission? Which require management? Which represent partnership opportunities?",
      },
    ],
  },
  {
    num: "04",
    title: "Evaluate",
    Icon: ListChecks,
    headline: "100 points. Four dimensions. Zero guesswork.",
    body: "The BRIDGE Impact Score™ is a proprietary multi-criteria decision analysis framework that scores every opportunity before resources are committed. It synthesizes diagnostic findings, quantification outputs, and landscape analysis into a single defensible score — and it is deployable as a standalone advisory service.",
    cardDesc:
      "BRIDGE Impact Score™ — a 100-point proprietary assessment across Peace & Prosperity alignment, strategic fit, feasibility, and scalability.",
    methods: [
      "Peace & Prosperity Alignment (30 pts): Individual dignity, family security, community thriving",
      "Strategic Fit (25 pts): Sector alignment, BRIDGE role, portfolio synergy",
      "Feasibility & Execution (25 pts): Financial viability, team capability, risk profile",
      "Scalability & Sustainability (20 pts): Growth potential, long-term viability, systemic impact",
    ],
    output:
      "A scored, documented decision with structured engagement recommendation — defensible to investors, government partners, and development finance institutions.",
    frameworks: [
      {
        title: "Multi-Criteria Decision Analysis (MCDA)",
        body: "Systematic scoring across weighted dimensions prevents both enthusiasm bias and over-caution. Scores are transparent, revisable, and auditable.",
      },
      {
        title: "Political Economy Integration",
        body: "Winners/losers analysis feeds directly into Strategic Fit scoring — opportunities facing unmitigable resistance are scored down regardless of technical merit.",
      },
      {
        title: "Quasi-Experimental Pre-Design",
        body: "Before approval, evaluators design the counterfactual — how will we know this worked? Opportunities without measurable outcomes do not advance.",
      },
    ],
  },
  {
    num: "05",
    title: "Deploy",
    Icon: Rocket,
    headline: "Five modes. One framework. The right tool for every situation.",
    body: "BRIDGE does not have one way of engaging. Depending on strategic importance, existing capability, capital requirements, and community endorsement — we operate across five distinct engagement modes. Mode selection is disciplined, not opportunistic.",
    cardDesc:
      "Match the right resource to the right need. Some opportunities require capital. Others need expertise, policy change, or operational partnership.",
    methods: [
      "Mode 1: Guidance — regulatory navigation, partnership matchmaking, educational resources",
      "Mode 2: Advisory/Incubation — concept development, fundraising support, execution liaison",
      "Mode 3: Strategic Partnership — government co-design, institutional co-investment, NGO collaboration",
      "Mode 4: Portfolio Investment — seed ($100K–$500K) through expansion ($2M–$10M)",
      "Mode 5: Direct Operation — flagship projects under BRIDGE control (Kejetia model)",
    ],
    output:
      "A structured engagement with defined capital, role, governance, milestone requirements, and accountability mechanisms — signed before any resources move.",
    frameworks: [
      {
        title: "Engagement Mode Framework",
        body: "Guidance → Advisory/Incubation → Strategic Partnership → Portfolio Investment → Direct Operation. Each mode has explicit selection criteria, resource implications, and exit conditions.",
      },
      {
        title: "Blended Finance Architecture",
        body: "Concessional DFI capital (second-loss position, 3–6%) + diaspora capital (commercial layer, 8–15% IRR) + co-investment from institutions. Each tranche priced to risk profile.",
      },
      {
        title: "Governance Design",
        body: "Each deployment includes: board representation rights, milestone requirements, information covenants, impact measurement obligations, and defined exit provisions.",
      },
    ],
  },
  {
    num: "06",
    title: "Measure",
    Icon: Activity,
    headline: "Three tiers. Causal claims only where methodology supports them.",
    body: "BRIDGE measurement is tiered and honest. We distinguish operational metrics (what we did), development indicators (what changed), and Peace & Prosperity outcomes (whether lives improved). We use quasi-experimental methodology and attribution language only when design supports it — and we are transparent when it doesn't.",
    cardDesc:
      "Track what matters: Are Ghanaian families more secure? Are communities thriving? Are the specific problems we targeted actually improving?",
    methods: [
      "Difference-in-differences comparing BRIDGE-served vs. comparable unserved communities",
      "Propensity score matching on demographic, economic, and geographic characteristics",
      "Regression discontinuity exploiting credit score thresholds for financial inclusion impact",
      "Bootstrap resampling for confidence interval estimation",
      "Sensitivity analysis across specifications, subgroups, and time periods",
    ],
    output:
      "A credible impact claim — with honest confidence intervals, acknowledged confounds, and transparent methodology — that withstands academic, investor, and government scrutiny.",
    frameworks: [
      {
        title: "Three-Tier Measurement Framework",
        body: "Tier 1: Peace & Prosperity outcomes (dignity, security, thriving). Tier 2: Development indicators (income, financial inclusion, health, employment). Tier 3: Operational metrics (capital deployed, jobs created, ventures supported).",
      },
      {
        title: "Quasi-Experimental Design",
        body: "Treatment-comparison group analysis, difference-in-differences, propensity score matching, and sensitivity analysis to establish credible causal inference without unethical randomization.",
      },
      {
        title: "Third-Party Verification",
        body: "Annual Benefit Report (required by PBC law) + independent external evaluation at midterm and endline + B Impact Assessment + academic research partnerships.",
      },
    ],
  },
];

/* ─── MOBILE METHODOLOGY ACCORDION ─────────────────────────────── */
function MobileMethodologyAccordion({ step }) {
  const [openSection, setOpenSection] = useState(0);
  const toggle = (i) => setOpenSection((prev) => (prev === i ? null : i));

  const SECTIONS = [
    {
      label: "OVERVIEW",
      content: (
        <p className="font-['DM_Sans',sans-serif] text-sm leading-[1.8] m-0" style={{ color: C.textMid }}>
          {step.body}
        </p>
      ),
    },
    {
      label: "METHODS APPLIED",
      content: (
        <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
          {step.methods.map((m, mi) => (
            <li key={mi} className="flex gap-2.5 items-start">
              <div
                className="w-[5px] h-[5px] rounded-full mt-[7px] shrink-0"
                style={{ background: C.accent, border: `1px solid ${C.primary}` }}
              />
              <span className="font-['DM_Sans',sans-serif] text-[13px] leading-[1.65]" style={{ color: C.textMid }}>
                {m}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "WHAT THIS PRODUCES",
      content: (
        <div
          className="rounded-[10px] py-4 px-[18px] border border-[rgba(184,217,53,0.4)]"
          style={{ background: C.accentDim }}
        >
          <p
            className="font-['DM_Sans',sans-serif] text-sm leading-[1.7] m-0 italic"
            style={{ color: C.textDark }}
          >
            {step.output}
          </p>
        </div>
      ),
    },
    {
      label: "FRAMEWORKS & THEORY",
      content: (
        <div className="flex flex-col gap-2.5">
          {step.frameworks.map((fw, fi) => (
            <div
              key={fi}
              className="rounded-[10px] py-4 px-[18px]"
              style={{ background: C.bg, border: `1px solid ${C.line}` }}
            >
              <div
                className="font-['DM_Sans',sans-serif] text-[13px] font-bold mb-1.5"
                style={{ color: C.primary }}
              >
                {fw.title}
              </div>
              <p
                className="font-['DM_Sans',sans-serif] text-xs leading-[1.7] m-0"
                style={{ color: C.textMid }}
              >
                {fw.body}
              </p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      {SECTIONS.map((sec, i) => {
        const isOpen = openSection === i;
        const isLast = i === SECTIONS.length - 1;
        return (
          <div key={i} style={{ borderBottom: isLast ? "none" : `1px solid ${C.line}` }}>
            {/* Accordion header */}
            <button
              onClick={() => toggle(i)}
              className="w-full py-4 px-5 flex items-center justify-between border-none cursor-pointer transition-[background] duration-200"
              style={{ background: isOpen ? C.bg : C.white }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0 transition-[background] duration-200"
                  style={{ background: isOpen ? C.accent : C.line }}
                />
                <span
                  className="font-['DM_Sans',sans-serif] text-[11px] font-bold tracking-[1.2px]"
                  style={{ color: isOpen ? C.primary : C.textMid }}
                >
                  {sec.label}
                </span>
              </div>
              <span
                className="text-base leading-none font-light inline-block transition-transform duration-200"
                style={{
                  color: isOpen ? C.primary : C.textMid,
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}
              >
                +
              </span>
            </button>
            {/* Accordion body */}
            {isOpen && (
              <div className="pt-1 px-5 pb-5 animate-[fadeSlideUp_0.25s_ease_forwards]">
                {sec.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MethodologySection() {
  const [activeStep, setActiveStep] = useState(null);
  const isMobile = useIsMobile();
  const toggle = (i) => setActiveStep((prev) => (prev === i ? null : i));

  return (
    <section className={cn(isMobile ? "pt-12 px-5 pb-0" : "pt-20 px-20 pb-0")} style={{ background: C.white }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div
          className={cn(
            "grid items-start",
            isMobile ? "grid-cols-1 gap-4 mb-8" : "grid-cols-2 gap-[60px] mb-16"
          )}
        >
          <div>
            <div
              className="font-['DM_Sans',sans-serif] text-[11px] font-bold tracking-[1.5px] mb-4"
              style={{ color: C.textMid }}
            >
              OUR METHODOLOGY
            </div>
            <h2
              className={cn(
                "font-['Poppins',sans-serif] font-light m-0 leading-[1.1] tracking-[-1px]",
                isMobile ? "text-[32px]" : "text-5xl"
              )}
              style={{ color: C.primary }}
            >
              One process.
              <br />
              <span className="font-bold">Six disciplines.</span>
            </h2>
          </div>
          {!isMobile && (
            <div className="pt-2">
              <p
                className="font-['DM_Sans',sans-serif] text-[17px] leading-[1.75] m-0"
                style={{ color: C.textMid }}
              >
                Every BRIDGE engagement — regardless of who you are — is grounded in the same diagnostic sequence. We
                don't impose solutions. We uncover root causes, measure economic scale, and match resources with
                precision to locally-defined priorities.
              </p>
            </div>
          )}
        </div>

        {/* Step cards */}
        <div className="relative">
          <div
            className="hide-scrollbar flex gap-4 overflow-x-auto overflow-y-visible snap-x snap-mandatory pb-1 [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            {METHODOLOGY_STEPS.map((step, i) => {
              const active = activeStep === i;
              const SIcon = step.Icon;
              return (
                <div
                  key={i}
                  onClick={() => toggle(i)}
                  className={cn(
                    "min-w-0 snap-start rounded-2xl cursor-pointer transition-all duration-[250ms] ease-in-out flex flex-col justify-between",
                    isMobile ? "flex-[0_0_calc(80%-8px)] p-5 min-h-[220px]" : "flex-[0_0_calc(33.333%-11px)] pt-7 px-7 pb-6 min-h-[260px]"
                  )}
                  style={{
                    background: active ? C.primary : C.bg,
                    border: `1px solid ${active ? C.primary : C.line}`,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-11 h-11 rounded-[10px] flex items-center justify-center"
                        style={{
                          background: active ? "rgba(255,255,255,0.1)" : C.white,
                          border: `1px solid ${active ? "rgba(255,255,255,0.15)" : C.line}`,
                        }}
                      >
                        <SIcon size={20} color={active ? C.accent : C.primary} strokeWidth={1.5} />
                      </div>
                      <span
                        className="font-['Inter',sans-serif] text-[11px] font-bold tracking-[1px]"
                        style={{ color: active ? "rgba(255,255,255,0.3)" : C.line }}
                      >
                        {step.num}
                      </span>
                    </div>
                    <div
                      className="font-['Poppins',sans-serif] text-[17px] font-bold mb-2.5 tracking-[-0.3px]"
                      style={{ color: active ? C.white : C.primary }}
                    >
                      {step.title}
                    </div>
                    <p
                      className="font-['DM_Sans',sans-serif] text-[13px] leading-[1.7] m-0"
                      style={{ color: active ? "rgba(255,255,255,0.6)" : C.textMid }}
                    >
                      {step.cardDesc}
                    </p>
                  </div>
                  <div
                    className="flex items-center justify-between mt-6 pt-4"
                    style={{ borderTop: `1px solid ${active ? "rgba(255,255,255,0.1)" : C.line}` }}
                  >
                    <span
                      className="font-['DM_Sans',sans-serif] text-xs font-bold"
                      style={{ color: active ? C.accent : C.primary }}
                    >
                      {active ? "Close \u2191" : "Deep dive \u2193"}
                    </span>
                    {active && (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: C.accent }}
                      >
                        <span className="text-[10px] font-bold" style={{ color: C.primary }}>✓</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expanded panel */}
        {activeStep !== null &&
          (() => {
            const step = METHODOLOGY_STEPS[activeStep];
            const SIcon = step.Icon;
            return (
              <div
                key={activeStep}
                className="rounded-2xl mt-8 overflow-hidden animate-[fadeSlideUp_0.35s_ease_forwards]"
                style={{ background: C.white, border: `2px solid ${C.primary}` }}
              >
                {/* Panel header */}
                <div
                  className={cn(
                    "flex items-center gap-4",
                    isMobile ? "pt-6 px-5 pb-5" : "pt-8 px-10 pb-6"
                  )}
                  style={{ borderBottom: `1px solid ${C.line}` }}
                >
                  <div
                    className="w-12 h-12 rounded-[10px] shrink-0 flex items-center justify-center"
                    style={{ background: C.primary }}
                  >
                    <SIcon size={20} color={C.accent} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div
                      className="font-['DM_Sans',sans-serif] text-[10px] font-bold tracking-[1.5px] mb-1"
                      style={{ color: C.textMid }}
                    >
                      STEP {step.num} — {step.title.toUpperCase()}
                    </div>
                    <h3
                      className={cn(
                        "font-['Poppins',sans-serif] font-bold m-0 tracking-[-0.3px] leading-[1.2]",
                        isMobile ? "text-[17px]" : "text-[22px]"
                      )}
                      style={{ color: C.primary }}
                    >
                      {step.headline}
                    </h3>
                  </div>
                </div>

                {/* Panel body */}
                {isMobile ? (
                  <MobileMethodologyAccordion step={step} />
                ) : (
                  <div className="grid grid-cols-2 gap-0">
                    <div className="py-8 px-10" style={{ borderRight: `1px solid ${C.line}` }}>
                      <p
                        className="font-['DM_Sans',sans-serif] text-[15px] leading-[1.8] mb-7"
                        style={{ color: C.textMid }}
                      >
                        {step.body}
                      </p>
                      <div
                        className="font-['DM_Sans',sans-serif] text-[10px] font-bold tracking-[1.2px] mb-3.5"
                        style={{ color: C.primary }}
                      >
                        METHODS APPLIED
                      </div>
                      <ul className="mb-7 p-0 list-none flex flex-col gap-2.5">
                        {step.methods.map((m, mi) => (
                          <li key={mi} className="flex gap-2.5 items-start">
                            <div
                              className="w-[5px] h-[5px] rounded-full mt-[7px] shrink-0"
                              style={{ background: C.accent, border: `1px solid ${C.primary}` }}
                            />
                            <span
                              className="font-['DM_Sans',sans-serif] text-[13px] leading-[1.65]"
                              style={{ color: C.textMid }}
                            >
                              {m}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div
                        className="rounded-[10px] py-[18px] px-5 border border-[rgba(184,217,53,0.4)]"
                        style={{ background: C.accentDim }}
                      >
                        <div
                          className="font-['DM_Sans',sans-serif] text-[10px] font-bold tracking-[1.2px] mb-2.5"
                          style={{ color: C.primary }}
                        >
                          WHAT THIS PRODUCES
                        </div>
                        <p
                          className="font-['DM_Sans',sans-serif] text-sm leading-[1.7] m-0 italic"
                          style={{ color: C.textDark }}
                        >
                          {step.output}
                        </p>
                      </div>
                    </div>
                    <div className="py-8 px-10" style={{ background: C.bg }}>
                      <div
                        className="font-['DM_Sans',sans-serif] text-[10px] font-bold tracking-[1.2px] mb-4"
                        style={{ color: C.textMid }}
                      >
                        FRAMEWORKS & THEORY
                      </div>
                      <div className="flex flex-col gap-3">
                        {step.frameworks.map((fw, fi) => (
                          <div
                            key={fi}
                            className="rounded-[10px] py-[18px] px-5"
                            style={{ background: C.white, border: `1px solid ${C.line}` }}
                          >
                            <div
                              className="font-['DM_Sans',sans-serif] text-[13px] font-bold mb-1.5"
                              style={{ color: C.primary }}
                            >
                              {fw.title}
                            </div>
                            <p
                              className="font-['DM_Sans',sans-serif] text-xs leading-[1.7] m-0"
                              style={{ color: C.textMid }}
                            >
                              {fw.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

        <div className={cn(isMobile ? "h-12" : "h-20")} />
      </div>
    </section>
  );
}

/* ─── CTA SECTION ────────────────────────────────────────────────── */
function CTASection({ seg }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const ctaText = {
    Entrepreneurs: "Submit your idea today. Our team reviews every submission and responds within 14 days.",
    "Business Institutions":
      "Schedule a partnership discovery call. We'll identify alignment opportunities within your first conversation.",
    "Government Agencies":
      "Book a sector intelligence briefing. One hour with our team will reveal investment pathways you haven't seen yet.",
    Investors: "Request authenticated portal access. Our first deals are already impact-scored and investor-ready.",
  };
  return (
    <section className={cn(isMobile ? "py-10 px-5" : "p-20")} style={{ background: C.white }}>
      <div className="max-w-[1200px] mx-auto">
        <div
          className={cn(
            "relative",
            isMobile ? "rounded-2xl p-6" : "rounded-[20px] py-16 px-20"
          )}
          style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.teal} 100%)` }}
        >
          <div
            className={cn(
              "flex justify-between",
              isMobile ? "flex-col items-start gap-8" : "flex-row items-center gap-10"
            )}
          >
            <div className={cn(isMobile ? "max-w-full" : "max-w-[560px]")}>
              <div
                className="font-['DM_Sans',sans-serif] text-[11px] font-bold tracking-[1.5px] mb-4"
                style={{ color: C.accent }}
              >
                NEXT STEP
              </div>
              <h2
                className={cn(
                  "font-['Poppins',sans-serif] font-bold mb-4 tracking-[-0.5px] leading-[1.2]",
                  isMobile ? "text-[26px]" : "text-4xl"
                )}
                style={{ color: C.white }}
              >
                Ready to begin your BRIDGE journey?
              </h2>
              <p
                className={cn(
                  "font-['DM_Sans',sans-serif] text-[rgba(255,255,255,0.65)] m-0 leading-[1.65]",
                  isMobile ? "text-sm" : "text-base"
                )}
              >
                {ctaText[seg.label]}
              </p>
            </div>
            <div className={cn("flex flex-col gap-3 shrink-0", isMobile ? "w-full" : "w-auto")}>
              <button
                onClick={() => navigate("/contact")}
                className={cn(
                  "border-none rounded-full font-['DM_Sans',sans-serif] font-extrabold cursor-pointer flex items-center justify-center gap-2.5",
                  isMobile ? "py-4 px-7 text-sm w-full" : "py-[18px] px-9 text-[15px] w-auto"
                )}
                style={{ background: C.accent, color: C.primary }}
              >
                {seg.cta} <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/resources")}
                className={cn(
                  "bg-transparent border border-[rgba(255,255,255,0.25)] rounded-full font-['DM_Sans',sans-serif] font-semibold text-sm cursor-pointer",
                  isMobile ? "py-3.5 px-7 w-full" : "py-3.5 px-9 w-auto"
                )}
                style={{ color: C.white }}
              >
                Download Process Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────── */
/* ─── GLOBAL STYLES ──────────────────────────────────────────────── */
const GLOBAL_CSS = `

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #F3F5F2; -webkit-text-size-adjust: 100%; }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  button:focus { outline: none; }
  button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #F3F5F2; }
  ::-webkit-scrollbar-thumb { background: #D4DDD8; border-radius: 3px; }
  img, svg { max-width: 100%; }
  @media (max-width: 768px) {
    h1, h2, h3 { word-break: break-word; }
  }
`;

/* ─── ROOT COMPONENT ─────────────────────────────────────────────── */
export default function HowWeWorkPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const handleSetActive = (i) => {
    setActiveIdx(i);
    setAnimKey((k) => k + 1);
  };

  const seg = SEGMENTS[activeIdx];

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Layout>
      <div className="min-h-screen font-['DM_Sans',sans-serif]">
        <Hero activeIdx={activeIdx} setActive={handleSetActive} />
        <ProcessTrack key={animKey} seg={seg} animKey={animKey} />
        <ToolkitSection seg={seg} />
        <DeliverablesSection seg={seg} />
        <MethodologySection />
        <CTASection seg={seg} />
      </div>
      </Layout>
    </>
  );
}
