import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * Color values sourced from @/lib/theme — colors.primary (#1B4D3E) and
 * colors.accent (#B8D935).  They are written as Tailwind arbitrary-value
 * literals so the JIT compiler can detect them at build time.
 */

interface SectorIntelligenceWrapperProps {
  children: React.ReactNode;
  title: string;
  freePreviewPath?: string;
  backPath?: string;
}

export default function SectorIntelligenceWrapper({
  children,
  title,
  freePreviewPath,
  backPath = "/resources",
}: SectorIntelligenceWrapperProps) {
  const navigate = useNavigate();
  const mobile = useIsMobile();

  const handlePrint = () => {
    window.print();
  };

  const handleFreePreview = () => {
    if (freePreviewPath) {
      navigate(freePreviewPath);
    }
  };

  return (
    <div>
      {/* Sector Intelligence Header Bar */}
      <div
        className={`np sticky top-0 z-[150] bg-[#1B4D3E] flex justify-between items-center shadow-[0_2px_8px_rgba(0,0,0,0.12)] ${
          mobile ? "px-4 py-2" : "px-6 py-2"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate(backPath)}
            className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-md px-3 py-1.5 text-[11px] font-semibold text-white font-[Inter,sans-serif] cursor-pointer hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={12} /> Resources
          </button>
          {!mobile && (
            <span className="text-[11px] font-semibold text-white/50 font-[Inter,sans-serif]">
              {title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!mobile && freePreviewPath && (
            <button
              onClick={handleFreePreview}
              className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-md px-3 py-1.5 text-[11px] font-semibold text-[#B8D935] font-[Inter,sans-serif] cursor-pointer hover:bg-white/20 transition-colors"
            >
              <Download size={12} /> Download Free Version
            </button>
          )}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-[#B8D935] text-[#1B4D3E] border-none rounded-md px-3 py-1.5 text-[11px] font-bold font-[Inter,sans-serif] cursor-pointer hover:brightness-110 transition-all"
          >
            <Printer size={12} /> {mobile ? "PDF" : "Save as PDF"}
          </button>
        </div>
      </div>

      {/* Page Content */}
      {children}

      {/* Sector Intelligence Footer Bar */}
      <div
        className={`np bg-[#1B4D3E] flex justify-between gap-3 ${
          mobile
            ? "flex-col items-stretch px-4 py-5"
            : "flex-row items-center px-8 py-5"
        }`}
      >
        <div>
          <div className="text-sm font-bold text-white font-['DM_Sans',sans-serif] mb-1">
            BRIDGE Sector Intelligence
          </div>
          <div className="text-xs text-white/50 font-[Inter,sans-serif]">
            Access the full research suite with all 12 sector analyses.
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => navigate(backPath)}
            className={`flex items-center justify-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-[18px] py-2.5 text-xs font-semibold text-white font-[Inter,sans-serif] cursor-pointer hover:bg-white/20 transition-colors ${
              mobile ? "flex-1" : ""
            }`}
          >
            <ArrowLeft size={12} /> Back to Resources
          </button>
          <button
            onClick={handlePrint}
            className={`flex items-center justify-center gap-1.5 bg-[#B8D935] text-[#1B4D3E] border-none rounded-full px-[18px] py-2.5 text-xs font-bold font-[Inter,sans-serif] cursor-pointer hover:brightness-110 transition-all ${
              mobile ? "flex-1" : ""
            }`}
          >
            <Printer size={12} /> Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
