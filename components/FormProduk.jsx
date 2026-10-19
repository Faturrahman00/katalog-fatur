"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { buatDeskripsiAI } from "@/app/admin/actions";

export default function FormProduk({ action, produk = {}, labelTombol }) {
  const [nama, setNama] = useState(produk.nama || "");
  const [kategori, setKategori] = useState(produk.kategori || "");
  const [deskripsi, setDeskripsi] = useState(produk.deskripsi || "");
  const [sedangGenerate, setSedangGenerate] = useState(false);
  const [pesanAI, setPesanAI] = useState("");

  const handleGenerateAI = async () => {
    if (!nama.trim()) {
      setPesanAI("Isi nama produk terlebih dahulu sebelum membuat deskripsi.");
      return;
    }
    setSedangGenerate(true);
    setPesanAI("Sedang membuat deskripsi dengan AI...");
    try {
      const res = await buatDeskripsiAI(nama, kategori);
      if (res?.deskripsi) {
        setDeskripsi(res.deskripsi);
        setPesanAI("Deskripsi berhasil dibuat otomatis dengan AI!");
      } else if (res?.error) {
        setPesanAI(res.error);
      }
    } catch (err) {
      setPesanAI("Gagal menghubungi layanan AI.");
    } finally {
      setSedangGenerate(false);
    }
  };

  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      {produk.id && <input type="hidden" name="id" value={produk.id} />}

      <Input
        label="Nama produk"
        name="nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        required
      />

      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        required
      />

      <Input
        label="Kategori"
        name="kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
      />

      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">Deskripsi</label>
          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={sedangGenerate}
            className="rounded-md border border-garis bg-permukaan px-2.5 py-1 text-xs font-semibold text-utama hover:bg-utama hover:text-white disabled:opacity-50 transition-colors"
          >
            {sedangGenerate ? "Membuat..." : "✨ Buat dengan AI"}
          </button>
        </div>
        <textarea
          name="deskripsi"
          rows={4}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
        {pesanAI && (
          <p className="text-xs text-teks-lembut">{pesanAI}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Tombol type="submit">{labelTombol}</Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}
