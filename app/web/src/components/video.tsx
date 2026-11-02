// Small shared bits for the simple interface (pages/Videos.tsx, pages/Video.tsx): the stage chip and the page head.
import type { ReactNode } from "react";
import type { VideoStage } from "../api";
import { Gate, type GateState } from "./ui";

/** the owner's turn is loud (amber "waiting for you"), work in progress is live (cobalt), delivered is calm green, stopped red */
const STAGE_STATE: Record<VideoStage, GateState> = {
  script: "running", building: "running", "your-script": "waiting", "your-review": "waiting", delivered: "pass", stopped: "fail",
};
export const isYourTurn = (s: VideoStage) => s === "your-script" || s === "your-review";
export const isLive = (s: VideoStage) => s === "script" || s === "building";

export function StageChip({ stage, text }: { stage: VideoStage; text: string }) {
  return <Gate state={STAGE_STATE[stage]} title={text}>{text}</Gate>;
}

/** a page head in the same shape as Projects and Settings: sticky, a 2px ink rule under it */
export function PageHead({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink bg-paper px-4 py-4 sm:px-6">
      <div className="min-w-0">{children}</div>
      {right && <div className="flex shrink-0 items-center gap-2">{right}</div>}
    </div>
  );
}
