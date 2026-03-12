// ============================================================================
// BRIDGE PBC — Sector Data Index
// Re-exports all sector data files for centralized access.
//
// To add a new sector:
// 1. Create src/data/sectors/{slug}.ts using the SectorData interface
// 2. Export it here
// 3. Add it to the SECTORS_BY_SLUG map
// ============================================================================

export type { SectorData } from "./types";
export { energySector } from "./energy";

// Lookup map for dynamic access by slug
import { energySector } from "./energy";
import type { SectorData } from "./types";

export const SECTORS_BY_SLUG: Record<string, SectorData> = {
  energy: energySector,
  // TODO: Extract remaining sector data files:
  // technology: technologySector,
  // sports: sportsSector,
  // transport: transportSector,
  // manufacturing: manufacturingSector,
  // housing: housingSector,
  // financial: financialSector,
  // health: healthSector,
  // infrastructure: infrastructureSector,
  // tourism: tourismSector,
  // education: educationSector,
  // agriculture: agricultureSector,
};
