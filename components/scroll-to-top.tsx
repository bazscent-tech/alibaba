"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 animate-fade-in-up">
      <Button
        onClick={scrollToTop}
        size="icon"
        className="rounded-full h-10 w-10 sm:h-12 sm:w-12 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 press-effect"
        aria-label="العودة للأعلى"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  );
}
