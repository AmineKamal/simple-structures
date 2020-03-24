import { clone } from './object';

export class Observable<T> {
  private subscribers: (((arg: T) => void) | undefined)[] = [];
  private values: T[] = [];

  public constructor(arg?: T) {
    if (arg) this.values.push(arg);
  }

  public get value() {
    return this.values[this.values.length - 1];
  }

  public subscribe(f: (arg: T) => void): number {
    if (this.value) f(this.value);
    return this.subscribers.push(f) - 1;
  }

  public next(arg: T) {
    this.values.push(arg);
    this.notify();
  }

  public update(u: (arg: T) => void) {
    u(this.value);
    this.notify();
  }

  public unsubscribe(id: number) {
    const f = this.subscribers[id];
    if (f) f(clone(this.value));

    this.subscribers[id] = undefined;
  }

  private notify() {
    this.subscribers.forEach(f => {
      if (f) f(this.value);
    });
  }
}
