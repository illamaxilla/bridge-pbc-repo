import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useIsMobile } from "@/hooks/useIsMobile";

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
    <span className="inline-flex items-center gap-2 px-[18px] py-2 border border-[rgba(184,217,53,0.35)] rounded-full text-[11px] font-semibold tracking-[1.5px] text-[#B8D935] uppercase">
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: "enacted" | "pending" | "under-review" }) {
  const cfg = STATUS_CONFIG[status];
  const dotEl = cfg.dot === "filled"
    ? <span className="w-1.5 h-1.5 rounded-full bg-[#B8D935] inline-block shrink-0" />
    : cfg.dot === "empty"
    ? <span className="w-1.5 h-1.5 rounded-full border-[1.5px] border-[#7A8C83] inline-block shrink-0" />
    : <span className="w-2 h-[1.5px] bg-[#7A8C83] inline-block shrink-0" />;
  return (
    <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-2.5 py-[3px] rounded-[20px] text-[#1B4D3E] bg-white border border-[#DEDEDE] tracking-[0.3px] shrink-0">
      {dotEl}{cfg.label}
    </span>
  );
}

function BriefCard({ brief }: { brief: PolicyBrief }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="bg-white rounded-[10px] border border-[#DEDEDE] px-6 py-5 transition-shadow duration-200 ease-in-out cursor-pointer"
      onClick={() => setExpanded(v => !v)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-[#7A8C83] uppercase tracking-[1.2px]">{brief.category}</span>
            <span className="text-[#DEDEDE] text-[10px]">·</span>
            <span className="text-[11px] text-[#7A8C83]">{brief.date}</span>
          </div>
          <h3 className="text-sm font-semibold text-[#1B4D3E] m-0 leading-[1.45] font-['Inter',sans-serif]">
            {brief.title}
          </h3>
        </div>
        <div className="flex flex-col items-end gap-2.5 shrink-0">
          <StatusBadge status={brief.status} />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A8C83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-200 mr-0.5 ${expanded ? "rotate-180" : ""}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      {expanded && (
        <div className="mt-4 pt-4 border-t border-[#DEDEDE]">
          <p className="text-sm text-[#4A5A52] leading-[1.7] mb-3.5 mt-0">{brief.summary}</p>
          <div className="flex gap-1.5 flex-wrap">
            {brief.tags.map(tag => (
              <span key={tag} className="text-[11px] font-medium px-2.5 py-[3px] rounded bg-[#F3F5F2] border border-[#DEDEDE] text-[#4A5A52]">
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
    <tr className="border-b border-[#DEDEDE] transition-colors duration-150 hover:bg-[#F3F5F2]">
      <td className="p-[14px_16px] align-top">
        <div className="text-[13px] font-semibold text-[#1B4D3E] leading-[1.4] mb-1">{brief.title}</div>
        <div className="text-[11px] text-[#7A8C83]">{brief.category}</div>
      </td>
      <td className="p-[14px_16px] align-middle whitespace-nowrap">
        <span className="text-[11px] font-medium text-[#4A5A52] bg-[#F3F5F2] px-[9px] py-[3px] rounded border border-[#DEDEDE] capitalize">
          {brief.sector.replace("-", " ")}
        </span>
      </td>
      <td className="p-[14px_16px] align-middle">
        <StatusBadge status={brief.status} />
      </td>
      <td className="p-[14px_16px] align-middle text-xs text-[#7A8C83] whitespace-nowrap">{brief.date}</td>
    </tr>
  );
}

// ── Calendar Event Card ──────────────────────────────────────────────────────
function CalendarEventCard({ ev, isMobile }: { ev: CalendarEvent; isMobile: boolean }) {
  const typeCfg = EVENT_TYPE_CONFIG[ev.type];
  return (
    <div className={`bg-white rounded-[10px] border border-[#DEDEDE] flex gap-4 ${isMobile ? "p-4" : "px-6 py-5"}`}>
      {/* Date badge */}
      <div className="text-center shrink-0 w-12 pr-4 border-r border-[#DEDEDE]">
        <div className="text-[9px] font-bold text-[#7A8C83] tracking-[1px] uppercase mb-0.5">{ev.month}</div>
        <div className="text-[26px] font-bold text-[#1B4D3E] leading-none font-['Inter',sans-serif]">{ev.day}</div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-[5px] flex-wrap">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F3F5F2] border border-[#DEDEDE] tracking-[0.5px] uppercase text-[#1B4D3E]">
            {typeCfg.label}
          </span>
          <span className="text-[11px] text-[#7A8C83]">{ev.sector}</span>
        </div>
        <h4 className="text-[13px] font-semibold text-[#1B4D3E] mb-[5px] mt-0 leading-[1.4] font-['Inter',sans-serif]">
          {ev.title}
        </h4>
        <p className="text-xs text-[#4A5A52] leading-[1.6] mb-2.5 mt-0">{ev.description}</p>
        {ev.location && (
          <div className="text-[11px] text-[#7A8C83] mb-2.5 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {ev.location}
          </div>
        )}
        {/* .ics download */}
        <button
          onClick={(e) => { e.stopPropagation(); downloadICS(ev); }}
          className="inline-flex items-center gap-[5px] px-3 py-[5px] rounded-md border border-[#DEDEDE] bg-transparent text-[#1B4D3E] text-[11px] font-semibold cursor-pointer font-['Inter',sans-serif] transition-all duration-150 ease-in-out hover:bg-[#1B4D3E] hover:text-white hover:border-[#1B4D3E]"
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

  return (
    <Layout>
    <div className="font-['Inter',sans-serif] bg-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className={`bg-[#1B4D3E] text-center ${isMobile ? "px-5 pt-14 pb-12" : "px-12 pt-20 pb-[72px]"}`}>
        <div className="max-w-[720px] mx-auto">
          <div className="mb-5">
            <Pill label="Policy & Governance" />
          </div>
          <h1 className="font-['Inter',sans-serif] text-[clamp(28px,5vw,52px)] font-light text-white mb-4 mt-0 leading-[1.15] tracking-[-0.5px]">
            Policy <span className="font-bold text-[#B8D935]">Updates</span>
          </h1>
          <p className={`${isMobile ? "text-[15px]" : "text-[17px]"} text-white/70 leading-[1.65] mb-9 mt-0`}>
            Tracking regulatory developments, legislative changes, and policy shifts that shape investment and
            development across Ghana's 12 key sectors.
          </p>

          {/* Stats row */}
          <div className={`grid grid-cols-3 ${isMobile ? "gap-2.5" : "gap-4"} max-w-[480px] mx-auto`}>
            {[
              { val: stats.enacted, label: "Enacted" },
              { val: stats.pending, label: "Pending" },
              { val: stats.underReview, label: "Under Review" },
            ].map(s => (
              <div key={s.label} className={`border-t-2 border-[rgba(184,217,53,0.4)] bg-white/[0.06] ${isMobile ? "px-2.5 py-4" : "px-4 py-5"}`}>
                <div className={`${isMobile ? "text-2xl" : "text-[30px]"} font-bold text-white mb-1 leading-none`}>{s.val}</div>
                <div className="text-[10px] font-semibold text-white/[0.45] uppercase tracking-[1px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGISLATIVE CALENDAR ──────────────────────────────────── */}
      <section className={`bg-[#F3F5F2] ${isMobile ? "py-12 px-5" : "py-[72px] px-12"}`}>
        <div className="max-w-[1100px] mx-auto">
          {/* Header row */}
          <div className={`flex ${isMobile ? "items-start flex-col" : "items-end flex-row"} justify-between mb-8 gap-4`}>
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-[5px] bg-[#EBF5B0] rounded text-[10px] font-bold tracking-[1.5px] text-[#1B4D3E] mb-3 uppercase">
                Upcoming
              </div>
              <h2 className="text-[clamp(22px,3.5vw,32px)] font-light text-[#1B4D3E] m-0 leading-[1.2] font-['Inter',sans-serif]">
                Legislative <strong className="font-bold">Calendar</strong>
              </h2>
              <p className="text-[13px] text-[#7A8C83] mt-2 mb-0 leading-[1.6]">
                Key dates for readings, consultations, deadlines and policy reviews.
              </p>
            </div>

            {/* View toggle */}
            <div className="flex rounded-lg border border-[#DEDEDE] overflow-hidden shrink-0">
              {(["list", "month"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setCalendarMode(mode)}
                  className={`px-[18px] py-[9px] border-none text-xs font-semibold font-['Inter',sans-serif] cursor-pointer flex items-center gap-1.5 transition-all duration-150 ease-in-out ${
                    calendarMode === mode
                      ? "bg-[#1B4D3E] text-white"
                      : "bg-white text-[#7A8C83]"
                  }`}
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
            <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-[repeat(auto-fill,minmax(340px,1fr))]"}`}>
              {CALENDAR_EVENTS.map(ev => (
                <CalendarEventCard key={ev.id} ev={ev} isMobile={isMobile} />
              ))}
            </div>
          )}

          {/* ── MONTH VIEW ── */}
          {calendarMode === "month" && (
            <div className="flex flex-col gap-8">
              {Object.entries(eventsByMonth).map(([month, events]) => (
                <div key={month}>
                  {/* Month header */}
                  <div className="flex items-center gap-3 mb-3.5 pb-3 border-b border-[#DEDEDE]">
                    <div className="bg-[#1B4D3E] text-white rounded-md px-3.5 py-[5px] text-xs font-bold font-['Inter',sans-serif] tracking-[0.3px]">
                      {month}
                    </div>
                    <span className="text-xs text-[#7A8C83]">
                      {events.length} event{events.length !== 1 ? "s" : ""}
                    </span>
                    {events.some(e => e.urgency === "high") && (
                      <span className="text-[10px] font-bold text-[#1B4D3E] bg-[#EBF5B0] px-2 py-0.5 rounded tracking-[0.5px]">
                        Action Required
                      </span>
                    )}
                  </div>
                  <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-[repeat(auto-fill,minmax(340px,1fr))]"}`}>
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
      <section className="bg-white pt-8 pb-0 border-b border-[#DEDEDE]" style={{ paddingLeft: HP, paddingRight: HP }}>
        <div className="max-w-[1100px] mx-auto">
          {/* Top row: search + view toggle */}
          <div className="flex items-center gap-2.5 mb-5 flex-wrap">
            {/* Search */}
            <div className="relative flex-[1_1_200px] min-w-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A8C83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="absolute left-3 top-1/2 -translate-y-1/2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search briefs…"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setVisibleCount(BRIEFS_PER_PAGE); }}
                className="w-full py-2.5 pr-3.5 pl-9 rounded-md border border-[#DEDEDE] bg-white font-['Inter',sans-serif] text-[13px] text-[#191919] outline-none box-border"
              />
            </div>

            {/* View toggle */}
            <div className="flex rounded-lg border border-[#DEDEDE] overflow-hidden shrink-0">
              {(["card", "table"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-[9px] border-none text-xs font-semibold font-['Inter',sans-serif] cursor-pointer flex items-center gap-[5px] transition-all duration-150 ease-in-out ${
                    viewMode === mode
                      ? "bg-[#1B4D3E] text-white"
                      : "bg-white text-[#7A8C83]"
                  }`}
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
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none mb-4 pb-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(BRIEFS_PER_PAGE); }}
                className={`px-3.5 py-1.5 rounded shrink-0 text-xs font-medium cursor-pointer font-['Inter',sans-serif] transition-all duration-150 ease-in-out whitespace-nowrap ${
                  activeCategory === cat
                    ? "border border-[#1B4D3E] bg-[#1B4D3E] text-white"
                    : "border border-[#DEDEDE] bg-transparent text-[#4A5A52]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sector scroll tabs */}
          <div className="flex overflow-x-auto border-b border-[#DEDEDE]" style={{ scrollbarWidth: "none" }}>
            {SECTORS.map(s => (
              <button
                key={s.key}
                onClick={() => { setActiveSector(s.key); setVisibleCount(BRIEFS_PER_PAGE); }}
                className={`px-4 py-2.5 border-none shrink-0 bg-transparent text-xs cursor-pointer font-['Inter',sans-serif] whitespace-nowrap transition-all duration-150 ease-in-out border-b-2 ${
                  activeSector === s.key
                    ? "border-b-[#1B4D3E] text-[#1B4D3E] font-bold"
                    : "border-b-transparent text-[#7A8C83] font-medium"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRIEFS LIST / TABLE ──────────────────────────────────── */}
      <section className="bg-white pt-8 pb-[72px]" style={{ paddingLeft: HP, paddingRight: HP }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-xs text-[#7A8C83] mb-5 font-['Inter',sans-serif]">
            Showing <strong className="text-[#1B4D3E]">{Math.min(visibleCount, filtered.length)}</strong> of{" "}
            <strong className="text-[#1B4D3E]">{filtered.length}</strong> policy briefs
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-[72px] px-6 bg-[#F3F5F2] rounded-[10px] border border-[#DEDEDE]">
              <h3 className="text-base font-semibold text-[#1B4D3E] mb-2 mt-0">No briefs match your filters</h3>
              <p className="text-[13px] text-[#7A8C83] m-0">Try adjusting your sector filter or search query.</p>
            </div>
          ) : viewMode === "card" ? (
            <>
              <div className="flex flex-col gap-2">
                {visibleBriefs.map(brief => <BriefCard key={brief.id} brief={brief} />)}
              </div>
              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setVisibleCount(c => c + BRIEFS_PER_PAGE)}
                    className="px-8 py-[11px] rounded-md border border-[#DEDEDE] bg-transparent text-[#1B4D3E] font-['Inter',sans-serif] text-[13px] font-semibold cursor-pointer inline-flex items-center gap-2 transition-all duration-200 ease-in-out hover:bg-[#1B4D3E] hover:text-white hover:border-[#1B4D3E]"
                  >
                    Load more
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <p className="text-xs text-[#7A8C83] mt-2">
                    {filtered.length - Math.min(visibleCount, filtered.length)} more available
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Table view — only on desktop, card fallback on mobile */
            isMobile ? (
              <div className="flex flex-col gap-2">
                {visibleBriefs.map(brief => <BriefCard key={brief.id} brief={brief} />)}
                {hasMore && (
                  <button onClick={() => setVisibleCount(c => c + BRIEFS_PER_PAGE)}
                    className="px-6 py-2.5 rounded-md border border-[#DEDEDE] bg-transparent text-[#1B4D3E] text-[13px] font-semibold cursor-pointer font-['Inter',sans-serif] mt-2">
                    Load more
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-[10px] border border-[#DEDEDE] overflow-hidden">
                <table className="w-full border-collapse font-['Inter',sans-serif]">
                  <thead>
                    <tr className="bg-[#F3F5F2] border-b border-[#DEDEDE]">
                      {["Brief / Category", "Sector", "Status", "Date"].map(h => (
                        <th key={h} className="p-[12px_16px] text-left text-[10px] font-bold text-[#7A8C83] uppercase tracking-[1px] whitespace-nowrap">
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
                  <div className="p-[18px] border-t border-[#DEDEDE] text-center">
                    <button onClick={() => setVisibleCount(c => c + BRIEFS_PER_PAGE)}
                      className="px-6 py-[9px] rounded-md border border-[#DEDEDE] bg-transparent text-[#1B4D3E] font-['Inter',sans-serif] text-[13px] font-semibold cursor-pointer">
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
      <section className={`bg-[#F3F5F2] ${isMobile ? "py-12" : "py-[72px]"}`} style={{ paddingLeft: HP, paddingRight: HP }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-8">
            <h2 className="text-[clamp(20px,3vw,28px)] font-light text-[#1B4D3E] mb-2 mt-0 font-['Inter',sans-serif]">
              Policy intelligence by <strong className="font-bold">category</strong>
            </h2>
            <p className="text-sm text-[#7A8C83] leading-[1.6] m-0 max-w-[480px]">
              Tracking developments across regulatory, legislative, analytical, and stakeholder dimensions.
            </p>
          </div>

          <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-px bg-[#DEDEDE] border border-[#DEDEDE] rounded-[10px] overflow-hidden`}>
            {[
              { label: "Regulatory Frameworks", desc: "Licensing, compliance, and operating environment analysis.", count: BRIEFS.filter(b => b.category === "Regulatory Framework").length },
              { label: "Legislative Tracker", desc: "Pending and enacted legislation across Ghana's 12 BRIDGE sectors.", count: BRIEFS.filter(b => b.category === "Legislation").length },
              { label: "Policy Briefs", desc: "Concise analyses of policy shifts and economic implications.", count: BRIEFS.filter(b => b.category === "Policy Brief").length },
              { label: "Stakeholder Positions", desc: "Government, private sector, and civil society perspectives.", count: BRIEFS.filter(b => b.category === "Stakeholder Position").length },
            ].map(card => (
              <div key={card.label} className="bg-white p-6">
                <div className="text-[30px] font-bold text-[#1B4D3E] font-['Inter',sans-serif] leading-none mb-3">{card.count}</div>
                <h3 className="text-[13px] font-semibold text-[#1B4D3E] mb-1.5 mt-0 font-['Inter',sans-serif] leading-[1.3]">{card.label}</h3>
                <p className="text-xs text-[#7A8C83] leading-[1.55] m-0">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────────────── */}
      <section className={`bg-[#1B4D3E] ${isMobile ? "py-14" : "py-20"}`} style={{ paddingLeft: HP, paddingRight: HP }}>
        <div className="max-w-[640px] mx-auto text-center">
          <div className="mb-[18px]">
            <Pill label="Stay Informed" />
          </div>
          <h2 className="text-[clamp(22px,4vw,34px)] font-light text-white mb-3.5 mt-0 leading-[1.2] font-['Inter',sans-serif]">
            Policy updates{" "}
            <span className="font-bold text-[#B8D935]">delivered to you</span>
          </h2>
          <p className={`${isMobile ? "text-sm" : "text-[15px]"} text-white/60 leading-[1.7] mb-8 mt-0`}>
            Receive concise briefings whenever a significant regulatory change, new legislation, or policy shift affects Ghana's 12 BRIDGE sectors. Only what matters to your work.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-3 bg-[rgba(184,217,53,0.12)] border border-[rgba(184,217,53,0.3)] rounded-lg px-7 py-3.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8D935" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm font-semibold text-[#B8D935]">Subscribed — we'll be in touch.</span>
            </div>
          ) : (
            <div className="flex gap-2 max-w-[460px] mx-auto flex-wrap">
              <input
                type="email" placeholder="Your email address" value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-[1_1_200px] px-[18px] py-3 rounded-md border border-white/15 bg-white/[0.07] text-white font-['Inter',sans-serif] text-sm outline-none"
              />
              <button
                onClick={() => { if (email.includes("@")) setSubscribed(true); }}
                className="px-6 py-3 rounded-md border-none bg-[#B8D935] text-[#1B4D3E] font-['Inter',sans-serif] text-sm font-bold cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </div>
          )}
          <p className="text-[11px] text-white/30 mt-3.5">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>

    </div>
    </Layout>
  );
}
