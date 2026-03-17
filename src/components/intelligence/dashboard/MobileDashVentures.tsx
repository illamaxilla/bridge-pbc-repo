import {
  Star,
  Activity,
  FolderOpen,
  ChevronRight,
} from "lucide-react";
import { M } from "./constants";
import type { Sector } from "./constants";
import { ventureIcon } from "./constants";
import { MCard } from "./UIComponents";

export interface MobileDashVenturesProps {
  s: Sector;
}

export default function MobileDashVentures({ s }: MobileDashVenturesProps) {
  return (
    <>
      {/* Tier distribution */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 8 }}>
        {[
          [s.t1?.length, "I", M.accent, M.accentDim, "Priority"],
          [s.t2?.length, "II", "rgba(61,122,102,1)", "rgba(61,122,102,0.15)", "Mid-term"],
          [s.t3?.length, "III", M.muted, "rgba(255,255,255,0.06)", "Long-term"],
        ].map(([n, lbl, col, bg, sub]) => (
          <div
            key={lbl}
            style={{
              background: bg,
              borderRadius: 12,
              border: `1px solid ${M.cardBorder}`,
              padding: "12px",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: 24, fontWeight: 700, color: col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
            >
              {n}
            </div>
            <div
              style={{ fontSize: 10, fontWeight: 700, color: col, fontFamily: "Inter,sans-serif", marginTop: 3 }}
            >
              Tier {lbl}
            </div>
            <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{sub}</div>
          </div>
        ))}
      </div>
      <MCard
        icon={Star}
        title="Tier I Ventures"
        badge={`${s.t1?.length} priority`}
        badgeLime={true}
        defaultOpen={true}
      >
        <div style={{ padding: "4px 0 4px" }}>
          {(s.t1 || []).map((v, i) => {
            const VIcon = ventureIcon(v.name);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  padding: "10px 14px",
                  borderBottom: i < (s.t1 || []).length - 1 ? `1px solid ${M.divider}` : "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <VIcon size={14} color={M.accent} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: M.white,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {v.name}
                  </div>
                  <div style={{ display: "flex", gap: 5, marginTop: 3, alignItems: "center" }}>
                    <span
                      style={{ fontSize: 10, color: M.accent, fontFamily: "Inter,sans-serif", fontWeight: 700 }}
                    >
                      {v.irr}
                    </span>
                    <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>·</span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: v.risk === "LOW" ? M.green : v.risk === "HIGH" ? M.red : M.orange,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {v.risk}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
                    {v.cap}
                  </div>
                  <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                    Capital
                  </div>
                </div>
                <ChevronRight size={12} color={M.dim} />
              </div>
            );
          })}
        </div>
      </MCard>
      <MCard icon={Activity} title="Tier II Ventures" badge={`${s.t2?.length} mid-term`} defaultOpen={false}>
        <div style={{ padding: "4px 0 4px" }}>
          {(s.t2 || []).map((v, i) => {
            const VIcon = ventureIcon(v.name);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  padding: "10px 14px",
                  borderBottom: i < (s.t2 || []).length - 1 ? `1px solid ${M.divider}` : "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(61,122,102,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <VIcon size={14} color={M.tealBright} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: M.white,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {v.name}
                  </div>
                  <div style={{ display: "flex", gap: 5, marginTop: 3 }}>
                    <span
                      style={{
                        fontSize: 10,
                        color: M.tealBright,
                        fontFamily: "Inter,sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {v.irr}
                    </span>
                    <span style={{ fontSize: 9, color: M.dim }}>·</span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: v.risk === "LOW" ? M.green : v.risk === "HIGH" ? M.red : M.orange,
                      }}
                    >
                      {v.risk}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {v.cap}
                  </div>
                </div>
                <ChevronRight size={12} color={M.dim} />
              </div>
            );
          })}
        </div>
      </MCard>
      <MCard icon={FolderOpen} title="Tier III Ventures" badge={`${s.t3?.length} long-term`} defaultOpen={false}>
        <div style={{ padding: "4px 0 4px" }}>
          {(s.t3 || []).map((v, i) => {
            const VIcon = ventureIcon(v.name);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  padding: "10px 14px",
                  borderBottom: i < (s.t3 || []).length - 1 ? `1px solid ${M.divider}` : "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <VIcon size={14} color={M.muted} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.65)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {v.name}
                  </div>
                  <div style={{ display: "flex", gap: 5, marginTop: 3 }}>
                    <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>{v.irr}</span>
                    <span style={{ fontSize: 9, color: M.dim }}>·</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: v.risk === "HIGH" ? M.red : M.orange }}>
                      {v.risk}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 11, color: M.muted, fontFamily: "Inter,sans-serif" }}>{v.cap}</div>
                </div>
              </div>
            );
          })}
        </div>
      </MCard>
      <div style={{ height: 16 }} />
    </>
  );
}
