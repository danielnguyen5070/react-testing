import { setupWorker } from 'msw/browser'
import { handlers } from './server-handlers'

const server = setupWorker(...handlers)

server.start()