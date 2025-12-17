import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function createClient() {
  // Next.js 15/16: cookies() bisa async tergantung versi, jadi aman pakai await
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // beberapa versi cookieStore tidak punya getAll() -> fallback pakai .get() tidak ideal
          // tapi pada Next 15/16 normalnya ada getAll()
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // set cookie bisa gagal di Server Component murni (read-only),
            // tapi aman untuk Server Actions (register/login/logout)
          }
        },
      },
    }
  )
}
