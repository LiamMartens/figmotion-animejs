import { AnimeValue } from './AnimeValue';

export type AnimeKeyframe = {
  delay: number;
  duration: number;
  value: AnimeValue;
  easing: string;
}