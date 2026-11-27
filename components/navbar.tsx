"use client";

import Link from "next/link";
import { Menu, User } from "lucide-react";
import { useState } from "react";
import { useDemoAccount } from "@/lib/demo-account";
import { cn } from "@/lib/utils";

export function Navbar({ admin = false }: { admin?: boolean }) {
  const [open, setOpen] = useState(false);
  const demoAccount = useDemoAccount();
  const accountHref = demoAccount ? "/akun" : "/login";
  const accountLabel = demoAccount ? "Akun Saya" : "Masuk";
  const links = admin
    ? [["Dashboard", "/admin"]]
    : [
        ["Beranda", "/beranda"],
        ["Lapangan", "/lapangan"],
        ["Jadwal", "/jadwal"],
        ["Pesanan Saya", "/pesanan"],
      ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href={admin ? "/admin" : "/beranda"} className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-green-700 text-sm font-black text-white">B</span>
          <span className="text-lg font-black tracking-tight text-green-800">BEYOND</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-green-700">
              {label}
            </Link>
          ))}
          {!admin && (
            <Link href={accountHref} className="ml-2 inline-flex h-10 items-center gap-2 rounded-xl bg-green-700 px-4 text-sm font-bold text-white hover:bg-green-800">
              <User className="h-4 w-4" aria-hidden="true" /> {accountLabel}
            </Link>
          )}
        </nav>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} aria-controls="mobile-navigation">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <nav id="mobile-navigation" className={cn("border-t border-slate-100 px-4 pb-4 md:hidden", open ? "block" : "hidden")}>
        <div className="mx-auto grid max-w-6xl gap-1 pt-3">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-slate-100">
              {label}
            </Link>
          ))}
          {!admin && (
            <Link href={accountHref} onClick={() => setOpen(false)} className="mt-1 flex items-center gap-2 rounded-xl bg-green-700 px-3 py-3 text-sm font-bold text-white hover:bg-green-800">
              <User className="h-4 w-4" aria-hidden="true" /> {accountLabel}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
