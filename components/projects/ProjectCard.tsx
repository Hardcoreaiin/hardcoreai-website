'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { MoreVertical, Edit2, Trash2, Cpu, FileText, Calendar } from 'lucide-react'
import { useDeleteProject } from '@/lib/api'

interface ProjectCardProps {
  id: string
  name: string
  platform: string
  docCount: number
  updatedAt: string
}

export function ProjectCard({ id, name, platform, docCount, updatedAt }: ProjectCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const deleteMutation = useDeleteProject()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteMutation.mutateAsync(id)
    }
    setIsMenuOpen(false)
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(updatedAt))

  return (
    <Link href={`/projects/${id}`} className="block group">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-all hover:shadow-lg relative h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-white border border-zinc-700 group-hover:border-zinc-600 transition-colors">
              <Cpu size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg leading-tight group-hover:text-blue-400 transition-colors">{name}</h3>
              <span className="inline-block mt-1 px-2 py-0.5 bg-zinc-800 text-xs font-medium text-zinc-300 rounded-md border border-zinc-700">
                {platform}
              </span>
            </div>
          </div>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={(e) => {
                e.preventDefault()
                setIsMenuOpen(!isMenuOpen)
              }}
              className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
            >
              <MoreVertical size={18} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-zinc-900 border border-zinc-800 rounded-md shadow-xl z-10 py-1">
                <button 
                  onClick={(e) => { e.preventDefault(); setIsMenuOpen(false) }}
                  className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center"
                >
                  <Edit2 size={14} className="mr-2" />
                  Edit
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 flex items-center disabled:opacity-50"
                >
                  <Trash2 size={14} className="mr-2" />
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-1.5">
            <FileText size={14} />
            <span>{docCount} docs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
