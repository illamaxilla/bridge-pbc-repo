import {
  Activity,
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
import type { ComponentType } from "react";

/** Dashboard-specific color palette (desktop) */
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
  sideL: "#1A2E22",
  sideHov: "#1A2E1F",
  sideAct: "#1E3327",
  green: "#16A34A",
  red: "#DC2626",
  yellow: "#CA8A04",
};

/** Dashboard mobile color palette */
export const M = {
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

/** Signal color helpers */
export const sigCol = (s: string) => (s === "Bullish" ? "#16A34A" : s === "Bearish" ? "#DC2626" : "#CA8A04");
export const sigBg = (s: string) => (s === "Bullish" ? "#DCFCE7" : s === "Bearish" ? "#FEE2E2" : "#FEF9C3");
export function sigC(x: string) {
  return x === "Bullish" ? M.green : x === "Bearish" ? M.red : M.orange;
}

/* ─── Types ─── */
export interface SubSector {
  name: string;
  pct: number;
  color: string;
}

export interface Venture {
  name: string;
  cap: string;
  irr: string;
  risk: string;
}

export interface PipelineItem {
  label: string;
  pct: number;
  target: string;
  current: string;
  months: number;
}

export interface ActivityItem {
  h: string;
  amt: string;
  sig: string;
  date: string;
}

export interface Sector {
  id: string;
  icon: ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  short: string;
  full: string;
  tag: string;
  score: number;
  capLow: number;
  capHigh: number;
  irrLow: number;
  irrHigh: number;
  totalV: number;
  headline: string;
  insight: string;
  subSectors: SubSector[];
  t1: Venture[];
  t2: Venture[];
  t3: Venture[];
  pipeline: PipelineItem[];
  activity: ActivityItem[];
  cross: string[];
}

export interface Company {
  r: number;
  name: string;
  tk: string;
  chg: string;
  val: string;
  sc: number;
}

/* ─── Sector SVG Icons ─── */
export const sectorSvgIcons = [
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
    </svg>
  ),
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  ),
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
    </svg>
  ),
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
    </svg>
  ),
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  ),
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </svg>
  ),
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
      <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
      <path d="M10 20h4" />
      <circle cx="16" cy="20" r="2" />
      <circle cx="8" cy="20" r="2" />
    </svg>
  ),
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
      <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
      <path d="m11 7-3 5h4l-3 5" />
      <line x1="22" x2="22" y1="11" y2="13" />
    </svg>
  ),
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1M12 18h1M7 18h1" />
    </svg>
  ),
  (c: string, sz = 16) => (
    <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  ),
];

/* ─── Venture Icon Resolver ─── */
export function ventureIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("cold") || n.includes("storage") || n.includes("solar") || n.includes("energy") || n.includes("clean cook") || n.includes("battery") || n.includes("mini-grid") || n.includes("biogas") || n.includes("ev charging")) return BatteryCharging;
  if (n.includes("platform") || n.includes("digital") || n.includes("tech") || n.includes("data") || n.includes("ai") || n.includes("fintech") || n.includes("edtech") || n.includes("healthtech") || n.includes("kejetia")) return Cpu;
  if (n.includes("training") || n.includes("academy") || n.includes("skill") || n.includes("tvet") || n.includes("fellowship") || n.includes("scholar") || n.includes("mentor") || n.includes("apprentice") || n.includes("teacher")) return GraduationCap;
  if (n.includes("health") || n.includes("medical") || n.includes("clinic") || n.includes("nhis") || n.includes("diagnostic") || n.includes("telemedicine") || n.includes("community health") || n.includes("pharma")) return Cross;
  if (n.includes("farm") || n.includes("agri") || n.includes("cocoa") || n.includes("fruit") || n.includes("tomato") || n.includes("crop") || n.includes("cashew") || n.includes("shea") || n.includes("cooperative") || n.includes("aggregation") || n.includes("warehouse receipt")) return Sprout;
  if (n.includes("financ") || n.includes("credit") || n.includes("loan") || n.includes("capital fund") || n.includes("susu") || n.includes("insurance") || n.includes("working capital") || n.includes("microfinance") || n.includes("remittance") || n.includes("investment gateway")) return Wallet;
  if (n.includes("housing") || n.includes("real estate") || n.includes("construction") || n.includes("building") || n.includes("rental") || n.includes("affordable")) return Home;
  if (n.includes("transport") || n.includes("logistics") || n.includes("fleet") || n.includes("delivery") || n.includes("cold chain") || n.includes("freight") || n.includes("rail") || n.includes("port") || n.includes("warehousing")) return Truck;
  if (n.includes("manufactur") || n.includes("packag") || n.includes("process") || n.includes("factory") || n.includes("industrial") || n.includes("textile") || n.includes("garment") || n.includes("consumer goods")) return Factory;
  if (n.includes("tourism") || n.includes("hospitality") || n.includes("heritage") || n.includes("eco-tour") || n.includes("destination")) return Luggage;
  if (n.includes("content") || n.includes("studio") || n.includes("creative") || n.includes("talent") || n.includes("sport") || n.includes("ip monetis") || n.includes("hub network")) return Camera;
  if (n.includes("infrastructure") || n.includes("water") || n.includes("sanitation") || n.includes("connectivity") || n.includes("road") || n.includes("smart city") || n.includes("waste") || n.includes("telecoms")) return Blocks;
  return Activity;
}
