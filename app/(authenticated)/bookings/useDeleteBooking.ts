"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../_services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: delBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),

    onSuccess: () => {
      toast.success(`Booking successfully deleted`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("There was an error while deleting booking"),
  });

  return { delBooking, isDeleting };
}
