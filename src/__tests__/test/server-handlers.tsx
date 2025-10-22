import { http, HttpResponse, delay } from 'msw'

export type LoginForm = {
  username: string;
  password: string;
};

const handlers = [
  http.post('https://auth-provider.example.com/api/login', async ({ request }) => {
    await delay(1000) // Simulate network delay

    const data = await request.json() as LoginForm
    const { username, password } = data
    if (!password) {
      return HttpResponse.json(
        { message: 'password required' },
        { status: 400 },
      )
    }
    if (!username) {
      return HttpResponse.json(
        { message: 'username required' },
        { status: 400 }
      )
    }
    return HttpResponse.json({ username: username })
  })
]

export { handlers }
