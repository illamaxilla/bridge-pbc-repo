import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BRIDGEAuthModal } from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";
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
} from "lucide-react";

// ─── Design System ────────────────────────────────────────
import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/use-mobile";
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
    tag: "Free Download",
    free: true,
    pages: "48 pages",
    action: "Download PDF",
    soon: false,
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
  },
  {
    id: 3,
    icon: BarChart3,
    label: "Data & Reports",
    title: "BRIDGE Portfolio Data — 174+ Ventures",
    desc: "Full venture pipeline data across all sectors including scoring matrices, capital ranges by tier, and priority rankings.",
    tag: "Subscription",
    free: false,
    pages: "174 ventures",
    action: "Unlock Access",
    soon: false,
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
    soon: true,
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
    path: "/resources/policy-brief",
  },
  {
    id: 2,
    type: "Sector Brief",
    title: "Agriculture Crisis & Strategic Positioning",
    date: "Feb 2026",
    read: "12 min",
    free: false,
    path: "/resources/sector-brief/agriculture",
  },
  {
    id: 3,
    type: "Annual Review",
    title: "BRIDGE 2025 Sector Intelligence Review",
    date: "Jan 2026",
    read: "20 min",
    free: false,
    path: "/resources/annual-review",
  },
];

// ─── Tag Variants by doc type ─────────────────────────────
function docTagStyle(tag) {
  if (tag === "Free Download") return { bg: C.accentBg, color: C.primary };
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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "3px 9px",
        borderRadius: "4px",
        fontSize: "10px",
        fontWeight: "700",
        letterSpacing: "0.8px",
        fontFamily: "Inter,sans-serif",
        textTransform: "uppercase",
        background: bg,
        color,
      }}
    >
      {children}
    </span>
  );
}

