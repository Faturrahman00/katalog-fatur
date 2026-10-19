"use client";

import { useState } from "react";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk }) {
  if (!produk) return null;

  const [jumlah, setJumlah] = useState(1);
  const [varian, setVarian] = useState("");

  const totalHarga = produk.harga * jumlah;

  // Bangun pesan otomatis sesuai US-03 dan US-12
  let pesan = `Halo, saya ingin memesan ${produk.nama} seharga ${formatRupiah(produk.harga)}.`;
  if (jumlah > 1 || varian.trim()) {
    pesan = `Halo, saya ingin memesan:\n• Produk: ${produk.nama}\n• Jumlah: ${jumlah}`;
    if (varian.trim()) {
      pesan += `\n• Varian/Catatan: ${varian.trim()}`;
    }
    pesan += `\n• Total: ${formatRupiah(totalHarga)}`;
  }

  const nomor = String(toko.nomorWhatsApp).replace(/\D/g, "");
  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  return (
    <div className="flex flex-col gap-4 pt-2">
      {/* Pengatur Jumlah (US-12) */}
      <div className="flex items-center justify-between border-t border-garis pt-4">
        <span className="text-sm font-semibold">Jumlah</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setJumlah((prev) => Math.max(1, prev - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-garis bg-permukaan font-bold text-teks hover:bg-garis transition-colors"
            aria-label="Kurangi jumlah"
          >
            -
          </button>
          <span className="w-8 text-center font-bold text-base">{jumlah}</span>
          <button
            type="button"
            onClick={() => setJumlah((prev) => prev + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-garis bg-permukaan font-bold text-teks hover:bg-garis transition-colors"
            aria-label="Tambah jumlah"
          >
            +
          </button>
        </div>
      </div>

      {/* Input Varian / Catatan Opsional (US-12) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-teks-lembut">
          Varian / Catatan (opsional)
        </label>
        <input
          type="text"
          value={varian}
          onChange={(e) => setVarian(e.target.value)}
          placeholder="Contoh: Varian warna, ukuran, atau catatan pesanan"
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
      </div>

      {/* Subtotal jika jumlah > 1 */}
      {jumlah > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-teks-lembut">Total perkiraan:</span>
          <span className="font-bold text-harga">{formatRupiah(totalHarga)}</span>
        </div>
      )}

      {/* Tombol Pesan WA */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto transition-colors"
      >
        Pesan via WhatsApp{jumlah > 1 ? ` (${jumlah} item)` : ""}
      </a>
    </div>
  );
}
