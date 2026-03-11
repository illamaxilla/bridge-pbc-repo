import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function AnnualReviewTeaser() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <SiteHeader />
      <iframe
        src="/reports/annual-review-2026.html"
        title="BRIDGE Ghana Opportunity Report 2026"
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
