import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, User } from "lucide-react";
import { DemoAccountAction } from "@/components/demo-account-action";

export const metadata: Metadata = {
  title: "Masuk | Beyond Futsal",
};

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-green-700">
          <ArrowLeft className="h-4 w-4" /> Kembali ke beranda
        </Link>
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-green-50 text-green-700">
            <User className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-green-700">Beyond Futsal</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Masuk ke akun</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Coba halaman akun pelanggan sebelum memilih jadwal bermain.
          </p>
          <div className="my-6 flex items-start gap-3 rounded-xl bg-green-50 p-4 text-sm leading-6 text-green-900">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p><strong className="block">Mode demo</strong> Tidak perlu mendaftar atau memasukkan kata sandi. Profil ini hanya simulasi di tab ini.</p>
          </div>
          <DemoAccountAction mode="login" />
        </section>
      </div>
    </main>
  );
}