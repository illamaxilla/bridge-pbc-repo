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
  const { error } = await supabase.from("access_requests").insert(data);
  if (error) throw new Error(error.message);
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
