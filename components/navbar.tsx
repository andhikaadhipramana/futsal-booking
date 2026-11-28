"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useDemoAccount } from "@/lib/demo-account";
import { cn } from "@/lib/utils";

export function Navbar({ admin = false }: { admin?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const demoAccount = useDemoAccount();
  const accountHref = demoAccount ? "/akun" : "/login";
  const accountLabel = demoAccount ? "Akun Saya" : "Masuk";
  const links = admin
    ? [["Dashboard", "/admin"]]
    : [
        ["Beranda", "/"],
        ["Lapangan", "/lapangan"],
        ["Jadwal", "/jadwal"],
        ["Pesanan Saya", "/pesanan"],
      ];
  const mobileLinks = admin ? links : [...links, ["Lokasi", "/#lokasi"], ["FAQ", "/#faq"]];
  const activeClasses = "bg-green-50 text-green-800";
  const inactiveClasses = "text-slate-600 hover:bg-slate-100 hover:text-green-700";

  function current(href: string) {
    if (pathname === href) return "page";
    if (href !== "/" && pathname.startsWith(`${href}/`)) return "location";
    return undefined;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href={admin ? "/admin" : "/"} onClick={() => setOpen(false)} className="flex items-center gap-2">
          <BrandLogo />
          <span className="text-lg font-black tracking-tight text-green-800">BEYOND</span>
        </Link>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} aria-current={current(href)} className={cn("rounded-lg px-3 py-2 text-sm font-semibold", current(href) ? activeClasses : inactiveClasses)}>
              {label}
            </Link>
          ))}
          {!admin && (
            <Link href={accountHref} aria-current={current(accountHref)} className="ml-2 inline-flex h-10 items-center gap-2 rounded-xl bg-green-700 px-4 text-sm font-bold text-white hover:bg-green-800 aria-[current=page]:bg-green-900">
              <User className="h-4 w-4" aria-hidden="true" /> {accountLabel}
            </Link>
          )}
        </nav>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} aria-controls="mobile-navigation">
          {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>
      <nav id="mobile-navigation" aria-label="Navigasi seluler" className={cn("max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-100 px-4 pb-4 md:hidden", open ? "block" : "hidden")}>
        <div className="mx-auto grid max-w-6xl gap-1 pt-3">
          {mobileLinks.map(([label, href]) => (
            <Link key={href} href={href} aria-current={current(href)} onClick={() => setOpen(false)} className={cn("rounded-lg px-3 py-3 text-sm font-semibold", current(href) ? activeClasses : inactiveClasses)}>
              {label}
            </Link>
          ))}
          {!admin && (
            <Link href={accountHref} aria-current={current(accountHref)} onClick={() => setOpen(false)} className="mt-1 flex items-center gap-2 rounded-xl bg-green-700 px-3 py-3 text-sm font-bold text-white hover:bg-green-800 aria-[current=page]:bg-green-900">
              <User className="h-4 w-4" aria-hidden="true" /> {accountLabel}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
