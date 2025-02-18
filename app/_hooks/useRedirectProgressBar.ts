"use client";

import { startProgress, stopProgress } from "next-nprogress-bar";
import { usePathname, useRouter } from "next/navigation";

type PassedInFunction = () => Promise<string | undefined>;

type RedirectFunctionSettings = {
  redirectTo: string;
  scroll?: boolean;
};

function useRedirectProgressBar() {
  const router = useRouter();
  const pathname = usePathname();

  const redirectFunction = async (
    passedInfunction: PassedInFunction,
    { redirectTo, scroll = true }: RedirectFunctionSettings
  ) => {
    startProgress();

    await passedInfunction();

    router.push(redirectTo, { scroll });

    await new Promise((res) => pathname === redirectTo && res);

    stopProgress();

    return;
  };

  return {
    redirectFunction,
  };
}

export default useRedirectProgressBar;
