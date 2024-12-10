"use client";

import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../_services/apiBookings";
import { useSearchParams } from "next/navigation";

export function useRecentBookings() {
  const searchParams = useSearchParams();

  const lastFromURL = searchParams.get("last");
  const numDays = !lastFromURL ? 7 : +lastFromURL;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
