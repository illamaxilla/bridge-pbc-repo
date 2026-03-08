import React, { useState, useEffect, useRef } from "react";
import {
  Blocks,
  Wallet,
  Cross,
  Cpu,
  GraduationCap,
  Sprout,
  Camera,
  Home,
  Luggage,
  BatteryCharging,
  Factory,
  Truck,
  Bell,
  Search,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Activity,
  LayoutGrid,
  Bookmark,
  Settings,
  ArrowUpRight,
  Target,
  Minus,
  Zap,
  Clock,
  Eye,
  BookOpen,
  FileBarChart,
  Book,
  LogOut,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart as RBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

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
  sideAct: "#1E3327",
  sideHov: "#1A2E1F",
  green: "#16A34A",
  red: "#DC2626",
  yellow: "#CA8A04",
};

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

const SECTORS = [
  {
    id: "agriculture",
    icon: Sprout,
    svgIcon: sectorSvgIcons[5],
    short: "Agriculture",
    full: "Agriculture & Value Chains",
    tag: "Economic Engine",
    score: 90,
    capLow: 12,
    capHigh: 22,
    irrLow: 10,
    irrHigh: 25,
    totalV: 18,
    subSectors: [
      { name: "Processing", pct: 35, color: "#B8D935" },
      { name: "Cold Chain", pct: 25, color: "#2E5A4D" },
      { name: "Aggregation", pct: 20, color: "#1B4D3E" },
      { name: "AgTech", pct: 12, color: "#4ADE80" },
      { name: "Other", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Tomato Processing Facility", cap: "$2–4M", irr: "15–20%", risk: "MEDIUM" },
      { name: "Solar Cold Storage Network", cap: "$1.5–3M", irr: "12–15%", risk: "MEDIUM" },
      { name: "Cooperative Capital Fund", cap: "$1–2M", irr: "10–14%", risk: "MEDIUM" },
      { name: "AgTech Investment Portfolio", cap: "$1–2M", irr: "20–25%", risk: "HIGH" },
      { name: "Market Aggregation Centers", cap: "$0.5–1M", irr: "8–12%", risk: "LOW" },
      { name: "Agricultural Insurance Co.", cap: "$0.3–0.6M", irr: "Commission", risk: "LOW" },
    ],
    t2: [
      { name: "Fruit Processing Facility", cap: "$2–4M", irr: "14–18%", risk: "MEDIUM" },
      { name: "Cashew/Shea Processing", cap: "$1.5–3M", irr: "15–20%", risk: "MEDIUM" },
      { name: "Warehouse Receipt Financing", cap: "$1–2M", irr: "12–16%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "Cocoa Processing Facility", cap: "$3–6M", irr: "15–22%", risk: "HIGH" },
      { name: "Integrated Agriculture Hub", cap: "$2–4M", irr: "12–18%", risk: "HIGH" },
    ],
    activity: [
      { h: "Post-Harvest Loss Crisis Brief Published", amt: "+$2M", sig: "Bullish", date: "Feb 2026" },
      { h: "GH₵4.5B PFJ Phase 3 Budget Confirmed", amt: "+Policy", sig: "Bullish", date: "Mar 2026" },
      { h: "2024 Drought — 436k Farmers Affected", amt: "Risk", sig: "Watch", date: "Jan 2026" },
      { h: "Cocoa Exports Hit $372.6M", amt: "+$372M", sig: "Bullish", date: "Jan 2026" },
    ],
    cross: ["financial", "technology", "infrastructure", "education"],
  },
  {
    id: "financial",
    icon: Wallet,
    svgIcon: sectorSvgIcons[1],
    short: "Financial Inclusion",
    full: "Financial Inclusion & Economic Security",
    tag: "Foundation",
    score: 91,
    capLow: 10,
    capHigh: 20,
    irrLow: 8,
    irrHigh: 25,
    totalV: 18,
    subSectors: [
      { name: "Lending", pct: 40, color: "#B8D935" },
      { name: "Mobile Money", pct: 25, color: "#2E5A4D" },
      { name: "Insurance", pct: 18, color: "#1B4D3E" },
      { name: "Susu", pct: 12, color: "#60A5FA" },
      { name: "Other", pct: 5, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Market Financial Services Platform", cap: "$1–3M", irr: "15–22%", risk: "MEDIUM" },
      { name: "Trader Working Capital Facility", cap: "$0.5–2M", irr: "18–25%", risk: "MEDIUM" },
      { name: "Digital Susu Integration", cap: "$0.2–0.5M", irr: "12–18%", risk: "LOW" },
      { name: "Market Microinsurance Bundle", cap: "$0.15–0.4M", irr: "Commission", risk: "LOW" },
      { name: "Financial Health Hub", cap: "$0.1–0.25M", irr: "Break-even", risk: "LOW" },
    ],
    t2: [
      { name: "MSME Credit Guarantee Facility", cap: "$2–5M", irr: "8–12%", risk: "MEDIUM" },
      { name: "Women's Economic Empowerment Fund", cap: "$0.5–1.5M", irr: "12–18%", risk: "MEDIUM" },
      { name: "Alternative Credit Scoring", cap: "$0.3–0.7M", irr: "15–20%", risk: "HIGH" },
    ],
    t3: [
      { name: "BRIDGE Microfinance Institution", cap: "$5–15M", irr: "Variable", risk: "HIGH" },
      { name: "Fintech Equity Portfolio", cap: "$1–5M", irr: "Variable", risk: "HIGH" },
    ],
    activity: [
      { h: "Bank of Ghana Digital Credit Directive Expands", amt: "+Policy", sig: "Bullish", date: "Mar 2026" },
      { h: "MoMo Interoperability Live", amt: "+Access", sig: "Bullish", date: "Jan 2026" },
      { h: "SME Financing Gap Widens to $2.2B", amt: "$2.2B", sig: "Watch", date: "Feb 2026" },
      { h: "Ghana Ranked #1 on GSMA MoMo Index", amt: "95.06", sig: "Bullish", date: "Nov 2025" },
    ],
    cross: ["technology", "agriculture", "health", "infrastructure"],
  },
  {
    id: "technology",
    icon: Cpu,
    svgIcon: sectorSvgIcons[3],
    short: "Technology",
    full: "Technology & Innovation",
    tag: "Growth Engine",
    score: 89,
    capLow: 8,
    capHigh: 15,
    irrLow: 15,
    irrHigh: 30,
    totalV: 15,
    subSectors: [
      { name: "Platform", pct: 35, color: "#B8D935" },
      { name: "VC/Fund", pct: 28, color: "#8B5CF6" },
      { name: "Talent", pct: 18, color: "#2E5A4D" },
      { name: "FinTech", pct: 12, color: "#1B4D3E" },
      { name: "Other", pct: 7, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Kejetia Digital Platform", cap: "$3–5M", irr: "18–25%", risk: "MEDIUM" },
      { name: "BRIDGE Growth Fund", cap: "$5–10M", irr: "20–30%", risk: "HIGH" },
      { name: "Tech Talent Bridge Program", cap: "$0.3–0.6M", irr: "Break-even", risk: "LOW" },
      { name: "Fintech Portfolio", cap: "$2–4M", irr: "15–25%", risk: "HIGH" },
      { name: "Digital Apprenticeship", cap: "$0.2–0.4M", irr: "Social", risk: "LOW" },
    ],
    t2: [
      { name: "Market Platform Replication", cap: "$2–4M", irr: "15–22%", risk: "MEDIUM" },
      { name: "AgTech Investment Portfolio", cap: "$1.5–3M", irr: "20–28%", risk: "HIGH" },
      { name: "Rural Digital Access", cap: "$1–2M", irr: "Social", risk: "MEDIUM" },
    ],
    t3: [
      { name: "AI/ML Center of Excellence", cap: "$2–5M", irr: "Variable", risk: "HIGH" },
      { name: "Data Center Co-Investment", cap: "$3–8M", irr: "Variable", risk: "HIGH" },
    ],
    activity: [
      { h: "Kejetia Phase 2 — 3,000 New Vendors Onboarded", amt: "+3k", sig: "Bullish", date: "Mar 2026" },
      { h: "Ghana Joins Smart Africa Alliance", amt: "+Policy", sig: "Bullish", date: "Feb 2026" },
      { h: "Series A Desert — Only 2 Deals in 2025", amt: "-", sig: "Watch", date: "Jan 2026" },
      { h: "Ghana Leads West Africa Funding", amt: "+28%", sig: "Bullish", date: "Dec 2025" },
    ],
    cross: ["agriculture", "financial", "health", "education"],
  },
  {
    id: "energy",
    icon: BatteryCharging,
    svgIcon: sectorSvgIcons[9],
    short: "Energy",
    full: "Energy & Renewable Resources",
    tag: "Foundation",
    score: 88,
    capLow: 12,
    capHigh: 22,
    irrLow: 12,
    irrHigh: 22,
    totalV: 14,
    subSectors: [
      { name: "Solar", pct: 40, color: "#B8D935" },
      { name: "Clean Cooking", pct: 22, color: "#F59E0B" },
      { name: "Mini-Grid", pct: 18, color: "#2E5A4D" },
      { name: "Training", pct: 12, color: "#1B4D3E" },
      { name: "Other", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Ghana Solar Solutions Company", cap: "$3–6M", irr: "15–22%", risk: "MEDIUM" },
      { name: "Clean Cooking Distribution Network", cap: "$2–4M", irr: "12–18%", risk: "MEDIUM" },
      { name: "Solar Technician Training Academy", cap: "$0.5–1M", irr: "Social", risk: "LOW" },
      { name: "Solar-Powered Cold Storage", cap: "$1.5–3M", irr: "12–16%", risk: "MEDIUM" },
      { name: "Energy Efficiency Services", cap: "$0.5–1M", irr: "14–18%", risk: "LOW" },
    ],
    t2: [
      { name: "Community Mini-Grid Development", cap: "$2–5M", irr: "14–20%", risk: "MEDIUM" },
      { name: "Solar Equipment Import & Dist.", cap: "$1–2M", irr: "15–20%", risk: "MEDIUM" },
      { name: "Residential Solar Financing", cap: "$1–2M", irr: "12–18%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "EV Charging Infrastructure", cap: "$2–4M", irr: "12–18%", risk: "HIGH" },
      { name: "Battery Storage Systems", cap: "$2–5M", irr: "15–22%", risk: "HIGH" },
    ],
    activity: [
      { h: "Solar Park: 200MW to 1GW Expansion Confirmed", amt: "+800MW", sig: "Bullish", date: "Mar 2026" },
      { h: "$200M Clean Cooking Outcome Bond Open", amt: "$200M", sig: "Bullish", date: "Feb 2026" },
      { h: "Dumsor Returns — Business Losses Mount", amt: "-$900M", sig: "Watch", date: "Jan 2026" },
      { h: "Solar Costs Down 89% Since 2010", amt: "-89%", sig: "Bullish", date: "Dec 2025" },
    ],
    cross: ["agriculture", "manufacturing", "transportation", "infrastructure"],
  },
  {
    id: "infrastructure",
    icon: Blocks,
    svgIcon: sectorSvgIcons[0],
    short: "Infrastructure",
    full: "Infrastructure & Basic Services",
    tag: "Foundation",
    score: 87,
    capLow: 8,
    capHigh: 15,
    irrLow: 8,
    irrHigh: 20,
    totalV: 15,
    subSectors: [
      { name: "Water", pct: 30, color: "#B8D935" },
      { name: "Connectivity", pct: 28, color: "#2E5A4D" },
      { name: "Roads", pct: 22, color: "#1B4D3E" },
      { name: "Digital", pct: 12, color: "#60A5FA" },
      { name: "Sanitation", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Rural Connectivity Platform", cap: "$2–4M", irr: "12–18%", risk: "MEDIUM" },
      { name: "Water Systems Management Co.", cap: "$2–4M", irr: "10–15%", risk: "LOW" },
      { name: "Last-Mile Logistics Network", cap: "$1.5–3M", irr: "14–20%", risk: "MEDIUM" },
      { name: "Community Sanitation Services", cap: "$0.5–1.5M", irr: "8–12%", risk: "LOW" },
      { name: "Digital Infrastructure Co.", cap: "$2–4M", irr: "15–20%", risk: "MEDIUM" },
    ],
    t2: [
      { name: "Urban Infrastructure Fund", cap: "$3–6M", irr: "10–15%", risk: "MEDIUM" },
      { name: "Telecoms Tower Fund", cap: "$2–4M", irr: "14–18%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "Waste Management Company", cap: "$2–5M", irr: "12–18%", risk: "HIGH" },
      { name: "Smart City Infrastructure", cap: "$3–7M", irr: "Variable", risk: "HIGH" },
    ],
    activity: [
      { h: "GH₵18B+ Infra Allocation Locked", amt: "+Policy", sig: "Bullish", date: "Mar 2026" },
      { h: "Roads Authority Fast-Track Program Launched", amt: "+Ops", sig: "Bullish", date: "Feb 2026" },
      { h: "Water & Sanitation: Only 27% Coverage", amt: "-73%", sig: "Watch", date: "Jan 2026" },
    ],
    cross: ["transportation", "energy", "agriculture", "technology"],
  },
  {
    id: "health",
    icon: Cross,
    svgIcon: sectorSvgIcons[2],
    short: "Health Systems",
    full: "Health Systems & Wellbeing",
    tag: "Human Capital",
    score: 83,
    capLow: 8,
    capHigh: 16,
    irrLow: 8,
    irrHigh: 22,
    totalV: 15,
    subSectors: [
      { name: "Primary Care", pct: 32, color: "#B8D935" },
      { name: "Supply Chain", pct: 28, color: "#EF4444" },
      { name: "Digital Health", pct: 20, color: "#2E5A4D" },
      { name: "Diagnostics", pct: 12, color: "#1B4D3E" },
      { name: "Health Finance", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Community Health Worker Platform", cap: "$1.5–3M", irr: "Social", risk: "LOW" },
      { name: "Medical Supply Chain Co.", cap: "$2–4M", irr: "14–20%", risk: "MEDIUM" },
      { name: "Diagnostic Services Company", cap: "$1.5–3M", irr: "18–22%", risk: "MEDIUM" },
      { name: "NHIS Claims Processing Platform", cap: "$0.5–1M", irr: "12–16%", risk: "MEDIUM" },
    ],
    t2: [
      { name: "Telemedicine Network", cap: "$1–2.5M", irr: "12–18%", risk: "MEDIUM" },
      { name: "Health Finance Platform", cap: "$0.5–1.5M", irr: "10–15%", risk: "MEDIUM" },
      { name: "Pharmaceutical Distribution", cap: "$1.5–3M", irr: "14–20%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "Medical Training Institute", cap: "$2–4M", irr: "Social", risk: "MEDIUM" },
      { name: "HealthTech Investment Portfolio", cap: "$1–3M", irr: "18–25%", risk: "HIGH" },
    ],
    activity: [
      { h: "NHIA Expands Digital Claims Processing", amt: "+Access", sig: "Bullish", date: "Feb 2026" },
      { h: "GH₵8.2B Health Allocation — 12% YoY Increase", amt: "+12%", sig: "Bullish", date: "Mar 2026" },
      { h: "Workforce Gap: 40k More Health Workers Needed", amt: "-40k", sig: "Watch", date: "Jan 2026" },
    ],
    cross: ["technology", "financial", "manufacturing", "education"],
  },
  {
    id: "education",
    icon: GraduationCap,
    svgIcon: sectorSvgIcons[4],
    short: "Education",
    full: "Education & Skills",
    tag: "Human Capital",
    score: 85,
    capLow: 16.5,
    capHigh: 33.5,
    irrLow: 10,
    irrHigh: 25,
    totalV: 15,
    subSectors: [
      { name: "TVET", pct: 38, color: "#B8D935" },
      { name: "Scholarships", pct: 22, color: "#0EA5E9" },
      { name: "Bootcamps", pct: 18, color: "#2E5A4D" },
      { name: "EdTech", pct: 14, color: "#1B4D3E" },
      { name: "Other", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "TVET Partnership Program", cap: "$3–6M", irr: "Social+", risk: "MEDIUM" },
      { name: "Diaspora Scholarship Fund", cap: "$2–3M", irr: "Social+", risk: "LOW" },
      { name: "Skills Bootcamp Network", cap: "$1.5–3M", irr: "10–15%", risk: "LOW" },
      { name: "Diaspora Mentorship Platform", cap: "$0.5–1M", irr: "Social", risk: "LOW" },
      { name: "EdTech Investment Portfolio", cap: "$1.5–3M", irr: "20–28%", risk: "HIGH" },
    ],
    t2: [
      { name: "TVET Regional Expansion", cap: "$2–4M", irr: "Social+", risk: "MEDIUM" },
      { name: "Professional Dev. Academy", cap: "$1–2M", irr: "12–18%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "BRIDGE Training Center Kumasi", cap: "$2–4M", irr: "12–18%", risk: "MEDIUM" },
      { name: "Research Partnership", cap: "$0.5–1M", irr: "Social", risk: "LOW" },
    ],
    activity: [
      { h: "MoE TVET Overhaul — GH₵2B Committed", amt: "+Policy", sig: "Bullish", date: "Jan 2026" },
      { h: "Ghana Youth Unemployment Hits 13.4%", amt: "-", sig: "Watch", date: "Feb 2026" },
      { h: "Diaspora Fellowship: 120 Placements Confirmed", amt: "+120", sig: "Bullish", date: "Mar 2026" },
    ],
    cross: ["technology", "manufacturing", "agriculture", "health"],
  },
  {
    id: "housing",
    icon: Home,
    svgIcon: sectorSvgIcons[7],
    short: "Housing",
    full: "Housing & Real Estate",
    tag: "Foundation",
    score: 82,
    capLow: 15,
    capHigh: 25,
    irrLow: 10,
    irrHigh: 20,
    totalV: 11,
    subSectors: [
      { name: "Affordable Dev.", pct: 38, color: "#B8D935" },
      { name: "Construction Finance", pct: 28, color: "#14B8A6" },
      { name: "Diaspora Products", pct: 18, color: "#2E5A4D" },
      { name: "Rental Mgmt", pct: 10, color: "#1B4D3E" },
      { name: "Materials", pct: 6, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Affordable Housing Developer", cap: "$8–15M", irr: "14–20%", risk: "MEDIUM" },
      { name: "Construction Finance Platform", cap: "$4–8M", irr: "12–18%", risk: "MEDIUM" },
    ],
    t2: [
      { name: "Diaspora Housing Product", cap: "$2–4M", irr: "10–15%", risk: "LOW" },
      { name: "Rental Management Platform", cap: "$1–2M", irr: "12–18%", risk: "LOW" },
    ],
    t3: [{ name: "Building Materials Supply Co.", cap: "$2–4M", irr: "14–18%", risk: "MEDIUM" }],
    activity: [
      { h: "NHA PPP Framework Opens Private Entry", amt: "+Policy", sig: "Bullish", date: "Feb 2026" },
      { h: "Mortgage Penetration Still Below 2%", amt: "<2%", sig: "Watch", date: "Jan 2026" },
      { h: "Diaspora Housing Survey: 78% Interested", amt: "+Demand", sig: "Bullish", date: "Dec 2025" },
    ],
    cross: ["financial", "manufacturing", "infrastructure", "transportation"],
  },
  {
    id: "manufacturing",
    icon: Factory,
    svgIcon: sectorSvgIcons[10],
    short: "Manufacturing",
    full: "Manufacturing & Light Industry",
    tag: "Economic Engine",
    score: 81,
    capLow: 15,
    capHigh: 30,
    irrLow: 12,
    irrHigh: 22,
    totalV: 14,
    subSectors: [
      { name: "Agro-Processing", pct: 35, color: "#B8D935" },
      { name: "Packaging", pct: 22, color: "#6366F1" },
      { name: "Consumer Goods", pct: 20, color: "#2E5A4D" },
      { name: "Training", pct: 14, color: "#1B4D3E" },
      { name: "Export", pct: 9, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Agro-Processing Facility", cap: "$5–10M", irr: "15–20%", risk: "MEDIUM" },
      { name: "Packaging Solutions Company", cap: "$3–6M", irr: "14–18%", risk: "MEDIUM" },
      { name: "Industrial Training Centre", cap: "$1–2M", irr: "Social+", risk: "LOW" },
    ],
    t2: [
      { name: "Consumer Goods Manufacturer", cap: "$4–8M", irr: "14–20%", risk: "MEDIUM" },
      { name: "Pharmaceutical Manufacturing", cap: "$3–6M", irr: "15–22%", risk: "HIGH" },
      { name: "Textile & Garments Factory", cap: "$2–4M", irr: "12–18%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "Export Processing Facility", cap: "$5–10M", irr: "15–22%", risk: "HIGH" },
      { name: "Industrial Park Co-Investment", cap: "$5–10M", irr: "12–18%", risk: "HIGH" },
    ],
    activity: [
      { h: "GH₵5B Manufacturing Incentive Package Confirmed", amt: "+Policy", sig: "Bullish", date: "Mar 2026" },
      { h: "5-Year Tax Holiday for Domestic Manufacturers", amt: "+Tax", sig: "Bullish", date: "Mar 2026" },
      { h: "Import Bill Grows to $8.2B", amt: "$8.2B", sig: "Watch", date: "Feb 2026" },
    ],
    cross: ["agriculture", "energy", "transportation", "education"],
  },
  {
    id: "transportation",
    icon: Truck,
    svgIcon: sectorSvgIcons[11],
    short: "Transportation",
    full: "Transportation & Logistics",
    tag: "Foundation",
    score: 79,
    capLow: 10,
    capHigh: 22,
    irrLow: 10,
    irrHigh: 22,
    totalV: 14,
    subSectors: [
      { name: "Cold Chain", pct: 32, color: "#B8D935" },
      { name: "Last-Mile", pct: 28, color: "#64748B" },
      { name: "Fleet", pct: 20, color: "#2E5A4D" },
      { name: "Port & Warehouse", pct: 13, color: "#1B4D3E" },
      { name: "Other", pct: 7, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Cold Chain Ghana", cap: "$3–6M", irr: "16–22%", risk: "MEDIUM" },
      { name: "Ghana Last Mile Delivery Co.", cap: "$2–4M", irr: "14–20%", risk: "MEDIUM" },
      { name: "Fleet Management Services", cap: "$1.5–3M", irr: "14–18%", risk: "LOW" },
      { name: "Logistics Technology Platform", cap: "$1–2M", irr: "20–25%", risk: "MEDIUM" },
      { name: "Logistics Training Academy", cap: "$0.5–1M", irr: "Social+", risk: "LOW" },
    ],
    t2: [
      { name: "Pharma Cold Chain Services", cap: "$1.5–3M", irr: "16–22%", risk: "MEDIUM" },
      { name: "Agricultural Aggregation Transport", cap: "$2–4M", irr: "14–18%", risk: "MEDIUM" },
      { name: "Warehousing & Distribution", cap: "$2–4M", irr: "12–16%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "Inland Port Services", cap: "$3–6M", irr: "12–18%", risk: "HIGH" },
      { name: "Rail Logistics Integration", cap: "$2–5M", irr: "12–16%", risk: "HIGH" },
    ],
    activity: [
      { h: "Tema Port Phase 2 — $1.5B Investment Confirmed", amt: "$1.5B", sig: "Bullish", date: "Feb 2026" },
      { h: "Connect24: 18% Logistics Cost Reduction Target", amt: "-18%", sig: "Bullish", date: "Jan 2026" },
      { h: "Cold Chain Revenue Potential: $900M/yr", amt: "$900M", sig: "Bullish", date: "Dec 2025" },
    ],
    cross: ["agriculture", "energy", "manufacturing", "infrastructure"],
  },
  {
    id: "tourism",
    icon: Luggage,
    svgIcon: sectorSvgIcons[8],
    short: "Tourism",
    full: "Tourism & Hospitality",
    tag: "Growth Engine",
    score: 76,
    capLow: 10,
    capHigh: 18,
    irrLow: 10,
    irrHigh: 22,
    totalV: 13,
    subSectors: [
      { name: "Heritage", pct: 32, color: "#B8D935" },
      { name: "Hospitality", pct: 25, color: "#EC4899" },
      { name: "Eco-Tourism", pct: 22, color: "#2E5A4D" },
      { name: "Cultural", pct: 14, color: "#1B4D3E" },
      { name: "Other", pct: 7, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Heritage Tourism Network", cap: "$3–6M", irr: "14–20%", risk: "MEDIUM" },
      { name: "Hospitality Training Academy", cap: "$1.5–3M", irr: "Social+", risk: "LOW" },
    ],
    t2: [
      { name: "Eco-Tourism Development Fund", cap: "$2–4M", irr: "12–18%", risk: "MEDIUM" },
      { name: "Cultural Experience Platform", cap: "$1–2M", irr: "15–22%", risk: "MEDIUM" },
    ],
    t3: [{ name: "Destination Development Company", cap: "$3–6M", irr: "12–18%", risk: "HIGH" }],
    activity: [
      { h: "Ghana Tourism Authority New Destination Brand", amt: "+Brand", sig: "Bullish", date: "Jan 2026" },
      { h: "Accra MICE Tourism Up 35%", amt: "+35%", sig: "Bullish", date: "Feb 2026" },
      { h: "Hotel Occupancy Still 58% National Average", amt: "58%", sig: "Watch", date: "Dec 2025" },
    ],
    cross: ["creative", "housing", "transportation", "infrastructure"],
  },
  {
    id: "creative",
    icon: Camera,
    svgIcon: sectorSvgIcons[6],
    short: "Creative Industries",
    full: "Sports, Entertainment & Creative",
    tag: "Growth Engine",
    score: 78,
    capLow: 10,
    capHigh: 20.5,
    irrLow: 10,
    irrHigh: 28,
    totalV: 14,
    subSectors: [
      { name: "Content", pct: 30, color: "#B8D935" },
      { name: "Talent Dev.", pct: 25, color: "#F97316" },
      { name: "IP Monetisation", pct: 22, color: "#2E5A4D" },
      { name: "Sports", pct: 15, color: "#1B4D3E" },
      { name: "Other", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Content Production Studio", cap: "$2–4M", irr: "15–22%", risk: "MEDIUM" },
      { name: "Talent Development Platform", cap: "$1.5–3M", irr: "Social+", risk: "LOW" },
    ],
    t2: [
      { name: "IP Monetisation Platform", cap: "$1.5–3M", irr: "20–28%", risk: "HIGH" },
      { name: "Sports Infrastructure Fund", cap: "$3–6M", irr: "10–15%", risk: "MEDIUM" },
    ],
    t3: [{ name: "Creative Hub Network", cap: "$2–5M", irr: "12–18%", risk: "MEDIUM" }],
    activity: [
      { h: "Ghana Music Awards — 40% Viewership Growth", amt: "+40%", sig: "Bullish", date: "Jan 2026" },
      { h: "Afrobeats Streams Exceed 45M Monthly Listeners", amt: "45M", sig: "Bullish", date: "Feb 2026" },
      { h: "IP Piracy Costs Creative Sector $400M+", amt: "-$400M", sig: "Watch", date: "Dec 2025" },
    ],
    cross: ["technology", "tourism", "education", "infrastructure"],
  },
];

const sigCol = (s) => (s === "Bullish" ? C.green : s === "Bearish" ? C.red : C.yellow);
const sigBg = (s) => (s === "Bullish" ? "#DCFCE7" : s === "Bearish" ? "#FEE2E2" : "#FEF9C3");
const scoreToSig = (sc) => (sc >= 82 ? "Bullish" : sc >= 70 ? "Watch" : "Bearish");
const totalCapAll = () => SECTORS.reduce((a, s) => a + (s.capLow + s.capHigh) / 2, 0);
const compute = (s) => {
  const sent = Math.min(Math.round(s.score * 0.75 + s.irrHigh * 0.25), 96);
  const inflow = Math.min(95, Math.round(50 + (s.score - 80) * 1.2));
  return { sentimentScore: sent, inflow, outflow: 100 - inflow };
};
const genTrend = (s, filter) => {
  const labels =
    filter === "7D"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : filter === "30D"
        ? ["Wk1", "Wk2", "Wk3", "Wk4"]
        : ["Jan", "Feb", "Mar"];
  return labels.map((label, i) => ({
    label,
    value: Math.round(s.score * 1.1 * (0.88 + Math.sin(i * 0.9 + s.score * 0.05) * 0.12 + i * 0.015)),
  }));
};
const genVolume = (s) =>
  ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m, i) => ({
    month: m,
    deployed: Math.round((s.score * 0.9 + i * 8) * (0.8 + Math.sin(i) * 0.15)),
    target: Math.round(s.score * 1.2 + i * 6),
  }));

function Card({ children, style: ex = {} }) {
  const [h, sH] = useState(false);
  return (
    <div
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        boxShadow: h ? "0 4px 16px rgba(0,0,0,0.09)" : "0 1px 4px rgba(0,0,0,0.05)",
        transform: h ? "translateY(-1px)" : "none",
        transition: "all .2s ease",
        overflow: "hidden",
        ...ex,
      }}
    >
      {children}
    </div>
  );
}
function Pill({ children, active, onClick, col = "#1B4D3E" }: { children: any; active: any; onClick: any; col?: any }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "3px 10px",
        borderRadius: 14,
        border: `1px solid ${active ? col || C.accent : "#E5E7EB"}`,
        background: active ? (col ? col + "22" : C.accentBg) : "transparent",
        fontSize: 10,
        fontWeight: active ? 700 : 500,
        color: active ? col || C.primary : C.muted,
        cursor: "pointer",
        fontFamily: "Inter,sans-serif",
        whiteSpace: "nowrap",
        transition: "all .15s",
      }}
    >
      {children}
    </button>
  );
}
const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#111827",
        color: "#fff",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 11,
        fontFamily: "Inter,sans-serif",
      }}
    >
      <div style={{ color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, background: p.stroke || p.fill }} />
          <span>
            {p.name || "Value"}: <strong>{p.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};

function BridgeLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3434.33 932.3"
      style={{ width: 104, height: 28, display: "block" }}
    >
      <defs>
        <style>{`.sl1{stroke:#fff;stroke-width:80px;fill:none;stroke-miterlimit:10;}.sl2{fill:#B8D935;stroke:#1b4d3e;stroke-miterlimit:10;}.sl3{fill:none;stroke:#231f20;stroke-width:5px;stroke-miterlimit:10;}.sl4{fill:#fff;}.sl5{fill:#fff;stroke:#000;stroke-width:.5px;stroke-miterlimit:10;}`}</style>
      </defs>
      <path
        className="sl4"
        d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
      />
      <path
        className="sl5"
        d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1Z"
      />
      <path
        className="sl5"
        d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect className="sl2" x="1427.38" y="17.35" width="205.2" height="145" />
      <rect className="sl4" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        className="sl4"
        d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
      />
      <rect className="sl4" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
      <rect className="sl2" x="3083.41" y="339.47" width="175.12" height="257.67" />
      <rect className="sl2" x="3083.41" y="654.42" width="175.12" height="257.67" />
      <circle className="sl3" cx="3385.56" cy="866.94" r="46.27" />
      <path
        className="sl4"
        d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81c3.65,0,6.41.75,8.3,2.26h0v-.13Z"
      />
      <rect className="sl1" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55" />
      <polygon className="sl2" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13" />
      <path
        style={{ fill: "#74914a" }}
        d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14Z"
      />
      <path
        className="sl2"
        d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37Z"
      />
    </svg>
  );
}

const SIDE_NAV = [
  { id: "dashboard", label: "Dashboard", icon: (c) => <LayoutGrid size={16} color={c} /> },
  { id: "overview", label: "Market Overview", icon: (c) => <Activity size={16} color={c} /> },
  { id: "analytics", label: "Analytics", icon: (c) => <BarChart3 size={16} color={c} /> },
  { id: "watchlist", label: "Watchlist", icon: (c) => <Eye size={16} color={c} /> },
  { id: "reports", label: "Reports", icon: (c) => <FileBarChart size={16} color={c} /> },
  { id: "resources", label: "Resources", icon: (c) => <Book size={16} color={c} /> },
  { id: "settings", label: "Settings", icon: (c) => <Settings size={16} color={c} /> },
];

function Sidebar({ collapsed, setCollapsed, activeSector, setActiveSector }) {
  const [activePage, setActivePage] = useState("overview");
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
      {/* ── Logo zone ── */}
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

      {/* ── Nav zone ── */}
      <div style={{ padding: "10px 8px", flexShrink: 0 }}>
        {SIDE_NAV.map((n) => {
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

      {/* ── Sector zone ── */}
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
        {sorted.map((sec) => {
          const act = activeSector?.id === sec.id;
          return (
            <div
              key={sec.id}
              onClick={() => setActiveSector(sec)}
              title={collapsed ? sec.short : undefined}
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
                  {sec.svgIcon(act ? C.accent : "rgba(255,255,255,0.35)", 14)}
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    {sec.svgIcon(act ? C.accent : "rgba(255,255,255,0.3)", 12)}
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: act ? 600 : 400,
                        color: act ? C.white : "rgba(255,255,255,0.45)",
                        fontFamily: "DM Sans,sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {sec.short}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      fontFamily: "Inter,sans-serif",
                      color: act ? C.accent : sec.score >= 88 ? "rgba(184,217,53,0.6)" : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {sec.score}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Return to Website ── */}
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

      {/* ── Upgrade to Pro ── */}
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

function PortfolioSnapshot({ s }) {
  const SIcon = s.icon;
  const totalV = (s.t1?.length || 0) + (s.t2?.length || 0) + (s.t3?.length || 0);
  const signals = s.activity.filter((a) => a.sig === "Bullish").length * 14 + s.activity.length * 6;
  const rows = [
    {
      label: "Ventures Tracked",
      value: `${totalV} / ${s.totalV}`,
      sub: "identified",
      Icon: Target,
      col: C.teal,
      bg: "rgba(46,90,77,0.08)",
    },
    {
      label: "Active Signals",
      value: `${signals}`,
      sub: "intelligence items",
      Icon: Activity,
      col: C.accent,
      bg: C.accentBg,
    },
    {
      label: "BRIDGE Score",
      value: `${s.score} / 100`,
      sub: scoreToSig(s.score),
      Icon: BarChart3,
      col: C.primary,
      bg: "rgba(27,77,62,0.07)",
    },
  ];
  return (
    <Card style={{ padding: 0, height: "100%" }}>
      <div style={{ padding: "13px 16px", borderBottom: "1px solid #F3F4F6" }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: C.muted,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            fontFamily: "Inter,sans-serif",
          }}
        >
          Sector Portfolio Snapshot
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.mid, fontFamily: "DM Sans,sans-serif", marginTop: 2 }}>
          {s.full}
        </div>
      </div>
      <div style={{ display: "flex", height: "calc(100% - 58px)" }}>
        <div
          style={{
            flex: 1,
            padding: "8px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {rows.map((row, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: 1, background: "#F3F4F6" }} />}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 3, height: 36, borderRadius: 2, background: row.col, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif", marginBottom: 2 }}>
                      {row.label}
                    </div>
                    <div
                      style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: "-.5px", lineHeight: 1 }}
                    >
                      {row.value}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                      {row.sub}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: row.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <row.Icon size={13} color={row.col} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            width: 108,
            background: `linear-gradient(160deg,${C.primary} 0%,#0D3028 100%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 10px",
            gap: 10,
            flexShrink: 0,
            borderRadius: "0 12px 12px 0",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SIcon size={17} color={C.accent} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>
              ${s.capLow}–{s.capHigh}M
            </div>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "Inter,sans-serif",
                marginTop: 4,
              }}
            >
              Capital Range
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              background: "rgba(184,217,53,0.18)",
              border: "1px solid rgba(184,217,53,0.35)",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: C.accent, fontFamily: "Inter,sans-serif" }}>
              {s.irrLow}–{s.irrHigh}% IRR
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function PerformanceTrend({ s }) {
  const [filter, setF] = useState("7D");
  const data = genTrend(s, filter);
  return (
    <Card style={{ padding: 0, height: "100%" }}>
      <div
        style={{
          padding: "12px 16px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #F3F4F6",
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{s.short} — Opportunity Index</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
            Sector momentum · BRIDGE scoring
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
          {["7D", "30D", "90D"].map((v) => (
            <button
              key={v}
              onClick={() => setF(v)}
              style={{
                padding: "3px 8px",
                borderRadius: 5,
                border: "none",
                background: filter === v ? "#fff" : "transparent",
                fontSize: 10,
                fontWeight: 600,
                color: filter === v ? C.primary : C.muted,
                cursor: "pointer",
                boxShadow: filter === v ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "6px 6px 10px", height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.accent} stopOpacity={0.25} />
                <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
            <Tooltip content={<ChartTip />} />
            <ReferenceLine y={s.score} stroke={C.teal} strokeDasharray="4 4" strokeWidth={1} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={C.accent}
              strokeWidth={2.5}
              fill="url(#ag)"
              dot={false}
              activeDot={{ r: 4, fill: C.accent, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function ScaleCard({ s }) {
  const c = compute(s);
  const total = Math.round(totalCapAll());
  const tiers = [
    { label: "Tier I", count: SECTORS.filter((x) => x.score >= 88).length, col: C.accent, bg: C.accentBg },
    {
      label: "Strong",
      count: SECTORS.filter((x) => x.score >= 80 && x.score < 88).length,
      col: C.teal,
      bg: "rgba(46,90,77,0.1)",
    },
    { label: "Develop", count: SECTORS.filter((x) => x.score < 80).length, col: C.muted, bg: "#F3F4F6" },
  ];
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Header */}
      <div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: C.muted,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            fontFamily: "Inter,sans-serif",
            marginBottom: 6,
          }}
        >
          Portfolio-Wide Capital
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.dark, letterSpacing: "-1.5px", lineHeight: 1 }}>
          ${total}M
        </div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 3 }}>
          Across 12 sectors
        </div>
      </div>
      {/* Pipeline bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: C.mid, fontFamily: "Inter,sans-serif" }}>
            Pipeline Readiness
          </span>
          <span style={{ fontSize: 11, fontWeight: 800, color: C.primary, fontFamily: "Inter,sans-serif" }}>
            {c.inflow}%
          </span>
        </div>
        <div style={{ height: 10, borderRadius: 6, background: "#EEF0EC", overflow: "hidden", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: `${c.inflow}%`,
              background: `linear-gradient(90deg,${C.primary},${C.accent})`,
              borderRadius: 6,
              transition: "width 0.6s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
            {c.inflow}% Active
          </span>
          <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{c.outflow}% Pending</span>
        </div>
      </div>
      {/* Score distribution */}
      <div style={{ background: "#F9FAFB", borderRadius: 10, padding: "11px 12px", border: "1px solid #F0F0F0" }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: C.muted,
            fontFamily: "Inter,sans-serif",
            marginBottom: 10,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Score Distribution
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {tiers.map((t) => (
            <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: t.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{ fontSize: 12, fontWeight: 800, color: t.col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
                >
                  {t.count}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: C.mid, fontFamily: "Inter,sans-serif" }}>
                    {t.label}
                  </span>
                  <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                    {t.count} sector{t.count !== 1 ? "s" : ""}
                  </span>
                </div>
                <div style={{ height: 3, background: "#E9EAEC", borderRadius: 2, overflow: "hidden" }}>
                  <div
                    style={{ width: `${(t.count / 12) * 100}%`, height: "100%", background: t.col, borderRadius: 2 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer trend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: "auto",
          padding: "7px 10px",
          borderRadius: 7,
          background: "#F0FAF0",
          border: "1px solid #D1FAE5",
        }}
      >
        <TrendingUp size={13} color={C.green} />
        <span style={{ fontSize: 11, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
          +{Math.round((s.score - 75) * 0.4)}% vs baseline
        </span>
        <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>this sector</span>
      </div>
    </Card>
  );
}

function IntelligenceTicker({ s }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const vis = 3;
  const conf = Math.round(SECTORS.reduce((a, sec) => a + sec.score, 0) / SECTORS.length);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % (SECTORS.length - vis + 1)), 2800);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <Card style={{ padding: "11px 14px", background: "#FAFDF5", border: "1px solid #D1FAE5" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: C.accentBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={13} color={C.primary} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>BRIDGE Intelligence</div>
            <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>Live signals</div>
          </div>
        </div>
        <div
          style={{ flex: 1, overflow: "hidden" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div style={{ display: "flex", gap: 8 }}>
            {SECTORS.slice(idx, idx + vis).map((sec) => {
              const Icon = sec.icon,
                sig = scoreToSig(sec.score);
              return (
                <div
                  key={sec.id}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 10px",
                    background: "#fff",
                    borderRadius: 10,
                    border: `1px solid ${sigBg(sig)}`,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      background: sigBg(sig),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={11} color={sigCol(sig)} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: C.dark,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {sec.short}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 1 }}>
                      {sig === "Bullish" ? (
                        <TrendingUp size={9} color={C.green} />
                      ) : (
                        <Minus size={9} color={C.yellow} />
                      )}
                      <span
                        style={{ fontSize: 9, fontWeight: 600, color: sigCol(sig), fontFamily: "Inter,sans-serif" }}
                      >
                        {sig}
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: C.primary,
                      fontFamily: "Inter,sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    {sec.score}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div
            style={{
              padding: "5px 10px",
              borderRadius: 8,
              background: C.accentBg,
              border: `1px solid ${C.accent}33`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
              Confidence
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.primary, lineHeight: 1 }}>{conf}</div>
            <div style={{ fontSize: 9, color: C.teal, fontFamily: "Inter,sans-serif" }}>Bullish</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              style={{
                width: 22,
                height: 22,
                borderRadius: 5,
                border: "1px solid #E5E7EB",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={11} color={C.muted} />
            </button>
            <button
              onClick={() => setIdx((i) => Math.min(SECTORS.length - vis, i + 1))}
              style={{
                width: 22,
                height: 22,
                borderRadius: 5,
                border: "1px solid #E5E7EB",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRight size={11} color={C.muted} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function DeploymentChart({ s }) {
  const data = genVolume(s);
  const last = data[data.length - 1].deployed,
    prev = data[data.length - 2].deployed;
  const chg = Math.round(((last - prev) / prev) * 100);
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Capital Deployment</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
            Pipeline vs target · 6 months
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 9px",
            borderRadius: 7,
            background: chg >= 0 ? "#DCFCE7" : "#FEE2E2",
            border: `1px solid ${chg >= 0 ? "#BBF7D0" : "#FECACA"}`,
          }}
        >
          {chg >= 0 ? <TrendingUp size={11} color={C.green} /> : <TrendingDown size={11} color={C.red} />}
          <span
            style={{ fontSize: 11, fontWeight: 700, color: chg >= 0 ? C.green : C.red, fontFamily: "Inter,sans-serif" }}
          >
            {chg >= 0 ? "+" : ""}
            {chg}%
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: C.dark,
          letterSpacing: "-.8px",
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {last} <span style={{ fontSize: 12, fontWeight: 400, color: C.muted, letterSpacing: 0 }}>units active</span>
      </div>
      {/* Legend */}
      <div style={{ display: "flex", gap: 14, marginBottom: 8 }}>
        {[
          ["Deployed", C.accent],
          [`Target`, `${C.teal}66`],
        ].map(([l, col]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: col }} />
            <span style={{ fontSize: 9, fontWeight: 600, color: C.muted, fontFamily: "Inter,sans-serif" }}>{l}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RBarChart data={data} barSize={13} barGap={3} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="deployed" fill={C.accent} radius={[4, 4, 0, 0]} name="Deployed" />
            <Bar dataKey="target" fill={`${C.teal}55`} radius={[4, 4, 0, 0]} name="Target" />
          </RBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function SubSectors({ s }) {
  const data = s.subSectors.map((ss) => ({ name: ss.name.split(" ")[0], value: ss.pct, full: ss.name }));
  const max = Math.max(...data.map((d) => d.value));
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sub-sector Activity</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
            {s.subSectors.filter((ss) => ss.pct >= 18).length} active sub-sectors
          </div>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: 6,
            background: C.accentBg,
            color: C.primary,
            fontFamily: "Inter,sans-serif",
            border: `1px solid rgba(184,217,53,0.3)`,
          }}
        >
          +{Math.round(s.score * 0.4)}%
        </span>
      </div>
      <div style={{ flex: 1, minHeight: 0, marginBottom: 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RBarChart data={data} margin={{ top: 16, right: 4, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="value" radius={[5, 5, 0, 0]} name="Share %">
              {data.map((d, i) => (
                <Cell key={i} fill={d.value === max ? C.accent : `${C.accent}77`} />
              ))}
            </Bar>
          </RBarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {s.subSectors.map((ss, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 8px",
              borderRadius: 20,
              background: "#F3F5F2",
              border: "1px solid #E5E7EB",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: i === 0 ? C.accent : C.teal,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 9, fontWeight: 600, color: C.mid, fontFamily: "Inter,sans-serif" }}>
              {ss.name.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Sentiment({ s }) {
  const c = compute(s);
  const seg = 22,
    filled = Math.round((c.sentimentScore / 100) * seg);
  const label = c.sentimentScore >= 70 ? "Bullish" : c.sentimentScore >= 45 ? "Neutral" : "Cautious";
  const col = label === "Bullish" ? C.green : label === "Neutral" ? C.yellow : C.red;
  const [time, setT] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const bars = [
    { label: "Activity Signals", val: Math.min(c.sentimentScore + 5, 98), col: C.green },
    { label: "Policy Alignment", val: s.score, col: C.accent },
    { label: "Capital Readiness", val: c.inflow, col: C.teal },
  ];
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Market Sentiment</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
          Currently <span style={{ fontWeight: 700, color: col }}>{label}</span>
        </div>
      </div>
      {/* Segment bar */}
      <div style={{ display: "flex", gap: 2.5, justifyContent: "center", padding: "4px 0" }}>
        {Array.from({ length: seg }, (_, i) => (
          <div
            key={i}
            style={{
              width: 7,
              height: 30,
              borderRadius: 3,
              background: i < filled ? col : "#EAECEA",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      {/* Big score */}
      <div style={{ textAlign: "center", lineHeight: 1 }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: C.dark, letterSpacing: "-2px" }}>{c.sentimentScore}%</div>
        <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 3 }}>
          Positive Sentiment Score
        </div>
      </div>
      {/* Progress bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {bars.map(({ label: l, val: v, col: bc }) => (
          <div key={l}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 500, color: C.mid, fontFamily: "Inter,sans-serif" }}>{l}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>{v}%</span>
            </div>
            <div style={{ height: 6, background: "#F0F0EE", borderRadius: 3, overflow: "hidden" }}>
              <div
                style={{
                  width: `${v}%`,
                  height: "100%",
                  background: bc,
                  borderRadius: 3,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: "auto" }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.green,
            boxShadow: `0 0 0 3px rgba(22,163,74,0.15)`,
          }}
        />
        <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>
          Updated {time.toLocaleTimeString()}
        </span>
      </div>
    </Card>
  );
}

function ComparisonTable({ s, setS }) {
  const [sort, setSort] = useState({ col: "score", dir: "desc" });
  const [filter, setFilter] = useState("all");
  const sorted = [...SECTORS]
    .filter((sec) => (filter === "all" ? true : filter === "bullish" ? sec.score >= 82 : sec.score < 80))
    .sort((a, b) => (sort.dir === "desc" ? b[sort.col] - a[sort.col] : a[sort.col] - b[sort.col]));
  const sortBy = (col) => setSort((s) => ({ col, dir: s.col === col && s.dir === "desc" ? "asc" : "desc" }));
  return (
    <Card style={{ padding: 0, height: "100%" }}>
      <div style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>All Sectors Comparison</div>
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
              {sorted.length} sectors · BRIDGE portfolio
            </div>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              borderRadius: 7,
              border: "1px solid #E5E7EB",
              background: "#fff",
              fontSize: 10,
              color: C.muted,
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            <Download size={11} />
            Export
          </button>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {[
            ["all", "All"],
            ["bullish", "Bullish"],
            ["developing", "Developing"],
          ].map(([v, l]) => (
            <Pill key={v} active={filter === v} onClick={() => setFilter(v)}>
              {l}
            </Pill>
          ))}
        </div>
      </div>
      <div style={{ overflowY: "auto", maxHeight: 290 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB", position: "sticky", top: 0 }}>
              {[
                ["Sector", "short"],
                ["Capital", "capHigh"],
                ["IRR", "irrHigh"],
                ["Score", "score"],
                ["Signal", null],
              ].map(([l, col]) => (
                <th
                  key={l}
                  onClick={col ? () => sortBy(col) : undefined}
                  style={{
                    padding: "7px 10px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    textAlign: "left",
                    cursor: col ? "pointer" : "default",
                    whiteSpace: "nowrap",
                  }}
                >
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((sec) => {
              const Icon = sec.icon,
                act = sec.id === s.id,
                sig = scoreToSig(sec.score);
              return (
                <tr
                  key={sec.id}
                  onClick={() => setS(sec)}
                  style={{
                    borderBottom: `1px solid ${act ? "#D1FAE5" : "#F3F4F6"}`,
                    cursor: "pointer",
                    background: act ? `${C.accent}12` : "transparent",
                    transition: "background .1s",
                  }}
                  onMouseEnter={(e) => {
                    if (!act) e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    if (!act) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <td style={{ padding: "7px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 5,
                          background: act ? C.accentBg : "#F3F5F2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={11} color={act ? C.primary : C.teal} />
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: act ? 700 : 500,
                          color: C.dark,
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {sec.short}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "7px 10px" }}>
                    <span style={{ fontSize: 11, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                      ${sec.capLow}–{sec.capHigh}M
                    </span>
                  </td>
                  <td style={{ padding: "7px 10px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
                      {sec.irrLow}–{sec.irrHigh}%
                    </span>
                  </td>
                  <td style={{ padding: "7px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 40, height: 4, background: "#F3F4F6", borderRadius: 2, overflow: "hidden" }}>
                        <div
                          style={{ width: `${sec.score}%`, height: "100%", background: C.accent, borderRadius: 2 }}
                        />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
                        {sec.score}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "7px 10px" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: sigCol(sig) }} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function VenturesFeed({ s }) {
  const [tier, setTier] = useState("t1");
  const ventures = s[tier] || [];
  const SIcon = s.icon;
  const tc =
    tier === "t1"
      ? { bg: C.accentBg, col: C.primary, label: "Tier I" }
      : tier === "t2"
        ? { bg: "rgba(46,90,77,0.1)", col: C.teal, label: "Tier II" }
        : { bg: "rgba(107,114,128,0.08)", col: C.muted, label: "Tier III" };
  return (
    <Card style={{ padding: "13px 14px", height: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Priority Ventures</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
            {ventures.length} ventures · {s.short}
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
          {[
            ["t1", "T-I"],
            ["t2", "T-II"],
            ["t3", "T-III"],
          ].map(([v, l]) => (
            <button
              key={v}
              onClick={() => setTier(v)}
              style={{
                padding: "3px 7px",
                borderRadius: 5,
                border: "none",
                background: tier === v ? "#fff" : "transparent",
                fontSize: 9,
                fontWeight: 700,
                color: tier === v ? C.primary : C.muted,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
                boxShadow: tier === v ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
        {ventures.map((v, i) => {
          const rc = v.risk === "LOW" ? C.green : v.risk === "MEDIUM" ? C.yellow : C.red;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 8px",
                borderRadius: 8,
                border: "1px solid #F3F4F6",
                cursor: "pointer",
                transition: "all .1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F9FAFB";
                e.currentTarget.style.borderColor = "#E5E7EB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "#F3F4F6";
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  background: "#F3F5F2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <SIcon size={11} color={C.teal} strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.dark,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {v.name}
                </div>
                <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "1px 4px",
                      borderRadius: 3,
                      background: tc.bg,
                      color: tc.col,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {tc.label}
                  </span>
                  <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{v.cap}</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
                  {v.irr}
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: rc, fontFamily: "Inter,sans-serif" }}>{v.risk}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function SignalFeed({ s }) {
  const [sigFilter, setSF] = useState("all");
  const [query, setQ] = useState("");
  const all = [...s.activity, ...SECTORS.filter((sec) => sec.id !== s.id).flatMap((sec) => sec.activity.slice(0, 1))];
  const filtered = all
    .filter((a) => sigFilter === "all" || a.sig === sigFilter)
    .filter((a) => !query || a.h.toLowerCase().includes(query.toLowerCase()));
  return (
    <Card style={{ padding: 0 }}>
      <div style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Intelligence Feed</div>
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
              {filtered.length} signals · synced with dashboard
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
            <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>Live</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: 7,
              padding: "5px 10px",
            }}
          >
            <Search size={11} color={C.muted} />
            <input
              value={query}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search signals…"
              style={{
                background: "none",
                border: "none",
                outline: "none",
                fontSize: 11,
                color: C.mid,
                fontFamily: "Inter,sans-serif",
                width: "100%",
              }}
            />
          </div>
          {[
            ["all", "All"],
            ["Bullish", "Bullish"],
            ["Watch", "Watch"],
          ].map(([v, l]) => (
            <Pill
              key={v}
              active={sigFilter === v}
              col={v === "Bullish" ? C.green : v === "Watch" ? C.yellow : undefined}
              onClick={() => setSF(v)}
            >
              {l}
            </Pill>
          ))}
        </div>
      </div>
      <div>
        {filtered.map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 11,
              padding: "10px 14px",
              borderBottom: "1px solid #F9FAFB",
              cursor: "pointer",
              transition: "background .1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAFA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "#F3F5F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 14,
                color: sigCol(a.sig),
              }}
            >
              {a.sig === "Bullish" ? "↑" : a.sig === "Bearish" ? "↓" : "→"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.dark, lineHeight: 1.35, marginBottom: 3 }}>
                {a.h}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: sigCol(a.sig), fontFamily: "Inter,sans-serif" }}>
                  {a.sig}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 11,
                    fontWeight: 700,
                    color: sigCol(a.sig),
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {a.amt}
                </span>
              </div>
            </div>
            <div style={{ alignSelf: "center", flexShrink: 0 }}>
              <div style={{ padding: "2px 7px", borderRadius: 5, background: "#F3F5F2", border: "1px solid #E5E7EB" }}>
                <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                  {a.sig === "Bullish" ? "Opportunity" : a.sig === "Bearish" ? "Alert" : "Monitoring"}
                </span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              color: C.muted,
              fontSize: 12,
              fontFamily: "Inter,sans-serif",
            }}
          >
            No signals match your filter.
          </div>
        )}
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   MOBILE — COLOR PALETTE
   ───────────────────────────────────────────── */
const M = {
  bg: "#080E08", // deepest background
  card: "#0D1810", // card surface
  card2: "#101D12", // slightly lifted card
  border: "rgba(255,255,255,0.07)",
  borderG: "rgba(80,160,80,0.18)", // subtle green border
  accent: "#B8D935", // lime
  accentDim: "rgba(184,217,53,0.12)",
  accentBorder: "rgba(184,217,53,0.25)",
  green: "#4ADE80", // bullish green
  greenDim: "rgba(74,222,128,0.12)",
  amber: "#F59E0B", // watch amber
  amberDim: "rgba(245,158,11,0.12)",
  red: "#EF4444", // bearish red
  redDim: "rgba(239,68,68,0.12)",
  white: "rgba(255,255,255,0.88)",
  mid: "rgba(255,255,255,0.5)",
  muted: "rgba(255,255,255,0.28)",
  faint: "rgba(255,255,255,0.07)",
};

const msigCol = (sig) => (sig === "Bullish" ? M.green : sig === "Bearish" ? M.red : M.amber);
const msigDim = (sig) => (sig === "Bullish" ? M.greenDim : sig === "Bearish" ? M.redDim : M.amberDim);

/* ── Shared mobile primitives ── */
function MCard({ children, style = {} }) {
  return (
    <div
      style={{ borderRadius: 16, background: M.card, border: `1px solid ${M.borderG}`, overflow: "hidden", ...style }}
    >
      {children}
    </div>
  );
}

function MCardHeader({ icon: Icon, iconColor = M.accent, title, badge, badgeStyle = {}, onToggle, open }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "13px 14px",
        cursor: onToggle ? "pointer" : "default",
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: M.faint,
          border: `1px solid ${M.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={13} color={iconColor} />
      </div>
      <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: M.white }}>{title}</span>
      {badge != null && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "3px 9px",
            borderRadius: 20,
            background: M.accentDim,
            border: `1px solid ${M.accentBorder}`,
            flexShrink: 0,
            ...badgeStyle,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: M.accent,
              fontFamily: "Inter,sans-serif",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {badge}
          </span>
        </div>
      )}
      {onToggle && (
        <ChevronDown
          size={14}
          color={M.muted}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
        />
      )}
    </div>
  );
}

function MSection({ icon, iconColor, title, badge, badgeStyle, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <MCard style={{ marginBottom: 10 }}>
      <MCardHeader
        icon={icon}
        iconColor={iconColor}
        title={title}
        badge={badge}
        badgeStyle={badgeStyle}
        onToggle={() => setOpen((o) => !o)}
        open={open}
      />
      {open && <div style={{ borderTop: `1px solid ${M.border}` }}>{children}</div>}
    </MCard>
  );
}

/* ── Mobile Logo SVG (104×28, white wordmark) ── */
function MobileLogo() {
  return (
    <div style={{ flexShrink: 0 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3434.33 932.3"
        style={{ width: 104, height: 28, display: "block" }}
      >
        <defs>
          <style>{`.ml1{stroke:#fff;stroke-width:80px;fill:none;stroke-miterlimit:10;}.ml2{fill:#B8D935;stroke:#1b4d3e;stroke-miterlimit:10;}.ml3{fill:none;stroke:#231f20;stroke-width:5px;stroke-miterlimit:10;}.ml4{fill:#fff;stroke:#000;stroke-width:.5px;stroke-miterlimit:10;}.ml5{fill:#B8D935;}.ml6{fill:#fff;}.ml8{fill:#fff;}`}</style>
        </defs>
        <path
          className="ml6"
          d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
        />
        <path
          className="ml4"
          d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1Z"
        />
        <path
          className="ml4"
          d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
        />
        <rect className="ml5" x="1427.38" y="17.35" width="205.2" height="145" />
        <rect className="ml6" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
        <path
          className="ml6"
          d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
        />
        <rect className="ml6" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
        <rect className="ml5" x="3083.41" y="339.47" width="175.12" height="257.67" />
        <rect className="ml5" x="3083.41" y="654.42" width="175.12" height="257.67" />
        <circle className="ml3" cx="3385.56" cy="866.94" r="46.27" />
        <path
          className="ml8"
          d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13Z"
        />
        <rect className="ml1" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55" />
        <polygon className="ml2" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13" />
        <path
          style={{ fill: "#74914a" }}
          d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14Z"
        />
        <path
          className="ml5"
          d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37Z"
        />
      </svg>
    </div>
  );
}

/* ── Sector Drawer (bottom sheet) ── */
function MSectorDrawer({ s, setS, open, onClose }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        className="mDrawer"
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
            const act = sec.id === s.id;
            const totalV = (sec.t1?.length || 0) + (sec.t2?.length || 0) + (sec.t3?.length || 0);
            return (
              <div
                key={sec.id}
                onClick={() => {
                  setS(sec);
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
                    {totalV} ventures · ${sec.capLow}–{sec.capHigh}M
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

/* ── Hamburger Menu Drawer ── */
function MMenuDrawer({
  open,
  onClose,
  s,
  userName = "Joseph Asante",
  userRole = "BRIDGE Intelligence · Analyst",
  userTier = "Pro",
}) {
  if (!open) return null;
  const NAV = [
    {
      label: "About BRIDGE",
      desc: "Our mission, model & sectors",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
    {
      label: "Switch to Desktop",
      desc: "Full dashboard experience",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      label: "Notifications",
      desc: "Manage alert preferences",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      ),
    },
    {
      label: "Help & Support",
      desc: "Docs, guides & contact",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];
  const chevronR = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.18)"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        className="mDrawer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#0F1A12",
          borderRadius: "20px 20px 0 0",
          border: "1px solid rgba(184,217,53,0.15)",
          borderBottom: "none",
          paddingBottom: "env(safe-area-inset-bottom,24px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", margin: "12px auto 0" }}
        />
        <div
          style={{ padding: "12px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
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
            Menu
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
        {/* Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 20px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(184,217,53,0.12)",
              border: "1.5px solid rgba(184,217,53,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B8D935"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "DM Sans,sans-serif" }}>
              {userName}
            </div>
            <div
              style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "Inter,sans-serif", marginTop: 2 }}
            >
              {userRole}
            </div>
          </div>
          <div
            style={{
              background: "rgba(184,217,53,0.12)",
              border: "1px solid rgba(184,217,53,0.2)",
              borderRadius: 6,
              padding: "3px 8px",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>
              {userTier}
            </span>
          </div>
        </div>
        {/* Return to website */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "15px 20px",
            background: "transparent",
            border: "none",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "DM Sans,sans-serif" }}>
              Return to Website
            </div>
            <div
              style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "Inter,sans-serif", marginTop: 2 }}
            >
              Back to bridge-pbc.com
            </div>
          </div>
          {chevronR}
        </button>
        {/* Nav items */}
        {NAV.map((item, i) => (
          <button
            key={i}
            onClick={onClose}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "13px 20px",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 11,
                background: "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "DM Sans,sans-serif",
                }}
              >
                {item.label}
              </div>
              <div
                style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "Inter,sans-serif", marginTop: 2 }}
              >
                {item.desc}
              </div>
            </div>
            {chevronR}
          </button>
        ))}
        {/* Sign out */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 20px",
            background: "transparent",
            border: "none",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: "rgba(239,68,68,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(239,68,68,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{ fontSize: 14, fontWeight: 600, color: "rgba(239,68,68,0.75)", fontFamily: "DM Sans,sans-serif" }}
            >
              Sign Out
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

/* ── Notifications Dropdown ── */
function MNotifDropdown({ open, onClose, s }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 340 }} onClick={onClose}>
      <div
        style={{
          position: "absolute",
          top: 64,
          right: 12,
          width: 280,
          background: "#0F1A12",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 14px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Alerts</span>
          <span style={{ fontSize: 11, color: "#B8D935", fontWeight: 700, cursor: "pointer" }} onClick={onClose}>
            Mark all read
          </span>
        </div>
        {s.activity.slice(0, 3).map((a, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: 10, padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: msigCol(a.sig),
                marginTop: 4,
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>{a.h}</div>
              <div
                style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "Inter,sans-serif", marginTop: 2 }}
              >
                {a.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Top Header ── */
function MobileHeader({ s, setS }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {/* Header bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 56,
          background: "rgba(15,26,18,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <MobileLogo />
        {/* Sector selector pill */}
        <div
          onClick={() => setDrawerOpen(true)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            minWidth: 0,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 10,
            padding: "6px 10px 6px 8px",
            marginLeft: 8,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {s.svgIcon("#B8D935", 13)}
          </div>
          <span
            style={{
              flex: 1,
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              fontFamily: "DM Sans,sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {s.short}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>
              {s.score}
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
        {/* Bell */}
        <button
          onClick={() => {
            setNotifOpen((o) => !o);
            setMenuOpen(false);
          }}
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <div
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#EF4444",
              border: "1.5px solid #070D09",
            }}
          />
        </button>
        {/* Hamburger */}
        <button
          onClick={() => {
            setMenuOpen((o) => !o);
            setNotifOpen(false);
          }}
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: menuOpen ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.06)",
            border: `1px solid ${menuOpen ? "rgba(184,217,53,0.25)" : "rgba(255,255,255,0.08)"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            cursor: "pointer",
            flexShrink: 0,
            padding: 0,
          }}
        >
          <span
            style={{
              display: "block",
              width: 13,
              height: 1.5,
              borderRadius: 1,
              background: menuOpen ? "#B8D935" : "rgba(255,255,255,0.45)",
            }}
          />
          <span
            style={{
              display: "block",
              width: 13,
              height: 1.5,
              borderRadius: 1,
              background: menuOpen ? "#B8D935" : "rgba(255,255,255,0.45)",
            }}
          />
          <span
            style={{
              display: "block",
              width: 9,
              height: 1.5,
              borderRadius: 1,
              background: menuOpen ? "#B8D935" : "rgba(255,255,255,0.45)",
              alignSelf: "flex-start",
              marginLeft: "10px",
            }}
          />
        </button>
      </div>
      {/* Overlays */}
      <MNotifDropdown open={notifOpen} onClose={() => setNotifOpen(false)} s={s} />
      <MMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} s={s} />
      <MSectorDrawer s={s} setS={setS} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

/* ── Sector Strip ── */
function SectorStrip({ s, setS }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  return (
    <div style={{ background: M.bg, borderBottom: `1px solid ${M.border}`, padding: "8px 0", flexShrink: 0 }}>
      <div
        style={{
          display: "flex",
          gap: 6,
          overflowX: "auto",
          paddingLeft: 16,
          paddingRight: 16,
          scrollbarWidth: "none",
        }}
      >
        {sorted.map((sec) => {
          const act = sec.id === s.id,
            SIcon = sec.icon;
          return (
            <button
              key={sec.id}
              onClick={() => setS(sec)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 10px",
                borderRadius: 20,
                border: `1px solid ${act ? M.accentBorder : M.border}`,
                background: act ? M.accentDim : M.faint,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "all .15s",
              }}
            >
              <SIcon size={10} color={act ? M.accent : M.muted} strokeWidth={1.5} />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: act ? 700 : 500,
                  color: act ? M.accent : M.mid,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {sec.short}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: act ? M.accent : M.muted,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {sec.score}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Signal item row ── */
function MSignalRow({ a }) {
  const c = msigCol(a.sig);
  const dim = msigDim(a.sig);
  const arrow = a.sig === "Bullish" ? "↑" : a.sig === "Bearish" ? "↓" : "→";
  return (
    <div style={{ display: "flex", gap: 10, padding: "10px 14px", borderBottom: `1px solid ${M.border}` }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: dim,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 13,
          color: c,
          fontWeight: 700,
        }}
      >
        {arrow}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: M.white, lineHeight: 1.35, marginBottom: 3 }}>{a.h}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              padding: "1px 6px",
              borderRadius: 4,
              background: dim,
              color: c,
              fontFamily: "Inter,sans-serif",
            }}
          >
            {a.sig}
          </span>
          <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
          <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: c, fontFamily: "Inter,sans-serif" }}>
            {a.amt}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   OVERVIEW PAGE
   ════════════════════════════════════════ */
function OverviewHero({ s }) {
  const SIcon = s.icon;
  const c = compute(s);
  const totalV = (s.t1?.length || 0) + (s.t2?.length || 0) + (s.t3?.length || 0);
  const sig = scoreToSig(s.score);
  const sigC = msigCol(sig);
  const sigD = msigDim(sig);
  return (
    <MCard style={{ marginBottom: 10 }}>
      {/* Header */}
      <div
        style={{
          padding: "14px 14px 12px",
          borderBottom: `1px solid ${M.border}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Score ring — LEFT */}
        <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke={M.faint} strokeWidth="4" />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke={M.accent}
              strokeWidth="4"
              strokeDasharray={`${(s.score / 100) * 163.4} 163.4`}
              strokeLinecap="round"
              transform="rotate(-90 32 32)"
            />
          </svg>
          <div
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <span style={{ fontSize: 17, fontWeight: 800, color: M.white, fontFamily: "Inter,sans-serif" }}>
              {s.score}
            </span>
          </div>
        </div>
        {/* Text — RIGHT */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: M.accent,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              fontFamily: "Inter,sans-serif",
              marginBottom: 4,
            }}
          >
            Overview · {s.tag}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: M.white, lineHeight: 1.2, marginBottom: 8 }}>
            {s.full}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 4,
                background: M.faint,
                border: `1px solid ${M.border}`,
                color: M.white,
                fontFamily: "Inter,sans-serif",
              }}
            >
              Cap{" "}
              <span style={{ color: M.accent }}>
                ${s.capLow}–{s.capHigh}M
              </span>
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 4,
                background: M.faint,
                border: `1px solid ${M.border}`,
                color: M.white,
                fontFamily: "Inter,sans-serif",
              }}
            >
              IRR <span style={{ color: M.accent }}>{s.irrHigh}%</span>
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 4,
                background: M.faint,
                border: `1px solid ${M.border}`,
                color: M.white,
                fontFamily: "Inter,sans-serif",
              }}
            >
              Score <span style={{ color: M.accent }}>{s.score}</span>
            </span>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px 16px 14px", gap: 4 }}>
        {[
          { l: "Capital Range", v: `$${s.capLow}–${s.capHigh}M` },
          { l: "IRR Target", v: `${s.irrLow}–${s.irrHigh}%` },
          { l: "Ventures", v: `${totalV} identified` },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: i === 1 ? "center" : i === 2 ? "right" : "left" }}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 600,
                color: M.muted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                letterSpacing: ".5px",
                marginBottom: 3,
              }}
            >
              {item.l}
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: M.white, letterSpacing: "-.3px" }}>{item.v}</div>
          </div>
        ))}
      </div>
      {/* Signal pill */}
      <div
        style={{
          margin: "0 14px 12px",
          padding: "8px 12px",
          borderRadius: 10,
          background: sigD,
          border: `1px solid ${sigC}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: sigC, boxShadow: `0 0 7px ${sigC}` }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: sigC }}>{sig}</span>
          <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>Market Signal</span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: 12,
                borderRadius: 1.5,
                background: i < Math.round(s.score / 10) ? M.accent : M.faint,
              }}
            />
          ))}
        </div>
      </div>
    </MCard>
  );
}

function OverviewTab({ s }) {
  const [trendF, setTF] = useState("7D");
  const td = genTrend(s, trendF);
  const c = compute(s);
  const bullishCount = s.activity.filter((a) => a.sig === "Bullish").length;
  return (
    <div style={{ paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 0 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#6B7280",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          fontFamily: "Inter,sans-serif",
          marginBottom: 10,
        }}
      >
        Overview · {s.tag}
      </div>
      <OverviewHero s={s} />

      {/* Intelligence Signals */}
      <MSection icon={Zap} title="Intelligence Signals" badge={`${bullishCount} Bullish`} defaultOpen={true}>
        {s.activity.map((a, i) => (
          <MSignalRow key={i} a={a} />
        ))}
      </MSection>

      {/* Opportunity Index chart */}
      <MSection icon={TrendingUp} iconColor={M.green} title="Opportunity Index" badge="Trending">
        <div style={{ padding: "12px 14px 14px" }}>
          <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
            {["7D", "30D", "90D"].map((v) => (
              <button
                key={v}
                onClick={() => setTF(v)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 6,
                  border: `1px solid ${trendF === v ? M.accentBorder : M.border}`,
                  background: trendF === v ? M.accentDim : M.faint,
                  fontSize: 10,
                  fontWeight: 700,
                  color: trendF === v ? M.accent : M.muted,
                  cursor: "pointer",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {v}
              </button>
            ))}
          </div>
          <div style={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={td} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={M.accent} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={M.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={M.faint} vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 9, fill: M.muted, fontFamily: "Inter" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: M.muted }}
                  axisLine={false}
                  tickLine={false}
                  domain={["auto", "auto"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={M.accent}
                  strokeWidth={2}
                  fill="url(#mg1)"
                  dot={false}
                  activeDot={{ r: 3, fill: M.accent, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </MSection>

      {/* Market Sentiment */}
      <MSection icon={BarChart3} iconColor="#60A5FA" title="Market Sentiment">
        <div style={{ padding: "12px 14px 14px" }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: M.white, letterSpacing: "-2px", lineHeight: 1 }}>
              {c.sentimentScore}%
            </div>
            <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
              Positive Sentiment Score
            </div>
          </div>
          {[
            ["Activity Signals", Math.min(c.sentimentScore + 5, 98), M.green],
            ["Policy Alignment", s.score, M.accent],
            ["Capital Readiness", c.inflow, "#60A5FA"],
          ].map(([l, v, col]) => (
            <div key={l} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: M.mid, fontFamily: "Inter,sans-serif" }}>{l}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
                  {v}%
                </span>
              </div>
              <div style={{ height: 5, background: M.faint, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${v}%`, height: "100%", background: col, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </MSection>

      {/* Sub-sector Activity */}
      <MSection
        icon={Activity}
        iconColor={M.amber}
        title="Sub-sector Activity"
        badge={`${s.subSectors.length} segments`}
      >
        <div style={{ padding: "10px 14px 14px" }}>
          {s.subSectors.map((ss, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: M.white }}>{ss.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                  {ss.pct}%
                </span>
              </div>
              <div style={{ height: 5, background: M.faint, borderRadius: 3, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${ss.pct}%`,
                    height: "100%",
                    background: ss.color === "#E5E7EB" ? M.faint : M.accent,
                    borderRadius: 3,
                    opacity: ss.color === "#E5E7EB" ? 0.3 : 1,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </MSection>

      {/* BRIDGE Score Breakdown */}
      <OverviewScoreBreakdown s={s} />

      {/* Investment Thesis */}
      <OverviewThesis s={s} />

      {/* Key Risks */}
      <OverviewRisks s={s} />
      <div style={{ height: 16 }} />
    </div>
  );
}

/* ── BRIDGE Score Breakdown ── */
const SCORE_DIMS = {
  infrastructure: { pp: 88, sf: 91, fe: 82, ss: 79 },
  financial: { pp: 94, sf: 90, fe: 86, ss: 88 },
  health: { pp: 96, sf: 87, fe: 78, ss: 81 },
  technology: { pp: 85, sf: 93, fe: 89, ss: 91 },
  education: { pp: 92, sf: 88, fe: 83, ss: 80 },
  agriculture: { pp: 90, sf: 91, fe: 85, ss: 84 },
  creative: { pp: 80, sf: 84, fe: 77, ss: 82 },
  housing: { pp: 88, sf: 85, fe: 80, ss: 83 },
  tourism: { pp: 83, sf: 82, fe: 79, ss: 80 },
  energy: { pp: 87, sf: 89, fe: 84, ss: 86 },
  manufacturing: { pp: 82, sf: 86, fe: 83, ss: 80 },
  transportation: { pp: 86, sf: 88, fe: 81, ss: 83 },
};
function OverviewScoreBreakdown({ s }) {
  const d = SCORE_DIMS[s.id] || { pp: 82, sf: 84, fe: 80, ss: 81 };
  const dims = [
    { label: "Peace & Prosperity", abbr: "P&P", val: d.pp, col: M.accent },
    { label: "Strategic Fit", abbr: "SF", val: d.sf, col: M.green },
    { label: "Feasibility & Execution", abbr: "F&E", val: d.fe, col: "#60A5FA" },
    { label: "Scalability & Sustainability", abbr: "S&S", val: d.ss, col: M.amber },
  ];
  const avg = Math.round((d.pp + d.sf + d.fe + d.ss) / 4);
  return (
    <MSection icon={Target} iconColor={M.accent} title="BRIDGE Score Breakdown" badge={`${avg} avg`}>
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 12 }}>
          4-dimension composite · Peace & Prosperity framework
        </div>
        {dims.map((d, i) => (
          <div key={i} style={{ marginBottom: 11 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: d.col, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: M.white }}>{d.label}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: d.col, fontFamily: "Inter,sans-serif" }}>
                {d.val}
              </span>
            </div>
            <div style={{ height: 5, background: M.faint, borderRadius: 3, overflow: "hidden" }}>
              <div
                style={{
                  width: `${d.val}%`,
                  height: "100%",
                  background: d.col,
                  borderRadius: 3,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        ))}
        {/* Mini score card row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginTop: 4 }}>
          {dims.map((d, i) => (
            <div key={i} style={{ background: M.faint, borderRadius: 8, padding: "7px 6px", textAlign: "center" }}>
              <div
                style={{ fontSize: 14, fontWeight: 800, color: d.col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
              >
                {d.val}
              </div>
              <div style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{d.abbr}</div>
            </div>
          ))}
        </div>
      </div>
    </MSection>
  );
}

/* ── Investment Thesis ── */
const THESIS = {
  infrastructure: [
    {
      icon: "🏗️",
      point:
        "Ghana's infrastructure deficit represents a $12B+ addressable gap, with government committing 6% of GDP to close it by 2030.",
    },
    {
      icon: "🌍",
      point:
        "West Africa's fastest-growing logistics corridor runs through Ghana — port, road, and rail upgrades are multiplying returns across sectors.",
    },
    {
      icon: "⚡",
      point:
        "BRIDGE's blended finance model de-risks early capital, enabling private sector entry at project stages previously inaccessible.",
    },
  ],
  financial: [
    {
      icon: "📱",
      point:
        "Ghana leads sub-Saharan Africa in mobile money penetration — over 17M registered MoMo accounts creating instant distribution rails.",
    },
    {
      icon: "🏦",
      point:
        "Only 30% of adults hold formal bank accounts, positioning digital lending and insurance as the highest-growth entry points.",
    },
    {
      icon: "🔗",
      point:
        "Bank of Ghana's Digital Credit Directive (2026) creates regulatory clarity that significantly reduces execution risk for fintechs.",
    },
  ],
  health: [
    {
      icon: "🏥",
      point:
        "Ghana's NHIS covers 40% of population — private health infrastructure investment is actively incentivised through public-private frameworks.",
    },
    {
      icon: "💊",
      point:
        "Local pharmaceutical manufacturing represents a $2B import-substitution opportunity as policy shifts favour domestic production.",
    },
    {
      icon: "📊",
      point:
        "Digital health records adoption has reached 60% of urban facilities, creating infrastructure for telemedicine and diagnostics scale.",
    },
  ],
  technology: [
    {
      icon: "🤖",
      point:
        "Ghana's tech talent pool is the fastest-growing in West Africa — 3 unicorns in 5 years signal deep ecosystem maturity.",
    },
    {
      icon: "🏙️",
      point:
        "Accra is being positioned as the AI & fintech hub of the continent, with preferential tax regimes for qualifying tech ventures.",
    },
    {
      icon: "🔌",
      point:
        "High mobile internet penetration (68%) and falling data costs are accelerating B2C digital product adoption at scale.",
    },
  ],
  education: [
    {
      icon: "🎓",
      point:
        "Ghana's 18-35 demographic bulge of 9M+ is the largest skills-ready cohort in West Africa, representing an outsized human capital opportunity.",
    },
    {
      icon: "📚",
      point:
        "EdTech adoption accelerated 4x post-2020, with government e-learning infrastructure now reaching 60% of secondary schools.",
    },
    {
      icon: "🏭",
      point:
        "Ghana's industrial strategy actively prioritises TVET (Technical & Vocational) — creating pipeline alignment between training providers and manufacturers.",
    },
  ],
  agriculture: [
    {
      icon: "🌾",
      point:
        "Agriculture contributes 20% of GDP but operates at 40% of potential yield — productivity improvements alone can unlock $4B+ annually.",
    },
    {
      icon: "🥑",
      point:
        "Value-added processing is the critical gap: less than 15% of Ghana's agri output is processed locally before export, leaving major margin on the table.",
    },
    {
      icon: "🌧️",
      point:
        "Climate-smart farming and irrigation investment is prioritised in the 2026 budget, aligning policy support with BRIDGE's deployment thesis.",
    },
  ],
  creative: [
    {
      icon: "🎵",
      point:
        "Afrobeats, Afrofusion, and Ghanaian film generate $1.4B+ annually — IP monetisation infrastructure is the highest-return near-term opportunity.",
    },
    {
      icon: "🌐",
      point:
        "Digital streaming has created global distribution with zero marginal cost — Ghana's creative output is now globally addressable.",
    },
    {
      icon: "🏟️",
      point:
        "Sports infrastructure investment yields multiplier returns via tourism, broadcast rights, and athlete development pipeline.",
    },
  ],
  housing: [
    {
      icon: "🏠",
      point:
        "Ghana faces a 1.8M unit housing deficit growing at 100K units/year — demand fundamentals are structurally unshakeable.",
    },
    {
      icon: "🏙️",
      point:
        "Affordable housing incentives under Ghana REIT legislation make institutional capital deployment highly efficient for the first time.",
    },
    {
      icon: "🔨",
      point:
        "Local building materials sector is an adjacent play — cement, steel, and prefab can capture 30%+ of project cost within Ghana.",
    },
  ],
  tourism: [
    {
      icon: "✈️",
      point:
        "Year of Return legacy continues to drive diaspora arrivals — Ghana welcomed 1.1M visitors in 2025, up 34% from 2022.",
    },
    {
      icon: "🏖️",
      point:
        "Eco-tourism and heritage tourism are the fastest-growing segments, aligning with Ghana's globally recognised cultural assets.",
    },
    {
      icon: "🍽️",
      point:
        "Hospitality infrastructure remains undercapitalised relative to demand — mid-market hotels, lodges, and experience operators are acutely undersupplied.",
    },
  ],
  energy: [
    {
      icon: "☀️",
      point:
        "Ghana has among the highest solar irradiance in West Africa with only 1% of renewable potential currently deployed — a compelling first-mover window.",
    },
    {
      icon: "⚡",
      point:
        "Energy access gaps in northern regions (40% off-grid) represent addressable markets for mini-grid and clean cooking solutions.",
    },
    {
      icon: "🔋",
      point:
        "Government's 10% renewable energy target by 2030 creates policy-backed demand for utility-scale and distributed renewable projects.",
    },
  ],
  manufacturing: [
    {
      icon: "🏭",
      point:
        "Ghana's AfCFTA positioning makes it the logical manufacturing export base for a 1.4B person continental market — without tariff barriers.",
    },
    {
      icon: "🔩",
      point:
        "Light industry (packaging, food processing, textiles) can absorb capital at low risk with rapid payback cycles of 3–5 years.",
    },
    {
      icon: "🌱",
      point:
        "Government's One District One Factory initiative provides infrastructure co-investment, reducing greenfield capital requirements significantly.",
    },
  ],
  transportation: [
    {
      icon: "🚢",
      point:
        "Tema Port expansion and Accra-Kumasi highway upgrade are catalytic infrastructure plays unlocking regional logistics corridors.",
    },
    {
      icon: "🚌",
      point:
        "Urban mobility is chronically underserved — ride-hailing, e-mobility, and last-mile logistics are growing at 30%+ annually.",
    },
    {
      icon: "🛣️",
      point:
        "Ghana's 2026 transportation budget is the largest in a decade, signalling sustained government co-investment in the sector.",
    },
  ],
};

function OverviewThesis({ s }) {
  const points = THESIS[s.id] || THESIS.infrastructure;
  return (
    <MSection icon={ArrowUpRight} iconColor={M.green} title="Investment Thesis" badge="3 reasons">
      <div style={{ padding: "10px 14px 14px" }}>
        {points.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < points.length - 1 ? 14 : 0 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: M.faint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 15,
              }}
            >
              {p.icon}
            </div>
            <div style={{ flex: 1, paddingTop: 2 }}>
              <div style={{ fontSize: 11, color: M.white, lineHeight: 1.55, fontWeight: 500 }}>{p.point}</div>
            </div>
          </div>
        ))}
      </div>
    </MSection>
  );
}

/* ── Key Risks ── */
const RISKS = {
  infrastructure: [
    {
      level: "HIGH",
      title: "Procurement Delays",
      desc: "Public tendering cycles average 18–24 months, compressing effective deployment windows.",
    },
    {
      level: "MED",
      title: "FX Exposure",
      desc: "USD-denominated contracts vs. cedi revenue creates currency mismatch risk on long-duration projects.",
    },
    {
      level: "LOW",
      title: "Land Tenure",
      desc: "Customary land rights can complicate title clarity — BRIDGE mitigates through community engagement protocols.",
    },
  ],
  financial: [
    {
      level: "MED",
      title: "Regulatory Shifts",
      desc: "BoG policy changes can alter fintech operating conditions rapidly — ongoing engagement is essential.",
    },
    {
      level: "MED",
      title: "Credit Default Risk",
      desc: "SME borrower default rates spike during macro downturns — portfolio diversification is the primary hedge.",
    },
    {
      level: "LOW",
      title: "Competition Intensity",
      desc: "MTN, Fidelity, and Zeepay dominate distribution; new entrants must carve differentiated niches.",
    },
  ],
  health: [
    {
      level: "HIGH",
      title: "Regulatory Approval",
      desc: "FDA Ghana and Ministry of Health approval timelines for new facilities average 12–18 months.",
    },
    {
      level: "MED",
      title: "Healthcare Workforce",
      desc: "Specialist doctor-to-patient ratios remain critically low — staffing is a persistent operational constraint.",
    },
    {
      level: "LOW",
      title: "NHIS Reimbursement",
      desc: "Delays in NHIS claims processing can create cash flow pressure for private facility operators.",
    },
  ],
  technology: [
    {
      level: "MED",
      title: "Talent Retention",
      desc: "Top Ghanaian tech talent is increasingly recruited internationally — retention requires competitive equity packages.",
    },
    {
      level: "MED",
      title: "Data Infrastructure",
      desc: "Intermittent power and connectivity in non-urban areas limits market penetration for data-heavy products.",
    },
    {
      level: "LOW",
      title: "Cybersecurity",
      desc: "Rising cyber threats targeting fintech and data platforms require proactive security investment from day one.",
    },
  ],
  agriculture: [
    {
      level: "HIGH",
      title: "Climate Volatility",
      desc: "Erratic rainfall patterns in northern Ghana are intensifying, directly threatening yield predictability.",
    },
    {
      level: "MED",
      title: "Commodity Price Risk",
      desc: "Global cocoa and cashew price fluctuations can compress margins significantly in export-oriented ventures.",
    },
    {
      level: "LOW",
      title: "Supply Chain Gaps",
      desc: "Post-harvest losses of 20–30% persist due to cold chain deficits — a risk and an opportunity simultaneously.",
    },
  ],
  education: [
    {
      level: "MED",
      title: "Public Sector Dependency",
      desc: "Much of EdTech revenue depends on government procurement, which is subject to budget cycles and delays.",
    },
    {
      level: "LOW",
      title: "Device Penetration",
      desc: "Student device ownership outside Accra remains low — hardware subsidies may be needed for scale.",
    },
    {
      level: "LOW",
      title: "Curriculum Alignment",
      desc: "Misalignment between training outputs and employer needs can affect graduate employment rates and brand.",
    },
  ],
  creative: [
    {
      level: "HIGH",
      title: "IP Rights Enforcement",
      desc: "Copyright enforcement in Ghana remains inconsistent — revenue leakage from piracy affects unit economics.",
    },
    {
      level: "MED",
      title: "Streaming Revenue",
      desc: "African streaming rates are significantly below global averages — monetisation per stream remains low.",
    },
    {
      level: "LOW",
      title: "Venue Infrastructure",
      desc: "World-class performance and production infrastructure is scarce outside Accra, limiting event scale.",
    },
  ],
  housing: [
    {
      level: "HIGH",
      title: "Mortgage Market",
      desc: "Mortgage penetration below 1% of GDP means most buyers need rent-to-own or developer financing structures.",
    },
    {
      level: "MED",
      title: "Construction Cost Inflation",
      desc: "Imported materials (steel, cement) carry significant FX risk — local sourcing strategies are critical.",
    },
    {
      level: "LOW",
      title: "Planning Approvals",
      desc: "District Assembly planning permits can take 6–12 months in secondary cities, affecting project timelines.",
    },
  ],
  tourism: [
    {
      level: "MED",
      title: "Seasonal Concentration",
      desc: "70% of tourist arrivals cluster in Q4 and Q1 — revenue smoothing and off-season programming are essential.",
    },
    {
      level: "MED",
      title: "Infrastructure Gaps",
      desc: "Road access and utilities in eco-tourism zones remain underdeveloped, raising capex requirements.",
    },
    {
      level: "LOW",
      title: "Global Macro Sensitivity",
      desc: "Long-haul leisure travel is discretionary and sensitive to global economic downturns.",
    },
  ],
  energy: [
    {
      level: "HIGH",
      title: "Grid Interconnection",
      desc: "Connecting renewable projects to the national grid faces technical and bureaucratic delays of 12–24 months.",
    },
    {
      level: "MED",
      title: "Financing Structures",
      desc: "Long payback periods (10–15 years) for utility-scale projects require patient capital and DFI co-investment.",
    },
    {
      level: "LOW",
      title: "Technology Risk",
      desc: "Emerging storage technology costs remain elevated — project economics improve as battery prices fall.",
    },
  ],
  manufacturing: [
    {
      level: "MED",
      title: "Input Import Dependency",
      desc: "Key raw materials are still largely imported — supply chain disruptions directly impact production continuity.",
    },
    {
      level: "MED",
      title: "Energy Reliability",
      desc: "Power outages (dumsor) impose real operational costs — on-site generation adds to capex requirements.",
    },
    {
      level: "LOW",
      title: "Skills Gap",
      desc: "Precision manufacturing requires technical skills not widely available — workforce development is essential.",
    },
  ],
  transportation: [
    {
      level: "HIGH",
      title: "Traffic Congestion Externalities",
      desc: "Accra's road network is operating at 140% capacity — congestion imposes real costs on urban logistics operators.",
    },
    {
      level: "MED",
      title: "Regulatory Fragmentation",
      desc: "Transport licensing across regions is inconsistent — multi-region operators face compliance complexity.",
    },
    {
      level: "LOW",
      title: "EV Infrastructure",
      desc: "Electric vehicle adoption is nascent; charging infrastructure requires co-investment to unlock e-mobility at scale.",
    },
  ],
};
const riskCol = (l) => (l === "HIGH" ? M.red : l === "MED" ? M.amber : M.green);
const riskDim = (l) => (l === "HIGH" ? M.redDim : l === "MED" ? M.amberDim : M.greenDim);

function OverviewRisks({ s }) {
  const risks = RISKS[s.id] || RISKS.infrastructure;
  const highCount = risks.filter((r) => r.level === "HIGH").length;
  const badge = highCount > 0 ? `${highCount} High` : "Monitored";
  const badgeStyle = highCount > 0 ? { background: M.redDim, border: `1px solid ${M.red}44`, color: M.red } : {};
  return (
    <MSection
      icon={TrendingDown}
      iconColor={M.red}
      title="Key Risks & Watchpoints"
      badge={badge}
      badgeStyle={badgeStyle}
    >
      <div style={{ padding: "10px 14px 14px" }}>
        {risks.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              background: riskDim(r.level),
              border: `1px solid ${riskCol(r.level)}22`,
              marginBottom: i < risks.length - 1 ? 8 : 0,
            }}
          >
            <div style={{ flexShrink: 0, marginTop: 1 }}>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 800,
                  padding: "2px 5px",
                  borderRadius: 4,
                  background: riskDim(r.level),
                  border: `1px solid ${riskCol(r.level)}44`,
                  color: riskCol(r.level),
                  fontFamily: "Inter,sans-serif",
                  letterSpacing: ".5px",
                }}
              >
                {r.level}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: M.white, marginBottom: 3 }}>{r.title}</div>
              <div style={{ fontSize: 10, color: M.mid, lineHeight: 1.5, fontFamily: "Inter,sans-serif" }}>
                {r.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </MSection>
  );
}

/* ════════════════════════════════════════
   ANALYTICS PAGE
   ════════════════════════════════════════ */

/* KPIs sub-tab */
function AnalyticsKPIs({ s }) {
  const total = Math.round((((s.capLow + s.capHigh) / 2) * s.score) / 10);
  const subRev = Math.round(total * 0.56);
  const kpis = [
    { icon: TrendingUp, label: "Market Cap", val: `$${total}B`, sub: "Sector aggregate", chg: "+5.1%" },
    { icon: ArrowUpRight, label: "IRR Ceiling", val: `${s.irrHigh}%`, sub: "Target return", chg: "+2.4%" },
    { icon: LayoutGrid, label: "Sub-sector Rev", val: `$${subRev}B`, sub: "Lead segment", chg: "+3.8%" },
    { icon: Target, label: "BRIDGE Score", val: `${s.score}`, sub: "/ 100 composite", chg: "+1.2%" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        {kpis.map((k, i) => (
          <MCard key={i} style={{ padding: "13px 13px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: M.accentDim,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <k.icon size={12} color={M.accent} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: M.green, fontFamily: "Inter,sans-serif" }}>
                {k.chg}
              </span>
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: M.white,
                letterSpacing: "-1px",
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              {k.val}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: M.mid }}>{k.label}</div>
            <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>{k.sub}</div>
          </MCard>
        ))}
      </div>
      {/* Sub-sector Breakdown */}
      <MSection
        icon={LayoutGrid}
        title="Sub-sector Breakdown"
        badge={`${s.subSectors.length} segments`}
        defaultOpen={true}
      >
        <div style={{ padding: "10px 14px 14px" }}>
          {s.subSectors.map((ss, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: M.white, marginBottom: 4 }}>{ss.name}</div>
                <div style={{ height: 4, background: M.faint, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${ss.pct}%`, height: "100%", background: M.accent, borderRadius: 2 }} />
                </div>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: M.accent,
                  fontFamily: "Inter,sans-serif",
                  marginLeft: 12,
                  flexShrink: 0,
                }}
              >
                {ss.pct}%
              </span>
            </div>
          ))}
        </div>
      </MSection>
    </div>
  );
}

