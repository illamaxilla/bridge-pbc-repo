import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Download,
  LayoutGrid,
  Activity,
  List,
  Bookmark,
  AlertCircle,
  X,
  ArrowUpRight,
} from "lucide-react";
import { C, SECTORS, type Sector } from "../constants";
import {
  DM,
  TYPE_META,
  STATUS_STYLE,
  RESOURCES,
  ENGAGE_DATA,
  HEATMAP,
  HMAP_DAYS,
  HMAP_HOURS,
  HMAP_COLORS,
  SUB_COLORS,
  GUIDES_DATA,
  LEVEL_COLOR,
  DATASETS_DATA,
  getIntel,
  type Resource,
} from "./data";

/* ─── MODULE CARD ──────────────────────────────────────────────────────── */
interface ModuleCardProps {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  badgeStyle?: React.CSSProperties;
  defaultOpen?: boolean;
  noPad?: boolean;
  children: React.ReactNode;
}

export function ModuleCard({ icon, title, badge, badgeStyle, defaultOpen = false, noPad = false, children }: ModuleCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        background: DM.card,
        border: `1px solid ${DM.border}`,
        borderRadius: 14,
        overflow: "hidden",
        margin: "0 10px 10px",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 14px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: DM.accentDim,
            border: `1px solid ${DM.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            flex: 1,
            textAlign: "left",
            fontSize: 15,
            fontWeight: 700,
            color: DM.text,
            fontFamily: "DM Sans,sans-serif",
          }}
        >
          {title}
        </span>
        {badge && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "Inter,sans-serif",
              padding: "4px 10px",
              borderRadius: 20,
              ...badgeStyle,
            }}
          >
            {badge}
          </span>
        )}
        {open ? <ChevronUp size={14} color={DM.textMuted} /> : <ChevronDown size={14} color={DM.textMuted} />}
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${DM.borderSub}`, padding: noPad ? 0 : "4px 14px 14px" }}>{children}</div>
      )}
    </div>
  );
}

/* ─── SECTOR HERO CARD ─────────────────────────────────────────────────── */
interface SectorHeroCardProps {
  sector: Sector;
}

