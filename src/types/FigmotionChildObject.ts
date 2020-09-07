import { FigmotionKeyframe } from "./FigmotionKeyframe";
import { Anchor } from "./Anchor";

export type FigmotionChildObject = {
  keyframes: Record<string, FigmotionKeyframe[]>;
  anchor: Anchor;
  version: string;
  type?: 'standalone';
};