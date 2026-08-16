'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useAdminUserDetail } from '@/lib/admin-api'
import {
  ArrowLeft,
  User,
  Mail,
  Building,
  Briefcase,
  Calendar,
  Clock,
  Cpu,
  Wand2,
  Activity,
  Loader2,
  FileText,
  ShieldCheck,
} from 'lucide-react'

export default function AdminUserDetailPage() {
  const params = useParams()
  const userId = params.id as string
  const { data, isLoading, isError } = useAdminUserDetail(userId)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
        <Loader2 className="animate-spin mb-3 text-purple-400" size={28} />
        <p className="text-sm">Loading user profile details...</p>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="p-8">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-red-400 max-w-2xl">
          <h2 className="text-lg font-bold mb-2">User Profile Not Found</h2>
          <p className="text-sm mb-4">
            Could not retrieve profile information for user ID <code className="text-xs bg-red-950 px-1 py-0.5 rounded">{userId}</code>.
          </p>
          <Link href="/admin/users" className="text-white hover:underline flex items-center text-xs">
            <ArrowLeft size={14} className="mr-1.5" />
            Back to User Directory
          </Link>
        </div>
      </div>
    )
  }

  const { profile, projects, events, firmwareGenCount } = data

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <Link
          href="/admin/users"
          className="inline-flex items-center text-xs text-zinc-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={14} className="mr-1.5" />
          Back to User Directory
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl font-bold text-white">
              {profile.full_name?.charAt(0).toUpperCase() || <User size={24} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{profile.full_name || 'Unnamed User'}</h1>
                {profile.role === 'admin' && (
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs font-bold rounded border border-purple-500/40">
                    ADMIN
                  </span>
                )}
              </div>
              <p className="text-zinc-400 text-sm">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
          <span className="text-xs text-zinc-500 block mb-1">Company / Org</span>
          <span className="text-sm font-semibold text-white truncate block">
            {profile.company_name || 'Not provided'}
          </span>
        </div>
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
          <span className="text-xs text-zinc-500 block mb-1">User Role / Type</span>
          <span className="text-sm font-semibold text-purple-300 truncate block">
            {profile.user_type || 'Unspecified'}
          </span>
        </div>
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
          <span className="text-xs text-zinc-500 block mb-1">Projects Created</span>
          <span className="text-sm font-semibold text-white block">{projects.length}</span>
        </div>
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4">
          <span className="text-xs text-zinc-500 block mb-1">Firmware Generations</span>
          <span className="text-sm font-semibold text-emerald-400 block">{firmwareGenCount}</span>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-base font-semibold text-white mb-4 border-b border-zinc-800 pb-3">
          Profile Meta & Timestamps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-zinc-500 shrink-0" />
              <div>
                <span className="text-xs text-zinc-500 block">Email Address</span>
                <span className="text-white font-medium">{profile.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building size={16} className="text-zinc-500 shrink-0" />
              <div>
                <span className="text-xs text-zinc-500 block">Company Name</span>
                <span className="text-white font-medium">{profile.company_name || 'Not provided'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase size={16} className="text-zinc-500 shrink-0" />
              <div>
                <span className="text-xs text-zinc-500 block">Job Title</span>
                <span className="text-white font-medium">{profile.job_title || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-zinc-500 shrink-0" />
              <div>
                <span className="text-xs text-zinc-500 block">Signed Up On</span>
                <span className="text-white font-medium">
                  {new Date(profile.created_at).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-zinc-500 shrink-0" />
              <div>
                <span className="text-xs text-zinc-500 block">Last Active</span>
                <span className="text-white font-medium">
                  {new Date(profile.last_active_at).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-zinc-500 shrink-0" />
              <div>
                <span className="text-xs text-zinc-500 block">User Internal ID</span>
                <span className="text-zinc-400 font-mono text-xs">{profile.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Projects List */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-base font-semibold text-white mb-4 border-b border-zinc-800 pb-3 flex items-center justify-between">
          <span>Projects ({projects.length})</span>
        </h3>
        {projects.length === 0 ? (
          <p className="text-xs text-zinc-500 italic">This user has not created any projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Cpu size={16} className="text-purple-400 shrink-0" />
                  <span className="font-semibold text-white text-sm truncate">{p.name}</span>
                </div>
                <div className="text-xs text-blue-400 mb-2">{p.platform}</div>
                {p.description && (
                  <p className="text-xs text-zinc-400 line-clamp-2 mb-2">{p.description}</p>
                )}
                <div className="text-[11px] text-zinc-500 border-t border-zinc-900 pt-2 mt-2 flex justify-between">
                  <span>Docs: {p.doc_count || 0}</span>
                  <span>{new Date(p.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Events Timeline */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-base font-semibold text-white mb-4 border-b border-zinc-800 pb-3 flex items-center gap-2">
          <Activity size={18} className="text-purple-400" />
          Product Activity History ({events.length})
        </h3>

        {events.length === 0 ? (
          <p className="text-xs text-zinc-500 italic">No activity recorded for this user yet.</p>
        ) : (
          <div className="relative border-l border-zinc-800 ml-3 space-y-6 py-2">
            {events.map((ev) => (
              <div key={ev.id} className="relative pl-6">
                <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-purple-500 border-2 border-zinc-900" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {ev.event_type}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    {new Date(ev.created_at).toLocaleString()}
                  </span>
                </div>
                {ev.metadata && (
                  <pre className="mt-1 bg-zinc-950 border border-zinc-800/80 rounded-md p-2 text-[11px] text-zinc-400 font-mono overflow-x-auto">
                    {JSON.stringify(ev.metadata, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
