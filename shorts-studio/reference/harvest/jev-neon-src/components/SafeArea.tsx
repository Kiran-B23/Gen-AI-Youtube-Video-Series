import React from "react";
import { BAND, SAFE } from "../config";

/** Content box: platform-safe, narrowed to 840px so zoom punches never drift into the right UI zone. */
export const SAFE_W = 840;
export const COL_W = (SAFE_W - 40) / 2;
export const COL2_X = COL_W + 40;
/** Main-visual band in SafeArea coordinates (canvas y 480–1152). */
export const BAND_TOP = BAND.top - SAFE.top;
export const BAND_H = BAND.bottom - BAND.top;

export const SafeArea: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: SAFE.left, top: SAFE.top, width: SAFE_W, height: SAFE.bottom - SAFE.top }}>{children}</div>
);

/** A vertically centred box covering the main-visual band. */
export const Band: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ position: "absolute", top: BAND_TOP, left: 0, width: SAFE_W, height: BAND_H, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", ...style }}>{children}</div>
);
