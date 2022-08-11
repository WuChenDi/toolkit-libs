import { isBrowserFn } from '../../src/index';

test('isBrowser', () => {
  expect(isBrowserFn()).toBe(true);
});