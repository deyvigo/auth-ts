import z from 'zod'

export const imageUploadSchema = z.object({
  fieldname: z.literal('image'),
  mimetype: z.enum(['image/jpeg', 'image/png', 'image/webp']),
  size: z.number().max(5 * 1024 * 1024),
  buffer: z.instanceof(Buffer),
})
