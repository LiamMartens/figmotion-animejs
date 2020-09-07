import anime, { AnimeParams, AnimeInstance } from 'animejs';
import { FigmotionObject, AnimeValue, AnimeKeyframe, FigmotionKeyframe } from './types';
import { transformOriginFromAnchor, getNormalizedAnchor, keyframesToAnimeKeyframes, isNumberArray, isStringArray } from './utils';

export const figmotionToAnimeTimeline = (
  object: FigmotionObject,
  timelineOptions?: AnimeParams | ReadonlyArray<AnimeInstance>,
  valueOverride?: (childId: string, property: string, frame: FigmotionKeyframe, prev: FigmotionKeyframe | null, index: number, all: FigmotionKeyframe[]) => Record<string, AnimeValue>,
) => {
  const t = anime.timeline(timelineOptions);
  for (const childId in object) {
    const el = document.getElementById(childId);
    const o = object[childId];
    const anchor = getNormalizedAnchor(o.anchor);
    const transformOrigin = transformOriginFromAnchor(o.anchor);
    const transformForOffset = {
      translateX: anchor.x === 'CENTER' ? -.5 : (
        anchor.x === 'RIGHT' ? -1 : 0
      ),
      translateY: anchor.y === 'MIDDLE' ? -.5 : (
        anchor.y === 'BOTTOM' ? -1 : 0
      ),
    };

    if (el) {
      el.style.transformOrigin = transformOrigin;
    }

    const timelineObject: Record<string, AnimeKeyframe[]> = {};
    for (const prop in o.keyframes) {
      const keyframes = keyframesToAnimeKeyframes(o.keyframes[prop], (frame, prev, index, frames): Record<string, AnimeValue> => {
        const override = valueOverride ? valueOverride(childId, prop, frame, prev, index, frames) : null;
        const def = ((): Record<string, AnimeValue> => {
          const firstValue = frames[0].value;
          const frameValue = frame.value;
          if (
            typeof firstValue === 'number'
            && typeof frameValue === 'number'
          ) {
            if (prop === 'x') {
              return { translateX: frameValue - firstValue };
            } else if (prop === 'y') {
              return { translateY: frameValue - firstValue };
            } else if (prop === 'rotation') {
              return { rotate: `${frameValue}deg` };
            } else if (prop === 'width') {
              return { width: frameValue };
            } else if (prop === 'height') {
              return { height: frameValue };
            } else if (prop === 'opacity') {
              return { opacity: frameValue };
            } else if (prop === 'strokeWidth') {
              return { borderWidth: frameValue };
            } else if (prop === 'cornerRadius') {
              return { borderRadius: frameValue };
            } else if (prop === 'fontSize') {
              return { fontSize: frameValue };
            } else if (prop === 'letterSpacing') {
              return { letterSpacing: frameValue };
            } else if (prop === 'lineHeight') {
              return { lineHeight: frameValue };
            }
          } else if (
            Array.isArray(firstValue)
            && Array.isArray(frameValue)
          ) {
            if (
              isNumberArray(firstValue)
              && isNumberArray(frameValue)
            ) {
              if (prop === 'fillColor') {
                return {
                  backgroundColor: `rgba(${frameValue.join(',')})`,
                  fill: `rgba(${frameValue.join(',')})`,
                  color: `rgba(${frameValue.join(',')})`,
                };
              } else if (prop === 'strokeColor') {
                return { borderColor: `rgaba(${frameValue.join(',')})` };
              } else if (prop === 'cornerRadius') {
                return { borderRadius: frameValue.join(',') };
              }
            } else if (
              isStringArray(firstValue)
              && isStringArray(frameValue)
            ) {
              if (prop === 'd') {
                return { d: `${frameValue.join('Z')}Z` };
              }
            }
          }
          return {};
        })();
        return {
          ...def,
          ...(override ? override : {}),
        };
      });
      for (const prop in keyframes) {
        if (!(prop in timelineObject)) timelineObject[prop] = [];
        timelineObject[prop] = timelineObject[prop].concat(keyframes[prop]);
      }
    }
    console.log(timelineObject);
    t.add({
      targets: `#${childId}`,
      ...timelineObject,
    });
  }
  return t;
}