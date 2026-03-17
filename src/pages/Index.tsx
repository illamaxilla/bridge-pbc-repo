import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";
import { FOOTER_SECTOR_ICONS, SECTOR_ROUTES } from "@/data/sectorIcons";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

// ═══════════════════════════════════════════════
// BRIDGE Design System
// ═══════════════════════════════════════════════
import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePageMeta } from "@/hooks/usePageMeta";
const CONTENT_MAX_WIDTH = layout.maxWidth;

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
    <svg width={size} height={size} className="-rotate-90">
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
        className="transition-[stroke-dashoffset] duration-[1.8s] ease-[cubic-bezier(0.4,0,0.2,1)]"
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
      className="h-full rounded-[3px] bg-[#1B4D3E] transition-[width] duration-[0.8s] ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ width: `${width}%` }}
    />
  );
}
// SectorGrid Component (desktop only, exact production spec)
const SectorGrid = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <div
        className="text-xs font-semibold font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] mb-3 transition-colors duration-[250ms] ease-in-out leading-none min-h-[12px]"
        style={{ color: hovered !== null ? colors.accent : "rgba(255,255,255,0.4)" }}
      >
        {hovered !== null ? FOOTER_SECTOR_ICONS[hovered].label : "Explore 12 Sectors"}
      </div>
      <div className="flex justify-between items-center">
        {FOOTER_SECTOR_ICONS.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href={SECTOR_ROUTES[sector.key] ?? "#"}
              title={sector.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center justify-center w-11 h-11 rounded-[10px] cursor-pointer no-underline transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] box-border"
              style={{
                backgroundColor: isH ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isH ? "rgba(184,217,53,0.35)" : "rgba(255,255,255,0.07)"}`,
                transform: isH ? "translateY(-2px)" : "none",
                boxShadow: isH ? "0 6px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(184,217,53,0.15)" : "none",
              }}
            >
              <div
                className="flex items-center justify-center transition-opacity duration-[250ms] ease-in-out"
                style={{ opacity: isH ? 1 : 0.5 }}
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
    <div className="flex items-center h-10">
      <svg viewBox="0 0 4113.9 932.3" height="36" className="block">
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

// ═══════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════

export default function BRIDGEHomePage() {
  usePageMeta({ title: undefined, description: "Institutional-grade investment intelligence across 12 integrated sectors in Ghana. 174+ ventures, sector analysis, policy tracking, and research for investors, government partners, and development organizations." });
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
  const insightScrollRef = useRef<HTMLDivElement>(null);

  const handleInsightScroll = () => {
    if (!insightScrollRef.current) return;
    const { scrollLeft, clientWidth } = insightScrollRef.current;
    setInsightIndex(Math.round(scrollLeft / clientWidth));
  };

  const scrollToInsight = (i: number) => {
    if (!insightScrollRef.current) return;
    insightScrollRef.current.scrollTo({ left: i * insightScrollRef.current.clientWidth, behavior: "smooth" });
  };
  const [hoveredInsight, setHoveredInsight] = useState(null);
  const [valueIndex, setValueIndex] = useState(0);
  const valueTouchStartX = useRef<number | null>(null);
  const [contactStep, setContactStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const insights = [
    { category: "White Paper", title: "BRIDGE Foundational Framework: A Systematic Approach to Ghana's Development", image: "/images/professionals-discussing-charts.jpg" },
    { category: "Infrastructure", title: "Infrastructure & Basic Services: Building the Foundation for Growth", image: "/images/infrastructure-surveyor.webp" },
    { category: "Financial Inclusion", title: "Expanding Access: Financial Systems That Serve Every Ghanaian", image: "/images/professional-research.jpg" },
    { category: "Agriculture", title: "Agriculture & Value Chains: From Farm to Market Excellence", image: "/images/market-woman-produce.png" },
    { category: "Technology", title: "Technology & Innovation: Powering Ghana's Digital Future", image: "/images/professionals-tablet-office.jpg" },
    { category: "Energy", title: "Energy & Renewables: Sustainable Power for a Growing Nation", image: "/images/engineers-automation.jpg" },
    { category: "Health Systems", title: "Health Systems: Quality Care Within Reach", image: "/images/healthcare-pharmacy.jpg" },
    { category: "Education", title: "Education & Skills: Preparing Ghana's Workforce", image: "/images/education-computer-lab.webp" },
  ];

  const desktopInsightScrollRef = useRef<HTMLDivElement>(null);

  const handleDesktopInsightScroll = () => {
    if (!desktopInsightScrollRef.current) return;
    const { scrollLeft, clientWidth } = desktopInsightScrollRef.current;
    const cardWidth = clientWidth * 0.5;
    setInsightIndex(Math.round(scrollLeft / cardWidth));
  };

  const scrollToDesktopInsight = (i: number) => {
    if (!desktopInsightScrollRef.current) return;
    const cardWidth = desktopInsightScrollRef.current.clientWidth * 0.5;
    desktopInsightScrollRef.current.scrollTo({ left: i * cardWidth, behavior: "smooth" });
  };

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
    <Layout>
    <div className="font-[Helvetica,Arial,sans-serif] m-0 p-0" style={{ backgroundColor: colors.white }}>


      <style>{`
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

      {/* HERO */}
      <section style={{ backgroundColor: colors.white, padding: isMobile ? "36px 20px 24px" : "60px 80px 40px 80px" }}>
        <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
          <div
            className="flex justify-between flex-wrap"
            style={{
              alignItems: isMobile ? "flex-start" : "flex-end",
              gap: isMobile ? "24px" : "40px",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <h1
              className="font-[Inter,sans-serif] font-light leading-[1.1] m-0 tracking-[-1px] flex-[0_0_auto] animate-[fadeUp_0.8s_ease-out]"
              style={{
                fontSize: isMobile ? "36px" : "56px",
                color: colors.primary,
              }}
            >
              <span className="font-bold">Insight.</span> Investment.
              <br />
              <span className="font-bold relative inline-block" style={{ color: colors.accent }}>
                Impact.
                <span
                  className="absolute bottom-0.5 left-0 right-0 h-1 rounded-sm opacity-30"
                  style={{ backgroundColor: colors.accent }}
                />
              </span>
            </h1>
            <div
              className="flex gap-3 items-center flex-[0_0_auto] animate-[fadeUp_0.8s_ease-out_0.2s_both]"
              style={{ marginBottom: isMobile ? 0 : "8px" }}
            >
              <a href="/services" className="no-underline">
              <button
                className="cta-primary border-none font-medium font-[Inter,sans-serif] cursor-pointer rounded-[50px] flex items-center gap-2"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  padding: isMobile ? "12px 22px" : "16px 28px",
                  fontSize: isMobile ? "13px" : "14px",
                }}
              >
                Explore Our Work
                <span
                  className="cta-btn-arrow bg-white/20 rounded-full flex items-center justify-center"
                  style={{
                    width: isMobile ? "24px" : "28px",
                    height: isMobile ? "24px" : "28px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </button>
              </a>
              <a href="/login" className="no-underline">
                <button
                  className="cta-secondary bg-transparent font-medium font-[Inter,sans-serif] cursor-pointer rounded-[50px] flex items-center justify-center box-border"
                  style={{
                    color: colors.dark,
                    border: `1.5px solid ${colors.line}`,
                    padding: isMobile ? "12px 22px" : "16px 28px",
                    fontSize: isMobile ? "13px" : "14px",
                    height: isMobile ? "auto" : "60px",
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
      <section className="relative" style={{ margin: isMobile ? "0 20px" : "0 80px" }}>
        <div
          className="overflow-hidden relative"
          style={{
            backgroundColor: colors.background,
            height: isMobile ? "240px" : "560px",
            borderRadius: isMobile ? "16px" : "24px",
          }}
        >
          <img src="/images/hero-accra-skyline.jpg" alt="Accra, Ghana skyline at night" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        {!isMobile && (
          <div
            className="absolute -bottom-[90px] left-0 right-0 mx-auto grid grid-cols-[1.3fr_1fr_1fr] gap-5"
            style={{ maxWidth: CONTENT_MAX_WIDTH }}
          >
            {/* Card 1: Sectors */}
            <div
              className="stat-card rounded-[20px] p-[28px_28px_24px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col gap-4 animate-[fadeUp_0.6s_ease-out_0.3s_both] cursor-default"
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ backgroundColor: colors.white }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div
                    className="text-xs font-semibold tracking-[1.5px] text-[#999] font-[Inter,sans-serif] uppercase mb-1"
                  >
                    Sectors
                  </div>
                  <div
                    className="text-5xl font-bold font-[Inter,sans-serif] leading-none"
                    style={{ color: colors.primary }}
                  >
                    {sectorCount}
                  </div>
                </div>
                <div
                  className="w-20 h-14 rounded-xl flex items-end justify-center p-[10px_10px_8px] gap-1"
                  style={{ backgroundColor: colors.primary }}
                >
                  {[40, 65, 90, 55, 75, 60, 85].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-t-[3px]"
                      style={{
                        height: `${hoveredCard === 0 ? h : h * 0.6}%`,
                        backgroundColor: i === 2 || i === 6 ? colors.accent : "rgba(184,217,53,0.35)",
                        transition: `height 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 pt-3"
                style={{ borderTop: `1px solid ${colors.line}` }}
              >
                {heroSectorIcons.map((s, i) => (
                  <div
                    key={i}
                    className="sector-dot w-8 h-8 rounded-full flex items-center justify-center text-[9px] text-white font-bold font-[Inter,sans-serif] tracking-[0.3px] cursor-pointer relative"
                    title={s.label}
                    style={{ backgroundColor: s.color }}
                  >
                    {s.label.substring(0, 2).toUpperCase()}
                  </div>
                ))}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm text-[#999] font-medium"
                  style={{ border: `2px dashed ${colors.line}` }}
                >
                  +6
                </div>
                <div className="ml-auto">
                  <div
                    className="flex items-center gap-1.5 text-[13px] font-semibold font-[Inter,sans-serif] cursor-pointer"
                    style={{ color: colors.primary }}
                  >
                    Explore
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: colors.accent }}
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
              className="stat-card rounded-[20px] p-[28px_28px_24px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col justify-between animate-[fadeUp_0.6s_ease-out_0.5s_both] cursor-default"
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ backgroundColor: colors.white }}
            >
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <div
                      className="text-xs font-semibold tracking-[1.5px] text-[#999] font-[Inter,sans-serif] uppercase mb-1"
                    >
                      Ventures
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-5xl font-bold font-[Inter,sans-serif] leading-none"
                        style={{ color: colors.primary }}
                      >
                        {ventureCount}
                      </span>
                      <span
                        className="text-2xl font-normal font-[Inter,sans-serif]"
                        style={{ color: colors.accent }}
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <ProgressRing
                      progress={hoveredCard === 1 ? 92 : 78}
                      size={56}
                      strokeWidth={5}
                      color={colors.accent}
                      bgColor={colors.background}
                    />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
                className="pt-4 mt-4 flex items-end justify-between"
                style={{ borderTop: `1px solid ${colors.line}` }}
              >
                <div className="flex items-end gap-1 h-10">
                  {[28, 42, 35, 55, 48, 65, 58, 78, 72, 90, 85, 100].map((h, i) => (
                    <div
                      key={i}
                      className="w-2 rounded-sm transition-[height] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                      style={{
                        height: `${(hoveredCard === 1 ? h : h * 0.55) * 0.4}px`,
                        backgroundColor: i >= 10 ? colors.accent : colors.primary,
                        opacity: i < 4 ? 0.3 : i < 8 ? 0.6 : 1,
                        transitionDelay: `${i * 40}ms`,
                      }}
                    />
                  ))}
                </div>
                <div
                  className="flex items-center gap-1 bg-[#E8F9E8] px-2.5 py-1 rounded-[20px]"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2.5">
                    <path d="M7 17L17 7" />
                    <path d="M10 7h7v7" />
                  </svg>
                  <span
                    className="text-xs font-bold text-[#2D6A4F] font-[Inter,sans-serif]"
                  >
                    Growing
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Unrealized Potential */}
            <div
              className="stat-card bg-gradient-to-br from-[#E8F4EA] to-[#D4EDDA] rounded-[20px] p-[28px_28px_24px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col justify-between animate-[fadeUp_0.6s_ease-out_0.7s_both] cursor-default relative overflow-hidden"
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="absolute -top-5 -right-5 w-[120px] h-[120px] rounded-full bg-[rgba(27,77,62,0.06)] transition-transform duration-500 ease-in-out"
                style={{ transform: hoveredCard === 2 ? "scale(1.3)" : "scale(1)" }}
              />
              <div className="relative">
                <div className="flex justify-between items-start">
                  <div>
                    <div
                      className="text-xs font-semibold tracking-[1.5px] text-[#666] font-[Inter,sans-serif] uppercase mb-1"
                    >
                      Unrealized Potential
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span
                        className="text-xl font-normal font-[Inter,sans-serif] leading-none"
                        style={{ color: colors.primary }}
                      >
                        $
                      </span>
                      <span
                        className="text-5xl font-bold font-[Inter,sans-serif] leading-none"
                        style={{ color: colors.primary }}
                      >
                        {capitalCount}
                      </span>
                      <span
                        className="text-2xl font-medium font-[Inter,sans-serif] opacity-70"
                        style={{ color: colors.primary }}
                      >
                        B+
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-11 h-11 bg-[rgba(27,77,62,0.1)] rounded-xl flex items-center justify-center"
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
                className="pt-4 border-t border-[rgba(27,77,62,0.12)] mt-4 relative"
              >
                <div
                  className="flex justify-between items-center mb-2"
                >
                  <span
                    className="text-[11px] font-semibold text-[#666] font-[Inter,sans-serif] uppercase tracking-[0.5px]"
                  >
                    Deployment Range
                  </span>
                  <span
                    className="text-xs font-bold font-[Inter,sans-serif]"
                    style={{ color: colors.primary }}
                  >
                    $135M–$259M
                  </span>
                </div>
                <div
                  className="h-2.5 bg-[rgba(27,77,62,0.1)] rounded-[5px] overflow-hidden relative flex"
                >
                  <div
                    className="h-full rounded-l-[5px] transition-[width] duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      width: hoveredCard === 2 ? "52%" : "42%",
                      backgroundColor: colors.primary,
                    }}
                  />
                  <div
                    className="h-full rounded-r-[5px] transition-[width] duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      width: hoveredCard === 2 ? "28%" : "18%",
                      backgroundColor: colors.accent,
                    }}
                  />
                </div>
                <div
                  className="flex justify-between items-center mt-1.5"
                >
                  <span
                    className="text-[10px] font-medium text-[rgba(27,77,62,0.45)] font-[Inter,sans-serif]"
                  >
                    Across 12 sectors
                  </span>
                  <span
                    className="text-[10px] font-semibold font-[Inter,sans-serif] opacity-60"
                    style={{ color: colors.primary }}
                  >
                    ~1.7% unlocks momentum
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <div style={{ height: isMobile ? 24 : 130 }} />

      {/* THE APPROACH */}
      <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 48px" }}>
        <div
          className="mx-auto grid items-stretch"
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
            gap: isMobile ? "40px" : "80px",
          }}
        >
          <div className="flex flex-col h-full self-stretch">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[50px] text-xs font-semibold tracking-[1.5px] font-[Inter,sans-serif] uppercase mb-8 self-start"
              style={{ border: `1px solid ${colors.line}`, color: colors.primary }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: colors.accent }}
              />
              The Approach
            </div>
            <h2
              className="font-[Inter,sans-serif] font-light leading-[1.2] mb-6 tracking-[-0.5px] mt-0 mr-0 ml-0"
              style={{
                fontSize: isMobile ? "30px" : "44px",
                color: colors.primary,
              }}
            >
              We <span className="font-bold">connect</span> the people, institutions, and resources required to
              create{" "}
              <span className="font-bold relative inline" style={{ color: colors.accent }}>
                measurable, lasting impact
              </span>
              .
            </h2>
            <p
              className="text-base leading-[1.7] text-[#666] font-[Inter,sans-serif] mt-0 mr-0 mb-9 ml-0 max-w-[420px]"
            >
              BRIDGE works across 12 sectors — linking capital to opportunity, expertise to need, and building the
              connections that turn fragmented potential into shared prosperity.
            </p>
            {!isMobile && (
              <a href="/methodology" className="no-underline">
              <button
                className="cta-approach border-none p-[16px_32px] text-[15px] font-medium font-[Inter,sans-serif] cursor-pointer rounded-[50px] flex items-center gap-2.5 mt-auto self-start"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                }}
              >
                See How It Works
                <span
                  className="cta-arrow w-7 h-7 bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
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
            <div className="flex gap-2 mb-7">
              {["identification", "connection", "engagement"].map((tab, i) => (
                <button
                  key={tab}
                  className="approach-tab flex-1 font-[Inter,sans-serif] capitalize cursor-pointer rounded-xl flex items-center justify-center"
                  onClick={() => handleTabChange(tab)}
                  style={{
                    padding: isMobile ? "12px 10px" : "16px 20px",
                    fontSize: isMobile ? "12px" : "14px",
                    fontWeight: activeTab === tab ? "700" : "500",
                    border: activeTab === tab ? `2px solid ${colors.primary}` : `1px solid ${colors.line}`,
                    backgroundColor: activeTab === tab ? "rgba(27, 77, 62, 0.04)" : "transparent",
                    color: activeTab === tab ? colors.primary : "#888",
                    gap: isMobile ? "6px" : "10px",
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center font-[Inter,sans-serif] transition-all duration-300 ease-in-out shrink-0"
                    style={{
                      backgroundColor: activeTab === tab ? colors.accent : colors.background,
                      color: activeTab === tab ? colors.primary : "#999",
                    }}
                  >
                    {i + 1}
                  </span>
                  {!isMobile && tab}
                </button>
              ))}
            </div>

            <div
              className="rounded-[20px] transition-all duration-200 ease-in-out"
              style={{
                backgroundColor: colors.background,
                padding: isMobile ? "24px 20px" : "32px",
                opacity: tabTransition ? 0 : 1,
                transform: tabTransition ? "translateY(8px)" : "translateY(0)",
              }}
            >
              <div className="flex gap-4 mb-7 items-start">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                  style={{ backgroundColor: colors.white }}
                >
                  {current.icon}
                </div>
                <p
                  className="leading-[1.7] font-[Inter,sans-serif] m-0"
                  style={{
                    fontSize: isMobile ? "14px" : "17px",
                    color: colors.dark,
                  }}
                >
                  {current.text}
                </p>
              </div>
              <div
                className="grid grid-cols-3 mb-7"
                style={{ gap: isMobile ? "8px" : "16px" }}
              >
                {current.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-[14px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-default"
                    style={{
                      backgroundColor: colors.white,
                      padding: isMobile ? "14px 10px" : "18px 16px",
                    }}
                  >
                    <div
                      className="font-bold font-[Inter,sans-serif] leading-none mb-1.5"
                      style={{
                        fontSize: isMobile ? "20px" : "24px",
                        color: colors.primary,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="font-semibold text-[#999] font-[Inter,sans-serif] uppercase tracking-[0.5px]"
                      style={{ fontSize: isMobile ? "9px" : "11px" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3.5">
                {current.progressItems.map((item, i) => (
                  <div
                    key={`${activeTab}-${i}`}
                    className="flex items-center"
                    style={{ gap: isMobile ? "10px" : "14px" }}
                  >
                    <span
                      className="font-semibold text-[#666] font-[Inter,sans-serif]"
                      style={{
                        fontSize: isMobile ? "11px" : "12px",
                        minWidth: isMobile ? "100px" : "140px",
                      }}
                    >
                      {item.label}
                    </span>
                    <div
                      className="flex-1 h-1.5 bg-[rgba(27,77,62,0.08)] rounded-[3px] overflow-hidden"
                    >
                      <ProgressBar pct={item.pct} delay={i * 150} key={`${activeTab}-bar-${i}`} />
                    </div>
                    <span
                      className="text-xs font-bold font-[Inter,sans-serif] min-w-8 text-right"
                      style={{ color: colors.primary }}
                    >
                      {item.pct}%
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="flex items-center justify-center gap-1.5 mt-6 pt-5 border-t border-[rgba(27,77,62,0.06)]"
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    onClick={() => handleTabChange(["identification", "connection", "engagement"][i])}
                    className="h-2 rounded cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      width: tabIndex === i ? "24px" : "8px",
                      backgroundColor: tabIndex === i ? colors.primary : tabIndex > i ? colors.accent : colors.line,
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
            className="mx-auto box-border"
            style={{
              maxWidth: CONTENT_MAX_WIDTH,
              padding: isMobile ? "0 24px" : "0 80px",
            }}
          >
            <div
              className="flex justify-between items-start"
              style={{
                marginBottom: isMobile ? "32px" : "50px",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "20px" : "0",
              }}
            >
              <div>
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/25 rounded-[50px] text-xs font-semibold tracking-[1.5px] font-[Inter,sans-serif] uppercase mb-6"
                  style={{ color: colors.white }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: colors.accent }}
                  />
                  Services
                </div>
                <h2
                  className="font-[Inter,sans-serif] font-light leading-[1.2] m-0 tracking-[-0.5px] max-w-[600px]"
                  style={{
                    fontSize: isMobile ? "28px" : "44px",
                    color: colors.white,
                  }}
                >
                  How We <span className="font-bold" style={{ color: colors.accent }}>Bridge the Gap</span> from
                  Opportunity to Impact
                </h2>
              </div>
              <a href="/methodology" className="no-underline">
              <button
                className="cta-learn-more border-none font-semibold font-[Inter,sans-serif] cursor-pointer rounded-[50px] flex items-center gap-2.5"
                style={{
                  backgroundColor: colors.white,
                  color: colors.primary,
                  padding: isMobile ? "12px 24px" : "16px 32px",
                  fontSize: isMobile ? "13px" : "15px",
                  marginTop: isMobile ? "0" : "60px",
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
                  image: "/images/professional-research.jpg",
                },
                {
                  name: "Ventures",
                  description: "174+ designed initiatives spanning infrastructure to creative industries.",
                  image: "/images/professional-ventures.jpg",
                },
                {
                  name: "Investment",
                  description: "$135M–$259M in indicative capital across diversified deployment strategies.",
                  image: "/images/professionals-tablet-office.jpg",
                },
                {
                  name: "Partnerships",
                  description:
                    "Strategic alliances with government, traditional authorities, and development partners.",
                  image: "/images/strategy-meeting-african.jpg",
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
                      <div className="relative" style={{ height: isMobile ? "160px" : "200px" }}>
                        <div
                          className="absolute top-2.5 left-1/2 -translate-x-1/2 bg-white/30 rounded-[50%_50%_50%_50%/60%_60%_40%_40%]"
                          style={{
                            width: isMobile ? "140px" : "180px",
                            height: isMobile ? "140px" : "180px",
                          }}
                        />
                        <img
                          src={service.image}
                          alt={service.name}
                          className="absolute top-[30px] left-1/2 -translate-x-1/2 rounded-full border-4 border-white/50 object-cover"
                          style={{
                            width: isMobile ? "110px" : "140px",
                            height: isMobile ? "110px" : "140px",
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className="font-semibold font-[Inter,sans-serif]"
                          style={{
                            fontSize: isMobile ? "15px" : "18px",
                            color: colors.primary,
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
                            className="w-11 h-11 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: colors.white }}
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
                          className="font-[800] font-[Inter,sans-serif] text-[rgba(184,217,53,0.15)] leading-none block mb-3"
                          style={{ fontSize: isMobile ? "48px" : "64px" }}
                        >
                          0{index + 1}
                        </span>
                        <h3
                          className="font-bold font-[Inter,sans-serif] m-[0_0_12px_0]"
                          style={{
                            fontSize: isMobile ? "20px" : "24px",
                            color: colors.white,
                          }}
                        >
                          {service.name}
                        </h3>
                        <p
                          className="leading-[1.7] text-white/70 font-[Inter,sans-serif] m-0"
                          style={{ fontSize: isMobile ? "13px" : "15px" }}
                        >
                          {service.description}
                        </p>
                      </div>
                      {!isMobile && (
                        <div className="flex justify-end">
                          <div
                            className="w-11 h-11 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: colors.accent }}
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
        <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
          <div style={{ textAlign: isMobile ? "left" : "center", marginBottom: isMobile ? "28px" : "60px" }}>
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[50px] text-xs font-semibold tracking-[1.5px] font-[Inter,sans-serif] uppercase mb-6"
              style={{ border: `1px solid ${colors.line}`, color: colors.primary }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: colors.accent }}
              />
              Our Values
            </div>
            <h2
              className="font-[Inter,sans-serif] font-light leading-[1.2] m-0 tracking-[-0.5px]"
              style={{
                fontSize: isMobile ? "28px" : "44px",
                color: colors.primary,
              }}
            >
              {isMobile ? (
                <>
                  The <span className="font-bold">Principles</span> &{" "}
                  <span className="font-bold">Foundation</span> Behind Every{" "}
                  <span className="font-bold" style={{ color: colors.accent }}>Bridge</span> We Build
                </>
              ) : (
                <>
                  The <span className="font-bold">Principles</span> &{" "}
                  <span className="font-bold">Foundation</span> Behind
                  <br />
                  Every <span className="font-bold" style={{ color: colors.accent }}>Bridge</span> We Build
                </>
              )}
            </h2>
          </div>
          {isMobile ? (
            <>
              <div
                className="overflow-hidden"
                onTouchStart={(e) => { valueTouchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  if (valueTouchStartX.current === null) return;
                  const delta = valueTouchStartX.current - e.changedTouches[0].clientX;
                  if (delta > 40) setValueIndex((v) => Math.min(v + 1, 3));
                  else if (delta < -40) setValueIndex((v) => Math.max(v - 1, 0));
                  valueTouchStartX.current = null;
                }}
              >
                <div
                  className="flex transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ transform: `translateX(-${valueIndex * 100}%)` }}
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
                    <div key={index} className="flex-[0_0_100%] pr-4 box-border">
                      <div
                        className="rounded-3xl flex flex-col min-h-[340px] cursor-default"
                        style={{
                          backgroundColor: value.highlighted ? colors.accent : colors.white,
                          border: value.highlighted ? `3px solid ${colors.accent}` : `1.5px dashed ${colors.line}`,
                        }}
                      >
                        <div className="p-[24px_24px_40px] flex-1 flex items-start">
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
                          className="rounded-2xl m-[0_12px_12px] p-6"
                          style={{ backgroundColor: colors.background }}
                        >
                          <h3
                            className="text-xl font-semibold font-[Inter,sans-serif] m-[0_0_12px_0]"
                            style={{ color: colors.primary }}
                          >
                            {value.title}
                          </h3>
                          <p className="text-sm leading-[1.6] text-[#666] font-[Inter,sans-serif] m-0">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Dot scroll indicators */}
              <div className="flex justify-center items-center gap-2 mt-5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    onClick={() => setValueIndex(i)}
                    className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
                    style={{
                      width: valueIndex === i ? "24px" : "8px",
                      backgroundColor: valueIndex === i ? colors.accent : colors.line,
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-4 gap-6">
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
                  className="value-card rounded-3xl flex flex-col min-h-[400px] cursor-default"
                  style={{
                    backgroundColor: value.highlighted ? colors.accent : colors.white,
                    border: value.highlighted ? `3px solid ${colors.accent}` : `1.5px dashed ${colors.line}`,
                  }}
                >
                  <div className="p-[36px_36px_60px] flex-1 flex items-start">
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
                    className="rounded-[20px] m-[0_16px_16px_16px] p-7"
                    style={{ backgroundColor: colors.background }}
                  >
                    <h3
                      className="text-[22px] font-semibold font-[Inter,sans-serif] m-[0_0_16px_0]"
                      style={{ color: colors.primary }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-[#666] font-[Inter,sans-serif] m-0">
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
          className="mx-auto overflow-hidden relative bg-[#3D4F4F] bg-gradient-to-br from-[#3D4F4F] to-[#2D3D3D]"
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            borderRadius: isMobile ? "24px" : "32px",
            height: isMobile ? "300px" : "450px",
          }}
        >
          <img src="/images/team-collaboration.jpeg" alt="African professionals collaborating" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{
              top: isMobile ? "20px" : "32px",
              left: isMobile ? "20px" : "32px",
              width: isMobile ? "44px" : "56px",
              height: isMobile ? "44px" : "56px",
              backgroundColor: colors.white,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18 9l-5 5-4-4-3 3" />
            </svg>
          </div>
          <div
            className="absolute flex justify-between items-end"
            style={{
              bottom: isMobile ? "20px" : "40px",
              left: isMobile ? "20px" : "32px",
              right: isMobile ? "20px" : "32px",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "8px" : "0",
            }}
          >
            <h3
              className="font-[Inter,sans-serif] font-light m-0 max-w-[500px] leading-[1.3]"
              style={{
                fontSize: isMobile ? "22px" : "32px",
                color: colors.white,
              }}
            >
              Connecting <span className="font-bold">Resources</span>, Building Pathways —{" "}
              <span className="font-bold" style={{ color: colors.accent }}>Join Us!</span>
            </h3>
            <a href="/services" className="no-underline">
            <button
              className="border-none font-semibold font-[Inter,sans-serif] cursor-pointer rounded-[50px] flex items-center shrink-0"
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                padding: isMobile ? "10px 18px" : "16px 32px",
                fontSize: isMobile ? "12px" : "15px",
                gap: isMobile ? "6px" : "10px",
                alignSelf: isMobile ? "flex-end" : "auto",
              }}
            >
              Get Involved
              <span
                className="rounded-full flex items-center justify-center"
                style={{
                  width: isMobile ? "22px" : "28px",
                  height: isMobile ? "22px" : "28px",
                  backgroundColor: colors.white,
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
            </a>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 48px", backgroundColor: colors.white }}>
        <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
          <div style={{ marginBottom: isMobile ? "36px" : "60px" }}>
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[50px] text-xs font-semibold tracking-[1.5px] font-[Inter,sans-serif] uppercase mb-6"
              style={{ border: `1px solid ${colors.line}`, color: colors.primary }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: colors.accent }}
              />
              Sectors
            </div>
            <h2
              className="font-[Inter,sans-serif] font-light leading-[1.15] m-0 tracking-[-0.5px]"
              style={{
                fontSize: isMobile ? "28px" : "48px",
                color: colors.primary,
              }}
            >
              <span className="font-bold">Twelve Integrated Sectors.</span>
              <br />
              One Unified <span className="font-bold" style={{ color: colors.accent }}>Approach</span>.
            </h2>
          </div>
          <div
            className="grid items-start"
            style={{
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "0" : "80px",
            }}
          >
            {!isMobile && (
              <div className="w-full h-[540px] relative -mt-10">
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
                              className="p-[12px_16px] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] font-[Inter,sans-serif]"
                              style={{
                                backgroundColor: colors.white,
                                border: `1px solid ${colors.line}`,
                              }}
                            >
                              <p
                                className="font-semibold text-[13px] m-[0_0_8px_0]"
                                style={{ color: colors.dark }}
                              >
                                {data.fullName}
                              </p>
                              <p className="text-xs m-[0_0_4px_0]" style={{ color: colors.primary }}>
                                Gap: {data.gap}
                              </p>
                              <p className="text-xs text-[#7CB342] m-[0_0_4px_0]">
                                At Stake: {data.market}
                              </p>
                              <p className="text-xs text-[#666] m-0">{data.pathways}</p>
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
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                {sectorData.slice(0, 6).map((sector, index) => {
                  const isOpen = openSector === index;
                  return (
                    <div
                      key={index}
                      className="border-none rounded-[14px] overflow-hidden transition-colors duration-300 ease-in-out cursor-pointer"
                      style={{
                        backgroundColor: isOpen ? colors.primary : colors.background,
                      }}
                      onClick={() => setOpenSector(isOpen ? null : index)}
                    >
                      <div
                        className="sector-row flex justify-between items-center"
                        style={{ padding: isMobile ? "14px 16px" : "16px 20px" }}
                      >
                        <span
                          className="font-[Inter,sans-serif] transition-colors duration-300 ease-in-out"
                          style={{
                            fontSize: isMobile ? "14px" : "15px",
                            fontWeight: isOpen ? "600" : "400",
                            color: isOpen ? colors.white : colors.primary,
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
                          className="shrink-0 transition-[transform,opacity,stroke] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                          style={{
                            opacity: isOpen ? 1 : 0.3,
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                      <div
                        className="overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                        style={{
                          maxHeight: isOpen ? "120px" : "0px",
                          opacity: isOpen ? 1 : 0,
                          padding: isOpen ? "0 20px 18px 20px" : "0 20px",
                        }}
                      >
                        <div
                          className="grid grid-cols-3"
                          style={{ gap: isMobile ? "8px" : "12px" }}
                        >
                          <div>
                            <p className="text-[10px] font-medium text-white/50 font-[Inter,sans-serif] uppercase tracking-[0.5px] m-[0_0_4px_0]">
                              The Gap
                            </p>
                            <p
                              className="font-bold font-[Inter,sans-serif] m-0 leading-[1.2]"
                              style={{
                                fontSize: isMobile ? "14px" : "18px",
                                color: colors.white,
                              }}
                            >
                              {sector.gap}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-white/50 font-[Inter,sans-serif] uppercase tracking-[0.5px] m-[0_0_4px_0]">
                              At Stake
                            </p>
                            <p
                              className="font-bold font-[Inter,sans-serif] m-0 leading-[1.2]"
                              style={{
                                fontSize: isMobile ? "14px" : "18px",
                                color: colors.accent,
                              }}
                            >
                              {sector.market}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-white/50 font-[Inter,sans-serif] uppercase tracking-[0.5px] m-[0_0_4px_0]">
                              Identified
                            </p>
                            <p
                              className="font-bold font-[Inter,sans-serif] m-0 leading-[1.2]"
                              style={{
                                fontSize: isMobile ? "14px" : "18px",
                                color: colors.white,
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
                className="rounded-[14px] flex justify-between items-center no-underline"
                style={{
                  backgroundColor: colors.background,
                  padding: isMobile ? "14px 16px" : "16px 20px",
                }}
              >
                <span
                  className="text-sm font-medium font-[Inter,sans-serif] tracking-[0.3px]"
                  style={{ color: colors.accent }}
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
                  className="shrink-0"
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
          className="mx-auto grid gap-6 items-stretch"
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
          }}
        >
          {isMobile ? (
            <div className="relative rounded-3xl overflow-hidden bg-[#3D4F4F] bg-gradient-to-br from-[#2D3D3D] to-[#3D4F4F] min-h-[360px] flex flex-col justify-start">
              <img src="/images/business-meeting.jpg" alt="African business professionals" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-[1] p-6 flex flex-col h-full flex-1 min-h-[360px]">
                <div className="flex-1">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-[8px] rounded-[50px] text-[11px] font-semibold tracking-[1.5px] font-[Inter,sans-serif] uppercase mb-4"
                    style={{ color: colors.white }}
                  >
                    Trusted Partner
                  </div>
                  <h3
                    className="font-[Inter,sans-serif] text-[28px] font-light leading-[1.2] m-[0_0_12px]"
                    style={{ color: colors.white }}
                  >
                    <span className="font-bold">Public Benefit</span> Corporation
                  </h3>
                  <p className="text-sm leading-[1.6] text-white/75 font-[Inter,sans-serif] m-0">
                    A development engine — identifying opportunities, connecting resources, and initiating ventures.
                  </p>
                </div>
                <div className="flex justify-end mt-5">
                  <a href="/services" className="no-underline">
                    <button
                      className="border-none p-[10px_20px] text-xs font-bold font-[Inter,sans-serif] cursor-pointer rounded-[50px] flex items-center gap-2"
                      style={{
                        backgroundColor: colors.accent,
                        color: colors.primary,
                      }}
                    >
                      Learn More
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="relative rounded-3xl overflow-hidden bg-[#3D4F4F] min-h-[500px]">
                <img src="/images/ghana-buildings-aerial.webp" alt="Accra, Ghana aerial view" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <div
                  className="absolute bottom-6 right-6 rounded-2xl p-[20px_28px] flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                  style={{ backgroundColor: colors.white }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ border: `2px solid ${colors.primary}` }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span
                    className="text-lg font-semibold font-[Inter,sans-serif]"
                    style={{ color: colors.primary }}
                  >
                    PBC
                  </span>
                </div>
              </div>
              <div
                className="rounded-3xl p-12 flex flex-col justify-between"
                style={{ backgroundColor: colors.accent }}
              >
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[50px] text-xs font-semibold tracking-[1.5px] font-[Inter,sans-serif] uppercase mb-6"
                    style={{ backgroundColor: colors.white, color: colors.primary }}
                  >
                    Trusted Partner
                  </div>
                  <h3
                    className="font-[Inter,sans-serif] text-4xl font-light leading-[1.2] m-0"
                    style={{ color: colors.primary }}
                  >
                    <span className="font-bold">Public Benefit</span>
                    <br />
                    Corporation
                  </h3>
                </div>
                <div className="flex flex-col items-start">
                  <p
                    className="text-base leading-[1.6] font-[Inter,sans-serif] mb-8 opacity-85"
                    style={{ color: colors.primary }}
                  >
                    BRIDGE is a development engine — identifying opportunities, connecting resources, and initiating
                    ventures. Let's work together to create a lasting impact.
                  </p>
                  <a href="/services" className="no-underline">
                  <button
                    className="border-none p-[16px_32px] text-[15px] font-semibold font-[Inter,sans-serif] cursor-pointer rounded-[50px] flex items-center gap-2.5 self-end"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.white,
                    }}
                  >
                    Learn More
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: colors.accent }}
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
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* INSIGHTS */}
      <section style={{ padding: isMobile ? "60px 20px" : "100px 48px", backgroundColor: colors.background }}>
        <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
          <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[50px] text-xs font-semibold tracking-[1.5px] font-[Inter,sans-serif] uppercase mb-6"
              style={{ border: `1px solid ${colors.line}`, color: colors.primary }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: colors.accent }}
              />
              Insights
            </div>
            <h2
              className="font-[Georgia,serif] font-normal leading-[1.2] m-[0_0_16px_0] italic"
              style={{
                fontSize: isMobile ? "32px" : "48px",
                color: colors.primary,
              }}
            >
              Our Latest Insights
            </h2>
            <p
              className="text-[17px] leading-[1.6] text-[#666] font-[Inter,sans-serif] m-0 max-w-[600px] mx-auto"
            >
              Deep sector analysis, strategic frameworks, and evidence-based research for those building Ghana's future.
            </p>
          </div>
          {/* Mobile: native swipe scroll-snap */}
          {isMobile ? (
            <>
              <style>{`.insight-snap::-webkit-scrollbar{display:none}`}</style>
              <div
                ref={insightScrollRef}
                onScroll={handleInsightScroll}
                className="insight-snap flex gap-4 overflow-x-auto snap-x snap-mandatory"
                style={{ scrollbarWidth: "none" }}
              >
                {insights.map((insight, index) => (
                  <Link
                    key={index}
                    to="/resources/sector-briefs"
                    className="no-underline flex-[0_0_100%] min-w-full snap-start rounded-[20px] grid grid-cols-1 overflow-hidden cursor-pointer transition-colors duration-300 ease-in-out"
                    style={{
                      backgroundColor: hoveredInsight === index ? colors.accent : "#ECEEE9",
                    }}
                    onMouseEnter={() => setHoveredInsight(index)}
                    onMouseLeave={() => setHoveredInsight(null)}
                  >
                    <div className="bg-[#3D4F4F] min-h-[180px] rounded-2xl m-[12px_12px_0] overflow-hidden">
                      <img src={insight.image} alt={insight.category} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex flex-col justify-between relative">
                      <div className="absolute top-0 right-0 w-[60px] h-[60px]">
                        <div
                          className="absolute top-0 right-0 w-[60px] h-[60px] rounded-bl-[60px]"
                          style={{ backgroundColor: colors.background }}
                        />
                      </div>
                      <div>
                        <span
                          className="text-xs font-semibold tracking-[1.5px] uppercase block mb-4 transition-colors duration-300 ease-in-out"
                          style={{
                            color: hoveredInsight === index ? colors.primary : colors.accent,
                          }}
                        >
                          {insight.category}
                        </span>
                        <h3
                          className="text-lg font-semibold leading-[1.3] font-[Inter,sans-serif] m-0"
                          style={{ color: colors.primary }}
                        >
                          {insight.title}
                        </h3>
                      </div>
                      <div className="self-end mt-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out"
                          style={{
                            backgroundColor: hoveredInsight === index ? colors.primary : colors.white,
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={hoveredInsight === index ? colors.white : colors.primary}
                            strokeWidth="2"
                            className="transition-[stroke] duration-300 ease-in-out"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Mobile dots */}
              <div className="flex justify-center items-center gap-2 mt-6">
                {insights.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => scrollToInsight(i)}
                    className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
                    style={{
                      width: insightIndex === i ? "24px" : "8px",
                      backgroundColor: insightIndex === i ? colors.accent : colors.line,
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Desktop: swipe scroll-snap carousel */}
              <style>{`.insight-desktop-snap::-webkit-scrollbar{display:none}`}</style>
              <div
                ref={desktopInsightScrollRef}
                onScroll={handleDesktopInsightScroll}
                className="insight-desktop-snap flex gap-6 overflow-x-auto snap-x snap-mandatory"
                style={{ scrollbarWidth: "none" }}
              >
                  {insights.map((insight, index) => (
                    <Link
                      key={index}
                      to="/resources/sector-briefs"
                      className="no-underline flex-[0_0_calc(50%-12px)] snap-start rounded-3xl grid grid-cols-2 overflow-hidden cursor-pointer transition-colors duration-300 ease-in-out"
                      style={{
                        backgroundColor: hoveredInsight === index ? colors.accent : "#ECEEE9",
                      }}
                      onMouseEnter={() => setHoveredInsight(index)}
                      onMouseLeave={() => setHoveredInsight(null)}
                    >
                      <div className="bg-[#3D4F4F] min-h-[320px] rounded-[20px] m-[16px_0_16px_16px] overflow-hidden">
                        <img src={insight.image} alt={insight.category} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-8 flex flex-col justify-between relative">
                        <div className="absolute top-0 right-0 w-[60px] h-[60px]">
                          <div
                            className="absolute top-0 right-0 w-[60px] h-[60px] rounded-bl-[60px]"
                            style={{ backgroundColor: colors.background }}
                          />
                        </div>
                        <div>
                          <span
                            className="text-xs font-semibold tracking-[1.5px] uppercase block mb-4 transition-colors duration-300 ease-in-out"
                            style={{
                              color: hoveredInsight === index ? colors.primary : colors.accent,
                            }}
                          >
                            {insight.category}
                          </span>
                          <h3
                            className="text-[22px] font-semibold leading-[1.3] font-[Inter,sans-serif] m-0"
                            style={{ color: colors.primary }}
                          >
                            {insight.title}
                          </h3>
                        </div>
                        <div className="self-end">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out"
                            style={{
                              backgroundColor: hoveredInsight === index ? colors.primary : colors.white,
                            }}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={hoveredInsight === index ? colors.white : colors.primary}
                              strokeWidth="2"
                              className="transition-[stroke] duration-300 ease-in-out"
                            >
                              <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              {/* Desktop dots */}
              <div className="flex justify-center items-center gap-2 mt-9">
                {Array.from({ length: insights.length - 1 }).map((_, i) => (
                  <div
                    key={i}
                    onClick={() => scrollToDesktopInsight(i)}
                    className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
                    style={{
                      width: insightIndex === i ? "24px" : "8px",
                      backgroundColor: insightIndex === i ? colors.accent : colors.line,
                    }}
                  />
                ))}
              </div>
            </>
          )}
          <div className="text-center mt-12">
            <a href="/insights" className="no-underline">
              <button
                className="border-none font-semibold font-[Inter,sans-serif] cursor-pointer rounded-[50px]"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  padding: isMobile ? "12px 24px" : "16px 32px",
                  fontSize: isMobile ? "13px" : "15px",
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
        <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
          <div
            className="relative flex items-center justify-center mb-[60px]"
          >
            {!isMobile && <div className="flex-1 h-px" style={{ backgroundColor: colors.line }} />}
            <div
              className="inline-flex items-center gap-2 p-[10px_24px] rounded-[50px] text-xs font-semibold tracking-[1.5px] font-[Inter,sans-serif] uppercase"
              style={{
                border: `1px solid ${colors.line}`,
                color: colors.primary,
                backgroundColor: colors.white,
                margin: isMobile ? "0" : "0 24px",
              }}
            >
              {!isMobile && (
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ backgroundColor: colors.accent }}
                />
              )}
              Aligned With Government Priorities
            </div>
            {!isMobile && <div className="flex-1 h-px" style={{ backgroundColor: colors.line }} />}
          </div>
          <div className="overflow-hidden relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-[2]"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-[2]"
            />
            <div
              className="flex items-center gap-12 whitespace-nowrap animate-[govScroll_40s_linear_infinite]"
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
                <span key={index} className="flex items-center gap-12">
                  <span
                    className="text-[15px] font-medium font-[Inter,sans-serif] opacity-60"
                    style={{ color: colors.primary }}
                  >
                    {name}
                  </span>
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: colors.accent }}
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
              className="mx-auto px-12 -translate-y-[500px] -mb-[450px]"
              style={{ maxWidth: CONTENT_MAX_WIDTH }}
            >
              <div className="grid grid-cols-2 rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <div className="p-12" style={{ backgroundColor: colors.background }}>
                  <div
                    className="inline-flex items-center gap-2 p-[10px_20px] rounded-[50px] text-xs font-semibold tracking-[1.5px] font-[Inter,sans-serif] uppercase mb-6"
                    style={{
                      border: `1px solid ${colors.line}`,
                      color: colors.primary,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ backgroundColor: colors.accent }}
                    />
                    Get In Touch
                  </div>
                  <h2
                    className="font-[Inter,sans-serif] text-[42px] font-light leading-[1.2] m-[0_0_16px_0]"
                    style={{ color: colors.primary }}
                  >
                    <span className="font-bold">Let's</span> Connect
                  </h2>
                  <p
                    className="text-base leading-[1.6] text-[#666] font-[Inter,sans-serif] mt-0 mr-0 mb-6 ml-0"
                  >
                    Connect with our team to explore partnership opportunities and tailored solutions.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {[
                      { label: "Your name", type: "text", placeholder: "e.g. Kwame Asante" },
                      { label: "Email address", type: "email", placeholder: "e.g. kwame@email.com" },
                      { label: "Phone number", type: "tel", placeholder: "e.g. +233 XX XXX XXXX" },
                      { label: "Organization", type: "text", placeholder: "e.g. Company name" },
                    ].map((field, i) => (
                      <div key={i}>
                        <label
                          className="text-sm font-medium font-[Inter,sans-serif] block mb-2"
                          style={{ color: colors.primary }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3.5 rounded-xl border-none text-[15px] font-[Inter,sans-serif] outline-none box-border"
                          style={{ backgroundColor: colors.white, color: colors.dark }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mb-6">
                    <label
                      className="text-sm font-medium font-[Inter,sans-serif] block mb-2"
                      style={{ color: colors.primary }}
                    >
                      Your message
                    </label>
                    <textarea
                      placeholder="Type here..."
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-xl border-none text-[15px] font-[Inter,sans-serif] outline-none resize-y box-border"
                      style={{ backgroundColor: colors.white, color: colors.dark }}
                    />
                  </div>
                  <button
                    className="border-none px-8 py-4 text-[15px] font-semibold font-[Inter,sans-serif] cursor-pointer rounded-[50px]"
                    style={{ backgroundColor: colors.accent, color: colors.primary }}
                  >
                    Send Message
                  </button>
                </div>
                <div
                  className="bg-[#3D4F4F] relative overflow-hidden"
                >
                  <img src="/images/consulting-partnership.jpg" alt="African professional presenting in boardroom" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 rounded-2xl p-[20px_24px] flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: colors.accent }}
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
                      className="text-sm leading-[1.5] font-[Inter,sans-serif] m-0"
                      style={{ color: colors.dark }}
                    >
                      Email us at{" "}
                      <span className="font-semibold underline">info@bridgepbc.com</span> or fill
                      out our form, and we'll connect within one business day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
    </Layout>
  );
}
