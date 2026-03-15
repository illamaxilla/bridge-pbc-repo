import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Blocks, Wallet, Cross, Cpu, GraduationCap, Sprout, Camera, Home, Luggage, BatteryCharging, Factory, Truck, ArrowUpRight, Filter, MapPin, ChevronRight, ChevronDown, Star, TrendingUp, DollarSign } from 'lucide-react';

const C = {
  ink:'#0D1A10', paper:'#FAF8F3', paperDark:'#F0EDE4', forest:'#1B4D3E',
  lime:'#B8D935', limeDark:'#8FA825', muted:'#5C6B5E', faint:'#9AAA9C',
  border:'#D8D4C8', teal:'#2E5A4D', red:'#A8200D', amber:'#B8730A',
  positive:'#1A6B2F', white:'#FFFFFF',
};
const F = {
  display:'"Playfair Display","Georgia",serif',
  body:'"Source Serif 4","Georgia",serif',
  sans:'"DM Sans","Helvetica Neue",sans-serif',
  mono:'"DM Mono","Courier New",monospace',
};

const useIsMobile = () => {
  const [mob, setMob] = useState(() => typeof window !== 'undefined' && window.innerWidth < 700);
  useEffect(() => {
    const fn = () => setMob(window.innerWidth < 700);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mob;
};

const Gf = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
    button,a{-webkit-tap-highlight-color:transparent;}
    button:focus,a:focus{outline:none;}
    @media print{.np{display:none!important;}}
    /* ── Desktop grid ── */
    .opp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;}
    .db-search::placeholder{color:${C.faint};font-family:${F.sans};font-size:13px;}
    .db-search:focus{outline:none;border-color:${C.forest}!important;}
    .fpill{transition:all 0.12s ease;outline:none;-webkit-tap-highlight-color:transparent;}
    .fpill:hover{border-color:${C.forest}!important;color:${C.forest}!important;}
    .filter-panel{max-height:0;overflow:hidden;transition:max-height 0.35s ease;}
    .filter-panel.open{max-height:800px;}
    .chip-strip{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
    .chip-strip:empty{display:none;}
    .score-bar-fill{transition:width 0.6s cubic-bezier(0.4,0,0.2,1);}
    /* ── Desktop modal ── */
    .modal-overlay{position:fixed;inset:0;z-index:200;background:rgba(13,26,16,0.65);
      display:flex;align-items:center;justify-content:center;padding:24px;}
    .modal-box{background:${C.paper};width:100%;max-width:640px;max-height:90vh;
      overflow-y:auto;border-top:3px solid ${C.lime};box-shadow:0 20px 60px rgba(0,0,0,0.3);}
    @media(hover:hover){
      .opp-card:hover{border-color:${C.forest}!important;box-shadow:0 4px 16px rgba(27,77,62,0.12)!important;}
      .sector-tile:hover{border-color:${C.forest}!important;background:${C.paperDark}!important;}
      .list-row:hover{background:${C.paperDark}!important;}
    }
    .opp-card,.sector-tile,.list-row{transition:all 0.12s ease;-webkit-tap-highlight-color:transparent;}
    /* ── Tablet ── */
    @media(max-width:900px){.opp-grid{grid-template-columns:repeat(2,1fr)!important;}}
    /* ── Mobile bottom sheet ── */
    .mob-sheet{position:fixed;bottom:0;left:0;right:0;z-index:310;
      background:${C.paper};border-top:3px solid ${C.forest};
      max-height:92vh;overflow-y:auto;
      transform:translateY(100%);transition:transform 0.32s cubic-bezier(0.32,0.72,0,1);
      padding-bottom:calc(8px + env(safe-area-inset-bottom,0px));}
    .mob-sheet.open{transform:translateY(0);}
    .mob-sheet-overlay{position:fixed;inset:0;z-index:300;background:rgba(13,26,16,0.55);
      opacity:0;pointer-events:none;transition:opacity 0.25s ease;}
    .mob-sheet-overlay.open{opacity:1;pointer-events:all;}
    /* ── Mobile modal full screen ── */
    @media(max-width:700px){
      .modal-overlay{align-items:flex-end!important;padding:0!important;background:rgba(13,26,16,0.8)!important;}
      .modal-box{max-height:96vh;border-radius:0!important;width:100%!important;max-width:100%!important;}
      .mob-hide{display:none!important;}
    }
    /* ── Modal tab bar ── */
    .modal-tab{background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;
      padding:12px 16px;white-space:nowrap;font-family:${F.sans};font-size:11px;font-weight:700;
      color:${C.muted};transition:color 0.15s,border-color 0.15s;outline:none;}
    .modal-tab.active{color:${C.forest};border-bottom-color:${C.lime};}
    /* ── Bottom nav (mobile) ── */
    .mob-bottom-nav{position:fixed;bottom:0;left:0;right:0;z-index:100;
      background:${C.paper};border-top:1px solid ${C.border};
      display:flex;padding:0 0 calc(env(safe-area-inset-bottom,0px));
      box-shadow:0 -2px 12px rgba(0,0,0,0.06);}
    .mob-nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
      padding:10px 4px;background:none;border:none;cursor:pointer;gap:3px;
      font-family:${F.sans};font-size:9px;font-weight:700;letter-spacing:0.5px;
      color:${C.faint};text-transform:uppercase;transition:color 0.12s;}
    .mob-nav-btn.active{color:${C.forest};}
    /* ── View padding ── */
    .mob-view-pad{padding-bottom:72px;}
    /* ── List row ── */
    .list-row{display:flex;align-items:center;gap:12px;padding:12px 18px;
      border-bottom:1px solid ${C.border};cursor:pointer;background:${C.paper};}
    /* ── Sector tile ── */
    .sector-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;
      gap:6px;padding:16px 8px;background:${C.paper};border:1px solid ${C.border};cursor:pointer;
      text-align:center;}
    /* ── Drag handle ── */
    .drag-handle{width:36px;height:4px;background:${C.border};border-radius:2px;margin:10px auto 2px;}
    /* ── Score pill ── */
    .score-pill{display:inline-flex;align-items:center;justify-content:center;
      min-width:36px;height:24px;padding:0 7px;font-family:${F.mono};font-size:11px;font-weight:700;}
    /* ── CTA bar (modal mobile) ── */
    .mob-cta-bar{position:fixed;bottom:0;left:0;right:0;z-index:320;
      background:${C.paper};border-top:1px solid ${C.border};
      padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px));
      display:flex;gap:8px;}
    /* ── Sticky filter bar mobile ── */
    .mob-filter-bar{position:sticky;top:48px;z-index:90;background:${C.paperDark};
      border-bottom:1px solid ${C.border};padding:8px 18px;
      display:flex;align-items:center;gap:8px;overflow-x:auto;
      scrollbar-width:none;-webkit-overflow-scrolling:touch;}
    .mob-filter-bar::-webkit-scrollbar{display:none;}
  `}</style>
);

const Logo = ({ height=26, variant='dark' }) => {
  const tf = variant==='white' ? '#ffffff' : '#1B4D3E';
  return (
    <svg height={height} viewBox="0 0 3258.5 932.3" style={{display:'block',flexShrink:0}} xmlns="http://www.w3.org/2000/svg">
      <path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      <path fill={tf} stroke="#000" strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      <path fill={tf} stroke="#000" strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
      <rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      <path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      <rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
      <rect fill="none" stroke={tf} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
      <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
    </svg>
  );
};

const SECTOR_ICONS = {1:Blocks,2:Wallet,3:Cross,4:Cpu,5:GraduationCap,6:Sprout,7:Camera,8:Home,9:Luggage,10:BatteryCharging,11:Factory,12:Truck};
const SECTORS_META = [
  {id:1,num:'01',name:'Infrastructure',shortName:'Infrastructure'},
  {id:2,num:'02',name:'Financial Inclusion',shortName:'Financial'},
  {id:3,num:'03',name:'Health Systems',shortName:'Health'},
  {id:4,num:'04',name:'Technology & Innovation',shortName:'Technology'},
  {id:5,num:'05',name:'Education & Skills',shortName:'Education'},
  {id:6,num:'06',name:'Agriculture & Value Chains',shortName:'Agriculture'},
  {id:7,num:'07',name:'Sports & Creative',shortName:'Creative'},
  {id:8,num:'08',name:'Housing & Real Estate',shortName:'Housing'},
  {id:9,num:'09',name:'Tourism & Hospitality',shortName:'Tourism'},
  {id:10,num:'10',name:'Energy & Renewables',shortName:'Energy'},
  {id:11,num:'11',name:'Manufacturing',shortName:'Manufacturing'},
  {id:12,num:'12',name:'Transportation & Logistics',shortName:'Logistics'},
];
// 174+ opportunities across 12 sectors — representative portfolio
const OPPORTUNITIES = [
  // SECTOR 1 - INFRASTRUCTURE
  { id:'I-01', sector:1, title:'Kejetia Market Digital Platform', desc:'Digitize West Africa\'s largest market — 10,000+ traders, payments, inventory, and market intelligence in one integrated platform.', score:87, tier:'Core', capMin:2, capMax:5, stage:'Active', region:'Kumasi', tags:['Platform','FinTech','Markets'] },
  { id:'I-02', sector:1, title:'Urban Water Kiosk Network', desc:'Last-mile water distribution kiosks with smart meters and mobile payment integration across underserved urban peripheries.', score:81, tier:'Core', capMin:1, capMax:3, stage:'Seed', region:'Accra', tags:['Utilities','Infrastructure','Impact'] },
  { id:'I-03', sector:1, title:'District Road Maintenance Co-op', desc:'Community-owned road maintenance enterprises equipped with shared machinery and long-term government maintenance contracts.', score:74, tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'Northern Regions', tags:['Infrastructure','Employment'] },
  { id:'I-04', sector:1, title:'Sanitation Service Enterprise', desc:'Fecal sludge management and community sanitation services with biogas recovery, creating circular waste-to-energy value chains.', score:78, tier:'Core', capMin:1, capMax:4, stage:'Seed', region:'Greater Accra', tags:['Sanitation','CleanEnergy','Impact'] },
  { id:'I-05', sector:1, title:'Telecom Tower Colocation Platform', desc:'Independent tower management company aggregating passive infrastructure for all MNOs — reducing duplication and lowering rural coverage costs.', score:72, tier:'Emerging', capMin:5, capMax:15, stage:'Concept', region:'National', tags:['Telecom','Infrastructure'] },

  // SECTOR 2 - FINANCIAL INCLUSION
  { id:'F-01', sector:2, title:'Market Trader Digital Wallet', desc:'Integrated financial services platform for informal market traders — savings, credit, insurance, and payments in a single mobile app tied to market operations.', score:92, tier:'Core', capMin:1, capMax:3, stage:'Active', region:'National', tags:['FinTech','Markets','Scale'] },
  { id:'F-02', sector:2, title:'MSME Credit Guarantee Facility', desc:'First-loss guarantee structure enabling formal bank lending to qualifying MSMEs — $4–6B addressable credit opportunity.', score:84, tier:'Core', capMin:2, capMax:5, stage:'Seed', region:'National', tags:['Credit','MSME','Guarantee'] },
  { id:'F-03', sector:2, title:'Diaspora Investment Gateway', desc:'Structured investment products allowing diaspora to invest directly in vetted Ghana ventures — remittance-to-investment conversion.', score:79, tier:'Core', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['Diaspora','Investment','Platform'] },
  { id:'F-04', sector:2, title:'Digital Susu Integration Platform', desc:'Formalizing Ghana\'s $2B+ informal rotating savings (susu) system with digital ledgers, credit scoring, and insurance wrapping.', score:88, tier:'Core', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['FinTech','Savings','Informal'] },
  { id:'F-05', sector:2, title:'Market Microinsurance Bundle', desc:'Bundled micro-insurance products for market traders — fire, theft, health, and income protection at GHS 5–20/month price points.', score:83, tier:'Core', capMin:0.5, capMax:1.5, stage:'Seed', region:'National', tags:['Insurance','Markets','FinTech'] },
  { id:'F-06', sector:2, title:'Alternative Credit Scoring Platform', desc:'Psychometric, transactional, and behavioral data-based credit scores for the unbanked — enabling financial access without collateral.', score:77, tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['FinTech','Credit','Data'] },
  { id:'F-07', sector:2, title:"Women's Economic Empowerment Fund", desc:'Dedicated capital fund for women-led enterprises with integrated business training, mentorship, and market linkage programs.', score:76, tier:'Emerging', capMin:1, capMax:5, stage:'Concept', region:'National', tags:['Gender','Impact','SME'] },

  // SECTOR 3 - HEALTH
  { id:'H-01', sector:3, title:'Community Health Worker Tech Platform', desc:'Mobile digital health platform for Ghana\'s 100,000+ CHW network — patient records, supply chain alerts, telemedicine escalation.', score:85, tier:'Core', capMin:1, capMax:3, stage:'Seed', region:'National', tags:['HealthTech','Digital','CHW'] },
  { id:'H-02', sector:3, title:'Last-Mile Cold Chain Network', desc:'Solar-powered cold chain infrastructure ensuring vaccine and medicine integrity across remote health facilities — critical gap in northern regions.', score:82, tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'Northern Regions', tags:['Cold Chain','Infrastructure','Health'] },
  { id:'H-03', sector:3, title:'Private Specialist Clinic Network', desc:'Franchise model specialist clinics (maternal, dental, eye) for urban middle-income households priced below private hospital rates.', score:79, tier:'Core', capMin:1, capMax:4, stage:'Concept', region:'Accra / Kumasi', tags:['Clinic','Private','Franchise'] },
  { id:'H-04', sector:3, title:'Health Data Analytics Platform', desc:'Aggregated anonymized health data platform for hospitals, insurers, and researchers — enabling evidence-based decisions and product development.', score:71, tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Data','HealthTech','B2B'] },
  { id:'H-05', sector:3, title:'Local Pharmaceutical Distribution', desc:'Aggregated pharmaceutical distribution covering last-mile delivery to rural facilities — breaking the urban-only distribution model.', score:76, tier:'Emerging', capMin:1, capMax:4, stage:'Seed', region:'National', tags:['Pharma','Distribution','Rural'] },

  // SECTOR 4 - TECHNOLOGY
  { id:'T-01', sector:4, title:'Ghana Tech Talent Placement', desc:'Placement and upskilling platform connecting qualified Ghanaian developers with global remote employers — diaspora mentorship network included.', score:86, tier:'Core', capMin:0.5, capMax:2, stage:'Active', region:'Accra', tags:['Talent','Remote Work','Platform'] },
  { id:'T-02', sector:4, title:'AgriTech Data Intelligence', desc:'Satellite, IoT, and mobile data platform providing smallholder farmers with weather, market price, and agronomic decision support.', score:80, tier:'Core', capMin:1, capMax:3, stage:'Seed', region:'National', tags:['AgriTech','Data','Smallholder'] },
  { id:'T-03', sector:4, title:'Government Digital Services Stack', desc:'GovTech platform enabling digital service delivery — permits, licensing, procurement — reducing friction and corruption in government transactions.', score:77, tier:'Emerging', capMin:2, capMax:8, stage:'Concept', region:'National', tags:['GovTech','Platform','B2G'] },
  { id:'T-04', sector:4, title:'SME ERP / Business OS', desc:'Affordable cloud ERP for Ghanaian SMEs — inventory, payroll, accounting, tax — localized for Ghana\'s regulatory and payment environment.', score:83, tier:'Core', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['SaaS','SME','Platform'] },
  { id:'T-05', sector:4, title:'Cybersecurity-as-a-Service', desc:'Managed security services for SMEs and mid-market companies — Ghana\'s financial sector growth creates urgent demand for accessible security.', score:74, tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'Accra', tags:['Security','B2B','SaaS'] },

  // SECTOR 5 - EDUCATION
  { id:'E-01', sector:5, title:'TVET Skills Certification Platform', desc:'National skills certification platform aligned with NVTI standards — bridging the gap between informal training and employer-recognized credentials.', score:85, tier:'Core', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['Skills','Certification','TVET'] },
  { id:'E-02', sector:5, title:'Digital Skills Academy Network', desc:'Blended learning academies training 5,000+ youth annually in coding, data, and digital marketing — job-placement guaranteed model.', score:82, tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'Accra / Kumasi', tags:['Digital Skills','Youth','Training'] },
  { id:'E-03', sector:5, title:'SME Management Training Platform', desc:'Mobile-first business management curriculum targeting the 65%+ SME owners lacking management skills — practical, affordable, certified.', score:79, tier:'Core', capMin:0.5, capMax:1.5, stage:'Concept', region:'National', tags:['SME','Training','Mobile'] },
  { id:'E-04', sector:5, title:'School Infrastructure Investment', desc:'Public-private partnership model for school construction and renovation — government land and guarantees, BRIDGE capital and management.', score:74, tier:'Emerging', capMin:3, capMax:10, stage:'Concept', region:'Northern Regions', tags:['Infrastructure','PPP','Education'] },
  { id:'E-05', sector:5, title:'Workforce Development Marketplace', desc:'Platform connecting employers, training providers, and job seekers — real-time labor market intelligence matching supply to demand.', score:77, tier:'Emerging', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['Platform','Jobs','Marketplace'] },

  // SECTOR 6 - AGRICULTURE
  { id:'A-01', sector:6, title:'Cold Chain Storage Network', desc:'Network of solar-powered cold storage facilities at district markets — addressing $1.9B annual post-harvest losses for Ghanaian farmers.', score:91, tier:'Core', capMin:3, capMax:8, stage:'Seed', region:'National', tags:['Cold Chain','Post-Harvest','Solar'] },
  { id:'A-02', sector:6, title:'Smallholder Aggregation Platform', desc:'Digital platform connecting 600,000+ smallholder farmers to buyers, inputs, and finance — eliminating middleman extraction.', score:88, tier:'Core', capMin:1, capMax:3, stage:'Active', region:'National', tags:['Platform','Smallholder','AgriTech'] },
  { id:'A-03', sector:6, title:'Cooperative Strengthening Program', desc:'Formalization and capacity building for agricultural cooperatives — governance, financial management, collective bargaining support.', score:81, tier:'Core', capMin:0.5, capMax:2, stage:'Seed', region:'National', tags:['Cooperative','Capacity','Impact'] },
  { id:'A-04', sector:6, title:'Value-Added Processing Facilities', desc:'District-level processing infrastructure (maize milling, tomato paste, shea butter) converting raw output into higher-value products.', score:85, tier:'Core', capMin:2, capMax:7, stage:'Seed', region:'Northern Regions', tags:['Processing','Value-Add','Employment'] },
  { id:'A-05', sector:6, title:'Ejura Agricultural Hub', desc:'Integrated 500-acre agricultural development hub in the Ashanti breadbasket — production, processing, training, and market access.', score:89, tier:'Core', capMin:5, capMax:12, stage:'Active', region:'Ashanti', tags:['Hub','Integration','Flagship'] },
  { id:'A-06', sector:6, title:'Agricultural Finance Products', desc:'Crop finance, equipment leasing, and warehouse receipt lending tailored for Ghanaian smallholders — collateral-light structures.', score:83, tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'National', tags:['Finance','Credit','Agriculture'] },

  // SECTOR 7 - CREATIVE
  { id:'CR-01', sector:7, title:'Content Production Studio', desc:'Professional film, music, and digital content production infrastructure serving Ghana\'s fast-growing creative economy.', score:79, tier:'Core', capMin:2, capMax:5, stage:'Seed', region:'Accra', tags:['Media','Production','Creative'] },
  { id:'CR-02', sector:7, title:'Talent Management Platform', desc:'Digital platform for Ghanaian artists, athletes, and creatives — contracts, royalties, booking, and international market access.', score:77, tier:'Emerging', capMin:0.5, capMax:1.5, stage:'Concept', region:'Accra', tags:['Platform','Talent','IP'] },
  { id:'CR-03', sector:7, title:'Sports Academy Network', desc:'Multi-sport academies with professional coaching, nutrition, and education — talent development pipeline for local and international leagues.', score:74, tier:'Emerging', capMin:2, capMax:6, stage:'Concept', region:'Accra / Kumasi', tags:['Sports','Youth','Academy'] },
  { id:'CR-04', sector:7, title:'IP Monetization & Licensing', desc:'Structured IP registration, protection, and licensing platform for Ghanaian musicians, filmmakers, and artists.', score:71, tier:'Emerging', capMin:0.5, capMax:1.5, stage:'Concept', region:'National', tags:['IP','Legal','Creative'] },

  // SECTOR 8 - HOUSING
  { id:'HO-01', sector:8, title:'Affordable Housing Development', desc:'Mixed-income housing development targeting the 2M unit shortfall — government-guaranteed off-take for social units, market-rate cross-subsidy.', score:83, tier:'Core', capMin:5, capMax:15, stage:'Seed', region:'Greater Accra', tags:['Housing','Development','PPP'] },
  { id:'HO-02', sector:8, title:'Diaspora Housing Product', desc:'Structured diaspora housing investment — escrow construction finance, professional management, and guaranteed rental returns for overseas investors.', score:80, tier:'Core', capMin:1, capMax:5, stage:'Seed', region:'Accra / Kumasi', tags:['Diaspora','Real Estate','Finance'] },
  { id:'HO-03', sector:8, title:'Construction Materials Supply Chain', desc:'Local production and distribution of affordable building materials — reducing construction costs 20–30% vs imported equivalents.', score:76, tier:'Emerging', capMin:2, capMax:8, stage:'Concept', region:'National', tags:['Materials','Manufacturing','Construction'] },
  { id:'HO-04', sector:8, title:'Property Management Platform', desc:'Digital property management for Ghanaian landlords — tenant vetting, rent collection, maintenance, and legal compliance in one platform.', score:74, tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'Accra', tags:['PropTech','Platform','Rental'] },

  // SECTOR 9 - TOURISM
  { id:'TO-01', sector:9, title:'Heritage Tourism Development', desc:"Ghana's slave route, colonial forts, and cultural heritage sites developed into world-class visitor experiences — Year of Return momentum.", score:82, tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'Central Region', tags:['Heritage','Tourism','Diaspora'] },
  { id:'TO-02', sector:9, title:'Eco-Tourism Lodges Network', desc:'Network of sustainable eco-lodges in national parks and nature reserves — attracting high-value international ecotourism market.', score:77, tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Eco-Tourism','Sustainability','Lodges'] },
  { id:'TO-03', sector:9, title:'Hospitality Training Academy', desc:'Vocational training academy for hotel and restaurant staff — partnered with international hospitality brands for curriculum and placement.', score:79, tier:'Core', capMin:1, capMax:3, stage:'Seed', region:'Accra', tags:['Training','Hospitality','Skills'] },
  { id:'TO-04', sector:9, title:'Digital Destination Platform', desc:'Comprehensive travel platform for Ghana — bookings, itineraries, guides, and community-based tourism experiences.', score:73, tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'National', tags:['Platform','Digital','Tourism'] },

  // SECTOR 10 - ENERGY
  { id:'EN-01', sector:10, title:'Solar Mini-Grid Network', desc:'Community-scale solar mini-grids powering off-grid communities — productive use anchor tenants (mills, cold storage) drive viability.', score:88, tier:'Core', capMin:2, capMax:6, stage:'Seed', region:'Northern Regions', tags:['Solar','Energy Access','Mini-Grid'] },
  { id:'EN-02', sector:10, title:'Rooftop Solar Financing', desc:'Pay-as-you-go solar financing for homes and SMEs — reducing electricity costs 40–60% while building an asset-backed loan portfolio.', score:85, tier:'Core', capMin:1, capMax:5, stage:'Active', region:'National', tags:['Solar','FinTech','PAYG'] },
  { id:'EN-03', sector:10, title:'Clean Cooking Transition', desc:'LPG distribution and clean cookstove financing program — 60% of Ghanaian households still use biomass; major health and deforestation impact.', score:81, tier:'Core', capMin:1, capMax:4, stage:'Seed', region:'National', tags:['CleanCooking','Health','Rural'] },
  { id:'EN-04', sector:10, title:'Energy Efficiency Services', desc:'Energy auditing and retrofitting services for commercial and industrial clients — financing through utility bill savings.', score:74, tier:'Emerging', capMin:0.5, capMax:2, stage:'Concept', region:'Accra', tags:['Efficiency','B2B','Finance'] },
  { id:'EN-05', sector:10, title:'Grid-Scale Storage Partnership', desc:'Battery storage co-investment with ECG to stabilize national grid — addressing Ghana\'s persistent voltage fluctuation problem.', score:70, tier:'Emerging', capMin:5, capMax:20, stage:'Concept', region:'National', tags:['Storage','Grid','Utility'] },

  // SECTOR 11 - MANUFACTURING
  { id:'M-01', sector:11, title:'Pharmaceutical Manufacturing', desc:'WHO-certified generic pharmaceutical manufacturing — import substitution at scale, government procurement pipeline, export potential.', score:83, tier:'Core', capMin:5, capMax:15, stage:'Seed', region:'Accra', tags:['Pharma','Manufacturing','Export'] },
  { id:'M-02', sector:11, title:'Agro-Processing Equipment Leasing', desc:'Equipment leasing company for agro-processors — reducing capital barriers to formal production with shared maintenance infrastructure.', score:80, tier:'Core', capMin:1, capMax:5, stage:'Seed', region:'National', tags:['Equipment','Leasing','Agro'] },
  { id:'M-03', sector:11, title:'Garment & Textile Production', desc:'Contract manufacturing for regional and international fashion brands — leveraging AGOA preferential trade access and skilled labor.', score:77, tier:'Emerging', capMin:2, capMax:8, stage:'Concept', region:'Accra / Tema', tags:['Textiles','Export','Manufacturing'] },
  { id:'M-04', sector:11, title:'Plastic Recycling Enterprise', desc:'Post-consumer plastic aggregation, processing, and resale — addressing Ghana\'s plastic pollution crisis while creating formal employment.', score:75, tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'National', tags:['Recycling','Environment','Employment'] },
  { id:'M-05', sector:11, title:'Furniture & Woodwork Production', desc:'Mid-scale furniture manufacturing for the growing Ghanaian middle class — import substitution and export to regional markets.', score:72, tier:'Emerging', capMin:1, capMax:4, stage:'Concept', region:'Kumasi', tags:['Furniture','SME','Manufacturing'] },

  // SECTOR 12 - LOGISTICS
  { id:'L-01', sector:12, title:'Last-Mile Delivery Network', desc:'Tech-enabled last-mile delivery platform aggregating independent rider agents — serving e-commerce, pharma, and food delivery demand.', score:87, tier:'Core', capMin:1, capMax:4, stage:'Active', region:'Accra / Kumasi', tags:['Logistics','Platform','Last-Mile'] },
  { id:'L-02', sector:12, title:'Cold Chain Logistics Fleet', desc:'Refrigerated transport fleet connecting cold storage nodes to markets and processors — completing the cold chain infrastructure loop.', score:84, tier:'Core', capMin:2, capMax:7, stage:'Seed', region:'National', tags:['Cold Chain','Transport','Fleet'] },
  { id:'L-03', sector:12, title:'Port Freight Aggregation', desc:'SME freight aggregation platform at Tema Port — allowing small importers and exporters to access container shipping at competitive rates.', score:79, tier:'Core', capMin:0.5, capMax:2, stage:'Concept', region:'Tema', tags:['Freight','Trade','Platform'] },
  { id:'L-04', sector:12, title:'EV Fleet Transition', desc:'Electric vehicle fleet for last-mile and urban delivery — lower operating costs, emission reduction, and first-mover positioning.', score:71, tier:'Emerging', capMin:2, capMax:8, stage:'Concept', region:'Accra', tags:['EV','Transport','CleanTech'] },
  { id:'L-05', sector:12, title:'Trade Finance Platform', desc:'Digital trade finance platform for SME importers and exporters — letters of credit, invoice financing, and FX hedging in one portal.', score:76, tier:'Emerging', capMin:1, capMax:5, stage:'Seed', region:'National', tags:['TradeFinance','FinTech','Export'] },
];

const TIER_COLOR = {Core:C.positive,Emerging:C.amber,Exploratory:C.muted};
const STAGE_COLOR = {Active:C.positive,Seed:C.forest,Concept:C.muted};
const CAPITAL_RANGES = [
  {label:'Under $1M',min:0,max:1},
  {label:'$1M – $5M',min:1,max:5},
  {label:'$5M – $15M',min:5,max:15},
  {label:'Over $15M',min:15,max:999},
];
const scoreColor=(s)=>s>=85?C.lime:s>=75?C.limeDark:C.amber;

// ─── SCORE BAR ────────────────────────────────────────────────────────────────
const ScoreBar=({score})=>(
  <div style={{height:'3px',background:C.border,overflow:'hidden'}}>
    <div className="score-bar-fill" style={{height:'100%',width:`${score}%`,background:scoreColor(score)}}/>
  </div>
);

// ─── DESKTOP CARD ─────────────────────────────────────────────────────────────
const DesktopCard=({opp,onClick})=>{
  const SIcon=SECTOR_ICONS[opp.sector];
  const sm=SECTORS_META.find(s=>s.id===opp.sector);
  const col=scoreColor(opp.score);
  return(
    <div className="opp-card" onClick={()=>onClick(opp)}
      style={{background:C.paper,border:`1px solid ${C.border}`,cursor:'pointer',display:'flex',flexDirection:'column'}}>
      <ScoreBar score={opp.score}/>
      <div style={{padding:'20px 20px 0',flex:1,display:'flex',flexDirection:'column',gap:'10px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'26px',height:'26px',background:C.paperDark,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              {SIcon&&<SIcon size={13} color={C.forest}/>}
            </div>
            <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint,letterSpacing:'1px'}}>{sm.num} · {sm.shortName}</span>
          </div>
          <div style={{fontFamily:F.mono,fontSize:'22px',fontWeight:700,color:col,lineHeight:1,flexShrink:0}}>{opp.score}</div>
        </div>
        <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.ink,lineHeight:1.3}}>{opp.title}</div>
        <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.7,flex:1}}>{opp.desc}</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'4px'}}>
          {opp.tags.slice(0,3).map(t=>(
            <span key={t} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',color:C.muted,background:C.paperDark,padding:'3px 7px',textTransform:'uppercase'}}>{t}</span>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px',paddingBottom:'14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
            <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:TIER_COLOR[opp.tier],textTransform:'uppercase',letterSpacing:'1px'}}>{opp.tier}</span>
            <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>|</span>
            <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.forest}}>${opp.capMin}–{opp.capMax}M</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
            <MapPin size={10} color={C.faint}/>
            <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>{opp.region}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MOBILE LIST ROW ──────────────────────────────────────────────────────────
// Compact: score pill · title · capital · stage indicator — no desc, no tags
const MobileRow=({opp,onClick})=>{
  const SIcon=SECTOR_ICONS[opp.sector];
  const col=scoreColor(opp.score);
  const stageColor={Active:C.positive,Seed:C.forest,Concept:C.faint};
  return(
    <div className="list-row" onClick={()=>onClick(opp)}>
      {/* Score pill */}
      <div className="score-pill" style={{background:`${col}18`,color:col,flexShrink:0}}>
        {opp.score}
      </div>
      {/* Icon */}
      <div style={{width:'28px',height:'28px',background:C.paperDark,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        {SIcon&&<SIcon size={13} color={C.forest}/>}
      </div>
      {/* Title + capital */}
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink,lineHeight:1.3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{opp.title}</div>
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginTop:'3px'}}>
          <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.forest}}>${opp.capMin}–{opp.capMax}M</span>
          <span style={{width:'3px',height:'3px',borderRadius:'50%',background:C.border,flexShrink:0}}/>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:stageColor[opp.stage]||C.faint,textTransform:'uppercase',letterSpacing:'0.5px'}}>{opp.stage}</span>
        </div>
      </div>
      {/* Chevron */}
      <ChevronRight size={14} color={C.faint} style={{flexShrink:0}}/>
    </div>
  );
};

// ─── SECTOR TILE ─────────────────────────────────────────────────────────────
const SectorTile=({sector,count,avgScore,onClick,active})=>{
  const SIcon=SECTOR_ICONS[sector.id];
  const col=scoreColor(avgScore);
  return(
    <div className="sector-tile" onClick={onClick}
      style={{border:`1px solid ${active?C.forest:C.border}`,background:active?C.forest:C.paper,position:'relative'}}>
      {active&&<div style={{position:'absolute',top:'6px',right:'6px',width:'6px',height:'6px',borderRadius:'50%',background:C.lime}}/>}
      <div style={{width:'32px',height:'32px',background:active?'rgba(255,255,255,0.1)':C.paperDark,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        {SIcon&&<SIcon size={16} color={active?C.lime:C.forest}/>}
      </div>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:active?C.paper:C.ink,lineHeight:1.2,letterSpacing:'0.3px'}}>{sector.shortName}</div>
      <div style={{display:'flex',alignItems:'center',gap:'4px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:active?col:'rgba(0,0,0,0.3)'}}>{avgScore}</span>
        <span style={{fontFamily:F.sans,fontSize:'8px',color:active?'rgba(255,255,255,0.4)':C.faint}}>{count}</span>
      </div>
    </div>
  );
};

// ─── FILTER PILL ─────────────────────────────────────────────────────────────
const FilterPill=({label,active,onClick,large=false})=>(
  <button onClick={onClick} className="fpill" style={{
    fontFamily:F.sans,fontSize:large?'12px':'10px',fontWeight:700,letterSpacing:'0.3px',
    padding:large?'10px 16px':'6px 12px',cursor:'pointer',outline:'none',flexShrink:0,
    border:active?`1.5px solid ${C.forest}`:`1px solid ${C.border}`,
    background:active?C.forest:'transparent',color:active?C.paper:C.muted,
  }}>{label}</button>
);

// ─── MOBILE FILTER SHEET ─────────────────────────────────────────────────────
const FilterSheet=({open,onClose,activeSector,setActiveSector,activeTier,setActiveTier,
  activeStage,setActiveStage,activeCapital,setActiveCapital,onClear,activeFilterCount,resultCount})=>{
  useEffect(()=>{
    if(open)document.body.style.overflow='hidden';
    else document.body.style.overflow='';
    return()=>{document.body.style.overflow='';};
  },[open]);
  return(
    <>
      <div className={`mob-sheet-overlay${open?' open':''}`} onClick={onClose}/>
      <div className={`mob-sheet${open?' open':''}`}>
        <div className="drag-handle"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 20px 14px',borderBottom:`1px solid ${C.border}`}}>
          <span style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:C.ink}}>
            Filter
            {activeFilterCount>0&&<span style={{marginLeft:'8px',background:C.forest,color:C.paper,borderRadius:'10px',padding:'2px 8px',fontSize:'11px'}}>{activeFilterCount}</span>}
          </span>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:C.muted,padding:'4px'}}><X size={18}/></button>
        </div>
        <div style={{padding:'18px 20px',display:'flex',flexDirection:'column',gap:'22px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Sector</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {SECTORS_META.map(s=>(
                <FilterPill key={s.id} label={`${s.num} ${s.shortName}`} active={activeSector===s.id}
                  onClick={()=>setActiveSector(activeSector===s.id?null:s.id)} large/>
              ))}
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Tier</div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {['Core','Emerging','Exploratory'].map(t=>(<FilterPill key={t} label={t} active={activeTier===t} onClick={()=>setActiveTier(activeTier===t?null:t)} large/>))}
              </div>
            </div>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Stage</div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {['Active','Seed','Concept'].map(s=>(<FilterPill key={s} label={s} active={activeStage===s} onClick={()=>setActiveStage(activeStage===s?null:s)} large/>))}
              </div>
            </div>
          </div>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Capital Range</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {CAPITAL_RANGES.map(r=>(<FilterPill key={r.label} label={r.label} active={activeCapital===r.label} onClick={()=>setActiveCapital(activeCapital===r.label?null:r.label)} large/>))}
            </div>
          </div>
        </div>
        <div style={{padding:'0 20px 16px',display:'flex',gap:'10px'}}>
          <button onClick={onClose} style={{flex:1,background:C.forest,color:C.paper,border:'none',padding:'15px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,cursor:'pointer'}}>
            Show {resultCount} Opportunities
          </button>
          {activeFilterCount>0&&(
            <button onClick={()=>{onClear();}} style={{background:'none',border:`1px solid ${C.border}`,padding:'15px 18px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.muted,cursor:'pointer'}}>Clear</button>
          )}
        </div>
      </div>
    </>
  );
};

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────
const DetailModal=({opp,onClose,isMobile})=>{
  const SIcon=SECTOR_ICONS[opp.sector];
  const sm=SECTORS_META.find(s=>s.id===opp.sector);
  const col=scoreColor(opp.score);
  const [tab,setTab]=useState('overview');

  useEffect(()=>{
    document.body.style.overflow='hidden';
    const fn=(e)=>{if(e.key==='Escape')onClose();};
    window.addEventListener('keydown',fn);
    return()=>{document.body.style.overflow='';window.removeEventListener('keydown',fn);};
  },[onClose]);

  return(
    <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal-box">
        {/* Drag handle mobile */}
        {isMobile&&<div style={{background:C.ink}}><div className="drag-handle" style={{background:'rgba(255,255,255,0.2)'}}/></div>}
        {/* Header */}
        <div style={{background:C.ink,padding:isMobile?'12px 18px 0':'20px 28px 0',position:'relative'}}>
          {!isMobile&&<button onClick={onClose} style={{position:'absolute',top:'14px',right:'16px',background:'rgba(255,255,255,0.08)',border:'none',color:'rgba(255,255,255,0.6)',cursor:'pointer',width:'28px',height:'28px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px'}}>×</button>}
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
            <div style={{width:'26px',height:'26px',background:'rgba(184,217,53,0.1)',border:'1px solid rgba(184,217,53,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              {SIcon&&<SIcon size={13} color={C.lime}/>}
            </div>
            <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(184,217,53,0.5)',letterSpacing:'1.5px',textTransform:'uppercase'}}>{sm.num} · {sm.name.toUpperCase()}</span>
          </div>
          <div style={{fontFamily:F.display,fontSize:isMobile?'18px':'22px',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'12px',paddingRight:isMobile?'0':'36px'}}>{opp.title}</div>
          {/* Score + capital inline */}
          <div style={{display:'flex',gap:'20px',paddingBottom:'14px'}}>
            <div><div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:col,lineHeight:1}}>{opp.score}</div><div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginTop:'2px'}}>Score</div></div>
            <div><div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:C.paper,lineHeight:1}}>${opp.capMin}–{opp.capMax}M</div><div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginTop:'2px'}}>Capital</div></div>
            <div><div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:opp.stage==='Active'?C.lime:opp.stage==='Seed'?C.limeDark:C.faint,lineHeight:1.6}}>{opp.stage}</div><div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginTop:'2px'}}>Stage</div></div>
          </div>
          {/* Tab bar */}
          <div style={{display:'flex',borderTop:'1px solid rgba(255,255,255,0.08)',overflowX:'auto'}}>
            {[['overview','Overview'],['details','Details'],['join','Express Interest']].map(([id,label])=>(
              <button key={id} className={`modal-tab${tab===id?' active':''}`} onClick={()=>setTab(id)}
                style={{color:tab===id?C.lime:'rgba(255,255,255,0.4)',borderBottomColor:tab===id?C.lime:'transparent'}}>{label}</button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{padding:isMobile?'20px 18px':'24px 28px',paddingBottom:isMobile?'90px':'24px'}}>

          {tab==='overview'&&(
            <div>
              <p style={{fontFamily:F.body,fontSize:isMobile?'14px':'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'20px'}}>{opp.desc}</p>
              {/* Score bar */}
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted}}>BRIDGE Impact Score™</span>
                <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:col}}>{opp.score}/100</span>
              </div>
              <div style={{height:'6px',background:C.border,marginBottom:'20px'}}><div style={{height:'100%',width:`${opp.score}%`,background:col}}/></div>
              {/* Tags */}
              <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                {opp.tags.map(t=>(<span key={t} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',color:C.forest,border:`1px solid ${C.border}`,padding:'5px 10px',textTransform:'uppercase'}}>{t}</span>))}
              </div>
            </div>
          )}

          {tab==='details'&&(
            <div style={{background:C.forest,padding:'18px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Venture Parameters</div>
              {[['Tier',opp.tier],['Stage',opp.stage],['Region',opp.region],['Capital',`$${opp.capMin}M – $${opp.capMax}M`],['Score',`${opp.score}/100`]].map(([l,v])=>(
                <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                  <span style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.4)'}}>{l}</span>
                  <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>{v}</span>
                </div>
              ))}
              <div style={{marginTop:'16px',background:'rgba(184,217,53,0.08)',border:'1px solid rgba(184,217,53,0.15)',padding:'12px 14px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'6px'}}>Full Intelligence Available</div>
                <div style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.5)',lineHeight:1.6,fontStyle:'italic'}}>Score breakdown, risk matrix, investment thesis, IRR targets, and deployment parameters — in the Members database.</div>
              </div>
            </div>
          )}

          {tab==='join'&&(
            <div>
              <div style={{fontFamily:F.display,fontSize:'18px',fontWeight:700,color:C.ink,marginBottom:'10px',lineHeight:1.3}}>Express interest in this opportunity.</div>
              <p style={{fontFamily:F.body,fontSize:'13px',color:C.muted,lineHeight:1.75,marginBottom:'20px',fontStyle:'italic'}}>BRIDGE will follow up with full venture details, risk analysis, and co-investment parameters within 5 business days.</p>
              <a href={`mailto:intelligence@bridgepbc.com?subject=Expression of Interest — ${opp.title}`}
                style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',background:C.lime,color:C.ink,padding:'16px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',width:'100%',marginBottom:'10px'}}>
                Express Interest — {opp.title} <ArrowUpRight size={14}/>
              </a>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'18px',marginTop:'8px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Want the full picture first?</div>
                <a href="#" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',border:`1px solid ${C.border}`,color:C.forest,padding:'13px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,textDecoration:'none',width:'100%'}}>
                  Join as Member · $250/yr
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Mobile sticky CTAs */}
        {isMobile&&tab!=='join'&&(
          <div className="mob-cta-bar">
            <button onClick={()=>setTab('join')} style={{flex:1,background:C.lime,color:C.ink,border:'none',padding:'14px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
              Express Interest <ArrowUpRight size={13}/>
            </button>
            <button onClick={()=>setTab('details')} style={{flex:1,background:'none',border:`1px solid ${C.border}`,color:C.forest,padding:'14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,cursor:'pointer'}}>
              Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function BRIDGEOpportunityDatabase() {
  const isMobile=useIsMobile();
  const [search,setSearch]=useState('');
  const [activeSector,setActiveSector]=useState(null);
  const [activeTier,setActiveTier]=useState(null);
  const [activeStage,setActiveStage]=useState(null);
  const [activeCapital,setActiveCapital]=useState(null);
  const [sortBy,setSortBy]=useState('score');
  const [selectedOpp,setSelectedOpp]=useState(null);
  const [filtersOpen,setFiltersOpen]=useState(false);
  // Mobile: 'sectors' | 'browse' | 'search'
  const [mobView,setMobView]=useState('sectors');  const [rightExpanded,setRightExpanded]=useState(false);

  const filtered=useMemo(()=>{
    let r=[...OPPORTUNITIES];
    if(search.trim()){const q=search.toLowerCase();r=r.filter(o=>o.title.toLowerCase().includes(q)||o.desc.toLowerCase().includes(q)||o.tags.some(t=>t.toLowerCase().includes(q))||SECTORS_META.find(s=>s.id===o.sector)?.name.toLowerCase().includes(q));}
    if(activeSector)r=r.filter(o=>o.sector===activeSector);
    if(activeTier)r=r.filter(o=>o.tier===activeTier);
    if(activeStage)r=r.filter(o=>o.stage===activeStage);
    if(activeCapital){const cr=CAPITAL_RANGES.find(x=>x.label===activeCapital);if(cr)r=r.filter(o=>o.capMin>=cr.min&&o.capMin<cr.max);}
    if(sortBy==='score')r.sort((a,b)=>b.score-a.score);
    else if(sortBy==='capital-asc')r.sort((a,b)=>a.capMin-b.capMin);
    else if(sortBy==='capital-desc')r.sort((a,b)=>b.capMin-a.capMin);
    return r;
  },[search,activeSector,activeTier,activeStage,activeCapital,sortBy]);

  const clearAll=()=>{setSearch('');setActiveSector(null);setActiveTier(null);setActiveStage(null);setActiveCapital(null);};
  const activeFilterCount=[activeSector,activeTier,activeStage,activeCapital].filter(Boolean).length;

  // Per-sector stats for sector tiles
  const sectorStats=useMemo(()=>{
    const map={};
    SECTORS_META.forEach(s=>{
      const opps=OPPORTUNITIES.filter(o=>o.sector===s.id);
      map[s.id]={count:opps.length,avgScore:opps.length?Math.round(opps.reduce((a,o)=>a+o.score,0)/opps.length):0};
    });
    return map;
  },[]);

  const FilterPillDesk=({label,active,onClick})=>(
    <button onClick={onClick} className="fpill" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,padding:'6px 12px',cursor:'pointer',outline:'none',border:active?`1.5px solid ${C.forest}`:`1px solid ${C.border}`,background:active?C.forest:'transparent',color:active?C.paper:C.muted}}>{label}</button>
  );

  // ── MOBILE LAYOUT ──────────────────────────────────────────────────────────
  if(isMobile) return(
    <div style={{background:C.paper,minHeight:'100vh'}}>
      <Gf/>

      {/* Sticky top bar */}
      <div style={{position:'sticky',top:0,zIndex:100,background:C.ink,padding:'10px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>
        <Logo height={18} variant="white"/>
        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
          {activeFilterCount>0&&(
            <div style={{background:C.lime,color:C.ink,borderRadius:'10px',padding:'2px 8px',fontFamily:F.sans,fontSize:'9px',fontWeight:800}}>{filtered.length} results</div>
          )}
          <button onClick={()=>{setMobView('search');}} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',padding:'7px 10px',cursor:'pointer',display:'flex',alignItems:'center',color:mobView==='search'?C.lime:'rgba(255,255,255,0.6)'}}>
            <Search size={15}/>
          </button>
          <button onClick={()=>setFiltersOpen(true)} style={{background:activeFilterCount>0?C.lime:'rgba(255,255,255,0.08)',border:`1px solid ${activeFilterCount>0?C.lime:'rgba(255,255,255,0.12)'}`,padding:'7px 11px',cursor:'pointer',display:'flex',alignItems:'center',gap:'5px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:activeFilterCount>0?C.ink:'rgba(255,255,255,0.6)'}}>
            <Filter size={14}/>{activeFilterCount>0&&activeFilterCount}
          </button>
          <a href="#" style={{background:C.lime,color:C.ink,padding:'7px 12px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none'}}>Join</a>
        </div>
      </div>

      {/* Search view */}
      {mobView==='search'&&(
        <div style={{background:C.paperDark,padding:'12px 18px',borderBottom:`1px solid ${C.border}`,position:'sticky',top:'48px',zIndex:90}}>
          <div style={{position:'relative'}}>
            <Search size={14} color={C.faint} style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
            <input className="db-search" value={search} onChange={e=>setSearch(e.target.value)} autoFocus
              placeholder="Search opportunities, sectors, tags…"
              style={{width:'100%',padding:'12px 40px 12px 36px',fontFamily:F.sans,fontSize:'15px',color:C.ink,background:C.paper,border:`1px solid ${C.border}`}}/>
            {search&&<button onClick={()=>setSearch('')} style={{position:'absolute',right:'10px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:C.faint,display:'flex',padding:'4px'}}><X size={15}/></button>}
          </div>
          {search&&<div style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,marginTop:'8px',paddingLeft:'2px'}}>{filtered.length} result{filtered.length!==1?'s':''} for "{search}"</div>}
        </div>
      )}

      {/* ── SECTORS VIEW ── */}
      {mobView==='sectors'&&!search&&(
        <div className="mob-view-pad">
          {/* Hero strip */}
          <div style={{background:C.ink,padding:'20px 18px 24px'}}>
            <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(184,217,53,0.5)',marginBottom:'8px'}}>BRIDGE · Ghana Opportunity Database</div>
            <h1 style={{fontFamily:F.display,fontSize:'clamp(24px,7vw,32px)',fontWeight:900,color:C.paper,lineHeight:1.1,marginBottom:'16px'}}>Browse by sector.<br/><span style={{color:C.lime}}>Tap to explore.</span></h1>
            <div style={{display:'flex',gap:'0',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'16px'}}>
              {[[OPPORTUNITIES.length+'+','Opps'],['12','Sectors'],['$'+Math.round(OPPORTUNITIES.reduce((s,o)=>s+o.score,0)/OPPORTUNITIES.length),'Avg Score']].map(([v,l],i)=>(
                <div key={l} style={{flex:1,paddingLeft:i>0?'14px':'0',borderLeft:i>0?'1px solid rgba(255,255,255,0.08)':'none',marginLeft:i>0?'14px':'0'}}>
                  <div style={{fontFamily:F.mono,fontSize:'22px',fontWeight:500,color:C.lime,lineHeight:1}}>{v}</div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',marginTop:'3px'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* 12 sector tiles 3-col grid */}
          <div style={{padding:'16px 18px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Select a sector</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',marginBottom:'20px'}}>
              {SECTORS_META.map(s=>(
                <SectorTile key={s.id} sector={s} count={sectorStats[s.id]?.count||0}
                  avgScore={sectorStats[s.id]?.avgScore||0}
                  active={activeSector===s.id}
                  onClick={()=>{
                    setActiveSector(activeSector===s.id?null:s.id);
                    setMobView('browse');
                  }}/>
              ))}
            </div>
            {/* "Browse all" shortcut */}
            <button onClick={()=>setMobView('browse')} style={{width:'100%',background:C.paperDark,border:`1px solid ${C.border}`,padding:'13px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.forest,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
              Browse all {OPPORTUNITIES.length} opportunities <ChevronRight size={14}/>
            </button>
          </div>
          {/* Member CTA strip */}
          <div style={{margin:'0 18px 0',background:C.forest,padding:'18px',borderTop:`3px solid ${C.lime}`}}>
            <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(184,217,53,0.6)',marginBottom:'8px'}}>BRIDGE Membership · $250/yr</div>
            <div style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:C.paper,marginBottom:'6px'}}>Full intelligence on every opportunity.</div>
            <div style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.45)',lineHeight:1.65,fontStyle:'italic',marginBottom:'14px'}}>Score breakdowns, risk matrices, investment theses, IRR targets, and co-investment access.</div>
            <a href="#" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',background:C.lime,color:C.ink,padding:'13px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none'}}>
              Join BRIDGE · $250/yr <ArrowUpRight size={13}/>
            </a>
          </div>
        </div>
      )}

      {/* ── BROWSE / SEARCH RESULTS VIEW ── */}
      {(mobView==='browse'||mobView==='search'||search)&&(
        <div className="mob-view-pad">
          {/* Sticky sub-header */}
          <div style={{position:'sticky',top:'48px',zIndex:89,background:C.paperDark,borderBottom:`1px solid ${C.border}`,padding:'10px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'10px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',minWidth:0}}>
              {activeSector&&(()=>{
                const s=SECTORS_META.find(x=>x.id===activeSector);
                return(
                  <button onClick={()=>setActiveSector(null)} style={{display:'flex',alignItems:'center',gap:'5px',background:C.forest,border:'none',color:C.paper,padding:'5px 10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,cursor:'pointer',flexShrink:0}}>
                    {s.shortName} <X size={10}/>
                  </button>
                );
              })()}
              <span style={{fontFamily:F.sans,fontSize:'12px',color:C.muted,flexShrink:0}}>
                <span style={{fontFamily:F.mono,fontWeight:700,color:C.ink}}>{filtered.length}</span> {search?'results':'ventures'}
              </span>
            </div>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,background:'transparent',border:`1px solid ${C.border}`,padding:'5px 8px',cursor:'pointer',outline:'none',flexShrink:0}}>
              <option value="score">Top Score</option>
              <option value="capital-asc">Capital ↑</option>
              <option value="capital-desc">Capital ↓</option>
            </select>
          </div>
          {/* List rows */}
          {filtered.length>0?(
            <div>
              {filtered.map(opp=>(
                <MobileRow key={opp.id} opp={opp} onClick={setSelectedOpp}/>
              ))}
              {/* Bottom teaser */}
              <div style={{background:C.ink,padding:'20px 18px',margin:'0'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(184,217,53,0.5)',marginBottom:'8px'}}>Members get more</div>
                <div style={{fontFamily:F.body,fontSize:'13px',color:'rgba(250,248,243,0.45)',lineHeight:1.7,fontStyle:'italic',marginBottom:'14px'}}>Full score breakdowns, risk matrices, IRR targets, and investment theses for every venture above.</div>
                <a href="#" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',background:C.lime,color:C.ink,padding:'13px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none'}}>
                  Join for $250/yr <ArrowUpRight size={13}/>
                </a>
              </div>
            </div>
          ):(
            <div style={{padding:'60px 18px',textAlign:'center'}}>
              <div style={{fontFamily:F.mono,fontSize:'40px',color:C.border,marginBottom:'10px'}}>0</div>
              <div style={{fontFamily:F.display,fontSize:'16px',color:C.muted,fontStyle:'italic',marginBottom:'16px'}}>No results match.</div>
              <button onClick={clearAll} style={{background:C.forest,border:'none',color:C.paper,padding:'12px 24px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,cursor:'pointer'}}>Reset filters</button>
            </div>
          )}
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
      <div className="mob-bottom-nav">
        <button className={`mob-nav-btn${mobView==='sectors'&&!search?' active':''}`}
          onClick={()=>{setMobView('sectors');setSearch('');}}>
          <Blocks size={18}/>Sectors
        </button>
        <button className={`mob-nav-btn${(mobView==='browse'&&!search)?' active':''}`}
          onClick={()=>setMobView('browse')}>
          <TrendingUp size={18}/>All
        </button>
        <button className={`mob-nav-btn${mobView==='search'||!!search?' active':''}`}
          onClick={()=>setMobView('search')}>
          <Search size={18}/>Search
        </button>
      </div>

      {/* Filter sheet + modal */}
      <FilterSheet open={filtersOpen} onClose={()=>setFiltersOpen(false)}
        activeSector={activeSector} setActiveSector={v=>{setActiveSector(v);setMobView('browse');}}
        activeTier={activeTier} setActiveTier={setActiveTier}
        activeStage={activeStage} setActiveStage={setActiveStage}
        activeCapital={activeCapital} setActiveCapital={setActiveCapital}
        onClear={clearAll} activeFilterCount={activeFilterCount} resultCount={filtered.length}/>
      {selectedOpp&&<DetailModal opp={selectedOpp} onClose={()=>setSelectedOpp(null)} isMobile={true}/>}
    </div>
  );

  // ── DESKTOP LAYOUT ────────────────────────────────────────────────────────
  return(
    <div style={{background:C.paper,minHeight:'100vh'}}>
      <Gf/>
      {/* Topbar */}
      <div className="np" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 1px 6px rgba(0,0,0,0.05)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <Logo height={20} variant="dark"/>
          <div style={{width:'1px',height:'16px',background:C.border}}/>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted}}>Opportunity Database</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <a href="#" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none'}}>Members →</a>
          <a href="#" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none'}}>Apply →</a>
        </div>
      </div>
      {/* Cover */}
      <div style={{background:C.ink,padding:'56px 64px 48px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(184,217,53,0.6)',marginBottom:'12px'}}>BRIDGE Intelligence · Ghana Opportunity Database</div>
          <h1 style={{fontFamily:F.display,fontSize:'clamp(28px,5vw,52px)',fontWeight:900,color:C.paper,lineHeight:1.1,marginBottom:'12px'}}>174+ Mapped Opportunities.<br/>One Searchable Interface.</h1>
          <div style={{fontFamily:F.body,fontSize:'15px',color:'rgba(250,248,243,0.5)',lineHeight:1.75,maxWidth:'560px',marginBottom:'32px',fontWeight:300}}>Every BRIDGE-identified investment opportunity across all 12 sectors — filterable by capital range, BRIDGE Impact Score™, stage, and region.</div>
          <div style={{display:'flex',gap:'0',flexWrap:'wrap',borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:'28px'}}>
            {[[OPPORTUNITIES.length+'+','Opportunities'],['12','Sectors'],['$135–259M','Portfolio Range'],[Math.round(OPPORTUNITIES.reduce((s,o)=>s+o.score,0)/OPPORTUNITIES.length),'Avg Score']].map(([v,l],i)=>(
              <div key={l} style={{paddingRight:'32px',marginRight:'32px',borderRight:i<3?'1px solid rgba(255,255,255,0.08)':'none',marginBottom:'12px'}}>
                <div style={{fontFamily:F.mono,fontSize:'32px',fontWeight:500,color:C.lime,lineHeight:1}}>{v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.28)',marginTop:'5px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Desktop filter bar */}
      <div style={{background:C.paperDark,borderBottom:`1px solid ${C.border}`,padding:'14px 64px',position:'sticky',top:'43px',zIndex:98,boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div style={{display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap'}}>
            <div style={{position:'relative',flex:'1 1 220px',minWidth:'180px',maxWidth:'340px'}}>
              <Search size={13} color={C.faint} style={{position:'absolute',left:'10px',top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}}/>
              <input className="db-search" value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search opportunities, sectors, tags…"
                style={{width:'100%',padding:'9px 32px 9px 32px',fontFamily:F.sans,fontSize:'12px',color:C.ink,background:C.paper,border:`1px solid ${C.border}`}}/>
              {search&&<button onClick={()=>setSearch('')} style={{position:'absolute',right:'8px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:C.faint,display:'flex',padding:0}}><X size={12}/></button>}
            </div>
            <button onClick={()=>setFiltersOpen(o=>!o)} style={{display:'flex',alignItems:'center',gap:'6px',padding:'9px 14px',
              background:filtersOpen?C.forest:'transparent',border:`1px solid ${filtersOpen?C.forest:C.border}`,
              cursor:'pointer',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:filtersOpen?C.paper:C.muted,flexShrink:0}}>
              <Filter size={12}/> Filters
              {activeFilterCount>0&&<span style={{background:C.lime,color:C.ink,borderRadius:'10px',padding:'1px 7px',fontSize:'9px',fontWeight:800}}>{activeFilterCount}</span>}
              <ChevronDown size={12} style={{transform:filtersOpen?'rotate(180deg)':'none',transition:'transform 0.2s'}}/>
            </button>
            <div style={{display:'flex',alignItems:'center',gap:'6px',marginLeft:'auto',flexShrink:0}}>
              <span style={{fontFamily:F.sans,fontSize:'10px',color:C.faint}}>Sort:</span>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,background:'transparent',border:`1px solid ${C.border}`,padding:'7px 10px',cursor:'pointer',outline:'none'}}>
                <option value="score">By Score ↓</option>
                <option value="capital-asc">Capital ↑</option>
                <option value="capital-desc">Capital ↓</option>
              </select>
            </div>
          </div>
          {/* Active chips — shown when panel is closed */}
          {!filtersOpen&&activeFilterCount>0&&(
            <div className="chip-strip">
              {activeSector&&(()=>{const s=SECTORS_META.find(x=>x.id===activeSector);return(<span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:C.forest,color:C.paper,padding:'4px 10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700}}>{s.num} {s.shortName}<button onClick={()=>setActiveSector(null)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.6)',display:'flex',padding:0}}><X size={10}/></button></span>);})()}
              {activeTier&&<span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:C.forest,color:C.paper,padding:'4px 10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700}}>{activeTier}<button onClick={()=>setActiveTier(null)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.6)',display:'flex',padding:0}}><X size={10}/></button></span>}
              {activeStage&&<span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:C.forest,color:C.paper,padding:'4px 10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700}}>{activeStage}<button onClick={()=>setActiveStage(null)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.6)',display:'flex',padding:0}}><X size={10}/></button></span>}
              {activeCapital&&<span style={{display:'inline-flex',alignItems:'center',gap:'5px',background:C.forest,color:C.paper,padding:'4px 10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700}}>{activeCapital}<button onClick={()=>setActiveCapital(null)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.6)',display:'flex',padding:0}}><X size={10}/></button></span>}
            </div>
          )}
          {/* Slide-down filter panel */}
          <div className={`filter-panel${filtersOpen?' open':''}`}>
            <div style={{paddingTop:'16px',display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'8px'}}>Sector</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                  {SECTORS_META.map(s=><FilterPillDesk key={s.id} label={`${s.num} ${s.shortName}`} active={activeSector===s.id} onClick={()=>setActiveSector(activeSector===s.id?null:s.id)}/>)}
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
                {[
                  ['Tier',['Core','Emerging','Exploratory'],activeTier,setActiveTier],
                  ['Stage',['Active','Seed','Concept'],activeStage,setActiveStage],
                  ['Capital',CAPITAL_RANGES.map(r=>r.label),activeCapital,setActiveCapital],
                ].map(([label,opts,active,setter])=>(
                  <div key={label}>
                    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'8px'}}>{label}</div>
                    <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
                      {opts.map(o=><FilterPillDesk key={o} label={o} active={active===o} onClick={()=>setter(active===o?null:o)}/>)}
                    </div>
                  </div>
                ))}
              </div>
              {activeFilterCount>0&&<button onClick={clearAll} style={{alignSelf:'flex-start',background:'none',border:'none',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.red,cursor:'pointer',display:'flex',alignItems:'center',gap:'4px',padding:0}}><X size={10}/> Clear all</button>}
            </div>
          </div>
        </div>
      </div>
      {/* Results */}
      <div style={{padding:'36px 64px 56px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
            <div style={{display:'flex',alignItems:'baseline',gap:'8px'}}>
              <span style={{fontFamily:F.mono,fontSize:'28px',fontWeight:700,color:C.ink,lineHeight:1}}>{filtered.length}</span>
              <span style={{fontFamily:F.sans,fontSize:'12px',color:C.muted}}>{search||activeFilterCount>0?'opportunities match':'opportunities in database'}</span>
            </div>
            {filtered.length>0&&<div style={{fontFamily:F.sans,fontSize:'10px',color:C.faint}}>Avg score: <span style={{fontFamily:F.mono,fontWeight:700,color:C.forest}}>{Math.round(filtered.reduce((s,o)=>s+o.score,0)/filtered.length)}</span></div>}
          </div>
          {filtered.length>0?(
            <div className="opp-grid">
              {filtered.map(opp=><DesktopCard key={opp.id} opp={opp} onClick={setSelectedOpp}/>)}
            </div>
          ):(
            <div style={{padding:'60px 0',textAlign:'center',borderTop:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.mono,fontSize:'48px',fontWeight:500,color:C.border,lineHeight:1,marginBottom:'12px'}}>0</div>
              <div style={{fontFamily:F.display,fontSize:'18px',color:C.muted,marginBottom:'8px',fontStyle:'italic'}}>No results match those filters.</div>
              <button onClick={clearAll} style={{background:C.forest,border:'none',fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,cursor:'pointer',padding:'10px 20px',marginTop:'8px'}}>Reset filters</button>
            </div>
          )}
        </div>
      </div>
      {/* Members gate */}
      <div style={{background:C.ink,overflow:'hidden'}}>
        <div style={{borderBottom:'1px solid rgba(255,255,255,0.07)',padding:'56px 64px'}}>
          <div style={{maxWidth:'900px',margin:'0 auto'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(184,217,53,0.5)',marginBottom:'16px'}}>BRIDGE Membership</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,4vw,44px)',fontWeight:900,color:C.paper,lineHeight:1.1,marginBottom:'20px',maxWidth:'680px'}}>You're seeing the map.<br/>Members see the terrain.</h2>
            <div style={{fontFamily:F.body,fontSize:'15px',color:'rgba(250,248,243,0.5)',lineHeight:1.8,fontWeight:300,maxWidth:'560px',marginBottom:'40px'}}>Intelligence membership shows you why each opportunity scores the way it does, what the risks are, how BRIDGE plans to deploy capital, and what the projected returns look like.</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',border:'1px solid rgba(255,255,255,0.08)',alignItems:'stretch'}}>
              <div style={{padding:'28px',borderRight:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'6px'}}>Public Access · Free</div>
                <div style={{fontFamily:F.display,fontSize:'20px',fontWeight:700,color:C.paper,marginBottom:'16px'}}>What You Have Now</div>
                {['Venture names and descriptions','Composite BRIDGE Score','Capital range and stage','Tier classification','Sector and region tags'].map(item=>(
                  <div key={item} style={{display:'flex',alignItems:'center',gap:'10px',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                    <span style={{color:'rgba(255,255,255,0.25)',fontSize:'11px',flexShrink:0}}>–</span>
                    <span style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.4)'}}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{padding:'28px',background:'rgba(184,217,53,0.04)',cursor:rightExpanded?'default':'pointer'}}
                onClick={!rightExpanded?()=>setRightExpanded(true):undefined}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'6px'}}>Member Access · $250 / Year</div>
                <div style={{fontFamily:F.display,fontSize:'20px',fontWeight:700,color:C.paper,marginBottom:'16px'}}>Everything Above, Plus:</div>
                {[['Full score breakdown','4 dimensions, 12 sub-scores'],['Investment thesis','BRIDGE\'s full rationale'],['Risk matrix','Probability × impact × mitigation'],['Deployment parameters','IRR targets, structure, horizon'],['Cross-sector maps','Linkages across 12 sectors'],['Pipeline stage','Screening → Due Diligence → Committee']].map(([t,s],i)=>(
                  <div key={t} style={{display:'flex',alignItems:'flex-start',gap:'10px',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)',overflow:'hidden',maxHeight:!rightExpanded&&i>=3?'0':'80px',opacity:!rightExpanded&&i>=3?0:1,transition:'max-height 0.35s ease,opacity 0.3s ease'}}>
                    <span style={{color:C.lime,fontSize:'11px',flexShrink:0,marginTop:'2px'}}>✓</span>
                    <div><div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>{t}</div><div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.3)',marginTop:'1px'}}>{s}</div></div>
                  </div>
                ))}
                {!rightExpanded&&<div style={{marginTop:'14px',display:'flex',alignItems:'center',gap:'6px',color:C.lime}}><span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700}}>See all 6 features</span><span>↓</span></div>}
              </div>
            </div>
          </div>
        </div>
        <div style={{padding:'48px 64px'}}>
          <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'1.1fr 1fr',gap:'56px',alignItems:'start'}}>
            <div>
              <div style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,34px)',fontWeight:900,color:C.paper,lineHeight:1.2,marginBottom:'18px'}}>Full member access. Every sector. $250 a year.</div>
              <div style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.5)',lineHeight:1.85,fontWeight:300,marginBottom:'28px'}}>Less than a single professional research report — for a continuously updated, fully scored, analyst-backed view of Ghana's entire investable economy.</div>
              <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'16px',marginBottom:'28px'}}>
                <div style={{fontFamily:F.display,fontSize:'14px',fontStyle:'italic',color:'rgba(184,217,53,0.7)',lineHeight:1.6}}>"For diaspora investors, the challenge has never been willingness — it's been reliable intelligence. BRIDGE solves that."</div>
                <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.25)',marginTop:'6px'}}>— BRIDGE Investment Framework, 2026</div>
              </div>
              <a href="#" style={{background:C.lime,color:C.ink,padding:'15px 32px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'8px'}}>Join BRIDGE · $250/yr <ArrowUpRight size={14}/></a>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {[{tier:'Public',price:'Free',desc:'Venture names, scores, and capital ranges. The map.',current:true,hi:false},{tier:'Member',price:'$250 / yr',desc:'Full database intelligence, score breakdowns, risk matrices, theses, deployment parameters, co-investment access, and direct BRIDGE team engagement.',current:false,hi:true}].map((t,i)=>(
                <div key={t.tier} style={{padding:'18px 20px',background:t.hi?'rgba(184,217,53,0.06)':'rgba(255,255,255,0.02)',border:t.hi?`1px solid rgba(184,217,53,0.25)`:'1px solid rgba(255,255,255,0.07)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'6px'}}>
                    <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:800,color:t.hi?C.lime:'rgba(255,255,255,0.5)'}}>{t.tier}</span>
                    <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:t.hi?C.lime:'rgba(255,255,255,0.3)'}}>{t.price}</span>
                  </div>
                  <div style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(255,255,255,0.35)',lineHeight:1.6}}>{t.desc}</div>
                  {t.current&&<div style={{marginTop:'6px',fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.2)',letterSpacing:'1px',textTransform:'uppercase'}}>You are here</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div style={{background:C.ink,padding:'16px 64px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Logo height={18} variant="white"/>
        <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.25)',letterSpacing:'1px'}}>BRIDGE PBC · 2026</span>
      </div>
      {selectedOpp&&<DetailModal opp={selectedOpp} onClose={()=>setSelectedOpp(null)} isMobile={false}/>}
    </div>
  );
}
