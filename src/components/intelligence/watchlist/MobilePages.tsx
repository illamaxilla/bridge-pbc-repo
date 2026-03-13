import { useState } from "react";
import {
  ChevronDown,
  TrendingUp,
  AlertTriangle,
  Activity,
  BarChart3,
  Zap,
  Plus,
  User,
  PieChart,
} from "lucide-react";
import { SECTORS, MB, mCard, mLabel } from "./data";
import type { WatchlistSector } from "./types";
import { MRing } from "./MobileComponents";

export interface FeedPageProps {
  sector: WatchlistSector;
  setSelId: (id: string | null) => void;
}

export interface PlayersPageProps {
  sector: WatchlistSector;
  setSelId: (id: string | null) => void;
}

export interface ScoresPageProps {
  sector: WatchlistSector;
}

export interface SignalsPageProps {
  sector: WatchlistSector;
}

export interface PortfolioPageProps {
  sector: WatchlistSector;
}

export function FeedPage({ sector, setSelId }) {
  const [expanded, setExpanded] = useState(null);
  const bullish = sector.activity.filter((a) => a.sig === "Bullish").length;
  const watches = sector.activity.filter((a) => a.sig === "Watch").length;
  const sigC = (s) => (s === "Bullish" ? MB.green : s === "Watch" ? MB.yellow : MB.red);
  const sigBG = (s) => (s === "Bullish" ? MB.greenDim : s === "Watch" ? MB.yellowDim : MB.redDim);

  // Derived intelligence values
  const marketSize = `$${(sector.capHigh * 1.9).toFixed(1)}B`;
  const growthRate = `${Math.round(sector.score * 0.45)}%`;
  const investGap = `$${(sector.capLow * 0.8).toFixed(0)}M`;
  const deployedPct = Math.round(38 + sector.score * 0.25);

  // BRIDGE score pillar breakdown (derived from overall score)
  const pillars = [
    { l: "Peace & Prosperity", v: Math.round(sector.score * 0.97) },
    { l: "Strategic Fit", v: Math.round(sector.score * 1.02) },
    { l: "Feasibility", v: Math.round(sector.score * 0.94) },
    { l: "Scalability", v: Math.round(sector.score * 0.99) },
  ].map((p) => ({ ...p, v: Math.min(100, p.v) }));

  // Trending sub-sectors with heat scores
  const heatCols = [
    "rgba(184,217,53,0.9)",
    "rgba(184,217,53,0.65)",
    "rgba(76,175,122,0.8)",
    "rgba(76,175,122,0.55)",
    "rgba(255,255,255,0.25)",
  ];
  const heatScores = [92, 78, 71, 58, 34];

  return (
    <div style={{ padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Hero */}
      <div style={{ ...mCard(), padding: "18px" }}>
        <div style={{ fontSize: 8, ...mLabel, marginBottom: 10 }}>ACTIVE · {sector.short.toUpperCase()}</div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: MB.text, letterSpacing: "-.5px", lineHeight: 1.1 }}>
              {sector.short}
            </div>
            <div
              style={{ fontSize: 10, color: MB.muted, marginTop: 4, fontFamily: "Inter,sans-serif", lineHeight: 1.4 }}
            >
              {sector.full}
            </div>
          </div>
          <MRing score={sector.score} size={64} stroke={6} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {[
            { l: "Cap Range", v: `$${sector.capLow}–${sector.capHigh}M` },
            { l: "Bullish", v: `${bullish} signals`, col: MB.green },
            { l: "Watch", v: `${watches} signals`, col: MB.yellow },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                padding: "9px 10px",
                border: `1px solid ${MB.borderSub}`,
              }}
            >
              <div style={{ ...mLabel, marginBottom: 4, fontSize: 8 }}>{m.l}</div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: m.col || MB.text,
                  fontFamily: "Inter,sans-serif",
                  lineHeight: 1.2,
                }}
              >
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Snapshot */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChart3 size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Market Snapshot</span>
          </div>
          <span style={{ fontSize: 9, color: MB.muted, fontFamily: "Inter,sans-serif" }}>Mar 2026</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
          {[
            { l: "Market Size", v: marketSize, d: "+12%", col: MB.accent },
            { l: "YoY Growth", v: growthRate, d: "↑ Trending", col: MB.green },
            { l: "Invest. Gap", v: investGap, d: "Opportunity", col: MB.yellow },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                padding: "14px 12px",
                borderRight: i < 2 ? `1px solid ${MB.borderSub}` : "none",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: 18, fontWeight: 800, color: m.col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
              >
                {m.v}
              </div>
              <div style={{ fontSize: 8, color: MB.muted, fontFamily: "Inter,sans-serif", marginTop: 4 }}>{m.l}</div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: m.col,
                  fontFamily: "Inter,sans-serif",
                  marginTop: 3,
                  opacity: 0.7,
                }}
              >
                {m.d}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BRIDGE Score Pillars */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Activity size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>BRIDGE Score</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: `2px solid ${MB.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 800, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
                {sector.score}
              </span>
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {pillars.map((p, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: MB.muted, fontFamily: "Inter,sans-serif" }}>{p.l}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
                  {p.v}
                </span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                <div
                  style={{
                    width: `${p.v}%`,
                    height: "100%",
                    background: `linear-gradient(90deg,${MB.teal},${MB.accent})`,
                    borderRadius: 2,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capital Flow Indicator */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Capital Flow</span>
          </div>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: MB.green,
              fontFamily: "Inter,sans-serif",
              background: MB.greenDim,
              padding: "3px 8px",
              borderRadius: 10,
            }}
          >
            {deployedPct}% deployed
          </span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 10, color: MB.muted, fontFamily: "Inter,sans-serif" }}>
              Deployed capital vs total opportunity
            </span>
          </div>
          <div
            style={{
              height: 10,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: `${deployedPct}%`,
                height: "100%",
                background: `linear-gradient(90deg,${MB.teal},${MB.accent})`,
                borderRadius: 6,
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
                {deployedPct}%
              </div>
              <div style={{ fontSize: 8, color: MB.faint, fontFamily: "Inter,sans-serif", marginTop: 2 }}>Deployed</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: MB.text, fontFamily: "Inter,sans-serif" }}>
                {100 - deployedPct}%
              </div>
              <div style={{ fontSize: 8, color: MB.faint, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                Remaining Opportunity
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: MB.green, fontFamily: "Inter,sans-serif" }}>
                {investGap}
              </div>
              <div style={{ fontSize: 8, color: MB.faint, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                Target Gap
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Sub-sectors */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Trending Sub-sectors</span>
        </div>
        <div style={{ padding: "8px 12px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
          {sector.subSectors.slice(0, 5).map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 6px" }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: `1px solid ${MB.borderSub}`,
                }}
              >
                <span style={{ fontSize: 9, fontWeight: 800, color: MB.faint, fontFamily: "Inter,sans-serif" }}>
                  {i + 1}
                </span>
              </div>
              <span
                style={{ flex: 1, fontSize: 12, fontWeight: 500, color: i < 2 ? MB.text : "rgba(255,255,255,0.6)" }}
              >
                {s.name}
              </span>
              <div
                style={{ width: 80, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, flexShrink: 0 }}
              >
                <div
                  style={{ width: `${heatScores[i] || 30}%`, height: "100%", background: heatCols[i], borderRadius: 2 }}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: heatCols[i],
                  fontFamily: "Inter,sans-serif",
                  width: 26,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {heatScores[i] || 30}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-sector chips */}
      <div className="hs" style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none" }}>
        {sector.subSectors.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${MB.borderSub}`,
              fontSize: 10,
              fontWeight: 500,
              color: MB.muted,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {s.name}
          </div>
        ))}
      </div>

      <div style={{ ...mLabel, paddingTop: 4 }}>Latest Activity</div>
      {sector.activity.map((a, i) => {
        const exp = expanded === "all" || expanded === i;
        return (
          <div key={i} onClick={() => setExpanded(exp ? null : i)} style={{ ...mCard(), cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 14px" }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: sigC(a.sig),
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${sigC(a.sig)}88`,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: MB.text,
                    lineHeight: 1.35,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: exp ? "normal" : "nowrap",
                  }}
                >
                  {a.h}
                </div>
                {!exp && (
                  <div style={{ fontSize: 10, color: MB.muted, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                    {a.date} · {a.cat}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: sigC(a.sig), fontFamily: "Inter,sans-serif" }}>
                  {a.amt}
                </span>
                <ChevronDown
                  size={12}
                  color={MB.faint}
                  style={{ transform: exp ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                />
              </div>
            </div>
            {exp && (
              <div style={{ padding: "0 14px 13px", borderTop: `1px solid ${MB.borderSub}` }}>
                <div style={{ paddingTop: 9, display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "3px 10px",
                      borderRadius: 20,
                      background: sigBG(a.sig),
                      color: sigC(a.sig),
                      fontWeight: 700,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {a.sig}
                  </span>
                  <span style={{ fontSize: 10, color: MB.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: MB.muted }}>{a.cat}</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: MB.text,
                      marginLeft: "auto",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    Impact: {a.amt}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Players sub-tab
export function PlayersPage({ sector, setSelId }) {
  const sigC = (s) => (s === "Bullish" ? MB.green : s === "Watch" ? MB.yellow : MB.red);
  const [selPlayer, setSelPlayer] = useState(null);
  const roles = ["Market Leader", "Growth Stage", "Emerging Player", "Institutional", "Early Stage"];
  const shareWeights = [35, 28, 18, 12, 7];

  return (
    <div style={{ padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Sector at a glance */}
      <div style={{ ...mCard(), padding: "14px 16px" }}>
        <div style={{ ...mLabel, marginBottom: 10 }}>Sector at a Glance</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { l: "Total Players", v: `${sector.keyPlayers.length} tracked` },
            { l: "Market Coverage", v: `$${(sector.capHigh * 1.8).toFixed(1)}B` },
            {
              l: "Avg BRIDGE Score",
              v: `${Math.round(sector.keyPlayers.reduce((s, p) => s + p.score, 0) / sector.keyPlayers.length)}`,
            },
            { l: "Active Signals", v: `${sector.activity.length} events` },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                padding: "11px 12px",
                border: `1px solid ${MB.borderSub}`,
              }}
            >
              <div style={{ ...mLabel, fontSize: 8, marginBottom: 4 }}>{m.l}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: MB.text, fontFamily: "Inter,sans-serif" }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Share Breakdown */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChart3 size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Market Share</span>
          </div>
          <span style={{ fontSize: 9, color: MB.muted, fontFamily: "Inter,sans-serif" }}>Est. distribution</span>
        </div>
        {/* Stacked bar */}
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", height: 8, borderRadius: 6, overflow: "hidden", gap: 1, marginBottom: 14 }}>
            {shareWeights.map((w, i) => {
              const cols = [
                "rgba(184,217,53,1)",
                "rgba(76,175,122,0.85)",
                "rgba(184,217,53,0.55)",
                "rgba(76,175,122,0.45)",
                "rgba(255,255,255,0.18)",
              ];
              return <div key={i} style={{ flex: w, background: cols[i] }} />;
            })}
          </div>
          {sector.keyPlayers.slice(0, 5).map((p, i) => {
            const cols = [
              "rgba(184,217,53,1)",
              "rgba(76,175,122,0.85)",
              "rgba(184,217,53,0.55)",
              "rgba(76,175,122,0.45)",
              "rgba(255,255,255,0.4)",
            ];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 4 ? 8 : 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: cols[i], flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{p.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: cols[i], fontFamily: "Inter,sans-serif" }}>
                  {shareWeights[i]}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Company Cards */}
      <div style={{ ...mLabel }}>Top Companies</div>
      {sector.keyPlayers.map((p, i) => {
        const isSel = selPlayer === i;
        const role = roles[i] || "Player";
        const chgPos = p.change?.startsWith("+");
        return (
          <div key={i} style={{ ...mCard(), cursor: "pointer" }} onClick={() => setSelPlayer(isSel ? null : i)}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 11,
                  background: "rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  border: `1px solid ${MB.borderSub}`,
                  position: "relative",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 800, color: MB.muted, fontFamily: "Inter,sans-serif" }}>
                  {i + 1}
                </span>
                {i === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: MB.accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 7, fontWeight: 800, color: "#0A1A0C" }}>★</span>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: MB.text,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.name}
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 9,
                      padding: "2px 7px",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.05)",
                      color: MB.faint,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {role}
                  </span>
                  <span style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif" }}>#{p.ticker}</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: MB.text, fontFamily: "Inter,sans-serif" }}>
                  {p.cap}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: chgPos ? MB.green : MB.red,
                    fontFamily: "Inter,sans-serif",
                    marginTop: 2,
                  }}
                >
                  {p.change}
                </div>
              </div>
              <ChevronDown
                size={13}
                color={MB.faint}
                style={{ transform: isSel ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}
              />
            </div>
            {isSel && (
              <div
                style={{
                  borderTop: `1px solid ${MB.borderSub}`,
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
                  {[
                    { l: "BRIDGE Score", v: p.score, col: MB.accent },
                    { l: "Market Cap", v: p.cap, col: MB.text },
                    { l: "Change", v: p.change, col: chgPos ? MB.green : MB.red },
                  ].map((m, j) => (
                    <div
                      key={j}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 9,
                        padding: "10px 8px",
                        border: `1px solid ${MB.borderSub}`,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 800, color: m.col, fontFamily: "Inter,sans-serif" }}>
                        {m.v}
                      </div>
                      <div style={{ ...mLabel, fontSize: 7, marginTop: 3 }}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ ...mLabel, marginBottom: 6 }}>Score Rating</div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                    <div
                      style={{
                        width: `${p.score}%`,
                        height: "100%",
                        background: `linear-gradient(90deg,${MB.teal},${MB.accent})`,
                        borderRadius: 3,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    <span style={{ fontSize: 8, color: MB.faint, fontFamily: "Inter,sans-serif" }}>0</span>
                    <span style={{ fontSize: 8, color: MB.accent, fontFamily: "Inter,sans-serif", fontWeight: 700 }}>
                      {p.score} / 100
                    </span>
                    <span style={{ fontSize: 8, color: MB.faint, fontFamily: "Inter,sans-serif" }}>100</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: MB.muted, fontFamily: "Inter,sans-serif" }}>
                    Sector: {sector.short}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: MB.accent,
                      fontWeight: 600,
                      fontFamily: "Inter,sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    View Full Profile →
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Notable Moves */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Notable Moves</span>
        </div>
        {sector.activity.slice(0, 3).map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              padding: "12px 16px",
              borderBottom: i < 2 ? `1px solid ${MB.borderSub}` : "none",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: sigC(a.sig),
                marginTop: 5,
                flexShrink: 0,
                boxShadow: `0 0 6px ${sigC(a.sig)}55`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MB.text, lineHeight: 1.35 }}>{a.h}</div>
              <div style={{ display: "flex", gap: 7, marginTop: 5, alignItems: "center" }}>
                <span
                  style={{
                    fontSize: 9,
                    padding: "2px 8px",
                    borderRadius: 10,
                    background: `${sigC(a.sig)}1A`,
                    color: sigC(a.sig),
                    fontWeight: 700,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {a.sig}
                </span>
                <span style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif" }}>
                  {a.date} · {a.cat}
                </span>
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
  );
}

// Scores sub-tab
export function ScoresPage({ sector }) {
  const pillars = [
    { l: "Peace & Prosperity", v: Math.min(100, Math.round(sector.score * 0.97)) },
    { l: "Strategic Fit", v: Math.min(100, Math.round(sector.score * 1.02)) },
    { l: "Feasibility", v: Math.min(100, Math.round(sector.score * 0.94)) },
    { l: "Scalability", v: Math.min(100, Math.round(sector.score * 0.99)) },
  ];
  const allSorted = [...SECTORS].sort((a, b) => b.score - a.score);
  const rank = allSorted.findIndex((s) => s.id === sector.id) + 1;
  const trendData = [72, 75, 78, 76, 80, 82, sector.score - 3, sector.score - 1, sector.score];
  const riskLevel = sector.score >= 85 ? "Low" : sector.score >= 75 ? "Medium" : "Elevated";
  const riskCol = sector.score >= 85 ? MB.green : sector.score >= 75 ? MB.yellow : MB.red;

  return (
    <div style={{ padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Hero score card */}
      <div style={{ ...mCard(), padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
          <MRing score={sector.score} size={100} stroke={8} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: MB.text, letterSpacing: "-.3px", lineHeight: 1.2 }}>
              {sector.short}
            </div>
            <div
              style={{ fontSize: 10, color: MB.muted, marginTop: 3, fontFamily: "Inter,sans-serif", lineHeight: 1.4 }}
            >
              {sector.full}
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: 9,
                  padding: "3px 9px",
                  borderRadius: 20,
                  background: MB.greenDim,
                  color: MB.green,
                  fontWeight: 700,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Rank #{rank}
              </span>
              <span
                style={{
                  fontSize: 9,
                  padding: "3px 9px",
                  borderRadius: 20,
                  background: `${riskCol}1A`,
                  color: riskCol,
                  fontWeight: 700,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Risk: {riskLevel}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { l: "Cap Low", v: `$${sector.capLow}M`, col: MB.accent },
            { l: "Cap High", v: `$${sector.capHigh}M`, col: MB.accentDim },
            { l: "BRIDGE Score", v: `${sector.score}`, col: MB.green },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 11,
                padding: "12px 10px",
                border: `1px solid ${MB.borderSub}`,
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: 17, fontWeight: 800, color: m.col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
              >
                {m.v}
              </div>
              <div style={{ ...mLabel, fontSize: 8, marginTop: 5 }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Trend */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Activity size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Score Trend</span>
          </div>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: MB.green,
              fontFamily: "Inter,sans-serif",
              background: MB.greenDim,
              padding: "2px 8px",
              borderRadius: 10,
            }}
          >
            +{sector.score - trendData[0]} pts
          </span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 56, marginBottom: 8 }}>
            {trendData.map((v, i) => {
              const pct = (v / 100) * 100;
              const isLast = i === trendData.length - 1;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: isLast ? MB.accent : `rgba(184,217,53,${0.15 + i * 0.05})`,
                    borderRadius: "3px 3px 0 0",
                    height: `${pct}%`,
                    minHeight: 4,
                  }}
                />
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
              <span key={m} style={{ fontSize: 7, color: MB.faint, fontFamily: "Inter,sans-serif" }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pillar Breakdown */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarChart3 size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Score Pillars</span>
        </div>
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          {pillars.map((p, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontFamily: "Inter,sans-serif" }}>
                  {p.l}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: p.v >= 85 ? MB.accent : MB.accentDim,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {p.v}
                  </span>
                  <span style={{ fontSize: 8, color: MB.green, fontWeight: 600, fontFamily: "Inter,sans-serif" }}>
                    +{Math.round((p.v - 70) * 0.4)}%
                  </span>
                </div>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                <div
                  style={{
                    width: `${p.v}%`,
                    height: "100%",
                    background: `linear-gradient(90deg,${MB.teal},${MB.accent})`,
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sector Rankings */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>All Sectors Ranked</span>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
            #{rank} of 12
          </span>
        </div>
        {allSorted.map((s, i) => {
          const isCurrent = s.id === sector.id;
          return (
            <div
              key={s.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 16px",
                borderBottom: i < allSorted.length - 1 ? `1px solid ${MB.borderSub}` : "none",
                background: isCurrent ? "rgba(184,217,53,0.04)" : "transparent",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: isCurrent ? MB.accent : MB.faint,
                  fontFamily: "Inter,sans-serif",
                  width: 16,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 11,
                  fontWeight: isCurrent ? 700 : 400,
                  color: isCurrent ? MB.text : "rgba(255,255,255,0.55)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {s.short}
              </span>
              <div
                style={{ width: 70, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, flexShrink: 0 }}
              >
                <div
                  style={{
                    width: `${s.score}%`,
                    height: "100%",
                    background: isCurrent ? MB.accent : MB.accentDim,
                    borderRadius: 2,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: isCurrent ? MB.accent : s.score >= 88 ? MB.accentDim : "rgba(255,255,255,0.3)",
                  fontFamily: "Inter,sans-serif",
                  width: 22,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {s.score}
              </span>
            </div>
          );
        })}
      </div>

      {/* Player Scoreboard */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Player Scoreboard</span>
        </div>
        {sector.keyPlayers.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderBottom: i < sector.keyPlayers.length - 1 ? `1px solid ${MB.borderSub}` : "none",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: MB.faint,
                fontFamily: "Inter,sans-serif",
                width: 14,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: i === 0 ? 700 : 500,
                color: i === 0 ? MB.text : "rgba(255,255,255,0.65)",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {p.name}
            </span>
            <span
              style={{
                fontSize: 10,
                color: p.change?.startsWith("+") ? MB.green : MB.red,
                fontWeight: 600,
                fontFamily: "Inter,sans-serif",
                width: 36,
                flexShrink: 0,
              }}
            >
              {p.change}
            </span>
            <div style={{ width: 80, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, flexShrink: 0 }}>
              <div
                style={{
                  width: `${p.score}%`,
                  height: "100%",
                  background: p.score >= 85 ? MB.accent : MB.accentDim,
                  borderRadius: 2,
                }}
              />
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: p.score >= 85 ? MB.accent : MB.accentDim,
                fontFamily: "Inter,sans-serif",
                width: 22,
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {p.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Signals sub-tab
export function SignalsPage({ sector }) {
  const sigC = (s) => (s === "Bullish" ? MB.green : s === "Watch" ? MB.yellow : MB.red);
  const sigBG = (s) => (s === "Bullish" ? MB.greenDim : s === "Watch" ? MB.yellowDim : MB.redDim);
  const bullish = sector.activity.filter((a) => a.sig === "Bullish");
  const watches = sector.activity.filter((a) => a.sig === "Watch");
  const cats = [...new Set(sector.activity.map((a) => a.cat))];

  // Signal strength: ratio of bullish to total
  const strength = Math.round((bullish.length / sector.activity.length) * 100);

  return (
    <div style={{ padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Summary counters */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[
          { l: "Bullish", v: bullish.length, col: MB.green, bg: MB.greenDim, Icon: TrendingUp },
          { l: "Watch", v: watches.length, col: MB.yellow, bg: MB.yellowDim, Icon: AlertTriangle },
          { l: "Total", v: sector.activity.length, col: MB.accent, bg: "rgba(184,217,53,0.1)", Icon: Activity },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              ...mCard(),
              padding: "14px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <s.Icon size={16} color={s.col} />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
              {s.v}
            </div>
            <div style={{ fontSize: 9, color: MB.muted, fontFamily: "Inter,sans-serif" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Signal Strength Meter */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={13} color={MB.accent} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Signal Strength</span>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: strength >= 70 ? MB.green : MB.yellow,
              fontFamily: "Inter,sans-serif",
            }}
          >
            {strength}%
          </span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", height: 10, borderRadius: 6, overflow: "hidden", gap: 2, marginBottom: 10 }}>
            <div style={{ flex: bullish.length, background: MB.green, borderRadius: "4px 0 0 4px" }} />
            <div style={{ flex: watches.length, background: MB.yellow }} />
            {sector.activity.length - bullish.length - watches.length > 0 && (
              <div
                style={{
                  flex: sector.activity.length - bullish.length - watches.length,
                  background: MB.red,
                  borderRadius: "0 4px 4px 0",
                }}
              />
            )}
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {[
              [MB.green, "Bullish", bullish.length],
              [MB.yellow, "Watch", watches.length],
              [MB.red, "Risk", sector.activity.length - bullish.length - watches.length],
            ]
              .filter((r) => r[2] > 0)
              .map(([col, lbl, v], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: col, flexShrink: 0 }} />
                  <span style={{ fontSize: 9, color: MB.muted, fontFamily: "Inter,sans-serif" }}>
                    {lbl} <span style={{ fontWeight: 700, color: col }}>{v}</span>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarChart3 size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>By Category</span>
        </div>
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 9 }}>
          {cats.map((cat, i) => {
            const catItems = sector.activity.filter((a) => a.cat === cat);
            const catBull = catItems.filter((a) => a.sig === "Bullish").length;
            const pct = Math.round((catItems.length / sector.activity.length) * 100);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", flex: 1, fontFamily: "Inter,sans-serif" }}
                >
                  {cat as string}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    color: catBull === catItems.length ? MB.green : MB.yellow,
                    fontWeight: 700,
                    fontFamily: "Inter,sans-serif",
                    width: 36,
                    textAlign: "right",
                  }}
                >
                  {catBull}/{catItems.length}
                </span>
                <div
                  style={{ width: 60, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, flexShrink: 0 }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: catBull === catItems.length ? MB.green : MB.yellow,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impact Summary */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingUp size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Impact Summary</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {[
            {
              l: "Highest Impact",
              v: sector.activity.sort((a, b) => b.amt?.localeCompare(a.amt || ""))[0]?.amt || "N/A",
              col: MB.accent,
            },
            { l: "Latest Signal", v: sector.activity[0]?.date || "N/A", col: MB.muted },
            { l: "Top Category", v: cats[0] || "Policy", col: MB.green },
            { l: "BRIDGE Outlook", v: "Positive", col: MB.green },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                padding: "14px 14px",
                borderRight: i % 2 === 0 ? `1px solid ${MB.borderSub}` : "none",
                borderBottom: i < 2 ? `1px solid ${MB.borderSub}` : "none",
              }}
            >
              <div style={{ ...mLabel, fontSize: 8, marginBottom: 5 }}>{m.l}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: m.col, fontFamily: "Inter,sans-serif" }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Timeline */}
      <div style={{ ...mLabel }}>Signal Timeline</div>
      {sector.activity.map((a, i) => (
        <div key={i} style={{ display: "flex", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 3 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: sigC(a.sig),
                boxShadow: `0 0 8px ${sigC(a.sig)}66`,
                flexShrink: 0,
              }}
            />
            {i < sector.activity.length - 1 && (
              <div style={{ width: 1, flex: 1, background: MB.borderSub, marginTop: 5, minHeight: 20 }} />
            )}
          </div>
          <div style={{ flex: 1, paddingBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: MB.text, lineHeight: 1.35 }}>{a.h}</div>
            <div style={{ display: "flex", gap: 7, marginTop: 5, alignItems: "center", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: 9,
                  padding: "2px 9px",
                  borderRadius: 20,
                  background: sigBG(a.sig),
                  color: sigC(a.sig),
                  fontWeight: 700,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {a.sig}
              </span>
              <span style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif" }}>
                {a.date} · {a.cat}
              </span>
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
  );
}

// ─── Portfolio Page (5th tab) ─────────────────────────────────────────────────
export function PortfolioPage({ sector }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);

  // Allocation data across watched sectors
  const allocations = [
    { sector: SECTORS[0], pct: 28, deployed: 14.2, target: 20, status: "Overweight" },
    { sector: SECTORS[1], pct: 22, deployed: 11.0, target: 15, status: "On Track" },
    { sector: SECTORS[2], pct: 18, deployed: 8.6, target: 18, status: "On Track" },
    { sector: SECTORS[3], pct: 14, deployed: 5.4, target: 12, status: "Underweight" },
    { sector: SECTORS[4], pct: 10, deployed: 3.8, target: 10, status: "On Track" },
    { sector: SECTORS[5], pct: 8, deployed: 2.1, target: 8, status: "On Track" },
  ];
  const totalDeployed = allocations.reduce((s, a) => s + a.deployed, 0);
  const totalTarget = allocations.reduce((s, a) => s + a.target, 0);
  const overallPct = Math.round((totalDeployed / totalTarget) * 100);

  const statusCol = { Overweight: MB.yellow, "On Track": MB.green, Underweight: MB.red };
  const statusBG = { Overweight: MB.yellowDim, "On Track": MB.greenDim, Underweight: MB.redDim };

  const filters = ["All", "On Track", "Overweight", "Underweight"];
  const filtered = activeFilter === "All" ? allocations : allocations.filter((a) => a.status === activeFilter);

  // Performance metrics
  const irr = Math.round(sector.score * 0.27);
  const moic = (1 + irr / 100).toFixed(2);

  return (
    <div style={{ padding: "14px 14px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Portfolio summary */}
      <div style={{ ...mCard(), padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 13,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <PieChart size={20} color={MB.accent} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: MB.text }}>Portfolio Allocation</div>
            <div style={{ fontSize: 11, color: MB.muted, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
              {allocations.length} sectors watched · Mar 2026
            </div>
          </div>
          <MRing score={overallPct} size={44} stroke={4} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {[
            { l: "Deployed ($M)", v: `$${totalDeployed}`, c: MB.accent },
            { l: "Target ($M)", v: `$${totalTarget}`, c: MB.text },
            { l: "Est. IRR", v: `${irr}%`, c: MB.green },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                padding: "10px",
                border: `1px solid ${MB.borderSub}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: m.c, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
                {m.v}
              </div>
              <div style={{ fontSize: 8, color: MB.muted, marginTop: 4, fontFamily: "Inter,sans-serif" }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Allocation bar */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarChart3 size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Sector Allocation</span>
        </div>
        <div style={{ padding: "14px 16px" }}>
          {/* Stacked bar */}
          <div style={{ display: "flex", height: 14, borderRadius: 7, overflow: "hidden", gap: 1, marginBottom: 14 }}>
            {allocations.map((a, i) => (
              <div
                key={i}
                title={a.sector.short}
                style={{
                  flex: a.pct,
                  background: `rgba(184,217,53,${0.95 - i * 0.13})`,
                  borderRadius: i === 0 ? "5px 0 0 5px" : i === allocations.length - 1 ? "0 5px 5px 0" : "0",
                }}
              />
            ))}
          </div>
          {/* Legend */}
          {allocations.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: `rgba(184,217,53,${0.95 - i * 0.13})`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.7)",
                  flex: 1,
                  fontFamily: "Inter,sans-serif",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {a.sector.short}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: MB.accent,
                  fontFamily: "Inter,sans-serif",
                  width: 28,
                  textAlign: "right",
                }}
              >
                {a.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance snapshot */}
      <div style={mCard()}>
        <div
          style={{
            padding: "13px 16px",
            borderBottom: `1px solid ${MB.borderSub}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.08)",
              border: `1px solid ${MB.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingUp size={13} color={MB.accent} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: MB.text }}>Performance</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {[
            { l: "MOIC", v: `${moic}x`, c: MB.accent },
            { l: "Deployment", v: `${overallPct}%`, c: MB.green },
            { l: "Avg Score", v: Math.round(sorted.slice(0, 6).reduce((s, x) => s + x.score, 0) / 6), c: MB.text },
            { l: "Active Signals", v: sector.activity.filter((a) => a.sig === "Bullish").length, c: MB.green },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                padding: "14px",
                borderRight: i % 2 === 0 ? `1px solid ${MB.borderSub}` : "none",
                borderBottom: i < 2 ? `1px solid ${MB.borderSub}` : "none",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: m.c, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
                {m.v}
              </div>
              <div style={{ fontSize: 9, color: MB.muted, marginTop: 5, fontFamily: "Inter,sans-serif" }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div
        className="hs"
        style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}
      >
        {filters.map((f, i) => {
          const act = f === activeFilter;
          return (
            <div
              key={i}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                background: act ? MB.accent : "rgba(255,255,255,0.05)",
                border: `1px solid ${act ? MB.accent : MB.borderSub}`,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: act ? "#0A1A0C" : MB.muted,
                  fontFamily: "Inter,sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {f}
              </span>
            </div>
          );
        })}
      </div>

      {/* Sector cards */}
      {filtered.map((a, i) => (
        <div key={i} style={{ ...mCard(), padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "rgba(184,217,53,0.08)",
                border: `1px solid ${MB.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {(a.sector as any).svgIcon(MB.accent, 14)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: MB.text,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {a.sector.short}
              </div>
              <div style={{ fontSize: 10, color: MB.muted, marginTop: 1, fontFamily: "Inter,sans-serif" }}>
                ${a.deployed}M deployed · target ${a.target}M
              </div>
            </div>
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                padding: "3px 9px",
                borderRadius: 20,
                background: statusBG[a.status],
                color: statusCol[a.status],
                fontFamily: "Inter,sans-serif",
                flexShrink: 0,
              }}
            >
              {a.status}
            </span>
          </div>
          {/* Progress bar */}
          <div
            style={{
              height: 6,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 4,
              overflow: "hidden",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: `${Math.min(100, Math.round((a.deployed / a.target) * 100))}%`,
                height: "100%",
                background: statusCol[a.status],
                borderRadius: 4,
                transition: "width 0.5s ease",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, color: MB.faint, fontFamily: "Inter,sans-serif" }}>
              {Math.round((a.deployed / a.target) * 100)}% of target
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, color: MB.accent, fontFamily: "Inter,sans-serif" }}>
              {a.pct}% allocation
            </span>
          </div>
        </div>
      ))}

      {/* Add to watchlist CTA */}
      <button
        style={{
          width: "100%",
          padding: "13px",
          background: "rgba(184,217,53,0.07)",
          border: `1px solid ${MB.border}`,
          borderRadius: 14,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Plus size={14} color={MB.accent} />
        <span style={{ fontSize: 13, fontWeight: 700, color: MB.accent, fontFamily: "DM Sans,sans-serif" }}>
          Add Sector to Watchlist
        </span>
      </button>
    </div>
  );
}
