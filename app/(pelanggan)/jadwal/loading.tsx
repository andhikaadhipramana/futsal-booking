export default function LoadingJadwalPage() {
  return (
    <main className="mx-auto max-w-6xl animate-pulse px-4 py-10">
      <div className="h-9 w-72 rounded bg-slate-200" />
      <div className="mt-3 h-5 w-full max-w-lg rounded bg-slate-100" />
      <div className="mt-8 h-28 rounded-2xl bg-slate-100" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_330px]">
        <div className="h-[480px] rounded-2xl bg-slate-100" />
        <div className="h-72 rounded-2xl bg-slate-100" />
      </div>
    </main>
  );
}
