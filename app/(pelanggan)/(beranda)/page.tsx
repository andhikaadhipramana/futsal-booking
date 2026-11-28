import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { CourtCard } from "@/components/court-card";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { getCourts } from "@/lib/api";
import { getPricingHourLabels } from "@/lib/pricing";
import { formatRupiah } from "@/lib/utils";
import {
  mockBookingSteps,
  mockFacilities,
  mockOperatingHours,
} from "@/data/mock";
import { testimonials } from "@/data/testimonials";
import { getVenueContactUrl, getVenueWhatsAppUrl, venue, venueAddressMapUrl } from "@/data/venue";

const facilityIcons = [Users, MapPin, Sparkles, ShieldCheck];

const shareTitle = "Beyond Futsal";
const shareDescription = "Lapangan futsal indoor di Ploso, Jombang.";
const shareImage = {
  url: "/beranda-beyond.jpg",
  width: 716,
  height: 428,
  alt: "Lapangan futsal indoor Beyond di Jombang",
};

export const metadata: Metadata = {
  title: "Beyond Futsal — Lapangan Futsal Indoor di Ploso, Jombang",
  description: "Lihat lapangan, tarif per jam, dan alamat Beyond Futsal di Ploso, Jombang. Tanyakan ketersediaan jadwal lewat WhatsApp resmi.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: shareTitle,
    title: shareTitle,
    description: shareDescription,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: [shareImage],
  },
};

const venueJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": `${venue.websiteUrl}/#beyond-futsal`,
  name: shareTitle,
  description: shareDescription,
  url: `${venue.websiteUrl}/`,
  image: new URL(shareImage.url, venue.websiteUrl).href,
  telephone: `+${venue.whatsappNumber}`,
  address: { "@type": "PostalAddress", ...venue.postalAddress },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => `https://schema.org/${day}`),
    opens: `${String(mockOperatingHours.opensAt).padStart(2, "0")}:00`,
    closes: `${String(mockOperatingHours.closesAt).padStart(2, "0")}:00`,
  },
};

