import React from "react";
import { useNavigate } from "react-router-dom";
import { BRIDGEAuthModal } from "@/components/AuthModal";

const Login = () => {
  const navigate = useNavigate();
  return (
    <BRIDGEAuthModal
      isOpen={true}
      onClose={() => navigate("/")}
      defaultTab="signin"
    />
  );
};

export default Login;
