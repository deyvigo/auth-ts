import { Router, type Request, type Response } from 'express'

import { asyncHandler } from '@/utils/async-handler'
import { validate } from '@/middlewares/validate'
import { loginRequestSchema, registerRequestSchema } from '@/schemas/auth'
import type { IUserRegisterRequest } from '@/types/auth'
import { loginUser, registerUser } from '@/services/auth'

const router: Router = Router()

router.post(
  '/login',
  validate(loginRequestSchema, 'body'),
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body
    const token = await loginUser({ username, password })
    res.send({ token })
  }),
)

router.post(
  '/register',
  validate(registerRequestSchema, 'body'),
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password, name, lastName } = req.body as IUserRegisterRequest
    const user = await registerUser({ username, password, name, lastName })
    res.status(201).send({ ...user })
  }),
)

export default router
