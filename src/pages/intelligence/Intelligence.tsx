import { Outlet, NavLink, Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  LayoutDashboard, TrendingUp, FileText, Bookmark, BarChart2, FolderOpen,
  Menu, X, ChevronLeft, ChevronRight, ArrowUpRight, Check,
  Wallet, Cpu, GraduationCap, Sprout, Camera, Home, Luggage,
  BatteryCharging, Factory, Truck, Blocks, Cross, Zap, Shield, Globe,
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const C = {
  accent: "#B8D935",
  primary: "#1B4D3E",
  sidebar: "#0F1A12",
  sideAct: "#1E3327",
  white: "#FFFFFF",
};

const navItems = [
  { to: "/intelligence/dashboard",  label: "Dashboard",       icon: LayoutDashboard },
  { to: "/intelligence/market",     label: "Market Overview", icon: TrendingUp },
  { to: "/intelligence/reports",    label: "Reports",         icon: FileText },
  { to: "/intelligence/watchlist",  label: "Watchlist",       icon: Bookmark },
  { to: "/intelligence/analytics",  label: "Analytics",       icon: BarChart2 },
  { to: "/intelligence/resources",  label: "Resources",       icon: FolderOpen },
];

// Sorted by score descending
const SIDEBAR_SECTORS = [
  { id: "financial",      short: "Financial Inclusion", icon: Wallet },
  { id: "agriculture",    short: "Agriculture",         icon: Sprout },
  { id: "technology",     short: "Technology",          icon: Cpu },
  { id: "energy",         short: "Energy",              icon: BatteryCharging },
  { id: "infrastructure", short: "Infrastructure",      icon: Blocks },
  { id: "education",      short: "Education",           icon: GraduationCap },
  { id: "health",         short: "Health Systems",      icon: Cross },
  { id: "housing",        short: "Housing",             icon: Home },
  { id: "manufacturing",  short: "Manufacturing",       icon: Factory },
  { id: "creative",       short: "Creative Industries", icon: Camera },
  { id: "transportation", short: "Transportation",      icon: Truck },
  { id: "tourism",        short: "Tourism",             icon: Luggage },
];

const PRO_FEATURES = [
  { icon: Globe,  text: "All 12 sector deep-dives" },
  { icon: Zap,    text: "Real-time opportunity alerts" },
  { icon: Shield, text: "Risk & IRR benchmarking" },
  { icon: BarChart2, text: "Custom watchlist & exports" },
];

const WHITE = "#FFFFFF";
const ACCENT_SVG = "#B8D935";

function BridgeLogo() {
  return (
    <svg viewBox="0 0 4113.9 932.3" height="28" style={{ display: "block" }}>
      <path fill={WHITE} d="M3355.1,655.6h31.2v5.7h-31.2v-5.7ZM3355.1,667h31.2v11.1h-31.2v-11.1ZM3355.1,683.9h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.9h31.2v11.1h-31.2v-11.1ZM3355.1,801.8h31.2v11.1h-31.2v-11.1ZM3355.1,818.6h31.2v11.1h-31.2v-11.1ZM3355.1,835.5h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.6h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,667h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.8h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.6h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.6,683.9h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.9h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.2h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z" />
      <path fill={WHITE} d="M3572.3,655.6h31.2v5.7h-31.2v-5.7ZM3572.3,667h31.2v11.1h-31.2v-11.1ZM3572.3,683.9h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.9h31.2v11.1h-31.2v-11.1ZM3572.3,801.8h31.2v11.1h-31.2v-11.1ZM3572.3,818.6h31.2v11.1h-31.2v-11.1ZM3572.3,835.5h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.6h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,667h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,689h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4l.1.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.9h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1,0ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.9h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.8h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.5h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.6h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z" />
      <path fill={WHITE} d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.9h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.8h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.6h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.5h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.9h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.3,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.2c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,667h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.2c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.7,683.9h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z" />
      <path fill={WHITE} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z" />
      <path fill={WHITE} stroke={WHITE} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z" />
      <path fill={WHITE} stroke={WHITE} strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z" />
      <rect fill={ACCENT_SVG} x="1427.4" y="17.4" width="205.2" height="145" />
      <rect fill={WHITE} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path fill={WHITE} d="M2757.4,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z" />
      <rect fill={WHITE} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
      <rect fill={ACCENT_SVG} x="3083.5" y="339.5" width="175.1" height="257.7" />
      <rect fill={ACCENT_SVG} x="3083.5" y="654.5" width="175.1" height="257.7" />
      <circle fill="none" stroke={WHITE} strokeWidth="5" strokeMiterlimit="10" cx="4078.6" cy="661.3" r="32.8" />
      <path fill={WHITE} d="M4092.2,677.1l-7.3-10.4c.2,0,.3,0,.4-.2,2-.9,3.6-2.1,4.6-3.8s1.6-3.6,1.6-6.1c0-3.6-1.2-6.3-3.6-8.4s-5.7-3-10-3h-13v31.8h5.9v-9.3h8.5l6.5,9.3h6.4v.1ZM4083.7,651.9c1.3,1.1,2,2.7,2,4.7s-.6,3.6-2,4.7-3.3,1.7-5.9,1.7h-6.9v-12.6h6.9c2.6,0,4.5.5,5.9,1.6h0v-.1Z" />
      <rect fill="none" stroke={WHITE} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6" />
      <polygon fill={ACCENT_SVG} stroke={WHITE} strokeMiterlimit="10" points="722.6 322.2 462.3 452.9 202 322.8 461.3 192.6 722.6 322.2" />
      <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1l.1-.1Z" />
      <path fill={ACCENT_SVG} d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z" />
    </svg>
  );
}

function UpgradeModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const handleRequestAccess = () => {
    onClose();
    navigate("/contact");
  };
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0F1A12",
          border: "1px solid rgba(184,217,53,0.2)",
          borderRadius: 16,
          padding: 32,
          maxWidth: 420,
          width: "100%",
          position: "relative",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(255,255,255,0.06)", border: "none",
            borderRadius: 6, cursor: "pointer", padding: 6,
            color: "rgba(255,255,255,0.4)", display: "flex",
          }}
        >
          <X size={16} />
        </button>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(184,217,53,0.12)", border: "1px solid rgba(184,217,53,0.25)",
          borderRadius: 20, padding: "4px 12px", marginBottom: 16,
        }}>
          <Zap size={12} color={C.accent} />
          <span style={{ fontSize: 10, fontWeight: 700, color: C.accent, fontFamily: "Inter,sans-serif", letterSpacing: ".06em" }}>
            BRIDGE INTELLIGENCE PRO
          </span>
        </div>

        {/* Headline */}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.white, fontFamily: "DM Sans,sans-serif", margin: "0 0 6px" }}>
          Unlock the Full Picture
        </h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "Inter,sans-serif", marginBottom: 24, lineHeight: 1.5 }}>
          Get deep-dive access to all 12 Ghana investment sectors, live opportunity alerts, and custom portfolio tools.
        </p>

        {/* Features */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {PRO_FEATURES.map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: "rgba(184,217,53,0.1)", border: "1px solid rgba(184,217,53,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon size={14} color={C.accent} />
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontFamily: "DM Sans,sans-serif" }}>{text}</span>
              <Check size={13} color={C.accent} style={{ marginLeft: "auto", flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleRequestAccess}
          style={{
            width: "100%", background: C.accent, border: "none", borderRadius: 8,
            padding: "13px 0", fontSize: 13, fontWeight: 700, color: C.primary,
            fontFamily: "Inter,sans-serif", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            marginBottom: 10,
          }}
        >
          Request Pro Access <ArrowUpRight size={14} />
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "Inter,sans-serif", margin: 0 }}>
          Institutional & diaspora investor pricing available
        </p>
      </div>
    </div>
  );
}

