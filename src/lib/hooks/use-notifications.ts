'use client'

import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { useSocket } from './use-socket'
import { Notification } from '@/types/notification'

export function useNotifications() {
  const queryClient = useQueryClient()
  const { on, off } = useSocket()
  const [notifications, setNotifications] = useState<Notification[]>([])

  const { data: initialNotifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await apiClient.get<Notification[]>('/notifications')
      return response.data
    },
  })

  useEffect(() => {
    if (initialNotifications) {
      setNotifications(initialNotifications)
    }
  }, [initialNotifications])

  useEffect(() => {
    const handleNewNotification = (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev])
    }

    on('notification', handleNewNotification)

    return () => {
      off('notification', handleNewNotification)
    }
  }, [on, off])

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.patch(`/notifications/${id}/read`)
    },
    onSuccess: (_, id) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      )
    },
  })

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      await apiClient.patch('/notifications/read-all')
    },
    onSuccess: () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    },
  })

  const deleteNotification = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/notifications/${id}`)
    },
    onSuccess: (_, id) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    },
  })

  return {
    notifications,
    markAsRead: markAsRead.mutate,
    markAllAsRead: markAllAsRead.mutate,
    deleteNotification: deleteNotification.mutate,
    unreadCount: notifications.filter((n) => !n.read).length,
  }
}