/* Performance sub-tab */
function AnalyticsPerformance({ s }) {
  const perfData = genVolume(s);
  const volData = s.subSectors.map((ss, i) => ({
    initials: ss.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    name: ss.name,
    share: ss.pct,
    growth: Math.round(40 + ss.pct * 1.2),
    risk: Math.round(15 + (100 - ss.pct) * 0.8),
  }));
  return (
    <div>
      {/* Volatility vs Growth list */}
      <MSection
        icon={Activity}
        iconColor={M.accent}
        title="Volatility vs Growth Rate"
        badge="Sub-sectors"
        defaultOpen={true}
      >
        <div style={{ padding: "8px 14px 4px", borderBottom: `1px solid ${M.border}` }}>
          <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
            Risk-return profile · market share
          </span>
        </div>
        {volData.map((d, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 14px",
              borderBottom: `1px solid ${M.border}`,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: `rgba(27,77,62,${0.4 + d.share / 100})`,
                border: `1px solid ${M.borderG}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                {d.initials}
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: M.white, marginBottom: 3 }}>{d.name}</div>
              <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                Growth <span style={{ color: M.green, fontWeight: 700 }}>{d.growth}%</span>
                {"  "}
                Risk <span style={{ color: M.amber, fontWeight: 700 }}>{d.risk}%</span>
              </div>
            </div>
            <span
              style={{ fontSize: 14, fontWeight: 800, color: M.accent, fontFamily: "Inter,sans-serif", flexShrink: 0 }}
            >
              {d.share}%
            </span>
          </div>
        ))}
      </MSection>
      {/* Sector Performance Index */}
      <MSection icon={TrendingUp} iconColor={M.green} title="Sector Performance Index" badge="8-Month">
        <div style={{ padding: "4px 14px 14px" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 10, paddingTop: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: M.accent }} />
              <span style={{ fontSize: 9, color: M.mid, fontFamily: "Inter,sans-serif" }}>Actual</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div
                style={{ width: 7, height: 7, borderRadius: "50%", background: M.faint, border: `1px solid ${M.mid}` }}
              />
              <span style={{ fontSize: 9, color: M.mid, fontFamily: "Inter,sans-serif" }}>AI Projection</span>
            </div>
          </div>
          <div style={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RBarChart data={perfData} barSize={12} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={M.faint} vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9, fill: M.muted, fontFamily: "Inter" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 9, fill: M.muted }} axisLine={false} tickLine={false} />
                <Bar dataKey="deployed" fill={M.accent} radius={[3, 3, 0, 0]} name="Actual" opacity={0.9} />
                <Bar dataKey="target" fill={`rgba(255,255,255,0.08)`} radius={[3, 3, 0, 0]} name="Projection" />
              </RBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </MSection>
    </div>
  );
}

/* Activity sub-tab */
function AnalyticsActivity({ s }) {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const hours = ["00", "04", "08", "12", "16", "20"];
  const heatmap = days.map((d) => hours.map((h) => Math.floor(Math.random() * 5)));
  const sources = [
    { l: "Earnings & Policy", pct: 25 },
    { l: "News & Media", pct: 25 },
    { l: "Analyst Ratings", pct: 50 },
  ];
  const barData = Array.from({ length: 25 }, (_, i) => ({ x: i, v: Math.floor(Math.random() * 100) + 20 }));
  const stats = [
    { l: "Active Signals", v: "1,692", chg: "+56%" },
    { l: "Conversion", v: "1,423", chg: "+43%" },
    { l: "Avg Duration", v: "11,992", chg: "+28%" },
  ];
  const heatCols = [
    "rgba(27,77,62,0.15)",
    "rgba(27,77,62,0.3)",
    "rgba(27,77,62,0.5)",
    "rgba(74,222,128,0.4)",
    "rgba(74,222,128,0.7)",
  ];
  return (
    <div>
      {/* Activity Heatmap */}
      <MSection icon={LayoutGrid} iconColor={M.accent} title="Activity Heatmap" badge="7 Days" defaultOpen={true}>
        <div style={{ padding: "10px 14px 14px" }}>
          {/* Hour labels */}
          <div style={{ display: "flex", marginBottom: 4, paddingLeft: 26 }}>
            {hours.map((h) => (
              <div
                key={h}
                style={{ flex: 1, fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif", textAlign: "center" }}
              >
                {h}
              </div>
            ))}
          </div>
          {/* Grid */}
          {days.map((d, di) => (
            <div key={d} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 600,
                  color: M.muted,
                  fontFamily: "Inter,sans-serif",
                  width: 18,
                  flexShrink: 0,
                }}
              >
                {d}
              </span>
              {hours.map((h, hi) => (
                <div key={h} style={{ flex: 1, height: 22, borderRadius: 4, background: heatCols[heatmap[di][hi]] }} />
              ))}
            </div>
          ))}
          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
            <span style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>Low</span>
            {heatCols.map((c, i) => (
              <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: c }} />
            ))}
            <span style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>Peak</span>
          </div>
        </div>
      </MSection>
      {/* Signal Source Breakdown */}
      <MSection
        icon={BarChart3}
        iconColor={M.accent}
        title="Signal Source Breakdown"
        badge="+180%"
        badgeStyle={{ background: M.accentDim }}
      >
        <div style={{ padding: "10px 14px 14px" }}>
          {/* Segmented bar */}
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", marginBottom: 12, height: 36 }}>
            {sources.map((s, i) => (
              <div
                key={i}
                style={{
                  flex: s.pct,
                  background: i === 0 ? M.accentDim : i === 1 ? `rgba(27,77,62,0.4)` : `rgba(27,77,62,0.6)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: i < 2 ? `1px solid ${M.bg}` : undefined,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
                  {s.pct}%
                </span>
              </div>
            ))}
          </div>
          {sources.map((s, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: i === 0 ? M.accent : i === 1 ? `rgba(27,77,62,0.9)` : `rgba(27,77,62,0.6)`,
                      border: `1px solid ${M.accent}`,
                    }}
                  />
                  <span style={{ fontSize: 11, fontWeight: 600, color: M.white }}>{s.l}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                  {s.pct}%
                </span>
              </div>
              <div style={{ height: 3, background: M.faint, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${s.pct}%`, height: "100%", background: M.accent, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </MSection>
      {/* 30-Day Engagement */}
      <MSection
        icon={Activity}
        iconColor={M.green}
        title="30-Day Engagement"
        badge="Live"
        badgeStyle={{ background: M.greenDim, border: `1px solid ${M.green}44` }}
      >
        <div style={{ padding: "10px 14px 14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {stats.map((st, i) => (
              <div key={i} style={{ background: M.faint, borderRadius: 10, padding: "10px 10px 8px" }}>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: M.white,
                    letterSpacing: "-.5px",
                    lineHeight: 1,
                    marginBottom: 2,
                  }}
                >
                  {st.v}
                </div>
                <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 4 }}>
                  {st.l}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: M.green, fontFamily: "Inter,sans-serif" }}>
                  {st.chg}
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 80 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RBarChart data={barData} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                <Bar dataKey="v" fill={M.accent} radius={[2, 2, 0, 0]} opacity={0.7} />
                <XAxis dataKey="x" tick={false} axisLine={false} tickLine={false} />
              </RBarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            {["Feb 5", "Feb 15", "Feb 25", "Mar 1"].map((l) => (
              <span key={l} style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </MSection>
    </div>
  );
}

/* Companies sub-tab */
function AnalyticsCompanies({ s }) {
  const companiesBySector = {
    financial: [
      { n: "Fidelity Bank Ghana", t: "#FBG", chg: "+6.1%", val: "$1.4B", score: 91 },
      { n: "MTN MoMo", t: "#MTN", chg: "+3.5%", val: "$3.2B", score: 88 },
      { n: "Zeepay", t: "#ZPY", chg: "+2.2%", val: "$280M", score: 83 },
      { n: "Stanbic IBTC", t: "#SIB", chg: "+0.9%", val: "$620M", score: 76 },
      { n: "CalBank Ghana", t: "#CAL", chg: "-0.4%", val: "$310M", score: 71 },
    ],
    technology: [
      { n: "mPharma", t: "#MPH", chg: "+8.2%", val: "$310M", score: 92 },
      { n: "Hubtel", t: "#HBT", chg: "+4.1%", val: "$180M", score: 87 },
      { n: "Rancard", t: "#RCD", chg: "+1.5%", val: "$95M", score: 80 },
      { n: "Softsolutions", t: "#SFT", chg: "-1.2%", val: "$60M", score: 74 },
    ],
    agriculture: [
      { n: "Cocoa Board Ghana", t: "#COC", chg: "+5.3%", val: "$2.1B", score: 89 },
      { n: "Wienco Ghana", t: "#WNK", chg: "+2.8%", val: "$450M", score: 84 },
      { n: "AgroFresh Ghana", t: "#AGF", chg: "+1.1%", val: "$120M", score: 78 },
    ],
  };
  const companies = companiesBySector[s.id] || [
    { n: "Top Sector Leaders", t: "#SEC", chg: "+3.5%", val: "$1.2B", score: s.score },
    { n: "Market Benchmark Co.", t: "#MKT", chg: "+1.8%", val: "$800M", score: Math.round(s.score * 0.95) },
    { n: "BRIDGE Index Fund", t: "#BRG", chg: "+0.9%", val: "$340M", score: Math.round(s.score * 0.88) },
  ];
  return (
    <div>
      {/* Top Companies */}
      <MSection
        icon={User}
        iconColor={M.accent}
        title="Top Companies"
        badge={`${companies.length} active`}
        defaultOpen={true}
      >
        {companies.map((co, i) => {
          const pos = co.chg.startsWith("+");
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderBottom: `1px solid ${M.border}`,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: M.faint,
                  border: `1px solid ${M.borderG}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: M.mid, fontFamily: "Inter,sans-serif" }}>
                  {i + 1}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: M.white }}>{co.n}</div>
                <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                  {co.t}
                  {"  "}
                  <span style={{ color: pos ? M.green : M.red, fontWeight: 700 }}>{co.chg}</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: M.white,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "-.5px",
                  }}
                >
                  {co.val}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginTop: 2 }}
                >
                  <div style={{ width: 32, height: 3, background: M.faint, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${co.score}%`, height: "100%", background: M.accent, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                    {co.score}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </MSection>
      {/* Market Signals */}
      <MSection
        icon={TrendingUp}
        iconColor={M.green}
        title="Market Signals"
        badge={`${s.activity.length}`}
        defaultOpen={true}
      >
        {s.activity.map((a, i) => {
          const c = msigCol(a.sig),
            dim = msigDim(a.sig);
          return (
            <div
              key={i}
              style={{ display: "flex", gap: 10, padding: "11px 14px", borderBottom: `1px solid ${M.border}` }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c,
                  marginTop: 4,
                  flexShrink: 0,
                  boxShadow: `0 0 5px ${c}`,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: M.white, marginBottom: 4 }}>{a.h}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 4,
                      background: dim,
                      color: c,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {a.sig}
                  </span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                    {a.sig === "Bullish" ? "Policy" : "Risk"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </MSection>
    </div>
  );
}

/* Map sub-tab placeholder */
function AnalyticsMap({ s }) {
  return (
    <MCard style={{ marginBottom: 10 }}>
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: M.accentDim,
            border: `1px solid ${M.accentBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
          }}
        >
          <Bookmark size={22} color={M.accent} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: M.white, marginBottom: 6 }}>Ghana Region Map</div>
        <div style={{ fontSize: 11, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.6 }}>
          Geographic distribution of {s.short}
          <br />
          ventures and capital deployment
        </div>
        <div
          style={{
            marginTop: 14,
            padding: "7px 16px",
            borderRadius: 20,
            background: M.accentDim,
            border: `1px solid ${M.accentBorder}`,
            display: "inline-block",
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
            Coming Soon
          </span>
        </div>
      </div>
    </MCard>
  );
}

