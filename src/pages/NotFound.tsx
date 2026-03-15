import { useLocation, Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

const NotFound = () => {
  const location = useLocation();
  usePageMeta({ title: "Page Not Found (404)", description: "The page you're looking for doesn't exist. Browse BRIDGE PBC's sectors, resources, and intelligence." });

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F3F5F2", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
        <div style={{ fontSize: "72px", fontWeight: 800, color: "#1B4D3E", lineHeight: 1, marginBottom: 8 }}>404</div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#191919", margin: "0 0 12px" }}>Page not found</h1>
        <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.6, margin: "0 0 28px" }}>
          The page <code style={{ background: "rgba(27,77,62,0.06)", padding: "2px 6px", borderRadius: 4, fontSize: "13px" }}>{location.pathname}</code> doesn't exist. It may have been moved or removed.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 24px", background: "#1B4D3E", color: "#fff", borderRadius: 10, textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
            Go Home
          </Link>
          <Link to="/search" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 24px", border: "1.5px solid #DEDEDE", background: "#fff", color: "#1B4D3E", borderRadius: 10, textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
            Search Site
          </Link>
          <Link to="/sectors" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 24px", border: "1.5px solid #DEDEDE", background: "#fff", color: "#1B4D3E", borderRadius: 10, textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
            Browse Sectors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
