'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'
import { Sparkles, Building, UserCheck, X, Check, Loader2 } from 'lucide-react'
import { UserType } from '@/lib/types'

const USER_TYPE_OPTIONS: UserType[] = [
  'Embedded Engineer',
  'Firmware Engineer',
  'Engineering Lead',
  'CTO',
  'Founder',
  'Researcher',
  'Student',
  'Hobbyist/Maker',
  'Other',
]

export function ProfileCompletionCard() {
  const [isVisible, setIsVisible] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [userType, setUserType] = useState<string>('Embedded Engineer')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    async function checkProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUserId(user.id)

      // Fetch profile to see if user_type or company_name is already set
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_name, job_title, user_type')
        .eq('id', user.id)
        .single()

      if (profile) {
        if (profile.company_name) setCompanyName(profile.company_name)
        if (profile.job_title) setJobTitle(profile.job_title)
        if (profile.user_type) setUserType(profile.user_type)

        // Show onboarding if company_name or user_type hasn't been completed yet
        if (!profile.user_type && !profile.company_name) {
          setIsVisible(true)
        }
      } else {
        setIsVisible(true)
      }
    }

    checkProfile()
  }, [])

  if (!isVisible) return null

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      await supabase
        .from('profiles')
        .update({
          company_name: companyName.trim() || null,
          job_title: jobTitle.trim() || null,
          user_type: userType,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)

      await trackEvent('USER_PROFILE_UPDATED', {
        metadata: {
          company_name: companyName.trim(),
          job_title: jobTitle.trim(),
          user_type: userType,
        },
      })

      setIsSaved(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 1500)
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-8 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-xl animate-in fade-in duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Complete Your Profile</h3>
            <p className="text-xs text-zinc-400">
              Help HardcoreAI tailor firmware reasoning & hardware constraint validation for your team.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
        >
          <X size={18} />
        </button>
      </div>

      {isSaved ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center text-emerald-400 text-sm">
          <Check size={18} className="mr-2" />
          Profile details saved successfully!
        </div>
      ) : (
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Company / Organization <span className="text-zinc-500">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. ABC Robotics"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-zinc-600 pl-9"
              />
              <Building size={16} className="absolute left-3 top-2.5 text-zinc-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Job Title / Role <span className="text-zinc-500">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Firmware Architect"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-zinc-600 pl-9"
              />
              <UserCheck size={16} className="absolute left-3 top-2.5 text-zinc-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              What best describes you?
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            >
              {USER_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-zinc-950 text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="px-4 py-2 rounded-md text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Skip for now
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-md text-xs font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition-colors flex items-center disabled:opacity-50"
            >
              {isLoading && <Loader2 size={14} className="animate-spin mr-1.5" />}
              Save Profile Details
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
