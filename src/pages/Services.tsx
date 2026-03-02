import { Link } from "react-router-dom";

const sectors = [
  { name: "Energy & Renewable Resources", path: "/sectors/energy", icon: "⚡", desc: "Sustainable energy solutions and renewable resource development." },
  { name: "Technology & Innovation", path: "/sectors/technology", icon: "💻", desc: "Cutting-edge technology and innovation ecosystems." },
  { name: "Sports, Entertainment & Creative", path: "/sectors/sports", icon: "🎭", desc: "Sports, creative industries, and entertainment ventures." },
  { name: "Transportation & Logistics", path: "/sectors/transport", icon: "🚚", desc: "Transport infrastructure and supply chain solutions." },
  { name: "Manufacturing & Light Industry", path: "/sectors/manufacturing", icon: "🏭", desc: "Manufacturing capacity and light industrial development." },
  { name: "Housing & Real Estate", path: "/sectors/housing", icon: "🏠", desc: "Affordable housing and real estate investment frameworks." },
  { name: "Financial Inclusion & Economic Security", path: "/sectors/financial", icon: "💰", desc: "Financial access, inclusion, and economic resilience." },
  { name: "Health Systems & Wellbeing", path: "/sectors/health", icon: "🏥", desc: "Healthcare systems, wellness, and community health." },
  { name: "Infrastructure & Basic Services", path: "/sectors/infrastructure", icon: "🏗️", desc: "Core infrastructure and essential public services." },
  { name: "Tourism & Hospitality", path: "/sectors/tourism", icon: "✈️", desc: "Tourism development and hospitality industry growth." },
  { name: "Education & Skills", path: "/sectors/education", icon: "📚", desc: "Education systems, skills development, and workforce training." },
  { name: "Agriculture & Value Chains", path: "/sectors/agriculture", icon: "🌾", desc: "Agricultural productivity and value chain integration." },
];

const Services = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F3F5F2", fontFamily: "sans-serif" }}>
      {/* Nav */}
      <nav style={{ backgroundColor: "#1B4D3E", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ color: "#B8D935", fontWeight: 700, fontSize: "1.5rem", textDecoration: "none", letterSpacing: "0.1em" }}>
          BRIDGE
        </Link>
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "0.9rem" }}>Home</Link>
      </nav>

      {/* Hero */}
      <div style={{ backgroundColor: "#1B4D3E", padding: "4rem 2rem", textAlign: "center" }}>
        <h1 style={{ color: "#B8D935", fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>Our Sectors</h1>
        <p style={{ color: "#fff", fontSize: "1.1rem", opacity: 0.85, maxWidth: 600, margin: "0 auto" }}>
          BRIDGE operates across 12 key sectors driving economic transformation and sustainable development.
        </p>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: "3rem auto", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {sectors.map((sector) => (
            <Link
              key={sector.path}
              to={sector.path}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                backgroundColor: "#fff",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 2px 12px rgba(27,77,62,0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
                height: "100%",
                cursor: "pointer",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(27,77,62,0.15)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(27,77,62,0.08)"; }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{sector.icon}</div>
                <h3 style={{ color: "#1B4D3E", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>{sector.name}</h3>
                <p style={{ color: "#4a5568", fontSize: "0.9rem", lineHeight: 1.6 }}>{sector.desc}</p>
                <div style={{ marginTop: "1rem", color: "#B8D935", fontWeight: 700, fontSize: "0.85rem" }}>Learn more →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer style={{ backgroundColor: "#1B4D3E", color: "#fff", textAlign: "center", padding: "2rem", marginTop: "4rem", fontSize: "0.9rem", opacity: 0.85 }}>
        © {new Date().getFullYear()} BRIDGE. All rights reserved.
      </footer>
    </div>
  );
};

export default Services;
