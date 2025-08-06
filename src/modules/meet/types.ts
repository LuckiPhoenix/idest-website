import { MessageResponse } from '@/shared/types/message.types'
import { ParticipantInfo } from '@/shared/types/webrtc.types'

export interface JoinRoomResponse {
  sessionId: string
  userId: string
  message: string
}

export interface JoinRoomError {
  message: string
  details?: string
}

export interface UserJoinedEvent {
  sessionId: string
  userId: string
  userFullName: string
  userAvatar?: string
  role: string
  socketId: string
}

export interface UserLeftEvent {
  sessionId: string
  userId: string
  socketId: string
}

export interface ChatMessageEvent {
  sessionId: string
  message: string
  userId: string
  userFullName: string
  userAvatar?: string
  timestamp: Date
}

export interface SessionParticipantsEvent {
  sessionId: string
  participants: ParticipantInfo[]
}

export interface MessageHistoryResponse {
  messages: MessageResponse[]
  hasMore: boolean
  total: number
}

export interface WebRTCOfferEvent {
  sessionId: string
  fromUserId: string
  fromUserName: string
  offer: RTCSessionDescriptionInit
}

export interface WebRTCAnswerEvent {
  sessionId: string
  fromUserId: string
  fromUserName: string
  answer: RTCSessionDescriptionInit
}

export interface ICECandidateEvent {
  sessionId: string
  fromUserId: string
  candidate: RTCIceCandidateInit
}

export interface MeetGatewayEvents {
  // Client to Server Events
  'join-room': (data: { sessionId: string; token: string }) => void
  'leave-room': (sessionId: string) => void

  'get-session-participants': (sessionId: string) => void
  'get-message-history': (data: { sessionId: string; limit?: number; before?: string }) => void

  // Server to Client Events
  'join-room-success': (data: JoinRoomResponse) => void
  'join-room-error': (data: JoinRoomError) => void
  'user-joined': (data: UserJoinedEvent) => void
  'user-left': (data: UserLeftEvent) => void
  'chat-message-error': (data: { message: string }) => void
  'session-participants': (data: SessionParticipantsEvent) => void
  'message-history': (data: MessageHistoryResponse) => void

  // Both ways
  'chat-message': (data: { sessionId: string; message: string }) => void
  'webrtc-offer': (data: { sessionId: string; targetUserId: string; offer: RTCSessionDescriptionInit }) => void
  'webrtc-answer': (data: { sessionId: string; targetUserId: string; answer: RTCSessionDescriptionInit }) => void
  'ice-candidate': (data: { sessionId: string; targetUserId: string; candidate: RTCIceCandidateInit }) => void
}