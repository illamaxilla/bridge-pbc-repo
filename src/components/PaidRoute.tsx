import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/**
 * Route guard that requires a paid membership tier.
 * Unauthenticated users are redirected to /login.
 * Authenticated users without a paid tier are redirected to /membership.
 */
export function PaidRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, tier } = useAuth();
  const location = useLocation();

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
