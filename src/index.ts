import express, { type Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { errorHandler } from '@/middlewares/error-handler'
import { httpLogger } from '@/middlewares/http-logger'
import { responseSerializer } from '@/middlewares/response-serializer'
import appRouter from '@/routes/index'

process.loadEnvFile()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-db'

const app = express()

app.use(express.json())
app.use(cors())

app.use(httpLogger)
app.use(responseSerializer)

// main router
app.use('/api/v1', appRouter)

app.get('/api/v1/health', (_, res: Response) => {
  res.send({ message: 'Hello World' })
})

app.use(errorHandler)

const init = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    app.listen(3000, () => {
      console.log('Server is running on port 3000')
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

init()
