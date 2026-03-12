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
} from "lucide-react";
import { sectorSvgIcons } from "../sectorIcons";
import { C } from "../constants";
import type { WatchlistSector, WatchlistItem } from "./types";

// Neutral grey — single consistent style for all sector icons & tags
export const GREY = { icon: "#6B7280", bg: "#F3F4F6" };

// Map svgIcon onto each sector by id
const SVG_MAP: Record<string, (c: string, s?: number) => React.ReactNode> = {
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

export const SECTORS: WatchlistSector[] = [
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
      { name: "Cocoa Processing Co.", ticker: "CPC", score: 88, signal: "Bullish", cap: "$2.1B", change: "+4.2%", role: "Processor" },
      { name: "AgriTech Ghana", ticker: "ATG", score: 81, signal: "Bullish", cap: "$840M", change: "+1.8%", role: "Technology" },
      { name: "Northern Farms Ltd", ticker: "NFL", score: 73, signal: "Watch", cap: "$310M", change: "-0.4%", role: "Aggregator" },
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
      { name: "Fidelity Bank Ghana", ticker: "FBG", score: 91, signal: "Bullish", cap: "$1.4B", change: "+6.1%", role: "Banking" },
      { name: "MTN MoMo", ticker: "MTN", score: 88, signal: "Bullish", cap: "$3.2B", change: "+3.5%", role: "Mobile Money" },
      { name: "Stanbic IBTC", ticker: "SIB", score: 76, signal: "Watch", cap: "$620M", change: "+0.9%", role: "Banking" },
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
      { name: "Hubtel Ghana", ticker: "HBT", score: 89, signal: "Bullish", cap: "$950M", change: "+8.4%", role: "Platform" },
      { name: "mPharma", ticker: "MPH", score: 82, signal: "Bullish", cap: "$520M", change: "+3.2%", role: "HealthTech" },
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
      { name: "BXC Solar Ghana", ticker: "BXC", score: 88, signal: "Bullish", cap: "$1.1B", change: "+5.6%", role: "Solar" },
      { name: "Energy Access Fund", ticker: "EAF", score: 80, signal: "Bullish", cap: "$440M", change: "+2.2%", role: "Finance" },
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
    subSectors: [{ name: "Primary Care" }, { name: "Supply Chain" }, { name: "Digital Health" }, { name: "Diagnostics" }],
    keyPlayers: [
      { name: "Tobinco Pharma", ticker: "TBP", score: 83, signal: "Bullish", cap: "$620M", change: "+3.8%", role: "Pharma" },
      { name: "mPharma Dist.", ticker: "MPD", score: 79, signal: "Bullish", cap: "$340M", change: "+2.1%", role: "Distribution" },
      { name: "NHIA Digital", ticker: "NHD", score: 74, signal: "Watch", cap: "$180M", change: "+0.6%", role: "InsurTech" },
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
      { name: "Ghana Highways Auth.", ticker: "GHA", score: 82, signal: "Bullish", cap: "$2.4B", change: "+2.1%", role: "Roads" },
      { name: "Ghana Water Co.", ticker: "GWC", score: 76, signal: "Watch", cap: "$1.1B", change: "+0.8%", role: "Water" },
      { name: "Huawei Ghana", ticker: "HWG", score: 84, signal: "Bullish", cap: "$3.2B", change: "+4.5%", role: "Digital" },
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
      { name: "University of Ghana", ticker: "UOG", score: 85, signal: "Bullish", cap: "$890M", change: "+1.4%", role: "Higher Ed" },
      { name: "Eneza Education", ticker: "ENZ", score: 80, signal: "Bullish", cap: "$210M", change: "+5.1%", role: "EdTech" },
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
      { name: "Regimanuel Gray", ticker: "RGG", score: 82, signal: "Bullish", cap: "$560M", change: "+3.2%", role: "Developer" },
      { name: "Ghana Home Loans", ticker: "GHL", score: 77, signal: "Bullish", cap: "$320M", change: "+2.0%", role: "Mortgage" },
      { name: "Devtraco Plus", ticker: "DVT", score: 74, signal: "Watch", cap: "$410M", change: "+0.7%", role: "Developer" },
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
      { name: "Accra Brewery Ltd", ticker: "ABL", score: 81, signal: "Bullish", cap: "$740M", change: "+2.8%", role: "Beverages" },
      { name: "Kasapreko Co.", ticker: "KAS", score: 78, signal: "Bullish", cap: "$480M", change: "+3.6%", role: "FMCG" },
      { name: "Poly Products", ticker: "PPG", score: 69, signal: "Watch", cap: "$190M", change: "-0.5%", role: "Packaging" },
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
      { name: "Ghana Ports & Harbours", ticker: "GPH", score: 84, signal: "Bullish", cap: "$1.8B", change: "+3.1%", role: "Ports" },
      { name: "Freight In Time", ticker: "FIT", score: 76, signal: "Watch", cap: "$240M", change: "+1.2%", role: "Logistics" },
      { name: "Liqo App", ticker: "LQO", score: 72, signal: "Bullish", cap: "$85M", change: "+7.4%", role: "Last-Mile" },
    ],
    activity: [
      { h: "Tema Port Expansion: $1.5B Phase 3", amt: "$1.5B", sig: "Bullish", date: "Mar 2026", cat: "Expansion" },
      { h: "E-Freight System Live at All Border Posts", amt: "+Policy", sig: "Bullish", date: "Feb 2026", cat: "Digital" },
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
      { name: "Kempinski Gold Coast", ticker: "KGC", score: 80, signal: "Bullish", cap: "$420M", change: "+4.2%", role: "Hospitality" },
      { name: "Ghana Tourism Auth.", ticker: "GTA", score: 74, signal: "Bullish", cap: "$180M", change: "+2.8%", role: "Authority" },
      { name: "Accra City Hotel", ticker: "ACH", score: 68, signal: "Watch", cap: "$95M", change: "-1.1%", role: "Hotel" },
    ],
    activity: [
      { h: "Year of Return II Drives 1.2M Arrivals", amt: "1.2M", sig: "Bullish", date: "Feb 2026", cat: "Tourism" },
      { h: "$500M Tourism Infrastructure Fund Approved", amt: "$500M", sig: "Bullish", date: "Mar 2026", cat: "Finance" },
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
      { name: "EIB Network", ticker: "EIB", score: 78, signal: "Bullish", cap: "$210M", change: "+5.8%", role: "Media" },
      { name: "Mediawan Africa", ticker: "MWA", score: 74, signal: "Bullish", cap: "$340M", change: "+3.3%", role: "Film" },
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

export const TABS = ["Overview", "Analyze", "Topics", "Signals", "Key Players", "Competitors"];

export const sigCol = (s: string) => (s === "Bullish" ? C.green : s === "Watch" ? C.yellow : C.red);
export const sigBg = (s: string) => (s === "Bullish" ? "#DCFCE7" : s === "Watch" ? "#FEF9C3" : "#FEE2E2");
export const scoreColor = (n: number) => (n >= 75 ? C.green : n >= 50 ? C.orange : n >= 25 ? C.blue : C.red);
export const pal = () => GREY;

function buildItems(): WatchlistItem[] {
  const items: WatchlistItem[] = [];
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

export const ALL = buildItems();

// ─── Mobile color tokens ──────────────────────────────────────────────
export const MB = {
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
export const mCard = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: MB.card,
  borderRadius: 16,
  border: `1px solid ${MB.border}`,
  overflow: "hidden" as const,
  ...extra,
});

export const mLabel: React.CSSProperties = {
  fontSize: 9,
  fontWeight: 700,
  color: MB.faint,
  letterSpacing: "1.2px",
  textTransform: "uppercase" as const,
  fontFamily: "Inter,sans-serif",
};
