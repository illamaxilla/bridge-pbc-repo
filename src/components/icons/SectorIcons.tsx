/**
 * Shared icon components used across sector pages.
 *
 * Most wrap Lucide icons with the specific sizes and stroke widths
 * that sector pages expect. Custom SVG icons that have no Lucide
 * equivalent are defined inline at the bottom.
 */
import React from "react";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Target,
  TrendingUp,
  Building2,
  Wallet,
  Factory,
  Truck,
  Zap,
  AlertTriangle,
  Users,
  Wheat,
  Sprout,
  Cpu,
  GraduationCap,
  Shield,
  Home,
  Camera,
  Luggage,
  BatteryCharging,
  Blocks,
  Heart,
  Lightbulb,
  Phone,
  DollarSign,
  Code,
  ChevronDown,
  Globe,
  Plane,
  Music,
  Palette,
  Anchor,
  Train,
  Warehouse,
  Snowflake,
  Wrench,
  Box,
  Search,
  CreditCard,
  Key,
  Clipboard,
  ExternalLink,
  ArrowUpRight,
  Droplet,
  Sun,
} from "lucide-react";

// ── Common navigation / indicator icons ─────────────────────────
export const IconArrowRight = () => (
  <ArrowRight size={14} strokeWidth={2.5} />
);

export const IconArrowDown = () => (
  <ArrowDown size={20} strokeWidth={2} />
);

export const IconCheck = ({ style }: { style?: React.CSSProperties } = {}) => (
  <Check size={16} strokeWidth={2.5} style={style} />
);

export const IconChevronDown = ({ size = 14 }: { size?: number } = {}) => (
  <ChevronDown size={size} strokeWidth={2} />
);

export const IconWarning = () => (
  <AlertTriangle size={18} strokeWidth={1.5} />
);

export const IconTarget = () => (
  <Target size={20} strokeWidth={1.5} />
);

// ── Sector / category icons ─────────────────────────────────────
export const IconBuilding = () => (
  <Building2 size={24} strokeWidth={1.5} />
);

export const IconWallet = () => (
  <Wallet size={24} strokeWidth={1.5} />
);

export const IconFactory = () => (
  <Factory size={24} strokeWidth={1.5} />
);

export const IconTruck = () => (
  <Truck size={24} strokeWidth={1.5} />
);

export const IconZap = () => (
  <Zap size={24} strokeWidth={1.5} />
);

export const IconUsers = () => (
  <Users size={18} strokeWidth={1.5} />
);

export const IconWheat = () => (
  <Wheat size={24} strokeWidth={1.5} />
);

export const IconSprout = () => (
  <Sprout size={24} strokeWidth={1.5} />
);

export const IconCpu = () => (
  <Cpu size={24} strokeWidth={1.5} />
);

export const IconGraduation = () => (
  <GraduationCap size={24} strokeWidth={1.5} />
);

export const IconGraduationCap = IconGraduation;

export const IconShield = () => (
  <Shield size={18} strokeWidth={1.5} />
);

export const IconHome = () => (
  <Home size={24} strokeWidth={1.5} />
);

export const IconCamera = () => (
  <Camera size={24} strokeWidth={1.5} />
);

export const IconLuggage = () => (
  <Luggage size={24} strokeWidth={1.5} />
);

export const IconBatteryCharging = () => (
  <BatteryCharging size={24} strokeWidth={1.5} />
);

export const IconBlocks = () => (
  <Blocks size={24} strokeWidth={1.5} />
);

export const IconHeart = () => (
  <Heart size={24} strokeWidth={1.5} />
);

export const IconLightbulb = () => (
  <Lightbulb size={24} strokeWidth={1.5} />
);

export const IconPhone = () => (
  <Phone size={24} strokeWidth={1.5} />
);

export const IconDollar = () => (
  <DollarSign size={18} strokeWidth={1.5} />
);

export const IconCode = () => (
  <Code size={24} strokeWidth={1.5} />
);

export const IconGlobe = () => (
  <Globe size={24} strokeWidth={1.5} />
);

export const IconPlane = () => (
  <Plane size={24} strokeWidth={1.5} />
);

export const IconMusic = () => (
  <Music size={24} strokeWidth={1.5} />
);

export const IconPalette = () => (
  <Palette size={24} strokeWidth={1.5} />
);

export const IconAnchor = () => (
  <Anchor size={24} strokeWidth={1.5} />
);

export const IconTrain = () => (
  <Train size={24} strokeWidth={1.5} />
);

export const IconWarehouse = () => (
  <Warehouse size={24} strokeWidth={1.5} />
);

export const IconSnowflake = () => (
  <Snowflake size={24} strokeWidth={1.5} />
);

export const IconTools = () => (
  <Wrench size={24} strokeWidth={1.5} />
);

export const IconTool = IconTools;

export const IconBox = () => (
  <Box size={24} strokeWidth={1.5} />
);

export const IconSearch = () => (
  <Search size={18} strokeWidth={1.5} />
);

export const IconCreditCard = () => (
  <CreditCard size={24} strokeWidth={1.5} />
);

export const IconKey = () => (
  <Key size={18} strokeWidth={1.5} />
);

export const IconClipboard = () => (
  <Clipboard size={24} strokeWidth={1.5} />
);

export const IconExternalLink = () => (
  <ExternalLink size={14} strokeWidth={2} />
);

export const IconArrowUpRight = () => (
  <ArrowUpRight size={14} strokeWidth={2.5} />
);

export const IconDroplet = () => (
  <Droplet size={18} strokeWidth={1.5} />
);

export const IconSun = () => (
  <Sun size={18} strokeWidth={1.5} />
);

export const IconCheckSmall = () => (
  <Check size={13} strokeWidth={2.5} />
);

// ── Custom SVG icons (no Lucide equivalent) ─────────────────────

export const IconCross = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2" />
    <path d="M3 10h18v4H3z" />
    <path d="M10 14v8h4v-8" />
  </svg>
);

export const IconStorefront = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l1.5-4h17L22 7" />
    <path d="M2 7h20v4c0 0-1.5 2-5 2s-5-2-5-2-1.5 2-5 2-5-2-5-2V7z" />
    <path d="M4 13v8h16v-8" />
    <path d="M10 21v-6h4v6" />
  </svg>
);

export const IconOfficeBuilding = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

export const IconTrendingUp = () => (
  <TrendingUp size={24} strokeWidth={1.5} />
);

export const IconLandmark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
    <line x1="2" y1="18" x2="22" y2="18" />
  </svg>
);

export const IconBank = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M3 10h18" />
    <path d="M5 6l7-3 7 3" />
    <path d="M4 10v11" />
    <path d="M20 10v11" />
    <path d="M8 14v3" />
    <path d="M12 14v3" />
    <path d="M16 14v3" />
  </svg>
);

export const IconHandshake = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 17l-1.5 1.5a2.12 2.12 0 0 1-3 0L4 16a2.12 2.12 0 0 1 0-3l6-6 4 4" />
    <path d="M20 16l-2.5-2.5a2.12 2.12 0 0 0-3 0L13 15" />
    <path d="M14 7l4-4 4 4-4 4" />
    <path d="M2 11l4-4 4 4" />
  </svg>
);

export const IconStore = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l1.5-4h17L22 7" />
    <path d="M2 7h20" />
    <path d="M4 7v14h16V7" />
    <path d="M9 21V11h6v10" />
  </svg>
);

// Agriculture-specific
export const IconSproutHub = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V8" />
    <path d="M5 12s2-4 7-4 7 4 7 4" />
    <path d="M8 4s1.5 4 4 4 4-4 4-4" />
  </svg>
);
