import * as A from '../lib/array';

test('Sort With', () => {
  const original = ['a', 'c', 'b'];
  const sortArray = [1, 3, 2];
  const sorted = A.sortWith(original, sortArray, (a, b) => a - b);

  expect(sorted).toEqual(['a', 'b', 'c']);
});

test('Find All Indexes', () => {
  const original = ['a', 'b', 'b'];
  const indexes = A.findAllIndexes(original, s => s === 'b');

  expect(indexes).toEqual([1, 2]);
});

test('Remove All', () => {
  const original = ['a', 'b', 'b'];
  A.removeAll(original, s => s === 'b');

  expect(original).toEqual(['a']);
});

test('Swap', () => {
  const original = ['a', 'b', 'b'];
  A.swap(original, 0, 1);

  expect(original).toEqual(['b', 'a', 'b']);
});
