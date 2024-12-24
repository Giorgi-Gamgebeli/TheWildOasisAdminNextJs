import { isFuture, isPast, isToday } from "date-fns";
import Button from "../_components/Button";
import { subtractDates } from "../_utils/helpers";

import { reservations as dummyReservations } from "./data-reservations";
import { cabins as dummyCabins } from "./data-cabins";
import {
  //  createCabins, deleteCabins,
  getAllCabins,
} from "../_lib/cabinActions";
import { getAllGuests } from "../_lib/authActions";
import {
  createDummyReservations,
  deleteReservations,
} from "../_lib/reservationActions";

async function createReservations() {
  try {
    const allCabins = await getAllCabins();

    const allCabinIds = allCabins?.map((cabin) => cabin.id);

    const allGuestUsers = await getAllGuests();

    const allUserIds = allGuestUsers?.map((user) => user.id);

    const finalReservations = dummyReservations
      .map((reservation, index) => {
        const cabin = dummyCabins.at(reservation.cabinId - 1);
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
          cabinId,
          userId,
          status,
        };
      })
      .filter((reservation) => reservation !== null);

    await createDummyReservations(finalReservations);
  } catch (error) {
    console.error(error);
  }
}

function Uploader() {
  // async function uploadAll() {
  //   setIsLoading(true);
  //   await deleteReservations();
  //   await deleteCabins();

  //   await createCabins(dummyCabins);
  //   await createReservations();

  //   setIsLoading(false);
  // }

  async function uploadReservations() {
    "use server";

    await deleteReservations();
    await createReservations();
  }

  return (
    <div className="mt-auto flex flex-col gap-[8px] rounded-md bg-white p-[0.8rem] text-center dark:bg-gray-0">
      <h3 className="text-[1.8rem] font-extrabold text-gray-700 dark:text-gray-200">
        SAMPLE DATA
      </h3>

      <form action={uploadReservations}>
        {/* <Button onClick={uploadAll} >
        Upload ALL
        </Button> */}

        <Button ariaLabel="Upload reservations">
          Upload reservations ONLY
        </Button>
      </form>
    </div>
  );
}

export default Uploader;
