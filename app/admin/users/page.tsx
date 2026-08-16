'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAdminUsers } from '@/lib/admin-api'
import {
  Search,
  Filter,
  ArrowUpDown,
  User,
  Loader2,
  ChevronRight,
  Shield,
  Building,
  Calendar,
} from 'lucide-react'

const USER_TYPE_FILTERS = [
  'ALL',
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

export default function AdminUserDirectoryPage() {
  const [search, setSearch] = useState('')
  const [userType, setUserType] = useState('ALL')
  const [sortBy, setSortBy] = useState<'newest' | 'active'>('newest')

  const { data: users, isLoading, isError } = useAdminUsers({
    search,
    userType,
    sortBy,
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">User Directory</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Search, filter, and inspect registered HardcoreAI developer accounts.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or company..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-zinc-600"
          />
        </div>

        {/* User Type Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={16} className="text-zinc-400 shrink-0" />
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all w-full md:w-auto"
          >
            {USER_TYPE_FILTERS.map((t) => (
              <option key={t} value={t} className="bg-zinc-950 text-white">
                {t === 'ALL' ? 'All Roles & Types' : t}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <ArrowUpDown size={16} className="text-zinc-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'active')}
            className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all w-full md:w-auto"
          >
            <option value="newest" className="bg-zinc-950 text-white">
              Sort by Newest
            </option>
            <option value="active" className="bg-zinc-950 text-white">
              Sort by Most Active
            </option>
          </select>
        </div>
      </div>

      {/* User Directory Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
          <Loader2 className="animate-spin mb-3 text-purple-400" size={28} />
          <p className="text-sm">Loading user directory...</p>
        </div>
      ) : isError ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center text-red-400">
          Failed to load users directory.
        </div>
      ) : users?.length === 0 ? (
        <div className="bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
          No users match the search criteria.
        </div>
      ) : (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950/80 text-xs uppercase font-semibold text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Type / Role</th>
                  <th className="py-3.5 px-4">Joined</th>
                  <th className="py-3.5 px-4">Last Active</th>
                  <th className="py-3.5 px-4 text-center">Projects</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {users?.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-800/40 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 font-semibold shrink-0">
                          {u.full_name?.charAt(0).toUpperCase() || <User size={16} />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate flex items-center gap-1.5">
                            {u.full_name || 'Unnamed User'}
                            {u.role === 'admin' && (
                              <span className="px-1.5 py-0.2 bg-purple-500/20 text-purple-300 text-[10px] font-bold rounded border border-purple-500/40">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-zinc-400 truncate">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs text-zinc-300">
                      {u.company_name ? (
                        <span className="inline-flex items-center gap-1 font-medium">
                          <Building size={13} className="text-zinc-500" />
                          {u.company_name}
                        </span>
                      ) : (
                        <span className="text-zinc-600 italic">Not provided</span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-xs">
                      <span className="px-2 py-1 bg-zinc-800/80 text-zinc-300 rounded-md border border-zinc-700/80 font-medium">
                        {u.user_type || 'Unspecified'}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-xs text-zinc-400 whitespace-nowrap">
                      {new Date(u.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-4 px-4 text-xs text-zinc-400 whitespace-nowrap">
                      {new Date(u.last_active_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 bg-zinc-800 text-white font-bold text-xs rounded-full border border-zinc-700">
                        {u.project_count || 0}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/admin/users/${u.id}`}
                        className="inline-flex items-center text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors group-hover:translate-x-0.5"
                      >
                        Inspect <ChevronRight size={14} className="ml-0.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
