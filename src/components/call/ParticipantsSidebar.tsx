"use client"

import React from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, Volume2, X } from 'lucide-react'

interface Participant {
  id: string
  name: string
  avatar?: string
  isLocal?: boolean
  isCameraOn: boolean
  isMicOn: boolean
  isSpeaking: boolean
}

interface ParticipantsSidebarProps {
  isOpen: boolean
  participants: Participant[]
  onClose: () => void
}

export default function ParticipantsSidebar({ isOpen, participants, onClose }: ParticipantsSidebarProps) {
  return (
    <div className={`fixed right-0 top-0 h-full w-80 bg-sidebar border-l border-sidebar-border flex flex-col z-40 transform transition-all duration-500 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Header */}
      <div className="h-16 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4">
        <h2 className="text-sidebar-foreground font-semibold">Participants ({participants.length})</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClose}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Participants List */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {participants.map(participant => (
          <div key={participant.id} className="flex items-center space-x-3 p-3 rounded-lg bg-sidebar-accent">
            <Avatar>
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                {participant.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sidebar-foreground font-medium">{participant.name}</p>
              <div className="flex space-x-2 mt-1">
                {participant.isMicOn ? (
                  <Mic className="w-4 h-4 text-green-500" />
                ) : (
                  <MicOff className="w-4 h-4 text-destructive" />
                )}
                {participant.isCameraOn ? (
                  <Video className="w-4 h-4 text-green-500" />
                ) : (
                  <VideoOff className="w-4 h-4 text-destructive" />
                )}
                {participant.isSpeaking && (
                  <Volume2 className="w-4 h-4 text-sidebar-primary animate-pulse" />
                )}
              </div>
            </div>
            {participant.isLocal && (
              <Badge variant="secondary" className="text-xs">You</Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 