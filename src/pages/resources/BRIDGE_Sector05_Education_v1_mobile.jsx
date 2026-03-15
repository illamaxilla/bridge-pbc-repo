import { useState, useEffect, useRef } from "react";
import React from "react";

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF',teal:'#2E5A4D'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};
const RISK_COLOR={LOW:C.positive,MEDIUM:C.amber,HIGH:C.red,'LOW-MED':C.amber};
const MODE_BG={'Direct Op':C.forest,'Partnership':C.amber,'Investment':C.teal,'Guidance':C.paperDark,'Network':C.ink};
const MODE_TX={'Direct Op':C.lime,'Partnership':C.white,'Investment':C.paper,'Guidance':C.muted,'Network':'rgba(250,248,243,0.6)'};

/* ═══ SECTOR DATA ════════════════════════════════════════════════════════ */
const S={
  num:'05',name:'Education & Skills Development',tier:'Emerging',score:74,capital:'$14–28M',edition:'March 2026 Edition',
  tagline:'Ghana\'s university graduates face 22.3% unemployment — higher than every other education level. The answer is not more schooling. It is better alignment between credentials, skills, and the economy that needs both.',
  stats:[{l:'Primary Enrollment Rate',v:'86%'},{l:'Graduate Unemployment',v:'22.3%'},{l:'Skills from Apprenticeship',v:'80–90%'},{l:'Ghana Skills Fund',v:'$200M'}],
  scoreDims:[{d:'Market Opportunity',w:'30%',s:72},{d:'Development Impact',w:'30%',s:84},{d:'Implementation Feasibility',w:'25%',s:68},{d:'Financial Sustainability',w:'15%',s:71}],
  snapshot:[{l:'Tier',v:'Emerging'},{l:'Score',v:'74/100'},{l:'Priority',v:'Phase 1 ready — 2026'},{l:'Portfolio Range',v:'$14–28M'},{l:'Timeline',v:'2026–2030'},{l:'Ventures Identified',v:'18'}],
  summary:'Ghana\'s education system invests enormously and returns inadequate outcomes. Primary enrollment reaches 86%. Secondary and tertiary access has expanded rapidly through Free SHS. By the metrics of access, the system is succeeding. By the metrics of outcome — employment, income, economic mobility — it is failing the very students it is educating. University graduates face 22.3% unemployment, the highest rate of any education level in the country.',
  summary2:'BRIDGE\'s education thesis does not start with infrastructure. It starts with the alignment gap. The Ghanaian economy runs on informal apprenticeship — 80–90% of workforce skills are acquired outside any formal recognition system. Meanwhile the formal TVET system, which delivers better employment outcomes than university, enrolls only 50,000 students against industry demand for 280,000+ trained workers annually. The bottleneck is not effort — it is structure.',
  summary3:'The Ghana Skills Development Fund — a $200M World Bank facility — creates the co-financing architecture BRIDGE\'s education portfolio is designed to operate within. BRIDGE capital of $14–28M, leveraged against the Skills Fund, delivers a 1:3–5× multiplier across 18 employment-linked ventures. Every venture in Tier 1 is designed to end with a job, not just a certificate.',
  quote:'"The formal education system produces graduates misaligned with labor market needs while the informal apprenticeship system — delivering 80–90% of economically-used skills — operates without recognition, certification, or quality assurance. The solution is not more schooling. It is better alignment."',

  subs:[
    {name:'TVET & Skills Training',score:81,stage:'Phase 1 Ready',capital:'$3–5M',note:'50K enrolled vs 280K+ annual industry need; Skills Fund co-financing'},
    {name:'Employment-Linked Bootcamps',score:78,stage:'Phase 1 Ready',capital:'$2–4M',note:'8–16 week intensive; ends with guaranteed placement pathway'},
    {name:'Apprenticeship Recognition',score:75,stage:'Phase 1 Ready',capital:'$1–2M',note:'1.5M informal learners; NVTI/COTVET certification pathway'},
    {name:'Scholarship & Talent Retention',score:71,stage:'Early',capital:'$3–6M',note:'Service-linked bonds; diaspora co-funding; brain drain prevention'},
    {name:'EdTech & Digital Learning',score:65,stage:'Seed',capital:'$2–4M',note:'Adaptive learning, career platforms; 72% ICT demand unmet'},
  ],

  constraints:[
    {c:'Credential-Employment Mismatch',harm:'University graduates face 22.3% unemployment — the worst of any education level. Academic curricula designed for knowledge production, not labour market readiness. Employers consistently report graduates lack practical skills.'},
    {c:'TVET Social Stigma',harm:'TVET is widely perceived as a consolation prize for those who failed academic pathways. Despite TVET graduates outperforming SHS completers on employment metrics, parents and students continue to avoid the pathway that works.'},
    {c:'Skills Recognition Gap',harm:'An estimated 1.5 million Ghanaians are learning trades through informal apprenticeship with no formal credential, no verification that employers can use, and no pathway into the formal economy — regardless of skill level.'},
    {c:'Infrastructure Deficit',harm:'Only 25% of primary schools have electricity. 15% have ICT labs. 31% of early childhood teachers are certified. Digital skills programs must build on a device and connectivity gap at every level of the system.'},
    {c:'Curriculum Irrelevance',harm:'TVET institutions with outdated equipment produce graduates employers will not hire. The equipment gap between what is taught and what is used on day one is as damaging as the skills gap itself — a structural quality barrier, not just a funding problem.'},
    {c:'Brain Drain Pressure',harm:'Ghana trains graduates who leave within years of certification. Without retention mechanisms — service bonds, diaspora mentorship networks, and local career pathways — the education investment accrues to receiving countries, not Ghana.'},
  ],

  cropLoss:[
    {crop:'No Formal Education',cur:6.2,tgt:null,note:'Informal work absorbs non-credentialed labour at functional employment rates'},
    {crop:'Primary / JHS',cur:9.4,tgt:null,note:'Basic credential provides marginal employment signal; informal sector absorption'},
    {crop:'TVET Graduate',cur:8.1,tgt:4.5,note:'Practical skills outperform SHS and university despite persistent social stigma'},
    {crop:'SHS Completion',cur:11.2,tgt:null,note:'Academic track; limited vocational skills; significant university pathway mismatch'},
    {crop:'University Graduate',cur:22.3,tgt:9.0,note:'Highest education investment; worst unemployment outcome in the system'},
  ],

  zones:[
    {zone:'Northern Regions',regions:'Northern, Upper East, Upper West, Savannah, N-East',crops:'Agriculture, construction, manufacturing TVET',alloc:30,allocLabel:'30%',color:C.lime,interventions:'TVET access is lowest; Skills Bootcamp deployment for agricultural and construction trades; service-linked scholarships for Northern students',context:'Highest geographic inequality in education access; lowest digital infrastructure; BRIDGE agriculture sector demand creates immediate employment pipelines'},
    {zone:'Middle Belt',regions:'Bono, Ahafo, Brong East, Ashanti',crops:'Manufacturing, agri-processing, commercial trades',alloc:25,allocLabel:'25%',color:C.amber,interventions:'TVET Centres of Excellence siting; employer engagement with manufacturing and agri-processing sector; Equipment Modernisation Fund priority zone',context:'Strong manufacturing and processing corridor aligning with BRIDGE sectors 06 and 11; higher TVET institution density than North'},
    {zone:'Greater Accra & South',regions:'Greater Accra, Central, Volta south',crops:'ICT, digital, financial, services',alloc:30,allocLabel:'30%',color:C.teal,interventions:'Digital Skills Programme; EdTech platform deployment; Employer Engagement Platform; Diaspora Mentorship Network hub',context:'Highest employer density; ICT sector demand 72% unmet; digital skills graduates have immediate placement pathways into BRIDGE technology sector'},
    {zone:'Western & Coastal',regions:'Western, Western North, Central coast',crops:'Oil and gas, blue economy, tourism',alloc:15,allocLabel:'15%',color:C.muted,interventions:'Technical trades for extractive sector; hospitality bootcamps; Phase 2 activation conditioned on regional employer partnership confirmation',context:'Specialized sector demand; BRIDGE tourism (Sector 09) and energy (Sector 10) operations create employer pipeline for targeted bootcamp cohorts'},
  ],

  competitors:[
    {name:'MEST / Meltwater',focus:'Tech entrepreneurship, coding',stage:'Established',bridge:'Complementary — EdTech fund co-investment target; graduates feed into BRIDGE Tech sector'},
    {name:'Mastercard Foundation',focus:'Secondary and university access, youth employment',stage:'Active (DKM)',bridge:'Co-financing partner — Skills Fund layering; mentorship programme support; aligned on employment outcomes'},
    {name:'COTVET',focus:'National TVET coordination, competency standards',stage:'Government body',bridge:'Essential partner — BRIDGE TVET certifications operate within COTVET framework; regulatory legitimacy'},
    {name:'NVTI',focus:'Vocational training, national certification',stage:'Government body',bridge:'Apprenticeship recognition partner — NVTI issues the credentials for BRIDGE\'s 1.5M informal learner recognition programme'},
    {name:'Generation Ghana',focus:'Employment-linked bootcamps, employer partnerships',stage:'Operating',bridge:'Comparable model — BRIDGE differentiates through portfolio employer integration and diaspora funding stack'},
    {name:'Ashesi University',focus:'Liberal arts + engineering; values-based education',stage:'Established',bridge:'Not competitive — different tier and mission; diaspora mentorship network potential collaboration'},
  ],

  budgetItems:[
    {item:'Ghana Skills Development Fund',ghc:'$200M World Bank',usd:'Active facility',pct:90,mode:'Direct co-financing partnership — BRIDGE multiplier vehicle',urgency:'IMMEDIATE',featured:true},
    {item:'Free SHS Programme',ghc:'GH₵2.1B+',usd:'~$140M equivalent',pct:70,mode:'Government anchor — creates secondary enrollment pipeline for TVET transition',urgency:'ONGOING'},
    {item:'COTVET / NVTI Operations',ghc:'GH₵320M',usd:'~$21M',pct:40,mode:'Regulatory & certification partner — Apprenticeship Recognition System backbone',urgency:'Phase 1'},
    {item:'Technical University Network',ghc:'GH₵850M',usd:'~$56M',pct:35,mode:'TVET Centres of Excellence co-siting opportunity',urgency:'Phase 2'},
    {item:'National Service Scheme',ghc:'GH₵180M',usd:'~$12M',pct:25,mode:'Service-Linked Scholarship bond model parallel structure',urgency:'Design Phase'},
    {item:'Education Infrastructure Fund',ghc:'GH₵450M',usd:'~$30M',pct:20,mode:'Equipment Modernisation Fund government co-financing channel',urgency:'Phase 1–2'},
  ],

  oilPalm:[
    {f:'Fund name',t:'Ghana Skills Development Fund (GSDF)'},
    {f:'Funding source',t:'World Bank — $200M International Development Association'},
    {f:'BRIDGE co-financing requirement',t:'Minimum 20% private co-investment for TVET infrastructure ventures'},
    {f:'Leverage ratio',t:'1:3–5× for qualifying TVET partnership ventures'},
    {f:'Eligible interventions',t:'TVET curriculum upgrade, employer co-design, competency-based assessment systems'},
    {f:'Application window',t:'Rolling — priority assessment Q2 2026 for Phase 1 ventures'},
    {f:'Technical assistance',t:'Available alongside capital — curriculum design, employer engagement frameworks'},
  ],

  roadmap:[
    {name:'Skills Bootcamps',s:0,e:30,tier:1},
    {name:'TVET Partnership Prog.',s:0,e:42,tier:1},
    {name:'Service-Linked Scholarships',s:5,e:45,tier:1},
    {name:'Diaspora Mentorship Net.',s:0,e:20,tier:1},
    {name:'Apprenticeship Recognition',s:10,e:42,tier:1},
    {name:'Digital Skills Programme',s:5,e:38,tier:1},
    {name:'Equipment Modernisation',s:15,e:55,tier:1},
    {name:'EdTech Investment Fund',s:40,e:68,tier:2},
    {name:'Diaspora Teaching Fellow.',s:30,e:58,tier:2},
    {name:'TVET Teacher Development',s:35,e:65,tier:2},
    {name:'Career Guidance Platform',s:25,e:52,tier:2},
    {name:'TVET Scholarships',s:20,e:62,tier:2},
    {name:'Employer Engagement Plat.',s:35,e:65,tier:2},
    {name:'Outcome Tracking System',s:10,e:80,tier:2},
    {name:'TVET Centres of Excellence',s:50,e:85,tier:3},
    {name:'Regional TVET Expansion',s:70,e:100,tier:3},
  ],

  coInvestors:[
    {name:'Ghana Skills Development Fund',type:'Concessional Grant',focus:'TVET infrastructure, employer co-design, competency standards, quality assurance systems',alignment:'Phase 1 direct — all TVET partnership ventures; 1:3–5× leverage',capital:'$200M (World Bank IDA)',stage:'Active in Ghana'},
    {name:'MasterCard Foundation',type:'Grant / TA',focus:'Youth employment, skills training, secondary-to-TVET transition programmes across Africa',alignment:'Phase 1 bootcamps and scholarships',capital:'$50–100M range (Ghana focus)',stage:'Active programme'},
    {name:'USAID Ghana',type:'Grant + TA',focus:'Workforce development, TVET quality improvement, youth employment programming',alignment:'Phase 1 TVET partnerships',capital:'$5–15M',stage:'Active in Ghana'},
    {name:'GIZ Skills Programme',type:'Technical Assistance',focus:'TVET curriculum standards, industry engagement frameworks, instructor development systems',alignment:'Phase 1 quality systems design',capital:'Technical TA',stage:'Active in Ghana'},
    {name:'COTVET / NVTI',type:'Government Partner',focus:'National competency standards, TVET regulatory authority, apprenticeship certification mandate',alignment:'All phases — regulatory and credentialing backbone',capital:'Institutional authority',stage:'Mandated government body'},
    {name:'African Development Bank',type:'Concessional Loan',focus:'Education infrastructure, skills for industrialisation across Africa, TVET quality',alignment:'Phase 2–3 Centres of Excellence',capital:'$10–50M',stage:'Active in West Africa'},
  ],

  benchmarks:[
    {country:'Ghana — University Graduate',pct:78,highlight:'red',note:'Employment rate within 12 months — 22.3% experience unemployment spells post-graduation'},
    {country:'Ghana — TVET Graduate',pct:92,highlight:false,note:'Better employment outcome than university despite persistent social stigma'},
    {country:'Kenya',pct:85,highlight:false,note:'TVET-to-employment pipeline with industrial attachment programmes'},
    {country:'South Korea',pct:91,highlight:false,note:'Dual-track system with employer co-design and guaranteed internship year'},
    {country:'Germany',pct:97,highlight:false,note:'Apprenticeship-to-employment pipeline — world-leading dual system'},
    {country:'Ghana — BRIDGE Bootcamp Target',pct:96,highlight:'lime',note:'Employment-linked model: training cohort guaranteed placement pathway before enrollment'},
  ],

  marketSizes:[
    {crop:'Skills Bootcamp Services',tam:'$180M+',note:'Employment-linked training market; corporate training + government skills contracts; employer co-funding',accessible:'$18–32M',growth:'+15%/yr',phase:1,priority:'IMMEDIATE'},
    {crop:'TVET Partnership Programme',tam:'$280M',note:'Annual industry training need — 280K+ workers required; current formal TVET capacity 50K',accessible:'$28–45M',growth:'+12%/yr',phase:1,priority:'IMMEDIATE'},
    {crop:'Apprenticeship Recognition',tam:'$95M',note:'Assessment and certification market for 1.5M informal apprentices over 5-year rollout',accessible:'$12–20M',growth:'+18%/yr',phase:1,priority:'HIGH'},
    {crop:'Scholarship Programme',tam:'$85M',note:'Diaspora co-funded scholarship flow; service bond management; talent retention infrastructure',accessible:'$8–15M',growth:'+10%/yr',phase:1,priority:'HIGH'},
    {crop:'EdTech Platform Market',tam:'$340M',note:'Ghana+West Africa edtech — adaptive learning, skills assessment, career platform, corporate training',accessible:'$20–35M',growth:'+22%/yr',phase:2,priority:'MEDIUM'},
    {crop:'TVET Centre Infrastructure',tam:'$120M',note:'Flagship institution investment; Equipment Modernisation; curriculum co-design capital',accessible:'$15–28M',growth:'+8%/yr',phase:3,priority:'MEDIUM'},
  ],

  coopTiers:[
    {tier:'Tier 1 — TVET-Ready Institutions',count:'8–12',zone:'Major urban centres and regional capitals',desc:'Existing regulatory license, enrolled student base, and leadership quality. Immediate BRIDGE TVET Partnership Programme candidates. Equipment modernisation unlocks within 6 months.',color:'positive'},
    {tier:'Tier 2 — Development-Stage',count:'25–35',zone:'Secondary cities; peri-urban',desc:'Functioning institutions with curriculum gaps and equipment deficits. BRIDGE co-design programme unlocks within 12–18 months. Regional employer access confirmed.',color:'amber'},
    {tier:'Tier 3 — Infrastructure-Needs',count:'50+',zone:'Northern regions; rural districts',desc:'Communities with expressed training need but insufficient institutional infrastructure. Phase 3 activation — conditioned on Centres of Excellence model validated.',color:'faint'},
  ],

  eudrItems:[
    {date:'2023',event:'Ghana Skills Development Fund activated',type:'PAST',note:'World Bank $200M IDA facility launched — TVET infrastructure co-financing available'},
    {date:'2024',event:'COTVET competency framework revised',type:'PAST',note:'National occupational standards updated for construction, digital, and health sectors'},
    {date:'Q1 2026',event:'BRIDGE TVET Partnership assessment',type:'BRIDGE',note:'Institution scoring, employer partnerships confirmed, Phase 1 shortlist finalised'},
    {date:'Q2 2026',event:'Skills Fund co-financing application',type:'CRITICAL',note:'Priority assessment window — Phase 1 ventures require Q2 submission for 2026 deployment'},
    {date:'2027+',event:'Apprenticeship Recognition System live',type:'FUTURE',note:'1.5M informal learner certification pipeline open — national credential recognised by formal employers'},
  ],

  ventures:[
    {n:'01',name:'Skills Bootcamps',mode:'Direct Op',cap:'$2–4M',risk:'LOW',score:44,irr:'TBD',payback:'—',start:'Q3 2026',tier:1,desc:'Intensive 8–16 week training in high-demand trades — construction, digital, health support, agri-processing, hospitality — each ending with a guaranteed placement pathway into BRIDGE portfolio companies or partner employers. Employment-linked by design: no credential without a job offer. Targets 2,000+ graduates in Phase 1.'},
    {n:'02',name:'TVET Partnership Programme',mode:'Partnership',cap:'$3–5M',risk:'MEDIUM',score:41,irr:'TBD',payback:'—',start:'Q3 2026',tier:1,desc:'Strategic partnerships with 5–8 existing TVET institutions — upgrading curriculum to industry standards, co-designing modules with BRIDGE portfolio employers, and creating work-placement pipelines. Uses Ghana Skills Development Fund co-financing to multiply BRIDGE capital 3–5×. Activates existing institutions without building new infrastructure.'},
    {n:'03',name:'Service-Linked Scholarships',mode:'Direct Op',cap:'$3–6M',risk:'MEDIUM',score:40,irr:'Social',payback:'—',start:'Q4 2026',tier:1,desc:'Scholarships for university and TVET students tied to 2–3 year service commitments in underserved regions or BRIDGE portfolio ventures. Addresses brain drain at source. Diaspora co-funding model: every BRIDGE scholarship attracts diaspora matching contributions. Targets 500+ scholars in Phase 1.'},
    {n:'04',name:'Diaspora Mentorship Network',mode:'Direct Op',cap:'$400–700K',risk:'LOW',score:40,irr:'Social',payback:'—',start:'Q3 2026',tier:1,desc:'Structured virtual mentorship connecting 1,000+ Ghanaian students and early-career professionals with diaspora professionals in matched industries. Monthly sessions, career guidance, job referrals, and skill development. Lowest cost-per-beneficiary in the portfolio.'},
    {n:'05',name:'Apprenticeship Recognition',mode:'Partnership',cap:'$1–2M',risk:'LOW',score:39,irr:'Social',payback:'—',start:'Q4 2026',tier:1,desc:'Competency-based assessment and national certification for Ghana\'s 1.5 million informal apprentices — bringing 80–90% of the workforce\'s skill base into a recognised credential system for the first time. Partnership with NVTI and COTVET. Transforms existing knowledge into portable, verifiable credentials.'},
    {n:'06',name:'Digital Skills Programme',mode:'Direct Op',cap:'$1.5–2.5M',risk:'LOW',score:39,irr:'TBD',payback:'—',start:'Q4 2026',tier:1,desc:'Foundational and intermediate digital skills training delivered through BRIDGE market hubs and TVET partner institutions — targeting market traders, MSME owners, and young professionals. Directly addresses the 72% of ICT demand not met by current supply. Graduates become users and operators of the Kejetia Digital Platform.'},
    {n:'07',name:'Equipment Modernisation Fund',mode:'Partnership',cap:'$1.5–2.5M',risk:'MEDIUM',score:38,irr:'Social',payback:'—',start:'Q1 2027',tier:1,desc:'Equipment grants and co-financing for TVET partner institutions — replacing outdated machinery with industry-current tools. TVET institutions with obsolete equipment produce graduates employers will not hire. Co-financed through Ghana Skills Development Fund and diaspora in-kind contributions.'},
    {n:'08',name:'EdTech Investment Fund',mode:'Investment',cap:'$2–4M',risk:'MEDIUM',score:37,irr:'12–18%',payback:'5yr',start:'2028',tier:2,desc:'Minority equity stakes in 3–5 Ghanaian EdTech companies extending BRIDGE\'s reach into adaptive learning, skills assessment, career platforms, and corporate training. Integrated with BRIDGE Technology sector portfolio — EdTech companies serving BRIDGE TVET partners receive immediate distribution and user feedback.'},
    {n:'09',name:'Diaspora Teaching Fellowship',mode:'Direct Op',cap:'$500K–1M',risk:'LOW',score:37,irr:'Social',payback:'—',start:'2028',tier:2,desc:'Structured 3–12 month teaching placements for diaspora professionals in BRIDGE-partner TVET institutions and Skills Bootcamp programmes. Diaspora instructors bring industry-current knowledge, international standards, and professional networks that full-time TVET instructors typically lack.'},
    {n:'10',name:'TVET Teacher Development',mode:'Partnership',cap:'$500K–1M',risk:'MEDIUM',score:36,irr:'Social',payback:'—',start:'2028',tier:2,desc:'Industry placement programmes, certification upgrades, and professional development for TVET instructors — the single highest-leverage quality improvement in the TVET system. Partners with Ghana Education Service and COTVET; uses diaspora industry professionals as placement hosts.'},
    {n:'11',name:'Career Guidance Platform',mode:'Direct Op',cap:'$200–400K',risk:'LOW',score:36,irr:'Social',payback:'—',start:'2028',tier:2,desc:'Digital platform providing career pathway information, skills-to-job mapping, and labour market data for SHS and TVET students. Addresses the root cause of TVET stigma: parents and students avoid TVET because they cannot see clear career pathways from it.'},
    {n:'12',name:'TVET Scholarships',mode:'Direct Op',cap:'$1–2M',risk:'LOW',score:36,irr:'Social',payback:'—',start:'2028',tier:2,desc:'Targeted scholarships for high-potential students who choose TVET over academic pathways — combined with mentorship, employer connections, and service commitments. Counter-programmes the social stigma by creating visible TVET success stories.'},
    {n:'13',name:'Employer Engagement Platform',mode:'Direct Op',cap:'$300–500K',risk:'LOW',score:35,irr:'Social',payback:'—',start:'2028',tier:2,desc:'Digital marketplace connecting TVET graduates and Skills Bootcamp completers with BRIDGE portfolio companies and partner employers. Closes the information asymmetry that keeps qualified TVET graduates unemployed.'},
    {n:'14',name:'Industry Mentorship Programme',mode:'Partnership',cap:'$300–500K',risk:'LOW',score:34,irr:'Social',payback:'—',start:'2028',tier:2,desc:'Sector-specific mentorship linking TVET students with working professionals in their target industry. Builds the social capital and professional networks that university graduates acquire through alumni systems but TVET graduates have never had access to.'},
    {n:'15',name:'TVET Digital Content Library',mode:'Direct Op',cap:'$500K–1M',risk:'MEDIUM',score:33,irr:'Social',payback:'—',start:'2028',tier:2,desc:'Ghana-specific digital curriculum for TVET core trades — video instruction, assessments, and reference materials aligned to NVTI standards. Diaspora industry professionals contribute domain expertise; BRIDGE funds production and distribution.'},
    {n:'16',name:'Outcome Tracking System',mode:'Direct Op',cap:'$200–400K',risk:'LOW',score:33,irr:'Social',payback:'—',start:'2028',tier:2,desc:'Employment and earnings tracking for all BRIDGE Skills Bootcamp and TVET programme graduates — generating the evidence base that justifies TVET investment to government, donors, and employers. Every outcome tracked is also a marketing asset.'},
    {n:'17',name:'TVET Centres of Excellence',mode:'Partnership',cap:'$4–6M',risk:'MEDIUM',score:33,irr:'Social',payback:'—',start:'2030+',tier:3,desc:'2–3 flagship TVET institutions elevated to industry-leading standard through major equipment investment, curriculum co-design, and diaspora faculty networks — creating reference institutions that demonstrate what TVET at its best produces.'},
    {n:'18',name:'Regional TVET Expansion',mode:'Partnership',cap:'$2–3M',risk:'HIGH',score:30,irr:'Social',payback:'—',start:'2030+',tier:3,desc:'New TVET infrastructure in Northern, Upper East, Upper West, and Savannah regions where TVET access is lowest and skills demand from BRIDGE agricultural and infrastructure programmes is highest. Conditioned on Centres of Excellence model validated.'},
  ],

  risks:[
    {r:'Employer Engagement Gap',sev:'HIGH',mit:'Employment-linked bootcamp design requires employer commitments before cohort enrollment begins. BRIDGE portfolio companies are anchor employers — built-in demand that does not depend on cold outreach to external employers.'},
    {r:'Government Policy Instability',sev:'MEDIUM',mit:'BRIDGE operates within COTVET and NVTI frameworks — government-endorsed certification adds regulatory durability. Skills Fund is World Bank-backed, providing multi-government-cycle continuity above any single administration.'},
    {r:'TVET Stigma Persistence',sev:'MEDIUM',mit:'Career Guidance Platform and TVET Scholarships are specifically designed to shift perception through visible success stories. Employment-linked bootcamp placement rates are the most effective counter-narrative available.'},
    {r:'Brain Drain Acceleration',sev:'MEDIUM',mit:'Service-linked scholarship bond structure creates financial and professional commitment to Ghana before exit pressure builds. Diaspora mentorship network turns potential emigrants into connected in-country professionals.'},
    {r:'Quality Assurance Challenges',sev:'MEDIUM',mit:'Outcome Tracking System creates public, verifiable placement data. BRIDGE does not fund institutions that will not participate in outcome reporting — quality accountability is structural, not voluntary.'},
    {r:'Digital Infrastructure Constraints',sev:'LOW-MED',mit:'Digital Skills Programme and EdTech fund designed with device-access constraints in mind. BRIDGE market hub network provides physical access points. Offline-capable content library for TVET where connectivity is absent.'},
  ],

  thesis:'BRIDGE\'s education thesis is anchored in the alignment logic: the skills the Ghanaian economy actually needs are largely not the ones the formal education system is producing. The highest-conviction interventions are those that close the distance between what is learned and where it is applied — employment-linked bootcamps, TVET partnerships that involve employers in curriculum design, and apprenticeship recognition that credits what 1.5 million people already know.',
  thesis2:'Every other BRIDGE sector brief surfaces a workforce constraint. Infrastructure needs certified tradespeople. Agriculture needs cold chain technicians. Health needs community health workers. Technology needs developers. Education &amp; Skills is where those constraints either get resolved — or compound. When a BRIDGE bootcamp graduate joins a BRIDGE infrastructure project, that is not two separate investments. That is a single, integrated model of Ghanaian economic development working as designed.',


  synergies:[
    {sector:'Infrastructure (01)',link:'Construction and facilities management TVET graduates are the workforce for BRIDGE market construction, WASH hub deployment, and PPP road maintenance. Every infrastructure project has a certified labour requirement — Skills Bootcamp cohorts fill it.'},
    {sector:'Agriculture (06)',link:'Agri-processing, cooperative management, and cold chain operations Skills Bootcamp cohorts feed directly into BRIDGE Sector 06 programmes. Every processing venture needs certified technicians on day one.'},
    {sector:'Health Systems (03)',link:'Community health worker training through Skills Bootcamps extends CHPS reach without requiring full nursing qualifications. Every health hub needs trained community health workers.'},
    {sector:'Technology (04)',link:'Digital Skills Programme graduates are the first users of the Kejetia Digital Platform and the pipeline for BRIDGE Tech Talent Bridge programme. 72% of ICT demand unmet by current supply.'},
    {sector:'Financial Inclusion (02)',link:'Financial literacy integrated into every Skills Bootcamp cohort — graduates who understand their financial products default less, save more, and build assets faster.'},
  ],
  timeline:{
    phase1:{label:'PHASE 1',years:'2026–2027',capital:'$11.4–20.2M',count:'7 ventures',
      items:['Skills Bootcamps — first cohort enrolled Q3 2026','TVET Partnership Programme — 5 institutions onboarded','Service-Linked Scholarships — 500+ scholars Phase 1','Diaspora Mentorship Network — 1,000+ matches activated','Apprenticeship Recognition — NVTI framework live','Digital Skills Programme — 3 market hub locations','Equipment Modernisation Fund — Tier 1 institutions upgraded']},
    phase2:{label:'PHASE 2',years:'2028–2030',capital:'$8.2–16.4M',count:'9 ventures',
      items:['EdTech Investment Fund — 3–5 company stakes','Diaspora Teaching Fellowship — 50+ placements','TVET Teacher Development — 200+ instructors trained','Career Guidance Platform — national launch','TVET Scholarships — 500+ awards','Employer Engagement Platform — live marketplace','Industry Mentorship Programme — 1,000+ matches','TVET Digital Content Library — 20 trade modules','Outcome Tracking System — national coverage']},
    phase3:{label:'PHASE 3',years:'2030+',capital:'$6–9M',count:'2 ventures',
      items:['TVET Centres of Excellence — 2–3 flagship institutions','Regional TVET Expansion — Northern/Upper regions']},
  },
  deploy:[{l:'Ticket size',v:'$200K–$6M per venture'},{l:'Preferred structure',v:'Direct operation + partnership'},{l:'Co-financing',v:'Ghana Skills Development Fund'},{l:'Employment requirement',v:'Placement pathway before enrollment'},{l:'Co-investment',v:'MasterCard Foundation; USAID; GIZ'},{l:'Exit horizon',v:'5–8 years; programme institutionalisation'}],

  fullPackage:[
    {item:'18-Venture Financial Models',desc:'Full 10-year projections — revenue structure, cost per graduate, IRR by venture, Skills Fund co-financing analysis and leverage calculation per intervention'},
    {item:'Skills Bootcamp Programme Design',desc:'Sector-by-sector curriculum, employer partnership commitments, cohort sizing, placement pathway structure, and fee model for each of the 5 trade verticals'},
    {item:'TVET Institution Assessments',desc:'Scoring of 50+ TVET institutions on leadership quality, location advantage, regulatory standing, equipment baseline, and BRIDGE partnership readiness — with Phase 1 shortlist'},
    {item:'Service-Linked Scholarship Structure',desc:'Bond legal framework, diaspora co-funding model, service commitment enforcement mechanism, and matching gift structure — ready for Phase 1 deployment'},
    {item:'Apprenticeship Recognition Rollout',desc:'NVTI/COTVET partnership terms, competency assessment methodology, 1.5M beneficiary phasing plan, and digital credential architecture'},
    {item:'Diaspora Network Recruitment Strategy',desc:'Mentor recruitment channels, platform specifications, matching algorithm, session structure, and diaspora engagement activation playbook'},
    {item:'Equipment Modernisation Trade Lists',desc:'Trade-by-trade equipment inventories — current vs. required benchmarking for each TVET institution in the Phase 1 partner shortlist'},
    {item:'EdTech Landscape Assessment',desc:'20+ Ghana EdTech companies assessed on technology readiness, funding status, BRIDGE partnership potential, and TVET integration capacity'},
    {item:'Career Guidance Platform Architecture',desc:'Data sources, labour market mapping methodology, employer API integrations, and student engagement model — built for NVTI standards alignment'},
    {item:'Outcome Tracking Methodology',desc:'Graduate tracking framework, employer verification process, public reporting standards, and impact measurement protocol for all 18 ventures'},
    {item:'TVET Centre of Excellence Siting Analysis',desc:'Leadership assessment for 5 candidate institutions with capital stack, employer partnership confirmation, and phased build-out plans'},
    {item:'Quarterly Education Sector Intelligence',desc:'Enrollment trends, employer demand shifts, Skills Fund deployment tracking, policy changes — delivered across all 12 sectors every quarter'},
  ],
};