/* Ventures within Analytics */
function AnalyticsVentures({ s }) {
  const [tier, setTier] = useState("t1");
  const ventures = s[tier] || [];
  const SIcon = s.icon;
  const tc =
    tier === "t1"
      ? { bg: M.accentDim, col: M.accent, label: "Tier I" }
      : tier === "t2"
        ? { bg: "rgba(74,222,128,0.1)", col: M.green, label: "Tier II" }
        : { bg: M.faint, col: M.mid, label: "Tier III" };
  return (
    <MSection icon={Target} iconColor={M.amber} title="Priority Ventures" badge={`${ventures.length} active`}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, padding: "10px 14px 0" }}>
        {[
          ["t1", "Tier I", s.t1?.length || 0],
          ["t2", "Tier II", s.t2?.length || 0],
          ["t3", "Tier III", s.t3?.length || 0],
        ].map(([v, l, n]) => (
          <button
            key={v}
            onClick={() => setTier(v)}
            style={{
              padding: "8px 0",
              borderRadius: 9,
              border: `1px solid ${tier === v ? M.accentBorder : M.border}`,
              background: tier === v ? M.accentDim : M.faint,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: tier === v ? M.accent : M.mid,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {n}
            </div>
            <div style={{ fontSize: 9, color: tier === v ? M.accent : M.muted, fontFamily: "Inter,sans-serif" }}>
              {l}
            </div>
          </button>
        ))}
      </div>
      <div style={{ padding: "8px 0" }}>
        {ventures.map((v, i) => {
          const rc = v.risk === "LOW" ? M.green : v.risk === "MEDIUM" ? M.amber : M.red;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderBottom: `1px solid ${M.border}`,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: M.faint,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <SIcon size={12} color={M.mid} strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: M.white, lineHeight: 1.3, marginBottom: 3 }}>
                  {v.name}
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "1px 5px",
                      borderRadius: 4,
                      background: tc.bg,
                      color: tc.col,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {tc.label}
                  </span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{v.cap}</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: M.green, fontFamily: "Inter,sans-serif" }}>
                  {v.irr}
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: rc, fontFamily: "Inter,sans-serif" }}>{v.risk}</div>
              </div>
            </div>
          );
        })}
      </div>
    </MSection>
  );
}

