"use client";

// import { useState } from "react";
// import { isFuture, isPast, isToday } from "date-fns";
// import supabase from "../_lib/supabase";
// import Button from "../_components/Button";
// import { subtractDates } from "../_utils/helpers";

// import { bookings } from "./data-bookings";
// import { cabins } from "./data-cabins";
// import { guests } from "./data-guests";

// // const originalSettings = {
// //   minBookingLength: 3,
// //   maxBookingLength: 30,
// //   maxGuestsPerBooking: 10,
// //   breakfastPrice: 15,
// // };

// async function deleteGuests() {
//   const { error } = await supabase.from("guests").delete().gt("id", 0);
//   if (error) console.log(error.message);
// }

// async function deleteCabins() {
//   const { error } = await supabase.from("cabins").delete().gt("id", 0);
//   if (error) console.log(error.message);
// }

// async function deleteBookings() {
//   const { error } = await supabase.from("bookings").delete().gt("id", 0);
//   if (error) console.log(error.message);
// }

// async function createGuests() {
//   const { error } = await supabase.from("guests").insert(guests);
//   if (error) console.log(error.message);
// }

// async function createCabins() {
//   const { error } = await supabase.from("cabins").insert(cabins);
//   if (error) console.log(error.message);
// }

// async function createBookings() {
//   // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
//   const { data: guestsIds } = await supabase
//     .from("guests")
//     .select("id")
//     .order("id");
//   const allGuestIds = guestsIds.map((cabin) => cabin.id);
//   const { data: cabinsIds } = await supabase
//     .from("cabins")
//     .select("id")
//     .order("id");
//   const allCabinIds = cabinsIds.map((cabin) => cabin.id);

//   const finalBookings = bookings.map((booking) => {
//     // Here relying on the order of cabins, as they don't have and ID yet
//     const cabin = cabins.at(booking.cabinId - 1);
//     const numNights = subtractDates(booking.endDate, booking.startDate);
//     const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
//     const extrasPrice = booking.hasBreakfast
//       ? numNights * 15 * booking.numGuests
//       : 0; // hardcoded breakfast price
//     const totalPrice = cabinPrice + extrasPrice;

//     let status;
//     if (
//       isPast(new Date(booking.endDate)) &&
//       !isToday(new Date(booking.endDate))
//     )
//       status = "checked-out";
//     if (
//       isFuture(new Date(booking.startDate)) ||
//       isToday(new Date(booking.startDate))
//     )
//       status = "unconfirmed";
//     if (
//       (isFuture(new Date(booking.endDate)) ||
//         isToday(new Date(booking.endDate))) &&
//       isPast(new Date(booking.startDate)) &&
//       !isToday(new Date(booking.startDate))
//     )
//       status = "checked-in";

//     return {
//       ...booking,
//       numNights,
//       cabinPrice,
//       extrasPrice,
//       totalPrice,
//       guestId: allGuestIds.at(booking.guestId - 1),
//       cabinId: allCabinIds.at(booking.cabinId - 1),
//       status,
//     };
//   });

//   console.log(finalBookings);

//   const { error } = await supabase.from("bookings").insert(finalBookings);
//   if (error) console.log(error.message);
// }

// function Uploader() {
//   const [isLoading, setIsLoading] = useState(false);

//   async function uploadAll() {
//     setIsLoading(true);
//     // Bookings need to be deleted FIRST
//     await deleteBookings();
//     await deleteGuests();
//     await deleteCabins();

//     // Bookings need to be created LAST
//     await createGuests();
//     await createCabins();
//     await createBookings();

//     setIsLoading(false);
//   }

//   async function uploadBookings() {
//     setIsLoading(true);
//     await deleteBookings();
//     await createBookings();
//     setIsLoading(false);
//   }

//   return (
//     <div className="mt-auto flex flex-col gap-[8px] rounded-md bg-white p-[0.8rem] text-center dark:bg-gray-0">
//       <h3 className="text-[1.8rem] font-extrabold text-gray-700 dark:text-gray-200">
//         SAMPLE DATA
//       </h3>

//       <Button onClick={uploadAll} disabled={isLoading}>
//         Upload ALL
//       </Button>

//       <Button onClick={uploadBookings} disabled={isLoading}>
//         Upload bookings ONLY
//       </Button>
//     </div>
//   );
// }

// export default Uploader;
"use client";

import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import prisma from "../_lib/db";
import Button from "../_components/Button";
import { subtractDates } from "../_utils/helpers";

import { reservations as dummyReservations } from "./data-reservations";
import { cabins as dummyCabins } from "./data-cabins";
import { getAllCabins } from "../_lib/cabinActions";
import toast from "react-hot-toast";

async function createReservations() {
  try {
    const allCabins = await getAllCabins();

    if (!allCabins) return toast.error("All cabins couldnt be fetched");

    const allCabinIds = allCabins.map((cabin) => cabin.id);

    const allUsers = await prisma.user.findMany({
      select: { id: true },
      orderBy: { id: "asc" },
    });
    const allUserIds = allUsers.map((user) => user.id);

    const finalReservations = dummyReservations.map((reservation, index) => {
      const cabin = dummyCabins.at(reservation.cabinId - 1);
      const numNights = subtractDates(
        reservation.endDate,
        reservation.startDate,
      );
      const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
      const extrasPrice = reservation.hasBreakfast
        ? numNights * 15 * reservation.numGuests
        : 0; // hardcoded breakfast price
      const totalPrice = cabinPrice + extrasPrice;

      let status = "unconfirmed";
      if (
        isPast(new Date(reservation.endDate)) &&
        !isToday(new Date(reservation.endDate))
      )
        status = "checked-out";
      if (
        (isFuture(new Date(reservation.endDate)) ||
          isToday(new Date(reservation.endDate))) &&
        isPast(new Date(reservation.startDate)) &&
        !isToday(new Date(reservation.startDate))
      )
        status = "checked-in";

      return {
        ...reservation,
        numNights,
        cabinPrice,
        extrasPrice,
        totalPrice,
        cabinId: allCabinIds.at(index % allCabinIds.length),
        userId: allUserIds.at(index % allUserIds.length),
        status,
      };
    });

    await prisma.reservations.createMany({
      data: finalReservations,
    });
  } catch (error) {
    console.error(error.message);
  }
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    await deleteReservations();
    await deleteCabins();

    await createCabins();
    await createReservations();

    setIsLoading(false);
  }

  async function uploadReservations() {
    setIsLoading(true);
    await deleteReservations();
    await createReservations();
    setIsLoading(false);
  }

  return (
    <div className="mt-auto flex flex-col gap-[8px] rounded-md bg-white p-[0.8rem] text-center dark:bg-gray-0">
      <h3 className="text-[1.8rem] font-extrabold text-gray-700 dark:text-gray-200">
        SAMPLE DATA
      </h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadReservations} disabled={isLoading}>
        Upload reservations ONLY
      </Button>
    </div>
  );
}

export default Uploader;
