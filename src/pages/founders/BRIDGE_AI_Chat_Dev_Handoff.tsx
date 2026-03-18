import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// BRIDGE PBC — AI Chat Developer Handoff
// Document type: Technical reference for production integration
// Prepared by: BRIDGE Portal Development Team
// Date: March 2026
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  bg:     '#0D1A10',
  card:   'rgba(255,255,255,0.04)',
  card2:  'rgba(255,255,255,0.07)',
  lime:   '#B8D935',
  forest: '#1B4D3E',
  teal:   '#2E5A4D',
  paper:  '#FAF8F3',
  muted:  'rgba(250,248,243,0.55)',
  faint:  'rgba(250,248,243,0.28)',
  line:   'rgba(255,255,255,0.08)',
  red:    '#C0392B',
  amber:  '#D4890A',
  green:  '#27AE60',
};
const F = {
  d: '"Playfair Display","Georgia",serif',
  s: '"DM Sans","Helvetica Neue",sans-serif',
  b: '"Source Serif 4","Georgia",serif',
  m: '"DM Mono","Courier New",monospace',
};

const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    html,body{background:${C.bg};-webkit-font-smoothing:antialiased;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px;}
    code{font-family:${F.m};font-size:13px;background:rgba(255,255,255,0.07);padding:2px 6px;border-radius:3px;color:${C.lime};}
    pre{font-family:${F.m};font-size:13px;background:rgba(0,0,0,0.35);border:1px solid ${C.line};padding:20px 24px;overflow-x:auto;line-height:1.7;color:${C.paper};border-left:3px solid ${C.lime};}
    pre code{background:none;padding:0;color:inherit;font-size:13px;}
    a{color:${C.lime};text-decoration:none;}
    a:hover{text-decoration:underline;}
    @keyframes fi{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
    .fade{animation:fi 0.4s ease;}
  `}</style>
);

// ─── Layout helpers ───────────────────────────────────────────────────────────
const W = ({ children }) => (
  <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>
    {children}
  </div>
);

const Section = ({ id, children }) => (
  <div id={id} style={{ borderBottom: `1px solid ${C.line}`, paddingTop: 56, paddingBottom: 56 }}>
    <W>{children}</W>
  </div>
);

const H1 = ({ children }) => (
  <h1 style={{ fontFamily: F.d, fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 900, color: C.paper, lineHeight: 1.1, marginBottom: 16 }}>
    {children}
  </h1>
);

const H2 = ({ children }) => (
  <h2 style={{ fontFamily: F.d, fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 700, color: C.paper, lineHeight: 1.2, marginBottom: 12, marginTop: 32 }}>
    {children}
  </h2>
);

const H3 = ({ children }) => (
  <h3 style={{ fontFamily: F.s, fontSize: 14, fontWeight: 700, color: C.lime, letterSpacing: '0.3px', marginBottom: 8, marginTop: 24 }}>
    {children}
  </h3>
);

const P = ({ children }) => (
  <p style={{ fontFamily: F.b, fontSize: 15, fontWeight: 300, color: C.muted, lineHeight: 1.85, marginBottom: 14 }}>
    {children}
  </p>
);

const Label = ({ text, color = C.lime }) => (
  <div style={{ fontFamily: F.s, fontSize: 9, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color, marginBottom: 10 }}>
    {text}
  </div>
);

const Rule = () => (
  <div style={{ borderTop: `3px solid ${C.paper}`, borderBottom: `2px solid ${C.lime}`, paddingBottom: 3, marginBottom: 20 }} />
);

const Badge = ({ text, color = C.lime }) => (
  <span style={{ fontFamily: F.s, fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 9px', border: `1px solid ${color}40`, color, marginRight: 6, display: 'inline-block', marginBottom: 4 }}>
    {text}
  </span>
);

const Note = ({ type = 'info', children }) => {
  const colors = { info: C.teal, warn: C.amber, danger: C.red, success: C.green };
  const col = colors[type] || C.teal;
  return (
    <div style={{ borderLeft: `3px solid ${col}`, background: `${col}12`, padding: '14px 18px', marginBottom: 16, marginTop: 8 }}>
      <div style={{ fontFamily: F.b, fontSize: 13.5, color: C.muted, lineHeight: 1.75 }}>{children}</div>
    </div>
  );
};

const KV = ({ k, v, mono = false }) => (
  <div style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: `1px solid ${C.line}`, alignItems: 'flex-start' }}>
    <div style={{ fontFamily: F.s, fontSize: 11, fontWeight: 700, color: C.faint, letterSpacing: '1px', textTransform: 'uppercase', minWidth: 160, flexShrink: 0, paddingTop: 1 }}>{k}</div>
    <div style={{ fontFamily: mono ? F.m : F.b, fontSize: mono ? 12 : 13.5, color: C.paper, lineHeight: 1.6 }}>{v}</div>
  </div>
);

const TOC_ITEMS = [
  { id: 'overview',     label: 'Overview' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'api-call',     label: 'The API Call' },
  { id: 'system-prompt',label: 'System Prompt' },
  { id: 'md-renderer',  label: 'Markdown Renderer' },
  { id: 'production',   label: 'Production Setup' },
  { id: 'streaming',    label: 'Streaming (Phase 2)' },
  { id: 'security',     label: 'Security' },
  { id: 'costs',        label: 'Costs & Limits' },
  { id: 'checklist',    label: 'Go-Live Checklist' },
];

export default function BRIDGEAIChatHandoff() {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }} className="fade">
      <GS />

      {/* ── Sidebar TOC ─────────────────────────────────────────────────────── */}
      <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 220, background: 'rgba(0,0,0,0.5)', borderRight: `1px solid ${C.line}`, padding: '32px 0', overflowY: 'auto', zIndex: 90 }}>
        <div style={{ padding: '0 24px 24px', borderBottom: `1px solid ${C.line}`, marginBottom: 16 }}>
          <div style={{ fontFamily: F.s, fontSize: 9, fontWeight: 800, color: C.lime, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 6 }}>Dev Handoff</div>
          <div style={{ fontFamily: F.d, fontSize: 16, fontWeight: 700, color: C.paper, lineHeight: 1.2 }}>BRIDGE AI Chat</div>
        </div>
        {TOC_ITEMS.map(item => (
          <div key={item.id} onClick={() => scrollTo(item.id)}
            style={{ padding: '7px 24px', fontFamily: F.s, fontSize: 11, fontWeight: 600, color: activeSection === item.id ? C.lime : 'rgba(250,248,243,0.38)', cursor: 'pointer', borderLeft: `2px solid ${activeSection === item.id ? C.lime : 'transparent'}`, transition: 'all 0.15s' }}>
            {item.label}
          </div>
        ))}
      </div>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div style={{ marginLeft: 220 }}>

        {/* Cover */}
        <div style={{ background: C.forest, padding: 'clamp(40px,6vw,72px) clamp(20px,4vw,48px)', borderBottom: `1px solid ${C.line}` }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <Label text="BRIDGE PBC · Technical Documentation · March 2026" />
            <H1>AI Chat — Developer Handoff</H1>
            <P>
              This document describes exactly how the BRIDGE Intelligence Advisor (Ask BRIDGE) works in the current portal build, what needs to change for production deployment, and a complete step-by-step setup guide for the development team.
            </P>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
              <Badge text="React / JSX" />
              <Badge text="Anthropic API" />
              <Badge text="claude-sonnet-4-20250514" />
              <Badge text="Non-streaming (current)" />
              <Badge text="Streaming (Phase 2)" />
            </div>
          </div>
        </div>

        {/* ── 1. OVERVIEW ───────────────────────────────────────────────────── */}
        <Section id="overview">
          <Label text="Section 01" />
          <Rule />
          <H1>Overview</H1>
          <P>
            The BRIDGE Intelligence Advisor is an AI assistant embedded in the Founders Portal. It uses Anthropic's Claude API to answer questions about BRIDGE's strategy, financials, methodology, spinoffs, risks, and any other topic covered in the portal — with the knowledge and tone of an internal BRIDGE analyst.
          </P>
          <P>
            The AI has no database, no memory between sessions, and no external data source. Everything it knows comes from a large system prompt called <code>BRIDGE_CONTEXT</code> that is sent with every request. The quality of the answers comes entirely from the quality of that context document.
          </P>

          <H2>Current state vs production</H2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
            {[
              { label: 'Current (artifact/preview)', col: C.amber, items: ['API key exposed in browser', 'Non-streaming (waits for full response)', 'No backend proxy', 'No rate limiting', 'No logging', 'No cost controls'] },
              { label: 'Production (what to build)', col: C.green, items: ['API key in backend env var only', 'Streaming via backend proxy', 'Express/Next.js API route as proxy', 'Rate limiting per user/session', 'Request logging for cost tracking', 'Token budget controls'] },
            ].map(col => (
              <div key={col.label} style={{ padding: '20px', background: C.card, border: `1px solid ${C.line}`, borderTop: `2px solid ${col.col}` }}>
                <div style={{ fontFamily: F.s, fontSize: 11, fontWeight: 700, color: col.col, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>{col.label}</div>
                {col.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 7, alignItems: 'flex-start' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: col.col, flexShrink: 0, marginTop: 5 }} />
                    <div style={{ fontFamily: F.s, fontSize: 12, color: C.muted }}>{item}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Note type="warn">
            <strong style={{ color: C.paper }}>Important:</strong> The current build calls the Anthropic API directly from the browser. This works in a controlled preview environment but must never be deployed publicly — the API key would be visible to anyone who inspects the network tab. The first production task is to move the API call behind a server-side proxy.
          </Note>
        </Section>

        {/* ── 2. HOW IT WORKS ───────────────────────────────────────────────── */}
        <Section id="how-it-works">
          <Label text="Section 02" />
          <Rule />
          <H1>How It Works</H1>

          <H2>The conversation model</H2>
          <P>
            Every time a user sends a message, the entire conversation history is sent to the API along with the system prompt. Claude has no memory between sessions — each API call is stateless. The conversation history is maintained in React state (<code>msgs</code> array) and sent fresh on every request.
          </P>

          <H3>Message structure</H3>
          <pre><code>{`// Each message in the msgs array:
{ role: 'user' | 'assistant', content: 'string' }

// The send() function builds the messages array like this:
const next = [...msgs, { role: 'user', content: userQuestion }];

// Then sends the full history:
messages: next.map(m => ({ role: m.role, content: m.content }))`}</code></pre>

          <H3>The data flow (current)</H3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 8 }}>
            {[
              ['01', 'User types a question and presses Send (or Enter)'],
              ['02', 'send() appends the user message to the msgs array in state'],
              ['03', 'setLoad(true) — the input is disabled, "Thinking" indicator appears'],
              ['04', 'fetch() is called directly to api.anthropic.com/v1/messages'],
              ['05', 'The full conversation history + BRIDGE_CONTEXT system prompt is sent'],
              ['06', 'Claude processes the request and returns a complete response (non-streaming)'],
              ['07', 'The response text is extracted from data.content[0].text'],
              ['08', 'setMsgs() appends the assistant response — the MD renderer formats it'],
              ['09', 'setLoad(false) — the finally block always runs this, even on error'],
              ['10', 'The chat scrolls to the new message via endRef'],
            ].map(([n, step]) => (
              <div key={n} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: `1px solid ${C.line}`, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: F.m, fontSize: 10, color: C.lime, flexShrink: 0, minWidth: 24 }}>{n}</div>
                <div style={{ fontFamily: F.b, fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>{step}</div>
              </div>
            ))}
          </div>

          <H2>Key React state</H2>
          <div style={{ marginTop: 8 }}>
            <KV k="msgs" v="Array of { role, content } objects. Initialised with the WELCOME message. Grows with every exchange. Sent in full to the API on every request." />
            <KV k="load" v="Boolean. True while the API request is in flight. Disables the input and send button. Always set to false in the finally block." />
            <KV k="err" v="String or null. Holds the error message if the API call fails. Displayed inline above the input bar. Cleared on next send." />
            <KV k="inp" v="String. The current textarea value. Cleared on send, restored on error." />
          </div>
        </Section>

        {/* ── 3. THE API CALL ───────────────────────────────────────────────── */}
        <Section id="api-call">
          <Label text="Section 03" />
          <Rule />
          <H1>The API Call</H1>

          <H2>Current implementation (browser direct)</H2>
          <pre><code>{`// Located in: const send = async (text) => { ... }
// File: BRIDGE_v13.jsx — Ask component

const res = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // ⚠️ API key injected by Claude.ai artifact environment only
    // In production this header must come from your backend proxy
  },
  body: JSON.stringify({
    model:      'claude-sonnet-4-20250514',  // Sonnet 4 — do not downgrade
    max_tokens: 1024,                         // Sufficient for all BRIDGE questions
    system:     BRIDGE_CONTEXT,              // ~30,000 chars / ~7,500 tokens
    messages:   next.map(m => ({             // Full conversation history
      role:    m.role,
      content: m.content,
    })),
  }),
});

