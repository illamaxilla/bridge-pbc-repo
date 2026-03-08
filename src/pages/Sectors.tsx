import React from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeaderMinimal";

const sectors = [
  { label: "Energy & Power", path: "/sectors/energy", icon: "⚡" },
  { label: "Technology", path: "/sectors/technology", icon: "💻" },
  { label: "Sports & Recreation", path: "/sectors/sports", icon: "⚽" },
  { label: "Transport & Logistics", path: "/sectors/transport", icon: "🚛" },
  { label: "Manufacturing", path: "/sectors/manufacturing", icon: "🏭" },
  { label: "Housing & Real Estate", path: "/sectors/housing", icon: "🏠" },
  { label: "Financial Services", path: "/sectors/financial", icon: "💰" },
  { label: "Health Systems", path: "/sectors/health", icon: "🏥" },
  { label: "Infrastructure", path: "/sectors/infrastructure", icon: "🏗️" },
  { label: "Tourism & Hospitality", path: "/sectors/tourism", icon: "✈️" },
  { label: "Education", path: "/sectors/education", icon: "📚" },
  { label: "Agriculture", path: "/sectors/agriculture", icon: "🌾" },
];

export default function Sectors() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", minHeight: "100vh", backgroundColor: "#F3F5F2" }}>
      <SiteHeader />

      {/* Hero */}
      <section style={{ backgroundColor: "#1B4D3E", padding: "80px 80px 64px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(184,217,53,0.15)",
              border: "1px solid rgba(184,217,53,0.3)",
              borderRadius: "50px",
              padding: "8px 20px",
              marginBottom: "32px",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: "700", color: "#B8D935", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              12 Sectors
            </span>
          </div>
          <h1
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: "300",
              color: "#FFFFFF",
              lineHeight: "1.1",
              letterSpacing: "-1px",
              marginBottom: "24px",
            }}
          >
            Where BRIDGE
            <br />
            <span style={{ color: "#B8D935" }}>Deploys Capital</span>
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.7)",
              lineHeight: "1.7",
              maxWidth: "560px",
            }}
          >
            BRIDGE targets 12 high-impact sectors where strategic investment, diaspora expertise, and policy alignment converge to create transformative outcomes for Ghana.
          </p>
        </div>
      </section>

      {/* Sector Grid */}
      <section style={{ padding: "64px 80px 96px", maxWidth: "1360px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {sectors.map((sector) => (
            <button
              key={sector.path}
              onClick={() => navigate(sector.path)}
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #DEDEDE",
                borderRadius: "16px",
                padding: "32px 28px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#1B4D3E";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(27,77,62,0.12)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#DEDEDE";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: "32px" }}>{sector.icon}</span>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "600", color: "#1B4D3E", marginBottom: "8px" }}>
                  {sector.label}
                </p>
                <p style={{ fontSize: "13px", color: "rgba(27,77,62,0.6)" }}>
                  Explore sector →
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* CTA strip */}
        <div
          style={{
            marginTop: "64px",
            backgroundColor: "#1B4D3E",
            borderRadius: "20px",
            padding: "48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ fontSize: "28px", fontWeight: "400", color: "#FFFFFF", marginBottom: "12px", letterSpacing: "-0.5px" }}>
              Ready to invest in Ghana's growth?
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", lineHeight: "1.6" }}>
              Connect with BRIDGE to explore sector-specific opportunities.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/login")}
              style={{
                backgroundColor: "#B8D935",
                color: "#191919",
                border: "none",
                padding: "14px 28px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Request Access
            </button>
            <button
              onClick={() => navigate("/contact")}
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                border: "1.5px solid rgba(255,255,255,0.3)",
                padding: "14px 28px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
