import { z } from 'zod'

export const chatMessageDto = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  message: z.string().min(1, 'Message content is required'),
})

export type ChatMessageDto = z.infer<typeof chatMessageDto>

export const getMeetingMessagesDto = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  limit: z.number().min(1).max(100).optional().default(50),
  before: z.string().datetime().optional(),
})

export type GetMeetingMessagesDto = z.infer<typeof getMeetingMessagesDto>