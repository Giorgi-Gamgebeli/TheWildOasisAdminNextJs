"use client";

import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../_services/apiBookings";
import { useParams } from "next/navigation";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, error, booking };
}
