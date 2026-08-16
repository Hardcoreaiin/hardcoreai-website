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

export type UserType =
  | 'Student'
  | 'Hobbyist/Maker'
  | 'Embedded Engineer'
  | 'Firmware Engineer'
  | 'Founder'
  | 'CTO'
  | 'Engineering Lead'
  | 'Researcher'
  | 'Other'

export type UserRole = 'user' | 'admin'

export interface UserProfile {
  id: string
  user_id: string
  email: string
  full_name?: string
  company_name?: string
  job_title?: string
  user_type?: UserType | string
  role: UserRole
  avatar_url?: string
  last_active_at: string
  created_at: string
  updated_at: string
  project_count?: number
}

export type EventType =
  | 'USER_SIGNED_UP'
  | 'USER_LOGGED_IN'
  | 'PROJECT_CREATED'
  | 'PROJECT_OPENED'
  | 'PROJECT_UPDATED'
  | 'FIRMWARE_GENERATION_STARTED'
  | 'FIRMWARE_GENERATION_COMPLETED'
  | 'FIRMWARE_GENERATION_FAILED'
  | 'DOCUMENT_UPLOADED'
  | 'PROJECT_DELETED'
  | 'USER_PROFILE_UPDATED'

export interface UserEvent {
  id: string
  user_id: string
  event_type: EventType | string
  project_id?: string
  metadata?: Record<string, any>
  created_at: string
}

export interface AdminOverviewStats {
  totalUsers: number
  newUsers24h: number
  newUsers7d: number
  newUsers30d: number
  activeUsers7d: number
  activeUsers30d: number
  totalCompanies: number
  totalProjects: number
  totalFirmwareGenerations: number
  totalDocumentsUploaded: number
}

export interface CompanyAnalytics {
  companyName: string
  suggestedDomain?: string
  userCount: number
  activeUserCount: number
  projectCount: number
  firmwareGenerationsCount: number
  lastActiveAt: string
  users: UserProfile[]
}

export interface FunnelMetrics {
  signups: number
  activatedUsers: number // Created at least 1 project
  firstValueUsers: number // Uploaded doc or generated firmware
  returningUsers: number // > 1 session / active after initial day
  paidUsers: number // 0 or billing count
}

export interface RetentionMetrics {
  day1: number // % active Day 1 after signup
  day7: number // % active Day 7
  day30: number // % active Day 30
  wau: number // Weekly Active Users
  mau: number // Monthly Active Users
}
