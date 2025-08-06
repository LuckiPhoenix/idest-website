import { z } from 'zod'

export const webRTCOfferDto = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  targetUserId: z.string().min(1, 'Target user ID is required'),
  offer: z.any(), // RTCSessionDescriptionInit
})

export type WebRTCOfferDto = z.infer<typeof webRTCOfferDto>

export const webRTCAnswerDto = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  targetUserId: z.string().min(1, 'Target user ID is required'),
  answer: z.any(), // RTCSessionDescriptionInit
})

export type WebRTCAnswerDto = z.infer<typeof webRTCAnswerDto>

export const iceCandidateDto = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  targetUserId: z.string().min(1, 'Target user ID is required'),
  candidate: z.any(), // RTCIceCandidateInit
})

export type ICECandidateDto = z.infer<typeof iceCandidateDto>