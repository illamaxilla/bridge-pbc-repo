// ============================================================================
// BRIDGE PBC — Shared Sector Solutions Section
// Replaces duplicated SolutionsSection across all sector pages.
// ============================================================================

import React, { useState, useRef, useCallback } from "react";
import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { SectorData, Solution } from "@/data/sectors/types";

const CONTENT_MAX_WIDTH = layout.maxWidth;

// ---------------------------------------------------------------------------
// Filter types
// ---------------------------------------------------------------------------

export interface TierFilter {
  key: string | number;
  label: string;
  /** If provided, only solutions matching this tier value pass. "all" shows everything. */
  tier?: number | "all";
}

export interface SectorSolutionsSectionProps {
  sector: SectorData;
  /**
   * Custom filter definitions. Defaults to All / Flagship / Scaling.
   * Each filter needs a `key` (used for state), a `label` (displayed), and
   * an optional `tier` (the numeric tier to filter by; omit or use "all" for
   * the "show everything" option).
   */
  filters?: TierFilter[];
  /** Optional: override how each solution card is rendered. */
  renderCard?: (solution: Solution, index: number, isMobile: boolean) => React.ReactNode;
  /** Optional: override the heading JSX */
  heading?: React.ReactNode;
  /** Optional: override the description text */
  description?: React.ReactNode;
  /** Max solutions to show (before filtering). Defaults to all. */
  maxSolutions?: number;
  /** Default active filter key on mobile. Defaults to the second filter (first non-all). */
  defaultMobileFilter?: string | number;
  /** Default active filter key on desktop. Defaults to first filter. */
  defaultDesktopFilter?: string | number;
}

// ---------------------------------------------------------------------------
// Default Filters
// ---------------------------------------------------------------------------

const DEFAULT_FILTERS: TierFilter[] = [
  { key: "all", label: "All", tier: "all" },
  { key: 1, label: "Flagship", tier: 1 },
  { key: 2, label: "Scaling", tier: 2 },
];

// ---------------------------------------------------------------------------
// Default Solution Card
// ---------------------------------------------------------------------------

const DefaultSolutionCard = ({
  solution,
  isMobile,
}: {
  solution: Solution;
  index: number;
  isMobile: boolean;
}) => {
  const tierLabel = solution.tier === 1 ? "Flagship" : solution.tier === 2 ? "Scaling" : "Emerging";
  const tierBg =
    solution.tier === 1
      ? "rgba(184, 217, 53, 0.2)"
      : solution.tier === 2
        ? "rgba(27,77,62,0.08)"
        : "rgba(0,0,0,0.04)";

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: colors.white,
        borderRadius: isMobile ? "16px" : "20px",
        padding: isMobile ? "24px" : "28px",
        border: `1px solid ${colors.line}`,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Tier badge + Score */}
      <div className="flex justify-between items-center mb-4">
        <span
          className="py-[5px] px-3 rounded-full text-[11px] font-bold font-[Inter,sans-serif] uppercase tracking-[0.5px]"
          style={{ backgroundColor: tierBg, color: colors.primary }}
        >
          {tierLabel}
        </span>
        <span
          className="font-[Poppins,sans-serif] text-[15px] font-bold"
          style={{ color: colors.primary }}
        >
          {solution.score}
          <span className="text-[#ccc] font-medium">/50</span>
        </span>
      </div>

      {/* Name */}
      <h3
        className="font-[Inter,sans-serif] font-semibold m-0 mb-3 leading-[1.3]"
        style={{
          fontSize: isMobile ? "17px" : "18px",
          color: colors.dark,
          minHeight: isMobile ? "auto" : "44px",
        }}
      >
        {solution.name}
      </h3>

      {/* Description */}
      <p
        className="font-[Inter,sans-serif] text-[14px] text-[#666] leading-[1.6] m-0 mb-5 flex-1"
        style={{ minHeight: isMobile ? "auto" : "66px" }}
      >
        {solution.description}
      </p>

      {/* Impact */}
      <div
        className="rounded-xl py-[10px] px-[14px] mb-4"
        style={{ backgroundColor: colors.accentLight }}
      >
        <span
          className="font-[Inter,sans-serif] text-[13px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis block"
          style={{ color: colors.primary }}
        >
          {solution.impact}
        </span>
      </div>

      {/* Capital */}
      <div className="pt-4" style={{ borderTop: `1px solid ${colors.line}` }}>
        <div
          className="text-[18px] font-bold font-[Poppins,sans-serif]"
          style={{ color: colors.primary }}
        >
          {solution.capital}
        </div>
        <div className="text-[11px] text-[#999] font-[Inter,sans-serif]">Capital Required</div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Scroll helpers (inlined to avoid extra dependencies)
// ---------------------------------------------------------------------------

