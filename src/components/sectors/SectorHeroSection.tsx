// ============================================================================
// BRIDGE PBC — Shared Sector Hero Section
// Replaces duplicated HeroSection across all sector pages.
// ============================================================================

import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import { IconArrowRight, IconArrowDown } from "@/components/icons/SectorIcons";
import type { SectorData } from "@/data/sectors/types";

const CONTENT_MAX_WIDTH = layout.maxWidth;

interface SectorHeroSectionProps {
  sector: SectorData;
}

const SectorHeroSection = ({ sector }: SectorHeroSectionProps) => {
  const isMobile = useIsMobile();
  return (
    <section
      className="relative flex flex-col"
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "80px 20px 20px" : "112px 80px 20px",
        minHeight: isMobile ? "auto" : "calc(100vh - 100px)",
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div
          className="grid items-start flex-1"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 420px",
            gap: isMobile ? "32px" : "60px",
          }}
        >
          <div>
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="rounded-full text-[11px] font-bold uppercase tracking-[1.5px] font-[Inter,sans-serif] px-4 py-2"
                style={{
                  backgroundColor: colors.accentLight,
                  color: colors.primary,
                }}
              >
                {sector.category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-[Inter,sans-serif] font-normal leading-[1.1] tracking-[-1px] mb-5 mt-0"
              style={{
                fontSize: isMobile ? "30px" : "52px",
                color: colors.primary,
              }}
            >
              <span className="font-bold">{sector.heroTitleBold}</span>{" "}
              {!isMobile && <br />}
              {sector.heroTitleRest}
            </h1>

            {/* Subheading */}
            <h2
              className="font-[Inter,sans-serif] font-semibold leading-[1.3] mt-0 mb-4"
              style={{
                fontSize: isMobile ? "20px" : "24px",
                color: colors.dark,
              }}
            >
              {sector.problemHeadline}
            </h2>

            {/* Description */}
            <p
              className="font-[Inter,sans-serif] font-normal leading-[1.7] text-[#555] mt-0 mb-9 max-w-[540px]"
              style={{
                fontSize: isMobile ? "15px" : "16px",
              }}
            >
              {sector.problemSubheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3" style={{ flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <button
                className="border-none rounded-full font-semibold font-[Inter,sans-serif] cursor-pointer flex items-center gap-[10px]"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  padding: isMobile ? "14px 20px" : "16px 24px",
                  fontSize: isMobile ? "14px" : "15px",
                  flex: isMobile ? "1 1 100%" : "none",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                Request Full Analysis
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.white,
                  }}
                >
                  <IconArrowRight />
                </span>
              </button>
              <button
                className="bg-transparent rounded-full font-semibold font-[Inter,sans-serif] cursor-pointer"
                style={{
                  color: colors.primary,
                  border: `2px solid ${colors.line}`,
                  padding: isMobile ? "14px 20px" : "16px 24px",
                  fontSize: isMobile ? "14px" : "15px",
                  flex: isMobile ? "1 1 100%" : "none",
                }}
              >
                Download Summary
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div
            className="rounded-[20px]"
            style={{
              backgroundColor: colors.primary,
              padding: isMobile ? "24px" : "32px",
              minWidth: isMobile ? "auto" : "340px",
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-[1.5px] font-[Inter,sans-serif]">
                Sector Overview
              </span>
              <span
                className="rounded-full text-[11px] font-bold uppercase tracking-[1px] px-[14px] py-1.5"
                style={{
                  backgroundColor: "rgba(184, 217, 53, 0.15)",
                  color: colors.accent,
                }}
              >
                Active
              </span>
            </div>

            {/* Main Stats Row */}
            <div className="flex justify-between items-end mt-5 pb-6 border-b border-white/10">
              <div>
                <div
                  className="text-[36px] font-bold font-[Inter,sans-serif] leading-none mb-2 whitespace-nowrap"
                  style={{ color: colors.accent }}
                >
                  {sector.capitalRange}
                </div>
                <div className="text-[13px] font-medium text-white/50 font-[Inter,sans-serif] whitespace-nowrap">
                  Investment Range
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-[36px] font-bold font-[Inter,sans-serif] leading-none mb-2 whitespace-nowrap"
                  style={{ color: colors.accent }}
                >
                  {sector.ventures}
                </div>
                <div className="text-[13px] font-medium text-white/50 font-[Inter,sans-serif] whitespace-nowrap">
                  Identified Ventures
                </div>
              </div>
            </div>

            {/* Stat Rows */}
            {sector.keyStats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center py-4">
                <div>
                  <span className="text-[15px] font-medium text-white/80 font-[Inter,sans-serif] block">
                    {stat.label}
                  </span>
                  {stat.detail && (
                    <span className="text-[12px] font-normal text-white/35 font-[Inter,sans-serif] italic mt-0.5 block">
                      {stat.detail}
                    </span>
                  )}
                </div>
                <span
                  className="text-[20px] font-semibold font-[Inter,sans-serif]"
                  style={{ color: colors.accent }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Explore — desktop only */}
      {!isMobile && (
        <div className="flex flex-col items-center mt-auto pt-[10px] pb-[10px]">
          <span className="font-[Inter,sans-serif] text-[13px] text-[#999] mb-2">
            Explore Analysis
          </span>
          <div className="text-[#999] animate-bounce">
            <IconArrowDown />
          </div>
        </div>
      )}
    </section>
  );
};

export default SectorHeroSection;
