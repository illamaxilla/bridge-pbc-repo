import { useState, useEffect } from "react";
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
  BarChart3,
  TrendingUp,
  RefreshCw,
  Plus,
  LayoutGrid,
  BookOpen,
  Activity,
  Bookmark,
  Settings,
  ArrowUpRight,
  MoreHorizontal,
  Download,
  Maximize2,
  Database,
  Target,
  Eye,
  FileBarChart,
  Book,
  LogOut,
  Zap,
  Building2,
  Globe,
  LineChart,
  Radio,
} from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
  sidebar: "#0D1F12",
  sideAct: "rgba(184,217,53,0.1)",
  sideHov: "#1A2E1F",
  green: "#16A34A",
  red: "#DC2626",
  yellow: "#CA8A04",
  orange: "#F59E0B",
  tealAlt: "#10B981",
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
    id: "infrastructure",
    svgIcon: sectorSvgIcons[0],
    icon: Blocks,
    short: "Infrastructure",
    full: "Infrastructure & Basic Services",
    score: 87,
    capLow: 15,
    capHigh: 28,
    irrHigh: 20,
    color: "#1B4D3E",
    subSectors: [
      { name: "Roads & Bridges", pct: 38 },
      { name: "Water & Sanitation", pct: 26 },
      { name: "Digital Infra", pct: 18 },
      { name: "Energy Grid", pct: 12 },
      { name: "Other", pct: 6 },
    ],
    keyPlayers: [
      { name: "Ghana Highways Auth.", ticker: "GHA", score: 87, cap: "$2.4B", capNum: 2400, change: "+3.2%" },
      { name: "GWCL", ticker: "GWC", score: 79, cap: "$880M", capNum: 880, change: "+1.4%" },
      { name: "Ghana Grid Co.", ticker: "GGC", score: 74, cap: "$1.1B", capNum: 1100, change: "-0.6%" },
      { name: "Jospong Group", ticker: "JSP", score: 82, cap: "$640M", capNum: 640, change: "+2.8%" },
      { name: "Amandi Energy", ticker: "AME", score: 71, cap: "$420M", capNum: 420, change: "+0.9%" },
    ],
    activity: [
      { h: "$2.4B Road Infrastructure Budget", sig: "Bullish", date: "Mar 2026", cat: "Budget" },
      { h: "WADB Water Systems Grant", sig: "Bullish", date: "Feb 2026", cat: "Finance" },
      { h: "Accra Flooding — Infrastructure Risk", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "5G Rollout Phase 2 Confirmed", sig: "Bullish", date: "Dec 2025", cat: "Launch" },
    ],
  },
  {
    id: "financial",
    svgIcon: sectorSvgIcons[1],
    icon: Wallet,
    short: "Financial",
    full: "Financial Inclusion & Economic Security",
    score: 91,
    capLow: 10,
    capHigh: 20,
    irrHigh: 25,
    color: "#2E5A4D",
    subSectors: [
      { name: "Digital Lending", pct: 40 },
      { name: "Mobile Money", pct: 25 },
      { name: "Insurance", pct: 18 },
      { name: "Susu Networks", pct: 12 },
      { name: "Other", pct: 5 },
    ],
    keyPlayers: [
      { name: "Fidelity Bank Ghana", ticker: "FBG", score: 91, cap: "$1.4B", capNum: 1400, change: "+6.1%" },
      { name: "MTN MoMo", ticker: "MTN", score: 88, cap: "$3.2B", capNum: 3200, change: "+3.5%" },
      { name: "Stanbic IBTC", ticker: "SIB", score: 76, cap: "$620M", capNum: 620, change: "+0.9%" },
      { name: "CalBank Ghana", ticker: "CAL", score: 71, cap: "$310M", capNum: 310, change: "-0.4%" },
      { name: "Zeepay", ticker: "ZPY", score: 83, cap: "$280M", capNum: 280, change: "+2.2%" },
    ],
    activity: [
      { h: "Bank of Ghana Digital Credit Directive", sig: "Bullish", date: "Mar 2026", cat: "Policy" },
      { h: "MoMo Interoperability Live", sig: "Bullish", date: "Jan 2026", cat: "Launch" },
      { h: "SME Financing Gap Widens", sig: "Watch", date: "Feb 2026", cat: "Risk" },
      { h: "Ghana #1 GSMA MoMo Index", sig: "Bullish", date: "Nov 2025", cat: "Rankings" },
    ],
  },
  {
    id: "health",
    svgIcon: sectorSvgIcons[2],
    icon: Cross,
    short: "Health",
    full: "Health Systems & Wellbeing",
    score: 83,
    capLow: 8,
    capHigh: 16,
    irrHigh: 22,
    color: "#3D6B58",
    subSectors: [
      { name: "Primary Care", pct: 32 },
      { name: "Supply Chain", pct: 28 },
      { name: "Digital Health", pct: 20 },
      { name: "Diagnostics", pct: 12 },
      { name: "Health Finance", pct: 8 },
    ],
    keyPlayers: [
      { name: "Tobinco Pharma", ticker: "TBP", score: 83, cap: "$620M", capNum: 620, change: "+3.8%" },
      { name: "mPharma Dist.", ticker: "MPD", score: 79, cap: "$340M", capNum: 340, change: "+2.1%" },
      { name: "NHIA Digital", ticker: "NHD", score: 74, cap: "$180M", capNum: 180, change: "+0.6%" },
      { name: "Nyaho Medical", ticker: "NYH", score: 81, cap: "$150M", capNum: 150, change: "+4.1%" },
      { name: "LifeStore Pharma", ticker: "LSP", score: 72, cap: "$95M", capNum: 95, change: "+1.2%" },
    ],
    activity: [
      { h: "NHIA Expands Digital Claims Processing", sig: "Bullish", date: "Feb 2026", cat: "Digital" },
      { h: "GH 8.2B Health Allocation +12% YoY", sig: "Bullish", date: "Mar 2026", cat: "Budget" },
      { h: "Workforce Gap: 40k Workers Needed", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "NHIA Coverage Reaches 38%", sig: "Watch", date: "Dec 2025", cat: "Coverage" },
    ],
  },
  {
    id: "technology",
    svgIcon: sectorSvgIcons[3],
    icon: Cpu,
    short: "Technology",
    full: "Technology & Innovation",
    score: 89,
    capLow: 8,
    capHigh: 15,
    irrHigh: 30,
    color: "#4A7A65",
    subSectors: [
      { name: "Platforms", pct: 35 },
      { name: "VC/Fund", pct: 28 },
      { name: "Talent Pool", pct: 18 },
      { name: "FinTech", pct: 12 },
      { name: "Other", pct: 7 },
    ],
    keyPlayers: [
      { name: "Hubtel Ghana", ticker: "HBT", score: 89, cap: "$950M", capNum: 950, change: "+8.4%" },
      { name: "mPharma", ticker: "MPH", score: 82, cap: "$520M", capNum: 520, change: "+3.2%" },
      { name: "Zeepay", ticker: "ZPY", score: 77, cap: "$280M", capNum: 280, change: "+1.1%" },
      { name: "Dash Ghana", ticker: "DSH", score: 74, cap: "$190M", capNum: 190, change: "-0.8%" },
      { name: "Turntabl", ticker: "TTB", score: 86, cap: "$145M", capNum: 145, change: "+5.2%" },
    ],
    activity: [
      { h: "Kejetia Phase 2 — 3,000 New Vendors", sig: "Bullish", date: "Mar 2026", cat: "Launch" },
      { h: "Ghana Joins Smart Africa Alliance", sig: "Bullish", date: "Feb 2026", cat: "Policy" },
      { h: "Series A Desert — Only 2 Deals", sig: "Watch", date: "Jan 2026", cat: "Investment" },
      { h: "Ghana Leads West Africa Funding", sig: "Bullish", date: "Dec 2025", cat: "Funding" },
    ],
  },
  {
    id: "education",
    svgIcon: sectorSvgIcons[4],
    icon: GraduationCap,
    short: "Education",
    full: "Education & Skills",
    score: 85,
    capLow: 6,
    capHigh: 12,
    irrHigh: 20,
    color: "#5A8C78",
    subSectors: [
      { name: "TVET", pct: 30 },
      { name: "EdTech", pct: 25 },
      { name: "Higher Ed", pct: 22 },
      { name: "Early Childhood", pct: 14 },
      { name: "Other", pct: 9 },
    ],
    keyPlayers: [
      { name: "Ghana Ed Trust Fund", ticker: "GET", score: 85, cap: "$480M", capNum: 480, change: "+2.9%" },
      { name: "Ashesi University", ticker: "ASH", score: 82, cap: "$220M", capNum: 220, change: "+4.1%" },
      { name: "Eneza Education", ticker: "ENZ", score: 74, cap: "$95M", capNum: 95, change: "+1.8%" },
      { name: "Injini Ghana", ticker: "INJ", score: 71, cap: "$62M", capNum: 62, change: "+0.4%" },
      { name: "KNUST Ventures", ticker: "KNV", score: 79, cap: "$310M", capNum: 310, change: "+3.2%" },
    ],
    activity: [
      { h: "Free SHS Policy Extended to TVET", sig: "Bullish", date: "Mar 2026", cat: "Policy" },
      { h: "Ghana-MIT EdTech Partnership", sig: "Bullish", date: "Feb 2026", cat: "Launch" },
      { h: "Teacher Shortage: 28k Gap", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "Literacy Rate Hits 82%", sig: "Bullish", date: "Dec 2025", cat: "Data" },
    ],
  },
  {
    id: "agriculture",
    svgIcon: sectorSvgIcons[5],
    icon: Sprout,
    short: "Agriculture",
    full: "Agriculture & Value Chains",
    score: 90,
    capLow: 12,
    capHigh: 22,
    irrHigh: 25,
    color: "#6B9E8A",
    subSectors: [
      { name: "Processing", pct: 35 },
      { name: "Cold Chain", pct: 25 },
      { name: "Aggregation", pct: 20 },
      { name: "AgTech", pct: 12 },
      { name: "Other", pct: 8 },
    ],
    keyPlayers: [
      { name: "Cocoa Processing Co.", ticker: "CPC", score: 88, cap: "$2.1B", capNum: 2100, change: "+4.2%" },
      { name: "AgriTech Ghana", ticker: "ATG", score: 81, cap: "$840M", capNum: 840, change: "+1.8%" },
      { name: "Northern Farms Ltd", ticker: "NFL", score: 73, cap: "$310M", capNum: 310, change: "-0.4%" },
      { name: "FreshPak Ghana", ticker: "FPK", score: 79, cap: "$220M", capNum: 220, change: "+2.1%" },
      { name: "GhanaFeed Corp", ticker: "GFC", score: 68, cap: "$180M", capNum: 180, change: "+0.3%" },
    ],
    activity: [
      { h: "Post-Harvest Loss Brief Published", sig: "Bullish", date: "Feb 2026", cat: "Policy" },
      { h: "PFJ Phase 3 Budget Confirmed", sig: "Bullish", date: "Mar 2026", cat: "Policy" },
      { h: "2024 Drought — 436k Farmers Affected", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "Cocoa Exports Hit $372.6M", sig: "Bullish", date: "Jan 2026", cat: "Earnings" },
    ],
  },
  {
    id: "sports",
    svgIcon: sectorSvgIcons[6],
    icon: Camera,
    short: "Creative",
    full: "Sports, Entertainment & Creative",
    score: 78,
    capLow: 4,
    capHigh: 9,
    irrHigh: 28,
    color: "#7DB89A",
    subSectors: [
      { name: "Music & Media", pct: 36 },
      { name: "Sports", pct: 28 },
      { name: "Film", pct: 18 },
      { name: "Gaming", pct: 12 },
      { name: "Other", pct: 6 },
    ],
    keyPlayers: [
      { name: "Ghallywood Studios", ticker: "GWS", score: 78, cap: "$180M", capNum: 180, change: "+5.6%" },
      { name: "Afrobeats Ventures", ticker: "AFV", score: 74, cap: "$95M", capNum: 95, change: "+3.1%" },
      { name: "Ghana FA Holdings", ticker: "GFA", score: 69, cap: "$140M", capNum: 140, change: "+1.2%" },
      { name: "Pidgen Music", ticker: "PGM", score: 81, cap: "$72M", capNum: 72, change: "+7.4%" },
      { name: "Accra Lions FC", ticker: "ALF", score: 65, cap: "$55M", capNum: 55, change: "-0.3%" },
    ],
    activity: [
      { h: "Afrobeats Streaming +220% YoY", sig: "Bullish", date: "Mar 2026", cat: "Market" },
      { h: "$50M Creative Economy Fund", sig: "Bullish", date: "Feb 2026", cat: "Finance" },
      { h: "IP Protection Gap — Enforcement Weak", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "Ghana Film Commission Launched", sig: "Bullish", date: "Dec 2025", cat: "Launch" },
    ],
  },
  {
    id: "housing",
    svgIcon: sectorSvgIcons[7],
    icon: Home,
    short: "Housing",
    full: "Housing & Real Estate",
    score: 82,
    capLow: 10,
    capHigh: 18,
    irrHigh: 22,
    color: "#8DC4AA",
    subSectors: [
      { name: "Affordable Housing", pct: 38 },
      { name: "Commercial", pct: 26 },
      { name: "PropTech", pct: 16 },
      { name: "Rental Market", pct: 12 },
      { name: "Other", pct: 8 },
    ],
    keyPlayers: [
      { name: "Regimanuel Gray", ticker: "RGH", score: 82, cap: "$620M", capNum: 620, change: "+3.4%" },
      { name: "Devtraco Ghana", ticker: "DVT", score: 78, cap: "$440M", capNum: 440, change: "+2.1%" },
      { name: "SSNIT Housing", ticker: "SSH", score: 74, cap: "$1.2B", capNum: 1200, change: "+0.8%" },
      { name: "Affordable Homes GH", ticker: "AHG", score: 71, cap: "$280M", capNum: 280, change: "-0.2%" },
      { name: "HomeFinance GH", ticker: "HFG", score: 76, cap: "$190M", capNum: 190, change: "+1.6%" },
    ],
    activity: [
      { h: "National Housing Authority Digital Registry", sig: "Bullish", date: "Mar 2026", cat: "Digital" },
      { h: "2M Unit Deficit — Investment Urgency", sig: "Bullish", date: "Feb 2026", cat: "Market" },
      { h: "Land Title Disputes Still Prevalent", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "Mortgage Market Grows 14% YoY", sig: "Bullish", date: "Dec 2025", cat: "Earnings" },
    ],
  },
  {
    id: "tourism",
    svgIcon: sectorSvgIcons[8],
    icon: Luggage,
    short: "Tourism",
    full: "Tourism & Hospitality",
    score: 76,
    capLow: 5,
    capHigh: 11,
    irrHigh: 24,
    color: "#9DD0BB",
    subSectors: [
      { name: "Heritage Tourism", pct: 32 },
      { name: "Hospitality", pct: 28 },
      { name: "Eco-Tourism", pct: 20 },
      { name: "MICE", pct: 12 },
      { name: "Other", pct: 8 },
    ],
    keyPlayers: [
      { name: "Ghana Tourism Auth.", ticker: "GTA", score: 76, cap: "$340M", capNum: 340, change: "+4.2%" },
      { name: "Kempinski Accra", ticker: "KMP", score: 74, cap: "$280M", capNum: 280, change: "+2.8%" },
      { name: "Ecobank Tourism Fund", ticker: "ETF", score: 70, cap: "$160M", capNum: 160, change: "+1.4%" },
      { name: "Labadi Beach Hotel", ticker: "LBH", score: 72, cap: "$120M", capNum: 120, change: "+0.6%" },
      { name: "Heritage Holdings", ticker: "HHL", score: 68, cap: "$95M", capNum: 95, change: "-0.4%" },
    ],
    activity: [
      { h: "Year of Return 2.0 Initiative", sig: "Bullish", date: "Mar 2026", cat: "Policy" },
      { h: "Accra Airport Expansion Complete", sig: "Bullish", date: "Feb 2026", cat: "Launch" },
      { h: "Visa Processing Backlog — Risk", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "Diaspora Tourism Arrivals +38%", sig: "Bullish", date: "Dec 2025", cat: "Data" },
    ],
  },
  {
    id: "energy",
    svgIcon: sectorSvgIcons[9],
    icon: BatteryCharging,
    short: "Energy",
    full: "Energy & Renewable Resources",
    score: 88,
    capLow: 12,
    capHigh: 22,
    irrHigh: 22,
    color: "#B8D935",
    subSectors: [
      { name: "Solar", pct: 40 },
      { name: "Clean Cooking", pct: 22 },
      { name: "Mini-Grid", pct: 18 },
      { name: "Training", pct: 12 },
      { name: "Other", pct: 8 },
    ],
    keyPlayers: [
      { name: "BXC Solar Ghana", ticker: "BXC", score: 88, cap: "$1.1B", capNum: 1100, change: "+5.6%" },
      { name: "Energy Access Fund", ticker: "EAF", score: 80, cap: "$440M", capNum: 440, change: "+2.2%" },
      { name: "GridCo Ghana", ticker: "GCG", score: 71, cap: "$890M", capNum: 890, change: "-1.4%" },
      { name: "Cenpower Gen.", ticker: "CPG", score: 76, cap: "$530M", capNum: 530, change: "+0.8%" },
      { name: "Volta River Auth.", ticker: "VRA", score: 69, cap: "$720M", capNum: 720, change: "-0.6%" },
    ],
    activity: [
      { h: "Solar Park 200MW→1GW Expansion", sig: "Bullish", date: "Mar 2026", cat: "Expansion" },
      { h: "$200M Clean Cooking Outcome Bond", sig: "Bullish", date: "Feb 2026", cat: "Finance" },
      { h: "Dumsor Returns — Business Losses", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "Solar Costs Down 89% Since 2010", sig: "Bullish", date: "Dec 2025", cat: "Market" },
    ],
  },
  {
    id: "manufacturing",
    svgIcon: sectorSvgIcons[10],
    icon: Factory,
    short: "Manufacturing",
    full: "Manufacturing & Light Industry",
    score: 81,
    capLow: 8,
    capHigh: 16,
    irrHigh: 22,
    color: "#C9E44A",
    subSectors: [
      { name: "Food Processing", pct: 35 },
      { name: "Textiles", pct: 22 },
      { name: "Pharma Mfg", pct: 18 },
      { name: "Metal Fabrication", pct: 15 },
      { name: "Other", pct: 10 },
    ],
    keyPlayers: [
      { name: "Accra Breweries", ticker: "ABL", score: 81, cap: "$920M", capNum: 920, change: "+3.6%" },
      { name: "PZ Cussons Ghana", ticker: "PZC", score: 77, cap: "$480M", capNum: 480, change: "+1.8%" },
      { name: "Kasapreko Co.", ticker: "KSP", score: 74, cap: "$310M", capNum: 310, change: "+2.4%" },
      { name: "Aluworks Ghana", ticker: "ALW", score: 68, cap: "$140M", capNum: 140, change: "-0.8%" },
      { name: "Qualiplast Ghana", ticker: "QPL", score: 72, cap: "$95M", capNum: 95, change: "+1.1%" },
    ],
    activity: [
      { h: "Ghana Industrial Zone Expansion", sig: "Bullish", date: "Mar 2026", cat: "Policy" },
      { h: "AfCFTA — Manufacturing Export Surge", sig: "Bullish", date: "Feb 2026", cat: "Market" },
      { h: "Energy Cost Squeezing Margins", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "1D1F — 120 Factories Now Operational", sig: "Bullish", date: "Dec 2025", cat: "Launch" },
    ],
  },
  {
    id: "transportation",
    svgIcon: sectorSvgIcons[11],
    icon: Truck,
    short: "Transport",
    full: "Transportation & Logistics",
    score: 79,
    capLow: 7,
    capHigh: 14,
    irrHigh: 21,
    color: "#D4EC6E",
    subSectors: [
      { name: "Road Freight", pct: 38 },
      { name: "Port & Shipping", pct: 28 },
      { name: "Air Cargo", pct: 16 },
      { name: "Last-Mile", pct: 12 },
      { name: "Other", pct: 6 },
    ],
    keyPlayers: [
      { name: "GPHA", ticker: "GPH", score: 79, cap: "$1.4B", capNum: 1400, change: "+2.8%" },
      { name: "Ghana Airports Co.", ticker: "GAC", score: 75, cap: "$680M", capNum: 680, change: "+1.6%" },
      { name: "Freight Systems GH", ticker: "FSG", score: 71, cap: "$220M", capNum: 220, change: "+0.4%" },
      { name: "Koala Shopping Logistics", ticker: "KSL", score: 73, cap: "$140M", capNum: 140, change: "+2.1%" },
      { name: "Abubakar Sadiq Trans.", ticker: "AST", score: 68, cap: "$95M", capNum: 95, change: "-0.6%" },
    ],
    activity: [
      { h: "Tema Port Expansion — Capacity +40%", sig: "Bullish", date: "Mar 2026", cat: "Launch" },
      { h: "E-Levy Logistics Exemption Passed", sig: "Bullish", date: "Feb 2026", cat: "Policy" },
      { h: "Road Freight Costs Up 18%", sig: "Watch", date: "Jan 2026", cat: "Risk" },
      { h: "Air Cargo Volume +24% YoY", sig: "Bullish", date: "Dec 2025", cat: "Data" },
    ],
  },
];

const sigCol = (s) => (s === "Bullish" ? C.green : s === "Bearish" ? C.red : C.yellow);
const heatVal = (day, hour, seed) =>
  Math.max(
    5,
    Math.min(
      98,
      Math.round(50 + Math.sin(day * 2.3 + hour * 1.7 + seed * 0.1) * 30 + Math.sin(day * 0.9 + hour * 2.1) * 18),
    ),
  );
const heatColor = (val, col) =>
  val < 20 ? "#F3F4F6" : val < 40 ? `${col}30` : val < 65 ? `${col}70` : val < 82 ? `${col}BB` : col;

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

function Sidebar({
  collapsed,
  setCollapsed,
  activePage,
  onNavChange,
  activeSector,
  setActiveSector,
  onReturnToSite = () => {},
}) {
  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: (c) => <LayoutGrid size={16} color={c} /> },
    { id: "overview", label: "Market Overview", icon: (c) => <Activity size={16} color={c} /> },
    { id: "analytics", label: "Analytics", icon: (c) => <BarChart3 size={16} color={c} /> },
    { id: "watchlist", label: "Watchlist", icon: (c) => <Eye size={16} color={c} /> },
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
          const act = n.id === activePage;
          return (
            <div
              key={n.id}
              onClick={() => onNavChange(n.id)}
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
              onMouseEnter={(e) => {
                if (!act) e.currentTarget.style.background = C.sideHov;
              }}
              onMouseLeave={(e) => {
                if (!act) e.currentTarget.style.background = "transparent";
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
      {/* Return to Website */}
      {!collapsed ? (
        <div style={{ margin: "0 10px 6px", flexShrink: 0 }}>
          <button
            onClick={onReturnToSite}
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
            onClick={onReturnToSite}
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

function Card({ children, style: ex = {} }) {
  const [h, sH] = useState(false);
  return (
    <div
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #E5E7EB",
        boxShadow: h ? "0 6px 20px rgba(0,0,0,0.09)" : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "all .2s",
        minWidth: 0,
        overflow: "hidden",
        ...ex,
      }}
    >
      {children}
    </div>
  );
}

function TopNav({ s, syncing, setSyncing }) {
  const [notif, setNotif] = useState(false);
  const monthYear = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1400);
  };
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 56,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Analytics</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{monthYear}</div>
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
            border: "1px solid rgba(184,217,53,0.27)",
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
                      background: a.sig === "Bullish" ? C.green : C.yellow,
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
          <RefreshCw size={14} color={C.mid} className={syncing ? "aspin" : ""} />
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
  );
}

function PageHeader({ s, period, setPeriod, syncing, setSyncing }) {
  const [viewOpen, setViewOpen] = useState(false);
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        padding: "10px 20px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: C.accentBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BarChart3 size={16} color={C.primary} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>Sector Analytics</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>
            Deep-dive performance intelligence
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setViewOpen((o) => !o)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 10px",
              border: "1px solid #E5E7EB",
              borderRadius: 7,
              background: "#fff",
              fontSize: 11,
              color: C.mid,
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            View: Overview <ChevronDown size={10} color={C.muted} />
          </button>
          {viewOpen && (
            <div
              style={{
                position: "absolute",
                top: 34,
                left: 0,
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 9,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                zIndex: 20,
                overflow: "hidden",
                minWidth: 180,
              }}
            >
              {[
                "Overview",
                "Performance Deep-Dive",
                "Market Distribution",
                "Engagement & Activity",
                "Comparative Analysis",
              ].map((v, i) => (
                <div
                  key={i}
                  onClick={() => setViewOpen(false)}
                  style={{
                    padding: "8px 14px",
                    fontSize: 11,
                    color: i === 0 ? C.primary : C.mid,
                    fontWeight: i === 0 ? 700 : 400,
                    cursor: "pointer",
                    fontFamily: "Inter,sans-serif",
                    background: i === 0 ? C.accentBg : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (i !== 0) e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    if (i !== 0) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
          {["Daily", "Weekly", "Monthly", "Quarterly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: "4px 9px",
                borderRadius: 5,
                border: "none",
                background: period === p ? "#fff" : "transparent",
                fontSize: 10,
                fontWeight: 600,
                color: period === p ? C.primary : C.muted,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
                boxShadow: period === p ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
              }}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            border: "1px solid #E5E7EB",
            borderRadius: 7,
            background: "#fff",
            fontSize: 11,
            color: C.mid,
            cursor: "pointer",
            fontFamily: "Inter,sans-serif",
          }}
        >
          <RefreshCw size={11} /> Refresh
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            border: "1px solid #E5E7EB",
            borderRadius: 7,
            background: "#fff",
            fontSize: 11,
            color: C.mid,
            cursor: "pointer",
            fontFamily: "Inter,sans-serif",
          }}
        >
          <Download size={11} /> Export
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 11px",
            border: `1px solid ${C.accent}`,
            borderRadius: 7,
            background: C.accentBg,
            fontSize: 11,
            fontWeight: 700,
            color: C.primary,
            cursor: "pointer",
            fontFamily: "Inter,sans-serif",
          }}
        >
          <Plus size={11} /> Add Widget
        </button>
      </div>
    </div>
  );
}

