import { Briefcase } from "lucide-react";
import { SECTORS } from "./data";
import type { Sector } from "./constants";

export interface SearchOverlayProps {
  query: string;
  onSelect: (s: Sector) => void;
  onClose: () => void;
}

export default function SearchOverlay({ query, onSelect, onClose }: SearchOverlayProps) {
  const q = query.toLowerCase().trim();
  if (!q) return null;
  const sectorResults = SECTORS.filter(sec =>
    sec.short.toLowerCase().includes(q) || sec.full.toLowerCase().includes(q) || sec.tag.toLowerCase().includes(q)
  );
  const ventureResults: { venture: any; sector: Sector }[] = [];
  SECTORS.forEach(sec => {
    [...(sec.t1 || []), ...(sec.t2 || []), ...(sec.t3 || [])].forEach(v => {
      if (v.name.toLowerCase().includes(q)) {
        ventureResults.push({ venture: v, sector: sec });
      }
    });
  });
  const hasResults = sectorResults.length > 0 || ventureResults.length > 0;
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
      background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB",
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 200, overflow: "hidden", maxHeight: 360, overflowY: "auto",
    }}>
      {!hasResults && (
        <div style={{ padding: "18px 16px", fontSize: 12, color: "#9CA3AF", textAlign: "center", fontFamily: "Inter,sans-serif" }}>
          No results for "{query}"
        </div>
      )}
      {sectorResults.length > 0 && (
        <>
          <div style={{ padding: "8px 14px 4px", fontSize: 9, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "Inter,sans-serif" }}>Sectors</div>
          {sectorResults.slice(0, 4).map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.id} onClick={() => { onSelect(sec); onClose(); }}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", cursor: "pointer", transition: "background .1s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "#EBF5B0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={13} color="#1B4D3E" />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "DM Sans,sans-serif" }}>{sec.short}</div>
                  <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{sec.tag} · Score {sec.score}</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>${sec.capLow}–{sec.capHigh}M</div>
              </div>
            );
          })}
        </>
      )}
      {ventureResults.length > 0 && (
        <>
          <div style={{ padding: "8px 14px 4px", fontSize: 9, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "Inter,sans-serif", borderTop: sectorResults.length > 0 ? "1px solid #F3F4F6" : "none" }}>Ventures</div>
          {ventureResults.slice(0, 5).map(({ venture, sector }, i) => (
            <div key={i} onClick={() => { onSelect(sector); onClose(); }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", cursor: "pointer", transition: "background .1s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F9FAFB")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(46,90,77,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Briefcase size={12} color="#2E5A4D" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "DM Sans,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{venture.name}</div>
                <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{sector.short} · {venture.irr} IRR · {venture.cap}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
