import { C, SECTORS, type Sector } from "./constants";

export function genBarData(s: Sector, tab: string, filter: string) {
  const days =
    filter === "7D"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : filter === "30D"
        ? ["Wk1", "Wk2", "Wk3", "Wk4"]
        : ["Jan", "Feb", "Mar"];
  return days.map((day, i) => ({
    day,
    primary: Math.round(s.score * (0.75 + Math.sin(i * 1.3 + s.score * 0.04) * 0.15 + i * 0.025)),
    secondary: Math.round(s.score * (0.45 + Math.sin(i * 0.9) * 0.1 + i * 0.015)),
  }));
}

export function genMonthlyData(s: Sector) {
  return ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"].map((month, i) => {
    const base = ((s.capLow + s.capHigh) / 2) * 100;
    const growth = Math.round(base * (1.0 + Math.sin(i * 0.8) * 0.2 + i * 0.1));
    const expenses = Math.round(growth * (0.28 + Math.sin(i * 0.5) * 0.06));
    return { month, growth, expenses, net: growth - expenses };
  });
}

export interface TableRow {
  id: string;
  sector: string;
  sectorId: string;
  date: string;
  status: string;
  source: string;
  category: string;
  tags: string[];
  signal: string;
  value: string;
}

export function genTableRows(s: Sector): TableRow[] {
  const cats = ["Earnings", "Revenue", "CapEx", "M&A", "Policy", "Signal", "Supply Chain", "Investment"];
  const stats = ["-", "Active", "Monitoring", "Closed"];
  const rows: TableRow[] = [];
  s.activity.forEach((a, i) =>
    rows.push({
      id: `${s.id}-${i}`,
      sector: s.short,
      sectorId: s.id,
      date: a.date,
      status: stats[i % stats.length],
      source: a.h.length > 32 ? a.h.substring(0, 32) + "..." : a.h,
      category: cats[i % cats.length],
      tags: s.subSectors.slice(0, i % 3 === 0 ? 2 : 1).map((ss) => ss.name.split(" ")[0]),
      signal: a.sig,
      value: a.amt,
    }),
  );
  SECTORS.filter((sec) => sec.id !== s.id)
    .slice(0, 9)
    .forEach((sec, i) => {
      const act = sec.activity[i % sec.activity.length];
      if (act)
        rows.push({
          id: `x-${sec.id}-${i}`,
          sector: sec.short,
          sectorId: sec.id,
          date: act.date,
          status: stats[(i + 1) % stats.length],
          source: act.h.length > 32 ? act.h.substring(0, 32) + "..." : act.h,
          category: cats[(i + 3) % cats.length],
          tags: [sec.subSectors[0]?.name.split(" ")[0] || "General"],
          signal: act.sig,
          value: act.amt,
        });
    });
  return rows;
}

export function getTabMetrics(s: Sector, tab: string) {
  const b = s.activity.filter((a) => a.sig === "Bullish").length;
  const rank = [...SECTORS].sort((a, b) => b.score - a.score).findIndex((x) => x.id === s.id) + 1;
  const m: Record<string, { p: { l: string; v: string; t: string; up: boolean }; s: { l: string; v: string; t: string; up: boolean } }> = {
    "sector-performance": {
      p: { l: "Avg. Growth Rate", v: `${Math.round(s.score * 0.92)}%`, t: "+24%", up: true },
      s: { l: "Avg. Volatility", v: `${Math.round(s.score * 0.42)}%`, t: "-10%", up: false },
    },
    "market-analysis": {
      p: { l: "Bullish Signals", v: `${b * 21}`, t: "+18%", up: true },
      s: { l: "Bear Signals", v: `${(s.activity.length - b) * 9}`, t: "-5%", up: false },
    },
    "sub-sector-breakdown": {
      p: { l: s.subSectors[0]?.name, v: `${s.subSectors[0]?.pct}%`, t: "+8%", up: true },
      s: { l: s.subSectors[1]?.name, v: `${s.subSectors[1]?.pct}%`, t: "+3%", up: true },
    },
    financials: {
      p: { l: "Total Revenue", v: `$${s.capHigh}M`, t: "+15%", up: true },
      s: { l: "Operating Costs", v: `$${Math.round(s.capLow * 0.4)}M`, t: "+2%", up: false },
    },
    "growth-tracking": {
      p: { l: "Goal Completion", v: `${Math.round(s.score * 0.88)}%`, t: "+12%", up: true },
      s: { l: "Target Gap", v: `${100 - Math.round(s.score * 0.88)}%`, t: "-4%", up: false },
    },
    "comparative-analysis": {
      p: { l: "Sector Rank", v: `#${rank}`, t: "of 12", up: true },
      s: { l: "vs Benchmark", v: `+${Math.round(s.score - 80)}pts`, t: "+5%", up: true },
    },
    "monthly-summary": {
      p: { l: "Month High", v: `${Math.round(s.score * 1.08)}`, t: "+11%", up: true },
      s: { l: "Month Low", v: `${Math.round(s.score * 0.82)}`, t: "-6%", up: false },
    },
    "signal-tracker": {
      p: { l: "Total Signals", v: `${s.activity.length * 18}`, t: "+14%", up: true },
      s: { l: "Active Alerts", v: `${b * 7}`, t: "+9%", up: true },
    },
  };
  return m[tab] || m["sector-performance"];
}

