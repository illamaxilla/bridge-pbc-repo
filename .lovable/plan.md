
## Root Cause

The three files are fundamentally broken — not just missing footer code. The previous AI pass deleted **thousands of lines** of section component definitions:

- `Energy.tsx`: 547 lines (should be ~6500+ lines like other sector pages). Missing: `HeroSection`, `OpportunitySection`, `ValueChainSection`, `SolutionsSection`, `LandscapeSection`, `GovernancePolicySection`, `RippleEffectSection`, `InvestmentCTASection`, `ImpactSection`, `FinalCTASection`, and `sectorData`.
- `Education.tsx`: 871 lines (missing: `HeroSection`, `ProblemSection`, `ValueChainSectionPremium`, `SolutionsSection`, `CompetitiveLandscapeSection`, `PolicyAlignmentSection`, `CrossSectorSection`, `InvestmentCTASection`, `ImpactSection`, `FinalCTASection`)
- `Tourism.tsx`: 1350 lines (missing: `sectorRoutes`, `HeroSection`, `ProblemSection`, `ValueChainSectionPremium`, `SolutionsSection`, `CompetitiveLandscapeSection`, `PolicyAlignmentSection`, `ImpactSection`, `CrossSectorSection`, `InvestmentCTASection`, `FinalCTASection`)

These thousands of lines of JSX component code **cannot be reconstructed by the AI** — they were unique, detailed components with specific data, styling, and layout.

## The Only Correct Fix: Version History Revert

These files must be reverted to a known-good version from History. After reverting, I can **surgically add just 2 lines** to each file:
1. Add `import SiteFooter from "@/components/SiteFooter";` at the top
2. Replace the local `<Footer />` (or `{Footer()}` etc.) call with `<SiteFooter />`
3. Remove the local `footerLinkHref` function and local `Footer` component body

This is a 2-minute surgical edit per file — not a rebuild.

## How to Revert

Use the **History tab** (top of chat) to find a version before the last two AI edit passes (the "SiteFooter" pass). Look for a version where all three files still had their full content. Revert to that point.

After reverting, I will immediately make the surgical 3-step swap in all 3 files without touching anything else.
