import { getReservations } from "@/app/_lib/reservationActions";
import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import ReservationTable from "./ReservationTable";
import ReservationTableOperations from "./ReservationTableOperations";

async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  // FILTER
  const filterValue = searchParams.status;
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  //  : { field: "totalPrice", value: 5000, method: "gte" };

  // SORT
  const sortByRaw = searchParams.sortBy || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const pageFromUrl = searchParams?.page;
  const page = !pageFromUrl ? 1 : +pageFromUrl;

  // QUERY

  // const {
  //   isLoading,
  //   data: { data: bookings, count } = {},
  //   error,
  // } = useQuery({
  //   queryKey: ["bookings", filter, sortBy, page],
  //   queryFn: () => getBookings({ filter, sortBy, page }),
  // });

  // const pageCount = Math.ceil(count / PAGE_SIZE);

  // // PRE-FETCHING
  // if (page < pageCount)
  //   queryClient.prefetchQuery({
  //     queryKey: ["bookings", filter, sortBy, page + 1],
  //     queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
  //   });

  // if (page > 1)
  //   queryClient.prefetchQuery({
  //     queryKey: ["bookings", filter, sortBy, page - 1],
  //     queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
  //   });

  const { reservations, count } = await getReservations({
    filter,
    sortBy,
    page,
  });

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
