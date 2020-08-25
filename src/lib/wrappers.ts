// tslint:disable:max-classes-per-file

import { Range } from './types';
import { inRange } from './boolean';
import { any, shuffle } from './random';
import { clone, forEachKey } from './object';
import { swap, sortWith, findAllIndexes, removeAll, asyncSort, uniquePush } from './array';

class BaseWrapper<T> {
  protected obj: T;

  public constructor(obj: T) {
    this.obj = obj;
  }

  public get value() {
    return this.obj;
  }

  public clone() {
    return clone(this.obj);
  }

  public copy() {
    this.obj = this.clone();
    return this;
  }
}

export class ObjectWrapper<T> extends BaseWrapper<T> {
  public constructor(obj: T) {
    super(obj);
  }

  public forEach(f: (v: T[keyof T], k?: keyof T, o?: T) => void) {
    forEachKey(this.obj, f);
    return this;
  }
}

export class ArrayWrapper<T> extends BaseWrapper<T[]> {
  public constructor(obj: T[]) {
    super(obj);
  }

  public any() {
    return any(this.obj);
  }

  public shuffle() {
    shuffle(this.obj);
    return this;
  }

  public swap(i1: number, i2: number) {
    swap(this.obj, i1, i2);
    return this;
  }

  public sortWith<U>(ua: U[], cmp: (a: U, b: U) => number) {
    this.obj = sortWith(this.obj, ua, cmp) as T[];
    return this;
  }

  public findAllIndexes(f: (o: T) => boolean) {
    return findAllIndexes(this.obj, f);
  }

  public removeAll(f: (o: T) => boolean) {
    removeAll(this.obj, f);
    return this;
  }

  public async asyncSort(cmp: (a: T, b: T) => Promise<number>) {
    await asyncSort(this.obj, cmp);
    return this;
  }

  public uniquePush(e: T, f?: (a: T, b: T) => boolean) {
    return uniquePush(this.obj, e, f);
  }
}

export class RangeWrapper<T extends Range> extends BaseWrapper<T> {
  public constructor(obj: T) {
    super(obj);
  }

  public inRange(value: number) {
    return inRange(this.obj, value);
  }
}

export const wrap = {
  array: <T>(obj: T[]) => new ArrayWrapper(obj),
  object: <T extends object>(obj: T) => new ObjectWrapper(obj),
  range: <T extends Range>(obj: T) => new RangeWrapper(obj),
  any: <T>(obj: T) => new BaseWrapper(obj),
};

export const awrap = wrap.array;
export const owrap = wrap.object;
export const rwrap = wrap.range;
export const anywrap = wrap.any;
