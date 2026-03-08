import { useState, useEffect } from "react";
import {
  Wallet,
  Cross,
  Cpu,
  Sprout,
  BatteryCharging,
  Blocks,
  GraduationCap,
  Home,
  Factory,
  Truck,
  Luggage,
  Camera,
  Bell,
  Search,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Plus,
  X,
  Activity,
  FileText,
  Eye,
  Share2,
  AlertTriangle,
  Zap,
  LayoutGrid,
  LayoutDashboard,
  Clock,
  Book,
  BookOpen,
  Bookmark,
  Settings,
  ArrowUpRight,
  LogOut,
  LineChart,
  FileBarChart,
} from "lucide-react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  AreaChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
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
  blue: "#0EA5E9",
  orange: "#F59E0B",
};

// Neutral grey — single consistent style for all sector icons & tags
const GREY = { icon: "#6B7280", bg: "#F3F4F6" };

// Sector SVG icons (custom, matches BRIDGE design system)
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

// Map svgIcon onto each sector by id
const SVG_MAP = {
  agriculture: sectorSvgIcons[5],
  financial: sectorSvgIcons[1],
  technology: sectorSvgIcons[3],
  energy: sectorSvgIcons[9],
  infrastructure: sectorSvgIcons[0],
  education: sectorSvgIcons[4],
  health: sectorSvgIcons[2],
  housing: sectorSvgIcons[7],
  manufacturing: sectorSvgIcons[10],
  transportation: sectorSvgIcons[11],
  tourism: sectorSvgIcons[8],
  creative: sectorSvgIcons[6],
};

