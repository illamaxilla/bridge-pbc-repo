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
import { sectorSvgIcons } from "./sectorIcons";

export interface SubSector {
  name: string;
  pct: number;
}

export interface KeyPlayer {
  name: string;
  ticker: string;
  score: number;
  cap: string;
  capNum: number;
  change: string;
}

export interface Activity {
  h: string;
  sig: string;
  date: string;
  cat: string;
}

export interface Sector {
  id: string;
  svgIcon: (c: string, s?: number) => JSX.Element;
  icon: typeof Blocks;
  short: string;
  full: string;
  score: number;
  capLow: number;
  capHigh: number;
  irrHigh: number;
  color: string;
  subSectors: SubSector[];
  keyPlayers: KeyPlayer[];
  activity: Activity[];
}

export const SECTORS: Sector[] = [
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
