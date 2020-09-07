import { Anchor, AnchorObject } from '../types';

export const getNormalizedAnchor = (anchor: Anchor): AnchorObject => {
  return typeof anchor === 'object' ? anchor : (() => {
    let x: AnchorObject['x'] = 'LEFT'; let y: AnchorObject['y'] = 'TOP';
    if (anchor.startsWith('MIDDLE')) y = 'MIDDLE';
    else if (anchor.startsWith('BOTTOM')) y = 'BOTTOM';
    if (anchor.endsWith('CENTER')) x = 'CENTER';
    else if (anchor.endsWith('RIGHT')) x = 'RIGHT';
    return { x, y };
  })();
}