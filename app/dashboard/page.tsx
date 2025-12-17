import { createClient } from "@/utils/supabase/server";
import { logout } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: announcements } = await supabase
    .from("announcements")
    .select()
    .order("created_at", { ascending: false });

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 bg-radial-accent px-4">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />

      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl float-slow" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-indigo-400/12 blur-3xl float-slow" />

      <section className="relative z-10 mx-auto w-full max-w-5xl py-10 space-y-6">
        <div className="card-glass p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between fade-in">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Dashboard
            </h1>
            <p className="text-sm text-white/70">
              Welcome, <span className="text-white/90">{user.email}</span>
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="btn btn-shine w-full sm:w-auto rounded-2xl bg-rose-500 px-4 py-3 font-semibold text-rose-950
                         ring-1 ring-rose-400/30 shadow-[0_10px_30px_-12px_rgba(244,63,94,0.55)]
                         transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-[0.99]"
            >
              Logout <span className="opacity-80">↩</span>
            </button>
          </form>
        </div>

        <div className="card-glass p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Announcements
            </h2>
            <span className="text-xs text-white/50">
              {announcements?.length ?? 0} items
            </span>
          </div>

          {!announcements?.length ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
              Belum ada announcement.
            </div>
          ) : (
            <div className="grid gap-4">
              {announcements.map((a: any) => (
                <article
                  key={a.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.7)] transition hover:bg-white/7"
                >
                  <h3 className="text-base font-semibold text-white">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    {a.content}
                  </p>

                  {a.created_at && (
                    <p className="mt-3 text-xs text-white/45">
                      {new Date(a.created_at).toLocaleString("id-ID")}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
