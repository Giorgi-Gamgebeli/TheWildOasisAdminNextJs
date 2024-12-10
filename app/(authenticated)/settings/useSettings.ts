"use client";

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../_services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings, // must be returning promise
  });

  return { isLoading, error, settings };
}
