import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { CourtCard } from "@/components/court-card";
import { getCourts } from "@/lib/api";

export default function LapanganPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <Link href="/beranda" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-green-700">
        <ArrowLeft className="h-4 w-4" /> Kembali ke beranda
      </Link>
      <div className="mt-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Beyond Futsal · Jombang</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Pilih lapangan favoritmu</h1>
        <p className="mt-3 flex items-center gap-2 text-slate-600">
          <MapPin className="h-4 w-4 text-green-700" /> Lapangan futsal nyaman untuk tim kamu.
        </p>
      </div>
      <Suspense fallback={<CourtListSkeleton />}>
        <CourtList />
      </Suspense>
    </main>
  );
}

async function CourtList() {
  const courts = (await getCourts()).filter((court) => court.active);

  return (
    <>
      {courts.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courts.map((court) => <CourtCard key={court.id} court={court} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <h2 className="font-bold">Belum ada lapangan yang tersedia</h2>
          <p className="mt-2 text-sm text-slate-500">Silakan cek kembali nanti.</p>
        </div>
      )}
    </>
  );
}

function CourtListSkeleton() {
  return (
    <div className="mt-8 grid animate-pulse gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2].map((item) => (
        <div key={item} className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="aspect-[16/10] bg-slate-200" />
          <div className="space-y-3 p-4">
            <div className="h-5 w-2/3 rounded bg-slate-200" />
            <div className="h-4 w-1/2 rounded bg-slate-100" />
            <div className="h-11 rounded-xl bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
