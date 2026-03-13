import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Bookmark,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";
import {
  SECTORS,
  M,
  msigCol,
  msigDim,
  scoreToSig,
  totalCapAll,
  THESIS,
  RISKS,
  SCORE_DIMS,
} from "./data";
import { MCard } from "./MobileComponents";

/* ════════════════════════════════════════
   WATCH / RESOURCES / DASHBOARD / SIGNALS / OUTLOOK
   ════════════════════════════════════════ */
export function WatchTab({ s }) {
  const watched = [...SECTORS].sort((a, b) => b.score - a.score).slice(0, 6);
  return (
    <div style={{ padding: "12px 14px 16px" }}>
      <div style={{ marginBottom: 10, padding: "8px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: M.white, marginBottom: 2 }}>Watchlist</div>
        <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
          Tracking {watched.length} sectors · Live signals
        </div>
      </div>
      {watched.map((sec, i) => {
        const SIcon = sec.icon,
          sig = scoreToSig(sec.score),
          sigC = msigCol(sig),
          sigD = msigDim(sig);
        return (
          <MCard key={sec.id} style={{ marginBottom: 8, padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: M.accentDim,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <SIcon size={14} color={M.accent} strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: M.white }}>{sec.short}</div>
                <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                  ${sec.capLow}–{sec.capHigh}M · IRR {sec.irrHigh}%
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: M.white,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "-1px",
                  }}
                >
                  {sec.score}
                </div>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: 4,
                    background: sigD,
                    color: sigC,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {sig}
                </span>
              </div>
            </div>
          </MCard>
        );
      })}
    </div>
  );
}