const SECTORS = [
  {
    id: "agriculture",
    icon: Sprout,
    short: "Agriculture",
    full: "Agriculture & Value Chains",
    score: 90,
    capLow: 12,
    capHigh: 22,
    subSectors: [{ name: "Processing" }, { name: "Cold Chain" }, { name: "Aggregation" }, { name: "AgTech" }],
    keyPlayers: [
      {
        name: "Cocoa Processing Co.",
        ticker: "CPC",
        score: 88,
        signal: "Bullish",
        cap: "$2.1B",
        change: "+4.2%",
        role: "Processor",
      },
      {
        name: "AgriTech Ghana",
        ticker: "ATG",
        score: 81,
        signal: "Bullish",
        cap: "$840M",
        change: "+1.8%",
        role: "Technology",
      },
      {
        name: "Northern Farms Ltd",
        ticker: "NFL",
        score: 73,
        signal: "Watch",
        cap: "$310M",
        change: "-0.4%",
        role: "Aggregator",
      },
    ],
    activity: [
      { h: "Post-Harvest Loss Crisis Brief Published", amt: "+$2M", sig: "Bullish", date: "Feb 2026", cat: "Policy" },
      { h: "GH 4.5B PFJ Phase 3 Budget Confirmed", amt: "+Policy", sig: "Bullish", date: "Mar 2026", cat: "Policy" },
      { h: "2024 Drought — 436k Farmers Affected", amt: "Risk", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "Cocoa Exports Hit $372.6M", amt: "+$372M", sig: "Bullish", date: "Jan 2026", cat: "Earnings" },
    ],
  },
  {
    id: "financial",
    icon: Wallet,
    short: "Financial Inclusion",
    full: "Financial Inclusion",
    score: 91,
    capLow: 10,
    capHigh: 20,
    subSectors: [{ name: "Lending" }, { name: "Mobile Money" }, { name: "Insurance" }, { name: "Susu" }],
    keyPlayers: [
      {
        name: "Fidelity Bank Ghana",
        ticker: "FBG",
        score: 91,
        signal: "Bullish",
        cap: "$1.4B",
        change: "+6.1%",
        role: "Banking",
      },
      {
        name: "MTN MoMo",
        ticker: "MTN",
        score: 88,
        signal: "Bullish",
        cap: "$3.2B",
        change: "+3.5%",
        role: "Mobile Money",
      },
      {
        name: "Stanbic IBTC",
        ticker: "SIB",
        score: 76,
        signal: "Watch",
        cap: "$620M",
        change: "+0.9%",
        role: "Banking",
      },
    ],
    activity: [
      { h: "Bank of Ghana Digital Credit Directive", amt: "+Policy", sig: "Bullish", date: "Mar 2026", cat: "Policy" },
      { h: "MoMo Interoperability Live", amt: "+Access", sig: "Bullish", date: "Jan 2026", cat: "Launch" },
      { h: "SME Financing Gap Widens to $2.2B", amt: "$2.2B", sig: "Watch", date: "Feb 2026", cat: "Risk" },
      { h: "Ghana Ranked #1 GSMA MoMo Index", amt: "95.06", sig: "Bullish", date: "Nov 2025", cat: "Rankings" },
    ],
  },
  {
    id: "technology",
    icon: Cpu,
    short: "Technology",
    full: "Technology & Innovation",
    score: 89,
    capLow: 8,
    capHigh: 15,
    subSectors: [{ name: "Platform" }, { name: "VC/Fund" }, { name: "Talent" }, { name: "FinTech" }],
    keyPlayers: [
      {
        name: "Hubtel Ghana",
        ticker: "HBT",
        score: 89,
        signal: "Bullish",
        cap: "$950M",
        change: "+8.4%",
        role: "Platform",
      },
      {
        name: "mPharma",
        ticker: "MPH",
        score: 82,
        signal: "Bullish",
        cap: "$520M",
        change: "+3.2%",
        role: "HealthTech",
      },
      { name: "Zeepay", ticker: "ZPY", score: 77, signal: "Watch", cap: "$280M", change: "+1.1%", role: "FinTech" },
    ],
    activity: [
      { h: "Kejetia Phase 2 — 3,000 New Vendors", amt: "+3k", sig: "Bullish", date: "Mar 2026", cat: "Launch" },
      { h: "Ghana Joins Smart Africa Alliance", amt: "+Policy", sig: "Bullish", date: "Feb 2026", cat: "Policy" },
      { h: "Series A Desert — Only 2 Deals", amt: "-", sig: "Watch", date: "Jan 2026", cat: "Investment" },
      { h: "Ghana Leads West Africa Funding", amt: "+28%", sig: "Bullish", date: "Dec 2025", cat: "Funding" },
    ],
  },
  {
    id: "energy",
    icon: BatteryCharging,
    short: "Energy",
    full: "Energy & Renewables",
    score: 88,
    capLow: 12,
    capHigh: 22,
    subSectors: [{ name: "Solar" }, { name: "Clean Cooking" }, { name: "Mini-Grid" }, { name: "Training" }],
    keyPlayers: [
      {
        name: "BXC Solar Ghana",
        ticker: "BXC",
        score: 88,
        signal: "Bullish",
        cap: "$1.1B",
        change: "+5.6%",
        role: "Solar",
      },
      {
        name: "Energy Access Fund",
        ticker: "EAF",
        score: 80,
        signal: "Bullish",
        cap: "$440M",
        change: "+2.2%",
        role: "Finance",
      },
      { name: "GridCo Ghana", ticker: "GCG", score: 71, signal: "Watch", cap: "$890M", change: "-1.4%", role: "Grid" },
    ],
    activity: [
      { h: "Solar Park: 200MW to 1GW Expansion", amt: "+800MW", sig: "Bullish", date: "Mar 2026", cat: "Expansion" },
      { h: "$200M Clean Cooking Outcome Bond", amt: "$200M", sig: "Bullish", date: "Feb 2026", cat: "Finance" },
      { h: "Dumsor Returns — Business Losses", amt: "-$900M", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "Solar Costs Down 89% Since 2010", amt: "-89%", sig: "Bullish", date: "Dec 2025", cat: "Market" },
    ],
  },
  {
    id: "health",
    icon: Cross,
    short: "Health Systems",
    full: "Health Systems & Wellbeing",
    score: 83,
    capLow: 8,
    capHigh: 16,
    subSectors: [
      { name: "Primary Care" },
      { name: "Supply Chain" },
      { name: "Digital Health" },
      { name: "Diagnostics" },
    ],
    keyPlayers: [
      {
        name: "Tobinco Pharma",
        ticker: "TBP",
        score: 83,
        signal: "Bullish",
        cap: "$620M",
        change: "+3.8%",
        role: "Pharma",
      },
      {
        name: "mPharma Dist.",
        ticker: "MPD",
        score: 79,
        signal: "Bullish",
        cap: "$340M",
        change: "+2.1%",
        role: "Distribution",
      },
      {
        name: "NHIA Digital",
        ticker: "NHD",
        score: 74,
        signal: "Watch",
        cap: "$180M",
        change: "+0.6%",
        role: "InsurTech",
      },
    ],
    activity: [
      { h: "NHIA Expands Digital Claims Processing", amt: "+Access", sig: "Bullish", date: "Feb 2026", cat: "Digital" },
      { h: "GH 8.2B Health Allocation +12% YoY", amt: "+12%", sig: "Bullish", date: "Mar 2026", cat: "Budget" },
      { h: "Workforce Gap: 40k Workers Needed", amt: "-40k", sig: "Watch", date: "Jan 2026", cat: "Risk" },
    ],
  },
  {
    id: "infrastructure",
    icon: Blocks,
    short: "Infrastructure",
    full: "Infrastructure & Basic Services",
    score: 87,
    capLow: 18,
    capHigh: 32,
    subSectors: [{ name: "Roads" }, { name: "Water" }, { name: "Sanitation" }, { name: "Digital Infra" }],
    keyPlayers: [
      {
        name: "Ghana Highways Auth.",
        ticker: "GHA",
        score: 82,
        signal: "Bullish",
        cap: "$2.4B",
        change: "+2.1%",
        role: "Roads",
      },
      {
        name: "Ghana Water Co.",
        ticker: "GWC",
        score: 76,
        signal: "Watch",
        cap: "$1.1B",
        change: "+0.8%",
        role: "Water",
      },
      {
        name: "Huawei Ghana",
        ticker: "HWG",
        score: 84,
        signal: "Bullish",
        cap: "$3.2B",
        change: "+4.5%",
        role: "Digital",
      },
    ],
    activity: [
      { h: "2026 Budget: GH¢ 14.8B Infra Allocation", amt: "+14.8B", sig: "Bullish", date: "Mar 2026", cat: "Budget" },
      { h: "Lagos–Accra Highway Phase 2 Approved", amt: "+Policy", sig: "Bullish", date: "Feb 2026", cat: "Policy" },
      { h: "Water Coverage Still 54% in Rural North", amt: "54%", sig: "Watch", date: "Jan 2026", cat: "Risk" },
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    short: "Education",
    full: "Education & Skills Development",
    score: 85,
    capLow: 10,
    capHigh: 18,
    subSectors: [{ name: "TVET" }, { name: "EdTech" }, { name: "Higher Ed" }, { name: "Early Childhood" }],
    keyPlayers: [
      {
        name: "University of Ghana",
        ticker: "UOG",
        score: 85,
        signal: "Bullish",
        cap: "$890M",
        change: "+1.4%",
        role: "Higher Ed",
      },
      {
        name: "Eneza Education",
        ticker: "ENZ",
        score: 80,
        signal: "Bullish",
        cap: "$210M",
        change: "+5.1%",
        role: "EdTech",
      },
      { name: "COTVET Ghana", ticker: "CVT", score: 72, signal: "Watch", cap: "$140M", change: "+0.3%", role: "TVET" },
    ],
    activity: [
      { h: "Free SHS Enrollment Hits 1.2M Students", amt: "1.2M", sig: "Bullish", date: "Feb 2026", cat: "Access" },
      { h: "TVET Enrollment Up 34% YoY", amt: "+34%", sig: "Bullish", date: "Mar 2026", cat: "Skills" },
      { h: "Teacher Shortage: 25k Positions Unfilled", amt: "-25k", sig: "Watch", date: "Jan 2026", cat: "Risk" },
    ],
  },
  {
    id: "housing",
    icon: Home,
    short: "Housing",
    full: "Housing & Real Estate",
    score: 82,
    capLow: 14,
    capHigh: 24,
    subSectors: [{ name: "Affordable Housing" }, { name: "Commercial" }, { name: "PropTech" }, { name: "Mortgage" }],
    keyPlayers: [
      {
        name: "Regimanuel Gray",
        ticker: "RGG",
        score: 82,
        signal: "Bullish",
        cap: "$560M",
        change: "+3.2%",
        role: "Developer",
      },
      {
        name: "Ghana Home Loans",
        ticker: "GHL",
        score: 77,
        signal: "Bullish",
        cap: "$320M",
        change: "+2.0%",
        role: "Mortgage",
      },
      {
        name: "Devtraco Plus",
        ticker: "DVT",
        score: 74,
        signal: "Watch",
        cap: "$410M",
        change: "+0.7%",
        role: "Developer",
      },
    ],
    activity: [
      { h: "National Housing Fund: GH¢ 2B Committed", amt: "GH¢ 2B", sig: "Bullish", date: "Mar 2026", cat: "Finance" },
      { h: "Accra Housing Deficit Narrows to 1.7M Units", amt: "1.7M", sig: "Watch", date: "Feb 2026", cat: "Market" },
      { h: "PropTech Adoption Up 41% Among Developers", amt: "+41%", sig: "Bullish", date: "Jan 2026", cat: "Digital" },
    ],
  },
  {
    id: "manufacturing",
    icon: Factory,
    short: "Manufacturing",
    full: "Manufacturing & Light Industry",
    score: 81,
    capLow: 12,
    capHigh: 20,
    subSectors: [{ name: "Food Processing" }, { name: "Textiles" }, { name: "Pharmaceuticals" }, { name: "Packaging" }],
    keyPlayers: [
      {
        name: "Accra Brewery Ltd",
        ticker: "ABL",
        score: 81,
        signal: "Bullish",
        cap: "$740M",
        change: "+2.8%",
        role: "Beverages",
      },
      {
        name: "Kasapreko Co.",
        ticker: "KAS",
        score: 78,
        signal: "Bullish",
        cap: "$480M",
        change: "+3.6%",
        role: "FMCG",
      },
      {
        name: "Poly Products",
        ticker: "PPG",
        score: 69,
        signal: "Watch",
        cap: "$190M",
        change: "-0.5%",
        role: "Packaging",
      },
    ],
    activity: [
      { h: "1D1F: 106 Factories Now Operational", amt: "106", sig: "Bullish", date: "Mar 2026", cat: "Policy" },
      { h: "AfCFTA Opens $28B West Africa Market", amt: "$28B", sig: "Bullish", date: "Feb 2026", cat: "Trade" },
      { h: "Energy Costs Squeeze Margins by 18%", amt: "-18%", sig: "Watch", date: "Jan 2026", cat: "Risk" },
    ],
  },
  {
    id: "transportation",
    icon: Truck,
    short: "Transportation",
    full: "Transportation & Logistics",
    score: 79,
    capLow: 10,
    capHigh: 18,
    subSectors: [{ name: "Road Freight" }, { name: "Ports" }, { name: "Last-Mile" }, { name: "Air Cargo" }],
    keyPlayers: [
      {
        name: "Ghana Ports & Harbours",
        ticker: "GPH",
        score: 84,
        signal: "Bullish",
        cap: "$1.8B",
        change: "+3.1%",
        role: "Ports",
      },
      {
        name: "Freight In Time",
        ticker: "FIT",
        score: 76,
        signal: "Watch",
        cap: "$240M",
        change: "+1.2%",
        role: "Logistics",
      },
      {
        name: "Liqo App",
        ticker: "LQO",
        score: 72,
        signal: "Bullish",
        cap: "$85M",
        change: "+7.4%",
        role: "Last-Mile",
      },
    ],
    activity: [
      { h: "Tema Port Expansion: $1.5B Phase 3", amt: "$1.5B", sig: "Bullish", date: "Mar 2026", cat: "Expansion" },
      {
        h: "E-Freight System Live at All Border Posts",
        amt: "+Policy",
        sig: "Bullish",
        date: "Feb 2026",
        cat: "Digital",
      },
      { h: "Road Infrastructure Gap Costs $320M/yr", amt: "-$320M", sig: "Watch", date: "Jan 2026", cat: "Risk" },
    ],
  },
  {
    id: "tourism",
    icon: Luggage,
    short: "Tourism",
    full: "Tourism & Hospitality",
    score: 76,
    capLow: 8,
    capHigh: 15,
    subSectors: [{ name: "Eco-Tourism" }, { name: "Heritage" }, { name: "Hotels" }, { name: "MICE" }],
    keyPlayers: [
      {
        name: "Kempinski Gold Coast",
        ticker: "KGC",
        score: 80,
        signal: "Bullish",
        cap: "$420M",
        change: "+4.2%",
        role: "Hospitality",
      },
      {
        name: "Ghana Tourism Auth.",
        ticker: "GTA",
        score: 74,
        signal: "Bullish",
        cap: "$180M",
        change: "+2.8%",
        role: "Authority",
      },
      {
        name: "Accra City Hotel",
        ticker: "ACH",
        score: 68,
        signal: "Watch",
        cap: "$95M",
        change: "-1.1%",
        role: "Hotel",
      },
    ],
    activity: [
      { h: "Year of Return II Drives 1.2M Arrivals", amt: "1.2M", sig: "Bullish", date: "Feb 2026", cat: "Tourism" },
      {
        h: "$500M Tourism Infrastructure Fund Approved",
        amt: "$500M",
        sig: "Bullish",
        date: "Mar 2026",
        cat: "Finance",
      },
      { h: "Hospitality Workforce Gap: 18k Workers", amt: "-18k", sig: "Watch", date: "Jan 2026", cat: "Risk" },
    ],
  },
  {
    id: "creative",
    icon: Camera,
    short: "Creative Industries",
    full: "Sports, Entertainment & Creative",
    score: 78,
    capLow: 6,
    capHigh: 12,
    subSectors: [{ name: "Music" }, { name: "Film" }, { name: "Sports" }, { name: "Gaming" }],
    keyPlayers: [
      {
        name: "EIB Network",
        ticker: "EIB",
        score: 78,
        signal: "Bullish",
        cap: "$210M",
        change: "+5.8%",
        role: "Media",
      },
      {
        name: "Mediawan Africa",
        ticker: "MWA",
        score: 74,
        signal: "Bullish",
        cap: "$340M",
        change: "+3.3%",
        role: "Film",
      },
      { name: "Ghana FA", ticker: "GFA", score: 70, signal: "Watch", cap: "$160M", change: "+0.9%", role: "Sports" },
    ],
    activity: [
      { h: "Afrobeats Exports: $2.1B Global Revenue", amt: "$2.1B", sig: "Bullish", date: "Feb 2026", cat: "Music" },
      { h: "Nollywood–Ghana Co-Production Fund $80M", amt: "$80M", sig: "Bullish", date: "Mar 2026", cat: "Film" },
      { h: "IP Protection Enforcement Still Weak", amt: "Risk", sig: "Watch", date: "Jan 2026", cat: "Legal" },
    ],
  },
];
// Attach svgIcon to each sector
SECTORS.forEach((s) => {
  s.svgIcon = SVG_MAP[s.id];
});

const TABS = ["Overview", "Analyze", "Topics", "Signals", "Key Players", "Competitors"];
const sigCol = (s) => (s === "Bullish" ? C.green : s === "Watch" ? C.yellow : C.red);
const sigBg = (s) => (s === "Bullish" ? "#DCFCE7" : s === "Watch" ? "#FEF9C3" : "#FEE2E2");
const scoreColor = (n) => (n >= 75 ? C.green : n >= 50 ? C.orange : n >= 25 ? C.blue : C.red);
const pal = () => GREY;

function buildItems() {
  const items = [];
  SECTORS.forEach((sec) => {
    items.push({
      id: `sector-${sec.id}`,
      type: "sector",
      name: sec.full,
      sector: sec.short,
      subSector: sec.subSectors[0]?.name || "General",
      category: "Sector",
      score: sec.score,
      signal: sec.score >= 82 ? "Bullish" : "Watch",
      sectorObj: sec,
    });
    sec.keyPlayers.forEach((p, i) =>
      items.push({
        id: `player-${sec.id}-${i}`,
        type: "company",
        name: p.name,
        sector: sec.short,
        subSector: sec.subSectors[i % sec.subSectors.length]?.name || "General",
        category: p.role,
        score: p.score,
        signal: p.signal,
        ticker: p.ticker,
        cap: p.cap,
        change: p.change,
        sectorObj: sec,
      }),
    );
  });
  return items;
}
const ALL = buildItems();

function MiniDonut({ score, size = 40, stroke = 4 }) {
  const r = (size - stroke * 2) / 2,
    circ = 2 * Math.PI * r,
    pct = Math.max(0, Math.min(100, score)),
    col = scoreColor(pct);
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F0F0F0" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={col}
        strokeWidth={stroke}
        strokeDasharray={`${(circ * pct) / 100} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2 + 3.5}
        textAnchor="middle"
        fontSize={size < 36 ? 9 : 10}
        fontWeight={700}
        fill={C.dark}
        fontFamily="Inter,sans-serif"
      >
        {score}
      </text>
    </svg>
  );
}

function Card({ children, style: ex = {} }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        ...ex,
      }}
    >
      {children}
    </div>
  );
}

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#111827", color: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 11 }}>
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3434.33 932.3"
      style={{ width: 104, height: 28, display: "block" }}
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
  );
}

function Sidebar({ collapsed, setCollapsed, active, setActive }) {
  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: (c) => <LayoutGrid size={16} color={c} /> },
    { id: "overview", label: "Market Overview", icon: (c) => <Activity size={16} color={c} /> },
    { id: "analytics", label: "Analytics", icon: (c) => <BarChart3 size={16} color={c} /> },
    { id: "watchlist", label: "Watchlist", icon: (c) => <Eye size={16} color={c} />, active: true },
    { id: "reports", label: "Reports", icon: (c) => <FileBarChart size={16} color={c} /> },
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
      {/* Logo zone */}
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

      {/* Nav zone */}
      <div style={{ padding: "10px 8px", flexShrink: 0 }}>
        {NAV.map((n) => {
          const act = n.active;
          return (
            <div
              key={n.id}
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

      {/* Sector zone */}
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
          const act = active.id === s.id;
          return (
            <div
              key={s.id}
              onClick={() => setActive(s)}
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
                      color: act ? C.accent : s.score >= 88 ? "rgba(184,217,53,0.6)" : "rgba(255,255,255,0.25)",
                      fontFamily: "Inter,sans-serif",
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

      {/* Exit Dashboard — expanded only */}
      {!collapsed && (
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
      )}
      {collapsed && (
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

      {/* Upgrade card — expanded only */}
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

function LeftPanel({ sector, selId, setSelId, tab, setTab }) {
  const [sort, setSort] = useState("score-high");
  const [q, setQ] = useState("");
  const sectorItems = ALL.filter((i) => i.sectorObj.id === sector.id);
  const listedCount = sectorItems.filter((i) => i.type === "company").length;
  const secCount = sectorItems.filter((i) => i.type === "sector").length;
  const items = sectorItems
    .filter((i) => (tab === "listed" ? i.type === "company" : i.type === "sector"))
    .filter((i) => !q || i.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) =>
      sort === "score-high"
        ? b.score - a.score
        : sort === "score-low"
          ? a.score - b.score
          : a.name.localeCompare(b.name),
    );

  return (
    <div
      style={{
        width: 318,
        flexShrink: 0,
        background: "#fff",
        borderRight: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ padding: "12px 12px 10px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", gap: 0, marginBottom: 10, background: "#F3F5F2", borderRadius: 8, padding: 3 }}>
          {[
            ["listed", `Listed (${listedCount})`],
            ["sectors", `Sectors (${secCount})`],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                flex: 1,
                padding: "5px 0",
                border: "none",
                borderRadius: 6,
                background: tab === id ? "#fff" : "transparent",
                fontSize: 11,
                fontWeight: tab === id ? 700 : 500,
                color: tab === id ? C.dark : C.muted,
                cursor: "pointer",
                boxShadow: tab === id ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#F9FAFB",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            padding: "6px 10px",
            marginBottom: 8,
          }}
        >
          <Search size={11} color={C.muted} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            style={{ background: "none", border: "none", outline: "none", fontSize: 11, color: C.mid, width: "100%" }}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            width: "100%",
            padding: "5px 8px",
            border: "1px solid #E5E7EB",
            borderRadius: 7,
            fontSize: 10,
            color: C.mid,
            background: "#fff",
            cursor: "pointer",
          }}
        >
          <option value="score-high">Highest Score</option>
          <option value="score-low">Lowest Score</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
        {items.map((item) => {
          const sel = selId === item.id;
          const sec = item.sectorObj;
          return (
            <div
              key={item.id}
              onClick={() => setSelId(item.id)}
              style={{
                padding: "12px 11px",
                borderRadius: 11,
                marginBottom: 5,
                cursor: "pointer",
                background: sel ? "#fff" : "transparent",
                border: `1px solid ${sel ? "#E5E7EB" : "transparent"}`,
                borderLeft: `3px solid ${sel ? C.accent : "transparent"}`,
                boxShadow: sel ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
              }}
            >
              <div style={{ fontSize: 9, color: C.muted, marginBottom: 8, letterSpacing: ".1px" }}>
                {item.sector} · {item.subSector}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: "#F3F4F6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <sec.icon size={19} color={C.muted} strokeWidth={1.5} />
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.dark,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                <MiniDonut score={item.score} size={36} stroke={3} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                  {item.category}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: sigCol(item.signal) }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: sigCol(item.signal) }}>{item.signal}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "10px 12px", borderTop: "1px solid #F3F4F6" }}>
        <button
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: 9,
            border: `1px solid ${C.accent}`,
            background: C.accentBg,
            fontSize: 12,
            fontWeight: 700,
            color: C.primary,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Plus size={12} /> Add to Watchlist
        </button>
      </div>
    </div>
  );
}

function OverviewTab({ item }) {
  const [exp, setExp] = useState(null),
    [tr, setTr] = useState("5Y");
  const sec = item.sectorObj;
  const yrs =
    tr === "1M"
      ? ["W1", "W2", "W3", "W4"]
      : tr === "6M"
        ? ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"]
        : tr === "YTD"
          ? ["Jan", "Feb", "Mar"]
          : ["2021", "2022", "2023", "2024", "2025"];
  const gv = (i, j) => Math.round(15 + Math.sin(i * 1.2 + j * 0.7) * 10 + j * 2);
  const gc = (i, j) => {
    const v = (Math.sin(i * 0.8 + j * 1.1) * 3).toFixed(2);
    return v > 0 ? `+${v}` : `${v}`;
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
          {["1M", "6M", "YTD", "5Y", "All"].map((t) => (
            <button
              key={t}
              onClick={() => setTr(t)}
              style={{
                padding: "3px 8px",
                borderRadius: 5,
                border: "none",
                background: tr === t ? "#fff" : "transparent",
                fontSize: 10,
                fontWeight: 600,
                color: tr === t ? C.primary : C.muted,
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #E5E7EB" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              <th
                style={{
                  padding: "8px 12px",
                  textAlign: "left",
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.muted,
                  minWidth: 160,
                }}
              >
                Entity
              </th>
              {yrs.map((y) => (
                <th
                  key={y}
                  style={{
                    padding: "8px 12px",
                    textAlign: "right",
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.muted,
                    minWidth: 80,
                  }}
                >
                  {y}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sec.keyPlayers.map((ent, i) => {
              const expanded = exp === i;
              return (
                <>
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? "#fff" : "#FAFAFA",
                      borderBottom: "1px solid #F3F4F6",
                      cursor: "pointer",
                    }}
                    onClick={() => setExp(expanded ? null : i)}
                  >
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>{expanded ? "▼" : "▶"}</span>
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
                          }}
                        >
                          <sec.icon size={12} color={C.muted} strokeWidth={1.5} />
                        </div>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{ent.name}</div>
                          <div style={{ fontSize: 9, color: C.muted }}>{ent.ticker}</div>
                        </div>
                      </div>
                    </td>
                    {yrs.map((y, j) => {
                      const val = gv(i, j),
                        chg = gc(i, j),
                        up = chg.startsWith("+");
                      return (
                        <td key={y} style={{ padding: "10px 12px", textAlign: "right" }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{val}%</span>
                          <span style={{ fontSize: 10, color: up ? C.green : C.red, marginLeft: 4 }}>{chg}</span>
                        </td>
                      );
                    })}
                  </tr>
                  {expanded && (
                    <tr key={`x${i}`}>
                      <td colSpan={yrs.length + 1} style={{ padding: 0, borderBottom: "1px solid #E5E7EB" }}>
                        <div style={{ padding: "14px 16px", borderTop: `2px solid ${C.accent}` }}>
                          <div
                            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}
                          >
                            {[
                              { l: "Total Amount", v: "$525,977", bc: C.accent },
                              { l: "Open Amount", v: "$7,237,530", bc: C.orange },
                              { l: "V.A.T", v: "$149,973", bc: C.blue },
                              { l: "Costs", v: "$963", bc: C.muted },
                            ].map((s, k) => (
                              <div
                                key={k}
                                style={{
                                  padding: "10px 12px",
                                  background: "#fff",
                                  borderRadius: 8,
                                  border: "1px solid #F3F4F6",
                                  borderLeft: `3px solid ${s.bc}`,
                                }}
                              >
                                <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{s.v}</div>
                                <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{s.l}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div>
                              <div
                                style={{
                                  fontSize: 9,
                                  fontWeight: 700,
                                  color: C.muted,
                                  textTransform: "uppercase",
                                  letterSpacing: ".5px",
                                  marginBottom: 4,
                                }}
                              >
                                Description
                              </div>
                              <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.6 }}>
                                A leading player in Ghana's {sec.short} sector, driving growth through innovation and
                                strategic partnerships.
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: 9,
                                  fontWeight: 700,
                                  color: C.muted,
                                  textTransform: "uppercase",
                                  letterSpacing: ".5px",
                                  marginBottom: 4,
                                }}
                              >
                                Address
                              </div>
                              <div
                                style={{
                                  fontSize: 11,
                                  color: C.mid,
                                  lineHeight: 1.6,
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 5,
                                }}
                              >
                                <MapPin size={10} color={C.muted} style={{ marginTop: 2, flexShrink: 0 }} />
                                Accra Business District, Ring Road Central, Accra, Ghana
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyzeTab({ item }) {
  const sec = item.sectorObj;
  const data = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"].map((m, i) => ({
    month: m,
    share: Math.round(sec.score * (0.75 + Math.sin(i * 0.8) * 0.12 + i * 0.03)),
    revenue: Math.round(sec.capHigh * 80 + Math.sin(i * 1.1) * sec.capHigh * 20),
    growth: Math.round(8 + Math.sin(i * 0.9) * 6),
  }));
  const spark = (base, amp) =>
    ["Q1", "Q2", "Q3", "Q4"].map((q, i) => ({ q, v: Math.round(base + Math.sin(i * 1.3) * amp) }));
  return (
    <div>
      <div
        style={{
          height: 210,
          marginBottom: 14,
          borderRadius: 10,
          border: "1px solid #E5E7EB",
          padding: "12px 10px 8px",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 8 }}>
          Performance Analysis — {sec.short}
        </div>
        <ResponsiveContainer width="100%" height="85%">
          <ComposedChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <Tooltip content={<Tip />} />
            <Area
              type="monotone"
              dataKey="share"
              fill={`${C.teal}22`}
              stroke={C.teal}
              strokeWidth={2}
              name="Market Share"
            />
            <Bar dataKey="revenue" fill={`${C.teal}33`} radius={[2, 2, 0, 0]} name="Revenue" barSize={10} />
            <Line
              type="monotone"
              dataKey="growth"
              stroke={C.orange}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: C.orange }}
              name="Growth"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {[
          { t: "Revenue Trend", c: "+12.4% QoQ", d: spark(sec.capHigh * 90, sec.capHigh * 15), col: C.teal },
          {
            t: "Score History",
            c: `${Math.round(sec.score * 0.8)} → ${sec.score}`,
            d: spark(sec.score * 0.85, sec.score * 0.1),
            col: C.teal,
          },
          {
            t: "Signal Freq.",
            c: `${sec.activity.filter((a) => a.sig === "Bullish").length * 21} Bull`,
            d: spark(50, 20),
            col: C.orange,
          },
        ].map((card, i) => (
          <Card key={i} style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dark, marginBottom: 6 }}>{card.t}</div>
            <div style={{ height: 48 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={card.d} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                  <Area
                    type="monotone"
                    dataKey="v"
                    fill={`${card.col}22`}
                    stroke={card.col}
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ fontSize: 10, color: C.green, marginTop: 4, fontWeight: 600 }}>{card.c}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TopicsTab({ item }) {
  const sec = item.sectorObj;
  const tags = [
    "Market Growth",
    "Policy Support",
    "Digital Adoption",
    "Value Chain",
    "Climate Risk",
    "Foreign Investment",
  ];
  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.muted,
            textTransform: "uppercase",
            letterSpacing: ".5px",
            marginBottom: 8,
          }}
        >
          Trending Topics
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tags.map((t, i) => (
            <span
              key={i}
              style={{
                padding: "4px 11px",
                borderRadius: 20,
                background: "#F3F4F6",
                fontSize: 11,
                fontWeight: 600,
                color: C.mid,
                cursor: "pointer",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.muted,
            textTransform: "uppercase",
            letterSpacing: ".5px",
            marginBottom: 8,
          }}
        >
          Recent Intelligence
        </div>
        {sec.activity.map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              background: "#fff",
              borderRadius: 9,
              border: "1px solid #F3F4F6",
              marginBottom: 5,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: sigBg(a.sig),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: sigCol(a.sig) }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.dark,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {a.h}
              </div>
              <div style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>
                {a.cat} · {a.date}
              </div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: sigCol(a.sig), whiteSpace: "nowrap" }}>{a.amt}</span>
          </div>
        ))}
      </div>
      <Card style={{ padding: "14px 16px", background: "linear-gradient(135deg,#F9FAFB,#FAFAFA)" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "#F3F4F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Zap size={14} color={C.muted} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 4 }}>BRIDGE AI Summary</div>
            <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>
              <strong style={{ color: C.dark }}>{item.name}</strong> shows strong momentum with{" "}
              {sec.activity.filter((a) => a.sig === "Bullish").length} bullish signals. Score:{" "}
              <strong style={{ color: C.green }}>{sec.score}/100</strong>.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SignalsTab({ item }) {
  const sec = item.sectorObj;
  const bull = sec.activity.filter((a) => a.sig === "Bullish").length;
  const watch = sec.activity.filter((a) => a.sig === "Watch").length;
  const all = [...sec.activity, ...sec.activity.map((a, i) => ({ ...a, date: i === 0 ? "Jan 2026" : "Dec 2025" }))];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[
          { l: "Bullish", v: bull * 21, col: C.green, bg: "#DCFCE7" },
          { l: "Watch", v: watch * 9, col: C.yellow, bg: "#FEF9C3" },
          { l: "Neutral", v: sec.activity.length * 5, col: C.muted, bg: "#F3F4F6" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 9,
              background: s.bg,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: s.col }} />
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, letterSpacing: "-1px", lineHeight: 1 }}>
                {s.v}
              </div>
              <div style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>{s.l}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "relative", paddingLeft: 20 }}>
        <div
          style={{ position: "absolute", left: 7, top: 8, bottom: 0, width: 2, background: "#F3F4F6", borderRadius: 1 }}
        />
        {all.map((a, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 12, paddingLeft: 14 }}>
            <div
              style={{
                position: "absolute",
                left: -13,
                top: 5,
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: sigBg(a.sig),
                border: `2px solid ${sigCol(a.sig)}`,
              }}
            />
            <div style={{ padding: "10px 12px", background: "#fff", borderRadius: 9, border: "1px solid #F3F4F6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.dark, flex: 1 }}>{a.h}</div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: a.amt.startsWith("+") ? C.green : a.amt.startsWith("-") ? C.red : C.muted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.amt}
                </span>
              </div>
              <div style={{ display: "flex", gap: 5, fontSize: 9, color: C.muted }}>
                <span style={{ color: sigCol(a.sig), fontWeight: 700 }}>{a.sig}</span>
                <span>·</span>
                <span>{sec.short}</span>
                <span>·</span>
                <span>{a.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KeyPlayersTab({ item, setSelId }) {
  const sec = item.sectorObj;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Key Players — {sec.short}</div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 11px",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            background: "#F3F4F6",
            fontSize: 11,
            color: C.muted,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          <Plus size={11} />
          Add
        </button>
      </div>
      {sec.keyPlayers.map((p, i) => (
        <Card key={i} style={{ padding: "14px 16px", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 11,
                background: "#F3F4F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <sec.icon size={18} color={C.muted} strokeWidth={1.5} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{p.name}</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: C.muted,
                    background: "#F3F4F6",
                    padding: "1px 5px",
                    borderRadius: 4,
                  }}
                >
                  {p.ticker}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    padding: "2px 7px",
                    borderRadius: 20,
                    background: "#F3F4F6",
                    color: C.muted,
                    fontWeight: 700,
                  }}
                >
                  {p.role}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{p.cap}</span>
                <span
                  style={{
                    fontSize: 11,
                    color: p.change.startsWith("+") ? C.green : C.red,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {p.change.startsWith("+") ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {p.change}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MiniDonut score={p.score} size={36} stroke={3} />
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <button
                  onClick={() => setSelId(`player-${sec.id}-${i}`)}
                  style={{
                    padding: "3px 7px",
                    borderRadius: 5,
                    border: "1px solid #E5E7EB",
                    background: "#fff",
                    fontSize: 9,
                    color: C.mid,
                    cursor: "pointer",
                  }}
                >
                  View
                </button>
                <button
                  style={{
                    padding: "3px 7px",
                    borderRadius: 5,
                    border: "1px solid #E5E7EB",
                    background: "#F3F4F6",
                    fontSize: 9,
                    color: C.muted,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  +Watch
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function CompetitorsTab({ item }) {
  const comps = SECTORS.flatMap((s) => s.keyPlayers.slice(0, 2).map((p) => ({ ...p, sec: s }))).slice(0, 3);
  const RC = [C.teal, C.primary, C.muted];
  const rdata = ["Score", "Revenue", "Growth", "Signals", "Stability"].map((k, i) => ({
    metric: k,
    ...Object.fromEntries(
      comps.map((c) => [c.ticker, Math.round(c.score * (0.7 + Math.sin(i + c.score * 0.01) * 0.3))]),
    ),
  }));
  return (
    <div>
      <div style={{ borderRadius: 10, border: "1px solid #E5E7EB", overflow: "hidden", marginBottom: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              <th style={{ padding: "8px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.muted }}>
                Metric
              </th>
              {comps.map((c, i) => (
                <th
                  key={i}
                  style={{ padding: "8px 12px", textAlign: "center", fontSize: 10, fontWeight: 700, color: C.muted }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: RC[i] }} />
                    {c.ticker}
                  </div>
                </th>
              ))}
              <th style={{ padding: "8px 12px", textAlign: "center", fontSize: 10, fontWeight: 700, color: C.muted }}>
                Avg
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                l: "Score",
                vals: comps.map((c) => c.score),
                avg: Math.round(comps.reduce((a, c) => a + c.score, 0) / comps.length),
              },
              { l: "Cap", vals: comps.map((c) => c.cap), avg: "$890M" },
              { l: "Change", vals: comps.map((c) => c.change), avg: "+3.5%" },
              { l: "Signal", vals: comps.map((c) => c.signal), avg: "Bullish" },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                <td style={{ padding: "9px 12px", fontSize: 11, fontWeight: 600, color: C.mid }}>{row.l}</td>
                {row.vals.map((v, j) => (
                  <td
                    key={j}
                    style={{
                      padding: "9px 12px",
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: 600,
                      color:
                        typeof v === "string" && v.startsWith("+")
                          ? C.green
                          : typeof v === "string" && v.startsWith("-")
                            ? C.red
                            : C.dark,
                    }}
                  >
                    {v}
                  </td>
                ))}
                <td style={{ padding: "9px 12px", textAlign: "center", fontSize: 11, color: C.muted }}>{row.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Card style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Multi-Metric Radar</div>
        <div style={{ height: 190 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={rdata}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: C.muted }} />
              {comps.map((c, i) => (
                <Radar
                  key={i}
                  name={c.ticker}
                  dataKey={c.ticker}
                  stroke={RC[i]}
                  fill={RC[i]}
                  fillOpacity={0.1}
                  strokeWidth={1.5}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function RightPanel({ selId, setSelId }) {
  const [tab, setTab] = useState("Overview"),
    [watching, setWatching] = useState(true),
    [dismissed, setDismissed] = useState(false);
  const item = ALL.find((i) => i.id === selId) || ALL[0];
  const sec = item.sectorObj;
  useEffect(() => {
    setTab("Overview");
    setDismissed(false);
  }, [selId]);
  const alert = sec.activity.find((a) => a.sig === "Watch") || sec.activity[0];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  background: C.accentBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: `1px solid ${C.accent}66`,
                }}
              >
                <sec.icon size={24} color={C.primary} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>
                  {sec.short} · {item.subSector} · {item.category}
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.dark, letterSpacing: "-0.5px", lineHeight: 1.1 }}>
                  {item.name}
                </div>
                {item.ticker && (
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                    {item.ticker} · {item.cap}
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <button
                onClick={() => setWatching((w) => !w)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 12px",
                  borderRadius: 9,
                  border: `1px solid ${watching ? C.accent : "#E5E7EB"}`,
                  background: watching ? C.accentBg : "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  color: watching ? C.primary : C.mid,
                  cursor: "pointer",
                }}
              >
                <Eye size={11} />
                {watching ? "✓ Watching" : "+ Watch"}
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 10px",
                  borderRadius: 9,
                  border: "1px solid #E5E7EB",
                  background: "#fff",
                  fontSize: 11,
                  color: C.mid,
                  cursor: "pointer",
                }}
              >
                <Share2 size={11} /> Share
              </button>
            </div>
          </div>
          <Card style={{ marginBottom: 12, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "flex" }}>
              {[
                { l: "Overall Score", v: item.score, col: scoreColor(item.score), u: "" },
                { l: "Revenue Goal", v: Math.round(item.score * 0.87), col: C.orange, u: "%" },
                { l: "Forecast/Mo", v: `${(((sec.capLow + sec.capHigh) / 2) * 0.12).toFixed(1)}M`, col: C.blue, u: "" },
              ].map((m, i) => {
                const r = 12,
                  circ = 2 * Math.PI * r,
                  pct = m.u === "%" ? parseFloat(m.v) : Math.min(100, parseFloat(m.v) || 50);
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      padding: "12px 14px",
                      borderRight: "1px solid #F3F4F6",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <svg width={30} height={30}>
                      <circle cx={15} cy={15} r={r} fill="none" stroke="#F0F0F0" strokeWidth={3} />
                      <circle
                        cx={15}
                        cy={15}
                        r={r}
                        fill="none"
                        stroke={m.col}
                        strokeWidth={3}
                        strokeDasharray={`${(circ * pct) / 100} ${circ}`}
                        strokeLinecap="round"
                        transform="rotate(-90 15 15)"
                      />
                    </svg>
                    <div>
                      <div
                        style={{
                          fontSize: 9,
                          color: C.muted,
                          textTransform: "uppercase",
                          letterSpacing: ".5px",
                          marginBottom: 2,
                        }}
                      >
                        {m.l}
                      </div>
                      <div
                        style={{ fontSize: 17, fontWeight: 800, color: C.dark, letterSpacing: "-0.5px", lineHeight: 1 }}
                      >
                        {m.v}
                        {m.u}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <svg width={28} height={28}>
                  <circle cx={14} cy={14} r={10} fill="none" stroke="#E5E7EB" strokeWidth={2} strokeDasharray="4 3" />
                  <text x={14} y={18} textAnchor="middle" fontSize={11} fill={C.muted}>
                    +
                  </text>
                </svg>
                <div>
                  <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: ".5px" }}>
                    Add Metric
                  </div>
                </div>
              </div>
            </div>
          </Card>
          {!dismissed && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 9,
                background: alert?.sig === "Watch" ? "#FFFBEB" : "#F0FDF4",
                border: `1px solid ${alert?.sig === "Watch" ? "#FDE68A" : "#BBF7D0"}`,
                marginBottom: 12,
              }}
            >
              <AlertTriangle size={13} color={alert?.sig === "Watch" ? C.yellow : C.green} />
              <span style={{ flex: 1, fontSize: 11, color: C.mid }}>
                <strong style={{ color: C.dark }}>{alert?.sig === "Watch" ? "Signal:" : "Update:"}</strong> {alert?.h} —{" "}
                {alert?.date}
              </span>
              <button
                onClick={() => setDismissed(true)}
                style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" }}
              >
                <X size={12} />
              </button>
            </div>
          )}
          <div style={{ display: "flex", borderBottom: "2px solid #E5E7EB", marginBottom: 16, overflowX: "auto" }}>
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  borderBottom: `2px solid ${tab === t ? C.accent : "transparent"}`,
                  background: "transparent",
                  fontSize: 12,
                  fontWeight: tab === t ? 700 : 500,
                  color: tab === t ? C.primary : C.muted,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  marginBottom: "-2px",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === "Overview" && <OverviewTab item={item} />}
          {tab === "Analyze" && <AnalyzeTab item={item} />}
          {tab === "Topics" && <TopicsTab item={item} />}
          {tab === "Signals" && <SignalsTab item={item} />}
          {tab === "Key Players" && <KeyPlayersTab item={item} setSelId={setSelId} />}
          {tab === "Competitors" && <CompetitorsTab item={item} />}
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

function TopNav({ sector, syncing, setSyncing }) {
  const [notif, setNotif] = useState(false);
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1400);
  };
  const month = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  const SectorIcon = sector.icon;
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
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}.sp{animation:spin 1s linear infinite}`}</style>

      {/* LEFT — Title + Divider + Sector Pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Watchlist</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{month}</div>
        </div>
        <div style={{ width: 1, height: 28, background: "#E5E7EB" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 10px",
            borderRadius: 7,
            background: C.accentBg,
            border: "1px solid rgba(184,217,53,0.27)",
          }}
        >
          <SectorIcon size={11} color={C.primary} strokeWidth={1.5} />
          <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
            {sector.short}
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
              {sector.activity.slice(0, 3).map((a, i) => (
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
          <RefreshCw size={14} color={C.mid} className={syncing ? "sp" : ""} />
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
  );
}

// ─── Status Bar ───────────────────────────────────────────────────────
function StatusBar({ activeLabel }) {
  return (
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
      {/* Left: Brand */}
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

      {/* Metadata chain */}
      {["12 Sectors", "174 Ventures", `Active: ${activeLabel}`, "Data: Mar 2026"].map((label, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <span
            style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", marginRight: 10, fontFamily: "Inter,sans-serif" }}
          >
            ·
          </span>
          <span
            style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginRight: 10, fontFamily: "Inter,sans-serif" }}
          >
            {label}
          </span>
        </span>
      ))}

      {/* Right: Legal + Live pill */}
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
            style={{ width: 5, height: 5, borderRadius: "50%", background: "#B8D935", boxShadow: "0 0 5px #B8D935" }}
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
  );
}

