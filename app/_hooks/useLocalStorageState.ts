'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useLocalStorageState<T>(
  initialState: T,
  key: string,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const localstorageValue = localStorage.getItem(key);

    if (localstorageValue !== null) {
      setValue(JSON.parse(localstorageValue) as T);
    }
    setIsInitialized(true);
  }, [key]);

  
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [isInitialized, key, value]);

  return [value, setValue] as const;
}

export default useLocalStorageState;
