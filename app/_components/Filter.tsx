"use client";

import { usePathname, useSearchParams } from "next/navigation";

type FilterProps = {
  filterField: string;
  options: { value: string; label: string }[];
};

function Filter({ filterField, options }: FilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(filterField, value);
    if (searchParams.get("page")) params.set("page", "1");

    history.pushState(null, "", `${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-[0.4rem] rounded-md border border-gray-100 bg-white p-[0.4rem] shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-gray-800 dark:bg-gray-0 dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
      {options.map((option) => (
        <button
          className={`font rounded-md border-none px-[0.8rem] py-[0.44rem] text-[1.4rem] font-medium transition-all duration-300 ${option.value === currentFilter ? "bg-indigo-600 text-indigo-50" : "bg-white text-gray-900 hover:bg-indigo-600 hover:text-indigo-50 dark:bg-gray-0 dark:text-indigo-50 dark:hover:bg-indigo-600"}`}
          key={option.value}
          onClick={() => handleClick(option.value)}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
