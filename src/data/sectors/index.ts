// ============================================================================
// BRIDGE PBC — Sector Data Index
// Re-exports all sector data files for centralized access.
// ============================================================================

export type { SectorData } from "./types";
export { energySector } from "./energy";
export { technologySector } from "./technology";
export { sportsSector } from "./sports";
export { transportSector } from "./transport";
export { manufacturingSector } from "./manufacturing";
export { housingSector } from "./housing";
export { financialSector } from "./financial";
export { healthSector } from "./health";
export { infrastructureSector } from "./infrastructure";
export { tourismSector } from "./tourism";
export { educationSector } from "./education";
export { agricultureSector } from "./agriculture";

// Lookup map for dynamic access by slug
import { energySector } from "./energy";
import { technologySector } from "./technology";
import { sportsSector } from "./sports";
import { transportSector } from "./transport";
import { manufacturingSector } from "./manufacturing";
import { housingSector } from "./housing";
import { financialSector } from "./financial";
import { healthSector } from "./health";
import { infrastructureSector } from "./infrastructure";
import { tourismSector } from "./tourism";
import { educationSector } from "./education";
import { agricultureSector } from "./agriculture";
import type { SectorData } from "./types";

export const SECTORS_BY_SLUG: Record<string, SectorData> = {
  energy: energySector,
  technology: technologySector,
  sports: sportsSector,
  transport: transportSector,
  manufacturing: manufacturingSector,
  housing: housingSector,
  financial: financialSector,
  health: healthSector,
  infrastructure: infrastructureSector,
  tourism: tourismSector,
  education: educationSector,
  agriculture: agricultureSector,
};
