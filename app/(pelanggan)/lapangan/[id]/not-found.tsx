import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CourtNotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center px-4 py-16">
      <div className="max-w-md text-center">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Lapangan Beyond</p>
        <h1 className="mt-3 text-3xl font-black">Lapangan tidak ditemukan</h1>
        <p className="mt-2 text-slate-600">Lapangan yang kamu cari mungkin sudah tidak tersedia.</p>
        <Button asChild className="mt-6">
          <Link href="/lapangan">Lihat semua lapangan</Link>
        </Button>
      </div>
    </main>
  );
}
