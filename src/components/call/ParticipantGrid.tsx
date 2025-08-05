"use client"

import React from 'react'
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Plus, Monitor, Mic, MicOff, Video, VideoOff } from 'lucide-react'

interface Participant {
  id: string
  name: string
  avatar?: string
  isLocal?: boolean
  isCameraOn: boolean
  isMicOn: boolean
  isSpeaking: boolean
}

interface ParticipantGridProps {
  participants: Participant[]
  isScreenSharing: boolean
  screenSharerName: string
}

export default function ParticipantGrid({ participants, isScreenSharing, screenSharerName }: ParticipantGridProps) {
  const getVisibleParticipants = () => {
    const maxVisible = 6
    if (participants.length <= maxVisible) {
      return participants
    }
    return participants.slice(0, maxVisible - 1)
  }
  
  const getGridClasses = (count: number) => {
    if (count === 1) return "grid-cols-1 grid-rows-1"
    if (count === 2) return "grid-cols-2 grid-rows-1"
    if (count <= 4) return "grid-cols-2 grid-rows-2"
    if (count <= 6) return "grid-cols-3 grid-rows-2"
    return "grid-cols-3 grid-rows-2"
  }

  const visibleParticipants = getVisibleParticipants()
  const gridClasses = getGridClasses(visibleParticipants.length)
  const remainingCount = participants.length - visibleParticipants.length

  if (isScreenSharing) {
    // Show only first 3 participants, rest in +more box
    const visibleParticipantsInShare = participants.slice(0, 3)
    const remainingInShare = participants.length - 3

    return (
      <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-500">
        {/* Screen Share Area */}
        <div className="flex-1 bg-card rounded-lg flex items-center justify-center border-2 border-primary animate-in slide-in-from-top duration-700">
          <div className="text-center">
            <Monitor className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-xl font-semibold text-foreground">{screenSharerName} is sharing their screen</p>
            <p className="text-muted-foreground">Screen content would appear here</p>
          </div>
        </div>
        
        {/* Participant Strip - Only 3 participants + more box */}
        <div className="h-32 animate-in slide-in-from-bottom duration-500">
          <div className="grid gap-2 h-full grid-cols-4">
            {visibleParticipantsInShare.map(participant => (
              <ParticipantTile key={participant.id} participant={participant} isCompact />
            ))}
            {remainingInShare > 0 && (
              <div className="relative bg-card rounded-lg overflow-hidden border-2 border-border flex items-center justify-center">
                <div className="text-center">
                  <Plus className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-muted-foreground font-medium text-xs">+{remainingInShare} more</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`grid gap-4 h-full ${gridClasses} animate-in fade-in duration-300`}>
      {visibleParticipants.map(participant => (
        <ParticipantTile key={participant.id} participant={participant} />
      ))}
      
      {/* More participants indicator */}
      {remainingCount > 0 && (
        <div className="bg-card rounded-lg border-2 border-border flex items-center justify-center">
          <div className="text-center">
            <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-foreground font-medium">+{remainingCount} more</p>
          </div>
        </div>
      )}
    </div>
  )
}

interface ParticipantTileProps {
  participant: Participant
  isCompact?: boolean
}

function ParticipantTile({ participant, isCompact = false }: ParticipantTileProps) {
  const avatarSize = isCompact ? "w-8 h-8" : "w-16 h-16"
  const avatarTextSize = isCompact ? "text-xs" : "text-2xl"
  const iconSize = isCompact ? "w-3 h-3" : "w-4 h-4"
  const padding = isCompact ? "p-1" : "p-3"

  return (
    <div 
      className={`relative bg-card rounded-lg overflow-hidden border-2 ${
        participant.isSpeaking ? 'border-primary shadow-lg shadow-primary/30 animate-pulse' : 'border-border'
      } transition-all duration-300 hover:border-primary/50`}
    >
      <div className="w-full h-full flex items-center justify-center">
        {participant.isCameraOn ? (
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <Avatar className={avatarSize}>
              <AvatarFallback className={`bg-primary text-primary-foreground ${avatarTextSize}`}>
                {participant.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Avatar className={avatarSize}>
              <AvatarFallback className={`bg-muted-foreground text-background ${avatarTextSize}`}>
                {participant.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
      
      {/* Participant Info Overlay */}
      <div className={`absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm ${padding}`}>
        <div className="flex items-center justify-between">
          <span className={`text-foreground font-medium truncate ${isCompact ? 'text-xs' : ''}`}>
            {participant.name}
            {participant.isLocal && " (You)"}
          </span>
          <div className="flex space-x-1">
            {!participant.isMicOn && (
              <MicOff className={`${iconSize} text-destructive`} />
            )}
            {!participant.isCameraOn && (
              <VideoOff className={`${iconSize} text-destructive`} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 