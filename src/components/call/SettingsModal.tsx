"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Switch } from "@/shared/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Separator } from "@/shared/ui/separator"
import { Button } from "@/shared/ui/button"
import { Monitor, Sun, Moon, Camera, Mic, Volume2, RefreshCw } from 'lucide-react'

interface Device {
  deviceId: string
  label: string
}

interface SettingsModalProps {
  isOpen: boolean
  isCameraOn: boolean
  isMicOn: boolean
  onClose: () => void
  onToggleCamera: () => void
  onToggleMic: () => void
}

export default function SettingsModal({
  isOpen,
  isCameraOn,
  isMicOn,
  onClose,
  onToggleCamera,
  onToggleMic
}: SettingsModalProps) {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  // Device states
  const [cameras, setCameras] = useState<Device[]>([])
  const [microphones, setMicrophones] = useState<Device[]>([])
  const [speakers, setSpeakers] = useState<Device[]>([])
  
  // Selected devices
  const [selectedCamera, setSelectedCamera] = useState<string>("")
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>("")
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("")
  
  // Additional settings
  const [showParticipantNames, setShowParticipantNames] = useState(true)
  const [autoMuteOnJoin, setAutoMuteOnJoin] = useState(false)
  const [isRefreshingDevices, setIsRefreshingDevices] = useState(false)
  const [isTestingCamera, setIsTestingCamera] = useState(false)
  const [isTestingMic, setIsTestingMic] = useState(false)
  const [isTestingSpeaker, setIsTestingSpeaker] = useState(false)
  const [hasPermissions, setHasPermissions] = useState(false)

  // Real device detection
  useEffect(() => {
    const detectDevices = async () => {
      try {
        // Check if mediaDevices is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          console.warn('Media devices not supported')
          return
        }

        // Check current permissions
        const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName })
        const microphonePermission = await navigator.permissions.query({ name: 'microphone' as PermissionName })
        
        setHasPermissions(
          cameraPermission.state === 'granted' || microphonePermission.state === 'granted'
        )

        // Enumerate devices
        const devices = await navigator.mediaDevices.enumerateDevices()
        
        const videoInputs = devices
          .filter(device => device.kind === 'videoinput' && device.deviceId && device.deviceId !== '')
          .map(device => ({
            deviceId: device.deviceId,
            label: device.label || `Camera ${device.deviceId.slice(0, 8)}`
          }))

        const audioInputs = devices
          .filter(device => device.kind === 'audioinput' && device.deviceId && device.deviceId !== '')
          .map(device => ({
            deviceId: device.deviceId,
            label: device.label || `Microphone ${device.deviceId.slice(0, 8)}`
          }))

        const audioOutputs = devices
          .filter(device => device.kind === 'audiooutput' && device.deviceId && device.deviceId !== '')
          .map(device => ({
            deviceId: device.deviceId,
            label: device.label || `Speaker ${device.deviceId.slice(0, 8)}`
          }))

        setCameras(videoInputs)
        setMicrophones(audioInputs)
        setSpeakers(audioOutputs)

        // Set default selections to first available device
        if (videoInputs.length > 0 && !selectedCamera) {
          setSelectedCamera(videoInputs[0].deviceId)
        } else if (videoInputs.length === 0) {
          setSelectedCamera("")
        }
        
        if (audioInputs.length > 0 && !selectedMicrophone) {
          setSelectedMicrophone(audioInputs[0].deviceId)
        } else if (audioInputs.length === 0) {
          setSelectedMicrophone("")
        }
        
        if (audioOutputs.length > 0 && !selectedSpeaker) {
          setSelectedSpeaker(audioOutputs[0].deviceId)
        } else if (audioOutputs.length === 0) {
          setSelectedSpeaker("")
        }

      } catch (error) {
        console.error('Error detecting devices:', error)
        setHasPermissions(false)
      }
    }

    if (isOpen) {
      detectDevices()
    }
  }, [isOpen])

  // Handle dark mode toggle
  const handleDarkModeToggle = (enabled: boolean) => {
    setIsDarkMode(enabled)
    if (enabled) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Handle device refresh
  const handleRefreshDevices = async () => {
    setIsRefreshingDevices(true)
    
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      
      const videoInputs = devices
        .filter(device => device.kind === 'videoinput' && device.deviceId && device.deviceId !== '')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${device.deviceId.slice(0, 8)}`
        }))

      const audioInputs = devices
        .filter(device => device.kind === 'audioinput' && device.deviceId && device.deviceId !== '')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${device.deviceId.slice(0, 8)}`
        }))

      const audioOutputs = devices
        .filter(device => device.kind === 'audiooutput' && device.deviceId && device.deviceId !== '')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Speaker ${device.deviceId.slice(0, 8)}`
        }))

      setCameras(videoInputs)
      setMicrophones(audioInputs)
      setSpeakers(audioOutputs)
    } catch (error) {
      console.error('Error refreshing devices:', error)
    } finally {
      setIsRefreshingDevices(false)
    }
  }

  // Test camera
  const handleTestCamera = async () => {
    setIsTestingCamera(true)
    try {
      const constraints = {
        video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
        audio: false
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      
      // Stop the stream after successful test
      stream.getTracks().forEach(track => track.stop())
      
      // Show success briefly
      setTimeout(() => {
        setIsTestingCamera(false)
      }, 1000)
    } catch (error) {
      console.error('Camera test failed:', error)
      setIsTestingCamera(false)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert('Camera test failed: ' + errorMessage)
    }
  }

  // Test microphone
  const handleTestMicrophone = async () => {
    setIsTestingMic(true)
    try {
      const constraints = {
        audio: selectedMicrophone ? { deviceId: { exact: selectedMicrophone } } : true,
        video: false
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      
      // Create audio context to detect audio levels
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)
      microphone.connect(analyser)
      
      analyser.fftSize = 256
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      
      // Check for audio input for 2 seconds
      let hasAudio = false
      const checkAudio = () => {
        analyser.getByteFrequencyData(dataArray)
        const volume = dataArray.reduce((a, b) => a + b) / bufferLength
        if (volume > 10) hasAudio = true
      }
      
      const interval = setInterval(checkAudio, 100)
      
      setTimeout(() => {
        clearInterval(interval)
        stream.getTracks().forEach(track => track.stop())
        audioContext.close()
        setIsTestingMic(false)
        
        if (!hasAudio) {
          alert('No audio detected. Please check your microphone and try speaking.')
        }
      }, 2000)
    } catch (error) {
      console.error('Microphone test failed:', error)
      setIsTestingMic(false)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert('Microphone test failed: ' + errorMessage)
    }
  }

  // Test speaker
  const handleTestSpeaker = async () => {
    setIsTestingSpeaker(true)
    try {
      // Create a test audio context and play a brief tone
      const audioContext = new AudioContext()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Set audio output device (if supported)
      if ('setSinkId' in audioContext.destination && selectedSpeaker) {
        try {
          // setSinkId is not yet in all TypeScript definitions, but it exists in modern browsers
          const destination = audioContext.destination as { setSinkId?: (sinkId: string) => Promise<void> }
          if (destination.setSinkId) {
            await destination.setSinkId(selectedSpeaker)
          }
        } catch (error) {
          console.warn('Failed to set audio output device:', error)
        }
      }
      
      // Play a 440Hz tone for 0.5 seconds
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.5)
      
      setTimeout(() => {
        audioContext.close()
        setIsTestingSpeaker(false)
      }, 1000)
    } catch (error) {
      console.error('Speaker test failed:', error)
      setIsTestingSpeaker(false)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert('Speaker test failed: ' + errorMessage)
    }
  }

  // Request permissions
  const handleRequestPermissions = async () => {
    try {
      // Request both camera and microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      
      // Stop the stream immediately after getting permission
      stream.getTracks().forEach(track => track.stop())
      
      setHasPermissions(true)
      
      // Re-enumerate devices now that we have permissions
      handleRefreshDevices()
    } catch (error) {
      console.error('Permission request failed:', error)
      setHasPermissions(false)
      
      if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError') {
          alert('Camera and microphone access was denied. Please allow access in your browser settings.')
        } else if (error.name === 'NotFoundError') {
          alert('No camera or microphone found on this device.')
        } else {
          alert('Error accessing camera/microphone: ' + error.message)
        }
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        alert('Error accessing camera/microphone: ' + errorMessage)
      }
    }
  }

  // Initialize dark mode on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    
    setIsDarkMode(isDark)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border animate-in zoom-in duration-300 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center space-x-2">
            <Monitor className="w-5 h-5" />
            <span>Settings</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4 max-h-[70vh] overflow-y-auto">
          {/* Appearance Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center space-x-2">
              {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>Appearance</span>
            </h3>
            
            <div className="flex items-center justify-between">
              <label className="text-foreground">Dark Mode</label>
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={handleDarkModeToggle} 
              />
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Audio & Video Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Audio & Video</h3>
            
            <div className="flex items-center justify-between">
              <label className="text-foreground">Enable Camera</label>
              <Switch checked={isCameraOn} onCheckedChange={onToggleCamera} />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-foreground">Enable Microphone</label>
              <Switch checked={isMicOn} onCheckedChange={onToggleMic} />
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Permissions */}
          {!hasPermissions && (
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Camera & Microphone Access Required
                  </h4>
                  <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
                    Grant access to use your camera and microphone devices
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={handleRequestPermissions}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Grant Access
                </Button>
              </div>
            </div>
          )}

          {/* Device Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Device Selection</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefreshDevices}
                disabled={isRefreshingDevices}
                className="text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshingDevices ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            
            {/* Camera Selection */}
            <div className="space-y-2">
              <label className="text-sm text-foreground flex items-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Camera</span>
                {isCameraOn && selectedCamera && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </label>
              <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                  <SelectValue placeholder={cameras.length > 0 ? "Select camera" : "No cameras found"} />
                </SelectTrigger>
                <SelectContent>
                  {cameras.length > 0 ? (
                    cameras.map((camera) => (
                      <SelectItem key={camera.deviceId} value={camera.deviceId}>
                        <div className="flex items-center justify-between w-full">
                          <span>{camera.label}</span>
                          {camera.deviceId === selectedCamera && (
                            <div className="w-2 h-2 bg-primary rounded-full ml-2" />
                          )}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-cameras" disabled>
                      No cameras detected
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={handleTestCamera}
                disabled={isTestingCamera || !isCameraOn || cameras.length === 0}
                className="w-full"
              >
                {isTestingCamera ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Testing Camera...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Test Camera
                  </>
                )}
              </Button>
            </div>

            {/* Microphone Selection */}
            <div className="space-y-2">
              <label className="text-sm text-foreground flex items-center space-x-2">
                <Mic className="w-4 h-4" />
                <span>Microphone</span>
                {isMicOn && selectedMicrophone && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </label>
              <Select value={selectedMicrophone} onValueChange={setSelectedMicrophone}>
                <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                  <SelectValue placeholder={microphones.length > 0 ? "Select microphone" : "No microphones found"} />
                </SelectTrigger>
                <SelectContent>
                  {microphones.length > 0 ? (
                    microphones.map((microphone) => (
                      <SelectItem key={microphone.deviceId} value={microphone.deviceId}>
                        <div className="flex items-center justify-between w-full">
                          <span>{microphone.label}</span>
                          {microphone.deviceId === selectedMicrophone && (
                            <div className="w-2 h-2 bg-primary rounded-full ml-2" />
                          )}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-microphones" disabled>
                      No microphones detected
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={handleTestMicrophone}
                disabled={isTestingMic || !isMicOn || microphones.length === 0}
                className="w-full"
              >
                {isTestingMic ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Testing Microphone...
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Test Microphone
                  </>
                )}
              </Button>
            </div>

            {/* Speaker Selection */}
            <div className="space-y-2">
              <label className="text-sm text-foreground flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <span>Speaker</span>
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                  Active
                </span>
              </label>
              <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                  <SelectValue placeholder={speakers.length > 0 ? "Select speaker" : "No speakers found"} />
                </SelectTrigger>
                <SelectContent>
                  {speakers.length > 0 ? (
                    speakers.map((speaker) => (
                      <SelectItem key={speaker.deviceId} value={speaker.deviceId}>
                        <div className="flex items-center justify-between w-full">
                          <span>{speaker.label}</span>
                          {speaker.deviceId === selectedSpeaker && (
                            <div className="w-2 h-2 bg-primary rounded-full ml-2" />
                          )}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-speakers" disabled>
                      No speakers detected
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={handleTestSpeaker}
                disabled={isTestingSpeaker || speakers.length === 0}
                className="w-full"
              >
                {isTestingSpeaker ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Testing Speaker...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Test Speaker
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Additional Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">General</h3>
            
            <div className="flex items-center justify-between">
              <label className="text-foreground">Show Participant Names</label>
              <Switch 
                checked={showParticipantNames} 
                onCheckedChange={setShowParticipantNames} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-foreground">Auto-mute on Join</label>
              <Switch 
                checked={autoMuteOnJoin} 
                onCheckedChange={setAutoMuteOnJoin} 
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border">
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 