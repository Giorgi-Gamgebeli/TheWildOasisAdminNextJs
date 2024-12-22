import { getAllReservationsWithCount } from "@/app/_lib/reservationActions";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import ReservationTable from "./ReservationTable";
import ReservationTableOperations from "./ReservationTableOperations";

async function Page() {
  const { reservations, count } = await getAllReservationsWithCount();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All reservations</Heading>
        <ReservationTableOperations />
      </Row>

      <ReservationTable reservations={reservations} count={count} />
    </>
  );
}

export default Page;
