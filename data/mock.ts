import type { Court } from "@/types";

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

export const mockFacilities = [
  { title: "Ruang ganti nyaman", description: "Bersiap sebelum dan setelah pertandingan." },
  { title: "Parkir luas", description: "Area parkir untuk motor dan mobil." },
  { title: "Pencahayaan terang", description: "Tetap nyaman bermain hingga malam." },
  { title: "Kantin", description: "Minuman dan camilan tersedia di lokasi." },
];

export const mockBookingSteps = [
  { number: "01", title: "Pilih lapangan", description: "Tentukan lapangan yang cocok untuk tim kamu." },
  { number: "02", title: "Pilih jadwal", description: "Cek tanggal dan jam yang masih tersedia." },
  { number: "03", title: "Tinjau pesanan", description: "Periksa lapangan, jam bermain, dan total harga." },
  { number: "04", title: "Konfirmasi demo", description: "Lihat kode pesanan simulasi di Pesanan Saya. Tidak ada reservasi atau pembayaran." },
];

export const mockVenue = {
  address: "Ploso, Jombang, Jawa Timur",
  hours: `Setiap hari, ${String(mockOperatingHours.opensAt).padStart(2, "0")}.00–${String(mockOperatingHours.closesAt).padStart(2, "0")}.00`,
  areaMapUrl: "https://www.google.com/maps/search/?api=1&query=Ploso%2C+Jombang%2C+Jawa+Timur",
};
