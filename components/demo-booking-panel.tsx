"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getCourtAvailability } from "@/lib/api";
import { confirmDemoDraft, formatBookingDate, getSlotEndTime, matchesAvailableSlots, readDemoBookings } from "@/lib/demo-booking";
import type { BookingDetails, BookingState } from "@/lib/demo-booking";
import { formatRupiah } from "@/lib/utils";

function BookingSummary({ booking }: { booking: BookingDetails }) {
  const start = booking.slots[0].time;
  const end = getSlotEndTime(booking.slots[booking.slots.length - 1].time);
  const total = booking.slots.reduce((sum, slot) => sum + slot.price, 0);

  return (
    <dl className="grid gap-4 text-sm sm:grid-cols-2">
      <div><dt className="text-slate-600">Lapangan</dt><dd className="font-bold">{booking.courtName}</dd></div>
      <div><dt className="text-slate-600">Tanggal</dt><dd className="font-bold">{formatBookingDate(booking.date)}</dd></div>
      <div><dt className="text-slate-600">Jam bermain</dt><dd className="font-bold">{start}–{end} WIB ({booking.slots.length} jam)</dd></div>
      <div><dt className="text-slate-600">Total simulasi</dt><dd className="text-lg font-black text-green-800">{formatRupiah(total)}</dd></div>
    </dl>
  );
}

export function DemoBookingPanel({ mode }: { mode: "checkout" | "orders" }) {
  const router = useRouter();
  const [state, setState] = useState<BookingState | "error" | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [issue, setIssue] = useState("");

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      try {
        setState(readDemoBookings());
      } catch {
        setState("error");
      }
    });
    return () => { active = false; };
  }, []);

  async function confirm(draft: BookingDetails) {
    if (confirming) return;
    setConfirming(true);
    setIssue("");
    try {
      const availability = await getCourtAvailability(draft.courtId, draft.date);
      if (!matchesAvailableSlots(draft, availability)) {
        setIssue("Jadwal atau tarif berubah. Kembali ke jadwal dan pilih slot lagi.");
        return;
      }

      const order = confirmDemoDraft(draft);
      if (!order) {
        setState(readDemoBookings());
        setIssue("Pilihan berubah. Periksa kembali jadwal sebelum mengonfirmasi.");
        return;
      }
      setState((current) => current && current !== "error" ? { draft: null, orders: [order, ...current.orders] } : current);
      toast.success("Pesanan simulasi dibuat", { description: `Kode pesanan: ${order.code}` });
      router.replace("/pesanan");
    } catch {
      setIssue("Pesanan demo belum bisa disimpan. Coba lagi dan pastikan penyimpanan tab dapat diakses.");
    } finally {
      setConfirming(false);
    }
  }

  if (state === null) return <p role="status" className="text-sm text-slate-600">Memuat pesanan…</p>;
  if (state === "error") return <p role="alert" className="text-sm text-red-800">Data demo di tab ini tidak bisa dibaca. Coba mulai dari jadwal di tab baru.</p>;

  if (mode === "orders" && state.orders.length > 0) {
    return (
      <ul className="space-y-4">
        {state.orders.map((order) => (
          <li key={order.code} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <h2 className="font-black">{order.code}</h2>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-800">Pesanan simulasi</span>
            </div>
            <BookingSummary booking={order} />
          </li>
        ))}
      </ul>
    );
  }

  const draft = state.draft;
  if (mode === "orders" || !draft) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6">
        <h2 className="font-black">{mode === "orders" ? "Belum ada pesanan simulasi" : "Belum ada jadwal untuk ditinjau"}</h2>
        <p className="mt-2 text-sm text-slate-600">Pilih lapangan dan jam bermain untuk memulai.</p>
        <Button asChild className="mt-4"><Link href="/jadwal">Pilih Jadwal</Link></Button>
      </div>
    );
  }

  return (
    <section aria-label="Detail pesanan" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <BookingSummary booking={draft} />
      {issue && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-900">{issue}</p>}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
        <Button type="button" disabled={confirming} onClick={() => void confirm(draft)}>
          {confirming ? "Memeriksa jadwal…" : "Konfirmasi Pesanan Demo"}
        </Button>
        {confirming ? null : (
          <Button asChild variant="outline"><Link href={`/jadwal?courtId=${encodeURIComponent(draft.courtId)}&restore=1`}>Kembali ke Jadwal</Link></Button>
        )}
      </div>
    </section>
  );
}