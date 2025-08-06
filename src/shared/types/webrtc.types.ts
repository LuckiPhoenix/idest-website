export interface WebRTCOfferData {
  sessionId: string
  targetUserId: string
  offer: RTCSessionDescriptionInit
}

export interface WebRTCAnswerData {
  sessionId: string
  targetUserId: string
  answer: RTCSessionDescriptionInit
}

export interface ICECandidateData {
  sessionId: string
  targetUserId: string
  candidate: RTCIceCandidateInit
}

export interface ConnectedUser {
  userId: string
  socketId: string
  userFullName: string
  userAvatar?: string
  role: string
  sessionId: string
  connectedAt: Date
}

export interface ParticipantInfo {
  userId: string
  userFullName: string
  userAvatar?: string
  role: string
  socketId: string
  isOnline: boolean
}