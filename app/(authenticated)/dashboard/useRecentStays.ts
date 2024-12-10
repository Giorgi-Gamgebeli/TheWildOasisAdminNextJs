"use client";

import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../_services/apiBookings";
import { useSearchParams } from "next/navigation";

export function useRecentStays() {
  const searchParams = useSearchParams();

  const lastFromURL = searchParams.get("last");
  const numDays = !lastFromURL ? 7 : +lastFromURL;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return { isLoading, stays, confirmedStays, numDays };
}
