const venueDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function getVenueDate(now = new Date()) {
  const parts = venueDateFormatter.formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function hasVenueSlotStarted(date: string, time: string, now = new Date()) {
  return Date.parse(`${date}T${time}:00+07:00`) <= now.getTime();
}