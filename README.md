# Payment Gateway Prototype

Frontend React + Vite yang memperagakan alur pembayaran gaya QRIS. UI-nya memvalidasi nominal, membangun tampilan QR dari payload pembayaran, dan punya modul service untuk membuat user serta transaksi lewat API.

> Ini prototype, bukan payment processor sungguhan. Jangan pakai untuk dana pelanggan asli atau data pribadi tanpa backend yang diamankan, integrasi provider, autentikasi, audit log, dan review compliance.

## Yang sudah ada

| Area | Perilaku saat ini |
| --- | --- |
| Frontend | SPA React dengan komponen layout yang bisa dipakai ulang |
| Input nominal | Validasi di sisi client dan format Rupiah Indonesia |
| Tampilan QR | QR dibuat dari payload pembayaran yang sedang berjalan |
| Service API | Modul user dan transaksi terpisah, keduanya pakai Axios |
| Build | Production build Vite dan pengecekan ESLint |

Halaman live sengaja disebut prototype karena panggilan transaksi ke backend dan kredensial provider memang bukan bagian dari repo ini.

## Kebutuhan

Node.js 18 ke atas dan npm.

## Jalankan lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka URL lokal yang dicetak Vite. Untuk build produksi:

```bash
npm run lint
npm run build
npm run preview
```

## Konfigurasi API

Frontend default-nya memakai route same-origin. Set variable berikut kalau API-nya dihost di tempat lain:

| Variable | Default | Kegunaan |
| --- | --- | --- |
| `VITE_API_USER_URL` | `/api/create-user` | Endpoint pembuatan user |
| `VITE_API_PAYMENT_URL` | `/api/create-transaction` | Endpoint pembuatan transaksi |

Hanya konfigurasi publik yang boleh masuk variable `VITE_*`. Server key provider, signing secret, dan kredensial database wajib tetap di backend.

## Catatan deployment

Deploy folder `dist/` hasil build ke host yang mendukung Vite. Set dua URL API untuk environment tersebut, lalu pastikan CORS, HTTPS, error handling, idempotency, dan validasi webhook signature sudah beres di server sebelum menghubungkan provider pembayaran.

## Keterbatasan

Repo ini belum punya backend pembayaran, state order yang persisten, autentikasi, pemrosesan webhook, test otomatis, atau keamanan pembayaran tingkat produksi. Anggap payload QR saat ini sebagai nilai demonstrasi sampai diganti payload transaksi yang dibuat server dan diterbitkan provider.

## Lisensi

[MIT License](LICENSE)
