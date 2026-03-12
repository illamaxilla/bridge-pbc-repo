import { C } from "../constants";
import { Sector } from "../sectorData";
import { Region } from "./worldMapData";

interface InvestmentFlowProps {
  s: Sector;
  regions: Region[];
  hovRegion: string | null;
  setHovRegion: (id: string | null) => void;
}

export function InvestmentFlow({ s, regions, hovRegion, setHovRegion }: InvestmentFlowProps) {
  return (
    <div
      style={{
        width: 170,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        justifyContent: "center",
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 4 }}>Investment Flow</div>
      {regions.map((r, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovRegion(r.id)}
          onMouseLeave={() => setHovRegion(null)}
          style={{ cursor: "pointer" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 14 }}>{r.flag}</span>
              <span
                style={{
                  fontSize: 10,
                  color: hovRegion === r.id ? C.primary : C.mid,
                  fontFamily: "Inter,sans-serif",
                  fontWeight: hovRegion === r.id ? 700 : 600,
                  transition: "color .2s",
                }}
              >
                {r.label}
              </span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
              {r.pct}%
            </span>
          </div>
          <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${r.pct}%`,
                background: s.color,
                borderRadius: 3,
                transition: "width .6s ease",
                opacity: hovRegion === r.id ? 1 : 0.65,
              }}
            />
          </div>
        </div>
      ))}
      <div
        style={{
          marginTop: 10,
          padding: "12px 14px",
          borderRadius: 10,
          background: C.accentBg,
          border: `1px solid ${C.accent}55`,
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: C.primary,
            fontFamily: "Inter,sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 4,
          }}
        >
          Total Capital
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.primary, letterSpacing: "-0.5px" }}>
          ${((s.capLow + s.capHigh) / 2).toFixed(1)}B
        </div>
        <div style={{ fontSize: 9, color: C.teal, fontFamily: "Inter,sans-serif", marginTop: 3 }}>
          Deployed across regions
        </div>
      </div>
    </div>
  );
}
