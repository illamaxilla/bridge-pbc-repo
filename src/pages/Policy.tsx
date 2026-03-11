import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { colors } from "@/lib/theme";
import { useIsMobile } from "@/hooks/use-mobile";
const C = {
  ...colors,
  accentBg: "#EBF5B0",
  bg: colors.background,
  text: "#4A5A52",
  muted: "#7A8C83",
  teal: colors.ctaGreen,
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
    summary: "Updated feed-in tariff structures and grid connection requirements for solar and wind projects under 5MW. Key provisions affect investment structuring for rural electrification ventures.",
    status: "enacted",
    tags: ["Feed-in Tariffs", "Grid Access", "Solar", "Rural"],
  },
  {
    id: 2,
    title: "Land Title Registration Digitalisation Bill",
    category: "Legislation",
    sector: "housing",
    date: "Feb 2025",
    summary: "Proposed legislation to fully digitise land title records across all 16 regions by 2027. Creates significant market opportunity for PropTech and legal services in the formalisation pipeline.",
    status: "pending",
    tags: ["Land Title", "Digitalisation", "PropTech", "Regions"],
  },
  {
    id: 3,
    title: "NHIS Capitation Reform — Primary Healthcare Financing",
    category: "Policy Brief",
    sector: "health",
    date: "Feb 2025",
    summary: "Analysis of proposed NHIS capitation rate revisions and their implications for private primary care providers, diagnostic centres, and health-tech ventures integrating with the public insurance system.",
    status: "under-review",
    tags: ["NHIS", "Capitation", "Primary Care", "HealthTech"],
  },
  {
    id: 4,
    title: "Agribusiness Investment Zone Incentive Package — 2026 Budget",
    category: "Regulatory Framework",
    sector: "agriculture",
    date: "Jan 2025",
    summary: "New investment incentives for agribusiness zones including 5-year tax holidays, import duty waivers on equipment, and expedited land access for qualifying ventures in Northern Ghana.",
    status: "enacted",
    tags: ["Tax Holiday", "Northern Ghana", "Investment Zones", "Equipment"],
  },
  {
    id: 5,
    title: "Digital Financial Services Interoperability Directive",
    category: "Regulatory Framework",
    sector: "financial",
    date: "Jan 2025",
    summary: "Bank of Ghana directive mandating interoperability between mobile money platforms and commercial banks by Q3 2025. Creates infrastructure for fintech products targeting unbanked populations.",
    status: "enacted",
    tags: ["Mobile Money", "Interoperability", "Bank of Ghana", "Fintech"],
  },
  {
    id: 6,
    title: "Technical & Vocational Education Reform — Skills Levy Framework",
    category: "Policy Brief",
    sector: "education",
    date: "Dec 2024",
    summary: "Analysis of the proposed National Skills Levy on payroll and implications for TVET providers, corporate training ventures, and workforce development platforms targeting youth employment.",
    status: "under-review",
    tags: ["TVET", "Skills Levy", "Youth Employment", "Payroll"],
  },
  {
    id: 7,
    title: "Ghana Tourism Authority — Year of Return Legacy Policy",
    category: "Stakeholder Position",
    sector: "tourism",
    date: "Dec 2024",
    summary: "GTA's long-term diaspora tourism strategy and heritage corridor investment programme. Outlines government co-investment commitments for heritage site development and hospitality infrastructure.",
    status: "enacted",
    tags: ["Diaspora", "Heritage", "Co-Investment", "GTA"],
  },
  {
    id: 8,
    title: "National Road Transport Sector Policy — Formalisation Roadmap",
    category: "Policy Brief",
    sector: "transport",
    date: "Nov 2024",
    summary: "Government roadmap for formalising Ghana's 80%+ unregistered fleet operators through a phased licensing and telematics mandate. Key policy driver for fleet management technology ventures.",
    status: "pending",
    tags: ["Fleet", "Licensing", "Telematics", "Formalisation"],
  },
  {
    id: 9,
    title: "Affordable Housing Development Fund — PPP Guidelines",
    category: "Regulatory Framework",
    sector: "housing",
    date: "Nov 2024",
    summary: "Updated PPP guidelines for the $200M Affordable Housing Development Fund. Clarifies private sector eligibility, capital requirements, and profit repatriation conditions for international developers.",
    status: "enacted",
    tags: ["PPP", "Affordable Housing", "Fund", "Developers"],
  },
  {
    id: 10,
    title: "Ghana Startup Act — Implementation Regulations",
    category: "Regulatory Framework",
    sector: "technology",
    date: "Oct 2024",
    summary: "Implementation regulations for the Ghana Startup Act covering approved startup designation, tax incentives, regulatory sandboxes, and access to government procurement pipelines.",
    status: "enacted",
    tags: ["Startup Act", "Tax Incentives", "Sandbox", "Procurement"],
  },
  {
    id: 11,
    title: "Industrial Transformation Agenda — Manufacturing Incentives",
    category: "Policy Brief",
    sector: "manufacturing",
    date: "Oct 2024",
    summary: "Comprehensive analysis of the 2025-2030 Industrial Transformation Agenda incentives including export subsidies, industrial zone allocation, and local content requirements for key manufacturing sub-sectors.",
    status: "under-review",
    tags: ["Industrial Zones", "Export", "Local Content", "Sub-sectors"],
  },
  {
    id: 12,
    title: "Sports Industry Development Policy — Creative Economy Framework",
    category: "Stakeholder Position",
    sector: "sports",
    date: "Sep 2024",
    summary: "Ministry of Youth and Sports position on private investment in sporting infrastructure, athlete development pipelines, and the intersection with Ghana's creative economy and entertainment export ambitions.",
    status: "pending",
    tags: ["Sports Infrastructure", "Creative Economy", "Athletes", "Ministry"],
  },
];

