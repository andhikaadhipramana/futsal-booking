import {
  mockBookedSlots,
  mockCourts,
  mockOperatingHours,
  mockPeakHours,
} from "@/data/mock";
import { hasVenueSlotStarted } from "@/lib/venue-time";
import type { Court, TimeSlot } from "@/types";

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCourts(): Promise<Court[]> {
  await wait();
  return mockCourts;
}

export async function getCourtById(id: string): Promise<Court | null> {
  await wait();
  return mockCourts.find((court) => court.id === id) ?? null;
}

export async function getCourtAvailability(
  courtId: string,
  date: string,
): Promise<TimeSlot[]> {
  await wait();

  const court = mockCourts.find((item) => item.id === courtId);
  if (!court) {
    throw new Error(`Lapangan dengan ID "${courtId}" tidak ditemukan.`);
  }

  const bookedTimes = mockBookedSlots[courtId] ?? [];
  const now = new Date();
  const slotCount = mockOperatingHours.closesAt - mockOperatingHours.opensAt;
  return Array.from({ length: slotCount }, (_, index) => {
    const hour = index + mockOperatingHours.opensAt;
    const time = `${String(hour).padStart(2, "0")}:00`;
    const isPeak = hour >= mockPeakHours.startsAt && hour < mockPeakHours.endsBefore;
    const hasPassed = hasVenueSlotStarted(date, time, now);

    return {
      id: `${date}-${courtId}-${time}`,
      time,
      status: bookedTimes.includes(time)
        ? "booked"
        : hasPassed
          ? "expired"
          : "available",
      price: isPeak ? court.peakPrice : court.regularPrice,
    };
  });
}
