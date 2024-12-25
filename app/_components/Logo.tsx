"use client";

import Image from "next/image";
import { useDarkMode } from "../_context/DarkModeContext";
import darkLogo from "@/public/logo-dark.png";
import lightLogo from "@/public/logo-light.png";

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? darkLogo : lightLogo;

  return (
    <div className="mb-14 flex items-center justify-center">
      <div className="relative aspect-[3/2] h-[10rem] w-auto">
        <Image
          fill
          src={src}
          className="aspect-[3/2] h-[10rem] w-auto object-contain"
          alt="Wild oasis logo"
          quality={50}
          sizes="20vw"
        />
      </div>
    </div>
  );
}

export default Logo;
