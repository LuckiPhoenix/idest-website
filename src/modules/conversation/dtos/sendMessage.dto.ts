import { z } from 'zod'

export const sendMessageDto = z.object({
  content: z.string().min(1, 'Message content is required'),
})

export type SendMessageDto = z.infer<typeof sendMessageDto>