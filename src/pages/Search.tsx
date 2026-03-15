import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useAuth } from "@/context/AuthContext";
import { colors } from "@/lib/theme";
import {
  Search as SearchIcon,
  ArrowUpRight,
  FileText,
  BarChart3,
  Users,
  Globe,
  BookOpen,
  Lock,
  Zap,
  MapPin,
  Filter,
  X,
} from "lucide-react";

// ─── Searchable Content Index ─────────────────────────────────────
interface SearchEntry {
  title: string;
  description: string;
  path: string;
  category: string;
  keywords: string[];
  requiresAuth?: boolean;
  requiresPaid?: boolean;
}

const SEARCH_INDEX: SearchEntry[] = [
  // Main Pages
  { title: "Home", description: "BRIDGE PBC — Blending Resources and Innovation for Development, Growth, and Empowerment in Ghana.", path: "/", category: "Pages", keywords: ["home", "bridge", "ghana", "investment", "development", "pbc"] },
  { title: "About BRIDGE", description: "Learn about BRIDGE PBC's mission, team, and approach to catalysing Ghana's economic transformation.", path: "/about", category: "Pages", keywords: ["about", "mission", "team", "leadership", "who we are", "company", "values"] },
  { title: "Services", description: "Research & Guidance, Venture Development, Direct Investment, and Strategic Partnerships.", path: "/services", category: "Pages", keywords: ["services", "research", "venture", "investment", "partnerships", "guidance", "consulting"] },
  { title: "Methodology", description: "BRIDGE Impact Score™ methodology — the four-dimensional framework behind venture evaluation.", path: "/methodology", category: "Pages", keywords: ["methodology", "impact score", "evaluation", "framework", "scoring", "assessment"] },
  { title: "Resources & Research Library", description: "Sector intelligence, GIPC profiles, and the complete BRIDGE research archive.", path: "/resources", category: "Pages", keywords: ["resources", "research", "library", "documents", "reports", "intelligence"] },
  { title: "Insights & Analysis", description: "Latest analysis, sector briefs, and strategic intelligence from BRIDGE.", path: "/insights", category: "Pages", keywords: ["insights", "analysis", "blog", "articles", "strategy", "updates"] },
  { title: "Contact Us", description: "Get in touch with BRIDGE PBC — submit a question, book a call, or partner with us.", path: "/contact", category: "Pages", keywords: ["contact", "email", "phone", "office", "accra", "submit question", "book call"] },
  { title: "Policy Updates", description: "Ghana policy developments and their implications for BRIDGE sectors.", path: "/policy", category: "Pages", keywords: ["policy", "government", "ghana", "regulation", "budget", "legislation"] },
  { title: "Community Forum", description: "BRIDGE community — connect with members, share insights, and collaborate.", path: "/community", category: "Pages", keywords: ["community", "forum", "members", "discussion", "networking"] },
  { title: "FAQ & Help Centre", description: "Frequently asked questions about BRIDGE membership, services, and Ghana investment.", path: "/faq", category: "Pages", keywords: ["faq", "help", "questions", "support", "how to", "guide"] },
  { title: "Membership", description: "BRIDGE membership tiers — Free and Paid access to intelligence, community, and deal flow.", path: "/membership", category: "Pages", keywords: ["membership", "pricing", "subscribe", "join", "sign up", "free", "paid", "tier"] },
  { title: "Terms of Service", description: "BRIDGE PBC terms of service — account usage, intellectual property, and membership policies.", path: "/terms", category: "Pages", keywords: ["terms", "terms of service", "legal", "tos", "agreement"] },
  { title: "Privacy Policy", description: "How BRIDGE PBC collects, uses, and protects your personal information.", path: "/privacy", category: "Pages", keywords: ["privacy", "privacy policy", "data", "cookies", "gdpr", "personal information"] },
  { title: "Accessibility Statement", description: "BRIDGE PBC's commitment to digital accessibility and WCAG compliance.", path: "/accessibility", category: "Pages", keywords: ["accessibility", "wcag", "screen reader", "a11y", "inclusive"] },

  // Sectors
  { title: "All Sectors Overview", description: "Explore BRIDGE's 12 integrated investment sectors across Ghana's economy.", path: "/sectors", category: "Sectors", keywords: ["sectors", "overview", "12 sectors", "all sectors"] },
  { title: "Energy & Renewable Resources", description: "Solar mini-grids, clean cooking, and energy financing across Ghana.", path: "/sectors/energy", category: "Sectors", keywords: ["energy", "solar", "renewable", "power", "electricity", "clean cooking", "mini-grid"] },
  { title: "Technology & Innovation", description: "Fintech, digital services, innovation hubs, and enabling technology.", path: "/sectors/technology", category: "Sectors", keywords: ["technology", "tech", "fintech", "digital", "innovation", "software", "ai", "startup"] },
  { title: "Agriculture & Value Chains", description: "Post-harvest processing, cold chain, agri-tech, and farmer platforms.", path: "/sectors/agriculture", category: "Sectors", keywords: ["agriculture", "farming", "agri", "food", "crop", "cold chain", "value chain", "post-harvest"] },
  { title: "Education & Skills", description: "TVET transformation, digital skills academies, and workforce development.", path: "/sectors/education", category: "Sectors", keywords: ["education", "skills", "training", "tvet", "school", "learning", "workforce", "academy"] },
  { title: "Financial Inclusion & Economic Security", description: "SME lending, digital payments, micro-insurance, and remittance optimisation.", path: "/sectors/financial", category: "Sectors", keywords: ["financial", "finance", "banking", "lending", "payments", "insurance", "remittance", "inclusion"] },
  { title: "Health Systems & Wellbeing", description: "Telemedicine, diagnostics, pharmaceutical supply chain, and health workforce.", path: "/sectors/health", category: "Sectors", keywords: ["health", "medical", "hospital", "telemedicine", "pharma", "healthcare", "doctor", "clinic"] },
  { title: "Housing & Real Estate", description: "Affordable housing development, construction finance, and diaspora housing products.", path: "/sectors/housing", category: "Sectors", keywords: ["housing", "real estate", "construction", "affordable", "building", "property", "mortgage"] },
  { title: "Infrastructure & Basic Services", description: "Market modernisation, water systems, sanitation, and digital connectivity.", path: "/sectors/infrastructure", category: "Sectors", keywords: ["infrastructure", "water", "sanitation", "roads", "connectivity", "market", "kejetia"] },
  { title: "Manufacturing & Light Industry", description: "Food processing, textiles, building materials, and pharmaceutical manufacturing.", path: "/sectors/manufacturing", category: "Sectors", keywords: ["manufacturing", "factory", "production", "textile", "industrial", "processing"] },
  { title: "Sports, Entertainment & Creative", description: "Content production, IP monetisation, creative economy hubs, and talent development.", path: "/sectors/sports", category: "Sectors", keywords: ["sports", "entertainment", "creative", "music", "film", "art", "culture", "afrobeats"] },
  { title: "Tourism & Hospitality", description: "Heritage tourism, eco-tourism, hospitality skills, and destination infrastructure.", path: "/sectors/tourism", category: "Sectors", keywords: ["tourism", "hospitality", "travel", "hotel", "heritage", "year of return", "eco-tourism"] },
  { title: "Transportation & Logistics", description: "Cold chain logistics, last-mile delivery, freight management, and fleet financing.", path: "/sectors/transport", category: "Sectors", keywords: ["transport", "transportation", "logistics", "delivery", "freight", "fleet", "trucking"] },

  // Reports & Documents
  { title: "BRIDGE Impact Score™ Methodology", description: "How every venture is evaluated — four-dimensional framework, scoring weights, and pipeline stages.", path: "/resources/impact-score", category: "Reports", keywords: ["impact score", "methodology", "scoring", "evaluation", "framework"], requiresPaid: true },
  { title: "Peace & Prosperity Framework", description: "The philosophical and analytical foundation — five dimensions of Peace, three domains of Prosperity.", path: "/resources/peace-prosperity", category: "Reports", keywords: ["peace", "prosperity", "framework", "philosophy", "dignity", "security", "thriving"], requiresPaid: true },
  { title: "BRIDGE Venture Portfolio Overview", description: "174+ ventures across 12 sectors — capital ranges, Impact Scores, and cross-sector integration.", path: "/resources/portfolio", category: "Reports", keywords: ["portfolio", "ventures", "overview", "capital", "investment"], requiresPaid: true },
  { title: "Sector Intelligence Briefs — All 12 Sectors", description: "One authoritative brief per sector covering opportunity landscape, policy, and investment parameters.", path: "/resources/sector-briefs", category: "Reports", keywords: ["sector briefs", "intelligence", "research", "12 sectors", "analysis"] },
  { title: "Foundational White Paper", description: "Complete intellectual foundation — methodology, sector framework, and investment thesis.", path: "/resources/white-paper", category: "Reports", keywords: ["white paper", "foundation", "thesis", "research", "methodology"] },
  { title: "2025 Sector Intelligence Review", description: "Full-year retrospective across all 12 sectors — what moved, what stalled, and 2026 outlook.", path: "/resources/annual-review-2025", category: "Reports", keywords: ["annual review", "2025", "retrospective", "year in review"] },
  { title: "2026 Budget Alignment Report", description: "Ghana's 2026 National Budget mapped to the BRIDGE 12-sector investment framework.", path: "/resources/budget-alignment", category: "Reports", keywords: ["budget", "2026", "alignment", "national budget", "government", "fiscal"] },
  { title: "Ghana Policy Tracker 2025–2026", description: "Living document covering the 2026 Budget, Sankofa Initiative, and policy landscape.", path: "/resources/policy-tracker", category: "Reports", keywords: ["policy tracker", "sankofa", "24-hour economy", "policy", "government"] },
  { title: "Monthly Dashboard — March 2026", description: "Monthly intelligence snapshot with sector pulse, policy signals, and pipeline movement.", path: "/resources/monthly-dashboard", category: "Reports", keywords: ["monthly", "dashboard", "march", "2026", "snapshot", "pulse"] },
  { title: "Ghana Intelligence Q1 2026", description: "Quarterly intelligence briefing covering Ghana's economic performance and sector developments.", path: "/resources/ghana-intelligence", category: "Reports", keywords: ["ghana", "intelligence", "quarterly", "q1", "2026", "briefing"] },
  { title: "Resource Hub — Paid Member Library", description: "Full paid member document dashboard with intelligence, research, and sector data.", path: "/resources/document-library", category: "Reports", keywords: ["resource hub", "document library", "paid", "premium", "dashboard"], requiresPaid: true },

  // Intelligence Platform
  { title: "BRIDGE Intelligence Dashboard", description: "Real-time intelligence dashboard with market overview, analytics, and watchlist.", path: "/intelligence/dashboard", category: "Intelligence", keywords: ["dashboard", "intelligence", "analytics", "market", "data"], requiresAuth: true },
  { title: "Market Overview", description: "Ghana market overview — macroeconomic indicators, sector performance, and trends.", path: "/intelligence/market", category: "Intelligence", keywords: ["market", "overview", "macro", "indicators", "trends", "gdp"], requiresAuth: true },
  { title: "Intelligence Reports", description: "Full access to BRIDGE intelligence reports and sector analyses.", path: "/intelligence/reports", category: "Intelligence", keywords: ["reports", "intelligence", "analysis"], requiresAuth: true },
  { title: "Watchlist", description: "Track sectors and ventures of interest in your personal watchlist.", path: "/intelligence/watchlist", category: "Intelligence", keywords: ["watchlist", "track", "follow", "monitor"], requiresAuth: true },
  { title: "Analytics", description: "Deep analytics and data visualisation across BRIDGE sectors.", path: "/intelligence/analytics", category: "Intelligence", keywords: ["analytics", "data", "charts", "visualisation", "statistics"], requiresAuth: true },

  // Cannabis Intelligence
  { title: "Cannabis Licensing Intelligence", description: "NCC cannabis licensing series — 11 licence categories with regulatory analysis and market sizing.", path: "/resources/cannabis-intelligence", category: "Reports", keywords: ["cannabis", "marijuana", "ncc", "licence", "licensing", "narcotics", "hemp", "regulation"] },
  { title: "Cannabis Intelligence Summary", description: "Overview of Ghana's cannabis licensing framework and market opportunity.", path: "/resources/cannabis-intelligence/summary", category: "Reports", keywords: ["cannabis", "summary", "licensing", "overview", "ncc"] },
];

