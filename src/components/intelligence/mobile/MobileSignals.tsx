import { M } from "../constants";
import { SECTORS } from "../sectorData";
import { MModule } from "./MobileShared";

export function MobileSignals({ s }) {
  const allActivity = SECTORS.flatMap((sec) =>
    sec.activity.map((a) => ({ ...a, sector: sec.short, sColor: sec.color })),
  );
  const bullish = allActivity.filter((a) => a.sig === "Bullish");
  const watch = allActivity.filter((a) => a.sig === "Watch");
  return (
    <div>
      <MModule
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.green} strokeWidth="2">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
        }
        label="Bullish Signals"
        badge={`${bullish.length}`}
        defaultOpen={true}
        accentColor={M.green}
      >
        {bullish.slice(0, 6).map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              padding: "10px 0",
              borderBottom: `1px solid ${i < 5 ? M.border : "transparent"}`,
            }}
          >
            <div
              style={{ width: 6, height: 6, borderRadius: "50%", background: M.green, marginTop: 5, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.35, marginBottom: 3 }}>
                {a.h}
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "Inter,sans-serif",
                    background: "rgba(255,255,255,0.06)",
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  {a.sector}
                </span>
                <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.cat}</span>
              </div>
            </div>
          </div>
        ))}
      </MModule>
      <MModule
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.yellow} strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        }
        label="Watch Signals"
        badge={`${watch.length}`}
        accentColor={M.yellow}
      >
        {watch.slice(0, 4).map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              padding: "10px 0",
              borderBottom: `1px solid ${i < 3 ? M.border : "transparent"}`,
            }}
          >
            <div
              style={{ width: 6, height: 6, borderRadius: "50%", background: M.yellow, marginTop: 5, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.35, marginBottom: 3 }}>
                {a.h}
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "Inter,sans-serif",
                    background: "rgba(255,255,255,0.06)",
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  {a.sector}
                </span>
              </div>
            </div>
          </div>
        ))}
      </MModule>
    </div>
  );
}
