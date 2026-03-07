const Dashboard = () => (
  <div style={{ padding: "2.5rem 2rem", maxWidth: 860, margin: "0 auto" }}>
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "inline-block", backgroundColor: "#B8D935", color: "#1B4D3E", fontWeight: 700, borderRadius: "2rem", padding: "0.3rem 1rem", fontSize: "0.78rem", marginBottom: "1rem", letterSpacing: "0.08em" }}>
        COMING SOON
      </div>
      <h1 style={{ color: "#1B4D3E", fontSize: "2rem", fontWeight: 800, margin: "0 0 0.5rem" }}>Dashboard</h1>
      <p style={{ color: "#4a5568", fontSize: "1rem", lineHeight: 1.7 }}>
        Your personalised investment tracking and portfolio overview — live view of investment activity, sector performance, and portfolio metrics.
      </p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
      {[
        { label: "Portfolio Value", value: "—", note: "Updated in real-time" },
        { label: "Active Sectors", value: "—", note: "Across 12 sectors" },
        { label: "Pending Reports", value: "—", note: "Awaiting review" },
        { label: "Watchlist Items", value: "—", note: "Tracked opportunities" },
      ].map(card => (
        <div key={card.label} style={{ backgroundColor: "#fff", borderRadius: "1rem", padding: "1.5rem", boxShadow: "0 2px 12px rgba(27,77,62,0.07)" }}>
          <p style={{ color: "#9aab9a", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{card.label}</p>
          <p style={{ color: "#1B4D3E", fontSize: "2rem", fontWeight: 800, margin: "0 0 0.25rem" }}>{card.value}</p>
          <p style={{ color: "#9aab9a", fontSize: "0.8rem" }}>{card.note}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Dashboard;
