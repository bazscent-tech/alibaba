import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSlider } from "@/components/hero-slider";
import { ProductCard } from "@/components/product-card";
import { categories, getFeaturedProducts, getTopRatedProducts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import {
  Smartphone,
  Cog,
  Shirt,
  Home,
  Heart,
  Car,
  Dumbbell,
  Coffee,
  Building,
  Leaf,
  Package,
  Watch,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const iconMap: { [key: string]: React.ReactNode } = {
  Smartphone: <Smartphone className="h-6 w-6 sm:h-8 sm:w-8" />,
  Cog: <Cog className="h-6 w-6 sm:h-8 sm:w-8" />,
  Shirt: <Shirt className="h-6 w-6 sm:h-8 sm:w-8" />,
  Home: <Home className="h-6 w-6 sm:h-8 sm:w-8" />,
  Heart: <Heart className="h-6 w-6 sm:h-8 sm:w-8" />,
  Car: <Car className="h-6 w-6 sm:h-8 sm:w-8" />,
  Dumbbell: <Dumbbell className="h-6 w-6 sm:h-8 sm:w-8" />,
  Coffee: <Coffee className="h-6 w-6 sm:h-8 sm:w-8" />,
  Building: <Building className="h-6 w-6 sm:h-8 sm:w-8" />,
  Leaf: <Leaf className="h-6 w-6 sm:h-8 sm:w-8" />,
  Package: <Package className="h-6 w-6 sm:h-8 sm:w-8" />,
  Watch: <Watch className="h-6 w-6 sm:h-8 sm:w-8" />,
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const topRatedProducts = getTopRatedProducts();

  return (
    <div className="min-h-screen bg-background w-full max-w-[100vw] overflow-x-hidden">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="container-responsive py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Categories Sidebar - Desktop only */}
            <div className="hidden lg:block">
              <Card className="h-full">
                <CardContent className="p-0">
                  <div className="bg-primary text-white p-3 xl:p-4 rounded-t-lg">
                    <h3 className="font-bold text-sm xl:text-base">الفئات الرئيسية</h3>
                  </div>
                  <ul className="divide-y">
                    {categories.slice(0, 10).map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/category/${category.slug}`}
                          className="flex items-center gap-2 xl:gap-3 p-2.5 xl:p-3 hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-primary shrink-0">
                            {iconMap[category.icon] || <Package className="h-5 w-5" />}
                          </span>
                          <span className="text-xs xl:text-sm text-gray-700 truncate">{category.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/categories"
                    className="block text-center text-primary font-medium p-2.5 xl:p-3 hover:bg-gray-50 text-sm"
                  >
                    عرض جميع الفئات
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Hero Slider */}
            <div className="lg:col-span-3">
              <HeroSlider />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container-responsive section-padding">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">تسوق حسب الفئة</h2>
            <Link href="/categories" className="text-primary hover:underline font-medium text-xs sm:text-sm">
              عرض الكل
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} className="group">
                <Card className="hover:shadow-md transition-shadow card-interactive">
                  <CardContent className="p-2 sm:p-3 md:p-4 text-center">
                    <div className="bg-primary/10 rounded-full p-2.5 sm:p-3 md:p-4 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-1.5 sm:mb-3 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {iconMap[category.icon] || <Package className="h-5 w-5 sm:h-8 sm:w-8" />}
                    </div>
                    <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 line-clamp-2">
                      {category.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="container-responsive section-padding">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">المنتجات الأكثر طلباً</h2>
            <Link href="/deals" className="text-primary hover:underline font-medium text-xs sm:text-sm">
              عرض الكل
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Banner */}
        <section className="container-responsive section-padding">
          <div className="relative aspect-[16/7] sm:aspect-[16/5] md:aspect-[16/4] rounded-lg sm:rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
              alt="عروض خاصة"
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-primary/90 to-primary/50" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-responsive">
                <div className="max-w-xs sm:max-w-sm md:max-w-xl text-white">
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 leading-tight">
                    انضم كمورد الآن
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base mb-2 sm:mb-4 opacity-90 line-clamp-2">
                    اعرض منتجاتك لملايين المشترين حول العالم واحصل على عملاء جدد
                  </p>
                  <Link href="/sell">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white text-primary hover:bg-gray-100 text-xs sm:text-sm"
                    >
                      ابدأ البيع مجاناً
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Rated Products */}
        <section className="container-responsive section-padding">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">الأعلى تقييماً</h2>
            <Link href="/top-rated" className="text-primary hover:underline font-medium text-xs sm:text-sm">
              عرض الكل
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {topRatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 section-padding">
          <div className="container-responsive">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
              لماذا تختار شبام جملة؟
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: (
                    <svg className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "موردون موثوقون",
                  desc: "نتحقق من جميع الموردين لضمان جودة المنتجات والخدمات",
                },
                {
                  icon: (
                    <svg className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "أسعار تنافسية",
                  desc: "احصل على أفضل أسعار الجملة مباشرة من المصنعين",
                },
                {
                  icon: (
                    <svg className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "شحن عالمي",
                  desc: "نوصل طلباتك إلى أي مكان في العالم بأمان وسرعة",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="bg-primary/10 rounded-full p-4 sm:p-5 md:p-6 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 px-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
