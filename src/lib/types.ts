export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type StrictMap<K extends string, V> = { [key in K]: V };

export type Map<V> = StrictMap<string, V>;

export type Range = { lower: number; upper: number };
