import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── Design System ───────────────────────────────────────────────────────────
const colors = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
};
const CONTENT_MAX_WIDTH = "1200px";

// ─── Nav Helper ──────────────────────────────────────────────────────────────
const navHref = (item: string) =>
  item === "Home" ? "/" :
  item === "About" ? "/about" :
  item === "Services" || item === "Sectors" ? "/services" : "#";

// ─── Footer Sector Icons (same as other pages) ───────────────────────────────
const footerSectorIcons = [
  { key: "infra", label: "Infrastructure & Basic Services", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/></svg> },
  { key: "fin", label: "Financial Inclusion", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg> },
  { key: "health", label: "Health Systems", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg> },
  { key: "tech", label: "Technology & Innovation", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg> },
  { key: "edu", label: "Education & Skills", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg> },
  { key: "agri", label: "Agriculture & Value Chains", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg> },
  { key: "creative", label: "Sports & Creative", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg> },
  { key: "housing", label: "Housing & Real Estate", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { key: "tourism", label: "Tourism & Hospitality", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/><path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/><path d="M10 20h4"/><circle cx="16" cy="20" r="2"/><circle cx="8" cy="20" r="2"/></svg> },
  { key: "energy", label: "Energy & Renewables", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"/><path d="m11 7-3 5h4l-3 5"/><line x1="22" x2="22" y1="11" y2="13"/></svg> },
  { key: "mfg", label: "Manufacturing", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg> },
  { key: "transport", label: "Transportation", icon: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg> },
];

const sectorRoutes: Record<string, string> = {
  infra: "/sectors/infrastructure", fin: "/sectors/financial", health: "/sectors/health",
  tech: "/sectors/technology", edu: "/sectors/education", agri: "/sectors/agriculture",
  creative: "/sectors/sports", housing: "/sectors/housing", tourism: "/sectors/tourism",
  energy: "/sectors/energy", mfg: "/sectors/manufacturing", transport: "/sectors/transport",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Evidence First",
    description: "Every recommendation is grounded in rigorous data. We diagnose root causes before proposing solutions — never the reverse.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Ghana-Led",
    description: "Solutions are shaped by Ghanaians for Ghanaians. Local knowledge, local leadership, local ownership — from conception to implementation.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.8" strokeLinecap="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: "Systems Thinking",
    description: "We address root causes, not symptoms. Our integrated approach connects research, capital, and partnerships to create lasting change.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Accountable Impact",
    description: "We measure what matters. Transparent reporting, rigorous M&E, and a commitment to outcomes over outputs in every initiative we run.",
  },
];

const team = [
  {
    name: "Kwame Mensah",
    title: "Founder & CEO",
    bio: "20+ years in development finance across Sub-Saharan Africa. Former DFI executive with expertise in blended finance and public-private partnerships.",
    initials: "KM",
  },
  {
    name: "Abena Osei",
    title: "Chief Research Officer",
    bio: "PhD in Development Economics. Led sector analysis programs for major multilateral institutions across 8 African markets.",
    initials: "AO",
  },
  {
    name: "Kofi Asante",
    title: "Head of Ventures",
    bio: "Serial entrepreneur and impact investor. Built and scaled 4 sector-specific enterprises in Ghana over the past decade.",
    initials: "KA",
  },
  {
    name: "Akosua Darko",
    title: "Director of Partnerships",
    bio: "Former diplomat and policy advisor. Expert in government relations, multi-stakeholder coordination, and development partner alignment.",
    initials: "AD",
  },
];

const timeline = [
  { year: "2020", title: "Founded", desc: "BRIDGE was established with a singular mandate: create a systematic, evidence-based approach to Ghana's most persistent development challenges." },
  { year: "2021", title: "Research Phase", desc: "Completed comprehensive sector analyses across 12 key industries, producing over 84,000 words of foundational research and identifying 174+ investable solutions." },
  { year: "2022", title: "Framework Development", desc: "Developed the BRIDGE Impact Score™ and PRECEDE-PROCEED methodology — a rigorous system for evaluating and prioritising interventions." },
  { year: "2023", title: "First Ventures", desc: "Launched pilot initiatives in agriculture and financial inclusion, establishing proof-of-concept for the integrated BRIDGE model." },
  { year: "2024", title: "Scale & Partnerships", desc: "Expanded to all 12 sectors, built a network of 50+ local partners, and structured a $135–259M blended finance portfolio." },
  { year: "2025+", title: "Systems Change", desc: "Moving from individual solutions to systemic transformation — embedding BRIDGE-designed institutions into Ghana's development infrastructure." },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const isMobile = useIsMobile();
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [footerSectorHovered, setFooterSectorHovered] = useState<number | null>(null);
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoColor = logoHovered ? colors.accent : colors.dark;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.background, fontFamily: "'DM Sans', Inter, sans-serif" }}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: isScrolled ? "rgba(255,255,255,0.97)" : colors.white,
          borderBottom: `1px solid ${isScrolled ? colors.line : "transparent"}`,
          transition: "all 0.3s ease",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
            padding: isMobile ? "0 20px" : "0 40px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <svg viewBox="0 0 3434.33 932.3" height="32" style={{ display: "block" }}>
              <path fill={colors.accent} d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
              <path fill={logoColor} d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z" />
              <path fill={logoColor} stroke={logoColor} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z" />
              <path fill={logoColor} stroke={logoColor} strokeWidth="0.5" strokeMiterlimit="10" d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z" />
              <rect fill={colors.accent} x="1427.38" y="17.35" width="205.2" height="145" />
              <rect fill={logoColor} x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
              <path fill={logoColor} d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z" />
              <rect fill={logoColor} x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
              <rect fill={colors.accent} x="3083.41" y="339.47" width="175.12" height="257.67" />
              <rect fill={colors.accent} x="3083.41" y="654.42" width="175.12" height="257.67" />
              <circle fill="none" stroke={colors.dark} strokeWidth="5" strokeMiterlimit="10" cx="3385.56" cy="866.94" r="46.27" />
              <path fill={colors.dark} d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13h0ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13h0Z" />
              <rect fill="none" stroke={logoColor} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55" />
              <polygon fill={colors.accent} stroke={logoColor} strokeMiterlimit="10" points="722.6 322.2 462.3 452.9 202 322.8 461.3 192.6 722.6 322.2" />
              <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1l.1-.1Z" />
              <path fill={colors.accent} d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z" />
            </svg>
          </a>

          {/* Desktop Nav */}
          {!isMobile && (
            <nav style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "32px", alignItems: "center" }}>
              {["About", "Sectors", "Services", "Insights", "Contact"].map((item, i) => (
                <a
                  key={item}
                  href={navHref(item)}
                  onMouseEnter={() => setHoveredNav(i)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    color: item === "About" ? colors.primary : hoveredNav === i ? colors.primary : colors.dark,
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: item === "About" ? "700" : "500",
                    letterSpacing: "0.3px",
                    transition: "color 0.2s ease",
                    borderBottom: item === "About" ? `2px solid ${colors.accent}` : "2px solid transparent",
                    paddingBottom: "2px",
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>
          )}

          {/* Right Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <a href="#" style={{ width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.dark} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </a>
            {!isMobile && (
              <a href="#" style={{ width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.dark} strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </a>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.dark} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.dark} strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 998, backgroundColor: colors.primary, padding: "88px 32px 40px", display: "flex", flexDirection: "column" }}>
          <button onClick={() => setMobileMenuOpen(false)} style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", cursor: "pointer", padding: "8px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <nav style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {["About", "Sectors", "Services", "Insights", "Contact"].map((item) => (
              <a key={item} href={navHref(item)} onClick={() => setMobileMenuOpen(false)} style={{ color: item === "About" ? colors.accent : "rgba(255,255,255,0.85)", fontSize: "24px", fontWeight: "600", textDecoration: "none", padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {item}
              </a>
            ))}
          </nav>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginTop: "32px" }}>© 2026 BRIDGE PBC</div>
        </div>
      )}

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main style={{ paddingTop: "72px" }}>

        {/* Hero */}
        <section style={{ backgroundColor: colors.primary, padding: isMobile ? "64px 24px 72px" : "80px 40px 100px", textAlign: "center" }}>
          <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
            <div style={{ display: "inline-block", backgroundColor: "rgba(184,217,53,0.15)", border: "1px solid rgba(184,217,53,0.3)", borderRadius: "2rem", padding: "6px 18px", marginBottom: "24px" }}>
              <span style={{ color: colors.accent, fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase" }}>About BRIDGE</span>
            </div>
            <h1 style={{ color: colors.white, fontSize: isMobile ? "36px" : "60px", fontWeight: "800", lineHeight: 1.1, marginBottom: "24px", letterSpacing: "-1px" }}>
              Building the Bridge Between<br />
              <span style={{ color: colors.accent }}>Research and Reality</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: isMobile ? "16px" : "20px", lineHeight: 1.7, maxWidth: "700px", margin: "0 auto 40px" }}>
              BRIDGE is a development intermediary dedicated to Ghana's economic transformation. We connect evidence-based research, catalytic capital, and strategic partnerships to address the root causes of systemic poverty.
            </p>
            <div style={{ display: "flex", gap: isMobile ? "12px" : "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/services" style={{ backgroundColor: colors.accent, color: colors.primary, padding: "14px 32px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "15px", display: "inline-block" }}>Our Services</a>
              <a href="#mission" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: colors.white, padding: "14px 32px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "15px", border: "1px solid rgba(255,255,255,0.2)", display: "inline-block" }}>Our Mission</a>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{ backgroundColor: colors.white, borderBottom: `1px solid ${colors.line}` }}>
          <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", padding: isMobile ? "32px 24px" : "40px 40px", display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "32px" }}>
            {[
              { value: "12", label: "Sectors Covered" },
              { value: "174+", label: "Solutions Identified" },
              { value: "$259M", label: "Portfolio Potential" },
              { value: "50+", label: "Local Partners" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: isMobile ? "32px" : "42px", fontWeight: "800", color: colors.primary, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "6px", fontWeight: "500" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" style={{ padding: isMobile ? "64px 24px" : "96px 40px", backgroundColor: colors.background }}>
          <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "32px" }}>
              {/* Mission */}
              <div style={{ backgroundColor: colors.white, borderRadius: "16px", padding: isMobile ? "36px 28px" : "48px 40px", border: `1px solid ${colors.line}` }}>
                <div style={{ width: "48px", height: "48px", backgroundColor: "rgba(27,77,62,0.08)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>
                  </svg>
                </div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: colors.accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>Our Mission</div>
                <h2 style={{ fontSize: "24px", fontWeight: "800", color: colors.primary, marginBottom: "16px", lineHeight: 1.2 }}>Systemic transformation, not incremental improvement</h2>
                <p style={{ fontSize: "16px", color: "#4a5568", lineHeight: 1.8 }}>
                  BRIDGE exists to transform Ghana's development landscape by creating a replicable model for evidence-based, locally-owned economic transformation. We mobilise capital, knowledge, and institutional capacity at the scale required to address root causes — not symptoms — of persistent poverty across 12 critical sectors.
                </p>
              </div>

              {/* Vision */}
              <div style={{ backgroundColor: colors.primary, borderRadius: "16px", padding: isMobile ? "36px 28px" : "48px 40px" }}>
                <div style={{ width: "48px", height: "48px", backgroundColor: "rgba(184,217,53,0.15)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.8" strokeLinecap="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: colors.accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>Our Vision</div>
                <h2 style={{ fontSize: "24px", fontWeight: "800", color: colors.white, marginBottom: "16px", lineHeight: 1.2 }}>A Ghana where every sector functions at its full potential</h2>
                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                  We envision a Ghana in which no person is held back by broken systems. Where healthcare is accessible, education is effective, infrastructure is reliable, and economic opportunity is distributed — not concentrated. BRIDGE is building the institutional architecture to make that vision concrete, measurable, and permanent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: isMobile ? "64px 24px" : "96px 40px", backgroundColor: colors.white }}>
          <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: colors.accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>How We Work</div>
              <h2 style={{ fontSize: isMobile ? "28px" : "40px", fontWeight: "800", color: colors.primary, lineHeight: 1.1 }}>Principles that guide every decision</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "24px" }}>
              {values.map((v, i) => (
                <div
                  key={v.title}
                  onMouseEnter={() => setHoveredValue(i)}
                  onMouseLeave={() => setHoveredValue(null)}
                  style={{
                    padding: "36px 32px",
                    borderRadius: "16px",
                    border: `1px solid ${hoveredValue === i ? colors.accent : colors.line}`,
                    backgroundColor: hoveredValue === i ? "rgba(27,77,62,0.02)" : colors.background,
                    transition: "all 0.25s ease",
                    cursor: "default",
                  }}
                >
                  <div style={{ marginBottom: "16px" }}>{v.icon}</div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: colors.primary, marginBottom: "10px" }}>{v.title}</h3>
                  <p style={{ fontSize: "15px", color: "#4a5568", lineHeight: 1.75 }}>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story / Timeline */}
        <section style={{ padding: isMobile ? "64px 24px" : "96px 40px", backgroundColor: colors.background }}>
          <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
            <div style={{ marginBottom: "56px" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: colors.accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>Our Story</div>
              <h2 style={{ fontSize: isMobile ? "28px" : "40px", fontWeight: "800", color: colors.primary, lineHeight: 1.1, maxWidth: "560px" }}>From observation to action — a deliberate journey</h2>
            </div>
            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              {!isMobile && (
                <div style={{ position: "absolute", left: "100px", top: 0, bottom: 0, width: "2px", backgroundColor: colors.line }} />
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                {timeline.map((item, i) => (
                  <div
                    key={item.year}
                    style={{
                      display: "flex",
                      gap: isMobile ? "20px" : "0",
                      alignItems: "flex-start",
                      paddingBottom: i < timeline.length - 1 ? "40px" : "0",
                      position: "relative",
                    }}
                  >
                    {/* Year */}
                    <div style={{ width: isMobile ? "auto" : "100px", flexShrink: 0 }}>
                      <div style={{ fontSize: "13px", fontWeight: "800", color: colors.accent, letterSpacing: "0.5px" }}>{item.year}</div>
                    </div>
                    {/* Dot */}
                    {!isMobile && (
                      <div style={{ position: "absolute", left: "92px", top: "4px", width: "18px", height: "18px", borderRadius: "50%", backgroundColor: colors.white, border: `3px solid ${colors.primary}`, flexShrink: 0, zIndex: 1 }} />
                    )}
                    {/* Content */}
                    <div style={{ flex: 1, paddingLeft: isMobile ? "0" : "48px" }}>
                      <div style={{ fontSize: "17px", fontWeight: "700", color: colors.primary, marginBottom: "8px" }}>{item.title}</div>
                      <p style={{ fontSize: "15px", color: "#4a5568", lineHeight: 1.75 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section style={{ padding: isMobile ? "64px 24px" : "96px 40px", backgroundColor: colors.white }}>
          <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: colors.accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>Leadership</div>
              <h2 style={{ fontSize: isMobile ? "28px" : "40px", fontWeight: "800", color: colors.primary, lineHeight: 1.1 }}>The people behind BRIDGE</h2>
              <p style={{ fontSize: "16px", color: "#6b7280", marginTop: "16px", maxWidth: "520px", margin: "16px auto 0", lineHeight: 1.7 }}>A team of practitioners, researchers, and builders united by a commitment to Ghana's transformation.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "24px" }}>
              {team.map((member, i) => (
                <div
                  key={member.name}
                  onMouseEnter={() => setHoveredTeam(i)}
                  onMouseLeave={() => setHoveredTeam(null)}
                  style={{
                    display: "flex",
                    gap: "24px",
                    alignItems: "flex-start",
                    padding: "32px",
                    borderRadius: "16px",
                    border: `1px solid ${hoveredTeam === i ? colors.primary : colors.line}`,
                    backgroundColor: hoveredTeam === i ? "rgba(27,77,62,0.02)" : colors.background,
                    transition: "all 0.25s ease",
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: colors.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "16px",
                    fontWeight: "700",
                    color: colors.accent,
                    letterSpacing: "1px",
                  }}>
                    {member.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: "17px", fontWeight: "700", color: colors.primary }}>{member.name}</div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: colors.accent, marginBottom: "10px", letterSpacing: "0.3px" }}>{member.title}</div>
                    <p style={{ fontSize: "14px", color: "#4a5568", lineHeight: 1.7 }}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: colors.primary, padding: isMobile ? "64px 24px" : "96px 40px", textAlign: "center" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <h2 style={{ color: colors.white, fontSize: isMobile ? "28px" : "40px", fontWeight: "800", lineHeight: 1.15, marginBottom: "20px" }}>
              Ready to build something that lasts?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "17px", lineHeight: 1.7, marginBottom: "36px" }}>
              Whether you're an investor, policy maker, entrepreneur, or partner — there's a role for you in BRIDGE's work.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/services" style={{ backgroundColor: colors.accent, color: colors.primary, padding: "14px 32px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "15px" }}>Explore Our Services</a>
              <a href="#" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: colors.white, padding: "14px 32px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "15px", border: "1px solid rgba(255,255,255,0.2)" }}>Get in Touch</a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: colors.dark, paddingTop: "60px" }}>
        <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", padding: isMobile ? "0 24px 40px" : "0 40px 40px" }}>
          {!isMobile && (
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "48px", paddingBottom: "48px", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
              {/* Brand */}
              <div>
                <a href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "20px" }}>
                  <svg viewBox="0 0 3434.33 932.3" height="28" style={{ display: "block" }}>
                    <path fill={colors.accent} d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
                    <path fill={colors.white} d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z" />
                    <path fill={colors.white} stroke={colors.white} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z" />
                    <rect fill={colors.accent} x="1427.38" y="17.35" width="205.2" height="145" />
                    <rect fill={colors.white} x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
                    <path fill={colors.white} d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z" />
                    <rect fill={colors.white} x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
                    <rect fill={colors.accent} x="3083.41" y="339.47" width="175.12" height="257.67" />
                    <rect fill={colors.accent} x="3083.41" y="654.42" width="175.12" height="257.67" />
                    <circle fill="none" stroke={colors.white} strokeWidth="5" strokeMiterlimit="10" cx="3385.56" cy="866.94" r="46.27" />
                    <rect fill="none" stroke={colors.white} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6" />
                    <polygon fill={colors.accent} stroke={colors.white} strokeMiterlimit="10" points="722.6 322.2 462.3 452.9 202 322.8 461.3 192.6 722.6 322.2" />
                    <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1l.1-.1Z" />
                    <path fill={colors.accent} d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z" />
                  </svg>
                </a>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: "260px" }}>
                  A development intermediary building Ghana's economic future through research, ventures, and strategic partnerships.
                </p>
              </div>
              {/* Links */}
              <div>
                <h4 style={{ fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "20px" }}>Company</h4>
                {["About", "Services", "Sectors", "Insights"].map((l) => (
                  <a key={l} href={navHref(l)} style={{ display: "block", fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "14px" }}>{l}</a>
                ))}
              </div>
              <div>
                <h4 style={{ fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "20px" }}>Sectors</h4>
                {["Agriculture", "Energy", "Health", "Education", "Technology"].map((l) => (
                  <a key={l} href={`/sectors/${l.toLowerCase()}`} style={{ display: "block", fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "14px" }}>{l}</a>
                ))}
              </div>
              <div>
                <h4 style={{ fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "20px" }}>Insights</h4>
                {["Insights & Analysis", "Sector Briefs", "Policy Updates", "Annual Review"].map((l) => (
                  <a key={l} href="#" style={{ display: "block", fontSize: "14px", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "14px" }}>{l}</a>
                ))}
              </div>
            </div>
          )}

          {/* Sector icons */}
          <div style={{ marginBottom: "40px", marginTop: isMobile ? "0" : "40px" }}>
            <div style={{ fontSize: "12px", fontWeight: "600", color: footerSectorHovered !== null ? colors.accent : "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px", transition: "color 0.25s ease" }}>
              {footerSectorHovered !== null ? footerSectorIcons[footerSectorHovered].label : "Explore 12 Sectors"}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {footerSectorIcons.map((sector, i) => {
                const isH = footerSectorHovered === i;
                return (
                  <a
                    key={sector.key}
                    href={sectorRoutes[sector.key] ?? "#"}
                    title={sector.label}
                    onMouseEnter={() => setFooterSectorHovered(i)}
                    onMouseLeave={() => setFooterSectorHovered(null)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "44px", height: "44px", borderRadius: "10px",
                      backgroundColor: isH ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isH ? "rgba(184,217,53,0.35)" : "rgba(255,255,255,0.07)"}`,
                      cursor: "pointer", textDecoration: "none",
                      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: isH ? "translateY(-2px)" : "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <div style={{ opacity: isH ? 1 : 0.5, transition: "opacity 0.25s ease", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {sector.icon(isH ? colors.accent : "rgba(255,255,255,0.85)")}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ padding: isMobile ? "16px 20px" : "20px 80px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>© 2026 BRIDGE PBC</span>
          <div style={{ display: "flex", gap: isMobile ? "12px" : "20px" }}>
            {["Terms", "Privacy", "Accessibility"].map((link) => (
              <a key={link} href="#" style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
