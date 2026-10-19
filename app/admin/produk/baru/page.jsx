import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { tambahProduk } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function HalamanTambahProduk({ searchParams }) {
  const params = await searchParams;
  const pesanError = params?.error;

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div>
        <h1 className="text-2xl font-extrabold">Tambah produk</h1>
        <p className="mt-1 text-sm text-teks-lembut">
          Masukkan detail produk baru ke katalog toko.
        </p>
      </div>

      {pesanError && (
        <p className="rounded-lg border border-garis bg-permukaan p-3 text-sm text-bahaya">
          {pesanError}
        </p>
      )}

      <FormProduk action={tambahProduk} labelTombol="Simpan produk" />
    </div>
  );
}
