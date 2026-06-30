export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  
  // Devices
  DEVICES: {
    LIST: '/devices',
    DETAIL: (id: string) => `/devices/${id}`,
    STATS: '/devices/stats',
    UPDATE: (id: string) => `/devices/${id}`,
    DELETE: (id: string) => `/devices/${id}`,
    GENERATE_PIN: (id: string) => `/devices/${id}/pin`,
    PAIR: '/devices/pair',
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    READ: (id: string) => `/notifications/${id}/read`,
    READ_ALL: '/notifications/read-all',
    DELETE: (id: string) => `/notifications/${id}`,
  },
  
  // Invitations
  INVITATIONS: {
    LIST: '/invitations',
    SEND: '/invitations/send',
    STATUS: (id: string) => `/invitations/${id}/status`,
  },
  
  // Gallery
  GALLERY: {
    LIST: '/gallery',
    UPLOAD: '/gallery/upload',
    DELETE: (id: string) => `/gallery/${id}`,
  },
  
  // Live Screen
  LIVE: {
    STREAM: '/live/stream',
    START: '/live/start',
    STOP: '/live/stop',
  },
  
  // Settings
  SETTINGS: {
    PROFILE: '/settings/profile',
    UPDATE: '/settings/update',
    BACKEND: '/settings/backend',
    FIREBASE: '/settings/firebase',
  },
}
