// ─────────────────────────────────────────────────────────────────────────────
// BRIDGE PBC — Request Access Intake Handler
// Receives the "Request Access" form submission, persists it to the
// `access_requests` table via Supabase, and relays notification emails
// via Resend (admin notification + applicant confirmation).
//
// Loaded by:
//   • Vite dev server middleware   (see vite.config.ts)
//   • Netlify Function wrapper     (see netlify/functions/request-access.js)
//
// Required environment variables (server-side only — never VITE_ prefixed):
//   SUPABASE_URL                   Supabase project URL
//                                  (falls back to VITE_SUPABASE_URL)
//   SUPABASE_SERVICE_ROLE_KEY      Service role key, bypasses RLS for writes
//                                  (falls back to VITE_SUPABASE_ANON_KEY —
//                                   works because the `public` role has an
//                                   INSERT policy on access_requests)
//
// Optional (email relay — skipped with a warning if unset):
//   RESEND_API_KEY                 Resend API key
//   ACCESS_REQUEST_FROM_EMAIL      Verified sender, e.g. "BRIDGE PBC <hello@bridgepbc.com>"
//   ACCESS_REQUEST_NOTIFY_EMAIL    Admin inbox, e.g. "team@bridgepbc.com"
// ─────────────────────────────────────────────────────────────────────────────

const ALLOWED_INTERESTS = new Set([
  "investment", "policy", "partnership", "data", "implementation", "other",
]);
const ALLOWED_CONNECTIONS = new Set([
  "referral", "event", "social", "search", "press", "other",
]);

const MAX_STRING = 500;
const MAX_DESCRIPTION = 2000;

function isNonEmptyString(v, max = MAX_STRING) {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

function isOptionalString(v, max = MAX_STRING) {
  return v == null || v === "" || (typeof v === "string" && v.length <= max);
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") return "Invalid request body.";

  const { name, email, country, organization, role, primary_interest, connection, description } = payload;

  if (!isNonEmptyString(name)) return "Name is required.";
  if (!isNonEmptyString(email)) return "Email is required.";
  // Minimal RFC-5322-ish check: good enough for form validation, real check is delivery.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
  if (!isNonEmptyString(country)) return "Country is required.";
  if (!isNonEmptyString(primary_interest)) return "Primary interest is required.";
  if (!ALLOWED_INTERESTS.has(primary_interest)) return "Primary interest is not recognized.";
  if (!isNonEmptyString(connection)) return "Connection is required.";
  if (!ALLOWED_CONNECTIONS.has(connection)) return "Connection value is not recognized.";
  if (!isOptionalString(organization)) return "Organization is too long.";
  if (!isOptionalString(role)) return "Role is too long.";
  if (!isOptionalString(description, MAX_DESCRIPTION)) return "Description is too long.";

  return null;
}

function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function insertAccessRequest(row, env) {
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured on the server. " +
      "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) " +
      "in the deployment environment."
    );
  }

  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/access_requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": key,
      "Authorization": `Bearer ${key}`,
      "Prefer": "return=representation",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Supabase insert failed (${res.status}): ${text || res.statusText}`);
  }

  const rows = await res.json().catch(() => []);
  return Array.isArray(rows) ? rows[0] : rows;
}

async function sendResendEmail({ apiKey, from, to, subject, html, replyTo }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend API error (${res.status}): ${text || res.statusText}`);
  }
}

