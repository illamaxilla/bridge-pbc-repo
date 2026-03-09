import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeaderMinimal";
import SiteFooter from "@/components/SiteFooter";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

// ═══════════════════════════════════════════════
// BRIDGE Design System
// ═══════════════════════════════════════════════
const colors = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
};

const CONTENT_MAX_WIDTH = "1200px";
const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// BRIDGE 12 Sectors data
const sectorData = [
  {
    sector: "Infrastructure",
    fullName: "Infrastructure & Basic Services",
    capitalLow: 8,
    capitalHigh: 15,
    ventures: 15,
    gap: "32M+ underserved",
    market: "$1.9B in losses",
    pathways: "15+ solutions",
  },
  {
    sector: "Financial",
    fullName: "Financial Inclusion & Economic Security",
    capitalLow: 10,
    capitalHigh: 20,
    ventures: 18,
    gap: "$4-6B credit gap",
    market: "2.5M SMEs blocked",
    pathways: "18+ solutions",
  },
  {
    sector: "Health",
    fullName: "Health Systems & Wellbeing",
    capitalLow: 8,
    capitalHigh: 16,
    ventures: 15,
    gap: "1:6,000 doctor ratio",
    market: "56% of MDs abroad",
    pathways: "15+ solutions",
  },
  {
    sector: "Technology",
    fullName: "Technology & Innovation",
    capitalLow: 8,
    capitalHigh: 15,
    ventures: 15,
    gap: "Digital divide",
    market: "57 fintechs at <10%",
    pathways: "15+ solutions",
  },
  {
    sector: "Education",
    fullName: "Education & Skills",
    capitalLow: 16.5,
    capitalHigh: 33.5,
    ventures: 15,
    gap: "65% untrained SMEs",
    market: "Skills mismatch",
    pathways: "15+ solutions",
  },
  {
    sector: "Agriculture",
    fullName: "Agriculture & Value Chains",
    capitalLow: 12,
    capitalHigh: 22,
    ventures: 18,
    gap: "40% crop loss",
    market: "$900M cold chain",
    pathways: "18+ solutions",
  },
  {
    sector: "Creative",
    fullName: "Sports, Entertainment & Creative",
    capitalLow: 10,
    capitalHigh: 20.5,
    ventures: 14,
    gap: "Informal dominance",
    market: "IP unprotected",
    pathways: "14 solutions",
  },
  {
    sector: "Housing",
    fullName: "Housing & Real Estate",
    capitalLow: 15,
    capitalHigh: 25,
    ventures: 11,
    gap: "1.8M unit deficit",
    market: "2% land titled",
    pathways: "11 solutions",
  },
  {
    sector: "Tourism",
    fullName: "Tourism & Hospitality",
    capitalLow: 10,
    capitalHigh: 18,
    ventures: 13,
    gap: "Infra gaps",
    market: "Seasonal volatility",
    pathways: "13 solutions",
  },
  {
    sector: "Energy",
    fullName: "Energy & Renewable Resources",
    capitalLow: 12,
    capitalHigh: 22,
    ventures: 14,
    gap: "32% energy lost",
    market: "Access gaps",
    pathways: "14 solutions",
  },
  {
    sector: "Manufacturing",
    fullName: "Manufacturing & Light Industry",
    capitalLow: 15,
    capitalHigh: 30,
    ventures: 14,
    gap: "Underutilized",
    market: "Processing gaps",
    pathways: "14 solutions",
  },
  {
    sector: "Transport",
    fullName: "Transportation & Logistics",
    capitalLow: 10,
    capitalHigh: 22,
    ventures: 14,
    gap: "97% road-dependent",
    market: "$1.9B spoilage",
    pathways: "14 solutions",
  },
];

// ═══════════════════════════════════════════════
// Utility Components
// ═══════════════════════════════════════════════

// Animated counter hook
function useCounter(target, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return count;
}

// Animated progress ring
function ProgressRing({ progress, size = 64, strokeWidth = 5, color, bgColor }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 400);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (animatedProgress / 100) * circumference}
        style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)" }}
      />
    </svg>
  );
}

// Animated progress bar
function ProgressBar({ pct, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => setWidth(pct), 100 + delay);
    return () => clearTimeout(timeout);
  }, [pct, delay]);

  return (
    <div
      style={{
        height: "100%",
        width: `${width}%`,
        backgroundColor: "#1B4D3E",
        borderRadius: "3px",
        transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    />
  );
}
// ═══════════════════════════════════════════════
// Social Icons (exact SVGs from production)
const socialIcons = [
  <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>,
  <svg key="tw" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>,
  <svg key="fb" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>,
];

// Footer Sector Icons (exact from production)
const footerSectorIcons = [
  {
    key: "infra",
    label: "Infrastructure & Basic Services",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
      </svg>
    ),
  },
  {
    key: "fin",
    label: "Financial Inclusion",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    ),
  },
  {
    key: "health",
    label: "Health Systems",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
      </svg>
    ),
  },
  {
    key: "tech",
    label: "Technology & Innovation",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
      </svg>
    ),
  },
  {
    key: "edu",
    label: "Education & Skills",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    ),
  },
  {
    key: "agri",
    label: "Agriculture & Value Chains",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
      </svg>
    ),
  },
  {
    key: "creative",
    label: "Sports & Creative",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    key: "housing",
    label: "Housing & Real Estate",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    key: "tourism",
    label: "Tourism & Hospitality",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
        <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
        <path d="M10 20h4" />
        <circle cx="16" cy="20" r="2" />
        <circle cx="8" cy="20" r="2" />
      </svg>
    ),
  },
  {
    key: "energy",
    label: "Energy & Renewables",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
        <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
        <path d="m11 7-3 5h4l-3 5" />
        <line x1="22" x2="22" y1="11" y2="13" />
      </svg>
    ),
  },
  {
    key: "mfg",
    label: "Manufacturing",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M17 18h1M12 18h1M7 18h1" />
      </svg>
    ),
  },
  {
    key: "transport",
    label: "Transportation",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    ),
  },
];

