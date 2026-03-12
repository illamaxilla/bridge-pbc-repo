import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";

// Slug → route map (handles creative→sports, transportation→transport)
const sectorRoute = (slug: string): string => {
  const overrides: Record<string, string> = {
    creative: "/sectors/sports",
    transportation: "/sectors/transport",
  };
  return overrides[slug] ?? `/sectors/${slug}`;
};
import SiteFooter from "@/components/SiteFooter";

import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
const MAX_W = layout.maxWidth;

const icons = {
  infra: (c, s = 20) => (
    <svg
      width={s}
      height={s}
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
  fin: (c, s = 20) => (
    <svg
      width={s}
      height={s}
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
  health: (c, s = 20) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-5h5c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-5V4c0-1.1-.9-2-2-2h-2z" />
    </svg>
  ),
  tech: (c, s = 20) => (
    <svg
      width={s}
      height={s}
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
  edu: (c, s = 20) => (
    <svg
      width={s}
      height={s}
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
  agri: (c, s = 20) => (
    <svg
      width={s}
      height={s}
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
  creative: (c, s = 20) => (
    <svg
      width={s}
      height={s}
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
  housing: (c, s = 20) => (
    <svg
      width={s}
      height={s}
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
  tourism: (c, s = 20) => (
    <svg
      width={s}
      height={s}
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
  energy: (c, s = 20) => (
    <svg
      width={s}
      height={s}
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
  mfg: (c, s = 20) => (
    <svg
      width={s}
      height={s}
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
  transport: (c, s = 20) => (
    <svg
      width={s}
      height={s}
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
};

const sectors = [
  {
    id: 1,
    slug: "infrastructure",
    name: "Infrastructure & Basic Services",
    cat: "foundation",
    problem: "Aligning public systems, market facilities, and urban infrastructure to serve 35M+ citizens effectively.",
    cap: "$8-15M",
    vent: 18,
    metric: "35M+",
    mLabel: "Citizens to Serve",
    tag: "Kejetia Market digitization pilot",
    ik: "infra",
  },
  {
    id: 2,
    slug: "financial",
    name: "Financial Inclusion & Economic Security",
    cat: "economic",
    problem: "Connecting SMEs, mobile platforms, and capital providers to unlock $4-6B in productive lending.",
    cap: "$10-20M",
    vent: 18,
    metric: "$4-6B",
    mLabel: "SME Lending Opportunity",
    tag: "Digital lending & insurance platforms",
    ik: "fin",
  },
  {
    id: 3,
    slug: "health",
    name: "Health Systems & Wellbeing",
    cat: "human",
    problem: "Aligning primary care, workforce training, and community health systems across 260+ districts.",
    cap: "$8-16M",
    vent: 15,
    metric: "1:10,000",
    mLabel: "Doctor-Patient Ratio",
    tag: "Community health worker scaling",
    ik: "health",
  },
  {
    id: 4,
    slug: "technology",
    name: "Technology & Innovation",
    cat: "growth",
    problem:
      "Connecting innovators, digital infrastructure, and institutional support to accelerate Ghana\u2019s tech ecosystem.",
    cap: "$8-15M",
    vent: 15,
    metric: "48%",
    mLabel: "Internet Penetration",
    tag: "Fintech & agritech acceleration",
    ik: "tech",
  },
  {
    id: 5,
    slug: "education",
    name: "Education & Skills",
    cat: "human",
    problem: "Aligning TVET systems, industry partners, and skills development to prepare Ghana\u2019s workforce.",
    cap: "$16.5-33.5M",
    vent: 15,
    metric: "57%",
    mLabel: "Youth Workforce Potential",
    tag: "Competency-based training",
    ik: "edu",
  },
  {
    id: 6,
    slug: "agriculture",
    name: "Agriculture & Value Chains",
    cat: "economic",
    problem:
      "Connecting 5.6M smallholder farmers to markets, storage, and value chains that preserve $1.9B in annual harvests.",
    cap: "$12-22M",
    vent: 18,
    metric: "$1.9B",
    mLabel: "Harvest Value to Preserve",
    tag: "Ejura Agricultural Hub pilot",
    ik: "agri",
  },
  {
    id: 7,
    slug: "creative",
    name: "Sports, Entertainment & Creative Industries",
    cat: "human",
    problem:
      "Aligning talent, IP systems, and distribution infrastructure to grow Ghana\u2019s $3.2B creative economy.",
    cap: "$10-20.5M",
    vent: 14,
    metric: "$3.2B",
    mLabel: "Creative Economy Potential",
    tag: "Content production & distribution",
    ik: "creative",
  },
  {
    id: 8,
    slug: "housing",
    name: "Housing & Real Estate",
    cat: "growth",
    problem: "Connecting affordable construction methods, mortgage access, and land systems to serve 2M+ households.",
    cap: "$15-25M",
    vent: 11,
    metric: "2M+",
    mLabel: "Households to Serve",
    tag: "Affordable housing technology",
    ik: "housing",
  },
  {
    id: 9,
    slug: "tourism",
    name: "Tourism & Hospitality",
    cat: "growth",
    problem:
      "Aligning Ghana\u2019s cultural heritage, hospitality infrastructure, and natural assets for sustainable growth.",
    cap: "$10-18M",
    vent: 13,
    metric: "1.1M",
    mLabel: "Annual Visitors",
    tag: "Heritage tourism corridors",
    ik: "tourism",
  },
  {
    id: 10,
    slug: "energy",
    name: "Energy & Renewable Resources",
    cat: "foundation",
    problem:
      "Connecting renewable capacity, distribution systems, and rural communities for reliable last-mile access.",
    cap: "$12-22M",
    vent: 14,
    metric: "32%",
    mLabel: "Grid Efficiency Target",
    tag: "Solar micro-grid deployment",
    ik: "energy",
  },
  {
    id: 11,
    slug: "manufacturing",
    name: "Manufacturing & Light Industry",
    cat: "economic",
    problem:
      "Aligning agro-processing, construction materials, and export systems to build competitive industrial capacity.",
    cap: "$15-30M",
    vent: 14,
    metric: "10.2%",
    mLabel: "Manufacturing GDP Share",
    tag: "Agro-processing value chains",
    ik: "mfg",
  },
  {
    id: 12,
    slug: "transportation",
    name: "Transportation & Logistics",
    cat: "foundation",
    problem:
      "Connecting freight corridors, urban transit, and logistics systems to move goods at globally competitive costs.",
    cap: "$10-22M",
    vent: 14,
    metric: "23%",
    mLabel: "Logistics Cost (% GDP)",
    tag: "Digital freight platforms",
    ik: "transport",
  },
];

const cats = [
  { id: "all", label: "All Sectors", n: 12, desc: "Complete 12-sector development portfolio" },
  { id: "foundation", label: "Foundation", n: 3, desc: "Physical backbone enabling all other development" },
  { id: "human", label: "Human Capital", n: 3, desc: "Investing in people, health, education, and creativity" },
  { id: "economic", label: "Economic Engines", n: 3, desc: "Core productive sectors driving GDP growth" },
  { id: "growth", label: "Growth Sectors", n: 3, desc: "High-potential emerging opportunity areas" },
];

// ── CROSS-SECTOR DATA ──

const sectorList = [
  { id: 0, key: "infra", short: "Infrastructure" },
  { id: 1, key: "fin", short: "Financial Incl." },
  { id: 2, key: "health", short: "Health" },
  { id: 3, key: "tech", short: "Technology" },
  { id: 4, key: "edu", short: "Education" },
  { id: 5, key: "agri", short: "Agriculture" },
  { id: 6, key: "creative", short: "Creative" },
  { id: 7, key: "housing", short: "Housing" },
  { id: 8, key: "tourism", short: "Tourism" },
  { id: 9, key: "energy", short: "Energy" },
  { id: 10, key: "mfg", short: "Manufacturing" },
  { id: 11, key: "transport", short: "Transport" },
];

const csMatrix = [
  [0, 2, 1, 3, 1, 3, 1, 3, 2, 3, 2, 3],
  [2, 0, 2, 3, 2, 3, 2, 3, 1, 1, 3, 1],
  [1, 2, 0, 3, 3, 1, 1, 1, 1, 1, 1, 2],
  [3, 3, 3, 0, 3, 3, 3, 2, 2, 2, 2, 2],
  [1, 2, 3, 3, 0, 2, 2, 1, 2, 1, 2, 1],
  [3, 3, 1, 3, 2, 0, 1, 1, 2, 2, 3, 3],
  [1, 2, 1, 3, 2, 1, 0, 1, 3, 1, 1, 1],
  [3, 3, 1, 2, 1, 1, 1, 0, 1, 3, 3, 2],
  [2, 1, 1, 2, 2, 2, 3, 1, 0, 1, 1, 3],
  [3, 1, 1, 2, 1, 2, 1, 3, 1, 0, 3, 2],
  [2, 3, 1, 2, 2, 3, 1, 3, 1, 3, 0, 3],
  [3, 1, 2, 2, 1, 3, 1, 2, 3, 2, 3, 0],
];

const connData = {
  "0-1": { mech: "Digital payment infrastructure for market facilities", met: "$2.4B daily transactions" },
  "0-2": { mech: "Water & sanitation systems for health facilities", met: "85% coverage opportunity" },
  "0-3": { mech: "IoT sensors for water, power, and facility monitoring", met: "40% efficiency gain" },
  "0-4": { mech: "School facility construction and maintenance systems", met: "12,000 schools ready for upgrades" },
  "0-5": { mech: "Market facility upgrades serving agricultural traders", met: "10,000+ traders served" },
  "0-6": { mech: "Creative hub infrastructure and event venues", met: "15 regional creative centers" },
  "0-7": { mech: "Shared utility corridors for housing developments", met: "30% cost reduction" },
  "0-8": { mech: "Tourism site infrastructure and accessibility", met: "45 heritage sites upgradable" },
  "0-9": { mech: "Solar micro-grids powering market facilities", met: "32% energy recaptured" },
  "0-10": { mech: "Industrial zone infrastructure and utility access", met: "8 special economic zones" },
  "0-11": { mech: "Road & drainage enabling freight routes", met: "15% logistics savings" },
  "1-2": { mech: "Health insurance & mobile payment for services", met: "68% population to reach" },
  "1-3": { mech: "Mobile money platforms and fintech ecosystem", met: "$4-6B lending opportunity" },
  "1-4": { mech: "Education financing and student loan platforms", met: "2.3M students to reach" },
  "1-5": { mech: "Crop insurance and agricultural input financing", met: "5.6M farmers reachable" },
  "1-6": { mech: "IP monetization and creator payment platforms", met: "$850M creator economy" },
  "1-7": { mech: "Mortgage products and housing microfinance", met: "2M+ households to serve" },
  "1-8": { mech: "Tourism SME lending and hospitality finance", met: "12,000 tourism SMEs" },
  "1-9": { mech: "Pay-as-you-go solar financing models", met: "1.2M households to connect" },
  "1-10": { mech: "SME lending for manufacturing enterprises", met: "$2.1B SME opportunity" },
  "1-11": { mech: "Vehicle and fleet financing platforms", met: "45,000 commercial vehicles" },
  "2-3": { mech: "Telemedicine platforms and health data systems", met: "260+ districts connected" },
  "2-4": { mech: "Community health worker training pipelines", met: "1:10,000 ratio improvement" },
  "2-5": { mech: "Nutrition programs linked to local food systems", met: "19% nutrition improvement target" },
  "2-6": { mech: "Health awareness through creative media campaigns", met: "15M media reach potential" },
  "2-7": { mech: "Healthy housing standards and indoor air quality", met: "35% health impact addressable" },
  "2-8": { mech: "Medical tourism and wellness retreat development", met: "$120M medical tourism potential" },
  "2-9": { mech: "Reliable power for health facility equipment", met: "42% facilities to stabilize" },
  "2-10": { mech: "Local pharmaceutical manufacturing capacity", met: "70% local production opportunity" },
  "2-11": { mech: "Emergency medical transport and ambulance networks", met: "45-min avg response time" },
  "3-4": { mech: "Digital skills training and e-learning platforms", met: "57% youth workforce potential" },
  "3-5": { mech: "Agritech for precision farming and market access", met: "$1.9B harvest value to preserve" },
  "3-6": { mech: "Content distribution, streaming, and digital IP", met: "$3.2B creative economy" },
  "3-7": { mech: "PropTech for property management and smart homes", met: "85% informal property market" },
  "3-8": { mech: "Tourism booking platforms and digital marketing", met: "3x digital booking growth" },
  "3-9": { mech: "Smart grid management and energy monitoring", met: "18% distribution optimization" },
  "3-10": { mech: "Industry 4.0 automation and quality systems", met: "25% productivity gain potential" },
  "3-11": { mech: "Fleet management and route optimization software", met: "20% fuel cost reduction" },
  "4-5": { mech: "Agricultural extension training programs", met: "3.2M farmers to reach" },
  "4-6": { mech: "Creative arts vocational training pipelines", met: "45,000 annual graduate pipeline" },
  "4-7": { mech: "Construction skills TVET certification", met: "120,000 workforce opportunity" },
  "4-8": { mech: "Hospitality and tourism management training", met: "8 institute sites identified" },
  "4-9": { mech: "Renewable energy technician certification", met: "5,000 technician roles by 2030" },
  "4-10": { mech: "Manufacturing skills and apprenticeship programs", met: "65% workforce alignment opportunity" },
  "4-11": { mech: "Commercial driving and logistics certification", met: "28,000 certification opportunities" },
  "5-6": { mech: "Food culture media and culinary content", met: "12 regional food brands potential" },
  "5-7": { mech: "Agricultural land-use planning for housing", met: "40% peri-urban coordination opportunity" },
  "5-8": { mech: "Agritourism and farm-to-table experiences", met: "25 agritourism corridor sites" },
  "5-9": { mech: "Solar-powered irrigation and cold storage", met: "60% post-harvest energy needs" },
  "5-10": { mech: "Agro-processing and value-added manufacturing", met: "60% raw export reduction target" },
  "5-11": { mech: "Cold chain logistics from farm to market", met: "40% harvest preservation gain" },
  "6-7": { mech: "Creative district development in housing plans", met: "6 creative hub districts" },
  "6-8": { mech: "Cultural festivals driving tourism arrivals", met: "1.1M visitors annually" },
  "6-9": { mech: "Creative studio power reliability needs", met: "18 hours/day power requirement" },
  "6-10": { mech: "Local instrument and equipment manufacturing", met: "$45M local production opportunity" },
  "6-11": { mech: "Event logistics and talent touring networks", met: "35 major festival routes" },
  "7-8": { mech: "Short-term rental and hospitality housing", met: "15,000 Airbnb-ready units" },
  "7-9": { mech: "Solar-integrated affordable housing designs", met: "15% construction cost savings" },
  "7-10": { mech: "Local building materials manufacturing", met: "70% import substitution target" },
  "7-11": { mech: "Transit-oriented housing development", met: "12 major transit corridors" },
  "8-9": { mech: "Solar-powered eco-lodge and resort infrastructure", met: "85% sites ready for solar" },
  "8-10": { mech: "Souvenir and craft manufacturing for tourism", met: "$180M handicraft potential" },
  "8-11": { mech: "Tourism transport corridors and shuttle systems", met: "3x visitor mobility potential" },
  "9-10": { mech: "Industrial energy supply and reliability", met: "25% energy cost reduction" },
  "9-11": { mech: "EV charging infrastructure on freight routes", met: "15 major corridor stations" },
  "10-11": { mech: "Freight logistics for manufactured exports", met: "23% GDP logistics cost target" },
};

const getConn = (a, b) => {
  const k = `${Math.min(a, b)}-${Math.max(a, b)}`;
  return connData[k] || { mech: "Cross-sector synergy pathway", met: "Emerging opportunity" };
};
const strLabel = ["None", "Emerging", "Moderate", "Strong"];
const strBorder = ["transparent", "rgba(184,217,53,0.25)", "rgba(184,217,53,0.45)", "rgba(184,217,53,0.7)"];
const strDot = [0, 0.3, 0.6, 1];

const CSChevron = ({ open }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.3)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ── CROSS-SECTOR SECTION ──

const CrossSector = () => {
  const mb = useIsMobile();
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [locked, setLocked] = useState(null);
  const [expanded, setExpanded] = useState({ strong: false, moderate: true, emerging: false });
  const [scrollPage, setScrollPage] = useState(0);
  const [showAccordion, setShowAccordion] = useState(false);
  const scrollRef = useRef(null);

  const sel = sectorList[selected];
  const totalScore = csMatrix[selected].reduce((a, b) => a + b, 0);
  const strong = sectorList.filter((_, i) => i !== selected && csMatrix[selected][i] === 3);
  const moderate = sectorList.filter((_, i) => i !== selected && csMatrix[selected][i] === 2);
  const emerging = sectorList.filter((_, i) => i !== selected && csMatrix[selected][i] === 1);
  const displayTarget = hovered !== null ? hovered : locked;

  const handleHubSelect = (id) => {
    setSelected(id);
    setHovered(null);
    setLocked(null);
    setExpanded({ strong: false, moderate: true, emerging: false });
    setScrollPage(0);
    setShowAccordion(false);
  };
  const handleIconClick = (id) => {
    if (id !== selected) setLocked(id);
  };

  const rings = [
    { label: "Strong", items: strong, level: 3, key: "strong" },
    { label: "Moderate", items: moderate, level: 2, key: "moderate" },
    { label: "Emerging", items: emerging, level: 1, key: "emerging" },
  ];

  return (
    <section style={{ backgroundColor: colors.primary, padding: mb ? "60px 20px 80px" : "100px 80px" }}>
      <style>{`
        .cs-scroll::-webkit-scrollbar { display: none; }
        .cs-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Pill dark>Cross-Sector Integration</Pill>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: mb ? "32px" : "42px",
              fontWeight: "300",
              color: colors.white,
              margin: "0 0 16px 0",
              letterSpacing: "-0.5px",
              lineHeight: "1.15",
            }}
          >
            {"Ready to Explore the "}
            <span style={{ fontWeight: "700", color: colors.accent }}>Full Analysis?</span>
          </h2>
          {!mb && (
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "Inter, sans-serif",
                margin: "0 auto",
                maxWidth: "560px",
              }}
            >
              Select a hub sector, then hover or click connected sectors to explore integration pathways. Expand tiers
              for full detail
            </p>
          )}
        </div>

        {/* Hub Display */}
        <div style={{ textAlign: "center", marginBottom: mb ? "20px" : "28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                width: mb ? "100px" : "140px",
                height: mb ? "100px" : "140px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(184,217,53,0.12) 0%, transparent 70%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: mb ? "80px" : "110px",
                height: mb ? "80px" : "110px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(184,217,53,0.18) 0%, transparent 70%)",
              }}
            />
            <div
              style={{
                width: mb ? "64px" : "80px",
                height: mb ? "64px" : "80px",
                borderRadius: "50%",
                backgroundColor: colors.primary,
                border: `3px solid ${colors.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
                boxShadow: "0 0 24px rgba(184,217,53,0.2)",
              }}
            >
              {icons[sel.key](colors.accent, mb ? 24 : 32)}
            </div>
          </div>
          <p
            style={{
              fontSize: mb ? "16px" : "20px",
              fontWeight: "700",
              color: colors.white,
              margin: "16px 0 4px 0",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {sel.short}
          </p>
          <p
            style={{
              fontSize: mb ? "11px" : "13px",
              color: "rgba(255,255,255,0.4)",
              margin: 0,
              fontFamily: "Inter, sans-serif",
              lineHeight: mb ? "1.8" : "1",
            }}
          >
            Integration Score: <span style={{ color: colors.accent, fontWeight: "700" }}>{totalScore}</span>
            {mb ? <br /> : <span style={{ margin: "0 12px", color: "rgba(255,255,255,0.15)" }}>|</span>}
            {strong.length} strong<span style={{ margin: "0 6px", color: "rgba(255,255,255,0.15)" }}>{"\u00B7"}</span>
            {moderate.length} moderate
            <span style={{ margin: "0 6px", color: "rgba(255,255,255,0.15)" }}>{"\u00B7"}</span>
            {emerging.length} emerging
          </p>
        </div>

        {/* Icon Row */}
        <div
          className="cs-scroll"
          style={{
            display: "flex",
            justifyContent: mb ? "flex-start" : "center",
            gap: mb ? "8px" : "12px",
            marginBottom: "8px",
            flexWrap: mb ? "nowrap" : "wrap",
            overflowX: mb ? "auto" : "visible",
            paddingBottom: mb ? "4px" : "0",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {sectorList.map((s) => {
            const isHub = selected === s.id;
            const isHov = hovered === s.id;
            const isLk = locked === s.id;
            const str = isHub ? 0 : csMatrix[selected][s.id];
            return (
              <div
                key={s.id}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flexShrink: 0 }}
              >
                <button
                  onClick={() => (isHub ? null : handleIconClick(s.id))}
                  onDoubleClick={() => handleHubSelect(s.id)}
                  onMouseEnter={() => {
                    if (!isHub && !mb) setHovered(s.id);
                  }}
                  onMouseLeave={() => {
                    if (!mb) setHovered(null);
                  }}
                  style={{
                    width: isHub ? "48px" : mb ? "44px" : "56px",
                    height: isHub ? "48px" : mb ? "44px" : "56px",
                    borderRadius: mb ? "12px" : "16px",
                    cursor: isHub ? "default" : "pointer",
                    border: isHub
                      ? "2px solid rgba(184,217,53,0.3)"
                      : isLk
                        ? `2.5px solid ${colors.accent}`
                        : isHov
                          ? "2px solid rgba(184,217,53,0.6)"
                          : "1.5px solid rgba(255,255,255,0.12)",
                    backgroundColor: isHub
                      ? "rgba(184,217,53,0.06)"
                      : isLk
                        ? "rgba(184,217,53,0.1)"
                        : isHov
                          ? "rgba(184,217,53,0.06)"
                          : "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.25s ease",
                    boxShadow: isLk ? "0 0 0 3px rgba(184,217,53,0.12)" : "none",
                    opacity: isHub ? 0.4 : 1,
                  }}
                >
                  {icons[s.key](
                    isHub
                      ? "rgba(184,217,53,0.5)"
                      : isLk
                        ? colors.accent
                        : isHov
                          ? colors.accent
                          : "rgba(255,255,255,0.5)",
                    isHub ? 18 : mb ? 18 : 22,
                  )}
                </button>
                {!isHub && (
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1, 2, 3].map((lv) => (
                      <div
                        key={lv}
                        style={{
                          width: "8px",
                          height: "3px",
                          borderRadius: "1.5px",
                          backgroundColor:
                            str >= lv
                              ? isHov || isLk
                                ? colors.accent
                                : "rgba(184,217,53,0.4)"
                              : "rgba(255,255,255,0.08)",
                          transition: "all 0.25s ease",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Hint */}
        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "rgba(255,255,255,0.15)",
            margin: "0 0 40px 0",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {mb ? "Tap to inspect \u00B7 Double-tap to switch hub" : "Click to inspect \u00B7 Double-click to switch hub"}
        </p>

        {/* Detail Panel — always visible */}
        <div
          style={{
            display: mb ? "flex" : "grid",
            flexDirection: "column",
            gridTemplateColumns: "320px 1fr",
            gap: mb ? "16px" : "24px",
            alignItems: "stretch",
          }}
        >
          {/* LEFT: Detail Panel */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: mb ? "8px" : 0 }}>
            {displayTarget !== null ? (
              (() => {
                const t = sectorList[displayTarget];
                const cn = getConn(selected, displayTarget);
                const st = csMatrix[selected][displayTarget];
                const isL = locked !== null && hovered === null;
                return (
                  <div
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: `1px solid ${isL ? "rgba(184,217,53,0.3)" : "rgba(184,217,53,0.2)"}`,
                      borderRadius: mb ? "14px" : "16px",
                      padding: mb ? "20px" : "24px",
                      transition: "all 0.25s ease",
                      flex: mb ? "none" : 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "14px",
                          backgroundColor: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {icons[t.key](colors.accent, 22)}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: colors.white,
                            margin: "0 0 4px 0",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {t.short}
                        </p>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            color: colors.accent,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            padding: "3px 10px",
                            borderRadius: "50px",
                            backgroundColor: "rgba(184,217,53,0.12)",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {strLabel[st]}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {sel.short}
                      </span>
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                        <path
                          d="M0 5h14M10 1l4 4-4 4"
                          stroke="rgba(184,217,53,0.5)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {t.short}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.5)",
                        margin: "0 0 16px 0",
                        lineHeight: "1.6",
                        fontFamily: "Inter, sans-serif",
                        flex: 1,
                      }}
                    >
                      {cn.mech}
                    </p>
                    <div
                      style={{
                        backgroundColor: "rgba(184,217,53,0.06)",
                        borderRadius: "12px",
                        padding: "16px",
                        border: "1px solid rgba(184,217,53,0.12)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "22px",
                          fontWeight: "700",
                          color: colors.accent,
                          margin: "0 0 4px 0",
                          lineHeight: "1.2",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {cn.met}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.3)",
                          margin: 0,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          fontWeight: "600",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        Impact Metric
                      </p>
                    </div>
                    <div style={{ marginTop: "16px", display: "flex", gap: "4px" }}>
                      {[1, 2, 3].map((lv) => (
                        <div
                          key={lv}
                          style={{
                            flex: 1,
                            height: "4px",
                            borderRadius: "2px",
                            backgroundColor: st >= lv ? colors.accent : "rgba(255,255,255,0.08)",
                            opacity: st >= lv ? (lv === 1 ? 0.4 : lv === 2 ? 0.7 : 1) : 1,
                            transition: "all 0.3s ease",
                          }}
                        />
                      ))}
                    </div>
                    {isL && (
                      <p
                        style={{
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.2)",
                          margin: "12px 0 0 0",
                          textAlign: "center",
                          fontStyle: "italic",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {mb ? "Tap other icons to compare" : "Hover other icons to compare \u00B7 Click to lock"}
                      </p>
                    )}
                  </div>
                );
              })()
            ) : (
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: mb ? "14px" : "16px",
                  padding: mb ? "24px 20px" : "40px 24px",
                  textAlign: "center",
                  flex: mb ? "none" : 1,
                  display: "flex",
                  flexDirection: mb ? "row" : "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: mb ? "16px" : "0",
                }}
              >
                <div
                  style={{
                    width: mb ? "40px" : "48px",
                    height: mb ? "40px" : "48px",
                    borderRadius: mb ? "12px" : "14px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: mb ? "0" : "16px",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <div style={{ textAlign: mb ? "left" : "center" }}>
                  <p
                    style={{
                      fontSize: mb ? "13px" : "14px",
                      fontWeight: "600",
                      color: "rgba(255,255,255,0.3)",
                      margin: "0 0 6px 0",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Explore Connections
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.15)",
                      margin: 0,
                      lineHeight: "1.5",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {mb
                      ? `Tap any sector icon above to see its connection with ${sel.short}`
                      : `Hover or click any sector icon above to preview its integration pathway with ${sel.short}`}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile: Toggle to show/hide accordion */}
          {mb && !showAccordion && (
            <button
              onClick={() => {
                setShowAccordion(true);
                setExpanded({ strong: false, moderate: false, emerging: false });
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid rgba(184,217,53,0.2)",
                backgroundColor: "rgba(184,217,53,0.05)",
                cursor: "pointer",
                margin: 0,
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: colors.accent,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.5px",
                }}
              >
                View Connection Tiers
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.accent}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}

          {/* RIGHT: Accordion — always on desktop, toggled on mobile */}
          {(!mb || showAccordion) && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflow: "hidden", minWidth: 0 }}>
              {mb && (
                <button
                  onClick={() => {
                    setShowAccordion(false);
                    setExpanded({ strong: false, moderate: false, emerging: false });
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Hide Tiers
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              )}
              {rings.map((ring) => {
                if (ring.items.length === 0) return null;
                const isOpen = expanded[ring.key];
                return (
                  <div
                    key={ring.key}
                    style={{
                      borderRadius: "16px",
                      border: `1px solid ${isOpen ? strBorder[ring.level] : "rgba(255,255,255,0.08)"}`,
                      backgroundColor: isOpen ? "rgba(255,255,255,0.03)" : "transparent",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <button
                      onClick={() => {
                        setExpanded((prev) => {
                          const n = { strong: false, moderate: false, emerging: false };
                          if (!prev[ring.key]) n[ring.key] = true;
                          return n;
                        });
                        setScrollPage(0);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: mb ? "18px 16px" : "16px 20px",
                        margin: 0,
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: colors.accent,
                          opacity: strDot[ring.level],
                        }}
                      />
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: isOpen ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          flex: 1,
                          textAlign: "left",
                          transition: "color 0.2s ease",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {ring.label} Connections ({ring.items.length})
                      </span>
                      <CSChevron open={isOpen} />
                    </button>
                    <div
                      style={{
                        maxHeight: isOpen ? "1000px" : "0",
                        opacity: isOpen ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                        padding: isOpen ? (mb ? "0 12px 16px" : "0 20px 20px") : mb ? "0 12px" : "0 20px",
                      }}
                    >
                      <div
                        className="cs-scroll"
                        ref={isOpen ? scrollRef : null}
                        onScroll={(e) => {
                          const el = e.target as HTMLElement;
                          const cardsVis = mb ? 1 : 3;
                          const cw = el.scrollWidth / ring.items.length;
                          setScrollPage(Math.round(el.scrollLeft / (cw * cardsVis)));
                        }}
                        style={{
                          display: "flex",
                          gap: mb ? "12px" : "12px",
                          overflowX: mb || ring.items.length > 3 ? "auto" : "hidden",
                          scrollSnapType: "x mandatory",
                          paddingBottom: mb || ring.items.length > 3 ? "8px" : "0",
                          WebkitOverflowScrolling: "touch",
                        }}
                      >
                        {ring.items.map((s, i) => {
                          const cn = getConn(selected, s.id);
                          const isAc = s.id === displayTarget;
                          return (
                            <div
                              key={s.id}
                              onClick={() => setLocked(s.id)}
                              onMouseEnter={() => {
                                if (!mb) setHovered(s.id);
                              }}
                              onMouseLeave={() => {
                                if (!mb) setHovered(null);
                              }}
                              style={{
                                flex: mb ? "0 0 85%" : ring.items.length <= 3 ? "1 1 0" : "0 0 calc((100% - 24px) / 3)",
                                minWidth: 0,
                                height: mb ? "180px" : "200px",
                                display: "flex",
                                flexDirection: "column",
                                padding: mb ? "16px" : "20px",
                                borderRadius: mb ? "12px" : "14px",
                                backgroundColor: isAc ? "rgba(184,217,53,0.08)" : "rgba(255,255,255,0.05)",
                                border: `1px solid ${isAc ? "rgba(184,217,53,0.3)" : "rgba(255,255,255,0.08)"}`,
                                cursor: "pointer",
                                scrollSnapAlign: "start",
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? "translateY(0)" : "translateY(8px)",
                                transition: `all 0.35s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`,
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                                <div
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "10px",
                                    backgroundColor: isAc ? "rgba(184,217,53,0.1)" : "rgba(255,255,255,0.06)",
                                    border: `1px solid ${isAc ? "rgba(184,217,53,0.2)" : "rgba(255,255,255,0.1)"}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  {icons[s.key](isAc ? colors.accent : "rgba(255,255,255,0.7)", 16)}
                                </div>
                                <p
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "700",
                                    color: colors.white,
                                    margin: 0,
                                    fontFamily: "Inter, sans-serif",
                                  }}
                                >
                                  {s.short}
                                </p>
                              </div>
                              <p
                                style={{
                                  fontSize: "13px",
                                  color: "rgba(255,255,255,0.4)",
                                  margin: 0,
                                  lineHeight: "1.5",
                                  flex: 1,
                                  overflow: "hidden",
                                  fontFamily: "Inter, sans-serif",
                                }}
                              >
                                {cn.mech}
                              </p>
                              <p
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "700",
                                  color: colors.accent,
                                  margin: "12px 0 0 0",
                                  fontFamily: "Inter, sans-serif",
                                }}
                              >
                                {cn.met}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      {(mb || ring.items.length > 3) && (
                        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "12px" }}>
                          {Array.from({ length: mb ? ring.items.length : Math.ceil(ring.items.length / 3) }).map(
                            (_, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  if (scrollRef.current) {
                                    const cardsVis = mb ? 1 : 3;
                                    const cw = scrollRef.current.scrollWidth / ring.items.length;
                                    scrollRef.current.scrollTo({ left: cw * cardsVis * idx, behavior: "smooth" });
                                  }
                                  setScrollPage(idx);
                                }}
                                style={{
                                  width: scrollPage === idx ? "24px" : "8px",
                                  height: "8px",
                                  borderRadius: "4px",
                                  backgroundColor: scrollPage === idx ? colors.accent : "rgba(255,255,255,0.2)",
                                  cursor: "pointer",
                                  transition: "all 0.3s ease",
                                }}
                              />
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Arr = ({ s = 12, c = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

const Pill = ({ children, dark }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 20px",
      border: `1px solid ${dark ? "rgba(255,255,255,0.25)" : colors.line}`,
      borderRadius: "50px",
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "2px",
      color: dark ? colors.white : colors.primary,
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
    {children}
  </div>
);

// ── Header is now shared (SiteHeader)

// ── HERO ──

const HeroSection = () => {
  const mb = useIsMobile();
  const st = [
    { v: "$50B+", l: "Diaspora Capital Untapped" },
    { v: "35M+", l: "Citizens to Serve" },
    { v: "174+", l: "Opportunities Mapped" },
    { v: "$192B", l: "Mobile Money Volume (2024)" },
  ];
  return (
    <section style={{ backgroundColor: colors.white, padding: mb ? "60px 20px 48px" : "80px 80px 60px" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <Pill dark={false}>Analysis</Pill>
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: mb ? "36px" : "56px",
            fontWeight: "300",
            lineHeight: "1.1",
            color: colors.primary,
            margin: "0 0 24px 0",
            letterSpacing: "-1px",
            maxWidth: "800px",
          }}
        >
          <span style={{ fontWeight: "700" }}>Twelve Integrated Sectors</span>
          <br />
          One Unified <span style={{ fontWeight: "700", color: colors.accent }}>Approach</span>
        </h1>
        <p
          style={{
            fontSize: mb ? "15px" : "17px",
            lineHeight: "1.7",
            color: "#666",
            fontFamily: "Inter, sans-serif",
            margin: "0 0 48px 0",
            maxWidth: "600px",
          }}
        >
          {
            "A trader\u2019s success depends on credit, market infrastructure, cold storage, and supply chains working together. BRIDGE aligns the systems, institutions, and resources that make that possible"
          }
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mb ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: mb ? "24px 0" : "0",
            borderTop: `1px solid ${colors.line}`,
            borderBottom: `1px solid ${colors.line}`,
            padding: mb ? "28px 0" : "28px 0",
          }}
        >
          {st.map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                borderRight: !mb && i < 3 ? `1px solid ${colors.line}` : "none",
                borderBottom: mb && i < 2 ? `1px solid ${colors.line}` : "none",
                paddingBottom: mb && i < 2 ? "24px" : "0",
                paddingTop: mb && i >= 2 ? "0" : "0",
              }}
            >
              <p
                style={{
                  fontSize: mb ? "26px" : "36px",
                  fontWeight: "700",
                  color: colors.primary,
                  fontFamily: "Inter, sans-serif",
                  margin: "0 0 4px 0",
                }}
              >
                {s.v}
              </p>
              <p
                style={{
                  fontSize: mb ? "10px" : "12px",
                  fontWeight: "600",
                  color: "#999",
                  fontFamily: "Inter, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: 0,
                }}
              >
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── SECTOR CARD ──

const SectorCard = ({ s, hov, onE, onL }) => {
  const Icon = icons[s.ik];
  const mb = useIsMobile();
  const navigate = useNavigate();
  const href = sectorRoute(s.slug);
  return (
    <div
      className="value-card"
      onMouseEnter={onE}
      onMouseLeave={onL}
      onClick={() => navigate(href)}
      style={{
        backgroundColor: colors.white,
        borderRadius: mb ? "16px" : "20px",
        padding: mb ? "20px" : "28px",
        display: "flex",
        flexDirection: "column",
        gap: mb ? "12px" : "16px",
        cursor: "pointer",
        border: `1px solid ${hov ? colors.accent : colors.line}`,
        boxShadow: hov ? "0 16px 40px rgba(27,77,62,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: mb ? "40px" : "48px",
            height: mb ? "40px" : "48px",
            borderRadius: mb ? "12px" : "14px",
            backgroundColor: hov ? colors.primary : colors.background,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.3s ease",
          }}
        >
          {Icon(hov ? colors.accent : colors.primary, mb ? 18 : 20)}
        </div>
        <span style={{ fontSize: "12px", fontWeight: "700", color: "#ccc", fontFamily: "Inter, sans-serif" }}>
          {String(s.id).padStart(2, "0")}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: mb ? "15px" : "16px",
          fontWeight: "700",
          color: colors.primary,
          margin: 0,
          lineHeight: "1.3",
        }}
      >
        {s.name}
      </h3>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: mb ? "13px" : "13.5px",
          color: "#666",
          margin: 0,
          lineHeight: "1.6",
          flex: 1,
        }}
      >
        {s.problem}
      </p>
      <div
        style={{
          backgroundColor: colors.background,
          borderRadius: mb ? "10px" : "12px",
          padding: mb ? "10px 14px" : "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontSize: mb ? "18px" : "20px",
              fontWeight: "700",
              color: colors.primary,
              fontFamily: "Inter, sans-serif",
              margin: "0 0 2px 0",
            }}
          >
            {s.metric}
          </p>
          <p
            style={{
              fontSize: "10px",
              fontWeight: "600",
              color: "#999",
              margin: 0,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {s.mLabel}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "700",
              color: colors.accent,
              fontFamily: "Inter, sans-serif",
              margin: "0 0 2px 0",
            }}
          >
            {s.cap}
          </p>
          <p
            style={{
              fontSize: "10px",
              fontWeight: "600",
              color: "#999",
              margin: 0,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {s.vent} Ventures
          </p>
        </div>
      </div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "50px",
          backgroundColor: hov ? "rgba(184,217,53,0.12)" : "rgba(27,77,62,0.04)",
          alignSelf: "flex-start",
        }}
      >
        <span
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            backgroundColor: hov ? colors.accent : colors.primary,
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontWeight: "600",
            color: hov ? colors.accentText : "#888",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {s.tag}
        </span>
      </div>
      <a
        href={href}
        onClick={(e) => { e.preventDefault(); navigate(href); }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textDecoration: "none",
          paddingTop: "8px",
          borderTop: `1px solid ${colors.line}`,
        }}
      >
        <span style={{ fontSize: "13px", fontWeight: "600", color: colors.primary, fontFamily: "Inter, sans-serif" }}>
          Explore Full Analysis
        </span>
        <span
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            backgroundColor: hov ? colors.accent : colors.background,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.3s ease",
          }}
        >
          <Arr s={10} c={hov ? colors.primary : "#999"} />
        </span>
      </a>
    </div>
  );
};

// ── SECTOR GRID (3-card horizontal scroll + filter tabs) ──

const SectorGrid = () => {
  const [ac, setAc] = useState("all");
  const [hov, setHov] = useState(null);
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);
  const mb = useIsMobile();

  const fl = ac === "all" ? sectors : sectors.filter((x) => x.cat === ac);
  const cd = cats.find((c) => c.id === ac);

  const onScroll = () => {
    if (!ref.current || fl.length === 0) return;
    const cw = ref.current.scrollWidth / fl.length;
    setIdx(Math.min(Math.round(ref.current.scrollLeft / cw), fl.length - 1));
  };
  const goTo = (i) => {
    if (ref.current) {
      const cw = ref.current.scrollWidth / fl.length;
      ref.current.scrollTo({ left: cw * i, behavior: "smooth" });
    }
  };
  const switchCat = (id) => {
    setAc(id);
    setIdx(0);
    if (ref.current) ref.current.scrollTo({ left: 0, behavior: "auto" });
  };

  return (
    <section style={{ backgroundColor: colors.background, padding: mb ? "60px 20px 80px" : "100px 80px" }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Pill dark={false}>12 Integrated Sectors</Pill>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: mb ? "32px" : "42px",
              fontWeight: "300",
              color: colors.primary,
              margin: "0 0 16px 0",
              letterSpacing: "-0.5px",
              lineHeight: "1.15",
            }}
          >
            Comprehensive <span style={{ fontWeight: "700" }}>Analysis</span>
            {" \u00B7 "}Targeted <span style={{ fontWeight: "700", color: colors.accent }}>Solutions</span>
          </h2>
          <p
            style={{
              fontSize: mb ? "14px" : "16px",
              lineHeight: "1.7",
              color: "#666",
              fontFamily: "Inter, sans-serif",
              margin: "0 auto",
              maxWidth: mb ? "100%" : "560px",
            }}
          >
            {mb
              ? "Each sector maps the full ecosystem to identify where alignment creates the greatest impact"
              : "Each sector maps the full ecosystem \u2014 stakeholders, systems, capital flows, and integration pathways \u2014 to identify where alignment creates the greatest impact"}
          </p>
        </div>
        <div
          className="cs-scroll"
          style={{
            display: "flex",
            gap: mb ? "8px" : "12px",
            justifyContent: mb ? "flex-start" : "center",
            marginBottom: "48px",
            flexWrap: "nowrap",
            overflowX: mb ? "auto" : "visible",
            paddingBottom: mb ? "4px" : "0",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {cats.map((c) => {
            const on = ac === c.id;
            return (
              <button
                key={c.id}
                onClick={() => switchCat(c.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: mb ? "10px 16px" : "12px 24px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  border: on ? `2px solid ${colors.primary}` : `1.5px solid ${colors.line}`,
                  backgroundColor: on ? colors.primary : colors.white,
                  color: on ? colors.white : colors.primary,
                  fontSize: mb ? "12px" : "13px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  transition: "all 0.25s ease",
                  boxShadow: on ? "0 4px 12px rgba(27,77,62,0.15)" : "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {c.label}
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    backgroundColor: on ? "rgba(184,217,53,0.25)" : colors.background,
                    color: on ? colors.accent : "#999",
                    padding: "2px 8px",
                    borderRadius: "50px",
                  }}
                >
                  {c.n}
                </span>
              </button>
            );
          })}
        </div>
        {cd && (
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#888",
              fontFamily: "Inter, sans-serif",
              fontStyle: "italic",
              margin: "-24px auto 40px",
              maxWidth: "400px",
            }}
          >
            {cd.desc}
          </p>
        )}
        <div
          ref={ref}
          onScroll={onScroll}
          className="sector-scroll-track"
          style={{
            display: "flex",
            gap: mb ? "16px" : "24px",
            overflowX: "auto",
            overflowY: "visible",
            scrollSnapType: "x mandatory",
            padding: "8px 0 16px",
            margin: "-8px 0 0",
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {fl.map((s) => (
            <div key={s.id} style={{ flex: mb ? "0 0 80%" : "0 0 calc((100% - 48px) / 3)", scrollSnapAlign: "start" }}>
              <SectorCard s={s} hov={hov === s.id} onE={() => setHov(s.id)} onL={() => setHov(null)} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "16px" }}>
          {fl.map((_, i) => (
            <span
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: idx === i ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: idx === i ? colors.accent : colors.line,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ── CTA ──

const CTA = () => {
  const mb = useIsMobile();
  const navigate = useNavigate();
  return (
    <section style={{ backgroundColor: colors.primary, padding: mb ? "16px 20px 56px" : "19px 80px 67px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            gap: mb ? "12px" : "16px",
            justifyContent: "center",
            flexDirection: mb ? "column" : "row",
            alignItems: mb ? "stretch" : "center",
          }}
        >
          <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }} style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                border: "none",
                padding: mb ? "14px 24px" : "16px 28px",
                fontSize: mb ? "14px" : "15px",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: mb ? "100%" : "auto",
              }}
            >
              Request Full Access
              <span
                className="cta-btn-arrow"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: colors.primary,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Arr s={12} c={colors.white} />
              </span>
            </button>
          </a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: "transparent",
                color: colors.white,
                border: "2px solid rgba(255,255,255,0.3)",
                padding: mb ? "14px 24px" : "16px 28px",
                fontSize: mb ? "14px" : "15px",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                borderRadius: "50px",
                width: mb ? "100%" : "auto",
              }}
            >
              Schedule a Briefing
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

// ── MAIN ──

export default function BRIDGESectorsLanding() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: colors.white, minHeight: "100vh" }}>

      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }
        .sector-scroll-track::-webkit-scrollbar { display: none; }
        .cta-primary { transition: all 0.3s ease; }
        .cta-primary:hover { background-color: #B8D935 !important; color: #1B4D3E !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(184,217,53,0.3); }
        .cta-primary:hover .cta-btn-arrow { background-color: rgba(27,77,62,0.15) !important; }
        .value-card { transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1), border-color 0.35s ease; }
        .header-icon { transition: all 0.25s ease; cursor: pointer; }
        .header-icon:hover { color: #1B4D3E !important; }
        .header-icon:hover svg { stroke: #1B4D3E !important; }
        @media (hover: hover) and (pointer: fine) {
          .value-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(27,77,62,0.12); }
        }
        @media (hover: none) {
          .value-card:active { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(27,77,62,0.08); }
        }
        input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
      <SiteHeader />
      <HeroSection />
      <SectorGrid />
      <CrossSector />
      <CTA />
      <SiteFooter />
    </div>
  );
}
