import { Falsey, Range, Pair, Verifier, MultiVerifier, TypeSchema, BasicType, B_TYPES } from './types';

export function isDefined(o: any, t: BasicType) {
  if (o === 0 && t === 'number') return true;
  if (o === '' && t === 'string') return true;

  return !o ? false : typeof o === t;
}

export function isString(o: any): o is string {
  return isDefined(o, 'string');
}

export function isNumber(o: any): o is number {
  return isDefined(o, 'number');
}

export function isBoolean(o: any): o is boolean {
  return o === true || o === false;
}

export function optional<T>(o: any, v: Verifier<T>): o is T | Falsey {
  return !o ? true : v(o);
}

export function optionalIf<T>(c: boolean, o: any, v: Verifier<T>): o is T | Falsey {
  return c ? optional(o, v) : v(o);
}

export function isArray<T>(o: any, v: Verifier<T>): o is T[] {
  return Array.isArray(o) && o.every(e => v(e));
}

export function isPair<T>(o: any, v: Verifier<T>): o is Pair<T> {
  return isArray(o, v) && o.length === 2;
}

export function isStrictTuple(o: any, choices: any[][]) {
  return Array.isArray(o) && o.length === choices.length && choices.every((e, i) => e.includes(o[i]));
}

export function isAny(o: any): o is any {
  return true;
}

export function isRange(o: any): o is Range {
  return isNumber(o.lower) && isNumber(o.upper) && o.lower < o.upper;
}

export function isBasicType(o: any): o is BasicType {
  return isString(o) && B_TYPES.includes(o as BasicType);
}

export function makeVerifier<T, U>(verifier: MultiVerifier<T, U>, v: Verifier<U>): Verifier<T> {
  return ((o: any) => verifier(o, v)) as Verifier<T>;
}

export function verifySchema<T>(o: any, schema: TypeSchema<T>, strict = true): o is T {
  if (!o) return false;

  const skeys = Object.keys(schema);
  const okeys = Object.keys(o);

  if (strict && skeys.length !== okeys.length) return false;

  if (!skeys.every(k => okeys.includes(k))) return false;

  for (const k in schema) {
    if (schema[k]) {
      const t = schema[k] as BasicType | Verifier<any>;
      const valid = isBasicType(t) ? isDefined(o[k], t) : t(o[k]);
      if (!valid) return false;
    }
  }

  return true;
}

export function makeSchemaVerfier<T>(schema: TypeSchema<T>, strict = true): Verifier<T> {
  return ((o: any) => verifySchema<T>(o, schema, strict)) as Verifier<T>;
}