// ─── Mobile color tokens ──────────────────────────────────────────────
const MB = {
  bg: "#070F09",
  card: "#0F1F12",
  cardAlt: "#0B1A0E",
  border: "rgba(184,217,53,0.12)",
  borderSub: "rgba(255,255,255,0.06)",
  accent: "#B8D935",
  accentDim: "rgba(184,217,53,0.55)",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.4)",
  faint: "rgba(255,255,255,0.18)",
  green: "#4CAF7A",
  greenDim: "rgba(76,175,122,0.25)",
  yellow: "#F59E0B",
  yellowDim: "rgba(245,158,11,0.2)",
  red: "#DC2626",
  redDim: "rgba(220,38,38,0.2)",
  teal: "#2E6B52",
};

// ─── Mobile Helpers ───────────────────────────────────────────────────
const mCard = (extra = {}) => ({
  background: MB.card,
  borderRadius: 16,
  border: `1px solid ${MB.border}`,
  overflow: "hidden",
  ...extra,
});
const mLabel: React.CSSProperties = {
  fontSize: 9,
  fontWeight: 700,
  color: MB.faint,
  letterSpacing: "1.2px",
  textTransform: "uppercase" as const,
  fontFamily: "Inter,sans-serif",
};

function MBadge({ children, col = MB.accent, bg = "rgba(184,217,53,0.12)" }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: col,
        background: bg,
        padding: "3px 10px",
        borderRadius: 20,
        fontFamily: "Inter,sans-serif",
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}
function MCardHeader({ icon, title, badge, open, toggle }) {
  return (
    <div
      onClick={toggle}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", cursor: "pointer" }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: "rgba(184,217,53,0.08)",
          border: `1px solid ${MB.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: MB.text, letterSpacing: "-.2px" }}>{title}</span>
      {badge && <MBadge>{badge}</MBadge>}
      <ChevronDown
        size={14}
        color={MB.muted}
        style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}
      />
    </div>
  );
}

// ─── Score Ring (dark variant) ────────────────────────────────────────
function MRing({ score, size = 80, stroke = 7 }) {
  const r = (size - stroke * 2) / 2,
    circ = 2 * Math.PI * r,
    pct = Math.min(100, score);
  const col = score >= 80 ? MB.accent : score >= 60 ? MB.green : MB.yellow;
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={col}
        strokeWidth={stroke}
        strokeDasharray={`${(circ * pct) / 100} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2 + 4}
        textAnchor="middle"
        fontSize={size > 60 ? 18 : 12}
        fontWeight={800}
        fill={MB.text}
        fontFamily="Inter,sans-serif"
      >
        {score}
      </text>
    </svg>
  );
}

