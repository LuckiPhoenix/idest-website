import { z } from 'zod'

export const joinRoomDto = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  token: z.string().min(1, 'JWT token is required'),
})

export type JoinRoomDto = z.infer<typeof joinRoomDto>