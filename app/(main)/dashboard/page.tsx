'use client'

import { useProjects } from '@/lib/api'
import { useProjectStore } from '@/lib/store'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { NewProjectModal } from '@/components/projects/NewProjectModal'
import { Plus, Loader2 } from 'lucide-react'

import { ProfileCompletionCard } from '@/components/onboarding/ProfileCompletionCard'

export default function DashboardPage() {
  const { data: projects, isLoading, isError } = useProjects()
  const { openNewProjectModal } = useProjectStore()

  return (
    <div className="max-w-6xl mx-auto w-full h-full animate-in fade-in duration-500">
      <ProfileCompletionCard />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Projects</h1>
          <p className="text-zinc-400 mt-1">Manage your embedded AI workspaces.</p>
        </div>
        <button
          onClick={openNewProjectModal}
          className="bg-white text-zinc-950 px-4 py-2 rounded-md font-medium hover:bg-zinc-200 transition-colors flex items-center shadow-lg"
        >
          <Plus size={18} className="mr-2" />
          New Project
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
          <Loader2 className="animate-spin mb-4" size={32} />
          <p>Loading your projects...</p>
        </div>
      ) : isError ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center text-red-400">
          <p>Failed to load projects. Please refresh the page.</p>
        </div>
      ) : projects?.length === 0 ? (
        <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-12 text-center flex flex-col items-center">
          <div className="h-16 w-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-600">
            <Plus size={24} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-zinc-400 mb-6 max-w-md">
            Create your first project to start generating hardware schematics and analyzing datasheets.
          </p>
          <button
            onClick={openNewProjectModal}
            className="bg-zinc-800 text-white px-5 py-2.5 rounded-md font-medium hover:bg-zinc-700 transition-colors"
          >
            Create New Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects?.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              platform={project.platform}
              docCount={project.doc_count || 0}
              updatedAt={project.updated_at}
            />
          ))}
        </div>
      )}

      <NewProjectModal />
    </div>
  )
}
