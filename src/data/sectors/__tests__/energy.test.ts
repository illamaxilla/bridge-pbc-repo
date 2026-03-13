import { describe, it, expect } from "vitest";
import { energySector } from "../energy";

describe("energySector", () => {
  it("has correct slug and name", () => {
    expect(energySector.slug).toBe("energy");
    expect(energySector.name).toBe("Energy & Renewable Resources");
  });

  it("has 4 key stats", () => {
    expect(energySector.keyStats).toHaveLength(4);
    energySector.keyStats.forEach((stat) => {
      expect(stat.value).toBeTruthy();
      expect(stat.label).toBeTruthy();
      expect(stat.detail).toBeTruthy();
    });
  });

  it("has pain points with required fields", () => {
    expect(energySector.painPoints.length).toBeGreaterThan(0);
    energySector.painPoints.forEach((pp) => {
      expect(pp.title).toBeTruthy();
      expect(pp.description).toBeTruthy();
      expect(pp.quantification).toBeTruthy();
    });
  });

  it("has solutions with valid tiers", () => {
    expect(energySector.solutions.length).toBeGreaterThan(0);
    energySector.solutions.forEach((s) => {
      expect([1, 2, 3]).toContain(s.tier);
      expect(s.name).toBeTruthy();
      expect(s.score).toBeGreaterThan(0);
    });
  });

  it("has competitors with valid partnership types", () => {
    expect(energySector.competitors.length).toBeGreaterThan(0);
    energySector.competitors.forEach((c) => {
      expect(["Collaborate", "Parallel", "Monitor"]).toContain(c.partnershipType);
      expect(["High", "Medium", "Low"]).toContain(c.priority);
    });
  });

  it("has cross-sector connections", () => {
    expect(energySector.crossSector.length).toBeGreaterThan(0);
    energySector.crossSector.forEach((cs) => {
      expect(cs.sectorId).toBeGreaterThan(0);
      expect(cs.synergies.length).toBeGreaterThan(0);
    });
  });

  it("has value chain stages", () => {
    expect(energySector.valueChain).toHaveLength(5);
  });

  it("has policies with valid categories", () => {
    expect(energySector.policies.length).toBeGreaterThan(0);
    energySector.policies.forEach((p) => {
      expect(["funding", "tax", "infrastructure", "partnerships"]).toContain(p.category);
    });
  });
});
