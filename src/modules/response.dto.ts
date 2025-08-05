import { z } from 'zod'

export const responseDto = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
})

export type ResponseDto = z.infer<typeof responseDto>