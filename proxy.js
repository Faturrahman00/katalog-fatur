import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Proxy / Middleware Next.js 16 untuk memproteksi semua rute /admin.
 * Semua rute /admin (kecuali /admin/login) mewajibkan admin sudah login.
 * Jika belum login, pengunjung akan dialihkan ke /admin/login.
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Lewati halaman login agar tidak terjadi redirect loop
  if (pathname === "/admin/login" || pathname === "/admin/login/") {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  let url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  url = url.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Jika belum login, alihkan ke /admin/login
  if (!user) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export { proxy as middleware };
export default proxy;

export const config = {
  matcher: ["/admin/:path*"],
};

