import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Ensure profile exists
        await supabase.from('profiles').upsert({
          id: user.id,
          user_id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
          avatar_url: user.user_metadata?.avatar_url,
          last_active_at: new Date().toISOString(),
        }, { onConflict: 'id' })

        // Log login event
        await supabase.from('user_events').insert({
          user_id: user.id,
          event_type: 'USER_LOGGED_IN',
          metadata: { provider: user.app_metadata?.provider || 'oauth' },
        })
      }

      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect(new URL('/login?error=Could not authenticate', request.url))
}
