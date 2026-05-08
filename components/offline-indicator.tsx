"use client";

import { useState, useEffect } from "react";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-fade-in-up ${isOnline ? "animate-fade-in" : ""}`}>
      <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-lg text-white text-sm font-medium ${
        isOnline ? "bg-green-500" : "bg-red-500"
      }`}>
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            <span>تم إعادة الاتصال</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span>لا يوجد اتصال بالإنترنت</span>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 h-6 px-2"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
