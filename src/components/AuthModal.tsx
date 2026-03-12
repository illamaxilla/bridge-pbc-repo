import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { colors } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollLock } from "@/hooks/useScrollLock";
import { BridgeLogo } from "@/components/BridgeLogo";

import { SignInForm } from "./auth/SignInForm";
import { ForgotPasswordForm } from "./auth/ForgotPasswordForm";
import { RequestAccessForm } from "./auth/RequestAccessForm";
import { SuccessState } from "./auth/SuccessState";

// ============================================================
// MAIN MODAL COMPONENT
// ============================================================
export interface BRIDGEAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "request";
  onSignInSuccess?: () => void;
}

export const BRIDGEAuthModal = ({ isOpen, onClose, defaultTab = "signin", onSignInSuccess }: BRIDGEAuthModalProps) => {
  const [tab, setTab] = useState<"signin" | "request">(defaultTab);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForgot, setShowForgot] = useState(false);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSuccess(null);
      setShowForgot(false);
      setTab(defaultTab);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen, defaultTab]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useScrollLock(isOpen);

  if (!isOpen && !visible) return null;

  const hPad = isMobile ? "20px" : "32px";

  return (
    <>
      <style>{`
        @keyframes bridge-spin { to { transform: rotate(360deg); } }
        @keyframes bridge-modalIn { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes bridge-slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes bridge-slideDown { from { transform: translateY(0); } to { transform: translateY(100%); } }
        .bridge-hide-scrollbar::-webkit-scrollbar { display: none; }
        .bridge-hide-scrollbar { scrollbar-width: none; }
      `}</style>

      {/* Backdrop */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={handleBackdrop}
        style={{
          position: "fixed", inset: 0, zIndex: 9998,
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: isMobile ? "flex-end" : "center",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        {/* Modal Panel */}
        <div
          ref={modalRef}
          className="bridge-hide-scrollbar"
          style={{
            position: "relative",
            backgroundColor: colors.white,
            width: isMobile ? "100%" : "480px",
            maxHeight: isMobile ? "92vh" : "90vh",
            overflowY: "auto",
            borderRadius: isMobile ? "20px 20px 0 0" : "20px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
            animation: visible
              ? (isMobile ? "bridge-slideUp 0.35s cubic-bezier(0.32,0.72,0,1)" : "bridge-modalIn 0.3s cubic-bezier(0.32,0.72,0,1)")
              : "none",
          }}
        >
          {/* Drag handle on mobile */}
          {isMobile && (
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px", paddingBottom: "4px" }}>
              <div style={{ width: "36px", height: "4px", borderRadius: "2px", backgroundColor: colors.line }} />
            </div>
          )}

          {/* Header */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "16px",
            padding: `20px ${hPad} 0`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <BridgeLogo height={isMobile ? 28 : 34} />
              <button
                onClick={onClose}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.background;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = colors.primary;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = colors.line;
                }}
                style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  border: `1.5px solid ${colors.line}`, backgroundColor: "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s ease", flexShrink: 0,
                }}
              >
                <X size={16} color={colors.dark} />
              </button>
            </div>

            {/* Tab Bar */}
            {!success && !showForgot && (
              <div style={{
                display: "flex", gap: "4px",
                backgroundColor: colors.background,
                borderRadius: "12px", padding: "4px",
              }}>
                {([
                  { key: "signin" as const, label: "Sign In" },
                  { key: "request" as const, label: "Request Access" },
                ]).map(t => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTab(t.key)}
                    style={{
                      flex: 1, padding: isMobile ? "10px 8px" : "10px 16px",
                      borderRadius: "9px", border: "none",
                      backgroundColor: tab === t.key ? colors.white : "transparent",
                      color: tab === t.key ? colors.primary : "#999",
                      fontSize: isMobile ? "13px" : "14px",
                      fontWeight: tab === t.key ? "700" : "500",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer", transition: "all 0.2s ease",
                      boxShadow: tab === t.key ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Body */}
          <div style={{ padding: `24px ${hPad} 32px` }}>
            {success ? (
              <SuccessState mode={success} onClose={onClose} />
            ) : showForgot ? (
              <ForgotPasswordForm onBack={() => setShowForgot(false)} />
            ) : tab === "signin" ? (
              <>
                <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <h2 id="auth-modal-title" style={{ fontSize: "22px", fontWeight: "700", color: colors.dark, fontFamily: "Inter, sans-serif", margin: 0 }}>
                    Welcome back
                  </h2>
                  <p style={{ fontSize: "14px", color: "#666", fontFamily: "Inter, sans-serif", margin: 0 }}>
                    Sign in to access your BRIDGE portal and documents.
                  </p>
                </div>

                <SignInForm onSuccess={() => { onSignInSuccess?.(); setSuccess("signin"); }} onForgot={() => setShowForgot(true)} />

                <p style={{ textAlign: "center" as const, fontSize: "13px", color: "#666", fontFamily: "Inter, sans-serif", marginTop: "20px" }}>
                  Don't have access yet?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("request")}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: colors.primary, fontWeight: "600", fontSize: "13px",
                      fontFamily: "Inter, sans-serif", padding: 0, textDecoration: "underline",
                    }}
                  >
                    Request Access →
                  </button>
                </p>
              </>
            ) : (
              <>
                <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <h2 id="auth-modal-title" style={{ fontSize: "22px", fontWeight: "700", color: colors.dark, fontFamily: "Inter, sans-serif", margin: 0 }}>
                    Access the full BRIDGE research{" "}
                    <span style={{ color: colors.primary }}>library</span>
                  </h2>
                  <p style={{ fontSize: "14px", color: "#666", fontFamily: "Inter, sans-serif", margin: 0 }}>
                    Complete 12 sector analyses, white papers, investment summaries, and government alignment documentation.
                  </p>
                </div>

                <RequestAccessForm onSuccess={(mode) => setSuccess(mode)} isMobile={isMobile} />

                <p style={{ textAlign: "center" as const, fontSize: "13px", color: "#666", fontFamily: "Inter, sans-serif", marginTop: "20px" }}>
                  Already have access?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("signin")}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: colors.primary, fontWeight: "600", fontSize: "13px",
                      fontFamily: "Inter, sans-serif", padding: 0, textDecoration: "underline",
                    }}
                  >
                    Sign In →
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BRIDGEAuthModal;
