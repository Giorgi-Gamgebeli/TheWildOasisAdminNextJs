"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "../_context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function ClientProviders({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3 * 1000,
            },
            error: {
              duration: 5 * 1000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: isDarkMode ? "#18212f" : "white",
              color: isDarkMode ? "#e5e7eb" : "#374151",
            },
          }}
        />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default ClientProviders;
