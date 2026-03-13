// ============================================================================
// BRIDGE PBC — Sector Data Types
// Shared TypeScript interfaces for all sector page data.
// ============================================================================

export interface KeyStat {
  value: string;
  label: string;
  detail: string;
}

export interface PainPoint {
  title: string;
  description: string;
  quantification: string;
}

export interface Solution {
  tier: 1 | 2 | 3;
  name: string;
  description: string;
  capital: string;
  score: number;
  impact: string;
  model: string;
}

export interface StrengthRating {
  name: string;
  rating: number;
}

export interface Competitor {
  name: string;
  focus: string;
  gap: string;
  year: string;
  funding: string;
  priority: "High" | "Medium" | "Low";
  marketShare: string;
  coverage: string;
  employees: string;
  strengths: StrengthRating[];
  gaps: string[];
  bridgeOpportunity: string;
  partnershipType: "Collaborate" | "Parallel" | "Monitor";
  synergyAreas: string[];
}

export interface CrossSectorConnection {
  sectorId: number;
  name: string;
  connection: string;
  multiplier: string;
  synergies: string[];
  bridgeVentures: string[];
  impact: string;
}

export interface ValueChainStage {
  stage: string;
  stat: string;
  statDetail: string;
  description: string;
  insight: string;
  ventures: string[];
  icon: string;
}

export interface Policy {
  policy: string;
  body: string;
  allocation: string;
  category: "funding" | "tax" | "infrastructure" | "partnerships";
  alignment: string;
  bridgeRole: string;
  bridgeVentures: string[];
  pillars: string[];
}

export interface SectorData {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  categoryColor: string;

  heroTitleBold: string;
  heroTitleRest: string;
  problemHeadline: string;

  capitalRange: string;
  ventures: number;
  jobsImpact: string;
  gdpContribution: string;

  problemSubheadline: string;

  keyStats: KeyStat[];
  painPoints: PainPoint[];
  solutions: Solution[];
  competitors: Competitor[];
  crossSector: CrossSectorConnection[];
  valueChain: ValueChainStage[];
  policies: Policy[];
}
