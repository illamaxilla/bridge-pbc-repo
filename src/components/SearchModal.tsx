import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useScrollLock } from "@/hooks/useScrollLock";

// ── Design tokens ────────────────────────────────────────────────────────────
const C = {
  primary:    "#1B4D3E",
  accent:     "#B8D935",
  accentText: "#5C7A1F",
  accentLight:"#E8F5E0",
  bg:         "#F3F5F2",
  white:      "#FFFFFF",
  dark:       "#191919",
  line:       "#DEDEDE",
  muted:      "#8A9E98",
  ctaGreen:   "#2E5A4D",
  overlay:    "rgba(13,26,16,0.87)",
};

const SEARCH_STYLES = `
  .bridge-input::placeholder { color: rgba(255,255,255,0.35); font-family:'Inter',sans-serif; }
  .bridge-scroll::-webkit-scrollbar { width: 3px; }
  .bridge-scroll::-webkit-scrollbar-thumb { background: #DEDEDE; border-radius: 2px; }
  .bridge-row-btn:focus-visible { outline: 2px solid #B8D935; outline-offset: -2px; }
  @keyframes bridgeOverlay    { from{opacity:0}                              to{opacity:1} }
  @keyframes bridgeDrop       { from{transform:translateY(-24px);opacity:0}  to{transform:translateY(0);opacity:1} }
  @keyframes bridgeSheetUp    { from{transform:translateY(100%)}             to{transform:translateY(0)} }
  @keyframes bridgeSlideDetail{ from{transform:translateX(24px);opacity:0}   to{transform:translateX(0);opacity:1} }
  @keyframes bridgeRowIn      { from{opacity:0;transform:translateY(5px)}    to{opacity:1;transform:translateY(0)} }
  @keyframes bridgePulse      { 0%,100%{opacity:1;transform:scale(1)} 60%{opacity:0.4;transform:scale(0.65)} }
`;

