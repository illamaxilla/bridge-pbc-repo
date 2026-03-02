import { useState, useEffect } from "react";
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

// BRIDGE 12 Sectors data
const sectorData = [
  {
    sector: "Infrastructure",
    fullName: "Infrastructure & Basic Services",
    capitalLow: 8,
    capitalHigh: 15,
    ventures: 15,
  },
  {
    sector: "Financial",
    fullName: "Financial Inclusion & Economic Security",
    capitalLow: 10,
    capitalHigh: 20,
    ventures: 18,
  },
  { sector: "Health", fullName: "Health Systems & Wellbeing", capitalLow: 8, capitalHigh: 16, ventures: 15 },
  { sector: "Technology", fullName: "Technology & Innovation", capitalLow: 8, capitalHigh: 15, ventures: 15 },
  { sector: "Education", fullName: "Education & Skills", capitalLow: 16.5, capitalHigh: 33.5, ventures: 15 },
  { sector: "Agriculture", fullName: "Agriculture & Value Chains", capitalLow: 12, capitalHigh: 22, ventures: 18 },
  { sector: "Creative", fullName: "Sports, Entertainment & Creative", capitalLow: 10, capitalHigh: 20.5, ventures: 14 },
  { sector: "Housing", fullName: "Housing & Real Estate", capitalLow: 15, capitalHigh: 25, ventures: 11 },
  { sector: "Tourism", fullName: "Tourism & Hospitality", capitalLow: 10, capitalHigh: 18, ventures: 13 },
  { sector: "Energy", fullName: "Energy & Renewable Resources", capitalLow: 12, capitalHigh: 22, ventures: 14 },
  {
    sector: "Manufacturing",
    fullName: "Manufacturing & Light Industry",
    capitalLow: 15,
    capitalHigh: 30,
    ventures: 14,
  },
  { sector: "Transport", fullName: "Transportation & Logistics", capitalLow: 10, capitalHigh: 22, ventures: 14 },
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
// Sector Grid Widget (footer)
// ═══════════════════════════════════════════════
const sectorIcons = [
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
    label: "Financial Inclusion & Economic Security",
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
    label: "Health Systems & Wellbeing",
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
        <path d="M15 2v2" />
        <path d="M15 20v2" />
        <path d="M2 15h2" />
        <path d="M2 9h2" />
        <path d="M20 15h2" />
        <path d="M20 9h2" />
        <path d="M9 2v2" />
        <path d="M9 20v2" />
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
    label: "Sports, Entertainment & Creative",
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
    label: "Energy & Renewable Resources",
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
    label: "Manufacturing & Light Industry",
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
        <path d="M17 18h1" />
        <path d="M12 18h1" />
        <path d="M7 18h1" />
      </svg>
    ),
  },
  {
    key: "transport",
    label: "Transportation & Logistics",
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

function FooterSectorGrid() {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <div
        style={{
          fontSize: "10px",
          fontWeight: "700",
          color: hovered !== null ? colors.accent : "rgba(255,255,255,0.25)",
          fontFamily: "Inter, sans-serif",
          textTransform: "uppercase",
          letterSpacing: "2px",
          marginBottom: "14px",
          transition: "color 0.25s ease",
          minHeight: "15px",
        }}
      >
        {hovered !== null ? sectorIcons[hovered].label : "Explore 12 Sectors"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {sectorIcons.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href="#"
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
}

function BridgeLogo() {
  const [hovered, setHovered] = useState(false);
  const c = hovered ? colors.primary : colors.dark;
  return (
    <div
      style={{ display: "flex", alignItems: "center", height: "40px", cursor: "pointer", transition: "all 0.3s ease" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox="0 0 4113.9 932.3" height="36" style={{ display: "block" }}>
        <path
          fill={c}
          d="M3355.1,655.6h31.2v5.7h-31.2v-5.7ZM3355.1,667h31.2v11.1h-31.2v-11.1ZM3355.1,683.9h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.9h31.2v11.1h-31.2v-11.1ZM3355.1,801.8h31.2v11.1h-31.2v-11.1ZM3355.1,818.6h31.2v11.1h-31.2v-11.1ZM3355.1,835.5h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.6h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,667h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.8h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.6h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.6,683.9h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.9h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.2h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
        />
        <path
          fill={c}
          d="M3572.3,655.6h31.2v5.7h-31.2v-5.7ZM3572.3,667h31.2v11.1h-31.2v-11.1ZM3572.3,683.9h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.9h31.2v11.1h-31.2v-11.1ZM3572.3,801.8h31.2v11.1h-31.2v-11.1ZM3572.3,818.6h31.2v11.1h-31.2v-11.1ZM3572.3,835.5h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.6h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,667h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,689h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4l.1.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.9h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1,0ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.9h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.8h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.5h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.6h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z"
        />
        <path
          fill={c}
          d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.9h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.8h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.6h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.5h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.9h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.3,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.2c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,667h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.2c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.7,683.9h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z"
        />
        <path
          fill={c}
          d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
        />
        <path
          fill={c}
          stroke={c}
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
        />
        <path
          fill={c}
          stroke={c}
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
        />
        <rect fill={colors.accent} x="1427.4" y="17.4" width="205.2" height="145" />
        <rect fill={c} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
        <path
          fill={c}
          d="M2757.4,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
        />
        <rect fill={c} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
        <rect fill={colors.accent} x="3083.5" y="339.5" width="175.1" height="257.7" />
        <rect fill={colors.accent} x="3083.5" y="654.5" width="175.1" height="257.7" />
        <circle fill="none" stroke={c} strokeWidth="5" strokeMiterlimit="10" cx="4078.6" cy="661.3" r="32.8" />
        <path
          fill={c}
          d="M4092.2,677.1l-7.3-10.4c.2,0,.3,0,.4-.2,2-.9,3.6-2.1,4.6-3.8s1.6-3.6,1.6-6.1c0-3.6-1.2-6.3-3.6-8.4s-5.7-3-10-3h-13v31.8h5.9v-9.3h8.5l6.5,9.3h6.4v.1ZM4083.7,651.9c1.3,1.1,2,2.7,2,4.7s-.6,3.6-2,4.7-3.3,1.7-5.9,1.7h-6.9v-12.6h6.9c2.6,0,4.5.5,5.9,1.6h0v-.1Z"
        />
        <rect
          fill="none"
          stroke={c}
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
          stroke={c}
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

function BridgeLogoWhite() {
  return (
    <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
      <svg viewBox="0 0 4113.9 932.3" height="36" style={{ display: "block" }}>
        <path
          fill={colors.white}
          d="M3355.1,655.6h31.2v5.7h-31.2v-5.7ZM3355.1,667h31.2v11.1h-31.2v-11.1ZM3355.1,683.9h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.9h31.2v11.1h-31.2v-11.1ZM3355.1,801.8h31.2v11.1h-31.2v-11.1ZM3355.1,818.6h31.2v11.1h-31.2v-11.1ZM3355.1,835.5h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.6h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,667h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.8h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.6h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.6,683.9h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.9h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.2h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
        />
        <path
          fill={colors.white}
          d="M3572.3,655.6h31.2v5.7h-31.2v-5.7ZM3572.3,667h31.2v11.1h-31.2v-11.1ZM3572.3,683.9h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.9h31.2v11.1h-31.2v-11.1ZM3572.3,801.8h31.2v11.1h-31.2v-11.1ZM3572.3,818.6h31.2v11.1h-31.2v-11.1ZM3572.3,835.5h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.6h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,667h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,689h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4l.1.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.9h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1,0ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.9h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.8h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.5h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.6h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z"
        />
        <path
          fill={colors.white}
          d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.9h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.8h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.6h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.5h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.9h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.3,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.2c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,667h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.2c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.7,683.9h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z"
        />
        <path
          fill={colors.white}
          d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
        />
        <path
          fill={colors.white}
          stroke={colors.white}
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
        />
        <path
          fill={colors.white}
          stroke={colors.white}
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
        />
        <rect fill={colors.accent} x="1427.4" y="17.4" width="205.2" height="145" />
        <rect fill={colors.white} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
        <path
          fill={colors.white}
          d="M2757.4,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
        />
        <rect fill={colors.white} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
        <rect fill={colors.accent} x="3083.5" y="339.5" width="175.1" height="257.7" />
        <rect fill={colors.accent} x="3083.5" y="654.5" width="175.1" height="257.7" />
        <circle
          fill="none"
          stroke={colors.white}
          strokeWidth="5"
          strokeMiterlimit="10"
          cx="4078.6"
          cy="661.3"
          r="32.8"
        />
        <path
          fill={colors.white}
          d="M4092.2,677.1l-7.3-10.4c.2,0,.3,0,.4-.2,2-.9,3.6-2.1,4.6-3.8s1.6-3.6,1.6-6.1c0-3.6-1.2-6.3-3.6-8.4s-5.7-3-10-3h-13v31.8h5.9v-9.3h8.5l6.5,9.3h6.4v.1ZM4083.7,651.9c1.3,1.1,2,2.7,2,4.7s-.6,3.6-2,4.7-3.3,1.7-5.9,1.7h-6.9v-12.6h6.9c2.6,0,4.5.5,5.9,1.6h0v-.1Z"
        />
        <rect
          fill="none"
          stroke={colors.white}
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
          stroke={colors.white}
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
// ═══════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════
export default function BRIDGEHomePage() {
  // Hero state
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectorCount = useCounter(12, 1200, 300);
  const ventureCount = useCounter(174, 1800, 600);
  const capitalCount = useCounter(135, 2000, 900);

  const sectorIcons = [
    { label: "Infra", color: "#1B4D3E" },
    { label: "Fin", color: "#2D6A4F" },
    { label: "Health", color: "#40916C" },
    { label: "Tech", color: "#52B788" },
    { label: "Edu", color: "#74C69D" },
    { label: "Agri", color: "#95D5B2" },
  ];

  // Approach state
  const [activeTab, setActiveTab] = useState("identification");
  const [tabTransition, setTabTransition] = useState(false);
  const [openSector, setOpenSector] = useState(null);
  const [insightIndex, setInsightIndex] = useState(0);
  const [hoveredInsight, setHoveredInsight] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [flippedValue, setFlippedValue] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      text: "We employ an ecological analysis within the value chain to highlight opportunities that can be mobilized to develop necessary capacities.",
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
      text: "We structure solutions built on proven frameworks and best practices to bridge the gap between capacity, available resources, and impact.",
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
      text: "We form partnerships, initiate investments, deploy resources, and build ventures designed to deliver measurable outcomes and lasting impact.",
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes insightScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes govScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .stat-card {
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(27, 77, 62, 0.14) !important;
        }
        .header-icon {
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .header-icon:hover {
          color: #1B4D3E !important;
        }
        .header-icon:hover svg {
          stroke: #1B4D3E !important;
        }
        .cta-primary {
          transition: all 0.3s ease;
        }
        .cta-primary:hover {
          background-color: #B8D935 !important;
          color: #1B4D3E !important;
          transform: translateY(-1px);
        }
        .cta-btn-arrow {
          transition: background-color 0.3s ease;
        }
        .cta-btn-arrow svg {
          transition: stroke 0.3s ease;
        }
        .cta-primary:hover .cta-btn-arrow {
          background-color: rgba(27, 77, 62, 0.15) !important;
        }
        .cta-primary:hover .cta-btn-arrow svg {
          stroke: #1B4D3E !important;
        }
        .cta-secondary {
          transition: all 0.3s ease;
        }
        .cta-secondary:hover {
          border-color: #1B4D3E !important;
          color: #1B4D3E !important;
        }
        .sector-dot {
          transition: transform 0.2s ease;
        }
        .sector-dot:hover {
          transform: scale(1.15);
          z-index: 10;
        }
        .approach-tab {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .approach-tab:hover {
          transform: translateY(-2px);
        }
        .stat-item {
          transition: transform 0.2s ease;
        }
        .stat-item:hover {
          transform: scale(1.03);
        }
        .cta-approach {
          transition: all 0.3s ease;
        }
        .cta-approach:hover {
          background-color: #B8D935 !important;
          color: #1B4D3E !important;
          transform: translateY(-1px);
        }
        .cta-approach:hover .cta-arrow {
          background-color: rgba(27, 77, 62, 0.15) !important;
        }
        .cta-approach:hover .cta-arrow svg {
          stroke: #1B4D3E !important;
        }
        .service-card {
          perspective: 1000px;
          cursor: pointer;
        }
        .service-card-inner {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: 100%;
        }
        .service-card:hover .service-card-inner {
          transform: rotateY(180deg);
        }
        .service-card-front, .service-card-back {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 24px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .service-card-back {
          transform: rotateY(180deg);
        }
        .service-card:hover .service-arrow {
          background-color: #1B4D3E !important;
        }
        .service-card:hover .service-arrow svg {
          stroke: #FFFFFF !important;
        }
        .cta-learn-more {
          transition: all 0.3s ease;
        }
        .cta-learn-more:hover {
          background-color: #B8D935 !important;
          color: #1B4D3E !important;
          transform: translateY(-1px);
        }
        .value-card {
          perspective: 1000px;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .value-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(27, 77, 62, 0.12);
        }
        .value-card-inner {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: 100%;
        }
        .value-card-inner.flipped {
          transform: rotateY(180deg);
        }
        .value-card-front, .value-card-back {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
        }
        .value-card-back {
          transform: rotateY(180deg);
        }
        .cta-dark-swap {
          transition: all 0.3s ease;
        }
        .cta-dark-swap:hover {
          background-color: #B8D935 !important;
          color: #1B4D3E !important;
          transform: translateY(-1px);
        }
        .cta-dark-swap:hover .cta-btn-arrow {
          background-color: rgba(27, 77, 62, 0.15) !important;
        }
        .cta-dark-swap:hover .cta-btn-arrow svg {
          stroke: #1B4D3E !important;
        }
        .cta-lime-swap {
          transition: all 0.3s ease;
        }
        .cta-lime-swap:hover {
          background-color: #1B4D3E !important;
          color: #FFFFFF !important;
          transform: translateY(-1px);
        }
        .cta-lime-swap:hover .cta-btn-arrow {
          background-color: rgba(255, 255, 255, 0.2) !important;
        }
        .cta-lime-swap:hover .cta-btn-arrow svg {
          stroke: #FFFFFF !important;
        }
        .sector-row {
          transition: all 0.25s ease;
        }
        .sector-row:hover {
          background-color: rgba(27, 77, 62, 0.04);
        }
        .carousel-nav {
          transition: all 0.25s ease;
        }
        .carousel-nav:hover {
          border-color: #1B4D3E !important;
          background-color: #1B4D3E !important;
        }
        .carousel-nav:hover svg {
          stroke: #FFFFFF !important;
        }
      `}</style>
      {/* ═══════════════════════════════════════════
          SECTION 1: NAVIGATION + HERO
          ═══════════════════════════════════════════ */}

      {/* Header/Navigation — Sticky with scroll behavior */}
      <header
        style={{
          backgroundColor: isScrolled ? "rgba(255,255,255,0.85)" : colors.white,
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
          padding: "0 80px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.04)" : "0 2px 20px rgba(0,0,0,0.06)",
          transition: "all 0.3s ease",
        }}
      >
        <BridgeLogo />

        {/* Navigation - Only in default state */}
        {!isScrolled && (
          <nav
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "32px",
              alignItems: "center",
            }}
          >
            {["About", "Sectors", "Services", "Insights", "Contact"].map((item, i) => (
              <a
                key={item}
                href="#"
                onMouseEnter={() => setHoveredNav(i)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  color: hoveredNav === i ? colors.primary : colors.dark,
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.3px",
                  transition: "color 0.2s ease",
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        )}

        {/* Right Icons — always visible */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Search */}
          <a
            href="#"
            className="header-icon"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.dark}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </a>
          {/* User */}
          <a
            href="#"
            className="header-icon"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.dark}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
          {/* Menu */}
          <a
            href="#"
            className="header-icon"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.dark}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: colors.white,
          padding: "60px 80px 40px 80px",
        }}
      >
        <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            {/* Enhanced Headline — Bold/Light Mix */}
            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "56px",
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
              <span
                style={{
                  fontWeight: "700",
                  color: colors.accent,
                  position: "relative",
                  display: "inline-block",
                }}
              >
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

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginBottom: "8px",
                flex: "0 0 auto",
                animation: "fadeUp 0.8s ease-out 0.2s both",
              }}
            >
              <button
                className="cta-primary"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  border: "none",
                  padding: "12px 28px",
                  fontSize: "14px",
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
                    width: "28px",
                    height: "28px",
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
              <button
                className="cta-secondary"
                style={{
                  backgroundColor: "transparent",
                  color: colors.dark,
                  border: `1.5px solid ${colors.line}`,
                  padding: "12px 28px",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  borderRadius: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                }}
              >
                Request Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Area with Floating Cards */}
      <section style={{ position: "relative", margin: "0 80px" }}>
        <div
          style={{
            backgroundColor: colors.background,
            height: "560px",
            borderRadius: "24px",
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

        {/* Enhanced Floating Cards */}
        <div
          style={{
            position: "absolute",
            bottom: "-90px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: CONTENT_MAX_WIDTH,
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Card 1: Sectors — with interactive sector dots & animated bars */}
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
            {/* Top row */}
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
              {/* Mini bar chart */}
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

            {/* Sector dot grid */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                paddingTop: "12px",
                borderTop: `1px solid ${colors.line}`,
              }}
            >
              {sectorIcons.map((s, i) => (
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
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="3">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Ventures — with sparkline & progress ring */}
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
                {/* Progress ring */}
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

            {/* Mini bar chart */}
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
                      height: `${h * 0.4}px`,
                      borderRadius: "2px",
                      backgroundColor: i >= 10 ? colors.accent : colors.primary,
                      opacity: i < 4 ? 0.3 : i < 8 ? 0.6 : 1,
                      transition: "height 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      transitionDelay: `${i * 50}ms`,
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
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#2D6A4F",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Growing
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Capital — with deployment range bar */}
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
            {/* Decorative background circle */}
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
                    Indicative Capital
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
                      M+
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
                  <svg width="22" height="22" viewBox="0 0 24 24" fill={colors.primary}>
                    <rect x="3" y="8" width="4" height="12" rx="1" />
                    <rect x="10" y="12" width="4" height="8" rx="1" />
                    <rect x="17" y="4" width="4" height="16" rx="1" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Deployment range bar */}
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
                  height: "8px",
                  backgroundColor: "rgba(27,77,62,0.1)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: hoveredCard === 2 ? "52%" : "42%",
                    backgroundColor: colors.primary,
                    borderRadius: "4px",
                    transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
                <div
                  style={{
                    width: hoveredCard === 2 ? "28%" : "18%",
                    backgroundColor: colors.accent,
                    borderRadius: "0 4px 4px 0",
                    transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for floating cards */}
      <div style={{ height: "130px" }} />
      {/* ═══════════════════════════════════════════
          SECTION 2: THE APPROACH
          ═══════════════════════════════════════════ */}

      <section
        style={{
          backgroundColor: colors.white,
          padding: "100px 80px",
        }}
      >
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "80px",
            alignItems: "stretch",
          }}
        >
          {/* Left Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              alignSelf: "stretch",
            }}
          >
            {/* Pill Badge */}
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

            {/* Headline — Bold/Light Mix */}
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "44px",
                fontWeight: "300",
                lineHeight: "1.2",
                color: colors.primary,
                margin: "0 0 24px 0",
                letterSpacing: "-0.5px",
              }}
            >
              We <span style={{ fontWeight: "700" }}>connect</span> the people, institutions, and resources required to
              create{" "}
              <span
                style={{
                  fontWeight: "700",
                  color: colors.accent,
                  position: "relative",
                  display: "inline",
                }}
              >
                measurable, lasting impact
              </span>
              .
            </h2>

            {/* Subtext */}
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

            {/* CTA */}
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
          </div>

          {/* Right Column — Interactive Tab Panel */}
          <div>
            {/* Tab Selector */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "28px",
              }}
            >
              {["identification", "connection", "engagement"].map((tab, i) => (
                <button
                  key={tab}
                  className="approach-tab"
                  onClick={() => handleTabChange(tab)}
                  style={{
                    flex: 1,
                    padding: "16px 20px",
                    fontSize: "14px",
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
                    gap: "10px",
                  }}
                >
                  {/* Step number */}
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
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Card */}
            <div
              style={{
                backgroundColor: colors.background,
                borderRadius: "20px",
                padding: "32px",
                opacity: tabTransition ? 0 : 1,
                transform: tabTransition ? "translateY(8px)" : "translateY(0)",
                transition: "all 0.2s ease",
              }}
            >
              {/* Icon + Description */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "28px",
                  alignItems: "flex-start",
                }}
              >
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
                    fontSize: "17px",
                    lineHeight: "1.7",
                    color: colors.dark,
                    fontFamily: "Inter, sans-serif",
                    margin: 0,
                  }}
                >
                  {current.text}
                </p>
              </div>

              {/* Stats Row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  marginBottom: "28px",
                }}
              >
                {current.stats.map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: "14px",
                      padding: "18px 16px",
                      textAlign: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "24px",
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
                        fontSize: "11px",
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

              {/* Progress Bars */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {current.progressItems.map((item, i) => (
                  <div key={`${activeTab}-${i}`} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#666",
                        fontFamily: "Inter, sans-serif",
                        minWidth: "140px",
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

              {/* Minimal phase indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  marginTop: "24px",
                  paddingTop: "20px",
                  borderTop: `1px solid rgba(27,77,62,0.06)`,
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
      {/* ═══════════════════════════════════════════
          SECTION 3: SERVICES
          ═══════════════════════════════════════════ */}

      <section
        style={{
          padding: "40px 80px",
        }}
      >
        <div
          style={{
            backgroundColor: colors.primary,
            borderRadius: "32px",
            padding: "80px 60px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "50px",
            }}
          >
            <div>
              {/* Pill Badge */}
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

              {/* Headline — Bold/Light Mix */}
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "44px",
                  fontWeight: "300",
                  lineHeight: "1.2",
                  color: colors.white,
                  margin: 0,
                  letterSpacing: "-0.5px",
                  maxWidth: "600px",
                }}
              >
                How We <span style={{ fontWeight: "700", color: colors.accent }}>Bridge the Gap</span> from Opportunity
                to Impact
              </h2>
            </div>

            {/* Learn More Button */}
            <button
              className="cta-learn-more"
              style={{
                backgroundColor: colors.white,
                color: colors.primary,
                border: "none",
                padding: "16px 32px",
                fontSize: "15px",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                borderRadius: "50px",
                marginTop: "60px",
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
          </div>

          {/* Service Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
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
                description: "Strategic alliances with government, traditional authorities, and development partners.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="service-card"
                style={{
                  minHeight: "360px",
                }}
              >
                <div className="service-card-inner">
                  {/* ── FRONT ── */}
                  <div
                    className="service-card-front"
                    style={{
                      backgroundColor: colors.accent,
                    }}
                  >
                    {/* Decorative blob + photo area */}
                    <div
                      style={{
                        position: "relative",
                        height: "200px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "180px",
                          height: "180px",
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
                          width: "140px",
                          height: "140px",
                          backgroundColor: "#D1D5D0",
                          borderRadius: "50%",
                          border: "4px solid rgba(255,255,255,0.5)",
                        }}
                      />
                    </div>

                    {/* Footer */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color: colors.primary,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {service.name}
                      </span>
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
                    </div>
                  </div>

                  {/* ── BACK ── */}
                  <div
                    className="service-card-back"
                    style={{
                      backgroundColor: colors.primary,
                    }}
                  >
                    {/* Top: Number + Name */}
                    <div>
                      <span
                        style={{
                          fontSize: "64px",
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
                          fontSize: "24px",
                          fontWeight: "700",
                          color: colors.white,
                          fontFamily: "Inter, sans-serif",
                          margin: "0 0 16px 0",
                        }}
                      >
                        {service.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "15px",
                          lineHeight: "1.7",
                          color: "rgba(255,255,255,0.7)",
                          fontFamily: "Inter, sans-serif",
                          margin: 0,
                        }}
                      >
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom: Arrow */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div
                        className="service-arrow"
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "50%",
                          backgroundColor: colors.accent,
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
                          stroke={colors.primary}
                          strokeWidth="2"
                          style={{ transition: "stroke 0.3s ease" }}
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════════
          SECTION 4: OUR VALUES
          ═══════════════════════════════════════════ */}

      <section
        style={{
          backgroundColor: colors.white,
          padding: "100px 80px",
        }}
      >
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
          }}
        >
          {/* Header — Centered */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "60px",
            }}
          >
            {/* Pill Badge */}
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

            {/* Headline — Bold/Light Mix */}
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "44px",
                fontWeight: "300",
                lineHeight: "1.2",
                color: colors.primary,
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              The <span style={{ fontWeight: "700" }}>Principles</span> &{" "}
              <span style={{ fontWeight: "700" }}>Foundation</span> Behind
              <br />
              Every <span style={{ fontWeight: "700", color: colors.accent }}>Bridge</span> We Build
            </h2>
          </div>

          {/* Values Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
          >
            {[
              {
                title: "Sustainability",
                description:
                  "Every initiative endures beyond its launch — with built-in revenue models, local ownership structures, and institutional frameworks for long-term viability.",
                highlighted: false,
                back: "Every BRIDGE venture is stress-tested with a 5-year financial sustainability model before launch. We embed revenue engines directly into each initiative — from transaction fees in digital platforms to cooperative profit-sharing in agricultural hubs. Local ownership is non-negotiable: community stakeholders hold governance seats, and control transfers to Ghanaian institutions on a defined timeline.",
              },
              {
                title: "Peoplecentric",
                description:
                  "The Ghanaian citizen, household, and community are the unit of analysis. Every decision is measured against one standard — tangible improvement in daily life.",
                highlighted: true,
                back: "Our proprietary BRIDGE Impact Score evaluates every venture across five dimensions that map directly to citizen outcomes: access, affordability, quality, dignity, and agency. The PRECEDE-PROCEED framework grounds our assessments in the lived reality of Ghanaian households — not abstract development metrics. Before any capital is deployed, we validate demand through community-level research.",
              },
              {
                title: "Scalability",
                description:
                  "Solutions are architected to compound, not just solve once. Every initiative replicates across sectors, regions, and institutions through shared frameworks.",
                highlighted: false,
                back: "Our 12-sector integrated architecture means a logistics solution built for agriculture automatically strengthens manufacturing and tourism supply chains. Standardized venture templates, shared digital infrastructure, and cross-sector data pipelines ensure that every investment generates compounding returns. The Kejetia Market digitization creates a replicable blueprint for 50+ major markets nationwide.",
              },
              {
                title: "Adaptability",
                description:
                  "Policy landscapes shift, markets fluctuate, and new opportunities emerge. Our model absorbs change and recalibrates without losing strategic direction.",
                highlighted: false,
                back: "BRIDGE maintains active alignment monitoring with Ghana's policy environment — our 2026 Budget analysis identified leverage ratios as high as 1:20 by mapping ventures to the 24-Hour Economy framework. Venture portfolios are structured with flexible capital allocation so resources shift between sectors as conditions change. Quarterly recalibration cycles ensure we're never locked into yesterday's assumptions.",
              },
            ].map((value, index) => {
              const isFlipped = flippedValue === index;
              return (
                <div
                  key={index}
                  className="value-card"
                  onClick={() => setFlippedValue(isFlipped ? null : index)}
                  style={{
                    minHeight: "480px",
                  }}
                >
                  <div className={`value-card-inner${isFlipped ? " flipped" : ""}`}>
                    {/* ── FRONT ── */}
                    <div
                      className="value-card-front"
                      style={{
                        backgroundColor: value.highlighted ? colors.accent : colors.white,
                        border: value.highlighted ? `3px solid ${colors.accent}` : `1.5px dashed ${colors.line}`,
                      }}
                    >
                      {/* Icon Area - Top */}
                      <div
                        style={{
                          padding: "36px 36px 60px",
                          flex: "1",
                          display: "flex",
                          alignItems: "flex-start",
                        }}
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

                      {/* Content Area - Bottom */}
                      <div
                        style={{
                          backgroundColor: colors.background,
                          borderRadius: "20px",
                          margin: "0 20px 20px 20px",
                          padding: "28px",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "22px",
                            fontWeight: "600",
                            color: colors.primary,
                            fontFamily: "Inter, sans-serif",
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

                    {/* ── BACK ── */}
                    <div
                      className="value-card-back"
                      style={{
                        backgroundColor: colors.primary,
                        padding: "36px",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            letterSpacing: "1.5px",
                            color: colors.accent,
                            textTransform: "uppercase",
                            fontFamily: "Inter, sans-serif",
                            display: "block",
                            marginBottom: "24px",
                          }}
                        >
                          In Practice
                        </span>
                        <p
                          style={{
                            fontSize: "14px",
                            lineHeight: "1.75",
                            color: "rgba(255,255,255,0.75)",
                            fontFamily: "Inter, sans-serif",
                            margin: 0,
                          }}
                        >
                          {value.back}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════════
          SECTION 5: CTA BANNER
          ═══════════════════════════════════════════ */}

      <section
        style={{
          padding: "40px 80px 100px",
          backgroundColor: colors.white,
        }}
      >
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
            borderRadius: "32px",
            overflow: "hidden",
            position: "relative",
            height: "450px",
            backgroundColor: "#3D4F4F",
            backgroundImage: "linear-gradient(135deg, #3D4F4F 0%, #2D3D3D 100%)",
          }}
        >
          {/* Placeholder overlay to simulate image */}
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

          {/* Icon Badge - Top Left */}
          <div
            style={{
              position: "absolute",
              top: "32px",
              left: "32px",
              width: "56px",
              height: "56px",
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

          {/* Bottom Content */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "32px",
              right: "32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            {/* Headline */}
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "32px",
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

            {/* CTA Button */}
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
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
              }}
            >
              Get Involved
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: colors.white,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════════
          SECTION 6: SECTORS
          ═══════════════════════════════════════════ */}

      <section
        style={{
          padding: "100px 80px",
          backgroundColor: colors.white,
        }}
      >
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "60px" }}>
            {/* Pill Badge */}
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

            {/* Headline — Bold/Light Mix */}
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "48px",
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

          {/* Two Column Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
            }}
          >
            {/* Left Column - Radar Chart */}
            <div
              style={{
                width: "100%",
                height: "600px",
                position: "relative",
                marginTop: "-20px",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="46%" outerRadius="68%" data={sectorData}>
                  <PolarGrid stroke="#e5e7eb" strokeWidth={1} />
                  <PolarAngleAxis
                    dataKey="sector"
                    tick={{ fill: "#666", fontSize: 12, fontWeight: 400, fontFamily: "Inter, sans-serif" }}
                    tickLine={false}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 35]} tick={false} axisLine={false} />
                  <Radar
                    name="Capital (Conservative)"
                    dataKey="capitalLow"
                    stroke={colors.primary}
                    fill={colors.primary}
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Capital (Optimistic)"
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
                            <p style={{ fontWeight: "600", color: colors.dark, fontSize: "13px", margin: "0 0 8px 0" }}>
                              {data.fullName}
                            </p>
                            <p style={{ fontSize: "12px", color: colors.primary, margin: "0 0 4px 0" }}>
                              Capital (Conservative): ${data.capitalLow}M
                            </p>
                            <p style={{ fontSize: "12px", color: "#7CB342", margin: "0 0 4px 0" }}>
                              Capital (Optimistic): ${data.capitalHigh}M
                            </p>
                            <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>Ventures: {data.ventures}+</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Right Column - Sectors Accordion */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {sectorData.slice(0, 6).map((sector, index) => {
                const isOpen = openSector === index;
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: isOpen ? colors.primary : colors.white,
                      borderRadius: "14px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      border: isOpen ? `1.5px solid ${colors.primary}` : `1.5px solid ${colors.line}`,
                    }}
                    onClick={() => setOpenSector(isOpen ? null : index)}
                  >
                    {/* Header */}
                    <div
                      className="sector-row"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px 20px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
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

                    {/* Body */}
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
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "12px",
                        }}
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
                            Conservative
                          </p>
                          <p
                            style={{
                              fontSize: "20px",
                              fontWeight: "700",
                              color: colors.white,
                              fontFamily: "Inter, sans-serif",
                              margin: 0,
                            }}
                          >
                            ${sector.capitalLow}M
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
                            Optimistic
                          </p>
                          <p
                            style={{
                              fontSize: "20px",
                              fontWeight: "700",
                              color: colors.accent,
                              fontFamily: "Inter, sans-serif",
                              margin: 0,
                            }}
                          >
                            ${sector.capitalHigh}M
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
                            Ventures
                          </p>
                          <p
                            style={{
                              fontSize: "20px",
                              fontWeight: "700",
                              color: colors.white,
                              fontFamily: "Inter, sans-serif",
                              margin: 0,
                            }}
                          >
                            {sector.ventures}+
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* View All Sectors */}
              <div
                className="sector-row"
                style={{
                  backgroundColor: colors.white,
                  borderRadius: "14px",
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  border: `1.5px solid ${colors.line}`,
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: colors.primary,
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
                  stroke={colors.primary}
                  strokeWidth="2"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════════
          SECTION 7: TRUSTED PARTNER
          ═══════════════════════════════════════════ */}

      <section
        style={{
          padding: "100px 80px",
          backgroundColor: colors.background,
        }}
      >
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {/* Left - Image */}
          <div
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              backgroundColor: "#3D4F4F",
              minHeight: "500px",
            }}
          >
            {/* Image placeholder */}
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

            {/* Logo Badge - Bottom Right */}
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                right: "24px",
                backgroundColor: colors.white,
                borderRadius: "16px",
                padding: "16px 24px",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <svg viewBox="0 0 1304.33 379.5" height="36" style={{ display: "block" }}>
                <defs>
                  <style>{`.pbc-1{fill:#1b4d3e;}.pbc-2,.pbc-3{fill:#b8d935;}.pbc-4{fill:none;stroke-width:25px;}.pbc-4,.pbc-3{stroke:#1b4d3e;stroke-miterlimit:10;}`}</style>
                </defs>
                <rect className="pbc-4" x="12.5" y="12.5" width="351.01" height="354.5" rx="36.55" ry="36.55" />
                <polygon
                  className="pbc-3"
                  points="296.41 129.84 188.14 184.19 79.87 130.1 187.69 75.93 296.41 129.84"
                />
                <path
                  className="pbc-1"
                  d="M78.15,173.37c1.61-.22,2.93.35,4.47.59l105.04,52.27c35.16-16.64,69.74-34.87,104.77-51.92,13.78-4.78,20.83,14.2,7.72,20.43l-107.82,53.69c-4.23,1.55-5.88,1.07-9.92-.54l-109.9-55.31c-7.09-5.99-3.31-17.97,5.66-19.19h0l-.02-.02Z"
                />
                <path
                  className="pbc-2"
                  d="M77.07,227.95c1.52-.26,3.08-.17,4.61-.09,35.82,16.83,70.87,35.37,106.46,52.73l105.2-52.41c12.28-3,18.9,11.92,9.27,19.34l-112.48,55.91-3.59.13c-38.1-17.56-75.31-37.38-113.01-55.91-7.79-5.02-5.53-18.13,3.54-19.7h0Z"
                />
                <path
                  className="pbc-1"
                  d="M484.25,27.98h38.89v7.35h-38.89v-7.35ZM484.25,42.67h38.89v14.26h-38.89v-14.26ZM484.25,64.27h38.89v14.26h-38.89v-14.26ZM484.25,85.88h38.89v14.26h-38.89v-14.26ZM484.25,107.48h38.89v14.26h-38.89v-14.26ZM484.25,129.08h38.89v14.26h-38.89v-14.26ZM484.25,150.69h38.89v13.83h-38.89v-13.83ZM484.25,171.86h38.89v14.26h-38.89v-14.26ZM484.25,193.47h38.89v14.26h-38.89v-14.26ZM484.25,215.07h38.89v14.26h-38.89v-14.26ZM484.25,236.67h38.89v14.26h-38.89v-14.26ZM484.25,258.28h38.89v14.26h-38.89v-14.26ZM484.25,279.88h38.89v14.26h-38.89v-14.26ZM484.25,301.49h38.89v14.26h-38.89v-14.26ZM484.25,323.09h38.89v14.26h-38.89v-14.26ZM484.25,344.69h38.89v7.35h-38.89v-7.35ZM536.96,27.98h76.91c15.55,0,30.25,2.16,43.64,7.35h-120.55v-7.35ZM536.96,42.67h136.54c7.35,3.89,14.26,8.64,20.74,14.26h-157.28v-14.26ZM536.96,70.75h76.91c35.43,0,64.38,29.81,64.38,65.24s-28.95,65.25-64.38,65.25h-76.91V70.75ZM536.96,215.07h157.28c-6.48,5.62-13.39,10.37-20.74,14.26h-136.54v-14.26ZM536.96,236.67h120.55c-13.39,5.18-28.09,7.78-43.64,7.78h-38.02v107.59h-38.89v-115.37ZM639.37,136c0-22.04-16.85-31.54-35-31.54h-29.38v63.08h29.38c18.15,0,35-9.51,35-31.54ZM646.71,64.27h55.31c4.32,3.89,8.21,8.64,11.67,14.26h-46.23c-6.05-5.62-13.39-10.8-20.74-14.26ZM667.45,193.47h46.23c-3.46,5.18-7.35,9.94-11.67,14.26h-55.31c7.35-3.46,14.69-8.64,20.74-14.26ZM673.93,85.88h44.5c3.02,4.32,5.18,9.07,6.91,14.26h-41.91c-2.59-5.19-5.62-9.94-9.51-14.26ZM683.44,171.86h41.91l-6.91,14.26h-44.5c3.89-4.32,6.91-9.07,9.51-14.26ZM686.9,107.48h40.62c1.73,4.75,3.02,9.51,3.46,14.26h-40.18c-.86-4.75-2.16-9.5-3.89-14.26ZM690.79,150.69h40.18c-.43,4.75-1.73,9.51-3.46,13.83h-40.62c1.73-4.32,3.02-9.07,3.89-13.83ZM691.65,129.08h40.18c.43,4.75.43,9.51-.43,14.26h-39.75c.86-4.75.86-9.51,0-14.26Z"
                />
                <path
                  className="pbc-1"
                  d="M754.73,27.98h38.89v7.35h-38.89v-7.35ZM754.73,42.67h38.89v14.26h-38.89v-14.26ZM754.73,64.27h38.89v14.26h-38.89v-14.26ZM754.73,85.88h38.89v14.26h-38.89v-14.26ZM754.73,107.48h38.89v14.26h-38.89v-14.26ZM754.73,129.08h38.89v14.26h-38.89v-14.26ZM754.73,150.69h38.89v13.83h-38.89v-13.83ZM754.73,171.86h38.89v14.26h-38.89v-14.26ZM754.73,193.47h38.89v14.26h-38.89v-14.26ZM754.73,215.07h38.89v14.26h-38.89v-14.26ZM754.73,236.67h38.89v14.26h-38.89v-14.26ZM754.73,258.28h38.89v14.26h-38.89v-14.26ZM754.73,279.88h38.89v14.26h-38.89v-14.26ZM754.73,301.49h38.89v14.26h-38.89v-14.26ZM754.73,323.09h38.89v14.26h-38.89v-14.26ZM754.73,344.69h38.89v7.35h-38.89v-7.35ZM807.44,27.98h56.6c15.55,0,30.68,2.59,44.5,7.35h-101.11v-7.35ZM807.44,42.67h117.53c7.34,3.89,14.26,8.64,19.88,14.26h-137.4v-14.26ZM807.44,70.75h56.6c29.38,0,52.28,15.99,52.28,43.64,0,46.67-52.71,79.94-108.88,92.47V70.75ZM895.59,180.94c21.6,12.53,45.37,41.48,45.37,73.02,0,29.38-19.88,55.31-57.47,55.31h-76.05v-89.01c30.68-6.05,65.25-19.88,88.15-39.32ZM807.44,323.09h155.98c-5.62,5.62-12.53,10.37-19.88,14.26h-136.11v-14.26ZM807.44,344.69h119.69c-13.39,4.75-28.09,7.35-43.64,7.35h-76.05v-7.35ZM881.76,117.42c0-9.51-8.21-16.42-19.44-16.42h-20.31v62.65c24.63-11.67,39.75-28.08,39.75-46.23ZM896.45,220.26c-16.42,9.51-35.43,17.28-54.44,23.33v35.43h39.75c23.76,0,33.7-22.47,14.69-58.76ZM898.18,64.27h53.58c3.89,4.32,6.91,9.07,9.51,14.26h-44.07c-5.18-6.05-11.67-10.8-19.01-14.26ZM907.25,171.86h48.39c4.75,4.75,9.07,9.51,12.96,14.26h-44.5c-5.19-5.62-11.23-10.37-16.85-14.26ZM921.08,150.69h38.02c-2.59,5.18-5.62,9.94-9.07,13.83h-38.46c3.46-4.32,6.91-9.07,9.51-13.83ZM936.64,301.49h44.5c-3.02,5.18-6.48,9.94-10.8,14.26h-52.71c7.35-3.89,13.83-8.64,19.01-14.26ZM922.38,85.88h41.91c1.73,3.46,3.46,9.07,3.89,14.26h-39.75c-1.3-5.19-3.46-9.94-6.05-14.26ZM928.43,129.08h38.46c-.86,5.19-2.16,9.94-4.32,14.26h-38.02c1.73-4.75,3.02-9.51,3.89-14.26ZM929.72,107.48h38.89c.43,4.75.43,9.51-.43,14.26h-38.46c.86-3.89.86-10.37,0-14.26ZM931.02,193.47h42.78c3.02,4.32,6.05,9.51,8.21,14.26h-41.05c-3.02-5.19-6.48-9.94-9.94-14.26ZM950.03,279.88h40.18c-.86,4.75-2.59,9.51-5.18,14.26h-42.34c3.02-4.32,5.62-9.07,7.35-14.26ZM944.84,215.07h40.62c2.16,4.75,3.89,9.51,4.75,14.26h-39.32c-1.73-4.75-3.46-9.51-6.05-14.26ZM954.35,258.28h39.32c0,4.75-.43,9.51-1.73,14.26h-39.75c1.3-4.75,2.16-9.51,2.16-14.26ZM952.62,236.67h39.32c1.3,4.75,1.73,9.51,1.73,14.26h-38.89c-.43-4.75-.86-9.51-2.16-14.26Z"
                />
                <path
                  className="pbc-1"
                  d="M1006.63,171.86h39.75l-.86,14.26h-39.75c0-4.32.43-9.94.86-14.26ZM1005.76,193.47h39.75c0,4.32.43,9.51.86,14.26h-39.75c-.43-4.32-.86-9.94-.86-14.26ZM1010.51,150.69h40.18c-1.3,4.75-2.16,8.64-3.02,13.83h-40.18c.86-4.75,1.73-9.07,3.02-13.83ZM1007.49,215.07h40.18c.86,5.19,1.73,9.51,3.02,14.26h-40.18c-1.3-4.75-2.16-9.51-3.02-14.26ZM1017.43,129.08h41.05c-2.16,4.75-3.89,9.51-5.62,14.26h-40.62c1.3-4.75,3.02-9.51,5.18-14.26ZM1012.24,236.67h40.62c1.73,4.75,3.46,9.51,5.62,14.26h-41.05c-2.16-4.75-3.89-9.51-5.18-14.26ZM1027.8,107.48h42.78l-8.64,14.26h-41.48c2.16-4.75,4.32-9.07,7.35-14.26ZM1020.45,258.28h41.48l8.64,14.26h-42.78c-3.02-5.19-5.19-9.51-7.35-14.26ZM1042.49,85.88h46.67c-4.75,4.32-9.51,9.51-12.96,14.26h-44.07c2.59-4.32,6.48-9.51,10.37-14.26ZM1032.12,279.88h44.07c3.46,4.75,8.21,9.94,12.96,14.26h-46.67c-3.89-4.75-7.78-9.94-10.37-14.26ZM1062.8,64.27h56.17c-7.35,3.89-14.69,8.64-21.6,14.26h-48.83c4.75-5.18,9.51-9.94,14.26-14.26ZM1048.54,301.49h48.83c6.91,5.62,14.26,10.37,21.6,14.26h-56.17c-4.75-4.32-9.51-9.07-14.26-14.26ZM1059.34,190.01c0-70.86,53.58-127.03,120.55-127.03,38.46,0,72.16,18.15,94.19,47.1l-22.47,28.09c-15.99-24.2-41.91-39.75-71.73-39.75-44.94,0-80.8,39.75-80.8,91.6s35.86,91.6,80.8,91.6c29.81,0,55.74-15.55,71.73-39.75l22.47,28.09c-22.04,28.95-55.74,47.1-94.19,47.1-66.97,0-120.55-56.17-120.55-127.03ZM1093.91,42.67h171.97c7.78,4.32,15.12,9.07,22.04,14.26h-63.52c-14.26-5.19-28.95-7.78-44.5-7.78s-30.25,2.59-44.5,7.78h-63.52c6.91-5.18,14.26-9.94,22.04-14.26ZM1071.87,323.09h63.52c14.26,5.18,28.95,7.78,44.5,7.78s30.25-2.59,44.5-7.78h63.52c-6.91,5.18-14.26,9.94-22.04,14.26h-171.97c-7.78-4.32-15.12-9.07-22.04-14.26ZM1179.89,21.06c25.49,0,49.26,5.18,70.86,14.26h-141.72c21.6-9.07,45.37-14.26,70.86-14.26ZM1109.03,344.69h141.72c-21.6,9.07-45.37,14.26-70.86,14.26s-49.26-5.18-70.86-14.26ZM1240.81,64.27h56.17l7.35,6.91-5.62,7.35h-36.29c-6.91-5.62-14.26-10.37-21.6-14.26ZM1262.42,301.49h36.29l5.62,6.91c-2.16,2.59-4.75,5.19-7.35,7.35h-56.17c7.35-3.89,14.69-8.64,21.6-14.26ZM1270.63,85.88h22.47l-10.37,12.96c-3.46-4.32-7.78-9.07-12.1-12.96ZM1282.73,281.18l10.37,12.96h-22.47c4.32-3.89,8.64-8.64,12.1-12.96Z"
                />
              </svg>
            </div>
          </div>

          {/* Right - Lime Card */}
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
            {/* Top Content */}
            <div>
              {/* Pill Badge */}
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

              {/* Headline — Bold/Light Mix */}
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

            {/* Bottom Content */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              {/* Description */}
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

              {/* CTA Button — right-aligned */}
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════════
          SECTION 8: INSIGHTS
          ═══════════════════════════════════════════ */}

      <section
        style={{
          padding: "100px 80px",
          backgroundColor: colors.background,
        }}
      >
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
          }}
        >
          {/* Header — Centered */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "60px",
            }}
          >
            {/* Pill Badge */}
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

            {/* Headline */}
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "48px",
                fontWeight: "300",
                lineHeight: "1.2",
                color: colors.primary,
                margin: "0 0 16px 0",
                letterSpacing: "-0.5px",
              }}
            >
              Our <span style={{ fontWeight: "700" }}>Latest</span>{" "}
              <span style={{ fontWeight: "700", color: colors.accent }}>Insights</span>
            </h2>

            {/* Subtext */}
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

          {/* Carousel — Infinite Loop */}
          <div
            style={{ overflow: "hidden", cursor: "grab" }}
            onMouseEnter={(e) => {
              const track = e.currentTarget.querySelector(".insight-track");
              if (track) (track as HTMLElement).style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              const track = e.currentTarget.querySelector(".insight-track");
              if (track) (track as HTMLElement).style.animationPlayState = "running";
            }}
          >
            <div
              className="insight-track"
              style={{
                display: "flex",
                gap: "24px",
                animation: `insightScroll ${insights.length * 6}s linear infinite`,
                width: "fit-content",
              }}
            >
              {/* Double the items for seamless loop */}
              {[...insights, ...insights].map((insight, index) => {
                const realIndex = index % insights.length;
                return (
                  <div
                    key={index}
                    style={{
                      flex: "0 0 500px",
                      backgroundColor: hoveredInsight === index ? colors.accent : "#ECEEE9",
                      borderRadius: "24px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={() => setHoveredInsight(index)}
                    onMouseLeave={() => setHoveredInsight(null)}
                  >
                    {/* Image */}
                    <div
                      style={{
                        backgroundColor: "#3D4F4F",
                        minHeight: "320px",
                        borderRadius: "20px",
                        margin: "16px 0 16px 16px",
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

                    {/* Content */}
                    <div
                      style={{
                        padding: "32px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        position: "relative",
                      }}
                    >
                      {/* Notch decoration */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: "60px",
                          height: "60px",
                        }}
                      >
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

                      {/* Top */}
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
                            fontSize: "22px",
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

                      {/* Arrow Button */}
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
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "48px" }}>
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
              More Insights
            </button>
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════════
          SECTION 9: ALIGNED WITH GOVERNMENT PRIORITIES
          ═══════════════════════════════════════════ */}

      <section
        style={{
          padding: "80px 80px 120px",
          backgroundColor: colors.white,
        }}
      >
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
          }}
        >
          {/* Line with centered badge */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "60px",
            }}
          >
            {/* Left line */}
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: colors.line,
              }}
            />

            {/* Pill Badge */}
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
                margin: "0 24px",
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
              Aligned With Government Priorities
            </div>

            {/* Right line */}
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: colors.line,
              }}
            />
          </div>

          {/* Government Agencies & Initiatives — Scrolling Marquee */}
          <div style={{ overflow: "hidden", position: "relative" }}>
            {/* Fade edges */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(to right, #FFFFFF, transparent)",
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
                background: "linear-gradient(to left, #FFFFFF, transparent)",
                zIndex: 2,
              }}
            />
            <div
              className="gov-scroll"
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
      {/* ═══════════════════════════════════════════
          SECTION 10: CONTACT + FOOTER
          ═══════════════════════════════════════════ */}

      <section style={{ marginTop: "400px" }}>
        <div
          style={{
            backgroundColor: colors.primary,
            paddingTop: "90px",
          }}
        >
          {/* Floating Contact Card */}
          <div
            style={{
              maxWidth: CONTENT_MAX_WIDTH,
              margin: "0 auto",
              padding: "0 80px",
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
              {/* Left - Form */}
              <div
                style={{
                  backgroundColor: colors.background,
                  padding: "48px",
                }}
              >
                {/* Pill Badge */}
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

                {/* Headline */}
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

                {/* Subtext */}
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "#666",
                    fontFamily: "Inter, sans-serif",
                    margin: "0 0 32px 0",
                  }}
                >
                  Connect with our team to explore partnership opportunities and tailored solutions.
                </p>

                {/* Form Fields */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "16px",
                  }}
                >
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

                {/* Message */}
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

                {/* Submit Button */}
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

              {/* Right - Image */}
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
                [ Image ]{/* Floating Contact Info */}
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
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

          {/* Dark green area for footer */}
          <div style={{ backgroundColor: colors.primary }}>
            {/* Footer */}
            <footer style={{ backgroundColor: colors.primary, padding: "0" }}>
              {/* Main: brand left | links + sector grid right */}
              <div style={{ padding: "64px 80px", display: "grid", gridTemplateColumns: "325px 1fr", gap: "220px" }}>
                {/* LEFT — Brand */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  {/* Top content */}
                  <div>
                    <div style={{ marginBottom: "24px" }}>
                      <BridgeLogoWhite />
                    </div>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "'DM Sans', sans-serif",
                        lineHeight: "1.8",
                        margin: "0 0 28px",
                        maxWidth: "325px",
                      }}
                    >
                      Blending resources and innovation across the integrated sectors for development, growth, and
                      empowerment.
                    </p>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.55)",
                        fontFamily: "'DM Sans', sans-serif",
                        margin: "0 0 4px",
                        lineHeight: "1.7",
                      }}
                    >
                      Accra, Ghana
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: colors.accent,
                        fontFamily: "'DM Sans', sans-serif",
                        margin: "0",
                        fontWeight: "600",
                      }}
                    >
                      info@bridgepbc.com
                    </p>
                  </div>

                  {/* Bottom content — subscribe + social */}
                  <div>
                    <div style={{ marginBottom: "16px", maxWidth: "325px" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "rgba(255,255,255,0.4)",
                          fontFamily: "'DM Sans', sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          display: "block",
                          marginBottom: "12px",
                        }}
                      >
                        Subscribe to Insights
                      </span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          placeholder="Your email address"
                          style={{
                            flex: 1,
                            padding: "12px 16px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,255,255,0.12)",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            color: colors.white,
                            fontSize: "13px",
                            fontFamily: "'DM Sans', sans-serif",
                            outline: "none",
                          }}
                        />
                        <button
                          style={{
                            backgroundColor: colors.accent,
                            color: colors.primary,
                            border: "none",
                            padding: "12px 20px",
                            fontSize: "13px",
                            fontWeight: "700",
                            fontFamily: "'DM Sans', sans-serif",
                            cursor: "pointer",
                            borderRadius: "8px",
                          }}
                        >
                          →
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      {[
                        <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>,
                        <svg key="tw" width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>,
                        <svg key="fb" width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>,
                      ].map((icon, i) => (
                        <a
                          key={i}
                          href="#"
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(255,255,255,0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          {icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT — Links top, sector grid bottom */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  {/* 4 Link columns */}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <h4
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: colors.accent,
                          fontFamily: "'DM Sans', sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          marginBottom: "24px",
                        }}
                      >
                        Company
                      </h4>
                      {["About BRIDGE", "Our Approach", "Sectors", "Contact Us"].map((link) => (
                        <a
                          key={link}
                          href="#"
                          style={{
                            display: "block",
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.6)",
                            fontFamily: "'DM Sans', sans-serif",
                            textDecoration: "none",
                            marginBottom: "14px",
                          }}
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: colors.accent,
                          fontFamily: "'DM Sans', sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          marginBottom: "24px",
                        }}
                      >
                        Services
                      </h4>
                      {[
                        "Research & Guidance",
                        "Venture Development",
                        "Direct Investment",
                        "Strategic Partnerships",
                      ].map((link) => (
                        <a
                          key={link}
                          href="#"
                          style={{
                            display: "block",
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.6)",
                            fontFamily: "'DM Sans', sans-serif",
                            textDecoration: "none",
                            marginBottom: "14px",
                          }}
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: colors.accent,
                          fontFamily: "'DM Sans', sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          marginBottom: "24px",
                        }}
                      >
                        Resources
                      </h4>
                      {["White Paper", "Case Studies", "Research Library", "Data & Reports"].map((link) => (
                        <a
                          key={link}
                          href="#"
                          style={{
                            display: "block",
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.6)",
                            fontFamily: "'DM Sans', sans-serif",
                            textDecoration: "none",
                            marginBottom: "14px",
                          }}
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: colors.accent,
                          fontFamily: "'DM Sans', sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          marginBottom: "24px",
                        }}
                      >
                        Insights
                      </h4>
                      {["Insights & Analysis", "Sector Briefs", "Policy Updates", "Annual Review"].map((link) => (
                        <a
                          key={link}
                          href="#"
                          style={{
                            display: "block",
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.6)",
                            fontFamily: "'DM Sans', sans-serif",
                            textDecoration: "none",
                            marginBottom: "14px",
                          }}
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Sector Grid Widget — bottom-aligned with email field */}
                  <div style={{ marginBottom: "50px" }}>
                    <FooterSectorGrid />
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div
                style={{
                  padding: "20px 80px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  © 2026 BRIDGE PBC · Public Benefit Corporation · All rights reserved
                </span>
                <div style={{ display: "flex", gap: "20px" }}>
                  {["Terms", "Privacy", "Accessibility"].map((link) => (
                    <a
                      key={link}
                      href="#"
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.25)",
                        fontFamily: "'DM Sans', sans-serif",
                        textDecoration: "none",
                      }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
}
