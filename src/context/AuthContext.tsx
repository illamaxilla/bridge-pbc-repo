import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export type MembershipTier = "public" | "free" | "paid";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  tier: MembershipTier;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<MembershipTier>("public");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setTier(resolveTier(session?.user ?? null));
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setTier(resolveTier(session?.user ?? null));
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, tier, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

/**
 * Resolve membership tier from Supabase app_metadata (server-only writable).
 *
 * app_metadata is set exclusively via the Supabase Admin API / service-role
 * and cannot be modified by the client, unlike user_metadata.
 * Falls back to user_metadata for backwards-compat during migration, but
 * app_metadata takes precedence when present.
 */
function resolveTier(user: User | null): MembershipTier {
  if (!user) return "public";
  // Prefer app_metadata (secure, not client-writable)
  const appMeta = user.app_metadata?.membership_tier;
  if (appMeta === "paid") return "paid";
  // Fallback to user_metadata during migration period
  const userMeta = user.user_metadata?.membership_tier;
  if (userMeta === "paid") return "paid";
  return "free";
}
