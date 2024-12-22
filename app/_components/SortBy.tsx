"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Select from "./Select";

type SortByProps = {
  options: { value: string; label: string }[];
};

function SortBy({ options }: SortByProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", e.target.value);

    history.pushState(null, "", `${pathname}?${params.toString()}`);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
