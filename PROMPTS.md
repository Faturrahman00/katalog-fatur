# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Viewed user-stories.md:1-100
Viewed rancangan-teknis.md:1-69
Viewed schema.sql:1-49
Viewed package.json:1-25
Viewed .env.example:1-14
Viewed page.jsx:1-37
Viewed KartuProduk.jsx:1-25
Viewed DESIGN.md:1-52
Ran command: List all files in workspace (`Get-ChildItem -Recurse -File | Select-Object -ExpandProperty FullName`)
Ran command: List workspace files (`Get-ChildItem -Recurse -File -Exclude node_modules | Where-Object { $_.FullName -notmatch '\\node_modules\\|\.git\\' } | Select-Object -ExpandProperty FullName`)
Viewed checklist-pengujian.md:1-27
Viewed checklist-keamanan.md:1-14
Viewed PROMPTS.md:1-56
Viewed data-contoh.js:1-60
Ran command: Search SUPABASE_SECRET_KEY references (`Select-String -Path "*.md", "docs/*.md", "app/**/*.jsx", "lib/**/*.js" -Pattern "SUPABASE_SECRET_KEY"`)
Ran command: Search lib/supabase references (`Select-String -Path "*.md", "docs/*.md" -Pattern "lib/supabase"`)
Ran command: Search for supabase mentions (`Select-String -Path "docs/*.md", "app/**/*.jsx" -Pattern "supabase"`)
Viewed page.jsx:1-28
Viewed page.jsx:1-41
Viewed layout.jsx:1-30
Viewed not-found.jsx:1-12
Viewed toko.js:1-10
Ran command: Check .env.local existence (`Test-Path .env.local`)
Ran command: Search createClient in docs (`Select-String -Path "docs/*.md" -Pattern "createClient|createSupabase|client"`)
Viewed PRD.md:1-60
Viewed problem-statement.md:1-83
Viewed skema-database.md:1-27
Viewed globals.css:1-34
Viewed CatatanBelumAktif.jsx:1-10
Viewed TabelProduk.jsx:1-47
Ran command: Run npm run build (`npm run build`)
Checked task Run npm run build
Created test-supabase.mjs
Ran command: Run scratch test script for Supabase (`node C:\Users\Fatur\.gemini\antigravity\brain\7f3986ba-4407-4748-9018-5fb6a2becced\scratch\test-supabase.mjs`)
Ran command: Run test script with NODE_PATH (`$env:NODE_PATH="c:\Users\Fatur\Documents\katalog-fatur\node_modules"; node C:\Users\Fatur\.gemini\antigravity\brain\7f3986ba-4407-4748-9018-5fb6a2becced\scratch\test-supabase.mjs`)
Created test-supabase.mjs
Ran command: Execute test-supabase script (`node C:\Users\Fatur\.gemini\antigravity\brain\7f3986ba-4407-4748-9018-5fb6a2becced\scratch\test-supabase.mjs`)
Created test-supabase.mjs
Ran command: Execute test script with file URL (`node C:\Users\Fatur\.gemini\antigravity\brain\7f3986ba-4407-4748-9018-5fb6a2becced\scratch\test-supabase.mjs`)
Checked task Execute test script with file URL
Ran command: Check SUPABASE_URL format (`node -e "const fs = require('fs'); const content = fs.readFileSync('.env.local', 'utf8'); for (const l of content.split('\n')) { if (l.startsWith('SUPABASE_URL')) console.log(l.slice(0, 30)); }"`)
Ran command: Check SUPABASE_URL details (`node -e "const fs = require('fs'); const content = fs.readFileSync('.env.local', 'utf8'); for (const l of content.split('\n')) { if (l.startsWith('SUPABASE_URL')) { const val = l.split('=')[1].trim(); console.log({ len: val.length, end: val.slice(-15), val }); } }"`)
Created test-supabase.mjs
Ran command: Execute normalized test script (`node C:\Users\Fatur\.gemini\antigravity\brain\7f3986ba-4407-4748-9018-5fb6a2becced\scratch\test-supabase.mjs`)
Ran command: Check .env.local keys (`Get-Content .env.local | ForEach-Object { if ($_ -match "^(SUPABASE_[A-Z_]+)=") { $matches[1] + "=***" } else { $_ } }`)
Ran command: Clean SUPABASE_URL in .env.local (`$content = Get-Content .env.local -Raw; $newContent = $content -replace "https://wwkrqspbbwsqbfvgjucp.supabase.co/rest/v1/?", "https://wwkrqspbbwsqbfvgjucp.supabase.co"; Set-Content .env.local -Value $newContent -NoNewline`)
Created test-supabase.mjs
Ran command: Run direct test on .env.local (`node C:\Users\Fatur\.gemini\antigravity\brain\7f3986ba-4407-4748-9018-5fb6a2becced\scratch\test-supabase.mjs`)
Created server.js
Created index.js
Created page.jsx
Ran command: Run npm run build (`npm run build`)
Ran command: Check port 3000 (`Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue`)
Checked task Check port 3000
Ran command: Start production server for testing (`npm run start`)
Checked task Start production server for testing
Ran command: Fetch homepage HTML (`(Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing).Content`)
Killed task Start production server for testing
Viewed page.jsx:1-59
Viewed server.js:1-30

Pekerjaan untuk **US-01: Katalog dari database** telah selesai.

### Perubahan File

1. **[`lib/supabase/server.js`](file:///c:/Users/Fatur/Documents/katalog-fatur/lib/supabase/server.js)** & **[`lib/supabase/index.js`](file:///c:/Users/Fatur/Documents/katalog-fatur/lib/supabase/index.js)**:
   - Dibuat koneksi Supabase untuk sisi server menggunakan `@supabase/supabase-js`.
   - Mengambil `SUPABASE_URL` dan `SUPABASE_SECRET_KEY` dari environment variable.
   - Dilengkapi normalisasi URL (membersihkan akhiran `/rest/v1` jika pengguna menyalin URL REST dari dashboard Supabase).

2. **[`app/page.jsx`](file:///c:/Users/Fatur/Documents/katalog-fatur/app/page.jsx)**:
   - Diubah menjadi Server Component async yang mengambil daftar produk dari tabel `produk` di Supabase, diurutkan berdasarkan `id`.
   - Menggunakan komponen [`KartuProduk`](file:///c:/Users/Fatur/Documents/katalog-fatur/components/KartuProduk.jsx) bawaan tanpa mengubah tampilannya.
   - Menampilkan pesan error yang jelas jika pengambilan data gagal.
   - Menampilkan teks `"Belum ada produk"` jika tabel kosong.
   - Menghapus komponen `CatatanBelumAktif`.

---

### Cara Mengetes

1. Jalankan development server:
   ```bash
   npm run dev
   ```
2. Buka browser di [http://localhost:3000](http://localhost:3000).
3. **Verifikasi data**: Pastikan 6 produk awal (Kopi Bubuk Robusta, Keripik Singkong, Sambal Bawang, Kue Nastar, Tas Anyaman, Kain Batik) tampil dari database Supabase dengan kartu produk lengkap (foto, kategori, nama, dan format rupiah).
4. **Verifikasi penanganan error**: Coba ubah sementara `SUPABASE_SECRET_KEY` di `.env.local` menjadi nilai yang salah, lalu muat ulang halaman. Pastikan pesan error yang jelas muncul di halaman.
5. **Verifikasi tidak ada kunci yang bocor**: Buka DevTools (F12) > tab *Network*, muat ulang halaman, dan periksa bahwa tidak ada request langsung ke domain Supabase dari browser.

**Perbaikan:**

## US-02 Detail produk

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
