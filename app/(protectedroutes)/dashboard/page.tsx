import DashboardFilter from "./DashboardFilter";
import DashboardLayout from "./DashboardLayout";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import { getAllReservations, getAllStays } from "@/app/_lib/reservationActions";
import { getAllCabins } from "@/app/_lib/cabinActions";
import TodayActivity from "./TodayActivity";

export const revalidate = 6 * 60 * 60;

async function Page() {
  const reservations = await getAllReservations();
  const cabins = await getAllCabins();
  const stays = await getAllStays();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout
        stays={stays}
        cabins={cabins}
        reservations={reservations}
      >
        <TodayActivity />
      </DashboardLayout>
    </>
  );
}

export default Page;