function SparkCard({ label, value, sublabel, iconBg, iconEl, s, trend = "+5.1%", trendUp = true }) {
  const bars = Array.from({ length: 10 }, (_, i) => Math.round(30 + Math.sin(i * 1.1 + s.score * 0.04) * 30 + i * 3));
  const maxB = Math.max(...bars);
  return (
    <Card style={{ padding: "18px", display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 11,
              background: iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${s.color}22`,
              flexShrink: 0,
            }}
          >
            {iconEl}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{label}</div>
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{sublabel}</div>
          </div>
        </div>
        <button
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            border: "1px solid #E5E7EB",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <MoreHorizontal size={12} color={C.muted} />
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.dark, letterSpacing: "-1.5px", lineHeight: 1 }}>
            {value}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5 }}>
            <TrendingUp size={11} color={trendUp ? C.green : C.red} />
            <span
              style={{
                fontSize: 11,
                color: trendUp ? C.green : C.red,
                fontFamily: "Inter,sans-serif",
                fontWeight: 600,
              }}
            >
              {trend} vs last period
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 52, flexShrink: 0 }}>
          {bars.map((b, i) => (
            <div
              key={i}
              style={{
                width: 7,
                borderRadius: "3px 3px 0 0",
                background: i === bars.indexOf(maxB) ? s.color : `${s.color}33`,
                height: `${(b / maxB) * 100}%`,
                transition: "height .4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

function BubbleChart({ s }) {
  const [hov, setHov] = useState(null);
  const hexToRgba = (hex, a) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  };
  const alphas = [1, 0.78, 0.55, 0.38, 0.2];
  const xPositions = [0.12, 0.32, 0.52, 0.72, 0.9];
  const data = s.subSectors.map((ss, i) => ({
    x: xPositions[i],
    y: Math.round(ss.pct * 1.4 + 18),
    r: Math.max(22, Math.round(ss.pct * 3.0)),
    name: ss.name,
    abbr: ss.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 3),
    color: hexToRgba(s.color, alphas[i] || 0.2),
    pct: ss.pct,
    id: i,
  }));
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;
    const isHov = hov === payload.id;
    const r = isHov ? payload.r * 1.18 : payload.r;
    return (
      <g onMouseEnter={() => setHov(payload.id)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer" }}>
        <circle cx={cx} cy={cy} r={r} fill={payload.color} fillOpacity={0.78} stroke="#fff" strokeWidth={2.5} />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontSize={10}
          fill="#fff"
          fontWeight={700}
          fontFamily="Inter,sans-serif"
        >
          {payload.abbr}
        </text>
      </g>
    );
  };
  const CustomTip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0]?.payload;
    return (
      <div
        style={{
          background: "#111827",
          color: "#fff",
          borderRadius: 9,
          padding: "10px 14px",
          fontSize: 11,
          fontFamily: "Inter,sans-serif",
        }}
      >
        <div style={{ fontWeight: 700, color: C.accent, marginBottom: 6 }}>{d?.name}</div>
        <div style={{ color: "rgba(255,255,255,0.6)", marginBottom: 3 }}>
          Growth: <span style={{ color: "#fff", fontWeight: 600 }}>{d?.y}%</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)" }}>
          Market Share: <span style={{ color: "#fff", fontWeight: 600 }}>{d?.pct}%</span>
        </div>
      </div>
    );
  };
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Volatility vs Growth Rate</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
            Risk-return profile by sub-sector
          </div>
        </div>
        <button
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            border: "1px solid #E5E7EB",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <MoreHorizontal size={12} color={C.muted} />
        </button>
      </div>
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <div
          style={{
            position: "absolute",
            top: "6%",
            left: "5%",
            fontSize: 10,
            color: C.muted,
            opacity: 0.4,
            fontWeight: 600,
            pointerEvents: "none",
            fontFamily: "Inter,sans-serif",
          }}
        >
          High Growth · Low Risk
        </div>
        <div
          style={{
            position: "absolute",
            top: "6%",
            right: "4%",
            fontSize: 10,
            color: C.muted,
            opacity: 0.4,
            fontWeight: 600,
            pointerEvents: "none",
            fontFamily: "Inter,sans-serif",
            textAlign: "right",
          }}
        >
          High Growth · High Risk
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: "5%",
            fontSize: 10,
            color: C.muted,
            opacity: 0.4,
            fontWeight: 600,
            pointerEvents: "none",
            fontFamily: "Inter,sans-serif",
          }}
        >
          Low Growth · Low Risk
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            right: "4%",
            fontSize: 10,
            color: C.muted,
            opacity: 0.4,
            fontWeight: 600,
            pointerEvents: "none",
            fontFamily: "Inter,sans-serif",
            textAlign: "right",
          }}
        >
          Low Growth · High Risk
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 1.05]}
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              tickCount={6}
              axisLine={false}
              tickLine={false}
              label={{
                value: "← Lower Risk  ·  Higher Risk →",
                position: "insideBottom",
                offset: -18,
                fontSize: 9,
                fill: C.muted,
                fontFamily: "Inter,sans-serif",
              }}
            />
            <YAxis
              dataKey="y"
              type="number"
              domain={[0, 85]}
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTip />} cursor={{ stroke: "transparent" }} />
            <Scatter data={data} shape={<CustomDot />} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          paddingTop: 8,
          borderTop: "1px solid #F3F4F6",
          flexShrink: 0,
        }}
      >
        {s.subSectors.map((ss, i) => {
          const a = [1, 0.78, 0.55, 0.38, 0.2][i] || 0.2;
          const r2 = parseInt(s.color.slice(1, 3), 16),
            g2 = parseInt(s.color.slice(3, 5), 16),
            b2 = parseInt(s.color.slice(5, 7), 16);
          const col = `rgba(${r2},${g2},${b2},${a})`;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: col }} />
              <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{ss.name}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function DotMatrixChart({ s }) {
  const [hovered, setHovered] = useState(null);
  const [grouping, setGrouping] = useState("Monthly");
  const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const DOT = 12,
    GAP = 3,
    STEP = DOT + GAP,
    ROWS = 14,
    PAD_L = 36,
    PAD_B = 22,
    PAD_T = 10,
    COL = 52;
  const data = MONTHS.map((m, i) => {
    const actual = Math.min(
      ROWS - 1,
      Math.round(ROWS * 0.35 + Math.sin(i * 0.85 + s.score * 0.05) * ROWS * 0.18 + i * 0.5),
    );
    const insight = Math.min(ROWS, actual + Math.round(1 + Math.sin(i * 1.3 + s.score * 0.03) * 2));
    return {
      month: m,
      actual,
      insight,
      actualVal: Math.round(actual * 4800 + s.capLow * 1000),
      insightVal: Math.round(insight * 4800 + s.capLow * 1000),
    };
  });
  const svgH = ROWS * STEP + PAD_T + PAD_B;
  const chartH = ROWS * STEP;
  return (
    <Card style={{ padding: "14px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Performance Index</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
              <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>Actual</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: `${s.color}55`,
                  border: `1px solid ${s.color}88`,
                }}
              />
              <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>AI Projection</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 6, padding: 2 }}>
          {["Monthly", "Weekly"].map((g) => (
            <button
              key={g}
              onClick={() => setGrouping(g)}
              style={{
                padding: "3px 7px",
                borderRadius: 4,
                border: "none",
                background: grouping === g ? "#fff" : "transparent",
                fontSize: 9,
                fontWeight: 600,
                color: grouping === g ? C.primary : C.muted,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <svg
          width="100%"
          height={svgH}
          viewBox={`0 0 ${PAD_L + MONTHS.length * COL} ${svgH}`}
          style={{ overflow: "visible" }}
        >
          {[0, 4, 8, 12].map((row) => (
            <text
              key={row}
              x={PAD_L - 5}
              y={PAD_T + chartH - row * STEP + DOT / 2}
              textAnchor="end"
              fontSize={8}
              fill={C.muted}
              fontFamily="Inter,sans-serif"
              dominantBaseline="middle"
            >
              {Math.round(row * 4.8)}K
            </text>
          ))}
          {data.map((d, col) => {
            const cx = PAD_L + col * COL + COL / 2;
            const isHov = hovered === col;
            return (
              <g
                key={col}
                onMouseEnter={() => setHovered(col)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {isHov && (
                  <line
                    x1={cx}
                    y1={PAD_T}
                    x2={cx}
                    y2={PAD_T + chartH}
                    stroke={s.color}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    strokeOpacity={0.35}
                  />
                )}
                {Array.from({ length: d.insight }, (_, row) => {
                  const cy = PAD_T + chartH - row * STEP - DOT / 2;
                  const isActual = row < d.actual;
                  return (
                    <circle
                      key={row}
                      cx={cx}
                      cy={cy}
                      r={DOT / 2}
                      fill={isActual ? s.color : `${s.color}40`}
                      stroke={isActual ? "none" : `${s.color}55`}
                      strokeWidth={0.5}
                      opacity={isHov ? 1 : 0.9}
                    />
                  );
                })}
                <text
                  x={cx}
                  y={PAD_T + chartH + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fill={isHov ? C.primary : C.muted}
                  fontFamily="Inter,sans-serif"
                  fontWeight={isHov ? 700 : 400}
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
        {hovered !== null && (
          <div
            style={{
              position: "absolute",
              top: 6,
              left: `${(hovered / (MONTHS.length - 1)) * 72 + 6}%`,
              transform: "translateX(-50%)",
              background: "#111827",
              color: "#fff",
              borderRadius: 9,
              padding: "8px 12px",
              fontSize: 11,
              fontFamily: "Inter,sans-serif",
              zIndex: 10,
              pointerEvents: "none",
              minWidth: 120,
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 5, color: C.accent }}>{data[hovered]?.month}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.color }} />
              <span>
                Actual: <strong>{(data[hovered]?.actualVal / 1000).toFixed(1)}K</strong>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: `${s.color}66` }} />
              <span>
                Insight: <strong>{(data[hovered]?.insightVal / 1000).toFixed(1)}K</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function ActivityHeatmap({ s }) {
  const [hovCell, setHovCell] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const HOURS = ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"];
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Activity Heatmap</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
            Signal distribution by day & time
          </div>
        </div>
        <button
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            border: "1px solid #E5E7EB",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <MoreHorizontal size={12} color={C.muted} />
        </button>
      </div>
      <div style={{ display: "flex", marginLeft: 36, marginBottom: 3, flexShrink: 0 }}>
        {HOURS.map((h) => (
          <div
            key={h}
            style={{ flex: 1, fontSize: 8, color: C.muted, fontFamily: "Inter,sans-serif", textAlign: "center" }}
          >
            {h}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        {DAYS.map((day, di) => (
          <div key={di} style={{ display: "flex", alignItems: "center", gap: 3, flex: 1 }}>
            <div
              style={{
                width: 30,
                fontSize: 9,
                color: C.muted,
                fontFamily: "Inter,sans-serif",
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {day}
            </div>
            {HOURS.map((h, hi) => {
              const val = heatVal(di, hi, s.score);
              const isHov = hovCell?.di === di && hovCell?.hi === hi;
              return (
                <div
                  key={hi}
                  onMouseEnter={(e) => {
                    setHovCell({ di, hi, val, day, h });
                    setTooltip({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => setHovCell(null)}
                  style={{
                    flex: 1,
                    minHeight: 20,
                    borderRadius: 4,
                    background: heatColor(val, s.color),
                    border: isHov ? `1.5px solid ${s.color}` : "1.5px solid transparent",
                    transition: "all .15s",
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>Activity:</span>
        {[
          ["Low", "#F3F4F6"],
          ["Mid", `${s.color}55`],
          ["High", `${s.color}99`],
          ["Peak", s.color],
        ].map(([l, bg]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 14, height: 10, borderRadius: 2, background: bg, border: "1px solid #E5E7EB" }} />
            <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{l}</span>
          </div>
        ))}
      </div>
      {hovCell && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y - 80,
            left: tooltip.x + 12,
            background: "#111827",
            color: "#fff",
            borderRadius: 9,
            padding: "9px 13px",
            fontSize: 11,
            fontFamily: "Inter,sans-serif",
            zIndex: 200,
            pointerEvents: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ fontWeight: 700, color: C.accent, marginBottom: 4 }}>
            {hovCell.day} · {hovCell.h}:00
          </div>
          <div>
            Activity: <strong>{hovCell.val}</strong>/100
          </div>
        </div>
      )}
    </Card>
  );
}

function SourceBreakdown({ s }) {
  const totalAct = s.activity.length || 1;
  const earnCnt = s.activity.filter((a) => a.cat === "Earnings" || a.cat === "Policy").length;
  const newsCnt = s.activity.filter((a) => a.cat === "Launch" || a.cat === "Market" || a.cat === "Finance").length;
  const analCnt = totalAct - earnCnt - newsCnt;
  const hexToRgba2 = (hex, a) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  };
  const src1 = s.color;
  const src2 = hexToRgba2(s.color, 0.65);
  const src3 = hexToRgba2(s.color, 0.35);
  const sources = [
    {
      l: "Earnings Reports",
      v: Math.round((earnCnt / totalAct) * 100) || 48,
      count: Math.round(earnCnt * 2847 + 8000),
      color: src1,
    },
    {
      l: "News & Media",
      v: Math.round((newsCnt / totalAct) * 100) || 32,
      count: Math.round(newsCnt * 2100 + 5000),
      color: src2,
    },
    {
      l: "Analyst Ratings",
      v: Math.round((analCnt / totalAct) * 100) || 20,
      count: Math.round(analCnt * 1800 + 2000),
      color: src3,
    },
  ];
  const tot = sources.reduce((a, x) => a + x.v, 0);
  const normed = sources.map((x) => ({ ...x, v: Math.round((x.v / tot) * 100) }));
  return (
    <Card style={{ padding: "16px 18px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Analytics by Signal Source</div>
        <button
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            border: "1px solid #E5E7EB",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <MoreHorizontal size={12} color={C.muted} />
        </button>
      </div>
      <div style={{ marginBottom: 14, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: C.dark, letterSpacing: "-1.5px", lineHeight: 1 }}>
            {(normed.reduce((a, x) => a + x.count, 0) / 1000).toFixed(1)}K
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: "2px 9px",
              borderRadius: 20,
              background: C.accentBg,
              color: C.primary,
              fontFamily: "Inter,sans-serif",
            }}
          >
            +180% ↑
          </span>
        </div>
        <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 3 }}>
          Total Signal Sources
        </div>
      </div>
      <div
        style={{
          height: 32,
          display: "flex",
          borderRadius: 8,
          overflow: "hidden",
          gap: 2,
          marginBottom: 14,
          flexShrink: 0,
        }}
      >
        {normed.map((src, i) => (
          <div
            key={i}
            style={{
              flex: src.v,
              background: src.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            title={src.l}
          >
            {src.v > 15 && (
              <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "Inter,sans-serif" }}>
                {src.v}%
              </span>
            )}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        {normed.map((src, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: src.color }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                  {src.l}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                  {src.count.toLocaleString()}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "1px 7px",
                    borderRadius: 20,
                    background: `${src.color}22`,
                    color: src.color,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {src.v}%
                </span>
              </div>
            </div>
            <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${src.v}%`, background: src.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CompaniesTable({ s }) {
  const [sel, setSel] = useState([]);
  const [sort, setSort] = useState({ col: "score", dir: "desc" });
  const Icon = s.icon;
  const sorted = [...s.keyPlayers].sort((a, b) =>
    sort.dir === "desc"
      ? b[sort.col === "score" ? "score" : "capNum"] - a[sort.col === "score" ? "score" : "capNum"]
      : a[sort.col === "score" ? "score" : "capNum"] - b[sort.col === "score" ? "score" : "capNum"],
  );
  const statuses = ["Active", "Active", "Watching", "Active", "Watching"];
  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px 10px",
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Top Performing Companies</div>
        <div style={{ display: "flex", gap: 5 }}>
          {sel.length > 0 && (
            <div
              style={{
                padding: "4px 9px",
                borderRadius: 6,
                background: C.accentBg,
                fontSize: 10,
                fontWeight: 700,
                color: C.primary,
              }}
            >
              {sel.length} selected
            </div>
          )}
          <button
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              border: "1px solid #E5E7EB",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <MoreHorizontal size={12} color={C.muted} />
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              <th style={{ padding: "8px 14px", width: 32 }}>
                <input
                  type="checkbox"
                  onChange={(e) => setSel(e.target.checked ? sorted.map((p) => p.ticker) : [])}
                  checked={sel.length === sorted.length}
                  style={{ cursor: "pointer" }}
                />
              </th>
              <th
                style={{
                  padding: "8px 10px",
                  textAlign: "left",
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.muted,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Company
              </th>
              <th
                onClick={() =>
                  setSort({ col: "score", dir: sort.col === "score" && sort.dir === "desc" ? "asc" : "desc" })
                }
                style={{
                  padding: "8px 10px",
                  textAlign: "right",
                  fontSize: 10,
                  fontWeight: 700,
                  color: sort.col === "score" ? C.primary : C.muted,
                  fontFamily: "Inter,sans-serif",
                  cursor: "pointer",
                }}
              >
                Signals {sort.col === "score" && (sort.dir === "desc" ? "↓" : "↑")}
              </th>
              <th
                onClick={() => setSort({ col: "cap", dir: sort.col === "cap" && sort.dir === "desc" ? "asc" : "desc" })}
                style={{
                  padding: "8px 10px",
                  textAlign: "right",
                  fontSize: 10,
                  fontWeight: 700,
                  color: sort.col === "cap" ? C.primary : C.muted,
                  fontFamily: "Inter,sans-serif",
                  cursor: "pointer",
                }}
              >
                Mkt Cap {sort.col === "cap" && (sort.dir === "desc" ? "↓" : "↑")}
              </th>
              <th
                style={{
                  padding: "8px 14px",
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.muted,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => {
              const selected = sel.includes(p.ticker);
              const status = statuses[i] || "Active";
              return (
                <tr
                  key={i}
                  style={{
                    background: selected ? "#F0FDF4" : i % 2 === 0 ? "#fff" : "#FAFAFA",
                    borderBottom: "1px solid #F3F4F6",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#FAFAFA";
                  }}
                >
                  <td style={{ padding: "10px 14px" }}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={(e) =>
                        setSel(e.target.checked ? [...sel, p.ticker] : sel.filter((t) => t !== p.ticker))
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td style={{ padding: "10px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 9,
                          background: C.accentBg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={14} color={C.primary} />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>#{p.ticker}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "10px 10px", textAlign: "right" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                      {Math.round(p.score * 138 + i * 200).toLocaleString()}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                      {Math.round(p.score * 22 + i * 30).toLocaleString()} / mo
                    </div>
                  </td>
                  <td style={{ padding: "10px 10px", textAlign: "right" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                      {p.cap}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: p.change.startsWith("+") ? C.green : C.red,
                        fontFamily: "Inter,sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {p.change}
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "center" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 10,
                        fontWeight: 700,
                        color: status === "Active" ? C.green : C.yellow,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: status === "Active" ? C.green : C.yellow,
                          flexShrink: 0,
                        }}
                      />
                      {status}
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
          padding: "8px 16px",
          borderTop: "1px solid #F3F4F6",
          display: "flex",
          justifyContent: "flex-end",
          flexShrink: 0,
        }}
      >
        <button
          style={{
            fontSize: 11,
            color: C.primary,
            fontWeight: 700,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "Inter,sans-serif",
          }}
        >
          View all companies →
        </button>
      </div>
    </Card>
  );
}

function EngagementMetrics({ s }) {
  const [hovBar, setHovBar] = useState(null);
  const bars = Array.from({ length: 30 }, (_, i) =>
    Math.max(8, Math.round(40 + Math.sin(i * 0.9 + s.score * 0.04) * 28 + Math.sin(i * 2.1) * 12)),
  );
  const maxB = Math.max(...bars);
  const anomalies = [6, 13, 22];
  const stats = [
    { v: Math.round(s.activity.length * 241 + s.score * 8), l: "Active Signals", d: "avg / week", badge: "+56%" },
    { v: Math.round(s.score * 13 + 240), l: "Conversion Rate", d: "signal → action", badge: "+43%" },
    { v: Math.round(s.score * 112 + 1800), l: "Signal Duration", d: "avg hours active", badge: "+28%" },
  ];
  return (
    <Card style={{ padding: "16px 18px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Engagement Metrics</div>
        <button
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            border: "1px solid #E5E7EB",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <MoreHorizontal size={12} color={C.muted} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16, flexShrink: 0 }}>
        {stats.map((st, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
              <span style={{ fontSize: 19, fontWeight: 800, color: C.dark, letterSpacing: "-1px", lineHeight: 1 }}>
                {st.v.toLocaleString()}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
                {st.badge}
              </span>
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: C.dark, fontFamily: "Inter,sans-serif" }}>{st.l}</div>
            <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{st.d}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 2, padding: "0 2px" }}>
          {bars.map((b, i) => {
            const isAnom = anomalies.includes(i);
            const isHov = hovBar === i;
            const [rr, gg, bb] = [
              parseInt(s.color.slice(1, 3), 16),
              parseInt(s.color.slice(3, 5), 16),
              parseInt(s.color.slice(5, 7), 16),
            ];
            const anomColor = `rgba(${rr},${gg},${bb},0.9)`;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovBar(i)}
                onMouseLeave={() => setHovBar(null)}
                style={{
                  flex: 1,
                  borderRadius: "2px 2px 0 0",
                  background: isAnom ? anomColor : isHov ? s.color : `${s.color}55`,
                  height: `${(b / maxB) * 100}%`,
                  minHeight: 3,
                  transition: "all .15s",
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 4,
            borderTop: "1px solid #F3F4F6",
            marginTop: 4,
          }}
        >
          {["Feb 5", "Feb 10", "Feb 15", "Feb 20", "Feb 25", "Mar 1"].map((d) => (
            <span key={d} style={{ fontSize: 8, color: C.muted, fontFamily: "Inter,sans-serif" }}>
              {d}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

function WorldMap({ s }) {
  const [hovRegion, setHovRegion] = useState(null);
  // Proper simplified continent paths — Mercator, viewBox 0 0 1000 500
  const DOTS = [
    [376.4, 35.2, 0.8],
    [382.2, 35.2, 0.8],
    [388.1, 35.2, 0.8],
    [393.9, 35.2, 0.8],
    [399.8, 35.2, 0.8],
    [347.1, 39.7, 0.8],
    [353.0, 39.7, 0.8],
    [358.8, 39.7, 1.0],
    [364.7, 39.7, 1.0],
    [370.6, 39.7, 0.9],
    [376.4, 39.7, 1.7],
    [382.2, 39.7, 1.7],
    [388.0, 39.7, 1.7],
    [393.9, 39.7, 1.7],
    [399.8, 39.7, 1.6],
    [405.6, 39.7, 1.3],
    [411.4, 39.7, 0.9],
    [417.3, 39.7, 0.8],
    [259.5, 44.2, 0.8],
    [265.3, 44.2, 0.8],
    [271.1, 44.2, 0.8],
    [277.0, 44.2, 1.1],
    [282.9, 44.2, 1.3],
    [288.7, 44.2, 1.5],
    [294.6, 44.2, 1.4],
    [300.4, 44.2, 1.2],
    [306.2, 44.2, 1.1],
    [312.0, 44.1, 0.8],
    [317.9, 44.2, 0.8],
    [323.8, 44.2, 0.8],
    [329.6, 44.2, 0.8],
    [335.5, 44.2, 0.8],
    [341.3, 44.2, 1.0],
    [347.1, 44.2, 0.9],
    [353.0, 44.2, 1.0],
    [358.8, 44.2, 1.6],
    [364.6, 44.2, 1.7],
    [370.5, 44.2, 1.7],
    [376.4, 44.2, 1.7],
    [382.2, 44.2, 1.7],
    [388.0, 44.2, 1.7],
    [393.9, 44.2, 1.7],
    [399.8, 44.2, 1.6],
    [405.5, 44.2, 1.7],
    [411.4, 44.1, 1.0],
    [417.2, 44.2, 0.8],
    [423.1, 44.2, 0.8],
    [428.9, 44.2, 0.8],
    [434.8, 44.2, 0.8],
    [440.6, 44.2, 0.8],
    [610.1, 44.2, 0.8],
    [616.0, 44.2, 0.8],
    [241.9, 48.7, 0.8],
    [247.8, 48.7, 0.8],
    [253.7, 48.7, 0.8],
    [259.4, 48.7, 1.1],
    [265.4, 48.7, 1.5],
    [271.1, 48.7, 1.7],
    [277.0, 48.7, 1.7],
    [282.9, 48.7, 1.7],
    [288.7, 48.7, 1.7],
    [294.5, 48.7, 1.7],
    [300.4, 48.7, 1.6],
    [306.2, 48.7, 1.2],
    [312.1, 48.7, 0.8],
    [317.9, 48.7, 0.9],
    [323.8, 48.7, 1.6],
    [329.6, 48.7, 1.7],
    [335.5, 48.7, 1.7],
    [341.2, 48.7, 1.6],
    [347.1, 48.7, 1.7],
    [353.0, 48.7, 1.7],
    [358.9, 48.7, 1.7],
    [364.6, 48.7, 1.7],
    [370.5, 48.7, 1.7],
    [376.4, 48.7, 1.7],
    [382.2, 48.7, 1.7],
    [388.0, 48.7, 1.7],
    [393.9, 48.7, 1.7],
    [399.8, 48.7, 1.6],
    [405.5, 48.7, 1.7],
    [411.4, 48.7, 1.5],
    [417.2, 48.7, 1.6],
    [423.1, 48.7, 1.7],
    [428.9, 48.7, 1.6],
    [434.8, 48.7, 0.8],
    [440.6, 48.7, 0.8],
    [580.9, 48.7, 0.8],
    [586.8, 48.7, 0.8],
    [592.6, 48.7, 0.8],
    [598.5, 48.7, 0.8],
    [604.2, 48.7, 0.8],
    [610.1, 48.6, 1.0],
    [616.0, 48.7, 0.8],
    [621.8, 48.7, 0.8],
    [627.6, 48.7, 0.8],
    [633.5, 48.7, 0.8],
    [691.9, 48.7, 0.8],
    [697.8, 48.7, 0.8],
    [230.2, 53.2, 0.8],
    [236.1, 53.2, 0.8],
    [241.9, 53.2, 0.9],
    [247.8, 53.2, 1.7],
    [253.7, 53.2, 1.7],
    [259.5, 53.2, 1.7],
    [265.4, 53.2, 1.7],
    [271.2, 53.1, 1.5],
    [277.0, 53.2, 1.7],
    [282.9, 53.2, 1.7],
    [288.7, 53.2, 1.7],
    [294.5, 53.2, 1.7],
    [300.4, 53.2, 1.2],
    [306.2, 53.2, 0.8],
    [312.1, 53.2, 1.4],
    [318.0, 53.2, 1.7],
    [323.8, 53.2, 1.6],
    [329.6, 53.2, 1.7],
    [335.5, 53.2, 1.7],
    [341.2, 53.2, 1.6],
    [347.1, 53.2, 1.7],
    [353.0, 53.2, 1.7],
    [358.9, 53.2, 1.7],
    [364.6, 53.2, 1.7],
    [370.5, 53.2, 1.7],
    [376.4, 53.2, 1.7],
    [382.2, 53.2, 1.7],
    [388.0, 53.2, 1.7],
    [393.9, 53.2, 1.7],
    [399.8, 53.2, 1.6],
    [405.5, 53.2, 1.7],
    [411.5, 53.2, 1.7],
    [417.2, 53.2, 1.6],
    [423.1, 53.2, 1.5],
    [428.9, 53.2, 0.8],
    [580.9, 53.2, 0.8],
    [586.7, 53.2, 0.9],
    [592.6, 53.2, 0.8],
    [598.4, 53.2, 0.8],
    [604.2, 53.1, 0.8],
    [610.2, 53.2, 1.1],
    [616.0, 53.2, 0.8],
    [621.8, 53.2, 0.8],
    [627.7, 53.1, 0.8],
    [633.5, 53.2, 0.8],
    [686.1, 53.2, 0.8],
    [692.0, 53.2, 1.1],
    [697.8, 53.2, 0.8],
    [703.6, 53.2, 1.1],
    [709.5, 53.1, 0.9],
    [715.3, 53.2, 0.8],
    [230.2, 57.7, 0.8],
    [236.2, 57.7, 1.7],
    [241.9, 57.7, 1.5],
    [247.8, 57.7, 0.8],
    [253.6, 57.7, 0.8],
    [259.5, 57.6, 1.1],
    [265.4, 57.7, 1.2],
    [271.2, 57.7, 1.6],
    [277.0, 57.7, 1.7],
    [282.9, 57.7, 1.7],
    [288.7, 57.7, 1.7],
    [294.6, 57.7, 0.8],
    [300.4, 57.7, 0.8],
    [306.2, 57.7, 1.1],
    [312.0, 57.7, 1.7],
    [318.0, 57.7, 1.7],
    [323.8, 57.7, 1.6],
    [329.6, 57.7, 1.7],
    [335.5, 57.7, 1.7],
    [341.2, 57.7, 1.6],
    [347.1, 57.7, 1.7],
    [353.0, 57.7, 1.7],
    [358.9, 57.7, 1.7],
    [364.6, 57.7, 1.7],
    [370.5, 57.7, 1.7],
    [376.4, 57.7, 1.7],
    [382.2, 57.7, 1.7],
    [388.0, 57.7, 1.7],
    [393.9, 57.7, 1.7],
    [399.8, 57.7, 1.6],
    [405.5, 57.7, 1.7],
    [411.5, 57.7, 1.7],
    [417.2, 57.7, 1.6],
    [423.1, 57.7, 0.8],
    [697.8, 57.7, 1.4],
    [703.6, 57.7, 1.6],
    [709.5, 57.7, 1.4],
    [715.3, 57.7, 0.8],
    [218.6, 62.2, 0.8],
    [224.4, 62.2, 0.8],
    [230.2, 62.2, 1.1],
    [236.2, 62.2, 1.7],
    [241.9, 62.2, 1.6],
    [247.8, 62.2, 1.6],
    [253.6, 62.2, 1.0],
    [259.4, 62.2, 1.4],
    [265.4, 62.2, 1.7],
    [271.1, 62.2, 1.7],
    [277.0, 62.2, 1.7],
    [282.9, 62.2, 1.2],
    [288.7, 62.2, 0.8],
    [294.6, 62.2, 0.8],
    [300.4, 62.2, 0.8],
    [306.2, 62.2, 1.4],
    [312.0, 62.2, 1.7],
    [318.0, 62.2, 1.7],
    [323.8, 62.2, 1.6],
    [329.6, 62.2, 1.7],
    [335.5, 62.2, 1.7],
    [341.2, 62.2, 1.6],
    [347.1, 62.2, 1.7],
    [353.0, 62.2, 1.7],
    [358.9, 62.2, 1.7],
    [364.6, 62.2, 1.7],
    [370.5, 62.2, 1.7],
    [376.4, 62.2, 1.7],
    [382.2, 62.2, 1.7],
    [388.0, 62.2, 1.7],
    [393.9, 62.2, 1.7],
    [399.8, 62.2, 1.6],
    [405.5, 62.2, 1.7],
    [411.5, 62.2, 1.7],
    [417.2, 62.2, 1.2],
    [697.8, 62.2, 0.8],
    [703.6, 62.2, 0.9],
    [709.5, 62.2, 1.6],
    [715.3, 62.1, 1.5],
    [721.1, 62.1, 0.8],
    [727.0, 62.2, 0.8],
    [206.9, 66.7, 0.8],
    [212.7, 66.7, 0.8],
    [218.6, 66.7, 0.8],
    [224.4, 66.7, 0.8],
    [230.2, 66.7, 0.8],
    [236.1, 66.7, 0.8],
    [241.9, 66.7, 1.5],
    [247.8, 66.7, 1.7],
    [253.6, 66.7, 1.3],
    [259.5, 66.7, 1.3],
    [265.4, 66.7, 1.7],
    [271.1, 66.7, 1.7],
    [277.0, 66.7, 1.7],
    [282.9, 66.7, 0.8],
    [288.7, 66.7, 0.8],
    [294.6, 66.7, 1.4],
    [300.4, 66.7, 1.7],
    [306.2, 66.7, 1.6],
    [312.0, 66.7, 1.7],
    [318.0, 66.7, 1.7],
    [323.8, 66.7, 1.6],
    [329.6, 66.7, 1.7],
    [335.5, 66.7, 1.7],
    [341.2, 66.7, 1.6],
    [347.1, 66.7, 1.7],
    [353.0, 66.7, 1.7],
    [358.9, 66.7, 1.7],
    [364.6, 66.7, 1.7],
    [370.5, 66.7, 1.7],
    [376.4, 66.7, 1.7],
    [382.2, 66.7, 1.7],
    [388.0, 66.7, 1.7],
    [393.9, 66.7, 1.7],
    [399.8, 66.7, 1.6],
    [405.5, 66.7, 1.7],
    [411.5, 66.7, 1.7],
    [417.2, 66.7, 1.6],
    [423.1, 66.7, 0.8],
    [709.5, 66.7, 0.8],
    [715.3, 66.7, 0.8],
    [721.2, 66.7, 1.4],
    [727.0, 66.7, 1.4],
    [732.9, 66.7, 0.8],
    [189.4, 71.2, 0.8],
    [195.2, 71.2, 0.8],
    [201.1, 71.2, 0.8],
    [206.9, 71.2, 0.8],
    [212.8, 71.2, 1.1],
    [218.6, 71.2, 1.4],
    [224.4, 71.2, 0.8],
    [230.2, 71.2, 1.3],
    [236.1, 71.2, 0.8],
    [241.9, 71.2, 0.8],
    [247.8, 71.2, 0.8],
    [253.7, 71.2, 1.2],
    [259.5, 71.2, 1.5],
    [265.4, 71.2, 1.7],
    [271.1, 71.2, 1.5],
    [277.0, 71.2, 0.8],
    [288.7, 71.2, 1.1],
    [294.5, 71.2, 1.7],
    [300.4, 71.2, 1.7],
    [306.2, 71.2, 1.6],
    [312.0, 71.2, 1.7],
    [318.0, 71.2, 1.7],
    [323.8, 71.2, 1.6],
    [329.6, 71.2, 1.7],
    [335.5, 71.2, 1.7],
    [341.2, 71.2, 1.6],
    [347.1, 71.2, 1.7],
    [353.0, 71.2, 1.7],
    [358.9, 71.2, 1.7],
    [364.6, 71.2, 1.7],
    [370.5, 71.2, 1.7],
    [376.4, 71.2, 1.7],
    [382.2, 71.2, 1.7],
    [388.0, 71.2, 1.7],
    [393.9, 71.2, 1.7],
    [399.8, 71.2, 1.6],
    [405.5, 71.2, 1.7],
    [411.5, 71.2, 1.7],
    [417.2, 71.2, 1.4],
    [423.1, 71.2, 0.8],
    [633.5, 71.2, 0.8],
    [639.4, 71.2, 0.8],
    [715.3, 71.2, 0.8],
    [721.1, 71.2, 0.8],
    [727.0, 71.2, 0.8],
    [732.8, 71.2, 0.8],
    [183.6, 75.7, 0.8],
    [189.4, 75.7, 1.0],
    [195.2, 75.7, 0.8],
    [206.9, 75.7, 0.8],
    [212.7, 75.7, 0.8],
    [218.6, 75.7, 0.8],
    [224.4, 75.7, 0.8],
    [230.2, 75.7, 0.8],
    [236.1, 75.7, 0.8],
    [241.9, 75.7, 0.8],
    [247.8, 75.7, 0.8],
    [253.6, 75.7, 1.5],
    [259.5, 75.7, 1.7],
    [265.4, 75.7, 1.7],
    [271.1, 75.7, 1.5],
    [277.0, 75.7, 0.8],
    [288.7, 75.7, 0.8],
    [294.6, 75.7, 0.9],
    [300.4, 75.7, 1.5],
    [306.2, 75.7, 1.6],
    [312.0, 75.7, 1.7],
    [318.0, 75.7, 1.7],
    [323.8, 75.7, 1.6],
    [329.6, 75.7, 1.7],
    [335.5, 75.7, 1.7],
    [341.2, 75.7, 1.6],
    [347.1, 75.7, 1.7],
    [353.0, 75.7, 1.7],
    [358.9, 75.7, 1.7],
    [364.6, 75.7, 1.7],
    [370.5, 75.7, 1.7],
    [376.4, 75.7, 1.7],
    [382.2, 75.7, 1.7],
    [388.0, 75.7, 1.7],
    [393.9, 75.7, 1.7],
    [399.8, 75.7, 1.6],
    [405.5, 75.7, 1.7],
    [411.5, 75.7, 1.7],
    [417.2, 75.7, 1.6],
    [423.1, 75.7, 0.8],
    [621.8, 75.7, 0.8],
    [627.6, 75.7, 0.8],
    [633.5, 75.7, 1.3],
    [639.3, 75.7, 0.8],
    [715.3, 75.7, 0.8],
    [721.2, 75.7, 1.1],
    [727.0, 75.7, 1.6],
    [732.8, 75.7, 0.8],
    [738.7, 75.7, 0.8],
    [744.5, 75.7, 0.8],
    [171.8, 80.2, 0.8],
    [177.7, 80.2, 1.5],
    [183.5, 80.2, 0.8],
    [189.3, 80.2, 0.8],
    [195.2, 80.2, 0.8],
    [201.1, 80.2, 0.8],
    [206.9, 80.2, 0.8],
    [212.8, 80.2, 0.8],
    [218.6, 80.2, 0.8],
    [224.4, 80.2, 0.8],
    [230.2, 80.2, 0.8],
    [236.1, 80.2, 1.0],
    [241.9, 80.2, 1.2],
    [247.8, 80.2, 0.8],
    [253.6, 80.2, 0.8],
    [259.5, 80.2, 0.8],
    [265.3, 80.2, 0.8],
    [271.1, 80.2, 0.8],
    [277.1, 80.2, 0.8],
    [312.0, 80.2, 0.8],
    [317.9, 80.2, 0.8],
    [323.8, 80.2, 1.1],
    [329.6, 80.2, 1.7],
    [335.5, 80.2, 1.7],
    [341.2, 80.2, 1.6],
    [347.1, 80.2, 1.7],
    [353.0, 80.2, 1.7],
    [358.9, 80.2, 1.7],
    [364.6, 80.2, 1.7],
    [370.5, 80.2, 1.7],
    [376.4, 80.2, 1.7],
    [382.2, 80.2, 1.7],
    [388.0, 80.2, 1.7],
    [393.9, 80.2, 1.7],
    [399.8, 80.2, 1.6],
    [405.5, 80.2, 1.7],
    [411.5, 80.2, 1.7],
    [417.2, 80.2, 1.6],
    [423.1, 80.2, 0.8],
    [610.1, 80.2, 0.8],
    [616.0, 80.2, 1.3],
    [621.8, 80.2, 1.3],
    [627.7, 80.2, 0.8],
    [633.5, 80.2, 0.8],
    [686.1, 80.2, 0.8],
    [692.0, 80.2, 0.8],
    [697.8, 80.2, 0.9],
    [703.7, 80.2, 1.1],
    [709.5, 80.2, 1.2],
    [715.3, 80.2, 1.5],
    [721.1, 80.2, 1.6],
    [727.0, 80.2, 1.7],
    [732.8, 80.2, 1.6],
    [738.7, 80.2, 1.6],
    [744.5, 80.2, 1.7],
    [750.4, 80.2, 0.8],
    [165.9, 84.7, 0.8],
    [171.8, 84.7, 1.3],
    [177.6, 84.7, 1.0],
    [183.5, 84.7, 1.0],
    [189.3, 84.7, 0.8],
    [195.2, 84.7, 0.8],
    [201.1, 84.7, 1.1],
    [206.9, 84.7, 0.8],
    [212.8, 84.7, 0.8],
    [218.6, 84.7, 1.3],
    [224.4, 84.7, 1.4],
    [230.2, 84.7, 0.8],
    [236.1, 84.7, 0.8],
    [241.9, 84.7, 1.5],
    [247.8, 84.7, 1.1],
    [253.6, 84.7, 1.0],
    [259.4, 84.7, 1.6],
    [265.4, 84.7, 1.7],
    [271.2, 84.7, 0.8],
    [323.8, 84.7, 0.8],
    [329.6, 84.7, 1.6],
    [335.5, 84.7, 1.7],
    [341.2, 84.7, 1.6],
    [347.1, 84.7, 1.7],
    [353.0, 84.7, 1.7],
    [358.9, 84.7, 1.7],
    [364.6, 84.7, 1.7],
    [370.5, 84.7, 1.7],
    [376.4, 84.7, 1.7],
    [382.2, 84.7, 1.7],
    [388.0, 84.7, 1.7],
    [393.9, 84.7, 1.7],
    [399.8, 84.7, 1.6],
    [405.5, 84.7, 1.7],
    [411.5, 84.7, 1.7],
    [417.2, 84.7, 1.6],
    [423.1, 84.7, 0.8],
    [604.2, 84.7, 0.8],
    [610.1, 84.7, 1.6],
    [616.0, 84.7, 1.2],
    [621.8, 84.7, 0.8],
    [686.1, 84.7, 1.2],
    [692.0, 84.7, 1.7],
    [697.8, 84.7, 1.6],
    [703.6, 84.7, 1.6],
    [709.5, 84.7, 1.7],
    [715.4, 84.7, 1.6],
    [721.1, 84.7, 1.6],
    [727.0, 84.7, 1.7],
    [732.9, 84.7, 1.6],
    [738.6, 84.7, 1.6],
    [744.5, 84.7, 1.7],
    [750.3, 84.7, 0.9],
    [808.8, 84.7, 0.8],
    [814.7, 84.7, 0.8],
    [820.5, 84.7, 0.8],
    [826.3, 84.7, 0.8],
    [166.0, 89.2, 0.8],
    [171.8, 89.2, 0.8],
    [177.7, 89.2, 0.8],
    [183.5, 89.2, 1.2],
    [189.4, 89.2, 1.5],
    [195.2, 89.2, 1.3],
    [201.1, 89.2, 1.0],
    [206.9, 89.2, 0.8],
    [212.8, 89.2, 0.8],
    [218.6, 89.2, 0.8],
    [224.4, 89.2, 0.8],
    [230.2, 89.2, 0.8],
    [236.1, 89.2, 0.8],
    [241.9, 89.2, 0.9],
    [247.8, 89.2, 1.0],
    [253.6, 89.2, 1.0],
    [259.5, 89.2, 0.8],
    [265.3, 89.2, 0.8],
    [271.1, 89.2, 0.8],
    [329.6, 89.2, 1.0],
    [335.5, 89.2, 1.7],
    [341.2, 89.2, 1.6],
    [347.1, 89.2, 1.7],
    [353.0, 89.2, 1.7],
    [358.9, 89.2, 1.7],
    [364.6, 89.2, 1.7],
    [370.5, 89.2, 1.7],
    [376.4, 89.2, 1.7],
    [382.2, 89.2, 1.7],
    [388.0, 89.2, 1.7],
    [393.9, 89.2, 1.7],
    [399.8, 89.2, 1.6],
    [405.5, 89.2, 1.7],
    [411.5, 89.2, 1.7],
    [417.3, 89.2, 0.8],
    [604.2, 89.2, 1.0],
    [610.1, 89.2, 1.3],
    [616.0, 89.2, 0.8],
    [645.2, 89.2, 0.8],
    [668.5, 89.2, 0.8],
    [674.4, 89.2, 0.8],
    [680.2, 89.2, 0.8],
    [686.1, 89.2, 1.0],
    [692.0, 89.2, 1.7],
    [697.8, 89.2, 1.6],
    [703.6, 89.2, 1.6],
    [709.5, 89.2, 1.7],
    [715.4, 89.2, 1.6],
    [721.1, 89.2, 1.6],
    [727.0, 89.2, 1.7],
    [732.9, 89.2, 1.6],
    [738.6, 89.2, 1.4],
    [744.5, 89.2, 0.8],
    [808.8, 89.2, 0.8],
    [814.6, 89.2, 1.6],
    [820.5, 89.2, 1.6],
    [826.3, 89.2, 1.4],
    [832.2, 89.2, 0.8],
    [838.0, 89.2, 0.8],
    [843.9, 89.2, 0.8],
    [160.2, 93.7, 0.8],
    [166.0, 93.7, 0.8],
    [171.9, 93.7, 0.8],
    [177.7, 93.7, 0.8],
    [183.5, 93.7, 0.8],
    [189.4, 93.7, 0.8],
    [195.2, 93.7, 0.8],
    [201.1, 93.7, 0.8],
    [206.8, 93.7, 0.8],
    [212.8, 93.7, 0.8],
    [218.6, 93.7, 0.8],
    [224.4, 93.7, 0.8],
    [230.3, 93.7, 0.8],
    [236.1, 93.7, 1.3],
    [241.9, 93.7, 0.8],
    [247.8, 93.7, 0.8],
    [253.6, 93.7, 1.3],
    [259.5, 93.7, 1.3],
    [265.4, 93.7, 0.8],
    [271.1, 93.7, 1.0],
    [277.0, 93.7, 0.8],
    [329.6, 93.7, 0.8],
    [335.5, 93.7, 1.7],
    [341.2, 93.7, 1.6],
    [347.1, 93.7, 1.7],
    [353.0, 93.7, 1.7],
    [358.9, 93.7, 1.7],
    [364.6, 93.7, 1.7],
    [370.5, 93.7, 1.7],
    [376.4, 93.7, 1.7],
    [382.2, 93.7, 1.7],
    [388.0, 93.7, 1.7],
    [393.9, 93.7, 1.7],
    [399.8, 93.7, 1.6],
    [405.5, 93.7, 1.7],
    [411.4, 93.7, 1.6],
    [417.2, 93.7, 0.8],
    [598.5, 93.7, 0.8],
    [604.2, 93.7, 1.6],
    [610.1, 93.7, 0.8],
    [639.3, 93.7, 0.8],
    [645.1, 93.7, 1.4],
    [651.0, 93.7, 0.8],
    [656.9, 93.7, 0.8],
    [668.5, 93.7, 0.8],
    [674.4, 93.7, 1.7],
    [680.2, 93.7, 1.6],
    [686.0, 93.7, 1.7],
    [692.0, 93.7, 1.7],
    [697.8, 93.7, 1.6],
    [703.6, 93.7, 1.6],
    [709.5, 93.7, 1.7],
    [715.4, 93.7, 1.6],
    [721.1, 93.7, 1.6],
    [727.0, 93.7, 1.7],
    [732.8, 93.7, 1.5],
    [738.7, 93.7, 0.8],
    [744.5, 93.7, 1.0],
    [750.4, 93.7, 0.9],
    [756.2, 93.7, 0.8],
    [762.0, 93.7, 0.8],
    [773.8, 93.7, 0.8],
    [779.6, 93.7, 0.8],
    [785.5, 93.7, 0.8],
    [808.8, 93.7, 0.8],
    [814.6, 93.7, 0.8],
    [820.5, 93.7, 0.8],
    [826.4, 93.7, 0.8],
    [832.1, 93.7, 0.8],
    [838.0, 93.7, 0.9],
    [843.8, 93.7, 0.8],
    [160.2, 98.2, 0.8],
    [165.9, 98.2, 1.6],
    [171.8, 98.2, 1.7],
    [177.6, 98.2, 1.5],
    [183.5, 98.2, 0.8],
    [189.4, 98.2, 0.8],
    [201.1, 98.2, 0.8],
    [206.9, 98.2, 0.9],
    [212.7, 98.2, 0.8],
    [218.6, 98.2, 1.2],
    [224.4, 98.2, 1.5],
    [230.2, 98.2, 0.8],
    [236.2, 98.2, 1.2],
    [241.9, 98.2, 0.8],
    [247.8, 98.2, 0.9],
    [253.7, 98.2, 1.7],
    [259.5, 98.2, 1.7],
    [265.4, 98.2, 1.5],
    [271.2, 98.2, 1.0],
    [277.0, 98.2, 1.3],
    [282.9, 98.2, 0.8],
    [329.6, 98.2, 0.8],
    [335.5, 98.2, 1.7],
    [341.2, 98.2, 1.6],
    [347.1, 98.2, 1.7],
    [353.0, 98.2, 1.7],
    [358.9, 98.2, 1.7],
    [364.6, 98.2, 1.7],
    [370.5, 98.2, 1.7],
    [376.4, 98.2, 1.7],
    [382.2, 98.2, 1.7],
    [388.0, 98.2, 1.7],
    [393.9, 98.2, 1.7],
    [399.8, 98.2, 1.6],
    [405.5, 98.2, 1.7],
    [411.4, 98.2, 1.2],
    [528.3, 98.2, 0.8],
    [534.1, 98.2, 0.8],
    [598.5, 98.2, 1.1],
    [604.2, 98.2, 1.6],
    [610.1, 98.2, 0.8],
    [633.5, 98.2, 0.8],
    [639.4, 98.2, 1.2],
    [645.2, 98.2, 1.6],
    [651.0, 98.2, 0.8],
    [656.9, 98.2, 0.8],
    [662.8, 98.2, 1.0],
    [668.5, 98.2, 0.8],
    [674.4, 98.2, 1.2],
    [680.2, 98.2, 1.6],
    [686.0, 98.2, 1.7],
    [692.0, 98.2, 1.7],
    [697.8, 98.2, 1.6],
    [703.6, 98.2, 1.6],
    [709.5, 98.2, 1.7],
    [715.4, 98.2, 1.6],
    [721.1, 98.2, 1.6],
    [727.0, 98.2, 1.7],
    [732.9, 98.2, 1.6],
    [738.6, 98.2, 1.6],
    [744.5, 98.2, 1.7],
    [750.4, 98.2, 1.6],
    [756.2, 98.2, 1.6],
    [762.0, 98.2, 1.4],
    [767.9, 98.2, 1.1],
    [773.8, 98.2, 1.1],
    [779.5, 98.2, 1.7],
    [785.5, 98.2, 1.7],
    [791.2, 98.2, 0.8],
    [814.7, 98.2, 0.8],
    [820.5, 98.2, 1.0],
    [826.3, 98.2, 0.8],
    [154.3, 102.7, 0.8],
    [160.2, 102.7, 1.2],
    [165.9, 102.7, 1.6],
    [171.8, 102.7, 1.4],
    [177.6, 102.7, 1.5],
    [183.6, 102.7, 1.5],
    [189.4, 102.7, 1.5],
    [195.2, 102.7, 1.2],
    [201.0, 102.7, 1.2],
    [206.9, 102.7, 1.1],
    [212.7, 102.7, 0.8],
    [218.6, 102.7, 0.8],
    [224.4, 102.7, 1.5],
    [230.2, 102.7, 0.8],
    [236.1, 102.7, 0.8],
    [247.8, 102.7, 1.3],
    [253.7, 102.7, 1.7],
    [259.5, 102.7, 1.7],
    [265.4, 102.7, 1.7],
    [271.1, 102.7, 1.7],
    [277.0, 102.7, 1.7],
    [282.9, 102.7, 1.7],
    [288.7, 102.7, 1.3],
    [294.6, 102.7, 0.8],
    [329.6, 102.7, 0.8],
    [335.4, 102.7, 1.6],
    [341.3, 102.7, 1.6],
    [347.1, 102.7, 1.7],
    [353.0, 102.7, 1.7],
    [358.9, 102.7, 1.7],
    [364.6, 102.7, 1.7],
    [370.5, 102.7, 1.7],
    [376.4, 102.7, 1.7],
    [382.2, 102.7, 1.7],
    [388.0, 102.7, 1.7],
    [393.9, 102.7, 1.7],
    [399.8, 102.7, 1.6],
    [405.5, 102.7, 1.7],
    [411.4, 102.7, 1.6],
    [417.2, 102.7, 0.8],
    [522.5, 102.7, 0.8],
    [528.3, 102.7, 1.3],
    [534.2, 102.7, 1.6],
    [540.0, 102.7, 1.5],
    [545.8, 102.7, 0.8],
    [598.4, 102.7, 0.8],
    [604.3, 102.7, 0.9],
    [610.1, 102.7, 0.9],
    [616.0, 102.7, 0.8],
    [633.5, 102.7, 0.8],
    [639.4, 102.7, 1.6],
    [645.2, 102.7, 1.6],
    [651.0, 102.7, 0.8],
    [656.9, 102.7, 1.5],
    [662.7, 102.7, 1.6],
    [668.5, 102.7, 1.7],
    [674.4, 102.7, 1.7],
    [680.2, 102.7, 1.6],
    [686.0, 102.7, 1.7],
    [692.0, 102.7, 1.7],
    [697.8, 102.7, 1.6],
    [703.6, 102.7, 1.6],
    [709.5, 102.7, 1.7],
    [715.4, 102.7, 1.6],
    [721.1, 102.7, 1.6],
    [727.0, 102.7, 1.7],
    [732.9, 102.7, 1.6],
    [738.6, 102.7, 1.6],
    [744.5, 102.7, 1.7],
    [750.4, 102.7, 1.6],
    [756.2, 102.7, 1.6],
    [762.0, 102.7, 1.7],
    [767.9, 102.7, 1.7],
    [773.8, 102.7, 1.6],
    [779.5, 102.7, 1.7],
    [785.5, 102.7, 1.7],
    [791.2, 102.7, 0.8],
    [814.6, 102.7, 0.8],
    [820.5, 102.7, 1.3],
    [826.3, 102.7, 0.9],
    [832.1, 102.7, 0.8],
    [154.3, 107.2, 0.8],
    [160.2, 107.2, 1.2],
    [166.0, 107.2, 1.5],
    [171.8, 107.2, 0.8],
    [177.6, 107.2, 1.5],
    [183.6, 107.2, 1.6],
    [189.3, 107.2, 1.7],
    [195.2, 107.2, 1.7],
    [201.1, 107.2, 1.6],
    [206.9, 107.2, 1.6],
    [212.7, 107.2, 0.8],
    [230.2, 107.2, 1.1],
    [236.1, 107.2, 1.5],
    [241.9, 107.2, 0.8],
    [247.8, 107.2, 1.2],
    [253.7, 107.2, 1.7],
    [259.5, 107.2, 1.7],
    [265.4, 107.2, 1.5],
    [271.2, 107.2, 1.2],
    [277.1, 107.2, 1.6],
    [282.9, 107.2, 1.7],
    [288.7, 107.2, 1.7],
    [294.5, 107.2, 1.7],
    [300.4, 107.2, 0.8],
    [335.4, 107.2, 0.8],
    [341.3, 107.2, 0.8],
    [347.1, 107.2, 1.7],
    [353.0, 107.2, 1.7],
    [358.9, 107.2, 1.7],
    [364.6, 107.2, 1.7],
    [370.5, 107.2, 1.7],
    [376.4, 107.2, 1.7],
    [382.2, 107.2, 1.7],
    [388.0, 107.2, 1.7],
    [393.9, 107.2, 1.7],
    [399.8, 107.2, 1.6],
    [405.6, 107.2, 1.6],
    [411.4, 107.2, 0.9],
    [417.2, 107.2, 0.8],
    [510.8, 107.2, 0.8],
    [516.6, 107.2, 1.1],
    [522.5, 107.2, 1.7],
    [528.3, 107.2, 1.7],
    [534.1, 107.2, 1.6],
    [540.0, 107.2, 1.6],
    [545.9, 107.2, 1.4],
    [551.7, 107.2, 0.8],
    [557.5, 107.2, 0.8],
    [586.8, 107.2, 0.8],
    [592.5, 107.2, 0.8],
    [616.0, 107.2, 0.8],
    [621.8, 107.2, 1.0],
    [627.6, 107.2, 0.8],
    [633.5, 107.2, 0.8],
    [639.3, 107.2, 1.4],
    [645.1, 107.2, 1.6],
    [651.0, 107.2, 0.8],
    [656.9, 107.2, 1.6],
    [662.8, 107.2, 1.6],
    [668.5, 107.2, 1.7],
    [674.4, 107.2, 1.7],
    [680.2, 107.2, 1.6],
    [686.0, 107.2, 1.7],
    [692.0, 107.2, 1.7],
    [697.8, 107.2, 1.6],
    [703.6, 107.2, 1.6],
    [709.5, 107.2, 1.7],
    [715.4, 107.2, 1.6],
    [721.1, 107.2, 1.6],
    [727.0, 107.2, 1.7],
    [732.9, 107.2, 1.6],
    [738.6, 107.2, 1.6],
    [744.5, 107.2, 1.7],
    [750.4, 107.2, 1.6],
    [756.2, 107.2, 1.6],
    [762.0, 107.2, 1.7],
    [767.9, 107.2, 1.7],
    [773.8, 107.2, 1.6],
    [779.5, 107.2, 1.7],
    [785.5, 107.2, 1.7],
    [791.3, 107.2, 1.0],
    [797.1, 107.2, 1.2],
    [803.0, 107.2, 1.2],
    [808.8, 107.2, 1.0],
    [814.7, 107.2, 0.9],
    [820.5, 107.2, 1.6],
    [826.4, 107.2, 1.6],
    [832.1, 107.2, 1.6],
    [838.0, 107.2, 1.3],
    [843.9, 107.2, 0.8],
    [148.4, 111.7, 0.8],
    [154.2, 111.7, 0.8],
    [160.1, 111.7, 0.8],
    [165.9, 111.7, 0.8],
    [171.9, 111.7, 0.8],
    [177.7, 111.7, 0.8],
    [183.5, 111.7, 1.0],
    [189.3, 111.7, 1.3],
    [195.2, 111.7, 1.7],
    [201.1, 111.7, 1.6],
    [206.8, 111.7, 1.7],
    [212.7, 111.7, 1.5],
    [218.6, 111.7, 0.8],
    [224.4, 111.7, 0.8],
    [230.2, 111.7, 0.8],
    [236.1, 111.7, 1.5],
    [241.9, 111.7, 0.8],
    [247.8, 111.7, 0.8],
    [253.7, 111.7, 0.8],
    [259.5, 111.7, 1.3],
    [265.3, 111.7, 0.8],
    [277.0, 111.7, 0.8],
    [282.9, 111.7, 1.5],
    [288.7, 111.7, 1.7],
    [294.5, 111.7, 1.7],
    [300.4, 111.7, 1.2],
    [306.2, 111.7, 0.8],
    [335.4, 111.7, 0.8],
    [341.3, 111.7, 1.2],
    [347.1, 111.7, 1.7],
    [353.0, 111.7, 1.7],
    [358.9, 111.7, 1.7],
    [364.6, 111.7, 1.7],
    [370.5, 111.7, 1.7],
    [376.4, 111.7, 1.7],
    [382.2, 111.7, 1.7],
    [388.0, 111.7, 1.7],
    [393.9, 111.7, 1.5],
    [399.7, 111.7, 1.0],
    [405.6, 111.7, 0.8],
    [504.9, 111.7, 0.8],
    [510.8, 111.7, 1.1],
    [516.6, 111.7, 1.6],
    [522.5, 111.7, 1.7],
    [528.3, 111.7, 1.7],
    [534.1, 111.7, 1.6],
    [540.0, 111.7, 1.7],
    [545.9, 111.7, 1.6],
    [551.6, 111.7, 1.6],
    [557.5, 111.7, 1.6],
    [563.4, 111.7, 0.8],
    [569.2, 111.7, 0.8],
    [575.0, 111.7, 0.8],
    [580.9, 111.7, 0.8],
    [586.7, 111.7, 0.8],
    [592.6, 111.7, 0.8],
    [598.5, 111.7, 0.8],
    [604.3, 111.7, 0.8],
    [610.1, 111.7, 0.8],
    [616.0, 111.7, 0.8],
    [621.8, 111.7, 1.3],
    [627.6, 111.7, 1.6],
    [633.5, 111.7, 1.3],
    [639.4, 111.7, 0.8],
    [645.1, 111.7, 1.6],
    [651.0, 111.7, 0.8],
    [656.8, 111.7, 1.1],
    [662.8, 111.7, 1.5],
    [668.5, 111.7, 1.7],
    [674.4, 111.7, 1.7],
    [680.2, 111.7, 1.6],
    [686.0, 111.7, 1.7],
    [692.0, 111.7, 1.7],
    [697.8, 111.7, 1.6],
    [703.6, 111.7, 1.6],
    [709.5, 111.7, 1.7],
    [715.4, 111.7, 1.6],
    [721.1, 111.7, 1.6],
    [727.0, 111.7, 1.7],
    [732.9, 111.7, 1.6],
    [738.6, 111.7, 1.6],
    [744.5, 111.7, 1.7],
    [750.4, 111.7, 1.6],
    [756.2, 111.7, 1.6],
    [762.0, 111.7, 1.7],
    [767.9, 111.7, 1.7],
    [773.8, 111.7, 1.6],
    [779.5, 111.7, 1.7],
    [785.5, 111.7, 1.7],
    [791.2, 111.7, 1.6],
    [797.1, 111.7, 1.6],
    [803.0, 111.7, 1.7],
    [808.9, 111.7, 1.6],
    [814.6, 111.7, 1.6],
    [820.5, 111.7, 1.7],
    [826.4, 111.7, 1.6],
    [832.1, 111.7, 1.6],
    [838.0, 111.7, 1.7],
    [843.8, 111.7, 1.4],
    [849.8, 111.7, 1.0],
    [855.5, 111.7, 1.1],
    [861.5, 111.7, 0.8],
    [867.2, 111.7, 0.8],
    [72.5, 116.2, 0.8],
    [78.3, 116.2, 1.1],
    [84.2, 116.2, 1.1],
    [90.0, 116.2, 0.9],
    [95.8, 116.2, 0.8],
    [101.7, 116.2, 0.8],
    [107.6, 116.2, 0.8],
    [113.3, 116.2, 0.8],
    [119.2, 116.2, 0.8],
    [130.9, 116.2, 0.8],
    [136.8, 116.2, 0.8],
    [142.6, 116.2, 1.0],
    [148.4, 116.2, 1.2],
    [154.3, 116.2, 1.2],
    [160.2, 116.2, 0.8],
    [166.0, 116.2, 1.1],
    [171.8, 116.2, 0.8],
    [177.7, 116.2, 0.8],
    [183.6, 116.2, 1.1],
    [189.3, 116.2, 1.7],
    [195.2, 116.2, 1.6],
    [201.1, 116.2, 1.0],
    [206.9, 116.2, 1.0],
    [212.7, 116.2, 1.1],
    [218.6, 116.2, 0.8],
    [224.4, 116.2, 1.1],
    [230.2, 116.2, 1.1],
    [236.1, 116.2, 1.3],
    [241.9, 116.2, 1.4],
    [247.8, 116.2, 1.3],
    [253.7, 116.2, 0.8],
    [259.5, 116.2, 1.6],
    [265.3, 116.2, 0.9],
    [277.0, 116.2, 0.8],
    [282.9, 116.2, 0.8],
    [288.7, 116.2, 1.5],
    [294.5, 116.2, 1.7],
    [300.4, 116.2, 1.3],
    [306.2, 116.2, 0.8],
    [312.1, 116.2, 0.8],
    [335.5, 116.2, 0.8],
    [341.2, 116.2, 1.6],
    [347.1, 116.2, 1.7],
    [353.0, 116.2, 1.7],
    [358.9, 116.2, 1.7],
    [364.6, 116.2, 1.7],
    [370.5, 116.2, 1.7],
    [376.4, 116.2, 1.7],
    [382.2, 116.2, 1.7],
    [388.0, 116.2, 0.8],
    [393.9, 116.2, 0.8],
    [504.9, 116.2, 0.8],
    [510.8, 116.2, 1.6],
    [516.6, 116.2, 1.6],
    [522.5, 116.2, 1.7],
    [528.3, 116.2, 1.7],
    [534.1, 116.2, 1.6],
    [540.0, 116.2, 1.7],
    [545.9, 116.2, 1.6],
    [551.6, 116.2, 1.6],
    [557.5, 116.2, 1.7],
    [563.4, 116.2, 1.6],
    [569.2, 116.2, 1.5],
    [575.0, 116.2, 0.8],
    [580.9, 116.2, 0.9],
    [586.8, 116.2, 0.8],
    [592.6, 116.2, 1.5],
    [598.5, 116.2, 1.7],
    [604.2, 116.2, 1.6],
    [610.1, 116.2, 1.6],
    [616.0, 116.2, 1.7],
    [621.8, 116.2, 1.7],
    [627.6, 116.2, 1.6],
    [633.5, 116.2, 1.7],
    [639.3, 116.2, 1.6],
    [645.1, 116.2, 1.6],
    [651.0, 116.2, 1.0],
    [656.8, 116.2, 1.6],
    [662.7, 116.2, 1.6],
    [668.5, 116.2, 1.7],
    [674.4, 116.2, 1.7],
    [680.2, 116.2, 1.6],
    [686.0, 116.2, 1.7],
    [692.0, 116.2, 1.7],
    [697.8, 116.2, 1.6],
    [703.6, 116.2, 1.6],
    [709.5, 116.2, 1.7],
    [715.4, 116.2, 1.6],
    [721.1, 116.2, 1.6],
    [727.0, 116.2, 1.7],
    [732.9, 116.2, 1.6],
    [738.6, 116.2, 1.6],
    [744.5, 116.2, 1.7],
    [750.4, 116.2, 1.6],
    [756.2, 116.2, 1.6],
    [762.0, 116.2, 1.7],
    [767.9, 116.2, 1.7],
    [773.8, 116.2, 1.6],
    [779.5, 116.2, 1.7],
    [785.5, 116.2, 1.7],
    [791.2, 116.2, 1.6],
    [797.1, 116.2, 1.6],
    [803.0, 116.2, 1.7],
    [808.9, 116.2, 1.6],
    [814.6, 116.2, 1.6],
    [820.5, 116.2, 1.7],
    [826.4, 116.2, 1.6],
    [832.1, 116.2, 1.6],
    [838.0, 116.2, 1.7],
    [843.9, 116.2, 1.6],
    [849.8, 116.2, 1.6],
    [855.5, 116.2, 1.7],
    [861.5, 116.2, 1.7],
    [867.2, 116.2, 0.8],
    [890.7, 116.2, 0.8],
    [896.5, 116.2, 0.8],
    [914.0, 116.2, 1.0],
    [919.8, 116.2, 0.9],
    [925.7, 116.2, 0.8],
    [60.8, 120.7, 0.8],
    [66.6, 120.7, 1.1],
    [72.4, 120.7, 1.6],
    [78.3, 120.7, 1.6],
    [84.2, 120.7, 1.6],
    [90.1, 120.7, 1.6],
    [95.8, 120.7, 1.6],
    [101.7, 120.7, 1.6],
    [107.6, 120.7, 1.6],
    [113.3, 120.7, 1.6],
    [119.2, 120.7, 1.7],
    [125.1, 120.7, 1.4],
    [130.9, 120.7, 1.1],
    [136.8, 120.7, 1.7],
    [142.7, 120.7, 1.7],
    [148.4, 120.7, 1.6],
    [154.2, 120.7, 1.7],
    [160.2, 120.7, 1.7],
    [165.9, 120.7, 1.6],
    [171.8, 120.7, 1.7],
    [177.7, 120.7, 1.7],
    [183.5, 120.7, 1.1],
    [189.4, 120.7, 0.8],
    [195.2, 120.7, 0.8],
    [201.1, 120.7, 1.0],
    [206.9, 120.7, 1.5],
    [212.8, 120.7, 0.9],
    [218.6, 120.7, 0.8],
    [224.4, 120.7, 1.4],
    [230.2, 120.7, 1.2],
    [236.1, 120.7, 1.6],
    [241.9, 120.7, 1.6],
    [247.8, 120.7, 1.5],
    [253.6, 120.7, 1.2],
    [259.5, 120.7, 1.7],
    [265.3, 120.7, 1.0],
    [277.0, 120.7, 0.8],
    [282.9, 120.7, 0.8],
    [288.7, 120.7, 0.8],
    [294.5, 120.7, 1.7],
    [300.4, 120.7, 1.5],
    [306.2, 120.7, 1.6],
    [312.1, 120.7, 1.4],
    [317.9, 120.7, 0.8],
    [335.5, 120.7, 0.8],
    [341.2, 120.7, 1.6],
    [347.1, 120.7, 1.7],
    [353.0, 120.7, 1.7],
    [358.9, 120.7, 1.7],
    [364.6, 120.7, 1.7],
    [370.5, 120.7, 1.7],
    [376.4, 120.7, 1.7],
    [382.2, 120.7, 1.1],
    [388.1, 120.7, 0.8],
    [405.6, 120.7, 0.8],
    [411.4, 120.7, 0.8],
    [417.3, 120.7, 0.8],
    [423.1, 120.7, 1.0],
    [428.9, 120.7, 1.4],
    [434.8, 120.7, 0.9],
    [440.6, 120.7, 0.8],
    [499.1, 120.7, 0.8],
    [504.9, 120.7, 1.6],
    [510.8, 120.7, 1.6],
    [516.6, 120.7, 1.6],
    [522.5, 120.7, 1.6],
    [528.3, 120.7, 1.6],
    [534.1, 120.7, 1.6],
    [540.0, 120.7, 1.7],
    [545.9, 120.7, 1.6],
    [551.7, 120.7, 1.4],
    [557.5, 120.7, 0.8],
    [563.3, 120.7, 0.9],
    [569.2, 120.7, 0.8],
    [575.0, 120.7, 0.8],
    [580.9, 120.7, 1.4],
    [586.8, 120.7, 1.6],
    [592.5, 120.7, 1.7],
    [598.5, 120.7, 1.7],
    [604.2, 120.7, 1.6],
    [610.1, 120.7, 1.6],
    [616.0, 120.7, 1.7],
    [621.8, 120.7, 1.7],
    [627.6, 120.7, 1.6],
    [633.5, 120.7, 1.7],
    [639.4, 120.7, 1.6],
    [645.2, 120.7, 1.0],
    [651.0, 120.7, 1.2],
    [656.9, 120.7, 1.6],
    [662.8, 120.7, 1.6],
    [668.5, 120.7, 1.7],
    [674.4, 120.7, 1.7],
    [680.2, 120.7, 1.6],
    [686.0, 120.7, 1.7],
    [692.0, 120.7, 1.7],
    [697.8, 120.7, 1.6],
    [703.6, 120.7, 1.6],
    [709.5, 120.7, 1.7],
    [715.4, 120.7, 1.6],
    [721.1, 120.7, 1.6],
    [727.0, 120.7, 1.7],
    [732.9, 120.7, 1.6],
    [738.6, 120.7, 1.6],
    [744.5, 120.7, 1.7],
    [750.4, 120.7, 1.6],
    [756.2, 120.7, 1.6],
    [762.0, 120.7, 1.7],
    [767.9, 120.7, 1.7],
    [773.8, 120.7, 1.6],
    [779.5, 120.7, 1.7],
    [785.5, 120.7, 1.7],
    [791.2, 120.7, 1.6],
    [797.1, 120.7, 1.6],
    [803.0, 120.7, 1.7],
    [808.9, 120.7, 1.6],
    [814.6, 120.7, 1.6],
    [820.5, 120.7, 1.7],
    [826.4, 120.7, 1.6],
    [832.1, 120.7, 1.6],
    [838.0, 120.7, 1.7],
    [843.9, 120.7, 1.6],
    [849.8, 120.7, 1.6],
    [855.5, 120.7, 1.7],
    [861.5, 120.7, 1.7],
    [867.2, 120.7, 1.6],
    [873.0, 120.7, 1.6],
    [879.0, 120.7, 1.4],
    [884.8, 120.7, 1.3],
    [890.6, 120.7, 0.8],
    [896.5, 120.7, 1.7],
    [902.3, 120.7, 1.4],
    [908.2, 120.7, 1.1],
    [914.0, 120.7, 0.8],
    [60.8, 125.2, 1.0],
    [66.7, 125.2, 1.6],
    [72.4, 125.2, 1.6],
    [78.3, 125.2, 1.6],
    [84.2, 125.2, 1.6],
    [90.1, 125.2, 1.6],
    [95.8, 125.2, 1.6],
    [101.7, 125.2, 1.6],
    [107.6, 125.2, 1.6],
    [113.3, 125.2, 1.6],
    [119.2, 125.2, 1.7],
    [125.1, 125.2, 1.6],
    [130.9, 125.2, 1.6],
    [136.8, 125.2, 1.7],
    [142.7, 125.2, 1.7],
    [148.4, 125.2, 1.6],
    [154.2, 125.2, 1.7],
    [160.2, 125.2, 1.7],
    [165.9, 125.2, 1.6],
    [171.8, 125.2, 1.7],
    [177.7, 125.2, 1.7],
    [183.6, 125.2, 1.6],
    [189.3, 125.2, 1.7],
    [195.2, 125.2, 1.7],
    [201.1, 125.2, 1.5],
    [206.8, 125.2, 1.7],
    [212.8, 125.2, 1.7],
    [218.6, 125.2, 1.6],
    [224.4, 125.2, 1.6],
    [230.2, 125.2, 1.7],
    [236.2, 125.2, 1.7],
    [241.9, 125.2, 1.5],
    [247.8, 125.2, 1.5],
    [253.7, 125.2, 1.2],
    [259.4, 125.2, 0.8],
    [265.4, 125.2, 0.8],
    [282.9, 125.2, 0.8],
    [288.7, 125.2, 1.1],
    [294.5, 125.2, 1.7],
    [300.4, 125.2, 0.8],
    [306.2, 125.2, 0.8],
    [312.0, 125.2, 1.2],
    [335.4, 125.2, 0.8],
    [341.3, 125.2, 1.6],
    [347.1, 125.2, 1.7],
    [353.0, 125.2, 1.7],
    [358.9, 125.2, 1.7],
    [364.6, 125.2, 1.7],
    [370.5, 125.2, 0.9],
    [376.4, 125.2, 0.8],
    [405.6, 125.2, 0.8],
    [411.4, 125.2, 1.3],
    [417.3, 125.2, 1.6],
    [423.1, 125.2, 1.7],
    [429.0, 125.2, 1.7],
    [434.8, 125.2, 0.9],
    [499.1, 125.2, 0.9],
    [505.0, 125.2, 1.7],
    [510.8, 125.2, 1.6],
    [516.6, 125.2, 1.6],
    [522.5, 125.2, 0.8],
    [528.3, 125.2, 0.8],
    [534.1, 125.2, 1.6],
    [540.0, 125.2, 1.7],
    [545.9, 125.2, 1.6],
    [551.6, 125.2, 1.6],
    [557.5, 125.2, 0.8],
    [563.4, 125.2, 0.8],
    [569.2, 125.2, 1.3],
    [575.0, 125.2, 1.7],
    [580.9, 125.2, 1.7],
    [586.8, 125.2, 1.6],
    [592.5, 125.2, 1.7],
    [598.5, 125.2, 1.7],
    [604.2, 125.2, 1.6],
    [610.1, 125.2, 1.6],
    [616.0, 125.2, 1.7],
    [621.8, 125.2, 1.7],
    [627.6, 125.2, 1.6],
    [633.5, 125.2, 1.7],
    [639.4, 125.2, 1.6],
    [645.1, 125.2, 1.6],
    [651.0, 125.2, 1.7],
    [656.9, 125.2, 1.6],
    [662.8, 125.2, 1.6],
    [668.5, 125.2, 1.7],
    [674.4, 125.2, 1.7],
    [680.2, 125.2, 1.6],
    [686.0, 125.2, 1.7],
    [692.0, 125.2, 1.7],
    [697.8, 125.2, 1.6],
    [703.6, 125.2, 1.6],
    [709.5, 125.2, 1.7],
    [715.4, 125.2, 1.6],
    [721.1, 125.2, 1.6],
    [727.0, 125.2, 1.7],
    [732.9, 125.2, 1.6],
    [738.6, 125.2, 1.6],
    [744.5, 125.2, 1.7],
    [750.4, 125.2, 1.6],
    [756.2, 125.2, 1.6],
    [762.0, 125.2, 1.7],
    [767.9, 125.2, 1.7],
    [773.8, 125.2, 1.6],
    [779.5, 125.2, 1.7],
    [785.5, 125.2, 1.7],
    [791.2, 125.2, 1.6],
    [797.1, 125.2, 1.6],
    [803.0, 125.2, 1.7],
    [808.9, 125.2, 1.6],
    [814.6, 125.2, 1.6],
    [820.5, 125.2, 1.7],
    [826.4, 125.2, 1.6],
    [832.1, 125.2, 1.6],
    [838.0, 125.2, 1.7],
    [843.9, 125.2, 1.6],
    [849.8, 125.2, 1.6],
    [855.5, 125.2, 1.7],
    [861.5, 125.2, 1.7],
    [867.2, 125.2, 1.6],
    [873.0, 125.2, 1.7],
    [879.0, 125.2, 1.7],
    [884.8, 125.2, 1.6],
    [890.6, 125.2, 1.6],
    [896.5, 125.2, 1.7],
    [902.4, 125.2, 1.6],
    [908.1, 125.2, 1.6],
    [914.0, 125.2, 1.5],
    [919.9, 125.2, 0.8],
    [925.7, 125.2, 0.8],
    [60.8, 129.7, 0.8],
    [66.7, 129.7, 1.6],
    [72.4, 129.7, 1.6],
    [78.3, 129.7, 1.6],
    [84.2, 129.7, 1.6],
    [90.1, 129.7, 1.6],
    [95.8, 129.7, 1.6],
    [101.7, 129.7, 1.6],
    [107.6, 129.7, 1.6],
    [113.3, 129.7, 1.6],
    [119.2, 129.7, 1.7],
    [125.1, 129.7, 1.6],
    [130.9, 129.7, 1.6],
    [136.8, 129.7, 1.7],
    [142.7, 129.7, 1.7],
    [148.4, 129.7, 1.6],
    [154.2, 129.7, 1.7],
    [160.2, 129.7, 1.7],
    [165.9, 129.7, 1.6],
    [171.8, 129.7, 1.7],
    [177.7, 129.7, 1.7],
    [183.6, 129.7, 1.6],
    [189.3, 129.7, 1.7],
    [195.2, 129.7, 1.7],
    [201.1, 129.7, 1.6],
    [206.8, 129.7, 1.7],
    [212.8, 129.7, 1.7],
    [218.6, 129.7, 1.6],
    [224.4, 129.7, 1.6],
    [230.2, 129.7, 1.7],
    [236.2, 129.7, 1.7],
    [241.9, 129.7, 1.6],
    [247.8, 129.7, 1.3],
    [253.6, 129.7, 0.9],
    [259.4, 129.7, 1.4],
    [265.3, 129.7, 0.8],
    [277.0, 129.7, 1.3],
    [282.9, 129.7, 1.3],
    [288.7, 129.7, 1.5],
    [294.5, 129.7, 1.7],
    [300.4, 129.7, 1.6],
    [306.2, 129.7, 0.8],
    [312.1, 129.7, 0.8],
    [341.3, 129.7, 1.1],
    [347.1, 129.7, 1.7],
    [353.0, 129.7, 1.7],
    [358.9, 129.7, 1.7],
    [364.6, 129.7, 1.7],
    [370.5, 129.7, 0.8],
    [405.6, 129.6, 0.8],
    [411.4, 129.7, 0.8],
    [417.2, 129.7, 1.1],
    [423.1, 129.7, 1.1],
    [428.9, 129.7, 0.8],
    [493.2, 129.7, 0.9],
    [499.0, 129.7, 1.7],
    [505.0, 129.7, 1.7],
    [510.8, 129.7, 1.6],
    [516.6, 129.7, 1.6],
    [522.5, 129.7, 0.8],
    [528.3, 129.6, 1.2],
    [534.1, 129.7, 1.6],
    [540.0, 129.7, 1.7],
    [545.9, 129.7, 1.6],
    [551.6, 129.7, 1.6],
    [557.5, 129.7, 0.8],
    [563.4, 129.7, 1.4],
    [569.2, 129.7, 1.6],
    [575.0, 129.7, 1.7],
    [580.9, 129.7, 1.7],
    [586.8, 129.7, 1.6],
    [592.5, 129.7, 1.7],
    [598.5, 129.7, 1.7],
    [604.2, 129.7, 1.6],
    [610.1, 129.7, 1.6],
    [616.0, 129.7, 1.7],
    [621.8, 129.7, 1.7],
    [627.6, 129.7, 1.6],
    [633.5, 129.7, 1.7],
    [639.4, 129.7, 1.6],
    [645.1, 129.7, 1.6],
    [651.0, 129.7, 1.7],
    [656.9, 129.7, 1.6],
    [662.8, 129.7, 1.6],
    [668.5, 129.7, 1.7],
    [674.4, 129.7, 1.7],
    [680.2, 129.7, 1.6],
    [686.0, 129.7, 1.7],
    [692.0, 129.7, 1.7],
    [697.8, 129.7, 1.6],
    [703.6, 129.7, 1.6],
    [709.5, 129.7, 1.7],
    [715.4, 129.7, 1.6],
    [721.1, 129.7, 1.6],
    [727.0, 129.7, 1.7],
    [732.9, 129.7, 1.6],
    [738.6, 129.7, 1.6],
    [744.5, 129.7, 1.7],
    [750.4, 129.7, 1.6],
    [756.2, 129.7, 1.6],
    [762.0, 129.7, 1.7],
    [767.9, 129.7, 1.7],
    [773.8, 129.7, 1.6],
    [779.5, 129.7, 1.7],
    [785.5, 129.7, 1.7],
    [791.2, 129.7, 1.6],
    [797.1, 129.7, 1.6],
    [803.0, 129.7, 1.7],
    [808.9, 129.7, 1.6],
    [814.6, 129.7, 1.6],
    [820.5, 129.7, 1.7],
    [826.4, 129.7, 1.6],
    [832.1, 129.7, 1.6],
    [838.0, 129.7, 1.7],
    [843.9, 129.7, 1.6],
    [849.8, 129.7, 1.6],
    [855.5, 129.7, 1.7],
    [861.5, 129.7, 1.7],
    [867.2, 129.7, 1.6],
    [873.0, 129.7, 1.7],
    [879.0, 129.7, 1.7],
    [884.8, 129.7, 1.6],
    [890.6, 129.7, 1.6],
    [896.5, 129.7, 1.7],
    [902.4, 129.7, 1.6],
    [908.1, 129.7, 1.6],
    [914.0, 129.7, 1.7],
    [919.9, 129.7, 1.6],
    [925.7, 129.7, 1.3],
    [931.5, 129.7, 0.8],
    [55.0, 134.2, 0.8],
    [60.8, 134.2, 0.9],
    [66.7, 134.2, 0.9],
    [72.4, 134.2, 1.6],
    [78.3, 134.2, 1.6],
    [84.2, 134.2, 1.6],
    [90.1, 134.2, 1.6],
    [95.8, 134.2, 1.6],
    [101.7, 134.2, 1.6],
    [107.6, 134.2, 1.6],
    [113.3, 134.2, 1.6],
    [119.2, 134.2, 1.7],
    [125.1, 134.2, 1.6],
    [130.9, 134.2, 1.6],
    [136.8, 134.2, 1.7],
    [142.7, 134.2, 1.7],
    [148.4, 134.2, 1.6],
    [154.2, 134.2, 1.7],
    [160.2, 134.2, 1.7],
    [165.9, 134.2, 1.6],
    [171.8, 134.2, 1.7],
    [177.7, 134.2, 1.7],
    [183.6, 134.2, 1.6],
    [189.3, 134.2, 1.7],
    [195.2, 134.2, 1.7],
    [201.1, 134.2, 1.6],
    [206.8, 134.2, 1.7],
    [212.8, 134.2, 1.7],
    [218.6, 134.2, 1.6],
    [224.4, 134.2, 1.6],
    [230.2, 134.2, 1.7],
    [236.2, 134.2, 1.7],
    [241.9, 134.1, 1.4],
    [247.8, 134.2, 0.8],
    [253.7, 134.2, 0.8],
    [259.4, 134.2, 1.1],
    [265.3, 134.2, 0.8],
    [271.2, 134.2, 0.8],
    [288.7, 134.2, 0.8],
    [294.6, 134.2, 1.6],
    [300.4, 134.2, 1.3],
    [306.2, 134.2, 1.1],
    [341.3, 134.2, 0.8],
    [347.1, 134.2, 1.5],
    [353.0, 134.2, 1.7],
    [358.9, 134.2, 1.7],
    [364.7, 134.2, 1.3],
    [370.5, 134.2, 0.8],
    [481.5, 134.2, 0.8],
    [487.4, 134.2, 1.2],
    [493.2, 134.2, 1.6],
    [499.0, 134.2, 1.7],
    [505.0, 134.2, 1.7],
    [510.8, 134.2, 1.6],
    [516.6, 134.2, 0.8],
    [522.5, 134.2, 0.9],
    [528.3, 134.2, 1.7],
    [534.1, 134.2, 1.6],
    [540.0, 134.2, 1.7],
    [545.9, 134.2, 1.6],
    [551.6, 134.2, 1.6],
    [557.5, 134.2, 1.7],
    [563.4, 134.2, 1.6],
    [569.2, 134.2, 1.6],
    [575.0, 134.2, 1.7],
    [580.9, 134.2, 1.7],
    [586.8, 134.2, 1.6],
    [592.5, 134.2, 1.7],
    [598.5, 134.2, 1.7],
    [604.2, 134.2, 1.6],
    [610.1, 134.2, 1.6],
    [616.0, 134.2, 1.7],
    [621.8, 134.2, 1.7],
    [627.6, 134.2, 1.6],
    [633.5, 134.2, 1.7],
    [639.4, 134.2, 1.6],
    [645.1, 134.2, 1.6],
    [651.0, 134.2, 1.7],
    [656.9, 134.2, 1.6],
    [662.8, 134.2, 1.6],
    [668.5, 134.2, 1.7],
    [674.4, 134.2, 1.7],
    [680.2, 134.2, 1.6],
    [686.0, 134.2, 1.7],
    [692.0, 134.2, 1.7],
    [697.8, 134.2, 1.6],
    [703.6, 134.2, 1.6],
    [709.5, 134.2, 1.7],
    [715.4, 134.2, 1.6],
    [721.1, 134.2, 1.6],
    [727.0, 134.2, 1.7],
    [732.9, 134.2, 1.6],
    [738.6, 134.2, 1.6],
    [744.5, 134.2, 1.7],
    [750.4, 134.2, 1.6],
    [756.2, 134.2, 1.6],
    [762.0, 134.2, 1.7],
    [767.9, 134.2, 1.7],
    [773.8, 134.2, 1.6],
    [779.5, 134.2, 1.7],
    [785.5, 134.2, 1.7],
    [791.2, 134.2, 1.6],
    [797.1, 134.2, 1.6],
    [803.0, 134.2, 1.7],
    [808.9, 134.2, 1.6],
    [814.6, 134.2, 1.6],
    [820.5, 134.2, 1.7],
    [826.4, 134.2, 1.6],
    [832.1, 134.2, 1.6],
    [838.0, 134.2, 1.7],
    [843.9, 134.2, 1.6],
    [849.8, 134.2, 1.6],
    [855.5, 134.2, 1.7],
    [861.5, 134.2, 1.7],
    [867.2, 134.2, 1.6],
    [873.0, 134.2, 1.7],
    [879.0, 134.2, 1.7],
    [884.8, 134.2, 1.6],
    [890.6, 134.2, 1.6],
    [896.5, 134.2, 1.7],
    [902.4, 134.2, 1.6],
    [908.1, 134.2, 1.6],
    [914.0, 134.2, 1.6],
    [919.8, 134.2, 1.1],
    [925.7, 134.2, 1.5],
    [931.5, 134.2, 1.7],
    [937.4, 134.2, 1.2],
    [943.2, 134.2, 0.8],
    [55.0, 138.7, 0.8],
    [60.8, 138.7, 1.0],
    [66.7, 138.7, 0.9],
    [72.4, 138.7, 1.6],
    [78.3, 138.7, 1.6],
    [84.2, 138.7, 1.6],
    [90.1, 138.7, 1.6],
    [95.8, 138.7, 1.6],
    [101.7, 138.7, 1.6],
    [107.6, 138.7, 1.6],
    [113.3, 138.7, 1.6],
    [119.2, 138.7, 1.7],
    [125.1, 138.7, 1.6],
    [130.9, 138.7, 1.6],
    [136.8, 138.7, 1.7],
    [142.7, 138.7, 1.7],
    [148.4, 138.7, 1.6],
    [154.2, 138.7, 1.7],
    [160.2, 138.7, 1.7],
    [165.9, 138.7, 1.6],
    [171.8, 138.7, 1.7],
    [177.7, 138.7, 1.7],
    [183.6, 138.7, 1.6],
    [189.3, 138.7, 1.7],
    [195.2, 138.7, 1.7],
    [201.1, 138.7, 1.6],
    [206.8, 138.7, 1.7],
    [212.8, 138.7, 1.7],
    [218.6, 138.7, 1.6],
    [224.4, 138.7, 1.6],
    [230.2, 138.7, 1.7],
    [236.2, 138.7, 1.3],
    [241.9, 138.7, 0.8],
    [259.5, 138.7, 0.8],
    [265.4, 138.7, 0.8],
    [271.2, 138.7, 0.8],
    [277.0, 138.7, 1.2],
    [282.9, 138.7, 1.3],
    [288.7, 138.7, 0.9],
    [294.5, 138.7, 0.8],
    [300.4, 138.6, 0.8],
    [306.2, 138.7, 0.8],
    [347.1, 138.7, 0.8],
    [353.0, 138.7, 1.7],
    [358.9, 138.7, 1.7],
    [364.6, 138.7, 0.8],
    [481.6, 138.7, 0.8],
    [487.4, 138.7, 1.7],
    [493.2, 138.7, 1.6],
    [499.0, 138.7, 1.7],
    [505.0, 138.7, 1.7],
    [510.8, 138.7, 1.5],
    [516.7, 138.7, 0.8],
    [522.5, 138.7, 0.8],
    [528.3, 138.7, 1.7],
    [534.1, 138.7, 1.6],
    [540.0, 138.7, 1.7],
    [545.9, 138.7, 1.6],
    [551.6, 138.7, 1.6],
    [557.5, 138.7, 1.7],
    [563.4, 138.7, 1.6],
    [569.2, 138.7, 1.6],
    [575.0, 138.7, 1.7],
    [580.9, 138.7, 1.7],
    [586.8, 138.7, 1.6],
    [592.5, 138.7, 1.7],
    [598.5, 138.7, 1.7],
    [604.2, 138.7, 1.6],
    [610.1, 138.7, 1.6],
    [616.0, 138.7, 1.7],
    [621.8, 138.7, 1.7],
    [627.6, 138.7, 1.6],
    [633.5, 138.7, 1.7],
    [639.4, 138.7, 1.6],
    [645.1, 138.7, 1.6],
    [651.0, 138.7, 1.7],
    [656.9, 138.7, 1.6],
    [662.8, 138.7, 1.6],
    [668.5, 138.7, 1.7],
    [674.4, 138.7, 1.7],
    [680.2, 138.7, 1.6],
    [686.0, 138.7, 1.7],
    [692.0, 138.7, 1.7],
    [697.8, 138.7, 1.6],
    [703.6, 138.7, 1.6],
    [709.5, 138.7, 1.7],
    [715.4, 138.7, 1.6],
    [721.1, 138.7, 1.6],
    [727.0, 138.7, 1.7],
    [732.9, 138.7, 1.6],
    [738.6, 138.7, 1.6],
    [744.5, 138.7, 1.7],
    [750.4, 138.7, 1.6],
    [756.2, 138.7, 1.6],
    [762.0, 138.7, 1.7],
    [767.9, 138.7, 1.7],
    [773.8, 138.7, 1.6],
    [779.5, 138.7, 1.7],
    [785.5, 138.7, 1.7],
    [791.2, 138.7, 1.6],
    [797.1, 138.7, 1.6],
    [803.0, 138.7, 1.7],
    [808.9, 138.7, 1.6],
    [814.6, 138.7, 1.6],
    [820.5, 138.7, 1.7],
    [826.4, 138.7, 1.6],
    [832.1, 138.7, 1.6],
    [838.0, 138.7, 1.7],
    [843.9, 138.7, 1.6],
    [849.8, 138.7, 1.6],
    [855.5, 138.7, 1.7],
    [861.5, 138.7, 1.7],
    [867.2, 138.7, 1.6],
    [873.0, 138.7, 1.7],
    [879.0, 138.7, 1.7],
    [884.8, 138.7, 1.6],
    [890.6, 138.7, 1.6],
    [896.5, 138.7, 1.7],
    [902.4, 138.7, 1.6],
    [908.2, 138.7, 1.6],
    [914.0, 138.7, 0.8],
    [925.6, 138.7, 0.8],
    [931.5, 138.7, 1.0],
    [937.4, 138.7, 0.8],
    [60.8, 143.2, 0.8],
    [66.7, 143.2, 1.1],
    [72.4, 143.2, 1.6],
    [78.3, 143.2, 1.6],
    [84.2, 143.2, 1.6],
    [90.1, 143.2, 1.6],
    [95.8, 143.2, 1.6],
    [101.7, 143.2, 1.6],
    [107.6, 143.2, 1.6],
    [113.3, 143.2, 1.6],
    [119.2, 143.2, 1.7],
    [125.1, 143.2, 1.6],
    [130.9, 143.2, 1.6],
    [136.8, 143.2, 1.7],
    [142.7, 143.2, 1.7],
    [148.4, 143.2, 1.6],
    [154.2, 143.2, 1.7],
    [160.2, 143.2, 1.7],
    [165.9, 143.2, 1.6],
    [171.8, 143.2, 1.7],
    [177.7, 143.2, 1.7],
    [183.6, 143.2, 1.6],
    [189.3, 143.2, 1.7],
    [195.2, 143.2, 1.7],
    [201.1, 143.2, 1.6],
    [206.8, 143.2, 1.7],
    [212.8, 143.2, 1.7],
    [218.6, 143.2, 1.6],
    [224.4, 143.2, 1.6],
    [230.2, 143.2, 1.7],
    [236.1, 143.2, 0.8],
    [277.0, 143.2, 1.3],
    [282.9, 143.2, 1.7],
    [288.7, 143.2, 1.7],
    [294.5, 143.2, 1.2],
    [306.2, 143.2, 0.8],
    [312.1, 143.2, 0.8],
    [347.1, 143.2, 0.8],
    [353.0, 143.2, 0.8],
    [358.8, 143.2, 0.8],
    [364.7, 143.2, 0.8],
    [452.4, 143.2, 0.8],
    [458.2, 143.2, 0.8],
    [481.6, 143.2, 0.8],
    [487.4, 143.2, 1.7],
    [493.2, 143.2, 1.4],
    [499.0, 143.2, 1.7],
    [505.0, 143.2, 1.7],
    [510.8, 143.2, 1.6],
    [516.6, 143.2, 0.8],
    [522.5, 143.2, 0.8],
    [528.3, 143.2, 1.0],
    [534.2, 143.2, 0.9],
    [540.0, 143.2, 1.3],
    [545.9, 143.2, 1.6],
    [551.6, 143.2, 1.6],
    [557.5, 143.2, 1.7],
    [563.4, 143.2, 1.6],
    [569.2, 143.2, 1.6],
    [575.0, 143.2, 1.7],
    [580.9, 143.2, 1.7],
    [586.8, 143.2, 1.6],
    [592.5, 143.2, 1.7],
    [598.5, 143.2, 1.7],
    [604.2, 143.2, 1.6],
    [610.1, 143.2, 1.6],
    [616.0, 143.2, 1.7],
    [621.8, 143.2, 1.7],
    [627.6, 143.2, 1.6],
    [633.5, 143.2, 1.7],
    [639.4, 143.2, 1.6],
    [645.1, 143.2, 1.6],
    [651.0, 143.2, 1.7],
    [656.9, 143.2, 1.6],
    [662.8, 143.2, 1.6],
    [668.5, 143.2, 1.7],
    [674.4, 143.2, 1.7],
    [680.2, 143.2, 1.6],
    [686.0, 143.2, 1.7],
    [692.0, 143.2, 1.7],
    [697.8, 143.2, 1.6],
    [703.6, 143.2, 1.6],
    [709.5, 143.2, 1.7],
    [715.4, 143.2, 1.6],
    [721.1, 143.2, 1.6],
    [727.0, 143.2, 1.7],
    [732.9, 143.2, 1.6],
    [738.6, 143.2, 1.6],
    [744.5, 143.2, 1.7],
    [750.4, 143.2, 1.6],
    [756.2, 143.2, 1.6],
    [762.0, 143.2, 1.7],
    [767.9, 143.2, 1.7],
    [773.8, 143.2, 1.6],
    [779.5, 143.2, 1.7],
    [785.5, 143.2, 1.7],
    [791.2, 143.2, 1.6],
    [797.1, 143.2, 1.6],
    [803.0, 143.2, 1.7],
    [808.9, 143.2, 1.6],
    [814.6, 143.2, 1.6],
    [820.5, 143.2, 1.7],
    [826.4, 143.2, 1.6],
    [832.1, 143.2, 1.6],
    [838.0, 143.2, 1.7],
    [843.9, 143.2, 1.6],
    [849.8, 143.2, 1.6],
    [855.5, 143.2, 1.7],
    [861.4, 143.2, 1.3],
    [867.2, 143.2, 1.1],
    [873.1, 143.2, 1.1],
    [879.0, 143.2, 1.6],
    [884.8, 143.2, 1.6],
    [890.6, 143.2, 1.6],
    [896.5, 143.2, 1.7],
    [902.3, 143.2, 1.6],
    [908.1, 143.2, 1.1],
    [914.0, 143.1, 0.8],
    [937.4, 143.2, 0.8],
    [943.2, 143.2, 0.8],
    [55.0, 147.7, 0.8],
    [60.8, 147.7, 1.6],
    [66.7, 147.7, 1.6],
    [72.4, 147.7, 1.6],
    [78.3, 147.7, 1.6],
    [84.2, 147.7, 1.6],
    [90.0, 147.7, 1.6],
    [95.8, 147.7, 1.4],
    [101.7, 147.7, 1.2],
    [107.5, 147.7, 1.2],
    [113.3, 147.7, 1.6],
    [119.2, 147.7, 1.7],
    [125.1, 147.7, 1.6],
    [130.9, 147.7, 1.6],
    [136.8, 147.7, 1.7],
    [142.7, 147.7, 1.7],
    [148.4, 147.7, 1.6],
    [154.2, 147.7, 1.7],
    [160.2, 147.7, 1.7],
    [165.9, 147.7, 1.6],
    [171.8, 147.7, 1.7],
    [177.7, 147.7, 1.7],
    [183.6, 147.7, 1.6],
    [189.3, 147.7, 1.7],
    [195.2, 147.7, 1.7],
    [201.1, 147.7, 1.6],
    [206.8, 147.7, 1.7],
    [212.8, 147.7, 1.7],
    [218.6, 147.7, 1.6],
    [224.4, 147.7, 1.6],
    [230.2, 147.7, 1.6],
    [236.1, 147.7, 0.8],
    [277.0, 147.6, 1.3],
    [282.9, 147.7, 1.7],
    [288.7, 147.7, 1.7],
    [294.6, 147.7, 1.4],
    [300.4, 147.7, 0.8],
    [306.2, 147.7, 1.2],
    [312.1, 147.7, 1.1],
    [452.3, 147.7, 1.1],
    [458.1, 147.7, 1.2],
    [464.1, 147.7, 0.8],
    [481.6, 147.7, 0.8],
    [487.4, 147.7, 1.2],
    [493.2, 147.7, 0.8],
    [499.0, 147.6, 1.3],
    [505.0, 147.7, 1.7],
    [510.8, 147.7, 0.9],
    [522.5, 147.7, 0.8],
    [528.3, 147.7, 0.8],
    [534.1, 147.7, 1.6],
    [540.0, 147.7, 1.7],
    [545.9, 147.7, 1.6],
    [551.6, 147.7, 1.6],
    [557.5, 147.7, 1.7],
    [563.4, 147.7, 1.6],
    [569.2, 147.7, 1.6],
    [575.0, 147.7, 1.7],
    [580.9, 147.7, 1.7],
    [586.8, 147.7, 1.6],
    [592.5, 147.7, 1.7],
    [598.5, 147.7, 1.7],
    [604.2, 147.7, 1.6],
    [610.1, 147.7, 1.6],
    [616.0, 147.7, 1.7],
    [621.8, 147.7, 1.7],
    [627.6, 147.7, 1.6],
    [633.5, 147.7, 1.7],
    [639.4, 147.7, 1.6],
    [645.1, 147.7, 1.6],
    [651.0, 147.7, 1.7],
    [656.9, 147.7, 1.6],
    [662.8, 147.7, 1.6],
    [668.5, 147.7, 1.7],
    [674.4, 147.7, 1.7],
    [680.2, 147.7, 1.6],
    [686.0, 147.7, 1.7],
    [692.0, 147.7, 1.7],
    [697.8, 147.7, 1.6],
    [703.6, 147.7, 1.6],
    [709.5, 147.7, 1.7],
    [715.4, 147.7, 1.6],
    [721.1, 147.7, 1.6],
    [727.0, 147.7, 1.7],
    [732.9, 147.7, 1.6],
    [738.6, 147.7, 1.6],
    [744.5, 147.7, 1.7],
    [750.4, 147.7, 1.6],
    [756.2, 147.7, 1.6],
    [762.0, 147.7, 1.7],
    [767.9, 147.7, 1.7],
    [773.8, 147.7, 1.6],
    [779.5, 147.7, 1.7],
    [785.5, 147.7, 1.7],
    [791.2, 147.7, 1.6],
    [797.1, 147.7, 1.6],
    [803.0, 147.7, 1.7],
    [808.9, 147.7, 1.6],
    [814.6, 147.7, 1.6],
    [820.5, 147.7, 1.7],
    [826.3, 147.7, 1.4],
    [832.2, 147.7, 1.5],
    [838.0, 147.7, 1.6],
    [843.9, 147.7, 1.6],
    [849.8, 147.7, 1.6],
    [855.5, 147.7, 0.8],
    [867.2, 147.7, 0.8],
    [873.1, 147.6, 0.8],
    [878.9, 147.7, 1.5],
    [884.8, 147.7, 1.5],
    [890.6, 147.7, 1.6],
    [896.5, 147.7, 1.0],
    [902.3, 147.7, 0.8],
    [55.0, 152.2, 0.8],
    [60.8, 152.2, 1.0],
    [66.7, 152.2, 1.4],
    [72.4, 152.2, 1.6],
    [78.3, 152.2, 1.6],
    [84.2, 152.2, 1.6],
    [90.1, 152.2, 0.9],
    [95.8, 152.2, 1.1],
    [101.7, 152.2, 0.8],
    [113.4, 152.2, 0.8],
    [119.2, 152.2, 0.8],
    [125.1, 152.2, 1.0],
    [130.9, 152.2, 1.6],
    [136.8, 152.2, 1.7],
    [142.7, 152.2, 1.7],
    [148.4, 152.2, 1.6],
    [154.2, 152.2, 1.7],
    [160.2, 152.2, 1.7],
    [165.9, 152.2, 1.6],
    [171.8, 152.2, 1.7],
    [177.7, 152.2, 1.7],
    [183.6, 152.2, 1.6],
    [189.3, 152.2, 1.7],
    [195.2, 152.2, 1.7],
    [201.1, 152.2, 1.6],
    [206.8, 152.2, 1.7],
    [212.8, 152.2, 1.7],
    [218.6, 152.2, 1.6],
    [224.4, 152.2, 1.6],
    [230.2, 152.2, 1.7],
    [236.1, 152.2, 1.5],
    [241.9, 152.2, 0.8],
    [277.0, 152.1, 0.8],
    [282.9, 152.2, 1.7],
    [288.7, 152.2, 1.7],
    [294.5, 152.2, 1.7],
    [300.4, 152.2, 1.7],
    [306.2, 152.2, 1.6],
    [312.0, 152.2, 1.7],
    [317.9, 152.2, 0.8],
    [446.5, 152.2, 0.8],
    [452.4, 152.2, 1.0],
    [458.1, 152.2, 1.5],
    [464.0, 152.2, 0.8],
    [487.4, 152.2, 0.8],
    [493.2, 152.2, 1.2],
    [499.1, 152.2, 0.8],
    [504.9, 152.2, 1.5],
    [510.8, 152.2, 0.8],
    [522.5, 152.2, 1.2],
    [528.3, 152.1, 1.4],
    [534.1, 152.2, 1.6],
    [540.0, 152.2, 1.7],
    [545.9, 152.2, 1.6],
    [551.6, 152.2, 1.6],
    [557.5, 152.2, 1.7],
    [563.4, 152.2, 1.6],
    [569.2, 152.2, 1.6],
    [575.0, 152.2, 1.7],
    [580.9, 152.2, 1.7],
    [586.8, 152.2, 1.6],
    [592.5, 152.2, 1.7],
    [598.5, 152.2, 1.7],
    [604.2, 152.2, 1.6],
    [610.1, 152.2, 1.6],
    [616.0, 152.2, 1.7],
    [621.8, 152.2, 1.7],
    [627.6, 152.2, 1.6],
    [633.5, 152.2, 1.7],
    [639.4, 152.2, 1.6],
    [645.1, 152.2, 1.6],
    [651.0, 152.2, 1.7],
    [656.9, 152.2, 1.6],
    [662.8, 152.2, 1.6],
    [668.5, 152.2, 1.7],
    [674.4, 152.2, 1.7],
    [680.2, 152.2, 1.6],
    [686.0, 152.2, 1.7],
    [692.0, 152.2, 1.7],
    [697.8, 152.2, 1.6],
    [703.6, 152.2, 1.6],
    [709.5, 152.2, 1.7],
    [715.4, 152.2, 1.6],
    [721.1, 152.2, 1.6],
    [727.0, 152.2, 1.7],
    [732.9, 152.2, 1.6],
    [738.6, 152.2, 1.6],
    [744.5, 152.2, 1.7],
    [750.4, 152.2, 1.6],
    [756.2, 152.2, 1.6],
    [762.0, 152.2, 1.7],
    [767.9, 152.2, 1.7],
    [773.8, 152.2, 1.6],
    [779.5, 152.2, 1.7],
    [785.5, 152.2, 1.7],
    [791.2, 152.2, 1.6],
    [797.1, 152.2, 1.6],
    [803.0, 152.2, 1.7],
    [808.9, 152.2, 1.6],
    [814.6, 152.2, 1.6],
    [820.5, 152.2, 0.9],
    [838.0, 152.2, 0.8],
    [843.9, 152.2, 0.8],
    [849.7, 152.2, 0.8],
    [855.5, 152.2, 0.8],
    [861.4, 152.2, 0.8],
    [867.2, 152.2, 1.0],
    [873.1, 152.2, 0.9],
    [879.0, 152.2, 0.8],
    [884.8, 152.1, 0.8],
    [66.6, 156.7, 0.8],
    [72.5, 156.7, 0.8],
    [78.3, 156.6, 1.2],
    [84.2, 156.7, 1.4],
    [90.0, 156.7, 0.8],
    [130.9, 156.7, 0.9],
    [136.8, 156.7, 1.7],
    [142.7, 156.7, 1.7],
    [148.4, 156.7, 1.6],
    [154.2, 156.7, 1.7],
    [160.2, 156.7, 1.7],
    [165.9, 156.7, 1.6],
    [171.8, 156.7, 1.7],
    [177.7, 156.7, 1.7],
    [183.6, 156.7, 1.6],
    [189.3, 156.7, 1.7],
    [195.2, 156.7, 1.7],
    [201.1, 156.7, 1.6],
    [206.8, 156.7, 1.7],
    [212.8, 156.7, 1.7],
    [218.6, 156.7, 1.6],
    [224.4, 156.7, 1.6],
    [230.2, 156.7, 1.7],
    [236.2, 156.7, 1.7],
    [241.9, 156.7, 1.5],
    [247.8, 156.6, 1.4],
    [253.6, 156.7, 0.8],
    [277.0, 156.7, 0.8],
    [282.9, 156.7, 1.7],
    [288.7, 156.7, 1.7],
    [294.5, 156.7, 1.7],
    [300.4, 156.7, 1.7],
    [306.2, 156.7, 1.6],
    [312.0, 156.7, 1.7],
    [317.9, 156.7, 0.8],
    [323.8, 156.7, 0.8],
    [440.6, 156.7, 0.8],
    [446.5, 156.6, 1.2],
    [452.3, 156.6, 0.8],
    [458.2, 156.7, 1.4],
    [464.0, 156.7, 1.1],
    [469.9, 156.7, 0.8],
    [487.4, 156.7, 0.8],
    [493.2, 156.7, 0.8],
    [499.1, 156.7, 0.8],
    [504.9, 156.7, 0.8],
    [516.6, 156.7, 0.8],
    [522.5, 156.6, 1.2],
    [528.3, 156.7, 1.7],
    [534.1, 156.7, 1.6],
    [540.0, 156.7, 1.7],
    [545.9, 156.7, 1.6],
    [551.6, 156.7, 1.6],
    [557.5, 156.7, 1.7],
    [563.4, 156.7, 1.6],
    [569.2, 156.7, 1.6],
    [575.0, 156.7, 1.7],
    [580.9, 156.7, 1.7],
    [586.8, 156.7, 1.6],
    [592.5, 156.7, 1.7],
    [598.5, 156.7, 1.7],
    [604.2, 156.7, 1.6],
    [610.1, 156.7, 1.6],
    [616.0, 156.7, 1.7],
    [621.8, 156.7, 1.7],
    [627.6, 156.7, 1.6],
    [633.5, 156.7, 1.7],
    [639.4, 156.7, 1.6],
    [645.1, 156.7, 1.6],
    [651.0, 156.7, 1.7],
    [656.9, 156.7, 1.6],
    [662.8, 156.7, 1.6],
    [668.5, 156.7, 1.7],
    [674.4, 156.7, 1.7],
    [680.2, 156.7, 1.6],
    [686.0, 156.7, 1.7],
    [692.0, 156.7, 1.7],
    [697.8, 156.7, 1.6],
    [703.6, 156.7, 1.6],
    [709.5, 156.7, 1.7],
    [715.4, 156.7, 1.6],
    [721.1, 156.7, 1.6],
    [727.0, 156.7, 1.7],
    [732.9, 156.7, 1.6],
    [738.6, 156.7, 1.6],
    [744.5, 156.7, 1.7],
    [750.4, 156.7, 1.6],
    [756.2, 156.7, 1.6],
    [762.0, 156.7, 1.7],
    [767.9, 156.7, 1.7],
    [773.8, 156.7, 1.6],
    [779.5, 156.7, 1.7],
    [785.5, 156.7, 1.7],
    [791.2, 156.7, 1.6],
    [797.1, 156.7, 1.6],
    [803.0, 156.7, 1.7],
    [808.9, 156.7, 1.6],
    [814.7, 156.7, 0.9],
    [855.5, 156.7, 0.8],
    [861.4, 156.7, 1.4],
    [867.2, 156.7, 1.6],
    [873.1, 156.7, 0.8],
    [72.5, 161.2, 0.8],
    [78.3, 161.2, 1.0],
    [84.2, 161.2, 0.8],
    [90.0, 161.2, 0.8],
    [130.9, 161.2, 0.8],
    [136.8, 161.2, 0.9],
    [142.7, 161.2, 1.7],
    [148.4, 161.2, 1.6],
    [154.2, 161.2, 1.7],
    [160.2, 161.2, 1.7],
    [165.9, 161.2, 1.6],
    [171.8, 161.2, 1.7],
    [177.7, 161.2, 1.7],
    [183.6, 161.2, 1.6],
    [189.3, 161.2, 1.7],
    [195.2, 161.2, 1.7],
    [201.1, 161.2, 1.6],
    [206.8, 161.2, 1.7],
    [212.8, 161.2, 1.7],
    [218.6, 161.2, 1.6],
    [224.4, 161.2, 1.6],
    [230.2, 161.2, 1.7],
    [236.2, 161.2, 1.7],
    [241.9, 161.2, 1.6],
    [247.8, 161.2, 1.7],
    [253.7, 161.2, 1.7],
    [259.5, 161.2, 1.4],
    [265.3, 161.2, 0.8],
    [271.1, 161.2, 0.8],
    [277.0, 161.2, 1.7],
    [282.9, 161.2, 1.7],
    [288.7, 161.2, 1.7],
    [294.5, 161.2, 1.7],
    [300.4, 161.2, 1.7],
    [306.2, 161.2, 1.6],
    [312.0, 161.2, 1.7],
    [318.0, 161.2, 1.7],
    [323.8, 161.2, 1.1],
    [329.6, 161.2, 0.8],
    [440.6, 161.2, 1.2],
    [446.5, 161.2, 1.6],
    [452.4, 161.2, 0.8],
    [458.2, 161.2, 1.1],
    [464.0, 161.2, 1.7],
    [469.9, 161.2, 0.8],
    [481.6, 161.2, 0.8],
    [487.4, 161.2, 0.8],
    [493.2, 161.2, 1.4],
    [499.1, 161.2, 0.9],
    [505.0, 161.2, 0.8],
    [510.8, 161.2, 1.2],
    [516.6, 161.2, 1.5],
    [522.5, 161.2, 1.7],
    [528.3, 161.2, 1.7],
    [534.1, 161.2, 1.6],
    [540.0, 161.2, 1.7],
    [545.9, 161.2, 1.6],
    [551.6, 161.2, 1.6],
    [557.5, 161.2, 1.7],
    [563.4, 161.2, 1.6],
    [569.2, 161.2, 1.6],
    [575.0, 161.2, 1.7],
    [580.9, 161.2, 1.7],
    [586.8, 161.2, 1.6],
    [592.5, 161.2, 1.7],
    [598.5, 161.2, 1.7],
    [604.2, 161.2, 1.6],
    [610.1, 161.2, 1.6],
    [616.0, 161.2, 1.7],
    [621.8, 161.2, 1.7],
    [627.6, 161.2, 1.6],
    [633.5, 161.2, 1.7],
    [639.4, 161.2, 1.6],
    [645.1, 161.2, 1.6],
    [651.0, 161.2, 1.7],
    [656.9, 161.2, 1.6],
    [662.8, 161.2, 1.6],
    [668.5, 161.2, 1.7],
    [674.4, 161.2, 1.7],
    [680.2, 161.2, 1.6],
    [686.0, 161.2, 1.7],
    [692.0, 161.2, 1.7],
    [697.8, 161.2, 1.6],
    [703.6, 161.2, 1.6],
    [709.5, 161.2, 1.7],
    [715.4, 161.2, 1.6],
    [721.1, 161.2, 1.6],
    [727.0, 161.2, 1.7],
    [732.9, 161.2, 1.6],
    [738.6, 161.2, 1.6],
    [744.5, 161.2, 1.7],
    [750.4, 161.2, 1.6],
    [756.2, 161.2, 1.6],
    [762.0, 161.2, 1.7],
    [767.9, 161.2, 1.7],
    [773.8, 161.2, 1.6],
    [779.5, 161.2, 1.7],
    [785.5, 161.2, 1.7],
    [791.2, 161.2, 1.6],
    [797.1, 161.2, 1.6],
    [803.0, 161.2, 1.7],
    [808.8, 161.2, 0.8],
    [855.5, 161.2, 0.9],
    [861.5, 161.2, 1.7],
    [867.2, 161.2, 1.6],
    [873.0, 161.2, 0.8],
    [60.8, 165.7, 0.8],
    [66.6, 165.7, 0.8],
    [72.5, 165.7, 0.8],
    [136.8, 165.7, 0.8],
    [142.6, 165.7, 0.8],
    [148.4, 165.7, 1.6],
    [154.2, 165.7, 1.7],
    [160.2, 165.7, 1.7],
    [165.9, 165.7, 1.6],
    [171.8, 165.7, 1.7],
    [177.7, 165.7, 1.7],
    [183.6, 165.7, 1.6],
    [189.3, 165.7, 1.7],
    [195.2, 165.7, 1.7],
    [201.1, 165.7, 1.6],
    [206.8, 165.7, 1.7],
    [212.8, 165.7, 1.7],
    [218.6, 165.7, 1.6],
    [224.4, 165.7, 1.6],
    [230.2, 165.7, 1.7],
    [236.2, 165.7, 1.7],
    [241.9, 165.7, 1.6],
    [247.8, 165.7, 1.7],
    [253.7, 165.7, 1.7],
    [259.5, 165.7, 1.7],
    [265.4, 165.7, 0.8],
    [271.1, 165.7, 0.8],
    [277.0, 165.7, 1.7],
    [282.9, 165.7, 1.7],
    [288.7, 165.7, 1.7],
    [294.5, 165.7, 1.7],
    [300.4, 165.7, 1.7],
    [306.2, 165.7, 1.6],
    [312.0, 165.7, 1.7],
    [318.0, 165.7, 1.7],
    [323.8, 165.7, 1.6],
    [329.6, 165.7, 1.1],
    [434.8, 165.7, 0.8],
    [440.6, 165.7, 1.5],
    [446.5, 165.7, 1.1],
    [452.3, 165.7, 0.8],
    [458.2, 165.7, 1.6],
    [464.0, 165.7, 1.7],
    [469.9, 165.7, 1.5],
    [475.7, 165.7, 0.8],
    [481.5, 165.6, 1.3],
    [487.4, 165.7, 1.7],
    [493.2, 165.7, 1.6],
    [499.0, 165.7, 1.7],
    [505.0, 165.7, 1.7],
    [510.8, 165.7, 1.6],
    [516.6, 165.7, 1.6],
    [522.5, 165.7, 1.7],
    [528.3, 165.7, 1.7],
    [534.1, 165.7, 1.6],
    [540.0, 165.7, 1.7],
    [545.9, 165.7, 1.6],
    [551.6, 165.7, 1.6],
    [557.5, 165.7, 1.7],
    [563.4, 165.7, 1.6],
    [569.2, 165.7, 1.6],
    [575.0, 165.7, 1.7],
    [580.9, 165.7, 1.7],
    [586.8, 165.7, 1.6],
    [592.5, 165.7, 1.7],
    [598.5, 165.7, 1.7],
    [604.2, 165.7, 1.6],
    [610.1, 165.7, 1.6],
    [616.0, 165.7, 1.7],
    [621.8, 165.7, 1.7],
    [627.6, 165.7, 1.6],
    [633.5, 165.7, 1.7],
    [639.4, 165.7, 1.6],
    [645.1, 165.7, 1.6],
    [651.0, 165.7, 1.7],
    [656.9, 165.7, 1.6],
    [662.8, 165.7, 1.6],
    [668.5, 165.7, 1.7],
    [674.4, 165.7, 1.7],
    [680.2, 165.7, 1.6],
    [686.0, 165.7, 1.7],
    [692.0, 165.7, 1.7],
    [697.8, 165.7, 1.6],
    [703.6, 165.7, 1.6],
    [709.5, 165.7, 1.7],
    [715.4, 165.7, 1.6],
    [721.1, 165.7, 1.6],
    [727.0, 165.7, 1.7],
    [732.9, 165.7, 1.6],
    [738.6, 165.7, 1.6],
    [744.5, 165.7, 1.7],
    [750.4, 165.7, 1.6],
    [756.2, 165.7, 1.6],
    [762.0, 165.7, 1.7],
    [767.9, 165.7, 1.7],
    [773.8, 165.7, 1.6],
    [779.5, 165.7, 1.7],
    [785.5, 165.7, 1.7],
    [791.2, 165.7, 1.6],
    [797.1, 165.7, 1.6],
    [803.0, 165.7, 1.7],
    [808.9, 165.7, 1.1],
    [814.7, 165.7, 0.9],
    [820.5, 165.7, 0.8],
    [826.4, 165.7, 0.8],
    [855.5, 165.7, 0.8],
    [861.5, 165.7, 1.7],
    [867.2, 165.7, 1.3],
    [873.1, 165.7, 0.8],
    [60.8, 170.2, 0.8],
    [136.8, 170.2, 0.8],
    [142.7, 170.2, 0.8],
    [148.4, 170.2, 1.0],
    [154.2, 170.2, 1.7],
    [160.2, 170.2, 1.7],
    [165.9, 170.2, 1.6],
    [171.8, 170.2, 1.7],
    [177.7, 170.2, 1.7],
    [183.6, 170.2, 1.6],
    [189.3, 170.2, 1.7],
    [195.2, 170.2, 1.7],
    [201.1, 170.2, 1.6],
    [206.8, 170.2, 1.7],
    [212.8, 170.2, 1.7],
    [218.6, 170.2, 1.6],
    [224.4, 170.2, 1.6],
    [230.2, 170.2, 1.7],
    [236.2, 170.2, 1.7],
    [241.9, 170.2, 1.6],
    [247.8, 170.2, 1.7],
    [253.7, 170.2, 1.7],
    [259.5, 170.2, 1.7],
    [265.4, 170.2, 1.7],
    [271.2, 170.2, 1.2],
    [277.0, 170.2, 1.7],
    [282.9, 170.2, 1.7],
    [288.7, 170.2, 1.7],
    [294.5, 170.2, 1.7],
    [300.4, 170.2, 1.7],
    [306.2, 170.2, 1.6],
    [312.0, 170.2, 1.7],
    [318.0, 170.2, 1.7],
    [323.8, 170.1, 1.2],
    [329.6, 170.2, 0.9],
    [434.8, 170.2, 0.8],
    [440.6, 170.2, 0.8],
    [452.4, 170.2, 0.8],
    [458.1, 170.1, 1.3],
    [464.1, 170.2, 1.4],
    [469.9, 170.2, 1.0],
    [475.7, 170.2, 1.0],
    [481.6, 170.2, 1.6],
    [487.4, 170.2, 1.7],
    [493.2, 170.2, 1.6],
    [499.0, 170.2, 1.7],
    [505.0, 170.2, 1.7],
    [510.8, 170.2, 1.6],
    [516.6, 170.2, 1.6],
    [522.5, 170.2, 1.7],
    [528.3, 170.2, 1.7],
    [534.1, 170.2, 1.6],
    [540.0, 170.2, 1.7],
    [545.9, 170.2, 1.6],
    [551.6, 170.2, 1.6],
    [557.5, 170.2, 1.7],
    [563.4, 170.2, 1.6],
    [569.2, 170.2, 1.6],
    [575.0, 170.2, 1.7],
    [580.9, 170.2, 1.7],
    [586.8, 170.2, 1.6],
    [592.5, 170.2, 1.7],
    [598.5, 170.2, 1.7],
    [604.2, 170.2, 1.6],
    [610.1, 170.2, 1.6],
    [616.0, 170.2, 1.7],
    [621.8, 170.2, 1.7],
    [627.6, 170.2, 1.6],
    [633.5, 170.2, 1.7],
    [639.4, 170.2, 1.6],
    [645.1, 170.2, 1.6],
    [651.0, 170.2, 1.7],
    [656.9, 170.2, 1.6],
    [662.8, 170.2, 1.6],
    [668.5, 170.2, 1.7],
    [674.4, 170.2, 1.7],
    [680.2, 170.2, 1.6],
    [686.0, 170.2, 1.7],
    [692.0, 170.2, 1.7],
    [697.8, 170.2, 1.6],
    [703.6, 170.2, 1.6],
    [709.5, 170.2, 1.7],
    [715.4, 170.2, 1.6],
    [721.1, 170.2, 1.6],
    [727.0, 170.2, 1.7],
    [732.9, 170.2, 1.6],
    [738.6, 170.2, 1.6],
    [744.5, 170.2, 1.7],
    [750.4, 170.2, 1.6],
    [756.2, 170.2, 1.6],
    [762.0, 170.2, 1.7],
    [767.9, 170.2, 1.7],
    [773.8, 170.2, 1.6],
    [779.5, 170.2, 1.7],
    [785.5, 170.2, 1.7],
    [791.2, 170.2, 1.6],
    [797.1, 170.2, 1.6],
    [803.0, 170.2, 1.7],
    [808.9, 170.2, 1.6],
    [814.6, 170.2, 1.6],
    [820.5, 170.2, 1.3],
    [826.3, 170.2, 0.8],
    [855.5, 170.2, 0.8],
    [861.5, 170.2, 1.7],
    [867.2, 170.2, 0.8],
    [148.4, 174.7, 0.8],
    [154.3, 174.7, 1.5],
    [160.2, 174.7, 1.7],
    [165.9, 174.7, 1.6],
    [171.8, 174.7, 1.7],
    [177.7, 174.7, 1.7],
    [183.6, 174.7, 1.6],
    [189.3, 174.7, 1.7],
    [195.2, 174.7, 1.7],
    [201.1, 174.7, 1.6],
    [206.8, 174.7, 1.7],
    [212.8, 174.7, 1.7],
    [218.6, 174.7, 1.6],
    [224.4, 174.7, 1.6],
    [230.2, 174.7, 1.7],
    [236.2, 174.7, 1.7],
    [241.9, 174.7, 1.6],
    [247.8, 174.7, 1.7],
    [253.7, 174.7, 1.7],
    [259.5, 174.7, 1.7],
    [265.4, 174.7, 1.7],
    [271.1, 174.7, 1.7],
    [277.0, 174.7, 1.7],
    [282.9, 174.7, 1.7],
    [288.7, 174.7, 1.7],
    [294.5, 174.7, 1.7],
    [300.4, 174.7, 1.5],
    [306.2, 174.7, 0.9],
    [312.1, 174.7, 1.1],
    [317.9, 174.7, 0.8],
    [323.8, 174.7, 0.8],
    [329.6, 174.7, 1.0],
    [335.4, 174.7, 0.8],
    [452.4, 174.7, 0.8],
    [458.2, 174.7, 0.8],
    [464.0, 174.7, 0.8],
    [469.9, 174.7, 0.9],
    [475.7, 174.7, 1.6],
    [481.5, 174.7, 1.7],
    [487.4, 174.7, 1.7],
    [493.2, 174.7, 1.6],
    [499.0, 174.7, 1.7],
    [505.0, 174.7, 1.7],
    [510.8, 174.7, 1.6],
    [516.6, 174.7, 1.6],
    [522.5, 174.7, 1.7],
    [528.3, 174.7, 1.7],
    [534.1, 174.7, 1.6],
    [540.0, 174.7, 1.7],
    [545.9, 174.7, 1.6],
    [551.6, 174.7, 1.6],
    [557.5, 174.7, 1.7],
    [563.4, 174.7, 1.6],
    [569.2, 174.7, 1.6],
    [575.0, 174.7, 1.7],
    [580.9, 174.7, 1.7],
    [586.8, 174.7, 1.6],
    [592.5, 174.7, 1.7],
    [598.5, 174.7, 1.7],
    [604.2, 174.7, 1.6],
    [610.1, 174.7, 1.6],
    [616.0, 174.7, 1.7],
    [621.8, 174.7, 1.7],
    [627.6, 174.7, 1.6],
    [633.5, 174.7, 1.7],
    [639.4, 174.7, 1.6],
    [645.1, 174.7, 1.6],
    [651.0, 174.7, 1.7],
    [656.9, 174.7, 1.6],
    [662.8, 174.7, 1.6],
    [668.5, 174.7, 1.7],
    [674.4, 174.7, 1.7],
    [680.2, 174.7, 1.6],
    [686.0, 174.7, 1.7],
    [692.0, 174.7, 1.7],
    [697.8, 174.7, 1.6],
    [703.6, 174.7, 1.6],
    [709.5, 174.7, 1.7],
    [715.4, 174.7, 1.6],
    [721.1, 174.7, 1.6],
    [727.0, 174.7, 1.7],
    [732.9, 174.7, 1.6],
    [738.6, 174.7, 1.6],
    [744.5, 174.7, 1.7],
    [750.4, 174.7, 1.6],
    [756.2, 174.7, 1.6],
    [762.0, 174.7, 1.7],
    [767.9, 174.7, 1.7],
    [773.8, 174.7, 1.6],
    [779.5, 174.7, 1.7],
    [785.5, 174.7, 1.7],
    [791.2, 174.7, 1.6],
    [797.1, 174.7, 1.6],
    [803.0, 174.7, 1.7],
    [808.9, 174.7, 1.6],
    [814.6, 174.7, 1.6],
    [820.5, 174.7, 0.9],
    [826.4, 174.7, 0.9],
    [855.5, 174.7, 0.8],
    [861.4, 174.7, 0.8],
    [148.4, 179.2, 0.8],
    [154.3, 179.2, 0.8],
    [160.1, 179.2, 1.0],
    [166.0, 179.2, 1.6],
    [171.8, 179.2, 1.7],
    [177.7, 179.2, 1.7],
    [183.6, 179.2, 1.6],
    [189.3, 179.2, 1.7],
    [195.2, 179.2, 1.7],
    [201.1, 179.2, 1.6],
    [206.8, 179.2, 1.7],
    [212.8, 179.2, 1.7],
    [218.6, 179.2, 1.6],
    [224.4, 179.2, 1.6],
    [230.2, 179.2, 1.7],
    [236.2, 179.2, 1.7],
    [241.9, 179.2, 1.6],
    [247.8, 179.2, 1.7],
    [253.7, 179.2, 1.7],
    [259.5, 179.2, 1.7],
    [265.4, 179.2, 1.7],
    [271.1, 179.2, 1.7],
    [277.0, 179.2, 1.7],
    [282.9, 179.2, 1.7],
    [288.7, 179.2, 1.7],
    [294.6, 179.2, 1.4],
    [300.4, 179.2, 1.2],
    [306.2, 179.2, 1.3],
    [312.1, 179.2, 0.8],
    [317.9, 179.2, 0.8],
    [323.8, 179.2, 1.4],
    [329.6, 179.2, 1.7],
    [335.5, 179.2, 1.2],
    [458.2, 179.2, 0.8],
    [464.0, 179.2, 1.5],
    [469.9, 179.2, 1.7],
    [475.8, 179.2, 1.6],
    [481.5, 179.2, 1.7],
    [487.4, 179.2, 1.7],
    [493.2, 179.2, 1.6],
    [499.0, 179.2, 1.7],
    [505.0, 179.2, 1.7],
    [510.8, 179.2, 1.6],
    [516.6, 179.2, 1.6],
    [522.5, 179.2, 1.7],
    [528.3, 179.2, 1.7],
    [534.1, 179.2, 1.6],
    [540.0, 179.2, 1.7],
    [545.9, 179.2, 1.6],
    [551.6, 179.2, 1.6],
    [557.5, 179.2, 1.7],
    [563.4, 179.2, 1.6],
    [569.2, 179.2, 1.6],
    [575.0, 179.2, 1.7],
    [580.9, 179.2, 1.7],
    [586.8, 179.2, 1.6],
    [592.5, 179.2, 1.7],
    [598.5, 179.2, 1.7],
    [604.2, 179.2, 1.6],
    [610.1, 179.2, 1.6],
    [616.0, 179.2, 1.7],
    [621.8, 179.2, 1.7],
    [627.6, 179.2, 1.6],
    [633.5, 179.2, 1.7],
    [639.4, 179.2, 1.6],
    [645.1, 179.2, 1.6],
    [651.0, 179.2, 1.7],
    [656.9, 179.2, 1.6],
    [662.8, 179.2, 1.6],
    [668.5, 179.2, 1.7],
    [674.4, 179.2, 1.7],
    [680.2, 179.2, 1.6],
    [686.0, 179.2, 1.7],
    [692.0, 179.2, 1.7],
    [697.8, 179.2, 1.6],
    [703.6, 179.2, 1.6],
    [709.5, 179.2, 1.7],
    [715.4, 179.2, 1.6],
    [721.1, 179.2, 1.6],
    [727.0, 179.2, 1.7],
    [732.9, 179.2, 1.6],
    [738.6, 179.2, 1.6],
    [744.5, 179.2, 1.7],
    [750.4, 179.2, 1.6],
    [756.2, 179.2, 1.6],
    [762.0, 179.2, 1.7],
    [767.9, 179.2, 1.7],
    [773.8, 179.2, 1.6],
    [779.5, 179.2, 1.7],
    [785.5, 179.2, 1.7],
    [791.2, 179.2, 1.6],
    [797.1, 179.2, 1.6],
    [803.0, 179.2, 1.7],
    [808.9, 179.2, 1.6],
    [814.6, 179.2, 1.6],
    [820.5, 179.1, 0.8],
    [826.3, 179.2, 1.1],
    [832.2, 179.2, 0.8],
    [160.2, 183.7, 0.8],
    [165.9, 183.7, 1.6],
    [171.8, 183.7, 1.7],
    [177.7, 183.7, 1.7],
    [183.6, 183.7, 1.6],
    [189.3, 183.7, 1.7],
    [195.2, 183.7, 1.7],
    [201.1, 183.7, 1.6],
    [206.8, 183.7, 1.7],
    [212.8, 183.7, 1.7],
    [218.6, 183.7, 1.6],
    [224.4, 183.7, 1.6],
    [230.2, 183.7, 1.7],
    [236.2, 183.7, 1.7],
    [241.9, 183.7, 1.6],
    [247.8, 183.7, 1.7],
    [253.7, 183.7, 1.7],
    [259.5, 183.7, 1.7],
    [265.4, 183.7, 1.7],
    [271.1, 183.7, 1.7],
    [277.0, 183.7, 1.7],
    [282.9, 183.7, 1.7],
    [288.7, 183.7, 1.7],
    [294.5, 183.7, 1.6],
    [300.4, 183.7, 1.7],
    [306.2, 183.7, 1.2],
    [312.1, 183.7, 0.8],
    [318.0, 183.7, 0.8],
    [329.6, 183.7, 0.8],
    [335.4, 183.7, 0.8],
    [464.0, 183.7, 0.9],
    [469.9, 183.7, 1.7],
    [475.8, 183.7, 1.6],
    [481.5, 183.7, 1.7],
    [487.4, 183.7, 1.7],
    [493.2, 183.7, 1.6],
    [499.0, 183.7, 1.7],
    [505.0, 183.7, 1.7],
    [510.8, 183.7, 1.6],
    [516.6, 183.7, 1.6],
    [522.5, 183.7, 1.7],
    [528.3, 183.7, 1.7],
    [534.1, 183.7, 1.6],
    [540.0, 183.7, 1.7],
    [545.9, 183.7, 1.1],
    [551.7, 183.7, 1.5],
    [557.5, 183.7, 1.1],
    [563.4, 183.7, 0.9],
    [569.2, 183.7, 1.6],
    [575.0, 183.7, 1.7],
    [580.9, 183.7, 1.7],
    [586.8, 183.7, 1.6],
    [592.6, 183.7, 1.0],
    [598.5, 183.7, 0.8],
    [604.2, 183.7, 1.6],
    [610.1, 183.7, 1.6],
    [616.0, 183.7, 1.7],
    [621.8, 183.7, 1.7],
    [627.6, 183.7, 1.6],
    [633.5, 183.7, 1.7],
    [639.4, 183.7, 1.6],
    [645.1, 183.7, 1.6],
    [651.0, 183.7, 1.7],
    [656.9, 183.7, 1.6],
    [662.8, 183.7, 1.6],
    [668.5, 183.7, 1.7],
    [674.4, 183.7, 1.7],
    [680.2, 183.7, 1.6],
    [686.0, 183.7, 1.7],
    [692.0, 183.7, 1.7],
    [697.8, 183.7, 1.6],
    [703.6, 183.7, 1.6],
    [709.5, 183.7, 1.7],
    [715.4, 183.7, 1.6],
    [721.1, 183.7, 1.6],
    [727.0, 183.7, 1.7],
    [732.9, 183.7, 1.6],
    [738.6, 183.7, 1.6],
    [744.5, 183.7, 1.7],
    [750.4, 183.7, 1.6],
    [756.2, 183.7, 1.6],
    [762.0, 183.7, 1.7],
    [767.9, 183.7, 1.7],
    [773.8, 183.7, 1.6],
    [779.5, 183.7, 1.7],
    [785.5, 183.7, 1.7],
    [791.2, 183.7, 1.6],
    [797.1, 183.7, 1.6],
    [803.0, 183.7, 1.7],
    [808.9, 183.7, 1.6],
    [814.7, 183.7, 1.2],
    [820.5, 183.7, 0.8],
    [826.4, 183.7, 0.8],
    [160.1, 188.2, 0.8],
    [165.9, 188.2, 1.6],
    [171.8, 188.2, 1.7],
    [177.7, 188.2, 1.7],
    [183.6, 188.2, 1.6],
    [189.3, 188.2, 1.7],
    [195.2, 188.2, 1.7],
    [201.1, 188.2, 1.6],
    [206.8, 188.2, 1.7],
    [212.8, 188.2, 1.7],
    [218.6, 188.2, 1.6],
    [224.4, 188.2, 1.6],
    [230.2, 188.2, 1.7],
    [236.2, 188.2, 1.7],
    [241.9, 188.2, 1.6],
    [247.8, 188.2, 1.7],
    [253.7, 188.2, 1.7],
    [259.5, 188.2, 1.7],
    [265.4, 188.2, 1.7],
    [271.1, 188.2, 1.7],
    [277.0, 188.2, 1.7],
    [282.9, 188.2, 1.7],
    [288.7, 188.2, 1.7],
    [294.5, 188.2, 1.7],
    [300.4, 188.2, 1.6],
    [306.2, 188.2, 1.2],
    [312.1, 188.2, 1.4],
    [317.9, 188.2, 0.8],
    [464.1, 188.2, 0.8],
    [469.9, 188.2, 1.7],
    [475.8, 188.2, 1.6],
    [481.5, 188.2, 1.7],
    [487.4, 188.2, 1.7],
    [493.2, 188.2, 1.6],
    [499.1, 188.2, 1.2],
    [504.9, 188.2, 1.1],
    [510.8, 188.2, 1.6],
    [516.6, 188.2, 1.6],
    [522.5, 188.2, 1.7],
    [528.3, 188.2, 1.7],
    [534.1, 188.2, 1.6],
    [540.0, 188.2, 1.6],
    [545.8, 188.2, 0.8],
    [551.7, 188.2, 1.0],
    [557.5, 188.2, 0.9],
    [563.4, 188.2, 1.4],
    [569.2, 188.2, 1.6],
    [575.0, 188.2, 1.7],
    [580.9, 188.2, 1.7],
    [586.8, 188.2, 1.0],
    [592.5, 188.2, 0.8],
    [598.5, 188.2, 0.8],
    [604.2, 188.2, 1.5],
    [610.1, 188.2, 1.6],
    [616.0, 188.2, 1.7],
    [621.8, 188.2, 1.7],
    [627.6, 188.2, 1.6],
    [633.5, 188.2, 1.7],
    [639.4, 188.2, 1.6],
    [645.1, 188.2, 1.6],
    [651.0, 188.2, 1.7],
    [656.9, 188.2, 1.6],
    [662.8, 188.2, 1.6],
    [668.5, 188.2, 1.7],
    [674.4, 188.2, 1.7],
    [680.2, 188.2, 1.6],
    [686.0, 188.2, 1.7],
    [692.0, 188.2, 1.7],
    [697.8, 188.2, 1.6],
    [703.6, 188.2, 1.6],
    [709.5, 188.2, 1.7],
    [715.4, 188.2, 1.6],
    [721.1, 188.2, 1.6],
    [727.0, 188.2, 1.7],
    [732.9, 188.2, 1.6],
    [738.6, 188.2, 1.6],
    [744.5, 188.2, 1.7],
    [750.4, 188.2, 1.6],
    [756.2, 188.2, 1.6],
    [762.0, 188.2, 1.7],
    [767.9, 188.2, 1.7],
    [773.8, 188.2, 1.6],
    [779.5, 188.2, 1.7],
    [785.5, 188.2, 1.7],
    [791.2, 188.2, 1.6],
    [797.1, 188.2, 1.6],
    [803.0, 188.2, 1.7],
    [808.8, 188.2, 1.6],
    [814.6, 188.2, 0.8],
    [820.5, 188.2, 0.8],
    [826.3, 188.2, 0.8],
    [160.1, 192.7, 0.8],
    [165.9, 192.7, 1.6],
    [171.8, 192.7, 1.7],
    [177.7, 192.7, 1.7],
    [183.6, 192.7, 1.6],
    [189.3, 192.7, 1.7],
    [195.2, 192.7, 1.7],
    [201.1, 192.7, 1.6],
    [206.8, 192.7, 1.7],
    [212.8, 192.7, 1.7],
    [218.6, 192.7, 1.6],
    [224.4, 192.7, 1.6],
    [230.2, 192.7, 1.7],
    [236.2, 192.7, 1.7],
    [241.9, 192.7, 1.6],
    [247.8, 192.7, 1.7],
    [253.7, 192.7, 1.7],
    [259.5, 192.7, 1.7],
    [265.4, 192.7, 1.7],
    [271.1, 192.7, 1.7],
    [277.0, 192.7, 1.7],
    [282.9, 192.7, 1.7],
    [288.7, 192.7, 1.7],
    [294.5, 192.7, 1.3],
    [300.4, 192.7, 0.8],
    [306.2, 192.7, 0.8],
    [312.0, 192.7, 0.8],
    [446.5, 192.7, 0.8],
    [452.4, 192.7, 0.8],
    [458.2, 192.7, 0.8],
    [464.0, 192.7, 0.8],
    [469.9, 192.7, 1.7],
    [475.7, 192.7, 1.6],
    [481.5, 192.7, 1.2],
    [487.4, 192.7, 0.8],
    [493.2, 192.7, 0.8],
    [499.1, 192.7, 1.6],
    [504.9, 192.7, 0.8],
    [510.8, 192.6, 1.2],
    [516.6, 192.7, 1.6],
    [522.5, 192.7, 1.7],
    [528.3, 192.7, 1.7],
    [534.1, 192.7, 1.6],
    [540.0, 192.7, 0.9],
    [563.4, 192.7, 0.8],
    [569.2, 192.7, 1.3],
    [575.0, 192.7, 1.7],
    [580.9, 192.7, 1.7],
    [586.8, 192.7, 0.9],
    [592.6, 192.7, 0.8],
    [598.4, 192.7, 1.4],
    [604.2, 192.7, 1.6],
    [610.1, 192.7, 1.6],
    [616.0, 192.7, 1.7],
    [621.8, 192.7, 1.7],
    [627.6, 192.7, 1.6],
    [633.5, 192.7, 1.7],
    [639.4, 192.7, 1.6],
    [645.1, 192.7, 1.6],
    [651.0, 192.7, 1.7],
    [656.9, 192.7, 1.6],
    [662.8, 192.7, 1.6],
    [668.5, 192.7, 1.7],
    [674.4, 192.7, 1.7],
    [680.2, 192.7, 1.6],
    [686.0, 192.7, 1.7],
    [692.0, 192.7, 1.7],
    [697.8, 192.7, 1.6],
    [703.6, 192.7, 1.6],
    [709.5, 192.7, 1.7],
    [715.4, 192.7, 1.6],
    [721.1, 192.7, 1.6],
    [727.0, 192.7, 1.7],
    [732.9, 192.7, 1.6],
    [738.6, 192.7, 1.6],
    [744.5, 192.7, 1.7],
    [750.4, 192.7, 1.6],
    [756.2, 192.7, 1.6],
    [762.0, 192.7, 1.7],
    [767.9, 192.7, 1.7],
    [773.8, 192.7, 1.6],
    [779.5, 192.7, 1.7],
    [785.5, 192.7, 1.7],
    [791.2, 192.7, 1.6],
    [797.1, 192.7, 1.6],
    [803.0, 192.7, 1.7],
    [808.8, 192.7, 0.8],
    [820.5, 192.7, 0.8],
    [826.3, 192.7, 0.8],
    [832.2, 192.7, 0.8],
    [160.1, 197.2, 0.9],
    [165.9, 197.2, 1.6],
    [171.8, 197.2, 1.7],
    [177.7, 197.2, 1.7],
    [183.6, 197.2, 1.6],
    [189.3, 197.2, 1.7],
    [195.2, 197.2, 1.7],
    [201.1, 197.2, 1.6],
    [206.8, 197.2, 1.7],
    [212.8, 197.2, 1.7],
    [218.6, 197.2, 1.6],
    [224.4, 197.2, 1.6],
    [230.2, 197.2, 1.7],
    [236.2, 197.2, 1.7],
    [241.9, 197.2, 1.6],
    [247.8, 197.2, 1.7],
    [253.7, 197.2, 1.7],
    [259.5, 197.2, 1.7],
    [265.4, 197.2, 1.7],
    [271.1, 197.2, 1.7],
    [277.0, 197.2, 1.7],
    [282.9, 197.2, 1.7],
    [288.7, 197.2, 1.7],
    [294.5, 197.2, 0.8],
    [446.5, 197.2, 0.8],
    [452.4, 197.2, 1.7],
    [458.1, 197.2, 1.7],
    [464.0, 197.2, 1.7],
    [469.9, 197.2, 1.7],
    [475.7, 197.2, 1.1],
    [487.4, 197.2, 0.8],
    [493.2, 197.2, 0.8],
    [499.1, 197.2, 1.1],
    [504.9, 197.2, 1.3],
    [510.8, 197.2, 0.8],
    [516.7, 197.2, 0.9],
    [522.5, 197.2, 1.7],
    [528.3, 197.2, 1.7],
    [534.1, 197.2, 1.6],
    [540.0, 197.2, 0.8],
    [545.8, 197.2, 0.8],
    [551.6, 197.2, 0.8],
    [557.5, 197.2, 0.8],
    [569.2, 197.2, 0.8],
    [575.0, 197.2, 1.6],
    [580.9, 197.2, 1.7],
    [586.8, 197.2, 1.5],
    [592.6, 197.2, 0.8],
    [598.4, 197.2, 0.8],
    [604.2, 197.2, 1.5],
    [610.1, 197.2, 1.6],
    [616.0, 197.2, 1.7],
    [621.8, 197.2, 1.7],
    [627.6, 197.2, 1.6],
    [633.5, 197.2, 1.7],
    [639.4, 197.2, 1.6],
    [645.1, 197.2, 1.6],
    [651.0, 197.2, 1.7],
    [656.9, 197.2, 1.6],
    [662.8, 197.2, 1.6],
    [668.5, 197.2, 1.7],
    [674.4, 197.2, 1.7],
    [680.2, 197.2, 1.6],
    [686.0, 197.2, 1.7],
    [692.0, 197.2, 1.7],
    [697.8, 197.2, 1.6],
    [703.6, 197.2, 1.6],
    [709.5, 197.2, 1.7],
    [715.4, 197.2, 1.6],
    [721.1, 197.2, 1.6],
    [727.0, 197.2, 1.7],
    [732.9, 197.2, 1.6],
    [738.6, 197.2, 1.6],
    [744.5, 197.2, 1.7],
    [750.4, 197.2, 1.6],
    [756.2, 197.2, 1.6],
    [762.0, 197.2, 1.7],
    [767.9, 197.2, 1.7],
    [773.8, 197.2, 1.6],
    [779.5, 197.2, 1.7],
    [785.5, 197.2, 1.7],
    [791.3, 197.2, 1.6],
    [797.1, 197.2, 0.9],
    [803.0, 197.2, 0.8],
    [814.6, 197.2, 0.8],
    [820.5, 197.2, 1.2],
    [826.4, 197.2, 1.4],
    [832.1, 197.2, 0.8],
    [160.1, 201.7, 0.9],
    [165.9, 201.7, 1.6],
    [171.8, 201.7, 1.7],
    [177.7, 201.7, 1.7],
    [183.6, 201.7, 1.6],
    [189.3, 201.7, 1.7],
    [195.2, 201.7, 1.7],
    [201.1, 201.7, 1.6],
    [206.8, 201.7, 1.7],
    [212.8, 201.7, 1.7],
    [218.6, 201.7, 1.6],
    [224.4, 201.7, 1.6],
    [230.2, 201.7, 1.7],
    [236.2, 201.7, 1.7],
    [241.9, 201.7, 1.6],
    [247.8, 201.7, 1.7],
    [253.7, 201.7, 1.7],
    [259.5, 201.7, 1.7],
    [265.4, 201.7, 1.7],
    [271.1, 201.7, 1.7],
    [277.0, 201.7, 1.7],
    [282.9, 201.7, 1.5],
    [288.7, 201.7, 0.8],
    [294.6, 201.7, 0.8],
    [446.5, 201.7, 0.8],
    [452.4, 201.7, 1.7],
    [458.1, 201.7, 1.7],
    [464.0, 201.7, 1.7],
    [469.9, 201.7, 1.2],
    [475.8, 201.7, 0.8],
    [487.4, 201.7, 0.8],
    [493.2, 201.7, 0.9],
    [499.1, 201.7, 0.8],
    [504.9, 201.7, 0.8],
    [510.8, 201.6, 1.4],
    [516.6, 201.7, 0.8],
    [522.5, 201.7, 1.6],
    [528.3, 201.7, 0.8],
    [534.2, 201.7, 1.1],
    [540.0, 201.7, 1.2],
    [545.8, 201.7, 1.6],
    [551.6, 201.7, 1.6],
    [557.5, 201.7, 1.7],
    [563.3, 201.7, 1.4],
    [569.2, 201.7, 1.5],
    [575.0, 201.7, 1.7],
    [580.9, 201.7, 1.7],
    [586.8, 201.7, 1.6],
    [592.5, 201.7, 0.8],
    [598.5, 201.7, 0.8],
    [604.2, 201.7, 1.5],
    [610.1, 201.7, 1.6],
    [616.0, 201.7, 1.7],
    [621.8, 201.7, 1.7],
    [627.6, 201.7, 1.6],
    [633.5, 201.7, 1.7],
    [639.4, 201.7, 1.6],
    [645.1, 201.7, 1.6],
    [651.0, 201.7, 1.7],
    [656.9, 201.7, 1.6],
    [662.8, 201.7, 1.6],
    [668.5, 201.7, 1.7],
    [674.4, 201.7, 1.7],
    [680.2, 201.7, 1.6],
    [686.0, 201.7, 1.7],
    [692.0, 201.7, 1.7],
    [697.8, 201.7, 1.6],
    [703.6, 201.7, 1.6],
    [709.5, 201.7, 1.7],
    [715.4, 201.7, 1.6],
    [721.1, 201.7, 1.6],
    [727.0, 201.7, 1.7],
    [732.9, 201.7, 1.6],
    [738.6, 201.7, 1.6],
    [744.5, 201.7, 1.7],
    [750.4, 201.7, 1.6],
    [756.2, 201.7, 1.6],
    [762.0, 201.7, 1.7],
    [767.9, 201.7, 1.6],
    [773.8, 201.7, 1.5],
    [779.5, 201.7, 1.7],
    [785.5, 201.7, 1.7],
    [791.2, 201.7, 0.9],
    [814.6, 201.7, 0.8],
    [820.5, 201.7, 0.8],
    [826.3, 201.7, 0.8],
    [160.1, 206.1, 0.8],
    [165.9, 206.2, 1.6],
    [171.8, 206.2, 1.7],
    [177.7, 206.2, 1.7],
    [183.6, 206.2, 1.6],
    [189.3, 206.2, 1.7],
    [195.2, 206.2, 1.7],
    [201.1, 206.2, 1.6],
    [206.8, 206.2, 1.7],
    [212.8, 206.2, 1.7],
    [218.6, 206.2, 1.6],
    [224.4, 206.2, 1.6],
    [230.2, 206.2, 1.7],
    [236.2, 206.2, 1.7],
    [241.9, 206.2, 1.6],
    [247.8, 206.2, 1.7],
    [253.7, 206.2, 1.7],
    [259.5, 206.2, 1.7],
    [265.4, 206.2, 1.7],
    [271.1, 206.2, 1.7],
    [277.1, 206.2, 1.6],
    [282.9, 206.2, 1.0],
    [446.4, 206.2, 0.9],
    [452.4, 206.2, 1.7],
    [458.1, 206.2, 1.7],
    [464.0, 206.2, 1.7],
    [469.9, 206.2, 0.8],
    [475.7, 206.2, 0.8],
    [487.4, 206.2, 0.8],
    [493.2, 206.2, 0.8],
    [504.9, 206.2, 0.8],
    [510.8, 206.2, 0.9],
    [516.6, 206.2, 0.8],
    [522.5, 206.2, 1.3],
    [528.3, 206.2, 0.8],
    [534.1, 206.2, 0.8],
    [540.0, 206.2, 1.7],
    [545.9, 206.2, 1.6],
    [551.6, 206.2, 1.6],
    [557.5, 206.2, 1.7],
    [563.4, 206.2, 1.6],
    [569.2, 206.2, 1.6],
    [575.0, 206.2, 1.7],
    [580.9, 206.2, 1.7],
    [586.8, 206.2, 1.6],
    [592.6, 206.2, 0.8],
    [604.2, 206.2, 1.5],
    [610.1, 206.2, 1.6],
    [616.0, 206.2, 1.7],
    [621.8, 206.2, 1.7],
    [627.6, 206.2, 1.6],
    [633.5, 206.2, 1.7],
    [639.4, 206.2, 1.6],
    [645.1, 206.2, 1.6],
    [651.0, 206.2, 1.7],
    [656.9, 206.2, 1.6],
    [662.8, 206.2, 1.6],
    [668.5, 206.2, 1.7],
    [674.4, 206.2, 1.7],
    [680.2, 206.2, 1.6],
    [686.0, 206.2, 1.7],
    [692.0, 206.2, 1.7],
    [697.8, 206.2, 1.6],
    [703.6, 206.2, 1.6],
    [709.5, 206.2, 1.7],
    [715.4, 206.2, 1.6],
    [721.1, 206.2, 1.6],
    [727.0, 206.2, 1.7],
    [732.9, 206.2, 1.6],
    [738.6, 206.2, 1.6],
    [744.5, 206.2, 1.7],
    [750.4, 206.2, 1.6],
    [756.2, 206.2, 1.6],
    [762.0, 206.2, 1.3],
    [767.9, 206.2, 0.8],
    [773.8, 206.2, 0.8],
    [779.6, 206.2, 1.1],
    [785.4, 206.2, 1.3],
    [791.3, 206.2, 0.8],
    [814.6, 206.2, 0.8],
    [820.5, 206.2, 1.2],
    [160.1, 210.7, 0.8],
    [166.0, 210.7, 1.3],
    [171.8, 210.7, 1.7],
    [177.7, 210.7, 1.7],
    [183.6, 210.7, 1.6],
    [189.3, 210.7, 1.7],
    [195.2, 210.7, 1.7],
    [201.1, 210.7, 1.6],
    [206.8, 210.7, 1.7],
    [212.8, 210.7, 1.7],
    [218.6, 210.7, 1.6],
    [224.4, 210.7, 1.6],
    [230.2, 210.7, 1.7],
    [236.2, 210.7, 1.7],
    [241.9, 210.7, 1.6],
    [247.8, 210.7, 1.7],
    [253.7, 210.7, 1.7],
    [259.5, 210.7, 1.7],
    [265.4, 210.7, 1.7],
    [271.1, 210.7, 1.7],
    [277.1, 210.7, 1.4],
    [282.9, 210.7, 0.8],
    [446.5, 210.7, 0.8],
    [452.3, 210.7, 1.3],
    [458.2, 210.7, 1.5],
    [464.1, 210.7, 1.1],
    [469.9, 210.7, 0.8],
    [475.7, 210.7, 0.8],
    [481.6, 210.7, 0.8],
    [487.4, 210.7, 0.8],
    [493.2, 210.7, 0.8],
    [499.1, 210.7, 0.8],
    [504.9, 210.7, 1.1],
    [510.8, 210.7, 0.8],
    [522.5, 210.7, 0.8],
    [528.3, 210.7, 0.8],
    [534.1, 210.7, 0.8],
    [540.0, 210.7, 1.5],
    [545.8, 210.7, 1.6],
    [551.6, 210.7, 1.6],
    [557.5, 210.7, 1.6],
    [563.4, 210.7, 1.6],
    [569.2, 210.7, 1.6],
    [575.0, 210.7, 1.7],
    [580.9, 210.7, 1.7],
    [586.8, 210.7, 1.6],
    [592.6, 210.7, 0.9],
    [598.5, 210.7, 0.8],
    [604.3, 210.7, 1.2],
    [610.1, 210.7, 1.6],
    [616.0, 210.7, 1.7],
    [621.8, 210.7, 1.7],
    [627.6, 210.7, 1.6],
    [633.5, 210.7, 1.7],
    [639.4, 210.7, 1.6],
    [645.1, 210.7, 1.6],
    [651.0, 210.7, 1.7],
    [656.9, 210.7, 1.6],
    [662.8, 210.7, 1.6],
    [668.5, 210.7, 1.7],
    [674.4, 210.7, 1.7],
    [680.2, 210.7, 1.6],
    [686.0, 210.7, 1.7],
    [692.0, 210.7, 1.7],
    [697.8, 210.7, 1.6],
    [703.6, 210.7, 1.6],
    [709.5, 210.7, 1.7],
    [715.4, 210.7, 1.6],
    [721.1, 210.7, 1.6],
    [727.0, 210.7, 1.7],
    [732.9, 210.7, 1.6],
    [738.6, 210.7, 1.6],
    [744.5, 210.7, 1.7],
    [750.4, 210.7, 1.6],
    [756.2, 210.7, 1.6],
    [762.1, 210.7, 1.3],
    [767.9, 210.7, 0.8],
    [773.8, 210.7, 0.8],
    [779.5, 210.7, 0.8],
    [785.5, 210.7, 1.4],
    [791.2, 210.7, 0.8],
    [808.8, 210.7, 0.8],
    [814.7, 210.7, 0.9],
    [820.5, 210.7, 0.8],
    [165.9, 215.2, 0.8],
    [171.8, 215.2, 1.7],
    [177.7, 215.2, 1.7],
    [183.6, 215.2, 1.6],
    [189.3, 215.2, 1.7],
    [195.2, 215.2, 1.7],
    [201.1, 215.2, 1.6],
    [206.8, 215.2, 1.7],
    [212.8, 215.2, 1.7],
    [218.6, 215.2, 1.6],
    [224.4, 215.2, 1.6],
    [230.2, 215.2, 1.7],
    [236.2, 215.2, 1.7],
    [241.9, 215.2, 1.6],
    [247.8, 215.2, 1.7],
    [253.7, 215.2, 1.7],
    [259.5, 215.2, 1.7],
    [265.4, 215.2, 1.7],
    [271.1, 215.2, 1.7],
    [277.0, 215.2, 1.5],
    [282.9, 215.2, 0.8],
    [452.4, 215.2, 0.8],
    [458.1, 215.2, 0.8],
    [464.0, 215.1, 0.8],
    [469.9, 215.2, 1.5],
    [475.8, 215.2, 1.6],
    [481.5, 215.2, 1.7],
    [487.4, 215.2, 1.7],
    [493.2, 215.2, 1.6],
    [499.1, 215.2, 0.8],
    [528.3, 215.2, 0.8],
    [534.2, 215.2, 0.8],
    [540.0, 215.2, 0.8],
    [545.9, 215.2, 0.8],
    [551.7, 215.1, 0.8],
    [557.5, 215.2, 0.8],
    [563.4, 215.2, 1.6],
    [569.2, 215.2, 1.6],
    [575.0, 215.2, 1.7],
    [580.9, 215.2, 1.7],
    [586.8, 215.2, 1.6],
    [592.5, 215.2, 1.7],
    [598.5, 215.2, 1.7],
    [604.2, 215.2, 1.6],
    [610.1, 215.2, 1.6],
    [616.0, 215.2, 1.7],
    [621.8, 215.2, 1.7],
    [627.6, 215.2, 1.6],
    [633.5, 215.2, 1.7],
    [639.4, 215.2, 1.6],
    [645.1, 215.2, 1.6],
    [651.0, 215.2, 1.7],
    [656.9, 215.2, 1.6],
    [662.8, 215.2, 1.6],
    [668.5, 215.2, 1.7],
    [674.4, 215.2, 1.7],
    [680.2, 215.2, 1.6],
    [686.0, 215.2, 1.7],
    [692.0, 215.2, 1.7],
    [697.8, 215.2, 1.6],
    [703.6, 215.2, 1.6],
    [709.5, 215.2, 1.7],
    [715.4, 215.2, 1.6],
    [721.1, 215.2, 1.6],
    [727.0, 215.2, 1.7],
    [732.9, 215.2, 1.6],
    [738.6, 215.2, 1.6],
    [744.5, 215.2, 1.7],
    [750.4, 215.2, 1.6],
    [756.2, 215.2, 1.6],
    [762.0, 215.2, 1.7],
    [767.9, 215.2, 0.9],
    [773.8, 215.2, 0.8],
    [779.6, 215.2, 0.8],
    [785.5, 215.2, 1.4],
    [791.2, 215.2, 0.8],
    [797.1, 215.2, 0.8],
    [803.0, 215.2, 0.8],
    [808.8, 215.2, 1.4],
    [814.6, 215.2, 1.6],
    [820.5, 215.2, 0.8],
    [166.0, 219.7, 0.8],
    [171.8, 219.7, 0.8],
    [177.7, 219.7, 1.6],
    [183.6, 219.7, 1.6],
    [189.3, 219.7, 1.7],
    [195.2, 219.7, 1.7],
    [201.1, 219.7, 1.6],
    [206.8, 219.7, 1.7],
    [212.8, 219.7, 1.7],
    [218.6, 219.7, 1.6],
    [224.4, 219.7, 1.6],
    [230.2, 219.7, 1.7],
    [236.2, 219.7, 1.7],
    [241.9, 219.7, 1.6],
    [247.8, 219.7, 1.7],
    [253.7, 219.7, 1.7],
    [259.5, 219.7, 1.7],
    [265.4, 219.7, 1.7],
    [271.1, 219.7, 1.5],
    [277.0, 219.7, 0.8],
    [446.5, 219.7, 0.8],
    [452.4, 219.7, 1.2],
    [458.1, 219.7, 1.7],
    [464.0, 219.7, 1.7],
    [469.9, 219.7, 1.7],
    [475.8, 219.7, 1.6],
    [481.5, 219.7, 1.7],
    [487.4, 219.7, 1.7],
    [493.2, 219.7, 1.4],
    [499.1, 219.7, 0.8],
    [545.8, 219.6, 0.8],
    [551.6, 219.7, 0.8],
    [557.5, 219.7, 0.8],
    [563.4, 219.7, 1.6],
    [569.2, 219.7, 1.6],
    [575.0, 219.7, 1.7],
    [580.9, 219.7, 1.7],
    [586.8, 219.7, 1.6],
    [592.5, 219.7, 1.7],
    [598.5, 219.7, 1.7],
    [604.2, 219.7, 1.6],
    [610.1, 219.7, 1.6],
    [616.0, 219.7, 1.7],
    [621.8, 219.7, 1.7],
    [627.6, 219.7, 1.6],
    [633.5, 219.7, 1.7],
    [639.4, 219.7, 1.6],
    [645.1, 219.7, 1.6],
    [651.0, 219.7, 1.7],
    [656.9, 219.7, 1.6],
    [662.8, 219.7, 1.6],
    [668.5, 219.7, 1.7],
    [674.4, 219.7, 1.7],
    [680.2, 219.7, 1.6],
    [686.0, 219.7, 1.7],
    [692.0, 219.7, 1.7],
    [697.8, 219.7, 1.6],
    [703.6, 219.7, 1.6],
    [709.5, 219.7, 1.7],
    [715.4, 219.7, 1.6],
    [721.1, 219.7, 1.6],
    [727.0, 219.7, 1.7],
    [732.9, 219.7, 1.6],
    [738.6, 219.7, 1.6],
    [744.5, 219.7, 1.7],
    [750.4, 219.7, 1.6],
    [756.2, 219.7, 1.6],
    [762.0, 219.7, 1.7],
    [767.9, 219.7, 0.9],
    [785.5, 219.7, 0.8],
    [791.2, 219.7, 0.8],
    [797.1, 219.7, 1.2],
    [803.0, 219.7, 1.4],
    [808.8, 219.7, 1.0],
    [814.6, 219.7, 0.8],
    [820.5, 219.7, 0.8],
    [177.7, 224.1, 0.8],
    [183.5, 224.2, 1.5],
    [189.3, 224.2, 1.7],
    [195.2, 224.2, 1.7],
    [201.1, 224.2, 1.6],
    [206.8, 224.2, 1.7],
    [212.8, 224.2, 1.7],
    [218.6, 224.2, 1.6],
    [224.4, 224.2, 1.6],
    [230.2, 224.2, 1.7],
    [236.2, 224.2, 1.7],
    [241.9, 224.2, 1.6],
    [247.8, 224.2, 1.7],
    [253.7, 224.2, 1.7],
    [259.5, 224.2, 1.7],
    [265.3, 224.2, 1.5],
    [271.1, 224.2, 0.8],
    [446.4, 224.2, 1.2],
    [452.4, 224.2, 1.7],
    [458.1, 224.2, 1.7],
    [464.0, 224.2, 1.7],
    [469.9, 224.2, 1.7],
    [475.8, 224.2, 1.6],
    [481.5, 224.2, 1.7],
    [487.4, 224.2, 1.7],
    [493.2, 224.2, 1.6],
    [499.0, 224.2, 1.7],
    [504.9, 224.2, 1.2],
    [510.8, 224.2, 0.8],
    [516.6, 224.2, 0.8],
    [522.5, 224.2, 1.4],
    [528.3, 224.2, 1.0],
    [534.1, 224.2, 0.8],
    [545.9, 224.2, 0.8],
    [551.7, 224.2, 0.8],
    [557.5, 224.2, 1.4],
    [563.4, 224.2, 1.6],
    [569.2, 224.2, 1.6],
    [575.0, 224.2, 1.7],
    [580.9, 224.2, 1.7],
    [586.8, 224.2, 1.6],
    [592.5, 224.2, 1.7],
    [598.5, 224.2, 1.7],
    [604.2, 224.2, 1.6],
    [610.1, 224.2, 1.6],
    [616.0, 224.2, 1.7],
    [621.8, 224.2, 1.7],
    [627.6, 224.2, 1.6],
    [633.5, 224.2, 1.7],
    [639.4, 224.2, 1.6],
    [645.1, 224.2, 1.6],
    [651.0, 224.2, 1.7],
    [656.9, 224.2, 1.6],
    [662.8, 224.2, 1.6],
    [668.5, 224.2, 1.7],
    [674.4, 224.2, 1.7],
    [680.2, 224.2, 1.6],
    [686.0, 224.2, 1.7],
    [692.0, 224.2, 1.7],
    [697.8, 224.2, 1.6],
    [703.6, 224.2, 1.6],
    [709.5, 224.2, 1.7],
    [715.4, 224.2, 1.6],
    [721.1, 224.2, 1.6],
    [727.0, 224.2, 1.7],
    [732.9, 224.2, 1.6],
    [738.6, 224.2, 1.6],
    [744.5, 224.2, 1.7],
    [750.4, 224.2, 1.6],
    [756.2, 224.2, 1.6],
    [762.0, 224.2, 1.7],
    [767.9, 224.1, 1.4],
    [773.8, 224.2, 0.8],
    [791.2, 224.2, 0.8],
    [797.1, 224.2, 1.0],
    [803.0, 224.2, 0.8],
    [177.7, 228.7, 0.8],
    [183.5, 228.7, 1.2],
    [189.4, 228.7, 1.0],
    [195.2, 228.7, 1.7],
    [201.1, 228.7, 1.6],
    [206.8, 228.7, 1.7],
    [212.8, 228.7, 1.7],
    [218.6, 228.7, 1.6],
    [224.4, 228.7, 1.6],
    [230.2, 228.7, 1.7],
    [236.2, 228.7, 1.3],
    [241.9, 228.7, 1.5],
    [247.8, 228.7, 1.2],
    [253.6, 228.7, 0.9],
    [259.5, 228.7, 1.1],
    [265.3, 228.7, 1.2],
    [440.6, 228.6, 0.8],
    [446.5, 228.7, 1.5],
    [452.4, 228.7, 1.7],
    [458.1, 228.7, 1.7],
    [464.0, 228.7, 1.7],
    [469.9, 228.7, 1.7],
    [475.8, 228.7, 1.6],
    [481.5, 228.7, 1.7],
    [487.4, 228.7, 1.7],
    [493.2, 228.7, 1.6],
    [499.0, 228.7, 1.7],
    [505.0, 228.7, 1.7],
    [510.8, 228.7, 1.6],
    [516.6, 228.7, 1.3],
    [522.5, 228.7, 1.7],
    [528.3, 228.7, 1.7],
    [534.1, 228.7, 1.6],
    [540.0, 228.7, 1.6],
    [545.9, 228.7, 1.6],
    [551.7, 228.7, 1.6],
    [557.5, 228.7, 1.7],
    [563.4, 228.7, 1.6],
    [569.2, 228.7, 1.6],
    [575.0, 228.7, 1.7],
    [580.9, 228.7, 1.7],
    [586.8, 228.7, 1.5],
    [592.6, 228.7, 1.1],
    [598.5, 228.7, 1.7],
    [604.2, 228.7, 1.6],
    [610.1, 228.7, 1.6],
    [616.0, 228.7, 1.7],
    [621.8, 228.7, 1.7],
    [627.6, 228.7, 1.6],
    [633.5, 228.7, 1.7],
    [639.4, 228.7, 1.6],
    [645.1, 228.7, 1.6],
    [651.0, 228.7, 1.7],
    [656.9, 228.7, 1.6],
    [662.8, 228.7, 1.6],
    [668.5, 228.7, 1.7],
    [674.4, 228.7, 1.7],
    [680.2, 228.7, 1.6],
    [686.0, 228.7, 1.7],
    [692.0, 228.7, 1.7],
    [697.8, 228.7, 1.6],
    [703.6, 228.7, 1.6],
    [709.5, 228.7, 1.7],
    [715.4, 228.7, 1.6],
    [721.1, 228.7, 1.6],
    [727.0, 228.7, 1.7],
    [732.9, 228.7, 1.6],
    [738.6, 228.7, 1.6],
    [744.5, 228.7, 1.7],
    [750.4, 228.7, 1.6],
    [756.2, 228.7, 1.6],
    [762.0, 228.7, 1.7],
    [767.9, 228.7, 1.5],
    [773.8, 228.7, 0.8],
    [791.3, 228.7, 0.8],
    [797.2, 228.7, 0.8],
    [183.6, 233.2, 1.0],
    [189.3, 233.2, 0.8],
    [195.2, 233.2, 1.6],
    [201.1, 233.2, 1.6],
    [206.8, 233.2, 1.7],
    [212.8, 233.2, 1.7],
    [218.6, 233.2, 1.6],
    [224.4, 233.2, 1.6],
    [230.2, 233.2, 0.8],
    [241.9, 233.2, 0.8],
    [247.8, 233.2, 0.8],
    [265.4, 233.1, 1.2],
    [271.2, 233.2, 0.8],
    [434.8, 233.2, 0.8],
    [440.6, 233.2, 1.5],
    [446.5, 233.2, 1.7],
    [452.4, 233.2, 1.7],
    [458.1, 233.2, 1.7],
    [464.0, 233.2, 1.7],
    [469.9, 233.2, 1.7],
    [475.8, 233.2, 1.6],
    [481.5, 233.2, 1.7],
    [487.4, 233.2, 1.7],
    [493.2, 233.2, 1.6],
    [499.0, 233.2, 1.7],
    [505.0, 233.2, 1.7],
    [510.8, 233.2, 1.6],
    [516.6, 233.2, 1.6],
    [522.5, 233.2, 1.7],
    [528.3, 233.2, 1.7],
    [534.1, 233.2, 1.6],
    [540.0, 233.2, 1.7],
    [545.9, 233.2, 1.6],
    [551.7, 233.2, 1.1],
    [557.5, 233.2, 1.1],
    [563.4, 233.2, 1.6],
    [569.2, 233.2, 1.6],
    [575.0, 233.2, 1.7],
    [580.9, 233.2, 1.7],
    [586.8, 233.2, 1.5],
    [592.6, 233.2, 0.8],
    [598.5, 233.2, 1.2],
    [604.2, 233.2, 1.6],
    [610.1, 233.2, 1.6],
    [616.0, 233.2, 1.7],
    [621.8, 233.2, 1.7],
    [627.6, 233.2, 1.6],
    [633.5, 233.2, 1.7],
    [639.4, 233.2, 1.6],
    [645.1, 233.2, 1.6],
    [651.0, 233.2, 1.7],
    [656.9, 233.2, 1.6],
    [662.8, 233.2, 1.6],
    [668.5, 233.2, 1.7],
    [674.4, 233.2, 1.7],
    [680.2, 233.2, 1.6],
    [686.0, 233.2, 1.7],
    [692.0, 233.2, 1.7],
    [697.8, 233.2, 1.6],
    [703.6, 233.2, 1.6],
    [709.5, 233.2, 1.7],
    [715.4, 233.2, 1.6],
    [721.1, 233.2, 1.6],
    [727.0, 233.2, 1.7],
    [732.9, 233.2, 1.6],
    [738.6, 233.2, 1.6],
    [744.5, 233.2, 1.7],
    [750.4, 233.2, 1.6],
    [756.2, 233.2, 1.6],
    [762.0, 233.2, 1.7],
    [767.9, 233.2, 1.4],
    [773.8, 233.2, 0.8],
    [183.5, 237.7, 0.8],
    [189.3, 237.7, 0.8],
    [195.2, 237.7, 0.8],
    [201.1, 237.7, 1.6],
    [206.8, 237.7, 1.7],
    [212.8, 237.7, 1.7],
    [218.6, 237.7, 1.6],
    [224.4, 237.7, 1.5],
    [230.2, 237.7, 0.8],
    [265.4, 237.7, 0.8],
    [271.1, 237.7, 0.8],
    [428.9, 237.7, 0.8],
    [434.8, 237.7, 1.2],
    [440.6, 237.7, 1.7],
    [446.5, 237.7, 1.7],
    [452.4, 237.7, 1.7],
    [458.1, 237.7, 1.7],
    [464.0, 237.7, 1.7],
    [469.9, 237.7, 1.7],
    [475.8, 237.7, 1.6],
    [481.5, 237.7, 1.7],
    [487.4, 237.7, 1.7],
    [493.2, 237.7, 1.6],
    [499.0, 237.7, 1.7],
    [505.0, 237.7, 1.7],
    [510.8, 237.7, 1.6],
    [516.6, 237.7, 1.6],
    [522.5, 237.7, 1.7],
    [528.3, 237.7, 1.7],
    [534.1, 237.7, 1.6],
    [540.0, 237.7, 1.7],
    [545.9, 237.7, 1.6],
    [551.7, 237.7, 1.5],
    [557.5, 237.7, 0.8],
    [563.4, 237.7, 1.6],
    [569.2, 237.7, 1.6],
    [575.0, 237.7, 1.7],
    [580.9, 237.7, 1.7],
    [586.8, 237.7, 1.6],
    [592.6, 237.7, 1.1],
    [598.5, 237.7, 0.8],
    [604.3, 237.7, 0.8],
    [610.1, 237.7, 1.1],
    [616.0, 237.7, 1.6],
    [621.8, 237.7, 1.7],
    [627.6, 237.7, 1.6],
    [633.5, 237.7, 1.6],
    [639.4, 237.7, 1.6],
    [645.1, 237.7, 1.6],
    [651.0, 237.7, 1.7],
    [656.9, 237.7, 1.6],
    [662.8, 237.7, 1.6],
    [668.5, 237.7, 1.7],
    [674.4, 237.7, 1.7],
    [680.2, 237.7, 1.6],
    [686.0, 237.7, 1.7],
    [692.0, 237.7, 1.7],
    [697.8, 237.7, 1.6],
    [703.6, 237.7, 1.6],
    [709.5, 237.7, 1.7],
    [715.4, 237.7, 1.6],
    [721.1, 237.7, 1.6],
    [727.0, 237.7, 1.7],
    [732.9, 237.7, 1.6],
    [738.6, 237.7, 1.6],
    [744.5, 237.7, 1.7],
    [750.4, 237.7, 1.6],
    [756.2, 237.7, 1.6],
    [762.0, 237.7, 1.7],
    [767.9, 237.7, 0.8],
    [773.8, 237.7, 0.8],
    [189.3, 242.2, 0.8],
    [195.2, 242.2, 0.8],
    [201.1, 242.2, 0.8],
    [206.9, 242.2, 1.6],
    [212.8, 242.2, 1.7],
    [218.6, 242.2, 1.6],
    [224.4, 242.2, 1.3],
    [230.2, 242.2, 0.8],
    [259.5, 242.2, 0.8],
    [265.4, 242.2, 0.8],
    [271.1, 242.2, 0.8],
    [428.9, 242.2, 0.8],
    [434.8, 242.2, 1.7],
    [440.6, 242.2, 1.7],
    [446.5, 242.2, 1.7],
    [452.4, 242.2, 1.7],
    [458.1, 242.2, 1.7],
    [464.0, 242.2, 1.7],
    [469.9, 242.2, 1.7],
    [475.8, 242.2, 1.6],
    [481.5, 242.2, 1.7],
    [487.4, 242.2, 1.7],
    [493.2, 242.2, 1.6],
    [499.0, 242.2, 1.7],
    [505.0, 242.2, 1.7],
    [510.8, 242.2, 1.6],
    [516.6, 242.2, 1.6],
    [522.5, 242.2, 1.7],
    [528.3, 242.2, 1.7],
    [534.1, 242.2, 1.6],
    [540.0, 242.2, 1.7],
    [545.9, 242.2, 1.6],
    [551.6, 242.2, 1.6],
    [557.5, 242.2, 0.8],
    [563.4, 242.2, 0.9],
    [569.2, 242.2, 1.6],
    [575.0, 242.2, 1.7],
    [580.9, 242.2, 1.7],
    [586.8, 242.2, 1.6],
    [592.5, 242.2, 1.7],
    [598.5, 242.2, 1.1],
    [604.2, 242.2, 1.1],
    [610.1, 242.2, 1.2],
    [616.0, 242.2, 0.8],
    [621.8, 242.2, 0.8],
    [627.6, 242.2, 0.8],
    [633.5, 242.2, 0.8],
    [639.3, 242.2, 1.4],
    [645.1, 242.2, 1.6],
    [651.0, 242.2, 1.7],
    [656.9, 242.2, 1.6],
    [662.8, 242.2, 1.6],
    [668.5, 242.2, 1.7],
    [674.4, 242.2, 1.7],
    [680.2, 242.2, 1.6],
    [686.0, 242.2, 1.7],
    [692.0, 242.2, 1.7],
    [697.8, 242.2, 1.6],
    [703.6, 242.2, 1.6],
    [709.5, 242.2, 1.7],
    [715.4, 242.2, 1.6],
    [721.1, 242.2, 1.6],
    [727.0, 242.2, 1.7],
    [732.9, 242.2, 1.6],
    [738.6, 242.2, 1.6],
    [744.5, 242.2, 1.7],
    [750.4, 242.2, 1.6],
    [756.2, 242.2, 1.6],
    [762.1, 242.2, 0.9],
    [767.9, 242.2, 1.0],
    [773.8, 242.2, 0.8],
    [206.9, 246.7, 1.0],
    [212.8, 246.7, 1.7],
    [218.6, 246.7, 1.6],
    [224.4, 246.7, 1.3],
    [230.2, 246.7, 0.8],
    [241.9, 246.6, 0.8],
    [247.8, 246.7, 0.8],
    [253.6, 246.7, 0.8],
    [259.4, 246.7, 0.8],
    [265.4, 246.7, 0.8],
    [271.1, 246.7, 1.2],
    [277.0, 246.6, 0.8],
    [428.9, 246.7, 1.4],
    [434.8, 246.7, 1.7],
    [440.6, 246.7, 1.7],
    [446.5, 246.7, 1.7],
    [452.4, 246.7, 1.7],
    [458.1, 246.7, 1.7],
    [464.0, 246.7, 1.7],
    [469.9, 246.7, 1.7],
    [475.8, 246.7, 1.6],
    [481.5, 246.7, 1.7],
    [487.4, 246.7, 1.7],
    [493.2, 246.7, 1.6],
    [499.0, 246.7, 1.7],
    [505.0, 246.7, 1.7],
    [510.8, 246.7, 1.6],
    [516.6, 246.7, 1.6],
    [522.5, 246.7, 1.7],
    [528.3, 246.7, 1.7],
    [534.1, 246.7, 1.6],
    [540.0, 246.7, 1.7],
    [545.9, 246.7, 1.6],
    [551.6, 246.7, 1.6],
    [557.5, 246.7, 1.5],
    [563.4, 246.7, 0.8],
    [569.2, 246.7, 1.6],
    [575.0, 246.7, 1.7],
    [580.9, 246.7, 1.7],
    [586.8, 246.7, 1.6],
    [592.5, 246.7, 1.7],
    [598.5, 246.7, 1.7],
    [604.2, 246.7, 1.6],
    [610.1, 246.7, 1.6],
    [616.0, 246.7, 1.2],
    [639.4, 246.7, 0.8],
    [645.2, 246.7, 1.6],
    [651.0, 246.7, 1.5],
    [656.9, 246.7, 1.6],
    [662.8, 246.7, 1.6],
    [668.5, 246.7, 1.7],
    [674.4, 246.7, 1.7],
    [680.2, 246.7, 1.6],
    [686.1, 246.7, 1.3],
    [692.0, 246.7, 0.8],
    [697.8, 246.7, 1.1],
    [703.6, 246.7, 1.6],
    [709.5, 246.7, 1.7],
    [715.4, 246.7, 1.6],
    [721.1, 246.7, 1.6],
    [727.0, 246.7, 1.7],
    [732.9, 246.7, 1.6],
    [738.7, 246.7, 1.2],
    [744.5, 246.7, 1.3],
    [750.4, 246.7, 0.8],
    [756.2, 246.7, 0.8],
    [767.9, 246.7, 0.8],
    [773.8, 246.7, 0.8],
    [206.9, 251.2, 0.8],
    [212.7, 251.2, 1.5],
    [218.6, 251.2, 1.6],
    [224.4, 251.2, 1.6],
    [230.2, 251.2, 0.8],
    [236.1, 251.2, 0.8],
    [241.9, 251.2, 0.8],
    [247.8, 251.2, 1.6],
    [253.6, 251.2, 0.8],
    [271.1, 251.2, 0.8],
    [277.0, 251.2, 0.9],
    [428.9, 251.2, 1.2],
    [434.8, 251.2, 1.7],
    [440.6, 251.2, 1.7],
    [446.5, 251.2, 1.7],
    [452.4, 251.2, 1.7],
    [458.1, 251.2, 1.7],
    [464.0, 251.2, 1.7],
    [469.9, 251.2, 1.7],
    [475.8, 251.2, 1.6],
    [481.5, 251.2, 1.7],
    [487.4, 251.2, 1.7],
    [493.2, 251.2, 1.6],
    [499.0, 251.2, 1.7],
    [505.0, 251.2, 1.7],
    [510.8, 251.2, 1.6],
    [516.6, 251.2, 1.6],
    [522.5, 251.2, 1.7],
    [528.3, 251.2, 1.7],
    [534.1, 251.2, 1.6],
    [540.0, 251.2, 1.7],
    [545.9, 251.2, 1.6],
    [551.6, 251.2, 1.6],
    [557.5, 251.2, 1.7],
    [563.4, 251.2, 0.8],
    [569.2, 251.2, 0.8],
    [575.0, 251.2, 1.7],
    [580.9, 251.2, 1.7],
    [586.8, 251.2, 1.6],
    [592.5, 251.2, 1.7],
    [598.5, 251.2, 1.7],
    [604.2, 251.2, 1.6],
    [610.1, 251.2, 1.6],
    [616.0, 251.2, 0.8],
    [651.0, 251.2, 1.2],
    [656.9, 251.2, 1.6],
    [662.8, 251.2, 1.6],
    [668.5, 251.2, 1.7],
    [674.4, 251.2, 1.7],
    [680.2, 251.2, 1.3],
    [686.1, 251.2, 0.8],
    [697.8, 251.2, 0.8],
    [703.6, 251.2, 1.4],
    [709.5, 251.2, 1.7],
    [715.4, 251.2, 1.6],
    [721.1, 251.2, 1.6],
    [727.0, 251.2, 1.7],
    [732.8, 251.2, 0.9],
    [738.7, 251.2, 0.8],
    [744.5, 251.2, 0.8],
    [767.9, 251.2, 0.8],
    [773.8, 251.1, 0.8],
    [212.8, 255.7, 0.8],
    [218.6, 255.7, 0.8],
    [224.4, 255.7, 1.1],
    [230.2, 255.6, 1.3],
    [236.1, 255.7, 1.6],
    [241.9, 255.7, 1.6],
    [247.8, 255.7, 1.3],
    [253.6, 255.7, 0.8],
    [265.4, 255.7, 0.8],
    [271.2, 255.7, 0.8],
    [277.0, 255.7, 0.8],
    [282.9, 255.7, 0.8],
    [288.7, 255.7, 0.8],
    [294.6, 255.7, 0.8],
    [428.9, 255.6, 0.9],
    [434.8, 255.7, 1.7],
    [440.6, 255.7, 1.7],
    [446.5, 255.7, 1.7],
    [452.4, 255.7, 1.7],
    [458.1, 255.7, 1.7],
    [464.0, 255.7, 1.7],
    [469.9, 255.7, 1.7],
    [475.8, 255.7, 1.6],
    [481.5, 255.7, 1.7],
    [487.4, 255.7, 1.7],
    [493.2, 255.7, 1.6],
    [499.0, 255.7, 1.7],
    [505.0, 255.7, 1.7],
    [510.8, 255.7, 1.6],
    [516.6, 255.7, 1.6],
    [522.5, 255.7, 1.7],
    [528.3, 255.7, 1.7],
    [534.1, 255.7, 1.6],
    [540.0, 255.7, 1.7],
    [545.9, 255.7, 1.6],
    [551.6, 255.7, 1.6],
    [557.5, 255.7, 1.7],
    [563.4, 255.7, 1.3],
    [569.2, 255.7, 0.8],
    [575.0, 255.7, 1.2],
    [580.9, 255.7, 1.7],
    [586.8, 255.7, 1.6],
    [592.5, 255.7, 1.7],
    [598.5, 255.7, 1.7],
    [604.3, 255.7, 1.3],
    [610.1, 255.7, 0.8],
    [651.0, 255.7, 1.1],
    [656.9, 255.7, 1.6],
    [662.8, 255.7, 1.6],
    [668.5, 255.7, 1.7],
    [674.4, 255.7, 1.3],
    [680.2, 255.7, 0.8],
    [703.6, 255.7, 0.8],
    [709.5, 255.7, 1.6],
    [715.4, 255.7, 1.6],
    [721.1, 255.7, 1.6],
    [727.0, 255.7, 1.7],
    [732.8, 255.7, 1.4],
    [738.7, 255.7, 0.8],
    [744.5, 255.7, 0.8],
    [767.9, 255.7, 0.9],
    [773.7, 255.7, 0.8],
    [236.1, 260.2, 0.8],
    [241.9, 260.2, 1.5],
    [247.8, 260.2, 1.6],
    [253.7, 260.2, 1.3],
    [259.5, 260.2, 1.0],
    [277.0, 260.2, 0.8],
    [282.9, 260.2, 0.8],
    [288.7, 260.2, 0.8],
    [294.5, 260.2, 0.8],
    [300.4, 260.2, 0.8],
    [423.1, 260.2, 0.8],
    [428.9, 260.2, 1.4],
    [434.8, 260.2, 1.7],
    [440.6, 260.2, 1.7],
    [446.5, 260.2, 1.7],
    [452.4, 260.2, 1.7],
    [458.1, 260.2, 1.7],
    [464.0, 260.2, 1.7],
    [469.9, 260.2, 1.7],
    [475.8, 260.2, 1.6],
    [481.5, 260.2, 1.7],
    [487.4, 260.2, 1.7],
    [493.2, 260.2, 1.6],
    [499.0, 260.2, 1.7],
    [505.0, 260.2, 1.7],
    [510.8, 260.2, 1.6],
    [516.6, 260.2, 1.6],
    [522.5, 260.2, 1.7],
    [528.3, 260.2, 1.7],
    [534.1, 260.2, 1.6],
    [540.0, 260.2, 1.7],
    [545.9, 260.2, 1.6],
    [551.6, 260.2, 1.6],
    [557.5, 260.2, 1.7],
    [563.4, 260.2, 1.6],
    [569.2, 260.1, 0.8],
    [575.0, 260.2, 0.8],
    [580.9, 260.2, 1.7],
    [586.8, 260.2, 1.6],
    [592.6, 260.2, 1.3],
    [598.4, 260.2, 0.8],
    [651.0, 260.1, 0.8],
    [656.9, 260.2, 1.6],
    [662.8, 260.2, 1.6],
    [668.5, 260.2, 1.2],
    [674.4, 260.1, 0.8],
    [703.6, 260.1, 0.8],
    [709.5, 260.1, 0.8],
    [715.3, 260.1, 1.6],
    [721.1, 260.2, 1.6],
    [727.0, 260.2, 1.7],
    [732.9, 260.2, 1.6],
    [738.7, 260.2, 1.1],
    [767.9, 260.2, 0.9],
    [773.7, 260.2, 0.8],
    [247.8, 264.7, 0.8],
    [253.7, 264.6, 1.3],
    [259.5, 264.7, 1.5],
    [265.3, 264.7, 0.8],
    [288.7, 264.7, 0.8],
    [294.5, 264.7, 0.8],
    [300.4, 264.6, 0.8],
    [428.9, 264.7, 1.1],
    [434.8, 264.7, 1.7],
    [440.6, 264.7, 1.7],
    [446.5, 264.7, 1.7],
    [452.4, 264.7, 1.7],
    [458.1, 264.7, 1.7],
    [464.0, 264.7, 1.7],
    [469.9, 264.7, 1.7],
    [475.8, 264.7, 1.6],
    [481.5, 264.7, 1.7],
    [487.4, 264.7, 1.7],
    [493.2, 264.7, 1.6],
    [499.0, 264.7, 1.7],
    [505.0, 264.7, 1.7],
    [510.8, 264.7, 1.6],
    [516.6, 264.7, 1.6],
    [522.5, 264.7, 1.7],
    [528.3, 264.7, 1.7],
    [534.1, 264.7, 1.6],
    [540.0, 264.7, 1.7],
    [545.9, 264.7, 1.6],
    [551.6, 264.7, 1.6],
    [557.5, 264.7, 1.7],
    [563.4, 264.7, 1.6],
    [569.2, 264.7, 1.6],
    [575.0, 264.7, 1.1],
    [580.9, 264.7, 0.9],
    [586.7, 264.7, 0.8],
    [592.6, 264.7, 0.8],
    [651.0, 264.7, 0.8],
    [656.8, 264.7, 1.6],
    [662.8, 264.7, 1.6],
    [668.5, 264.7, 0.8],
    [715.3, 264.7, 1.4],
    [721.2, 264.7, 1.1],
    [727.0, 264.7, 1.6],
    [732.9, 264.7, 1.6],
    [738.6, 264.6, 1.2],
    [767.9, 264.7, 0.8],
    [773.7, 264.7, 1.0],
    [779.6, 264.6, 0.8],
    [253.6, 269.1, 0.8],
    [259.4, 269.1, 1.2],
    [265.4, 269.2, 0.8],
    [277.1, 269.2, 0.8],
    [282.9, 269.2, 1.2],
    [288.7, 269.1, 1.6],
    [294.5, 269.2, 1.7],
    [300.4, 269.2, 1.5],
    [306.2, 269.2, 1.1],
    [312.1, 269.2, 0.8],
    [317.9, 269.2, 0.8],
    [429.0, 269.2, 0.8],
    [434.8, 269.1, 1.5],
    [440.6, 269.2, 1.7],
    [446.5, 269.2, 1.7],
    [452.4, 269.2, 1.7],
    [458.1, 269.2, 1.7],
    [464.0, 269.2, 1.7],
    [469.9, 269.2, 1.7],
    [475.8, 269.2, 1.6],
    [481.5, 269.2, 1.7],
    [487.4, 269.2, 1.7],
    [493.2, 269.2, 1.6],
    [499.0, 269.2, 1.7],
    [505.0, 269.2, 1.7],
    [510.8, 269.2, 1.6],
    [516.6, 269.2, 1.6],
    [522.5, 269.2, 1.7],
    [528.3, 269.2, 1.7],
    [534.1, 269.2, 1.6],
    [540.0, 269.2, 1.7],
    [545.9, 269.2, 1.6],
    [551.6, 269.2, 1.6],
    [557.5, 269.2, 1.7],
    [563.4, 269.2, 1.6],
    [569.2, 269.2, 1.6],
    [575.0, 269.2, 1.4],
    [580.9, 269.2, 0.8],
    [586.8, 269.2, 1.0],
    [592.6, 269.2, 1.3],
    [598.5, 269.2, 0.8],
    [656.9, 269.1, 0.8],
    [662.8, 269.2, 1.6],
    [668.5, 269.2, 0.8],
    [715.3, 269.2, 0.8],
    [727.0, 269.2, 0.8],
    [732.8, 269.2, 1.6],
    [738.6, 269.2, 0.8],
    [762.0, 269.2, 0.8],
    [767.9, 269.2, 0.8],
    [773.8, 269.1, 1.2],
    [779.6, 269.2, 0.8],
    [259.5, 273.7, 0.8],
    [265.4, 273.7, 1.0],
    [271.1, 273.6, 0.8],
    [277.0, 273.7, 1.3],
    [282.9, 273.7, 1.7],
    [288.7, 273.7, 1.7],
    [294.5, 273.7, 1.7],
    [300.4, 273.7, 1.7],
    [306.2, 273.7, 1.6],
    [312.0, 273.7, 1.7],
    [317.9, 273.7, 1.2],
    [323.8, 273.6, 0.8],
    [434.8, 273.7, 0.8],
    [440.6, 273.7, 1.7],
    [446.5, 273.7, 1.7],
    [452.4, 273.7, 1.7],
    [458.1, 273.7, 1.7],
    [464.0, 273.7, 1.7],
    [469.9, 273.7, 1.7],
    [475.8, 273.7, 1.6],
    [481.5, 273.7, 1.7],
    [487.4, 273.7, 1.7],
    [493.2, 273.7, 1.6],
    [499.0, 273.7, 1.7],
    [505.0, 273.7, 1.7],
    [510.8, 273.7, 1.6],
    [516.6, 273.7, 1.6],
    [522.5, 273.7, 1.7],
    [528.3, 273.7, 1.7],
    [534.1, 273.7, 1.6],
    [540.0, 273.7, 1.7],
    [545.9, 273.7, 1.6],
    [551.6, 273.7, 1.6],
    [557.5, 273.7, 1.7],
    [563.4, 273.7, 1.6],
    [569.2, 273.7, 1.6],
    [575.0, 273.7, 1.7],
    [580.9, 273.7, 1.7],
    [586.8, 273.7, 1.6],
    [592.6, 273.7, 1.4],
    [598.4, 273.7, 0.8],
    [656.8, 273.6, 0.8],
    [662.7, 273.7, 0.9],
    [668.5, 273.7, 0.9],
    [674.3, 273.6, 0.8],
    [715.3, 273.6, 1.4],
    [721.1, 273.7, 0.8],
    [732.9, 273.7, 0.8],
    [756.2, 273.7, 0.8],
    [762.0, 273.7, 0.8],
    [773.8, 273.6, 0.8],
    [779.6, 273.7, 1.4],
    [785.4, 273.7, 0.8],
    [277.0, 278.2, 1.1],
    [282.9, 278.2, 1.7],
    [288.7, 278.2, 1.7],
    [294.5, 278.2, 1.7],
    [300.4, 278.2, 1.7],
    [306.2, 278.2, 1.6],
    [312.0, 278.2, 1.7],
    [318.0, 278.2, 1.7],
    [323.8, 278.1, 1.4],
    [329.6, 278.1, 0.8],
    [335.5, 278.2, 0.8],
    [434.8, 278.2, 0.8],
    [440.6, 278.2, 0.8],
    [446.5, 278.1, 1.6],
    [452.4, 278.2, 1.7],
    [458.1, 278.2, 1.7],
    [464.0, 278.2, 1.7],
    [469.9, 278.2, 1.3],
    [475.7, 278.1, 1.0],
    [481.6, 278.2, 1.4],
    [487.4, 278.2, 1.7],
    [493.2, 278.2, 1.6],
    [499.0, 278.2, 1.7],
    [505.0, 278.2, 1.7],
    [510.8, 278.2, 1.6],
    [516.6, 278.2, 1.6],
    [522.5, 278.2, 1.7],
    [528.3, 278.2, 1.7],
    [534.1, 278.2, 1.6],
    [540.0, 278.2, 1.7],
    [545.9, 278.2, 1.6],
    [551.6, 278.2, 1.6],
    [557.5, 278.2, 1.7],
    [563.4, 278.2, 1.6],
    [569.2, 278.2, 1.6],
    [575.0, 278.2, 1.7],
    [580.9, 278.2, 1.7],
    [586.8, 278.2, 1.6],
    [592.6, 278.2, 0.8],
    [668.5, 278.2, 0.8],
    [674.4, 278.2, 0.8],
    [703.6, 278.2, 0.8],
    [709.5, 278.2, 0.8],
    [715.3, 278.2, 0.8],
    [721.1, 278.2, 1.1],
    [727.0, 278.2, 0.8],
    [756.2, 278.2, 0.8],
    [762.0, 278.2, 1.2],
    [767.9, 278.2, 0.8],
    [773.8, 278.2, 0.8],
    [779.5, 278.2, 0.8],
    [785.5, 278.2, 0.8],
    [277.0, 282.6, 1.1],
    [282.9, 282.7, 1.7],
    [288.7, 282.7, 1.7],
    [294.5, 282.7, 1.7],
    [300.4, 282.7, 1.7],
    [306.2, 282.7, 1.6],
    [312.0, 282.7, 1.7],
    [318.0, 282.7, 1.7],
    [323.8, 282.7, 1.6],
    [329.6, 282.7, 1.7],
    [335.4, 282.7, 1.6],
    [341.3, 282.7, 0.8],
    [446.5, 282.7, 0.8],
    [452.3, 282.7, 0.8],
    [458.2, 282.6, 0.8],
    [464.0, 282.7, 0.8],
    [481.6, 282.6, 0.8],
    [487.4, 282.7, 0.8],
    [493.2, 282.7, 1.4],
    [499.0, 282.7, 1.7],
    [505.0, 282.7, 1.7],
    [510.8, 282.7, 1.6],
    [516.6, 282.7, 1.6],
    [522.5, 282.7, 1.7],
    [528.3, 282.7, 1.7],
    [534.1, 282.7, 1.6],
    [540.0, 282.7, 1.7],
    [545.9, 282.7, 1.6],
    [551.6, 282.7, 1.6],
    [557.5, 282.7, 1.7],
    [563.4, 282.7, 1.6],
    [569.2, 282.7, 1.6],
    [575.0, 282.7, 1.7],
    [580.9, 282.7, 1.7],
    [586.8, 282.7, 1.1],
    [703.6, 282.7, 0.8],
    [709.5, 282.7, 0.8],
    [715.3, 282.6, 0.8],
    [721.2, 282.7, 1.1],
    [727.0, 282.7, 0.8],
    [744.5, 282.6, 0.8],
    [750.3, 282.7, 0.9],
    [756.2, 282.7, 1.6],
    [762.1, 282.7, 0.9],
    [785.4, 282.7, 0.8],
    [791.2, 282.7, 0.8],
    [271.2, 287.1, 0.8],
    [277.0, 287.2, 1.7],
    [282.9, 287.2, 1.7],
    [288.7, 287.2, 1.7],
    [294.5, 287.2, 1.7],
    [300.4, 287.2, 1.7],
    [306.2, 287.2, 1.6],
    [312.0, 287.2, 1.7],
    [318.0, 287.2, 1.7],
    [323.8, 287.2, 1.6],
    [329.6, 287.2, 1.7],
    [335.5, 287.2, 1.7],
    [341.3, 287.2, 1.5],
    [347.1, 287.2, 0.8],
    [493.2, 287.2, 1.1],
    [499.0, 287.2, 1.7],
    [505.0, 287.2, 1.7],
    [510.8, 287.2, 1.6],
    [516.6, 287.2, 1.6],
    [522.5, 287.2, 1.7],
    [528.3, 287.2, 1.7],
    [534.1, 287.2, 1.6],
    [540.0, 287.2, 1.7],
    [545.9, 287.2, 1.6],
    [551.6, 287.2, 1.6],
    [557.5, 287.2, 1.7],
    [563.4, 287.2, 1.6],
    [569.2, 287.2, 1.6],
    [575.0, 287.2, 1.7],
    [580.9, 287.2, 1.2],
    [586.8, 287.2, 0.8],
    [709.5, 287.2, 0.8],
    [715.3, 287.1, 1.1],
    [721.1, 287.1, 1.4],
    [727.0, 287.2, 0.8],
    [738.6, 287.1, 0.8],
    [744.5, 287.2, 1.4],
    [750.4, 287.2, 1.6],
    [756.2, 287.2, 1.6],
    [762.0, 287.2, 1.1],
    [767.9, 287.2, 0.8],
    [773.8, 287.1, 0.9],
    [779.6, 287.2, 0.8],
    [785.5, 287.2, 0.9],
    [791.2, 287.2, 0.8],
    [265.4, 291.7, 0.8],
    [271.1, 291.7, 1.5],
    [277.0, 291.7, 1.7],
    [282.9, 291.7, 1.7],
    [288.7, 291.7, 1.7],
    [294.5, 291.7, 1.7],
    [300.4, 291.7, 1.7],
    [306.2, 291.7, 1.6],
    [312.0, 291.7, 1.7],
    [318.0, 291.7, 1.7],
    [323.8, 291.7, 1.6],
    [329.6, 291.7, 1.7],
    [335.5, 291.7, 1.7],
    [341.2, 291.7, 1.6],
    [347.1, 291.6, 1.3],
    [352.9, 291.7, 0.8],
    [493.2, 291.7, 1.2],
    [499.0, 291.7, 1.7],
    [505.0, 291.7, 1.7],
    [510.8, 291.7, 1.6],
    [516.6, 291.7, 1.6],
    [522.5, 291.7, 1.7],
    [528.3, 291.7, 1.7],
    [534.1, 291.7, 1.6],
    [540.0, 291.7, 1.7],
    [545.9, 291.7, 1.6],
    [551.6, 291.7, 1.6],
    [557.5, 291.7, 1.7],
    [563.4, 291.7, 1.6],
    [569.2, 291.7, 1.6],
    [575.0, 291.6, 1.2],
    [580.9, 291.7, 0.8],
    [715.3, 291.7, 0.8],
    [721.2, 291.7, 1.6],
    [727.0, 291.7, 1.2],
    [738.6, 291.7, 0.8],
    [744.5, 291.7, 1.6],
    [750.4, 291.7, 1.6],
    [756.2, 291.6, 1.6],
    [762.0, 291.7, 0.8],
    [767.9, 291.7, 0.8],
    [773.8, 291.7, 0.8],
    [779.6, 291.7, 0.8],
    [785.5, 291.6, 0.8],
    [791.3, 291.7, 0.8],
    [797.1, 291.6, 0.8],
    [803.0, 291.6, 0.8],
    [808.8, 291.6, 0.8],
    [814.6, 291.7, 0.8],
    [820.5, 291.6, 0.8],
    [265.3, 296.2, 0.8],
    [271.1, 296.2, 1.7],
    [277.0, 296.2, 1.7],
    [282.9, 296.2, 1.7],
    [288.7, 296.2, 1.7],
    [294.5, 296.2, 1.7],
    [300.4, 296.2, 1.7],
    [306.2, 296.2, 1.6],
    [312.0, 296.2, 1.7],
    [318.0, 296.2, 1.7],
    [323.8, 296.2, 1.6],
    [329.6, 296.2, 1.7],
    [335.5, 296.2, 1.7],
    [341.2, 296.2, 1.6],
    [347.1, 296.2, 1.7],
    [353.0, 296.2, 1.7],
    [358.9, 296.2, 1.5],
    [364.6, 296.2, 1.0],
    [370.5, 296.1, 0.8],
    [493.2, 296.2, 0.8],
    [499.0, 296.2, 1.7],
    [505.0, 296.2, 1.7],
    [510.8, 296.2, 1.6],
    [516.6, 296.2, 1.6],
    [522.5, 296.2, 1.7],
    [528.3, 296.2, 1.7],
    [534.1, 296.2, 1.6],
    [540.0, 296.2, 1.7],
    [545.9, 296.2, 1.6],
    [551.6, 296.2, 1.6],
    [557.5, 296.2, 1.7],
    [563.4, 296.2, 1.6],
    [569.2, 296.1, 1.5],
    [575.0, 296.2, 0.8],
    [721.1, 296.1, 0.8],
    [727.0, 296.2, 1.7],
    [732.9, 296.2, 0.8],
    [744.5, 296.2, 0.8],
    [750.4, 296.1, 0.8],
    [756.2, 296.2, 0.9],
    [762.0, 296.2, 0.8],
    [767.9, 296.2, 1.5],
    [773.8, 296.1, 1.1],
    [779.6, 296.2, 0.8],
    [785.4, 296.1, 0.8],
    [791.3, 296.2, 0.9],
    [797.1, 296.2, 0.8],
    [803.0, 296.2, 0.8],
    [808.8, 296.2, 1.5],
    [814.6, 296.2, 1.6],
    [820.5, 296.2, 1.7],
    [826.4, 296.2, 1.2],
    [832.2, 296.1, 0.8],
    [838.0, 296.1, 0.8],
    [843.9, 296.2, 0.8],
    [849.7, 296.1, 0.8],
    [855.5, 296.2, 0.8],
    [265.3, 300.7, 0.8],
    [271.1, 300.6, 1.7],
    [277.0, 300.7, 1.7],
    [282.9, 300.7, 1.7],
    [288.7, 300.7, 1.7],
    [294.5, 300.7, 1.7],
    [300.4, 300.7, 1.7],
    [306.2, 300.7, 1.6],
    [312.0, 300.7, 1.7],
    [318.0, 300.7, 1.7],
    [323.8, 300.7, 1.6],
    [329.6, 300.7, 1.7],
    [335.5, 300.7, 1.7],
    [341.2, 300.7, 1.6],
    [347.1, 300.7, 1.7],
    [353.0, 300.7, 1.7],
    [358.9, 300.7, 1.7],
    [364.6, 300.7, 1.7],
    [370.5, 300.6, 1.7],
    [376.4, 300.7, 1.0],
    [382.2, 300.7, 0.8],
    [493.2, 300.7, 0.8],
    [499.0, 300.7, 1.2],
    [505.0, 300.7, 1.7],
    [510.8, 300.7, 1.6],
    [516.6, 300.7, 1.6],
    [522.5, 300.7, 1.7],
    [528.3, 300.7, 1.7],
    [534.1, 300.7, 1.6],
    [540.0, 300.7, 1.7],
    [545.9, 300.7, 1.6],
    [551.6, 300.7, 1.6],
    [557.5, 300.7, 1.7],
    [563.4, 300.7, 1.6],
    [569.2, 300.7, 0.8],
    [727.0, 300.6, 0.8],
    [732.8, 300.7, 0.9],
    [738.7, 300.7, 0.8],
    [744.5, 300.6, 0.8],
    [750.4, 300.7, 0.8],
    [767.9, 300.7, 0.9],
    [773.8, 300.6, 0.8],
    [779.6, 300.7, 0.8],
    [808.8, 300.7, 0.8],
    [814.6, 300.7, 1.4],
    [820.5, 300.7, 1.7],
    [826.4, 300.7, 1.6],
    [832.1, 300.6, 1.2],
    [838.0, 300.7, 0.8],
    [843.9, 300.7, 0.8],
    [849.7, 300.7, 0.8],
    [855.5, 300.6, 0.8],
    [271.1, 305.2, 1.0],
    [277.0, 305.2, 1.7],
    [282.9, 305.2, 1.7],
    [288.7, 305.2, 1.7],
    [294.5, 305.2, 1.7],
    [300.4, 305.2, 1.7],
    [306.2, 305.2, 1.6],
    [312.0, 305.2, 1.7],
    [318.0, 305.2, 1.7],
    [323.8, 305.2, 1.6],
    [329.6, 305.2, 1.7],
    [335.5, 305.2, 1.7],
    [341.2, 305.2, 1.6],
    [347.1, 305.2, 1.7],
    [353.0, 305.2, 1.7],
    [358.9, 305.2, 1.7],
    [364.6, 305.2, 1.7],
    [370.5, 305.2, 1.7],
    [376.4, 305.2, 1.7],
    [382.2, 305.2, 0.8],
    [499.0, 305.2, 0.8],
    [505.0, 305.2, 1.7],
    [510.8, 305.2, 1.6],
    [516.6, 305.2, 1.6],
    [522.5, 305.2, 1.7],
    [528.3, 305.2, 1.7],
    [534.1, 305.2, 1.6],
    [540.0, 305.2, 1.7],
    [545.9, 305.2, 1.6],
    [551.6, 305.2, 1.6],
    [557.5, 305.2, 1.7],
    [563.4, 305.1, 1.6],
    [569.2, 305.2, 0.8],
    [732.9, 305.2, 0.8],
    [738.7, 305.2, 0.8],
    [744.5, 305.2, 1.1],
    [750.4, 305.2, 0.8],
    [756.2, 305.1, 0.8],
    [762.1, 305.2, 0.8],
    [767.9, 305.2, 0.8],
    [773.8, 305.2, 0.8],
    [779.5, 305.2, 0.8],
    [785.5, 305.1, 0.8],
    [808.8, 305.1, 0.8],
    [814.7, 305.2, 0.8],
    [820.5, 305.2, 1.1],
    [826.3, 305.1, 0.8],
    [832.2, 305.1, 0.8],
    [838.0, 305.1, 1.1],
    [843.9, 305.2, 0.8],
    [271.2, 309.7, 0.8],
    [277.0, 309.7, 1.5],
    [282.9, 309.7, 1.7],
    [288.7, 309.7, 1.7],
    [294.5, 309.7, 1.7],
    [300.4, 309.7, 1.7],
    [306.2, 309.7, 1.6],
    [312.0, 309.7, 1.7],
    [318.0, 309.7, 1.7],
    [323.8, 309.7, 1.6],
    [329.6, 309.7, 1.7],
    [335.5, 309.7, 1.7],
    [341.2, 309.7, 1.6],
    [347.1, 309.7, 1.7],
    [353.0, 309.7, 1.7],
    [358.9, 309.7, 1.7],
    [364.6, 309.7, 1.7],
    [370.5, 309.7, 1.7],
    [376.4, 309.7, 1.5],
    [382.2, 309.7, 0.8],
    [499.1, 309.7, 0.8],
    [505.0, 309.6, 1.7],
    [510.8, 309.7, 1.6],
    [516.6, 309.7, 1.6],
    [522.5, 309.7, 1.7],
    [528.3, 309.7, 1.7],
    [534.1, 309.7, 1.6],
    [540.0, 309.7, 1.7],
    [545.9, 309.7, 1.6],
    [551.6, 309.7, 1.6],
    [557.5, 309.7, 1.7],
    [563.4, 309.7, 1.6],
    [569.2, 309.7, 0.8],
    [762.0, 309.7, 0.8],
    [767.9, 309.6, 0.8],
    [773.8, 309.6, 0.8],
    [779.6, 309.7, 0.8],
    [797.1, 309.7, 0.8],
    [803.0, 309.6, 0.8],
    [808.8, 309.6, 0.8],
    [820.5, 309.6, 0.8],
    [826.4, 309.7, 0.8],
    [838.0, 309.7, 0.8],
    [843.9, 309.7, 0.8],
    [277.0, 314.1, 0.8],
    [282.9, 314.2, 1.7],
    [288.7, 314.2, 1.7],
    [294.5, 314.2, 1.7],
    [300.4, 314.2, 1.7],
    [306.2, 314.2, 1.6],
    [312.0, 314.2, 1.7],
    [318.0, 314.2, 1.7],
    [323.8, 314.2, 1.6],
    [329.6, 314.2, 1.7],
    [335.5, 314.2, 1.7],
    [341.2, 314.2, 1.6],
    [347.1, 314.2, 1.7],
    [353.0, 314.2, 1.7],
    [358.9, 314.2, 1.7],
    [364.6, 314.2, 1.7],
    [370.6, 314.2, 1.6],
    [376.4, 314.1, 0.8],
    [499.1, 314.2, 0.8],
    [504.9, 314.1, 1.6],
    [510.8, 314.2, 1.6],
    [516.6, 314.2, 1.6],
    [522.5, 314.2, 1.7],
    [528.3, 314.2, 1.7],
    [534.1, 314.2, 1.6],
    [540.0, 314.2, 1.7],
    [545.9, 314.2, 1.6],
    [551.6, 314.2, 1.6],
    [557.5, 314.2, 1.7],
    [563.4, 314.2, 1.6],
    [569.2, 314.1, 1.1],
    [586.8, 314.2, 0.8],
    [592.6, 314.1, 0.8],
    [779.6, 314.1, 0.8],
    [785.5, 314.2, 0.8],
    [791.2, 314.2, 0.8],
    [797.1, 314.2, 1.6],
    [803.0, 314.1, 1.7],
    [808.8, 314.2, 0.8],
    [820.5, 314.2, 0.9],
    [826.3, 314.2, 1.1],
    [832.2, 314.1, 0.8],
    [277.0, 318.7, 0.8],
    [282.9, 318.7, 1.3],
    [288.7, 318.7, 1.7],
    [294.5, 318.7, 1.7],
    [300.4, 318.7, 1.7],
    [306.2, 318.7, 1.6],
    [312.0, 318.7, 1.7],
    [318.0, 318.7, 1.7],
    [323.8, 318.7, 1.6],
    [329.6, 318.7, 1.7],
    [335.5, 318.7, 1.7],
    [341.2, 318.7, 1.6],
    [347.1, 318.7, 1.7],
    [353.0, 318.7, 1.7],
    [358.9, 318.7, 1.7],
    [364.6, 318.7, 1.7],
    [370.5, 318.6, 1.1],
    [499.1, 318.7, 0.8],
    [505.0, 318.7, 1.7],
    [510.8, 318.7, 1.6],
    [516.6, 318.7, 1.6],
    [522.5, 318.7, 1.7],
    [528.3, 318.7, 1.7],
    [534.1, 318.7, 1.6],
    [540.0, 318.7, 1.7],
    [545.9, 318.7, 1.6],
    [551.6, 318.7, 1.6],
    [557.5, 318.7, 1.7],
    [563.4, 318.7, 1.6],
    [569.2, 318.7, 1.1],
    [586.8, 318.7, 0.8],
    [592.6, 318.6, 1.1],
    [773.8, 318.7, 0.8],
    [779.5, 318.6, 1.2],
    [785.5, 318.7, 1.7],
    [791.3, 318.6, 1.6],
    [797.1, 318.7, 1.6],
    [803.0, 318.6, 1.7],
    [808.8, 318.7, 1.0],
    [814.6, 318.7, 0.8],
    [820.5, 318.7, 0.9],
    [826.4, 318.7, 1.6],
    [832.2, 318.7, 0.8],
    [282.9, 323.1, 0.8],
    [288.7, 323.2, 0.9],
    [294.5, 323.2, 1.7],
    [300.4, 323.2, 1.7],
    [306.2, 323.2, 1.6],
    [312.0, 323.2, 1.7],
    [318.0, 323.2, 1.7],
    [323.8, 323.2, 1.6],
    [329.6, 323.2, 1.7],
    [335.5, 323.2, 1.7],
    [341.2, 323.2, 1.6],
    [347.1, 323.2, 1.7],
    [353.0, 323.2, 1.7],
    [358.9, 323.2, 1.7],
    [364.6, 323.2, 1.7],
    [370.6, 323.1, 0.9],
    [499.0, 323.1, 0.8],
    [505.0, 323.2, 1.7],
    [510.8, 323.2, 1.6],
    [516.6, 323.2, 1.6],
    [522.5, 323.2, 1.7],
    [528.3, 323.2, 1.7],
    [534.1, 323.2, 1.6],
    [540.0, 323.2, 1.7],
    [545.9, 323.2, 1.6],
    [551.6, 323.2, 1.6],
    [557.5, 323.2, 1.7],
    [563.4, 323.2, 1.6],
    [569.2, 323.1, 0.8],
    [575.0, 323.2, 0.8],
    [580.9, 323.1, 0.8],
    [586.8, 323.2, 1.5],
    [592.5, 323.2, 0.9],
    [773.8, 323.2, 1.5],
    [779.5, 323.2, 1.7],
    [785.5, 323.2, 1.7],
    [791.2, 323.2, 1.6],
    [797.1, 323.2, 1.6],
    [803.0, 323.2, 1.7],
    [808.9, 323.2, 1.6],
    [814.7, 323.2, 1.6],
    [820.5, 323.1, 1.6],
    [826.4, 323.2, 1.6],
    [832.2, 323.2, 1.1],
    [294.5, 327.7, 1.2],
    [300.4, 327.7, 1.7],
    [306.2, 327.7, 1.6],
    [312.0, 327.7, 1.7],
    [318.0, 327.7, 1.7],
    [323.8, 327.7, 1.6],
    [329.6, 327.7, 1.7],
    [335.5, 327.7, 1.7],
    [341.2, 327.7, 1.6],
    [347.1, 327.7, 1.7],
    [353.0, 327.7, 1.7],
    [358.9, 327.7, 1.7],
    [364.6, 327.7, 1.7],
    [370.5, 327.7, 0.9],
    [499.1, 327.6, 1.0],
    [505.0, 327.7, 1.7],
    [510.8, 327.7, 1.6],
    [516.6, 327.7, 1.6],
    [522.5, 327.7, 1.7],
    [528.3, 327.7, 1.7],
    [534.1, 327.7, 1.6],
    [540.0, 327.7, 1.7],
    [545.9, 327.7, 1.6],
    [551.6, 327.7, 1.6],
    [557.5, 327.7, 1.4],
    [563.4, 327.7, 0.8],
    [575.0, 327.7, 0.8],
    [580.9, 327.7, 1.5],
    [586.8, 327.7, 1.6],
    [592.6, 327.6, 0.8],
    [756.2, 327.6, 0.8],
    [762.1, 327.6, 0.8],
    [767.9, 327.7, 1.2],
    [773.8, 327.7, 1.6],
    [779.5, 327.7, 1.7],
    [785.5, 327.7, 1.7],
    [791.2, 327.7, 1.6],
    [797.1, 327.7, 1.6],
    [803.0, 327.7, 1.7],
    [808.9, 327.7, 1.6],
    [814.6, 327.7, 1.6],
    [820.5, 327.7, 1.7],
    [826.4, 327.7, 1.6],
    [832.1, 327.7, 1.6],
    [838.0, 327.6, 1.1],
    [294.6, 332.2, 0.9],
    [300.4, 332.2, 1.7],
    [306.2, 332.2, 1.6],
    [312.0, 332.2, 1.7],
    [318.0, 332.2, 1.7],
    [323.8, 332.2, 1.6],
    [329.6, 332.2, 1.7],
    [335.5, 332.2, 1.7],
    [341.2, 332.2, 1.6],
    [347.1, 332.2, 1.7],
    [353.0, 332.2, 1.7],
    [358.9, 332.2, 1.7],
    [364.7, 332.2, 0.8],
    [370.5, 332.1, 0.8],
    [499.0, 332.2, 0.8],
    [505.0, 332.1, 1.7],
    [510.8, 332.2, 1.6],
    [516.6, 332.2, 1.6],
    [522.5, 332.2, 1.7],
    [528.3, 332.2, 1.7],
    [534.1, 332.2, 1.6],
    [540.0, 332.2, 1.7],
    [545.9, 332.2, 1.6],
    [551.6, 332.2, 1.6],
    [557.5, 332.2, 0.8],
    [575.0, 332.2, 0.8],
    [580.9, 332.2, 1.4],
    [586.8, 332.2, 1.6],
    [592.6, 332.1, 0.8],
    [750.4, 332.1, 0.8],
    [756.2, 332.2, 1.4],
    [762.0, 332.2, 1.7],
    [767.9, 332.2, 1.7],
    [773.8, 332.2, 1.6],
    [779.5, 332.2, 1.7],
    [785.5, 332.2, 1.7],
    [791.2, 332.2, 1.6],
    [797.1, 332.2, 1.6],
    [803.0, 332.2, 1.7],
    [808.9, 332.2, 1.6],
    [814.6, 332.2, 1.6],
    [820.5, 332.2, 1.7],
    [826.4, 332.2, 1.6],
    [832.1, 332.2, 1.6],
    [838.0, 332.2, 1.7],
    [843.8, 332.1, 0.9],
    [294.6, 336.7, 1.1],
    [300.4, 336.7, 1.7],
    [306.2, 336.7, 1.6],
    [312.0, 336.7, 1.7],
    [318.0, 336.7, 1.7],
    [323.8, 336.7, 1.6],
    [329.6, 336.7, 1.7],
    [335.5, 336.7, 1.7],
    [341.2, 336.7, 1.6],
    [347.1, 336.7, 1.7],
    [353.0, 336.7, 1.6],
    [358.8, 336.7, 0.9],
    [364.7, 336.7, 0.8],
    [504.9, 336.7, 1.2],
    [510.8, 336.7, 1.6],
    [516.6, 336.7, 1.6],
    [522.5, 336.7, 1.7],
    [528.3, 336.7, 1.7],
    [534.1, 336.7, 1.6],
    [540.0, 336.7, 1.7],
    [545.9, 336.7, 1.6],
    [551.6, 336.7, 1.6],
    [557.5, 336.7, 0.9],
    [575.0, 336.7, 0.8],
    [580.9, 336.7, 1.7],
    [586.8, 336.7, 1.5],
    [592.6, 336.7, 0.8],
    [750.4, 336.7, 0.8],
    [756.2, 336.7, 1.6],
    [762.0, 336.7, 1.7],
    [767.9, 336.7, 1.7],
    [773.8, 336.7, 1.6],
    [779.5, 336.7, 1.7],
    [785.5, 336.7, 1.7],
    [791.2, 336.7, 1.6],
    [797.1, 336.7, 1.6],
    [803.0, 336.7, 1.7],
    [808.9, 336.7, 1.6],
    [814.6, 336.7, 1.6],
    [820.5, 336.7, 1.7],
    [826.4, 336.7, 1.6],
    [832.1, 336.7, 1.6],
    [838.0, 336.7, 1.7],
    [843.9, 336.7, 1.6],
    [849.7, 336.6, 0.8],
    [294.5, 341.2, 1.3],
    [300.4, 341.2, 1.7],
    [306.2, 341.2, 1.6],
    [312.0, 341.2, 1.7],
    [318.0, 341.2, 1.7],
    [323.8, 341.2, 1.6],
    [329.6, 341.2, 1.7],
    [335.5, 341.2, 1.7],
    [341.2, 341.2, 1.6],
    [347.1, 341.2, 1.5],
    [353.0, 341.2, 0.8],
    [504.9, 341.1, 0.8],
    [510.8, 341.2, 1.6],
    [516.6, 341.2, 1.6],
    [522.5, 341.2, 1.7],
    [528.3, 341.2, 1.7],
    [534.1, 341.2, 1.6],
    [540.0, 341.2, 1.7],
    [545.9, 341.2, 1.6],
    [551.7, 341.1, 1.5],
    [557.5, 341.2, 0.8],
    [575.0, 341.1, 0.8],
    [580.9, 341.2, 1.5],
    [586.7, 341.1, 1.0],
    [750.3, 341.1, 0.8],
    [756.2, 341.2, 1.6],
    [762.0, 341.2, 1.7],
    [767.9, 341.2, 1.7],
    [773.8, 341.2, 1.6],
    [779.5, 341.2, 1.7],
    [785.5, 341.2, 1.7],
    [791.2, 341.2, 1.6],
    [797.1, 341.2, 1.6],
    [803.0, 341.2, 1.7],
    [808.9, 341.2, 1.6],
    [814.6, 341.2, 1.6],
    [820.5, 341.2, 1.7],
    [826.4, 341.2, 1.6],
    [832.1, 341.2, 1.6],
    [838.0, 341.2, 1.7],
    [843.9, 341.2, 1.6],
    [849.7, 341.1, 1.0],
    [288.7, 345.6, 0.8],
    [294.6, 345.7, 1.6],
    [300.4, 345.7, 1.7],
    [306.2, 345.7, 1.6],
    [312.0, 345.7, 1.7],
    [318.0, 345.7, 1.7],
    [323.8, 345.7, 1.6],
    [329.6, 345.7, 1.7],
    [335.5, 345.7, 1.7],
    [341.2, 345.7, 1.6],
    [347.1, 345.7, 1.2],
    [504.9, 345.7, 0.8],
    [510.8, 345.7, 1.6],
    [516.6, 345.7, 1.6],
    [522.5, 345.7, 1.7],
    [528.3, 345.7, 1.7],
    [534.1, 345.7, 1.6],
    [540.0, 345.7, 1.7],
    [545.9, 345.7, 1.6],
    [551.7, 345.6, 0.8],
    [580.9, 345.7, 0.8],
    [750.4, 345.6, 0.8],
    [756.2, 345.7, 1.6],
    [762.0, 345.7, 1.7],
    [767.9, 345.7, 1.7],
    [773.8, 345.7, 1.6],
    [779.5, 345.7, 1.7],
    [785.5, 345.7, 1.7],
    [791.2, 345.7, 1.6],
    [797.1, 345.7, 1.6],
    [803.0, 345.7, 1.7],
    [808.9, 345.7, 1.6],
    [814.6, 345.7, 1.6],
    [820.5, 345.7, 1.7],
    [826.4, 345.7, 1.6],
    [832.1, 345.7, 1.6],
    [838.0, 345.7, 1.7],
    [843.9, 345.7, 1.6],
    [849.7, 345.6, 0.8],
    [288.7, 350.1, 0.8],
    [294.5, 350.2, 1.7],
    [300.4, 350.2, 1.7],
    [306.2, 350.2, 1.6],
    [312.0, 350.2, 1.7],
    [318.0, 350.2, 1.7],
    [323.8, 350.2, 1.6],
    [329.6, 350.2, 1.7],
    [335.5, 350.2, 1.7],
    [341.3, 350.1, 1.6],
    [347.1, 350.1, 0.8],
    [504.9, 350.1, 0.8],
    [510.8, 350.1, 1.2],
    [516.6, 350.2, 1.6],
    [522.5, 350.2, 1.7],
    [528.3, 350.2, 1.7],
    [534.1, 350.2, 1.6],
    [540.0, 350.2, 1.7],
    [545.8, 350.1, 1.5],
    [551.7, 350.1, 0.8],
    [756.2, 350.2, 1.0],
    [762.0, 350.2, 1.7],
    [767.9, 350.2, 1.7],
    [773.8, 350.2, 1.6],
    [779.5, 350.2, 1.7],
    [785.5, 350.1, 1.7],
    [791.3, 350.1, 1.1],
    [797.1, 350.1, 1.2],
    [803.0, 350.1, 1.7],
    [808.9, 350.2, 1.6],
    [814.6, 350.2, 1.6],
    [820.5, 350.2, 1.7],
    [826.4, 350.2, 1.6],
    [832.1, 350.2, 1.6],
    [838.0, 350.2, 1.7],
    [843.9, 350.2, 1.6],
    [849.8, 350.2, 0.8],
    [896.5, 350.2, 0.8],
    [902.3, 350.1, 0.8],
    [288.7, 354.7, 0.8],
    [294.5, 354.7, 1.7],
    [300.4, 354.7, 1.7],
    [306.2, 354.7, 1.6],
    [312.0, 354.7, 1.7],
    [318.0, 354.7, 1.7],
    [323.8, 354.7, 1.6],
    [329.6, 354.7, 1.7],
    [335.5, 354.6, 1.7],
    [341.2, 354.7, 0.8],
    [510.8, 354.7, 0.8],
    [516.6, 354.6, 1.6],
    [522.5, 354.7, 1.7],
    [528.3, 354.7, 1.7],
    [534.1, 354.7, 1.6],
    [540.0, 354.7, 1.7],
    [545.8, 354.7, 0.8],
    [756.2, 354.7, 0.8],
    [762.0, 354.7, 1.7],
    [767.9, 354.7, 1.7],
    [773.8, 354.6, 1.6],
    [779.6, 354.6, 0.8],
    [785.4, 354.7, 0.8],
    [803.0, 354.7, 0.8],
    [808.8, 354.6, 1.0],
    [814.6, 354.6, 1.6],
    [820.5, 354.7, 1.7],
    [826.4, 354.7, 1.6],
    [832.1, 354.7, 1.6],
    [838.0, 354.7, 1.7],
    [843.8, 354.7, 1.1],
    [896.5, 354.6, 0.8],
    [902.4, 354.7, 0.8],
    [908.2, 354.7, 0.8],
    [288.7, 359.1, 1.0],
    [294.5, 359.2, 1.7],
    [300.4, 359.2, 1.7],
    [306.2, 359.2, 1.6],
    [312.0, 359.2, 1.7],
    [318.0, 359.2, 1.7],
    [323.8, 359.2, 1.6],
    [329.6, 359.2, 1.7],
    [335.5, 359.1, 0.8],
    [516.6, 359.2, 1.6],
    [522.5, 359.2, 1.7],
    [528.3, 359.2, 1.7],
    [534.1, 359.1, 1.6],
    [540.0, 359.2, 0.8],
    [756.2, 359.2, 0.8],
    [762.0, 359.2, 1.2],
    [767.9, 359.1, 0.8],
    [773.8, 359.1, 0.8],
    [814.7, 359.2, 0.9],
    [820.5, 359.2, 1.7],
    [826.4, 359.2, 1.6],
    [832.1, 359.2, 1.6],
    [838.0, 359.2, 1.7],
    [843.9, 359.1, 0.8],
    [902.3, 359.1, 0.8],
    [908.2, 359.2, 1.4],
    [914.0, 359.1, 0.8],
    [288.7, 363.7, 1.3],
    [294.5, 363.7, 1.7],
    [300.4, 363.7, 1.7],
    [306.2, 363.7, 1.6],
    [312.0, 363.7, 1.7],
    [318.0, 363.7, 1.7],
    [323.8, 363.7, 1.6],
    [329.6, 363.7, 0.8],
    [335.4, 363.7, 0.8],
    [516.6, 363.7, 0.8],
    [522.5, 363.7, 0.8],
    [528.3, 363.6, 0.8],
    [534.2, 363.6, 0.8],
    [814.7, 363.6, 0.8],
    [820.5, 363.7, 0.9],
    [826.3, 363.6, 0.9],
    [832.2, 363.6, 1.1],
    [838.0, 363.7, 0.8],
    [843.9, 363.7, 0.8],
    [896.5, 363.6, 0.8],
    [902.4, 363.6, 0.9],
    [908.1, 363.6, 0.8],
    [282.9, 368.1, 0.8],
    [288.7, 368.2, 1.6],
    [294.5, 368.2, 1.7],
    [300.4, 368.2, 1.7],
    [306.2, 368.2, 1.6],
    [312.0, 368.2, 1.7],
    [317.9, 368.1, 1.1],
    [323.8, 368.2, 0.8],
    [329.6, 368.2, 0.8],
    [826.4, 368.2, 0.8],
    [832.2, 368.1, 0.8],
    [838.0, 368.2, 0.8],
    [890.6, 368.1, 0.8],
    [896.5, 368.2, 1.4],
    [902.3, 368.1, 0.8],
    [282.9, 372.6, 0.8],
    [288.7, 372.7, 1.7],
    [294.5, 372.7, 1.7],
    [300.4, 372.7, 1.7],
    [306.2, 372.7, 1.6],
    [312.0, 372.7, 1.2],
    [826.3, 372.6, 0.8],
    [832.2, 372.7, 1.3],
    [838.0, 372.7, 0.8],
    [884.8, 372.6, 0.8],
    [890.7, 372.7, 1.4],
    [896.5, 372.7, 0.8],
    [282.9, 377.2, 0.8],
    [288.7, 377.2, 1.7],
    [294.5, 377.2, 1.7],
    [300.4, 377.2, 1.7],
    [306.2, 377.2, 1.4],
    [312.1, 377.1, 0.8],
    [317.9, 377.2, 0.8],
    [884.8, 377.2, 1.2],
    [890.6, 377.1, 1.1],
    [896.5, 377.2, 0.8],
    [282.9, 381.7, 1.0],
    [288.7, 381.7, 1.7],
    [294.5, 381.7, 1.7],
    [300.4, 381.7, 1.7],
    [306.2, 381.7, 0.9],
    [884.8, 381.6, 0.8],
    [282.9, 386.1, 1.1],
    [288.7, 386.2, 1.7],
    [294.5, 386.2, 1.7],
    [300.4, 386.2, 1.7],
    [306.2, 386.2, 0.8],
    [282.9, 390.7, 1.2],
    [288.7, 390.7, 1.7],
    [294.5, 390.7, 1.7],
    [300.4, 390.6, 1.6],
    [306.2, 390.7, 0.8],
    [282.9, 395.2, 1.5],
    [288.7, 395.2, 1.7],
    [294.5, 395.2, 1.7],
    [300.4, 395.2, 0.8],
    [282.9, 399.7, 1.0],
    [288.7, 399.7, 1.7],
    [294.6, 399.6, 1.4],
    [300.4, 399.7, 0.8],
    [282.9, 404.1, 0.8],
    [288.7, 404.1, 1.6],
    [294.5, 404.2, 1.7],
    [300.4, 404.2, 0.8],
    [288.7, 408.7, 0.8],
    [294.6, 408.7, 1.4],
    [300.4, 408.6, 1.4],
    [306.2, 408.6, 0.8],
    [312.1, 408.7, 0.8],
    [294.6, 413.1, 0.8],
    [300.4, 413.2, 0.8],
    [306.2, 413.2, 0.8],
    [312.1, 413.2, 0.8],
  ];
  // Ghana: lon=-0.2, lat=7.9 → x=(0.2+180)/360*1000=499.4, y=(90-7.9)/180*500=227.5
  const gx = 499,
    gy = 228;
  const regions = [
    { id: "NA", label: "North America", flag: "🇺🇸", pct: 42, x: 210, y: 128 },
    { id: "EU", label: "Europe", flag: "🇪🇺", pct: 28, x: 525, y: 72 },
    { id: "AS", label: "Asia Pacific", flag: "🌏", pct: 21, x: 810, y: 130 },
    { id: "SA", label: "Latam", flag: "🌎", pct: 5, x: 298, y: 318 },
    { id: "OT", label: "Other", flag: "🌍", pct: 4, x: 700, y: 355 },
  ];
  return (
    <Card style={{ padding: "16px 18px", display: "flex", flexDirection: "column", minHeight: 340 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Global Market Distribution</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
            BRIDGE sector investment activity by region
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 7,
              background: C.accentBg,
              border: `1px solid ${C.accent}44`,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
              Ghana Hub
            </span>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 9px",
              border: "1px solid #E5E7EB",
              borderRadius: 6,
              background: "#fff",
              fontSize: 10,
              color: C.mid,
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            <Maximize2 size={10} />
            Expand
          </button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, flex: 1, minHeight: 0 }}>
        <div
          style={{
            flex: 1,
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            minHeight: 240,
            background: "linear-gradient(160deg,#e8f4fb 0%,#daeef8 60%,#cce6f4 100%)",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 440"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: "block" }}
          >
            <defs>
              <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#daeef8" />
                <stop offset="100%" stopColor="#c8e3f2" />
              </radialGradient>
            </defs>
            {/* Ocean fill */}
            <rect x={0} y={0} width={1000} height={440} fill="url(#oceanGrad)" />
            {/* Grid */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * 44}
                x2={1000}
                y2={i * 44}
                stroke="#8aafc4"
                strokeWidth={0.25}
                strokeOpacity={0.35}
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <line
                key={`v${i}`}
                x1={i * 100}
                y1={0}
                x2={i * 100}
                y2={440}
                stroke="#8aafc4"
                strokeWidth={0.25}
                strokeOpacity={0.35}
              />
            ))}
            {/* Equator */}
            <line
              x1={0}
              y1={250}
              x2={1000}
              y2={250}
              stroke="#5e8fa8"
              strokeWidth={0.8}
              strokeDasharray="6 5"
              strokeOpacity={0.4}
            />
            <text
              x={8}
              y={246}
              fontSize={7.5}
              fill="#7aaabf"
              fontFamily="Inter,sans-serif"
              opacity={0.85}
              fontStyle="italic"
            >
              Equator
            </text>
            {/* Prime meridian */}
            <line
              x1={500}
              y1={0}
              x2={500}
              y2={440}
              stroke="#5e8fa8"
              strokeWidth={0.8}
              strokeDasharray="6 5"
              strokeOpacity={0.4}
            />
            {/* Land dots from EPS */}
            {DOTS.map((d, i) => (
              <circle key={i} cx={d[0]} cy={d[1]} r={Math.max(d[2], 1.2)} fill="#9ab8c8" fillOpacity={0.85} />
            ))}
            {/* Connection lines */}
            {regions.map((r) => (
              <line
                key={`l${r.id}`}
                x1={gx}
                y1={gy}
                x2={r.x}
                y2={r.y}
                stroke={s.color}
                strokeWidth={1}
                strokeDasharray="5 4"
                strokeOpacity={0.28}
              />
            ))}
            {/* Region bubbles */}
            {regions.map((r) => {
              const isHov = hovRegion === r.id;
              const rb = isHov ? 22 : 18;
              return (
                <g
                  key={r.id}
                  onMouseEnter={() => setHovRegion(r.id)}
                  onMouseLeave={() => setHovRegion(null)}
                  style={{ cursor: "pointer" }}
                >
                  <circle cx={r.x} cy={r.y} r={rb + 8} fill={s.color} fillOpacity={0.08} />
                  <circle
                    cx={r.x}
                    cy={r.y}
                    r={rb}
                    fill={s.color}
                    fillOpacity={isHov ? 0.92 : 0.62}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                  <text
                    x={r.x}
                    y={r.y + 4}
                    textAnchor="middle"
                    fontSize={isHov ? 10 : 9}
                    fill="#fff"
                    fontFamily="Inter,sans-serif"
                    fontWeight={700}
                  >
                    {r.pct}%
                  </text>
                  {isHov && (
                    <g>
                      <rect
                        x={r.x - 52}
                        y={r.y - 48}
                        width={104}
                        height={24}
                        rx={5}
                        fill="#111827"
                        fillOpacity={0.92}
                      />
                      <text
                        x={r.x}
                        y={r.y - 32}
                        textAnchor="middle"
                        fontSize={9.5}
                        fill="#fff"
                        fontFamily="Inter,sans-serif"
                        fontWeight={700}
                      >
                        {r.flag} {r.label} · {r.pct}%
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
            {/* Ghana Hub */}
            <circle cx={gx} cy={gy} r={32} fill={s.color} fillOpacity={0.06} />
            <circle cx={gx} cy={gy} r={20} fill={s.color} fillOpacity={0.12} />
            <circle cx={gx} cy={gy} r={10} fill={s.color} fillOpacity={0.95} stroke="#fff" strokeWidth={2.5} />
            <circle cx={gx} cy={gy} r={4} fill="#fff" />
            <rect x={gx + 14} y={gy - 20} width={76} height={22} rx={5} fill="#111827" fillOpacity={0.9} />
            <text
              x={gx + 52}
              y={gy - 5}
              textAnchor="middle"
              fontSize={9}
              fill="#fff"
              fontFamily="Inter,sans-serif"
              fontWeight={800}
              letterSpacing={0.8}
            >
              GHANA HUB
            </text>
          </svg>
        </div>
        <div
          style={{
            width: 170,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 4 }}>Investment Flow</div>
          {regions.map((r, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovRegion(r.id)}
              onMouseLeave={() => setHovRegion(null)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ fontSize: 14 }}>{r.flag}</span>
                  <span
                    style={{
                      fontSize: 10,
                      color: hovRegion === r.id ? C.primary : C.mid,
                      fontFamily: "Inter,sans-serif",
                      fontWeight: hovRegion === r.id ? 700 : 600,
                      transition: "color .2s",
                    }}
                  >
                    {r.label}
                  </span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                  {r.pct}%
                </span>
              </div>
              <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${r.pct}%`,
                    background: s.color,
                    borderRadius: 3,
                    transition: "width .6s ease",
                    opacity: hovRegion === r.id ? 1 : 0.65,
                  }}
                />
              </div>
            </div>
          ))}
          <div
            style={{
              marginTop: 10,
              padding: "12px 14px",
              borderRadius: 10,
              background: C.accentBg,
              border: `1px solid ${C.accent}55`,
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: C.primary,
                fontFamily: "Inter,sans-serif",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 4,
              }}
            >
              Total Capital
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.primary, letterSpacing: "-0.5px" }}>
              ${((s.capLow + s.capHigh) / 2).toFixed(1)}B
            </div>
            <div style={{ fontSize: 9, color: C.teal, fontFamily: "Inter,sans-serif", marginTop: 3 }}>
              Deployed across regions
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

const M = {
  bg: "#070D09",
  surface: "#0F1A12",
  card: "#141F17",
  border: "rgba(255,255,255,0.07)",
  borderAct: "rgba(184,217,53,0.35)",
  accent: "#B8D935",
  accentDim: "rgba(184,217,53,0.15)",
  text: "rgba(255,255,255,0.92)",
  sub: "rgba(255,255,255,0.45)",
  muted: "rgba(255,255,255,0.22)",
  green: "#22C55E",
  red: "#EF4444",
  yellow: "#F59E0B",
  primary: "#1B4D3E",
};

function ScoreRing({ score, color, size = 80 }) {
  const r = 28,
    circ = 2 * Math.PI * r,
    dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
      <text
        x="36"
        y="36"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fill: M.text,
          fontSize: 14,
          fontWeight: 800,
          fontFamily: "Inter,sans-serif",
          transform: "rotate(90deg)",
          transformOrigin: "36px 36px",
        }}
      >
        {score}
      </text>
    </svg>
  );
}

function MModule({ icon, label, badge, children, defaultOpen = false, accentColor }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        borderRadius: 12,
        background: M.card,
        border: `1px solid ${open ? M.borderAct : M.border}`,
        overflow: "hidden",
        marginBottom: 10,
        transition: "border-color .2s",
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
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: open ? `${accentColor || M.accent}18` : M.accentDim,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background .2s",
          }}
        >
          {icon}
        </div>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: M.text, fontFamily: "DM Sans,sans-serif" }}>
          {label}
        </span>
        {badge && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: M.accent,
              fontFamily: "Inter,sans-serif",
              background: M.accentDim,
              padding: "2px 8px",
              borderRadius: 20,
            }}
          >
            {badge}
          </span>
        )}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform .22s", flexShrink: 0 }}
        >
          <path d="M4 6l4 4 4-4" stroke={M.muted} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      {open && <div style={{ borderTop: `1px solid ${M.border}`, padding: "12px 14px" }}>{children}</div>}
    </div>
  );
}

function MKpi({ label, value, sub, trend, icon }) {
  const up = trend && trend.startsWith("+");
  return (
    <div style={{ background: M.card, borderRadius: 12, border: `1px solid ${M.border}`, padding: "13px 14px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: M.accentDim,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        {trend && (
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "Inter,sans-serif", color: up ? M.green : M.red }}>
            {trend}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: M.text,
          letterSpacing: "-0.5px",
          lineHeight: 1,
          marginBottom: 3,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: M.sub, fontFamily: "Inter,sans-serif" }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

function MobileOverview({ s }) {
  const capTotal = (s.capLow + s.capHigh) / 2;
  return (
    <div>
      <div
        style={{
          background: M.card,
          borderRadius: 14,
          border: `1px solid ${M.border}`,
          padding: "18px 16px",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <ScoreRing score={s.score} color={s.color} size={78} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: M.accent,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "Inter,sans-serif",
              marginBottom: 4,
            }}
          >
            Active Sector
          </div>
          <div style={{ fontSize: 17, fontWeight: 800, color: M.text, lineHeight: 1.2, marginBottom: 8 }}>{s.full}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { l: "Cap", v: `$${s.capLow}–${s.capHigh}M` },
              { l: "IRR", v: `${s.irrHigh}%` },
            ].map((k, i) => (
              <div
                key={i}
                style={{
                  background: M.accentDim,
                  borderRadius: 4,
                  padding: "4px 9px",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
                  {k.l}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: M.accent,
                    fontFamily: "Inter,sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {k.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MModule
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        }
        label="Sub-sector Breakdown"
        badge={`${s.subSectors.length} segments`}
        accentColor={s.color}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {s.subSectors.map((ss, i) => {
            const [rr, gg, bb] = [
              parseInt(s.color.slice(1, 3), 16),
              parseInt(s.color.slice(3, 5), 16),
              parseInt(s.color.slice(5, 7), 16),
            ];
            const alpha = [1, 0.75, 0.55, 0.38, 0.22][i] || 0.22;
            const col = `rgba(${rr},${gg},${bb},${alpha})`;
            return (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: M.text }}>{ss.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                    {ss.pct}%
                  </span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${ss.pct}%`, background: col, borderRadius: 3 }} />
                </div>
              </div>
            );
          })}
        </div>
      </MModule>
      <MModule
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        }
        label="30-Day Activity"
        badge="Live"
        accentColor={s.color}
      >
        {(() => {
          const bars = Array.from({ length: 30 }, (_, i) =>
            Math.max(8, Math.round(40 + Math.sin(i * 0.9 + s.score * 0.04) * 28 + Math.sin(i * 2.1) * 12)),
          );
          const mx = Math.max(...bars);
          const [rr, gg, bb] = [
            parseInt(s.color.slice(1, 3), 16),
            parseInt(s.color.slice(3, 5), 16),
            parseInt(s.color.slice(5, 7), 16),
          ];
          return (
            <div style={{ height: 56, display: "flex", alignItems: "flex-end", gap: 2 }}>
              {bars.map((b, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    borderRadius: "2px 2px 0 0",
                    background: `rgba(${rr},${gg},${bb},${0.3 + 0.5 * (b / mx)})`,
                    height: `${(b / mx) * 100}%`,
                    minHeight: 2,
                  }}
                />
              ))}
            </div>
          );
        })()}
      </MModule>
    </div>
  );
}

function MobileSectors({ s, setS }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: M.muted,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          fontFamily: "Inter,sans-serif",
          marginBottom: 10,
        }}
      >
        All Sectors · Score Ranked
      </div>
      {sorted.map((sec, i) => {
        const act = sec.id === s.id;
        const [rr, gg, bb] = [
          parseInt(sec.color.slice(1, 3), 16),
          parseInt(sec.color.slice(3, 5), 16),
          parseInt(sec.color.slice(5, 7), 16),
        ];
        return (
          <div
            key={sec.id}
            onClick={() => setS(sec)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 12,
              marginBottom: 7,
              background: act ? `rgba(${rr},${gg},${bb},0.12)` : M.card,
              border: `1px solid ${act ? `rgba(${rr},${gg},${bb},0.4)` : M.border}`,
              cursor: "pointer",
              transition: "all .15s",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: act ? `rgba(${rr},${gg},${bb},0.2)` : "rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {sec.svgIcon(act ? sec.color : "rgba(255,255,255,0.3)", 15)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span
                  style={{ fontSize: 13, fontWeight: act ? 700 : 500, color: M.text, fontFamily: "DM Sans,sans-serif" }}
                >
                  {sec.short}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: sec.color,
                    fontFamily: "Inter,sans-serif",
                    background: `rgba(${rr},${gg},${bb},0.12)`,
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  #{i + 1}
                </span>
              </div>
              <div
                style={{
                  height: 3,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 2,
                  overflow: "hidden",
                  marginTop: 4,
                }}
              >
                <div style={{ height: "100%", width: `${sec.score}%`, background: sec.color, borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: act ? sec.color : M.sub,
                  fontFamily: "Inter,sans-serif",
                  lineHeight: 1,
                }}
              >
                {sec.score}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MobileSignals({ s }) {
  const allActivity = SECTORS.flatMap((sec) =>
    sec.activity.map((a) => ({ ...a, sector: sec.short, sColor: sec.color })),
  );
  const bullish = allActivity.filter((a) => a.sig === "Bullish");
  const watch = allActivity.filter((a) => a.sig === "Watch");
  return (
    <div>
      <MModule
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.green} strokeWidth="2">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
        }
        label="Bullish Signals"
        badge={`${bullish.length}`}
        defaultOpen={true}
        accentColor={M.green}
      >
        {bullish.slice(0, 6).map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              padding: "10px 0",
              borderBottom: `1px solid ${i < 5 ? M.border : "transparent"}`,
            }}
          >
            <div
              style={{ width: 6, height: 6, borderRadius: "50%", background: M.green, marginTop: 5, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.35, marginBottom: 3 }}>
                {a.h}
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "Inter,sans-serif",
                    background: "rgba(255,255,255,0.06)",
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  {a.sector}
                </span>
                <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.cat}</span>
              </div>
            </div>
          </div>
        ))}
      </MModule>
      <MModule
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.yellow} strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        }
        label="Watch Signals"
        badge={`${watch.length}`}
        accentColor={M.yellow}
      >
        {watch.slice(0, 4).map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              padding: "10px 0",
              borderBottom: `1px solid ${i < 3 ? M.border : "transparent"}`,
            }}
          >
            <div
              style={{ width: 6, height: 6, borderRadius: "50%", background: M.yellow, marginTop: 5, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.35, marginBottom: 3 }}>
                {a.h}
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "Inter,sans-serif",
                    background: "rgba(255,255,255,0.06)",
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  {a.sector}
                </span>
              </div>
            </div>
          </div>
        ))}
      </MModule>
    </div>
  );
}

function MobileVentures({ s }) {
  const [sortBy, setSortBy] = useState("score");
  const sorted = [...s.keyPlayers].sort((a, b) => (sortBy === "score" ? b.score - a.score : b.capNum - a.capNum));
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {[
          ["score", "By Score"],
          ["capNum", "By Cap"],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setSortBy(k)}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: 8,
              border: `1px solid ${sortBy === k ? M.accent : M.border}`,
              background: sortBy === k ? M.accentDim : M.card,
              fontSize: 11,
              fontWeight: 700,
              color: sortBy === k ? M.accent : M.sub,
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
            }}
          >
            {l}
          </button>
        ))}
      </div>
      {sorted.map((p, i) => {
        const up = p.change.startsWith("+");
        const [rr, gg, bb] = [
          parseInt(s.color.slice(1, 3), 16),
          parseInt(s.color.slice(3, 5), 16),
          parseInt(s.color.slice(5, 7), 16),
        ];
        return (
          <div
            key={p.ticker}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 12,
              marginBottom: 7,
              background: M.card,
              border: `1px solid ${M.border}`,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: `rgba(${rr},${gg},${bb},0.15)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 11,
                fontWeight: 800,
                color: s.color,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {i + 1}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: M.text,
                  marginBottom: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {p.name}
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>#{p.ticker}</span>
                <span
                  style={{ fontSize: 10, fontWeight: 600, color: up ? M.green : M.red, fontFamily: "Inter,sans-serif" }}
                >
                  {p.change}
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: M.text, fontFamily: "Inter,sans-serif" }}>
                {p.cap}
              </div>
              <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>Score: {p.score}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MobileMap({ s }) {
  const continents = [
    {
      id: "NA",
      pts: "33,83 83,56 167,28 250,39 333,56 375,83 347,119 314,128 278,181 250,194 208,194 172,161 172,128 156,114 83,89",
    },
    { id: "GL", pts: "333,28 389,14 417,28 403,56 361,61 333,50" },
    {
      id: "SA",
      pts: "222,194 278,183 328,194 375,217 403,261 403,272 389,306 361,328 333,389 306,403 292,389 278,356 264,317 256,261 250,228 222,211",
    },
    {
      id: "EU",
      pts: "444,78 472,61 514,53 528,61 550,50 578,53 600,72 583,89 561,94 536,100 514,92 500,100 486,111 472,106 458,100 444,89",
    },
    {
      id: "AF",
      pts: "458,100 528,94 583,100 617,128 628,150 636,167 642,194 628,228 617,261 597,317 583,350 567,367 544,372 519,361 500,356 481,350 464,328 453,294 447,261 450,228 453,194 453,161 458,128",
    },
    {
      id: "AS",
      pts: "583,89 617,78 650,56 700,39 750,28 833,28 900,39 944,56 967,78 961,100 922,119 883,133 861,150 833,161 806,167 778,194 750,211 722,222 700,228 667,217 650,194 628,172 617,128 583,100",
    },
    { id: "AU", pts: "806,272 861,261 900,267 933,283 939,306 928,328 906,344 872,350 844,344 817,328 806,306" },
  ];
  const regions = [
    { f: "🇺🇸", l: "North America", pct: 42 },
    { f: "🇪🇺", l: "Europe", pct: 28 },
    { f: "🌏", l: "Asia Pacific", pct: 21 },
    { f: "🌎", l: "Latam", pct: 5 },
    { f: "🌍", l: "Other", pct: 4 },
  ];
  const gx = 499,
    gy = 228;
  return (
    <div>
      <div
        style={{
          background: M.card,
          borderRadius: 14,
          border: `1px solid ${M.border}`,
          overflow: "hidden",
          marginBottom: 10,
        }}
      >
        <div
          style={{ padding: "12px 14px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: M.text }}>Global Investor Distribution</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: M.accent,
              fontFamily: "Inter,sans-serif",
              background: M.accentDim,
              padding: "2px 8px",
              borderRadius: 20,
            }}
          >
            5 Regions
          </span>
        </div>
        <svg viewBox="0 0 1000 500" style={{ width: "100%", display: "block" }}>
          <rect width="1000" height="500" fill="#0A1510" />
          {continents.map((c) => (
            <polygon key={c.id} points={c.pts} fill="#172318" stroke="#1E3328" strokeWidth="1.5" />
          ))}
          <circle cx={gx} cy={gy} r="16" fill={`${s.color}15`} />
          <circle cx={gx} cy={gy} r="9" fill={`${s.color}30`} />
          <circle cx={gx} cy={gy} r="5" fill={s.color} />
          <text x={gx + 12} y={gy - 8} fill={s.color} fontSize="18" fontWeight="800" fontFamily="Inter,sans-serif">
            GH
          </text>
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {regions.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 10,
              background: M.card,
              border: `1px solid ${M.border}`,
            }}
          >
            <span style={{ fontSize: 18 }}>{r.f}</span>
            <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: M.text }}>{r.l}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 60,
                  height: 4,
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div style={{ height: "100%", width: `${r.pct}%`, background: s.color, borderRadius: 2 }} />
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: M.accent,
                  fontFamily: "Inter,sans-serif",
                  minWidth: 28,
                  textAlign: "right",
                }}
              >
                {r.pct}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Analytics Sub-section Pill Nav ──────────────────────────────────
function AnalyticsSubNav({ sub, setSub }) {
  const subs = [
    { id: "kpis", label: "KPIs" },
    { id: "performance", label: "Performance" },
    { id: "activity", label: "Activity" },
    { id: "companies", label: "Companies" },
    { id: "map", label: "Map" },
  ];
  return (
    <div style={{ overflowX: "auto", scrollbarWidth: "none", flexShrink: 0, paddingBottom: 2 }}>
      <div style={{ display: "flex", gap: 6, padding: "0 0 2px" }}>
        {subs.map((item) => {
          const act = item.id === sub;
          return (
            <button
              key={item.id}
              onClick={() => setSub(item.id)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid ${act ? M.accent : M.border}`,
                background: act ? M.accentDim : "transparent",
                fontSize: 11,
                fontWeight: act ? 700 : 500,
                color: act ? M.accent : M.muted,
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Analytics Sub-section Content ───────────────────────────────────
function MobileAnalytics({ s, sub }) {
  const capTotal = (s.capLow + s.capHigh) / 2;

  const subContent = () => {
    if (sub === "kpis") {
      const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
      const [rr, gg, bb] = [
        parseInt(s.color.slice(1, 3), 16),
        parseInt(s.color.slice(3, 5), 16),
        parseInt(s.color.slice(5, 7), 16),
      ];
      const sparkData = MONTHS.map((_, i) =>
        Math.round(capTotal * 0.6 + Math.sin(i * 0.9 + s.score * 0.05) * capTotal * 0.25 + i * 0.4),
      );
      const sparkMax = Math.max(...sparkData);
      const sparkMin = Math.min(...sparkData);
      const toY = (v, h) => h - Math.round(((v - sparkMin) / (sparkMax - sparkMin || 1)) * (h - 8)) - 4;
      const sparkW = 280;
      const sparkH = 52;
      const pts = sparkData
        .map((_, i) => `${Math.round(i * (sparkW / (MONTHS.length - 1)))},${toY(sparkData[i], sparkH)}`)
        .join(" ");
      const areapts = `0,${sparkH} ${pts} ${sparkW},${sparkH}`;
      return (
        <div>
          {/* 4 KPI cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            <MKpi
              label="Market Cap"
              value={`$${capTotal.toFixed(1)}B`}
              sub="Sector aggregate"
              trend="+5.1%"
              icon={<span style={{ fontSize: 14, fontWeight: 800, color: M.accent }}>$</span>}
            />
            <MKpi
              label="IRR Ceiling"
              value={`${s.irrHigh}%`}
              sub="Target return"
              trend="+2.4%"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.green} strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              }
            />
            <MKpi
              label="Sub-sector Rev"
              value={`$${((s.subSectors[0]?.pct / 100) * capTotal * 1.4).toFixed(1)}B`}
              sub="Lead segment"
              trend="+3.8%"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              }
            />
            <MKpi
              label="BRIDGE Score"
              value={`${s.score}`}
              sub="Composite signal"
              trend="+1.2%"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              }
            />
          </div>

          {/* Recent Signals */}
          <div
            style={{
              background: M.card,
              borderRadius: 14,
              border: `1px solid ${M.border}`,
              padding: "14px 16px",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: M.muted,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Recent Signals
              </div>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: M.accent,
                  fontFamily: "Inter,sans-serif",
                  background: M.accentDim,
                  padding: "2px 8px",
                  borderRadius: 20,
                }}
              >
                {s.activity.length} signals
              </span>
            </div>
            {s.activity.map((a, i) => {
              const bull = a.sig === "Bullish";
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    paddingBottom: 10,
                    marginBottom: i < s.activity.length - 1 ? 10 : 0,
                    borderBottom: i < s.activity.length - 1 ? `1px solid ${M.border}` : "none",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {bull ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={M.green} strokeWidth="2.5">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={M.yellow} strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.35, marginBottom: 4 }}>
                      {a.h}
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: bull ? M.green : M.yellow,
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {a.sig}
                      </span>
                      <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                      <span
                        style={{
                          fontSize: 9,
                          color: M.muted,
                          fontFamily: "Inter,sans-serif",
                          background: "rgba(255,255,255,0.05)",
                          padding: "1px 6px",
                          borderRadius: 4,
                        }}
                      >
                        {a.cat}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deployment Pipeline */}
          <div
            style={{
              background: M.card,
              borderRadius: 14,
              border: `1px solid ${M.border}`,
              padding: "14px 16px",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: M.muted,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Deployment Pipeline
              </div>
              <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Active deals</span>
            </div>
            {(() => {
              const stages = [
                {
                  label: "Prospecting",
                  count: Math.round(s.score * 0.28 + 4),
                  pct: 85,
                  color: `rgba(${rr},${gg},${bb},0.3)`,
                },
                {
                  label: "Due Diligence",
                  count: Math.round(s.score * 0.14 + 2),
                  pct: 58,
                  color: `rgba(${rr},${gg},${bb},0.55)`,
                },
                {
                  label: "Term Sheet",
                  count: Math.round(s.score * 0.07 + 1),
                  pct: 34,
                  color: `rgba(${rr},${gg},${bb},0.75)`,
                },
                { label: "Deployed", count: Math.round(s.score * 0.04 + 1), pct: 18, color: s.color },
              ];
              const total = stages.reduce((a, x) => a + x.count, 0);
              return (
                <div>
                  {/* Stacked bar */}
                  <div
                    style={{
                      display: "flex",
                      height: 10,
                      borderRadius: 6,
                      overflow: "hidden",
                      gap: 2,
                      marginBottom: 14,
                    }}
                  >
                    {stages.map((st, i) => (
                      <div
                        key={i}
                        style={{
                          flex: st.pct,
                          background: st.color,
                          borderRadius: i === 0 ? "6px 0 0 6px" : i === stages.length - 1 ? "0 6px 6px 0" : "0",
                        }}
                      />
                    ))}
                  </div>
                  {/* Stage rows */}
                  {stages.map((st, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: i < stages.length - 1 ? 10 : 0,
                      }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: st.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: M.sub, flex: 1, fontFamily: "Inter,sans-serif" }}>
                        {st.label}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: M.text,
                          fontFamily: "Inter,sans-serif",
                          lineHeight: 1,
                        }}
                      >
                        {st.count}
                      </span>
                      <span
                        style={{
                          fontSize: 9,
                          color: M.muted,
                          fontFamily: "Inter,sans-serif",
                          width: 28,
                          textAlign: "right",
                        }}
                      >
                        {Math.round((st.count / total) * 100)}%
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      marginTop: 12,
                      paddingTop: 10,
                      borderTop: `1px solid ${M.border}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>Total active</span>
                    <span style={{ fontSize: 15, fontWeight: 800, color: M.text, fontFamily: "Inter,sans-serif" }}>
                      {total} deals
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Sub-sector donut + bar combo */}
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            }
            label="Sub-sector Breakdown"
            badge={`${s.subSectors.length} segments`}
            defaultOpen={false}
            accentColor={s.color}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
              {/* Mini donut */}
              {(() => {
                const size = 80;
                const cx = 40;
                const cy = 40;
                const r = 28;
                const circ = 2 * Math.PI * r;
                let cum = 0;
                return (
                  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
                    {s.subSectors.map((ss, i) => {
                      const alpha = [1, 0.75, 0.55, 0.38, 0.22][i] || 0.22;
                      const col = `rgba(${rr},${gg},${bb},${alpha})`;
                      const dash = circ * (ss.pct / 100);
                      const gap = circ - dash;
                      const rot = -90 + (cum / 100) * 360;
                      cum += ss.pct;
                      return (
                        <circle
                          key={i}
                          cx={cx}
                          cy={cy}
                          r={r}
                          fill="none"
                          stroke={col}
                          strokeWidth="12"
                          strokeDasharray={`${dash} ${gap}`}
                          strokeLinecap="butt"
                          transform={`rotate(${rot} ${cx} ${cy})`}
                        />
                      );
                    })}
                    <text
                      x={cx}
                      y={cy - 4}
                      textAnchor="middle"
                      fill={M.text}
                      fontSize="13"
                      fontWeight="800"
                      fontFamily="Inter,sans-serif"
                    >
                      {s.subSectors.length}
                    </text>
                    <text
                      x={cx}
                      y={cy + 9}
                      textAnchor="middle"
                      fill={M.muted}
                      fontSize="7"
                      fontFamily="Inter,sans-serif"
                    >
                      sectors
                    </text>
                  </svg>
                );
              })()}
              {/* Legend */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                {s.subSectors.map((ss, i) => {
                  const alpha = [1, 0.75, 0.55, 0.38, 0.22][i] || 0.22;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: 2,
                          background: `rgba(${rr},${gg},${bb},${alpha})`,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 10,
                          color: M.sub,
                          flex: 1,
                          fontFamily: "Inter,sans-serif",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {ss.name}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {ss.pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 48, marginTop: 4 }}>
              {s.subSectors.map((ss, i) => {
                const alpha = [1, 0.75, 0.55, 0.38, 0.22][i] || 0.22;
                return (
                  <div
                    key={i}
                    style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
                  >
                    <span style={{ fontSize: 8, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                      {ss.pct}%
                    </span>
                    <div
                      style={{
                        width: "100%",
                        background: `rgba(${rr},${gg},${bb},${alpha})`,
                        borderRadius: "3px 3px 0 0",
                        height: `${(ss.pct / 40) * 36 + 8}px`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 5, marginTop: 2 }}>
              {s.subSectors.map((ss, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <span style={{ fontSize: 7, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
                    {ss.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </MModule>

          {/* Sector comparison strip */}
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            }
            label="Sector vs Portfolio"
            badge="12 sectors"
            defaultOpen={false}
            accentColor={s.color}
          >
            <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 10 }}>
              BRIDGE score across all sectors
            </div>
            {[...SECTORS]
              .sort((a, b) => b.score - a.score)
              .map((sec, i) => {
                const isActive = sec.id === s.id;
                const [srr, sgg, sbb] = [
                  parseInt(sec.color.slice(1, 3), 16),
                  parseInt(sec.color.slice(3, 5), 16),
                  parseInt(sec.color.slice(5, 7), 16),
                ];
                return (
                  <div key={sec.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                    <span
                      style={{
                        fontSize: 9,
                        color: isActive ? M.accent : M.muted,
                        fontFamily: "Inter,sans-serif",
                        width: 16,
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      #{i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? M.text : M.sub,
                        width: 72,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {sec.short}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 5,
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${sec.score}%`,
                          background: isActive ? sec.color : `rgba(${srr},${sgg},${sbb},0.4)`,
                          borderRadius: 3,
                          transition: "width .4s ease",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: isActive ? 800 : 500,
                        color: isActive ? M.accent : M.muted,
                        fontFamily: "Inter,sans-serif",
                        width: 24,
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      {sec.score}
                    </span>
                  </div>
                );
              })}
          </MModule>
        </div>
      );
    }

    if (sub === "performance")
      return (
        <div>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <circle cx="7" cy="7" r="3" />
                <circle cx="17" cy="7" r="5" />
                <circle cx="12" cy="17" r="4" />
              </svg>
            }
            label="Volatility vs Growth Rate"
            badge="Sub-sectors"
            defaultOpen={true}
            accentColor={s.color}
          >
            <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 10 }}>
              Risk-return profile · bubble size = market share
            </div>
            {s.subSectors.map((ss, i) => {
              const [rr, gg, bb] = [
                parseInt(s.color.slice(1, 3), 16),
                parseInt(s.color.slice(3, 5), 16),
                parseInt(s.color.slice(5, 7), 16),
              ];
              const alpha = [1, 0.78, 0.55, 0.38, 0.2][i] || 0.2;
              const col = `rgba(${rr},${gg},${bb},${alpha})`;
              const growthVal = Math.round(ss.pct * 1.4 + 18);
              const riskVal = Math.round(15 + i * 18);
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      width: Math.max(28, ss.pct * 1.1),
                      height: Math.max(28, ss.pct * 1.1),
                      borderRadius: "50%",
                      background: col,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "Inter,sans-serif" }}>
                      {ss.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 3)}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: M.text }}>{ss.name}</span>
                      <span style={{ fontSize: 10, color: M.accent, fontWeight: 700, fontFamily: "Inter,sans-serif" }}>
                        {ss.pct}%
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                        Growth <span style={{ color: M.green, fontWeight: 700 }}>{growthVal}%</span>
                      </span>
                      <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                        Risk <span style={{ color: M.yellow, fontWeight: 700 }}>{riskVal}%</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </MModule>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            }
            label="Sector Performance Index"
            badge="8-Month"
            defaultOpen={true}
            accentColor={s.color}
          >
            {(() => {
              const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
              const [rr, gg, bb] = [
                parseInt(s.color.slice(1, 3), 16),
                parseInt(s.color.slice(3, 5), 16),
                parseInt(s.color.slice(5, 7), 16),
              ];
              const data = MONTHS.map((m, i) => {
                const actual = Math.min(
                  13,
                  Math.round(14 * 0.35 + Math.sin(i * 0.85 + s.score * 0.05) * 14 * 0.18 + i * 0.5),
                );
                const insight = Math.min(14, actual + Math.round(1 + Math.sin(i * 1.3 + s.score * 0.03) * 2));
                return { month: m, actual, insight };
              });
              const maxV = 14;
              return (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                      <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>Actual</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: `${s.color}55`,
                          border: `1px solid ${s.color}88`,
                        }}
                      />
                      <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                        AI Projection
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80 }}>
                    {data.map((d, i) => (
                      <div
                        key={i}
                        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            height: 68,
                            gap: 1,
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              borderRadius: "2px 2px 0 0",
                              background: `rgba(${rr},${gg},${bb},0.3)`,
                              height: `${(d.insight / maxV) * 100}%`,
                            }}
                          />
                          <div
                            style={{
                              width: "100%",
                              borderRadius: "2px 2px 0 0",
                              background: s.color,
                              height: `${(d.actual / maxV) * 100}%`,
                              marginTop: -Math.round((d.insight / maxV) * 68),
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                          {d.month.slice(0, 1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </MModule>
        </div>
      );

    if (sub === "activity")
      return (
        <div>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            }
            label="Activity Heatmap"
            badge="7 Days"
            defaultOpen={true}
            accentColor={s.color}
          >
            {(() => {
              const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
              const HOURS = ["00", "04", "08", "12", "16", "20"];
              const hv = (d, h, seed) =>
                Math.max(
                  5,
                  Math.min(
                    98,
                    Math.round(50 + Math.sin(d * 2.3 + h * 1.7 + seed * 0.1) * 30 + Math.sin(d * 0.9 + h * 2.1) * 18),
                  ),
                );
              const hc = (val, col) =>
                val < 20
                  ? "rgba(255,255,255,0.04)"
                  : val < 40
                    ? `${col}30`
                    : val < 65
                      ? `${col}60`
                      : val < 82
                        ? `${col}90`
                        : col;
              return (
                <div>
                  <div style={{ display: "flex", marginLeft: 28, marginBottom: 4, gap: 2 }}>
                    {HOURS.map((h) => (
                      <div
                        key={h}
                        style={{
                          flex: 1,
                          fontSize: 8,
                          color: M.muted,
                          fontFamily: "Inter,sans-serif",
                          textAlign: "center",
                        }}
                      >
                        {h}
                      </div>
                    ))}
                  </div>
                  {DAYS.map((day, di) => (
                    <div key={di} style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 3 }}>
                      <div
                        style={{
                          width: 24,
                          fontSize: 8,
                          color: M.muted,
                          fontFamily: "Inter,sans-serif",
                          flexShrink: 0,
                          textAlign: "right",
                        }}
                      >
                        {day.slice(0, 2)}
                      </div>
                      {HOURS.map((h, hi) => (
                        <div
                          key={hi}
                          style={{
                            flex: 1,
                            height: 18,
                            borderRadius: 3,
                            background: hc(hv(di, hi * 4, s.score), s.color),
                          }}
                        />
                      ))}
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Low</span>
                    {[0.04, 0.3, 0.6, 0.9, 1].map((a, i) => (
                      <div
                        key={i}
                        style={{
                          width: 14,
                          height: 10,
                          borderRadius: 2,
                          background:
                            a < 0.1
                              ? `rgba(255,255,255,0.04)`
                              : `${s.color}${Math.round(a * 255)
                                  .toString(16)
                                  .padStart(2, "0")}`,
                        }}
                      />
                    ))}
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Peak</span>
                  </div>
                </div>
              );
            })()}
          </MModule>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            }
            label="Signal Source Breakdown"
            badge="+180%"
            defaultOpen={false}
            accentColor={s.color}
          >
            {(() => {
              const totalAct = s.activity.length || 1;
              const earnCnt = s.activity.filter((a) => a.cat === "Earnings" || a.cat === "Policy").length;
              const newsCnt = s.activity.filter(
                (a) => a.cat === "Launch" || a.cat === "Market" || a.cat === "Finance",
              ).length;
              const analCnt = totalAct - earnCnt - newsCnt;
              const [rr, gg, bb] = [
                parseInt(s.color.slice(1, 3), 16),
                parseInt(s.color.slice(3, 5), 16),
                parseInt(s.color.slice(5, 7), 16),
              ];
              const srcs = [
                { l: "Earnings & Policy", v: Math.round((earnCnt / totalAct) * 100) || 48, color: s.color },
                {
                  l: "News & Media",
                  v: Math.round((newsCnt / totalAct) * 100) || 32,
                  color: `rgba(${rr},${gg},${bb},0.65)`,
                },
                {
                  l: "Analyst Ratings",
                  v: Math.round((analCnt / totalAct) * 100) || 20,
                  color: `rgba(${rr},${gg},${bb},0.35)`,
                },
              ];
              const tot = srcs.reduce((a, x) => a + x.v, 0);
              const normed = srcs.map((x) => ({ ...x, v: Math.round((x.v / tot) * 100) }));
              return (
                <div>
                  <div
                    style={{
                      display: "flex",
                      height: 28,
                      borderRadius: 8,
                      overflow: "hidden",
                      gap: 2,
                      marginBottom: 12,
                    }}
                  >
                    {normed.map((src, i) => (
                      <div
                        key={i}
                        style={{
                          flex: src.v,
                          background: src.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {src.v > 18 && (
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "Inter,sans-serif" }}>
                            {src.v}%
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  {normed.map((src, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: src.color }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: M.text }}>{src.l}</span>
                        </div>
                        <span
                          style={{ fontSize: 11, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}
                        >
                          {src.v}%
                        </span>
                      </div>
                      <div
                        style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}
                      >
                        <div style={{ height: "100%", width: `${src.v}%`, background: src.color, borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </MModule>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <path d="M22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            }
            label="30-Day Engagement"
            badge="Live"
            defaultOpen={false}
            accentColor={s.color}
          >
            {(() => {
              const bars = Array.from({ length: 30 }, (_, i) =>
                Math.max(8, Math.round(40 + Math.sin(i * 0.9 + s.score * 0.04) * 28 + Math.sin(i * 2.1) * 12)),
              );
              const mx = Math.max(...bars);
              const [rr, gg, bb] = [
                parseInt(s.color.slice(1, 3), 16),
                parseInt(s.color.slice(3, 5), 16),
                parseInt(s.color.slice(5, 7), 16),
              ];
              const anomalies = [6, 13, 22];
              return (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
                    {[
                      {
                        v: Math.round(s.activity.length * 241 + s.score * 8).toLocaleString(),
                        l: "Active Signals",
                        b: "+56%",
                      },
                      { v: Math.round(s.score * 13 + 240), l: "Conversion", b: "+43%" },
                      { v: Math.round(s.score * 112 + 1800), l: "Avg Duration", b: "+28%" },
                    ].map((st, i) => (
                      <div
                        key={i}
                        style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "8px 10px" }}
                      >
                        <div style={{ fontSize: 14, fontWeight: 800, color: M.text, lineHeight: 1, marginBottom: 2 }}>
                          {st.v}
                        </div>
                        <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{st.l}</div>
                        <span style={{ fontSize: 9, fontWeight: 700, color: M.green, fontFamily: "Inter,sans-serif" }}>
                          {st.b}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 52, display: "flex", alignItems: "flex-end", gap: 2 }}>
                    {bars.map((b, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          borderRadius: "2px 2px 0 0",
                          background: anomalies.includes(i) ? s.color : `rgba(${rr},${gg},${bb},0.45)`,
                          height: `${(b / mx) * 100}%`,
                          minHeight: 2,
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    {["Feb 5", "Feb 15", "Feb 25", "Mar 1"].map((d) => (
                      <span key={d} style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </MModule>
        </div>
      );

    if (sub === "companies")
      return (
        <div>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            }
            label="Top Companies"
            badge={`${s.keyPlayers.length} active`}
            defaultOpen={true}
            accentColor={s.color}
          >
            {[...s.keyPlayers]
              .sort((a, b) => b.score - a.score)
              .map((p, i) => {
                const up = p.change.startsWith("+");
                const [rr, gg, bb] = [
                  parseInt(s.color.slice(1, 3), 16),
                  parseInt(s.color.slice(3, 5), 16),
                  parseInt(s.color.slice(5, 7), 16),
                ];
                return (
                  <div
                    key={p.ticker}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 0",
                      borderBottom: `1px solid ${i < s.keyPlayers.length - 1 ? M.border : "transparent"}`,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: `rgba(${rr},${gg},${bb},0.15)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 10,
                        fontWeight: 800,
                        color: s.color,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: M.text,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {p.name}
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
                        <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>#{p.ticker}</span>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: up ? M.green : M.red,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {p.change}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: M.text, fontFamily: "Inter,sans-serif" }}>
                        {p.cap}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          justifyContent: "flex-end",
                          marginTop: 2,
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 3,
                            background: "rgba(255,255,255,0.07)",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div style={{ height: "100%", width: `${p.score}%`, background: s.color, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{p.score}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </MModule>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            }
            label="Market Signals"
            badge={`${s.activity.length}`}
            defaultOpen={false}
            accentColor={s.color}
          >
            {s.activity.map((a, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "10px 0",
                  borderBottom: `1px solid ${i < s.activity.length - 1 ? M.border : "transparent"}`,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: a.sig === "Bullish" ? M.green : M.yellow,
                    marginTop: 5,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.35, marginBottom: 3 }}>
                    {a.h}
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: a.sig === "Bullish" ? M.green : M.yellow,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {a.sig}
                    </span>
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.cat}</span>
                  </div>
                </div>
              </div>
            ))}
          </MModule>
        </div>
      );

    if (sub === "map") return <MobileMap s={s} />;

    return null;
  };

  return (
    <div>
      {/* Hero score strip */}
      <div
        style={{
          background: M.card,
          borderRadius: 14,
          border: `1px solid ${M.border}`,
          padding: "14px 16px",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <ScoreRing score={s.score} color={s.color} size={64} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: M.accent,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "Inter,sans-serif",
              marginBottom: 2,
            }}
          >
            Analytics · {s.short}
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: M.text, lineHeight: 1.2, marginBottom: 6 }}>{s.full}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { l: "Cap", v: `$${s.capLow}–${s.capHigh}M` },
              { l: "IRR", v: `${s.irrHigh}%` },
              { l: "Score", v: `${s.score}` },
            ].map((k, i) => (
              <div
                key={i}
                style={{
                  background: M.accentDim,
                  borderRadius: 4,
                  padding: "4px 9px",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <span style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
                  {k.l}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: M.accent,
                    fontFamily: "Inter,sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {k.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Sub-section content */}
      {subContent()}
    </div>
  );
}

// ─── Coming Soon placeholder for inactive tabs ────────────────────────
function MobileComingSoon({ label, icon }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 60,
        paddingBottom: 60,
        gap: 16,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: M.accentDim,
          border: `1px solid ${M.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: M.text, marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 12, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.5 }}>
          This section will reflect
          <br />
          data for the selected sector.
        </div>
      </div>
      <div style={{ padding: "8px 18px", borderRadius: 20, border: `1px solid ${M.border}`, background: M.card }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: M.muted,
            fontFamily: "Inter,sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          COMING SOON
        </span>
      </div>
    </div>
  );
}

// ─── Mobile Bottom Nav (5 tabs → 5 content sections) ─────────────────
function MobileBottomNav({ sub, setSub }) {
  const tabs = [
    { id: "kpis", label: "KPIs", icon: (c) => <Target size={20} color={c} /> },
    { id: "performance", label: "Performance", icon: (c) => <LineChart size={20} color={c} /> },
    { id: "activity", label: "Activity", icon: (c) => <Radio size={20} color={c} /> },
    { id: "companies", label: "Companies", icon: (c) => <Building2 size={20} color={c} /> },
    { id: "map", label: "Map", icon: (c) => <Globe size={20} color={c} /> },
  ];
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: M.surface,
        borderTop: `1px solid ${M.border}`,
        display: "flex",
        alignItems: "stretch",
        zIndex: 300,
        backdropFilter: "blur(12px)",
      }}
    >
      {tabs.map((t) => {
        const act = t.id === sub;
        return (
          <div
            key={t.id}
            onClick={() => setSub(t.id)}
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
                  borderRadius: "0 0 3px 3px",
                  background: M.accent,
                }}
              />
            )}
            {t.icon(act ? M.accent : M.muted)}
            <span
              style={{
                fontSize: 9,
                fontWeight: act ? 700 : 400,
                color: act ? M.accent : M.muted,
                fontFamily: "Inter,sans-serif",
                letterSpacing: "0.3px",
              }}
            >
              {t.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function MSectorDrawer({ s, setS, open, onClose }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  if (!open) return null;
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
        {/* Drag handle */}
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
        {/* Header */}
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
        {/* Scrollable list */}
        <div style={{ overflowY: "auto", flex: 1, scrollbarWidth: "none" }}>
          {sorted.map((sec, i) => {
            const act = sec.id === s.id;
            const totalV = sec.keyPlayers?.length || 5;
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
                {/* Icon */}
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
                {/* Text */}
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
                {/* Score */}
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

function MobileApp() {
  const [s, setS] = useState(SECTORS[1]);
  const [sub, setSub] = useState("kpis");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const SUB_LABELS = {
    kpis: "KPIs",
    performance: "Performance",
    activity: "Activity",
    companies: "Companies",
    map: "Global Map",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: M.bg,
        fontFamily: "'DM Sans',sans-serif",
        color: M.text,
        overflowX: "hidden",
      }}
    >
      <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}::-webkit-scrollbar{display:none;}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>

      {/* Top header — sector selector only */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 56,
          background: `${M.surface}EE`,
          borderBottom: `1px solid ${M.border}`,
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          flexShrink: 0,
        }}
      >
        {/* Sector selector */}
        <div
          onClick={() => setDrawerOpen(true)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 10,
            padding: "6px 10px 6px 8px",
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

      {/* Hamburger menu drawer */}
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
            {/* Drag handle */}
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: "rgba(255,255,255,0.15)",
                margin: "12px auto 0",
              }}
            />
            {/* Header */}
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

            {/* Nav links */}
            {[
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

      {/* Notifications dropdown */}
      {notifOpen && (
        <div
          style={{
            position: "fixed",
            top: 60,
            right: 12,
            width: 280,
            background: M.surface,
            border: `1px solid ${M.border}`,
            borderRadius: 14,
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            zIndex: 200,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 14px",
              borderBottom: `1px solid ${M.border}`,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: M.text }}>Alerts</span>
            <span
              style={{ fontSize: 11, color: M.accent, fontWeight: 700, cursor: "pointer" }}
              onClick={() => setNotifOpen(false)}
            >
              Mark all read
            </span>
          </div>
          {s.activity.slice(0, 3).map((a, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 10, padding: "10px 14px", borderBottom: `1px solid ${M.border}` }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: a.sig === "Bullish" ? M.green : M.yellow,
                  marginTop: 4,
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.3 }}>{a.h}</div>
                <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                  {a.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Page label */}
      <div style={{ padding: "8px 16px 0", flexShrink: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: M.muted,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            fontFamily: "Inter,sans-serif",
          }}
        >
          {SUB_LABELS[sub]}
        </div>
      </div>

      {/* Page content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 80px", minHeight: 0 }}>
        <MobileAnalytics s={s} sub={sub} />
      </div>

      <MobileBottomNav sub={sub} setSub={setSub} />
      <MSectorDrawer s={s} setS={setS} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

function useIsMobile() {
  const [mob, setMob] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mob;
}

export default function BridgeAnalyticsPage() {
  const isMobile = useIsMobile();
  const [s, setS] = useState(SECTORS[0]);
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("analytics");
  const [activeSector, setActiveSector] = useState(SECTORS[0]);
  const [period, setPeriod] = useState("Monthly");
  const [syncing, setSyncing] = useState(false);
  const capTotal = (s.capLow + s.capHigh) / 2;
  if (isMobile) return <MobileApp />;
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
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-thumb{background:#E5E7EB;border-radius:4px;}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.aspin{animation:spin 1s linear infinite}`}</style>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        onNavChange={setActivePage}
        activeSector={activeSector}
        setActiveSector={(sec) => {
          setActiveSector(sec);
          if (sec) setS(sec);
        }}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, width: 0 }}>
        <TopNav s={s} syncing={syncing} setSyncing={setSyncing} />
        <PageHeader s={s} period={period} setPeriod={setPeriod} syncing={syncing} setSyncing={setSyncing} />
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "14px 16px", minWidth: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", minWidth: 0 }}>
            <div
              style={{
                gridColumn: "1 / -1",
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 12,
                minHeight: 148,
              }}
            >
              <SparkCard
                label="Total Market Cap"
                value={`$${capTotal.toFixed(1)}B`}
                sublabel="Sector aggregate"
                iconBg={C.accentBg}
                iconEl={<span style={{ fontSize: 16, fontWeight: 800, color: C.primary }}>$</span>}
                s={s}
                trend="+5.1%"
              />
              <SparkCard
                label="Sub-sector Revenue"
                value={`$${((s.subSectors[0]?.pct / 100) * capTotal * 1.4).toFixed(2)}B`}
                sublabel="Leading sub-sector"
                iconEl={<Database size={16} color={C.teal} />}
                iconBg={`${C.teal}18`}
                s={s}
                trend="+3.8%"
              />
              <SparkCard
                label="IRR Potential"
                value={`${s.irrHigh}%`}
                sublabel="Target return ceiling"
                iconEl={<TrendingUp size={16} color={C.green} />}
                iconBg={"#DCFCE7"}
                s={s}
                trend="+2.4%"
              />
              <SparkCard
                label="BRIDGE Score"
                value={`${s.score}`}
                sublabel="Composite signal"
                iconEl={<Target size={16} color={s.color} />}
                iconBg={`${s.color}18`}
                s={s}
                trend="+1.2%"
              />
            </div>
            <div style={{ minWidth: 0, minHeight: 320 }}>
              <BubbleChart s={s} />
            </div>
            <div style={{ minWidth: 0, minHeight: 320 }}>
              <DotMatrixChart s={s} />
            </div>
            <div style={{ minWidth: 0, minHeight: 286 }}>
              <ActivityHeatmap s={s} />
            </div>
            <div style={{ minWidth: 0, minHeight: 286 }}>
              <SourceBreakdown s={s} />
            </div>
            <div style={{ minWidth: 0, minHeight: 330 }}>
              <CompaniesTable s={s} />
            </div>
            <div style={{ minWidth: 0, minHeight: 330 }}>
              <EngagementMetrics s={s} />
            </div>
            <div style={{ gridColumn: "1 / -1", minWidth: 0, minHeight: 340 }}>
              <WorldMap s={s} />
            </div>
            <div style={{ gridColumn: "1 / -1", height: 8 }} />
          </div>
        </div>
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
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.18)",
                  marginRight: 10,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                ·
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  marginRight: 10,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {label}
              </span>
            </span>
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
