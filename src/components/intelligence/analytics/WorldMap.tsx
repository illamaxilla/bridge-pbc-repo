import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { C } from "../constants";
import { Card } from "../Card";
import { Sector } from "../sectorData";
import { REGIONS } from "./worldMapData";
import { MapVisualization } from "./MapVisualization";
import { InvestmentFlow } from "./InvestmentFlow";

interface WorldMapProps {
  s: Sector;
}

export function WorldMap({ s }: WorldMapProps) {
  const [hovRegion, setHovRegion] = useState<string | null>(null);

  return (
    <Card style={{ padding: "16px 18px", display: "flex", flexDirection: "column", minHeight: 340 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Global Market Distribution</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
            BRIDGE sector investment activity by region
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 7,
              background: C.accentBg,
              border: `1px solid ${C.accent}44`,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
              Ghana Hub
            </span>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 9px",
              border: "1px solid #E5E7EB",
              borderRadius: 6,
              background: "#fff",
              fontSize: 10,
              color: C.mid,
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            <Maximize2 size={10} />
            Expand
          </button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, flex: 1, minHeight: 0 }}>
        <MapVisualization
          sectorColor={s.color}
          regions={REGIONS}
          hovRegion={hovRegion}
          setHovRegion={setHovRegion}
        />
        <InvestmentFlow
          s={s}
          regions={REGIONS}
          hovRegion={hovRegion}
          setHovRegion={setHovRegion}
        />
      </div>
    </Card>
  );
}
