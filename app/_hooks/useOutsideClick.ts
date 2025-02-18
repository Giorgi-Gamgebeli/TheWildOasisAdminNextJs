"use client";

import { useEffect, useRef } from "react";

function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true,
) {
  const ref = useRef<T | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        const modal = ref.current;
        const whereClickHappend = e.target as Node;

        if (modal && !modal.contains(whereClickHappend)) {
          // (if modal exsists and click didnt happen inside modal)
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing); // event happens in capturing phase

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return { ref };
}

export default useOutsideClick;
