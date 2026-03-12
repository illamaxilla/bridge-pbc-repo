import React from "react";
import { C, SECTORS, type Sector } from "./constants";

export interface MobileSectorsPageProps {
  s: Sector;
  setS: (s: Sector) => void;
}

function MobileSectorsPage({ s, setS }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ padding: "16px 16px 8px" }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, marginBottom: 2 }}>All Sectors</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif" }}>
          Ranked by BRIDGE Impact Score · Ghana 2026
        </div>
      </div>
      {sorted.map((sec, i) => {
        const act = sec.id === s.id;
        const bullish = sec.activity.filter((a) => a.sig === "Bullish").length;
        return (
          <div
            key={sec.id}
            onClick={() => setS(sec)}
            style={{
              margin: "0 12px 10px",
              borderRadius: 16,
              background: "#fff",
              border: act ? `2px solid ${C.accent}` : "2px solid transparent",
              boxShadow: act ? "0 4px 16px rgba(184,217,53,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px 12px" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: act ? C.accentBg : "#F3F4F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {sec.svgIcon(act ? C.primary : C.muted, 20)}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: act ? C.accent : "#E5E7EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 7,
                      fontWeight: 900,
                      color: act ? C.primary : "#9CA3AF",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 2 }}>{sec.short}</div>
                <div
                  style={{
                    fontSize: 10,
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {sec.totalV} ventures · ${sec.capLow}–{sec.capHigh}M cap
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: act ? C.accent : C.dark,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "-1px",
                    lineHeight: 1,
                  }}
                >
                  {sec.score}
                </div>
                <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>score</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid #F3F4F6" }}>
              {[
                { l: "IRR", v: `${sec.irrLow}–${sec.irrHigh}%` },
                { l: "Bullish", v: `${bullish}/${sec.activity.length}` },
                { l: "Health", v: `${Math.round(sec.score * 0.9)}%` },
              ].map((st, si) => (
                <div
                  key={si}
                  style={{ padding: "9px 0", textAlign: "center", borderRight: si < 2 ? "1px solid #F3F4F6" : "none" }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                    {st.v}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: C.muted,
                      fontFamily: "Inter,sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.3px",
                      marginTop: 1,
                    }}
                  >
                    {st.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div style={{ height: 16 }} />
    </div>
  );
}

export { MobileSectorsPage };
