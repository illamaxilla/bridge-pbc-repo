import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { C } from "../constants";
import { Card } from "../Card";
import { Sector } from "../sectorData";

interface CompaniesTableProps {
  s: Sector;
}

export function CompaniesTable({ s }) {
  const [sel, setSel] = useState([]);
  const [sort, setSort] = useState({ col: "score", dir: "desc" });
  const Icon = s.icon;
  const sorted = [...s.keyPlayers].sort((a, b) =>
    sort.dir === "desc"
      ? b[sort.col === "score" ? "score" : "capNum"] - a[sort.col === "score" ? "score" : "capNum"]
      : a[sort.col === "score" ? "score" : "capNum"] - b[sort.col === "score" ? "score" : "capNum"],
  );
  const statuses = ["Active", "Active", "Watching", "Active", "Watching"];
  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px 10px",
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Top Performing Companies</div>
        <div style={{ display: "flex", gap: 5 }}>
          {sel.length > 0 && (
            <div
              style={{
                padding: "4px 9px",
                borderRadius: 6,
                background: C.accentBg,
                fontSize: 10,
                fontWeight: 700,
                color: C.primary,
              }}
            >
              {sel.length} selected
            </div>
          )}
          <button
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              border: "1px solid #E5E7EB",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <MoreHorizontal size={12} color={C.muted} />
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              <th style={{ padding: "8px 14px", width: 32 }}>
                <input
                  type="checkbox"
                  onChange={(e) => setSel(e.target.checked ? sorted.map((p) => p.ticker) : [])}
                  checked={sel.length === sorted.length}
                  style={{ cursor: "pointer" }}
                />
              </th>
              <th
                style={{
                  padding: "8px 10px",
                  textAlign: "left",
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.muted,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Company
              </th>
              <th
                onClick={() =>
                  setSort({ col: "score", dir: sort.col === "score" && sort.dir === "desc" ? "asc" : "desc" })
                }
                style={{
                  padding: "8px 10px",
                  textAlign: "right",
                  fontSize: 10,
                  fontWeight: 700,
                  color: sort.col === "score" ? C.primary : C.muted,
                  fontFamily: "Inter,sans-serif",
                  cursor: "pointer",
                }}
              >
                Signals {sort.col === "score" && (sort.dir === "desc" ? "↓" : "↑")}
              </th>
              <th
                onClick={() => setSort({ col: "cap", dir: sort.col === "cap" && sort.dir === "desc" ? "asc" : "desc" })}
                style={{
                  padding: "8px 10px",
                  textAlign: "right",
                  fontSize: 10,
                  fontWeight: 700,
                  color: sort.col === "cap" ? C.primary : C.muted,
                  fontFamily: "Inter,sans-serif",
                  cursor: "pointer",
                }}
              >
                Mkt Cap {sort.col === "cap" && (sort.dir === "desc" ? "↓" : "↑")}
              </th>
              <th
                style={{
                  padding: "8px 14px",
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.muted,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => {
              const selected = sel.includes(p.ticker);
              const status = statuses[i] || "Active";
              return (
                <tr
                  key={i}
                  style={{
                    background: selected ? "#F0FDF4" : i % 2 === 0 ? "#fff" : "#FAFAFA",
                    borderBottom: "1px solid #F3F4F6",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#FAFAFA";
                  }}
                >
                  <td style={{ padding: "10px 14px" }}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={(e) =>
                        setSel(e.target.checked ? [...sel, p.ticker] : sel.filter((t) => t !== p.ticker))
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td style={{ padding: "10px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 9,
                          background: C.accentBg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={14} color={C.primary} />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>#{p.ticker}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "10px 10px", textAlign: "right" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                      {Math.round(p.score * 138 + i * 200).toLocaleString()}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                      {Math.round(p.score * 22 + i * 30).toLocaleString()} / mo
                    </div>
                  </td>
                  <td style={{ padding: "10px 10px", textAlign: "right" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                      {p.cap}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: p.change.startsWith("+") ? C.green : C.red,
                        fontFamily: "Inter,sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {p.change}
                    </div>
                  </td>
                  <td style={{ padding: "10px 14px", textAlign: "center" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 10,
                        fontWeight: 700,
                        color: status === "Active" ? C.green : C.yellow,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: status === "Active" ? C.green : C.yellow,
                          flexShrink: 0,
                        }}
                      />
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        style={{
          padding: "8px 16px",
          borderTop: "1px solid #F3F4F6",
          display: "flex",
          justifyContent: "flex-end",
          flexShrink: 0,
        }}
      >
        <button
          style={{
            fontSize: 11,
            color: C.primary,
            fontWeight: 700,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "Inter,sans-serif",
          }}
        >
          View all companies →
        </button>
      </div>
    </Card>
  );
}
