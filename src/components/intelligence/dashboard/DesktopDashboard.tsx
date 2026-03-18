import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ChevronRight,
  BarChart3,
  LineChart,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Download,
  Share2,
  Clock,
  RefreshCw,
  Star,
  Target,
  Activity,
  MoreHorizontal,
  FileText,
  BarChart2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as LC,
  Line,
} from "recharts";
import { C, sigCol } from "./constants";
import type { Sector } from "./constants";
import { ventureIcon } from "./constants";
import { SECTORS } from "./data";
import { Card, Gauge, SectorHeader, Tip, TierB } from "./UIComponents";
import ComparePanel from "./ComparePanel";
import DesktopDashHeader from "./DesktopDashHeader";
import DesktopDashStatusBar from "./DesktopDashStatusBar";

export default function DesktopDashboard() {
  const [searchParams] = useSearchParams();
  const [s, setS] = useState(() => {
    const id = searchParams.get("sector");
    return SECTORS.find(sec => sec.id === id) || SECTORS[0];
  });
  const [collapsed, setCollapsed] = useState(false);
  const [chart, setChart] = useState("bar");
  const [notif, setNotif] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareSectors, setCompareSectors] = useState<any[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Sync when URL param changes (e.g. sidebar sector click)
  useEffect(() => {
    const id = searchParams.get("sector");
    if (id) {
      const found = SECTORS.find(sec => sec.id === id);
      if (found) {
        setFadeKey(k => k + 1);
        setS(found);
      }
    }
  }, [searchParams]);

  const handleSectorSelect = useCallback((sec: any) => {
    setFadeKey(k => k + 1);
    setS(sec);
    setSearchQuery("");
    setSearchOpen(false);
  }, []);

  const handleCompareToggle = (sec: any) => {
    setCompareSectors(prev => {
      if (prev.find(p => p.id === sec.id)) return prev.filter(p => p.id !== sec.id);
      if (prev.length >= 2) return [prev[1], sec];
      return [...prev, sec];
    });
  };

  const cData = (s.t1 || [])
    .slice(0, 6)
    .map((v, i) => ({
      name: v.name.split(" ").slice(0, 2).join(" "),
      "Tier I": 60 + i * 5,
      "Tier II": 40 + i * 4,
      "Tier III": 25 + i * 3,
    }));
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        overflow: "hidden",
        background: "#EFF3EF",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      {/* Compare Panel */}
      {compareMode && compareSectors.length === 2 && (
        <ComparePanel sA={compareSectors[0]} sB={compareSectors[1]} onClose={() => { setCompareMode(false); setCompareSectors([]); }} />
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <DesktopDashHeader
          s={s}
          setS={setS}
          setFadeKey={setFadeKey}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          searchRef={searchRef}
          searchContainerRef={searchContainerRef}
          notif={notif}
          setNotif={setNotif}
          handleSectorSelect={handleSectorSelect}
          searchParams={searchParams}
        />
        <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
          <div
            key={fadeKey}
            style={{
              flex: 1, overflowY: "auto", padding: "18px",
              animation: "dash-fade-in 0.28s ease-out",
            }}
          >
            <style>{`@keyframes dash-fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 252px", gap: 14, marginBottom: 14 }}>
              <Card style={{ padding: 0 }}>
                <div style={{ padding: "16px 20px 10px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 2,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#6B7280",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          fontFamily: "Inter,sans-serif",
                          marginBottom: 3,
                        }}
                      >
                        {s.full}
                      </div>
                      <div
                        style={{
                          fontSize: 30,
                          fontWeight: 700,
                          color: "#111827",
                          lineHeight: 1,
                          letterSpacing: "-1px",
                        }}
                      >
                        {s.totalV}{" "}
                        <span style={{ fontSize: 13, fontWeight: 400, color: "#6B7280" }}>ventures identified</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                        ${s.capLow}–{s.capHigh}M capital range · {s.irrLow}–{s.irrHigh}% projected IRR
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7 }}>
                      <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 3 }}>
                        {(
                          [
                            ["Bar", "bar", BarChart3],
                            ["Line", "line", LineChart],
                          ] as [string, string, React.ComponentType<{ size?: number }>][]
                        ).map(([l, v, ChartIcon]) => (
                          <button
                            key={v}
                            onClick={() => setChart(v)}
                            style={{
                              padding: "4px 8px",
                              borderRadius: 5,
                              border: "none",
                              background: chart === v ? "#fff" : "transparent",
                              fontSize: 10,
                              fontWeight: 600,
                              color: chart === v ? "#1B4D3E" : "#6B7280",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              boxShadow: chart === v ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
                            }}
                          >
                            <ChartIcon size={11} />
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                    {[
                      ["Tier I Priority", "#B8D935"],
                      ["Tier II Medium-term", "#2E5A4D"],
                      ["Tier III Long-term", "rgba(107,114,128,0.6)"],
                    ].map(([l, c]) => (
                      <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 9, height: 9, borderRadius: 2, background: c }} />
                        <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ height: 190, padding: "0 8px 10px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    {chart === "bar" ? (
                      <BarChart data={cData} barSize={16} barGap={3}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 9, fill: "#6B7280", fontFamily: "Inter,sans-serif" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis tick={{ fontSize: 9, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<Tip />} />
                        <Bar dataKey="Tier I" fill="#B8D935" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="Tier II" fill="#2E5A4D" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="Tier III" fill="rgba(107,114,128,0.5)" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    ) : (
                      <LC data={cData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 9, fill: "#6B7280" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis tick={{ fontSize: 9, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<Tip />} />
                        <Line dataKey="Tier I" stroke="#B8D935" strokeWidth={2} dot={{ r: 3 }} type="monotone" />
                        <Line dataKey="Tier II" stroke="#2E5A4D" strokeWidth={2} dot={{ r: 3 }} type="monotone" />
                        <Line
                          dataKey="Tier III"
                          stroke="#6B7280"
                          strokeWidth={1.5}
                          dot={{ r: 2 }}
                          type="monotone"
                          strokeDasharray="5 4"
                        />
                      </LC>
                    )}
                  </ResponsiveContainer>
                </div>
              </Card>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  {
                    label: "Portfolio Capital",
                    v: `$${s.capLow}–${s.capHigh}M`,
                    sub: "Capital Range",
                    up: true,
                    d: "+Growth",
                  },
                  {
                    label: "BRIDGE Impact Score",
                    v: String(s.score),
                    sub: "/ 100 Current",
                    up: s.score >= 80,
                    d: s.score >= 88 ? "Tier I Ready" : s.score >= 80 ? "Strong" : "Developing",
                  },
                  {
                    label: "IRR Potential",
                    v: `${s.irrLow}–${s.irrHigh}%`,
                    sub: "Projected Return",
                    up: true,
                    d: `${s.totalV} Ventures`,
                  },
                ].map((m, i) => (
                  <Card key={i} style={{ padding: "15px 17px", flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif", marginBottom: 4 }}>
                      {m.label}
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#111827",
                        letterSpacing: "-.5px",
                        lineHeight: 1,
                        marginBottom: 5,
                      }}
                    >
                      {m.v}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      {m.up ? <TrendingUp size={11} color="#16A34A" /> : <TrendingDown size={11} color="#DC2626" />}
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: m.up ? "#16A34A" : "#DC2626",
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {m.d}
                      </span>
                      <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{m.sub}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <Card style={{ padding: "16px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Capital Deployment Progress</div>
                    <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                      Venture pipeline vs. target allocation
                    </div>
                  </div>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}>
                    <RefreshCw size={13} />
                  </button>
                </div>
                {s.pipeline.map((p, i) => (
                  <div key={i} style={{ marginBottom: 11 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", fontFamily: "Inter,sans-serif" }}>
                        {p.label}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#1B4D3E", fontFamily: "Inter,sans-serif" }}>
                        {p.current} <span style={{ fontWeight: 400, color: "#6B7280" }}>/ {p.target}</span>
                      </span>
                    </div>
                    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${p.pct}%`,
                          height: "100%",
                          background: "linear-gradient(90deg,#B8D935,#2E5A4D)",
                          borderRadius: 3,
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                      <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>
                        {p.pct}% deployed
                      </span>
                      <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>
                        ~{p.months}mo remaining
                      </span>
                    </div>
                  </div>
                ))}
              </Card>
              <Card
                style={{
                  padding: "20px 22px",
                  background: "linear-gradient(145deg,#1B4D3E 0%,#243F2F 60%,#1A3528 100%)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: -20,
                    top: -20,
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    background: "rgba(184,217,53,0.05)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: -30,
                    bottom: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.03)",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "3px 9px",
                        borderRadius: 4,
                        background: "#EBF5B0",
                        color: "#1B4D3E",
                        fontFamily: "Inter,sans-serif",
                        letterSpacing: ".8px",
                        textTransform: "uppercase",
                      }}
                    >
                      Key Insight
                    </span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "Inter,sans-serif" }}>
                      {s.tag}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.45,
                      marginBottom: 10,
                      letterSpacing: "-.2px",
                    }}
                  >
                    {s.headline}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.62)",
                      lineHeight: 1.65,
                      fontFamily: "Inter,sans-serif",
                      marginBottom: 18,
                    }}
                  >
                    {s.insight}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 18 }}>
                    {[
                      { label: "Capital Range", val: `$${s.capLow}–${s.capHigh}M` },
                      { label: "IRR Potential", val: `${s.irrLow}–${s.irrHigh}%` },
                      { label: "Ventures", val: `${s.totalV} identified` },
                    ].map((st, i) => (
                      <div
                        key={i}
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 9,
                          padding: "10px 12px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: i === 1 ? "#B8D935" : "#fff",
                            fontFamily: "Inter,sans-serif",
                            lineHeight: 1,
                            marginBottom: 4,
                          }}
                        >
                          {st.val}
                        </div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "Inter,sans-serif" }}>
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#B8D935",
                      color: "#1B4D3E",
                      border: "none",
                      padding: "9px 16px",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 700,
                      fontFamily: "Inter,sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    Full Analysis <ArrowUpRight size={12} />
                  </button>
                </div>
              </Card>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              <Card style={{ padding: "16px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 2 }}>
                  Venture Breakdown
                </div>
                <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginBottom: 10 }}>
                  By intervention type · {s.totalV} ventures
                </div>
                <div
                  style={{ fontSize: 22, fontWeight: 700, color: "#111827", letterSpacing: "-.5px", marginBottom: 1 }}
                >
                  ${s.capLow}–{s.capHigh}M
                </div>
                <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginBottom: 10 }}>
                  Total sector capital range
                </div>
                <div style={{ height: 8, borderRadius: 5, overflow: "hidden", display: "flex", marginBottom: 13 }}>
                  {s.subSectors.map((ss, i) => (
                    <div key={i} style={{ flex: ss.pct, background: ss.color }} />
                  ))}
                </div>
                {s.subSectors.map((ss, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 9, height: 9, borderRadius: 2, background: ss.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: "#374151", fontFamily: "Inter,sans-serif" }}>{ss.name}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#111827", fontFamily: "Inter,sans-serif" }}>
                      {ss.pct}%
                    </span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #F3F4F6", marginTop: 12, paddingTop: 12 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#6B7280",
                      letterSpacing: ".8px",
                      textTransform: "uppercase",
                      fontFamily: "Inter,sans-serif",
                      marginBottom: 8,
                    }}
                  >
                    Tier Distribution
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                    {[
                      [s.t1?.length, "I", "#EBF5B0", "#1B4D3E", "Priority"],
                      [s.t2?.length, "II", "rgba(46,90,77,0.1)", "#2E5A4D", "Mid-term"],
                      [s.t3?.length, "III", "rgba(107,114,128,0.08)", "#6B7280", "Long-term"],
                    ].map(([n, label, bg, col, sub]: [any, any, any, any, any]) => (
                      <div
                        key={label}
                        style={{ background: bg, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}
                      >
                        <div
                          style={{
                            fontSize: 17,
                            fontWeight: 700,
                            color: col,
                            fontFamily: "Inter,sans-serif",
                            lineHeight: 1,
                          }}
                        >
                          {n}
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: col,
                            fontFamily: "Inter,sans-serif",
                            marginTop: 2,
                          }}
                        >
                          T{label}
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            color: col,
                            opacity: 0.7,
                            fontFamily: "Inter,sans-serif",
                            marginTop: 1,
                          }}
                        >
                          {sub}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "#F9FAFB",
                      borderRadius: 8,
                      padding: "8px 12px",
                      border: "1px solid #F3F4F6",
                    }}
                  >
                    <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>
                      IRR Potential Range
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1B4D3E", fontFamily: "Inter,sans-serif" }}>
                      {s.irrLow}–{s.irrHigh}%
                    </span>
                  </div>
                </div>
              </Card>
              <Card style={{ padding: "18px 18px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 2 }}>Impact Score</div>
                <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginBottom: 16 }}>
                  4-dimension BRIDGE methodology
                </div>
                <Gauge score={s.score} />
                <div style={{ textAlign: "center", marginTop: 12, marginBottom: 18 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: s.score >= 88 ? "#16A34A" : s.score >= 80 ? "#CA8A04" : "#DC2626",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {s.score >= 88 ? "Tier I Ready" : s.score >= 80 ? "Strong" : "Developing"}
                  </span>
                </div>
                {[
                  ["P&P Alignment", Math.min(s.score + 4, 96)],
                  ["Strategic Fit", Math.max(s.score - 2, 0)],
                  ["Feasibility", Math.min(s.score + 2, 98)],
                  ["Scalability", Math.max(s.score - 1, 0)],
                ].map(([l, v]) => (
                  <div key={l} style={{ marginBottom: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{l}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#374151", fontFamily: "Inter,sans-serif" }}>
                        {v}
                      </span>
                    </div>
                    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${v}%`, height: "100%", background: "#1B4D3E", borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 10,
                    color: "#9CA3AF",
                    fontFamily: "Inter,sans-serif",
                    lineHeight: 1.5,
                    borderTop: "1px solid #F3F4F6",
                    paddingTop: 10,
                  }}
                >
                  Based on BRIDGE 6-stage methodology across {s.totalV} ventures. Mar 2026.
                </div>
              </Card>
              <Card style={{ padding: "16px 18px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Venture Pipeline</div>
                    <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                      {s.totalV} ventures · 3 tiers
                    </div>
                  </div>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#1B4D3E",
                      background: "none",
                      border: "1px solid #E5E7EB",
                      borderRadius: 5,
                      padding: "3px 8px",
                      cursor: "pointer",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    <Target size={10} />
                    Targets
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  {[
                    [s.t1?.length, "I", "#EBF5B0", "#1B4D3E"],
                    [s.t2?.length, "II", "rgba(46,90,77,0.12)", "#2E5A4D"],
                    [s.t3?.length, "III", "rgba(107,114,128,0.1)", "#6B7280"],
                    ].map(([n, label, bg, col]: [any, any, any, any]) => (
                    <div
                      key={label as string}
                      style={{ flex: 1, padding: "9px 10px", background: bg as string, borderRadius: 8, textAlign: "center" }}
                    >
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: col,
                          fontFamily: "Inter,sans-serif",
                          lineHeight: 1,
                        }}
                      >
                        {n}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: col,
                          fontFamily: "Inter,sans-serif",
                          marginTop: 2,
                        }}
                      >
                        TIER {label}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#6B7280",
                    letterSpacing: ".8px",
                    textTransform: "uppercase",
                    fontFamily: "Inter,sans-serif",
                    marginBottom: 7,
                  }}
                >
                  Priority — Tier I
                </div>
                {s.pipeline.slice(0, 2).map((p, i) => (
                  <div key={i} style={{ marginBottom: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#374151",
                          fontFamily: "Inter,sans-serif",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                        }}
                      >
                        {p.label}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#1B4D3E",
                          fontFamily: "Inter,sans-serif",
                          flexShrink: 0,
                          marginLeft: 4,
                        }}
                      >
                        {p.current}
                      </span>
                    </div>
                    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${p.pct}%`, height: "100%", background: "#B8D935", borderRadius: 3 }} />
                    </div>
                    <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                      {p.months}mo remaining
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#6B7280",
                    letterSpacing: ".8px",
                    textTransform: "uppercase",
                    fontFamily: "Inter,sans-serif",
                    margin: "10px 0 7px",
                  }}
                >
                  Medium-term — Tier II
                </div>
                {s.pipeline.slice(2, 4).map((p, i) => (
                  <div key={i} style={{ marginBottom: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#374151",
                          fontFamily: "Inter,sans-serif",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                        }}
                      >
                        {p.label}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#2E5A4D",
                          fontFamily: "Inter,sans-serif",
                          flexShrink: 0,
                          marginLeft: 4,
                        }}
                      >
                        {p.current}
                      </span>
                    </div>
                    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${p.pct}%`, height: "100%", background: "#2E5A4D", borderRadius: 3 }} />
                    </div>
                    <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                      {p.months}mo remaining
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
          <div
            style={{
              width: 322,
              flexShrink: 0,
              background: "#fff",
              borderLeft: "1px solid #E5E7EB",
              overflowY: "auto",
              padding: "14px 0",
            }}
          >
            <div style={{ margin: "0 12px 14px", borderRadius: 12, overflow: "hidden", border: "1px solid #E5E7EB" }}>
              <div style={{ background: "#1B4D3E", padding: "14px" }}>
                <SectorHeader s={s} />
                <div style={{ display: "flex", gap: 3, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}>
                  {SECTORS.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setS(sec)}
                      style={{
                        flexShrink: 0,
                        padding: "3px 8px",
                        borderRadius: 14,
                        border: `1px solid ${sec.id === s.id ? "#B8D935" : "rgba(255,255,255,0.15)"}`,
                        background: sec.id === s.id ? "#B8D935" : "transparent",
                        fontSize: 9,
                        fontWeight: sec.id === s.id ? 700 : 400,
                        color: sec.id === s.id ? "#1B4D3E" : "rgba(255,255,255,0.45)",
                        cursor: "pointer",
                        fontFamily: "Inter,sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {sec.short.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ padding: "11px 12px" }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#6B7280",
                    letterSpacing: ".8px",
                    textTransform: "uppercase",
                    fontFamily: "Inter,sans-serif",
                    marginBottom: 7,
                  }}
                >
                  Quick Actions
                </div>
                {/* Compare sector selector */}
                {compareMode && (
                  <div style={{ marginBottom: 8, padding: "8px 10px", background: "#EBF5B0", borderRadius: 8, border: "1px solid rgba(184,217,53,0.4)" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#1B4D3E", fontFamily: "Inter,sans-serif", marginBottom: 6 }}>
                      Select 2 sectors to compare ({compareSectors.length}/2)
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
                      {SECTORS.slice(0, 6).map(sec => {
                        const selected = compareSectors.find(p => p.id === sec.id);
                        return (
                          <button key={sec.id} onClick={() => handleCompareToggle(sec)} style={{
                            padding: "3px 8px", borderRadius: 5, border: `1px solid ${selected ? "#1B4D3E" : "rgba(27,77,62,0.2)"}`,
                            background: selected ? "#1B4D3E" : "transparent", color: selected ? "#B8D935" : "#1B4D3E",
                            fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "Inter,sans-serif",
                          }}>{sec.short.split(" ")[0]}</button>
                        );
                      })}
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button
                        disabled={compareSectors.length < 2}
                        onClick={() => compareSectors.length === 2 && setCompareMode(true)}
                        style={{
                          flex: 1, padding: "5px 0", borderRadius: 5, border: "none",
                          background: compareSectors.length === 2 ? "#1B4D3E" : "#D1D5DB",
                          color: compareSectors.length === 2 ? "#B8D935" : "#9CA3AF",
                          fontSize: 10, fontWeight: 700, cursor: compareSectors.length === 2 ? "pointer" : "not-allowed",
                          fontFamily: "Inter,sans-serif",
                        }}
                      >Compare Now</button>
                      <button onClick={() => { setCompareMode(false); setCompareSectors([]); }} style={{
                        padding: "5px 8px", borderRadius: 5, border: "1px solid rgba(27,77,62,0.2)",
                        background: "transparent", color: "#1B4D3E", fontSize: 10, fontWeight: 600,
                        cursor: "pointer", fontFamily: "Inter,sans-serif",
                      }}>Cancel</button>
                    </div>
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                  {(
                    [
                      [FileText, "View Report", null],
                      [Download, "Export Data", null],
                      [BarChart2, "Compare", () => { setCompareMode(m => !m); if (!compareMode) setCompareSectors([]); }],
                      [Clock, "History", null],
                      [Share2, "Share", null],
                      [MoreHorizontal, "More", null],
                    ] as [React.ComponentType<{ size?: number }>, string, (() => void) | null][]
                  ).map(([ActionIcon, label, onClick]) => (
                    <button
                      key={label}
                      onClick={onClick || undefined}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "6px 8px",
                        background: label === "Compare" && compareMode ? "#EBF5B0" : "#F9FAFB",
                        border: `1px solid ${label === "Compare" && compareMode ? "#B8D935" : "#E5E7EB"}`,
                        borderRadius: 7,
                        cursor: "pointer",
                        fontSize: 10,
                        fontWeight: label === "Compare" && compareMode ? 700 : 500,
                        color: label === "Compare" && compareMode ? "#1B4D3E" : "#374151",
                        fontFamily: "Inter,sans-serif",
                        transition: "all .15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#1B4D3E";
                        e.currentTarget.style.color = "#1B4D3E";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = label === "Compare" && compareMode ? "#B8D935" : "#E5E7EB";
                        e.currentTarget.style.color = label === "Compare" && compareMode ? "#1B4D3E" : "#374151";
                      }}
                    >
                      <ActionIcon size={11} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ margin: "0 12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>Key Ventures</span>
                <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{s.totalV} total</span>
              </div>
              {[
                ...(s.t1 || []).slice(0, 3).map((v) => ({ ...v, t: 1 })),
                ...(s.t2 || []).slice(0, 1).map((v) => ({ ...v, t: 2 })),
                ...(s.t3 || []).slice(0, 1).map((v) => ({ ...v, t: 3 })),
              ].map((v, i) => {
                const VIcon = ventureIcon(v.name);
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "7px 8px",
                      borderRadius: 8,
                      marginBottom: 3,
                      cursor: "pointer",
                      transition: "background .1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 7,
                        background: "rgba(27,77,62,0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <VIcon size={13} color="#2E5A4D" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#111827",
                          fontFamily: "Inter,sans-serif",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {v.name}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                        <TierB t={v.t} />
                        <span style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>
                          {v.irr} IRR
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={11} color="#6B7280" />
                  </div>
                );
              })}
            </div>
            <div style={{ margin: "0 12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>Sector Intelligence</span>
                <select
                  style={{
                    fontSize: 10,
                    color: "#6B7280",
                    border: "1px solid #E5E7EB",
                    borderRadius: 5,
                    padding: "2px 5px",
                    background: "#fff",
                    cursor: "pointer",
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  <option>Mar 2026</option>
                  <option>Feb 2026</option>
                </select>
              </div>
              {s.activity.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 9,
                    padding: "9px 9px",
                    borderRadius: 8,
                    marginBottom: 4,
                    background: "#FAFAFA",
                    border: "1px solid #E5E7EB",
                    cursor: "pointer",
                    transition: "border-color .15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1B4D3E")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                >
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
                      fontSize: 11,
                      color: sigCol(a.sig),
                      fontWeight: 700,
                    }}
                  >
                    {a.sig === "Bullish" ? "↑" : a.sig === "Bearish" ? "↓" : "→"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#111827", lineHeight: 1.3, marginBottom: 2 }}>
                      {a.h}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontSize: 9, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                      <span
                        style={{ fontSize: 9, fontWeight: 700, color: sigCol(a.sig), fontFamily: "Inter,sans-serif" }}
                      >
                        {a.sig}
                      </span>
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: 10,
                          fontWeight: 700,
                          color: sigCol(a.sig),
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
            <div style={{ margin: "14px 12px 0" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginBottom: 7 }}>Cross-Sector Links</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.cross.map((cid, i) => {
                  const found = SECTORS.find((sec) => sec.id === cid);
                  if (!found) return null;
                  const Icon = found.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => setS(found)}
                      title={found.full}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        border: "1px solid #E5E7EB",
                        background: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all .15s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#EBF5B0";
                        e.currentTarget.style.borderColor = "#B8D935";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.borderColor = "#E5E7EB";
                      }}
                    >
                      <Icon size={14} color="#1B4D3E" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Status Bar */}
        <DesktopDashStatusBar s={s} />
      </div>
    </div>
  );
}
