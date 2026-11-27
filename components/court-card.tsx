import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Trophy, Users } from "lucide-react";
import type { Court } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CourtCard({ court }: { court: Court }) {
  const detailHref = `/lapangan/${court.id}`;
  const scheduleHref = `/jadwal?courtId=${encodeURIComponent(court.id)}`;
  const cover = court.images[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative grid aspect-[16/9] place-items-center bg-green-950 text-green-200">
        {cover ? (
          <>
            <Image src={cover} alt={`Ilustrasi untuk ${court.name}`} fill className="object-cover" sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) 50vw, 360px" />
            <span className="absolute right-3 bottom-3 rounded-full bg-slate-950/85 px-2.5 py-1 text-xs font-semibold text-white">Foto ilustrasi</span>
          </>
        ) : (
          <div className="text-center text-sm">
            <Trophy aria-hidden="true" className="mx-auto mb-2 h-6 w-6" /> Foto belum tersedia
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-xl font-black tracking-tight">{court.name}</h3>
        <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-full bg-green-50 px-2.5 py-1 text-green-800">{court.type}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
            <Users aria-hidden="true" className="h-3.5 w-3.5" /> {court.size}
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
          <div>
            <dt className="text-xs font-semibold text-slate-600">Jam normal</dt>
            <dd className="mt-1 text-sm font-black text-green-800">{formatRupiah(court.regularPrice)} <span className="whitespace-nowrap text-xs font-medium text-slate-600">/ jam</span></dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-slate-600">Jam ramai</dt>
            <dd className="mt-1 text-sm font-black text-orange-800">{formatRupiah(court.peakPrice)} <span className="whitespace-nowrap text-xs font-medium text-slate-600">/ jam</span></dd>
          </div>
        </dl>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4">
          {court.active && (
            <Button asChild>
              <Link href={scheduleHref} aria-label={`Pilih jadwal ${court.name}`}>
                <CalendarDays aria-hidden="true" className="h-4 w-4" /> Pilih Jadwal
              </Link>
            </Button>
          )}
          <Link href={detailHref} aria-label={`Lihat detail ${court.name}`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-green-800 underline-offset-4 hover:underline">
            Lihat Detail <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
