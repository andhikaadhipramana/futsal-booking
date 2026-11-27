import type { Metadata } from "next";
import Link from "next/link";
import { DemoBookingPanel } from "@/components/demo-booking-panel";

export const metadata: Metadata = { title: "Pesanan Saya | Beyond Futsal" };

export default function OrdersPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Pemesanan demo</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Pesanan Saya</h1>
        <p className="mt-3 mb-6 text-sm leading-6 text-slate-600">Riwayat simulasi hanya tersedia di tab ini. Kode pesanan demo tidak berlaku sebagai bukti reservasi.</p>
        <DemoBookingPanel mode="orders" />
        <Link href="/jadwal" className="mt-6 inline-flex min-h-11 items-center text-sm font-bold text-green-800 underline underline-offset-4">Lihat jadwal lapangan</Link>
      </div>
    </main>
  );
}