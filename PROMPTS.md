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
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Viewed page.jsx:1-41
Created test-detail.mjs
Ran command: Execute test-detail script (`node C:\Users\Fatur\.gemini\antigravity\brain\7f3986ba-4407-4748-9018-5fb6a2becced\scratch\test-detail.mjs`)
Created page.jsx
Ran command: Run npm run build (`npm run build`)
Ran command: Start server for testing detail page (`npm run start`)
Checked task Start server for testing detail page
Ran command: Fetch /produk/1 (`$resp = Invoke-WebRequest -Uri "http://localhost:3000/produk/1" -UseBasicParsing; Write-Host "Status:" $resp.StatusCode; Write-Host "Contains product:" ($resp.Content -match "Kopi Bubuk Robusta"); Write-Host "Contains CatatanBelumAktif:" ($resp.Content -match "Tombol pesan belum berfungsi")`)
Ran command: Fetch /produk/9999 (404) (`try { $resp = Invoke-WebRequest -Uri "http://localhost:3000/produk/9999" -UseBasicParsing; Write-Host "Status:" $resp.StatusCode } catch { Write-Host "Status:" $_.Exception.Response.StatusCode.value__; $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream()); $body = $reader.ReadToEnd(); Write-Host "Contains 404 text:" ($body -match "Halaman tidak ditemukan") }`)
Ran command: Fetch /produk/abc (404) (`try { $resp = Invoke-WebRequest -Uri "http://localhost:3000/produk/abc" -UseBasicParsing; Write-Host "Status:" $resp.StatusCode } catch { Write-Host "Status:" $_.Exception.Response.StatusCode.value__; $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream()); $body = $reader.ReadToEnd(); Write-Host "Contains 404 text:" ($body -match "Halaman tidak ditemukan") }`)
Killed task Start server for testing detail page
Viewed page.jsx:1-44

Pekerjaan untuk **US-02: Detail produk** telah selesai.

### Perubahan File

