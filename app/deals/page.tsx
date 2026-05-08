"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products } from "@/lib/data";
import {
  Flame,
  Clock,
  Zap,
  Gift,
  Percent,
  ArrowLeft,
  Timer,
} from "lucide-react";

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get products for deals - showing top sellers and free shipping products
  const flashDeals = products.filter((p) => p.freeShipping).slice(0, 6);
  const hotDeals = products.filter((p) => p.orders > 5000).slice(0, 6);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-l from-red-600 to-orange-500 py-6 sm:py-4 sm:py-6 md:py-8 md:py-12">
          <div className="container-responsive">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-white text-center lg:text-right">
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
                  <Flame className="w-8 h-8" />
                  <span className="text-2xl font-bold">عروض اليوم الحصرية</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  خصومات تصل إلى 70%
                </h1>
                <p className="text-xl opacity-90 mb-6">
                  لا تفوت الفرصة! عروض محدودة الوقت على آلاف المنتجات
                </p>
              </div>

              {/* Countdown Timer */}
              <Card className="p-6 bg-white/10 backdrop-blur border-white/20 text-white">
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <Timer className="w-5 h-5" />
                  <span className="font-medium">ينتهي العرض خلال</span>
                </div>
                <div className="flex gap-4 text-center">
                  <div className="bg-white/20 rounded-lg p-3 min-w-[55px] sm:min-w-[70px]">
                    <div className="text-3xl font-bold">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <div className="text-xs opacity-80">ساعة</div>
                  </div>
                  <div className="text-3xl font-bold">:</div>
                  <div className="bg-white/20 rounded-lg p-3 min-w-[55px] sm:min-w-[70px]">
                    <div className="text-3xl font-bold">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-xs opacity-80">دقيقة</div>
                  </div>
                  <div className="text-3xl font-bold">:</div>
                  <div className="bg-white/20 rounded-lg p-3 min-w-[55px] sm:min-w-[70px]">
                    <div className="text-3xl font-bold">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-xs opacity-80">ثانية</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <div className="container-responsive py-6 sm:py-4 sm:py-6 md:py-8 md:py-12">
          {/* Quick Categories */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <Button variant="outline" className="gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              عروض البرق
            </Button>
            <Button variant="outline" className="gap-2">
              <Gift className="w-4 h-4 text-pink-500" />
              هدايا مجانية
            </Button>
            <Button variant="outline" className="gap-2">
              <Percent className="w-4 h-4 text-green-500" />
              أكبر الخصومات
            </Button>
            <Button variant="outline" className="gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              عروض الساعة
            </Button>
          </div>

          {/* Flash Deals */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">عروض البرق</h2>
                  <p className="text-muted-foreground text-sm">
                    كميات محدودة بأسعار لا تصدق
                  </p>
                </div>
              </div>
              <Link href="/category/electronics">
                <Button variant="ghost" className="gap-2">
                  عرض الكل
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {flashDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Hot Deals Banner */}
          <Card className="mb-16 overflow-hidden">
            <div className="bg-gradient-to-l from-orange-500 to-red-500 p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-6 h-6" />
                    <span className="text-lg font-bold">
                      عرض خاص للشركات
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">
                    خصم 30% إضافي على الطلبات بالجملة
                  </h3>
                  <p className="opacity-90">
                    للطلبات التي تزيد عن $1000 - استخدم كود: BULK30
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-white/90"
                >
                <Link href="/categories"><Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-white/90"
                >
                  تسوق الآن
                </Button></Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Hot Products */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">الأكثر مبيعاً اليوم</h2>
                  <p className="text-muted-foreground text-sm">
                    منتجات يطلبها الآلاف يومياً
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {hotDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Deal Categories */}
          <section>
            <h2 className="text-2xl font-bold mb-8 text-center">
              تصفح العروض حسب الفئة
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  name: "إلكترونيات",
                  discount: "حتى 50%",
                  image:
                    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
                  slug: "electronics",
                },
                {
                  name: "أزياء",
                  discount: "حتى 60%",
                  image:
                    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
                  slug: "fashion",
                },
                {
                  name: "المنزل والحديقة",
                  discount: "حتى 45%",
                  image:
                    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=300&h=200&fit=crop",
                  slug: "home-garden",
                },
                {
                  name: "الجمال والعناية",
                  discount: "حتى 55%",
                  image:
                    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop",
                  slug: "beauty",
                },
              ].map((cat, index) => (
                <Link key={index} href={`/category/${cat.slug}`}>
                  <Card className="overflow-hidden group cursor-pointer">
                    <div className="relative h-32">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold">{cat.name}</h3>
                        <span className="text-sm text-yellow-300">
                          خصم {cat.discount}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
