"use client";

import Link from "next/link";
import { CalendarDays, User } from "lucide-react";
import { DemoAccountAction } from "@/components/demo-account-action";
import { Button } from "@/components/ui/button";
import { useDemoAccount } from "@/lib/demo-account";

export function AccountPanel() {
  const active = useDemoAccount();

  if (active === null) {
    return <p role="status" className="text-sm text-slate-600">Memuat akun…</p>;
  }

  if (!active) {
    return (
      <>
        <h2 className="text-xl font-black">Kamu belum masuk</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Masuk dengan akun demo untuk melihat profil pelanggan.</p>
        <Button asChild className="mt-5">
          <Link href="/login">Ke halaman masuk</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-green-50 text-green-700">
          <User className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-green-700">Profil demo</p>
          <h2 className="mt-1 text-xl font-black">Pelanggan Beyond</h2>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-600">
        Ini profil contoh, bukan akun terdaftar. Pesanan simulasi hanya tersimpan di tab ini.
      </p>
      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/jadwal"><CalendarDays className="h-4 w-4" aria-hidden="true" /> Pilih jadwal</Link>
        </Button>
        <Button asChild size="lg" variant="outline"><Link href="/pesanan">Pesanan Saya</Link></Button>
        <DemoAccountAction mode="logout" />
      </div>
    </>
  );
}