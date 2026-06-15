'use client'

import { useState } from 'react'
import { FileText, Trash2, Eye, ChevronDown, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteDocument, useUpdateDocumentType } from '@/lib/api'
import { ProjectDocument, DocumentStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

const DOC_TYPES = ['datasheet', 'reference manual', 'errata', 'schematic']

const STATUS_CONFIG: Record<DocumentStatus, { label: string; icon: React.ReactNode; className: string }> = {
  pending: {
    label: 'Pending',
    icon: <Clock size={12} />,
    className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  },
  processing: {
    label: 'Processing',
    icon: <Loader2 size={12} className="animate-spin" />,
    className: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },
  ready: {
    label: 'Ready',
    icon: <CheckCircle size={12} />,
    className: 'bg-green-500/15 text-green-400 border-green-500/30',
  },
  error: {
    label: 'Error',
    icon: <AlertCircle size={12} />,
    className: 'bg-red-500/15 text-red-400 border-red-500/30',
  },
}

interface DocCardProps {
  doc: ProjectDocument
  projectId: string
}

export function DocCard({ doc, projectId }: DocCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)

  const deleteMutation = useDeleteDocument()
  const updateTypeMutation = useUpdateDocumentType()

  const statusConfig = STATUS_CONFIG[doc.status]

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(doc.created_at))

  const formattedSize = doc.size
    ? doc.size > 1024 * 1024
      ? `${(doc.size / 1024 / 1024).toFixed(1)} MB`
      : `${(doc.size / 1024).toFixed(0)} KB`
    : null

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({ id: doc.id, storage_path: doc.storage_path })
      toast.success(`"${doc.name}" deleted.`)
    } catch (err) {
      toast.error('Failed to delete document.')
    }
    setShowDeleteConfirm(false)
  }

  const handleUpdateType = async (doc_type: string) => {
    try {
      await updateTypeMutation.mutateAsync({ id: doc.id, doc_type })
      toast.success(`Document type updated to "${doc_type}".`)
    } catch (err) {
      toast.error('Failed to update document type.')
    }
    setIsTypeDropdownOpen(false)
  }

  const handlePreview = async () => {
    const { createClient } = await import('@/lib/supabase')
    const supabase = createClient()
    const { data } = supabase.storage
      .from('project-documents')
      .getPublicUrl(doc.storage_path)
    window.open(data.publicUrl, '_blank')
  }

  return (
    <>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3 hover:border-zinc-700 transition-all">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center shrink-0">
            <FileText size={20} className="text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate leading-tight" title={doc.name}>
              {doc.name}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border',
                  statusConfig.className
                )}
              >
                {statusConfig.icon}
                {statusConfig.label}
              </span>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
          {formattedSize && <span>{formattedSize}</span>}
          {doc.page_count && <span>·</span>}
          {doc.page_count && <span>{doc.page_count} pages</span>}
          <span>·</span>
          <span>{formattedDate}</span>
        </div>

        {/* Doc Type Selector */}
        <div className="relative">
          <button
            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-300 hover:border-zinc-700 transition-colors"
          >
            <span className="capitalize">{doc.doc_type || 'Select type...'}</span>
            <ChevronDown size={14} className="text-zinc-500" />
          </button>
          {isTypeDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-md shadow-xl z-20 py-1">
              {DOC_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => handleUpdateType(type)}
                  disabled={updateTypeMutation.isPending}
                  className={cn(
                    'w-full text-left px-3 py-1.5 text-xs capitalize hover:bg-zinc-800 hover:text-white transition-colors',
                    doc.doc_type === type ? 'text-blue-400' : 'text-zinc-300'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1 border-t border-zinc-800">
          <button
            onClick={handlePreview}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-md transition-colors"
          >
            <Eye size={13} />
            Preview
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-colors"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirm Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Document</h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete{' '}
              <span className="text-white font-medium">"{doc.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors flex items-center disabled:opacity-60"
              >
                {deleteMutation.isPending && <Loader2 size={14} className="animate-spin mr-2" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
