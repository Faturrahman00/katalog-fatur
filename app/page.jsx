import Link from "next/link";
import KartuProduk from "@/components/KartuProduk";
import Tombol from "@/components/Tombol";
import { buatKoneksiServer } from "@/lib/supabase/server";
import { toko } from "@/lib/toko";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog({ searchParams }) {
  const params = await searchParams;
  const kataKunci = (params?.cari || params?.q || params?.search || "").trim();
  const kategoriAktif = (params?.kategori || "").trim();

  let semuaProduk = [];
  let pesanError = null;

  try {
    const supabase = buatKoneksiServer();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      pesanError = error.message;
    } else {
      semuaProduk = data || [];
    }
  } catch (err) {
    pesanError = err.message || "Terjadi kesalahan saat menghubungi database.";
  }

  // Dapatkan daftar kategori unik dari produk di database
  const daftarKategori = [
    "Semua",
    ...new Set(semuaProduk.map((p) => p.kategori).filter(Boolean)),
  ];

  // Filter produk berdasarkan kategori dan kata kunci pencarian
  let daftarProduk = semuaProduk;

  if (kategoriAktif && kategoriAktif !== "Semua") {
    daftarProduk = daftarProduk.filter(
      (p) => p.kategori?.toLowerCase() === kategoriAktif.toLowerCase()
    );
  }

  if (kataKunci) {
    const kata = kataKunci.toLowerCase();
    daftarProduk = daftarProduk.filter(
      (p) =>
        p.nama?.toLowerCase().includes(kata) ||
        p.deskripsi?.toLowerCase().includes(kata) ||
        p.kategori?.toLowerCase().includes(kata)
    );
  }

  const adaFilter = Boolean(
    kataKunci || (kategoriAktif && kategoriAktif !== "Semua")
  );

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="judul-produk" className="text-xl font-bold">
            Produk kami
          </h2>

          {/* Form Pencarian */}
          <form method="GET" action="/" className="flex max-w-md flex-1 gap-2">
            {kategoriAktif && kategoriAktif !== "Semua" && (
              <input type="hidden" name="kategori" value={kategoriAktif} />
            )}
            <input
              type="search"
              name="cari"
              defaultValue={kataKunci}
              placeholder="Cari nama atau deskripsi..."
              className="w-full rounded-lg border border-garis bg-latar px-3.5 py-2 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
            />
            <Tombol type="submit">Cari</Tombol>
            {adaFilter && (
              <Tombol href="/" varian="garis">
                Reset
              </Tombol>
            )}
          </form>
        </div>

        {/* Filter Kategori */}
        {daftarKategori.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teks-lembut">
              Kategori:
            </span>
            {daftarKategori.map((kat) => {
              const isAktif =
                kat === "Semua"
                  ? !kategoriAktif || kategoriAktif === "Semua"
                  : kategoriAktif.toLowerCase() === kat.toLowerCase();

              const searchParamsObj = new URLSearchParams();
              if (kat !== "Semua") {
                searchParamsObj.set("kategori", kat);
              }
              if (kataKunci) {
                searchParamsObj.set("cari", kataKunci);
              }
              const queryString = searchParamsObj.toString();
              const href = queryString ? `/?${queryString}` : "/";

              return (
                <Link
                  key={kat}
                  href={href}
                  className={`rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
                    isAktif
                      ? "bg-utama text-white"
                      : "border border-garis bg-latar text-teks-lembut hover:border-utama hover:text-utama"
                  }`}
                >
                  {kat}
                </Link>
              );
            })}
          </div>
        )}

        {/* Daftar Produk / Pesan Error / Pesan Kosong */}
        {pesanError ? (
          <p className="rounded-xl border border-garis bg-permukaan p-4 text-sm text-bahaya">
            Gagal memuat produk: {pesanError}
          </p>
        ) : semuaProduk.length === 0 ? (
          <p className="py-8 text-teks-lembut">Belum ada produk</p>
        ) : daftarProduk.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-garis bg-permukaan py-12 text-center">
            <p className="text-base font-semibold text-teks">
              Tidak ada produk yang cocok
            </p>
            <p className="text-sm text-teks-lembut">
              {kataKunci && kategoriAktif && kategoriAktif !== "Semua"
                ? `Tidak ditemukan produk untuk "${kataKunci}" pada kategori "${kategoriAktif}".`
                : kataKunci
                ? `Tidak ditemukan produk dengan kata kunci "${kataKunci}".`
                : `Belum ada produk untuk kategori "${kategoriAktif}".`}
            </p>
            <Tombol href="/" varian="garis">
              Lihat semua produk
            </Tombol>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
