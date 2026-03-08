import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ArrowRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  Plus,
  Check,
  X,
  Search,
  Award,
  TrendingUp,
  Users,
  MapPin,
  Globe,
  Briefcase,
  Target,
  Zap,
  Eye,
  Clock,
  Flag,
  BarChart2,
  Layers,
  Heart,
  BookOpen,
  Send,
  Filter,
  Home,
  HelpCircle,
  Tag,
  Shield,
  LogOut,
  Settings,
  Edit3,
  Calendar,
  Blocks,
  Wallet,
  Cross,
  Cpu,
  GraduationCap,
  Sprout,
  Camera,
  Building,
  Luggage,
  BatteryCharging,
  Factory,
  Truck,
  Menu,
  Lock,
  Mail,
} from "lucide-react";

// ─── DESIGN TOKENS ────────────────────────────────────────────
const C = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  accentDark: "#96B020",
  bg: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
  muted: "#888",
  text: "#333",
  cardShadow: "0 2px 16px rgba(27,77,62,0.08)",
  deepShadow: "0 8px 40px rgba(27,77,62,0.16)",
};

const font = {
  display: "'DM Sans', sans-serif",
  body: "'Inter', sans-serif",
};

// ─── PLACEHOLDER DATA ──────────────────────────────────────────
const MEMBERS = [
  {
    id: 1,
    name: "Abena Owusu",
    role: "Infrastructure Advisor",
    location: "Accra",
    points: 2840,
    badge: "Champion",
    avatar: "AO",
    sector: "Infrastructure",
  },
  {
    id: 2,
    name: "Kofi Mensah",
    role: "AgriFinance Specialist",
    location: "Kumasi",
    points: 2210,
    badge: "Contributor",
    avatar: "KM",
    sector: "Agriculture",
  },
  {
    id: 3,
    name: "Efua Asante",
    role: "Health Systems Lead",
    location: "Tamale",
    points: 1990,
    badge: "Contributor",
    avatar: "EA",
    sector: "Health",
  },
  {
    id: 4,
    name: "Kwame Boateng",
    role: "Tech Innovation Director",
    location: "London",
    points: 1750,
    badge: "Newcomer",
    avatar: "KB",
    sector: "Technology",
  },
  {
    id: 5,
    name: "Ama Darko",
    role: "Education Specialist",
    location: "Cape Coast",
    points: 1540,
    badge: "Newcomer",
    avatar: "AD",
    sector: "Education",
  },
];

const QUESTIONS = [
  {
    id: 1,
    author: "Kofi Mensah",
    avatar: "KM",
    time: "3 hours ago",
    views: "4.2k",
    tag: "Agriculture",
    pinned: true,
    votes: 34,
    title:
      "What are the most effective post-harvest loss reduction strategies for smallholder maize farmers in the Brong-Ahafo region?",
    preview:
      "Given the 30–40% post-harvest loss rate reported in 2024, I'm looking for BRIDGE-aligned interventions that can be deployed through existing cooperatives without heavy capital expenditure...",
    answers: 12,
    userVote: null,
  },
  {
    id: 2,
    author: "Abena Owusu",
    avatar: "AO",
    time: "1 day ago",
    views: "9.1k",
    tag: "Infrastructure",
    pinned: false,
    votes: 61,
    title:
      "Kejetia Market Phase 2: How should BRIDGE prioritize the digital payment integration rollout across the 10,000+ stall ecosystem?",
    preview:
      "Phase 1 digitization is nearly complete. The question now is sequencing: do we go by stall type, transaction volume, or geographic cluster within the market?",
    answers: 28,
    userVote: null,
  },
  {
    id: 3,
    author: "Ama Darko",
    avatar: "AD",
    time: "2 days ago",
    views: "3.5k",
    tag: "Education",
    pinned: false,
    votes: 19,
    title:
      "TVET curriculum design: aligning skills training programs with the manufacturing sector's 2026 growth targets",
    preview:
      "The Ghana TVET Service has opened a consultation window. How do we ensure BRIDGE's skills pipeline feeds directly into the light manufacturing ventures we're building?",
    answers: 7,
    userVote: null,
  },
  {
    id: 4,
    author: "Efua Asante",
    avatar: "EA",
    time: "4 days ago",
    views: "6.8k",
    tag: "Health Systems",
    pinned: false,
    votes: 45,
    title:
      "Community health worker programs: what's the optimal supervisor-to-CHW ratio for the Northern Corridor deployment?",
    preview:
      "Our health systems pilot in the UE Region is showing strong uptake. Before scaling to 3 additional districts, we need to settle on a supervision model that's both sustainable and impactful...",
    answers: 21,
    userVote: null,
  },
];

const FEED_ITEMS = [
  {
    id: 1,
    avatar: "KM",
    name: "Kofi Mensah",
    action: "shared a new insight on",
    subject: "Agri value chain gaps in Ejura",
    time: "4m ago",
    likes: 12,
  },
  {
    id: 2,
    avatar: "AO",
    name: "Abena Owusu",
    action: "answered a question in",
    subject: "Infrastructure → Kejetia Phase 2",
    time: "18m ago",
    likes: 8,
  },
  {
    id: 3,
    avatar: "EA",
    name: "Efua Asante",
    action: "published a discussion in",
    subject: "Health Systems → CHW Deployment",
    time: "1h ago",
    likes: 24,
  },
  {
    id: 4,
    avatar: "KB",
    name: "Kwame Boateng",
    action: "completed a milestone in",
    subject: "Tech Innovation → FinTech Pilot",
    time: "2h ago",
    likes: 31,
  },
  {
    id: 5,
    avatar: "AD",
    name: "Ama Darko",
    action: "joined the working group for",
    subject: "Education → TVET Curriculum",
    time: "3h ago",
    likes: 6,
  },
];

const GOALS = [
  {
    id: 1,
    title: "Lead the Kejetia Market Digitization Working Group",
    sector: "Infrastructure",
    deadline: "Mar 28, 2026",
    daysLeft: 21,
    progress: 65,
    status: "active",
    steps: [
      { label: "Stakeholder mapping complete", done: true },
      { label: "Phase 2 scope document drafted", done: true },
      { label: "Payment partner shortlist finalized", done: false },
      { label: "Pilot launch in East Wing", done: false },
    ],
  },
  {
    id: 2,
    title: "Complete AgriFinance Sector Analysis — Brong-Ahafo",
    sector: "Agriculture",
    deadline: "Apr 10, 2026",
    daysLeft: 34,
    progress: 40,
    status: "active",
    steps: [
      { label: "Field data collection", done: true },
      { label: "Cooperative financial audit", done: false },
      { label: "Report draft to team", done: false },
      { label: "BRIDGE Impact Score computed", done: false },
    ],
  },
];

const CATEGORIES = [
  { name: "Infrastructure", count: 142, icon: <Blocks size={14} /> },
  { name: "Financial Inclusion", count: 98, icon: <Wallet size={14} /> },
  { name: "Health Systems", count: 87, icon: <Cross size={14} /> },
  { name: "Technology", count: 114, icon: <Cpu size={14} /> },
  { name: "Education & Skills", count: 76, icon: <GraduationCap size={14} /> },
  { name: "Agriculture", count: 163, icon: <Sprout size={14} /> },
  { name: "Creative Industries", count: 52, icon: <Camera size={14} /> },
  { name: "Housing", count: 61, icon: <Building size={14} /> },
  { name: "Tourism", count: 44, icon: <Luggage size={14} /> },
  { name: "Energy", count: 79, icon: <BatteryCharging size={14} /> },
  { name: "Manufacturing", count: 68, icon: <Factory size={14} /> },
  { name: "Transportation", count: 55, icon: <Truck size={14} /> },
];

const INSIGHTS = [
  "Ghana's 2026 Budget allocates GH₵8.9B across BRIDGE-aligned sectors — the highest infrastructure spend in a decade.",
  "Kejetia Market digitization: 6,200 traders onboarded in Phase 1, with 89% reporting improved transaction speed.",
  "Northern Corridor agricultural cooperatives show 23% higher yield with BRIDGE-supported input financing programs.",
  "TVET enrollment in BRIDGE's skills pipeline regions up 41% YoY — a signal that Ghana's workforce transformation is accelerating.",
];

const JOURNEY_STEPS = ["Newcomer", "Contributor", "Champion", "Leader"];

const MEMBER_TYPES = {
  premium: { label: "Premium Member", color: C.primary, badge: "PREMIUM" },
  diaspora: { label: "Diaspora Network", color: "#2C5F8A", badge: "DIASPORA" },
};

