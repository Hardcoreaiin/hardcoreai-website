import { useQuery } from '@tanstack/react-query'
import { createClient } from './supabase'
import {
  AdminOverviewStats,
  UserProfile,
  UserEvent,
  CompanyAnalytics,
  FunnelMetrics,
  RetentionMetrics,
} from './types'

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async (): Promise<AdminOverviewStats> => {
      const supabase = createClient()
      const now = new Date()

      const d24h = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
      const d7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const d30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()

      // Fetch profiles count & details
      const { data: profiles, error: profError } = await supabase
        .from('profiles')
        .select('*')

      if (profError) throw profError

      const totalUsers = profiles.length
      const newUsers24h = profiles.filter((p) => p.created_at >= d24h).length
      const newUsers7d = profiles.filter((p) => p.created_at >= d7d).length
      const newUsers30d = profiles.filter((p) => p.created_at >= d30d).length
      const activeUsers7d = profiles.filter((p) => p.last_active_at >= d7d).length
      const activeUsers30d = profiles.filter((p) => p.last_active_at >= d30d).length

      // Count unique companies
      const companies = new Set(
        profiles.map((p) => p.company_name?.trim()).filter(Boolean)
      )

      // Count projects
      const { count: projectCount, error: projError } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })

      if (projError) console.warn('[Admin] Projects count warning:', projError)

      // Count firmware generations from user_events
      const { count: fwCount, error: fwError } = await supabase
        .from('user_events')
        .select('*', { count: 'exact', head: true })
        .in('event_type', ['FIRMWARE_GENERATION_STARTED', 'FIRMWARE_GENERATION_COMPLETED'])

      if (fwError) console.warn('[Admin] Firmware count warning:', fwError)

      // Count documents uploaded
      const { count: docCount } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true })

      return {
        totalUsers,
        newUsers24h,
        newUsers7d,
        newUsers30d,
        activeUsers7d,
        activeUsers30d,
        totalCompanies: companies.size,
        totalProjects: projectCount || 0,
        totalFirmwareGenerations: fwCount || 0,
        totalDocumentsUploaded: docCount || 0,
      }
    },
    refetchInterval: 30000,
  })
}

export function useAdminUsers(options?: {
  search?: string
  userType?: string
  sortBy?: 'newest' | 'active'
}) {
  return useQuery({
    queryKey: ['admin', 'users', options?.search, options?.userType, options?.sortBy],
    queryFn: async (): Promise<UserProfile[]> => {
      const supabase = createClient()
      let query = supabase.from('profiles').select('*')

      if (options?.userType && options.userType !== 'ALL') {
        query = query.eq('user_type', options.userType)
      }

      if (options?.sortBy === 'active') {
        query = query.order('last_active_at', { ascending: false })
      } else {
        query = query.order('created_at', { ascending: false })
      }

      const { data: profiles, error } = await query
      if (error) throw error

      // Also get project counts per user
      const { data: projects } = await supabase.from('projects').select('user_id')
      const projectMap: Record<string, number> = {}
      projects?.forEach((p) => {
        projectMap[p.user_id] = (projectMap[p.user_id] || 0) + 1
      })

      let result = (profiles as UserProfile[]).map((p) => ({
        ...p,
        project_count: projectMap[p.id] || 0,
      }))

      if (options?.search) {
        const q = options.search.toLowerCase().trim()
        result = result.filter(
          (u) =>
            u.full_name?.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.company_name?.toLowerCase().includes(q)
        )
      }

      return result
    },
  })
}

export function useAdminUserDetail(userId: string) {
  return useQuery({
    queryKey: ['admin', 'user', userId],
    queryFn: async () => {
      const supabase = createClient()

      const { data: profile, error: profError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profError) throw profError

      const { data: userProjects } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

      const { data: events } = await supabase
        .from('user_events')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      const firmwareGenCount =
        events?.filter((e) =>
          ['FIRMWARE_GENERATION_STARTED', 'FIRMWARE_GENERATION_COMPLETED'].includes(
            e.event_type
          )
        ).length || 0

      return {
        profile: profile as UserProfile,
        projects: userProjects || [],
        events: (events as UserEvent[]) || [],
        firmwareGenCount,
      }
    },
    enabled: !!userId,
  })
}

