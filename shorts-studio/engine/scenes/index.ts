import React from "react";
import { BigCounter } from "./BigCounter";
import { BigStamp } from "./BigStamp";
import { ChapterCard } from "./ChapterCard";
import { Checklist } from "./Checklist";
import { CodeCard } from "./CodeCard";
import { Equation } from "./Equation";
import { LookupTable } from "./LookupTable";
import { MechanismStep } from "./MechanismStep";
import { RecapCard } from "./RecapCard";
import { RunningExample } from "./RunningExample";
import { SideBySideVariants } from "./SideBySideVariants";
import { TitleHook } from "./TitleHook";
import { TokenStrip } from "./TokenStrip";
import { HookScene } from "./HookScene";
import { SplitCompare } from "./SplitCompare";
import { PhoneMockup } from "./PhoneMockup";
import { StoryCard } from "./StoryCard";
import { CardCarousel } from "./CardCarousel";
import { ChannelHop } from "./ChannelHop";
import { RulesPanel } from "./RulesPanel";
import { CatchPanel } from "./CatchPanel";
import { Timeline } from "./Timeline";
import { Cta } from "./Cta";

/** Scene type -> component. Add new generic types here and to references/scene-catalog.md. */
export const SCENES: Record<string, React.FC> = {
  "title-hook": TitleHook,
  "running-example": RunningExample,
  "chapter-card": ChapterCard,
  "big-counter": BigCounter,
  "mechanism-step": MechanismStep,
  "token-strip": TokenStrip,
  "lookup-table": LookupTable,
  "side-by-side-variants": SideBySideVariants,
  "big-stamp": BigStamp,
  equation: Equation,
  checklist: Checklist,
  "code-card": CodeCard,
  "recap-card": RecapCard,
  // story-driven / dayToNight scenes
  "hook-scene": HookScene,
  "split-compare": SplitCompare,
  "phone-mockup": PhoneMockup,
  "story-card": StoryCard,
  "card-carousel": CardCarousel,
  "channel-hop": ChannelHop,
  "rules-panel": RulesPanel,
  "catch-panel": CatchPanel,
  timeline: Timeline,
  cta: Cta,
};
