'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { QrCode, RefreshCw, Check, X, Clock } from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'

export default function PairingPage() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [pairingHistory, setPairingHistory] = useState([
    { id: 1, device: 'Samsung Galaxy S23', status: 'success', time: '2024-01-15 14:30' },
    { id: 2, device: 'Google Pixel 8', status: 'pending', time: '2024-01-15 14:20' },
    { id: 3, device: 'Xiaomi 13 Pro', status: 'failed', time: '2024-01-15 14:10' },
  ])

  const generateQR = async () => {
    setIsGenerating(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast({
        title: 'QR Code Generated',
        description: 'Scan the QR code with your Android device to pair.',
      })
    } catch (error) {
      toast({
        title: 'Failed',
        description: 'Failed to generate QR code.',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pairing</h1>
        <p className="text-muted-foreground">Pair new devices using QR code</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>QR Pairing Status</CardTitle>
            <CardDescription>Generate QR code to pair new device</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed">
                <QrCode className="h-24 w-24 text-muted-foreground" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Badge variant="outline" className="bg-background">
                  <Clock className="mr-1 h-3 w-3" />
                  Expires in 5:00
                </Badge>
              </div>
            </div>
            <Button onClick={generateQR} disabled={isGenerating} className="w-full">
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate QR Code'
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connected Device</CardTitle>
            <CardDescription>Currently paired device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Samsung Galaxy S23</p>
                <p className="text-sm text-muted-foreground">Paired: 2 hours ago</p>
              </div>
              <Badge variant="success" className="bg-green-500">
                <Check className="mr-1 h-3 w-3" />
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pairing History</CardTitle>
          <CardDescription>Recent pairing attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pairingHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.device}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === 'success'
                          ? 'default'
                          : item.status === 'pending'
                          ? 'outline'
                          : 'destructive'
                      }
                    >
                      {item.status === 'success' && <Check className="mr-1 h-3 w-3" />}
                      {item.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                      {item.status === 'failed' && <X className="mr-1 h-3 w-3" />}
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
