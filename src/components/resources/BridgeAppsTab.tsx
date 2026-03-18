import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { colors } from "@/lib/theme";
import {
  Lock,
  ArrowRight,
  RefreshCw,
  X,
  ShoppingBag,
  BarChart3,
  Star,
  FileText,
  Briefcase,
  Calculator,
  Rocket,
  ExternalLink,
} from "lucide-react";

const C = {
  ...colors,
  bg: colors.background,
};

/* ─── Passcode Gate ──────────────────────────────────────────────────────── */

interface BridgeAppsGateProps {
  onAuth: (name: string) => void;
  onClose: () => void;
}

export const BridgeAppsGate: React.FC<BridgeAppsGateProps> = ({ onAuth, onClose }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const attempt = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setErr("Please enter your access code.");
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await supabase.rpc("validate_founder_code", {
        input_code: trimmed,
      });
      if (error) throw error;
      if (data) {
        onAuth(data);
      } else {
        setErr("Access code not recognised. Please check the code provided to you.");
      }
    } catch (e) {
      console.error("[BRIDGE] Apps access code verification failed:", e);
      setErr("Unable to verify code. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(7,14,9,0.92)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

      <div
        style={{
          maxWidth: 460,
          width: "100%",
          background: C.white,
          border: `1px solid ${C.line}`,
          borderTop: `3px solid ${C.primary}`,
          borderRadius: 8,
          padding: "clamp(28px, 5vw, 44px)",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: C.muted,
            padding: 4,
          }}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: `${C.primary}12`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lock size={13} color={C.primary} />
          </div>
          <span
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 10,
              fontWeight: 700,
              color: C.primary,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Restricted Access
          </span>
        </div>

        <h2
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 22,
            fontWeight: 800,
            color: C.dark,
            marginBottom: 8,
            lineHeight: 1.2,
          }}
        >
          BRIDGE Apps Demo
        </h2>
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 14,
            color: C.muted,
            lineHeight: 1.7,
            marginBottom: 28,
          }}
        >
          This section is invite-only. Enter the access code provided by the BRIDGE team to preview our platform demos.
        </p>

        {/* Code input */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 10,
              fontWeight: 700,
              color: C.muted,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 8,
            }}
          >
            Access Code
          </label>
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setErr("");
            }}
            onKeyDown={(e) => e.key === "Enter" && attempt()}
            placeholder="e.g. BRIDGE-XXXX"
            style={{
              width: "100%",
              padding: "13px 16px",
              fontFamily: '"DM Mono", monospace',
              fontSize: 15,
              letterSpacing: "2px",
              background: C.bg,
              border: `1px solid ${err ? "#A8200D" : C.line}`,
              borderRadius: 6,
              color: C.dark,
              outline: "none",
              transition: "border-color 0.15s",
              textTransform: "uppercase",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = C.primary)}
            onBlur={(e) => (e.target.style.borderColor = err ? "#A8200D" : C.line)}
            autoFocus
          />
          {err && (
            <div
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 12,
                color: "#A8200D",
                marginTop: 8,
                lineHeight: 1.5,
              }}
            >
              {err}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={attempt}
          disabled={busy}
          style={{
            width: "100%",
            background: busy ? "transparent" : C.primary,
            border: `1px solid ${C.primary}`,
            padding: "13px",
            borderRadius: 6,
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13,
            fontWeight: 700,
            color: busy ? C.primary : C.white,
            cursor: busy ? "not-allowed" : "pointer",
            transition: "all 0.15s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
          onMouseOver={(e) => {
            if (!busy) e.currentTarget.style.background = "#163f32";
          }}
          onMouseOut={(e) => {
            if (!busy) e.currentTarget.style.background = C.primary;
          }}
        >
          {busy ? (
            <>
              <RefreshCw size={13} className="animate-spin" /> Verifying...
            </>
          ) : (
            <>
              Continue <ArrowRight size={13} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

/* ─── App Card Data ──────────────────────────────────────────────────────── */

type AppStatus = "live" | "beta" | "coming-soon";

interface AppCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  status: AppStatus;
  tag: string;
}

const apps: AppCard[] = [
  {
    id: "kejetia",
    title: "Kejetia Marketplace",
    description:
      "Africa's cross-border B2B trade platform — connecting verified buyers and suppliers with built-in logistics, payments, and compliance.",
    icon: ShoppingBag,
    status: "beta",
    tag: "Trade Platform",
  },
  {
    id: "intelligence",
    title: "BRIDGE Intelligence",
    description:
      "Real-time sector analytics dashboard with investment scoring, policy tracking, and market intelligence across 12 sectors.",
    icon: BarChart3,
    status: "live",
    tag: "Analytics",
  },
  {
    id: "ratings",
    title: "BRIDGE Ratings Portal",
    description:
      "Investment readiness scoring and venture ratings powered by proprietary methodology — due diligence at scale.",
    icon: Star,
    status: "coming-soon",
    tag: "Ratings",
  },
  {
    id: "policy",
    title: "Policy Tracker",
    description:
      "Monitor regulatory changes, trade agreements, and policy shifts across African markets in real time.",
    icon: FileText,
    status: "coming-soon",
    tag: "Policy",
  },
  {
    id: "dealroom",
    title: "Investor Deal Room",
    description:
      "Secure document sharing, cap table management, and deal flow tracking for BRIDGE investment partners.",
    icon: Briefcase,
    status: "coming-soon",
    tag: "Investment",
  },
  {
    id: "impact",
    title: "Impact Score Calculator",
    description:
      "Quantify social and economic impact using BRIDGE's proprietary framework — from job creation to trade volume metrics.",
    icon: Calculator,
    status: "coming-soon",
    tag: "Impact",
  },
];

const statusConfig: Record<AppStatus, { label: string; bg: string; text: string; dot: string }> = {
  live: { label: "Live", bg: "#E8F5E0", text: "#1A6B2F", dot: "#1A6B2F" },
  beta: { label: "Beta", bg: "#FFF7E0", text: "#B8730A", dot: "#B8730A" },
  "coming-soon": { label: "Coming Soon", bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" },
};

/* ─── Landing Page ───────────────────────────────────────────────────────── */

interface BridgeAppsLandingProps {
  mobile: boolean;
}

export const BridgeAppsLanding: React.FC<BridgeAppsLandingProps> = ({ mobile }) => {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: mobile ? 28 : 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `${C.primary}10`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Rocket size={16} color={C.primary} />
          </div>
          <span
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 10,
              fontWeight: 700,
              color: C.primary,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Platform Preview
          </span>
        </div>
        <h2
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: mobile ? 22 : 28,
            fontWeight: 800,
            color: C.dark,
            marginBottom: 8,
            lineHeight: 1.2,
          }}
        >
          BRIDGE Apps
        </h2>
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 14,
            color: C.muted,
            lineHeight: 1.7,
            maxWidth: 600,
          }}
        >
          Explore the suite of tools powering Africa's next generation of cross-border trade and investment infrastructure.
        </p>
      </div>

      {/* App Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))",
          gap: mobile ? 16 : 20,
        }}
      >
        {apps.map((app) => {
          const Icon = app.icon;
          const status = statusConfig[app.status];
          return (
            <div
              key={app.id}
              style={{
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 10,
                padding: mobile ? 20 : 24,
                transition: "box-shadow 0.2s, border-color 0.2s",
                cursor: "default",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = `${C.primary}40`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = C.line;
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${C.primary}0A`,
                    border: `1px solid ${C.primary}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={18} color={C.primary} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: status.bg,
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 11,
                    fontWeight: 600,
                    color: status.text,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: status.dot,
                    }}
                  />
                  {status.label}
                </div>
              </div>

              {/* Tag */}
              <div
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 10,
                  fontWeight: 600,
                  color: C.muted,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {app.tag}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 17,
                  fontWeight: 700,
                  color: C.dark,
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                {app.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 13,
                  color: C.muted,
                  lineHeight: 1.65,
                  marginBottom: 18,
                }}
              >
                {app.description}
              </p>

              {/* CTA */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  color: app.status === "coming-soon" ? C.muted : C.primary,
                }}
              >
                {app.status === "coming-soon" ? (
                  "Notify me when available"
                ) : (
                  <>
                    Launch Demo <ExternalLink size={12} />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div
        style={{
          marginTop: mobile ? 28 : 36,
          padding: "16px 20px",
          background: `${C.primary}08`,
          border: `1px solid ${C.primary}15`,
          borderRadius: 8,
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <Lock size={14} color={C.primary} style={{ flexShrink: 0, marginTop: 2 }} />
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 12,
            color: C.muted,
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          These demos are shared under NDA with invited partners and investors. All data shown is for demonstration purposes. Please do not share access credentials or screenshots externally.
        </p>
      </div>
    </div>
  );
};
