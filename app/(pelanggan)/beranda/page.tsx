import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Clock3,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { CourtCard } from "@/components/court-card";
import { Button } from "@/components/ui/button";
import { getCourts } from "@/lib/api";
import {
  mockBookingSteps,
  mockFacilities,
  mockTestimonials,
  mockVenue,
} from "@/data/mock";

const facilityIcons = [Users, MapPin, Sparkles, ShieldCheck];

export default async function BerandaPage() {
  const courts = await getCourts();

  return (
    <main>
      <section className="relative isolate min-h-[620px] overflow-hidden bg-slate-950 text-white sm:min-h-[680px]">
        <Image
          src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=2000&q=90"
          alt="Pemain futsal sedang bertanding di lapangan"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />
        <div className="mx-auto flex min-h-[620px] max-w-6xl items-center px-4 py-16 sm:min-h-[680px]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide text-green-200 backdrop-blur sm:text-sm">
              <MapPin className="h-4 w-4" /> LAPANGAN FUTSAL DI JOMBANG
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">
              Enjoy your game,
              <br />
              <span className="text-green-400">Booking jadi lebih mudah.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
              Cari lapangan, pilih jam, dan siapkan timmu. Semua jadwal
              lapangan Beyond bisa kamu cek dengan mudah dan praktis.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-14 justify-between rounded-xl px-6 text-base">
                <Link href="/jadwal">
                  Booking Sekarang <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 border-white/30 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white"
              >
                <a href="#lapangan">Lihat Lapangan</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-slate-200">
              <span className="inline-flex items-center gap-2">
                <Trophy className="h-4 w-4 text-orange-400" /> Lapangan berkualitas
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-orange-400" /> Jadwal fleksibel
              </span>
            </div>
          </div>
        </div>
        <a
          href="#lapangan"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold text-white/75 sm:flex"
        >
          Jelajahi Beyond <ArrowDown className="h-4 w-4" />
        </a>
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

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Cerita mereka</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Kata pemain Beyond</h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {mockTestimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex gap-1 text-orange-500" aria-label="5 dari 5 bintang">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
                </div>
                <Quote className="mt-5 h-6 w-6 text-green-700/40" />
                <p className="mt-2 min-h-20 leading-7 text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
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
                <span><strong className="block">Jam operasional</strong>{mockVenue.hours}</span>
              </p>
              <p className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                <span><strong className="block">Hubungi kami</strong>{mockVenue.phone}</span>
              </p>
            </div>
          </div>
          <div className="h-72 overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:h-96">
            <iframe
              title="Peta lokasi lapangan futsal di Jombang"
              src={mockVenue.mapUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
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
          </div>
          <div className="text-sm text-slate-400">
            <p>Kontak: {mockVenue.phone}</p>
            <p className="mt-1">© {new Date().getFullYear()} Beyond Futsal</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
