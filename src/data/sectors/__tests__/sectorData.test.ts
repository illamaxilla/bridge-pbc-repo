import { describe, it, expect } from "vitest";
import { SECTORS_BY_SLUG } from "../index";
import type { SectorData } from "../types";

const ALL_SLUGS = Object.keys(SECTORS_BY_SLUG);

describe("All sector data validation", () => {
  it("contains exactly 12 sectors", () => {
    expect(ALL_SLUGS).toHaveLength(12);
  });

  describe.each(ALL_SLUGS)("sector: %s", (slug) => {
    let sector: SectorData;

    beforeEach(() => {
      sector = SECTORS_BY_SLUG[slug];
    });

    // --- Top-level required fields ---
    it("has all required scalar fields", () => {
      expect(sector.id).toBeDefined();
      expect(typeof sector.id).toBe("number");
      expect(sector.slug).toBe(slug);
      expect(sector.name).toBeTruthy();
      expect(sector.shortName).toBeTruthy();
      expect(sector.category).toBeTruthy();
      expect(sector.categoryColor).toBeTruthy();
      expect(sector.capitalRange).toBeTruthy();
      expect(typeof sector.ventures).toBe("number");
      expect(sector.ventures).toBeGreaterThan(0);
      expect(sector.jobsImpact).toBeTruthy();
      expect(sector.gdpContribution).toBeTruthy();
      expect(sector.problemSubheadline).toBeTruthy();
    });

    // --- KeyStats ---
    it("has non-empty keyStats with required fields", () => {
      expect(sector.keyStats.length).toBeGreaterThan(0);
      sector.keyStats.forEach((stat) => {
        expect(stat.value).toBeTruthy();
        expect(stat.label).toBeTruthy();
        expect(stat.detail).toBeTruthy();
      });
    });

    // --- PainPoints ---
    it("has non-empty painPoints with required fields", () => {
      expect(sector.painPoints.length).toBeGreaterThan(0);
      sector.painPoints.forEach((pp) => {
        expect(pp.title).toBeTruthy();
        expect(pp.description).toBeTruthy();
        expect(pp.quantification).toBeTruthy();
      });
    });

    // --- Solutions ---
    it("has non-empty solutions with valid tiers and scores", () => {
      expect(sector.solutions.length).toBeGreaterThan(0);
      sector.solutions.forEach((s) => {
        expect([1, 2, 3]).toContain(s.tier);
        expect(s.name).toBeTruthy();
        expect(s.description).toBeTruthy();
        expect(s.capital).toBeTruthy();
        expect(typeof s.score).toBe("number");
        expect(s.score).toBeGreaterThan(0);
        expect(s.score).toBeLessThanOrEqual(100);
        expect(s.impact).toBeTruthy();
        expect(s.model).toBeTruthy();
      });
    });

    it("has solutions sorted by tier (tier 1 first, tier 3 last)", () => {
      const tiers = sector.solutions.map((s) => s.tier);
      // Each tier group should come before the next
      let lastTier = 0;
      tiers.forEach((tier) => {
        expect(tier).toBeGreaterThanOrEqual(lastTier);
        lastTier = tier;
      });
    });

    // --- Competitors ---
    it("has non-empty competitors with valid enums", () => {
      expect(sector.competitors.length).toBeGreaterThan(0);
      sector.competitors.forEach((c) => {
        expect(c.name).toBeTruthy();
        expect(c.focus).toBeTruthy();
        expect(["Collaborate", "Parallel", "Monitor"]).toContain(c.partnershipType);
        expect(["High", "Medium", "Low"]).toContain(c.priority);
        expect(c.strengths.length).toBeGreaterThan(0);
        c.strengths.forEach((str) => {
          expect(str.name).toBeTruthy();
          expect(str.rating).toBeGreaterThanOrEqual(1);
          expect(str.rating).toBeLessThanOrEqual(5);
        });
        expect(c.gaps.length).toBeGreaterThan(0);
        expect(c.synergyAreas.length).toBeGreaterThan(0);
      });
    });

    // --- CrossSector ---
    it("has non-empty crossSector connections", () => {
      expect(sector.crossSector.length).toBeGreaterThan(0);
      sector.crossSector.forEach((cs) => {
        expect(cs.sectorId).toBeGreaterThan(0);
        expect(cs.name).toBeTruthy();
        expect(cs.connection).toBeTruthy();
        expect(cs.multiplier).toBeTruthy();
        expect(cs.synergies.length).toBeGreaterThan(0);
        expect(cs.bridgeVentures.length).toBeGreaterThan(0);
        expect(cs.impact).toBeTruthy();
      });
    });

    // --- ValueChain ---
    it("has non-empty valueChain stages", () => {
      expect(sector.valueChain.length).toBeGreaterThan(0);
      sector.valueChain.forEach((vc) => {
        expect(vc.stage).toBeTruthy();
        expect(vc.stat).toBeTruthy();
        expect(vc.description).toBeTruthy();
        expect(vc.insight).toBeTruthy();
        expect(vc.ventures.length).toBeGreaterThan(0);
        expect(vc.icon).toBeTruthy();
      });
    });

    // --- Policies ---
    it("has non-empty policies with valid categories", () => {
      expect(sector.policies.length).toBeGreaterThan(0);
      sector.policies.forEach((p) => {
        expect(p.policy).toBeTruthy();
        expect(p.body).toBeTruthy();
        expect(["funding", "tax", "infrastructure", "partnerships"]).toContain(p.category);
        expect(p.alignment).toBeTruthy();
        expect(p.bridgeRole).toBeTruthy();
        expect(p.bridgeVentures.length).toBeGreaterThan(0);
        expect(p.pillars.length).toBeGreaterThan(0);
      });
    });
  });

  // --- Cross-sector referential integrity ---
  it("all crossSector sectorId values reference existing sector IDs", () => {
    const allIds = new Set(ALL_SLUGS.map((slug) => SECTORS_BY_SLUG[slug].id));
    ALL_SLUGS.forEach((slug) => {
      SECTORS_BY_SLUG[slug].crossSector.forEach((cs) => {
        expect(allIds.has(cs.sectorId), `${slug} references unknown sectorId ${cs.sectorId}`).toBe(true);
      });
    });
  });

  it("all sector IDs are unique", () => {
    const ids = ALL_SLUGS.map((slug) => SECTORS_BY_SLUG[slug].id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("categoryColor is a valid hex color for all sectors", () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    ALL_SLUGS.forEach((slug) => {
      expect(SECTORS_BY_SLUG[slug].categoryColor).toMatch(hexRegex);
    });
  });
});
