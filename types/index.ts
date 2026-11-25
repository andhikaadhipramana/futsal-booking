export type Court = {
  id: string;
  name: string;
  type: "Vinyl" | "Vinyl, Indoor" | "Rumput Sintetis" | "Interlock";
  size: "5v5" | "6v6";
  regularPrice: number;
  peakPrice: number;
  description: string;
  facilities: string[];
  images: string[];
  active: boolean;
};

export type SlotStatus = "available" | "booked" | "selected" | "expired";

export type TimeSlot = {
  id: string;
  time: string;
  status: SlotStatus;
  price: number;
};

export type OrderStatus =
  | "menunggu_pembayaran"
  | "dibayar"
  | "dibatalkan"
  | "selesai";

export type BookingOrder = {
  id: string;
  courtName: string;
  date: string;
  slots: string[];
  customerName: string;
  phone: string;
  total: number;
  status: OrderStatus;
};
