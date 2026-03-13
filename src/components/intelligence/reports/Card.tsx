import React, { useState } from "react";

export interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Card({ children, style: ex = {} }: CardProps) {
  const [h, sH] = useState(false);
  return (
    <div
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        boxShadow: h ? "0 4px 16px rgba(0,0,0,0.09)" : "0 1px 4px rgba(0,0,0,0.05)",
        transform: h ? "translateY(-1px)" : "none",
        transition: "all .2s ease",
        overflow: "hidden",
        ...ex,
      }}
    >
      {children}
    </div>
  );
}
