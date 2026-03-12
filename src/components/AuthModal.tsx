import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollLock } from "@/hooks/useScrollLock";
import { BridgeLogo } from "@/components/BridgeLogo";
import { cn } from "@/lib/utils";

import { SignInForm } from "./auth/SignInForm";
import { ForgotPasswordForm } from "./auth/ForgotPasswordForm";
import { RequestAccessForm } from "./auth/RequestAccessForm";
import { SuccessState } from "./auth/SuccessState";

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
          "fixed inset-0 z-[9998] bg-black/55 backdrop-blur-[4px] flex justify-center transition-opacity duration-[250ms]",
          isMobile ? "items-end" : "items-center",
          visible ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Modal Panel */}
        <div
          ref={modalRef}
          className={cn(
            "bridge-hide-scrollbar relative bg-white overflow-y-auto shadow-[0_24px_60px_rgba(0,0,0,0.18)]",
            isMobile
              ? "w-full max-h-[92vh] rounded-t-[20px]"
              : "w-[480px] max-h-[90vh] rounded-[20px]"
          )}
          style={{
            animation: visible
              ? (isMobile ? "bridge-slideUp 0.35s cubic-bezier(0.32,0.72,0,1)" : "bridge-modalIn 0.3s cubic-bezier(0.32,0.72,0,1)")
              : "none",
          }}
        >
          {/* Drag handle on mobile */}
          {isMobile && (
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-9 h-1 rounded-sm bg-[#DEDEDE]" />
            </div>
          )}

          {/* Header */}
          <div className={cn("flex flex-col gap-4", isMobile ? "px-5 pt-5" : "px-8 pt-5")}>
            <div className="flex justify-between items-center">
              <BridgeLogo height={isMobile ? 28 : 34} />
              <button
                onClick={onClose}
                className="w-[34px] h-[34px] rounded-full border-[1.5px] border-[#DEDEDE] bg-transparent hover:bg-[#F3F5F2] hover:border-[#1B4D3E] flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0"
              >
                <X size={16} color="#191919" />
              </button>
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
                    Request Access →
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
