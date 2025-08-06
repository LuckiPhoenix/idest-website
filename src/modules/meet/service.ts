import { io, Socket } from 'socket.io-client'
import { http } from '@/modules/http'
import { ResponseDto } from '@/modules/response.dto'
import { MeetGatewayEvents, MessageHistoryResponse } from './types'
import { GetMeetingMessagesDto } from './dtos/chatMessage.dto'

/**
 * WebSocket Connection Management
 */

let socket: Socket<MeetGatewayEvents> | null = null

export function createMeetSocket(): Socket<MeetGatewayEvents> {
  if (socket?.connected) {
    return socket
  }

  const meetServerUrl = process.env.NEXT_PUBLIC_MEET_URL || 'ws://localhost:3002/meet'
  
  socket = io(meetServerUrl, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    transports: ['websocket'],
  })

  return socket
}

export function getMeetSocket(): Socket<MeetGatewayEvents> | null {
  return socket
}

export function disconnectMeetSocket(): void {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

/**
 * Room Management
 */

export function joinRoom(sessionId: string, token: string): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.emit('join-room', { sessionId, token })
  }
}

export function leaveRoom(sessionId: string): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.emit('leave-room', sessionId)
  }
}

/**
 * Chat Functions
 */

export function sendChatMessage(sessionId: string, message: string): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.emit('chat-message', { sessionId, message })
  }
}

export function getSessionParticipants(sessionId: string): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.emit('get-session-participants', sessionId)
  }
}

export function getMessageHistory(sessionId: string, limit?: number, before?: string): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.emit('get-message-history', { sessionId, limit, before })
  }
}

/**
 * WebRTC Signaling
 */

export function sendWebRTCOffer(sessionId: string, targetUserId: string, offer: RTCSessionDescriptionInit): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.emit('webrtc-offer', { sessionId, targetUserId, offer })
  }
}

export function sendWebRTCAnswer(sessionId: string, targetUserId: string, answer: RTCSessionDescriptionInit): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.emit('webrtc-answer', { sessionId, targetUserId, answer })
  }
}

export function sendICECandidate(sessionId: string, targetUserId: string, candidate: RTCIceCandidateInit): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.emit('ice-candidate', { sessionId, targetUserId, candidate })
  }
}

/**
 * Session Validation (REST API)
 */

export async function validateSession(sessionId: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/meet/validate-session/${sessionId}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

export async function validateSessionAccess(sessionId: string): Promise<ResponseDto> {
  try {
    const response = await http.get(`/meet/validate-access/${sessionId}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Meeting Messages (REST API for history)
 */

export async function getMeetingMessages(data: GetMeetingMessagesDto): Promise<ResponseDto> {
  try {
    const params = new URLSearchParams()
    params.append('limit', data.limit?.toString() || '50')
    if (data.before) {
      params.append('before', data.before)
    }

    const response = await http.get(`/meet/messages/${data.sessionId}?${params.toString()}`)
    return response.data
  } catch (error: unknown) {
    throw error
  }
}

/**
 * Event Listeners Helpers
 */

export function onJoinRoomSuccess(callback: (data: any) => void): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.on('join-room-success', callback)
  }
}

export function onJoinRoomError(callback: (data: any) => void): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.on('join-room-error', callback)
  }
}

export function onUserJoined(callback: (data: any) => void): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.on('user-joined', callback)
  }
}

export function onUserLeft(callback: (data: any) => void): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.on('user-left', callback)
  }
}

export function onChatMessage(callback: (data: any) => void): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.on('chat-message', callback)
  }
}

export function onSessionParticipants(callback: (data: any) => void): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.on('session-participants', callback)
  }
}

export function onMessageHistory(callback: (data: any) => void): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.on('message-history', callback)
  }
}

export function onWebRTCOffer(callback: (data: any) => void): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.on('webrtc-offer', callback)
  }
}

export function onWebRTCAnswer(callback: (data: any) => void): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.on('webrtc-answer', callback)
  }
}

export function onICECandidate(callback: (data: any) => void): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.on('ice-candidate', callback)
  }
}

/**
 * Remove Event Listeners
 */

export function removeAllListeners(): void {
  const socket = getMeetSocket()
  if (socket) {
    socket.removeAllListeners()
  }
}