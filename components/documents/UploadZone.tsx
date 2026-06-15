'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'
import { UploadCloud, X, FileText, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadState {
  file: File
  progress: number
  status: 'uploading' | 'inserting' | 'ingesting' | 'done' | 'error'
  error?: string
}

interface UploadZoneProps {
  projectId: string
  userId: string
  onUploadComplete: () => void
}

export function UploadZone({ projectId, userId, onUploadComplete }: UploadZoneProps) {
  const [uploads, setUploads] = useState<FileUploadState[]>([])

  const updateUpload = (fileName: string, patch: Partial<FileUploadState>) => {
    setUploads((prev) =>
      prev.map((u) => (u.file.name === fileName ? { ...u, ...patch } : u))
    )
  }

  const uploadFile = async (file: File) => {
    const supabase = createClient()
    const storagePath = `${userId}/${projectId}/${Date.now()}_${file.name}`

    // 1. Upload to Supabase Storage with progress tracking via XMLHttpRequest
    const { error: uploadError } = await supabase.storage
      .from('project-documents')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      updateUpload(file.name, { status: 'error', error: uploadError.message })
      toast.error(`Failed to upload ${file.name}: ${uploadError.message}`)
      return
    }

    updateUpload(file.name, { progress: 80, status: 'inserting' })

    // 2. Insert into documents table
    const { data: doc, error: dbError } = await supabase
      .from('documents')
      .insert([{
        project_id: projectId,
        storage_path: storagePath,
        name: file.name,
        status: 'pending',
        size: file.size,
        user_id: userId,
      }])
      .select()
      .single()

    if (dbError || !doc) {
      updateUpload(file.name, { status: 'error', error: dbError?.message ?? 'DB insert failed' })
      toast.error(`Failed to register ${file.name}`)
      return
    }

    updateUpload(file.name, { progress: 90, status: 'ingesting' })

    // 3. Trigger ingestion API
    try {
      const res = await fetch(`/api/ingest/${doc.id}`, { method: 'POST' })
      if (!res.ok) {
        throw new Error(`Ingest API returned ${res.status}`)
      }
    } catch (err) {
      // Non-fatal: the doc is uploaded, just ingestion trigger failed
      toast.warning(`${file.name} uploaded but ingestion trigger failed. It will retry.`)
    }

    updateUpload(file.name, { progress: 100, status: 'done' })
    toast.success(`${file.name} uploaded successfully!`)
    onUploadComplete()
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newUploads: FileUploadState[] = acceptedFiles.map((file) => ({
        file,
        progress: 0,
        status: 'uploading',
      }))
      setUploads((prev) => [...prev, ...newUploads])

      // Simulate progress during upload (Supabase SDK doesn't expose XHR progress)
      const progressTimers: NodeJS.Timeout[] = []
      newUploads.forEach((u) => {
        let prog = 0
        const timer = setInterval(() => {
          prog = Math.min(prog + 10, 70)
          updateUpload(u.file.name, { progress: prog })
          if (prog >= 70) clearInterval(timer)
        }, 200)
        progressTimers.push(timer)
      })

      await Promise.allSettled(acceptedFiles.map((file) => uploadFile(file)))

      progressTimers.forEach(clearInterval)
    },
    [projectId, userId]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 5,
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  const removeUpload = (fileName: string) => {
    setUploads((prev) => prev.filter((u) => u.file.name !== fileName))
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all',
          isDragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 hover:bg-zinc-900'
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud
          size={40}
          className={cn('mb-3', isDragActive ? 'text-blue-400' : 'text-zinc-500')}
        />
        {isDragActive ? (
          <p className="text-blue-400 font-medium">Drop your PDFs here...</p>
        ) : (
          <>
            <p className="text-white font-medium mb-1">Drag & drop PDFs here</p>
            <p className="text-sm text-zinc-500">or click to browse — up to 5 files, max 50MB each</p>
          </>
        )}
      </div>

      {fileRejections.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          {fileRejections.map(({ file, errors }) => (
            <p key={file.name} className="text-sm text-red-400">
              <span className="font-medium">{file.name}</span>: {errors.map((e) => e.message).join(', ')}
            </p>
          ))}
        </div>
      )}

      {uploads.length > 0 && (
        <div className="space-y-2">
          {uploads.map(({ file, progress, status, error }) => (
            <div
              key={file.name}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center gap-3"
            >
              <FileText size={18} className="text-red-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-white font-medium truncate">{file.name}</p>
                  <span className="text-xs text-zinc-500 ml-2 shrink-0">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5">
                  <div
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      status === 'error' ? 'bg-red-500' : status === 'done' ? 'bg-green-500' : 'bg-blue-500'
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
                <p className="text-xs text-zinc-500 mt-0.5 capitalize">
                  {status === 'uploading' && 'Uploading to storage...'}
                  {status === 'inserting' && 'Saving document record...'}
                  {status === 'ingesting' && 'Triggering ingestion...'}
                  {status === 'done' && 'Complete!'}
                  {status === 'error' && 'Upload failed'}
                </p>
              </div>
              {(status === 'done' || status === 'error') && (
                <button
                  onClick={() => removeUpload(file.name)}
                  className="shrink-0 text-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
              {(status === 'uploading' || status === 'inserting' || status === 'ingesting') && (
                <Loader2 size={16} className="animate-spin text-blue-400 shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
