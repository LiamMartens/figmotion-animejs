export const isNumberArray = (arr: any[]): arr is number[] => {
  return arr.every(v => typeof v === 'number');
}