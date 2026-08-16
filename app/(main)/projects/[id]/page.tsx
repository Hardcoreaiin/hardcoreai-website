'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Cpu, Loader2, FileText, MessageSquare, Wand2 } from 'lucide-react'
import { Toaster } from 'sonner'
import { useProject } from '@/lib/api'
import { UploadZone } from '@/components/documents/UploadZone'
import { DocList } from '@/components/documents/DocList'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase'
import { useEffect } from 'react'

const TABS = [
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'generate', label: 'Generate', icon: Wand2 },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const { data: project, isLoading, isError } = useProject(projectId)
  const [activeTab, setActiveTab] = useState('documents')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id)
        import('@/lib/analytics').then(({ trackEvent }) => {
          trackEvent('PROJECT_OPENED', { projectId })
        })
      }
    })
  }, [projectId])

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-zinc-500">
        <Loader2 className="animate-spin mr-3" size={24} />
        Loading project details...
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="p-8">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-red-400 max-w-2xl">
          <h2 className="text-xl font-bold mb-2">Project not found</h2>
          <p className="mb-4">
            We couldn't load the details for this project. It might have been deleted or you may not have access.
          </p>
          <Link href="/dashboard" className="text-white hover:underline flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Toaster richColors position="bottom-right" />
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col animate-in fade-in duration-500">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center text-white border border-zinc-700">
                  <Cpu size={24} />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">{project.name}</h1>
                <span className="ml-2 px-2.5 py-1 bg-zinc-800 text-xs font-medium text-blue-400 rounded-md border border-zinc-700">
                  {project.platform}
                </span>
              </div>
              {project.description && (
                <p className="text-zinc-400 mt-2 max-w-3xl leading-relaxed">{project.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-zinc-800 mb-6 flex gap-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center pb-4 text-sm font-medium border-b-2 transition-colors relative top-[1px]',
                activeTab === tab.id
                  ? 'border-white text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              )}
            >
              <tab.icon size={16} className="mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'documents' && (
          <div className="flex flex-col gap-8">
            {userId ? (
              <UploadZone
                projectId={projectId}
                userId={userId}
                onUploadComplete={() => {}}
              />
            ) : (
              <div className="flex items-center gap-2 text-zinc-500">
                <Loader2 size={16} className="animate-spin" />
                Loading uploader...
              </div>
            )}
            <DocList projectId={projectId} />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex items-center justify-center text-zinc-500 shadow-inner">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-medium text-white mb-2">Project Chat</h3>
              <p className="max-w-md">
                Chat with your AI assistant about the hardware constraints and firmware logic for{' '}
                {project.name}.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'generate' && (
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex items-center justify-center text-zinc-500 shadow-inner">
            <div className="text-center">
              <Wand2 size={48} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-medium text-white mb-2">Generate</h3>
              <p className="max-w-md">
                Generate schematic layouts, boilerplate code, and pinout configurations automatically.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
