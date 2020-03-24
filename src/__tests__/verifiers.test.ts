import {
  isDefined,
  isString,
  isNumber,
  isBoolean,
  optional,
  optionalIf,
  isArray,
  isPair,
  isStrictTuple,
  isAny,
  isRange,
  isBasicType,
  makeVerifier,
  verifySchema,
  makeSchemaVerfier,
} from '../lib/verifiers';
import { Range, TypeSchema, Pair } from '../lib/types';

test('Is Defined', () => {
  expect(isDefined(undefined, 'string')).toBeFalsy();
  expect(isDefined(45, 'string')).toBeFalsy();
  expect(isDefined('45', 'string')).toEqual(true);
  expect(isDefined(() => null, 'function')).toEqual(true);
});

test('Is String', () => {
  expect(isString(45)).toBeFalsy();
  expect(isString('45')).toEqual(true);
});

test('Is Number', () => {
  expect(isNumber('45')).toBeFalsy();
  expect(isNumber(45)).toEqual(true);
});

test('Is Boolean', () => {
  expect(isBoolean(34)).toBeFalsy();
  expect(isBoolean(true)).toEqual(true);
});

test('Optional', () => {
  expect(optional('45', isNumber)).toBeFalsy();
  expect(optional(undefined, isNumber)).toEqual(true);
  expect(optional(45, isNumber)).toEqual(true);
});

test('Optional If', () => {
  expect(optionalIf(false, undefined, isNumber)).toBeFalsy();
  expect(optionalIf(true, undefined, isNumber)).toEqual(true);
  expect(optionalIf(true, 45, isNumber)).toEqual(true);
  expect(optionalIf(false, 45, isNumber)).toEqual(true);
});

test('Is Array', () => {
  expect(isArray({}, isString)).toBeFalsy();
  expect(isArray([1, 2], isString)).toBeFalsy();
  expect(isArray(null, isString)).toBeFalsy();
  expect(isArray(['A'], isString)).toEqual(true);
  expect(isArray([1, 2], isNumber)).toEqual(true);
});

test('Is Pair', () => {
  expect(isPair(['A'], isString)).toBeFalsy();
  expect(isPair(['A', 3], isString)).toBeFalsy();
  expect(isPair(['A', 'A', 'A'], isString)).toBeFalsy();
  expect(isPair(['A', 'A'], isString)).toEqual(true);
});

test('Is Strict Tuple', () => {
  const choices = [
    [1, 'a'],
    [2, 'b'],
  ];

  expect(isStrictTuple(['a'], choices)).toBeFalsy();
  expect(isStrictTuple(['a', 'b', 'c'], choices)).toBeFalsy();
  expect(isStrictTuple(['a', 1], choices)).toBeFalsy();
  expect(isStrictTuple(['b', 1], choices)).toBeFalsy();
  expect(isStrictTuple(['a', 2], choices)).toEqual(true);
});

test('Is Any', () => {
  expect(isAny({})).toEqual(true);
  expect(isAny([])).toEqual(true);
  expect(isAny(null)).toEqual(true);
  expect(isAny(undefined)).toEqual(true);
  expect(isAny(33)).toEqual(true);
});

test('Is Range', () => {
  const range: Range = { lower: 0, upper: 6 };

  expect(isRange({})).toBeFalsy();
  expect(isRange([])).toBeFalsy();
  expect(isRange({ lower: 0 })).toBeFalsy();
  expect(isRange({ upper: 0 })).toBeFalsy();
  expect(isRange(range)).toEqual(true);
});

test('Is Basic Type', () => {
  expect(isBasicType('string')).toEqual(true);
  expect(isBasicType('sring')).toBeFalsy();
});

test('Make Verifier', () => {
  const isNumArray = makeVerifier(isArray, isNumber);

  expect(isNumArray({})).toBeFalsy();
  expect(isNumArray([])).toEqual(true);
  expect(isNumArray([''])).toBeFalsy();
  expect(isNumArray([12])).toEqual(true);
});

test('Verify Schema', () => {
  type A = { a: string; aa: Pair<string> };
  const isStringPair = makeVerifier(isPair, isString);
  const validatorA: TypeSchema<A> = { a: 'string', aa: isStringPair };

  expect(verifySchema({}, validatorA)).toEqual(false);
  expect(verifySchema({ a: '' }, validatorA)).toEqual(false);
  expect(verifySchema({ aa: ['a', 'a'] }, validatorA)).toEqual(false);
  expect(verifySchema({ a: 5, aa: ['a', 'a'] }, validatorA)).toEqual(false);
  expect(verifySchema({ a: '5', aa: [1, 'a'] }, validatorA)).toEqual(false);
  expect(verifySchema({ a: '', aa: ['a', 'a'] }, validatorA)).toEqual(true);
});

test('Make Schema Verifier', () => {
  type A = { a: string; aa: Pair<string> };
  const isStringPair = makeVerifier(isPair, isString);
  const validatorA: TypeSchema<A> = { a: 'string', aa: isStringPair };
  const verifierA = makeSchemaVerfier(validatorA);

  expect(verifierA({})).toEqual(false);
  expect(verifierA({ a: '' })).toEqual(false);
  expect(verifierA({ aa: ['a', 'a'] })).toEqual(false);
  expect(verifierA({ a: 5, aa: ['a', 'a'] })).toEqual(false);
  expect(verifierA({ a: '5', aa: [1, 'a'] })).toEqual(false);
  expect(verifierA({ a: '', aa: ['a', 'a'] })).toEqual(true);
});
