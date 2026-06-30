'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Copy, RefreshCw, Key } from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'
import { generatePIN } from '@/lib/utils'

export default function DevicePINPage() {
  const { toast } = useToast()
  const [pin, setPin] = useState(generatePIN())
  const [device, setDevice] = useState('')

  const handleGeneratePIN = () => {
    setPin(generatePIN())
    toast({
      title: 'PIN Generated',
      description: 'New PIN has been generated successfully.',
    })
  }

  const handleCopyPIN = () => {
    navigator.clipboard.writeText(pin)
    toast({
      title: 'Copied!',
      description: 'PIN copied to clipboard.',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Device PIN</h1>
        <p className="text-muted-foreground">Manage PIN codes for device access</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Generate PIN</CardTitle>
            <CardDescription>Create a new PIN for device access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="device">Select Device</Label>
              <Select value={device} onValueChange={setDevice}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="samsung">Samsung Galaxy S23</SelectItem>
                  <SelectItem value="pixel">Google Pixel 8</SelectItem>
                  <SelectItem value="xiaomi">Xiaomi 13 Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Generated PIN</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={pin}
                    readOnly
                    className="pl-9 font-mono text-lg tracking-wider"
                  />
                </div>
                <Button variant="outline" size="icon" onClick={handleCopyPIN}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleGeneratePIN}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button className="w-full" disabled={!device}>
              Assign PIN to Device
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active PINs</CardTitle>
            <CardDescription>Currently active device PINs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">Samsung Galaxy S23</p>
                  <p className="text-sm text-muted-foreground">PIN: ****45</p>
                </div>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">Google Pixel 8</p>
                  <p className="text-sm text-muted-foreground">PIN: ****78</p>
                </div>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
