'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DeviceFiltersProps {
  value: string
  onChange: (value: string) => void
}

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Online', value: 'online' },
  { label: 'Offline', value: 'offline' },
  { label: 'Pairing', value: 'pairing' },
]

export function DeviceFilters({ value, onChange }: DeviceFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={value === filter.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(filter.value)}
          className={cn(
            'capitalize',
            value === filter.value && 'bg-primary text-primary-foreground'
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
