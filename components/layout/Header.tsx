'use client'

import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { useState } from 'react'

export function Header() {
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
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-end px-6 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
          <User className="h-4 w-4 text-zinc-400" />
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </header>
  )
}
