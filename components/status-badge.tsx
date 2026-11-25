import type { OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

const labels: Record<OrderStatus, string> = {
  menunggu_pembayaran: "Menunggu Pembayaran",
  dibayar: "Dibayar",
  dibatalkan: "Dibatalkan",
  selesai: "Selesai",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-bold",
        status === "dibayar" && "bg-emerald-100 text-emerald-700",
        status === "menunggu_pembayaran" && "bg-amber-100 text-amber-700",
        status === "dibatalkan" && "bg-red-100 text-red-700",
        status === "selesai" && "bg-slate-100 text-slate-700",
      )}
    >
      {labels[status]}
    </span>
  );
}
