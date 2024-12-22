import { MutableRefObject } from "react";

type FormProps = {
  type?: "regular" | "modal";
  children: React.ReactNode;
  action?: (FormData: FormData) => void;
  onSubmit?: () => void;
  useRef?: MutableRefObject<HTMLFormElement | null>;
};

function Form({
  type = "regular",
  children,
  action,
  onSubmit,
  useRef,
}: FormProps) {
  return (
    <form
      action={action}
      onSubmit={onSubmit}
      ref={useRef}
      className={`overflow-hidden text-[1.4rem] ${type === "regular" ? "rounded-lg border border-gray-100 bg-[#fff] px-[4rem] py-[2.4rem] dark:border-gray-800 dark:bg-gray-0" : "w-[80rem]"}`}
    >
      {children}
    </form>
  );
}

export default Form;
