<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="app/icon.svg">
    <img src="public/doctorcv-logo.svg" alt="Logo Doctor CV, stetoskop yang membentuk huruf C dan V" height="96">
  </picture>
</p>

<h1 align="center">Doctor CV</h1>

<p align="center"><a href="README.md">English</a> | Bahasa Indonesia</p>

<div align="center">

**Teknologi yang dipakai**

[![Next.js](https://img.shields.io/badge/Next.js-1A1A1A?style=flat-square&logo=nextdotjs&logoColor=FFFFFF)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-1A1A1A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-1A1A1A?style=flat-square&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-1A1A1A?style=flat-square&logo=tailwindcss&logoColor=06B6D4)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-1A1A1A?style=flat-square&logo=nodedotjs&logoColor=5FA04E)](https://nodejs.org)
[![Dexie.js][badge-dexie]](https://dexie.org)
[![pdf.js][badge-pdfjs]](https://mozilla.github.io/pdf.js/)
[![Motion][badge-motion]](https://motion.dev)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-1A1A1A?style=flat-square&logo=openrouter&logoColor=6467F2)](https://openrouter.ai)
[![Upstash](https://img.shields.io/badge/Upstash-1A1A1A?style=flat-square&logo=upstash&logoColor=00E9A3)](https://upstash.com)
[![Vitest](https://img.shields.io/badge/Vitest-1A1A1A?style=flat-square&logo=vitest&logoColor=6E9F18)](https://vitest.dev)
[![Testing Library](https://img.shields.io/badge/Testing_Library-1A1A1A?style=flat-square&logo=testinglibrary&logoColor=E33332)](https://testing-library.com)
[![ESLint](https://img.shields.io/badge/ESLint-1A1A1A?style=flat-square&logo=eslint&logoColor=8080F2)](https://eslint.org)

</div>

> [!IMPORTANT]
> Doctor CV masih dalam pengembangan dan belum siap untuk rilis resmi. Belum ada versi yang di-host. Anda
> dipersilakan mencobanya di komputer sendiri: ikuti [Memulai](#memulai), lalu jalankan analisis dengan
> OpenRouter key Anda sendiri di `.env.local`, atau dengan API key dari provider yang didukung di
> Pengaturan. Fitur, format penyimpanan, dan tampilan masih bisa berubah, sehingga hasil yang tersimpan di
> browser Anda mungkin tidak terbawa ke versi berikutnya.

Unggah CV PDF, pilih cara mengeceknya, lalu lihat skor beserta baris yang perlu diubah. Aplikasi ini
tersedia dalam bahasa Inggris dan bahasa Indonesia.

> **Skor ini hanya perkiraan.** Sebagian besar skor dan saran berasal dari model AI yang bekerja dengan
> rubrik berbasis aturan; pengecekan format serta catatan tentang teks tersembunyi dan tipografi berasal
> dari aturan saja. Belum ada bagian yang diuji terhadap sistem pelacak pelamar (ATS) yang dipakai
> perusahaan, jadi anggap hasilnya sebagai panduan untuk merevisi CV, bukan jaminan lolos penyaringan.

## Apa yang dilakukan

- *Tinjauan umum + saran posisi* hanya butuh PDF dan juga mendaftar 5 posisi yang paling cocok dengan CV
  Anda. *Cocokkan dengan lowongan* membandingkan CV dengan deskripsi pekerjaan yang Anda tempel, lalu
  menunjukkan kata kunci dan keahlian yang belum ada.
- Laporannya berisi skor keseluruhan 0 sampai 100, enam pengecekan berbobot, kelemahan utama, dan saran
  yang diurutkan dari "wajib diubah" sampai "opsional", lengkap dengan kutipan baris CV yang dirujuk bila
  ada.
- Server merender tiap halaman menjadi gambar dan mengirimkannya bersama hasil, sehingga halaman CV Anda
  tampil di samping laporan.
- Setiap analisis disimpan di IndexedDB di browser Anda. Buka kembali tanpa jaringan, hapus, atau jalankan
  analisis baru dari CV yang tersimpan tanpa memilih file lagi.
- Di Pengaturan, Anda bisa memasukkan API key dan ID model sendiri dari provider mana pun. Aplikasi
  mengenali OpenRouter, OpenAI, Anthropic, Google Gemini, Groq, Mistral, DeepSeek, xAI, Perplexity,
  Fireworks, Cerebras, Hugging Face, dan NVIDIA dari key (atau modelnya), lalu tahu ke mana harus
  mengirimnya. Untuk provider lain yang kompatibel dengan OpenAI, atau server model milik Anda sendiri,
  tambahkan alamat endpoint-nya. Kuota gratis selalu memakai OpenRouter key milik aplikasi, dan hanya
  kuota itu yang punya batas harian.

## Ke mana data Anda pergi

| Data | Tempat penyimpanan |
| --- | --- |
| PDF | Dikirim ke `POST /api/analyze`, dibaca di memori dengan pdf.js, lalu dibuang setelah respons dikirim. |
| Teks tersembunyi di PDF | Dideteksi di server (kontras rendah, tak terlihat atau transparan, sangat kecil, atau di luar halaman), tidak diikutkan dalam analisis, dan dilaporkan agar Anda bisa menghapusnya. Teks ini tidak pernah sampai ke AI. |
| Yang diterima AI | Teks CV yang terlihat dan, saat mencocokkan lowongan, judul dan deskripsi pekerjaan, dikirim bersama prompt ke OpenRouter (kuota gratis) atau ke provider dari key Anda sendiri. |
| Hasil, gambar halaman, PDF untuk analisis berikutnya | IndexedDB di browser Anda. Mode privat yang memblokir IndexedDB membuat hasil tetap tampil sampai Anda meninggalkan halaman, tanpa disimpan. |
| API key Anda | `localStorage` di browser Anda, bersama model dan alamat endpoint-nya. Key hanya dikirim bersama analisis Anda, yang diteruskan server ke provider yang dikenali dari key tersebut (key yang tidak bisa dikenali ditolak), dan ke pengecekan key milik provider itu, yang berjalan dari browser Anda. |
| Alamat endpoint | Dipanggil server hanya pada alamat yang sudah diperiksa, tanpa mengikuti pengalihan. Secara bawaan alamat harus HTTPS ke host publik; HTTP biasa serta host lokal atau jaringan privat memerlukan `ALLOW_PRIVATE_ENDPOINTS=true`, dan alamat metadata cloud selalu ditolak. |
| Penghitung pemakaian | Upstash Redis di server: hitungan harian untuk kuota gratis dan hitungan permintaan per jam, berdasarkan alamat IP yang di-hash. Tanpa data CV. |

## Bahasa

Landing page ada di `/en` (bawaan) dan `/id`, sedangkan workspace di `/en/app` dan `/id/app`. Pengganti
bahasa di header mengubah antarmuka, pesan dari server, dan bahasa tulisan AI, dan pilihan Anda diingat
lewat cookie. Kutipan teks CV tetap persis seperti di CV. Hasil yang tersimpan mempertahankan bahasa saat
hasil itu dibuat.

## Memulai

Kebutuhan: Node.js 22.22.2 atau lebih baru di jalur 22, 24.15 atau lebih baru di jalur 24, atau 26 ke atas
(rentang yang didukung lingkungan tes jsdom), serta npm. Dikembangkan dengan Node.js 24.18.

```bash
git clone https://github.com/Qidil/doctorcv.git
cd doctorcv
npm install
cp .env.example .env.local   # lalu isi minimal OPENROUTER_API_KEY
npm run dev
```

Buka <http://localhost:3000>; Anda akan diarahkan ke landing page di `/en` atau ke bahasa yang terakhir
Anda pilih, dan workspace ada di `/en/app`. Tanpa kredensial Upstash, mode pengembangan menghitung kuota di
memori, sehingga hitungan kembali nol setiap server pengembangan dimulai ulang.

## Variabel lingkungan

Semua variabel bersifat opsional saat pengembangan. `.env.example` mencantumkannya beserta komentar.

| Variabel | Bawaan | Fungsi |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | tidak ada | Key di balik kuota gratis. Tanpa key ini, hanya API key pribadi yang bisa menganalisis. |
| `OPENROUTER_MODEL` | `openrouter/free` | Model pertama dalam rantai. |
| `OPENROUTER_FREE_MODELS` | daftar di `lib/api/config.ts` | Model cadangan dipisah koma, dicoba berurutan. |
| `OPENROUTER_TIMEOUT_MS` | `120000` | Batas waktu satu analisis untuk seluruh rantai model. |
| `DAILY_ANALYSIS_LIMIT` | `10` | Analisis kuota gratis per klien per hari, direset pukul 00.00 GMT+8. API key pribadi tidak dihitung. |
| `HOURLY_REQUEST_LIMIT` | `20` | Permintaan per klien per jam penuh, dengan key apa pun. |
| `QUOTA_HASH_SECRET` | nilai pengembangan | Rahasia untuk meng-hash IP klien pada penghitung. Wajib di produksi. |
| `ALLOW_PRIVATE_ENDPOINTS` | `false` | `true` mengizinkan alamat endpoint di Pengaturan memakai HTTP biasa serta host lokal atau jaringan privat, untuk server model milik Anda sendiri. Hanya pada server yang Anda kendalikan. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | tidak ada | Penyimpanan penghitung. `KV_REST_API_URL` dan `KV_REST_API_TOKEN` juga dibaca. Wajib di produksi untuk kuota gratis dan untuk alamat endpoint di Pengaturan. |

## Skrip

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Server pengembangan di <http://localhost:3000>. |
| `npm run build` | Build produksi. |
| `npm start` | Menjalankan hasil build produksi. |
| `npm test` | Tes unit dan komponen (Vitest, jsdom, fake-indexeddb). |
| `npm run typecheck` | Membuat tipe route lalu menjalankan `tsc --noEmit`. |
| `npm run lint` | ESLint dengan aturan Next.js. |

Perjalanan end-to-end di `test/e2e/workflow.e2e.js` tidak punya skrip npm. Skrip itu dijalankan lewat
Playwright MCP terhadap `npm run build` lalu `npm start -- -p 3100`, dan memakai AI sungguhan dengan CV
fiktif yang dibuatnya sendiri. Berikan file itu ke `browser_run_code_unsafe` sebagai `filename`: panggilan
pertama memulai proses, dan panggilan berikutnya mengembalikan pengecekan sejauh itu lalu hasil akhirnya.
Satu kali jalan memakan waktu sekitar satu menit.

## Deploy

Aplikasi ini ditujukan untuk Vercel; host Node.js mana pun yang menjalankan Next.js 16 seharusnya bisa
dipakai. Sebelum deploy publik:

- Biarkan `DAILY_ANALYSIS_LIMIT` dan `HOURLY_REQUEST_LIMIT` tidak diisi, atau isi 10 dan 20. Nilai yang
  dinaikkan hanya untuk pengujian lokal.
- Isi `QUOTA_HASH_SECRET` dan kredensial Upstash. Tanpa keduanya, produksi mematikan kuota gratis, hanya
  API key pribadi dari provider yang dikenali yang berfungsi, dan alamat endpoint di Pengaturan ditolak,
  karena endpoint tanpa batas per jam akan membiarkan siapa pun memakai host untuk meneruskan permintaan.
- Biarkan `ALLOW_PRIVATE_ENDPOINTS` mati. Server model lokal milik pengunjung memang di luar jangkauan
  host, dan menyalakannya akan membiarkan siapa pun memakai host untuk menjangkau jaringan privatnya
  sendiri.
- Tempatkan region fungsi dekat dengan database Upstash, agar setiap panggilan penghitung tetap singkat.
- Route berjalan hingga 180 detik (`maxDuration`), yang di Vercel Hobby memerlukan Fluid compute.
- Permintaan dan respons harus tetap di bawah batas 4,5 MB Vercel; batas PDF 4 MB dan anggaran gambar
  halaman menjaganya tetap di sana.
- Setelah `npm run build`, periksa bahwa `.next/server/app/api/analyze/route.js.nft.json` memuat font
  standar pdf.js dan binary `@napi-rs/canvas` untuk platform tujuan.
- Pertimbangkan pembatasan laju (rate limiting) dari host itu sendiri (misalnya Vercel Firewall) untuk
  `/api/analyze`.

## Struktur proyek

| Path | Isi |
| --- | --- |
| `app/[lang]/` | Landing page dan layout root, dibangun untuk `/en` dan `/id`. Workspace ada di `app/[lang]/app/` (`/en/app`, `/id/app`). |
| `app/api/analyze/` | Route analisis. |
| `app/icon.svg`, `public/` | Favicon dan logo (`public/doctorcv-logo.svg`), keduanya SVG biasa. |
| `proxy.ts` | Mengarahkan path tanpa bahasa ke bahasa yang tersimpan, atau ke `/en`. Dites di `proxy.test.ts`. |
| `components/` | Dashboard dan bagian-bagiannya: unggah, hasil, gambar halaman, pengaturan, riwayat. Landing page ada di `landing/`, dan `brand-logo.tsx` merender logo. |
| `components/test-utils/` | Helper render tes dan fixture. |
| `lib/pdf/` | Ekstraksi teks PDF dan render halaman (pdf.js di server). |
| `lib/ats/` | Aturan teks tersembunyi, rubrik penilaian, dan penyusunan laporan. |
| `lib/ai/` | Prompt, rantai model dengan failover, permintaan ke provider, penjaga endpoint kustom, pembacaan jawaban, dan penghitung. |
| `lib/api/` | Penanganan permintaan, konfigurasi, dan katalog error dalam dua bahasa. |
| `lib/client/` | Kode di browser: permintaan analisis, API key pribadi, dan riwayat. |
| `lib/db/` | Skema IndexedDB (Dexie). |
| `lib/i18n/` | Kamus antarmuka, negosiasi bahasa, serta format tanggal dan ukuran. |
| `lib/drawably/` | Komponen sketsa gambar tangan (Drawably), disalin ke repo agar build tidak butuh paket tambahan. |
| `types/` | Tipe bersama untuk API, laporan, dan penyimpanan. |
| `test/e2e/` | `workflow.e2e.js`, perjalanan pengguna end-to-end yang dijalankan lewat Playwright MCP. |

Folder `.agents/`, `.codex/`, `.opencode/`, dan `anti-slop/` berisi alur kerja berbantuan AI yang dipakai
untuk membangun proyek ini; aplikasi tidak memakainya.

<!-- Badge images with embedded logos (shields.io). Kept here so the top of the file stays readable. -->
[badge-dexie]: https://img.shields.io/badge/Dexie.js-1A1A1A?style=flat-square&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAADcAAAAoCAYAAABaW2IIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASGSURBVGhDzZlZrF1TGMdrbtUsrcSQmKfcoNJQKREhMdSD8oCYJfrgQa%2BUNoZnRIuERAURczRIBK3hgaaaItKgSkiFimgbQ00x8%2Fvkf%2FvtY52v65yz9%2B7e9%2Fol6%2BHe863%2FWv9z1vitceNqYGbbmNl4M9spKTvGuP81ZratmR0OXADcCNwHLAbeAj4B1gMbvHwBXJzWB3Y2sxNVgOllShFrZscA%2BwI7pJpbhJltB5wN3A18CPxoJQFWpFrA8cBfXv4sWYrYX4BvgI%2BB54B5wHGpfmmAicBs4IPY6bIArwXNE2LMlgD8DrwBXAVMSNvqCXAYsCyK5fAGNBw%2FAlZ6eRdYDpwRdKfF%2Bg2yFDglbW8zgAM0f2JNAfzq8%2BsB4GqJAUcC%2B5nZbvr2vEw0s60z2m2aU%2F80hOfEdjsAj2Qq6de4FhjSyhjrlKVtcwXA%2FNj2CMC6JOgnH8%2BNrFD9zPlq%2BzjwZFKeAJ4CXgHeBtbGer0Abo7tqwPfJwHfAifHmLr0M2dmt8X4CLCXT4X56Y%2BQw4fojCjwXQj6G3haiwOwR1dwRfqZAxbE%2BH5ozzOzh6NOCrAG2DOt1GUuxYM1dK4zs9PMbH8z2117YVfLPRhg7o4YXwbghqiVAlyfBvc0F%2FHV81Pfa5YAz3p5MG4Drt24OQHcHvUK%2FKS0acRVMdcPNnFe6ERb5rT9vB81C4CLisBGzAng1dCJVswJnWOjZoGmUhHUpLlloQOtmdPc1xCMugL4EtilaXOvpx1o05wAFkVd4Sv%2BdAWUPvUPYgzMXRN1Ey5XwGfxv3UZA3NnRt0CbRkKOF8%2FY%2FywDmNgbhrwT9QWHX032Pd4U4YxMDekS23UFsoadALN7EDgId1%2BY2BZtLmHxts2dyiwMWoLYGGMV4VDgLl%2BCvk5VuqHrk9Bq21zR%2BnUFLVF1y%2BXAzgauAK4F3hTi4%2B%2BqdwcBd4Djgj12zY3NdcXMaIPDMtArJhDG6OnJE7SSqXjluarmZ2Tu0GMgrmzom4BcJMCfvM%2FXmryLidGwdxw1C0ArlRAZ0JqWQVe0Lmt615Uk1Ew91jUFekJJXv88gyXLq3KF57uq6mSrKXucqJNc8py6%2FoVdQXwlZnt2tNcxPMrOpAqt6G73CLgUc973Kl5GDvQpjngwqhZADxTBJUyNwjNXS0yoQOtmPOs%2BMqoWQBcOhLYlDkBvJh2oi1zWgmjXoFPp8lFYJPmWr%2FPAZf02tuc%2F7JqZvZD%2FLQubZ4ttUCo470OygL4HJjUqVQl8TmIiuZuTWNzKDnsp6Q5enGKGhEdKKLAwhhUl4rm3lEWy1fatCwA7vd3QB3psmfHSHYk%2BP6VfQipShVzTQLck3uIGcHPi8tjpRosDbqtmwNuMbOt0nY3Q6cPLbG%2Bu9dl1MwBq4GZaXsDAfYxs1kaYukjSRmAu4JW4%2BaUjFV%2BJHcLqQRwsLK3vgQ%2FD6wCvlbGzFPrf3imWaeTl4G9Q3093NfGdfXytMJfemaUfi6uiplt7y%2BqB%2FkSrQf9U4EpuXGvJyil2FSAywYVj9ON5Fy%2FLx6rfavuA%2Bi%2FaMXHLs0OdykAAAAASUVORK5CYII%3D
[badge-pdfjs]: https://img.shields.io/badge/pdf.js-1A1A1A?style=flat-square&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2C77u%2FPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI%2BPHBhdGggZD0iTSA0LjgsMC41IDMyLjEsNC42IDU5LjIsMC41IDU0LjcsNTcuOCAzMi4xLDYzLjUgOC4zLDU3LjggeiIgZmlsbD0iI2U1ZTdlOCIgc3Ryb2tlPSIjY2NjY2NjIiAvPjxwYXRoIGQ9Ik0gMzIuMSwxMC43IDUzLjksNi44IDUxLDUzLjggMzIuMSw1OC41IHoiIGZpbGw9IiNmZmZmZmYiIC8%2BPHJlY3Qgd2lkdGg9IjM0IiBoZWlnaHQ9IjE5LjEiIHg9IjMuOCIgeT0iMjIuNCIgZmlsbD0iI2ZmMjYwMCIgLz48cmVjdCB3aWR0aD0iMjMuNSIgaGVpZ2h0PSIxOS4xIiB4PSIzNi44IiB5PSIyMi40IiBmaWxsPSIjZmY1MDFhIiAvPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNCwwLDAsMC40LDU4LjYsOS43KSI%2BPHBhdGggZD0ibSAtMTIwLjUsMzQuNiAwLDM1LjIgNi41LDAgMCwtNS45IDAsLTYgOC45LDAgNC4yLC0zLjcgMCwtNy43IDAsLTcuNyAtNC4yLC00LjEgLTE1LjMsMCB6IG0gNi41LDYuOCA2LjIsMCAwLDEwLjIgLTYuMiwwIDAsLTEwLjIgeiIgZmlsbD0iI2ZmZmZmZiIgLz48cGF0aCBkPSJtIC05OC4xLDM0LjYgMCwzNS4yIDE2LjEsMCAzLjgsLTMuNiAwLC0yOCAtNCwtMy42IC0xNS45LDAgeiBtIDYuOCw2LjggNi44LDAgMCwyMS42IC02LjgsMCAwLC0yMS42IHoiIGZpbGw9IiNmZmZmZmYiIC8%2BPHBhdGggZD0ibSAtNzQuOSwzNC42IGMgNS41LDAgMTEsMCAxNi41LDAgMCwyLjMgMCw0LjUgMCw2LjggLTMuNCwwIC02LjgsMCAtMTAuMiwwIDAsMi41IDAsNC45IDAsNy40IDIuOSwwLjEgNS45LC0wLjEgOC44LDAgbCAwLDMuNCAwLDMuNCBjIC0yLjksMC4xIC01LjksLTAuMSAtOC44LDAgbCAwLDcuMSAwLDcuMSBjIC0yLjEsMCAtNC4yLDAgLTYuMiwwIDAsLTExLjcgMCwtMjMuNSAwLC0zNS4yIHoiIGZpbGw9IiNmZmZmZmYiIC8%2BPHBhdGggZD0ibSAtNDIuOSw2Ny45IC0yLjIsLTEuOCBjIDAsLTIgMCwtNCAwLC02IDIuMiwwIDQuNCwwIDYuNSwwIDAsMC45IDAsMS45IDAsMi44IDEuOSwwIDMuOCwwIDUuNywwIDAsLTkuNSAwLC0xOC45IDAsLTI4LjQgMi4yLDAgNC40LDAgNi41LDAgMCwxMC41IDAsMjEgMCwzMS41IC0xLjUsMS4yIC0yLjksMi41IC00LjQsMy43IC0zLjMsMCAtNi43LDAgLTEwLDAgLTAuNywtMC42IC0xLjUsLTEuMiAtMi4yLC0xLjggeiIgZmlsbD0iI2ZmZmZmZiIgLz48cGF0aCBkPSJtIC0yMS4zLDY3LjkgLTIuMSwtMS44IDAsLTYgYyAyLjEsMCA0LjQsMCA2LjUsMCAwLDAuOSAwLDEuOSAwLDIuOCAyLjMsMCA0LjUsMCA2LjgsMCAwLC0yLjUgMCwtNC45IDAsLTcuNCAtMy4yLDAgLTYuNCwwIC05LjYsMCBsIC0zLjcsLTMuNyAwLC02LjggMCwtNi44IDMuNywtMy43IGMgMy45LDAgNy43LDAgMTEuNiwwIGwgNC4zLDMuNyBjIDAsMS44IDAsMy42IDAsNS40IC0yLjEsMCAtNC4yLDAgLTYuMiwwIDAsLTAuOCAwLC0xLjUgMCwtMi4zIC0yLjMsMCAtNC41LDAgLTYuOCwwIDAsMi41IDAsNC45IDAsNy40IDMsMCA2LDAgOSwwIDEuNCwxLjIgNC4xLDMuNiA0LjEsMy42IDAsNC42IDAsOS4xIDAsMTMuNyBsIC0yLjEsMS45IC0yLjEsMS45IC01LjUsMCAtNS41LDAgeiIgZmlsbD0iI2ZmZmZmZiIgLz48L2c%2BPC9zdmc%2B
[badge-motion]: https://img.shields.io/badge/Motion-1A1A1A?style=flat-square&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2C77u%2FPHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSIxNCIgZmlsbD0iIzBCMEIwQyIgLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCAyNC4yKSBzY2FsZSgxLjczNSkiPjxwYXRoIGQ9Ik0gOS41ODcgMCBMIDQuNTcgOSBMIDAgOSBMIDMuOTE3IDEuOTcyIEMgNC41MjQgMC44ODMgNi4wMzkgMCA3LjMwMSAwIFogTSAyMC43OTQgMi4yNSBDIDIwLjc5NCAxLjAwNyAyMS44MTcgMCAyMy4wNzkgMCBDIDI0LjM0MSAwIDI1LjM2NCAxLjAwNyAyNS4zNjQgMi4yNSBDIDI1LjM2NCAzLjQ5MyAyNC4zNDEgNC41IDIzLjA3OSA0LjUgQyAyMS44MTcgNC41IDIwLjc5NCAzLjQ5MyAyMC43OTQgMi4yNSBaIE0gMTAuNDQzIDAgTCAxNS4wMTMgMCBMIDkuOTk3IDkgTCA1LjQyNyA5IFogTSAxNS44NDEgMCBMIDIwLjQxMSAwIEwgMTYuNDk0IDcuMDI4IEMgMTUuODg3IDguMTE3IDE0LjM3MiA5IDEzLjExIDkgTCAxMC44MjUgOSBaIiBmaWxsPSIjRkZGRkZGIiAvPjwvZz48L3N2Zz4%3D
