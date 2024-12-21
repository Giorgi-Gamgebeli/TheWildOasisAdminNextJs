import {
  getAllReservations,
  getReservation,
} from "@/app/_lib/reservationActions";
import ReservationDetail from "../ReservationDetail";

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
  const reservation = await getReservation(+params.reservationId);

  return <ReservationDetail reservation={reservation} />;
}

export default Page;