// ─── Responsive hook ──────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

// ═══════════════════════════════════════════════════════════════════════
// MOBILE HEADER
// ═══════════════════════════════════════════════════════════════════════
// ─── Sector Selector Drawer ────────────────────────────────────────────
function MSectorDrawer({ s, setS, open, onClose }) {
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
            const act = sec.id === s.id;
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
                    {sec.keyPlayers?.length || 5} ventures · ${sec.capLow}–{sec.capHigh}M
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

// ─── Menu Drawer ───────────────────────────────────────────────────────
function MMenuDrawer({
  open,
  onClose,
  userName = "Joseph Asante",
  userRole = "BRIDGE Intelligence · Analyst",
  userTier = "Pro",
}) {
  if (!open) return null;
  const NAV = [
    {
      label: "About BRIDGE",
      desc: "Our mission, model & sectors",
      path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    },
    { label: "Switch to Desktop", desc: "Full dashboard experience", path: "M2 3h20v14H2zM8 21h8M12 17v4" },
    {
      label: "Notifications",
      desc: "Manage alert preferences",
      path: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
    },
    {
      label: "Help & Support",
      desc: "Docs, guides & contact",
      path: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3 M12 17h.01",
    },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
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
        {/* Return to site */}
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
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
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
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
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
                <path d={item.path} />
              </svg>
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
            <svg
              width="14"
              height="14"
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
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
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

// ─── Notif Dropdown ────────────────────────────────────────────────────
function MNotifDropdown({ open, onClose, s }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 64,
        right: 12,
        width: 280,
        background: "#0F1A12",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
        zIndex: 350,
        overflow: "hidden",
      }}
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
              background: a.sig === "Bullish" ? "#22C55E" : "#F59E0B",
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
  );
}

