import { SECTORS } from "./data";
import type { Sector } from "./constants";

export interface DashMSectorDrawerProps {
  s: Sector;
  setS: (s: Sector) => void;
  open: boolean;
  onClose: () => void;
}

export default function DashMSectorDrawer({ s, setS, open, onClose }: DashMSectorDrawerProps) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#0F1A12",
          borderRadius: "20px 20px 0 0",
          maxHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "env(safe-area-inset-bottom,16px)",
          border: "1px solid rgba(184,217,53,0.15)",
          borderBottom: "none",
          animation: "slideUp 0.25s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", margin: "12px auto 0", flexShrink: 0 }} />
        <div style={{ padding: "12px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", fontFamily: "Inter,sans-serif", letterSpacing: "0.8px", textTransform: "uppercase" }}>
            Select Sector
          </span>
          <button
            onClick={onClose}
            style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 7, padding: "4px 10px", fontSize: 11, color: "rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: "Inter,sans-serif" }}
          >
            Done
          </button>
        </div>
        <div style={{ overflowY: "auto", flex: 1, scrollbarWidth: "none" }}>
          {sorted.map((sec, i) => {
            const act = sec.id === s.id;
            const SIcon = sec.icon;
            const totalV = (sec.t1?.length || 0) + (sec.t2?.length || 0) + (sec.t3?.length || 0);
            return (
              <div
                key={sec.id}
                onClick={() => { setS(sec); onClose(); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 20px",
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: act ? "rgba(184,217,53,0.07)" : "transparent",
                  cursor: "pointer",
                }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: act ? "rgba(184,217,53,0.15)" : "rgba(255,255,255,0.06)" }}>
                  <SIcon size={16} color={act ? "#B8D935" : "rgba(255,255,255,0.35)"} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: act ? 700 : 500, color: act ? "#fff" : "rgba(255,255,255,0.7)", fontFamily: "DM Sans,sans-serif" }}>
                    {sec.short}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                    {totalV} ventures · ${sec.capLow}–{sec.capHigh}M
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "Inter,sans-serif", color: act ? "#B8D935" : "rgba(255,255,255,0.28)" }}>
                    {sec.score}
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "Inter,sans-serif" }}>score</div>
                </div>
                {act && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#B8D935", flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
