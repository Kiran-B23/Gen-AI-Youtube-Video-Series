import React from "react";

/** Glassmorphism card: translucent, blurred, soft border + shadow. */
export const Glass: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; glow?: string }> = ({ children, style, glow }) => (
  <div style={{ borderRadius: 30, background: "rgba(255,255,255,0.10)", backdropFilter: "blur(18px)", border: "1.5px solid rgba(255,255,255,0.24)", boxShadow: `0 20px 50px rgba(0,0,0,0.30)${glow ? `, 0 0 40px ${glow}55` : ""}`, ...style }}>
    {children}
  </div>
);
