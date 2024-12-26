import {
  getAllReservations,
  getReservation,
} from "@/app/_lib/reservationActions";
import ReservationDetail from "../ReservationDetail";
import { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const reservation = await getReservation(+params.reservationId);

  return {
    title: `Reservation ${params.reservationId}`,
    description: `${reservation?.user.name}'s reservation in cabin ${reservation?.cabin.name}`,
  };
}

async function Page({ params }: { params: Params }) {
  const reservation = await getReservation(+params.reservationId);

  return <ReservationDetail reservation={reservation} />;
}

export default Page;
