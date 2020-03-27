// TODO: Find a way to permit a undefined cmp function
export function sortWith<T, U>(ta: T[], ua: U[], cmp: (a: U, b: U) => number) {
  const merged = ta.map((t, i) => ({ t, u: ua[i] }));
  merged.sort((a, b) => cmp(a.u, b.u));

  return merged.map(m => m.t);
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
