import React from "react";

type TagProps = {
  children: React.ReactNode;
  type: "blue" | "green" | "silver";
};

function Tag({ children, type }: TagProps) {
  return (
    <span
      className={`w-fit rounded-[100px] px-[1.2rem] py-[0.4rem] text-[1.1rem] font-semibold uppercase ${type === "blue" && "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100"} ${type === "green" && "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"} ${type === "silver" && "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100"}`}
    >
      {children}
    </span>
  );
}

export default Tag;
