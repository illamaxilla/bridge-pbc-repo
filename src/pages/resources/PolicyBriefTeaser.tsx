import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function PolicyBriefTeaser() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <SiteHeader />
      <iframe
        src="/reports/policy-brief-2026-budget-alignment.html"
        title="Policy Brief: Ghana 2026 Budget Alignment"
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
