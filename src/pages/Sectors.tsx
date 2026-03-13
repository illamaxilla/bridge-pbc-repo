import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";

// Slug → route map (handles creative→sports, transportation→transport)
const sectorRoute = (slug: string): string => {
  const overrides: Record<string, string> = {
    creative: "/sectors/sports",
    transportation: "/sectors/transport",
  };
  return overrides[slug] ?? `/sectors/${slug}`;
};

import { colors } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";

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
    className={cn("transition-transform duration-300 ease-in-out", open ? "rotate-180" : "rotate-0")}
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
    <section className={cn("bg-[#1B4D3E]", mb ? "px-5 pt-[60px] pb-20" : "px-20 py-[100px]")}>
      <style>{`
        .cs-scroll::-webkit-scrollbar { display: none; }
        .cs-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Pill dark>Cross-Sector Integration</Pill>
          <h2
            className={cn(
              "font-['Inter',sans-serif] font-light text-white tracking-[-0.5px] leading-[1.15] mb-4 mt-0",
              mb ? "text-[32px]" : "text-[42px]"
            )}
          >
            {"Ready to Explore the "}
            <span className="font-bold text-[#B8D935]">Full Analysis?</span>
          </h2>
          {!mb && (
            <p className="text-base leading-[1.7] text-white/50 font-['Inter',sans-serif] mx-auto max-w-[560px] m-0">
              Select a hub sector, then hover or click connected sectors to explore integration pathways. Expand tiers
              for full detail
            </p>
          )}
        </div>

        {/* Hub Display */}
        <div className={cn("text-center", mb ? "mb-5" : "mb-7")}>
          <div className="inline-flex items-center justify-center relative">
            <div
              className={cn(
                "absolute rounded-full bg-[radial-gradient(circle,rgba(184,217,53,0.12)_0%,transparent_70%)]",
                mb ? "w-[100px] h-[100px]" : "w-[140px] h-[140px]"
              )}
            />
            <div
              className={cn(
                "absolute rounded-full bg-[radial-gradient(circle,rgba(184,217,53,0.18)_0%,transparent_70%)]",
                mb ? "w-20 h-20" : "w-[110px] h-[110px]"
              )}
            />
            <div
              className={cn(
                "rounded-full bg-[#1B4D3E] border-[3px] border-[#B8D935] flex items-center justify-center relative z-[1] shadow-[0_0_24px_rgba(184,217,53,0.2)]",
                mb ? "w-16 h-16" : "w-20 h-20"
              )}
            >
              {icons[sel.key](colors.accent, mb ? 24 : 32)}
            </div>
          </div>
          <p
            className={cn(
              "font-bold text-white font-['Inter',sans-serif] mt-4 mb-1",
              mb ? "text-base" : "text-xl"
            )}
          >
            {sel.short}
          </p>
          <p
            className={cn(
              "text-white/40 font-['Inter',sans-serif] m-0",
              mb ? "text-[11px] leading-[1.8]" : "text-[13px] leading-none"
            )}
          >
            Integration Score: <span className="text-[#B8D935] font-bold">{totalScore}</span>
            {mb ? <br /> : <span className="mx-3 text-white/[0.15]">|</span>}
            {strong.length} strong<span className="mx-1.5 text-white/[0.15]">{"\u00B7"}</span>
            {moderate.length} moderate
            <span className="mx-1.5 text-white/[0.15]">{"\u00B7"}</span>
            {emerging.length} emerging
          </p>
        </div>

        {/* Icon Row */}
        <div
          className={cn(
            "cs-scroll flex mb-2",
            mb
              ? "gap-2 justify-start flex-nowrap overflow-x-auto pb-1"
              : "gap-3 justify-center flex-wrap overflow-visible pb-0"
          )}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {sectorList.map((s) => {
            const isHub = selected === s.id;
            const isHov = hovered === s.id;
            const isLk = locked === s.id;
            const str = isHub ? 0 : csMatrix[selected][s.id];
            return (
              <div
                key={s.id}
                className="flex flex-col items-center gap-1.5 shrink-0"
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
                  className={cn(
                    "flex items-center justify-center transition-all duration-[250ms] ease-in-out",
                    mb ? "rounded-xl" : "rounded-2xl",
                    isHub
                      ? "w-12 h-12 cursor-default opacity-40"
                      : mb
                        ? "w-11 h-11 cursor-pointer opacity-100"
                        : "w-14 h-14 cursor-pointer opacity-100"
                  )}
                  style={{
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
                    boxShadow: isLk ? "0 0 0 3px rgba(184,217,53,0.12)" : "none",
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
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((lv) => (
                      <div
                        key={lv}
                        className="w-2 h-[3px] rounded-[1.5px] transition-all duration-[250ms] ease-in-out"
                        style={{
                          backgroundColor:
                            str >= lv
                              ? isHov || isLk
                                ? colors.accent
                                : "rgba(184,217,53,0.4)"
                              : "rgba(255,255,255,0.08)",
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
        <p className="text-center text-[11px] text-white/[0.15] font-['Inter',sans-serif] mt-0 mb-10 mx-0">
          {mb ? "Tap to inspect \u00B7 Double-tap to switch hub" : "Click to inspect \u00B7 Double-click to switch hub"}
        </p>

        {/* Detail Panel — always visible */}
        <div
          className={cn(
            "items-stretch",
            mb ? "flex flex-col gap-4" : "grid gap-6 grid-cols-[320px_1fr]"
          )}
        >
          {/* LEFT: Detail Panel */}
          <div className={cn("flex flex-col", mb ? "mb-2" : "mb-0")}>
            {displayTarget !== null ? (
              (() => {
                const t = sectorList[displayTarget];
                const connInfo = getConn(selected, displayTarget);
                const st = csMatrix[selected][displayTarget];
                const isL = locked !== null && hovered === null;
                return (
                  <div
                    className={cn(
                      "bg-white/5 transition-all duration-[250ms] ease-in-out flex flex-col",
                      mb ? "rounded-[14px] p-5 flex-none" : "rounded-2xl p-6 flex-1"
                    )}
                    style={{
                      border: `1px solid ${isL ? "rgba(184,217,53,0.3)" : "rgba(184,217,53,0.2)"}`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-[14px] bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
                        {icons[t.key](colors.accent, 22)}
                      </div>
                      <div>
                        <p className="text-base font-bold text-white font-['Inter',sans-serif] mb-1 mt-0">
                          {t.short}
                        </p>
                        <span className="text-[10px] font-bold text-[#B8D935] uppercase tracking-[0.5px] px-2.5 py-[3px] rounded-[50px] bg-[rgba(184,217,53,0.12)] font-['Inter',sans-serif]">
                          {strLabel[st]}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[11px] font-semibold text-white/30 font-['Inter',sans-serif]">
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
                      <span className="text-[11px] font-semibold text-white/30 font-['Inter',sans-serif]">
                        {t.short}
                      </span>
                    </div>
                    <p className="text-sm text-white/50 leading-[1.6] font-['Inter',sans-serif] flex-1 mt-0 mb-4 mx-0">
                      {connInfo.mech}
                    </p>
                    <div className="bg-[rgba(184,217,53,0.06)] rounded-xl p-4 border border-[rgba(184,217,53,0.12)]">
                      <p className="text-[22px] font-bold text-[#B8D935] leading-[1.2] font-['Inter',sans-serif] mt-0 mb-1 mx-0">
                        {connInfo.met}
                      </p>
                      <p className="text-[11px] text-white/30 uppercase tracking-[0.5px] font-semibold font-['Inter',sans-serif] m-0">
                        Impact Metric
                      </p>
                    </div>
                    <div className="mt-4 flex gap-1">
                      {[1, 2, 3].map((lv) => (
                        <div
                          key={lv}
                          className="flex-1 h-1 rounded-sm transition-all duration-300 ease-in-out"
                          style={{
                            backgroundColor: st >= lv ? colors.accent : "rgba(255,255,255,0.08)",
                            opacity: st >= lv ? (lv === 1 ? 0.4 : lv === 2 ? 0.7 : 1) : 1,
                          }}
                        />
                      ))}
                    </div>
                    {isL && (
                      <p className="text-[10px] text-white/20 text-center italic font-['Inter',sans-serif] mt-3 mb-0 mx-0">
                        {mb ? "Tap other icons to compare" : "Hover other icons to compare \u00B7 Click to lock"}
                      </p>
                    )}
                  </div>
                );
              })()
            ) : (
              <div
                className={cn(
                  "bg-white/[0.03] border border-dashed border-white/10 text-center flex items-center justify-center",
                  mb
                    ? "rounded-[14px] px-5 py-6 flex-none flex-row gap-4"
                    : "rounded-2xl px-6 py-10 flex-1 flex-col gap-0"
                )}
              >
                <div
                  className={cn(
                    "bg-white/5 inline-flex items-center justify-center shrink-0",
                    mb ? "w-10 h-10 rounded-xl mb-0" : "w-12 h-12 rounded-[14px] mb-4"
                  )}
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
                <div className={mb ? "text-left" : "text-center"}>
                  <p
                    className={cn(
                      "font-semibold text-white/30 font-['Inter',sans-serif] mb-1.5 mt-0 mx-0",
                      mb ? "text-[13px]" : "text-sm"
                    )}
                  >
                    Explore Connections
                  </p>
                  <p className="text-xs text-white/[0.15] leading-normal font-['Inter',sans-serif] m-0">
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
              className="flex items-center justify-center gap-2.5 w-full p-3.5 rounded-xl border border-[rgba(184,217,53,0.2)] bg-[rgba(184,217,53,0.05)] cursor-pointer m-0"
            >
              <span className="text-xs font-bold text-[#B8D935] font-['Inter',sans-serif] tracking-[0.5px]">
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
            <div className="flex flex-col gap-3 overflow-hidden min-w-0">
              {mb && (
                <button
                  onClick={() => {
                    setShowAccordion(false);
                    setExpanded({ strong: false, moderate: false, emerging: false });
                  }}
                  className="flex items-center justify-center gap-2 w-full p-2.5 rounded-[10px] border border-white/[0.08] bg-transparent cursor-pointer m-0"
                >
                  <span className="text-[11px] font-semibold text-white/30 font-['Inter',sans-serif]">
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
                    className={cn(
                      "rounded-2xl overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "bg-white/[0.03]" : "bg-transparent"
                    )}
                    style={{
                      border: `1px solid ${isOpen ? strBorder[ring.level] : "rgba(255,255,255,0.08)"}`,
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
                      className={cn(
                        "flex items-center gap-2.5 w-full bg-none border-none cursor-pointer m-0",
                        mb ? "px-4 py-[18px]" : "px-5 py-4"
                      )}
                    >
                      <span
                        className="w-2 h-2 rounded-full bg-[#B8D935]"
                        style={{ opacity: strDot[ring.level] }}
                      />
                      <span
                        className={cn(
                          "text-xs font-bold uppercase tracking-[1.5px] flex-1 text-left transition-colors duration-200 ease-in-out font-['Inter',sans-serif]",
                          isOpen ? "text-white/60" : "text-white/[0.35]"
                        )}
                      >
                        {ring.label} Connections ({ring.items.length})
                      </span>
                      <CSChevron open={isOpen} />
                    </button>
                    <div
                      className="overflow-hidden transition-[max-height,opacity] duration-[450ms,300ms] ease-[cubic-bezier(0.4,0,0.2,1),ease]"
                      style={{
                        maxHeight: isOpen ? "1000px" : "0",
                        opacity: isOpen ? 1 : 0,
                        padding: isOpen ? (mb ? "0 12px 16px" : "0 20px 20px") : mb ? "0 12px" : "0 20px",
                      }}
                    >
                      <div
                        className={cn(
                          "cs-scroll flex gap-3 snap-x snap-mandatory",
                          (mb || ring.items.length > 3)
                            ? "overflow-x-auto pb-2"
                            : "overflow-x-hidden pb-0"
                        )}
                        ref={isOpen ? scrollRef : null}
                        onScroll={(e) => {
                          const el = e.target as HTMLElement;
                          const cardsVis = mb ? 1 : 3;
                          const cw = el.scrollWidth / ring.items.length;
                          setScrollPage(Math.round(el.scrollLeft / (cw * cardsVis)));
                        }}
                        style={{ WebkitOverflowScrolling: "touch" }}
                      >
                        {ring.items.map((s, i) => {
                          const connInfo = getConn(selected, s.id);
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
                              className={cn(
                                "min-w-0 flex flex-col cursor-pointer snap-start",
                                mb ? "h-[180px] p-4 rounded-xl" : "h-[200px] p-5 rounded-[14px]"
                              )}
                              style={{
                                flex: mb ? "0 0 85%" : ring.items.length <= 3 ? "1 1 0" : "0 0 calc((100% - 24px) / 3)",
                                backgroundColor: isAc ? "rgba(184,217,53,0.08)" : "rgba(255,255,255,0.05)",
                                border: `1px solid ${isAc ? "rgba(184,217,53,0.3)" : "rgba(255,255,255,0.08)"}`,
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? "translateY(0)" : "translateY(8px)",
                                transition: `all 0.35s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`,
                              }}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div
                                  className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                                  style={{
                                    backgroundColor: isAc ? "rgba(184,217,53,0.1)" : "rgba(255,255,255,0.06)",
                                    border: `1px solid ${isAc ? "rgba(184,217,53,0.2)" : "rgba(255,255,255,0.1)"}`,
                                  }}
                                >
                                  {icons[s.key](isAc ? colors.accent : "rgba(255,255,255,0.7)", 16)}
                                </div>
                                <p className="text-[15px] font-bold text-white font-['Inter',sans-serif] m-0">
                                  {s.short}
                                </p>
                              </div>
                              <p className="text-[13px] text-white/40 leading-normal flex-1 overflow-hidden font-['Inter',sans-serif] m-0">
                                {connInfo.mech}
                              </p>
                              <p className="text-sm font-bold text-[#B8D935] font-['Inter',sans-serif] mt-3 mb-0 mx-0">
                                {connInfo.met}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      {(mb || ring.items.length > 3) && (
                        <div className="flex justify-center gap-1.5 mt-3">
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
                                className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
                                style={{
                                  width: scrollPage === idx ? "24px" : "8px",
                                  backgroundColor: scrollPage === idx ? colors.accent : "rgba(255,255,255,0.2)",
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
    className={cn(
      "inline-flex items-center gap-2 px-5 py-2.5 rounded-[50px] text-[11px] font-bold tracking-[2px] font-['Inter',sans-serif] uppercase mb-6",
      dark ? "border border-white/25 text-white" : "border border-[#DEDEDE] text-[#1B4D3E]"
    )}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-[#B8D935] inline-block" />
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
    <section className={cn("bg-white", mb ? "px-5 pt-[60px] pb-12" : "px-20 pt-20 pb-[60px]")}>
      <div className="max-w-[1200px] mx-auto">
        <Pill dark={false}>Analysis</Pill>
        <h1
          className={cn(
            "font-['Inter',sans-serif] font-light leading-[1.1] text-[#1B4D3E] tracking-[-1px] max-w-[800px] mb-6 mt-0",
            mb ? "text-4xl" : "text-[56px]"
          )}
        >
          <span className="font-bold">Twelve Integrated Sectors</span>
          <br />
          One Unified <span className="font-bold text-[#B8D935]">Approach</span>
        </h1>
        <p
          className={cn(
            "leading-[1.7] text-[#666] font-['Inter',sans-serif] max-w-[600px] mb-12 mt-0",
            mb ? "text-[15px]" : "text-[17px]"
          )}
        >
          {
            "A trader\u2019s success depends on credit, market infrastructure, cold storage, and supply chains working together. BRIDGE aligns the systems, institutions, and resources that make that possible"
          }
        </p>
        <div
          className={cn(
            "grid border-t border-b border-[#DEDEDE] py-7",
            mb ? "grid-cols-2 gap-y-6 gap-x-0" : "grid-cols-4 gap-0"
          )}
        >
          {st.map((s, i) => (
            <div
              key={i}
              className={cn(
                "text-center",
                !mb && i < 3 && "border-r border-[#DEDEDE]",
                mb && i < 2 && "border-b border-[#DEDEDE] pb-6"
              )}
            >
              <p
                className={cn(
                  "font-bold text-[#1B4D3E] font-['Inter',sans-serif] mb-1 mt-0",
                  mb ? "text-[26px]" : "text-4xl"
                )}
              >
                {s.v}
              </p>
              <p
                className={cn(
                  "font-semibold text-[#999] font-['Inter',sans-serif] uppercase tracking-[1px] m-0",
                  mb ? "text-[10px]" : "text-xs"
                )}
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
      className={cn(
        "value-card flex flex-col cursor-pointer h-full box-border bg-white",
        mb ? "rounded-2xl p-5 gap-3" : "rounded-[20px] p-7 gap-4",
        hov
          ? "border border-[#B8D935] shadow-[0_16px_40px_rgba(27,77,62,0.1)]"
          : "border border-[#DEDEDE] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
      )}
      onMouseEnter={onE}
      onMouseLeave={onL}
      onClick={() => navigate(href)}
    >
      <div className="flex justify-between items-start">
        <div
          className={cn(
            "flex items-center justify-center transition-colors duration-300 ease-in-out",
            mb ? "w-10 h-10 rounded-xl" : "w-12 h-12 rounded-[14px]",
            hov ? "bg-[#1B4D3E]" : "bg-[#F3F5F2]"
          )}
        >
          {Icon(hov ? colors.accent : colors.primary, mb ? 18 : 20)}
        </div>
        <span className="text-xs font-bold text-[#ccc] font-['Inter',sans-serif]">
          {String(s.id).padStart(2, "0")}
        </span>
      </div>
      <h3
        className={cn(
          "font-['Inter',sans-serif] font-bold text-[#1B4D3E] leading-[1.3] m-0",
          mb ? "text-[15px]" : "text-base"
        )}
      >
        {s.name}
      </h3>
      <p
        className={cn(
          "font-['Inter',sans-serif] text-[#666] leading-[1.6] flex-1 m-0",
          mb ? "text-[13px]" : "text-[13.5px]"
        )}
      >
        {s.problem}
      </p>
      <div
        className={cn(
          "bg-[#F3F5F2] flex justify-between items-center",
          mb ? "rounded-[10px] px-3.5 py-2.5" : "rounded-xl px-4 py-3"
        )}
      >
        <div>
          <p
            className={cn(
              "font-bold text-[#1B4D3E] font-['Inter',sans-serif] mb-0.5 mt-0",
              mb ? "text-lg" : "text-xl"
            )}
          >
            {s.metric}
          </p>
          <p className="text-[10px] font-semibold text-[#999] font-['Inter',sans-serif] uppercase tracking-[0.5px] m-0">
            {s.mLabel}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-[#B8D935] font-['Inter',sans-serif] mb-0.5 mt-0">
            {s.cap}
          </p>
          <p className="text-[10px] font-semibold text-[#999] font-['Inter',sans-serif] uppercase tracking-[0.5px] m-0">
            {s.vent} Ventures
          </p>
        </div>
      </div>
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[50px] self-start",
          hov ? "bg-[rgba(184,217,53,0.12)]" : "bg-[rgba(27,77,62,0.04)]"
        )}
      >
        <span
          className={cn(
            "w-[5px] h-[5px] rounded-full",
            hov ? "bg-[#B8D935]" : "bg-[#1B4D3E]"
          )}
        />
        <span
          className={cn(
            "text-[11px] font-semibold font-['Inter',sans-serif]",
            hov ? "text-[#5C7A1F]" : "text-[#888]"
          )}
        >
          {s.tag}
        </span>
      </div>
      <a
        href={href}
        onClick={(e) => { e.preventDefault(); navigate(href); }}
        className="flex items-center justify-between no-underline pt-2 border-t border-[#DEDEDE]"
      >
        <span className="text-[13px] font-semibold text-[#1B4D3E] font-['Inter',sans-serif]">
          Explore Full Analysis
        </span>
        <span
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out",
            hov ? "bg-[#B8D935]" : "bg-[#F3F5F2]"
          )}
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
    <section className={cn("bg-[#F3F5F2]", mb ? "px-5 pt-[60px] pb-20" : "px-20 py-[100px]")}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <Pill dark={false}>12 Integrated Sectors</Pill>
          <h2
            className={cn(
              "font-['Inter',sans-serif] font-light text-[#1B4D3E] tracking-[-0.5px] leading-[1.15] mb-4 mt-0",
              mb ? "text-[32px]" : "text-[42px]"
            )}
          >
            Comprehensive <span className="font-bold">Analysis</span>
            {" \u00B7 "}Targeted <span className="font-bold text-[#B8D935]">Solutions</span>
          </h2>
          <p
            className={cn(
              "leading-[1.7] text-[#666] font-['Inter',sans-serif] mx-auto m-0",
              mb ? "text-sm max-w-full" : "text-base max-w-[560px]"
            )}
          >
            {mb
              ? "Each sector maps the full ecosystem to identify where alignment creates the greatest impact"
              : "Each sector maps the full ecosystem \u2014 stakeholders, systems, capital flows, and integration pathways \u2014 to identify where alignment creates the greatest impact"}
          </p>
        </div>
        <div
          className={cn(
            "cs-scroll flex flex-nowrap mb-12",
            mb
              ? "gap-2 justify-start overflow-x-auto pb-1"
              : "gap-3 justify-center overflow-visible pb-0"
          )}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {cats.map((c) => {
            const on = ac === c.id;
            return (
              <button
                key={c.id}
                onClick={() => switchCat(c.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-[50px] cursor-pointer font-semibold font-['Inter',sans-serif] transition-all duration-[250ms] ease-in-out whitespace-nowrap shrink-0",
                  mb ? "px-4 py-2.5 text-xs" : "px-6 py-3 text-[13px]",
                  on
                    ? "border-2 border-[#1B4D3E] bg-[#1B4D3E] text-white shadow-[0_4px_12px_rgba(27,77,62,0.15)]"
                    : "border-[1.5px] border-[#DEDEDE] bg-white text-[#1B4D3E] shadow-none"
                )}
              >
                {c.label}
                <span
                  className={cn(
                    "text-[11px] font-bold px-2 py-0.5 rounded-[50px]",
                    on
                      ? "bg-[rgba(184,217,53,0.25)] text-[#B8D935]"
                      : "bg-[#F3F5F2] text-[#999]"
                  )}
                >
                  {c.n}
                </span>
              </button>
            );
          })}
        </div>
        {cd && (
          <p className="text-center text-sm text-[#888] font-['Inter',sans-serif] italic max-w-[400px] mx-auto -mt-6 mb-10">
            {cd.desc}
          </p>
        )}
        <div
          ref={ref}
          onScroll={onScroll}
          className={cn(
            "sector-scroll-track flex overflow-x-auto overflow-y-visible snap-x snap-mandatory pt-2 pb-4 -mt-2 [scrollbar-width:none] [-ms-overflow-style:none]",
            mb ? "gap-4" : "gap-6"
          )}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {fl.map((s) => (
            <div
              key={s.id}
              className="snap-start"
              style={{ flex: mb ? "0 0 80%" : "0 0 calc((100% - 48px) / 3)" }}
            >
              <SectorCard s={s} hov={hov === s.id} onE={() => setHov(s.id)} onL={() => setHov(null)} />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5 justify-center mt-4">
          {fl.map((_, i) => (
            <span
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded cursor-pointer transition-all duration-300 ease-in-out",
                idx === i ? "w-6 bg-[#B8D935]" : "w-2 bg-[#DEDEDE]"
              )}
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
    <section className={cn("bg-[#1B4D3E]", mb ? "px-5 pt-4 pb-14" : "px-20 pt-[19px] pb-[67px]")}>
      <div className="max-w-[900px] mx-auto text-center">
        <div
          className={cn(
            "flex justify-center",
            mb ? "gap-3 flex-col items-stretch" : "gap-4 flex-row items-center"
          )}
        >
          <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }} className="no-underline">
            <button
              className={cn(
                "bg-[#B8D935] text-[#1B4D3E] border-none font-semibold font-['Inter',sans-serif] cursor-pointer rounded-[50px] flex items-center justify-center gap-2.5",
                mb ? "px-6 py-3.5 text-sm w-full" : "px-7 py-4 text-[15px] w-auto"
              )}
            >
              Request Full Access
              <span className="cta-btn-arrow w-8 h-8 bg-[#1B4D3E] rounded-full flex items-center justify-center">
                <Arr s={12} c={colors.white} />
              </span>
            </button>
          </a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} className="no-underline">
            <button
              className={cn(
                "bg-transparent text-white border-2 border-white/30 font-semibold font-['Inter',sans-serif] cursor-pointer rounded-[50px]",
                mb ? "px-6 py-3.5 text-sm w-full" : "px-7 py-4 text-[15px] w-auto"
              )}
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
    <Layout>
    <div className="font-['Inter',sans-serif] bg-white min-h-screen">

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
      <HeroSection />
      <SectorGrid />
      <CrossSector />
      <CTA />
    </div>
    </Layout>
  );
}
