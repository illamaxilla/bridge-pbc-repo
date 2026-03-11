import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BridgeLogo } from "@/components/BridgeLogo";
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
import { useIsMobile } from "@/hooks/use-mobile";
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
    <section style={{ background: C.primary, padding: isMobile ? "64px 20px 0" : "80px 80px 0", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(184,217,53,0.12)",
            border: `1px solid rgba(184,217,53,0.25)`,
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 20,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: C.accent,
              letterSpacing: "1.5px",
            }}
          >
            THE BRIDGE PROCESS
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: isMobile ? 36 : 56,
            fontWeight: 300,
            color: C.white,
            margin: "0 0 20px",
            lineHeight: 1.1,
            maxWidth: 900,
            letterSpacing: isMobile ? "-0.5px" : "-1px",
          }}
        >
          Not one process —<br />
          <span style={{ fontWeight: 700, color: C.accent }}>one for each of you.</span>
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: isMobile ? 15 : 18,
            fontWeight: 400,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 780,
            lineHeight: 1.7,
            margin: isMobile ? "0 0 40px" : "0 0 60px",
          }}
        >
          Four segments. Four dedicated processes. One standard of execution.
        </p>

        {/* Segment selector */}
        <div
          style={{
            margin: isMobile ? "0 -20px" : "0 -80px",
            padding: isMobile ? "16px 20px 0" : "20px 80px 0",
            background: C.primary,
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: isMobile ? 4 : 6, borderRadius: "12px 12px 0 0", overflow: "hidden" }}>
              {SEGMENTS.map((seg, i) => {
                const active = activeIdx === i;
                const Icon = seg.Icon;
                return (
                  <button
                    key={seg.id}
                    onClick={() => setActive(i)}
                    style={{
                      flex: 1,
                      background: active ? C.white : "rgba(255,255,255,0.06)",
                      border: active ? "none" : "1px solid rgba(255,255,255,0.09)",
                      borderBottom: "none",
                      borderRadius: "10px 10px 0 0",
                      padding: isMobile ? "12px 0 10px" : "16px 0 14px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: isMobile ? 4 : 6,
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div
                      style={{
                        width: isMobile ? 28 : 36,
                        height: isMobile ? 28 : 36,
                        borderRadius: 8,
                        background: active ? C.bg : "rgba(255,255,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        size={isMobile ? 13 : 17}
                        color={active ? C.primary : "rgba(255,255,255,0.6)"}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: isMobile ? 8 : 10,
                        fontWeight: 600,
                        letterSpacing: "0.4px",
                        color: active ? C.textMid : "rgba(255,255,255,0.35)",
                        transition: "color 0.25s ease",
                      }}
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
    <section style={{ background: C.white, padding: isMobile ? "0 20px 48px" : "0 80px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Segment identity bar */}
        <div
          style={{
            background: C.bg,
            borderRadius: "0 0 16px 16px",
            padding: isMobile ? "16px 20px" : "24px 40px",
            marginBottom: isMobile ? 56 : 80,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: isMobile ? 16 : 24,
            }}
          >
            {/* Left: icon + label */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: C.white,
                  border: `1px solid ${C.line}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <seg.Icon size={22} color={C.primary} strokeWidth={1.5} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: isMobile ? 17 : 20,
                    fontWeight: 700,
                    color: C.primary,
                    letterSpacing: "-0.3px",
                    lineHeight: 1.2,
                  }}
                >
                  {seg.label}
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.textMid, fontWeight: 500 }}>
                  {seg.tagline}
                </div>
              </div>
            </div>
            {/* Stat cards */}
            <div style={{ display: "flex", gap: isMobile ? 6 : 8, flexShrink: 0, width: isMobile ? "100%" : "auto" }}>
              {seg.stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: C.white,
                    border: `1px solid ${C.line}`,
                    borderRadius: 10,
                    padding: isMobile ? "8px 12px" : "10px 20px",
                    textAlign: "center",
                    flex: isMobile ? 1 : "none",
                    minWidth: isMobile ? 0 : 120,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Poppins',sans-serif",
                      fontSize: isMobile ? 12 : 15,
                      fontWeight: 700,
                      color: C.primary,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: isMobile ? 9 : 11,
                      color: C.textMid,
                      fontWeight: 500,
                      marginTop: 2,
                    }}
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
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "5fr 4fr",
            gap: isMobile ? 16 : 80,
            alignItems: "flex-end",
            marginBottom: isMobile ? 32 : 56,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: C.accentDim,
                border: `1px solid rgba(184,217,53,0.35)`,
                borderRadius: 100,
                padding: "6px 16px",
                marginBottom: 16,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.primary,
                  letterSpacing: "1.5px",
                }}
              >
                {seg.pathwayHeader.eyebrow}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: isMobile ? 30 : 42,
                fontWeight: 300,
                color: C.primary,
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
              }}
            >
              {seg.pathwayHeader.headline[0]}
              <br />
              <span style={{ fontWeight: 700 }}>{seg.pathwayHeader.headline[1]}</span>
            </h2>
          </div>
          {!isMobile && (
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 16,
                  color: C.textMid,
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {seg.pathwayHeader.desc}
              </p>
            </div>
          )}
        </div>

        {/* Step rail — horizontal on desktop, scrollable on mobile */}
        <div style={{ marginBottom: isMobile ? 24 : 48 }}>
          {isMobile ? (
            /* Mobile: horizontal scroll pill tabs */
            <div
              style={{
                background: C.bg,
                border: `1px solid ${C.line}`,
                borderRadius: 50,
                padding: "4px",
                display: "flex",
                gap: 4,
              }}
            >
              {seg.steps.map((step, i) => {
                const active = activeStep === i;
                const done = i < activeStep;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    style={{
                      flex: 1,
                      background: active ? C.primary : "transparent",
                      border: "none",
                      borderRadius: 50,
                      padding: "8px 4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.25s",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        color: active ? C.white : done ? C.teal : C.textMid,
                        whiteSpace: "nowrap",
                      }}
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                {seg.steps.map((step, i) => {
                  const active = activeStep === i;
                  const done = i < activeStep;
                  const SIcon = step.Icon;
                  return (
                    <React.Fragment key={i}>
                      <button
                        onClick={() => setActiveStep(i)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            background: active ? C.primary : done ? C.teal : "transparent",
                            border: active
                              ? `3px solid ${C.accent}`
                              : done
                                ? `3px solid ${C.teal}`
                                : `2px solid ${C.line}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.3s ease",
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
                        <div
                          style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 2, userSelect: "none" }}
                        >
                          {[0, 1, 2].map((d) => (
                            <div
                              key={d}
                              style={{
                                width: 4,
                                height: 2,
                                borderRadius: 1,
                                background: done ? C.accent : C.line,
                                transition: "background 0.3s ease",
                              }}
                            />
                          ))}
                          <div
                            style={{
                              width: 0,
                              height: 0,
                              borderTop: "4px solid transparent",
                              borderBottom: "4px solid transparent",
                              borderLeft: `5px solid ${done ? C.accent : C.line}`,
                              transition: "border-color 0.3s ease",
                            }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {seg.steps.map((step, i) => {
                  const active = activeStep === i;
                  const done = i < activeStep;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0 4px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Poppins',sans-serif",
                          fontSize: 13,
                          fontWeight: 700,
                          color: active ? C.primary : done ? C.teal : C.textMid,
                        }}
                      >
                        {step.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 11,
                          color: active ? C.textMid : "rgba(74,106,94,0.6)",
                          fontWeight: 500,
                        }}
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
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? 16 : 24,
                animation: "fadeSlideUp 0.4s ease forwards",
                alignItems: isMobile ? "stretch" : "stretch",
              }}
            >
              {/* Left: Step body */}
              <div
                style={{
                  background: C.primary,
                  borderRadius: 16,
                  padding: isMobile ? 24 : 40,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: isMobile ? "auto" : 260,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(184,217,53,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <SIcon size={18} color={C.accent} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        color: C.accent,
                        letterSpacing: "1.5px",
                      }}
                    >
                      STEP {step.num}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: isMobile ? 15 : 18,
                        fontWeight: 700,
                        color: C.white,
                      }}
                    >
                      {step.title} — {step.sub}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: isMobile ? 14 : 15,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.75,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {step.body}
                </p>
              </div>

              {/* Right: Output + nav */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div
                  style={{
                    background: C.accentDim,
                    border: `1px solid rgba(184,217,53,0.3)`,
                    borderRadius: 16,
                    padding: isMobile ? 20 : 32,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <Gift size={16} color={C.primary} strokeWidth={2} />
                    <span
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        color: C.primary,
                        letterSpacing: "1.2px",
                      }}
                    >
                      WHAT YOU RECEIVE
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: isMobile ? 14 : 15,
                      color: C.textDark,
                      lineHeight: 1.65,
                      margin: "0 0 16px",
                      fontWeight: 500,
                    }}
                  >
                    {step.output}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: C.primary,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowRight size={10} color={C.accent} />
                    </div>
                    <span
                      style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: C.textMid, fontWeight: 600 }}
                    >
                      Delivered before the next step begins
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: 50,
                      background: "transparent",
                      border: `1px solid ${C.line}`,
                      cursor: activeStep === 0 ? "default" : "pointer",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: activeStep === 0 ? "#C8C8C8" : C.textMid,
                      transition: "all 0.2s",
                    }}
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(seg.steps.length - 1, activeStep + 1))}
                    disabled={activeStep === seg.steps.length - 1}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: 50,
                      background: "transparent",
                      border: `1px solid ${activeStep === seg.steps.length - 1 ? C.line : C.textMid}`,
                      cursor: activeStep === seg.steps.length - 1 ? "default" : "pointer",
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: activeStep === seg.steps.length - 1 ? "#C8C8C8" : C.textMid,
                      transition: "all 0.2s",
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
    <section style={{ background: C.white, padding: isMobile ? "0 20px 0" : "0 80px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section header / mobile toggle */}
        {isMobile ? (
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              width: "100%",
              padding: "24px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "none",
              border: "none",
              borderBottom: open ? "none" : `1px solid ${C.line}`,
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: open ? C.accent : C.line,
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: open ? C.primary : C.textMid,
                  letterSpacing: "1.5px",
                }}
              >
                WHAT BRIDGE BRINGS
              </span>
            </div>
            <span
              style={{
                fontSize: 18,
                color: open ? C.primary : C.textMid,
                fontWeight: 300,
                lineHeight: 1,
                display: "inline-block",
                transition: "transform 0.2s",
                transform: open ? "rotate(45deg)" : "none",
              }}
            >
              +
            </span>
          </button>
        ) : (
          <div
            style={{
              padding: "56px 0 36px",
              borderBottom: `1px solid ${C.line}`,
              marginBottom: 36,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.textMid,
                  letterSpacing: "1.5px",
                  marginBottom: 10,
                }}
              >
                WHAT BRIDGE BRINGS
              </div>
              <h2
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: 30,
                  fontWeight: 600,
                  color: C.primary,
                  margin: 0,
                  letterSpacing: "-0.4px",
                }}
              >
                {toolkit.heading}
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: C.accentDim,
                border: `1px solid rgba(184,217,53,0.35)`,
                borderRadius: 100,
                padding: "6px 14px",
              }}
            >
              <seg.Icon size={13} color={C.primary} strokeWidth={2} />
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.primary,
                  letterSpacing: "0.5px",
                }}
              >
                {seg.label}
              </span>
            </div>
          </div>
        )}
        {/* Content — always visible on desktop, toggled on mobile */}
        {(!isMobile || open) && (
          <div
            style={{
              animation: isMobile ? "fadeSlideUp 0.25s ease forwards" : "none",
              paddingBottom: isMobile ? 32 : 0,
            }}
          >
            {/* 4-column card grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
                border: `1px solid ${C.line}`,
                borderRadius: 14,
                overflow: "hidden",
                marginBottom: 0,
              }}
            >
              {toolkit.cards.map((card, i) => {
                const CardIcon = card.Icon;
                const isLastRow = isMobile ? i >= 2 : false;
                const isLastCol = isMobile ? i % 2 === 1 : i === 3;
                return (
                  <div
                    key={i}
                    style={{
                      padding: isMobile ? "24px 20px" : "32px 28px",
                      borderRight: isLastCol ? "none" : `1px solid rgba(255,255,255,0.08)`,
                      borderBottom: isMobile && !isLastRow ? `1px solid rgba(255,255,255,0.08)` : "none",
                      background: C.primary,
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.teal)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = C.primary)}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: "rgba(184,217,53,0.12)",
                        border: "1px solid rgba(184,217,53,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                      }}
                    >
                      <CardIcon size={18} color={C.accent} strokeWidth={1.5} />
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.white,
                        marginBottom: 8,
                        letterSpacing: "-0.1px",
                      }}
                    >
                      {card.title}
                    </div>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {card.body}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Qualifier + CTA footer bar */}
            <div
              style={{
                background: C.bg,
                borderRadius: "0 0 14px 14px",
                padding: isMobile ? "16px 20px" : "18px 28px",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
                justifyContent: "space-between",
                gap: isMobile ? 12 : 0,
                border: `1px solid ${C.line}`,
                borderTop: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <Info size={14} color={C.primary} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: C.textMid }}>
                  <span style={{ fontWeight: 700, color: C.textDark }}>Qualifier: </span>
                  {toolkit.qualifier}
                </span>
              </div>
              <button
                style={{
                  background: C.accent,
                  color: C.primary,
                  border: "none",
                  borderRadius: 50,
                  padding: "10px 22px",
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  width: isMobile ? "100%" : "auto",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
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
    <section style={{ background: C.bg, padding: isMobile ? "0 20px" : "80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Mobile toggle header */}
        {isMobile ? (
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              width: "100%",
              padding: "24px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "none",
              border: "none",
              borderBottom: open ? "none" : `1px solid ${C.line}`,
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: open ? C.accent : C.line,
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: open ? C.primary : C.textMid,
                  letterSpacing: "1.5px",
                }}
              >
                WHAT YOU RECEIVE
              </span>
            </div>
            <span
              style={{
                fontSize: 18,
                color: open ? C.primary : C.textMid,
                fontWeight: 300,
                lineHeight: 1,
                display: "inline-block",
                transition: "transform 0.2s",
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
            style={{
              animation: isMobile ? "fadeSlideUp 0.25s ease forwards" : "none",
              paddingBottom: isMobile ? 32 : 0,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? 40 : 80,
                alignItems: "center",
              }}
            >
              {/* Left copy */}
              <div>
                {!isMobile && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: C.accentDim,
                      border: `1px solid rgba(184,217,53,0.35)`,
                      borderRadius: 100,
                      padding: "6px 16px",
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
                    <span
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        color: C.primary,
                        letterSpacing: "1.5px",
                      }}
                    >
                      WHAT YOU RECEIVE
                    </span>
                  </div>
                )}
                <h2
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: isMobile ? 28 : 38,
                    fontWeight: 300,
                    color: C.primary,
                    margin: "0 0 20px",
                    lineHeight: 1.15,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Every engagement delivers <span style={{ fontWeight: 700 }}>tangible outputs</span>
                </h2>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: isMobile ? 14 : 16,
                    color: C.textMid,
                    lineHeight: 1.75,
                    margin: isMobile ? "0" : "0 0 32px",
                  }}
                >
                  {seg.desc}
                </p>
                {!isMobile && (
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      background: C.primary,
                      border: "none",
                      borderRadius: 50,
                      padding: "14px 28px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.teal)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = C.primary)}
                  >
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, color: C.white }}>
                      {seg.cta}
                    </span>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: C.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ArrowRight size={13} color={C.primary} strokeWidth={2.5} />
                    </div>
                  </button>
                )}
              </div>

              {/* Right deliverables grid */}
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 0 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? 8 : 12 }}>
                  {seg.deliverables.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        background: C.white,
                        border: `1px solid ${C.line}`,
                        borderRadius: 12,
                        padding: isMobile ? "12px 14px" : "16px 18px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        transition: "all 0.2s",
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: C.accentDim,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check size={14} color={C.primary} strokeWidth={2.5} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: isMobile ? 12 : 13,
                          fontWeight: 600,
                          color: C.textDark,
                        }}
                      >
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
                {isMobile && (
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      background: C.primary,
                      border: "none",
                      borderRadius: 50,
                      padding: "14px 28px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      width: "100%",
                      marginTop: 4,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.teal)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = C.primary)}
                  >
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, color: C.white }}>
                      {seg.cta}
                    </span>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: C.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
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
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: C.textMid, lineHeight: 1.8, margin: 0 }}>
          {step.body}
        </p>
      ),
    },
    {
      label: "METHODS APPLIED",
      content: (
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {step.methods.map((m, mi) => (
            <li key={mi} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: C.accent,
                  marginTop: 7,
                  flexShrink: 0,
                  border: `1px solid ${C.primary}`,
                }}
              />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: C.textMid, lineHeight: 1.65 }}>
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
          style={{
            background: C.accentDim,
            border: `1px solid rgba(184,217,53,0.4)`,
            borderRadius: 10,
            padding: "16px 18px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 14,
              color: C.textDark,
              lineHeight: 1.7,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            {step.output}
          </p>
        </div>
      ),
    },
    {
      label: "FRAMEWORKS & THEORY",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {step.frameworks.map((fw, fi) => (
            <div
              key={fi}
              style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 10, padding: "16px 18px" }}
            >
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.primary,
                  marginBottom: 6,
                }}
              >
                {fw.title}
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 12,
                  color: C.textMid,
                  lineHeight: 1.7,
                  margin: 0,
                }}
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      {SECTIONS.map((sec, i) => {
        const isOpen = openSection === i;
        const isLast = i === SECTIONS.length - 1;
        return (
          <div key={i} style={{ borderBottom: isLast ? "none" : `1px solid ${C.line}` }}>
            {/* Accordion header */}
            <button
              onClick={() => toggle(i)}
              style={{
                width: "100%",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: isOpen ? C.bg : C.white,
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: isOpen ? C.accent : C.line,
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: isOpen ? C.primary : C.textMid,
                    letterSpacing: "1.2px",
                  }}
                >
                  {sec.label}
                </span>
              </div>
              <span
                style={{
                  fontSize: 16,
                  color: isOpen ? C.primary : C.textMid,
                  lineHeight: 1,
                  fontWeight: 300,
                  transition: "transform 0.2s",
                  transform: isOpen ? "rotate(45deg)" : "none",
                  display: "inline-block",
                }}
              >
                +
              </span>
            </button>
            {/* Accordion body */}
            {isOpen && (
              <div style={{ padding: "4px 20px 20px", animation: "fadeSlideUp 0.25s ease forwards" }}>
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
    <section style={{ background: C.white, padding: isMobile ? "48px 20px 0" : "80px 80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 16 : 60,
            alignItems: "flex-start",
            marginBottom: isMobile ? 32 : 64,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: C.textMid,
                letterSpacing: "1.5px",
                marginBottom: 16,
              }}
            >
              OUR METHODOLOGY
            </div>
            <h2
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: isMobile ? 32 : 48,
                fontWeight: 300,
                color: C.primary,
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-1px",
              }}
            >
              One process.
              <br />
              <span style={{ fontWeight: 700 }}>Six disciplines.</span>
            </h2>
          </div>
          {!isMobile && (
            <div style={{ paddingTop: 8 }}>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 17,
                  color: C.textMid,
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                Every BRIDGE engagement — regardless of who you are — is grounded in the same diagnostic sequence. We
                don't impose solutions. We uncover root causes, measure economic scale, and match resources with
                precision to locally-defined priorities.
              </p>
            </div>
          )}
        </div>

        {/* Step cards */}
        <div style={{ position: "relative" }}>
          <div
            className="hide-scrollbar"
            style={{
              display: "flex",
              gap: 16,
              overflowX: "auto",
              overflowY: "visible",
              scrollSnapType: "x mandatory",
              paddingBottom: 4,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {METHODOLOGY_STEPS.map((step, i) => {
              const active = activeStep === i;
              const SIcon = step.Icon;
              return (
                <div
                  key={i}
                  onClick={() => toggle(i)}
                  style={{
                    flex: isMobile ? "0 0 calc(80% - 8px)" : "0 0 calc(33.333% - 11px)",
                    minWidth: 0,
                    scrollSnapAlign: "start",
                    background: active ? C.primary : C.bg,
                    border: `1px solid ${active ? C.primary : C.line}`,
                    borderRadius: 16,
                    padding: isMobile ? "24px 20px 20px" : "28px 28px 24px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: isMobile ? 220 : 260,
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 10,
                          background: active ? "rgba(255,255,255,0.1)" : C.white,
                          border: `1px solid ${active ? "rgba(255,255,255,0.15)" : C.line}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SIcon size={20} color={active ? C.accent : C.primary} strokeWidth={1.5} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Inter',sans-serif",
                          fontSize: 11,
                          fontWeight: 700,
                          color: active ? "rgba(255,255,255,0.3)" : C.line,
                          letterSpacing: "1px",
                        }}
                      >
                        {step.num}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: 17,
                        fontWeight: 700,
                        color: active ? C.white : C.primary,
                        marginBottom: 10,
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {step.title}
                    </div>
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 13,
                        color: active ? "rgba(255,255,255,0.6)" : C.textMid,
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {step.cardDesc}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 24,
                      paddingTop: 16,
                      borderTop: `1px solid ${active ? "rgba(255,255,255,0.1)" : C.line}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        color: active ? C.accent : C.primary,
                      }}
                    >
                      {active ? "Close ↑" : "Deep dive ↓"}
                    </span>
                    {active && (
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: C.accent,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ fontSize: 10, color: C.primary, fontWeight: 700 }}>✓</span>
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
                style={{
                  background: C.white,
                  borderRadius: 16,
                  marginTop: 32,
                  overflow: "hidden",
                  animation: "fadeSlideUp 0.35s ease forwards",
                  border: `2px solid ${C.primary}`,
                }}
              >
                {/* Panel header */}
                <div
                  style={{
                    padding: isMobile ? "24px 20px 20px" : "32px 40px 24px",
                    borderBottom: `1px solid ${C.line}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      background: C.primary,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SIcon size={20} color={C.accent} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        color: C.textMid,
                        letterSpacing: "1.5px",
                        marginBottom: 4,
                      }}
                    >
                      STEP {step.num} — {step.title.toUpperCase()}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: isMobile ? 17 : 22,
                        fontWeight: 700,
                        color: C.primary,
                        margin: 0,
                        letterSpacing: "-0.3px",
                        lineHeight: 1.2,
                      }}
                    >
                      {step.headline}
                    </h3>
                  </div>
                </div>

                {/* Panel body */}
                {isMobile ? (
                  <MobileMethodologyAccordion step={step} />
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                    <div style={{ padding: "32px 40px", borderRight: `1px solid ${C.line}` }}>
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 15,
                          color: C.textMid,
                          lineHeight: 1.8,
                          margin: "0 0 28px",
                        }}
                      >
                        {step.body}
                      </p>
                      <div
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 10,
                          fontWeight: 700,
                          color: C.primary,
                          letterSpacing: "1.2px",
                          marginBottom: 14,
                        }}
                      >
                        METHODS APPLIED
                      </div>
                      <ul
                        style={{
                          margin: "0 0 28px",
                          padding: 0,
                          listStyle: "none",
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        {step.methods.map((m, mi) => (
                          <li key={mi} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                            <div
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: C.accent,
                                marginTop: 7,
                                flexShrink: 0,
                                border: `1px solid ${C.primary}`,
                              }}
                            />
                            <span
                              style={{
                                fontFamily: "'DM Sans',sans-serif",
                                fontSize: 13,
                                color: C.textMid,
                                lineHeight: 1.65,
                              }}
                            >
                              {m}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div
                        style={{
                          background: C.accentDim,
                          border: `1px solid rgba(184,217,53,0.4)`,
                          borderRadius: 10,
                          padding: "18px 20px",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            color: C.primary,
                            letterSpacing: "1.2px",
                            marginBottom: 10,
                          }}
                        >
                          WHAT THIS PRODUCES
                        </div>
                        <p
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 14,
                            color: C.textDark,
                            lineHeight: 1.7,
                            margin: 0,
                            fontStyle: "italic",
                          }}
                        >
                          {step.output}
                        </p>
                      </div>
                    </div>
                    <div style={{ padding: "32px 40px", background: C.bg }}>
                      <div
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 10,
                          fontWeight: 700,
                          color: C.textMid,
                          letterSpacing: "1.2px",
                          marginBottom: 16,
                        }}
                      >
                        FRAMEWORKS & THEORY
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {step.frameworks.map((fw, fi) => (
                          <div
                            key={fi}
                            style={{
                              background: C.white,
                              border: `1px solid ${C.line}`,
                              borderRadius: 10,
                              padding: "18px 20px",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "'DM Sans',sans-serif",
                                fontSize: 13,
                                fontWeight: 700,
                                color: C.primary,
                                marginBottom: 6,
                              }}
                            >
                              {fw.title}
                            </div>
                            <p
                              style={{
                                fontFamily: "'DM Sans',sans-serif",
                                fontSize: 12,
                                color: C.textMid,
                                lineHeight: 1.7,
                                margin: 0,
                              }}
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

        <div style={{ height: isMobile ? 48 : 80 }} />
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
    <section style={{ background: C.white, padding: isMobile ? "40px 20px" : "80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${C.primary} 0%, ${C.teal} 100%)`,
            borderRadius: isMobile ? 16 : 20,
            padding: isMobile ? "40px 24px" : "64px 80px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: isMobile ? 32 : 40,
            }}
          >
            <div style={{ maxWidth: isMobile ? "100%" : 560 }}>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.accent,
                  letterSpacing: "1.5px",
                  marginBottom: 16,
                }}
              >
                NEXT STEP
              </div>
              <h2
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: isMobile ? 26 : 36,
                  fontWeight: 700,
                  color: C.white,
                  margin: "0 0 16px",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                }}
              >
                Ready to begin your BRIDGE journey?
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: isMobile ? 14 : 16,
                  color: "rgba(255,255,255,0.65)",
                  margin: 0,
                  lineHeight: 1.65,
                }}
              >
                {ctaText[seg.label]}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                flexShrink: 0,
                width: isMobile ? "100%" : "auto",
              }}
            >
              <button
                onClick={() => navigate("/contact")}
                style={{
                  background: C.accent,
                  color: C.primary,
                  border: "none",
                  borderRadius: 50,
                  padding: isMobile ? "16px 28px" : "18px 36px",
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 800,
                  fontSize: isMobile ? 14 : 15,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  width: isMobile ? "100%" : "auto",
                }}
              >
                {seg.cta} <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/resources")}
                style={{
                  background: "transparent",
                  color: C.white,
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 50,
                  padding: isMobile ? "14px 28px" : "14px 36px",
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  width: isMobile ? "100%" : "auto",
                }}
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
      <div style={{ minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
        <SiteHeader />
        <Hero activeIdx={activeIdx} setActive={handleSetActive} />
        <ProcessTrack key={animKey} seg={seg} animKey={animKey} />
        <ToolkitSection seg={seg} />
        <DeliverablesSection seg={seg} />
        <MethodologySection />
        <CTASection seg={seg} />
        <SiteFooter />
      </div>
    </>
  );
}
