"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-red-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-xl font-bold mb-2">حدث خطأ</h1>
        <p className="text-gray-500 text-sm mb-6">
          عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>
            <RefreshCw className="h-4 w-4 ml-2" />
            المحاولة مرة أخرى
          </Button>
          <Link href="/">
            <Button variant="outline">
              <Home className="h-4 w-4 ml-2" />
              الرئيسية
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
