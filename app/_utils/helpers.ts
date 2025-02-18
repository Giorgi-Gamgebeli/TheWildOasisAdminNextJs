import { formatDistance, isFuture, isPast, isToday } from "date-fns";
import { differenceInDays } from "date-fns";
import { cabins } from "../_data/data-cabins";
import { guestUsers } from "../_data/data-guests";
import { reservations } from "../_data/data-reservations";
import { z } from "zod";
import { UserSchemaDatabase } from "../_schemas/databaseSchemas";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1: Date, dateStr2: Date) =>
  differenceInDays(dateStr1, dateStr2);

export const formatDistanceFromNow = (dateStr: Date) =>
  formatDistance(dateStr, new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options: { end?: boolean } = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value,
  );

export function fixedReservations(
  users?: z.infer<typeof UserSchemaDatabase>[],
) {
  const usableUsers = users ? users : guestUsers;

  const allCabinIds = cabins?.map((cabin) => cabin.id);

  const allUserIds = usableUsers?.map((user) => user.id);

  const finalReservations = reservations
    .map((reservation, index) => {
      const cabin = cabins.at(reservation.cabinId - 1);
      const numNights = subtractDates(
        reservation.endDate,
        reservation.startDate,
      );

      if (!cabin) return null;

      const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

      const extrasPrice = reservation.hasBreakfast
        ? numNights * 15 * reservation.numGuests
        : 0; // hardcoded breakfast price
      const totalPrice = cabinPrice + extrasPrice;

      const cabinId = allCabinIds?.at(index % allCabinIds.length);
      const userId = allUserIds?.at(index % allUserIds.length);

      if (!cabinId || !userId) throw new Error("Invalid cabinId or userId.");

      let status: "unconfirmed" | "checked_in" | "checked_out" = "unconfirmed";
      if (
        isPast(new Date(reservation.endDate)) &&
        !isToday(new Date(reservation.endDate))
      )
        status = "checked_out";
      if (
        (isFuture(new Date(reservation.endDate)) ||
          isToday(new Date(reservation.endDate))) &&
        isPast(new Date(reservation.startDate)) &&
        !isToday(new Date(reservation.startDate))
      )
        status = "checked_in";

      return {
        ...reservation,
        numNights,
        cabinPrice,
        extrasPrice,
        totalPrice,
        cabinId,
        userId,
        status,
      };
    })
    .filter((reservation) => reservation !== null);

  return finalReservations;
}
