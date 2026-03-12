import { useState } from "react";
import {
  Bell,
  Search,
  User,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { C } from "../constants";
import type { WatchlistSector } from "./types";

export interface TopNavProps {
  sector: WatchlistSector;
  syncing: boolean;
  setSyncing: (v: boolean) => void;
}

export function TopNav({ sector, syncing, setSyncing }) {
  const [notif, setNotif] = useState(false);
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1400);
  };
  const month = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  const SectorIcon = sector.icon;
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 56,
        flexShrink: 0,
        boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
      }}
    >
      <style>{`.sp{animation:spin 1s linear infinite}`}</style>

      {/* LEFT — Title + Divider + Sector Pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Watchlist</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{month}</div>
        </div>
        <div style={{ width: 1, height: 28, background: "#E5E7EB" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 10px",
            borderRadius: 7,
            background: C.accentBg,
            border: "1px solid rgba(184,217,53,0.27)",
          }}
        >
          <SectorIcon size={11} color={C.primary} strokeWidth={1.5} />
          <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
            {sector.short}
          </span>
        </div>
      </div>

      {/* CENTER-RIGHT — Search */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
        <div
          style={{
            width: 380,
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: "#F9FAFB",
            border: "1px solid #E5E7EB",
            borderRadius: 9,
            padding: "7px 11px",
          }}
        >
          <Search size={13} color={C.muted} />
          <input
            placeholder="Search reports, signals..."
            style={{
              background: "none",
              border: "none",
              outline: "none",
              fontSize: 12,
              color: C.mid,
              fontFamily: "Inter,sans-serif",
              width: "100%",
            }}
          />
        </div>

        {/* Bell */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setNotif((o) => !o)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              border: "1px solid #E5E7EB",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Bell size={15} color={C.mid} />
            <div
              style={{
                position: "absolute",
                top: 7,
                right: 7,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.red,
                border: "2px solid #fff",
              }}
            />
          </button>
          {notif && (
            <div
              style={{
                position: "absolute",
                top: 44,
                right: 0,
                width: 280,
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                zIndex: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "11px 14px",
                  borderBottom: "1px solid #E5E7EB",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Alerts</span>
                <span
                  style={{ fontSize: 11, color: C.accent, cursor: "pointer", fontWeight: 600 }}
                  onClick={() => setNotif(false)}
                >
                  Mark all read
                </span>
              </div>
              {sector.activity.slice(0, 3).map((a, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 9, padding: "10px 14px", borderBottom: "1px solid #F3F4F6" }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: a.sig === "Bullish" ? "#16A34A" : "#CA8A04",
                      marginTop: 4,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.dark, lineHeight: 1.3 }}>{a.h}</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                      {a.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Refresh */}
        <button
          onClick={handleSync}
          style={{
            width: 36,
            height: 36,
            borderRadius: 9,
            border: "1px solid #E5E7EB",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <RefreshCw size={14} color={C.mid} className={syncing ? "sp" : ""} />
        </button>

        {/* User Profile Chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 11px",
            border: "1px solid #E5E7EB",
            borderRadius: 9,
            cursor: "pointer",
            background: "#fff",
          }}
        >
          <div
            style={{
              width: 27,
              height: 27,
              borderRadius: "50%",
              background: "rgba(184,217,53,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <User size={13} color={C.primary} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, lineHeight: 1 }}>Joseph A.</div>
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>Full Access</div>
          </div>
          <ChevronDown size={11} color={C.muted} />
        </div>
      </div>
    </div>
  );
}
