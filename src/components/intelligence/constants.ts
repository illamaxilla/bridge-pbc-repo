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
  sidebar: "#0D1F12",
  sideAct: "rgba(184,217,53,0.1)",
  sideHov: "#1A2E1F",
  green: "#16A34A",
  red: "#DC2626",
  yellow: "#CA8A04",
  orange: "#F59E0B",
  tealAlt: "#10B981",
};

export const M = {
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

import React from "react";
import { sectorSvgIcons } from "./sectorIcons";

export interface Sector {
  id: number;
  svgIcon: (c: string, s?: number) => React.ReactNode;
  short: string;
  full: string;
  score: number;
  ventures: number;
  cap: string;
}

export const SECTORS: Sector[] = [
  { id: 1, svgIcon: sectorSvgIcons[5], short: "Agriculture", full: "Agriculture & Value Chains", score: 90, ventures: 18, cap: "$12\u201322M" },
  { id: 2, svgIcon: sectorSvgIcons[1], short: "Financial Inclusion", full: "Financial Inclusion & Economic Security", score: 91, ventures: 18, cap: "$10\u201320M" },
  { id: 3, svgIcon: sectorSvgIcons[3], short: "Technology", full: "Technology & Innovation", score: 89, ventures: 15, cap: "$8\u201315M" },
  { id: 4, svgIcon: sectorSvgIcons[9], short: "Energy", full: "Energy & Renewable Resources", score: 88, ventures: 14, cap: "$12\u201322M" },
  { id: 5, svgIcon: sectorSvgIcons[0], short: "Infrastructure", full: "Infrastructure & Basic Services", score: 87, ventures: 15, cap: "$8\u201315M" },
  { id: 6, svgIcon: sectorSvgIcons[4], short: "Education", full: "Education & Skills", score: 85, ventures: 15, cap: "$16.5\u201333.5M" },
  { id: 7, svgIcon: sectorSvgIcons[2], short: "Health Systems", full: "Health Systems & Wellbeing", score: 83, ventures: 15, cap: "$8\u201316M" },
  { id: 8, svgIcon: sectorSvgIcons[7], short: "Housing", full: "Housing & Real Estate", score: 82, ventures: 11, cap: "$15\u201325M" },
  { id: 9, svgIcon: sectorSvgIcons[10], short: "Manufacturing", full: "Manufacturing & Light Industry", score: 81, ventures: 14, cap: "$15\u201330M" },
  { id: 10, svgIcon: sectorSvgIcons[11], short: "Transportation", full: "Transportation & Logistics", score: 79, ventures: 14, cap: "$10\u201322M" },
  { id: 11, svgIcon: sectorSvgIcons[8], short: "Tourism", full: "Tourism & Hospitality", score: 76, ventures: 13, cap: "$10\u201318M" },
  { id: 12, svgIcon: sectorSvgIcons[6], short: "Creative Industries", full: "Sports, Entertainment & Creative", score: 78, ventures: 14, cap: "$10\u201320.5M" },
];

export const sigCol = (s: string) => (s === "Bullish" ? C.green : s === "Bearish" ? C.red : C.yellow);
export const sigBg = (s: string) => (s === "Bullish" ? "#DCFCE7" : s === "Bearish" ? "#FEE2E2" : "#FEF9C3");

export const heatVal = (day: number, hour: number, seed: number) =>
  Math.max(
    5,
    Math.min(
      98,
      Math.round(50 + Math.sin(day * 2.3 + hour * 1.7 + seed * 0.1) * 30 + Math.sin(day * 0.9 + hour * 2.1) * 18),
    ),
  );

export const heatColor = (val: number, col: string) =>
  val < 20 ? "#F3F4F6" : val < 40 ? `${col}30` : val < 65 ? `${col}70` : val < 82 ? `${col}BB` : col;
