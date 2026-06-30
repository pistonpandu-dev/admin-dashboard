export const ROUTES = {
  // Auth
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  REGISTER: '/register',
  
  // Dashboard
  DASHBOARD: '/',
  DEVICES: '/devices',
  DEVICE_DETAIL: (id: string) => `/devices/${id}`,
  PAIRING: '/pairing',
  PIN: '/pin',
  INVITATION: '/invitation',
  LIVE_SCREEN: '/live-screen',
  GALLERY: '/gallery',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  
  // API
  API: {
    AUTH: '/api/auth',
    DEVICES: '/api/devices',
    NOTIFICATIONS: '/api/notifications',
    INVITATIONS: '/api/invitations',
    GALLERY: '/api/gallery',
    LIVE: '/api/live',
    SETTINGS: '/api/settings',
  }
}
