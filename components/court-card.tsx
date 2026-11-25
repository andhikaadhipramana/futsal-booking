import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Court } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CourtCard({ court }: { court: Court }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[16/10] bg-slate-100">
        <Link href={`/lapangan/${court.id}`} aria-label={`Lihat detail ${court.name}`}>
          <Image src={court.images[0]} alt={court.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </Link>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold">
              <Link href={`/lapangan/${court.id}`} className="hover:text-green-700">
                {court.name}
              </Link>
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-4 w-4" /> Jombang
            </p>
          </div>
          <span className="rounded-lg bg-green-50 px-2 py-1 text-xs font-bold text-green-700">{court.type}</span>
        </div>
        <p className="text-sm text-slate-500">
          Mulai <strong className="text-base text-slate-950">{formatRupiah(court.regularPrice)}</strong>/jam
        </p>
        <Button asChild className="mt-4 w-full">
          <Link href={`/lapangan/${court.id}`}>Lihat Lapangan</Link>
        </Button>
      </div>
    </article>
  );
}
