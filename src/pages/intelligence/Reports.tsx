import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Activity,
  FileText,
  LayoutGrid,
  BookOpen,
  Bookmark,
  Settings,
  ArrowUpRight,
  Printer,
  Plus,
  Calendar,
  SlidersHorizontal,
  ChevronUp,
  Eye,
  FileBarChart,
  Book,
  LogOut,
} from "lucide-react";
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
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
    svgIcon: sectorSvgIcons[5],
    short: "Agriculture",
    full: "Agriculture & Value Chains",
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
      { name: "Tomato Processing Facility", cap: "$2-4M", irr: "15-20%", risk: "MEDIUM" },
      { name: "Solar Cold Storage Network", cap: "$1.5-3M", irr: "12-15%", risk: "MEDIUM" },
      { name: "Cooperative Capital Fund", cap: "$1-2M", irr: "10-14%", risk: "MEDIUM" },
      { name: "AgTech Portfolio", cap: "$1-2M", irr: "20-25%", risk: "HIGH" },
      { name: "Market Aggregation Centers", cap: "$0.5-1M", irr: "8-12%", risk: "LOW" },
    ],
    t2: [
      { name: "Fruit Processing Facility", cap: "$2-4M", irr: "14-18%", risk: "MEDIUM" },
      { name: "Cashew/Shea Processing", cap: "$1.5-3M", irr: "15-20%", risk: "MEDIUM" },
    ],
    t3: [{ name: "Cocoa Processing Facility", cap: "$3-6M", irr: "15-22%", risk: "HIGH" }],
    activity: [
      { h: "Post-Harvest Loss Crisis Brief Published", amt: "+$2M", sig: "Bullish", date: "Feb 2026" },
      { h: "GH 4.5B PFJ Phase 3 Budget Confirmed", amt: "+Policy", sig: "Bullish", date: "Mar 2026" },
      { h: "2024 Drought - 436k Farmers Affected", amt: "Risk", sig: "Watch", date: "Jan 2026" },
      { h: "Cocoa Exports Hit $372.6M", amt: "+$372M", sig: "Bullish", date: "Jan 2026" },
    ],
  },
  {
    id: "financial",
    svgIcon: sectorSvgIcons[1],
    short: "Financial Inclusion",
    full: "Financial Inclusion & Economic Security",
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
      { name: "Market Financial Services Platform", cap: "$1-3M", irr: "15-22%", risk: "MEDIUM" },
      { name: "Trader Working Capital Facility", cap: "$0.5-2M", irr: "18-25%", risk: "MEDIUM" },
      { name: "Digital Susu Integration", cap: "$0.2-0.5M", irr: "12-18%", risk: "LOW" },
    ],
    t2: [{ name: "MSME Credit Guarantee Facility", cap: "$2-5M", irr: "8-12%", risk: "MEDIUM" }],
    t3: [{ name: "BRIDGE Microfinance Institution", cap: "$5-15M", irr: "Variable", risk: "HIGH" }],
    activity: [
      { h: "Bank of Ghana Digital Credit Directive", amt: "+Policy", sig: "Bullish", date: "Mar 2026" },
      { h: "MoMo Interoperability Live", amt: "+Access", sig: "Bullish", date: "Jan 2026" },
      { h: "SME Financing Gap Widens to $2.2B", amt: "$2.2B", sig: "Watch", date: "Feb 2026" },
      { h: "Ghana Ranked #1 GSMA MoMo Index", amt: "95.06", sig: "Bullish", date: "Nov 2025" },
    ],
  },
  {
    id: "technology",
    svgIcon: sectorSvgIcons[3],
    short: "Technology",
    full: "Technology & Innovation",
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
      { name: "Kejetia Digital Platform", cap: "$3-5M", irr: "18-25%", risk: "MEDIUM" },
      { name: "BRIDGE Growth Fund", cap: "$5-10M", irr: "20-30%", risk: "HIGH" },
      { name: "Tech Talent Bridge Program", cap: "$0.3-0.6M", irr: "Break-even", risk: "LOW" },
    ],
    t2: [{ name: "Market Platform Replication", cap: "$2-4M", irr: "15-22%", risk: "MEDIUM" }],
    t3: [{ name: "AI/ML Center of Excellence", cap: "$2-5M", irr: "Variable", risk: "HIGH" }],
    activity: [
      { h: "Kejetia Phase 2 - 3,000 New Vendors", amt: "+3k", sig: "Bullish", date: "Mar 2026" },
      { h: "Ghana Joins Smart Africa Alliance", amt: "+Policy", sig: "Bullish", date: "Feb 2026" },
      { h: "Series A Desert - Only 2 Deals", amt: "-", sig: "Watch", date: "Jan 2026" },
      { h: "Ghana Leads West Africa Funding", amt: "+28%", sig: "Bullish", date: "Dec 2025" },
    ],
  },
  {
    id: "energy",
    svgIcon: sectorSvgIcons[9],
    short: "Energy",
    full: "Energy & Renewable Resources",
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
      { name: "Ghana Solar Solutions Company", cap: "$3-6M", irr: "15-22%", risk: "MEDIUM" },
      { name: "Clean Cooking Distribution", cap: "$2-4M", irr: "12-18%", risk: "MEDIUM" },
    ],
    t2: [{ name: "Community Mini-Grid Development", cap: "$2-5M", irr: "14-20%", risk: "MEDIUM" }],
    t3: [{ name: "EV Charging Infrastructure", cap: "$2-4M", irr: "12-18%", risk: "HIGH" }],
    activity: [
      { h: "Solar Park: 200MW to 1GW Expansion", amt: "+800MW", sig: "Bullish", date: "Mar 2026" },
      { h: "$200M Clean Cooking Outcome Bond", amt: "$200M", sig: "Bullish", date: "Feb 2026" },
      { h: "Dumsor Returns - Business Losses", amt: "-$900M", sig: "Watch", date: "Jan 2026" },
      { h: "Solar Costs Down 89% Since 2010", amt: "-89%", sig: "Bullish", date: "Dec 2025" },
    ],
  },
  {
    id: "infrastructure",
    svgIcon: sectorSvgIcons[0],
    short: "Infrastructure",
    full: "Infrastructure & Basic Services",
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
      { name: "Rural Connectivity Platform", cap: "$2-4M", irr: "12-18%", risk: "MEDIUM" },
      { name: "Water Systems Management Co.", cap: "$2-4M", irr: "10-15%", risk: "LOW" },
    ],
    t2: [{ name: "Urban Infrastructure Fund", cap: "$3-6M", irr: "10-15%", risk: "MEDIUM" }],
    t3: [{ name: "Smart City Infrastructure", cap: "$3-7M", irr: "Variable", risk: "HIGH" }],
    activity: [
      { h: "GH 18B+ Infra Allocation Locked", amt: "+Policy", sig: "Bullish", date: "Mar 2026" },
      { h: "Roads Authority Fast-Track Program", amt: "+Ops", sig: "Bullish", date: "Feb 2026" },
      { h: "Water & Sanitation: Only 27% Coverage", amt: "-73%", sig: "Watch", date: "Jan 2026" },
    ],
  },
  {
    id: "health",
    svgIcon: sectorSvgIcons[2],
    short: "Health Systems",
    full: "Health Systems & Wellbeing",
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
      { name: "Community Health Worker Platform", cap: "$1.5-3M", irr: "Social", risk: "LOW" },
      { name: "Medical Supply Chain Co.", cap: "$2-4M", irr: "14-20%", risk: "MEDIUM" },
    ],
    t2: [{ name: "Telemedicine Network", cap: "$1-2.5M", irr: "12-18%", risk: "MEDIUM" }],
    t3: [{ name: "HealthTech Investment Portfolio", cap: "$1-3M", irr: "18-25%", risk: "HIGH" }],
    activity: [
      { h: "NHIA Expands Digital Claims Processing", amt: "+Access", sig: "Bullish", date: "Feb 2026" },
      { h: "GH 8.2B Health Allocation +12% YoY", amt: "+12%", sig: "Bullish", date: "Mar 2026" },
      { h: "Workforce Gap: 40k Workers Needed", amt: "-40k", sig: "Watch", date: "Jan 2026" },
    ],
  },
  {
    id: "education",
    svgIcon: sectorSvgIcons[4],
    short: "Education",
    full: "Education & Skills",
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
      { name: "TVET Partnership Program", cap: "$3-6M", irr: "Social+", risk: "MEDIUM" },
      { name: "Diaspora Scholarship Fund", cap: "$2-3M", irr: "Social+", risk: "LOW" },
    ],
    t2: [{ name: "TVET Regional Expansion", cap: "$2-4M", irr: "Social+", risk: "MEDIUM" }],
    t3: [{ name: "BRIDGE Training Center Kumasi", cap: "$2-4M", irr: "12-18%", risk: "MEDIUM" }],
    activity: [
      { h: "MoE TVET Overhaul - GH 2B Committed", amt: "+Policy", sig: "Bullish", date: "Jan 2026" },
      { h: "Ghana Youth Unemployment 13.4%", amt: "-", sig: "Watch", date: "Feb 2026" },
      { h: "Diaspora Fellowship: 120 Placements", amt: "+120", sig: "Bullish", date: "Mar 2026" },
    ],
  },
  {
    id: "housing",
    svgIcon: sectorSvgIcons[7],
    short: "Housing",
    full: "Housing & Real Estate",
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
      { name: "Affordable Housing Developer", cap: "$8-15M", irr: "14-20%", risk: "MEDIUM" },
      { name: "Construction Finance Platform", cap: "$4-8M", irr: "12-18%", risk: "MEDIUM" },
    ],
    t2: [{ name: "Diaspora Housing Product", cap: "$2-4M", irr: "10-15%", risk: "LOW" }],
    t3: [{ name: "Building Materials Supply Co.", cap: "$2-4M", irr: "14-18%", risk: "MEDIUM" }],
    activity: [
      { h: "NHA PPP Framework Opens Private Entry", amt: "+Policy", sig: "Bullish", date: "Feb 2026" },
      { h: "Mortgage Penetration Below 2%", amt: "<2%", sig: "Watch", date: "Jan 2026" },
      { h: "Diaspora Housing Survey: 78% Interested", amt: "+Demand", sig: "Bullish", date: "Dec 2025" },
    ],
  },
  {
    id: "manufacturing",
    svgIcon: sectorSvgIcons[10],
    short: "Manufacturing",
    full: "Manufacturing & Light Industry",
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
      { name: "Agro-Processing Facility", cap: "$5-10M", irr: "15-20%", risk: "MEDIUM" },
      { name: "Packaging Solutions Company", cap: "$3-6M", irr: "14-18%", risk: "MEDIUM" },
    ],
    t2: [{ name: "Consumer Goods Manufacturer", cap: "$4-8M", irr: "14-20%", risk: "MEDIUM" }],
    t3: [{ name: "Export Processing Facility", cap: "$5-10M", irr: "15-22%", risk: "HIGH" }],
    activity: [
      { h: "GH 5B Manufacturing Incentive Package", amt: "+Policy", sig: "Bullish", date: "Mar 2026" },
      { h: "5-Year Tax Holiday for Manufacturers", amt: "+Tax", sig: "Bullish", date: "Mar 2026" },
      { h: "Import Bill Grows to $8.2B", amt: "$8.2B", sig: "Watch", date: "Feb 2026" },
    ],
  },
  {
    id: "transportation",
    svgIcon: sectorSvgIcons[11],
    short: "Transportation",
    full: "Transportation & Logistics",
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
      { name: "Cold Chain Ghana", cap: "$3-6M", irr: "16-22%", risk: "MEDIUM" },
      { name: "Ghana Last Mile Delivery", cap: "$2-4M", irr: "14-20%", risk: "MEDIUM" },
    ],
    t2: [{ name: "Pharma Cold Chain Services", cap: "$1.5-3M", irr: "16-22%", risk: "MEDIUM" }],
    t3: [{ name: "Rail Logistics Integration", cap: "$2-5M", irr: "12-16%", risk: "HIGH" }],
    activity: [
      { h: "Tema Port Phase 2 - $1.5B Investment", amt: "$1.5B", sig: "Bullish", date: "Feb 2026" },
      { h: "Connect24: 18% Logistics Cost Reduction", amt: "-18%", sig: "Bullish", date: "Jan 2026" },
      { h: "Cold Chain Revenue: $900M/yr Potential", amt: "$900M", sig: "Bullish", date: "Dec 2025" },
    ],
  },
  {
    id: "tourism",
    svgIcon: sectorSvgIcons[8],
    short: "Tourism",
    full: "Tourism & Hospitality",
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
      { name: "Heritage Tourism Network", cap: "$3-6M", irr: "14-20%", risk: "MEDIUM" },
      { name: "Hospitality Training Academy", cap: "$1.5-3M", irr: "Social+", risk: "LOW" },
    ],
    t2: [{ name: "Eco-Tourism Development Fund", cap: "$2-4M", irr: "12-18%", risk: "MEDIUM" }],
    t3: [{ name: "Destination Development Company", cap: "$3-6M", irr: "12-18%", risk: "HIGH" }],
    activity: [
      { h: "Ghana Tourism Authority New Brand", amt: "+Brand", sig: "Bullish", date: "Jan 2026" },
      { h: "Accra MICE Tourism Up 35%", amt: "+35%", sig: "Bullish", date: "Feb 2026" },
      { h: "Hotel Occupancy 58% National Average", amt: "58%", sig: "Watch", date: "Dec 2025" },
    ],
  },
  {
    id: "creative",
    svgIcon: sectorSvgIcons[6],
    short: "Creative Industries",
    full: "Sports, Entertainment & Creative",
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
      { name: "Content Production Studio", cap: "$2-4M", irr: "15-22%", risk: "MEDIUM" },
      { name: "Talent Development Platform", cap: "$1.5-3M", irr: "Social+", risk: "LOW" },
    ],
    t2: [{ name: "IP Monetisation Platform", cap: "$1.5-3M", irr: "20-28%", risk: "HIGH" }],
    t3: [{ name: "Creative Hub Network", cap: "$2-5M", irr: "12-18%", risk: "MEDIUM" }],
    activity: [
      { h: "Ghana Music Awards - 40% Viewership Growth", amt: "+40%", sig: "Bullish", date: "Jan 2026" },
      { h: "Afrobeats Streams 45M Monthly Listeners", amt: "45M", sig: "Bullish", date: "Feb 2026" },
      { h: "IP Piracy Costs Creative Sector $400M+", amt: "-$400M", sig: "Watch", date: "Dec 2025" },
    ],
  },
];

