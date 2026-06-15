import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from './supabase'
import { Project } from './types'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false })
      
      if (error) throw error
      return data as Project[]
    },
  })
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data as Project
    },
    enabled: !!id,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (newProject: { name: string; platform: string; description?: string }) => {
      const supabase = createClient()
      
      // Need user_id for RLS, usually Supabase infers it, but we can pass it if needed.
      // Assuming RLS automatically sets user_id or it's handled by default.
      const { data, error } = await supabase
        .from('projects')
        .insert([
          { 
            name: newProject.name, 
            platform: newProject.platform, 
            description: newProject.description,
            doc_count: 0
          }
        ])
        .select()
        .single()
        
      if (error) throw error
      return data as Project
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient()
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        
      if (error) throw error
      return true
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useDocuments(projectId: string) {
  return useQuery({
    queryKey: ['documents', projectId],
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as import('./types').ProjectDocument[]
    },
    enabled: !!projectId,
    refetchInterval: 5000,
  })
}

export function useUpdateDocumentType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, doc_type }: { id: string; doc_type: string }) => {
      const supabase = createClient()
      const { error } = await supabase
        .from('documents')
        .update({ doc_type })
        .eq('id', id)

      if (error) throw error
      return true
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}

export function useDeleteDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, storage_path }: { id: string; storage_path: string }) => {
      const supabase = createClient()

      const { error: storageError } = await supabase
        .storage
        .from('project-documents')
        .remove([storage_path])

      if (storageError) throw storageError

      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)

      if (dbError) throw dbError
      return true
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
