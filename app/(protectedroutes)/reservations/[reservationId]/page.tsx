import { getReservation } from "@/app/_lib/reservationActions";
import ReservationDetail from "../ReservationDetail";

type Params = {
  reservationId: string;
};

async function Page({ params }: { params: Params }) {
  const reservation = await getReservation(+params.reservationId);

  return <ReservationDetail reservation={reservation} />;
}

export default Page;
