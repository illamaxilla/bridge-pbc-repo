import React, { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeaderMinimal";
import SiteFooter from "@/components/SiteFooter";
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
  },
  {
    id: 2,
    type: "Sector Brief",
    title: "Agriculture Crisis & Strategic Positioning",
    date: "Feb 2026",
    read: "12 min",
    free: false,
  },
  {
    id: 3,
    type: "Annual Review",
    title: "BRIDGE 2025 Sector Intelligence Review",
    date: "Jan 2026",
    read: "20 min",
    free: false,
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

function SectorRow({ s, expanded, onToggle, mobile }) {
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
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: s.free ? C.accent : C.primary,
                color: s.free ? C.primary : C.white,
                border: "none",
                padding: "10px 18px",
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
              }}
            >
              {s.free ? <Eye size={12} /> : <Lock size={12} />}
              {s.free ? "Read Analysis" : "Unlock Analysis"}
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
              background: s.free ? C.accent : C.primary,
              color: s.free ? C.primary : C.white,
              border: "none",
              padding: "10px 18px",
              borderRadius: "50px",
              fontSize: "12px",
              fontWeight: "700",
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
            }}
          >
            {s.free ? <Eye size={12} /> : <Lock size={12} />}
            {s.free ? "Read Analysis" : "Unlock Analysis"}
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

function BridgeTab({ mobile, filter, setFilter }) {
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
          />
        ))}
      </div>

      {/* CTA */}
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
            Unlock venture portfolios, risk frameworks, capital breakdowns, and implementation playbooks for all 12
            sectors.
          </div>
        </div>
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
            width: mobile ? "100%" : "auto",
          }}
        >
          Unlock All <ArrowUpRight size={14} />
        </button>
      </div>
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
function WhatsNew({ mobile }) {
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
                          background: "rgba(0,0,0,0.04)",
                          padding: "4px 9px",
                          borderRadius: "5px",
                        }}
                      >
                        <Lock size={10} color={C.muted} />
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: "600",
                            color: C.muted,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          Members
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

// ============================================================================

// ─── Shared: BridgeLogo + SiteHeader ──────────────────────

const BridgeLogo = ({ height = 40 }) => (
  <div style={{ display: "flex", alignItems: "center", height: `${height}px` }}>
    <svg
      id="Layer_2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3434.33 932.3"
      height={height}
      style={{ display: "block" }}
    >
      <path fill={C.accent} d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path
        fill={C.primary}
        d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
      />
      <path
        fill={C.primary}
        stroke={C.primary}
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z"
      />
      <path
        fill={C.primary}
        stroke={C.primary}
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill={C.accent} x="1427.38" y="17.35" width="205.2" height="145" />
      <rect fill={C.primary} x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill={C.primary}
        d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
      />
      <rect fill={C.primary} x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
      <rect fill={C.accent} x="3083.41" y="339.47" width="175.12" height="257.67" />
      <rect fill={C.accent} x="3083.41" y="654.42" width="175.12" height="257.67" />
      <circle fill="none" stroke="#231f20" strokeWidth="5" strokeMiterlimit="10" cx="3385.56" cy="866.94" r="46.27" />
      <path
        fill="#191919"
        d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13h0ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13h0Z"
      />
      <rect
        fill="none"
        stroke={C.primary}
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
        fill={C.accent}
        stroke={C.primary}
        strokeMiterlimit="10"
        points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"
      />
      <path
        fill={C.primary}
        d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"
      />
      <path
        fill={C.accent}
        d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"
      />
    </svg>
  </div>
);

