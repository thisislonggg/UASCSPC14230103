import Link from "next/link";
import { register } from "@/actions/auth";

type SP = Promise<{ error?: string }>;

export default async function RegisterPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;

  let errorMsg = sp?.error;
  try {
    if (errorMsg) errorMsg = decodeURIComponent(errorMsg);
  } catch {}

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 bg-radial-accent px-4">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />

      <section className="relative z-10 flex min-h-screen items-center justify-center py-12">
        <form
          action={register as any}
          className="w-full max-w-md card-glass p-8 space-y-6 fade-in"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
            <Link
              href="/login"
              className="flex-1 rounded-xl px-3 py-2 text-center text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="flex-1 rounded-xl bg-white/10 px-3 py-2 text-center text-sm font-semibold text-white ring-1 ring-white/10"
            >
              Register
            </Link>
          </div>

          <div className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <span className="text-xl">📝</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Register</h1>
            <p className="text-sm text-white/70">Buat akun baru untuk Employee Portal</p>
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              ❌ {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white
                         placeholder:text-white/40 outline-none
                         ring-1 ring-white/15 focus:ring-2 focus:ring-indigo-400/60"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white
                         placeholder:text-white/40 outline-none
                         ring-1 ring-white/15 focus:ring-2 focus:ring-indigo-400/60"
            />
          </div>

          <button type="submit" className="btn btn-secondary btn-shine w-full">
            Daftar <span className="opacity-80">→</span>
          </button>

          <p className="text-center text-xs text-white/50">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-white underline underline-offset-4">
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
