export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type StrictMap<K extends string, V> = { [key in K]: V };

export type TypeMap<T, V> = { [key in keyof T]: V };

export type Map<V> = StrictMap<string, V>;

export type Range = { lower: number; upper: number };

export type Falsey = false | undefined | null | '' | 0;

export type Pair<T> = [T, T];

export type Verifier<T> = (o: any) => o is T;

export type MultiVerifier<T, U> = (o: any, v: Verifier<U>) => o is T;

export const B_TYPES = ['string', 'number', 'bigint', 'boolean', 'symbol', 'undefined', 'object', 'function'] as const;

export type BasicType = typeof B_TYPES[number];

export type TypeSchema<T> = TypeMap<T, Verifier<any> | BasicType>;

export type Constructable<T> = new (...args: any) => T;
