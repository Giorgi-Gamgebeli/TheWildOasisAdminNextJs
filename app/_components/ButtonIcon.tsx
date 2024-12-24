type ButtonIconProps = {
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
};

function ButtonIcon({
  children,
  onClick,
  disabled,
  ariaLabel,
}: ButtonIconProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className="rounded-md border-none bg-none p-[0.6rem] text-[2.2rem] text-indigo-600 hover:bg-gray-100 disabled:cursor-not-allowed hover:dark:bg-gray-800"
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
