import { authenticate } from '@/middlewares/authenticate'
import { getMyProfile } from '@/services/user'
import { asyncHandler } from '@/utils/async-handler'
import { Router } from 'express'

const router: Router = Router()

router.get(
  '/me',
  authenticate,
  asyncHandler(async (req, res) => {
    const user = req.user
    const userData = getMyProfile(user!)
    res.send({ user: userData })
  }),
)

export default router
