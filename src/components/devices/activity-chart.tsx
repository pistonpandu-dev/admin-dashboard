'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'

export function ActivityChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const rect = canvas.parentElement?.getBoundingClientRect()
    if (rect) {
      canvas.width = rect.width
      canvas.height = 200
    }

    // Sample data
    const data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100))
    const max = Math.max(...data)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw chart
    const padding = 20
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2

    // Draw gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)')
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)')

    // Draw line
    ctx.beginPath()
    ctx.moveTo(padding, canvas.height - padding)

    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth
      const y = canvas.height - padding - (value / max) * chartHeight
      ctx.lineTo(x, y)
    })

    ctx.strokeStyle = 'rgb(99, 102, 241)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw area
    const lastX = padding + chartWidth
    const lastY = canvas.height - padding - (data[data.length - 1] / max) * chartHeight

    ctx.lineTo(lastX, canvas.height - padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw points
    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth
      const y = canvas.height - padding - (value / max) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgb(99, 102, 241)'
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.stroke()
    })

  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>Device activity for the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
