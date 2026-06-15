'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Loader2, Command } from 'lucide-react'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, // Assumes a reset password confirmation page
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Check your email</h2>
        <p className="text-sm text-zinc-400 mb-6">
          If an account exists with <span className="text-white font-medium">{email}</span>, we've sent a password reset link.
        </p>
        <Link 
          href="/login" 
          className="w-full bg-white text-zinc-950 py-2 px-4 rounded-md font-medium hover:bg-zinc-200 transition-colors inline-block"
        >
          Return to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex flex-col items-center mb-8">
        <div className="h-12 w-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4">
          <Command className="text-zinc-100" size={24} />
        </div>
        <h1 className="text-2xl font-semibold text-white">Reset password</h1>
        <p className="text-sm text-zinc-400 mt-2 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-zinc-950 py-2 rounded-md font-medium hover:bg-zinc-200 transition-colors flex items-center justify-center mt-6 disabled:opacity-70"
        >
          {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
          Send reset link
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-400">
        Remember your password?{' '}
        <Link href="/login" className="text-white hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
