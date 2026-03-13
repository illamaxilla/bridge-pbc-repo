import type { Sector } from "./constants";

export interface ComparePanelProps {
  sA: Sector;
  sB: Sector;
  onClose: () => void;
}

export default function ComparePanel({ sA, sB, onClose }: ComparePanelProps) {
  const cols = [sA, sB];
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 900,
        maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #E5E7EB" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Sector Comparison</div>
            <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginTop: 2 }}>Side-by-side analysis · Mar 2026</div>
          </div>
          <button onClick={onClose} style={{ background: "#F3F4F6", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#374151", fontFamily: "Inter,sans-serif" }}>Close ×</button>
        </div>
        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ padding: "14px 16px", background: "#F9FAFB" }} />
          {cols.map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.id} style={{ padding: "14px 16px", background: "#F9FAFB", borderLeft: "1px solid #E5E7EB" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(27,77,62,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={15} color="#1B4D3E" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{sec.short}</div>
                    <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{sec.tag}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Rows */}
        {[
          { label: "BRIDGE Score", key: "score" as const, render: (v: number) => <span style={{ fontSize: 18, fontWeight: 800, color: v >= 88 ? "#16A34A" : v >= 80 ? "#CA8A04" : "#DC2626", fontFamily: "Inter,sans-serif" }}>{v}</span> },
          { label: "Capital Range", key: null, render: (_: any, sec: Sector) => <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", fontFamily: "Inter,sans-serif" }}>${sec.capLow}–{sec.capHigh}M</span> },
          { label: "IRR Potential", key: null, render: (_: any, sec: Sector) => <span style={{ fontSize: 13, fontWeight: 600, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>{sec.irrLow}–{sec.irrHigh}%</span> },
          { label: "Ventures Identified", key: "totalV" as const, render: (v: number) => <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", fontFamily: "Inter,sans-serif" }}>{v}</span> },
          { label: "Tier I Ventures", key: null, render: (_: any, sec: Sector) => <span style={{ fontSize: 13, fontWeight: 600, color: "#1B4D3E", fontFamily: "Inter,sans-serif" }}>{sec.t1?.length || 0}</span> },
          { label: "Sector Tag", key: "tag" as const, render: (v: string) => <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 5, background: "#EBF5B0", color: "#1B4D3E", fontFamily: "Inter,sans-serif" }}>{v}</span> },
        ].map(({ label, key, render }, ri) => (
          <div key={ri} style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", borderBottom: "1px solid #F3F4F6" }}>
            <div style={{ padding: "13px 16px", fontSize: 12, fontWeight: 600, color: "#6B7280", fontFamily: "Inter,sans-serif", display: "flex", alignItems: "center" }}>{label}</div>
            {cols.map((sec) => (
              <div key={sec.id} style={{ padding: "13px 16px", borderLeft: "1px solid #F3F4F6", display: "flex", alignItems: "center" }}>
                {render(key ? (sec as any)[key] : null, sec)}
              </div>
            ))}
          </div>
        ))}
        {/* Top ventures side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr" }}>
          <div style={{ padding: "13px 16px", fontSize: 12, fontWeight: 600, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>Top Ventures</div>
          {cols.map((sec) => (
            <div key={sec.id} style={{ padding: "10px 16px", borderLeft: "1px solid #F3F4F6" }}>
              {(sec.t1 || []).slice(0, 3).map((v, vi) => (
                <div key={vi} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: vi < 2 ? "1px solid #F3F4F6" : "none" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8D935", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#111827", fontFamily: "Inter,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.name}</div>
                    <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{v.irr} IRR · {v.cap}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
