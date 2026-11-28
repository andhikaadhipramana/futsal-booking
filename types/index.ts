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
  coverPosition?: string;
  active: boolean;
};

type SlotStatus = "available" | "booked" | "selected" | "expired";

export type TimeSlot = {
  id: string;
  time: string;
  status: SlotStatus;
  price: number;
};
