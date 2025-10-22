
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Login from '../../components/login-submission'
import userEvent from '@testing-library/user-event'
import { build, fake } from '@jackfranklin/test-data-bot'
import { setupServer } from 'msw/node'
import { handlers } from '../test/server-handlers'
import { http, HttpResponse, delay } from 'msw'

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

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('submitting the form calls onSubmit with username and password', async () => {
    render(<Login />)

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

    await waitForElementToBeRemoved(screen.getByLabelText(/loading/i), { timeout: 5000 })

    expect(screen.getByText(user)).toBeInTheDocument()
})

test('omitting the password results in an error', async () => {
    render(<Login />)

    const username = screen.getByRole('textbox', {
        name: /username/i
    })
    const submitButton = screen.getByRole('button', {
        name: /submit/i
    })

    const { username: user } = buildLoginForm()
    await userEvent.type(username, user)
    await userEvent.click(submitButton)

    await waitForElementToBeRemoved(screen.getByLabelText(/loading/i), { timeout: 5000 })

    expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(`"password required"`)
})

test('unknown server error displays generic error message', async () => {
    const errorMessage = "Oh no, something bad happened"
    server.use(
        http.post('https://auth-provider.example.com/api/login', async () => {
            await delay(1000) // Simulate network delay

            return HttpResponse.json({
                message: errorMessage
            }, { status: 500 })
        })
    )

    render(<Login />)

    const submitButton = screen.getByRole('button', {
        name: /submit/i
    })
    await userEvent.click(submitButton)
    await waitForElementToBeRemoved(screen.getByLabelText(/loading/i), { timeout: 5000 })

    screen.debug()
    expect(screen.getByRole('alert').textContent).toBe(errorMessage)
})

