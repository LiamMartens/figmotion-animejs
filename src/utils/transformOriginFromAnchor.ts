import { Anchor } from '../types';
import { getNormalizedAnchor } from './getNormalizedAnchor';

export const transformOriginFromAnchor = (anchor: Anchor) => {
  const anchorObject = getNormalizedAnchor(anchor);
  return `${anchorObject.x.toLowerCase()} ${anchorObject.y === 'MIDDLE' ? 'center' : anchorObject.y.toLowerCase()}`;
}