function ScoreBar({ score }) {
  const pct = score / 100;
  const color = score >= 88 ? C.accent : score >= 82 ? C.teal : C.muted;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ width: "60px", height: "4px", background: C.line, borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: "2px" }} />
      </div>
      <span
        style={{
          fontSize: "11px",
          fontWeight: "700",
          color: C.mutedDark,
          fontFamily: "Inter,sans-serif",
          minWidth: "24px",
        }}
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
          style={{
            padding: "14px 0",
            cursor: "pointer",
            background: expanded ? `${C.primary}04` : "transparent",
            transition: "background 0.15s",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                background: expanded ? C.accentBg : C.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.15s",
              }}
            >
              {s.svgIcon(C.primary, 16)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "13.5px",
                  fontWeight: "600",
                  color: C.dark,
                  fontFamily: "DM Sans,sans-serif",
                  lineHeight: 1.3,
                  marginBottom: "4px",
                }}
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
              style={{
                flexShrink: 0,
                marginTop: "4px",
                transform: expanded ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
              paddingLeft: "50px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                style={{ width: "40px", height: "3px", background: C.line, borderRadius: "2px", overflow: "hidden" }}
              >
                <div
                  style={{
                    width: `${s.score}%`,
                    height: "100%",
                    background: s.score >= 88 ? C.accent : s.score >= 82 ? C.teal : C.muted,
                    borderRadius: "2px",
                  }}
                />
              </div>
              <span style={{ fontSize: "10px", fontWeight: "700", color: C.mutedDark, fontFamily: "Inter,sans-serif" }}>
                {s.score}
              </span>
            </div>
            <span style={{ color: C.line, fontSize: "10px" }}>·</span>
            <span style={{ fontSize: "11px", fontWeight: "700", color: C.primary, fontFamily: "Inter,sans-serif" }}>
              {s.cap}
            </span>
            <span style={{ color: C.line, fontSize: "10px" }}>·</span>
            <span style={{ fontSize: "11px", color: C.mutedDark, fontFamily: "Inter,sans-serif" }}>
              {s.ventures} ventures
            </span>
            <span style={{ color: C.line, fontSize: "10px" }}>·</span>
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
          <div style={{ paddingBottom: "16px", paddingLeft: "50px" }}>
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "13px",
                fontWeight: "600",
                color: C.primary,
                lineHeight: 1.5,
                fontFamily: "DM Sans,sans-serif",
              }}
            >
              {s.headline}
            </p>
            <p
              style={{
                margin: "0 0 14px",
                fontSize: "12px",
                color: C.muted,
                lineHeight: 1.65,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {s.teaser}
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate(s.slug); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: (s.free || isLoggedIn) ? C.accent : C.primary,
                color: (s.free || isLoggedIn) ? C.primary : C.white,
                border: "none",
                padding: "10px 18px",
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
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
        style={{
          display: "grid",
          gridTemplateColumns: "44px 1fr 120px 100px 80px 100px",
          alignItems: "center",
          gap: "12px",
          padding: "13px 0",
          cursor: "pointer",
          background: expanded ? `${C.primary}06` : "transparent",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!expanded) e.currentTarget.style.background = C.bg;
        }}
        onMouseLeave={(e) => {
          if (!expanded) e.currentTarget.style.background = "transparent";
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: expanded ? C.accentBg : C.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
        >
          {s.svgIcon(C.primary, 16)}
        </div>
        <div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: C.dark,
              fontFamily: "DM Sans,sans-serif",
              lineHeight: 1.3,
              marginBottom: "3px",
            }}
          >
            {s.full}
          </div>
          <Tag bg={`${C.primary}10`} color={C.teal}>
            {s.tag}
          </Tag>
        </div>
        <ScoreBar score={s.score} />
        <div style={{ fontSize: "13px", fontWeight: "700", color: C.primary, fontFamily: "Inter,sans-serif" }}>
          {s.cap}
        </div>
        <div
          style={{
            fontSize: "13px",
            color: C.mutedDark,
            fontFamily: "Inter,sans-serif",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {s.ventures}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
        <div
          style={{
            padding: "4px 0 20px 56px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "24px",
            alignItems: "flex-start",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 6px",
                fontSize: "14px",
                fontWeight: "600",
                color: C.primary,
                lineHeight: 1.5,
                fontFamily: "DM Sans,sans-serif",
              }}
            >
              {s.headline}
            </p>
            <p
              style={{ margin: 0, fontSize: "13px", color: C.muted, lineHeight: 1.65, fontFamily: "Inter,sans-serif" }}
            >
              {s.teaser}
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(s.slug); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
              background: (s.free || isLoggedIn) ? C.accent : C.primary,
              color: (s.free || isLoggedIn) ? C.primary : C.white,
              border: "none",
              padding: "10px 18px",
              borderRadius: "50px",
              fontSize: "12px",
              fontWeight: "700",
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
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
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        title={label}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "7px",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          background: active ? C.primary : hov ? `${C.primary}10` : C.bg,
          transition: "all 0.15s",
          boxShadow: active ? `0 2px 8px ${C.primary}30` : "none",
        }}
      >
        {svgIcon(iconColor, 14)}
      </button>
      {hov && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: C.dark,
            color: C.white,
            padding: "4px 8px",
            borderRadius: "5px",
            fontSize: "10px",
            fontWeight: "600",
            fontFamily: "Inter,sans-serif",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 100,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {label}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: `4px solid ${C.dark}`,
            }}
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
          style={{
            display: "grid",
            gridTemplateColumns: "44px 1fr 120px 100px 80px 100px",
            gap: "12px",
            paddingBottom: "10px",
            borderBottom: `2px solid ${C.dark}`,
          }}
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
              style={{
                fontSize: "10px",
                fontWeight: "700",
                color: C.mutedDark,
                fontFamily: "Inter,sans-serif",
                letterSpacing: "1px",
                textTransform: "uppercase",
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
      <div style={{ padding: "10px 0", borderBottom: `1px solid ${C.line}` }}>
        {mobile ? (
          <div style={{ display: "flex", gap: "8px", alignItems: "stretch" }}>
            {/* All — spans both rows */}
            <button
              onClick={() => setFilter("All")}
              style={{
                minWidth: "52px",
                borderRadius: "8px",
                border: "none",
                flexShrink: 0,
                fontSize: "13px",
                fontWeight: filter === "All" ? "700" : "500",
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
                background: filter === "All" ? C.primary : C.bg,
                color: filter === "All" ? C.white : C.muted,
                transition: "all 0.15s",
                alignSelf: "stretch",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              All
            </button>

            <div style={{ width: "1px", background: C.line, flexShrink: 0 }} />

            {/* 2×6 icon grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gridTemplateRows: "repeat(2, 32px)",
                gap: "5px",
                flex: 1,
              }}
            >
              {sectors.map((s) => (
                <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {/* All pill */}
            <button
              onClick={() => setFilter("All")}
              style={{
                padding: "5px 14px",
                borderRadius: "6px",
                border: "none",
                flexShrink: 0,
                fontSize: "12px",
                fontWeight: filter === "All" ? "700" : "500",
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
                background: filter === "All" ? C.primary : C.bg,
                color: filter === "All" ? C.white : C.muted,
                transition: "all 0.15s",
              }}
            >
              All
            </button>

            <div style={{ width: "1px", height: "20px", background: C.line, flexShrink: 0 }} />

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
        <div style={{ marginTop: "24px", padding: "20px", background: C.primary, borderRadius: "10px" }}>
          <div style={{ marginBottom: mobile ? "14px" : "8px" }}>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: C.white,
                fontFamily: "DM Sans,sans-serif",
                marginBottom: "4px",
              }}
            >
              11 of 12 analyses are subscriber-only
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.55)",
                fontFamily: "Inter,sans-serif",
                lineHeight: 1.5,
              }}
            >
              Sign in for free to access all 12 sector intelligence briefs with venture portfolios, risk frameworks, and capital breakdowns.
            </div>
          </div>
          <button
            onClick={onUnlock}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: C.accent,
              color: C.primary,
              border: "none",
              padding: "12px 22px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: "700",
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
              width: mobile ? "100%" : "auto",
            }}
          >
            Sign In to Unlock <ArrowUpRight size={14} />
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "24px", padding: "20px", background: `${C.primary}08`, border: `1px solid ${C.line}`, borderRadius: "10px" }}>
          <div style={{ marginBottom: mobile ? "14px" : "8px" }}>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: C.primary,
                fontFamily: "DM Sans,sans-serif",
                marginBottom: "4px",
              }}
            >
              Upgrade to full access
            </div>
            <div
              style={{
                fontSize: "12px",
                color: C.muted,
                fontFamily: "Inter,sans-serif",
                lineHeight: 1.5,
              }}
            >
              Paid members get the complete BRIDGE intelligence suite — venture-level data, implementation playbooks, direct introductions, and priority analyst access.
            </div>
          </div>
          <button
            onClick={onUnlock}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: C.primary,
              color: C.white,
              border: "none",
              padding: "12px 22px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: "700",
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
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
      style={{
        border: `1px solid ${active ? C.primary : C.line}`,
        borderRadius: "8px",
        padding: "14px",
        cursor: "pointer",
        transition: "all 0.15s",
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
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "6px",
          background: active ? "rgba(255,255,255,0.15)" : C.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Icon size={15} color={active ? C.accent : C.primary} />
      </div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: "700",
          color: active ? C.white : C.dark,
          fontFamily: "DM Sans,sans-serif",
          lineHeight: 1.3,
          marginBottom: "3px",
        }}
      >
        {book.title}
      </div>
      <div
        style={{ fontSize: "10px", color: active ? "rgba(255,255,255,0.55)" : C.muted, fontFamily: "Inter,sans-serif" }}
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
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "14px 18px",
          background: C.bg,
          border: `1px solid ${C.line}`,
          borderLeft: `3px solid ${C.primary}`,
          borderRadius: "6px",
          marginBottom: "28px",
        }}
      >
        <ShieldCheck size={14} color={C.primary} style={{ flexShrink: 0, marginTop: "1px" }} />
        <div style={{ fontSize: "12px", color: C.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.55 }}>
          Published by the <strong style={{ color: C.dark }}>Ghana Investment Promotion Centre (GIPC)</strong>. Shared
          here as a public resource — BRIDGE makes no claim to authorship. Visit{" "}
          <span style={{ color: C.primary, fontWeight: "700" }}>gipcghana.com</span> for GIPC investment inquiries.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 300px",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >
        {/* Grid of books */}
        <div
          style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "10px" }}
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
          style={{
            border: `1px solid ${C.line}`,
            borderRadius: "8px",
            overflow: "hidden",
            position: mobile ? "static" : "sticky",
            top: "72px",
          }}
        >
          {active ? (
            <>
              <div style={{ background: C.primary, padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <active.icon size={18} color={C.accent} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: C.white,
                        fontFamily: "DM Sans,sans-serif",
                        lineHeight: 1.2,
                      }}
                    >
                      {active.title}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontFamily: "Inter,sans-serif" }}>
                      {active.subtitle}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {[
                    ["Pages", `${active.pages}`],
                    ["Year", "2025"],
                    ["Source", "GIPC"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.45)",
                          fontFamily: "Inter,sans-serif",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.6px",
                        }}
                      >
                        {l}
                      </div>
                      <div
                        style={{ fontSize: "15px", fontWeight: "700", color: C.white, fontFamily: "Inter,sans-serif" }}
                      >
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "18px 22px" }}>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontSize: "12px",
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    lineHeight: 1.65,
                  }}
                >
                  Official GIPC investment climate profile covering the regulatory environment, FDI statistics, sector
                  macro-indicators, investment incentives, and government priorities for{" "}
                  <strong style={{ color: C.dark }}>{active.title.toLowerCase()}</strong>.
                </p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      background: C.primary,
                      color: C.white,
                      border: "none",
                      padding: "10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                      fontFamily: "Inter,sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    <Download size={12} />
                    Download Free
                  </button>
                  <button
                    style={{
                      width: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: C.bg,
                      border: `1px solid ${C.line}`,
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <ExternalLink size={13} color={C.muted} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ padding: "40px 22px", textAlign: "center" }}>
              <BookCopy size={28} color={C.line} style={{ margin: "0 auto 10px" }} />
              <div style={{ fontSize: "13px", color: C.muted, fontFamily: "Inter,sans-serif" }}>
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
function DocRow({ doc, mobile }) {
  const Icon = doc.icon;
  const ts = docTagStyle(doc.tag);

  if (mobile) {
    return (
      <div style={{ padding: "16px 0", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "8px",
              background: doc.free ? C.accentBg : C.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={18} color={doc.free ? C.primary : C.mutedDark} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  color: C.muted,
                  fontFamily: "Inter,sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                }}
              >
                {doc.label}
              </span>
              <Tag bg={ts.bg} color={ts.color}>
                {doc.tag}
              </Tag>
            </div>
            <div
              style={{
                fontSize: "13.5px",
                fontWeight: "700",
                color: C.dark,
                fontFamily: "DM Sans,sans-serif",
                lineHeight: 1.3,
                marginBottom: "5px",
              }}
            >
              {doc.title}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: C.muted,
                fontFamily: "Inter,sans-serif",
                lineHeight: 1.5,
                marginBottom: "12px",
              }}
            >
              {doc.desc}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
              {doc.pages && (
                <span style={{ fontSize: "11px", fontWeight: "600", color: C.muted, fontFamily: "Inter,sans-serif" }}>
                  {doc.pages}
                </span>
              )}
              <button
                disabled={doc.soon}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginLeft: "auto",
                  background: doc.soon ? "transparent" : doc.free ? C.accent : C.primary,
                  color: doc.soon ? C.muted : doc.free ? C.primary : C.white,
                  border: doc.soon ? `1px solid ${C.line}` : "none",
                  padding: "8px 16px",
                  borderRadius: "50px",
                  fontSize: "12px",
                  fontWeight: "700",
                  fontFamily: "Inter,sans-serif",
                  cursor: doc.soon ? "not-allowed" : "pointer",
                  opacity: doc.soon ? 0.6 : 1,
                  whiteSpace: "nowrap",
                }}
              >
                {!doc.soon && (doc.free ? <Download size={11} /> : <Lock size={11} />)}
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
      style={{
        display: "grid",
        gridTemplateColumns: "52px 1fr 120px 160px",
        alignItems: "center",
        gap: "20px",
        padding: "18px 0",
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "8px",
          background: doc.free ? C.accentBg : C.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={20} color={doc.free ? C.primary : C.mutedDark} />
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: "10px",
              fontWeight: "700",
              color: C.muted,
              fontFamily: "Inter,sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
            }}
          >
            {doc.label}
          </span>
          <Tag bg={ts.bg} color={ts.color}>
            {doc.tag}
          </Tag>
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: C.dark,
            fontFamily: "DM Sans,sans-serif",
            lineHeight: 1.3,
            marginBottom: "4px",
          }}
        >
          {doc.title}
        </div>
        <div style={{ fontSize: "12px", color: C.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.55 }}>
          {doc.desc}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        {doc.pages && (
          <div style={{ fontSize: "12px", fontWeight: "600", color: C.muted, fontFamily: "Inter,sans-serif" }}>
            {doc.pages}
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          disabled={doc.soon}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: doc.soon ? "transparent" : doc.free ? C.accent : C.primary,
            color: doc.soon ? C.muted : doc.free ? C.primary : C.white,
            border: doc.soon ? `1px solid ${C.line}` : "none",
            padding: "9px 16px",
            borderRadius: "50px",
            fontSize: "12px",
            fontWeight: "700",
            fontFamily: "Inter,sans-serif",
            cursor: doc.soon ? "not-allowed" : "pointer",
            opacity: doc.soon ? 0.6 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {!doc.soon && (doc.free ? <Download size={11} /> : <Lock size={11} />)}
          {doc.action}
        </button>
      </div>
    </div>
  );
}

