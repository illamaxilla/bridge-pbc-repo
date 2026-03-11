import React from "react";

export type IconFn = (color: string) => React.ReactNode;

// ─── Sector routes (key-based, used by footer sector grid) ──────────────────
export const SECTOR_ROUTES: Record<string, string> = {
  infra: "/sectors/infrastructure",
  fin: "/sectors/financial",
  health: "/sectors/health",
  tech: "/sectors/technology",
  edu: "/sectors/education",
  agri: "/sectors/agriculture",
  creative: "/sectors/sports",
  housing: "/sectors/housing",
  tourism: "/sectors/tourism",
  energy: "/sectors/energy",
  mfg: "/sectors/manufacturing",
  transport: "/sectors/transport",
};

// ─── Footer sector icons ────────────────────────────────────────────────────
export const FOOTER_SECTOR_ICONS: { key: string; label: string; icon: IconFn }[] = [
  {
    key: "infra",
    label: "Infrastructure & Basic Services",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }),
        React.createElement("path", { d: "M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" }),
      ),
  },
  {
    key: "fin",
    label: "Financial Inclusion",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M21 12V7H5a2 2 0 0 1 0-4h14v4" }),
        React.createElement("path", { d: "M3 5v14a2 2 0 0 0 2 2h16v-5" }),
        React.createElement("path", { d: "M18 12a2 2 0 0 0 0 4h4v-4Z" }),
      ),
  },
  {
    key: "health",
    label: "Health Systems",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" }),
      ),
  },
  {
    key: "tech",
    label: "Technology & Innovation",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }),
        React.createElement("rect", { x: "9", y: "9", width: "6", height: "6" }),
        React.createElement("path", { d: "M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" }),
      ),
  },
  {
    key: "edu",
    label: "Education & Skills",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" }),
        React.createElement("path", { d: "M22 10v6" }),
        React.createElement("path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5" }),
      ),
  },
  {
    key: "agri",
    label: "Agriculture & Value Chains",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M7 20h10" }),
        React.createElement("path", { d: "M10 20c5.5-2.5.8-6.4 3-10" }),
        React.createElement("path", { d: "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" }),
        React.createElement("path", { d: "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" }),
      ),
  },
  {
    key: "creative",
    label: "Sports & Creative",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" }),
        React.createElement("circle", { cx: "12", cy: "13", r: "3" }),
      ),
  },
  {
    key: "housing",
    label: "Housing & Real Estate",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
        React.createElement("polyline", { points: "9 22 9 12 15 12 15 22" }),
      ),
  },
  {
    key: "tourism",
    label: "Tourism & Hospitality",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" }),
        React.createElement("path", { d: "M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" }),
        React.createElement("path", { d: "M10 20h4" }),
        React.createElement("circle", { cx: "16", cy: "20", r: "2" }),
        React.createElement("circle", { cx: "8", cy: "20", r: "2" }),
      ),
  },
  {
    key: "energy",
    label: "Energy & Renewables",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" }),
        React.createElement("path", { d: "M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" }),
        React.createElement("path", { d: "m11 7-3 5h4l-3 5" }),
        React.createElement("line", { x1: "22", x2: "22", y1: "11", y2: "13" }),
      ),
  },
  {
    key: "mfg",
    label: "Manufacturing",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" }),
        React.createElement("path", { d: "M17 18h1M12 18h1M7 18h1" }),
      ),
  },
  {
    key: "transport",
    label: "Transportation",
    icon: (c) =>
      React.createElement(
        "svg",
        { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" }),
        React.createElement("path", { d: "M15 18H9" }),
        React.createElement("path", { d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" }),
        React.createElement("circle", { cx: "17", cy: "18", r: "2" }),
        React.createElement("circle", { cx: "7", cy: "18", r: "2" }),
      ),
  },
];

// ─── Social links ───────────────────────────────────────────────────────────
export const SOCIAL_HREFS = [
  "https://www.linkedin.com/company/bridge-pbc",
  "https://twitter.com/bridgepbc",
  "https://www.facebook.com/bridgepbc",
];

// ─── Social icons ───────────────────────────────────────────────────────────
export const SOCIAL_ICONS = [
  React.createElement(
    "svg",
    { key: "li", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }),
    React.createElement("rect", { x: "2", y: "9", width: "4", height: "12" }),
    React.createElement("circle", { cx: "4", cy: "4", r: "2" }),
  ),
  React.createElement(
    "svg",
    { key: "tw", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }),
  ),
  React.createElement(
    "svg",
    { key: "fb", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }),
  ),
];
