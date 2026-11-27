import type { TimeSlot } from "@/types";

export type BookingDetails = {
  courtId: string;
  courtName: string;
  date: string;
  slots: Pick<TimeSlot, "id" | "time" | "price">[];
};

type DemoOrder = BookingDetails & { code: string };
export type BookingState = { draft: BookingDetails | null; orders: DemoOrder[] };

const storageKey = "beyond-futsal:demo-bookings-v1";
const emptyState: BookingState = { draft: null, orders: [] };

export function readDemoBookings(): BookingState {
  const raw = window.sessionStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) as BookingState : emptyState;
}

export function saveDemoDraft(draft: BookingDetails) {
  const state = readDemoBookings();
  window.sessionStorage.setItem(storageKey, JSON.stringify({ ...state, draft }));
}

export function matchesAvailableSlots(draft: BookingDetails, availability: TimeSlot[]) {
  const firstIndex = availability.findIndex((slot) => slot.id === draft.slots[0]?.id);
  return firstIndex >= 0 && draft.slots.every((selected, offset) => {
    const slot = availability[firstIndex + offset];
    return slot?.id === selected.id && slot.status === "available" && slot.price === selected.price;
  });
}

export function getRestorableSlotIds(ids: string[], availability: TimeSlot[]) {
  const remaining = availability.filter((slot) => ids.includes(slot.id) && slot.status === "available");
  const firstIndex = availability.findIndex((slot) => slot.id === remaining[0]?.id);
  return remaining.every((slot, offset) => availability[firstIndex + offset]?.id === slot.id)
    ? remaining.map((slot) => slot.id)
    : [];
}

export function confirmDemoDraft(draft: BookingDetails) {
  const state = readDemoBookings();
  if (!state.draft || JSON.stringify(state.draft) !== JSON.stringify(draft)) return null;

  const code = `DEMO-${window.crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const order = { ...draft, code };
  window.sessionStorage.setItem(storageKey, JSON.stringify({ draft: null, orders: [order, ...state.orders] }));
  return order;
}

export function formatBookingDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00+07:00`));
}

export function getSlotEndTime(time: string) {
  return `${String(Number(time.slice(0, 2)) + 1).padStart(2, "0")}:00`;
}