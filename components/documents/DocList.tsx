'use client'

import { useDocuments } from '@/lib/api'
import { DocCard } from './DocCard'
import { FileText, Loader2 } from 'lucide-react'

interface DocListProps {
  projectId: string
}

export function DocList({ projectId }: DocListProps) {
  const { data: documents, isLoading, isError } = useDocuments(projectId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-zinc-500">
        <Loader2 className="animate-spin mr-3" size={20} />
        Loading documents...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center text-red-400 text-sm">
        Failed to load documents. Please refresh.
      </div>
    )
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-14 w-14 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
          <FileText size={24} className="text-zinc-600" />
        </div>
        <p className="text-zinc-400 font-medium">No documents yet</p>
        <p className="text-zinc-600 text-sm mt-1">Upload PDFs above to get started</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-zinc-400">
          {documents.length} document{documents.length !== 1 ? 's' : ''}
        </h3>
        <span className="text-xs text-zinc-600">Auto-refreshing every 5s</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <DocCard key={doc.id} doc={doc} projectId={projectId} />
        ))}
      </div>
    </div>
  )
}
