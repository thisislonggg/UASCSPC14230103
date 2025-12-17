import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 bg-radial-accent px-4">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />

      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl float-slow" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[34rem] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl float-slow" />

      <section className="relative z-10 flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-md fade-in">
          <div className="card-glass p-8 space-y-6">
            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <span className="text-xl">❤</span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Employee Portal
              </h1>

              <p className="text-sm text-white/70">
                Silakan masuk atau buat akun untuk melanjutkan.
              </p>
            </div>

            <div className="grid gap-3 pt-2">
              <Link
                href="/login"
                className="btn btn-primary btn-shine w-full"
              >
                Login <span className="opacity-80">→</span>
              </Link>

              <Link
                href="/register"
                className="btn btn-secondary btn-shine w-full"
              >
                Register <span className="opacity-80">→</span>
              </Link>
            </div>

            <div className="pt-3 text-center text-xs text-white/50">
              © {new Date().getFullYear()} Employee Portal
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-white/40">
            Secure access • Supabase Auth • Next.js App Router
          </p>
        </div>
      </section>
    </main>
  );
}
