import { ScheduleBooking } from "@/components/schedule-booking";
import { getCourts } from "@/lib/api";

export default async function JadwalPage({
  searchParams,
}: {
  searchParams: Promise<{ courtId?: string | string[]; restore?: string | string[] }>;
}) {
  const courts = await getCourts();
  const activeCourts = courts.filter((court) => court.active);
  const { courtId, restore } = await searchParams;
  const initialCourtId =
    typeof courtId === "string" && activeCourts.some((court) => court.id === courtId)
      ? courtId
      : undefined;

  return <ScheduleBooking key={`${initialCourtId ?? "default"}:${restore === "1"}`} courts={activeCourts} initialCourtId={initialCourtId} restoreDraft={restore === "1"} />;
}
