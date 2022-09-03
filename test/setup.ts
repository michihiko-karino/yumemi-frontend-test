import { resasApiHandler } from './mockedServer';
import { setupServer } from 'msw/node';

const server = setupServer(...resasApiHandler);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
