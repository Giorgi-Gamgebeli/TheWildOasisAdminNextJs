"use client";

import Button from "@/app/_components/Button";
import ConfirmDelete from "../../../_components/ConfirmDelete";
import Modal from "../../../_components/Modal";
import {
  deleteReservation,
  updateCheckout,
} from "@/app/_lib/reservationActions";
import toast from "react-hot-toast";
import useRedirectProgressBar from "@/app/_hooks/useRedirectProgressBar";

type ReservationDetailModalProps = {
  reservationId: number;
  status: string | null;
};

// by seperating this from ReservationDetail now ReservationDetail is rendered on server
function ReservationDetailClientButtons({
  reservationId,
  status,
}: ReservationDetailModalProps) {
  const { redirectFunction } = useRedirectProgressBar();

  return (
    <>
      {status === "checked_in" && (
        <Button
          ariaLabel="Check out"
          onClick={async () => await updateCheckout(reservationId)}
        >
          Check out
        </Button>
      )}

      <Modal>
        <Modal.Open opens="delete">
          <Button ariaLabel="Delete reservation" variation="danger">
            Delete reservation
          </Button>
        </Modal.Open>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="reservation"
            onConfirm={async () => {
              await redirectFunction(
                async () => {
                  toast.success("Reservation succesfully deleted");

                  const res = await deleteReservation(reservationId);

                  if (res?.error) return toast.error(res.error);
                },
                { redirectTo: "/reservations" }
              );
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default ReservationDetailClientButtons;