// ── Legislative Calendar Data ────────────────────────────────────────

type CalendarEvent = {
  id: number;
  date: string;
  month: string;
  fullMonth: string;
  day: string;
  title: string;
  type: "reading" | "consultation" | "deadline" | "review" | "implementation";
  sector: string;
  description: string;
  urgency: "high" | "medium" | "low";
  startTime?: string;
  location?: string;
};

const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 1, date: "2025-04-15", month: "APR", fullMonth: "April 2025", day: "15",
    title: "Land Title Digitalisation Bill — Second Reading",
    type: "reading", sector: "Housing", description: "Parliamentary second reading. Public submissions close 10 days prior.",
    urgency: "high", location: "Parliament House, Accra",
  },
  {
    id: 2, date: "2025-04-22", month: "APR", fullMonth: "April 2025", day: "22",
    title: "Digital Financial Services Interoperability — Implementation Deadline",
    type: "implementation", sector: "Financial", description: "Bank of Ghana mandated compliance date for all licensed mobile money operators.",
    urgency: "high", location: "Ghana",
  },
  {
    id: 3, date: "2025-05-08", month: "MAY", fullMonth: "May 2025", day: "08",
    title: "NHIS Capitation Reform — Stakeholder Consultation",
    type: "consultation", sector: "Health", description: "Ministry of Health open forum for private healthcare providers and HealthTech companies.",
    urgency: "medium", startTime: "09:00 GMT", location: "Accra International Conference Centre",
  },
  {
    id: 4, date: "2025-05-20", month: "MAY", fullMonth: "May 2025", day: "20",
    title: "Agribusiness Investment Zone Applications — Deadline",
    type: "deadline", sector: "Agriculture", description: "Final date for Q3 2025 cohort applications under the new incentive package framework.",
    urgency: "high", location: "Ministry of Food & Agriculture",
  },
  {
    id: 5, date: "2025-06-01", month: "JUN", fullMonth: "June 2025", day: "01",
    title: "Ghana Startup Act — Sandbox Cohort 2 Opens",
    type: "implementation", sector: "Technology", description: "Second regulatory sandbox cohort opens under Ghana Startup Act implementation regulations.",
    urgency: "medium", location: "Ghana Innovation Hub, Accra",
  },
  {
    id: 6, date: "2025-06-15", month: "JUN", fullMonth: "June 2025", day: "15",
    title: "Road Transport Formalisation Policy — Phase 1 Review",
    type: "review", sector: "Transport", description: "Six-month review milestone for the fleet operator licensing pilot in Greater Accra Region.",
    urgency: "medium", location: "Ministry of Roads & Highways",
  },
  {
    id: 7, date: "2025-07-01", month: "JUL", fullMonth: "July 2025", day: "01",
    title: "Skills Levy Framework — Parliamentary Debate",
    type: "reading", sector: "Education", description: "National Assembly debate on the Technical and Vocational Skills Levy Bill.",
    urgency: "medium", location: "Parliament House, Accra",
  },
  {
    id: 8, date: "2025-07-30", month: "JUL", fullMonth: "July 2025", day: "30",
    title: "Renewable Energy Feed-in Tariff Rate Review",
    type: "review", sector: "Energy", description: "Annual PURC review of feed-in tariff rates under the 2024 Amendment Framework.",
    urgency: "low", location: "PURC Offices, Accra",
  },
];

