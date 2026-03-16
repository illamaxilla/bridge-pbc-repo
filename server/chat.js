// ─────────────────────────────────────────────────────────────────────────────
// BRIDGE PBC — AI Chat Streaming API Proxy
// Proxies requests to the Anthropic Claude API with streaming SSE support.
// Keeps the API key server-side. Never exposes it to the browser.
//
// Usage:
//   In development — loaded as a Vite server middleware (see vite.config.ts)
//   In production  — mount as an Express route or serverless function
//
// Environment variable required:
//   ANTHROPIC_API_KEY=sk-ant-api03-...
// ─────────────────────────────────────────────────────────────────────────────

// NOTE: BRIDGE_CONTEXT is intentionally kept in the portal JSX file as the
// single source of truth. The server reads it at startup from bridge-context.js.
// When the full BRIDGE_CONTEXT is needed, copy it into bridge-context.js.
// For now, we use a short fallback that tells the model to respond as BRIDGE.

import { BRIDGE_CONTEXT } from './bridge-context.js';

/**
 * Handles POST /api/chat
 * Expects JSON body: { messages: [{ role, content }] }
 * Streams SSE back to the client.
 */
export async function handleChat(req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }));
    return;
  }

  // Parse body (may already be parsed by middleware)
  let body = req.body;
  if (!body) {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    body = JSON.parse(Buffer.concat(chunks).toString());
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'messages array required' }));
    return;
  }

  // Cap conversation history to last 10 messages to control token cost
  const trimmed = messages.slice(-10);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        stream: true,
        system: [
          {
            type: 'text',
            text: BRIDGE_CONTEXT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: trimmed,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      res.writeHead(response.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: errText }));
      return;
    }

    // Stream SSE back to the client
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }

    res.end();
  } catch (e) {
    console.error('BRIDGE AI Chat proxy error:', e);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
    }
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
}
