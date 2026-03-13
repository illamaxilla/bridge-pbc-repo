import { describe, it, expect } from "vitest";
import { SECTORS_BY_SLUG } from "../index";
import type { SectorData } from "../types";

const EXPECTED_SLUGS = [
  "energy", "technology", "sports", "transport", "manufacturing",
  "housing", "financial", "health", "infrastructure", "tourism",
  "education", "agriculture",
];

describe("SECTORS_BY_SLUG", () => {
  it("contains all 12 sectors", () => {
    expect(Object.keys(SECTORS_BY_SLUG)).toHaveLength(12);
    EXPECTED_SLUGS.forEach(slug => {
      expect(SECTORS_BY_SLUG[slug]).toBeDefined();
    });
  });

  it.each(EXPECTED_SLUGS)("%s has correct slug", (slug) => {
    expect(SECTORS_BY_SLUG[slug].slug).toBe(slug);
  });

  it.each(EXPECTED_SLUGS)("%s has all required fields", (slug) => {
    const sector: SectorData = SECTORS_BY_SLUG[slug];
    expect(sector.id).toBeDefined();
    expect(sector.name).toBeTruthy();
    expect(sector.shortName).toBeTruthy();
    expect(sector.category).toBeTruthy();
    expect(sector.keyStats.length).toBeGreaterThan(0);
    expect(sector.painPoints.length).toBeGreaterThan(0);
    expect(sector.solutions.length).toBeGreaterThan(0);
    expect(sector.competitors.length).toBeGreaterThan(0);
    expect(sector.crossSector.length).toBeGreaterThan(0);
    expect(sector.valueChain.length).toBeGreaterThan(0);
    expect(sector.policies.length).toBeGreaterThan(0);
  });

  it.each(EXPECTED_SLUGS)("%s solutions have valid tiers", (slug) => {
    SECTORS_BY_SLUG[slug].solutions.forEach((s) => {
      expect([1, 2, 3]).toContain(s.tier);
    });
  });

  it.each(EXPECTED_SLUGS)("%s competitors have valid partnership types", (slug) => {
    SECTORS_BY_SLUG[slug].competitors.forEach((c) => {
      expect(["Collaborate", "Parallel", "Monitor"]).toContain(c.partnershipType);
      expect(["High", "Medium", "Low"]).toContain(c.priority);
    });
  });

  it.each(EXPECTED_SLUGS)("%s policies have valid categories", (slug) => {
    SECTORS_BY_SLUG[slug].policies.forEach((p) => {
      expect(["funding", "tax", "infrastructure", "partnerships"]).toContain(p.category);
    });
  });
});
