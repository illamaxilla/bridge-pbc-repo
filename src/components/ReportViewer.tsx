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
    <div className="relative w-full h-screen overflow-hidden">
      {/* Floating top bar */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-2.5 bg-[rgba(27,77,62,0.92)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.08)]"
      >
        {/* Left: back button */}
        <button
          onClick={() => navigate(backTo)}
          className="flex items-center gap-1.5 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.12)] rounded-[6px] px-3.5 py-1.5 cursor-pointer text-white text-xs font-semibold font-[Inter,sans-serif] transition-[background] duration-150 hover:bg-[rgba(255,255,255,0.18)]"
        >
          <ArrowLeft size={13} />
          {backLabel}
        </button>

        {/* Center: title */}
        <span
          className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-[rgba(255,255,255,0.7)] font-[Inter,sans-serif] whitespace-nowrap overflow-hidden text-ellipsis max-w-[40%] pointer-events-none"
        >
          {title}
        </span>

        {/* Right: close */}
        <button
          onClick={() => navigate(backTo)}
          className="flex items-center justify-center w-8 h-8 rounded-[6px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.12)] cursor-pointer text-white transition-[background] duration-150 hover:bg-[rgba(255,255,255,0.18)]"
        >
          <X size={15} />
        </button>
      </div>

      {/* Report iframe */}
      <iframe
        src={src}
        title={title}
        sandbox="allow-same-origin"
        className="w-full h-full border-none pt-[52px] box-border"
      />
    </div>
  );
}
