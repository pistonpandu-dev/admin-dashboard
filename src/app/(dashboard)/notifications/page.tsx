'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, CheckCheck, Trash2, Circle, CheckCircle2 } from 'lucide-react'
import { useNotifications } from '@/lib/hooks/use-notifications'
import { formatDate } from '@/lib/utils'

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Real-time notifications and alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => markAllAsRead()}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>Stay updated with real-time events</CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
              <p className="text-sm text-muted-foreground">All caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                    !notification.read ? 'bg-muted/30' : ''
                  }`}
                >
                  <div className="mt-0.5">
                    {!notification.read ? (
                      <Circle className="h-4 w-4 text-primary" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      <Badge
                        variant={
                          notification.type === 'success'
                            ? 'default'
                            : notification.type === 'warning'
                            ? 'outline'
                            : notification.type === 'error'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCheck className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