const CATEGORIES = ["All", "Pages", "Sectors", "Reports", "Intelligence"];

const categoryIcons: Record<string, React.ReactNode> = {
  Pages: <Globe size={14} />,
  Sectors: <BarChart3 size={14} />,
  Reports: <FileText size={14} />,
  Intelligence: <Zap size={14} />,
};

// ─── Search Logic ─────────────────────────────────────────────────
function searchEntries(query: string, category: string): SearchEntry[] {
  const q = query.toLowerCase().trim();
  let entries = SEARCH_INDEX;

  if (category !== "All") {
    entries = entries.filter((e) => e.category === category);
  }

  if (!q) return entries;

  // Score each entry based on relevance
  const scored = entries.map((entry) => {
    let score = 0;
    const titleLower = entry.title.toLowerCase();
    const descLower = entry.description.toLowerCase();

    // Exact title match
    if (titleLower === q) score += 100;
    // Title starts with query
    else if (titleLower.startsWith(q)) score += 80;
    // Title contains query
    else if (titleLower.includes(q)) score += 60;
    // Description contains query
    if (descLower.includes(q)) score += 30;
    // Keyword matches
    for (const kw of entry.keywords) {
      if (kw === q) score += 50;
      else if (kw.startsWith(q)) score += 35;
      else if (kw.includes(q)) score += 20;
    }

    // Multi-word query: check if all words appear somewhere
    const words = q.split(/\s+/).filter(Boolean);
    if (words.length > 1) {
      const allText = `${titleLower} ${descLower} ${entry.keywords.join(" ")}`;
      const allMatch = words.every((w) => allText.includes(w));
      if (allMatch) score += 40;
    }

    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.entry);
}

// ─── Search Page ──────────────────────────────────────────────────
export default function SearchPage() {
  usePageMeta({ title: "Search", description: "Search BRIDGE PBC \u2014 find pages, sectors, reports, and intelligence across the site." });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, tier } = useAuth();
  const mobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);

  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("All");
  const [results, setResults] = useState<SearchEntry[]>(() =>
    searchEntries(initialQuery, "All")
  );

  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q !== query) {
      setQuery(q);
      setResults(searchEntries(q, category));
    }
  }, [searchParams]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    setResults(searchEntries(value, category));
    if (value.trim()) {
      setSearchParams({ q: value }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setResults(searchEntries(query, cat));
  };

  const handleResultClick = (entry: SearchEntry) => {
    if (entry.requiresAuth && !user) {
      navigate(`/login?redirect=${encodeURIComponent(entry.path)}`);
    } else if (entry.requiresPaid && tier !== "paid") {
      if (user) {
        navigate(entry.path);
      } else {
        navigate(`/login?redirect=${encodeURIComponent(entry.path)}`);
      }
    } else {
      navigate(entry.path);
    }
  };

  const hasQuery = query.trim().length > 0;

  return (
    <Layout>
      <div
        style={{
          minHeight: "100vh",
          background: colors.background,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Hero / Search Bar */}
        <section
          style={{
            background: colors.primary,
            padding: mobile ? "48px 20px 36px" : "64px 80px 48px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h1
              style={{
                margin: "0 0 8px",
                fontSize: mobile ? "28px" : "42px",
                fontWeight: 300,
                color: colors.white,
                letterSpacing: "-1px",
                lineHeight: 1.1,
              }}
            >
              Search <span style={{ fontWeight: 700 }}>BRIDGE</span>
            </h1>
            <p
              style={{
                margin: "0 0 28px",
                fontSize: mobile ? "14px" : "16px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.6,
              }}
            >
              Find pages, sectors, reports, and intelligence across the site.
            </p>

            {/* Search Input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 14,
                padding: mobile ? "10px 14px" : "12px 20px",
              }}
            >
              <SearchIcon
                size={20}
                color="rgba(255,255,255,0.45)"
                style={{ flexShrink: 0 }}
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search pages, sectors, reports..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: colors.white,
                  fontSize: mobile ? "16px" : "18px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                }}
              />
              {hasQuery && (
                <button
                  onClick={() => handleSearch("")}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    borderRadius: 8,
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <X size={14} color="rgba(255,255,255,0.6)" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Category Filter + Results */}
        <section
          style={{
            padding: mobile ? "24px 20px 64px" : "32px 80px 80px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Category Pills */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = category === cat;
                const count =
                  cat === "All"
                    ? results.length
                    : results.filter((r) => r.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      borderRadius: 100,
                      border: `1px solid ${isActive ? colors.primary : colors.line}`,
                      background: isActive ? colors.primary : colors.white,
                      color: isActive ? colors.white : "#6B7280",
                      fontSize: "13px",
                      fontWeight: isActive ? 700 : 500,
                      fontFamily: "'Inter', sans-serif",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {cat !== "All" && categoryIcons[cat]}
                    {cat}
                    {hasQuery && (
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          opacity: 0.6,
                        }}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Results Count */}
            {hasQuery && (
              <p
                style={{
                  margin: "0 0 20px",
                  fontSize: "14px",
                  color: "#6B7280",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {results.length} result{results.length !== 1 ? "s" : ""} for "
                {query}"
              </p>
            )}

            {/* Results List */}
            {results.length === 0 && hasQuery ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "64px 20px",
                  color: "#6B7280",
                }}
              >
                <SearchIcon
                  size={48}
                  color={colors.line}
                  style={{ marginBottom: 16 }}
                />
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  No results found
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.6,
                    maxWidth: 400,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Try different keywords, or browse by category above.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {results
                  .filter(
                    (r) => category === "All" || r.category === category
                  )
                  .map((entry) => (
                    <button
                      key={entry.path}
                      onClick={() => handleResultClick(entry)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: mobile ? 12 : 16,
                        padding: mobile ? "16px 0" : "20px 0",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${colors.line}`,
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(27,77,62,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                      }}
                    >
                      {/* Icon */}
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: "rgba(27,77,62,0.06)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        {categoryIcons[entry.category] || (
                          <Globe size={14} color={colors.primary} />
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 4,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontSize: mobile ? "15px" : "16px",
                              fontWeight: 600,
                              color: "#111827",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            {entry.title}
                          </span>
                          {(entry.requiresAuth || entry.requiresPaid) && (
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 3,
                                fontSize: "10px",
                                fontWeight: 700,
                                color: colors.primary,
                                background: "rgba(27,77,62,0.08)",
                                padding: "2px 8px",
                                borderRadius: 20,
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              <Lock size={9} />
                              {entry.requiresPaid
                                ? "Paid"
                                : "Sign In"}
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: mobile ? "13px" : "14px",
                            color: "#6B7280",
                            lineHeight: 1.5,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {entry.description}
                        </p>
                        <span
                          style={{
                            display: "inline-block",
                            marginTop: 6,
                            fontSize: "11px",
                            fontWeight: 600,
                            color: colors.primary,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {entry.category}
                        </span>
                      </div>

                      {/* Arrow */}
                      <ArrowUpRight
                        size={16}
                        color="#9CA3AF"
                        style={{ flexShrink: 0, marginTop: 4 }}
                      />
                    </button>
                  ))}
              </div>
            )}

            {/* Browse All (when no query) */}
            {!hasQuery && (
              <p
                style={{
                  margin: "24px 0 0",
                  fontSize: "14px",
                  color: "#9CA3AF",
                  fontFamily: "'Inter', sans-serif",
                  textAlign: "center",
                }}
              >
                Type a keyword above to search, or browse categories.
              </p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
