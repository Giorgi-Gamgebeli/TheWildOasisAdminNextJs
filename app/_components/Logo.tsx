"use client";

import Image from "next/image";
import { useDarkMode } from "../_context/DarkModeContext";
import darkLogo from "@/public/logo-dark.png";
import lightLogo from "@/public/logo-light.png";

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? darkLogo : lightLogo;

  return (
    <div className="flex items-center justify-center">
      <div className="h-[14rem] w-[14rem]">
        <Image height={140} width={140} src={src} alt="Wild oasis logo" />
      </div>
    </div>
  );
}

export default Logo;
