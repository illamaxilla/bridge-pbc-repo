import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Bookmark,
  BarChart3,
  BookOpen,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Bell,
  Search,
  ArrowUpRight,
  Eye,
  Download,
  Archive,
  Database,
  Layers,
  CreditCard,
  Heart,
  Cpu,
  GraduationCap,
  Leaf,
  Home,
  Map,
  Zap,
  Truck,
  Box,
  RefreshCw,
  LayoutGrid,
  Activity,
  User,
  List,
  Filter,
  X,
  Info,
  Settings,
  ChevronLeft,
  Check,
  AlertCircle,
  Hash,
  LogOut,
} from "lucide-react";

const BookmarkIcon = Bookmark;

const C = {
  primary: "#1B4D3E",
  teal: "#2E5A4D",
  accent: "#B8D935",
  accentBg: "#EBF5B0",
  bg: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#111827",
  mid: "#374151",
  muted: "#6B7280",
  line: "#E5E7EB",
  sidebar: "#0F1A12",
  sideHov: "#1A2E1F",
  sideAct: "#1E3327",
  green: "#16A34A",
  red: "#DC2626",
};

/* ─── SVG SECTOR ICONS ─────────────────────────────────────────────────────── */
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

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const SECTORS = [
  {
    id: 1,
    svgIcon: sectorSvgIcons[5],
    short: "Agriculture",
    full: "Agriculture & Value Chains",
    score: 90,
    ventures: 18,
    cap: "$12–22M",
  },
  {
    id: 2,
    svgIcon: sectorSvgIcons[1],
    short: "Financial Inclusion",
    full: "Financial Inclusion & Economic Security",
    score: 91,
    ventures: 18,
    cap: "$10–20M",
  },
  {
    id: 3,
    svgIcon: sectorSvgIcons[3],
    short: "Technology",
    full: "Technology & Innovation",
    score: 89,
    ventures: 15,
    cap: "$8–15M",
  },
  {
    id: 4,
    svgIcon: sectorSvgIcons[9],
    short: "Energy",
    full: "Energy & Renewable Resources",
    score: 88,
    ventures: 14,
    cap: "$12–22M",
  },
  {
    id: 5,
    svgIcon: sectorSvgIcons[0],
    short: "Infrastructure",
    full: "Infrastructure & Basic Services",
    score: 87,
    ventures: 15,
    cap: "$8–15M",
  },
  {
    id: 6,
    svgIcon: sectorSvgIcons[4],
    short: "Education",
    full: "Education & Skills",
    score: 85,
    ventures: 15,
    cap: "$16.5–33.5M",
  },
  {
    id: 7,
    svgIcon: sectorSvgIcons[2],
    short: "Health Systems",
    full: "Health Systems & Wellbeing",
    score: 83,
    ventures: 15,
    cap: "$8–16M",
  },
  {
    id: 8,
    svgIcon: sectorSvgIcons[7],
    short: "Housing",
    full: "Housing & Real Estate",
    score: 82,
    ventures: 11,
    cap: "$15–25M",
  },
  {
    id: 9,
    svgIcon: sectorSvgIcons[10],
    short: "Manufacturing",
    full: "Manufacturing & Light Industry",
    score: 81,
    ventures: 14,
    cap: "$15–30M",
  },
  {
    id: 10,
    svgIcon: sectorSvgIcons[11],
    short: "Transportation",
    full: "Transportation & Logistics",
    score: 79,
    ventures: 14,
    cap: "$10–22M",
  },
  {
    id: 11,
    svgIcon: sectorSvgIcons[8],
    short: "Tourism",
    full: "Tourism & Hospitality",
    score: 76,
    ventures: 13,
    cap: "$10–18M",
  },
  {
    id: 12,
    svgIcon: sectorSvgIcons[6],
    short: "Creative Industries",
    full: "Sports, Entertainment & Creative",
    score: 78,
    ventures: 14,
    cap: "$10–20.5M",
  },
];

