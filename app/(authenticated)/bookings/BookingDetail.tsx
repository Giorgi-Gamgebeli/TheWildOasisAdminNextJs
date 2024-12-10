"use client";

import BookingDataBox from "./BookingDataBox";
import Row from "../../_components/Row";
import Heading from "../../_components/Heading";
import Tag from "../../_components/Tag";
import ButtonGroup from "../../_components/ButtonGroup";
import Button from "../../_components/Button";
import ButtonText from "../../_components/ButtonText";

import { useBooking } from "./useBooking";
import Spinner from "../../_components/Spinner";
// import { HiArrowUpOnSquare } from "react-icons/hi2"; /// #ERROR#
import { useCheckout } from "../checkin/useCheckout";
import ConfirmDelete from "../../_components/ConfirmDelete";
import Modal from "../../_components/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../_components/Empty";
import { redirect, useRouter } from "next/navigation";

function BookingDetail() {
  const router = useRouter();
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { delBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  } as const;

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const {
    status,
    id: bookingId,
  }: { status: "unconfirmed" | "checked-in" | "checked-out"; id: number } =
    booking;

  return (
    <>
      <Row type="horizontal">
        <div className="flex items-center gap-[2.4rem]">
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </div>
        <ButtonText onClick={() => router.back()}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => redirect(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            // icon={<HiArrowUpOnSquare />} #ERROR#
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>
                delBooking(bookingId, { onSettled: () => router.back() })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={() => router.back()}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
