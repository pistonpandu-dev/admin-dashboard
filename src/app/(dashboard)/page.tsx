'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { StatsCard } from '@/components/dashboard/stats-card'
import { NotificationList } from '@/components/dashboard/notification-list'
import { useDevices } from '@/lib/hooks/use-devices'
import { useSocket } from '@/lib/hooks/use-socket'
import { useNotifications } from '@/lib/hooks/use-notifications'
import {
  Smartphone,
  Wifi,
  WifiOff,
  Bell,
  Signal,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Import sederhana untuk activity chart
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  const { devices, stats, isLoading } = useDevices()
  const { connectionStatus } = useSocket()
  const { notifications } = useNotifications()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    setIsConnected(connectionStatus === 'connected')
  }, [connectionStatus])

  const statsData = [
    {
      title: 'Total Devices',
      value: stats?.total || 0,
      icon: Smartphone,
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Online Devices',
      value: stats?.online || 0,
      icon: Wifi,
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Offline Devices',
      value: stats?.offline || 0,
      icon: WifiOff,
      trend: '-3%',
      trendUp: false,
    },
    {
      title: 'Notifications',
      value: notifications?.length || 0,
      icon: Bell,
      trend: '+8%',
      trendUp: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your devices and system status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Signal className={cn(
            'h-4 w-4',
            isConnected ? 'text-green-500' : 'text-red-500'
          )} />
          <span className="text-sm">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} isLoading={isLoading} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
              <CardDescription>Device activity for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                {isLoading ? 'Loading...' : 'Chart placeholder'}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-3"
        >
          <NotificationList notifications={notifications} />
        </motion.div>
      </div>
    </div>
  )
}
