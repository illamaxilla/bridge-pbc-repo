import React from "react";
import { User, ChevronRight } from "lucide-react";
import { C } from "./constants";

function MobileSettingsPage() {
  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ padding: "16px 16px 8px" }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, marginBottom: 2 }}>Settings</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif" }}>Account & preferences</div>
      </div>
      {/* Profile card */}
      <div
        style={{
          margin: "0 12px 12px",
          borderRadius: 16,
          background: `linear-gradient(135deg,${C.sidebar},#1A3326)`,
          padding: 20,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: "rgba(184,217,53,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <User size={24} color={C.accent} />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 2 }}>Joseph A.</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.accent,
                boxShadow: `0 0 5px ${C.accent}`,
              }}
            />
            <span style={{ fontSize: 11, color: C.accent, fontFamily: "Inter,sans-serif", fontWeight: 700 }}>
              Full Access
            </span>
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            padding: "6px 12px",
            borderRadius: 8,
            background: "rgba(184,217,53,0.12)",
            border: "1px solid rgba(184,217,53,0.2)",
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, fontFamily: "Inter,sans-serif" }}>Pro</span>
        </div>
      </div>
      {/* Settings groups */}
      {[
        {
          group: "Intelligence",
          items: [
            { l: "Data Refresh", v: "Live" },
            { l: "Alert Threshold", v: "Score >85" },
            { l: "Default Sector", v: "Agriculture" },
          ],
        },
        {
          group: "Display",
          items: [
            { l: "Currency", v: "USD" },
            { l: "Date Format", v: "MMM YYYY" },
            { l: "Compact View", v: "Off" },
          ],
        },
        {
          group: "Account",
          items: [
            { l: "Version", v: "2.1.0" },
            { l: "Data: Mar 2026", v: "" },
            { l: "© 2026 BRIDGE PBC", v: "" },
          ],
        },
      ].map((g, gi) => (
        <div
          key={gi}
          style={{
            margin: "0 12px 10px",
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #E5E7EB",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "11px 16px 8px",
              fontSize: 10,
              fontWeight: 700,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              fontFamily: "Inter,sans-serif",
            }}
          >
            {g.group}
          </div>
          {g.items.map((item, ii) => (
            <div
              key={ii}
              style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderTop: "1px solid #F3F4F6" }}
            >
              <span style={{ flex: 1, fontSize: 13, color: C.dark }}>{item.l}</span>
              {item.v && (
                <span style={{ fontSize: 12, fontWeight: 600, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                  {item.v}
                </span>
              )}
              {item.v && <ChevronRight size={14} color="#D1D5DB" style={{ marginLeft: 6 }} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export { MobileSettingsPage };
