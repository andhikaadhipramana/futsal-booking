export default function LoadingCourtDetail() {
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
