import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/**
 * Route guard that requires a paid membership tier.
 * Unauthenticated users are redirected to /login.
 * Authenticated users without a paid tier are redirected to /membership.
 *
 * Founder portal navigation passes { state: { founderAccess: true } }
 * which grants access without requiring Supabase auth, since the
 * founder portal itself is gated by a verified access code.
 */
export function PaidRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, tier } = useAuth();
  const location = useLocation();

  // Allow access when navigating from the founder portal (already code-gated)
  if ((location.state as any)?.founderAccess) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (tier !== "paid") {
    return <Navigate to="/membership" replace />;
  }

  return <>{children}</>;
}
