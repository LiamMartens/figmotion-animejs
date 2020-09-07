export const isStringArray = (arr: any[]): arr is string[] => {
  return arr.every(v => typeof v === 'string');
}