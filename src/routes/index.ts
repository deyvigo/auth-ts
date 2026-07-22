import { Router } from 'express'

import authRouter from '@/routes/auth'
import userRouter from '@/routes/user'

const appRouter: Router = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/user', userRouter)

export default appRouter
