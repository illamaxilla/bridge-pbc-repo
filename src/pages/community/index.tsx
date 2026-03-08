// ============================================================
// BRIDGE COMMUNITY — PASTE YOUR JSX FLOW HERE
// ============================================================
// Replace the entire contents of this file with your .jsx file.
// The component must be the default export.
// Sub-routes (e.g. /community/login, /community/feed) can be
// added as child routes in src/App.tsx under /community/*.
// ============================================================

export default function CommunityHome() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "DM Sans, sans-serif",
        background: "#1B4D3E",
        color: "#fff",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            color: "#B8D935",
            letterSpacing: "0.15em",
            fontSize: "13px",
            marginBottom: "16px",
            textTransform: "uppercase",
          }}
        >
          Coming Soon
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: "300",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          BRIDGE Community
        </h1>
        <p
          style={{
            marginTop: "12px",
            opacity: 0.45,
            fontSize: "14px",
            fontFamily: "monospace",
          }}
        >
          → src/pages/community/index.tsx
        </p>
      </div>
    </div>
  );
}
