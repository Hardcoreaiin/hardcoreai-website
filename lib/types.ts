export interface Project {
  id: string
  name: string
  platform: string
  description?: string
  doc_count: number
  created_at: string
  updated_at: string
  user_id: string
}

export type DocumentStatus = 'pending' | 'processing' | 'ready' | 'error'

export interface ProjectDocument {
  id: string
  project_id: string
  storage_path: string
  name: string
  status: DocumentStatus
  doc_type?: string
  size?: number
  page_count?: number
  created_at: string
  updated_at: string
  user_id: string
}
