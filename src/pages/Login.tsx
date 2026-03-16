import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BRIDGEAuthModal } from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const rawRedirect = searchParams.get("redirect") || "/";
  // Prevent open redirect: only allow relative paths
  const redirectTo = rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") ? rawRedirect : "/";

  return (
    <BRIDGEAuthModal
      isOpen={true}
      onClose={() => navigate(user ? redirectTo : "/")}
      defaultTab="signin"
      onSignInSuccess={() => navigate(redirectTo)}
      preventClose={!user}
    />
  );
};

export default Login;
