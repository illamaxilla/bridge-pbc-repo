import { Target, LineChart, Radio, Building2, Globe } from "lucide-react";
import { M } from "../constants";

export function MobileBottomNav({ sub, setSub }) {
  const tabs = [
    { id: "kpis", label: "KPIs", icon: (c) => <Target size={20} color={c} /> },
    { id: "performance", label: "Performance", icon: (c) => <LineChart size={20} color={c} /> },
    { id: "activity", label: "Activity", icon: (c) => <Radio size={20} color={c} /> },
    { id: "companies", label: "Companies", icon: (c) => <Building2 size={20} color={c} /> },
    { id: "map", label: "Map", icon: (c) => <Globe size={20} color={c} /> },
  ];
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: M.surface,
        borderTop: `1px solid ${M.border}`,
        display: "flex",
        alignItems: "stretch",
        zIndex: 300,
        backdropFilter: "blur(12px)",
      }}
    >
      {tabs.map((t) => {
        const act = t.id === sub;
        return (
          <div
            key={t.id}
            onClick={() => setSub(t.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              cursor: "pointer",
              position: "relative",
            }}
          >
            {act && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 28,
                  height: 2,
                  borderRadius: "0 0 3px 3px",
                  background: M.accent,
                }}
              />
            )}
            {t.icon(act ? M.accent : M.muted)}
            <span
              style={{
                fontSize: 9,
                fontWeight: act ? 700 : 400,
                color: act ? M.accent : M.muted,
                fontFamily: "Inter,sans-serif",
                letterSpacing: "0.3px",
              }}
            >
              {t.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
