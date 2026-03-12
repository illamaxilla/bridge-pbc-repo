import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { C } from "../constants";
import { ALL, sigCol } from "./data";
import type { WatchlistSector } from "./types";
import { MiniDonut } from "./SharedComponents";

export interface LeftPanelProps {
  sector: WatchlistSector;
  selId: string | null;
  setSelId: (id: string) => void;
  tab: string;
  setTab: (tab: string) => void;
}

export function LeftPanel({ sector, selId, setSelId, tab, setTab }) {
  const [sort, setSort] = useState("score-high");
  const [q, setQ] = useState("");
  const sectorItems = ALL.filter((i) => i.sectorObj.id === sector.id);
  const listedCount = sectorItems.filter((i) => i.type === "company").length;
  const secCount = sectorItems.filter((i) => i.type === "sector").length;
  const items = sectorItems
    .filter((i) => (tab === "listed" ? i.type === "company" : i.type === "sector"))
    .filter((i) => !q || i.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) =>
      sort === "score-high"
        ? b.score - a.score
        : sort === "score-low"
          ? a.score - b.score
          : a.name.localeCompare(b.name),
    );

  return (
    <div
      style={{
        width: 318,
        flexShrink: 0,
        background: "#fff",
        borderRight: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ padding: "12px 12px 10px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", gap: 0, marginBottom: 10, background: "#F3F5F2", borderRadius: 8, padding: 3 }}>
          {[
            ["listed", `Listed (${listedCount})`],
            ["sectors", `Sectors (${secCount})`],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                flex: 1,
                padding: "5px 0",
                border: "none",
                borderRadius: 6,
                background: tab === id ? "#fff" : "transparent",
                fontSize: 11,
                fontWeight: tab === id ? 700 : 500,
                color: tab === id ? C.dark : C.muted,
                cursor: "pointer",
                boxShadow: tab === id ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#F9FAFB",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            padding: "6px 10px",
            marginBottom: 8,
          }}
        >
          <Search size={11} color={C.muted} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            style={{ background: "none", border: "none", outline: "none", fontSize: 11, color: C.mid, width: "100%" }}
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            width: "100%",
            padding: "5px 8px",
            border: "1px solid #E5E7EB",
            borderRadius: 7,
            fontSize: 10,
            color: C.mid,
            background: "#fff",
            cursor: "pointer",
          }}
        >
          <option value="score-high">Highest Score</option>
          <option value="score-low">Lowest Score</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
        {items.map((item) => {
          const sel = selId === item.id;
          const sec = item.sectorObj;
          return (
            <div
              key={item.id}
              onClick={() => setSelId(item.id)}
              style={{
                padding: "12px 11px",
                borderRadius: 11,
                marginBottom: 5,
                cursor: "pointer",
                background: sel ? "#fff" : "transparent",
                border: `1px solid ${sel ? "#E5E7EB" : "transparent"}`,
                borderLeft: `3px solid ${sel ? C.accent : "transparent"}`,
                boxShadow: sel ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
              }}
            >
              <div style={{ fontSize: 9, color: C.muted, marginBottom: 8, letterSpacing: ".1px" }}>
                {item.sector} · {item.subSector}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: "#F3F4F6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <sec.icon size={19} color={C.muted} strokeWidth={1.5} />
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.dark,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
                <MiniDonut score={item.score} size={36} stroke={3} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                  {item.category}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: sigCol(item.signal) }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: sigCol(item.signal) }}>{item.signal}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "10px 12px", borderTop: "1px solid #F3F4F6" }}>
        <button
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: 9,
            border: `1px solid ${C.accent}`,
            background: C.accentBg,
            fontSize: 12,
            fontWeight: 700,
            color: C.primary,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Plus size={12} /> Add to Watchlist
        </button>
      </div>
    </div>
  );
}
