'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Search, Check, Loader2 } from 'lucide-react'
import { useProjectStore } from '@/lib/store'
import { useCreateProject } from '@/lib/api'
import { cn } from '@/lib/utils'

const PLATFORMS = [
  'STM32',
  'ESP32',
  'nRF52',
  'NXP',
  'Infineon',
  'Microchip',
  'RISC-V',
  'Arduino',
  'Raspberry Pi'
]

export function NewProjectModal() {
  const { isNewProjectModalOpen, closeNewProjectModal } = useProjectStore()
  const createMutation = useCreateProject()
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [platform, setPlatform] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!isNewProjectModalOpen) return null

  const filteredPlatforms = PLATFORMS.filter(p => p.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !platform) return

    try {
      await createMutation.mutateAsync({ name, platform, description })
      // Reset form on success
      setName('')
      setDescription('')
      setPlatform('')
      setSearchQuery('')
      closeNewProjectModal()
    } catch (error) {
      console.error('Failed to create project:', error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-white">New Project</h2>
          <button 
            onClick={closeNewProjectModal}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Project Name <span className="text-red-400">*</span></label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Smart Thermostat Controller"
              required
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-zinc-600"
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Platform <span className="text-red-400">*</span></label>
            <div 
              className={cn(
                "w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 transition-all",
                !platform && "text-zinc-500"
              )}
              onClick={() => setIsDropdownOpen(true)}
            >
              <span className={platform ? "text-white" : ""}>{platform || "Select a platform..."}</span>
              <Search size={16} className="text-zinc-500" />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-md shadow-xl z-20 overflow-hidden max-h-60 flex flex-col">
                <div className="p-2 border-b border-zinc-800 sticky top-0 bg-zinc-900">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search platforms..."
                    className="w-full px-2 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-sm text-white focus:outline-none focus:border-zinc-700"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto p-1">
                  {filteredPlatforms.length > 0 ? (
                    filteredPlatforms.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setPlatform(p)
                          setIsDropdownOpen(false)
                          setSearchQuery('')
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white rounded flex items-center justify-between"
                      >
                        {p}
                        {platform === p && <Check size={14} className="text-blue-400" />}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-4 text-center text-sm text-zinc-500">No platforms found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe what this project does..."
              rows={3}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-zinc-600 resize-none"
            />
          </div>

          {createMutation.isError && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md">
              Failed to create project. Please try again.
            </div>
          )}

          <div className="mt-4 flex gap-3 justify-end">
            <button 
              type="button" 
              onClick={closeNewProjectModal}
              className="px-4 py-2 rounded-md font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={createMutation.isPending || !name || !platform}
              className="px-4 py-2 rounded-md font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center"
            >
              {createMutation.isPending && <Loader2 size={16} className="animate-spin mr-2" />}
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
