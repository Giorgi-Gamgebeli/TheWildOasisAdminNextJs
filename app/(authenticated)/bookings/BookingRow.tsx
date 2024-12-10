"use client";

import { format, isToday } from "date-fns";

import Tag from "../../_components/Tag";
import Table from "../../_components/Table";

import { formatCurrency } from "../../_utils/helpers";
import { formatDistanceFromNow } from "../../_utils/helpers";
import Menus from "../../_components/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useCheckout } from "../checkin/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../_components/Modal";
import ConfirmDelete from "../../_components/ConfirmDelete";
import { useRouter } from "next/navigation";

export type BookingRowProps = {
  booking: {
    id: number;
    created_at: Date;
    startDate: Date;
    endDate: Date;
    status: string;
    numNights: number;
    numGuests: number;
    totalPrice: number;
    guests: { fullName: string; email: string };
    cabins: { name: string };
  };
};

function BookingRow({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: BookingRowProps) {
  const { checkout, isCheckingOut } = useCheckout();
  const { delBooking, isDeleting } = useDeleteBooking();
  const router = useRouter();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  } as const;

  return (
    <Table.Row>
      <div
        className={`font-sono text-[1.6rem] font-semibold text-gray-600 dark:text-gray-300`}
      >
        {cabinName}
      </div>

      <div className="flex flex-col gap-[0.2rem]">
        <span className="font-medium text-gray-700 dark:text-gray-200">
          {guestName}
        </span>
        <span className="text-[1.2rem] text-gray-500 dark:text-gray-400">
          {email}
        </span>
      </div>

      <div className="flex flex-col gap-[0.2rem]">
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span className="text-[1.2rem] text-gray-500 dark:text-gray-400">
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>

      <Tag type={statusToTagName[`${status}`]}>{status.replace("-", " ")}</Tag>

      <div className="font-sono font-medium text-gray-600 dark:text-gray-300">
        {formatCurrency(totalPrice)}
      </div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => router.push(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => router.push(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => delBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
