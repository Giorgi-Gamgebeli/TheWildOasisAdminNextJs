"use client";

import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../_context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon ariaLabel="Icon" onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
