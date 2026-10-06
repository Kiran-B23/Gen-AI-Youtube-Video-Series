import React from "react";
import { BAND_H, BAND_TOP, SAFE, SAFE_W } from "../theme/tokens";

export const SafeArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: SAFE.left, top: SAFE.top, width: SAFE_W, height: SAFE.bottom - SAFE.top }}>{children}</div>
);

/** Box covering the main-visual band (25%–60%), children centred. */
export const Band: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; align?: "center" | "start" }> = ({ children, style, align = "center" }) => (
  <div style={{ position: "absolute", top: BAND_TOP, left: 0, width: SAFE_W, height: BAND_H, display: "flex", flexDirection: "column", justifyContent: align === "center" ? "center" : "flex-start", alignItems: "center", ...style }}>{children}</div>
);
