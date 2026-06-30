'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { DeviceDetail } from '@/components/devices/device-detail'
import { useDevices } from '@/lib/hooks/use-devices'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DeviceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { devices, isLoading, getDevice } = useDevices()
  const [error, setError] = useState<string | null>(null)
  
  // Cari device dari data yang sudah ada
  const device = devices?.find(d => d.id === id)

  // Optional: Fetch device detail jika belum ada di list
  useEffect(() => {
    if (!isLoading && !device && !error) {
      // Jika device tidak ditemukan di list, coba fetch langsung
      getDevice.refetch().catch((err) => {
        setError(err.message || 'Failed to load device details')
      })
    }
  }, [isLoading, device, error, getDevice])

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/devices">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button asChild className="mt-4">
          <Link href="/devices">Back to Devices</Link>
        </Button>
      </div>
    )
  }

  // Not found state
  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-muted p-4">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="mt-4 text-2xl font-bold">Device not found</h2>
        <p className="text-muted-foreground">
          The device you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="mt-4">
          <Link href="/devices">Back to Devices</Link>
        </Button>
      </div>
    )
  }

  // Success state
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/devices">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{device.name}</h1>
      </div>
      <DeviceDetail device={device} />
    </motion.div>
  )
}
