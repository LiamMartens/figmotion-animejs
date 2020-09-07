export type AnchorObject = {
  x: 'LEFT' | 'CENTER' | 'RIGHT',
  y: 'TOP' | 'MIDDLE' | 'BOTTOM'
};

export type Anchor = AnchorObject | (
  'TOPLEFT'
  | 'TOPCENTER'
  | 'TOPRIGHT'
  | 'MIDDLELEFT'
  | 'MIDDLECENTER'
  | 'MIDDLERIGHT'
  | 'BOTTOMLEFT'
  | 'BOTTOMCENTER'
  | 'BOTTOMRIGHT'
);