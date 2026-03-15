import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BRIDGEAuthModal } from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  Box,
  CreditCard,
  Heart,
  Cpu,
  GraduationCap,
  Leaf,
  Video,
  Home,
  Map,
  Zap,
  Settings,
  Truck,
  Lock,
  Unlock,
  ChevronRight,
  ArrowUpRight,
  BookOpen,
  BarChart3,
  FileText,
  TrendingUp,
  ShieldCheck,
  Star,
  Eye,
  Download,
  Users,
  Clock,
  Newspaper,
  AlertCircle,
  BookMarked,
  Database,
  Archive,
  ExternalLink,
  Calendar,
  ChevronDown,
  Folder,
  BookCopy,
  Layers,
  Bell,
  Printer,
  ArrowLeft,
  X,
  LayoutDashboard,
  Crown,
} from "lucide-react";

// ─── Design System ────────────────────────────────────────
import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
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

// ─── Sector SVG Icons (matches footer icons exactly) ─────
const sectorSvgIcons = [
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
  (c, s = 16) => (
    <svg
      width={s}
      height={s}
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
];

// ─── Sector Data ──────────────────────────────────────────
const sectors = [
  {
    id: 1,
    icon: Box,
    svgIcon: sectorSvgIcons[0],
    slug: "infrastructure",
    full: "Infrastructure & Basic Services",
    tag: "Foundation",
    score: 87,
    ventures: 15,
    cap: "$8–15M",
    free: true,
    headline: "Ghana's infrastructure gap is a $40B+ opportunity hiding in plain sight.",
    teaser:
      "Rural connectivity, water systems, and last-mile logistics represent the highest-leverage entry points for patient capital.",
  },
  {
    id: 2,
    icon: CreditCard,
    svgIcon: sectorSvgIcons[1],
    slug: "financial",
    full: "Financial Inclusion & Economic Security",
    tag: "Foundation",
    score: 91,
    ventures: 18,
    cap: "$10–20M",
    free: false,
    headline: "70% of Ghanaians remain outside formal financial systems — but mobile money is changing the equation.",
    teaser:
      "Embedded finance, agent banking, and SME credit platforms sit at the intersection of high need and proven demand.",
  },
  {
    id: 3,
    icon: Heart,
    svgIcon: sectorSvgIcons[2],
    slug: "health",
    full: "Health Systems & Wellbeing",
    tag: "Human Capital",
    score: 83,
    ventures: 15,
    cap: "$8–16M",
    free: false,
    headline: "A health workforce gap and supply chain failure are costing Ghana lives and economic output daily.",
    teaser:
      "Diagnostics, primary care, and community health worker platforms represent the most scalable entry points.",
  },
  {
    id: 4,
    icon: Cpu,
    svgIcon: sectorSvgIcons[3],
    slug: "technology",
    full: "Technology & Innovation",
    tag: "Growth Engine",
    score: 89,
    ventures: 15,
    cap: "$8–15M",
    free: false,
    headline: "Ghana's tech ecosystem is scaling — but infrastructure gaps and talent drain threaten the momentum.",
    teaser:
      "Vertical SaaS, govtech platforms, and developer ecosystem infrastructure are the three highest-return bets.",
  },
  {
    id: 5,
    icon: GraduationCap,
    svgIcon: sectorSvgIcons[4],
    slug: "education",
    full: "Education & Skills",
    tag: "Human Capital",
    score: 85,
    ventures: 15,
    cap: "$16.5–33.5M",
    free: false,
    headline: "Ghana produces graduates at scale — but a catastrophic mismatch with the labour market persists.",
    teaser: "TVET transformation, employability platforms, and corporate training are the defining opportunity set.",
  },
  {
    id: 6,
    icon: Leaf,
    svgIcon: sectorSvgIcons[5],
    slug: "agriculture",
    full: "Agriculture & Value Chains",
    tag: "Economic Engine",
    score: 90,
    ventures: 18,
    cap: "$12–22M",
    free: false,
    headline: "$1.9 billion lost annually to post-harvest failures — before a single crop reaches market.",
    teaser:
      "Cold chain, aggregation platforms, and processing infrastructure represent the fastest path from farm to value.",
  },
  {
    id: 7,
    icon: Video,
    svgIcon: sectorSvgIcons[6],
    slug: "sports",
    full: "Sports, Entertainment & Creative",
    tag: "Growth Engine",
    score: 78,
    ventures: 14,
    cap: "$10–20.5M",
    free: false,
    headline: "Afrobeats is a global phenomenon. Ghana's creative economy infrastructure has not caught up.",
    teaser:
      "Content production, talent pipelines, and IP monetisation platforms are where early movers build durable advantages.",
  },
  {
    id: 8,
    icon: Home,
    svgIcon: sectorSvgIcons[7],
    slug: "housing",
    full: "Housing & Real Estate",
    tag: "Foundation",
    score: 82,
    ventures: 11,
    cap: "$15–25M",
    free: false,
    headline:
      "A 2 million unit housing deficit with mortgage penetration under 2% — the numbers tell a compelling story.",
    teaser:
      "Affordable housing models, construction finance, and diaspora housing products represent multi-decade demand.",
  },
  {
    id: 9,
    icon: Map,
    svgIcon: sectorSvgIcons[8],
    slug: "tourism",
    full: "Tourism & Hospitality",
    tag: "Growth Engine",
    score: 76,
    ventures: 13,
    cap: "$10–18M",
    free: false,
    headline: "Year of Return created a cultural moment. The infrastructure to sustain it has not been built yet.",
    teaser:
      "Heritage tourism, hospitality training, and destination development are where the next chapter gets written.",
  },
  {
    id: 10,
    icon: Zap,
    svgIcon: sectorSvgIcons[9],
    slug: "energy",
    full: "Energy & Renewable Resources",
    tag: "Foundation",
    score: 88,
    ventures: 14,
    cap: "$12–22M",
    free: false,
    headline: "Power outages cost Ghana up to $924M annually. Solar irradiance potential is among Africa's highest.",
    teaser:
      "Distributed solar, clean cooking, and mini-grid development are the most investable near-term entry points.",
  },
  {
    id: 11,
    icon: Settings,
    svgIcon: sectorSvgIcons[10],
    slug: "manufacturing",
    full: "Manufacturing & Light Industry",
    tag: "Economic Engine",
    score: 81,
    ventures: 14,
    cap: "$15–30M",
    free: false,
    headline:
      "Ghana imports goods it has every input to produce. Import substitution is a policy priority with capital behind it.",
    teaser:
      "Agro-processing, packaging, and light manufacturing for domestic consumption are the pragmatic first moves.",
  },
  {
    id: 12,
    icon: Truck,
    svgIcon: sectorSvgIcons[11],
    slug: "transport",
    full: "Transportation & Logistics",
    tag: "Foundation",
    score: 79,
    ventures: 14,
    cap: "$10–22M",
    free: false,
    headline: "Every sector's growth multiplier — logistics determines who can actually participate in the economy.",
    teaser:
      "Last-mile delivery, freight technology, and intermodal connectivity are the connective tissue of Ghana's next decade.",
  },
];

const gipc = [
  { id: 1, title: "Agriculture", subtitle: "Sector Profile 2025", pages: 24, icon: Leaf },
  { id: 2, title: "Education", subtitle: "Sector Profile 2025", pages: 22, icon: GraduationCap },
  { id: 3, title: "Energy", subtitle: "Sector Profile 2025", pages: 28, icon: Zap },
  { id: 4, title: "Financial Services", subtitle: "Sector Profile 2025", pages: 20, icon: CreditCard },
  { id: 5, title: "Health", subtitle: "Sector Profile 2025", pages: 26, icon: Heart },
  { id: 6, title: "ICT", subtitle: "Sector Profile 2025", pages: 22, icon: Cpu },
  { id: 7, title: "Manufacturing", subtitle: "Sector Profile 2025", pages: 24, icon: Settings },
  { id: 8, title: "Mining & Minerals", subtitle: "Processing 2025", pages: 30, icon: Box },
  { id: 9, title: "Oil & Gas", subtitle: "Sector Profile 2025", pages: 28, icon: Zap },
  { id: 10, title: "Property Development", subtitle: "Sector Profile 2025", pages: 20, icon: Home },
  { id: 11, title: "Recreation & Tourism", subtitle: "Sector Profile 2025", pages: 22, icon: Map },
  { id: 12, title: "Transport", subtitle: "Sector Profile 2025", pages: 26, icon: Truck },
  { id: 13, title: "Water & Sanitation", subtitle: "Sector Profile 2025", pages: 20, icon: Layers },
];

const docs = [
  {
    id: 1,
    icon: BookOpen,
    label: "White Paper",
    title: "BRIDGE PBC Foundational White Paper",
    desc: "Complete intellectual foundation — methodology, sector framework, and theory of change for Ghana's development ecosystem.",
    tag: "Free Preview",
    free: true,
    pages: "48 pages",
    action: "Preview",
    soon: false,
    path: "/resources/white-paper",
    noDownload: true,
  },
  {
    id: 2,
    icon: Database,
    label: "Research Library",
    title: "Sector Analysis Collection — All 12 Sectors",
    desc: "The complete BRIDGE intelligence suite with venture scoring, capital range breakdowns, and implementation playbooks.",
    tag: "Subscription",
    free: false,
    pages: "12 reports",
    action: "Unlock Access",
    soon: false,
    path: "/resources/sector-briefs",
    paidPath: "/resources/sector-briefs-full",
    requiresSignIn: true,
  },
  {
    id: 3,
    icon: BarChart3,
    label: "Data & Reports",
    title: "BRIDGE Portfolio Data — 174+ Ventures",
    desc: "Full venture pipeline data across all sectors including scoring matrices, capital ranges by tier, and priority rankings.",
    tag: "Coming Soon",
    free: false,
    pages: "174 ventures",
    action: "Notify Me",
    soon: false,
    notifyMe: true,
  },
  {
    id: 4,
    icon: Archive,
    label: "Case Studies",
    title: "Kejetia Market Digitisation — Flagship Case",
    desc: "Deep-dive on West Africa's largest market and BRIDGE's 10,000+ trader digitisation platform and build-out.",
    tag: "Coming Soon",
    free: false,
    pages: null,
    action: "Notify Me",
    soon: false,
    notifyMe: true,
  },
  {
    id: 5,
    icon: Calendar,
    label: "Annual Review",
    title: "BRIDGE 2025 Annual Intelligence Review",
    desc: "Full-year retrospective across all 12 sectors with updated venture scoring, market shifts, and priorities heading into 2026.",
    tag: "New",
    free: false,
    pages: "32 pages",
    action: "Unlock Access",
    soon: false,
    path: "/resources/annual-review-2025",
    paidOnly: true,
  },
  {
    id: 6,
    icon: Newspaper,
    label: "Policy Tracker",
    title: "Ghana Policy Tracker — 2025–2026",
    desc: "Living document covering the 2026 Budget, Sankofa Initiative, DEP, Digital Credit Directive, and sector-specific regulations.",
    tag: "Living Document",
    free: false,
    pages: "Ongoing",
    action: "Unlock Access",
    soon: false,
    path: "/resources/policy-tracker",
  },
  {
    id: 7,
    icon: LayoutDashboard,
    label: "Monthly Dashboard",
    title: "BRIDGE Monthly Dashboard — March 2026",
    desc: "Monthly intelligence snapshot with sector pulse, policy signals, and market movements. Free preview of the full dashboard experience.",
    tag: "Free",
    free: true,
    pages: "Monthly",
    action: "View Dashboard",
    soon: false,
    path: "/resources/monthly-dashboard",
  },
  {
    id: 8,
    icon: Leaf,
    label: "Cannabis Intelligence",
    title: "NCC Licensing for Medical Cannabis — Intelligence Series",
    desc: "Complete analysis of Ghana's 11 NCC cannabis licence categories. Market sizing, BRIDGE Impact Scores, value chain positioning, and entry strategies.",
    tag: "New",
    free: false,
    pages: "11 licences",
    action: "Explore Series",
    soon: false,
    path: "/resources/cannabis-intelligence",
    requiresSignIn: true,
  },
];

const updates = [
  {
    id: 1,
    type: "Policy Update",
    title: "2026 Budget Alignment — What It Means for Investors",
    date: "March 2026",
    read: "8 min",
    free: true,
    path: "/resources/budget-alignment",
  },
  {
    id: 2,
    type: "Sector Brief",
    title: "Agriculture Crisis & Strategic Positioning",
    date: "Feb 2026",
    read: "12 min",
    free: false,
    path: "/resources/sector-briefs?sector=6",
  },
  {
    id: 3,
    type: "Annual Review",
    title: "BRIDGE 2025 Sector Intelligence Review",
    date: "Jan 2026",
    read: "20 min",
    free: false,
    path: "/resources/ghana-intelligence",
  },
];

// ─── Tag Variants by doc type ─────────────────────────────
function docTagStyle(tag) {
  if (tag === "Free Download" || tag === "Free Preview" || tag === "Free") return { bg: C.accentBg, color: C.primary };
  if (tag === "New") return { bg: `${C.teal}18`, color: C.teal };
  if (tag === "Coming Soon") return { bg: `${C.muted}14`, color: C.muted };
  if (tag === "Subscription") return { bg: `${C.primary}10`, color: C.primary };
  return { bg: `${C.primary}10`, color: C.primary };
}

function updateTagStyle(type) {
  if (type === "Policy Update") return { bg: `${C.teal}15`, color: C.teal };
  if (type === "Sector Brief") return { bg: `${C.primary}12`, color: C.primary };
  if (type === "Annual Review") return { bg: C.accentBg, color: C.primary };
  return { bg: C.accentBg, color: C.primary };
}

function updateAccent(type) {
  if (type === "Policy Update") return C.teal;
  if (type === "Sector Brief") return C.primary;
  return C.accent;
}

// ─── Shared Components ────────────────────────────────────
function Tag({ children, bg, color }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-[3px] rounded text-[10px] font-bold tracking-[0.8px] font-[Inter,sans-serif] uppercase"
      style={{ background: bg, color }}
    >
      {children}
    </span>
  );
}

