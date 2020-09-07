import { FigmotionKeyframe, AnimeValue, AnimeKeyframe } from '../types';

export const keyframesToAnimeKeyframes = (
  frames: FigmotionKeyframe[],
  callback: (frame: FigmotionKeyframe, prev: FigmotionKeyframe | null, index: number, keyframes: FigmotionKeyframe[]) => Record<string, AnimeValue>,
): Record<string, AnimeKeyframe[]> => {
  const keyframes: Record<string, AnimeKeyframe[]> = {};
  frames.forEach((frame, index) => {
    const prev = index > 0 ? frames[index - 1] : null;
    const value = callback(frame, prev, index, frames);
    for (const prop in value) {
      if (!(prop in keyframes)) keyframes[prop] = [];
      keyframes[prop].push({
        value: value[prop],
        delay: 0,
        duration: prev ? frame.ms - prev.ms : 0,
        easing: !frame.easing ? 'linear' : ((frame.easing === 'custom' && frame.easingCurve)
          ? `cubicBezier(${frame.easingCurve.join(',')})`
          : frame.easing),
      });
    }
  });
  return keyframes;
}