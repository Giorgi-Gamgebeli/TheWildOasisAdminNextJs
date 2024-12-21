import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "./TodayActivity";
import { getAllCabins } from "@/app/_lib/cabinActions";
import { subDays } from "date-fns";
import {
  getReservationsAfterDate,
  getStaysAfterDate,
} from "@/app/_lib/reservationActions";

async function DashboardLayout({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const lastFromURL = searchParams?.last;
  const numDays = !lastFromURL ? 7 : +lastFromURL;
  // const numDays = 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const reservations = await getReservationsAfterDate(queryDate);
  const stays = await getStaysAfterDate(queryDate);
  const cabins = await getAllCabins();

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[10rem_34rem_auto] gap-[2.4rem] text-gray-700 dark:text-gray-200">
      <Stats
        reservations={reservations}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart reservations={reservations} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
