"use client";

import type { TimeSlot } from "@/types";
import { cn, formatRupiah } from "@/lib/utils";

export function SlotButton({
  slot,
  onSelect,
}: {
  slot: TimeSlot;
  onSelect: (slot: TimeSlot) => void;
}) {
  const disabled = slot.status === "booked" || slot.status === "expired";
  const statusLabel =
    slot.status === "booked"
      ? "Sudah dipesan"
      : slot.status === "expired"
        ? "Waktu sudah lewat"
        : slot.status === "selected"
          ? "Dipilih"
          : "Tersedia";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(slot)}
      aria-pressed={slot.status === "selected"}
      aria-label={`${slot.time} sampai ${String(Number(slot.time.slice(0, 2)) + 1).padStart(2, "0")}:00, ${statusLabel}, ${formatRupiah(slot.price)}`}
      className={cn(
        "min-h-[76px] rounded-xl border px-2 py-2 text-center text-sm font-bold transition",
        slot.status === "available" && "border-green-200 bg-green-50 text-green-800 hover:border-green-400 hover:bg-green-100",
        slot.status === "selected" && "border-green-700 bg-green-700 text-white",
        slot.status === "booked" && "cursor-not-allowed border-red-200 bg-red-50 text-red-700",
        slot.status === "expired" && "cursor-not-allowed border-red-100 bg-red-50/70 text-red-500",
      )}
    >
      <span className="block">{slot.time}</span>
      <span className={cn("mt-1 block text-[11px]", disabled ? "font-semibold" : "font-medium opacity-75")}>
        {statusLabel}
      </span>
      <span className="mt-0.5 block text-[11px] font-medium opacity-75">
        {formatRupiah(slot.price)}
      </span>
    </button>
  );
}
