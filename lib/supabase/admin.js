import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Membuat koneksi sesi admin Supabase di sisi server.
 * Menggunakan SUPABASE_PUBLISHABLE_KEY dan cookie sesi login (@supabase/ssr).
 * Digunakan untuk login, logout, ganti password, dan kelola produk.
 */
export async function buatKoneksiAdmin() {
  const cookieStore = await cookies();

  let url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_PUBLISHABLE_KEY belum disetel di environment variable."
    );
  }

  // Normalisasi URL jika ada akhiran /rest/v1 atau trailing slash
  url = url.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Method setAll dipanggil dari Server Component (bisa diabaikan jika ada proxy/middleware)
        }
      },
    },
  });
}

export default buatKoneksiAdmin;

