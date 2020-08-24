import { Range } from './types';

export function fromRange(range: Range) {
  const a = [];
  for (let i = range.lower; i <= range.upper; i++) a.push(i);

  return a;
}

// TODO: Find a way to permit a undefined cmp function
export function sortWith<T, U>(ta: T[], ua: U[], cmp: (a: U, b: U) => number) {
  const merged = ta.map((t, i) => ({ t, u: ua[i] }));
  merged.sort((a, b) => cmp(a.u, b.u));

  return merged.map(m => m.t);
}

export function sortWithkey<T, K extends keyof T>(arr: T[], key: K, cmp: (a: T[K], b: T[K]) => number) {
  return arr.sort((a, b) => cmp(a[key], b[key]));
}

export function findAllIndexes<T>(arr: T[], f: (o: T) => boolean) {
  const indexes: number[] = [];
  for (let i = 0; i < arr.length; i++) if (f(arr[i])) indexes.push(i);

  return indexes;
}

export function removeAll<T>(arr: T[], f: (o: T) => boolean) {
  let i = arr.findIndex(f);
  while (i !== -1) {
    arr.splice(i, 1);
    i = arr.findIndex(f);
  }
}

export function swap<T>(arr: T[], i1: number, i2: number) {
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
}

export function tuple<T extends any[]>(...data: T) {
  return data;
}

async function getPivot<T>(x: T, y: T, z: T, compare: (a: T, b: T) => Promise<number>) {
  if ((await compare(x, y)) < 0) {
    if ((await compare(y, z)) < 0) {
      return y;
    } else if ((await compare(z, x)) < 0) {
      return x;
    } else {
      return z;
    }
  } else if ((await compare(y, z)) > 0) {
    return y;
  } else if ((await compare(z, x)) > 0) {
    return x;
  } else {
    return z;
  }
}

export async function asyncSort<T>(
  arr: T[],
  compare: (a: T, b: T) => Promise<number>,
  left = 0,
  right = arr.length - 1,
) {
  if (left < right) {
    let i = left;
    let j = right;
    let tmp: T;

    const pivot = await getPivot(arr[i], arr[i + Math.floor((j - i) / 2)], arr[j], compare);

    while (true) {
      while ((await compare(arr[i], pivot)) < 0) {
        i++;
      }
      while ((await compare(pivot, arr[j])) < 0) {
        j--;
      }
      if (i >= j) {
        break;
      }
      tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;

      i++;
      j--;
    }

    await asyncSort(arr, compare, left, i - 1);
    await asyncSort(arr, compare, j + 1, right);
  }
  return arr;
}

export const desc = (a: number, b: number) => b - a;
export const asc = (a: number, b: number) => a - b;
export const adesc = async (a: number, b: number) => b - a;
export const aasc = async (a: number, b: number) => a - b;
