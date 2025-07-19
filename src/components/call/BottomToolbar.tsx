"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { 
  Video, VideoOff, Mic, MicOff, Monitor, Settings, Phone, MessageSquare, 
  Users, PenTool
} from 'lucide-react'

interface BottomToolbarProps {
  isCameraOn: boolean
  isMicOn: boolean
  isScreenSharing: boolean
  isChatOpen: boolean
  isParticipantsOpen: boolean
  onToggleCamera: () => void
  onToggleMic: () => void
  onToggleScreenShare: () => void
  onToggleSettings: () => void
  onEndCall: () => void
  onToggleChat: () => void
  onToggleParticipants: () => void
  onOpenWhiteboard: () => void
}

export default function BottomToolbar({
  isCameraOn,
  isMicOn,
  isScreenSharing,
  isChatOpen,
  isParticipantsOpen,
  onToggleCamera,
  onToggleMic,
  onToggleScreenShare,
  onToggleSettings,
  onEndCall,
  onToggleChat,
  onToggleParticipants,
  onOpenWhiteboard
}: BottomToolbarProps) {
  return (
    <div className="h-20 bg-card border-t border-border flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <Button
          variant={isCameraOn ? "default" : "secondary"}
          size="lg"
          onClick={onToggleCamera}
          className="rounded-full"
        >
          {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </Button>
        
        <Button
          variant={isMicOn ? "default" : "secondary"}
          size="lg"
          onClick={onToggleMic}
          className="rounded-full"
        >
          {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </Button>
        
        <Button
          variant={isScreenSharing ? "destructive" : "outline"}
          size="lg"
          onClick={onToggleScreenShare}
          className="rounded-full"
        >
          <Monitor className="w-5 h-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full"
          onClick={onToggleSettings}
        >
          <Settings className="w-5 h-5" />
        </Button>
        
        <Button
          variant="destructive"
          size="lg"
          onClick={onEndCall}
          className="rounded-full bg-red-600 hover:bg-red-700"
        >
          <Phone className="w-5 h-5" />
        </Button>
        
        <Button
          variant={isChatOpen ? "default" : "outline"}
          size="lg"
          onClick={onToggleChat}
          className="rounded-full"
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
        
        <Button
          variant={isParticipantsOpen ? "default" : "outline"}
          size="lg"
          onClick={onToggleParticipants}
          className="rounded-full"
        >
          <Users className="w-5 h-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full"
          onClick={onOpenWhiteboard}
        >
          <PenTool className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
} 