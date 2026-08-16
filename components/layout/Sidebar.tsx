'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings, Cpu, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: Cpu },
  { name: 'Getting Started', href: '/getting-started', icon: BookOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6 border-b border-zinc-800">
        <Cpu className="h-6 w-6 text-white mr-2" />
        <span className="text-lg font-bold text-white tracking-tight">HardcoreAI</span>
      </div>
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          // Exception for projects since dashboard is the main list usually
          // but we added a stub for it.
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-zinc-800/50 text-white" 
                  : "text-zinc-400 hover:bg-zinc-800/30 hover:text-white"
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-zinc-500")} />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
