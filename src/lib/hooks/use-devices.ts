'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { Device, DeviceStats } from '@/types/device'

export function useDevices() {
  const queryClient = useQueryClient()

  const { data: devices, isLoading: isLoadingDevices } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const response = await apiClient.get<Device[]>('/devices')
      return response.data
    },
  })

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['devices', 'stats'],
    queryFn: async () => {
      const response = await apiClient.get<DeviceStats>('/devices/stats')
      return response.data
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  })

  const getDevice = useQuery({
    queryKey: ['device'],
    queryFn: async ({ queryKey }) => {
      const id = queryKey[1] as string
      const response = await apiClient.get<Device>(`/devices/${id}`)
      return response.data
    },
    enabled: false,
  })

  const updateDevice = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Device> }) => {
      const response = await apiClient.patch<Device>(`/devices/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] })
    },
  })

  const generatePIN = useMutation({
    mutationFn: async (deviceId: string) => {
      const response = await apiClient.post<{ pin: string }>(`/devices/${deviceId}/pin`)
      return response.data
    },
  })

  return {
    devices,
    stats,
    isLoading: isLoadingDevices || isLoadingStats,
    getDevice,
    updateDevice,
    generatePIN,
  }
}
