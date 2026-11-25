export default function LoadingBeranda() {
  return (
    <main className="animate-pulse">
      <div className="h-[620px] bg-slate-200 sm:h-[680px]" />
      <section className="mx-auto max-w-6xl space-y-6 px-4 py-16">
        <div className="h-8 w-64 rounded bg-slate-200" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="aspect-[16/10] bg-slate-200" />
              <div className="space-y-3 p-4">
                <div className="h-5 w-2/3 rounded bg-slate-200" />
                <div className="h-4 w-1/2 rounded bg-slate-200" />
                <div className="h-11 rounded-xl bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
