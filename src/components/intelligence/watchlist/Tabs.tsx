import { useState } from "react";
import {
  MapPin,
  TrendingUp,
  TrendingDown,
  Plus,
  Zap,
} from "lucide-react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  AreaChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import { C } from "../constants";
import { SECTORS, sigCol, sigBg, scoreColor } from "./data";
import type { WatchlistItem } from "./types";
import { MiniDonut, Card, Tip } from "./SharedComponents";

export interface TabProps {
  item: WatchlistItem;
}

export interface KeyPlayersTabProps extends TabProps {
  setSelId: (id: string) => void;
}

export function OverviewTab({ item }) {
  const [exp, setExp] = useState(null),
    [tr, setTr] = useState("5Y");
  const sec = item.sectorObj;
  const yrs =
    tr === "1M"
      ? ["W1", "W2", "W3", "W4"]
      : tr === "6M"
        ? ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"]
        : tr === "YTD"
          ? ["Jan", "Feb", "Mar"]
          : ["2021", "2022", "2023", "2024", "2025"];
  const gv = (i, j) => Math.round(15 + Math.sin(i * 1.2 + j * 0.7) * 10 + j * 2);
  const gc = (i, j) => {
    const v = (Math.sin(i * 0.8 + j * 1.1) * 3).toFixed(2);
    return Number(v) > 0 ? `+${v}` : `${v}`;
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
          {["1M", "6M", "YTD", "5Y", "All"].map((t) => (
            <button
              key={t}
              onClick={() => setTr(t)}
              style={{
                padding: "3px 8px",
                borderRadius: 5,
                border: "none",
                background: tr === t ? "#fff" : "transparent",
                fontSize: 10,
                fontWeight: 600,
                color: tr === t ? C.primary : C.muted,
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #E5E7EB" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              <th
                style={{
                  padding: "8px 12px",
                  textAlign: "left",
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.muted,
                  minWidth: 160,
                }}
              >
                Entity
              </th>
              {yrs.map((y) => (
                <th
                  key={y}
                  style={{
                    padding: "8px 12px",
                    textAlign: "right",
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.muted,
                    minWidth: 80,
                  }}
                >
                  {y}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sec.keyPlayers.map((ent, i) => {
              const expanded = exp === i;
              return (
                <>
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? "#fff" : "#FAFAFA",
                      borderBottom: "1px solid #F3F4F6",
                      cursor: "pointer",
                    }}
                    onClick={() => setExp(expanded ? null : i)}
                  >
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, color: C.muted, fontWeight: 700 }}>{expanded ? "▼" : "▶"}</span>
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 7,
                            background: "#F3F4F6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <sec.icon size={12} color={C.muted} strokeWidth={1.5} />
                        </div>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{ent.name}</div>
                          <div style={{ fontSize: 9, color: C.muted }}>{ent.ticker}</div>
                        </div>
                      </div>
                    </td>
                    {yrs.map((y, j) => {
                      const val = gv(i, j),
                        chg = gc(i, j),
                        up = chg.startsWith("+");
                      return (
                        <td key={y} style={{ padding: "10px 12px", textAlign: "right" }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{val}%</span>
                          <span style={{ fontSize: 10, color: up ? C.green : C.red, marginLeft: 4 }}>{chg}</span>
                        </td>
                      );
                    })}
                  </tr>
                  {expanded && (
                    <tr key={`x${i}`}>
                      <td colSpan={yrs.length + 1} style={{ padding: 0, borderBottom: "1px solid #E5E7EB" }}>
                        <div style={{ padding: "14px 16px", borderTop: `2px solid ${C.accent}` }}>
                          <div
                            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}
                          >
                            {[
                              { l: "Total Amount", v: "$525,977", bc: C.accent },
                              { l: "Open Amount", v: "$7,237,530", bc: C.orange },
                              { l: "V.A.T", v: "$149,973", bc: C.blue },
                              { l: "Costs", v: "$963", bc: C.muted },
                            ].map((s, k) => (
                              <div
                                key={k}
                                style={{
                                  padding: "10px 12px",
                                  background: "#fff",
                                  borderRadius: 8,
                                  border: "1px solid #F3F4F6",
                                  borderLeft: `3px solid ${s.bc}`,
                                }}
                              >
                                <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{s.v}</div>
                                <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>{s.l}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div>
                              <div
                                style={{
                                  fontSize: 9,
                                  fontWeight: 700,
                                  color: C.muted,
                                  textTransform: "uppercase",
                                  letterSpacing: ".5px",
                                  marginBottom: 4,
                                }}
                              >
                                Description
                              </div>
                              <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.6 }}>
                                A leading player in Ghana's {sec.short} sector, driving growth through innovation and
                                strategic partnerships.
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: 9,
                                  fontWeight: 700,
                                  color: C.muted,
                                  textTransform: "uppercase",
                                  letterSpacing: ".5px",
                                  marginBottom: 4,
                                }}
                              >
                                Address
                              </div>
                              <div
                                style={{
                                  fontSize: 11,
                                  color: C.mid,
                                  lineHeight: 1.6,
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 5,
                                }}
                              >
                                <MapPin size={10} color={C.muted} style={{ marginTop: 2, flexShrink: 0 }} />
                                Accra Business District, Ring Road Central, Accra, Ghana
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AnalyzeTab({ item }) {
  const sec = item.sectorObj;
  const data = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"].map((m, i) => ({
    month: m,
    share: Math.round(sec.score * (0.75 + Math.sin(i * 0.8) * 0.12 + i * 0.03)),
    revenue: Math.round(sec.capHigh * 80 + Math.sin(i * 1.1) * sec.capHigh * 20),
    growth: Math.round(8 + Math.sin(i * 0.9) * 6),
  }));
  const spark = (base, amp) =>
    ["Q1", "Q2", "Q3", "Q4"].map((q, i) => ({ q, v: Math.round(base + Math.sin(i * 1.3) * amp) }));
  return (
    <div>
      <div
        style={{
          height: 210,
          marginBottom: 14,
          borderRadius: 10,
          border: "1px solid #E5E7EB",
          padding: "12px 10px 8px",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 8 }}>
          Performance Analysis — {sec.short}
        </div>
        <ResponsiveContainer width="100%" height="85%">
          <ComposedChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <Tooltip content={<Tip />} />
            <Area
              type="monotone"
              dataKey="share"
              fill={`${C.teal}22`}
              stroke={C.teal}
              strokeWidth={2}
              name="Market Share"
            />
            <Bar dataKey="revenue" fill={`${C.teal}33`} radius={[2, 2, 0, 0]} name="Revenue" barSize={10} />
            <Line
              type="monotone"
              dataKey="growth"
              stroke={C.orange}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: C.orange }}
              name="Growth"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {[
          { t: "Revenue Trend", c: "+12.4% QoQ", d: spark(sec.capHigh * 90, sec.capHigh * 15), col: C.teal },
          {
            t: "Score History",
            c: `${Math.round(sec.score * 0.8)} → ${sec.score}`,
            d: spark(sec.score * 0.85, sec.score * 0.1),
            col: C.teal,
          },
          {
            t: "Signal Freq.",
            c: `${sec.activity.filter((a) => a.sig === "Bullish").length * 21} Bull`,
            d: spark(50, 20),
            col: C.orange,
          },
        ].map((card, i) => (
          <Card key={i} style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dark, marginBottom: 6 }}>{card.t}</div>
            <div style={{ height: 48 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={card.d} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                  <Area
                    type="monotone"
                    dataKey="v"
                    fill={`${card.col}22`}
                    stroke={card.col}
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ fontSize: 10, color: C.green, marginTop: 4, fontWeight: 600 }}>{card.c}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function TopicsTab({ item }) {
  const sec = item.sectorObj;
  const tags = [
    "Market Growth",
    "Policy Support",
    "Digital Adoption",
    "Value Chain",
    "Climate Risk",
    "Foreign Investment",
  ];
  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.muted,
            textTransform: "uppercase",
            letterSpacing: ".5px",
            marginBottom: 8,
          }}
        >
          Trending Topics
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tags.map((t, i) => (
            <span
              key={i}
              style={{
                padding: "4px 11px",
                borderRadius: 20,
                background: "#F3F4F6",
                fontSize: 11,
                fontWeight: 600,
                color: C.mid,
                cursor: "pointer",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: C.muted,
            textTransform: "uppercase",
            letterSpacing: ".5px",
            marginBottom: 8,
          }}
        >
          Recent Intelligence
        </div>
        {sec.activity.map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              background: "#fff",
              borderRadius: 9,
              border: "1px solid #F3F4F6",
              marginBottom: 5,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: sigBg(a.sig),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: sigCol(a.sig) }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.dark,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {a.h}
              </div>
              <div style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>
                {a.cat} · {a.date}
              </div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: sigCol(a.sig), whiteSpace: "nowrap" }}>{a.amt}</span>
          </div>
        ))}
      </div>
      <Card style={{ padding: "14px 16px", background: "linear-gradient(135deg,#F9FAFB,#FAFAFA)" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "#F3F4F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Zap size={14} color={C.muted} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 4 }}>BRIDGE AI Summary</div>
            <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>
              <strong style={{ color: C.dark }}>{item.name}</strong> shows strong momentum with{" "}
              {sec.activity.filter((a) => a.sig === "Bullish").length} bullish signals. Score:{" "}
              <strong style={{ color: C.green }}>{sec.score}/100</strong>.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function SignalsTab({ item }) {
  const sec = item.sectorObj;
  const bull = sec.activity.filter((a) => a.sig === "Bullish").length;
  const watch = sec.activity.filter((a) => a.sig === "Watch").length;
  const all = [...sec.activity, ...sec.activity.map((a, i) => ({ ...a, date: i === 0 ? "Jan 2026" : "Dec 2025" }))];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[
          { l: "Bullish", v: bull * 21, col: C.green, bg: "#DCFCE7" },
          { l: "Watch", v: watch * 9, col: C.yellow, bg: "#FEF9C3" },
          { l: "Neutral", v: sec.activity.length * 5, col: C.muted, bg: "#F3F4F6" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 9,
              background: s.bg,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: s.col }} />
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, letterSpacing: "-1px", lineHeight: 1 }}>
                {s.v}
              </div>
              <div style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>{s.l}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: "relative", paddingLeft: 20 }}>
        <div
          style={{ position: "absolute", left: 7, top: 8, bottom: 0, width: 2, background: "#F3F4F6", borderRadius: 1 }}
        />
        {all.map((a, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 12, paddingLeft: 14 }}>
            <div
              style={{
                position: "absolute",
                left: -13,
                top: 5,
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: sigBg(a.sig),
                border: `2px solid ${sigCol(a.sig)}`,
              }}
            />
            <div style={{ padding: "10px 12px", background: "#fff", borderRadius: 9, border: "1px solid #F3F4F6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.dark, flex: 1 }}>{a.h}</div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: a.amt.startsWith("+") ? C.green : a.amt.startsWith("-") ? C.red : C.muted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.amt}
                </span>
              </div>
              <div style={{ display: "flex", gap: 5, fontSize: 9, color: C.muted }}>
                <span style={{ color: sigCol(a.sig), fontWeight: 700 }}>{a.sig}</span>
                <span>·</span>
                <span>{sec.short}</span>
                <span>·</span>
                <span>{a.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function KeyPlayersTab({ item, setSelId }) {
  const sec = item.sectorObj;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Key Players — {sec.short}</div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 11px",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            background: "#F3F4F6",
            fontSize: 11,
            color: C.muted,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          <Plus size={11} />
          Add
        </button>
      </div>
      {sec.keyPlayers.map((p, i) => (
        <Card key={i} style={{ padding: "14px 16px", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 11,
                background: "#F3F4F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <sec.icon size={18} color={C.muted} strokeWidth={1.5} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{p.name}</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: C.muted,
                    background: "#F3F4F6",
                    padding: "1px 5px",
                    borderRadius: 4,
                  }}
                >
                  {p.ticker}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    padding: "2px 7px",
                    borderRadius: 20,
                    background: "#F3F4F6",
                    color: C.muted,
                    fontWeight: 700,
                  }}
                >
                  {p.role}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{p.cap}</span>
                <span
                  style={{
                    fontSize: 11,
                    color: p.change.startsWith("+") ? C.green : C.red,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {p.change.startsWith("+") ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {p.change}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MiniDonut score={p.score} size={36} stroke={3} />
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <button
                  onClick={() => setSelId(`player-${sec.id}-${i}`)}
                  style={{
                    padding: "3px 7px",
                    borderRadius: 5,
                    border: "1px solid #E5E7EB",
                    background: "#fff",
                    fontSize: 9,
                    color: C.mid,
                    cursor: "pointer",
                  }}
                >
                  View
                </button>
                <button
                  style={{
                    padding: "3px 7px",
                    borderRadius: 5,
                    border: "1px solid #E5E7EB",
                    background: "#F3F4F6",
                    fontSize: 9,
                    color: C.muted,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  +Watch
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function CompetitorsTab({ item }) {
  const comps = SECTORS.flatMap((s) => s.keyPlayers.slice(0, 2).map((p) => ({ ...p, sec: s }))).slice(0, 3);
  const RC = [C.teal, C.primary, C.muted];
  const rdata = ["Score", "Revenue", "Growth", "Signals", "Stability"].map((k, i) => ({
    metric: k,
    ...Object.fromEntries(
      comps.map((c) => [c.ticker, Math.round(c.score * (0.7 + Math.sin(i + c.score * 0.01) * 0.3))]),
    ),
  }));
  return (
    <div>
      <div style={{ borderRadius: 10, border: "1px solid #E5E7EB", overflow: "hidden", marginBottom: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              <th style={{ padding: "8px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.muted }}>
                Metric
              </th>
              {comps.map((c, i) => (
                <th
                  key={i}
                  style={{ padding: "8px 12px", textAlign: "center", fontSize: 10, fontWeight: 700, color: C.muted }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: RC[i] }} />
                    {c.ticker}
                  </div>
                </th>
              ))}
              <th style={{ padding: "8px 12px", textAlign: "center", fontSize: 10, fontWeight: 700, color: C.muted }}>
                Avg
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                l: "Score",
                vals: comps.map((c) => c.score),
                avg: Math.round(comps.reduce((a, c) => a + c.score, 0) / comps.length),
              },
              { l: "Cap", vals: comps.map((c) => c.cap), avg: "$890M" },
              { l: "Change", vals: comps.map((c) => c.change), avg: "+3.5%" },
              { l: "Signal", vals: comps.map((c) => c.signal), avg: "Bullish" },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FAFAFA", borderBottom: "1px solid #F3F4F6" }}>
                <td style={{ padding: "9px 12px", fontSize: 11, fontWeight: 600, color: C.mid }}>{row.l}</td>
                {row.vals.map((v, j) => (
                  <td
                    key={j}
                    style={{
                      padding: "9px 12px",
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: 600,
                      color:
                        typeof v === "string" && v.startsWith("+")
                          ? C.green
                          : typeof v === "string" && v.startsWith("-")
                            ? C.red
                            : C.dark,
                    }}
                  >
                    {v}
                  </td>
                ))}
                <td style={{ padding: "9px 12px", textAlign: "center", fontSize: 11, color: C.muted }}>{row.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Card style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Multi-Metric Radar</div>
        <div style={{ height: 190 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={rdata}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: C.muted }} />
              {comps.map((c, i) => (
                <Radar
                  key={i}
                  name={c.ticker}
                  dataKey={c.ticker}
                  stroke={RC[i]}
                  fill={RC[i]}
                  fillOpacity={0.1}
                  strokeWidth={1.5}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
