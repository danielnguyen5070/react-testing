
import { render, screen } from '@testing-library/react'
import Login from '../../components/login'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { build, fake } from '@jackfranklin/test-data-bot'

type LoginForm = {
    username: string
    password: string
}

const buildLoginForm = build<LoginForm>('LoginForm', {
    fields: {
        username: fake(f => f.internet.userName()),
        password: fake(f => f.internet.password())
    }
})

test('submitting the form calls onSubmit with username and password', async () => {
    const handleSubmit = vi.fn()
    render(<Login onSubmit={handleSubmit} />)

    const username = screen.getByRole('textbox', {
        name: /username/i
    })
    const password = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', {
        name: /submit/i
    })

    const { username: user, password: pass } = buildLoginForm()
    await userEvent.type(username, user)
    await userEvent.type(password, pass)
    await userEvent.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledWith({
        username: user,
        password: pass
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
})