const RESOURCES = [
  {
    id: "RES-001",
    name: "BRIDGE PBC Foundational White Paper",
    slug: "#WP4401GH",
    type: "report",
    sector: "All Sectors",
    status: "available",
    access: "free",
    downloads: 2840,
    monthlyDownloads: 312,
    fileFormat: "PDF",
    fileSize: "4.2 MB",
    pages: 48,
    description:
      "Complete intellectual foundation — BRIDGE's methodology, sector framework, and theory of change for Ghana's development ecosystem. Covers all 12 sectors with strategic rationale.",
    tags: ["White Paper", "Ghana", "Framework", "Investment"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "BRIDGE Research",
    createdAt: "2025-01-15",
  },
  {
    id: "RES-002",
    name: "Sector Analysis Collection — All 12 Sectors",
    slug: "#SA1200GH",
    type: "dataset",
    sector: "All Sectors",
    status: "available",
    access: "pro",
    downloads: 1204,
    monthlyDownloads: 187,
    fileFormat: "PDF Bundle",
    fileSize: "38 MB",
    pages: null,
    description:
      "The complete BRIDGE intelligence suite with venture scoring, capital range breakdowns, and implementation playbooks across all 12 sectors.",
    tags: ["Sector Analysis", "Ventures", "Capital", "Intelligence"],
    isWatchlisted: true,
    isNew: false,
    addedBy: "BRIDGE Research",
    createdAt: "2025-03-01",
  },
  {
    id: "RES-003",
    name: "BRIDGE Portfolio Data — 174+ Ventures",
    slug: "#PD1740GH",
    type: "dataset",
    sector: "All Sectors",
    status: "available",
    access: "pro",
    downloads: 876,
    monthlyDownloads: 142,
    fileFormat: "XLSX + PDF",
    fileSize: "12 MB",
    pages: null,
    description:
      "Full venture pipeline data across all sectors including scoring matrices, capital ranges by tier, and priority rankings.",
    tags: ["Portfolio", "Ventures", "Data", "Scoring"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "BRIDGE Analytics",
    createdAt: "2025-04-10",
  },
  {
    id: "RES-004",
    name: "Kejetia Market Digitisation — Flagship Case",
    slug: "#CS4500GH",
    type: "guide",
    sector: "Infrastructure",
    status: "pending",
    access: "pro",
    downloads: 0,
    monthlyDownloads: 0,
    fileFormat: "PDF",
    fileSize: null,
    pages: null,
    description:
      "Deep-dive on West Africa's largest market and BRIDGE's 10,000+ trader digitisation platform and build-out strategy.",
    tags: ["Case Study", "Market", "Digitisation", "Infrastructure"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "BRIDGE Operations",
    createdAt: "2026-01-01",
  },
  {
    id: "RES-005",
    name: "BRIDGE 2025 Annual Intelligence Review",
    slug: "#AR2500GH",
    type: "report",
    sector: "All Sectors",
    status: "new",
    access: "pro",
    downloads: 634,
    monthlyDownloads: 634,
    fileFormat: "PDF",
    fileSize: "6.8 MB",
    pages: 32,
    description:
      "Full-year retrospective across all 12 sectors with updated venture scoring, market shifts, and priorities heading into 2026.",
    tags: ["Annual Review", "2025", "Sectors", "Trends"],
    isWatchlisted: true,
    isNew: true,
    addedBy: "BRIDGE Research",
    createdAt: "2026-01-20",
  },
  {
    id: "RES-006",
    name: "Ghana Policy Tracker — 2025–2026",
    slug: "#PT2526GH",
    type: "report",
    sector: "Policy",
    status: "available",
    access: "pro",
    downloads: 1891,
    monthlyDownloads: 411,
    fileFormat: "PDF (Living Doc)",
    fileSize: "3.1 MB",
    pages: null,
    description:
      "Living document covering the 2026 Budget, Sankofa Initiative, DEP, Digital Credit Directive, and sector-specific regulations.",
    tags: ["Policy", "Budget", "Regulation", "2026"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "BRIDGE Policy Team",
    createdAt: "2025-11-01",
  },
  {
    id: "RES-007",
    name: "Agriculture Crisis — Strategic Positioning Brief",
    slug: "#AB0226GH",
    type: "guide",
    sector: "Agriculture",
    status: "available",
    access: "pro",
    downloads: 723,
    monthlyDownloads: 201,
    fileFormat: "PDF",
    fileSize: "2.4 MB",
    pages: 18,
    description:
      "Strategic response to Ghana's 2025–26 agricultural crisis including positioning frameworks and opportunity maps for investors.",
    tags: ["Agriculture", "Crisis", "Strategy", "2026"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "BRIDGE Research",
    createdAt: "2026-02-01",
  },
  {
    id: "RES-008",
    name: "Financial Inclusion Market Map — Ghana",
    slug: "#FM0125GH",
    type: "dataset",
    sector: "Financial Inclusion",
    status: "available",
    access: "pro",
    downloads: 548,
    monthlyDownloads: 98,
    fileFormat: "PDF + XLSX",
    fileSize: "5.6 MB",
    pages: 22,
    description:
      "Comprehensive mapping of Ghana's financial services landscape including mobile money operators, fintech startups, MFIs, and rural banking coverage.",
    tags: ["Fintech", "Mobile Money", "Market Map", "Ghana"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "BRIDGE Analytics",
    createdAt: "2025-06-15",
  },
  {
    id: "RES-009",
    name: "Ghana Energy Investment Guide 2025",
    slug: "#EG0125GH",
    type: "guide",
    sector: "Energy",
    status: "available",
    access: "free",
    downloads: 1340,
    monthlyDownloads: 289,
    fileFormat: "PDF",
    fileSize: "3.9 MB",
    pages: 28,
    description:
      "Investor-facing guide to Ghana's energy sector — solar pipeline, off-grid opportunity, regulatory environment, and key development partners.",
    tags: ["Energy", "Solar", "Investment", "Guide"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "BRIDGE Research",
    createdAt: "2025-07-10",
  },
  {
    id: "RES-010",
    name: "BRIDGE Impact Score Methodology",
    slug: "#IM0124GH",
    type: "template",
    sector: "All Sectors",
    status: "available",
    access: "free",
    downloads: 2210,
    monthlyDownloads: 178,
    fileFormat: "PDF",
    fileSize: "1.8 MB",
    pages: 12,
    description:
      "Full documentation of the BRIDGE Impact Score methodology — Peace & Prosperity Alignment, Strategic Fit, Feasibility, and Scalability dimensions.",
    tags: ["Methodology", "Scoring", "Impact", "Framework"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "BRIDGE Research",
    createdAt: "2024-09-01",
  },
  {
    id: "RES-011",
    name: "GIPC Sector Profiles Bundle — 2025",
    slug: "#GP1325GH",
    type: "report",
    sector: "All Sectors",
    status: "available",
    access: "free",
    downloads: 3120,
    monthlyDownloads: 445,
    fileFormat: "PDF Bundle",
    fileSize: "22 MB",
    pages: null,
    description:
      "Complete set of 13 GIPC sector profiles covering education, energy, health, ICT, manufacturing, agriculture, transport, and more.",
    tags: ["GIPC", "Government", "Sector Profiles", "2025"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "GIPC / BRIDGE",
    createdAt: "2025-02-01",
  },
  {
    id: "RES-012",
    name: "Ejura Agricultural Hub — Business Plan",
    slug: "#EJ0326GH",
    type: "guide",
    sector: "Agriculture",
    status: "new",
    access: "pro",
    downloads: 187,
    monthlyDownloads: 187,
    fileFormat: "PDF",
    fileSize: "4.4 MB",
    pages: 36,
    description:
      "Complete business plan for the Ejura Agricultural Hub including processing infrastructure, farmer aggregation model, and 5-year financial projections.",
    tags: ["Agriculture", "Ejura", "Business Plan", "Hub"],
    isWatchlisted: false,
    isNew: true,
    addedBy: "BRIDGE Operations",
    createdAt: "2026-03-01",
  },
];

const ACTIVITY_DATA = [
  { day: "Mon", count: 38, color: "#2E5A4D" },
  { day: "Tue", count: 62, color: "#B8D935" },
  { day: "Wed", count: 47, color: "#1B4D3E" },
  { day: "Thu", count: 81, color: "#B8D935" },
  { day: "Fri", count: 93, color: "#2E5A4D" },
  { day: "Sat", count: 44, color: "#1B4D3E" },
  { day: "Sun", count: 29, color: "#2E5A4D" },
];

const TYPE_META = {
  report: { label: "Report", Icon: BarChart3, color: C.primary },
  dataset: { label: "Dataset", Icon: Database, color: C.teal },
  guide: { label: "Guide", Icon: BookOpen, color: C.primary },
  template: { label: "Template", Icon: FileText, color: C.teal },
  tool: { label: "Tool", Icon: Settings, color: C.primary },
  api: { label: "API", Icon: Hash, color: C.teal },
  news: { label: "News", Icon: Activity, color: C.primary },
};

const STATUS_STYLE = {
  available: { color: "#16A34A", bg: "#DCFCE7", label: "Available" },
  new: { color: "#2563EB", bg: "#DBEAFE", label: "New" },
  pending: { color: "#D97706", bg: "#FEF3C7", label: "Coming Soon" },
  "out-of-date": { color: "#DC2626", bg: "#FEE2E2", label: "Out of Date" },
  inactive: { color: "#9CA3AF", bg: "#F3F4F6", label: "Inactive" },
  draft: { color: "#6B7280", bg: "#F9FAFB", label: "Draft" },
};

/* ─── DARK MOBILE PALETTE ─────────────────────────────────────────────────── */
const DM = {
  bg: "#080F08",
  card: "#0D1A0D",
  surface: "#112011",
  border: "rgba(184,217,53,0.13)",
  borderSub: "rgba(255,255,255,0.05)",
  accent: "#B8D935",
  accentDim: "rgba(184,217,53,0.13)",
  teal: "#2A5E42",
  tealMid: "#3D8B62",
  text: "#FFFFFF",
  textMid: "rgba(255,255,255,0.62)",
  textMuted: "rgba(255,255,255,0.35)",
  textFaint: "rgba(255,255,255,0.12)",
  line: "rgba(255,255,255,0.06)",
  positive: "#4ADE80",
  posDim: "rgba(74,222,128,0.13)",
  warning: "#F59E0B",
  warnDim: "rgba(245,158,11,0.13)",
  navBg: "#050C05",
};

/* ─── SECTOR INTELLIGENCE DATA ─────────────────────────────────────────────── */
const SECTOR_INTEL = {
  2: {
    subsectors: [
      { name: "Digital Lending", pct: 40, growth: 74, risk: 15 },
      { name: "Mobile Money", pct: 25, growth: 53, risk: 33 },
      { name: "Insurance", pct: 18, growth: 43, risk: 51 },
      { name: "Susu Networks", pct: 12, growth: 35, risk: 69 },
      { name: "Other", pct: 5, growth: 25, risk: 87 },
    ],
    companies: [
      { rank: 1, name: "Fidelity Bank Ghana", ticker: "FBG", chg: +6.1, val: "$1.4B", score: 91 },
      { rank: 2, name: "MTN MoMo", ticker: "MTN", chg: +3.5, val: "$3.2B", score: 88 },
      { rank: 3, name: "Zeepay", ticker: "ZPY", chg: +2.2, val: "$280M", score: 83 },
      { rank: 4, name: "Stanbic IBTC", ticker: "SIB", chg: +0.9, val: "$620M", score: 76 },
      { rank: 5, name: "CalBank Ghana", ticker: "CAL", chg: -0.4, val: "$310M", score: 71 },
    ],
    signals: [
      { title: "BoG Digital Credit Directive", sentiment: "Bullish", date: "Mar 2026", cat: "Policy" },
      { title: "MoMo Interoperability Live", sentiment: "Bullish", date: "Jan 2026", cat: "Launch" },
      { title: "SME Financing Gap Widens", sentiment: "Watch", date: "Feb 2026", cat: "Risk" },
      { title: "Ghana #1 GSMA MoMo Index", sentiment: "Bullish", date: "Nov 2025", cat: "Rankings" },
    ],
    kpi: { cap: "$15.0B", irr: "25%", subRev: "$8.4B", score: 91 },
  },
  1: {
    subsectors: [
      { name: "Crop Production", pct: 35, growth: 58, risk: 28 },
      { name: "Agri-Processing", pct: 30, growth: 47, risk: 35 },
      { name: "Inputs & Supply", pct: 20, growth: 39, risk: 44 },
      { name: "Export Value Chain", pct: 10, growth: 62, risk: 52 },
      { name: "Other", pct: 5, growth: 20, risk: 60 },
    ],
    companies: [
      { rank: 1, name: "Cocobod Ghana", ticker: "CCB", chg: +5.2, val: "$2.1B", score: 92 },
      { rank: 2, name: "Tono Rice Mills", ticker: "TRM", chg: +3.8, val: "$480M", score: 87 },
      { rank: 3, name: "GADCO Limited", ticker: "GDC", chg: +1.4, val: "$210M", score: 81 },
    ],
    signals: [
      { title: "2025 Cocoa Season Record Output", sentiment: "Bullish", date: "Mar 2026", cat: "Commodity" },
      { title: "Ejura Hub Investment Round", sentiment: "Bullish", date: "Feb 2026", cat: "Investment" },
      { title: "Fertiliser Price Pressure", sentiment: "Watch", date: "Jan 2026", cat: "Risk" },
    ],
    kpi: { cap: "$12.0B", irr: "22%", subRev: "$5.2B", score: 90 },
  },
};

const getIntel = (sector) => {
  if (!sector) return null;
  return (
    SECTOR_INTEL[sector.id] || {
      subsectors: [
        { name: "Segment A", pct: 40, growth: 58, risk: 22 },
        { name: "Segment B", pct: 30, growth: 44, risk: 36 },
        { name: "Segment C", pct: 20, growth: 33, risk: 52 },
        { name: "Other", pct: 10, growth: 18, risk: 68 },
      ],
      companies: [
        { rank: 1, name: `${sector.short} Leader`, ticker: "GH1", chg: +4.1, val: "$1.2B", score: sector.score },
        {
          rank: 2,
          name: `${sector.short} Group`,
          ticker: "GH2",
          chg: +2.3,
          val: "$680M",
          score: Math.max(sector.score - 5, 60),
        },
        {
          rank: 3,
          name: `${sector.short} Ventures`,
          ticker: "GH3",
          chg: +0.9,
          val: "$290M",
          score: Math.max(sector.score - 9, 55),
        },
      ],
      signals: [
        { title: `${sector.short} Growth Signal Q1`, sentiment: "Bullish", date: "Mar 2026", cat: "Market" },
        { title: "New Regulatory Framework", sentiment: "Bullish", date: "Feb 2026", cat: "Policy" },
        { title: `${sector.short} Supply Watch`, sentiment: "Watch", date: "Jan 2026", cat: "Risk" },
      ],
      kpi: { cap: "$8.0B", irr: "18%", subRev: "$3.4B", score: sector.score },
    }
  );
};

const ENGAGE_DATA = [
  12, 8, 15, 22, 18, 9, 6, 24, 31, 19, 14, 28, 35, 17, 20, 25, 38, 29, 22, 16, 11, 33, 41, 28, 19, 30, 24, 15,
];
const HEATMAP = [
  [2, 1, 0, 0, 1, 2],
  [0, 0, 1, 3, 3, 2],
  [3, 1, 1, 2, 0, 0],
  [1, 0, 1, 0, 0, 1],
  [1, 0, 2, 2, 1, 3],
  [1, 1, 2, 0, 1, 0],
  [0, 0, 1, 0, 2, 2],
];
const HMAP_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const HMAP_HOURS = ["00", "04", "08", "12", "16", "20"];
const HMAP_COLORS = [
  "rgba(42,94,66,0.18)",
  "rgba(42,94,66,0.38)",
  "rgba(42,94,66,0.58)",
  "rgba(42,94,66,0.82)",
  "rgba(184,217,53,0.75)",
];
const SUB_COLORS = ["#2A5E42", "#3D8B62", "#4DAF82", "#1E5242", "#163A2A"];

/* ─── MOBILE DETECTION ────────────────────────────────────────────────────── */
function useIsMobile() {
  const [m, setM] = useState(typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

/* ─── MODULE CARD ─────────────────────────────────────────────────────────── */
function ModuleCard({ icon, title, badge, badgeStyle, defaultOpen = false, noPad = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        background: DM.card,
        border: `1px solid ${DM.border}`,
        borderRadius: 14,
        overflow: "hidden",
        margin: "0 10px 10px",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 14px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: DM.accentDim,
            border: `1px solid ${DM.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            flex: 1,
            textAlign: "left",
            fontSize: 15,
            fontWeight: 700,
            color: DM.text,
            fontFamily: "DM Sans,sans-serif",
          }}
        >
          {title}
        </span>
        {badge && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "Inter,sans-serif",
              padding: "4px 10px",
              borderRadius: 20,
              ...badgeStyle,
            }}
          >
            {badge}
          </span>
        )}
        {open ? <ChevronUp size={14} color={DM.textMuted} /> : <ChevronDown size={14} color={DM.textMuted} />}
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${DM.borderSub}`, padding: noPad ? 0 : "4px 14px 14px" }}>{children}</div>
      )}
    </div>
  );
}

/* ─── SECTOR HERO CARD ────────────────────────────────────────────────────── */
function SectorHeroCard({ sector }) {
  if (!sector) return null;
  const intel = getIntel(sector);
  return (
    <div
      style={{
        margin: "10px 10px 0",
        background: DM.card,
        border: `1px solid ${DM.border}`,
        borderRadius: 14,
        padding: "14px",
      }}
    >
      <div
        style={{
          fontSize: 8,
          fontWeight: 700,
          color: DM.accent,
          fontFamily: "Inter,sans-serif",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        ANALYTICS · {sector.short.toUpperCase()}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: `2.5px solid ${DM.tealMid}`,
            background: DM.surface,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 800, color: DM.text, fontFamily: "DM Sans,sans-serif" }}>
            {sector.score}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: DM.text,
              fontFamily: "DM Sans,sans-serif",
              lineHeight: 1.2,
              marginBottom: 7,
            }}
          >
            {sector.full}
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {[
              { l: "Cap", v: intel.kpi.cap, hi: false },
              { l: "IRR", v: intel.kpi.irr, hi: false },
              { l: "Score", v: sector.score, hi: true },
              { l: "Ventures", v: sector.ventures, hi: false },
            ].map((p, i) => (
              <span
                key={i}
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: p.hi ? DM.accent : DM.textMid,
                  fontFamily: "Inter,sans-serif",
                  background: p.hi ? DM.accentDim : DM.surface,
                  border: `1px solid ${p.hi ? DM.border : DM.borderSub}`,
                  borderRadius: 5,
                  padding: "3px 7px",
                }}
              >
                {p.l} {p.v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── LIBRARY MODULE ──────────────────────────────────────────────────────── */
function LibraryModule({ resources, activeCategory, setCategory, onOpen, onWatch }) {
  const CATS = [
    { key: "all", label: "All" },
    { key: "report", label: "Reports" },
    { key: "dataset", label: "Datasets" },
    { key: "guide", label: "Guides" },
    { key: "template", label: "Templates" },
  ];
  return (
    <ModuleCard
      icon={<BookOpen size={14} color={DM.accent} />}
      title="Resource Library"
      badge={`${resources.length}`}
      badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
      defaultOpen={true}
      noPad={true}
    >
      <div style={{ overflowX: "auto", scrollbarWidth: "none", borderBottom: `1px solid ${DM.borderSub}` }}>
        <div style={{ display: "flex", padding: "0 14px", width: "max-content" }}>
          {CATS.map((cat) => {
            const cnt = cat.key === "all" ? resources.length : resources.filter((r) => r.type === cat.key).length;
            const act = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "9px 10px",
                  background: "none",
                  border: "none",
                  borderBottom: act ? `2px solid ${DM.accent}` : "2px solid transparent",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: act ? 700 : 400,
                    color: act ? DM.accent : DM.textMuted,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {cat.label}
                </span>
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    color: act ? DM.accent : DM.textFaint,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {cnt}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {resources.length === 0 ? (
        <div style={{ padding: "28px 14px", textAlign: "center" }}>
          <AlertCircle size={22} color={DM.textMuted} />
          <div style={{ fontSize: 12, color: DM.textMuted, fontFamily: "Inter,sans-serif", marginTop: 8 }}>
            No results
          </div>
        </div>
      ) : (
        resources.map((r, i) => {
          const tm = TYPE_META[r.type] || TYPE_META.report;
          const ss = STATUS_STYLE[r.status] || STATUS_STYLE.available;
          return (
            <div
              key={r.id}
              onClick={() => onOpen(r)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 14px",
                borderBottom: i < resources.length - 1 ? `1px solid ${DM.borderSub}` : "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: DM.surface,
                  border: `1px solid ${DM.borderSub}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <tm.Icon size={15} color={DM.tealMid} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: DM.text,
                    fontFamily: "DM Sans,sans-serif",
                    lineHeight: 1.25,
                    marginBottom: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: DM.tealMid, fontFamily: "Inter,sans-serif" }}>
                    {tm.label}
                  </span>
                  <span style={{ fontSize: 8, color: DM.textFaint }}>·</span>
                  <span style={{ fontSize: 8, fontWeight: 600, color: ss.color, fontFamily: "Inter,sans-serif" }}>
                    {ss.label}
                  </span>
                  {r.access === "free" && (
                    <>
                      <span style={{ fontSize: 8, color: DM.textFaint }}>·</span>
                      <span
                        style={{ fontSize: 8, fontWeight: 700, color: DM.positive, fontFamily: "Inter,sans-serif" }}
                      >
                        FREE
                      </span>
                    </>
                  )}
                  {r.isNew && (
                    <>
                      <span style={{ fontSize: 8, color: DM.textFaint }}>·</span>
                      <span style={{ fontSize: 8, fontWeight: 700, color: "#60A5FA", fontFamily: "Inter,sans-serif" }}>
                        NEW
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onWatch(r.id);
                  }}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    border: `1px solid ${r.isWatchlisted ? DM.accent : DM.borderSub}`,
                    background: r.isWatchlisted ? DM.accentDim : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Bookmark
                    size={11}
                    color={r.isWatchlisted ? DM.accent : DM.textMuted}
                    fill={r.isWatchlisted ? DM.accent : "none"}
                  />
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Download size={8} color={DM.textMuted} />
                  <span style={{ fontSize: 8, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>
                    {r.downloads > 999 ? `${(r.downloads / 1000).toFixed(1)}k` : r.downloads}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </ModuleCard>
  );
}

/* ─── SUB-SECTOR MODULE ───────────────────────────────────────────────────── */
function SubsectorModule({ activeSector }) {
  const intel = getIntel(activeSector);
  if (!intel) return null;
  const { subsectors } = intel;
  return (
    <ModuleCard
      icon={<LayoutGrid size={14} color={DM.accent} />}
      title="Sub-sector Breakdown"
      badge={`${subsectors.length} segments`}
      badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
      defaultOpen={true}
    >
      <div style={{ display: "flex", height: 10, borderRadius: 6, overflow: "hidden", marginBottom: 14 }}>
        {subsectors.map((s, i) => (
          <div
            key={i}
            style={{
              width: `${s.pct}%`,
              background: SUB_COLORS[i] || DM.teal,
              borderRight: i < subsectors.length - 1 ? "1px solid rgba(0,0,0,0.35)" : "",
            }}
          />
        ))}
      </div>
      {subsectors.map((s, i) => (
        <div key={i} style={{ marginBottom: i < subsectors.length - 1 ? 10 : 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: DM.text, fontFamily: "DM Sans,sans-serif" }}>
              {s.name}
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: DM.accent, fontFamily: "Inter,sans-serif" }}>
              {s.pct}%
            </span>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${s.pct}%`,
                background: SUB_COLORS[i] || DM.teal,
                borderRadius: 2,
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      ))}
    </ModuleCard>
  );
}

/* ─── ANALYTICS MODULE ────────────────────────────────────────────────────── */
function AnalyticsModule() {
  const maxE = Math.max(...ENGAGE_DATA);
  const stats = [
    { val: "1,692", label: "Active Signals", trend: "+56%" },
    { val: "1,423", label: "Conversion", trend: "+43%" },
    { val: "11,992", label: "Avg Duration", trend: "+28%" },
  ];
  return (
    <ModuleCard
      icon={<Activity size={14} color={DM.accent} />}
      title="30-Day Engagement"
      badge="Live"
      badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 12 }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: DM.surface,
              borderRadius: 9,
              border: `1px solid ${DM.borderSub}`,
              padding: "10px 9px",
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: DM.text,
                fontFamily: "DM Sans,sans-serif",
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              {s.val}
            </div>
            <div
              style={{
                fontSize: 8,
                color: DM.textMuted,
                fontFamily: "Inter,sans-serif",
                marginBottom: 5,
                lineHeight: 1.2,
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, color: DM.positive, fontFamily: "Inter,sans-serif" }}>
              {s.trend}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: DM.surface,
          borderRadius: 9,
          border: `1px solid ${DM.borderSub}`,
          padding: "10px 10px 6px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 52, marginBottom: 4 }}>
          {ENGAGE_DATA.map((d, i) => {
            const isMax = d === Math.max(...ENGAGE_DATA);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: isMax ? DM.tealMid : `${DM.tealMid}60`,
                  borderRadius: "2px 2px 0 0",
                  height: `${(d / maxE) * 48}px`,
                  minHeight: 2,
                }}
              />
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["Feb 5", "Feb 15", "Feb 25", "Mar 1"].map((l, i) => (
            <span key={i} style={{ fontSize: 7, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </ModuleCard>
  );
}

/* ─── HEATMAP MODULE ──────────────────────────────────────────────────────── */
function HeatmapModule() {
  return (
    <ModuleCard
      icon={<List size={14} color={DM.accent} />}
      title="Activity Heatmap"
      badge="7 Days"
      badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
    >
      <div style={{ display: "flex", marginBottom: 4, paddingLeft: 20 }}>
        {HMAP_HOURS.map((h) => (
          <div
            key={h}
            style={{ flex: 1, fontSize: 7, color: DM.textMuted, fontFamily: "Inter,sans-serif", textAlign: "center" }}
          >
            {h}
          </div>
        ))}
      </div>
      {HEATMAP.map((row, di) => (
        <div key={di} style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
          <div style={{ width: 18, fontSize: 7, color: DM.textMuted, fontFamily: "Inter,sans-serif", flexShrink: 0 }}>
            {HMAP_DAYS[di]}
          </div>
          {row.map((v, hi) => (
            <div
              key={hi}
              style={{ flex: 1, height: 18, marginRight: hi < 5 ? 2 : 0, borderRadius: 3, background: HMAP_COLORS[v] }}
            />
          ))}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10 }}>
        <span style={{ fontSize: 7, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>Low</span>
        {[0, 1, 2, 3, 4].map((v) => (
          <div key={v} style={{ width: 11, height: 11, borderRadius: 2, background: HMAP_COLORS[v] }} />
        ))}
        <span style={{ fontSize: 7, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>Peak</span>
      </div>
    </ModuleCard>
  );
}

/* ─── MOBILE BOTTOM SHEET ─────────────────────────────────────────────────── */
function MobileBottomSheet({ resource, onClose, onWatchlist }) {
  if (!resource) return null;
  const tm = TYPE_META[resource.type] || TYPE_META.report;
  const ss = STATUS_STYLE[resource.status] || STATUS_STYLE.available;
  const related = RESOURCES.filter(
    (r) => r.id !== resource.id && (r.sector === resource.sector || r.type === resource.type),
  ).slice(0, 3);
  const details = [
    { label: "Format", value: resource.fileFormat || "—" },
    { label: "Size", value: resource.fileSize || "—" },
    { label: "Pages", value: resource.pages ? `${resource.pages} pp` : "—" },
    { label: "Downloads", value: resource.downloads.toLocaleString() },
    { label: "Monthly", value: `+${resource.monthlyDownloads}/mo` },
    { label: "Added by", value: resource.addedBy },
  ];
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          zIndex: 300,
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          background: DM.card,
          borderRadius: "18px 18px 0 0",
          border: `1px solid ${DM.border}`,
          zIndex: 301,
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          animation: "slideUp 0.26s cubic-bezier(0.32,0.72,0,1)",
          boxShadow: "0 -20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px", flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: DM.surface }} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
          <div style={{ padding: "8px 16px 14px", borderBottom: `1px solid ${DM.borderSub}` }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: DM.surface,
                  border: `1px solid ${DM.borderSub}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <tm.Icon size={20} color={DM.tealMid} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    color: DM.textMuted,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {resource.slug}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: DM.text,
                    fontFamily: "DM Sans,sans-serif",
                    lineHeight: 1.25,
                  }}
                >
                  {resource.name}
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  border: `1px solid ${DM.borderSub}`,
                  background: DM.surface,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <X size={12} color={DM.textMuted} />
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: ss.color, fontFamily: "Inter,sans-serif" }}>
                {ss.label}
              </span>
              <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: resource.access === "free" ? DM.positive : DM.accent,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {resource.access === "free" ? "Free Access" : "Pro Access"}
              </span>
              {resource.isNew && (
                <>
                  <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#60A5FA", fontFamily: "Inter,sans-serif" }}>
                    New
                  </span>
                </>
              )}
            </div>
          </div>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${DM.borderSub}` }}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: DM.textMuted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 6,
              }}
            >
              About
            </div>
            <p style={{ fontSize: 12, color: DM.textMid, fontFamily: "Inter,sans-serif", lineHeight: 1.65, margin: 0 }}>
              {resource.description}
            </p>
          </div>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${DM.borderSub}` }}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: DM.textMuted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Details
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {details.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: DM.surface,
                    borderRadius: 8,
                    border: `1px solid ${DM.borderSub}`,
                    padding: "7px 9px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 7,
                      fontWeight: 700,
                      color: DM.textMuted,
                      fontFamily: "Inter,sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: 2,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: DM.text,
                      fontFamily: "Inter,sans-serif",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${DM.borderSub}` }}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: DM.textMuted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Tags
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: DM.textMid,
                    fontFamily: "Inter,sans-serif",
                    background: DM.surface,
                    border: `1px solid ${DM.borderSub}`,
                    borderRadius: 20,
                    padding: "4px 10px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {related.length > 0 && (
            <div style={{ padding: "12px 16px" }}>
              <div
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: DM.textMuted,
                  fontFamily: "Inter,sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 8,
                }}
              >
                Related
              </div>
              {related.map((r) => {
                const rtm = TYPE_META[r.type] || TYPE_META.report;
                return (
                  <div
                    key={r.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 8,
                      padding: "8px 10px",
                      background: DM.surface,
                      borderRadius: 9,
                      border: `1px solid ${DM.borderSub}`,
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 7,
                        background: "rgba(255,255,255,0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <rtm.Icon size={13} color={DM.tealMid} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: DM.text,
                          fontFamily: "DM Sans,sans-serif",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.name}
                      </div>
                      <div style={{ fontSize: 8, color: DM.textMuted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                        {rtm.label} · {r.downloads.toLocaleString()}
                      </div>
                    </div>
                    <ChevronRight size={11} color={DM.textMuted} />
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ height: 16 }} />
        </div>
        <div
          style={{
            padding: "10px 14px 0",
            borderTop: `1px solid ${DM.borderSub}`,
            background: DM.card,
            display: "flex",
            gap: 8,
            paddingBottom: "max(14px,env(safe-area-inset-bottom,14px))",
          }}
        >
          <button
            onClick={() => onWatchlist(resource.id)}
            style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: 11,
              border: `1px solid ${resource.isWatchlisted ? DM.accent : DM.borderSub}`,
              background: resource.isWatchlisted ? DM.accentDim : DM.surface,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Bookmark
              size={16}
              color={resource.isWatchlisted ? DM.accent : DM.textMuted}
              fill={resource.isWatchlisted ? DM.accent : "none"}
            />
          </button>
          <button
            style={{
              flex: 1,
              height: 44,
              borderRadius: 11,
              background: DM.accent,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              cursor: "pointer",
            }}
          >
            <Download size={15} color={C.primary} />
            <span style={{ fontSize: 13, fontWeight: 700, color: C.primary, fontFamily: "DM Sans,sans-serif" }}>
              {resource.access === "free" ? "Download Free" : "Access with Pro"}
            </span>
          </button>
          <button
            style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: 11,
              border: `1px solid ${DM.borderSub}`,
              background: DM.surface,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowUpRight size={16} color={DM.textMid} />
          </button>
        </div>
      </div>
    </>
  );
}

function MSectorDrawer({ activeSector, setActiveSector, open, onClose }) {
  if (!open) return null;
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        className="drawer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#0F1A12",
          borderRadius: "20px 20px 0 0",
          maxHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "env(safe-area-inset-bottom,16px)",
          border: "1px solid rgba(184,217,53,0.15)",
          borderBottom: "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.15)",
            margin: "12px auto 0",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            padding: "12px 20px 8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#6B7280",
              fontFamily: "Inter,sans-serif",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            Select Sector
          </span>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: 7,
              padding: "4px 10px",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            Done
          </button>
        </div>
        <div style={{ overflowY: "auto", flex: 1, scrollbarWidth: "none" }}>
          {sorted.map((sec, i) => {
            const act = activeSector?.id === sec.id;
            return (
              <div
                key={sec.id}
                onClick={() => {
                  setActiveSector(act ? null : sec);
                  onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 20px",
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: act ? "rgba(184,217,53,0.07)" : "transparent",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: act ? "rgba(184,217,53,0.15)" : "rgba(255,255,255,0.06)",
                  }}
                >
                  {sec.svgIcon(act ? "#B8D935" : "rgba(255,255,255,0.35)", 16)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: act ? 700 : 500,
                      color: act ? "#fff" : "rgba(255,255,255,0.7)",
                      fontFamily: "DM Sans,sans-serif",
                    }}
                  >
                    {sec.short}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "Inter,sans-serif",
                      marginTop: 1,
                    }}
                  >
                    {sec.ventures} ventures · {sec.cap}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      fontFamily: "Inter,sans-serif",
                      color: act ? "#B8D935" : "rgba(255,255,255,0.28)",
                    }}
                  >
                    {sec.score}
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "Inter,sans-serif" }}>
                    score
                  </div>
                </div>
                {act && (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#B8D935", flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileHeader({ activeSector, setActiveSector }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <div
        style={{
          height: 52,
          background: "rgba(15,26,18,0.97)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          flexShrink: 0,
        }}
      >
        <div
          onClick={() => setDrawerOpen(true)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 9,
            cursor: "pointer",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 10,
            padding: "7px 12px 7px 10px",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {activeSector ? (
              activeSector.svgIcon("#B8D935", 13)
            ) : (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B8D935"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            )}
          </div>
          <span
            style={{
              flex: 1,
              fontSize: 13,
              fontWeight: 600,
              color: "#FFFFFF",
              fontFamily: "DM Sans,sans-serif",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {activeSector ? activeSector.short : "All Sectors"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>
              {activeSector ? activeSector.score : "—"}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B8D935"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
      <MSectorDrawer
        activeSector={activeSector}
        setActiveSector={setActiveSector}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}

/* ─── TAB: REPORTS ────────────────────────────────────────────────────────── */
function ReportsTab({ activeSector, resources, onOpen, onWatch }) {
  const [filter, setFilter] = useState("all");
  const FILTERS = [
    { k: "all", l: "All" },
    { k: "report", l: "Reports" },
    { k: "dataset", l: "Datasets" },
    { k: "guide", l: "Guides" },
  ];
  const items = resources.filter((r) => filter === "all" || r.type === filter);
  return (
    <div style={{ paddingTop: 10 }}>
      <div style={{ padding: "0 10px 10px", display: "flex", gap: 7, overflowX: "auto", scrollbarWidth: "none" }}>
        {FILTERS.map((f) => {
          const act = filter === f.k;
          return (
            <button
              key={f.k}
              onClick={() => setFilter(f.k)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid ${act ? DM.accent : DM.borderSub}`,
                background: act ? DM.accentDim : "transparent",
                fontSize: 11,
                fontWeight: act ? 700 : 400,
                color: act ? DM.accent : DM.textMuted,
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
              }}
            >
              {f.l}
            </button>
          );
        })}
      </div>
      {items.map((r, i) => {
        const tm = TYPE_META[r.type] || TYPE_META.report;
        const ss = STATUS_STYLE[r.status] || STATUS_STYLE.available;
        return (
          <div
            key={r.id}
            onClick={() => onOpen(r)}
            style={{
              display: "flex",
              gap: 12,
              padding: "12px 14px",
              margin: "0 10px 8px",
              background: DM.card,
              border: `1px solid ${DM.border}`,
              borderRadius: 12,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: DM.surface,
                border: `1px solid ${DM.borderSub}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <tm.Icon size={16} color={DM.tealMid} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: DM.text,
                  fontFamily: "DM Sans,sans-serif",
                  lineHeight: 1.3,
                  marginBottom: 4,
                }}
              >
                {r.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: DM.tealMid,
                    fontFamily: "Inter,sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  {tm.label}
                </span>
                <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: ss.color, fontFamily: "Inter,sans-serif" }}>
                  {ss.label}
                </span>
                <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                <span style={{ fontSize: 9, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>
                  {r.downloads.toLocaleString()} dl
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWatch(r.id);
              }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                border: `1px solid ${r.isWatchlisted ? DM.accent : DM.borderSub}`,
                background: r.isWatchlisted ? DM.accentDim : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                alignSelf: "center",
              }}
            >
              <Bookmark
                size={12}
                color={r.isWatchlisted ? DM.accent : DM.textMuted}
                fill={r.isWatchlisted ? DM.accent : "none"}
              />
            </button>
          </div>
        );
      })}
      {items.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <AlertCircle size={24} color={DM.textMuted} />
          <div style={{ fontSize: 12, color: DM.textMuted, marginTop: 8, fontFamily: "Inter,sans-serif" }}>
            No resources match this filter
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── TAB: GUIDES ─────────────────────────────────────────────────────────── */
const GUIDES_DATA = [
  {
    title: "Ghana Market Entry Playbook",
    cat: "Market Entry",
    sector: "All Sectors",
    pages: 42,
    level: "Foundational",
    updated: "Mar 2026",
  },
  {
    title: "Sector Due Diligence Framework",
    cat: "Due Diligence",
    sector: "All Sectors",
    pages: 28,
    level: "Intermediate",
    updated: "Feb 2026",
  },
  {
    title: "Agribusiness Value Chain Guide",
    cat: "Operations",
    sector: "Agriculture",
    pages: 35,
    level: "Advanced",
    updated: "Jan 2026",
  },
  {
    title: "Fintech Licensing & Compliance",
    cat: "Regulatory",
    sector: "Financial",
    pages: 19,
    level: "Intermediate",
    updated: "Mar 2026",
  },
  {
    title: "Infrastructure Procurement Guide",
    cat: "Procurement",
    sector: "Infrastructure",
    pages: 56,
    level: "Advanced",
    updated: "Feb 2026",
  },
  {
    title: "Impact Measurement Handbook",
    cat: "Reporting",
    sector: "All Sectors",
    pages: 24,
    level: "Foundational",
    updated: "Jan 2026",
  },
  {
    title: "SME Financing & Capital Access",
    cat: "Finance",
    sector: "All Sectors",
    pages: 31,
    level: "Foundational",
    updated: "Mar 2026",
  },
  {
    title: "Energy Project Feasibility Guide",
    cat: "Feasibility",
    sector: "Energy",
    pages: 48,
    level: "Advanced",
    updated: "Feb 2026",
  },
];
const LEVEL_COLOR = { Foundational: DM.positive, Intermediate: "#60A5FA", Advanced: DM.warning };
function GuidesTab() {
  const [filter, setFilter] = useState("all");
  const FILTERS = [
    { k: "all", l: "All" },
    { k: "Foundational", l: "Foundational" },
    { k: "Intermediate", l: "Intermediate" },
    { k: "Advanced", l: "Advanced" },
  ];
  const items = filter === "all" ? GUIDES_DATA : GUIDES_DATA.filter((g) => g.level === filter);
  return (
    <div style={{ paddingTop: 10 }}>
      <div style={{ padding: "0 10px 10px", display: "flex", gap: 7, overflowX: "auto", scrollbarWidth: "none" }}>
        {FILTERS.map((f) => {
          const act = filter === f.k;
          return (
            <button
              key={f.k}
              onClick={() => setFilter(f.k)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid ${act ? DM.accent : DM.borderSub}`,
                background: act ? DM.accentDim : "transparent",
                fontSize: 11,
                fontWeight: act ? 700 : 400,
                color: act ? DM.accent : DM.textMuted,
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
              }}
            >
              {f.l}
            </button>
          );
        })}
      </div>
      <ModuleCard
        icon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={DM.accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        }
        title="Playbooks & Frameworks"
        badge={`${items.length}`}
        badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
        defaultOpen={true}
      >
        {items.map((g, i) => {
          const lc = LEVEL_COLOR[g.level] || DM.textMuted;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "11px 0",
                borderBottom: i < items.length - 1 ? `1px solid ${DM.borderSub}` : "none",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: DM.surface,
                  border: `1px solid ${DM.borderSub}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={DM.tealMid}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: DM.text,
                    fontFamily: "DM Sans,sans-serif",
                    lineHeight: 1.3,
                    marginBottom: 5,
                  }}
                >
                  {g.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: lc,
                      fontFamily: "Inter,sans-serif",
                      background: `${lc}18`,
                      padding: "2px 7px",
                      borderRadius: 4,
                    }}
                  >
                    {g.level}
                  </span>
                  <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                  <span style={{ fontSize: 9, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>{g.cat}</span>
                  <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                  <span style={{ fontSize: 9, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>{g.pages}pp</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 8, color: DM.textFaint, fontFamily: "Inter,sans-serif" }}>{g.updated}</span>
                <span style={{ fontSize: 9, color: DM.tealMid, fontFamily: "Inter,sans-serif", fontWeight: 600 }}>
                  {g.sector}
                </span>
              </div>
            </div>
          );
        })}
      </ModuleCard>
    </div>
  );
}

/* ─── TAB: DATASETS ───────────────────────────────────────────────────────── */
const DATASETS_DATA = [
  {
    title: "Ghana Trade Flow Q1 2026",
    cat: "Trade",
    sector: "All Sectors",
    rows: "12,400",
    fmt: "CSV",
    updated: "Mar 2026",
    access: "free",
  },
  {
    title: "Sector FDI Inflows 2020–2025",
    cat: "Investment",
    sector: "All Sectors",
    rows: "8,200",
    fmt: "XLSX",
    updated: "Feb 2026",
    access: "pro",
  },
  {
    title: "Agri Value Chain Price Index",
    cat: "Prices",
    sector: "Agriculture",
    rows: "34,500",
    fmt: "CSV",
    updated: "Mar 2026",
    access: "free",
  },
  {
    title: "SME Credit Access Survey 2025",
    cat: "Finance",
    sector: "Financial",
    rows: "5,100",
    fmt: "XLSX",
    updated: "Jan 2026",
    access: "pro",
  },
  {
    title: "Energy Production by Region",
    cat: "Production",
    sector: "Energy",
    rows: "9,800",
    fmt: "CSV",
    updated: "Feb 2026",
    access: "free",
  },
  {
    title: "Infrastructure Spend Database",
    cat: "Expenditure",
    sector: "Infrastructure",
    rows: "21,300",
    fmt: "XLSX",
    updated: "Jan 2026",
    access: "pro",
  },
  {
    title: "Labour Market & Skills Gap 2025",
    cat: "Labour",
    sector: "All Sectors",
    rows: "6,700",
    fmt: "CSV",
    updated: "Mar 2026",
    access: "free",
  },
  {
    title: "Tourism Arrivals & Revenue Data",
    cat: "Tourism",
    sector: "Tourism",
    rows: "4,900",
    fmt: "XLSX",
    updated: "Feb 2026",
    access: "pro",
  },
];
function DatasetsTab() {
  const [filter, setFilter] = useState("all");
  const FILTERS = [
    { k: "all", l: "All" },
    { k: "free", l: "Free" },
    { k: "pro", l: "Pro" },
    { k: "CSV", l: "CSV" },
    { k: "XLSX", l: "XLSX" },
  ];
  const items = FILTERS.find((f) => f.k === filter && (f.k === "CSV" || f.k === "XLSX"))
    ? DATASETS_DATA.filter((d) => d.fmt === filter)
    : filter === "all"
      ? DATASETS_DATA
      : DATASETS_DATA.filter((d) => d.access === filter);
  return (
    <div style={{ paddingTop: 10 }}>
      <div style={{ padding: "0 10px 10px", display: "flex", gap: 7, overflowX: "auto", scrollbarWidth: "none" }}>
        {FILTERS.map((f) => {
          const act = filter === f.k;
          return (
            <button
              key={f.k}
              onClick={() => setFilter(f.k)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid ${act ? DM.accent : DM.borderSub}`,
                background: act ? DM.accentDim : "transparent",
                fontSize: 11,
                fontWeight: act ? 700 : 400,
                color: act ? DM.accent : DM.textMuted,
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
              }}
            >
              {f.l}
            </button>
          );
        })}
      </div>
      <ModuleCard
        icon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={DM.accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        }
        title="Sector Datasets"
        badge={`${items.length} files`}
        badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
        defaultOpen={true}
      >
        {items.map((d, i) => {
          const isFree = d.access === "free";
          const isCsv = d.fmt === "CSV";
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "11px 0",
                borderBottom: i < items.length - 1 ? `1px solid ${DM.borderSub}` : "none",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: DM.surface,
                  border: `1px solid ${DM.borderSub}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isCsv ? DM.tealMid : "#60A5FA"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: DM.text,
                    fontFamily: "DM Sans,sans-serif",
                    lineHeight: 1.3,
                    marginBottom: 5,
                  }}
                >
                  {d.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: isCsv ? DM.tealMid : "#60A5FA",
                      fontFamily: "Inter,sans-serif",
                      background: isCsv ? "rgba(42,94,66,0.3)" : "rgba(96,165,250,0.15)",
                      padding: "2px 7px",
                      borderRadius: 4,
                    }}
                  >
                    {d.fmt}
                  </span>
                  <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                  <span style={{ fontSize: 9, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>
                    {d.rows} rows
                  </span>
                  <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: isFree ? DM.positive : DM.accent,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {isFree ? "Free" : "Pro"}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 8, color: DM.textFaint, fontFamily: "Inter,sans-serif" }}>{d.updated}</span>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <Download size={11} color={DM.tealMid} />
                  <span style={{ fontSize: 9, color: DM.tealMid, fontFamily: "Inter,sans-serif", fontWeight: 600 }}>
                    Get
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </ModuleCard>
    </div>
  );
}

/* ─── TAB: SAVED ──────────────────────────────────────────────────────────── */
function SavedTab({ resources, onOpen, onWatch }) {
  const saved = resources.filter((r) => r.isWatchlisted);
  const recent = resources.filter((r) => r.isNew).slice(0, 4);
  return (
    <div style={{ paddingTop: 10 }}>
      <ModuleCard
        icon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={DM.accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        }
        title="Saved Resources"
        badge={String(saved.length)}
        badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
        defaultOpen={true}
      >
        {saved.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke={DM.textMuted}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ margin: "0 auto 8px" }}
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <div style={{ fontSize: 12, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>
              No saved resources yet
            </div>
            <div style={{ fontSize: 10, color: DM.textFaint, fontFamily: "Inter,sans-serif", marginTop: 4 }}>
              Tap the bookmark icon on any resource
            </div>
          </div>
        ) : (
          saved.map((r, i) => {
            const tm = TYPE_META[r.type] || TYPE_META.report;
            const ss = STATUS_STYLE[r.status] || STATUS_STYLE.available;
            return (
              <div
                key={r.id}
                onClick={() => onOpen(r)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 0",
                  borderBottom: i < saved.length - 1 ? `1px solid ${DM.borderSub}` : "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: DM.surface,
                    border: `1px solid ${DM.borderSub}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <tm.Icon size={15} color={DM.tealMid} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: DM.text,
                      fontFamily: "DM Sans,sans-serif",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {r.name}
                  </div>
                  <div style={{ fontSize: 9, color: DM.textMuted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                    {tm.label} · <span style={{ color: ss.color }}>{ss.label}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onWatch(r.id);
                  }}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    border: `1px solid ${DM.accent}`,
                    background: DM.accentDim,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <Bookmark size={11} color={DM.accent} fill={DM.accent} />
                </button>
              </div>
            );
          })
        )}
      </ModuleCard>

      <ModuleCard
        icon={
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={DM.accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        }
        title="Recently Added"
        badge="New"
        badgeStyle={{ background: "rgba(37,99,235,0.15)", color: "#60A5FA", border: "1px solid rgba(37,99,235,0.2)" }}
        defaultOpen={true}
      >
        {recent.map((r, i) => {
          const tm = TYPE_META[r.type] || TYPE_META.report;
          return (
            <div
              key={r.id}
              onClick={() => onOpen(r)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 0",
                borderBottom: i < recent.length - 1 ? `1px solid ${DM.borderSub}` : "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: DM.surface,
                  border: `1px solid ${DM.borderSub}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <tm.Icon size={15} color={DM.tealMid} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: DM.text,
                    fontFamily: "DM Sans,sans-serif",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.name}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "#60A5FA",
                    fontFamily: "Inter,sans-serif",
                    marginTop: 2,
                    fontWeight: 700,
                  }}
                >
                  NEW · {r.fileFormat || tm.label}
                </div>
              </div>
              <span style={{ fontSize: 9, color: DM.textFaint, fontFamily: "Inter,sans-serif", flexShrink: 0 }}>
                {r.downloads} dl
              </span>
            </div>
          );
        })}
      </ModuleCard>
    </div>
  );
}

/* ─── MOBILE BOTTOM NAV ───────────────────────────────────────────────────── */
function MobileBottomNav({ activeTab, setActiveTab }) {
  const NAV = [
    {
      id: "library",
      label: "Library",
      icon: (c) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      id: "reports",
      label: "Reports",
      icon: (c) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
    },
    {
      id: "guides",
      label: "Guides",
      icon: (c) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      id: "datasets",
      label: "Datasets",
      icon: (c) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      id: "saved",
      label: "Saved",
      icon: (c) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];
  return (
    <div
      style={{
        flexShrink: 0,
        background: DM.navBg,
        borderTop: `1px solid ${DM.line}`,
        display: "flex",
        paddingBottom: "env(safe-area-inset-bottom,0px)",
      }}
    >
      {NAV.map((n) => {
        const act = n.id === activeTab;
        return (
          <button
            key={n.id}
            onClick={() => setActiveTab(n.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0 0 10px",
              paddingTop: 0,
              position: "relative",
            }}
          >
            {act && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 28,
                  height: 2,
                  borderRadius: 1,
                  background: DM.accent,
                }}
              />
            )}
            <div style={{ marginTop: 10 }}>{n.icon(act ? DM.accent : DM.textMuted)}</div>
            <span
              style={{
                fontSize: 9,
                fontWeight: act ? 700 : 400,
                color: act ? DM.accent : DM.textMuted,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {n.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── MOBILE RESOURCES PAGE ───────────────────────────────────────────────── */
function MobileResourcesPage() {
  const [activeSector, setActiveSector] = useState(null);
  const [activeCategory, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedRes, setSelectedRes] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [resources, setResources] = useState(RESOURCES);
  const [activeTab, setActiveTab] = useState("library");

  const filtered = resources.filter((r) => {
    const mc = activeCategory === "all" || r.type === activeCategory;
    const ms =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const mx =
      !activeSector || r.sector === activeSector.full || r.sector === "All Sectors" || r.sector === activeSector.short;
    return mc && ms && mx;
  });

  const openRes = (r) => {
    setSelectedRes(r);
    setSheetOpen(true);
  };
  const closeSheet = () => {
    setSheetOpen(false);
    setTimeout(() => setSelectedRes(null), 280);
  };
  const toggleWatch = (id) =>
    setResources((p) => p.map((r) => (r.id === id ? { ...r, isWatchlisted: !r.isWatchlisted } : r)));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: DM.bg,
        fontFamily: "DM Sans,sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{display:none}
        @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        .drawer{animation:slideUp 0.25s ease}
      `}</style>

      <MobileHeader activeSector={activeSector} setActiveSector={setActiveSector} />

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {activeSector && <SectorHeroCard sector={activeSector} />}

        {activeTab === "library" && (
          <LibraryModule
            resources={filtered}
            activeCategory={activeCategory}
            setCategory={setCategory}
            onOpen={openRes}
            onWatch={toggleWatch}
          />
        )}
        {activeTab === "reports" && (
          <ReportsTab activeSector={activeSector} resources={filtered} onOpen={openRes} onWatch={toggleWatch} />
        )}
        {activeTab === "guides" && <GuidesTab />}
        {activeTab === "datasets" && <DatasetsTab />}
        {activeTab === "saved" && <SavedTab resources={resources} onOpen={openRes} onWatch={toggleWatch} />}

        <div style={{ height: 12 }} />
      </div>

      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {sheetOpen && <MobileBottomSheet resource={selectedRes} onClose={closeSheet} onWatchlist={toggleWatch} />}
    </div>
  );
}

/* ─── BRIDGE LOGO ─────────────────────────────────────────────────────────── */
function BridgeLogo() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3434.33 932.3"
        style={{ width: 104, height: 28, display: "block", marginBottom: 6 }}
      >
        <defs>
          <style>{`
          .cls-1{stroke:#fff;stroke-width:80px;}
          .cls-1,.cls-2,.cls-3,.cls-4{stroke-miterlimit:10;}
          .cls-1,.cls-3{fill:none;}
          .cls-2{stroke:#1b4d3e;}
          .cls-2,.cls-5{fill:#B8D935;}
          .cls-3{stroke:#231f20;stroke-width:5px;}
          .cls-6,.cls-4{fill:#fff;}
          .cls-4{stroke:#000;stroke-width:.5px;}
          .cls-8{fill:#fff;}
        `}</style>
        </defs>
        <path
          className="cls-6"
          d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
        />
        <path
          className="cls-4"
          d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1Z"
        />
        <path
          className="cls-4"
          d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
        />
        <rect className="cls-5" x="1427.38" y="17.35" width="205.2" height="145" />
        <rect className="cls-6" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
        <path
          className="cls-6"
          d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
        />
        <rect className="cls-6" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
        <rect className="cls-5" x="3083.41" y="339.47" width="175.12" height="257.67" />
        <rect className="cls-5" x="3083.41" y="654.42" width="175.12" height="257.67" />
        <circle className="cls-3" cx="3385.56" cy="866.94" r="46.27" />
        <path
          className="cls-8"
          d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13Z"
        />
        <rect className="cls-1" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55" />
        <polygon className="cls-2" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13" />
        <path
          style={{ fill: "#74914a" }}
          d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14Z"
        />
        <path
          className="cls-5"
          d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37Z"
        />
      </svg>
    </div>
  );
}

/* ─── SIDEBAR ─────────────────────────────────────────────────────────────── */
function Sidebar({ collapsed, setCollapsed, activeSector, setActiveSector }) {
  const [activePage, setActivePage] = useState("resources");
  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: (c) => <LayoutGrid size={16} color={c} /> },
    { id: "overview", label: "Market Overview", icon: (c) => <Activity size={16} color={c} /> },
    { id: "analytics", label: "Analytics", icon: (c) => <BarChart3 size={16} color={c} /> },
    { id: "watchlist", label: "Watchlist", icon: (c) => <Eye size={16} color={c} /> },
    { id: "reports", label: "Reports", icon: (c) => <FileText size={16} color={c} /> },
    {
      id: "resources",
      label: "Resources",
      icon: (c) => (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      ),
    },
    { id: "settings", label: "Settings", icon: (c) => <Settings size={16} color={c} /> },
  ];
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  return (
    <div
      style={{
        width: collapsed ? 56 : 220,
        flexShrink: 0,
        background: C.sidebar,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "width 0.22s ease",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        {collapsed ? (
          <div
            style={{
              width: 28,
              height: 28,
              background: C.accent,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 800, color: C.primary, fontFamily: "Inter,sans-serif" }}>B</span>
          </div>
        ) : (
          <div style={{ display: "inline-flex", flexDirection: "column", width: 104, flexShrink: 0 }}>
            <BridgeLogo />
            <div
              style={{
                width: 104,
                fontSize: 7,
                fontWeight: 700,
                color: C.accent,
                textTransform: "uppercase",
                fontFamily: "Inter,sans-serif",
                textAlign: "justify",
                textAlignLast: "justify",
                letterSpacing: "0.05em",
                lineHeight: 1.4,
              }}
            >
              Intelligence
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.3)",
            padding: 4,
            display: "flex",
            flexShrink: 0,
          }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <div style={{ padding: "10px 8px", flexShrink: 0 }}>
        {NAV.map((n) => {
          const act = n.id === activePage;
          return (
            <div
              key={n.id}
              onClick={() => setActivePage(n.id)}
              title={collapsed ? n.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "8px 8px",
                borderRadius: 6,
                cursor: "pointer",
                background: act ? C.sideAct : "transparent",
                marginBottom: 2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                transition: "background 0.1s",
              }}
            >
              {n.icon(act ? C.accent : "rgba(255,255,255,0.4)")}
              {!collapsed && (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: act ? 600 : 400,
                    color: act ? C.white : "rgba(255,255,255,0.5)",
                    fontFamily: "DM Sans,sans-serif",
                  }}
                >
                  {n.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Sector list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 12px", scrollbarWidth: "none" }}>
        {collapsed ? (
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "4px 6px 10px" }} />
        ) : (
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "1px",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "Inter,sans-serif",
              padding: "10px 8px 6px",
              textTransform: "uppercase",
            }}
          >
            Sectors
          </div>
        )}
        {sorted.map((s) => {
          const act = activeSector?.id === s.id;
          return (
            <div
              key={s.id}
              onClick={() => setActiveSector(act ? null : s)}
              title={collapsed ? s.short : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "space-between",
                padding: collapsed ? "5px 0" : "6px 8px",
                borderRadius: 5,
                cursor: "pointer",
                background: act ? C.sideAct : "transparent",
                marginBottom: 1,
                transition: "background 0.1s",
              }}
            >
              {collapsed ? (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: act ? "rgba(184,217,53,0.2)" : "rgba(255,255,255,0.05)",
                  }}
                >
                  {s.svgIcon(act ? C.accent : "rgba(255,255,255,0.35)", 14)}
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    {s.svgIcon(act ? C.accent : "rgba(255,255,255,0.3)", 12)}
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: act ? 600 : 400,
                        color: act ? C.white : "rgba(255,255,255,0.45)",
                        fontFamily: "DM Sans,sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.short}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      fontFamily: "Inter,sans-serif",
                      color: act ? C.accent : s.score >= 88 ? "rgba(184,217,53,0.6)" : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {s.score}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Return to Website */}
      {!collapsed ? (
        <div style={{ margin: "0 10px 6px", flexShrink: 0 }}>
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 7,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <LogOut size={13} color="rgba(255,255,255,0.35)" />
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.4)",
                fontFamily: "DM Sans,sans-serif",
              }}
            >
              Return to Website
            </span>
          </button>
        </div>
      ) : (
        <div style={{ margin: "0 8px 6px", flexShrink: 0, display: "flex", justifyContent: "center" }}>
          <button
            title="Return to Website"
            style={{
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 7,
              cursor: "pointer",
            }}
          >
            <LogOut size={13} color="rgba(255,255,255,0.3)" />
          </button>
        </div>
      )}

      {/* Upgrade to Pro */}
      {!collapsed && (
        <div
          style={{
            margin: "0 10px 12px",
            background: "linear-gradient(135deg,#1E3327,#152A1F)",
            border: "1px solid rgba(184,217,53,0.15)",
            borderRadius: 8,
            padding: 12,
            flexShrink: 0,
          }}
        >
          <div
            style={{ fontSize: 11, fontWeight: 700, color: C.white, fontFamily: "DM Sans,sans-serif", marginBottom: 3 }}
          >
            Upgrade to Pro
          </div>
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.4)",
              fontFamily: "Inter,sans-serif",
              marginBottom: 8,
              lineHeight: 1.4,
            }}
          >
            Full access to all 12 sector analyses
          </div>
          <button
            style={{
              width: "100%",
              background: C.accent,
              border: "none",
              borderRadius: 5,
              padding: "7px 0",
              fontSize: 10,
              fontWeight: 700,
              color: C.primary,
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            Get Access <ArrowUpRight size={10} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── HEADER ─────────────────────────────────────────────────────────────── */
function Header({ activeSector }) {
  const [notif, setNotif] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1400);
  };
  const month = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  const NOTIFS = [
    { h: "Agriculture sector signal updated", date: "Mar 2026", sig: "Bullish" },
    { h: "New GIPC policy brief published", date: "Mar 2026", sig: "Neutral" },
    { h: "Financial Inclusion score revised to 91", date: "Feb 2026", sig: "Bullish" },
  ];

  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 56,
        flexShrink: 0,
        boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
      }}
    >
      {/* LEFT — Title + Divider + Sector Pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", fontFamily: "DM Sans,sans-serif" }}>
            Resources
          </div>
          <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{month}</div>
        </div>
        {activeSector && (
          <>
            <div style={{ width: 1, height: 28, background: "#E5E7EB" }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 7,
                background: "#EBF5B0",
                border: "1px solid rgba(184,217,53,0.27)",
              }}
            >
              {activeSector.svgIcon("#1B4D3E", 11)}
              <span style={{ fontSize: 10, fontWeight: 700, color: "#1B4D3E", fontFamily: "Inter,sans-serif" }}>
                {activeSector.short}
              </span>
            </div>
          </>
        )}
      </div>

      {/* CENTER-RIGHT */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
        {/* Search */}
        <div
          style={{
            width: 380,
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "#F9FAFB",
            border: "1px solid #E5E7EB",
            borderRadius: 9,
            padding: "7px 11px",
          }}
        >
          <Search size={13} color="#6B7280" />
          <input
            placeholder="Search reports, signals…"
            style={{
              background: "none",
              border: "none",
              outline: "none",
              fontSize: 12,
              color: "#374151",
              fontFamily: "Inter,sans-serif",
              width: "100%",
            }}
          />
        </div>

        {/* Bell */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setNotif((o) => !o)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              border: "1px solid #E5E7EB",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Bell size={15} color="#374151" />
            <div
              style={{
                position: "absolute",
                top: 7,
                right: 7,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#DC2626",
                border: "2px solid #fff",
              }}
            />
          </button>
          {notif && (
            <div
              style={{
                position: "absolute",
                top: 44,
                right: 0,
                width: 280,
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                zIndex: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "11px 14px",
                  borderBottom: "1px solid #E5E7EB",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111827", fontFamily: "DM Sans,sans-serif" }}>
                  Alerts
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#B8D935",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontFamily: "Inter,sans-serif",
                  }}
                  onClick={() => setNotif(false)}
                >
                  Mark all read
                </span>
              </div>
              {NOTIFS.map((a, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 9, padding: "10px 14px", borderBottom: "1px solid #F3F4F6" }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: a.sig === "Bullish" ? "#16A34A" : "#CA8A04",
                      marginTop: 4,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#111827",
                        lineHeight: 1.3,
                        fontFamily: "DM Sans,sans-serif",
                      }}
                    >
                      {a.h}
                    </div>
                    <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                      {a.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Refresh */}
        <button
          onClick={handleSync}
          style={{
            width: 36,
            height: 36,
            borderRadius: 9,
            border: "1px solid #E5E7EB",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <RefreshCw size={14} color="#374151" className={syncing ? "spin" : ""} />
        </button>

        {/* User chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 11px",
            border: "1px solid #E5E7EB",
            borderRadius: 9,
            cursor: "pointer",
            background: "#fff",
          }}
        >
          <div
            style={{
              width: 27,
              height: 27,
              borderRadius: "50%",
              background: "rgba(184,217,53,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <User size={13} color="#1B4D3E" />
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1,
                fontFamily: "DM Sans,sans-serif",
              }}
            >
              Joseph A.
            </div>
            <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>Full Access</div>
          </div>
          <ChevronDown size={11} color="#6B7280" />
        </div>
      </div>
    </div>
  );
}

/* ─── LEFT ANALYTICS PANEL ────────────────────────────────────────────────── */
function AnalyticsPanel({ activeSector }) {
  const [weekFilter, setWeekFilter] = useState("Week");
  const [monthFilter, setMonthFilter] = useState("Month");
  const [hovBar, setHovBar] = useState(null);
  const maxActivity = Math.max(...ACTIVITY_DATA.map((d) => d.count));

  const weeklyRevenue = activeSector ? (activeSector.score * 18200).toLocaleString() : "2,184,000";
  const monthlyRevenue = activeSector ? (activeSector.score * 74800).toLocaleString() : "8,976,000";
  const weeklyUp = true;
  const monthlyUp = false;

  const sortedSectors = [...SECTORS].sort((a, b) => b.score - a.score);
  const sectorBarColors = [
    "#B8D935", // lime accent
    "#1B4D3E", // dark primary
    "#2E5A4D", // teal
    "#7AAF1E", // deeper lime
    "#3D7A5E", // mid green
    "#B8D935", // lime accent
    "#164030", // deep forest
    "#4E9470", // soft green
    "#2E5A4D", // teal
    "#8FBF28", // olive lime
    "#1B4D3E", // dark primary
    "#6BAF50", // fresh green
  ];

  const FILTERS = ["Today", "Week", "Month", "Quarter", "Year"];

  return (
    <div
      style={{
        width: 300,
        flexShrink: 0,
        background: C.white,
        borderRight: `1px solid ${C.line}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          padding: "16px 18px 12px",
          borderBottom: `1px solid ${C.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: "800",
            letterSpacing: "1.2px",
            color: C.dark,
            fontFamily: "Inter,sans-serif",
            textTransform: "uppercase",
          }}
        >
          Analytics
        </span>
        <Info size={13} color={C.muted} style={{ cursor: "pointer" }} />
      </div>

      <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Weekly Revenue Card */}
        <RevenueCard
          label="Weekly Revenue"
          amount={`$${weeklyRevenue}`}
          badge="+8.4%"
          up={weeklyUp}
          context={`Market activity generated an estimated`}
          highlight={`$${weeklyRevenue}`}
          suffix="this week across tracked sectors."
          filter={weekFilter}
          setFilter={setWeekFilter}
          filters={FILTERS}
        />

        {/* Monthly Revenue Card */}
        <RevenueCard
          label="Monthly Revenue"
          amount={`$${monthlyRevenue}`}
          badge="-2.1%"
          up={monthlyUp}
          context={`Revenue declined slightly to`}
          highlight={`$${monthlyRevenue}`}
          suffix="— seasonal contraction expected through Q1."
          filter={monthFilter}
          setFilter={setMonthFilter}
          filters={FILTERS}
        />

        {/* Today's Activity */}
        <div style={{ background: C.bg, borderRadius: 10, padding: "14px 14px 12px", border: `1px solid ${C.line}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                  color: C.muted,
                  fontFamily: "Inter,sans-serif",
                  textTransform: "uppercase",
                  marginBottom: 2,
                }}
              >
                Today's Activity
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  color: C.dark,
                  fontFamily: "DM Sans,sans-serif",
                  lineHeight: 1,
                  letterSpacing: "-1px",
                }}
              >
                93
              </div>
              <div style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                resource interactions
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <TrendingUp size={10} color={C.green} />
              <span style={{ fontSize: "10px", fontWeight: "700", color: C.green, fontFamily: "Inter,sans-serif" }}>
                +14%
              </span>
            </div>
          </div>
          {/* Bar chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 48, position: "relative" }}>
            {/* dashed grid lines */}
            {[0.33, 0.66, 1].map((pct, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: `${pct * 100}%`,
                  borderTop: "1px dashed rgba(0,0,0,0.07)",
                  pointerEvents: "none",
                }}
              />
            ))}
            {ACTIVITY_DATA.map((d, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  position: "relative",
                }}
                onMouseEnter={() => setHovBar(i)}
                onMouseLeave={() => setHovBar(null)}
              >
                <div
                  style={{
                    width: "100%",
                    background: hovBar === i ? d.color : `${d.color}70`,
                    borderRadius: "3px 3px 0 0",
                    height: `${(d.count / maxActivity) * 100}%`,
                    transition: "background 0.15s",
                    cursor: "pointer",
                    minHeight: 3,
                  }}
                />
                {hovBar === i && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 4px)",
                      background: C.dark,
                      color: C.white,
                      fontSize: "9px",
                      fontWeight: "700",
                      padding: "2px 6px",
                      borderRadius: 3,
                      fontFamily: "Inter,sans-serif",
                      whiteSpace: "nowrap",
                      zIndex: 10,
                    }}
                  >
                    {d.count} · {d.day}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {ACTIVITY_DATA.map((d, i) => (
              <span
                key={i}
                style={{
                  fontSize: "8px",
                  color: C.muted,
                  fontFamily: "Inter,sans-serif",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {d.day[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Top Performing Sectors */}
        <div style={{ background: C.bg, borderRadius: 10, padding: "14px", border: `1px solid ${C.line}` }}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              color: C.muted,
              fontFamily: "Inter,sans-serif",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Sector Health Scores
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {sortedSectors.map((s, i) => {
              const isActive = activeSector?.id === s.id;
              const barColor = sectorBarColors[i] || "#6B7280";
              return (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 72,
                      flexShrink: 0,
                      fontSize: "9px",
                      fontWeight: isActive ? "700" : "500",
                      color: isActive ? C.dark : C.muted,
                      fontFamily: "Inter,sans-serif",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {s.short}
                  </div>
                  <div style={{ flex: 1, height: 8, background: C.line, borderRadius: 4, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${s.score}%`,
                        background: isActive ? C.accent : barColor,
                        borderRadius: 4,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: 26,
                      textAlign: "right",
                      fontSize: "9px",
                      fontWeight: "700",
                      color: isActive ? C.primary : C.mid,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {s.score}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueCard({ label, amount, badge, up, context, highlight, suffix, filter, setFilter, filters }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: C.bg,
        borderRadius: 10,
        padding: "14px",
        border: `1px solid ${C.line}`,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span
          style={{
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "0.5px",
            color: C.muted,
            fontFamily: "Inter,sans-serif",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: "9px",
              fontWeight: "600",
              color: C.muted,
              fontFamily: "Inter,sans-serif",
              background: C.white,
              border: `1px solid ${C.line}`,
              borderRadius: 5,
              padding: "3px 8px",
              cursor: "pointer",
            }}
          >
            {filter} <ChevronDown size={9} />
          </button>
          {open && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                right: 0,
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 7,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                zIndex: 50,
                overflow: "hidden",
                minWidth: 90,
              }}
            >
              {filters.map((f) => (
                <div
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setOpen(false);
                  }}
                  style={{
                    padding: "7px 12px",
                    fontSize: "11px",
                    color: f === filter ? C.primary : C.mid,
                    fontWeight: f === filter ? "600" : "400",
                    fontFamily: "Inter,sans-serif",
                    cursor: "pointer",
                    background: f === filter ? `${C.primary}08` : "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {f === filter && <Check size={9} color={C.primary} />}
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 8 }}>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "800",
            color: C.dark,
            fontFamily: "DM Sans,sans-serif",
            letterSpacing: "-0.8px",
            lineHeight: 1,
          }}
        >
          {amount}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 2 }}>
          {up ? <TrendingUp size={9} color={C.green} /> : <TrendingDown size={9} color={C.red} />}
          <span
            style={{ fontSize: "9px", fontWeight: "700", color: up ? C.green : C.red, fontFamily: "Inter,sans-serif" }}
          >
            {badge}
          </span>
        </div>
      </div>
      <p style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.5, margin: 0 }}>
        {context} <strong style={{ color: C.dark }}>{highlight}</strong> {suffix}
      </p>
    </div>
  );
}

/* ─── CATEGORY PILLS ─────────────────────────────────────────────────────── */
const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "report", label: "Reports" },
  { key: "dataset", label: "Datasets" },
  { key: "guide", label: "Guides" },
  { key: "template", label: "Templates" },
];

/* ─── RESOURCE DETAIL DRAWER ─────────────────────────────────────────────── */
function ResourceDrawer({ resource, onClose, onWatchlist }) {
  if (!resource) return null;
  const tm = TYPE_META[resource.type] || TYPE_META.report;
  const ss = STATUS_STYLE[resource.status] || STATUS_STYLE.available;
  const related = RESOURCES.filter(
    (r) => r.id !== resource.id && (r.sector === resource.sector || r.type === resource.type),
  ).slice(0, 4);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
          zIndex: 200,
          backdropFilter: "blur(2px)",
        }}
      />
      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 440,
          background: C.white,
          boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          animation: "slideIn 0.22s ease",
        }}
      >
        <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>

        {/* Drawer Header */}
        <div style={{ padding: "18px 20px 14px", borderBottom: `1px solid ${C.line}`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: `${tm.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <tm.Icon size={15} color={tm.color} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: "700",
                    letterSpacing: "0.8px",
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  {tm.label}
                </div>
                <div style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif" }}>
                  {resource.id} · {resource.slug}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: `1px solid ${C.line}`,
                background: C.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={13} color={C.muted} />
            </button>
          </div>
          <h2
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: C.dark,
              fontFamily: "DM Sans,sans-serif",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {resource.name}
          </h2>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px", scrollbarWidth: "none" }}>
          {/* Status row */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: "700",
                color: ss.color,
                padding: "3px 8px",
                borderRadius: 5,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {ss.label}
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: "600",
                color: resource.access === "free" ? C.green : C.primary,
                padding: "3px 8px",
                borderRadius: 5,
                fontFamily: "Inter,sans-serif",
                textTransform: "capitalize",
              }}
            >
              {resource.access === "free" ? "Free Access" : "Pro Access"}
            </span>
            {resource.isNew && (
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "#2563EB",
                  padding: "3px 8px",
                  borderRadius: 5,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                New
              </span>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "12px",
              color: C.mid,
              fontFamily: "Inter,sans-serif",
              lineHeight: 1.6,
              margin: "0 0 16px",
            }}
          >
            {resource.description}
          </p>

          {/* Details grid */}
          <div
            style={{
              background: C.bg,
              borderRadius: 8,
              border: `1px solid ${C.line}`,
              overflow: "hidden",
              marginBottom: 16,
            }}
          >
            {[
              ["Sector", resource.sector],
              ["Format", resource.fileFormat || "—"],
              ["File Size", resource.fileSize || "—"],
              ["Pages", resource.pages ? `${resource.pages} pages` : "—"],
              ["Added By", resource.addedBy],
              ["Published", resource.createdAt],
              ["Downloads", resource.downloads.toLocaleString()],
              ["This Month", `${resource.monthlyDownloads.toLocaleString()} downloads`],
            ].map(([k, v], i) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  borderBottom: i < 7 ? `1px solid ${C.line}` : "none",
                }}
              >
                <span style={{ fontSize: "11px", color: C.muted, fontFamily: "Inter,sans-serif" }}>{k}</span>
                <span style={{ fontSize: "11px", fontWeight: "600", color: C.dark, fontFamily: "Inter,sans-serif" }}>
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.5px",
                color: C.muted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Tags
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {resource.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "10px",
                    fontWeight: "600",
                    color: C.teal,
                    background: `${C.teal}10`,
                    border: `1px solid ${C.teal}25`,
                    padding: "3px 8px",
                    borderRadius: 20,
                    fontFamily: "Inter,sans-serif",
                    cursor: "pointer",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                  color: C.muted,
                  fontFamily: "Inter,sans-serif",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Related Resources
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {related.map((r) => {
                  const rtm = TYPE_META[r.type] || TYPE_META.report;
                  return (
                    <div
                      key={r.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 10px",
                        background: C.bg,
                        borderRadius: 7,
                        border: `1px solid ${C.line}`,
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 6,
                          background: `${rtm.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <rtm.Icon size={12} color={rtm.color} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: C.dark,
                            fontFamily: "Inter,sans-serif",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {r.name}
                        </div>
                        <div style={{ fontSize: "9px", color: C.muted, fontFamily: "Inter,sans-serif" }}>
                          {rtm.label}
                        </div>
                      </div>
                      <ChevronRight size={12} color={C.muted} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div
          style={{ padding: "14px 20px", borderTop: `1px solid ${C.line}`, display: "flex", gap: 10, flexShrink: 0 }}
        >
          <button
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: C.primary,
              border: "none",
              borderRadius: 8,
              padding: "11px",
              fontSize: "12px",
              fontWeight: "700",
              color: C.white,
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
            }}
          >
            <Download size={13} /> {resource.access === "free" ? "Download Now" : "Unlock & Download"}
          </button>
          <button
            onClick={() => onWatchlist(resource.id)}
            style={{
              width: 42,
              height: 42,
              borderRadius: 8,
              border: `1px solid ${resource.isWatchlisted ? C.accent : C.line}`,
              background: resource.isWatchlisted ? `${C.accent}20` : C.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <BookmarkIcon
              size={14}
              color={resource.isWatchlisted ? C.primary : C.muted}
              fill={resource.isWatchlisted ? C.accent : "none"}
            />
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── DESKTOP PAGE ────────────────────────────────────────────────────────── */
function DesktopResourcesPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSector, setActiveSector] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [activeCategory, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedRes, setSelectedRes] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [resources, setResources] = useState(RESOURCES);
  const [activeTab, setActiveTab] = useState("overview");
  const [sortCol, setSortCol] = useState("downloads");
  const [sortDir, setSortDir] = useState("desc");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const filtered = resources.filter((r) => {
    const matchCat = activeCategory === "all" || r.type === activeCategory;
    const matchSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchSector =
      !activeSector || r.sector === activeSector.full || r.sector === "All Sectors" || r.sector === activeSector.short;
    return matchCat && matchSearch && matchSector;
  });

  const sorted = [...filtered].sort((a, b) => {
    let av = a[sortCol] ?? 0,
      bv = b[sortCol] ?? 0;
    if (typeof av === "string") av = av.toLowerCase();
    if (typeof bv === "string") bv = bv.toLowerCase();
    return sortDir === "asc" ? (av > bv ? 1 : -1) : av < bv ? 1 : -1;
  });

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("desc");
    }
  };

  const openResource = (r) => {
    setSelectedRes(r);
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedRes(null), 200);
  };
  const toggleWatch = (id) =>
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, isWatchlisted: !r.isWatchlisted } : r)));

  const TABS = ["profile", "overview", "analytics"];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: C.bg,
        fontFamily: "DM Sans,sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`*{box-sizing:border-box} ::-webkit-scrollbar{display:none} @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} .spin{animation:spin 1s linear infinite}`}</style>

      {/* Left nav sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeSector={activeSector}
        setActiveSector={setActiveSector}
      />

      {/* Main column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Header activeSector={activeSector} />

        {/* Content row */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* ── Analytics Panel ── */}
          <AnalyticsPanel activeSector={activeSector} />

          {/* ── Right Content ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
            {/* Sub-nav + controls */}
            <div
              style={{
                background: C.white,
                borderBottom: `1px solid ${C.line}`,
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                gap: 0,
                flexShrink: 0,
              }}
            >
              {/* Tabs */}
              <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    style={{
                      padding: "12px 14px",
                      fontSize: "12px",
                      fontWeight: activeTab === t ? "700" : "500",
                      color: activeTab === t ? C.primary : C.muted,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      borderBottom: activeTab === t ? `2px solid ${C.primary}` : "2px solid transparent",
                      fontFamily: "DM Sans,sans-serif",
                      textTransform: "capitalize",
                      transition: "all 0.15s",
                      marginBottom: "-1px",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {/* Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: "11px",
                    fontWeight: "600",
                    color: C.mid,
                    fontFamily: "Inter,sans-serif",
                    background: C.bg,
                    border: `1px solid ${C.line}`,
                    borderRadius: 6,
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  <Filter size={11} /> Filter
                </button>
                {/* View toggles */}
                <div
                  style={{
                    display: "flex",
                    background: C.bg,
                    border: `1px solid ${C.line}`,
                    borderRadius: 6,
                    overflow: "hidden",
                  }}
                >
                  {[
                    ["table", List],
                    ["grid", LayoutGrid],
                  ].map(([v, Ic]) => (
                    <button
                      key={v}
                      onClick={() => setViewMode(v)}
                      style={{
                        padding: "5px 9px",
                        background: viewMode === v ? C.primary : "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        transition: "background 0.15s",
                      }}
                    >
                      <Ic size={13} color={viewMode === v ? C.white : C.muted} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Greeting bar */}
            <div
              style={{
                background: C.white,
                borderBottom: `1px solid ${C.line}`,
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexShrink: 0,
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: C.dark, fontFamily: "DM Sans,sans-serif" }}>
                  {greeting}, Joseph
                </div>
                <div style={{ fontSize: "11px", color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                  {sorted.length} resource{sorted.length !== 1 ? "s" : ""} available
                  {activeSector ? ` in ${activeSector.short}` : ""}
                </div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
                {/* Search */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    background: C.bg,
                    border: `1px solid ${C.line}`,
                    borderRadius: 7,
                    padding: "6px 10px",
                    width: 180,
                  }}
                >
                  <Search size={12} color={C.muted} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search…"
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: "11px",
                      color: C.dark,
                      fontFamily: "Inter,sans-serif",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
                    >
                      <X size={10} color={C.muted} />
                    </button>
                  )}
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    background: C.primary,
                    border: "none",
                    borderRadius: 7,
                    padding: "6px 12px",
                    fontSize: "11px",
                    fontWeight: "700",
                    color: C.white,
                    fontFamily: "Inter,sans-serif",
                    cursor: "pointer",
                  }}
                >
                  <Eye size={11} /> View Report
                </button>
              </div>
            </div>

            {/* Category pills */}
            <div
              style={{
                background: C.white,
                borderBottom: `1px solid ${C.line}`,
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              <div style={{ display: "flex", gap: 6, padding: "8px 0" }}>
                {CATEGORIES.map((cat) => {
                  const cnt = cat.key === "all" ? resources.length : resources.filter((r) => r.type === cat.key).length;
                  const act = activeCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setCategory(cat.key)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 11px",
                        borderRadius: 20,
                        border: `1px solid ${act ? C.primary : C.line}`,
                        background: act ? C.primary : C.white,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.15s",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: act ? C.white : C.mid,
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {cat.label}
                      </span>
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: "700",
                          color: act ? "rgba(255,255,255,0.7)" : C.muted,
                          fontFamily: "Inter,sans-serif",
                          background: act ? "rgba(255,255,255,0.15)" : C.line,
                          padding: "1px 5px",
                          borderRadius: 10,
                        }}
                      >
                        {cnt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resource list */}
            <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
              {viewMode === "table" ? (
                <TableView
                  resources={sorted}
                  onOpen={openResource}
                  onWatch={toggleWatch}
                  sortCol={sortCol}
                  sortDir={sortDir}
                  onSort={toggleSort}
                />
              ) : (
                <GridView resources={sorted} onOpen={openResource} onWatch={toggleWatch} />
              )}
              {sorted.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 200,
                    gap: 8,
                  }}
                >
                  <AlertCircle size={28} color={C.muted} />
                  <div style={{ fontSize: "13px", color: C.muted, fontFamily: "Inter,sans-serif" }}>
                    No resources match your filters
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div
          style={{
            height: 36,
            flexShrink: 0,
            background: "#111E17",
            borderTop: "1px solid #1A2E22",
            display: "flex",
            alignItems: "center",
            padding: "0 22px",
            gap: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: ".5px",
                fontFamily: "Inter,sans-serif",
              }}
            >
              BRIDGE Intelligence
            </span>
          </div>
          {[
            "12 Sectors",
            "174 Ventures",
            `Active: ${activeSector ? activeSector.short : "Resources"}`,
            `${sorted.length} Results`,
          ].map((label, i) => (
            <React.Fragment key={i}>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.18)",
                  marginRight: 14,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                ·
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  marginRight: 14,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {label}
              </span>
            </React.Fragment>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "Inter,sans-serif" }}>
              © 2026 BRIDGE PBC
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 8px",
                borderRadius: 4,
                background: "rgba(184,217,53,0.08)",
                border: "1px solid rgba(184,217,53,0.15)",
              }}
            >
              <div
                style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent, boxShadow: "0 0 5px #B8D935" }}
              />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: C.accent,
                  letterSpacing: ".8px",
                  textTransform: "uppercase",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Live
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Drawer */}
      {drawerOpen && <ResourceDrawer resource={selectedRes} onClose={closeDrawer} onWatchlist={toggleWatch} />}
    </div>
  );
}

/* ─── MAIN EXPORT ─────────────────────────────────────────────────────────── */
export default function ResourcesPageV2() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileResourcesPage /> : <DesktopResourcesPage />;
}

/* ─── TABLE VIEW ─────────────────────────────────────────────────────────── */
function TableView({ resources, onOpen, onWatch, sortCol, sortDir, onSort }) {
  const COLS = [
    { key: "name", label: "Resource", w: "auto" },
    { key: "type", label: "Type", w: 100 },
    { key: "status", label: "Status", w: 110 },
    { key: "downloads", label: "Downloads", w: 110 },
    { key: "access", label: "Access", w: 80 },
  ];
  const SortIcon = ({ col }) => {
    if (sortCol !== col) return <span style={{ color: C.muted, fontSize: 9, marginLeft: 3 }}>⇅</span>;
    return sortDir === "asc" ? (
      <ChevronUp size={10} color={C.primary} style={{ marginLeft: 2 }} />
    ) : (
      <ChevronDown size={10} color={C.primary} style={{ marginLeft: 2 }} />
    );
  };
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead style={{ position: "sticky", top: 0, background: C.bg, zIndex: 5 }}>
        <tr style={{ borderBottom: `1px solid ${C.line}` }}>
          <th style={{ width: 36, padding: "8px 0 8px 16px" }} />
          {COLS.map((c) => (
            <th
              key={c.key}
              onClick={() => onSort(c.key)}
              style={{
                padding: "8px 12px",
                textAlign: "left",
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.5px",
                color: C.muted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                cursor: "pointer",
                width: c.w === "auto" ? undefined : c.w,
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              {c.label}
              <SortIcon col={c.key} />
            </th>
          ))}
          <th style={{ width: 40 }} />
        </tr>
      </thead>
      <tbody>
        {resources.map((r, i) => {
          const tm = TYPE_META[r.type] || TYPE_META.report;
          const ss = STATUS_STYLE[r.status] || STATUS_STYLE.available;
          const even = i % 2 === 0;
          return (
            <tr
              key={r.id}
              onClick={() => onOpen(r)}
              style={{
                background: even ? C.white : C.bg,
                borderBottom: `1px solid ${C.line}`,
                cursor: "pointer",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${C.primary}06`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = even ? C.white : C.bg)}
            >
              {/* Checkbox */}
              <td style={{ padding: "10px 0 10px 16px" }}>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    border: `1.5px solid ${C.line}`,
                    background: C.white,
                  }}
                />
              </td>
              {/* Name */}
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 7,
                      background: `${tm.color}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <tm.Icon size={13} color={tm.color} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: C.dark,
                        fontFamily: "DM Sans,sans-serif",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 280,
                      }}
                    >
                      {r.name}
                      {r.isNew && (
                        <span
                          style={{
                            marginLeft: 6,
                            fontSize: "8px",
                            fontWeight: "800",
                            color: "#2563EB",
                            background: "#DBEAFE",
                            padding: "1px 5px",
                            borderRadius: 3,
                            fontFamily: "Inter,sans-serif",
                            verticalAlign: "middle",
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                      {r.slug} · {r.sector}
                    </div>
                  </div>
                </div>
              </td>
              {/* Type */}
              <td style={{ padding: "10px 12px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    color: tm.color,
                    background: `${tm.color}12`,
                    padding: "3px 8px",
                    borderRadius: 5,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {tm.label}
                </span>
              </td>
              {/* Status */}
              <td style={{ padding: "10px 12px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    color: ss.color,
                    padding: "3px 8px",
                    borderRadius: 5,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {ss.label}
                </span>
              </td>
              {/* Downloads */}
              <td style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: C.dark, fontFamily: "Inter,sans-serif" }}>
                  {r.downloads.toLocaleString()}
                </div>
                <div style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif" }}>
                  +{r.monthlyDownloads}/mo
                </div>
              </td>
              {/* Access */}
              <td style={{ padding: "10px 12px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    color: r.access === "free" ? C.green : C.primary,
                    fontFamily: "Inter,sans-serif",
                    textTransform: "capitalize",
                  }}
                >
                  {r.access === "free" ? "Free" : "Pro"}
                </span>
              </td>
              {/* Actions */}
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", gap: 6 }} onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onWatch(r.id)}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 5,
                      border: `1px solid ${r.isWatchlisted ? C.accent : C.line}`,
                      background: r.isWatchlisted ? `${C.accent}20` : C.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <BookmarkIcon
                      size={11}
                      color={r.isWatchlisted ? C.primary : C.muted}
                      fill={r.isWatchlisted ? C.accent : "none"}
                    />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ─── GRID VIEW ──────────────────────────────────────────────────────────── */
function GridView({ resources, onOpen, onWatch }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, padding: 20 }}>
      {resources.map((r) => {
        const tm = TYPE_META[r.type] || TYPE_META.report;
        const ss = STATUS_STYLE[r.status] || STATUS_STYLE.available;
        return (
          <div
            key={r.id}
            onClick={() => onOpen(r)}
            style={{
              background: C.white,
              borderRadius: 10,
              border: `1px solid ${C.line}`,
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Card top gradient */}
            <div
              style={{
                height: 72,
                background: `linear-gradient(135deg,${tm.color}18,${tm.color}08)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: C.white,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <tm.Icon size={16} color={tm.color} />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onWatch(r.id);
                }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  border: `1px solid ${r.isWatchlisted ? C.accent : C.line}`,
                  background: r.isWatchlisted ? `${C.accent}25` : C.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <BookmarkIcon
                  size={12}
                  color={r.isWatchlisted ? C.primary : C.muted}
                  fill={r.isWatchlisted ? C.accent : "none"}
                />
              </button>
            </div>
            {/* Card body */}
            <div style={{ padding: "12px 14px 14px" }}>
              <div style={{ display: "flex", gap: 5, marginBottom: 7 }}>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: "700",
                    color: tm.color,
                    background: `${tm.color}12`,
                    padding: "2px 6px",
                    borderRadius: 4,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {tm.label}
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: "700",
                    color: ss.color,
                    padding: "2px 6px",
                    borderRadius: 4,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {ss.label}
                </span>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: C.dark,
                  fontFamily: "DM Sans,sans-serif",
                  lineHeight: 1.3,
                  marginBottom: 5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {r.name}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: C.muted,
                  fontFamily: "Inter,sans-serif",
                  marginBottom: 10,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: 1.4,
                }}
              >
                {r.description}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 8,
                  borderTop: `1px solid ${C.line}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Download size={10} color={C.muted} />
                  <span style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif" }}>
                    {r.downloads.toLocaleString()}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    color: r.access === "free" ? C.green : C.primary,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {r.access === "free" ? "Free" : "Pro"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
