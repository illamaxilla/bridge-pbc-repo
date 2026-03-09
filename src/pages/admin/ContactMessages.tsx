import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import SiteHeader from "@/components/SiteHeaderMinimal";
import SiteFooter from "@/components/SiteFooter";

interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  message: string;
}

const colors = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
};

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError("Unable to load messages. Make sure you are logged in with admin access.");
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.organization || "").toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", minHeight: "100vh", backgroundColor: colors.background }}>
      <SiteHeader />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 18px", border: `1px solid ${colors.line}`, borderRadius: "50px", fontSize: "11px", fontWeight: "600", letterSpacing: "1.5px", color: colors.primary, textTransform: "uppercase", marginBottom: "16px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: colors.accent, display: "inline-block" }} />
            Admin
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h1 style={{ fontSize: "36px", fontWeight: "300", color: colors.primary, margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>
                <strong>Contact</strong> Messages
              </h1>
              <p style={{ fontSize: "15px", color: "#666", margin: 0 }}>
                {loading ? "Loading…" : `${messages.length} submission${messages.length !== 1 ? "s" : ""} total`}
              </p>
            </div>
            <button
              onClick={fetchMessages}
              style={{ backgroundColor: colors.primary, color: colors.white, border: "none", padding: "12px 24px", borderRadius: "50px", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, organization, or message…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "14px 16px 14px 44px", borderRadius: "12px", border: `1px solid ${colors.line}`, backgroundColor: colors.white, fontSize: "15px", fontFamily: "Inter, sans-serif", color: colors.dark, outline: "none", boxSizing: "border-box" }}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FECACA", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px", color: "#B91C1C", fontSize: "14px" }}>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px", color: "#999" }}>
            <div style={{ fontSize: "14px" }}>Loading messages…</div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 40px", backgroundColor: colors.white, borderRadius: "20px", color: "#999" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>📭</div>
            <div style={{ fontSize: "16px", fontWeight: "600", color: colors.primary, marginBottom: "8px" }}>
              {search ? "No messages match your search" : "No messages yet"}
            </div>
            <div style={{ fontSize: "14px" }}>
              {search ? "Try a different keyword" : "Contact form submissions will appear here"}
            </div>
          </div>
        )}

        {/* Two-panel layout when message selected */}
        {!loading && filtered.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 420px" : "1fr", gap: "20px", alignItems: "start" }}>
            {/* List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filtered.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelected(selected?.id === msg.id ? null : msg)}
                  style={{
                    backgroundColor: selected?.id === msg.id ? colors.primary : colors.white,
                    borderRadius: "16px",
                    padding: "20px 24px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: `2px solid ${selected?.id === msg.id ? colors.primary : "transparent"}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "600", color: selected?.id === msg.id ? colors.white : colors.dark, marginBottom: "2px" }}>
                        {msg.name}
                      </div>
                      <div style={{ fontSize: "13px", color: selected?.id === msg.id ? "rgba(255,255,255,0.7)" : "#666" }}>
                        {msg.email}
                        {msg.organization && <span style={{ marginLeft: "8px", color: selected?.id === msg.id ? colors.accent : colors.primary, fontWeight: "500" }}>· {msg.organization}</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: "12px", color: selected?.id === msg.id ? "rgba(255,255,255,0.5)" : "#999", whiteSpace: "nowrap", marginLeft: "16px" }}>
                      {formatDate(msg.created_at)}
                    </div>
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: "1.5", color: selected?.id === msg.id ? "rgba(255,255,255,0.8)" : "#555", margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as React.CSSProperties["WebkitBoxOrient"] }}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>

            {/* Detail panel */}
            {selected && (
              <div style={{ backgroundColor: colors.white, borderRadius: "20px", padding: "28px", position: "sticky", top: "100px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", color: colors.primary, margin: 0 }}>Message Detail</h3>
                  <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "#999" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { label: "Name", value: selected.name },
                    { label: "Email", value: selected.email, href: `mailto:${selected.email}` },
                    ...(selected.phone ? [{ label: "Phone", value: selected.phone, href: `tel:${selected.phone}` }] : []),
                    ...(selected.organization ? [{ label: "Organization", value: selected.organization }] : []),
                    { label: "Submitted", value: formatDate(selected.created_at) },
                  ].map(({ label, value, href }) => (
                    <div key={label} style={{ paddingBottom: "16px", borderBottom: `1px solid ${colors.line}` }}>
                      <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1.2px", textTransform: "uppercase", color: "#999", marginBottom: "4px" }}>{label}</div>
                      {href ? (
                        <a href={href} style={{ fontSize: "15px", color: colors.primary, fontWeight: "500", textDecoration: "none" }}>{value}</a>
                      ) : (
                        <div style={{ fontSize: "15px", color: colors.dark }}>{value}</div>
                      )}
                    </div>
                  ))}
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1.2px", textTransform: "uppercase", color: "#999", marginBottom: "12px" }}>Message</div>
                    <div style={{ fontSize: "15px", lineHeight: "1.7", color: colors.dark, whiteSpace: "pre-wrap" }}>{selected.message}</div>
                  </div>
                </div>

                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: `1px solid ${colors.line}` }}>
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your message to BRIDGE&body=Dear ${selected.name},%0D%0A%0D%0A`}
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: colors.accent, color: colors.primary, textDecoration: "none", padding: "12px 24px", borderRadius: "50px", fontSize: "14px", fontWeight: "600" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Reply via Email
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
