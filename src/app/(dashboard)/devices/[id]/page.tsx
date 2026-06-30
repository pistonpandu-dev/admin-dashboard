'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { DeviceDetail } from '@/components/devices/device-detail'
import { useDevices } from '@/lib/hooks/use-devices'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DeviceDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { getDevice } = useDevices()
  
  const { data: device, isLoading } = getDevice

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/devices">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold">Device not found</h2>
        <p className="text-muted-foreground">The device you're looking for doesn't exist.</p>
        <Button asChild className="mt-4">
          <Link href="/devices">Back to Devices</Link>
        </Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Button variant="ghost" asChild>
        <Link href="/devices">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>
      <DeviceDetail device={device} />
    </motion.div>
  )
}
