import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeaderMinimal";
import SiteFooter from "@/components/SiteFooter";

const C = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  accentBg: "#EBF5B0",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
  text: "#4A5A52",
  muted: "#7A8C83",
  teal: "#2E5A4D",
};

// ── Data ────────────────────────────────────────────────────────────

const SECTORS = [
  { key: "all", label: "All Sectors" },
  { key: "agriculture", label: "Agriculture" },
  { key: "energy", label: "Energy" },
  { key: "financial", label: "Financial Inclusion" },
  { key: "health", label: "Health Systems" },
  { key: "education", label: "Education" },
  { key: "housing", label: "Housing" },
  { key: "infrastructure", label: "Infrastructure" },
  { key: "technology", label: "Technology" },
  { key: "transport", label: "Transport" },
  { key: "tourism", label: "Tourism" },
  { key: "manufacturing", label: "Manufacturing" },
  { key: "sports", label: "Sports & Creative" },
];

const CATEGORIES = ["All Types", "Regulatory Framework", "Legislation", "Policy Brief", "Stakeholder Position"];

type PolicyBrief = {
  id: number;
  title: string;
  category: string;
  sector: string;
  date: string;
  summary: string;
  status: "enacted" | "pending" | "under-review";
  tags: string[];
};

const BRIEFS: PolicyBrief[] = [
  {
    id: 1,
    title: "Ghana Renewable Energy Act — 2024 Amendment Framework",
    category: "Regulatory Framework",
    sector: "energy",
    date: "Mar 2025",
    summary:
      "Updated feed-in tariff structures and grid connection requirements for solar and wind projects under 5MW. Key provisions affect investment structuring for rural electrification ventures.",
    status: "enacted",
    tags: ["Feed-in Tariffs", "Grid Access", "Solar", "Rural"],
  },
  {
    id: 2,
    title: "Land Title Registration Digitalisation Bill",
    category: "Legislation",
    sector: "housing",
    date: "Feb 2025",
    summary:
      "Proposed legislation to fully digitise land title records across all 16 regions by 2027. Creates significant market opportunity for PropTech and legal services in the formalisation pipeline.",
    status: "pending",
    tags: ["Land Title", "Digitalisation", "PropTech", "Regions"],
  },
  {
    id: 3,
    title: "NHIS Capitation Reform — Primary Healthcare Financing",
    category: "Policy Brief",
    sector: "health",
    date: "Feb 2025",
    summary:
      "Analysis of proposed NHIS capitation rate revisions and their implications for private primary care providers, diagnostic centres, and health-tech ventures integrating with the public insurance system.",
    status: "under-review",
    tags: ["NHIS", "Capitation", "Primary Care", "HealthTech"],
  },
  {
    id: 4,
    title: "Agribusiness Investment Zone Incentive Package — 2026 Budget",
    category: "Regulatory Framework",
    sector: "agriculture",
    date: "Jan 2025",
    summary:
      "New investment incentives for agribusiness zones including 5-year tax holidays, import duty waivers on equipment, and expedited land access for qualifying ventures in Northern Ghana.",
    status: "enacted",
    tags: ["Tax Holiday", "Northern Ghana", "Investment Zones", "Equipment"],
  },
  {
    id: 5,
    title: "Digital Financial Services Interoperability Directive",
    category: "Regulatory Framework",
    sector: "financial",
    date: "Jan 2025",
    summary:
      "Bank of Ghana directive mandating interoperability between mobile money platforms and commercial banks by Q3 2025. Creates infrastructure for fintech products targeting unbanked populations.",
    status: "enacted",
    tags: ["Mobile Money", "Interoperability", "Bank of Ghana", "Fintech"],
  },
  {
    id: 6,
    title: "Technical & Vocational Education Reform — Skills Levy Framework",
    category: "Policy Brief",
    sector: "education",
    date: "Dec 2024",
    summary:
      "Analysis of the proposed National Skills Levy on payroll and implications for TVET providers, corporate training ventures, and workforce development platforms targeting youth employment.",
    status: "under-review",
    tags: ["TVET", "Skills Levy", "Youth Employment", "Payroll"],
  },
  {
    id: 7,
    title: "Ghana Tourism Authority — Year of Return Legacy Policy",
    category: "Stakeholder Position",
    sector: "tourism",
    date: "Dec 2024",
    summary:
      "GTA's long-term diaspora tourism strategy and heritage corridor investment programme. Outlines government co-investment commitments for heritage site development and hospitality infrastructure.",
    status: "enacted",
    tags: ["Diaspora", "Heritage", "Co-Investment", "GTA"],
  },
  {
    id: 8,
    title: "National Road Transport Sector Policy — Formalisation Roadmap",
    category: "Policy Brief",
    sector: "transport",
    date: "Nov 2024",
    summary:
      "Government roadmap for formalising Ghana's 80%+ unregistered fleet operators through a phased licensing and telematics mandate. Key policy driver for fleet management technology ventures.",
    status: "pending",
    tags: ["Fleet", "Licensing", "Telematics", "Formalisation"],
  },
  {
    id: 9,
    title: "Affordable Housing Development Fund — PPP Guidelines",
    category: "Regulatory Framework",
    sector: "housing",
    date: "Nov 2024",
    summary:
      "Updated PPP guidelines for the $200M Affordable Housing Development Fund. Clarifies private sector eligibility, capital requirements, and profit repatriation conditions for international developers.",
    status: "enacted",
    tags: ["PPP", "Affordable Housing", "Fund", "Developers"],
  },
  {
    id: 10,
    title: "Ghana Startup Act — Implementation Regulations",
    category: "Regulatory Framework",
    sector: "technology",
    date: "Oct 2024",
    summary:
      "Implementation regulations for the Ghana Startup Act covering approved startup designation, tax incentives, regulatory sandboxes, and access to government procurement pipelines.",
    status: "enacted",
    tags: ["Startup Act", "Tax Incentives", "Sandbox", "Procurement"],
  },
  {
    id: 11,
    title: "Industrial Transformation Agenda — Manufacturing Incentives",
    category: "Policy Brief",
    sector: "manufacturing",
    date: "Oct 2024",
    summary:
      "Comprehensive analysis of the 2025-2030 Industrial Transformation Agenda incentives including export subsidies, industrial zone allocation, and local content requirements for key manufacturing sub-sectors.",
    status: "under-review",
    tags: ["Industrial Zones", "Export", "Local Content", "Sub-sectors"],
  },
  {
    id: 12,
    title: "Sports Industry Development Policy — Creative Economy Framework",
    category: "Stakeholder Position",
    sector: "sports",
    date: "Sep 2024",
    summary:
      "Ministry of Youth and Sports position on private investment in sporting infrastructure, athlete development pipelines, and the intersection with Ghana's creative economy and entertainment export ambitions.",
    status: "pending",
    tags: ["Sports Infrastructure", "Creative Economy", "Athletes", "Ministry"],
  },
];

