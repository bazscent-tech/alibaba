"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/lib/data";

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative w-full aspect-[16/6] sm:aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5] overflow-hidden rounded-lg sm:rounded-xl">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-responsive">
              <div className="max-w-[280px] sm:max-w-sm md:max-w-xl mr-auto text-white animate-fade-in-up">
                <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-balance leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-lg md:text-xl mb-3 sm:mb-6 opacity-90 line-clamp-2">
                  {slide.subtitle}
                </p>
                <Link href={slide.link}>
                  <Button size="sm" className="sm:size-lg bg-primary hover:bg-primary/90 text-xs sm:text-sm">
                    {slide.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Hidden on very small screens */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full h-8 w-8 sm:h-10 sm:w-10 hidden sm:flex"
        onClick={prevSlide}
        aria-label="الشريحة السابقة"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full h-8 w-8 sm:h-10 sm:w-10 hidden sm:flex"
        onClick={nextSlide}
        aria-label="الشريحة التالية"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 touch-target ${
              index === currentSlide ? "w-6 sm:w-8 bg-white" : "w-1.5 sm:w-2 bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`الذهاب للشريحة ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
