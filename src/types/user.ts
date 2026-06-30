export interface User {
  id: string
  email: string
  displayName?: string
  photoURL?: string
  role: 'admin' | 'user' | 'viewer'
  createdAt: string
  updatedAt: string
  lastLogin?: string
  isActive: boolean
  preferences?: {
    theme: 'light' | 'dark' | 'system'
    notifications: {
      push: boolean
      email: boolean
      sound: boolean
    }
  }
}