export default async function BerandaPage() {
  const courts = (await getCourts()).filter((court) => court.active);
  const pricingHours = getPricingHourLabels();
  const faqGroups = [
    {
      title: "Jadwal dan tarif",
      questions: [
        { question: "Kapan lapangan buka?", answer: `Jam operasional setiap hari pukul ${pricingHours.operating} WIB.` },
        { question: "Kapan tarif jam ramai berlaku?", answer: `Tarif jam ramai berlaku pukul ${pricingHours.peak} WIB. Tarif normal berlaku pukul ${pricingHours.regular} WIB.` },
        { question: "Bagaimana cara memastikan jadwal tersedia?", answer: "Jadwal di website masih simulasi. Hubungi WhatsApp resmi Beyond untuk menanyakan ketersediaan dan cara reservasi. Konfirmasi demo tidak menahan slot, memproses pembayaran, atau menjadi bukti reservasi." },
      ],
    },
    {
      title: "Sebelum bermain",
      questions: [
        { question: "Kapan sebaiknya saya tiba?", answer: "Tanyakan waktu kedatangan kepada pengelola saat mengonfirmasi jadwal, terutama jika tim perlu waktu untuk bersiap." },
        { question: "Sepatu apa yang boleh dipakai?", answer: "Lapangan menggunakan lantai vinyl indoor. Konfirmasi jenis sol yang diperbolehkan ke pengelola sebelum membawa sepatu tim." },
      ],
    },
    {
      title: "Pembayaran dan perubahan jadwal",
      questions: [
        { question: "Apakah perlu uang muka (DP)?", answer: "Ketentuan DP dan metode pembayaran belum dicantumkan di website. Konfirmasi keduanya melalui WhatsApp resmi sebelum melakukan pembayaran." },
        { question: "Bagaimana jika ingin mengubah atau membatalkan jadwal?", answer: "Hubungi pengelola lewat WhatsApp dengan menyebutkan lapangan, tanggal, dan jam yang sudah disepakati. Tanyakan batas waktu, biaya, dan ketentuan pengembalian dana sebelum mengubah atau membatalkan jadwal." },
      ],
    },
  ];
  const startingPrice = courts.length > 0
    ? Math.min(...courts.map((court) => Math.min(court.regularPrice, court.peakPrice)))
    : null;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(venueJsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="relative isolate overflow-hidden bg-green-950 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-32 -z-10 h-96 w-96 rounded-full border border-lime-200/20 ring-1 ring-lime-200/10 ring-offset-28 ring-offset-green-950" />
        <div className="mx-auto grid max-w-6xl items-center gap-7 px-4 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-green-200 sm:text-sm">
              <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-lime-300" /> {venue.area}
            </p>
            <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.02] font-black tracking-tight">
              Siapkan timmu. <span className="block text-lime-300">Main di Beyond.</span>
            </h1>
            <p className="mt-4 max-w-lg leading-7 text-slate-200 sm:text-lg">
              Lapangan futsal indoor 5v5 di Ploso, Jombang. Pilih lapangan dan tanyakan jadwal untuk timmu.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button asChild size="lg" className="bg-lime-300 px-6 text-green-950 hover:bg-lime-200 focus-visible:ring-lime-300 focus-visible:ring-offset-green-950">
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
                <dd className="mt-1 font-bold">Setiap hari, {pricingHours.operating} WIB</dd>
              </div>
            </dl>
          </div>
          <div className="relative min-w-0 overflow-hidden rounded-3xl bg-slate-900 ring-1 ring-white/15">
            <Image
              src={shareImage.url}
              alt={shareImage.alt}
              width={shareImage.width}
              height={shareImage.height}
              preload
              sizes="(max-width: 1023px) calc(100vw - 2rem), (max-width: 1151px) 54vw, 600px"
              className="h-auto w-full"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-green-950 px-3 py-1.5 text-xs font-bold tracking-wide text-lime-200">BEYOND FUTSAL · INDOOR 5V5</span>
          </div>
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
            <div className="grid gap-5 sm:grid-cols-2">
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
          <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-y border-slate-200 py-5 md:grid-cols-4">
            {mockFacilities.map((facility, index) => {
              const Icon = facilityIcons[index] ?? ShieldCheck;
              return (
                <li key={facility.title} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-green-50 text-green-700">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-bold">{facility.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="cara-booking" className="scroll-mt-20 bg-green-950 px-4 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-300">Mudah dan praktis</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Atur jadwal lewat WhatsApp</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-green-100/80">
              Jadwal di website masih simulasi. Ketersediaan sebenarnya dikonfirmasi oleh pengelola.
            </p>
          </div>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {mockBookingSteps.map((step) => (
              <li key={step.number} className="border-t border-lime-200/30 py-4">
                <span aria-hidden="true" className="text-3xl font-black text-lime-300">{step.number}</span>
                <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-green-100/80">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild size="lg" className="bg-lime-300 text-green-950 hover:bg-lime-200 focus-visible:ring-lime-300 focus-visible:ring-offset-green-950">
              <Link href="/jadwal">Cek Jadwal <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </Button>
            <a href={getVenueWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-bold text-lime-200 underline underline-offset-4">Tanya via WhatsApp</a>
          </div>
        </div>
      </section>

      {testimonials.entries.length > 0 && (
        <section id="testimoni" aria-labelledby="testimoni-title" className="scroll-mt-20 px-4 py-10 sm:py-12">
          <div className="mx-auto max-w-6xl">
            {testimonials.isDemo && (
              <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-900">Contoh testimoni</p>
            )}
            <h2 id="testimoni-title" className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Kata Pemain Beyond</h2>
            {testimonials.isDemo && (
              <p className="mt-3 text-sm leading-6 text-slate-600">Nama pemain, klub, dan kutipan di bawah ini fiktif, bukan ulasan pelanggan sungguhan.</p>
            )}
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {testimonials.entries.map(({ id, name, club, quote }) => (
                <li key={id} className="flex flex-col border-l-2 border-green-200 pl-4">
                  <Quote aria-hidden="true" className="h-4 w-4 text-green-700" />
                  <blockquote className="my-2 flex-1 text-sm leading-6 text-slate-700">
                    <p>&ldquo;{quote}&rdquo;</p>
                  </blockquote>
                  <div className="pt-1 text-sm">
                    <p className="font-bold text-slate-950">{name}</p>
                    <p className="mt-1 text-sm font-semibold text-green-800">{club}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="lokasi" aria-labelledby="lokasi-title" className="scroll-mt-20 bg-slate-50 px-4 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Temukan kami</p>
            <h2 id="lokasi-title" className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Rencanakan kunjunganmu</h2>
            <div className="mt-6 space-y-4">
              <p className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                <span><strong className="block">Lokasi</strong>{venue.address}</span>
              </p>
              <p className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                <span><strong className="block">Jam operasional</strong>Setiap hari, {pricingHours.operating} WIB</span>
              </p>
              <p className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                <span><strong className="block">WhatsApp resmi</strong>{venue.whatsappDisplay}</span>
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-green-950 p-4 text-white sm:p-6">
            <h3 className="font-black text-lime-300">Peta &amp; kontak</h3>
            <p className="mt-2 text-sm leading-6 text-green-100">Pin Beyond Futsal belum tersedia. {venue.landmark.name} adalah patokan, bukan titik lapangan.</p>
            <div className="mt-4 flex flex-col items-start gap-3">
              <Button asChild className="h-auto min-h-11 max-w-full bg-lime-300 py-2 text-green-950 hover:bg-lime-200 focus-visible:ring-offset-green-950">
                <a href={getVenueWhatsAppUrl()} target="_blank" rel="noopener noreferrer">Tanya Jadwal via WhatsApp</a>
              </Button>
              <a href={venueAddressMapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-lime-200 underline-offset-4 hover:underline">Cari Alamat di Google Maps <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
              <a href={venue.landmark.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center text-sm font-semibold text-green-100 underline-offset-4 hover:underline">Lihat Patokan: {venue.landmark.name}</a>
              <a href="#faq" className="inline-flex min-h-10 items-center text-sm font-semibold text-green-100 underline-offset-4 hover:underline">Lihat FAQ sebelum datang</a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">Bantuan</p>
          <h2 id="faq-title" className="mt-2 text-3xl font-black tracking-tight">Pertanyaan umum</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Cek jam bermain, persiapan tim, dan hal yang perlu dikonfirmasi sebelum memesan.</p>
          <div className="mt-6 space-y-6">
            {faqGroups.map(({ title, questions }) => (
              <div key={title} className="space-y-3">
                <h3 className="font-bold text-green-800">{title}</h3>
                {questions.map(({ question, answer }) => (
                  <details key={question} className="rounded-xl border border-slate-200 px-4">
                    <summary className="cursor-pointer py-4 font-bold text-slate-900">{question}</summary>
                    <p className="pb-4 text-sm leading-6 text-slate-600">{answer}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-green-50 p-5">
            <h3 className="font-black text-green-950">Masih punya pertanyaan?</h3>
            <p className="mt-1 text-sm leading-6 text-green-900">Tanyakan aturan bermain, pembayaran, atau perubahan jadwal ke pengelola Beyond.</p>
            <Button asChild className="mt-4">
              <a href={getVenueContactUrl("Halo Beyond Futsal, saya mau bertanya tentang ketentuan bermain di Beyond.")} target="_blank" rel="noopener noreferrer">Hubungi Beyond via WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-black tracking-tight text-green-400">
              <BrandLogo /> BEYOND
            </Link>
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
