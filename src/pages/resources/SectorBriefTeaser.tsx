import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function SectorBriefTeaser() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <SiteHeader />
      <iframe
        src="/reports/agriculture-sector-brief-2026.html"
        title="BRIDGE Sector Intelligence Brief: Agriculture & Value Chains"
        style={{
          flex: 1,
          width: "100%",
          border: "none",
          minHeight: "calc(100vh - 160px)",
        }}
      />
      <SiteFooter />
    </div>
  );
}
