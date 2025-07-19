"use client"

import React, { useRef, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PenTool, Type, Image, Eraser, X, ChevronDown } from 'lucide-react'

interface WhiteboardTool {
  type: 'pen' | 'text' | 'image' | 'eraser' | 'shape'
  shape?: 'rectangle' | 'circle' | 'triangle'
}

interface DrawingStroke {
  points: { x: number; y: number }[]
  tool: WhiteboardTool
  color: string
}

interface WhiteboardProps {
  isOpen: boolean
  onClose: () => void
}

export default function Whiteboard({ isOpen, onClose }: WhiteboardProps) {
  const [whiteboardTool, setWhiteboardTool] = useState<WhiteboardTool>({ type: 'pen' })
  const [whiteboardColor, setWhiteboardColor] = useState('#000000')
  const [drawingStrokes, setDrawingStrokes] = useState<DrawingStroke[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentStroke, setCurrentStroke] = useState<DrawingStroke | null>(null)
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 600 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Set canvas dimensions after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCanvasDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 64
      })
    }
  }, [isOpen])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (whiteboardTool.type !== 'pen') return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newStroke: DrawingStroke = {
      points: [{ x, y }],
      tool: whiteboardTool,
      color: whiteboardColor
    }
    
    setCurrentStroke(newStroke)
    setIsDrawing(true)
  }
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke || whiteboardTool.type !== 'pen') return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const updatedStroke = {
      ...currentStroke,
      points: [...currentStroke.points, { x, y }]
    }
    
    setCurrentStroke(updatedStroke)
    
    // Draw on canvas
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.strokeStyle = whiteboardColor
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      if (updatedStroke.points.length > 1) {
        const lastPoint = updatedStroke.points[updatedStroke.points.length - 2]
        const currentPoint = updatedStroke.points[updatedStroke.points.length - 1]
        
        ctx.beginPath()
        ctx.moveTo(lastPoint.x, lastPoint.y)
        ctx.lineTo(currentPoint.x, currentPoint.y)
        ctx.stroke()
      }
    }
  }
  
  const stopDrawing = () => {
    if (currentStroke) {
      setDrawingStrokes([...drawingStrokes, currentStroke])
    }
    setCurrentStroke(null)
    setIsDrawing(false)
  }
  
  const clearWhiteboard = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    setDrawingStrokes([])
    setCurrentStroke(null)
  }

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 bg-white z-50 flex flex-col transform transition-transform duration-500 ${
      isOpen ? 'translate-y-0' : 'translate-y-full'
    }`}>
      {/* Header */}
      <div className="h-16 bg-gray-100 border-b border-gray-300 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">Shared Whiteboard</h1>
          
          {/* Tool Bar */}
          <div className="flex items-center space-x-2">
            <Button
              variant={whiteboardTool.type === 'pen' ? "default" : "outline"}
              size="sm"
              onClick={() => setWhiteboardTool({ type: 'pen' })}
            >
              <PenTool className="w-4 h-4" />
            </Button>
            <Button
              variant={whiteboardTool.type === 'text' ? "default" : "outline"}
              size="sm"
              onClick={() => setWhiteboardTool({ type: 'text' })}
            >
              <Type className="w-4 h-4" />
            </Button>
            <Button
              variant={whiteboardTool.type === 'image' ? "default" : "outline"}
              size="sm"
              onClick={() => setWhiteboardTool({ type: 'image' })}
            >
              <Image className="w-4 h-4" />
            </Button>
            <Button
              variant={whiteboardTool.type === 'eraser' ? "default" : "outline"}
              size="sm"
              onClick={() => setWhiteboardTool({ type: 'eraser' })}
            >
              <Eraser className="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <input
              type="color"
              value={whiteboardColor}
              onChange={(e) => setWhiteboardColor(e.target.value)}
              className="w-8 h-8 rounded border-2 border-gray-300"
            />
            <Button variant="outline" size="sm" onClick={clearWhiteboard}>
              Clear
            </Button>
          </div>
        </div>
        
        {/* Close Controls */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-gray-600 hover:bg-gray-200"
          >
            <ChevronDown className="w-4 h-4 mr-2" />
            Close
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-gray-600 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Canvas Area */}
      <div className="flex-1 relative bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          width={canvasDimensions.width}
          height={canvasDimensions.height}
          className="absolute inset-0 cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        
        {/* Tool Hints */}
        {whiteboardTool.type === 'text' && (
          <div className="absolute top-4 left-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-gray-800">
            Click anywhere to add text (simulated)
          </div>
        )}
        {whiteboardTool.type === 'image' && (
          <div className="absolute top-4 left-4 p-2 bg-blue-100 border border-blue-300 rounded text-gray-800">
            Click to insert image (simulated)
          </div>
        )}
      </div>
    </div>
  )
} 