// ─── Mobile Header (new spec) ──────────────────────────────────────────
function MobileHeader({ sector, setSector }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 62,
          background: `${MB.card}EE`,
          borderBottom: `1px solid rgba(255,255,255,0.08)`,
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: 8,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "stretch", width: 90 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3434.33 932.3"
            style={{ width: 90, height: 24, display: "block" }}
          >
            <defs>
              <style>{`.ml1{stroke:#fff;stroke-width:80px;}.ml1,.ml3{fill:none;stroke-miterlimit:10;}.ml2{fill:#B8D935;stroke:#1b4d3e;stroke-miterlimit:10;}.ml3{stroke:#231f20;stroke-width:5px;}.ml4,.ml5{fill:#fff;}.ml5{stroke:#000;stroke-width:.5px;}.ml8{fill:#fff;}`}</style>
            </defs>
            <path
              className="ml4"
              d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
            />
            <path
              className="ml5"
              d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1Z"
            />
            <rect className="ml2" x="1427.38" y="17.35" width="205.2" height="145" />
            <rect className="ml4" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
            <rect className="ml1" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55" />
            <polygon className="ml2" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13" />
            <path
              style={{ fill: "#74914a" }}
              d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14Z"
            />
            <path
              className="ml2"
              d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37Z"
            />
          </svg>
          <div style={{ width: 90, overflow: "hidden" }}>
            <span
              style={{
                display: "block",
                fontSize: 6.5,
                fontWeight: 700,
                color: MB.accent,
                textTransform: "uppercase",
                fontFamily: "Inter,sans-serif",
                letterSpacing: "0.32em",
                textAlign: "justify",
                textAlignLast: "justify",
                width: "100%",
                lineHeight: 1.6,
              }}
            >
              Intelligence
            </span>
          </div>
        </div>
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
            {sector.svgIcon("#B8D935", 13)}
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
            {sector.short}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>
              {sector.score}
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
              marginLeft: 10,
            }}
          />
        </button>
      </div>
      {/* Overlays */}
      {notifOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 340 }} onClick={() => setNotifOpen(false)}>
          <MNotifDropdown open={notifOpen} onClose={() => setNotifOpen(false)} s={sector} />
        </div>
      )}
      <MMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <MSectorDrawer s={sector} setS={setSector} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// BOTTOM NAV  (Dashboard / Overview / Analytics / Watch / Resources)
