'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Smartphone,
  QrCode,
  Key,
  Mail,
  Monitor,
  Image,
  Bell,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Smartphone, label: 'Devices', href: '/devices' },
  { icon: QrCode, label: 'Pairing', href: '/pairing' },
  { icon: Key, label: 'PIN', href: '/pin' },
  { icon: Mail, label: 'Invitation', href: '/invitation' },
  { icon: Monitor, label: 'Live', href: '/live-screen' },
  { icon: Image, label: 'Gallery', href: '/gallery' },
  { icon: Bell, label: 'Notif', href: '/notifications' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-1 text-xs transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