// SectorGrid Component (desktop only, exact production spec)
const SectorGrid = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: "600",
          color: hovered !== null ? colors.accent : "rgba(255,255,255,0.4)",
          fontFamily: "'DM Sans', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          marginBottom: "12px",
          transition: "color 0.25s ease",
          lineHeight: "1",
          minHeight: "12px",
        }}
      >
        {hovered !== null ? footerSectorIcons[hovered].label : "Explore 12 Sectors"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {footerSectorIcons.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href={sectorRoutes[sector.key] ?? "#"}
              title={sector.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: isH ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isH ? "rgba(184,217,53,0.35)" : "rgba(255,255,255,0.07)"}`,
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isH ? "translateY(-2px)" : "none",
                boxShadow: isH ? "0 6px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(184,217,53,0.15)" : "none",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  opacity: isH ? 1 : 0.5,
                  transition: "opacity 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {sector.icon(isH ? colors.accent : "rgba(255,255,255,0.85)")}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

function BridgeLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
      <svg viewBox="0 0 4113.9 932.3" height="36" style={{ display: "block" }}>
        <path
          fill={colors.dark}
          d="M3355.1,655.6h31.2v5.7h-31.2v-5.7ZM3355.1,667h31.2v11.1h-31.2v-11.1ZM3355.1,683.9h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.9h31.2v11.1h-31.2v-11.1ZM3355.1,801.8h31.2v11.1h-31.2v-11.1ZM3355.1,818.6h31.2v11.1h-31.2v-11.1ZM3355.1,835.5h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.6h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,667h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.8h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.6h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.6,683.9h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.9h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.2h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
        />
        <path
          fill={colors.dark}
          d="M3572.3,655.6h31.2v5.7h-31.2v-5.7ZM3572.3,667h31.2v11.1h-31.2v-11.1ZM3572.3,683.9h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.9h31.2v11.1h-31.2v-11.1ZM3572.3,801.8h31.2v11.1h-31.2v-11.1ZM3572.3,818.6h31.2v11.1h-31.2v-11.1ZM3572.3,835.5h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.6h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,667h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,689h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4l.1.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.9h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1,0ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.9h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.8h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.5h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.6h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z"
        />
        <path
          fill={colors.dark}
          d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.9h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.8h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.6h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.5h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.9h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.3,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.2c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,667h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.2c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.7,683.9h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z"
        />
        <path
          fill={colors.dark}
          d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
        />
        <path
          fill={colors.dark}
          stroke={colors.dark}
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
        />
        <path
          fill={colors.dark}
          stroke={colors.dark}
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
        />
        <rect fill={colors.accent} x="1427.4" y="17.4" width="205.2" height="145" />
        <rect fill={colors.dark} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
        <path
          fill={colors.dark}
          d="M2757.4,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
        />
        <rect fill={colors.dark} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
        <rect fill={colors.accent} x="3083.5" y="339.5" width="175.1" height="257.7" />
        <rect fill={colors.accent} x="3083.5" y="654.5" width="175.1" height="257.7" />
        <circle
          fill="none"
          stroke={colors.dark}
          strokeWidth="5"
          strokeMiterlimit="10"
          cx="4078.6"
          cy="661.3"
          r="32.8"
        />
        <path
          fill={colors.dark}
          d="M4092.2,677.1l-7.3-10.4c.2,0,.3,0,.4-.2,2-.9,3.6-2.1,4.6-3.8s1.6-3.6,1.6-6.1c0-3.6-1.2-6.3-3.6-8.4s-5.7-3-10-3h-13v31.8h5.9v-9.3h8.5l6.5,9.3h6.4v.1ZM4083.7,651.9c1.3,1.1,2,2.7,2,4.7s-.6,3.6-2,4.7-3.3,1.7-5.9,1.7h-6.9v-12.6h6.9c2.6,0,4.5.5,5.9,1.6h0v-.1Z"
        />
        <rect
          fill="none"
          stroke={colors.dark}
          strokeWidth="80"
          strokeMiterlimit="10"
          x="40"
          y="40"
          width="843.9"
          height="852.3"
          rx="36.6"
          ry="36.6"
        />
        <polygon
          fill={colors.accent}
          stroke={colors.dark}
          strokeMiterlimit="10"
          points="722.6 322.2 462.3 452.9 202 322.8 461.3 192.6 722.6 322.2"
        />
        <path
          fill="#74914a"
          d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1l.1-.1Z"
        />
        <path
          fill={colors.accent}
          d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"
        />
      </svg>
    </div>
  );
}

// ─── Sector routes ──────────────────────────────────────────────────────────
const sectorRoutes: Record<string, string> = {
  infra: "/sectors/infrastructure",
  fin: "/sectors/financial",
  health: "/sectors/health",
  tech: "/sectors/technology",
  edu: "/sectors/education",
  agri: "/sectors/agriculture",
  creative: "/sectors/sports",
  housing: "/sectors/housing",
  tourism: "/sectors/tourism",
  energy: "/sectors/energy",
  mfg: "/sectors/manufacturing",
  transport: "/sectors/transport",
};

// ═══════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════

export default function BRIDGEHomePage() {
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectorCount = useCounter(12, 1200, 300);
  const ventureCount = useCounter(174, 1800, 600);
  const capitalCount = useCounter(15, 2000, 900);

  const heroSectorIcons = [
    { label: "Infra", color: "#1B4D3E" },
    { label: "Fin", color: "#2D6A4F" },
    { label: "Health", color: "#40916C" },
    { label: "Tech", color: "#52B788" },
    { label: "Edu", color: "#74C69D" },
    { label: "Agri", color: "#95D5B2" },
  ];

  const [activeTab, setActiveTab] = useState("identification");
  const [tabTransition, setTabTransition] = useState(false);
  const [openSector, setOpenSector] = useState(null);
  const [insightIndex, setInsightIndex] = useState(0);
  const [hoveredInsight, setHoveredInsight] = useState(null);
  const [valueIndex, setValueIndex] = useState(0);
  const [contactStep, setContactStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const insights = [
    { category: "White Paper", title: "BRIDGE Foundational Framework: A Systematic Approach to Ghana's Development" },
    { category: "Infrastructure", title: "Infrastructure & Basic Services: Building the Foundation for Growth" },
    { category: "Financial Inclusion", title: "Expanding Access: Financial Systems That Serve Every Ghanaian" },
    { category: "Agriculture", title: "Agriculture & Value Chains: From Farm to Market Excellence" },
    { category: "Technology", title: "Technology & Innovation: Powering Ghana's Digital Future" },
    { category: "Energy", title: "Energy & Renewables: Sustainable Power for a Growing Nation" },
    { category: "Health Systems", title: "Health Systems: Quality Care Within Reach" },
    { category: "Education", title: "Education & Skills: Preparing Ghana's Workforce" },
  ];

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTabTransition(false);
    }, 200);
  };

  const tabContent = {
    identification: {
      text: "We employ an ecological analysis within the value chain to highlight opportunities that can be mobilized to develop the necessary capacities.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.primary}
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <path d="M8 11h6" />
          <path d="M11 8v6" />
        </svg>
      ),
      stats: [
        { label: "Value Chain Analysis", value: "48+" },
        { label: "Foundational Assessments", value: "162+" },
        { label: "Opportunities Identified", value: "340+" },
      ],
      progressItems: [
        { label: "Market Research", pct: 95 },
        { label: "Stakeholder Analysis", pct: 88 },
        { label: "Gap Assessment", pct: 92 },
      ],
    },
    connection: {
      text: "We structure solutions built on proven and best practices to bridge the gap between capacity, resource, and impact.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.primary}
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
      stats: [
        { label: "Ventures Designed", value: "174+" },
        { label: "Impact Analysis Metrics", value: "48+" },
        { label: "Integrated Systems", value: "232+" },
      ],
      progressItems: [
        { label: "Solution Architecture", pct: 90 },
        { label: "Financial Modeling", pct: 85 },
        { label: "Risk Frameworks", pct: 93 },
      ],
    },
    engagement: {
      text: "We form partnerships, initiate investments, deploy resources, and build ventures with measurable outcomes that make an impact.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.primary}
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      stats: [
        { label: "Expected Capital Deployment", value: "$135M+" },
        { label: "Potential Partners", value: "30+" },
        { label: "BRIDGE Directed Initiatives", value: "28+" },
      ],
      progressItems: [
        { label: "Capital Deployment", pct: 72 },
        { label: "Partnership Activation", pct: 68 },
        { label: "Operational Execution", pct: 80 },
      ],
    },
  };

  const current = tabContent[activeTab];
  const tabIndex = ["identification", "connection", "engagement"].indexOf(activeTab);

  return (
    <div style={{ fontFamily: "Helvetica, Arial, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes govScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .stat-card { transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
        .stat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(27, 77, 62, 0.14) !important; }
        .cta-primary { transition: all 0.3s ease; }
        .cta-primary:hover { background-color: #B8D935 !important; color: #1B4D3E !important; transform: translateY(-1px); }
        .cta-btn-arrow { transition: background-color 0.3s ease; }
        .cta-btn-arrow svg { transition: stroke 0.3s ease; }
        .cta-primary:hover .cta-btn-arrow { background-color: rgba(27, 77, 62, 0.15) !important; }
        .cta-primary:hover .cta-btn-arrow svg { stroke: #1B4D3E !important; }
        .cta-secondary { transition: all 0.3s ease; }
        .cta-secondary:hover { border-color: #1B4D3E !important; color: #1B4D3E !important; }
        .sector-dot { transition: transform 0.2s ease; }
        .sector-dot:hover { transform: scale(1.15); z-index: 10; }
        .approach-tab { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .approach-tab:hover { transform: translateY(-2px); }
        .cta-approach { transition: all 0.3s ease; }
        .cta-approach:hover { background-color: #B8D935 !important; color: #1B4D3E !important; transform: translateY(-1px); }
        .cta-approach:hover .cta-arrow { background-color: rgba(27, 77, 62, 0.15) !important; }
        .cta-approach:hover .cta-arrow svg { stroke: #1B4D3E !important; }
        .service-card { perspective: 1000px; cursor: pointer; }
        .service-card-inner { transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; position: relative; width: 100%; height: 100%; }
        .service-card:hover .service-card-inner { transform: rotateY(180deg); }
        .service-card-front, .service-card-back { position: absolute; top: 0; left: 0; right: 0; bottom: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 24px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; }
        .service-card-back { transform: rotateY(180deg); }
        .cta-learn-more { transition: all 0.3s ease; }
        .cta-learn-more:hover { background-color: #B8D935 !important; color: #1B4D3E !important; transform: translateY(-1px); }
        .value-card { transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
        .value-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(27, 77, 62, 0.12); }
        .sector-row { transition: all 0.25s ease; }
        .sector-row:hover { opacity: 0.85; }
        .carousel-nav { transition: all 0.25s ease; }
        .carousel-nav:hover { border-color: #1B4D3E !important; background-color: #1B4D3E !important; }
        .carousel-nav:hover svg { stroke: #FFFFFF !important; }
        .header-icon { transition: all 0.25s ease; cursor: pointer; }
        .header-icon:hover { color: #1B4D3E !important; }
        .header-icon:hover svg { stroke: #1B4D3E !important; }
      `}</style>

      <SiteHeader />

      {/* HERO */}
      <section style={{ backgroundColor: colors.white, padding: isMobile ? "36px 20px 24px" : "60px 48px 40px 48px" }}>
        <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: isMobile ? "24px" : "40px",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "36px" : "56px",
                fontWeight: "300",
                lineHeight: "1.1",
                color: colors.primary,
                margin: 0,
                letterSpacing: "-1px",
                flex: "0 0 auto",
                animation: "fadeUp 0.8s ease-out",
              }}
            >
              <span style={{ fontWeight: "700" }}>Insight.</span> Investment.
              <br />
              <span style={{ fontWeight: "700", color: colors.accent, position: "relative", display: "inline-block" }}>
                Impact.
                <span
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    left: 0,
                    right: 0,
                    height: "4px",
                    backgroundColor: colors.accent,
                    borderRadius: "2px",
                    opacity: 0.3,
                  }}
                />
              </span>
            </h1>
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginBottom: isMobile ? 0 : "8px",
                flex: "0 0 auto",
                animation: "fadeUp 0.8s ease-out 0.2s both",
              }}
            >
              <a href="/services" style={{ textDecoration: "none" }}>
              <button
                className="cta-primary"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  border: "none",
                  padding: isMobile ? "12px 22px" : "16px 28px",
                  fontSize: isMobile ? "13px" : "14px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  borderRadius: "50px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Explore Our Work
                <span
                  className="cta-btn-arrow"
                  style={{
                    width: isMobile ? "24px" : "28px",
                    height: isMobile ? "24px" : "28px",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </button>
              </a>
              <a href="/login" style={{ textDecoration: "none" }}>
                <button
                  className="cta-secondary"
                  style={{
                    backgroundColor: "transparent",
                    color: colors.dark,
                    border: `1.5px solid ${colors.line}`,
                    padding: isMobile ? "12px 22px" : "16px 28px",
                    fontSize: isMobile ? "13px" : "14px",
                    fontWeight: "500",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    borderRadius: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: isMobile ? "auto" : "60px",
                    boxSizing: "border-box",
                  }}
                >
                  Request Access
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section style={{ position: "relative", margin: isMobile ? "0 20px" : "0 48px" }}>
        <div
          style={{
            backgroundColor: colors.background,
            height: isMobile ? "240px" : "560px",
            borderRadius: isMobile ? "16px" : "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#bbb",
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
            overflow: "hidden",
          }}
        >
          [ Hero Image Area ]
        </div>
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: "-90px",
              left: "40px",
              right: "40px",
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr 1fr",
              gap: "20px",
            }}
          >
            {/* Card 1: Sectors */}
            <div
              className="stat-card"
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: colors.white,
                borderRadius: "20px",
                padding: "28px 28px 24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                animation: "fadeUp 0.6s ease-out 0.3s both",
                cursor: "default",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      letterSpacing: "1.5px",
                      color: "#999",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Sectors
                  </div>
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: "700",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "1",
                    }}
                  >
                    {sectorCount}
                  </div>
                </div>
                <div
                  style={{
                    width: "80px",
                    height: "56px",
                    backgroundColor: colors.primary,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    padding: "10px 10px 8px",
                    gap: "4px",
                  }}
                >
                  {[40, 65, 90, 55, 75, 60, 85].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: "6px",
                        height: `${hoveredCard === 0 ? h : h * 0.6}%`,
                        backgroundColor: i === 2 || i === 6 ? colors.accent : "rgba(184,217,53,0.35)",
                        borderRadius: "3px 3px 0 0",
                        transition: `height 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  paddingTop: "12px",
                  borderTop: `1px solid ${colors.line}`,
                }}
              >
                {heroSectorIcons.map((s, i) => (
                  <div
                    key={i}
                    className="sector-dot"
                    title={s.label}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: s.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      color: "white",
                      fontWeight: "700",
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "0.3px",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {s.label.substring(0, 2).toUpperCase()}
                  </div>
                ))}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: `2px dashed ${colors.line}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    color: "#999",
                    fontWeight: "500",
                  }}
                >
                  +6
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: colors.primary,
                      fontSize: "13px",
                      fontWeight: "600",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    Explore
                    <span
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: colors.accent,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="3"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Ventures */}
            <div
              className="stat-card"
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: colors.white,
                borderRadius: "20px",
                padding: "28px 28px 24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                animation: "fadeUp 0.6s ease-out 0.5s both",
                cursor: "default",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        letterSpacing: "1.5px",
                        color: "#999",
                        fontFamily: "Inter, sans-serif",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Ventures
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span
                        style={{
                          fontSize: "48px",
                          fontWeight: "700",
                          color: colors.primary,
                          fontFamily: "Inter, sans-serif",
                          lineHeight: "1",
                        }}
                      >
                        {ventureCount}
                      </span>
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: "400",
                          color: colors.accent,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <ProgressRing
                      progress={hoveredCard === 1 ? 92 : 78}
                      size={56}
                      strokeWidth={5}
                      color={colors.accent}
                      bgColor={colors.background}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%) rotate(0deg)",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="1.8"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  paddingTop: "16px",
                  borderTop: `1px solid ${colors.line}`,
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "40px" }}>
                  {[28, 42, 35, 55, 48, 65, 58, 78, 72, 90, 85, 100].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: "8px",
                        height: `${(hoveredCard === 1 ? h : h * 0.55) * 0.4}px`,
                        borderRadius: "2px",
                        backgroundColor: i >= 10 ? colors.accent : colors.primary,
                        opacity: i < 4 ? 0.3 : i < 8 ? 0.6 : 1,
                        transition: "height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        transitionDelay: `${i * 40}ms`,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    backgroundColor: "#E8F9E8",
                    padding: "4px 10px",
                    borderRadius: "20px",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2.5">
                    <path d="M7 17L17 7" />
                    <path d="M10 7h7v7" />
                  </svg>
                  <span
                    style={{ fontSize: "12px", fontWeight: "700", color: "#2D6A4F", fontFamily: "Inter, sans-serif" }}
                  >
                    Growing
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Unrealized Potential */}
            <div
              className="stat-card"
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: "linear-gradient(135deg, #E8F4EA 0%, #D4EDDA 100%)",
                borderRadius: "20px",
                padding: "28px 28px 24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                animation: "fadeUp 0.6s ease-out 0.7s both",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(27, 77, 62, 0.06)",
                  transition: "transform 0.5s ease",
                  transform: hoveredCard === 2 ? "scale(1.3)" : "scale(1)",
                }}
              />
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        letterSpacing: "1.5px",
                        color: "#666",
                        fontFamily: "Inter, sans-serif",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Unrealized Potential
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "400",
                          color: colors.primary,
                          fontFamily: "Inter, sans-serif",
                          lineHeight: "1",
                        }}
                      >
                        $
                      </span>
                      <span
                        style={{
                          fontSize: "48px",
                          fontWeight: "700",
                          color: colors.primary,
                          fontFamily: "Inter, sans-serif",
                          lineHeight: "1",
                        }}
                      >
                        {capitalCount}
                      </span>
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: "500",
                          color: colors.primary,
                          fontFamily: "Inter, sans-serif",
                          opacity: 0.7,
                        }}
                      >
                        B+
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      backgroundColor: "rgba(27,77,62,0.1)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.primary}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="12" width="4" height="9" rx="1" />
                      <rect x="10" y="7" width="4" height="14" rx="1" />
                      <rect x="17" y="3" width="4" height="18" rx="1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                style={{
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(27,77,62,0.12)",
                  marginTop: "16px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "#666",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Deployment Range
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    $135M–$259M
                  </span>
                </div>
                <div
                  style={{
                    height: "10px",
                    backgroundColor: "rgba(27,77,62,0.1)",
                    borderRadius: "5px",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: hoveredCard === 2 ? "52%" : "42%",
                      height: "100%",
                      backgroundColor: colors.primary,
                      borderRadius: "5px 0 0 5px",
                      transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                  <div
                    style={{
                      width: hoveredCard === 2 ? "28%" : "18%",
                      height: "100%",
                      backgroundColor: colors.accent,
                      borderRadius: "0 5px 5px 0",
                      transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "500",
                      color: "rgba(27,77,62,0.45)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Across 12 sectors
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                      opacity: 0.6,
                    }}
                  >
                    ~1.7% unlocks momentum
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <div style={{ height: isMobile ? "24px" : "130px" }} />

      {/* THE APPROACH */}
      <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 48px" }}>
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
            gap: isMobile ? "40px" : "80px",
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", height: "100%", alignSelf: "stretch" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1.5px",
                color: colors.primary,
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
                marginBottom: "32px",
                alignSelf: "flex-start",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: colors.accent,
                  display: "inline-block",
                }}
              />
              The Approach
            </div>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "30px" : "44px",
                fontWeight: "300",
                lineHeight: "1.2",
                color: colors.primary,
                margin: "0 0 24px 0",
                letterSpacing: "-0.5px",
              }}
            >
              We <span style={{ fontWeight: "700" }}>connect</span> the people, institutions, and resources required to
              create{" "}
              <span style={{ fontWeight: "700", color: colors.accent, position: "relative", display: "inline" }}>
                measurable, lasting impact
              </span>
              .
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.7",
                color: "#666",
                fontFamily: "Inter, sans-serif",
                margin: "0 0 36px 0",
                maxWidth: "420px",
              }}
            >
              BRIDGE works across 12 sectors — linking capital to opportunity, expertise to need, and building the
              connections that turn fragmented potential into shared prosperity.
            </p>
            {!isMobile && (
              <a href="/methodology" style={{ textDecoration: "none" }}>
              <button
                className="cta-approach"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  border: "none",
                  padding: "16px 32px",
                  fontSize: "15px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  borderRadius: "50px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "auto",
                  alignSelf: "flex-start",
                }}
              >
                See How It Works
                <span
                  className="cta-arrow"
                  style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </button>
              </a>
            )}
          </div>

          <div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
              {["identification", "connection", "engagement"].map((tab, i) => (
                <button
                  key={tab}
                  className="approach-tab"
                  onClick={() => handleTabChange(tab)}
                  style={{
                    flex: 1,
                    padding: isMobile ? "12px 10px" : "16px 20px",
                    fontSize: isMobile ? "12px" : "14px",
                    fontWeight: activeTab === tab ? "700" : "500",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "capitalize",
                    cursor: "pointer",
                    borderRadius: "12px",
                    border: activeTab === tab ? `2px solid ${colors.primary}` : `1px solid ${colors.line}`,
                    backgroundColor: activeTab === tab ? "rgba(27, 77, 62, 0.04)" : "transparent",
                    color: activeTab === tab ? colors.primary : "#888",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "6px" : "10px",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: activeTab === tab ? colors.accent : colors.background,
                      color: activeTab === tab ? colors.primary : "#999",
                      fontSize: "11px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Inter, sans-serif",
                      transition: "all 0.3s ease",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  {!isMobile && tab}
                </button>
              ))}
            </div>

            <div
              style={{
                backgroundColor: colors.background,
                borderRadius: "20px",
                padding: isMobile ? "24px 20px" : "32px",
                opacity: tabTransition ? 0 : 1,
                transform: tabTransition ? "translateY(8px)" : "translateY(0)",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", gap: "16px", marginBottom: "28px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: colors.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  {current.icon}
                </div>
                <p
                  style={{
                    fontSize: isMobile ? "14px" : "17px",
                    lineHeight: "1.7",
                    color: colors.dark,
                    fontFamily: "Inter, sans-serif",
                    margin: 0,
                  }}
                >
                  {current.text}
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: isMobile ? "8px" : "16px",
                  marginBottom: "28px",
                }}
              >
                {current.stats.map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: "14px",
                      padding: isMobile ? "14px 10px" : "18px 16px",
                      textAlign: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        fontSize: isMobile ? "20px" : "24px",
                        fontWeight: "700",
                        color: colors.primary,
                        fontFamily: "Inter, sans-serif",
                        lineHeight: "1",
                        marginBottom: "6px",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "9px" : "11px",
                        fontWeight: "600",
                        color: "#999",
                        fontFamily: "Inter, sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {current.progressItems.map((item, i) => (
                  <div
                    key={`${activeTab}-${i}`}
                    style={{ display: "flex", alignItems: "center", gap: isMobile ? "10px" : "14px" }}
                  >
                    <span
                      style={{
                        fontSize: isMobile ? "11px" : "12px",
                        fontWeight: "600",
                        color: "#666",
                        fontFamily: "Inter, sans-serif",
                        minWidth: isMobile ? "100px" : "140px",
                      }}
                    >
                      {item.label}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: "6px",
                        backgroundColor: "rgba(27,77,62,0.08)",
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <ProgressBar pct={item.pct} delay={i * 150} key={`${activeTab}-bar-${i}`} />
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: colors.primary,
                        fontFamily: "Inter, sans-serif",
                        minWidth: "32px",
                        textAlign: "right",
                      }}
                    >
                      {item.pct}%
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(27,77,62,0.06)",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    onClick={() => handleTabChange(["identification", "connection", "engagement"][i])}
                    style={{
                      width: tabIndex === i ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      backgroundColor: tabIndex === i ? colors.primary : tabIndex > i ? colors.accent : colors.line,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: isMobile ? "20px 20px" : "40px 48px" }}>
        <div
          style={{
            backgroundColor: colors.primary,
            borderRadius: isMobile ? "24px" : "32px",
            padding: isMobile ? "48px 0" : "80px 0",
          }}
        >
          <div
            style={{
              maxWidth: CONTENT_MAX_WIDTH,
              margin: "0 auto",
              padding: isMobile ? "0 24px" : "0 80px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "flex-start",
                marginBottom: isMobile ? "32px" : "50px",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "20px" : "0",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    border: "1px solid rgba(255,255,255,0.25)",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "1.5px",
                    color: colors.white,
                    fontFamily: "Inter, sans-serif",
                    textTransform: "uppercase",
                    marginBottom: "24px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: colors.accent,
                      display: "inline-block",
                    }}
                  />
                  Services
                </div>
                <h2
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "28px" : "44px",
                    fontWeight: "300",
                    lineHeight: "1.2",
                    color: colors.white,
                    margin: 0,
                    letterSpacing: "-0.5px",
                    maxWidth: "600px",
                  }}
                >
                  How We <span style={{ fontWeight: "700", color: colors.accent }}>Bridge the Gap</span> from
                  Opportunity to Impact
                </h2>
              </div>
              <a href="/methodology" style={{ textDecoration: "none" }}>
              <button
                className="cta-learn-more"
                style={{
                  backgroundColor: colors.white,
                  color: colors.primary,
                  border: "none",
                  padding: isMobile ? "12px 24px" : "16px 32px",
                  fontSize: isMobile ? "13px" : "15px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  borderRadius: "50px",
                  marginTop: isMobile ? "0" : "60px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
              </a>
            </div>
            <div
              style={
                isMobile
                  ? {
                      display: "flex",
                      gap: "12px",
                      overflowX: "auto",
                      WebkitOverflowScrolling: "touch",
                      scrollSnapType: "x mandatory",
                      paddingBottom: "4px",
                    }
                  : { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }
              }
            >
              {[
                {
                  name: "Research",
                  description: "Deep market analysis and evidence-based diagnostics across all 12 sectors.",
                },
                {
                  name: "Ventures",
                  description: "174+ designed initiatives spanning infrastructure to creative industries.",
                },
                {
                  name: "Investment",
                  description: "$135M–$259M in indicative capital across diversified deployment strategies.",
                },
                {
                  name: "Partnerships",
                  description:
                    "Strategic alliances with government, traditional authorities, and development partners.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="service-card"
                  style={{
                    minHeight: isMobile ? "260px" : "360px",
                    ...(isMobile ? { flex: "0 0 70%", scrollSnapAlign: "start" } : {}),
                  }}
                >
                  <div className="service-card-inner">
                    <div className="service-card-front" style={{ backgroundColor: colors.accent }}>
                      <div style={{ position: "relative", height: isMobile ? "160px" : "200px" }}>
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: isMobile ? "140px" : "180px",
                            height: isMobile ? "140px" : "180px",
                            backgroundColor: "rgba(255,255,255,0.3)",
                            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "30px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: isMobile ? "110px" : "140px",
                            height: isMobile ? "110px" : "140px",
                            backgroundColor: "#D1D5D0",
                            borderRadius: "50%",
                            border: "4px solid rgba(255,255,255,0.5)",
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span
                          style={{
                            fontSize: isMobile ? "15px" : "18px",
                            fontWeight: "600",
                            color: colors.primary,
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {service.name}
                        </span>
                        {isMobile ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={colors.primary}
                            strokeWidth="2.5"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        ) : (
                          <div
                            style={{
                              width: "44px",
                              height: "44px",
                              borderRadius: "50%",
                              backgroundColor: colors.white,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={colors.primary}
                              strokeWidth="2"
                            >
                              <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="service-card-back" style={{ backgroundColor: colors.primary }}>
                      <div>
                        <span
                          style={{
                            fontSize: isMobile ? "48px" : "64px",
                            fontWeight: "800",
                            fontFamily: "Inter, sans-serif",
                            color: "rgba(184, 217, 53, 0.15)",
                            lineHeight: "1",
                            display: "block",
                            marginBottom: "12px",
                          }}
                        >
                          0{index + 1}
                        </span>
                        <h3
                          style={{
                            fontSize: isMobile ? "20px" : "24px",
                            fontWeight: "700",
                            color: colors.white,
                            fontFamily: "Inter, sans-serif",
                            margin: "0 0 12px 0",
                          }}
                        >
                          {service.name}
                        </h3>
                        <p
                          style={{
                            fontSize: isMobile ? "13px" : "15px",
                            lineHeight: "1.7",
                            color: "rgba(255,255,255,0.7)",
                            fontFamily: "Inter, sans-serif",
                            margin: 0,
                          }}
                        >
                          {service.description}
                        </p>
                      </div>
                      {!isMobile && (
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                          <div
                            style={{
                              width: "44px",
                              height: "44px",
                              borderRadius: "50%",
                              backgroundColor: colors.accent,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={colors.primary}
                              strokeWidth="2"
                            >
                              <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 48px" }}>
        <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
          <div style={{ textAlign: isMobile ? "left" : "center", marginBottom: isMobile ? "28px" : "60px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1.5px",
                color: colors.primary,
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: colors.accent,
                  display: "inline-block",
                }}
              />
              Our Values
            </div>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "28px" : "44px",
                fontWeight: "300",
                lineHeight: "1.2",
                color: colors.primary,
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              {isMobile ? (
                <>
                  The <span style={{ fontWeight: "700" }}>Principles</span> &{" "}
                  <span style={{ fontWeight: "700" }}>Foundation</span> Behind Every{" "}
                  <span style={{ fontWeight: "700", color: colors.accent }}>Bridge</span> We Build
                </>
              ) : (
                <>
                  The <span style={{ fontWeight: "700" }}>Principles</span> &{" "}
                  <span style={{ fontWeight: "700" }}>Foundation</span> Behind
                  <br />
                  Every <span style={{ fontWeight: "700", color: colors.accent }}>Bridge</span> We Build
                </>
              )}
            </h2>
          </div>
          {isMobile ? (
            <>
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: `translateX(-${valueIndex * 100}%)`,
                  }}
                >
                  {[
                    {
                      title: "Sustainability",
                      description:
                        "Every initiative is designed to endure beyond its launch — with built-in revenue models, local ownership, and institutional frameworks that ensure long-term viability.",
                      highlighted: false,
                    },
                    {
                      title: "Peoplecentric",
                      description:
                        "The Ghanaian citizen, household, and community are the unit of analysis. Every decision is evaluated against one standard — measurable improvement in people's lives.",
                      highlighted: true,
                    },
                    {
                      title: "Scalability",
                      description:
                        "Solutions are architected to compound, not just solve once. Every initiative is built on frameworks that replicate across sectors, regions, and institutions.",
                      highlighted: false,
                    },
                    {
                      title: "Adaptability",
                      description:
                        "Policy environments evolve, markets fluctuate, and opportunities emerge. Our model absorbs change and recalibrates without compromising strategic direction.",
                      highlighted: false,
                    },
                  ].map((value, index) => (
                    <div key={index} style={{ flex: "0 0 100%", paddingRight: "16px", boxSizing: "border-box" }}>
                      <div
                        className="value-card"
                        style={{
                          backgroundColor: value.highlighted ? colors.accent : colors.white,
                          borderRadius: "24px",
                          border: value.highlighted ? `3px solid ${colors.accent}` : `1.5px dashed ${colors.line}`,
                          display: "flex",
                          flexDirection: "column",
                          minHeight: "340px",
                          cursor: "default",
                        }}
                      >
                        <div
                          style={{ padding: "24px 24px 40px", flex: "1", display: "flex", alignItems: "flex-start" }}
                        >
                          {value.highlighted ? (
                            <svg width="90" height="70" viewBox="0 0 90 70">
                              <defs>
                                <clipPath id="left-clip-h">
                                  <circle cx="30" cy="35" r="28" />
                                </clipPath>
                                <clipPath id="right-clip-h">
                                  <circle cx="55" cy="35" r="28" />
                                </clipPath>
                              </defs>
                              <circle cx="30" cy="35" r="28" fill="none" stroke={colors.primary} strokeWidth="2" />
                              <g clipPath="url(#left-clip-h)">
                                {[-30, -20, -10, 0, 10, 20, 30, 40, 50, 60].map((offset, i) => (
                                  <line
                                    key={i}
                                    x1={offset}
                                    y1="-10"
                                    x2={offset + 80}
                                    y2="90"
                                    stroke={colors.primary}
                                    strokeWidth="2"
                                  />
                                ))}
                              </g>
                              <circle cx="55" cy="35" r="28" fill="none" stroke={colors.primary} strokeWidth="2" />
                              <g clipPath="url(#right-clip-h)">
                                {[-30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80].map((offset, i) => (
                                  <line
                                    key={i}
                                    x1={offset}
                                    y1="-10"
                                    x2={offset + 80}
                                    y2="90"
                                    stroke={colors.primary}
                                    strokeWidth="2"
                                  />
                                ))}
                              </g>
                            </svg>
                          ) : (
                            <svg width="80" height="65" viewBox="0 0 80 65">
                              <defs>
                                <clipPath id={`right-clip-m-${index}`}>
                                  <circle cx="50" cy="32" r="26" />
                                </clipPath>
                              </defs>
                              <circle cx="28" cy="32" r="26" fill={colors.primary} />
                              <circle cx="50" cy="32" r="26" fill={colors.primary} />
                              <g clipPath={`url(#right-clip-m-${index})`}>
                                {[-20, -10, 0, 10, 20, 30, 40, 50, 60, 70].map((offset, i) => (
                                  <line
                                    key={i}
                                    x1={offset}
                                    y1="-10"
                                    x2={offset + 70}
                                    y2="80"
                                    stroke={colors.accent}
                                    strokeWidth="5"
                                  />
                                ))}
                              </g>
                            </svg>
                          )}
                        </div>
                        <div
                          style={{
                            backgroundColor: colors.background,
                            borderRadius: "16px",
                            margin: "0 12px 12px",
                            padding: "24px",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "20px",
                              fontWeight: "600",
                              color: colors.primary,
                              fontFamily: "Inter, sans-serif",
                              margin: "0 0 12px 0",
                            }}
                          >
                            {value.title}
                          </h3>
                          <p
                            style={{
                              fontSize: "14px",
                              lineHeight: "1.6",
                              color: "#666",
                              fontFamily: "Inter, sans-serif",
                              margin: 0,
                            }}
                          >
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Dot scroll indicators */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "20px" }}>
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    onClick={() => setValueIndex(i)}
                    style={{
                      width: valueIndex === i ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      backgroundColor: valueIndex === i ? colors.accent : colors.line,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
              {[
                {
                  title: "Sustainability",
                  description:
                    "Every initiative is designed to endure beyond its launch — with built-in revenue models, local ownership, and institutional frameworks that ensure long-term viability.",
                  highlighted: false,
                },
                {
                  title: "Peoplecentric",
                  description:
                    "The Ghanaian citizen, household, and community are the unit of analysis. Every decision is evaluated against one standard — measurable improvement in people's lives.",
                  highlighted: true,
                },
                {
                  title: "Scalability",
                  description:
                    "Solutions are architected to compound, not just solve once. Every initiative is built on frameworks that replicate across sectors, regions, and institutions.",
                  highlighted: false,
                },
                {
                  title: "Adaptability",
                  description:
                    "Policy environments evolve, markets fluctuate, and opportunities emerge. Our model absorbs change and recalibrates without compromising strategic direction.",
                  highlighted: false,
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="value-card"
                  style={{
                    backgroundColor: value.highlighted ? colors.accent : colors.white,
                    borderRadius: "24px",
                    border: value.highlighted ? `3px solid ${colors.accent}` : `1.5px dashed ${colors.line}`,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "400px",
                    cursor: "default",
                  }}
                >
                  <div style={{ padding: "36px 36px 60px", flex: "1", display: "flex", alignItems: "flex-start" }}>
                    {value.highlighted ? (
                      <svg width="90" height="70" viewBox="0 0 90 70">
                        <defs>
                          <clipPath id="left-clip-h">
                            <circle cx="30" cy="35" r="28" />
                          </clipPath>
                          <clipPath id="right-clip-h">
                            <circle cx="55" cy="35" r="28" />
                          </clipPath>
                        </defs>
                        <circle cx="30" cy="35" r="28" fill="none" stroke={colors.primary} strokeWidth="2" />
                        <g clipPath="url(#left-clip-h)">
                          {[-30, -20, -10, 0, 10, 20, 30, 40, 50, 60].map((offset, i) => (
                            <line
                              key={i}
                              x1={offset}
                              y1="-10"
                              x2={offset + 80}
                              y2="90"
                              stroke={colors.primary}
                              strokeWidth="2"
                            />
                          ))}
                        </g>
                        <circle cx="55" cy="35" r="28" fill="none" stroke={colors.primary} strokeWidth="2" />
                        <g clipPath="url(#right-clip-h)">
                          {[-30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80].map((offset, i) => (
                            <line
                              key={i}
                              x1={offset}
                              y1="-10"
                              x2={offset + 80}
                              y2="90"
                              stroke={colors.primary}
                              strokeWidth="2"
                            />
                          ))}
                        </g>
                      </svg>
                    ) : (
                      <svg width="80" height="65" viewBox="0 0 80 65">
                        <defs>
                          <clipPath id={`right-clip-${index}`}>
                            <circle cx="50" cy="32" r="26" />
                          </clipPath>
                        </defs>
                        <circle cx="28" cy="32" r="26" fill={colors.primary} />
                        <circle cx="50" cy="32" r="26" fill={colors.primary} />
                        <g clipPath={`url(#right-clip-${index})`}>
                          {[-20, -10, 0, 10, 20, 30, 40, 50, 60, 70].map((offset, i) => (
                            <line
                              key={i}
                              x1={offset}
                              y1="-10"
                              x2={offset + 70}
                              y2="80"
                              stroke={colors.accent}
                              strokeWidth="5"
                            />
                          ))}
                        </g>
                      </svg>
                    )}
                  </div>
                  <div
                    style={{
                      backgroundColor: colors.background,
                      borderRadius: "20px",
                      margin: "0 16px 16px 16px",
                      padding: "28px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "600",
                        color: colors.primary,
                        fontFamily: "Inter, sans-serif",
                        marginBottom: "16px",
                        margin: "0 0 16px 0",
                      }}
                    >
                      {value.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: "1.6",
                        color: "#666",
                        fontFamily: "Inter, sans-serif",
                        margin: 0,
                      }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: isMobile ? "20px 20px 60px" : "40px 48px 100px", backgroundColor: colors.white }}>
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
            borderRadius: isMobile ? "24px" : "32px",
            overflow: "hidden",
            position: "relative",
            height: isMobile ? "300px" : "450px",
            backgroundColor: "#3D4F4F",
            backgroundImage: "linear-gradient(135deg, #3D4F4F 0%, #2D3D3D 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.3)",
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            [ Background Image ]
          </div>
          <div
            style={{
              position: "absolute",
              top: isMobile ? "20px" : "32px",
              left: isMobile ? "20px" : "32px",
              width: isMobile ? "44px" : "56px",
              height: isMobile ? "44px" : "56px",
              backgroundColor: colors.white,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18 9l-5 5-4-4-3 3" />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: isMobile ? "20px" : "40px",
              left: isMobile ? "20px" : "32px",
              right: isMobile ? "20px" : "32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-end" : "flex-end",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "8px" : "0",
            }}
          >
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "22px" : "32px",
                fontWeight: "300",
                color: colors.white,
                margin: 0,
                maxWidth: "500px",
                lineHeight: "1.3",
              }}
            >
              Connecting <span style={{ fontWeight: "700" }}>Resources</span>, Building Pathways —{" "}
              <span style={{ fontWeight: "700", color: colors.accent }}>Join Us!</span>
            </h3>
            <button
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                border: "none",
                padding: isMobile ? "10px 18px" : "16px 32px",
                fontSize: isMobile ? "12px" : "15px",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "6px" : "10px",
                flexShrink: 0,
                alignSelf: isMobile ? "flex-end" : "auto",
              }}
            >
              Get Involved
              <span
                style={{
                  width: isMobile ? "22px" : "28px",
                  height: isMobile ? "22px" : "28px",
                  backgroundColor: colors.white,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width={isMobile ? "11" : "14"}
                  height={isMobile ? "11" : "14"}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="2.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 48px", backgroundColor: colors.white }}>
        <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
          <div style={{ marginBottom: isMobile ? "36px" : "60px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1.5px",
                color: colors.primary,
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: colors.accent,
                  display: "inline-block",
                }}
              />
              Sectors
            </div>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "28px" : "48px",
                fontWeight: "300",
                lineHeight: "1.15",
                color: colors.primary,
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              <span style={{ fontWeight: "700" }}>Twelve Integrated Sectors.</span>
              <br />
              One Unified <span style={{ fontWeight: "700", color: colors.accent }}>Approach</span>.
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "0" : "80px",
              alignItems: "start",
            }}
          >
            {!isMobile && (
              <div style={{ width: "100%", height: "540px", position: "relative", marginTop: "-40px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="46%" outerRadius="52%" data={sectorData}>
                    <PolarGrid stroke="#e5e7eb" strokeWidth={1} />
                    <PolarAngleAxis
                      dataKey="sector"
                      tick={{ fill: "#666", fontSize: 12, fontWeight: 400, fontFamily: "Inter, sans-serif" }}
                      tickLine={false}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 35]} tick={false} axisLine={false} />
                    <Radar
                      name="Solutions Identified"
                      dataKey="ventures"
                      stroke={colors.primary}
                      fill={colors.primary}
                      fillOpacity={0.6}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Capital Range ($M)"
                      dataKey="capitalHigh"
                      stroke={colors.accent}
                      fill={colors.accent}
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div
                              style={{
                                backgroundColor: colors.white,
                                padding: "12px 16px",
                                borderRadius: "12px",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                border: `1px solid ${colors.line}`,
                                fontFamily: "Inter, sans-serif",
                              }}
                            >
                              <p
                                style={{ fontWeight: "600", color: colors.dark, fontSize: "13px", margin: "0 0 8px 0" }}
                              >
                                {data.fullName}
                              </p>
                              <p style={{ fontSize: "12px", color: colors.primary, margin: "0 0 4px 0" }}>
                                Gap: {data.gap}
                              </p>
                              <p style={{ fontSize: "12px", color: "#7CB342", margin: "0 0 4px 0" }}>
                                At Stake: {data.market}
                              </p>
                              <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>{data.pathways}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {sectorData.slice(0, 6).map((sector, index) => {
                  const isOpen = openSector === index;
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: isOpen ? colors.primary : colors.background,
                        border: "none",
                        borderRadius: "14px",
                        overflow: "hidden",
                        transition: "background-color 0.3s ease",
                        cursor: "pointer",
                      }}
                      onClick={() => setOpenSector(isOpen ? null : index)}
                    >
                      <div
                        className="sector-row"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: isMobile ? "14px 16px" : "16px 20px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: isMobile ? "14px" : "15px",
                            fontWeight: isOpen ? "600" : "400",
                            color: isOpen ? colors.white : colors.primary,
                            fontFamily: "Inter, sans-serif",
                            transition: "color 0.3s ease",
                          }}
                        >
                          {sector.fullName}
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={isOpen ? colors.white : colors.primary}
                          strokeWidth="1.5"
                          style={{
                            opacity: isOpen ? 1 : 0.3,
                            flexShrink: 0,
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition:
                              "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, stroke 0.3s ease",
                          }}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                      <div
                        style={{
                          maxHeight: isOpen ? "120px" : "0px",
                          opacity: isOpen ? 1 : 0,
                          padding: isOpen ? "0 20px 18px 20px" : "0 20px",
                          overflow: "hidden",
                          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <div
                          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: isMobile ? "8px" : "12px" }}
                        >
                          <div>
                            <p
                              style={{
                                fontSize: "10px",
                                fontWeight: "500",
                                color: "rgba(255,255,255,0.5)",
                                fontFamily: "Inter, sans-serif",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                margin: "0 0 4px 0",
                              }}
                            >
                              The Gap
                            </p>
                            <p
                              style={{
                                fontSize: isMobile ? "14px" : "18px",
                                fontWeight: "700",
                                color: colors.white,
                                fontFamily: "Inter, sans-serif",
                                margin: 0,
                                lineHeight: "1.2",
                              }}
                            >
                              {sector.gap}
                            </p>
                          </div>
                          <div>
                            <p
                              style={{
                                fontSize: "10px",
                                fontWeight: "500",
                                color: "rgba(255,255,255,0.5)",
                                fontFamily: "Inter, sans-serif",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                margin: "0 0 4px 0",
                              }}
                            >
                              At Stake
                            </p>
                            <p
                              style={{
                                fontSize: isMobile ? "14px" : "18px",
                                fontWeight: "700",
                                color: colors.accent,
                                fontFamily: "Inter, sans-serif",
                                margin: 0,
                                lineHeight: "1.2",
                              }}
                            >
                              {sector.market}
                            </p>
                          </div>
                          <div>
                            <p
                              style={{
                                fontSize: "10px",
                                fontWeight: "500",
                                color: "rgba(255,255,255,0.5)",
                                fontFamily: "Inter, sans-serif",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                margin: "0 0 4px 0",
                              }}
                            >
                              Identified
                            </p>
                            <p
                              style={{
                                fontSize: isMobile ? "14px" : "18px",
                                fontWeight: "700",
                                color: colors.white,
                                fontFamily: "Inter, sans-serif",
                                margin: 0,
                                lineHeight: "1.2",
                              }}
                            >
                              {sector.pathways}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link
                to="/sectors"
                style={{
                  backgroundColor: colors.background,
                  borderRadius: "14px",
                  padding: isMobile ? "14px 16px" : "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: colors.accent,
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.3px",
                  }}
                >
                  View all 12 sectors
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth="2"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED PARTNER */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 48px", backgroundColor: colors.background }}>
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {isMobile ? (
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                backgroundColor: "#3D4F4F",
                backgroundImage: "linear-gradient(135deg, #2D3D3D 0%, #3D4F4F 100%)",
                minHeight: "360px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0,0,0,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.2)",
                  fontSize: "12px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                [ Background Image ]
              </div>
              <div style={{ position: "relative", zIndex: 1, padding: "24px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "50px",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "1.5px",
                    color: colors.white,
                    fontFamily: "Inter, sans-serif",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  Trusted Partner
                </div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "28px",
                    fontWeight: "300",
                    lineHeight: "1.2",
                    color: colors.white,
                    margin: "0 0 12px",
                  }}
                >
                  <span style={{ fontWeight: "700" }}>Public Benefit</span> Corporation
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: "rgba(255,255,255,0.75)",
                    fontFamily: "Inter, sans-serif",
                    margin: "0 0 20px",
                  }}
                >
                  A development engine — identifying opportunities, connecting resources, and initiating ventures.
                </p>
                <button
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                    border: "none",
                    padding: "10px 20px",
                    fontSize: "12px",
                    fontWeight: "700",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    borderRadius: "50px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "flex-start",
                  }}
                >
                  Learn More
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  backgroundColor: "#3D4F4F",
                  minHeight: "500px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  [ Background Image ]
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "24px",
                    right: "24px",
                    backgroundColor: colors.white,
                    borderRadius: "16px",
                    padding: "20px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: `2px solid ${colors.primary}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    PBC
                  </span>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: colors.accent,
                  borderRadius: "24px",
                  padding: "48px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      backgroundColor: colors.white,
                      borderRadius: "50px",
                      fontSize: "12px",
                      fontWeight: "600",
                      letterSpacing: "1.5px",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      marginBottom: "24px",
                    }}
                  >
                    Trusted Partner
                  </div>
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "36px",
                      fontWeight: "300",
                      lineHeight: "1.2",
                      color: colors.primary,
                      margin: 0,
                    }}
                  >
                    <span style={{ fontWeight: "700" }}>Public Benefit</span>
                    <br />
                    Corporation
                  </h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.6",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                      marginBottom: "32px",
                      opacity: 0.85,
                    }}
                  >
                    BRIDGE is a development engine — identifying opportunities, connecting resources, and initiating
                    ventures. Let's work together to create a lasting impact.
                  </p>
                  <button
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.white,
                      border: "none",
                      padding: "16px 32px",
                      fontSize: "15px",
                      fontWeight: "600",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      borderRadius: "50px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      alignSelf: "flex-end",
                    }}
                  >
                    Learn More
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        backgroundColor: colors.accent,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="2.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* INSIGHTS */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 48px", backgroundColor: colors.background }}>
        <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "60px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1.5px",
                color: colors.primary,
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: colors.accent,
                  display: "inline-block",
                }}
              />
              Insights
            </div>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: "400",
                lineHeight: "1.2",
                color: colors.primary,
                margin: "0 0 16px 0",
                fontStyle: "italic",
              }}
            >
              Our Latest Insights
            </h2>
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.6",
                color: "#666",
                fontFamily: "Inter, sans-serif",
                margin: 0,
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Deep sector analysis, strategic frameworks, and evidence-based research for those building Ghana's future.
            </p>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                gap: isMobile ? "16px" : "24px",
                transform: isMobile
                  ? `translateX(-${insightIndex * (100 + 5)}%)`
                  : `translateX(-${insightIndex * (50 + 12)}%)`,
                transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {insights.map((insight, index) => (
                <div
                  key={index}
                  style={{
                    flex: isMobile ? "0 0 100%" : "0 0 calc(50% - 12px)",
                    backgroundColor: hoveredInsight === index ? colors.accent : "#ECEEE9",
                    borderRadius: isMobile ? "20px" : "24px",
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={() => setHoveredInsight(index)}
                  onMouseLeave={() => setHoveredInsight(null)}
                >
                  <div
                    style={{
                      backgroundColor: "#3D4F4F",
                      minHeight: isMobile ? "180px" : "320px",
                      borderRadius: isMobile ? "16px" : "20px",
                      margin: isMobile ? "12px 12px 0" : "16px 0 16px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.3)",
                      fontSize: "12px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    [ Image ]
                  </div>
                  <div
                    style={{
                      padding: isMobile ? "20px" : "32px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px" }}>
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: "60px",
                          height: "60px",
                          backgroundColor: colors.background,
                          borderBottomLeftRadius: "60px",
                        }}
                      />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          letterSpacing: "1.5px",
                          color: hoveredInsight === index ? colors.primary : colors.accent,
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "16px",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {insight.category}
                      </span>
                      <h3
                        style={{
                          fontSize: isMobile ? "18px" : "22px",
                          fontWeight: "600",
                          lineHeight: "1.3",
                          color: colors.primary,
                          fontFamily: "Inter, sans-serif",
                          margin: 0,
                        }}
                      >
                        {insight.title}
                      </h3>
                    </div>
                    <div style={{ alignSelf: "flex-end" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          backgroundColor: hoveredInsight === index ? colors.primary : colors.white,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={hoveredInsight === index ? colors.white : colors.primary}
                          strokeWidth="2"
                          style={{ transition: "stroke 0.3s ease" }}
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dot scroll indicators */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginTop: isMobile ? "24px" : "36px",
            }}
          >
            {Array.from({ length: isMobile ? insights.length : insights.length - 1 }).map((_, i) => (
              <div
                key={i}
                onClick={() => setInsightIndex(i)}
                style={{
                  width: insightIndex === i ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: insightIndex === i ? colors.accent : colors.line,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="/insights" style={{ textDecoration: "none" }}>
              <button
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  border: "none",
                  padding: isMobile ? "12px 24px" : "16px 32px",
                  fontSize: isMobile ? "13px" : "15px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  borderRadius: "50px",
                }}
              >
                More Insights
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* GOVERNMENT PRIORITIES */}
      <section style={{ padding: isMobile ? "48px 20px 60px" : "80px 48px 120px", backgroundColor: colors.white }}>
        <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "60px",
            }}
          >
            {!isMobile && <div style={{ flex: 1, height: "1px", backgroundColor: colors.line }} />}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1.5px",
                color: colors.primary,
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
                backgroundColor: colors.white,
                margin: isMobile ? "0" : "0 24px",
              }}
            >
              {!isMobile && (
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: colors.accent,
                    display: "inline-block",
                  }}
                />
              )}
              Aligned With Government Priorities
            </div>
            {!isMobile && <div style={{ flex: 1, height: "1px", backgroundColor: colors.line }} />}
          </div>
          <div style={{ overflow: "hidden", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(to right, white, transparent)",
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(to left, white, transparent)",
                zIndex: 2,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "48px",
                whiteSpace: "nowrap",
                animation: "govScroll 40s linear infinite",
              }}
            >
              {[
                "Ghana Investment Promotion Centre (GIPC)",
                "24-Hour Economy Secretariat",
                "Ghana Free Zones Authority",
                "National Board for Small Scale Industries",
                "Ghana Export Promotion Authority",
                "Ministry of Trade & Industry",
                "Sankofa Initiative",
                "One District, One Factory (1D1F)",
                "Planting for Food & Jobs",
                "Ghana Enterprises Agency",
                "Ghana Infrastructure Investment Fund",
                "National Health Insurance Authority",
                "Ghana Jobs & Skills Project",
                "Ghana Digital Centres",
                "Development Bank Ghana",
                "Ghana Tourism Authority",
                "Ghana Investment Promotion Centre (GIPC)",
                "24-Hour Economy Secretariat",
                "Ghana Free Zones Authority",
                "National Board for Small Scale Industries",
                "Ghana Export Promotion Authority",
                "Ministry of Trade & Industry",
                "Sankofa Initiative",
                "One District, One Factory (1D1F)",
                "Planting for Food & Jobs",
                "Ghana Enterprises Agency",
                "Ghana Infrastructure Investment Fund",
                "National Health Insurance Authority",
                "Ghana Jobs & Skills Project",
                "Ghana Digital Centres",
                "Development Bank Ghana",
                "Ghana Tourism Authority",
              ].map((name, index) => (
                <span key={index} style={{ display: "flex", alignItems: "center", gap: "48px" }}>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                      opacity: 0.6,
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      backgroundColor: colors.accent,
                      flexShrink: 0,
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT + FOOTER */}
      <section style={{ marginTop: isMobile ? "0" : "400px" }}>
        <div style={{ backgroundColor: colors.primary, paddingTop: isMobile ? "0" : "90px" }}>
          {!isMobile && (
            <div
              style={{
                maxWidth: CONTENT_MAX_WIDTH,
                margin: "0 auto",
                padding: "0 48px",
                transform: "translateY(-500px)",
                marginBottom: "-450px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  borderRadius: "32px",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                }}
              >
                <div style={{ backgroundColor: colors.background, padding: "48px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      border: `1px solid ${colors.line}`,
                      borderRadius: "50px",
                      fontSize: "12px",
                      fontWeight: "600",
                      letterSpacing: "1.5px",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      marginBottom: "24px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: colors.accent,
                        display: "inline-block",
                      }}
                    />
                    Get In Touch
                  </div>
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "42px",
                      fontWeight: "300",
                      lineHeight: "1.2",
                      color: colors.primary,
                      margin: "0 0 16px 0",
                    }}
                  >
                    <span style={{ fontWeight: "700" }}>Let's</span> Connect
                  </h2>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.6",
                      color: "#666",
                      fontFamily: "Inter, sans-serif",
                      margin: "0 0 24px 0",
                    }}
                  >
                    Connect with our team to explore partnership opportunities and tailored solutions.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    {[
                      { label: "Your name", type: "text", placeholder: "e.g. Kwame Asante" },
                      { label: "Email address", type: "email", placeholder: "e.g. kwame@email.com" },
                      { label: "Phone number", type: "tel", placeholder: "e.g. +233 XX XXX XXXX" },
                      { label: "Organization", type: "text", placeholder: "e.g. Company name" },
                    ].map((field, i) => (
                      <div key={i}>
                        <label
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: colors.primary,
                            fontFamily: "Inter, sans-serif",
                            display: "block",
                            marginBottom: "8px",
                          }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          style={{
                            width: "100%",
                            padding: "14px 16px",
                            borderRadius: "12px",
                            border: "none",
                            backgroundColor: colors.white,
                            fontSize: "15px",
                            fontFamily: "Inter, sans-serif",
                            color: colors.dark,
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: colors.primary,
                        fontFamily: "Inter, sans-serif",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Your message
                    </label>
                    <textarea
                      placeholder="Type here..."
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: "12px",
                        border: "none",
                        backgroundColor: colors.white,
                        fontSize: "15px",
                        fontFamily: "Inter, sans-serif",
                        color: colors.dark,
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <button
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.primary,
                      border: "none",
                      padding: "16px 32px",
                      fontSize: "15px",
                      fontWeight: "600",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      borderRadius: "50px",
                    }}
                  >
                    Send Message
                  </button>
                </div>
                <div
                  style={{
                    backgroundColor: "#3D4F4F",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  [ Image ]
                  <div
                    style={{
                      position: "absolute",
                      bottom: "24px",
                      left: "24px",
                      right: "24px",
                      backgroundColor: "rgba(255,255,255,0.95)",
                      borderRadius: "16px",
                      padding: "20px 24px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        backgroundColor: colors.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.5",
                        color: colors.dark,
                        fontFamily: "Inter, sans-serif",
                        margin: 0,
                      }}
                    >
                      Email us at{" "}
                      <span style={{ fontWeight: "600", textDecoration: "underline" }}>info@bridgepbc.com</span> or fill
                      out our form, and we'll connect within one business day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <SiteFooter />
        </div>
      </section>
    </div>
  );
}
