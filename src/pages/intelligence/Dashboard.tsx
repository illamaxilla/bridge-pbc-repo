import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
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
  Wifi,
  Search,
  PlusCircle,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  LineChart,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Download,
  Share2,
  Clock,
  RefreshCw,
  Star,
  Target,
  Activity,
  MoreHorizontal,
  SlidersHorizontal,
  FileText,
  BarChart2,
  FolderOpen,
  Globe,
  LayoutDashboard,
  LayoutGrid,
  BookOpen,
  Bookmark,
  Settings,
  Eye,
  LogOut,
  Briefcase,
  Bell,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as LC,
  Line,
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
  sideL: "#1A2E22",
  sideHov: "#1A2E1F",
  sideAct: "#1E3327",
  green: "#16A34A",
  red: "#DC2626",
  yellow: "#CA8A04",
};
const sectorSvgIcons = [
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
  (c, sz = 16) => (
    <svg
      width={sz}
      height={sz}
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
    short: "Agriculture",
    full: "Agriculture & Value Chains",
    tag: "Economic Engine",
    score: 90,
    capLow: 12,
    capHigh: 22,
    irrLow: 10,
    irrHigh: 25,
    totalV: 18,
    headline: "$1.9B lost to post-harvest failures annually \u2014 before a single crop reaches market.",
    insight:
      "Cold chain and aggregation infrastructure are the two highest-ROI entry points. Tier I ventures show 15\u201325% IRR. Government's Feed Ghana Programme creates rare policy alignment.",
    subSectors: [
      { name: "Processing Facilities", pct: 35, color: "#B8D935" },
      { name: "Cold Chain & Storage", pct: 25, color: "#2E5A4D" },
      { name: "Aggregation Platforms", pct: 20, color: "#1B4D3E" },
      { name: "AgTech Investment", pct: 12, color: "#4ADE80" },
      { name: "Other", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Tomato Processing Facility", cap: "$2\u20134M", irr: "15\u201320%", risk: "MEDIUM" },
      { name: "Solar Cold Storage Network", cap: "$1.5\u20133M", irr: "12\u201315%", risk: "MEDIUM" },
      { name: "Cooperative Capital Fund", cap: "$1\u20132M", irr: "10\u201314%", risk: "MEDIUM" },
      { name: "AgTech Investment Portfolio", cap: "$1\u20132M", irr: "20\u201325%", risk: "HIGH" },
      { name: "Market Aggregation Centers", cap: "$0.5\u20131M", irr: "8\u201312%", risk: "LOW" },
      { name: "Agricultural Insurance Co.", cap: "$0.3\u20130.6M", irr: "Commission", risk: "LOW" },
    ],
    t2: [
      { name: "Fruit Processing Facility", cap: "$2\u20134M", irr: "14\u201318%", risk: "MEDIUM" },
      { name: "Cashew/Shea Processing", cap: "$1.5\u20133M", irr: "15\u201320%", risk: "MEDIUM" },
      { name: "Warehouse Receipt Financing", cap: "$1\u20132M", irr: "12\u201316%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "Cocoa Processing Facility", cap: "$3\u20136M", irr: "15\u201322%", risk: "HIGH" },
      { name: "Integrated Agriculture Hub", cap: "$2\u20134M", irr: "12\u201318%", risk: "HIGH" },
    ],
    pipeline: [
      { label: "Cold Chain North", pct: 68, target: "$5.5M", current: "$3.7M", months: 8 },
      { label: "Aggregation Platform", pct: 45, target: "$3.0M", current: "$1.35M", months: 12 },
      { label: "Cooperative Fund", pct: 80, target: "$2.0M", current: "$1.6M", months: 4 },
      { label: "AgTech Portfolio", pct: 30, target: "$2.0M", current: "$0.6M", months: 18 },
    ],
    activity: [
      { h: "Post-Harvest Loss Crisis Brief Published", amt: "+$2M", sig: "Bullish", date: "Feb 2026" },
      { h: "GH\u20b54.5B PFJ Phase 3 Budget Confirmed", amt: "+Policy", sig: "Bullish", date: "Mar 2026" },
      { h: "2024 Drought \u2014 436k Farmers Affected", amt: "Risk", sig: "Watch", date: "Jan 2026" },
      { h: "Cocoa Exports Hit $372.6M (Dec 2024)", amt: "+$372M", sig: "Bullish", date: "Jan 2026" },
    ],
    cross: ["financial", "technology", "infrastructure", "education"],
  },
  {
    id: "financial",
    icon: Wallet,
    short: "Financial Inclusion",
    full: "Financial Inclusion & Economic Security",
    tag: "Foundation",
    score: 91,
    capLow: 10,
    capHigh: 20,
    irrLow: 8,
    irrHigh: 25,
    totalV: 18,
    headline: "70% of Ghanaians outside formal finance \u2014 yet GH\u20b53.019T flows through mobile money annually.",
    insight:
      "Ghana is ranked #1 globally on the GSMA Mobile Money Regulatory Index (95.06%). The MSME credit gap alone is $2.2B. Tier I ventures target Kejetia market traders directly.",
    subSectors: [
      { name: "Lending & Credit", pct: 40, color: "#B8D935" },
      { name: "Mobile Money", pct: 25, color: "#2E5A4D" },
      { name: "Insurance", pct: 18, color: "#1B4D3E" },
      { name: "Savings & Susu", pct: 12, color: "#60A5FA" },
      { name: "Other", pct: 5, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Market Financial Services Platform", cap: "$1\u20133M", irr: "15\u201322%", risk: "MEDIUM" },
      { name: "Trader Working Capital Facility", cap: "$0.5\u20132M", irr: "18\u201325%", risk: "MEDIUM" },
      { name: "Digital Susu Integration", cap: "$0.2\u20130.5M", irr: "12\u201318%", risk: "LOW" },
      { name: "Market Microinsurance Bundle", cap: "$0.15\u20130.4M", irr: "Commission", risk: "LOW" },
      { name: "Financial Health Hub", cap: "$0.1\u20130.25M", irr: "Break-even", risk: "LOW" },
    ],
    t2: [
      { name: "MSME Credit Guarantee Facility", cap: "$2\u20135M", irr: "8\u201312%", risk: "MEDIUM" },
      { name: "Women's Economic Empowerment Fund", cap: "$0.5\u20131.5M", irr: "12\u201318%", risk: "MEDIUM" },
      { name: "Alternative Credit Scoring", cap: "$0.3\u20130.7M", irr: "15\u201320%", risk: "HIGH" },
    ],
    t3: [
      { name: "BRIDGE Microfinance Institution", cap: "$5\u201315M", irr: "Variable", risk: "HIGH" },
      { name: "Fintech Equity Portfolio", cap: "$1\u20135M", irr: "Variable", risk: "HIGH" },
    ],
    pipeline: [
      { label: "Market Services Platform", pct: 72, target: "$3.0M", current: "$2.16M", months: 5 },
      { label: "Working Capital Facility", pct: 55, target: "$2.0M", current: "$1.1M", months: 9 },
      { label: "Susu Digitization", pct: 40, target: "$0.5M", current: "$0.2M", months: 10 },
      { label: "MSME Credit Guarantee", pct: 20, target: "$5.0M", current: "$1.0M", months: 20 },
    ],
    activity: [
      { h: "Bank of Ghana Digital Credit Directive Expands", amt: "+Policy", sig: "Bullish", date: "Mar 2026" },
      { h: "MoMo Interoperability Live \u2014 All Networks", amt: "+Access", sig: "Bullish", date: "Jan 2026" },
      { h: "SME Financing Gap Widens to $2.2B", amt: "$2.2B", sig: "Watch", date: "Feb 2026" },
      { h: "Ghana Ranked #1 on GSMA MoMo Index", amt: "95.06", sig: "Bullish", date: "Nov 2025" },
    ],
    cross: ["technology", "agriculture", "health", "infrastructure"],
  },
  {
    id: "technology",
    icon: Cpu,
    short: "Technology",
    full: "Technology & Innovation",
    tag: "Growth Engine",
    score: 89,
    capLow: 8,
    capHigh: 15,
    irrLow: 15,
    irrHigh: 30,
    totalV: 15,
    headline: "Kejetia \u2014 10,000+ vendors, West Africa's largest market \u2014 is BRIDGE's flagship tech platform.",
    insight:
      "Ghana has 400+ active startups but virtually no Series A capital in-country. BRIDGE fills the missing middle with Kejetia as the proof-of-concept anchor and a $5\u201310M growth fund.",
    subSectors: [
      { name: "Platform / SaaS", pct: 35, color: "#B8D935" },
      { name: "Investment / VC", pct: 28, color: "#8B5CF6" },
      { name: "Talent & Training", pct: 18, color: "#2E5A4D" },
      { name: "FinTech", pct: 12, color: "#1B4D3E" },
      { name: "Other", pct: 7, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Kejetia Digital Platform", cap: "$3\u20135M", irr: "18\u201325%", risk: "MEDIUM" },
      { name: "BRIDGE Growth Fund \u2014 Tech", cap: "$5\u201310M", irr: "20\u201330%", risk: "HIGH" },
      { name: "Tech Talent Bridge Program", cap: "$0.3\u20130.6M", irr: "Break-even", risk: "LOW" },
      { name: "Fintech Portfolio", cap: "$2\u20134M", irr: "15\u201325%", risk: "HIGH" },
      { name: "Digital Apprenticeship", cap: "$0.2\u20130.4M", irr: "Social", risk: "LOW" },
    ],
    t2: [
      { name: "Market Platform Replication", cap: "$2\u20134M", irr: "15\u201322%", risk: "MEDIUM" },
      { name: "AgTech Investment Portfolio", cap: "$1.5\u20133M", irr: "20\u201328%", risk: "HIGH" },
      { name: "Rural Digital Access", cap: "$1\u20132M", irr: "Social", risk: "MEDIUM" },
    ],
    t3: [
      { name: "AI/ML Center of Excellence", cap: "$2\u20135M", irr: "Variable", risk: "HIGH" },
      { name: "Data Center Co-Investment", cap: "$3\u20138M", irr: "Variable", risk: "HIGH" },
    ],
    pipeline: [
      { label: "Kejetia Platform", pct: 85, target: "$5.0M", current: "$4.25M", months: 2 },
      { label: "BRIDGE Growth Fund", pct: 50, target: "$10M", current: "$5.0M", months: 10 },
      { label: "Fintech Portfolio", pct: 35, target: "$4.0M", current: "$1.4M", months: 14 },
      { label: "Market Replication", pct: 15, target: "$4.0M", current: "$0.6M", months: 22 },
    ],
    activity: [
      { h: "Kejetia Phase 2 \u2014 3,000 New Vendors Onboarded", amt: "+3k", sig: "Bullish", date: "Mar 2026" },
      { h: "Ghana Joins Smart Africa Alliance", amt: "+Policy", sig: "Bullish", date: "Feb 2026" },
      { h: "Series A Desert \u2014 Only 2 Deals in 2025", amt: "-", sig: "Watch", date: "Jan 2026" },
      { h: "Disrupt Africa: Ghana Leads West Africa Funding", amt: "+28%", sig: "Bullish", date: "Dec 2025" },
    ],
    cross: ["agriculture", "financial", "health", "education"],
  },
  {
    id: "energy",
    icon: BatteryCharging,
    short: "Energy",
    full: "Energy & Renewable Resources",
    tag: "Foundation",
    score: 88,
    capLow: 12,
    capHigh: 22,
    irrLow: 12,
    irrHigh: 22,
    totalV: 14,
    headline: "Power outages cost Ghana $924M/yr \u2014 solar irradiance 4.5\u20136 kWh/m\u00b2 is Africa-class.",
    insight:
      "$200M Clean Cooking Outcome Bond and 1GW Solar Park expansion signal unprecedented government commitment. Distributed solar shows 15\u201322% IRR on a structurally falling cost curve.",
    subSectors: [
      { name: "Solar Solutions", pct: 40, color: "#B8D935" },
      { name: "Clean Cooking", pct: 22, color: "#F59E0B" },
      { name: "Mini-Grid Dev.", pct: 18, color: "#2E5A4D" },
      { name: "Training", pct: 12, color: "#1B4D3E" },
      { name: "Other", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Ghana Solar Solutions Company", cap: "$3\u20136M", irr: "15\u201322%", risk: "MEDIUM" },
      { name: "Clean Cooking Distribution Network", cap: "$2\u20134M", irr: "12\u201318%", risk: "MEDIUM" },
      { name: "Solar Technician Training Academy", cap: "$0.5\u20131M", irr: "Social", risk: "LOW" },
      { name: "Solar-Powered Cold Storage Network", cap: "$1.5\u20133M", irr: "12\u201316%", risk: "MEDIUM" },
      { name: "Energy Efficiency Services Company", cap: "$0.5\u20131M", irr: "14\u201318%", risk: "LOW" },
    ],
    t2: [
      { name: "Community Mini-Grid Development", cap: "$2\u20135M", irr: "14\u201320%", risk: "MEDIUM" },
      { name: "Solar Equipment Import & Dist.", cap: "$1\u20132M", irr: "15\u201320%", risk: "MEDIUM" },
      { name: "Residential Solar Financing", cap: "$1\u20132M", irr: "12\u201318%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "EV Charging Infrastructure", cap: "$2\u20134M", irr: "12\u201318%", risk: "HIGH" },
      { name: "Battery Storage Systems", cap: "$2\u20135M", irr: "15\u201322%", risk: "HIGH" },
    ],
    pipeline: [
      { label: "Ghana Solar Solutions", pct: 65, target: "$6.0M", current: "$3.9M", months: 7 },
      { label: "Clean Cooking Network", pct: 48, target: "$4.0M", current: "$1.92M", months: 11 },
      { label: "Mini-Grid Dev. Co.", pct: 25, target: "$5.0M", current: "$1.25M", months: 18 },
      { label: "Solar Equipment Dist.", pct: 35, target: "$2.0M", current: "$0.7M", months: 14 },
    ],
    activity: [
      { h: "Solar Park: 200MW to 1GW Expansion Confirmed", amt: "+800MW", sig: "Bullish", date: "Mar 2026" },
      { h: "$200M Clean Cooking Outcome Bond Now Open", amt: "$200M", sig: "Bullish", date: "Feb 2026" },
      { h: "Dumsor Returns \u2014 Business Losses Mount", amt: "-$900M", sig: "Watch", date: "Jan 2026" },
      { h: "IRENA: Solar Costs Down 89% Since 2010", amt: "-89%", sig: "Bullish", date: "Dec 2025" },
    ],
    cross: ["agriculture", "manufacturing", "transportation", "infrastructure"],
  },
  {
    id: "infrastructure",
    icon: Blocks,
    short: "Infrastructure",
    full: "Infrastructure & Basic Services",
    tag: "Foundation",
    score: 87,
    capLow: 8,
    capHigh: 15,
    irrLow: 8,
    irrHigh: 20,
    totalV: 15,
    headline: "$40B+ infrastructure gap \u2014 2026 Budget allocates GH\u20b518B to infrastructure alone.",
    insight:
      "Infrastructure underpins every other BRIDGE sector. Rural connectivity is the multiplier. Build24 pillar creates direct co-investment pathways across roads, water, and digital.",
    subSectors: [
      { name: "Water Systems", pct: 30, color: "#B8D935" },
      { name: "Connectivity", pct: 28, color: "#2E5A4D" },
      { name: "Roads & Logistics", pct: 22, color: "#1B4D3E" },
      { name: "Digital Infra.", pct: 12, color: "#60A5FA" },
      { name: "Sanitation", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Rural Connectivity Platform", cap: "$2\u20134M", irr: "12\u201318%", risk: "MEDIUM" },
      { name: "Water Systems Management Co.", cap: "$2\u20134M", irr: "10\u201315%", risk: "LOW" },
      { name: "Last-Mile Logistics Network", cap: "$1.5\u20133M", irr: "14\u201320%", risk: "MEDIUM" },
      { name: "Community Sanitation Services", cap: "$0.5\u20131.5M", irr: "8\u201312%", risk: "LOW" },
      { name: "Digital Infrastructure Co.", cap: "$2\u20134M", irr: "15\u201320%", risk: "MEDIUM" },
    ],
    t2: [
      { name: "Urban Infrastructure Fund", cap: "$3\u20136M", irr: "10\u201315%", risk: "MEDIUM" },
      { name: "Telecoms Tower Fund", cap: "$2\u20134M", irr: "14\u201318%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "Waste Management Company", cap: "$2\u20135M", irr: "12\u201318%", risk: "HIGH" },
      { name: "Smart City Infrastructure", cap: "$3\u20137M", irr: "Variable", risk: "HIGH" },
    ],
    pipeline: [
      { label: "Rural Connectivity", pct: 55, target: "$4.0M", current: "$2.2M", months: 10 },
      { label: "Water Systems Co.", pct: 70, target: "$4.0M", current: "$2.8M", months: 6 },
      { label: "Last-Mile Logistics", pct: 40, target: "$3.0M", current: "$1.2M", months: 13 },
      { label: "Urban Infra. Fund", pct: 20, target: "$6.0M", current: "$1.2M", months: 22 },
    ],
    activity: [
      {
        h: "GH\u20b518B+ Infra Allocation Locked \u2014 2026 Budget",
        amt: "+Policy",
        sig: "Bullish",
        date: "Mar 2026",
      },
      { h: "Roads Authority Fast-Track Program Launched", amt: "+Ops", sig: "Bullish", date: "Feb 2026" },
      { h: "Water & Sanitation: Only 27% Coverage", amt: "-73%", sig: "Watch", date: "Jan 2026" },
    ],
    cross: ["transportation", "energy", "agriculture", "technology"],
  },
  {
    id: "health",
    icon: Cross,
    short: "Health Systems",
    full: "Health Systems & Wellbeing",
    tag: "Human Capital",
    score: 83,
    capLow: 8,
    capHigh: 16,
    irrLow: 8,
    irrHigh: 22,
    totalV: 15,
    headline: "0.1 doctors per 1,000 vs WHO benchmark of 1.0 \u2014 supply chain leakage at 30\u201340%.",
    insight:
      "Community health worker platforms are the fastest path to measurable impact. NHIA digital claims expansion creates direct reimbursement pathways for BRIDGE-backed primary care ventures.",
    subSectors: [
      { name: "Primary Care", pct: 32, color: "#B8D935" },
      { name: "Supply Chain", pct: 28, color: "#EF4444" },
      { name: "Digital Health", pct: 20, color: "#2E5A4D" },
      { name: "Diagnostics", pct: 12, color: "#1B4D3E" },
      { name: "Health Finance", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Community Health Worker Platform", cap: "$1.5\u20133M", irr: "Social", risk: "LOW" },
      { name: "Medical Supply Chain Co.", cap: "$2\u20134M", irr: "14\u201320%", risk: "MEDIUM" },
      { name: "Diagnostic Services Company", cap: "$1.5\u20133M", irr: "18\u201322%", risk: "MEDIUM" },
      { name: "NHIS Claims Processing Platform", cap: "$0.5\u20131M", irr: "12\u201316%", risk: "MEDIUM" },
    ],
    t2: [
      { name: "Telemedicine Network", cap: "$1\u20132.5M", irr: "12\u201318%", risk: "MEDIUM" },
      { name: "Health Finance Platform", cap: "$0.5\u20131.5M", irr: "10\u201315%", risk: "MEDIUM" },
      { name: "Pharmaceutical Distribution", cap: "$1.5\u20133M", irr: "14\u201320%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "Medical Training Institute", cap: "$2\u20134M", irr: "Social", risk: "MEDIUM" },
      { name: "HealthTech Investment Portfolio", cap: "$1\u20133M", irr: "18\u201325%", risk: "HIGH" },
    ],
    pipeline: [
      { label: "Supply Chain Co.", pct: 60, target: "$4.0M", current: "$2.4M", months: 8 },
      { label: "Community HW Platform", pct: 75, target: "$3.0M", current: "$2.25M", months: 5 },
      { label: "Telemedicine Network", pct: 30, target: "$2.5M", current: "$0.75M", months: 16 },
      { label: "Diagnostic Services", pct: 45, target: "$3.0M", current: "$1.35M", months: 12 },
    ],
    activity: [
      { h: "NHIA Expands Digital Claims Processing", amt: "+Access", sig: "Bullish", date: "Feb 2026" },
      { h: "GH\u20b58.2B Health Allocation \u2014 12% YoY Increase", amt: "+12%", sig: "Bullish", date: "Mar 2026" },
      { h: "Workforce Gap: 40k More Health Workers Needed", amt: "-40k", sig: "Watch", date: "Jan 2026" },
    ],
    cross: ["technology", "financial", "manufacturing", "education"],
  },
  {
    id: "education",
    icon: GraduationCap,
    short: "Education",
    full: "Education & Skills",
    tag: "Human Capital",
    score: 85,
    capLow: 16.5,
    capHigh: 33.5,
    irrLow: 10,
    irrHigh: 25,
    totalV: 15,
    headline: "60% of graduates underemployed within 2 years \u2014 400% tertiary growth, zero market alignment.",
    insight:
      "TVET transformation is the highest-leverage education investment. Government's GH\u20b52B commitment creates direct co-investment pathways. Diaspora mentorship shows exceptional social return at near-zero cost.",
    subSectors: [
      { name: "TVET & Vocational", pct: 38, color: "#B8D935" },
      { name: "Scholarships", pct: 22, color: "#0EA5E9" },
      { name: "Skills Bootcamps", pct: 18, color: "#2E5A4D" },
      { name: "EdTech Investment", pct: 14, color: "#1B4D3E" },
      { name: "Other", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "TVET Partnership Program", cap: "$3\u20136M", irr: "Social+", risk: "MEDIUM" },
      { name: "Diaspora Scholarship Fund", cap: "$2\u20133M", irr: "Social+", risk: "LOW" },
      { name: "Skills Bootcamp Network", cap: "$1.5\u20133M", irr: "10\u201315%", risk: "LOW" },
      { name: "Diaspora Mentorship Platform", cap: "$0.5\u20131M", irr: "Social", risk: "LOW" },
      { name: "EdTech Investment Portfolio", cap: "$1.5\u20133M", irr: "20\u201328%", risk: "HIGH" },
    ],
    t2: [
      { name: "TVET Regional Expansion", cap: "$2\u20134M", irr: "Social+", risk: "MEDIUM" },
      { name: "Professional Dev. Academy", cap: "$1\u20132M", irr: "12\u201318%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "BRIDGE Training Center Kumasi", cap: "$2\u20134M", irr: "12\u201318%", risk: "MEDIUM" },
      { name: "Research Partnership", cap: "$0.5\u20131M", irr: "Social", risk: "LOW" },
    ],
    pipeline: [
      { label: "TVET Partnership", pct: 58, target: "$6.0M", current: "$3.48M", months: 9 },
      { label: "Scholarship Fund", pct: 80, target: "$3.0M", current: "$2.4M", months: 4 },
      { label: "Skills Bootcamp Net.", pct: 45, target: "$3.0M", current: "$1.35M", months: 12 },
      { label: "EdTech Portfolio", pct: 20, target: "$3.0M", current: "$0.6M", months: 20 },
    ],
    activity: [
      { h: "MoE TVET Overhaul \u2014 GH\u20b52B Committed", amt: "+Policy", sig: "Bullish", date: "Jan 2026" },
      { h: "Ghana Youth Unemployment Hits 13.4%", amt: "-", sig: "Watch", date: "Feb 2026" },
      { h: "Diaspora Fellowship: 120 Placements Confirmed", amt: "+120", sig: "Bullish", date: "Mar 2026" },
    ],
    cross: ["technology", "manufacturing", "agriculture", "health"],
  },
  {
    id: "housing",
    icon: Home,
    short: "Housing",
    full: "Housing & Real Estate",
    tag: "Foundation",
    score: 82,
    capLow: 15,
    capHigh: 25,
    irrLow: 10,
    irrHigh: 20,
    totalV: 11,
    headline: "2 million unit deficit growing 200k/yr \u2014 mortgage penetration below 2% of GDP.",
    insight:
      "The $6.65B remittance flow already includes significant informal housing spend. NHA PPP framework opens private entry at scale. Diaspora housing products meet proven, demonstrated demand.",
    subSectors: [
      { name: "Affordable Dev.", pct: 38, color: "#B8D935" },
      { name: "Construction Finance", pct: 28, color: "#14B8A6" },
      { name: "Diaspora Products", pct: 18, color: "#2E5A4D" },
      { name: "Rental Management", pct: 10, color: "#1B4D3E" },
      { name: "Materials", pct: 6, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Affordable Housing Developer", cap: "$8\u201315M", irr: "14\u201320%", risk: "MEDIUM" },
      { name: "Construction Finance Platform", cap: "$4\u20138M", irr: "12\u201318%", risk: "MEDIUM" },
    ],
    t2: [
      { name: "Diaspora Housing Product", cap: "$2\u20134M", irr: "10\u201315%", risk: "LOW" },
      { name: "Rental Management Platform", cap: "$1\u20132M", irr: "12\u201318%", risk: "LOW" },
    ],
    t3: [{ name: "Building Materials Supply Co.", cap: "$2\u20134M", irr: "14\u201318%", risk: "MEDIUM" }],
    pipeline: [
      { label: "Affordable Housing", pct: 40, target: "$15M", current: "$6.0M", months: 18 },
      { label: "Construction Finance", pct: 55, target: "$8.0M", current: "$4.4M", months: 10 },
      { label: "Diaspora Housing Prod.", pct: 70, target: "$4.0M", current: "$2.8M", months: 6 },
      { label: "Rental Management", pct: 30, target: "$2.0M", current: "$0.6M", months: 16 },
    ],
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
    short: "Manufacturing",
    full: "Manufacturing & Light Industry",
    tag: "Economic Engine",
    score: 81,
    capLow: 15,
    capHigh: 30,
    irrLow: 12,
    irrHigh: 22,
    totalV: 14,
    headline: "Ghana imports $8B+ of goods it has every raw input to produce domestically.",
    insight:
      "GH\u20b55B manufacturing incentive package plus 5-year tax holiday for domestic manufacturers in 2026 Budget. Agro-processing is lowest-risk entry point \u2014 feeds directly into Agriculture cold chain.",
    subSectors: [
      { name: "Agro-Processing", pct: 35, color: "#B8D935" },
      { name: "Packaging", pct: 22, color: "#6366F1" },
      { name: "Consumer Goods", pct: 20, color: "#2E5A4D" },
      { name: "Industrial Training", pct: 14, color: "#1B4D3E" },
      { name: "Export Processing", pct: 9, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Agro-Processing Facility", cap: "$5\u201310M", irr: "15\u201320%", risk: "MEDIUM" },
      { name: "Packaging Solutions Company", cap: "$3\u20136M", irr: "14\u201318%", risk: "MEDIUM" },
      { name: "Industrial Training Centre", cap: "$1\u20132M", irr: "Social+", risk: "LOW" },
    ],
    t2: [
      { name: "Consumer Goods Manufacturer", cap: "$4\u20138M", irr: "14\u201320%", risk: "MEDIUM" },
      { name: "Pharmaceutical Manufacturing", cap: "$3\u20136M", irr: "15\u201322%", risk: "HIGH" },
      { name: "Textile & Garments Factory", cap: "$2\u20134M", irr: "12\u201318%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "Export Processing Facility", cap: "$5\u201310M", irr: "15\u201322%", risk: "HIGH" },
      { name: "Industrial Park Co-Investment", cap: "$5\u201310M", irr: "12\u201318%", risk: "HIGH" },
    ],
    pipeline: [
      { label: "Agro-Processing Fac.", pct: 45, target: "$10M", current: "$4.5M", months: 14 },
      { label: "Packaging Solutions", pct: 60, target: "$6.0M", current: "$3.6M", months: 9 },
      { label: "Consumer Goods Mfg.", pct: 20, target: "$8.0M", current: "$1.6M", months: 22 },
      { label: "Pharma Manufacturing", pct: 10, target: "$6.0M", current: "$0.6M", months: 30 },
    ],
    activity: [
      { h: "GH\u20b55B Manufacturing Incentive Package Confirmed", amt: "+Policy", sig: "Bullish", date: "Mar 2026" },
      { h: "5-Year Tax Holiday for Domestic Manufacturers", amt: "+Tax", sig: "Bullish", date: "Mar 2026" },
      { h: "Import Bill Grows to $8.2B \u2014 Opportunity Widens", amt: "$8.2B", sig: "Watch", date: "Feb 2026" },
    ],
    cross: ["agriculture", "energy", "transportation", "education"],
  },
  {
    id: "transportation",
    icon: Truck,
    short: "Transportation",
    full: "Transportation & Logistics",
    tag: "Foundation",
    score: 79,
    capLow: 10,
    capHigh: 22,
    irrLow: 10,
    irrHigh: 22,
    totalV: 14,
    headline: "Logistics costs 2-3x global average \u2014 cold chain alone is a $900M annual opportunity.",
    insight:
      "Every sector's growth multiplier. Tema Port Phase 2 ($1.5B) and Boankra Inland Port ($308M) create infrastructure tailwinds. Cold Chain Ghana directly addresses the $1.9B post-harvest loss problem.",
    subSectors: [
      { name: "Cold Chain", pct: 32, color: "#B8D935" },
      { name: "Last-Mile Delivery", pct: 28, color: "#64748B" },
      { name: "Fleet & Freight", pct: 20, color: "#2E5A4D" },
      { name: "Port & Warehousing", pct: 13, color: "#1B4D3E" },
      { name: "Other", pct: 7, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Cold Chain Ghana", cap: "$3\u20136M", irr: "16\u201322%", risk: "MEDIUM" },
      { name: "Ghana Last Mile Delivery Co.", cap: "$2\u20134M", irr: "14\u201320%", risk: "MEDIUM" },
      { name: "Fleet Management Services", cap: "$1.5\u20133M", irr: "14\u201318%", risk: "LOW" },
      { name: "Logistics Technology Platform", cap: "$1\u20132M", irr: "20\u201325%", risk: "MEDIUM" },
      { name: "Logistics Training Academy", cap: "$0.5\u20131M", irr: "Social+", risk: "LOW" },
    ],
    t2: [
      { name: "Pharma Cold Chain Services", cap: "$1.5\u20133M", irr: "16\u201322%", risk: "MEDIUM" },
      { name: "Agricultural Aggregation Transport", cap: "$2\u20134M", irr: "14\u201318%", risk: "MEDIUM" },
      { name: "Warehousing & Distribution", cap: "$2\u20134M", irr: "12\u201316%", risk: "MEDIUM" },
    ],
    t3: [
      { name: "Inland Port Services", cap: "$3\u20136M", irr: "12\u201318%", risk: "HIGH" },
      { name: "Rail Logistics Integration", cap: "$2\u20135M", irr: "12\u201316%", risk: "HIGH" },
    ],
    pipeline: [
      { label: "Cold Chain Ghana", pct: 50, target: "$6.0M", current: "$3.0M", months: 12 },
      { label: "Last Mile Delivery", pct: 40, target: "$4.0M", current: "$1.6M", months: 14 },
      { label: "Logistics Tech Platform", pct: 65, target: "$2.0M", current: "$1.3M", months: 7 },
      { label: "Fleet Management", pct: 35, target: "$3.0M", current: "$1.05M", months: 15 },
    ],
    activity: [
      { h: "Tema Port Phase 2 \u2014 $1.5B Investment Confirmed", amt: "$1.5B", sig: "Bullish", date: "Feb 2026" },
      { h: "Connect24: 18% Logistics Cost Reduction Target", amt: "-18%", sig: "Bullish", date: "Jan 2026" },
      { h: "Cold Chain Revenue Potential: $900M/yr", amt: "$900M", sig: "Bullish", date: "Dec 2025" },
    ],
    cross: ["agriculture", "energy", "manufacturing", "infrastructure"],
  },
  {
    id: "tourism",
    icon: Luggage,
    short: "Tourism",
    full: "Tourism & Hospitality",
    tag: "Growth Engine",
    score: 76,
    capLow: 10,
    capHigh: 18,
    irrLow: 10,
    irrHigh: 22,
    totalV: 13,
    headline: "Year of Return generated $3.3B in 2019 \u2014 the infrastructure to sustain it was never built.",
    insight:
      "Cultural tourism carries diaspora demand that cannot be manufactured. Heritage circuits and hospitality training are structurally underbuilt. YoR proved the demand exists at scale.",
    subSectors: [
      { name: "Heritage Tourism", pct: 32, color: "#B8D935" },
      { name: "Hospitality Training", pct: 25, color: "#EC4899" },
      { name: "Eco-Tourism", pct: 22, color: "#2E5A4D" },
      { name: "Cultural Platforms", pct: 14, color: "#1B4D3E" },
      { name: "Other", pct: 7, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Heritage Tourism Network", cap: "$3\u20136M", irr: "14\u201320%", risk: "MEDIUM" },
      { name: "Hospitality Training Academy", cap: "$1.5\u20133M", irr: "Social+", risk: "LOW" },
    ],
    t2: [
      { name: "Eco-Tourism Development Fund", cap: "$2\u20134M", irr: "12\u201318%", risk: "MEDIUM" },
      { name: "Cultural Experience Platform", cap: "$1\u20132M", irr: "15\u201322%", risk: "MEDIUM" },
    ],
    t3: [{ name: "Destination Development Company", cap: "$3\u20136M", irr: "12\u201318%", risk: "HIGH" }],
    pipeline: [
      { label: "Heritage Tourism Net.", pct: 50, target: "$6.0M", current: "$3.0M", months: 11 },
      { label: "Hospitality Academy", pct: 65, target: "$3.0M", current: "$1.95M", months: 7 },
      { label: "Eco-Tourism Fund", pct: 25, target: "$4.0M", current: "$1.0M", months: 18 },
      { label: "Cultural Platform", pct: 35, target: "$2.0M", current: "$0.7M", months: 15 },
    ],
    activity: [
      { h: "Ghana Tourism Authority New Destination Brand", amt: "+Brand", sig: "Bullish", date: "Jan 2026" },
      { h: "Accra MICE Tourism Up 35% \u2014 Conference Demand", amt: "+35%", sig: "Bullish", date: "Feb 2026" },
      { h: "Hotel Occupancy Still 58% National Average", amt: "58%", sig: "Watch", date: "Dec 2025" },
    ],
    cross: ["creative", "housing", "transportation", "infrastructure"],
  },
  {
    id: "creative",
    icon: Camera,
    short: "Creative Industries",
    full: "Sports, Entertainment & Creative",
    tag: "Growth Engine",
    score: 78,
    capLow: 10,
    capHigh: 20.5,
    irrLow: 10,
    irrHigh: 28,
    totalV: 14,
    headline: "Afrobeats is global. Ghana captures less than 15% of its own IP value.",
    insight:
      "Content production infrastructure, talent pipelines, and digital distribution are structurally absent. First movers build durable IP advantages. Sports infrastructure doubles as community assets.",
    subSectors: [
      { name: "Content Production", pct: 30, color: "#B8D935" },
      { name: "Talent Development", pct: 25, color: "#F97316" },
      { name: "IP Monetisation", pct: 22, color: "#2E5A4D" },
      { name: "Sports Infrastructure", pct: 15, color: "#1B4D3E" },
      { name: "Other", pct: 8, color: "#E5E7EB" },
    ],
    t1: [
      { name: "Content Production Studio", cap: "$2\u20134M", irr: "15\u201322%", risk: "MEDIUM" },
      { name: "Talent Development Platform", cap: "$1.5\u20133M", irr: "Social+", risk: "LOW" },
    ],
    t2: [
      { name: "IP Monetisation Platform", cap: "$1.5\u20133M", irr: "20\u201328%", risk: "HIGH" },
      { name: "Sports Infrastructure Fund", cap: "$3\u20136M", irr: "10\u201315%", risk: "MEDIUM" },
    ],
    t3: [{ name: "Creative Hub Network", cap: "$2\u20135M", irr: "12\u201318%", risk: "MEDIUM" }],
    pipeline: [
      { label: "Content Studio", pct: 55, target: "$4.0M", current: "$2.2M", months: 10 },
      { label: "Talent Platform", pct: 40, target: "$3.0M", current: "$1.2M", months: 13 },
      { label: "IP Monetisation", pct: 20, target: "$3.0M", current: "$0.6M", months: 20 },
      { label: "Sports Infra. Fund", pct: 15, target: "$6.0M", current: "$0.9M", months: 26 },
    ],
    activity: [
      { h: "Ghana Music Awards \u2014 40% Viewership Growth", amt: "+40%", sig: "Bullish", date: "Jan 2026" },
      { h: "Afrobeats Streams Exceed 45M Monthly Listeners", amt: "45M", sig: "Bullish", date: "Feb 2026" },
      { h: "IP Piracy Costs Creative Sector $400M+ Annually", amt: "-$400M", sig: "Watch", date: "Dec 2025" },
    ],
    cross: ["technology", "tourism", "education", "infrastructure"],
  },
];
const sigCol = (s) => (s === "Bullish" ? "#16A34A" : s === "Bearish" ? "#DC2626" : "#CA8A04");
const sigBg = (s) => (s === "Bullish" ? "#DCFCE7" : s === "Bearish" ? "#FEE2E2" : "#FEF9C3");
function BridgeLogo() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3434.33 932.3"
        style={{ width: 104, height: 28, display: "block" }}
      >
        <path
          style={{ fill: "#fff" }}
          d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
        />
        <path
          style={{ fill: "#fff", stroke: "#000", strokeWidth: ".5px", strokeMiterlimit: 10 }}
          d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1Z"
        />
        <path
          style={{ fill: "#fff", stroke: "#000", strokeWidth: ".5px", strokeMiterlimit: 10 }}
          d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
        />
        <rect
          style={{ fill: "#B8D935", stroke: "#1b4d3e", strokeMiterlimit: 10 }}
          x="1427.38"
          y="17.35"
          width="205.2"
          height="145"
        />
        <rect style={{ fill: "#fff" }} x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
        <path
          style={{ fill: "#fff" }}
          d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
        />
        <rect style={{ fill: "#fff" }} x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
        <rect
          style={{ fill: "#B8D935", stroke: "#1b4d3e", strokeMiterlimit: 10 }}
          x="3083.41"
          y="339.47"
          width="175.12"
          height="257.67"
        />
        <rect
          style={{ fill: "#B8D935", stroke: "#1b4d3e", strokeMiterlimit: 10 }}
          x="3083.41"
          y="654.42"
          width="175.12"
          height="257.67"
        />
        <circle
          style={{ fill: "none", stroke: "#231f20", strokeWidth: "5px", strokeMiterlimit: 10 }}
          cx="3385.56"
          cy="866.94"
          r="46.27"
        />
        <path
          style={{ fill: "#fff" }}
          d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13Z"
        />
        <rect
          style={{ fill: "none", stroke: "#fff", strokeWidth: "80px", strokeMiterlimit: 10 }}
          x="40"
          y="40"
          width="843.91"
          height="852.3"
          rx="36.55"
          ry="36.55"
        />
        <polygon
          style={{ fill: "#B8D935", stroke: "#1b4d3e", strokeMiterlimit: 10 }}
          points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"
        />
        <path
          style={{ fill: "#74914a" }}
          d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14Z"
        />
        <path
          style={{ fill: "#B8D935", stroke: "#1b4d3e", strokeMiterlimit: 10 }}
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
    { id: "reports", label: "Reports", icon: (c) => <FileText size={16} color={c} /> },
    { id: "resources", label: "Resources", icon: (c) => <BookOpen size={16} color={c} /> },
    { id: "settings", label: "Settings", icon: (c) => <Settings size={16} color={c} /> },
  ];
  const [activePage, setActivePage] = useState("dashboard");
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
        {sorted.map((s) => {
          const act = activeSector && s.id === activeSector.id;
          const SI = s.icon;
          return (
            <div
              key={s.id}
              onClick={() => setActiveSector(s)}
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
                  <SI size={14} color={act ? C.accent : "rgba(255,255,255,0.35)"} />
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <SI size={12} color={act ? C.accent : "rgba(255,255,255,0.3)"} />
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

function ventureIcon(name) {
  const n = name.toLowerCase();
  if (
    n.includes("cold") ||
    n.includes("storage") ||
    n.includes("solar") ||
    n.includes("energy") ||
    n.includes("clean cook") ||
    n.includes("battery") ||
    n.includes("mini-grid") ||
    n.includes("biogas") ||
    n.includes("ev charging")
  )
    return BatteryCharging;
  if (
    n.includes("platform") ||
    n.includes("digital") ||
    n.includes("tech") ||
    n.includes("data") ||
    n.includes("ai") ||
    n.includes("fintech") ||
    n.includes("edtech") ||
    n.includes("healthtech") ||
    n.includes("kejetia")
  )
    return Cpu;
  if (
    n.includes("training") ||
    n.includes("academy") ||
    n.includes("skill") ||
    n.includes("tvet") ||
    n.includes("fellowship") ||
    n.includes("scholar") ||
    n.includes("mentor") ||
    n.includes("apprentice") ||
    n.includes("teacher")
  )
    return GraduationCap;
  if (
    n.includes("health") ||
    n.includes("medical") ||
    n.includes("clinic") ||
    n.includes("nhis") ||
    n.includes("diagnostic") ||
    n.includes("telemedicine") ||
    n.includes("community health") ||
    n.includes("pharma")
  )
    return Cross;
  if (
    n.includes("farm") ||
    n.includes("agri") ||
    n.includes("cocoa") ||
    n.includes("fruit") ||
    n.includes("tomato") ||
    n.includes("crop") ||
    n.includes("cashew") ||
    n.includes("shea") ||
    n.includes("cooperative") ||
    n.includes("aggregation") ||
    n.includes("warehouse receipt")
  )
    return Sprout;
  if (
    n.includes("financ") ||
    n.includes("credit") ||
    n.includes("loan") ||
    n.includes("capital fund") ||
    n.includes("susu") ||
    n.includes("insurance") ||
    n.includes("working capital") ||
    n.includes("microfinance") ||
    n.includes("remittance") ||
    n.includes("investment gateway")
  )
    return Wallet;
  if (
    n.includes("housing") ||
    n.includes("real estate") ||
    n.includes("construction") ||
    n.includes("building") ||
    n.includes("rental") ||
    n.includes("affordable")
  )
    return Home;
  if (
    n.includes("transport") ||
    n.includes("logistics") ||
    n.includes("fleet") ||
    n.includes("delivery") ||
    n.includes("cold chain") ||
    n.includes("freight") ||
    n.includes("rail") ||
    n.includes("port") ||
    n.includes("warehousing")
  )
    return Truck;
  if (
    n.includes("manufactur") ||
    n.includes("packag") ||
    n.includes("process") ||
    n.includes("factory") ||
    n.includes("industrial") ||
    n.includes("textile") ||
    n.includes("garment") ||
    n.includes("consumer goods")
  )
    return Factory;
  if (
    n.includes("tourism") ||
    n.includes("hospitality") ||
    n.includes("heritage") ||
    n.includes("eco-tour") ||
    n.includes("destination")
  )
    return Luggage;
  if (
    n.includes("content") ||
    n.includes("studio") ||
    n.includes("creative") ||
    n.includes("talent") ||
    n.includes("sport") ||
    n.includes("ip monetis") ||
    n.includes("hub network")
  )
    return Camera;
  if (
    n.includes("infrastructure") ||
    n.includes("water") ||
    n.includes("sanitation") ||
    n.includes("connectivity") ||
    n.includes("road") ||
    n.includes("smart city") ||
    n.includes("waste") ||
    n.includes("telecoms")
  )
    return Blocks;
  return Activity;
}
const T = ({ bg, col, children }) => (
  <span
    style={{
      fontSize: 9,
      fontWeight: 700,
      padding: "2px 7px",
      borderRadius: 4,
      background: bg,
      color: col,
      fontFamily: "Inter,sans-serif",
      letterSpacing: ".5px",
    }}
  >
    {children}
  </span>
);
const TierB = ({ t }) => (
  <T
    bg={t === 1 ? "#EBF5B0" : t === 2 ? "rgba(46,90,77,0.12)" : "rgba(107,114,128,0.12)"}
    col={t === 1 ? "#1B4D3E" : t === 2 ? "#2E5A4D" : "#6B7280"}
  >
    TIER {t === 1 ? "I" : t === 2 ? "II" : "III"}
  </T>
);
function Card({ children, style: ex = {} }) {
  const [h, sH] = useState(false);
  return (
    <div
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        boxShadow: h ? "0 4px 16px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.06)",
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
function Gauge({ score }) {
  const W = 160,
    H = 90,
    cx = W / 2,
    cy = H,
    r = 70;
  const ci = 2 * Math.PI * r,
    half = ci / 2,
    fill = half * (score / 100);
  const col = score >= 88 ? "#16A34A" : score >= 80 ? "#CA8A04" : "#DC2626";
  return (
    <div style={{ textAlign: "center", margin: "4px auto 0", width: W }}>
      <svg width={W} height={H + 10} style={{ overflow: "visible" }}>
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={11}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={col}
          strokeWidth={11}
          strokeLinecap="round"
          strokeDasharray={`${fill} ${half}`}
          style={{ transition: "stroke-dasharray .8s ease" }}
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontSize={28}
          fontWeight={700}
          fill="#111827"
          fontFamily="Inter,sans-serif"
        >
          {score}
        </text>
      </svg>
    </div>
  );
}
const Tip = ({ active, payload, label }: { active?: any; payload?: any; label?: any }) => {
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
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, background: p.fill }} />
          <span>
            {p.name}: <strong>{p.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};
function SectorHeader({ s }) {
  const Icon = s.icon;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: "rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={17} color="#B8D935" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {s.short}
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.42)", fontFamily: "Inter,sans-serif" }}>{s.tag}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#B8D935", lineHeight: 1 }}>{s.score}</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "Inter,sans-serif" }}>Score</div>
      </div>
    </div>
  );
}
/* ─────────── MOBILE GAUGE ─────────── */
function MiniGauge({ score }) {
  const W = 96,
    H = 52,
    cx = W / 2,
    cy = H,
    r = 42;
  const ci = 2 * Math.PI * r,
    half = ci / 2,
    fill = half * (score / 100);
  const col = score >= 88 ? "#4ADE80" : score >= 80 ? "#FCD34D" : "#F87171";
  return (
    <svg width={W} height={H + 6} style={{ overflow: "visible" }}>
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke={col}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${fill} ${half}`}
        style={{ transition: "stroke-dasharray .8s ease" }}
      />
      <text
        x={cx}
        y={cy - 2}
        textAnchor="middle"
        fontSize={18}
        fontWeight={700}
        fill="#fff"
        fontFamily="Inter,sans-serif"
      >
        {score}
      </text>
    </svg>
  );
}
/* ─────────── COLLAPSIBLE SECTION ─────────── */
function MSection({ title, subtitle, icon: Icon, accent = false, defaultOpen = false, children, badge }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          background: accent ? "#1E3327" : "#fff",
          borderRadius: open ? "12px 12px 0 0" : "12px",
          border: `1px solid ${accent ? "rgba(184,217,53,0.12)" : "#E5E7EB"}`,
          borderBottom: open ? `1px solid ${accent ? "rgba(184,217,53,0.06)" : "#F3F4F6"}` : undefined,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {Icon && (
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: accent ? "rgba(184,217,53,0.12)" : "rgba(27,77,62,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={13} color={accent ? "#B8D935" : "#2E5A4D"} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: accent ? "#fff" : "#111827", lineHeight: 1.1 }}>
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 10,
                color: accent ? "rgba(255,255,255,0.45)" : "#6B7280",
                fontFamily: "Inter,sans-serif",
                marginTop: 1,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
        {badge && (
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: 4,
              background: "#EBF5B0",
              color: "#1B4D3E",
              fontFamily: "Inter,sans-serif",
              flexShrink: 0,
            }}
          >
            {badge}
          </div>
        )}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: accent ? "rgba(255,255,255,0.07)" : "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "transform .2s",
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          <ChevronDown size={11} color={accent ? "rgba(255,255,255,0.5)" : "#6B7280"} />
        </div>
      </div>
      {open && (
        <div
          style={{
            background: accent ? "#172B1F" : "#fff",
            border: `1px solid ${accent ? "rgba(184,217,53,0.08)" : "#E5E7EB"}`,
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
/* ─────────── MOBILE DASHBOARD ─────────── */
/* Color palette from control panel screenshots */
const M = {
  bg: "#080E09",
  card: "#0F1A11",
  cardBorder: "rgba(255,255,255,0.07)",
  accent: "#B8D935",
  accentDim: "rgba(184,217,53,0.15)",
  accentBorder: "rgba(184,217,53,0.2)",
  green: "#4ADE80",
  orange: "#F59E0B",
  red: "#F87171",
  white: "#FFFFFF",
  muted: "rgba(255,255,255,0.38)",
  dim: "rgba(255,255,255,0.18)",
  divider: "rgba(255,255,255,0.06)",
  teal: "#2E5A4D",
  tealBright: "#3D7A66",
};
const COMPANIES = {
  agriculture: [
    { r: 1, name: "Cocobod Ghana", tk: "#COC", chg: "+4.2%", val: "$2.1B", sc: 88 },
    { r: 2, name: "Yedent Agro", tk: "#YED", chg: "+2.8%", val: "$340M", sc: 81 },
    { r: 3, name: "MOFA GH", tk: "#MFA", chg: "+1.1%", val: "$180M", sc: 76 },
    { r: 4, name: "Pineapple Industries", tk: "#PIN", chg: "-0.6%", val: "$95M", sc: 68 },
    { r: 5, name: "Akate Farms", tk: "#AKF", chg: "+3.3%", val: "$72M", sc: 64 },
  ],
  financial: [
    { r: 1, name: "Fidelity Bank Ghana", tk: "#FBG", chg: "+6.1%", val: "$1.4B", sc: 91 },
    { r: 2, name: "MTN MoMo", tk: "#MTN", chg: "+3.5%", val: "$3.2B", sc: 88 },
    { r: 3, name: "Zeepay", tk: "#ZPY", chg: "+2.2%", val: "$280M", sc: 83 },
    { r: 4, name: "Stanbic IBTC", tk: "#SIB", chg: "+0.9%", val: "$620M", sc: 76 },
    { r: 5, name: "CalBank Ghana", tk: "#CAL", chg: "-0.4%", val: "$310M", sc: 71 },
  ],
  technology: [
    { r: 1, name: "Hubtel Ghana", tk: "#HBT", chg: "+8.4%", val: "$420M", sc: 91 },
    { r: 2, name: "Rancard Solutions", tk: "#RNC", chg: "+5.1%", val: "$95M", sc: 84 },
    { r: 3, name: "mPharma", tk: "#MPH", chg: "+3.7%", val: "$240M", sc: 79 },
    { r: 4, name: "ExpressPay GH", tk: "#EXP", chg: "+2.0%", val: "$68M", sc: 74 },
    { r: 5, name: "Leti Arts", tk: "#LTA", chg: "-1.2%", val: "$22M", sc: 65 },
  ],
  energy: [
    { r: 1, name: "BXC Energia", tk: "#BXC", chg: "+5.8%", val: "$890M", sc: 90 },
    { r: 2, name: "Amandi Energy", tk: "#AMD", chg: "+3.2%", val: "$560M", sc: 85 },
    { r: 3, name: "Volta River Auth.", tk: "#VRA", chg: "+1.4%", val: "$1.1B", sc: 80 },
    { r: 4, name: "BOST Ghana", tk: "#BST", chg: "-0.8%", val: "$310M", sc: 71 },
    { r: 5, name: "SolarKal GH", tk: "#SKL", chg: "+4.1%", val: "$48M", sc: 68 },
  ],
  infrastructure: [
    { r: 1, name: "Ghana Highway Auth.", tk: "#GHA", chg: "+2.9%", val: "$420M", sc: 85 },
    { r: 2, name: "GWCL", tk: "#GWC", chg: "+1.8%", val: "$280M", sc: 80 },
    { r: 3, name: "Quaye Group", tk: "#QGP", chg: "+3.3%", val: "$190M", sc: 75 },
    { r: 4, name: "Constec GH", tk: "#CST", chg: "-0.5%", val: "$140M", sc: 68 },
    { r: 5, name: "Aluworks", tk: "#ALW", chg: "+0.7%", val: "$88M", sc: 62 },
  ],
  education: [
    { r: 1, name: "KNUST Holdings", tk: "#KNU", chg: "+3.1%", val: "$380M", sc: 86 },
    { r: 2, name: "Accra Academy", tk: "#AAC", chg: "+2.4%", val: "$95M", sc: 78 },
    { r: 3, name: "Edubridge GH", tk: "#EDB", chg: "+5.2%", val: "$48M", sc: 73 },
    { r: 4, name: "Ghana Book Trust", tk: "#GBT", chg: "+1.0%", val: "$32M", sc: 66 },
    { r: 5, name: "AfriLearn", tk: "#AFL", chg: "-0.3%", val: "$18M", sc: 61 },
  ],
  health: [
    { r: 1, name: "Rabito Clinic", tk: "#RAB", chg: "+4.3%", val: "$280M", sc: 87 },
    { r: 2, name: "mPharma Health", tk: "#MPH", chg: "+3.1%", val: "$340M", sc: 82 },
    { r: 3, name: "Lister Hospital", tk: "#LST", chg: "+1.6%", val: "$195M", sc: 76 },
    { r: 4, name: "Medlab GH", tk: "#MED", chg: "-0.9%", val: "$88M", sc: 70 },
    { r: 5, name: "KCCR", tk: "#KCC", chg: "+2.0%", val: "$62M", sc: 65 },
  ],
  housing: [
    { r: 1, name: "Regimanuel Gray", tk: "#RGY", chg: "+4.8%", val: "$520M", sc: 84 },
    { r: 2, name: "Devtraco Plus", tk: "#DVT", chg: "+3.2%", val: "$310M", sc: 79 },
    { r: 3, name: "Berock Ventures", tk: "#BRK", chg: "+2.1%", val: "$240M", sc: 74 },
    { r: 4, name: "SSNIT Housing", tk: "#SSH", chg: "+0.6%", val: "$480M", sc: 68 },
    { r: 5, name: "GoldKey Props", tk: "#GKP", chg: "-0.2%", val: "$95M", sc: 62 },
  ],
  manufacturing: [
    { r: 1, name: "Unilever Ghana", tk: "#UNL", chg: "+3.9%", val: "$780M", sc: 83 },
    { r: 2, name: "Fan Milk Ghana", tk: "#FML", chg: "+2.6%", val: "$420M", sc: 78 },
    { r: 3, name: "Benso Oil", tk: "#BNO", chg: "+1.8%", val: "$190M", sc: 73 },
    { r: 4, name: "Pioneer Food Cannon", tk: "#PFC", chg: "-1.1%", val: "$140M", sc: 65 },
    { r: 5, name: "Aluworks", tk: "#ALW", chg: "+0.5%", val: "$88M", sc: 60 },
  ],
  transportation: [
    { r: 1, name: "Antrak Ghana", tk: "#ANT", chg: "+5.2%", val: "$380M", sc: 80 },
    { r: 2, name: "Ghana Ports Auth.", tk: "#GPA", chg: "+2.8%", val: "$1.2B", sc: 76 },
    { r: 3, name: "Starlite Trans.", tk: "#STL", chg: "+1.4%", val: "$95M", sc: 71 },
    { r: 4, name: "DHL Ghana", tk: "#DHL", chg: "+0.9%", val: "$280M", sc: 66 },
    { r: 5, name: "Quaynor Express", tk: "#QEX", chg: "-0.6%", val: "$48M", sc: 58 },
  ],
  tourism: [
    { r: 1, name: "La Palm Royal", tk: "#LPR", chg: "+4.1%", val: "$310M", sc: 78 },
    { r: 2, name: "Accra City Hotel", tk: "#ACH", chg: "+2.9%", val: "$195M", sc: 73 },
    { r: 3, name: "Kempinski GH", tk: "#KMP", chg: "+3.8%", val: "$480M", sc: 70 },
    { r: 4, name: "Heritage GH", tk: "#HGH", chg: "+1.2%", val: "$88M", sc: 64 },
    { r: 5, name: "Labadi Beach Hotel", tk: "#LBH", chg: "-0.7%", val: "$140M", sc: 60 },
  ],
  creative: [
    { r: 1, name: "TV3 Ghana", tk: "#TV3", chg: "+5.6%", val: "$180M", sc: 79 },
    { r: 2, name: "EIB Network", tk: "#EIB", chg: "+3.4%", val: "$95M", sc: 74 },
    { r: 3, name: "Ameyaw Konsult", tk: "#AMK", chg: "+2.1%", val: "$28M", sc: 69 },
    { r: 4, name: "Black Star Studios", tk: "#BSS", chg: "+4.8%", val: "$42M", sc: 65 },
    { r: 5, name: "GhanaWeb Media", tk: "#GWM", chg: "-0.3%", val: "$38M", sc: 60 },
  ],
};
function sigC(x) {
  return x === "Bullish" ? M.green : x === "Bearish" ? M.red : M.orange;
}
/* ─── Section Card wrapper ─── */
function MCard({ icon: Icon, title, badge = undefined, badgeLime = false, defaultOpen = true, children }: { icon?: any; title?: any; badge?: any; badgeLime?: boolean; defaultOpen?: boolean; children?: any }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        marginBottom: 8,
        background: M.card,
        borderRadius: 16,
        border: `1px solid ${M.cardBorder}`,
        overflow: "hidden",
      }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "13px 14px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {Icon && (
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: M.accentDim,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={13} color={M.accent} />
          </div>
        )}
        <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: M.white, letterSpacing: "-.2px" }}>{title}</span>
        {badge && (
          <div
            style={{
              padding: "3px 10px",
              borderRadius: 20,
              background: badgeLime ? M.accent : M.accentDim,
              border: `1px solid ${badgeLime ? "transparent" : M.accentBorder}`,
              fontSize: 11,
              fontWeight: 700,
              color: badgeLime ? M.bg : M.accent,
              fontFamily: "Inter,sans-serif",
              flexShrink: 0,
            }}
          >
            {badge}
          </div>
        )}
        <ChevronDown
          size={14}
          color={M.muted}
          style={{
            transition: "transform .2s",
            transform: open ? "rotate(180deg)" : "none",
            flexShrink: 0,
            marginLeft: badge ? 6 : 0,
          }}
        />
      </div>
      <div style={{ height: "1px", background: M.divider, margin: "0 14px" }} />
      {open && <div>{children}</div>}
    </div>
  );
}
/* ─── Score ring ─── */
function ScoreRing({ score, size = 64, stroke = 5 }) {
  const r = size / 2 - stroke,
    c = 2 * Math.PI * r,
    fill = c * (score / 100);
  const col = score >= 88 ? M.green : score >= 80 ? M.orange : M.red;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={col}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${fill} ${c}`}
          style={{ transition: "stroke-dasharray .8s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size * 0.26, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
          {score}
        </span>
      </div>
    </div>
  );
}
/* ─── Heatmap ─── */
function Heatmap() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const hours = ["00", "04", "08", "12", "16", "20"];
  const data = days.map(() => hours.map(() => Math.floor(Math.random() * 5)));
  const shades = [
    "rgba(255,255,255,0.04)",
    "rgba(46,90,77,0.3)",
    "rgba(46,90,77,0.5)",
    "rgba(46,90,77,0.75)",
    "rgba(184,217,53,0.5)",
  ];
  return (
    <div style={{ padding: "12px 14px 14px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "24px repeat(6,1fr)", gap: 3 }}>
        <div />
        {hours.map((h) => (
          <div
            key={h}
            style={{
              fontSize: 9,
              color: M.muted,
              textAlign: "center",
              fontFamily: "Inter,sans-serif",
              marginBottom: 4,
            }}
          >
            {h}
          </div>
        ))}
        {days.map((d, di) => [
          <div
            key={d}
            style={{
              fontSize: 9,
              color: M.muted,
              display: "flex",
              alignItems: "center",
              fontFamily: "Inter,sans-serif",
            }}
          >
            {d}
          </div>,
          ...data[di].map((v, ci) => <div key={ci} style={{ height: 18, borderRadius: 3, background: shades[v] }} />),
        ])}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10 }}>
        <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Low</span>
        {shades.map((sh, i) => (
          <div key={i} style={{ width: 16, height: 10, borderRadius: 2, background: sh }} />
        ))}
        <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Peak</span>
      </div>
    </div>
  );
}
/* ─── Sub-tab pills ─── */
function SubTabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "10px 14px 0", scrollbarWidth: "none" }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: "6px 14px",
            borderRadius: 20,
            border: `1px solid ${active === t.id ? M.accent : M.cardBorder}`,
            background: active === t.id ? M.accent : "transparent",
            color: active === t.id ? M.bg : M.muted,
            fontSize: 12,
            fontWeight: active === t.id ? 700 : 500,
            fontFamily: "Inter,sans-serif",
            whiteSpace: "nowrap",
            cursor: "pointer",
            flexShrink: 0,
            transition: "all .15s",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
/* ─── MAIN MOBILE DASHBOARD ─── */
function MobileDashboard({ s, setS }) {
  const [dashSub, setDashSub] = useState("overview");
  const [notif, setNotif] = useState(false);
  const [sectorDrawer, setSectorDrawer] = useState(false);
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  const Icon = s.icon;
  const companies = COMPANIES[s.id] || COMPANIES.financial;
  const DASH_SUBS = [
    { id: "overview", label: "Overview" },
    { id: "ventures", label: "Ventures" },
    { id: "signals", label: "Signals" },
    { id: "companies", label: "Companies" },
    { id: "analytics", label: "Analytics" },
  ];
  const ANALYTICS_SUBS = [
    { id: "kpis", label: "KPIs" },
    { id: "performance", label: "Performance" },
    { id: "activity", label: "Activity" },
    { id: "companies", label: "Companies" },
    { id: "map", label: "Map" },
  ];
  /* ── Bar chart data for engagement ── */
  const barData = Array.from({ length: 24 }, (_, i) => Math.floor(20 + Math.random() * 80));
  const maxBar = Math.max(...barData);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: M.bg,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`
      @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
      .mscroll::-webkit-scrollbar{display:none}
      .mscroll{-ms-overflow-style:none;scrollbar-width:none}
    `}</style>

      {/* ═══ SECTOR HEADER CARD ═══ */}
      <div style={{ padding: "8px 16px 0" }}>
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
          Dashboard
        </div>
        <div
          style={{
            background: M.card,
            borderRadius: 16,
            border: `1px solid ${M.accentBorder}`,
            padding: "13px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <ScoreRing score={s.score} size={62} stroke={5} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: M.accent,
                letterSpacing: "1.3px",
                textTransform: "uppercase",
                fontFamily: "Inter,sans-serif",
                marginBottom: 2,
              }}
            >
              Analytics · {s.tag}
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: M.white,
                lineHeight: 1.2,
                letterSpacing: "-.2px",
                marginBottom: 7,
              }}
            >
              {s.full}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { l: "Cap", v: `$${s.capLow}–${s.capHigh}M` },
                { l: "IRR", v: `${s.irrHigh}%` },
                { l: "Score", v: `${s.score}` },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${M.divider}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{m.l}</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: i === 1 ? M.accent : M.white,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {m.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SCROLLABLE CONTENT ═══ */}
      <div className="mscroll" style={{ flex: 1, overflowY: "auto", padding: "10px 12px 0" }}>
        {/* ─ DASHBOARD / OVERVIEW ─ */}
        {dashSub === "overview" && (
          <>
            {/* KPI 2x2 grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
              {[
                {
                  icon: TrendingUp,
                  label: "Market Cap",
                  val: `$${(s.capHigh * 0.75).toFixed(1)}B`,
                  sub: "Sector aggregate",
                  chg: "+5.1%",
                },
                { icon: ArrowUpRight, label: "IRR Ceiling", val: `${s.irrHigh}%`, sub: "Target return", chg: "+2.4%" },
                {
                  icon: LayoutDashboard,
                  label: "Sub-sector Rev",
                  val: `$${(s.capLow * 0.7).toFixed(1)}B`,
                  sub: "Lead segment",
                  chg: "+3.8%",
                },
                { icon: Clock, label: "BRIDGE Score", val: `${s.score}`, sub: "/ 100 composite", chg: "+1.2%" },
              ].map((k, i) => {
                const KIcon = k.icon;
                return (
                  <div
                    key={i}
                    style={{
                      background: M.card,
                      borderRadius: 14,
                      border: `1px solid ${M.cardBorder}`,
                      padding: "12px 13px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 11,
                        fontSize: 10,
                        fontWeight: 700,
                        color: M.green,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {k.chg}
                    </div>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 7,
                        background: M.accentDim,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 10,
                      }}
                    >
                      <KIcon size={13} color={M.accent} />
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: M.white,
                        letterSpacing: "-.5px",
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {k.val}
                    </div>
                    <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.2 }}>
                      {k.label}
                    </div>
                    <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                      {k.sub}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sub-sector breakdown */}
            <MCard
              icon={LayoutGrid}
              title="Sub-sector Breakdown"
              badge={`${s.subSectors.length} segments`}
              defaultOpen={true}
            >
              <div style={{ padding: "12px 14px" }}>
                <div style={{ height: 6, borderRadius: 4, overflow: "hidden", display: "flex", marginBottom: 13 }}>
                  {s.subSectors.map((ss, i) => (
                    <div key={i} style={{ flex: ss.pct, background: ss.color }} />
                  ))}
                </div>
                {s.subSectors.map((ss, i) => (
                  <div key={i} style={{ marginBottom: 11 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 7, height: 7, borderRadius: 2, background: ss.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: M.white }}>{ss.name}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {ss.pct}%
                      </span>
                    </div>
                    <div
                      style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}
                    >
                      <div style={{ width: `${ss.pct}%`, height: "100%", background: M.tealBright, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Impact Score */}
            <MCard icon={Target} title="BRIDGE Impact Score" badge={`${s.score}`} badgeLime={true} defaultOpen={true}>
              <div style={{ padding: "12px 14px" }}>
                {[
                  ["Peace & Prosperity", Math.min(s.score + 4, 96)],
                  ["Strategic Fit", Math.max(s.score - 2, 0)],
                  ["Feasibility", Math.min(s.score + 2, 98)],
                  ["Scalability", Math.max(s.score - 1, 0)],
                ].map(([l, v]) => (
                  <div key={l} style={{ marginBottom: 11 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "Inter,sans-serif" }}>
                        {l}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {v}
                      </span>
                    </div>
                    <div
                      style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}
                    >
                      <div
                        style={{
                          width: `${v}%`,
                          height: "100%",
                          background: `linear-gradient(90deg,${M.tealBright},${M.accent})`,
                          borderRadius: 2,
                          transition: "width .8s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Capital Pipeline */}
            <MCard icon={BarChart3} title="Capital Pipeline" badge={`${s.pipeline.length} active`} defaultOpen={false}>
              <div style={{ padding: "12px 14px" }}>
                {s.pipeline.map((p, i) => (
                  <div key={i} style={{ marginBottom: 13 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: M.white }}>{p.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {p.pct}%
                      </span>
                    </div>
                    <div
                      style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}
                    >
                      <div
                        style={{
                          width: `${p.pct}%`,
                          height: "100%",
                          background: `linear-gradient(90deg,${M.teal},${M.accent})`,
                          borderRadius: 2,
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                      <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                        {p.current} of {p.target}
                      </span>
                      <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>~{p.months}mo</span>
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Activity Heatmap */}
            <MCard icon={LayoutGrid} title="Activity Heatmap" badge="7 Days" defaultOpen={false}>
              <Heatmap />
            </MCard>

            {/* 30-Day Engagement */}
            <MCard icon={Activity} title="30-Day Engagement" badge="Live" badgeLime={true} defaultOpen={false}>
              <div style={{ padding: "12px 14px 0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7, marginBottom: 14 }}>
                  {[
                    { v: "1,692", l: "Active Signals", chg: "+56%" },
                    { v: "1,423", l: "Conversion", chg: "+43%" },
                    { v: "11,992", l: "Avg Duration", chg: "+28%" },
                  ].map((m, i) => (
                    <div
                      key={i}
                      style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 10px" }}
                    >
                      <div style={{ fontSize: 16, fontWeight: 700, color: M.white, lineHeight: 1, marginBottom: 4 }}>
                        {m.v}
                      </div>
                      <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 5 }}>
                        {m.l}
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: M.green, fontFamily: "Inter,sans-serif" }}>
                        {m.chg}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bar chart */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 60, marginBottom: 8 }}>
                  {barData.map((v, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        background: i % 6 === 0 ? M.tealBright : `rgba(46,90,77,${0.25 + (v / maxBar) * 0.55})`,
                        borderRadius: "2px 2px 0 0",
                        height: `${(v / maxBar) * 100}%`,
                        minHeight: 3,
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12 }}>
                  {["Feb 5", "Feb 15", "Feb 25", "Mar 1"].map((d) => (
                    <span key={d} style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </MCard>

            {/* Cross-Sector Links */}
            <MCard icon={Globe} title="Cross-Sector Links" defaultOpen={false}>
              <div style={{ padding: "12px 14px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.cross.map((cid, i) => {
                  const found = SECTORS.find((sec) => sec.id === cid);
                  if (!found) return null;
                  const FIcon = found.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => setS(found)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "7px 13px",
                        borderRadius: 20,
                        border: `1px solid ${M.cardBorder}`,
                        background: "rgba(255,255,255,0.04)",
                        cursor: "pointer",
                      }}
                    >
                      <FIcon size={12} color={M.accent} />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.7)",
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {found.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </MCard>
            <div style={{ height: 16 }} />
          </>
        )}

        {/* ─ DASHBOARD / VENTURES ─ */}
        {dashSub === "ventures" && (
          <>
            {/* Tier distribution */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 8 }}>
              {[
                [s.t1?.length, "I", M.accent, M.accentDim, "Priority"],
                [s.t2?.length, "II", "rgba(61,122,102,1)", "rgba(61,122,102,0.15)", "Mid-term"],
                [s.t3?.length, "III", M.muted, "rgba(255,255,255,0.06)", "Long-term"],
              ].map(([n, lbl, col, bg, sub]) => (
                <div
                  key={lbl}
                  style={{
                    background: bg,
                    borderRadius: 12,
                    border: `1px solid ${M.cardBorder}`,
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{ fontSize: 24, fontWeight: 700, color: col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
                  >
                    {n}
                  </div>
                  <div
                    style={{ fontSize: 10, fontWeight: 700, color: col, fontFamily: "Inter,sans-serif", marginTop: 3 }}
                  >
                    Tier {lbl}
                  </div>
                  <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>
            <MCard
              icon={Star}
              title="Tier I Ventures"
              badge={`${s.t1?.length} priority`}
              badgeLime={true}
              defaultOpen={true}
            >
              <div style={{ padding: "4px 0 4px" }}>
                {(s.t1 || []).map((v, i) => {
                  const VIcon = ventureIcon(v.name);
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "10px 14px",
                        borderBottom: i < (s.t1 || []).length - 1 ? `1px solid ${M.divider}` : "none",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <VIcon size={14} color={M.accent} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: M.white,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {v.name}
                        </div>
                        <div style={{ display: "flex", gap: 5, marginTop: 3, alignItems: "center" }}>
                          <span
                            style={{ fontSize: 10, color: M.accent, fontFamily: "Inter,sans-serif", fontWeight: 700 }}
                          >
                            {v.irr}
                          </span>
                          <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>·</span>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: v.risk === "LOW" ? M.green : v.risk === "HIGH" ? M.red : M.orange,
                              fontFamily: "Inter,sans-serif",
                            }}
                          >
                            {v.risk}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
                          {v.cap}
                        </div>
                        <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                          Capital
                        </div>
                      </div>
                      <ChevronRight size={12} color={M.dim} />
                    </div>
                  );
                })}
              </div>
            </MCard>
            <MCard icon={Activity} title="Tier II Ventures" badge={`${s.t2?.length} mid-term`} defaultOpen={false}>
              <div style={{ padding: "4px 0 4px" }}>
                {(s.t2 || []).map((v, i) => {
                  const VIcon = ventureIcon(v.name);
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "10px 14px",
                        borderBottom: i < (s.t2 || []).length - 1 ? `1px solid ${M.divider}` : "none",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "rgba(61,122,102,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <VIcon size={14} color={M.tealBright} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: M.white,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {v.name}
                        </div>
                        <div style={{ display: "flex", gap: 5, marginTop: 3 }}>
                          <span
                            style={{
                              fontSize: 10,
                              color: M.tealBright,
                              fontFamily: "Inter,sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            {v.irr}
                          </span>
                          <span style={{ fontSize: 9, color: M.dim }}>·</span>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: v.risk === "LOW" ? M.green : v.risk === "HIGH" ? M.red : M.orange,
                            }}
                          >
                            {v.risk}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.7)",
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {v.cap}
                        </div>
                      </div>
                      <ChevronRight size={12} color={M.dim} />
                    </div>
                  );
                })}
              </div>
            </MCard>
            <MCard icon={FolderOpen} title="Tier III Ventures" badge={`${s.t3?.length} long-term`} defaultOpen={false}>
              <div style={{ padding: "4px 0 4px" }}>
                {(s.t3 || []).map((v, i) => {
                  const VIcon = ventureIcon(v.name);
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "10px 14px",
                        borderBottom: i < (s.t3 || []).length - 1 ? `1px solid ${M.divider}` : "none",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.04)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <VIcon size={14} color={M.muted} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.65)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {v.name}
                        </div>
                        <div style={{ display: "flex", gap: 5, marginTop: 3 }}>
                          <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>{v.irr}</span>
                          <span style={{ fontSize: 9, color: M.dim }}>·</span>
                          <span style={{ fontSize: 9, fontWeight: 700, color: v.risk === "HIGH" ? M.red : M.orange }}>
                            {v.risk}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 11, color: M.muted, fontFamily: "Inter,sans-serif" }}>{v.cap}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </MCard>
            <div style={{ height: 16 }} />
          </>
        )}

        {/* ─ DASHBOARD / SIGNALS ─ */}
        {dashSub === "signals" && (
          <>
            {/* Signal source breakdown */}
            <MCard icon={BarChart2} title="Signal Source Breakdown" badge="+180%" defaultOpen={true}>
              <div style={{ padding: "12px 14px" }}>
                {/* Stacked bar */}
                <div style={{ height: 32, borderRadius: 8, overflow: "hidden", display: "flex", marginBottom: 14 }}>
                  <div
                    style={{
                      flex: 25,
                      background: M.tealBright,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, color: M.white }}>25%</span>
                  </div>
                  <div
                    style={{
                      flex: 25,
                      background: "rgba(61,122,102,0.55)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, color: M.white }}>25%</span>
                  </div>
                  <div
                    style={{
                      flex: 50,
                      background: "rgba(46,90,77,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, color: M.white }}>50%</span>
                  </div>
                </div>
                {[
                  { l: "Earnings & Policy", pct: 25, col: M.tealBright },
                  { l: "News & Media", pct: 25, col: "rgba(61,122,102,0.85)" },
                  { l: "Analyst Ratings", pct: 50, col: "rgba(46,90,77,0.7)" },
                ].map((src, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: src.col, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: M.white }}>{src.l}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {src.pct}%
                      </span>
                    </div>
                    <div
                      style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}
                    >
                      <div style={{ width: `${src.pct}%`, height: "100%", background: src.col, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Market signals (activity) */}
            <MCard icon={TrendingUp} title="Market Signals" badge={`${s.activity.length}`} defaultOpen={true}>
              <div style={{ padding: "4px 0 4px" }}>
                {s.activity.map((a, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 11,
                      padding: "11px 14px",
                      borderBottom: i < s.activity.length - 1 ? `1px solid ${M.divider}` : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: sigC(a.sig),
                        marginTop: 5,
                        flexShrink: 0,
                        boxShadow: `0 0 7px ${sigC(a.sig)}`,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: M.white, lineHeight: 1.3, marginBottom: 5 }}>
                        {a.h}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: 5,
                            background:
                              a.sig === "Bullish"
                                ? "rgba(74,222,128,0.12)"
                                : a.sig === "Bearish"
                                  ? "rgba(248,113,113,0.12)"
                                  : "rgba(251,191,36,0.12)",
                            color: sigC(a.sig),
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {a.sig}
                        </span>
                        <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 11,
                            fontWeight: 700,
                            color: sigC(a.sig),
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {a.amt}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Sector Performance Index */}
            <MCard icon={Activity} title="Sector Performance Index" badge="8-Month" defaultOpen={false}>
              <div style={{ padding: "12px 14px 6px" }}>
                <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: M.tealBright }} />
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Actual</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(184,217,53,0.35)" }} />
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>AI Projection</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 70 }}>
                  {["A", "S", "O", "N", "D", "J", "F", "M"].map((mo, i) => {
                    const h = 25 + i * 8 + Math.random() * 15;
                    const isProj = i >= 5;
                    return (
                      <div
                        key={mo}
                        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
                      >
                        <div
                          style={{
                            width: "100%",
                            background: isProj ? "rgba(184,217,53,0.25)" : M.tealBright,
                            borderRadius: "3px 3px 0 0",
                            height: `${h}px`,
                            border: isProj ? `1px dashed rgba(184,217,53,0.4)` : "none",
                          }}
                        />
                        <span style={{ fontSize: 8, color: M.dim, fontFamily: "Inter,sans-serif" }}>{mo}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </MCard>

            {/* Volatility breakdown */}
            <MCard icon={SlidersHorizontal} title="Volatility vs Growth Rate" badge="Sub-sectors" defaultOpen={false}>
              <div style={{ padding: "6px 0 6px" }}>
                <div style={{ padding: "0 14px 8px", fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                  Risk-return profile · bubble size = market share
                </div>
                {s.subSectors.map((ss, i) => {
                  const growth = Math.floor(25 + Math.random() * 55);
                  const risk = Math.floor(10 + Math.random() * 70);
                  const abbr = ss.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  const rCol = risk > 60 ? M.red : risk > 35 ? M.orange : M.green;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "10px 14px",
                        borderBottom: i < s.subSectors.length - 1 ? `1px solid ${M.divider}` : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: "rgba(46,90,77,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: 10, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
                          {abbr}
                        </span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: M.white }}>{ss.name}</div>
                        <div style={{ fontSize: 10, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                          Growth <span style={{ color: M.green, fontWeight: 700 }}>{growth}%</span>
                          {"  "}Risk <span style={{ color: rCol, fontWeight: 700 }}>{risk}%</span>
                        </div>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {ss.pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </MCard>
            <div style={{ height: 16 }} />
          </>
        )}

        {/* ─ DASHBOARD / COMPANIES ─ */}
        {dashSub === "companies" && (
          <>
            {/* Sector market overview — 3 stat chips */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 8 }}>
              {[
                { label: "Total Market Cap", val: `$${(s.capHigh * 0.9).toFixed(1)}B`, chg: "+4.2%", up: true },
                {
                  label: "Avg BRIDGE Score",
                  val: `${Math.round(companies.reduce((a, c) => a + c.sc, 0) / companies.length)}`,
                  chg: "+1.8pt",
                  up: true,
                },
                { label: "Active Players", val: `${companies.length}`, chg: "Tracked", up: null },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: M.card,
                    borderRadius: 12,
                    border: `1px solid ${M.cardBorder}`,
                    padding: "11px 10px",
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 700, color: M.white, lineHeight: 1, marginBottom: 3 }}>
                    {m.val}
                  </div>
                  <div
                    style={{
                      fontSize: 8,
                      color: M.muted,
                      fontFamily: "Inter,sans-serif",
                      marginBottom: 5,
                      lineHeight: 1.3,
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: m.up === null ? M.muted : m.up ? M.green : M.red,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {m.chg}
                  </div>
                </div>
              ))}
            </div>

            {/* Top Companies — expanded rows */}
            <MCard icon={User} title="Top Companies" badge={`${companies.length} active`} defaultOpen={true}>
              <div style={{ padding: "4px 0 4px" }}>
                {companies.map((co, i) => {
                  const sparkData = [40, 55, 48, 62, 58, 70, 65, co.sc];
                  const sparkMax = Math.max(...sparkData),
                    sparkMin = Math.min(...sparkData);
                  const pts = sparkData
                    .map((v, idx) => `${idx * (40 / 7)},${20 - ((v - sparkMin) / (sparkMax - sparkMin || 1)) * 18}`)
                    .join(" ");
                  return (
                    <div
                      key={i}
                      style={{
                        padding: "12px 14px",
                        borderBottom: i < companies.length - 1 ? `1px solid ${M.divider}` : "none",
                      }}
                    >
                      {/* Row 1: rank + name + value */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 11, marginBottom: 8 }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "rgba(255,255,255,0.05)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            fontSize: 11,
                            fontWeight: 800,
                            color: M.muted,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {co.r}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: M.white,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {co.name}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                            <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>{co.tk}</span>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: co.chg.startsWith("-") ? M.red : M.green,
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              {co.chg}
                            </span>
                            <span style={{ fontSize: 9, color: M.dim }}>·</span>
                            <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>30d</span>
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div
                            style={{ fontSize: 14, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}
                          >
                            {co.val}
                          </div>
                          <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                            Valuation
                          </div>
                        </div>
                      </div>
                      {/* Row 2: score bar + sparkline */}
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                              BRIDGE Score
                            </span>
                            <span
                              style={{
                                fontSize: 9,
                                fontWeight: 700,
                                color: co.sc >= 80 ? M.green : co.sc >= 65 ? M.orange : M.red,
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              {co.sc}
                            </span>
                          </div>
                          <div
                            style={{
                              height: 4,
                              background: "rgba(255,255,255,0.06)",
                              borderRadius: 2,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${co.sc}%`,
                                height: "100%",
                                background: `linear-gradient(90deg,${M.teal},${co.sc >= 80 ? M.green : co.sc >= 65 ? M.orange : M.red})`,
                                borderRadius: 2,
                              }}
                            />
                          </div>
                        </div>
                        {/* Mini sparkline */}
                        <svg width="40" height="20" style={{ flexShrink: 0, opacity: 0.7 }}>
                          <polyline
                            points={pts}
                            fill="none"
                            stroke={co.chg.startsWith("-") ? M.red : M.tealBright}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            </MCard>

            {/* Market Share Breakdown */}
            <MCard
              icon={BarChart2}
              title="Market Share Breakdown"
              badge={`${s.subSectors.length} segments`}
              defaultOpen={true}
            >
              <div style={{ padding: "12px 14px" }}>
                {/* Stacked bar */}
                <div
                  style={{ height: 10, borderRadius: 6, overflow: "hidden", display: "flex", marginBottom: 14, gap: 1 }}
                >
                  {s.subSectors.map((ss, i) => (
                    <div
                      key={i}
                      style={{
                        flex: ss.pct,
                        background: ss.color,
                        borderRadius: i === 0 ? "6px 0 0 6px" : i === s.subSectors.length - 1 ? "0 6px 6px 0" : "0",
                      }}
                    />
                  ))}
                </div>
                {s.subSectors.map((ss, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: ss.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
                      {ss.name}
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {ss.pct}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Momentum Watch — movers */}
            <MCard icon={TrendingUp} title="Momentum Watch" badge="30 days" defaultOpen={true}>
              <div style={{ padding: "10px 14px" }}>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: M.muted,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontFamily: "Inter,sans-serif",
                    marginBottom: 10,
                  }}
                >
                  Top Movers
                </div>
                {[...companies]
                  .sort((a, b) => parseFloat(b.chg) - parseFloat(a.chg))
                  .slice(0, 3)
                  .map((co, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 0",
                        borderBottom: i < 2 ? `1px solid ${M.divider}` : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 7,
                          background: co.chg.startsWith("-") ? "rgba(248,113,113,0.1)" : "rgba(74,222,128,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {co.chg.startsWith("-") ? (
                          <TrendingDown size={13} color={M.red} />
                        ) : (
                          <TrendingUp size={13} color={M.green} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: M.white,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {co.name}
                        </div>
                        <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                          {co.tk} · Score {co.sc}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "4px 10px",
                          borderRadius: 20,
                          background: co.chg.startsWith("-") ? "rgba(248,113,113,0.12)" : "rgba(74,222,128,0.12)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: co.chg.startsWith("-") ? M.red : M.green,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {co.chg}
                        </span>
                      </div>
                    </div>
                  ))}
                <div style={{ height: "1px", background: M.divider, margin: "10px 0" }} />
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: M.muted,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontFamily: "Inter,sans-serif",
                    marginBottom: 10,
                  }}
                >
                  Laggards
                </div>
                {[...companies]
                  .sort((a, b) => parseFloat(a.chg) - parseFloat(b.chg))
                  .slice(0, 2)
                  .map((co, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 0",
                        borderBottom: i < 1 ? `1px solid ${M.divider}` : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 7,
                          background: "rgba(248,113,113,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <TrendingDown size={13} color={M.red} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: M.white,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {co.name}
                        </div>
                        <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                          {co.tk} · Score {co.sc}
                        </div>
                      </div>
                      <div style={{ padding: "4px 10px", borderRadius: 20, background: "rgba(248,113,113,0.12)" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: M.red, fontFamily: "Inter,sans-serif" }}>
                          {co.chg}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </MCard>

            {/* BRIDGE Score Distribution */}
            <MCard icon={Target} title="Score Distribution" badge="All tracked" defaultOpen={false}>
              <div style={{ padding: "12px 14px" }}>
                {[
                  { range: "80–100", label: "Strong", col: M.green, count: companies.filter((c) => c.sc >= 80).length },
                  {
                    range: "65–79",
                    label: "Moderate",
                    col: M.orange,
                    count: companies.filter((c) => c.sc >= 65 && c.sc < 80).length,
                  },
                  { range: "<65", label: "Watch", col: M.red, count: companies.filter((c) => c.sc < 65).length },
                ].map((band, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: `rgba(${band.col === "#4ADE80" ? "74,222,128" : band.col === "#F59E0B" ? "245,158,11" : "248,113,113"},0.1)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, color: band.col, fontFamily: "Inter,sans-serif" }}>
                        {band.count}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: M.white }}>{band.label}</span>
                        <span style={{ fontSize: 10, color: M.dim, fontFamily: "Inter,sans-serif" }}>{band.range}</span>
                      </div>
                      <div
                        style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}
                      >
                        <div
                          style={{
                            width: `${(band.count / companies.length) * 100}%`,
                            height: "100%",
                            background: band.col,
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            <div style={{ height: 16 }} />
          </>
        )}

        {/* ─ DASHBOARD / ANALYTICS ─ */}
        {dashSub === "analytics" && (
          <>
            {/* ── KPI STRIP ── */}
            <div style={{ padding: "12px 14px 0" }}>
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
                Key Metrics
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                {[
                  { l: "Avg IRR (Tier I)", v: `${s.irrHigh}%`, sub: "projected", chg: "+2.1pp", up: true },
                  {
                    l: "Capital Deployed",
                    v: `$${Math.round(s.capLow * 0.6)}M`,
                    sub: "of target",
                    chg: "+18%",
                    up: true,
                  },
                  {
                    l: "Active Ventures",
                    v: `${s.totalV}`,
                    sub: "identified",
                    chg: `${s.t1?.length} Tier I`,
                    up: true,
                  },
                  {
                    l: "BRIDGE Score",
                    v: `${s.score}`,
                    sub: "/ 100",
                    chg: s.score >= 88 ? "Tier I Ready" : "Strong",
                    up: s.score >= 80,
                  },
                ].map((k, i) => (
                  <div
                    key={i}
                    style={{
                      background: M.card,
                      borderRadius: 12,
                      border: `1px solid ${M.cardBorder}`,
                      padding: "12px 12px 10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        color: M.muted,
                        fontFamily: "Inter,sans-serif",
                        marginBottom: 5,
                        letterSpacing: ".3px",
                      }}
                    >
                      {k.l}
                    </div>
                    <div
                      style={{ fontSize: 22, fontWeight: 800, color: M.white, lineHeight: 1, letterSpacing: "-0.5px" }}
                    >
                      {k.v}
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}
                    >
                      <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>{k.sub}</span>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: k.up ? M.green : M.orange,
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {k.chg}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── IRR PERFORMANCE TREND ── */}
            <MCard icon={TrendingUp} title="IRR Performance" badge="12-Month" badgeLime={true} defaultOpen={true}>
              <div style={{ padding: "10px 14px 6px" }}>
                {/* Sparkline area */}
                <div style={{ position: "relative", height: 72, marginBottom: 6 }}>
                  <svg width="100%" height="72" viewBox="0 0 280 72" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="irrGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B8D935" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#B8D935" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {(() => {
                      const pts = [42, 45, 43, 48, 47, 52, 50, 55, 58, 54, 60, s.irrHigh];
                      const max = Math.max(...pts) + 4,
                        min = Math.min(...pts) - 4;
                      const x = (i) => i * (280 / 11);
                      const y = (v) => 72 - ((v - min) / (max - min)) * 68;
                      const line = pts.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
                      const area = `${line} L${x(11)},72 L${x(0)},72 Z`;
                      return (
                        <>
                          <path d={area} fill="url(#irrGrad)" />
                          <path
                            d={line}
                            stroke="#B8D935"
                            strokeWidth="1.8"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx={x(11)} cy={y(s.irrHigh)} r="3.5" fill="#B8D935" />
                        </>
                      );
                    })()}
                  </svg>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  {["Apr", "Jun", "Aug", "Oct", "Dec", "Mar"].map((m) => (
                    <span key={m} style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>
                      {m}
                    </span>
                  ))}
                </div>
                {/* Tier breakdown bars */}
                {[
                  { l: "Tier I Average", v: s.irrHigh, max: 30, col: M.accent },
                  { l: "Tier II Average", v: Math.round(s.irrHigh * 0.78), max: 30, col: M.tealBright },
                  { l: "Tier III Average", v: Math.round(s.irrHigh * 0.62), max: 30, col: "rgba(46,90,77,0.6)" },
                ].map((row, i) => (
                  <div key={i} style={{ marginBottom: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>{row.l}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
                        {row.v}%
                      </span>
                    </div>
                    <div
                      style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}
                    >
                      <div
                        style={{
                          width: `${(row.v / row.max) * 100}%`,
                          height: "100%",
                          background: row.col,
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* ── CAPITAL DEPLOYMENT ── */}
            <MCard icon={BarChart2} title="Capital Deployment" badge="Pipeline" defaultOpen={true}>
              <div style={{ padding: "10px 14px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 14 }}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: M.white, letterSpacing: "-0.5px" }}>
                    ${Math.round(((s.capLow + s.capHigh) / 2) * 0.52)}M
                  </span>
                  <span style={{ fontSize: 11, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                    of ${Math.round((s.capLow + s.capHigh) / 2)}M target
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: M.green,
                      fontFamily: "Inter,sans-serif",
                      marginLeft: "auto",
                    }}
                  >
                    52% filled
                  </span>
                </div>
                {/* Stacked progress */}
                <div
                  style={{ height: 10, borderRadius: 5, overflow: "hidden", display: "flex", marginBottom: 14, gap: 1 }}
                >
                  <div style={{ flex: 32, background: M.accent }} />
                  <div style={{ flex: 20, background: M.tealBright }} />
                  <div style={{ flex: 0, background: "rgba(46,90,77,0.4)" }} />
                  <div style={{ flex: 48, background: "rgba(255,255,255,0.06)" }} />
                </div>
                {s.pipeline.map((p, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: M.white,
                          flex: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.label}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: i < 2 ? M.accent : M.tealBright,
                          fontFamily: "Inter,sans-serif",
                          flexShrink: 0,
                          marginLeft: 8,
                        }}
                      >
                        {p.current} / {p.target}
                      </span>
                    </div>
                    <div
                      style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}
                    >
                      <div
                        style={{
                          width: `${p.pct}%`,
                          height: "100%",
                          background: i < 2 ? M.accent : M.tealBright,
                          borderRadius: 3,
                        }}
                      />
                    </div>
                    <div style={{ fontSize: 9, color: M.dim, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                      {p.months}mo remaining · {p.pct}% funded
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* ── SECTOR SCORE VS AVERAGE ── */}
            <MCard icon={BarChart3} title="Sector Benchmarking" badge="All 12" defaultOpen={false}>
              <div style={{ padding: "10px 14px" }}>
                <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 12 }}>
                  BRIDGE Score vs. portfolio average (81)
                </div>
                {SECTORS.slice(0, 6).map((sec, i) => {
                  const act = sec.id === s.id;
                  return (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: act ? 700 : 400,
                            color: act ? M.accent : M.muted,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {sec.short}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: act ? M.accent : M.white,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {sec.score}
                        </span>
                      </div>
                      <div
                        style={{
                          height: 4,
                          background: "rgba(255,255,255,0.06)",
                          borderRadius: 2,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: `${sec.score}%`,
                            height: "100%",
                            background: act ? M.accent : "rgba(46,90,77,0.55)",
                            borderRadius: 2,
                          }}
                        />
                        {/* avg line */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: "81%",
                            width: 1,
                            height: "100%",
                            background: "rgba(255,255,255,0.25)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </MCard>

            {/* ── ACTIVITY HEATMAP ── */}
            <MCard icon={LayoutGrid} title="Activity Heatmap" badge="7 Days" defaultOpen={false}>
              <Heatmap />
            </MCard>

            <div style={{ height: 16 }} />
          </>
        )}
      </div>

      {/* ═══ BOTTOM NAV — 5 sections ═══ */}
      {/* ═══ BOTTOM NAV — 5 sections ═══ */}
      <div
        style={{
          flexShrink: 0,
          height: 56,
          background: "#080E09",
          borderTop: `1px solid ${M.divider}`,
          display: "flex",
          alignItems: "stretch",
          position: "relative",
          zIndex: 50,
        }}
      >
        {[
          {
            id: "overview",
            label: "Overview",
            svg: (c) => (
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
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            ),
          },
          {
            id: "ventures",
            label: "Ventures",
            svg: (c) => (
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
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            ),
          },
          {
            id: "signals",
            label: "Signals",
            svg: (c) => (
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
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <circle cx="12" cy="20" r="1" fill={c} />
              </svg>
            ),
          },
          {
            id: "companies",
            label: "Companies",
            svg: (c) => (
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
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            ),
          },
          {
            id: "analytics",
            label: "Analytics",
            svg: (c) => (
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
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            ),
          },
        ].map((n) => {
          const act = dashSub === n.id;
          const col = act ? M.accent : "rgba(255,255,255,0.28)";
          return (
            <button
              key={n.id}
              onClick={() => setDashSub(n.id)}
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
                    width: 28,
                    height: 2,
                    borderRadius: "0 0 2px 2px",
                    background: M.accent,
                  }}
                />
              )}
              {n.svg(col)}
              <span
                style={{
                  fontSize: 9,
                  fontWeight: act ? 700 : 400,
                  color: col,
                  fontFamily: "Inter,sans-serif",
                  letterSpacing: ".3px",
                  transition: "all .15s",
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

/* ─────────── COMPARE PANEL ─────────── */
function ComparePanel({ sA, sB, onClose }: { sA: any; sB: any; onClose: () => void }) {
  const cols = [sA, sB];
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 900,
        maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #E5E7EB" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Sector Comparison</div>
            <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginTop: 2 }}>Side-by-side analysis · Mar 2026</div>
          </div>
          <button onClick={onClose} style={{ background: "#F3F4F6", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#374151", fontFamily: "Inter,sans-serif" }}>Close ×</button>
        </div>
        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ padding: "14px 16px", background: "#F9FAFB" }} />
          {cols.map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.id} style={{ padding: "14px 16px", background: "#F9FAFB", borderLeft: "1px solid #E5E7EB" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(27,77,62,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={15} color="#1B4D3E" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{sec.short}</div>
                    <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{sec.tag}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Rows */}
        {[
          { label: "BRIDGE Score", key: "score", render: (v) => <span style={{ fontSize: 18, fontWeight: 800, color: v >= 88 ? "#16A34A" : v >= 80 ? "#CA8A04" : "#DC2626", fontFamily: "Inter,sans-serif" }}>{v}</span> },
          { label: "Capital Range", key: null, render: (_, sec) => <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", fontFamily: "Inter,sans-serif" }}>${sec.capLow}–{sec.capHigh}M</span> },
          { label: "IRR Potential", key: null, render: (_, sec) => <span style={{ fontSize: 13, fontWeight: 600, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>{sec.irrLow}–{sec.irrHigh}%</span> },
          { label: "Ventures Identified", key: "totalV", render: (v) => <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", fontFamily: "Inter,sans-serif" }}>{v}</span> },
          { label: "Tier I Ventures", key: null, render: (_, sec) => <span style={{ fontSize: 13, fontWeight: 600, color: "#1B4D3E", fontFamily: "Inter,sans-serif" }}>{sec.t1?.length || 0}</span> },
          { label: "Sector Tag", key: "tag", render: (v) => <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 5, background: "#EBF5B0", color: "#1B4D3E", fontFamily: "Inter,sans-serif" }}>{v}</span> },
        ].map(({ label, key, render }, ri) => (
          <div key={ri} style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", borderBottom: "1px solid #F3F4F6" }}>
            <div style={{ padding: "13px 16px", fontSize: 12, fontWeight: 600, color: "#6B7280", fontFamily: "Inter,sans-serif", display: "flex", alignItems: "center" }}>{label}</div>
            {cols.map((sec) => (
              <div key={sec.id} style={{ padding: "13px 16px", borderLeft: "1px solid #F3F4F6", display: "flex", alignItems: "center" }}>
                {render(key ? sec[key] : null, sec)}
              </div>
            ))}
          </div>
        ))}
        {/* Top ventures side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr" }}>
          <div style={{ padding: "13px 16px", fontSize: 12, fontWeight: 600, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>Top Ventures</div>
          {cols.map((sec) => (
            <div key={sec.id} style={{ padding: "10px 16px", borderLeft: "1px solid #F3F4F6" }}>
              {(sec.t1 || []).slice(0, 3).map((v, vi) => (
                <div key={vi} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: vi < 2 ? "1px solid #F3F4F6" : "none" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8D935", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#111827", fontFamily: "Inter,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.name}</div>
                    <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{v.irr} IRR · {v.cap}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── SEARCH RESULT OVERLAY ─────────── */
function SearchOverlay({ query, onSelect, onClose }: { query: string; onSelect: (s: any) => void; onClose: () => void }) {
  const q = query.toLowerCase().trim();
  if (!q) return null;
  // Search sectors by name/tag
  const sectorResults = SECTORS.filter(sec =>
    sec.short.toLowerCase().includes(q) || sec.full.toLowerCase().includes(q) || sec.tag.toLowerCase().includes(q)
  );
  // Search ventures across all sectors
  const ventureResults: { venture: any; sector: any }[] = [];
  SECTORS.forEach(sec => {
    [...(sec.t1 || []), ...(sec.t2 || []), ...(sec.t3 || [])].forEach(v => {
      if (v.name.toLowerCase().includes(q)) {
        ventureResults.push({ venture: v, sector: sec });
      }
    });
  });
  const hasResults = sectorResults.length > 0 || ventureResults.length > 0;
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
      background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB",
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 200, overflow: "hidden", maxHeight: 360, overflowY: "auto",
    }}>
      {!hasResults && (
        <div style={{ padding: "18px 16px", fontSize: 12, color: "#9CA3AF", textAlign: "center", fontFamily: "Inter,sans-serif" }}>
          No results for "{query}"
        </div>
      )}
      {sectorResults.length > 0 && (
        <>
          <div style={{ padding: "8px 14px 4px", fontSize: 9, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "Inter,sans-serif" }}>Sectors</div>
          {sectorResults.slice(0, 4).map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.id} onClick={() => { onSelect(sec); onClose(); }}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", cursor: "pointer", transition: "background .1s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "#EBF5B0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={13} color="#1B4D3E" />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "DM Sans,sans-serif" }}>{sec.short}</div>
                  <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{sec.tag} · Score {sec.score}</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>${sec.capLow}–{sec.capHigh}M</div>
              </div>
            );
          })}
        </>
      )}
      {ventureResults.length > 0 && (
        <>
          <div style={{ padding: "8px 14px 4px", fontSize: 9, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "Inter,sans-serif", borderTop: sectorResults.length > 0 ? "1px solid #F3F4F6" : "none" }}>Ventures</div>
          {ventureResults.slice(0, 5).map(({ venture, sector }, i) => (
            <div key={i} onClick={() => { onSelect(sector); onClose(); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", cursor: "pointer", transition: "background .1s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(46,90,77,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Briefcase size={12} color="#2E5A4D" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "DM Sans,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{venture.name}</div>
                <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{sector.short} · {venture.irr} IRR · {venture.cap}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

/* ─────────── DESKTOP DASHBOARD ─────────── */
function DesktopDashboard() {
  const [searchParams] = useSearchParams();
  const [s, setS] = useState(() => {
    const id = searchParams.get("sector");
    return SECTORS.find(sec => sec.id === id) || SECTORS[0];
  });
  const [collapsed, setCollapsed] = useState(false);
  const [chart, setChart] = useState("bar");
  const [notif, setNotif] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareSectors, setCompareSectors] = useState<any[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Sync when URL param changes (e.g. sidebar sector click)
  useEffect(() => {
    const id = searchParams.get("sector");
    if (id) {
      const found = SECTORS.find(sec => sec.id === id);
      if (found) {
        setFadeKey(k => k + 1);
        setS(found);
      }
    }
  }, [searchParams]);

  const handleSectorSelect = useCallback((sec: any) => {
    setFadeKey(k => k + 1);
    setS(sec);
    setSearchQuery("");
    setSearchOpen(false);
  }, []);

  const handleCompareToggle = (sec: any) => {
    setCompareSectors(prev => {
      if (prev.find(p => p.id === sec.id)) return prev.filter(p => p.id !== sec.id);
      if (prev.length >= 2) return [prev[1], sec];
      return [...prev, sec];
    });
  };

  const cData = (s.t1 || [])
    .slice(0, 6)
    .map((v, i) => ({
      name: v.name.split(" ").slice(0, 2).join(" "),
      "Tier I": 60 + i * 5,
      "Tier II": 40 + i * 4,
      "Tier III": 25 + i * 3,
    }));
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        overflow: "hidden",
        background: "#EFF3EF",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      {/* Compare Panel */}
      {compareMode && compareSectors.length === 2 && (
        <ComparePanel sA={compareSectors[0]} sB={compareSectors[1]} onClose={() => { setCompareMode(false); setCompareSectors([]); }} />
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #E5E7EB",
            padding: "0 22px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            height: 56,
            flexShrink: 0,
            boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
          }}
        >
          {/* LEFT — Title + filter state */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", lineHeight: 1.1 }}>Dashboard</div>
              <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
              </div>
            </div>
            {/* Vertical divider */}
            <div style={{ width: 1, height: 28, background: "#E5E7EB", flexShrink: 0 }} />
            {/* Filter state pill */}
            {/* Active sector breadcrumb chip */}
            {(() => {
              const Icon = s.icon;
              const isDefault = s.id === SECTORS[0].id && !searchParams.get("sector");
              return (
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "Inter,sans-serif" }}>Viewing:</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "3px 7px 3px 9px",
                      borderRadius: 7,
                      background: "#EBF5B0",
                      border: "1px solid rgba(184,217,53,0.35)",
                      animation: "dash-fade-in 0.25s ease-out",
                    }}
                    title={`Viewing: ${s.full}`}
                  >
                    <Icon size={11} color="#1B4D3E" strokeWidth={1.8} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#1B4D3E", fontFamily: "Inter,sans-serif", whiteSpace: "nowrap" }}>
                      {s.short}
                    </span>
                    {searchParams.get("sector") && (
                      <button
                        onClick={() => {
                          setFadeKey(k => k + 1);
                          setS(SECTORS[0]);
                          const url = new URL(window.location.href);
                          url.searchParams.delete("sector");
                          window.history.replaceState({}, "", url.pathname);
                        }}
                        title="Reset to default"
                        style={{
                          background: "rgba(27,77,62,0.12)", border: "none", borderRadius: 3,
                          width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", padding: 0, marginLeft: 1, flexShrink: 0,
                          color: "#1B4D3E", fontSize: 11, lineHeight: 1,
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* CENTER — Search */}
          <div
            ref={searchContainerRef}
            style={{
              flex: 1,
              maxWidth: 360,
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: searchOpen ? "#fff" : "#F9FAFB",
              border: `1px solid ${searchOpen ? "#1B4D3E" : "#E5E7EB"}`,
              borderRadius: 9,
              padding: "7px 12px",
              marginLeft: "auto",
              transition: "border-color 0.15s, background 0.15s",
            }}
          >
            <Search size={13} color={searchOpen ? "#1B4D3E" : "#6B7280"} />
            <input
              ref={searchRef}
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search sectors, ventures, metrics…"
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
            {searchQuery ? (
              <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "#9CA3AF", flexShrink: 0 }}>
                ×
              </button>
            ) : (
              <span style={{ fontSize: 9, color: "#6B7280", background: "#E5E7EB", padding: "1px 5px", borderRadius: 3, fontFamily: "Inter,sans-serif", flexShrink: 0, whiteSpace: "nowrap" }}>⌘K</span>
            )}
            {/* Search Results Overlay */}
            {searchOpen && searchQuery && (
              <SearchOverlay query={searchQuery} onSelect={handleSectorSelect} onClose={() => { setSearchOpen(false); setSearchQuery(""); }} />
            )}
          </div>

          {/* RIGHT — Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
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
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Alerts</span>
                    <span style={{ fontSize: 11, color: "#B8D935", cursor: "pointer", fontWeight: 600 }}>
                      Mark all read
                    </span>
                  </div>
                  {s.activity.slice(0, 3).map((a, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", gap: 9, padding: "10px 14px", borderBottom: "1px solid #E5E7EB" }}
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
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>{a.h}</div>
                        <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                          {a.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
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
              <SlidersHorizontal size={14} color="#374151" />
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
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
                <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", lineHeight: 1 }}>Joseph A.</div>
                <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>Full Access</div>
              </div>
              <ChevronDown size={11} color="#6B7280" />
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#1B4D3E",
                color: "#fff",
                border: "none",
                borderRadius: 9,
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <PlusCircle size={13} />
              Add Widget
            </button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
          <div
            key={fadeKey}
            style={{
              flex: 1, overflowY: "auto", padding: "18px",
              animation: "dash-fade-in 0.28s ease-out",
            }}
          >
            <style>{`@keyframes dash-fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 252px", gap: 14, marginBottom: 14 }}>
              <Card style={{ padding: 0 }}>
                <div style={{ padding: "16px 20px 10px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 2,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#6B7280",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          fontFamily: "Inter,sans-serif",
                          marginBottom: 3,
                        }}
                      >
                        {s.full}
                      </div>
                      <div
                        style={{
                          fontSize: 30,
                          fontWeight: 700,
                          color: "#111827",
                          lineHeight: 1,
                          letterSpacing: "-1px",
                        }}
                      >
                        {s.totalV}{" "}
                        <span style={{ fontSize: 13, fontWeight: 400, color: "#6B7280" }}>ventures identified</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                        ${s.capLow}–{s.capHigh}M capital range · {s.irrLow}–{s.irrHigh}% projected IRR
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7 }}>
                      <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 3 }}>
                        {(
                          [
                            ["Bar", "bar", BarChart3],
                            ["Line", "line", LineChart],
                          ] as [string, string, React.ComponentType<{ size?: number }>][]
                        ).map(([l, v, ChartIcon]) => (
                          <button
                            key={v}
                            onClick={() => setChart(v)}
                            style={{
                              padding: "4px 8px",
                              borderRadius: 5,
                              border: "none",
                              background: chart === v ? "#fff" : "transparent",
                              fontSize: 10,
                              fontWeight: 600,
                              color: chart === v ? "#1B4D3E" : "#6B7280",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              boxShadow: chart === v ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
                            }}
                          >
                            <ChartIcon size={11} />
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                    {[
                      ["Tier I Priority", "#B8D935"],
                      ["Tier II Medium-term", "#2E5A4D"],
                      ["Tier III Long-term", "rgba(107,114,128,0.6)"],
                    ].map(([l, c]) => (
                      <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 9, height: 9, borderRadius: 2, background: c }} />
                        <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ height: 190, padding: "0 8px 10px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    {chart === "bar" ? (
                      <BarChart data={cData} barSize={16} barGap={3}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 9, fill: "#6B7280", fontFamily: "Inter,sans-serif" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis tick={{ fontSize: 9, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<Tip />} />
                        <Bar dataKey="Tier I" fill="#B8D935" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="Tier II" fill="#2E5A4D" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="Tier III" fill="rgba(107,114,128,0.5)" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    ) : (
                      <LC data={cData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 9, fill: "#6B7280" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis tick={{ fontSize: 9, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<Tip />} />
                        <Line dataKey="Tier I" stroke="#B8D935" strokeWidth={2} dot={{ r: 3 }} type="monotone" />
                        <Line dataKey="Tier II" stroke="#2E5A4D" strokeWidth={2} dot={{ r: 3 }} type="monotone" />
                        <Line
                          dataKey="Tier III"
                          stroke="#6B7280"
                          strokeWidth={1.5}
                          dot={{ r: 2 }}
                          type="monotone"
                          strokeDasharray="5 4"
                        />
                      </LC>
                    )}
                  </ResponsiveContainer>
                </div>
              </Card>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  {
                    label: "Portfolio Capital",
                    v: `$${s.capLow}–${s.capHigh}M`,
                    sub: "Capital Range",
                    up: true,
                    d: "+Growth",
                  },
                  {
                    label: "BRIDGE Impact Score",
                    v: String(s.score),
                    sub: "/ 100 Current",
                    up: s.score >= 80,
                    d: s.score >= 88 ? "Tier I Ready" : s.score >= 80 ? "Strong" : "Developing",
                  },
                  {
                    label: "IRR Potential",
                    v: `${s.irrLow}–${s.irrHigh}%`,
                    sub: "Projected Return",
                    up: true,
                    d: `${s.totalV} Ventures`,
                  },
                ].map((m, i) => (
                  <Card key={i} style={{ padding: "15px 17px", flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif", marginBottom: 4 }}>
                      {m.label}
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#111827",
                        letterSpacing: "-.5px",
                        lineHeight: 1,
                        marginBottom: 5,
                      }}
                    >
                      {m.v}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      {m.up ? <TrendingUp size={11} color="#16A34A" /> : <TrendingDown size={11} color="#DC2626" />}
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: m.up ? "#16A34A" : "#DC2626",
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {m.d}
                      </span>
                      <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{m.sub}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <Card style={{ padding: "16px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Capital Deployment Progress</div>
                    <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                      Venture pipeline vs. target allocation
                    </div>
                  </div>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}>
                    <RefreshCw size={13} />
                  </button>
                </div>
                {s.pipeline.map((p, i) => (
                  <div key={i} style={{ marginBottom: 11 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", fontFamily: "Inter,sans-serif" }}>
                        {p.label}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#1B4D3E", fontFamily: "Inter,sans-serif" }}>
                        {p.current} <span style={{ fontWeight: 400, color: "#6B7280" }}>/ {p.target}</span>
                      </span>
                    </div>
                    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${p.pct}%`,
                          height: "100%",
                          background: "linear-gradient(90deg,#B8D935,#2E5A4D)",
                          borderRadius: 3,
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                      <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>
                        {p.pct}% deployed
                      </span>
                      <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>
                        ~{p.months}mo remaining
                      </span>
                    </div>
                  </div>
                ))}
              </Card>
              <Card
                style={{
                  padding: "20px 22px",
                  background: "linear-gradient(145deg,#1B4D3E 0%,#243F2F 60%,#1A3528 100%)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: -20,
                    top: -20,
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    background: "rgba(184,217,53,0.05)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: -30,
                    bottom: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.03)",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "3px 9px",
                        borderRadius: 4,
                        background: "#EBF5B0",
                        color: "#1B4D3E",
                        fontFamily: "Inter,sans-serif",
                        letterSpacing: ".8px",
                        textTransform: "uppercase",
                      }}
                    >
                      Key Insight
                    </span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "Inter,sans-serif" }}>
                      {s.tag}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.45,
                      marginBottom: 10,
                      letterSpacing: "-.2px",
                    }}
                  >
                    {s.headline}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.62)",
                      lineHeight: 1.65,
                      fontFamily: "Inter,sans-serif",
                      marginBottom: 18,
                    }}
                  >
                    {s.insight}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 18 }}>
                    {[
                      { label: "Capital Range", val: `$${s.capLow}–${s.capHigh}M` },
                      { label: "IRR Potential", val: `${s.irrLow}–${s.irrHigh}%` },
                      { label: "Ventures", val: `${s.totalV} identified` },
                    ].map((st, i) => (
                      <div
                        key={i}
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 9,
                          padding: "10px 12px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: i === 1 ? "#B8D935" : "#fff",
                            fontFamily: "Inter,sans-serif",
                            lineHeight: 1,
                            marginBottom: 4,
                          }}
                        >
                          {st.val}
                        </div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "Inter,sans-serif" }}>
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#B8D935",
                      color: "#1B4D3E",
                      border: "none",
                      padding: "9px 16px",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 700,
                      fontFamily: "Inter,sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    Full Analysis <ArrowUpRight size={12} />
                  </button>
                </div>
              </Card>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              <Card style={{ padding: "16px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 2 }}>
                  Venture Breakdown
                </div>
                <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginBottom: 10 }}>
                  By intervention type · {s.totalV} ventures
                </div>
                <div
                  style={{ fontSize: 22, fontWeight: 700, color: "#111827", letterSpacing: "-.5px", marginBottom: 1 }}
                >
                  ${s.capLow}–{s.capHigh}M
                </div>
                <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginBottom: 10 }}>
                  Total sector capital range
                </div>
                <div style={{ height: 8, borderRadius: 5, overflow: "hidden", display: "flex", marginBottom: 13 }}>
                  {s.subSectors.map((ss, i) => (
                    <div key={i} style={{ flex: ss.pct, background: ss.color }} />
                  ))}
                </div>
                {s.subSectors.map((ss, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 9, height: 9, borderRadius: 2, background: ss.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: "#374151", fontFamily: "Inter,sans-serif" }}>{ss.name}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#111827", fontFamily: "Inter,sans-serif" }}>
                      {ss.pct}%
                    </span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #F3F4F6", marginTop: 12, paddingTop: 12 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#6B7280",
                      letterSpacing: ".8px",
                      textTransform: "uppercase",
                      fontFamily: "Inter,sans-serif",
                      marginBottom: 8,
                    }}
                  >
                    Tier Distribution
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                    {[
                      [s.t1?.length, "I", "#EBF5B0", "#1B4D3E", "Priority"],
                      [s.t2?.length, "II", "rgba(46,90,77,0.1)", "#2E5A4D", "Mid-term"],
                      [s.t3?.length, "III", "rgba(107,114,128,0.08)", "#6B7280", "Long-term"],
                    ].map(([n, label, bg, col, sub]: [any, any, any, any, any]) => (
                      <div
                        key={label}
                        style={{ background: bg, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}
                      >
                        <div
                          style={{
                            fontSize: 17,
                            fontWeight: 700,
                            color: col,
                            fontFamily: "Inter,sans-serif",
                            lineHeight: 1,
                          }}
                        >
                          {n}
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: col,
                            fontFamily: "Inter,sans-serif",
                            marginTop: 2,
                          }}
                        >
                          T{label}
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            color: col,
                            opacity: 0.7,
                            fontFamily: "Inter,sans-serif",
                            marginTop: 1,
                          }}
                        >
                          {sub}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#F9FAFB",
                      borderRadius: 8,
                      padding: "8px 12px",
                      border: "1px solid #F3F4F6",
                    }}
                  >
                    <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>
                      IRR Potential Range
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1B4D3E", fontFamily: "Inter,sans-serif" }}>
                      {s.irrLow}–{s.irrHigh}%
                    </span>
                  </div>
                </div>
              </Card>
              <Card style={{ padding: "18px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 2 }}>Impact Score</div>
                <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginBottom: 16 }}>
                  4-dimension BRIDGE methodology
                </div>
                <Gauge score={s.score} />
                <div style={{ textAlign: "center", marginTop: 12, marginBottom: 18 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: s.score >= 88 ? "#16A34A" : s.score >= 80 ? "#CA8A04" : "#DC2626",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {s.score >= 88 ? "Tier I Ready" : s.score >= 80 ? "Strong" : "Developing"}
                  </span>
                </div>
                {[
                  ["P&P Alignment", Math.min(s.score + 4, 96)],
                  ["Strategic Fit", Math.max(s.score - 2, 0)],
                  ["Feasibility", Math.min(s.score + 2, 98)],
                  ["Scalability", Math.max(s.score - 1, 0)],
                ].map(([l, v]) => (
                  <div key={l} style={{ marginBottom: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{l}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#374151", fontFamily: "Inter,sans-serif" }}>
                        {v}
                      </span>
                    </div>
                    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${v}%`, height: "100%", background: "#1B4D3E", borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 10,
                    color: "#9CA3AF",
                    fontFamily: "Inter,sans-serif",
                    lineHeight: 1.5,
                    borderTop: "1px solid #F3F4F6",
                    paddingTop: 10,
                  }}
                >
                  Based on BRIDGE 6-stage methodology across {s.totalV} ventures. Mar 2026.
                </div>
              </Card>
              <Card style={{ padding: "16px 18px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Venture Pipeline</div>
                    <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                      {s.totalV} ventures · 3 tiers
                    </div>
                  </div>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#1B4D3E",
                      background: "none",
                      border: "1px solid #E5E7EB",
                      borderRadius: 5,
                      padding: "3px 8px",
                      cursor: "pointer",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    <Target size={10} />
                    Targets
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  {[
                    [s.t1?.length, "I", "#EBF5B0", "#1B4D3E"],
                    [s.t2?.length, "II", "rgba(46,90,77,0.12)", "#2E5A4D"],
                    [s.t3?.length, "III", "rgba(107,114,128,0.1)", "#6B7280"],
                    ].map(([n, label, bg, col]: [any, any, any, any]) => (
                    <div
                      key={label as string}
                      style={{ flex: 1, padding: "9px 10px", background: bg as string, borderRadius: 8, textAlign: "center" }}
                    >
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: col,
                          fontFamily: "Inter,sans-serif",
                          lineHeight: 1,
                        }}
                      >
                        {n}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: col,
                          fontFamily: "Inter,sans-serif",
                          marginTop: 2,
                        }}
                      >
                        TIER {label}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#6B7280",
                    letterSpacing: ".8px",
                    textTransform: "uppercase",
                    fontFamily: "Inter,sans-serif",
                    marginBottom: 7,
                  }}
                >
                  Priority — Tier I
                </div>
                {s.pipeline.slice(0, 2).map((p, i) => (
                  <div key={i} style={{ marginBottom: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#374151",
                          fontFamily: "Inter,sans-serif",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                        }}
                      >
                        {p.label}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#1B4D3E",
                          fontFamily: "Inter,sans-serif",
                          flexShrink: 0,
                          marginLeft: 4,
                        }}
                      >
                        {p.current}
                      </span>
                    </div>
                    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${p.pct}%`, height: "100%", background: "#B8D935", borderRadius: 3 }} />
                    </div>
                    <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                      {p.months}mo remaining
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#6B7280",
                    letterSpacing: ".8px",
                    textTransform: "uppercase",
                    fontFamily: "Inter,sans-serif",
                    margin: "10px 0 7px",
                  }}
                >
                  Medium-term — Tier II
                </div>
                {s.pipeline.slice(2, 4).map((p, i) => (
                  <div key={i} style={{ marginBottom: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#374151",
                          fontFamily: "Inter,sans-serif",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                        }}
                      >
                        {p.label}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#2E5A4D",
                          fontFamily: "Inter,sans-serif",
                          flexShrink: 0,
                          marginLeft: 4,
                        }}
                      >
                        {p.current}
                      </span>
                    </div>
                    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${p.pct}%`, height: "100%", background: "#2E5A4D", borderRadius: 3 }} />
                    </div>
                    <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                      {p.months}mo remaining
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
          <div
            style={{
              width: 322,
              flexShrink: 0,
              background: "#fff",
              borderLeft: "1px solid #E5E7EB",
              overflowY: "auto",
              padding: "14px 0",
            }}
          >
            <div style={{ margin: "0 12px 14px", borderRadius: 12, overflow: "hidden", border: "1px solid #E5E7EB" }}>
              <div style={{ background: "#1B4D3E", padding: "14px" }}>
                <SectorHeader s={s} />
                <div style={{ display: "flex", gap: 3, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}>
                  {SECTORS.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setS(sec)}
                      style={{
                        flexShrink: 0,
                        padding: "3px 8px",
                        borderRadius: 14,
                        border: `1px solid ${sec.id === s.id ? "#B8D935" : "rgba(255,255,255,0.15)"}`,
                        background: sec.id === s.id ? "#B8D935" : "transparent",
                        fontSize: 9,
                        fontWeight: sec.id === s.id ? 700 : 400,
                        color: sec.id === s.id ? "#1B4D3E" : "rgba(255,255,255,0.45)",
                        cursor: "pointer",
                        fontFamily: "Inter,sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {sec.short.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ padding: "11px 12px" }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#6B7280",
                    letterSpacing: ".8px",
                    textTransform: "uppercase",
                    fontFamily: "Inter,sans-serif",
                    marginBottom: 7,
                  }}
                >
                  Quick Actions
                </div>
                {/* Compare sector selector */}
                {compareMode && (
                  <div style={{ marginBottom: 8, padding: "8px 10px", background: "#EBF5B0", borderRadius: 8, border: "1px solid rgba(184,217,53,0.4)" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#1B4D3E", fontFamily: "Inter,sans-serif", marginBottom: 6 }}>
                      Select 2 sectors to compare ({compareSectors.length}/2)
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
                      {SECTORS.slice(0, 6).map(sec => {
                        const selected = compareSectors.find(p => p.id === sec.id);
                        return (
                          <button key={sec.id} onClick={() => handleCompareToggle(sec)} style={{
                            padding: "3px 8px", borderRadius: 5, border: `1px solid ${selected ? "#1B4D3E" : "rgba(27,77,62,0.2)"}`,
                            background: selected ? "#1B4D3E" : "transparent", color: selected ? "#B8D935" : "#1B4D3E",
                            fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "Inter,sans-serif",
                          }}>{sec.short.split(" ")[0]}</button>
                        );
                      })}
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button
                        disabled={compareSectors.length < 2}
                        onClick={() => compareSectors.length === 2 && setCompareMode(true)}
                        style={{
                          flex: 1, padding: "5px 0", borderRadius: 5, border: "none",
                          background: compareSectors.length === 2 ? "#1B4D3E" : "#D1D5DB",
                          color: compareSectors.length === 2 ? "#B8D935" : "#9CA3AF",
                          fontSize: 10, fontWeight: 700, cursor: compareSectors.length === 2 ? "pointer" : "not-allowed",
                          fontFamily: "Inter,sans-serif",
                        }}
                      >Compare Now</button>
                      <button onClick={() => { setCompareMode(false); setCompareSectors([]); }} style={{
                        padding: "5px 8px", borderRadius: 5, border: "1px solid rgba(27,77,62,0.2)",
                        background: "transparent", color: "#1B4D3E", fontSize: 10, fontWeight: 600,
                        cursor: "pointer", fontFamily: "Inter,sans-serif",
                      }}>Cancel</button>
                    </div>
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                  {(
                    [
                      [FileText, "View Report", null],
                      [Download, "Export Data", null],
                      [BarChart2, "Compare", () => { setCompareMode(m => !m); if (!compareMode) setCompareSectors([]); }],
                      [Clock, "History", null],
                      [Share2, "Share", null],
                      [MoreHorizontal, "More", null],
                    ] as [React.ComponentType<{ size?: number }>, string, (() => void) | null][]
                  ).map(([ActionIcon, label, onClick]) => (
                    <button
                      key={label}
                      onClick={onClick || undefined}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "6px 8px",
                        background: label === "Compare" && compareMode ? "#EBF5B0" : "#F9FAFB",
                        border: `1px solid ${label === "Compare" && compareMode ? "#B8D935" : "#E5E7EB"}`,
                        borderRadius: 7,
                        cursor: "pointer",
                        fontSize: 10,
                        fontWeight: label === "Compare" && compareMode ? 700 : 500,
                        color: label === "Compare" && compareMode ? "#1B4D3E" : "#374151",
                        fontFamily: "Inter,sans-serif",
                        transition: "all .15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#1B4D3E";
                        e.currentTarget.style.color = "#1B4D3E";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = label === "Compare" && compareMode ? "#B8D935" : "#E5E7EB";
                        e.currentTarget.style.color = label === "Compare" && compareMode ? "#1B4D3E" : "#374151";
                      }}
                    >
                      <ActionIcon size={11} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ margin: "0 12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>Key Ventures</span>
                <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{s.totalV} total</span>
              </div>
              {[
                ...(s.t1 || []).slice(0, 3).map((v) => ({ ...v, t: 1 })),
                ...(s.t2 || []).slice(0, 1).map((v) => ({ ...v, t: 2 })),
                ...(s.t3 || []).slice(0, 1).map((v) => ({ ...v, t: 3 })),
              ].map((v, i) => {
                const VIcon = ventureIcon(v.name);
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "7px 8px",
                      borderRadius: 8,
                      marginBottom: 3,
                      cursor: "pointer",
                      transition: "background .1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 7,
                        background: "rgba(27,77,62,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <VIcon size={13} color="#2E5A4D" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#111827",
                          fontFamily: "Inter,sans-serif",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {v.name}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                        <TierB t={v.t} />
                        <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>
                          {v.irr} IRR
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={11} color="#6B7280" />
                  </div>
                );
              })}
            </div>
            <div style={{ margin: "0 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>Sector Intelligence</span>
                <select
                  style={{
                    fontSize: 10,
                    color: "#6B7280",
                    border: "1px solid #E5E7EB",
                    borderRadius: 5,
                    padding: "2px 5px",
                    background: "#fff",
                    cursor: "pointer",
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  <option>Mar 2026</option>
                  <option>Feb 2026</option>
                </select>
              </div>
              {s.activity.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 9,
                    padding: "9px 9px",
                    borderRadius: 8,
                    marginBottom: 4,
                    background: "#FAFAFA",
                    border: "1px solid #E5E7EB",
                    cursor: "pointer",
                    transition: "border-color .15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1B4D3E")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 7,
                      background: "#F3F4F6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 11,
                      color: sigCol(a.sig),
                      fontWeight: 700,
                    }}
                  >
                    {a.sig === "Bullish" ? "↑" : a.sig === "Bearish" ? "↓" : "→"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#111827", lineHeight: 1.3, marginBottom: 2 }}>
                      {a.h}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontSize: 9, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                      <span
                        style={{ fontSize: 9, fontWeight: 700, color: sigCol(a.sig), fontFamily: "Inter,sans-serif" }}
                      >
                        {a.sig}
                      </span>
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: 10,
                          fontWeight: 700,
                          color: sigCol(a.sig),
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {a.amt}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ margin: "14px 12px 0" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginBottom: 7 }}>Cross-Sector Links</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.cross.map((cid, i) => {
                  const found = SECTORS.find((sec) => sec.id === cid);
                  if (!found) return null;
                  const Icon = found.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => setS(found)}
                      title={found.full}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        border: "1px solid #E5E7EB",
                        background: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all .15s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#EBF5B0";
                        e.currentTarget.style.borderColor = "#B8D935";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.borderColor = "#E5E7EB";
                      }}
                    >
                      <Icon size={14} color="#1B4D3E" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Status Bar */}
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
          {[
            ["12 Sectors", ""],
            ["174 Ventures", ""],
            [`Active: ${s.full}`, ""],
            ["Data: Mar 2026", ""],
          ].map(([label], i) => (
            <>
              <span
                key={`d${i}`}
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
                key={`l${i}`}
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  marginRight: 14,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {label}
              </span>
            </>
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

export default function BridgeDashboard() {
  const [isMobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [searchParams] = useSearchParams();
  const [s, setS] = useState(() => {
    const id = searchParams.get("sector");
    return SECTORS.find(sec => sec.id === id) || SECTORS[0];
  });

  useEffect(() => {
    const id = searchParams.get("sector");
    if (id) {
      const found = SECTORS.find(sec => sec.id === id);
      if (found) setS(found);
    }
  }, [searchParams]);

  useState(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  });
  if (isMobile) return <MobileDashboard s={s} setS={setS} />;
  return <DesktopDashboard />;
}