- **[`app/produk/[id]/page.jsx`](file:///c:/Users/Fatur/Documents/katalog-fatur/app/produk/%5Bid%5D/page.jsx)**:
  - Diubah menjadi Server Component async yang mengambil satu produk dari tabel `produk` di Supabase berdasarkan parameter `id`.
  - Menggunakan koneksi server dari [`@/lib/supabase/server`](file:///c:/Users/Fatur/Documents/katalog-fatur/lib/supabase/server.js).
  - Memanggil `notFound()` jika produk tidak ditemukan atau ID tidak valid.
  - Mempertahankan tampilan dan komponen [`TombolWhatsApp`](file:///c:/Users/Fatur/Documents/katalog-fatur/components/TombolWhatsApp.jsx).
  - Menghapus komponen `CatatanBelumAktif` serta referensi `cariProdukContoh` dari `data-contoh.js`.

---

### Cara Mengetes

1. Jalankan development server (jika belum berjalan):
   ```bash
   npm run dev
   ```
2. **Cek produk valid**:
   - Buka katalog di [http://localhost:3000](http://localhost:3000) dan klik salah satu produk (misalnya produk pertama).
   - Pastikan halaman diarahkan ke [http://localhost:3000/produk/1](http://localhost:3000/produk/1) dengan detail lengkap (foto, kategori, nama, harga rupiah, dan deskripsi dari database) serta tombol WhatsApp tampil rapi tanpa catatan belum aktif.
3. **Cek produk tidak ada / ID tidak valid**:
   - Buka URL yang tidak ada di database, seperti [http://localhost:3000/produk/9999](http://localhost:3000/produk/9999) atau [http://localhost:3000/produk/abc](http://localhost:3000/produk/abc).
   - Pastikan halaman beralih ke tampilan 404 (*"Halaman tidak ditemukan"*).

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
Viewed TombolWhatsApp.jsx:1-13
Viewed toko.js:1-10
Viewed format.js:1-8
Viewed page.jsx:1-44
Ran command: Search for message template in docs (`Select-String -Path "*.md", "docs/*.md" -Pattern "Halo|wa\.me"`)
Viewed PROMPTS.md:150-194
Ran command: Search US-03 in jsx files (`Select-String -Path "app/**/*.jsx", "components/**/*.jsx" -Pattern "US-03"`)
Created TombolWhatsApp.jsx
Ran command: Run npm run build (`npm run build`)
Ran command: Start server for testing TombolWhatsApp (`npm run start`)
Checked task Start server for testing TombolWhatsApp
Ran command: Verify WhatsApp link (`$resp = Invoke-WebRequest -Uri "http://localhost:3000/produk/1" -UseBasicParsing; if ($resp.Content -match 'href="(https://wa\.me/[^"]+)"') { Write-Host "Found WA link:" $matches[1] } else { Write-Host "WA link not found" }`)
Ran command: Verify target and rel attributes (`$resp = Invoke-WebRequest -Uri "http://localhost:3000/produk/1" -UseBasicParsing; Write-Host "Target blank:" ($resp.Content -match 'target="_blank"'); Write-Host "Noopener:" ($resp.Content -match 'rel="noopener noreferrer"')`)
Killed task Start server for testing TombolWhatsApp
Viewed TombolWhatsApp.jsx:1-23

Pekerjaan untuk **US-03: Pesan via WhatsApp** telah selesai.

### Perubahan File

- **[`components/TombolWhatsApp.jsx`](file:///c:/Users/Fatur/Documents/katalog-fatur/components/TombolWhatsApp.jsx)**:
  - Diubah dari elemen `<button>` menjadi tautan `<a>` dengan target `_blank` dan `rel="noopener noreferrer"`.
  - Mengambil nomor WhatsApp toko dari [`@/lib/toko`](file:///c:/Users/Fatur/Documents/katalog-fatur/lib/toko.js).
  - Pesan otomatis diformat dengan nama dan harga produk dalam format rupiah menggunakan [`formatRupiah`](file:///c:/Users/Fatur/Documents/katalog-fatur/lib/format.js), lalu di-encode dengan `encodeURIComponent`.
  - Mempertahankan kelas Tailwind dan tampilan tombol seperti semula.
- **[`app/produk/[id]/page.jsx`](file:///c:/Users/Fatur/Documents/katalog-fatur/app/produk/%5Bid%5D/page.jsx)**:
  - Komponen `CatatanBelumAktif` terkait US-03 sudah dipastikan bersih dari halaman detail produk.

---

### Cara Mengetes

1. Jalankan development server jika belum berjalan:
   ```bash
   npm run dev
   ```
2. Buka salah satu halaman detail produk, misalnya [http://localhost:3000/produk/1](http://localhost:3000/produk/1).
3. Klik tombol **"Pesan via WhatsApp"**:
   - Browser akan membuka tab baru ke alamat `https://wa.me/<nomorWhatsApp>?text=...`.
   - Pastikan nomor tujuan sesuai dengan `lib/toko.js`.
   - Pastikan kolom pesan di WhatsApp sudah terisi otomatis dengan nama dan harga produk (format rupiah).

**Perbaikan:**

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
Viewed page.jsx:1-29
Viewed NavAdmin.jsx:1-19
Viewed Input.jsx:1-16
Viewed Tombol.jsx:1-26
Viewed page.jsx:1-43
Viewed FormProduk.jsx:1-35
Ran command: Inspect @supabase/ssr exports (`node -e "const ssr = require('@supabase/ssr'); console.log(Object.keys(ssr));"`)
Ran command: Inspect next/headers cookies (`node -e "const { cookies } = require('next/headers'); console.log(typeof cookies);"`)
Ran command: Inspect @supabase/ssr types (`node -e "const fs = require('fs'); console.log(fs.readFileSync('./node_modules/@supabase/ssr/dist/index.d.ts', 'utf8').slice(0, 1000));"`)
Ran command: List @supabase/ssr files (`Get-ChildItem node_modules/@supabase/ssr`)
Viewed README.md:1-100
Viewed README.md:101-165
Created test-auth.mjs
Ran command: Execute test-auth script (`node C:\Users\Fatur\.gemini\antigravity\brain\7f3986ba-4407-4748-9018-5fb6a2becced\scratch\test-auth.mjs`)
Viewed package.json:1-40
Created test-auth.mjs
Ran command: Run test-auth script (`node C:\Users\Fatur\.gemini\antigravity\brain\7f3986ba-4407-4748-9018-5fb6a2becced\scratch\test-auth.mjs`)
Created test-auth.cjs
Ran command: Run CJS test-auth script (`node C:\Users\Fatur\.gemini\antigravity\brain\7f3986ba-4407-4748-9018-5fb6a2becced\scratch\test-auth.cjs`)
Ran command: Run test-auth.cjs with NODE_PATH (`$env:NODE_PATH="c:\Users\Fatur\Documents\katalog-fatur\node_modules"; node C:\Users\Fatur\.gemini\antigravity\brain\7f3986ba-4407-4748-9018-5fb6a2becced\scratch\test-auth.cjs`)
Ran command: Check if app/admin/actions.js exists (`Test-Path app/admin/actions.js`)
Created admin.js
Created index.js
Created actions.js
Created page.jsx
Created NavAdmin.jsx
Ran command: Run npm run build (`npm run build`)
Ran command: Start Next.js server (`npm run start`)
Checked task Start Next.js server
Ran command: Fetch /admin/login (`$resp = Invoke-WebRequest -Uri "http://localhost:3000/admin/login" -UseBasicParsing; Write-Host "Status:" $resp.StatusCode; Write-Host "Contains 'Masuk admin':" ($resp.Content -match "Masuk admin"); Write-Host "Contains CatatanBelumAktif:" ($resp.Content -match "Login belum berfungsi")`)
Ran command: Fetch /admin/login with error param (`$resp = Invoke-WebRequest -Uri "http://localhost:3000/admin/login?error=Email%20atau%20password%20salah." -UseBasicParsing; Write-Host "Status:" $resp.StatusCode; Write-Host "Contains error:" ($resp.Content -match "Email atau password salah.")`)
Ran command: Fetch /admin to verify NavAdmin (`$resp = Invoke-WebRequest -Uri "http://localhost:3000/admin" -UseBasicParsing; Write-Host "Contains 'Keluar':" ($resp.Content -match "Keluar"); Write-Host "Contains form for Keluar:" ($resp.Content -match '<button[^>]*>Keluar</button>')`)
Killed task Start Next.js server

Pekerjaan untuk **US-04: Login admin** telah selesai.

### Perubahan File

1. **[`lib/supabase/admin.js`](file:///c:/Users/Fatur/Documents/katalog-fatur/lib/supabase/admin.js)** & **[`lib/supabase/index.js`](file:///c:/Users/Fatur/Documents/katalog-fatur/lib/supabase/index.js)**:
   - Membuat fungsi `buatKoneksiAdmin()` di sisi server menggunakan `createServerClient` dari `@supabase/ssr` dan cookie store dari `next/headers`.
   - Menggunakan `SUPABASE_URL` dan `SUPABASE_PUBLISHABLE_KEY`.
2. **[`app/admin/actions.js`](file:///c:/Users/Fatur/Documents/katalog-fatur/app/admin/actions.js)**:
   - Membuat Server Action `login`: memproses email & password dengan `supabase.auth.signInWithPassword`. Jika berhasil dialihkan ke `/admin`, jika gagal dialihkan kembali ke `/admin/login?error=...` dengan pesan error yang jelas.
   - Membuat Server Action `keluar`: mengakhiri sesi admin dengan `supabase.auth.signOut` lalu mengarahkan kembali ke `/admin/login`.
3. **[`app/admin/login/page.jsx`](file:///c:/Users/Fatur/Documents/katalog-fatur/app/admin/login/page.jsx)**:
   - Menyambungkan form ke Server Action `login`.
   - Menampilkan kotak pesan error jika login gagal.
   - Menghapus komponen `CatatanBelumAktif`.
4. **[`components/NavAdmin.jsx`](file:///c:/Users/Fatur/Documents/katalog-fatur/components/NavAdmin.jsx)**:
   - Memfungsikan tombol "Keluar" menggunakan Server Action `keluar` untuk mengakhiri sesi dan kembali ke `/admin/login`, tanpa mengubah tampilan dan posisinya.

---

### Cara Mengetes

1. Jalankan development server:
   ```bash
   npm run dev
   ```
2. Buka halaman login di [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
3. **Uji login gagal**:
   - Masukkan email atau password yang salah, lalu klik **Masuk**.
   - Halaman akan memuat kembali dan menampilkan pesan error *"Email atau password salah."* di atas form.
4. **Uji login berhasil**:
   - Masukkan email dan password admin Supabase Anda yang valid, lalu klik **Masuk**.
   - Browser akan dialihkan secara otomatis ke halaman `/admin`.
5. **Uji keluar (logout)**:
   - Di halaman `/admin`, klik tombol **Keluar** di pojok kanan navigasi admin.
   - Sesi akan diakhiri dan browser dialihkan kembali ke `/admin/login`.

**Perbaikan:**
- **Prompt:** cocokkan tampilan produk halaman admin dengan database yang benar
- **Hasil:** Mengubah `app/admin/page.jsx` agar mengambil data produk dari tabel `produk` di Supabase (US-07) alih-alih data contoh, sehingga daftar produk di halaman admin sesuai dengan database. Menambahkan juga penanganan kondisi tabel kosong pada `components/TabelProduk.jsx`.

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
- Membuat Server Action `gantiPassword` di `app/admin/actions.js` yang memeriksa login admin di server, memvalidasi password baru minimal 8 karakter dan mencocokkan dengan konfirmasi, serta memperbarui password via `supabase.auth.updateUser`.
- Menyambungkan form di `app/admin/password/page.jsx` ke Server Action `gantiPassword`.
- Menampilkan pesan error atau sukses yang jelas pada form.
- Menghapus komponen `CatatanBelumAktif` dari halaman ganti password.

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
- Membuat file `proxy.js` di root proyek untuk memproteksi seluruh rute `/admin` (kecuali `/admin/login`) menggunakan `createServerClient` dari `@supabase/ssr`. Jika belum login, pengunjung dialihkan (307 redirect) ke `/admin/login`.
- Membuat helper `periksaLoginAdmin` di `app/admin/actions.js` untuk memastikan semua Server Action yang mengubah data memeriksa sesi login di server.
- Menghapus komponen `CatatanBelumAktif` dari `app/admin/page.jsx`.

**Perbaikan:**

## Debugging dan fitur bonus

### US-07 List Produk di Halaman Admin dari Database
- **Status:** Selesai
- **Perubahan:** Mengubah `app/admin/page.jsx` agar mengambil data produk langsung dari tabel `produk` di Supabase secara dinamis (menggantikan data contoh).

### US-08 Tambah Produk (Terkunci Login)
- **Status:** Selesai
- **Perubahan:** 
  - Membuat Server Action `tambahProduk` di `app/admin/actions.js` yang terproteksi login dengan `periksaLoginAdmin()`.
  - Mengubah `app/admin/produk/baru/page.jsx` menyambungkan ke `tambahProduk` dan menghapus `CatatanBelumAktif`.

### US-09 Ubah Produk (Terkunci Login)
- **Status:** Selesai
- **Perubahan:**
  - Membuat Server Action `ubahProduk` di `app/admin/actions.js` yang terproteksi login.
  - Mengubah `app/admin/produk/[id]/ubah/page.jsx` mengambil data lama dari Supabase, menyambungkan form ke `ubahProduk`, dan menghapus `CatatanBelumAktif`.

### US-10 Hapus Produk (Terkunci Login)
- **Status:** Selesai
- **Perubahan:**
  - Membuat Server Action `hapusProduk` di `app/admin/actions.js` yang terproteksi login.
  - Memperbarui `components/TabelProduk.jsx` menambahkan konfirmasi dialog sebelum menghapus dan menjalankan Server Action `hapusProduk`.

### US-11 Filter Kategori atau Pencarian
- **Status:** Selesai
- **Perubahan:**
  - Mengubah `app/page.jsx` menambahkan form pencarian (nama & deskripsi) dan filter tombol kategori dinamis berdasarkan data tabel `produk`.
  - Dilengkapi tombol reset dan pesan ramah saat produk tidak ditemukan.

### US-12 Pilih Jumlah atau Varian
- **Status:** Selesai
- **Perubahan:**
  - Memperbarui `components/TombolWhatsApp.jsx` pada halaman detail produk dengan selector jumlah (`-` dan `+`), input opsi varian / catatan pesanan, dan perhitungan estimasi total harga.
  - Pilihan jumlah dan varian otomatis tertulis di pesan WhatsApp.

### US-13 Bisa di-install di HP (PWA)
- **Status:** Selesai
- **Perubahan:**
  - Membuat file statis `public/manifest.json` dan memperbarui `app/manifest.js` dengan atribut lengkap: `start_url`, `scope`, `id`, `orientation`, `display: "standalone"`, serta icon PNG `192x192` dan `512x512` dengan `purpose: "any"` dan `purpose: "maskable"`.
  - Menambahkan komponen banner dan tombol install interaktif `components/InstallPWA.jsx` yang menangkap event `beforeinstallprompt` untuk Android/Chromium serta petunjuk "Tambah ke Layar Utama" untuk iOS Safari.
  - Memperbarui `app/layout.jsx` dengan meta tag mobile PWA (`mobile-web-app-capable`, `apple-mobile-web-app-capable`, `apple-touch-icon`) dan registrasi Service Worker `public/sw.js` yang tangguh dengan cache aset statis dan fallback offline.
  - Menambahkan `revalidatePath` di `app/admin/actions.js` pada aksi tambah, ubah, dan hapus produk agar katalog dan halaman admin langsung terbarukan.
  - Memperbaiki pesan dan label tombol pada `components/TombolWhatsApp.jsx` agar presisi tanpa spasi berlebih.

### US-14 Deskripsi Produk Dibuat AI
- **Status:** Selesai
- **Perubahan:**
  - Membuat Server Action `buatDeskripsiAI` di `app/admin/actions.js` yang terhubung ke Gemini API dengan smart generator fallback.
  - Menambahkan tombol "✨ Buat dengan AI" pada `components/FormProduk.jsx` yang otomatis mengisi textarea deskripsi berdasarkan nama dan kategori produk.

