export interface Device {
  id: string
  name: string
  model: string
  brand: string
  androidVersion: string
  battery: number
  storage: {
    total: number
    used: number
    free: number
  }
  ram: {
    total: number
    used: number
    free: number
  }
  status: 'online' | 'offline' | 'pairing'
  lastOnline: string
  network: {
    type: 'wifi' | 'cellular'
    ip: string
    signal: number
  }
  pin: string
  pairedAt: string
}

export interface DeviceStats {
  total: number
  online: number
  offline: number
  pairing: number
}
