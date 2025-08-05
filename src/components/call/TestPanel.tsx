"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Switch } from "@/shared/ui/switch"
import { Separator } from "@/shared/ui/separator"
import { X, Mic, MicOff, Camera, CameraOff, Volume2 } from 'lucide-react'

interface Participant {
  id: string
  name: string
  avatar?: string
  isLocal?: boolean
  isCameraOn: boolean
  isMicOn: boolean
  isSpeaking: boolean
}

interface TestPanelProps {
  isOpen: boolean
  participantCount: number
  testScreenShare: boolean
  participants: Participant[]
  onClose: () => void
  onParticipantCountChange: (count: number) => void
  onTestScreenShareChange: (enabled: boolean) => void
  onToggleParticipantMic: (participantId: string) => void
  onToggleParticipantCamera: (participantId: string) => void
  onToggleParticipantSpeaking: (participantId: string) => void
}

export default function TestPanel({
  isOpen,
  participantCount,
  testScreenShare,
  participants,
  onClose,
  onParticipantCountChange,
  onTestScreenShareChange,
  onToggleParticipantMic,
  onToggleParticipantCamera,
  onToggleParticipantSpeaking
}: TestPanelProps) {
  if (!isOpen) return null

  return (
    <Card className="fixed top-4 left-4 z-50 w-80 bg-card border-border animate-in slide-in-from-left duration-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground text-sm">UI Test Panel</CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-foreground hover:bg-accent"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">Participants: {participantCount}</label>
          <input 
            type="range" 
            min="1" 
            max="8" 
            value={participantCount}
            onChange={(e) => onParticipantCountChange(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-xs text-muted-foreground">Test Screen Share</label>
          <Switch 
            checked={testScreenShare} 
            onCheckedChange={onTestScreenShareChange}
          />
        </div>
        <Separator className="bg-border" />
        <div className="space-y-2">
          <p className="text-xs text-foreground font-medium">Control Participants:</p>
          {participants.slice(0, 4).map(participant => (
            <div key={participant.id} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground truncate flex-1">{participant.name}</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={participant.isMicOn ? "default" : "secondary"}
                  className="h-6 w-6 p-0"
                  onClick={() => onToggleParticipantMic(participant.id)}
                >
                  {participant.isMicOn ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
                </Button>
                <Button
                  size="sm"
                  variant={participant.isCameraOn ? "default" : "secondary"}
                  className="h-6 w-6 p-0"
                  onClick={() => onToggleParticipantCamera(participant.id)}
                >
                  {participant.isCameraOn ? <Camera className="w-3 h-3" /> : <CameraOff className="w-3 h-3" />}
                </Button>
                <Button
                  size="sm"
                  variant={participant.isSpeaking ? "destructive" : "outline"}
                  className="h-6 w-6 p-0"
                  onClick={() => onToggleParticipantSpeaking(participant.id)}
                >
                  <Volume2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 