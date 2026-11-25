import { ScheduleBooking } from "@/components/schedule-booking";
import { getCourts } from "@/lib/api";

export default async function JadwalPage({
  searchParams,
}: {
  searchParams: Promise<{ courtId?: string | string[] }>;
}) {
  const courts = await getCourts();
  const activeCourts = courts.filter((court) => court.active);
  const { courtId } = await searchParams;
  const initialCourtId =
    typeof courtId === "string" && activeCourts.some((court) => court.id === courtId)
      ? courtId
      : undefined;

  return <ScheduleBooking courts={activeCourts} initialCourtId={initialCourtId} />;
}
