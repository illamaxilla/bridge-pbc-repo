// ─────────────────────────────────────────────────────────────────────────────
// BRIDGE PBC — Netlify Function: /api/request-access
// Thin adapter around the shared handler in server/request-access.js.
// Routed via the `/api/request-access → /.netlify/functions/request-access`
// redirect declared in netlify.toml so the same URL works in dev and prod.
// ─────────────────────────────────────────────────────────────────────────────

import { handleRequestAccess } from "../../server/request-access.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid JSON body." }),
    };
  }

  const { status, body } = await handleRequestAccess(payload, process.env);
  return {
    statusCode: status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
};
