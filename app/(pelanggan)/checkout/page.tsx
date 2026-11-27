import type { Metadata } from "next";
import { DemoBookingPanel } from "@/components/demo-booking-panel";

export const metadata: Metadata = { title: "Tinjau Pesanan | Beyond Futsal" };

export default function CheckoutPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Pemesanan demo</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Tinjau Pesanan</h1>
        <p className="mt-3 mb-6 text-sm leading-6 text-slate-600">Periksa jadwal dan total sebelum konfirmasi. Ini bukan reservasi sungguhan dan tidak ada pembayaran.</p>
        <DemoBookingPanel mode="checkout" />
      </div>
    </main>
  );
}