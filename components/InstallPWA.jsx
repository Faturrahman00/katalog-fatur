"use client";

import { useState, useEffect } from "react";
import { toko } from "@/lib/toko";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [bisaInstall, setBisaInstall] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [ditutup, setDitutup] = useState(false);
  const [sudahTerpasang, setSudahTerpasang] = useState(false);

  useEffect(() => {
    // Cek apakah sudah berjalan di mode standalone (sudah di-install)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      setSudahTerpasang(true);
      return;
    }

    // Deteksi perangkat iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isDeviceIos = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isDeviceIos);

    // Tangkap event instalasi PWA dari browser Chromium (Android, Chrome, Edge)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setBisaInstall(true);
    };

    const handleAppInstalled = () => {
      setSudahTerpasang(true);
      setBisaInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setBisaInstall(false);
      setDeferredPrompt(null);
    }
  };

  // Jangan tampilkan jika sudah terpasang atau ditutup oleh pengguna
  if (sudahTerpasang || ditutup) {
    return null;
  }

  // Tampilkan banner jika browser mendukung prompt install atau di perangkat iOS Safari
  if (!bisaInstall && !isIos) {
    return null;
  }

  return (
    <aside
      aria-label="Pasang Aplikasi"
      className="mb-4 rounded-xl border border-garis bg-permukaan p-3.5 shadow-xs transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src="/icons/icon-192.png"
            alt={toko.nama}
            className="h-10 w-10 shrink-0 rounded-lg object-cover shadow-xs"
          />
          <div>
            <h2 className="text-sm font-bold text-teks">
              Pasang Aplikasi {toko.nama}
            </h2>
            <p className="text-xs text-teks-lembut">
              {isIos && !bisaInstall
                ? "Buka menu Bagikan (Share) ⎋ lalu pilih 'Tambah ke Layar Utama' (Add to Home Screen)."
                : "Pasang di HP agar akses katalog lebih cepat dan ringan."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {bisaInstall && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="inline-flex items-center justify-center rounded-lg bg-utama px-3 py-1.5 text-xs font-semibold text-white hover:bg-utama-gelap transition-colors shrink-0"
            >
              Pasang Aplikasi
            </button>
          )}
          <button
            type="button"
            onClick={() => setDitutup(true)}
            className="rounded-md p-1 text-teks-lembut hover:bg-garis transition-colors"
            aria-label="Tutup saran instalasi"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

