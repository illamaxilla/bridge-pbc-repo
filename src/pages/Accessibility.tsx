import { Layout } from "@/components/Layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePageMeta } from "@/hooks/usePageMeta";
import { colors } from "@/lib/theme";

export default function Accessibility() {
  usePageMeta({ title: "Accessibility", description: "BRIDGE PBC's commitment to digital accessibility and WCAG compliance." });
  const mobile = useIsMobile();

  return (
    <Layout>
      <div style={{ minHeight: "100vh", background: colors.background, fontFamily: "'DM Sans', sans-serif" }}>
        <section style={{ background: colors.primary, padding: mobile ? "48px 20px 36px" : "64px 80px 48px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h1 style={{ margin: "0 0 8px", fontSize: mobile ? "28px" : "42px", fontWeight: 300, color: colors.white, letterSpacing: "-1px", lineHeight: 1.1 }}>
              Accessibility <span style={{ fontWeight: 700 }}>Statement</span>
            </h1>
            <p style={{ margin: 0, fontSize: mobile ? "14px" : "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              Our commitment to inclusive access
            </p>
          </div>
        </section>

        <section style={{ padding: mobile ? "32px 20px 64px" : "48px 80px 80px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", color: "#374151", fontSize: "15px", lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>Our Commitment</h2>
            <p>BRIDGE PBC is committed to ensuring digital accessibility for people of all abilities. We continually improve the user experience for everyone and apply relevant accessibility standards across our platform.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>Accessibility Features</h2>
            <ul style={{ paddingLeft: "24px", margin: "0 0 16px" }}>
              <li style={{ marginBottom: "8px" }}>Semantic HTML structure for screen reader compatibility</li>
              <li style={{ marginBottom: "8px" }}>Skip-to-content navigation links</li>
              <li style={{ marginBottom: "8px" }}>Keyboard-navigable interfaces and focus indicators</li>
              <li style={{ marginBottom: "8px" }}>ARIA labels and roles on interactive elements</li>
              <li style={{ marginBottom: "8px" }}>Sufficient color contrast ratios across the design system</li>
              <li style={{ marginBottom: "8px" }}>Responsive design supporting various screen sizes and zoom levels</li>
              <li style={{ marginBottom: "8px" }}>Alt text for meaningful images and visual content</li>
            </ul>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>Standards</h2>
            <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. We regularly review our site to identify and address accessibility barriers.</p>

            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "32px 0 16px" }}>Feedback</h2>
            <p>We welcome feedback on the accessibility of our site. If you encounter accessibility barriers or have suggestions, please <a href="/contact" style={{ color: colors.primary, textDecoration: "underline" }}>contact us</a>. We take all feedback seriously and will work to address issues promptly.</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
