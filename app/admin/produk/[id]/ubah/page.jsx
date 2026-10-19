import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { buatKoneksiAdmin } from "@/lib/supabase/admin";
import { buatKoneksiServer } from "@/lib/supabase/server";
import { ubahProduk } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function HalamanUbahProduk({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const pesanError = sp?.error;

  let produk = null;
  try {
    const supabaseAdmin = await buatKoneksiAdmin();
    const { data } = await supabaseAdmin
      .from("produk")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (data) {
      produk = data;
    } else {
      const supabaseServer = buatKoneksiServer();
      const res = await supabaseServer
        .from("produk")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      produk = res.data;
    }
  } catch (err) {
    try {
      const supabaseServer = buatKoneksiServer();
      const res = await supabaseServer
        .from("produk")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      produk = res.data;
    } catch (e) {
      // not found
    }
  }

  if (!produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div>
        <h1 className="text-2xl font-extrabold">Ubah produk</h1>
        <p className="mt-1 text-sm text-teks-lembut">
          Perbarui informasi produk {produk.nama}.
        </p>
      </div>

      {pesanError && (
        <p className="rounded-lg border border-garis bg-permukaan p-3 text-sm text-bahaya">
          {pesanError}
        </p>
      )}

      <FormProduk
        produk={produk}
        action={ubahProduk}
        labelTombol="Simpan perubahan"
      />
    </div>
  );
}
