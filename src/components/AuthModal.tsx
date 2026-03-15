import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollLock } from "@/hooks/useScrollLock";
import { BridgeLogo, BridgeLogoWhite } from "@/components/BridgeLogo";
import { cn } from "@/lib/utils";

import { SignInForm } from "./auth/SignInForm";
import { ForgotPasswordForm } from "./auth/ForgotPasswordForm";
import { RequestAccessForm } from "./auth/RequestAccessForm";
import { SuccessState } from "./auth/SuccessState";

// ── Brand Panel (left side on desktop) ───────────────────────────────────────
const BrandPanel = ({ tab }: { tab: "signin" | "request" }) => {
  const isRequest = tab === "request";
  const stats = isRequest
    ? [
        { n: "12", label: "Sector analyses" },
        { n: "174+", label: "Identified ventures" },
        { n: "60K+", label: "Words of research" },
      ]
    : [
        { n: "12", label: "Integrated sectors" },
        { n: "GH", label: "Ghana-first focus" },
        { n: "PBC", label: "Public benefit corp" },
      ];

  return (
    <div className="relative flex flex-col justify-between overflow-hidden min-h-[520px] bg-gradient-to-br from-[#0f2e24] to-[#1B4D3E] p-[44px_36px]">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Top */}
      <div className="relative">
        <BridgeLogoWhite height={28} />
        <div className="mt-9">
          <div className="inline-block px-3 py-[5px] border border-[rgba(184,217,53,0.35)] rounded-full mb-4">
            <span className="text-[10px] font-bold font-[Inter,sans-serif] text-[#B8D935] tracking-[1.2px] uppercase">
              {isRequest ? "Research Library" : "Authenticated Portal"}
            </span>
          </div>
          <h2 className="font-[Georgia,'Times_New_Roman',serif] text-[26px] font-bold text-white leading-[1.3] m-0 mb-3.5">
            {isRequest
              ? "Building Ghana's most comprehensive investment intelligence platform."
              : "Welcome back to Ghana's premier investment intelligence platform."}
          </h2>
          <p className="text-[13px] text-white/[0.55] font-[Inter,sans-serif] leading-[1.7] m-0">
            {isRequest
              ? "Institutional-grade sector analysis built for investors, government partners, and development organizations."
              : "Access your personalized portal, sector analyses, and investment documentation."}
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative">
        <div className="h-px bg-white/10 mb-6" />
        <div className="flex">
          {stats.map((s, i) => (
            <div
              key={i}
              className={cn(
                "flex-1",
                i < stats.length - 1 && "pr-4 mr-4 border-r border-white/10"
              )}
            >
              <div className="text-[22px] font-extrabold font-[Inter,sans-serif] text-[#B8D935] leading-none">
                {s.n}
              </div>
              <div className="text-[11px] text-white/[0.45] font-[Inter,sans-serif] mt-1 leading-[1.3]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-white/[0.25] font-[Inter,sans-serif] mt-5 m-0">
          &copy; 2026 BRIDGE PBC &middot; All rights reserved
        </p>
      </div>
    </div>
  );
};

// ── Main Modal ───────────────────────────────────────────────────────────────
export interface BRIDGEAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "request";
  onSignInSuccess?: () => void;
  /** When true, hides the close button and disables backdrop/escape dismissal */
  preventClose?: boolean;
}

export const BRIDGEAuthModal = ({ isOpen, onClose, defaultTab = "signin", onSignInSuccess, preventClose = false }: BRIDGEAuthModalProps) => {
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
    if (!preventClose && e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    if (preventClose) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, preventClose]);

  useScrollLock(isOpen);

  if (!isOpen && !visible) return null;

  return (
    <>
      <style>{`
        @keyframes bridge-spin { to { transform: rotate(360deg); } }
        @keyframes bridge-modalIn { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes bridge-slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .bridge-hide-scrollbar::-webkit-scrollbar { display: none; }
        .bridge-hide-scrollbar { scrollbar-width: none; }
      `}</style>

      {/* Backdrop */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={handleBackdrop}
        className={cn(
          "fixed inset-0 z-[9998] backdrop-blur-[8px] flex justify-center transition-opacity duration-[250ms]",
          isMobile ? "items-end bg-black/55" : "items-center bg-[rgba(8,24,18,0.78)]",
          visible ? "opacity-100" : "opacity-0"
        )}
        style={{ padding: isMobile ? 0 : "20px" }}
      >
        {/* Modal Shell */}
        <div
          ref={modalRef}
          className={cn(
            "bridge-hide-scrollbar relative overflow-hidden",
            isMobile
              ? "w-full max-h-[94vh] rounded-t-[20px] bg-white"
              : "w-full max-w-[860px] max-h-[90vh] rounded-[20px] grid grid-cols-[2fr_3fr]"
          )}
          style={{
            boxShadow: "0 40px 100px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.2)",
            animation: visible
              ? (isMobile ? "bridge-slideUp 0.35s cubic-bezier(0.32,0.72,0,1)" : "bridge-modalIn 0.3s cubic-bezier(0.32,0.72,0,1)")
              : "none",
          }}
        >
          {/* Left brand panel — hidden on mobile and when showing success */}
          {!isMobile && !success && <BrandPanel tab={tab} />}

          {/* Right form panel */}
          <div className="bridge-hide-scrollbar bg-white overflow-y-auto relative">
            {/* Drag handle on mobile */}
            {isMobile && (
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-9 h-1 rounded-sm bg-[#DEDEDE]" />
              </div>
            )}

            {/* Header */}
            <div className={cn("flex flex-col gap-4", isMobile ? "px-5 pt-5" : "px-8 pt-5")}>
              <div className="flex justify-between items-center">
                {isMobile ? <BridgeLogo height={28} /> : <div />}
                {!preventClose && (
                  <button
                    onClick={onClose}
                    className="w-[34px] h-[34px] rounded-full border-[1.5px] border-[#DEDEDE] bg-transparent hover:bg-[#F3F5F2] hover:border-[#1B4D3E] flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0"
                  >
                    <X size={16} color="#191919" />
                  </button>
                )}
              </div>

              {/* Tab Bar */}
              {!success && !showForgot && (
                <div className="flex gap-1 bg-[#F3F5F2] rounded-xl p-1">
                  {([
                    { key: "signin" as const, label: "Sign In" },
                    { key: "request" as const, label: "Request Access" },
                  ]).map(t => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTab(t.key)}
                      className={cn(
                        "flex-1 rounded-[9px] border-none font-[Inter,sans-serif] cursor-pointer transition-all duration-200 whitespace-nowrap",
                        isMobile ? "py-2.5 px-2 text-[13px]" : "py-2.5 px-4 text-sm",
                        tab === t.key
                          ? "bg-white text-[#1B4D3E] font-bold shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                          : "bg-transparent text-gray-400 font-medium"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Body */}
            <div className={cn(isMobile ? "px-5 pt-6 pb-8" : "px-8 pt-6 pb-8")}>
              {success ? (
                <SuccessState mode={success} onClose={onClose} />
              ) : showForgot ? (
                <ForgotPasswordForm onBack={() => setShowForgot(false)} />
              ) : tab === "signin" ? (
                <>
                  <div className="mb-6 flex flex-col gap-1.5">
                    <h2 id="auth-modal-title" className="text-[22px] font-bold text-[#191919] font-[Inter,sans-serif] m-0">
                      Welcome back
                    </h2>
                    <p className="text-sm text-gray-500 font-[Inter,sans-serif] m-0">
                      Sign in to access your BRIDGE portal and documents.
                    </p>
                  </div>

                  <SignInForm onSuccess={() => { onSignInSuccess?.(); setSuccess("signin"); }} onForgot={() => setShowForgot(true)} />

                  <p className="text-center text-[13px] text-gray-500 font-[Inter,sans-serif] mt-5">
                    Don't have access yet?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("request")}
                      className="bg-transparent border-none cursor-pointer text-[#1B4D3E] font-semibold text-[13px] font-[Inter,sans-serif] p-0 underline"
                    >
                      Request Access &rarr;
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <div className="mb-6 flex flex-col gap-1.5">
                    <h2 id="auth-modal-title" className="text-[22px] font-bold text-[#191919] font-[Inter,sans-serif] m-0">
                      Access the full BRIDGE research{" "}
                      <span className="text-[#1B4D3E]">library</span>
                    </h2>
                    <p className="text-sm text-gray-500 font-[Inter,sans-serif] m-0">
                      Complete 12 sector analyses, white papers, investment summaries, and government alignment documentation.
                    </p>
                  </div>

                  <RequestAccessForm onSuccess={(mode) => setSuccess(mode)} isMobile={isMobile} />

                  <p className="text-center text-[13px] text-gray-500 font-[Inter,sans-serif] mt-5">
                    Already have access?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("signin")}
                      className="bg-transparent border-none cursor-pointer text-[#1B4D3E] font-semibold text-[13px] font-[Inter,sans-serif] p-0 underline"
                    >
                      Sign In &rarr;
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BRIDGEAuthModal;
