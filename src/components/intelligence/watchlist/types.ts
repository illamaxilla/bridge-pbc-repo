import React from "react";

export interface SubSector {
  name: string;
}

export interface KeyPlayer {
  name: string;
  ticker: string;
  score: number;
  signal: string;
  cap: string;
  change: string;
  role: string;
}

export interface ActivityItem {
  h: string;
  amt: string;
  sig: string;
  date: string;
  cat: string;
}

export interface WatchlistSector {
  id: string;
  icon: React.ComponentType<any>;
  short: string;
  full: string;
  score: number;
  capLow: number;
  capHigh: number;
  subSectors: SubSector[];
  keyPlayers: KeyPlayer[];
  activity: ActivityItem[];
  svgIcon?: (c: string, s?: number) => React.ReactNode;
}

export interface WatchlistItem {
  id: string;
  type: string;
  name: string;
  sector: string;
  subSector: string;
  category: string;
  score: number;
  signal: string;
  sectorObj: WatchlistSector;
  ticker?: string;
  cap?: string;
  change?: string;
}
