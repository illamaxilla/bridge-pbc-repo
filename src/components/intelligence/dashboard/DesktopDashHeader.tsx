import { RefObject } from "react";
import {
  Search,
  PlusCircle,
  User,
  ChevronDown,
  Bell,
  SlidersHorizontal,
} from "lucide-react";
import { sigCol } from "./constants";
import type { Sector } from "./constants";
import { SECTORS } from "./data";
import SearchOverlay from "./SearchOverlay";

interface Props {
  s: Sector;
  setS: (s: Sector) => void;
  setFadeKey: (fn: (k: number) => number) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchRef: RefObject<HTMLInputElement>;
  searchContainerRef: RefObject<HTMLDivElement>;
  notif: boolean;
  setNotif: (fn: (prev: boolean) => boolean) => void;
  handleSectorSelect: (sec: any) => void;
  searchParams: URLSearchParams;
}

export default function DesktopDashHeader({
  s,
  setS,
  setFadeKey,
  searchQuery,
  setSearchQuery,
  searchOpen,
  setSearchOpen,
  searchRef,
  searchContainerRef,
  notif,
  setNotif,
  handleSectorSelect,
  searchParams,
}: Props) {
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        padding: "0 22px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        height: 56,
        flexShrink: 0,
        boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
      }}
    >
      {/* LEFT — Title + filter state */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", lineHeight: 1.1 }}>Dashboard</div>
          <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif", marginTop: 1 }}>
            {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
          </div>
        </div>
        {/* Vertical divider */}
        <div style={{ width: 1, height: 28, background: "#E5E7EB", flexShrink: 0 }} />
        {/* Active sector breadcrumb chip */}
        {(() => {
          const Icon = s.icon;
          const isDefault = s.id === SECTORS[0].id && !searchParams.get("sector");
          return (
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "Inter,sans-serif" }}>Viewing:</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "3px 7px 3px 9px",
                  borderRadius: 7,
                  background: "#EBF5B0",
                  border: "1px solid rgba(184,217,53,0.35)",
                  animation: "dash-fade-in 0.25s ease-out",
                }}
                title={`Viewing: ${s.full}`}
              >
                <Icon size={11} color="#1B4D3E" strokeWidth={1.8} />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#1B4D3E", fontFamily: "Inter,sans-serif", whiteSpace: "nowrap" }}>
                  {s.short}
                </span>
                {searchParams.get("sector") && (
                  <button
                    onClick={() => {
                      setFadeKey(k => k + 1);
                      setS(SECTORS[0]);
                      const url = new URL(window.location.href);
                      url.searchParams.delete("sector");
                      window.history.replaceState({}, "", url.pathname);
                    }}
                    title="Reset to default"
                    style={{
                      background: "rgba(27,77,62,0.12)", border: "none", borderRadius: 3,
                      width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", padding: 0, marginLeft: 1, flexShrink: 0,
                      color: "#1B4D3E", fontSize: 11, lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* CENTER — Search */}
      <div
        ref={searchContainerRef}
        style={{
          flex: 1,
          maxWidth: 360,
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: searchOpen ? "#fff" : "#F9FAFB",
          border: `1px solid ${searchOpen ? "#1B4D3E" : "#E5E7EB"}`,
          borderRadius: 9,
          padding: "7px 12px",
          marginLeft: "auto",
          transition: "border-color 0.15s, background 0.15s",
        }}
      >
        <Search size={13} color={searchOpen ? "#1B4D3E" : "#6B7280"} />
        <input
          ref={searchRef}
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
          onFocus={() => setSearchOpen(true)}
          placeholder="Search sectors, ventures, metrics…"
          style={{
            background: "none",
            border: "none",
            outline: "none",
            fontSize: 12,
            color: "#374151",
            fontFamily: "Inter,sans-serif",
            width: "100%",
          }}
        />
        {searchQuery ? (
          <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "#9CA3AF", flexShrink: 0 }}>
            ×
          </button>
        ) : (
          <span style={{ fontSize: 9, color: "#6B7280", background: "#E5E7EB", padding: "1px 5px", borderRadius: 3, fontFamily: "Inter,sans-serif", flexShrink: 0, whiteSpace: "nowrap" }}>⌘K</span>
        )}
        {/* Search Results Overlay */}
        {searchOpen && searchQuery && (
          <SearchOverlay query={searchQuery} onSelect={handleSectorSelect} onClose={() => { setSearchOpen(false); setSearchQuery(""); }} />
        )}
      </div>

      {/* RIGHT — Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
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
            <Bell size={15} color="#374151" />
            <div
              style={{
                position: "absolute",
                top: 7,
                right: 7,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#DC2626",
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
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Alerts</span>
                <span style={{ fontSize: 11, color: "#B8D935", cursor: "pointer", fontWeight: 600 }}>
                  Mark all read
                </span>
              </div>
              {s.activity.slice(0, 3).map((a, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 9, padding: "10px 14px", borderBottom: "1px solid #E5E7EB" }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: sigCol(a.sig),
                      marginTop: 4,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>{a.h}</div>
                    <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                      {a.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
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
          <SlidersHorizontal size={14} color="#374151" />
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
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
            <User size={13} color="#1B4D3E" />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", lineHeight: 1 }}>Joseph A.</div>
            <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>Full Access</div>
          </div>
          <ChevronDown size={11} color="#6B7280" />
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#1B4D3E",
            color: "#fff",
            border: "none",
            borderRadius: 9,
            padding: "8px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          <PlusCircle size={13} />
          Add Widget
        </button>
      </div>
    </div>
  );
}
