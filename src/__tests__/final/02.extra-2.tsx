import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import { vi } from 'vitest'
import { build, fake } from '@jackfranklin/test-data-bot';
import type { LoginData } from '../test/server-handlers';

const buildLoginForm = build<LoginData>('LoginForm', {
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = vi.fn()
  render(<Login onSubmit={handleSubmit} />)
  const { username, password } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
