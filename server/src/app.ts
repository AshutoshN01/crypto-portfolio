import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'
import { env } from './config/env'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }))

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 80
  })
)

app.use('/api/v1', routes)

app.use(errorHandler)

export default app
