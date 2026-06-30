// src/lib/env.ts
export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isPreview = process.env.VERCEL_ENV === 'preview'

console.log('Environment:', process.env.NODE_ENV)
console.log('Vercel Environment:', process.env.VERCEL_ENV)
console.log('API URL:', process.env.NEXT_PUBLIC_BASE_API_URL)
