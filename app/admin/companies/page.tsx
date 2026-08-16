'use client'

import { useAdminCompanies } from '@/lib/admin-api'
import { Building, Users, Activity, Cpu, Wand2, Loader2, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function AdminCompaniesPage() {
  const { data: companies, isLoading, isError } = useAdminCompanies()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
        <Loader2 className="animate-spin mb-3 text-purple-400" size={28} />
        <p className="text-sm">Aggregating company telemetry...</p>
      </div>
    )
  }

  if (isError || !companies) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center text-red-400">
        Failed to load company analytics.
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Company Analytics</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Cluster developers by organization, company name, and corporate email domain.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {companies.map((c) => (
          <div key={c.companyName} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Building size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {c.companyName}
                    {c.companyName.startsWith('Suggested:') && (
                      <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">
                        Domain Signal
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Last activity:{' '}
                    {c.lastActiveAt
                      ? new Date(c.lastActiveAt).toLocaleString()
                      : 'No recent activity'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-zinc-400">
                <div className="text-center">
                  <span className="block text-white font-bold text-base">{c.userCount}</span>
                  <span>Users</span>
                </div>
                <div className="text-center">
                  <span className="block text-emerald-400 font-bold text-base">{c.activeUserCount}</span>
                  <span>Active 7d</span>
                </div>
                <div className="text-center">
                  <span className="block text-white font-bold text-base">{c.projectCount}</span>
                  <span>Projects</span>
                </div>
                <div className="text-center">
                  <span className="block text-purple-400 font-bold text-base">
                    {c.firmwareGenerationsCount}
                  </span>
                  <span>Firmware</span>
                </div>
              </div>
            </div>

            {/* Users in Company */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                Team Members ({c.users.length})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {c.users.map((u) => (
                  <div
                    key={u.id}
                    className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-semibold text-xs text-white truncate">
                        {u.full_name || 'Unnamed User'}
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate">{u.email}</div>
                    </div>
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="text-xs text-purple-400 hover:text-purple-300 font-medium shrink-0 flex items-center"
                    >
                      Inspect <ChevronRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
