import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { colors } from "@/lib/theme";
import { IconArrowRight } from "@/components/icons/SectorIcons";

interface SectorFinalCTAProps {
  /** The pill/badge text above the heading */
  pillText?: string;
  /** The heading content — accepts JSX for mixed styling */
  heading: React.ReactNode;
  /** The paragraph description below the heading */
  description: string;
  /** Primary (accent) button label */
  primaryButtonText?: string;
  /** Primary button navigation path */
  primaryButtonLink?: string;
  /** Secondary (outline) button label */
  secondaryButtonText?: string;
  /** Secondary button navigation path */
  secondaryButtonLink?: string;
}

const SectorFinalCTA: React.FC<SectorFinalCTAProps> = ({
  pillText = "Be Part of the Journey",
  heading,
  description,
  primaryButtonText = "Start a Conversation",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Explore the Full Analysis",
  secondaryButtonLink = "/resources",
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <section
      className="text-center"
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="max-w-[900px] mx-auto text-center">
        <span
          className="inline-block bg-white/[0.08] border border-white/15 py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
          style={{ color: colors.accent }}
        >
          {pillText}
        </span>

        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] mt-0 mb-6"
          style={{
            fontSize: isMobile ? "32px" : "48px",
            color: colors.white,
          }}
        >
          {heading}
        </h2>

        <p
          className="font-[Inter,sans-serif] leading-[1.7] text-white/60 max-w-[680px] mx-auto mt-0 mb-10"
          style={{ fontSize: isMobile ? "16px" : "18px" }}
        >
          {description}
        </p>

        <div
          className="flex gap-4 justify-center items-center"
          style={{ flexDirection: isMobile ? "column" : "row" }}
        >
          <button
            onClick={() => navigate(primaryButtonLink)}
            className="border-none rounded-full text-[15px] font-semibold font-[Inter,sans-serif] cursor-pointer flex items-center justify-center gap-[10px]"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              padding: isMobile ? "16px 24px" : "16px 32px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            {primaryButtonText}
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
            onClick={() => navigate(secondaryButtonLink)}
            className="bg-transparent border border-white/30 rounded-full text-[15px] font-semibold font-[Inter,sans-serif] cursor-pointer"
            style={{
              color: colors.white,
              padding: isMobile ? "16px 24px" : "16px 32px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectorFinalCTA;