function AnalyticsTab({ s, sub, setSub }) {
  const subLabel = ANALYTICS_SUBS.find((t) => t.id === sub)?.label || "KPIs";
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Page label */}
      <div style={{ paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 0, flexShrink: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#6B7280",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            fontFamily: "Inter,sans-serif",
            marginBottom: 10,
          }}
        >
          Analytics · {s.tag} · {subLabel}
        </div>
      </div>
      {/* Hero card */}
      <div style={{ padding: "0 14px", flexShrink: 0 }}>
        <MCard style={{ marginBottom: 10, padding: "13px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="20" fill="none" stroke={M.faint} strokeWidth="3" />
                <circle
                  cx="26"
                  cy="26"
                  r="20"
                  fill="none"
                  stroke={M.accent}
                  strokeWidth="3"
                  strokeDasharray={`${(s.score / 100) * 125.7} 125.7`}
                  strokeLinecap="round"
                  transform="rotate(-90 26 26)"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 800, color: M.white, fontFamily: "Inter,sans-serif" }}>
                  {s.score}
                </span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: M.white, lineHeight: 1.2 }}>{s.full}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 6, flexWrap: "wrap" }}>
                {[`Cap $${s.capLow}–${s.capHigh}M`, `IRR ${s.irrHigh}%`, `Score ${s.score}`].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: M.accentDim,
                      border: `1px solid ${M.accentBorder}`,
                      color: M.accent,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MCard>
      </div>
      {/* Sub content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 16px" }}>
        {sub === "kpis" && <AnalyticsKPIs s={s} />}
        {sub === "performance" && <AnalyticsPerformance s={s} />}
        {sub === "activity" && <AnalyticsActivity s={s} />}
        {sub === "companies" && <AnalyticsCompanies s={s} />}
        {sub === "map" && <AnalyticsMap s={s} />}
        <AnalyticsVentures s={s} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   WATCH / RESOURCES / DASHBOARD (stubs)
   ════════════════════════════════════════ */
function WatchTab({ s }) {
  const watched = [...SECTORS].sort((a, b) => b.score - a.score).slice(0, 6);
  return (
    <div style={{ padding: "12px 14px 16px" }}>
      <div style={{ marginBottom: 10, padding: "8px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: M.white, marginBottom: 2 }}>Watchlist</div>
        <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
          Tracking {watched.length} sectors · Live signals
        </div>
      </div>
      {watched.map((sec, i) => {
        const SIcon = sec.icon,
          sig = scoreToSig(sec.score),
          sigC = msigCol(sig),
          sigD = msigDim(sig);
        return (
          <MCard key={sec.id} style={{ marginBottom: 8, padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: M.accentDim,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <SIcon size={14} color={M.accent} strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: M.white }}>{sec.short}</div>
                <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                  ${sec.capLow}–{sec.capHigh}M · IRR {sec.irrHigh}%
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: M.white,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "-1px",
                  }}
                >
                  {sec.score}
                </div>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: 4,
                    background: sigD,
                    color: sigC,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {sig}
                </span>
              </div>
            </div>
          </MCard>
        );
      })}
    </div>
  );
}

function ResourcesTab() {
  const docs = [
    { title: "BRIDGE Ghana Investment Thesis 2026", type: "White Paper", date: "Mar 2026", pages: 48 },
    { title: "12-Sector Portfolio Analysis", type: "Sector Report", date: "Feb 2026", pages: 120 },
    { title: "Ejura Agricultural Hub Business Plan", type: "Business Plan", date: "Jan 2026", pages: 64 },
    { title: "Financial Inclusion Deep Dive", type: "Sector Analysis", date: "Dec 2025", pages: 35 },
    { title: "Infrastructure & Basic Services", type: "Sector Analysis", date: "Nov 2025", pages: 41 },
    { title: "Ghana 2026 Budget Alignment", type: "Policy Brief", date: "Mar 2026", pages: 22 },
  ];
  const typeCol = {
    "White Paper": M.accent,
    "Sector Report": "#60A5FA",
    "Business Plan": M.green,
    "Sector Analysis": M.amber,
    "Policy Brief": "#C084FC",
  };
  return (
    <div style={{ padding: "12px 14px 16px" }}>
      <div style={{ marginBottom: 12, padding: "4px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: M.white, marginBottom: 2 }}>Resources & Reports</div>
        <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
          {docs.length} documents · BRIDGE Intelligence Library
        </div>
      </div>
      {docs.map((doc, i) => {
        const col = typeCol[doc.type] || M.accent;
        return (
          <MCard key={i} style={{ marginBottom: 8, padding: "13px 14px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: `${col}18`,
                  border: `1px solid ${col}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Bookmark size={13} color={col} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: M.white, lineHeight: 1.3, marginBottom: 5 }}>
                  {doc.title}
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 4,
                      background: `${col}18`,
                      color: col,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {doc.type}
                  </span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{doc.date}</span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{doc.pages}pp</span>
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <ArrowUpRight size={14} color={M.muted} />
              </div>
            </div>
          </MCard>
        );
      })}
    </div>
  );
}

function DashboardTab({ s, setPage }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  const total = Math.round(totalCapAll());
  return (
    <div style={{ padding: "12px 14px 16px" }}>
      {/* Welcome row */}
      <MCard style={{ marginBottom: 10, padding: "16px 16px" }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: M.muted,
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: "Inter,sans-serif",
            marginBottom: 4,
          }}
        >
          BRIDGE Intelligence · Mar 2026
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: M.white,
            letterSpacing: "-.5px",
            lineHeight: 1.2,
            marginBottom: 6,
          }}
        >
          Ghana Investment
          <br />
          Control Panel
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            ["12 Sectors", M.accent],
            ["174 Ventures", "#60A5FA"],
            ["Live", M.green],
          ].map(([l, c]) => (
            <span
              key={l}
              style={{
                fontSize: 9,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 20,
                background: `${c}18`,
                border: `1px solid ${c}30`,
                color: c,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </MCard>
      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        {[
          { l: "Portfolio Capital", v: `$${total}M`, sub: "Across all sectors", c: M.accent },
          { l: "Active Sectors", v: "12", sub: "All deploying", c: M.green },
          { l: "Top Score", v: `${sorted[0].score}`, sub: sorted[0].short, c: M.accent },
          { l: "Signals Today", v: "48", sub: "Live intelligence", c: "#60A5FA" },
        ].map((item, i) => (
          <MCard key={i} style={{ padding: "12px 12px" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: item.c,
                letterSpacing: "-1px",
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              {item.v}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: M.white }}>{item.l}</div>
            <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>{item.sub}</div>
          </MCard>
        ))}
      </div>
      {/* Quick sector leaderboard */}
      <MCard style={{ marginBottom: 10 }}>
        <div
          style={{
            padding: "11px 14px",
            borderBottom: `1px solid ${M.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: M.white }}>Sector Leaderboard</span>
          <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>by BRIDGE Score</span>
        </div>
        {sorted.slice(0, 5).map((sec, i) => {
          const SIcon = sec.icon,
            sig = scoreToSig(sec.score),
            sigC = msigCol(sig);
          return (
            <div
              key={sec.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderBottom: `1px solid ${M.border}`,
              }}
            >
              <span
                style={{ fontSize: 11, fontWeight: 700, color: M.muted, fontFamily: "Inter,sans-serif", width: 16 }}
              >
                {i + 1}
              </span>
              <SIcon size={13} color={M.accent} strokeWidth={1.5} />
              <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: M.white }}>{sec.short}</span>
              <div style={{ width: 50, height: 3, background: M.faint, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${sec.score}%`, height: "100%", background: M.accent, borderRadius: 2 }} />
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: sigC,
                  fontFamily: "Inter,sans-serif",
                  width: 24,
                  textAlign: "right",
                }}
              >
                {sec.score}
              </span>
            </div>
          );
        })}
      </MCard>
    </div>
  );
}

/* ════════════════════════════════════════
   BOTTOM NAV
   ════════════════════════════════════════ */
const ANALYTICS_SUBS = [
  { id: "kpis", label: "KPIs" },
  { id: "performance", label: "Performance" },
  { id: "activity", label: "Activity" },
  { id: "companies", label: "Companies" },
  { id: "map", label: "Map" },
];

const NAV_ICONS = {
  dashboard: (c) => <LayoutGrid size={19} color={c} strokeWidth={1.5} />,
  overview: (c) => <Activity size={19} color={c} strokeWidth={1.5} />,
  analytics: (c) => <BarChart3 size={19} color={c} strokeWidth={1.5} />,
  watch: (c) => <Eye size={19} color={c} strokeWidth={1.5} />,
  resources: (c) => <Book size={19} color={c} strokeWidth={1.5} />,
};

function MobileBottomNav({ page, setPage, sub, setSub }) {
  const [subOpen, setSubOpen] = useState(false);

  const handleTab = (id) => {
    if (id === "analytics") {
      if (page === "analytics") setSubOpen((o) => !o);
      else {
        setPage("analytics");
        setSubOpen(true);
      }
    } else {
      setSubOpen(false);
      setPage(id);
    }
  };

  const handleSub = (id) => {
    setSub(id);
    setSubOpen(false);
  };

  const analyticsLabel =
    page === "analytics" ? ANALYTICS_SUBS.find((s) => s.id === sub)?.label || "Analytics" : "Analytics";

  const TABS = [
    { id: "dashboard", label: "Dashboard" },
    { id: "overview", label: "Overview" },
    { id: "analytics", label: analyticsLabel },
    { id: "watch", label: "Watch" },
    { id: "resources", label: "Resources" },
  ];

  return (
    <>
      {/* Backdrop */}
      {subOpen && <div onClick={() => setSubOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 98 }} />}

      {/* Analytics popover */}
      {subOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 72,
            left: "50%",
            transform: "translateX(-50%)",
            width: 160,
            background: "#0F1A12",
            border: `1px solid ${M.border}`,
            borderRadius: 16,
            padding: 6,
            boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
            zIndex: 99,
          }}
        >
          {ANALYTICS_SUBS.map((item) => {
            const act = sub === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSub(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  background: act ? M.accentDim : "transparent",
                  fontFamily: "Inter,sans-serif",
                  fontSize: 12,
                  fontWeight: act ? 700 : 500,
                  color: act ? M.accent : "rgba(255,255,255,0.5)",
                }}
              >
                {item.label}
                {act && (
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: M.accent, flexShrink: 0 }} />
                )}
              </button>
            );
          })}
          {/* Caret */}
          <div
            style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: 10,
              height: 10,
              background: "#0F1A12",
              border: `1px solid ${M.border}`,
              borderTop: "none",
              borderLeft: "none",
            }}
          />
        </div>
      )}

      {/* Footer bar */}
      <div
        style={{
          height: 64,
          background: "#050B05",
          borderTop: `1px solid ${M.border}`,
          display: "flex",
          flexShrink: 0,
          position: "relative",
          zIndex: 97,
        }}
      >
        {TABS.map((t) => {
          const act = page === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleTab(t.id)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
                padding: 0,
              }}
            >
              {act && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 20,
                    height: 2,
                    borderRadius: "0 0 3px 3px",
                    background: M.accent,
                  }}
                />
              )}
              {NAV_ICONS[t.id](act ? M.accent : M.muted)}
              <span
                style={{
                  fontSize: 9,
                  fontWeight: act ? 700 : 500,
                  color: act ? M.accent : M.muted,
                  fontFamily: "Inter,sans-serif",
                  letterSpacing: ".2px",
                  marginTop: 1,
                }}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

/* ════════════════════════════════════════
   MOBILE DASHBOARD ROOT
   ════════════════════════════════════════ */
function MobileDashboard() {
  const [s, setS] = useState(SECTORS[0]);
  const [page, setPage] = useState("overview");
  const [sub, setSub] = useState("kpis");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: M.bg,
        fontFamily: "'DM Sans',sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}::-webkit-scrollbar{display:none;}input::placeholder{color:rgba(255,255,255,0.2);}@keyframes mSlideUp{from{transform:translateY(100%);opacity:0;}to{transform:translateY(0);opacity:1;}}.mDrawer{animation:mSlideUp 0.25s ease;}`}</style>
      <MobileHeader s={s} setS={setS} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {page === "dashboard" && <DashboardTab s={s} setPage={setPage} />}
        {page === "overview" && <OverviewTab s={s} />}
        {page === "analytics" && <AnalyticsTab s={s} sub={sub} setSub={setSub} />}
        {page === "watch" && <WatchTab s={s} />}
        {page === "resources" && <ResourcesTab />}
      </div>
      <MobileBottomNav page={page} setPage={setPage} sub={sub} setSub={setSub} />
    </div>
  );
}

export default function BridgeMarketOverview() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
}

function DesktopDashboard() {
  const [s, setS] = useState(SECTORS[0]);
  const [collapsed, setCollapsed] = useState(false);
  const [notif, setNotif] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1400);
  };
  const SIcon = s.icon;
  const dynamicMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: C.bg,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-thumb{background:#E5E7EB;border-radius:4px;}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.spin{animation:spin 1s linear infinite}`}</style>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeSector={s}
        setActiveSector={(sec) => setS(sec || SECTORS[0])}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* ── Top Navigation Header ── */}
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
              <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Market Overview</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{dynamicMonth}</div>
            </div>
            <div style={{ width: 1, height: 28, background: C.line, flexShrink: 0 }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 7,
                background: C.accentBg,
                border: `1px solid rgba(184,217,53,0.27)`,
              }}
            >
              <SIcon size={11} color={C.primary} />
              <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
                {s.short}
              </span>
            </div>
          </div>

          {/* CENTER-RIGHT — Search */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
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
              <Search size={13} color={C.muted} />
              <input
                placeholder="Search sectors, ventures, signals…"
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontSize: 12,
                  color: C.mid,
                  fontFamily: "Inter,sans-serif",
                  width: "100%",
                }}
              />
            </div>

            {/* Notifications Bell */}
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
                <Bell size={15} color={C.mid} />
                <div
                  style={{
                    position: "absolute",
                    top: 7,
                    right: 7,
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: C.red,
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
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Alerts</span>
                    <span
                      style={{ fontSize: 11, color: C.accent, cursor: "pointer", fontWeight: 600 }}
                      onClick={() => setNotif(false)}
                    >
                      Mark all read
                    </span>
                  </div>
                  {s.activity.slice(0, 3).map((a, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", gap: 9, padding: "10px 14px", borderBottom: "1px solid #F3F4F6" }}
                    >
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: sigCol(a.sig),
                          marginTop: 4,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.dark, lineHeight: 1.3 }}>{a.h}</div>
                        <div style={{ fontSize: 10, color: C.muted, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                          {a.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Refresh Button */}
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
              <RefreshCw size={14} color={C.mid} className={syncing ? "spin" : ""} />
            </button>

            {/* User Profile Chip */}
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
                <User size={13} color={C.primary} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, lineHeight: 1 }}>Joseph A.</div>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>Full Access</div>
              </div>
              <ChevronDown size={11} color={C.muted} />
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 0.8fr", gap: 12, marginBottom: 12, height: 285 }}
          >
            <PortfolioSnapshot s={s} />
            <PerformanceTrend s={s} />
            <ScaleCard s={s} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <IntelligenceTicker s={s} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12, height: 310 }}>
            <DeploymentChart s={s} />
            <SubSectors s={s} />
            <Sentiment s={s} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 12, marginBottom: 12, height: 375 }}>
            <ComparisonTable s={s} setS={setS} />
            <VenturesFeed s={s} />
          </div>
          <SignalFeed s={s} />
        </div>

        {/* ── Status Bar ── */}
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
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8D935" }} />
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
          {["12 Sectors", "174 Ventures", `Active: ${s.full}`, "Data: Mar 2026"].map((label, i) => (
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
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#B8D935",
                  boxShadow: "0 0 5px #B8D935",
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#B8D935",
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
    </div>
  );
}
