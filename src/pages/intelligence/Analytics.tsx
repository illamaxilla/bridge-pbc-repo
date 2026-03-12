import { useState } from "react";
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
import { WorldMap } from "@/components/intelligence/analytics/WorldMap";
import { MobileApp } from "@/components/intelligence/mobile/MobileAnalytics";

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
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: C.bg,
        fontFamily: "'DM Sans',sans-serif",
      }}
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
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0, width: 0 }}>
        <TopNav s={s} syncing={syncing} setSyncing={setSyncing} />
        <PageHeader s={s} period={period} setPeriod={setPeriod} syncing={syncing} setSyncing={setSyncing} />
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "14px 16px", minWidth: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", minWidth: 0 }}>
            <div
              style={{
                gridColumn: "1 / -1",
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 12,
                minHeight: 148,
              }}
            >
              <SparkCard
                label="Total Market Cap"
                value={`$${capTotal.toFixed(1)}B`}
                sublabel="Sector aggregate"
                iconBg={C.accentBg}
                iconEl={<span style={{ fontSize: 16, fontWeight: 800, color: C.primary }}>$</span>}
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
            <div style={{ minWidth: 0, minHeight: 320 }}>
              <BubbleChart s={s} />
            </div>
            <div style={{ minWidth: 0, minHeight: 320 }}>
              <DotMatrixChart s={s} />
            </div>
            <div style={{ minWidth: 0, minHeight: 286 }}>
              <ActivityHeatmap s={s} />
            </div>
            <div style={{ minWidth: 0, minHeight: 286 }}>
              <SourceBreakdown s={s} />
            </div>
            <div style={{ minWidth: 0, minHeight: 330 }}>
              <CompaniesTable s={s} />
            </div>
            <div style={{ minWidth: 0, minHeight: 330 }}>
              <EngagementMetrics s={s} />
            </div>
            <div style={{ gridColumn: "1 / -1", minWidth: 0, minHeight: 340 }}>
              <WorldMap s={s} />
            </div>
            <div style={{ gridColumn: "1 / -1", height: 8 }} />
          </div>
        </div>
        <div
          style={{
            height: 36,
            flexShrink: 0,
            background: "#111E17",
            borderTop: "1px solid #1A2E22",
            display: "flex",
            alignItems: "center",
            padding: "0 22px",
            gap: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8D935" }} />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: ".5px",
                fontFamily: "Inter,sans-serif",
              }}
            >
              BRIDGE Intelligence
            </span>
          </div>
          {["12 Sectors", "174 Ventures", `Active: ${s.full}`, "Data: Mar 2026"].map((label, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.18)",
                  marginRight: 10,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                ·
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  marginRight: 10,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {label}
              </span>
            </span>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "Inter,sans-serif" }}>
              © 2026 BRIDGE PBC
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 8px",
                borderRadius: 4,
                background: "rgba(184,217,53,0.08)",
                border: "1px solid rgba(184,217,53,0.15)",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#B8D935",
                  boxShadow: "0 0 5px #B8D935",
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#B8D935",
                  letterSpacing: ".8px",
                  textTransform: "uppercase",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
