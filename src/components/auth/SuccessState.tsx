import React from "react";
import { colors } from "@/lib/theme";

// ============================================================
// SUCCESS STATE
// ============================================================
export interface SuccessStateProps {
  mode: string | null;
  onClose: () => void;
}

export const SuccessState = ({ mode, onClose }: SuccessStateProps) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", padding: "16px 0 8px" }}>
    <div style={{
      width: "72px", height: "72px", borderRadius: "50%",
      backgroundColor: colors.accentLight,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>

    <div style={{ textAlign: "center" as const, display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "700", color: colors.dark, fontFamily: "Inter, sans-serif", margin: 0 }}>
        {mode === "request" ? "Application Received" : "Welcome back"}
      </h2>
      <p style={{ fontSize: "14px", color: "#555", fontFamily: "Inter, sans-serif", lineHeight: "1.6", margin: 0, maxWidth: "320px" }}>
        {mode === "request"
          ? "Thank you for your interest. The BRIDGE team will review your application and reach out within 3–5 business days."
          : "You've been successfully signed in. Redirecting to your portal…"
        }
      </p>
    </div>

    {mode === "request" && (
      <button
        onClick={onClose}
        style={{
          padding: "13px 40px", borderRadius: "50px", border: "none",
          backgroundColor: colors.primary, color: colors.white,
          fontSize: "15px", fontWeight: "600", fontFamily: "Inter, sans-serif",
          cursor: "pointer", marginTop: "4px",
        }}
      >
        Done
      </button>
    )}
  </div>
);
