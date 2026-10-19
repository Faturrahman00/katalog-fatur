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

/**
 * Server Action untuk mengganti password admin yang sedang login.
 */
export async function gantiPassword(prevStateOrFormData, maybeFormData) {
  const formData =
    maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;

  const passwordBaru = formData?.get("password_baru");
  const konfirmasiPassword = formData?.get("konfirmasi_password");

  // 1. Periksa sesi login admin di server
  const supabase = await buatKoneksiAdmin();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(
      `/admin/login?error=${encodeURIComponent("Silakan login terlebih dahulu.")}`
    );
  }

  // 2. Validasi panjang minimal 8 karakter
  if (!passwordBaru || String(passwordBaru).length < 8) {
    redirect(
      `/admin/password?error=${encodeURIComponent(
        "Password baru minimal 8 karakter."
      )}`
    );
  }

  // 3. Validasi kesamaan dengan konfirmasi
  if (passwordBaru !== konfirmasiPassword) {
    redirect(
      `/admin/password?error=${encodeURIComponent(
        "Password baru dan konfirmasi password harus sama."
      )}`
    );
  }

  // 4. Update password di Supabase Auth
  let redirectUrl = null;

  try {
    const { error } = await supabase.auth.updateUser({
      password: String(passwordBaru),
    });

    if (error) {
      redirectUrl = `/admin/password?error=${encodeURIComponent(
        error.message || "Gagal mengganti password."
      )}`;
    } else {
      redirectUrl = `/admin/password?sukses=${encodeURIComponent(
        "Password berhasil diganti."
      )}`;
    }
  } catch (err) {
    redirectUrl = `/admin/password?error=${encodeURIComponent(
      err.message || "Terjadi kesalahan saat mengganti password."
    )}`;
  }

  if (redirectUrl) {
    redirect(redirectUrl);
  }
}

export const changePassword = gantiPassword;
