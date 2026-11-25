import type { BookingOrder, Court } from "@/types";

export const mockCourts: Court[] = [
  {
    id: "court-1",
    name: "Lapangan A",
    type: "Vinyl, Indoor",
    size: "5v5",
    regularPrice: 100000,
    peakPrice: 120000,
    description:
      "Lapangan Indoor menggunakan lantai vinyl anti-slip dengan kipas angin untuk kenyamanan bermain.",
    facilities: ["Indoor", "Kipas Angin", "Ruang ganti", "Parkir luas"],
    images: [
      "https://images.unsplash.com/photo-1793929590042-06dbc8fdda46?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1760174053338-4def27153cb7?auto=format&fit=crop&w=1200&q=85",
    ],
    active: true,
  },
  {
    id: "court-2",
    name: "Lapangan B",
    type: "Vinyl, Indoor",
    size: "5v5",
    regularPrice: 100000,
    peakPrice: 120000,
    description:
      "Lapangan indoor menggunakan lantai vinyl anti-slip dengan kipas angin untuk kenyamanan bermain.",
    facilities: ["Indoor", "Kipas Angin", "Ruang ganti", "Parkir luas"],
    images: [
      "https://images.unsplash.com/photo-1760174053338-4def27153cb7?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1793929590042-06dbc8fdda46?auto=format&fit=crop&w=1200&q=85",
    ],
    active: true,
  },
];

export const mockBookedSlots: Record<string, string[]> = {
  "court-1": ["12:00", "18:00", "19:00"],
  "court-2": ["14:00", "19:00", "20:00"],
};

export const mockOperatingHours = {
  opensAt: 10,
  closesAt: 23,
};

export const mockPeakHours = {
  startsAt: 17,
  endsBefore: 22,
};

export const mockOrders: BookingOrder[] = [
  {
    id: "BYD-2601",
    courtName: "Lapangan A",
    date: "24 November 2026",
    slots: ["18.00", "19.00"],
    customerName: "Andi Pratama",
    phone: "085760098321",
    total: 200000,
    status: "menunggu_pembayaran",
  },
  {
    id: "BYD-2598",
    courtName: "Lapangan B",
    date: "20 November 2026",
    slots: ["20.00"],
    customerName: "Andi Pratama",
    phone: "081776665541",
    total: 240000,
    status: "dibayar",
  },
];

export const mockFacilities = [
  { title: "Ruang ganti nyaman", description: "Bersiap sebelum dan setelah pertandingan." },
  { title: "Parkir luas", description: "Area parkir untuk motor dan mobil." },
  { title: "Pencahayaan terang", description: "Tetap nyaman bermain hingga malam." },
  { title: "Kantin", description: "Minuman dan camilan tersedia di lokasi." },
];

export const mockBookingSteps = [
  { number: "01", title: "Pilih lapangan", description: "Tentukan lapangan yang cocok untuk tim kamu." },
  { number: "02", title: "Pilih jadwal", description: "Cek tanggal dan jam yang masih tersedia." },
  { number: "03", title: "Isi data pemesan", description: "Masukkan nama dan nomor WhatsApp aktif." },
  { number: "04", title: "Konfirmasi booking", description: "Selesaikan langkah booking dan simpan kode pesanan." },
];

export const mockTestimonials = [
  {
    name: "Rizky A.",
    role: "Pemain tim futsal Al-Hilal",
    quote: "Lapangan bersih dan jadwalnya gampang dicek. Booking bareng teman jadi lebih praktis.",
  },
  {
    name: "Dimas P.",
    role: "Kapten tim futsal Squadra",
    quote: "Fasilitasnya lengkap, tempatnya nyaman, dan enak buat main rutin mingguan.",
  },
  {
    name: "Fajar S.",
    role: "Pemain tim futsal Bintang Timur",
    quote: "Pilihan jamnya fleksibel. Tinggal pilih waktu yang cocok untuk satu tim.",
  },
];

export const mockVenue = {
  address: "Ploso, Jombang, Jawa Timur",
  phone: "0812-5276-9641",
  hours: `Setiap hari, ${String(mockOperatingHours.opensAt).padStart(2, "0")}.00–${String(mockOperatingHours.closesAt).padStart(2, "0")}.00`,
  mapUrl: "https://www.google.com/maps?q=lapangan+futsal+Jombang+Jawa+Timur&output=embed",
};
