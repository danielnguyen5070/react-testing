// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { build, fake } from '@jackfranklin/test-data-bot';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import Login from '../../components/login-submission';
import type { LoginData } from '../test/server-handlers';

const buildLoginForm = build<LoginData>('LoginForm', {
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

const handlers = [
  http.post('https://auth-provider.example.com/api/login', async ({ request }) => {
    const body = await request.json() as LoginData;
    if (!body.username)
      return HttpResponse.json({ message: 'username required' }, { status: 400 });
    if (!body.password)
      return HttpResponse.json({ message: 'password required' }, { status: 400 });
    return HttpResponse.json({ username: body.username });
  }),
];

// Setup server
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const { username, password } = buildLoginForm();
  await userEvent.type(screen.getByLabelText(/username/i), username);
  await userEvent.type(screen.getByLabelText(/password/i), password);
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText(username)).toBeInTheDocument();
});
