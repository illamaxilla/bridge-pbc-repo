import React from "react";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  Download,
  Plus,
  SlidersHorizontal,
  FileText,
} from "lucide-react";
import { C, SECTORS, type Sector } from "./constants";
import { sigCol, sigBg } from "./constants";
import { genTableRows } from "./utils";
import { Card } from "./Card";

export interface ActivityTableProps {
  s: Sector;
  tableSearch: string;
  setTableSearch: (v: string) => void;
  tableSort: { col: string; dir: string };
  setTableSort: (fn: (p: { col: string; dir: string }) => { col: string; dir: string }) => void;
  tablePage: number;
  setTablePage: (fn: number | ((p: number) => number)) => void;
  selectedRows: string[];
  setSelectedRows: (fn: string[] | ((p: string[]) => string[])) => void;
}

function ActivityTable({
  s,
  tableSearch,
  setTableSearch,
  tableSort,
  setTableSort,
  tablePage,
  setTablePage,
  selectedRows,
  setSelectedRows,
}) {
  const PAGE_SIZE = 8;
  const allRows = genTableRows(s);
  const filtered = allRows.filter(
    (r) =>
      !tableSearch ||
      [r.source, r.category, r.signal, r.sector].some((f) => f.toLowerCase().includes(tableSearch.toLowerCase())),
  );
  const sorted = [...filtered].sort((a, b) => {
    if (tableSort.dir === "asc") return a[tableSort.col] > b[tableSort.col] ? 1 : -1;
    return a[tableSort.col] < b[tableSort.col] ? 1 : -1;
  });
  const pageRows = sorted.slice((tablePage - 1) * PAGE_SIZE, tablePage * PAGE_SIZE);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const sortBy = (col) => setTableSort((p) => ({ col, dir: p.col === col && p.dir === "desc" ? "asc" : "desc" }));
  const toggleRow = (id) => setSelectedRows((p) => (p.includes(id) ? p.filter((r) => r !== id) : [...p, id]));
  const toggleAll = () => setSelectedRows((p) => (p.length === pageRows.length ? [] : pageRows.map((r) => r.id)));
  const cols: [string, string, boolean][] = [
    ["sector", "Sector", true],
    ["date", "Date", true],
    ["status", "Status", false],
    ["source", "Source", false],
    ["category", "Category", true],
    ["tags", "Tags", false],
    ["signal", "Signal", true],
    ["value", "Value", false],
  ];
  return (
    <Card style={{ padding: 0 }}>
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Activity Log</div>
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
              Showing {(tablePage - 1) * PAGE_SIZE + 1}-{Math.min(tablePage * PAGE_SIZE, filtered.length)} of{" "}
              {filtered.length} activities
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "5px 10px",
                borderRadius: 7,
                border: "1px solid #E5E7EB",
                background: "#fff",
                fontSize: 10,
                color: C.muted,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              <Download size={11} />
              Export
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "5px 10px",
                borderRadius: 7,
                border: `1px solid ${C.accent}`,
                background: C.accentBg,
                fontSize: 10,
                color: C.primary,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
                fontWeight: 600,
              }}
            >
              <Plus size={11} />
              Add
            </button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              flex: 1,
              maxWidth: 300,
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: 7,
              padding: "5px 10px",
            }}
          >
            <Search size={11} color={C.muted} />
            <input
              value={tableSearch}
              onChange={(e) => {
                setTableSearch(e.target.value);
                setTablePage(1);
              }}
              placeholder="Search activities..."
              style={{
                background: "none",
                border: "none",
                outline: "none",
                fontSize: 11,
                color: C.mid,
                fontFamily: "Inter,sans-serif",
                width: "100%",
              }}
            />
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "5px 10px",
              borderRadius: 7,
              border: "1px solid #E5E7EB",
              background: "#fff",
              fontSize: 10,
              color: C.muted,
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            <SlidersHorizontal size={11} />
            Filter
          </button>
          <div style={{ display: "flex", gap: 5, marginLeft: "auto" }}>
            {["Bullish", "Watch"].map((v) => (
              <div
                key={v}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "3px 8px",
                  borderRadius: 5,
                  background: sigBg(v),
                }}
              >
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: sigCol(v) }} />
                <span style={{ fontSize: 9, fontWeight: 600, color: sigCol(v), fontFamily: "Inter,sans-serif" }}>
                  {v}: {filtered.filter((r) => r.signal === v).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedRows.length > 0 && (
        <div
          style={{
            padding: "7px 14px",
            background: C.accentBg,
            borderBottom: `1px solid ${C.accent}44`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
            {selectedRows.length} selected
          </span>
          {["Export", "Tag", "Delete"].map((a) => (
            <button
              key={a}
              style={{
                padding: "3px 10px",
                borderRadius: 6,
                border: "1px solid #E5E7EB",
                background: "#fff",
                fontSize: 10,
                color: C.mid,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {a}
            </button>
          ))}
          <button
            onClick={() => setSelectedRows([])}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: C.muted }}
          >
            <ChevronUp size={13} />
          </button>
        </div>
      )}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #F3F4F6" }}>
              <th style={{ padding: "8px 10px", width: 32 }}>
                <input
                  type="checkbox"
                  checked={selectedRows.length === pageRows.length && pageRows.length > 0}
                  onChange={toggleAll}
                  style={{ cursor: "pointer", accentColor: C.primary }}
                />
              </th>
              {cols.map(([key, label, sortable]) => (
                <th
                  key={key}
                  onClick={sortable ? () => sortBy(key) : undefined}
                  style={{
                    padding: "8px 10px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    textAlign: "left",
                    cursor: sortable ? "pointer" : "default",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    {label}
                    {sortable && tableSort.col === key && (
                      <span style={{ color: C.accent }}>{tableSort.dir === "asc" ? "up" : "down"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => {
              const secData = SECTORS.find((x) => x.id === row.sectorId) as any;
              const Icon = secData?.svgIcon ? null : (secData?.icon || FileText);
              const SvgIcon = secData?.svgIcon;
              const sel = selectedRows.includes(row.id);
              const isPrimary = row.sectorId === s.id;
              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: "1px solid #F9FAFB",
                    background: sel ? `${C.accent}09` : isPrimary ? `${C.primary}04` : "transparent",
                    transition: "background .1s",
                  }}
                  onMouseEnter={(e) => {
                    if (!sel) e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = sel
                      ? `${C.accent}09`
                      : isPrimary
                        ? `${C.primary}04`
                        : "transparent";
                  }}
                >
                  <td style={{ padding: "9px 10px" }}>
                    <input
                      type="checkbox"
                      checked={sel}
                      onChange={() => toggleRow(row.id)}
                      style={{ cursor: "pointer", accentColor: C.primary }}
                    />
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 5,
                          background: isPrimary ? C.accentBg : "#F3F5F2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={10} color={isPrimary ? C.primary : C.teal} />
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: isPrimary ? 700 : 400,
                          color: C.dark,
                          fontFamily: "Inter,sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.sector}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <span style={{ fontSize: 11, color: C.mid, fontFamily: "Inter,sans-serif", whiteSpace: "nowrap" }}>
                      {row.date}
                    </span>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <span
                      style={{
                        fontSize: 10,
                        padding: "2px 0",
                        borderRadius: 4,
                        background: "transparent",
                        color: row.status === "Active" ? C.green : row.status === "Monitoring" ? C.yellow : C.muted,
                        fontFamily: "Inter,sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        color: C.dark,
                        fontFamily: "Inter,sans-serif",
                        maxWidth: 200,
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.source}
                    </span>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <span style={{ fontSize: 10, color: C.mid, fontFamily: "Inter,sans-serif" }}>{row.category}</span>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <div style={{ display: "flex", gap: 3 }}>
                      {row.tags.map((t, j) => (
                        <span
                          key={j}
                          style={{
                            fontSize: 9,
                            padding: "1px 5px",
                            borderRadius: 3,
                            background: C.accentBg,
                            color: C.primary,
                            fontFamily: "Inter,sans-serif",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: sigCol(row.signal) }} />
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: sigCol(row.signal),
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {row.signal}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "9px 10px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: row.value.startsWith("+") ? C.green : row.value.startsWith("-") ? C.red : C.dark,
                        fontFamily: "Inter,sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.value}
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
          padding: "10px 14px",
          borderTop: "1px solid #F3F4F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif" }}>
          Page {tablePage} of {totalPages}
        </span>
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          <button
            onClick={() => setTablePage((p) => Math.max(1, p - 1))}
            disabled={tablePage === 1}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "1px solid #E5E7EB",
              background: "#fff",
              cursor: tablePage === 1 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: tablePage === 1 ? 0.4 : 1,
            }}
          >
            <ChevronLeft size={12} color={C.mid} />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = tablePage <= 3 ? i + 1 : tablePage >= totalPages - 2 ? totalPages - 4 + i : tablePage - 2 + i;
            if (page < 1 || page > totalPages) return null;
            return (
              <button
                key={page}
                onClick={() => setTablePage(page)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: `1px solid ${page === tablePage ? C.accent : "#E5E7EB"}`,
                  background: page === tablePage ? C.accentBg : "#fff",
                  fontSize: 10,
                  fontWeight: page === tablePage ? 700 : 400,
                  color: page === tablePage ? C.primary : C.mid,
                  cursor: "pointer",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setTablePage((p) => Math.min(totalPages, p + 1))}
            disabled={tablePage === totalPages}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "1px solid #E5E7EB",
              background: "#fff",
              cursor: tablePage === totalPages ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: tablePage === totalPages ? 0.4 : 1,
            }}
          >
            <ChevronRight size={12} color={C.mid} />
          </button>
        </div>
      </div>
    </Card>
  );
}

export { ActivityTable };
