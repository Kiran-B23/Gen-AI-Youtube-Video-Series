import React from "react";
import { COLORS } from "../config";
import { Slam } from "./Kinetic";
import { SAFE_W } from "./SafeArea";

/** Scene header in the zone above the main band (SafeArea y 40–340). */
export const Title: React.FC<{ children: React.ReactNode; at?: number; top?: number; color?: string; fontSize?: number }> = ({ children, at = 0, top = 150, color = COLORS.white, fontSize = 76 }) => (
  <div style={{ position: "absolute", top, width: SAFE_W, textAlign: "center" }}>
    <Slam at={at} fontSize={fontSize} color={color} rotate={-2} from={1.8}>{children}</Slam>
  </div>
);
