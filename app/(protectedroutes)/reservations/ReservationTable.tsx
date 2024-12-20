"use client";

import ReservationRow from "./ReservationRow";
import Table from "../../_components/Table";
import Menus from "../../_components/Menus";
import Empty from "../../_components/Empty";
import Spinner from "../../_components/Spinner";
import Pagination from "../../_components/Pagination";
import { Prisma } from "@prisma/client";

export type ReservationTableProps = {
  reservations:
    | ({
        cabin: {
          name: string;
        };
        user: {
          email: string;
          name: string | null;
        };
      } & Prisma.ReservationsGetPayload<object>)[]
    | undefined;

  count: number;
};

function ReservationTable({ reservations, count }: ReservationTableProps) {
  if (!reservations) return <Spinner />;
  if (!reservations.length) return <Empty resourceName="reservations" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={reservations}
          render={(reservation) => (
            <ReservationRow key={reservation.id} reservation={reservation} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ReservationTable;
