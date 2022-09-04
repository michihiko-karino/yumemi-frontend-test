import { resasApiHandler } from './mockedServer';
import { setupServer } from 'msw/node';
// vitest上のjsdomでcanvasを扱えるようにする
// 参考: https://github.com/wobsoriano/vitest-canvas-mock#usage
import 'vitest-canvas-mock';

const server = setupServer(...resasApiHandler);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
