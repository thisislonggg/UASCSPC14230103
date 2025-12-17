import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8 space-y-5 fade-in">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-center">Employee Portal</h1>
          <p className="text-center text-sm text-gray-600">
            Silakan masuk atau buat akun untuk melanjutkan.
          </p>
        </div>

        <div className="grid gap-3">
          <Link
            href="/login"
            className="w-full text-center bg-green-600 text-white py-2.5 rounded-lg font-medium hover:brightness-95 active:scale-[0.98] transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="w-full text-center bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:brightness-95 active:scale-[0.98] transition"
          >
            Register
          </Link>
        </div>

        <div className="text-xs text-center text-gray-500">
          © {new Date().getFullYear()} Employee Portal
        </div>
      </div>
    </main>
  );
}
