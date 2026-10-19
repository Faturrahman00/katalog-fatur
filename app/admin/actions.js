"use server";

import { redirect } from "next/navigation";
import { buatKoneksiAdmin } from "@/lib/supabase/admin";

/**
 * Server Action untuk memproses login admin.
 */
export async function login(prevStateOrFormData, maybeFormData) {
  const formData =
    maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;

  const email = formData?.get("email");
  const password = formData?.get("password");

  if (!email || !password) {
    redirect(
      `/admin/login?error=${encodeURIComponent("Email dan password wajib diisi.")}`
    );
  }

  let pesanError = null;

  try {
    const supabase = await buatKoneksiAdmin();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(email).trim(),
      password: String(password),
    });

    if (error) {
      pesanError =
        error.message === "Invalid login credentials"
          ? "Email atau password salah."
          : (error.message || "Gagal masuk.");
    }
  } catch (err) {
    pesanError = err.message || "Terjadi kesalahan pada server.";
  }

  if (pesanError) {
    redirect(`/admin/login?error=${encodeURIComponent(pesanError)}`);
  }

  redirect("/admin");
}

/**
 * Server Action untuk mengakhiri sesi admin (logout).
 */
export async function keluar() {
  try {
    const supabase = await buatKoneksiAdmin();
    await supabase.auth.signOut();
  } catch (err) {
    // Abaikan jika sesi sudah berakhir
  }

  redirect("/admin/login");
}

export const logout = keluar;

