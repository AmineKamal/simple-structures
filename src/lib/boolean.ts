import { Range } from './types';

export function inRange(range: Range, value: number) {
  return value >= range.lower && value <= range.upper;
}
