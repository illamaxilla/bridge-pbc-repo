import { Layout } from "@/components/Layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePageMeta } from "@/hooks/usePageMeta";
import { colors } from "@/lib/theme";

export default function Terms() {
  usePageMeta({ title: "Terms of Service", description: "BRIDGE PBC terms of service and usage policies." });
  const mobile = useIsMobile();

  return (
    <Layout>
      <div style={{ minHeight: "100vh", background: colors.background, fontFamily: "'DM Sans', sans-serif" }}>
        <section style={{ background: colors.primary, padding: mobile ? "48px 20px 36px" : "64px 80px 48px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h1 style={{ margin: "0 0 8px", fontSize: mobile ? "28px" : "42px", fontWeight: 300, color: colors.white, letterSpacing: "-1px", lineHeight: 1.1 }}>
              Terms of <span style={{ fontWeight: 700 }}>Service</span>
            </h1>
            <p style={{ margin: 0, fontSize: mobile ? "14px" : "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              Last updated: March 2026
            </p>
          </div>
        </section>

        <section style={{ padding: mobile ? "32px 20px 64px" : "48px 80px 80px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", color: "#374151", fontSize: "15px", lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>1. Acceptance of Terms</h2>
            <p>By accessing or using the BRIDGE PBC website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>2. Description of Services</h2>
            <p>BRIDGE PBC provides investment intelligence, sector analysis, and research focused on Ghana's economic development across 12 integrated sectors. Our services include free public content and premium membership tiers with additional research and intelligence access.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>3. User Accounts</h2>
            <p>Certain features require account registration. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account. You must provide accurate, current information during registration.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>4. Intellectual Property</h2>
            <p>All content, research, methodologies (including the BRIDGE Impact Score™), data visualizations, and branding are the intellectual property of BRIDGE PBC. Unauthorized reproduction, distribution, or commercial use is prohibited without written consent.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>5. Membership & Payments</h2>
            <p>Paid memberships grant access to premium intelligence and documents. Membership terms, pricing, and renewal policies are detailed on our Membership page. BRIDGE PBC reserves the right to modify pricing with reasonable notice.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>6. Limitation of Liability</h2>
            <p>BRIDGE PBC provides research and analysis for informational purposes. Our content does not constitute financial, legal, or investment advice. We are not liable for decisions made based on our research or any losses arising from use of our services.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>7. Contact</h2>
            <p>For questions about these terms, contact us at <a href="/contact" style={{ color: colors.primary, textDecoration: "underline" }}>our contact page</a>.</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
