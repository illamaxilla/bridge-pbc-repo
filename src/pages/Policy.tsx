import SiteHeader from "@/components/SiteHeaderMinimal";
import SiteFooter from "@/components/SiteFooter";

const C = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
  text: "#4A5A52",
};

export default function PolicyPage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: C.white, minHeight: "100vh" }}>
      <SiteHeader />

      {/* Hero */}
      <section
        style={{
          backgroundColor: C.primary,
          padding: "80px 48px 72px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              border: "1px solid rgba(184,217,53,0.35)",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "1.5px",
              color: C.accent,
              marginBottom: "24px",
              textTransform: "uppercase" as const,
            }}
          >
            Policy & Governance
          </div>
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: "300",
              color: C.white,
              margin: "0 0 20px",
              lineHeight: "1.15",
              letterSpacing: "-0.5px",
            }}
          >
            Policy <span style={{ fontWeight: "700", color: C.accent }}>Updates</span>
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.7)",
              lineHeight: "1.65",
              margin: 0,
            }}
          >
            Tracking regulatory developments, legislative changes, and policy shifts that shape investment
            and development across Ghana's 12 key sectors.
          </p>
        </div>
      </section>

      {/* Placeholder content */}
      <section style={{ padding: "80px 48px", backgroundColor: C.background }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              backgroundColor: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "28px",
              fontWeight: "600",
              color: C.primary,
              margin: "0 0 16px",
            }}
          >
            Coming Soon
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: C.text,
              lineHeight: "1.7",
              maxWidth: "520px",
              margin: "0 auto 40px",
            }}
          >
            Our policy intelligence hub is under development. It will cover regulatory frameworks,
            sector-specific legislation, and policy recommendations across all 12 BRIDGE sectors.
          </p>

          {/* Preview cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              textAlign: "left",
              marginTop: "48px",
            }}
          >
            {[
              { label: "Regulatory Frameworks", desc: "National and sector-level regulatory landscape analysis." },
              { label: "Legislative Tracker", desc: "Pending and enacted legislation affecting investment climate." },
              { label: "Policy Briefs", desc: "Concise analyses of policy shifts and their economic implications." },
              { label: "Stakeholder Positions", desc: "Government, private sector, and civil society perspectives." },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  backgroundColor: C.white,
                  borderRadius: "14px",
                  padding: "24px",
                  border: `1px solid ${C.line}`,
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: C.accent,
                    marginBottom: "14px",
                  }}
                />
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: C.primary,
                    margin: "0 0 8px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {card.label}
                </h3>
                <p style={{ fontSize: "13px", color: C.text, lineHeight: "1.6", margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
