import * as React from 'react'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build, fake } from '@jackfranklin/test-data-bot'
import { setupServer } from 'msw/node'
import { handlers } from '../test/server-handlers'
import Login from '../../components/login-submission'
import type { LoginData } from '../test/server-handlers';

const buildLoginForm = build<LoginData>('LoginForm', {
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const { username, password } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

   await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i), { timeout: 5000 })

  expect(screen.getByText(username)).toBeInTheDocument()
})

test('omitting the password results in an error', async () => {
  render(<Login />)
  const { username } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  // don't type in the password
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i), { timeout: 5000 })

  expect(screen.getByRole('alert')).toHaveTextContent('password required')
})