// ── .ics generator ───────────────────────────────────────────────────────────
function generateICS(ev: CalendarEvent): string {
  const dateStr = ev.date.replace(/-/g, "");
  const uid = `bridge-policy-${ev.id}@bridgepbc.com`;
  const summary = ev.title.replace(/,/g, "\\,").replace(/;/g, "\\;");
  const description = ev.description.replace(/,/g, "\\,").replace(/;/g, "\\;");
  const location = (ev.location || "Ghana").replace(/,/g, "\\,");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BRIDGE PBC//Policy Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTART;VALUE=DATE:${dateStr}`,
    `DTEND;VALUE=DATE:${dateStr}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description} — Sector: ${ev.sector} | Type: ${EVENT_TYPE_CONFIG[ev.type].label}`,
    `LOCATION:${location}`,
    `STATUS:CONFIRMED`,
    `CATEGORIES:BRIDGE Policy,${ev.sector}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICS(ev: CalendarEvent) {
  const ics = generateICS(ev);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bridge-policy-${ev.id}-${ev.date}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const STATUS_CONFIG = {
  enacted: { label: "Enacted", dot: "filled" },
  pending: { label: "Pending", dot: "empty" },
  "under-review": { label: "Under Review", dot: "dash" },
};

const EVENT_TYPE_CONFIG = {
  reading: { label: "Reading" },
  consultation: { label: "Consultation" },
  deadline: { label: "Deadline" },
  review: { label: "Review" },
  implementation: { label: "Implementation" },
};

const BRIEFS_PER_PAGE = 6;

// ── Components ───────────────────────────────────────────────────────

function Pill({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "8px",
      padding: "8px 18px", border: "1px solid rgba(184,217,53,0.35)",
      borderRadius: "50px", fontSize: "11px", fontWeight: "600",
      letterSpacing: "1.5px", color: C.accent, textTransform: "uppercase" as const,
    }}>
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: "enacted" | "pending" | "under-review" }) {
  const cfg = STATUS_CONFIG[status];
  const dotEl = cfg.dot === "filled"
    ? <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.accent, display: "inline-block", flexShrink: 0 }} />
    : cfg.dot === "empty"
    ? <span style={{ width: "6px", height: "6px", borderRadius: "50%", border: `1.5px solid ${C.muted}`, display: "inline-block", flexShrink: 0 }} />
    : <span style={{ width: "8px", height: "1.5px", backgroundColor: C.muted, display: "inline-block", flexShrink: 0 }} />;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      fontSize: "11px", fontWeight: "600", padding: "3px 10px",
      borderRadius: "20px", color: C.primary, backgroundColor: C.white,
      border: `1px solid ${C.line}`, letterSpacing: "0.3px", flexShrink: 0,
    }}>
      {dotEl}{cfg.label}
    </span>
  );
}

function BriefCard({ brief }: { brief: PolicyBrief }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      style={{
        backgroundColor: C.white, borderRadius: "10px",
        border: `1px solid ${C.line}`, padding: "20px 24px",
        transition: "box-shadow 0.2s ease", cursor: "pointer",
      }}
      onClick={() => setExpanded(v => !v)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" as const }}>
            <span style={{ fontSize: "10px", fontWeight: "700", color: C.muted, textTransform: "uppercase" as const, letterSpacing: "1.2px" }}>{brief.category}</span>
            <span style={{ color: C.line, fontSize: "10px" }}>·</span>
            <span style={{ fontSize: "11px", color: C.muted }}>{brief.date}</span>
          </div>
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: C.primary, margin: 0, lineHeight: "1.45", fontFamily: "Inter, sans-serif" }}>
            {brief.title}
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: "10px", flexShrink: 0 }}>
          <StatusBadge status={brief.status} />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", marginRight: "2px" }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      {expanded && (
        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${C.line}` }}>
          <p style={{ fontSize: "14px", color: C.text, lineHeight: "1.7", margin: "0 0 14px" }}>{brief.summary}</p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" as const }}>
            {brief.tags.map(tag => (
              <span key={tag} style={{ fontSize: "11px", fontWeight: "500", padding: "3px 10px", borderRadius: "4px", background: C.background, border: `1px solid ${C.line}`, color: C.text }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BriefTableRow({ brief }: { brief: PolicyBrief }) {
  return (
    <tr style={{ borderBottom: `1px solid ${C.line}`, transition: "background 0.15s" }}
      onMouseEnter={e => (e.currentTarget.style.background = C.background)}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      <td style={{ padding: "14px 16px", verticalAlign: "top" }}>
        <div style={{ fontSize: "13px", fontWeight: "600", color: C.primary, lineHeight: "1.4", marginBottom: "4px" }}>{brief.title}</div>
        <div style={{ fontSize: "11px", color: C.muted }}>{brief.category}</div>
      </td>
      <td style={{ padding: "14px 16px", verticalAlign: "middle", whiteSpace: "nowrap" as const }}>
        <span style={{ fontSize: "11px", fontWeight: "500", color: C.text, background: C.background, padding: "3px 9px", borderRadius: "4px", border: `1px solid ${C.line}`, textTransform: "capitalize" as const }}>
          {brief.sector.replace("-", " ")}
        </span>
      </td>
      <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
        <StatusBadge status={brief.status} />
      </td>
      <td style={{ padding: "14px 16px", verticalAlign: "middle", fontSize: "12px", color: C.muted, whiteSpace: "nowrap" as const }}>{brief.date}</td>
    </tr>
  );
}

// ── Calendar Event Card ──────────────────────────────────────────────────────
function CalendarEventCard({ ev, isMobile }: { ev: CalendarEvent; isMobile: boolean }) {
  const typeCfg = EVENT_TYPE_CONFIG[ev.type];
  return (
    <div style={{
      backgroundColor: C.white, borderRadius: "10px",
      border: `1px solid ${C.line}`,
      padding: isMobile ? "16px" : "20px 24px", display: "flex", gap: "16px",
    }}>
      {/* Date badge */}
      <div style={{
        textAlign: "center", flexShrink: 0, width: "48px",
        paddingRight: "16px", borderRight: `1px solid ${C.line}`,
      }}>
        <div style={{ fontSize: "9px", fontWeight: "700", color: C.muted, letterSpacing: "1px", textTransform: "uppercase" as const, marginBottom: "2px" }}>{ev.month}</div>
        <div style={{ fontSize: "26px", fontWeight: "700", color: C.primary, lineHeight: "1", fontFamily: "Inter, sans-serif" }}>{ev.day}</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px", flexWrap: "wrap" as const }}>
          <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "4px", color: C.primary, background: C.background, border: `1px solid ${C.line}`, letterSpacing: "0.5px", textTransform: "uppercase" as const }}>
            {typeCfg.label}
          </span>
          <span style={{ fontSize: "11px", color: C.muted }}>{ev.sector}</span>
        </div>
        <h4 style={{ fontSize: "13px", fontWeight: "600", color: C.primary, margin: "0 0 5px", lineHeight: "1.4", fontFamily: "Inter, sans-serif" }}>
          {ev.title}
        </h4>
        <p style={{ fontSize: "12px", color: C.text, lineHeight: "1.6", margin: "0 0 10px" }}>{ev.description}</p>
        {ev.location && (
          <div style={{ fontSize: "11px", color: C.muted, marginBottom: "10px", display: "flex", alignItems: "center", gap: "4px" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {ev.location}
          </div>
        )}
        {/* .ics download */}
        <button
          onClick={(e) => { e.stopPropagation(); downloadICS(ev); }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            padding: "5px 12px", borderRadius: "6px",
            border: `1px solid ${C.line}`, backgroundColor: "transparent",
            color: C.primary, fontSize: "11px", fontWeight: "600",
            cursor: "pointer", fontFamily: "Inter, sans-serif",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.primary; (e.currentTarget as HTMLButtonElement).style.color = C.white; (e.currentTarget as HTMLButtonElement).style.borderColor = C.primary; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = C.primary; (e.currentTarget as HTMLButtonElement).style.borderColor = C.line; }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Add to Calendar
        </button>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────

export default function PolicyPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeSector, setActiveSector] = useState("all");
  const [activeCategory, setActiveCategory] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [calendarMode, setCalendarMode] = useState<"list" | "month">("list");
  const [visibleCount, setVisibleCount] = useState(BRIEFS_PER_PAGE);

  const filtered = BRIEFS.filter(b => {
    const matchSector = activeSector === "all" || b.sector === activeSector;
    const matchCat = activeCategory === "All Types" || b.category === activeCategory;
    const matchSearch = searchQuery === "" ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSector && matchCat && matchSearch;
  });

  const visibleBriefs = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const stats = {
    enacted: BRIEFS.filter(b => b.status === "enacted").length,
    pending: BRIEFS.filter(b => b.status === "pending").length,
    underReview: BRIEFS.filter(b => b.status === "under-review").length,
  };

  // Group events by month for month-view
  const eventsByMonth = CALENDAR_EVENTS.reduce<Record<string, CalendarEvent[]>>((acc, ev) => {
    if (!acc[ev.fullMonth]) acc[ev.fullMonth] = [];
    acc[ev.fullMonth].push(ev);
    return acc;
  }, {});

  const HP = isMobile ? "20px" : "48px";

  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: C.white, minHeight: "100vh" }}>
      <SiteHeader />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.primary, padding: isMobile ? "56px 20px 48px" : "80px 48px 72px", textAlign: "center" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ marginBottom: "20px" }}>
            <Pill label="Policy & Governance" />
          </div>
          <h1 style={{
            fontFamily: "Inter, sans-serif", fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: "300", color: C.white, margin: "0 0 16px",
            lineHeight: "1.15", letterSpacing: "-0.5px",
          }}>
            Policy <span style={{ fontWeight: "700", color: C.accent }}>Updates</span>
          </h1>
          <p style={{ fontSize: isMobile ? "15px" : "17px", color: "rgba(255,255,255,0.7)", lineHeight: "1.65", margin: "0 0 36px" }}>
            Tracking regulatory developments, legislative changes, and policy shifts that shape investment and
            development across Ghana's 12 key sectors.
          </p>

          {/* Stats row */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: isMobile ? "10px" : "16px", maxWidth: "480px", margin: "0 auto",
          }}>
            {[
              { val: stats.enacted, label: "Enacted" },
              { val: stats.pending, label: "Pending" },
              { val: stats.underReview, label: "Under Review" },
            ].map(s => (
              <div key={s.label} style={{
                borderTop: `2px solid rgba(184,217,53,0.4)`,
                backgroundColor: "rgba(255,255,255,0.06)",
                padding: isMobile ? "16px 10px" : "20px 16px",
              }}>
                <div style={{ fontSize: isMobile ? "24px" : "30px", fontWeight: "700", color: C.white, marginBottom: "4px", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: "10px", fontWeight: "600", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" as const, letterSpacing: "1px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGISLATIVE CALENDAR ──────────────────────────────────── */}
      <section style={{ backgroundColor: C.background, padding: `${isMobile ? "48px" : "72px"} ${HP}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Header row */}
          <div style={{
            display: "flex", alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between", marginBottom: "32px",
            flexDirection: isMobile ? "column" : "row", gap: "16px",
          }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "5px 14px", background: C.accentBg, borderRadius: "4px",
                fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px",
                color: C.primary, marginBottom: "12px", textTransform: "uppercase" as const,
              }}>
                Upcoming
              </div>
              <h2 style={{
                fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: "300", color: C.primary,
                margin: 0, lineHeight: "1.2", fontFamily: "Inter, sans-serif",
              }}>
                Legislative <strong style={{ fontWeight: "700" }}>Calendar</strong>
              </h2>
              <p style={{ fontSize: "13px", color: C.muted, margin: "8px 0 0", lineHeight: "1.6" }}>
                Key dates for readings, consultations, deadlines and policy reviews.
              </p>
            </div>

            {/* View toggle */}
            <div style={{ display: "flex", gap: "0", borderRadius: "8px", border: `1px solid ${C.line}`, overflow: "hidden", flexShrink: 0 }}>
              {(["list", "month"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setCalendarMode(mode)}
                  style={{
                    padding: "9px 18px", border: "none",
                    backgroundColor: calendarMode === mode ? C.primary : C.white,
                    color: calendarMode === mode ? C.white : C.muted,
                    fontSize: "12px", fontWeight: "600", fontFamily: "Inter, sans-serif",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                    transition: "all 0.15s ease",
                  }}
                >
                  {mode === "list" ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  )}
                  {mode === "list" ? "List" : "By Month"}
                </button>
              ))}
            </div>
          </div>

          {/* ── LIST VIEW ── */}
          {calendarMode === "list" && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))", gap: "12px" }}>
              {CALENDAR_EVENTS.map(ev => (
                <CalendarEventCard key={ev.id} ev={ev} isMobile={isMobile} />
              ))}
            </div>
          )}

          {/* ── MONTH VIEW ── */}
          {calendarMode === "month" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {Object.entries(eventsByMonth).map(([month, events]) => (
                <div key={month}>
                  {/* Month header */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px",
                    paddingBottom: "12px", borderBottom: `1px solid ${C.line}`,
                  }}>
                    <div style={{
                      backgroundColor: C.primary, color: C.white,
                      borderRadius: "6px", padding: "5px 14px",
                      fontSize: "12px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.3px",
                    }}>
                      {month}
                    </div>
                    <span style={{ fontSize: "12px", color: C.muted }}>
                      {events.length} event{events.length !== 1 ? "s" : ""}
                    </span>
                    {events.some(e => e.urgency === "high") && (
                      <span style={{ fontSize: "10px", fontWeight: "700", color: C.primary, background: C.accentBg, padding: "2px 8px", borderRadius: "4px", letterSpacing: "0.5px" }}>
                        Action Required
                      </span>
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))", gap: "12px" }}>
                    {events.map(ev => (
                      <CalendarEventCard key={ev.id} ev={ev} isMobile={isMobile} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FILTERS + VIEW TOGGLE ──────────────────────────────────── */}
      <section style={{ backgroundColor: C.white, padding: `32px ${HP} 0`, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Top row: search + view toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" as const }}>
            {/* Search */}
            <div style={{ position: "relative" as const, flex: "1 1 200px", minWidth: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ position: "absolute" as const, left: "12px", top: "50%", transform: "translateY(-50%)" }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search briefs…"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setVisibleCount(BRIEFS_PER_PAGE); }}
                style={{
                  width: "100%", padding: "10px 14px 10px 36px", borderRadius: "6px",
                  border: `1px solid ${C.line}`, backgroundColor: C.white,
                  fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.dark,
                  outline: "none", boxSizing: "border-box" as const,
                }}
              />
            </div>

            {/* View toggle */}
            <div style={{ display: "flex", borderRadius: "8px", border: `1px solid ${C.line}`, overflow: "hidden", flexShrink: 0 }}>
              {(["card", "table"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    padding: "9px 16px", border: "none",
                    backgroundColor: viewMode === mode ? C.primary : C.white,
                    color: viewMode === mode ? C.white : C.muted,
                    fontSize: "12px", fontWeight: "600", fontFamily: "Inter, sans-serif",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "5px",
                    transition: "all 0.15s ease",
                  }}
                >
                  {mode === "card" ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  )}
                  {mode === "card" ? "Cards" : "Table"}
                </button>
              ))}
            </div>
          </div>

          {/* Category filters */}
          <div style={{ display: "flex", gap: "6px", overflowX: "auto" as const, scrollbarWidth: "none" as const, marginBottom: "16px", paddingBottom: "4px" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(BRIEFS_PER_PAGE); }}
                style={{
                  padding: "6px 14px", borderRadius: "4px", flexShrink: 0,
                  border: `1px solid ${activeCategory === cat ? C.primary : C.line}`,
                  backgroundColor: activeCategory === cat ? C.primary : "transparent",
                  color: activeCategory === cat ? C.white : C.text,
                  fontSize: "12px", fontWeight: "500", cursor: "pointer",
                  fontFamily: "Inter, sans-serif", transition: "all 0.15s ease",
                  whiteSpace: "nowrap" as const,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sector scroll tabs */}
          <div style={{
            display: "flex", gap: "0", overflowX: "auto" as const,
            scrollbarWidth: "none" as const, borderBottom: `1px solid ${C.line}`,
          }}>
            {SECTORS.map(s => (
              <button
                key={s.key}
                onClick={() => { setActiveSector(s.key); setVisibleCount(BRIEFS_PER_PAGE); }}
                style={{
                  padding: "10px 16px", border: "none", flexShrink: 0,
                  borderBottom: `2px solid ${activeSector === s.key ? C.primary : "transparent"}`,
                  backgroundColor: "transparent",
                  color: activeSector === s.key ? C.primary : C.muted,
                  fontSize: "12px", fontWeight: activeSector === s.key ? "700" : "500",
                  cursor: "pointer", fontFamily: "Inter, sans-serif",
                  whiteSpace: "nowrap" as const, transition: "all 0.15s ease",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRIEFS LIST / TABLE ──────────────────────────────────── */}
      <section style={{ backgroundColor: C.white, padding: `32px ${HP} 72px` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", color: C.muted, marginBottom: "20px", fontFamily: "Inter, sans-serif" }}>
            Showing <strong style={{ color: C.primary }}>{Math.min(visibleCount, filtered.length)}</strong> of{" "}
            <strong style={{ color: C.primary }}>{filtered.length}</strong> policy briefs
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "72px 24px", backgroundColor: C.background, borderRadius: "10px", border: `1px solid ${C.line}` }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: C.primary, margin: "0 0 8px" }}>No briefs match your filters</h3>
              <p style={{ fontSize: "13px", color: C.muted, margin: 0 }}>Try adjusting your sector filter or search query.</p>
            </div>
          ) : viewMode === "card" ? (
            <>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px" }}>
                {visibleBriefs.map(brief => <BriefCard key={brief.id} brief={brief} />)}
              </div>
              {hasMore && (
                <div style={{ textAlign: "center", marginTop: "32px" }}>
                  <button
                    onClick={() => setVisibleCount(c => c + BRIEFS_PER_PAGE)}
                    style={{
                      padding: "11px 32px", borderRadius: "6px",
                      border: `1px solid ${C.line}`, backgroundColor: "transparent",
                      color: C.primary, fontFamily: "Inter, sans-serif",
                      fontSize: "13px", fontWeight: "600", cursor: "pointer",
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.primary; (e.currentTarget as HTMLButtonElement).style.color = C.white; (e.currentTarget as HTMLButtonElement).style.borderColor = C.primary; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = C.primary; (e.currentTarget as HTMLButtonElement).style.borderColor = C.line; }}
                  >
                    Load more
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <p style={{ fontSize: "12px", color: C.muted, marginTop: "8px" }}>
                    {filtered.length - Math.min(visibleCount, filtered.length)} more available
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Table view — only on desktop, card fallback on mobile */
            isMobile ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {visibleBriefs.map(brief => <BriefCard key={brief.id} brief={brief} />)}
                {hasMore && (
                  <button onClick={() => setVisibleCount(c => c + BRIEFS_PER_PAGE)}
                    style={{ padding: "10px 24px", borderRadius: "6px", border: `1px solid ${C.line}`, backgroundColor: "transparent", color: C.primary, fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "Inter, sans-serif", marginTop: "8px" }}>
                    Load more
                  </button>
                )}
              </div>
            ) : (
              <div style={{ backgroundColor: C.white, borderRadius: "10px", border: `1px solid ${C.line}`, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" as const, fontFamily: "Inter, sans-serif" }}>
                  <thead>
                    <tr style={{ backgroundColor: C.background, borderBottom: `1px solid ${C.line}` }}>
                      {["Brief / Category", "Sector", "Status", "Date"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left" as const, fontSize: "10px", fontWeight: "700", color: C.muted, textTransform: "uppercase" as const, letterSpacing: "1px", whiteSpace: "nowrap" as const }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleBriefs.map(brief => <BriefTableRow key={brief.id} brief={brief} />)}
                  </tbody>
                </table>
                {hasMore && (
                  <div style={{ padding: "18px", borderTop: `1px solid ${C.line}`, textAlign: "center" }}>
                    <button onClick={() => setVisibleCount(c => c + BRIEFS_PER_PAGE)}
                      style={{ padding: "9px 24px", borderRadius: "6px", border: `1px solid ${C.line}`, backgroundColor: "transparent", color: C.primary, fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
                      Load {Math.min(BRIEFS_PER_PAGE, filtered.length - visibleCount)} more
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </section>

      {/* ── CATEGORIES PREVIEW ──────────────────────────────────── */}
      <section style={{ backgroundColor: C.background, padding: `${isMobile ? "48px" : "72px"} ${HP}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: "300", color: C.primary, margin: "0 0 8px", fontFamily: "Inter, sans-serif" }}>
              Policy intelligence by <strong style={{ fontWeight: "700" }}>category</strong>
            </h2>
            <p style={{ fontSize: "14px", color: C.muted, lineHeight: "1.6", margin: 0, maxWidth: "480px" }}>
              Tracking developments across regulatory, legislative, analytical, and stakeholder dimensions.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: "1px", backgroundColor: C.line, border: `1px solid ${C.line}`, borderRadius: "10px", overflow: "hidden" }}>
            {[
              { label: "Regulatory Frameworks", desc: "Licensing, compliance, and operating environment analysis.", count: BRIEFS.filter(b => b.category === "Regulatory Framework").length },
              { label: "Legislative Tracker", desc: "Pending and enacted legislation across Ghana's 12 BRIDGE sectors.", count: BRIEFS.filter(b => b.category === "Legislation").length },
              { label: "Policy Briefs", desc: "Concise analyses of policy shifts and economic implications.", count: BRIEFS.filter(b => b.category === "Policy Brief").length },
              { label: "Stakeholder Positions", desc: "Government, private sector, and civil society perspectives.", count: BRIEFS.filter(b => b.category === "Stakeholder Position").length },
            ].map(card => (
              <div key={card.label} style={{ backgroundColor: C.white, padding: "24px" }}>
                <div style={{ fontSize: "30px", fontWeight: "700", color: C.primary, fontFamily: "Inter, sans-serif", lineHeight: 1, marginBottom: "12px" }}>{card.count}</div>
                <h3 style={{ fontSize: "13px", fontWeight: "600", color: C.primary, margin: "0 0 6px", fontFamily: "Inter, sans-serif", lineHeight: "1.3" }}>{card.label}</h3>
                <p style={{ fontSize: "12px", color: C.muted, lineHeight: "1.55", margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.primary, padding: `${isMobile ? "56px" : "80px"} ${HP}` }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: "18px" }}>
            <Pill label="Stay Informed" />
          </div>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: "300", color: C.white, margin: "0 0 14px", lineHeight: "1.2", fontFamily: "Inter, sans-serif" }}>
            Policy updates{" "}
            <span style={{ fontWeight: "700", color: C.accent }}>delivered to you</span>
          </h2>
          <p style={{ fontSize: isMobile ? "14px" : "15px", color: "rgba(255,255,255,0.6)", lineHeight: "1.7", margin: "0 0 32px" }}>
            Receive concise briefings whenever a significant regulatory change, new legislation, or policy shift affects Ghana's 12 BRIDGE sectors. Only what matters to your work.
          </p>

          {subscribed ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", backgroundColor: "rgba(184,217,53,0.12)", border: "1px solid rgba(184,217,53,0.3)", borderRadius: "8px", padding: "14px 28px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: "14px", fontWeight: "600", color: C.accent }}>Subscribed — we'll be in touch.</span>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "8px", maxWidth: "460px", margin: "0 auto", flexWrap: "wrap" as const }}>
              <input
                type="email" placeholder="Your email address" value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: "1 1 200px", padding: "12px 18px", borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.07)",
                  color: C.white, fontFamily: "Inter, sans-serif", fontSize: "14px", outline: "none",
                }}
              />
              <button
                onClick={() => { if (email.includes("@")) setSubscribed(true); }}
                style={{
                  padding: "12px 24px", borderRadius: "6px", border: "none",
                  backgroundColor: C.accent, color: C.primary,
                  fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: "700", cursor: "pointer", flexShrink: 0,
                }}
              >
                Subscribe
              </button>
            </div>
          )}
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "14px" }}>
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