export function ResourcesTab() {
  const docs = [
    { title: "BRIDGE Ghana Investment Thesis 2026", type: "White Paper", date: "Mar 2026", pages: 48 },
    { title: "12-Sector Portfolio Analysis", type: "Sector Report", date: "Feb 2026", pages: 120 },
    { title: "Ejura Agricultural Hub Business Plan", type: "Business Plan", date: "Jan 2026", pages: 64 },
    { title: "Financial Inclusion Deep Dive", type: "Sector Analysis", date: "Dec 2025", pages: 35 },
    { title: "Infrastructure & Basic Services", type: "Sector Analysis", date: "Nov 2025", pages: 41 },
    { title: "Ghana 2026 Budget Alignment", type: "Policy Brief", date: "Mar 2026", pages: 22 },
  ];
  const typeCol = {
    "White Paper": M.accent,
    "Sector Report": "#60A5FA",
    "Business Plan": M.green,
    "Sector Analysis": M.amber,
    "Policy Brief": "#C084FC",
  };
  return (
    <div style={{ padding: "12px 14px 16px" }}>
      <div style={{ marginBottom: 12, padding: "4px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: M.white, marginBottom: 2 }}>Resources & Reports</div>
        <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
          {docs.length} documents · BRIDGE Intelligence Library
        </div>
      </div>
      {docs.map((doc, i) => {
        const col = typeCol[doc.type] || M.accent;
        return (
          <MCard key={i} style={{ marginBottom: 8, padding: "13px 14px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: `${col}18`,
                  border: `1px solid ${col}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Bookmark size={13} color={col} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: M.white, lineHeight: 1.3, marginBottom: 5 }}>
                  {doc.title}
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 4,
                      background: `${col}18`,
                      color: col,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {doc.type}
                  </span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{doc.date}</span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{doc.pages}pp</span>
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <ArrowUpRight size={14} color={M.muted} />
              </div>
            </div>
          </MCard>
        );
      })}
    </div>
  );
}

export function DashboardTab({ s, setPage }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  const total = Math.round(totalCapAll());
  return (
    <div style={{ padding: "12px 14px 16px" }}>
      {/* Welcome row */}
      <MCard style={{ marginBottom: 10, padding: "16px 16px" }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: M.muted,
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: "Inter,sans-serif",
            marginBottom: 4,
          }}
        >
          BRIDGE Intelligence · Mar 2026
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: M.white,
            letterSpacing: "-.5px",
            lineHeight: 1.2,
            marginBottom: 6,
          }}
        >
          Ghana Investment
          <br />
          Control Panel
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            ["12 Sectors", M.accent],
            ["174 Ventures", "#60A5FA"],
            ["Live", M.green],
          ].map(([l, c]) => (
            <span
              key={l}
              style={{
                fontSize: 9,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 20,
                background: `${c}18`,
                border: `1px solid ${c}30`,
                color: c,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </MCard>
      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        {[
          { l: "Portfolio Capital", v: `$${total}M`, sub: "Across all sectors", c: M.accent },
          { l: "Active Sectors", v: "12", sub: "All deploying", c: M.green },
          { l: "Top Score", v: `${sorted[0].score}`, sub: sorted[0].short, c: M.accent },
          { l: "Signals Today", v: "48", sub: "Live intelligence", c: "#60A5FA" },
        ].map((item, i) => (
          <MCard key={i} style={{ padding: "12px 12px" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: item.c,
                letterSpacing: "-1px",
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              {item.v}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: M.white }}>{item.l}</div>
            <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>{item.sub}</div>
          </MCard>
        ))}
      </div>
      {/* Quick sector leaderboard */}
      <MCard style={{ marginBottom: 10 }}>
        <div
          style={{
            padding: "11px 14px",
            borderBottom: `1px solid ${M.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: M.white }}>Sector Leaderboard</span>
          <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>by BRIDGE Score</span>
        </div>
        {sorted.slice(0, 5).map((sec, i) => {
          const SIcon = sec.icon,
            sig = scoreToSig(sec.score),
            sigC = msigCol(sig);
          return (
            <div
              key={sec.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderBottom: `1px solid ${M.border}`,
              }}
            >
              <span
                style={{ fontSize: 11, fontWeight: 700, color: M.muted, fontFamily: "Inter,sans-serif", width: 16 }}
              >
                {i + 1}
              </span>
              <SIcon size={13} color={M.accent} strokeWidth={1.5} />
              <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: M.white }}>{sec.short}</span>
              <div style={{ width: 50, height: 3, background: M.faint, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${sec.score}%`, height: "100%", background: M.accent, borderRadius: 2 }} />
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: sigC,
                  fontFamily: "Inter,sans-serif",
                  width: 24,
                  textAlign: "right",
                }}
              >
                {sec.score}
              </span>
            </div>
          );
        })}
      </MCard>
    </div>
  );
}

export function SignalsTab({ s }) {
  const [filter, setFilter] = useState("all");
  const signals = s.activity || [];
  const filtered = filter === "all" ? signals : signals.filter((a) => a.sig === filter);
  const counts = {
    Bullish: signals.filter((a) => a.sig === "Bullish").length,
    Bearish: signals.filter((a) => a.sig === "Bearish").length,
    Neutral: signals.filter((a) => a.sig === "Neutral").length,
  };
  return (
    <div style={{ padding: "12px 14px 80px" }}>
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: M.muted,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          fontFamily: "Inter,sans-serif",
          marginBottom: 10,
        }}
      >
        Intelligence · {s.short}
      </div>
      {/* Stat row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[
          ["Bullish", counts.Bullish, M.green, M.greenDim],
          ["Bearish", counts.Bearish, M.red, M.redDim],
          ["Neutral", counts.Neutral, M.amber, M.amberDim],
        ].map(([l, n, col, bg]) => (
          <MCard
            key={l}
            style={{
              padding: "10px 12px",
              textAlign: "center",
              cursor: "pointer",
              border: filter === l ? `1px solid ${col}` : `1px solid ${M.border}`,
              background: filter === l ? bg : M.card,
            }}
            onClick={() => setFilter(filter === l ? "all" : l)}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
              {n}
            </div>
            <div style={{ fontSize: 9, color: M.mid, fontFamily: "Inter,sans-serif", marginTop: 3 }}>{l}</div>
          </MCard>
        ))}
      </div>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {["all", "Bullish", "Bearish", "Neutral"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              border: `1px solid ${filter === f ? M.accentBorder : M.border}`,
              background: filter === f ? M.accentDim : "transparent",
              fontSize: 9,
              fontWeight: 700,
              color: filter === f ? M.accent : M.muted,
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>
      {/* Signal list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((a, i) => {
          const col = msigCol(a.sig),
            dim = msigDim(a.sig);
          return (
            <MCard key={i} style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: dim,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {a.sig === "Bullish" ? (
                    <TrendingUp size={14} color={col} />
                  ) : a.sig === "Bearish" ? (
                    <TrendingDown size={14} color={col} />
                  ) : (
                    <Minus size={14} color={col} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: M.white, lineHeight: 1.35, marginBottom: 4 }}>
                    {a.h}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: 4,
                        background: dim,
                        color: col,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {a.sig}
                    </span>
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                    {a.amt && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: M.accent,
                          fontFamily: "Inter,sans-serif",
                          marginLeft: "auto",
                        }}
                      >
                        {a.amt}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </MCard>
          );
        })}
      </div>
    </div>
  );
}

export function OutlookTab({ s }) {
  const thesis = THESIS[s.id] || [];
  const risks = RISKS[s.id] || [];
  const dims = SCORE_DIMS[s.id] || { pp: 80, sf: 80, fe: 80, ss: 80 };
  const dimList = [
    ["Peace & Prosperity", "pp", M.accent],
    ["Strategic Fit", "sf", "#60A5FA"],
    ["Feasibility", "fe", M.green],
    ["Scalability", "ss", M.amber],
  ];
  return (
    <div style={{ padding: "12px 14px 80px" }}>
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: M.muted,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          fontFamily: "Inter,sans-serif",
          marginBottom: 10,
        }}
      >
        Outlook · {s.short}
      </div>
      {/* BRIDGE Score */}
      <MCard style={{ padding: "14px 14px", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: M.white }}>BRIDGE Score Breakdown</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: M.accent, fontFamily: "Inter,sans-serif" }}>
            {s.score}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {dimList.map(([label, key, col]) => (
            <div key={key}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 500, color: M.mid, fontFamily: "Inter,sans-serif" }}>
                  {label}
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: col, fontFamily: "Inter,sans-serif" }}>
                  {dims[key]}
                </span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${dims[key]}%`, height: "100%", background: col, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </MCard>
      {/* Investment Thesis */}
      <MCard style={{ padding: "14px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: M.white, marginBottom: 10 }}>Investment Thesis</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {thesis.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: M.accentDim,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 14,
                }}
              >
                {t.icon}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", lineHeight: 1.45, paddingTop: 4 }}>
                {t.point}
              </div>
            </div>
          ))}
        </div>
      </MCard>
      {/* Risks */}
      <MCard style={{ padding: "14px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: M.white, marginBottom: 10 }}>Key Risks & Watchpoints</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {risks.map((r, i) => {
            const rc = r.level === "HIGH" ? M.red : r.level === "MED" ? M.amber : M.green;
            const rd = r.level === "HIGH" ? M.redDim : r.level === "MED" ? M.amberDim : M.greenDim;
            return (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: rd,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <AlertCircle size={13} color={rc} />
                </div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: M.white, marginBottom: 2 }}>{r.title}</div>
                  <div style={{ fontSize: 10, color: M.mid, lineHeight: 1.35, marginBottom: 4 }}>{r.desc}</div>
                  <span
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: 3,
                      background: rd,
                      color: rc,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {r.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </MCard>
    </div>
  );
}
