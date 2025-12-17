import { createClient } from '@/utils/supabase/server'
import { logout } from '@/actions/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: announcements } = await supabase
    .from('announcements')
    .select()
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Welcome, {user.email}
        </h1>

        <form action={logout}>
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            Logout
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        {announcements?.map((a) => (
          <div
            key={a.id}
            className="border p-4 rounded bg-white shadow"
          >
            <h2 className="font-semibold">{a.title}</h2>
            <p className="text-sm text-gray-600">{a.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
