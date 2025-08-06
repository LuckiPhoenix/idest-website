import { z } from 'zod'

export const getMessagesDto = z.object({
  limit: z.number().min(1).max(100).optional().default(50),
  before: z.string().datetime().optional(),
})

export type GetMessagesDto = z.infer<typeof getMessagesDto>