import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  User,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  FileText,
  Download,
  Calendar,
  SlidersHorizontal,
  Plus,
  Printer,
} from "lucide-react";
import {
  C,
  SECTORS,
  TABS,
  sigCol,
  Sidebar,
  MetricsChartCard,
  DonutGoalCard,
  ComposedChartRow,
  TabPanel,
  ActivityTable,
  MobileDashboard,
} from "../../components/intelligence/reports";

export default function BridgeReportsPage() {
  const [s, setS] = useState(SECTORS[0]);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("sector-performance");
  const [chartFilter, setChartFilter] = useState("7D");
  const [syncing, setSyncing] = useState(false);
  const [overtimeView, setOvertimeView] = useState(false);
  const [tableSearch, setTableSearch] = useState("");
  const [tableSort, setTableSort] = useState({ col: "date", dir: "desc" });
  const [tablePage, setTablePage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [notif, setNotif] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1400);
  };
  useEffect(() => {
    setTablePage(1);
    setSelectedRows([]);
    setTableSearch("");
  }, [s.id, activeTab]);

  if (isMobile) return <MobileDashboard s={s} setS={setS} />;

  return (
    <div
      className="flex h-screen overflow-hidden font-['DM_Sans',sans-serif]"
      style={{ background: C.bg }}
    >
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-thumb{background:#E5E7EB;border-radius:4px;}`}</style>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activeSector={s} setActiveSector={setS} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Nav */}
        <div className="bg-white border-b border-[#E5E7EB] px-5 flex items-center gap-3 h-14 shrink-0 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm font-bold" style={{ color: C.dark }}>Reports</div>
              <div className="text-[10px] font-['Inter',sans-serif]" style={{ color: C.muted }}>
                {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
              </div>
            </div>
            <div className="w-px h-7" style={{ background: C.line }} />
            <div
              className="flex items-center gap-[5px] py-[3px] px-2.5 rounded-[7px]"
              style={{ background: C.accentBg, border: `1px solid ${C.accent}44` }}
            >
              {s.svgIcon(C.primary, 11)}
              <span className="text-[10px] font-bold font-['Inter',sans-serif]" style={{ color: C.primary }}>
                {s.short}
              </span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-[7px]">
            <div className="w-[380px] flex items-center gap-[7px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[9px] py-[7px] px-[11px]">
              <Search size={13} color={C.muted} />
              <input
                placeholder="Search reports, signals..."
                className="bg-transparent border-none outline-none text-xs w-full font-['Inter',sans-serif]"
                style={{ color: C.mid }}
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setNotif((o) => !o)}
                className="w-9 h-9 rounded-[9px] border border-[#E5E7EB] bg-white flex items-center justify-center cursor-pointer relative"
              >
                <Bell size={15} color={C.mid} />
                <div
                  className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full border-2 border-white"
                  style={{ background: C.red }}
                />
              </button>
              {notif && (
                <div className="absolute top-[44px] right-0 w-[280px] bg-white border border-[#E5E7EB] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-[99] overflow-hidden">
                  <div className="py-[11px] px-[14px] border-b border-[#E5E7EB] flex justify-between">
                    <span className="text-[13px] font-bold" style={{ color: C.dark }}>Alerts</span>
                    <span
                      className="text-[11px] cursor-pointer font-semibold"
                      style={{ color: C.accent }}
                      onClick={() => setNotif(false)}
                    >
                      Mark all read
                    </span>
                  </div>
                  {s.activity.slice(0, 3).map((a, i) => (
                    <div
                      key={i}
                      className="flex gap-[9px] py-2.5 px-[14px] border-b border-[#F3F4F6]"
                    >
                      <div
                        className="w-[7px] h-[7px] rounded-full mt-1 shrink-0"
                        style={{ background: sigCol(a.sig) }}
                      />
                      <div>
                        <div className="text-xs font-semibold leading-[1.3]" style={{ color: C.dark }}>{a.h}</div>
                        <div className="text-[10px] mt-0.5 font-['Inter',sans-serif]" style={{ color: C.muted }}>
                          {a.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleSync}
              className="w-9 h-9 rounded-[9px] border border-[#E5E7EB] bg-white flex items-center justify-center cursor-pointer"
            >
              <RefreshCw size={14} color={C.mid} className={syncing ? "spin" : ""} />
            </button>
            <div className="flex items-center gap-2 py-[5px] px-[11px] border border-[#E5E7EB] rounded-[9px] cursor-pointer bg-white">
              <div className="w-[27px] h-[27px] rounded-full bg-[rgba(184,217,53,0.2)] flex items-center justify-center shrink-0">
                <User size={13} color={C.primary} />
              </div>
              <div>
                <div className="text-xs font-bold leading-none" style={{ color: C.dark }}>Joseph A.</div>
                <div className="text-[10px] font-['Inter',sans-serif]" style={{ color: C.muted }}>Full Access</div>
              </div>
              <ChevronDown size={11} color={C.muted} />
            </div>
          </div>
        </div>

        {/* Page Header Bar */}
        <div className="bg-white border-b border-[#E5E7EB] py-2.5 px-5 shrink-0 flex items-center gap-2.5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: C.accentBg }}
            >
              <FileText size={15} color={C.primary} />
            </div>
            <div>
              <div className="text-[15px] font-bold" style={{ color: C.dark }}>Sector Reports</div>
              <div className="text-[10px] font-['Inter',sans-serif]" style={{ color: C.muted }}>
                Comprehensive analysis & intelligence
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-[7px]">
            <button
              className="flex items-center gap-[5px] py-1.5 px-3 border border-[#E5E7EB] rounded-lg bg-white text-[11px] cursor-pointer font-['Inter',sans-serif]"
              style={{ color: C.mid }}
            >
              <Calendar size={12} color={C.muted} />
              This Month
              <ChevronDown size={10} color={C.muted} />
            </button>
            <button
              className="flex items-center gap-[5px] py-1.5 px-3 border border-[#E5E7EB] rounded-lg bg-white text-[11px] cursor-pointer font-['Inter',sans-serif]"
              style={{ color: C.mid }}
            >
              <SlidersHorizontal size={12} />
              Filters
            </button>
            <div className="relative">
              <button
                onClick={() => setExportOpen((o) => !o)}
                className="flex items-center gap-[5px] py-1.5 px-3 border border-[#E5E7EB] rounded-lg bg-white text-[11px] cursor-pointer font-['Inter',sans-serif]"
                style={{ color: C.mid }}
              >
                <Download size={12} />
                Export
              </button>
              {exportOpen && (
                <div className="absolute top-[38px] right-0 bg-white border border-[#E5E7EB] rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-50 overflow-hidden min-w-[130px]">
                  {["CSV", "Excel", "PDF", "PNG"].map((f) => (
                    <div
                      key={f}
                      className="py-[9px] px-[14px] text-[11px] cursor-pointer font-['Inter',sans-serif] flex items-center gap-2 hover:bg-[#F9FAFB]"
                      style={{ color: C.mid }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Download size={10} />
                      {f}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="flex items-center gap-[5px] py-1.5 px-3 border border-[#E5E7EB] rounded-lg bg-white text-[11px] cursor-pointer font-['Inter',sans-serif]"
              style={{ color: C.mid }}
            >
              <Printer size={12} />
              Print
            </button>
            <button
              className="flex items-center gap-[5px] py-1.5 px-[14px] rounded-lg text-[11px] cursor-pointer font-['Inter',sans-serif] font-bold"
              style={{ border: `1px solid ${C.accent}`, background: C.accentBg, color: C.primary }}
            >
              <Plus size={12} />
              New Report
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="bg-white border-b border-[#E5E7EB] px-5 shrink-0 flex overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="py-[11px] px-4 border-none bg-transparent text-xs cursor-pointer whitespace-nowrap transition-all duration-150 font-['Inter',sans-serif]"
              style={{
                borderBottom: `2px solid ${activeTab === tab.id ? C.accent : "transparent"}`,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? C.primary : C.muted,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-[1.8fr_1fr] gap-3 mb-3 h-[355px]">
            <MetricsChartCard s={s} tab={activeTab} chartFilter={chartFilter} setChartFilter={setChartFilter} />
            <DonutGoalCard s={s} />
          </div>
          <div className="mb-3">
            <ComposedChartRow s={s} overtimeView={overtimeView} setOvertimeView={setOvertimeView} />
          </div>
          <TabPanel s={s} tab={activeTab} />
          <ActivityTable
            s={s}
            tableSearch={tableSearch}
            setTableSearch={setTableSearch}
            tableSort={tableSort}
            setTableSort={setTableSort}
            tablePage={tablePage}
            setTablePage={setTablePage}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </div>

        {/* Status Bar */}
        <div className="h-9 shrink-0 bg-[#111E17] border-t border-[#1A2E22] flex items-center px-[22px]">
          <div className="flex items-center gap-1.5 mr-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B8D935]" />
            <span className="text-[10px] font-bold text-white/70 tracking-[0.5px] font-['Inter',sans-serif]">
              BRIDGE Intelligence
            </span>
          </div>
          {["12 Sectors", "174 Ventures", `Active: ${s.full}`, "Data: Mar 2026"].map((label, i) => (
            <React.Fragment key={i}>
              <span className="text-[10px] text-white/[0.18] mr-3.5 font-['Inter',sans-serif]">
                ·
              </span>
              <span className="text-[10px] text-white/[0.35] mr-3.5 font-['Inter',sans-serif]">
                {label}
              </span>
            </React.Fragment>
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
