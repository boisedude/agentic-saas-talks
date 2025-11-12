"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Global error boundary caught:", error);

    // In production, you might want to send this to a service like Sentry
    if (process.env.NODE_ENV === "production") {
      // Example: logCriticalErrorToService(error)
    }
  }, [error]);

  // Memoize reset handler
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex justify-center">
            <AlertCircle className="h-16 w-16 text-red-500" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Critical Error
            </h1>
            <p className="text-gray-400">
              We apologize for the inconvenience. A critical error has occurred.
            </p>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-4 bg-gray-900 rounded-lg text-left border border-gray-800">
              <p className="text-sm font-mono text-red-400 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={handleReset}
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-white text-black px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Try to recover from critical error"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-gray-700 bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Return to home page"
            >
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
