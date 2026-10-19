"use server";

import { redirect } from "next/navigation";
import { buatKoneksiAdmin } from "@/lib/supabase/admin";

/**
 * Memeriksa apakah admin sudah login di sisi server.
 * Digunakan oleh semua Server Action yang mengubah data.
 * Jika belum login, langsung dialihkan ke /admin/login.
 */
export async function periksaLoginAdmin() {
  const supabase = await buatKoneksiAdmin();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect(
      `/admin/login?error=${encodeURIComponent("Silakan login terlebih dahulu.")}`
    );
  }

  return { supabase, user };
}

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
 * Memeriksa login admin di server sebelum menjalankan perubahan.
 */
export async function gantiPassword(prevStateOrFormData, maybeFormData) {
  const formData =
    maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;

  const passwordBaru = formData?.get("password_baru");
  const konfirmasiPassword = formData?.get("konfirmasi_password");

  // 1. Periksa sesi login admin di server
  const { supabase } = await periksaLoginAdmin();

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

/**
 * Server Action US-08: Tambah produk baru (wajib login).
 */
export async function tambahProduk(prevStateOrFormData, maybeFormData) {
  const formData =
    maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;
  const { supabase } = await periksaLoginAdmin();

  const nama = formData.get("nama");
  const harga = formData.get("harga");
  const kategori = formData.get("kategori");
  const foto_url = formData.get("foto_url");
  const deskripsi = formData.get("deskripsi");

  if (!nama || !harga) {
    redirect(
      `/admin/produk/baru?error=${encodeURIComponent("Nama dan harga wajib diisi.")}`
    );
  }

  const { error } = await supabase.from("produk").insert({
    nama: String(nama).trim(),
    harga: parseInt(harga, 10),
    kategori: kategori ? String(kategori).trim() : null,
    foto_url: foto_url ? String(foto_url).trim() : null,
    deskripsi: deskripsi ? String(deskripsi).trim() : null,
  });

  if (error) {
    redirect(
      `/admin/produk/baru?error=${encodeURIComponent(
        error.message || "Gagal menambah produk."
      )}`
    );
  }

  redirect("/admin");
}

/**
 * Server Action US-09: Ubah data produk (wajib login).
 */
export async function ubahProduk(prevStateOrFormData, maybeFormData) {
  const formData =
    maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;
  const { supabase } = await periksaLoginAdmin();

  const id = formData.get("id");
  const nama = formData.get("nama");
  const harga = formData.get("harga");
  const kategori = formData.get("kategori");
  const foto_url = formData.get("foto_url");
  const deskripsi = formData.get("deskripsi");

  if (!id || !nama || !harga) {
    redirect(
      `/admin/produk/${id}/ubah?error=${encodeURIComponent(
        "Data produk tidak lengkap."
      )}`
    );
  }

  const { error } = await supabase
    .from("produk")
    .update({
      nama: String(nama).trim(),
      harga: parseInt(harga, 10),
      kategori: kategori ? String(kategori).trim() : null,
      foto_url: foto_url ? String(foto_url).trim() : null,
      deskripsi: deskripsi ? String(deskripsi).trim() : null,
    })
    .eq("id", id);

  if (error) {
    redirect(
      `/admin/produk/${id}/ubah?error=${encodeURIComponent(
        error.message || "Gagal mengubah produk."
      )}`
    );
  }

  redirect("/admin");
}

/**
 * Server Action US-10: Hapus produk (wajib login).
 */
export async function hapusProduk(formData) {
  const { supabase } = await periksaLoginAdmin();
  const id = formData.get("id");

  if (id) {
    await supabase.from("produk").delete().eq("id", id);
  }

  redirect("/admin");
}

/**
 * Server Action US-14: Buat deskripsi produk otomatis dengan AI (wajib login).
 */
export async function buatDeskripsiAI(nama, kategori) {
  await periksaLoginAdmin();

  if (!nama) {
    return { error: "Nama produk harus diisi terlebih dahulu." };
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const promptText = `Tuliskan deskripsi produk yang menarik, profesional, dan ringkas (maksimal 3-4 kalimat) dalam bahasa Indonesia untuk produk toko berikut:
Nama Produk: ${nama}
Kategori: ${kategori || "Umum"}

Langsung tuliskan deskripsinya tanpa kalimat pembuka atau penutup.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
          }),
        }
      );

      const resJson = await response.json();
      const generatedText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        return { deskripsi: generatedText.trim() };
      }
    } catch (e) {
      // Fallback ke template cerdas jika error
    }
  }

  // Template cerdas jika API key tidak disetel atau offline
  const kat = (kategori || "").toLowerCase();
  let deskripsiOtomatis = "";
  if (kat.includes("akun") || nama.toUpperCase().startsWith("VAL-")) {
    deskripsiOtomatis = `Kode Akun (${nama})\nKategori: ${kategori || "Pilihan"}\nSpesifikasi lengkap dan skin eksklusif terverifikasi. Pengiriman instan, aman, dan bergaransi resmi dari toko.`;
  } else if (
    kat.includes("makan") ||
    kat.includes("camilan") ||
    kat.includes("minuman") ||
    kat.includes("kue")
  ) {
    deskripsiOtomatis = `${nama} dibuat dari bahan-bahan berkualitas pilihan dengan resep istimewa. Menghadirkan cita rasa lezat, higienis, dan cocok dinikmati kapan saja bersama keluarga.`;
  } else {
    deskripsiOtomatis = `${nama} merupakan produk unggulan kategori ${kategori || "Pilihan"} dengan kualitas terjamin. Dirancang dengan cermat untuk memberikan kepuasan maksimal bagi pelanggan.`;
  }

  return { deskripsi: deskripsiOtomatis };
}