// ═══════════════════════════════════════════════════════════════════════
function MobileBottomNav({ page, setPage }) {
  const items = [
    { id: "dashboard", label: "Dashboard", Icon: LayoutGrid },
    { id: "overview", label: "Overview", Icon: Activity },
    { id: "analytics", label: "Analytics", Icon: BarChart3 },
    { id: "watch", label: "Watch", Icon: Eye },
    { id: "resources", label: "Resources", Icon: Book },
  ];
  return (
    <div
      style={{
        height: 60,
        flexShrink: 0,
        background: MB.card,
        borderTop: `1px solid ${MB.borderSub}`,
        display: "flex",
        alignItems: "stretch",
        paddingBottom: "env(safe-area-inset-bottom,0px)",
      }}
    >
      {items.map(({ id, label, Icon }) => {
        const act = page === id;
        return (
          <div
            key={id}
            onClick={() => setPage(id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              cursor: "pointer",
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
                  borderRadius: "0 0 2px 2px",
                  background: MB.accent,
                }}
              />
            )}
            <Icon size={20} color={act ? MB.accent : MB.faint} strokeWidth={2} />
            <span
              style={{
                fontSize: 9,
                fontWeight: act ? 700 : 400,
                color: act ? MB.accent : MB.faint,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// WATCH PAGE — sub-tabs: Feed / Players / Scores / Signals
// ═══════════════════════════════════════════════════════════════════════
function WatchSubNav({ sub, setSub }) {
  const tabs = ["Feed", "Players", "Scores", "Signals"];
  return (
    <div
      className="hs"
      style={{
        display: "flex",
        gap: 0,
        padding: "10px 14px 0",
        overflowX: "auto",
        scrollbarWidth: "none",
        flexShrink: 0,
        borderBottom: `1px solid ${MB.borderSub}`,
      }}
    >
      {tabs.map((t) => {
        const act = sub === t;
        return (
          <div
            key={t}
            onClick={() => setSub(t)}
            style={{
              padding: "6px 14px",
              cursor: "pointer",
              borderBottom: `2px solid ${act ? MB.accent : "transparent"}`,
              marginBottom: "-1px",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: act ? 700 : 400,
                color: act ? MB.accent : MB.muted,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {t}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Feed sub-tab
function WatchFeed({ sector, setSelId }) {
  const [expanded, setExpanded] = useState(null);
  const bullish = sector.activity.filter((a) => a.sig === "Bullish").length;
  const watches = sector.activity.filter((a) => a.sig === "Watch").length;
  const sigC = (s) => (s === "Bullish" ? MB.green : s === "Watch" ? MB.yellow : MB.red);
  const sigBG = (s) => (s === "Bullish" ? MB.greenDim : s === "Watch" ? MB.yellowDim : MB.redDim);

  // Derived intelligence values
  const marketSize = `$${(sector.capHigh * 1.9).toFixed(1)}B`;
  const growthRate = `${Math.round(sector.score * 0.45)}%`;
  const investGap = `$${(sector.capLow * 0.8).toFixed(0)}M`;
  const deployedPct = Math.round(38 + sector.score * 0.25);

  // BRIDGE score pillar breakdown (derived from overall score)
  const pillars = [
    { l: "Peace & Prosperity", v: Math.round(sector.score * 0.97) },
    { l: "Strategic Fit", v: Math.round(sector.score * 1.02) },
    { l: "Feasibility", v: Math.round(sector.score * 0.94) },
    { l: "Scalability", v: Math.round(sector.score * 0.99) },
  ].map((p) => ({ ...p, v: Math.min(100, p.v) }));

  // Trending sub-sectors with heat scores
  const heatCols = [
    "rgba(184,217,53,0.9)",
    "rgba(184,217,53,0.65)",
    "rgba(76,175,122,0.8)",
    "rgba(76,175,122,0.55)",
    "rgba(255,255,255,0.25)",
  ];
  const heatScores = [92, 78, 71, 58, 34];

  return (
    <div style={{ padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Hero */}
      <div style={{ ...mCard(), padding: "18px" }}>
        <div style={{ fontSize: 8, ...mLabel, marginBottom: 10 }}>ACTIVE · {sector.short.toUpperCase()}</div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: MB.text, letterSpacing: "-.5px", lineHeight: 1.1 }}>
              {sector.short}
            </div>
            <div
              style={{ fontSize: 10, color: MB.muted, marginTop: 4, fontFamily: "Inter,sans-serif", lineHeight: 1.4 }}
            >
              {sector.full}
            </div>
          </div>
          <MRing score={sector.score} size={64} stroke={6} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {[
            { l: "Cap Range", v: `$${sector.capLow}–${sector.capHigh}M` },
            { l: "Bullish", v: `${bullish} signals`, col: MB.green },
            { l: "Watch", v: `${watches} signals`, col: MB.yellow },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                padding: "9px 10px",
                border: `1px solid ${MB.borderSub}`,
              }}
            >
              <div style={{ ...mLabel, marginBottom: 4, fontSize: 8 }}>{m.l}</div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: m.col || MB.text,
                  fontFamily: "Inter,sans-serif",
                  lineHeight: 1.2,
                }}
              >
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Snapshot */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChart3 size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Market Snapshot</span>
          </div>
          <span style={{ fontSize: 9, color: MB.muted, fontFamily: "Inter,sans-serif" }}>Mar 2026</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
          {[
            { l: "Market Size", v: marketSize, d: "+12%", col: MB.accent },
            { l: "YoY Growth", v: growthRate, d: "↑ Trending", col: MB.green },
            { l: "Invest. Gap", v: investGap, d: "Opportunity", col: MB.yellow },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                padding: "14px 12px",
                borderRight: i < 2 ? `1px solid ${MB.borderSub}` : "none",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: 18, fontWeight: 800, color: m.col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
              >
                {m.v}
              </div>
              <div style={{ fontSize: 8, color: MB.muted, fontFamily: "Inter,sans-serif", marginTop: 4 }}>{m.l}</div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: m.col,
                  fontFamily: "Inter,sans-serif",
                  marginTop: 3,
                  opacity: 0.7,
                }}
              >
                {m.d}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BRIDGE Score Pillars */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Activity size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>BRIDGE Score</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: `2px solid ${MB.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 800, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
                {sector.score}
              </span>
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {pillars.map((p, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: MB.muted, fontFamily: "Inter,sans-serif" }}>{p.l}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
                  {p.v}
                </span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                <div
                  style={{
                    width: `${p.v}%`,
                    height: "100%",
                    background: `linear-gradient(90deg,${MB.teal},${MB.accent})`,
                    borderRadius: 2,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capital Flow Indicator */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Capital Flow</span>
          </div>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: MB.green,
              fontFamily: "Inter,sans-serif",
              background: MB.greenDim,
              padding: "3px 8px",
              borderRadius: 10,
            }}
          >
            {deployedPct}% deployed
          </span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 10, color: MB.muted, fontFamily: "Inter,sans-serif" }}>
              Deployed capital vs total opportunity
            </span>
          </div>
          <div
            style={{
              height: 10,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: `${deployedPct}%`,
                height: "100%",
                background: `linear-gradient(90deg,${MB.teal},${MB.accent})`,
                borderRadius: 6,
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
                {deployedPct}%
              </div>
              <div style={{ fontSize: 8, color: MB.faint, fontFamily: "Inter,sans-serif", marginTop: 2 }}>Deployed</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: MB.text, fontFamily: "Inter,sans-serif" }}>
                {100 - deployedPct}%
              </div>
              <div style={{ fontSize: 8, color: MB.faint, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                Remaining Opportunity
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: MB.green, fontFamily: "Inter,sans-serif" }}>
                {investGap}
              </div>
              <div style={{ fontSize: 8, color: MB.faint, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                Target Gap
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Sub-sectors */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Trending Sub-sectors</span>
        </div>
        <div style={{ padding: "8px 12px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
          {sector.subSectors.slice(0, 5).map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 6px" }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: `1px solid ${MB.borderSub}`,
                }}
              >
                <span style={{ fontSize: 9, fontWeight: 800, color: MB.faint, fontFamily: "Inter,sans-serif" }}>
                  {i + 1}
                </span>
              </div>
              <span
                style={{ flex: 1, fontSize: 12, fontWeight: 500, color: i < 2 ? MB.text : "rgba(255,255,255,0.6)" }}
              >
                {s.name}
              </span>
              <div
                style={{ width: 80, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, flexShrink: 0 }}
              >
                <div
                  style={{ width: `${heatScores[i] || 30}%`, height: "100%", background: heatCols[i], borderRadius: 2 }}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: heatCols[i],
                  fontFamily: "Inter,sans-serif",
                  width: 26,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {heatScores[i] || 30}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-sector chips */}
      <div className="hs" style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none" }}>
        {sector.subSectors.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${MB.borderSub}`,
              fontSize: 10,
              fontWeight: 500,
              color: MB.muted,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {s.name}
          </div>
        ))}
      </div>

      <div style={{ ...mLabel, paddingTop: 4 }}>Latest Activity</div>
      {sector.activity.map((a, i) => {
        const exp = expanded === "all" || expanded === i;
        return (
          <div key={i} onClick={() => setExpanded(exp ? null : i)} style={{ ...mCard(), cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 14px" }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: sigC(a.sig),
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${sigC(a.sig)}88`,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: MB.text,
                    lineHeight: 1.35,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: exp ? "normal" : "nowrap",
                  }}
                >
                  {a.h}
                </div>
                {!exp && (
                  <div style={{ fontSize: 10, color: MB.muted, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                    {a.date} · {a.cat}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: sigC(a.sig), fontFamily: "Inter,sans-serif" }}>
                  {a.amt}
                </span>
                <ChevronDown
                  size={12}
                  color={MB.faint}
                  style={{ transform: exp ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                />
              </div>
            </div>
            {exp && (
              <div style={{ padding: "0 14px 13px", borderTop: `1px solid ${MB.borderSub}` }}>
                <div style={{ paddingTop: 9, display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "3px 10px",
                      borderRadius: 20,
                      background: sigBG(a.sig),
                      color: sigC(a.sig),
                      fontWeight: 700,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {a.sig}
                  </span>
                  <span style={{ fontSize: 10, color: MB.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: MB.muted }}>{a.cat}</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: MB.text,
                      marginLeft: "auto",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    Impact: {a.amt}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Players sub-tab
function WatchPlayers({ sector, setSelId }) {
  const sigC = (s) => (s === "Bullish" ? MB.green : s === "Watch" ? MB.yellow : MB.red);
  const [selPlayer, setSelPlayer] = useState(null);
  const roles = ["Market Leader", "Growth Stage", "Emerging Player", "Institutional", "Early Stage"];
  const shareWeights = [35, 28, 18, 12, 7];

  return (
    <div style={{ padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Sector at a glance */}
      <div style={{ ...mCard(), padding: "14px 16px" }}>
        <div style={{ ...mLabel, marginBottom: 10 }}>Sector at a Glance</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { l: "Total Players", v: `${sector.keyPlayers.length} tracked` },
            { l: "Market Coverage", v: `$${(sector.capHigh * 1.8).toFixed(1)}B` },
            {
              l: "Avg BRIDGE Score",
              v: `${Math.round(sector.keyPlayers.reduce((s, p) => s + p.score, 0) / sector.keyPlayers.length)}`,
            },
            { l: "Active Signals", v: `${sector.activity.length} events` },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                padding: "11px 12px",
                border: `1px solid ${MB.borderSub}`,
              }}
            >
              <div style={{ ...mLabel, fontSize: 8, marginBottom: 4 }}>{m.l}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: MB.text, fontFamily: "Inter,sans-serif" }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Share Breakdown */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChart3 size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Market Share</span>
          </div>
          <span style={{ fontSize: 9, color: MB.muted, fontFamily: "Inter,sans-serif" }}>Est. distribution</span>
        </div>
        {/* Stacked bar */}
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", height: 8, borderRadius: 6, overflow: "hidden", gap: 1, marginBottom: 14 }}>
            {shareWeights.map((w, i) => {
              const cols = [
                "rgba(184,217,53,1)",
                "rgba(76,175,122,0.85)",
                "rgba(184,217,53,0.55)",
                "rgba(76,175,122,0.45)",
                "rgba(255,255,255,0.18)",
              ];
              return <div key={i} style={{ flex: w, background: cols[i] }} />;
            })}
          </div>
          {sector.keyPlayers.slice(0, 5).map((p, i) => {
            const cols = [
              "rgba(184,217,53,1)",
              "rgba(76,175,122,0.85)",
              "rgba(184,217,53,0.55)",
              "rgba(76,175,122,0.45)",
              "rgba(255,255,255,0.4)",
            ];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 4 ? 8 : 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: cols[i], flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{p.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: cols[i], fontFamily: "Inter,sans-serif" }}>
                  {shareWeights[i]}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Company Cards */}
      <div style={{ ...mLabel }}>Top Companies</div>
      {sector.keyPlayers.map((p, i) => {
        const isSel = selPlayer === i;
        const role = roles[i] || "Player";
        const chgPos = p.change?.startsWith("+");
        return (
          <div key={i} style={{ ...mCard(), cursor: "pointer" }} onClick={() => setSelPlayer(isSel ? null : i)}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 11,
                  background: "rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: `1px solid ${MB.borderSub}`,
                  position: "relative",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 800, color: MB.muted, fontFamily: "Inter,sans-serif" }}>
                  {i + 1}
                </span>
                {i === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: MB.accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 7, fontWeight: 800, color: "#0A1A0C" }}>★</span>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: MB.text,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.name}
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 9,
                      padding: "2px 7px",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.05)",
                      color: MB.faint,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {role}
                  </span>
                  <span style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif" }}>#{p.ticker}</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: MB.text, fontFamily: "Inter,sans-serif" }}>
                  {p.cap}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: chgPos ? MB.green : MB.red,
                    fontFamily: "Inter,sans-serif",
                    marginTop: 2,
                  }}
                >
                  {p.change}
                </div>
              </div>
              <ChevronDown
                size={13}
                color={MB.faint}
                style={{ transform: isSel ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}
              />
            </div>
            {isSel && (
              <div
                style={{
                  borderTop: `1px solid ${MB.borderSub}`,
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
                  {[
                    { l: "BRIDGE Score", v: p.score, col: MB.accent },
                    { l: "Market Cap", v: p.cap, col: MB.text },
                    { l: "Change", v: p.change, col: chgPos ? MB.green : MB.red },
                  ].map((m, j) => (
                    <div
                      key={j}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 9,
                        padding: "10px 8px",
                        border: `1px solid ${MB.borderSub}`,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 800, color: m.col, fontFamily: "Inter,sans-serif" }}>
                        {m.v}
                      </div>
                      <div style={{ ...mLabel, fontSize: 7, marginTop: 3 }}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ ...mLabel, marginBottom: 6 }}>Score Rating</div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                    <div
                      style={{
                        width: `${p.score}%`,
                        height: "100%",
                        background: `linear-gradient(90deg,${MB.teal},${MB.accent})`,
                        borderRadius: 3,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    <span style={{ fontSize: 8, color: MB.faint, fontFamily: "Inter,sans-serif" }}>0</span>
                    <span style={{ fontSize: 8, color: MB.accent, fontFamily: "Inter,sans-serif", fontWeight: 700 }}>
                      {p.score} / 100
                    </span>
                    <span style={{ fontSize: 8, color: MB.faint, fontFamily: "Inter,sans-serif" }}>100</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: MB.muted, fontFamily: "Inter,sans-serif" }}>
                    Sector: {sector.short}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: MB.accent,
                      fontWeight: 600,
                      fontFamily: "Inter,sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    View Full Profile →
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Notable Moves */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Notable Moves</span>
        </div>
        {sector.activity.slice(0, 3).map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              padding: "12px 16px",
              borderBottom: i < 2 ? `1px solid ${MB.borderSub}` : "none",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: sigC(a.sig),
                marginTop: 5,
                flexShrink: 0,
                boxShadow: `0 0 6px ${sigC(a.sig)}55`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MB.text, lineHeight: 1.35 }}>{a.h}</div>
              <div style={{ display: "flex", gap: 7, marginTop: 5, alignItems: "center" }}>
                <span
                  style={{
                    fontSize: 9,
                    padding: "2px 8px",
                    borderRadius: 10,
                    background: `${sigC(a.sig)}1A`,
                    color: sigC(a.sig),
                    fontWeight: 700,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {a.sig}
                </span>
                <span style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif" }}>
                  {a.date} · {a.cat}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: MB.text,
                    marginLeft: "auto",
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
    </div>
  );
}

// Scores sub-tab
function WatchScores({ sector }) {
  const pillars = [
    { l: "Peace & Prosperity", v: Math.min(100, Math.round(sector.score * 0.97)) },
    { l: "Strategic Fit", v: Math.min(100, Math.round(sector.score * 1.02)) },
    { l: "Feasibility", v: Math.min(100, Math.round(sector.score * 0.94)) },
    { l: "Scalability", v: Math.min(100, Math.round(sector.score * 0.99)) },
  ];
  const allSorted = [...SECTORS].sort((a, b) => b.score - a.score);
  const rank = allSorted.findIndex((s) => s.id === sector.id) + 1;
  const trendData = [72, 75, 78, 76, 80, 82, sector.score - 3, sector.score - 1, sector.score];
  const riskLevel = sector.score >= 85 ? "Low" : sector.score >= 75 ? "Medium" : "Elevated";
  const riskCol = sector.score >= 85 ? MB.green : sector.score >= 75 ? MB.yellow : MB.red;

  return (
    <div style={{ padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Hero score card */}
      <div style={{ ...mCard(), padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
          <MRing score={sector.score} size={100} stroke={8} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: MB.text, letterSpacing: "-.3px", lineHeight: 1.2 }}>
              {sector.short}
            </div>
            <div
              style={{ fontSize: 10, color: MB.muted, marginTop: 3, fontFamily: "Inter,sans-serif", lineHeight: 1.4 }}
            >
              {sector.full}
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: 9,
                  padding: "3px 9px",
                  borderRadius: 20,
                  background: MB.greenDim,
                  color: MB.green,
                  fontWeight: 700,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Rank #{rank}
              </span>
              <span
                style={{
                  fontSize: 9,
                  padding: "3px 9px",
                  borderRadius: 20,
                  background: `${riskCol}1A`,
                  color: riskCol,
                  fontWeight: 700,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Risk: {riskLevel}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { l: "Cap Low", v: `$${sector.capLow}M`, col: MB.accent },
            { l: "Cap High", v: `$${sector.capHigh}M`, col: MB.accentDim },
            { l: "BRIDGE Score", v: `${sector.score}`, col: MB.green },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 11,
                padding: "12px 10px",
                border: `1px solid ${MB.borderSub}`,
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: 17, fontWeight: 800, color: m.col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
              >
                {m.v}
              </div>
              <div style={{ ...mLabel, fontSize: 8, marginTop: 5 }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Trend */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Activity size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Score Trend</span>
          </div>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: MB.green,
              fontFamily: "Inter,sans-serif",
              background: MB.greenDim,
              padding: "2px 8px",
              borderRadius: 10,
            }}
          >
            +{sector.score - trendData[0]} pts
          </span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 56, marginBottom: 8 }}>
            {trendData.map((v, i) => {
              const pct = (v / 100) * 100;
              const isLast = i === trendData.length - 1;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: isLast ? MB.accent : `rgba(184,217,53,${0.15 + i * 0.05})`,
                    borderRadius: "3px 3px 0 0",
                    height: `${pct}%`,
                    minHeight: 4,
                  }}
                />
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
              <span key={m} style={{ fontSize: 7, color: MB.faint, fontFamily: "Inter,sans-serif" }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pillar Breakdown */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarChart3 size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Score Pillars</span>
        </div>
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          {pillars.map((p, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontFamily: "Inter,sans-serif" }}>
                  {p.l}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: p.v >= 85 ? MB.accent : MB.accentDim,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {p.v}
                  </span>
                  <span style={{ fontSize: 8, color: MB.green, fontWeight: 600, fontFamily: "Inter,sans-serif" }}>
                    +{Math.round((p.v - 70) * 0.4)}%
                  </span>
                </div>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                <div
                  style={{
                    width: `${p.v}%`,
                    height: "100%",
                    background: `linear-gradient(90deg,${MB.teal},${MB.accent})`,
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sector Rankings */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>All Sectors Ranked</span>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
            #{rank} of 12
          </span>
        </div>
        {allSorted.map((s, i) => {
          const isCurrent = s.id === sector.id;
          return (
            <div
              key={s.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 16px",
                borderBottom: i < allSorted.length - 1 ? `1px solid ${MB.borderSub}` : "none",
                background: isCurrent ? "rgba(184,217,53,0.04)" : "transparent",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: isCurrent ? MB.accent : MB.faint,
                  fontFamily: "Inter,sans-serif",
                  width: 16,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 11,
                  fontWeight: isCurrent ? 700 : 400,
                  color: isCurrent ? MB.text : "rgba(255,255,255,0.55)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {s.short}
              </span>
              <div
                style={{ width: 70, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, flexShrink: 0 }}
              >
                <div
                  style={{
                    width: `${s.score}%`,
                    height: "100%",
                    background: isCurrent ? MB.accent : MB.accentDim,
                    borderRadius: 2,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: isCurrent ? MB.accent : s.score >= 88 ? MB.accentDim : "rgba(255,255,255,0.3)",
                  fontFamily: "Inter,sans-serif",
                  width: 22,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {s.score}
              </span>
            </div>
          );
        })}
      </div>

      {/* Player Scoreboard */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Player Scoreboard</span>
        </div>
        {sector.keyPlayers.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderBottom: i < sector.keyPlayers.length - 1 ? `1px solid ${MB.borderSub}` : "none",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: MB.faint,
                fontFamily: "Inter,sans-serif",
                width: 14,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: i === 0 ? 700 : 500,
                color: i === 0 ? MB.text : "rgba(255,255,255,0.65)",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {p.name}
            </span>
            <span
              style={{
                fontSize: 10,
                color: p.change?.startsWith("+") ? MB.green : MB.red,
                fontWeight: 600,
                fontFamily: "Inter,sans-serif",
                width: 36,
                flexShrink: 0,
              }}
            >
              {p.change}
            </span>
            <div style={{ width: 80, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, flexShrink: 0 }}>
              <div
                style={{
                  width: `${p.score}%`,
                  height: "100%",
                  background: p.score >= 85 ? MB.accent : MB.accentDim,
                  borderRadius: 2,
                }}
              />
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: p.score >= 85 ? MB.accent : MB.accentDim,
                fontFamily: "Inter,sans-serif",
                width: 22,
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {p.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Signals sub-tab
function WatchSignals({ sector }) {
  const sigC = (s) => (s === "Bullish" ? MB.green : s === "Watch" ? MB.yellow : MB.red);
  const sigBG = (s) => (s === "Bullish" ? MB.greenDim : s === "Watch" ? MB.yellowDim : MB.redDim);
  const bullish = sector.activity.filter((a) => a.sig === "Bullish");
  const watches = sector.activity.filter((a) => a.sig === "Watch");
  const cats = [...new Set(sector.activity.map((a) => a.cat))];

  // Signal strength: ratio of bullish to total
  const strength = Math.round((bullish.length / sector.activity.length) * 100);

  return (
    <div style={{ padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Summary counters */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[
          { l: "Bullish", v: bullish.length, col: MB.green, bg: MB.greenDim, Icon: TrendingUp },
          { l: "Watch", v: watches.length, col: MB.yellow, bg: MB.yellowDim, Icon: AlertTriangle },
          { l: "Total", v: sector.activity.length, col: MB.accent, bg: "rgba(184,217,53,0.1)", Icon: Activity },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              ...mCard(),
              padding: "14px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <s.Icon size={16} color={s.col} />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
              {s.v}
            </div>
            <div style={{ fontSize: 9, color: MB.muted, fontFamily: "Inter,sans-serif" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Signal Strength Meter */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Signal Strength</span>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: strength >= 70 ? MB.green : MB.yellow,
              fontFamily: "Inter,sans-serif",
            }}
          >
            {strength}%
          </span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", height: 10, borderRadius: 6, overflow: "hidden", gap: 2, marginBottom: 10 }}>
            <div style={{ flex: bullish.length, background: MB.green, borderRadius: "4px 0 0 4px" }} />
            <div style={{ flex: watches.length, background: MB.yellow }} />
            {sector.activity.length - bullish.length - watches.length > 0 && (
              <div
                style={{
                  flex: sector.activity.length - bullish.length - watches.length,
                  background: MB.red,
                  borderRadius: "0 4px 4px 0",
                }}
              />
            )}
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {[
              [MB.green, "Bullish", bullish.length],
              [MB.yellow, "Watch", watches.length],
              [MB.red, "Risk", sector.activity.length - bullish.length - watches.length],
            ]
              .filter((r) => r[2] > 0)
              .map(([col, lbl, v], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: col, flexShrink: 0 }} />
                  <span style={{ fontSize: 9, color: MB.muted, fontFamily: "Inter,sans-serif" }}>
                    {lbl} <span style={{ fontWeight: 700, color: col }}>{v}</span>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarChart3 size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>By Category</span>
        </div>
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 9 }}>
          {cats.map((cat, i) => {
            const catItems = sector.activity.filter((a) => a.cat === cat);
            const catBull = catItems.filter((a) => a.sig === "Bullish").length;
            const pct = Math.round((catItems.length / sector.activity.length) * 100);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", flex: 1, fontFamily: "Inter,sans-serif" }}
                >
                  {cat}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    color: catBull === catItems.length ? MB.green : MB.yellow,
                    fontWeight: 700,
                    fontFamily: "Inter,sans-serif",
                    width: 36,
                    textAlign: "right",
                  }}
                >
                  {catBull}/{catItems.length}
                </span>
                <div
                  style={{ width: 60, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, flexShrink: 0 }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: catBull === catItems.length ? MB.green : MB.yellow,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impact Summary */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingUp size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Impact Summary</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {[
            {
              l: "Highest Impact",
              v: sector.activity.sort((a, b) => b.amt?.localeCompare(a.amt || ""))[0]?.amt || "N/A",
              col: MB.accent,
            },
            { l: "Latest Signal", v: sector.activity[0]?.date || "N/A", col: MB.muted },
            { l: "Top Category", v: cats[0] || "Policy", col: MB.green },
            { l: "BRIDGE Outlook", v: "Positive", col: MB.green },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                padding: "14px 14px",
                borderRight: i % 2 === 0 ? `1px solid ${MB.borderSub}` : "none",
                borderBottom: i < 2 ? `1px solid ${MB.borderSub}` : "none",
              }}
            >
              <div style={{ ...mLabel, fontSize: 8, marginBottom: 5 }}>{m.l}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: m.col, fontFamily: "Inter,sans-serif" }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Timeline */}
      <div style={{ ...mLabel }}>Signal Timeline</div>
      {sector.activity.map((a, i) => (
        <div key={i} style={{ display: "flex", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 3 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: sigC(a.sig),
                boxShadow: `0 0 8px ${sigC(a.sig)}66`,
                flexShrink: 0,
              }}
            />
            {i < sector.activity.length - 1 && (
              <div style={{ width: 1, flex: 1, background: MB.borderSub, marginTop: 5, minHeight: 20 }} />
            )}
          </div>
          <div style={{ flex: 1, paddingBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: MB.text, lineHeight: 1.35 }}>{a.h}</div>
            <div style={{ display: "flex", gap: 7, marginTop: 5, alignItems: "center", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: 9,
                  padding: "2px 9px",
                  borderRadius: 20,
                  background: sigBG(a.sig),
                  color: sigC(a.sig),
                  fontWeight: 700,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {a.sig}
              </span>
              <span style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif" }}>
                {a.date} · {a.cat}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: MB.text,
                  marginLeft: "auto",
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
  );
}

// WATCH PAGE
function WatchPage({ sector, setSelId }) {
  const [sub, setSub] = useState("Feed");
  return (
    <>
      <WatchSubNav sub={sub} setSub={setSub} />
      <div className="hs" style={{ flex: 1, overflowY: "auto" }}>
        {sub === "Feed" && <WatchFeed sector={sector} setSelId={setSelId} />}
        {sub === "Players" && <WatchPlayers sector={sector} setSelId={setSelId} />}
        {sub === "Scores" && <WatchScores sector={sector} />}
        {sub === "Signals" && <WatchSignals sector={sector} />}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ANALYTICS PAGE  (sector-specific, collapsible widget cards)
// ═══════════════════════════════════════════════════════════════════════
function AnalyticsPage({ sector }) {
  const [open, setOpen] = useState({ kpi: true, breakdown: true, volatility: false, engagement: false });
  const tog = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  // Derived data
  const subShare = [40, 25, 18, 12, 5];
  const subNames = sector.subSectors.map((s) => s.name).concat(["Other"]);
  const capMid = ((sector.capLow + sector.capHigh) / 2).toFixed(1);
  const irr = Math.round(sector.score * 0.27);

  const engData = Array.from({ length: 24 }, (_, i) => ({ x: i, y: Math.round(30 + Math.random() * 70) }));

  return (
    <div
      className="hs"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "14px 14px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Sector hero */}
      <div style={{ ...mCard(), padding: "16px" }}>
        <div style={{ fontSize: 8, ...mLabel, marginBottom: 8 }}>ANALYTICS · {sector.short.toUpperCase()}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <MRing score={sector.score} size={72} stroke={6} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: MB.text, lineHeight: 1.15, letterSpacing: "-.3px" }}>
              {sector.full}
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              {[
                { l: "Cap", v: `$${sector.capLow}–${sector.capHigh}M` },
                { l: "IRR", v: `${irr}%` },
                { l: "Score", v: `${sector.score}` },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 8,
                    background: "rgba(184,217,53,0.08)",
                    border: `1px solid ${MB.border}`,
                  }}
                >
                  <span style={{ fontSize: 9, color: MB.muted, fontFamily: "Inter,sans-serif" }}>{c.l} </span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
                    {c.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards — 2×2 grid */}
      <div style={mCard()}>
        <MCardHeader
          icon={<BarChart3 size={15} color={MB.accent} />}
          title="KPIs"
          badge="Live"
          open={open.kpi}
          toggle={() => tog("kpi")}
        />
        {open.kpi && (
          <div
            style={{
              borderTop: `1px solid ${MB.borderSub}`,
              padding: "12px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            {[
              { l: "Market Cap", v: `$${(sector.capHigh * 1.8).toFixed(1)}B`, sub: "Sector aggregate", delta: "+5.1%" },
              { l: "IRR Ceiling", v: `${irr}%`, sub: "Target return", delta: "+2.4%" },
              { l: "Sub-sector Rev", v: `$${(sector.capLow * 1.4).toFixed(1)}B`, sub: "Lead segment", delta: "+3.8%" },
              { l: "BRIDGE Score", v: `${sector.score}`, sub: "/ 100 composite", delta: "+1.2%" },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 12,
                  padding: "14px 12px",
                  border: `1px solid ${MB.borderSub}`,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: MB.green,
                    fontWeight: 700,
                    fontFamily: "Inter,sans-serif",
                    textAlign: "right",
                    marginBottom: 6,
                  }}
                >
                  {m.delta}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: MB.text,
                    letterSpacing: "-.5px",
                    lineHeight: 1,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {m.v}
                </div>
                <div style={{ fontSize: 10, color: MB.muted, marginTop: 5, lineHeight: 1.3 }}>{m.l}</div>
                <div style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sub-sector Breakdown */}
      <div style={mCard()}>
        <MCardHeader
          icon={<Activity size={15} color={MB.accent} />}
          title="Sub-sector Breakdown"
          badge={`${subNames.length} segments`}
          open={open.breakdown}
          toggle={() => tog("breakdown")}
        />
        {open.breakdown && (
          <div
            style={{
              borderTop: `1px solid ${MB.borderSub}`,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Stacked bar */}
            <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 6, gap: 1 }}>
              {subShare.map((pct, i) => {
                const cols = [
                  MB.accent,
                  MB.green,
                  "rgba(184,217,53,0.5)",
                  "rgba(76,175,122,0.5)",
                  "rgba(255,255,255,0.15)",
                ];
                return (
                  <div
                    key={i}
                    style={{
                      width: `${pct}%`,
                      background: cols[i],
                      borderRadius: i === 0 ? "4px 0 0 4px" : i === subShare.length - 1 ? "0 4px 4px 0" : "0",
                    }}
                  />
                );
              })}
            </div>
            {subNames.map((name, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: [
                      MB.accent,
                      MB.green,
                      "rgba(184,217,53,0.5)",
                      "rgba(76,175,122,0.5)",
                      "rgba(255,255,255,0.15)",
                    ][i],
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 12, fontWeight: 500, color: MB.text, flex: 1 }}>{name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
                  {subShare[i]}%
                </span>
              </div>
            ))}
            {subNames
              .map((name, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                    <div
                      style={{
                        width: `${subShare[i]}%`,
                        height: "100%",
                        background: [
                          MB.accent,
                          MB.green,
                          "rgba(184,217,53,0.5)",
                          "rgba(76,175,122,0.5)",
                          "rgba(255,255,255,0.12)",
                        ][i],
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </div>
              ))
              .filter((_, i) => false)}
          </div>
        )}
      </div>

      {/* Volatility vs Growth */}
      <div style={mCard()}>
        <MCardHeader
          icon={<span style={{ fontSize: 14 }}>⊕</span>}
          title="Volatility vs Growth"
          badge="Sub-sectors"
          open={open.volatility}
          toggle={() => tog("volatility")}
        />
        {open.volatility && (
          <div
            style={{
              borderTop: `1px solid ${MB.borderSub}`,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <div style={{ fontSize: 10, color: MB.faint, fontFamily: "Inter,sans-serif", marginBottom: 12 }}>
              Risk-return profile · bubble size = market share
            </div>
            {subNames.slice(0, 5).map((name, i) => {
              const initials = name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              const growth = Math.round(74 - i * 12);
              const risk = Math.round(15 + i * 18);
              const share = subShare[i];
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "11px 0",
                    borderBottom: i < 4 ? `1px solid ${MB.borderSub}` : "none",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: `1px solid ${MB.borderSub}`,
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, color: MB.muted, fontFamily: "Inter,sans-serif" }}>
                      {initials}
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: MB.text,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {name}
                    </div>
                    <div style={{ fontSize: 10, color: MB.muted, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                      Growth <span style={{ color: MB.green, fontWeight: 700 }}>{growth}%</span> · Risk{" "}
                      <span style={{ color: MB.yellow, fontWeight: 700 }}>{risk}%</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
                    {share}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 30-Day Engagement */}
      <div style={mCard()}>
        <MCardHeader
          icon={<Zap size={15} color={MB.accent} />}
          title="30-Day Engagement"
          badge="Live"
          open={open.engagement}
          toggle={() => tog("engagement")}
        />
        {open.engagement && (
          <div style={{ borderTop: `1px solid ${MB.borderSub}`, padding: "14px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[
                { l: "Active Signals", v: "1,692", d: "+56%" },
                { l: "Conversion", v: "1,423", d: "+43%" },
                { l: "Avg Duration", v: "11,992", d: "+28%" },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 10,
                    padding: "12px 10px",
                    border: `1px solid ${MB.borderSub}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: MB.text,
                      fontFamily: "Inter,sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    {m.v}
                  </div>
                  <div style={{ fontSize: 8, color: MB.muted, fontFamily: "Inter,sans-serif", marginTop: 4 }}>
                    {m.l}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: MB.green,
                      fontFamily: "Inter,sans-serif",
                      marginTop: 6,
                    }}
                  >
                    {m.d}
                  </div>
                </div>
              ))}
            </div>
            {/* Mini bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 64, overflow: "hidden" }}>
              {engData.map((d, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: i === engData.length - 4 ? MB.accent : `rgba(76,175,122,${0.15 + d.y / 200})`,
                    borderRadius: "2px 2px 0 0",
                    height: `${d.y}%`,
                    minWidth: 3,
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              {["Feb 5", "Feb 15", "Feb 25", "Mar 1"].map((l) => (
                <span key={l} style={{ fontSize: 8, color: MB.faint, fontFamily: "Inter,sans-serif" }}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// DASHBOARD PAGE  (all-sectors at a glance)
// ═══════════════════════════════════════════════════════════════════════
function DashboardPage({ sector, setSector }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  const topScore = sorted[0];
  return (
    <div
      className="hs"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "14px 14px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ ...mCard(), padding: "16px" }}>
        <div style={{ ...mLabel, marginBottom: 10 }}>Platform Summary</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { l: "Sectors", v: "12" },
            { l: "Ventures", v: "174" },
            { l: "Top Score", v: `${topScore.score}` },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                padding: "12px",
                border: `1px solid ${MB.borderSub}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
                {m.v}
              </div>
              <div style={{ fontSize: 9, color: MB.muted, marginTop: 4, fontFamily: "Inter,sans-serif" }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...mLabel }}>All Sectors · Score Ranked</div>
      <div style={mCard()}>
        {sorted.map((s, i) => {
          const act = s.id === sector.id;
          return (
            <div
              key={s.id}
              onClick={() => setSector(s)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderBottom: i < sorted.length - 1 ? `1px solid ${MB.borderSub}` : "none",
                cursor: "pointer",
                background: act ? "rgba(184,217,53,0.04)" : "transparent",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: act ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: `1px solid ${act ? MB.border : MB.borderSub}`,
                }}
              >
                {s.svgIcon(act ? MB.accent : MB.faint, 14)}
              </div>
              <span
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: act ? 600 : 400,
                  color: act ? MB.text : "rgba(255,255,255,0.65)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {s.short}
              </span>
              <div
                style={{ width: 60, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, flexShrink: 0 }}
              >
                <div
                  style={{
                    width: `${s.score}%`,
                    height: "100%",
                    background: act ? MB.accent : MB.accentDim,
                    borderRadius: 2,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: act ? MB.accent : s.score >= 88 ? MB.accentDim : "rgba(255,255,255,0.25)",
                  fontFamily: "Inter,sans-serif",
                  width: 22,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {s.score}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// OVERVIEW PAGE
// ═══════════════════════════════════════════════════════════════════════
function OverviewPage({ sector }) {
  return (
    <div
      className="hs"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "14px 14px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ ...mCard(), padding: "20px" }}>
        <div style={{ ...mLabel, marginBottom: 12 }}>Sector Overview</div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
          <MRing score={sector.score} size={88} stroke={8} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: MB.text, letterSpacing: "-.4px", lineHeight: 1.15 }}>
              {sector.short}
            </div>
            <div style={{ fontSize: 11, color: MB.muted, marginTop: 4, lineHeight: 1.4 }}>{sector.full}</div>
            <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 20,
                  background: MB.greenDim,
                  color: MB.green,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Bullish
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 20,
                  background: "rgba(184,217,53,0.1)",
                  color: MB.accent,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Active
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { l: "Cap Range", v: `$${sector.capLow}–${sector.capHigh}M` },
            { l: "Sub-sectors", v: `${sector.subSectors.length} segments` },
            { l: "Key Players", v: `${sector.keyPlayers.length} tracked` },
            { l: "Activities", v: `${sector.activity.length} events` },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 11,
                padding: "12px",
                border: `1px solid ${MB.borderSub}`,
              }}
            >
              <div style={{ ...mLabel, fontSize: 8, marginBottom: 5 }}>{m.l}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...mLabel }}>Sub-sectors</div>
      <div style={mCard()}>
        {sector.subSectors.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderBottom: i < sector.subSectors.length - 1 ? `1px solid ${MB.borderSub}` : "none",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: MB.accent, flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: MB.text, flex: 1 }}>{s.name}</span>
            <ChevronRight size={13} color={MB.faint} />
          </div>
        ))}
      </div>
      <div style={{ ...mLabel }}>Highlights</div>
      {sector.activity.slice(0, 2).map((a, i) => (
        <div key={i} style={{ ...mCard(), padding: "14px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: MB.text, lineHeight: 1.35, marginBottom: 6 }}>{a.h}</div>
          <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
            <span
              style={{
                fontSize: 9,
                padding: "2px 8px",
                borderRadius: 10,
                background: a.sig === "Bullish" ? MB.greenDim : MB.yellowDim,
                color: a.sig === "Bullish" ? MB.green : MB.yellow,
                fontWeight: 700,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {a.sig}
            </span>
            <span style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// RESOURCES PAGE
// ═══════════════════════════════════════════════════════════════════════
function ResourcesPage({ sector }) {
  const reports = [
    { title: `${sector.short} Sector Analysis 2026`, type: "Report", pages: 42, updated: "Mar 2026" },
    { title: `${sector.short} Investment Brief`, type: "Brief", pages: 12, updated: "Feb 2026" },
    { title: "BRIDGE Integrated Assessment Framework", type: "Framework", pages: 88, updated: "Jan 2026" },
    { title: `${sector.short} Market Intelligence`, type: "Intelligence", pages: 24, updated: "Mar 2026" },
  ];
  return (
    <div
      className="hs"
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "14px 14px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ ...mCard(), padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "rgba(184,217,53,0.08)",
            border: `1px solid ${MB.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <BookOpen size={18} color={MB.accent} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Resources & Reports</div>
          <div style={{ fontSize: 10, color: MB.muted, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
            {sector.short} · {reports.length} documents
          </div>
        </div>
      </div>
      <div style={{ ...mLabel }}>Documents</div>
      {reports.map((r, i) => (
        <div
          key={i}
          style={{
            ...mCard(),
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 38,
              height: 46,
              borderRadius: 8,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${MB.borderSub}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FileText size={16} color={MB.faint} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: MB.text,
                lineHeight: 1.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {r.title}
            </div>
            <div style={{ display: "flex", gap: 7, marginTop: 5, alignItems: "center" }}>
              <span
                style={{
                  fontSize: 9,
                  padding: "2px 8px",
                  borderRadius: 10,
                  background: "rgba(184,217,53,0.08)",
                  color: MB.accentDim,
                  fontWeight: 700,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {r.type}
              </span>
              <span style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif" }}>
                {r.pages}p · {r.updated}
              </span>
            </div>
          </div>
          <ChevronRight size={13} color={MB.faint} />
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// DETAIL BOTTOM SHEET
// ═══════════════════════════════════════════════════════════════════════
function MobileDetailSheet({ item, onClose }) {
  const sec = item.sectorObj;
  const sigC = (s) => (s === "Bullish" ? MB.green : s === "Watch" ? MB.yellow : MB.red);
  const sigBG = (s) => (s === "Bullish" ? MB.greenDim : s === "Watch" ? MB.yellowDim : MB.redDim);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 50 }} />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "82vh",
          background: MB.card,
          borderRadius: "22px 22px 0 0",
          zIndex: 51,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 -16px 60px rgba(0,0,0,0.5)",
          border: `1px solid ${MB.border}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} />
        </div>
        <div
          style={{
            padding: "10px 18px 14px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background: "rgba(184,217,53,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: `1px solid ${MB.border}`,
            }}
          >
            <sec.icon size={22} color={MB.accent} strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: MB.text,
                letterSpacing: "-.4px",
                lineHeight: 1.15,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.name}
            </div>
            <div style={{ fontSize: 10, color: MB.muted, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
              {sec.short} · {item.category}
            </div>
          </div>
          <MRing score={item.score} size={44} stroke={4} />
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              color: MB.muted,
              flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>
        <div className="hs" style={{ flex: 1, overflowY: "auto", padding: "16px 18px 24px" }}>
          {item.ticker && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, marginBottom: 14 }}>
              {[
                { l: "Ticker", v: item.ticker },
                { l: "Market Cap", v: item.cap },
                { l: "Change", v: item.change, col: item.change?.startsWith("+") ? MB.green : MB.red },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 11,
                    padding: "10px",
                    border: `1px solid ${MB.borderSub}`,
                  }}
                >
                  <div style={{ ...mLabel, fontSize: 8, marginBottom: 4 }}>{m.l}</div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: m.col || MB.text, fontFamily: "Inter,sans-serif" }}
                  >
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "5px 12px",
                borderRadius: 20,
                background: sigBG(item.signal),
                color: sigC(item.signal),
                fontFamily: "Inter,sans-serif",
              }}
            >
              {item.signal}
            </span>
          </div>
          <div style={{ ...mLabel, marginBottom: 10 }}>Sector Activity</div>
          {sec.activity.slice(0, 4).map((a, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: `1px solid ${MB.borderSub}` }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: sigC(a.sig),
                  marginTop: 4,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: MB.text, lineHeight: 1.4, fontWeight: 500 }}>{a.h}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 3, alignItems: "center" }}>
                  <span style={{ fontSize: 9, color: sigC(a.sig), fontWeight: 700, fontFamily: "Inter,sans-serif" }}>
                    {a.sig}
                  </span>
                  <span style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: MB.text,
                      marginLeft: "auto",
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
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MOBILE APP ROOT
// ═══════════════════════════════════════════════════════════════════════
function MobileApp() {
  const [sector, setSector] = useState(SECTORS[0]);
  const [page, setPage] = useState("watch");
  const [selId, setSelId] = useState(null);
  const handleSetSector = (s) => {
    setSector(s);
    setSelId(null);
  };
  const selectedItem = selId ? ALL.find((i) => i.id === selId) : null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: MB.bg,
        fontFamily: "'DM Sans',Inter,sans-serif",
      }}
    >
      <style>{`
      @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
      @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
      .sp{animation:spin 1s linear infinite}
      .drawer{animation:slideUp 0.25s ease}
      .hs::-webkit-scrollbar{display:none}.hs{scrollbar-width:none}
      *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    `}</style>
      <MobileHeader sector={sector} setSector={handleSetSector} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
        {page === "dashboard" && <DashboardPage sector={sector} setSector={handleSetSector} />}
        {page === "overview" && <OverviewPage sector={sector} />}
        {page === "analytics" && <AnalyticsPage sector={sector} />}
        {page === "watch" && <WatchPage sector={sector} setSelId={setSelId} />}
        {page === "resources" && <ResourcesPage sector={sector} />}
      </div>
      <MobileBottomNav page={page} setPage={setPage} />
      {selectedItem && <MobileDetailSheet item={selectedItem} onClose={() => setSelId(null)} />}
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────
export default function App() {
  const w = useWindowWidth();
  const [sector, setSector] = useState(SECTORS[0]);
  const [collapsed, setCollapsed] = useState(false);
  const [listTab, setListTab] = useState("listed");
  const [selId, setSelId] = useState(ALL[0]?.id || null);
  const [syncing, setSyncing] = useState(false);

  const handleSetSector = (sec) => {
    setSector(sec);
    const first = ALL.find((i) => i.sectorObj.id === sec.id);
    if (first) setSelId(first.id);
  };

  // Render mobile layout when viewport < 768 OR when in narrow artifact preview
  if (w < 900) return <MobileApp />;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: C.bg,
        fontFamily: "'DM Sans',Inter,sans-serif",
      }}
    >
      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:#E5E7EB;border-radius:4px}`}</style>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} active={sector} setActive={handleSetSector} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <TopNav sector={sector} syncing={syncing} setSyncing={setSyncing} />
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <LeftPanel sector={sector} selId={selId} setSelId={setSelId} tab={listTab} setTab={setListTab} />
          <RightPanel selId={selId} setSelId={setSelId} />
        </div>
        <StatusBar activeLabel={sector.full} />
      </div>
    </div>
  );
}
