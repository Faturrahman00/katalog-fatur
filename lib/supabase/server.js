import { createClient } from "@supabase/supabase-js";

/**
 * Membuat koneksi Supabase untuk server (Server Component / Server Action).
 * Menggunakan SUPABASE_SECRET_KEY untuk membaca data katalog & detail produk
 * melewati aturan RLS khusus di sisi server.
 */
export function buatKoneksiServer() {
  let url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum disetel di environment variable."
    );
  }

  // Normalisasi URL jika ada akhiran /rest/v1 atau trailing slash
  url = url.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  return createClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export default buatKoneksiServer;

