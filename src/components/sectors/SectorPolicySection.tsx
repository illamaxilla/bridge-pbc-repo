// ============================================================================
// BRIDGE PBC — Shared Sector Policy Section
// Replaces duplicated PolicyAlignmentSection / GovernancePolicySection /
// PolicyCardSection across all sector pages.
// ============================================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollIndex } from "@/hooks/useScrollIndex";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PolicyItem {
  policy: string;
  body: string;
  allocation: string;
  category: string;
  alignment: string;
  bridgeRole: string;
  bridgeVentures: string[];
  pillars?: string[];
}

export interface PolicyCategory {
  id: string;
  label: string;
  short: string;
}

export interface SectorPolicySectionProps {
  /** Array of policy objects to display */
  policies: PolicyItem[];
  /** Pill label shown above the heading (default: "Governance & Policy") */
  pillLabel?: string;
  /** Main heading — can include JSX for accent spans */
  title: React.ReactNode;
  /** Subtitle paragraph below heading */
  subtitle: string;
  /** CTA button text (default: "View Partnership Strategy") */
  ctaLabel?: string;
  /** CTA link href (default: "/methodology") */
  ctaHref?: string;
  /** Section background color (default: colors.white) */
  backgroundColor?: string;
  /** Override the default category filter pills */
  categories?: PolicyCategory[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CONTENT_MAX_WIDTH = layout.maxWidth;

const CATEGORIES = [
  { id: "all", label: "All", short: "All" },
  { id: "funding", label: "Direct Funding", short: "Funding" },
  { id: "tax", label: "Tax Incentives", short: "Tax" },
  { id: "infrastructure", label: "Infrastructure", short: "Infra" },
  { id: "partnerships", label: "Partnerships", short: "Partners" },
];

const CAT_BADGE: Record<string, { bg: string; border: string }> = {
  funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
  tax: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
  regulatory: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
  infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
  partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
};

const CAT_LABELS: Record<string, string> = {
  funding: "Direct Funding",
  tax: "Tax & Regulatory",
  regulatory: "Regulatory",
  infrastructure: "Infrastructure",
  partnerships: "Partnerships",
};


// ---------------------------------------------------------------------------
// ScrollDots
// ---------------------------------------------------------------------------

const ScrollDots: React.FC<{
  count: number;
  activeIndex: number;
  onDotClick?: (idx: number) => void;
}> = ({ count, activeIndex, onDotClick }) => (
  <div className="flex justify-center items-center gap-2 mt-5">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        onClick={() => onDotClick?.(i)}
        className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
        style={{
          width: i === activeIndex ? "24px" : "8px",
          backgroundColor: i === activeIndex ? colors.accent : colors.line,
        }}
      />
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// PolicyCard
// ---------------------------------------------------------------------------

const PolicyCard: React.FC<{
  policy: PolicyItem;
  isExpanded: boolean;
  onToggle: () => void;
  isMobile: boolean;
}> = ({ policy, isExpanded, onToggle, isMobile }) => {
  const badge = CAT_BADGE[policy.category] || CAT_BADGE.funding;

  return (
    <div
      onClick={onToggle}
      className="transition-all duration-300 ease-in-out"
      style={{
        minWidth: isExpanded
          ? isMobile
            ? "calc(100vw - 56px)"
            : "420px"
          : isMobile
            ? "calc(100vw - 56px)"
            : "280px",
        maxWidth: isExpanded
          ? isMobile
            ? "calc(100vw - 56px)"
            : "420px"
          : isMobile
            ? "calc(100vw - 56px)"
            : "280px",
        backgroundColor: colors.background,
        border: isExpanded
          ? `2px solid ${colors.accent}`
          : `1px solid ${colors.line}`,
        borderRadius: "16px",
        padding: isMobile ? "20px" : "24px",
        cursor: "pointer",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column" as const,
        scrollSnapAlign: "start",
        ...(!isExpanded && !isMobile ? { minHeight: "280px" } : {}),
      }}
    >
      {/* Top row: category badge + body */}
      <div className="flex justify-between items-center mb-3 gap-2 flex-wrap">
        <span
          className="font-[Inter,sans-serif] text-[9px] font-bold uppercase tracking-[0.5px] py-[4px] px-[10px] rounded-full whitespace-nowrap"
          style={{
            color: colors.primary,
            backgroundColor: badge.bg,
            border: `1px solid ${badge.border}`,
          }}
        >
          {CAT_LABELS[policy.category] || policy.category}
        </span>
        <span className="font-[Inter,sans-serif] text-[10px] text-[#999]">
          {policy.body}
        </span>
      </div>

      {/* Policy name */}
      <h4
        className="font-[Inter,sans-serif] text-base font-bold mt-0 ml-0 mr-0 mb-[10px] leading-[1.3]"
        style={{
          color: colors.primary,
          minHeight: isMobile ? "auto" : "42px",
        }}
      >
        {policy.policy}
      </h4>

      {/* Allocation */}
      <div
        className="font-[Inter,sans-serif] text-[13px] font-bold mb-[10px]"
        style={{ color: colors.accent }}
      >
        {policy.allocation}
      </div>

      {/* Alignment text */}
      <p
        className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.5] mt-0 ml-0 mr-0 mb-4"
        style={{ minHeight: isMobile ? "auto" : "40px" }}
      >
        {policy.alignment}
      </p>

      {/* Expand hint / chevron */}
      <div className="flex items-center gap-[6px] mt-auto">
        <span
          className="font-[Inter,sans-serif] text-[12px] font-medium"
          style={{ color: isExpanded ? colors.primary : "#bbb" }}
        >
          {isExpanded ? "Show less" : "BRIDGE alignment"}
        </span>
        <ChevronDown
          size={12}
          strokeWidth={2.5}
          color={isExpanded ? colors.primary : "#ccc"}
          style={{
            transform: isExpanded ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
          }}
        />
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div
          className="mt-4 pt-4 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ borderTop: `1px solid ${colors.line}` }}
        >
          {/* BRIDGE role */}
          <p className="font-[Inter,sans-serif] text-[13px] text-[#444] leading-[1.55] mt-0 ml-0 mr-0 mb-[14px]">
            {policy.bridgeRole}
          </p>

          {/* Pillars */}
          {policy.pillars && policy.pillars.length > 0 && (
            <div className="flex flex-wrap gap-[6px] mb-[14px]">
              {policy.pillars.map((pill, i) => (
                <span
                  key={i}
                  className="py-1 px-[10px] rounded-full text-[10px] font-semibold font-[Inter,sans-serif] whitespace-nowrap"
                  style={{
                    backgroundColor: colors.white,
                    color: colors.primary,
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          )}

          {/* BRIDGE Ventures */}
          {policy.bridgeVentures && policy.bridgeVentures.length > 0 && (
            <div>
              <div className="font-[Inter,sans-serif] text-[9px] font-bold text-[#999] uppercase tracking-[1px] mb-2">
                Connected Ventures
              </div>
              <div className="flex flex-col gap-1.5">
                {policy.bridgeVentures.map((v, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg py-2 px-3"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: colors.accent }}
                    />
                    <span
                      className="font-[Inter,sans-serif] text-xs font-medium"
                      style={{ color: colors.white }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Section Component
// ---------------------------------------------------------------------------

export const SectorPolicySection: React.FC<SectorPolicySectionProps> = ({
  policies,
  pillLabel = "Governance & Policy",
  title,
  subtitle,
  ctaLabel = "View Partnership Strategy",
  ctaHref = "/methodology",
  backgroundColor = colors.white,
  categories: categoriesProp,
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const resolvedCategories = categoriesProp || CATEGORIES;

  const filteredPolicies =
    activeCategory === "all"
      ? policies
      : policies.filter((p) => p.category === activeCategory);

  const policyScroll = useScrollIndex(filteredPolicies.length);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setExpandedCard(null);
  };

  return (
    <section
      style={{
        backgroundColor,
        padding: isMobile ? "60px 0" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Pill */}
        <div
          style={{
            padding: isMobile ? "0 20px" : 0,
            textAlign: isMobile ? "left" : "center",
          }}
        >
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              border: `1px solid ${colors.line}`,
            }}
          >
            {pillLabel}
          </span>
        </div>

        {/* Header */}
        <div
          style={{
            textAlign: isMobile ? "left" : "center",
            marginBottom: isMobile ? "24px" : "40px",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: isMobile ? "0 0 16px 0" : "0 auto 16px",
              maxWidth: "900px",
            }}
          >
            {title}
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#555] leading-[1.65]"
            style={{
              fontSize: isMobile ? "14px" : "16px",
              maxWidth: "750px",
              margin: isMobile ? "0 0 28px" : "0 auto 28px",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Category filter pills */}
        <div
          style={{
            display: "flex",
            gap: isMobile ? "6px" : "10px",
            justifyContent: isMobile ? "flex-start" : "center",
            marginBottom: "24px",
            padding: isMobile ? "0 20px" : 0,
            overflowX: isMobile ? "auto" : "visible",
          }}
        >
          {resolvedCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  padding: isMobile ? "6px 14px" : "8px 18px",
                  borderRadius: "50px",
                  border: isActive
                    ? `1.5px solid ${colors.accent}`
                    : `1px solid ${colors.line}`,
                  backgroundColor: isActive
                    ? "rgba(184,217,53,0.08)"
                    : "transparent",
                  color: isActive ? colors.primary : "#888",
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "11px" : "13px",
                  fontWeight: isActive ? "700" : "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {isMobile ? cat.short : cat.label}
              </button>
            );
          })}
        </div>

        {/* Horizontal Scrollable Card Row */}
        <div
          ref={isMobile ? policyScroll.scrollRef : null}
          onScroll={isMobile ? policyScroll.onScroll : undefined}
          className="hide-scrollbar"
          style={{
            overflowX: "auto",
            paddingLeft: isMobile ? "20px" : 0,
            paddingRight: isMobile ? "20px" : 0,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-4" style={{ alignItems: "flex-start" }}>
            {filteredPolicies.map((policy, idx) => (
              <PolicyCard
                key={`${activeCategory}-${idx}`}
                policy={policy}
                isExpanded={expandedCard === idx}
                onToggle={() =>
                  setExpandedCard(expandedCard === idx ? null : idx)
                }
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        {/* Scroll dots — mobile only */}
        {isMobile && (
          <ScrollDots
            count={filteredPolicies.length}
            activeIndex={policyScroll.activeIndex}
            onDotClick={policyScroll.scrollTo}
          />
        )}

        {/* Bottom CTA Bar */}
        <div
          className="rounded-2xl flex justify-between"
          style={{
            backgroundColor: colors.primary,
            padding: isMobile ? "24px 20px" : "28px 32px",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? "16px" : "24px",
            margin: isMobile ? "32px 20px 0" : "40px 0 0",
            display: "flex",
          }}
        >
          <div className="flex-1">
            <div
              className="font-[Inter,sans-serif] font-semibold mb-1.5"
              style={{
                fontSize: isMobile ? "16px" : "18px",
                color: colors.white,
              }}
            >
              BRIDGE complements {"\u2014"} never competes with {"\u2014"}{" "}
              government vision.
            </div>
            <p className="font-[Inter,sans-serif] text-sm text-white/60 leading-[1.5] m-0">
              Every venture aligns with at least one active government policy or
              initiative.
            </p>
          </div>
          <a
            href={ctaHref}
            onClick={(e) => {
              e.preventDefault();
              navigate(ctaHref);
            }}
            className="py-3 px-6 rounded-full font-[Inter,sans-serif] text-[13px] font-bold no-underline whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
            }}
          >
            {ctaLabel}
            <ArrowRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SectorPolicySection;
