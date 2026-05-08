"use client";

import { useEffect, useState } from "react";
import { CheckCircle, X, ShoppingCart, Heart } from "lucide-react";

interface Toast {
  id: string;
  type: "cart" | "wishlist" | "success" | "error";
  message: string;
}

let toastListeners: ((toast: Toast) => void)[] = [];

export function showToast(type: Toast["type"], message: string) {
  const toast: Toast = {
    id: Math.random().toString(36).slice(2),
    type,
    message,
  };
  toastListeners.forEach((listener) => listener(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    };
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  if (toasts.length === 0) return null;

  const icons = {
    cart: <ShoppingCart className="h-4 w-4" />,
    wishlist: <Heart className="h-4 w-4" />,
    success: <CheckCircle className="h-4 w-4" />,
    error: <X className="h-4 w-4" />,
  };

  const colors = {
    cart: "bg-green-500",
    wishlist: "bg-red-500",
    success: "bg-green-500",
    error: "bg-red-500",
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${colors[toast.type]} text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-down pointer-events-auto min-w-[200px] max-w-[350px]`}
        >
          {icons[toast.type]}
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="mr-auto opacity-70 hover:opacity-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
