import React from "react";

type FormRowProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

function FormRow({ label, error, children }: FormRowProps) {
  // Check if the children is a React element before accessing its props same as (children?.props.id)

  const childElement = React.Children.only(
    Array.isArray(children) ? children[0] : children,
  );
  const id = (childElement as React.ReactElement).props.id;

  return (
    <div className="FormRow grid grid-cols-[24rem_1fr_1.2fr] items-center py-[1.2rem] first:pt-0 last:border-none last:pb-0 odd:border-b odd:border-gray-100 even:border-b even:border-gray-100 odd:dark:border-gray-800 even:dark:border-gray-800">
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="ml-10 text-[1.4rem] text-red-700">{error}</span>
      )}
    </div>
  );
}

export default FormRow;
