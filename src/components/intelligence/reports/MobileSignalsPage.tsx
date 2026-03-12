import React, { useState } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { C, SECTORS, type Sector } from "./constants";
import { sigCol } from "./constants";

export interface MobileSignalsPageProps {
  s: Sector;
}

function MobileSignalsPage({ s }) {
  const [filter, setFilter] = useState("All");
  const allSignals = SECTORS.flatMap((sec) =>
    sec.activity.map((a) => ({ ...a, sector: sec.short, svgIcon: sec.svgIcon })),
  );
  const filtered = filter === "All" ? allSignals : allSignals.filter((a) => a.sig === filter);
  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ padding: "16px 16px 8px" }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, marginBottom: 2 }}>Signal Feed</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif" }}>
          All sectors · Real-time intelligence
        </div>
      </div>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, padding: "0 16px 12px", overflowX: "auto", scrollbarWidth: "none" }}>
        {["All", "Bullish", "Watch", "Bearish"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: `1px solid ${filter === f ? C.accent : "#E5E7EB"}`,
              background: filter === f ? C.accentBg : "#fff",
              fontSize: 11,
              fontWeight: filter === f ? 700 : 500,
              color: filter === f ? C.primary : C.mid,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "Inter,sans-serif",
              flexShrink: 0,
            }}
          >
            {f}
          </button>
        ))}
      </div>
      {filtered.map((a, i) => (
        <div
          key={i}
          style={{
            margin: "0 12px 8px",
            borderRadius: 14,
            background: "#fff",
            border: "1px solid #F3F4F6",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", gap: 12, padding: "12px 14px", alignItems: "flex-start" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#F3F4F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {a.sig === "Bullish" ? (
                <TrendingUp size={15} color={C.green} />
              ) : a.sig === "Bearish" ? (
                <TrendingDown size={15} color={C.red} />
              ) : (
                <Activity size={15} color={C.yellow} />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.dark, lineHeight: 1.4, marginBottom: 4 }}>
                {a.h}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "2px 7px",
                    borderRadius: 6,
                    background: "#F3F4F6",
                  }}
                >
                  {a.svgIcon(C.muted, 9)}
                  <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{a.sector}</span>
                </div>
                <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
              </div>
            </div>
            <div style={{ flexShrink: 0, textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: sigCol(a.sig), fontFamily: "Inter,sans-serif" }}>
                {a.amt}
              </div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: sigCol(a.sig),
                  fontFamily: "Inter,sans-serif",
                  marginTop: 2,
                }}
              >
                {a.sig}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div style={{ height: 16 }} />
    </div>
  );
}

export { MobileSignalsPage };
