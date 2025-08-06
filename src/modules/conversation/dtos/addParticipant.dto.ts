import { z } from 'zod'

export const addParticipantDto = z.object({
  userId: z.string().min(1, 'User ID is required'),
})

export type AddParticipantDto = z.infer<typeof addParticipantDto>