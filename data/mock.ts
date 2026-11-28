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
    images: ["/lapangan-a.jpg"],
    coverPosition: "50% 42%",
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
    images: ["/lapangan-b.jpg"],
    coverPosition: "50% 66%",
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
  { title: "Lapangan", description: "Lapangan yang kita miliki menggunakan standar internasional dan kualitas tinggi." },
];

export const mockBookingSteps = [
  { number: "01", title: "Pilih lapangan dan jam", description: "Buka jadwal untuk menentukan tanggal dan jam yang ingin kamu tanyakan." },
  { number: "02", title: "Tanya via WhatsApp", description: "Kirim detail pilihanmu ke nomor resmi Beyond Futsal." },
  { number: "03", title: "Tunggu konfirmasi pengelola", description: "Pesan WhatsApp belum menahan slot. Pastikan pengelola sudah mengonfirmasi jadwal sebelum datang." },
];
