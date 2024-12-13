"use client";

import Button from "../../_components/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
