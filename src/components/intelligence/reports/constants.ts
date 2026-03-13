/**
 * Reports-specific constants.
 * These differ slightly from the shared intelligence constants (e.g. sidebar colors),
 * so they are kept separate to preserve exact visual behavior.
 */

import { sectorSvgIcons } from "../sectorIcons";

export { sectorSvgIcons };

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

export interface SubSector {
  name: string;
  pct: number;
  color: string;
}

export interface ActivityItem {
  h: string;
  amt: string;
  sig: string;
  date: string;
}

export interface OpportunityItem {
  name: string;
  cap: string;
  irr: string;
  risk: string;
}

export interface Sector {
  id: string;
  svgIcon: (c: string, s?: number) => JSX.Element;
  short: string;
  full: string;
  score: number;
  capLow: number;
  capHigh: number;
  irrLow: number;
  irrHigh: number;
  totalV: number;
  subSectors: SubSector[];
  t1: OpportunityItem[];
  t2: OpportunityItem[];
  t3: OpportunityItem[];
  activity: ActivityItem[];
  risk?: string;
  timeline?: string;
}

export const SECTORS: Sector[] = [
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

export const TABS = [
  { id: "sector-performance", label: "Sector Performance" },
  { id: "market-analysis", label: "Market Analysis" },
  { id: "sub-sector-breakdown", label: "Sub-sector" },
  { id: "financials", label: "Financials" },
  { id: "growth-tracking", label: "Growth" },
  { id: "comparative-analysis", label: "Comparative" },
  { id: "monthly-summary", label: "Monthly" },
  { id: "signal-tracker", label: "Signals" },
];

export const sigCol = (s: string) => (s === "Bullish" ? C.green : s === "Bearish" ? C.red : C.yellow);
export const sigBg = (s: string) => (s === "Bullish" ? "#DCFCE7" : s === "Bearish" ? "#FEE2E2" : "#FEF9C3");