function ScoreBar({ score }) {
  const pct = score / 100;
  const color = score >= 88 ? C.accent : score >= 82 ? C.teal : C.muted;
  return (
    <div className="flex items-center gap-2">
      <div className="w-[60px] h-1 rounded-sm overflow-hidden" style={{ background: C.line }}>
        <div className="h-full rounded-sm" style={{ width: `${score}%`, background: color }} />
      </div>
      <span
        className="text-[11px] font-bold font-[Inter,sans-serif] min-w-[24px]"
        style={{ color: C.mutedDark }}
      >
        {score}
      </span>
    </div>
  );
}

function SectorRow({ s, expanded, onToggle, mobile, onNavigate, isLoggedIn }) {
  if (mobile) {
    return (
      <div style={{ borderBottom: `1px solid ${C.line}` }}>
        <div
          onClick={onToggle}
          className="py-3.5 cursor-pointer transition-[background] duration-150"
          style={{
            background: expanded ? `${C.primary}04` : "transparent",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-[38px] h-[38px] rounded-lg flex items-center justify-center shrink-0 transition-[background] duration-150"
              style={{ background: expanded ? C.accentBg : C.bg }}
            >
              {s.svgIcon(C.primary, 16)}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-[13.5px] font-semibold font-[DM_Sans,sans-serif] leading-[1.3] mb-1"
                style={{ color: C.dark }}
              >
                {s.full}
              </div>
              <Tag bg={`${C.primary}10`} color={C.teal}>
                {s.tag}
              </Tag>
            </div>
            <ChevronDown
              size={14}
              color={C.muted}
              className="shrink-0 mt-1 transition-transform duration-200"
              style={{
                transform: expanded ? "rotate(180deg)" : "none",
              }}
            />
          </div>
          <div className="flex items-center gap-2.5 mt-2.5 pl-[50px] flex-wrap">
            <div className="flex items-center gap-[5px]">
              <div
                className="w-10 h-[3px] rounded-sm overflow-hidden"
                style={{ background: C.line }}
              >
                <div
                  className="h-full rounded-sm"
                  style={{
                    width: `${s.score}%`,
                    background: s.score >= 88 ? C.accent : s.score >= 82 ? C.teal : C.muted,
                  }}
                />
              </div>
              <span className="text-[10px] font-bold font-[Inter,sans-serif]" style={{ color: C.mutedDark }}>
                {s.score}
              </span>
            </div>
            <span className="text-[10px]" style={{ color: C.line }}>·</span>
            <span className="text-[11px] font-bold font-[Inter,sans-serif]" style={{ color: C.primary }}>
              {s.cap}
            </span>
            <span className="text-[10px]" style={{ color: C.line }}>·</span>
            <span className="text-[11px] font-[Inter,sans-serif]" style={{ color: C.mutedDark }}>
              {s.ventures} ventures
            </span>
            <span className="text-[10px]" style={{ color: C.line }}>·</span>
            {s.free ? (
              <Tag bg={C.accentBg} color={C.primary}>
                Free
              </Tag>
            ) : isLoggedIn ? (
              <Tag bg={`${C.teal}15`} color={C.teal}>
                Member
              </Tag>
            ) : (
              <Tag bg={C.bg} color={C.muted}>
                Locked
              </Tag>
            )}
          </div>
        </div>
        {expanded && (
          <div className="pb-4 pl-[50px]">
            <p
              className="m-0 mb-1.5 text-[13px] font-semibold leading-[1.5] font-[DM_Sans,sans-serif]"
              style={{ color: C.primary }}
            >
              {s.headline}
            </p>
            <p
              className="m-0 mb-3.5 text-xs leading-[1.65] font-[Inter,sans-serif]"
              style={{ color: C.muted }}
            >
              {s.teaser}
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate(s.slug); }}
              className="flex items-center gap-1.5 border-none px-[18px] py-2.5 rounded-full text-xs font-bold font-[Inter,sans-serif] cursor-pointer"
              style={{
                background: (s.free || isLoggedIn) ? C.accent : C.primary,
                color: (s.free || isLoggedIn) ? C.primary : C.white,
              }}
            >
              {(s.free || isLoggedIn) ? <Eye size={12} /> : <Lock size={12} />}
              {(s.free || isLoggedIn) ? "Read Analysis" : "Sign In to Read"}
              <ArrowUpRight size={12} />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ borderBottom: `1px solid ${C.line}` }}>
      <div
        onClick={onToggle}
        className="grid grid-cols-[44px_1fr_120px_100px_80px_100px] items-center gap-3 py-[13px] cursor-pointer transition-[background] duration-150"
        style={{
          background: expanded ? `${C.primary}06` : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!expanded) e.currentTarget.style.background = C.bg;
        }}
        onMouseLeave={(e) => {
          if (!expanded) e.currentTarget.style.background = "transparent";
        }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-[background] duration-150"
          style={{ background: expanded ? C.accentBg : C.bg }}
        >
          {s.svgIcon(C.primary, 16)}
        </div>
        <div>
          <div
            className="text-sm font-semibold font-[DM_Sans,sans-serif] leading-[1.3] mb-[3px]"
            style={{ color: C.dark }}
          >
            {s.full}
          </div>
          <Tag bg={`${C.primary}10`} color={C.teal}>
            {s.tag}
          </Tag>
        </div>
        <ScoreBar score={s.score} />
        <div className="text-[13px] font-bold font-[Inter,sans-serif]" style={{ color: C.primary }}>
          {s.cap}
        </div>
        <div
          className="text-[13px] font-[Inter,sans-serif] text-center font-semibold"
          style={{ color: C.mutedDark }}
        >
          {s.ventures}
        </div>
        <div className="flex justify-end">
          {s.free ? (
            <Tag bg={C.accentBg} color={C.primary}>
              Free
            </Tag>
          ) : isLoggedIn ? (
            <Tag bg={`${C.teal}15`} color={C.teal}>
              Member
            </Tag>
          ) : (
            <Tag bg={C.bg} color={C.muted}>
              Locked
            </Tag>
          )}
        </div>
      </div>
      {expanded && (
        <div className="grid grid-cols-[1fr_auto] gap-6 items-start pt-1 pb-5 pl-14">
          <div>
            <p
              className="m-0 mb-1.5 text-sm font-semibold leading-[1.5] font-[DM_Sans,sans-serif]"
              style={{ color: C.primary }}
            >
              {s.headline}
            </p>
            <p
              className="m-0 text-[13px] leading-[1.65] font-[Inter,sans-serif]"
              style={{ color: C.muted }}
            >
              {s.teaser}
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(s.slug); }}
            className="flex items-center gap-1.5 shrink-0 border-none px-[18px] py-2.5 rounded-full text-xs font-bold font-[Inter,sans-serif] cursor-pointer"
            style={{
              background: (s.free || isLoggedIn) ? C.accent : C.primary,
              color: (s.free || isLoggedIn) ? C.primary : C.white,
            }}
          >
            {(s.free || isLoggedIn) ? <Eye size={12} /> : <Lock size={12} />}
            {(s.free || isLoggedIn) ? "Read Analysis" : "Sign In to Read"}
            <ArrowUpRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Sector Icon Filter Button ────────────────────────────
function SectorIconBtn({ svgIcon, label, active, onClick }) {
  const [hov, setHov] = useState(false);
  const iconColor = active ? C.white : hov ? C.primary : C.mutedDark;
  return (
    <div className="relative inline-flex">
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        title={label}
        className="w-8 h-8 rounded-[7px] border-none flex items-center justify-center cursor-pointer shrink-0 transition-all duration-150"
        style={{
          background: active ? C.primary : hov ? `${C.primary}10` : C.bg,
          boxShadow: active ? `0 2px 8px ${C.primary}30` : "none",
        }}
      >
        {svgIcon(iconColor, 14)}
      </button>
      {hov && (
        <div
          className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 px-2 py-1 rounded-[5px] text-[10px] font-semibold font-[Inter,sans-serif]"
          style={{ background: C.dark, color: C.white }}
        >
          {label}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent"
            style={{ borderTop: `4px solid ${C.dark}` }}
          />
        </div>
      )}
    </div>
  );
}

function BridgeTab({ mobile, filter, setFilter, onUnlock, onNavigate, isLoggedIn }) {
  const [expanded, setExpanded] = useState(null);
  const tags = ["All", "Foundation", "Human Capital", "Economic Engine", "Growth Engine"];
  const shown = filter === "All" ? sectors : sectors.filter((s) => s.full === filter || s.tag === filter);

  return (
    <div>
      {/* Column headers — desktop only */}
      {!mobile && (
        <div
          className="grid grid-cols-[44px_1fr_120px_100px_80px_100px] gap-3 pb-2.5"
          style={{ borderBottom: `2px solid ${C.dark}` }}
        >
          {[
            { label: "", align: "left" as const },
            { label: "Sector", align: "left" as const, flush: true },
            { label: "Impact Score", align: "left" as const },
            { label: "Capital", align: "left" as const },
            { label: "Ventures", align: "center" as const },
            { label: "Access", align: "right" as const },
          ].map((h, i) => (
            <div
              key={i}
              className="text-[10px] font-bold font-[Inter,sans-serif] tracking-[1px] uppercase"
              style={{
                color: C.mutedDark,
                textAlign: h.align,
                marginLeft: h.flush ? "-56px" : 0,
              }}
            >
              {h.label}
            </div>
          ))}
        </div>
      )}

      {/* Icon filter bar */}
      <div className="py-2.5" style={{ borderBottom: `1px solid ${C.line}` }}>
        {mobile ? (
          <div className="flex gap-2 items-stretch">
            {/* All — spans both rows */}
            <button
              onClick={() => setFilter("All")}
              className="min-w-[52px] rounded-lg border-none shrink-0 text-[13px] font-[Inter,sans-serif] cursor-pointer transition-all duration-150 self-stretch flex items-center justify-center"
              style={{
                fontWeight: filter === "All" ? "700" : "500",
                background: filter === "All" ? C.primary : C.bg,
                color: filter === "All" ? C.white : C.muted,
              }}
            >
              All
            </button>

            <div className="w-px shrink-0" style={{ background: C.line }} />

            {/* 2×6 icon grid */}
            <div className="grid grid-cols-[repeat(6,1fr)] grid-rows-[repeat(2,32px)] gap-[5px] flex-1">
              {sectors.map((s) => (
                <div key={s.id} className="flex items-center justify-center">
                  <SectorIconBtn
                    svgIcon={s.svgIcon}
                    label={s.full}
                    active={filter === s.full}
                    onClick={() => setFilter(filter === s.full ? "All" : s.full)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            {/* All pill */}
            <button
              onClick={() => setFilter("All")}
              className="py-[5px] px-3.5 rounded-md border-none shrink-0 text-xs font-[Inter,sans-serif] cursor-pointer transition-all duration-150"
              style={{
                fontWeight: filter === "All" ? "700" : "500",
                background: filter === "All" ? C.primary : C.bg,
                color: filter === "All" ? C.white : C.muted,
              }}
            >
              All
            </button>

            <div className="w-px h-5 shrink-0" style={{ background: C.line }} />

            {/* Sector icon toggles */}
            {sectors.map((s) => (
              <SectorIconBtn
                key={s.id}
                svgIcon={s.svgIcon}
                label={s.full}
                active={filter === s.full}
                onClick={() => setFilter(filter === s.full ? "All" : s.full)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Rows */}
      <div>
        {shown.map((s) => (
          <SectorRow
            key={s.id}
            s={s}
            expanded={expanded === s.id}
            onToggle={() => setExpanded(expanded === s.id ? null : s.id)}
            mobile={mobile}
            onNavigate={onNavigate}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>

      {/* CTA */}
      {!isLoggedIn ? (
        <div className="mt-6 p-5 rounded-[10px]" style={{ background: C.primary }}>
          <div style={{ marginBottom: mobile ? "14px" : "8px" }}>
            <div
              className="text-[15px] font-bold font-[DM_Sans,sans-serif] mb-1"
              style={{ color: C.white }}
            >
              11 of 12 analyses are subscriber-only
            </div>
            <div className="text-xs font-[Inter,sans-serif] leading-[1.5] text-white/55">
              Sign in for free to access all 12 sector intelligence briefs with venture portfolios, risk frameworks, and capital breakdowns.
            </div>
          </div>
          <button
            onClick={onUnlock}
            className="flex items-center justify-center gap-2 border-none px-[22px] py-3 rounded-full text-sm font-bold font-[Inter,sans-serif] cursor-pointer"
            style={{
              background: C.accent,
              color: C.primary,
              width: mobile ? "100%" : "auto",
            }}
          >
            Sign In to Unlock <ArrowUpRight size={14} />
          </button>
        </div>
      ) : (
        <div className="mt-6 p-5 rounded-[10px]" style={{ background: `${C.primary}08`, border: `1px solid ${C.line}` }}>
          <div style={{ marginBottom: mobile ? "14px" : "8px" }}>
            <div
              className="text-[15px] font-bold font-[DM_Sans,sans-serif] mb-1"
              style={{ color: C.primary }}
            >
              Upgrade to full access
            </div>
            <div
              className="text-xs font-[Inter,sans-serif] leading-[1.5]"
              style={{ color: C.muted }}
            >
              Paid members get the complete BRIDGE intelligence suite — venture-level data, implementation playbooks, direct introductions, and priority analyst access.
            </div>
          </div>
          <button
            onClick={onUnlock}
            className="flex items-center justify-center gap-2 border-none px-[22px] py-3 rounded-full text-sm font-bold font-[Inter,sans-serif] cursor-pointer"
            style={{
              background: C.primary,
              color: C.white,
              width: mobile ? "100%" : "auto",
            }}
          >
            Access Full Report <ArrowUpRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── GIPC Bookshelf Tab ───────────────────────────────────
function BookCard({ book, active, onClick }) {
  const Icon = book.icon;
  return (
    <div
      onClick={onClick}
      className="rounded-lg p-3.5 cursor-pointer transition-all duration-150"
      style={{
        border: `1px solid ${active ? C.primary : C.line}`,
        background: active ? C.primary : C.white,
        boxShadow: active ? `0 4px 16px ${C.primary}22` : "none",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.borderColor = C.primary;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.borderColor = C.line;
      }}
    >
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center mb-2.5"
        style={{ background: active ? "rgba(255,255,255,0.15)" : C.bg }}
      >
        <Icon size={15} color={active ? C.accent : C.primary} />
      </div>
      <div
        className="text-xs font-bold font-[DM_Sans,sans-serif] leading-[1.3] mb-[3px]"
        style={{ color: active ? C.white : C.dark }}
      >
        {book.title}
      </div>
      <div
        className="text-[10px] font-[Inter,sans-serif]"
        style={{ color: active ? "rgba(255,255,255,0.55)" : C.muted }}
      >
        {book.pages} pp · 2025
      </div>
    </div>
  );
}

function GIPCTab({ mobile }) {
  const [active, setActive] = useState(gipc[0]);

  return (
    <div>
      {/* Attribution */}
      <div
        className="flex items-start gap-3 py-3.5 px-[18px] rounded-md mb-7"
        style={{
          background: C.bg,
          border: `1px solid ${C.line}`,
          borderLeft: `3px solid ${C.primary}`,
        }}
      >
        <ShieldCheck size={14} color={C.primary} className="shrink-0 mt-px" />
        <div className="text-xs font-[Inter,sans-serif] leading-[1.55]" style={{ color: C.muted }}>
          Published by the <strong style={{ color: C.dark }}>Ghana Investment Promotion Centre (GIPC)</strong>. Shared
          here as a public resource — BRIDGE makes no claim to authorship. Visit{" "}
          <span className="font-bold" style={{ color: C.primary }}>gipcghana.com</span> for GIPC investment inquiries.
        </div>
      </div>

      <div
        className="grid gap-6 items-start"
        style={{ gridTemplateColumns: mobile ? "1fr" : "1fr 300px" }}
      >
        {/* Grid of books */}
        <div
          className="grid gap-2.5"
          style={{ gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)" }}
        >
          {gipc.map((b) => (
            <BookCard
              key={b.id}
              book={b}
              active={active?.id === b.id}
              onClick={() => setActive(active?.id === b.id ? null : b)}
            />
          ))}
        </div>

        {/* Detail panel */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            border: `1px solid ${C.line}`,
            position: mobile ? "static" : "sticky",
            top: "72px",
          }}
        >
          {active ? (
            <>
              <div className="py-5 px-[22px]" style={{ background: C.primary }}>
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-[38px] h-[38px] rounded-lg bg-white/[0.12] flex items-center justify-center shrink-0">
                    <active.icon size={18} color={C.accent} />
                  </div>
                  <div>
                    <div
                      className="text-base font-bold font-[DM_Sans,sans-serif] leading-[1.2]"
                      style={{ color: C.white }}
                    >
                      {active.title}
                    </div>
                    <div className="text-[11px] text-white/55 font-[Inter,sans-serif]">
                      {active.subtitle}
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 pt-3 border-t border-white/10">
                  {[
                    ["Pages", `${active.pages}`],
                    ["Year", "2025"],
                    ["Source", "GIPC"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <div className="text-[10px] text-white/45 font-[Inter,sans-serif] font-bold uppercase tracking-[0.6px]">
                        {l}
                      </div>
                      <div
                        className="text-[15px] font-bold font-[Inter,sans-serif]"
                        style={{ color: C.white }}
                      >
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="py-[18px] px-[22px]">
                <p
                  className="m-0 mb-[18px] text-xs font-[Inter,sans-serif] leading-[1.65]"
                  style={{ color: C.muted }}
                >
                  Official GIPC investment climate profile covering the regulatory environment, FDI statistics, sector
                  macro-indicators, investment incentives, and government priorities for{" "}
                  <strong style={{ color: C.dark }}>{active.title.toLowerCase()}</strong>.
                </p>
                <div className="flex gap-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 border-none p-2.5 rounded-md text-xs font-bold font-[Inter,sans-serif] cursor-pointer"
                    style={{ background: C.primary, color: C.white }}
                  >
                    <Download size={12} />
                    Download Free
                  </button>
                  <button
                    className="w-10 flex items-center justify-center rounded-md cursor-pointer"
                    style={{
                      background: C.bg,
                      border: `1px solid ${C.line}`,
                    }}
                  >
                    <ExternalLink size={13} color={C.muted} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-10 px-[22px] text-center">
              <BookCopy size={28} color={C.line} className="mx-auto mb-2.5" />
              <div className="text-[13px] font-[Inter,sans-serif]" style={{ color: C.muted }}>
                Select a profile to preview
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Document Library Tab ─────────────────────────────────
function DocRow({ doc, mobile, onNavigate, onNotifyMe }) {
  const Icon = doc.icon;
  const ts = docTagStyle(doc.tag);

  if (mobile) {
    return (
      <div className="py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="flex gap-3 items-start">
          <div
            className="w-[42px] h-[42px] rounded-lg flex items-center justify-center shrink-0"
            style={{ background: doc.free ? C.accentBg : C.bg }}
          >
            <Icon size={18} color={doc.free ? C.primary : C.mutedDark} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-[5px] flex-wrap">
              <span
                className="text-[10px] font-bold font-[Inter,sans-serif] uppercase tracking-[0.6px]"
                style={{ color: C.muted }}
              >
                {doc.label}
              </span>
              <Tag bg={ts.bg} color={ts.color}>
                {doc.tag}
              </Tag>
            </div>
            <div
              className="text-[13.5px] font-bold font-[DM_Sans,sans-serif] leading-[1.3] mb-[5px]"
              style={{ color: C.dark }}
            >
              {doc.title}
            </div>
            <div
              className="text-xs font-[Inter,sans-serif] leading-[1.5] mb-3"
              style={{ color: C.muted }}
            >
              {doc.desc}
            </div>
            <div className="flex items-center justify-between gap-2.5">
              {doc.pages && (
                <span className="text-[11px] font-semibold font-[Inter,sans-serif]" style={{ color: C.muted }}>
                  {doc.pages}
                </span>
              )}
              <button
                disabled={doc.soon}
                onClick={() => doc.notifyMe ? onNotifyMe?.(doc) : onNavigate?.(doc)}
                className="flex items-center gap-[5px] ml-auto px-4 py-2 rounded-full text-xs font-bold font-[Inter,sans-serif] whitespace-nowrap"
                style={{
                  background: doc.notifyMe ? "transparent" : doc.soon ? "transparent" : doc.free ? C.accent : C.primary,
                  color: doc.notifyMe ? C.muted : doc.soon ? C.muted : doc.free ? C.primary : C.white,
                  border: (doc.notifyMe || doc.soon) ? `1px solid ${C.line}` : "none",
                  cursor: doc.soon ? "not-allowed" : "pointer",
                  opacity: doc.soon ? 0.6 : 1,
                }}
              >
                {doc.notifyMe ? <Bell size={11} /> : !doc.soon && (doc.free ? (doc.noDownload ? <Eye size={11} /> : <Download size={11} />) : <Lock size={11} />)}
                {doc.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-[52px_1fr_120px_160px] items-center gap-5 py-[18px]"
      style={{ borderBottom: `1px solid ${C.line}` }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: doc.free ? C.accentBg : C.bg }}
      >
        <Icon size={20} color={doc.free ? C.primary : C.mutedDark} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className="text-[10px] font-bold font-[Inter,sans-serif] uppercase tracking-[0.6px]"
            style={{ color: C.muted }}
          >
            {doc.label}
          </span>
          <Tag bg={ts.bg} color={ts.color}>
            {doc.tag}
          </Tag>
        </div>
        <div
          className="text-sm font-bold font-[DM_Sans,sans-serif] leading-[1.3] mb-1"
          style={{ color: C.dark }}
        >
          {doc.title}
        </div>
        <div className="text-xs font-[Inter,sans-serif] leading-[1.55]" style={{ color: C.muted }}>
          {doc.desc}
        </div>
      </div>
      <div className="text-right">
        {doc.pages && (
          <div className="text-xs font-semibold font-[Inter,sans-serif]" style={{ color: C.muted }}>
            {doc.pages}
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          disabled={doc.soon}
          onClick={() => doc.notifyMe ? onNotifyMe?.(doc) : onNavigate?.(doc)}
          className="flex items-center gap-1.5 px-4 py-[9px] rounded-full text-xs font-bold font-[Inter,sans-serif] whitespace-nowrap"
          style={{
            background: doc.notifyMe ? "transparent" : doc.soon ? "transparent" : doc.free ? C.accent : C.primary,
            color: doc.notifyMe ? C.muted : doc.soon ? C.muted : doc.free ? C.primary : C.white,
            border: (doc.notifyMe || doc.soon) ? `1px solid ${C.line}` : "none",
            cursor: doc.soon ? "not-allowed" : "pointer",
            opacity: doc.soon ? 0.6 : 1,
          }}
        >
          {doc.notifyMe ? <Bell size={11} /> : !doc.soon && (doc.free ? (doc.noDownload ? <Eye size={11} /> : <Download size={11} />) : <Lock size={11} />)}
          {doc.action}
        </button>
      </div>
    </div>
  );
}

function LibraryTab({ mobile, onNavigate, onNotifyMe }) {
  return (
    <div>
      {/* Column headers — desktop only */}
      {!mobile && (
        <div
          className="grid grid-cols-[52px_1fr_120px_160px] gap-5 pb-2.5"
          style={{ borderBottom: `2px solid ${C.dark}` }}
        >
          {["", "Document", "Size", ""].map((h, i) => (
            <div
              key={i}
              className="text-[10px] font-bold font-[Inter,sans-serif] tracking-[1px] uppercase"
              style={{
                color: C.mutedDark,
                textAlign: i > 1 ? "right" : "left",
              }}
            >
              {h}
            </div>
          ))}
        </div>
      )}
      {mobile && (
        <div className="pb-3 mb-1" style={{ borderBottom: `2px solid ${C.dark}` }}>
          <span
            className="text-[10px] font-bold font-[Inter,sans-serif] tracking-[1px] uppercase"
            style={{ color: C.mutedDark }}
          >
            {docs.length} Documents
          </span>
        </div>
      )}
      {docs.map((doc) => (
        <DocRow key={doc.id} doc={doc} mobile={mobile} onNavigate={onNavigate} onNotifyMe={onNotifyMe} />
      ))}
    </div>
  );
}

// ─── What's New Strip ─────────────────────────────────────
function WhatsNew({ mobile, onCardClick, isLoggedIn }) {
  const [hov, setHov] = React.useState(null);
  return (
    <div
      style={{
        background: C.white,
        borderBottom: `1px solid ${C.line}`,
        padding: mobile ? "28px 20px" : `28px ${PAD}`,
      }}
    >
      <div className="mx-auto" style={{ maxWidth: MAX }}>
        <div className="flex items-center gap-3.5 mb-[18px]">
          <span
            className="text-[11px] font-bold font-[Inter,sans-serif] tracking-[1px] uppercase whitespace-nowrap"
            style={{ color: C.primary }}
          >
            What's New
          </span>
          <div className="flex-1 h-px" style={{ background: C.line }} />
          <button
            className="flex items-center gap-1 bg-none border-none text-[11px] font-bold font-[Inter,sans-serif] cursor-pointer whitespace-nowrap"
            style={{ color: C.muted }}
          >
            All Updates <ArrowUpRight size={10} />
          </button>
        </div>
        <div
          className="gap-2.5 scrollbar-none"
          style={{
            display: mobile ? "flex" : "grid",
            gridTemplateColumns: mobile ? undefined : "repeat(3,1fr)",
            overflowX: mobile ? "auto" : "visible",
            scrollSnapType: mobile ? "x mandatory" : undefined,
            paddingBottom: mobile ? "4px" : 0,
          }}
        >
          {updates.map((u, i) => {
            const ac = updateAccent(u.type);
            const isHov = hov === i;
            const tagColors = {
              "Policy Update": { bg: C.teal, color: "#fff" },
              "Sector Brief": { bg: C.primary, color: "#fff" },
              "Annual Review": { bg: C.accent, color: C.primary },
            };
            const tc = tagColors[u.type] || { bg: C.primary, color: "#fff" };
            return (
              <div
                key={u.id}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                onClick={() => onCardClick(u)}
                className="flex flex-col gap-2.5 py-4 px-[18px] rounded-lg cursor-pointer transition-all duration-150 ease-in-out box-border"
                style={{
                  border: `1px solid ${isHov ? ac : C.line}`,
                  borderLeft: `3px solid ${ac}`,
                  background: u.free && isHov ? "#FAFCF7" : isHov ? "#FAFAFA" : C.white,
                  boxShadow: isHov ? "0 4px 16px rgba(0,0,0,0.06)" : "none",
                  opacity: !u.free ? 0.8 : 1,
                  flexShrink: mobile ? 0 : undefined,
                  width: mobile ? "80vw" : "auto",
                  maxWidth: mobile ? "300px" : "none",
                  scrollSnapAlign: mobile ? "start" : undefined,
                }}
              >
                <div className="flex items-center gap-[5px]">
                  <span
                    className="text-[9px] font-extrabold tracking-[0.9px] uppercase py-[3px] px-2 rounded font-[Inter,sans-serif]"
                    style={{ background: tc.bg, color: tc.color }}
                  >
                    {u.type}
                  </span>
                  {u.free && (
                    <span
                      className="text-[9px] font-extrabold tracking-[0.9px] uppercase py-[3px] px-2 rounded font-[Inter,sans-serif]"
                      style={{ background: C.accentBg, color: C.primary }}
                    >
                      Free
                    </span>
                  )}
                </div>
                <div
                  className="text-[13.5px] font-bold font-[DM_Sans,sans-serif] leading-[1.4]"
                  style={{ color: u.free ? C.dark : C.primary }}
                >
                  {u.title}
                </div>
                <div className="flex items-center gap-1.5 mt-auto">
                  <span className="text-[11px] font-[Inter,sans-serif]" style={{ color: C.muted }}>{u.date}</span>
                  <span style={{ color: C.line }}>·</span>
                  <span className="text-[11px] font-[Inter,sans-serif]" style={{ color: C.muted }}>
                    {u.read} read
                  </span>
                  <div className="ml-auto">
                    {u.free ? (
                      <button
                        className="flex items-center gap-1 border-none text-[11px] font-bold cursor-pointer py-1 px-2.5 rounded-[5px] font-[Inter,sans-serif]"
                        style={{ background: C.accentBg, color: C.primary }}
                      >
                        Read <ArrowUpRight size={10} />
                      </button>
                    ) : (
                      <div
                        className="flex items-center gap-1 py-1 px-[9px] rounded-[5px]"
                        style={{ background: isLoggedIn ? `${C.teal}12` : "rgba(0,0,0,0.04)" }}
                      >
                        {isLoggedIn ? (
                          <Eye size={10} color={C.teal} />
                        ) : (
                          <Lock size={10} color={C.muted} />
                        )}
                        <span
                          className="text-[10px] font-semibold font-[Inter,sans-serif]"
                          style={{ color: isLoggedIn ? C.teal : C.muted }}
                        >
                          {isLoggedIn ? "Read" : "Members"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {mobile && (
          <div className="flex justify-center gap-[5px] mt-2.5">
            {updates.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: i === 0 ? C.primary : C.line }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Notify Me Modal ─────────────────────────────────────
function NotifyMeModal({ isOpen, onClose, docTitle, isLoggedIn }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-xl max-w-[420px] w-full p-8 relative shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
        style={{ background: C.white }}
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 bg-none border-none cursor-pointer p-1"
        >
          <X size={18} color={C.muted} />
        </button>
        <div
          className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-4"
          style={{ background: C.accentBg }}
        >
          <Bell size={22} color={C.primary} />
        </div>
        <h3
          className="text-lg font-bold font-[DM_Sans,sans-serif] mb-2"
          style={{ color: C.dark }}
        >
          Get Notified
        </h3>
        <p
          className="text-[13px] font-[Inter,sans-serif] leading-[1.6] mb-5"
          style={{ color: C.muted }}
        >
          We'll notify you when <strong style={{ color: C.dark }}>{docTitle}</strong> becomes available.
        </p>
        {submitted ? (
          <div
            className="p-3.5 rounded-lg text-[13px] font-semibold font-[Inter,sans-serif] text-center"
            style={{
              background: `${C.teal}10`,
              border: `1px solid ${C.teal}30`,
              color: C.teal,
            }}
          >
            You're on the list! We'll be in touch.
          </div>
        ) : isLoggedIn ? (
          <button
            onClick={() => setSubmitted(true)}
            className="w-full flex items-center justify-center gap-2 border-none p-3 rounded-lg text-sm font-bold font-[Inter,sans-serif] cursor-pointer"
            style={{ background: C.primary, color: C.white }}
          >
            <Bell size={14} /> Notify Me When Available
          </button>
        ) : (
          <div className="flex flex-col gap-2.5">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-lg text-[13px] font-[Inter,sans-serif] outline-none box-border"
              style={{ border: `1px solid ${C.line}` }}
            />
            <button
              onClick={() => { if (email) setSubmitted(true); }}
              className="w-full flex items-center justify-center gap-2 border-none p-3 rounded-lg text-sm font-bold font-[Inter,sans-serif] cursor-pointer"
              style={{
                background: C.primary,
                color: C.white,
                opacity: email ? 1 : 0.5,
              }}
            >
              <Bell size={14} /> Notify Me
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Resource Hub Tab (Paid Only) ─────────────────────────
function ResourceHubTab({ mobile, isPaid, onUnlock, onNavigate }: { mobile: boolean; isPaid: boolean; onUnlock: () => void; onNavigate: () => void }) {
  if (!isPaid) {
    return (
      <div style={{ textAlign: "center", padding: mobile ? "40px 16px" : "64px 32px" }}>
        <div
          style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "rgba(184,217,53,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <Crown size={32} color={C.primary} />
        </div>
        <h3
          style={{
            margin: "0 0 12px", fontSize: mobile ? "20px" : "24px",
            fontWeight: 700, color: "#111827",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Resource Hub — Paid Members Only
        </h3>
        <p
          style={{
            margin: "0 auto 8px", fontSize: "15px",
            color: C.muted, lineHeight: 1.65,
            maxWidth: 460, fontFamily: "'Inter', sans-serif",
          }}
        >
          Access the full BRIDGE Member Document Dashboard — intelligence, methodology reports,
          portfolio overview, sector data, and the complete research archive.
        </p>
        <div
          style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: 8, margin: "20px auto 28px", maxWidth: 400,
          }}
        >
          {[
            "Impact Score™ Methodology",
            "Peace & Prosperity Framework",
            "Venture Portfolio Overview",
            "All 12 Sector Briefs",
            "Budget Alignment Report",
            "Monthly Dashboards",
          ].map((item) => (
            <span
              key={item}
              style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontSize: "11px", fontWeight: 600,
                color: C.primary, background: "rgba(27,77,62,0.06)",
                padding: "4px 10px", borderRadius: 20,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Lock size={9} /> {item}
            </span>
          ))}
        </div>
        <button
          onClick={onUnlock}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 32px", borderRadius: 100,
            background: C.primary, color: C.white,
            border: "none", fontSize: "14px", fontWeight: 700,
            fontFamily: "'Inter', sans-serif", cursor: "pointer",
          }}
        >
          <Lock size={14} /> Unlock Resource Hub
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: mobile ? "40px 16px" : "48px 32px" }}>
      <div
        style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(184,217,53,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}
      >
        <Crown size={28} color={C.primary} />
      </div>
      <h3
        style={{
          margin: "0 0 8px", fontSize: mobile ? "20px" : "24px",
          fontWeight: 700, color: "#111827",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Member Document Dashboard
      </h3>
      <p
        style={{
          margin: "0 auto 24px", fontSize: "15px",
          color: C.muted, lineHeight: 1.65,
          maxWidth: 460, fontFamily: "'Inter', sans-serif",
        }}
      >
        Your complete intelligence library — methodology reports, portfolio data, sector analyses,
        policy tracking, and the full research archive.
      </p>
      <button
        onClick={onNavigate}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "14px 32px", borderRadius: 100,
          background: C.accent, color: C.primary,
          border: "none", fontSize: "14px", fontWeight: 700,
          fontFamily: "'Inter', sans-serif", cursor: "pointer",
        }}
      >
        Open Resource Hub <ArrowUpRight size={15} />
      </button>
    </div>
  );
}

export default function ResourcesPage() {
  usePageMeta({ title: "Resources & Research Library", description: "Sector intelligence briefs, policy trackers, white papers, and the complete BRIDGE research archive." });
  const navigate = useNavigate();
  const { user, tier } = useAuth();
  const [tab, setTab] = useState("intelligence");
  const [mobile, setMobile] = useState(false);
  const [filter, setFilter] = useState("All");
  const [showAuth, setShowAuth] = useState(false);
  const [notifyModal, setNotifyModal] = useState<{ open: boolean; title: string }>({ open: false, title: "" });

  const handleCardClick = (update: typeof updates[number]) => {
    if (update.free) {
      navigate(update.path);
    } else if (user) {
      navigate(update.path);
    } else {
      navigate(`/login?redirect=${encodeURIComponent(update.path)}`);
    }
  };

  const handleDocNavigate = (doc: typeof docs[number]) => {
    if (!doc.path) return;
    // White paper: free to preview (no login required)
    if (doc.noDownload) {
      navigate(doc.path);
      return;
    }
    // Free docs: navigate directly
    if (doc.free) {
      navigate(doc.path);
      return;
    }
    // Paid-only: require paid tier
    if (doc.paidOnly) {
      if (tier === "paid") {
        navigate(doc.path);
      } else if (user) {
        // Show upgrade prompt - navigate to login with redirect
        navigate(`/login?redirect=${encodeURIComponent(doc.path)}&upgrade=true`);
      } else {
        navigate(`/login?redirect=${encodeURIComponent(doc.path)}`);
      }
      return;
    }
    // Subscription docs with free/paid tiers
    if (doc.requiresSignIn) {
      if (tier === "paid" && doc.paidPath) {
        navigate(doc.paidPath);
      } else if (user) {
        navigate(doc.path);
      } else {
        navigate(`/login?redirect=${encodeURIComponent(doc.path)}`);
      }
      return;
    }
    // Default: require login
    if (user) {
      navigate(doc.path);
    } else {
      navigate(`/login?redirect=${encodeURIComponent(doc.path)}`);
    }
  };

  const handleNotifyMe = (doc: typeof docs[number]) => {
    setNotifyModal({ open: true, title: doc.title });
  };
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 900);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  const shownCount =
    filter === "All" ? sectors.length : sectors.filter((s) => s.full === filter || s.tag === filter).length;

  const tabs = [
    {
      id: "intelligence",
      label: "BRIDGE Intelligence",
      mobileLabel: "BRIDGE Intelligence",
      icon: BarChart3,
      count: "12 sectors",
    },
    { id: "gipc", label: "GIPC Profiles", mobileLabel: "GIPC Profile", icon: BookCopy, count: "13 profiles" },
    { id: "library", label: "Document Library", mobileLabel: "Library", icon: Folder, count: `${docs.length} resources` },
    { id: "resourcehub", label: "Resource Hub", mobileLabel: "Resource Hub", icon: Crown, count: "Paid", isPaid: true },
  ];

  return (
    <Layout>
    <div className="min-h-screen font-[DM_Sans,sans-serif]" style={{ background: C.bg }}>

      {/* ── HERO ── */}
      <section style={{ background: C.primary, padding: mobile ? "52px 20px 40px" : `72px ${PAD} 52px` }}>
        <div className="mx-auto" style={{ maxWidth: MAX }}>
          <div
            className="flex justify-between gap-10"
            style={{
              flexDirection: mobile ? "column" : "row",
              alignItems: mobile ? "flex-start" : "flex-end",
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-2 border border-[rgba(184,217,53,0.5)] rounded-full py-1 pl-2 pr-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
                  <span
                    className="text-[11px] font-bold font-[Inter,sans-serif] tracking-[1.2px] uppercase"
                    style={{ color: C.accent }}
                  >
                    Ghana Intelligence Hub
                  </span>
                </div>
              </div>
              <h1
                className="m-0 mb-3 font-light leading-[1.05] tracking-[-1.5px] font-[DM_Sans,sans-serif]"
                style={{
                  fontSize: mobile ? "32px" : "52px",
                  color: C.white,
                }}
              >
                Resources & <span className="font-bold">Research Library</span>
              </h1>
              <p
                className="m-0 mb-7 text-white/60 leading-[1.65] max-w-[460px] font-[Inter,sans-serif]"
                style={{ fontSize: mobile ? "14px" : "16px" }}
              >
                Sector intelligence, official GIPC investment profiles, and the complete BRIDGE research archive — in
                one place.
              </p>
              <a
                href="/intelligence/dashboard"
                onClick={(e) => { e.preventDefault(); navigate("/intelligence/dashboard"); }}
                className="inline-flex items-center gap-2 no-underline py-3 px-6 rounded-full text-sm font-bold font-[Inter,sans-serif] cursor-pointer box-border"
                style={{
                  background: C.accent,
                  color: C.primary,
                  width: mobile ? "100%" : "auto",
                  justifyContent: mobile ? "center" : "flex-start",
                }}
              >
                Access Dashboard <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S NEW ── */}
      <WhatsNew mobile={mobile} onCardClick={handleCardClick} isLoggedIn={!!user} />

      {/* ── TAB CONTAINER ── */}
      <section style={{ background: C.bg, padding: mobile ? "24px 20px 48px" : `32px ${PAD} 64px` }}>
        <div className="mx-auto" style={{ maxWidth: MAX }}>
          <div
            className="rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            style={{
              background: C.white,
              border: `1px solid ${C.line}`,
            }}
          >
            {/* Tab bar — segmented control style */}
            <div
              className="flex items-center relative"
              style={{
                background: C.bg,
                borderBottom: `1px solid ${C.line}`,
                padding: mobile ? "12px 16px" : "14px 32px",
                justifyContent: mobile ? "center" : "initial",
              }}
            >
              {/* Segmented pill container — centered */}
              <div
                className="flex scrollbar-none rounded-[10px] p-1"
                style={{
                  overflowX: mobile ? "auto" : "visible",
                  background: C.white,
                  border: `1px solid ${C.line}`,
                  flexShrink: mobile ? 1 : 0,
                }}
              >
                {tabs.map((t) => {
                  const Icon = t.icon;
                  const isActive = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className="flex items-center gap-[7px] border-none rounded-[7px] cursor-pointer font-[Inter,sans-serif] transition-all duration-[180ms] whitespace-nowrap"
                      style={{
                        padding: mobile ? "8px 14px" : "8px 18px",
                        background: isActive ? C.primary : "transparent",
                        fontSize: mobile ? "12px" : "13px",
                        fontWeight: isActive ? "700" : "500",
                        color: isActive ? C.white : C.muted,
                      }}
                    >
                      <Icon size={13} style={{ opacity: isActive ? 1 : 0.6 }} />
                      {mobile ? t.mobileLabel : t.label}
                      {!mobile && (
                        <span
                          className="py-[2px] px-[7px] rounded-[20px] text-[10px] font-bold font-[Inter,sans-serif] transition-all duration-[180ms]"
                          style={{
                            background: (t as any).isPaid
                              ? (isActive ? "rgba(184,217,53,0.3)" : "rgba(184,217,53,0.15)")
                              : (isActive ? "rgba(255,255,255,0.18)" : C.bg),
                            color: (t as any).isPaid
                              ? (isActive ? C.accent : C.primary)
                              : (isActive ? C.white : C.muted),
                          }}
                        >
                          {t.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Count — only on BRIDGE Intelligence tab */}
              {tab === "intelligence" && !mobile && (
                <span
                  className="text-xs font-[Inter,sans-serif] shrink-0 ml-auto"
                  style={{ color: C.muted }}
                >
                  {shownCount} of 12
                </span>
              )}
            </div>

            {/* Tab content */}
            <div className="min-h-[500px]" style={{ padding: mobile ? "20px 16px" : "40px 32px" }}>
              {tab === "intelligence" && <BridgeTab mobile={mobile} filter={filter} setFilter={setFilter} isLoggedIn={!!user} onUnlock={() => {
                if (!user) {
                  navigate("/login?redirect=/resources");
                } else {
                  setShowAuth(true);
                }
              }} onNavigate={(slug: string) => {
                const sector = sectors.find((s) => s.slug === slug);
                const sectorIndex = sectors.findIndex((s) => s.slug === slug);
                const sectorId = sectorIndex + 1;
                const briefPath = `/resources/sector-briefs?sector=${sectorId}`;
                if (sector?.free || user) {
                  navigate(briefPath);
                } else {
                  navigate(`/login?redirect=${encodeURIComponent(briefPath)}`);
                }
              }} />}
              {tab === "gipc" && <GIPCTab mobile={mobile} />}
              {tab === "library" && <LibraryTab mobile={mobile} onNavigate={handleDocNavigate} onNotifyMe={handleNotifyMe} />}
              {tab === "resourcehub" && <ResourceHubTab mobile={mobile} isPaid={tier === "paid"} onUnlock={() => {
                if (!user) {
                  navigate("/login?redirect=/resources");
                } else {
                  navigate("/membership");
                }
              }} onNavigate={() => navigate("/resources/document-library")} />}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ padding: mobile ? "48px 20px" : `56px ${PAD}`, background: C.primary }}>
        <div
          className="mx-auto grid items-center gap-6"
          style={{
            maxWidth: MAX,
            gridTemplateColumns: mobile ? "1fr" : "1fr auto",
          }}
        >
          <div>
            <div
              className="text-[22px] font-bold font-[DM_Sans,sans-serif] mb-1.5"
              style={{ color: C.white }}
            >
              Intelligence is the first investment.
            </div>
            <div className="text-sm text-white/55 font-[Inter,sans-serif]">
              Get full access to the complete BRIDGE research suite — 12 sector analyses, 174+ ventures, and ongoing
              policy intelligence.
            </div>
          </div>
          <div
            className="flex gap-2.5 shrink-0"
            style={{
              flexDirection: mobile ? "column" : "row",
              width: mobile ? "100%" : "auto",
            }}
          >
            <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }} className="no-underline" style={{ width: mobile ? "100%" : "auto" }}>
              <button
                className="flex items-center justify-center gap-2 border-none py-3 px-[22px] rounded-full text-sm font-bold font-[Inter,sans-serif] cursor-pointer w-full text-center"
                style={{ background: C.accent, color: C.primary }}
              >
                <Lock size={13} />
                Get Full Access
                <ArrowUpRight size={14} />
              </button>
            </a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} className="no-underline" style={{ width: mobile ? "100%" : "auto" }}>
              <button className="bg-transparent text-white/65 border border-white/[0.18] py-3 px-[22px] rounded-full text-sm font-semibold font-[Inter,sans-serif] cursor-pointer w-full text-center">
                Partner with BRIDGE
              </button>
            </a>
          </div>
        </div>
      </section>

      <BRIDGEAuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        defaultTab="signin"
        onSignInSuccess={() => {
          setShowAuth(false);
        }}
      />
      <NotifyMeModal
        isOpen={notifyModal.open}
        onClose={() => setNotifyModal({ open: false, title: "" })}
        docTitle={notifyModal.title}
        isLoggedIn={!!user}
      />
    </div>
    </Layout>
  );
}
