"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BerandaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Gagal memuat beranda Beyond:", error);
  }, [error]);

  return (
    <main className="grid min-h-[60vh] place-items-center px-4 py-16">
      <div className="max-w-md text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-red-600" />
        <h1 className="mt-4 text-2xl font-black">Beranda belum bisa dimuat</h1>
        <p className="mt-2 text-slate-600">Terjadi kendala saat mengambil data. Coba muat ulang halaman.</p>
        <Button className="mt-6" onClick={reset}>Coba lagi</Button>
      </div>
    </main>
  );
}
