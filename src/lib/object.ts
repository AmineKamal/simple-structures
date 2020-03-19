import { StrictMap } from './types';

export function clone<T>(arg: T): T {
  return JSON.parse(JSON.stringify(arg));
}

export function filterStringify(obj: any, keys: string[]) {
  return JSON.stringify(obj, (k, v) => (keys.indexOf(k) !== -1 ? undefined : v));
}

export function removeKeys(obj: any, keys: string[]) {
  return JSON.parse(filterStringify(obj, keys));
}

export function pick<K, T extends K>(K: new () => K, obj: T): K {
  const c = {} as any;
  Object.keys(new K()).forEach(key => (c[key] = (obj as any)[key]));
  return c as K;
}

export function initStrict<K extends string, V>(a: readonly K[], i: V): StrictMap<K, V> {
  return a.reduce((p: any, c) => ((p[c] = i), p), {}) as StrictMap<K, V>;
}