// ── SVG Icons ────────────────────────────────────────────────────────────────
const Ico = {
  search:   (color=C.muted, size=20) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  close:    (color=C.muted, size=16) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  arrow:    (color=C.white, size=14) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>,
  arrowRight:(color=C.primary,size=14)=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  chevron:  (color=C.muted, size=14) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>,
  back:     (color=C.muted, size=14) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>,
  file:     (color=C.muted, size=15) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  book:     (color=C.muted, size=15) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  globe:    (color=C.muted, size=15) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  infrastructure: (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/></svg>,
  finance:        (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  health:         (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>,
  technology:     (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/></svg>,
  education:      (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>,
  agriculture:    (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>,
  creative:       (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  housing:        (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  tourism:        (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/><path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"/><path d="M10 20h4"/><circle cx="16" cy="20" r="2"/><circle cx="8" cy="20" r="2"/></svg>,
  energy:         (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"/><path d="m11 7-3 5h4l-3 5"/><line x1="22" x2="22" y1="11" y2="13"/></svg>,
  manufacturing:  (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1M12 18h1M7 18h1"/></svg>,
  transport:      (c=C.primary,s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>,
} as Record<string, (color?: string, size?: number) => JSX.Element>;

// ── Content data ─────────────────────────────────────────────────────────────
interface Sector {
  id: string; key: string; label: string; fullTitle: string; subtitle: string;
  score: number; tier: string; dimScores: number[]; kw: string[];
  route: string;
}

interface Doc {
  id: string; type: string; title: string; subtitle: string;
  date?: string; kw: string[]; route: string;
}

const SECTORS: Sector[] = [
  { id:"s01", key:"infrastructure", label:"Infrastructure",        fullTitle:"Infrastructure & Basic Services",   subtitle:"Roads, utilities, WASH, digital backbone",        score:78, tier:"Core",     dimScores:[83,79,74,72], kw:["roads","water","utilities","sanitation","WASH","bridges"], route:"/sectors/infrastructure" },
  { id:"s02", key:"finance",        label:"Financial Inclusion",   fullTitle:"Financial Inclusion",               subtitle:"SME lending, mobile money, insurance",            score:85, tier:"Core",     dimScores:[90,85,82,79], kw:["SME","lending","mobile money","fintech","insurance","credit"], route:"/sectors/financial" },
  { id:"s03", key:"health",         label:"Health Systems",        fullTitle:"Health Systems & Wellbeing",        subtitle:"Primary care, supply chain, diagnostics",         score:74, tier:"Core",     dimScores:[76,80,70,66], kw:["healthcare","hospitals","diagnostics","medicine","NHIS"], route:"/sectors/health" },
  { id:"s04", key:"technology",     label:"Technology",            fullTitle:"Technology & Innovation",           subtitle:"Digital transformation, startups, AI",            score:80, tier:"Core",     dimScores:[88,78,77,71], kw:["tech","digital","AI","startups","software","fintech"], route:"/sectors/technology" },
  { id:"s05", key:"education",      label:"Education & Skills",    fullTitle:"Education & Skills",                subtitle:"K\u201312, TVET, workforce readiness",            score:72, tier:"Emerging", dimScores:[74,80,68,62], kw:["schools","TVET","university","skills","training","literacy"], route:"/sectors/education" },
  { id:"s06", key:"agriculture",    label:"Agriculture",           fullTitle:"Agriculture & Value Chains",        subtitle:"Smallholder systems, processing, export",         score:88, tier:"Core",     dimScores:[92,89,85,82], kw:["farming","cocoa","food","export","agribusiness","smallholder"], route:"/sectors/agriculture" },
  { id:"s07", key:"creative",       label:"Sports & Creative",     fullTitle:"Sports, Entertainment & Creative",  subtitle:"Music, film, sports economy",                     score:65, tier:"Emerging", dimScores:[72,68,60,55], kw:["music","film","sports","arts","creative","Afrobeats"], route:"/sectors/sports" },
  { id:"s08", key:"housing",        label:"Housing & Real Estate", fullTitle:"Housing & Real Estate",             subtitle:"Affordable housing, land tenure, PropTech",       score:77, tier:"Core",     dimScores:[82,76,74,70], kw:["housing","real estate","land","mortgage","affordable"], route:"/sectors/housing" },
  { id:"s09", key:"tourism",        label:"Tourism & Hospitality", fullTitle:"Tourism & Hospitality",             subtitle:"Diaspora, heritage, eco-tourism",                 score:70, tier:"Emerging", dimScores:[76,73,66,61], kw:["tourism","hospitality","heritage","diaspora","Year of Return"], route:"/sectors/tourism" },
  { id:"s10", key:"energy",         label:"Energy & Renewables",   fullTitle:"Energy & Renewable Resources",      subtitle:"Solar, grid reliability, green finance",          score:82, tier:"Core",     dimScores:[88,84,78,72], kw:["solar","energy","renewables","grid","electricity","power"], route:"/sectors/energy" },
  { id:"s11", key:"manufacturing",  label:"Manufacturing",         fullTitle:"Manufacturing & Light Industry",    subtitle:"Agro-processing, garments, packaging",            score:68, tier:"Emerging", dimScores:[72,70,65,59], kw:["manufacturing","factory","garments","agro-processing"], route:"/sectors/manufacturing" },
  { id:"s12", key:"transport",      label:"Transportation",        fullTitle:"Transportation & Logistics",        subtitle:"Ports, freight, last-mile delivery",              score:73, tier:"Core",     dimScores:[76,75,71,66], kw:["transport","logistics","ports","freight","last-mile"], route:"/sectors/transport" },
];

const DOCS: Doc[] = [
  { id:"r01", type:"report",  title:"Ghana 2026 Budget: Strategic Alignment",             subtitle:"Capital deployment opportunities across all 12 sectors",      date:"Jan 2026", kw:["budget","2026","capital","fiscal","GHS"], route:"/resources/budget-alignment" },
  { id:"r02", type:"report",  title:"Ejura Agricultural Hub: Business Plan",              subtitle:"Full feasibility and investment structure for Ejura corridor", date:"Dec 2025", kw:["Ejura","agriculture","investment","feasibility"], route:"/resources/sector-briefs" },
  { id:"r03", type:"report",  title:"Agricultural Crisis: Strategic Positioning",         subtitle:"Cocoa, climate, and the path to resilience",                  date:"Nov 2025", kw:["cocoa","climate","crisis","agriculture","resilience"], route:"/resources/sector-briefs" },
  { id:"r04", type:"report",  title:"BRIDGE Impact Score Methodology",                    subtitle:"How we assess 174+ ventures across 12 sectors",               date:"Oct 2025", kw:["impact score","methodology","ventures","assessment"], route:"/resources/impact-score" },
  { id:"r05", type:"report",  title:"SME Lending Opportunity",                            subtitle:"$4\u20136B market alignment across Ghana credit landscape",   date:"Sep 2025", kw:["SME","lending","credit","financial","mobile money"], route:"/resources/sector-briefs" },
  { id:"i01", type:"insight", title:"Why Kejetia Digitization Changes Everything",        subtitle:"Inside West Africa\u2019s largest market platform",           date:"Feb 2026", kw:["Kejetia","digitization","market","Kumasi","vendors"], route:"/insights" },
  { id:"i02", type:"insight", title:"The Ghanaian Diaspora as Investment Infrastructure", subtitle:"Remittances, networks, and strategic capital flows",          date:"Jan 2026", kw:["diaspora","remittance","investment"], route:"/insights" },
  { id:"i03", type:"insight", title:"Solar Access and the 40% Energy Gap",                subtitle:"Mapping the household energy opportunity in Ghana",           date:"Dec 2025", kw:["solar","energy","electricity","households","rural"], route:"/insights" },
  { id:"p01", type:"page",    title:"About BRIDGE PBC",                                   subtitle:"Mission, vision, and the team behind the work",              kw:["about","mission","vision","team"], route:"/about" },
  { id:"p02", type:"page",    title:"How We Work",                                        subtitle:"The BRIDGE methodology and engagement model",                kw:["methodology","process","engagement"], route:"/methodology" },
  { id:"p03", type:"page",    title:"All 12 Sectors",                                     subtitle:"Explore every sector in the BRIDGE portfolio",               kw:["sectors","portfolio","overview"], route:"/sectors" },
  { id:"p04", type:"page",    title:"Resources & Downloads",                              subtitle:"Reports, templates, and research tools",                     kw:["resources","downloads","reports"], route:"/resources" },
];

const TRENDING_RICH = [
  { q: "Kejetia Market", context: "Technology \u00b7 Digitization" },
  { q: "SME Lending",    context: "Financial Inclusion \u00b7 Credit" },
  { q: "Solar Energy",   context: "Energy & Renewables \u00b7 Access" },
];
const RECENT = ["Financial Inclusion", "BRIDGE Impact Score", "Ejura Hub"];

const QUICK_ACCESS = [
  { label: "FAQ",        route: "/faq" },
  { label: "Community",  route: "/community" },
  { label: "Membership", route: "/membership" },
  { label: "Dashboard",  route: "/intelligence/dashboard" },
];

// ── Search engine ────────────────────────────────────────────────────────────
function searchAll(q: string) {
  if (!q.trim()) return { sectors: [] as Sector[], docs: [] as Doc[] };
  const query = q.toLowerCase();
  const ss = (s: Sector) => { const t=s.fullTitle.toLowerCase(); const kw=s.kw.some(k=>k.toLowerCase().includes(query)); return (t===query?6:0)+(t.includes(query)?3:0)+(s.label.toLowerCase().includes(query)?2:0)+(s.subtitle.toLowerCase().includes(query)?1:0)+(kw?2:0); };
  const sd = (d: Doc) => { const t=d.title.toLowerCase(); const kw=d.kw.some(k=>k.toLowerCase().includes(query)); return (t===query?6:0)+(t.includes(query)?3:0)+(d.subtitle.toLowerCase().includes(query)?1:0)+(kw?2:0); };
  return {
    sectors: SECTORS.map(s=>({item:s,score:ss(s)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,4).map(x=>x.item),
    docs:    DOCS.map(d=>({item:d,score:sd(d)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,5).map(x=>x.item),
  };
}

// ── Logo Mark ────────────────────────────────────────────────────────────────
const LogoMark = ({ size=36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 924 932" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect fill="none" stroke={C.primary} strokeWidth="80" x="40" y="40" width="843.91" height="852.3" rx="36.55"/>
    <polygon fill={C.accent} stroke={C.primary} strokeMiterlimit="10" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"/>
    <path fill={C.primary} d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"/>
    <path fill={C.accent} d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"/>
  </svg>
);

// ── Animated Score Ring ──────────────────────────────────────────────────────
const AnimatedScoreRing = ({ score, size=38 }: { score: number; size?: number }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const t = setTimeout(() => setProgress(score), 100); return () => clearTimeout(t); }, [score]);
  const r = (size-6)/2, circ = 2*Math.PI*r;
  return (
    <svg width={size} height={size} style={{transform:"rotate(-90deg)",flexShrink:0}} aria-hidden="true">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.line} strokeWidth="3"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.accent} strokeWidth="3" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ-(progress/100)*circ}
        style={{transition:"stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)"}}/>
    </svg>
  );
};

// ── Animated Bar ─────────────────────────────────────────────────────────────
const AnimatedBar = ({ pct, delay=0 }: { pct: number; delay?: number }) => {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), delay); return () => clearTimeout(t); }, [pct, delay]);
  return (
    <div style={{ flex:1, height:"3px", background:C.line, borderRadius:"2px", overflow:"hidden" }}>
      <div style={{ height:"100%", width:w+"%", background:C.accent, borderRadius:"2px", transition:"width 0.9s cubic-bezier(0.4,0,0.2,1)" }}/>
    </div>
  );
};

// ── Micro-components ─────────────────────────────────────────────────────────
const TierBadge = ({ tier }: { tier: string }) => (
  <span style={{
    fontFamily:"Inter,sans-serif", fontSize:"9px", fontWeight:"700", letterSpacing:"1.5px",
    textTransform:"uppercase", flexShrink:0,
    color: tier==="Core" ? C.accentText : C.muted,
    background: tier==="Core" ? C.accentLight : "#F0F0F0",
    padding:"2px 8px", borderRadius:"50px",
  }}>{tier==="Core" ? "Core Tier" : "Emerging"}</span>
);

const DocTypeIcon = ({ type }: { type: string }) => {
  if (type==="report")  return Ico.file(C.muted, 15);
  if (type==="insight") return Ico.book(C.muted, 15);
  return Ico.globe(C.muted, 15);
};

const GroupLabel = ({ children, border }: { children: React.ReactNode; border: boolean }) => (
  <div style={{
    padding:"10px 20px 5px 17px",
    borderTop: border ? "1px solid "+C.line : "none",
    borderLeft: "3px solid "+C.accent,
    fontFamily:"Inter,sans-serif", fontSize:"10px", fontWeight:"700",
    letterSpacing:"2px", textTransform:"uppercase", color:C.muted,
  }}>{children}</div>
);

const BackButton = ({ onClick }: { onClick: () => void }) => {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      aria-label="Back to results"
      style={{
        display:"flex", alignItems:"center", gap:"6px", padding:"8px 14px",
        border:"1.5px solid "+(hov?C.primary:C.line), borderRadius:"50px",
        background:"transparent", cursor:"pointer",
        fontFamily:"Inter,sans-serif", fontSize:"12px", fontWeight:"500",
        color: hov ? C.primary : C.muted, transition:"all 0.15s",
      }}>
      {Ico.back(hov ? C.primary : C.muted, 12)} Back
    </button>
  );
};

// ── Sector cell ──────────────────────────────────────────────────────────────
const SectorCell = ({ s, setQuery }: { s: Sector; setQuery: (q: string) => void }) => {
  const [hov, setHov] = useState(false);
  const iconFn = Ico[s.key];
  return (
    <button
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onClick={()=>setQuery(s.label)}
      style={{
        display:"flex", alignItems:"center", gap:"10px",
        padding:"10px 14px", border:"none", textAlign:"left",
        cursor:"pointer",
        background: hov ? C.accentLight : C.white,
        transition:"background 0.15s ease",
      }}>
      <div style={{
        width:"28px", height:"28px", borderRadius:"50%", flexShrink:0,
        background: hov ? C.primary : C.bg,
        display:"flex", alignItems:"center", justifyContent:"center",
        transition:"background 0.2s ease",
      }}>
        {iconFn ? iconFn(hov ? C.accent : C.primary, 13) : null}
      </div>
      <div style={{ minWidth:0 }}>
        <div style={{ fontFamily:"Inter,sans-serif", fontSize:"11px", fontWeight:"600", color: hov ? C.primary : C.dark, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", transition:"color 0.15s" }}>{s.label}</div>
        <div style={{ fontFamily:"Inter,sans-serif", fontSize:"9px", color:C.muted, marginTop:"1px" }}>Score {s.score}</div>
      </div>
    </button>
  );
};

// ── Sector row ───────────────────────────────────────────────────────────────
const SectorRow = ({ item, active, onHover, onClick, isMobile, idx }: { item: Sector; active: boolean; onHover: () => void; onClick: () => void; isMobile: boolean; idx: number }) => {
  const iconFn = Ico[item.key];
  return (
    <button className="bridge-row-btn" onMouseEnter={onHover} onClick={onClick}
      style={{
        display:"flex", alignItems:"center", gap:"12px",
        width:"100%", padding: isMobile ? "13px 20px" : "11px 20px",
        border:"none", cursor:"pointer", textAlign:"left",
        background: active ? C.accentLight : "transparent",
        borderLeft:"3px solid "+(active ? C.accent : "transparent"),
        transition:"background 0.15s ease",
        animation:`bridgeRowIn 0.25s ease ${idx*40}ms both`,
      }}>
      <div style={{ width: isMobile?"38px":"40px", height: isMobile?"38px":"40px", borderRadius:"50%", flexShrink:0, background: active?C.primary:C.bg, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s ease" }}>
        {iconFn ? iconFn(active?C.accent:C.primary, isMobile?17:18) : null}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"2px", flexWrap:"wrap" }}>
          <span style={{ fontFamily:"Inter,sans-serif", fontSize: isMobile?"13px":"14px", fontWeight:"600", color: active?C.primary:C.dark }}>{item.fullTitle}</span>
          {!isMobile && <TierBadge tier={item.tier}/>}
        </div>
        <div style={{ fontFamily:"Inter,sans-serif", fontSize:"11px", color:C.muted, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.subtitle}</div>
        {isMobile && <div style={{ marginTop:"4px" }}><TierBadge tier={item.tier}/></div>}
      </div>
      {!isMobile ? (
        <div style={{ position:"relative", flexShrink:0 }}>
          <AnimatedScoreRing score={item.score} size={36}/>
          <span style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontFamily:"Inter,sans-serif", fontSize:"9px", fontWeight:"700", color:C.accentText }}>{item.score}</span>
        </div>
      ) : (
        <span style={{ fontFamily:"Inter,sans-serif", fontSize:"12px", fontWeight:"700", color:C.accentText, flexShrink:0 }}>{item.score}</span>
      )}
      {Ico.chevron(active?C.primary:C.line, 14)}
    </button>
  );
};

// ── Doc row ──────────────────────────────────────────────────────────────────
const DocRow = ({ item, active, onHover, onClick, isMobile, idx }: { item: Doc; active: boolean; onHover: () => void; onClick: () => void; isMobile: boolean; idx: number }) => (
  <button className="bridge-row-btn" onMouseEnter={onHover} onClick={onClick}
    style={{
      display:"flex", alignItems:"center", gap:"12px",
      width:"100%", padding: isMobile?"12px 20px":"10px 20px",
      border:"none", cursor:"pointer", textAlign:"left",
      background: active ? C.accentLight : "transparent",
      borderLeft:"3px solid "+(active ? C.accent : "transparent"),
      transition:"background 0.15s ease",
      animation:`bridgeRowIn 0.25s ease ${idx*40}ms both`,
    }}>
    <div style={{ flexShrink:0, marginTop:"1px" }}><DocTypeIcon type={item.type}/></div>
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ fontFamily:"Inter,sans-serif", fontSize:"13px", fontWeight:"600", color: active?C.primary:C.dark, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.title}</div>
      <div style={{ fontFamily:"Inter,sans-serif", fontSize:"11px", color:C.muted, marginTop:"2px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.subtitle}</div>
    </div>
    {item.date && !isMobile && <span style={{ fontFamily:"Inter,sans-serif", fontSize:"10px", color:C.muted, flexShrink:0 }}>{item.date}</span>}
    {Ico.chevron(active?C.primary:C.line, 13)}
  </button>
);

// ── Results panel ────────────────────────────────────────────────────────────
const ResultsPanel = ({ results, active, setActive, onSelect, query, isMobile }: {
  results: { sectors: Sector[]; docs: Doc[] };
  active: number; setActive: (n: number) => void;
  onSelect: (item: Sector | Doc, kind: string) => void;
  query: string; isMobile: boolean;
}) => {
  const total = results.sectors.length + results.docs.length;

  if (total === 0) return (
    <div style={{ padding:"56px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", opacity:0.04, pointerEvents:"none" }}>
        <LogoMark size={160}/>
      </div>
      <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
        {Ico.search(C.muted, 18)}
      </div>
      <div style={{ fontFamily:"Inter,sans-serif", fontSize:"16px", fontWeight:"700", color:C.dark, marginBottom:"8px" }}>
        No results for &ldquo;{query}&rdquo;
      </div>
      <div style={{ fontFamily:"Inter,sans-serif", fontSize:"13px", color:C.muted, lineHeight:1.65 }}>
        Try a sector name or keyword like{" "}
        <span style={{ color:C.accentText, fontWeight:"600" }}>&ldquo;solar&rdquo;</span>{" "}or{" "}
        <span style={{ color:C.accentText, fontWeight:"600" }}>&ldquo;SME&rdquo;</span>
      </div>
    </div>
  );

  const reportItems  = results.docs.filter(d=>d.type==="report");
  const insightItems = results.docs.filter(d=>d.type==="insight");
  const pageItems    = results.docs.filter(d=>d.type==="page");
  let idx = results.sectors.length;

  return (
    <div>
      {results.sectors.length > 0 && (
        <>
          <GroupLabel border={false}>Sectors</GroupLabel>
          {results.sectors.map((item,i) => (
            <SectorRow key={item.id} item={item} active={active===i} onHover={()=>setActive(i)} onClick={()=>onSelect(item,"sector")} isMobile={isMobile} idx={i}/>
          ))}
        </>
      )}
      {[{items:reportItems,label:"Reports & Briefs"},{items:insightItems,label:"Insights"},{items:pageItems,label:"Site Pages"}].map(({items,label}) => {
        if (!items.length) return null;
        const startIdx=idx; idx+=items.length;
        return (
          <div key={label}>
            <GroupLabel border={true}>{label}</GroupLabel>
            {items.map((item,i) => (
              <DocRow key={item.id} item={item} active={active===startIdx+i} onHover={()=>setActive(startIdx+i)} onClick={()=>onSelect(item,"doc")} isMobile={isMobile} idx={startIdx+i}/>
            ))}
          </div>
        );
      })}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 20px", borderTop:"1px solid "+C.line, background:C.bg }}>
        <span style={{ fontFamily:"Inter,sans-serif", fontSize:"11px", color:C.muted }}>
          <strong style={{color:C.dark,fontWeight:"600"}}>{total}</strong> result{total!==1?"s":""} &mdash; &ldquo;<span style={{color:C.dark}}>{query}</span>&rdquo;
        </span>
      </div>
    </div>
  );
};

// ── Discovery state ──────────────────────────────────────────────────────────
const DiscoveryState = ({ setQuery, onNavigate, isMobile }: { setQuery: (q: string) => void; onNavigate: (route: string) => void; isMobile: boolean }) => (
  <div style={{ display:"flex", flexDirection:"column" }}>
    {/* Recent + Trending */}
    <div style={{
      display: isMobile ? "flex" : "grid",
      flexDirection: isMobile ? "column" : undefined,
      gridTemplateColumns: isMobile ? undefined : "1fr 1fr",
      borderBottom:"1px solid "+C.line,
    }}>
      <div style={{ padding:"16px 0 12px", borderRight: isMobile?"none":"1px solid "+C.line }}>
        <div style={{ padding:"0 20px 8px 17px", borderLeft:"3px solid "+C.accent, fontFamily:"Inter,sans-serif", fontSize:"10px", fontWeight:"700", letterSpacing:"2px", textTransform:"uppercase", color:C.muted }}>Recent</div>
        {RECENT.map((q,i) => (
          <button key={i} onClick={()=>setQuery(q)} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", padding:"9px 20px", border:"none", background:"transparent", textAlign:"left", cursor:"pointer", transition:"background 0.12s" }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=C.bg;}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";}}>
            <span style={{ fontFamily:"Inter,sans-serif", fontSize:"13px", fontWeight:"500", color:C.dark }}>{q}</span>
            <span style={{ fontFamily:"Inter,sans-serif", fontSize:"11px", color:C.line }}>&crarr;</span>
          </button>
        ))}
      </div>
      <div style={{ padding:"16px 0 12px", borderTop: isMobile?"1px solid "+C.line:"none" }}>
        <div style={{ padding:"0 20px 8px 17px", borderLeft:"3px solid "+C.accent, fontFamily:"Inter,sans-serif", fontSize:"10px", fontWeight:"700", letterSpacing:"2px", textTransform:"uppercase", color:C.muted }}>Trending</div>
        {TRENDING_RICH.map(({q,context},i) => (
          <button key={i} onClick={()=>setQuery(q)} style={{ display:"flex", alignItems:"center", gap:"10px", width:"100%", padding:"9px 20px", border:"none", background:"transparent", textAlign:"left", cursor:"pointer", transition:"background 0.12s" }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=C.bg;}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";}}>
            <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:C.accent, flexShrink:0, animation:"bridgePulse 2.8s ease infinite", animationDelay: i*0.4+"s" }}/>
            <div style={{ minWidth:0 }}>
              <div style={{ fontFamily:"Inter,sans-serif", fontSize:"13px", fontWeight:"500", color:C.dark }}>{q}</div>
              <div style={{ fontFamily:"Inter,sans-serif", fontSize:"10px", color:C.muted, marginTop:"1px" }}>{context}</div>
            </div>
          </button>
        ))}
      </div>
    </div>

    {/* Sector grid */}
    <div style={{ padding:"14px 20px 18px" }}>
      <div style={{ padding:"0 0 10px 17px", borderLeft:"3px solid "+C.accent, fontFamily:"Inter,sans-serif", fontSize:"10px", fontWeight:"700", letterSpacing:"2px", textTransform:"uppercase", color:C.muted }}>All Sectors</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:C.line, borderRadius:"12px", overflow:"hidden", border:"1px solid "+C.line }}>
        {SECTORS.map((s) => <SectorCell key={s.id} s={s} setQuery={setQuery}/>)}
      </div>
    </div>

    {/* Jump To */}
    <div style={{ background:C.primary, padding:"14px 20px 18px" }}>
      <div style={{ fontFamily:"Inter,sans-serif", fontSize:"10px", fontWeight:"700", letterSpacing:"2px", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", marginBottom:"10px" }}>Jump To</div>
      <div style={{ display:"flex", alignItems:"center", flexWrap:"nowrap" }}>
        {QUICK_ACCESS.map(({label,route},i) => (
          <span key={i} style={{ display:"inline-flex", alignItems:"center" }}>
            <button onClick={()=>onNavigate(route)} style={{ background:"none", border:"none", padding:"2px 0", cursor:"pointer", fontFamily:"Inter,sans-serif", fontSize:"13px", fontWeight:"500", color:"rgba(255,255,255,0.7)", transition:"color 0.15s", whiteSpace:"nowrap" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color=C.accent;}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.7)";}}>
              {label}
            </button>
            {i < QUICK_ACCESS.length-1 && (
              <span style={{ color:"rgba(255,255,255,0.2)", margin:"0 14px", fontSize:"12px", userSelect:"none" }}>&middot;</span>
            )}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ── Detail panel ─────────────────────────────────────────────────────────────
const DetailPanel = ({ item, kind, onBack, onNavigate, isMobile }: {
  item: Sector | Doc; kind: string; onBack: () => void; onNavigate: (route: string) => void; isMobile: boolean;
}) => {
  const isSector = kind==="sector";
  const sector = isSector ? item as Sector : null;
  const doc = !isSector ? item as Doc : null;
  const iconFn = sector ? Ico[sector.key] : null;
  const sectorNum = sector ? String(SECTORS.indexOf(sector)+1).padStart(2,"0") : null;
  const dimLabels = ["Market Opportunity","Development Impact","Implementation","Financial Sustainability"];
  const route = isSector ? sector!.route : doc!.route;

  return (
    <div style={{ position:"absolute", inset:0, background:C.white, zIndex:10, display:"flex", flexDirection:"column", animation:"bridgeSlideDetail 0.22s ease" }}
      role="region" aria-label={`Detail: ${sector?.fullTitle || doc?.title}`}>

      <div style={{ display:"flex", alignItems:"center", gap:"10px", padding: isMobile?"14px 20px":"12px 20px", borderBottom:"1px solid "+C.line }}>
        <BackButton onClick={onBack}/>
        <span style={{ fontFamily:"Inter,sans-serif", fontSize:"11px", color:C.muted, textTransform:"capitalize" }}>
          {isSector ? "Sector" : doc?.type}
        </span>
      </div>

      {!isSector && <div style={{ height:"3px", background:"linear-gradient(90deg,"+C.accent+",transparent)", flexShrink:0 }}/>}

      <div className="bridge-scroll" style={{ flex:1, overflowY:"auto", padding: isMobile?"20px":"24px 24px 20px" }}>
        {sector && (
          <>
            <div style={{ display:"flex", alignItems: isMobile?"center":"flex-start", gap:"14px", marginBottom:"20px" }}>
              <div style={{ width: isMobile?"48px":"56px", height: isMobile?"48px":"56px", borderRadius:"50%", flexShrink:0, background:C.primary, display:"flex", alignItems:"center", justifyContent:"center" }}>
                {iconFn ? iconFn(C.accent, isMobile?20:24) : null}
              </div>
              <div>
                <div style={{ fontFamily:"Inter,sans-serif", fontSize:"10px", fontWeight:"700", letterSpacing:"2px", textTransform:"uppercase", color:C.accentText, marginBottom:"5px" }}>
                  Sector {sectorNum} of 12
                </div>
                <h2 style={{ fontFamily:"Inter,sans-serif", fontSize: isMobile?"17px":"20px", fontWeight:"700", color:C.dark, margin:"0 0 4px", lineHeight:1.2 }}>{sector.fullTitle}</h2>
                <p style={{ fontFamily:"Inter,sans-serif", fontSize:"12px", color:C.muted, margin:0, lineHeight:1.6 }}>{sector.subtitle}</p>
              </div>
            </div>

            <div style={{ background:C.bg, borderRadius:"16px", padding: isMobile?"16px":"20px", marginBottom:"16px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"14px" }}>
                <span style={{ fontFamily:"Inter,sans-serif", fontSize:"10px", fontWeight:"700", letterSpacing:"1.5px", textTransform:"uppercase", color:C.muted }}>BRIDGE Impact Score</span>
                <TierBadge tier={sector.tier}/>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
                <div style={{ position:"relative", flexShrink:0 }}>
                  <AnimatedScoreRing score={sector.score} size={56}/>
                  <span style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontFamily:"Inter,sans-serif", fontSize:"13px", fontWeight:"700", color:C.primary }}>{sector.score}</span>
                </div>
                <div style={{ flex:1 }}>
                  {dimLabels.map((label,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom: i<3?"7px":0 }}>
                      <span style={{ fontFamily:"Inter,sans-serif", fontSize:"9px", color:C.muted, width:"115px", flexShrink:0 }}>{label}</span>
                      <AnimatedBar pct={sector.dimScores[i]} delay={200+i*120}/>
                      <span style={{ fontFamily:"Inter,sans-serif", fontSize:"9px", fontWeight:"700", color:C.accentText, width:"24px", textAlign:"right" }}>{sector.dimScores[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {doc && (
          <>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px" }}>
              <DocTypeIcon type={doc.type}/>
              <span style={{ fontFamily:"Inter,sans-serif", fontSize:"10px", fontWeight:"700", letterSpacing:"1.5px", textTransform:"uppercase", color:C.muted }}>{doc.type}</span>
              {doc.date && (
                <>
                  <span style={{ color:C.line, fontSize:"10px" }}>&middot;</span>
                  <span style={{ fontFamily:"Inter,sans-serif", fontSize:"11px", color:C.muted }}>{doc.date}</span>
                </>
              )}
            </div>
            <h2 style={{ fontFamily:"Inter,sans-serif", fontSize: isMobile?"17px":"20px", fontWeight:"700", color:C.dark, margin:"0 0 10px", lineHeight:1.25 }}>{doc.title}</h2>
            <p style={{ fontFamily:"Inter,sans-serif", fontSize:"13px", color:C.muted, margin:"0 0 20px", lineHeight:1.75 }}>{doc.subtitle}</p>
          </>
        )}

        {/* CTAs */}
        <div style={{ display:"flex", gap:"10px", flexDirection: isMobile?"column":"row" }}>
          <button onClick={()=>onNavigate(route)} style={{ flex:1, padding: isMobile?"14px 20px":"12px 20px", background:C.primary, border:"none", borderRadius:"50px", fontFamily:"Inter,sans-serif", fontSize:"14px", fontWeight:"600", color:C.white, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", transition:"all 0.25s ease" }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=C.ctaGreen;(e.currentTarget as HTMLElement).style.transform="translateY(-1px)";(e.currentTarget as HTMLElement).style.boxShadow="0 8px 24px rgba(27,77,62,0.3)";}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background=C.primary;(e.currentTarget as HTMLElement).style.transform="none";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
            Open {isSector?"Sector":doc?.type==="page"?"Page":"Report"}
            <span style={{ width:"24px", height:"24px", borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {Ico.arrow(C.white,12)}
            </span>
          </button>
          {isSector && (
            <button onClick={()=>onNavigate(`/reports/${sector!.key}`)} style={{ padding: isMobile?"14px 20px":"12px 20px", background:"transparent", border:"1.5px solid "+C.line, borderRadius:"50px", fontFamily:"Inter,sans-serif", fontSize:"14px", fontWeight:"500", color:C.primary, cursor:"pointer", transition:"all 0.25s ease" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.primary;(e.currentTarget as HTMLElement).style.background=C.accentLight;}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.line;(e.currentTarget as HTMLElement).style.background="transparent";}}>
              Full Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Search Header ────────────────────────────────────────────────────────────
const SearchHeader = ({ query, setQuery, onClose, inputRef, isMobile }: {
  query: string; setQuery: (q: string) => void; onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>; isMobile: boolean;
}) => (
  <div style={{ background:C.primary, padding: isMobile?"16px 20px 20px":"28px 28px 24px", flexShrink:0 }}>
    {isMobile && (
      <div style={{ display:"flex", justifyContent:"center", marginBottom:"14px" }}>
        <div style={{ width:"36px", height:"4px", borderRadius:"2px", background:"rgba(255,255,255,0.18)" }}/>
      </div>
    )}
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: isMobile?"14px":"20px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
        <LogoMark size={22}/>
        <span style={{ fontFamily:"Inter,sans-serif", fontSize:"12px", fontWeight:"700", color:"rgba(255,255,255,0.55)", letterSpacing:"1.5px", textTransform:"uppercase" }}>BRIDGE Search</span>
      </div>
      <button onClick={onClose} aria-label="Close search"
        style={{ width:"30px", height:"30px", borderRadius:"50%", border:"none", background:"rgba(255,255,255,0.1)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.2)";}}
        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.1)";}}>
        {Ico.close("rgba(255,255,255,0.7)", 13)}
      </button>
    </div>
    <div style={{
      display:"flex", alignItems:"center", gap:"14px",
      background:"rgba(255,255,255,0.1)", borderRadius:"14px",
      padding: isMobile?"13px 16px":"14px 18px",
      border:"1.5px solid "+(query ? "rgba(184,217,53,0.45)" : "rgba(255,255,255,0.15)"),
      boxShadow: query ? "0 0 0 3px rgba(184,217,53,0.12)" : "none",
      transition:"border-color 0.2s ease, box-shadow 0.2s ease",
    }}>
      {Ico.search(query ? C.accent : "rgba(255,255,255,0.4)", isMobile?18:20)}
      <input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)}
        placeholder="Search sectors, reports, insights\u2026"
        className="bridge-input" aria-label="Search BRIDGE" role="searchbox" autoComplete="off"
        style={{ flex:1, border:"none", outline:"none", background:"transparent", fontFamily:"Inter,sans-serif", fontSize: isMobile?"16px":"17px", fontWeight:"400", color:C.white, caretColor:C.accent }}
      />
      {query ? (
        <button onClick={()=>{setQuery("");inputRef.current?.focus();}} aria-label="Clear search"
          style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", flexShrink:0 }}>
          {Ico.close("rgba(255,255,255,0.6)", isMobile?15:13)}
        </button>
      ) : !isMobile && (
        <kbd style={{ padding:"3px 9px", borderRadius:"7px", flexShrink:0, fontFamily:"Inter,sans-serif", fontSize:"11px", color:"rgba(255,255,255,0.38)", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.13)" }}>&thinsp;&#8984;K</kbd>
      )}
    </div>
  </div>
);

// ── Main SearchModal ─────────────────────────────────────────────────────────
export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const isMobile  = useIsMobile();
  const navigate  = useNavigate();
  const [query, setQuery]   = useState("");
  const [active, setActive] = useState(-1);
  const [detail, setDetail] = useState<{ item: Sector | Doc; kind: string } | null>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const openedRef = useRef(false);
  const results   = searchAll(query);
  const allFlat   = [...results.sectors.map(s=>({item:s as Sector | Doc,kind:"sector"})), ...results.docs.map(d=>({item:d as Sector | Doc,kind:"doc"}))];

  useScrollLock(isOpen);

  const handleNavigate = useCallback((route: string) => {
    onClose();
    navigate(route);
  }, [onClose, navigate]);

  useEffect(() => {
    if (isOpen && !openedRef.current) {
      openedRef.current = true;
      setQuery(""); setDetail(null); setActive(-1);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
    if (!isOpen) openedRef.current = false;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key==="Escape")    { if (detail) setDetail(null); else onClose(); }
      if (e.key==="ArrowDown") { e.preventDefault(); setActive(a=>Math.min(a+1,allFlat.length-1)); }
      if (e.key==="ArrowUp")   { e.preventDefault(); setActive(a=>Math.max(a-1,0)); }
      if (e.key==="Enter" && active>=0) { const {item,kind}=allFlat[active]; setDetail({item,kind}); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, active, allFlat, detail, onClose]);

  useEffect(()=>{ setActive(-1); }, [query]);

  if (!isOpen) return null;

  const body = (
    <>
      {query.trim()
        ? <ResultsPanel results={results} active={active} setActive={setActive} onSelect={(item,kind)=>setDetail({item,kind})} query={query} isMobile={isMobile}/>
        : <DiscoveryState setQuery={setQuery} onNavigate={handleNavigate} isMobile={isMobile}/>
      }
      {detail && <DetailPanel item={detail.item} kind={detail.kind} onBack={()=>setDetail(null)} onNavigate={handleNavigate} isMobile={isMobile}/>}
    </>
  );

  if (isMobile) return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label="BRIDGE Search"
      style={{ position:"fixed", inset:0, zIndex:9999, background:C.overlay, display:"flex", alignItems:"flex-end", animation:"bridgeOverlay 0.2s ease" }}>
      <style>{SEARCH_STYLES}</style>
      <div onClick={e=>e.stopPropagation()}
        style={{ width:"100%", maxHeight:"92vh", borderRadius:"24px 24px 0 0", display:"flex", flexDirection:"column", animation:"bridgeSheetUp 0.32s cubic-bezier(0.32,0.72,0,1)", position:"relative", overflow:"hidden", background:C.white }}>
        <SearchHeader query={query} setQuery={setQuery} onClose={onClose} inputRef={inputRef} isMobile={true}/>
        <div className="bridge-scroll" style={{ flex:1, overflowY:"auto", position:"relative" }}>{body}</div>
      </div>
    </div>
  );

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label="BRIDGE Search"
      style={{ position:"fixed", inset:0, zIndex:9999, background:C.overlay, display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:"clamp(48px,10vh,100px)", animation:"bridgeOverlay 0.15s ease" }}>
      <style>{SEARCH_STYLES}</style>
      <div onClick={e=>e.stopPropagation()}
        style={{ width:"clamp(360px,90vw,660px)", maxHeight:"clamp(440px,80vh,700px)", borderRadius:"24px", overflow:"hidden", boxShadow:"0 40px 100px rgba(0,0,0,0.5),0 8px 32px rgba(0,0,0,0.2)", display:"flex", flexDirection:"column", animation:"bridgeDrop 0.26s cubic-bezier(0.175,0.885,0.32,1.275)", position:"relative" }}>
        <SearchHeader query={query} setQuery={setQuery} onClose={onClose} inputRef={inputRef} isMobile={false}/>
        <div className="bridge-scroll" style={{ flex:1, overflowY:"auto", background:C.white, position:"relative" }}>{body}</div>
      </div>
    </div>
  );
};

export default SearchModal;