const TABS = [
  { id: "sector-performance", label: "Sector Performance" },
  { id: "market-analysis", label: "Market Analysis" },
  { id: "sub-sector-breakdown", label: "Sub-sector" },
  { id: "financials", label: "Financials" },
  { id: "growth-tracking", label: "Growth" },
  { id: "comparative-analysis", label: "Comparative" },
  { id: "monthly-summary", label: "Monthly" },
  { id: "signal-tracker", label: "Signals" },
];

const sigCol = (s) => (s === "Bullish" ? C.green : s === "Bearish" ? C.red : C.yellow);
const sigBg = (s) => (s === "Bullish" ? "#DCFCE7" : s === "Bearish" ? "#FEE2E2" : "#FEF9C3");

function genBarData(s, tab, filter) {
  const days =
    filter === "7D"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : filter === "30D"
        ? ["Wk1", "Wk2", "Wk3", "Wk4"]
        : ["Jan", "Feb", "Mar"];
  return days.map((day, i) => ({
    day,
    primary: Math.round(s.score * (0.75 + Math.sin(i * 1.3 + s.score * 0.04) * 0.15 + i * 0.025)),
    secondary: Math.round(s.score * (0.45 + Math.sin(i * 0.9) * 0.1 + i * 0.015)),
  }));
}
function genMonthlyData(s) {
  return ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"].map((month, i) => {
    const base = ((s.capLow + s.capHigh) / 2) * 100;
    const growth = Math.round(base * (1.0 + Math.sin(i * 0.8) * 0.2 + i * 0.1));
    const expenses = Math.round(growth * (0.28 + Math.sin(i * 0.5) * 0.06));
    return { month, growth, expenses, net: growth - expenses };
  });
}
function genTableRows(s) {
  const cats = ["Earnings", "Revenue", "CapEx", "M&A", "Policy", "Signal", "Supply Chain", "Investment"];
  const stats = ["-", "Active", "Monitoring", "Closed"];
  const rows = [];
  s.activity.forEach((a, i) =>
    rows.push({
      id: `${s.id}-${i}`,
      sector: s.short,
      sectorId: s.id,
      date: a.date,
      status: stats[i % stats.length],
      source: a.h.length > 32 ? a.h.substring(0, 32) + "..." : a.h,
      category: cats[i % cats.length],
      tags: s.subSectors.slice(0, i % 3 === 0 ? 2 : 1).map((ss) => ss.name.split(" ")[0]),
      signal: a.sig,
      value: a.amt,
    }),
  );
  SECTORS.filter((sec) => sec.id !== s.id)
    .slice(0, 9)
    .forEach((sec, i) => {
      const act = sec.activity[i % sec.activity.length];
      if (act)
        rows.push({
          id: `x-${sec.id}-${i}`,
          sector: sec.short,
          sectorId: sec.id,
          date: act.date,
          status: stats[(i + 1) % stats.length],
          source: act.h.length > 32 ? act.h.substring(0, 32) + "..." : act.h,
          category: cats[(i + 3) % cats.length],
          tags: [sec.subSectors[0]?.name.split(" ")[0] || "General"],
          signal: act.sig,
          value: act.amt,
        });
    });
  return rows;
}
function getTabMetrics(s, tab) {
  const b = s.activity.filter((a) => a.sig === "Bullish").length;
  const rank = [...SECTORS].sort((a, b) => b.score - a.score).findIndex((x) => x.id === s.id) + 1;
  const m = {
    "sector-performance": {
      p: { l: "Avg. Growth Rate", v: `${Math.round(s.score * 0.92)}%`, t: "+24%", up: true },
      s: { l: "Avg. Volatility", v: `${Math.round(s.score * 0.42)}%`, t: "-10%", up: false },
    },
    "market-analysis": {
      p: { l: "Bullish Signals", v: `${b * 21}`, t: "+18%", up: true },
      s: { l: "Bear Signals", v: `${(s.activity.length - b) * 9}`, t: "-5%", up: false },
    },
    "sub-sector-breakdown": {
      p: { l: s.subSectors[0]?.name, v: `${s.subSectors[0]?.pct}%`, t: "+8%", up: true },
      s: { l: s.subSectors[1]?.name, v: `${s.subSectors[1]?.pct}%`, t: "+3%", up: true },
    },
    financials: {
      p: { l: "Total Revenue", v: `$${s.capHigh}M`, t: "+15%", up: true },
      s: { l: "Operating Costs", v: `$${Math.round(s.capLow * 0.4)}M`, t: "+2%", up: false },
    },
    "growth-tracking": {
      p: { l: "Goal Completion", v: `${Math.round(s.score * 0.88)}%`, t: "+12%", up: true },
      s: { l: "Target Gap", v: `${100 - Math.round(s.score * 0.88)}%`, t: "-4%", up: false },
    },
    "comparative-analysis": {
      p: { l: "Sector Rank", v: `#${rank}`, t: "of 12", up: true },
      s: { l: "vs Benchmark", v: `+${Math.round(s.score - 80)}pts`, t: "+5%", up: true },
    },
    "monthly-summary": {
      p: { l: "Month High", v: `${Math.round(s.score * 1.08)}`, t: "+11%", up: true },
      s: { l: "Month Low", v: `${Math.round(s.score * 0.82)}`, t: "-6%", up: false },
    },
    "signal-tracker": {
      p: { l: "Total Signals", v: `${s.activity.length * 18}`, t: "+14%", up: true },
      s: { l: "Active Alerts", v: `${b * 7}`, t: "+9%", up: true },
    },
  };
  return m[tab] || m["sector-performance"];
}
function getTabStats(s, tab) {
  const b = s.activity.filter((a) => a.sig === "Bullish").length;
  const rank = [...SECTORS].sort((a, bv) => bv.score - a.score).findIndex((x) => x.id === s.id) + 1;
  const m = {
    "sector-performance": [
      { v: `${s.activity.length * 18}`, l: "Signals Sent" },
      { v: `${Math.round(s.score * 0.42)}%`, l: "Volatility Rate" },
      { v: `${Math.round(s.score * 0.08)}%`, l: "Correction Rate" },
      { v: `${Math.round(s.score * 0.9)}%`, l: "Health Score" },
    ],
    "market-analysis": [
      { v: `${b * 21}`, l: "Bull Signals" },
      { v: `${(s.activity.length - b) * 9}`, l: "Bear Signals" },
      { v: `${(s.activity.length - b) * 5}`, l: "Neutral" },
      { v: `${s.score}%`, l: "Confidence" },
    ],
    "sub-sector-breakdown": s.subSectors.slice(0, 4).map((ss) => ({ v: `${ss.pct}%`, l: ss.name })),
    financials: [
      { v: `$${s.capHigh}M`, l: "Total Revenue" },
      { v: `$${Math.round(s.capLow * 0.4)}M`, l: "Expenses" },
      { v: `$${s.capHigh - Math.round(s.capLow * 0.4)}M`, l: "Net Income" },
      { v: `${s.irrLow}-${s.irrHigh}%`, l: "IRR Range" },
    ],
    "growth-tracking": [
      { v: `${Math.round(s.score * 0.88)}%`, l: "Goal Completion" },
      { v: `$${s.capLow}M`, l: "Capital Raised" },
      { v: `${s.irrHigh}%`, l: "Peak IRR" },
      { v: `${s.totalV}`, l: "Active Ventures" },
    ],
    "comparative-analysis": [
      { v: `#${rank}`, l: "Sector Rank" },
      { v: `${s.score}`, l: "BRIDGE Score" },
      { v: `+${Math.round(s.score - 80)}pts`, l: "vs Benchmark" },
      { v: `${s.totalV}`, l: "Total Ventures" },
    ],
    "monthly-summary": [
      { v: `${Math.round(s.score * 1.08)}`, l: "Month High" },
      { v: `${Math.round(s.score * 0.82)}`, l: "Month Low" },
      { v: `${s.score}`, l: "Current Score" },
      { v: `+${Math.round((s.score * 1.08 - s.score * 0.82) / 2)}`, l: "Avg Change" },
    ],
    "signal-tracker": [
      { v: `${s.activity.length * 18}`, l: "Total Signals" },
      { v: `${b * 7}`, l: "Active Alerts" },
      { v: `${(s.activity.length - b) * 4}`, l: "Monitoring" },
      { v: `${Math.round((b / s.activity.length) * 100)}%`, l: "Bullish Rate" },
    ],
  };
  return m[tab] || m["sector-performance"];
}

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
const ChartTip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
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
            {p.name}: <strong>{p.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};

function BridgeLogo() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3434.33 932.3"
        style={{ width: 104, height: 28, display: "block", marginBottom: 4 }}
      >
        <defs>
          <style>{`.cls-1{stroke:#fff;stroke-width:80px;}.cls-1,.cls-2,.cls-3,.cls-4{stroke-miterlimit:10;}.cls-1,.cls-3{fill:none;}.cls-2{stroke:#1b4d3e;}.cls-2,.cls-5{fill:#B8D935;}.cls-3{stroke:#231f20;stroke-width:5px;}.cls-6,.cls-4{fill:#fff;}.cls-4{stroke:#000;stroke-width:.5px;}.cls-8{fill:#fff;}`}</style>
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

