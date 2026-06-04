import app from './app'
import connectDB from './db/connection'
import { env } from './config/env'

async function start() {
  await connectDB(env.MONGO_URI)
  app.listen(env.PORT, () => {
    console.log(`Server listening on port ${env.PORT}`)
  })
}

start().catch((err) => {
  console.error('Failed to start server', err)
  process.exit(1)
})
