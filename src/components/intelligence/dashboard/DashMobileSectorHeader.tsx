import { useState } from "react";
import DashMSectorDrawer from "./DashMSectorDrawer";
import type { Sector } from "./constants";

export interface DashMobileSectorHeaderProps {
  s: Sector;
  setS: (s: Sector) => void;
}

export default function DashMobileSectorHeader({ s, setS }: DashMobileSectorHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const SIcon = s.icon;
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 52,
          background: "rgba(8,14,9,0.97)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          flexShrink: 0,
        }}
      >
        <div
          onClick={() => setDrawerOpen(true)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: "8px 12px",
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(184,217,53,0.15)", border: "1px solid rgba(184,217,53,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <SIcon size={14} color="#B8D935" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.8px", textTransform: "uppercase", fontFamily: "Inter,sans-serif" }}>
              Active Sector
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "DM Sans,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.2, marginTop: 1 }}>
              {s.short}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#B8D935", fontFamily: "Inter,sans-serif", lineHeight: 1, letterSpacing: "-0.5px" }}>
                {s.score}
              </div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", fontFamily: "Inter,sans-serif", letterSpacing: "0.3px" }}>
                SCORE
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(184,217,53,0.6)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
      <DashMSectorDrawer s={s} setS={setS} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
