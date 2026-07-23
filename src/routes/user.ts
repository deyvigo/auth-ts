import { Router } from 'express'
import multer from 'multer'

import { authenticate } from '@/middlewares/authenticate'
import { getMyProfile, uploadProfileImage } from '@/services/user'
import { asyncHandler } from '@/utils/async-handler'
import { validate } from '@/middlewares/validate'
import { imageUploadSchema } from '@/schemas/image'

const router: Router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get(
  '/me',
  authenticate,
  asyncHandler(async (req, res) => {
    const user = req.user
    const userData = getMyProfile(user!)
    res.status(201).send({ ...userData })
  }),
)

router.post(
  '/profile',
  authenticate,
  upload.single('image'),
  validate(imageUploadSchema, 'file'),
  asyncHandler(async (req, res) => {
    const url = await uploadProfileImage(req.user!, req.file!)
    res.status(201).send({ profile: url })
  }),
)

export default router
