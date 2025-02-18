import React from "react";

type FormRowVerticalProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

function FormRowVertical({ label, error, children }: FormRowVerticalProps) {
  // Check if the children is a React element before accessing its props same as (children?.props.id)
  const childElement = React.Children.only(
    Array.isArray(children) ? children[0] : children
  );
  const id = childElement.props.id;

  return (
    <div className="flex flex-col gap-[0.8rem] py-[1.2rem]">
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-[1.4rem] text-red-700">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
