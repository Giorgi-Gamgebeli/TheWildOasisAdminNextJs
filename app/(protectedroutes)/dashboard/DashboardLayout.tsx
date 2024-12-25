"use client";

import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import { subDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { Prisma } from "@prisma/client";
import Empty from "@/app/_components/Empty";
import { getToday } from "@/app/_utils/helpers";

type DashboardLayoutProps = {
  reservations: Prisma.ReservationsGetPayload<object>[] | undefined;
  stays:
    | ({
        user: { name: string };
      } & Prisma.ReservationsGetPayload<object>)[]
    | undefined;
  cabins: Prisma.CabinsGetPayload<object>[] | undefined;
  children: React.ReactNode;
};

function DashboardLayout({
  reservations,
  stays,
  cabins,
  children,
}: DashboardLayoutProps) {
  const searchParams = useSearchParams();

  if (!reservations || !stays) return <Empty resourceName="data" />;

  const lastFromURL = searchParams.get("last");
  const numDays = !lastFromURL ? 7 : +lastFromURL;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const reservationsAfterDate = reservations.filter((reservation) => {
    const reservationDate = new Date(reservation.createdAt);

    return (
      reservationDate >= new Date(queryDate) &&
      reservationDate <= new Date(getToday({ end: true }))
    );
  });

  const staysAfterDate = stays.filter((stay) => {
    const stayDate = new Date(stay.startDate);

    return (
      stayDate >= new Date(queryDate) &&
      stayDate <= new Date(getToday({ end: true }))
    );
  });

  const confirmedStays = staysAfterDate?.filter(
    (stay) => stay.status !== "unconfirmed",
  );

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[10rem_34rem_auto] gap-[2.4rem] text-gray-700 dark:text-gray-200">
      <Stats
        reservations={reservationsAfterDate}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      {children}
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart reservations={reservationsAfterDate} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
