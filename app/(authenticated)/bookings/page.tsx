import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import BookingTable from "./BookingTable";
import BookingTableOperations from "./BookingTableOperations";

function Page() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Page;
