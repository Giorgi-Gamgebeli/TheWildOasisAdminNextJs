"use client";

import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../_components/ButtonIcon";
import SpinnerMini from "../_components/SpinnerMini";
import { useTransition } from "react";
import { signOut } from "next-auth/react";

function Logout() {
  const [isPending, startTransition] = useTransition();

  return (
    <ButtonIcon
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          signOut();
        });
      }}
    >
      {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
