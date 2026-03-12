import React from "react";
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
} from "lucide-react";

export const C = {
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

export const sectorSvgIcons = [
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

export interface SectorData {
  id: string;
  icon: any;
  svgIcon: (c: string, s?: number) => React.ReactNode;
  short: string;
  full: string;
  tag: string;
  score: number;
  capLow: number;
  capHigh: number;
  irrLow: number;
  irrHigh: number;
  totalV: number;
  subSectors: { name: string; pct: number; color: string }[];
  t1: { name: string; cap: string; irr: string; risk: string }[];
  t2: { name: string; cap: string; irr: string; risk: string }[];
  t3: { name: string; cap: string; irr: string; risk: string }[];
  activity: { h: string; amt: string; sig: string; date: string }[];
  cross: string[];
}

export const SECTORS: SectorData[] = [
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

export const sigCol = (s: string) => (s === "Bullish" ? C.green : s === "Bearish" ? C.red : C.yellow);
export const sigBg = (s: string) => (s === "Bullish" ? "#DCFCE7" : s === "Bearish" ? "#FEE2E2" : "#FEF9C3");
export const scoreToSig = (sc: number) => (sc >= 82 ? "Bullish" : sc >= 70 ? "Watch" : "Bearish");
export const totalCapAll = () => SECTORS.reduce((a, s) => a + (s.capLow + s.capHigh) / 2, 0);
export const compute = (s: SectorData) => {
  const sent = Math.min(Math.round(s.score * 0.75 + s.irrHigh * 0.25), 96);
  const inflow = Math.min(95, Math.round(50 + (s.score - 80) * 1.2));
  return { sentimentScore: sent, inflow, outflow: 100 - inflow };
};
export const genTrend = (s: SectorData, filter: string) => {
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
export const genVolume = (s: SectorData) =>
  ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m, i) => ({
    month: m,
    deployed: Math.round((s.score * 0.9 + i * 8) * (0.8 + Math.sin(i) * 0.15)),
    target: Math.round(s.score * 1.2 + i * 6),
  }));

/* ─────────────────────────────────────────────
   MOBILE — COLOR PALETTE
   ───────────────────────────────────────────── */
export const M = {
  bg: "#080E08",
  card: "#0D1810",
  card2: "#101D12",
  border: "rgba(255,255,255,0.07)",
  borderG: "rgba(80,160,80,0.18)",
  accent: "#B8D935",
  accentDim: "rgba(184,217,53,0.12)",
  accentBorder: "rgba(184,217,53,0.25)",
  green: "#4ADE80",
  greenDim: "rgba(74,222,128,0.12)",
  amber: "#F59E0B",
  amberDim: "rgba(245,158,11,0.12)",
  red: "#EF4444",
  redDim: "rgba(239,68,68,0.12)",
  white: "rgba(255,255,255,0.88)",
  mid: "rgba(255,255,255,0.5)",
  muted: "rgba(255,255,255,0.28)",
  faint: "rgba(255,255,255,0.07)",
};

export const msigCol = (sig: string) => (sig === "Bullish" ? M.green : sig === "Bearish" ? M.red : M.amber);
export const msigDim = (sig: string) => (sig === "Bullish" ? M.greenDim : sig === "Bearish" ? M.redDim : M.amberDim);
export const riskCol = (l: string) => (l === "HIGH" ? M.red : l === "MED" ? M.amber : M.green);
export const riskDim = (l: string) => (l === "HIGH" ? M.redDim : l === "MED" ? M.amberDim : M.greenDim);

export const SCORE_DIMS = {
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

/* ── Investment Thesis ── */
export const THESIS = {
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

/* ── Key Risks ── */
export const RISKS = {
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



export const ANALYTICS_SUBS = [
  { id: "kpis", label: "KPIs" },
  { id: "performance", label: "Performance" },
  { id: "activity", label: "Activity" },
  { id: "companies", label: "Companies" },
  { id: "map", label: "Map" },
];

export const CAP_STRUCTURE = {
  agriculture: [
    { l: "Equity", pct: 40, col: M.accent },
    { l: "Debt", pct: 35, col: "#60A5FA" },
    { l: "Blended", pct: 15, col: M.amber },
    { l: "Grant", pct: 10, col: M.green },
  ],
  financial: [
    { l: "Equity", pct: 35, col: M.accent },
    { l: "Debt", pct: 40, col: "#60A5FA" },
    { l: "Blended", pct: 20, col: M.amber },
    { l: "Grant", pct: 5, col: M.green },
  ],
  technology: [
    { l: "Equity", pct: 60, col: M.accent },
    { l: "Debt", pct: 15, col: "#60A5FA" },
    { l: "Blended", pct: 20, col: M.amber },
    { l: "Grant", pct: 5, col: M.green },
  ],
  infrastructure: [
    { l: "Equity", pct: 25, col: M.accent },
    { l: "Debt", pct: 45, col: "#60A5FA" },
    { l: "Blended", pct: 20, col: M.amber },
    { l: "Grant", pct: 10, col: M.green },
  ],
  health: [
    { l: "Equity", pct: 30, col: M.accent },
    { l: "Debt", pct: 35, col: "#60A5FA" },
    { l: "Blended", pct: 20, col: M.amber },
    { l: "Grant", pct: 15, col: M.green },
  ],
  education: [
    { l: "Equity", pct: 25, col: M.accent },
    { l: "Debt", pct: 30, col: "#60A5FA" },
    { l: "Blended", pct: 20, col: M.amber },
    { l: "Grant", pct: 25, col: M.green },
  ],
  creative: [
    { l: "Equity", pct: 55, col: M.accent },
    { l: "Debt", pct: 20, col: "#60A5FA" },
    { l: "Blended", pct: 20, col: M.amber },
    { l: "Grant", pct: 5, col: M.green },
  ],
  housing: [
    { l: "Equity", pct: 30, col: M.accent },
    { l: "Debt", pct: 50, col: "#60A5FA" },
    { l: "Blended", pct: 15, col: M.amber },
    { l: "Grant", pct: 5, col: M.green },
  ],
  tourism: [
    { l: "Equity", pct: 45, col: M.accent },
    { l: "Debt", pct: 30, col: "#60A5FA" },
    { l: "Blended", pct: 20, col: M.amber },
    { l: "Grant", pct: 5, col: M.green },
  ],
  energy: [
    { l: "Equity", pct: 35, col: M.accent },
    { l: "Debt", pct: 40, col: "#60A5FA" },
    { l: "Blended", pct: 20, col: M.amber },
    { l: "Grant", pct: 5, col: M.green },
  ],
  manufacturing: [
    { l: "Equity", pct: 40, col: M.accent },
    { l: "Debt", pct: 35, col: "#60A5FA" },
    { l: "Blended", pct: 20, col: M.amber },
    { l: "Grant", pct: 5, col: M.green },
  ],
  transportation: [
    { l: "Equity", pct: 30, col: M.accent },
    { l: "Debt", pct: 45, col: "#60A5FA" },
    { l: "Blended", pct: 20, col: M.amber },
    { l: "Grant", pct: 5, col: M.green },
  ],
};
export const CO_INVESTORS = {
  agriculture: ["IFC", "USAID", "AfDB", "GhanaVenture", "AGRA"],
  financial: ["IFC", "FMO", "Swedfund", "GhDF", "MasterCard Fdn"],
  technology: ["GhanaVenture", "Norrsken", "Google", "IFC", "Y Combinator"],
  infrastructure: ["AfDB", "World Bank", "IFC", "GhInfra", "KfW"],
  health: ["IFC", "USAID", "Gates Fdn", "WHO", "GhNHIS"],
  education: ["USAID", "MasterCard Fdn", "IFC", "GhGovt", "FCDO"],
  creative: ["GhFilm", "Afrobeats Fdn", "IFC", "UNESCO", "AfDB"],
  housing: ["IFC", "GhGovt", "HomeFin", "AfDB", "SSNIT"],
  tourism: ["GTA", "IFC", "USAID", "AfDB", "WTO"],
  energy: ["AfDB", "IFC", "KfW", "IRENA", "GhEnergy"],
  manufacturing: ["GhExport", "IFC", "AfDB", "GhGovt", "Trade Fns"],
  transportation: ["AfDB", "IFC", "GhHighways", "World Bank", "GhPort"],
};
export const ENTRY_WINDOWS = {
  agriculture: [
    { q: "Q2 2026", label: "Pre-Harvest", fit: "HIGH", note: "Aligns with Planting Season Fund cycle" },
    { q: "Q4 2026", label: "Processing", fit: "MED", note: "Post-harvest value-add window opens" },
    { q: "Q1 2027", label: "Export", fit: "HIGH", note: "Cocoa & shea export season peaks" },
  ],
  financial: [
    { q: "Q2 2026", label: "MoMo Expansion", fit: "HIGH", note: "BoG Digital Credit Directive live" },
    { q: "Q3 2026", label: "MSME Lending", fit: "HIGH", note: "SME recovery cycle aligns" },
    { q: "Q1 2027", label: "Insurance", fit: "MED", note: "Annual policy renewal window" },
  ],
  technology: [
    { q: "Q2 2026", label: "Platform Build", fit: "HIGH", note: "Kejetia Phase 2 onboarding active" },
    { q: "Q3 2026", label: "Series A", fit: "MED", note: "Ecosystem fundraising cycle" },
    { q: "Q1 2027", label: "AI/ML", fit: "HIGH", note: "Smart Africa policy window" },
  ],
  infrastructure: [
    { q: "Q2 2026", label: "Roads Fast-Track", fit: "HIGH", note: "GH₵18B budget disbursement begins" },
    { q: "Q3 2026", label: "Water & San", fit: "HIGH", note: "World Bank co-finance window" },
    { q: "Q4 2026", label: "Connectivity", fit: "MED", note: "Rural broadband tender expected" },
  ],
  health: [
    { q: "Q2 2026", label: "Diagnostics", fit: "HIGH", note: "NHIA digital claims expansion live" },
    { q: "Q3 2026", label: "Supply Chain", fit: "MED", note: "Annual procurement cycle" },
    { q: "Q1 2027", label: "Telemedicine", fit: "HIGH", note: "MoH digital health policy rollout" },
  ],
  education: [
    { q: "Q2 2026", label: "EdTech Deploy", fit: "HIGH", note: "School calendar aligns post-Easter" },
    { q: "Q3 2026", label: "TVET", fit: "HIGH", note: "Budget TVET allocation releases" },
    { q: "Q4 2026", label: "HigherEd", fit: "MED", note: "University intake window" },
  ],
  creative: [
    { q: "Q2 2026", label: "Content IP", fit: "HIGH", note: "Afrobeats season peak" },
    { q: "Q3 2026", label: "Film/Studio", fit: "MED", note: "NAFTI partnership window" },
    { q: "Q1 2027", label: "Events", fit: "HIGH", note: "Festival & tour season" },
  ],
  housing: [
    { q: "Q2 2026", label: "Affordable Units", fit: "HIGH", note: "GhGovt REIT incentives active" },
    { q: "Q3 2026", label: "Mortgage", fit: "MED", note: "Home Finance scheme review" },
    { q: "Q1 2027", label: "Materials", fit: "HIGH", note: "Cement import reduction targets" },
  ],
  tourism: [
    { q: "Q2 2026", label: "Eco-Tourism", fit: "HIGH", note: "Year of Return momentum" },
    { q: "Q3 2026", label: "Hospitality", fit: "MED", note: "Shoulder season capex window" },
    { q: "Q4 2026", label: "Diaspora", fit: "HIGH", note: "Holiday arrivals peak Dec–Jan" },
  ],
  energy: [
    { q: "Q2 2026", label: "Solar Grid", fit: "HIGH", note: "PURC tariff review creates entry" },
    { q: "Q3 2026", label: "Off-Grid", fit: "HIGH", note: "Rural electrification fund opens" },
    { q: "Q1 2027", label: "Storage", fit: "MED", note: "Battery tech cost inflection" },
  ],
  manufacturing: [
    { q: "Q2 2026", label: "Agro-Processing", fit: "HIGH", note: "Import substitution policy active" },
    { q: "Q3 2026", label: "Light Mfg", fit: "MED", note: "Export zone incentives live" },
    { q: "Q1 2027", label: "Packaging", fit: "HIGH", note: "Plastics levy creates opening" },
  ],
  transportation: [
    { q: "Q2 2026", label: "Last-Mile", fit: "HIGH", note: "Roads budget disbursement begins" },
    { q: "Q3 2026", label: "Port Logistics", fit: "MED", note: "Tema Port expansion Phase 2" },
    { q: "Q1 2027", label: "Rail", fit: "HIGH", note: "GRDA revival framework expected" },
  ],
};

import {
  Globe,
  Radio,
  Building2,
  PieChart,
  Compass,
} from "lucide-react";

export const MOV_TABS = [
  { id: "overview", label: "Overview", icon: (c: string, sw: number) => <Globe size={19} color={c} strokeWidth={sw} /> },
  { id: "signals", label: "Signals", icon: (c: string, sw: number) => <Radio size={19} color={c} strokeWidth={sw} /> },
  { id: "ventures", label: "Ventures", icon: (c: string, sw: number) => <Building2 size={19} color={c} strokeWidth={sw} /> },
  { id: "capital", label: "Capital", icon: (c: string, sw: number) => <PieChart size={19} color={c} strokeWidth={sw} /> },
  { id: "outlook", label: "Outlook", icon: (c: string, sw: number) => <Compass size={19} color={c} strokeWidth={sw} /> },
];