// ─── BRIDGE SVG LOGO ──────────────────────────────────────────
function BridgeLogo({ height = 40, dark = false }) {
  // On dark backgrounds (login panel): white wordmark + colored icon
  // On light backgrounds (header): dark green wordmark + colored icon
  const textColor = dark ? C.primary : "#ffffff";
  const scale = height / 932.3;
  const w = Math.round(4113.8 * scale);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 4113.8 932.3"
      width={w}
      height={height}
      style={{ display: "block" }}
    >
      <defs>
        <style>{`.bl1{stroke-width:80px;}.bl1,.bl2{fill:none;stroke:${textColor};}.bl1,.bl2,.bl3,.bl4{stroke-miterlimit:10;}.bl2{stroke-width:5px;}.bl5,.bl4{fill:#b8d935;}.bl6,.bl3{fill:${textColor};}.bl3{stroke:#000;stroke-width:.5px;}.bl4{stroke:#1b4d3e;}.bl7{fill:#74914a;}`}</style>
      </defs>
      <g>
        {/* D letter */}
        <path
          className="bl6"
          d="M3355.1,655.5h31.2v5.7h-31.2v-5.7ZM3355.1,666.9h31.2v11.1h-31.2v-11.1ZM3355.1,683.8h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.8h31.2v11.1h-31.2v-11.1ZM3355.1,801.7h31.2v11.1h-31.2v-11.1ZM3355.1,818.5h31.2v11.1h-31.2v-11.1ZM3355.1,835.4h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.5h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,666.9h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.7h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.5h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2h0v.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.5,683.8h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.8h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.1h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
        />
        {/* B letter */}
        <path
          className="bl6"
          d="M3572.3,655.5h31.2v5.7h-31.2v-5.7ZM3572.3,666.9h31.2v11.1h-31.2v-11.1ZM3572.3,683.8h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.8h31.2v11.1h-31.2v-11.1ZM3572.3,801.7h31.2v11.1h-31.2v-11.1ZM3572.3,818.5h31.2v11.1h-31.2v-11.1ZM3572.3,835.4h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.5h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,666.9h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,688.9h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4h.1v.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.8h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1,0ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2,0ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.8h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.7h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.4h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.5h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z"
        />
        {/* C letter */}
        <path
          className="bl6"
          d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.8h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.7h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.5h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.4h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.8h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.2,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.1c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,666.9h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.1c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.6,683.8h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z"
        />
        {/* Big D wordmark */}
        <path
          className="bl6"
          d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
        />
        {/* G R I letters */}
        <path
          className="bl3"
          d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
        />
        <path
          className="bl3"
          d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
        />
        {/* Accent rects on B */}
        <rect className="bl5" x="1427.4" y="17.4" width="205.2" height="145" />
        <rect className="bl6" x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
        {/* E and second accent */}
        <path
          className="bl6"
          d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
        />
        <rect className="bl6" x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
        <rect className="bl5" x="3083.4" y="339.5" width="175.1" height="257.7" />
        <rect className="bl5" x="3083.4" y="654.4" width="175.1" height="257.7" />
        {/* Icon mark — chevrons */}
        <rect className="bl1" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6" />
        <polygon className="bl4" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1" />
        <path
          className="bl7"
          d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"
        />
        <path
          className="bl5"
          d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"
        />
      </g>
    </svg>
  );
}

function Avatar({ initials, size = 36, bg = C.primary, color = C.accent }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: font.body,
        fontSize: size * 0.33,
        fontWeight: 700,
        flexShrink: 0,
        letterSpacing: "0.5px",
      }}
    >
      {initials}
    </div>
  );
}

// ─── PILL ──────────────────────────────────────────────────────
function Pill({ children, color = C.primary, bg = "transparent", border = true, small }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: small ? "3px 10px" : "5px 14px",
        borderRadius: 50,
        fontSize: small ? 10 : 11,
        fontWeight: 700,
        fontFamily: font.body,
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        color,
        background: bg,
        border: border ? `1.5px solid ${color}` : "none",
      }}
    >
      {children}
    </span>
  );
}

// ─── PROGRESS BAR ──────────────────────────────────────────────
function ProgressBar({ value, height = 6, color = C.accent }) {
  return (
    <div style={{ width: "100%", height, borderRadius: 10, background: C.line, overflow: "hidden" }}>
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          borderRadius: 10,
          background: `linear-gradient(90deg, ${C.primary}, ${color})`,
          transition: "width 0.8s ease",
        }}
      />
    </div>
  );
}