export function useAdminCompanies() {
  return useQuery({
    queryKey: ['admin', 'companies'],
    queryFn: async (): Promise<CompanyAnalytics[]> => {
      const supabase = createClient()

      const { data: profiles } = await supabase.from('profiles').select('*')
      const { data: projects } = await supabase.from('projects').select('user_id')
      const { data: events } = await supabase.from('user_events').select('user_id, event_type')

      if (!profiles) return []

      const d7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const companyMap: Record<string, UserProfile[]> = {}

      profiles.forEach((p) => {
        let comp = p.company_name?.trim()
        if (!comp && p.email) {
          const domain = p.email.split('@')[1]
          if (
            domain &&
            !['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'].includes(domain.toLowerCase())
          ) {
            comp = `Suggested: ${domain}`
          }
        }
        if (!comp) comp = 'Individual / Unspecified'

        if (!companyMap[comp]) companyMap[comp] = []
        companyMap[comp].push(p as UserProfile)
      })

      const projCountMap: Record<string, number> = {}
      projects?.forEach((pr) => {
        projCountMap[pr.user_id] = (projCountMap[pr.user_id] || 0) + 1
      })

      const fwCountMap: Record<string, number> = {}
      events?.forEach((ev) => {
        if (
          ['FIRMWARE_GENERATION_STARTED', 'FIRMWARE_GENERATION_COMPLETED'].includes(
            ev.event_type
          )
        ) {
          fwCountMap[ev.user_id] = (fwCountMap[ev.user_id] || 0) + 1
        }
      })

      const result: CompanyAnalytics[] = Object.keys(companyMap).map((compName) => {
        const users = companyMap[compName]
        const activeUsers = users.filter((u) => u.last_active_at >= d7d).length
        const totalProjects = users.reduce((acc, u) => acc + (projCountMap[u.id] || 0), 0)
        const totalFw = users.reduce((acc, u) => acc + (fwCountMap[u.id] || 0), 0)

        const latestActive = users.reduce((latest, u) => {
          return !latest || u.last_active_at > latest ? u.last_active_at : latest
        }, '')

        return {
          companyName: compName,
          userCount: users.length,
          activeUserCount: activeUsers,
          projectCount: totalProjects,
          firmwareGenerationsCount: totalFw,
          lastActiveAt: latestActive,
          users,
        }
      })

      return result.sort((a, b) => b.userCount - a.userCount)
    },
  })
}

export function useAdminFunnelAndRetention() {
  return useQuery({
    queryKey: ['admin', 'funnel-retention'],
    queryFn: async () => {
      const supabase = createClient()

      const { data: profiles } = await supabase.from('profiles').select('*')
      const { data: projects } = await supabase.from('projects').select('user_id')
      const { data: events } = await supabase.from('user_events').select('*')

      const totalUsers = profiles?.length || 0

      // Users who created a project
      const activatedUsersSet = new Set(projects?.map((p) => p.user_id))
      const activatedUsers = activatedUsersSet.size

      // First value: uploaded doc or generated fw
      const firstValueUsersSet = new Set(
        events
          ?.filter((e) =>
            ['DOCUMENT_UPLOADED', 'FIRMWARE_GENERATION_STARTED', 'FIRMWARE_GENERATION_COMPLETED'].includes(e.event_type)
          )
          .map((e) => e.user_id)
      )
      const firstValueUsers = firstValueUsersSet.size

      // Returning users: logged in / active > 1 time
      const returningUsersSet = new Set(
        events
          ?.filter((e) => ['USER_LOGGED_IN', 'PROJECT_OPENED'].includes(e.event_type))
          .map((e) => e.user_id)
      )
      const returningUsers = returningUsersSet.size

      const funnel: FunnelMetrics = {
        signups: totalUsers,
        activatedUsers,
        firstValueUsers,
        returningUsers,
        paidUsers: 0,
      }

      // WAU / MAU
      const now = new Date()
      const d7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const d30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()

      const wau = profiles?.filter((p) => p.last_active_at >= d7d).length || 0
      const mau = profiles?.filter((p) => p.last_active_at >= d30d).length || 0

      // Retention rates approximation
      let d1Count = 0
      let d7Count = 0
      let d30Count = 0

      profiles?.forEach((p) => {
        const created = new Date(p.created_at).getTime()
        const lastActive = new Date(p.last_active_at).getTime()
        const diffDays = (lastActive - created) / (1000 * 60 * 60 * 24)

        if (diffDays >= 1) d1Count++
        if (diffDays >= 7) d7Count++
        if (diffDays >= 30) d30Count++
      })

      const retention: RetentionMetrics = {
        day1: totalUsers > 0 ? Math.round((d1Count / totalUsers) * 100) : 0,
        day7: totalUsers > 0 ? Math.round((d7Count / totalUsers) * 100) : 0,
        day30: totalUsers > 0 ? Math.round((d30Count / totalUsers) * 100) : 0,
        wau,
        mau,
      }

      return { funnel, retention }
    },
  })
}
