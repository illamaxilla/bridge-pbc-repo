import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Download } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const C = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  white: "#FFFFFF",
  dark: "#111827",
  muted: "#6B7280",
  line: "#E5E7EB",
  bg: "#F9FAFB",
};

interface SectorIntelligenceWrapperProps {
  children: React.ReactNode;
  title: string;
  freeDownloadPath?: string;
  backPath?: string;
}

export default function SectorIntelligenceWrapper({
  children,
  title,
  freeDownloadPath,
  backPath = "/resources",
}: SectorIntelligenceWrapperProps) {
  const navigate = useNavigate();
  const mobile = useIsMobile();

  const handlePrint = () => {
    window.print();
  };

  const handleFreeDownload = () => {
    if (freeDownloadPath) {
      navigate(freeDownloadPath);
    }
  };

  return (
    <div>
      {/* Sector Intelligence Header Bar */}
      <div
        className="np"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 150,
          background: C.primary,
          padding: mobile ? "8px 16px" : "8px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => navigate(backPath)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "6px",
              padding: "6px 12px",
              fontSize: "11px",
              fontWeight: "600",
              color: C.white,
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={12} /> Resources
          </button>
          {!mobile && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {title}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {!mobile && freeDownloadPath && (
            <button
              onClick={handleFreeDownload}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "11px",
                fontWeight: "600",
                color: C.accent,
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
              }}
            >
              <Download size={12} /> Download Free Version
            </button>
          )}
          <button
            onClick={handlePrint}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: C.accent,
              color: C.primary,
              border: "none",
              borderRadius: "6px",
              padding: "6px 12px",
              fontSize: "11px",
              fontWeight: "700",
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
            }}
          >
            <Printer size={12} /> {mobile ? "PDF" : "Save as PDF"}
          </button>
        </div>
      </div>

      {/* Page Content */}
      {children}

      {/* Sector Intelligence Footer Bar */}
      <div
        className="np"
        style={{
          background: C.primary,
          padding: mobile ? "20px 16px" : "20px 32px",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: mobile ? "stretch" : "center",
          gap: "12px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "700",
              color: C.white,
              fontFamily: "DM Sans,sans-serif",
              marginBottom: "4px",
            }}
          >
            BRIDGE Sector Intelligence
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "Inter,sans-serif",
            }}
          >
            Access the full research suite with all 12 sector analyses.
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <button
            onClick={() => navigate(backPath)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50px",
              padding: "10px 18px",
              fontSize: "12px",
              fontWeight: "600",
              color: C.white,
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
              flex: mobile ? 1 : "none",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={12} /> Back to Resources
          </button>
          <button
            onClick={handlePrint}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: C.accent,
              color: C.primary,
              border: "none",
              borderRadius: "50px",
              padding: "10px 18px",
              fontSize: "12px",
              fontWeight: "700",
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
              flex: mobile ? 1 : "none",
              justifyContent: "center",
            }}
          >
            <Printer size={12} /> Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
