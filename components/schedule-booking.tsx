"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays, Clock3, Info, MapPin, MessageCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { SlotButton } from "@/components/slot-button";
import { Button } from "@/components/ui/button";
import { getVenueWhatsAppUrl } from "@/data/venue";
import { getCourtAvailability } from "@/lib/api";
import { formatBookingDate, getRestorableSlotIds, getSlotEndTime, matchesAvailableSlots, readDemoBookings, saveDemoDraft } from "@/lib/demo-booking";
import { getPricingHourLabels } from "@/lib/pricing";
import { cn, formatRupiah } from "@/lib/utils";
import { getVenueDate } from "@/lib/venue-time";
import type { Court, TimeSlot } from "@/types";

export function ScheduleBooking({
  courts,
  initialCourtId,
  restoreDraft,
}: {
  courts: Court[];
  initialCourtId?: string;
  restoreDraft: boolean;
}) {
  const pricingHours = getPricingHourLabels();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [courtId, setCourtId] = useState(
    initialCourtId ?? courts[0]?.id ?? "",
  );
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  const selectedCourt = courts.find((court) => court.id === courtId);
  const requestKey = `${courtId}:${date}:${reloadKey}`;
  const loading = Boolean(courtId && (!date || loadedKey !== requestKey));
  const selectedSlots = useMemo(
    () => slots.filter((slot) => selectedIds.includes(slot.id)),
    [slots, selectedIds],
  );
  const total = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);
  const hasSelection = selectedSlots.length > 0 && !loading && !loadError;
  const whatsappUrl = getVenueWhatsAppUrl(hasSelection && selectedCourt ? {
    court: selectedCourt.name,
    date: formatBookingDate(date),
    time: selectedSlots.map(({ time }) => `${time}–${getSlotEndTime(time)}`).join(", "),
  } : undefined);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      const today = getVenueDate();
      try {
        const draft = restoreDraft ? readDemoBookings().draft : null;
        if (draft && draft.date >= today && (!initialCourtId || draft.courtId === initialCourtId) && courts.some((court) => court.id === draft.courtId)) {
          setCourtId(draft.courtId);
          setDate(draft.date);
          setSelectedIds(draft.slots.map((slot) => slot.id));
          return;
        }
        if (draft) toast.info("Pilihan sebelumnya sudah tidak berlaku. Silakan pilih jadwal baru.");
      } catch {
        toast.info("Pilihan sebelumnya tidak bisa dibaca. Silakan pilih jadwal baru.");
      }
      setDate(today);
    });
    return () => { active = false; };
  }, [courts, initialCourtId, restoreDraft]);

  useEffect(() => {
    let active = true;
    let interval: ReturnType<typeof setInterval> | undefined;

    if (courtId && date) {
      const refreshAvailability = () => {
        getCourtAvailability(courtId, date)
          .then((result) => {
            if (!active) return;
            setSelectedIds((current) => getRestorableSlotIds(current, result));
            setSlots(result);
            setLoadError("");
            setLoadedKey(requestKey);
          })
          .catch((error: unknown) => {
            if (!active) return;
            console.error("Gagal memuat jadwal lapangan:", error);
            setLoadError("Jadwal belum bisa dimuat. Silakan coba lagi.");
            setSlots([]);
            setLoadedKey(requestKey);
          });
      };

      refreshAvailability();
      interval = setInterval(refreshAvailability, 60_000);
    } else {
      Promise.resolve().then(() => {
        if (!active) return;
        setSlots([]);
        setLoadError("");
        setLoadedKey(requestKey);
      });
    }

    return () => {
      active = false;
      if (interval) clearInterval(interval);
    };
  }, [courtId, date, reloadKey, requestKey]);

  function toggleSlot(slot: TimeSlot) {
    if (slot.status !== "available" && slot.status !== "selected") return;

    const slotIndex = slots.findIndex((item) => item.id === slot.id);
    const currentIndices = selectedIds
      .map((id) => slots.findIndex((item) => item.id === id))
      .filter((index) => index >= 0);
    const selected = selectedIds.includes(slot.id);

    if (selected) {
      if (currentIndices.length > 1 && slotIndex !== Math.min(...currentIndices) && slotIndex !== Math.max(...currentIndices)) {
        toast.warning("Jam yang dipilih harus tetap berurutan. Hapus pilihan dari ujung rentang.");
        return;
      }
      setSelectedIds((current) => current.filter((id) => id !== slot.id));
      return;
    }

    if (currentIndices.length > 0) {
      const firstIndex = Math.min(...currentIndices);
      const lastIndex = Math.max(...currentIndices);
      if (slotIndex !== firstIndex - 1 && slotIndex !== lastIndex + 1) {
        toast.warning("Pilih jam yang bersebelahan agar durasi booking berurutan.");
        return;
      }
    }

    setSelectedIds((current) => [...current, slot.id]);
  }

  function continueBooking() {
    if (!selectedCourt || !hasSelection) return;

    const draft = {
      courtId: selectedCourt.id,
      courtName: selectedCourt.name,
      date,
      slots: selectedSlots.map(({ id, time, price }) => ({ id, time, price })),
    };
    if (!matchesAvailableSlots(draft, slots)) {
      toast.warning("Jadwal berubah. Hapus pilihan dan pilih kembali slot yang berurutan.");
      return;
    }

    try {
      saveDemoDraft(draft);
      router.push("/checkout");
    } catch {
      toast.error("Pilihan tidak bisa disimpan di tab ini. Periksa pengaturan browser.");
    }
  }

  function resetSelection() {
    setSelectedIds([]);
  }

  return (
    <div className={cn("mx-auto max-w-6xl px-4 py-8 sm:py-12", hasSelection && "max-lg:pb-[calc(7rem+env(safe-area-inset-bottom))]")}>
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Jadwal lapangan</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Pilih waktu bermainmu</h1>
        <p className="mt-3 leading-7 text-slate-600">
          Pilih tanggal dan lapangan, lalu tandai satu atau beberapa jam berurutan.
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Ketersediaan di website ini masih simulasi. Tanyakan ketersediaan sebenarnya ke pengelola lewat WhatsApp.
        </p>
      </div>

      {courts.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
          <CalendarDays className="mx-auto h-9 w-9 text-slate-400" />
          <h2 className="mt-3 text-lg font-bold">Belum ada lapangan aktif</h2>
          <p className="mt-1 text-sm text-slate-500">Silakan cek kembali nanti.</p>
        </section>
      ) : (
        <>
          <section className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1.4fr] sm:p-6">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                <CalendarDays className="h-4 w-4 text-green-700" /> Tanggal bermain
              </span>
              <input
                type="date"
                value={date}
                min={date ? getVenueDate() : undefined}
                disabled={!date}
                onChange={(event) => {
                  if (!event.target.value) return;
                  if (event.target.value < getVenueDate()) {
                    toast.error("Tanggal booking tidak boleh sudah lewat.");
                    return;
                  }
                  setSelectedIds([]);
                  setDate(event.target.value);
                }}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </label>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                <MapPin className="h-4 w-4 text-green-700" /> Pilih lapangan
              </span>
              <select
                value={courtId}
                onChange={(event) => {
                  setSelectedIds([]);
                  setCourtId(event.target.value);
                }}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                {courts.map((court) => (
                  <option key={court.id} value={court.id}>
                    {court.name} · {court.type}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_330px]">
            <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h2 className="text-lg font-black">{selectedCourt?.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {date ? formatBookingDate(date) : "Pilih tanggal"} · Jam operasional {pricingHours.operating} WIB
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-800">
                  <Clock3 className="h-3.5 w-3.5" /> 1 slot = 1 jam
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-y border-slate-100 py-3 text-xs font-medium text-slate-600">
                <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-green-200" /> Tersedia</span>
                <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-red-200" /> Sudah dipesan / lewat</span>
                <span className="inline-flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-green-700" /> Dipilih</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-orange-50 px-3 py-2.5 text-xs leading-5 text-orange-900">
                <Info className="h-4 w-4 shrink-0" />
                Harga normal berlaku pukul {pricingHours.regular}. Harga jam ramai berlaku pukul {pricingHours.peak}.
              </div>

              {loading ? (
                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 8 }, (_, index) => (
                    <div key={index} className="h-[76px] animate-pulse rounded-xl bg-slate-100" />
                  ))}
                </div>
              ) : loadError ? (
                <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-5 text-center">
                  <p className="text-sm font-semibold text-red-800">{loadError}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => setReloadKey((current) => current + 1)}
                  >
                    <RotateCcw className="h-4 w-4" /> Coba lagi
                  </Button>
                </div>
              ) : slots.length === 0 ? (
                <p className="mt-6 rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
                  Jadwal belum tersedia untuk tanggal dan lapangan ini.
                </p>
              ) : (
                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4">
                  {slots.map((slot) => (
                    <SlotButton
                      key={slot.id}
                      slot={{ ...slot, status: selectedIds.includes(slot.id) ? "selected" : slot.status }}
                      onSelect={toggleSlot}
                    />
                  ))}
                </div>
              )}
            </section>

            <aside aria-labelledby="ringkasan-booking-title" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <h2 id="ringkasan-booking-title" className="text-lg font-black">Ringkasan booking</h2>
                {selectedSlots.length > 0 && (
                  <button
                    type="button"
                    onClick={resetSelection}
                    className="text-xs font-bold text-slate-500 hover:text-red-600"
                  >
                    Hapus pilihan
                  </button>
                )}
              </div>
              <div className="mt-4 space-y-3 border-b border-slate-100 pb-4 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Lapangan</span>
                  <span className="text-right font-semibold">{selectedCourt?.name ?? "-"}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Tanggal</span>
                  <span className="text-right font-semibold">{date ? formatBookingDate(date) : "-"}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Durasi</span>
                  <span className="font-semibold">{selectedSlots.length} jam</span>
                </div>
              </div>
              <div className="min-h-20 border-b border-slate-100 py-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Jam dipilih</p>
                {selectedSlots.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedSlots.map((slot) => (
                      <span key={slot.id} className="rounded-lg bg-green-50 px-2.5 py-1.5 text-xs font-bold text-green-800">
                        {slot.time}–{getSlotEndTime(slot.time)}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">Belum ada jam dipilih</p>
                )}
              </div>
              <div className="flex items-center justify-between py-4">
                <span className="font-bold">Total simulasi</span>
                <span className="text-xl font-black text-green-800">{formatRupiah(total)}</span>
              </div>
              <Button asChild size="lg" className="w-full">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" className="h-4 w-4" /> Tanya Jadwal via WhatsApp
                </a>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="mt-3 w-full"
                disabled={!hasSelection}
                onClick={continueBooking}
              >
                Coba Booking Demo <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
              <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                Mengirim pesan belum berarti slot dipesan. Booking demo tidak menahan slot atau memproses pembayaran.
              </p>
            </aside>
          </div>
          {hasSelection && (
            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white shadow-[0_-6px_24px_rgba(15,23,42,0.08)] lg:hidden">
              <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
                <div role="status">
                  <p className="text-xs font-semibold text-slate-600">{selectedSlots.length} jam dipilih</p>
                  <p className="text-base font-black text-green-800">{formatRupiah(total)}</p>
                </div>
                <Button asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle aria-hidden="true" className="h-4 w-4" /> Tanya via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