/* ═══ LOGO ═══════════════════════════════════════════════════════════════ */
const Logo=({height=28,variant='white'})=>{
  const tf=variant==='white'?'#ffffff':'#1B4D3E';
  const bk=variant==='white'?'rgba(0,0,0,0.08)':'rgba(27,77,62,0.15)';
  return(
    <svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      {/* Icon — bordered box */}
      <rect fill="none" stroke={tf} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      {/* Icon — diamond layers */}
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
      <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
      {/* BRIDGE wordmark — B shapes */}
      <path fill={tf} stroke={bk} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      <path fill={tf} stroke={bk} strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      {/* R accent bar (lime) */}
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
      {/* I bar */}
      <rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      {/* D letter */}
      <path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      {/* G letter */}
      <path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      {/* E bars */}
      <rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
    </svg>
  );
};

/* ═══ GLOBAL STYLES ══════════════════════════════════════════════════════ */
const Gf=()=>(<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  [id^='sec-'],[id='upsell']{scroll-margin-top:50px;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .dc::first-letter{font-family:${F.display};font-size:4.4em;font-weight:900;float:left;line-height:0.8;margin:0.05em 0.12em 0 0;color:${C.forest};}
  @media print{.np{display:none!important;}}
  .mob-show{display:none;}
  .mob-only{display:none!important;}
  .mob-car{display:none!important;}
  .mob-sec-hdr{display:none!important;}
  .desk-only{display:block;}
  .mob-expand-all{display:none;}
  .fig-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .subs-table{display:block;}
  .subs-cards{display:none;}
  .mob-scroller{display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;scrollbar-width:none;gap:12px;-webkit-overflow-scrolling:touch;padding-bottom:4px;}
  .mob-scroller::-webkit-scrollbar{display:none;}
  .mob-snap-card{flex:0 0 82vw;scroll-snap-align:start;min-width:0;}
  .mob-snap-wide{flex:0 0 92vw;scroll-snap-align:start;min-width:0;}
  .mob-snap-sm{flex:0 0 72vw;scroll-snap-align:start;min-width:0;}
  .car-wrap{position:relative;}
  .car-wrap::after{content:'';position:absolute;top:14px;right:0;width:44px;height:calc(100% - 32px);background:linear-gradient(to right,transparent,${C.paper} 90%);pointer-events:none;z-index:2;}
  .car-wrap-dark::after{background:linear-gradient(to right,transparent,${C.paperDark} 90%);}
  .car-wrap-ink::after{background:linear-gradient(to right,transparent,${C.ink} 90%);}
  .mob-toggle{display:none;width:100%;padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};align-items:center;justify-content:space-between;transition:color 0.15s;}
  .mob-toggle:hover{color:${C.forest};}
  .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
  .mob-toggle-hdr{border-bottom:1px solid rgba(255,255,255,0.08)!important;color:rgba(250,248,243,0.4)!important;}
  .row-hover{transition:background 0.12s ease;}
  .row-hover:hover{background:rgba(184,217,53,0.04)!important;}
  .row-hover-dark:hover{background:rgba(255,255,255,0.035)!important;}
  @keyframes barGrow{from{width:0}to{width:var(--w,100%)}}
  .score-bar{animation:barGrow 1s cubic-bezier(0.16,1,0.3,1) 0.4s both;}
  .score-bar-dim{animation:barGrow 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both;}
  a{transition:opacity 0.15s ease;}
  a:hover{opacity:0.76;}
  button{transition:background 0.15s ease,border-color 0.15s ease,color 0.15s ease;}
  .cta-primary{transition:transform 0.15s ease,box-shadow 0.15s ease!important;}
  .cta-primary:hover{transform:translateY(-1px)!important;box-shadow:0 6px 20px rgba(184,217,53,0.25)!important;}
  .sec-rule{border-top:5px solid ${C.ink};border-bottom:2.5px solid ${C.lime};padding-bottom:4px;margin-bottom:22px;}
  @media(max-width:900px){
    .tc{grid-template-columns:1fr!important;}
    .hm{display:none!important;}
    .g2{grid-template-columns:1fr!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-upsell{padding:40px 32px!important;}
    .pad-footer{padding:14px 32px!important;}
    .pad-topbar{padding:10px 24px!important;}
  }
  @media(max-width:600px){
    .tc{grid-template-columns:1fr!important;}
    .g2{grid-template-columns:1fr!important;}
    .pad-section{padding:22px 16px!important;}
    .pad-cover{padding:18px 16px 0!important;}
    .pad-upsell{padding:22px 16px!important;}
    .pad-footer{padding:14px 16px!important;}
    .pad-topbar{padding:9px 16px!important;}
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .mob-only{display:block!important;}
    .mob-car{display:block!important;}
    .mob-sec-hdr{display:flex!important;}
    .desk-only{display:none!important;}
    .mob-expand-all{display:flex!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}
    .mob-full{width:100%!important;}
    .mob-item-hidden{display:none!important;}
    .mob-toggle{display:flex!important;}
    .subs-table{display:none!important;}
    .subs-cards{display:grid!important;grid-template-columns:1fr 1fr;gap:8px;}
    .footer-links{display:none!important;}
    .footer-inner{justify-content:center!important;}
    .upsell-grid{grid-template-columns:1fr!important;}
    .upsell-cta-row{flex-direction:column!important;}
    .upsell-cta-row a{justify-content:center!important;width:100%!important;}
    .sec-body-hidden{display:none!important;}
    .row-hover:hover{background:inherit!important;}
    .car-wrap::after{width:28px;}
    .stats-row>div{flex:0 0 50%!important;border-left:none!important;border-top:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(2){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(4){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .mob-stat{display:flex!important;}
  }
`}</style>);

/* ═══ FIGURE CAPTION ════════════════════════════════════════════════════ */
const FigCaption=({num,title,note})=>(
  <div style={{marginBottom:'14px'}}>
    <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'5px'}}>
      <span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:C.lime,letterSpacing:'2px',background:C.forest,padding:'3px 9px',flexShrink:0}}>FIG {num}</span>
      <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,letterSpacing:'0.1px'}}>{title}</span>
    </div>
    {note&&<div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic',lineHeight:1.6,borderLeft:`2px solid ${C.border}`,marginLeft:'2px',paddingLeft:'10px'}}>{note}</div>}
  </div>
);

/* ═══ FIG 01 — EDUCATION FUNNEL ════════════════════════════════════════ */
const Fig01ValueChain=()=>{
  const funnel=[
    {label:'Primary Enrollment',sub:'Age 6–11',val:'86%',pct:86,bg:C.forest,tx:C.lime},
    {label:'Secondary (SHS)',sub:'Free SHS access',val:'57%',pct:57,bg:'#2E5A4D',tx:'rgba(250,248,243,0.9)'},
    {label:'TVET Enrollment',sub:'Formal vocational',val:'5%',pct:5,bg:C.amber,tx:C.white},
    {label:'Tertiary',sub:'University/Polytechnic',val:'21%',pct:21,bg:'#3A4A3C',tx:'rgba(250,248,243,0.75)'},
    {label:'Youth Employed',sub:'15–24 age cohort',val:'51%',pct:51,bg:'#222E24',tx:'rgba(250,248,243,0.55)'},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="01" title="The Education Funnel — Enrollment to Economic Outcome" note="Enrollment drops from 86% at primary to 21% at tertiary — and youth employment reaches only 51% of the relevant cohort. TVET enrollment at just 5% is the sharpest illustration of the skills pathway problem. Source: Ghana Education Service; World Bank Ghana Education Report 2024; BRIDGE Analysis."/>
      <div style={{display:'flex',height:'60px',width:'100%',overflow:'hidden',border:`1px solid ${C.border}`}}>
        {funnel.map((s,i)=>(
          <div key={i} style={{width:`${[20,20,10,20,30][i]}%`,background:s.bg,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',borderRight:i<4?'1px solid rgba(255,255,255,0.12)':'none',overflow:'hidden',flexShrink:0,padding:'0 4px'}}>
            <span style={{fontFamily:F.mono,fontSize:'clamp(10px,1.5vw,15px)',fontWeight:700,color:s.tx,lineHeight:1,textAlign:'center',whiteSpace:'nowrap'}}>{s.val}</span>
          </div>
        ))}
      </div>
      <div style={{display:'flex',width:'100%',marginTop:'4px'}}>
        {funnel.map((s,i)=>(
          <div key={i} style={{width:`${[20,20,10,20,30][i]}%`,paddingRight:'6px',flexShrink:0}}>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,lineHeight:1.3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.label}</div>
            <div style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic',whiteSpace:'nowrap'}}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,border:`1px solid ${C.border}`,marginTop:'10px'}}>
        {[{l:'Primary enrollment → TVET',v:'5% reach TVET',vc:C.red},{l:'BRIDGE TVET target',v:'280K/yr trained',vc:C.positive},{l:'Current formal capacity',v:'50,049 enrolled',vc:C.forest}].map((kv,i)=>(
          <div key={i} style={{background:C.paperDark,padding:'8px 12px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint,letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
            <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══ FIG 02 — UNEMPLOYMENT BY EDUCATION LEVEL ═════════════════════════ */
const Fig02CropLoss=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="02" title="Unemployment Rate by Education Level — Ghana 2024" note="University graduates (22.3%) face higher unemployment than every other education level including those with no formal schooling. TVET graduates (8.1%) outperform SHS completers. The evidence for TVET investment is written in these numbers. Source: Ghana Statistical Service Labour Force Survey 2024; BRIDGE Analysis."/>
    <div className="fig-scroll">
      <div style={{minWidth:'480px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'180px 1fr 80px',background:C.forest}}>
          {['Education Level','Unemployment Rate','%'].map((h,i)=>(
            <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
          ))}
        </div>
        {S.cropLoss.map((row,i)=>{
          const isWorst=row.cur===22.3;
          const isBest=row.cur===6.2;
          const barColor=isWorst?C.red:isBest?C.positive:row.crop==='TVET Graduate'?C.lime:C.amber;
          return(
          <div key={i} style={{display:'grid',gridTemplateColumns:'180px 1fr 80px',borderBottom:i<S.cropLoss.length-1?`1px solid ${C.border}`:'none',background:isWorst?'rgba(168,32,13,0.04)':i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
            <div style={{padding:'10px 12px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:isWorst?700:600,color:isWorst?C.red:C.ink}}>{row.crop}</div>
              <div style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic',lineHeight:1.4,marginTop:'2px'}}>{row.note}</div>
            </div>
            <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <div style={{width:`${Math.min(row.cur*3.2,85)}%`,height:'12px',background:barColor,borderRadius:'2px',flexShrink:0}}/>
                <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:barColor,flexShrink:0}}>{row.cur}%</span>
              </div>
              {row.tgt&&<div style={{display:'flex',alignItems:'center',gap:'8px',marginTop:'4px'}}>
                <div style={{width:`${Math.min(row.tgt*3.2,85)}%`,height:'8px',background:'rgba(26,107,47,0.35)',borderRadius:'2px',flexShrink:0}}/>
                <span style={{fontFamily:F.mono,fontSize:'9px',color:C.positive,flexShrink:0}}>target {row.tgt}%</span>
              </div>}
            </div>
            <div style={{padding:'10px 12px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:barColor}}>{row.cur}%</span>
            </div>
          </div>
          );
        })}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'Highest unemployment',v:'University grad',vc:C.red},{l:'Best employed',v:'TVET graduate',vc:C.positive},{l:'BRIDGE bootcamp target',v:'<5% unemployment',vc:C.lime}].map((kv,i)=>(
            <div key={i} style={{background:C.paperDark,padding:'8px 12px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:C.faint,letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ═══ FIG 03 — REGIONAL DEPLOYMENT ALLOCATION ══════════════════════════ */
const Fig03ZoneAllocation=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="03" title="Regional BRIDGE Education Deployment — Capital Allocation" note="BRIDGE education portfolio allocation by region. Northern regions receive priority weighting due to lowest TVET access rates and highest employment gap. Greater Accra and South prioritised for digital skills and employer engagement infrastructure. Source: BRIDGE Regional Analysis, 2026."/>
    <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
      <div style={{display:'flex',height:'44px',width:'100%'}}>
        {S.zones.map((z,i)=>(
          <div key={i} style={{width:`${z.alloc}%`,background:z.color,display:'flex',alignItems:'center',justifyContent:'center',borderRight:i<3?'1px solid rgba(255,255,255,0.15)':'none',flexShrink:0,overflow:'hidden'}}>
            <span style={{fontFamily:F.mono,fontSize:'clamp(10px,1.4vw,14px)',fontWeight:700,color:i===0?C.ink:C.white,whiteSpace:'nowrap'}}>{z.allocLabel}</span>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',borderTop:`1px solid ${C.border}`}}>
        {S.zones.map((z,i)=>(
          <div key={i} style={{padding:'10px 12px',borderRight:i<3?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
            <div style={{width:'14px',height:'4px',background:z.color,marginBottom:'5px'}}/>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{z.zone}</div>
            <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',lineHeight:1.4}}>{z.crops}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ═══ FIG 04 — SKILLS FUND BUDGET ALIGNMENT ════════════════════════════ */
const Fig04Budget=()=>(
  <div style={{margin:'24px 0'}}>
    <FigCaption num="04" title="Ghana Education Budget & BRIDGE Co-Financing Entry Points" note="Government budget allocations relevant to BRIDGE education sector with co-financing mode per programme. Ghana Skills Development Fund ($200M World Bank) is the primary BRIDGE leverage vehicle. Source: Ghana Ministry of Education; World Bank Ghana; BRIDGE Analysis 2026."/>
    <div className="fig-scroll">
    <div style={{minWidth:'500px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
      {S.budgetItems.map((b,i)=>(
        <div key={i} style={{display:'grid',gridTemplateColumns:'220px 1fr 110px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:b.featured?C.forest:(i%2===0?C.paper:C.paperDark),alignItems:'center'}}>
          <div style={{padding:'10px 14px'}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:b.featured?C.lime:C.ink,marginBottom:'2px'}}>{b.item}</div>
            <div style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:b.featured?C.paper:C.forest}}>{b.ghc}</div>
            <div style={{fontFamily:F.sans,fontSize:'9px',color:b.featured?'rgba(250,248,243,0.4)':C.faint}}>{b.usd}</div>
          </div>
          <div style={{padding:'10px 14px',borderLeft:`1px solid ${b.featured?'rgba(255,255,255,0.1)':C.border}`}}>
            <div style={{height:'8px',background:b.featured?'rgba(255,255,255,0.08)':C.border,borderRadius:'2px',overflow:'hidden',marginBottom:'5px'}}>
              <div style={{height:'100%',width:`${Math.min(b.pct,100)}%`,background:b.featured?C.lime:C.limeDark,borderRadius:'2px'}}/>
            </div>
            <div style={{fontFamily:F.body,fontSize:'10px',color:b.featured?'rgba(250,248,243,0.55)':C.muted,fontStyle:'italic'}}>{b.mode}</div>
          </div>
          <div style={{padding:'8px 12px',borderLeft:`1px solid ${b.featured?'rgba(255,255,255,0.1)':C.border}`,textAlign:'center'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:b.featured?C.lime:C.amber,letterSpacing:'0.5px',lineHeight:1.4}}>{b.urgency}</div>
          </div>
        </div>
      ))}
    </div>
    </div>
  </div>
);

/* ═══ FIG 05 — SKILLS INTERVENTION IMPACT LADDER ════════════════════════ */
const Fig05Income=()=>{
  const layers=[
    {label:'Baseline — No Intervention',sub:'Current TVET pathway, no employer linkage',pct:25,color:'rgba(168,32,13,0.75)',bg:C.paper},
    {label:'+ Curriculum Reform',sub:'Industry co-designed modules; updated standards',pct:42,color:C.amber,bg:C.paperDark},
    {label:'+ Equipment Modernisation',sub:'Graduates use day-one production-grade tools',pct:56,color:C.limeDark,bg:C.paper},
    {label:'+ Employer Integration',sub:'Work-placement pipeline; employer co-sponsorship',pct:74,color:C.limeDark,bg:C.paperDark},
    {label:'+ Employment-Linked Bootcamp',sub:'Full BRIDGE model — placement pathway before enrollment',pct:96,color:C.positive,bg:C.paper},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="05" title="Employment Rate by Intervention Layer — BRIDGE Bootcamp Model" note="Graduate employment rate by BRIDGE intervention layer. The full employment-linked model — where placement is confirmed before training begins — targets a 96% employment rate vs 25% baseline for unreformed TVET graduates. Source: BRIDGE Analysis; comparable employment-linked programme outcomes in Kenya and Rwanda."/>
      <div className="fig-scroll">
      <div style={{minWidth:'440px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        {layers.map((row,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'220px 1fr 56px',borderBottom:i<4?`1px solid ${C.border}`:'none',background:row.bg,alignItems:'center'}}>
            <div style={{padding:'10px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,lineHeight:1.3}}>{row.label}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic',marginTop:'2px'}}>{row.sub}</div>
            </div>
            <div style={{padding:'10px 14px',borderLeft:`1px solid ${C.border}`}}>
              <div style={{height:'12px',background:C.border,borderRadius:'2px',overflow:'hidden',marginBottom:'4px'}}>
                <div style={{height:'100%',width:`${row.pct}%`,background:row.color,borderRadius:'2px',transition:'width 0.3s'}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>0%</span>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>50%</span>
                <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>100%</span>
              </div>
            </div>
            <div style={{padding:'8px 10px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:row.color,display:'block'}}>{row.pct}%</span>
            </div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'Baseline employment',v:'25%',vc:C.red},{l:'BRIDGE bootcamp target',v:'96%',vc:C.positive},{l:'Uplift delivered',v:'+71pp',vc:C.lime}].map((kv,i)=>(
            <div key={i} style={{background:C.forest,padding:'10px 14px',textAlign:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.35)',letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

/* ═══ FIG 06 — VENTURE PORTFOLIO MATRIX ════════════════════════════════ */
const Fig06Matrix=()=>{
  const pts=[
    {n:'Skills Bootcamps',x:185,y:68,r:12,tier:1},{n:'TVET Partnership',x:310,y:115,r:11,tier:1},
    {n:'Service Scholarships',x:315,y:145,r:10,tier:1},{n:'Diaspora Mentorship',x:165,y:88,r:7,tier:1},
    {n:'Apprenticeship Recog.',x:175,y:122,r:8,tier:1},{n:'Digital Skills Prog.',x:195,y:105,r:9,tier:1},
    {n:'Equipment Mod. Fund',x:325,y:172,r:9,tier:1},{n:'EdTech Fund',x:340,y:138,r:11,tier:2},
    {n:'TVET Teacher Dev.',x:345,y:192,r:8,tier:2},{n:'Centres of Excellence',x:490,y:158,r:13,tier:3},
  ];
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  const tierTx={1:C.ink,2:C.white,3:C.paper};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="06" title="Venture Portfolio Matrix — Priority Score vs. Capital Required" note="18 education ventures plotted by priority score (y-axis) and capital required (x-axis). Bubble size represents relative capital. Tier 1 ventures cluster in the high-score / low-to-medium capital zone. Source: BRIDGE Venture Analysis, 2026."/>
      <div className="fig-scroll">
        <div style={{minWidth:'600px',position:'relative'}}>
          <svg viewBox="0 0 720 360" width="100%" style={{display:'block',border:`1px solid ${C.border}`,background:C.paper,overflow:'visible'}}>
            <rect x="70" y="20" width="190" height="295" fill={C.positive} opacity="0.05"/>
            <rect x="260" y="20" width="200" height="295" fill={C.amber} opacity="0.05"/>
            <rect x="460" y="20" width="190" height="295" fill={C.red} opacity="0.05"/>
            <text x="165" y="330" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.positive} letterSpacing="1.5">LOW CAPITAL</text>
            <text x="360" y="330" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.amber} letterSpacing="1.5">MED CAPITAL</text>
            <text x="555" y="330" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.red} letterSpacing="1.5">HIGH CAPITAL</text>
            {[30,34,38,42,46].map((v,vi)=>{
              const y=315-(vi)*55;
              return(<g key={v}><line x1="65" y1={y} x2="655" y2={y} stroke={C.border} strokeWidth="1" strokeDasharray="3,4"/><text x="58" y={y+4} textAnchor="end" fontFamily={F.mono} fontSize="9" fill={C.faint}>{v}</text></g>);
            })}
            <line x1="70" y1="315" x2="650" y2="315" stroke={C.border} strokeWidth="1"/>
            <line x1="70" y1="20" x2="70" y2="315" stroke={C.border} strokeWidth="1"/>
            <line x1="260" y1="20" x2="260" y2="315" stroke={C.border} strokeWidth="1" strokeDasharray="4,4"/>
            <line x1="460" y1="20" x2="460" y2="315" stroke={C.border} strokeWidth="1" strokeDasharray="4,4"/>
            <text x="14" y="175" textAnchor="middle" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.muted} transform="rotate(-90,14,175)" letterSpacing="1">PRIORITY SCORE</text>
            {pts.map((p,i)=>(
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={p.r+4} fill={tierColor[p.tier]} opacity="0.15"/>
                <circle cx={p.x} cy={p.y} r={p.r} fill={tierColor[p.tier]} opacity="0.85" stroke={C.paper} strokeWidth="1.5"/>
                <text x={p.x} y={p.y+4} textAnchor="middle" fontFamily={F.mono} fontSize="8" fontWeight="700" fill={tierTx[p.tier]}>{i+1}</text>
              </g>
            ))}
          </svg>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',gap:'0',borderTop:`1px solid ${C.border}`,background:C.paperDark}}>
            {[{bg:C.lime,tx:C.ink,label:'Tier 1 ventures'},{bg:C.amber,tx:C.white,label:'Tier 2 ventures'},{bg:C.muted,tx:C.paper,label:'Tier 3 ventures'}].map((lg,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:'6px',padding:'8px 12px',borderRight:`1px solid ${C.border}`}}>
                <div style={{width:'10px',height:'10px',borderRadius:'50%',background:lg.bg,flexShrink:0}}/>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted}}>{lg.label}</span>
              </div>
            ))}
            <div style={{padding:'8px 12px',borderRight:`1px solid ${C.border}`,gridColumn:'span 2'}}>
              <span style={{fontFamily:F.body,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>Bubble size = capital required · Labels 1–10 map to first 10 ventures in portfolio table</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ FIG 07 — QUARTERLY DEPLOYMENT ROADMAP ════════════════════════════ */
const Fig07Roadmap=()=>{
  const years=['2026','2027','2028','2029','2030+'];
  const tierColor={1:C.lime,2:C.amber,3:C.muted};
  const tierTx={1:C.ink,2:C.white,3:C.paper};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="07" title="Education Portfolio — Deployment Roadmap" note="18-venture deployment roadmap. Phase 1 (2026–2027) deploys 7 employment-linked Tier 1 ventures — bootcamps, TVET partnerships, scholarships, and apprenticeship recognition. Phase 2 scales digital infrastructure. Phase 3 addresses regional equity. Source: BRIDGE Operations Planning, 2026."/>
      <div className="fig-scroll">
        <div style={{minWidth:'620px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          {/* time header */}
          <div style={{display:'grid',gridTemplateColumns:'160px 1fr',background:C.ink,borderBottom:`1px solid rgba(255,255,255,0.08)`}}>
            <div style={{padding:'8px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:C.lime,textTransform:'uppercase'}}>Venture</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',borderLeft:`1px solid rgba(255,255,255,0.08)`}}>
              {years.map((y,i)=><div key={i} style={{padding:'8px 0',fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:'rgba(250,248,243,0.5)',textAlign:'center',borderLeft:i>0?'1px solid rgba(255,255,255,0.06)':'none'}}>{y}</div>)}
            </div>
          </div>
          {/* phase markers */}
          <div style={{display:'grid',gridTemplateColumns:'160px 1fr',background:'rgba(184,217,53,0.04)',borderBottom:`1px solid ${C.border}`}}>
            <div style={{padding:'5px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',color:C.faint,textTransform:'uppercase'}}>Phase</div>
            <div style={{display:'flex',borderLeft:`1px solid ${C.border}`}}>
              <div style={{width:'40%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.lime,letterSpacing:'1px',borderRight:`1px solid ${C.border}`}}>PHASE 1 · FOUNDATION</div>
              <div style={{width:'40%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.amber,letterSpacing:'1px',borderRight:`1px solid ${C.border}`}}>PHASE 2 · SCALE</div>
              <div style={{width:'20%',padding:'5px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:C.muted,letterSpacing:'1px'}}>PHASE 3</div>
            </div>
          </div>
          {/* rows */}
          {S.roadmap.map((v,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:'160px 1fr',borderBottom:i<S.roadmap.length-1?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
              <div style={{padding:'8px 12px',display:'flex',alignItems:'center',gap:'6px'}}>
                <div style={{width:'8px',height:'8px',borderRadius:'1px',background:tierColor[v.tier],flexShrink:0}}/>
                <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:C.ink,lineHeight:1.3}}>{v.name}</span>
              </div>
              <div style={{borderLeft:`1px solid ${C.border}`,position:'relative',padding:'8px 0'}}>
                <div style={{position:'relative',height:'20px',margin:'0 6px'}}>
                  <div style={{position:'absolute',left:`${v.s}%`,width:`${v.e-v.s}%`,height:'100%',background:tierColor[v.tier],borderRadius:'2px',display:'flex',alignItems:'center',justifyContent:'center',minWidth:'4px'}}>
                    {v.e-v.s>12&&<span style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:tierTx[v.tier],whiteSpace:'nowrap',overflow:'hidden',paddingLeft:'4px',paddingRight:'4px'}}>{v.s===0&&v.tier===1?'Q1 2026':v.tier===2?'2028':''}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══ FIG 08 — INTERNATIONAL EMPLOYMENT BENCHMARKS ═════════════════════ */
const Fig08Benchmarks=()=>{
  const maxW=480;
  const pctColors={'red':C.red,'lime':C.lime,false:C.muted};
  const txColors={'red':C.red,'lime':C.positive,false:C.muted};
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="08" title="TVET Graduate Employment Rate — Ghana vs. International Peers" note="Employment rate within 12 months for graduates of employment-linked skills programmes. Ghana TVET baseline outperforms university but remains well below best-practice employment-linked models. BRIDGE bootcamp target at 96% reflects employment-confirmed-before-enrollment design. Source: BRIDGE Research; ILO Skills Programme; World Bank Education Data 2024."/>
      <div className="fig-scroll">
      <div style={{minWidth:'440px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{background:C.forest,padding:'8px 14px',display:'grid',gridTemplateColumns:'200px 1fr 60px'}}>
          {['Country / Programme','Employment Rate Within 12 Months (%)','Rate'].map((h,i)=>(
            <div key={i} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none',paddingLeft:i>0?'12px':'0'}}>{h}</div>
          ))}
        </div>
        {S.benchmarks.map((row,i)=>{
          const col=pctColors[row.highlight]||C.muted;
          const txCol=txColors[row.highlight]||C.muted;
          const isGhana=row.highlight==='red'||row.highlight==='lime';
          return(
            <div key={i} style={{display:'grid',gridTemplateColumns:'200px 1fr 60px',borderBottom:i<S.benchmarks.length-1?`1px solid ${C.border}`:'none',background:isGhana?(row.highlight==='lime'?'rgba(26,107,47,0.06)':'rgba(168,32,13,0.04)'):i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
              <div style={{padding:'10px 14px'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:isGhana?700:600,color:isGhana?C.ink:C.muted,lineHeight:1.3}}>{row.country}</div>
                <div style={{fontFamily:F.body,fontSize:'9px',fontStyle:'italic',color:C.faint,marginTop:'2px',lineHeight:1.4}}>{row.note}</div>
              </div>
              <div style={{padding:'10px 14px',borderLeft:`1px solid ${C.border}`}}>
                <div style={{height:'14px',background:C.border,borderRadius:'2px',overflow:'hidden',marginBottom:'3px'}}>
                  <div style={{height:'100%',width:`${row.pct}%`,background:col,borderRadius:'2px',opacity:isGhana?1:0.65}}/>
                </div>
              </div>
              <div style={{padding:'10px 12px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.mono,fontSize:'15px',fontWeight:700,color:col}}>{row.pct}%</span>
              </div>
            </div>
          );
        })}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'Ghana TVET baseline',v:'~75%',vc:C.amber},{l:'BRIDGE bootcamp target',v:'96%',vc:C.lime},{l:'Germany dual system',v:'97%',vc:C.forest}].map((kv,i)=>(
            <div key={i} style={{background:C.forest,padding:'10px 14px',textAlign:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.35)',letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

/* ═══ FIG 09 — SKILLS FUND CAPITAL LEVERAGE STACK ══════════════════════ */
const Fig09CapitalStack=()=>{
  const layers=[
    {label:'Ghana Skills Development Fund',sub:'World Bank IDA — co-financing',pct:65,amt:'$200M facility',note:'State co-financing — BRIDGE capital multiplied 3–5× per qualifying venture',color:C.forest,tx:C.lime},
    {label:'BRIDGE Capital',sub:'Private investor equity',pct:20,amt:'$14–28M',note:'Direct operating and partnership capital — anchor equity in all Tier 1 ventures',color:C.lime,tx:C.ink},
    {label:'Diaspora + Donor Co-Finance',sub:'MasterCard Foundation; USAID; GIZ',pct:15,amt:'$8–20M',note:'Blended grant and TA layer — de-risks scholarship and bootcamp operating models',color:C.amber,tx:C.white},
  ];
  return(
    <div style={{margin:'24px 0'}}>
      <FigCaption num="09" title="BRIDGE Skills Capital Leverage Stack — Ghana Skills Development Fund" note="How BRIDGE capital is multiplied through the Ghana Skills Development Fund. For every $1 of BRIDGE capital deployed, $3–5 in total programme capital is activated. Source: World Bank GSDF; BRIDGE Financial Modelling 2026."/>
      <div className="fig-scroll">
      <div style={{minWidth:'500px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{height:'52px',display:'flex',borderBottom:`1px solid ${C.border}`}}>
          {layers.map((l,i)=>(
            <div key={i} style={{width:`${l.pct}%`,background:l.color,display:'flex',alignItems:'center',justifyContent:'center',borderRight:i<2?'1px solid rgba(255,255,255,0.15)':'none',overflow:'hidden',flexShrink:0}}>
              <span style={{fontFamily:F.mono,fontSize:'clamp(10px,1.4vw,14px)',fontWeight:700,color:l.tx,whiteSpace:'nowrap'}}>{l.pct}%</span>
            </div>
          ))}
        </div>
        {layers.map((l,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'14px 200px 100px 1fr',borderBottom:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
            <div style={{width:'14px',height:'100%',background:l.color,flexShrink:0}}/>
            <div style={{padding:'10px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{l.label}</div>
              <div style={{fontFamily:F.body,fontSize:'9px',fontStyle:'italic',color:C.faint}}>{l.sub}</div>
            </div>
            <div style={{padding:'10px 12px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,borderLeft:`1px solid ${C.border}`}}>{l.amt}</div>
            <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,borderLeft:`1px solid ${C.border}`}}>{l.note}</div>
          </div>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1px',background:C.border,borderTop:`1px solid ${C.border}`}}>
          {[{l:'BRIDGE capital input',v:'1×',vc:C.lime},{l:'Total capital activated',v:'3–5×',vc:C.positive},{l:'Fund total',v:'$200M',vc:C.forest}].map((kv,i)=>(
            <div key={i} style={{background:C.ink,padding:'10px 14px',textAlign:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.3)',letterSpacing:'0.5px',marginBottom:'3px'}}>{kv.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:kv.vc}}>{kv.v}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};


/* ═══ MOBILE DETECT HOOK ════════════════════════════════════════════════ */
const useMobile=()=>{
  const[mob,setMob]=useState(typeof window!=='undefined'&&window.innerWidth<=600);
  useEffect(()=>{
    const fn=()=>setMob(window.innerWidth<=600);
    window.addEventListener('resize',fn,{passive:true});
    return()=>window.removeEventListener('resize',fn);
  },[]);
  return mob;
};

/* ═══ SECTION REGISTRY ═══════════════════════════════════════════════════ */
const SECS=[
  {id:'sec-exec',    label:'Executive Summary'},
  {id:'sec-subs',    label:'Sub-Sectors'},
  {id:'sec-problem', label:'Structural Problem'},
  {id:'sec-paradox', label:'Education Paradox'},
  {id:'sec-zones',   label:'Regional Strategy'},
  {id:'sec-market',  label:'Competitive Landscape'},
  {id:'sec-policy',  label:'Policy Window'},
  {id:'sec-outcomes',label:'Employment Impact'},
  {id:'sec-ventures',label:'Venture Portfolio'},
  {id:'sec-roadmap', label:'Deployment Roadmap'},
  {id:'sec-coinvest',label:'Co-Investment'},
  {id:'sec-synergy', label:'System Integration'},
  {id:'sec-risk',    label:'Risk & Thesis'},
  {id:'upsell',      label:'Next Steps'},
];

/* ═══ READING PROGRESS BAR v4 ═══════════════════════════════════════════ */
const ReadingProgressBar=({coverRef})=>{
  const[pct,setPct]=useState(0);
  const[logoVisible,setLogoVisible]=useState(false);
  useEffect(()=>{
    const fn=()=>{
      const doc=document.documentElement;
      const scrolled=doc.scrollTop||document.body.scrollTop;
      const total=doc.scrollHeight-doc.clientHeight;
      setPct(total>0?Math.min(100,(scrolled/total)*100):0);
      if(coverRef?.current){setLogoVisible(coverRef.current.getBoundingClientRect().bottom<0);}
    };
    window.addEventListener('scroll',fn,{passive:true});
    fn();
    return()=>window.removeEventListener('scroll',fn);
  },[coverRef]);
  const pctRounded=Math.round(pct);
  return(
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(13,26,16,0.05)',overflow:'hidden'}}>
      {/* v4: 3px progress line */}
      <div style={{position:'absolute',bottom:0,left:0,height:'3px',width:`${pct}%`,background:C.lime,transition:'width 0.1s linear',pointerEvents:'none'}}/>
      <div style={{display:'flex',alignItems:'center',gap:'10px',minWidth:0,overflow:'hidden'}}>
        {/* v4: spring easing on logo reveal */}
        <div style={{overflow:'hidden',maxWidth:logoVisible?'180px':'0',opacity:logoVisible?1:0,transition:'max-width 0.38s cubic-bezier(0.16,1,0.3,1),opacity 0.3s ease',display:'flex',alignItems:'center',flexShrink:0}}>
          <Logo height={19} variant="dark"/>
          <div style={{width:'1px',height:'15px',background:C.border,margin:'0 12px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Sector Brief · Education &amp; Skills Development · Emerging Tier · March 2026</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>05 · Education</span>
        {/* v4: reading % shown after 5% scroll — desktop only */}
        {pct>5&&<span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,marginLeft:'4px',flexShrink:0}}>{pctRounded}%</span>}
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center',flexShrink:0}}>
        <a href="#" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none',letterSpacing:'0.2px'}}>All Sectors →</a>
        {/* v4: cta-primary for hover lift */}
        <a href="#upsell" className="cta-primary" style={{background:C.forest,color:C.lime,padding:'7px 16px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.5px'}}>Full Package →</a>
      </div>
    </div>
  );
};

/* ═══ SECTION FOOTER NAV v4 ═════════════════════════════════════════════ */
const SectionFooterNav=()=>{
  const[active,setActive]=useState(0);
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const idx=SECS.findIndex(s=>s.id===e.target.id);
          if(idx>=0)setActive(idx);
        }
      });
    },{rootMargin:'-40% 0px -55% 0px'});
    SECS.forEach(s=>{const el=document.getElementById(s.id);if(el)obs.observe(el);});
    return()=>obs.disconnect();
  },[]);
  const goTo=(idx)=>{
    const clamped=Math.max(0,Math.min(SECS.length-1,idx));
    const el=document.getElementById(SECS[clamped].id);
    if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
    setActive(clamped);
  };
  const BtnStyle=(disabled,isNext)=>({
    width:'38px',height:'38px',
    background:disabled?'rgba(255,255,255,0.03)':(isNext?C.forest:'rgba(255,255,255,0.07)'),
    border:`1px solid ${disabled?'rgba(255,255,255,0.08)':(isNext?'rgba(184,217,53,0.25)':'rgba(255,255,255,0.14)')}`,
    cursor:disabled?'default':'pointer',
    display:'flex',alignItems:'center',justifyContent:'center',
    flexShrink:0,opacity:disabled?0.28:1,
    transition:'background 0.15s,transform 0.12s',
  });
  return(
    <div className="np" style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,background:'rgba(10,20,12,0.97)',borderTop:`1px solid rgba(184,217,53,0.12)`,backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'9px 18px',gap:'10px'}}>
      <button onClick={()=>goTo(active-1)} disabled={active===0} style={BtnStyle(active===0,false)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active===0?'rgba(255,255,255,0.2)':C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',minWidth:0,overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',gap:'7px',maxWidth:'100%',overflow:'hidden'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px',flexShrink:0}}>§{String(active+1).padStart(2,'0')}</span>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.45)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{SECS[active]?.label}</span>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,0.18)',flexShrink:0}}>/ {SECS.length}</span>
        </div>
        <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
          {SECS.map((_,i)=>(
            <div key={i} onClick={()=>goTo(i)} style={{
              width:i===active?'24px':'6px',height:'6px',borderRadius:'3px',
              background:i===active?C.lime:i<active?'rgba(184,217,53,0.3)':'rgba(255,255,255,0.15)',
              cursor:'pointer',
              transition:'width 0.3s cubic-bezier(0.16,1,0.3,1),background 0.2s',
              flexShrink:0,
            }}/>
          ))}
        </div>
      </div>
      <button onClick={()=>goTo(active+1)} disabled={active===SECS.length-1} style={BtnStyle(active===SECS.length-1,true)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active===SECS.length-1?'rgba(255,255,255,0.2)':C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
};

/* ═══ CAROUSEL (mobile-only swipe + dots) ═══════════════════════════════ */
const Carousel=({items,renderCard,cardClass='mob-snap-card',darkBg=false,wrapClass='car-wrap'})=>{
  const[active,setActive]=useState(0);
  const ref=useRef(null);
  const onScroll=()=>{
    const el=ref.current;if(!el)return;
    const idx=Math.min(Math.round(el.scrollLeft/(el.scrollWidth/items.length)),items.length-1);
    setActive(idx);
  };
  const goto=(i)=>{
    const el=ref.current;if(!el)return;
    el.scrollTo({left:(el.scrollWidth/items.length)*i,behavior:'smooth'});
    setActive(i);
  };
  return(
    <div className={`mob-car ${wrapClass}`} style={{marginTop:'16px',marginBottom:'4px'}}>
      <div ref={ref} onScroll={onScroll} className="mob-scroller">
        {items.map((item,i)=>(
          <div key={i} className={cardClass} style={{paddingBottom:'2px'}}>{renderCard(item,i)}</div>
        ))}
        <div style={{flex:'0 0 16px',minWidth:'16px'}}/>
      </div>
      <div style={{display:'flex',gap:'5px',justifyContent:'center',marginTop:'12px',alignItems:'center'}}>
        {items.map((_,i)=>(
          <div key={i} onClick={()=>goto(i)} style={{
            width:i===active?'22px':'7px',height:'7px',borderRadius:'4px',
            background:i===active?C.lime:(darkBg?'rgba(255,255,255,0.18)':C.border),
            cursor:'pointer',
            transition:'width 0.3s cubic-bezier(0.16,1,0.3,1),background 0.2s',
            flexShrink:0,
          }}/>
        ))}
      </div>
    </div>
  );
};

/* ═══ SECTION HEADER (mobile accordion trigger) ═════════════════════════ */
const SecHdr=({num,label,badge,badgeColor=C.forest,badgeTx=C.lime,open,onToggle,dark=false,hint=''})=>(
  <button className="mob-sec-hdr" onClick={onToggle} style={{width:'100%',background:'transparent',border:'none',cursor:'pointer',padding:'0 0 16px',display:'flex',flexDirection:'column',gap:'5px',borderBottom:`1px solid ${dark?'rgba(255,255,255,0.1)':C.border}`,marginBottom:'18px',textAlign:'left'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:dark?'rgba(255,255,255,0.25)':C.faint,letterSpacing:'2.5px',textTransform:'uppercase'}}>{num}</span>
        <span style={{fontFamily:F.sans,fontSize:'15px',fontWeight:700,color:dark?C.paper:C.ink,letterSpacing:'-0.2px'}}>{label}</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0}}>
        {badge&&<span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:badgeTx,background:badgeColor,padding:'3px 10px',letterSpacing:'0.5px'}}>{badge}</span>}
        <span style={{fontFamily:F.sans,fontSize:'18px',color:dark?'rgba(255,255,255,0.3)':C.faint,transition:'transform 0.25s cubic-bezier(0.16,1,0.3,1)',display:'inline-block',transform:open?'rotate(0deg)':'rotate(-90deg)',lineHeight:1,marginLeft:'2px',fontWeight:300}}>↓</span>
      </div>
    </div>
    {!open&&hint&&<span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:dark?'rgba(255,255,255,0.25)':C.faint,paddingLeft:'0',lineHeight:1.55,marginTop:'1px'}}>{hint}</span>}
  </button>
);



/* ═══ MOBILE EXPAND/COLLAPSE ALL BAR ════════════════════════════════════ */
const MobExpandBar=({allOpen,onToggle})=>(
  <div className="mob-expand-all" style={{display:'none',background:C.ink,borderBottom:`1px solid rgba(184,217,53,0.12)`,padding:'10px 18px',alignItems:'center',justifyContent:'space-between',gap:'10px'}}>
    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
      <div style={{width:'5px',height:'5px',borderRadius:'50%',background:allOpen?C.lime:'rgba(255,255,255,0.2)',transition:'background 0.2s'}}/>
      <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(255,255,255,0.35)',letterSpacing:'0.5px'}}>
        {allOpen?'All sections open':'All sections collapsed'}
      </span>
    </div>
    <button onClick={onToggle} style={{background:'transparent',border:`1px solid rgba(184,217,53,0.3)`,padding:'6px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.lime,cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>
      {allOpen?'Collapse All ↑':'Expand All ↓'}
    </button>
  </div>
);

/* ═══ COVER ══════════════════════════════════════════════════════════════ */
const Cover=({logoRef})=>(
  <div>
    <div className="pad-cover" style={{background:C.ink,padding:'28px 64px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'32px',top:'-8px',fontFamily:F.display,fontSize:'clamp(100px,18vw,220px)',fontWeight:900,color:'rgba(255,255,255,0.022)',lineHeight:1,userSelect:'none',pointerEvents:'none',letterSpacing:'-6px'}}>05</div>
      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)',backgroundSize:'28px 28px',pointerEvents:'none'}}/>
      <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
        <div ref={logoRef} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <Logo height={26} variant="white"/>
            <div style={{width:'1px',height:'20px',background:'rgba(255,255,255,0.12)'}}/>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,letterSpacing:'2.5px',color:'rgba(255,255,255,0.25)',textTransform:'uppercase'}}>Sector Intelligence Brief · Full Members Edition</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.18)',letterSpacing:'1px'}}>{S.edition}</span>
            <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'2px',textTransform:'uppercase',border:'1px solid rgba(184,217,53,0.35)',padding:'4px 11px'}}>Members</span>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'22px'}}>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:800,padding:'5px 12px',letterSpacing:'1.5px'}}>SECTOR 05 OF 12</div>
          <div style={{height:'1px',flex:1,background:'rgba(255,255,255,0.07)'}}/>
        </div>
        <h1 style={{fontFamily:F.display,fontSize:'clamp(36px,6vw,78px)',fontWeight:900,color:C.paper,lineHeight:0.95,letterSpacing:'-2.5px',marginBottom:'8px'}}>Education</h1>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,4vw,52px)',fontWeight:700,color:'rgba(250,248,243,0.38)',lineHeight:1,letterSpacing:'-1.5px',marginBottom:'20px'}}>&amp; Skills Development</h2>
        <p style={{fontFamily:F.body,fontSize:'clamp(13px,1.6vw,16px)',fontStyle:'italic',color:'rgba(250,248,243,0.4)',lineHeight:1.7,maxWidth:'560px',marginBottom:'0'}}>{S.tagline}</p>
        <div className="cover-stats stats-row" style={{display:'flex',gap:'0',borderTop:'1px solid rgba(255,255,255,0.07)',marginTop:'28px',flexWrap:'wrap'}}>
          <div style={{background:'rgba(184,217,53,0.07)',padding:'20px 24px',minWidth:'170px',borderRight:'1px solid rgba(255,255,255,0.06)',flex:'0 0 170px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'10px'}}>BRIDGE Impact Score™</div>
            <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'10px'}}>
              <span style={{fontFamily:F.mono,fontSize:'52px',fontWeight:400,color:C.lime,lineHeight:1}}>{S.score}</span>
              <span style={{fontFamily:F.mono,fontSize:'13px',color:'rgba(184,217,53,0.4)'}}>/100</span>
            </div>
            <div style={{height:'3px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',marginBottom:'7px',overflow:'hidden'}}>
              <div className="score-bar" style={{'--w':`${S.score}%`,height:'100%',width:`${S.score}%`,background:C.lime,borderRadius:'2px'}}/>
            </div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>Emerging Tier</div>
          </div>
          {S.stats.map((d,i)=>(
            <div key={i} className="hm mob-stat" style={{padding:'20px 22px',borderRight:i<3?'1px solid rgba(255,255,255,0.06)':'none',flex:1,minWidth:0,display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.22)',marginBottom:'10px',lineHeight:1.4}}>{d.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'clamp(15px,2vw,22px)',color:C.paper,lineHeight:1,fontWeight:400}}>{d.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{height:'3px',background:C.lime,marginTop:'0',opacity:0.9}}/>
    </div>
  </div>
);

/* ═══ EXECUTIVE SUMMARY ══════════════════════════════════════════════════ */
const Executive=()=>{
  const[sdOpen,setSdOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(true);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-exec" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="00" label="Executive Summary" badge={`Score ${S.score}`} hint="22.3% graduate unemployment · $200M Skills Fund · employment-linked bootcamps as highest-conviction Tier 1 intervention" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div style={{maxWidth:'900px',display:'grid',gridTemplateColumns:'2fr 1fr',gap:'48px'}} className="tc">
        <div>
          <div className="sec-rule mob-hide"/>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Executive Summary</div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.summary}</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.summary2}</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300}}>{S.summary3}</p>
          <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',marginTop:'28px',paddingTop:'2px'}}>
            <p style={{fontFamily:F.display,fontSize:'17px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.5}}>{S.quote}</p>
            <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'18px',height:'1px',background:C.lime}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Sector Assessment, 2026</span></div>
          </div>
        </div>
        <div>
          <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <button className="mob-toggle mob-toggle-hdr" onClick={()=>setSdOpen(o=>!o)} style={{display:'block',width:'100%',background:C.forest,padding:'12px 16px',border:'none',cursor:'pointer',textAlign:'left'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span>Score Breakdown</span>
                <span className="mob-show" style={{display:'none',fontSize:'12px',color:'rgba(184,217,53,0.5)',transform:sdOpen?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
              </div>
              <div style={{fontFamily:F.mono,fontSize:'26px',color:C.paper}}>{S.score} <span style={{fontSize:'11px',color:'rgba(250,248,243,0.35)'}}>/100</span></div>
            </button>
            {S.scoreDims.map((dim,i)=>(
              <div key={i} className={i>=1?sdOpen?'':'mob-item-hidden':''} style={{padding:'10px 14px',borderBottom:i<3?`1px solid ${C.border}`:'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:600,color:C.ink}}>{dim.d}</span>
                  <span style={{fontFamily:F.mono,fontSize:'11px',color:C.forest}}>{dim.s}</span>
                </div>
                <div style={{height:'3px',background:C.border,borderRadius:'2px',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${dim.s}%`,background:C.lime,borderRadius:'2px'}}/>
                </div>
                <div style={{marginTop:'3px',fontFamily:F.mono,fontSize:'9px',color:C.faint}}>Weight: {dim.w}</div>
              </div>
            ))}
          </div>
          <div style={{border:`1px solid ${C.border}`,borderTop:'none',padding:'14px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Sector Snapshot</div>
            {S.snapshot.map((s,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:i<5?`1px solid ${C.border}`:'none'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{s.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:i===0?C.positive:C.forest}}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

/* ═══ SUB-SECTOR LANDSCAPE ═══════════════════════════════════════════════ */
const SubSectors=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-subs" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="00" label="Sub-Sector Landscape" badge="5 sub-sectors" hint="TVET, bootcamps, apprenticeship recognition, EdTech — scored by BRIDGE Impact Score™ methodology" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Sub-Sector Landscape</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>5 sub-sectors assessed</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Five Pathways, One Outcome: Employment</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Each sub-sector is scored on market opportunity, implementation feasibility, development impact, and financial sustainability. BRIDGE Impact Score™ methodology applied consistently across all 174+ ventures in the full portfolio.</p>
        <div className="subs-table">
          <div style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
            <div style={{display:'grid',gridTemplateColumns:'2fr 70px 110px 90px 1.5fr',background:C.forest}}>
              {['Sub-Sector','Score','Stage','Capital','BRIDGE Note'].map((h,i)=>(
                <div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
              ))}
            </div>
            {S.subs.map((sub,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 70px 110px 90px 1.5fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
                <div style={{padding:'11px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{sub.name}</div>
                <div style={{padding:'11px 14px',borderLeft:`1px solid ${C.border}`}}>
                  <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:sub.score>=85?C.positive:sub.score>=75?C.limeDark:C.amber}}>{sub.score}</div>
                  <div style={{height:'3px',background:C.border,borderRadius:'2px',marginTop:'4px',overflow:'hidden'}}><div style={{height:'100%',width:`${sub.score}%`,background:sub.score>=85?C.lime:sub.score>=75?C.limeDark:C.amber,borderRadius:'2px'}}/></div>
                </div>
                <div style={{padding:'11px 14px',borderLeft:`1px solid ${C.border}`}}>
                  <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest,border:`1px solid ${C.border}`,padding:'2px 7px'}}>{sub.stage}</span>
                </div>
                <div style={{padding:'11px 14px',fontFamily:F.mono,fontSize:'11px',color:C.forest,fontWeight:700,borderLeft:`1px solid ${C.border}`}}>{sub.capital}</div>
                <div style={{padding:'11px 14px',fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{sub.note}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="subs-cards">
          {S.subs.map((sub,i)=>(
            <div key={i} style={{border:`1px solid ${C.border}`,background:C.paper,padding:'12px'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'4px',lineHeight:1.3}}>{sub.name}</div>
              <div style={{fontFamily:F.mono,fontSize:'16px',fontWeight:700,color:sub.score>=85?C.positive:sub.score>=75?C.limeDark:C.amber,marginBottom:'2px'}}>{sub.score}</div>
              <div style={{fontFamily:F.mono,fontSize:'10px',color:C.forest,marginBottom:'4px'}}>{sub.capital}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic',lineHeight:1.4}}>{sub.note}</div>
            </div>
          ))}
        </div>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',marginTop:'28px',paddingTop:'2px'}}>
          <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"Ghana enrolls 86% of its primary-age children — among the highest in sub-Saharan Africa. That enrollment success makes the employment outcome failure more striking, not less. BRIDGE's thesis begins exactly there: at the gap between enrollment and outcome."</p>
          <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'18px',height:'1px',background:C.lime}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Sector Assessment, 2026</span></div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ STRUCTURAL PROBLEM ═════════════════════════════════════════════════ */
const StructuralProblem=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-problem" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="01" label="The Structural Problem" badge="86% Enrolled" hint="Enrollment vs. outcome paradox · 6 structural constraints · TVET institution readiness breakdown" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 01 — The Structural Problem</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>22.3% graduate unemployment · 50K TVET enrolled</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'20px'}}>Credentials Without Outcomes</h2>
        <Fig01ValueChain/>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'40px',marginBottom:'28px'}} className="tc">
          <div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Ghana's education statistics tell two stories simultaneously. Enrollment rates show a system expanding rapidly: 86% primary, 57% secondary, nearly universal Free SHS access. By the metrics of access, Ghana is succeeding. By the metrics of outcome — employment, income, economic mobility — the system is failing the very students it is educating.</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>Youth unemployment stands at 12.6%. Among university graduates — those who completed the longest, most expensive educational journey — 22.3% experience unemployment spells. Meanwhile 80–90% of the skills the Ghanaian economy actually uses are delivered through informal apprenticeship: master craftspeople training the next generation outside any formal recognition system, with no quality assurance and no pathway to formal employment.</p>
            <div style={{background:C.forest,padding:'16px 20px',marginTop:'8px'}}>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.7}}>Women constitute approximately 40% of Ghana's informal apprenticeship workforce but face greater barriers to certification, employer access, and progression to formal employment. BRIDGE's Apprenticeship Recognition System and Diaspora Mentorship Network specifically target gender equity in the skills pipeline — because the alignment gap disadvantages women most severely.</p>
              <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>The Women's Dimension</div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',alignContent:'start'}}>
            {[{v:'86%',l:'Primary\nenrollment'},{v:'22.3%',l:'Graduate\nunemployment'},{v:'1.5M',l:'Informal\napprentices'},{v:'50K',l:'TVET\nstudents'}].map((s,i)=>(
              <div key={i} style={{background:C.ink,padding:'14px 12px',textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'clamp(16px,2.2vw,24px)',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'5px'}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.3)',letterSpacing:'0.5px',whiteSpace:'pre-line',lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>The Education–Employment Constraint Stack</div>
        {/* Mobile carousel */}
        <Carousel items={S.constraints} darkBg={false} renderCard={(row,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px 16px',height:'100%'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
              <div style={{width:'28px',height:'28px',background:C.forest,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'13px',color:C.lime,fontFamily:F.mono,fontWeight:700}}>{i+1}</div>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink}}>{row.c}</div>
            </div>
            <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.65}}>{row.harm}</div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>View all 6 constraints</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'160px 1fr',background:C.forest}}>
            {['Constraint','Mechanism of Harm'].map((h,i)=><div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>)}
          </div>
          {S.constraints.map((row,i)=>(
            <div key={i} className={i>=1?open?'':'mob-item-hidden':''} style={{display:'grid',gridTemplateColumns:'160px 1fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
              <div style={{padding:'10px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{row.c}</div>
              <div style={{padding:'10px 14px',fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55,borderLeft:`1px solid ${C.border}`}}>{row.harm}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>The problem is not that Ghanaian students lack ambition. They invest years in their education. The problem is a system never designed to connect what they learn to what the economy needs. — BRIDGE Education Sector Analysis, 2026</div>
        {/* Cooperative Network Distribution — Members Exclusive */}
        <div style={{marginTop:'28px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'3px'}}>◆ Members Intelligence · TVET Institution Readiness</div>
              <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>Ghana TVET Institutions — Partnership Readiness Breakdown</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'24px',color:C.lime}}>90+</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'1px',textTransform:'uppercase'}}>TVET institutions</div></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderTop:`1px solid rgba(255,255,255,0.06)`}} className="tc">
            {S.coopTiers.map((tier,i)=>{
              const col={positive:C.positive,amber:C.amber,faint:C.faint}[tier.color]||C.muted;
              return(
                <div key={i} style={{padding:'14px 18px',borderRight:i<2?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}}>
                  <div style={{width:'24px',height:'4px',background:col,marginBottom:'8px'}}/>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'4px'}}>{tier.tier}</div>
                  <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:500,color:col,marginBottom:'4px'}}>{tier.count}</div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'0.5px',marginBottom:'6px'}}>{tier.zone}</div>
                  <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5}}>{tier.desc}</div>
                </div>
              );
            })}
          </div>
          <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
            <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.6,margin:0}}>BRIDGE's TVET Partnership Programme targets Tier 1 institutions in Phase 1, Tier 2 via equipment and curriculum upgrades in Phase 2. The 90+ total represents the full national TVET network — ready infrastructure that requires partnership and investment, not reconstruction.</p>
          </div>
        </div>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',marginTop:'28px',paddingTop:'2px'}}>
          <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"Six constraints do not simply add together — they compound. A graduate who earned a credential that employers do not recognise, trained on equipment that is not used in industry, from an institution with no employer relationship, seeking a job in a region with no TVET presence. Each constraint multiplies the others."</p>
          <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'18px',height:'1px',background:C.lime}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Sector Assessment, 2026</span></div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ EDUCATION PARADOX ═════════════════════════════════════════════════ */
