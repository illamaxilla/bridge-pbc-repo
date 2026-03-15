import { Layout } from "@/components/Layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { colors } from "@/lib/theme";

export default function Privacy() {
  const mobile = useIsMobile();

  return (
    <Layout>
      <div style={{ minHeight: "100vh", background: colors.background, fontFamily: "'DM Sans', sans-serif" }}>
        <section style={{ background: colors.primary, padding: mobile ? "48px 20px 36px" : "64px 80px 48px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h1 style={{ margin: "0 0 8px", fontSize: mobile ? "28px" : "42px", fontWeight: 300, color: colors.white, letterSpacing: "-1px", lineHeight: 1.1 }}>
              Privacy <span style={{ fontWeight: 700 }}>Policy</span>
            </h1>
            <p style={{ margin: 0, fontSize: mobile ? "14px" : "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              Last updated: March 2026
            </p>
          </div>
        </section>

        <section style={{ padding: mobile ? "32px 20px 64px" : "48px 80px 80px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", color: "#374151", fontSize: "15px", lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>1. Information We Collect</h2>
            <p>We collect information you provide directly, including name, email address, organization, and country when you register, request access, or subscribe to our newsletter. We also collect usage data such as pages visited and features used.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>2. How We Use Your Information</h2>
            <p>Your information is used to provide and improve our services, personalize your experience, communicate updates and intelligence briefs, process membership transactions, and conduct research to improve our sector analyses.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>3. Data Storage & Security</h2>
            <p>We use industry-standard security measures to protect your data. User accounts are managed through Supabase with encrypted authentication. We do not sell your personal information to third parties.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>4. Cookies & Analytics</h2>
            <p>We use cookies and similar technologies to analyze site usage, remember preferences, and improve functionality. You may disable cookies in your browser settings, though some features may be affected.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>5. Third-Party Services</h2>
            <p>We use third-party services for authentication, analytics, and hosting. These services have their own privacy policies governing their use of your data.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>6. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time. To exercise these rights, contact us through our <a href="/contact" style={{ color: colors.primary, textDecoration: "underline" }}>contact page</a>.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>7. Contact</h2>
            <p>For privacy-related inquiries, reach us at <a href="/contact" style={{ color: colors.primary, textDecoration: "underline" }}>our contact page</a>.</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
