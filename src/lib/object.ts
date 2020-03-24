import { StrictMap } from './types';
import { isDefined } from './verifiers';

export function clone<T extends any>(arg: T): T {
  return isDefined(arg.clone, 'function') ? arg.clone() : JSON.parse(JSON.stringify(arg));
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

export function deepEqual(o1: any, o2: any) {
  const k1 = Object.keys(o1);
  const k2 = Object.keys(o2);

  if (k1.length !== k2.length) return false;
  if (!k1.every(k => k2.includes(k))) return false;

  // tslint:disable-next-line:forin
  for (const k in k1) {
    if (typeof o1[k] !== typeof o2[k]) return false;
    if (typeof o1[k] === 'object' && !deepEqual(o1[k], o2[k])) return false;
    if (o1[k] !== o2[k]) return false;
  }

  return true;
}