const CropAnalysis=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-paradox" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="02" label="The Education Paradox" badge="5 levels" hint="Unemployment by education level · TVET employment advantage · Skills Fund programme timeline" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div className="sec-rule mob-hide"/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 02 — The Education Paradox</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>More Education, More Unemployment</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>University graduates in Ghana are more likely to be unemployed than those who left school after JHS. This is not a coincidence — it is a structural signal that the formal education system is producing the wrong outputs for the labour market it claims to serve.</p>
      <Fig02CropLoss/>
      {/* Skills Fund Timeline Callout */}
      <div style={{border:`2px solid ${C.amber}`,overflow:'hidden',marginBottom:'20px'}}>
        <div style={{background:C.ink,padding:'10px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.amber,marginBottom:'3px'}}>◆ Members Intelligence · Skills Development Fund Timeline</div>
            <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.paper}}>EU Deforestation Regulation — Timeline &amp; BRIDGE Entry Points</div>
          </div>
          <div style={{background:C.amber,color:C.white,fontFamily:F.sans,fontSize:'9px',fontWeight:800,padding:'3px 10px',letterSpacing:'1px',textTransform:'uppercase',flexShrink:0}}>Q2 2026 APPLICATION</div>
        </div>
        <div style={{background:'rgba(13,26,16,0.85)'}}>
          {S.eudrItems.map((ev,i)=>{
            const typeCol={PAST:'rgba(255,255,255,0.2)',CRITICAL:C.amber,BRIDGE:C.lime,FUTURE:C.muted};
            const tc=typeCol[ev.type]||C.faint;
            return(
              <div key={i} style={{display:'grid',gridTemplateColumns:'90px 1fr',borderBottom:i<4?'1px solid rgba(255,255,255,0.07)':'none',alignItems:'start'}}>
                <div style={{padding:'10px 14px',borderRight:'1px solid rgba(255,255,255,0.07)',display:'flex',flexDirection:'column',gap:'3px'}}>
                  <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:tc}}>{ev.date}</span>
                  <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',color:tc,opacity:0.7,textTransform:'uppercase'}}>{ev.type}</span>
                </div>
                <div style={{padding:'10px 14px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:ev.type==='BRIDGE'?C.lime:C.paper,marginBottom:'2px'}}>{ev.event}</div>
                  <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.5)',fontStyle:'italic',lineHeight:1.5}}>{ev.note}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{padding:'10px 16px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6,margin:0}}>The Q2 2026 Skills Fund priority window is time-sensitive. Ventures with completed institutional assessments and confirmed employer partnerships are best positioned for first-tranche co-financing. BRIDGE's Phase 1 shortlist is structured to qualify immediately — giving the 1:3–5× leverage ratio real deployment momentum in 2026.</p>
        </div>
      </div>
      {/* Market Sizing */}
      <div style={{marginBottom:'20px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
        <div style={{background:C.forest,padding:'8px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>◆ Education Market Sizing — Addressable Opportunity by Venture Type</div>
          <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>Total Addressable Market · BRIDGE Accessible Share · Growth Rate</div>
        </div>
        <div className="fig-scroll"><div style={{minWidth:'560px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 70px 70px 80px',background:C.ink}}>
          {['Commodity','Global TAM','Context','Accessible','Growth','Phase'].map((h,i)=>(
            <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',borderLeft:i>0?'1px solid rgba(255,255,255,0.06)':'none'}}>{h}</div>
          ))}
        </div>
        {S.marketSizes.map((row,i)=>{
          const priColor={IMMEDIATE:C.red,HIGH:C.amber,MEDIUM:C.muted};
          const pc=priColor[row.priority]||C.muted;
          return(
            <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 70px 70px 80px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
              <div style={{padding:'10px 12px'}}>
                <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{row.crop}</div>
                <div style={{display:'flex',alignItems:'center',gap:'5px',marginTop:'3px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:800,color:pc,border:`1px solid ${pc}`,padding:'1px 6px',letterSpacing:'0.5px'}}>{row.priority}</span>
                  <span style={{fontFamily:F.sans,fontSize:'8px',color:C.faint}}>Phase {row.phase}</span>
                </div>
              </div>
              <div style={{padding:'10px 12px',borderLeft:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.forest}}>{row.tam}</div>
              </div>
              <div style={{padding:'10px 12px',fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{row.note}</div>
              <div style={{padding:'10px 10px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.teal,borderLeft:`1px solid ${C.border}`}}>{row.accessible}</div>
              <div style={{padding:'10px 10px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.positive,borderLeft:`1px solid ${C.border}`}}>{row.growth}</div>
              <div style={{padding:'10px 10px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:row.phase===1?C.lime:row.phase===2?C.amber:C.faint,border:`1px solid ${row.phase===1?C.lime:row.phase===2?C.amber:C.border}`,padding:'2px 7px'}}>P{row.phase}</span>
              </div>
            </div>
          );
        })}
        <div style={{padding:'8px 14px',background:C.paperDark,borderTop:`1px solid ${C.border}`}}>
          <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>TAM = Total Addressable Market (global). Accessible = BRIDGE-estimated Ghana market share achievable within 5 years of processing venture launch. Source: ITC Trade Map; FAO; BRIDGE Sector Analysis 2026.</span>
        </div>
        </div></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginTop:'4px'}} className="tc">
        {[
          {title:'TVET vs University — The Evidence',body:'TVET graduates in Ghana have an 8.1% unemployment rate against 22.3% for university graduates. Despite this outcome advantage, TVET enrolls less than 5% of the secondary school cohort. The social stigma blocking rational choice is a design problem — and Career Guidance Platform data showing TVET earnings trajectories is the design solution.'},
          {title:'Apprenticeship — The Invisible System',body:'An estimated 1.5 million Ghanaians are actively learning trades through informal apprenticeship. These learners are acquiring real, economically-critical skills with no formal recognition, no credential employers outside the informal sector can verify, and no pathway into formal employment regardless of demonstrated competence. Apprenticeship Recognition changes this without adding infrastructure.'},
          {title:'The Brain Drain Clock',body:'Ghana trains graduates who leave. The pattern is structural: education investment precedes exit pressure by 2–4 years — enough time for service-linked scholarships to create professional and financial commitment to Ghana before the emigration decision is made. The Diaspora Mentorship Network converts the diaspora from a drain mechanism into a retention infrastructure.'},
          {title:'Employer Demand Is Unmet and Visible',body:'Every BRIDGE sector brief quantifies a workforce gap. Manufacturing needs 78,000 trained workers and can source 29,000. Construction needs 85,000 and sources 35,000. ICT needs 72,000 and sources 28,000. These are not projections — they are current shortfalls that directly limit the growth speed of every other BRIDGE portfolio sector.'},
        ].map((card,i)=>(
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'18px 20px',background:C.paper}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'8px'}}>{card.title}</div>
            <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.65,fontStyle:'italic'}}>{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  </div>
  );
}

/* ═══ REGIONAL STRATEGY ══════════════════════════════════════════════════ */
const RegionalStrategy=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-zones" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="03" label="Regional Strategy" badge="4 zones" hint="Northern regions 30% · zone-by-zone TVET allocation and employer pipeline by region" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 03 — Regional Strategy</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>4 zones · 4 strategies</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Four Zones, Four Strategies</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Ghana's education investment gaps are geographically concentrated. The Northern regions have the lowest TVET access and the highest employment demand from BRIDGE's agricultural and infrastructure programmes. BRIDGE's regional deployment reflects where skills need and employer pipeline intersect most directly.</p>
        <Fig03ZoneAllocation/>
        {/* Mobile zone carousel */}
        <Carousel items={S.zones} renderCard={(z,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden',height:'100%'}}>
            <div style={{background:z.color,padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:i===0?C.ink:C.white}}>{z.zone}</div>
              <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:i===0?C.ink:C.white}}>{z.allocLabel}</div>
            </div>
            <div style={{padding:'12px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>Regions</div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:C.ink,marginBottom:'10px'}}>{z.regions}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>Key Crops</div>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.ink,fontStyle:'italic',marginBottom:'10px'}}>{z.crops}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>BRIDGE Interventions</div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.55,fontStyle:'italic',marginBottom:'8px'}}>{z.interventions}</div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontStyle:'italic',color:C.faint,borderTop:`1px solid ${C.border}`,paddingTop:'8px'}}>{z.context}</div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>All 4 zone strategies</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 70px 1.5fr 1fr',background:C.ink}}>
            {['Zone','Key Crops','Alloc.','BRIDGE Interventions','Context'].map((h,i)=><div key={i} style={{padding:'8px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.08)':'none'}}>{h}</div>)}
          </div>
          {S.zones.map((z,i)=>(
            <div key={i} className={i>=1?open?'':'mob-item-hidden':''} style={{display:'grid',gridTemplateColumns:'1fr 1fr 70px 1.5fr 1fr',borderBottom:i<3?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark}} id={`zone-row-${i}`}>
              <div style={{padding:'12px 12px'}}><div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{z.zone}</div><div style={{fontFamily:F.body,fontSize:'10px',color:C.faint,fontStyle:'italic'}}>{z.regions}</div></div>
              <div style={{padding:'12px 12px',fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{z.crops}</div>
              <div style={{padding:'12px 12px',textAlign:'center',borderLeft:`1px solid ${C.border}`}}><span style={{fontFamily:F.mono,fontSize:'12px',fontWeight:700,color:C.forest}}>{z.allocLabel}</span></div>
              <div style={{padding:'12px 12px',fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{z.interventions}</div>
              <div style={{padding:'12px 12px',fontFamily:F.body,fontSize:'11px',color:C.faint,fontStyle:'italic',lineHeight:1.5,borderLeft:`1px solid ${C.border}`}}>{z.context}</div>
            </div>
          ))}
        </div>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',marginTop:'28px',paddingTop:'2px'}}>
          <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"The geography of Ghana's skills gap is not uniform. The Northern Savannah regions have the lowest TVET access and the highest graduate unemployment simultaneously — and the highest concentration of agriculture and infrastructure investment in the BRIDGE portfolio. This is where skills investment delivers the highest cross-sector return."</p>
          <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'18px',height:'1px',background:C.lime}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Regional Analysis, 2026</span></div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ COMPETITIVE LANDSCAPE ══════════════════════════════════════════════ */
const CompetitiveLandscape=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-market" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="04" label="Competitive Landscape" badge="6 partners" hint="COTVET, NVTI, MasterCard Foundation, MEST, Generation Ghana — positioning and partnership mode" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 04 — Competitive Landscape</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Is Already in the Field</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'16px',fontStyle:'italic'}}>Ghana's education sector has multiple actors — government regulators, international funders, NGO operators, and private institutions. BRIDGE's strategy is to operate in the structural gaps none of them fill, and partner with each where their institutional mandate aligns with BRIDGE outcomes.</p>
        <div style={{background:C.forest,padding:'14px 20px',marginBottom:'20px'}}>
          <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.65)',lineHeight:1.65}}>Donors fund access. Government runs institutions. NGOs deliver programmes. None is optimised for employment outcomes at scale. <strong style={{color:C.lime}}>BRIDGE operates at the employer-linkage layer — where training ends with a confirmed job, not a certificate.</strong></p>
        </div>
        {/* Mobile competitor carousel */}
        <Carousel items={S.competitors} cardClass="mob-snap-wide" renderCard={(co,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden'}}>
            <div style={{background:C.ink,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}>
              <span style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper}}>{co.name}</span>
              <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.3)',flexShrink:0}}>{co.stage}</span>
            </div>
            <div style={{padding:'14px 14px'}}>
              <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6,marginBottom:'12px',fontStyle:'italic'}}>{co.focus}</p>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,background:C.forest,display:'inline-block',padding:'2px 8px',marginBottom:'6px'}}>BRIDGE Position</div>
                <p style={{fontFamily:F.sans,fontSize:'12px',color:C.forest,fontWeight:600,lineHeight:1.5}}>{co.bridge}</p>
              </div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>View all 6 players</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}} id="comp-grid">
          {S.competitors.map((co,i)=>(
            <div key={i} className={i>=2?open?'':'mob-item-hidden':''} style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden'}}>
              <div style={{background:C.ink,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}>
                <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>{co.name}</span>
                <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.3)',flexShrink:0}}>{co.stage}</span>
              </div>
              <div style={{padding:'12px 14px'}}>
                <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6,marginBottom:'10px',fontStyle:'italic'}}>{co.focus}</p>
                <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'9px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,background:C.forest,display:'inline-block',padding:'2px 8px',marginBottom:'5px'}}>BRIDGE Position</div>
                  <p style={{fontFamily:F.sans,fontSize:'11px',color:C.forest,fontWeight:600,lineHeight:1.5}}>{co.bridge}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',marginTop:'28px',paddingTop:'2px'}}>
          <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"None of the existing players is wrong about what they do. COTVET regulates. MasterCard funds access. Generation places graduates. BRIDGE connects the layers — employment-confirmed training at a scale none of them operate at."</p>
          <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'18px',height:'1px',background:C.lime}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Sector Assessment, 2026</span></div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ POLICY WINDOW ═══════════════════════════════════════════════════════ */
const PolicyWindow=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-policy" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="05" label="Policy Window" badge="★★★★★" hint="Ghana Skills Development Fund · 1:3–5× leverage · Q2 2026 application window · $200M World Bank facility" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 05 — Policy Window</div>
          <div style={{background:C.lime,color:C.ink,fontFamily:F.sans,fontSize:'9px',fontWeight:800,padding:'3px 10px',letterSpacing:'1px'}}>★★★★★ BUDGET ALIGNMENT</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The Skills Fund Alignment</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>The Ghana Skills Development Fund — a $200M World Bank IDA facility — is the co-financing infrastructure BRIDGE's education portfolio is designed to operate within. The Q2 2026 priority assessment window is the entry point. Every Tier 1 venture is structured to qualify.</p>
        <Fig04Budget/>
        <div style={{border:`2px solid ${C.lime}`,overflow:'hidden',marginTop:'4px'}}>
          <div style={{background:C.ink,padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'4px'}}>Time-Sensitive — Q2 2026 Deadline</div>
              <div style={{fontFamily:F.display,fontSize:'clamp(14px,2vw,20px)',fontWeight:700,color:C.paper}}>Ghana Skills Development Fund — Key Terms</div>
            </div>
            <div style={{textAlign:'right'}}><div style={{fontFamily:F.mono,fontSize:'28px',fontWeight:500,color:C.lime,lineHeight:1}}>1:3–5×</div><div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.3)',letterSpacing:'1px',textTransform:'uppercase'}}>leverage ratio</div></div>
          </div>
          <button className="mob-toggle mob-toggle-hdr" onClick={()=>setOpen(o=>!o)} style={{width:'100%',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',display:'block',padding:'0'}}>
            <div style={{display:'flex',justifyContent:'space-between',padding:'8px 14px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(13,26,16,0.7)'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.3)',textTransform:'uppercase'}}>Feature</span>
              <span style={{display:'flex',gap:'40px'}}><span className="mob-show" style={{display:'none',fontSize:'10px',color:'rgba(184,217,53,0.5)',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',color:'rgba(250,248,243,0.3)',textTransform:'uppercase'}}>Terms</span></span>
            </div>
          </button>
          {S.oilPalm.map((row,i)=>(
            <div key={i} className={i>=2?open?'':'mob-item-hidden':''} style={{display:'flex',justifyContent:'space-between',padding:'10px 14px',borderBottom:i<6?'1px solid rgba(255,255,255,0.06)':'none',background:'rgba(13,26,16,0.75)',flexWrap:'wrap',gap:'4px'}}>
              <span style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.4)'}}>{row.f}</span>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,textAlign:'right',maxWidth:'60%'}}>{row.t}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:'16px',padding:'14px 18px',background:C.paperDark,border:`1px solid ${C.border}`}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>Free SHS Pipeline — The Enrollment Opportunity</div>
          <p style={{fontFamily:F.body,fontSize:'13px',color:C.muted,lineHeight:1.65,fontStyle:'italic'}}>The Free SHS programme has created the largest secondary school enrollment cohort in Ghana's history — and that cohort is reaching graduation age precisely as BRIDGE's TVET Partnership Programme and Skills Bootcamps are being deployed. The pipeline is real, large, and ready. The question is whether the skills infrastructure exists to convert enrollment into employment. BRIDGE is that infrastructure.</p>
        </div>
        <Fig09CapitalStack/>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',marginTop:'28px',paddingTop:'2px'}}>
          <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"The Skills Fund does not need BRIDGE to deploy. But without an employment-linked operator, its capital will produce credentials, not careers. That is the gap BRIDGE fills — and the Q2 2026 window is when that position is established."</p>
          <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'18px',height:'1px',background:C.lime}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Sector Assessment, 2026</span></div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ FARMER INCOME ══════════════════════════════════════════════════════ */
const FarmerIncome=()=>{
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
  <div id="sec-outcomes" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="06" label="Income Impact" badge="25% → 96%" hint="Bootcamp employment model · international programme benchmarks · +71 percentage point uplift" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
      <div className="sec-rule mob-hide"/>
      <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 06 — Income Impact</div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>The Employment Outcome Thesis</h2>
      <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Each BRIDGE intervention layer stacks — the full employment-linked model raises graduate employment rates from 25% to 96%. This is not incremental improvement. It is a structural transformation of how skills training is designed and delivered.</p>
      <Fig05Income/>
      <Fig08Benchmarks/>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'32px'}} className="tc">
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'20px'}}>
          <p style={{fontFamily:F.display,fontSize:'17px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"When a BRIDGE bootcamp graduate walks into their first day of certified employment, that is not just a better outcome metric. That is a person whose qualification is recognised, a household whose income is stable, a community whose young people do not need to leave to find work."</p>
          <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'18px',height:'1px',background:C.lime}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE PBC Education Sector Investment Thesis</span></div>
        </div>
        <div style={{background:C.ink,padding:'18px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Data Sources</div>
          {[{l:'Baseline employment data',v:'Ghana Statistical Service'},{l:'Bootcamp model benchmark',v:'Generation Ghana; Kenya'},{l:'Employer-linked outcomes',v:'ILO Skills Programme'},{l:'Target validation',v:'World Bank Education 2024'},{l:'Learners in portfolio',v:'1.5M apprentices'}].map((row,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:i<4?'1px solid rgba(255,255,255,0.06)':'none'}}>
              <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>{row.l}</span>
              <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.paper,textAlign:'right',maxWidth:'55%'}}>{row.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  </div>
  );
}

/* ═══ VENTURE PIPELINE ═══════════════════════════════════════════════════ */
const VenturePipeline=()=>{
  const[t1o,setT1o]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  const[t2o,setT2o]=useState(false);
  const t1=S.ventures.filter(v=>v.tier===1);
  const t2=S.ventures.filter(v=>v.tier===2);
  const t3=S.ventures.filter(v=>v.tier===3);
  const VRow=({v,i,last})=>(
    <div style={{display:'grid',gridTemplateColumns:'28px 2fr 88px 80px 70px 70px 70px 70px',borderBottom:!last?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'center'}}>
      <div style={{padding:'9px 6px',fontFamily:F.mono,fontSize:'11px',color:C.lime,textAlign:'center',background:C.forest}}>{v.num}</div>
      <div style={{padding:'9px 12px',borderLeft:`1px solid ${C.border}`}}>
        <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{v.name}</div>
        <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,fontStyle:'italic',lineHeight:1.4}}>{v.desc}</div>
      </div>
      <div style={{padding:'8px 10px',borderLeft:`1px solid ${C.border}`}}>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,padding:'2px 6px',letterSpacing:'0.3px',background:MODE_BG[v.mode]||C.muted,color:MODE_TX[v.mode]||C.paper}}>{v.mode}</span>
      </div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'11px',color:C.forest,fontWeight:700,borderLeft:`1px solid ${C.border}`}}>{v.capital}</div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'11px',color:C.positive,borderLeft:`1px solid ${C.border}`}}>{v.irr}</div>
      <div style={{padding:'8px 10px',borderLeft:`1px solid ${C.border}`}}><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[v.risk]||C.muted,letterSpacing:'0.3px'}}>{v.risk}</span></div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'11px',color:C.muted,borderLeft:`1px solid ${C.border}`}}>{v.payback}</div>
      <div style={{padding:'8px 10px',fontFamily:F.mono,fontSize:'10px',color:C.faint,borderLeft:`1px solid ${C.border}`}}>{v.start}</div>
    </div>
  );
  const TH=()=>(
    <div style={{display:'grid',gridTemplateColumns:'28px 2fr 88px 80px 70px 70px 70px 70px',background:C.forest}}>
      {['#','Venture','Mode','Capital','IRR','Risk','Payback','Start'].map((h,i)=>(
        <div key={i} style={{padding:'7px 10px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
      ))}
    </div>
  );
  const MCard=({v})=>(
    <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'12px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
        <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{v.name}</span>
        <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.forest}}>{v.num}</span>
      </div>
      <div style={{fontFamily:F.mono,fontSize:'11px',color:C.forest,marginBottom:'2px'}}>{v.capital}</div>
      <div style={{fontFamily:F.mono,fontSize:'10px',color:C.positive,marginBottom:'4px'}}>{v.irr}</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[v.risk]||C.muted}}>{v.risk} RISK</span>
        <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>{v.start}</span>
      </div>
    </div>
  );
  return(
    <div id="sec-ventures" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="07" label="Venture Portfolio" badge="18 ventures" hint="Tier 1: $11.4–20.2M · 7 employment-linked ventures · Skills Bootcamps leading at score 44" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>Section 07 — The Portfolio</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'5px 14px',letterSpacing:'1px'}}>18 ventures · $14–28M total</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>18 Ventures Across 3 Tiers</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced by employment impact, capital efficiency, and the Q2 2026 Skills Fund window. Tier 1 establishes the employer pipeline and training infrastructure that Tier 2 digital and institutional investments build on. The sequencing is deliberate: bootcamps and TVET partnerships before Centres of Excellence.</p>
        <Fig06Matrix/>
        {/* Tier 1 */}
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.lime,color:C.ink,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 1</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Priority Implementation — 2026–2028</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$6.3–12.6M · 6 ventures</span>
          </div>
          <div className="desk-only">
            <div className="fig-scroll"><div style={{minWidth:'700px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
              <TH/>
              <button className="mob-toggle mob-toggle-hdr" onClick={()=>setT1o(o=>!o)} style={{width:'100%',background:'rgba(184,217,53,0.04)',border:'none',cursor:'pointer',textAlign:'left',padding:'6px 12px',display:'flex',justifyContent:'space-between',borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.limeDark,letterSpacing:'1.5px',textTransform:'uppercase'}}>Tap to expand all</span>
                <span className="mob-show" style={{display:'none',fontSize:'10px',color:C.limeDark,transform:t1o?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
              </button>
              {t1.map((v,i)=><VRow key={i} v={v} i={i} last={i===t1.length-1}/>)}
            </div></div>
          </div>
          <Carousel items={t1} renderCard={(v,i)=><MCard v={v}/>} cardClass="mob-snap-sm"/>
        </div>
        {/* Tier 2 */}
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.amber,color:C.white,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 2</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Scale Phase — 2028–2030</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$5.2–10.4M · 5 ventures</span>
          </div>
          <div className="desk-only">
            <div className="fig-scroll"><div style={{minWidth:'700px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
              <TH/>
              <button className="mob-toggle mob-toggle-hdr" onClick={()=>setT2o(o=>!o)} style={{width:'100%',background:'rgba(184,115,10,0.04)',border:'none',cursor:'pointer',textAlign:'left',padding:'6px 12px',display:'flex',justifyContent:'space-between',borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.amber,letterSpacing:'1.5px',textTransform:'uppercase'}}>Tap to expand all</span>
                <span className="mob-show" style={{display:'none',fontSize:'10px',color:C.amber,transform:t2o?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
              </button>
              {t2.map((v,i)=><VRow key={i} v={v} i={i} last={i===t2.length-1}/>)}
            </div></div>
          </div>
          <Carousel items={t2} renderCard={(v,i)=><MCard v={v}/>} cardClass="mob-snap-sm"/>
        </div>
        {/* Tier 3 */}
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'10px',flexWrap:'wrap'}}>
            <div style={{background:C.muted,color:C.paper,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>TIER 3</div>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:600,color:C.ink}}>Long-Term / Conditional — 2030+</span>
            <span style={{fontFamily:F.mono,fontSize:'11px',color:C.muted}}>$5.8–11.6M · 4 ventures</span>
          </div>
          <div className="desk-only">
            <div className="fig-scroll"><div style={{minWidth:'700px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
              <TH/>
              {t3.map((v,i)=><VRow key={i} v={v} i={i} last={i===t3.length-1}/>)}
            </div></div>
          </div>
          <Carousel items={t3} renderCard={(v,i)=><MCard v={v}/>} cardClass="mob-snap-sm"/>
        </div>
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>Mode: Direct Op = BRIDGE operates directly · Partnership = co-delivery with sector partner · Investment = equity or quasi-equity · Guidance = advisory and technical assistance</div>
      </div>
    </div>
    </div>
  );
};

/* ═══ DEPLOYMENT TIMELINE ════════════════════════════════════════════════ */
const DeploymentTimeline=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  const phases=[S.timeline.phase1,S.timeline.phase2,S.timeline.phase3];
  const pColors=[C.lime,C.amber,C.muted];
  const pBg=[C.forest,C.paperDark,C.paper];
  const pTx=[C.paper,C.ink,C.ink];
  return(
    <div id="sec-roadmap" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="08" label="Deployment Roadmap" badge="3 phases" hint="Phase 1: 7 Tier 1 ventures · Q2 2026 Skills Fund application · bootcamps and TVET partnerships first" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 08 — Implementation</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Deployment Roadmap</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'0',fontStyle:'italic'}}>Sequenced deployment built around the Q2 2026 Skills Fund priority window. Phase 1 is the critical entry point — TVET partnerships, bootcamps, and apprenticeship recognition all qualify for co-financing in the first disbursement tranche.</p>
        <Fig07Roadmap/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0',border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:'20px'}} className="tc">
          {phases.map((p,i)=>(
            <div key={i} style={{borderRight:i<2?`1px solid ${C.border}`:'none'}}>
              <div style={{background:pBg[i],padding:'14px 18px',borderBottom:`3px solid ${pColors[i]}`}}>
                <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:pColors[i],letterSpacing:'1px',marginBottom:'2px'}}>{p.label}</div>
                <div style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:pTx[i]}}>{p.years}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:i===0?'rgba(250,248,243,0.45)':C.faint}}>{p.capital} · {p.count}</div>
              </div>
              <div style={{padding:'14px 18px',background:C.paper}}>
                <button className="mob-toggle" onClick={()=>setOpen(o=>!o)} style={{marginBottom:'6px',width:'100%',display:'none',alignItems:'center',justifyContent:'space-between',background:'transparent',border:'none',borderBottom:`1px solid ${C.border}`,cursor:'pointer',padding:'6px 0',fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted}}>
                  <span>{p.count}</span><span style={{fontSize:'10px',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
                </button>
                {p.items.map((item,j)=>(
                  <div key={j} className={j>=2?open?'':'mob-item-hidden':''} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'flex-start'}}>
                    <span style={{color:pColors[i],flexShrink:0,fontWeight:700,fontSize:'12px',lineHeight:1.4}}>→</span>
                    <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'18px 20px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Critical Path Dependencies</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}} className="tc">
            {[{m:'Skills Bootcamp Launch',d:'Employer commitments confirmed + cohort 1 enrolled + TVET partner institution signed'},
              {m:'TVET Partnership',d:'Skills Fund co-financing application submitted + 5 institution shortlist confirmed'},
              {m:'Apprenticeship Recognition',d:'NVTI/COTVET partnership MOU signed + competency framework agreed'},
              {m:'Phase 2 Activation',d:'Phase 1 placement rate data published + employer demand validated at scale'}
            ].map((dep,i)=>(
              <div key={i} style={{padding:'8px 0',borderBottom:`1px solid ${C.border}`,display:'flex',gap:'10px'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,flexShrink:0,minWidth:'120px'}}>{dep.m}</span>
                <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic'}}>{dep.d}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',marginTop:'28px',paddingTop:'2px'}}>
          <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"The Q2 2026 Skills Fund window is not just a funding opportunity — it is a sequencing imperative. Ventures that enter the co-financing stack in Phase 1 establish the employer relationships and placement pipelines that all subsequent phases depend on."</p>
          <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'18px',height:'1px',background:C.lime}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Operations Planning, 2026</span></div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ CO-INVESTMENT LANDSCAPE ════════════════════════════════════════════ */
const CoInvestmentLandscape=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-coinvest" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="◆" label="Co-Investment" badge="6 partners" hint="Skills Fund, MasterCard Foundation, USAID, GIZ, COTVET/NVTI, AfDB — capital types and BRIDGE stack role" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted}}>◆ Members Intelligence · Co-Investment Landscape</div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'10px',fontWeight:700,padding:'4px 12px',letterSpacing:'1px'}}>6 key actors profiled</div>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Who Else Is Investing — and Where BRIDGE Fits</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Ghana's education investment landscape is active — but misaligned on employment outcomes. International funders deploy significant capital through grants and technical assistance that requires private sector execution to convert into jobs. BRIDGE occupies the employer-linked operations role that most donors cannot fill: programme management, outcome accountability, and long-term sustainability beyond grant cycles.</p>
        <div style={{background:C.paperDark,padding:'14px 20px',border:`1px solid ${C.border}`,marginBottom:'20px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>BRIDGE's Co-Investment Positioning</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}} className="tc">
            {[
              {l:'What DFIs provide',v:'Concessional capital, grants, and technical assistance — but cannot operate employment-linked training programmes at scale'},
              {l:'What donors provide',v:'Programme funding and access goals — but cannot guarantee employment outcomes or sustain programmes beyond grant cycles'},
              {l:'What BRIDGE provides',v:'Employment-linked operations, employer relationship management, outcome accountability, and long-term programme sustainability'},
            ].map((p,i)=>(
              <div key={i} style={{padding:'10px 12px',background:C.paper,border:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'5px'}}>{p.l}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.55,fontStyle:'italic'}}>{p.v}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile co-investor carousel */}
        <Carousel items={S.coInvestors} cardClass="mob-snap-wide" renderCard={(co,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden'}}>
            <div style={{background:C.forest,padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,lineHeight:1.3}}>{co.name}</span>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,border:'1px solid rgba(184,217,53,0.3)',padding:'2px 7px',flexShrink:0}}>{co.stage}</span>
            </div>
            <div style={{padding:'12px 14px'}}>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55,marginBottom:'8px'}}>{co.focus}</div>
              <div style={{display:'flex',justifyContent:'space-between',gap:'8px',marginBottom:'6px',borderTop:`1px solid ${C.border}`,paddingTop:'8px'}}> 
                <div><div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'2px'}}>Capital</div><div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest}}>{co.capital}</div></div>
                <div style={{textAlign:'right'}}><div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'2px'}}>Status</div><div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.positive}}>{co.stage}</div></div>
              </div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest,background:'rgba(27,77,62,0.06)',padding:'6px 8px'}}>{co.alignment}</div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>All 6 co-investment actors</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only">
          <div className="fig-scroll"><div style={{minWidth:'580px',border:`1px solid ${C.border}`,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'160px 70px 1fr 110px 100px',background:C.forest}}>
            {['Organisation','Type','Focus & Alignment','Capital Range','Status'].map((h,i)=>(
              <div key={i} style={{padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
            ))}
          </div>
          {S.coInvestors.map((co,i)=>(
            <div key={i} className={i>=2?open?'':'mob-item-hidden':''} style={{display:'grid',gridTemplateColumns:'160px 70px 1fr 110px 100px',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'start'}}>
              <div style={{padding:'11px 12px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,lineHeight:1.3}}>{co.name}</div>
              <div style={{padding:'11px 10px',borderLeft:`1px solid ${C.border}`}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.forest,border:`1px solid ${C.border}`,padding:'2px 5px',display:'inline-block',lineHeight:1.4}}>{co.stage}</span>
              </div>
              <div style={{padding:'11px 12px',borderLeft:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5,marginBottom:'4px'}}>{co.focus}</div>
                <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.forest}}>{co.alignment}</div>
              </div>
              <div style={{padding:'11px 12px',fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest,borderLeft:`1px solid ${C.border}`}}>{co.capital}</div>
              <div style={{padding:'11px 12px',fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.positive,lineHeight:1.4,borderLeft:`1px solid ${C.border}`}}>{co.stage}</div>
            </div>
          ))}
          </div></div>
        </div>
        <div style={{marginTop:'12px',fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px',lineHeight:1.6}}>BRIDGE's blended finance architecture is designed to complement these actors, not compete with them. The correct co-investment sequence: BRIDGE equity anchor → DFI concessional layer → government co-financing → cooperative equity participation. This stacking structure maximises leverage and aligns every stakeholder's incentive with BRIDGE's long-term portfolio returns.</div>
      </div>
    </div>
    </div>
  );
};

/* ═══ CROSS-SECTOR SYNERGY ════════════════════════════════════════════════ */
const CrossSectorSynergy=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-synergy" className="pad-section" style={{background:C.paper,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="10" label="System Integration" badge="5 sector links" hint="Education is the upstream constraint on every BRIDGE sector — Agriculture, Infrastructure, Health, Technology and more" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'24px',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Section 10 — System Integration</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.ink}}>Education as Upstream Constraint</h2>
          </div>
          <div style={{background:C.forest,color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,padding:'6px 14px',letterSpacing:'1px',flexShrink:0}}>8 sector links</div>
        </div>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Education and Skills is the sector with the most integration points across the full 12-sector BRIDGE portfolio. A construction workforce requires certified tradespeople. An agri-processing facility requires technicians. A digital platform requires operators. Every sector brief ends with a workforce gap — Education resolves it. When BRIDGE invests in skills, it de-risks investment in Infrastructure, Agriculture, Health, and Technology simultaneously.</p>
        {/* Mobile synergy carousel */}
        <Carousel items={S.synergies} renderCard={(syn,i)=>(
          <div style={{background:C.paperDark,border:`1px solid ${C.border}`,padding:'16px 16px',display:'flex',gap:'12px',alignItems:'flex-start'}}>
            <div style={{width:'38px',height:'38px',background:C.forest,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime}}>{syn.sector.substring(0,2)}</span>
            </div>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'6px'}}>{syn.sector}</div>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55}}>{syn.link}</div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>All 8 integration links</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
          {S.synergies.map((syn,i)=>(
            <div key={i} className={i>=4?open?'':'mob-item-hidden':''} style={{background:C.paperDark,border:`1px solid ${C.border}`,padding:'14px 18px',display:'flex',gap:'12px',alignItems:'flex-start'}}>
              <div style={{width:'36px',height:'36px',background:C.forest,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime}}>{syn.sector.substring(0,2)}</span>
              </div>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'4px'}}>{syn.sector}</div>
                <div style={{fontFamily:F.body,fontSize:'11px',color:C.muted,fontStyle:'italic',lineHeight:1.5}}>{syn.link}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',marginTop:'28px',paddingTop:'2px'}}>
          <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"Every BRIDGE sector brief ends with a workforce gap. Education resolves it. When BRIDGE invests in a TVET partnership or a skills bootcamp, it is not just building human capital — it is de-risking every other investment in the portfolio."</p>
          <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'18px',height:'1px',background:C.lime}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Portfolio Integration Analysis, 2026</span></div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ RISK & THESIS ══════════════════════════════════════════════════════ */
