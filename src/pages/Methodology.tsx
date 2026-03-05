import { Link } from "react-router-dom";

const Methodology = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F3F5F2", fontFamily: "sans-serif" }}>
      <nav style={{ backgroundColor: "#1B4D3E", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ color: "#B8D935", fontWeight: 700, fontSize: "1.5rem", textDecoration: "none", letterSpacing: "0.1em" }}>
          BRIDGE
        </Link>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "0.9rem" }}>Home</Link>
        </div>
      </nav>

      <div style={{ backgroundColor: "#1B4D3E", padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔬</div>
        <h1 style={{ color: "#B8D935", fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>Methodology</h1>
        <p style={{ color: "#fff", fontSize: "1.15rem", opacity: 0.85, maxWidth: 600, margin: "0 auto" }}>
          Our framework for evaluating, structuring, and de-risking African investments.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: "3rem auto", padding: "0 2rem" }}>
        <div style={{ backgroundColor: "#fff", borderRadius: "1rem", padding: "2.5rem", boxShadow: "0 2px 16px rgba(27,77,62,0.08)", textAlign: "center" }}>
          <div style={{ display: "inline-block", backgroundColor: "#B8D935", color: "#1B4D3E", fontWeight: 700, borderRadius: "2rem", padding: "0.35rem 1.25rem", fontSize: "0.85rem", marginBottom: "1.5rem", letterSpacing: "0.08em" }}>
            COMING SOON
          </div>
          <h2 style={{ color: "#1B4D3E", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Methodology Page In Progress</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.75, marginBottom: "2rem" }}>
            This section will detail BRIDGE's proprietary approach to investment research, due diligence, and sector analysis.
          </p>
          <Link to="/" style={{ backgroundColor: "#1B4D3E", color: "#fff", padding: "0.75rem 2rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: 600 }}>
            Back to Home
          </Link>
        </div>
      </div>

      <footer style={{ backgroundColor: "#1B4D3E", color: "#fff", textAlign: "center", padding: "2rem", marginTop: "4rem", fontSize: "0.9rem", opacity: 0.85 }}>
        © {new Date().getFullYear()} BRIDGE. All rights reserved.
      </footer>
    </div>
  );
};

export default Methodology;
