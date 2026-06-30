'use client'

import { AuthProvider as FirebaseAuthProvider } from '@/lib/firebase/auth'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/hooks/use-auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      const isAuthPage = pathname === '/login' || pathname === '/forgot-password'
      
      if (!user && !isAuthPage) {
        router.push('/login')
      } else if (user && isAuthPage) {
        router.push('/')
      }
    }
  }, [user, loading, pathname, router])

  if (loading) {
    return null
  }

  return <>{children}</>
}