const RiskThesis=()=>{
  const[open,setOpen]=useState(false);
  const[secOpen,setSecOpen]=useState(()=>typeof window==='undefined'||window.innerWidth>600);
  const{forceOpen}=React.useContext(ExpandCtx);
  useEffect(()=>{if(forceOpen!==null)setSecOpen(forceOpen);},[forceOpen]);
  return(
    <div id="sec-risk" className="pad-section" style={{background:C.paperDark,padding:'48px 64px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SecHdr num="09" label="Risk & Thesis" badge="6 risk categories" hint="Employer engagement, policy, stigma, brain drain, quality assurance, digital access — each with specific mitigation" open={secOpen} onToggle={()=>setSecOpen(o=>!o)} dark={false}/>
        <div className={secOpen?'':`sec-body-hidden`}>
        <div className="sec-rule mob-hide"/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Section 09 — Risk Analysis</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,32px)',fontWeight:700,color:C.ink,marginBottom:'8px'}}>Risk &amp; Mitigation</h2>
        <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'20px',fontStyle:'italic'}}>Education investment carries structural risks — employer engagement gaps, policy instability, and persistent TVET stigma chief among them. BRIDGE's employment-linked design, Skills Fund partnership structure, and outcome tracking architecture are each built to manage a specific risk category.</p>
        {/* Mobile risk carousel */}
        <Carousel items={S.risks} renderCard={(r,i)=>(
          <div style={{border:`1px solid ${C.border}`,background:C.paper,overflow:'hidden'}}>
            <div style={{padding:'12px 14px',borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,lineHeight:1.3,maxWidth:'65%'}}>{r.r}</div>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[r.sev]||C.muted,letterSpacing:'1px',textTransform:'uppercase',border:`1px solid ${RISK_COLOR[r.sev]||C.muted}`,padding:'3px 8px',flexShrink:0}}>{r.sev}</span>
            </div>
            <div style={{padding:'12px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>BRIDGE Mitigation</div>
              <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.65}}>{r.mit}</div>
            </div>
          </div>
        )}/>
        <button className="mob-toggle" onClick={()=>setOpen(o=>!o)}>
          <span>Full risk matrix</span>
          <span className="mob-show" style={{display:'none',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>↓</span>
        </button>
        <div className="desk-only" style={{border:`1px solid ${C.border}`,overflow:'hidden',marginBottom:'32px'}}>
          <div style={{display:'grid',gridTemplateColumns:'1.8fr 100px 2.5fr',background:C.forest}}>
            {['Risk Category','Severity','BRIDGE Mitigation Strategy'].map((h,i)=>(
              <div key={i} style={{padding:'8px 14px',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,borderLeft:i>0?'1px solid rgba(255,255,255,0.1)':'none'}}>{h}</div>
            ))}
          </div>
          {S.risks.map((r,i)=>(
            <div key={i} className={i>=1?open?'':'mob-item-hidden':''} style={{display:'grid',gridTemplateColumns:'1.8fr 100px 2.5fr',borderBottom:i<5?`1px solid ${C.border}`:'none',background:i%2===0?C.paper:C.paperDark,alignItems:'start'}}>
              <div style={{padding:'12px 14px',fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{r.r}</div>
              <div style={{padding:'12px 14px',borderLeft:`1px solid ${C.border}`,textAlign:'center'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:RISK_COLOR[r.sev]||C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>{r.sev}</span>
              </div>
              <div style={{padding:'12px 14px',fontFamily:F.body,fontSize:'12px',color:C.muted,fontStyle:'italic',lineHeight:1.55,borderLeft:`1px solid ${C.border}`}}>{r.mit}</div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'32px'}} className="tc">
          <div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Investment Thesis</div>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'14px'}}>{S.thesis}</p>
            <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300}}>{S.thesis2}</p>
          </div>
          <div>
            <div style={{background:C.forest,padding:'18px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>Deployment Parameters</div>
              {S.deploy.map((p,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<5?'1px solid rgba(255,255,255,0.08)':'none',gap:'8px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.4)'}}>{p.l}</span>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,textAlign:'right',maxWidth:'55%'}}>{p.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'22px',marginTop:'28px',paddingTop:'2px'}}>
          <p style={{fontFamily:F.display,fontSize:'16px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.55}}>"Education is not a sector BRIDGE is investing in because it is fashionable. It is the one sector whose constraint shows up in every other brief. Skills is the input. Employment is the output. The BRIDGE model — employment-confirmed before training begins — is the mechanism that connects them."</p>
          <div style={{marginTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'18px',height:'1px',background:C.lime}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,letterSpacing:'1.5px',textTransform:'uppercase'}}>BRIDGE Education Sector Investment Thesis</span></div>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ═══ UPSELL ══════════════════════════════════════════════════════════════ */
const Upsell=()=>{
  const[intent,setIntent]=useState(null); // null | 'package' | 'partnership' | 'briefing'
  const[pkgOpen,setPkgOpen]=useState(false);

  const packageItems=[
    {item:'Venture Financial Models',detail:'10-year P&L, IRR sensitivity tables, and working capital schedules for all 15 ventures.'},
    {item:'Skills Bootcamp Programme Design Pack',detail:'Sector-by-sector curriculum, employer commitment templates, cohort sizing, and placement pathway structure.'},
    {item:'Due Diligence Checklists',detail:'Processing facility, cooperative partner assessment, site selection, regulatory compliance per zone.'},
    {item:'Cooperative Partner Directory',detail:'200+ verified cooperatives — contact data, crop specialisation, governance rating, financial readiness.'},
    {item:'Skills Fund Application Guide',detail:'Filing templates, co-financing eligibility criteria, application structure — ready for Q2 2026 priority window.'},
    {item:'Apprenticeship Recognition Rollout Plan',detail:'NVTI/COTVET partnership terms, competency assessment methodology, 1.5M beneficiary phasing plan.'},
    {item:'AgTech Competitive Intelligence',detail:'40+ companies assessed — technology readiness, funding status, BRIDGE partnership potential.'},
    {item:'Outcome Tracking Playbook',detail:'Graduate employment verification process, employer sign-off protocol, public reporting framework for all 18 ventures.'},
    {item:'Farmer Income Simulation Tool',detail:'Farm-to-consumer model by crop, zone, and intervention layer — built for due diligence.'},
    {item:'Regional Deployment Maps',detail:'GIS-referenced site selection, logistics corridors, agro-industrial park data across 4 zones.'},
    {item:'Policy Monitoring — Live Access',detail:'Monthly tracking of Skills Fund deployment, COTVET policy changes, employer demand shifts, and education sector developments.'},
    {item:'Quarterly Intelligence Updates',detail:'New data and revised assessments across all 12 sectors every quarter.'},
  ];

  const partnershipPhases=[
    {phase:'01',title:'Mandate Alignment',dur:'2–3 hrs',desc:'BRIDGE maps your capital profile, priorities, and risk parameters against the 12-sector portfolio. Honest, direct, specific.'},
    {phase:'02',title:'Bespoke Intelligence Build',dur:'4–6 wks',desc:'Custom financial models, due diligence frameworks, and co-investment capital stack built for your mandate.'},
    {phase:'03',title:'Market Access',dur:'Ongoing',desc:'Direct MoFA introductions, cooperative networks in your target zones, AgTech partners, procurement channels.'},
    {phase:'04',title:'Deal Origination',dur:'Rolling',desc:'Into opportunities before market-ready — at founder terms, with BRIDGE operational management. You bring capital. We bring Ghana.'},
  ];

  const intentCopy={
    package:{
      label:'Full Intelligence Package',
      sub:'Operational tools built for your process',
      cta:'Request Package Scope',
      href:'mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Education Sector',
    },
    partnership:{
      label:'Partnership Engagement',
      sub:'BRIDGE at the table with you',
      cta:'Start the Conversation',
      href:'mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Education',
    },
    briefing:{
      label:'30-Min Briefing',
      sub:'No commitment — we figure out fit first',
      cta:'Schedule Now →',
      href:'mailto:intelligence@bridgepbc.com?subject=Briefing Request — Education Sector',
    },
  };

  return(
    <div id="upsell" style={{background:C.ink,position:'relative',overflow:'hidden'}}>

      {/* Ghost watermark */}
      <div style={{position:'absolute',right:'-20px',top:'40px',fontFamily:F.display,fontSize:'clamp(100px,20vw,280px)',fontWeight:900,color:'rgba(255,255,255,0.018)',pointerEvents:'none',userSelect:'none',letterSpacing:'-10px',lineHeight:1}}>05</div>

      {/* ── Membership bar ── */}
      <div style={{background:'rgba(184,217,53,0.06)',borderBottom:'1px solid rgba(184,217,53,0.1)',padding:'9px 64px'}} className="pad-topbar">
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.lime,flexShrink:0}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1.5px',textTransform:'uppercase'}}>Members Access Active</span>
            <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.2)'}}>· Sector 05 of 12 · Full edition included</span>
          </div>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.18)'}}>intelligence@bridgepbc.com</span>
        </div>
      </div>

      {/* ── Core CTA block ── */}
      <div className="pad-upsell" style={{padding:'44px 64px 0',position:'relative'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>

          {/* Headline */}
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
            <div style={{width:'28px',height:'2px',background:C.lime,flexShrink:0}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)'}}>What comes next</span>
          </div>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,4vw,48px)',fontWeight:900,fontStyle:'italic',color:C.paper,lineHeight:1.1,letterSpacing:'-1px',marginBottom:'12px',maxWidth:'700px'}}>
            You have the intelligence.<br/>
            <span style={{color:C.lime}}>Now let's deploy it.</span>
          </h2>
          <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.45)',lineHeight:1.75,maxWidth:'580px',marginBottom:'28px',fontStyle:'italic'}}>Your Members brief is the strategic layer. The next step is operational — financial models, due diligence tools, local relationships, and BRIDGE alongside you as you move from conviction to capital.</p>

          {/* ── Intent selector — 3 buttons ── */}
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'12px'}}>What are you looking for?</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',marginBottom:'24px'}} className="tc">
            {[
              {key:'package',label:'Full Package',sub:'Operational tools & models',icon:(
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              )},
              {key:'partnership',label:'Partnership',sub:'Work directly with BRIDGE',icon:(
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              )},
              {key:'briefing',label:'30-Min Briefing',sub:'No commitment, find fit first',icon:(
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              )},
            ].map((opt)=>{
              const active=intent===opt.key;
              return(
                <button key={opt.key} onClick={()=>setIntent(intent===opt.key?null:opt.key)}
                  style={{background:active?'rgba(184,217,53,0.1)':'rgba(255,255,255,0.03)',border:active?`1.5px solid ${C.lime}`:'1px solid rgba(255,255,255,0.1)',padding:'14px 16px',cursor:'pointer',textAlign:'left',transition:'all 0.2s',display:'flex',alignItems:'center',gap:'14px'}}>
                  <div style={{color:active?C.lime:'rgba(255,255,255,0.35)',flexShrink:0,transition:'color 0.2s'}}>{opt.icon}</div>
                  <div style={{minWidth:0}}>
                    <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:active?C.lime:C.paper,marginBottom:'2px',transition:'color 0.2s'}}>{opt.label}</div>
                    <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.3)',fontStyle:'italic'}}>{opt.sub}</div>
                  </div>
                  <div style={{marginLeft:'auto',flexShrink:0,color:active?C.lime:'rgba(255,255,255,0.15)',fontFamily:F.sans,fontSize:'14px',transition:'all 0.2s',transform:active?'rotate(90deg)':'none'}}>›</div>
                </button>
              );
            })}
          </div>

          {/* ── Intent detail panel ── */}
          {intent==='package'&&(
            <div style={{border:'1px solid rgba(184,217,53,0.2)',background:'rgba(184,217,53,0.04)',marginBottom:'20px',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(184,217,53,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
                <div>
                  <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.lime,marginBottom:'2px'}}>Full Intelligence Package — Education &amp; Skills Sector</div>
                  <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.4)'}}>12 standalone deliverables · custom-priced · formatted for your investment process</div>
                </div>
                <button onClick={()=>setPkgOpen(o=>!o)} style={{background:'transparent',border:'1px solid rgba(184,217,53,0.3)',padding:'6px 12px',cursor:'pointer',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.lime,letterSpacing:'1px',whiteSpace:'nowrap'}}>
                  {pkgOpen?'Hide list ↑':'View all 12 →'}
                </button>
              </div>
              {pkgOpen&&(
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0'}} className="upsell-grid">
                  {packageItems.map((pkg,idx)=>(
                    <div key={idx} style={{padding:'11px 16px',borderBottom:idx<packageItems.length-2?'1px solid rgba(255,255,255,0.05)':'none',borderRight:idx%2===0?'1px solid rgba(255,255,255,0.05)':'none',display:'flex',gap:'10px',alignItems:'flex-start'}}>
                      <span style={{color:C.lime,fontFamily:F.mono,fontSize:'11px',fontWeight:700,flexShrink:0,lineHeight:1.5}}>→</span>
                      <div>
                        <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.lime,marginBottom:'2px'}}>{pkg.item}</div>
                        <div style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.35)',lineHeight:1.55,fontStyle:'italic'}}>{pkg.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{padding:'14px 20px',background:'rgba(0,0,0,0.15)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
                <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.3)'}}>Custom-priced. No standard tiers. Scope built around your mandate.</span>
                <a href="mailto:intelligence@bridgepbc.com?subject=Full Package Scope Request — Education Sector"
                  style={{background:C.lime,color:C.ink,padding:'10px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',flexShrink:0}}>
                  Request Scope →
                </a>
              </div>
            </div>
          )}

          {intent==='partnership'&&(
            <div style={{border:'1px solid rgba(255,255,255,0.1)',background:'rgba(46,90,77,0.2)',marginBottom:'20px',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper,marginBottom:'4px'}}>BRIDGE Partnership Engagement — Four Phases</div>
                <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.4)'}}>Not a product. A working relationship built around your mandate and the ventures you want to pursue.</div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0'}} className="tc">
                {partnershipPhases.map((p,i)=>(
                  <div key={i} style={{padding:'14px 18px',borderBottom:i<2?'1px solid rgba(255,255,255,0.07)':'none',borderRight:i%2===0?'1px solid rgba(255,255,255,0.07)':'none',position:'relative',overflow:'hidden'}}>
                    <div style={{position:'absolute',right:'10px',top:'8px',fontFamily:F.display,fontSize:'40px',fontWeight:900,color:'rgba(184,217,53,0.05)',lineHeight:1,userSelect:'none'}}>{p.phase}</div>
                    <div style={{fontFamily:F.mono,fontSize:'9px',color:C.lime,letterSpacing:'2px',marginBottom:'4px',textTransform:'uppercase'}}>Phase {p.phase} · {p.dur}</div>
                    <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,marginBottom:'5px'}}>{p.title}</div>
                    <div style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.45)',lineHeight:1.6,fontStyle:'italic'}}>{p.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{padding:'14px 20px',background:'rgba(0,0,0,0.15)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
                <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.3)'}}>Starts with a conversation. If fit isn't there, we'll tell you directly.</span>
                <a href="mailto:intelligence@bridgepbc.com?subject=Partnership Inquiry — BRIDGE Education"
                  style={{background:'rgba(255,255,255,0.08)',border:`1px solid ${C.lime}`,color:C.lime,padding:'10px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',flexShrink:0}}>
                  Start the Conversation →
                </a>
              </div>
            </div>
          )}

          {intent==='briefing'&&(
            <div style={{border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.03)',marginBottom:'20px',padding:'20px 22px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
              <div style={{maxWidth:'480px'}}>
                <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper,marginBottom:'6px'}}>30-Minute Mandate Briefing — No Commitment</div>
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.65}}>Tell us your capital profile and sector focus. We'll show you exactly which of the 18 Education &amp; Skills ventures match your mandate — and be direct if the fit isn't there. Takes 30 minutes. No pitch deck.</div>
              </div>
              <a href="mailto:intelligence@bridgepbc.com?subject=Briefing Request — Education Sector"
                className="cta-primary" style={{background:C.lime,color:C.ink,padding:'14px 28px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',flexShrink:0,display:'flex',alignItems:'center',gap:'8px'}}>
                Schedule Now <span style={{fontSize:'16px'}}>→</span>
              </a>
            </div>
          )}

          {/* ── Urgency strip — always visible ── */}
          <div style={{border:`1px solid ${C.amber}`,borderLeft:`3px solid ${C.amber}`,background:'rgba(184,115,10,0.08)',padding:'14px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
              <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.amber,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0}}>⚡ Q2 2026</span>
              <div style={{width:'1px',height:'20px',background:'rgba(184,115,10,0.35)',flexShrink:0}}/>
              <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>Skills Fund — Q2 2026 Priority Application Window</span>
              <span className="mob-hide" style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.35)',fontStyle:'italic'}}>Early movers secure first-tranche co-financing positions late entrants cannot replicate.</span>
            </div>
            <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:700,color:C.amber,flexShrink:0}}>1:3–5×</div>
          </div>

        </div>
      </div>

      {/* ── Footer row ── */}
      <div className="pad-upsell" style={{padding:'20px 64px 36px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px',borderTop:'1px solid rgba(255,255,255,0.07)',paddingTop:'18px'}}>
          <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.2)',lineHeight:1.6,margin:0,maxWidth:'480px'}}>No published price list. Every engagement starts with a conversation. If the fit isn't there, we'll tell you directly.</p>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.15)',letterSpacing:'0.5px',textAlign:'right',lineHeight:1.8}}>intelligence@bridgepbc.com<br/>bridgepbc.com/intelligence</div>
        </div>
      </div>
    </div>
  );
};


