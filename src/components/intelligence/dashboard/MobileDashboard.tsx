import { useState } from "react";
import { M } from "./constants";
import type { Sector } from "./constants";
import { COMPANIES } from "./data";
import DashMobileSectorHeader from "./DashMobileSectorHeader";
import MobileDashOverview from "./MobileDashOverview";
import MobileDashVentures from "./MobileDashVentures";
import MobileDashSignals from "./MobileDashSignals";
import MobileDashCompanies from "./MobileDashCompanies";
import MobileDashAnalytics from "./MobileDashAnalytics";
import MobileDashBottomNav from "./MobileDashBottomNav";

export interface MobileDashboardProps {
  s: Sector;
  setS: (s: Sector) => void;
}

export default function MobileDashboard({ s, setS }: MobileDashboardProps) {
  const [dashSub, setDashSub] = useState("overview");
  const [notif, setNotif] = useState(false);
  const [pressedTab, setPressedTab] = useState<string | null>(null);
  const Icon = s.icon;
  const companies = COMPANIES[s.id] || COMPANIES.financial;
  const DASH_SUBS = [
    { id: "overview", label: "Overview" },
    { id: "ventures", label: "Ventures" },
    { id: "signals", label: "Signals" },
    { id: "companies", label: "Companies" },
    { id: "analytics", label: "Analytics" },
  ];
  const ANALYTICS_SUBS = [
    { id: "kpis", label: "KPIs" },
    { id: "performance", label: "Performance" },
    { id: "activity", label: "Activity" },
    { id: "companies", label: "Companies" },
    { id: "map", label: "Map" },
  ];
  /* ── Bar chart data for engagement ── */
  const barData = Array.from({ length: 24 }, (_, i) => Math.floor(20 + Math.random() * 80));
  const maxBar = Math.max(...barData);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: M.bg,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`
      .mscroll::-webkit-scrollbar{display:none}
      .mscroll{-ms-overflow-style:none;scrollbar-width:none}
    `}</style>

      {/* ═══ ACTIVE SECTOR STICKY HEADER ═══ */}
      <DashMobileSectorHeader s={s} setS={setS} />

      {/* ═══ SCROLLABLE CONTENT ═══ */}
      <div className="mscroll" style={{ flex: 1, overflowY: "auto", padding: "10px 12px 80px" }}>
        {/* ─ DASHBOARD / OVERVIEW ─ */}
        {dashSub === "overview" && (
          <MobileDashOverview s={s} setS={setS} barData={barData} maxBar={maxBar} />
        )}

        {/* ─ DASHBOARD / VENTURES ─ */}
        {dashSub === "ventures" && (
          <MobileDashVentures s={s} />
        )}

        {/* ─ DASHBOARD / SIGNALS ─ */}
        {dashSub === "signals" && (
          <MobileDashSignals s={s} />
        )}

        {/* ─ DASHBOARD / COMPANIES ─ */}
        {dashSub === "companies" && (
          <MobileDashCompanies s={s} companies={companies} />
        )}

        {/* ─ DASHBOARD / ANALYTICS ─ */}
        {dashSub === "analytics" && (
          <MobileDashAnalytics s={s} />
        )}
      </div>

      {/* ═══ BOTTOM NAV — 5 sections ═══ */}
      <MobileDashBottomNav
        dashSub={dashSub}
        setDashSub={setDashSub}
        pressedTab={pressedTab}
        setPressedTab={setPressedTab}
      />
    </div>
  );
}
