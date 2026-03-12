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
      className="flex flex-col h-screen overflow-hidden font-['DM_Sans',sans-serif]"
      style={{ background: DM.bg }}
    >
      <style>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{display:none}
        .drawer{animation:slideUp 0.25s ease}
      `}</style>

      <MobileHeader activeSector={activeSector} setActiveSector={setActiveSector} />

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
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

        <div className="h-3" />
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
      className="flex h-screen overflow-hidden font-['DM_Sans',sans-serif]"
      style={{ background: C.bg }}
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activeSector={activeSector} />

        {/* Content row */}
        <div className="flex-1 flex overflow-hidden">
          {/* Analytics Panel */}
          <AnalyticsPanel activeSector={activeSector} />

          {/* Right Content */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            {/* Sub-nav + controls */}
            <div
              className="px-5 flex items-center shrink-0"
              style={{ background: C.white, borderBottom: `1px solid ${C.line}` }}
            >
              {/* Tabs */}
              <div className="flex items-center gap-0.5 flex-1">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className="py-3 px-[14px] text-xs bg-transparent border-none cursor-pointer font-['DM_Sans',sans-serif] capitalize transition-all duration-150 -mb-px"
                    style={{
                      fontWeight: activeTab === t ? 700 : 500,
                      color: activeTab === t ? C.primary : C.muted,
                      borderBottom: activeTab === t ? `2px solid ${C.primary}` : "2px solid transparent",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-[5px] text-[11px] font-semibold font-['Inter',sans-serif] rounded-md py-[5px] px-2.5 cursor-pointer"
                  style={{ color: C.mid, background: C.bg, border: `1px solid ${C.line}` }}
                >
                  <Filter size={11} /> Filter
                </button>
                {/* View toggles */}
                <div
                  className="flex rounded-md overflow-hidden"
                  style={{ background: C.bg, border: `1px solid ${C.line}` }}
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
                      className="py-[5px] px-[9px] border-none cursor-pointer flex items-center transition-colors duration-150"
                      style={{ background: viewMode === v ? C.primary : "transparent" }}
                    >
                      <ViewIcon size={13} color={viewMode === v ? C.white : C.muted} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Greeting bar */}
            <div
              className="py-2.5 px-5 flex items-center gap-3 shrink-0"
              style={{ background: C.white, borderBottom: `1px solid ${C.line}` }}
            >
              <div>
                <div className="text-[13px] font-bold font-['DM_Sans',sans-serif]" style={{ color: C.dark }}>
                  {greeting}, Joseph
                </div>
                <div className="text-[11px] font-['Inter',sans-serif] mt-px" style={{ color: C.muted }}>
                  {sorted.length} resource{sorted.length !== 1 ? "s" : ""} available
                  {activeSector ? ` in ${activeSector.short}` : ""}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {/* Search */}
                <div
                  className="flex items-center gap-[7px] rounded-[7px] py-1.5 px-2.5 w-[180px]"
                  style={{ background: C.bg, border: `1px solid ${C.line}` }}
                >
                  <Search size={12} color={C.muted} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search\u2026"
                    className="border-none bg-transparent text-[11px] font-['Inter',sans-serif] outline-none w-full"
                    style={{ color: C.dark }}
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="bg-transparent border-none cursor-pointer p-0 flex"
                    >
                      <X size={10} color={C.muted} />
                    </button>
                  )}
                </div>
                <button
                  className="flex items-center gap-[5px] border-none rounded-[7px] py-1.5 px-3 text-[11px] font-bold font-['Inter',sans-serif] cursor-pointer"
                  style={{ background: C.primary, color: C.white }}
                >
                  <Eye size={11} /> View Report
                </button>
              </div>
            </div>

            {/* Category pills */}
            <div
              className="px-5 flex items-center gap-1.5 shrink-0 overflow-x-auto"
              style={{ background: C.white, borderBottom: `1px solid ${C.line}`, scrollbarWidth: "none" }}
            >
              <div className="flex gap-1.5 py-2">
                {CATEGORIES.map((cat) => {
                  const cnt = cat.key === "all" ? resources.length : resources.filter((r) => r.type === cat.key).length;
                  const act = activeCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setCategory(cat.key)}
                      className="flex items-center gap-[5px] py-[5px] px-[11px] rounded-[20px] cursor-pointer whitespace-nowrap transition-all duration-150"
                      style={{
                        border: `1px solid ${act ? C.primary : C.line}`,
                        background: act ? C.primary : C.white,
                      }}
                    >
                      <span
                        className="text-[11px] font-semibold font-['Inter',sans-serif]"
                        style={{ color: act ? C.white : C.mid }}
                      >
                        {cat.label}
                      </span>
                      <span
                        className="text-[9px] font-bold font-['Inter',sans-serif] py-px px-[5px] rounded-[10px]"
                        style={{
                          color: act ? "rgba(255,255,255,0.7)" : C.muted,
                          background: act ? "rgba(255,255,255,0.15)" : C.line,
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
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
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
                <div className="flex flex-col items-center justify-center h-[200px] gap-2">
                  <AlertCircle size={28} color={C.muted} />
                  <div className="text-[13px] font-['Inter',sans-serif]" style={{ color: C.muted }}>
                    No resources match your filters
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="h-9 shrink-0 bg-[#111E17] border-t border-[#1A2E22] flex items-center px-[22px]">
          <div className="flex items-center gap-1.5 mr-5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
            <span className="text-[10px] font-bold text-white/70 tracking-[0.5px] font-['Inter',sans-serif]">
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
              <div
                className="w-[5px] h-[5px] rounded-full shadow-[0_0_5px_#B8D935]"
                style={{ background: C.accent }}
              />
              <span
                className="text-[9px] font-bold tracking-[0.8px] uppercase font-['Inter',sans-serif]"
                style={{ color: C.accent }}
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
