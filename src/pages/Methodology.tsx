import React, { useState, useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
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
const C = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  accentDim: "rgba(184,217,53,0.15)",
  bg: "#F3F5F2",
  teal: "#2E5A4D",
  mid: "#2A6B56",
  white: "#FFFFFF",
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
/* ─── RESPONSIVE HOOK ────────────────────────────────────────────── */
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

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

/* ─── BRIDGE LOGO (dark, for header) ────────────────────────────── */
const BridgeLogo = ({ height = 40 }) => (
  <svg height={height} viewBox="0 0 3434.33 932.3" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path fill="#b8d935" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path fill="#0fea68" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path
        fill="#1b4d3e"
        d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
      />
      <path
        fill="#1b4d3e"
        stroke="#000"
        strokeWidth=".5"
        strokeMiterlimit="10"
        d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z"
      />
      <path
        fill="#1b4d3e"
        stroke="#000"
        strokeWidth=".5"
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
      <circle fill="none" stroke="#191919" strokeWidth="5" strokeMiterlimit="10" cx="3385.56" cy="866.94" r="46.27" />
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
    </g>
  </svg>
);

/* ─── BRIDGE LOGO WHITE (for footer) ────────────────────────────── */
const colors = { primary: "#1B4D3E", accent: "#B8D935", white: "#FFFFFF", line: "#DEDEDE" };
const BridgeLogoWhite = () => (
  <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
    <svg viewBox="0 0 4113.8 932.3" height="36" style={{ display: "block" }}>
      {/* Letter forms — white */}
      <path
        fill={colors.white}
        d="M3355.1,655.5h31.2v5.7h-31.2v-5.7ZM3355.1,666.9h31.2v11.1h-31.2v-11.1ZM3355.1,683.8h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.8h31.2v11.1h-31.2v-11.1ZM3355.1,801.7h31.2v11.1h-31.2v-11.1ZM3355.1,818.5h31.2v11.1h-31.2v-11.1ZM3355.1,835.4h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.5h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,666.9h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.7h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.5h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2h0v.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.5,683.8h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.8h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.1h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
      />
      <path
        fill={colors.white}
        d="M3572.3,655.5h31.2v5.7h-31.2v-5.7ZM3572.3,666.9h31.2v11.1h-31.2v-11.1ZM3572.3,683.8h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.8h31.2v11.1h-31.2v-11.1ZM3572.3,801.7h31.2v11.1h-31.2v-11.1ZM3572.3,818.5h31.2v11.1h-31.2v-11.1ZM3572.3,835.4h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.5h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,666.9h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,688.9h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4h.1v.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.8h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1,0ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2,0ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.8h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.7h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.4h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.5h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z"
      />
      <path
        fill={colors.white}
        d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.8h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.7h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.5h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.4h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.8h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.2,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.1c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,666.9h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.1c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.6,683.8h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z"
      />
      <path
        fill={colors.white}
        d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
      />
      <path
        fill={colors.white}
        stroke={colors.white}
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
      />
      <path
        fill={colors.white}
        stroke={colors.white}
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill={colors.accent} x="1427.4" y="17.4" width="205.2" height="145" />
      <rect fill={colors.white} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill={colors.white}
        d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
      />
      <rect fill={colors.white} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
      <rect fill={colors.accent} x="3083.4" y="339.5" width="175.1" height="257.7" />
      <rect fill={colors.accent} x="3083.4" y="654.4" width="175.1" height="257.7" />
      <circle fill="none" stroke={colors.white} strokeWidth="5" strokeMiterlimit="10" cx="4078.5" cy="661.2" r="32.8" />
      <path
        fill={colors.white}
        d="M4092.2,677.1l-7.3-10.4c.2,0,.3,0,.4-.2,2-.9,3.6-2.1,4.6-3.8s1.6-3.6,1.6-6.1c0-3.6-1.2-6.3-3.6-8.4s-5.7-3-10-3h-13v31.8h5.9v-9.3h8.5l6.5,9.3h6.4v.1ZM4083.7,651.9c1.3,1.1,2,2.7,2,4.7s-.6,3.6-2,4.7-3.3,1.7-5.9,1.7h-6.9v-12.6h6.9c2.6,0,4.5.5,5.9,1.6h0v-.1Z"
      />
      {/* Icon box — white stroke */}
      <rect
        fill="none"
        stroke={colors.white}
        strokeWidth="80"
        strokeMiterlimit="10"
        x="40"
        y="40"
        width="843.9"
        height="852.3"
        rx="36.6"
        ry="36.6"
      />
      {/* Top layer — lime + white stroke */}
      <polygon
        fill={colors.accent}
        stroke={colors.white}
        strokeMiterlimit="10"
        points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"
      />
      {/* Mid layer — muted green */}
      <path
        fill="#74914a"
        d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"
      />
      {/* Bottom layer — lime */}
      <path
        fill={colors.accent}
        d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"
      />
    </svg>
  </div>
);

/* ─── SOCIAL ICONS ───────────────────────────────────────────────── */
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

/* ─── FOOTER SECTOR ICONS ────────────────────────────────────────── */
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

/* ─── SECTOR GRID (footer) ───────────────────────────────────────── */
function SectorGrid() {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: "600",
          color: hovered !== null ? colors.accent : "rgba(255,255,255,0.4)",
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
                boxShadow: isH ? "0 6px 16px rgba(0,0,0,0.2),0 0 0 1px rgba(184,217,53,0.15)" : "none",
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
                {sector.icon(isH ? colors.accent : "rgba(255,255,255,0.85)")}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ── Header is now shared (SiteHeader)

/* ─── FOOTER ─────────────────────────────────────────────────────── */
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ backgroundColor: colors.primary, padding: "0" }}>
      <div style={{ padding: isMobile ? "0 20px" : "0 80px" }}>
        <div style={{ height: "0.5px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>

      {isMobile ? (
        <div style={{ padding: "32px 20px 16px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ flexShrink: 0 }}>
              <BridgeLogoWhite />
            </div>
            <div
              style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginLeft: "auto", justifyContent: "flex-end" }}
            >
              {["Company", "Services", "Resources", "Insights"].map((label) => (
                <a
                  key={label}
                  href="#"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.5px",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              placeholder="Subscribe to insights"
              style={{
                flex: 1,
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: colors.white,
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
              }}
            />
            <button
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                border: "none",
                padding: "11px 18px",
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                borderRadius: "8px",
              }}
            >
              {"\u2192"}
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
                Accra, Ghana
              </span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)" }}>{"\u00B7"}</span>
              <span
                style={{
                  fontSize: "12px",
                  color: colors.accent,
                  fontWeight: "600",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                info@bridgepbc.com
              </span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {socialIcons.map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  <span style={{ transform: "scale(0.8125)", display: "flex" }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ padding: "64px 80px 32px", display: "grid", gridTemplateColumns: "325px 1fr", gap: "220px" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <BridgeLogoWhite />
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: "1.8",
                    margin: "0 0 28px",
                    maxWidth: "320px",
                  }}
                >
                  Blending resources and innovation across the integrated sectors for development, growth, and
                  empowerment.
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "'DM Sans', sans-serif",
                    margin: "0 0 4px",
                    lineHeight: "1.7",
                  }}
                >
                  Accra, Ghana
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: colors.accent,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: "0",
                    fontWeight: "600",
                  }}
                >
                  info@bridgepbc.com
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {[
                  { title: "Company", links: ["About BRIDGE", "Our Approach", "Sectors", "Contact Us"] },
                  {
                    title: "Services",
                    links: [
                      "Research & Guidance",
                      "Venture Development",
                      "Direct Investment",
                      "Strategic Partnerships",
                    ],
                  },
                  { title: "Resources", links: ["White Paper", "Case Studies", "Research Library", "Data & Reports"] },
                  {
                    title: "Insights",
                    links: ["Insights & Analysis", "Sector Briefs", "Policy Updates", "Annual Review"],
                  },
                ].map((col) => (
                  <div key={col.title}>
                    <h4
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: colors.accent,
                        fontFamily: "'DM Sans', sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        marginBottom: "24px",
                      }}
                    >
                      {col.title}
                    </h4>
                    {col.links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        style={{
                          display: "block",
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.6)",
                          fontFamily: "'DM Sans', sans-serif",
                          textDecoration: "none",
                          marginBottom: "14px",
                        }}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "0 80px 20px",
              display: "grid",
              gridTemplateColumns: "325px 1fr",
              gap: "220px",
              alignItems: "start",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  display: "block",
                  marginBottom: "12px",
                  lineHeight: "1",
                }}
              >
                Subscribe to Insights
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  placeholder="Your email address"
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: colors.white,
                    fontSize: "13px",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    height: "44px",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                    border: "none",
                    padding: "12px 20px",
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                    borderRadius: "8px",
                    height: "44px",
                    boxSizing: "border-box",
                  }}
                >
                  {"\u2192"}
                </button>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                {socialIcons.map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <SectorGrid />
            </div>
          </div>
        </>
      )}

      <div
        style={{
          padding: isMobile ? "16px 20px" : "20px 80px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
          {"\u00A9"} 2026 BRIDGE PBC
        </span>
        <div style={{ display: "flex", gap: isMobile ? "12px" : "20px" }}>
          {["Terms", "Privacy", "Accessibility"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.25)",
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: "none",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

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
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #F3F5F2; -webkit-text-size-adjust: 100%; }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  button:focus { outline: none; }
  button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
        <Footer />
      </div>
    </>
  );
}
