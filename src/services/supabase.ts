import { supabase } from "@/integrations/supabase/client";

/**
 * Subscribe an email address to the newsletter.
 * Silently succeeds if the email is already subscribed (duplicate key).
 */
export async function subscribe(email: string): Promise<void> {
  const { error } = await supabase.from("subscribers").insert({ email });
  if (error && error.code !== "23505") {
    throw new Error(error.message);
  }
}

/**
 * Submit an access request from the onboarding form.
 *
 * Routes through the `/api/request-access` serverless endpoint (Netlify Function
 * in prod, Vite middleware in dev) which handles validation, the DB insert, and
 * the email relay (admin notification + applicant confirmation). The endpoint
 * bypasses RLS via the service role key, so the browser never talks to Supabase
 * directly for this flow.
 */
export async function submitAccessRequest(data: {
  name: string;
  email: string;
  country: string;
  organization?: string | null;
  role?: string | null;
  primary_interest: string;
  connection: string;
  description?: string | null;
}): Promise<void> {
  let response: Response;
  try {
    response = await fetch("/api/request-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(
      "We couldn't reach the BRIDGE servers. Check your connection and try again."
    );
  }

  let body: { error?: string; ok?: boolean } = {};
  try {
    body = await response.json();
  } catch {
    // Non-JSON response — fall through to status-code handling below.
  }

  if (!response.ok) {
    throw new Error(
      body.error || `Request failed (${response.status}). Please try again.`
    );
  }
}

/**
 * Send a password reset email via Supabase Auth.
 */
export async function resetPassword(email: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/login`,
  });
  if (error) throw new Error(error.message);
}
