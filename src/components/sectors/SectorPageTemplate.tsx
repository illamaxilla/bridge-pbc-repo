// ============================================================================
// BRIDGE PBC — Sector Page Template
// Shared layout composition for all 12 sector pages. Each page provides its
// sector data and per-page section overrides via props.
// ============================================================================

import React from "react";
import { Layout } from "@/components/Layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { colors } from "@/lib/theme";
import type { SectorData } from "@/data/sectors/types";
import type { TierFilter } from "@/components/sectors/SectorSolutionsSection";
import type { PolicyCategory } from "@/components/sectors/SectorPolicySection";
import SectorHeroSection from "@/components/sectors/SectorHeroSection";
import SectorSolutionsSection from "@/components/sectors/SectorSolutionsSection";
import { SectorPolicySection } from "@/components/sectors/SectorPolicySection";
import SectorFinalCTA from "@/components/sectors/SectorFinalCTA";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface SectorPageConfig {
  /** The sector data object from data/sectors/ */
  sector: SectorData;

  // ── Inline section render props ──────────────────────────────────────────
  /** Renders the problem/opportunity section (2nd section) */
  renderProblemSection: () => React.ReactNode;
  /** Renders the value chain section (3rd section) */
  renderValueChainSection: () => React.ReactNode;
  /** Renders the competitive landscape / market ecosystem section (5th section) */
  renderEcosystemSection: () => React.ReactNode;
  /** Renders the cross-sector connections section (7th section) */
  renderCrossSectorSection?: () => React.ReactNode;
  /** Renders the investment CTA section (8th section) */
  renderInvestmentSection: () => React.ReactNode;
  /** Renders the impact metrics section (9th section) */
  renderImpactSection: () => React.ReactNode;

  // ── Extracted component config ───────────────────────────────────────────
  /** Custom filters for SectorSolutionsSection */
  solutionFilters?: TierFilter[];
  /** Max solutions to show */
  maxSolutions?: number;

  /** Policies array for SectorPolicySection (defaults to sector.policies) */
  policies?: Array<{
    policy: string;
    body: string;
    allocation: string;
    category: string;
    alignment: string;
    bridgeRole: string;
    bridgeVentures: string[];
    pillars?: string[];
  }>;
  /** Policy section title (JSX) */
  policyTitle: React.ReactNode;
  /** Policy section subtitle */
  policySubtitle: string;
  /** Custom policy categories */
  policyCategories?: PolicyCategory[];
  /** Custom policy CTA label */
  policyCTALabel?: string;
  /** Custom policy CTA href */
  policyCTAHref?: string;

  /** Final CTA heading (JSX) */
  ctaHeading: React.ReactNode;
  /** Final CTA description */
  ctaDescription: string;
  /** Final CTA pill text override */
  ctaPillText?: string;
  /** Final CTA primary button text */
  ctaPrimaryButtonText?: string;
  /** Final CTA primary button link */
  ctaPrimaryButtonLink?: string;
  /** Final CTA secondary button text */
  ctaSecondaryButtonText?: string;
  /** Final CTA secondary button link */
  ctaSecondaryButtonLink?: string;

  // ── Section ordering override ────────────────────────────────────────────
  /** If true, policy section renders before ecosystem section (Manufacturing) */
  policyBeforeEcosystem?: boolean;
}

// ---------------------------------------------------------------------------
// Template Component
// ---------------------------------------------------------------------------

export default function SectorPageTemplate({
  sector,
  renderProblemSection,
  renderValueChainSection,
  renderEcosystemSection,
  renderCrossSectorSection,
  renderInvestmentSection,
  renderImpactSection,
  solutionFilters,
  maxSolutions,
  policies,
  policyTitle,
  policySubtitle,
  policyCategories,
  policyCTALabel,
  policyCTAHref,
  ctaHeading,
  ctaDescription,
  ctaPillText,
  ctaPrimaryButtonText,
  ctaPrimaryButtonLink,
  ctaSecondaryButtonText,
  ctaSecondaryButtonLink,
  policyBeforeEcosystem = false,
}: SectorPageConfig) {
  const isMobile = useIsMobile();

  const policySection = (
    <SectorPolicySection
      policies={policies ?? sector.policies}
      title={policyTitle}
      subtitle={policySubtitle}
      categories={policyCategories}
      ctaLabel={policyCTALabel}
      ctaHref={policyCTAHref}
    />
  );

  const ecosystemSection = renderEcosystemSection();

  return (
    <Layout>
      <div className="font-[Inter,sans-serif] m-0 p-0" style={{ backgroundColor: colors.white }}>
        {/* 1. Hero */}
        <SectorHeroSection sector={sector} />

        {/* 2. Problem / Opportunity */}
        {renderProblemSection()}

        {/* 3. Value Chain */}
        {renderValueChainSection()}

        {/* 4. Solutions */}
        <SectorSolutionsSection
          sector={sector}
          filters={solutionFilters}
          maxSolutions={maxSolutions}
        />

        {/* 5 & 6. Policy + Ecosystem (order configurable) */}
        {policyBeforeEcosystem ? (
          <>
            {policySection}
            {ecosystemSection}
          </>
        ) : (
          <>
            {ecosystemSection}
            {policySection}
          </>
        )}

        {/* 7. Cross-Sector (optional — some pages omit this) */}
        {renderCrossSectorSection?.()}

        {/* 8. Investment CTA */}
        {renderInvestmentSection()}

        {/* 9. Impact */}
        {renderImpactSection()}

        {/* 10. Final CTA */}
        <SectorFinalCTA
          pillText={ctaPillText}
          heading={ctaHeading}
          description={ctaDescription}
          primaryButtonText={ctaPrimaryButtonText}
          primaryButtonLink={ctaPrimaryButtonLink}
          secondaryButtonText={ctaSecondaryButtonText}
          secondaryButtonLink={ctaSecondaryButtonLink}
        />

        {/* Footer separator */}
        <div style={{ backgroundColor: colors.primary, padding: isMobile ? "0 20px" : "0 80px" }}>
          <div className="h-px bg-white/[0.08]" />
        </div>
      </div>
    </Layout>
  );
}
