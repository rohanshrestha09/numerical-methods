export const getRandomValue = (range: number) =>
  Math.floor(Math.random() * (2 * range + 1)) - range;
