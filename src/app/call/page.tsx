"use client"

import React, { useState, useEffect } from 'react'
import TopBar from '@/components/call/TopBar'
import ParticipantGrid from '@/components/call/ParticipantGrid'
import BottomToolbar from '@/components/call/BottomToolbar'
import ChatSidebar from '@/components/call/ChatSidebar'
import ParticipantsSidebar from '@/components/call/ParticipantsSidebar'
import Whiteboard from '@/components/call/Whiteboard'
import TestPanel from '@/components/call/TestPanel'
import SettingsModal from '@/components/call/SettingsModal'

// Types
interface Participant {
  id: string
  name: string
  avatar?: string
  isLocal?: boolean
  isCameraOn: boolean
  isMicOn: boolean
  isSpeaking: boolean
}

interface ChatMessage {
  id: string
  participantName: string
  message: string
  time: string
}

export default function CallPage() {
  // Main state
  const [currentTime, setCurrentTime] = useState(new Date())
  const [meetingTitle] = useState("Daily Team Standup")
  
  // Initialize dark mode on page load
  useEffect(() => {
    // Check if user has a preference, otherwise default to dark mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])
  
  // Control states
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [screenSharerName, setScreenSharerName] = useState("")
  
  // UI states - both sidebars on left, only one can be open at a time
  const [activeSidebar, setActiveSidebar] = useState<'none' | 'chat' | 'participants'>('none')
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isTestPanelOpen, setIsTestPanelOpen] = useState(true)
  
  // Test panel states
  const [participantCount, setParticipantCount] = useState(3)
  const [testScreenShare, setTestScreenShare] = useState(false)
  
  // Participants data
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "You", isLocal: true, isCameraOn: true, isMicOn: true, isSpeaking: false },
    { id: "2", name: "Alice Johnson", isCameraOn: true, isMicOn: true, isSpeaking: false },
    { id: "3", name: "Bob Smith", isCameraOn: false, isMicOn: true, isSpeaking: false },
    { id: "4", name: "Carol Wilson", isCameraOn: true, isMicOn: false, isSpeaking: false },
    { id: "5", name: "David Brown", isCameraOn: true, isMicOn: true, isSpeaking: false },
    { id: "6", name: "Emma Davis", isCameraOn: true, isMicOn: true, isSpeaking: false },
    { id: "7", name: "Frank Miller", isCameraOn: false, isMicOn: true, isSpeaking: false },
    { id: "8", name: "Grace Taylor", isCameraOn: true, isMicOn: true, isSpeaking: false },
  ])
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", participantName: "Alice Johnson", message: "Hey everyone! Ready for the standup?", time: "10:30" },
    { id: "2", participantName: "Bob Smith", message: "Yes, let's get started!", time: "10:31" },
    { id: "3", participantName: "Carol Wilson", message: "Can everyone see my screen?", time: "10:32" },
    { id: "4", participantName: "You", message: "Looks good!", time: "10:33" },
  ])
  const [newMessage, setNewMessage] = useState("")
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])
  
  // Update participants based on test panel
  useEffect(() => {
    const baseParticipants = [
      { id: "1", name: "You", isLocal: true, isCameraOn, isMicOn, isSpeaking: false },
      { id: "2", name: "Alice Johnson", isCameraOn: true, isMicOn: true, isSpeaking: false },
      { id: "3", name: "Bob Smith", isCameraOn: false, isMicOn: true, isSpeaking: false },
      { id: "4", name: "Carol Wilson", isCameraOn: true, isMicOn: false, isSpeaking: false },
      { id: "5", name: "David Brown", isCameraOn: true, isMicOn: true, isSpeaking: false },
      { id: "6", name: "Emma Davis", isCameraOn: true, isMicOn: true, isSpeaking: false },
      { id: "7", name: "Frank Miller", isCameraOn: false, isMicOn: true, isSpeaking: false },
      { id: "8", name: "Grace Taylor", isCameraOn: true, isMicOn: true, isSpeaking: false },
    ]
    
    setParticipants(baseParticipants.slice(0, participantCount))
    
    if (testScreenShare && participantCount > 1) {
      setIsScreenSharing(true)
      setScreenSharerName(baseParticipants[1].name)
    } else {
      setIsScreenSharing(false)
      setScreenSharerName("")
    }
  }, [participantCount, testScreenShare, isCameraOn, isMicOn])
  
  // Chat functions
  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        participantName: "You",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setChatMessages([...chatMessages, message])
      setNewMessage("")
    }
  }
  
  // Sidebar control functions
  const toggleChat = () => {
    setActiveSidebar(current => current === 'chat' ? 'none' : 'chat')
  }
  
  const toggleParticipants = () => {
    setActiveSidebar(current => current === 'participants' ? 'none' : 'participants')
  }
  
  const closeSidebar = () => {
    setActiveSidebar('none')
  }
  
  // Test panel functions
  const toggleParticipantMic = (participantId: string) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId ? { ...p, isMicOn: !p.isMicOn } : p
    ))
  }
  
  const toggleParticipantCamera = (participantId: string) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId ? { ...p, isCameraOn: !p.isCameraOn } : p
    ))
  }
  
  const toggleParticipantSpeaking = (participantId: string) => {
    setParticipants(prev => prev.map(p => 
      p.id === participantId ? { ...p, isSpeaking: !p.isSpeaking } : p
    ))
  }

  return (
    <div className="h-screen bg-background text-foreground flex flex-col relative">
      {/* Test Panel - Floating */}
      <TestPanel
        isOpen={isTestPanelOpen}
        participantCount={participantCount}
        testScreenShare={testScreenShare}
        participants={participants}
        onClose={() => setIsTestPanelOpen(false)}
        onParticipantCountChange={setParticipantCount}
        onTestScreenShareChange={setTestScreenShare}
        onToggleParticipantMic={toggleParticipantMic}
        onToggleParticipantCamera={toggleParticipantCamera}
        onToggleParticipantSpeaking={toggleParticipantSpeaking}
      />
      
      {/* Chat Sidebar - Left side, overlays content */}
      <ChatSidebar
        isOpen={activeSidebar === 'chat'}
        messages={chatMessages}
        newMessage={newMessage}
        onNewMessageChange={setNewMessage}
        onSendMessage={sendMessage}
        onClose={closeSidebar}
      />
      
      {/* Participants Sidebar - Left side, overlays content */}
      <ParticipantsSidebar
        isOpen={activeSidebar === 'participants'}
        participants={participants}
        onClose={closeSidebar}
      />
      
      {/* Main Content - Full screen, doesn't move when sidebars open */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar
          meetingTitle={meetingTitle}
          currentTime={currentTime}
          isTestPanelOpen={isTestPanelOpen}
          onToggleTestPanel={() => setIsTestPanelOpen(true)}
        />
        
        {/* Video Area */}
        <div className="flex-1 p-6 overflow-hidden">
          <ParticipantGrid
            participants={participants}
            isScreenSharing={isScreenSharing}
            screenSharerName={screenSharerName}
          />
        </div>
        
        {/* Bottom Toolbar */}
        <BottomToolbar
          isCameraOn={isCameraOn}
          isMicOn={isMicOn}
          isScreenSharing={isScreenSharing}
          isChatOpen={activeSidebar === 'chat'}
          isParticipantsOpen={activeSidebar === 'participants'}
          onToggleCamera={() => setIsCameraOn(!isCameraOn)}
          onToggleMic={() => setIsMicOn(!isMicOn)}
          onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
          onToggleSettings={() => setIsSettingsOpen(true)}
          onEndCall={() => window.history.back()}
          onToggleChat={toggleChat}
          onToggleParticipants={toggleParticipants}
          onOpenWhiteboard={() => setIsWhiteboardOpen(true)}
        />
      </div>
      
      {/* Fullscreen Whiteboard with slide-up animation */}
      <Whiteboard
        isOpen={isWhiteboardOpen}
        onClose={() => setIsWhiteboardOpen(false)}
      />
      
      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        onClose={() => setIsSettingsOpen(false)}
        onToggleCamera={() => setIsCameraOn(!isCameraOn)}
        onToggleMic={() => setIsMicOn(!isMicOn)}
      />
    </div>
  )
}