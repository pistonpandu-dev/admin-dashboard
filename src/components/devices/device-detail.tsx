'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Device } from '@/types/device'
import { formatDate, formatBytes } from '@/lib/utils'
import {
  Smartphone,
  Wifi,
  WifiOff,
  Battery,
  HardDrive,
  MemoryStick,
  Android,
  Network,
  Clock,
  QrCode,
} from 'lucide-react'

interface DeviceDetailProps {
  device: Device
}

export function DeviceDetail({ device }: DeviceDetailProps) {
  const storageUsed = (device.storage.used / device.storage.total) * 100
  const ramUsed = (device.ram.used / device.ram.total) * 100

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
            <CardDescription>Basic device details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{device.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {device.brand} {device.model}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  variant={
                    device.status === 'online' ? 'success' : 'destructive'
                  }
                  className="capitalize"
                >
                  {device.status === 'online' ? (
                    <Wifi className="mr-1 h-3 w-3" />
                  ) : (
                    <WifiOff className="mr-1 h-3 w-3" />
                  )}
                  {device.status}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Online</p>
                <p className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  {formatDate(device.lastOnline)}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Device PIN</p>
              <p className="font-mono text-lg tracking-wider">{device.pin}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Paired At</p>
              <p className="text-sm">{formatDate(device.pairedAt)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>Hardware and software details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4" />
                  <span className="text-sm font-medium">Battery</span>
                </div>
                <span className="text-sm">{device.battery}%</span>
              </div>
              <Progress value={device.battery} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  <span className="text-sm font-medium">Storage</span>
                </div>
                <span className="text-sm">
                  {formatBytes(device.storage.used)} /{' '}
                  {formatBytes(device.storage.total)}
                </span>
              </div>
              <Progress value={storageUsed} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Free: {formatBytes(device.storage.free)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MemoryStick className="h-4 w-4" />
                  <span className="text-sm font-medium">RAM</span>
                </div>
                <span className="text-sm">
                  {formatBytes(device.ram.used)} / {formatBytes(device.ram.total)}
                </span>
              </div>
              <Progress value={ramUsed} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Free: {formatBytes(device.ram.free)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Android className="h-4 w-4" />
                <span className="text-sm font-medium">Android Version</span>
              </div>
              <p className="text-sm">{device.androidVersion}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                <span className="text-sm font-medium">Network</span>
              </div>
              <div className="space-y-1 text-sm">
                <p>Type: {device.network.type}</p>
                <p>IP Address: {device.network.ip}</p>
                <p>Signal: {device.network.signal}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
