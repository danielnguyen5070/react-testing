import { http, HttpResponse, delay } from 'msw'

export type LoginData = {
  username: string;
  password: string;
};

const handlers = [
  http.post('https://auth-provider.example.com/api/login', async ({ request }) => {
    const body = await request.json() as LoginData;

    await delay(1000); // Add a 1-second delay before proceeding

    if (!body.username)
      return HttpResponse.json({ message: 'username required' }, { status: 400 });
    if (!body.password)
      return HttpResponse.json({ message: 'password required' }, { status: 400 });
    return HttpResponse.json({ username: body.username });
  }),
];

export { handlers }
