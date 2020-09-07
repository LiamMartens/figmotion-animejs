import { PropertyValue } from './PropertyValue';

export type FigmotionKeyframe = {
  property: string;
  ms: number;
  value: PropertyValue;
  easing: string;
  easingCurve: [number, number, number, number];
}