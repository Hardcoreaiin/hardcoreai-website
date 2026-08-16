'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import {
  ShieldAlert,
  Users,
  Building,
  TrendingUp,
  LayoutDashboard,
  LogOut,
  ArrowLeft,
  Cpu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const ADMIN_NAV = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'User Directory', href: '/admin/users', icon: Users },
  { name: 'Companies', href: '/admin/companies', icon: Building },
  { name: 'Funnel & Retention', href: '/admin/funnel', icon: TrendingUp },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#020204] text-white flex flex-col font-sans">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 h-16 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center text-xs text-zinc-400 hover:text-white transition-colors gap-1.5 mr-4">
            <ArrowLeft size={14} />
            Back to App
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldAlert size={16} />
            </div>
            <span className="font-bold text-white tracking-tight text-sm">HardcoreAI Admin</span>
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-purple-500/20 text-purple-300 rounded border border-purple-500/40">
              Restricted
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut className="mr-1.5 h-3.5 w-3.5" />
            {isLoggingOut ? 'Logging out...' : 'Sign Out'}
          </button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Admin Navigation Sidebar */}
        <aside className="w-64 border-r border-zinc-800 bg-zinc-950/50 p-4 shrink-0 flex flex-col justify-between hidden md:flex">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Administration
            </div>
            {ADMIN_NAV.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-purple-600/15 text-purple-300 border border-purple-500/30'
                      : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-white'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-4 w-4',
                      isActive ? 'text-purple-400' : 'text-zinc-500'
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-xl text-xs text-zinc-400">
            <p className="font-medium text-white mb-1 flex items-center gap-1.5">
              <Cpu size={14} className="text-purple-400" />
              Secure Analytics
            </p>
            <p className="text-[11px] text-zinc-500">
              Server-side authorization enforced. Privacy compliant first-party product telemetry.
            </p>
          </div>
        </aside>

        {/* Admin Main Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
