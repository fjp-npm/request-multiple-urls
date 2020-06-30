import requestMultipleUrls from '../../lib/index';

jest.mock('axios');

test('empty input url collection', async () => {
  expect(await requestMultipleUrls([])).toStrictEqual([]);
});

test('single input url', async () => {
  const response = await requestMultipleUrls(['https://somewhere.com/one.json']);
  expect(response).toHaveLength(1);
  expect(response).toContainEqual({ data: 'https://somewhere.com/one.json' });
});

test('three input urls', async () => {
  const response = await requestMultipleUrls([
    'https://somewhere.com/one.json',
    'https://somewhere.com/two.json',
    'https://somewhere.com/three.json',
  ]);
  expect(response).toHaveLength(3);
  expect(response).toContainEqual({ data: 'https://somewhere.com/one.json' });
  expect(response).toContainEqual({ data: 'https://somewhere.com/two.json' });
  expect(response).toContainEqual({ data: 'https://somewhere.com/three.json' });
});

test('three input urls including one without json response', async () => {
  const response = await requestMultipleUrls([
    'https://no-json.com',
    'https://somewhere.com/two.json',
    'https://somewhere.com/three.json',
  ]);
  expect(response).toHaveLength(2);
  expect(response).toContainEqual({ data: 'https://somewhere.com/two.json' });
  expect(response).toContainEqual({ data: 'https://somewhere.com/three.json' });
});
