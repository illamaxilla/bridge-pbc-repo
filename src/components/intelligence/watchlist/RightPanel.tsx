import { useState, useEffect } from "react";
import {
  Eye,
  Share2,
  AlertTriangle,
  X,
} from "lucide-react";
import { C } from "../constants";
import { ALL, TABS, scoreColor } from "./data";
import { Card } from "./SharedComponents";
import { OverviewTab, AnalyzeTab, TopicsTab, SignalsTab, KeyPlayersTab, CompetitorsTab } from "./Tabs";

export interface RightPanelProps {
  selId: string | null;
  setSelId: (id: string) => void;
}

export function RightPanel({ selId, setSelId }) {
  const [tab, setTab] = useState("Overview"),
    [watching, setWatching] = useState(true),
    [dismissed, setDismissed] = useState(false);
  const item = ALL.find((i) => i.id === selId) || ALL[0];
  const sec = item.sectorObj;
  useEffect(() => {
    setTab("Overview");
    setDismissed(false);
  }, [selId]);
  const alert = sec.activity.find((a) => a.sig === "Watch") || sec.activity[0];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  background: C.accentBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: `1px solid ${C.accent}66`,
                }}
              >
                <sec.icon size={24} color={C.primary} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>
                  {sec.short} · {item.subSector} · {item.category}
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.dark, letterSpacing: "-0.5px", lineHeight: 1.1 }}>
                  {item.name}
                </div>
                {item.ticker && (
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                    {item.ticker} · {item.cap}
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <button
                onClick={() => setWatching((w) => !w)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 12px",
                  borderRadius: 9,
                  border: `1px solid ${watching ? C.accent : "#E5E7EB"}`,
                  background: watching ? C.accentBg : "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  color: watching ? C.primary : C.mid,
                  cursor: "pointer",
                }}
              >
                <Eye size={11} />
                {watching ? "✓ Watching" : "+ Watch"}
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 10px",
                  borderRadius: 9,
                  border: "1px solid #E5E7EB",
                  background: "#fff",
                  fontSize: 11,
                  color: C.mid,
                  cursor: "pointer",
                }}
              >
                <Share2 size={11} /> Share
              </button>
            </div>
          </div>
          <Card style={{ marginBottom: 12, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "flex" }}>
              {[
                { l: "Overall Score", v: item.score, col: scoreColor(item.score), u: "" },
                { l: "Revenue Goal", v: Math.round(item.score * 0.87), col: C.orange, u: "%" },
                { l: "Forecast/Mo", v: `${(((sec.capLow + sec.capHigh) / 2) * 0.12).toFixed(1)}M`, col: C.blue, u: "" },
              ].map((m, i) => {
                const r = 12,
                  circ = 2 * Math.PI * r,
                  pct = m.u === "%" ? parseFloat(m.v) : Math.min(100, parseFloat(m.v) || 50);
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      padding: "12px 14px",
                      borderRight: "1px solid #F3F4F6",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <svg width={30} height={30}>
                      <circle cx={15} cy={15} r={r} fill="none" stroke="#F0F0F0" strokeWidth={3} />
                      <circle
                        cx={15}
                        cy={15}
                        r={r}
                        fill="none"
                        stroke={m.col}
                        strokeWidth={3}
                        strokeDasharray={`${(circ * pct) / 100} ${circ}`}
                        strokeLinecap="round"
                        transform="rotate(-90 15 15)"
                      />
                    </svg>
                    <div>
                      <div
                        style={{
                          fontSize: 9,
                          color: C.muted,
                          textTransform: "uppercase",
                          letterSpacing: ".5px",
                          marginBottom: 2,
                        }}
                      >
                        {m.l}
                      </div>
                      <div
                        style={{ fontSize: 17, fontWeight: 800, color: C.dark, letterSpacing: "-0.5px", lineHeight: 1 }}
                      >
                        {m.v}
                        {m.u}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <svg width={28} height={28}>
                  <circle cx={14} cy={14} r={10} fill="none" stroke="#E5E7EB" strokeWidth={2} strokeDasharray="4 3" />
                  <text x={14} y={18} textAnchor="middle" fontSize={11} fill={C.muted}>
                    +
                  </text>
                </svg>
                <div>
                  <div style={{ fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: ".5px" }}>
                    Add Metric
                  </div>
                </div>
              </div>
            </div>
          </Card>
          {!dismissed && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 9,
                background: alert?.sig === "Watch" ? "#FFFBEB" : "#F0FDF4",
                border: `1px solid ${alert?.sig === "Watch" ? "#FDE68A" : "#BBF7D0"}`,
                marginBottom: 12,
              }}
            >
              <AlertTriangle size={13} color={alert?.sig === "Watch" ? C.yellow : C.green} />
              <span style={{ flex: 1, fontSize: 11, color: C.mid }}>
                <strong style={{ color: C.dark }}>{alert?.sig === "Watch" ? "Signal:" : "Update:"}</strong> {alert?.h} —{" "}
                {alert?.date}
              </span>
              <button
                onClick={() => setDismissed(true)}
                style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex" }}
              >
                <X size={12} />
              </button>
            </div>
          )}
          <div style={{ display: "flex", borderBottom: "2px solid #E5E7EB", marginBottom: 16, overflowX: "auto" }}>
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  borderBottom: `2px solid ${tab === t ? C.accent : "transparent"}`,
                  background: "transparent",
                  fontSize: 12,
                  fontWeight: tab === t ? 700 : 500,
                  color: tab === t ? C.primary : C.muted,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  marginBottom: "-2px",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === "Overview" && <OverviewTab item={item} />}
          {tab === "Analyze" && <AnalyzeTab item={item} />}
          {tab === "Topics" && <TopicsTab item={item} />}
          {tab === "Signals" && <SignalsTab item={item} />}
          {tab === "Key Players" && <KeyPlayersTab item={item} setSelId={setSelId} />}
          {tab === "Competitors" && <CompetitorsTab item={item} />}
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}
