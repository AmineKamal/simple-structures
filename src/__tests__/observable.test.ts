import { Observable } from '../lib/observable';

test('Observable - Next - Subscribe', async () => {
  let a = 0;
  const ob = new Observable(100);
  const id = ob.subscribe(o => (a = o));

  expect(a).toEqual(100);
  ob.next(10);
  expect(a).toEqual(10);

  ob.unsubscribe(id);
  ob.next(1000);
  expect(a).toEqual(10);
});

test('Observable - Update - Subscribe', async () => {
  let a: number[] = [];
  const ob = new Observable([0]);
  const id = ob.subscribe(o => (a = o));

  expect(a.length).toEqual(1);
  expect(a[0]).toEqual(0);

  ob.update(arg => arg.push(1));

  expect(a.length).toEqual(2);
  expect(a[0]).toEqual(0);
  expect(a[1]).toEqual(1);

  ob.unsubscribe(id);
  ob.update(arg => arg.push(1));

  expect(a.length).toEqual(2);
  expect(a[0]).toEqual(0);
  expect(a[1]).toEqual(1);
  expect(a[2]).toEqual(undefined);
});
