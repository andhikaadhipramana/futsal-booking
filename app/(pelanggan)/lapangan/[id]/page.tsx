import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock3, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCourtById, getCourts } from "@/lib/api";
import { formatRupiah } from "@/lib/utils";
import { getPricingHourLabels } from "@/lib/pricing";

type CourtPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const courts = await getCourts();
  return courts.map((court) => ({ id: court.id }));
}

export default function CourtDetailPage({
  params,
}: CourtPageProps) {
  return (
    <Suspense fallback={<CourtDetailSkeleton />}>
      <CourtDetailContent params={params} />
    </Suspense>
  );
}

async function CourtDetailContent({
  params,
}: CourtPageProps) {
  const { id } = await params;
  const court = await getCourtById(id);
  const pricingHours = getPricingHourLabels();

  if (!court) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <Link href="/lapangan" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-700">
        <ArrowLeft className="h-4 w-4" /> Semua lapangan
      </Link>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section>
          {court.images.length > 0 ? (
            <figure className="grid gap-3 sm:grid-cols-[1fr_180px]">
              <div className={`relative h-[clamp(18rem,95vw,36rem)] overflow-hidden rounded-2xl bg-slate-100 ${court.images.length === 1 ? "sm:col-span-2" : ""}`}>
                <Image
                  src={court.images[0]}
                  alt={`Foto ${court.name} Beyond Futsal`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 65vw"
                  className="object-contain"
                />
              </div>
              {court.images.length > 1 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                  {court.images.slice(1, 3).map((image, index) => (
                    <div key={image} className="relative min-h-32 overflow-hidden rounded-2xl bg-slate-100 sm:min-h-0">
                      <Image
                        src={image}
                        alt={`Foto tambahan ${index + 1} untuk ${court.name}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </figure>
          ) : (
            <div className="grid min-h-72 place-items-center rounded-2xl bg-slate-100 text-sm text-slate-500">
              Foto lapangan belum tersedia
            </div>
          )}

          <div className="mt-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Beyond Futsal</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{court.name}</h1>
              </div>
              <span className="rounded-full bg-green-50 px-3 py-1.5 text-sm font-bold text-green-800">{court.type}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-green-700" /> Jombang, Jawa Timur</span>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-green-700" /> {court.size}</span>
            </div>
            <p className="mt-5 max-w-3xl leading-7 text-slate-600">{court.description}</p>

            <div className="mt-8">
              <h2 className="text-xl font-black">Fasilitas lapangan</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {court.facilities.map((facility) => (
                  <li key={facility} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-green-50 text-green-700">
                      <Check className="h-4 w-4" />
                    </span>
                    {facility}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 sm:p-6">
          <h2 className="text-xl font-black">Harga sewa</h2>
          <p className="mt-1 text-sm text-slate-500">Harga per jam, pilih jadwal yang cocok.</p>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between gap-3 rounded-xl bg-green-50 p-4">
              <div>
                <p className="font-bold text-slate-900">Jam normal</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-600">
                  <Clock3 className="h-3.5 w-3.5" /> {pricingHours.regular}
                </p>
              </div>
              <p className="text-right font-black text-green-800">{formatRupiah(court.regularPrice)}<span className="block text-xs font-medium">/jam</span></p>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl bg-orange-50 p-4">
              <div>
                <p className="font-bold text-slate-900">Jam ramai</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-600">
                  <Clock3 className="h-3.5 w-3.5" /> {pricingHours.peak}
                </p>
              </div>
              <p className="text-right font-black text-orange-700">{formatRupiah(court.peakPrice)}<span className="block text-xs font-medium">/jam</span></p>
            </div>
          </div>

          <Button asChild size="lg" className="mt-5 w-full">
            <Link href={`/jadwal?courtId=${encodeURIComponent(court.id)}`}>Pilih Jadwal</Link>
          </Button>
          <p className="mt-3 text-center text-xs text-slate-500">Jadwal dan ketersediaan ditampilkan secara simulasi.</p>
        </aside>
      </div>
    </main>
  );
}

function CourtDetailSkeleton() {
  return (
    <main className="mx-auto max-w-6xl animate-pulse px-4 py-10">
      <div className="h-5 w-36 rounded bg-slate-200" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <div className="h-72 rounded-2xl bg-slate-200 sm:h-[420px]" />
          <div className="mt-6 h-8 w-64 rounded bg-slate-200" />
          <div className="mt-4 h-5 w-full max-w-xl rounded bg-slate-100" />
        </div>
        <div className="h-80 rounded-2xl bg-slate-100" />
      </div>
    </main>
  );
}
