import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Back link */}
      <div className="w-full max-w-md mb-6">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Home
        </Link>
      </div>

      {/* Auth container */}
      <div className="w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm p-8">
        {/* BRIDGE branding */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold tracking-widest text-foreground">BRIDGE</span>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        {/* ↓↓↓ PASTE YOUR SIGN-IN / REGISTER CODE HERE ↓↓↓ */}
        <div className="flex items-center justify-center h-32 rounded-md border border-dashed border-border text-muted-foreground text-sm">
          Your sign-in / register UI goes here
        </div>
        {/* ↑↑↑ PASTE YOUR SIGN-IN / REGISTER CODE HERE ↑↑↑ */}
      </div>
    </div>
  );
};

export default Login;
