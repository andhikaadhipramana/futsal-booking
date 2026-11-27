# Beyond Futsal

Website front end Next.js untuk booking lapangan futsal Beyond di Jombang, Jawa Timur.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Struktur

- `app/` - route pelanggan dan admin
- `components/` - komponen antarmuka yang dipakai ulang
- `data/mock.ts` - data contoh
- `lib/api.ts` - fungsi akses data dummy
- `types/` - tipe data TypeScript

Semua proses booking, pembayaran, dan autentikasi masih berupa simulasi front end.

Untuk mencoba akun pelanggan, buka `/login` dan pilih **Masuk dengan akun demo**. Halaman `/akun` menampilkan profil contoh dan tombol keluar. Status demo disimpan di tab browser, tanpa kredensial atau backend.

Alur pemesanan demo tidak memerlukan login: pilih slot di `/jadwal`, tinjau di `/checkout`, lalu konfirmasi untuk melihat kode di `/pesanan`. Draft dan riwayat hanya disimpan di tab yang sama; tidak ada reservasi atau pembayaran sungguhan.
