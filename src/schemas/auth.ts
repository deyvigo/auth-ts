import z from 'zod'

export const registerRequestSchema = z
  .object({
    username: z.string().min(3).max(20).trim(),
    password: z.string().min(8).max(20).trim(),
    name: z.string().min(3).max(20).trim(),
    last_name: z.string().min(3).max(20).trim(),
    profile: z.url(),
  })
  .transform(({ last_name, ...data }) => ({
    ...data,
    lastName: last_name,
  }))

export const loginRequestSchema = z.object({
  username: z.string().min(3).max(20).trim(),
  password: z.string().min(8).max(20).trim(),
})
