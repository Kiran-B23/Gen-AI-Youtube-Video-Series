import React from "react";
import { ChapterIntro } from "../core/editorial";
import { useScene } from "./common";

type P = { index: number; total: number; title: string };
/** Standalone chapter page (for chapters without their own visual). */
export const ChapterCard: React.FC = () => {
  const { props } = useScene<P>();
  return <ChapterIntro index={props.index} total={props.total} title={props.title} until={99999} />;
};
