"use client";

import React, { createContext, useContext, useEffect } from "react";
import useLocalStorageState from "../_hooks/useLocalStorageState";

type DarkModeContextTypes = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextTypes | null>(null);

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(() => {
    const localstorageValue = localStorage.getItem("isDarkMode");
    if (localstorageValue === null)
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, [setIsDarkMode]);

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === null)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");

  return context;
}

export { DarkModeProvider, useDarkMode };
