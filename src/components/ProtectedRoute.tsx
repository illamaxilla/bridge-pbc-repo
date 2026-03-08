import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BRIDGEAuthModal } from "@/components/AuthModal";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("bridge_authed") === "1"
  );

  return (
    <>
      {children}
      <BRIDGEAuthModal
        isOpen={!authed}
        onClose={() => navigate("/")}
        defaultTab="signin"
        onSignInSuccess={() => {
          sessionStorage.setItem("bridge_authed", "1");
          setAuthed(true);
        }}
      />
    </>
  );
}