export default function Intelligence() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [searchParams] = useSearchParams();
  const activeSectorId = searchParams.get("sector");

  const handleToggleCollapsed = () => {
    if (!collapsed) {
      // Collapsing: fade text out first, then shrink
      setTextVisible(false);
      setTimeout(() => setCollapsed(true), 120);
    } else {
      // Expanding: grow first, then fade text in
      setCollapsed(false);
      setTimeout(() => setTextVisible(true), 160);
    }
  };

  if (location.pathname === "/intelligence" || location.pathname === "/intelligence/") {
    return <Navigate to="/intelligence/dashboard" replace />;
  }

  const sidebarWidth = isMobile ? (sidebarOpen ? 220 : 0) : collapsed ? 56 : 220;

  const handleSectorClick = (sectorId: string) => {
    navigate(`/intelligence/dashboard?sector=${sectorId}`);
    setSidebarOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#F3F5F2", fontFamily: "Inter, sans-serif" }}>

      {/* ── Upgrade Modal ── */}
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}

      {/* ── Top Bar ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", height: 56, flexShrink: 0,
        backgroundColor: C.sidebar, borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isMobile && (
            <button onClick={() => setSidebarOpen(v => !v)}
              style={{ color: C.white, background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}
              aria-label="Toggle menu">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          {!isMobile && (
            <button onClick={handleToggleCollapsed}
              style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}
              aria-label="Toggle sidebar">
              {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          )}
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <BridgeLogo />
          </NavLink>
          <div style={{
            fontSize: 7, fontWeight: 700, color: C.accent,
            textTransform: "uppercase", letterSpacing: "0.05em",
            lineHeight: 1.4, fontFamily: "Inter,sans-serif",
          }}>
            Intelligence
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
            backgroundColor: C.accent, color: C.primary, letterSpacing: "0.06em",
          }}>
            BETA
          </span>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width: sidebarWidth,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "width 0.22s ease",
          backgroundColor: C.sidebar,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          position: isMobile ? "absolute" : "relative",
          zIndex: isMobile ? 40 : "auto",
          top: isMobile ? 56 : "auto",
          bottom: isMobile ? 0 : "auto",
          height: isMobile ? "calc(100vh - 56px)" : "auto",
        }}>

          {/* ── Nav Items ── */}
          <nav style={{ padding: "10px 8px", flexShrink: 0, minWidth: 220 }}>
            {!collapsed && (
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter,sans-serif", padding: "6px 8px 6px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Navigation
              </p>
            )}
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                title={collapsed ? label : undefined}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: collapsed ? "8px 0" : "8px 8px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? C.white : "rgba(255,255,255,0.5)",
                  backgroundColor: isActive ? C.sideAct : "transparent",
                  transition: "background 0.1s",
                  marginBottom: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                })}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={16} color={isActive ? C.accent : "rgba(255,255,255,0.4)"} />
                    {!collapsed && <span style={{ fontFamily: "DM Sans,sans-serif" }}>{label}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Sectors ── */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 12px", scrollbarWidth: "none", minWidth: 220 }}>
            {!collapsed && (
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter,sans-serif", padding: "6px 8px 6px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Sectors
              </p>
            )}
            {collapsed && <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "4px 6px 10px" }} />}
            {SIDEBAR_SECTORS.map(({ id, short, icon: Icon }) => {
              const isActiveSector = activeSectorId === id;
              return (
                <button
                  key={id}
                  onClick={() => handleSectorClick(id)}
                  title={collapsed ? short : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: collapsed ? "5px 0" : "6px 8px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    borderRadius: 5,
                    marginBottom: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "100%",
                    background: isActiveSector ? "rgba(184,217,53,0.12)" : "none",
                    border: isActiveSector ? "1px solid rgba(184,217,53,0.22)" : "1px solid transparent",
                    cursor: "pointer",
                    transition: "background 0.12s, border-color 0.12s",
                    textAlign: "left",
                  }}
                  onMouseEnter={e => { if (!isActiveSector) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { if (!isActiveSector) e.currentTarget.style.background = "none"; }}
                >
                  {collapsed ? (
                    <div style={{
                      width: 28, height: 28, borderRadius: 4,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isActiveSector ? "rgba(184,217,53,0.15)" : "rgba(255,255,255,0.05)",
                    }}>
                      <Icon size={14} color={isActiveSector ? C.accent : "rgba(255,255,255,0.35)"} />
                    </div>
                  ) : (
                    <>
                      <Icon size={12} color={isActiveSector ? C.accent : "rgba(255,255,255,0.3)"} />
                      <span style={{ fontSize: 11.5, fontWeight: isActiveSector ? 600 : 400, color: isActiveSector ? C.accent : "rgba(255,255,255,0.45)", fontFamily: "DM Sans,sans-serif" }}>
                        {short}
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Upgrade to Pro ── */}
          {!collapsed && (
            <div style={{
              margin: "0 10px 12px",
              background: "linear-gradient(135deg,#1E3327,#152A1F)",
              border: "1px solid rgba(184,217,53,0.15)",
              borderRadius: 8, padding: 12, flexShrink: 0, minWidth: 200,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.white, fontFamily: "DM Sans,sans-serif", marginBottom: 3 }}>
                Upgrade to Pro
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "Inter,sans-serif", marginBottom: 8, lineHeight: 1.4 }}>
                Full access to all 12 sector analyses
              </div>
              <button
                onClick={() => setShowUpgrade(true)}
                style={{
                  width: "100%", background: C.accent, border: "none", borderRadius: 5,
                  padding: "7px 0", fontSize: 10, fontWeight: 700, color: C.primary,
                  fontFamily: "Inter,sans-serif", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Get Access <ArrowUpRight size={10} />
              </button>
            </div>
          )}
        </aside>

        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 30, top: 56 }}
            onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Main Content ── */}
        <main style={{ flex: 1, overflow: "auto" }}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}
