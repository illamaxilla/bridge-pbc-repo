import { X } from "lucide-react";
import { MB, mLabel } from "./data";
import type { WatchlistItem } from "./types";
import { MRing } from "./MobileComponents";

export interface MobileDetailSheetProps {
  item: WatchlistItem;
  onClose: () => void;
}

export function MobileDetailSheet({ item, onClose }) {
  const sec = item.sectorObj;
  const sigC = (s) => (s === "Bullish" ? MB.green : s === "Watch" ? MB.yellow : MB.red);
  const sigBG = (s) => (s === "Bullish" ? MB.greenDim : s === "Watch" ? MB.yellowDim : MB.redDim);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 50 }} />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "82vh",
          background: MB.card,
          borderRadius: "22px 22px 0 0",
          zIndex: 51,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 -16px 60px rgba(0,0,0,0.5)",
          border: `1px solid ${MB.border}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.12)" }} />
        </div>
        <div
          style={{
            padding: "10px 18px 14px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background: "rgba(184,217,53,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: `1px solid ${MB.border}`,
            }}
          >
            <sec.icon size={22} color={MB.accent} strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: MB.text,
                letterSpacing: "-.4px",
                lineHeight: 1.15,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.name}
            </div>
            <div style={{ fontSize: 10, color: MB.muted, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
              {sec.short} · {item.category}
            </div>
          </div>
          <MRing score={item.score} size={44} stroke={4} />
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              color: MB.muted,
              flexShrink: 0,
            }}
          >
            <X size={16} />
          </button>
        </div>
        <div className="hs" style={{ flex: 1, overflowY: "auto", padding: "16px 18px 24px" }}>
          {item.ticker && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, marginBottom: 14 }}>
              {[
                { l: "Ticker", v: item.ticker },
                { l: "Market Cap", v: item.cap },
                { l: "Change", v: item.change, col: item.change?.startsWith("+") ? MB.green : MB.red },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 11,
                    padding: "10px",
                    border: `1px solid ${MB.borderSub}`,
                  }}
                >
                  <div style={{ ...mLabel, fontSize: 8, marginBottom: 4 }}>{m.l}</div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: m.col || MB.text, fontFamily: "Inter,sans-serif" }}
                  >
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "5px 12px",
                borderRadius: 20,
                background: sigBG(item.signal),
                color: sigC(item.signal),
                fontFamily: "Inter,sans-serif",
              }}
            >
              {item.signal}
            </span>
          </div>
          <div style={{ ...mLabel, marginBottom: 10 }}>Sector Activity</div>
          {sec.activity.slice(0, 4).map((a, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: `1px solid ${MB.borderSub}` }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: sigC(a.sig),
                  marginTop: 4,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: MB.text, lineHeight: 1.4, fontWeight: 500 }}>{a.h}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 3, alignItems: "center" }}>
                  <span style={{ fontSize: 9, color: sigC(a.sig), fontWeight: 700, fontFamily: "Inter,sans-serif" }}>
                    {a.sig}
                  </span>
                  <span style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: MB.text,
                      marginLeft: "auto",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {a.amt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