// ─── STEP TRACKER ──────────────────────────────────────────────
function StepTracker({ steps, current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
              <div
                style={{
                  width: active ? 20 : 14,
                  height: active ? 20 : 14,
                  borderRadius: "50%",
                  background: done ? C.primary : active ? C.accent : C.line,
                  border: active ? `3px solid ${C.primary}` : done ? "none" : `2px solid ${C.line}`,
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {done && <Check size={8} color={C.white} strokeWidth={3} />}
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: active ? 700 : 500,
                  fontFamily: font.body,
                  color: active ? C.primary : done ? C.muted : C.line,
                  marginTop: 6,
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: done ? C.primary : C.line,
                  marginBottom: 16,
                  transition: "background 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── SECTION LABEL ─────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <span style={{ width: 3, height: 16, borderRadius: 2, background: C.accent, display: "block" }} />
      <span
        style={{
          fontFamily: font.body,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: C.primary,
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── LOGIN PAGE ────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [memberType, setMemberType] = useState("premium");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(memberType);
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: C.primary,
        fontFamily: font.body,
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 64px",
          background: `linear-gradient(160deg, #0e2e24 0%, ${C.primary} 60%, #1e5c4a 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: `1px solid rgba(184,217,53,0.12)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: `1px solid rgba(184,217,53,0.08)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: `1px solid rgba(255,255,255,0.06)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: `1px solid rgba(184,217,53,0.1)`,
          }}
        />

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <BridgeLogo height={48} />
        </div>

        {/* Hero Text */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 24 }}>
            <Pill color={C.accent} bg="rgba(184,217,53,0.12)" border={false} small>
              Ghana-First Community
            </Pill>
          </div>
          <h1
            style={{
              fontFamily: font.display,
              fontWeight: 300,
              fontSize: 52,
              color: C.white,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              margin: "0 0 24px 0",
            }}
          >
            Where Ghana's
            <br />
            <span style={{ fontWeight: 800, color: C.accent }}>Builders</span>
            <br />
            Come Together
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              maxWidth: 380,
              margin: 0,
            }}
          >
            Join a community of investors, innovators, and development professionals working to drive Peace & Prosperity
            across the nation.
          </p>

          {/* Stats Row */}
          <div style={{ display: "flex", gap: 40, marginTop: 48 }}>
            {[
              { val: "174+", label: "Active Ventures" },
              { val: "6,200+", label: "Traders Onboarded" },
              { val: "23%", label: "Avg. Yield Growth" },
            ].map((s) => (
              <div key={s.val}>
                <div style={{ fontFamily: font.display, fontWeight: 800, fontSize: 28, color: C.accent }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.5px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 24,
          }}
        >
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontStyle: "italic", margin: 0 }}>
            "Blending Resources and Innovation to Drive Ghana's Empowerment"
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div
        style={{
          width: 480,
          background: C.bg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 52px",
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontFamily: font.display,
              fontWeight: 700,
              fontSize: 32,
              color: C.primary,
              margin: "0 0 8px 0",
              letterSpacing: "-0.5px",
            }}
          >
            Welcome back
          </h2>
          <p style={{ fontSize: 15, color: C.muted, margin: 0 }}>Sign in to your BRIDGE community account</p>
        </div>

        {/* Member Type Toggle */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1px",
              color: C.muted,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Account Type
          </div>
          <div
            style={{
              display: "flex",
              gap: 0,
              borderRadius: 12,
              border: `1.5px solid ${C.line}`,
              overflow: "hidden",
              background: C.white,
            }}
          >
            {[
              { key: "premium", label: "Premium Member" },
              { key: "diaspora", label: "Diaspora Network" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setMemberType(t.key)}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: font.body,
                  fontSize: 13,
                  fontWeight: 600,
                  transition: "all 0.2s",
                  background: memberType === t.key ? C.primary : "transparent",
                  color: memberType === t.key ? C.white : C.muted,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.muted }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 42px",
                  borderRadius: 10,
                  border: `1.5px solid ${C.line}`,
                  fontFamily: font.body,
                  fontSize: 14,
                  background: C.white,
                  outline: "none",
                  boxSizing: "border-box",
                  color: C.dark,
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = C.primary)}
                onBlur={(e) => (e.target.style.borderColor = C.line)}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.muted }}
              />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 42px 12px 42px",
                  borderRadius: 10,
                  border: `1.5px solid ${C.line}`,
                  fontFamily: font.body,
                  fontSize: 14,
                  background: C.white,
                  outline: "none",
                  boxSizing: "border-box",
                  color: C.dark,
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = C.primary)}
                onBlur={(e) => (e.target.style.borderColor = C.line)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: C.muted,
                  padding: 0,
                }}
              >
                {showPass ? <Eye size={16} /> : <Lock size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div
              onClick={() => setRemember(!remember)}
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                border: `1.5px solid ${remember ? C.primary : C.line}`,
                background: remember ? C.primary : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              {remember && <Check size={11} color={C.white} strokeWidth={3} />}
            </div>
            <span style={{ fontSize: 13, color: C.text }}>Remember me</span>
          </label>
          <a href="#" style={{ fontSize: 13, color: C.primary, textDecoration: "none", fontWeight: 600 }}>
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 24px",
            borderRadius: 12,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: font.body,
            fontSize: 15,
            fontWeight: 700,
            background: loading ? C.muted : C.primary,
            color: C.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          {loading ? (
            <>
              <div
                style={{
                  width: 16,
                  height: 16,
                  border: `2px solid rgba(255,255,255,0.3)`,
                  borderTop: `2px solid white`,
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              Signing in...
            </>
          ) : (
            <>
              {" "}
              Sign In <ArrowRight size={16} />{" "}
            </>
          )}
        </button>

        <div style={{ textAlign: "center", marginTop: 28, fontSize: 13, color: C.muted }}>
          Don't have an account?{" "}
          <a href="#" style={{ color: C.primary, fontWeight: 700, textDecoration: "none" }}>
            Request Access
          </a>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
          <div style={{ flex: 1, height: 1, background: C.line }} />
          <span style={{ fontSize: 12, color: C.muted }}>or</span>
          <div style={{ flex: 1, height: 1, background: C.line }} />
        </div>

        {/* SSO */}
        <button
          style={{
            width: "100%",
            padding: "12px 20px",
            borderRadius: 12,
            border: `1.5px solid ${C.line}`,
            background: C.white,
            cursor: "pointer",
            fontFamily: font.body,
            fontSize: 14,
            fontWeight: 600,
            color: C.text,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Globe size={16} color={C.primary} />
          Continue with BRIDGE SSO
        </button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        body { margin: 0; }
        input { -webkit-appearance: none; }
      `}</style>
    </div>
  );
}

// ─── COMMUNITY DASHBOARD ───────────────────────────────────────
function CommunityDashboard({ memberType, onLogout }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getInitialPage = () => {
    if (pathname.startsWith("/community/forum")) return "forum";
    if (pathname === "/community/members") return "members";
    if (pathname === "/community/resources") return "resources";
    return "home";
  };

  const getInitialForumView = () => {
    const map: Record<string, string> = {
      "/community/forum/questions": "Questions",
      "/community/forum/most-answered": "Most Answered",
      "/community/forum/polls": "Polls",
      "/community/forum/groups": "Groups",
      "/community/forum/tags": "Tags",
      "/community/forum/sectors": "Sectors",
      "/community/forum/badges": "Badges",
      "/community/forum/members": "Members",
    };
    return map[pathname] ?? "Home";
  };

  const [activeTab, setActiveTab] = useState("active");
  const [feedFilter, setFeedFilter] = useState("Recent");
  const [forumFilter, setForumFilter] = useState("Recent");
  const [questions, setQuestions] = useState(QUESTIONS);
  const [noteText, setNoteText] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [expandedGoal, setExpandedGoal] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [savedInsight, setSavedInsight] = useState(false);
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [initialForumView] = useState(getInitialForumView);
  const [contributions, setContributions] = useState([
    { label: "Discussions participated in this week", done: true },
    { label: "Sector insight submitted", done: false },
    { label: "Question answered in your sector", done: true },
    { label: "Peer review completed", done: false },
  ]);

  const user = { name: "Joseph", initials: "JA", sector: "Infrastructure", journey: 2 };
  const mType = MEMBER_TYPES[memberType];

  const handleVote = (qId, dir) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId) return q;
        if (q.userVote === dir) return { ...q, votes: q.votes - 1, userVote: null };
        const delta = q.userVote ? 2 : 1;
        return { ...q, votes: q.votes + (dir === "up" ? delta : -delta), userVote: dir };
      }),
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: font.body }}>
      {/* ── TOP NAV ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: C.white,
          borderBottom: `1px solid ${C.line}`,
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 12px rgba(27,77,62,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <BridgeLogo height={28} dark />
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "2px",
                color: C.muted,
                borderLeft: `1px solid ${C.line}`,
                paddingLeft: 12,
              }}
            >
              COMMUNITY
            </span>
          </div>
          <nav style={{ display: "flex", gap: 4 }}>
            {["Home", "Forum", "Members", "Resources"].map((item) => {
              const key = item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => {
                    const routeMap: Record<string, string> = { home: "/community", forum: "/community/forum", members: "/community/members", resources: "/community/resources" };
                    setCurrentPage(key);
                    navigate(routeMap[key]);
                  }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: font.body,
                    fontSize: 13,
                    background: currentPage === key ? `rgba(27,77,62,0.08)` : "transparent",
                    color: currentPage === key ? C.primary : C.text,
                    fontWeight: currentPage === key ? 700 : 500,
                  }}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 20,
              background: mType.color + "18",
              border: `1.5px solid ${mType.color}30`,
            }}
          >
            <Shield size={12} color={mType.color} />
            <span style={{ fontSize: 11, fontWeight: 700, color: mType.color, letterSpacing: "0.5px" }}>
              {mType.badge}
            </span>
          </div>

          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6, position: "relative" }}>
            <Bell size={18} color={C.text} />
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: C.accent,
                border: `2px solid ${C.white}`,
              }}
            />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
            <MessageCircle size={18} color={C.text} />
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingLeft: 16,
              borderLeft: `1px solid ${C.line}`,
            }}
          >
            <Avatar initials={user.initials} size={32} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, lineHeight: 1.2 }}>{user.name}</div>
              <div style={{ fontSize: 10, color: C.muted }}>2,840 pts</div>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Sign out"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}
          >
            <LogOut size={16} color={C.muted} />
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 32px 80px" }}>
        {currentPage === "home" && (
          <HomePageContent
            user={user}
            mType={mType}
            contributions={contributions}
            setContributions={setContributions}
            savedInsight={savedInsight}
            setSavedInsight={setSavedInsight}
            noteText={noteText}
            setNoteText={setNoteText}
            noteSaved={noteSaved}
            setNoteSaved={setNoteSaved}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            expandedGoal={expandedGoal}
            setExpandedGoal={setExpandedGoal}
            setShowGoalModal={setShowGoalModal}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === "forum" && (
          <ForumPage
            questions={questions}
            setQuestions={setQuestions}
            setShowQuestionModal={setShowQuestionModal}
            setCurrentPage={(page: string) => { setCurrentPage(page); navigate(page === "members" ? "/community/members" : "/community"); }}
            initialForumView={initialForumView}
          />
        )}
        {currentPage === "members" && <MembersPage />}
        {currentPage === "resources" && <ResourcesPage />}
      </div>

      {/* ── CREATE GOAL MODAL ── */}
      {showGoalModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(27,77,62,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowGoalModal(false)}
        >
          <div
            style={{ background: C.white, borderRadius: 20, padding: 36, width: 520, boxShadow: C.deepShadow }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: C.primary, margin: 0 }}>
                Create New Goal
              </h2>
              <button
                onClick={() => setShowGoalModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <X size={20} color={C.muted} />
              </button>
            </div>
            {["Goal Name", "Details", "Deadline"].map((field) => (
              <div key={field} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
                  {field}
                </label>
                {field === "Details" ? (
                  <textarea
                    placeholder={`Enter ${field.toLowerCase()}...`}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      border: `1.5px solid ${C.line}`,
                      padding: "10px 12px",
                      fontFamily: font.body,
                      fontSize: 13,
                      resize: "none",
                      minHeight: 80,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                ) : (
                  <input
                    type={field === "Deadline" ? "date" : "text"}
                    placeholder={`Enter ${field.toLowerCase()}...`}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: `1.5px solid ${C.line}`,
                      fontFamily: font.body,
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button
                onClick={() => setShowGoalModal(false)}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: 10,
                  border: `1.5px solid ${C.line}`,
                  background: "transparent",
                  color: C.text,
                  cursor: "pointer",
                  fontFamily: font.body,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowGoalModal(false)}
                style={{
                  flex: 2,
                  padding: "11px",
                  borderRadius: 10,
                  border: "none",
                  background: C.primary,
                  color: C.white,
                  cursor: "pointer",
                  fontFamily: font.body,
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ASK QUESTION MODAL ── */}
      {showQuestionModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(27,77,62,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowQuestionModal(false)}
        >
          <div
            style={{ background: C.white, borderRadius: 20, padding: 36, width: 540, boxShadow: C.deepShadow }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 700, color: C.primary, margin: 0 }}>
                Ask the Community
              </h2>
              <button
                onClick={() => setShowQuestionModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <X size={20} color={C.muted} />
              </button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
                Question
              </label>
              <input
                placeholder="What would you like to ask the BRIDGE community?"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: `1.5px solid ${C.line}`,
                  fontFamily: font.body,
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
                Details
              </label>
              <textarea
                placeholder="Add context, background, or supporting information..."
                style={{
                  width: "100%",
                  borderRadius: 10,
                  border: `1.5px solid ${C.line}`,
                  padding: "10px 12px",
                  fontFamily: font.body,
                  fontSize: 13,
                  resize: "none",
                  minHeight: 100,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.text, display: "block", marginBottom: 6 }}>
                Sector Tag
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Infrastructure", "Agriculture", "Health", "Technology", "Education", "Energy"].map((s) => (
                  <button
                    key={s}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 20,
                      border: `1.5px solid ${C.line}`,
                      background: "transparent",
                      color: C.text,
                      cursor: "pointer",
                      fontFamily: font.body,
                      fontSize: 12,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.primary;
                      e.currentTarget.style.color = C.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.line;
                      e.currentTarget.style.color = C.text;
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setShowQuestionModal(false)}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: 10,
                  border: `1.5px solid ${C.line}`,
                  background: "transparent",
                  color: C.text,
                  cursor: "pointer",
                  fontFamily: font.body,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowQuestionModal(false)}
                style={{
                  flex: 2,
                  padding: "11px",
                  borderRadius: 10,
                  border: "none",
                  background: C.accent,
                  color: C.primary,
                  cursor: "pointer",
                  fontFamily: font.body,
                  fontSize: 14,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <Send size={14} /> Post Question
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.line}; border-radius: 2px; }
      `}</style>
    </div>
  );
}

// ─── FORUM PAGE ────────────────────────────────────────────────
function ForumPage({ questions, setQuestions, setShowQuestionModal, setCurrentPage, initialForumView = "Home" }) {
  const navigate = useNavigate();
  const [forumView, setForumView] = useState(initialForumView);
  const [forumFilter, setForumFilter] = useState("Recent");
  const [searchQuery, setSearchQuery] = useState("");

  const FORUM_NAV = [
    { icon: <Home size={14} />, label: "Home" },
    { icon: <HelpCircle size={14} />, label: "Questions" },
    { icon: <Star size={14} />, label: "Most Answered" },
    { icon: <BarChart2 size={14} />, label: "Polls" },
    { icon: <Users size={14} />, label: "Groups" },
    { icon: <Tag size={14} />, label: "Tags" },
    { icon: <Globe size={14} />, label: "Sectors" },
    { icon: <Award size={14} />, label: "Badges" },
    { icon: <Users size={14} />, label: "Members" },
  ];

  const handleVote = (qId, dir) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId) return q;
        if (q.userVote === dir) return { ...q, votes: q.votes - 1, userVote: null };
        const delta = q.userVote ? 2 : 1;
        return { ...q, votes: q.votes + (dir === "up" ? delta : -delta), userVote: dir };
      }),
    );
  };

  const sortedQs = forumView === "Most Answered" ? [...questions].sort((a, b) => b.answers - a.answers) : questions;

  const filteredQs = searchQuery
    ? sortedQs.filter((q) => q.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : sortedQs;

  return (
    <div style={{ background: C.white, borderRadius: 20, overflow: "hidden", boxShadow: C.cardShadow }}>
      {/* Header */}
      <div
        style={{
          padding: "28px 32px 20px",
          borderBottom: `1px solid ${C.line}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <SectionLabel>Discussion Board</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 28,
              fontWeight: 700,
              color: C.primary,
              margin: 0,
              letterSpacing: "-0.3px",
            }}
          >
            Sector <span style={{ color: C.accent }}>Q&A Forum</span>
          </h2>
        </div>
        <button
          onClick={() => setShowQuestionModal(true)}
          style={{
            padding: "11px 22px",
            borderRadius: 20,
            border: "none",
            cursor: "pointer",
            background: C.accent,
            color: C.primary,
            fontFamily: font.body,
            fontSize: 13,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Plus size={14} /> Ask a Question
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 260px" }}>
        {/* Left Nav */}
        <div style={{ borderRight: `1px solid ${C.line}`, padding: "24px 16px" }}>
          {FORUM_NAV.map((item) => {
            const isActive = forumView === item.label;
            const goesToMembers = item.label === "Members";
            return (
              <button
                key={item.label}
                onClick={() => {
                  const forumRouteMap: Record<string, string> = {
                    "Home": "/community/forum",
                    "Questions": "/community/forum/questions",
                    "Most Answered": "/community/forum/most-answered",
                    "Polls": "/community/forum/polls",
                    "Groups": "/community/forum/groups",
                    "Tags": "/community/forum/tags",
                    "Sectors": "/community/forum/sectors",
                    "Badges": "/community/forum/badges",
                    "Members": "/community/members",
                  };
                  if (goesToMembers) {
                    setCurrentPage("members");
                    navigate("/community/members");
                  } else {
                    setForumView(item.label);
                    navigate(forumRouteMap[item.label] ?? "/community/forum");
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: isActive ? `${C.primary}10` : "transparent",
                  color: isActive ? C.primary : C.muted,
                  fontFamily: font.body,
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                  textAlign: "left",
                  marginBottom: 2,
                  transition: "all 0.15s",
                }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}

          <div style={{ marginTop: 24, borderTop: `1px solid ${C.line}`, paddingTop: 16 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: C.muted,
                textTransform: "uppercase",
                padding: "0 12px",
                marginBottom: 10,
              }}
            >
              Sectors
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "6px 12px",
                  border: "none",
                  cursor: "pointer",
                  background: "transparent",
                  color: C.text,
                  fontFamily: font.body,
                  fontSize: 12,
                  textAlign: "left",
                  borderRadius: 6,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.bg)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: C.primary }}>{cat.icon}</span>
                  {cat.name}
                </span>
                <span style={{ fontSize: 11, color: C.muted, background: C.bg, padding: "1px 6px", borderRadius: 10 }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: "24px", minHeight: 600 }}>
          {/* Search */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <Search
              size={15}
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.muted }}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Have a question? Ask or enter a keyword..."
              style={{
                width: "100%",
                padding: "11px 14px 11px 42px",
                borderRadius: 10,
                border: `1.5px solid ${C.line}`,
                fontFamily: font.body,
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
                background: C.bg,
                color: C.dark,
              }}
              onFocus={(e) => (e.target.style.borderColor = C.primary)}
              onBlur={(e) => (e.target.style.borderColor = C.line)}
            />
          </div>

          {/* Sub-views */}
          {(forumView === "Questions" || forumView === "Home" || forumView === "Most Answered") && (
            <>
              <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
                {["Recent", "Most Answered", "Unanswered", "Featured"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setForumFilter(f)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 20,
                      border: `1.5px solid ${forumFilter === f ? C.primary : C.line}`,
                      background: forumFilter === f ? C.primary : "transparent",
                      color: forumFilter === f ? C.white : C.muted,
                      fontFamily: font.body,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filteredQs.map((q) => (
                  <div
                    key={q.id}
                    style={{
                      border: `1.5px solid ${C.line}`,
                      borderRadius: 14,
                      padding: 20,
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.primary;
                      e.currentTarget.style.boxShadow = C.cardShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.line;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ display: "flex", gap: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4,
                          flexShrink: 0,
                        }}
                      >
                        <button
                          onClick={() => handleVote(q.id, "up")}
                          style={{
                            background: q.userVote === "up" ? C.primary : C.bg,
                            border: `1.5px solid ${q.userVote === "up" ? C.primary : C.line}`,
                            borderRadius: 6,
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <ThumbsUp size={12} color={q.userVote === "up" ? C.white : C.muted} />
                        </button>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{q.votes}</span>
                        <button
                          onClick={() => handleVote(q.id, "down")}
                          style={{
                            background: q.userVote === "down" ? "#e74c3c" : C.bg,
                            border: `1.5px solid ${q.userVote === "down" ? "#e74c3c" : C.line}`,
                            borderRadius: 6,
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <ThumbsDown size={12} color={q.userVote === "down" ? C.white : C.muted} />
                        </button>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}
                        >
                          <Avatar initials={q.avatar} size={24} />
                          <span style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{q.author}</span>
                          <span style={{ fontSize: 11, color: C.muted }}>· Asked {q.time}</span>
                          <span style={{ fontSize: 11, color: C.muted }}>· {q.views} views</span>
                          <Pill color={C.primary} small>
                            {q.tag}
                          </Pill>
                          {q.pinned && (
                            <Pill color="#D4AF37" bg="#FFF8E7" small border={false}>
                              📌 Pinned
                            </Pill>
                          )}
                        </div>
                        <h3
                          style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: "0 0 6px", lineHeight: 1.4 }}
                        >
                          {q.title}
                        </h3>
                        <p style={{ fontSize: 12, color: C.muted, margin: "0 0 12px", lineHeight: 1.5 }}>{q.preview}</p>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "5px 12px",
                              borderRadius: 6,
                              border: `1px solid ${C.line}`,
                              background: "transparent",
                              cursor: "pointer",
                              fontSize: 11,
                              color: C.muted,
                              fontFamily: font.body,
                            }}
                          >
                            <MessageSquare size={11} />
                            {q.answers} Answers
                          </button>
                          <button
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "5px 12px",
                              borderRadius: 6,
                              border: `1px solid ${C.line}`,
                              background: "transparent",
                              cursor: "pointer",
                              fontSize: 11,
                              color: C.muted,
                              fontFamily: font.body,
                            }}
                          >
                            <Bookmark size={11} />
                            Follow
                          </button>
                          <button
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "5px 12px",
                              borderRadius: 6,
                              border: `1px solid ${C.line}`,
                              background: "transparent",
                              cursor: "pointer",
                              fontSize: 11,
                              color: C.muted,
                              fontFamily: font.body,
                            }}
                          >
                            <Share2 size={11} />
                            Share
                          </button>
                          <button
                            style={{
                              marginLeft: "auto",
                              padding: "5px 14px",
                              borderRadius: 6,
                              border: `1.5px solid ${C.accent}`,
                              background: C.accent,
                              cursor: "pointer",
                              fontSize: 11,
                              fontWeight: 700,
                              color: C.primary,
                              fontFamily: font.body,
                            }}
                          >
                            Answer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {forumView === "Polls" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  q: "Which sector should BRIDGE prioritize for its next flagship venture?",
                  options: ["Agriculture", "Health Systems", "Energy", "Manufacturing"],
                  votes: [42, 31, 18, 9],
                },
                {
                  q: "What is the biggest barrier to financial inclusion for rural Ghanaians?",
                  options: [
                    "No mobile coverage",
                    "Lack of ID documents",
                    "Low digital literacy",
                    "High transaction fees",
                  ],
                  votes: [28, 22, 35, 15],
                },
                {
                  q: "Should BRIDGE publish quarterly sector performance reports publicly?",
                  options: ["Yes — full transparency", "Yes — summary only", "No — members only", "No preference"],
                  votes: [58, 24, 12, 6],
                },
              ].map((poll, pi) => {
                const total = poll.votes.reduce((a, b) => a + b, 0);
                return (
                  <div key={pi} style={{ border: `1.5px solid ${C.line}`, borderRadius: 14, padding: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: C.dark, margin: "0 0 16px", lineHeight: 1.4 }}>
                      {poll.q}
                    </h3>
                    {poll.options.map((opt, oi) => {
                      const pct = Math.round((poll.votes[oi] / total) * 100);
                      return (
                        <div key={oi} style={{ marginBottom: 10 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 13, color: C.dark }}>{opt}</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>{pct}%</span>
                          </div>
                          <div style={{ height: 8, borderRadius: 6, background: C.line, overflow: "hidden" }}>
                            <div
                              style={{
                                width: `${pct}%`,
                                height: "100%",
                                background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
                                borderRadius: 6,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                    <div style={{ marginTop: 12, fontSize: 12, color: C.muted }}>
                      {total} votes · Closes Mar 14, 2026
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {forumView === "Groups" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                {
                  name: "Kejetia Market Digitization",
                  sector: "Infrastructure",
                  members: 18,
                  active: true,
                  desc: "Coordinating Phase 2 of the digital payment rollout across 10,000+ stalls.",
                },
                {
                  name: "Northern Corridor AgriFinance",
                  sector: "Agriculture",
                  members: 12,
                  active: true,
                  desc: "Designing cooperative financing models for smallholder farmers in Brong-Ahafo.",
                },
                {
                  name: "TVET Skills Pipeline",
                  sector: "Education",
                  members: 9,
                  active: false,
                  desc: "Aligning TVET curriculum with BRIDGE manufacturing sector venture requirements.",
                },
                {
                  name: "CHW Deployment Task Force",
                  sector: "Health Systems",
                  members: 14,
                  active: true,
                  desc: "Scaling community health worker programs across the UE Region.",
                },
                {
                  name: "FinTech Innovation Lab",
                  sector: "Technology",
                  members: 22,
                  active: true,
                  desc: "Piloting mobile-first financial tools for unbanked populations.",
                },
                {
                  name: "Renewable Energy Atlas",
                  sector: "Energy",
                  members: 7,
                  active: false,
                  desc: "Mapping off-grid solar opportunity zones across Ghana's rural districts.",
                },
              ].map((g, i) => (
                <div
                  key={i}
                  style={{
                    border: `1.5px solid ${C.line}`,
                    borderRadius: 14,
                    padding: 20,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.primary)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.line)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 10,
                    }}
                  >
                    <Pill color={C.primary} small border>
                      {g.sector}
                    </Pill>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: g.active ? "#27AE60" : C.muted,
                        background: g.active ? "#27AE6015" : C.bg,
                        padding: "3px 8px",
                        borderRadius: 20,
                      }}
                    >
                      {g.active ? "● Active" : "○ Inactive"}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: "0 0 8px" }}>{g.name}</h3>
                  <p style={{ fontSize: 12, color: C.muted, margin: "0 0 14px", lineHeight: 1.5 }}>{g.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: C.muted }}>
                      <Users size={11} style={{ display: "inline", marginRight: 4 }} />
                      {g.members} members
                    </span>
                    <button
                      style={{
                        padding: "5px 14px",
                        borderRadius: 20,
                        border: `1.5px solid ${C.primary}`,
                        background: "transparent",
                        color: C.primary,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: font.body,
                      }}
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {forumView === "Tags" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { tag: "post-harvest-loss", count: 34 },
                { tag: "kejetia-market", count: 28 },
                { tag: "tvet-curriculum", count: 19 },
                { tag: "chw-deployment", count: 22 },
                { tag: "mobile-money", count: 41 },
                { tag: "off-grid-solar", count: 15 },
                { tag: "cooperative-finance", count: 27 },
                { tag: "2026-budget", count: 33 },
                { tag: "youth-employment", count: 18 },
                { tag: "northern-corridor", count: 12 },
                { tag: "fintech-pilot", count: 24 },
                { tag: "agri-value-chain", count: 38 },
                { tag: "housing-deficit", count: 16 },
                { tag: "health-equity", count: 29 },
                { tag: "digital-literacy", count: 21 },
                { tag: "impact-score", count: 11 },
                { tag: "bridge-ventures", count: 45 },
                { tag: "ghanapostgps", count: 9 },
              ].map((t, i) => (
                <button
                  key={i}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 20,
                    border: `1.5px solid ${C.line}`,
                    background: C.bg,
                    fontFamily: font.body,
                    fontSize: 13,
                    color: C.text,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = C.accent;
                    e.currentTarget.style.background = `${C.accent}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.line;
                    e.currentTarget.style.background = C.bg;
                  }}
                >
                  <Tag size={11} color={C.primary} />
                  {t.tag}
                  <span
                    style={{
                      fontSize: 11,
                      color: C.muted,
                      background: C.white,
                      padding: "1px 6px",
                      borderRadius: 10,
                      border: `1px solid ${C.line}`,
                    }}
                  >
                    ×{t.count}
                  </span>
                </button>
              ))}
            </div>
          )}

          {forumView === "Sectors" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  style={{
                    border: `1.5px solid ${C.line}`,
                    borderRadius: 14,
                    padding: 20,
                    transition: "border-color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.line)}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${C.primary}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 10,
                      color: C.primary,
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{cat.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{cat.count} discussions</div>
                </div>
              ))}
            </div>
          )}

          {forumView === "Badges" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {[
                { name: "First Answer", icon: "🎯", desc: "Answered your first community question", earned: true },
                {
                  name: "Sector Expert",
                  icon: "🏅",
                  desc: "Top 5 contributor in your sector for 30 days",
                  earned: true,
                },
                { name: "Champion", icon: "🏆", desc: "Reached Champion status (2,500+ points)", earned: true },
                { name: "Insight Publisher", icon: "📊", desc: "Published 5+ sector analysis reports", earned: false },
                {
                  name: "Working Group Lead",
                  icon: "👥",
                  desc: "Led a BRIDGE working group to completion",
                  earned: false,
                },
                {
                  name: "Policy Watcher",
                  icon: "📋",
                  desc: "Flagged 10+ policy developments for the community",
                  earned: false,
                },
                {
                  name: "Bridge Builder",
                  icon: "🌉",
                  desc: "Connected 3+ members across different sectors",
                  earned: false,
                },
                { name: "Leader", icon: "⭐", desc: "Reached Leader status (5,000+ points)", earned: false },
                {
                  name: "Ghana First",
                  icon: "🇬🇭",
                  desc: "Completed all 12 sector profiles in your dashboard",
                  earned: false,
                },
              ].map((b, i) => (
                <div
                  key={i}
                  style={{
                    border: `1.5px solid ${b.earned ? C.primary : C.line}`,
                    borderRadius: 14,
                    padding: 20,
                    opacity: b.earned ? 1 : 0.6,
                    background: b.earned ? `${C.primary}06` : "transparent",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{b.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: b.earned ? C.primary : C.dark }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4, lineHeight: 1.4 }}>{b.desc}</div>
                  {b.earned && (
                    <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, color: "#27AE60" }}>✓ Earned</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div style={{ borderLeft: `1px solid ${C.line}`, padding: "24px 16px" }}>
          <SectionLabel>All Sectors</SectionLabel>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
                borderBottom: `1px solid ${C.line}20`,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.text }}>
                <span style={{ color: C.primary }}>{cat.icon}</span>
                {cat.name}
              </span>
              <span style={{ fontSize: 11, color: C.muted }}>{cat.count}</span>
            </div>
          ))}
          <div style={{ marginTop: 24 }}>
            <SectionLabel>Top Members</SectionLabel>
            {MEMBERS.map((m, i) => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, minWidth: 16 }}>#{i + 1}</span>
                <Avatar initials={m.avatar} size={28} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{m.name}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{m.role}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.primary }}>{m.points.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MEMBERS PAGE ──────────────────────────────────────────────
const ALL_MEMBERS = [
  {
    id: 1,
    name: "Abena Owusu",
    role: "Infrastructure Advisor",
    location: "Accra",
    points: 2840,
    badge: "Champion",
    avatar: "AO",
    sector: "Infrastructure",
    type: "Premium",
    joined: "Jan 2025",
  },
  {
    id: 2,
    name: "Kofi Mensah",
    role: "AgriFinance Specialist",
    location: "Kumasi",
    points: 2210,
    badge: "Contributor",
    avatar: "KM",
    sector: "Agriculture",
    type: "Premium",
    joined: "Mar 2025",
  },
  {
    id: 3,
    name: "Efua Asante",
    role: "Health Systems Lead",
    location: "Tamale",
    points: 1990,
    badge: "Contributor",
    avatar: "EA",
    sector: "Health Systems",
    type: "Diaspora",
    joined: "Feb 2025",
  },
  {
    id: 4,
    name: "Kwame Boateng",
    role: "Tech Innovation Director",
    location: "London",
    points: 1750,
    badge: "Newcomer",
    avatar: "KB",
    sector: "Technology",
    type: "Diaspora",
    joined: "Jun 2025",
  },
  {
    id: 5,
    name: "Ama Darko",
    role: "Education Specialist",
    location: "Cape Coast",
    points: 1540,
    badge: "Newcomer",
    avatar: "AD",
    sector: "Education",
    type: "Premium",
    joined: "Aug 2025",
  },
  {
    id: 6,
    name: "Fiifi Mensah",
    role: "Energy Policy Analyst",
    location: "Accra",
    points: 1320,
    badge: "Newcomer",
    avatar: "FM",
    sector: "Energy",
    type: "Premium",
    joined: "Sep 2025",
  },
  {
    id: 7,
    name: "Adwoa Boateng",
    role: "Housing Finance Lead",
    location: "Toronto",
    points: 1180,
    badge: "Newcomer",
    avatar: "AB",
    sector: "Housing",
    type: "Diaspora",
    joined: "Oct 2025",
  },
  {
    id: 8,
    name: "Nana Asare",
    role: "Transport & Logistics Advisor",
    location: "Takoradi",
    points: 980,
    badge: "Newcomer",
    avatar: "NA",
    sector: "Transportation",
    type: "Premium",
    joined: "Nov 2025",
  },
];

function MembersPage() {
  const [search, setSearch] = useState("");
  const [filterSector, setFilterSector] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterBadge, setFilterBadge] = useState("All");

  const filtered = ALL_MEMBERS.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
    const matchSector = filterSector === "All" || m.sector === filterSector;
    const matchType = filterType === "All" || m.type === filterType;
    const matchBadge = filterBadge === "All" || m.badge === filterBadge;
    return matchSearch && matchSector && matchType && matchBadge;
  });

  const badgeColor = { Champion: C.accent, Contributor: "#2C5F8A", Newcomer: "#888" };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <SectionLabel>Community</SectionLabel>
        <h2
          style={{
            fontFamily: font.display,
            fontSize: 32,
            fontWeight: 700,
            color: C.primary,
            margin: "0 0 8px",
            letterSpacing: "-0.5px",
          }}
        >
          Member <span style={{ color: C.accent }}>Directory</span>
        </h2>
        <p style={{ fontSize: 15, color: C.muted, margin: 0 }}>
          {ALL_MEMBERS.length} members across Ghana and the diaspora
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          background: C.white,
          borderRadius: 16,
          padding: 20,
          boxShadow: C.cardShadow,
          marginBottom: 24,
          display: "flex",
          gap: 16,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search
            size={14}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or role..."
            style={{
              width: "100%",
              padding: "9px 12px 9px 36px",
              borderRadius: 10,
              border: `1.5px solid ${C.line}`,
              fontFamily: font.body,
              fontSize: 13,
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = C.primary)}
            onBlur={(e) => (e.target.style.borderColor = C.line)}
          />
        </div>
        {[
          { label: "Type", val: filterType, set: setFilterType, opts: ["All", "Premium", "Diaspora"] },
          {
            label: "Badge",
            val: filterBadge,
            set: setFilterBadge,
            opts: ["All", "Champion", "Contributor", "Newcomer"],
          },
          { label: "Sector", val: filterSector, set: setFilterSector, opts: ["All", ...CATEGORIES.map((c) => c.name)] },
        ].map((f) => (
          <select
            key={f.label}
            value={f.val}
            onChange={(e) => f.set(e.target.value)}
            style={{
              padding: "9px 14px",
              borderRadius: 10,
              border: `1.5px solid ${C.line}`,
              fontFamily: font.body,
              fontSize: 13,
              color: C.text,
              background: C.white,
              cursor: "pointer",
              outline: "none",
            }}
          >
            {f.opts.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ))}
        <span style={{ fontSize: 13, color: C.muted, marginLeft: "auto" }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { val: ALL_MEMBERS.length, label: "Total Members" },
          { val: ALL_MEMBERS.filter((m) => m.type === "Diaspora").length, label: "Diaspora Network" },
          { val: ALL_MEMBERS.filter((m) => m.badge === "Champion").length, label: "Champions" },
          { val: [...new Set(ALL_MEMBERS.map((m) => m.sector))].length, label: "Sectors Represented" },
        ].map((s) => (
          <div
            key={s.label}
            style={{ background: C.white, borderRadius: 14, padding: "18px 20px", boxShadow: C.cardShadow }}
          >
            <div style={{ fontFamily: font.display, fontSize: 28, fontWeight: 800, color: C.primary }}>{s.val}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Member Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {filtered.map((m) => (
          <div
            key={m.id}
            style={{
              background: C.white,
              borderRadius: 16,
              padding: 24,
              boxShadow: C.cardShadow,
              border: `1.5px solid transparent`,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.line)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
              <Avatar initials={m.avatar} size={48} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>{m.name}</div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: badgeColor[m.badge],
                      background: badgeColor[m.badge] + "18",
                      padding: "2px 8px",
                      borderRadius: 20,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {m.badge}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{m.role}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                <MapPin size={11} color={C.primary} />
                {m.location}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                <Briefcase size={11} color={C.primary} />
                {m.sector}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                <Shield size={11} color={m.type === "Diaspora" ? "#2C5F8A" : C.primary} />
                <span style={{ color: m.type === "Diaspora" ? "#2C5F8A" : C.primary, fontWeight: 600 }}>{m.type}</span>
                <span>· Joined {m.joined}</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{m.points.toLocaleString()} pts</span>
              <button
                style={{
                  padding: "6px 16px",
                  borderRadius: 20,
                  border: `1.5px solid ${C.primary}`,
                  background: "transparent",
                  color: C.primary,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: font.body,
                }}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RESOURCES PAGE ────────────────────────────────────────────
const RESOURCES_DATA = [
  {
    id: 1,
    type: "Sector Analysis",
    title: "Infrastructure & Basic Services — 2026 Sector Analysis",
    sector: "Infrastructure",
    date: "Feb 2026",
    pages: 42,
    featured: true,
    desc: "Comprehensive analysis of Ghana's infrastructure gaps, BRIDGE venture pipeline, and policy alignment across roads, utilities, and digital infrastructure.",
  },
  {
    id: 2,
    type: "Strategy Brief",
    title: "Agricultural Value Chain Transformation in the Northern Corridor",
    sector: "Agriculture",
    date: "Jan 2026",
    pages: 28,
    featured: true,
    desc: "BRIDGE's strategic positioning in Ghana's agri-food system: post-harvest loss, cooperative financing, and the Ejura Agricultural Hub Business Plan.",
  },
  {
    id: 3,
    type: "Policy Alignment",
    title: "2026 Budget — BRIDGE Strategic Alignment Report",
    sector: "Policy",
    date: "Feb 2026",
    pages: 18,
    featured: false,
    desc: "How Ghana's 2026 budget GH₵8.9B infrastructure allocation aligns with BRIDGE sector priorities and creates actionable entry points.",
  },
  {
    id: 4,
    type: "Sector Analysis",
    title: "Financial Inclusion: Closing the Access Gap in Rural Ghana",
    sector: "Financial Inclusion",
    date: "Dec 2025",
    pages: 35,
    featured: false,
    desc: "Mobile money penetration, cooperative banking, and BRIDGE's financial inclusion venture pipeline targeting the unbanked bottom 30%.",
  },
  {
    id: 5,
    type: "Framework",
    title: "BRIDGE Impact Assessment Framework v2",
    sector: "Cross-Sector",
    date: "Jan 2026",
    pages: 22,
    featured: false,
    desc: "Methodology for scoring ventures across Peace & Prosperity Alignment, Strategic Fit, Feasibility, and Scalability dimensions.",
  },
  {
    id: 6,
    type: "Sector Analysis",
    title: "Health Systems Capacity — CHW Deployment & Rural Reach",
    sector: "Health Systems",
    date: "Nov 2025",
    pages: 31,
    featured: false,
    desc: "Community health worker program design, NHIA integration, and health equity metrics for Northern Corridor deployment.",
  },
  {
    id: 7,
    type: "Government Brief",
    title: "Government Partnership Strategy — Key Ministries & Entry Points",
    sector: "Policy",
    date: "Jan 2026",
    pages: 15,
    featured: false,
    desc: "Strategic engagement map across MoFA, MoH, MESTI, and other key government actors aligned with BRIDGE's sector priorities.",
  },
  {
    id: 8,
    type: "Sector Analysis",
    title: "Technology & Innovation: Ghana's Digital Infrastructure Opportunity",
    sector: "Technology",
    date: "Dec 2025",
    pages: 38,
    featured: false,
    desc: "GhanaPostGPS, mobile money ecosystems, and BRIDGE's tech venture pipeline — building Ghana's digital backbone.",
  },
];

const TYPE_COLORS = {
  "Sector Analysis": C.primary,
  "Strategy Brief": "#7B5EA7",
  "Policy Alignment": "#2C5F8A",
  Framework: "#C07A2A",
  "Government Brief": "#B04040",
};

function ResourcesPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");

  const types = ["All", ...new Set(RESOURCES_DATA.map((r) => r.type))];
  const filtered = RESOURCES_DATA.filter((r) => {
    const matchType = typeFilter === "All" || r.type === typeFilter;
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) || r.sector.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });
  const featured = filtered.filter((r) => r.featured);
  const rest = filtered.filter((r) => !r.featured);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <SectionLabel>Knowledge Hub</SectionLabel>
        <h2
          style={{
            fontFamily: font.display,
            fontSize: 32,
            fontWeight: 700,
            color: C.primary,
            margin: "0 0 8px",
            letterSpacing: "-0.5px",
          }}
        >
          BRIDGE <span style={{ color: C.accent }}>Resources</span>
        </h2>
        <p style={{ fontSize: 15, color: C.muted, margin: 0 }}>
          Sector analyses, strategy briefs, frameworks, and policy documents
        </p>
      </div>

      {/* Search + Filter */}
      <div
        style={{
          background: C.white,
          borderRadius: 16,
          padding: 20,
          boxShadow: C.cardShadow,
          marginBottom: 24,
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: 1 }}>
          <Search
            size={14}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources by title or sector..."
            style={{
              width: "100%",
              padding: "9px 12px 9px 36px",
              borderRadius: 10,
              border: `1.5px solid ${C.line}`,
              fontFamily: font.body,
              fontSize: 13,
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = C.primary)}
            onBlur={(e) => (e.target.style.borderColor = C.line)}
          />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              style={{
                padding: "8px 14px",
                borderRadius: 20,
                border: `1.5px solid ${typeFilter === t ? C.primary : C.line}`,
                background: typeFilter === t ? C.primary : "transparent",
                color: typeFilter === t ? C.white : C.muted,
                fontFamily: font.body,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.5px",
              color: C.muted,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Featured
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {featured.map((r) => (
              <div
                key={r.id}
                style={{
                  background: `linear-gradient(135deg, ${C.primary} 0%, #0e2e24 100%)`,
                  borderRadius: 16,
                  padding: 28,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: C.accent,
                      background: "rgba(184,217,53,0.15)",
                      padding: "3px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {r.type}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                    {r.pages}p · {r.date}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: font.display,
                    fontSize: 17,
                    fontWeight: 700,
                    color: C.white,
                    margin: "0 0 10px",
                    lineHeight: 1.35,
                  }}
                >
                  {r.title}
                </h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: "0 0 20px", lineHeight: 1.5 }}>
                  {r.desc}
                </p>
                <button
                  style={{
                    padding: "8px 18px",
                    borderRadius: 20,
                    border: `1.5px solid ${C.accent}`,
                    background: "transparent",
                    color: C.accent,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: font.body,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <BookOpen size={13} /> Read Report
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.5px",
          color: C.muted,
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        {typeFilter === "All" ? "All Resources" : typeFilter} {filtered.length > 0 && `(${filtered.length})`}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rest.map((r) => (
          <div
            key={r.id}
            style={{
              background: C.white,
              borderRadius: 14,
              padding: "20px 24px",
              boxShadow: C.cardShadow,
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
              border: `1.5px solid transparent`,
              transition: "border-color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.line)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: (TYPE_COLORS[r.type] || C.primary) + "14",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <BookOpen size={18} color={TYPE_COLORS[r.type] || C.primary} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    color: TYPE_COLORS[r.type] || C.primary,
                    background: (TYPE_COLORS[r.type] || C.primary) + "12",
                    padding: "2px 8px",
                    borderRadius: 20,
                  }}
                >
                  {r.type}
                </span>
                <Pill color={C.primary} small border>
                  {r.sector}
                </Pill>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: "0 0 4px", lineHeight: 1.35 }}>
                {r.title}
              </h3>
              <p style={{ fontSize: 12, color: C.muted, margin: "0 0 10px", lineHeight: 1.5 }}>{r.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, color: C.muted }}>{r.pages} pages</span>
                <span style={{ fontSize: 11, color: C.muted }}>·</span>
                <span style={{ fontSize: 11, color: C.muted }}>{r.date}</span>
              </div>
            </div>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                border: `1.5px solid ${C.primary}`,
                background: "transparent",
                color: C.primary,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: font.body,
                whiteSpace: "nowrap",
              }}
            >
              Read
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HOME PAGE CONTENT ─────────────────────────────────────────
function HomePageContent({
  user,
  mType,
  contributions,
  setContributions,
  savedInsight,
  setSavedInsight,
  noteText,
  setNoteText,
  noteSaved,
  setNoteSaved,
  activeTab,
  setActiveTab,
  expandedGoal,
  setExpandedGoal,
  setShowGoalModal,
  setCurrentPage,
}) {
  return (
    <>
      {/* ── 3-COLUMN WIDGET ROW ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 320px", gap: 20, marginBottom: 28 }}>
        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Featured Insight */}
          <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: C.cardShadow }}>
            <SectionLabel>Today's Featured Insight</SectionLabel>
            <div
              style={{
                background: `linear-gradient(135deg, ${C.primary}12, ${C.accent}10)`,
                border: `1px solid ${C.primary}20`,
                borderRadius: 12,
                padding: "16px 18px",
                marginBottom: 16,
              }}
            >
              <p style={{ fontSize: 15, color: C.dark, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                "{INSIGHTS[0]}"
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setSavedInsight(!savedInsight)}
                style={{
                  flex: 1,
                  padding: "9px 16px",
                  borderRadius: 8,
                  border: `1.5px solid ${savedInsight ? C.primary : C.line}`,
                  background: savedInsight ? C.primary : "transparent",
                  color: savedInsight ? C.white : C.text,
                  cursor: "pointer",
                  fontFamily: font.body,
                  fontSize: 13,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Bookmark size={14} />
                {savedInsight ? "Saved" : "Save"}
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "9px 16px",
                  borderRadius: 8,
                  border: `1.5px solid ${C.accent}`,
                  background: C.accent,
                  color: C.primary,
                  cursor: "pointer",
                  fontFamily: font.body,
                  fontSize: 13,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Heart size={14} />
                Like
              </button>
            </div>
          </div>

          {/* Active Contributions */}
          <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: C.cardShadow }}>
            <SectionLabel>Your Active Contributions</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {contributions.map((item, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setContributions((prev) => prev.map((c, j) => (j === i ? { ...c, done: !c.done } : c)))
                  }
                  style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: `1.5px solid ${item.done ? C.primary : C.line}`,
                      background: item.done ? C.primary : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s",
                    }}
                  >
                    {item.done && <Check size={11} color={C.white} strokeWidth={3} />}
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      color: item.done ? C.muted : C.dark,
                      textDecoration: item.done ? "line-through" : "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <button
              style={{
                width: "100%",
                padding: "9px",
                borderRadius: 8,
                border: `1.5px solid ${C.primary}`,
                background: "transparent",
                color: C.primary,
                cursor: "pointer",
                fontFamily: font.body,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Save Progress
            </button>
          </div>

          {/* This Week's Impact */}
          <div
            style={{
              background: `linear-gradient(135deg, ${C.primary} 0%, #0e2e24 100%)`,
              borderRadius: 16,
              padding: 24,
              boxShadow: C.cardShadow,
              flex: 1,
            }}
          >
            <SectionLabel children={<span style={{ color: "rgba(255,255,255,0.5)" }}>This Week's Impact</span>} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { val: "3", label: "Discussions joined", delta: "+1 from last week" },
                { val: "1", label: "Insights submitted", delta: "On track" },
                { val: "12", label: "Community upvotes received", delta: "+4 from last week" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: i < 2 ? 14 : 0,
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: C.accent,
                        fontFamily: font.display,
                        lineHeight: 1,
                      }}
                    >
                      {s.val}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>{s.label}</div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: s.delta.startsWith("+") ? C.accent : "rgba(255,255,255,0.35)",
                      fontWeight: 600,
                    }}
                  >
                    {s.delta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Progress Tracker */}
          <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: C.cardShadow }}>
            <SectionLabel>Community Journey</SectionLabel>
            <div style={{ marginBottom: 20 }}>
              <StepTracker steps={JOURNEY_STEPS} current={user.journey} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>Progress to Leader</span>
              <span style={{ fontSize: 13, color: C.primary, fontWeight: 700 }}>2,840 / 5,000 pts</span>
            </div>
            <ProgressBar value={56.8} />
            <p style={{ fontSize: 12, color: C.muted, marginTop: 10 }}>
              2,160 points needed to reach Leader status. Answer 3 more questions to earn a milestone bonus.
            </p>
          </div>

          {/* Weekly Ghana Briefing */}
          <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: C.cardShadow, flex: 1 }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}
            >
              <SectionLabel>Weekly Ghana Briefing</SectionLabel>
              <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, letterSpacing: "0.5px" }}>
                Mar 3 – 7, 2026
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, overflowY: "auto", maxHeight: 320 }}>
              {[
                {
                  tag: "Policy",
                  tagColor: "#2C5F8A",
                  headline: "Ghana's 2026 Budget passes second reading — GH₵8.9B directed to infrastructure & energy",
                  signal: "↑ High relevance to Infrastructure, Energy sectors",
                },
                {
                  tag: "Agriculture",
                  tagColor: C.primary,
                  headline: "MoFA launches emergency maize storage programme across 6 northern regions",
                  signal: "↑ Aligns with BRIDGE post-harvest loss thesis",
                },
                {
                  tag: "Finance",
                  tagColor: "#7B5EA7",
                  headline: "Bank of Ghana holds policy rate at 27% — fintech lending volumes rise 18% QoQ",
                  signal: "→ Watch: financial inclusion access gap widening",
                },
                {
                  tag: "Technology",
                  tagColor: "#C07A2A",
                  headline: "GhanaPostGPS integration with mobile money platforms goes live in 12 districts",
                  signal: "↑ Signals: logistics & last-mile delivery opportunity",
                },
                {
                  tag: "Health",
                  tagColor: "#B04040",
                  headline: "NHIA expands capitation coverage — 340,000 new beneficiaries enrolled in Q1",
                  signal: "↑ CHW deployment pipeline accelerating",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 0",
                    borderBottom: i < 4 ? `1px solid ${C.line}` : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        color: item.tagColor,
                        background: item.tagColor + "14",
                        padding: "2px 8px",
                        borderRadius: 20,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.dark, margin: "0 0 4px", lineHeight: 1.4 }}>
                    {item.headline}
                  </p>
                  <p style={{ fontSize: 11, color: C.muted, margin: 0, fontStyle: "italic" }}>{item.signal}</p>
                </div>
              ))}
            </div>
            <button
              style={{
                marginTop: 14,
                width: "100%",
                padding: "9px",
                borderRadius: 8,
                border: `1.5px solid ${C.line}`,
                background: "transparent",
                color: C.primary,
                fontFamily: font.body,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <BookOpen size={13} /> View Full Briefing
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Community Feed */}
          <div style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: C.cardShadow }}>
            <SectionLabel>Community Feed</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 220, overflowY: "auto" }}>
              {FEED_ITEMS.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Avatar initials={item.avatar} size={28} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 12, color: C.dark, lineHeight: 1.4 }}>
                      <strong>{item.name}</strong> {item.action}{" "}
                      <span style={{ color: C.primary, fontWeight: 600 }}>{item.subject}</span>
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
                      <span style={{ fontSize: 10, color: C.muted }}>{item.time}</span>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          padding: 0,
                        }}
                      >
                        <ThumbsUp size={10} color={C.muted} />
                        <span style={{ fontSize: 10, color: C.muted }}>{item.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Take a Note */}
          <div style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: C.cardShadow }}>
            <SectionLabel>Quick Note</SectionLabel>
            <textarea
              value={noteText}
              onChange={(e) => {
                setNoteText(e.target.value);
                setNoteSaved(false);
              }}
              placeholder="Capture an idea, observation, or question..."
              style={{
                width: "100%",
                minHeight: 80,
                resize: "none",
                border: `1.5px solid ${C.line}`,
                borderRadius: 10,
                padding: "10px 12px",
                fontFamily: font.body,
                fontSize: 12,
                color: C.dark,
                boxSizing: "border-box",
                outline: "none",
                lineHeight: 1.5,
              }}
              onFocus={(e) => (e.target.style.borderColor = C.primary)}
              onBlur={(e) => (e.target.style.borderColor = C.line)}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button
                onClick={() => setNoteSaved(true)}
                style={{
                  flex: 1,
                  padding: "7px",
                  borderRadius: 8,
                  border: `1.5px solid ${noteSaved ? C.primary : C.line}`,
                  background: noteSaved ? C.primary : "transparent",
                  color: noteSaved ? C.white : C.text,
                  cursor: "pointer",
                  fontFamily: font.body,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {noteSaved ? "✓ Saved" : "Save"}
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "7px",
                  borderRadius: 8,
                  border: `1.5px solid ${C.accent}`,
                  background: C.accent,
                  color: C.primary,
                  cursor: "pointer",
                  fontFamily: font.body,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Share
              </button>
            </div>
          </div>

          {/* Top Contributors */}
          <div style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: C.cardShadow }}>
            <SectionLabel>Top Contributors Today</SectionLabel>
            {MEMBERS.slice(0, 3).map((m, i) => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 2 ? 12 : 0 }}>
                <span style={{ fontSize: 16 }}>{["🥇", "🥈", "🥉"][i]}</span>
                <Avatar initials={m.avatar} size={28} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{m.name}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{m.sector}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>{m.points.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GOALS SECTION ── */}
      <section
        style={{ background: C.white, borderRadius: 20, padding: 32, boxShadow: C.cardShadow, marginBottom: 28 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <SectionLabel>Goals & Milestones</SectionLabel>
            <h2
              style={{
                fontFamily: font.display,
                fontSize: 24,
                fontWeight: 700,
                color: C.primary,
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              Your Contribution <span style={{ color: C.accent }}>Roadmap</span>
            </h2>
          </div>
          <button
            onClick={() => setShowGoalModal(true)}
            style={{
              padding: "10px 20px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              background: C.primary,
              color: C.white,
              fontFamily: font.body,
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Plus size={14} /> New Goal
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: `1px solid ${C.line}`, paddingBottom: 1 }}
        >
          {["active", "inactive", "completed", "draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 20px",
                border: "none",
                cursor: "pointer",
                fontFamily: font.body,
                fontSize: 13,
                fontWeight: 600,
                background: "transparent",
                textTransform: "capitalize",
                color: activeTab === tab ? C.primary : C.muted,
                borderBottom: `2px solid ${activeTab === tab ? C.primary : "transparent"}`,
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "active" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {GOALS.map((goal) => (
              <div
                key={goal.id}
                style={{
                  border: `1.5px solid ${C.line}`,
                  borderRadius: 14,
                  padding: 20,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.line)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <Pill color={C.primary} small border>
                      {goal.sector}
                    </Pill>
                    <h3
                      style={{
                        fontFamily: font.display,
                        fontSize: 15,
                        fontWeight: 700,
                        color: C.dark,
                        margin: "8px 0 4px",
                        lineHeight: 1.3,
                      }}
                    >
                      {goal.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                      <Calendar size={11} />
                      <span>{goal.deadline}</span>
                      <span style={{ color: C.accent, fontWeight: 700 }}>· {goal.daysLeft} days left</span>
                    </div>
                  </div>
                </div>

                <ProgressBar value={goal.progress} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 6,
                    fontSize: 11,
                    color: C.muted,
                  }}
                >
                  <span>
                    {goal.steps.filter((s) => s.done).length}/{goal.steps.length} steps
                  </span>
                  <span style={{ fontWeight: 700, color: C.primary }}>{goal.progress}%</span>
                </div>

                {/* Expandable Steps */}
                <button
                  onClick={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
                  style={{
                    marginTop: 12,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    color: C.primary,
                    padding: 0,
                  }}
                >
                  {expandedGoal === goal.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {expandedGoal === goal.id ? "Hide" : "View"} Micro-Steps
                </button>

                {expandedGoal === goal.id && (
                  <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                    {goal.steps.map((step, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 3,
                            border: `1.5px solid ${step.done ? C.primary : C.line}`,
                            background: step.done ? C.primary : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {step.done && <Check size={9} color={C.white} strokeWidth={3} />}
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            color: step.done ? C.muted : C.dark,
                            textDecoration: step.done ? "line-through" : "none",
                          }}
                        >
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
            <h3 style={{ fontFamily: font.display, fontSize: 20, color: C.primary, margin: "0 0 8px" }}>
              No {activeTab} goals yet
            </h3>
            <p style={{ color: C.muted, fontSize: 14, margin: "0 0 24px" }}>
              Start contributing and reach the BRIDGE Champion milestone
            </p>
            <button
              onClick={() => setShowGoalModal(true)}
              style={{
                padding: "12px 28px",
                borderRadius: 20,
                border: `2px solid ${C.primary}`,
                background: "transparent",
                color: C.primary,
                fontFamily: font.body,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Plus size={14} /> Create Goal
            </button>
          </div>
        )}
      </section>
    </>
  );
}

// ─── ROOT APP ──────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login");
  const [memberType, setMemberType] = useState("premium");

  return screen === "login" ? (
    <LoginPage
      onLogin={(type) => {
        setMemberType(type);
        setScreen("community");
      }}
    />
  ) : (
    <CommunityDashboard memberType={memberType} onLogout={() => setScreen("login")} />
  );
}
