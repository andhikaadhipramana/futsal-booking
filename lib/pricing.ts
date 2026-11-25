import { mockOperatingHours, mockPeakHours } from "@/data/mock";

function formatHourRange(start: number, end: number) {
  const formatHour = (hour: number) => `${String(hour).padStart(2, "0")}.00`;
  return `${formatHour(start)}–${formatHour(end)}`;
}

export function getPricingHourLabels() {
  return {
    operating: formatHourRange(
      mockOperatingHours.opensAt,
      mockOperatingHours.closesAt,
    ),
    regular: [
      formatHourRange(
        mockOperatingHours.opensAt,
        mockPeakHours.startsAt,
      ),
      formatHourRange(
        mockPeakHours.endsBefore,
        mockOperatingHours.closesAt,
      ),
    ].join(" & "),
    peak: formatHourRange(
      mockPeakHours.startsAt,
      mockPeakHours.endsBefore,
    ),
  };
}