export function getTabStats(s: Sector, tab: string) {
  const b = s.activity.filter((a) => a.sig === "Bullish").length;
  const rank = [...SECTORS].sort((a, bv) => bv.score - a.score).findIndex((x) => x.id === s.id) + 1;
  const m: Record<string, { v: string; l: string }[]> = {
    "sector-performance": [
      { v: `${s.activity.length * 18}`, l: "Signals Sent" },
      { v: `${Math.round(s.score * 0.42)}%`, l: "Volatility Rate" },
      { v: `${Math.round(s.score * 0.08)}%`, l: "Correction Rate" },
      { v: `${Math.round(s.score * 0.9)}%`, l: "Health Score" },
    ],
    "market-analysis": [
      { v: `${b * 21}`, l: "Bull Signals" },
      { v: `${(s.activity.length - b) * 9}`, l: "Bear Signals" },
      { v: `${(s.activity.length - b) * 5}`, l: "Neutral" },
      { v: `${s.score}%`, l: "Confidence" },
    ],
    "sub-sector-breakdown": s.subSectors.slice(0, 4).map((ss) => ({ v: `${ss.pct}%`, l: ss.name })),
    financials: [
      { v: `$${s.capHigh}M`, l: "Total Revenue" },
      { v: `$${Math.round(s.capLow * 0.4)}M`, l: "Expenses" },
      { v: `$${s.capHigh - Math.round(s.capLow * 0.4)}M`, l: "Net Income" },
      { v: `${s.irrLow}-${s.irrHigh}%`, l: "IRR Range" },
    ],
    "growth-tracking": [
      { v: `${Math.round(s.score * 0.88)}%`, l: "Goal Completion" },
      { v: `$${s.capLow}M`, l: "Capital Raised" },
      { v: `${s.irrHigh}%`, l: "Peak IRR" },
      { v: `${s.totalV}`, l: "Active Ventures" },
    ],
    "comparative-analysis": [
      { v: `#${rank}`, l: "Sector Rank" },
      { v: `${s.score}`, l: "BRIDGE Score" },
      { v: `+${Math.round(s.score - 80)}pts`, l: "vs Benchmark" },
      { v: `${s.totalV}`, l: "Total Ventures" },
    ],
    "monthly-summary": [
      { v: `${Math.round(s.score * 1.08)}`, l: "Month High" },
      { v: `${Math.round(s.score * 0.82)}`, l: "Month Low" },
      { v: `${s.score}`, l: "Current Score" },
      { v: `+${Math.round((s.score * 1.08 - s.score * 0.82) / 2)}`, l: "Avg Change" },
    ],
    "signal-tracker": [
      { v: `${s.activity.length * 18}`, l: "Total Signals" },
      { v: `${b * 7}`, l: "Active Alerts" },
      { v: `${(s.activity.length - b) * 4}`, l: "Monitoring" },
      { v: `${Math.round((b / s.activity.length) * 100)}%`, l: "Bullish Rate" },
    ],
  };
  return m[tab] || m["sector-performance"];
}
