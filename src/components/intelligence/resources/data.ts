import React from "react";
import {
  BarChart3,
  Database,
  BookOpen,
  FileText,
  Settings,
  Hash,
  Activity,
} from "lucide-react";
import { C, type Sector } from "../constants";

/* ─── RESOURCE TYPE ────────────────────────────────────────────────────── */
export interface Resource {
  id: string;
  name: string;
  slug: string;
  type: string;
  sector: string;
  status: string;
  access: string;
  downloads: number;
  monthlyDownloads: number;
  fileFormat: string;
  fileSize: string | null;
  pages: number | null;
  description: string;
  tags: string[];
  isWatchlisted: boolean;
  isNew: boolean;
  addedBy: string;
  createdAt: string;
}

export interface TypeMetaEntry {
  label: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
}

export interface StatusStyleEntry {
  color: string;
  bg: string;
  label: string;
}

/* ─── RESOURCES DATA ───────────────────────────────────────────────────── */
export const RESOURCES: Resource[] = [
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
      "Complete intellectual foundation \u2014 BRIDGE\u2019s methodology, sector framework, and theory of change for Ghana\u2019s development ecosystem. Covers all 12 sectors with strategic rationale.",
    tags: ["White Paper", "Ghana", "Framework", "Investment"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "BRIDGE Research",
    createdAt: "2025-01-15",
  },
  {
    id: "RES-002",
    name: "Sector Analysis Collection \u2014 All 12 Sectors",
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
    name: "BRIDGE Portfolio Data \u2014 174+ Ventures",
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
    name: "Kejetia Market Digitisation \u2014 Flagship Case",
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
      "Deep-dive on West Africa\u2019s largest market and BRIDGE\u2019s 10,000+ trader digitisation platform and build-out strategy.",
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
    name: "Ghana Policy Tracker \u2014 2025\u20132026",
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
    name: "Agriculture Crisis \u2014 Strategic Positioning Brief",
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
      "Strategic response to Ghana\u2019s 2025\u201326 agricultural crisis including positioning frameworks and opportunity maps for investors.",
    tags: ["Agriculture", "Crisis", "Strategy", "2026"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "BRIDGE Research",
    createdAt: "2026-02-01",
  },
  {
    id: "RES-008",
    name: "Financial Inclusion Market Map \u2014 Ghana",
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
      "Comprehensive mapping of Ghana\u2019s financial services landscape including mobile money operators, fintech startups, MFIs, and rural banking coverage.",
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
      "Investor-facing guide to Ghana\u2019s energy sector \u2014 solar pipeline, off-grid opportunity, regulatory environment, and key development partners.",
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
      "Full documentation of the BRIDGE Impact Score methodology \u2014 Peace & Prosperity Alignment, Strategic Fit, Feasibility, and Scalability dimensions.",
    tags: ["Methodology", "Scoring", "Impact", "Framework"],
    isWatchlisted: false,
    isNew: false,
    addedBy: "BRIDGE Research",
    createdAt: "2024-09-01",
  },
  {
    id: "RES-011",
    name: "GIPC Sector Profiles Bundle \u2014 2025",
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
    name: "Ejura Agricultural Hub \u2014 Business Plan",
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

/* ─── ACTIVITY DATA ────────────────────────────────────────────────────── */
export const ACTIVITY_DATA = [
  { day: "Mon", count: 38, color: "#2E5A4D" },
  { day: "Tue", count: 62, color: "#B8D935" },
  { day: "Wed", count: 47, color: "#1B4D3E" },
  { day: "Thu", count: 81, color: "#B8D935" },
  { day: "Fri", count: 93, color: "#2E5A4D" },
  { day: "Sat", count: 44, color: "#1B4D3E" },
  { day: "Sun", count: 29, color: "#2E5A4D" },
];

/* ─── TYPE METADATA ────────────────────────────────────────────────────── */
export const TYPE_META: Record<string, TypeMetaEntry> = {
  report: { label: "Report", Icon: BarChart3, color: C.primary },
  dataset: { label: "Dataset", Icon: Database, color: C.teal },
  guide: { label: "Guide", Icon: BookOpen, color: C.primary },
  template: { label: "Template", Icon: FileText, color: C.teal },
  tool: { label: "Tool", Icon: Settings, color: C.primary },
  api: { label: "API", Icon: Hash, color: C.teal },
  news: { label: "News", Icon: Activity, color: C.primary },
};

/* ─── STATUS STYLES ────────────────────────────────────────────────────── */
export const STATUS_STYLE: Record<string, StatusStyleEntry> = {
  available: { color: "#16A34A", bg: "#DCFCE7", label: "Available" },
  new: { color: "#2563EB", bg: "#DBEAFE", label: "New" },
  pending: { color: "#D97706", bg: "#FEF3C7", label: "Coming Soon" },
  "out-of-date": { color: "#DC2626", bg: "#FEE2E2", label: "Out of Date" },
  inactive: { color: "#9CA3AF", bg: "#F3F4F6", label: "Inactive" },
  draft: { color: "#6B7280", bg: "#F9FAFB", label: "Draft" },
};

/* ─── DARK MOBILE PALETTE ──────────────────────────────────────────────── */
export const DM = {
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

/* ─── SECTOR INTELLIGENCE DATA ─────────────────────────────────────────── */
export const SECTOR_INTEL: Record<number, {
  subsectors: { name: string; pct: number; growth: number; risk: number }[];
  companies: { rank: number; name: string; ticker: string; chg: number; val: string; score: number }[];
  signals: { title: string; sentiment: string; date: string; cat: string }[];
  kpi: { cap: string; irr: string; subRev: string; score: number };
}> = {
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

export const getIntel = (sector: Sector | null) => {
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

/* ─── ENGAGEMENT / HEATMAP DATA ────────────────────────────────────────── */
export const ENGAGE_DATA = [
  12, 8, 15, 22, 18, 9, 6, 24, 31, 19, 14, 28, 35, 17, 20, 25, 38, 29, 22, 16, 11, 33, 41, 28, 19, 30, 24, 15,
];
export const HEATMAP = [
  [2, 1, 0, 0, 1, 2],
  [0, 0, 1, 3, 3, 2],
  [3, 1, 1, 2, 0, 0],
  [1, 0, 1, 0, 0, 1],
  [1, 0, 2, 2, 1, 3],
  [1, 1, 2, 0, 1, 0],
  [0, 0, 1, 0, 2, 2],
];
export const HMAP_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const HMAP_HOURS = ["00", "04", "08", "12", "16", "20"];
export const HMAP_COLORS = [
  "rgba(42,94,66,0.18)",
  "rgba(42,94,66,0.38)",
  "rgba(42,94,66,0.58)",
  "rgba(42,94,66,0.82)",
  "rgba(184,217,53,0.75)",
];
export const SUB_COLORS = ["#2A5E42", "#3D8B62", "#4DAF82", "#1E5242", "#163A2A"];

/* ─── GUIDES DATA ──────────────────────────────────────────────────────── */
export interface GuideItem {
  title: string;
  cat: string;
  sector: string;
  pages: number;
  level: string;
  updated: string;
}

export const GUIDES_DATA: GuideItem[] = [
  { title: "Ghana Market Entry Playbook", cat: "Market Entry", sector: "All Sectors", pages: 42, level: "Foundational", updated: "Mar 2026" },
  { title: "Sector Due Diligence Framework", cat: "Due Diligence", sector: "All Sectors", pages: 28, level: "Intermediate", updated: "Feb 2026" },
  { title: "Agribusiness Value Chain Guide", cat: "Operations", sector: "Agriculture", pages: 35, level: "Advanced", updated: "Jan 2026" },
  { title: "Fintech Licensing & Compliance", cat: "Regulatory", sector: "Financial", pages: 19, level: "Intermediate", updated: "Mar 2026" },
  { title: "Infrastructure Procurement Guide", cat: "Procurement", sector: "Infrastructure", pages: 56, level: "Advanced", updated: "Feb 2026" },
  { title: "Impact Measurement Handbook", cat: "Reporting", sector: "All Sectors", pages: 24, level: "Foundational", updated: "Jan 2026" },
  { title: "SME Financing & Capital Access", cat: "Finance", sector: "All Sectors", pages: 31, level: "Foundational", updated: "Mar 2026" },
  { title: "Energy Project Feasibility Guide", cat: "Feasibility", sector: "Energy", pages: 48, level: "Advanced", updated: "Feb 2026" },
];

export const LEVEL_COLOR: Record<string, string> = { Foundational: DM.positive, Intermediate: "#60A5FA", Advanced: DM.warning };

/* ─── DATASETS DATA ────────────────────────────────────────────────────── */
export interface DatasetItem {
  title: string;
  cat: string;
  sector: string;
  rows: string;
  fmt: string;
  updated: string;
  access: string;
}

export const DATASETS_DATA: DatasetItem[] = [
  { title: "Ghana Trade Flow Q1 2026", cat: "Trade", sector: "All Sectors", rows: "12,400", fmt: "CSV", updated: "Mar 2026", access: "free" },
  { title: "Sector FDI Inflows 2020\u20132025", cat: "Investment", sector: "All Sectors", rows: "8,200", fmt: "XLSX", updated: "Feb 2026", access: "pro" },
  { title: "Agri Value Chain Price Index", cat: "Prices", sector: "Agriculture", rows: "34,500", fmt: "CSV", updated: "Mar 2026", access: "free" },
  { title: "SME Credit Access Survey 2025", cat: "Finance", sector: "Financial", rows: "5,100", fmt: "XLSX", updated: "Jan 2026", access: "pro" },
  { title: "Energy Production by Region", cat: "Production", sector: "Energy", rows: "9,800", fmt: "CSV", updated: "Feb 2026", access: "free" },
  { title: "Infrastructure Spend Database", cat: "Expenditure", sector: "Infrastructure", rows: "21,300", fmt: "XLSX", updated: "Jan 2026", access: "pro" },
  { title: "Labour Market & Skills Gap 2025", cat: "Labour", sector: "All Sectors", rows: "6,700", fmt: "CSV", updated: "Mar 2026", access: "free" },
  { title: "Tourism Arrivals & Revenue Data", cat: "Tourism", sector: "Tourism", rows: "4,900", fmt: "XLSX", updated: "Feb 2026", access: "pro" },
];

/* ─── CATEGORY PILLS ───────────────────────────────────────────────────── */
export const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "report", label: "Reports" },
  { key: "dataset", label: "Datasets" },
  { key: "guide", label: "Guides" },
  { key: "template", label: "Templates" },
];
