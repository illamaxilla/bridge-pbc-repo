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
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: C.bg,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-thumb{background:#E5E7EB;border-radius:4px;}`}</style>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activeSector={s} setActiveSector={setS} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Top Nav */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #E5E7EB",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            height: 56,
            flexShrink: 0,
            boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Reports</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
              </div>
            </div>
            <div style={{ width: 1, height: 28, background: C.line }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 7,
                background: C.accentBg,
                border: `1px solid ${C.accent}44`,
              }}
            >
              {s.svgIcon(C.primary, 11)}
              <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
                {s.short}
              </span>
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
            <div
              style={{
                width: 380,
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: 9,
                padding: "7px 11px",
              }}
            >
              <Search size={13} color={C.muted} />
              <input
                placeholder="Search reports, signals..."
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontSize: 12,
                  color: C.mid,
                  fontFamily: "Inter,sans-serif",
                  width: "100%",
                }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setNotif((o) => !o)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  border: "1px solid #E5E7EB",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <Bell size={15} color={C.mid} />
                <div
                  style={{
                    position: "absolute",
                    top: 7,
                    right: 7,
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: C.red,
                    border: "2px solid #fff",
                  }}
                />
              </button>
              {notif && (
                <div
                  style={{
                    position: "absolute",
                    top: 44,
                    right: 0,
                    width: 280,
                    background: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: 12,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    zIndex: 99,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "11px 14px",
                      borderBottom: "1px solid #E5E7EB",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Alerts</span>
                    <span
                      style={{ fontSize: 11, color: C.accent, cursor: "pointer", fontWeight: 600 }}
                      onClick={() => setNotif(false)}
                    >
                      Mark all read
                    </span>
                  </div>
                  {s.activity.slice(0, 3).map((a, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", gap: 9, padding: "10px 14px", borderBottom: "1px solid #F3F4F6" }}
                    >
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: sigCol(a.sig),
                          marginTop: 4,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.dark, lineHeight: 1.3 }}>{a.h}</div>
                        <div style={{ fontSize: 10, color: C.muted, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
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
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                border: "1px solid #E5E7EB",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={14} color={C.mid} className={syncing ? "spin" : ""} />
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 11px",
                border: "1px solid #E5E7EB",
                borderRadius: 9,
                cursor: "pointer",
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: 27,
                  height: 27,
                  borderRadius: "50%",
                  background: "rgba(184,217,53,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <User size={13} color={C.primary} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, lineHeight: 1 }}>Joseph A.</div>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>Full Access</div>
              </div>
              <ChevronDown size={11} color={C.muted} />
            </div>
          </div>
        </div>

        {/* Page Header Bar */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #E5E7EB",
            padding: "10px 20px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: C.accentBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileText size={15} color={C.primary} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>Sector Reports</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                Comprehensive analysis & intelligence
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                background: "#fff",
                fontSize: 11,
                color: C.mid,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              <Calendar size={12} color={C.muted} />
              This Month
              <ChevronDown size={10} color={C.muted} />
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                background: "#fff",
                fontSize: 11,
                color: C.mid,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              <SlidersHorizontal size={12} />
              Filters
            </button>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setExportOpen((o) => !o)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: 8,
                  background: "#fff",
                  fontSize: 11,
                  color: C.mid,
                  cursor: "pointer",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                <Download size={12} />
                Export
              </button>
              {exportOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: 38,
                    right: 0,
                    background: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: 10,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    zIndex: 50,
                    overflow: "hidden",
                    minWidth: 130,
                  }}
                >
                  {["CSV", "Excel", "PDF", "PNG"].map((f) => (
                    <div
                      key={f}
                      style={{
                        padding: "9px 14px",
                        fontSize: 11,
                        color: C.mid,
                        cursor: "pointer",
                        fontFamily: "Inter,sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
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
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 12px",
                border: "1px solid #E5E7EB",
                borderRadius: 8,
                background: "#fff",
                fontSize: 11,
                color: C.mid,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              <Printer size={12} />
              Print
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 14px",
                border: `1px solid ${C.accent}`,
                borderRadius: 8,
                background: C.accentBg,
                fontSize: 11,
                color: C.primary,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
                fontWeight: 700,
              }}
            >
              <Plus size={12} />
              New Report
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #E5E7EB",
            padding: "0 20px",
            flexShrink: 0,
            display: "flex",
            gap: 0,
            overflowX: "auto",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "11px 16px",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.id ? C.accent : "transparent"}`,
                background: "transparent",
                fontSize: 12,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? C.primary : C.muted,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all .15s",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 12, marginBottom: 12, height: 355 }}>
            <MetricsChartCard s={s} tab={activeTab} chartFilter={chartFilter} setChartFilter={setChartFilter} />
            <DonutGoalCard s={s} />
          </div>
          <div style={{ marginBottom: 12 }}>
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
            <React.Fragment key={i}>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.18)",
                  marginRight: 14,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                ·
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  marginRight: 14,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {label}
              </span>
            </React.Fragment>
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
