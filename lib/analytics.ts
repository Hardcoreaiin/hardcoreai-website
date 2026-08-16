import { createClient as createBrowserClient } from './supabase'
import { EventType } from './types'

let lastActiveThrottle: number | null = null
const THROTTLE_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes throttle for DB updates

/**
 * Tracks a product usage event in `public.user_events` and updates `last_active_at` on `public.profiles`.
 */
export async function trackEvent(
  eventType: EventType | string,
  options?: {
    projectId?: string
    metadata?: Record<string, any>
  }
) {
  try {
    const supabase = createBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    // 1. Insert event into user_events table
    await supabase.from('user_events').insert({
      user_id: user.id,
      event_type: eventType,
      project_id: options?.projectId || null,
      metadata: options?.metadata || null,
    })

    // 2. Throttle last_active_at update to prevent excessive DB writes
    const now = Date.now()
    if (!lastActiveThrottle || now - lastActiveThrottle > THROTTLE_INTERVAL_MS) {
      lastActiveThrottle = now
      await supabase
        .from('profiles')
        .update({ last_active_at: new Date().toISOString() })
        .eq('id', user.id)
    }
  } catch (error) {
    // Analytics logging should be silent and never crash user workflow
    console.warn('[Analytics] Track event warning:', error)
  }
}

/**
 * Server-side event tracking helper for API routes and Server Actions
 */
export async function trackServerEvent(
  supabaseServerClient: any,
  userId: string,
  eventType: EventType | string,
  options?: {
    projectId?: string
    metadata?: Record<string, any>
  }
) {
  try {
    if (!userId) return

    await supabaseServerClient.from('user_events').insert({
      user_id: userId,
      event_type: eventType,
      project_id: options?.projectId || null,
      metadata: options?.metadata || null,
    })

    await supabaseServerClient
      .from('profiles')
      .update({ last_active_at: new Date().toISOString() })
      .eq('id', userId)
  } catch (error) {
    console.warn('[Analytics] Track server event warning:', error)
  }
}