function Sidebar({ collapsed, setCollapsed, activeSector, setActiveSector }) {
  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: (c) => <LayoutGrid size={16} color={c} /> },
    { id: "overview", label: "Market Overview", icon: (c) => <Activity size={16} color={c} /> },
    { id: "analytics", label: "Analytics", icon: (c) => <BarChart3 size={16} color={c} /> },
    { id: "watchlist", label: "Watchlist", icon: (c) => <Eye size={16} color={c} /> },
    { id: "reports", label: "Reports", icon: (c) => <FileBarChart size={16} color={c} />, active: true },
    { id: "resources", label: "Resources", icon: (c) => <Book size={16} color={c} /> },
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
        {NAV.map((n) => {
          const act = n.active || false;
          return (
            <div
              key={n.id}
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
              onMouseEnter={(e) => {
                if (!act) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                if (!act) e.currentTarget.style.background = "transparent";
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
              onClick={() => setActiveSector(act ? null : sec)}
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
              onMouseEnter={(e) => {
                if (!act) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = act ? C.sideAct : "transparent";
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

function MetricsChartCard({ s, tab, chartFilter, setChartFilter }) {
  const data = genBarData(s, tab, chartFilter);
  const metrics = getTabMetrics(s, tab);
  const stats = getTabStats(s, tab);
  return (
    <Card style={{ padding: 0, height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
            {tab
              .split("-")
              .map((w) => w[0].toUpperCase() + w.slice(1))
              .join(" ")}
          </div>
          <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
            {["7D", "30D", "90D"].map((v) => (
              <button
                key={v}
                onClick={() => setChartFilter(v)}
                style={{
                  padding: "3px 8px",
                  borderRadius: 5,
                  border: "none",
                  background: chartFilter === v ? "#fff" : "transparent",
                  fontSize: 10,
                  fontWeight: 600,
                  color: chartFilter === v ? C.primary : C.muted,
                  cursor: "pointer",
                  boxShadow: chartFilter === v ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {[metrics.p, metrics.s].map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {i > 0 && <div style={{ width: 1, height: 36, background: "#E5E7EB" }} />}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                  <div
                    style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? C.accent : `${C.teal}88` }}
                  />
                  <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{m.l}</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: C.dark, letterSpacing: "-1px" }}>{m.v}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "2px 4px", borderRadius: 5 }}>
                    {m.up ? <TrendingUp size={9} color={C.green} /> : <TrendingDown size={9} color={C.red} />}
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: m.up ? C.green : C.red,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {m.t}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 190, padding: "10px 8px 0", flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RBarChart
            data={data}
            barSize={26}
            barCategoryGap="30%"
            barGap={3}
            margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="primary" fill={C.accent} radius={[4, 4, 0, 0]} name="Primary" />
            <Bar dataKey="secondary" fill={`${C.teal}66`} radius={[4, 4, 0, 0]} name="Secondary" />
          </RBarChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid #F3F4F6", flexShrink: 0 }}
      >
        {stats.map((stat, i) => (
          <div key={i} style={{ padding: "12px 16px", borderRight: i < 3 ? "1px solid #F3F4F6" : "none" }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, letterSpacing: "-.5px", lineHeight: 1 }}>
              {stat.v}
            </div>
            <div
              style={{
                fontSize: 9,
                color: C.muted,
                fontFamily: "Inter,sans-serif",
                marginTop: 3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                letterSpacing: "0.3px",
              }}
            >
              {stat.l}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DonutGoalCard({ s }) {
  const totalCap = Math.round(((s.capLow + s.capHigh) / 2) * 10) / 10;
  const donutData = [
    { name: "Market Cap", value: s.subSectors[0]?.pct || 35, color: C.primary },
    { name: "Growth", value: s.subSectors[1]?.pct || 25, color: C.accent },
    { name: "Volatility", value: 100 - (s.subSectors[0]?.pct || 35) - (s.subSectors[1]?.pct || 25), color: "#E5E7EB" },
  ];
  const bullish = s.activity.filter((a) => a.sig === "Bullish").length;
  const goals = [
    { count: s.totalV, label: "Ventures Tracked", pct: Math.round((s.totalV / 20) * 100), color: C.primary },
    {
      count: s.activity.length * 18,
      label: "Active Signals",
      pct: Math.round((bullish / s.activity.length) * 100),
      color: C.accent,
    },
    { count: 12, label: "Sectors Covered", pct: 100, color: "#F59E0B" },
  ];
  return (
    <Card style={{ padding: 0, height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid #F3F4F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Value</div>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
          {["7D", "30D"].map((v, i) => (
            <button
              key={v}
              style={{
                padding: "2px 7px",
                borderRadius: 5,
                border: "none",
                background: i === 0 ? "#fff" : "transparent",
                fontSize: 9,
                fontWeight: 600,
                color: i === 0 ? C.primary : C.muted,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 14px", display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ position: "relative", width: 110, height: 110, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {donutData.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, color: C.dark, lineHeight: 1 }}>${totalCap}M</div>
            <div style={{ fontSize: 8, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>Cap</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: C.dark, letterSpacing: "-1px", marginBottom: 8 }}>
            ${totalCap}M
          </div>
          {donutData.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: i < 2 ? 5 : 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: d.color }} />
                <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{d.name}</span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ height: 1, background: "#F3F4F6", marginBottom: 2 }} />
        {goals.map((g, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.dark, letterSpacing: "-.5px", lineHeight: 1 }}>
                  {g.count}
                </div>
                <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                  {g.label}
                </div>
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: g.color, fontFamily: "Inter,sans-serif" }}>
                {g.pct}% goal
              </span>
            </div>
            <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${g.pct}%`, height: "100%", background: g.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ComposedChartRow({ s, overtimeView, setOvertimeView }) {
  const data = genMonthlyData(s);
  const total = data.reduce((a, d) => a + d.growth, 0);
  const last = data[data.length - 1];
  return (
    <Card style={{ padding: 0 }}>
      <div style={{ display: "flex", height: 320 }}>
        <div style={{ flex: 1, padding: "16px 8px 16px 16px", display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Capital Flow Analysis</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                Growth revenue · Operating costs · Net income · 6 months
              </div>
            </div>
            <button
              onClick={() => setOvertimeView((o) => !o)}
              style={{
                padding: "4px 10px",
                borderRadius: 7,
                border: `1px solid ${overtimeView ? C.accent : "#E5E7EB"}`,
                background: overtimeView ? C.accentBg : "#fff",
                fontSize: 10,
                fontWeight: 600,
                color: overtimeView ? C.primary : C.muted,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              Overtime
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: C.muted }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => (overtimeView ? `${Math.round(v / 10)}%` : `$${v}`)}
                />
                <Tooltip content={<ChartTip />} />
                <ReferenceLine y={0} stroke="#E5E7EB" strokeDasharray="3 3" />
                <Bar
                  dataKey="growth"
                  fill={C.accent}
                  fillOpacity={0.9}
                  radius={[4, 4, 0, 0]}
                  name="Growth"
                  barSize={22}
                />
                <Bar
                  dataKey="expenses"
                  fill={C.teal}
                  fillOpacity={0.55}
                  radius={[4, 4, 0, 0]}
                  name="Expenses"
                  barSize={22}
                />
                <Line
                  type="monotone"
                  dataKey="net"
                  stroke="#F59E0B"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={{ r: 3.5, fill: "#F59E0B", strokeWidth: 0 }}
                  name="Net Income"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div
          style={{
            width: 190,
            flexShrink: 0,
            borderLeft: "1px solid #F3F4F6",
            padding: "16px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.muted,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "Inter,sans-serif",
                marginBottom: 5,
              }}
            >
              Total Capital
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.dark, letterSpacing: "-1.5px", lineHeight: 1 }}>
              ${total.toLocaleString()}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 4,
                fontSize: 9,
                color: C.muted,
                fontFamily: "Inter,sans-serif",
              }}
            >
              <Calendar size={9} color={C.muted} /> Aug 01 – Jan 31
            </div>
          </div>
          <div style={{ height: 1, background: "#F3F4F6", marginBottom: 14 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            {[
              { color: C.accent, label: "Growth Revenue", v: `$${last.growth}` },
              { color: C.teal, label: "Operating Costs", v: `$${last.expenses}` },
              { color: "#F59E0B", label: "Net Income", v: `$${last.net}` },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: row.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: C.mid, fontFamily: "Inter,sans-serif" }}>{row.label}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                  {row.v}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 14,
              padding: "12px 14px",
              background: "#F9FAFB",
              borderRadius: 10,
              border: "1px solid #F3F4F6",
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.muted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: 4,
              }}
            >
              Net Margin
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.green, letterSpacing: "-1px", lineHeight: 1 }}>
              {Math.round((last.net / last.growth) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function TabPanel({ s, tab }) {
  if (["sector-performance", "market-analysis", "growth-tracking", "signal-tracker"].includes(tab)) return null;
  if (tab === "sub-sector-breakdown")
    return (
      <Card style={{ padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 12 }}>Sub-sector Distribution</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
          {s.subSectors.map((ss, i) => (
            <div
              key={i}
              style={{
                padding: "16px 14px 14px",
                background: "#FAFAFA",
                borderRadius: 12,
                border: "1px solid #EFEFEF",
                textAlign: "center",
                cursor: "pointer",
                transition: "box-shadow 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div style={{ width: "100%", height: 4, borderRadius: 2, background: ss.color, marginBottom: 12 }} />
              <div style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: "-0.5px", lineHeight: 1 }}>
                {ss.pct}%
              </div>
              <div
                style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 5, marginBottom: 8 }}
              >
                {ss.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                <TrendingUp size={9} color={C.green} />
                <span style={{ fontSize: 9, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
                  +{Math.round(ss.pct * 0.12)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  if (tab === "financials")
    return (
      <Card style={{ padding: 0, marginBottom: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {[
            { l: "Total Revenue", v: `$${s.capHigh}M`, chg: "+15.2%", col: C.green },
            { l: "Total Expenses", v: `$${Math.round(s.capLow * 0.4)}M`, chg: "+2.1%", col: "#F59E0B" },
            { l: "Net Income", v: `$${s.capHigh - Math.round(s.capLow * 0.4)}M`, chg: "+18.4%", col: C.green },
          ].map((item, i) => (
            <div key={i} style={{ padding: "22px 24px", borderRight: i < 2 ? "1px solid #F3F4F6" : "none" }}>
              <div
                style={{
                  fontSize: 10,
                  color: C.muted,
                  fontFamily: "Inter,sans-serif",
                  marginBottom: 8,
                  letterSpacing: "0.3px",
                }}
              >
                {item.l}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: C.dark,
                  letterSpacing: "-1.5px",
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {item.v}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <TrendingUp size={12} color={item.col} />
                <span style={{ fontSize: 11, fontWeight: 700, color: item.col, fontFamily: "Inter,sans-serif" }}>
                  {item.chg} MoM
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  if (tab === "comparative-analysis") {
    const ranked = [...SECTORS].sort((a, b) => b.score - a.score);
    return (
      <Card style={{ padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 12 }}>
          All Sectors - BRIDGE Score Ranking
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {ranked.map((sec, i) => {
            const act = sec.id === s.id;
            return (
              <div key={sec.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: act ? C.accent : C.muted,
                    fontFamily: "Inter,sans-serif",
                    width: 16,
                    textAlign: "right",
                  }}
                >
                  {i + 1}
                </span>
                {sec.svgIcon(act ? C.primary : C.muted, 11)}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: act ? 700 : 400,
                    color: act ? C.dark : C.mid,
                    fontFamily: "Inter,sans-serif",
                    width: 130,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {sec.short}
                </span>
                <div style={{ flex: 1, height: 6, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${sec.score}%`,
                      height: "100%",
                      background: act ? C.accent : C.line,
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: act ? C.accent : C.muted,
                    fontFamily: "Inter,sans-serif",
                    width: 28,
                    textAlign: "right",
                  }}
                >
                  {sec.score}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
  if (tab === "monthly-summary") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (
      <Card style={{ padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 12 }}>
          Monthly Performance Grid 2025/2026
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
          {months.map((m, i) => {
            const val = Math.round(s.score * (0.85 + Math.sin(i * 0.9 + s.score * 0.03) * 0.12 + i * 0.01));
            const up = val >= s.score,
              cur = m === "Jan";
            return (
              <div
                key={m}
                style={{
                  padding: "12px 14px",
                  background: cur ? "#EBF5B0" : "#F9FAFB",
                  borderRadius: 10,
                  border: `1px solid ${cur ? C.accent + "55" : "#EDEDED"}`,
                  cursor: "pointer",
                  transition: "box-shadow 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: cur ? C.primary : "#9CA3AF",
                    fontFamily: "Inter,sans-serif",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {m}
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.dark, lineHeight: 1, letterSpacing: "-0.5px" }}>
                  {val}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 5 }}>
                  {up ? <TrendingUp size={9} color={C.green} /> : <TrendingDown size={9} color={C.red} />}
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: up ? C.green : C.red,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {up ? `+${val - s.score}` : `${val - s.score}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
  return null;
}

function ActivityTable({
  s,
  tableSearch,
  setTableSearch,
  tableSort,
  setTableSort,
  tablePage,
  setTablePage,
  selectedRows,
  setSelectedRows,
}) {
  const PAGE_SIZE = 8;
  const allRows = genTableRows(s);
  const filtered = allRows.filter(
    (r) =>
      !tableSearch ||
      [r.source, r.category, r.signal, r.sector].some((f) => f.toLowerCase().includes(tableSearch.toLowerCase())),
  );
  const sorted = [...filtered].sort((a, b) => {
    if (tableSort.dir === "asc") return a[tableSort.col] > b[tableSort.col] ? 1 : -1;
    return a[tableSort.col] < b[tableSort.col] ? 1 : -1;
  });
  const pageRows = sorted.slice((tablePage - 1) * PAGE_SIZE, tablePage * PAGE_SIZE);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const sortBy = (col) => setTableSort((p) => ({ col, dir: p.col === col && p.dir === "desc" ? "asc" : "desc" }));
  const toggleRow = (id) => setSelectedRows((p) => (p.includes(id) ? p.filter((r) => r !== id) : [...p, id]));
  const toggleAll = () => setSelectedRows((p) => (p.length === pageRows.length ? [] : pageRows.map((r) => r.id)));
  const cols = [
    ["sector", "Sector", true],
    ["date", "Date", true],
    ["status", "Status", false],
    ["source", "Source", false],
    ["category", "Category", true],
    ["tags", "Tags", false],
    ["signal", "Signal", true],
    ["value", "Value", false],
  ];
  return (
    <Card style={{ padding: 0 }}>
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Activity Log</div>
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
              Showing {(tablePage - 1) * PAGE_SIZE + 1}-{Math.min(tablePage * PAGE_SIZE, filtered.length)} of{" "}
              {filtered.length} activities
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "5px 10px",
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
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "5px 10px",
                borderRadius: 7,
                border: `1px solid ${C.accent}`,
                background: C.accentBg,
                fontSize: 10,
                color: C.primary,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
                fontWeight: 600,
              }}
            >
              <Plus size={11} />
              Add
            </button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              flex: 1,
              maxWidth: 300,
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
              value={tableSearch}
              onChange={(e) => {
                setTableSearch(e.target.value);
                setTablePage(1);
              }}
              placeholder="Search activities..."
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
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "5px 10px",
              borderRadius: 7,
              border: "1px solid #E5E7EB",
              background: "#fff",
              fontSize: 10,
              color: C.muted,
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            <SlidersHorizontal size={11} />
            Filter
          </button>
          <div style={{ display: "flex", gap: 5, marginLeft: "auto" }}>
            {["Bullish", "Watch"].map((v) => (
              <div
                key={v}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "3px 8px",
                  borderRadius: 5,
                  background: sigBg(v),
                }}
              >
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: sigCol(v) }} />
                <span style={{ fontSize: 9, fontWeight: 600, color: sigCol(v), fontFamily: "Inter,sans-serif" }}>
                  {v}: {filtered.filter((r) => r.signal === v).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedRows.length > 0 && (
        <div
          style={{
            padding: "7px 14px",
            background: C.accentBg,
            borderBottom: `1px solid ${C.accent}44`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
            {selectedRows.length} selected
          </span>
          {["Export", "Tag", "Delete"].map((a) => (
            <button
              key={a}
              style={{
                padding: "3px 10px",
                borderRadius: 6,
                border: "1px solid #E5E7EB",
                background: "#fff",
                fontSize: 10,
                color: C.mid,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {a}
            </button>
          ))}
          <button
            onClick={() => setSelectedRows([])}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: C.muted }}
          >
            <ChevronUp size={13} />
          </button>
        </div>
      )}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
              <th style={{ padding: "8px 10px", width: 32 }}>
                <input
                  type="checkbox"
                  checked={selectedRows.length === pageRows.length && pageRows.length > 0}
                  onChange={toggleAll}
                  style={{ cursor: "pointer", accentColor: C.primary }}
                />
              </th>
              {cols.map(([key, label, sortable]) => (
                <th
                  key={key}
                  onClick={sortable ? () => sortBy(key) : undefined}
                  style={{
                    padding: "8px 10px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    textAlign: "left",
                    cursor: sortable ? "pointer" : "default",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    {label}
                    {sortable && tableSort.col === key && (
                      <span style={{ color: C.accent }}>{tableSort.dir === "asc" ? "up" : "down"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => {
              const sec = SECTORS.find((x) => x.id === row.sectorId);
              const Icon = (sec as any)?.svgIcon ? null : FileText;
              const sel = selectedRows.includes(row.id);
              const isPrimary = row.sectorId === s.id;
              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: "1px solid #F9FAFB",
                    background: sel ? `${C.accent}09` : isPrimary ? `${C.primary}04` : "transparent",
                    transition: "background .1s",
                  }}
                  onMouseEnter={(e) => {
                    if (!sel) e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = sel
                      ? `${C.accent}09`
                      : isPrimary
                        ? `${C.primary}04`
                        : "transparent";
                  }}
                >
                  <td style={{ padding: "9px 10px" }}>
                    <input
                      type="checkbox"
                      checked={sel}
                      onChange={() => toggleRow(row.id)}
                      style={{ cursor: "pointer", accentColor: C.primary }}
                    />
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 5,
                          background: isPrimary ? C.accentBg : "#F3F5F2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={10} color={isPrimary ? C.primary : C.teal} />
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: isPrimary ? 700 : 400,
                          color: C.dark,
                          fontFamily: "Inter,sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.sector}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <span style={{ fontSize: 11, color: C.mid, fontFamily: "Inter,sans-serif", whiteSpace: "nowrap" }}>
                      {row.date}
                    </span>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <span
                      style={{
                        fontSize: 10,
                        padding: "2px 0",
                        borderRadius: 4,
                        background: "transparent",
                        color: row.status === "Active" ? C.green : row.status === "Monitoring" ? C.yellow : C.muted,
                        fontFamily: "Inter,sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        color: C.dark,
                        fontFamily: "Inter,sans-serif",
                        maxWidth: 200,
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.source}
                    </span>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <span style={{ fontSize: 10, color: C.mid, fontFamily: "Inter,sans-serif" }}>{row.category}</span>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <div style={{ display: "flex", gap: 3 }}>
                      {row.tags.map((t, j) => (
                        <span
                          key={j}
                          style={{
                            fontSize: 9,
                            padding: "1px 5px",
                            borderRadius: 3,
                            background: C.accentBg,
                            color: C.primary,
                            fontFamily: "Inter,sans-serif",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: sigCol(row.signal) }} />
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: sigCol(row.signal),
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {row.signal}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: row.value.startsWith("+") ? C.green : row.value.startsWith("-") ? C.red : C.dark,
                        fontFamily: "Inter,sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.value}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        style={{
          padding: "10px 14px",
          borderTop: "1px solid #F3F4F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif" }}>
          Page {tablePage} of {totalPages}
        </span>
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          <button
            onClick={() => setTablePage((p) => Math.max(1, p - 1))}
            disabled={tablePage === 1}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "1px solid #E5E7EB",
              background: "#fff",
              cursor: tablePage === 1 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: tablePage === 1 ? 0.4 : 1,
            }}
          >
            <ChevronLeft size={12} color={C.mid} />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = tablePage <= 3 ? i + 1 : tablePage >= totalPages - 2 ? totalPages - 4 + i : tablePage - 2 + i;
            if (page < 1 || page > totalPages) return null;
            return (
              <button
                key={page}
                onClick={() => setTablePage(page)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: `1px solid ${page === tablePage ? C.accent : "#E5E7EB"}`,
                  background: page === tablePage ? C.accentBg : "#fff",
                  fontSize: 10,
                  fontWeight: page === tablePage ? 700 : 400,
                  color: page === tablePage ? C.primary : C.mid,
                  cursor: "pointer",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setTablePage((p) => Math.min(totalPages, p + 1))}
            disabled={tablePage === totalPages}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "1px solid #E5E7EB",
              background: "#fff",
              cursor: tablePage === totalPages ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: tablePage === totalPages ? 0.4 : 1,
            }}
          >
            <ChevronRight size={12} color={C.mid} />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default function BridgeReportsPage() {
  const [s, setS] = useState(SECTORS[0]);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("sector-performance");
  const [chartFilter, setChartFilter] = useState("7D");
  const [syncing, setSyncing] = useState(false);
  const [overtimeView, setOvertimeView] = useState(false);
  const [tableSearch, setTableSearch] = useState("");
  const [tableSort, setTableSort] = useState({ col: "date", dir: "desc" });
  const [tablePage, setTablePage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [notif, setNotif] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1400);
  };
  useEffect(() => {
    setTablePage(1);
    setSelectedRows([]);
    setTableSearch("");
  }, [s.id, activeTab]);

  if (isMobile) return <MobileDashboard s={s} setS={setS} />;

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
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activeSector={s} setActiveSector={setS} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Top Nav */}
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
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Reports</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
              </div>
            </div>
            <div style={{ width: 1, height: 28, background: C.line }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 7,
                background: C.accentBg,
                border: `1px solid ${C.accent}44`,
              }}
            >
              {s.svgIcon(C.primary, 11)}
              <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
                {s.short}
              </span>
            </div>
          </div>
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
                placeholder="Search reports, signals..."
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

        {/* Page Header Bar */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #E5E7EB",
            padding: "10px 20px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: C.accentBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileText size={15} color={C.primary} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>Sector Reports</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                Comprehensive analysis & intelligence
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                background: "#fff",
                fontSize: 11,
                color: C.mid,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              <Calendar size={12} color={C.muted} />
              This Month
              <ChevronDown size={10} color={C.muted} />
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                background: "#fff",
                fontSize: 11,
                color: C.mid,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              <SlidersHorizontal size={12} />
              Filters
            </button>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setExportOpen((o) => !o)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  background: "#fff",
                  fontSize: 11,
                  color: C.mid,
                  cursor: "pointer",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                <Download size={12} />
                Export
              </button>
              {exportOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: 38,
                    right: 0,
                    background: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: 10,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    zIndex: 50,
                    overflow: "hidden",
                    minWidth: 130,
                  }}
                >
                  {["CSV", "Excel", "PDF", "PNG"].map((f) => (
                    <div
                      key={f}
                      style={{
                        padding: "9px 14px",
                        fontSize: 11,
                        color: C.mid,
                        cursor: "pointer",
                        fontFamily: "Inter,sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Download size={10} />
                      {f}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                background: "#fff",
                fontSize: 11,
                color: C.mid,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              <Printer size={12} />
              Print
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 14px",
                border: `1px solid ${C.accent}`,
                borderRadius: 8,
                background: C.accentBg,
                fontSize: 11,
                color: C.primary,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
                fontWeight: 700,
              }}
            >
              <Plus size={12} />
              New Report
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #E5E7EB",
            padding: "0 20px",
            flexShrink: 0,
            display: "flex",
            gap: 0,
            overflowX: "auto",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "11px 16px",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.id ? C.accent : "transparent"}`,
                background: "transparent",
                fontSize: 12,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? C.primary : C.muted,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all .15s",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 12, marginBottom: 12, height: 355 }}>
            <MetricsChartCard s={s} tab={activeTab} chartFilter={chartFilter} setChartFilter={setChartFilter} />
            <DonutGoalCard s={s} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <ComposedChartRow s={s} overtimeView={overtimeView} setOvertimeView={setOvertimeView} />
          </div>
          <TabPanel s={s} tab={activeTab} />
          <ActivityTable
            s={s}
            tableSearch={tableSearch}
            setTableSearch={setTableSearch}
            tableSort={tableSort}
            setTableSort={setTableSort}
            tablePage={tablePage}
            setTablePage={setTablePage}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
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

/* ═══════════════════════════════════════════════
   MOBILE DASHBOARD
═══════════════════════════════════════════════ */
function MobileDashboard({ s, setS }) {
  const [activeNav, setActiveNav] = useState("resources");
  const [resourcesView, setResourcesView] = useState("reports");
  const [resourcesMenu, setResourcesMenu] = useState(false);
  const [openSections, setOpenSections] = useState({ signals: true, score: true });
  const [sectorDrawer, setSectorDrawer] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const rank = [...SECTORS].sort((a, b) => b.score - a.score).findIndex((x) => x.id === s.id) + 1;
  const bullish = s.activity.filter((a) => a.sig === "Bullish").length;

  const toggleSection = (k) => setOpenSections((o) => ({ ...o, [k]: !o[k] }));

  const riskColor = (r) => (r === "LOW" ? "#16A34A" : r === "HIGH" ? "#DC2626" : "#CA8A04");
  const riskBg = (r) => (r === "LOW" ? "#DCFCE7" : r === "HIGH" ? "#FEE2E2" : "#FEF9C3");

  /* Score arc SVG */
  const ScoreArc = ({ score }) => {
    const r = 52,
      cx = 64,
      cy = 64,
      startDeg = -220,
      sweepDeg = 260;
    const toRad = (d) => (d * Math.PI) / 180;
    const arcPt = (deg) => [cx + r * Math.cos(toRad(deg)), cy + r * Math.sin(toRad(deg))];
    const arcPath = (from, to, rad) => {
      const [sx, sy] = arcPt(from);
      const [ex, ey] = arcPt(to);
      const large = Math.abs(to - from) > 180 ? 1 : 0;
      return `M${sx},${sy} A${rad},${rad} 0 ${large},1 ${ex},${ey}`;
    };
    const fillDeg = startDeg + sweepDeg * (score / 100);
    return (
      <svg width={128} height={128} style={{ display: "block" }}>
        <path
          d={arcPath(startDeg, startDeg + sweepDeg, r)}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={10}
          strokeLinecap="round"
        />
        <path d={arcPath(startDeg, fillDeg, r)} fill="none" stroke={C.accent} strokeWidth={10} strokeLinecap="round" />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fill="#fff"
          fontSize={28}
          fontWeight={800}
          fontFamily="Inter,sans-serif"
        >
          {score}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize={9}
          fontFamily="Inter,sans-serif"
          letterSpacing="1"
        >
          BRIDGE SCORE
        </text>
      </svg>
    );
  };

  /* Collapsible section header */
  const SectionHead = ({ id, label, icon, count, defaultOpen }) => {
    const open = openSections[id] ?? defaultOpen ?? false;
    return (
      <button
        onClick={() => toggleSection(id)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "13px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: C.dark, fontFamily: "DM Sans,sans-serif" }}>
          {label}
        </span>
        {count != null && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: C.primary,
              background: C.accentBg,
              borderRadius: 10,
              padding: "2px 7px",
              fontFamily: "Inter,sans-serif",
            }}
          >
            {count}
          </span>
        )}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 5,
            background: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "transform .2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown size={12} color={C.muted} />
        </div>
      </button>
    );
  };

  /* Nav pages */
  const renderPage = () => {
    if (activeNav === "resources") {
      if (resourcesView === "sector-performance")
        return <MobileResourcesPage s={s} setS={setS} view="sector-performance" />;
      if (resourcesView === "activity-log") return <MobileResourcesPage s={s} setS={setS} view="activity-log" />;
      if (resourcesView === "library")
        return (
          <div style={{ background: "#090F0B", minHeight: "100%", paddingBottom: 90 }}>
            <div style={{ padding: "8px 16px 0" }}>
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
                RESOURCE LIBRARY
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 80,
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: "rgba(184,217,53,0.08)",
                  border: "1px solid rgba(184,217,53,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B8D935"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "DM Sans,sans-serif",
                }}
              >
                Resource Library
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.28)",
                  textAlign: "center",
                  maxWidth: 220,
                  lineHeight: 1.6,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Docs, guides & reference materials coming in the next build.
              </div>
            </div>
          </div>
        );
      /* "reports" default */
    }
    if (activeNav === "overview")
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 12,
            paddingBottom: 80,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: "#F3F4F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke={C.muted}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.mid }}>Overview</div>
          <div style={{ fontSize: 12, color: C.muted, textAlign: "center", maxWidth: 220, lineHeight: 1.5 }}>
            Coming soon in the full platform.
          </div>
        </div>
      );
    if (activeNav === "dashboard" || activeNav === "analytics" || activeNav === "watch")
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 12,
            paddingBottom: 80,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: "#F3F4F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {activeNav === "dashboard" ? (
              <LayoutGrid size={22} color={C.muted} />
            ) : activeNav === "analytics" ? (
              <BarChart3 size={22} color={C.muted} />
            ) : (
              <BookOpen size={22} color={C.muted} />
            )}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.mid }}>Coming Soon</div>
          <div style={{ fontSize: 12, color: C.muted, textAlign: "center", maxWidth: 220, lineHeight: 1.5 }}>
            This section is being built for the full BRIDGE Intelligence platform.
          </div>
        </div>
      );

    /* ── REPORTS page (dark palette) ── */
    const D = {
      bg: "#090F0B",
      card: "#0F1A12",
      card2: "#132118",
      border: "rgba(255,255,255,0.07)",
      borderLime: "rgba(184,217,53,0.18)",
      lime: "#B8D935",
      green: "#22C55E",
      red: "#EF4444",
      amber: "#F59E0B",
      teal: "#2E8B6E",
      txt: "#FFFFFF",
      txt2: "rgba(255,255,255,0.55)",
      txt3: "rgba(255,255,255,0.28)",
      iconBg: "rgba(184,217,53,0.12)",
      iconBg2: "rgba(255,255,255,0.07)",
    };
    const sigDC = (sig) => (sig === "Bullish" ? D.green : sig === "Bearish" ? D.red : D.amber);
    const latestSig = s.activity[0];
    const openD = openSections;

    /* Dark section head */
    const DSectionHead = ({ id, label, icon, count = undefined, defaultOpen = false }: { id: string; label: string; icon: any; count?: any; defaultOpen?: any }) => {
      const isOpen = openD[id] ?? defaultOpen ?? false;
      return (
        <button
          onClick={() => toggleSection(id)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "13px 16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: D.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: D.txt, fontFamily: "DM Sans,sans-serif" }}>
            {label}
          </span>
          {count != null && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: D.lime,
                background: D.iconBg,
                borderRadius: 10,
                padding: "2px 7px",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {count}
            </span>
          )}
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              background: D.iconBg2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "transform .2s",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ChevronDown size={12} color={D.txt3} />
          </div>
        </button>
      );
    };

    return (
      <div style={{ background: D.bg, minHeight: "100%", paddingBottom: 90 }}>
        {/* ── REPORTS label ── */}
        <div style={{ padding: "8px 16px 0" }}>
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
            REPORTS
          </span>
        </div>

        {/* ── Hero Card ── */}
        <div
          style={{
            margin: "10px 12px 0",
            background: D.card,
            borderRadius: 18,
            border: `1px solid ${D.borderLime}`,
            overflow: "hidden",
          }}
        >
          {/* Top: score circle + name/pills */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 16px 14px" }}>
            {/* Score circle */}
            <div style={{ flexShrink: 0, position: "relative", width: 68, height: 68 }}>
              <svg width={68} height={68} viewBox="0 0 68 68">
                <circle cx={34} cy={34} r={28} fill="none" stroke="rgba(184,217,53,0.15)" strokeWidth={4} />
                <circle
                  cx={34}
                  cy={34}
                  r={28}
                  fill="none"
                  stroke={D.lime}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeDasharray={`${(2 * Math.PI * 28 * s.score) / 100} ${2 * Math.PI * 28}`}
                  strokeDashoffset={2 * Math.PI * 28 * 0.25}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "34px 34px" }}
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
                <span
                  style={{ fontSize: 20, fontWeight: 900, color: D.txt, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
                >
                  {s.score}
                </span>
              </div>
            </div>
            {/* Name + pills */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: D.lime,
                  fontFamily: "Inter,sans-serif",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                OVERVIEW · {s.short.toUpperCase()}
              </div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: D.txt,
                  lineHeight: 1.2,
                  marginBottom: 10,
                  fontFamily: "DM Sans,sans-serif",
                }}
              >
                {s.full}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[
                  { l: "Cap", v: `$${s.capLow}–${s.capHigh}M` },
                  { l: "IRR", v: `${s.irrHigh}%` },
                  { l: "Score", v: `${s.score}` },
                ].map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "4px 9px",
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${D.border}`,
                    }}
                  >
                    <span style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{p.l}</span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: i === 2 ? D.lime : D.teal,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {p.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mid: 3-column stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid ${D.border}` }}>
            {[
              { l: "CAPITAL RANGE", v: `$${s.capLow}–${s.capHigh}M` },
              { l: "IRR TARGET", v: `${s.irrLow}–${s.irrHigh}%` },
              { l: "VENTURES", v: `${s.totalV} identified` },
            ].map((st, i) => (
              <div key={i} style={{ padding: "12px 14px", borderRight: i < 2 ? `1px solid ${D.border}` : "none" }}>
                <div
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    color: D.txt3,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  {st.l}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: D.txt, fontFamily: "Inter,sans-serif" }}>
                  {st.v}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom: signal bar */}
          <div
            style={{
              margin: "0 12px 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 12px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: 10,
              border: `1px solid ${D.border}`,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: sigDC(latestSig?.sig),
                boxShadow: `0 0 6px ${sigDC(latestSig?.sig)}66`,
                flexShrink: 0,
              }}
            />
            <span
              style={{ fontSize: 11, fontWeight: 700, color: sigDC(latestSig?.sig), fontFamily: "Inter,sans-serif" }}
            >
              {latestSig?.sig}
            </span>
            <span style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif" }}>Market Signal</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 2, alignItems: "flex-end" }}>
              {[4, 6, 5, 7, 6, 8, 7, 9].map((h, i) => (
                <div
                  key={i}
                  style={{ width: 4, height: h * 2, borderRadius: 1, background: i > 5 ? D.lime : `${D.lime}44` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Quick Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, padding: "10px 12px 0" }}>
          {[
            { l: "Bullish", v: bullish, suf: `/${s.activity.length}` },
            { l: "Volatility", v: `${Math.round(s.score * 0.42)}%` },
            { l: "Health", v: `${Math.round(s.score * 0.9)}%` },
            { l: "Signal Vol.", v: `${s.activity.length * 18}` },
          ].map((st, i) => (
            <div
              key={i}
              style={{
                background: D.card,
                borderRadius: 12,
                padding: "10px 8px",
                textAlign: "center",
                border: `1px solid ${D.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: D.txt,
                  fontFamily: "Inter,sans-serif",
                  letterSpacing: "-.5px",
                }}
              >
                {st.v}
                {st.suf && <span style={{ fontSize: 10, fontWeight: 600, color: D.txt3 }}>{st.suf}</span>}
              </div>
              <div
                style={{
                  fontSize: 8,
                  fontWeight: 600,
                  color: D.txt3,
                  fontFamily: "Inter,sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginTop: 3,
                }}
              >
                {st.l}
              </div>
            </div>
          ))}
        </div>

        {/* ── Sub-sectors ── */}
        <div
          style={{
            margin: "10px 12px 0",
            background: D.card,
            borderRadius: 16,
            border: `1px solid ${D.border}`,
            overflow: "hidden",
          }}
        >
          <DSectionHead
            id="subsectors"
            label="Sub-sectors"
            icon={<BarChart3 size={13} color={D.lime} />}
            count={s.subSectors.length}
          />
          {openD.subsectors && (
            <div style={{ padding: "0 16px 14px" }}>
              {s.subSectors.map((ss, i) => (
                <div key={i} style={{ marginBottom: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: D.txt2, fontFamily: "Inter,sans-serif" }}>{ss.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: D.txt, fontFamily: "Inter,sans-serif" }}>
                      {ss.pct}%
                    </span>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${ss.pct}%`,
                        background: ss.color || D.lime,
                        borderRadius: 3,
                        transition: "width .6s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Live Signals ── */}
        <div
          style={{
            margin: "10px 12px 0",
            background: D.card,
            borderRadius: 16,
            border: `1px solid ${D.border}`,
            overflow: "hidden",
          }}
        >
          <DSectionHead
            id="signals"
            label="Live Signals"
            icon={<Activity size={13} color={D.lime} />}
            count={s.activity.length}
            defaultOpen={true}
          />
          {openD.signals && (
            <div style={{ padding: "0 0 8px" }}>
              {s.activity.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "10px 16px",
                    borderTop: `1px solid ${D.border}`,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9,
                      background: D.iconBg2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {a.sig === "Bullish" ? (
                      <TrendingUp size={13} color={D.green} />
                    ) : a.sig === "Bearish" ? (
                      <TrendingDown size={13} color={D.red} />
                    ) : (
                      <Activity size={13} color={D.amber} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: D.txt, lineHeight: 1.35, marginBottom: 3 }}>
                      {a.h}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                      <span
                        style={{ fontSize: 10, fontWeight: 700, color: sigDC(a.sig), fontFamily: "Inter,sans-serif" }}
                      >
                        {a.sig}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: D.lime,
                      fontFamily: "Inter,sans-serif",
                      whiteSpace: "nowrap",
                      marginTop: 2,
                    }}
                  >
                    {a.amt}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Top Opportunities ── */}
        <div
          style={{
            margin: "10px 12px 0",
            background: D.card,
            borderRadius: 16,
            border: `1px solid ${D.border}`,
            overflow: "hidden",
          }}
        >
          <DSectionHead
            id="opportunities"
            label="Top Opportunities"
            icon={<ArrowUpRight size={13} color={D.lime} />}
            count={s.t1.length}
          />
          {openD.opportunities && (
            <div style={{ padding: "0 0 8px" }}>
              {s.t1.map((op, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 16px",
                    borderTop: `1px solid ${D.border}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div style={{ width: 3, alignSelf: "stretch", borderRadius: 2, background: D.lime, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: D.txt,
                        marginBottom: 4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {op.name}
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={{ fontSize: 10, color: D.teal, fontWeight: 700, fontFamily: "Inter,sans-serif" }}>
                        {op.cap}
                      </span>
                      <span style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif" }}>·</span>
                      <span style={{ fontSize: 10, color: D.txt2, fontWeight: 600, fontFamily: "Inter,sans-serif" }}>
                        {op.irr} IRR
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: riskColor(op.risk),
                      fontFamily: "Inter,sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    {op.risk}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Performance Chart ── */}
        <div
          style={{
            margin: "10px 12px 0",
            background: D.card,
            borderRadius: 16,
            border: `1px solid ${D.border}`,
            overflow: "hidden",
          }}
        >
          <DSectionHead id="performance" label="Performance Chart" icon={<BarChart3 size={13} color={D.lime} />} />
          {openD.performance && (
            <div style={{ padding: "0 8px 12px", height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RBarChart
                  data={genBarData(s, "sector-performance", "30D")}
                  barSize={14}
                  barGap={2}
                  margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 9, fill: D.txt3, fontFamily: "Inter,sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis tick={{ fontSize: 9, fill: D.txt3 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: D.card2,
                      border: `1px solid ${D.border}`,
                      borderRadius: 8,
                      color: D.txt,
                      fontSize: 11,
                    }}
                  />
                  <Bar dataKey="primary" fill={D.lime} radius={[3, 3, 0, 0]} name="Primary" />
                  <Bar dataKey="secondary" fill={`${D.teal}66`} radius={[3, 3, 0, 0]} name="Secondary" />
                </RBarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* ── Sector Rankings ── */}
        <div
          style={{
            margin: "10px 12px 0",
            background: D.card,
            borderRadius: 16,
            border: `1px solid ${D.border}`,
            overflow: "hidden",
          }}
        >
          <DSectionHead
            id="rankings"
            label="Sector Rankings"
            icon={<BarChart3 size={13} color={D.lime} />}
            count="12"
          />
          {openD.rankings && (
            <div style={{ padding: "0 16px 12px" }}>
              {[...SECTORS]
                .sort((a, b) => b.score - a.score)
                .map((sec, i) => {
                  const act = sec.id === s.id;
                  return (
                    <div
                      key={sec.id}
                      onClick={() => setS(sec)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 0",
                        borderBottom: i < 11 ? `1px solid ${D.border}` : "none",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: act ? D.lime : D.txt3,
                          fontFamily: "Inter,sans-serif",
                          width: 14,
                          textAlign: "center",
                        }}
                      >
                        {i + 1}
                      </span>
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 6,
                          background: act ? "rgba(184,217,53,0.12)" : D.iconBg2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {sec.svgIcon(act ? D.lime : D.txt3, 12)}
                      </div>
                      <span
                        style={{
                          flex: 1,
                          fontSize: 11,
                          fontWeight: act ? 700 : 400,
                          color: act ? D.txt : D.txt2,
                          fontFamily: "Inter,sans-serif",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {sec.short}
                      </span>
                      <div
                        style={{
                          width: 70,
                          height: 4,
                          background: "rgba(255,255,255,0.07)",
                          borderRadius: 2,
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${sec.score}%`,
                            background: act ? D.lime : D.teal,
                            borderRadius: 2,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: act ? D.lime : D.txt3,
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
            </div>
          )}
        </div>

        {/* ── Upsell ── */}
        <div
          style={{
            margin: "10px 12px 0",
            borderRadius: 16,
            background: "linear-gradient(135deg,#1E3327,#0F1A12)",
            border: `1px solid ${D.borderLime}`,
            padding: 18,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: D.txt, marginBottom: 4 }}>Unlock Full Intelligence</div>
          <div
            style={{ fontSize: 11, color: D.txt3, fontFamily: "Inter,sans-serif", lineHeight: 1.5, marginBottom: 14 }}
          >
            IRR models, risk matrices, and deep venture profiles across all 12 sectors.
          </div>
          <button
            style={{
              width: "100%",
              background: D.lime,
              border: "none",
              borderRadius: 10,
              padding: "11px 0",
              fontSize: 12,
              fontWeight: 700,
              color: "#1B4D3E",
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            Upgrade to Pro <ArrowUpRight size={13} />
          </button>
        </div>

        <div style={{ height: 16 }} />
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: C.bg,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{display:none;}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.spin{animation:spin 1s linear infinite}@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}.drawer{animation:slideUp .25s ease}`}</style>

      {/* ── Mobile Header ── */}
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
        {/* BRIDGE Logo */}
        <div style={{ flexShrink: 0 }}>
          <BridgeLogo />
        </div>

        {/* Sector selector pill */}
        <div
          onClick={() => setSectorDrawer(true)}
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
              color: "#FFFFFF",
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
              width={12}
              height={12}
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
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2"
            strokeLinecap="round"
          >
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
              marginLeft: 10,
            }}
          />
        </button>
      </div>

      {/* ── Notifications Dropdown ── */}
      {notifOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 340 }} onClick={() => setNotifOpen(false)}>
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
              <span
                style={{ fontSize: 11, color: "#B8D935", fontWeight: 700, cursor: "pointer" }}
                onClick={() => setNotifOpen(false)}
              >
                Mark all read
              </span>
            </div>
            {s.activity.slice(0, 3).map((a, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "10px 14px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: a.sig === "Bullish" ? "#22C55E" : "#F59E0B",
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>{a.h}</div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "Inter,sans-serif",
                      marginTop: 2,
                    }}
                  >
                    {a.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Hamburger Menu Drawer ── */}
      {menuOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.65)" }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="drawer"
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
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: "rgba(255,255,255,0.15)",
                margin: "12px auto 0",
              }}
            />
            <div
              style={{
                padding: "12px 20px 8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
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
            {/* Profile block */}
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
                  width={20}
                  height={20}
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
                  Joseph Asante
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "Inter,sans-serif",
                    marginTop: 2,
                  }}
                >
                  BRIDGE Intelligence · Analyst
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
                  Pro
                </span>
              </div>
            </div>
            {/* Return to website */}
            <button
              onClick={() => setMenuOpen(false)}
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
                  width={18}
                  height={18}
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
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "Inter,sans-serif",
                    marginTop: 2,
                  }}
                >
                  Back to bridge-pbc.com
                </div>
              </div>
              <svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            {/* Nav links */}
            {[
              {
                label: "About BRIDGE",
                desc: "Our mission, model & sectors",
                icon: (
                  <svg
                    width={18}
                    height={18}
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
                    width={18}
                    height={18}
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
                    width={18}
                    height={18}
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
                    width={18}
                    height={18}
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
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => setMenuOpen(false)}
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
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "Inter,sans-serif",
                      marginTop: 2,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ))}
            {/* Sign out */}
            <button
              onClick={() => setMenuOpen(false)}
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
                  width={18}
                  height={18}
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
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(239,68,68,0.75)",
                    fontFamily: "DM Sans,sans-serif",
                  }}
                >
                  Sign Out
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ── Sector Picker Drawer ── */}
      {sectorDrawer && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.65)" }}
          onClick={() => setSectorDrawer(false)}
        >
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
                onClick={() => setSectorDrawer(false)}
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
            <div style={{ overflowY: "auto", flex: 1 }}>
              {[...SECTORS]
                .sort((a, b) => b.score - a.score)
                .map((sec, i) => {
                  const act = sec.id === s.id;
                  return (
                    <div
                      key={sec.id}
                      onClick={() => {
                        setS(sec);
                        setSectorDrawer(false);
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
                          background: act ? "rgba(184,217,53,0.15)" : "rgba(255,255,255,0.06)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {sec.svgIcon(act ? "#B8D935" : "rgba(255,255,255,0.35)", 16)}
                      </div>
                      <div style={{ flex: 1 }}>
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
                          {sec.totalV} ventures · ${sec.capLow}–{sec.capHigh}M
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 800,
                            color: act ? "#B8D935" : "rgba(255,255,255,0.28)",
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {sec.score}
                        </div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "Inter,sans-serif" }}>
                          score
                        </div>
                      </div>
                      {act && (
                        <div
                          style={{ width: 8, height: 8, borderRadius: "50%", background: "#B8D935", flexShrink: 0 }}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* ── Resources Sub-menu Popup ── */}
      {resourcesMenu && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.55)" }}
          onClick={() => setResourcesMenu(false)}
        >
          <div
            className="drawer"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#0F1A12",
              borderRadius: "20px 20px 0 0",
              paddingBottom: "calc(env(safe-area-inset-bottom,16px) + 70px)",
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
                margin: "12px auto 16px",
              }}
            />
            <div
              style={{ padding: "0 20px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "Inter,sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Reports
              </span>
              <button
                onClick={() => setResourcesMenu(false)}
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
            {/* ── Reports parent ── */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                onClick={() => {
                  setResourcesView("reports");
                  setActiveNav("resources");
                  setResourcesMenu(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 20px",
                  background:
                    resourcesView === "reports" && activeNav === "resources" ? "rgba(184,217,53,0.07)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background:
                      resourcesView === "reports" && activeNav === "resources"
                        ? "rgba(184,217,53,0.15)"
                        : "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color:
                      resourcesView === "reports" && activeNav === "resources" ? "#B8D935" : "rgba(255,255,255,0.35)",
                  }}
                >
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: resourcesView === "reports" && activeNav === "resources" ? "#B8D935" : "#fff",
                      fontFamily: "DM Sans,sans-serif",
                    }}
                  >
                    Reports
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "Inter,sans-serif",
                      marginTop: 2,
                    }}
                  >
                    Sector intelligence & analysis
                  </div>
                </div>
                {resourcesView === "reports" && activeNav === "resources" && (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#B8D935", flexShrink: 0 }} />
                )}
              </button>

              {/* Sub-items */}
              {[
                {
                  id: "sector-performance",
                  label: "Sector Performance",
                  sub: "Charts, KPIs & capital flow",
                  icon: (
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  ),
                },
                {
                  id: "activity-log",
                  label: "Sector Activity Log",
                  sub: "Searchable activity & signal feed",
                  icon: (
                    <svg
                      width={15}
                      height={15}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  ),
                },
              ].map((opt, i) => {
                const act = resourcesView === opt.id && activeNav === "resources";
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setResourcesView(opt.id);
                      setActiveNav("resources");
                      setResourcesMenu(false);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 20px 11px 74px",
                      background: act ? "rgba(184,217,53,0.07)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      borderTop: "1px solid rgba(255,255,255,0.04)",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: act ? "rgba(184,217,53,0.15)" : "rgba(255,255,255,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: act ? "#B8D935" : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {opt.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: act ? 700 : 600,
                          color: act ? "#B8D935" : "rgba(255,255,255,0.8)",
                          fontFamily: "DM Sans,sans-serif",
                        }}
                      >
                        {opt.label}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "Inter,sans-serif",
                          marginTop: 1,
                        }}
                      >
                        {opt.sub}
                      </div>
                    </div>
                    {act && (
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#B8D935", flexShrink: 0 }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Resource Library ── */}
            <button
              onClick={() => {
                setResourcesView("library");
                setActiveNav("resources");
                setResourcesMenu(false);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 20px",
                background:
                  resourcesView === "library" && activeNav === "resources" ? "rgba(184,217,53,0.07)" : "transparent",
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
                  background:
                    resourcesView === "library" && activeNav === "resources"
                      ? "rgba(184,217,53,0.15)"
                      : "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color:
                    resourcesView === "library" && activeNav === "resources" ? "#B8D935" : "rgba(255,255,255,0.35)",
                }}
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: resourcesView === "library" && activeNav === "resources" ? "#B8D935" : "#fff",
                    fontFamily: "DM Sans,sans-serif",
                  }}
                >
                  Resource Library
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "Inter,sans-serif",
                    marginTop: 2,
                  }}
                >
                  Docs, guides & reference materials
                </div>
              </div>
              {resourcesView === "library" && activeNav === "resources" && (
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#B8D935", flexShrink: 0 }} />
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── Scrollable Content ── */}
      <div style={{ flex: 1, overflowY: "auto", background: activeNav === "resources" ? "#090F0B" : C.bg }}>
        {renderPage()}
      </div>

      {/* ── Bottom Nav ── */}
      <div
        style={{
          background: C.sidebar,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "stretch",
          flexShrink: 0,
          paddingBottom: "env(safe-area-inset-bottom,0px)",
        }}
      >
        {[
          { id: "dashboard", label: "Dashboard", icon: (c) => <LayoutGrid size={20} color={c} /> },
          { id: "overview", label: "Overview", icon: (c) => <Activity size={20} color={c} /> },
          { id: "analytics", label: "Analytics", icon: (c) => <BarChart3 size={20} color={c} /> },
          { id: "watch", label: "Watch", icon: (c) => <Eye size={20} color={c} /> },
          { id: "resources", label: "Reports", icon: (c) => <FileBarChart size={20} color={c} /> },
        ].map((n) => {
          const act = activeNav === n.id;
          const isReports = n.id === "resources";
          return (
            <button
              key={n.id}
              onClick={() => {
                if (isReports) {
                  if (act) {
                    setResourcesMenu((o) => !o);
                  } else {
                    setActiveNav("resources");
                    setResourcesMenu(true);
                  }
                } else {
                  setActiveNav(n.id);
                  setResourcesMenu(false);
                }
              }}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                padding: "9px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {act && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "25%",
                    right: "25%",
                    height: 2,
                    borderRadius: "0 0 2px 2px",
                    background: C.accent,
                  }}
                />
              )}
              {n.icon(act ? C.accent : "rgba(255,255,255,0.28)")}
              <span
                style={{
                  fontSize: 8,
                  fontWeight: act ? 700 : 500,
                  color: act ? C.accent : "rgba(255,255,255,0.28)",
                  fontFamily: "Inter,sans-serif",
                  letterSpacing: "0.2px",
                }}
              >
                {n.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MOBILE RESOURCES PAGE — mobile adaptation of desktop Reports
═══════════════════════════════════════════════ */
function MobileResourcesPage({ s, view = "sector-performance" }) {
  const D = {
    bg: "#090F0B",
    card: "#0F1A12",
    card2: "#132118",
    border: "rgba(255,255,255,0.07)",
    borderLime: "rgba(184,217,53,0.18)",
    lime: "#B8D935",
    primary: "#1B4D3E",
    teal: "#2E8B6E",
    green: "#22C55E",
    red: "#EF4444",
    amber: "#F59E0B",
    txt: "#FFFFFF",
    txt2: "rgba(255,255,255,0.55)",
    txt3: "rgba(255,255,255,0.28)",
    iconBg: "rgba(184,217,53,0.12)",
    iconBg2: "rgba(255,255,255,0.07)",
  };

  const TABS = ["Sector Perf.", "Market", "Sub-sector", "Financials", "Growth", "Comparative", "Monthly", "Signals"];
  const TAB_KEYS = [
    "sector-performance",
    "market-analysis",
    "sub-sector-breakdown",
    "financials",
    "growth-tracking",
    "comparative-analysis",
    "monthly-summary",
    "signal-tracker",
  ];
  const [activeTab, setActiveTab] = useState("sector-performance");
  const [chartFilter, setChartFilter] = useState("30D");
  const [overtimeView, setOvertimeView] = useState(false);
  const [tableSearch, setTableSearch] = useState("");
  const [tablePage, setTablePage] = useState(1);
  const [open, setOpen] = useState({ metrics: true, value: true, capital: true, tabpanel: true, activity: true });
  const tog = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const PAGE_SIZE = 6;

  const sigC = (sig) => (sig === "Bullish" ? D.green : sig === "Bearish" ? D.red : D.amber);

  /* ── Data helpers (reuse desktop logic) ── */
  const tabMetrics = getTabMetrics(s, activeTab);
  const tabStats = getTabStats(s, activeTab);
  const barData = genBarData(s, activeTab, chartFilter);
  const monthlyData = genMonthlyData(s);
  const allRows = genTableRows(s);
  const filtered = allRows.filter(
    (r) =>
      !tableSearch ||
      [r.source, r.category, r.signal, r.sector].some((f) => f.toLowerCase().includes(tableSearch.toLowerCase())),
  );
  const pageRows = filtered.slice((tablePage - 1) * PAGE_SIZE, tablePage * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const totalCap = Math.round(((s.capLow + s.capHigh) / 2) * 10) / 10;
  const bullish = s.activity.filter((a) => a.sig === "Bullish").length;
  const donutData = [
    { name: "Market Cap", value: s.subSectors[0]?.pct || 35, color: D.lime },
    { name: "Growth", value: s.subSectors[1]?.pct || 25, color: D.teal },
    {
      name: "Other",
      value: 100 - (s.subSectors[0]?.pct || 35) - (s.subSectors[1]?.pct || 25),
      color: "rgba(255,255,255,0.1)",
    },
  ];
  const goals = [
    { count: s.totalV, label: "Ventures Tracked", pct: Math.round((s.totalV / 20) * 100), color: D.lime },
    {
      count: s.activity.length * 18,
      label: "Active Signals",
      pct: Math.round((bullish / s.activity.length) * 100),
      color: D.teal,
    },
    { count: 12, label: "Sectors Covered", pct: 100, color: D.amber },
  ];
  const capitalLast = monthlyData[monthlyData.length - 1];
  const capitalTotal = monthlyData.reduce((a, d) => a + d.growth, 0);

  /* ── Dark section header ── */
  const DHead = ({ id, label, badge, children }) => {
    const isOpen = open[id] ?? true;
    return (
      <button
        onClick={() => tog(id)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "13px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: D.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {children}
        </div>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: D.txt, fontFamily: "DM Sans,sans-serif" }}>
          {label}
        </span>
        {badge != null && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: D.lime,
              background: D.iconBg,
              borderRadius: 20,
              padding: "2px 8px",
              fontFamily: "Inter,sans-serif",
            }}
          >
            {badge}
          </span>
        )}
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: D.iconBg2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform .2s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <ChevronDown size={12} color={D.txt3} />
        </div>
      </button>
    );
  };

  return (
    <div style={{ background: D.bg, minHeight: "100%", paddingBottom: 90 }}>
      {/* ── Section label ── */}
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", gap: 8 }}>
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
          {view === "activity-log" ? "ACTIVITY LOG" : "SECTOR PERFORMANCE"}
        </span>
        <div style={{ flex: 1, height: 1, background: D.border }} />
        <span style={{ fontSize: 9, fontWeight: 700, color: D.lime, fontFamily: "Inter,sans-serif" }}>{s.short}</span>
      </div>

      {/* ══════════════════════════════════════
          1. METRICS CHART CARD — Sector Performance only
      ══════════════════════════════════════ */}
      {view === "sector-performance" && (
        <div
          style={{
            margin: "10px 12px 10px",
            background: D.card,
            borderRadius: 16,
            border: `1px solid ${D.border}`,
            overflow: "hidden",
          }}
        >
          <DHead id="metrics" label={TABS[TAB_KEYS.indexOf(activeTab)] || "Sector Performance"} badge={chartFilter}>
            <BarChart3 size={13} color={D.lime} />
          </DHead>
          {open.metrics && (
            <>
              {/* Tab strip */}
              <div
                style={{ display: "flex", overflowX: "auto", padding: "0 12px 10px", gap: 5, scrollbarWidth: "none" }}
              >
                {TABS.map((t, i) => {
                  const act = activeTab === TAB_KEYS[i];
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveTab(TAB_KEYS[i]);
                        setTablePage(1);
                      }}
                      style={{
                        flexShrink: 0,
                        padding: "5px 11px",
                        borderRadius: 20,
                        background: act ? D.lime : D.iconBg2,
                        border: `1px solid ${act ? D.lime : D.border}`,
                        fontSize: 10,
                        fontWeight: 700,
                        color: act ? D.primary : D.txt2,
                        fontFamily: "Inter,sans-serif",
                        cursor: "pointer",
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              {/* 7D/30D/90D toggle */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 16px 10px",
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  {[tabMetrics.p, tabMetrics.s].map((m, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "8px 12px",
                        background: D.iconBg2,
                        borderRadius: 10,
                        border: `1px solid ${D.border}`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
                        <div
                          style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? D.lime : D.teal }}
                        />
                        <span style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{m.l}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 800,
                            color: D.txt,
                            letterSpacing: "-1px",
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {m.v}
                        </span>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: m.up ? D.green : D.red,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {m.t}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 2, background: D.iconBg2, borderRadius: 7, padding: 2 }}>
                  {["7D", "30D", "90D"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setChartFilter(v)}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 5,
                        border: "none",
                        background: chartFilter === v ? D.lime : "transparent",
                        fontSize: 10,
                        fontWeight: 700,
                        color: chartFilter === v ? D.primary : D.txt3,
                        cursor: "pointer",
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar chart */}
              <div style={{ height: 140, padding: "0 8px 4px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RBarChart data={barData} barSize={14} barGap={2} margin={{ top: 0, right: 4, left: -28, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 9, fill: D.txt3, fontFamily: "Inter,sans-serif" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis tick={{ fontSize: 9, fill: D.txt3 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: D.card2,
                        border: `1px solid ${D.border}`,
                        borderRadius: 8,
                        color: D.txt,
                        fontSize: 11,
                      }}
                    />
                    <Bar dataKey="primary" fill={D.lime} radius={[3, 3, 0, 0]} name="Primary" />
                    <Bar dataKey="secondary" fill={`${D.teal}66`} radius={[3, 3, 0, 0]} name="Secondary" />
                  </RBarChart>
                </ResponsiveContainer>
              </div>

              {/* 4 bottom stats */}
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: `1px solid ${D.border}` }}
              >
                {tabStats.map((stat, i) => (
                  <div key={i} style={{ padding: "10px 12px", borderRight: i < 3 ? `1px solid ${D.border}` : "none" }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: D.txt,
                        letterSpacing: "-.5px",
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {stat.v}
                    </div>
                    <div
                      style={{
                        fontSize: 8,
                        color: D.txt3,
                        fontFamily: "Inter,sans-serif",
                        marginTop: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════
          2. SECTOR VALUE CARD (DonutGoalCard)
      ══════════════════════════════════════ */}
      {view === "sector-performance" && (
        <div
          style={{
            margin: "0 12px 10px",
            background: D.card,
            borderRadius: 16,
            border: `1px solid ${D.border}`,
            overflow: "hidden",
          }}
        >
          <DHead id="value" label="Sector Value">
            <svg
              width={13}
              height={13}
              viewBox="0 0 24 24"
              fill="none"
              stroke={D.lime}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </DHead>
          {open.value && (
            <div style={{ padding: "0 16px 16px" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                {/* Donut */}
                <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={28}
                        outerRadius={46}
                        dataKey="value"
                        stroke="none"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {donutData.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      textAlign: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 800, color: D.txt, lineHeight: 1 }}>${totalCap}M</div>
                    <div style={{ fontSize: 8, color: D.txt3, fontFamily: "Inter,sans-serif", marginTop: 1 }}>Cap</div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: D.txt,
                      letterSpacing: "-1px",
                      marginBottom: 8,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    ${totalCap}M
                  </div>
                  {donutData.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: i < 2 ? 4 : 0,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: d.color }} />
                        <span style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{d.name}</span>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: D.txt, fontFamily: "Inter,sans-serif" }}>
                        {d.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Goal bars */}
              <div style={{ height: 1, background: D.border, marginBottom: 12 }} />
              {goals.map((g, i) => (
                <div key={i} style={{ marginBottom: i < 2 ? 12 : 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 4,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: D.txt,
                          letterSpacing: "-.5px",
                          lineHeight: 1,
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {g.count}
                      </div>
                      <div style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                        {g.label}
                      </div>
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, color: g.color, fontFamily: "Inter,sans-serif" }}>
                      {g.pct}% goal
                    </span>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${g.pct}%`, height: "100%", background: g.color, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════
          3. CAPITAL FLOW CARD (ComposedChartRow)
      ══════════════════════════════════════ */}
      {view === "sector-performance" && (
        <div
          style={{
            margin: "0 12px 10px",
            background: D.card,
            borderRadius: 16,
            border: `1px solid ${D.border}`,
            overflow: "hidden",
          }}
        >
          <DHead id="capital" label="Capital Flow Analysis" badge={overtimeView ? "Overtime" : "6-Month"}>
            <TrendingUp size={13} color={D.lime} />
          </DHead>
          {open.capital && (
            <div style={{ padding: "0 12px 16px" }}>
              <div style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif", marginBottom: 10 }}>
                Growth revenue · Operating costs · Net income
              </div>
              {/* Legend + overtime toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  {[
                    { c: D.lime, l: "Growth" },
                    { c: D.teal, l: "Expenses" },
                    { c: D.amber, l: "Net" },
                  ].map((lg, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: lg.c }} />
                      <span style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{lg.l}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setOvertimeView((o) => !o)}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 7,
                    border: `1px solid ${overtimeView ? D.lime : D.border}`,
                    background: overtimeView ? D.iconBg : "transparent",
                    fontSize: 10,
                    fontWeight: 600,
                    color: overtimeView ? D.lime : D.txt3,
                    cursor: "pointer",
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  Overtime
                </button>
              </div>
              {/* Composed chart */}
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 9, fill: D.txt3, fontFamily: "Inter,sans-serif" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 9, fill: D.txt3 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => (overtimeView ? `${Math.round(v / 10)}%` : `$${v}`)}
                    />
                    <Tooltip
                      contentStyle={{
                        background: D.card2,
                        border: `1px solid ${D.border}`,
                        borderRadius: 8,
                        color: D.txt,
                        fontSize: 11,
                      }}
                    />
                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
                    <Bar
                      dataKey="growth"
                      fill={D.lime}
                      fillOpacity={0.85}
                      radius={[3, 3, 0, 0]}
                      name="Growth"
                      barSize={12}
                    />
                    <Bar
                      dataKey="expenses"
                      fill={D.teal}
                      fillOpacity={0.55}
                      radius={[3, 3, 0, 0]}
                      name="Expenses"
                      barSize={12}
                    />
                    <Line
                      type="monotone"
                      dataKey="net"
                      stroke={D.amber}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 3, fill: D.amber, strokeWidth: 0 }}
                      name="Net Income"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              {/* Summary row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 12 }}>
                {[
                  { l: "Total Capital", v: `$${capitalTotal.toLocaleString()}`, c: D.lime },
                  { l: "Net Margin", v: `${Math.round((capitalLast.net / capitalLast.growth) * 100)}%`, c: D.green },
                  { l: "Net Income", v: `$${capitalLast.net}`, c: D.amber },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: D.iconBg2,
                      borderRadius: 10,
                      padding: "10px 10px",
                      border: `1px solid ${D.border}`,
                    }}
                  >
                    <div style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif", marginBottom: 4 }}>
                      {item.l}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: item.c, fontFamily: "Inter,sans-serif" }}>
                      {item.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════
          4. TAB PANEL (TabPanel extra content)
      ══════════════════════════════════════ */}
      {view === "sector-performance" &&
        ["sub-sector-breakdown", "financials", "comparative-analysis", "monthly-summary"].includes(activeTab) && (
          <div
            style={{
              margin: "0 12px 10px",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              overflow: "hidden",
            }}
          >
            <DHead id="tabpanel" label={TABS[TAB_KEYS.indexOf(activeTab)] + " Detail"}>
              <BarChart3 size={13} color={D.lime} />
            </DHead>
            {open.tabpanel && (
              <div style={{ padding: "0 16px 16px" }}>
                {/* Sub-sector breakdown */}
                {activeTab === "sub-sector-breakdown" && (
                  <>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: D.txt2,
                        marginBottom: 10,
                        fontFamily: "DM Sans,sans-serif",
                      }}
                    >
                      Sub-sector Distribution
                    </div>
                    {s.subSectors.map((ss, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 4, height: 4, borderRadius: "50%", background: ss.color || D.lime }} />
                            <span style={{ fontSize: 11, color: D.txt2, fontFamily: "Inter,sans-serif" }}>
                              {ss.name}
                            </span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 10, color: D.green, fontFamily: "Inter,sans-serif" }}>
                              +{Math.round(ss.pct * 0.12)}%
                            </span>
                            <span
                              style={{ fontSize: 12, fontWeight: 800, color: D.lime, fontFamily: "Inter,sans-serif" }}
                            >
                              {ss.pct}%
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            height: 5,
                            background: "rgba(255,255,255,0.07)",
                            borderRadius: 3,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${ss.pct}%`,
                              background: ss.color || D.lime,
                              borderRadius: 3,
                              transition: "width .6s ease",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Financials */}
                {activeTab === "financials" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { l: "Total Revenue", v: `$${s.capHigh}M`, chg: "+15.2%", col: D.green },
                      { l: "Total Expenses", v: `$${Math.round(s.capLow * 0.4)}M`, chg: "+2.1%", col: D.amber },
                      {
                        l: "Net Income",
                        v: `$${s.capHigh - Math.round(s.capLow * 0.4)}M`,
                        chg: "+18.4%",
                        col: D.green,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          background: D.iconBg2,
                          borderRadius: 12,
                          padding: "14px 14px",
                          border: `1px solid ${D.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif", marginBottom: 4 }}>
                            {item.l}
                          </div>
                          <div
                            style={{
                              fontSize: 22,
                              fontWeight: 800,
                              color: D.txt,
                              letterSpacing: "-1px",
                              fontFamily: "Inter,sans-serif",
                            }}
                          >
                            {item.v}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <TrendingUp size={12} color={item.col} />
                          <span
                            style={{ fontSize: 12, fontWeight: 700, color: item.col, fontFamily: "Inter,sans-serif" }}
                          >
                            {item.chg}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comparative */}
                {activeTab === "comparative-analysis" && (
                  <>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: D.txt2,
                        marginBottom: 10,
                        fontFamily: "DM Sans,sans-serif",
                      }}
                    >
                      All Sectors — BRIDGE Score Ranking
                    </div>
                    {[...SECTORS]
                      .sort((a, b) => b.score - a.score)
                      .map((sec, i) => {
                        const act = sec.id === s.id;
                        return (
                          <div
                            key={sec.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "7px 0",
                              borderBottom: i < 11 ? `1px solid ${D.border}` : "none",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: act ? D.lime : D.txt3,
                                width: 14,
                                textAlign: "right",
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              {i + 1}
                            </span>
                            <div
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 6,
                                background: act ? "rgba(184,217,53,0.15)" : D.iconBg2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              {sec.svgIcon(act ? D.lime : D.txt3, 11)}
                            </div>
                            <span
                              style={{
                                flex: 1,
                                fontSize: 11,
                                fontWeight: act ? 700 : 400,
                                color: act ? D.txt : D.txt2,
                                fontFamily: "Inter,sans-serif",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {sec.short}
                            </span>
                            <div
                              style={{
                                width: 60,
                                height: 4,
                                background: "rgba(255,255,255,0.07)",
                                borderRadius: 2,
                                overflow: "hidden",
                                flexShrink: 0,
                              }}
                            >
                              <div
                                style={{
                                  width: `${sec.score}%`,
                                  height: "100%",
                                  background: act ? D.lime : D.teal,
                                  borderRadius: 2,
                                }}
                              />
                            </div>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: act ? D.lime : D.txt3,
                                width: 24,
                                textAlign: "right",
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              {sec.score}
                            </span>
                          </div>
                        );
                      })}
                  </>
                )}

                {/* Monthly summary */}
                {activeTab === "monthly-summary" && (
                  <>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: D.txt2,
                        marginBottom: 10,
                        fontFamily: "DM Sans,sans-serif",
                      }}
                    >
                      Monthly Performance 2025/2026
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                        (m, i) => {
                          const val = Math.round(
                            s.score * (0.85 + Math.sin(i * 0.9 + s.score * 0.03) * 0.12 + i * 0.01),
                          );
                          const up = val >= s.score;
                          const cur = m === "Jan";
                          return (
                            <div
                              key={m}
                              style={{
                                padding: "8px 10px",
                                background: cur ? "rgba(184,217,53,0.1)" : D.iconBg2,
                                borderRadius: 8,
                                border: `1px solid ${cur ? D.lime : D.border}`,
                              }}
                            >
                              <div
                                style={{
                                  fontSize: 9,
                                  fontWeight: 700,
                                  color: cur ? D.lime : D.txt3,
                                  fontFamily: "Inter,sans-serif",
                                  marginBottom: 2,
                                }}
                              >
                                {m}
                              </div>
                              <div
                                style={{
                                  fontSize: 14,
                                  fontWeight: 700,
                                  color: D.txt,
                                  lineHeight: 1,
                                  fontFamily: "Inter,sans-serif",
                                }}
                              >
                                {val}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
                                {up ? <TrendingUp size={8} color={D.green} /> : <TrendingDown size={8} color={D.red} />}
                                <span
                                  style={{ fontSize: 8, color: up ? D.green : D.red, fontFamily: "Inter,sans-serif" }}
                                >
                                  {up ? `+${val - s.score}` : `${val - s.score}`}
                                </span>
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

      {/* ══════════════════════════════════════
          5. ACTIVITY LOG (ActivityTable adapted)
      ══════════════════════════════════════ */}
      <div
        style={{
          margin: "0 12px 10px",
          background: D.card,
          borderRadius: 16,
          border: `1px solid ${D.border}`,
          overflow: "hidden",
        }}
      >
        <DHead id="activity" label="Sector Activity Log" badge={`${filtered.length} entries`}>
          <FileText size={13} color={D.lime} />
        </DHead>
        {open.activity && (
          <>
            {/* Search + filter */}
            <div style={{ padding: "0 16px 10px", display: "flex", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: D.iconBg2,
                  border: `1px solid ${D.border}`,
                  borderRadius: 8,
                  padding: "7px 10px",
                }}
              >
                <Search size={11} color={D.txt3} />
                <input
                  value={tableSearch}
                  onChange={(e) => {
                    setTableSearch(e.target.value);
                    setTablePage(1);
                  }}
                  placeholder="Search activities..."
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: 11,
                    color: D.txt,
                    fontFamily: "Inter,sans-serif",
                    width: "100%",
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {["Bullish", "Watch"].map((v) => (
                  <div
                    key={v}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      padding: "4px 8px",
                      borderRadius: 6,
                      background: D.iconBg2,
                      border: `1px solid ${D.border}`,
                    }}
                  >
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: sigC(v) }} />
                    <span style={{ fontSize: 9, fontWeight: 600, color: sigC(v), fontFamily: "Inter,sans-serif" }}>
                      {filtered.filter((r) => r.signal === v).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row cards */}
            <div style={{ padding: "0 0 4px" }}>
              {pageRows.map((row, i) => {
                const sec = SECTORS.find((x) => x.id === row.sectorId);
                const isPrimary = row.sectorId === s.id;
                return (
                  <div
                    key={row.id}
                    style={{
                      padding: "10px 16px",
                      borderTop: `1px solid ${D.border}`,
                      background: isPrimary ? "rgba(184,217,53,0.03)" : "transparent",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          background: isPrimary ? "rgba(184,217,53,0.12)" : D.iconBg2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {sec && sec.svgIcon(isPrimary ? D.lime : D.txt3, 12)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: isPrimary ? 700 : 600,
                            color: D.txt,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.source}
                        </div>
                        <div style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                          {row.sector} · {row.date}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: row.value.startsWith("+") ? D.green : row.value.startsWith("-") ? D.red : D.txt,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {row.value}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: sigC(row.signal),
                            fontFamily: "Inter,sans-serif",
                            marginTop: 2,
                          }}
                        >
                          {row.signal}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: 9,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: "rgba(184,217,53,0.08)",
                          color: D.lime,
                          fontFamily: "Inter,sans-serif",
                          fontWeight: 600,
                          border: `1px solid ${D.iconBg}`,
                        }}
                      >
                        {row.category}
                      </span>
                      {row.tags.map((t, j) => (
                        <span
                          key={j}
                          style={{
                            fontSize: 9,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: D.iconBg2,
                            color: D.txt3,
                            fontFamily: "Inter,sans-serif",
                            border: `1px solid ${D.border}`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      <span
                        style={{
                          fontSize: 9,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: D.iconBg2,
                          color: row.status === "Active" ? D.green : row.status === "Monitoring" ? D.amber : D.txt3,
                          fontFamily: "Inter,sans-serif",
                          fontWeight: 600,
                          border: `1px solid ${D.border}`,
                          marginLeft: "auto",
                        }}
                      >
                        {row.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div
              style={{
                padding: "10px 16px",
                borderTop: `1px solid ${D.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 11, color: D.txt3, fontFamily: "Inter,sans-serif" }}>
                Page {tablePage} of {totalPages}
              </span>
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  onClick={() => setTablePage((p) => Math.max(1, p - 1))}
                  disabled={tablePage === 1}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: `1px solid ${D.border}`,
                    background: D.iconBg2,
                    cursor: tablePage === 1 ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: tablePage === 1 ? 0.3 : 1,
                  }}
                >
                  <ChevronLeft size={12} color={D.txt2} />
                </button>
                {Array.from({ length: Math.min(4, totalPages) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setTablePage(p)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      border: `1px solid ${p === tablePage ? D.lime : D.border}`,
                      background: p === tablePage ? "rgba(184,217,53,0.15)" : D.iconBg2,
                      fontSize: 10,
                      fontWeight: p === tablePage ? 700 : 400,
                      color: p === tablePage ? D.lime : D.txt3,
                      cursor: "pointer",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setTablePage((p) => Math.min(totalPages, p + 1))}
                  disabled={tablePage === totalPages}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: `1px solid ${D.border}`,
                    background: D.iconBg2,
                    cursor: tablePage === totalPages ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: tablePage === totalPages ? 0.3 : 1,
                  }}
                >
                  <ChevronRight size={12} color={D.txt2} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MobileSectorsPage({ s, setS }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ padding: "16px 16px 8px" }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, marginBottom: 2 }}>All Sectors</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif" }}>
          Ranked by BRIDGE Impact Score · Ghana 2026
        </div>
      </div>
      {sorted.map((sec, i) => {
        const act = sec.id === s.id;
        const bullish = sec.activity.filter((a) => a.sig === "Bullish").length;
        return (
          <div
            key={sec.id}
            onClick={() => setS(sec)}
            style={{
              margin: "0 12px 10px",
              borderRadius: 16,
              background: "#fff",
              border: act ? `2px solid ${C.accent}` : "2px solid transparent",
              boxShadow: act ? "0 4px 16px rgba(184,217,53,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px 12px" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: act ? C.accentBg : "#F3F4F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {sec.svgIcon(act ? C.primary : C.muted, 20)}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: act ? C.accent : "#E5E7EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 7,
                      fontWeight: 900,
                      color: act ? C.primary : "#9CA3AF",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 2 }}>{sec.short}</div>
                <div
                  style={{
                    fontSize: 10,
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {sec.totalV} ventures · ${sec.capLow}–{sec.capHigh}M cap
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: act ? C.accent : C.dark,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "-1px",
                    lineHeight: 1,
                  }}
                >
                  {sec.score}
                </div>
                <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>score</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid #F3F4F6" }}>
              {[
                { l: "IRR", v: `${sec.irrLow}–${sec.irrHigh}%` },
                { l: "Bullish", v: `${bullish}/${sec.activity.length}` },
                { l: "Health", v: `${Math.round(sec.score * 0.9)}%` },
              ].map((st, si) => (
                <div
                  key={si}
                  style={{ padding: "9px 0", textAlign: "center", borderRight: si < 2 ? "1px solid #F3F4F6" : "none" }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                    {st.v}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: C.muted,
                      fontFamily: "Inter,sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.3px",
                      marginTop: 1,
                    }}
                  >
                    {st.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div style={{ height: 16 }} />
    </div>
  );
}

function MobileSignalsPage({ s }) {
  const [filter, setFilter] = useState("All");
  const allSignals = SECTORS.flatMap((sec) =>
    sec.activity.map((a) => ({ ...a, sector: sec.short, svgIcon: sec.svgIcon })),
  );
  const filtered = filter === "All" ? allSignals : allSignals.filter((a) => a.sig === filter);
  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ padding: "16px 16px 8px" }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, marginBottom: 2 }}>Signal Feed</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif" }}>
          All sectors · Real-time intelligence
        </div>
      </div>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, padding: "0 16px 12px", overflowX: "auto", scrollbarWidth: "none" }}>
        {["All", "Bullish", "Watch", "Bearish"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: `1px solid ${filter === f ? C.accent : "#E5E7EB"}`,
              background: filter === f ? C.accentBg : "#fff",
              fontSize: 11,
              fontWeight: filter === f ? 700 : 500,
              color: filter === f ? C.primary : C.mid,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "Inter,sans-serif",
              flexShrink: 0,
            }}
          >
            {f}
          </button>
        ))}
      </div>
      {filtered.map((a, i) => (
        <div
          key={i}
          style={{
            margin: "0 12px 8px",
            borderRadius: 14,
            background: "#fff",
            border: "1px solid #F3F4F6",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", gap: 12, padding: "12px 14px", alignItems: "flex-start" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#F3F4F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {a.sig === "Bullish" ? (
                <TrendingUp size={15} color={C.green} />
              ) : a.sig === "Bearish" ? (
                <TrendingDown size={15} color={C.red} />
              ) : (
                <Activity size={15} color={C.yellow} />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.dark, lineHeight: 1.4, marginBottom: 4 }}>
                {a.h}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "2px 7px",
                    borderRadius: 6,
                    background: "#F3F4F6",
                  }}
                >
                  {a.svgIcon(C.muted, 9)}
                  <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{a.sector}</span>
                </div>
                <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
              </div>
            </div>
            <div style={{ flexShrink: 0, textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: sigCol(a.sig), fontFamily: "Inter,sans-serif" }}>
                {a.amt}
              </div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: sigCol(a.sig),
                  fontFamily: "Inter,sans-serif",
                  marginTop: 2,
                }}
              >
                {a.sig}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div style={{ height: 16 }} />
    </div>
  );
}

function MobileSettingsPage() {
  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ padding: "16px 16px 8px" }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, marginBottom: 2 }}>Settings</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif" }}>Account & preferences</div>
      </div>
      {/* Profile card */}
      <div
        style={{
          margin: "0 12px 12px",
          borderRadius: 16,
          background: `linear-gradient(135deg,${C.sidebar},#1A3326)`,
          padding: 20,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: "rgba(184,217,53,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <User size={24} color={C.accent} />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 2 }}>Joseph A.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.accent,
                boxShadow: `0 0 5px ${C.accent}`,
              }}
            />
            <span style={{ fontSize: 11, color: C.accent, fontFamily: "Inter,sans-serif", fontWeight: 700 }}>
              Full Access
            </span>
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            padding: "6px 12px",
            borderRadius: 8,
            background: "rgba(184,217,53,0.12)",
            border: "1px solid rgba(184,217,53,0.2)",
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, fontFamily: "Inter,sans-serif" }}>Pro</span>
        </div>
      </div>
      {/* Settings groups */}
      {[
        {
          group: "Intelligence",
          items: [
            { l: "Data Refresh", v: "Live" },
            { l: "Alert Threshold", v: "Score >85" },
            { l: "Default Sector", v: "Agriculture" },
          ],
        },
        {
          group: "Display",
          items: [
            { l: "Currency", v: "USD" },
            { l: "Date Format", v: "MMM YYYY" },
            { l: "Compact View", v: "Off" },
          ],
        },
        {
          group: "Account",
          items: [
            { l: "Version", v: "2.1.0" },
            { l: "Data: Mar 2026", v: "" },
            { l: "© 2026 BRIDGE PBC", v: "" },
          ],
        },
      ].map((g, gi) => (
        <div
          key={gi}
          style={{
            margin: "0 12px 10px",
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #E5E7EB",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "11px 16px 8px",
              fontSize: 10,
              fontWeight: 700,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              fontFamily: "Inter,sans-serif",
            }}
          >
            {g.group}
          </div>
          {g.items.map((item, ii) => (
            <div
              key={ii}
              style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderTop: "1px solid #F3F4F6" }}
            >
              <span style={{ flex: 1, fontSize: 13, color: C.dark }}>{item.l}</span>
              {item.v && (
                <span style={{ fontSize: 12, fontWeight: 600, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                  {item.v}
                </span>
              )}
              {item.v && <ChevronRight size={14} color="#D1D5DB" style={{ marginLeft: 6 }} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
