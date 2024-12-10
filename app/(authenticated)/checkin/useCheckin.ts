"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../_services/apiBookings";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useCheckin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      router.replace("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
