import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
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

// ─── RESPONSIVE HOOK ──────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

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
      className="block"
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
      className="rounded-full flex items-center justify-center font-[Inter,sans-serif] font-bold shrink-0 tracking-[0.5px]"
      style={{
        width: size,
        height: size,
        background: bg,
        color,
        fontSize: size * 0.33,
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
      className="inline-flex items-center gap-1 rounded-full font-bold font-[Inter,sans-serif] tracking-[0.8px] uppercase"
      style={{
        padding: small ? "3px 10px" : "5px 14px",
        fontSize: small ? 10 : 11,
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
    <div className="w-full rounded-[10px] overflow-hidden" style={{ height, background: C.line }}>
      <div
        className="h-full rounded-[10px] transition-[width] duration-[800ms] ease-[ease]"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, ${C.primary}, ${color})`,
        }}
      />
    </div>
  );
}

// ─── STEP TRACKER ──────────────────────────────────────────────
function StepTracker({ steps, current }) {
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-none">
              <div
                className="rounded-full transition-all duration-300 flex items-center justify-center"
                style={{
                  width: active ? 20 : 14,
                  height: active ? 20 : 14,
                  background: done ? C.primary : active ? C.accent : C.line,
                  border: active ? `3px solid ${C.primary}` : done ? "none" : `2px solid ${C.line}`,
                }}
              >
                {done && <Check size={8} color={C.white} strokeWidth={3} />}
              </div>
              <span
                className="text-[10px] font-[Inter,sans-serif] mt-[6px] whitespace-nowrap"
                style={{
                  fontWeight: active ? 700 : 500,
                  color: active ? C.primary : done ? C.muted : C.line,
                }}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-[2px] mb-4 transition-[background] duration-300"
                style={{
                  background: done ? C.primary : C.line,
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
    <div className="flex items-center gap-2 mb-4">
      <span className="block w-[3px] h-4 rounded-sm" style={{ background: C.accent }} />
      <span
        className="font-[Inter,sans-serif] text-[11px] font-bold tracking-[1.5px] uppercase"
        style={{ color: C.primary }}
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
  const isMobile = useWindowWidth() < 768;

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
      className="min-h-screen flex font-[Inter,sans-serif]"
      style={{
        flexDirection: isMobile ? "column" : "row",
        background: C.primary,
      }}
    >
      {/* ── BRAND PANEL (full on desktop, compact header on mobile) ── */}
      {isMobile ? (
        /* Mobile: compact brand header */
        <div
          className="relative overflow-hidden"
          style={{
            padding: "32px 24px 28px",
            background: `linear-gradient(160deg, #0e2e24 0%, ${C.primary} 100%)`,
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              top: -40,
              right: -40,
              width: 180,
              height: 180,
              border: "1px solid rgba(184,217,53,0.12)",
            }}
          />
          <div className="relative z-[1]">
            <BridgeLogo height={36} />
            <p
              className="text-[13px] leading-[1.5] max-w-[280px]"
              style={{
                color: "rgba(255,255,255,0.55)",
                margin: "14px 0 0",
              }}
            >
              Where Ghana's <strong style={{ color: C.accent }}>Builders</strong> Come Together
            </p>
            {/* Mini stats row */}
            <div className="flex gap-6 mt-[18px]">
              {[
                { val: "174+", label: "Ventures" },
                { val: "6,200+", label: "Traders" },
                { val: "23%", label: "Yield Growth" },
              ].map((s) => (
                <div key={s.val}>
                  <div className="font-[DM_Sans,sans-serif] font-extrabold text-[18px]" style={{ color: C.accent }}>
                    {s.val}
                  </div>
                  <div className="text-[10px] tracking-[0.3px]" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Desktop: full left panel */
        <div
          className="flex-1 flex flex-col justify-between relative overflow-hidden"
          style={{
            padding: "60px 64px",
            background: `linear-gradient(160deg, #0e2e24 0%, ${C.primary} 60%, #1e5c4a 100%)`,
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              top: -80,
              left: -80,
              width: 300,
              height: 300,
              border: "1px solid rgba(184,217,53,0.12)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              top: 60,
              left: 40,
              width: 180,
              height: 180,
              border: "1px solid rgba(184,217,53,0.08)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              bottom: -60,
              right: -60,
              width: 400,
              height: 400,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              bottom: 80,
              right: 40,
              width: 200,
              height: 200,
              border: "1px solid rgba(184,217,53,0.1)",
            }}
          />

          <div className="relative z-[1]">
            <BridgeLogo height={48} />
          </div>
          <div className="relative z-[1]">
            <div className="mb-6">
              <Pill color={C.accent} bg="rgba(184,217,53,0.12)" border={false} small>
                Ghana-First Community
              </Pill>
            </div>
            <h1
              className="font-[DM_Sans,sans-serif] font-light text-[52px] leading-[1.1] tracking-[-1.5px] m-0 mb-6"
              style={{ color: C.white }}
            >
              Where Ghana's
              <br />
              <span className="font-extrabold" style={{ color: C.accent }}>Builders</span>
              <br />
              Come Together
            </h1>
            <p className="text-[16px] leading-[1.7] max-w-[380px] m-0" style={{ color: "rgba(255,255,255,0.6)" }}>
              Join a community of investors, innovators, and development professionals working to drive Peace &
              Prosperity across the nation.
            </p>
            <div className="flex gap-10 mt-12">
              {[
                { val: "174+", label: "Active Ventures" },
                { val: "6,200+", label: "Traders Onboarded" },
                { val: "23%", label: "Avg. Yield Growth" },
              ].map((s) => (
                <div key={s.val}>
                  <div className="font-[DM_Sans,sans-serif] font-extrabold text-[28px]" style={{ color: C.accent }}>
                    {s.val}
                  </div>
                  <div
                    className="text-[12px] font-medium tracking-[0.5px]"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="relative z-[1] pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p className="text-[13px] italic m-0" style={{ color: "rgba(255,255,255,0.35)" }}>
              "Blending Resources and Innovation to Drive Ghana's Empowerment"
            </p>
          </div>
        </div>
      )}

      {/* ── FORM PANEL ── */}
      <div
        className="flex flex-col overflow-y-auto"
        style={{
          width: isMobile ? "100%" : 480,
          background: C.bg,
          flex: isMobile ? 1 : "none",
          justifyContent: isMobile ? "flex-start" : "center",
          padding: isMobile ? "32px 24px 40px" : "60px 52px",
        }}
      >
        <div className="mb-7">
          <h2
            className="font-[DM_Sans,sans-serif] font-bold tracking-[-0.5px]"
            style={{
              fontSize: isMobile ? 26 : 32,
              color: C.primary,
              margin: "0 0 6px 0",
            }}
          >
            Welcome back
          </h2>
          <p className="text-[14px] m-0" style={{ color: C.muted }}>Sign in to your BRIDGE community account</p>
        </div>

        {/* Member Type Toggle */}
        <div className="mb-6">
          <div
            className="text-[11px] font-bold tracking-[1px] uppercase mb-2"
            style={{ color: C.muted }}
          >
            Account Type
          </div>
          <div
            className="flex rounded-xl overflow-hidden"
            style={{
              border: `1.5px solid ${C.line}`,
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
                className="flex-1 py-3 px-4 border-none cursor-pointer font-[Inter,sans-serif] text-[13px] font-semibold transition-all duration-200"
                style={{
                  background: memberType === t.key ? C.primary : "transparent",
                  color: memberType === t.key ? C.white : C.muted,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-[14px] mb-5">
          <div>
            <label className="text-[12px] font-semibold block mb-[6px]" style={{ color: C.text }}>
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-[14px] top-1/2 -translate-y-1/2"
                style={{ color: C.muted }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-[10px] font-[Inter,sans-serif] text-[15px] outline-none box-border"
                style={{
                  padding: "13px 14px 13px 42px",
                  border: `1.5px solid ${C.line}`,
                  background: C.white,
                  color: C.dark,
                }}
                onFocus={(e) => (e.target.style.borderColor = C.primary)}
                onBlur={(e) => (e.target.style.borderColor = C.line)}
              />
            </div>
          </div>
          <div>
            <label className="text-[12px] font-semibold block mb-[6px]" style={{ color: C.text }}>
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-[14px] top-1/2 -translate-y-1/2"
                style={{ color: C.muted }}
              />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-[10px] font-[Inter,sans-serif] text-[15px] outline-none box-border"
                style={{
                  padding: "13px 42px 13px 42px",
                  border: `1.5px solid ${C.line}`,
                  background: C.white,
                  color: C.dark,
                }}
                onFocus={(e) => (e.target.style.borderColor = C.primary)}
                onBlur={(e) => (e.target.style.borderColor = C.line)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-[14px] top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer p-0"
                style={{ color: C.muted }}
              >
                {showPass ? <Eye size={16} /> : <Lock size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setRemember(!remember)}
              className="w-5 h-5 rounded-[5px] flex items-center justify-center shrink-0 transition-all duration-200"
              style={{
                border: `1.5px solid ${remember ? C.primary : C.line}`,
                background: remember ? C.primary : "transparent",
              }}
            >
              {remember && <Check size={11} color={C.white} strokeWidth={3} />}
            </div>
            <span className="text-[13px]" style={{ color: C.text }}>Remember me</span>
          </label>
          <a href="/login" className="text-[13px] no-underline font-semibold" style={{ color: C.primary }}>
            Forgot password?
          </a>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-[15px] px-6 rounded-xl border-none font-[Inter,sans-serif] text-[15px] font-bold flex items-center justify-center gap-2 transition-all duration-200 min-h-[52px]"
          style={{
            cursor: loading ? "not-allowed" : "pointer",
            background: loading ? C.muted : C.primary,
            color: C.white,
          }}
        >
          {loading ? (
            <>
              <div
                className="w-4 h-4 rounded-full animate-spin"
                style={{
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
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

        <div className="text-center mt-5 text-[13px]" style={{ color: C.muted }}>
          Don't have an account?{" "}
          <a href="/login" className="font-bold no-underline" style={{ color: C.primary }}>
            Request Access
          </a>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: C.line }} />
          <span className="text-[12px]" style={{ color: C.muted }}>or</span>
          <div className="flex-1 h-px" style={{ background: C.line }} />
        </div>

        <button
          className="w-full py-[13px] px-5 rounded-xl cursor-pointer font-[Inter,sans-serif] text-[14px] font-semibold flex items-center justify-center gap-[10px] min-h-[48px]"
          style={{
            border: `1.5px solid ${C.line}`,
            background: C.white,
            color: C.text,
          }}
        >
          <Globe size={16} color={C.primary} />
          Continue with BRIDGE SSO
        </button>

        {isMobile && (
          <p
            className="text-center text-[11px] italic mt-8"
            style={{ color: "rgba(27,77,62,0.35)" }}
          >
            "Blending Resources and Innovation to Drive Ghana's Empowerment"
          </p>
        )}
      </div>

      <style>{`
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
    return map[pathname] ?? "Questions";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedInsight, setSavedInsight] = useState(false);
  const [currentPage, setCurrentPage] = useState(getInitialPage);

  const routeMap: Record<string, string> = {
    home: "/community",
    forum: "/community/forum",
    members: "/community/members",
    resources: "/community/resources",
  };

  const handleNavChange = (key: string) => {
    setCurrentPage(key);
    setMobileMenuOpen(false);
    navigate(routeMap[key] ?? "/community");
  };

  const [contributions, setContributions] = useState([
    { label: "Discussions participated in this week", done: true },
    { label: "Sector insight submitted", done: false },
    { label: "Question answered in your sector", done: true },
    { label: "Peer review completed", done: false },
  ]);

  const isMobile = useWindowWidth() < 768;
  const user = { name: "Joseph", initials: "JA", sector: "Infrastructure", journey: 2 };
  const mType = MEMBER_TYPES[memberType];

  const NAV_ITEMS = [
    { key: "home", label: "Home", icon: <Home size={20} /> },
    { key: "forum", label: "Forum", icon: <MessageSquare size={20} /> },
    { key: "members", label: "Members", icon: <Users size={20} /> },
    { key: "resources", label: "Resources", icon: <BookOpen size={20} /> },
  ];

  return (
    <div className="min-h-screen font-[Inter,sans-serif]" style={{ background: C.bg }}>
      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-[100] flex items-center justify-between"
        style={{
          background: C.white,
          borderBottom: `1px solid ${C.line}`,
          padding: isMobile ? "0 16px" : "0 32px",
          height: isMobile ? 56 : 64,
          boxShadow: "0 2px 12px rgba(27,77,62,0.06)",
        }}
      >
        <div className="flex items-center" style={{ gap: isMobile ? 10 : 40 }}>
          <div className="flex items-center gap-[10px]">
            <BridgeLogo height={isMobile ? 24 : 28} dark />
            <span
              className="text-[8px] font-bold tracking-[2px] pl-[10px]"
              style={{
                color: C.muted,
                borderLeft: `1px solid ${C.line}`,
              }}
            >
              COMMUNITY
            </span>
          </div>
          {/* Desktop nav */}
          {!isMobile && (
            <nav className="flex gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavChange(item.key)}
                  className="py-[6px] px-[14px] rounded-lg border-none cursor-pointer font-[Inter,sans-serif] text-[13px]"
                  style={{
                    background: currentPage === item.key ? `rgba(27,77,62,0.08)` : "transparent",
                    color: currentPage === item.key ? C.primary : C.text,
                    fontWeight: currentPage === item.key ? 700 : 500,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center" style={{ gap: isMobile ? 8 : 16 }}>
          {!isMobile && (
            <div
              className="flex items-center gap-[6px] py-[5px] px-3 rounded-[20px]"
              style={{
                background: mType.color + "18",
                border: `1.5px solid ${mType.color}30`,
              }}
            >
              <Shield size={12} color={mType.color} />
              <span className="text-[11px] font-bold tracking-[0.5px]" style={{ color: mType.color }}>
                {mType.badge}
              </span>
            </div>
          )}
          <button className="bg-none border-none cursor-pointer p-[6px] relative">
            <Bell size={isMobile ? 20 : 18} color={C.text} />
            <span
              className="absolute top-1 right-1 w-[7px] h-[7px] rounded-full"
              style={{
                background: C.accent,
                border: `2px solid ${C.white}`,
              }}
            />
          </button>
          {!isMobile && (
            <button className="bg-none border-none cursor-pointer p-[6px]">
              <MessageCircle size={18} color={C.text} />
            </button>
          )}
          <div
            className="flex items-center gap-2"
            style={{
              paddingLeft: isMobile ? 4 : 16,
              borderLeft: isMobile ? "none" : `1px solid ${C.line}`,
            }}
          >
            <Avatar initials={user.initials} size={isMobile ? 30 : 32} />
            {!isMobile && (
              <div>
                <div className="text-[13px] font-semibold leading-[1.2]" style={{ color: C.dark }}>{user.name}</div>
                <div className="text-[10px]" style={{ color: C.muted }}>2,840 pts</div>
              </div>
            )}
          </div>
          {isMobile ? (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-none border-none cursor-pointer p-[6px]"
            >
              {mobileMenuOpen ? <X size={22} color={C.dark} /> : <Menu size={22} color={C.dark} />}
            </button>
          ) : (
            <button
              onClick={onLogout}
              title="Sign out"
              className="bg-none border-none cursor-pointer p-[6px]"
            >
              <LogOut size={16} color={C.muted} />
            </button>
          )}
        </div>
      </header>

      {/* ── MOBILE SLIDE-DOWN MENU ── */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed top-[56px] left-0 right-0 z-[99]"
          style={{
            background: C.white,
            borderBottom: `1px solid ${C.line}`,
            boxShadow: "0 8px 32px rgba(27,77,62,0.12)",
            padding: "8px 0 12px",
          }}
        >
          <div className="mb-2" style={{ padding: "8px 16px 12px", borderBottom: `1px solid ${C.line}` }}>
            <div className="flex items-center gap-2">
              <Avatar initials={user.initials} size={36} />
              <div>
                <div className="text-[14px] font-bold" style={{ color: C.dark }}>{user.name}</div>
                <div className="flex items-center gap-[6px]">
                  <span className="text-[11px] font-semibold" style={{ color: C.primary }}>2,840 pts</span>
                  <span
                    className="text-[9px] font-bold py-px px-[7px] rounded-[10px]"
                    style={{
                      color: mType.color,
                      background: mType.color + "18",
                    }}
                  >
                    {mType.badge}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavChange(item.key)}
              className="flex items-center gap-[14px] w-full py-[13px] px-5 border-none cursor-pointer text-left font-[Inter,sans-serif] text-[15px]"
              style={{
                background: currentPage === item.key ? `${C.primary}08` : "transparent",
                color: currentPage === item.key ? C.primary : C.text,
                fontWeight: currentPage === item.key ? 700 : 400,
              }}
            >
              <span style={{ color: currentPage === item.key ? C.primary : C.muted }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="mt-2 pt-2" style={{ borderTop: `1px solid ${C.line}` }}>
            <button
              onClick={onLogout}
              className="flex items-center gap-[14px] w-full py-3 px-5 border-none cursor-pointer bg-transparent font-[Inter,sans-serif] text-[14px]"
              style={{ color: C.muted }}
            >
              <LogOut size={18} color={C.muted} /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* ── PAGE CONTENT ── */}
      <div
        className="mx-auto"
        style={{
          maxWidth: isMobile ? "100%" : 1280,
          padding: isMobile ? "16px 16px 88px" : "32px 32px 80px",
        }}
      >
        {currentPage === "home" && (
          <HomePageContent
            isMobile={isMobile}
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
            isMobile={isMobile}
            questions={questions}
            setQuestions={setQuestions}
            setShowQuestionModal={setShowQuestionModal}
            setCurrentPage={handleNavChange}
            initialForumView={getInitialForumView()}
          />
        )}
        {currentPage === "members" && <MembersPage isMobile={isMobile} />}
        {currentPage === "resources" && <ResourcesPage isMobile={isMobile} />}
      </div>

      {/* ── MOBILE BOTTOM TAB BAR ── */}
      {isMobile && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[100] flex h-16"
          style={{
            background: C.white,
            borderTop: `1px solid ${C.line}`,
            boxShadow: "0 -4px 20px rgba(27,77,62,0.08)",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavChange(item.key)}
                className="flex-1 flex flex-col items-center justify-center gap-[3px] border-none cursor-pointer bg-transparent py-2 px-0 relative"
                style={{ color: active ? C.primary : C.muted }}
              >
                {active && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-[3px]"
                    style={{ background: C.accent }}
                  />
                )}
                <div className="transition-colors duration-150" style={{ color: active ? C.primary : C.muted }}>{item.icon}</div>
                <span
                  className="text-[10px] font-[Inter,sans-serif] tracking-[0.2px]"
                  style={{ fontWeight: active ? 700 : 400 }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
      {/* ── CREATE GOAL MODAL ── */}
      {showGoalModal && (
        <div
          className="fixed inset-0 flex justify-center z-[200] backdrop-blur-[4px]"
          style={{
            background: "rgba(27,77,62,0.5)",
            alignItems: isMobile ? "flex-end" : "center",
          }}
          onClick={() => setShowGoalModal(false)}
        >
          <div
            style={{
              background: C.white,
              borderRadius: isMobile ? "20px 20px 0 0" : 20,
              padding: isMobile ? "28px 20px 36px" : 36,
              width: isMobile ? "100%" : 520,
              boxShadow: C.deepShadow,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-[DM_Sans,sans-serif] text-[20px] font-bold m-0" style={{ color: C.primary }}>
                Create New Goal
              </h2>
              <button
                onClick={() => setShowGoalModal(false)}
                className="bg-none border-none cursor-pointer"
              >
                <X size={20} color={C.muted} />
              </button>
            </div>
            {["Goal Name", "Details", "Deadline"].map((field) => (
              <div key={field} className="mb-[14px]">
                <label className="text-[12px] font-semibold block mb-[6px]" style={{ color: C.text }}>
                  {field}
                </label>
                {field === "Details" ? (
                  <textarea
                    placeholder={`Enter ${field.toLowerCase()}...`}
                    className="w-full rounded-[10px] font-[Inter,sans-serif] text-[14px] resize-none min-h-[80px] outline-none box-border"
                    style={{
                      border: `1.5px solid ${C.line}`,
                      padding: "10px 12px",
                    }}
                  />
                ) : (
                  <input
                    type={field === "Deadline" ? "date" : "text"}
                    placeholder={`Enter ${field.toLowerCase()}...`}
                    className="w-full p-3 rounded-[10px] font-[Inter,sans-serif] text-[14px] outline-none box-border"
                    style={{
                      border: `1.5px solid ${C.line}`,
                    }}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-[10px] mt-2">
              <button
                onClick={() => setShowGoalModal(false)}
                className="flex-1 p-[13px] rounded-[10px] bg-transparent cursor-pointer font-[Inter,sans-serif] text-[14px] font-semibold"
                style={{
                  border: `1.5px solid ${C.line}`,
                  color: C.text,
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowGoalModal(false)}
                className="flex-[2] p-[13px] rounded-[10px] border-none cursor-pointer font-[Inter,sans-serif] text-[14px] font-bold"
                style={{
                  background: C.primary,
                  color: C.white,
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
          className="fixed inset-0 flex justify-center z-[200] backdrop-blur-[4px]"
          style={{
            background: "rgba(27,77,62,0.5)",
            alignItems: isMobile ? "flex-end" : "center",
          }}
          onClick={() => setShowQuestionModal(false)}
        >
          <div
            style={{
              background: C.white,
              borderRadius: isMobile ? "20px 20px 0 0" : 20,
              padding: isMobile ? "28px 20px 36px" : 36,
              width: isMobile ? "100%" : 540,
              boxShadow: C.deepShadow,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-[DM_Sans,sans-serif] text-[20px] font-bold m-0" style={{ color: C.primary }}>
                Ask the Community
              </h2>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="bg-none border-none cursor-pointer"
              >
                <X size={20} color={C.muted} />
              </button>
            </div>
            <div className="mb-[14px]">
              <label className="text-[12px] font-semibold block mb-[6px]" style={{ color: C.text }}>
                Question
              </label>
              <input
                placeholder="What would you like to ask the BRIDGE community?"
                className="w-full p-3 rounded-[10px] font-[Inter,sans-serif] text-[14px] outline-none box-border"
                style={{ border: `1.5px solid ${C.line}` }}
              />
            </div>
            <div className="mb-[14px]">
              <label className="text-[12px] font-semibold block mb-[6px]" style={{ color: C.text }}>
                Details
              </label>
              <textarea
                placeholder="Add context, background, or supporting information..."
                className="w-full rounded-[10px] font-[Inter,sans-serif] text-[14px] resize-none min-h-[80px] outline-none box-border"
                style={{
                  border: `1.5px solid ${C.line}`,
                  padding: "10px 12px",
                }}
              />
            </div>
            <div className="mb-[18px]">
              <label className="text-[12px] font-semibold block mb-2" style={{ color: C.text }}>
                Sector Tag
              </label>
              <div className="flex flex-wrap gap-[6px]">
                {["Infrastructure", "Agriculture", "Health", "Technology", "Education", "Energy"].map((s) => (
                  <button
                    key={s}
                    className="py-[7px] px-[14px] rounded-[20px] bg-transparent cursor-pointer font-[Inter,sans-serif] text-[13px]"
                    style={{
                      border: `1.5px solid ${C.line}`,
                      color: C.text,
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
            <div className="flex gap-[10px]">
              <button
                onClick={() => setShowQuestionModal(false)}
                className="flex-1 p-[13px] rounded-[10px] bg-transparent cursor-pointer font-[Inter,sans-serif] text-[14px] font-semibold"
                style={{
                  border: `1.5px solid ${C.line}`,
                  color: C.text,
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="flex-[2] p-[13px] rounded-[10px] border-none cursor-pointer font-[Inter,sans-serif] text-[14px] font-bold flex items-center justify-center gap-2"
                style={{
                  background: C.accent,
                  color: C.primary,
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
function ForumPage({ isMobile, questions, setQuestions, setShowQuestionModal, setCurrentPage, initialForumView }) {
  const navigate = useNavigate();
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
  const handleForumNav = (label: string) => {
    if (label === "Members") {
      setCurrentPage("members");
    } else {
      setForumView(label);
    }
    navigate(forumRouteMap[label] ?? "/community/forum");
  };
  const [forumView, setForumView] = useState(initialForumView ?? "Questions");
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
    <div className="overflow-hidden" style={{ background: C.white, borderRadius: isMobile ? 16 : 20, boxShadow: C.cardShadow }}>
      {/* Header */}
      <div
        className="flex justify-between items-center gap-3"
        style={{
          padding: isMobile ? "20px 16px 16px" : "28px 32px 20px",
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div>
          <SectionLabel>Discussion Board</SectionLabel>
          <h2
            className="font-[DM_Sans,sans-serif] font-bold m-0 tracking-[-0.3px]"
            style={{
              fontSize: isMobile ? 22 : 28,
              color: C.primary,
            }}
          >
            Sector <span style={{ color: C.accent }}>Q&A Forum</span>
          </h2>
        </div>
        <button
          onClick={() => setShowQuestionModal(true)}
          className="rounded-[20px] border-none cursor-pointer font-[Inter,sans-serif] font-bold flex items-center gap-[6px] whitespace-nowrap shrink-0"
          style={{
            padding: isMobile ? "9px 14px" : "11px 22px",
            background: C.accent,
            color: C.primary,
            fontSize: isMobile ? 12 : 13,
          }}
        >
          <Plus size={14} />
          {isMobile ? "Ask" : "Ask a Question"}
        </button>
      </div>

      {/* Mobile: horizontal scrolling pill nav */}
      {isMobile && (
        <div
          className="overflow-x-auto flex gap-[6px] scrollbar-none"
          style={{
            padding: "12px 16px",
            borderBottom: `1px solid ${C.line}`,
            scrollbarWidth: "none",
          }}
        >
          <style>{`.forum-nav::-webkit-scrollbar{display:none}`}</style>
          {FORUM_NAV.filter((n) => n.label !== "Members").map((item) => {
            const isActive = forumView === item.label;
            return (
              <button
                key={item.label}
                onClick={() => handleForumNav(item.label)}
                className="flex items-center gap-[5px] py-[7px] px-[14px] rounded-[20px] font-[Inter,sans-serif] text-[12px] cursor-pointer whitespace-nowrap shrink-0"
                style={{
                  border: `1.5px solid ${isActive ? C.primary : C.line}`,
                  background: isActive ? C.primary : "transparent",
                  color: isActive ? C.white : C.muted,
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: isMobile ? "1fr" : "220px 1fr 260px" }}>
        {/* Left Nav — hidden on mobile (replaced by pill strip above) */}
        {!isMobile && (
          <div className="py-6 px-4" style={{ borderRight: `1px solid ${C.line}` }}>
            {FORUM_NAV.map((item) => {
              const isActive = forumView === item.label;
              const goesToMembers = item.label === "Members";
              return (
                <button
                  key={item.label}
                  onClick={() => handleForumNav(item.label)}
                  className="flex items-center gap-[10px] w-full py-[9px] px-3 rounded-lg border-none cursor-pointer font-[Inter,sans-serif] text-[13px] text-left mb-[2px] transition-all duration-150"
                  style={{
                    background: isActive ? `${C.primary}10` : "transparent",
                    color: isActive ? C.primary : C.muted,
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}

            <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${C.line}` }}>
              <div
                className="text-[10px] font-bold tracking-[1.5px] uppercase px-3 mb-[10px]"
                style={{ color: C.muted }}
              >
                Sectors
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  className="flex items-center justify-between w-full py-[6px] px-3 border-none cursor-pointer bg-transparent font-[Inter,sans-serif] text-[12px] text-left rounded-md"
                  style={{ color: C.text }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = C.bg)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span className="flex items-center gap-[6px]">
                    <span style={{ color: C.primary }}>{cat.icon}</span>
                    {cat.name}
                  </span>
                  <span
                    className="text-[11px] py-px px-[6px] rounded-[10px]"
                    style={{ color: C.muted, background: C.bg }}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div style={{ padding: isMobile ? "16px" : "24px", minHeight: isMobile ? "auto" : 600 }}>
          {/* Search */}
          <div className="relative mb-4">
            <Search
              size={15}
              className="absolute left-[14px] top-1/2 -translate-y-1/2"
              style={{ color: C.muted }}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Have a question? Ask or enter a keyword..."
              className="w-full rounded-[10px] font-[Inter,sans-serif] text-[13px] outline-none box-border"
              style={{
                padding: "11px 14px 11px 42px",
                border: `1.5px solid ${C.line}`,
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
              <div className="flex gap-[6px] mb-5">
                {["Recent", "Most Answered", "Unanswered", "Featured"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setForumFilter(f)}
                    className="py-[6px] px-[14px] rounded-[20px] font-[Inter,sans-serif] text-[12px] font-semibold cursor-pointer"
                    style={{
                      border: `1.5px solid ${forumFilter === f ? C.primary : C.line}`,
                      background: forumFilter === f ? C.primary : "transparent",
                      color: forumFilter === f ? C.white : C.muted,
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {filteredQs.map((q) => (
                  <div
                    key={q.id}
                    className="rounded-[14px] p-5 transition-[border-color,box-shadow] duration-200"
                    style={{ border: `1.5px solid ${C.line}` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.primary;
                      e.currentTarget.style.boxShadow = C.cardShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.line;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleVote(q.id, "up")}
                          className="rounded-md w-7 h-7 flex items-center justify-center cursor-pointer"
                          style={{
                            background: q.userVote === "up" ? C.primary : C.bg,
                            border: `1.5px solid ${q.userVote === "up" ? C.primary : C.line}`,
                          }}
                        >
                          <ThumbsUp size={12} color={q.userVote === "up" ? C.white : C.muted} />
                        </button>
                        <span className="text-[13px] font-bold" style={{ color: C.primary }}>{q.votes}</span>
                        <button
                          onClick={() => handleVote(q.id, "down")}
                          className="rounded-md w-7 h-7 flex items-center justify-center cursor-pointer"
                          style={{
                            background: q.userVote === "down" ? "#e74c3c" : C.bg,
                            border: `1.5px solid ${q.userVote === "down" ? "#e74c3c" : C.line}`,
                          }}
                        >
                          <ThumbsDown size={12} color={q.userVote === "down" ? C.white : C.muted} />
                        </button>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Avatar initials={q.avatar} size={24} />
                          <span className="text-[12px] font-semibold" style={{ color: C.dark }}>{q.author}</span>
                          <span className="text-[11px]" style={{ color: C.muted }}>· Asked {q.time}</span>
                          <span className="text-[11px]" style={{ color: C.muted }}>· {q.views} views</span>
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
                          className="text-[14px] font-bold leading-[1.4]"
                          style={{ color: C.dark, margin: "0 0 6px" }}
                        >
                          {q.title}
                        </h3>
                        <p className="text-[12px] leading-[1.5]" style={{ color: C.muted, margin: "0 0 12px" }}>{q.preview}</p>
                        <div className="flex gap-2">
                          <button
                            className="flex items-center gap-1 py-[5px] px-3 rounded-md bg-transparent cursor-pointer text-[11px] font-[Inter,sans-serif]"
                            style={{ border: `1px solid ${C.line}`, color: C.muted }}
                          >
                            <MessageSquare size={11} />
                            {q.answers} Answers
                          </button>
                          <button
                            className="flex items-center gap-1 py-[5px] px-3 rounded-md bg-transparent cursor-pointer text-[11px] font-[Inter,sans-serif]"
                            style={{ border: `1px solid ${C.line}`, color: C.muted }}
                          >
                            <Bookmark size={11} />
                            Follow
                          </button>
                          <button
                            className="flex items-center gap-1 py-[5px] px-3 rounded-md bg-transparent cursor-pointer text-[11px] font-[Inter,sans-serif]"
                            style={{ border: `1px solid ${C.line}`, color: C.muted }}
                          >
                            <Share2 size={11} />
                            Share
                          </button>
                          <button
                            className="ml-auto py-[5px] px-[14px] rounded-md cursor-pointer text-[11px] font-bold font-[Inter,sans-serif]"
                            style={{
                              border: `1.5px solid ${C.accent}`,
                              background: C.accent,
                              color: C.primary,
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

          {forumView === "Polls" &&
            (() => {
              const POLLS = [
                {
                  id: 0,
                  sector: "Strategy",
                  closes: "Mar 14",
                  q: "Which sector should BRIDGE prioritize for its next flagship venture?",
                  options: ["Agriculture", "Health Systems", "Energy", "Manufacturing"],
                  votes: [42, 31, 18, 9],
                },
                {
                  id: 1,
                  sector: "Financial Inclusion",
                  closes: "Mar 20",
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
                  id: 2,
                  sector: "Governance",
                  closes: "Mar 18",
                  q: "Should BRIDGE publish quarterly sector performance reports publicly?",
                  options: ["Yes — full transparency", "Yes — summary only", "No — members only", "No preference"],
                  votes: [58, 24, 12, 6],
                },
                {
                  id: 3,
                  sector: "Infrastructure",
                  closes: "Mar 25",
                  q: "What should drive Kejetia Phase 2 sequencing for payment integration?",
                  options: [
                    "By stall type",
                    "By transaction volume",
                    "By geographic cluster",
                    "Phased hybrid approach",
                  ],
                  votes: [19, 33, 27, 21],
                },
              ];
              const PollCard = ({ poll }) => {
                const [voted, setVoted] = useState(null);
                const baseVotes = poll.votes;
                const liveVotes = voted !== null ? baseVotes.map((v, i) => (i === voted ? v + 1 : v)) : baseVotes;
                const total = liveVotes.reduce((a, b) => a + b, 0);
                return (
                  <div
                    style={{
                      background: C.white,
                      border: `1.5px solid ${C.line}`,
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow: C.cardShadow,
                    }}
                  >
                    <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${C.line}` }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 12,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            color: C.primary,
                            background: `${C.primary}10`,
                            padding: "3px 10px",
                            borderRadius: 6,
                          }}
                        >
                          {poll.sector}
                        </span>
                        <span style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>
                          <Clock size={11} /> Closes {poll.closes}
                        </span>
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.dark, margin: 0, lineHeight: 1.45 }}>
                        {poll.q}
                      </h3>
                    </div>
                    <div style={{ padding: "16px 24px 20px" }}>
                      {poll.options.map((opt, oi) => {
                        const pct = Math.round((liveVotes[oi] / total) * 100);
                        const isVoted = voted === oi;
                        const isLeading = liveVotes[oi] === Math.max(...liveVotes);
                        return (
                          <button
                            key={oi}
                            onClick={() => !voted && setVoted(oi)}
                            style={{
                              display: "block",
                              width: "100%",
                              marginBottom: 10,
                              padding: 0,
                              border: "none",
                              background: "none",
                              cursor: voted ? "default" : "pointer",
                              textAlign: "left",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                              <span
                                style={{
                                  fontSize: 13,
                                  color: isVoted ? C.primary : C.dark,
                                  fontWeight: isVoted ? 700 : 400,
                                  fontFamily: font.body,
                                }}
                              >
                                {opt}
                              </span>
                              {voted !== null && (
                                <span
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: isLeading ? C.primary : C.muted,
                                    fontFamily: font.body,
                                  }}
                                >
                                  {pct}%
                                </span>
                              )}
                            </div>
                            <div
                              style={{
                                height: 9,
                                borderRadius: 6,
                                background: C.bg,
                                overflow: "hidden",
                                border: `1px solid ${isVoted ? C.primary + "40" : C.line}`,
                              }}
                            >
                              <div
                                style={{
                                  width: voted !== null ? `${pct}%` : "0%",
                                  height: "100%",
                                  borderRadius: 6,
                                  background: isVoted
                                    ? `linear-gradient(90deg, ${C.primary}, #2E7D5E)`
                                    : isLeading
                                      ? `linear-gradient(90deg, ${C.accent}, ${C.primary})`
                                      : C.line,
                                  transition: "width 0.6s ease",
                                }}
                              />
                            </div>
                          </button>
                        );
                      })}
                      <div
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}
                      >
                        <span style={{ fontSize: 12, color: C.muted }}>{total} votes</span>
                        {voted !== null && (
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#27AE60" }}>✓ Your vote recorded</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              };
              return (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {POLLS.map((p) => (
                    <PollCard key={p.id} poll={p} />
                  ))}
                </div>
              );
            })()}

          {forumView === "Groups" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                {
                  name: "Kejetia Market Digitization",
                  sector: "Infrastructure",
                  sectorColor: "#1B4D3E",
                  members: 18,
                  active: true,
                  posts: 12,
                  desc: "Coordinating Phase 2 of the digital payment rollout across 10,000+ stalls in West Africa's largest market.",
                  avatars: ["AO", "KM", "EA", "KB", "AD"],
                },
                {
                  name: "Northern Corridor AgriFinance",
                  sector: "Agriculture",
                  sectorColor: "#4A7C59",
                  members: 12,
                  active: true,
                  posts: 7,
                  desc: "Designing cooperative financing models for smallholder farmers in Brong-Ahafo and the Northern Corridor.",
                  avatars: ["KM", "AO", "FM", "NA"],
                },
                {
                  name: "TVET Skills Pipeline",
                  sector: "Education",
                  sectorColor: "#7B5EA7",
                  members: 9,
                  active: false,
                  posts: 2,
                  desc: "Aligning TVET curriculum with BRIDGE manufacturing sector venture requirements and 2026 targets.",
                  avatars: ["AD", "EA", "AB"],
                },
                {
                  name: "CHW Deployment Task Force",
                  sector: "Health Systems",
                  sectorColor: "#2C5F8A",
                  members: 14,
                  active: true,
                  posts: 9,
                  desc: "Scaling community health worker programs to serve rural populations across the UE Region.",
                  avatars: ["EA", "AO", "FM", "KB", "AD"],
                },
                {
                  name: "FinTech Innovation Lab",
                  sector: "Technology",
                  sectorColor: "#C07A2A",
                  members: 22,
                  active: true,
                  posts: 18,
                  desc: "Piloting mobile-first financial tools and agent banking models for unbanked populations.",
                  avatars: ["KB", "KM", "AO", "FM", "NA"],
                },
                {
                  name: "Renewable Energy Atlas",
                  sector: "Energy",
                  sectorColor: "#B04040",
                  members: 7,
                  active: false,
                  posts: 1,
                  desc: "Mapping off-grid solar opportunity zones across Ghana's rural districts using GIS data.",
                  avatars: ["FM", "AB", "NA"],
                },
              ].map((g, i) => (
                <div
                  key={i}
                  style={{
                    background: C.white,
                    border: `1.5px solid ${C.line}`,
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: C.cardShadow,
                    transition: "box-shadow 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = g.sectorColor;
                    e.currentTarget.style.boxShadow = C.deepShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.line;
                    e.currentTarget.style.boxShadow = C.cardShadow;
                  }}
                >
                  {/* Colored top accent */}
                  <div
                    style={{ height: 4, background: `linear-gradient(90deg, ${g.sectorColor}, ${g.sectorColor}80)` }}
                  />
                  <div style={{ padding: "18px 20px 16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                          color: g.sectorColor,
                          background: g.sectorColor + "14",
                          padding: "3px 9px",
                          borderRadius: 6,
                        }}
                      >
                        {g.sector}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: g.active ? "#27AE60" : C.muted,
                          background: g.active ? "#27AE6012" : C.bg,
                          padding: "3px 9px",
                          borderRadius: 20,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: g.active ? "#27AE60" : C.muted,
                            display: "inline-block",
                          }}
                        />
                        {g.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: C.dark, margin: "0 0 8px", lineHeight: 1.3 }}>
                      {g.name}
                    </h3>
                    <p style={{ fontSize: 12, color: C.muted, margin: "0 0 16px", lineHeight: 1.55 }}>{g.desc}</p>

                    {/* Member avatars + stats */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ display: "flex" }}>
                          {g.avatars.slice(0, 4).map((av, ai) => (
                            <div
                              key={ai}
                              style={{
                                width: 26,
                                height: 26,
                                borderRadius: "50%",
                                background: g.sectorColor,
                                color: C.white,
                                fontSize: 9,
                                fontWeight: 700,
                                fontFamily: font.body,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: ai > 0 ? -8 : 0,
                                border: `2px solid ${C.white}`,
                                zIndex: 4 - ai,
                              }}
                            >
                              {av[0]}
                            </div>
                          ))}
                          {g.avatars.length > 4 && (
                            <div
                              style={{
                                width: 26,
                                height: 26,
                                borderRadius: "50%",
                                background: C.bg,
                                color: C.muted,
                                fontSize: 9,
                                fontWeight: 700,
                                fontFamily: font.body,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: -8,
                                border: `2px solid ${C.white}`,
                              }}
                            >
                              +{g.avatars.length - 4}
                            </div>
                          )}
                        </div>
                        <span style={{ fontSize: 12, color: C.muted }}>{g.members} members</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 11, color: C.muted }}>
                          <MessageSquare size={10} style={{ display: "inline", marginRight: 3 }} />
                          {g.posts} this week
                        </span>
                        <button
                          style={{
                            padding: "6px 14px",
                            borderRadius: 20,
                            border: `1.5px solid ${g.sectorColor}`,
                            background: "transparent",
                            color: g.sectorColor,
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
                  </div>
                </div>
              ))}
            </div>
          )}

          {forumView === "Tags" &&
            (() => {
              const [tagSearch, setTagSearch] = useState("");
              const TAG_GROUPS = [
                {
                  sector: "Agriculture",
                  color: "#4A7C59",
                  tags: [
                    { t: "post-harvest-loss", n: 34 },
                    { t: "agri-value-chain", n: 38 },
                    { t: "cooperative-finance", n: 27 },
                    { t: "northern-corridor", n: 12 },
                    { t: "smallholder-farming", n: 19 },
                    { t: "irrigation", n: 8 },
                  ],
                },
                {
                  sector: "Infrastructure",
                  color: "#1B4D3E",
                  tags: [
                    { t: "kejetia-market", n: 28 },
                    { t: "digital-payment", n: 31 },
                    { t: "ghanapostgps", n: 9 },
                    { t: "last-mile", n: 16 },
                    { t: "road-network", n: 22 },
                    { t: "urban-planning", n: 11 },
                  ],
                },
                {
                  sector: "Financial Inclusion",
                  color: "#2C5F8A",
                  tags: [
                    { t: "mobile-money", n: 41 },
                    { t: "fintech-pilot", n: 24 },
                    { t: "agent-banking", n: 17 },
                    { t: "microfinance", n: 29 },
                    { t: "unbanked", n: 33 },
                  ],
                },
                {
                  sector: "Technology",
                  color: "#C07A2A",
                  tags: [
                    { t: "digital-literacy", n: 21 },
                    { t: "ict-access", n: 14 },
                    { t: "open-data", n: 9 },
                    { t: "gis-mapping", n: 18 },
                  ],
                },
                {
                  sector: "Health Systems",
                  color: "#7B5EA7",
                  tags: [
                    { t: "chw-deployment", n: 22 },
                    { t: "health-equity", n: 29 },
                    { t: "nhia-integration", n: 13 },
                    { t: "telemedicine", n: 10 },
                  ],
                },
                {
                  sector: "Education",
                  color: "#B04040",
                  tags: [
                    { t: "tvet-curriculum", n: 19 },
                    { t: "youth-employment", n: 18 },
                    { t: "skills-gap", n: 25 },
                    { t: "stem-education", n: 11 },
                  ],
                },
                {
                  sector: "BRIDGE Platform",
                  color: "#888",
                  tags: [
                    { t: "bridge-ventures", n: 45 },
                    { t: "impact-score", n: 11 },
                    { t: "2026-budget", n: 33 },
                    { t: "peace-prosperity", n: 20 },
                  ],
                },
              ];
              const allTags = TAG_GROUPS.flatMap((g) =>
                g.tags.map((t) => ({ ...t, sector: g.sector, color: g.color })),
              );
              const trending = [...allTags].sort((a, b) => b.n - a.n).slice(0, 6);
              const filtered = TAG_GROUPS.map((g) => ({
                ...g,
                tags: tagSearch ? g.tags.filter((t) => t.t.includes(tagSearch.toLowerCase())) : g.tags,
              })).filter((g) => g.tags.length > 0);

              return (
                <div>
                  {/* Search */}
                  <div style={{ position: "relative", marginBottom: 20 }}>
                    <Search
                      size={14}
                      style={{
                        position: "absolute",
                        left: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: C.muted,
                      }}
                    />
                    <input
                      value={tagSearch}
                      onChange={(e) => setTagSearch(e.target.value)}
                      placeholder="Search tags..."
                      style={{
                        width: "100%",
                        padding: "9px 12px 9px 36px",
                        borderRadius: 10,
                        border: `1.5px solid ${C.line}`,
                        fontFamily: font.body,
                        fontSize: 13,
                        outline: "none",
                        boxSizing: "border-box",
                        background: C.bg,
                      }}
                      onFocus={(e) => (e.target.style.borderColor = C.primary)}
                      onBlur={(e) => (e.target.style.borderColor = C.line)}
                    />
                  </div>

                  {/* Trending strip */}
                  {!tagSearch && (
                    <div
                      style={{
                        background: `linear-gradient(135deg, ${C.primary}08, ${C.accent}10)`,
                        border: `1px solid ${C.accent}30`,
                        borderRadius: 12,
                        padding: "14px 18px",
                        marginBottom: 24,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: C.primary,
                          marginBottom: 10,
                        }}
                      >
                        🔥 Trending This Week
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {trending.map((t, i) => (
                          <button
                            key={i}
                            style={{
                              padding: "6px 14px",
                              borderRadius: 8,
                              border: `1.5px solid ${t.color}40`,
                              background: t.color + "10",
                              cursor: "pointer",
                              fontFamily: font.body,
                              display: "flex",
                              alignItems: "center",
                              gap: 7,
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = t.color + "20";
                              e.currentTarget.style.borderColor = t.color;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = t.color + "10";
                              e.currentTarget.style.borderColor = t.color + "40";
                            }}
                          >
                            <span style={{ fontSize: 12, fontWeight: 600, color: t.color }}>{t.t}</span>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: C.white,
                                background: t.color,
                                padding: "1px 6px",
                                borderRadius: 4,
                              }}
                            >
                              {t.n}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grouped tags */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {filtered.map((group, gi) => (
                      <div key={gi}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                          <div style={{ width: 3, height: 16, borderRadius: 2, background: group.color }} />
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              letterSpacing: "1px",
                              textTransform: "uppercase",
                              color: group.color,
                            }}
                          >
                            {group.sector}
                          </span>
                          <span style={{ fontSize: 11, color: C.muted }}>— {group.tags.length} tags</span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {group.tags.map((t, ti) => {
                            const intensity = Math.min(t.n / 50, 1);
                            return (
                              <button
                                key={ti}
                                style={{
                                  padding: "7px 14px",
                                  borderRadius: 8,
                                  border: `1.5px solid ${group.color}${Math.round(30 + intensity * 60).toString(16)}`,
                                  background:
                                    group.color +
                                    Math.round(8 + intensity * 18)
                                      .toString(16)
                                      .padStart(2, "0"),
                                  cursor: "pointer",
                                  fontFamily: font.body,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  transition: "all 0.18s",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = group.color + "28";
                                  e.currentTarget.style.borderColor = group.color;
                                  e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    group.color +
                                    Math.round(8 + intensity * 18)
                                      .toString(16)
                                      .padStart(2, "0");
                                  e.currentTarget.style.borderColor = `${group.color}${Math.round(30 + intensity * 60).toString(16)}`;
                                  e.currentTarget.style.transform = "none";
                                }}
                              >
                                <span style={{ fontSize: 12, fontWeight: t.n > 25 ? 700 : 500, color: group.color }}>
                                  {t.t}
                                </span>
                                <span
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: C.white,
                                    background: group.color + "cc",
                                    padding: "1px 6px",
                                    borderRadius: 4,
                                    minWidth: 18,
                                    textAlign: "center",
                                  }}
                                >
                                  {t.n}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

          {forumView === "Sectors" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {[
                { ...CATEGORIES[0], members: 31, trending: "kejetia-market", hot: true },
                { ...CATEGORIES[1], members: 24, trending: "mobile-money", hot: true },
                { ...CATEGORIES[2], members: 19, trending: "chw-deployment", hot: false },
                { ...CATEGORIES[3], members: 28, trending: "fintech-pilot", hot: true },
                { ...CATEGORIES[4], members: 15, trending: "tvet-curriculum", hot: false },
                { ...CATEGORIES[5], members: 34, trending: "agri-value-chain", hot: true },
                { ...CATEGORIES[6], members: 10, trending: "creative-economy", hot: false },
                { ...CATEGORIES[7], members: 12, trending: "housing-deficit", hot: false },
                { ...CATEGORIES[8], members: 9, trending: "eco-tourism", hot: false },
                { ...CATEGORIES[9], members: 16, trending: "off-grid-solar", hot: false },
                { ...CATEGORIES[10], members: 13, trending: "light-manufacturing", hot: false },
                { ...CATEGORIES[11], members: 11, trending: "northern-corridor", hot: false },
              ].map((cat, i) => (
                <div
                  key={i}
                  style={{
                    background: C.white,
                    border: `1.5px solid ${C.line}`,
                    borderRadius: 14,
                    padding: 20,
                    transition: "all 0.2s",
                    cursor: "pointer",
                    boxShadow: C.cardShadow,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = C.primary;
                    e.currentTarget.style.boxShadow = C.deepShadow;
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.line;
                    e.currentTarget.style.boxShadow = C.cardShadow;
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: `${C.primary}10`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: C.primary,
                      }}
                    >
                      {cat.icon}
                    </div>
                    {cat.hot && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          color: "#E07020",
                          background: "#E0702012",
                          padding: "2px 7px",
                          borderRadius: 6,
                        }}
                      >
                        🔥 HOT
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{cat.name}</div>
                  <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.muted, marginBottom: 10 }}>
                    <span>{cat.count} posts</span>
                    <span>·</span>
                    <span>{cat.members} members</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Tag size={10} color={C.accent} />
                    <span style={{ fontSize: 11, color: C.primary, fontWeight: 600 }}>{cat.trending}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {forumView === "Badges" &&
            (() => {
              const TIERS = [
                {
                  tier: "Starter",
                  color: "#888",
                  desc: "First steps in the BRIDGE community",
                  badges: [
                    {
                      name: "First Post",
                      icon: "✍️",
                      desc: "Published your first community contribution",
                      earned: true,
                      progress: null,
                    },
                    {
                      name: "First Answer",
                      icon: "🎯",
                      desc: "Answered your first community question",
                      earned: true,
                      progress: null,
                    },
                    {
                      name: "Profile Complete",
                      icon: "👤",
                      desc: "Filled out your full member profile",
                      earned: true,
                      progress: null,
                    },
                  ],
                },
                {
                  tier: "Contributor",
                  color: "#2C5F8A",
                  desc: "Actively shaping BRIDGE discussions",
                  badges: [
                    {
                      name: "Sector Expert",
                      icon: "🏅",
                      desc: "Top 5 contributor in your sector for 30 days",
                      earned: true,
                      progress: null,
                    },
                    {
                      name: "Insight Publisher",
                      icon: "📊",
                      desc: "Published 5+ sector analysis insights",
                      earned: false,
                      progress: 60,
                    },
                    {
                      name: "Policy Watcher",
                      icon: "📋",
                      desc: "Flagged 10+ policy developments",
                      earned: false,
                      progress: 40,
                    },
                    {
                      name: "Working Group Lead",
                      icon: "👥",
                      desc: "Led a BRIDGE working group to completion",
                      earned: false,
                      progress: 20,
                    },
                  ],
                },
                {
                  tier: "Champion",
                  color: C.primary,
                  desc: "A recognized BRIDGE community leader",
                  badges: [
                    {
                      name: "Champion",
                      icon: "🏆",
                      desc: "Reached Champion status — 2,500+ points",
                      earned: true,
                      progress: null,
                    },
                    {
                      name: "Bridge Builder",
                      icon: "🌉",
                      desc: "Connected 3+ members across different sectors",
                      earned: false,
                      progress: 33,
                    },
                    {
                      name: "Ghana First",
                      icon: "🇬🇭",
                      desc: "Completed all 12 sector profiles in your dashboard",
                      earned: false,
                      progress: 75,
                    },
                    {
                      name: "Leader",
                      icon: "⭐",
                      desc: "Reached Leader status — 5,000+ points (2,160 pts to go)",
                      earned: false,
                      progress: 57,
                    },
                  ],
                },
              ];
              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {TIERS.map((tier, ti) => (
                    <div key={ti}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                        <div style={{ width: 4, height: 18, borderRadius: 2, background: tier.color }} />
                        <div>
                          <span style={{ fontSize: 13, fontWeight: 700, color: tier.color }}>{tier.tier} Tier</span>
                          <span style={{ fontSize: 12, color: C.muted, marginLeft: 8 }}>— {tier.desc}</span>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                        {tier.badges.map((b, bi) => (
                          <div
                            key={bi}
                            style={{
                              background: b.earned
                                ? `linear-gradient(135deg, ${tier.color}0a, ${tier.color}18)`
                                : C.white,
                              border: `1.5px solid ${b.earned ? tier.color + "50" : C.line}`,
                              borderRadius: 14,
                              padding: 18,
                              display: "flex",
                              flexDirection: "column",
                              opacity: b.earned ? 1 : 0.8,
                              transition: "all 0.2s",
                              position: "relative",
                              overflow: "hidden",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = tier.color;
                              e.currentTarget.style.opacity = "1";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = b.earned ? tier.color + "50" : C.line;
                              e.currentTarget.style.opacity = b.earned ? "1" : "0.8";
                            }}
                          >
                            {b.earned && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: 10,
                                  right: 10,
                                  width: 16,
                                  height: 16,
                                  borderRadius: "50%",
                                  background: "#27AE60",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Check size={9} color={C.white} strokeWidth={3} />
                              </div>
                            )}
                            <div style={{ fontSize: 28, marginBottom: 10 }}>{b.icon}</div>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: b.earned ? tier.color : C.dark,
                                marginBottom: 4,
                                lineHeight: 1.2,
                              }}
                            >
                              {b.name}
                            </div>
                            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4, flex: 1 }}>{b.desc}</div>
                            {!b.earned && b.progress !== null && (
                              <div style={{ marginTop: 12 }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: 10,
                                    color: C.muted,
                                    marginBottom: 4,
                                  }}
                                >
                                  <span>Progress</span>
                                  <span style={{ fontWeight: 700, color: tier.color }}>{b.progress}%</span>
                                </div>
                                <div style={{ height: 4, borderRadius: 4, background: C.bg }}>
                                  <div
                                    style={{
                                      width: `${b.progress}%`,
                                      height: "100%",
                                      borderRadius: 4,
                                      background: tier.color,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                            {b.earned && (
                              <div style={{ marginTop: 10, fontSize: 10, fontWeight: 700, color: "#27AE60" }}>
                                ✓ Earned
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
        </div>

        {/* Right Sidebar — hidden on mobile */}
        {!isMobile && (
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
        )}
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

function MembersPage({ isMobile }) {
  const [search, setSearch] = useState("");
  const [filterSector, setFilterSector] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterBadge, setFilterBadge] = useState("All");
  const [sortBy, setSortBy] = useState("points");

  const SECTOR_COLORS = {
    Infrastructure: "#1B4D3E",
    Agriculture: "#4A7C59",
    "Health Systems": "#7B5EA7",
    Technology: "#C07A2A",
    Education: "#B04040",
    Energy: "#2C5F8A",
    Housing: "#5A6A2A",
    Transportation: "#6A3A2A",
    "Financial Inclusion": "#2A5A6A",
  };
  const BADGE_COLORS = { Champion: C.accent, Contributor: "#2C5F8A", Newcomer: "#888" };

  const filtered = ALL_MEMBERS.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
    const matchSector = filterSector === "All" || m.sector === filterSector;
    const matchType = filterType === "All" || m.type === filterType;
    const matchBadge = filterBadge === "All" || m.badge === filterBadge;
    return matchSearch && matchSector && matchType && matchBadge;
  }).sort((a, b) => (sortBy === "points" ? b.points - a.points : a.name.localeCompare(b.name)));

  const PillToggle = ({ opts, val, set }) => (
    <div style={{ display: "flex", gap: 4 }}>
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => set(o)}
          style={{
            padding: "5px 12px",
            borderRadius: 8,
            border: `1.5px solid ${val === o ? C.primary : C.line}`,
            background: val === o ? C.primary : C.white,
            color: val === o ? C.white : C.muted,
            fontFamily: font.body,
            fontSize: 12,
            fontWeight: val === o ? 700 : 400,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all 0.15s",
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <SectionLabel>Community</SectionLabel>
        <h2
          style={{
            fontFamily: font.display,
            fontSize: 32,
            fontWeight: 700,
            color: C.primary,
            margin: "0 0 6px",
            letterSpacing: "-0.5px",
          }}
        >
          Member <span style={{ color: C.accent }}>Directory</span>
        </h2>
        <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>
          {ALL_MEMBERS.length} members building Ghana's future across 12 sectors
        </p>
      </div>

      {/* Stats strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          {
            val: ALL_MEMBERS.length,
            label: "Total Members",
            sub: "+3 this month",
            trend: "+3",
            trendUp: true,
            icon: <Users size={18} />,
            accent: C.primary,
            progress: (ALL_MEMBERS.length / 20) * 100,
            progressLabel: `${ALL_MEMBERS.length} of 20 target`,
          },
          {
            val: ALL_MEMBERS.filter((m) => m.type === "Diaspora").length,
            label: "Diaspora Network",
            sub: "3 countries",
            trend: "UK · CA · US",
            trendUp: null,
            icon: <Globe size={18} />,
            accent: "#2C5F8A",
            progress: (ALL_MEMBERS.filter((m) => m.type === "Diaspora").length / ALL_MEMBERS.length) * 100,
            progressLabel: "37% of community",
          },
          {
            val: ALL_MEMBERS.filter((m) => m.badge === "Champion").length,
            label: "Champions",
            sub: "Highest tier",
            trend: "Top tier",
            trendUp: true,
            icon: <Award size={18} />,
            accent: "#96B020",
            progress: (ALL_MEMBERS.filter((m) => m.badge === "Champion").length / ALL_MEMBERS.length) * 100,
            progressLabel: "12% of community",
          },
          {
            val: [...new Set(ALL_MEMBERS.map((m) => m.sector))].length,
            label: "Sectors Active",
            sub: "of 12 total",
            trend: "4 growing",
            trendUp: true,
            icon: <Blocks size={18} />,
            accent: "#7B5EA7",
            progress: ([...new Set(ALL_MEMBERS.map((m) => m.sector))].length / 12) * 100,
            progressLabel: "67% coverage",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              borderRadius: 16,
              padding: "20px 20px 18px",
              background: `linear-gradient(135deg, ${s.accent}14 0%, ${s.accent}06 100%)`,
              border: `1.5px solid ${s.accent}22`,
              boxShadow: C.cardShadow,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background watermark circle */}
            <div
              style={{
                position: "absolute",
                top: -16,
                right: -16,
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: s.accent + "12",
              }}
            />

            {/* Top row: icon + trend chip */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 14,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: s.accent + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: s.accent,
                }}
              >
                {s.icon}
              </div>
              {s.trendUp !== null ? (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: s.trendUp ? "#27AE60" : C.muted,
                    background: s.trendUp ? "#27AE6014" : C.bg,
                    border: `1px solid ${s.trendUp ? "#27AE6030" : C.line}`,
                    padding: "3px 8px",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  {s.trendUp ? "↑" : ""} {s.trend}
                </span>
              ) : (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: s.accent,
                    background: s.accent + "14",
                    border: `1px solid ${s.accent}30`,
                    padding: "3px 8px",
                    borderRadius: 20,
                  }}
                >
                  {s.trend}
                </span>
              )}
            </div>

            {/* Value + Label */}
            <div
              style={{
                fontFamily: font.display,
                fontSize: 34,
                fontWeight: 800,
                color: s.accent,
                lineHeight: 1,
                marginBottom: 4,
                position: "relative",
              }}
            >
              {s.val}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>{s.sub}</div>

            {/* Mini progress bar */}
            <div>
              <div style={{ height: 4, borderRadius: 4, background: s.accent + "20", overflow: "hidden" }}>
                <div
                  style={{
                    width: `${Math.min(s.progress, 100)}%`,
                    height: "100%",
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${s.accent}, ${s.accent}99)`,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
              <div style={{ fontSize: 10, color: s.accent, fontWeight: 600, marginTop: 5 }}>{s.progressLabel}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div
        style={{
          background: C.white,
          borderRadius: 14,
          padding: isMobile ? "14px 16px" : "16px 20px",
          boxShadow: C.cardShadow,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
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
          {!isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderLeft: `1px solid ${C.line}`,
                paddingLeft: 12,
              }}
            >
              <span style={{ fontSize: 11, color: C.muted, whiteSpace: "nowrap" }}>Sort:</span>
              <PillToggle opts={["points", "name"]} val={sortBy} set={setSortBy} />
            </div>
          )}
          <span style={{ fontSize: 12, color: C.muted, whiteSpace: "nowrap" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
        {/* Filter pills — scroll horizontally on mobile */}
        <div
          style={{
            overflowX: isMobile ? "auto" : "visible",
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            gap: isMobile ? 6 : 12,
            flexWrap: isMobile ? "nowrap" : "wrap",
            scrollbarWidth: "none",
          }}
        >
          {isMobile ? (
            /* Mobile: single scrolling row of all filter pills */
            <>
              {["All", "Premium", "Diaspora"].map((o) => (
                <button
                  key={o}
                  onClick={() => setFilterType(o)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 8,
                    border: `1.5px solid ${filterType === o ? C.primary : C.line}`,
                    background: filterType === o ? C.primary : C.white,
                    color: filterType === o ? C.white : C.muted,
                    fontFamily: font.body,
                    fontSize: 12,
                    fontWeight: filterType === o ? 700 : 400,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {o}
                </button>
              ))}
              <div style={{ width: 1, background: C.line, flexShrink: 0 }} />
              {["All", "Champion", "Contributor", "Newcomer"].map((o) => (
                <button
                  key={o}
                  onClick={() => setFilterBadge(o)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 8,
                    border: `1.5px solid ${filterBadge === o ? "#2C5F8A" : C.line}`,
                    background: filterBadge === o ? "#2C5F8A" : C.white,
                    color: filterBadge === o ? C.white : C.muted,
                    fontFamily: font.body,
                    fontSize: 12,
                    fontWeight: filterBadge === o ? 700 : 400,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {o}
                </button>
              ))}
            </>
          ) : (
            /* Desktop: labeled rows */
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, whiteSpace: "nowrap" }}>Type</span>
                <PillToggle opts={["All", "Premium", "Diaspora"]} val={filterType} set={setFilterType} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, whiteSpace: "nowrap" }}>Badge</span>
                <PillToggle
                  opts={["All", "Champion", "Contributor", "Newcomer"]}
                  val={filterBadge}
                  set={setFilterBadge}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, whiteSpace: "nowrap" }}>Sector</span>
                <PillToggle
                  opts={["All", "Infrastructure", "Agriculture", "Health Systems", "Technology", "Education"]}
                  val={filterSector}
                  set={setFilterSector}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Member grid */}
      <div
        style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 12 : 14 }}
      >
        {filtered.map((m, idx) => {
          const sColor = SECTOR_COLORS[m.sector] || C.primary;
          return (
            <div
              key={m.id}
              style={{
                background: C.white,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: C.cardShadow,
                border: `1.5px solid transparent`,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = sColor + "60";
                e.currentTarget.style.boxShadow = C.deepShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.boxShadow = C.cardShadow;
              }}
            >
              {/* Sector color top bar */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${sColor}, ${sColor}60)` }} />
              <div style={{ padding: 22 }}>
                {/* Top row: avatar + name + badge */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                  <div style={{ position: "relative" }}>
                    <Avatar initials={m.avatar} size={44} />
                    {sortBy === "points" && idx < 3 && (
                      <div style={{ position: "absolute", bottom: -2, right: -2, fontSize: 13 }}>
                        {["🥇", "🥈", "🥉"][idx]}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, lineHeight: 1.2 }}>{m.name}</div>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: BADGE_COLORS[m.badge],
                          background: BADGE_COLORS[m.badge] + "18",
                          padding: "2px 7px",
                          borderRadius: 6,
                          whiteSpace: "nowrap",
                          letterSpacing: "0.5px",
                          flexShrink: 0,
                        }}
                      >
                        {m.badge.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 3, lineHeight: 1.3 }}>{m.role}</div>
                  </div>
                </div>

                {/* Meta details */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    marginBottom: 16,
                    padding: "12px 14px",
                    background: C.bg,
                    borderRadius: 10,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                    <MapPin size={11} color={sColor} />
                    <span>{m.location}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                    <Briefcase size={11} color={sColor} />
                    <span style={{ color: sColor, fontWeight: 600 }}>{m.sector}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                    <Shield size={11} color={m.type === "Diaspora" ? "#2C5F8A" : C.primary} />
                    <span style={{ color: m.type === "Diaspora" ? "#2C5F8A" : C.primary, fontWeight: 600 }}>
                      {m.type}
                    </span>
                    <span>· Joined {m.joined}</span>
                  </div>
                </div>

                {/* Points + CTA */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: sColor, fontFamily: font.display }}>
                      {m.points.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted }}>points</div>
                  </div>
                  <button
                    style={{
                      padding: "7px 16px",
                      borderRadius: 20,
                      border: `1.5px solid ${sColor}`,
                      background: "transparent",
                      color: sColor,
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
            </div>
          );
        })}
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

function ResourcesPage({ isMobile }) {
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");

  const DOC_ICONS = {
    "Sector Analysis": <BarChart2 size={18} />,
    "Strategy Brief": <Target size={18} />,
    "Policy Alignment": <Layers size={18} />,
    Framework: <Blocks size={18} />,
    "Government Brief": <Flag size={18} />,
  };

  const types = ["All", ...new Set(RESOURCES_DATA.map((r) => r.type))];
  const filtered = RESOURCES_DATA.filter((r) => {
    const matchType = typeFilter === "All" || r.type === typeFilter;
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) || r.sector.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });
  const featured = filtered.filter((r) => r.featured);
  const rest = filtered.filter((r) => !r.featured);
  const readTime = (pages) => `${Math.ceil(pages / 3)} min read`;
  const isNew = (date) => date === "Feb 2026" || date === "Jan 2026";

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <SectionLabel>Knowledge Hub</SectionLabel>
        <h2
          style={{
            fontFamily: font.display,
            fontSize: 32,
            fontWeight: 700,
            color: C.primary,
            margin: "0 0 6px",
            letterSpacing: "-0.5px",
          }}
        >
          BRIDGE <span style={{ color: C.accent }}>Resources</span>
        </h2>
        <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>
          Sector analyses, strategy briefs, frameworks, and policy documents
        </p>
      </div>

      {/* Search + Type filters */}
      <div
        style={{
          background: C.white,
          borderRadius: 14,
          padding: isMobile ? "14px 16px" : "16px 20px",
          boxShadow: C.cardShadow,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ position: "relative" }}>
          <Search
            size={14}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or sector..."
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
        <div
          style={{
            overflowX: isMobile ? "auto" : "visible",
            display: "flex",
            gap: 6,
            flexWrap: isMobile ? "nowrap" : "wrap",
            scrollbarWidth: "none",
            alignItems: "center",
          }}
        >
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                flexShrink: 0,
                border: `1.5px solid ${typeFilter === t ? C.primary : C.line}`,
                background: typeFilter === t ? C.primary : "transparent",
                color: typeFilter === t ? C.white : C.muted,
                fontFamily: font.body,
                fontSize: 12,
                fontWeight: typeFilter === t ? 700 : 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
              }}
            >
              {t !== "All" && (
                <span style={{ marginRight: 4 }}>{["📊", "📋", "🔬", "⚙️", "🏛️"][types.indexOf(t) - 1] || ""}</span>
              )}
              {t}
            </button>
          ))}
          <span
            style={{
              marginLeft: "auto",
              fontSize: 12,
              color: C.muted,
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {filtered.length} doc{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Featured — dark cards */}
      {featured.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "1.5px",
              color: C.muted,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Featured Reports
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
            {featured.map((r) => (
              <div
                key={r.id}
                style={{
                  background: `linear-gradient(135deg, ${C.primary} 0%, #0e2e24 100%)`,
                  borderRadius: 16,
                  padding: 26,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "1px solid rgba(184,217,53,0.1)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 14,
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: C.accent,
                        background: "rgba(184,217,53,0.12)",
                        padding: "3px 10px",
                        borderRadius: 6,
                      }}
                    >
                      {r.type}
                    </span>
                    {isNew(r.date) && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          color: C.white,
                          background: "#27AE60",
                          padding: "2px 7px",
                          borderRadius: 6,
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{readTime(r.pages)}</span>
                </div>
                <h3
                  style={{
                    fontFamily: font.display,
                    fontSize: 16,
                    fontWeight: 700,
                    color: C.white,
                    margin: "0 0 10px",
                    lineHeight: 1.35,
                    position: "relative",
                  }}
                >
                  {r.title}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    margin: "0 0 20px",
                    lineHeight: 1.55,
                    position: "relative",
                  }}
                >
                  {r.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                    {r.pages}p · {r.date}
                  </span>
                  <button
                    style={{
                      padding: "7px 18px",
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
                    <BookOpen size={12} /> Read Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All remaining docs */}
      {rest.length > 0 && (
        <>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "1.5px",
              color: C.muted,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {typeFilter === "All" ? "All Documents" : typeFilter} ({rest.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {rest.map((r) => {
              const tc = TYPE_COLORS[r.type] || C.primary;
              return (
                <div
                  key={r.id}
                  style={{
                    background: C.white,
                    borderRadius: 14,
                    display: "flex",
                    overflow: "hidden",
                    boxShadow: C.cardShadow,
                    border: `1px solid transparent`,
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tc + "40";
                    e.currentTarget.style.boxShadow = C.deepShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.boxShadow = C.cardShadow;
                  }}
                >
                  {/* Colored left accent bar */}
                  <div style={{ width: 4, background: tc, flexShrink: 0 }} />
                  {/* Icon column — hidden on mobile */}
                  {!isMobile && (
                    <div
                      style={{
                        width: 56,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: tc + "0a",
                      }}
                    >
                      <div style={{ color: tc }}>{DOC_ICONS[r.type] || <BookOpen size={18} />}</div>
                    </div>
                  )}
                  {/* Content */}
                  <div style={{ flex: 1, padding: isMobile ? "14px 16px" : "18px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                          color: tc,
                        }}
                      >
                        {r.type}
                      </span>
                      <span style={{ fontSize: 10, color: C.muted }}>·</span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: C.primary,
                          background: `${C.primary}10`,
                          padding: "1px 7px",
                          borderRadius: 6,
                        }}
                      >
                        {r.sector}
                      </span>
                      {isNew(r.date) && (
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: C.white,
                            background: "#27AE60",
                            padding: "1px 6px",
                            borderRadius: 4,
                          }}
                        >
                          NEW
                        </span>
                      )}
                      {isMobile && (
                        <span style={{ fontSize: 10, color: C.muted, marginLeft: "auto" }}>{readTime(r.pages)}</span>
                      )}
                    </div>
                    <h3
                      style={{
                        fontSize: isMobile ? 13 : 14,
                        fontWeight: 700,
                        color: C.dark,
                        margin: "0 0 4px",
                        lineHeight: 1.35,
                      }}
                    >
                      {r.title}
                    </h3>
                    {!isMobile && (
                      <p style={{ fontSize: 12, color: C.muted, margin: "0 0 0", lineHeight: 1.5 }}>{r.desc}</p>
                    )}
                    {isMobile && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <span style={{ fontSize: 11, color: C.muted }}>
                          {r.pages}p · {r.date}
                        </span>
                        <button
                          style={{
                            padding: "5px 14px",
                            borderRadius: 20,
                            border: `1.5px solid ${tc}`,
                            background: "transparent",
                            color: tc,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: font.body,
                          }}
                        >
                          Read
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Right meta + CTA — desktop only */}
                  {!isMobile && (
                    <div
                      style={{
                        padding: "18px 20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        flexShrink: 0,
                      }}
                    >
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{readTime(r.pages)}</div>
                        <div style={{ fontSize: 11, color: C.muted }}>
                          {r.pages}p · {r.date}
                        </div>
                      </div>
                      <button
                        style={{
                          padding: "6px 16px",
                          borderRadius: 20,
                          border: `1.5px solid ${tc}`,
                          background: "transparent",
                          color: tc,
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
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ─── HOME PAGE CONTENT ─────────────────────────────────────────
function HomePageContent({
  isMobile,
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
      {/* ── WIDGET ROW: 3-col on desktop, single-col on mobile ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 320px",
          gap: isMobile ? 16 : 20,
          marginBottom: isMobile ? 20 : 28,
        }}
      >
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
        style={{
          background: C.white,
          borderRadius: 20,
          padding: isMobile ? "20px 16px" : 32,
          boxShadow: C.cardShadow,
          marginBottom: isMobile ? 20 : 28,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: isMobile ? 16 : 24,
          }}
        >
          <div>
            <SectionLabel>Goals & Milestones</SectionLabel>
            <h2
              style={{
                fontFamily: font.display,
                fontSize: isMobile ? 20 : 24,
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
              padding: isMobile ? "8px 14px" : "10px 20px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              background: C.primary,
              color: C.white,
              fontFamily: font.body,
              fontSize: isMobile ? 12 : 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <Plus size={14} />
            {isMobile ? "New" : "New Goal"}
          </button>
        </div>

        {/* Tabs — scroll horizontally on mobile */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginBottom: isMobile ? 16 : 24,
            borderBottom: `1px solid ${C.line}`,
            overflowX: isMobile ? "auto" : "visible",
            scrollbarWidth: "none",
          }}
        >
          {["active", "inactive", "completed", "draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: isMobile ? "8px 16px" : "8px 20px",
                border: "none",
                cursor: "pointer",
                fontFamily: font.body,
                fontSize: 13,
                fontWeight: 600,
                background: "transparent",
                textTransform: "capitalize",
                whiteSpace: "nowrap",
                color: activeTab === tab ? C.primary : C.muted,
                borderBottom: `2px solid ${activeTab === tab ? C.primary : "transparent"}`,
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "active" ? (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 12 : 16 }}>
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
  const navigate = useNavigate();

  return screen === "login" ? (
    <LoginPage
      onLogin={(type) => {
        setMemberType(type);
        setScreen("community");
        navigate("/community");
      }}
    />
  ) : (
    <CommunityDashboard memberType={memberType} onLogout={() => { setScreen("login"); navigate("/community"); }} />
  );
}