const STATUS_CONFIG = {
  enacted: { label: "Enacted", color: "#16A34A", bg: "#DCFCE7" },
  pending: { label: "Pending", color: "#D97706", bg: "#FEF3C7" },
  "under-review": { label: "Under Review", color: "#2563EB", bg: "#DBEAFE" },
};

// ── Components ───────────────────────────────────────────────────────

function Pill({ label }: { label: string }) {
  return (
    <span
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
        textTransform: "uppercase" as const,
      }}
    >
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: "enacted" | "pending" | "under-review" }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      style={{
        fontSize: "11px",
        fontWeight: "600",
        padding: "3px 10px",
        borderRadius: "20px",
        color: cfg.color,
        backgroundColor: cfg.bg,
        letterSpacing: "0.3px",
        flexShrink: 0,
      }}
    >
      {cfg.label}
    </span>
  );
}

function BriefCard({ brief }: { brief: PolicyBrief }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      style={{
        backgroundColor: C.white,
        borderRadius: "14px",
        border: `1px solid ${C.line}`,
        padding: "24px",
        transition: "box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "12px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" as const }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: C.muted,
                textTransform: "uppercase" as const,
                letterSpacing: "1px",
              }}
            >
              {brief.category}
            </span>
            <span style={{ color: C.line }}>·</span>
            <span style={{ fontSize: "11px", color: C.muted }}>{brief.date}</span>
          </div>
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: C.primary,
              margin: 0,
              lineHeight: "1.45",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {brief.title}
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: "8px", flexShrink: 0 }}>
          <StatusBadge status={brief.status} />
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.muted}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontSize: "14px", color: C.text, lineHeight: "1.7", margin: "0 0 14px" }}>
            {brief.summary}
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" as const }}>
            {brief.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  background: C.background,
                  border: `1px solid ${C.line}`,
                  color: C.text,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────

export default function PolicyPage() {
  const navigate = useNavigate();
  const [activeSector, setActiveSector] = useState("all");
  const [activeCategory, setActiveCategory] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = BRIEFS.filter((b) => {
    const matchSector = activeSector === "all" || b.sector === activeSector;
    const matchCat = activeCategory === "All Types" || b.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSector && matchCat && matchSearch;
  });

  const stats = {
    enacted: BRIEFS.filter((b) => b.status === "enacted").length,
    pending: BRIEFS.filter((b) => b.status === "pending").length,
    underReview: BRIEFS.filter((b) => b.status === "under-review").length,
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: C.white, minHeight: "100vh" }}>
      <SiteHeader />

      {/* Hero */}
      <section style={{ backgroundColor: C.primary, padding: "80px 48px 72px", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <Pill label="Policy & Governance" />
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
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: "1.65", margin: "0 0 48px" }}>
            Tracking regulatory developments, legislative changes, and policy shifts that shape investment and
            development across Ghana's 12 key sectors.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            {[
              { val: stats.enacted, label: "Enacted", color: "#16A34A" },
              { val: stats.pending, label: "Pending", color: "#D97706" },
              { val: stats.underReview, label: "Under Review", color: "#60A5FA" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "20px 16px",
                }}
              >
                <div style={{ fontSize: "28px", fontWeight: "700", color: C.white, marginBottom: "4px" }}>{s.val}</div>
                <div style={{ fontSize: "11px", fontWeight: "600", color: s.color, textTransform: "uppercase" as const, letterSpacing: "1px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ backgroundColor: C.background, padding: "40px 48px 0", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Search */}
          <div style={{ position: "relative" as const, marginBottom: "24px", maxWidth: "440px" }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={C.muted}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: "absolute" as const, left: "14px", top: "50%", transform: "translateY(-50%)" }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search policy briefs, tags, topics…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 16px 11px 40px",
                borderRadius: "50px",
                border: `1px solid ${C.line}`,
                backgroundColor: C.white,
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: C.dark,
                outline: "none",
                boxSizing: "border-box" as const,
              }}
            />
          </div>

          {/* Category filters */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const, marginBottom: "20px" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "50px",
                  border: `1px solid ${activeCategory === cat ? C.primary : C.line}`,
                  backgroundColor: activeCategory === cat ? C.primary : C.white,
                  color: activeCategory === cat ? C.white : C.text,
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  transition: "all 0.15s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sector scroll tabs */}
          <div
            style={{
              display: "flex",
              gap: "0",
              overflowX: "auto" as const,
              msOverflowStyle: "none" as const,
              scrollbarWidth: "none" as const,
              borderBottom: `1px solid ${C.line}`,
            }}
          >
            {SECTORS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSector(s.key)}
                style={{
                  padding: "12px 18px",
                  border: "none",
                  borderBottom: `2px solid ${activeSector === s.key ? C.primary : "transparent"}`,
                  backgroundColor: "transparent",
                  color: activeSector === s.key ? C.primary : C.muted,
                  fontSize: "13px",
                  fontWeight: activeSector === s.key ? "700" : "500",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  whiteSpace: "nowrap" as const,
                  transition: "all 0.15s ease",
                  flexShrink: 0,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Briefs list */}
      <section style={{ backgroundColor: C.background, padding: "40px 48px 80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Result count */}
          <div
            style={{
              fontSize: "13px",
              color: C.muted,
              marginBottom: "20px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Showing <strong style={{ color: C.primary }}>{filtered.length}</strong> of {BRIEFS.length} policy briefs
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 24px",
                backgroundColor: C.white,
                borderRadius: "16px",
                border: `1px solid ${C.line}`,
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>📋</div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: C.primary, margin: "0 0 8px" }}>
                No briefs match your filters
              </h3>
              <p style={{ fontSize: "14px", color: C.muted, margin: 0 }}>
                Try adjusting your sector filter or search query.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px" }}>
              {filtered.map((brief) => (
                <BriefCard key={brief.id} brief={brief} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories preview */}
      <section style={{ backgroundColor: C.white, padding: "80px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                border: `1px solid ${C.line}`,
                borderRadius: "50px",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "1.5px",
                color: C.primary,
                marginBottom: "20px",
                textTransform: "uppercase" as const,
              }}
            >
              Intelligence Categories
            </div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "300",
                color: C.primary,
                margin: "0 0 12px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Four pillars of <strong style={{ fontWeight: "700" }}>policy intelligence</strong>
            </h2>
            <p style={{ fontSize: "15px", color: C.text, lineHeight: "1.6", maxWidth: "520px", margin: "0 auto" }}>
              Our policy intelligence hub tracks developments across regulatory, legislative, analytical, and stakeholder dimensions.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                label: "Regulatory Frameworks",
                desc: "National and sector-level regulatory landscape — licensing, compliance, and operating environment analysis.",
                count: BRIEFS.filter((b) => b.category === "Regulatory Framework").length,
              },
              {
                label: "Legislative Tracker",
                desc: "Pending and enacted legislation affecting the investment climate across Ghana's 12 BRIDGE sectors.",
                count: BRIEFS.filter((b) => b.category === "Legislation").length,
              },
              {
                label: "Policy Briefs",
                desc: "Concise analyses of policy shifts and their economic implications for entrepreneurs, investors, and institutions.",
                count: BRIEFS.filter((b) => b.category === "Policy Brief").length,
              },
              {
                label: "Stakeholder Positions",
                desc: "Government ministries, private sector bodies, and civil society perspectives on key policy developments.",
                count: BRIEFS.filter((b) => b.category === "Stakeholder Position").length,
              },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  backgroundColor: C.background,
                  borderRadius: "14px",
                  padding: "28px",
                  border: `1px solid ${C.line}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: C.accent,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: C.primary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {card.count}
                  </span>
                </div>
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

      {/* Newsletter signup */}
      <section style={{ backgroundColor: C.primary, padding: "80px 48px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: "20px" }}>
            <Pill label="Stay Informed" />
          </div>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: "300",
              color: C.white,
              margin: "0 0 16px",
              lineHeight: "1.2",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Get policy updates{" "}
            <span style={{ fontWeight: "700", color: C.accent }}>delivered to you</span>
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: "1.65",
              margin: "0 0 36px",
            }}
          >
            Receive concise briefings whenever a significant regulatory change, new legislation, or policy shift
            affects Ghana's 12 BRIDGE sectors. No noise — only what matters to your work.
          </p>

          {subscribed ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "rgba(184,217,53,0.15)",
                border: "1px solid rgba(184,217,53,0.35)",
                borderRadius: "50px",
                padding: "16px 32px",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: "15px", fontWeight: "600", color: C.accent }}>
                You're subscribed — we'll be in touch.
              </span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "12px",
                maxWidth: "480px",
                margin: "0 auto",
                flexWrap: "wrap" as const,
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: "1 1 240px",
                  padding: "14px 20px",
                  borderRadius: "50px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: C.white,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <button
                onClick={() => { if (email.includes("@")) setSubscribed(true); }}
                style={{
                  padding: "14px 28px",
                  borderRadius: "50px",
                  border: "none",
                  backgroundColor: C.accent,
                  color: C.primary,
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "opacity 0.2s",
                }}
              >
                Subscribe
              </button>
            </div>
          )}

          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "16px" }}>
            No spam. Unsubscribe at any time. Policy alerts only.
          </p>
        </div>
      </section>

      {/* Explore sectors CTA */}
      <section style={{ backgroundColor: C.background, padding: "64px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "600", color: C.primary, margin: "0 0 12px", fontFamily: "Inter, sans-serif" }}>
            Explore the full sector landscape
          </h3>
          <p style={{ fontSize: "15px", color: C.text, lineHeight: "1.6", margin: "0 0 28px" }}>
            Policy shapes investment. Understand the full picture across all 12 sectors.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <button
              onClick={() => navigate("/sectors")}
              style={{
                padding: "14px 32px",
                borderRadius: "50px",
                border: "none",
                backgroundColor: C.primary,
                color: C.white,
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              View All 12 Sectors →
            </button>
            <button
              onClick={() => navigate("/resources")}
              style={{
                padding: "14px 32px",
                borderRadius: "50px",
                border: `1px solid ${C.line}`,
                backgroundColor: C.white,
                color: C.primary,
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Annual Review & Reports
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
