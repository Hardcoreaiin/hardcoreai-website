'use client'

import { useAdminFunnelAndRetention } from '@/lib/admin-api'
import {
  TrendingUp,
  UserCheck,
  Zap,
  RotateCcw,
  Loader2,
  Calendar,
  Activity,
  CheckCircle2,
} from 'lucide-react'

export default function AdminFunnelPage() {
  const { data, isLoading, isError } = useAdminFunnelAndRetention()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
        <Loader2 className="animate-spin mb-3 text-purple-400" size={28} />
        <p className="text-sm">Calculating conversion funnel & retention metrics...</p>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center text-red-400">
        Failed to load funnel analytics.
      </div>
    )
  }

  const { funnel, retention } = data

  const stages = [
    {
      title: '1. SIGNED UP',
      count: funnel.signups,
      percentage: '100%',
      desc: 'Users who registered an account via Google or Password.',
      icon: UserCheck,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
    {
      title: '2. ACTIVATED',
      count: funnel.activatedUsers,
      percentage:
        funnel.signups > 0
          ? `${Math.round((funnel.activatedUsers / funnel.signups) * 100)}%`
          : '0%',
      desc: 'Users who created their first project workspace.',
      icon: Zap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      title: '3. FIRST VALUE',
      count: funnel.firstValueUsers,
      percentage:
        funnel.signups > 0
          ? `${Math.round((funnel.firstValueUsers / funnel.signups) * 100)}%`
          : '0%',
      desc: 'Users who uploaded a datasheet or executed firmware generation.',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      title: '4. RETURNING',
      count: funnel.returningUsers,
      percentage:
        funnel.signups > 0
          ? `${Math.round((funnel.returningUsers / funnel.signups) * 100)}%`
          : '0%',
      desc: 'Users returning for multiple active engineering sessions.',
      icon: RotateCcw,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Product Funnel & Retention</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Monitor user conversion stages from initial signup to active returning developer status.
        </p>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <TrendingUp size={18} className="text-purple-400" />
          Product Conversion Funnel
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((st) => (
            <div
              key={st.title}
              className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-zinc-400 tracking-wider">
                    {st.title}
                  </span>
                  <div className={`h-8 w-8 rounded-lg ${st.bgColor} ${st.borderColor} border flex items-center justify-center ${st.color}`}>
                    <st.icon size={16} />
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-extrabold text-white">{st.count}</span>
                  <span className={`text-xs font-bold ${st.color}`}>{st.percentage}</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active User Retention Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Retention Rates */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-emerald-400" />
            User Cohort Retention Rates
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400 font-medium">Day 1 Retention</span>
                <span className="text-white font-bold">{retention.day1}%</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${retention.day1}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400 font-medium">Day 7 Retention</span>
                <span className="text-white font-bold">{retention.day7}%</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${retention.day7}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400 font-medium">Day 30 Retention</span>
                <span className="text-white font-bold">{retention.day30}%</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${retention.day30}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* WAU / MAU Active Volume */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <Activity size={18} className="text-amber-400" />
            Active User Volume
          </h3>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <span className="text-xs text-zinc-500 block mb-1">Weekly Active (WAU)</span>
              <span className="text-2xl font-bold text-white">{retention.wau}</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <span className="text-xs text-zinc-500 block mb-1">Monthly Active (MAU)</span>
              <span className="text-2xl font-bold text-white">{retention.mau}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