function LibraryTab({ mobile }) {
  return (
    <div>
      {/* Column headers — desktop only */}
      {!mobile && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "52px 1fr 120px 160px",
            gap: "20px",
            paddingBottom: "10px",
            borderBottom: `2px solid ${C.dark}`,
          }}
        >
          {["", "Document", "Size", ""].map((h, i) => (
            <div
              key={i}
              style={{
                fontSize: "10px",
                fontWeight: "700",
                color: C.mutedDark,
                fontFamily: "Inter,sans-serif",
                letterSpacing: "1px",
                textTransform: "uppercase",
                textAlign: i > 1 ? "right" : "left",
              }}
            >
              {h}
            </div>
          ))}
        </div>
      )}
      {mobile && (
        <div style={{ paddingBottom: "12px", borderBottom: `2px solid ${C.dark}`, marginBottom: "4px" }}>
          <span
            style={{
              fontSize: "10px",
              fontWeight: "700",
              color: C.mutedDark,
              fontFamily: "Inter,sans-serif",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            6 Documents
          </span>
        </div>
      )}
      {docs.map((doc) => (
        <DocRow key={doc.id} doc={doc} mobile={mobile} />
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
      <div style={{ maxWidth: MAX, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "700",
              color: C.primary,
              fontFamily: "Inter,sans-serif",
              letterSpacing: "1px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            What's New
          </span>
          <div style={{ flex: 1, height: "1px", background: C.line }} />
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              fontSize: "11px",
              fontWeight: "700",
              color: C.muted,
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            All Updates <ArrowUpRight size={10} />
          </button>
        </div>
        <div
          style={{
            display: mobile ? "flex" : "grid",
            gridTemplateColumns: mobile ? undefined : "repeat(3,1fr)",
            gap: "10px",
            overflowX: mobile ? "auto" : "visible",
            scrollSnapType: mobile ? "x mandatory" : undefined,
            paddingBottom: mobile ? "4px" : 0,
            scrollbarWidth: "none",
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "16px 18px",
                  border: `1px solid ${isHov ? ac : C.line}`,
                  borderLeft: `3px solid ${ac}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: u.free && isHov ? "#FAFCF7" : isHov ? "#FAFAFA" : C.white,
                  boxShadow: isHov ? "0 4px 16px rgba(0,0,0,0.06)" : "none",
                  opacity: !u.free ? 0.8 : 1,
                  flexShrink: mobile ? 0 : undefined,
                  width: mobile ? "80vw" : "auto",
                  maxWidth: mobile ? "300px" : "none",
                  scrollSnapAlign: mobile ? "start" : undefined,
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: "800",
                      letterSpacing: "0.9px",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      background: tc.bg,
                      color: tc.color,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {u.type}
                  </span>
                  {u.free && (
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: "800",
                        letterSpacing: "0.9px",
                        textTransform: "uppercase",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        background: C.accentBg,
                        color: C.primary,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      Free
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "700",
                    color: u.free ? C.dark : C.primary,
                    fontFamily: "DM Sans,sans-serif",
                    lineHeight: 1.4,
                  }}
                >
                  {u.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "auto" }}>
                  <span style={{ fontSize: "11px", color: C.muted, fontFamily: "Inter,sans-serif" }}>{u.date}</span>
                  <span style={{ color: C.line }}>·</span>
                  <span style={{ fontSize: "11px", color: C.muted, fontFamily: "Inter,sans-serif" }}>
                    {u.read} read
                  </span>
                  <div style={{ marginLeft: "auto" }}>
                    {u.free ? (
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          background: C.accentBg,
                          border: "none",
                          fontSize: "11px",
                          fontWeight: "700",
                          color: C.primary,
                          cursor: "pointer",
                          padding: "4px 10px",
                          borderRadius: "5px",
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        Read <ArrowUpRight size={10} />
                      </button>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          background: isLoggedIn ? `${C.teal}12` : "rgba(0,0,0,0.04)",
                          padding: "4px 9px",
                          borderRadius: "5px",
                        }}
                      >
                        {isLoggedIn ? (
                          <Eye size={10} color={C.teal} />
                        ) : (
                          <Lock size={10} color={C.muted} />
                        )}
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: "600",
                            color: isLoggedIn ? C.teal : C.muted,
                            fontFamily: "Inter,sans-serif",
                          }}
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
          <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "10px" }}>
            {updates.map((_, i) => (
              <div
                key={i}
                style={{ width: "6px", height: "6px", borderRadius: "50%", background: i === 0 ? C.primary : C.line }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const navigate = useNavigate();
  const { user, tier } = useAuth();
  const [tab, setTab] = useState("intelligence");
  const [mobile, setMobile] = useState(false);
  const [filter, setFilter] = useState("All");
  const [showAuth, setShowAuth] = useState(false);

  const handleCardClick = (update: typeof updates[number]) => {
    if (update.free) {
      navigate(update.path);
    } else if (user) {
      navigate(update.path);
    } else {
      navigate(`/login?redirect=${encodeURIComponent(update.path)}`);
    }
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
    { id: "library", label: "Document Library", mobileLabel: "Library", icon: Folder, count: "6 resources" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "DM Sans,sans-serif" }}>
      <SiteHeader />

      {/* ── HERO ── */}
      <section style={{ background: C.primary, padding: mobile ? "52px 20px 40px" : `72px ${PAD} 52px` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              alignItems: mobile ? "flex-start" : "flex-end",
              justifyContent: "space-between",
              gap: "40px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    border: `1px solid rgba(184,217,53,0.5)`,
                    borderRadius: "50px",
                    padding: "4px 12px 4px 8px",
                  }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.accent }} />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: C.accent,
                      fontFamily: "Inter,sans-serif",
                      letterSpacing: "1.2px",
                      textTransform: "uppercase",
                    }}
                  >
                    Ghana Intelligence Hub
                  </span>
                </div>
              </div>
              <h1
                style={{
                  margin: "0 0 12px",
                  fontSize: mobile ? "32px" : "52px",
                  fontWeight: "300",
                  color: C.white,
                  lineHeight: 1.05,
                  letterSpacing: "-1.5px",
                  fontFamily: "DM Sans,sans-serif",
                }}
              >
                Resources & <span style={{ fontWeight: "700" }}>Research Library</span>
              </h1>
              <p
                style={{
                  margin: "0 0 28px",
                  fontSize: mobile ? "14px" : "16px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.65,
                  maxWidth: "460px",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Sector intelligence, official GIPC investment profiles, and the complete BRIDGE research archive — in
                one place.
              </p>
              <a
                href="/intelligence/dashboard"
                onClick={(e) => { e.preventDefault(); navigate("/intelligence/dashboard"); }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: C.accent,
                  color: C.primary,
                  textDecoration: "none",
                  padding: "12px 24px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: "Inter,sans-serif",
                  cursor: "pointer",
                  width: mobile ? "100%" : "auto",
                  justifyContent: mobile ? "center" : "flex-start",
                  boxSizing: "border-box",
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
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <div
            style={{
              background: C.white,
              borderRadius: "12px",
              border: `1px solid ${C.line}`,
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            {/* Tab bar — segmented control style */}
            <div
              style={{
                background: C.bg,
                borderBottom: `1px solid ${C.line}`,
                padding: mobile ? "12px 16px" : "14px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: mobile ? "center" : "initial",
                position: "relative",
              }}
            >
              {/* Segmented pill container — centered */}
              <div
                style={{
                  position: mobile ? "static" : "static",
                  left: "50%",
                  transform: "none",
                  display: "flex",
                  overflowX: mobile ? "auto" : "visible",
                  scrollbarWidth: "none",
                  gap: "0",
                  background: C.white,
                  border: `1px solid ${C.line}`,
                  borderRadius: "10px",
                  padding: "4px",
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
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: mobile ? "8px 14px" : "8px 18px",
                        background: isActive ? C.primary : "transparent",
                        border: "none",
                        borderRadius: "7px",
                        cursor: "pointer",
                        fontSize: mobile ? "12px" : "13px",
                        fontWeight: isActive ? "700" : "500",
                        color: isActive ? C.white : C.muted,
                        fontFamily: "Inter,sans-serif",
                        transition: "all 0.18s",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Icon size={13} style={{ opacity: isActive ? 1 : 0.6 }} />
                      {mobile ? t.mobileLabel : t.label}
                      {!mobile && (
                        <span
                          style={{
                            padding: "2px 7px",
                            borderRadius: "20px",
                            fontSize: "10px",
                            fontWeight: "700",
                            fontFamily: "Inter,sans-serif",
                            background: isActive ? "rgba(255,255,255,0.18)" : C.bg,
                            color: isActive ? C.white : C.muted,
                            transition: "all 0.18s",
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
                  style={{
                    fontSize: "12px",
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    flexShrink: 0,
                    marginLeft: "auto",
                  }}
                >
                  {shownCount} of 12
                </span>
              )}
            </div>

            {/* Tab content */}
            <div style={{ padding: mobile ? "20px 16px" : "40px 32px", minHeight: "500px" }}>
              {tab === "intelligence" && <BridgeTab mobile={mobile} filter={filter} setFilter={setFilter} isLoggedIn={!!user} onUnlock={() => {
                if (!user) {
                  navigate("/login?redirect=/resources");
                } else {
                  setShowAuth(true);
                }
              }} onNavigate={(slug: string) => {
                const sector = sectors.find((s) => s.slug === slug);
                const briefPath = `/resources/sector-brief/${slug}`;
                if (sector?.free || user) {
                  navigate(briefPath);
                } else {
                  navigate(`/login?redirect=${encodeURIComponent(briefPath)}`);
                }
              }} />}
              {tab === "gipc" && <GIPCTab mobile={mobile} />}
              {tab === "library" && <LibraryTab mobile={mobile} />}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ padding: mobile ? "48px 20px" : `56px ${PAD}`, background: C.primary }}>
        <div
          style={{
            maxWidth: MAX,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr auto",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: C.white,
                fontFamily: "DM Sans,sans-serif",
                marginBottom: "6px",
              }}
            >
              Intelligence is the first investment.
            </div>
            <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", fontFamily: "Inter,sans-serif" }}>
              Get full access to the complete BRIDGE research suite — 12 sector analyses, 174+ ventures, and ongoing
              policy intelligence.
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: mobile ? "column" : "row", gap: "10px", flexShrink: 0, width: mobile ? "100%" : "auto" }}
          >
            <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }} style={{ textDecoration: "none", width: mobile ? "100%" : "auto" }}>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: C.accent,
                  color: C.primary,
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: "Inter,sans-serif",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Lock size={13} />
                Get Full Access
                <ArrowUpRight size={14} />
              </button>
            </a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} style={{ textDecoration: "none", width: mobile ? "100%" : "auto" }}>
              <button
                style={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  padding: "12px 22px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Inter,sans-serif",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Partner with BRIDGE
              </button>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
      <BRIDGEAuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        defaultTab="signin"
        onSignInSuccess={() => {
          setShowAuth(false);
        }}
      />
    </div>
  );
}
