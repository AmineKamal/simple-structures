// tslint:disable:max-classes-per-file

import { Map } from './types';

export class Queue<T> {
  private data: T[] = [];

  public push(e: T) {
    this.data.push(e);
  }

  public shift(): T | undefined {
    return this.data.shift();
  }

  public peeK(): T | undefined {
    return this.data[0];
  }
}

export class Stack<T> {
  private data: T[] = [];

  public push(e: T) {
    this.data.push(e);
  }

  public pop(): T | undefined {
    return this.data.pop();
  }

  public peeK(): T | undefined {
    return this.data[this.data.length - 1];
  }
}

export class Tree<T> {
  private _left?: Tree<T>;
  private _right?: Tree<T>;
  private parent?: Tree<T>;
  private node: T;

  public constructor(n: T, parent?: Tree<T>) {
    this.node = n;
    this.parent = parent;
  }

  public left(l: T) {
    this._left = new Tree(l, this);
  }

  public right(r: T) {
    this._right = new Tree(r, this);
  }

  public get root() {
    let n: Tree<T> = this;

    while (true) {
      if (n.parent) n = n.parent;
      else break;
    }

    return n;
  }
}

export function tree<T>(initial: T) {
  return new Tree(initial);
}

/* NOT READY YET */
class FixedArray<T> extends Array<T> {
  private size: number;

  public constructor(size: number, data?: T[]) {
    super();
    this.size = size;
    if (data) this.push(...data.splice(0, size));
  }

  public push(...items: T[]) {
    if (this.length + items.length >= this.size) return -1;
    return super.push(...items);
  }
}

export class VolatileMap<T> {
  private size: number;
  private keys: string[] = [];
  private map: Map<T> = {};

  public constructor(size: number) {
    this.size = size;
  }

  public set(key: string, value: T) {
    if (!this.keys.includes(key)) {
      this.keys.push(key);
    }

    this.map[key] = value;

    if (this.keys.length > this.size) {
      const k = this.keys.shift();
      if (k) delete this.map[k];
    }
  }

  public get(key: string) {
    return this.map[key];
  }
}

export class BiKeyMap<T> {
  private map: Map<T> = {};

  public constructor(private strict = false) {}

  set(key: [string, string], value: T) {
    const reversed = key
      .slice()
      .reverse()
      .join('');

    if (!this.strict && this.map[reversed]) {
      this.map[reversed] = value;
    }

    this.map[key.join('')] = value;
  }

  get(key: [string, string]) {
    const reversed = key
      .slice()
      .reverse()
      .join('');

    if (!this.strict && this.map[reversed]) {
      return this.map[reversed];
    }

    return this.map[key.join('')];
  }
}
