// tslint:disable:max-classes-per-file

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