function useIsMobile(bp = 900) {
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

const BridgeLogoWhite = () => (
  <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
    <svg viewBox="0 0 4113.9 932.3" height="36" style={{ display: "block" }}>
      <path
        fill="#FFFFFF"
        d="M3355.1,655.6h31.2v5.7h-31.2v-5.7ZM3355.1,667h31.2v11.1h-31.2v-11.1ZM3355.1,683.9h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.9h31.2v11.1h-31.2v-11.1ZM3355.1,801.8h31.2v11.1h-31.2v-11.1ZM3355.1,818.6h31.2v11.1h-31.2v-11.1ZM3355.1,835.5h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.6h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,667h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.8h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.6h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.6,683.9h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.9h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.2h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
      />
      <path
        fill="#FFFFFF"
        d="M3572.3,655.6h31.2v5.7h-31.2v-5.7ZM3572.3,667h31.2v11.1h-31.2v-11.1ZM3572.3,683.9h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.9h31.2v11.1h-31.2v-11.1ZM3572.3,801.8h31.2v11.1h-31.2v-11.1ZM3572.3,818.6h31.2v11.1h-31.2v-11.1ZM3572.3,835.5h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.6h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,667h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,689h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4l.1.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.9h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1,0ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.9h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.8h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.5h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.6h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z"
      />
      <path
        fill="#FFFFFF"
        d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.9h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.8h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.6h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.5h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.9h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.3,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.2c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,667h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.2c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.7,683.9h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z"
      />
      <path
        fill="#FFFFFF"
        d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
      />
      <path
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
      />
      <path
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill="#B8D935" x="1427.4" y="17.4" width="205.2" height="145" />
      <rect fill="#FFFFFF" x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill="#FFFFFF"
        d="M2757.4,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
      />
      <rect fill="#FFFFFF" x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
      <rect fill="#B8D935" x="3083.5" y="339.5" width="175.1" height="257.7" />
      <rect fill="#B8D935" x="3083.5" y="654.5" width="175.1" height="257.7" />
      <circle fill="none" stroke="#FFFFFF" strokeWidth="5" strokeMiterlimit="10" cx="4078.6" cy="661.3" r="32.8" />
      <path
        fill="#FFFFFF"
        d="M4092.2,677.1l-7.3-10.4c.2,0,.3,0,.4-.2,2-.9,3.6-2.1,4.6-3.8s1.6-3.6,1.6-6.1c0-3.6-1.2-6.3-3.6-8.4s-5.7-3-10-3h-13v31.8h5.9v-9.3h8.5l6.5,9.3h6.4v.1ZM4083.7,651.9c1.3,1.1,2,2.7,2,4.7s-.6,3.6-2,4.7-3.3,1.7-5.9,1.7h-6.9v-12.6h6.9c2.6,0,4.5.5,5.9,1.6h0v-.1Z"
      />
      <rect
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="80"
        strokeMiterlimit="10"
        x="40"
        y="40"
        width="843.9"
        height="852.3"
        rx="36.6"
        ry="36.6"
      />
      <polygon
        fill="#B8D935"
        stroke="#FFFFFF"
        strokeMiterlimit="10"
        points="722.6 322.2 462.3 452.9 202 322.8 461.3 192.6 722.6 322.2"
      />
      <path
        fill="#74914a"
        d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1l.1-.1Z"
      />
      <path
        fill="#B8D935"
        d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"
      />
    </svg>
  </div>
);

const footerLinkHref = (link: string): string => {
  const map: Record<string, string> = {
    "About BRIDGE": "/about", "Our Approach": "/methodology", "Sectors": "/sectors", "Contact Us": "/contact",
    "Research & Guidance": "/services", "Venture Development": "/services", "Direct Investment": "/services", "Strategic Partnerships": "/services",
    "White Paper": "/resources", "Case Studies": "/resources", "Research Library": "/resources", "Data & Reports": "/resources",
    "Insights & Analysis": "/insights", "Sector Briefs": "/sectors", "Policy Updates": "/policy", "Annual Review": "/resources",
  };
  return map[link] || "#";
};

const Footer = () => {
  const isMobile = useIsMobile();
  return (
    <footer style={{ backgroundColor: "#1B4D3E", padding: "0" }}>
      <div style={{ padding: "0 80px" }}>
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
                  href={{ Company: "/about", Services: "/services", Resources: "/resources", Insights: "/insights" }[label] || "#"}
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
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
                color: "#FFFFFF",
                fontSize: "12px",
                fontFamily: "'DM Sans',sans-serif",
                outline: "none",
              }}
            />
            <button
              style={{
                backgroundColor: "#B8D935",
                color: "#1B4D3E",
                border: "none",
                padding: "11px 18px",
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "'DM Sans',sans-serif",
                cursor: "pointer",
                borderRadius: "8px",
              }}
            >
              {"\u2192"}
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',sans-serif" }}>
                Accra, Ghana
              </span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)" }}>{"\u00B7"}</span>
              <span
                style={{ fontSize: "12px", color: "#B8D935", fontWeight: "600", fontFamily: "'DM Sans',sans-serif" }}
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
                    fontFamily: "'DM Sans',sans-serif",
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
                    fontFamily: "'DM Sans',sans-serif",
                    margin: "0 0 4px",
                    lineHeight: "1.7",
                  }}
                >
                  Accra, Ghana
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#B8D935",
                    fontFamily: "'DM Sans',sans-serif",
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
                        color: "#B8D935",
                        fontFamily: "'DM Sans',sans-serif",
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
                         href={footerLinkHref(link)}
                         style={{
                           display: "block",
                           fontSize: "14px",
                           color: "rgba(255,255,255,0.6)",
                           fontFamily: "'DM Sans',sans-serif",
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
                  fontFamily: "'DM Sans',sans-serif",
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
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontFamily: "'DM Sans',sans-serif",
                    outline: "none",
                    height: "44px",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  style={{
                    backgroundColor: "#B8D935",
                    color: "#1B4D3E",
                    border: "none",
                    padding: "12px 20px",
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "'DM Sans',sans-serif",
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
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans',sans-serif" }}>
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
                fontFamily: "'DM Sans',sans-serif",
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
};

export default function ResourcesPage() {
  const [tab, setTab] = useState("intelligence");
  const [mobile, setMobile] = useState(false);
  const [filter, setFilter] = useState("All");
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
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: C.accent,
                  color: C.primary,
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: "Inter,sans-serif",
                  cursor: "pointer",
                }}
              >
                Access Dashboard <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S NEW ── */}
      <WhatsNew mobile={mobile} />

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
              {tab === "intelligence" && <BridgeTab mobile={mobile} filter={filter} setFilter={setFilter} />}
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
    </div>
  );
}
