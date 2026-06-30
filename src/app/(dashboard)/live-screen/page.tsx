'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Play, Pause, Monitor, Maximize2, Minimize2, AlertCircle } from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'

export default function LiveScreenPage() {
  const { toast } = useToast()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const devices = [
    { id: '1', name: 'Samsung Galaxy S23' },
    { id: '2', name: 'Google Pixel 8' },
    { id: '3', name: 'Xiaomi 13 Pro' },
  ]

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      // Simulate stream connection
      videoRef.current.play().catch(() => {})
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (!selectedDevice) {
      toast({
        title: 'Select Device',
        description: 'Please select a device to view the screen.',
        variant: 'destructive',
      })
      return
    }
    setIsPlaying(!isPlaying)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Live Screen</h1>
        <p className="text-muted-foreground">View real-time screen from connected Android devices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Screen Stream</CardTitle>
          <CardDescription>Select a device to start streaming</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 max-w-xs">
              <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a device" />
                </SelectTrigger>
                <SelectContent>
                  {devices.map((device) => (
                    <SelectItem key={device.id} value={device.id}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={togglePlay} disabled={!selectedDevice}>
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Stream
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative aspect-video overflow-hidden rounded-lg bg-black"
          >
            {isPlaying ? (
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                src=""
                loop
                muted
                playsInline
              >
                <p>Your browser doesn't support HTML5 video.</p>
              </video>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-white">
                <Monitor className="h-16 w-16 text-white/40" />
                <p className="mt-2 text-sm text-white/60">
                  {selectedDevice ? 'Click "Start Stream" to begin' : 'Select a device to start streaming'}
                </p>
              </div>
            )}

            {isPlaying && (
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <Badge variant="destructive" className="animate-pulse">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white" />
                  LIVE
                </Badge>
                <Badge variant="outline" className="bg-black/50 text-white backdrop-blur-sm">
                  {selectedDevice ? devices.find(d => d.id === selectedDevice)?.name : ''}
                </Badge>
              </div>
            )}
          </div>

          {!selectedDevice && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>Please select a device to start screen sharing</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
