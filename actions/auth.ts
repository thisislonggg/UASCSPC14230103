'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'


function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function register(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/register?error=" + encodeURIComponent("Email dan password wajib diisi."));
  }

  if (!isValidEmail(email)) {
    redirect("/register?error=" + encodeURIComponent("Format email tidak valid. Contoh: nama@email.com"));
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect("/register?error=" + encodeURIComponent(error.message));
  }

  redirect("/login?success=" + encodeURIComponent("Registrasi berhasil. Silakan Verifikasi Email lalu login."));
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
