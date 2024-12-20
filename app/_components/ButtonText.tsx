import React from "react";

type ButtonTextProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

function ButtonText({ children, onClick }: ButtonTextProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border-none bg-none text-center text-[1.6rem] font-medium text-indigo-600 transition-all duration-300 hover:text-indigo-700 active:text-indigo-700"
    >
      {children}
    </button>
  );
}

export default ButtonText;