export function SectorHeroCard({ sector }: SectorHeroCardProps) {
  if (!sector) return null;
  const intel = getIntel(sector);
  return (
    <div
      style={{
        margin: "10px 10px 0",
        background: DM.card,
        border: `1px solid ${DM.border}`,
        borderRadius: 14,
        padding: "14px",
      }}
    >
      <div
        style={{
          fontSize: 8,
          fontWeight: 700,
          color: DM.accent,
          fontFamily: "Inter,sans-serif",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        ANALYTICS · {sector.short.toUpperCase()}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: `2.5px solid ${DM.tealMid}`,
            background: DM.surface,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 800, color: DM.text, fontFamily: "DM Sans,sans-serif" }}>
            {sector.score}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: DM.text,
              fontFamily: "DM Sans,sans-serif",
              lineHeight: 1.2,
              marginBottom: 7,
            }}
          >
            {sector.full}
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {[
              { l: "Cap", v: intel!.kpi.cap, hi: false },
              { l: "IRR", v: intel!.kpi.irr, hi: false },
              { l: "Score", v: sector.score, hi: true },
              { l: "Ventures", v: sector.ventures, hi: false },
            ].map((p, i) => (
              <span
                key={i}
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: p.hi ? DM.accent : DM.textMid,
                  fontFamily: "Inter,sans-serif",
                  background: p.hi ? DM.accentDim : DM.surface,
                  border: `1px solid ${p.hi ? DM.border : DM.borderSub}`,
                  borderRadius: 5,
                  padding: "3px 7px",
                }}
              >
                {p.l} {p.v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── LIBRARY MODULE ───────────────────────────────────────────────────── */
interface LibraryModuleProps {
  resources: Resource[];
  activeCategory: string;
  setCategory: (cat: string) => void;
  onOpen: (r: Resource) => void;
  onWatch: (id: string) => void;
}

export function LibraryModule({ resources, activeCategory, setCategory, onOpen, onWatch }: LibraryModuleProps) {
  const CATS = [
    { key: "all", label: "All" },
    { key: "report", label: "Reports" },
    { key: "dataset", label: "Datasets" },
    { key: "guide", label: "Guides" },
    { key: "template", label: "Templates" },
  ];
  return (
    <ModuleCard
      icon={<BookOpen size={14} color={DM.accent} />}
      title="Resource Library"
      badge={`${resources.length}`}
      badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
      defaultOpen={true}
      noPad={true}
    >
      <div style={{ overflowX: "auto", scrollbarWidth: "none", borderBottom: `1px solid ${DM.borderSub}` }}>
        <div style={{ display: "flex", padding: "0 14px", width: "max-content" }}>
          {CATS.map((cat) => {
            const cnt = cat.key === "all" ? resources.length : resources.filter((r) => r.type === cat.key).length;
            const act = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "9px 10px",
                  background: "none",
                  border: "none",
                  borderBottom: act ? `2px solid ${DM.accent}` : "2px solid transparent",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: act ? 700 : 400,
                    color: act ? DM.accent : DM.textMuted,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {cat.label}
                </span>
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    color: act ? DM.accent : DM.textFaint,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {cnt}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {resources.length === 0 ? (
        <div style={{ padding: "28px 14px", textAlign: "center" }}>
          <AlertCircle size={22} color={DM.textMuted} />
          <div style={{ fontSize: 12, color: DM.textMuted, fontFamily: "Inter,sans-serif", marginTop: 8 }}>
            No results
          </div>
        </div>
      ) : (
        resources.map((r, i) => {
          const tm = TYPE_META[r.type] || TYPE_META.report;
          const ss = STATUS_STYLE[r.status] || STATUS_STYLE.available;
          return (
            <div
              key={r.id}
              onClick={() => onOpen(r)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 14px",
                borderBottom: i < resources.length - 1 ? `1px solid ${DM.borderSub}` : "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: DM.surface,
                  border: `1px solid ${DM.borderSub}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <tm.Icon size={15} color={DM.tealMid} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: DM.text,
                    fontFamily: "DM Sans,sans-serif",
                    lineHeight: 1.25,
                    marginBottom: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: DM.tealMid, fontFamily: "Inter,sans-serif" }}>
                    {tm.label}
                  </span>
                  <span style={{ fontSize: 8, color: DM.textFaint }}>·</span>
                  <span style={{ fontSize: 8, fontWeight: 600, color: ss.color, fontFamily: "Inter,sans-serif" }}>
                    {ss.label}
                  </span>
                  {r.access === "free" && (
                    <>
                      <span style={{ fontSize: 8, color: DM.textFaint }}>·</span>
                      <span
                        style={{ fontSize: 8, fontWeight: 700, color: DM.positive, fontFamily: "Inter,sans-serif" }}
                      >
                        FREE
                      </span>
                    </>
                  )}
                  {r.isNew && (
                    <>
                      <span style={{ fontSize: 8, color: DM.textFaint }}>·</span>
                      <span style={{ fontSize: 8, fontWeight: 700, color: "#60A5FA", fontFamily: "Inter,sans-serif" }}>
                        NEW
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onWatch(r.id);
                  }}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    border: `1px solid ${r.isWatchlisted ? DM.accent : DM.borderSub}`,
                    background: r.isWatchlisted ? DM.accentDim : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Bookmark
                    size={11}
                    color={r.isWatchlisted ? DM.accent : DM.textMuted}
                    fill={r.isWatchlisted ? DM.accent : "none"}
                  />
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Download size={8} color={DM.textMuted} />
                  <span style={{ fontSize: 8, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>
                    {r.downloads > 999 ? `${(r.downloads / 1000).toFixed(1)}k` : r.downloads}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </ModuleCard>
  );
}

/* ─── SUB-SECTOR MODULE ────────────────────────────────────────────────── */
interface SubsectorModuleProps {
  activeSector: Sector | null;
}

export function SubsectorModule({ activeSector }: SubsectorModuleProps) {
  const intel = getIntel(activeSector);
  if (!intel) return null;
  const { subsectors } = intel;
  return (
    <ModuleCard
      icon={<LayoutGrid size={14} color={DM.accent} />}
      title="Sub-sector Breakdown"
      badge={`${subsectors.length} segments`}
      badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
      defaultOpen={true}
    >
      <div style={{ display: "flex", height: 10, borderRadius: 6, overflow: "hidden", marginBottom: 14 }}>
        {subsectors.map((s, i) => (
          <div
            key={i}
            style={{
              width: `${s.pct}%`,
              background: SUB_COLORS[i] || DM.teal,
              borderRight: i < subsectors.length - 1 ? "1px solid rgba(0,0,0,0.35)" : "",
            }}
          />
        ))}
      </div>
      {subsectors.map((s, i) => (
        <div key={i} style={{ marginBottom: i < subsectors.length - 1 ? 10 : 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: DM.text, fontFamily: "DM Sans,sans-serif" }}>
              {s.name}
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: DM.accent, fontFamily: "Inter,sans-serif" }}>
              {s.pct}%
            </span>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${s.pct}%`,
                background: SUB_COLORS[i] || DM.teal,
                borderRadius: 2,
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      ))}
    </ModuleCard>
  );
}

/* ─── ANALYTICS MODULE ─────────────────────────────────────────────────── */
export function AnalyticsModule() {
  const maxE = Math.max(...ENGAGE_DATA);
  const stats = [
    { val: "1,692", label: "Active Signals", trend: "+56%" },
    { val: "1,423", label: "Conversion", trend: "+43%" },
    { val: "11,992", label: "Avg Duration", trend: "+28%" },
  ];
  return (
    <ModuleCard
      icon={<Activity size={14} color={DM.accent} />}
      title="30-Day Engagement"
      badge="Live"
      badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 12 }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: DM.surface,
              borderRadius: 9,
              border: `1px solid ${DM.borderSub}`,
              padding: "10px 9px",
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: DM.text,
                fontFamily: "DM Sans,sans-serif",
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              {s.val}
            </div>
            <div
              style={{
                fontSize: 8,
                color: DM.textMuted,
                fontFamily: "Inter,sans-serif",
                marginBottom: 5,
                lineHeight: 1.2,
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, color: DM.positive, fontFamily: "Inter,sans-serif" }}>
              {s.trend}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: DM.surface,
          borderRadius: 9,
          border: `1px solid ${DM.borderSub}`,
          padding: "10px 10px 6px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 52, marginBottom: 4 }}>
          {ENGAGE_DATA.map((d, i) => {
            const isMax = d === Math.max(...ENGAGE_DATA);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: isMax ? DM.tealMid : `${DM.tealMid}60`,
                  borderRadius: "2px 2px 0 0",
                  height: `${(d / maxE) * 48}px`,
                  minHeight: 2,
                }}
              />
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["Feb 5", "Feb 15", "Feb 25", "Mar 1"].map((l, i) => (
            <span key={i} style={{ fontSize: 7, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </ModuleCard>
  );
}

/* ─── HEATMAP MODULE ───────────────────────────────────────────────────── */
export function HeatmapModule() {
  return (
    <ModuleCard
      icon={<List size={14} color={DM.accent} />}
      title="Activity Heatmap"
      badge="7 Days"
      badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
    >
      <div style={{ display: "flex", marginBottom: 4, paddingLeft: 20 }}>
        {HMAP_HOURS.map((h) => (
          <div
            key={h}
            style={{ flex: 1, fontSize: 7, color: DM.textMuted, fontFamily: "Inter,sans-serif", textAlign: "center" }}
          >
            {h}
          </div>
        ))}
      </div>
      {HEATMAP.map((row, di) => (
        <div key={di} style={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
          <div style={{ width: 18, fontSize: 7, color: DM.textMuted, fontFamily: "Inter,sans-serif", flexShrink: 0 }}>
            {HMAP_DAYS[di]}
          </div>
          {row.map((v, hi) => (
            <div
              key={hi}
              style={{ flex: 1, height: 18, marginRight: hi < 5 ? 2 : 0, borderRadius: 3, background: HMAP_COLORS[v] }}
            />
          ))}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10 }}>
        <span style={{ fontSize: 7, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>Low</span>
        {[0, 1, 2, 3, 4].map((v) => (
          <div key={v} style={{ width: 11, height: 11, borderRadius: 2, background: HMAP_COLORS[v] }} />
        ))}
        <span style={{ fontSize: 7, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>Peak</span>
      </div>
    </ModuleCard>
  );
}

/* ─── MOBILE BOTTOM SHEET ──────────────────────────────────────────────── */
interface MobileBottomSheetProps {
  resource: Resource | null;
  onClose: () => void;
  onWatchlist: (id: string) => void;
}

export function MobileBottomSheet({ resource, onClose, onWatchlist }: MobileBottomSheetProps) {
  if (!resource) return null;
  const tm = TYPE_META[resource.type] || TYPE_META.report;
  const ss = STATUS_STYLE[resource.status] || STATUS_STYLE.available;
  const related = RESOURCES.filter(
    (r) => r.id !== resource.id && (r.sector === resource.sector || r.type === resource.type),
  ).slice(0, 3);
  const details = [
    { label: "Format", value: resource.fileFormat || "\u2014" },
    { label: "Size", value: resource.fileSize || "\u2014" },
    { label: "Pages", value: resource.pages ? `${resource.pages} pp` : "\u2014" },
    { label: "Downloads", value: resource.downloads.toLocaleString() },
    { label: "Monthly", value: `+${resource.monthlyDownloads}/mo` },
    { label: "Added by", value: resource.addedBy },
  ];
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          zIndex: 300,
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          background: DM.card,
          borderRadius: "18px 18px 0 0",
          border: `1px solid ${DM.border}`,
          zIndex: 301,
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          animation: "slideUp 0.26s cubic-bezier(0.32,0.72,0,1)",
          boxShadow: "0 -20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px", flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: DM.surface }} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
          <div style={{ padding: "8px 16px 14px", borderBottom: `1px solid ${DM.borderSub}` }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: DM.surface,
                  border: `1px solid ${DM.borderSub}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <tm.Icon size={20} color={DM.tealMid} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    color: DM.textMuted,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {resource.slug}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: DM.text,
                    fontFamily: "DM Sans,sans-serif",
                    lineHeight: 1.25,
                  }}
                >
                  {resource.name}
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  border: `1px solid ${DM.borderSub}`,
                  background: DM.surface,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <X size={12} color={DM.textMuted} />
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: ss.color, fontFamily: "Inter,sans-serif" }}>
                {ss.label}
              </span>
              <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: resource.access === "free" ? DM.positive : DM.accent,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {resource.access === "free" ? "Free Access" : "Pro Access"}
              </span>
              {resource.isNew && (
                <>
                  <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#60A5FA", fontFamily: "Inter,sans-serif" }}>
                    New
                  </span>
                </>
              )}
            </div>
          </div>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${DM.borderSub}` }}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: DM.textMuted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 6,
              }}
            >
              About
            </div>
            <p style={{ fontSize: 12, color: DM.textMid, fontFamily: "Inter,sans-serif", lineHeight: 1.65, margin: 0 }}>
              {resource.description}
            </p>
          </div>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${DM.borderSub}` }}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: DM.textMuted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Details
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {details.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: DM.surface,
                    borderRadius: 8,
                    border: `1px solid ${DM.borderSub}`,
                    padding: "7px 9px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 7,
                      fontWeight: 700,
                      color: DM.textMuted,
                      fontFamily: "Inter,sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: 2,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: DM.text,
                      fontFamily: "Inter,sans-serif",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${DM.borderSub}` }}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: DM.textMuted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Tags
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: DM.textMid,
                    fontFamily: "Inter,sans-serif",
                    background: DM.surface,
                    border: `1px solid ${DM.borderSub}`,
                    borderRadius: 20,
                    padding: "4px 10px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {related.length > 0 && (
            <div style={{ padding: "12px 16px" }}>
              <div
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: DM.textMuted,
                  fontFamily: "Inter,sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 8,
                }}
              >
                Related
              </div>
              {related.map((r) => {
                const rtm = TYPE_META[r.type] || TYPE_META.report;
                return (
                  <div
                    key={r.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 8,
                      padding: "8px 10px",
                      background: DM.surface,
                      borderRadius: 9,
                      border: `1px solid ${DM.borderSub}`,
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 7,
                        background: "rgba(255,255,255,0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <rtm.Icon size={13} color={DM.tealMid} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: DM.text,
                          fontFamily: "DM Sans,sans-serif",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.name}
                      </div>
                      <div style={{ fontSize: 8, color: DM.textMuted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                        {rtm.label} · {r.downloads.toLocaleString()}
                      </div>
                    </div>
                    <ChevronRight size={11} color={DM.textMuted} />
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ height: 16 }} />
        </div>
        <div
          style={{
            padding: "10px 14px 0",
            borderTop: `1px solid ${DM.borderSub}`,
            background: DM.card,
            display: "flex",
            gap: 8,
            paddingBottom: "max(14px,env(safe-area-inset-bottom,14px))",
          }}
        >
          <button
            onClick={() => onWatchlist(resource.id)}
            style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: 11,
              border: `1px solid ${resource.isWatchlisted ? DM.accent : DM.borderSub}`,
              background: resource.isWatchlisted ? DM.accentDim : DM.surface,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Bookmark
              size={16}
              color={resource.isWatchlisted ? DM.accent : DM.textMuted}
              fill={resource.isWatchlisted ? DM.accent : "none"}
            />
          </button>
          <button
            style={{
              flex: 1,
              height: 44,
              borderRadius: 11,
              background: DM.accent,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              cursor: "pointer",
            }}
          >
            <Download size={15} color={C.primary} />
            <span style={{ fontSize: 13, fontWeight: 700, color: C.primary, fontFamily: "DM Sans,sans-serif" }}>
              {resource.access === "free" ? "Download Free" : "Access with Pro"}
            </span>
          </button>
          <button
            style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: 11,
              border: `1px solid ${DM.borderSub}`,
              background: DM.surface,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowUpRight size={16} color={DM.textMid} />
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── MOBILE SECTOR DRAWER ─────────────────────────────────────────────── */
interface MSectorDrawerProps {
  activeSector: Sector | null;
  setActiveSector: (s: Sector | null) => void;
  open: boolean;
  onClose: () => void;
}

export function MSectorDrawer({ activeSector, setActiveSector, open, onClose }: MSectorDrawerProps) {
  if (!open) return null;
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        className="drawer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#0F1A12",
          borderRadius: "20px 20px 0 0",
          maxHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "env(safe-area-inset-bottom,16px)",
          border: "1px solid rgba(184,217,53,0.15)",
          borderBottom: "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.15)",
            margin: "12px auto 0",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            padding: "12px 20px 8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#6B7280",
              fontFamily: "Inter,sans-serif",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            Select Sector
          </span>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: 7,
              padding: "4px 10px",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            Done
          </button>
        </div>
        <div style={{ overflowY: "auto", flex: 1, scrollbarWidth: "none" }}>
          {sorted.map((sec, i) => {
            const act = activeSector?.id === sec.id;
            return (
              <div
                key={sec.id}
                onClick={() => {
                  setActiveSector(act ? null : sec);
                  onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 20px",
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: act ? "rgba(184,217,53,0.07)" : "transparent",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: act ? "rgba(184,217,53,0.15)" : "rgba(255,255,255,0.06)",
                  }}
                >
                  {sec.svgIcon(act ? "#B8D935" : "rgba(255,255,255,0.35)", 16)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: act ? 700 : 500,
                      color: act ? "#fff" : "rgba(255,255,255,0.7)",
                      fontFamily: "DM Sans,sans-serif",
                    }}
                  >
                    {sec.short}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "Inter,sans-serif",
                      marginTop: 1,
                    }}
                  >
                    {sec.ventures} ventures · {sec.cap}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      fontFamily: "Inter,sans-serif",
                      color: act ? "#B8D935" : "rgba(255,255,255,0.28)",
                    }}
                  >
                    {sec.score}
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "Inter,sans-serif" }}>
                    score
                  </div>
                </div>
                {act && (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#B8D935", flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── MOBILE HEADER ────────────────────────────────────────────────────── */
interface MobileHeaderProps {
  activeSector: Sector | null;
  setActiveSector: (s: Sector | null) => void;
}

export function MobileHeader({ activeSector, setActiveSector }: MobileHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <div
        style={{
          height: 52,
          background: "rgba(15,26,18,0.97)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          flexShrink: 0,
        }}
      >
        <div
          onClick={() => setDrawerOpen(true)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 9,
            cursor: "pointer",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 10,
            padding: "7px 12px 7px 10px",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {activeSector ? (
              activeSector.svgIcon("#B8D935", 13)
            ) : (
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B8D935"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            )}
          </div>
          <span
            style={{
              flex: 1,
              fontSize: 13,
              fontWeight: 600,
              color: "#FFFFFF",
              fontFamily: "DM Sans,sans-serif",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {activeSector ? activeSector.short : "All Sectors"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>
              {activeSector ? activeSector.score : "\u2014"}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B8D935"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
      <MSectorDrawer
        activeSector={activeSector}
        setActiveSector={setActiveSector}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}

/* ─── TAB: REPORTS ─────────────────────────────────────────────────────── */
interface ReportsTabProps {
  activeSector: Sector | null;
  resources: Resource[];
  onOpen: (r: Resource) => void;
  onWatch: (id: string) => void;
}

export function ReportsTab({ activeSector, resources, onOpen, onWatch }: ReportsTabProps) {
  const [filter, setFilter] = useState("all");
  const FILTERS = [
    { k: "all", l: "All" },
    { k: "report", l: "Reports" },
    { k: "dataset", l: "Datasets" },
    { k: "guide", l: "Guides" },
  ];
  const items = resources.filter((r) => filter === "all" || r.type === filter);
  return (
    <div style={{ paddingTop: 10 }}>
      <div style={{ padding: "0 10px 10px", display: "flex", gap: 7, overflowX: "auto", scrollbarWidth: "none" }}>
        {FILTERS.map((f) => {
          const act = filter === f.k;
          return (
            <button
              key={f.k}
              onClick={() => setFilter(f.k)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid ${act ? DM.accent : DM.borderSub}`,
                background: act ? DM.accentDim : "transparent",
                fontSize: 11,
                fontWeight: act ? 700 : 400,
                color: act ? DM.accent : DM.textMuted,
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
              }}
            >
              {f.l}
            </button>
          );
        })}
      </div>
      {items.map((r, i) => {
        const tm = TYPE_META[r.type] || TYPE_META.report;
        const ss = STATUS_STYLE[r.status] || STATUS_STYLE.available;
        return (
          <div
            key={r.id}
            onClick={() => onOpen(r)}
            style={{
              display: "flex",
              gap: 12,
              padding: "12px 14px",
              margin: "0 10px 8px",
              background: DM.card,
              border: `1px solid ${DM.border}`,
              borderRadius: 12,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: DM.surface,
                border: `1px solid ${DM.borderSub}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <tm.Icon size={16} color={DM.tealMid} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: DM.text,
                  fontFamily: "DM Sans,sans-serif",
                  lineHeight: 1.3,
                  marginBottom: 4,
                }}
              >
                {r.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: DM.tealMid,
                    fontFamily: "Inter,sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  {tm.label}
                </span>
                <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: ss.color, fontFamily: "Inter,sans-serif" }}>
                  {ss.label}
                </span>
                <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                <span style={{ fontSize: 9, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>
                  {r.downloads.toLocaleString()} dl
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWatch(r.id);
              }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                border: `1px solid ${r.isWatchlisted ? DM.accent : DM.borderSub}`,
                background: r.isWatchlisted ? DM.accentDim : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                alignSelf: "center",
              }}
            >
              <Bookmark
                size={12}
                color={r.isWatchlisted ? DM.accent : DM.textMuted}
                fill={r.isWatchlisted ? DM.accent : "none"}
              />
            </button>
          </div>
        );
      })}
      {items.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <AlertCircle size={24} color={DM.textMuted} />
          <div style={{ fontSize: 12, color: DM.textMuted, marginTop: 8, fontFamily: "Inter,sans-serif" }}>
            No resources match this filter
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── TAB: GUIDES ──────────────────────────────────────────────────────── */
export function GuidesTab() {
  const [filter, setFilter] = useState("all");
  const FILTERS = [
    { k: "all", l: "All" },
    { k: "Foundational", l: "Foundational" },
    { k: "Intermediate", l: "Intermediate" },
    { k: "Advanced", l: "Advanced" },
  ];
  const items = filter === "all" ? GUIDES_DATA : GUIDES_DATA.filter((g) => g.level === filter);
  return (
    <div style={{ paddingTop: 10 }}>
      <div style={{ padding: "0 10px 10px", display: "flex", gap: 7, overflowX: "auto", scrollbarWidth: "none" }}>
        {FILTERS.map((f) => {
          const act = filter === f.k;
          return (
            <button
              key={f.k}
              onClick={() => setFilter(f.k)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid ${act ? DM.accent : DM.borderSub}`,
                background: act ? DM.accentDim : "transparent",
                fontSize: 11,
                fontWeight: act ? 700 : 400,
                color: act ? DM.accent : DM.textMuted,
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
              }}
            >
              {f.l}
            </button>
          );
        })}
      </div>
      <ModuleCard
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DM.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        }
        title="Playbooks & Frameworks"
        badge={`${items.length}`}
        badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
        defaultOpen={true}
      >
        {items.map((g, i) => {
          const lc = LEVEL_COLOR[g.level] || DM.textMuted;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "11px 0",
                borderBottom: i < items.length - 1 ? `1px solid ${DM.borderSub}` : "none",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: DM.surface,
                  border: `1px solid ${DM.borderSub}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={DM.tealMid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: DM.text, fontFamily: "DM Sans,sans-serif", lineHeight: 1.3, marginBottom: 5 }}>
                  {g.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: lc, fontFamily: "Inter,sans-serif", background: `${lc}18`, padding: "2px 7px", borderRadius: 4 }}>
                    {g.level}
                  </span>
                  <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                  <span style={{ fontSize: 9, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>{g.cat}</span>
                  <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                  <span style={{ fontSize: 9, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>{g.pages}pp</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", flexShrink: 0 }}>
                <span style={{ fontSize: 8, color: DM.textFaint, fontFamily: "Inter,sans-serif" }}>{g.updated}</span>
                <span style={{ fontSize: 9, color: DM.tealMid, fontFamily: "Inter,sans-serif", fontWeight: 600 }}>{g.sector}</span>
              </div>
            </div>
          );
        })}
      </ModuleCard>
    </div>
  );
}

/* ─── TAB: DATASETS ────────────────────────────────────────────────────── */
export function DatasetsTab() {
  const [filter, setFilter] = useState("all");
  const FILTERS = [
    { k: "all", l: "All" },
    { k: "free", l: "Free" },
    { k: "pro", l: "Pro" },
    { k: "CSV", l: "CSV" },
    { k: "XLSX", l: "XLSX" },
  ];
  const items = FILTERS.find((f) => f.k === filter && (f.k === "CSV" || f.k === "XLSX"))
    ? DATASETS_DATA.filter((d) => d.fmt === filter)
    : filter === "all"
      ? DATASETS_DATA
      : DATASETS_DATA.filter((d) => d.access === filter);
  return (
    <div style={{ paddingTop: 10 }}>
      <div style={{ padding: "0 10px 10px", display: "flex", gap: 7, overflowX: "auto", scrollbarWidth: "none" }}>
        {FILTERS.map((f) => {
          const act = filter === f.k;
          return (
            <button
              key={f.k}
              onClick={() => setFilter(f.k)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid ${act ? DM.accent : DM.borderSub}`,
                background: act ? DM.accentDim : "transparent",
                fontSize: 11,
                fontWeight: act ? 700 : 400,
                color: act ? DM.accent : DM.textMuted,
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
              }}
            >
              {f.l}
            </button>
          );
        })}
      </div>
      <ModuleCard
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DM.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        }
        title="Sector Datasets"
        badge={`${items.length} files`}
        badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
        defaultOpen={true}
      >
        {items.map((d, i) => {
          const isFree = d.access === "free";
          const isCsv = d.fmt === "CSV";
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                padding: "11px 0",
                borderBottom: i < items.length - 1 ? `1px solid ${DM.borderSub}` : "none",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: DM.surface,
                  border: `1px solid ${DM.borderSub}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isCsv ? DM.tealMid : "#60A5FA"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: DM.text, fontFamily: "DM Sans,sans-serif", lineHeight: 1.3, marginBottom: 5 }}>
                  {d.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: isCsv ? DM.tealMid : "#60A5FA", fontFamily: "Inter,sans-serif", background: isCsv ? "rgba(42,94,66,0.3)" : "rgba(96,165,250,0.15)", padding: "2px 7px", borderRadius: 4 }}>
                    {d.fmt}
                  </span>
                  <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                  <span style={{ fontSize: 9, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>{d.rows} rows</span>
                  <span style={{ fontSize: 9, color: DM.textFaint }}>·</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: isFree ? DM.positive : DM.accent, fontFamily: "Inter,sans-serif" }}>
                    {isFree ? "Free" : "Pro"}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", flexShrink: 0 }}>
                <span style={{ fontSize: 8, color: DM.textFaint, fontFamily: "Inter,sans-serif" }}>{d.updated}</span>
                <button style={{ display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
                  <Download size={11} color={DM.tealMid} />
                  <span style={{ fontSize: 9, color: DM.tealMid, fontFamily: "Inter,sans-serif", fontWeight: 600 }}>Get</span>
                </button>
              </div>
            </div>
          );
        })}
      </ModuleCard>
    </div>
  );
}

/* ─── TAB: SAVED ───────────────────────────────────────────────────────── */
interface SavedTabProps {
  resources: Resource[];
  onOpen: (r: Resource) => void;
  onWatch: (id: string) => void;
}

export function SavedTab({ resources, onOpen, onWatch }: SavedTabProps) {
  const saved = resources.filter((r) => r.isWatchlisted);
  const recent = resources.filter((r) => r.isNew).slice(0, 4);
  return (
    <div style={{ paddingTop: 10 }}>
      <ModuleCard
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DM.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        }
        title="Saved Resources"
        badge={String(saved.length)}
        badgeStyle={{ background: DM.accentDim, color: DM.accent, border: `1px solid ${DM.border}` }}
        defaultOpen={true}
      >
        {saved.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={DM.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 8px" }}>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <div style={{ fontSize: 12, color: DM.textMuted, fontFamily: "Inter,sans-serif" }}>No saved resources yet</div>
            <div style={{ fontSize: 10, color: DM.textFaint, fontFamily: "Inter,sans-serif", marginTop: 4 }}>Tap the bookmark icon on any resource</div>
          </div>
        ) : (
          saved.map((r, i) => {
            const tm = TYPE_META[r.type] || TYPE_META.report;
            const ss = STATUS_STYLE[r.status] || STATUS_STYLE.available;
            return (
              <div key={r.id} onClick={() => onOpen(r)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < saved.length - 1 ? `1px solid ${DM.borderSub}` : "none", cursor: "pointer" }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: DM.surface, border: `1px solid ${DM.borderSub}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <tm.Icon size={15} color={DM.tealMid} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: DM.text, fontFamily: "DM Sans,sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                  <div style={{ fontSize: 9, color: DM.textMuted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{tm.label} · <span style={{ color: ss.color }}>{ss.label}</span></div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onWatch(r.id); }} style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${DM.accent}`, background: DM.accentDim, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                  <Bookmark size={11} color={DM.accent} fill={DM.accent} />
                </button>
              </div>
            );
          })
        )}
      </ModuleCard>

      <ModuleCard
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={DM.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        }
        title="Recently Added"
        badge="New"
        badgeStyle={{ background: "rgba(37,99,235,0.15)", color: "#60A5FA", border: "1px solid rgba(37,99,235,0.2)" }}
        defaultOpen={true}
      >
        {recent.map((r, i) => {
          const tm = TYPE_META[r.type] || TYPE_META.report;
          return (
            <div key={r.id} onClick={() => onOpen(r)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < recent.length - 1 ? `1px solid ${DM.borderSub}` : "none", cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: DM.surface, border: `1px solid ${DM.borderSub}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <tm.Icon size={15} color={DM.tealMid} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: DM.text, fontFamily: "DM Sans,sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                <div style={{ fontSize: 9, color: "#60A5FA", fontFamily: "Inter,sans-serif", marginTop: 2, fontWeight: 700 }}>NEW · {r.fileFormat || tm.label}</div>
              </div>
              <span style={{ fontSize: 9, color: DM.textFaint, fontFamily: "Inter,sans-serif", flexShrink: 0 }}>{r.downloads} dl</span>
            </div>
          );
        })}
      </ModuleCard>
    </div>
  );
}

/* ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────── */
interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MobileBottomNav({ activeTab, setActiveTab }: MobileBottomNavProps) {
  const NAV = [
    { id: "library", label: "Library", icon: (c: string) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>) },
    { id: "reports", label: "Reports", icon: (c: string) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>) },
    { id: "guides", label: "Guides", icon: (c: string) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>) },
    { id: "datasets", label: "Datasets", icon: (c: string) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>) },
    { id: "saved", label: "Saved", icon: (c: string) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>) },
  ];
  return (
    <div
      style={{
        flexShrink: 0,
        background: DM.navBg,
        borderTop: `1px solid ${DM.line}`,
        display: "flex",
        paddingBottom: "env(safe-area-inset-bottom,0px)",
      }}
    >
      {NAV.map((n) => {
        const act = n.id === activeTab;
        return (
          <button
            key={n.id}
            onClick={() => setActiveTab(n.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0 0 10px",
              paddingTop: 0,
              position: "relative",
            }}
          >
            {act && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 28,
                  height: 2,
                  borderRadius: 1,
                  background: DM.accent,
                }}
              />
            )}
            <div style={{ marginTop: 10 }}>{n.icon(act ? DM.accent : DM.textMuted)}</div>
            <span
              style={{
                fontSize: 9,
                fontWeight: act ? 700 : 400,
                color: act ? DM.accent : DM.textMuted,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {n.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
