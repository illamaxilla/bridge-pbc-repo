export interface SuccessStateProps {
  mode: string | null;
  onClose: () => void;
}

export const SuccessState = ({ mode, onClose }: SuccessStateProps) => (
  <div className="flex flex-col items-center gap-6 pt-4 pb-2">
    <div className="w-[72px] h-[72px] rounded-full bg-[#E8F5E0] flex items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B4D3E" strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>

    <div className="text-center flex flex-col gap-2.5">
      <h2 className="text-[22px] font-bold text-[#191919] font-[Inter,sans-serif] m-0">
        {mode === "request" ? "Application Received" : "Welcome back"}
      </h2>
      <p className="text-sm text-gray-600 font-[Inter,sans-serif] leading-relaxed m-0 max-w-[320px]">
        {mode === "request"
          ? "Thank you for your interest. The BRIDGE team will review your application and reach out within 3–5 business days."
          : "You've been successfully signed in. Redirecting to your portal…"
        }
      </p>
    </div>

    {mode === "request" && (
      <button
        onClick={onClose}
        className="px-10 py-[13px] rounded-full border-none bg-[#1B4D3E] text-white text-[15px] font-semibold font-[Inter,sans-serif] cursor-pointer mt-1"
      >
        Done
      </button>
    )}
  </div>
);
