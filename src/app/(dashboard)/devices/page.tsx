'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DeviceList } from '@/components/devices/device-list'
import { DeviceFilters } from '@/components/devices/device-filters'
import { useDevices } from '@/lib/hooks/use-devices'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function DevicesPage() {
  const { devices, isLoading } = useDevices()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredDevices = devices?.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(search.toLowerCase()) ||
                          device.model.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || device.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Devices</h1>
          <p className="text-muted-foreground">
            Manage all connected devices
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Device
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <DeviceFilters value={filter} onChange={setFilter} />
      </div>

      <DeviceList devices={filteredDevices} isLoading={isLoading} />
    </div>
  )
}
