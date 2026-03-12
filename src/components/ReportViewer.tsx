import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";

interface ReportViewerProps {
  src: string;
  title: string;
  backTo?: string;
  backLabel?: string;
}

/**
 * Full-viewport iframe viewer for HTML reports with a minimal floating
 * navigation bar at the top. Keeps the user oriented and provides a
 * clean way to exit back to the site.
 */
export default function ReportViewer({
  src,
  title,
  backTo = "/resources",
  backLabel = "Back to Resources",
}: ReportViewerProps) {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Floating top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          background: "rgba(27, 77, 62, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Left: back button */}
        <button
          onClick={() => navigate(backTo)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "6px",
            padding: "6px 14px",
            cursor: "pointer",
            color: "#fff",
            fontSize: "12px",
            fontWeight: "600",
            fontFamily: "Inter, sans-serif",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
        >
          <ArrowLeft size={13} />
          {backLabel}
        </button>

        {/* Center: title */}
        <span
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "12px",
            fontWeight: "600",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "Inter, sans-serif",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "40%",
            pointerEvents: "none",
          }}
        >
          {title}
        </span>

        {/* Right: close */}
        <button
          onClick={() => navigate(backTo)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.12)",
            cursor: "pointer",
            color: "#fff",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
        >
          <X size={15} />
        </button>
      </div>

      {/* Report iframe */}
      <iframe
        src={src}
        title={title}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          paddingTop: "52px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
