import { Constructable } from './types';
import { isDefined } from './verifiers';

export class Clonable<T extends Clonable<any>> {
  private _ctor: Constructable<T>;
  [key: string]: any;

  public constructor(ctor: Constructable<T>) {
    this._ctor = ctor;
  }

  public clone(): T {
    return this.__copy(this, new this._ctor());
  }

  private __copy(original: Clonable<T>, copy: Clonable<T>): T {
    Object.keys(original).forEach(k => (copy[k] = this.__deepCopy(original[k])));
    return copy as T;
  }

  private __deepCopy(o: any): any {
    if (isDefined(o.clone, 'function')) return o.clone();
    else if (Array.isArray(o)) return o.map(e => this.__deepCopy(e));
    else if (typeof o === 'object') return JSON.parse(JSON.stringify(o));
    else return o;
  }
}