function buildAdminEmailHtml(row) {
  const rows = [
    ["Name", row.name],
    ["Email", row.email],
    ["Country", row.country],
    ["Organization", row.organization || "—"],
    ["Role", row.role || "—"],
    ["Primary interest", row.primary_interest],
    ["How they heard", row.connection],
    ["Notes", row.description || "—"],
  ].map(
    ([k, v]) =>
      `<tr><td style="padding:6px 12px;background:#f6f6f4;border:1px solid #e5e5e2;font-weight:600">${escapeHtml(k)}</td><td style="padding:6px 12px;border:1px solid #e5e5e2">${escapeHtml(v)}</td></tr>`
  ).join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;max-width:600px">
      <h2 style="color:#1B4D3E;margin:0 0 12px">New BRIDGE access request</h2>
      <p style="margin:0 0 16px;color:#444">A new application has been submitted through the research library request form.</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>
      <p style="margin-top:20px;color:#666;font-size:12px">
        Review and approve this request in your Supabase dashboard (table: <code>access_requests</code>).
      </p>
    </div>
  `;
}

function buildApplicantEmailHtml(row) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;max-width:600px">
      <h2 style="color:#1B4D3E;margin:0 0 12px">Thanks for your interest in BRIDGE, ${escapeHtml(row.name)}</h2>
      <p style="margin:0 0 12px;line-height:1.55">
        We've received your request for access to the BRIDGE research library and will
        review it shortly. You'll hear back from our team at <strong>${escapeHtml(row.email)}</strong>
        once your access has been approved.
      </p>
      <p style="margin:0 0 12px;line-height:1.55">
        In the meantime, you can learn more about our work at
        <a href="https://bridgepbc.com" style="color:#1B4D3E">bridgepbc.com</a>.
      </p>
      <p style="margin:20px 0 0;color:#666;font-size:12px">— The BRIDGE PBC team</p>
    </div>
  `;
}

async function sendRelayEmails(row, env) {
  const apiKey = env.RESEND_API_KEY;
  const from = env.ACCESS_REQUEST_FROM_EMAIL;
  const notifyTo = env.ACCESS_REQUEST_NOTIFY_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      "[request-access] RESEND_API_KEY or ACCESS_REQUEST_FROM_EMAIL not set — " +
      "skipping email relay. The request has still been recorded."
    );
    return { sent: false, reason: "email-not-configured" };
  }

  const tasks = [];

  if (notifyTo) {
    tasks.push(
      sendResendEmail({
        apiKey,
        from,
        to: notifyTo,
        subject: `New BRIDGE access request — ${row.name}`,
        html: buildAdminEmailHtml(row),
        replyTo: row.email,
      }).catch((err) => {
        console.error("[request-access] admin notify email failed:", err);
        return { error: err.message };
      })
    );
  } else {
    console.warn("[request-access] ACCESS_REQUEST_NOTIFY_EMAIL not set — skipping admin notification.");
  }

  tasks.push(
    sendResendEmail({
      apiKey,
      from,
      to: row.email,
      subject: "We received your BRIDGE research library request",
      html: buildApplicantEmailHtml(row),
    }).catch((err) => {
      console.error("[request-access] applicant confirmation email failed:", err);
      return { error: err.message };
    })
  );

  await Promise.all(tasks);
  return { sent: true };
}

/**
 * Core handler: pure function, no transport coupling.
 * @param {object} payload  Parsed JSON body from the client
 * @param {object} env      Process environment (or equivalent)
 * @returns {Promise<{status:number, body:object}>}
 */
export async function handleRequestAccess(payload, env = process.env) {
  const validationError = validatePayload(payload);
  if (validationError) {
    return { status: 400, body: { error: validationError } };
  }

  const row = {
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    country: payload.country.trim(),
    organization: payload.organization?.trim() || null,
    role: payload.role?.trim() || null,
    primary_interest: payload.primary_interest,
    connection: payload.connection,
    description: payload.description?.trim() || null,
  };

  let inserted;
  try {
    inserted = await insertAccessRequest(row, env);
  } catch (err) {
    console.error("[request-access] insert failed:", err);
    return {
      status: 500,
      body: { error: "We couldn't save your request right now. Please try again in a moment." },
    };
  }

  // Email relay is best-effort: failures are logged but do NOT fail the request,
  // since the application has already been recorded.
  let emailResult = { sent: false };
  try {
    emailResult = await sendRelayEmails(row, env);
  } catch (err) {
    console.error("[request-access] email relay unexpected error:", err);
  }

  return {
    status: 200,
    body: {
      ok: true,
      id: inserted?.id ?? null,
      emailRelay: emailResult.sent ? "sent" : "skipped",
    },
  };
}

/**
 * Vite dev-server / Node http middleware wrapper.
 */
export async function handleRequestAccessMiddleware(req, res) {
  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  let payload;
  try {
    let body = req.body;
    if (!body) {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = Buffer.concat(chunks).toString();
    }
    payload = typeof body === "string" ? JSON.parse(body || "{}") : body;
  } catch {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid JSON body." }));
    return;
  }

  const { status, body } = await handleRequestAccess(payload, process.env);
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}
