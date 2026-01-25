"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time of 60 seconds - data is fresh for 1 minute
            staleTime: 60 * 1000,
            // Refetch on window focus for real-time feel
            refetchOnWindowFocus: true,
            // Retry failed requests 1 time
            retry: 1,
          },
          mutations: {
            // Retry failed mutations 0 times
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
