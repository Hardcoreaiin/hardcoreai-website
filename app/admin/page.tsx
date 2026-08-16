'use client'

import { useAdminStats } from '@/lib/admin-api'
import {
  Users,
  UserPlus,
  Activity,
  Building,
  Cpu,
  Wand2,
  FileText,
  Loader2,
  Calendar,
  Clock,
} from 'lucide-react'

export default function AdminOverviewPage() {
  const { data: stats, isLoading, isError } = useAdminStats()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
        <Loader2 className="animate-spin mb-4 text-purple-400" size={32} />
        <p className="text-sm">Loading admin analytics...</p>
      </div>
    )
  }

  if (isError || !stats) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center text-red-400">
        <p className="font-semibold">Failed to load admin statistics</p>
        <p className="text-xs text-red-500/80 mt-1">Please verify database connections and permissions.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">System Overview</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Real-time user registration, active usage, and product analytics.
        </p>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Total Users</span>
            <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-4 text-3xl font-extrabold text-white tracking-tight">{stats.totalUsers}</div>
          <p className="text-[11px] text-zinc-500 mt-1">Registered accounts</p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">New Users (7 Days)</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <UserPlus size={18} />
            </div>
          </div>
          <div className="mt-4 text-3xl font-extrabold text-white tracking-tight">{stats.newUsers7d}</div>
          <p className="text-[11px] text-zinc-500 mt-1">
            24h: <span className="text-emerald-400 font-medium">{stats.newUsers24h}</span> | 30d: {stats.newUsers30d}
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Active Users (7 Days)</span>
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Activity size={18} />
            </div>
          </div>
          <div className="mt-4 text-3xl font-extrabold text-white tracking-tight">{stats.activeUsers7d}</div>
          <p className="text-[11px] text-zinc-500 mt-1">30 Days Active: {stats.activeUsers30d}</p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Companies</span>
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Building size={18} />
            </div>
          </div>
          <div className="mt-4 text-3xl font-extrabold text-white tracking-tight">{stats.totalCompanies}</div>
          <p className="text-[11px] text-zinc-500 mt-1">Organizations & clusters</p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Total Projects</span>
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu size={18} />
            </div>
          </div>
          <div className="mt-4 text-3xl font-extrabold text-white tracking-tight">{stats.totalProjects}</div>
          <p className="text-[11px] text-zinc-500 mt-1">Embedded workspaces</p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Firmware Generations</span>
            <div className="h-8 w-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <Wand2 size={18} />
            </div>
          </div>
          <div className="mt-4 text-3xl font-extrabold text-white tracking-tight">
            {stats.totalFirmwareGenerations}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">AI driver runs</p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden sm:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Hardware Documents</span>
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <FileText size={18} />
            </div>
          </div>
          <div className="mt-4 text-3xl font-extrabold text-white tracking-tight">
            {stats.totalDocumentsUploaded}
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Datasheets, reference manuals & schematics uploaded</p>
        </div>
      </div>

      {/* Overview Context Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
            <Clock size={18} className="text-purple-400" />
            User Acquisition Summary
          </h3>
          <ul className="space-y-3 text-sm text-zinc-400 mt-4">
            <li className="flex justify-between border-b border-zinc-800/60 pb-2">
              <span>New registrations today:</span>
              <span className="font-semibold text-white">{stats.newUsers24h}</span>
            </li>
            <li className="flex justify-between border-b border-zinc-800/60 pb-2">
              <span>New registrations this week:</span>
              <span className="font-semibold text-white">{stats.newUsers7d}</span>
            </li>
            <li className="flex justify-between">
              <span>New registrations this month:</span>
              <span className="font-semibold text-white">{stats.newUsers30d}</span>
            </li>
          </ul>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
            <Calendar size={18} className="text-emerald-400" />
            Engagement Summary
          </h3>
          <ul className="space-y-3 text-sm text-zinc-400 mt-4">
            <li className="flex justify-between border-b border-zinc-800/60 pb-2">
              <span>7-Day Active Users:</span>
              <span className="font-semibold text-white">{stats.activeUsers7d}</span>
            </li>
            <li className="flex justify-between border-b border-zinc-800/60 pb-2">
              <span>30-Day Active Users:</span>
              <span className="font-semibold text-white">{stats.activeUsers30d}</span>
            </li>
            <li className="flex justify-between">
              <span>Active User Ratio (WAU/Total):</span>
              <span className="font-semibold text-emerald-400">
                {stats.totalUsers > 0
                  ? `${Math.round((stats.activeUsers7d / stats.totalUsers) * 100)}%`
                  : '0%'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
