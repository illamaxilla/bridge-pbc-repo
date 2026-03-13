import { lazy, Suspense, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Database, TrendingUp, Target } from "lucide-react";
import { C } from "@/components/intelligence/constants";
import { SECTORS } from "@/components/intelligence/sectorData";
import { Sidebar } from "@/components/intelligence/Sidebar";
import { TopNav } from "@/components/intelligence/TopNav";
import { PageHeader } from "@/components/intelligence/PageHeader";
import { SparkCard } from "@/components/intelligence/analytics/SparkCard";
import { BubbleChart } from "@/components/intelligence/analytics/BubbleChart";
import { DotMatrixChart } from "@/components/intelligence/analytics/DotMatrixChart";
import { ActivityHeatmap } from "@/components/intelligence/analytics/ActivityHeatmap";
import { SourceBreakdown } from "@/components/intelligence/analytics/SourceBreakdown";
import { CompaniesTable } from "@/components/intelligence/analytics/CompaniesTable";
import { EngagementMetrics } from "@/components/intelligence/analytics/EngagementMetrics";
import { MobileApp } from "@/components/intelligence/mobile/MobileAnalytics";

// Lazy-load WorldMap to defer loading the 5,000+ line worldMapData module
const WorldMap = lazy(() =>
  import("@/components/intelligence/analytics/WorldMap").then((m) => ({ default: m.WorldMap }))
);

export default function BridgeAnalyticsPage() {
  const isMobile = useIsMobile();
  const [s, setS] = useState(SECTORS[0]);
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("analytics");
  const [activeSector, setActiveSector] = useState(SECTORS[0]);
  const [period, setPeriod] = useState("Monthly");
  const [syncing, setSyncing] = useState(false);
  const capTotal = (s.capLow + s.capHigh) / 2;
  if (isMobile) return <MobileApp />;
  return (
    <div
      className="flex h-screen overflow-hidden font-['DM_Sans',sans-serif]"
      style={{ background: C.bg }}
    >
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-thumb{background:#E5E7EB;border-radius:4px;}.aspin{animation:spin 1s linear infinite}`}</style>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        onNavChange={setActivePage}
        activeSector={activeSector}
        setActiveSector={(sec) => {
          setActiveSector(sec);
          if (sec) setS(sec);
        }}
      />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 w-0">
        <TopNav s={s} syncing={syncing} setSyncing={setSyncing} />
        <PageHeader s={s} period={period} setPeriod={setPeriod} syncing={syncing} setSyncing={setSyncing} />
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-[14px_16px] min-w-0">
          <div className="grid grid-cols-2 gap-3 w-full min-w-0">
            <div className="col-span-full grid grid-cols-4 gap-3 min-h-[148px]">

              <SparkCard
                label="Total Market Cap"
                value={`$${capTotal.toFixed(1)}B`}
                sublabel="Sector aggregate"
                iconBg={C.accentBg}
                iconEl={<span className="text-base font-extrabold" style={{ color: C.primary }}>$</span>}
                s={s}
                trend="+5.1%"
              />
              <SparkCard
                label="Sub-sector Revenue"
                value={`$${((s.subSectors[0]?.pct / 100) * capTotal * 1.4).toFixed(2)}B`}
                sublabel="Leading sub-sector"
                iconEl={<Database size={16} color={C.teal} />}
                iconBg={`${C.teal}18`}
                s={s}
                trend="+3.8%"
              />
              <SparkCard
                label="IRR Potential"
                value={`${s.irrHigh}%`}
                sublabel="Target return ceiling"
                iconEl={<TrendingUp size={16} color={C.green} />}
                iconBg={"#DCFCE7"}
                s={s}
                trend="+2.4%"
              />
              <SparkCard
                label="BRIDGE Score"
                value={`${s.score}`}
                sublabel="Composite signal"
                iconEl={<Target size={16} color={s.color} />}
                iconBg={`${s.color}18`}
                s={s}
                trend="+1.2%"
              />
            </div>
            <div className="min-w-0 min-h-[320px]">
              <BubbleChart s={s} />
            </div>
            <div className="min-w-0 min-h-[320px]">
              <DotMatrixChart s={s} />
            </div>
            <div className="min-w-0 min-h-[286px]">
              <ActivityHeatmap s={s} />
            </div>
            <div className="min-w-0 min-h-[286px]">
              <SourceBreakdown s={s} />
            </div>
            <div className="min-w-0 min-h-[330px]">
              <CompaniesTable s={s} />
            </div>
            <div className="min-w-0 min-h-[330px]">
              <EngagementMetrics s={s} />
            </div>
            <div className="col-span-full min-w-0 min-h-[340px]">
              <Suspense fallback={<div className="flex items-center justify-center h-[340px] text-sm text-gray-400">Loading map…</div>}>
                <WorldMap s={s} />
              </Suspense>
            </div>
            <div className="col-span-full h-2" />
          </div>
        </div>
        <div className="h-9 shrink-0 bg-[#111E17] border-t border-[#1A2E22] flex items-center px-[22px]">
          <div className="flex items-center gap-1.5 mr-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B8D935]" />
            <span className="text-[10px] font-bold text-white/70 tracking-[0.5px] font-['Inter',sans-serif]">
              BRIDGE Intelligence
            </span>
          </div>
          {["12 Sectors", "174 Ventures", `Active: ${s.full}`, "Data: Mar 2026"].map((label, i) => (
            <span key={i} className="flex items-center">
              <span className="text-[10px] text-white/[0.18] mr-2.5 font-['Inter',sans-serif]">
                ·
              </span>
              <span className="text-[10px] text-white/[0.35] mr-2.5 font-['Inter',sans-serif]">
                {label}
              </span>
            </span>
          ))}
          <div className="ml-auto flex items-center gap-3.5">
            <span className="text-[10px] text-white/20 font-['Inter',sans-serif]">
              © 2026 BRIDGE PBC
            </span>
            <div className="flex items-center gap-[5px] py-[3px] px-2 rounded bg-[rgba(184,217,53,0.08)] border border-[rgba(184,217,53,0.15)]">
              <div className="w-[5px] h-[5px] rounded-full bg-[#B8D935] shadow-[0_0_5px_#B8D935]" />
              <span className="text-[9px] font-bold text-[#B8D935] tracking-[0.8px] uppercase font-['Inter',sans-serif]">
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
