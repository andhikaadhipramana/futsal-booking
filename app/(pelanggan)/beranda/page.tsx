import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { CourtCard } from "@/components/court-card";
import { Button } from "@/components/ui/button";
import { getCourts } from "@/lib/api";
import { getPricingHourLabels } from "@/lib/pricing";
import { formatRupiah } from "@/lib/utils";
import {
  mockBookingSteps,
  mockFacilities,
  mockVenue,
} from "@/data/mock";

const facilityIcons = [Users, MapPin, Sparkles, ShieldCheck];

export default async function BerandaPage() {
  const courts = (await getCourts()).filter((court) => court.active);
  const pricingHours = getPricingHourLabels();
  const questions = [
    { question: "Kapan tarif jam ramai berlaku?", answer: `Tarif jam ramai berlaku pukul ${pricingHours.peak} WIB. Tarif normal berlaku pukul ${pricingHours.regular} WIB.` },
    { question: "Apakah konfirmasi demo menahan slot?", answer: "Tidak. Kode pesanan demo hanya tersimpan di tab ini dan tidak menahan slot atau memproses pembayaran." },
    { question: "Bisakah saya membuat reservasi sungguhan dari website ini?", answer: "Belum. Jadwal dan pemesanan di website ini masih simulasi. Jangan gunakan kode demo sebagai bukti reservasi." },
  ];
  const startingPrice = courts.length > 0
    ? Math.min(...courts.map((court) => Math.min(court.regularPrice, court.peakPrice)))
    : null;

  return (
    <main>
      <section className="bg-linear-to-br from-green-950 to-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[1fr_0.95fr] lg:gap-12 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-green-200 sm:text-sm">
              <MapPin aria-hidden="true" className="h-4 w-4 text-orange-300" /> {mockVenue.address}
            </p>
            <h1 className="mt-4 max-w-xl text-4xl leading-tight font-black tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Booking lapangan futsal <span className="text-green-300">indoor di Jombang</span>
            </h1>
            <p className="mt-4 max-w-lg leading-7 text-slate-200 sm:text-lg">
              Lihat pilihan lapangan, bandingkan harga, dan cari jam yang cocok untuk timmu.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="lg" className="bg-green-300 px-6 text-green-950 hover:bg-green-200 focus-visible:ring-green-300 focus-visible:ring-offset-green-950">
                <Link href="/jadwal"><CalendarDays aria-hidden="true" className="h-5 w-5" /> Cek Jadwal</Link>
              </Button>
              <a href="#lapangan" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-green-100 underline-offset-4 hover:underline">
                Lihat lapangan <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <dl className="mt-7 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/20 pt-5 text-sm">
              {startingPrice !== null && (
                <div>
                  <dt className="text-green-200">Harga mulai</dt>
                  <dd className="mt-1 font-bold">{formatRupiah(startingPrice)}/jam</dd>
                </div>
              )}
              <div>
                <dt className="inline-flex items-center gap-1.5 text-green-200"><Clock3 aria-hidden="true" className="h-4 w-4" /> Jam operasional</dt>
                <dd className="mt-1 font-bold">{mockVenue.hours} WIB</dd>
              </div>
            </dl>
          </div>
          <figure className="overflow-hidden rounded-3xl bg-slate-950 ring-1 ring-white/15">
            <div className="relative aspect-[3/2]">
              <Image
                src="/futsal-domo-polideportivo.webp"
                alt="Tampak lebar lapangan futsal indoor dari tribun Domo Polideportivo di Guatemala"
                fill
                preload
                sizes="(max-width: 1023px) calc(100vw - 2rem), (max-width: 1151px) 45vw, 520px"
                className="object-contain"
              />
            </div>
            <figcaption className="px-4 py-3 text-xs leading-5 text-slate-300">
              <span className="block font-semibold text-white">Foto ilustrasi · Domo Polideportivo, Guatemala</span>
              Foto: <a href="https://commons.wikimedia.org/wiki/File:Futsal_at_Domo_Polideportivo,_Guatemala_City.jpg" className="underline underline-offset-2 hover:text-white">CDAG</a> ·{" "}
              <a href="https://creativecommons.org/licenses/by/2.0/" className="underline underline-offset-2 hover:text-white">CC BY 2.0</a> · Diubah ukuran dan format
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="lapangan" className="scroll-mt-20 bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Main makin seru</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Pilih lapangan favoritmu</h2>
              <p className="mt-3 max-w-xl text-slate-600">
                Temukan lapangan yang pas untuk pertandingan dan jadwal tim kamu.
              </p>
            </div>
            <Link href="/lapangan" className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800">
              Lihat semua lapangan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {courts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courts.map((court) => (
                <CourtCard key={court.id} court={court} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <Trophy className="mx-auto h-8 w-8 text-slate-400" />
              <h3 className="mt-3 font-bold">Lapangan belum tersedia</h3>
              <p className="mt-1 text-sm text-slate-500">Silakan cek kembali nanti.</p>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Fasilitas</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Fokus ke permainanmu</h2>
            <p className="mt-3 text-slate-600">Kami siapkan kenyamanan agar waktu main bareng tim terasa lebih maksimal.</p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockFacilities.map((facility, index) => {
              const Icon = facilityIcons[index] ?? ShieldCheck;
              return (
                <article key={facility.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-green-50 text-green-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-bold">{facility.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{facility.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="cara-booking" className="scroll-mt-20 bg-green-950 px-4 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-300">Mudah dan praktis</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Booking dalam 4 langkah</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-green-100/80">
              Nggak perlu bingung mengatur jadwal. Ikuti langkah singkat ini dan siap-siap turun ke lapangan.
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockBookingSteps.map((step) => (
              <article key={step.number} className="rounded-2xl border border-white/15 bg-white/[0.06] p-5">
                <span className="text-3xl font-black text-orange-400">{step.number}</span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-green-100/75">{step.description}</p>
              </article>
            ))}
          </div>
          <Button asChild variant="secondary" size="lg" className="mt-8 h-13">
            <Link href="/jadwal">Cek Jadwal Lapangan <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section id="lokasi" className="scroll-mt-20 bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Temukan kami</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Sampai jumpa di lapangan</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Datang dan rasakan pengalaman bermain futsal di Beyond, Jombang.
            </p>
            <div className="mt-6 space-y-4">
              <p className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                <span><strong className="block">Lokasi</strong>{mockVenue.address}</span>
              </p>
              <p className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                <span><strong className="block">Jam operasional</strong>{mockVenue.hours} WIB</span>
              </p>
              <p className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                <span><strong className="block">Kontak</strong>Nomor resmi belum tersedia di situs ini.</span>
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <MapPin aria-hidden="true" className="h-7 w-7 text-green-700" />
            <h3 className="mt-4 text-xl font-black">Lihat area Ploso</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Pin resmi Beyond belum tersedia. Tautan ini membuka peta area Ploso, bukan petunjuk arah ke lapangan.</p>
            <Button asChild variant="outline" className="mt-5">
              <a href={mockVenue.areaMapUrl}>Buka peta area <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Bantuan</p>
          <h2 id="faq-title" className="mt-2 text-3xl font-black tracking-tight">Pertanyaan umum</h2>
          <div className="mt-6 space-y-3">
            {questions.map(({ question, answer }) => (
              <details key={question} className="rounded-xl border border-slate-200 px-4">
                <summary className="cursor-pointer py-4 font-bold text-slate-900">{question}</summary>
                <p className="pb-4 text-sm leading-6 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/beranda" className="text-xl font-black tracking-tight text-green-400">BEYOND</Link>
            <p className="mt-2 text-sm text-slate-400">Tempat tim berkumpul dan bermain di Jombang.</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
            <Link href="/lapangan" className="hover:text-white">Lapangan</Link>
            <Link href="/jadwal" className="hover:text-white">Jadwal</Link>
            <a href="#lokasi" className="hover:text-white">Lokasi</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </div>
          <div className="text-sm text-slate-400">
            <p className="mt-1">© {new Date().getFullYear()} Beyond Futsal</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