const Footer=()=>(
  <div className="pad-footer" style={{background:'#050d07',padding:'18px 64px',borderTop:'1px solid rgba(184,217,53,0.1)'}}>
    <div className="footer-inner" style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
        <Logo height={17} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.08)'}}/>
        <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.16)',letterSpacing:'0.5px',lineHeight:1.5}}>
          Sector 05 of 12 · Education &amp; Skills Development
          <br className="mob-hide"/>
          <span className="mob-hide"> · Full Members Edition · March 2026 · bridgepbc.com/intelligence</span>
        </span>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'18px'}}>
        {['All Sectors','Members','Full Package','Contact'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.2)',textDecoration:'none',letterSpacing:'0.5px'}}>{l}</a>))}
      </div>
    </div>
  </div>
);

/* ═══ ROOT ════════════════════════════════════════════════════════════════ */
const ExpandCtx=React.createContext({forceOpen:null});

export default function EducationBrief(){
  const coverRef=useRef(null);
  const[forceOpen,setForceOpen]=useState(null); // null=local, true=all open, false=all closed
  const[barAllOpen,setBarAllOpen]=useState(false);
  const toggleAll=()=>{
    const next=!barAllOpen;
    setBarAllOpen(next);
    setForceOpen(next);
    // Reset after a tick so local state takes over on next individual toggle
    setTimeout(()=>setForceOpen(null),50);
  };
  return(
    <ExpandCtx.Provider value={{forceOpen}}>
    <div style={{fontFamily:F.body,background:C.paper,paddingBottom:'60px'}}>
      <Gf/>
      <ReadingProgressBar coverRef={coverRef}/>
      <SectionFooterNav/>
      <Cover logoRef={coverRef}/>
      <MobExpandBar allOpen={barAllOpen} onToggle={toggleAll}/>
      <Executive/>
      <SubSectors/>
      <StructuralProblem/>
      <CropAnalysis/>
      <RegionalStrategy/>
      <CompetitiveLandscape/>
      <PolicyWindow/>
      <FarmerIncome/>
      <VenturePipeline/>
      <DeploymentTimeline/>
      <CrossSectorSynergy/>
      <CoInvestmentLandscape/>
      <RiskThesis/>
      <Upsell/>
      <Footer/>
    </div>
    </ExpandCtx.Provider>
  );
}
