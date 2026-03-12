import React, { useState } from "react";
import { SECTORS, M } from "./data";
import { MobileHeader, MobileBottomNav } from "./MobileComponents";

// Re-export all page components from their respective modules
export { OverviewHero, OverviewTab, OverviewScoreBreakdown, OverviewThesis, OverviewRisks } from "./MobileOverviewPage";
export { AnalyticsKPIs, AnalyticsPerformance, AnalyticsActivity, AnalyticsCompanies, AnalyticsMap, AnalyticsVentures, AnalyticsTab } from "./MobileAnalyticsPage";
export { WatchTab, ResourcesTab, DashboardTab, SignalsTab, OutlookTab } from "./MobileDashboardPages";
export { VenturesOverviewTab, CapitalTab } from "./MobileVenturesPage";

// Import components needed by MobileDashboard
import { OverviewTab } from "./MobileOverviewPage";
import { SignalsTab } from "./MobileDashboardPages";
import { VenturesOverviewTab, CapitalTab } from "./MobileVenturesPage";
import { OutlookTab } from "./MobileDashboardPages";

export function MobileDashboard() {
  const [s, setS] = useState(SECTORS[0]);
  const [page, setPage] = useState("overview");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: M.bg,
        fontFamily: "'DM Sans',sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}::-webkit-scrollbar{display:none;}input::placeholder{color:rgba(255,255,255,0.2);}@keyframes mSlideUp{from{transform:translateY(100%);opacity:0;}to{transform:translateY(0);opacity:1;}}.mDrawer{animation:mSlideUp 0.25s ease;}`}</style>
      <MobileHeader s={s} setS={setS} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {page === "overview" && <OverviewTab s={s} />}
        {page === "signals" && <SignalsTab s={s} />}
        {page === "ventures" && <VenturesOverviewTab s={s} />}
        {page === "capital" && <CapitalTab s={s} />}
        {page === "outlook" && <OutlookTab s={s} />}
      </div>
      <MobileBottomNav page={page} setPage={setPage} />
    </div>
  );
}