function useScrollIndex(count: number) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !el.children.length) return;
    const child = (el.children[0] as HTMLElement)?.children?.[0] || el.children[0];
    if (!child) return;
    const childWidth =
      (child as HTMLElement).offsetWidth +
      parseInt(getComputedStyle(el.children[0] as Element || el).gap || "0", 10);
    const idx = Math.round(el.scrollLeft / (childWidth || 1));
    setActiveIndex(Math.min(Math.max(idx, 0), count - 1));
  }, [count]);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const child = (el.children[0] as HTMLElement)?.children?.[0] || el.children[0];
    if (!child) return;
    const gap = parseInt(getComputedStyle(el.children[0] as Element || el).gap || "0", 10);
    const childWidth = (child as HTMLElement).offsetWidth + gap;
    el.scrollTo({ left: idx * childWidth, behavior: "smooth" });
  }, []);

  return { scrollRef, activeIndex, onScroll, scrollTo };
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const SectorSolutionsSection: React.FC<SectorSolutionsSectionProps> = ({
  sector,
  filters = DEFAULT_FILTERS,
  renderCard,
  heading,
  description,
  maxSolutions,
  defaultMobileFilter,
  defaultDesktopFilter,
}) => {
  const isMobile = useIsMobile();

  // Determine default filter
  const mobileDefault = defaultMobileFilter ?? (filters.length > 1 ? filters[1].key : filters[0].key);
  const desktopDefault = defaultDesktopFilter ?? filters[0].key;
  const [activeFilter, setActiveFilter] = useState<string | number>(
    isMobile ? mobileDefault : desktopDefault,
  );

  // Build the filtered list
  const activeFilterDef = filters.find((f) => f.key === activeFilter) || filters[0];
  const isAll = !activeFilterDef.tier || activeFilterDef.tier === "all";

  let filtered = isAll
    ? sector.solutions
    : sector.solutions.filter((s) => s.tier === activeFilterDef.tier);

  if (maxSolutions) {
    filtered = filtered.slice(0, maxSolutions);
  }

  const scroll = useScrollIndex(filtered.length);

  // Default heading
  const defaultHeading = (
    <h2
      className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[900px] mt-0 mb-5"
      style={{
        fontSize: isMobile ? "28px" : "42px",
        color: colors.white,
      }}
    >
      Ventures That Build{" "}
      <span className="font-semibold" style={{ color: colors.accent }}>
        Lasting Value
      </span>
    </h2>
  );

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header area */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          {/* Pill */}
          <span
            className="inline-block bg-white/[0.08] border border-white/15 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{ color: colors.accent }}
          >
            The Pathway to Impact
          </span>

          {/* Heading */}
          {heading || defaultHeading}

          {/* Description + Filters row */}
          <div
            className="flex justify-between"
            style={{
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "flex-end",
              gap: isMobile ? "20px" : "24px",
            }}
          >
            {description && (
              <p
                className="font-[Inter,sans-serif] text-white/60 max-w-[600px] m-0 leading-[1.65]"
                style={{ fontSize: isMobile ? "15px" : "16px" }}
              >
                {description}
              </p>
            )}

            {/* Tier filter buttons */}
            <div
              className="inline-flex gap-1 shrink-0 rounded-full p-1 border border-white/15"
              style={{ marginLeft: !description && !isMobile ? "auto" : undefined }}
            >
              {filters.map((f) => {
                const isActive = activeFilter === f.key;
                return (
                  <button
                    key={String(f.key)}
                    onClick={() => setActiveFilter(f.key)}
                    className="border-none rounded-full font-[Inter,sans-serif] cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap"
                    style={{
                      backgroundColor: isActive ? colors.accent : "transparent",
                      color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      padding: isMobile ? "6px 14px" : "8px 18px",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: isActive ? "700" : "500",
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cards Grid / Mobile Carousel */}
        <div
          ref={isMobile ? scroll.scrollRef : undefined}
          onScroll={isMobile ? scroll.onScroll : undefined}
          className={isMobile ? "hide-scrollbar" : undefined}
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  margin: "0 -20px",
                  padding: "0 20px 8px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                }
          }
        >
          {filtered.map((solution, i) => (
            <div
              key={`${solution.name}-${i}`}
              style={
                isMobile
                  ? {
                      minWidth: "80%",
                      maxWidth: "80%",
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                    }
                  : {}
              }
            >
              {renderCard ? (
                renderCard(solution, i, isMobile)
              ) : (
                <DefaultSolutionCard solution={solution} index={i} isMobile={isMobile} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Scroll Dots */}
        {isMobile && filtered.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            {filtered.map((_, i) => (
              <div
                key={i}
                onClick={() => scroll.scrollTo(i)}
                className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
                style={{
                  width: i === scroll.activeIndex ? "24px" : "8px",
                  backgroundColor:
                    i === scroll.activeIndex ? colors.accent : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SectorSolutionsSection;
