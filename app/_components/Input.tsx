"use client";

import { useFormStatus } from "react-dom";

type InputProps = {
  type?: string;
  id?: string;
  autoComplete?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  hidden?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

function Input({
  type,
  id,
  autoComplete,
  disabled,
  placeholder,
  defaultValue,
  hidden,
  onBlur,
}: InputProps) {
  const { pending } = useFormStatus();

  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      name={id}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      hidden={hidden}
      disabled={pending || disabled}
      onBlur={onBlur}
      className="rounded-md border border-gray-300 bg-white px-[1.2rem] py-[0.8rem] shadow-[0_0_0_rgba(0,0,0,0.04)] disabled:cursor-not-allowed disabled:bg-gray-300 dark:border-gray-600 dark:bg-gray-0 dark:shadow-[0_0_0_rgba(0,0,0,0.4)] disabled:dark:bg-gray-600"
    />
  );
}

export default Input;
