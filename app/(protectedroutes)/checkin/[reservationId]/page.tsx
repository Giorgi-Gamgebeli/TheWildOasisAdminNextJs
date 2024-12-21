import { getSettings } from "@/app/_lib/settingsActions";

import {
  getAllReservations,
  getReservation,
} from "@/app/_lib/reservationActions";
import CheckinReservation from "./CheckinReservation";

type Params = {
  reservationId: string;
};

export async function generateStaticParams() {
  const reservations = await getAllReservations();

  const ids =
    reservations?.map((reservation) => ({
      reservationId: String(reservation.id),
    })) || [];

  return ids;
}

async function Page({ params }: { params: Params }) {
  const settings = await getSettings();
  const reservation = await getReservation(+params.reservationId);

  return <CheckinReservation settings={settings} reservation={reservation} />;
}

export default Page;
