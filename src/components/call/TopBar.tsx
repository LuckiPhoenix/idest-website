"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Clock } from 'lucide-react'

interface TopBarProps {
  meetingTitle: string
  currentTime: Date
  isTestPanelOpen: boolean
  onToggleTestPanel: () => void
}

export default function TopBar({ meetingTitle, currentTime, isTestPanelOpen, onToggleTestPanel }: TopBarProps) {
  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{meetingTitle}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        {!isTestPanelOpen && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onToggleTestPanel}
            className="text-muted-foreground hover:text-foreground"
          >
            Test Panel
          </Button>
        )}
      </div>
    </div>
  )
} 