import { useState, memo } from "react";
import { BarChart3, ChevronDown, RefreshCw, Download, Plus } from "lucide-react";
import { C } from "./constants";
import { Sector } from "./sectorData";

interface PageHeaderProps {
  s: Sector;
  period: string;
  setPeriod: (v: string) => void;
  syncing: boolean;
  setSyncing: (v: boolean) => void;
}

// React.memo: PageHeader receives sector, period, and syncing props from the dashboard.
// Memo prevents re-renders when unrelated dashboard state (e.g. sidebar collapse) changes.
export const PageHeader = memo(function PageHeader({ s, period, setPeriod, syncing, setSyncing }) {
  const [viewOpen, setViewOpen] = useState(false);
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        padding: "10px 20px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: C.accentBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BarChart3 size={16} color={C.primary} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>Sector Analytics</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>
            Deep-dive performance intelligence
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setViewOpen((o) => !o)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 10px",
              border: "1px solid #E5E7EB",
              borderRadius: 7,
              background: "#fff",
              fontSize: 11,
              color: C.mid,
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            View: Overview <ChevronDown size={10} color={C.muted} />
          </button>
          {viewOpen && (
            <div
              style={{
                position: "absolute",
                top: 34,
                left: 0,
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 9,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                zIndex: 20,
                overflow: "hidden",
                minWidth: 180,
              }}
            >
              {[
                "Overview",
                "Performance Deep-Dive",
                "Market Distribution",
                "Engagement & Activity",
                "Comparative Analysis",
              ].map((v, i) => (
                <div
                  key={i}
                  onClick={() => setViewOpen(false)}
                  style={{
                    padding: "8px 14px",
                    fontSize: 11,
                    color: i === 0 ? C.primary : C.mid,
                    fontWeight: i === 0 ? 700 : 400,
                    cursor: "pointer",
                    fontFamily: "Inter,sans-serif",
                    background: i === 0 ? C.accentBg : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (i !== 0) e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    if (i !== 0) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
          {["Daily", "Weekly", "Monthly", "Quarterly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: "4px 9px",
                borderRadius: 5,
                border: "none",
                background: period === p ? "#fff" : "transparent",
                fontSize: 10,
                fontWeight: 600,
                color: period === p ? C.primary : C.muted,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
                boxShadow: period === p ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
              }}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            border: "1px solid #E5E7EB",
            borderRadius: 7,
            background: "#fff",
            fontSize: 11,
            color: C.mid,
            cursor: "pointer",
            fontFamily: "Inter,sans-serif",
          }}
        >
          <RefreshCw size={11} /> Refresh
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            border: "1px solid #E5E7EB",
            borderRadius: 7,
            background: "#fff",
            fontSize: 11,
            color: C.mid,
            cursor: "pointer",
            fontFamily: "Inter,sans-serif",
          }}
        >
          <Download size={11} /> Export
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 11px",
            border: `1px solid ${C.accent}`,
            borderRadius: 7,
            background: C.accentBg,
            fontSize: 11,
            fontWeight: 700,
            color: C.primary,
            cursor: "pointer",
            fontFamily: "Inter,sans-serif",
          }}
        >
          <Plus size={11} /> Add Widget
        </button>
      </div>
    </div>
  );
}
