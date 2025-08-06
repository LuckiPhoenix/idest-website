import { z } from 'zod'

export const createConversationDto = z.object({
  isGroup: z.boolean().optional().default(false),
  participantIds: z.array(z.string().min(1)).min(1, 'At least one participant is required'),
})

export type CreateConversationDto = z.infer<typeof createConversationDto>