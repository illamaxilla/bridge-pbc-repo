import React, { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Search,
  Eye,
  List,
  LayoutGrid,
  Filter,
  X,
  AlertCircle,
} from "lucide-react";
import { C, SECTORS } from "@/components/intelligence/constants";
import {
  DM,
  RESOURCES,
  CATEGORIES,
  type Resource,
} from "@/components/intelligence/resources/data";
import {
  MobileHeader,
  SectorHeroCard,
  LibraryModule,
  ReportsTab,
  GuidesTab,
  DatasetsTab,
  SavedTab,
  MobileBottomNav,
  MobileBottomSheet,
} from "@/components/intelligence/resources/MobileComponents";
import {
  Sidebar,
  Header,
  AnalyticsPanel,
  ResourceDrawer,
  TableView,
  GridView,
} from "@/components/intelligence/resources/DesktopComponents";

/* ─── MOBILE RESOURCES PAGE ───────────────────────────────────────────── */
function MobileResourcesPage() {
  const [activeSector, setActiveSector] = useState(null);
  const [activeCategory, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedRes, setSelectedRes] = useState<Resource | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [resources, setResources] = useState(RESOURCES);
  const [activeTab, setActiveTab] = useState("library");

  const filtered = resources.filter((r) => {
    const mc = activeCategory === "all" || r.type === activeCategory;
    const ms =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const mx =
      !activeSector || r.sector === activeSector.full || r.sector === "All Sectors" || r.sector === activeSector.short;
    return mc && ms && mx;
  });

  const openRes = (r: Resource) => {
    setSelectedRes(r);
    setSheetOpen(true);
  };
  const closeSheet = () => {
    setSheetOpen(false);
    setTimeout(() => setSelectedRes(null), 280);
  };
  const toggleWatch = (id: string) =>
    setResources((p) => p.map((r) => (r.id === id ? { ...r, isWatchlisted: !r.isWatchlisted } : r)));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: DM.bg,
        fontFamily: "DM Sans,sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{display:none}
        .drawer{animation:slideUp 0.25s ease}
      `}</style>

      <MobileHeader activeSector={activeSector} setActiveSector={setActiveSector} />

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {activeSector && <SectorHeroCard sector={activeSector} />}

        {activeTab === "library" && (
          <LibraryModule
            resources={filtered}
            activeCategory={activeCategory}
            setCategory={setCategory}
            onOpen={openRes}
            onWatch={toggleWatch}
          />
        )}
        {activeTab === "reports" && (
          <ReportsTab activeSector={activeSector} resources={filtered} onOpen={openRes} onWatch={toggleWatch} />
        )}
        {activeTab === "guides" && <GuidesTab />}
        {activeTab === "datasets" && <DatasetsTab />}
        {activeTab === "saved" && <SavedTab resources={resources} onOpen={openRes} onWatch={toggleWatch} />}

        <div style={{ height: 12 }} />
      </div>

      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {sheetOpen && <MobileBottomSheet resource={selectedRes} onClose={closeSheet} onWatchlist={toggleWatch} />}
    </div>
  );
}

/* ─── DESKTOP PAGE ────────────────────────────────────────────────────── */
function DesktopResourcesPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSector, setActiveSector] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [activeCategory, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedRes, setSelectedRes] = useState<Resource | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [resources, setResources] = useState(RESOURCES);
  const [activeTab, setActiveTab] = useState("overview");
  const [sortCol, setSortCol] = useState("downloads");
  const [sortDir, setSortDir] = useState("desc");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const filtered = resources.filter((r) => {
    const matchCat = activeCategory === "all" || r.type === activeCategory;
    const matchSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchSector =
      !activeSector || r.sector === activeSector.full || r.sector === "All Sectors" || r.sector === activeSector.short;
    return matchCat && matchSearch && matchSector;
  });

  const sorted = [...filtered].sort((a, b) => {
    let av: any = (a as any)[sortCol] ?? 0,
      bv: any = (b as any)[sortCol] ?? 0;
    if (typeof av === "string") av = av.toLowerCase();
    if (typeof bv === "string") bv = bv.toLowerCase();
    return sortDir === "asc" ? (av > bv ? 1 : -1) : av < bv ? 1 : -1;
  });

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("desc");
    }
  };

  const openResource = (r: Resource) => {
    setSelectedRes(r);
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedRes(null), 200);
  };
  const toggleWatch = (id: string) =>
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, isWatchlisted: !r.isWatchlisted } : r)));

  const TABS = ["profile", "overview", "analytics"];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: C.bg,
        fontFamily: "DM Sans,sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`*{box-sizing:border-box} ::-webkit-scrollbar{display:none}`}</style>

      {/* Left nav sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeSector={activeSector}
        setActiveSector={setActiveSector}
      />

      {/* Main column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Header activeSector={activeSector} />

        {/* Content row */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Analytics Panel */}
          <AnalyticsPanel activeSector={activeSector} />

          {/* Right Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
            {/* Sub-nav + controls */}
            <div
              style={{
                background: C.white,
                borderBottom: `1px solid ${C.line}`,
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                gap: 0,
                flexShrink: 0,
              }}
            >
              {/* Tabs */}
              <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    style={{
                      padding: "12px 14px",
                      fontSize: "12px",
                      fontWeight: activeTab === t ? "700" : "500",
                      color: activeTab === t ? C.primary : C.muted,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      borderBottom: activeTab === t ? `2px solid ${C.primary}` : "2px solid transparent",
                      fontFamily: "DM Sans,sans-serif",
                      textTransform: "capitalize",
                      transition: "all 0.15s",
                      marginBottom: "-1px",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {/* Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: "11px",
                    fontWeight: "600",
                    color: C.mid,
                    fontFamily: "Inter,sans-serif",
                    background: C.bg,
                    border: `1px solid ${C.line}`,
                    borderRadius: 6,
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  <Filter size={11} /> Filter
                </button>
                {/* View toggles */}
                <div
                  style={{
                    display: "flex",
                    background: C.bg,
                    border: `1px solid ${C.line}`,
                    borderRadius: 6,
                    overflow: "hidden",
                  }}
                >
                  {(
                    [
                      ["table", List],
                      ["grid", LayoutGrid],
                    ] as [string, React.ComponentType<{ size?: number; color?: string }>][]
                  ).map(([v, ViewIcon]) => (
                    <button
                      key={v}
                      onClick={() => setViewMode(v)}
                      style={{
                        padding: "5px 9px",
                        background: viewMode === v ? C.primary : "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        transition: "background 0.15s",
                      }}
                    >
                      <ViewIcon size={13} color={viewMode === v ? C.white : C.muted} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Greeting bar */}
            <div
              style={{
                background: C.white,
                borderBottom: `1px solid ${C.line}`,
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexShrink: 0,
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: C.dark, fontFamily: "DM Sans,sans-serif" }}>
                  {greeting}, Joseph
                </div>
                <div style={{ fontSize: "11px", color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                  {sorted.length} resource{sorted.length !== 1 ? "s" : ""} available
                  {activeSector ? ` in ${activeSector.short}` : ""}
                </div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
                {/* Search */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    background: C.bg,
                    border: `1px solid ${C.line}`,
                    borderRadius: 7,
                    padding: "6px 10px",
                    width: 180,
                  }}
                >
                  <Search size={12} color={C.muted} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search\u2026"
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: "11px",
                      color: C.dark,
                      fontFamily: "Inter,sans-serif",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
                    >
                      <X size={10} color={C.muted} />
                    </button>
                  )}
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    background: C.primary,
                    border: "none",
                    borderRadius: 7,
                    padding: "6px 12px",
                    fontSize: "11px",
                    fontWeight: "700",
                    color: C.white,
                    fontFamily: "Inter,sans-serif",
                    cursor: "pointer",
                  }}
                >
                  <Eye size={11} /> View Report
                </button>
              </div>
            </div>

            {/* Category pills */}
            <div
              style={{
                background: C.white,
                borderBottom: `1px solid ${C.line}`,
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              <div style={{ display: "flex", gap: 6, padding: "8px 0" }}>
                {CATEGORIES.map((cat) => {
                  const cnt = cat.key === "all" ? resources.length : resources.filter((r) => r.type === cat.key).length;
                  const act = activeCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setCategory(cat.key)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 11px",
                        borderRadius: 20,
                        border: `1px solid ${act ? C.primary : C.line}`,
                        background: act ? C.primary : C.white,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.15s",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: act ? C.white : C.mid,
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {cat.label}
                      </span>
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: "700",
                          color: act ? "rgba(255,255,255,0.7)" : C.muted,
                          fontFamily: "Inter,sans-serif",
                          background: act ? "rgba(255,255,255,0.15)" : C.line,
                          padding: "1px 5px",
                          borderRadius: 10,
                        }}
                      >
                        {cnt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resource list */}
            <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
              {viewMode === "table" ? (
                <TableView
                  resources={sorted}
                  onOpen={openResource}
                  onWatch={toggleWatch}
                  sortCol={sortCol}
                  sortDir={sortDir}
                  onSort={toggleSort}
                />
              ) : (
                <GridView resources={sorted} onOpen={openResource} onWatch={toggleWatch} />
              )}
              {sorted.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 200,
                    gap: 8,
                  }}
                >
                  <AlertCircle size={28} color={C.muted} />
                  <div style={{ fontSize: "13px", color: C.muted, fontFamily: "Inter,sans-serif" }}>
                    No resources match your filters
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status bar */}
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
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
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
          {[
            "12 Sectors",
            "174 Ventures",
            `Active: ${activeSector ? activeSector.short : "Resources"}`,
            `${sorted.length} Results`,
          ].map((label, i) => (
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
                style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent, boxShadow: "0 0 5px #B8D935" }}
              />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: C.accent,
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

      {/* Resource Drawer */}
      {drawerOpen && <ResourceDrawer resource={selectedRes} onClose={closeDrawer} onWatchlist={toggleWatch} />}
    </div>
  );
}

/* ─── MAIN EXPORT ─────────────────────────────────────────────────────── */
export default function ResourcesPageV2() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileResourcesPage /> : <DesktopResourcesPage />;
}
