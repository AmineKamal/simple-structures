import * as T from '../lib/task';

test('In', async () => {
  let a = 0;
  const time = 100;

  const t = T.run(() => (a = 1)).in(time);

  const start = Date.now();
  await t.start();
  const elapsed = Date.now() - start;

  expect(a).toEqual(1);
  expect(Math.abs(elapsed - time)).toBeLessThanOrEqual(10);
});

test('Every - Until', async () => {
  let a = 0;
  const time = 100;
  const factor = 10;

  const t = T.run(() => a++)
    .every(time)
    .until(() => a === factor);

  const start = Date.now();
  await t.start();
  const elapsed = Date.now() - start;

  expect(a).toEqual(factor);
  expect(Math.abs(elapsed - time * factor)).toBeLessThanOrEqual(150);
});

test('Every - Until - Times', async () => {
  let a = 0;
  const time = 100;
  const factor = 5;

  const t = T.run(() => a++)
    .every(time)
    .until(() => a === 10)
    .times(factor);

  const start = Date.now();
  await t.start();
  const elapsed = Date.now() - start;

  expect(a).toEqual(factor);
  expect(Math.abs(elapsed - time * factor)).toBeLessThanOrEqual(150);
});

test('Stop', async () => {
  let a = 0;
  const time = 10000;

  const t = T.run(() => (a = 1)).in(time);
  t.start();
  t.stop();

  expect(a).toEqual(0);
});
