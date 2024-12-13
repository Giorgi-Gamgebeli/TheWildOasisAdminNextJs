"use client";

import { useFormStatus } from "react-dom";

type FileInputProps = {
  id?: string;
  accept?: string;
};

function FileInput({ accept, id }: FileInputProps) {
  const { pending } = useFormStatus();

  return (
    <input
      type="file"
      id={id}
      name={id}
      accept={accept}
      disabled={pending}
      className="block rounded-md border-gray-300 text-sm shadow-[0_0_0_rgba(0,0,0,0.04)] file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700 focus:border-indigo-500 focus:ring-indigo-500 dark:shadow-[0_0_0_rgba(0,0,0,0.4)]"
    />
  );
}

export default FileInput;
