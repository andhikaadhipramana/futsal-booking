import type { Metadata } from "next";
import { AccountPanel } from "@/components/account-panel";

export const metadata: Metadata = {
  title: "Akun Saya | Beyond Futsal",
};

export default function AccountPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Beyond Futsal</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Akun Saya</h1>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <AccountPanel />
        </div>
      </div>
    </main>
  );
}