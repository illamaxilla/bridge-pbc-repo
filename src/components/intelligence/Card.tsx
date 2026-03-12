import React, { useState, ReactNode, memo } from "react";

interface CardProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

// React.memo: Card is a leaf component rendered repeatedly in dashboard lists/grids.
// Memo prevents re-renders when sibling cards or parent dashboard state changes.
export const Card = memo(function Card({ children, style: ex = {} }: CardProps) {
  const [h, sH] = useState(false);
  return (
    <div
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #E5E7EB",
        boxShadow: h ? "0 6px 20px rgba(0,0,0,0.09)" : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "all .2s",
        minWidth: 0,
        overflow: "hidden",
        ...ex,
      }}
    >
      {children}
    </div>
  );
});
