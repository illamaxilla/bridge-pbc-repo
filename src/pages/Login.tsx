import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BRIDGEAuthModal } from "@/components/AuthModal";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  return (
    <BRIDGEAuthModal
      isOpen={true}
      onClose={() => navigate(redirectTo)}
      defaultTab="signin"
      onSignInSuccess={() => navigate(redirectTo)}
    />
  );
};

export default Login;