const data = await res.json();
const reply = data.content?.find(b => b.type === 'text')?.text
  || 'No response received.';`}</code></pre>

          <H2>Parameters</H2>
          <div style={{ marginTop: 8 }}>
            <KV k="model" v="claude-sonnet-4-20250514 — do not change this. Haiku is faster but produces noticeably weaker answers for complex strategic questions. Opus is higher quality but slower and more expensive. Sonnet is the right balance." mono />
            <KV k="max_tokens" v="1024 — sufficient for all BRIDGE questions. The system prompt instructs the AI to give short answers for simple questions. Raising this will increase cost and latency without meaningful quality gain." mono />
            <KV k="system" v="BRIDGE_CONTEXT — 30,065 characters / ~7,516 tokens. This is the entire knowledge base. Sent on every request. In production, use cache_control to avoid re-processing it each time (see Streaming section)." mono />
            <KV k="messages" v="The full conversation history. Every prior message is resent each turn. This is how Claude maintains conversation context — it has no server-side memory." mono />
          </div>

          <H2>Error handling</H2>
          <pre><code>{`// Current error handling in send():
} catch (e) {
  setErr(e.message);       // Display error in UI
  setMsgs(p => p.slice(0, -1)); // Remove the user message (rollback)
  setInp(q);               // Restore user's question to input
} finally {
  setLoad(false);          // ALWAYS runs — prevents stuck loading state
}`}</code></pre>
          <Note type="info">
            The <code>finally</code> block is critical. Without it, if the API call fails or is aborted, <code>load</code> stays <code>true</code> permanently and the input is stuck disabled. Every async API function must use <code>finally</code> to reset loading state.
          </Note>
        </Section>

        {/* ── 4. SYSTEM PROMPT ──────────────────────────────────────────────── */}
        <Section id="system-prompt">
          <Label text="Section 04" />
          <Rule />
          <H1>The System Prompt (BRIDGE_CONTEXT)</H1>

          <H2>What it is</H2>
          <P>
            <code>BRIDGE_CONTEXT</code> is a 30,065-character (~7,516 token) plain-text document that gives Claude complete knowledge of BRIDGE PBC. It is defined as a JavaScript template literal at the top of <code>BRIDGE_v13.jsx</code>, starting at approximately line 35.
          </P>
          <P>
            This is the most important part of the entire AI system. The quality of the AI's answers is determined entirely by the quality of this document. If something is not in the context, the AI will not know it. If something is wrong in the context, the AI will repeat it.
          </P>

          <H2>Structure of BRIDGE_CONTEXT</H2>
          <div style={{ marginTop: 8 }}>
            {[
              { section: 'Response format instructions', desc: 'Tells Claude exactly how to format answers — bold, headers, bullets, blockquotes, when to be brief vs thorough. This is why the output renders so cleanly in the MD renderer.' },
              { section: 'Core identity', desc: 'BRIDGE PBC name, structure (US PBC + Ghana CLG), flagship (Kejetia), unit of analysis, core thesis (data company).' },
              { section: 'The data company thesis', desc: 'The flywheel, competitive comparisons (IBISWorld, Bloomberg, McKinsey, Stears), and the compounding moat argument.' },
              { section: 'The 12 sectors', desc: 'Each sector: name, key stat, market context, BRIDGE\'s angle. 01 Infrastructure through 12 Transportation.' },
              { section: 'The six spinoffs', desc: 'All six (Applications, Ratings, Research, Index, Consulting, API) with pricing, timelines, Y1/Y3/Y5 projections, competitors, and the "key insight" for each.' },
              { section: 'Four client segments', desc: 'Entrepreneurs, Government, Investors, Business Entities — pain points, products, revenue potential.' },
              { section: '28 revenue lines', desc: 'All four engines, R01–R28 with descriptions and potential ARR. What\'s built vs to-build.' },
              { section: 'Membership tiers', desc: 'Five tiers from Public (free) to Strategic Partner (by invitation). Member counts and ARR targets.' },
              { section: 'Publications portfolio', desc: 'Eight publication products: Ghana Pulse, Ghana Insider, The BRIDGE Brief, etc.' },
              { section: 'Build roadmap', desc: 'Four phases from "now to 8 weeks" through Year 2. Specific deliverables per phase.' },
              { section: 'Applications suite', desc: 'Full description of all 6 apps, revenue projections, the data moat argument, and the implementation roadmap.' },
              { section: 'The Ask / partnership structure', desc: '$2.5M seed round, use of proceeds breakdown, three partnership tiers, eight documented risks.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: `1px solid ${C.line}` }}>
                <div style={{ fontFamily: F.m, fontSize: 10, color: C.lime, minWidth: 20, paddingTop: 2 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.s, fontSize: 13, fontWeight: 700, color: C.paper, marginBottom: 4 }}>{item.section}</div>
                  <div style={{ fontFamily: F.b, fontSize: 12.5, color: C.muted, lineHeight: 1.65 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <H2>How to update the context</H2>
          <P>
            The context is a plain string in the JSX file. To update it, find <code>const BRIDGE_CONTEXT = `</code> at the top of <code>BRIDGE_v13.jsx</code> and edit the text directly. It is plain text — no special syntax.
          </P>
          <Note type="warn">
            <strong style={{ color: C.paper }}>After any context update:</strong> Re-read the section you changed. Ask the AI a question that would expose the new information. Verify the answer is correct before deploying. The AI will repeat whatever is in the context — including mistakes.
          </Note>
          <Note type="info">
            In production, consider moving <code>BRIDGE_CONTEXT</code> to a separate file (e.g. <code>bridge-context.txt</code> or <code>bridge-context.js</code>) loaded by the backend proxy. This makes updates easier and keeps the React component cleaner. It also makes it easy to version-control context changes separately from UI changes.
          </Note>
        </Section>

        {/* ── 5. MD RENDERER ────────────────────────────────────────────────── */}
        <Section id="md-renderer">
          <Label text="Section 05" />
          <Rule />
          <H1>Markdown Renderer</H1>

          <P>
            Claude returns responses as Markdown text. A custom <code>MD</code> component in <code>BRIDGE_v13.jsx</code> (starting at approximately line 2150) converts Markdown into styled React JSX. This is not a library — it is a purpose-built parser that matches the portal's dark design system exactly.
          </P>

          <H2>What it handles</H2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            {[
              ['# H1', 'Top-level heading with bottom border'],
              ['## H2', 'LIME uppercase label with stripe'],
              ['### H3', 'TEAL left-border sub-heading'],
              ['#### H4', 'Small muted label'],
              ['**bold**', 'White bold — highlights key terms'],
              ['`code`', 'LIME monospace with tinted background'],
              ['*italic*', 'Italic MUTED text'],
              ['- bullet', 'LIME dot · full-contrast body text'],
              ['1. numbered', 'LIME monospace number · body text'],
              ['> blockquote', 'LIME left border with tinted background'],
              ['---', 'Horizontal rule separator'],
              ['blank line', '10px gap between paragraphs'],
            ].map(([syntax, desc]) => (
              <div key={syntax} style={{ padding: '10px 14px', background: C.card, border: `1px solid ${C.line}`, display: 'flex', gap: 12 }}>
                <code style={{ flexShrink: 0, minWidth: 90 }}>{syntax}</code>
                <div style={{ fontFamily: F.s, fontSize: 11, color: C.muted }}>{desc}</div>
              </div>
            ))}
          </div>

          <H2>Streaming safety</H2>
          <P>
            The <code>MD</code> component accepts a <code>streaming</code> prop. When <code>true</code>, it applies a regex to complete any unclosed <code>**</code> bold markers before rendering — preventing raw asterisks from appearing while tokens are mid-flight. This is only relevant when streaming is enabled (Phase 2).
          </P>
          <pre><code>{`// Usage on the active message during streaming:
<MD text={m.content} streaming={load && i === msgs.length - 1} />

// For all other messages (complete, not streaming):
<MD text={m.content} />`}</code></pre>

          <H2>Do not replace with a library</H2>
          <Note type="warn">
            Do not swap the custom <code>MD</code> component for <code>react-markdown</code> or similar. The custom renderer produces styles that match the portal's design system exactly — colors, typography, spacing, and component hierarchy. A generic library would produce white-background, default-styled output that does not match the dark theme and would require substantial CSS overriding.
          </Note>
        </Section>

        {/* ── 6. PRODUCTION SETUP ───────────────────────────────────────────── */}
        <Section id="production">
          <Label text="Section 06" />
          <Rule />
          <H1>Production Setup</H1>

          <H2>Step 1 — Get an Anthropic API key</H2>
          <P>
            Create an account at <a href="https://console.anthropic.com" target="_blank" rel="noreferrer">console.anthropic.com</a>. Generate an API key from the API Keys section. Store it as an environment variable — never in code, never in a client-side file.
          </P>
          <pre><code>{`# .env (server-side only — never commit this file)
ANTHROPIC_API_KEY=sk-ant-api03-...`}</code></pre>

          <H2>Step 2 — Create a backend proxy route</H2>
          <P>
            The API call must move from the browser to a server. The server holds the API key and forwards the request to Anthropic. Here are implementations for the two most common stacks:
          </P>

          <H3>Option A — Next.js API route (recommended)</H3>
          <pre><code>{`// pages/api/chat.js  (or app/api/chat/route.js for App Router)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;

  // Basic validation
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }

  // Cap conversation history to last 10 messages to control token cost
  const trimmed = messages.slice(-10);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':         'application/json',
        'x-api-key':            process.env.ANTHROPIC_API_KEY,
        'anthropic-version':    '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system:     BRIDGE_CONTEXT, // import from bridge-context.js
        messages:   trimmed,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (e) {
    console.error('Anthropic API error:', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}`}</code></pre>

          <H3>Option B — Express.js route</H3>
          <pre><code>{`// routes/chat.js

const express = require('express');
const router  = express.Router();
const BRIDGE_CONTEXT = require('../data/bridge-context'); // plain string

router.post('/', async (req, res) => {
  const { messages } = req.body;
  if (!messages?.length) return res.status(400).json({ error: 'No messages' });

  const trimmed = messages.slice(-10); // last 10 turns max

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method:  'POST',
      headers: {
        'Content-Type':       'application/json',
        'x-api-key':          process.env.ANTHROPIC_API_KEY,
        'anthropic-version':  '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system:     BRIDGE_CONTEXT,
        messages:   trimmed,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;`}</code></pre>

          <H2>Step 3 — Update the React fetch call</H2>
          <P>
            Change the <code>fetch</code> URL in the <code>send()</code> function from the direct Anthropic endpoint to your proxy route. Remove the <code>system</code> field — the backend handles it.
          </P>
          <pre><code>{`// In BRIDGE_v13.jsx — Ask component — send() function
// BEFORE (current):
const res = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model:   'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system:  BRIDGE_CONTEXT,   // ← remove this line
    messages: next.map(m => ({ role: m.role, content: m.content })),
  }),
});

// AFTER (production):
const res = await fetch('/api/chat', {           // ← your proxy route
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: next.map(m => ({                   // just send messages
      role:    m.role,
      content: m.content,
    })),
  }),
});`}</code></pre>

          <H2>Step 4 — Move BRIDGE_CONTEXT to the backend</H2>
          <pre><code>{`// data/bridge-context.js (backend only — never sent to client)
module.exports = \`You are the BRIDGE Intelligence Advisor...
[paste the full BRIDGE_CONTEXT string here]
\`;

// Then import in your route:
const BRIDGE_CONTEXT = require('../data/bridge-context');`}</code></pre>
          <Note type="success">
            Once <code>BRIDGE_CONTEXT</code> is on the backend, it never leaves the server. Users cannot see it by inspecting the network tab. This also makes it trivial to update the context without touching the React component.
          </Note>
        </Section>

        {/* ── 7. STREAMING ──────────────────────────────────────────────────── */}
        <Section id="streaming">
          <Label text="Section 07" />
          <Rule />
          <H1>Streaming — Phase 2</H1>

          <P>
            The current build is non-streaming: the API returns the complete response before the UI updates. Streaming shows words appearing token-by-token as they are generated — dramatically improving perceived speed. The first word appears in ~300ms instead of the user waiting 4–8 seconds for the full response.
          </P>
          <Note type="warn">
            <strong style={{ color: C.paper }}>Do not attempt streaming in the artifact/preview environment.</strong> The Claude.ai artifact sandbox does not reliably support <code>ReadableStream</code>. Streaming must be implemented on the production deployment. This is already validated and documented here.
          </Note>

          <H2>Backend changes for streaming</H2>
          <pre><code>{`// In your Next.js API route or Express route — add stream: true
// and pipe the response back to the client as Server-Sent Events

// Next.js App Router (recommended for streaming):
// app/api/chat/route.js

export async function POST(req) {
  const { messages } = await req.json();
  const trimmed = messages.slice(-10);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':       'application/json',
      'x-api-key':          process.env.ANTHROPIC_API_KEY,
      'anthropic-version':  '2023-06-01',
    },
    body: JSON.stringify({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 1024,
      stream:     true,             // ← enable streaming
      system: {
        text:          BRIDGE_CONTEXT,
        cache_control: { type: 'ephemeral' }, // ← cache the system prompt
        type:          'text',
      },
      messages: trimmed,
    }),
  });

  // Pipe the SSE stream directly back to the client
  return new Response(response.body, {
    headers: {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection':    'keep-alive',
    },
  });
}`}</code></pre>

          <H2>Frontend changes for streaming</H2>
          <pre><code>{`// Replace the send() function body with this streaming version:

const send = async (text) => {
  const q = (text || inp).trim();
  if (!q || load) return;
  setInp(''); setErr(null);

  const history = [...msgs, { role: 'user', content: q }];
  setMsgs([...history, { role: 'assistant', content: '' }]); // empty bubble
  setLoad(true);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: history.map(m => ({ role: m.role, content: m.content })),
      }),
    });

    if (!res.ok) throw new Error(\`API \${res.status}\`);

    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    let sseBuffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      sseBuffer += decoder.decode(value, { stream: true });
      const lines = sseBuffer.split('\\n');
      sseBuffer = lines.pop() ?? '';

      let chunk = '';
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') break;
        try {
          const evt = JSON.parse(payload);
          if (evt.type === 'content_block_delta' &&
              evt.delta?.type === 'text_delta') {
            chunk += evt.delta.text;
          }
        } catch { /* skip malformed SSE */ }
      }

      // One state update per network chunk (batched, not per-token)
      if (chunk) {
        setMsgs(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === 'assistant') {
            updated[updated.length - 1] = {
              ...last,
              content: last.content + chunk,
            };
          }
          return updated;
        });
      }
    }
  } catch (e) {
    if (e.name !== 'AbortError') {
      setErr(e.message);
      setMsgs(prev => prev.slice(0, -2)); // remove user + empty assistant
      setInp(q);
    }
  } finally {
    setLoad(false); // always runs
  }
};`}</code></pre>

          <H2>cache_control — the biggest latency win</H2>
          <P>
            Adding <code>cache_control: {`{ type: 'ephemeral' }`}</code> to the system prompt tells Anthropic to cache the 7,516-token context server-side after the first request. Subsequent requests in the same session skip re-processing those tokens. This reduces latency by 40–60% and cuts input token costs by 90% on cached tokens.
          </P>
          <pre><code>{`// System prompt with cache control (streaming version):
system: [
  {
    type:          'text',
    text:          BRIDGE_CONTEXT,   // the full 30,065-char string
    cache_control: { type: 'ephemeral' },
  }
]

// Note: cache_control requires anthropic-beta: 'prompt-caching-2024-07-31'
// Add to your request headers:
'anthropic-beta': 'prompt-caching-2024-07-31'`}</code></pre>
        </Section>

        {/* ── 8. SECURITY ───────────────────────────────────────────────────── */}
        <Section id="security">
          <Label text="Section 08" />
          <Rule />
          <H1>Security</H1>

          <H2>API key</H2>
          <div style={{ marginTop: 8 }}>
            <KV k="Never in client code" v="The API key must live in server environment variables only. Any key in a .jsx, .js, or .ts file that is bundled and served to browsers is compromised — anyone can find it in the network tab or bundle." />
            <KV k="Environment variable" v="ANTHROPIC_API_KEY in .env (local) and in your deployment platform's secrets manager (Vercel, Railway, Render, AWS, etc.)." />
            <KV k="Key rotation" v="Rotate the API key if you suspect it has been exposed. Console.anthropic.com → API Keys → Revoke + regenerate." />
          </div>

          <H2>Input validation</H2>
          <P>
            The portal is behind a passcode gate — only invited partners can access the chat. But still validate on the backend:
          </P>
          <pre><code>{`// Minimum validation in your proxy route:

// 1. Message array must exist and be non-empty
if (!Array.isArray(messages) || messages.length === 0) {
  return res.status(400).json({ error: 'Invalid request' });
}

// 2. Cap message count (prevents token flooding)
const trimmed = messages.slice(-10); // last 10 turns max

// 3. Cap individual message length
const sanitised = trimmed.map(m => ({
  role:    m.role === 'user' ? 'user' : 'assistant',
  content: String(m.content).slice(0, 4000), // 4000 chars max per message
}));

// 4. Validate role values
const validRoles = ['user', 'assistant'];
if (sanitised.some(m => !validRoles.includes(m.role))) {
  return res.status(400).json({ error: 'Invalid role' });
}`}</code></pre>

          <H2>Rate limiting</H2>
          <pre><code>{`// Example using express-rate-limit:
const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,    // 1 minute window
  max:      10,            // 10 requests per minute per IP
  message:  { error: 'Too many requests — please wait a moment.' },
});

app.use('/api/chat', chatLimiter, chatRouter);`}</code></pre>
          <Note type="info">
            For the portal's use case — a small number of invited partners — aggressive rate limiting is not necessary. 10 requests per minute per IP is generous and still prevents any accidental infinite loops or testing abuse.
          </Note>
        </Section>

        {/* ── 9. COSTS ──────────────────────────────────────────────────────── */}
        <Section id="costs">
          <Label text="Section 09" />
          <Rule />
          <H1>Costs & Token Budget</H1>

          <H2>Pricing (Anthropic, as of March 2026)</H2>
          <div style={{ marginTop: 8 }}>
            <KV k="claude-sonnet-4 input" v="$3.00 per million tokens" />
            <KV k="claude-sonnet-4 output" v="$15.00 per million tokens" />
            <KV k="Cache write (prompt caching)" v="$3.75 per million tokens (one-time, first request)" />
            <KV k="Cache read (prompt caching)" v="$0.30 per million tokens (90% cheaper than re-sending)" />
          </div>

          <H2>Cost per conversation turn (without caching)</H2>
          <div style={{ marginTop: 8 }}>
            <KV k="System prompt" v="~7,516 tokens × $3/M = ~$0.023 per request" />
            <KV k="Conversation history (avg 3 turns)" v="~1,000 tokens × $3/M = ~$0.003" />
            <KV k="Response (avg)" v="~400 tokens × $15/M = ~$0.006" />
            <KV k="Total per turn (no caching)" v="~$0.032 (~3 cents)" />
            <KV k="Total per turn (with caching)" v="~$0.008 (~less than 1 cent)" />
          </div>

          <H2>Monthly cost estimate</H2>
          <pre><code>{`// Scenarios (with prompt caching enabled):

// Scenario A — Pilot phase (10 partners, 5 conversations/week each)
// 50 conversations/week × 8 turns avg × $0.008/turn
// = $3.20/week = ~$14/month

// Scenario B — Active investor portal (50 users, 3 conversations/week)
// 150 conversations/week × 8 turns × $0.008/turn
// = $9.60/week = ~$42/month

// Scenario C — Public-facing (1,000 users/month, 5 turns avg)
// 5,000 turns × $0.008/turn = $40/month`}</code></pre>
          <Note type="success">
            At the portal's intended scale — a small group of invited strategic partners — the AI chat will cost less than $20/month with prompt caching enabled. This is effectively free at the scale of a seed-stage company.
          </Note>

          <H2>Controlling costs</H2>
          <div style={{ marginTop: 8 }}>
            <KV k="1. Enable prompt caching" v="Single biggest lever. Reduces the ~7,500-token system prompt from $0.023 per request to $0.002 per request after the first call." />
            <KV k="2. Cap conversation history" v="Currently slices to last 10 messages. Each additional turn adds ~200–500 tokens to input cost. Keep this cap." />
            <KV k="3. max_tokens: 1024" v="Do not increase. The AI rarely uses more than 600 tokens for a complete answer. 1,024 is generous headroom." />
            <KV k="4. Set a spend limit" v="In console.anthropic.com, set a monthly spend limit. Alerts at 80%, hard stop at 100%." />
          </div>
        </Section>

        {/* ── 10. CHECKLIST ─────────────────────────────────────────────────── */}
        <Section id="checklist">
          <Label text="Section 10" />
          <Rule />
          <H1>Go-Live Checklist</H1>

          <P>Complete these tasks in order before the portal is accessible to partners.</P>

          {[
            {
              phase: 'Phase 1 — Backend (required before any public access)',
              col: C.red,
              items: [
                { task: 'Create Anthropic account at console.anthropic.com', done: false },
                { task: 'Generate production API key — store in environment variable ANTHROPIC_API_KEY', done: false },
                { task: 'Create backend proxy route (/api/chat) using Next.js or Express', done: false },
                { task: 'Move BRIDGE_CONTEXT string to backend-only file (data/bridge-context.js)', done: false },
                { task: 'Update React fetch URL from api.anthropic.com to /api/chat', done: false },
                { task: 'Remove system: BRIDGE_CONTEXT from the React fetch call', done: false },
                { task: 'Add input validation (array check, length cap, role validation)', done: false },
                { task: 'Add rate limiting (10 req/min per IP minimum)', done: false },
                { task: 'Test: send a question, verify response appears correctly', done: false },
                { task: 'Test: send a question, verify API key is NOT visible in browser network tab', done: false },
              ],
            },
            {
              phase: 'Phase 2 — Streaming (recommended for production UX)',
              col: C.amber,
              items: [
                { task: 'Switch backend route to stream: true', done: false },
                { task: 'Add prompt caching: cache_control + anthropic-beta header', done: false },
                { task: 'Update React send() to use ReadableStream reader loop', done: false },
                { task: 'Update typing indicator: show only while content === "" (first token not yet received)', done: false },
                { task: 'Test: first word appears within ~1 second of sending', done: false },
                { task: 'Test: reset button during active stream completes cleanly', done: false },
              ],
            },
            {
              phase: 'Phase 3 — Monitoring & production hardening',
              col: C.lime,
              items: [
                { task: 'Set monthly spend limit in Anthropic console', done: false },
                { task: 'Add request logging: timestamp, session ID, token count, cost', done: false },
                { task: 'Deploy BRIDGE_CONTEXT updates via the backend file (not by re-deploying React)', done: false },
                { task: 'Verify HTTPS — the portal must be served over HTTPS only', done: false },
                { task: 'Add error monitoring (Sentry or similar) on the proxy route', done: false },
                { task: 'Test with a real invited partner — verify answers are accurate and fast', done: false },
              ],
            },
          ].map((phase, pi) => (
            <div key={pi} style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: F.s, fontSize: 10, fontWeight: 700, color: phase.col, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 24, height: 2, background: phase.col }} />
                {phase.phase}
              </div>
              {phase.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: i % 2 === 0 ? C.card : 'transparent', border: `1px solid ${C.line}`, marginBottom: 1, alignItems: 'flex-start' }}>
                  <div style={{ width: 16, height: 16, border: `1px solid ${C.line}`, flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.done && <div style={{ width: 8, height: 8, background: C.lime }} />}
                  </div>
                  <div style={{ fontFamily: F.b, fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>{item.task}</div>
                </div>
              ))}
            </div>
          ))}

          <H2>Questions & contacts</H2>
          <div style={{ padding: '24px', background: C.card, border: `1px solid ${C.line}`, borderLeft: `2px solid ${C.lime}`, marginTop: 16 }}>
            <P>
              All technical questions about this implementation should be directed to the BRIDGE portal development lead. For Anthropic API documentation, see{' '}
              <a href="https://docs.anthropic.com" target="_blank" rel="noreferrer">docs.anthropic.com</a>.
              For questions about the content of BRIDGE_CONTEXT (what the AI knows and says), contact the BRIDGE strategy team directly.
            </P>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.line}` }}>
              {[
                ['Portal codebase', 'BRIDGE_v13.jsx'],
                ['API documentation', 'docs.anthropic.com/api'],
                ['Anthropic console', 'console.anthropic.com'],
                ['Model in use', 'claude-sonnet-4-20250514'],
              ].map(([label, val]) => (
                <div key={label}>
                  <div style={{ fontFamily: F.s, fontSize: 9, fontWeight: 700, color: C.faint, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontFamily: F.m, fontSize: 12, color: C.lime }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div style={{ background: C.bg, borderTop: `3px solid ${C.lime}`, padding: '24px 0' }}>
          <W>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ fontFamily: F.s, fontSize: 10, color: C.faint }}>BRIDGE PBC · AI Chat Developer Handoff · March 2026</div>
              <div style={{ fontFamily: F.s, fontSize: 10, color: C.faint }}>Confidential · Internal Use Only</div>
            </div>
          </W>
        </div>

      </div>
    </div>
  );
}
